import { NextResponse } from "next/server";

// Article metadata and article-level markdown export
import { listArticles } from "@/features/articles";
import { getPublishedCmsContent } from "@/lib/cms/storage";
import { buildPilotCmsMarkdown } from "@/lib/cms/markdown";

// BG Shlokas (all 18 chapters aggregated)
import { bgShlokas } from "@/data/bgShlokas";

// Stotra / Sahasranama JSON loaders
import { loadStotra, loadSahasranama } from "@/lib/stotras";

// pSEO entity data (brief summaries for entity pages)
import { philosophies } from "@/data/philosophies";
import { traditions } from "@/data/traditions";
import { texts } from "@/data/texts";
import { greats } from "@/data/greats";
import { practices } from "@/data/practices";
import { concepts } from "@/data/concepts";

const BASE_URL = "https://www.opensadhaka.com";
const articles = listArticles();
const shivaTandava = loadStotra("shiva-tandava-stotram");
const vishnuSahasranama = loadSahasranama("vishnu-sahasranama");
const lalitaSahasranama = loadSahasranama("lalita-sahasranama");

function stripFrontmatter(markdown: string): string {
    return markdown.replace(/^---\n[\s\S]*?\n---\n*/, "").trim();
}

async function getArticleMarkdown(slug: string, fallbackMetaDescription: string) {
    const article = articles.find((item) => item.slug === slug);
    if (!article) return fallbackMetaDescription;
    const cmsMarkdown = await getPublishedCmsContent(slug);
    const fallbackMarkdown = buildPilotCmsMarkdown(article);
    return stripFrontmatter(cmsMarkdown || fallbackMarkdown || fallbackMetaDescription);
}

