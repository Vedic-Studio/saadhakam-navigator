#!/usr/bin/env node
/**
 * Analyze the GSC dump and emit machine-readable analysis JSON + a short
 * stdout summary. Reads the latest dump in data/gsc/.
 *
 * CTR benchmarks (Advanced Web Ranking, 2024 averages) used to detect
 * underperformance:
 *   pos 1  → 39.8%   pos 6  →  4.7%
 *   pos 2  → 18.7%   pos 7  →  3.5%
 *   pos 3  → 10.2%   pos 8  →  2.6%
 *   pos 4  →  7.2%   pos 9  →  2.4%
 *   pos 5  →  5.1%   pos 10 →  2.2%
 *   pos 11-20 → 1.0% (avg)
 *   pos 21+   → 0.4%
 */

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const GSC_DIR = resolve(ROOT, "data", "gsc");

const SITE_ORIGIN = "https://www.opensadhaka.com";

const dumps = readdirSync(GSC_DIR).filter(f => f.startsWith("gsc-dump-")).sort().reverse();
if (!dumps.length) { console.error("No GSC dump found in data/gsc/"); process.exit(1); }
const dumpFile = resolve(GSC_DIR, dumps[0]);
const data = JSON.parse(readFileSync(dumpFile, "utf-8"));

const stripOrigin = (url) => url.replace(SITE_ORIGIN, "").replace(/\/$/, "") || "/";

// CTR benchmarks by position
const CTR_BENCH = {
  1: 0.398, 2: 0.187, 3: 0.102, 4: 0.072, 5: 0.051,
  6: 0.047, 7: 0.035, 8: 0.026, 9: 0.024, 10: 0.022,
};
function expectedCtr(position) {
  const p = Math.round(position);
  if (p <= 10) return CTR_BENCH[p] || 0.022;
  if (p <= 20) return 0.010;
  return 0.004;
}

// ── Aggregations ─────────────────────────────────────────────────────────────

function totals(rows) {
  return rows.reduce((acc, r) => ({
    clicks: acc.clicks + r.clicks,
    impressions: acc.impressions + r.impressions,
  }), { clicks: 0, impressions: 0 });
}

const tot28 = totals(data.pages_28d);
const totPrior28 = totals(data.pages_prior28);
const tot90 = totals(data.pages_90d);
const tot16 = totals(data.pages_16mo);

const t28Ctr = tot28.clicks / tot28.impressions;
const t90Ctr = tot90.clicks / tot90.impressions;

// ── Top pages 28d ────────────────────────────────────────────────────────────

const topPagesByClicks = [...data.pages_28d]
  .sort((a, b) => b.clicks - a.clicks)
  .slice(0, 30)
  .map(r => ({
    page: stripOrigin(r.keys[0]),
    clicks: r.clicks,
    impressions: r.impressions,
    ctr: r.ctr,
    position: r.position,
  }));

const topPagesByImpressions = [...data.pages_28d]
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 30)
  .map(r => ({
    page: stripOrigin(r.keys[0]),
    clicks: r.clicks,
    impressions: r.impressions,
    ctr: r.ctr,
    position: r.position,
  }));

// ── Top queries 28d ──────────────────────────────────────────────────────────

const topQueriesByClicks = [...data.queries_28d]
  .sort((a, b) => b.clicks - a.clicks)
  .slice(0, 50)
  .map(r => ({
    query: r.keys[0],
    clicks: r.clicks,
    impressions: r.impressions,
    ctr: r.ctr,
    position: r.position,
  }));

const topQueriesByImpressions = [...data.queries_28d]
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 50)
  .map(r => ({
    query: r.keys[0],
    clicks: r.clicks,
    impressions: r.impressions,
    ctr: r.ctr,
    position: r.position,
  }));

// ── CTR underperformers ──────────────────────────────────────────────────────
// Pages with ≥30 impressions where actual CTR is below 60% of benchmark for their position.

const ctrUnderperformers = data.pages_28d
  .filter(r => r.impressions >= 30)
  .map(r => {
    const exp = expectedCtr(r.position);
    const ratio = r.ctr / exp;
    const lostClicks = Math.max(0, Math.round(exp * r.impressions - r.clicks));
    return {
      page: stripOrigin(r.keys[0]),
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: r.ctr,
      ctrPct: (r.ctr * 100).toFixed(2),
      position: r.position,
      expectedCtr: exp,
      ctrRatio: ratio,
      lostClicksAtBenchmark: lostClicks,
    };
  })
  .filter(p => p.ctrRatio < 0.6 && p.position <= 30 && p.lostClicksAtBenchmark >= 3)
  .sort((a, b) => b.lostClicksAtBenchmark - a.lostClicksAtBenchmark)
  .slice(0, 40);

