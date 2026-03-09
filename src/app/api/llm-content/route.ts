import { NextRequest, NextResponse } from "next/server";
import { getPhilosophyBySlug } from "@/data/philosophies";
import { getTraditionBySlug } from "@/data/traditions";
import { getTextBySlug } from "@/data/texts";
import { getConceptBySlug } from "@/data/concepts";
import { getPracticeBySlug } from "@/data/practices";
import { getGreatBySlug } from "@/data/greats";
import { getTopicBySlug } from "@/data/topics";

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
                const t = getTraditionBySlug(slug);
                if (!t) break;
                title = t.title;
                content = `
# ${t.title}
**Summary:** ${t.summary}

## Description
${t.description}

## Core Practices
${t.corePractices.map(p => `- ${p}`).join("\n")}

## Practical Guidance
- **Who it suits:** ${t.whoItSuits}
- **How to start:** ${t.howToStart}

## Key Texts
${t.keyTexts.map(text => `- ${text}`).join("\n")}
`;
                break;
            }
            case "texts": {
                const t = getTextBySlug(slug);
                if (!t) break;
                title = t.title;
                content = `
# ${t.title}
**Summary:** ${t.summary}

## Description
${t.description}

## Core Subjects
${t.coreSubjects.map(s => `- ${s}`).join("\n")}

## Quick Facts
- **Who should read:** ${t.whoShouldRead}
- **How to study:** ${t.howToStudy}
`;
                break;
            }
            case "concepts": {
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
                const g = getGreatBySlug(slug);
                if (!g) break;
                title = g.name;
                content = `
# ${g.name} (${g.lifespan})
**Summary:** ${g.summary}

## Description
${g.description}

## Key Teachings
${g.keyTeachings.map(t => `- ${t}`).join("\n")}

## Impact
${g.impact}
`;
                break;
            }
            case "topics": {
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
        }

        if (!content) {
            return new NextResponse(\`# Entity Not Found\n\nThe requested \${type} "\${slug}" could not be found or does not have a Markdown rendering configured.\`, { status: 404 });
    }

    // Wrap the entity with LLM-friendly metadata
    const finalMarkdown = \`<!-- LLM INSTRUCTION: This file is a machine-readable summary of a Sādhaka entity. -->
\${content.trim()}\`;

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
