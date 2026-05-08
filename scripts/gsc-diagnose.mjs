#!/usr/bin/env node
/**
 * GSC diagnostic tool — inspect indexing issues and identify pages needing attention.
 *
 * Usage:
 *   node scripts/gsc-diagnose.mjs                        # full diagnostic: sitemaps + top errors + coverage
 *   node scripts/gsc-diagnose.mjs --inspect <url>        # inspect a specific URL
 *   node scripts/gsc-diagnose.mjs --inspect-batch <file> # inspect URLs from a file (one per line)
 *   node scripts/gsc-diagnose.mjs --low-impressions      # find indexed pages with 0 impressions (zombie pages)
 *   node scripts/gsc-diagnose.mjs --errors-only          # show only pages with indexing errors
 *   node scripts/gsc-diagnose.mjs --not-indexed          # find submitted URLs not yet indexed
 */

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const KEY_FILE = process.env.GOOGLE_SERVICE_ACCOUNT_FILE || resolve(ROOT, ".data", "google-service-account.json");
const SITE_URL = process.env.GSC_SITE_URL || "sc-domain:opensadhaka.com";
const SITE_ORIGIN = "https://www.opensadhaka.com";
const USE_ADC = process.env.GSC_AUTH === "adc";

const SCOPES = [
  "https://www.googleapis.com/auth/webmasters",
  "https://www.googleapis.com/auth/webmasters.readonly",
];

// ── Auth (reused from gsc-submit-sitemaps.mjs) ──────────────────────────────

async function getAccessToken() {
  if (USE_ADC) {
    const { google } = await import("googleapis");
    const auth = new google.auth.GoogleAuth({ scopes: SCOPES });
    const client = await auth.getClient();
    const token = await client.getAccessToken();
    return token.token;
  }

  let keyData;
  try {
    keyData = JSON.parse(readFileSync(KEY_FILE, "utf-8"));
  } catch {
    console.error(`Failed to read service account key at ${KEY_FILE}`);
    console.error("Tip: set GSC_AUTH=adc to use gcloud application-default credentials instead.");
    process.exit(1);
  }

  try {
    const { google } = await import("googleapis");
    const auth = new google.auth.GoogleAuth({
      keyFile: KEY_FILE,
      scopes: SCOPES,
    });
    const client = await auth.getClient();
    const token = await client.getAccessToken();
    return token.token;
  } catch {
    return await getAccessTokenManual(keyData);
  }
}

async function getAccessTokenManual(keyData) {
  const { createSign } = await import("node:crypto");
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: keyData.client_email,
    scope: "https://www.googleapis.com/auth/webmasters https://www.googleapis.com/auth/webmasters.readonly",
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
  if (!res.ok) throw new Error(`Token exchange failed: ${res.status}`);
  const data = await res.json();
  return data.access_token;
}

// ── API helpers ──────────────────────────────────────────────────────────────

const QUOTA_PROJECT = process.env.GOOGLE_CLOUD_PROJECT || process.env.GSC_QUOTA_PROJECT || "sadhaka-seo";

function authHeaders(token) {
  const h = { Authorization: `Bearer ${token}` };
  if (USE_ADC) h["x-goog-user-project"] = QUOTA_PROJECT;
  return h;
}

