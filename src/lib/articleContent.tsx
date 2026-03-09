import Link from "next/link";
import { Fragment } from "react";
import type { ArticleBlock, RichText, RichTextPart } from "@/content/articles/pilotArticles";

function escapeHtml(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

export function renderRichText(content: RichText) {
    return content.map((part: RichTextPart, index) => {
        if (typeof part === "string") {
            return <Fragment key={index}>{part}</Fragment>;
        }

        if (part.type === "strong") {
            return <strong key={index}>{part.text}</strong>;
        }

        if (part.type === "em") {
            return <em key={index}>{part.text}</em>;
        }

        return (
            <Link key={index} href={part.href}>
                {part.text}
            </Link>
        );
    });
}

export function ArticleBlocks({ blocks }: { blocks: ArticleBlock[] }) {
    return blocks.map((block, index) => {
        if (block.type === "paragraph") {
            return <p key={index}>{renderRichText(block.content)}</p>;
        }

        if (block.type === "heading") {
            if (block.level === 3) {
                return <h3 key={index}>{renderRichText(block.content)}</h3>;
            }

            return <h2 key={index}>{renderRichText(block.content)}</h2>;
        }

        return (
            <ul key={index}>
                {block.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{renderRichText(item)}</li>
                ))}
            </ul>
        );
    });
}

export function richTextToHtml(content: RichText) {
    return content
        .map((part) => {
            if (typeof part === "string") {
                return escapeHtml(part);
            }

            if (part.type === "strong") {
                return `<strong>${escapeHtml(part.text)}</strong>`;
            }

            if (part.type === "em") {
                return `<em>${escapeHtml(part.text)}</em>`;
            }

            return `<a href="${escapeHtml(part.href)}">${escapeHtml(part.text)}</a>`;
        })
        .join("");
}

export function articleBlocksToHtml(blocks: ArticleBlock[]) {
    return blocks
        .map((block) => {
            if (block.type === "paragraph") {
                return `<p>${richTextToHtml(block.content)}</p>`;
            }

            if (block.type === "heading") {
                return `<h${block.level}>${richTextToHtml(block.content)}</h${block.level}>`;
            }

            return `<ul>${block.items
                .map((item) => `<li>${richTextToHtml(item)}</li>`)
                .join("")}</ul>`;
        })
        .join("");
}

export function jsonToHtmlScript(value: unknown) {
    return JSON.stringify(value).replace(/</g, "\\u003c");
}