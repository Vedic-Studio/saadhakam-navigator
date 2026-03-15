import { describe, expect, it } from "vitest";
import {
    getArticlePageData,
    getPilotArticlePageData,
    groupArticlesByPillar,
    requireArticleMeta,
} from "./index";

describe("article loaders", () => {
    it("loads article page data with pillar metadata", () => {
        const page = getArticlePageData("bhagavad-gita-complete-guide");

        expect(page.meta.slug).toBe("bhagavad-gita-complete-guide");
        expect(page.pillar.label).toBe("Sacred Texts");
        expect(page.pillar.href).toBe("/sacred-texts-teachings");
    });

    it("loads pilot article content alongside article metadata", () => {
        const page = getPilotArticlePageData("how-to-start-japa");

        expect(page.meta.slug).toBe("how-to-start-japa");
        expect(page.content.blocks.length).toBeGreaterThan(0);
    });

    it("groups articles by pillar", () => {
        const grouped = groupArticlesByPillar();

        expect(grouped["sacred-texts"]?.length).toBeGreaterThan(0);
        expect(grouped["ancient-wisdom"]?.length).toBeGreaterThan(0);
    });

    it("throws for an unknown article slug", () => {
        expect(() => requireArticleMeta("definitely-missing")).toThrow(
            "Unknown article slug: definitely-missing",
        );
    });
});