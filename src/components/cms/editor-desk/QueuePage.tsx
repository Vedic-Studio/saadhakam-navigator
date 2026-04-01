"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, RefreshCw } from "lucide-react";
import { createEditorialPipeline, getPipelineQueue, getQueue } from "./api";
import { ArticleCard } from "./ArticleCard";
import type { CmsArticle } from "./types";
import type { PipelineListItem } from "@/lib/pipelines/types";
import { timeAgo } from "./utils";

const PAGE_TYPES = [
    { value: "topic_hub", label: "Topic Hub" },
    { value: "combinatorial", label: "Practice for Goal" },
    { value: "sacred_text_chapter", label: "Sacred Text Chapter" },
    { value: "sacred_text_shloka", label: "Sacred Text Shloka" },
    { value: "sanskrit_lexicon", label: "Sanskrit Lexicon" },
] as const;

export function QueuePage() {
    const router = useRouter();
    const [articles, setArticles] = useState<CmsArticle[]>([]);
    const [pipelines, setPipelines] = useState<PipelineListItem[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [topic, setTopic] = useState("What is Vedanta");
    const [pageType, setPageType] = useState<(typeof PAGE_TYPES)[number]["value"]>("topic_hub");
    const [goal, setGoal] = useState("");
    const [audience, setAudience] = useState("spiritual seekers");
    const [isGenerating, setIsGenerating] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    async function loadQueue() {
        try {
            const [cmsArticles, pipelineRuns] = await Promise.all([getQueue(), getPipelineQueue()]);
            setArticles(cmsArticles);
            setPipelines(pipelineRuns);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load editorial queue");
        }
    }

    useEffect(() => {
        void loadQueue();
    }, []);

    async function handleRefresh() {
        setIsRefreshing(true);
        await loadQueue();
        setIsRefreshing(false);
    }

    async function handleGenerate(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setIsGenerating(true);

        try {
            const pipeline = await createEditorialPipeline({
                topic,
                pageType,
                goal: goal.trim() || undefined,
                audience: audience.trim() || undefined,
            });
            router.push(`/content-agent/editor-desk/pipelines/${pipeline.id}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create pipeline");
        } finally {
            setIsGenerating(false);
        }
    }

    return (
        <div className="mx-auto max-w-5xl">
            <div className="mb-6 flex items-center gap-3">
                <FileText size={20} className="text-orange-300" />
                <h1 className="text-lg font-semibold text-white">Editorial CMS Queue</h1>
                <span className="text-sm text-white/60">
                    {pipelines.length} pipeline run{pipelines.length !== 1 ? "s" : ""} · {articles.length} CMS article{articles.length !== 1 ? "s" : ""}
                </span>
            </div>

            <form onSubmit={handleGenerate} className="mb-8 rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="mb-4">
                    <h2 className="text-base font-semibold text-white">Idea / Topic Intake</h2>
                    <p className="mt-1 text-sm text-white/60">
                        Create a pipeline run first, then review and materialize approved output into CMS.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1.5 md:col-span-2">
                        <label className="text-sm font-medium text-white">Topic</label>
                        <input
                            className="w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none focus:ring-1 focus:ring-orange-400"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="e.g. What is Vedanta"
                            required
                            minLength={3}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-white">Page Type</label>
                        <select
                            className="w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none focus:ring-1 focus:ring-orange-400"
                            value={pageType}
                            onChange={(e) => setPageType(e.target.value as (typeof PAGE_TYPES)[number]["value"])}
                        >
                            {PAGE_TYPES.map((item) => (
                                <option key={item.value} value={item.value}>
                                    {item.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-white">Audience (optional)</label>
                        <input
                            className="w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none focus:ring-1 focus:ring-orange-400"
                            value={audience}
                            onChange={(e) => setAudience(e.target.value)}
                            placeholder="spiritual seekers"
                        />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                        <label className="text-sm font-medium text-white">Goal (optional)</label>
                        <input
                            className="w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none focus:ring-1 focus:ring-orange-400"
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            placeholder="e.g. anxiety, focus, clarity"
                        />
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <button
                        type="submit"
                        disabled={isGenerating}
                        className="inline-flex items-center justify-center rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isGenerating ? "Creating pipeline..." : "Create pipeline"}
                    </button>
                </div>
            </form>

            <div className="mb-8 rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                        <h2 className="text-base font-semibold text-white">Pipeline queue</h2>
                        <p className="mt-1 text-sm text-white/60">
                            Active generation runs and review-ready outputs before CMS materialization.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-xs text-white/70 hover:text-white disabled:opacity-60"
                    >
                        <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} />
                        Refresh
                    </button>
                </div>

                {pipelines.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-white/10 p-6 text-sm text-white/60">
                        No pipeline runs available.
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-lg border border-white/10">
                        {pipelines.map((pipeline) => (
                            <button
                                key={pipeline.id}
                                type="button"
                                onClick={() => router.push(`/content-agent/editor-desk/pipelines/${pipeline.id}`)}
                                className="flex w-full items-start justify-between gap-4 border-b border-white/10 px-4 py-4 text-left transition-colors hover:bg-white/5 last:border-b-0"
                            >
                                <div className="min-w-0">
                                    <h3 className="truncate text-sm font-semibold text-white">{pipeline.topic}</h3>
                                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-white/60">
                                        <span>{pipeline.page_type}</span>
                                        <span>•</span>
                                        <span>{pipeline.status}</span>
                                        <span>•</span>
                                        <span>{pipeline.revision_count} revisions</span>
                                        {typeof pipeline.final_score === "number" ? (
                                            <>
                                                <span>•</span>
                                                <span>score {pipeline.final_score.toFixed(2)}</span>
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="shrink-0 text-xs text-white/50">{timeAgo(pipeline.updated_at)}</div>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {error ? (
                <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">{error}</div>
            ) : articles.length === 0 ? (
                <div className="py-16 text-center text-sm text-white/60">No CMS articles available</div>
            ) : (
                <div>
                    <div className="mb-3">
                        <h2 className="text-base font-semibold text-white">CMS queue</h2>
                        <p className="mt-1 text-sm text-white/60">Materialized drafts and managed articles in the publishing workflow.</p>
                    </div>
                    <div className="overflow-hidden rounded-lg border border-white/10 bg-black/20">
                        {articles.map((article) => (
                            <ArticleCard key={article.slug} article={article} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}