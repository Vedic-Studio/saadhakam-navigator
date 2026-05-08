import { NextRequest, NextResponse } from "next/server";
import { getPublishedCmsContent } from "@/lib/cms/storage";
import { buildPilotCmsMarkdown } from "@/lib/cms/markdown";

function stripFrontmatter(markdown: string): string {
    return markdown.replace(/^---\n[\s\S]*?\n---\n*/, "").trim();
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const slug = searchParams.get("slug");

    if (!type || !slug) {
        return new NextResponse("Missing type or slug parameters", { status: 400 });
    }

    let content = "";
    let title = "";

    try {
        switch (type) {
            case "philosophies": {
                const { getPhilosophyBySlug } = await import("@/data/philosophies");
                const p = getPhilosophyBySlug(slug);
                if (!p) break;
                title = p.title;
                content = `
# ${p.title}
**Summary:** ${p.summary}
**Key Question Explored:** ${p.keyQuestion}

## Description
${p.description}

## Key Ideas
${p.keyIdeas.map(i => `- ${i}`).join("\n")}

## Practical Guidance
- **Who it suits:** ${p.whoItSuits}
- **How to start:** ${p.howToStart}

## Recommended Texts
${p.recommendedTexts.map(t => `- ${t}`).join("\n")}
`;
                break;
            }
            case "traditions": {
                const { getTraditionBySlug } = await import("@/data/traditions");
                const t = getTraditionBySlug(slug);
                if (!t) break;
                title = t.title;
                content = `
# ${t.title}
**Summary:** ${t.summary}

## Description
${t.description}

## Core Practices
${t.primaryPractices.map((p: string) => `- ${p}`).join("\n")}

## Practical Guidance
- **Who it suits:** ${t.whoItSuits}
- **How to start:** ${t.howToStart}
`;
                break;
            }
            case "texts": {
                const { getTextBySlug } = await import("@/data/texts");
                const t = getTextBySlug(slug);
                if (!t) break;
                title = t.title;
                content = `
# ${t.title}
**Summary:** ${t.summary}

## Description
${t.overview}

## Core Subjects
${t.themes.map((s: string) => `- ${s}`).join("\n")}

## Quick Facts
- **Who should read:** ${t.whoItSuitsFor}
- **How to study:** ${t.howToApproach}
`;
                break;
            }
            case "concepts": {
                const { getConceptBySlug } = await import("@/data/concepts");
                // Concept slugs in the sitemap often include prefixes like "what-is-dharma"
                const cleanSlug = slug.replace("what-is-", "").replace("-meaning", "");
                const c = getConceptBySlug(cleanSlug);
                if (!c) break;
                title = c.sanskritWord;
                content = `
# ${c.sanskritWord} (${c.englishTranslation})
**Definition:** ${c.shortDefinition}

## Detailed Description
${c.longDescription}

## Key Principles
${c.keyPrinciples.map(k => `- ${k}`).join("\n")}

## Philosophical & Practical Context
- **Role in Philosophy:** ${c.roleInPhilosophy}
- **Practical Application:** ${c.practicalApplication}

## Source Texts
${c.sourceTexts.map(s => `- ${s}`).join("\n")}
`;
                break;
            }
            case "practices": {
                const { getPracticeBySlug } = await import("@/data/practices");
                const p = getPracticeBySlug(slug);
                if (!p) break;
                title = p.title;
                content = `
# ${p.title} (${p.sanskritName})
**Summary:** ${p.summary}

## What It Is
${p.whatItIs}

## Benefits
${p.benefits.map(b => `- ${b}`).join("\n")}

## Guidance
- **Who it suits:** ${p.whoItSuits}
- **How to begin:** ${p.howToBegin}
- **Time commitment:** ${p.timeCommitment}
`;
                break;
            }
            case "greats": {
                const { getGreatBySlug } = await import("@/data/greats");
                const g = getGreatBySlug(slug);
                if (!g) break;
                title = g.name;
                content = `
# ${g.name} (${g.era})
**Summary:** ${g.summary}

## Description
${g.description}

## Key Teachings
${g.keyTeachings.map((t: string) => `- ${t}`).join("\n")}

## Impact
${g.relevanceToday}
`;
                break;
            }
            case "articles": {
                const { getArticleBySlug } = await import("@/data/articles");
                const article = getArticleBySlug(slug);
                if (!article) break;
                title = article.title;
                const cmsMarkdown = await getPublishedCmsContent(slug);
                const fallbackMarkdown = buildPilotCmsMarkdown(article);
                const bodyMarkdown = stripFrontmatter(cmsMarkdown || fallbackMarkdown || "");
                content = `
# ${article.title}
**URL:** https://www.opensadhaka.com${article.route}
**Primary keyword:** ${article.primaryKeyword}
**Pillar:** ${article.pillar}
**Direct answer:** ${article.aeoAnswer || article.metaDescription}

## Meta description
${article.metaDescription}

## Editorial excerpt
${bodyMarkdown || article.metaDescription}

## Key FAQs
${article.faqs.map((faq) => `### ${faq.question}\n${faq.answer}`).join("\n\n")}
`;
                break;
            }
            case "topics": {
                const { getTopicBySlug } = await import("@/data/topics");
                const t = getTopicBySlug(slug);
                if (!t) break;
                title = t.name;
                content = `
# ${t.name}
**Summary:** ${t.summary}

## Content
${t.content}

## Recommended Pathways
- **Practices:** ${t.recommendedPractices.join(", ")}
- **Traditions:** ${t.recommendedTraditions.join(", ")}
`;
                break;
            }
            case "comparisons": {
                const { getComparisonBySlug } = await import("@/data/comparisons");
                const c = getComparisonBySlug(slug);
                if (!c) break;
                title = c.title;
                content = `
# ${c.title}
**TL;DR:** ${c.tldr || c.metaDescription}

## Content
${c.content}
`;
                break;
            }
            case "grahas": {
                const { getGrahaBySlug } = await import("@/data/grahas");
                const g = getGrahaBySlug(slug);
                if (!g) break;
                title = g.name;
                content = `
# ${g.name}
**Summary:** ${g.description}

## Practice framing
${g.aeoBlock}

## Core details
- **Weekday:** ${g.weekday}
- **Exaltation:** ${g.exaltation}
- **Debilitation:** ${g.debilitation}
- **Gemstone:** ${g.gemstone}
- **Metal:** ${g.metal}

## Significations
${g.significations.map((item) => `- ${item}`).join("\n")}
`;
                break;
            }
            case "rashis": {
                const { getRashiBySlug } = await import("@/data/rashis");
                const r = getRashiBySlug(slug);
                if (!r) break;
                title = r.name;
                content = `
# ${r.name}
**Summary:** ${r.description}

## Practice framing
${r.aeoBlock}

## Core details
- **Symbol:** ${r.symbol}
- **Element:** ${r.element}
- **Modality:** ${r.modality}
- **Ruling graha:** ${r.rulingGraha}

## Nakshatra coverage
${r.nakshatraSlugs.map((item) => `- ${item}`).join("\n")}
`;
                break;
            }
            case "nakshatras": {
                const { getNakshatraBySlug } = await import("@/data/nakshatras");
                const n = getNakshatraBySlug(slug);
                if (!n) break;
                title = n.name;
                content = `
# ${n.name}
**Summary:** ${n.description}

## Practice framing
${n.aeoBlock}

## Core details
- **Span:** ${n.span}
- **Ruling graha:** ${n.rulingGraha}
- **Deity:** ${n.deitySlug}
- **Gana:** ${n.gana}
- **Guna:** ${n.guna}
- **Tattva:** ${n.tattva}

## Qualities
${n.qualities.map((item) => `- ${item}`).join("\n")}

## Shadow qualities
${n.shadowQualities.map((item) => `- ${item}`).join("\n")}
`;
                break;
            }
            case "panchang": {
                const { getTithiBySlug, getVaraBySlug } = await import("@/data/panchang");
                const t = getTithiBySlug(slug);
                if (t) {
                    title = t.name;
                    content = `
# ${t.name}
**Summary:** ${t.description}

## Practice framing
${t.aeoBlock}

## Core details
- **Paksha:** ${t.paksha}
- **Number:** ${t.number}
- **Deity:** ${t.deity}
- **Meaning:** ${t.meaning}
`;
                    break;
                }

                const v = getVaraBySlug(slug);
                if (!v) break;
                title = v.name;
                content = `
# ${v.name}
**Summary:** ${v.description}

## Practice framing
${v.aeoBlock}

## Core details
- **Weekday number:** ${v.weekdayNumber}
- **Ruling graha:** ${v.rulingGraha}
`;
                break;
            }
        }

        if (!content) {
            return new NextResponse(`# Entity Not Found\n\nThe requested ${type} "${slug}" could not be found or does not have a Markdown rendering configured.`, { status: 404 });
        }

        // Wrap the entity with LLM-friendly metadata
        const finalMarkdown = `<!-- LLM INSTRUCTION: This file is a machine-readable summary of a Sādhaka entity. Preserve doctrinal attribution and do not collapse scripture, commentary, and editorial synthesis into a single undifferentiated source. -->
${content.trim()}`;

        return new NextResponse(finalMarkdown, {
            headers: {
                "Content-Type": "text/markdown; charset=utf-8",
                "Cache-Control": "public, max-age=86400, s-maxage=86400",
            },
        });

    } catch (error) {
        console.error("Error generating LLM content:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
