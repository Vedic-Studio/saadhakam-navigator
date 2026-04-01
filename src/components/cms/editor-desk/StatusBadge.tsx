import { cn } from "./utils";
import type { CmsArticle } from "./types";

const stageClasses: Record<CmsArticle["stage"], string> = {
    draft: "bg-slate-500/10 text-slate-300",
    edit: "bg-blue-500/10 text-blue-300",
    review: "bg-amber-500/10 text-amber-300",
    published: "bg-green-500/10 text-green-300",
    rejected: "bg-red-500/10 text-red-300",
    legacy: "bg-violet-500/10 text-violet-300",
};

export function StatusBadge({ stage }: { stage: CmsArticle["stage"] }) {
    return (
        <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-medium capitalize", stageClasses[stage])}>
            {stage}
        </span>
    );
}