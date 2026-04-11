"use client";

import { Badge } from "@/components/ui/badge";
import type { SadhanaGuidance } from "@/lib/panchang-guidance";
import { cn } from "@/lib/utils";

const toneClasses = {
    auspicious: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
    caution: "border-red-500/30 bg-red-500/10 text-red-200",
    observance: "border-orange-500/30 bg-orange-500/10 text-orange-200",
    focus: "border-indigo-500/30 bg-indigo-500/10 text-indigo-200",
};

export function SadhanaOverview({ guidance }: { guidance: SadhanaGuidance }) {
    return (
        <section className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-orange-400">Sadhana guidance</p>
            <h3 className="mt-2 text-xl font-medium tracking-tight md:text-2xl lg:w-4/5 text-foreground leading-[1.3]">
                {guidance.headline}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
                {guidance.chips.map((chip) => (
                    <Badge key={chip.label} variant="outline" className={cn("h-auto whitespace-normal px-3 py-1.5 text-left", toneClasses[chip.tone])}>
                        <span className="font-semibold">{chip.label}</span>
                        <span className="ml-1 opacity-90">· {chip.detail}</span>
                    </Badge>
                ))}
            </div>
        </section>
    );
}