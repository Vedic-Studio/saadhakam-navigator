"use client";

import Link from "next/link";
import { getDailyJyotishGuidance } from "@/lib/jyotish-daily";

export function DailyPracticeCard() {
    const guidance = getDailyJyotishGuidance(new Date());

    return (
        <div className="rounded-3xl border border-border/50 bg-card p-6 md:p-8">
            <p className="text-xs uppercase tracking-widest text-orange-400 font-semibold mb-3">Daily Jyotish practice</p>
            <h2 className="font-display text-3xl font-bold mb-3">{guidance.vara?.name ?? "Daily guidance"}</h2>
            <p className="text-muted-foreground mb-6">
                {guidance.vara?.description ?? "Use today as a simple anchor for reflective practice."}
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="rounded-2xl bg-background/60 border border-border/40 p-4">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Ruling graha</p>
                    <p className="font-semibold">{guidance.varaGraha?.name ?? "—"}</p>
                </div>
                <div className="rounded-2xl bg-background/60 border border-border/40 p-4">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Suggested practices</p>
                    <p className="font-semibold">
                        {guidance.varaBundle?.practices.map((item) => item?.title).filter(Boolean).join(", ") || "Japa and reflection"}
                    </p>
                </div>
                {guidance.hasCalendarData && guidance.nakshatra && (
                    <div className="rounded-2xl bg-background/60 border border-border/40 p-4">
                        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Nakshatra</p>
                        <p className="font-semibold">{guidance.nakshatra.name}</p>
                    </div>
                )}
                {guidance.hasCalendarData && guidance.tithi && (
                    <div className="rounded-2xl bg-background/60 border border-border/40 p-4">
                        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Tithi</p>
                        <p className="font-semibold">{guidance.tithi.name}</p>
                    </div>
                )}
            </div>

            <div className="flex flex-wrap gap-3">
                {guidance.varaBundle?.mantras.slice(0, 2).map((mantra) => (
                    <Link
                        key={mantra?.slug}
                        href={`/mantras/${mantra?.slug}`}
                        className="px-4 py-2 rounded-full border border-border hover:border-orange-500/40 transition-colors"
                    >
                        {mantra?.name}
                    </Link>
                ))}
                <Link href="/jyotish/grahas" className="px-4 py-2 rounded-full border border-border hover:border-orange-500/40 transition-colors">
                    Explore grahas
                </Link>
            </div>
        </div>
    );
}