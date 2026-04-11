"use client";

import { useMemo } from "react";
import type { VedicClockResponse } from "@/lib/vedic-clock/schema";
import { cn } from "@/lib/utils";

export function DailyTimingGuide({ payload }: { payload: VedicClockResponse }) {
    const { clock } = payload;
    
    // Convert current time to a numeric form for simple comparisons if needed,
    // although isActive and isPast are already robustly computed in the payload.

    return (
        <section className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
            <div className="mb-6">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-orange-400">Timing Guide</p>
                <h3 className="mt-1 font-display text-2xl font-bold">Auspicious & Inauspicious Periods</h3>
            </div>

            <div className="space-y-8">
                {/* Auspicious Windows */}
                <div>
                    <h4 className="flex items-center gap-2 text-lg font-semibold text-emerald-500 mb-4">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-20"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                        Auspicious Windows
                    </h4>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        {clock.auspiciousWindows.map((window) => {
                            const isUpcoming = !window.isActive && !window.isPast;
                            return (
                                <div 
                                    key={window.name} 
                                    className={cn(
                                        "flex flex-col gap-2 rounded-2xl border p-4 transition-all duration-300",
                                        window.isActive ? "border-emerald-500/50 bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.1)]" : "border-border/50 bg-muted/20",
                                        window.isPast && "opacity-60"
                                    )}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h5 className="font-semibold">{window.name}</h5>
                                            <div className="text-xs text-muted-foreground font-mono mt-0.5">
                                                {window.startTime} – {window.endTime}
                                            </div>
                                        </div>
                                        <div className={cn(
                                            "text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full",
                                            window.isActive ? "bg-emerald-500/20 text-emerald-400" :
                                            window.isPast ? "bg-muted text-muted-foreground" :
                                            "bg-blue-500/10 text-blue-400"
                                        )}>
                                            {window.isActive ? "Active" : window.isPast ? "Past" : "Upcoming"}
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-snug">
                                        {window.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Inauspicious Periods */}
                <div>
                    <h4 className="flex items-center gap-2 text-lg font-semibold text-red-400 mb-4">
                        <span className="h-3 w-3 rounded-full bg-red-400/80"></span>
                        Cautionary Periods
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {clock.inauspiciousKalas.map((kala) => {
                            return (
                                <div 
                                    key={kala.name} 
                                    className={cn(
                                        "flex flex-col gap-2 rounded-2xl border p-4 transition-all duration-300",
                                        kala.isActive ? "border-red-500/50 bg-red-500/5 shadow-[0_0_15px_rgba(239,68,68,0.1)]" : "border-border/50 bg-muted/20"
                                    )}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h5 className="font-semibold">{kala.name}</h5>
                                                <span className="text-xs text-muted-foreground">{kala.devanagari}</span>
                                            </div>
                                            <div className="text-xs text-muted-foreground font-mono mt-0.5">
                                                {kala.startTime} – {kala.endTime}
                                            </div>
                                        </div>
                                        <div className={cn(
                                            "text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full",
                                            kala.isActive ? "bg-red-500/20 text-red-400" : "bg-muted text-muted-foreground"
                                        )}>
                                            {kala.isActive ? "Active" : "Standard"}
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-snug">
                                        Best to avoid initiatory or major material actions during this band.
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
