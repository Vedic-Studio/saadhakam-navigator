import { getArticleBySlug } from "@/data/articles";
import { ArticleLayout } from "@/components/ArticleLayout";
import { getPilotArticleContent } from "@/content/articles/pilotArticles";
import { ArticleBlocks } from "@/lib/articleContent";
import { buildArticleMetadata } from "@/lib/seo";

const meta = getArticleBySlug("daily-spiritual-routine-beginners")!;
const content = getPilotArticleContent("daily-spiritual-routine-beginners")!;

export const metadata = buildArticleMetadata(meta);

export default function DailySpiritualRoutinePage() {
    return (
        <ArticleLayout meta={meta} pillarLabel={content.pillarLabel} pillarHref={content.pillarHref}>
            <ArticleBlocks blocks={content.blocks} />
        </ArticleLayout>
    );
}