// Same logic for queries
const ctrUnderperformersQueries = data.queries_28d
  .filter(r => r.impressions >= 30)
  .map(r => {
    const exp = expectedCtr(r.position);
    const lostClicks = Math.max(0, Math.round(exp * r.impressions - r.clicks));
    return {
      query: r.keys[0],
      clicks: r.clicks,
      impressions: r.impressions,
      ctrPct: (r.ctr * 100).toFixed(2),
      position: r.position,
      expectedCtrPct: (exp * 100).toFixed(2),
      ctrRatio: r.ctr / exp,
      lostClicksAtBenchmark: lostClicks,
    };
  })
  .filter(p => p.ctrRatio < 0.6 && p.position <= 30 && p.lostClicksAtBenchmark >= 3)
  .sort((a, b) => b.lostClicksAtBenchmark - a.lostClicksAtBenchmark)
  .slice(0, 40);

// ── Striking distance — pos 8-20 with ≥50 impressions ───────────────────────

const strikingDistanceQueries = data.queries_28d
  .filter(r => r.position >= 8 && r.position <= 20 && r.impressions >= 50)
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 50)
  .map(r => ({
    query: r.keys[0],
    impressions: r.impressions,
    clicks: r.clicks,
    ctrPct: (r.ctr * 100).toFixed(2),
    position: r.position.toFixed(1),
  }));

const strikingDistancePages = data.pages_28d
  .filter(r => r.position >= 8 && r.position <= 20 && r.impressions >= 100)
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 30)
  .map(r => ({
    page: stripOrigin(r.keys[0]),
    impressions: r.impressions,
    clicks: r.clicks,
    ctrPct: (r.ctr * 100).toFixed(2),
    position: r.position.toFixed(1),
  }));

// ── Page topic clusters (group pages by category) ────────────────────────────

const categoryPattern = (page) => {
  if (page === "/") return "root";
  const seg = page.split("/").filter(Boolean)[0];
  if (!seg) return "root";
  // Editorial articles (no prefix)
  const knownPrefixes = new Set([
    "stotras", "what-is", "deities", "mantras", "compare", "practices",
    "traditions", "texts", "greats", "philosophies", "sahasranama",
    "festivals", "panchang", "jyotish", "learn", "faith-finder",
    "vedic-clock", "about", "privacy", "terms", "search",
    "ancient-wisdom-philosophies", "sacred-texts-teachings",
    "spiritual-traditions-paths", "blog", "library",
  ]);
  return knownPrefixes.has(seg) ? seg : "editorial";
};

const byCategory = {};
for (const r of data.pages_28d) {
  const page = stripOrigin(r.keys[0]);
  const cat = categoryPattern(page);
  byCategory[cat] = byCategory[cat] || { pages: 0, clicks: 0, impressions: 0 };
  byCategory[cat].pages++;
  byCategory[cat].clicks += r.clicks;
  byCategory[cat].impressions += r.impressions;
}
const categoryBreakdown = Object.entries(byCategory)
  .map(([cat, v]) => ({
    category: cat,
    pages: v.pages,
    clicks: v.clicks,
    impressions: v.impressions,
    ctrPct: ((v.clicks / Math.max(v.impressions, 1)) * 100).toFixed(2),
    clicksPerPage: (v.clicks / v.pages).toFixed(1),
  }))
  .sort((a, b) => b.clicks - a.clicks);

// ── Trend (28d vs prior 28d) ─────────────────────────────────────────────────

const pagesPriorMap = new Map(data.pages_prior28.map(r => [r.keys[0], r]));
const trendPages = data.pages_28d
  .filter(r => r.clicks >= 1 || r.impressions >= 50)
  .map(r => {
    const prior = pagesPriorMap.get(r.keys[0]);
    const priorClicks = prior?.clicks || 0;
    const priorImp = prior?.impressions || 0;
    return {
      page: stripOrigin(r.keys[0]),
      clicks: r.clicks,
      priorClicks,
      deltaClicks: r.clicks - priorClicks,
      impressions: r.impressions,
      priorImpressions: priorImp,
      deltaImpressions: r.impressions - priorImp,
      position: r.position,
    };
  });
const risingPages = [...trendPages].sort((a, b) => b.deltaClicks - a.deltaClicks).slice(0, 15);
const fallingPages = [...trendPages].filter(p => p.priorClicks > 0).sort((a, b) => a.deltaClicks - b.deltaClicks).slice(0, 15);

