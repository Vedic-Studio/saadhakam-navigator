#!/usr/bin/env node
/**
 * Submit URLs to the Google Indexing API.
 *
 * Note: Google "officially" supports only JobPosting and BroadcastEvent schemas
 * via this API, but it accepts URL_UPDATED notifications for any URL and is
 * widely used to nudge faster recrawls. Quota: 200 URLs/day per project by
 * default (raise via console request).
 *
 * Two auth paths are supported (mirrors gsc-diagnose.mjs):
 *
 *   • ADC (recommended) — set `GSC_AUTH=adc`. Uses your gcloud Application
 *     Default Credentials. You (the human owner of the GSC property) must have
 *     run:
 *         gcloud auth application-default login \
 *           --scopes=...,https://www.googleapis.com/auth/indexing
 *     and `gcloud auth application-default set-quota-project sadhaka-seo`.
 *     The Indexing API authenticates as the user, who is already a verified
 *     property owner, so no extra ownership-verification step is needed.
 *
 *   • Service account (legacy) — leave `GSC_AUTH` unset. Reads a JSON key at
 *     `.data/google-service-account.json` (or `GOOGLE_SERVICE_ACCOUNT_FILE`).
 *     The service account email must be added as an *Owner* of the GSC
 *     property; otherwise Google returns HTTP 403 "Failed to verify the URL
 *     ownership" on every submission.
 *
 * Usage:
 *   GSC_AUTH=adc node scripts/google-indexing-submit.mjs --priority
 *   node scripts/google-indexing-submit.mjs <url> [<url>...]
 *   node scripts/google-indexing-submit.mjs --url https://a.test/ --url https://b.test/
 *   node scripts/google-indexing-submit.mjs --from path/to/urls.txt
 *   node scripts/google-indexing-submit.mjs --type URL_DELETED <url>
 *   node scripts/google-indexing-submit.mjs --dry-run --priority # preview without submitting
 *
 * Environment variables:
 *   GSC_AUTH                     — set to "adc" to use ADC instead of SA
 *   GOOGLE_SERVICE_ACCOUNT_FILE  — path to service account JSON
 *                                  (default: .data/google-service-account.json)
 *   GOOGLE_CLOUD_PROJECT /
 *   GSC_QUOTA_PROJECT            — quota project for ADC mode
 *                                  (default: sadhaka-seo)
 */

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createSign } from "node:crypto";
import {
  parseSubmitArgs,
  normalizeUrlList,
  validateUrls,
  buildPublishBody,
  summarizeResponses,
  checkQuotaWarning,
  resolveAuthMode,
  buildAuthHeaders,
} from "./lib/google-indexing-helpers.mjs";
import { CTR_SURGERY_PRIORITY_URLS } from "./lib/google-indexing-priority.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const KEY_FILE =
  process.env.GOOGLE_SERVICE_ACCOUNT_FILE ||
  resolve(ROOT, ".data", "google-service-account.json");

const INDEXING_SCOPE = "https://www.googleapis.com/auth/indexing";
const INDEXING_ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish";

// ── Auth ─────────────────────────────────────────────────────────────────────

async function getAccessToken(authMode) {
  if (authMode.mode === "adc") {
    return getAccessTokenAdc();
  }
  return getAccessTokenServiceAccount();
}

async function getAccessTokenAdc() {
  try {
    const { google } = await import("googleapis");
    const auth = new google.auth.GoogleAuth({ scopes: [INDEXING_SCOPE] });
    const client = await auth.getClient();
    const token = await client.getAccessToken();
    if (!token.token) throw new Error("ADC returned empty access token");
    return token.token;
  } catch (err) {
    console.error("ADC auth failed:", err.message);
    console.error("Tip: run `gcloud auth application-default login` with the");
    console.error("     https://www.googleapis.com/auth/indexing scope, then");
    console.error("     `gcloud auth application-default set-quota-project sadhaka-seo`.");
    process.exit(1);
  }
}

