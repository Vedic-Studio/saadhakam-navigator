"use client";

import { useMemo } from "react";
import { getMuhurtaName } from "@/lib/vedic-clock/muhurta-names";
import type { VedicClockResponse } from "@/lib/vedic-clock";
import { cn } from "@/lib/utils";

function toCycleMinuteFromTime(time: string, sunriseMinute: number) {
    const [hours, minutes] = time.split(":").map(Number);
    const absolute = hours * 60 + minutes;
    return absolute >= sunriseMinute ? absolute - sunriseMinute : 1440 - sunriseMinute + absolute;
}

export function DayTimeline({ payload }: { payload: VedicClockResponse }) {
    const sunriseMinute = payload.clock.sunriseToday.minutes;
    const currentCycleMinute = payload.clock.minutesSinceSunrise;

    const overlays = useMemo(
        () => payload.clock.inauspiciousKalas.map((period) => ({
            ...period,
            startCycleMinute: toCycleMinuteFromTime(period.startTime, sunriseMinute),
            endCycleMinute: toCycleMinuteFromTime(period.endTime, sunriseMinute),
        })),
        [payload.clock.inauspiciousKalas, sunriseMinute],
    );

    return (
        <section className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
            <div className="mb-5">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-orange-400">Day timeline</p>
                <h3 className="mt-1 font-display text-2xl font-bold">The full vedic day from sunrise to sunrise</h3>
            </div>

            <div className="overflow-x-auto pb-2">
                <div className="min-w-[900px]">
                    <svg viewBox="0 0 1200 180" className="w-full" role="img" aria-label="Panchang day timeline">
                        {payload.clock.muhurtas.map((muhurta) => {
                            const x = ((muhurta.index - 1) / 30) * 1200;
                            const width = 1200 / 30;
                            const meta = getMuhurtaName(muhurta.index);
                            const isAuspicious = payload.clock.auspiciousWindows.some((window) => {
                                const start = toCycleMinuteFromTime(window.startTime, sunriseMinute);
                                const end = toCycleMinuteFromTime(window.endTime, sunriseMinute);
                                const center = (muhurta.index - 0.5) * 48;
                                return center >= start && center <= end;
                            });

                            return (
                                <g key={muhurta.index}>
                                    <rect
                                        x={x}
                                        y={50}
                                        width={width - 2}
                                        height={50}
                                        rx={8}
                                        className={cn(
                                            muhurta.isActive
                                                ? "fill-orange-400/80"
                                                : isAuspicious
                                                    ? "fill-amber-300/60"
                                                    : muhurta.phase === "night"
                                                        ? "fill-indigo-400/40"
                                                        : "fill-slate-400/30",
                                        )}
                                    />
                                    <text x={x + width / 2} y={35} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                                        {String(muhurta.index).padStart(2, "0")}
                                    </text>
                                    <title>{`${meta.name} · ${meta.deity} · ${muhurta.startTime}–${muhurta.endTime}`}</title>
                                </g>
                            );
                        })}

                        {overlays.map((period) => {
                            const x = (period.startCycleMinute / 1440) * 1200;
                            const width = (((period.endCycleMinute - period.startCycleMinute + 1440) % 1440) || (period.endCycleMinute - period.startCycleMinute)) / 1440 * 1200;
                            return (
                                <g key={period.name}>
                                    <rect x={x} y={44} width={width} height={62} rx={8} fill="rgba(239,68,68,0.28)" />
                                    <text x={x + 6} y={120} className="fill-red-300 text-[10px]">{period.name}</text>
                                </g>
                            );
                        })}

                        <line x1={(currentCycleMinute / 1440) * 1200} x2={(currentCycleMinute / 1440) * 1200} y1={38} y2={112} stroke="#f97316" strokeWidth="3" />
                        <text x={0} y={145} className="fill-muted-foreground text-xs">Sunrise {payload.clock.sunriseTime}</text>
                        <text x={580} y={145} className="fill-muted-foreground text-xs">Sunset {payload.clock.sunsetTime}</text>
                        <text x={1080} y={145} className="fill-muted-foreground text-xs">Next sunrise {payload.clock.nextSunrise.localTime}</text>
                    </svg>
                </div>
            </div>
        </section>
    );
}