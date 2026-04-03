"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { BackendUnavailableError, createPipeline, listPipelines } from "@/lib/pipelines/api";
import type { PipelineListItem, PipelinePageType } from "@/lib/pipelines/types";

const PAGE_TYPES: Array<{ value: PipelinePageType; label: string }> = [
    { value: "topic_hub", label: "Topic Hub" },
    { value: "combinatorial", label: "Practice for Goal" },
    { value: "sacred_text_chapter", label: "Sacred Text Chapter" },
    { value: "sacred_text_shloka", label: "Sacred Text Shloka" },
    { value: "sanskrit_lexicon", label: "Sanskrit Lexicon" },
];

function splitOnCommaOrNewline(value: string) {
    return value.split(/[\n,]+/).map((item) => item.trim()).filter(Boolean);
}

function splitOnNewline(value: string) {
    return value.split(/\r?\n/).map((item) => item.trim()).filter(Boolean);
}

function formatRelativeDate(value: string) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;

    const diffMs = Date.now() - date.getTime();
    const diffMinutes = Math.round(diffMs / 60000);

    if (diffMinutes < 1) return "just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;

    const diffHours = Math.round(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    return `${Math.round(diffHours / 24)}d ago`;
}

export function GenerateWorkbench() {
    const router = useRouter();

    const [topic, setTopic] = useState("What is Vedanta");
    const [pageType, setPageType] = useState<PipelinePageType>("topic_hub");
    const [description, setDescription] = useState("");
    const [keyAnglesInput, setKeyAnglesInput] = useState("");
    const [referenceLinksInput, setReferenceLinksInput] = useState("");
    const [sourceNotes, setSourceNotes] = useState("");
    const [goal, setGoal] = useState("");
    const [audience, setAudience] = useState("spiritual seekers");
    const [qualityThreshold, setQualityThreshold] = useState("7.0");
    const [revisionLimit, setRevisionLimit] = useState("3");
    const [showAdvanced, setShowAdvanced] = useState(false);

    const [recentPipelines, setRecentPipelines] = useState<PipelineListItem[]>([]);
    const [isLoadingRecent, setIsLoadingRecent] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [backendUnavailableMessage, setBackendUnavailableMessage] = useState<string | null>(null);

    const parsedKeyAngles = useMemo(() => splitOnCommaOrNewline(keyAnglesInput), [keyAnglesInput]);
    const parsedReferenceLinks = useMemo(() => splitOnNewline(referenceLinksInput), [referenceLinksInput]);

    useEffect(() => {
        let cancelled = false;

        async function loadRecentPipelines() {
            try {
                setIsLoadingRecent(true);
                const pipelines = await listPipelines();
                if (!cancelled) {
                    setRecentPipelines((pipelines ?? []).slice(0, 6));
                    setBackendUnavailableMessage(null);
                }
            } catch (err) {
                if (!cancelled) {
                    if (err instanceof BackendUnavailableError) {
                        setBackendUnavailableMessage(err.message);
                        setRecentPipelines([]);
                        setError(null);
                    } else {
                        setError(err instanceof Error ? err.message : "Unable to load recent pipelines");
                    }
                }
            } finally {
                if (!cancelled) {
                    setIsLoadingRecent(false);
                }
            }
        }

        void loadRecentPipelines();

        return () => {
            cancelled = true;
        };
    }, []);

    async function handleGenerate(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setBackendUnavailableMessage(null);
        setIsGenerating(true);

        try {
            const detail = await createPipeline({
                topic: topic.trim(),
                pageType,
                description: description.trim() || undefined,
                keyAngles: parsedKeyAngles,
                referenceLinks: parsedReferenceLinks,
                sourceNotes: sourceNotes.trim() || undefined,
                goal: goal.trim() || undefined,
                audience: audience.trim() || undefined,
                qualityThreshold: Number.parseFloat(qualityThreshold),
                revisionLimit: Number.parseInt(revisionLimit, 10),
            });

            router.push(`/content-agent/editor-desk/pipelines/${detail.id}`);
        } catch (err) {
            if (err instanceof BackendUnavailableError) {
                setBackendUnavailableMessage(err.message);
                setError(null);
            } else {
                setError(err instanceof Error ? err.message : "Failed to create pipeline");
            }
            setIsGenerating(false);
        }
    }

    return (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)]">
            <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">Create a new pipeline</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Capture the brief here, then continue the run inside the review workspace.
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleGenerate}>
                    {backendUnavailableMessage ? (
                        <div className="rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-700 dark:text-amber-200">
                            <p className="font-medium">Pipeline backend unavailable</p>
                            <p className="mt-1 opacity-90">{backendUnavailableMessage}</p>
                        </div>
                    ) : null}

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-1.5 md:col-span-2">
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
                            <label className="text-sm font-medium">Audience</label>
                            <input
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-primary"
                                value={audience}
                                onChange={(e) => setAudience(e.target.value)}
                                placeholder="spiritual seekers"
                            />
                        </div>

                        <div className="space-y-1.5 md:col-span-2">
                            <label className="text-sm font-medium">Description / Brief</label>
                            <textarea
                                className="min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-primary"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe the desired article, framing, constraints, and what success should look like."
                            />
                        </div>

                        <div className="space-y-1.5 md:col-span-2">
                            <label className="text-sm font-medium">Key Angles</label>
                            <textarea
                                className="min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-primary"
                                value={keyAnglesInput}
                                onChange={(e) => setKeyAnglesInput(e.target.value)}
                                placeholder="One per line or comma-separated"
                            />
                            {parsedKeyAngles.length > 0 ? (
                                <p className="text-xs text-muted-foreground">Parsed {parsedKeyAngles.length} angle(s).</p>
                            ) : null}
                        </div>

                        <div className="space-y-1.5 md:col-span-2">
                            <label className="text-sm font-medium">Reference Links</label>
                            <textarea
                                className="min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-primary"
                                value={referenceLinksInput}
                                onChange={(e) => setReferenceLinksInput(e.target.value)}
                                placeholder="One URL per line"
                            />
                            {parsedReferenceLinks.length > 0 ? (
                                <p className="text-xs text-muted-foreground">Parsed {parsedReferenceLinks.length} reference link(s).</p>
                            ) : null}
                        </div>

                        <div className="space-y-1.5 md:col-span-2">
                            <label className="text-sm font-medium">Source Notes</label>
                            <textarea
                                className="min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-primary"
                                value={sourceNotes}
                                onChange={(e) => setSourceNotes(e.target.value)}
                                placeholder="Notes about sources, citations, exclusions, or fact-check expectations."
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">Goal</label>
                            <input
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-primary"
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)}
                                placeholder="e.g. clarity, trust, conversion"
                            />
                        </div>
                    </div>

                    <div className="rounded-lg border border-border bg-muted/30 p-4">
                        <button
                            type="button"
                            onClick={() => setShowAdvanced((value) => !value)}
                            className="flex w-full items-center justify-between text-left"
                        >
                            <span>
                                <span className="block text-sm font-medium">Advanced</span>
                                <span className="block text-xs text-muted-foreground">Quality threshold and revision limit</span>
                            </span>
                            <span className="text-sm text-muted-foreground">{showAdvanced ? "Hide" : "Show"}</span>
                        </button>

                        {showAdvanced ? (
                            <div className="mt-4 grid gap-4 md:grid-cols-2">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium">Quality Threshold</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="10"
                                        step="0.1"
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-primary"
                                        value={qualityThreshold}
                                        onChange={(e) => setQualityThreshold(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium">Revision Limit</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="5"
                                        step="1"
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-primary"
                                        value={revisionLimit}
                                        onChange={(e) => setRevisionLimit(e.target.value)}
                                    />
                                </div>
                            </div>
                        ) : null}
                    </div>

                    <button
                        type="submit"
                        className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={isGenerating || Boolean(backendUnavailableMessage)}
                    >
                        {isGenerating ? "Creating pipeline..." : "Create pipeline and open review workspace"}
                    </button>

                    {error ? <p className="text-sm text-red-500">{error}</p> : null}
                </form>
            </section>

            <aside className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h2 className="text-lg font-medium">Recent Pipelines</h2>
                        <p className="mt-1 text-sm text-muted-foreground">Jump back into runs already in progress.</p>
                    </div>
                    <Link href="/content-agent/editor-desk" className="text-sm font-medium text-primary hover:underline">
                        View all
                    </Link>
                </div>

                {isLoadingRecent ? (
                    <p className="text-sm text-muted-foreground">Loading recent pipelines…</p>
                ) : recentPipelines.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No recent pipelines yet.</p>
                ) : (
                    <div className="space-y-3">
                        {recentPipelines.map((pipeline) => (
                            <Link
                                key={pipeline.id}
                                href={`/content-agent/editor-desk/pipelines/${pipeline.id}`}
                                className="block rounded-lg border border-border bg-background/50 p-4 transition hover:border-primary/40 hover:bg-muted/40"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium text-foreground">{pipeline.topic}</p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {pipeline.page_type} · {pipeline.status}
                                        </p>
                                    </div>
                                    <span className="shrink-0 text-xs text-muted-foreground">
                                        {formatRelativeDate(pipeline.updated_at)}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </aside>
        </div>
    );
}