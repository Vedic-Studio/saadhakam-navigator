import { describe, expect, it } from "vitest";
import { requireArticleMeta } from "@/features/articles";
import { buildArticleMetadata, buildArticleSchemas, buildUrl } from "./index";

describe("seo helpers", () => {
    const article = requireArticleMeta("bhagavad-gita-complete-guide");

    it("builds a fully-qualified url", () => {
        expect(buildUrl(article.route)).toBe(`https://opensadhaka.com${article.route}`);
    });

    it("builds article metadata with canonical url", () => {
        const metadata = buildArticleMetadata(article);

        expect(metadata.alternates?.canonical).toBe(
            `https://opensadhaka.com${article.route}`,
        );
        expect(metadata.description).toBe(article.metaDescription);
    });

    it("builds consistent article schemas", () => {
        const schemas = buildArticleSchemas(article, "Sacred Texts", "/sacred-texts-teachings");

        expect(schemas.article.headline).toBe(article.title);
        expect(schemas.breadcrumb.itemListElement).toHaveLength(3);
        expect(schemas.faq.mainEntity).toHaveLength(article.faqs.length);
    });
});