async function getAccessTokenServiceAccount() {
  let keyData;
  try {
    keyData = JSON.parse(readFileSync(KEY_FILE, "utf-8"));
  } catch {
    console.error(`Failed to read service account key at ${KEY_FILE}`);
    console.error("Tip: set GSC_AUTH=adc to use gcloud application-default credentials instead.");
    console.error("Or create a service account at https://console.cloud.google.com/iam-admin/serviceaccounts");
    console.error("Then enable the Indexing API and grant Owner access to the GSC property.");
    process.exit(1);
  }

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: keyData.client_email,
    scope: INDEXING_SCOPE,
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

// ── API call ─────────────────────────────────────────────────────────────────

async function publishUrlNotification(url, type, token, authMode) {
  const body = buildPublishBody(url, type);
  const res = await fetch(INDEXING_ENDPOINT, {
    method: "POST",
    headers: buildAuthHeaders(token, authMode),
    body: JSON.stringify(body),
  });

  const text = await res.text();
  let parsed = null;
  try {
    parsed = text ? JSON.parse(text) : null;
  } catch {
    /* leave as null */
  }

  if (!res.ok) {
    return {
      url,
      ok: false,
      status: res.status,
      error: parsed?.error?.message || text || `HTTP ${res.status}`,
    };
  }

  const notifyTime = parsed?.urlNotificationMetadata?.latestUpdate?.notifyTime;
  return { url, ok: true, status: res.status, notifyTime };
}

// ── Help ─────────────────────────────────────────────────────────────────────

function printHelp() {
  console.log(`Usage: node scripts/google-indexing-submit.mjs [options] [<url>...]

Submit URLs to Google's Indexing API to nudge faster recrawls.

Options:
  -u, --url <url>       Add a URL to submit (can be repeated)
  -f, --from <file>     Read URLs from a file (one per line, # for comments)
  -t, --type <type>     URL_UPDATED (default) or URL_DELETED
      --priority        Submit the canonical CTR-surgery priority list
                        (the 14 pages from PR #20)
  -n, --dry-run         Print the URLs that would be submitted, no API calls
  -h, --help            Show this help

Examples:
  node scripts/google-indexing-submit.mjs --priority
  node scripts/google-indexing-submit.mjs https://www.opensadhaka.com/what-is-maya
  node scripts/google-indexing-submit.mjs --from urls.txt
  node scripts/google-indexing-submit.mjs --priority --dry-run

Quota: 200 URLs/day. ${CTR_SURGERY_PRIORITY_URLS.length} URLs in --priority list.`);
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  let opts;
  try {
    opts = parseSubmitArgs(process.argv);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error("Run with --help for usage.");
    process.exit(2);
  }

  if (opts.help) {
    printHelp();
    return;
  }

  let urls = [...opts.urls];

  if (opts.fromFile) {
    const content = readFileSync(resolve(opts.fromFile), "utf-8");
    urls.push(...content.split(/\r?\n/));
  }

  if (opts.usePriorityList) {
    urls.push(...CTR_SURGERY_PRIORITY_URLS);
  }

  urls = normalizeUrlList(urls);

  if (urls.length === 0) {
    console.error("No URLs to submit. Pass URLs as args, --url, --from <file>, or --priority.");
    console.error("Run with --help for usage.");
    process.exit(2);
  }

  const validationErrors = validateUrls(urls);
  if (validationErrors.length > 0) {
    console.error(`Invalid URLs (${validationErrors.length}):`);
    for (const e of validationErrors) console.error(`  ✗ ${e.url} — ${e.reason}`);
    process.exit(2);
  }

  const quotaWarning = checkQuotaWarning(urls.length);
  if (quotaWarning) console.warn(`⚠ ${quotaWarning}\n`);

  const authMode = resolveAuthMode(process.env);
  const authLabel = authMode.mode === "adc"
    ? `ADC (quota project: ${authMode.quotaProject})`
    : "service account";

  console.log(
    `${opts.dryRun ? "[dry-run] " : ""}Submitting ${urls.length} URL(s) to Google Indexing API (${opts.type}) via ${authLabel}...\n`
  );

  if (opts.dryRun) {
    for (const url of urls) console.log(`  • ${url}`);
    console.log(`\n[dry-run] No API calls made.`);
    return;
  }

  const token = await getAccessToken(authMode);

  const responses = [];
  for (const url of urls) {
    const result = await publishUrlNotification(url, opts.type, token, authMode);
    if (result.ok) {
      console.log(`  ✓ ${url}${result.notifyTime ? ` (notified at ${result.notifyTime})` : ""}`);
    } else {
      console.log(`  ✗ ${url} — HTTP ${result.status}: ${result.error}`);
    }
    responses.push(result);
  }

  const summary = summarizeResponses(responses);
  console.log(`\nDone: ${summary.ok} submitted, ${summary.failed} failed (of ${summary.total}).`);
  if (summary.failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(`Fatal: ${err.message}`);
  process.exit(1);
});
