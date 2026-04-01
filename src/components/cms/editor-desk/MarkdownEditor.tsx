"use client";

import { useEffect, useState } from "react";
import { MarkdownViewer } from "./MarkdownViewer";

interface MarkdownEditorProps {
    content: string;
    onSave: (content: string, note?: string) => Promise<void>;
}

export function MarkdownEditor({ content, onSave }: MarkdownEditorProps) {
    const [value, setValue] = useState(content);
    const [note, setNote] = useState("");
    const [preview, setPreview] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setValue(content);
    }, [content]);

    const hasChanges = value !== content;

    return (
        <div className="flex h-full flex-col">
            <div className="mb-3 flex items-center justify-between">
                <button
                    onClick={() => setPreview(!preview)}
                    className="text-xs font-medium text-white/60 transition-colors hover:text-white"
                >
                    {preview ? "Back to editor" : "Preview"}
                </button>
                {hasChanges && (
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Version note (optional)"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="w-56 rounded border border-white/10 bg-black/20 px-2 py-1 text-xs text-white"
                        />
                        <button
                            onClick={async () => {
                                setSaving(true);
                                try {
                                    await onSave(value, note || undefined);
                                    setNote("");
                                } finally {
                                    setSaving(false);
                                }
                            }}
                            className="rounded bg-orange-500 px-3 py-1 text-xs font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                            disabled={saving}
                        >
                            {saving ? "Saving..." : "Save version"}
                        </button>
                    </div>
                )}
            </div>

            {preview ? (
                <div className="flex-1 overflow-y-auto rounded-lg border border-white/10 bg-black/20 p-6">
                    <MarkdownViewer content={value} />
                </div>
            ) : (
                <textarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="flex-1 resize-none rounded-lg border border-white/10 bg-black/30 p-4 font-mono text-sm text-white focus:outline-none focus:ring-1 focus:ring-orange-400"
                    spellCheck={false}
                />
            )}
        </div>
    );
}