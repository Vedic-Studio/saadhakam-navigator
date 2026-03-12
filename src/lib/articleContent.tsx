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
        if (block.type === "lead") {
            return (
                <p key={index} className="article-lead">
                    {renderRichText(block.content)}
                </p>
            );
        }

        if (block.type === "paragraph") {
            return <p key={index}>{renderRichText(block.content)}</p>;
        }

        if (block.type === "heading") {
            if (block.level === 3) {
                return <h3 key={index}>{renderRichText(block.content)}</h3>;
            }

            return <h2 key={index}>{renderRichText(block.content)}</h2>;
        }

        if (block.type === "quote") {
            return (
                <blockquote key={index}>
                    <p>{renderRichText(block.content)}</p>
                    {block.cite && <cite>{block.cite}</cite>}
                </blockquote>
            );
        }

        if (block.type === "callout") {
            return (
                <aside
                    key={index}
                    className="article-callout"
                    data-tone={block.tone ?? "insight"}
                >
                    {block.title ? <p className="article-callout-title">{block.title}</p> : null}
                    <p>{renderRichText(block.content)}</p>
                </aside>
            );
        }

        if (block.type === "separator") {
            return <hr key={index} />;
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
            if (block.type === "lead") {
                return `<p class="article-lead">${richTextToHtml(block.content)}</p>`;
            }

            if (block.type === "paragraph") {
                return `<p>${richTextToHtml(block.content)}</p>`;
            }

            if (block.type === "heading") {
                return `<h${block.level}>${richTextToHtml(block.content)}</h${block.level}>`;
            }

            if (block.type === "quote") {
                const cite = block.cite ? `<cite>${escapeHtml(block.cite)}</cite>` : "";
                return `<blockquote><p>${richTextToHtml(block.content)}</p>${cite}</blockquote>`;
            }

            if (block.type === "callout") {
                const title = block.title
                    ? `<p class="article-callout-title">${escapeHtml(block.title)}</p>`
                    : "";
                return `<aside class="article-callout" data-tone="${escapeHtml(block.tone ?? "insight")}">${title}<p>${richTextToHtml(block.content)}</p></aside>`;
            }

            if (block.type === "separator") {
                return "<hr />";
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