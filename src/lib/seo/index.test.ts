import { describe, expect, it } from "vitest";
import { requireArticleMeta } from "@/features/articles";
import { buildArticleMetadata, buildArticleSchemas, buildPageMetadata, buildUrl, buildPersonSchema, buildPlaceSchema } from "./index";

describe("seo helpers", () => {
    const article = requireArticleMeta("bhagavad-gita-complete-guide");

    it("builds a fully-qualified url", () => {
        expect(buildUrl(article.route)).toBe(`https://www.opensadhaka.com${article.route}`);
    });

    it("builds article metadata with canonical url", () => {
        const metadata = buildArticleMetadata(article);

        expect(metadata.alternates?.canonical).toBe(
            `https://www.opensadhaka.com${article.route}`,
        );
        expect(metadata.description).toBe(article.metaDescription);
    });

    it("builds consistent article schemas", () => {
        const schemas = buildArticleSchemas(article, "Sacred Texts", "/sacred-texts-teachings");

        expect(schemas.article.headline).toBe(article.title);
        expect(schemas.breadcrumb.itemListElement).toHaveLength(3);
        expect(schemas.faq.mainEntity).toHaveLength(article.faqs.length);
    });

    it("buildPageMetadata title does not append site name (layout template handles it)", () => {
        const meta = buildPageMetadata({
            title: "Test Page Title",
            description: "A test description",
            path: "/test",
        });

        expect(meta.title).toBe("Test Page Title");
        expect(meta.title).not.toContain("Sadhaka");
    });
});

describe("buildPersonSchema", () => {
    it("builds a valid Person schema with all fields", () => {
        const schema = buildPersonSchema({
            name: "Nilesh Oak",
            jobTitle: "Archaeoastronomer",
            affiliation: "Independent Researcher",
        });

        expect(schema["@type"]).toBe("Person");
        expect(schema.name).toBe("Nilesh Oak");
        expect(schema.jobTitle).toBe("Archaeoastronomer");
        expect(schema.affiliation).toEqual({ "@type": "Organization", name: "Independent Researcher" });
    });

    it("omits optional fields when not provided", () => {
        const schema = buildPersonSchema({ name: "Jane Doe" });

        expect(schema["@type"]).toBe("Person");
        expect(schema.name).toBe("Jane Doe");
        expect(schema).not.toHaveProperty("jobTitle");
        expect(schema).not.toHaveProperty("affiliation");
    });
});

describe("buildPlaceSchema", () => {
    it("builds a valid Place schema with coordinates", () => {
        const schema = buildPlaceSchema({
            name: "Rakhigarhi",
            description: "Largest known Indus Valley Civilization site",
            latitude: 29.2894,
            longitude: 76.1164,
        });

        expect(schema["@type"]).toBe("Place");
        expect(schema.name).toBe("Rakhigarhi");
        expect(schema.description).toBe("Largest known Indus Valley Civilization site");
        expect(schema.geo).toEqual({
            "@type": "GeoCoordinates",
            latitude: 29.2894,
            longitude: 76.1164,
        });
    });

    it("omits description when not provided", () => {
        const schema = buildPlaceSchema({
            name: "Lothal",
            latitude: 22.5248,
            longitude: 72.2497,
        });

        expect(schema["@type"]).toBe("Place");
        expect(schema).not.toHaveProperty("description");
    });
});