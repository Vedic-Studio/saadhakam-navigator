import { describe, expect, it } from "vitest";
import { getArticleBySlug } from "@/data/articles";
import { buildPilotCmsMarkdown } from "./markdown";

describe("buildPilotCmsMarkdown", () => {
    it("converts pilot article blocks into tracked markdown", () => {
        const meta = getArticleBySlug("bhagavad-gita-complete-guide");
        expect(meta).toBeDefined();

        const markdown = buildPilotCmsMarkdown(meta!);
        expect(markdown).toContain("slug: bhagavad-gita-complete-guide");
        expect(markdown).toContain("## What the Gita is, and what it is not");
        expect(markdown).toContain("[Bhagavad Gita Chapter 1](/bhagavad-gita-chapter-1)");
    });
});