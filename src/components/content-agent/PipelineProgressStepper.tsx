import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { PIPELINE_PROGRESS_STEPS, type PipelineStatus } from "@/lib/pipelines/types";

const STEP_LABELS: Record<string, string> = {
    queued: "Queued",
    researching: "Research",
    research_review: "Research Review",
    writing: "Writing",
    draft_review: "Draft Review",
    editing: "Editing",
    edit_review: "Edit Review",
    polishing: "Polishing",
    final_review: "Final Review",
    needs_review: "Needs Review",
    approved: "Approved",
    rejected: "Rejected",
    failed: "Failed",
};

type PipelineProgressStepperProps = {
    status: PipelineStatus | string;
};

function getEffectiveStatus(status: PipelineStatus | string) {
    if (status === "approved") {
        return "needs_review";
    }

    if (status === "rejected" || status === "failed") {
        return "final_review";
    }

    return PIPELINE_PROGRESS_STEPS.includes(status as (typeof PIPELINE_PROGRESS_STEPS)[number])
        ? status
        : "queued";
}

export function PipelineProgressStepper({ status }: PipelineProgressStepperProps) {
    const effectiveStatus = getEffectiveStatus(status);
    const currentIndex = PIPELINE_PROGRESS_STEPS.indexOf(effectiveStatus as (typeof PIPELINE_PROGRESS_STEPS)[number]);

    return (
        <div className="rounded-lg border border-white/10 bg-black/20 p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                    <h2 className="text-base font-semibold text-white">Pipeline progress</h2>
                    <p className="mt-1 text-sm text-white/60">Track completed, active, and upcoming workflow stages.</p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
                    {STEP_LABELS[status] ?? status}
                </span>
            </div>

            <div className="overflow-x-auto pb-2">
                <div className="flex min-w-max items-start">
                    {PIPELINE_PROGRESS_STEPS.map((step, index) => {
                        const state = index < currentIndex ? "complete" : index === currentIndex ? "current" : "pending";

                        return (
                            <div key={step} className="flex min-w-[116px] flex-1 items-start">
                                <div className="flex w-full flex-col items-center text-center">
                                    <div
                                        className={cn(
                                            "flex h-10 w-10 items-center justify-center rounded-full border text-xs font-semibold transition-colors",
                                            state === "complete" && "border-emerald-400/40 bg-emerald-500 text-white",
                                            state === "current" && "border-orange-400 bg-orange-500/20 text-orange-200 ring-4 ring-orange-500/10",
                                            state === "pending" && "border-white/15 bg-white/5 text-white/45",
                                        )}
                                    >
                                        {state === "complete" ? <Check size={16} /> : index + 1}
                                    </div>
                                    <span
                                        className={cn(
                                            "mt-3 max-w-[100px] text-xs font-medium leading-5",
                                            state === "complete" && "text-emerald-200",
                                            state === "current" && "text-orange-200",
                                            state === "pending" && "text-white/50",
                                        )}
                                    >
                                        {STEP_LABELS[step] ?? step}
                                    </span>
                                </div>

                                {index < PIPELINE_PROGRESS_STEPS.length - 1 ? (
                                    <div className="mt-5 h-px flex-1 min-w-[36px] bg-white/10">
                                        <div
                                            className={cn(
                                                "h-full transition-colors",
                                                index < currentIndex ? "bg-emerald-400" : "bg-transparent",
                                            )}
                                        />
                                    </div>
                                ) : null}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}