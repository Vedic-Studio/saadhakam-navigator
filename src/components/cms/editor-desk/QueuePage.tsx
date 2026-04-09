"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, RefreshCw } from "lucide-react";
import { BackendUnavailableError } from "@/lib/pipelines/api";
import type { ContentAuditBucket, ContentAuditData, EditorialQueueItem, EditorialQueuePriority } from "@/lib/analytics/types";
import { getEditorialAuditQueue, getPipelineQueue, getQueue } from "./api";
import { ArticleCard } from "./ArticleCard";
import type { CmsArticle } from "./types";
import type { PipelineListItem } from "@/lib/pipelines/types";
import { timeAgo } from "./utils";

function priorityLabel(priority: EditorialQueuePriority) {
    switch (priority) {
        case "p1":
            return "P1 · this week";
        case "p2":
            return "P2 · next sprint";
        case "p3":
            return "P3 · backlog";
        case "hold":
            return "Hold";
    }
}

function priorityTone(priority: EditorialQueuePriority) {
    switch (priority) {
        case "p1":
            return "border-rose-500/30 bg-rose-500/10 text-rose-100";
        case "p2":
            return "border-amber-500/30 bg-amber-500/10 text-amber-100";
        case "p3":
            return "border-sky-500/30 bg-sky-500/10 text-sky-100";
        case "hold":
            return "border-white/15 bg-white/5 text-white/70";
    }
}

function bucketLabel(bucket: ContentAuditBucket) {
    return bucket.replace(/-/g, " ");
}

