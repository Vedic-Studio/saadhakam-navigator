#!/usr/bin/env node
/**
 * GA4 snapshot pull — overview + top pages + events + trend + quiz funnel + AI-engine referrers.
 *
 * Usage:
 *   node scripts/ga4-pull-snapshot.mjs --days 28
 *   node scripts/ga4-pull-snapshot.mjs --days 90
 *   node scripts/ga4-pull-snapshot.mjs --check       # admin-API sanity check on property ID
 *
 * Reads GA4_PROPERTY_ID / GOOGLE_SERVICE_ACCOUNT_FILE from env (or .env.local).
 *
 * Mirrors the body shapes used by src/lib/analytics/google.ts fetchGa4DashboardData,
 * with one extra query: AI-engine referrer breakdown (chatgpt.com, perplexity.ai, claude.ai,
 * gemini.google.com, copilot.microsoft.com).
 */

import { readFileSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createSign } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

function loadEnvLocal() {
  const path = resolve(ROOT, ".env.local");
  if (!existsSync(path)) return;
  for (const raw of readFileSync(path, "utf-8").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq < 0) continue;
    const k = line.slice(0, eq).trim();
    const v = line.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[k]) process.env[k] = v;
  }
}
loadEnvLocal();

const KEY_FILE = process.env.GOOGLE_SERVICE_ACCOUNT_FILE || resolve(ROOT, ".data", "google-service-account.json");
const PROPERTY_ID = process.env.GA4_PROPERTY_ID;
const USE_ADC = process.env.GA4_AUTH === "adc" || process.env.GSC_AUTH === "adc" || !existsSync(KEY_FILE);
const QUOTA_PROJECT = process.env.GOOGLE_CLOUD_PROJECT || process.env.GSC_QUOTA_PROJECT || "sadhaka-seo";
if (!PROPERTY_ID) {
  console.error("GA4_PROPERTY_ID not set. Add to .env.local.");
  process.exit(1);
}

function parseArgs(argv) {
  const out = { days: 28, outDir: resolve(ROOT, "docs/analytics-snapshots"), date: new Date().toISOString().slice(0, 10), check: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--days") out.days = Number(argv[++i]);
    else if (a === "--out-dir") out.outDir = resolve(ROOT, argv[++i]);
    else if (a === "--date") out.date = argv[++i];
    else if (a === "--check") out.check = true;
  }
  return out;
}
const ARGS = parseArgs(process.argv.slice(2));
mkdirSync(ARGS.outDir, { recursive: true });

async function getAccessToken(scopes) {
  if (USE_ADC) {
    const { google } = await import("googleapis");
    const auth = new google.auth.GoogleAuth({ scopes });
    const client = await auth.getClient();
    const token = await client.getAccessToken();
    return token.token;
  }
  const keyData = JSON.parse(readFileSync(KEY_FILE, "utf-8"));
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = { iss: keyData.client_email, scope: scopes.join(" "), aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 };
  const b64 = (obj) => Buffer.from(JSON.stringify(obj)).toString("base64url");
  const unsigned = `${b64(header)}.${b64(payload)}`;
  const sign = createSign("RSA-SHA256");
  sign.update(unsigned);
  const sig = sign.sign(keyData.private_key, "base64url");
  const jwt = `${unsigned}.${sig}`;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });
  if (!res.ok) throw new Error(`Token exchange failed: ${res.status} ${await res.text()}`);
  return (await res.json()).access_token;
}

async function ga4Run(body, token) {
  const url = `https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:runReport`;
  const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
  if (USE_ADC) headers["x-goog-user-project"] = QUOTA_PROJECT;
  const res = await fetch(url, { method: "POST", headers, body: JSON.stringify(body) });
  const text = await res.text();
  if (!res.ok) throw new Error(`GA4 runReport failed: ${res.status} ${text}`);
  return text ? JSON.parse(text) : null;
}

async function adminCheck(token) {
  const headers = { Authorization: `Bearer ${token}` };
  if (USE_ADC) headers["x-goog-user-project"] = QUOTA_PROJECT;
  const res = await fetch(`https://analyticsadmin.googleapis.com/v1beta/properties/${PROPERTY_ID}`, { headers });
  const text = await res.text();
  if (!res.ok) {
    return { ok: false, status: res.status, body: text };
  }
  return { ok: true, property: JSON.parse(text) };
}

function getDateRange(days) {
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - 1); // GA4 lag is shorter than GSC
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - (days - 1));
  return { startDate: start.toISOString().slice(0, 10), endDate: end.toISOString().slice(0, 10) };
}

function num(v) { return v ? Number(v) : 0; }
function dim(row, i) { return row?.dimensionValues?.[i]?.value || ""; }
function metric(row, i) { return num(row?.metricValues?.[i]?.value); }

