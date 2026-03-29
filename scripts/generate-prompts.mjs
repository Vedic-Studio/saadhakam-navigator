/**
 * Context-aware prompt builder for Sadhaka image generation.
 * Reads content-snapshot.json + image-config.json, builds structured prompts
 * per content item, writes to image-manifest.json.
 *
 * Usage:
 *   node scripts/generate-prompts.mjs --type deity                      # all deities
 *   node scripts/generate-prompts.mjs --type deity --slug shiva         # single
 *   node scripts/generate-prompts.mjs --type deity --slug shiva --dry-run  # print only
 *   node scripts/generate-prompts.mjs --all                              # everything
 */
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── CLI flags ───────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const ALL = args.includes("--all");
const DRY_RUN = args.includes("--dry-run");
const FORCE = args.includes("--force");
const TYPE = (() => {
    const i = args.indexOf("--type");
    return i !== -1 ? args[i + 1] : null;
})();
const SLUG = (() => {
    const i = args.indexOf("--slug");
    return i !== -1 ? args[i + 1] : null;
})();

if (!ALL && !TYPE) {
    console.error("Usage: node scripts/generate-prompts.mjs --type <type> [--slug <slug>] [--dry-run] [--force]");
    console.error("       node scripts/generate-prompts.mjs --all [--dry-run] [--force]");
    process.exit(1);
}

// ── Paths ───────────────────────────────────────────────────────────────────
const CONFIG_PATH = path.join(__dirname, "image-config.json");
const SNAPSHOT_PATH = path.join(__dirname, "content-snapshot.json");
const MANIFEST_PATH = path.join(__dirname, "image-manifest.json");

// ── Load config and snapshot ────────────────────────────────────────────────
const config = JSON.parse(await readFile(CONFIG_PATH, "utf8"));
const snapshot = JSON.parse(await readFile(SNAPSHOT_PATH, "utf8"));

async function loadManifest() {
    if (!existsSync(MANIFEST_PATH)) return { version: 2, entries: {} };
    const data = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
    // Migrate v1 → v2
    if (!data.version || data.version < 2) {
        const migrated = { version: 2, entries: {} };
        for (const [key, val] of Object.entries(data.entries ?? {})) {
            const newKey = key.includes(":") ? key : `article:${key}`;
            migrated.entries[newKey] = { ...val, pageType: val.pageType ?? "article" };
        }
        return migrated;
    }
    return data;
}

async function saveManifest(manifest) {
    await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf8");
}

// ── Brand base prompt fragment ──────────────────────────────────────────────
function buildBrandBase() {
    const b = config.brand;
    const palette = Object.entries(b.palette)
        .map(([name, val]) => `${name}: ${val}`)
        .join(", ");
    return [
        `Style: ${b.style}.`,
        `Palette: ${palette}.`,
        `Composition: ${b.composition}.`,
        ...b.constraints.map((c) => `CRITICAL: ${c}.`),
        `Format: ${b.format.generateWidth}x${b.format.generateHeight} pixels, landscape orientation.`,
    ].join("\n");
}

// ── Page-type prompt builders ───────────────────────────────────────────────

function buildArticlePrompt(item) {
    const typeConfig = config.pageTypes.article;
    const mood = typeConfig.moodMap[item.pillar] ?? "contemplative";

    // Extract visual metaphor from aeoAnswer or title (not generic pillar)
    const context = item.aeoAnswer
        ? `The article explains: "${item.aeoAnswer.slice(0, 200)}"`
        : `The article is about: ${item.title}`;

    const focalElement = item.aeoAnswer
        ? `a visual metaphor representing the core concept described — ${item.primaryKeyword}`
        : `a visual metaphor for ${item.primaryKeyword}`;

    return {
        prompt: [
            `Flat digital illustration for a spiritual philosophy article titled "${item.title}".`,
            "",
            `Subject: ${focalElement}.`,
            context,
            `Mood: ${mood}, timeless, contemplative.`,
            "",
            buildBrandBase(),
        ].join("\n"),
        altText: `${item.primaryKeyword} — sacred geometry illustration`.slice(0, 125),
        contextFields: { title: item.title, pillar: item.pillar, primaryKeyword: item.primaryKeyword },
    };
}

