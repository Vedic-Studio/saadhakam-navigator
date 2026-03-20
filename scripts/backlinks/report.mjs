#!/usr/bin/env node

/**
 * Weekly backlink report — summarizes progress, identifies next actions.
 *
 * Usage: node scripts/backlinks/report.mjs
 */

import { readFileSync, readdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const targets = JSON.parse(
  readFileSync(join(__dirname, "targets.json"), "utf-8")
);

function loadLatestStatus() {
  const files = readdirSync(__dirname)
    .filter((f) => f.startsWith("status-") && f.endsWith(".json"))
    .sort()
    .reverse();

  if (files.length === 0) return null;
  return JSON.parse(readFileSync(join(__dirname, files[0]), "utf-8"));
}

function main() {
  const now = new Date().toISOString().split("T")[0];

  console.log(`\n${"=".repeat(55)}`);
  console.log(`  BACKLINK REPORT — ${now}`);
  console.log(`${"=".repeat(55)}\n`);

  // Overall stats
  const total = targets.length;
  const submitted = targets.filter(
    (t) => t.status === "submitted" || t.status === "verified"
  ).length;
  const pending = targets.filter((t) => t.status === "not_started").length;
  const dofollow = targets.filter((t) => t.link_type === "dofollow");
  const nofollow = targets.filter((t) => t.link_type === "nofollow");
  const dofollowSubmitted = dofollow.filter(
    (t) => t.status === "submitted" || t.status === "verified"
  ).length;
  const nofollowSubmitted = nofollow.filter(
    (t) => t.status === "submitted" || t.status === "verified"
  ).length;

  console.log("  PROGRESS");
  console.log(`  ${"—".repeat(40)}`);
  console.log(`  Total targets:      ${total}`);
  console.log(`  Submitted:          ${submitted} (${Math.round((submitted / total) * 100)}%)`);
  console.log(`  Pending:            ${pending}`);
  console.log("");
  console.log(`  Dofollow:           ${dofollowSubmitted}/${dofollow.length} submitted`);
  console.log(`  Nofollow (brand):   ${nofollowSubmitted}/${nofollow.length} submitted`);

  // DR distribution
  const submittedTargets = targets.filter(
    (t) => t.status === "submitted" || t.status === "verified"
  );
  if (submittedTargets.length > 0) {
    const avgDR =
      submittedTargets.reduce((sum, t) => sum + t.dr, 0) /
      submittedTargets.length;
    const maxDR = Math.max(...submittedTargets.map((t) => t.dr));
    const minDR = Math.min(...submittedTargets.map((t) => t.dr));

    console.log("");
    console.log("  DR DISTRIBUTION (submitted links)");
    console.log(`  ${"—".repeat(40)}`);
    console.log(`  Average DR:         ${Math.round(avgDR)}`);
    console.log(`  Highest DR:         ${maxDR}`);
    console.log(`  Lowest DR:          ${minDR}`);
  }

  // Latest status check
  const latestStatus = loadLatestStatus();
  if (latestStatus) {
    console.log("");
    console.log(`  LAST STATUS CHECK (${latestStatus.date})`);
    console.log(`  ${"—".repeat(40)}`);
    console.log(`  Live:               ${latestStatus.live}`);
    console.log(`  Down:               ${latestStatus.down}`);
    console.log(`  Missing link:       ${latestStatus.no_backlink}`);
    console.log(`  Dofollow live:      ${latestStatus.dofollow_live}`);
    console.log(`  Nofollow live:      ${latestStatus.nofollow_live}`);
  }

  // Next actions
  const nextActions = targets
    .filter((t) => t.status === "not_started")
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 5);

  if (nextActions.length > 0) {
    console.log("");
    console.log("  NEXT ACTIONS");
    console.log(`  ${"—".repeat(40)}`);
    nextActions.forEach((t, i) => {
      console.log(
        `  ${i + 1}. ${t.platform} (DR ${t.dr}, ${t.link_type}) — ${t.type.replace(/_/g, " ")}`
      );
    });
  }

  // Platforms needing content
  const needsContent = targets.filter(
    (t) =>
      t.status === "not_started" &&
      ["blog_post_with_link", "article_with_links", "answer_with_links", "presentation_upload", "community_post"].includes(t.type)
  );

  if (needsContent.length > 0) {
    console.log("");
    console.log("  CONTENT NEEDED");
    console.log(`  ${"—".repeat(40)}`);
    needsContent.forEach((t) => {
      const template = t.notes?.match(/templates\/[\w-]+\.md/)?.[0] || "no template";
      console.log(`  - ${t.platform}: ${t.type.replace(/_/g, " ")} (${template})`);
    });
  }

  console.log(`\n${"=".repeat(55)}\n`);
}

main();
