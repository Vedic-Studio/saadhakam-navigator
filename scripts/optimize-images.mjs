/**
 * Optimize raw PNGs → WebP <100KB at 1200x630.
 * Supports all page types via v2 manifest.
 *
 * Usage:
 *   node scripts/optimize-images.mjs                          # all generated
 *   node scripts/optimize-images.mjs --type deity             # deities only
 *   node scripts/optimize-images.mjs --type deity --slug shiva
 *   node scripts/optimize-images.mjs --force                  # re-optimize
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const MANIFEST_PATH = path.join(__dirname, "image-manifest.json");
const PUBLIC_DIR = path.join(ROOT, "public");
const MAX_BYTES = 100_000;

// ── CLI flags ──────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const TYPE = (() => {
    const i = args.indexOf("--type");
    return i !== -1 ? args[i + 1] : null;
})();
const SLUG = (() => {
    const i = args.indexOf("--slug");
    return i !== -1 ? args[i + 1] : null;
})();

async function optimizeOne(key, entry) {
    const rawPngPath = entry.rawPngPath;

    if (!existsSync(rawPngPath)) {
        console.error(`  [skip] ${key}: raw PNG not found at ${rawPngPath}`);
        return null;
    }

    // Route to correct public/assets/<type>/<slug>/ directory
    const publicPath = entry.publicPath; // e.g. /assets/deities/shiva/featured.webp
    const outputPath = path.join(PUBLIC_DIR, publicPath);
    const outputDir = path.dirname(outputPath);

    await mkdir(outputDir, { recursive: true });

    const inputBuffer = await readFile(rawPngPath);

    let quality = 72;
    let finalBuffer = null;

    while (quality >= 45) {
        const buf = await sharp(inputBuffer)
            .resize(1200, 630, { fit: "cover", position: "centre" })
            .webp({ quality, effort: 6 })
            .toBuffer();

        if (buf.length <= MAX_BYTES) {
            finalBuffer = buf;
            break;
        }
        quality -= 5;
    }

    if (!finalBuffer) {
        finalBuffer = await sharp(inputBuffer)
            .resize(1200, 630, { fit: "cover", position: "centre" })
            .webp({ quality: 45, effort: 6 })
            .toBuffer();
        quality = 45;
    }

    await writeFile(outputPath, finalBuffer);

    const finalSizeKb = Math.round(finalBuffer.length / 1024);
    return { outputPath, finalSizeKb, qualityUsed: quality };
}

async function main() {
    if (!existsSync(MANIFEST_PATH)) {
        console.error("Error: scripts/image-manifest.json not found. Run image generation first.");
        process.exit(1);
    }

    const manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
    const entries = Object.entries(manifest.entries);

    let targets = entries.filter(([key, entry]) => {
        if (TYPE && entry.pageType !== TYPE) return false;
        if (SLUG && entry.slug !== SLUG) return false;
        if (FORCE) return ["generated", "reviewed", "optimized"].includes(entry.status);
        return entry.status === "generated" || entry.status === "reviewed";
    });

    if (targets.length === 0) {
        console.log("No images to optimize. (Use --force to redo, or run generate-images.mjs first.)");
        return;
    }

    console.log(`\nOptimizing ${targets.length} image(s)...\n`);

    let done = 0;
    let errors = 0;

    for (const [key, entry] of targets) {
        process.stdout.write(`  [${done + errors + 1}/${targets.length}] ${key} ... `);

        try {
            const result = await optimizeOne(key, entry);

            if (!result) {
                errors++;
                continue;
            }

            const { finalSizeKb, qualityUsed } = result;
            const sizeMsg = finalSizeKb > 100 ? ` ⚠ ${finalSizeKb}KB (over limit)` : ` ${finalSizeKb}KB`;
            console.log(`✓ q=${qualityUsed},${sizeMsg}`);

            manifest.entries[key] = {
                ...entry,
                status: "optimized",
                optimizedAt: new Date().toISOString(),
                outputPath: result.outputPath,
                finalSizeKb,
                qualityUsed,
            };

            await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf8");
            done++;

        } catch (err) {
            console.error(`✗ ${err.message}`);
            errors++;
        }
    }

    console.log(`\nDone. Optimized: ${done}, Errors: ${errors}`);
    console.log(`\nNext: node scripts/review-images.mjs or node scripts/wire-images.mjs`);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
