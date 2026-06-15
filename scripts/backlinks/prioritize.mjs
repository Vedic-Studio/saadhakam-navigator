#!/usr/bin/env node

/**
 * Backlink outreach prioritizer — ranks pending targets by DR x relevance x link-type
 * so effort goes to real authority/DR-movers first, not vanity profiles.
 *
 * Reads targets.json (refresh DR first with `npm run backlinks:dr:refresh`).
 * Usage: node scripts/backlinks/prioritize.mjs
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { rankTargets, groupByTier } from "../lib/backlink-priority.mjs";
import { ATTRIBUTION } from "../lib/ahrefs-dr.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const targets = JSON.parse(readFileSync(join(__dirname, "targets.json"), "utf-8"));

const TIER_LABEL = {
  authority: "AUTHORITY — DR-MOVERS (dofollow, in-niche, earned)",
  foundational: "FOUNDATIONAL — PRESENCE (profiles, social, directories)",
};

function dofollowShare(list) {
  if (list.length === 0) return "0%";
  const n = list.filter((t) => t.link_type === "dofollow").length;
  return `${Math.round((n / list.length) * 100)}%`;
}

function avg(list, key) {
  if (list.length === 0) return 0;
  return Math.round(list.reduce((s, t) => s + (Number(t[key]) || 0), 0) / list.length);
}

function printTier(tier, all) {
  const tierTargets = all.filter((t) => t.tier === tier);
  const pending = rankTargets(tierTargets);
  console.log(`\n  ${TIER_LABEL[tier] || tier.toUpperCase()}`);
  console.log(`  ${"—".repeat(58)}`);
  console.log(
    `  ${tierTargets.length} targets · ${pending.length} pending · ` +
      `dofollow ${dofollowShare(tierTargets)} · avg DR ${avg(tierTargets, "dr")} · avg rel ${avg(tierTargets, "relevance")}`,
  );
  if (pending.length === 0) {
    console.log("  (nothing pending)");
    return;
  }
  console.log("");
  pending.forEach((t, i) => {
    const dr = t.dr == null ? "DR ?" : `DR ${t.dr}`;
    console.log(
      `  ${String(i + 1).padStart(2)}. ${t.platform}  [score ${t.score}]`,
    );
    console.log(
      `      ${dr} · rel ${t.relevance ?? "?"} · ${t.link_type} · ${t.type.replace(/_/g, " ")}`,
    );
    if (t.signup_url) console.log(`      → ${t.signup_url}`);
  });
}

function main() {
  const now = new Date().toISOString().split("T")[0];
  console.log(`\n${"=".repeat(62)}`);
  console.log(`  BACKLINK OUTREACH PRIORITY — ${now}`);
  console.log(`  score = DR × relevance(1-5) × link-weight (dofollow 1 / unconf .6 / nofollow .3)`);
  console.log(`${"=".repeat(62)}`);

  const groups = groupByTier(targets);
  printTier("authority", targets);
  printTier("foundational", targets);

  if (groups.untagged.length > 0) {
    console.log(`\n  ⚠ ${groups.untagged.length} targets have no tier — add "tier" to them.`);
  }

  console.log(`\n  ${ATTRIBUTION}`);
  console.log(`  DR figures are last-refreshed values; run \`npm run backlinks:dr:refresh\` to update.`);
  console.log(`\n${"=".repeat(62)}\n`);
}

main();
