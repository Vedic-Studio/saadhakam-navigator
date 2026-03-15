/**
 * Reads the image manifest and prints featuredImage entries ready to paste
 * into src/data/articles.ts. Optionally auto-patches the file.
 *
 * Usage:
 *   node scripts/wire-article-images.mjs                  # print to stdout
 *   node scripts/wire-article-images.mjs --patch          # auto-insert into articles.ts
 *   node scripts/wire-article-images.mjs --slug what-is-vedanta   # single article
 */

import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const MANIFEST_PATH = path.join(__dirname, "image-manifest.json");
const ARTICLES_PATH = path.join(ROOT, "src", "data", "articles.ts");

const args = process.argv.slice(2);
const PATCH = args.includes("--patch");
const SLUG = (() => {
    const i = args.indexOf("--slug");
    return i !== -1 ? args[i + 1] : null;
})();

function buildFeaturedImageLiteral(entry) {
    return [
        `        featuredImage: {`,
        `            src: "${entry.publicPath}",`,
        `            alt: "${entry.altText}",`,
        `            width: 1200,`,
        `            height: 630,`,
        `        },`,
    ].join("\n");
}

async function main() {
    if (!existsSync(MANIFEST_PATH)) {
        console.error("Error: scripts/image-manifest.json not found.");
        process.exit(1);
    }

    const manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
    const optimized = Object.entries(manifest.entries).filter(([slug, entry]) => {
        if (SLUG && slug !== SLUG) return false;
        return entry.status === "optimized";
    });

    if (optimized.length === 0) {
        console.log("No optimized entries found in manifest.");
        return;
    }

    if (!PATCH) {
        // Print mode: show what to paste into articles.ts
        console.log(`\n${"─".repeat(60)}`);
        console.log(`featuredImage entries for ${optimized.length} article(s)`);
        console.log(`${"─".repeat(60)}\n`);

        for (const [slug, entry] of optimized) {
            console.log(`// ${slug}`);
            console.log(buildFeaturedImageLiteral(entry));
            console.log();
        }

        console.log(`\nTo auto-insert into articles.ts, run: node scripts/wire-article-images.mjs --patch`);
        return;
    }

    // Patch mode: insert featuredImage into articles.ts
    let source = await readFile(ARTICLES_PATH, "utf8");
    let patched = 0;
    let skipped = 0;

    for (const [slug, entry] of optimized) {
        // Already patched?
        if (source.includes(`"${entry.publicPath}"`)) {
            skipped++;
            continue;
        }

        // Find the article block by slug — insert featuredImage before the closing brace
        // Strategy: find `slug: "${slug}",` then find the next `},` that closes this object
        const slugMarker = `slug: "${slug}",`;
        const slugIdx = source.indexOf(slugMarker);

        if (slugIdx === -1) {
            console.warn(`  [warn] Could not find article with slug "${slug}" in articles.ts`);
            continue;
        }

        // Find the closing `    },` of this article entry (at 4-space indentation)
        const closePattern = /\n    \},/g;
        closePattern.lastIndex = slugIdx;
        const closeMatch = closePattern.exec(source);

        if (!closeMatch) {
            console.warn(`  [warn] Could not find closing brace for slug "${slug}"`);
            continue;
        }

        const insertAt = closeMatch.index;
        const literal = "\n" + buildFeaturedImageLiteral(entry);

        source = source.slice(0, insertAt) + literal + source.slice(insertAt);
        patched++;
        console.log(`  ✓ patched: ${slug}`);
    }

    if (patched > 0) {
        await writeFile(ARTICLES_PATH, source, "utf8");
        console.log(`\nPatched ${patched} article(s). Skipped (already present): ${skipped}`);
        console.log(`\nNext: npm run build`);
    } else {
        console.log(`Nothing to patch. Already up-to-date: ${skipped}`);
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
