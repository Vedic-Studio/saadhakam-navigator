/**
 * Shared SEO utilities for consistent metadata and JSON-LD generation
 * across Sadhaka page types (articles, tools, programmatic pages, hubs)
 */

import type { Metadata } from "next";

// ============================================================================
// Constants
// ============================================================================

// Hardcoded to www — env var inconsistency caused Google canonical confusion
export const SITE_URL = "https://www.opensadhaka.com";
export const SITE_NAME = "Sadhaka";
export const SITE_TWITTER = "@opensadhaka";
export const DEFAULT_LOCALE = "en_US";

// Stable @id anchors used across page-level schemas. Letting every page
// reference the same node id lets search engines and LLMs de-duplicate the
// publisher entity into a single graph node, instead of treating each page's
// inline Organization JSON as a separate brand. Google's AI Overview
// attribution work (May 2026) leans on these cross-references to attach
// articles to the right publisher.
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

// E-E-A-T signals referenced from both root layout and per-page schemas.
export const ORG_FOUNDING_DATE = "2025";
export const ORG_EDITORIAL_POLICY = `${SITE_URL}/about#editorial-standards`;
export const ORG_SAME_AS = [
    "https://twitter.com/opensadhaka",
    "https://instagram.com/opensadhaka",
    "https://youtube.com/@opensadhaka",
];
export const ORG_KNOWS_ABOUT = [
    "Sanatan Dharma",
    "Advaita Vedanta",
    "Dvaita Vedanta",
    "Vishishtadvaita Vedanta",
    "Kashmir Shaivism",
    "Shakta tradition",
    "Bhagavad Gita",
    "Upanishads",
    "Vedas",
    "Yoga Sutras",
    "Puranas",
    "Sanskrit philology",
    "Vedic philosophy",
    "Meditation techniques",
];

// ============================================================================
// URL Helpers
// ============================================================================

/**
 * Build a fully-qualified URL for a path on the site
 */