async function main() {
  const dataToken = await getAccessToken(["https://www.googleapis.com/auth/analytics.readonly"]);
  const adminToken = await getAccessToken(["https://www.googleapis.com/auth/analytics.readonly"]);

  if (ARGS.check) {
    const r = await adminCheck(adminToken);
    if (r.ok) {
      console.log(`[ga4-check] ✓ property ${PROPERTY_ID} = ${r.property.displayName} (${r.property.timeZone})`);
    } else {
      console.error(`[ga4-check] ✗ property ${PROPERTY_ID}: HTTP ${r.status}`);
      console.error(r.body);
      process.exit(1);
    }
    return;
  }

  console.log(`[ga4-pull] window=${ARGS.days}d property=${PROPERTY_ID}`);
  const range = getDateRange(ARGS.days);
  const dateRanges = [{ startDate: range.startDate, endDate: range.endDate }];
  console.log(`[ga4-pull] range=${range.startDate} → ${range.endDate}`);

  // Sanity-check the property first so we fail with a clear message.
  const check = await adminCheck(adminToken);
  if (!check.ok) {
    console.error(`[ga4-pull] property ${PROPERTY_ID} unreachable: HTTP ${check.status}`);
    console.error(check.body);
    process.exit(1);
  }
  console.log(`[ga4-pull] ✓ property = ${check.property.displayName} (${check.property.timeZone})`);

  const [overviewRes, pagesRes, eventsRes, trendRes, quizRes, sourceRes] = await Promise.all([
    ga4Run({ dateRanges, metrics: [{ name: "sessions" }, { name: "activeUsers" }, { name: "newUsers" }, { name: "engagementRate" }, { name: "screenPageViews" }] }, dataToken),
    ga4Run({ dateRanges, dimensions: [{ name: "pagePath" }], metrics: [{ name: "screenPageViews" }, { name: "sessions" }], orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }], limit: 25 }, dataToken),
    ga4Run({ dateRanges, dimensions: [{ name: "eventName" }], metrics: [{ name: "eventCount" }], orderBys: [{ metric: { metricName: "eventCount" }, desc: true }], limit: 25 }, dataToken),
    ga4Run({ dateRanges, dimensions: [{ name: "date" }], metrics: [{ name: "sessions" }, { name: "activeUsers" }], orderBys: [{ dimension: { dimensionName: "date" } }], limit: ARGS.days + 1 }, dataToken),
    ga4Run({
      dateRanges,
      dimensions: [{ name: "eventName" }],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: { filter: { fieldName: "eventName", inListFilter: { values: ["faith_finder_quiz_start", "faith_finder_quiz_complete", "faith_finder_email_capture", "faith_finder_start", "faith_finder_complete", "email_capture"] } } },
      limit: 20,
    }, dataToken),
    ga4Run({
      dateRanges,
      dimensions: [{ name: "sessionSource" }, { name: "sessionMedium" }],
      metrics: [{ name: "sessions" }, { name: "activeUsers" }, { name: "engagementRate" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 30,
    }, dataToken),
  ]);

  const overviewRow = overviewRes?.rows?.[0];
  const overview = {
    sessions: metric(overviewRow, 0),
    activeUsers: metric(overviewRow, 1),
    newUsers: metric(overviewRow, 2),
    engagementRate: metric(overviewRow, 3),
    pageViews: metric(overviewRow, 4),
  };

  const topPages = (pagesRes?.rows ?? []).map((r) => ({ page: dim(r, 0), pageViews: metric(r, 0), sessions: metric(r, 1) }));
  const events = (eventsRes?.rows ?? []).map((r) => ({ eventName: dim(r, 0), eventCount: metric(r, 0) }));
  const trend = (trendRes?.rows ?? []).map((r) => ({ date: dim(r, 0), sessions: metric(r, 0), activeUsers: metric(r, 1) }));
  const quizFunnel = (quizRes?.rows ?? []).map((r) => ({ eventName: dim(r, 0), count: metric(r, 0) }));

  const allSources = (sourceRes?.rows ?? []).map((r) => ({
    source: dim(r, 0),
    medium: dim(r, 1),
    sessions: metric(r, 0),
    activeUsers: metric(r, 1),
    engagementRate: metric(r, 2),
  }));

  const AI_ENGINES = [
    "chatgpt.com", "chat.openai.com",
    "perplexity.ai", "www.perplexity.ai",
    "claude.ai",
    "gemini.google.com", "bard.google.com",
    "copilot.microsoft.com", "bing.com/chat",
    "you.com",
    "phind.com",
  ];
  const aiReferrers = allSources.filter((r) => AI_ENGINES.some((eng) => r.source.toLowerCase().includes(eng.toLowerCase())));

  const overviewOut = {
    source: "ga4-snapshot",
    propertyId: PROPERTY_ID,
    propertyName: check.property.displayName,
    timeZone: check.property.timeZone,
    pulledAt: new Date().toISOString(),
    windowDays: ARGS.days,
    range,
    overview,
    topPages,
    events,
    trend,
    quizFunnel,
    sourceMix: allSources,
  };

  const overviewPath = resolve(ARGS.outDir, `${ARGS.date}-ga4-overview-${ARGS.days}d.json`);
  writeFileSync(overviewPath, JSON.stringify(overviewOut, null, 2));
  console.log(`[ga4-pull] wrote ${overviewPath}`);

  // AI referrers — only emit a separate file on the 28d run to avoid duplication.
  if (ARGS.days === 28) {
    const aiOut = {
      source: "ga4-ai-referrers",
      propertyId: PROPERTY_ID,
      pulledAt: new Date().toISOString(),
      windowDays: ARGS.days,
      range,
      enginesQueried: AI_ENGINES,
      matched: aiReferrers,
      totalSessions: aiReferrers.reduce((acc, r) => acc + r.sessions, 0),
      totalActiveUsers: aiReferrers.reduce((acc, r) => acc + r.activeUsers, 0),
    };
    const aiPath = resolve(ARGS.outDir, `${ARGS.date}-ga4-ai-referrers.json`);
    writeFileSync(aiPath, JSON.stringify(aiOut, null, 2));
    console.log(`[ga4-pull] wrote ${aiPath}  (${aiOut.totalSessions} AI-engine sessions in ${ARGS.days}d)`);
  }

  console.log(`[ga4-pull] DONE  sessions=${overview.sessions}  users=${overview.activeUsers}  pageviews=${overview.pageViews}  events=${events.length}`);
}

main().catch((err) => {
  console.error("[ga4-pull] FAIL", err.message);
  process.exit(1);
});
