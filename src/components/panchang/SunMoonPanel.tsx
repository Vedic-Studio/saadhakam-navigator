"use client";

import { Sunrise, Sun, Sunset, Clock, Moon, MoonStar } from "lucide-react";
import type { VedicClockResponse } from "@/lib/vedic-clock/schema";

interface SunMoonPanelProps {
    payload: VedicClockResponse;
}

function formatDuration(minutes: number) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
}

export function SunMoonPanel({ payload }: SunMoonPanelProps) {
    const { clock } = payload;

    return (
        <section className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
            <div className="grid grid-cols-2 gap-4 md:flex md:flex-row md:justify-between md:items-center">
                <div className="flex items-center gap-3">
                    <Sunrise className="h-5 w-5 text-orange-400" />
                    <div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Sunrise</div>
                        <div className="font-mono text-sm">{clock.sunriseTime}</div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Sun className="h-5 w-5 text-amber-400" />
                    <div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Solar Noon</div>
                        <div className="font-mono text-sm">{clock.solarNoonTime}</div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Sunset className="h-5 w-5 text-orange-500" />
                    <div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Sunset</div>
                        <div className="font-mono text-sm">{clock.sunsetTime}</div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-emerald-400" />
                    <div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Day Length</div>
                        <div className="font-mono text-sm">{formatDuration(clock.dayLengthMinutes)}</div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <MoonStar className="h-5 w-5 text-indigo-400" />
                    <div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Moonrise</div>
                        <div className="font-mono text-sm">{clock.moonrise?.localTime ?? "—"}</div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Moon className="h-5 w-5 text-slate-400" />
                    <div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Moonset</div>
                        <div className="font-mono text-sm">{clock.moonset?.localTime ?? "—"}</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
