#!/usr/bin/env node

/**
 * Generates a markdown checklist for backlink submissions.
 * Reads config.json + targets.json and outputs a prioritized, copy-paste-ready checklist.
 *
 * Usage: node scripts/backlinks/generate-checklist.mjs [--pending-only]
 */

import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const config = JSON.parse(readFileSync(join(__dirname, "config.json"), "utf-8"));
const targets = JSON.parse(
  readFileSync(join(__dirname, "targets.json"), "utf-8")
);

const pendingOnly = process.argv.includes("--pending-only");

const siteLookup = Object.fromEntries(config.sites.map((s) => [s.id, s]));

const STATUS_ICONS = {
  not_started: "[ ]",
  submitted: "[x]",
  verified: "[x]",
  failed: "[!]",
};

const sorted = [...targets].sort((a, b) => a.priority - b.priority);

const filtered = pendingOnly
  ? sorted.filter((t) => t.status === "not_started")
  : sorted;

const dofollow = filtered.filter((t) => t.link_type === "dofollow");
const nofollow = filtered.filter((t) => t.link_type === "nofollow");

function getSiteData(siteId) {
  return siteLookup[siteId] || config.sites[0];
}

function renderTarget(t) {
  const site = getSiteData(t.for_site);
  const icon = STATUS_ICONS[t.status] || "[ ]";
  const lines = [];

  lines.push(
    `### ${icon} Priority ${t.priority}: ${t.platform} (DR ${t.dr}, ${t.link_type})`
  );
  lines.push("");

  if (t.status === "submitted" || t.status === "verified") {
    lines.push(`- **Status**: Submitted on ${t.submitted_date}`);
    if (t.live_url) lines.push(`- **Live URL**: ${t.live_url}`);
    lines.push(`- **Indexed**: ${t.indexed ? "Yes" : "No"}`);
  } else {
    lines.push(`- **Status**: Not started`);
    if (t.signup_url) lines.push(`- **Signup URL**: ${t.signup_url}`);
    lines.push(`- **Type**: ${t.type.replace(/_/g, " ")}`);
    lines.push(`- **Auth**: ${t.auth_method.replace(/_/g, " ")}`);
    lines.push("");
    lines.push("**Copy-paste data:**");
    lines.push(`- Name: ${site.name}`);
    lines.push(`- URL: ${site.url}`);
    lines.push(`- Description: ${site.short_description}`);
    lines.push(`- Category: ${site.category.join(", ")}`);
    if (site.founder) lines.push(`- Founder: ${site.founder.name}`);
  }

  if (t.notes) {
    lines.push("");
    lines.push(`> ${t.notes}`);
  }

  lines.push("");
  return lines.join("\n");
}

const now = new Date().toISOString().split("T")[0];
const output = [];

output.push(`# Backlink Submission Checklist`);
output.push(`Generated: ${now}`);
output.push("");

// Stats
const total = targets.length;
const submitted = targets.filter(
  (t) => t.status === "submitted" || t.status === "verified"
).length;
const pending = targets.filter((t) => t.status === "not_started").length;
const dofollowCount = targets.filter((t) => t.link_type === "dofollow").length;
const nofollowCount = targets.filter((t) => t.link_type === "nofollow").length;

output.push(`## Summary`);
output.push(`- Total targets: ${total}`);
output.push(`- Submitted: ${submitted}`);
output.push(`- Pending: ${pending}`);
output.push(`- Dofollow targets: ${dofollowCount}`);
output.push(`- Nofollow (brand/AI): ${nofollowCount}`);
output.push("");

if (dofollow.length > 0) {
  output.push(`---`);
  output.push("");
  output.push(`## Dofollow Targets (SEO Value)`);
  output.push("");
  dofollow.forEach((t) => output.push(renderTarget(t)));
}

if (nofollow.length > 0) {
  output.push(`---`);
  output.push("");
  output.push(`## Nofollow Targets (Brand + AI Visibility)`);
  output.push("");
  nofollow.forEach((t) => output.push(renderTarget(t)));
}

const checklistPath = join(__dirname, "CHECKLIST.md");
writeFileSync(checklistPath, output.join("\n"));

console.log(`Checklist generated: ${checklistPath}`);
console.log(`  ${submitted}/${total} submitted | ${pending} pending`);
console.log(
  `  ${dofollowCount} dofollow | ${nofollowCount} nofollow targets`
);
