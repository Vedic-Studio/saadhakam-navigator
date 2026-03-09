import { getArticleBySlug } from "@/data/articles";
import { ArticleLayout } from "@/components/ArticleLayout";
import { getPilotArticleContent } from "@/content/articles/pilotArticles";
import { ArticleBlocks } from "@/lib/articleContent";
import { buildArticleMetadata } from "@/lib/seo";

const meta = getArticleBySlug("how-to-start-japa")!;
const content = getPilotArticleContent("how-to-start-japa")!;

export const metadata = buildArticleMetadata(meta);

export default function HowToStartJapaPage() {
    return (
        <ArticleLayout meta={meta} pillarLabel={content.pillarLabel} pillarHref={content.pillarHref}>
            <ArticleBlocks blocks={content.blocks} />
        </ArticleLayout>
    );
}