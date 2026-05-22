/**
 * Generate public/llms.txt + public/llms-full.txt
 *
 *   llms.txt      — curated, hierarchical index of the site for LLM crawlers.
 *                   Follows the emerging https://llmstxt.org convention.
 *   llms-full.txt — single-file dump of high-value structured content
 *                   (article metadata + AEO + FAQs, concept definitions,
 *                   deity AEO blocks, mantra meanings, comparison TL;DRs)
 *                   for RAG / large-context ingestion.
 *
 * Usage:
 *   npx tsx scripts/generate-llms-txt.mjs
 */
import { writeFile, readFile, readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
// Snapshot directory — not `public/`, because the live /llms.txt and
// /llms-full.txt URLs are served by the dynamic route handlers at
// `src/app/(system)/llms.txt/route.ts` and `(system)/llms-full.txt/route.ts`.
// Writing to `public/` would shadow those routes and cause a Next.js
// conflict error in dev mode. This script remains useful as a snapshot /
// debugging tool — the output gets written to `tmp/llms-snapshot/` so you
// can diff it against what the live route handler is rendering.
const OUTPUT_DIR = path.join(ROOT, "tmp", "llms-snapshot");
const SITE_URL = "https://www.opensadhaka.com";

// ----------------------------------------------------------------------------
// Data loaders (use .js extension — tsx resolves to the .ts source)
// ----------------------------------------------------------------------------

async function loadArticles() {
    const { articles } = await import("../src/data/articles.js");
    return articles;
}

async function loadConcepts() {
    const { concepts } = await import("../src/data/concepts.js");
    return concepts;
}

async function loadDeities() {
    const { deities } = await import("../src/data/deities.js");
    return deities;
}

async function loadMantras() {
    const { mantras } = await import("../src/data/mantras.js");
    return mantras;
}

async function loadComparisons() {
    const { comparisons } = await import("../src/data/comparisons.js");
    return comparisons;
}

async function loadPractices() {
    const mod = await import("../src/data/practices.js");
    return mod.practices ?? [];
}

async function loadTraditions() {
    const mod = await import("../src/data/traditions.js");
    return mod.traditions ?? [];
}

async function loadTexts() {
    const mod = await import("../src/data/texts.js");
    return mod.texts ?? [];
}

async function loadGreats() {
    const mod = await import("../src/data/greats.js");
    return mod.greats ?? [];
}

async function loadPhilosophies() {
    const mod = await import("../src/data/philosophies.js");
    return mod.philosophies ?? [];
}

async function loadStotras() {
    const dir = path.join(ROOT, "content", "stotras");
    const files = await readdir(dir);
    const stotras = [];
    for (const f of files) {
        if (!f.endsWith(".json")) continue;
        const raw = await readFile(path.join(dir, f), "utf8");
        try {
            const json = JSON.parse(raw);
            stotras.push({
                slug: json.slug ?? f.replace(/\.json$/, ""),
                title: json.title ?? json.name ?? f.replace(/\.json$/, ""),
                description: json.description ?? json.summary ?? "",
                verseCount: Array.isArray(json.verses) ? json.verses.length
                    : Array.isArray(json.names) ? json.names.length
                    : 0,
            });
        } catch {}
    }
    return stotras;
}

// ----------------------------------------------------------------------------
// llms.txt — curated hierarchical index
// ----------------------------------------------------------------------------

function renderLlmsTxt({
    articles,
    concepts,
    deities,
    mantras,
    comparisons,
    practices,
    traditions,
    texts,
    greats,
    philosophies,
    stotras,
}) {
    const lines = [];

    lines.push("# Sadhaka — opensadhaka.com");
    lines.push("");
    lines.push("> Sadhaka is an English-language reference for Sanatan Dharma — the philosophies, texts, practices, and living traditions of the Indian spiritual inheritance. Content covers Vedanta (Advaita, Vishishtadvaita, Dvaita), Shaiva, Shakta, and Vaishnava traditions, sacred texts (Vedas, Upanishads, Bhagavad Gita, Puranas), stotras and sahasranamas, Jyotish, Sanskrit vocabulary, and contemporary bridges to philosophy and psychology.");
    lines.push("");
    lines.push(`Canonical site: ${SITE_URL}`);
    lines.push(`Editorial standards: ${SITE_URL}/about`);
    lines.push("License: Editorial content © Sadhaka. Quotation with attribution and a link back to the source URL is permitted. Canonical Sanskrit primary sources (Vedas, Upanishads, Gita) are in the public domain.");
    lines.push("");

    // ----- Editorial articles (hub + spokes) -----
    lines.push("## Editorial articles");
    lines.push("");
    lines.push("In-depth essays on Sanatan philosophy, practices, and modern bridges. Each article has a direct-answer opening, inline citations from primary texts, and a FAQ block.");
    lines.push("");
    for (const a of articles) {
        const desc = (a.metaDescription || "").trim().replace(/\s+/g, " ");
        lines.push(`- [${a.title}](${SITE_URL}${a.route}): ${desc}`);
    }
    lines.push("");

    // ----- Concept / glossary pages -----
    lines.push("## Concept explorer — Sanskrit vocabulary in depth");
    lines.push("");
    lines.push("Definition pages for core Sanskrit concepts. Each page answers \"What is X?\" with a short definition, philosophical role, practical application, and linked source texts.");
    lines.push("");
    for (const c of concepts) {
        const desc = (c.shortDefinition || "").trim().replace(/\s+/g, " ");
        lines.push(`- [What is ${c.englishTranslation || c.slug}?](${SITE_URL}/what-is-${c.slug}): ${desc}`);
    }
    lines.push("");

    // ----- Deities -----
    lines.push("## Deities");
    lines.push("");
    lines.push("Profile pages for principal deities — iconography, mythology, philosophical meaning, and associated mantras and stotras.");
    lines.push("");
    for (const d of deities) {
        const desc = (d.description || "").trim().replace(/\s+/g, " ");
        lines.push(`- [${d.name}](${SITE_URL}/deities/${d.slug}): ${desc}`);
    }
    lines.push("");

    // ----- Mantras -----
    lines.push("## Mantras");
    lines.push("");
    lines.push("Canonical mantras with etymology, usage, and context. Each page gives the one-line meaning, word-by-word breakdown, and practice notes (best time, repetitions, tradition).");
    lines.push("");
    for (const m of mantras) {
        const desc = (m.oneLineMeaning || "").trim().replace(/\s+/g, " ");
        lines.push(`- [${m.name}](${SITE_URL}/mantras/${m.slug}): ${desc}`);
    }
    lines.push("");

    // ----- Stotras & Sahasranamas -----
    if (stotras.length) {
        lines.push("## Stotras and Sahasranamas");
        lines.push("");
        lines.push("Verse-by-verse and name-by-name treatments of devotional texts, each with Devanagari, transliteration, word-by-word translation, and literary/philosophical analysis.");
        lines.push("");
        for (const s of stotras) {
            const count = s.verseCount ? ` (${s.verseCount} ${s.verseCount >= 108 ? "names" : "verses"})` : "";
            const desc = (s.description || "").trim().replace(/\s+/g, " ");
            lines.push(`- [${s.title}](${SITE_URL}/stotras/${s.slug})${count}${desc ? `: ${desc}` : ""}`);
        }
        lines.push("");
    }

    // ----- Comparisons -----
    lines.push("## Comparisons (X vs Y)");
    lines.push("");
    lines.push("Direct philosophical and practical comparisons between schools, concepts, teachers, and practices. Each page opens with a TL;DR that distills the central distinction.");
    lines.push("");
    for (const c of comparisons) {
        const desc = (c.tldr || c.metaDescription || "").trim().replace(/\s+/g, " ");
        lines.push(`- [${c.title}](${SITE_URL}/compare/${c.slug}): ${desc}`);
    }
    lines.push("");

    // ----- Philosophies -----
    if (philosophies.length) {
        lines.push("## Philosophical schools");
        lines.push("");
        for (const p of philosophies) {
            const desc = (p.summary || p.description || "").trim().replace(/\s+/g, " ");
            lines.push(`- [${p.name || p.title || p.slug}](${SITE_URL}/philosophies/${p.slug}): ${desc}`);
        }
        lines.push("");
    }

    // ----- Traditions -----
    if (traditions.length) {
        lines.push("## Living traditions");
        lines.push("");
        for (const t of traditions) {
            const desc = (t.summary || t.description || "").trim().replace(/\s+/g, " ");
            lines.push(`- [${t.name || t.title || t.slug}](${SITE_URL}/traditions/${t.slug}): ${desc}`);
        }
        lines.push("");
    }

    // ----- Texts -----
    if (texts.length) {
        lines.push("## Sacred texts");
        lines.push("");
        for (const t of texts) {
            const desc = (t.summary || t.description || "").trim().replace(/\s+/g, " ");
            lines.push(`- [${t.title || t.name || t.slug}](${SITE_URL}/texts/${t.slug}): ${desc}`);
        }
        lines.push("");
    }

    // ----- Greats -----
    if (greats.length) {
        lines.push("## Teachers and scholars (Greats)");
        lines.push("");
        for (const g of greats) {
            const desc = (g.summary || g.description || "").trim().replace(/\s+/g, " ");
            lines.push(`- [${g.name || g.title || g.slug}](${SITE_URL}/greats/${g.slug}): ${desc}`);
        }
        lines.push("");
    }

    // ----- Practices -----
    if (practices.length) {
        lines.push("## Practices");
        lines.push("");
        for (const p of practices) {
            const desc = (p.summary || p.description || "").trim().replace(/\s+/g, " ");
            lines.push(`- [${p.name || p.title || p.slug}](${SITE_URL}/practices/${p.slug}): ${desc}`);
        }
        lines.push("");
    }

    // ----- Optional section for machines -----
    lines.push("## Optional");
    lines.push("");
    lines.push(`- [Docs for Agents (/ai-resources)](${SITE_URL}/ai-resources): human-readable guide for AI agents and RAG pipelines — discovery endpoints, ingestion patterns, attribution policy, and a sample agent system prompt.`);
    lines.push(`- [Full content dump (llms-full.txt)](${SITE_URL}/llms-full.txt): concatenated structured content — AEO blocks, FAQs, definitions, and comparison TL;DRs for RAG ingestion.`);
    lines.push(`- [Per-entity Markdown API](${SITE_URL}/api/llm-content?type=concepts&slug=karma): GET /api/llm-content?type={type}&slug={slug} returns a clean Markdown rendering of any individual entity page. Supported types: philosophies, traditions, texts, concepts, practices, greats, comparisons, articles.`);
    lines.push(`- [Sitemap index](${SITE_URL}/sitemap.xml): XML sitemap covering all indexed pages.`);
    lines.push(`- [Brand facts (machine-readable)](${SITE_URL}/.well-known/brand-facts.json): JSON describing editorial scope, sourcing policy, and topic coverage — for entity disambiguation.`);
    lines.push("");

    return lines.join("\n");
}

// ----------------------------------------------------------------------------
// llms-full.txt — structured content dump
// ----------------------------------------------------------------------------

function renderLlmsFullTxt({ articles, concepts, deities, mantras, comparisons }) {
    const lines = [];
    lines.push("# Sadhaka — Full Structured Content Dump");
    lines.push("");
    lines.push(`Source: ${SITE_URL}`);
    lines.push("Format: markdown sections, one per content unit. Each unit carries a canonical URL so citations can link back to the live page.");
    lines.push("Attribution: quotation permitted with link-back to the cited URL.");
    lines.push("");
    lines.push("---");
    lines.push("");

    // ----- Articles: AEO + FAQs -----
    lines.push("# Editorial articles");
    lines.push("");
    for (const a of articles) {
        const url = `${SITE_URL}${a.route}`;
        lines.push(`## ${a.title}`);
        lines.push(`URL: ${url}`);
        lines.push(`Pillar: ${a.pillar}`);
        if (a.publishDate) lines.push(`Published: ${a.publishDate}`);
        if (a.primaryKeyword) lines.push(`Primary keyword: ${a.primaryKeyword}`);
        lines.push("");
        if (a.aeoAnswer) {
            lines.push("### Direct answer");
            lines.push(a.aeoAnswer.trim());
            lines.push("");
        } else if (a.metaDescription) {
            lines.push("### Summary");
            lines.push(a.metaDescription.trim());
            lines.push("");
        }
        if (Array.isArray(a.faqs) && a.faqs.length) {
            lines.push("### FAQ");
            for (const f of a.faqs) {
                lines.push(`**Q: ${f.question}**`);
                lines.push("");
                lines.push(f.answer.trim());
                lines.push("");
            }
        }
        lines.push("---");
        lines.push("");
    }

    // ----- Concepts -----
    lines.push("# Concepts (Sanskrit vocabulary)");
    lines.push("");
    for (const c of concepts) {
        const url = `${SITE_URL}/what-is-${c.slug}`;
        lines.push(`## ${c.sanskritWord || c.slug} — ${c.englishTranslation || ""}`.trim());
        lines.push(`URL: ${url}`);
        lines.push("");
        if (c.shortDefinition) {
            lines.push("### Definition");
            lines.push(c.shortDefinition.trim());
            lines.push("");
        }
        if (c.longDescription) {
            lines.push("### Context");
            lines.push(c.longDescription.trim());
            lines.push("");
        }
        if (c.roleInPhilosophy) {
            lines.push("### Philosophical role");
            lines.push(c.roleInPhilosophy.trim());
            lines.push("");
        }
        if (c.practicalApplication) {
            lines.push("### Practical application");
            lines.push(c.practicalApplication.trim());
            lines.push("");
        }
        if (Array.isArray(c.keyPrinciples) && c.keyPrinciples.length) {
            lines.push("### Key principles");
            for (const k of c.keyPrinciples) lines.push(`- ${k}`);
            lines.push("");
        }
        if (Array.isArray(c.sourceTexts) && c.sourceTexts.length) {
            lines.push(`Sources: ${c.sourceTexts.join(", ")}`);
            lines.push("");
        }
        lines.push("---");
        lines.push("");
    }

    // ----- Deities -----
    lines.push("# Deities");
    lines.push("");
    for (const d of deities) {
        const url = `${SITE_URL}/deities/${d.slug}`;
        lines.push(`## ${d.name}`);
        lines.push(`URL: ${url}`);
        if (d.tradition?.length) lines.push(`Traditions: ${d.tradition.join(", ")}`);
        lines.push("");
        if (d.aeoBlock) {
            lines.push("### Direct answer");
            lines.push(d.aeoBlock.trim());
            lines.push("");
        }
        if (d.philosophy) {
            lines.push("### Philosophical meaning");
            lines.push(d.philosophy.trim());
            lines.push("");
        }
        if (d.mythology) {
            lines.push("### Mythology");
            lines.push(d.mythology.trim());
            lines.push("");
        }
        if (Array.isArray(d.faq) && d.faq.length) {
            lines.push("### FAQ");
            for (const f of d.faq) {
                lines.push(`**Q: ${f.question}**`);
                lines.push("");
                lines.push(f.answer.trim());
                lines.push("");
            }
        }
        lines.push("---");
        lines.push("");
    }

    // ----- Mantras -----
    lines.push("# Mantras");
    lines.push("");
    for (const m of mantras) {
        const url = `${SITE_URL}/mantras/${m.slug}`;
        lines.push(`## ${m.name}`);
        lines.push(`URL: ${url}`);
        if (m.devanagari) lines.push(`Devanagari: ${m.devanagari}`);
        if (m.transliteration) lines.push(`Transliteration: ${m.transliteration}`);
        lines.push("");
        if (m.oneLineMeaning) {
            lines.push("### Meaning");
            lines.push(m.oneLineMeaning.trim());
            lines.push("");
        }
        if (m.etymology?.overallMeaning) {
            lines.push("### Etymology (overall)");
            lines.push(m.etymology.overallMeaning.trim());
            lines.push("");
        }
        if (m.shastraContext) {
            lines.push("### Shastra context");
            lines.push(m.shastraContext.trim());
            lines.push("");
        }
        if (Array.isArray(m.faq) && m.faq.length) {
            lines.push("### FAQ");
            for (const f of m.faq) {
                lines.push(`**Q: ${f.question}**`);
                lines.push("");
                lines.push(f.answer.trim());
                lines.push("");
            }
        }
        lines.push("---");
        lines.push("");
    }

    // ----- Comparisons -----
    lines.push("# Comparisons (X vs Y)");
    lines.push("");
    for (const c of comparisons) {
        const url = `${SITE_URL}/compare/${c.slug}`;
        lines.push(`## ${c.title}`);
        lines.push(`URL: ${url}`);
        lines.push("");
        if (c.tldr) {
            lines.push("### Central distinction (TL;DR)");
            lines.push(c.tldr.trim());
            lines.push("");
        } else if (c.metaDescription) {
            lines.push(c.metaDescription.trim());
            lines.push("");
        }
        lines.push("---");
        lines.push("");
    }

    return lines.join("\n");
}

// ----------------------------------------------------------------------------
// Main
// ----------------------------------------------------------------------------

async function main() {
    console.log("Loading content...");

    const [
        articles,
        concepts,
        deities,
        mantras,
        comparisons,
        practices,
        traditions,
        texts,
        greats,
        philosophies,
        stotras,
    ] = await Promise.all([
        loadArticles(),
        loadConcepts(),
        loadDeities(),
        loadMantras(),
        loadComparisons(),
        loadPractices().catch(() => []),
        loadTraditions().catch(() => []),
        loadTexts().catch(() => []),
        loadGreats().catch(() => []),
        loadPhilosophies().catch(() => []),
        loadStotras().catch(() => []),
    ]);

    console.log(
        `  articles=${articles.length} concepts=${concepts.length} deities=${deities.length} mantras=${mantras.length} comparisons=${comparisons.length} practices=${practices.length} traditions=${traditions.length} texts=${texts.length} greats=${greats.length} philosophies=${philosophies.length} stotras=${stotras.length}`,
    );

    await mkdir(OUTPUT_DIR, { recursive: true });

    const llmsTxt = renderLlmsTxt({
        articles,
        concepts,
        deities,
        mantras,
        comparisons,
        practices,
        traditions,
        texts,
        greats,
        philosophies,
        stotras,
    });
    const llmsPath = path.join(OUTPUT_DIR, "llms.txt");
    await writeFile(llmsPath, llmsTxt, "utf8");
    console.log(`Wrote ${path.relative(ROOT, llmsPath)} (${llmsTxt.length.toLocaleString()} chars)`);

    const llmsFull = renderLlmsFullTxt({ articles, concepts, deities, mantras, comparisons });
    const llmsFullPath = path.join(OUTPUT_DIR, "llms-full.txt");
    await writeFile(llmsFullPath, llmsFull, "utf8");
    console.log(`Wrote ${path.relative(ROOT, llmsFullPath)} (${llmsFull.length.toLocaleString()} chars)`);
    console.log("\nNote: these are SNAPSHOTS for diffing. The live /llms.txt + /llms-full.txt URLs are served by the route handlers at src/app/(system)/.");
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