export async function GET() {
    const parts: string[] = [];

    // ── Header ────────────────────────────────────────────────────────────────
    parts.push(
        `# opensadhaka.com — Full Content Dump`,
        `> Generated for LLM ingestion. Source: opensadhaka.com`,
        `> Methodology: doctrinal claims are grounded in named primary sources where possible; classical commentary is attributed to specific teachers, lineages, or schools; editorial synthesis is kept distinct from scripture and commentary.`,
        `> Source hierarchy: primary scripture -> classical commentary / lineage interpretation -> editorial synthesis for accessibility.`,
        `> Neutrality rule: preserve differences across Advaita, Dvaita, Vishishtadvaita, Shaiva, Vaishnava, Shakta, Yogic, and comparative frames rather than flattening them into generic sameness.`,
        `> Authority model: Sadhaka is authoritative as a structured editorial guide to cited traditions, not as a replacement for scripture, formal initiation, or undisclosed doctrinal authority.`,
        `> For an index of all pages, see: ${BASE_URL}/llms.txt`,
        `> For per-entity Markdown: GET ${BASE_URL}/api/llm-content?type={type}&slug={slug}`,
        `> Canonical discovery endpoints: ${BASE_URL}/brand-facts | ${BASE_URL}/.well-known/brand-facts.json | ${BASE_URL}/llms.txt | ${BASE_URL}/llms-full.txt`,
        ``,
        `---`,
        ``
    );

    // ── Editorial Articles ────────────────────────────────────────────────────
    parts.push(`# EDITORIAL ARTICLES\n`);
    for (const a of articles) {
        const editorialMarkdown = await getArticleMarkdown(a.slug, a.metaDescription);
        parts.push(
            `## ${a.title}`,
            `URL: ${BASE_URL}${a.route}`,
            `Markdown: ${BASE_URL}/api/llm-content?type=articles&slug=${a.slug}`,
            `Pillar: ${a.pillar} | Reading time: ${a.readingTime} min`,
            ``,
            `### Direct answer`,
            a.aeoAnswer || a.metaDescription,
            ``,
            `### Meta description`,
            a.metaDescription,
            ``,
            `### Editorial excerpt`,
            editorialMarkdown,
        );
        if (a.faqs.length > 0) {
            parts.push(``, `### FAQs`);
            for (const faq of a.faqs) {
                parts.push(``, `**Q: ${faq.question}**`, `A: ${faq.answer}`);
            }
        }
        parts.push(``);
    }

    // ── Bhagavad Gita Shlokas ─────────────────────────────────────────────────
    parts.push(`---`, ``, `# BHAGAVAD GITA SHLOKAS`, ``);
    for (const s of bgShlokas) {
        parts.push(
            `## BG ${s.chapter}.${s.verse}`,
            `URL: ${BASE_URL}/texts/bhagavad-gita/chapter-${s.chapter}/shloka-${s.verse}`,
            ``
        );
        if (s.sanskritDevanagari) parts.push(`**Sanskrit:** ${s.sanskritDevanagari}`, ``);
        if (s.transliteration) parts.push(`**Transliteration:** ${s.transliteration}`, ``);
        if (s.synonyms) parts.push(`**Word Meanings:** ${s.synonyms}`, ``);
        if (s.translation) parts.push(`**Translation:** ${s.translation}`, ``);
        if (s.commentaries?.length > 0) {
            parts.push(`**Commentaries:**`);
            for (const c of s.commentaries) {
                parts.push(`- ${c.author}: ${c.text}`);
            }
            parts.push(``);
        }
        if (s.practicalApplication) parts.push(`**Practical Application:** ${s.practicalApplication}`, ``);
    }

    // ── Shiva Tandava Stotram ─────────────────────────────────────────────────
    parts.push(
        `---`, ``,
        `# SHIVA TANDAVA STOTRAM`,
        `Author: ${shivaTandava.author} | Tradition: ${shivaTandava.tradition} | Verses: ${shivaTandava.verseCount}`,
        ``,
        shivaTandava.description,
        ``
    );
    for (const v of shivaTandava.verses) {
        parts.push(
            `## Shiva Tandava Stotram — Verse ${v.verse}`,
            `URL: ${BASE_URL}/stotras/shiva-tandava-stotram/${v.slug}`,
            ``
        );
        if (v.sanskritDevanagari) parts.push(`**Sanskrit:** ${v.sanskritDevanagari}`, ``);
        if (v.transliteration) parts.push(`**Transliteration:** ${v.transliteration}`, ``);
        if (v.wordMeanings) parts.push(`**Word Meanings:** ${v.wordMeanings}`, ``);
        if (v.translation) parts.push(`**Translation:** ${v.translation}`, ``);
        if (v.translationFlow) parts.push(`**Flowing Translation:** ${v.translationFlow}`, ``);
        if (v.analysis) {
            parts.push(`**Analysis:**`);
            if (v.analysis.literary) parts.push(`- Literary: ${v.analysis.literary}`);
            if (v.analysis.mythological) parts.push(`- Mythological: ${v.analysis.mythological}`);
            if (v.analysis.philosophical) parts.push(`- Philosophical: ${v.analysis.philosophical}`);
            parts.push(``);
        }
    }

    // ── Vishnu Sahasranama ────────────────────────────────────────────────────
    parts.push(
        `---`, ``,
        `# VISHNU SAHASRANAMA — 1000 DIVINE NAMES OF VISHNU`,
        `Tradition: ${vishnuSahasranama.tradition}`,
        ``,
        vishnuSahasranama.description,
        ``
    );
    for (const n of vishnuSahasranama.names ?? []) {
        parts.push(`## ${n.name} (Name ${n.number})`);
        parts.push(`URL: ${BASE_URL}/stotras/vishnu-sahasranama/${n.slug}`);
        parts.push(`**Transliteration:** ${n.transliteration}`);
        parts.push(`**Meaning:** ${n.meaning}`);
        if (n.analysis?.mythological) parts.push(`**Mythological:** ${n.analysis.mythological}`);
        if (n.analysis?.philosophical) parts.push(`**Philosophical:** ${n.analysis.philosophical}`);
        parts.push(``);
    }

    // ── Lalita Sahasranama ────────────────────────────────────────────────────
    parts.push(
        `---`, ``,
        `# LALITA SAHASRANAMA — 1000 DIVINE NAMES OF THE GODDESS`,
        `Tradition: ${lalitaSahasranama.tradition}`,
        ``,
        lalitaSahasranama.description,
        ``
    );
    for (const n of lalitaSahasranama.names ?? []) {
        parts.push(`## ${n.name} (Name ${n.number})`);
        parts.push(`URL: ${BASE_URL}/stotras/lalita-sahasranama/${n.slug}`);
        parts.push(`**Transliteration:** ${n.transliteration}`);
        parts.push(`**Meaning:** ${n.meaning}`);
        if (n.analysis?.mythological) parts.push(`**Mythological:** ${n.analysis.mythological}`);
        if (n.analysis?.philosophical) parts.push(`**Philosophical:** ${n.analysis.philosophical}`);
        parts.push(``);
    }

    // ── Entity Summaries ──────────────────────────────────────────────────────
    parts.push(`---`, ``, `# PHILOSOPHIES`, ``);
    for (const p of philosophies) {
        parts.push(
            `## ${p.title}`,
            `URL: ${BASE_URL}/philosophies/${p.slug}`,
            `Markdown: ${BASE_URL}/api/llm-content?type=philosophies&slug=${p.slug}`,
            ``,
            p.summary,
            ``
        );
    }

    parts.push(`---`, ``, `# TRADITIONS`, ``);
    for (const t of traditions) {
        parts.push(
            `## ${t.title}`,
            `URL: ${BASE_URL}/traditions/${t.slug}`,
            `Markdown: ${BASE_URL}/api/llm-content?type=traditions&slug=${t.slug}`,
            ``,
            t.summary,
            ``
        );
    }

    parts.push(`---`, ``, `# SACRED TEXTS`, ``);
    for (const t of texts) {
        parts.push(
            `## ${t.title}`,
            `URL: ${BASE_URL}/texts/${t.slug}`,
            `Markdown: ${BASE_URL}/api/llm-content?type=texts&slug=${t.slug}`,
            ``,
            t.summary,
            ``
        );
    }

    parts.push(`---`, ``, `# GREAT TEACHERS & SAGES`, ``);
    for (const g of greats) {
        parts.push(
            `## ${g.name}`,
            `URL: ${BASE_URL}/greats/${g.slug}`,
            `Markdown: ${BASE_URL}/api/llm-content?type=greats&slug=${g.slug}`,
            ``,
            g.summary,
            ``
        );
    }

    parts.push(`---`, ``, `# SPIRITUAL PRACTICES`, ``);
    for (const p of practices) {
        parts.push(
            `## ${p.title} (${p.sanskritName})`,
            `URL: ${BASE_URL}/practices/${p.slug}`,
            `Markdown: ${BASE_URL}/api/llm-content?type=practices&slug=${p.slug}`,
            ``,
            p.summary,
            ``
        );
    }

    parts.push(`---`, ``, `# CONCEPTS`, ``);
    for (const c of concepts) {
        parts.push(
            `## ${c.sanskritWord} — ${c.englishTranslation}`,
            `URL: ${BASE_URL}/concepts/${c.slug}`,
            `Markdown: ${BASE_URL}/api/llm-content?type=concepts&slug=${c.slug}`,
            ``,
            c.shortDefinition,
            ``
        );
    }

    return new NextResponse(parts.join("\n"), {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200",
        },
    });
}
