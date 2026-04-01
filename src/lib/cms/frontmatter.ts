import type { ParsedCmsMarkdown } from "./types";

export function parseFrontmatter(markdown: string): ParsedCmsMarkdown {
    if (!markdown.startsWith("---\n")) {
        return { frontmatter: {}, body: markdown };
    }

    const end = markdown.indexOf("\n---\n", 4);
    if (end === -1) {
        return { frontmatter: {}, body: markdown };
    }

    const rawFrontmatter = markdown.slice(4, end);
    const body = markdown.slice(end + 5);
    const frontmatter = rawFrontmatter
        .split("\n")
        .filter(Boolean)
        .reduce<Record<string, string>>((acc, line) => {
            const separator = line.indexOf(":");
            if (separator === -1) {
                return acc;
            }
            const key = line.slice(0, separator).trim();
            const value = line.slice(separator + 1).trim();
            acc[key] = value;
            return acc;
        }, {});

    return { frontmatter, body };
}

export function stringifyFrontmatter(frontmatter: Record<string, string>, body: string): string {
    const lines = Object.entries(frontmatter).map(([key, value]) => `${key}: ${value}`);
    return `---\n${lines.join("\n")}\n---\n\n${body.trim()}\n`;
}