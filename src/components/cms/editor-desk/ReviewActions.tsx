"use client";

import { useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import type { CmsReview } from "./types";
import { timeAgo } from "./utils";

interface ReviewActionsProps {
    reviews: CmsReview[];
    published: boolean;
    canPublish: boolean;
    onSubmit: (action: CmsReview["action"], comment: string) => Promise<void>;
    onTogglePublished: (published: boolean) => Promise<void>;
}

export function ReviewActions({ reviews, published, canPublish, onSubmit, onTogglePublished }: ReviewActionsProps) {
    const [comment, setComment] = useState("");
    const [busy, setBusy] = useState(false);

    const handleSubmit = async (action: CmsReview["action"]) => {
        setBusy(true);
        try {
            await onSubmit(action, comment);
            setComment("");
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white">Review</span>
                <button
                    disabled={!canPublish}
                    onClick={() => onTogglePublished(!published)}
                    className="rounded border border-white/10 px-2.5 py-1 text-xs text-white/70 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {published ? "Unpublish" : "Publish"}
                </button>
            </div>

            {!canPublish ? (
                <p className="text-xs text-amber-300/90">
                    Publish is only available for approved articles on known public routes.
                </p>
            ) : null}

            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add review comment..."
                rows={3}
                className="w-full resize-none rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-orange-400"
            />

            <div className="flex gap-2">
                <button
                    disabled={busy}
                    onClick={() => handleSubmit("approve")}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-green-600 py-2 text-xs font-medium text-white hover:bg-green-700 disabled:opacity-60"
                >
                    <Check size={14} /> Approve draft
                </button>
                <button
                    disabled={busy}
                    onClick={() => handleSubmit("revise")}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-amber-500 py-2 text-xs font-medium text-white hover:bg-amber-600 disabled:opacity-60"
                >
                    <RotateCcw size={14} /> Revise
                </button>
                <button
                    disabled={busy}
                    onClick={() => handleSubmit("reject")}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-red-600 py-2 text-xs font-medium text-white hover:bg-red-700 disabled:opacity-60"
                >
                    <X size={14} /> Reject
                </button>
            </div>

            {reviews.length > 0 && (
                <div className="space-y-2 border-t border-white/10 pt-2">
                    <span className="text-xs font-medium text-white/50">Previous reviews</span>
                    {reviews.map((review, index) => (
                        <div key={`${review.createdAt}-${index}`} className="rounded border border-white/10 p-2 text-xs">
                            <div className="mb-1 flex items-center justify-between">
                                <span className="font-medium capitalize text-white">{review.action}</span>
                                <span className="text-white/50">v{review.version} · {timeAgo(review.createdAt)}</span>
                            </div>
                            {review.comment && <p className="text-white/60">{review.comment}</p>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}