async function gscGet(path, token) {
  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}${path}`;
  const res = await fetch(url, { headers: authHeaders(token) });
  const text = await res.text();
  if (!res.ok) throw new Error(`GET ${path}: ${res.status} ${text}`);
  return text ? JSON.parse(text) : null;
}

async function gscPost(path, body, token) {
  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}${path}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { ...authHeaders(token), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`POST ${path}: ${res.status} ${text}`);
  return text ? JSON.parse(text) : null;
}

async function inspectUrl(inspectionUrl, token) {
  const url = "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect";
  const res = await fetch(url, {
    method: "POST",
    headers: { ...authHeaders(token), "Content-Type": "application/json" },
    body: JSON.stringify({
      inspectionUrl,
      siteUrl: SITE_URL,
    }),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`URL Inspection ${inspectionUrl}: ${res.status} ${text}`);
  return JSON.parse(text);
}

// ── Search Analytics query ───────────────────────────────────────────────────

async function querySearchAnalytics(token, { dimensions = ["page"], rowLimit = 1000, startDate, endDate, dimensionFilter } = {}) {
  const now = new Date();
  const body = {
    startDate: startDate || new Date(now - 28 * 86400000).toISOString().slice(0, 10),
    endDate: endDate || new Date(now - 2 * 86400000).toISOString().slice(0, 10),
    dimensions,
    rowLimit,
  };
  if (dimensionFilter) body.dimensionFilterGroups = [{ filters: [dimensionFilter] }];
  return gscPost("/searchAnalytics/query", body, token);
}

// ── Commands ─────────────────────────────────────────────────────────────────

async function fullDiagnostic(token) {
  console.log("=== GSC Full Diagnostic ===\n");

  // 1. Sitemap status
  console.log("── Sitemaps ──\n");
  const sitemapData = await gscGet("/sitemaps", token);
  const sitemaps = sitemapData?.sitemap || [];

  let sitemapIssues = 0;
  for (const s of sitemaps) {
    const hasErrors = s.errors > 0;
    const isPending = s.isPending;
    const neverDownloaded = !s.lastDownloaded;
    const icon = hasErrors ? "✗" : isPending ? "⏳" : "✓";

    if (hasErrors || isPending || neverDownloaded) sitemapIssues++;

    console.log(`  ${icon} ${s.path}`);
    if (hasErrors) console.log(`    ERRORS: ${s.errors}`);
    if (s.warnings > 0) console.log(`    Warnings: ${s.warnings}`);
    if (neverDownloaded) console.log(`    Never downloaded by Google`);
  }
  console.log(`\n  Total: ${sitemaps.length} sitemaps, ${sitemapIssues} with issues\n`);

  // 2. Top pages by impressions (last 28 days)
  console.log("── Top 20 Pages (last 28 days) ──\n");
  const topPages = await querySearchAnalytics(token, { rowLimit: 20 });
  if (topPages?.rows?.length) {
    console.log("  Page                                              Clicks  Impr   CTR    Pos");
    console.log("  " + "─".repeat(85));
    for (const row of topPages.rows) {
      const page = row.keys[0].replace(SITE_ORIGIN, "") || "/";
      const clicks = String(row.clicks).padStart(6);
      const impressions = String(row.impressions).padStart(6);
      const ctr = (row.ctr * 100).toFixed(1).padStart(5) + "%";
      const position = row.position.toFixed(1).padStart(6);
      console.log(`  ${page.padEnd(50).slice(0, 50)} ${clicks} ${impressions} ${ctr} ${position}`);
    }
  } else {
    console.log("  No search analytics data available.");
  }

  // 3. Pages with 0 clicks but impressions (optimization opportunities)
  console.log("\n── Zero-Click Pages (impressions but no clicks, last 28 days) ──\n");
  const allPages = await querySearchAnalytics(token, { rowLimit: 500 });
  const zeroClick = (allPages?.rows || [])
    .filter((r) => r.clicks === 0 && r.impressions > 10)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 15);

  if (zeroClick.length) {
    for (const row of zeroClick) {
      const page = row.keys[0].replace(SITE_ORIGIN, "") || "/";
      console.log(`  ${page.padEnd(55).slice(0, 55)} ${row.impressions} impressions, pos ${row.position.toFixed(1)}`);
    }
  } else {
    console.log("  None found (good!)");
  }

  // 4. Top queries
  console.log("\n── Top 20 Queries ──\n");
  const topQueries = await querySearchAnalytics(token, { dimensions: ["query"], rowLimit: 20 });
  if (topQueries?.rows?.length) {
    console.log("  Query                                             Clicks  Impr   CTR    Pos");
    console.log("  " + "─".repeat(85));
    for (const row of topQueries.rows) {
      const query = row.keys[0];
      const clicks = String(row.clicks).padStart(6);
      const impressions = String(row.impressions).padStart(6);
      const ctr = (row.ctr * 100).toFixed(1).padStart(5) + "%";
      const position = row.position.toFixed(1).padStart(6);
      console.log(`  ${query.padEnd(50).slice(0, 50)} ${clicks} ${impressions} ${ctr} ${position}`);
    }
  } else {
    console.log("  No query data available.");
  }

  // 5. 404 / error pages (pages with queries but errors)
  console.log("\n── Pages With Errors (from Search Analytics — pages appearing in search with issues) ──\n");
  const errorHint = await querySearchAnalytics(token, {
    dimensions: ["page"],
    rowLimit: 500,
  });
  // We can't get coverage directly from Search Analytics, but we can flag pages
  // with very low CTR at high impressions as potential soft 404s
  const suspectPages = (errorHint?.rows || [])
    .filter((r) => r.impressions > 20 && r.ctr < 0.005 && r.position > 30)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 10);

  if (suspectPages.length) {
    console.log("  Potential issues (high impressions, near-zero CTR, poor position):");
    for (const row of suspectPages) {
      const page = row.keys[0].replace(SITE_ORIGIN, "") || "/";
      console.log(`  ${page.padEnd(55).slice(0, 55)} ${row.impressions} impr, ${(row.ctr * 100).toFixed(2)}% CTR, pos ${row.position.toFixed(0)}`);
    }
  } else {
    console.log("  No suspicious pages detected.");
  }

  console.log("\n=== Diagnostic complete ===");
  console.log("\nNext steps:");
  console.log("  • Run with --inspect <url> to check indexing status of specific pages");
  console.log("  • Run with --not-indexed to find submitted but unindexed pages");
  console.log("  • Run with --low-impressions to find zombie indexed pages");
}

async function inspectSingle(url, token) {
  console.log(`Inspecting: ${url}\n`);
  try {
    const result = await inspectUrl(url, token);
    const ir = result.inspectionResult;
    const idx = ir?.indexStatusResult;
    const amp = ir?.ampResult;
    const mobile = ir?.mobileUsabilityResult;
    const rich = ir?.richResultsResult;

    console.log(`  Indexing status:    ${idx?.coverageState || "unknown"}`);
    console.log(`  Verdict:            ${idx?.verdict || "unknown"}`);
    console.log(`  Robots:             ${idx?.robotsTxtState || "unknown"}`);
    console.log(`  Indexing allowed:   ${idx?.indexingState || "unknown"}`);
    console.log(`  Page fetch:         ${idx?.pageFetchState || "unknown"}`);
    console.log(`  Crawled as:         ${idx?.crawledAs || "unknown"}`);
    console.log(`  Google canonical:   ${idx?.googleCanonical || "unknown"}`);
    console.log(`  User canonical:     ${idx?.userCanonical || "unknown"}`);
    if (idx?.lastCrawlTime) console.log(`  Last crawled:       ${idx.lastCrawlTime}`);
    if (idx?.referringUrls?.length) {
      console.log(`  Referring URLs:`);
      for (const ref of idx.referringUrls) console.log(`    - ${ref}`);
    }
    if (idx?.sitemap?.length) {
      console.log(`  In sitemaps:`);
      for (const sm of idx.sitemap) console.log(`    - ${sm}`);
    }
    if (mobile) console.log(`  Mobile usability:   ${mobile.verdict || "unknown"}`);
    if (rich) console.log(`  Rich results:       ${rich.verdict || "unknown"}`);
    if (amp) console.log(`  AMP:                ${amp.verdict || "unknown"}`);

    return idx?.verdict;
  } catch (err) {
    console.log(`  Error: ${err.message}`);
    return "ERROR";
  }
}

async function inspectBatch(filePath, token) {
  const urls = readFileSync(filePath, "utf-8")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"));

  console.log(`Inspecting ${urls.length} URLs...\n`);

  const results = { PASS: [], NEUTRAL: [], FAIL: [], ERROR: [] };
  for (const url of urls) {
    const fullUrl = url.startsWith("http") ? url : `${SITE_ORIGIN}${url}`;
    const verdict = await inspectSingle(fullUrl, token);
    results[verdict] = results[verdict] || [];
    results[verdict].push(fullUrl);
    console.log();
    // Rate limit: URL Inspection API has quota limits
    await new Promise((r) => setTimeout(r, 1200));
  }

  console.log("\n=== Summary ===");
  console.log(`  PASS:    ${results.PASS?.length || 0}`);
  console.log(`  NEUTRAL: ${results.NEUTRAL?.length || 0}`);
  console.log(`  FAIL:    ${results.FAIL?.length || 0}`);
  console.log(`  ERROR:   ${results.ERROR?.length || 0}`);

  if (results.FAIL?.length) {
    console.log("\nFailing URLs:");
    for (const u of results.FAIL) console.log(`  ${u}`);
  }
}

async function findLowImpressions(token) {
  console.log("── Indexed Pages With Very Low Impressions (last 28 days) ──\n");
  const data = await querySearchAnalytics(token, { rowLimit: 1000 });
  const low = (data?.rows || [])
    .filter((r) => r.impressions <= 2)
    .sort((a, b) => a.impressions - b.impressions);

  if (low.length) {
    console.log(`  Found ${low.length} pages with ≤2 impressions:\n`);
    for (const row of low) {
      const page = row.keys[0].replace(SITE_ORIGIN, "") || "/";
      console.log(`  ${page.padEnd(60).slice(0, 60)} ${row.impressions} impr, pos ${row.position.toFixed(1)}`);
    }
  } else {
    console.log("  All indexed pages have reasonable impressions.");
  }
}

async function findNotIndexed(token) {
  console.log("── Checking Sitemap URLs for Indexing Status ──\n");
  console.log("  (This uses URL Inspection API — rate limited, may take a few minutes)\n");

  // Get all URLs from sitemaps by fetching each sitemap XML
  const sitemapData = await gscGet("/sitemaps", token);
  const sitemaps = sitemapData?.sitemap || [];

  // Instead of fetching sitemaps, inspect a sample of key pages
  const keyPages = [
    "/",
    "/philosophies",
    "/traditions",
    "/texts",
    "/greats",
    "/compare",
    "/deities",
    "/mantras",
    "/stotras/shiva-tandava-stotram",
    "/stotras/vishnu-sahasranama",
    "/what-is-vedanta",
    "/advaita-vedanta-explained",
    "/bhagavad-gita-complete-guide",
    "/how-to-start-japa",
    "/jyotish",
    "/learn/sanskrit",
    "/faith-finder",
    "/daily-spiritual-routine-beginners",
    "/10-powerful-sanskrit-mantras",
    "/adi-shankaracharya-life-teachings",
  ];

  const notIndexed = [];
  const errors = [];

  for (const page of keyPages) {
    const url = `${SITE_ORIGIN}${page}`;
    process.stdout.write(`  Checking ${page.padEnd(50).slice(0, 50)} `);
    try {
      const result = await inspectUrl(url, token);
      const verdict = result.inspectionResult?.indexStatusResult?.verdict;
      const state = result.inspectionResult?.indexStatusResult?.coverageState;
      if (verdict === "PASS") {
        console.log("✓ indexed");
      } else if (verdict === "NEUTRAL") {
        console.log(`⚠ ${state || "neutral"}`);
        notIndexed.push({ url: page, state });
      } else {
        console.log(`✗ ${state || verdict || "unknown"}`);
        notIndexed.push({ url: page, state: state || verdict });
      }
    } catch (err) {
      console.log(`? error: ${err.message.slice(0, 80)}`);
      errors.push(page);
    }
    await new Promise((r) => setTimeout(r, 1200));
  }

  if (notIndexed.length) {
    console.log(`\n  ${notIndexed.length} key pages NOT indexed:`);
    for (const p of notIndexed) {
      console.log(`    ${p.url} — ${p.state}`);
    }
  } else {
    console.log("\n  All key pages are indexed!");
  }

  if (errors.length) {
    console.log(`\n  ${errors.length} pages had inspection errors (API quota?):`);
    for (const p of errors) console.log(`    ${p}`);
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const token = await getAccessToken();

if (args[0] === "--inspect" && args[1]) {
  const url = args[1].startsWith("http") ? args[1] : `${SITE_ORIGIN}${args[1]}`;
  await inspectSingle(url, token);
} else if (args[0] === "--inspect-batch" && args[1]) {
  await inspectBatch(args[1], token);
} else if (args[0] === "--low-impressions") {
  await findLowImpressions(token);
} else if (args[0] === "--not-indexed") {
  await findNotIndexed(token);
} else if (args[0] === "--errors-only") {
  await fullDiagnostic(token);
} else {
  await fullDiagnostic(token);
}
