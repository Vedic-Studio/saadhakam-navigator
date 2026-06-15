#!/usr/bin/env node
/**
 * Ahrefs Domain Rating tracker — three modes:
 *
 *   node scripts/ahrefs-dr.mjs --target sadhguru.org   one-off DR check (outreach qualification)
 *   node scripts/ahrefs-dr.mjs --track                 own + competitors -> history + dated snapshot
 *   node scripts/ahrefs-dr.mjs --refresh-targets       refresh the dr field in backlinks/targets.json
 *
 * Uses the free, keyless Ahrefs DR endpoint. Sequential and low-volume by design:
 * the DR license forbids bulk/systematic querying, and every displayed report carries
 * attribution. No credentials required.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  fetchDomainRating,
  normalizeDomain,
  mergeHistory,
  computeDeltas,
  renderSnapshotMarkdown,
  checkFairUse,
  ATTRIBUTION,
} from "./lib/ahrefs-dr.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DOMAINS_CONFIG = resolve(ROOT, "data/dr/domains.json");
const HISTORY_FILE = resolve(ROOT, "data/dr/dr-history.json");
const SNAPSHOT_DIR = resolve(ROOT, "docs/analytics-snapshots");
const TARGETS_FILE = resolve(ROOT, "scripts/backlinks/targets.json");

const SPACING_MS = 1200; // polite gap between sequential requests
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function parseArgs(argv) {
  const args = argv.slice(2);
  const out = { mode: null, target: null, date: new Date().toISOString().slice(0, 10), help: false };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "--track") out.mode = "track";
    else if (a === "--refresh-targets") out.mode = "refresh-targets";
    else if (a === "--target") {
      out.mode = "target";
      out.target = args[++i] || null;
    } else if (a === "--date") out.date = args[++i];
    else if (a === "--help" || a === "-h") out.help = true;
    else if (!a.startsWith("--") && out.mode === "target" && !out.target) out.target = a;
    else if (!a.startsWith("--") && !out.mode) {
      out.mode = "target";
      out.target = a;
    }
  }
  return out;
}

function readJson(path, fallback) {
  if (!existsSync(path)) return fallback;
  return JSON.parse(readFileSync(path, "utf-8"));
}

/** Fetch DR for a list of domains sequentially; logs progress, skips failures. */
async function fetchSequential(domains) {
  const ratings = {};
  for (let i = 0; i < domains.length; i++) {
    const d = domains[i];
    try {
      const { domain, dr } = await fetchDomainRating(d);
      ratings[domain] = dr;
      console.log(`  ${domain} → DR ${dr}`);
    } catch (err) {
      console.error(`  ${d} → FAILED: ${err.message}`);
    }
    if (i < domains.length - 1) await sleep(SPACING_MS);
  }
  return ratings;
}

async function runTarget(target) {
  if (!target) {
    console.error("Usage: --target <domain>");
    process.exit(1);
  }
  const { domain, dr } = await fetchDomainRating(target);
  console.log(`${domain} → DR ${dr}`);
  console.log(ATTRIBUTION);
}

async function runTrack(date) {
  const config = readJson(DOMAINS_CONFIG, null);
  if (!config || !config.own) {
    console.error(`Missing or invalid config at ${DOMAINS_CONFIG}`);
    process.exit(1);
  }
  const competitors = Object.values(config.segments || {}).flat();
  const domains = [...new Set([config.own, ...competitors].map(normalizeDomain))];

  const warning = checkFairUse(domains.length);
  if (warning) {
    console.error(warning);
    process.exit(1);
  }

  console.log(`Fetching DR for ${domains.length} domains (${date})…`);
  const ratings = await fetchSequential(domains);

  const history = mergeHistory(readJson(HISTORY_FILE, null), { date, ratings });
  mkdirSync(dirname(HISTORY_FILE), { recursive: true });
  writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2) + "\n");

  const deltas = computeDeltas(history);
  const md = renderSnapshotMarkdown({ date, ownDomain: normalizeDomain(config.own), deltas });
  mkdirSync(SNAPSHOT_DIR, { recursive: true });
  const snapshotPath = resolve(SNAPSHOT_DIR, `${date}-dr-snapshot.md`);
  writeFileSync(snapshotPath, md);

  console.log(`\nHistory → ${HISTORY_FILE}`);
  console.log(`Snapshot → ${snapshotPath}`);
}

async function runRefreshTargets() {
  const targets = readJson(TARGETS_FILE, null);
  if (!Array.isArray(targets)) {
    console.error(`Missing or invalid targets file at ${TARGETS_FILE}`);
    process.exit(1);
  }
  const domains = [...new Set(targets.map((t) => normalizeDomain(t.url)))];

  const warning = checkFairUse(domains.length);
  if (warning) {
    console.error(warning);
    process.exit(1);
  }

  console.log(`Refreshing DR for ${domains.length} outreach domains…`);
  const ratings = await fetchSequential(domains);

  let updated = 0;
  for (const t of targets) {
    const domain = normalizeDomain(t.url);
    if (domain in ratings && ratings[domain] !== t.dr) {
      t.dr = ratings[domain];
      updated += 1;
    }
  }
  writeFileSync(TARGETS_FILE, JSON.stringify(targets, null, 2) + "\n");
  console.log(`\nUpdated ${updated} of ${targets.length} targets → ${TARGETS_FILE}`);
}

const HELP = `Ahrefs Domain Rating tracker

  --target <domain>     one-off DR check (prints DR + attribution)
  --track               fetch own + competitors, append to history, write dated snapshot
  --refresh-targets     refresh the dr field in scripts/backlinks/targets.json
  --date <YYYY-MM-DD>   override snapshot date (default: today)
  -h, --help            show this help

Data is provided under the Ahrefs Domain Rating License.
${ATTRIBUTION}`;

async function main() {
  const opts = parseArgs(process.argv);
  if (opts.help || !opts.mode) {
    console.log(HELP);
    process.exit(opts.help ? 0 : 1);
  }
  if (opts.mode === "target") await runTarget(opts.target);
  else if (opts.mode === "track") await runTrack(opts.date);
  else if (opts.mode === "refresh-targets") await runRefreshTargets();
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