function buildDeityPrompt(item) {
    const typeConfig = config.pageTypes.deity;
    const attrs = item.iconography?.attributes?.join(", ") ?? "";
    const vehicle = item.iconography?.vehicle ?? "";
    const colors = item.iconography?.colors ?? "";
    const forms = item.iconography?.forms?.slice(0, 2).join(" or ") ?? "";

    const focalElement = [
        `a deity silhouette representing ${item.name}`,
        attrs ? `with distinguishing attributes: ${attrs}` : "",
        vehicle ? `accompanied by ${vehicle}` : "",
        forms ? `in the aspect of ${forms}` : "",
    ]
        .filter(Boolean)
        .join(", ");

    return {
        prompt: [
            `Flat digital illustration depicting ${item.name} for a spiritual education website.`,
            "",
            `Subject: ${focalElement}.`,
            `Composition: ${typeConfig.compositionOverride}.`,
            colors ? `Color accent: ${colors}.` : "",
            `Mood: ${typeConfig.defaultMood}.`,
            `Tradition: ${item.tradition?.join(", ") ?? "Hindu"}.`,
            "",
            buildBrandBase(),
        ]
            .filter(Boolean)
            .join("\n"),
        altText: `${item.name} — ${attrs.slice(0, 80)} in sacred geometry style`.slice(0, 125),
        contextFields: { name: item.name, iconography: item.iconography, tradition: item.tradition },
    };
}

function buildConceptPrompt(item) {
    const typeConfig = config.pageTypes.concept;

    // Use curated visual metaphor if available
    const metaphor = config.conceptVisualMetaphors[item.slug];
    const focalElement = metaphor
        ? metaphor.focalElement
        : `an abstract visual metaphor for ${item.englishTranslation} (${item.sanskritWord})`;
    const mood = metaphor?.mood ?? typeConfig.defaultMood;

    return {
        prompt: [
            `Flat digital illustration for the Hindu philosophical concept "${item.englishTranslation}" (${item.sanskritWord}).`,
            "",
            `Subject: ${focalElement}.`,
            `Definition context: ${item.shortDefinition}`,
            `Mood: ${mood}.`,
            "",
            buildBrandBase(),
        ].join("\n"),
        altText: `${item.englishTranslation} (${item.slug}) — ${metaphor ? "visual metaphor" : "concept illustration"}`.slice(0, 125),
        contextFields: { slug: item.slug, sanskritWord: item.sanskritWord, englishTranslation: item.englishTranslation },
    };
}

function buildComparisonPrompt(item) {
    const typeConfig = config.pageTypes.comparison;

    return {
        prompt: [
            `Flat digital illustration comparing "${item.entityA}" and "${item.entityB}" for a spiritual philosophy website.`,
            "",
            `Subject: two contrasting symbolic elements — one representing ${item.entityA}, one representing ${item.entityB} — facing each other across a central axis.`,
            `Composition: ${typeConfig.compositionOverride}.`,
            item.tldr ? `Context: ${item.tldr.slice(0, 200)}` : "",
            `Mood: ${typeConfig.defaultMood}.`,
            "",
            buildBrandBase(),
        ]
            .filter(Boolean)
            .join("\n"),
        altText: `${item.entityA} vs ${item.entityB} — philosophical comparison illustration`.slice(0, 125),
        contextFields: { entityA: item.entityA, entityB: item.entityB, category: item.category },
    };
}

function buildStotraPrompt(item) {
    const typeConfig = config.pageTypes.stotra;
    const isStotram = item.type === "stotra";
    const label = isStotram ? "stotra (hymn)" : "sahasranama (thousand names)";

    return {
        prompt: [
            `Flat digital illustration for the ${label} "${item.title}" dedicated to ${item.deity}.`,
            "",
            `Subject: a devotional scene — ${item.deity} receiving praise, sacred flame or offering motif, flowing geometric patterns suggesting chant rhythm.`,
            `Composition: ${typeConfig.compositionOverride}.`,
            `Tradition: ${item.tradition}.`,
            `Mood: ${typeConfig.defaultMood}.`,
            "",
            buildBrandBase(),
        ].join("\n"),
        altText: `${item.title} — devotional illustration for ${item.deity}`.slice(0, 125),
        contextFields: { title: item.title, deity: item.deity, tradition: item.tradition, type: item.type },
    };
}

function buildPracticePrompt(item) {
    const typeConfig = config.pageTypes.practice;

    return {
        prompt: [
            `Flat digital illustration for the spiritual practice "${item.title}" (${item.sanskritName}).`,
            "",
            `Subject: a figure performing ${item.title.toLowerCase()} — ${item.whatItIs.slice(0, 150)}.`,
            `Composition: ${typeConfig.compositionOverride}.`,
            `Mood: ${typeConfig.defaultMood}.`,
            "",
            buildBrandBase(),
        ].join("\n"),
        altText: `${item.title} (${item.sanskritName}) — practice illustration`.slice(0, 125),
        contextFields: { title: item.title, sanskritName: item.sanskritName },
    };
}

