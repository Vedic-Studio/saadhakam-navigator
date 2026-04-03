"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, RefreshCw } from "lucide-react";
import { BackendUnavailableError } from "@/lib/pipelines/api";
import { getPipelineQueue, getQueue } from "./api";
import { ArticleCard } from "./ArticleCard";
import type { CmsArticle } from "./types";
import type { PipelineListItem } from "@/lib/pipelines/types";
import { timeAgo } from "./utils";

export function QueuePage() {
    const router = useRouter();
    const [articles, setArticles] = useState<CmsArticle[]>([]);
    const [pipelines, setPipelines] = useState<PipelineListItem[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [pipelineError, setPipelineError] = useState<string | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    async function loadQueue() {
        const [cmsResult, pipelineResult] = await Promise.allSettled([getQueue(), getPipelineQueue()]);

        if (cmsResult.status === "fulfilled") {
            setArticles(cmsResult.value);
            setError(null);
        } else {
            setError(cmsResult.reason instanceof Error ? cmsResult.reason.message : "Failed to load editorial queue");
        }

        if (pipelineResult.status === "fulfilled") {
            setPipelines(pipelineResult.value);
            setPipelineError(null);
        } else {
            setPipelines([]);
            setPipelineError(
                pipelineResult.reason instanceof BackendUnavailableError
                    ? pipelineResult.reason.message
                    : pipelineResult.reason instanceof Error
                        ? pipelineResult.reason.message
                        : "Pipeline queue unavailable",
            );
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

    return (
        <div className="mx-auto max-w-5xl">
            <div className="mb-6 flex items-center gap-3">
                <FileText size={20} className="text-orange-300" />
                <h1 className="text-lg font-semibold text-white">Editorial CMS Queue</h1>
                <span className="text-sm text-white/60">
                    {pipelines.length} pipeline run{pipelines.length !== 1 ? "s" : ""} · {articles.length} CMS article{articles.length !== 1 ? "s" : ""}
                </span>
            </div>

            <div className="mb-8 rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-base font-semibold text-white">Start a new pipeline</h2>
                        <p className="mt-1 text-sm text-white/60">
                            Use the content agent workbench to create a new pipeline run, then return here for review and CMS materialization.
                        </p>
                    </div>
                    <Link
                        href="/content-agent"
                        className="inline-flex items-center justify-center rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-400"
                    >
                        New Pipeline
                    </Link>
                </div>
            </div>

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

                {pipelineError ? (
                    <div className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100">
                        <p className="font-medium text-amber-200">Pipeline unavailable</p>
                        <p className="mt-1 text-amber-100/90">{pipelineError}</p>
                    </div>
                ) : null}

                {pipelineError ? (
                    <div className="rounded-lg border border-dashed border-amber-500/30 bg-amber-500/5 p-6 text-sm text-amber-100/90">
                        Pipeline runs cannot be loaded right now. CMS articles remain available below.
                    </div>
                ) : pipelines.length === 0 ? (
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