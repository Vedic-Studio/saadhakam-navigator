"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { getArticleDetail, saveContent, setPublished, submitReview } from "./api";
import { DiffViewer } from "./DiffViewer";
import { MarkdownEditor } from "./MarkdownEditor";
import { MarkdownViewer } from "./MarkdownViewer";
import { ReviewActions } from "./ReviewActions";
import { ScoreCard } from "./ScoreCard";
import { StatusBadge } from "./StatusBadge";
import { VersionHistory } from "./VersionHistory";
import type { CmsArticleDetail } from "./types";

type Tab = "read" | "edit";

export function ReviewPage({ slug }: { slug: string }) {
    const [detail, setDetail] = useState<CmsArticleDetail | null>(null);
    const [activeTab, setActiveTab] = useState<Tab>("read");
    const [diff, setDiff] = useState<{ from: number; to: number } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const load = () => getArticleDetail(slug).then(setDetail).catch((err) => setError(err.message));

    useEffect(() => {
        load();
    }, [slug]);

    const currentVersion = detail?.versions[detail.versions.length - 1]?.version || 0;
    const diffVersions = useMemo(() => {
        if (!detail || !diff) return null;
        return {
            from: detail.versions.find((version) => version.version === diff.from),
            to: detail.versions.find((version) => version.version === diff.to),
        };
    }, [detail, diff]);

    if (error) {
        return <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">{error}</div>;
    }

    if (!detail) {
        return <div className="py-16 text-center text-sm text-white/60">Loading article workspace…</div>;
    }

    return (
        <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex items-center gap-3">
                <Link href="/content-agent/editor-desk" className="text-white/60 transition-colors hover:text-white">
                    <ArrowLeft size={18} />
                </Link>
                <div className="min-w-0 flex-1">
                    <h1 className="truncate text-lg font-semibold text-white">{detail.article.headline}</h1>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-white/60">
                        <span>{detail.article.batch}</span>
                        <span>{detail.article.format}</span>
                        <span>{detail.article.wordCount.toLocaleString()} words</span>
                        <span>{detail.migrationState === "legacy-fallback" ? "legacy fallback active" : "cms managed"}</span>
                        <StatusBadge stage={detail.article.stage} />
                    </div>
                </div>
            </div>

            <div className="flex gap-6">
                <div className="min-w-0 flex-1" style={{ minHeight: "70vh" }}>
                    {diff && diffVersions?.from && diffVersions?.to ? (
                        <DiffViewer
                            fromVersion={diff.from}
                            toVersion={diff.to}
                            fromContent={diffVersions.from.content}
                            toContent={diffVersions.to.content}
                            onClose={() => setDiff(null)}
                        />
                    ) : (
                        <>
                            <div className="mb-4 flex border-b border-white/10">
                                {(["read", "edit"] as const).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${activeTab === tab
                                            ? "border-white text-white"
                                            : "border-transparent text-white/50 hover:text-white"
                                            }`}
                                    >
                                        {tab === "read" ? "Read" : "Edit"}
                                    </button>
                                ))}
                            </div>

                            {activeTab === "read" ? (
                                <div className="max-h-[75vh] overflow-y-auto rounded-lg border border-white/10 bg-black/20 p-6">
                                    <MarkdownViewer content={detail.content || "No CMS markdown exists yet for this article."} />
                                </div>
                            ) : (
                                <div style={{ height: "75vh" }}>
                                    <MarkdownEditor
                                        content={detail.content}
                                        onSave={async (content, note) => {
                                            await saveContent(slug, content, note);
                                            await load();
                                        }}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="w-80 shrink-0 space-y-6">
                    {detail.score && (
                        <div className="rounded-lg border border-white/10 bg-black/20 p-4">
                            <ScoreCard score={detail.score} />
                        </div>
                    )}

                    <div className="rounded-lg border border-white/10 bg-black/20 p-4">
                        <VersionHistory
                            versions={detail.versions}
                            currentVersion={currentVersion}
                            onCompare={(from, to) => setDiff({ from, to })}
                        />
                    </div>

                    <div className="rounded-lg border border-white/10 bg-black/20 p-4">
                        <ReviewActions
                            reviews={detail.reviews}
                            published={detail.article.published}
                            canPublish={detail.article.canPublish}
                            onSubmit={async (action, comment) => {
                                await submitReview(slug, action, comment);
                                await load();
                            }}
                            onTogglePublished={async (published) => {
                                await setPublished(slug, published);
                                await load();
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}