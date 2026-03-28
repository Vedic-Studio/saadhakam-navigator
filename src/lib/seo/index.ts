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
    image?: string;
}

/**
 * Build Article JSON-LD schema
 */
export function buildArticleSchema(meta: ArticleSchemaMeta) {
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
        author: {
            "@type": meta.authorType || "Organization",
            name: meta.author || SITE_NAME,
        },
        publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
        },
        ...(meta.image ? { image: meta.image } : {}),
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

    const imageUrl = article.featuredImage ? buildUrl(article.featuredImage.src) : undefined;

    return {
        article: buildArticleSchema({
            headline: article.title,
            description: article.metaDescription,
            url: pageUrl,
            datePublished: article.publishDate,
            section: pillarLabel,
            keywords: [article.primaryKeyword],
            image: imageUrl,
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