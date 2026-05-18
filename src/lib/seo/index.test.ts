import { describe, expect, it } from "vitest";
import { requireArticleMeta } from "@/features/articles";
import {
    buildArticleMetadata,
    buildArticleSchema,
    buildArticleSchemas,
    buildPageMetadata,
    buildUrl,
    buildPersonSchema,
    buildPlaceSchema,
    resolveLexiconCanonicalPath,
    SPEAKABLE_SPEC,
    SITE_NAME,
    SITE_TWITTER,
    SITE_URL,
    DEFAULT_LOCALE,
    DEFAULT_OG_IMAGE_PATH,
    DEFAULT_OG_IMAGE_WIDTH,
    DEFAULT_OG_IMAGE_HEIGHT,
    DEFAULT_OG_IMAGE_ALT,
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

describe("buildArticleSchema image handling", () => {
    const baseMeta = {
        headline: "Test Article",
        description: "A test article",
        url: "https://www.opensadhaka.com/test",
        datePublished: "2026-01-01",
    };

    it("emits a string image as-is for back-compat", () => {
        const schema = buildArticleSchema({
            ...baseMeta,
            image: "https://www.opensadhaka.com/img.webp",
        });
        expect(schema.image).toBe("https://www.opensadhaka.com/img.webp");
    });

    it("emits an ImageObject when image is an object", () => {
        const schema = buildArticleSchema({
            ...baseMeta,
            image: {
                url: "https://www.opensadhaka.com/img.webp",
                caption: "A serene mountain view",
                creditText: "Sadhaka",
                creator: "Sadhaka",
                copyrightNotice: "© Sadhaka",
                width: 1200,
                height: 630,
            },
        });
        expect(schema.image).toEqual({
            "@type": "ImageObject",
            url: "https://www.opensadhaka.com/img.webp",
            caption: "A serene mountain view",
            creditText: "Sadhaka",
            creator: {
                "@type": "Organization",
                name: "Sadhaka",
            },
            copyrightNotice: "© Sadhaka",
            width: 1200,
            height: 630,
        });
    });

    it("omits undefined keys in the ImageObject", () => {
        const schema = buildArticleSchema({
            ...baseMeta,
            image: {
                url: "https://www.opensadhaka.com/img.webp",
                caption: "Only caption set",
            },
        });
        expect(schema.image).toEqual({
            "@type": "ImageObject",
            url: "https://www.opensadhaka.com/img.webp",
            caption: "Only caption set",
        });
        const img = schema.image as Record<string, unknown>;
        expect(img).not.toHaveProperty("creditText");
        expect(img).not.toHaveProperty("creator");
        expect(img).not.toHaveProperty("copyrightNotice");
        expect(img).not.toHaveProperty("width");
        expect(img).not.toHaveProperty("height");
    });

    it("omits image entirely when not provided", () => {
        const schema = buildArticleSchema(baseMeta);
        expect(schema).not.toHaveProperty("image");
    });

    it("buildArticleSchemas wraps featuredImage into an ImageObject", () => {
        const article = requireArticleMeta("bhagavad-gita-complete-guide");
        const schemas = buildArticleSchemas(
            article,
            "Sacred Texts",
            "/sacred-texts-teachings",
        );

        if (!article.featuredImage) {
            // If the article has no featured image, the schema must omit `image`.
            expect(schemas.article).not.toHaveProperty("image");
            return;
        }

        const img = schemas.article.image as Record<string, unknown>;
        expect(img["@type"]).toBe("ImageObject");
        expect(img.url).toBe(
            `https://www.opensadhaka.com${article.featuredImage.src}`,
        );
        expect(img.caption).toBe(article.featuredImage.alt);
        expect(img.creator).toEqual({
            "@type": "Organization",
            name: SITE_NAME,
        });
        expect(img.width).toBe(article.featuredImage.width);
        expect(img.height).toBe(article.featuredImage.height);
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

// ============================================================================
// P3 Ahrefs OG/Twitter completeness — added 19 May 2026
// Regression guards for the 766 "incomplete Open Graph" + 201 "og:url ≠ canonical"
// warnings flagged by Ahrefs on 18 May 2026.
// ============================================================================

describe("buildPageMetadata — OG block completeness (P3 Ahrefs guarantee)", () => {
    const base = {
        title: "Test Page Title",
        description: "A test description that is long enough to be valid SEO copy for the page.",
        path: "/test-page",
    };

    it("emits og:url equal to alternates.canonical (single source of truth)", () => {
        const meta = buildPageMetadata(base);
        // Both derive from `path`; if these drift, Ahrefs flags 201 pages
        // for og:url not matching canonical.
        expect(meta.openGraph?.url).toBe(meta.alternates?.canonical);
        expect(meta.openGraph?.url).toBe(
            "https://www.opensadhaka.com/test-page",
        );
    });

    it("emits og:url that always uses the canonical www host", () => {
        // Defensive: even if a caller drops the leading slash, the helper
        // composes the canonical URL via buildUrl so the host is stable.
        const meta = buildPageMetadata({ ...base, path: "test-page" });
        expect(meta.alternates?.canonical).toBe(
            "https://www.opensadhaka.com/test-page",
        );
        expect(meta.openGraph?.url).toBe(meta.alternates?.canonical);
    });

    it("emits the full required OG field set", () => {
        const meta = buildPageMetadata(base);
        const og = meta.openGraph as Record<string, unknown>;
        expect(og.title).toBe(base.title);
        expect(og.description).toBe(base.description);
        expect(og.url).toBe(meta.alternates?.canonical);
        expect(og.siteName).toBe(SITE_NAME);
        expect(og.locale).toBe(DEFAULT_LOCALE);
        expect(og.type).toBe("website");
        // og:image is always present (fallback when missing)
        expect(Array.isArray(og.images)).toBe(true);
    });

    it("falls back to the default brand OG image when none provided", () => {
        const meta = buildPageMetadata(base);
        const images = meta.openGraph?.images as Array<Record<string, unknown>>;
        expect(images).toHaveLength(1);
        expect(images[0].url).toBe(`${SITE_URL}${DEFAULT_OG_IMAGE_PATH}`);
        expect(images[0].width).toBe(DEFAULT_OG_IMAGE_WIDTH);
        expect(images[0].height).toBe(DEFAULT_OG_IMAGE_HEIGHT);
        expect(images[0].alt).toBe(DEFAULT_OG_IMAGE_ALT);
    });

    it("preserves a structured featuredImage and emits width/height/alt", () => {
        const meta = buildPageMetadata({
            ...base,
            featuredImage: {
                src: "/assets/articles/test/featured.webp",
                alt: "A bespoke alt text for the article",
                width: 1200,
                height: 630,
            },
        });
        const images = meta.openGraph?.images as Array<Record<string, unknown>>;
        expect(images).toHaveLength(1);
        expect(images[0].url).toBe(
            `${SITE_URL}/assets/articles/test/featured.webp`,
        );
        expect(images[0].alt).toBe("A bespoke alt text for the article");
        expect(images[0].width).toBe(1200);
        expect(images[0].height).toBe(630);
    });

    it("accepts back-compat plain-URL images via the `images` field", () => {
        const meta = buildPageMetadata({
            ...base,
            images: [`${SITE_URL}/assets/legacy.png`],
        });
        const images = meta.openGraph?.images as Array<Record<string, unknown>>;
        expect(images[0].url).toBe(`${SITE_URL}/assets/legacy.png`);
        // Still populates width/height/alt with defaults so the OG block isn't partial.
        expect(images[0].width).toBe(DEFAULT_OG_IMAGE_WIDTH);
        expect(images[0].height).toBe(DEFAULT_OG_IMAGE_HEIGHT);
        expect(images[0].alt).toBe(DEFAULT_OG_IMAGE_ALT);
    });

    it("sets og:type=article when publishedTime is provided", () => {
        const meta = buildPageMetadata({
            ...base,
            publishedTime: "2026-01-01",
        });
        expect(meta.openGraph?.type).toBe("article");
    });

    it("honours an explicit `type` override", () => {
        const meta = buildPageMetadata({ ...base, type: "article" });
        expect(meta.openGraph?.type).toBe("article");
    });

    it("honours an explicit `locale` override", () => {
        const meta = buildPageMetadata({ ...base, locale: "hi_IN" });
        expect(meta.openGraph?.locale).toBe("hi_IN");
    });

    it("emits divergent socialTitle/socialDescription for OG and Twitter", () => {
        const meta = buildPageMetadata({
            ...base,
            socialTitle: "Snappy social title",
            socialDescription: "Snappier social description.",
        });
        // <title> + <meta description> stay verbatim.
        expect(meta.title).toBe(base.title);
        expect(meta.description).toBe(base.description);
        // OG + Twitter use the overrides.
        expect(meta.openGraph?.title).toBe("Snappy social title");
        expect(meta.openGraph?.description).toBe("Snappier social description.");
        const twitter = meta.twitter as Record<string, unknown>;
        expect(twitter.title).toBe("Snappy social title");
        expect(twitter.description).toBe("Snappier social description.");
    });
});

describe("buildPageMetadata — Twitter block completeness (P3 Ahrefs guarantee)", () => {
    const base = {
        title: "Test Page Title",
        description: "A test description that is long enough to be valid SEO copy for the page.",
        path: "/test-page",
    };

    it("emits twitter:card=summary_large_image with image alt + site handle", () => {
        const meta = buildPageMetadata(base);
        const twitter = meta.twitter as Record<string, unknown>;
        expect(twitter.card).toBe("summary_large_image");
        expect(twitter.site).toBe(SITE_TWITTER);
        expect(twitter.creator).toBe(SITE_TWITTER);
        expect(twitter.title).toBe(base.title);
        expect(twitter.description).toBe(base.description);
        const images = twitter.images as Array<Record<string, unknown>>;
        expect(images).toHaveLength(1);
        expect(images[0].url).toBe(`${SITE_URL}${DEFAULT_OG_IMAGE_PATH}`);
        expect(images[0].alt).toBe(DEFAULT_OG_IMAGE_ALT);
    });

    it("passes the same image URL to OG and Twitter blocks (parity)", () => {
        const meta = buildPageMetadata({
            ...base,
            featuredImage: {
                src: "/assets/foo.webp",
                alt: "foo",
                width: 1200,
                height: 630,
            },
        });
        const ogImages = meta.openGraph?.images as Array<Record<string, unknown>>;
        const twImages = (meta.twitter as Record<string, unknown>).images as Array<Record<string, unknown>>;
        expect(ogImages[0].url).toBe(twImages[0].url);
        expect(ogImages[0].alt).toBe(twImages[0].alt);
    });
});

describe("buildArticleMetadata — feeds buildPageMetadata cleanly", () => {
    it("produces matching og:url and canonical for a real ArticleMeta", () => {
        const article = requireArticleMeta("bhagavad-gita-complete-guide");
        const meta = buildArticleMetadata(article);
        expect(meta.openGraph?.url).toBe(meta.alternates?.canonical);
        expect(meta.alternates?.canonical).toBe(
            `https://www.opensadhaka.com${article.route}`,
        );
    });

    it("emits og:type=article (publishDate is set for every article)", () => {
        const article = requireArticleMeta("bhagavad-gita-complete-guide");
        const meta = buildArticleMetadata(article);
        expect(meta.openGraph?.type).toBe("article");
    });

    it("passes through the featuredImage with full dimensions when present", () => {
        const article = requireArticleMeta("bhagavad-gita-complete-guide");
        const meta = buildArticleMetadata(article);
        const images = meta.openGraph?.images as Array<Record<string, unknown>>;
        if (article.featuredImage) {
            expect(images[0].url).toBe(
                `${SITE_URL}${article.featuredImage.src}`,
            );
            expect(images[0].alt).toBe(article.featuredImage.alt);
            expect(images[0].width).toBe(article.featuredImage.width);
            expect(images[0].height).toBe(article.featuredImage.height);
        } else {
            // Falls back to the brand OG default — no partial OG block.
            expect(images[0].url).toBe(`${SITE_URL}${DEFAULT_OG_IMAGE_PATH}`);
        }
    });

    it("emits og:image fallback when article has no featured image", () => {
        // Find an article with no featuredImage in the registry. If none
        // exist, the test is a tautology (every article had a fallback by
        // virtue of the helper), so we synthesize one.
        const synthetic = {
            slug: "synthetic-test",
            route: "/synthetic-test",
            title: "Synthetic Test",
            metaDescription:
                "A synthetic description for the helper fallback path test that is long enough to validate.",
            pillar: "ancient-wisdom" as const,
            publishDate: "2026-05-19",
            readingTime: 5,
            primaryKeyword: "synthetic",
            relatedLinks: [],
            faqs: [],
            featuredImage: undefined,
        };
        const meta = buildArticleMetadata(synthetic);
        const images = meta.openGraph?.images as Array<Record<string, unknown>>;
        expect(images[0].url).toBe(`${SITE_URL}${DEFAULT_OG_IMAGE_PATH}`);
        expect(images[0].alt).toBe(DEFAULT_OG_IMAGE_ALT);
    });
});