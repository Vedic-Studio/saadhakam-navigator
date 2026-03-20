#!/usr/bin/env node

/**
 * Checks the live status of submitted backlinks.
 * For each submitted target, fetches the live URL and verifies the backlink exists.
 *
 * Usage: node scripts/backlinks/check-status.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const targets = JSON.parse(
  readFileSync(join(__dirname, "targets.json"), "utf-8")
);
const config = JSON.parse(readFileSync(join(__dirname, "config.json"), "utf-8"));

const OUR_DOMAINS = config.sites.map((s) => new URL(s.url).hostname);

async function checkLink(target) {
  if (!target.live_url) {
    return { ...target, check_result: "no_url", check_detail: "No live URL recorded" };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(target.live_url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; SadhakaBacklinkChecker/1.0; +https://opensadhaka.com)",
      },
      redirect: "follow",
    });

    clearTimeout(timeout);

    if (!res.ok) {
      return {
        ...target,
        check_result: "http_error",
        check_detail: `HTTP ${res.status}`,
      };
    }

    const html = await res.text();

    // Check if any of our domains appear in the page
    const hasLink = OUR_DOMAINS.some((domain) => html.includes(domain));

    // Check for nofollow on our links
    let linkType = "unknown";
    if (hasLink) {
      for (const domain of OUR_DOMAINS) {
        // Simple regex to find our link and check rel attribute
        const linkPattern = new RegExp(
          `<a[^>]*href="[^"]*${domain.replace(".", "\\.")}[^"]*"[^>]*>`,
          "gi"
        );
        const matches = html.match(linkPattern);
        if (matches) {
          const hasNofollow = matches.some(
            (m) => m.includes('rel="nofollow"') || m.includes("nofollow")
          );
          linkType = hasNofollow ? "nofollow" : "dofollow";
          break;
        }
      }
    }

    return {
      ...target,
      check_result: hasLink ? "live" : "no_backlink",
      check_detail: hasLink
        ? `Link found (${linkType})`
        : "Page loads but no link to our domain found",
      detected_link_type: linkType,
    };
  } catch (err) {
    return {
      ...target,
      check_result: "fetch_error",
      check_detail: err.message,
    };
  }
}

async function main() {
  const now = new Date().toISOString().split("T")[0];
  console.log(`\nBacklink Status Report — ${now}`);
  console.log("=".repeat(50));

  const submitted = targets.filter(
    (t) => t.status === "submitted" || t.status === "verified"
  );
  const pending = targets.filter((t) => t.status === "not_started");

  if (submitted.length === 0) {
    console.log("\nNo submitted backlinks to check yet.");
    console.log(`${pending.length} targets pending submission.\n`);
    return;
  }

  console.log(`\nChecking ${submitted.length} submitted links...\n`);

  const results = [];
  for (const target of submitted) {
    const result = await checkLink(target);
    results.push(result);

    const icon =
      result.check_result === "live"
        ? "\x1b[32m[LIVE]\x1b[0m"
        : result.check_result === "no_backlink"
          ? "\x1b[33m[NO LINK]\x1b[0m"
          : "\x1b[31m[DOWN]\x1b[0m";

    console.log(
      `  ${icon} ${result.platform} (${result.link_type}) — ${result.check_detail}`
    );
    if (result.live_url) console.log(`         ${result.live_url}`);
  }

  // Summary
  const live = results.filter((r) => r.check_result === "live").length;
  const down = results.filter(
    (r) => r.check_result === "http_error" || r.check_result === "fetch_error"
  ).length;
  const noBacklink = results.filter(
    (r) => r.check_result === "no_backlink"
  ).length;
  const dofollowLive = results.filter(
    (r) =>
      r.check_result === "live" &&
      (r.detected_link_type === "dofollow" || r.link_type === "dofollow")
  ).length;
  const nofollowLive = results.filter(
    (r) =>
      r.check_result === "live" &&
      (r.detected_link_type === "nofollow" || r.link_type === "nofollow")
  ).length;

  console.log(`\n${"—".repeat(50)}`);
  console.log(`Summary: ${live}/${submitted.length} live, ${pending.length} pending, ${down} down, ${noBacklink} missing link`);
  console.log(`Dofollow: ${dofollowLive} | Nofollow: ${nofollowLive}`);

  // Save results
  const reportPath = join(__dirname, `status-${now}.json`);
  writeFileSync(
    reportPath,
    JSON.stringify(
      {
        date: now,
        total_targets: targets.length,
        submitted: submitted.length,
        pending: pending.length,
        live,
        down,
        no_backlink: noBacklink,
        dofollow_live: dofollowLive,
        nofollow_live: nofollowLive,
        results: results.map((r) => ({
          platform: r.platform,
          live_url: r.live_url,
          check_result: r.check_result,
          check_detail: r.check_detail,
          detected_link_type: r.detected_link_type,
        })),
      },
      null,
      2
    )
  );
  console.log(`\nDetailed results saved to: ${reportPath}\n`);
}

main().catch(console.error);
