import { Metadata } from "next";
import { getArticleBySlug } from "@/data/articles";
import { ArticleLayout } from "@/components/ArticleLayout";
import { getPilotArticleContent } from "@/content/articles/pilotArticles";
import { ArticleBlocks } from "@/lib/articleContent";

const meta = getArticleBySlug("daily-spiritual-routine-beginners")!;
const content = getPilotArticleContent("daily-spiritual-routine-beginners")!;

export const metadata: Metadata = {
    title: `${meta.title} | Sadhaka`,
    description: meta.metaDescription,
    alternates: { canonical: `https://opensadhaka.com${meta.route}` },
    openGraph: {
        title: meta.title,
        description: meta.metaDescription,
        url: `https://opensadhaka.com${meta.route}`,
        type: "article",
        publishedTime: meta.publishDate,
    },
};

export default function DailySpiritualRoutinePage() {
    return (
        <ArticleLayout meta={meta} pillarLabel={content.pillarLabel} pillarHref={content.pillarHref}>
            <ArticleBlocks blocks={content.blocks} />
        </ArticleLayout>
    );
}
