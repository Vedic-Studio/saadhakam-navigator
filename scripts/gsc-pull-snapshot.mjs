#!/usr/bin/env node
/**
 * GSC snapshot pull — overview + queries + pages + query×page CTR scorer.
 *
 * Usage:
 *   node scripts/gsc-pull-snapshot.mjs --days 28 --out-dir docs/analytics-snapshots --date 2026-05-05
 *   node scripts/gsc-pull-snapshot.mjs --days 90
 *
 * Defaults: --days 28, --out-dir docs/analytics-snapshots, --date <today>.
 *
 * Reads GOOGLE_SERVICE_ACCOUNT_FILE / GSC_SITE_URL from env (or .env.local in repo root).
 *
 * CTR opportunity scorer ported from src/lib/analytics/google.ts so this runs without Next.
 */

import { readFileSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createSign } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// ── .env.local loader (very small) ───────────────────────────────────────────
function loadEnvLocal() {
  const path = resolve(ROOT, ".env.local");
  if (!existsSync(path)) return;
  const text = readFileSync(path, "utf-8");
  for (const raw of text.split(/\r?\n/)) {
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
const SITE_URL = process.env.GSC_SITE_URL || "sc-domain:opensadhaka.com";

// ── CLI args ─────────────────────────────────────────────────────────────────
function parseArgs(argv) {
  const out = { days: 28, outDir: resolve(ROOT, "docs/analytics-snapshots"), date: new Date().toISOString().slice(0, 10) };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--days") out.days = Number(argv[++i]);
    else if (a === "--out-dir") out.outDir = resolve(ROOT, argv[++i]);
    else if (a === "--date") out.date = argv[++i];
  }
  return out;
}
const ARGS = parseArgs(process.argv.slice(2));
mkdirSync(ARGS.outDir, { recursive: true });

// ── Auth (manual JWT, no googleapis dep needed) ──────────────────────────────
async function getAccessToken(scopes) {
  const keyData = JSON.parse(readFileSync(KEY_FILE, "utf-8"));
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: keyData.client_email,
    scope: scopes.join(" "),
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
  if (!res.ok) throw new Error(`Token exchange failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return data.access_token;
}

async function gscPost(path, body, token) {
  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}${path}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`POST ${path}: ${res.status} ${text}`);
  return text ? JSON.parse(text) : null;
}

// ── Date range (matches src/lib/analytics/google.ts getRecentDateRange) ──────
function getDateRange(days) {
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - 2);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - (days - 1));
  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
  };
}

// ── CTR benchmark (ported from src/lib/analytics/google.ts) ──────────────────
const CTR_BENCHMARK = [
  [1.5, 0.32], [2.5, 0.19], [3.5, 0.13], [4.5, 0.09], [5.5, 0.07],
  [6.5, 0.05], [7.5, 0.04], [8.5, 0.03], [9.5, 0.025], [10.5, 0.022],
  [15.5, 0.015], [20.5, 0.009], [Infinity, 0.005],
];
function expectedCtr(position) {
  if (!Number.isFinite(position) || position <= 0) return 0;
  for (const [maxPos, ctr] of CTR_BENCHMARK) if (position <= maxPos) return ctr;
  return 0;
}
function ctrOpportunityScore({ impressions, ctr, position }) {
  const exp = expectedCtr(position);
  const gap = Math.max(0, exp - ctr);
  return { expectedCtr: exp, ctrGap: gap, opportunityScore: Math.round(impressions * gap) };
}

function normalizePagePath(value) {
  if (!value) return "/";
  try {
    if (value.startsWith("http://") || value.startsWith("https://")) {
      const u = new URL(value);
      return `${u.pathname}${u.search}` || "/";
    }
  } catch {}
  return value.startsWith("/") ? value : `/${value}`;
}

function mapRow(row) {
  return {
    clicks: row?.clicks ?? 0,
    impressions: row?.impressions ?? 0,
    ctr: row?.ctr ?? 0,
    position: row?.position ?? 0,
  };
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`[gsc-pull] window=${ARGS.days}d site=${SITE_URL}`);
  const range = getDateRange(ARGS.days);
  console.log(`[gsc-pull] range=${range.startDate} → ${range.endDate}`);

  const token = await getAccessToken([
    "https://www.googleapis.com/auth/webmasters.readonly",
  ]);

  const baseBody = { startDate: range.startDate, endDate: range.endDate };

  const [overviewRes, appearanceRes, queryRes, pageRes, pairRes, trendRes] = await Promise.all([
    gscPost("/searchAnalytics/query", { ...baseBody, rowLimit: 1 }, token),
    gscPost("/searchAnalytics/query", { ...baseBody, dimensions: ["searchAppearance"], rowLimit: 30 }, token),
    gscPost("/searchAnalytics/query", { ...baseBody, dimensions: ["query"], rowLimit: 250 }, token),
    gscPost("/searchAnalytics/query", { ...baseBody, dimensions: ["page"], rowLimit: 250 }, token),
    gscPost("/searchAnalytics/query", { ...baseBody, dimensions: ["query", "page"], rowLimit: 1000 }, token),
    gscPost("/searchAnalytics/query", { ...baseBody, dimensions: ["date"], rowLimit: ARGS.days }, token),
  ]);

  const overview = mapRow(overviewRes?.rows?.[0]);
  const searchAppearance = (appearanceRes?.rows ?? []).map((r) => ({ appearance: r.keys?.[0] || "(unknown)", ...mapRow(r) }));
  const topQueries = (queryRes?.rows ?? []).map((r) => ({ query: r.keys?.[0] || "(unknown)", ...mapRow(r) }));
  const topPages = (pageRes?.rows ?? []).map((r) => ({ page: normalizePagePath(r.keys?.[0] || "/"), ...mapRow(r) }));
  const pairs = (pairRes?.rows ?? []).map((r) => {
    const base = mapRow(r);
    return { query: r.keys?.[0] || "(unknown)", page: normalizePagePath(r.keys?.[1] || "/"), ...base, ...ctrOpportunityScore(base) };
  });
  const trend = (trendRes?.rows ?? []).map((r) => ({ date: r.keys?.[0] || "", ...mapRow(r) }));

  // Overview file
  const overviewOut = {
    source: "gsc-snapshot",
    siteUrl: SITE_URL,
    pulledAt: new Date().toISOString(),
    windowDays: ARGS.days,
    range,
    overview,
    searchAppearance,
    topQueries: topQueries.slice(0, 100),
    topPages: topPages.slice(0, 100),
    trend,
  };

  const overviewPath = resolve(ARGS.outDir, `${ARGS.date}-gsc-overview-${ARGS.days}d.json`);
  writeFileSync(overviewPath, JSON.stringify(overviewOut, null, 2));
  console.log(`[gsc-pull] wrote ${overviewPath}`);

  // CTR audits at two impression thresholds
  for (const minImpressions of [25, 50]) {
    const queryCtrOpportunities = topQueries.filter((r) => r.impressions >= minImpressions);
    const pageCtrOpportunities = topPages.filter((r) => r.impressions >= minImpressions);
    const queryPageOpportunities = pairs
      .filter((r) => r.impressions >= minImpressions)
      .sort((a, b) => b.opportunityScore - a.opportunityScore);

    const ctrOut = {
      source: "gsc-ctr-audit",
      siteUrl: SITE_URL,
      pulledAt: new Date().toISOString(),
      windowDays: ARGS.days,
      range,
      thresholds: { minImpressions, queryRowLimit: 250, pageRowLimit: 250, pairRowLimit: 1000 },
      overview,
      searchAppearance,
      queryCtrOpportunities,
      pageCtrOpportunities,
      queryPageOpportunities,
    };

    const ctrPath = resolve(ARGS.outDir, `${ARGS.date}-gsc-ctr-audit-${ARGS.days}d-minimpr${minImpressions}.json`);
    writeFileSync(ctrPath, JSON.stringify(ctrOut, null, 2));
    console.log(`[gsc-pull] wrote ${ctrPath}`);
  }

  console.log(`[gsc-pull] DONE  clicks=${overview.clicks}  impressions=${overview.impressions}  ctr=${(overview.ctr*100).toFixed(2)}%  pos=${overview.position.toFixed(1)}`);
}

main().catch((err) => {
  console.error("[gsc-pull] FAIL", err.message);
  process.exit(1);
});
