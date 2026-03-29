"use client";

import { useState } from "react";
import Link from "next/link";
import type { ArticleMeta, ArticlePillar } from "@/data/articles";

const pillarConfig: Record<
    ArticlePillar,
    { label: string; color: string }
> = {
    "ancient-wisdom": { label: "Ancient Wisdom", color: "text-amber-400" },
    "practical-practices": { label: "Practical Practices", color: "text-emerald-400" },
    "sacred-texts": { label: "Sacred Texts", color: "text-orange-400" },
    "spiritual-traditions": { label: "Spiritual Traditions", color: "text-violet-400" },
};

const pillars = Object.keys(pillarConfig) as ArticlePillar[];

export function ArticleGrid({ articles }: { articles: ArticleMeta[] }) {
    const [activePillar, setActivePillar] = useState<ArticlePillar | null>(null);

    const sorted = [...articles].sort(
        (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
    );

    const filtered = activePillar
        ? sorted.filter((a) => a.pillar === activePillar)
        : sorted;

    return (
        <>
            <div className="flex flex-wrap gap-2 mb-10">
                <button
                    onClick={() => setActivePillar(null)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        activePillar === null
                            ? "bg-orange-500 text-white"
                            : "bg-muted/50 text-muted-foreground hover:bg-muted"
                    }`}
                >
                    All ({articles.length})
                </button>
                {pillars.map((pillar) => {
                    const config = pillarConfig[pillar];
                    const count = articles.filter((a) => a.pillar === pillar).length;
                    return (
                        <button
                            key={pillar}
                            onClick={() => setActivePillar(pillar)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                                activePillar === pillar
                                    ? "bg-orange-500 text-white"
                                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                            }`}
                        >
                            {config.label} ({count})
                        </button>
                    );
                })}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((article) => {
                    const config = pillarConfig[article.pillar];
                    return (
                        <Link
                            key={article.slug}
                            href={article.route}
                            className="block rounded-2xl border border-border/50 bg-card p-6 hover:border-orange-500/50 transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <span
                                    className={`text-xs uppercase tracking-widest font-semibold ${config.color}`}
                                >
                                    {config.label}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    {article.readingTime} min read
                                </span>
                            </div>
                            <h2 className="text-lg font-display font-bold mb-2">
                                {article.title}
                            </h2>
                            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                                {article.metaDescription}
                            </p>
                        </Link>
                    );
                })}
            </div>
        </>
    );
}
