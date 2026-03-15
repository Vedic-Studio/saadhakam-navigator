/**
 * Generate featured images for Sadhaka articles using DALL-E 3.
 *
 * Usage:
 *   OPENAI_API_KEY=sk-... node scripts/generate-article-images.mjs
 *   OPENAI_API_KEY=sk-... node scripts/generate-article-images.mjs --pilot        # first 3 only
 *   OPENAI_API_KEY=sk-... node scripts/generate-article-images.mjs --slug what-is-vedanta
 *   OPENAI_API_KEY=sk-... node scripts/generate-article-images.mjs --force        # regenerate all
 *
 * Prerequisites:
 *   npm run images:snapshot   (generates scripts/articles-snapshot.json)
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import OpenAI from "openai";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

// ── CLI flags ──────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const PILOT = args.includes("--pilot");
const FORCE = args.includes("--force");
const SLUG = (() => {
    const i = args.indexOf("--slug");
    return i !== -1 ? args[i + 1] : null;
})();

// ── Paths ──────────────────────────────────────────────────────────────────
const SNAPSHOT_PATH = path.join(__dirname, "articles-snapshot.json");
const MANIFEST_PATH = path.join(__dirname, "image-manifest.json");
const RAW_DIR = "/tmp/sadhaka-raw";

// ── Rate limit guard (DALL-E 3: 5 images/min on tier 1) ───────────────────
const DELAY_MS = 13_000;

// ── Pillar → style mapping ─────────────────────────────────────────────────
const PILLAR_MAP = {
    "ancient-wisdom": {
        focalElement: "an open palm resting over a lotus mandala with radiating geometric petals",
        mood: "reverential",
    },
    "practical-practices": {
        focalElement: "a meditative figure in seated stillness surrounded by concentric sacred geometry circles",
        mood: "serene",
    },
    "sacred-texts": {
        focalElement: "an unfurled palm-leaf manuscript resting on woven cloth with geometric border patterns",
        mood: "scholarly",
    },
    "spiritual-traditions": {
        focalElement: "a sacred flame rising before a stylised stone deity silhouette framed by geometric arches",
        mood: "devotional",
    },
};

function buildPrompt(article) {
    const { focalElement, mood } = PILLAR_MAP[article.pillar] ?? PILLAR_MAP["ancient-wisdom"];

    return [
        `Flat digital illustration for a spiritual philosophy article titled "${article.title}".`,
        "",
        `Subject: ${focalElement}.`,
        `Composition: centered, generous negative space, no text, no letterforms, no glyphs anywhere.`,
        `Palette: warm ochre (#C87941), deep saffron (#E07B39), crimson burgundy (#8B1A2D), antique parchment (#F5E6C8); background a muted terracotta wash.`,
        `Mood: ${mood}, timeless, contemplative.`,
        `Style: sacred geometry underpinnings, geometric borders in thin gold lines, Pahari miniature painting simplified to flat vector shapes.`,
        `Lighting: flat fills with subtle tonal gradation only — no photorealistic lighting.`,
        `CRITICAL: absolutely no text, no numbers, no words, no Sanskrit letters, no Latin letters anywhere in the image.`,
        `Format: 1792x1024 pixels, landscape orientation.`,
    ].join("\n");
}

function buildAltText(article) {
    return `${article.primaryKeyword} — sacred geometry illustration in ochre and saffron tones`.slice(0, 125);
}

async function loadManifest() {
    if (!existsSync(MANIFEST_PATH)) return { version: 1, entries: {} };
    return JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
}

async function saveManifest(manifest) {
    await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf8");
}

function delay(ms) {
    return new Promise((r) => setTimeout(r, ms));
}

async function main() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        console.error("Error: OPENAI_API_KEY environment variable is not set.");
        process.exit(1);
    }

    if (!existsSync(SNAPSHOT_PATH)) {
        console.error("Error: scripts/articles-snapshot.json not found. Run: npm run images:snapshot");
        process.exit(1);
    }

    const articles = JSON.parse(await readFile(SNAPSHOT_PATH, "utf8"));
    const manifest = await loadManifest();
    const client = new OpenAI({ apiKey });

    await mkdir(RAW_DIR, { recursive: true });

    // Filter to target articles
    let targets = SLUG ? articles.filter((a) => a.slug === SLUG) : articles;
    if (!SLUG && PILOT) targets = targets.slice(0, 3);

    if (targets.length === 0) {
        console.error(`No articles matched. Available slugs: ${articles.map((a) => a.slug).join(", ")}`);
        process.exit(1);
    }

    console.log(`\nGenerating images for ${targets.length} article(s)${PILOT ? " (pilot mode)" : ""}...\n`);

    let generated = 0;
    let skipped = 0;

    for (let i = 0; i < targets.length; i++) {
        const article = targets[i];
        const existing = manifest.entries[article.slug];

        if (!FORCE && existing && (existing.status === "generated" || existing.status === "optimized")) {
            console.log(`  [skip] ${article.slug} (already ${existing.status})`);
            skipped++;
            continue;
        }

        const prompt = buildPrompt(article);
        const altText = buildAltText(article);
        const rawPngPath = path.join(RAW_DIR, `${article.slug}.png`);
        const publicPath = `/assets/articles/${article.slug}/featured.webp`;

        console.log(`  [${i + 1}/${targets.length}] ${article.slug}`);

        try {
            const response = await client.images.generate({
                model: "dall-e-3",
                prompt,
                n: 1,
                size: "1792x1024",
                response_format: "b64_json",
            });

            const b64 = response.data[0].b64_json;
            const revisedPrompt = response.data[0].revised_prompt ?? prompt;
            const pngBuffer = Buffer.from(b64, "base64");

            await writeFile(rawPngPath, pngBuffer);

            manifest.entries[article.slug] = {
                slug: article.slug,
                title: article.title,
                pillar: article.pillar,
                status: "generated",
                prompt,
                dalleRevisedPrompt: revisedPrompt,
                generatedAt: new Date().toISOString(),
                rawPngPath,
                publicPath,
                altText,
            };

            await saveManifest(manifest);
            generated++;
            console.log(`     ✓ saved raw PNG → ${rawPngPath}`);

        } catch (err) {
            console.error(`     ✗ Failed: ${err.message}`);
            manifest.entries[article.slug] = {
                ...(manifest.entries[article.slug] ?? {}),
                slug: article.slug,
                status: "error",
                errorMessage: err.message,
                errorAt: new Date().toISOString(),
            };
            await saveManifest(manifest);
        }

        // Rate limit guard — wait between calls (skip after last item)
        if (i < targets.length - 1) {
            const remaining = targets.length - i - 1;
            const notSkipped = targets.slice(i + 1).filter(
                (a) => FORCE || !manifest.entries[a.slug] || !["generated", "optimized"].includes(manifest.entries[a.slug]?.status)
            );
            if (notSkipped.length > 0) {
                process.stdout.write(`     ⏱  waiting ${DELAY_MS / 1000}s before next call...\r`);
                await delay(DELAY_MS);
            }
        }
    }

    console.log(`\nDone. Generated: ${generated}, Skipped: ${skipped}`);
    console.log(`Manifest: ${MANIFEST_PATH}`);
    console.log(`\nNext step: node scripts/optimize-images.mjs`);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
