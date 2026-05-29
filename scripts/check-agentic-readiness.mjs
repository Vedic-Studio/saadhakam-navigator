#!/usr/bin/env node
/**
 * check-agentic-readiness.mjs
 *
 * Static, deterministic checks aligned with Chrome Lighthouse's "Agentic
 * Browsing" audit category (https://developer.chrome.com/docs/lighthouse/agentic-browsing/scoring).
 *
 * It cannot run a headless browser here, so it covers the two pillars that are
 * statically detectable from source:
 *
 *   1. Layout stability (CLS): raw <img> elements should declare width/height
 *      (or use `fill` / an explicit aspect-ratio class, or be sized by a parent
 *      via object-cover + a height class) so agents — and humans — don't hit
 *      elements that move after layout.
 *   2. Accessibility tree: raw <img> elements should declare `alt`.
 *
 * The runtime pillars (full a11y tree validation + live CLS measurement) still
 * need a real Lighthouse run; the `## Verify` notes in
 * docs/agents/08-agentic-browsing.md cover that. WebMCP registration lives in
 * src/lib/webmcp.ts and is exercised by unit tests.
 *
 * Usage:
 *   node scripts/check-agentic-readiness.mjs           # report only (exit 0)
 *   node scripts/check-agentic-readiness.mjs --strict  # exit 1 if any findings
 */

import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "src");
const STRICT = process.argv.includes("--strict");

/** Recursively collect .tsx files under a directory. */
async function collectTsx(dir) {
    const out = [];
    const entries = await readdir(dir, { withFileTypes: true });
    for (const e of entries) {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) {
            if (e.name === "node_modules" || e.name === ".next") continue;
            out.push(...(await collectTsx(full)));
        } else if (e.name.endsWith(".tsx")) {
            out.push(full);
        }
    }
    return out;
}

/**
 * Extract every raw `<img ... >` tag (handles multi-line JSX). Scans forward
 * from each `<img` to the closing `>` while ignoring any `>` that sits inside a
 * `{...}` expression or a string — a plain regex terminates early on those and
 * produces false positives.
 */
function extractImgTags(src) {
    const tags = [];
    const re = /<img\b/g;
    let m;
    while ((m = re.exec(src)) !== null) {
        const start = m.index;
        let depth = 0;
        let quote = null;
        let end = -1;
        for (let i = start + 4; i < src.length; i += 1) {
            const ch = src[i];
            if (quote) {
                if (ch === quote) quote = null;
                continue;
            }
            if (ch === '"' || ch === "'" || ch === "`") {
                quote = ch;
            } else if (ch === "{") {
                depth += 1;
            } else if (ch === "}") {
                depth -= 1;
            } else if (ch === ">" && depth === 0) {
                end = i + 1;
                break;
            }
        }
        if (end === -1) continue;
        const tag = src.slice(start, end);
        const line = src.slice(0, start).split("\n").length;
        tags.push({ tag, line });
    }
    return tags;
}

const hasAttr = (tag, attr) => new RegExp(`\\b${attr}\\b`).test(tag);
// An <img> is considered layout-stable when it either declares its own box
// (width/height/aspect-ratio/fill) or is sized by its parent (object-cover with
// a height class like `h-full`/`h-64`), in which case the parent reserves space.
const declaresOwnBox = (tag) => /aspect-\[|aspect-ratio|\bfill\b/.test(tag);
const isParentSized = (tag) => /object-cover/.test(tag) && /\bh-(full|screen|\d|\[)/.test(tag);
const isLayoutStable = (tag) =>
    (hasAttr(tag, "width") && hasAttr(tag, "height")) || declaresOwnBox(tag) || isParentSized(tag);

async function main() {
    const files = await collectTsx(SRC);
    const clsFindings = [];
    const altFindings = [];

    for (const file of files) {
        const src = await readFile(file, "utf8");
        if (!src.includes("<img")) continue;
        const rel = path.relative(ROOT, file);
        for (const { tag, line } of extractImgTags(src)) {
            if (!isLayoutStable(tag)) {
                clsFindings.push(`${rel}:${line}`);
            }
            if (!hasAttr(tag, "alt")) {
                altFindings.push(`${rel}:${line}`);
            }
        }
    }

    console.log("Agentic Browsing readiness — static checks\n");

    console.log(`[CLS] raw <img> without width/height, fill, or aspect-ratio: ${clsFindings.length}`);
    for (const f of clsFindings) console.log(`  - ${f}`);

    console.log(`\n[A11y] raw <img> without alt: ${altFindings.length}`);
    for (const f of altFindings) console.log(`  - ${f}`);

    const total = clsFindings.length + altFindings.length;
    console.log(`\nTotal findings: ${total}`);
    console.log("Note: prefer next/image, or add explicit width/height (or an aspect-ratio container).");

    if (STRICT && total > 0) {
        process.exitCode = 1;
    }
}

main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
});
