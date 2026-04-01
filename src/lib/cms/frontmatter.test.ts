import { describe, expect, it } from "vitest";
import { parseFrontmatter, stringifyFrontmatter } from "./frontmatter";

describe("cms frontmatter helpers", () => {
    it("round-trips simple frontmatter and body", () => {
        const markdown = stringifyFrontmatter(
            { slug: "what-is-vedanta", title: "What is Vedanta?" },
            "## Intro\n\nVedanta matters.",
        );

        expect(parseFrontmatter(markdown)).toEqual({
            frontmatter: {
                slug: "what-is-vedanta",
                title: "What is Vedanta?",
            },
            body: "\n## Intro\n\nVedanta matters.\n",
        });
    });
});