function buildTraditionPrompt(item) {
    const typeConfig = config.pageTypes.tradition;
    const mood = typeConfig.moodMap?.[item.tone] ?? "contemplative, reverential";

    return {
        prompt: [
            `Flat digital illustration for the Hindu spiritual tradition "${item.title}".`,
            "",
            `Subject: a scene embodying the ${item.tone} atmosphere of ${item.title} — ${item.coreOrientation.slice(0, 150)}.`,
            `Key practices: ${item.primaryPractices?.slice(0, 3).join(", ") ?? "meditation and worship"}.`,
            `Mood: ${mood}.`,
            "",
            buildBrandBase(),
        ].join("\n"),
        altText: `${item.title} — ${item.tone} tradition illustration`.slice(0, 125),
        contextFields: { title: item.title, tone: item.tone, coreOrientation: item.coreOrientation },
    };
}

const promptBuilders = {
    article: buildArticlePrompt,
    deity: buildDeityPrompt,
    concept: buildConceptPrompt,
    comparison: buildComparisonPrompt,
    stotra: buildStotraPrompt,
    practice: buildPracticePrompt,
    tradition: buildTraditionPrompt,
};

// ── Asset path mapping ──────────────────────────────────────────────────────
const assetPaths = {
    article: (slug) => `/assets/articles/${slug}/featured.webp`,
    deity: (slug) => `/assets/deities/${slug}/featured.webp`,
    concept: (slug) => `/assets/concepts/${slug}/featured.webp`,
    comparison: (slug) => `/assets/comparisons/${slug}/featured.webp`,
    stotra: (slug) => `/assets/stotras/${slug}/featured.webp`,
    practice: (slug) => `/assets/practices/${slug}/featured.webp`,
    tradition: (slug) => `/assets/traditions/${slug}/featured.webp`,
};

// ── Main ────────────────────────────────────────────────────────────────────
async function main() {
    const manifest = await loadManifest();
    const typesToProcess = ALL ? Object.keys(promptBuilders) : [TYPE];
    let total = 0;
    let skipped = 0;

    for (const pageType of typesToProcess) {
        const items = snapshot[pageType] ?? [];
        const builder = promptBuilders[pageType];
        if (!builder) {
            console.error(`No prompt builder for type: ${pageType}`);
            continue;
        }

        let targets = SLUG ? items.filter((i) => i.slug === SLUG) : items;

        console.log(`\n── ${pageType} (${targets.length} items) ──`);

        for (const item of targets) {
            const key = `${pageType}:${item.slug}`;
            const existing = manifest.entries[key];

            // Skip if already has a prompt and not forcing
            if (!FORCE && existing && existing.status && existing.status !== "error") {
                console.log(`  [skip] ${key} (status: ${existing.status})`);
                skipped++;
                continue;
            }

            // Check for refined pattern override
            const refinedKey = `${pageType}:${item.slug}`;
            const refinedPattern = config.refinedPatterns?.[refinedKey];

            let result;
            if (refinedPattern?.effectivePromptFragment) {
                // Use refined pattern as focal element override
                result = builder(item);
                result.prompt = result.prompt.replace(
                    /Subject: .+?\./s,
                    `Subject: ${refinedPattern.effectivePromptFragment}.`
                );
                result.contextFields._refinedPattern = true;
            } else {
                result = builder(item);
            }

            if (DRY_RUN) {
                console.log(`\n  ── ${key} ──`);
                console.log(`  Prompt:\n${result.prompt.split("\n").map((l) => `    ${l}`).join("\n")}`);
                console.log(`  Alt: ${result.altText}`);
                console.log(`  Public path: ${assetPaths[pageType](item.slug)}`);
                total++;
                continue;
            }

            manifest.entries[key] = {
                pageType,
                slug: item.slug,
                title: item.title ?? item.name ?? item.slug,
                status: "prompt-ready",
                prompt: result.prompt,
                altText: result.altText,
                contextFields: result.contextFields,
                publicPath: assetPaths[pageType](item.slug),
                rawPngPath: `/tmp/sadhaka-raw/${pageType}/${item.slug}.png`,
                promptCreatedAt: new Date().toISOString(),
            };
            total++;
            console.log(`  [prompt] ${key}`);
        }
    }

    if (!DRY_RUN) {
        await saveManifest(manifest);
    }

    console.log(`\n${DRY_RUN ? "Dry run" : "Done"}. Prompts: ${total}, Skipped: ${skipped}`);
    if (!DRY_RUN) {
        console.log(`Manifest: ${MANIFEST_PATH}`);
        console.log(`\nNext: review prompts, then run node scripts/generate-images.mjs`);
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
