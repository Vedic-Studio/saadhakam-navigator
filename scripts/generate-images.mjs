/**
 * Generate images for Sadhaka content using OpenAI (gpt-image-1 default, DALL-E 3 fallback).
 * Reads prompts from image-manifest.json, calls OpenAI, saves raw PNGs.
 *
 * Usage:
 *   OPENAI_API_KEY=sk-... node scripts/generate-images.mjs --type deity
 *   OPENAI_API_KEY=sk-... node scripts/generate-images.mjs --type deity --slug shiva
 *   OPENAI_API_KEY=sk-... node scripts/generate-images.mjs --all
 *   OPENAI_API_KEY=sk-... node scripts/generate-images.mjs --pilot --type article  # first 3
 *   OPENAI_API_KEY=sk-... node scripts/generate-images.mjs --model dall-e-3 --all
 *   OPENAI_API_KEY=sk-... node scripts/generate-images.mjs --force --type deity    # regenerate
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import OpenAI from "openai";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── CLI flags ───────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const ALL = args.includes("--all");
const PILOT = args.includes("--pilot");
const FORCE = args.includes("--force");
const MODEL = (() => {
    const i = args.indexOf("--model");
    return i !== -1 ? args[i + 1] : "gpt-image-1";
})();
const TYPE = (() => {
    const i = args.indexOf("--type");
    return i !== -1 ? args[i + 1] : null;
})();
const SLUG = (() => {
    const i = args.indexOf("--slug");
    return i !== -1 ? args[i + 1] : null;
})();

if (!ALL && !TYPE) {
    console.error("Usage: OPENAI_API_KEY=sk-... node scripts/generate-images.mjs --type <type> [--slug <slug>]");
    console.error("       OPENAI_API_KEY=sk-... node scripts/generate-images.mjs --all");
    process.exit(1);
}

// ── Config ──────────────────────────────────────────────────────────────────
const MANIFEST_PATH = path.join(__dirname, "image-manifest.json");

// Rate limit delays per model
const DELAY_MS = {
    "dall-e-3": 13_000,     // 5 images/min tier 1
    "gpt-image-1": 6_000,   // more generous limits
};

// Model-specific generation params
const MODEL_CONFIG = {
    "dall-e-3": {
        size: "1792x1024",
        responseFormat: "b64_json",
    },
    "gpt-image-1": {
        size: "1536x1024",
        responseFormat: "b64_json",
    },
};

function delay(ms) {
    return new Promise((r) => setTimeout(r, ms));
}

async function loadManifest() {
    if (!existsSync(MANIFEST_PATH)) {
        console.error("Error: image-manifest.json not found. Run: node scripts/generate-prompts.mjs first.");
        process.exit(1);
    }
    return JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
}

async function saveManifest(manifest) {
    await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf8");
}

async function main() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        console.error("Error: OPENAI_API_KEY environment variable is not set.");
        process.exit(1);
    }

    const manifest = await loadManifest();
    const client = new OpenAI({ apiKey });
    const modelConfig = MODEL_CONFIG[MODEL] ?? MODEL_CONFIG["gpt-image-1"];
    const delayMs = DELAY_MS[MODEL] ?? 6_000;

    // Filter entries
    let entries = Object.entries(manifest.entries).filter(([key, entry]) => {
        // Type filter
        if (TYPE && entry.pageType !== TYPE) return false;
        if (ALL) { /* no type filter */ }
        // Slug filter
        if (SLUG && entry.slug !== SLUG) return false;
        // Status filter
        if (!FORCE) {
            const validStatuses = ["prompt-ready", "prompt-approved"];
            if (!validStatuses.includes(entry.status)) return false;
        }
        return true;
    });

    if (PILOT) entries = entries.slice(0, 3);

    if (entries.length === 0) {
        console.log("No entries to generate. (Check --type, --slug, or run generate-prompts.mjs first.)");
        return;
    }

    console.log(`\nGenerating ${entries.length} image(s) with ${MODEL}${PILOT ? " (pilot)" : ""}...\n`);

    let generated = 0;
    let errors = 0;

    for (let i = 0; i < entries.length; i++) {
        const [key, entry] = entries[i];
        const rawDir = path.dirname(entry.rawPngPath);
        await mkdir(rawDir, { recursive: true });

        console.log(`  [${i + 1}/${entries.length}] ${key}`);

        try {
            let b64, revisedPrompt;

            if (MODEL === "dall-e-3") {
                const response = await client.images.generate({
                    model: "dall-e-3",
                    prompt: entry.prompt,
                    n: 1,
                    size: modelConfig.size,
                    response_format: "b64_json",
                });
                b64 = response.data[0].b64_json;
                revisedPrompt = response.data[0].revised_prompt ?? entry.prompt;
            } else {
                // gpt-image-1
                const response = await client.images.generate({
                    model: "gpt-image-1",
                    prompt: entry.prompt,
                    n: 1,
                    size: modelConfig.size,
                    quality: "high",
                });
                b64 = response.data[0].b64_json;
                revisedPrompt = entry.prompt; // gpt-image-1 doesn't revise prompts
            }

            const pngBuffer = Buffer.from(b64, "base64");
            await writeFile(entry.rawPngPath, pngBuffer);

            manifest.entries[key] = {
                ...entry,
                status: "generated",
                model: MODEL,
                dalleRevisedPrompt: revisedPrompt,
                generatedAt: new Date().toISOString(),
            };
            await saveManifest(manifest);
            generated++;
            console.log(`     ✓ saved → ${entry.rawPngPath}`);

        } catch (err) {
            console.error(`     ✗ Failed: ${err.message}`);
            manifest.entries[key] = {
                ...entry,
                status: "error",
                errorMessage: err.message,
                errorAt: new Date().toISOString(),
            };
            await saveManifest(manifest);
            errors++;
        }

        // Rate limit guard
        if (i < entries.length - 1) {
            const remaining = entries.slice(i + 1).filter(([, e]) =>
                FORCE || ["prompt-ready", "prompt-approved"].includes(e.status)
            );
            if (remaining.length > 0) {
                process.stdout.write(`     ⏱  waiting ${delayMs / 1000}s...\r`);
                await delay(delayMs);
            }
        }
    }

    console.log(`\nDone. Generated: ${generated}, Errors: ${errors}`);
    console.log(`\nNext: node scripts/review-images.mjs --type ${TYPE ?? "all"}`);
    console.log(`  or: node scripts/optimize-images.mjs --type ${TYPE ?? "all"}`);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