// ── Page-query expansion gaps ────────────────────────────────────────────────
// For each top page, list all queries it ranks for (data.page_query_28d already provides this).

const pageToQueries = new Map();
for (const r of data.page_query_28d) {
  const page = stripOrigin(r.keys[0]);
  const query = r.keys[1];
  pageToQueries.set(page, pageToQueries.get(page) || []);
  pageToQueries.get(page).push({
    query,
    clicks: r.clicks,
    impressions: r.impressions,
    position: r.position,
    ctr: r.ctr,
  });
}
// For each top-clicking page, sort its queries by impressions
const pageQueryMap = topPagesByClicks.slice(0, 20).map(p => ({
  page: p.page,
  totalClicks: p.clicks,
  totalImpressions: p.impressions,
  position: p.position,
  topQueries: (pageToQueries.get(p.page) || [])
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 8)
    .map(q => ({
      query: q.query,
      impressions: q.impressions,
      clicks: q.clicks,
      position: q.position.toFixed(1),
    })),
}));

// ── Country / Device ────────────────────────────────────────────────────────

const countryBreakdown = data.country_28d
  .map(r => ({
    country: r.keys[0],
    clicks: r.clicks,
    impressions: r.impressions,
    ctrPct: (r.ctr * 100).toFixed(2),
    position: r.position.toFixed(1),
  }))
  .sort((a, b) => b.clicks - a.clicks)
  .slice(0, 15);

const deviceBreakdown = data.device_28d.map(r => ({
  device: r.keys[0],
  clicks: r.clicks,
  impressions: r.impressions,
  ctrPct: (r.ctr * 100).toFixed(2),
  position: r.position.toFixed(1),
}));

// ── Sitemaps ────────────────────────────────────────────────────────────────

const sitemapStatus = (data.sitemaps || []).map(s => ({
  path: s.path,
  errors: s.errors || 0,
  warnings: s.warnings || 0,
  lastDownloaded: s.lastDownloaded || null,
  lastSubmitted: s.lastSubmitted || null,
  isPending: !!s.isPending,
  contents: s.contents,
}));

// ── Branded queries ─────────────────────────────────────────────────────────

const brandedQueries = data.queries_28d
  .filter(r => /sadhaka|opensadhaka/i.test(r.keys[0]))
  .map(r => ({
    query: r.keys[0],
    clicks: r.clicks,
    impressions: r.impressions,
    ctrPct: (r.ctr * 100).toFixed(2),
    position: r.position.toFixed(1),
  }));

// ── Daily trend ─────────────────────────────────────────────────────────────

const daily = data.daily_90d
  .sort((a, b) => a.keys[0].localeCompare(b.keys[0]))
  .map(r => ({ date: r.keys[0], clicks: r.clicks, impressions: r.impressions }));

// ── Build analysis output ───────────────────────────────────────────────────

const analysis = {
  meta: { ...data.meta, dumpFile },
  totals: {
    last28: { ...tot28, ctrPct: (t28Ctr * 100).toFixed(2) },
    prior28: { ...totPrior28, ctrPct: ((totPrior28.clicks / Math.max(totPrior28.impressions, 1)) * 100).toFixed(2) },
    last90: { ...tot90, ctrPct: (t90Ctr * 100).toFixed(2) },
    last16mo: { ...tot16, ctrPct: ((tot16.clicks / Math.max(tot16.impressions, 1)) * 100).toFixed(2) },
    delta28v28: {
      clicks: tot28.clicks - totPrior28.clicks,
      clicksPct: totPrior28.clicks > 0 ? (((tot28.clicks - totPrior28.clicks) / totPrior28.clicks) * 100).toFixed(1) : "n/a",
      impressions: tot28.impressions - totPrior28.impressions,
      impressionsPct: totPrior28.impressions > 0 ? (((tot28.impressions - totPrior28.impressions) / totPrior28.impressions) * 100).toFixed(1) : "n/a",
    },
  },
  topPagesByClicks,
  topPagesByImpressions,
  topQueriesByClicks,
  topQueriesByImpressions,
  ctrUnderperformersPages: ctrUnderperformers,
  ctrUnderperformersQueries,
  strikingDistanceQueries,
  strikingDistancePages,
  categoryBreakdown,
  risingPages,
  fallingPages,
  pageQueryMap,
  countryBreakdown,
  deviceBreakdown,
  sitemapStatus,
  brandedQueries,
  daily90d: daily,
};

