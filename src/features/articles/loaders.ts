import {
    articles,
    getArticleBySlug,
    getArticlesByPillar,
    type ArticleMeta,
    type ArticlePillar,
} from "@/data/articles";
import {
    getPilotArticleContent,
    type PilotArticleContent,
} from "@/content/articles/pilotArticles";
import { getPillarConfig, type ArticlePillarConfig } from "./pillars";

export interface ArticlePageData {
    meta: ArticleMeta;
    pillar: ArticlePillarConfig;
}

export interface PilotArticlePageData extends ArticlePageData {
    content: PilotArticleContent;
}

export function listArticles(): ArticleMeta[] {
    return articles;
}

export function requireArticleMeta(slug: string): ArticleMeta {
    const article = getArticleBySlug(slug);

    if (!article) {
        throw new Error(`Unknown article slug: ${slug}`);
    }

    return article;
}

export function getArticlePageData(slug: string): ArticlePageData {
    const meta = requireArticleMeta(slug);

    return {
        meta,
        pillar: getPillarConfig(meta.pillar),
    };
}

export function requirePilotArticleContent(slug: string): PilotArticleContent {
    const content = getPilotArticleContent(slug);

    if (!content) {
        throw new Error(`Unknown pilot article content slug: ${slug}`);
    }

    return content;
}

export function getPilotArticlePageData(slug: string): PilotArticlePageData {
    const articlePageData = getArticlePageData(slug);

    return {
        ...articlePageData,
        content: requirePilotArticleContent(slug),
    };
}

export function listArticlesByPillar(pillar: ArticlePillar): ArticleMeta[] {
    return getArticlesByPillar(pillar);
}

export function groupArticlesByPillar(): Partial<Record<ArticlePillar, ArticleMeta[]>> {
    return articles.reduce<Partial<Record<ArticlePillar, ArticleMeta[]>>>((acc, article) => {
        (acc[article.pillar] ??= []).push(article);
        return acc;
    }, {});
}