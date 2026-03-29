/**
 * Wire optimized images into data files for all page types.
 * Patches featuredImage into the correct data file based on page type.
 *
 * Usage:
 *   node scripts/wire-images.mjs                              # print all
 *   node scripts/wire-images.mjs --type deity                 # print deities
 *   node scripts/wire-images.mjs --type deity --slug shiva    # single
 *   node scripts/wire-images.mjs --patch                      # auto-insert
 *   node scripts/wire-images.mjs --patch --type deity         # auto-insert deities
 */
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const MANIFEST_PATH = path.join(__dirname, "image-manifest.json");

const args = process.argv.slice(2);
const PATCH = args.includes("--patch");
const TYPE = (() => {
    const i = args.indexOf("--type");
    return i !== -1 ? args[i + 1] : null;
})();
const SLUG = (() => {
    const i = args.indexOf("--slug");
    return i !== -1 ? args[i + 1] : null;
})();

// ── Data file paths per page type ───────────────────────────────────────────
const DATA_FILES = {
    article: path.join(ROOT, "src", "data", "articles.ts"),
    deity: path.join(ROOT, "src", "data", "deities.ts"),
    concept: path.join(ROOT, "src", "data", "concepts.ts"),
    comparison: path.join(ROOT, "src", "data", "comparisons.ts"),
    practice: path.join(ROOT, "src", "data", "practices.ts"),
    tradition: path.join(ROOT, "src", "data", "traditions.ts"),
};

// How to find an item in each file (the slug field pattern)
const SLUG_PATTERNS = {
    article: (slug) => `slug: "${slug}",`,
    deity: (slug) => `slug: "${slug}",`,
    concept: (slug) => `slug: "${slug}",`,
    comparison: (slug) => `slug: "${slug}",`,
    practice: (slug) => `slug: "${slug}",`,
    tradition: (slug) => `slug: "${slug}",`,
};

function buildFeaturedImageLiteral(entry, indent = 8) {
    const pad = " ".repeat(indent);
    return [
        `${pad}featuredImage: {`,
        `${pad}    src: "${entry.publicPath}",`,
        `${pad}    alt: "${entry.altText.replace(/"/g, '\\"')}",`,
        `${pad}    width: 1200,`,
        `${pad}    height: 630,`,
        `${pad}},`,
    ].join("\n");
}

function detectIndent(source, slugIdx) {
    // Walk backward from slugIdx to find the indentation of the slug line
    const lineStart = source.lastIndexOf("\n", slugIdx) + 1;
    const line = source.slice(lineStart, slugIdx);
    const match = line.match(/^(\s*)/);
    return match ? match[1].length : 8;
}

async function main() {
    if (!existsSync(MANIFEST_PATH)) {
        console.error("Error: image-manifest.json not found.");
        process.exit(1);
    }

    const manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));

    // Filter to optimized or reviewed entries
    const targets = Object.entries(manifest.entries).filter(([key, entry]) => {
        if (TYPE && entry.pageType !== TYPE) return false;
        if (SLUG && entry.slug !== SLUG) return false;
        return ["optimized", "reviewed"].includes(entry.status);
    });

    if (targets.length === 0) {
        console.log("No optimized/reviewed entries to wire. Run optimize-images.mjs first.");
        return;
    }

    if (!PATCH) {
        // Print mode
        console.log(`\n${"─".repeat(60)}`);
        console.log(`featuredImage entries for ${targets.length} item(s)`);
        console.log(`${"─".repeat(60)}\n`);

        for (const [key, entry] of targets) {
            console.log(`// ${key} (${entry.pageType})`);
            console.log(buildFeaturedImageLiteral(entry));
            console.log();
        }

        console.log(`\nTo auto-insert, run: node scripts/wire-images.mjs --patch${TYPE ? ` --type ${TYPE}` : ""}`);
        return;
    }

    // Patch mode — group by page type, patch each file once
    const byType = {};
    for (const [key, entry] of targets) {
        const type = entry.pageType;
        if (!byType[type]) byType[type] = [];
        byType[type].push([key, entry]);
    }

    let totalPatched = 0;
    let totalSkipped = 0;

    for (const [pageType, entries] of Object.entries(byType)) {
        const dataFile = DATA_FILES[pageType];
        if (!dataFile || !existsSync(dataFile)) {
            console.warn(`  [warn] No data file for type "${pageType}" or file not found`);
            continue;
        }

        let source = await readFile(dataFile, "utf8");
        let patched = 0;
        let skipped = 0;

        for (const [key, entry] of entries) {
            // Already wired?
            if (source.includes(`"${entry.publicPath}"`)) {
                skipped++;
                continue;
            }

            const slugPattern = SLUG_PATTERNS[pageType];
            if (!slugPattern) continue;

            const slugMarker = slugPattern(entry.slug);
            const slugIdx = source.indexOf(slugMarker);

            if (slugIdx === -1) {
                console.warn(`  [warn] Could not find "${entry.slug}" in ${path.basename(dataFile)}`);
                continue;
            }

            const indent = detectIndent(source, slugIdx);

            // Find the closing `},` of this object (at indent - 4 level)
            const closeIndent = Math.max(indent - 4, 0);
            const closeRegex = new RegExp(`\\n${" ".repeat(closeIndent)}\\},`, "g");
            closeRegex.lastIndex = slugIdx;
            const closeMatch = closeRegex.exec(source);

            if (!closeMatch) {
                console.warn(`  [warn] Could not find closing brace for "${entry.slug}" in ${path.basename(dataFile)}`);
                continue;
            }

            const insertAt = closeMatch.index;
            const literal = "\n" + buildFeaturedImageLiteral(entry, indent);

            source = source.slice(0, insertAt) + literal + source.slice(insertAt);

            // Update manifest status
            manifest.entries[key] = { ...entry, status: "wired", wiredAt: new Date().toISOString() };
            patched++;
            console.log(`  ✓ wired: ${key} → ${path.basename(dataFile)}`);
        }

        if (patched > 0) {
            await writeFile(dataFile, source, "utf8");
        }

        totalPatched += patched;
        totalSkipped += skipped;
        if (skipped > 0) console.log(`  (${skipped} already wired in ${path.basename(dataFile)})`);
    }

    if (totalPatched > 0) {
        await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf8");
    }

    console.log(`\nWired: ${totalPatched}, Already present: ${totalSkipped}`);
    if (totalPatched > 0) console.log(`\nNext: npm run build`);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
