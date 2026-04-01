"use client";

import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { getQueue } from "./api";
import { ArticleCard } from "./ArticleCard";
import type { CmsArticle } from "./types";

export function QueuePage() {
    const [articles, setArticles] = useState<CmsArticle[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getQueue().then(setArticles).catch((err) => setError(err.message));
    }, []);

    return (
        <div className="mx-auto max-w-5xl">
            <div className="mb-6 flex items-center gap-3">
                <FileText size={20} className="text-orange-300" />
                <h1 className="text-lg font-semibold text-white">Editorial CMS Queue</h1>
                <span className="text-sm text-white/60">
                    {articles.length} article{articles.length !== 1 ? "s" : ""}
                </span>
            </div>

            {error ? (
                <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">{error}</div>
            ) : articles.length === 0 ? (
                <div className="py-16 text-center text-sm text-white/60">No CMS articles available</div>
            ) : (
                <div className="overflow-hidden rounded-lg border border-white/10 bg-black/20">
                    {articles.map((article) => (
                        <ArticleCard key={article.slug} article={article} />
                    ))}
                </div>
            )}
        </div>
    );
}