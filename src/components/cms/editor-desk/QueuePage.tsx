"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText } from "lucide-react";
import { generateDraft, getQueue } from "./api";
import { ArticleCard } from "./ArticleCard";
import type { CmsArticle } from "./types";

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
    const [error, setError] = useState<string | null>(null);
    const [topic, setTopic] = useState("What is Vedanta");
    const [pageType, setPageType] = useState<(typeof PAGE_TYPES)[number]["value"]>("topic_hub");
    const [goal, setGoal] = useState("");
    const [audience, setAudience] = useState("spiritual seekers");
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        getQueue().then(setArticles).catch((err) => setError(err.message));
    }, []);

    async function handleGenerate(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setIsGenerating(true);

        try {
            const { slug } = await generateDraft({
                topic,
                pageType,
                goal: goal.trim() || undefined,
                audience: audience.trim() || undefined,
            });
            router.push(`/content-agent/editor-desk/review/${slug}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to generate draft");
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
                    {articles.length} article{articles.length !== 1 ? "s" : ""}
                </span>
            </div>

            <form onSubmit={handleGenerate} className="mb-8 rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="mb-4">
                    <h2 className="text-base font-semibold text-white">Idea / Topic Intake</h2>
                    <p className="mt-1 text-sm text-white/60">
                        Generate a CMS-native draft from a fresh idea and open it directly in review.
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
                        {isGenerating ? "Generating..." : "Generate draft"}
                    </button>
                </div>
            </form>

            {error ? (
                <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">{error}</div>
            ) : articles.length === 0 ? (
                <div className="py-16 text-center text-sm text-white/60">No CMS articles available</div>
            ) : (
                <div className="overflow-hidden rounded-lg border border-white/10 bg-black/20">
                    {articles.map((article) => (
                        <ArticleCard key={article.slug} article={article} />
                    ))}
                </div>
            )}
        </div>
    );
}