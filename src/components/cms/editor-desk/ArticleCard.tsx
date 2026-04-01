import Link from "next/link";
import type { CmsArticle } from "./types";
import { StatusBadge } from "./StatusBadge";

export function ArticleCard({ article }: { article: CmsArticle }) {
    return (
        <Link
            href={`/content-agent/editor-desk/review/${article.slug}`}
            className="block border-b border-white/10 px-4 py-4 transition-colors hover:bg-white/5 last:border-b-0"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <h2 className="truncate text-sm font-semibold text-white">{article.headline}</h2>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-white/60">
                        <span>{article.batch}</span>
                        <span>•</span>
                        <span>{article.format}</span>
                        <span>•</span>
                        <span>{article.wordCount.toLocaleString()} words</span>
                        <span>•</span>
                        <span>{article.sourceKind}</span>
                    </div>
                </div>
                <StatusBadge stage={article.stage} />
            </div>
        </Link>
    );
}