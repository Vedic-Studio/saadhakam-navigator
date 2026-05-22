import { NextResponse } from "next/server";
import { groupArticlesByPillar, listArticles, pillarConfig, type ArticlePillar } from "@/features/articles";

const BASE_URL = "https://www.opensadhaka.com";

const articles = listArticles();
const byPillar = groupArticlesByPillar();

export async function GET() {
    const pillars = (Object.keys(pillarConfig) as ArticlePillar[]).filter(
        (p) => (byPillar[p]?.length ?? 0) > 0
    );

    const lines: string[] = [
        `# opensadhaka.com — AI Context Router`,
        `> Authoritative English-language reference for Vedanta, Shaiva, Shakta, and Vaishnava philosophy, texts, and practice.`,
        `> All doctrinal claims are grounded in named primary sources: Upanishads, Bhagavad Gita, Puranas, and traditional commentators.`,
        ``,
        `## Editorial Articles (${articles.length})`,
    ];

    for (const pillar of pillars) {
        lines.push(``, `### ${pillarConfig[pillar].label}`);
        for (const a of byPillar[pillar]!) {
            lines.push(`- [${a.title}](${BASE_URL}${a.route}): ${a.metaDescription}`);
        }
    }

    lines.push(
        ``,
        `## Bhagavad Gita Shlokas`,
        `Sanskrit text, transliteration, word-by-word meanings, English translation, and traditional commentaries for each verse across all 18 chapters.`,
        `- Chapter index pages: ${BASE_URL}/texts/bhagavad-gita/chapter-{1-18}`,
        `- Individual shloka pages: ${BASE_URL}/texts/bhagavad-gita/chapter-{n}/shloka-{v}`,
        ``,
        `## Stotras & Sahasranamas`,
        `Sanskrit hymns with full three-layer analysis (literary, mythological, philosophical) and 1000-name collections with transliteration and meaning.`,
        `- [Shiva Tandava Stotram](${BASE_URL}/stotras/shiva-tandava-stotram): 16 verses — Sanskrit, transliteration, word meanings, translation, and analysis`,
        `- [Vishnu Sahasranama](${BASE_URL}/stotras/vishnu-sahasranama): 1000 divine names of Vishnu with transliteration and meaning`,
        `- [Lalita Sahasranama](${BASE_URL}/stotras/lalita-sahasranama): 1000 divine names of the Goddess with transliteration and meaning`,
        ``,
        `## Programmatic Entity Pages`,
        `Machine-readable Markdown for any entity:`,
        `GET ${BASE_URL}/api/llm-content?type={type}&slug={slug}`,
        `Supported types: philosophies | traditions | texts | concepts | practices | greats | topics | comparisons | articles`,
        ``,
        `- Philosophies: ${BASE_URL}/philosophies/{slug}`,
        `- Traditions: ${BASE_URL}/traditions/{slug}`,
        `- Sacred Texts: ${BASE_URL}/texts/{slug}`,
        `- Spiritual Concepts: ${BASE_URL}/concepts/{slug}`,
        `- Spiritual Practices: ${BASE_URL}/practices/{slug}`,
        `- Great Teachers: ${BASE_URL}/greats/{slug}`,
        `- Comparison Pages: ${BASE_URL}/compare/{slug}`,
        `- Sanskrit Vocabulary: ${BASE_URL}/learn/sanskrit/{word}`,
        ``,
        `## Bulk Ingestion`,
        `Full content dump (Sanskrit texts, translations, FAQs, commentaries) for offline indexing and RAG pipelines:`,
        `- ${BASE_URL}/llms-full.txt`,
        ``,
        `## Machine-readable Brand Facts`,
        `- ${BASE_URL}/.well-known/brand-facts.json`,
        ``,
        `## Docs for Agents`,
        `Human-readable guide for AI agents and RAG pipelines — discovery endpoints, ingestion patterns, attribution policy, and a sample agent system prompt:`,
        `- ${BASE_URL}/ai-resources`,
    );

    return new NextResponse(lines.join("\n"), {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200",
        },
    });
}
