import Link from "next/link";
import { parseFrontmatter } from "@/lib/cms/frontmatter";

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
    const parts: React.ReactNode[] = [];
    const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^\)]+\))/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    let index = 0;

    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(text.slice(lastIndex, match.index));
        }

        const token = match[0];
        if (token.startsWith("**")) {
            parts.push(<strong key={`${keyPrefix}-strong-${index++}`}>{token.slice(2, -2)}</strong>);
        } else if (token.startsWith("*")) {
            parts.push(<em key={`${keyPrefix}-em-${index++}`}>{token.slice(1, -1)}</em>);
        } else {
            const linkMatch = token.match(/^\[([^\]]+)\]\(([^\)]+)\)$/);
            if (linkMatch) {
                parts.push(
                    <Link
                        key={`${keyPrefix}-link-${index++}`}
                        href={linkMatch[2]}
                        className="text-orange-400 underline underline-offset-4"
                    >
                        {linkMatch[1]}
                    </Link>,
                );
            }
        }

        lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex));
    }

    return parts;
}

export function CmsMarkdownContent({ markdown }: { markdown: string }) {
    const { body } = parseFrontmatter(markdown);
    const lines = body.split("\n");
    const nodes: React.ReactNode[] = [];
    let listItems: string[] = [];
    let quoteLines: string[] = [];
    let paragraphLines: string[] = [];

    const flushParagraph = () => {
        if (!paragraphLines.length) return;
        const text = paragraphLines.join(" ").trim();
        if (text) {
            nodes.push(<p key={`p-${nodes.length}`}>{renderInline(text, `p-${nodes.length}`)}</p>);
        }
        paragraphLines = [];
    };

    const flushList = () => {
        if (!listItems.length) return;
        nodes.push(
            <ul key={`ul-${nodes.length}`}>
                {listItems.map((item, index) => (
                    <li key={`li-${index}`}>{renderInline(item, `li-${index}`)}</li>
                ))}
            </ul>,
        );
        listItems = [];
    };

    const flushQuote = () => {
        if (!quoteLines.length) return;
        nodes.push(
            <blockquote key={`quote-${nodes.length}`}>
                {quoteLines.map((line, index) => (
                    <p key={`quote-line-${index}`}>{renderInline(line, `quote-${index}`)}</p>
                ))}
            </blockquote>,
        );
        quoteLines = [];
    };

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) {
            flushParagraph();
            flushList();
            flushQuote();
            continue;
        }
        if (trimmed === "---") {
            flushParagraph();
            flushList();
            flushQuote();
            nodes.push(<hr key={`hr-${nodes.length}`} />);
            continue;
        }
        if (trimmed.startsWith("### ")) {
            flushParagraph();
            flushList();
            flushQuote();
            nodes.push(<h3 key={`h3-${nodes.length}`}>{renderInline(trimmed.slice(4), `h3-${nodes.length}`)}</h3>);
            continue;
        }
        if (trimmed.startsWith("## ")) {
            flushParagraph();
            flushList();
            flushQuote();
            nodes.push(<h2 key={`h2-${nodes.length}`}>{renderInline(trimmed.slice(3), `h2-${nodes.length}`)}</h2>);
            continue;
        }
        if (trimmed.startsWith("- ")) {
            flushParagraph();
            flushQuote();
            listItems.push(trimmed.slice(2));
            continue;
        }
        if (trimmed.startsWith("> ")) {
            flushParagraph();
            flushList();
            quoteLines.push(trimmed.slice(2));
            continue;
        }
        paragraphLines.push(trimmed);
    }

    flushParagraph();
    flushList();
    flushQuote();

    return <>{nodes}</>;
}