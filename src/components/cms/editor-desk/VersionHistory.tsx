"use client";

import { useState } from "react";
import { GitCompare } from "lucide-react";
import type { CmsVersion } from "./types";
import { cn, timeAgo } from "./utils";

interface VersionHistoryProps {
    versions: CmsVersion[];
    currentVersion: number;
    onCompare: (from: number, to: number) => void;
}

export function VersionHistory({ versions, currentVersion, onCompare }: VersionHistoryProps) {
    const [compareMode, setCompareMode] = useState(false);
    const [compareFrom, setCompareFrom] = useState<number | null>(null);

    const handleClick = (version: number) => {
        if (!compareMode) return;
        if (compareFrom === null) {
            setCompareFrom(version);
            return;
        }
        onCompare(compareFrom, version);
        setCompareMode(false);
        setCompareFrom(null);
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white">Versions</span>
                {versions.length >= 2 && (
                    <button
                        onClick={() => {
                            setCompareMode(!compareMode);
                            setCompareFrom(null);
                        }}
                        className={cn(
                            "flex items-center gap-1 text-xs",
                            compareMode ? "font-medium text-orange-300" : "text-white/60 hover:text-white",
                        )}
                    >
                        <GitCompare size={12} />
                        {compareMode
                            ? compareFrom
                                ? "Select second version"
                                : "Select first version"
                            : "Compare"}
                    </button>
                )}
            </div>

            <div className="space-y-1">
                {[...versions].reverse().map((version) => (
                    <button
                        key={version.version}
                        onClick={() => handleClick(version.version)}
                        className={cn(
                            "w-full rounded px-2.5 py-2 text-left transition-colors",
                            version.version === currentVersion && !compareMode
                                ? "bg-white/10"
                                : "hover:bg-white/5",
                            compareMode && compareFrom === version.version && "ring-2 ring-orange-400",
                        )}
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-white">v{version.version}</span>
                            <span className="text-xs text-white/50">{timeAgo(version.createdAt)}</span>
                        </div>
                        {version.note && <p className="mt-0.5 truncate text-xs text-white/60">{version.note}</p>}
                    </button>
                ))}
            </div>
        </div>
    );
}