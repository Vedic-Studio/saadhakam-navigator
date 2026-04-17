import { describe, expect, it } from "vitest";
import { requireArticleMeta } from "@/features/articles";
import {
    buildArticleMetadata,
    buildArticleSchemas,
    buildPageMetadata,
    buildUrl,
    buildPersonSchema,
    buildPlaceSchema,
    resolveLexiconCanonicalPath,
    SPEAKABLE_SPEC,
    SITE_NAME,
    SITE_URL,
    buildHistoricalPeriodSchema,
    buildScholarlyArticleSchema,
    buildProfilePageSchema,
    buildArchaeologicalSiteSchema,
    buildItemListSchema,
} from "./index";

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

    it("buildPageMetadata returns the title verbatim without a Sadhaka suffix", () => {
        // Root layout uses template "%s" (no suffix) post Ahrefs audit
        // (13 Apr 2026). Pages that want branding must include "| Sadhaka"
        // in their title string explicitly — doubling is now impossible.
        const meta = buildPageMetadata({
            title: "Test Page Title",
            description: "A test description",
            path: "/test",
        });

        expect(meta.title).toBe("Test Page Title");
        expect(meta.title).not.toContain("Sadhaka");
    });

    it("pages that include | Sadhaka in their title render it exactly once", () => {
        // Guards against the 13 Apr 2026 regression where template
        // "%s | Sadhaka" + page title "... | Sadhaka" produced
        // "... | Sadhaka | Sadhaka" on 378+ pages.
        const title = "Seva in Sanskrit: Etymology, Meaning & Scriptural Usage | Sadhaka";
        const meta = buildPageMetadata({
            title,
            description: "A test description",
            path: "/learn/sanskrit/seva",
        });
        const rendered = String(meta.title);
        expect(rendered).toBe(title);
        // Exactly one "| Sadhaka" token; never doubled.
        const occurrences = rendered.split("| Sadhaka").length - 1;
        expect(occurrences).toBe(1);
    });
});

