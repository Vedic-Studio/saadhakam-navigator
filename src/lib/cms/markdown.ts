import type { ArticleMeta } from "@/data/articles";
import {
    pilotArticleContents,
    type ArticleBlock,
    type RichText,
    type RichTextPart,
} from "@/content/articles/pilotArticles";
import { stringifyFrontmatter } from "./frontmatter";

function richTextPartToMarkdown(part: RichTextPart): string {
    if (typeof part === "string") {
        return part;
    }

    switch (part.type) {
        case "strong":
            return `**${part.text}**`;
        case "em":
            return `*${part.text}*`;
        case "link":
            return `[${part.text}](${part.href})`;
        default:
            return "";
    }
}

function richTextToMarkdown(content: RichText): string {
    return content.map(richTextPartToMarkdown).join("");
}

function blockToMarkdown(block: ArticleBlock): string {
    switch (block.type) {
        case "lead":
        case "paragraph":
            return richTextToMarkdown(block.content);
        case "heading":
            return `${"#".repeat(block.level)} ${richTextToMarkdown(block.content)}`;
        case "list":
            return block.items.map((item) => `- ${richTextToMarkdown(item)}`).join("\n");
        case "quote":
            return [
                `> ${richTextToMarkdown(block.content)}`,
                block.cite ? `> — ${block.cite}` : "",
            ]
                .filter(Boolean)
                .join("\n");
        case "callout":
            return [
                `> **${block.title || "Note"}**`,
                `> ${richTextToMarkdown(block.content)}`,
            ].join("\n");
        case "separator":
            return "---";
        default:
            return "";
    }
}

export function buildPilotCmsMarkdown(meta: ArticleMeta): string | null {
    const pilot = pilotArticleContents[meta.slug];
    if (!pilot) {
        return null;
    }

    const body = pilot.blocks.map(blockToMarkdown).join("\n\n");

    return stringifyFrontmatter(
        {
            slug: meta.slug,
            title: meta.title,
            description: meta.metaDescription,
            publishDate: meta.publishDate,
            updatedAt: meta.publishDate,
            pillar: meta.pillar,
        },
        body,
    );
}