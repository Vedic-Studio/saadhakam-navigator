#!/usr/bin/env node
/**
 * Comprehensive GSC data pull for traffic strategy analysis.
 * Pulls last 28d, last 90d, and last 16mo windows across queries, pages,
 * page×query, country, device. Writes JSON dump to data/gsc/.
 *
 * Auth: ADC (gcloud auth application-default login).
 * Property: sc-domain:opensadhaka.com (override via GSC_SITE_URL env).
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = resolve(ROOT, "data", "gsc");
mkdirSync(OUT_DIR, { recursive: true });

const SITE_URL = process.env.GSC_SITE_URL || "sc-domain:opensadhaka.com";
const SITE_ORIGIN = "https://www.opensadhaka.com";

// googleapis is installed at the parent repo
const { google } = await import("/Users/ankitmishra/Developer/Sadhaka/node_modules/googleapis/build/src/index.js");

const auth = new google.auth.GoogleAuth({
  scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
});
const client = await auth.getClient();
const sc = google.searchconsole({ version: "v1", auth: client });

const today = new Date();
const dt = (d) => new Date(d).toISOString().slice(0, 10);
const daysAgo = (n) => dt(today.getTime() - n * 86400000);

// GSC has a 2-day delay
const END_DATE = daysAgo(2);
const START_28 = daysAgo(30);
const START_90 = daysAgo(92);
const START_16MO = daysAgo(486); // ~16 months
const PRIOR_28_END = daysAgo(31);
const PRIOR_28_START = daysAgo(59);

async function query({ dimensions, rowLimit = 1000, startDate, endDate, dimensionFilterGroups }) {
  const res = await sc.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: {
      startDate,
      endDate,
      dimensions,
      rowLimit,
      ...(dimensionFilterGroups ? { dimensionFilterGroups } : {}),
    },
  });
  return res.data.rows || [];
}

const results = {
  meta: {
    generatedAt: new Date().toISOString(),
    site: SITE_URL,
    windows: {
      last28: { start: START_28, end: END_DATE },
      prior28: { start: PRIOR_28_START, end: PRIOR_28_END },
      last90: { start: START_90, end: END_DATE },
      last16mo: { start: START_16MO, end: END_DATE },
    },
  },
};

console.error("[1/14] Pulling 28d top queries...");
results.queries_28d = await query({ dimensions: ["query"], rowLimit: 1000, startDate: START_28, endDate: END_DATE });

console.error("[2/14] Pulling 28d top pages...");
results.pages_28d = await query({ dimensions: ["page"], rowLimit: 1000, startDate: START_28, endDate: END_DATE });

console.error("[3/14] Pulling 28d page×query pairs (for keyword mapping)...");
results.page_query_28d = await query({ dimensions: ["page", "query"], rowLimit: 5000, startDate: START_28, endDate: END_DATE });

console.error("[4/14] Pulling 28d country breakdown...");
results.country_28d = await query({ dimensions: ["country"], rowLimit: 50, startDate: START_28, endDate: END_DATE });

console.error("[5/14] Pulling 28d device breakdown...");
results.device_28d = await query({ dimensions: ["device"], rowLimit: 10, startDate: START_28, endDate: END_DATE });

console.error("[6/14] Pulling 28d search appearance...");
try {
  results.searchAppearance_28d = await query({ dimensions: ["searchAppearance"], rowLimit: 50, startDate: START_28, endDate: END_DATE });
} catch (e) {
  results.searchAppearance_28d = [];
  results.meta.searchAppearanceErr = e.message;
}

console.error("[7/14] Pulling 90d top queries...");
results.queries_90d = await query({ dimensions: ["query"], rowLimit: 2000, startDate: START_90, endDate: END_DATE });

console.error("[8/14] Pulling 90d top pages...");
results.pages_90d = await query({ dimensions: ["page"], rowLimit: 2000, startDate: START_90, endDate: END_DATE });

console.error("[9/14] Pulling 90d page×query pairs...");
results.page_query_90d = await query({ dimensions: ["page", "query"], rowLimit: 10000, startDate: START_90, endDate: END_DATE });

console.error("[10/14] Pulling 16mo top queries...");
results.queries_16mo = await query({ dimensions: ["query"], rowLimit: 5000, startDate: START_16MO, endDate: END_DATE });

console.error("[11/14] Pulling 16mo top pages...");
results.pages_16mo = await query({ dimensions: ["page"], rowLimit: 5000, startDate: START_16MO, endDate: END_DATE });

console.error("[12/14] Pulling prior 28d for delta comparison...");
results.queries_prior28 = await query({ dimensions: ["query"], rowLimit: 1000, startDate: PRIOR_28_START, endDate: PRIOR_28_END });
results.pages_prior28 = await query({ dimensions: ["page"], rowLimit: 1000, startDate: PRIOR_28_START, endDate: PRIOR_28_END });

console.error("[13/14] Pulling sitemap status...");
try {
  const sm = await sc.sitemaps.list({ siteUrl: SITE_URL });
  results.sitemaps = sm.data.sitemap || [];
} catch (e) {
  results.sitemaps = [];
  results.meta.sitemapErr = e.message;
}

console.error("[14/14] Pulling daily clicks/impressions trend (90d)...");
results.daily_90d = await query({ dimensions: ["date"], rowLimit: 100, startDate: START_90, endDate: END_DATE });

const outFile = resolve(OUT_DIR, `gsc-dump-${END_DATE}.json`);
writeFileSync(outFile, JSON.stringify(results, null, 2));
console.error(`\n✓ Wrote ${outFile}`);
console.error(`  28d queries: ${results.queries_28d.length}`);
console.error(`  28d pages: ${results.pages_28d.length}`);
console.error(`  28d page×query: ${results.page_query_28d.length}`);
console.error(`  90d queries: ${results.queries_90d.length}`);
console.error(`  90d pages: ${results.pages_90d.length}`);
console.error(`  16mo queries: ${results.queries_16mo.length}`);
console.error(`  16mo pages: ${results.pages_16mo.length}`);
console.error(`  Sitemaps: ${results.sitemaps.length}`);
