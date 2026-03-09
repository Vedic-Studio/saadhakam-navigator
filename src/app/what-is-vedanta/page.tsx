import { Metadata } from "next";
import { getArticleBySlug } from "@/data/articles";
import { ArticleLayout } from "@/components/ArticleLayout";
import { getPilotArticleContent } from "@/content/articles/pilotArticles";
import { ArticleBlocks } from "@/lib/articleContent";

const meta = getArticleBySlug("what-is-vedanta")!;
const content = getPilotArticleContent("what-is-vedanta")!;

export const metadata: Metadata = {
    title: `${meta.title} | Sadhaka`,
    description: meta.metaDescription,
    alternates: { canonical: `https://opensadhaka.com${meta.route}` },
    openGraph: { title: meta.title, description: meta.metaDescription },
};

export default function WhatIsVedantaPage() {
    return (
        <ArticleLayout meta={meta} pillarLabel={content.pillarLabel} pillarHref={content.pillarHref}>
            <ArticleBlocks blocks={content.blocks} />
        </ArticleLayout>
    );
}
