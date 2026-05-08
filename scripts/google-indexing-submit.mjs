#!/usr/bin/env node
/**
 * Submit URLs to the Google Indexing API.
 *
 * Note: Google "officially" supports only JobPosting and BroadcastEvent schemas
 * via this API, but it accepts URL_UPDATED notifications for any URL and is
 * widely used to nudge faster recrawls. Quota: 200 URLs/day per project by
 * default (raise via console request).
 *
 * Prerequisites:
 *   1. Place service account JSON at .data/google-service-account.json
 *      (or set GOOGLE_SERVICE_ACCOUNT_FILE env var)
 *   2. Enable the Indexing API in the GCP project
 *      (https://console.cloud.google.com/apis/library/indexing.googleapis.com)
 *   3. Add the service account email as an "Owner" of the GSC property
 *      that owns the URLs being submitted
 *
 * Usage:
 *   node scripts/google-indexing-submit.mjs <url> [<url>...]
 *   node scripts/google-indexing-submit.mjs --url https://a.test/ --url https://b.test/
 *   node scripts/google-indexing-submit.mjs --from path/to/urls.txt
 *   node scripts/google-indexing-submit.mjs --priority           # use priority list (CTR-surgery URLs)
 *   node scripts/google-indexing-submit.mjs --type URL_DELETED <url>
 *   node scripts/google-indexing-submit.mjs --dry-run --priority # preview without submitting
 *
 * Environment variables:
 *   GOOGLE_SERVICE_ACCOUNT_FILE  — path to service account JSON
 *                                  (default: .data/google-service-account.json)
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

async function getAccessToken() {
  let keyData;
  try {
    keyData = JSON.parse(readFileSync(KEY_FILE, "utf-8"));
  } catch {
    console.error(`Failed to read service account key at ${KEY_FILE}`);
    console.error("Create one at https://console.cloud.google.com/iam-admin/serviceaccounts");
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

async function publishUrlNotification(url, type, token) {
  const body = buildPublishBody(url, type);
  const res = await fetch(INDEXING_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
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

  console.log(
    `${opts.dryRun ? "[dry-run] " : ""}Submitting ${urls.length} URL(s) to Google Indexing API (${opts.type})...\n`
  );

  if (opts.dryRun) {
    for (const url of urls) console.log(`  • ${url}`);
    console.log(`\n[dry-run] No API calls made.`);
    return;
  }

  const token = await getAccessToken();

  const responses = [];
  for (const url of urls) {
    const result = await publishUrlNotification(url, opts.type, token);
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
