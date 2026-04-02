"use client";

import { useEffect, useMemo, useState } from "react";
import { getContextPackDocs } from "@/lib/content-agent/doc-registry";
import { BackendUnavailableError, createPipeline, getPipelineDetail, getTechniques } from "@/lib/pipelines/api";
import {
    getPipelineStageView,
    isPipelineTerminal,
    parseEditorScore,
    PIPELINE_PROGRESS_STEPS,
    type PipelineDetail,
    type PipelinePageType,
    type TechniqueItem,
} from "@/lib/pipelines/types";

const PAGE_TYPES: Array<{ value: PipelinePageType; label: string }> = [
    { value: "topic_hub", label: "Topic Hub" },
    { value: "combinatorial", label: "Practice for Goal" },
    { value: "sacred_text_chapter", label: "Sacred Text Chapter" },
    { value: "sacred_text_shloka", label: "Sacred Text Shloka" },
    { value: "sanskrit_lexicon", label: "Sanskrit Lexicon" },
];

export function GenerateWorkbench() {
    const [topic, setTopic] = useState("What is Vedanta");
    const [pageType, setPageType] = useState<PipelinePageType>("topic_hub");
    const [goal, setGoal] = useState("");
    const [audience, setAudience] = useState("spiritual seekers");

    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [backendUnavailableMessage, setBackendUnavailableMessage] = useState<string | null>(null);
    const [result, setResult] = useState<PipelineDetail | null>(null);
    const [activePipelineId, setActivePipelineId] = useState<string | null>(null);

    const [techniques, setTechniques] = useState<TechniqueItem[]>([]);
    const [techniquesError, setTechniquesError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchTechniques() {
            try {
                setTechniquesError(null);
                const data = await getTechniques();
                if (!cancelled) {
                    setTechniques(data ?? []);
                    setBackendUnavailableMessage(null);
                }
            } catch (err) {
                if (!cancelled) {
                    if (err instanceof BackendUnavailableError) {
                        setBackendUnavailableMessage(err.message);
                        setTechniques([]);
                        setTechniquesError(null);
                    } else {
                        setTechniquesError(err instanceof Error ? err.message : "Unable to load techniques");
                    }
                }
            }
        }

        void fetchTechniques();
        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        if (!activePipelineId) {
            return;
        }

        let cancelled = false;
        let timeoutId: ReturnType<typeof setTimeout> | null = null;

        const poll = async () => {
            try {
                const detail = await getPipelineDetail(activePipelineId);
                if (cancelled) return;
                setResult(detail);
                setBackendUnavailableMessage(null);
                if (!isPipelineTerminal(detail.status) && detail.status !== "needs_review") {
                    timeoutId = setTimeout(poll, 2000);
                } else {
                    setIsGenerating(false);
                }
            } catch (err) {
                if (!cancelled) {
                    if (err instanceof BackendUnavailableError) {
                        setBackendUnavailableMessage(err.message);
                        setError(null);
                    } else {
                        setError(err instanceof Error ? err.message : "Failed to load pipeline progress");
                    }
                    setIsGenerating(false);
                }
            }
        };

        void poll();

        return () => {
            cancelled = true;
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [activePipelineId]);

    const stageView = useMemo(() => (result ? getPipelineStageView(result) : null), [result]);
    const editorScore = useMemo(() => parseEditorScore(stageView?.latestEditorScore), [stageView]);
    const sortedDimensions = useMemo(() => {
        if (!editorScore?.dimensions) return [];
        return Object.entries(editorScore.dimensions).sort((a, b) => b[1].weight - a[1].weight);
    }, [editorScore]);
    const docs = useMemo(() => getContextPackDocs(result?.context_module), [result?.context_module]);

    async function handleGenerate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setBackendUnavailableMessage(null);
        setResult(null);
        setIsGenerating(true);

        try {
            const detail = await createPipeline({
                topic,
                pageType,
                goal: goal.trim() || undefined,
                audience: audience.trim() || undefined,
            });
            setResult(detail);
            setActivePipelineId(detail.id);
        } catch (err) {
            if (err instanceof BackendUnavailableError) {
                setBackendUnavailableMessage(err.message);
                setError(null);
            } else {
                setError(err instanceof Error ? err.message : "Failed to generate content");
            }
            setIsGenerating(false);
        }
    }

    return (
        <div className="grid gap-8 lg:grid-cols-[minmax(360px,420px)_minmax(0,1fr)]">
            <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <h2 className="text-lg font-medium">Generate</h2>
                <form className="mt-4 space-y-4" onSubmit={handleGenerate}>
                    {backendUnavailableMessage ? (
                        <div className="rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-700 dark:text-amber-200">
                            <p className="font-medium">Pipeline backend unavailable</p>
                            <p className="mt-1 opacity-90">{backendUnavailableMessage}</p>
                        </div>
                    ) : null}

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium">Topic</label>
                        <input
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-primary"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="e.g. What is Vedanta"
                            required
                            minLength={3}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium">Page Type</label>
                        <select
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-primary"
                            value={pageType}
                            onChange={(e) => setPageType(e.target.value as PipelinePageType)}
                        >
                            {PAGE_TYPES.map((item) => (
                                <option key={item.value} value={item.value}>
                                    {item.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium">Goal (optional)</label>
                        <input
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-primary"
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            placeholder="e.g. anxiety, focus, clarity"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium">Audience (optional)</label>
                        <input
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-primary"
                            value={audience}
                            onChange={(e) => setAudience(e.target.value)}
                            placeholder="spiritual seekers"
                        />
                    </div>

                    <button
                        type="submit"
                        className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={isGenerating || Boolean(backendUnavailableMessage)}
                    >
                        {isGenerating ? "Running pipeline..." : "Create Pipeline Run"}
                    </button>

                    {error ? <p className="text-sm text-red-500">{error}</p> : null}
                </form>

                {!backendUnavailableMessage ? (
                    <div className="mt-8">
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                            Knowledge Techniques
                        </h3>
                        {techniquesError ? (
                            <p className="mt-2 text-sm text-red-500">{techniquesError}</p>
                        ) : (
                            <ul className="mt-2 max-h-64 space-y-2 overflow-auto pr-1 text-sm">
                                {techniques.slice(0, 14).map((item, index) => (
                                    <li key={`${item.source}-${index}`} className="rounded-md border border-border p-2">
                                        <p className="font-medium">
                                            {item.source} <span className="text-muted-foreground">({item.type})</span>
                                        </p>
                                        <p className="mt-1 text-muted-foreground">{item.text}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ) : null}

                {result ? (
                    <div className="mt-8 rounded-lg border border-border bg-muted/30 p-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Prompt Pack / Context Pack</h3>
                        <div className="mt-3 space-y-2 text-sm">
                            <p><strong>Context module:</strong> {result.context_module || "long_form"}</p>
                            <p><strong>Quality threshold:</strong> {result.quality_threshold}</p>
                            <p><strong>Revision limit:</strong> {result.revision_limit}</p>
                            <p><strong>Selected techniques:</strong> {techniques.slice(0, 3).map((item) => item.source).join(", ") || "Not available"}</p>
                        </div>
                        <div className="mt-4 space-y-2 text-sm">
                            {docs.map((doc) => (
                                <div key={doc.id} className="rounded-md border border-border p-3">
                                    <p className="font-medium">{doc.title}</p>
                                    <p className="text-muted-foreground">{doc.summary}</p>
                                    <p className="mt-1 text-xs text-muted-foreground">{doc.path}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}
            </section>

            <section className="space-y-4">
                <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                    <h2 className="text-lg font-medium">Pipeline Timeline</h2>
                    {!result ? (
                        <p className="mt-3 text-sm text-muted-foreground">
                            Start a pipeline to monitor the async editorial lifecycle.
                        </p>
                    ) : (
                        <>
                            <div className="mt-4 grid gap-3 md:grid-cols-5">
                                {PIPELINE_PROGRESS_STEPS.map((step, index) => {
                                    const currentIndex = PIPELINE_PROGRESS_STEPS.indexOf(
                                        result.status === "approved" || result.status === "rejected" || result.status === "failed"
                                            ? "needs_review"
                                            : (result.status as (typeof PIPELINE_PROGRESS_STEPS)[number]),
                                    );
                                    const isDone = currentIndex >= index;
                                    return (
                                        <div key={step} className={`rounded-lg border p-3 text-sm ${isDone ? "border-emerald-500/40 bg-emerald-500/10" : "border-border bg-muted/20"}`}>
                                            <p className="font-medium capitalize">{step.replaceAll("_", " ")}</p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {result.status === step ? "Current stage" : isDone ? "Reached" : "Pending"}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                                <span className="rounded-full bg-secondary px-3 py-1">Status: <strong>{result.status}</strong></span>
                                <span className="rounded-full bg-secondary px-3 py-1">Revisions: <strong>{result.revision_count}</strong></span>
                                {typeof result.final_score === "number" ? (
                                    <span className="rounded-full bg-secondary px-3 py-1">Final Score: <strong>{result.final_score.toFixed(2)}</strong></span>
                                ) : null}
                            </div>

                            {result.error_message ? (
                                <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                                    {result.error_message}
                                </div>
                            ) : null}
                        </>
                    )}
                </div>

                <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                    <h2 className="text-lg font-medium">Research Brief</h2>
                    {!stageView?.latestResearchBrief ? (
                        <p className="mt-3 text-sm text-muted-foreground">Research output will appear here.</p>
                    ) : (
                        <pre className="mt-4 max-h-[320px] overflow-auto whitespace-pre-wrap rounded-md bg-muted/40 p-4 text-sm leading-6">
                            {stageView.latestResearchBrief.content}
                        </pre>
                    )}
                </div>

                <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                    <h2 className="text-lg font-medium">Writer Draft</h2>
                    {!stageView?.latestWriterDraft ? (
                        <p className="mt-3 text-sm text-muted-foreground">Draft output will appear here after writing.</p>
                    ) : (
                        <pre className="mt-4 max-h-[420px] overflow-auto whitespace-pre-wrap rounded-md bg-muted/40 p-4 text-sm leading-6">
                            {stageView.latestWriterDraft.content}
                        </pre>
                    )}
                </div>

                <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                    <h2 className="text-lg font-medium">Editor Score / Revision Notes</h2>
                    {!stageView?.latestEditorScore ? (
                        <p className="mt-3 text-sm text-muted-foreground">Editor scorecard will appear here.</p>
                    ) : (
                        <>
                            <div className="mt-4 flex flex-wrap items-center gap-3">
                                <span className="rounded-full bg-secondary px-3 py-1 text-sm">
                                    Total Score: <strong>{editorScore?.total_score?.toFixed(2) ?? "—"}</strong> / 10
                                </span>
                                <span
                                    className={`rounded-full px-3 py-1 text-sm ${editorScore?.passed
                                        ? "bg-emerald-100 text-emerald-800"
                                        : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {editorScore?.passed ? "Pass" : "Needs revision"}
                                </span>
                            </div>

                            <div className="mt-4 overflow-x-auto rounded-lg border border-border">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-muted/40 text-muted-foreground">
                                        <tr>
                                            <th className="px-3 py-2 font-medium">Dimension</th>
                                            <th className="px-3 py-2 font-medium">Score</th>
                                            <th className="px-3 py-2 font-medium">Weight</th>
                                            <th className="px-3 py-2 font-medium">Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedDimensions.map(([name, value]) => (
                                            <tr key={name} className="border-t border-border align-top">
                                                <td className="px-3 py-2 font-medium">{name.replaceAll("_", " ")}</td>
                                                <td className="px-3 py-2">{value.score.toFixed(2)}</td>
                                                <td className="px-3 py-2">{(value.weight * 100).toFixed(0)}%</td>
                                                <td className="px-3 py-2 text-muted-foreground">{value.notes}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {editorScore?.violations?.length ? (
                                <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3">
                                    <p className="font-medium text-red-700">Policy violations</p>
                                    <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-red-700">
                                        {editorScore.violations.map((violation) => (
                                            <li key={violation}>{violation}</li>
                                        ))}
                                    </ul>
                                </div>
                            ) : null}

                            {stageView.latestRevisionNotes ? (
                                <div className="mt-4 rounded-md border border-border bg-muted/30 p-3 text-sm">
                                    <p className="font-medium">Latest revision notes</p>
                                    <p className="mt-1 whitespace-pre-wrap text-muted-foreground">{stageView.latestRevisionNotes}</p>
                                </div>
                            ) : null}
                        </>
                    )}
                </div>

                <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                    <h2 className="text-lg font-medium">Human Feedback History</h2>
                    {!result?.feedback?.length ? (
                        <p className="mt-3 text-sm text-muted-foreground">Feedback history will appear here once editors respond.</p>
                    ) : (
                        <div className="mt-4 space-y-3">
                            {result.feedback.map((entry) => (
                                <div key={entry.id} className="rounded-md border border-border p-3 text-sm">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-medium capitalize">{entry.action}</span>
                                        <span className="text-muted-foreground">{entry.stage}</span>
                                        <span className="text-muted-foreground">{new Date(entry.created_at).toLocaleString()}</span>
                                    </div>
                                    {entry.notes ? <p className="mt-2 whitespace-pre-wrap text-muted-foreground">{entry.notes}</p> : null}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