function BucketQueueCard({
    title,
    description,
    items,
}: {
    title: string;
    description: string;
    items: EditorialQueueItem[];
}) {
    return (
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                    <h3 className="text-sm font-semibold text-white">{title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-white/60">{description}</p>
                </div>
                <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-white/70">{items.length}</span>
            </div>

            {items.length === 0 ? (
                <div className="rounded-lg border border-dashed border-white/10 p-4 text-xs text-white/50">No items in this lane right now.</div>
            ) : (
                <div className="space-y-3">
                    {items.map((item) => (
                        <div key={`${item.priority}-${item.route}`} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className={`rounded-full border px-2 py-1 text-[11px] font-medium ${priorityTone(item.priority)}`}>
                                    {priorityLabel(item.priority)}
                                </span>
                                <span className="rounded-full border border-white/10 px-2 py-1 text-[11px] uppercase tracking-wide text-white/60">
                                    {item.owner}
                                </span>
                                <span className="rounded-full border border-white/10 px-2 py-1 text-[11px] text-white/60">
                                    {bucketLabel(item.decisionBucket)}
                                </span>
                            </div>

                            <h4 className="mt-3 text-sm font-semibold text-white">{item.title}</h4>
                            <p className="mt-1 text-xs text-white/50">{item.route}</p>
                            <p className="mt-2 text-xs leading-relaxed text-white/70">{item.proposedFix}</p>

                            <div className="mt-3 grid gap-2 text-[11px] text-white/55 sm:grid-cols-3">
                                <div>ICP {item.icpScore.toFixed(1)}</div>
                                <div>
                                    {item.traffic.clicks} clicks · {item.traffic.sessions} sessions
                                </div>
                                <div>
                                    {item.qualification.qualifiedConversions} qualified · {item.attribution.confidenceTier} confidence
                                </div>
                            </div>

                            {item.aeoLlmFlags.length > 0 ? (
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {item.aeoLlmFlags.map((flag) => (
                                        <span key={flag} className="rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-2 py-1 text-[10px] text-fuchsia-100">
                                            {flag}
                                        </span>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export function QueuePage() {
    const router = useRouter();
    const [articles, setArticles] = useState<CmsArticle[]>([]);
    const [pipelines, setPipelines] = useState<PipelineListItem[]>([]);
    const [audit, setAudit] = useState<ContentAuditData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [pipelineError, setPipelineError] = useState<string | null>(null);
    const [auditError, setAuditError] = useState<string | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    async function loadQueue() {
        const [cmsResult, pipelineResult, auditResult] = await Promise.allSettled([getQueue(), getPipelineQueue(), getEditorialAuditQueue()]);

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

        if (auditResult.status === "fulfilled") {
            setAudit(auditResult.value);
            setAuditError(null);
        } else {
            setAudit(null);
            setAuditError(auditResult.reason instanceof Error ? auditResult.reason.message : "Editorial audit queue unavailable");
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

            <div className="mb-8 rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-base font-semibold text-white">Phase 3 editorial queue</h2>
                        <p className="mt-1 max-w-3xl text-sm text-white/60">
                            Weekly execution board derived from the strategic content audit. Use P1 for immediate work, P2 for next sprint commitment, P3 as true backlog, and Hold for contained pages.
                        </p>
                    </div>
                    {audit ? (
                        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">
                            Audit {audit.range.current.startDate} → {audit.range.current.endDate}
                        </span>
                    ) : null}
                </div>

                {auditError ? (
                    <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100">
                        <p className="font-medium text-amber-200">Editorial queue unavailable</p>
                        <p className="mt-1 text-amber-100/90">{auditError}</p>
                    </div>
                ) : audit ? (
                    <div className="space-y-6">
                        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                            {([
                                ["P1 now", "Immediate work that should start this week.", audit.editorialQueues.p1],
                                ["P2 next", "Strong candidates for the next sprint planning pass.", audit.editorialQueues.p2],
                                ["P3 backlog", "Real backlog items, not implied commitments.", audit.editorialQueues.p3],
                                ["Hold", "Contained pages to revisit only if strategy changes.", audit.editorialQueues.hold],
                            ] as const).map(([title, description, items]) => (
                                <div key={title} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <p className="text-sm font-semibold text-white">{title}</p>
                                            <p className="mt-1 text-xs text-white/60">{description}</p>
                                        </div>
                                        <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-white/70">{items.length}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="grid gap-6 xl:grid-cols-2">
                            <BucketQueueCard title="P1 now" description="Immediate editorial, conversion, and AEO repairs." items={audit.editorialQueues.p1} />
                            <BucketQueueCard title="P2 next" description="Next-sprint candidates once P1 staffing is clear." items={audit.editorialQueues.p2} />
                            <BucketQueueCard title="P3 backlog" description="Backlog candidates to revisit after current commitments." items={audit.editorialQueues.p3} />
                            <BucketQueueCard title="Hold" description="Contained pages kept visible without active staffing." items={audit.editorialQueues.hold} />
                        </div>

                        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                <h3 className="text-sm font-semibold text-white">Bucket routing</h3>
                                <p className="mt-1 text-xs leading-relaxed text-white/60">
                                    Default owner mapping from decision bucket to the function that owns the next move.
                                </p>
                                <div className="mt-4 space-y-3">
                                    {audit.editorialQueues.byBucket.map(({ bucket, items }) => (
                                        <div key={bucket} className="rounded-xl border border-white/10 bg-black/20 p-3">
                                            <div className="flex items-center justify-between gap-3">
                                                <div>
                                                    <p className="text-xs font-semibold uppercase tracking-wide text-white/80">{bucketLabel(bucket)}</p>
                                                    <p className="mt-1 text-xs text-white/55">
                                                        {items[0]?.owner ? `${items[0].owner} owner` : "No routed items"}
                                                    </p>
                                                </div>
                                                <span className="rounded-full border border-white/10 px-2 py-1 text-[11px] text-white/60">{items.length}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                    <h3 className="text-sm font-semibold text-white">Weekly ritual</h3>
                                    <ol className="mt-3 space-y-2 text-xs leading-relaxed text-white/65">
                                        <li>1. Review P1 as the execution board for this week.</li>
                                        <li>2. Promote or demote P2 before sprint planning.</li>
                                        <li>3. Sweep P3 and Hold only for status changes.</li>
                                        <li>4. Convert selected items into staffed assignments.</li>
                                    </ol>
                                </div>

                                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                    <h3 className="text-sm font-semibold text-white">Action plan snapshot</h3>
                                    <div className="mt-3 space-y-3 text-xs text-white/65">
                                        <div>
                                            <p className="font-medium text-white/80">Refresh now</p>
                                            <ul className="mt-1 space-y-1">
                                                {audit.actionPlan.refreshNow.slice(0, 3).map((item) => (
                                                    <li key={item}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <p className="font-medium text-white/80">Build next</p>
                                            <ul className="mt-1 space-y-1">
                                                {audit.actionPlan.buildNext.slice(0, 3).map((item) => (
                                                    <li key={item}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="rounded-lg border border-dashed border-white/10 p-6 text-sm text-white/60">Loading editorial queue…</div>
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