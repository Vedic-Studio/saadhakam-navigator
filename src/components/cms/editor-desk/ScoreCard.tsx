import type { CmsScore } from "./types";

export function ScoreCard({ score }: { score: CmsScore }) {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white">Score</span>
                <span className="text-xs font-semibold text-orange-300">{score.verdict}</span>
            </div>
            {[
                ["Directness", score.directness],
                ["Rhythm", score.rhythm],
                ["Trust", score.trust],
                ["Authenticity", score.authenticity],
                ["Density", score.density],
                ["Focus", score.focus],
            ].map(([label, value]) => (
                <div key={label as string} className="flex items-center justify-between text-xs text-white/70">
                    <span>{label}</span>
                    <span>{value as number}/10</span>
                </div>
            ))}
            <div className="border-t border-white/10 pt-2 text-xs text-white/80">Total: {score.total}/60</div>
            {score.violations.length ? (
                <div className="border-t border-red-500/20 pt-3">
                    <div className="mb-2 text-xs font-semibold text-red-300">Authenticity scan violations</div>
                    <div className="space-y-2">
                        {score.violations.map((violation, index) => (
                            <div key={`${violation.type}-${violation.line}-${index}`} className="rounded-md border border-red-500/20 bg-red-500/10 p-2 text-[11px] text-red-100">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="font-semibold">{violation.type}</span>
                                    <span>line {violation.line}</span>
                                </div>
                                <div className="mt-1 text-red-100/80">“{violation.matched}”</div>
                                <div className="mt-1 text-red-100/70">{violation.fix}</div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
}