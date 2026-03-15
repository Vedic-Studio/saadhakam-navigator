/**
 * Optimize raw DALL-E 3 PNGs → WebP <100KB at 1200x630.
 *
 * Usage:
 *   node scripts/optimize-images.mjs
 *   node scripts/optimize-images.mjs --slug what-is-vedanta
 *   node scripts/optimize-images.mjs --force      # re-optimize already-done entries
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
const SLUG = (() => {
    const i = args.indexOf("--slug");
    return i !== -1 ? args[i + 1] : null;
})();

async function optimizeOne(slug, entry) {
    const rawPngPath = entry.rawPngPath;

    if (!existsSync(rawPngPath)) {
        console.error(`  [skip] ${slug}: raw PNG not found at ${rawPngPath}`);
        return null;
    }

    const outputDir = path.join(PUBLIC_DIR, "assets", "articles", slug);
    const outputPath = path.join(outputDir, "featured.webp");

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
        // Last resort: quality 45
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

    let targets = entries.filter(([slug, entry]) => {
        if (SLUG && slug !== SLUG) return false;
        if (FORCE) return entry.status === "generated" || entry.status === "optimized" || entry.status === "error";
        return entry.status === "generated";
    });

    if (targets.length === 0) {
        console.log("No articles to optimize. (All may already be optimized — use --force to redo.)");
        return;
    }

    console.log(`\nOptimizing ${targets.length} image(s)...\n`);

    let done = 0;
    let errors = 0;

    for (const [slug, entry] of targets) {
        process.stdout.write(`  [${done + errors + 1}/${targets.length}] ${slug} ... `);

        try {
            const result = await optimizeOne(slug, entry);

            if (!result) {
                errors++;
                continue;
            }

            const { finalSizeKb, qualityUsed } = result;
            const sizeMsg = finalSizeKb > 100 ? ` ⚠ ${finalSizeKb}KB (over limit)` : ` ${finalSizeKb}KB`;
            console.log(`✓ q=${qualityUsed},${sizeMsg}`);

            manifest.entries[slug] = {
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
    console.log(`\nNext step: node scripts/wire-article-images.mjs`);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
