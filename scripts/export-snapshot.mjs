/**
 * Export content metadata for all page types to a JSON snapshot.
 * Used by generate-prompts.mjs to build context-aware image prompts.
 *
 * Usage:
 *   npx tsx scripts/export-snapshot.mjs              # all types
 *   npx tsx scripts/export-snapshot.mjs --type deity  # deities only
 */
import { writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const args = process.argv.slice(2);
const TYPE_FILTER = (() => {
    const i = args.indexOf("--type");
    return i !== -1 ? args[i + 1] : null;
})();

const VALID_TYPES = ["article", "deity", "concept", "comparison", "practice", "tradition", "stotra"];

if (TYPE_FILTER && !VALID_TYPES.includes(TYPE_FILTER)) {
    console.error(`Invalid type: ${TYPE_FILTER}. Valid: ${VALID_TYPES.join(", ")}`);
    process.exit(1);
}

async function loadArticles() {
    const { articles } = await import("../src/data/articles.js");
    return articles.map((a) => ({
        pageType: "article",
        slug: a.slug,
        title: a.title,
        primaryKeyword: a.primaryKeyword,
        pillar: a.pillar,
        metaDescription: a.metaDescription,
        aeoAnswer: a.aeoAnswer ?? null,
    }));
}

async function loadDeities() {
    const { deities } = await import("../src/data/deities.js");
    return deities.map((d) => ({
        pageType: "deity",
        slug: d.slug,
        title: d.name,
        name: d.name,
        tradition: d.tradition,
        category: d.category,
        description: d.description,
        iconography: d.iconography,
        primaryKeyword: d.primaryKeyword,
    }));
}

async function loadConcepts() {
    const { concepts } = await import("../src/data/concepts.js");
    return concepts.map((c) => ({
        pageType: "concept",
        slug: c.slug,
        title: c.englishTranslation,
        sanskritWord: c.sanskritWord,
        englishTranslation: c.englishTranslation,
        shortDefinition: c.shortDefinition,
        keyPrinciples: c.keyPrinciples,
        tags: c.tags,
    }));
}

async function loadComparisons() {
    const { comparisons } = await import("../src/data/comparisons.js");
    return comparisons.map((c) => ({
        pageType: "comparison",
        slug: c.slug,
        title: c.title,
        category: c.category,
        entityA: c.entityA,
        entityB: c.entityB,
        metaDescription: c.metaDescription,
        tldr: c.tldr ?? null,
    }));
}

async function loadPractices() {
    const { practices } = await import("../src/data/practices.js");
    return practices.map((p) => ({
        pageType: "practice",
        slug: p.slug,
        title: p.title,
        sanskritName: p.sanskritName,
        summary: p.summary,
        whatItIs: p.whatItIs,
        tags: p.tags,
    }));
}

async function loadTraditions() {
    const { traditions } = await import("../src/data/traditions.js");
    return traditions.map((t) => ({
        pageType: "tradition",
        slug: t.slug,
        title: t.title,
        summary: t.summary,
        coreOrientation: t.coreOrientation,
        tone: t.tone,
        primaryPractices: t.primaryPractices,
        tags: t.tags,
    }));
}

async function loadStotras() {
    const stotrasDir = path.join(ROOT, "content", "stotras");
    const { readdirSync } = await import("node:fs");
    const files = readdirSync(stotrasDir).filter((f) => f.endsWith(".json"));
    const results = [];

    for (const file of files) {
        const raw = await readFile(path.join(stotrasDir, file), "utf8");
        const data = JSON.parse(raw);
        results.push({
            pageType: "stotra",
            slug: data.slug,
            title: data.title,
            type: data.type,
            deity: data.deity,
            tradition: data.tradition,
            author: data.author,
            verseCount: data.verseCount ?? data.nameCount ?? 0,
        });
    }
    return results;
}

const loaders = {
    article: loadArticles,
    deity: loadDeities,
    concept: loadConcepts,
    comparison: loadComparisons,
    practice: loadPractices,
    tradition: loadTraditions,
    stotra: loadStotras,
};

async function main() {
    const typesToLoad = TYPE_FILTER ? [TYPE_FILTER] : VALID_TYPES;
    const snapshot = {};

    for (const type of typesToLoad) {
        try {
            const items = await loaders[type]();
            snapshot[type] = items;
            console.log(`  ✓ ${type}: ${items.length} items`);
        } catch (err) {
            console.error(`  ✗ ${type}: ${err.message}`);
            snapshot[type] = [];
        }
    }

    const outPath = path.join(__dirname, "content-snapshot.json");
    await writeFile(outPath, JSON.stringify(snapshot, null, 2), "utf8");

    const total = Object.values(snapshot).flat().length;
    console.log(`\n✓ Wrote ${total} items to scripts/content-snapshot.json`);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
