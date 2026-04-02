"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import type { ArticleMeta, ArticlePillar } from "@/data/articles";

const pillarConfig: Record<
    ArticlePillar,
    { label: string; color: string; description: string }
> = {
    "ancient-wisdom": {
        label: "Ancient Wisdom",
        color: "text-amber-400",
        description: "Vedanta, metaphysics, comparative philosophy, and foundational concepts.",
    },
    "practical-practices": {
        label: "Practical Practices",
        color: "text-emerald-400",
        description: "Meditation, japa, study, travel, and lived spiritual discipline.",
    },
    "sacred-texts": {
        label: "Sacred Texts",
        color: "text-orange-400",
        description: "Bhagavad Gita, Upanishads, mantras, and scriptural study guides.",
    },
    "spiritual-traditions": {
        label: "Spiritual Traditions",
        color: "text-violet-400",
        description: "Paths, lineages, deities, teachers, and major devotional currents.",
    },
};

const pillars = Object.keys(pillarConfig) as ArticlePillar[];

function formatPublishDate(date: string) {
    return new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(new Date(date));
}

export function ArticleGrid({ articles }: { articles: ArticleMeta[] }) {
    const [activePillar, setActivePillar] = useState<ArticlePillar | null>(null);

    const sorted = [...articles].sort(
        (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
    );

    const filtered = activePillar
        ? sorted.filter((a) => a.pillar === activePillar)
        : sorted;

    const activeConfig = activePillar ? pillarConfig[activePillar] : null;

    return (
        <section aria-labelledby="articles-directory-heading">
            <div className="rounded-3xl border border-border/50 bg-card/40 p-6 md:p-8 mb-10">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-3xl">
                        <h2 id="articles-directory-heading" className="font-display text-2xl md:text-3xl font-bold mb-3">
                            Browse the full article collection
                        </h2>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                            Filter by category to move from philosophical foundations to practical discipline,
                            scripture study, and the major traditions that shape Sanatan Dharma.
                        </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {articles.length} articles
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-6">
                    <button
                        onClick={() => setActivePillar(null)}
                        aria-pressed={activePillar === null}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activePillar === null
                                ? "bg-orange-500 text-white"
                                : "bg-muted/50 text-muted-foreground hover:bg-muted"
                            }`}
                    >
                        All Articles ({articles.length})
                    </button>
                    {pillars.map((pillar) => {
                        const config = pillarConfig[pillar];
                        const count = articles.filter((a) => a.pillar === pillar).length;
                        return (
                            <button
                                key={pillar}
                                onClick={() => setActivePillar(pillar)}
                                aria-pressed={activePillar === pillar}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activePillar === pillar
                                        ? "bg-orange-500 text-white"
                                        : "bg-muted/50 text-muted-foreground hover:bg-muted"
                                    }`}
                            >
                                {config.label} ({count})
                            </button>
                        );
                    })}
                </div>

                {activeConfig && (
                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-2xl">
                        <span className={`font-semibold ${activeConfig.color}`}>{activeConfig.label}:</span>{" "}
                        {activeConfig.description}
                    </p>
                )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((article) => {
                    const config = pillarConfig[article.pillar];
                    return (
                        <Link
                            key={article.slug}
                            href={article.route}
                            className="group block rounded-2xl border border-border/50 bg-card p-6 hover:border-orange-500/50 hover:bg-card/90 transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-3 flex-wrap">
                                <span
                                    className={`text-xs uppercase tracking-widest font-semibold ${config.color}`}
                                >
                                    {config.label}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    {article.readingTime} min read
                                </span>
                            </div>
                            <h2 className="text-lg font-display font-bold mb-2 group-hover:text-orange-400 transition-colors">
                                {article.title}
                            </h2>
                            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                                {article.metaDescription}
                            </p>
                            <div className="mt-4 flex items-center justify-between gap-4 text-xs text-muted-foreground">
                                <span className="inline-flex items-center gap-1.5">
                                    <CalendarDays className="h-3.5 w-3.5" />
                                    {formatPublishDate(article.publishDate)}
                                </span>
                                <span className="text-orange-400 font-medium">Read article</span>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {filtered.length === 0 && (
                <div className="mt-8 rounded-2xl border border-border/50 bg-card/50 p-6 text-sm text-muted-foreground">
                    No articles matched this category.
                </div>
            )}
        </section>
    );
}
