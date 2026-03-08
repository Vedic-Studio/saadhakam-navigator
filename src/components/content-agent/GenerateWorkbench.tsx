"use client";

import { useEffect, useMemo, useState } from "react";

type PageType =
    | "topic_hub"
    | "combinatorial"
    | "sacred_text_chapter"
    | "sacred_text_shloka"
    | "sanskrit_lexicon";

type QualityDimension = {
    score: number;
    weight: number;
    notes: string;
};

type GenerateResponse = {
    topic: string;
    page_type: PageType;
    generated_content: string;
    created_at: string;
    scorecard: {
        total_score: number;
        passed: boolean;
        dimensions: Record<string, QualityDimension>;
        violations: string[];
    };
};

type TechniqueItem = {
    source: string;
    type: string;
    text: string;
};

const PAGE_TYPES: Array<{ value: PageType; label: string }> = [
    { value: "topic_hub", label: "Topic Hub" },
    { value: "combinatorial", label: "Practice for Goal" },
    { value: "sacred_text_chapter", label: "Sacred Text Chapter" },
    { value: "sacred_text_shloka", label: "Sacred Text Shloka" },
    { value: "sanskrit_lexicon", label: "Sanskrit Lexicon" },
];

const API_BASE = process.env.NEXT_PUBLIC_CONTENT_AGENT_API_BASE ?? "http://localhost:8000/api";

export function GenerateWorkbench() {
    const [topic, setTopic] = useState("What is Vedanta");
    const [pageType, setPageType] = useState<PageType>("topic_hub");
    const [goal, setGoal] = useState("");
    const [audience, setAudience] = useState("spiritual seekers");

    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<GenerateResponse | null>(null);

    const [techniques, setTechniques] = useState<TechniqueItem[]>([]);
    const [techniquesError, setTechniquesError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchTechniques() {
            try {
                setTechniquesError(null);
                const res = await fetch(`${API_BASE}/knowledge/techniques`);
                if (!res.ok) throw new Error(`Failed to load techniques (${res.status})`);
                const data = (await res.json()) as { techniques: TechniqueItem[] };
                if (!cancelled) {
                    setTechniques(data.techniques ?? []);
                }
            } catch (err) {
                if (!cancelled) {
                    setTechniquesError(err instanceof Error ? err.message : "Unable to load techniques");
                }
            }
        }

        void fetchTechniques();
        return () => {
            cancelled = true;
        };
    }, []);

    const sortedDimensions = useMemo(() => {
        if (!result) return [];
        return Object.entries(result.scorecard.dimensions).sort((a, b) => b[1].weight - a[1].weight);
    }, [result]);

    async function handleGenerate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setResult(null);
        setIsGenerating(true);

        try {
            const payload = {
                topic,
                page_type: pageType,
                goal: goal.trim() || undefined,
                audience: audience.trim() || undefined,
            };

            const res = await fetch(`${API_BASE}/generate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const fallback = `Generation failed (${res.status})`;
                let message = fallback;
                try {
                    const data = (await res.json()) as { detail?: string };
                    message = data.detail || fallback;
                } catch {
                    // keep fallback
                }
                throw new Error(message);
            }

            const data = (await res.json()) as GenerateResponse;
            setResult(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to generate content");
        } finally {
            setIsGenerating(false);
        }
    }

    return (
        <div className="grid gap-8 lg:grid-cols-[minmax(360px,420px)_minmax(0,1fr)]">
            <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <h2 className="text-lg font-medium">Generate</h2>
                <form className="mt-4 space-y-4" onSubmit={handleGenerate}>
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
                            onChange={(e) => setPageType(e.target.value as PageType)}
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
                        disabled={isGenerating}
                    >
                        {isGenerating ? "Generating..." : "Generate Content"}
                    </button>

                    {error ? <p className="text-sm text-red-500">{error}</p> : null}
                </form>

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
            </section>

            <section className="space-y-4">
                <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                    <h2 className="text-lg font-medium">Scorecard</h2>
                    {!result ? (
                        <p className="mt-3 text-sm text-muted-foreground">
                            Generate content to see 10-dimension quality scoring.
                        </p>
                    ) : (
                        <>
                            <div className="mt-4 flex flex-wrap items-center gap-3">
                                <span className="rounded-full bg-secondary px-3 py-1 text-sm">
                                    Total Score: <strong>{result.scorecard.total_score.toFixed(2)}</strong> / 10
                                </span>
                                <span
                                    className={`rounded-full px-3 py-1 text-sm ${result.scorecard.passed
                                            ? "bg-emerald-100 text-emerald-800"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {result.scorecard.passed ? "Pass" : "Needs revision"}
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

                            {result.scorecard.violations.length > 0 ? (
                                <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3">
                                    <p className="font-medium text-red-700">Policy violations</p>
                                    <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-red-700">
                                        {result.scorecard.violations.map((violation) => (
                                            <li key={violation}>{violation}</li>
                                        ))}
                                    </ul>
                                </div>
                            ) : null}
                        </>
                    )}
                </div>

                <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                    <h2 className="text-lg font-medium">Generated Content</h2>
                    {!result ? (
                        <p className="mt-3 text-sm text-muted-foreground">Content will appear here after generation.</p>
                    ) : (
                        <pre className="mt-4 max-h-[800px] overflow-auto whitespace-pre-wrap rounded-md bg-muted/40 p-4 text-sm leading-6">
                            {result.generated_content}
                        </pre>
                    )}
                </div>
            </section>
        </div>
    );
}