const outFile = resolve(GSC_DIR, `gsc-analysis-${data.meta.windows.last28.end}.json`);
writeFileSync(outFile, JSON.stringify(analysis, null, 2));

// ── Stdout summary ──────────────────────────────────────────────────────────

console.log("\n=== GSC Analysis Summary ===\n");
console.log(`Window: last 28d = ${data.meta.windows.last28.start} → ${data.meta.windows.last28.end}\n`);

console.log("Totals:");
console.log(`  Last 28d:   ${tot28.clicks} clicks, ${tot28.impressions} impressions, CTR ${(t28Ctr*100).toFixed(2)}%`);
console.log(`  Prior 28d:  ${totPrior28.clicks} clicks, ${totPrior28.impressions} impressions`);
console.log(`  Δ clicks:   ${tot28.clicks - totPrior28.clicks} (${analysis.totals.delta28v28.clicksPct}%)`);
console.log(`  Last 90d:   ${tot90.clicks} clicks, ${tot90.impressions} impressions`);
console.log(`  Last 16mo:  ${tot16.clicks} clicks, ${tot16.impressions} impressions\n`);

console.log("Top 10 pages by clicks (28d):");
for (const p of topPagesByClicks.slice(0, 10)) {
  console.log(`  ${p.clicks.toString().padStart(4)} clicks · ${p.impressions.toString().padStart(5)} impr · pos ${p.position.toFixed(1).padStart(4)} · ${p.page}`);
}

console.log("\nTop 10 queries by clicks (28d):");
for (const q of topQueriesByClicks.slice(0, 10)) {
  console.log(`  ${q.clicks.toString().padStart(4)} clicks · ${q.impressions.toString().padStart(5)} impr · pos ${q.position.toFixed(1).padStart(4)} · ${q.query}`);
}

console.log("\nTop 10 queries by impressions (28d) — discoverability picture:");
for (const q of topQueriesByImpressions.slice(0, 10)) {
  console.log(`  ${q.impressions.toString().padStart(5)} impr · ${q.clicks.toString().padStart(3)} clicks · pos ${q.position.toFixed(1).padStart(4)} · CTR ${(q.ctr*100).toFixed(2)}% · ${q.query}`);
}

console.log("\nCTR underperformer pages (high impr, low CTR, lost clicks at benchmark):");
for (const p of ctrUnderperformers.slice(0, 10)) {
  console.log(`  -${p.lostClicksAtBenchmark} clicks lost · ${p.impressions} impr · ${p.ctrPct}% (vs ${(p.expectedCtr*100).toFixed(1)}%) · pos ${p.position.toFixed(1)} · ${p.page}`);
}

console.log("\nStriking-distance queries (pos 8-20, ≥50 impr):");
for (const q of strikingDistanceQueries.slice(0, 15)) {
  console.log(`  pos ${q.position.padStart(4)} · ${q.impressions.toString().padStart(4)} impr · ${q.ctrPct}% CTR · ${q.query}`);
}

console.log("\nCategory breakdown:");
for (const c of categoryBreakdown.slice(0, 12)) {
  console.log(`  ${c.category.padEnd(28)} ${c.pages.toString().padStart(4)} pages · ${c.clicks.toString().padStart(4)} clicks · ${c.impressions.toString().padStart(6)} impr · ${c.clicksPerPage} clicks/page`);
}

console.log("\nCountry top 5:");
for (const c of countryBreakdown.slice(0, 5)) {
  console.log(`  ${c.country.padEnd(8)} ${c.clicks.toString().padStart(4)} clicks · ${c.impressions.toString().padStart(5)} impr · ${c.ctrPct}% CTR · pos ${c.position}`);
}

console.log("\nDevice breakdown:");
for (const d of deviceBreakdown) {
  console.log(`  ${d.device.padEnd(8)} ${d.clicks.toString().padStart(4)} clicks · ${d.impressions.toString().padStart(5)} impr · ${d.ctrPct}% CTR · pos ${d.position}`);
}

console.log("\nBranded queries (sadhaka/opensadhaka):");
for (const q of brandedQueries.slice(0, 10)) {
  console.log(`  ${q.clicks.toString().padStart(4)} clicks · ${q.impressions.toString().padStart(4)} impr · ${q.ctrPct}% CTR · pos ${q.position} · ${q.query}`);
}

console.log("\nSitemaps:");
for (const s of sitemapStatus) {
  const flag = s.errors ? `✗ errors=${s.errors}` : s.warnings ? `⚠ warnings=${s.warnings}` : "✓";
  console.log(`  ${flag} ${s.path}`);
}

console.log(`\n✓ Wrote analysis to ${outFile}`);
