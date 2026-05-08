#!/usr/bin/env node
/**
 * Resubmit all sitemaps to Google Search Console via the Sitemaps API.
 *
 * Prerequisites:
 *   1. Place service account JSON at .data/google-service-account.json
 *      (or set GOOGLE_SERVICE_ACCOUNT_FILE env var)
 *   2. Grant the service account email "Owner" access to your GSC property
 *   3. npm install googleapis  (if not already installed)
 *
 * Usage:
 *   node scripts/gsc-submit-sitemaps.mjs                   # submit all sitemaps
 *   node scripts/gsc-submit-sitemaps.mjs --list            # list currently submitted sitemaps
 *   node scripts/gsc-submit-sitemaps.mjs --delete-stale    # delete sitemaps GSC knows about that aren't in our list
 *
 * Environment variables:
 *   GOOGLE_SERVICE_ACCOUNT_FILE  — path to service account JSON (default: .data/google-service-account.json)
 *   GSC_SITE_URL                 — Search Console property (default: https://www.opensadhaka.com/)
 */

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const KEY_FILE = process.env.GOOGLE_SERVICE_ACCOUNT_FILE || resolve(ROOT, ".data", "google-service-account.json");
const SITE_URL = process.env.GSC_SITE_URL || "sc-domain:opensadhaka.com";

const SITEMAP_IDS = [
  "core", "philosophies", "traditions", "texts", "greats", "concepts",
  "comparisons", "topics", "practices", "shlokas", "sanskrit", "articles",
  "stotras", "deities", "mantras", "jyotish",
];

const SITEMAP_URLS = SITEMAP_IDS.map(
  (id) => `https://www.opensadhaka.com/sitemap/${id}.xml`
);

// ── Auth ─────────────────────────────────────────────────────────────────────

async function getAccessToken() {
  // ADC path: use the user's gcloud `application-default login` credentials
  // (skips service-account file entirely). Set GSC_USE_ADC=1 to opt in.
  // Useful when the service account hasn't been granted Owner on the GSC property.
  if (process.env.GSC_USE_ADC === "1") {
    const quotaProject = process.env.GOOGLE_CLOUD_QUOTA_PROJECT || process.env.GCLOUD_PROJECT || "sadhaka-seo";
    if (!process.env.GOOGLE_CLOUD_QUOTA_PROJECT) {
      process.env.GOOGLE_CLOUD_QUOTA_PROJECT = quotaProject;
    }
    const { google } = await import("googleapis");
    const auth = new google.auth.GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/webmasters"],
    });
    const client = await auth.getClient();
    const token = await client.getAccessToken();
    return token.token;
  }

  let keyData;
  try {
    keyData = JSON.parse(readFileSync(KEY_FILE, "utf-8"));
  } catch (err) {
    console.error(`Failed to read service account key at ${KEY_FILE}`);
    console.error("Create one at https://console.cloud.google.com/iam-admin/serviceaccounts");
    console.error("Then grant it Owner access to your GSC property.");
    console.error("Or run with GSC_USE_ADC=1 to use your gcloud user credentials instead.");
    process.exit(1);
  }

  // Use googleapis if available, otherwise fall back to manual JWT
  try {
    const { google } = await import("googleapis");
    const auth = new google.auth.GoogleAuth({
      keyFile: KEY_FILE,
      scopes: ["https://www.googleapis.com/auth/webmasters"],
    });
    const client = await auth.getClient();
    const token = await client.getAccessToken();
    return token.token;
  } catch {
    // Fall back to manual JWT flow
    return await getAccessTokenManual(keyData);
  }
}

async function getAccessTokenManual(keyData) {
  // Minimal JWT-based service account auth without googleapis dependency
  const { createSign } = await import("node:crypto");

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: keyData.client_email,
    scope: "https://www.googleapis.com/auth/webmasters",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };

  const b64 = (obj) => Buffer.from(JSON.stringify(obj)).toString("base64url");
  const unsigned = `${b64(header)}.${b64(payload)}`;

  const sign = createSign("RSA-SHA256");
  sign.update(unsigned);
  const signature = sign.sign(keyData.private_key, "base64url");
  const jwt = `${unsigned}.${signature}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Token exchange failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  return data.access_token;
}

// ── GSC API helpers ──────────────────────────────────────────────────────────

async function gscRequest(method, path, token) {
  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}${path}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  // User-credential ADC requires an explicit quota project header.
  // Service-account creds embed the project so this is harmless when present.
  const quotaProject = process.env.GOOGLE_CLOUD_QUOTA_PROJECT || process.env.GCLOUD_PROJECT;
  if (quotaProject) headers["X-Goog-User-Project"] = quotaProject;
  const res = await fetch(url, { method, headers });

  if (method === "PUT" && res.status === 204) return null;
  if (method === "DELETE" && (res.status === 204 || res.status === 200)) return null;

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`GSC API ${method} ${path}: ${res.status} ${text}`);
  }

  return text ? JSON.parse(text) : null;
}

// ── Commands ─────────────────────────────────────────────────────────────────

async function listSitemaps(token) {
  const data = await gscRequest("GET", "/sitemaps", token);
  const sitemaps = data?.sitemap || [];

  if (sitemaps.length === 0) {
    console.log("No sitemaps currently submitted to GSC.");
    return sitemaps;
  }

  console.log(`\n${sitemaps.length} sitemaps in GSC:\n`);
  for (const s of sitemaps) {
    const warnings = s.warnings ? ` (${s.warnings} warnings)` : "";
    const errors = s.errors ? ` (${s.errors} errors)` : "";
    console.log(`  ${s.path}`);
    console.log(`    Last submitted: ${s.lastSubmitted || "never"}`);
    console.log(`    Last downloaded: ${s.lastDownloaded || "never"}`);
    console.log(`    Status: ${s.isPending ? "pending" : "processed"}${warnings}${errors}`);
    console.log();
  }

  return sitemaps;
}

async function submitSitemaps(token) {
  console.log(`Submitting ${SITEMAP_URLS.length} sitemaps to GSC (${SITE_URL})...\n`);

  let ok = 0;
  let failed = 0;

  for (const sitemapUrl of SITEMAP_URLS) {
    const path = `/sitemaps/${encodeURIComponent(sitemapUrl)}`;
    try {
      await gscRequest("PUT", path, token);
      console.log(`  ✓ ${sitemapUrl}`);
      ok++;
    } catch (err) {
      console.log(`  ✗ ${sitemapUrl} — ${err.message}`);
      failed++;
    }
  }

  console.log(`\nDone: ${ok} submitted, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

async function deleteStaleSitemaps(token) {
  const data = await gscRequest("GET", "/sitemaps", token);
  const existing = (data?.sitemap || []).map((s) => s.path);
  const wanted = new Set(SITEMAP_URLS);
  const stale = existing.filter((url) => !wanted.has(url));

  if (stale.length === 0) {
    console.log("No stale sitemaps to delete.");
    return;
  }

  console.log(`Deleting ${stale.length} stale sitemaps...\n`);
  for (const url of stale) {
    const path = `/sitemaps/${encodeURIComponent(url)}`;
    try {
      await gscRequest("DELETE", path, token);
      console.log(`  ✓ Deleted ${url}`);
    } catch (err) {
      console.log(`  ✗ ${url} — ${err.message}`);
    }
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────

const args = new Set(process.argv.slice(2));

const token = await getAccessToken();

if (args.has("--list")) {
  await listSitemaps(token);
} else if (args.has("--delete-stale")) {
  await deleteStaleSitemaps(token);
} else {
  await submitSitemaps(token);
}
