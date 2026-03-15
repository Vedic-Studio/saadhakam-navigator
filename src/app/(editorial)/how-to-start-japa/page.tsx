import { getPilotArticlePageData } from "@/features/articles";
import { ArticleLayout } from "@/components/ArticleLayout";
import { ArticleBlocks } from "@/lib/articleContent";
import { buildArticleMetadata } from "@/lib/seo";

const { meta, content } = getPilotArticlePageData("how-to-start-japa");

export const metadata = buildArticleMetadata(meta);

export default function HowToStartJapaPage() {
    return (
        <ArticleLayout meta={meta} pillarLabel={content.pillarLabel} pillarHref={content.pillarHref}>
            <ArticleBlocks blocks={content.blocks} />
        </ArticleLayout>
    );
}