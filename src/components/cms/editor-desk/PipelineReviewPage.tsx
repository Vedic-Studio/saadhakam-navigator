"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronDown, RefreshCw } from "lucide-react";
import { PipelineProgressStepper } from "@/components/content-agent/PipelineProgressStepper";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "@/components/ui/sonner";
import { getContextPackDocs } from "@/lib/content-agent/doc-registry";
import { BackendUnavailableError, getTechniques } from "@/lib/pipelines/api";
import {
    canAdvancePipeline,
    canApprovePipeline,
    canReviewPipeline,
    canMaterializePipeline,
    canRejectPipeline,
    canRevisePipeline,
    getDefaultFeedbackStage,
    getPipelineStageView,
    isPipelineTerminal,
    parseEditorScore,
    type PipelineDetail,
    type TechniqueItem,
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
import { MarkdownViewer } from "./MarkdownViewer";
import { timeAgo } from "./utils";

const statusGuidance: Partial<Record<PipelineDetail["status"], string>> = {
    research_review: "Review the research brief for source quality, factual grounding, and coverage before advancing.",
    draft_review: "Review the draft for structure, clarity, and alignment with the requested angle before advancing.",
    edit_review: "Review the edited draft for accuracy, polish, and whether revision notes were fully addressed.",
    final_review: "Final review: approve if this is publication-ready, or send back with precise editorial guidance.",
    needs_review: "Final review: approve if this is publication-ready, or send back with precise editorial guidance.",
    approved: "Approved. You can now send this pipeline output to a CMS draft when ready.",
    queued: "Processing... page updates automatically.",
    researching: "Processing... page updates automatically.",
    writing: "Processing... page updates automatically.",
    editing: "Processing... page updates automatically.",
    polishing: "Processing... page updates automatically.",
};

export function PipelineReviewPage({ pipelineId }: { pipelineId: string }) {
    const router = useRouter();
    const [detail, setDetail] = useState<PipelineDetail | null>(null);
    const [techniques, setTechniques] = useState<TechniqueItem[]>([]);
    const [techniquesError, setTechniquesError] = useState<string | null>(null);
    const [isLoadingTechniques, setIsLoadingTechniques] = useState(false);
    const [isCompetitorPatternsOpen, setIsCompetitorPatternsOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [backendUnavailableMessage, setBackendUnavailableMessage] = useState<string | null>(null);
    const [notes, setNotes] = useState("");
    const [busy, setBusy] = useState<"approve" | "reject" | "advance" | "revise" | "feedback" | "materialize" | null>(null);
    const [materializedSlug, setMaterializedSlug] = useState<string | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

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

    useEffect(() => {
        let isMounted = true;

        async function loadTechniques() {
            setIsLoadingTechniques(true);
            try {
                const nextTechniques = await getTechniques();
                if (!isMounted) {
                    return;
                }

                setTechniques(nextTechniques);
                setTechniquesError(null);
            } catch (err) {
                if (!isMounted) {
                    return;
                }

                setTechniques([]);
                setTechniquesError(err instanceof Error ? err.message : "Failed to load competitor patterns");
            } finally {
                if (isMounted) {
                    setIsLoadingTechniques(false);
                }
            }
        }

        void loadTechniques();

        return () => {
            isMounted = false;
        };
    }, []);

    const isPollingActive = useMemo(() => {
        if (!detail) {
            return false;
        }

        return !canReviewPipeline(detail.status) && !isPipelineTerminal(detail.status);
    }, [detail]);

    useEffect(() => {
        if (!isPollingActive) {
            return;
        }

        const intervalId = window.setInterval(() => {
            void load();
        }, 3000);

        return () => window.clearInterval(intervalId);
    }, [isPollingActive, load]);

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
    const guidanceMessage = detail ? statusGuidance[detail.status] : null;

    const gateLabel = detail ? (detail.status === "needs_review" ? "final_review" : detail.status) : "—";

    async function handleRefresh() {
        setIsRefreshing(true);
        try {
            await load();
        } finally {
            setIsRefreshing(false);
        }
    }

    async function handleApprove() {
        setError(null);
        setBackendUnavailableMessage(null);
        setBusy("approve");
        try {
            await approvePipelineReview(pipelineId, notes || undefined);
            setNotes("");
            await load();
            toast.success("Pipeline approved successfully.");
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
            toast.success("Pipeline rejected and notes saved.");
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
            toast.success("Pipeline advanced to the next stage.");
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
            toast.success("Revision request sent successfully.");
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
            toast.success("Editorial feedback added.");
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
            toast.success("Pipeline sent to CMS draft.");
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
            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex items-center gap-3">
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
                <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                    {isPollingActive ? (
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
                            <span>Processing... page updates automatically.</span>
                        </div>
                    ) : null}
                    <button
                        type="button"
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-xs text-white/70 transition-colors hover:text-white disabled:opacity-60"
                    >
                        <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} />
                        Refresh
                    </button>
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
                    <PipelineProgressStepper status={detail.status} />

                    <div className="rounded-lg border border-white/10 bg-black/20 p-5">
                        <h2 className="text-base font-semibold text-white">Request metadata</h2>
                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                            <div className="space-y-3 rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                                <p><strong>Topic:</strong> {detail.topic}</p>
                                <p><strong>Page type:</strong> {detail.page_type}</p>
                                <p><strong>Description:</strong> {detail.description || "—"}</p>
                                <p><strong>Goal:</strong> {detail.goal || "—"}</p>
                                <p><strong>Audience:</strong> {detail.audience || "—"}</p>
                            </div>
                            <div className="space-y-3 rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                                <p><strong>Source notes:</strong> {detail.source_notes || "—"}</p>
                                <p><strong>Context module:</strong> {detail.context_module || "long_form"}</p>
                                <p><strong>Quality threshold:</strong> {detail.quality_threshold}</p>
                                <p><strong>Revision limit:</strong> {detail.revision_limit}</p>
                                <p><strong>Pipeline ID:</strong> {detail.id}</p>
                                <p><strong>Current gate:</strong> {gateLabel}</p>
                            </div>
                            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                                <p className="text-sm font-medium text-white">Key angles</p>
                                {detail.key_angles.length ? (
                                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/70">
                                        {detail.key_angles.map((angle) => (
                                            <li key={angle}>{angle}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="mt-2 text-sm text-white/50">—</p>
                                )}
                            </div>
                            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                                <p className="text-sm font-medium text-white">Reference links</p>
                                {detail.reference_links.length ? (
                                    <ul className="mt-2 space-y-1 text-sm text-orange-200">
                                        {detail.reference_links.map((link) => (
                                            <li key={link} className="truncate">
                                                <a href={link} target="_blank" rel="noreferrer" className="hover:underline">
                                                    {link}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="mt-2 text-sm text-white/50">—</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg border border-white/10 bg-black/20 p-5">
                        <h2 className="text-base font-semibold text-white">Research brief</h2>
                        <div className="mt-4 max-h-[360px] overflow-auto rounded-lg bg-black/20 p-4">
                            <MarkdownViewer content={stageView?.latestResearchBrief?.content || "Research brief not available yet."} />
                        </div>
                    </div>

                    <div className="rounded-lg border border-white/10 bg-black/20 p-5">
                        <h2 className="text-base font-semibold text-white">Current draft artifact</h2>
                        <div className="mt-4 max-h-[460px] overflow-auto rounded-lg bg-black/20 p-4">
                            <MarkdownViewer content={currentArtifact?.content || "Draft artifact not available yet."} />
                        </div>
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
                        {guidanceMessage ? (
                            <div className="mt-3 rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-sm text-blue-100">
                                {guidanceMessage}
                            </div>
                        ) : null}
                        <textarea
                            value={notes}
                            onChange={(event) => setNotes(event.target.value)}
                            rows={5}
                            placeholder="Add approval notes, rejection rationale, or revision feedback…"
                            className="mt-3 w-full resize-none rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-orange-400"
                        />
                        <div className="mt-3 grid gap-2">
                            {canAdvance ? (
                                <button
                                    type="button"
                                    disabled={busy !== null}
                                    onClick={handleAdvance}
                                    className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
                                >
                                    Advance
                                </button>
                            ) : null}
                            {canRevise ? (
                                <button
                                    type="button"
                                    disabled={busy !== null}
                                    onClick={handleRevise}
                                    className="rounded-lg bg-amber-600 px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
                                >
                                    Revise
                                </button>
                            ) : null}
                            {canApprove ? (
                                <button
                                    type="button"
                                    disabled={busy !== null}
                                    onClick={handleApprove}
                                    className="rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
                                >
                                    Approve
                                </button>
                            ) : null}
                            {canReject ? (
                                <button
                                    type="button"
                                    disabled={busy !== null}
                                    onClick={handleReject}
                                    className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
                                >
                                    Reject
                                </button>
                            ) : null}
                            <button
                                type="button"
                                disabled={busy !== null}
                                onClick={handleFeedback}
                                className="rounded-lg bg-amber-500 px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
                            >
                                Add feedback
                            </button>
                            {canMaterialize ? (
                                <button
                                    type="button"
                                    disabled={busy !== null}
                                    onClick={handleMaterialize}
                                    className="rounded-lg bg-orange-500 px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
                                >
                                    Send to CMS draft
                                </button>
                            ) : null}
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

                    <div className="rounded-lg border border-white/10 bg-black/20 p-4">
                        <Collapsible open={isCompetitorPatternsOpen} onOpenChange={setIsCompetitorPatternsOpen}>
                            <CollapsibleTrigger asChild>
                                <button
                                    type="button"
                                    className="flex w-full items-center justify-between gap-3 text-left"
                                >
                                    <div>
                                        <h2 className="text-sm font-semibold text-white">Competitor Patterns</h2>
                                        <p className="mt-1 text-xs text-white/60">
                                            Content patterns from top-ranking competitor pages that informed the research agent
                                        </p>
                                    </div>
                                    <ChevronDown
                                        className={`h-4 w-4 shrink-0 text-white/60 transition-transform ${isCompetitorPatternsOpen ? "rotate-180" : ""}`}
                                    />
                                </button>
                            </CollapsibleTrigger>

                            <CollapsibleContent className="mt-4 space-y-3">
                                {isLoadingTechniques ? (
                                    <p className="text-sm text-white/60">Loading competitor patterns…</p>
                                ) : techniquesError ? (
                                    <p className="text-sm text-red-200">{techniquesError}</p>
                                ) : techniques.length === 0 ? (
                                    <p className="text-sm text-white/60">No competitor patterns available yet.</p>
                                ) : (
                                    techniques.map((technique, index) => (
                                        <div key={`${technique.source}-${technique.type}-${index}`} className="rounded-lg border border-white/10 p-3 text-sm text-white/75">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="font-semibold text-white">{technique.source}</span>
                                                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] uppercase tracking-wide text-white/70">
                                                    {technique.type}
                                                </span>
                                            </div>
                                            <p className="mt-2 text-sm leading-6 text-white/75">{technique.text}</p>
                                        </div>
                                    ))
                                )}
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                </div>
            </div>
        </div>
    );
}