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
        </div>
    );
}