describe("resolveLexiconCanonicalPath", () => {
    // Post Ahrefs-audit 13 Apr 2026: lexicon pages are always self-canonical.
    // Previously they pointed at /what-is-<slug> when a concept existed, which
    // made 68 pages non-indexable without any 301 redirect to actually
    // consolidate ranking signals. Keep these tests to prevent regression.

    it("is self-canonical whether or not a matching concept page exists", () => {
        expect(resolveLexiconCanonicalPath("mantra", true)).toBe(
            "/learn/sanskrit/mantra",
        );
        expect(resolveLexiconCanonicalPath("ashtanga", false)).toBe(
            "/learn/sanskrit/ashtanga",
        );
    });

    it("preserves multi-hyphen slugs", () => {
        expect(resolveLexiconCanonicalPath("kriya-yoga", true)).toBe(
            "/learn/sanskrit/kriya-yoga",
        );
        expect(resolveLexiconCanonicalPath("kriya-yoga", false)).toBe(
            "/learn/sanskrit/kriya-yoga",
        );
    });

    it("never rewrites the canonical away from the lexicon URL", () => {
        for (const slug of ["seva", "samadhi", "manas", "prasad", "atman"]) {
            expect(resolveLexiconCanonicalPath(slug, true)).toBe(
                `/learn/sanskrit/${slug}`,
            );
            expect(resolveLexiconCanonicalPath(slug, true)).not.toContain(
                "what-is-",
            );
        }
    });

    it("produces a fully-qualified canonical URL when passed through buildUrl", () => {
        expect(buildUrl(resolveLexiconCanonicalPath("prasad", true))).toBe(
            "https://www.opensadhaka.com/learn/sanskrit/prasad",
        );
        expect(buildUrl(resolveLexiconCanonicalPath("ashtanga", false))).toBe(
            "https://www.opensadhaka.com/learn/sanskrit/ashtanga",
        );
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

// ============================================================================
// History Page Schema Builders
// ============================================================================

describe("SPEAKABLE_SPEC", () => {
    it("has speakable key with @type SpeakableSpecification", () => {
        expect(SPEAKABLE_SPEC).toHaveProperty("speakable");
        expect(SPEAKABLE_SPEC.speakable["@type"]).toBe("SpeakableSpecification");
    });

    it("has cssSelector array containing [data-speakable]", () => {
        expect(SPEAKABLE_SPEC.speakable.cssSelector).toEqual(["[data-speakable]"]);
    });
});

describe("buildHistoricalPeriodSchema", () => {
    const baseMeta = {
        name: "Vedic Period",
        description: "The era of the Vedas",
        url: "https://www.opensadhaka.com/sanatan-history/eras/vedic-period",
        startYear: -5561,
        endYear: -322,
    };

    it("returns @type WebPage", () => {
        const schema = buildHistoricalPeriodSchema(baseMeta);
        expect(schema["@type"]).toBe("WebPage");
    });

    it("includes @context schema.org", () => {
        const schema = buildHistoricalPeriodSchema(baseMeta);
        expect(schema["@context"]).toBe("https://schema.org");
    });

    it("formats BCE temporal coverage from negative years", () => {
        const schema = buildHistoricalPeriodSchema(baseMeta);
        expect(schema.temporalCoverage).toBe("5561 BCE/322 BCE");
    });

    it("formats CE temporal coverage from positive years", () => {
        const schema = buildHistoricalPeriodSchema({
            ...baseMeta,
            startYear: 320,
            endYear: 550,
        });
        expect(schema.temporalCoverage).toBe("320 CE/550 CE");
    });

    it("formats mixed BCE/CE temporal coverage", () => {
        const schema = buildHistoricalPeriodSchema({
            ...baseMeta,
            startYear: -500,
            endYear: 200,
        });
        expect(schema.temporalCoverage).toBe("500 BCE/200 CE");
    });

    it("includes speakable specification", () => {
        const schema = buildHistoricalPeriodSchema(baseMeta);
        expect(schema.speakable).toBeDefined();
        expect(schema.speakable["@type"]).toBe("SpeakableSpecification");
    });

    it("includes isPartOf referencing the site", () => {
        const schema = buildHistoricalPeriodSchema(baseMeta);
        expect(schema.isPartOf).toEqual({
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL,
        });
    });

    it("sets name, description, url, and inLanguage", () => {
        const schema = buildHistoricalPeriodSchema(baseMeta);
        expect(schema.name).toBe(baseMeta.name);
        expect(schema.description).toBe(baseMeta.description);
        expect(schema.url).toBe(baseMeta.url);
        expect(schema.inLanguage).toBe("en");
    });
});

describe("buildScholarlyArticleSchema", () => {
    const baseMeta = {
        headline: "Astronomical Dating of the Mahabharata",
        description: "A scholarly analysis of astronomical references",
        url: "https://www.opensadhaka.com/sanatan-history/evidence/astronomical-dating",
        about: "Astronomical dating methods applied to ancient texts",
    };

    it("returns @type ScholarlyArticle", () => {
        const schema = buildScholarlyArticleSchema(baseMeta);
        expect(schema["@type"]).toBe("ScholarlyArticle");
    });

    it("includes about field", () => {
        const schema = buildScholarlyArticleSchema(baseMeta);
        expect(schema.about).toBe(baseMeta.about);
    });

    it("includes publisher with site name", () => {
        const schema = buildScholarlyArticleSchema(baseMeta);
        expect(schema.publisher).toEqual({
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
        });
    });

    it("includes speakable specification", () => {
        const schema = buildScholarlyArticleSchema(baseMeta);
        expect(schema.speakable).toBeDefined();
    });

    it("includes citations when provided and non-empty", () => {
        const schema = buildScholarlyArticleSchema({
            ...baseMeta,
            citations: ["Source A", "Source B"],
        });
        expect(schema.citation).toEqual(["Source A", "Source B"]);
    });

    it("omits citations when array is empty", () => {
        const schema = buildScholarlyArticleSchema({
            ...baseMeta,
            citations: [],
        });
        expect(schema).not.toHaveProperty("citation");
    });

    it("omits citations when not provided", () => {
        const schema = buildScholarlyArticleSchema(baseMeta);
        expect(schema).not.toHaveProperty("citation");
    });

    it("sets mainEntityOfPage to url", () => {
        const schema = buildScholarlyArticleSchema(baseMeta);
        expect(schema.mainEntityOfPage).toBe(baseMeta.url);
    });
});

describe("buildProfilePageSchema", () => {
    const baseMeta = {
        name: "B.B. Lal",
        description: "Profile of archaeologist B.B. Lal",
        url: "https://www.opensadhaka.com/sanatan-history/researchers/bb-lal",
        jobTitle: "Archaeologist",
        affiliation: "ASI",
    };

    it("returns @type ProfilePage", () => {
        const schema = buildProfilePageSchema(baseMeta);
        expect(schema["@type"]).toBe("ProfilePage");
    });

    it("appends Researcher Profile to name", () => {
        const schema = buildProfilePageSchema(baseMeta);
        expect(schema.name).toBe("B.B. Lal \u2014 Researcher Profile");
    });

    it("has mainEntity of type Person", () => {
        const schema = buildProfilePageSchema(baseMeta);
        expect(schema.mainEntity["@type"]).toBe("Person");
        expect(schema.mainEntity.name).toBe("B.B. Lal");
    });

    it("includes speakable specification", () => {
        const schema = buildProfilePageSchema(baseMeta);
        expect(schema.speakable).toBeDefined();
    });

    it("passes jobTitle and affiliation to the Person entity", () => {
        const schema = buildProfilePageSchema(baseMeta);
        expect(schema.mainEntity.jobTitle).toBe("Archaeologist");
        expect(schema.mainEntity.affiliation).toEqual({
            "@type": "Organization",
            name: "ASI",
        });
    });
});

describe("buildArchaeologicalSiteSchema", () => {
    const baseMeta = {
        name: "Rakhigarhi",
        description: "Largest Indus Valley Civilization site",
        url: "https://www.opensadhaka.com/sanatan-history/sites/rakhigarhi",
        latitude: 29.2894,
        longitude: 76.1131,
        dateRange: "3300 BCE/1300 BCE",
    };

    it("returns @type Place with additionalType ArchaeologicalSite", () => {
        const schema = buildArchaeologicalSiteSchema(baseMeta);
        expect(schema["@type"]).toBe("Place");
        expect(schema.additionalType).toBe("https://schema.org/ArchaeologicalSite");
    });

    it("includes geo coordinates for valid lat/lng", () => {
        const schema = buildArchaeologicalSiteSchema(baseMeta);
        expect(schema.geo).toEqual({
            "@type": "GeoCoordinates",
            latitude: 29.2894,
            longitude: 76.1131,
        });
    });

    it("includes keyFindings as keywords when provided and non-empty", () => {
        const schema = buildArchaeologicalSiteSchema({
            ...baseMeta,
            keyFindings: ["DNA evidence", "Pottery fragments"],
        });
        expect(schema.keywords).toEqual(["DNA evidence", "Pottery fragments"]);
    });

    it("omits keywords when keyFindings is empty", () => {
        const schema = buildArchaeologicalSiteSchema({
            ...baseMeta,
            keyFindings: [],
        });
        expect(schema).not.toHaveProperty("keywords");
    });

    it("omits keywords when keyFindings is not provided", () => {
        const schema = buildArchaeologicalSiteSchema(baseMeta);
        expect(schema).not.toHaveProperty("keywords");
    });

    it("does NOT emit speakable — invalid on Place per Google Search docs", () => {
        // Regression guard: post Ahrefs audit 13 Apr 2026. Google only
        // supports speakable on Article/WebPage; emitting it on Place
        // caused schema.org validation errors on all 15 site pages.
        const schema = buildArchaeologicalSiteSchema(baseMeta);
        expect(schema).not.toHaveProperty("speakable");
    });

    it("omits geo when coordinates are (0, 0) — Gulf of Guinea sentinel", () => {
        const schema = buildArchaeologicalSiteSchema({
            ...baseMeta,
            latitude: 0,
            longitude: 0,
        });
        expect(schema).not.toHaveProperty("geo");
    });

    it("omits geo when coordinates are NaN (missing in source data)", () => {
        const schema = buildArchaeologicalSiteSchema({
            ...baseMeta,
            latitude: Number.NaN,
            longitude: Number.NaN,
        });
        expect(schema).not.toHaveProperty("geo");
    });

    it("emits PostalAddress when any address field is provided", () => {
        const schema = buildArchaeologicalSiteSchema({
            ...baseMeta,
            addressCountry: "IN",
            addressRegion: "Haryana",
            addressLocality: "Rakhigarhi",
        });
        expect(schema.address).toEqual({
            "@type": "PostalAddress",
            addressLocality: "Rakhigarhi",
            addressRegion: "Haryana",
            addressCountry: "IN",
        });
    });

    it("omits address when no address field is provided", () => {
        const schema = buildArchaeologicalSiteSchema(baseMeta);
        expect(schema).not.toHaveProperty("address");
    });

    it("emits PostalAddress containing only provided fields (partial address)", () => {
        const schema = buildArchaeologicalSiteSchema({
            ...baseMeta,
            addressCountry: "PK",
        });
        expect(schema.address).toEqual({
            "@type": "PostalAddress",
            addressCountry: "PK",
        });
    });
});

describe("buildItemListSchema", () => {
    it("returns @type ItemList", () => {
        const schema = buildItemListSchema({ items: [{ name: "Item 1" }] });
        expect(schema["@type"]).toBe("ItemList");
    });

    it("positions are 1-indexed", () => {
        const schema = buildItemListSchema({
            items: [{ name: "A" }, { name: "B" }, { name: "C" }],
        });
        const positions = schema.itemListElement.map(
            (el: { position: number }) => el.position
        );
        expect(positions).toEqual([1, 2, 3]);
    });

    it("includes url when provided", () => {
        const schema = buildItemListSchema({
            items: [{ name: "A", url: "https://example.com/a" }],
        });
        expect(schema.itemListElement[0].url).toBe("https://example.com/a");
    });

    it("omits url when not provided", () => {
        const schema = buildItemListSchema({
            items: [{ name: "A" }],
        });
        expect(schema.itemListElement[0]).not.toHaveProperty("url");
    });

    it("includes description when provided", () => {
        const schema = buildItemListSchema({
            items: [{ name: "A", description: "Desc A" }],
        });
        expect(schema.itemListElement[0].description).toBe("Desc A");
    });

    it("omits description when not provided", () => {
        const schema = buildItemListSchema({
            items: [{ name: "A" }],
        });
        expect(schema.itemListElement[0]).not.toHaveProperty("description");
    });
});