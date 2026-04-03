"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getContextPackDocs } from "@/lib/content-agent/doc-registry";
import { BackendUnavailableError } from "@/lib/pipelines/api";
import {
    canAdvancePipeline,
    canApprovePipeline,
    canMaterializePipeline,
    canRejectPipeline,
    canRevisePipeline,
    getDefaultFeedbackStage,
    getPipelineStageView,
    parseEditorScore,
    type PipelineDetail,
} from "@/lib/pipelines/types";
import {
    advancePipelineReview,
    approvePipelineReview,
    getPipelineReviewDetail,
    materializePipelineDraft,
    rejectPipelineReview,
    revisePipelineReview,
    submitPipelineFeedback,
} from "./api";
import { timeAgo } from "./utils";

export function PipelineReviewPage({ pipelineId }: { pipelineId: string }) {
    const router = useRouter();
    const [detail, setDetail] = useState<PipelineDetail | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [backendUnavailableMessage, setBackendUnavailableMessage] = useState<string | null>(null);
    const [notes, setNotes] = useState("");
    const [busy, setBusy] = useState<"approve" | "reject" | "advance" | "revise" | "feedback" | "materialize" | null>(null);
    const [materializedSlug, setMaterializedSlug] = useState<string | null>(null);

    const load = useCallback(async () => {
        try {
            const nextDetail = await getPipelineReviewDetail(pipelineId);
            setDetail(nextDetail);
            setError(null);
            setBackendUnavailableMessage(null);
        } catch (err) {
            if (err instanceof BackendUnavailableError) {
                setBackendUnavailableMessage(err.message);
                setError(null);
            } else {
                setError(err instanceof Error ? err.message : "Failed to load pipeline detail");
            }
        }
    }, [pipelineId]);

    useEffect(() => {
        void load();
    }, [load]);

    const stageView = useMemo(() => (detail ? getPipelineStageView(detail) : null), [detail]);
    const editorScore = useMemo(() => parseEditorScore(stageView?.latestEditorScore), [stageView]);
    const docs = useMemo(() => getContextPackDocs(detail?.context_module), [detail?.context_module]);
    const feedbackStage = useMemo(() => (detail ? getDefaultFeedbackStage(detail) : "final"), [detail]);
    const canApprove = detail ? canApprovePipeline(detail.status) : false;
    const canReject = detail ? canRejectPipeline(detail.status) : false;
    const canAdvance = detail ? canAdvancePipeline(detail.status) : false;
    const canRevise = detail ? canRevisePipeline(detail.status) : false;
    const canMaterialize = detail ? canMaterializePipeline(detail) : false;
    const currentArtifact = stageView?.latestPolishedDraft || stageView?.latestWriterDraft;
    const currentScore = parseEditorScore(stageView?.latestPolishScore || stageView?.latestEditorScore);

    const gateLabel = detail ? (detail.status === "needs_review" ? "final_review" : detail.status) : "—";

    async function handleApprove() {
        setError(null);
        setBackendUnavailableMessage(null);
        setBusy("approve");
        try {
            await approvePipelineReview(pipelineId, notes || undefined);
            setNotes("");
            await load();
        } catch (err) {
            if (err instanceof BackendUnavailableError) {
                setBackendUnavailableMessage(err.message);
            } else {
                setError(err instanceof Error ? err.message : "Pipeline approval failed");
            }
        } finally {
            setBusy(null);
        }
    }

    async function handleReject() {
        if (!notes.trim()) {
            setError("Rejection requires notes.");
            return;
        }
        setError(null);
        setBackendUnavailableMessage(null);
        setBusy("reject");
        try {
            await rejectPipelineReview(pipelineId, notes.trim());
            setNotes("");
            await load();
        } catch (err) {
            if (err instanceof BackendUnavailableError) {
                setBackendUnavailableMessage(err.message);
            } else {
                setError(err instanceof Error ? err.message : "Pipeline rejection failed");
            }
        } finally {
            setBusy(null);
        }
    }

    async function handleAdvance() {
        setError(null);
        setBackendUnavailableMessage(null);
        setBusy("advance");
        try {
            await advancePipelineReview(pipelineId, { notes: notes || undefined });
            setNotes("");
            await load();
        } catch (err) {
            if (err instanceof BackendUnavailableError) {
                setBackendUnavailableMessage(err.message);
            } else {
                setError(err instanceof Error ? err.message : "Pipeline advance failed");
            }
        } finally {
            setBusy(null);
        }
    }

    async function handleRevise() {
        if (!notes.trim()) {
            setError("Revision requires notes.");
            return;
        }
        setError(null);
        setBackendUnavailableMessage(null);
        setBusy("revise");
        try {
            await revisePipelineReview(pipelineId, { notes: notes.trim() });
            setNotes("");
            await load();
        } catch (err) {
            if (err instanceof BackendUnavailableError) {
                setBackendUnavailableMessage(err.message);
            } else {
                setError(err instanceof Error ? err.message : "Pipeline revision failed");
            }
        } finally {
            setBusy(null);
        }
    }

    async function handleFeedback() {
        setError(null);
        setBackendUnavailableMessage(null);
        setBusy("feedback");
        try {
            await submitPipelineFeedback(pipelineId, {
                stage: feedbackStage,
                action: "edit",
                notes: notes || undefined,
            });
            setNotes("");
            await load();
        } catch (err) {
            if (err instanceof BackendUnavailableError) {
                setBackendUnavailableMessage(err.message);
            } else {
                setError(err instanceof Error ? err.message : "Failed to add editorial feedback");
            }
        } finally {
            setBusy(null);
        }
    }

    async function handleMaterialize() {
        setError(null);
        setBackendUnavailableMessage(null);
        setBusy("materialize");
        try {
            const result = await materializePipelineDraft(pipelineId);
            setMaterializedSlug(result.slug);
            await load();
        } catch (err) {
            if (err instanceof BackendUnavailableError) {
                setBackendUnavailableMessage(err.message);
            } else {
                setError(err instanceof Error ? err.message : "Failed to materialize pipeline draft");
            }
        } finally {
            setBusy(null);
        }
    }

    if (backendUnavailableMessage && !detail) {
        return (
            <div className="mx-auto max-w-3xl rounded-lg border border-amber-500/30 bg-amber-500/10 p-5 text-sm text-amber-100">
                <div className="mb-3 flex items-center gap-3">
                    <Link
                        href="/content-agent/editor-desk"
                        className="inline-flex items-center gap-2 text-amber-200 transition-colors hover:text-amber-100"
                    >
                        <ArrowLeft size={16} />
                        Back to editor desk
                    </Link>
                </div>
                <p className="font-medium text-amber-200">Pipeline backend unavailable</p>
                <p className="mt-2">{backendUnavailableMessage}</p>
            </div>
        );
    }

    if (error && !detail) {
        return <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">{error}</div>;
    }

    if (!detail) {
        return <div className="py-16 text-center text-sm text-white/60">Loading pipeline workspace…</div>;
    }

    return (
        <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex items-center gap-3">
                <Link href="/content-agent/editor-desk" className="text-white/60 transition-colors hover:text-white">
                    <ArrowLeft size={18} />
                </Link>
                <div className="min-w-0 flex-1">
                    <h1 className="truncate text-lg font-semibold text-white">{detail.topic}</h1>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-white/60">
                        <span>{detail.page_type}</span>
                        <span>{detail.status}</span>
                        <span>{detail.revision_count} revisions</span>
                        {typeof detail.final_score === "number" ? <span>score {detail.final_score.toFixed(2)}</span> : null}
                        <span>{timeAgo(detail.updated_at)}</span>
                    </div>
                </div>
            </div>

            {backendUnavailableMessage ? (
                <div className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100">
                    <p className="font-medium text-amber-200">Pipeline backend unavailable</p>
                    <p className="mt-1 text-amber-100/90">{backendUnavailableMessage}</p>
                </div>
            ) : null}

            {error ? <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">{error}</div> : null}

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div className="space-y-6">
                    <div className="rounded-lg border border-white/10 bg-black/20 p-5">
                        <h2 className="text-base font-semibold text-white">Request metadata</h2>
                        <div className="mt-4 grid gap-3 text-sm text-white/80 md:grid-cols-2">
                            <p><strong>Topic:</strong> {detail.topic}</p>
                            <p><strong>Page type:</strong> {detail.page_type}</p>
                            <p><strong>Goal:</strong> {detail.goal || "—"}</p>
                            <p><strong>Audience:</strong> {detail.audience || "—"}</p>
                            <p><strong>Context module:</strong> {detail.context_module || "long_form"}</p>
                            <p><strong>Quality threshold:</strong> {detail.quality_threshold}</p>
                            <p><strong>Revision limit:</strong> {detail.revision_limit}</p>
                            <p><strong>Pipeline ID:</strong> {detail.id}</p>
                            <p><strong>Current gate:</strong> {gateLabel}</p>
                        </div>
                    </div>

                    <div className="rounded-lg border border-white/10 bg-black/20 p-5">
                        <h2 className="text-base font-semibold text-white">Research brief</h2>
                        <pre className="mt-4 max-h-[360px] overflow-auto whitespace-pre-wrap rounded-lg bg-black/20 p-4 text-sm text-white/80">
                            {stageView?.latestResearchBrief?.content || "Research brief not available yet."}
                        </pre>
                    </div>

                    <div className="rounded-lg border border-white/10 bg-black/20 p-5">
                        <h2 className="text-base font-semibold text-white">Current draft artifact</h2>
                        <pre className="mt-4 max-h-[460px] overflow-auto whitespace-pre-wrap rounded-lg bg-black/20 p-4 text-sm text-white/80">
                            {currentArtifact?.content || "Draft artifact not available yet."}
                        </pre>
                    </div>

                    <div className="rounded-lg border border-white/10 bg-black/20 p-5">
                        <h2 className="text-base font-semibold text-white">Editor scorecard</h2>
                        {currentScore ? (
                            <div className="mt-4 space-y-4">
                                <div className="flex flex-wrap gap-3 text-sm text-white">
                                    <span className="rounded-full bg-white/10 px-3 py-1">Total {currentScore.total_score?.toFixed(2) ?? "—"} / 10</span>
                                    <span className={`rounded-full px-3 py-1 ${currentScore.passed ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
                                        {currentScore.passed ? "Pass" : "Needs revision"}
                                    </span>
                                </div>
                                {stageView?.latestRevisionNotes ? (
                                    <div className="rounded-lg border border-white/10 p-3 text-sm text-white/70">
                                        <p className="font-medium text-white">Revision notes</p>
                                        <p className="mt-2 whitespace-pre-wrap">{stageView.latestRevisionNotes}</p>
                                    </div>
                                ) : null}
                            </div>
                        ) : (
                            <p className="mt-3 text-sm text-white/60">Editor score not available yet.</p>
                        )}
                    </div>

                    <div className="rounded-lg border border-white/10 bg-black/20 p-5">
                        <h2 className="text-base font-semibold text-white">Version/output history</h2>
                        <div className="mt-4 space-y-3">
                            {detail.outputs.map((output) => (
                                <div key={output.id} className="rounded-lg border border-white/10 p-4">
                                    <div className="flex flex-wrap items-center gap-2 text-xs text-white/60">
                                        <span className="rounded-full bg-white/10 px-2 py-1">v{output.version}</span>
                                        <span>{output.stage}</span>
                                        <span>{output.agent}</span>
                                        <span>{timeAgo(output.created_at)}</span>
                                    </div>
                                    <pre className="mt-3 max-h-48 overflow-auto whitespace-pre-wrap text-sm text-white/75">
                                        {output.content}
                                    </pre>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="rounded-lg border border-white/10 bg-black/20 p-4">
                        <h2 className="text-sm font-semibold text-white">Feedback + actions</h2>
                        <textarea
                            value={notes}
                            onChange={(event) => setNotes(event.target.value)}
                            rows={5}
                            placeholder="Add approval notes, rejection rationale, or revision feedback…"
                            className="mt-3 w-full resize-none rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-orange-400"
                        />
                        <div className="mt-3 grid gap-2">
                            <button
                                type="button"
                                disabled={busy !== null || !canAdvance}
                                onClick={handleAdvance}
                                className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
                            >
                                Advance stage
                            </button>
                            <button
                                type="button"
                                disabled={busy !== null || !canRevise}
                                onClick={handleRevise}
                                className="rounded-lg bg-amber-600 px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
                            >
                                Revise stage
                            </button>
                            <button
                                type="button"
                                disabled={busy !== null || !canApprove}
                                onClick={handleApprove}
                                className="rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
                            >
                                Approve pipeline
                            </button>
                            <button
                                type="button"
                                disabled={busy !== null || !canReject}
                                onClick={handleReject}
                                className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
                            >
                                Reject pipeline
                            </button>
                            <button
                                type="button"
                                disabled={busy !== null}
                                onClick={handleFeedback}
                                className="rounded-lg bg-amber-500 px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
                            >
                                Add feedback
                            </button>
                            <button
                                type="button"
                                disabled={busy !== null || !canMaterialize}
                                onClick={handleMaterialize}
                                className="rounded-lg bg-orange-500 px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
                            >
                                Send to CMS draft
                            </button>
                            <p className="text-xs text-white/50">
                                Use advance for forward guidance, revise for targeted reruns, and feedback for extra archival notes.
                            </p>
                            {materializedSlug ? (
                                <button
                                    type="button"
                                    onClick={() => router.push(`/content-agent/editor-desk/review/${materializedSlug}`)}
                                    className="rounded-lg border border-white/10 px-3 py-2 text-sm font-medium text-white"
                                >
                                    Open in CMS
                                </button>
                            ) : null}
                        </div>
                    </div>

                    <div className="rounded-lg border border-white/10 bg-black/20 p-4">
                        <h2 className="text-sm font-semibold text-white">Feedback log</h2>
                        <div className="mt-3 space-y-3">
                            {detail.feedback.length === 0 ? (
                                <p className="text-sm text-white/60">No human feedback recorded yet.</p>
                            ) : (
                                detail.feedback.map((entry) => (
                                    <div key={entry.id} className="rounded-lg border border-white/10 p-3 text-sm text-white/75">
                                        <div className="flex flex-wrap gap-2 text-xs text-white/50">
                                            <span className="font-medium capitalize text-white">{entry.action}</span>
                                            <span>{entry.stage}</span>
                                            <span>{timeAgo(entry.created_at)}</span>
                                        </div>
                                        {entry.notes ? <p className="mt-2 whitespace-pre-wrap">{entry.notes}</p> : null}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="rounded-lg border border-white/10 bg-black/20 p-4">
                        <h2 className="text-sm font-semibold text-white">Prompt pack / context pack</h2>
                        <div className="mt-3 space-y-3 text-sm text-white/75">
                            <p><strong className="text-white">Context module:</strong> {detail.context_module || "long_form"}</p>
                            <p><strong className="text-white">Required sections:</strong> research brief, writer draft, editor score, feedback log</p>
                            <p><strong className="text-white">Anti-patterns / voice bans:</strong> generic spirituality filler, unsupported therapeutic claims, vague SEO padding</p>
                            <p><strong className="text-white">Sensitive-topic disclaimer trigger:</strong> use editorial review if medical / trauma / mental health overlap appears in draft</p>
                        </div>
                        <div className="mt-4 space-y-2">
                            {docs.map((doc) => (
                                <div key={doc.id} className="rounded-lg border border-white/10 p-3 text-sm text-white/75">
                                    <p className="font-medium text-white">{doc.title}</p>
                                    <p className="mt-1">{doc.summary}</p>
                                    <p className="mt-1 text-xs text-white/50">{doc.path}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}