export function buildUrl(path: string): string {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${SITE_URL}${normalizedPath}`;
}

/**
 * Build a canonical URL from a route path
 */
export function buildCanonicalUrl(route: string): string {
    return buildUrl(route);
}

/**
 * Resolve the canonical path for a Sanskrit lexicon entry.
 *
 * Always self-canonical: `/learn/sanskrit/<slug>`.
 *
 * Prior behavior (pre Ahrefs audit 13 Apr 2026) pointed the canonical at
 * `/what-is-<slug>` whenever a matching concept page existed — intended as
 * ranking-signal consolidation, but flagged 68 previously-indexable lexicon
 * pages as "non-indexable" and both pages remained live at 200 (no 301),
 * so no equity actually transferred. Lexicon and concept pages serve
 * overlapping but distinct intents (etymology/scripture vs. philosophy),
 * so each stands on its own URL. If consolidation is desired later, pair
 * it with a permanent redirect, not just a canonical rewrite.
 *
 * The `hasMatchingConcept` argument is retained for call-site compatibility
 * and to allow pages to still render a "Read Concept Guide" CTA.
 */
export function resolveLexiconCanonicalPath(
    slug: string,
    _hasMatchingConcept: boolean = false,
): string {
    return `/learn/sanskrit/${slug}`;
}

// ============================================================================
// Metadata Builders
// ============================================================================

export interface BasePageMeta {
    title: string;
    description: string;
    path: string;
    publishedTime?: string;
    modifiedTime?: string;
    images?: string[];
}

/**
 * Build consistent Next.js Metadata for a page
 */
export function buildPageMetadata(meta: BasePageMeta): Metadata {
    const canonicalUrl = buildCanonicalUrl(meta.path);
    const ogImages = meta.images?.map((img) => ({ url: img }));

    return {
        title: meta.title,
        description: meta.description,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: meta.title,
            description: meta.description,
            url: canonicalUrl,
            siteName: SITE_NAME,
            locale: DEFAULT_LOCALE,
            type: meta.publishedTime ? "article" : "website",
            publishedTime: meta.publishedTime,
            modifiedTime: meta.modifiedTime,
            images: ogImages,
        },
        twitter: {
            card: "summary_large_image",
            title: meta.title,
            description: meta.description,
            images: meta.images,
        },
    };
}

// ============================================================================
// JSON-LD Schema Builders
// ============================================================================

export interface FaqItem {
    question: string;
    answer: string;
}

/**
 * Build FAQPage JSON-LD schema
 */
export function buildFaqSchema(faqs: FaqItem[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };
}

export interface BreadcrumbItem {
    label: string;
    href: string;
}

/**
 * Build BreadcrumbList JSON-LD schema
 */
export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.label,
            item: buildUrl(item.href),
        })),
    };
}

/**
 * Image object for an Article schema with optional attribution fields.
 *
 * Follows Google's Article structured data guide
 * (https://developers.google.com/search/docs/appearance/structured-data/article)
 * which now blends `caption`, `creditText`, `creator`, and `copyrightNotice`
 * into AI Overviews thumbnail attribution. Use this shape when you want the
 * full attribution surface; a plain URL string is still accepted for
 * back-compat with older call sites.
 */
export interface ArticleImageSchema {
    url: string;
    caption?: string;
    creditText?: string;
    creator?: string;
    copyrightNotice?: string;
    width?: number;
    height?: number;
}

/**
 * A `mentions` link in an Article schema. Lets AI engines build a knowledge
 * graph from article → entity (philosophical school, sacred text, teacher,
 * concept). Google's May 2026 AI Overviews update specifically uses these
 * relationships to surface deep guides under "Explore New Angles".
 *
 * - `name`: the entity name, e.g. "Advaita Vedanta", "Bhagavad Gita".
 * - `sameAs`: optional canonical external URL (Wikipedia, Wikidata, official
 *   site) so the engine can confirm entity identity across sources.
 * - `url`: optional internal page on this site that defines the entity.
 * - `type`: schema.org type for the entity; defaults to "Thing".
 */
export interface ArticleMentionSchema {
    name: string;
    sameAs?: string;
    url?: string;
    type?: string;
}

/**
 * The primary subject entity an Article is *about*. Unlike `mentions` (a flat
 * list of secondary entity references), `about` names the single thing the
 * page is principally describing. For a panchang tithi page that subject is
 * the lunar day itself, so we expose the tithi as a typed entity with its
 * presiding deity and lunar-position keywords. Google and AI engines use
 * `about` to anchor the page to a knowledge-graph node.
 *
 * - `name`: the entity name, e.g. "Shukla Ekadashi".
 * - `type`: schema.org type; defaults to "Thing".
 * - `description`: optional one-line gloss of the entity.
 * - `sameAs`: optional canonical external URL confirming entity identity.
 */
export interface ArticleAboutSchema {
    name: string;
    type?: string;
    description?: string;
    sameAs?: string;
}

export interface ArticleSchemaMeta {
    headline: string;
    description: string;
    url: string;
    datePublished: string;
    dateModified?: string;
    section?: string;
    keywords?: string[];
    author?: string;
    authorType?: "Person" | "Organization";
    image?: string | ArticleImageSchema;
    /** Word count signal — helps AI engines weight extractive depth. */
    wordCount?: number;
    /** Entity relationships — see {@link ArticleMentionSchema}. */
    mentions?: ArticleMentionSchema[];
    /** Primary subject entity, see {@link ArticleAboutSchema}. */
    about?: ArticleAboutSchema;
}

/**
 * Build Article JSON-LD schema
 */
export function buildArticleSchema(meta: ArticleSchemaMeta) {
    let imageNode: unknown;
    if (typeof meta.image === "string") {
        imageNode = meta.image;
    } else if (meta.image && typeof meta.image === "object") {
        const img = meta.image;
        const node: Record<string, unknown> = {
            "@type": "ImageObject",
            url: img.url,
        };
        if (img.caption !== undefined) node.caption = img.caption;
        if (img.creditText !== undefined) node.creditText = img.creditText;
        if (img.creator !== undefined) {
            node.creator = {
                "@type": "Organization",
                name: img.creator,
            };
        }
        if (img.copyrightNotice !== undefined) {
            node.copyrightNotice = img.copyrightNotice;
        }
        if (img.width !== undefined) node.width = img.width;
        if (img.height !== undefined) node.height = img.height;
        imageNode = node;
    }

    // For Organization-authored articles, point at the sitewide @id so
    // search engines collapse author + publisher into the same node. Named
    // Person authors keep their own inline node — they're a separate entity
    // from the publisher.
    const authorType = meta.authorType || "Organization";
    const authorNode =
        authorType === "Organization" && (!meta.author || meta.author === SITE_NAME)
            ? { "@type": "Organization", "@id": ORGANIZATION_ID, name: SITE_NAME }
            : { "@type": authorType, name: meta.author || SITE_NAME };

    const mentionsNode = meta.mentions?.length
        ? meta.mentions.map((m) => {
              const node: Record<string, unknown> = {
                  "@type": m.type || "Thing",
                  name: m.name,
              };
              if (m.url) node.url = m.url;
              if (m.sameAs) node.sameAs = m.sameAs;
              return node;
          })
        : undefined;

    let aboutNode: Record<string, unknown> | undefined;
    if (meta.about) {
        aboutNode = {
            "@type": meta.about.type || "Thing",
            name: meta.about.name,
        };
        if (meta.about.description) aboutNode.description = meta.about.description;
        if (meta.about.sameAs) aboutNode.sameAs = meta.about.sameAs;
    }

    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: meta.headline,
        description: meta.description,
        url: meta.url,
        mainEntityOfPage: meta.url,
        datePublished: meta.datePublished,
        dateModified: meta.dateModified || meta.datePublished,
        articleSection: meta.section,
        keywords: meta.keywords,
        inLanguage: "en",
        author: authorNode,
        publisher: {
            "@type": "Organization",
            "@id": ORGANIZATION_ID,
            name: SITE_NAME,
            url: SITE_URL,
        },
        isPartOf: { "@type": "WebSite", "@id": WEBSITE_ID },
        ...(meta.wordCount !== undefined ? { wordCount: meta.wordCount } : {}),
        ...(mentionsNode ? { mentions: mentionsNode } : {}),
        ...(aboutNode ? { about: aboutNode } : {}),
        ...(imageNode !== undefined ? { image: imageNode } : {}),
    };
}

export interface WebPageSchemaMeta {
    name: string;
    description: string;
    url: string;
    breadcrumbItems?: BreadcrumbItem[];
    image?: string;
}

/**
 * Build WebPage JSON-LD schema
 */
export function buildWebPageSchema(meta: WebPageSchemaMeta) {
    const schema: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: meta.name,
        description: meta.description,
        url: meta.url,
        isPartOf: {
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL,
        },
        inLanguage: "en",
    };

    if (meta.breadcrumbItems && meta.breadcrumbItems.length > 0) {
        schema.breadcrumb = buildBreadcrumbSchema(meta.breadcrumbItems);
    }

    if (meta.image) {
        schema.image = meta.image;
    }

    return schema;
}

export interface SoftwareApplicationSchemaMeta {
    name: string;
    description: string;
    url: string;
    applicationCategory?: string;
    operatingSystem?: string;
    offers?: {
        price: string;
        priceCurrency: string;
    };
}

/**
 * Build SoftwareApplication JSON-LD schema (for tools like Faith Finder)
 */
export function buildSoftwareApplicationSchema(meta: SoftwareApplicationSchemaMeta) {
    return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: meta.name,
        description: meta.description,
        url: meta.url,
        applicationCategory: meta.applicationCategory || "LifestyleApplication",
        operatingSystem: meta.operatingSystem || "Web",
        offers: meta.offers || {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
    };
}

export interface CollectionPageSchemaMeta {
    name: string;
    description: string;
    url: string;
    items: Array<{
        name: string;
        url: string;
        description?: string;
    }>;
}

/**
 * Build CollectionPage/ItemList JSON-LD schema for hub pages
 */
export function buildCollectionSchema(meta: CollectionPageSchemaMeta) {
    return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: meta.name,
        description: meta.description,
        url: meta.url,
        mainEntity: {
            "@type": "ItemList",
            itemListElement: meta.items.map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: item.name,
                url: item.url,
                description: item.description,
            })),
        },
    };
}

// ============================================================================
// Article-Specific Helpers
// ============================================================================

import type { ArticleMeta } from "@/features/articles";

/**
 * Build complete metadata for an article from ArticleMeta
 */
export function buildArticleMetadata(article: ArticleMeta): Metadata {
    const imageUrl = article.featuredImage
        ? buildUrl(article.featuredImage.src)
        : undefined;

    return buildPageMetadata({
        title: article.title,
        description: article.metaDescription,
        path: article.route,
        publishedTime: article.publishDate,
        images: imageUrl ? [imageUrl] : undefined,
    });
}

/**
 * Build all JSON-LD schemas for an article
 */
export function buildArticleSchemas(article: ArticleMeta, pillarLabel: string, pillarHref: string) {
    const pageUrl = buildUrl(article.route);

    let articleImage: ArticleImageSchema | undefined;
    if (article.featuredImage) {
        const img = article.featuredImage;
        articleImage = {
            url: buildUrl(img.src),
            // alt text doubles as caption for accessibility + AI Overview attribution
            caption: img.alt,
            creator: SITE_NAME,
            creditText: SITE_NAME,
            copyrightNotice: `© ${SITE_NAME}`,
            width: img.width,
            height: img.height,
        };
    }

    return {
        article: buildArticleSchema({
            headline: article.title,
            description: article.metaDescription,
            url: pageUrl,
            datePublished: article.publishDate,
            section: pillarLabel,
            keywords: [article.primaryKeyword],
            image: articleImage,
            wordCount: article.wordCount,
            // Internal mentions get resolved to fully-qualified URLs so the
            // schema works even when consumed off-site (RSS readers, AI
            // crawlers, schema validators).
            mentions: article.mentions?.map((m) => ({
                name: m.name,
                type: m.type,
                sameAs: m.sameAs,
                url: m.url ? buildUrl(m.url) : undefined,
            })),
        }),
        faq: buildFaqSchema(article.faqs),
        breadcrumb: buildBreadcrumbSchema([
            { label: "Home", href: "/" },
            { label: pillarLabel, href: pillarHref },
            { label: article.title, href: article.route },
        ]),
    };
}

// ============================================================================
// Comparison Page Helpers
// ============================================================================

export interface ComparisonMeta {
    slug: string;
    title: string;
    metaDescription: string;
    entityA: string;
    entityB: string;
    category: string;
    tldr?: string;
}

/**
 * Build metadata for comparison pages
 */
export function buildComparisonMetadata(comp: ComparisonMeta): Metadata {
    return buildPageMetadata({
        title: `${comp.title} | Sadhaka Comparisons`,
        description: comp.metaDescription,
        path: `/compare/${comp.slug}`,
    });
}

/**
 * One row of a head-to-head comparison: a single dimension and how each of the
 * two entities scores on it. Mirrors a visible `<table>` row (dimension |
 * entityA value | entityB value).
 */
export interface ComparisonTableRow {
    dimension: string;
    a: string;
    b: string;
}

export interface ComparisonTableSchemaMeta {
    title: string;
    url: string;
    entityA: string;
    entityB: string;
    rows: ComparisonTableRow[];
}

/**
 * Build an ItemList JSON-LD for a comparison table.
 *
 * schema.org has no rich-result "Table" type the way it has FAQPage, so a
 * head-to-head comparison is represented structurally as an `ItemList`. Each
 * row becomes a positioned `ListItem` whose `name` is the dimension and whose
 * `description` states both entities' values, so the relationship survives
 * even when the JSON-LD is consumed off-page (AI crawlers, validators). This
 * is paired with a real visible `<table>` in the template. The visible table
 * is what makes the page eligible for table featured-snippets; the ItemList
 * gives engines a clean, parseable mirror of it.
 *
 * Returns `null` when there are no rows, so callers can skip injecting an
 * empty list (an ItemList with zero items is meaningless and Google flags it).
 */
export function buildComparisonTableSchema(meta: ComparisonTableSchemaMeta) {
    if (!meta.rows || meta.rows.length === 0) return null;
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `${meta.entityA} vs ${meta.entityB}: comparison`,
        url: meta.url,
        numberOfItems: meta.rows.length,
        itemListElement: meta.rows.map((row, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: row.dimension,
            description: `${meta.entityA}: ${row.a} | ${meta.entityB}: ${row.b}`,
        })),
    };
}

/**
 * Build FAQ schema for comparison pages
 */
export function buildComparisonFaqSchema(comp: ComparisonMeta) {
    return buildFaqSchema([
        {
            question: `What is the main difference between ${comp.entityA} and ${comp.entityB}?`,
            answer: comp.tldr || `The comparison between ${comp.entityA} and ${comp.entityB} highlights key differences in their philosophical approach and practical application.`,
        },
        {
            question: `Which is better: ${comp.entityA} or ${comp.entityB}?`,
            answer: `Neither is objectively "better." Both ${comp.entityA} and ${comp.entityB} offer valid, time-tested paths. The right choice depends entirely on your personal psychological temperament, current life stage, and spiritual goals.`,
        },
        {
            question: `Are ${comp.entityA} and ${comp.entityB} from the same tradition?`,
            answer: `While they often interact within the broader context of Eastern philosophy, ${comp.entityA} and ${comp.entityB} represent distinct approaches or conceptual frameworks.`,
        },
    ]);
}

// ============================================================================
// Tool Page Helpers (Faith Finder, etc.)
// ============================================================================

export interface ToolMeta {
    name: string;
    description: string;
    path: string;
    category?: string;
}

/**
 * Build metadata for tool pages
 */
export function buildToolMetadata(tool: ToolMeta): Metadata {
    return buildPageMetadata({
        title: `${tool.name} | Sadhaka`,
        description: tool.description,
        path: tool.path,
    });
}

// ============================================================================
// Person & Place Schema Builders
// ============================================================================

export interface PersonSchemaMeta {
    name: string;
    jobTitle?: string;
    affiliation?: string;
    url?: string;
}

/**
 * Build Person JSON-LD schema
 */
export function buildPersonSchema(meta: PersonSchemaMeta) {
    const schema: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: meta.name,
    };

    if (meta.jobTitle) schema.jobTitle = meta.jobTitle;
    if (meta.affiliation) {
        schema.affiliation = {
            "@type": "Organization",
            name: meta.affiliation,
        };
    }
    if (meta.url) schema.url = meta.url;

    return schema;
}

export interface PlaceSchemaMeta {
    name: string;
    description?: string;
    latitude: number;
    longitude: number;
}

/**
 * Build Place JSON-LD schema with GeoCoordinates
 */
export function buildPlaceSchema(meta: PlaceSchemaMeta) {
    const schema: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "Place",
        name: meta.name,
        geo: {
            "@type": "GeoCoordinates",
            latitude: meta.latitude,
            longitude: meta.longitude,
        },
    };

    if (meta.description) schema.description = meta.description;

    return schema;
}

/**
 * Build schemas for tool pages
 */
export function buildToolSchemas(tool: ToolMeta) {
    const pageUrl = buildUrl(tool.path);

    return {
        softwareApplication: buildSoftwareApplicationSchema({
            name: tool.name,
            description: tool.description,
            url: pageUrl,
            applicationCategory: tool.category || "LifestyleApplication",
        }),
        webPage: buildWebPageSchema({
            name: tool.name,
            description: tool.description,
            url: pageUrl,
        }),
    };
}

// ============================================================================
// History Page Schema Builders
// ============================================================================

export const SPEAKABLE_SPEC = {
    speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["[data-speakable]"],
    },
};

export interface HistoricalPeriodSchemaMeta {
    name: string;
    description: string;
    url: string;
    startYear: number; // negative = BCE
    endYear: number;
}

export function buildHistoricalPeriodSchema(meta: HistoricalPeriodSchemaMeta) {
    const formatYear = (y: number) => y < 0 ? `${Math.abs(y)} BCE` : `${y} CE`;
    return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: meta.name,
        description: meta.description,
        url: meta.url,
        temporalCoverage: `${formatYear(meta.startYear)}/${formatYear(meta.endYear)}`,
        isPartOf: {
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL,
        },
        inLanguage: "en",
        ...SPEAKABLE_SPEC,
    };
}

export interface ScholarlyArticleSchemaMeta {
    headline: string;
    description: string;
    url: string;
    about: string;
    methodology?: string;
    citations?: string[];
}

export function buildScholarlyArticleSchema(meta: ScholarlyArticleSchemaMeta) {
    const schema: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "ScholarlyArticle",
        headline: meta.headline,
        description: meta.description,
        url: meta.url,
        mainEntityOfPage: meta.url,
        about: meta.about,
        inLanguage: "en",
        publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
        },
        ...SPEAKABLE_SPEC,
    };

    if (meta.citations && meta.citations.length > 0) {
        schema.citation = meta.citations;
    }

    return schema;
}

export interface ProfilePageSchemaMeta {
    name: string;
    jobTitle?: string;
    affiliation?: string;
    url: string;
    description: string;
}

export function buildProfilePageSchema(meta: ProfilePageSchemaMeta) {
    return {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        name: `${meta.name} — Researcher Profile`,
        description: meta.description,
        url: meta.url,
        mainEntity: buildPersonSchema({
            name: meta.name,
            jobTitle: meta.jobTitle,
            affiliation: meta.affiliation,
            url: meta.url,
        }),
        ...SPEAKABLE_SPEC,
    };
}

export interface ArchaeologicalSiteSchemaMeta {
    name: string;
    description: string;
    url: string;
    latitude: number;
    longitude: number;
    dateRange: string;
    keyFindings?: string[];
    /** ISO 3166-1 alpha-2 country code (e.g., "IN", "PK", "TR"). */
    addressCountry?: string;
    /** First-level admin region (state/province), e.g., "Gujarat". */
    addressRegion?: string;
    /** City/town/locality, e.g., "Dholka" or "Varanasi". */
    addressLocality?: string;
}

export function buildArchaeologicalSiteSchema(meta: ArchaeologicalSiteSchemaMeta) {
    // Validate coordinates — (0, 0) is Gulf of Guinea, almost certainly a
    // data-entry fallback rather than an actual site. Omit `geo` rather than
    // emit an invalid Place; Ahrefs flagged this on 13 Apr 2026 when
    // /sanatan-history/sites/gulf-of-cambay had no coordinates.
    const hasValidGeo =
        Number.isFinite(meta.latitude) &&
        Number.isFinite(meta.longitude) &&
        !(meta.latitude === 0 && meta.longitude === 0);

    const hasAddress = Boolean(
        meta.addressCountry || meta.addressRegion || meta.addressLocality,
    );

    const schema: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "Place",
        additionalType: "https://schema.org/ArchaeologicalSite",
        name: meta.name,
        description: meta.description,
        url: meta.url,
        temporalCoverage: meta.dateRange,
    };

    if (hasValidGeo) {
        schema.geo = {
            "@type": "GeoCoordinates",
            latitude: meta.latitude,
            longitude: meta.longitude,
        };
    }

    if (hasAddress) {
        schema.address = {
            "@type": "PostalAddress",
            ...(meta.addressLocality ? { addressLocality: meta.addressLocality } : {}),
            ...(meta.addressRegion ? { addressRegion: meta.addressRegion } : {}),
            ...(meta.addressCountry ? { addressCountry: meta.addressCountry } : {}),
        };
    }

    if (meta.keyFindings && meta.keyFindings.length > 0) {
        schema.keywords = meta.keyFindings;
    }

    // Note: `speakable` is intentionally omitted. Google Search Central
    // documents `speakable` support only for Article and WebPage types.
    // Emitting it on Place was the most likely root cause of the
    // "Schema.org validation error" on all 15 site pages (Ahrefs 13 Apr 2026).
    return schema;
}

// ============================================================================
// Organization Schema (E-E-A-T default)
// ============================================================================

export interface OrganizationSchemaOptions {
    /** Override the default organization @id. Leave undefined for the canonical site-wide org node. */
    id?: string;
    /** Attach additional sameAs URLs beyond the defaults. */
    extraSameAs?: string[];
}

/**
 * Build the canonical Organization JSON-LD schema for Sadhaka.
 *
 * Kept in one place so per-page schemas, the root layout, and the About page
 * all reference the same E-E-A-T signals (logo, sameAs, knowsAbout, founding
 * date, editorial policy).
 */
export function buildOrganizationSchema(opts: OrganizationSchemaOptions = {}) {
    const { id = ORGANIZATION_ID, extraSameAs = [] } = opts;
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": id,
        name: SITE_NAME,
        alternateName: "Sadhaka — opensadhaka.com",
        url: SITE_URL,
        logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/logo.png`,
            width: 600,
            height: 60,
        },
        description:
            "Sadhaka is an English-language reference platform for Sanatan Dharma — the philosophies, sacred texts, and living practices of the Indian spiritual inheritance. Editorial content covers Vedanta, Shaiva, Shakta, and Vaishnava traditions.",
        foundingDate: ORG_FOUNDING_DATE,
        knowsAbout: ORG_KNOWS_ABOUT,
        knowsLanguage: ["en", "sa"],
        sameAs: [...ORG_SAME_AS, ...extraSameAs],
        publishingPrinciples: ORG_EDITORIAL_POLICY,
    };
}

// ============================================================================
// AEO Answer Block Helper
// ============================================================================

/**
 * Render the CSS selector used by `SpeakableSpecification`.
 *
 * Apply the matching `data-speakable` attribute to any paragraph you want AI
 * voice assistants and search engines to treat as the canonical extractable
 * answer for the page. The selector is stable across the whole site.
 */
export const AEO_SPEAKABLE_ATTR = "data-speakable";

/**
 * Extract the first N words of a longer paragraph for an AEO opening block.
 * Used when a page has no dedicated aeoAnswer field but still needs a
 * short, quotable direct-answer paragraph up top.
 */
export function truncateToAeoAnswer(text: string, maxWords = 90): string {
    const words = text.trim().split(/\s+/);
    if (words.length <= maxWords) return text.trim();
    return words.slice(0, maxWords).join(" ") + "…";
}

export interface ItemListSchemaMeta {
    items: Array<{
        name: string;
        url?: string;
        description?: string;
    }>;
}

export function buildItemListSchema(meta: ItemListSchemaMeta) {
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: meta.items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            ...(item.url ? { url: item.url } : {}),
            ...(item.description ? { description: item.description } : {}),
        })),
    };
}