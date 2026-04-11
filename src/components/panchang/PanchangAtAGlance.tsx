"use client";

import Link from "next/link";
import { Sun, Moon, Star, Circle, Diamond, MoonStar } from "lucide-react";
import type { VedicClockResponse } from "@/lib/vedic-clock/schema";

interface PanchangAtAGlanceProps {
    payload: VedicClockResponse;
}

export function PanchangAtAGlance({ payload }: PanchangAtAGlanceProps) {
    const { panchanga, transitions } = payload;

    return (
        <section className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
            <div className="mb-5">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-orange-400">Panchang At A Glance</p>
                <h3 className="mt-1 font-display text-2xl font-bold">Today's Essential Elements</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
                {/* Vara */}
                <div className="flex items-start gap-4 rounded-2xl bg-muted/30 p-4">
                    <Sun className="h-6 w-6 text-orange-400 shrink-0 mt-0.5" />
                    <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Vara</div>
                        <Link href={`/jyotish/panchang/varas/${panchanga.vara.slug}`} className="text-lg font-semibold hover:text-orange-400 transition-colors">
                            {panchanga.vara.name}
                        </Link>
                        <div className="text-sm text-muted-foreground mt-1">Whole day</div>
                    </div>
                </div>

                {/* Tithi */}
                <div className="flex items-start gap-4 rounded-2xl bg-muted/30 p-4">
                    <Moon className="h-6 w-6 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Tithi</div>
                        <Link href={`/jyotish/panchang/tithis/${panchanga.tithi.slug}`} className="text-lg font-semibold hover:text-orange-400 transition-colors">
                            {panchanga.tithi.name}
                        </Link>
                        {transitions.tithi.endsAt ? (
                            <div className="text-sm text-orange-400/80 mt-1">
                                upto {transitions.tithi.endsAt}, then {transitions.tithi.nextName}
                            </div>
                        ) : null}
                    </div>
                </div>

                {/* Nakshatra */}
                <div className="flex items-start gap-4 rounded-2xl bg-muted/30 p-4">
                    <Star className="h-6 w-6 text-yellow-400 shrink-0 mt-0.5" />
                    <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Nakshatra</div>
                        <div className="text-lg font-semibold">{panchanga.nakshatra.name}</div>
                        {transitions.nakshatra.endsAt ? (
                            <div className="text-sm text-orange-400/80 mt-1">
                                upto {transitions.nakshatra.endsAt}, then {transitions.nakshatra.nextName}
                            </div>
                        ) : null}
                    </div>
                </div>

                {/* Yoga */}
                <div className="flex items-start gap-4 rounded-2xl bg-muted/30 p-4">
                    <Circle className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Yoga</div>
                        <div className="text-lg font-semibold">{panchanga.yoga.name}</div>
                        {transitions.yoga.endsAt ? (
                            <div className="text-sm text-orange-400/80 mt-1">
                                upto {transitions.yoga.endsAt}, then {transitions.yoga.nextName}
                            </div>
                        ) : null}
                    </div>
                </div>

                {/* Karana */}
                <div className="flex items-start gap-4 rounded-2xl bg-muted/30 p-4">
                    <Diamond className="h-6 w-6 text-purple-400 shrink-0 mt-0.5" />
                    <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Karana</div>
                        <div className="text-lg font-semibold">{panchanga.karana.name}</div>
                        {transitions.karana.endsAt ? (
                            <div className="text-sm text-orange-400/80 mt-1">
                                upto {transitions.karana.endsAt}, then {transitions.karana.nextName}
                            </div>
                        ) : null}
                    </div>
                </div>

                {/* Rashi */}
                <div className="flex items-start gap-4 rounded-2xl bg-muted/30 p-4">
                    <MoonStar className="h-6 w-6 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Moon Rashi</div>
                        <div className="text-lg font-semibold">{panchanga.rashi.name}</div>
                        <div className="text-sm text-muted-foreground mt-1">
                            {panchanga.rashi.lunarLongitude.toFixed(2)}°
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
