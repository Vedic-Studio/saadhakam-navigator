"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { trackPanchangView } from "@/lib/analytics/events";

/**
 * Props for the live "Today" block. Everything is precomputed on the server from
 * the foundation's `getPanchangForDate` (the ephemeris model is server-only), so
 * this client component stays a thin presenter that also fires the
 * `panchang_view` event once on mount. Keeping all values as plain strings /
 * booleans avoids any hydration mismatch and keeps the panchang engine out of
 * the client bundle.
 */
export interface PanchangTodayBlockProps {
    /** Today's resolved civil date, `YYYY-MM-DD` (Varanasi reference day). */
    today: string;
    /** Human-readable label for today, e.g. "Tuesday, 16 June 2026". */
    todayLabel: string;
    /**
     * The entity this page is about: which panchang limb and its display name,
     * e.g. limb "tithi", name "Shukla Panchami".
     */
    limb: "tithi" | "vara" | "nakshatra";
    entityName: string;
    /** Whether the page's entity is the one in effect today. */
    isToday: boolean;
    /** Next occurrence date `YYYY-MM-DD`, or null when today or unavailable. */
    nextDate: string | null;
    /** Human-readable label for the next occurrence, or null. */
    nextDateLabel: string | null;
    /** Today's full panchang, for the at-a-glance context row. */
    todayPanchang: {
        tithiName: string;
        varaName: string;
        nakshatraName: string | null;
    };
    /** Values passed straight to the panchang_view event. */
    event: {
        tithi: string;
        vara: string;
        nakshatra?: string;
    };
}

const LIMB_NOUN: Record<PanchangTodayBlockProps["limb"], string> = {
    tithi: "tithi",
    vara: "vara",
    nakshatra: "nakshatra",
};

/**
 * Live "Today" answer block for a programmatic panchang detail page.
 *
 * Answers the two daily-recurring questions a searcher asks of these pages:
 * "Is it {entity} today?" and "When is the next {entity}?". Mirrors the sticky
 * `/vedic-clock` model by anchoring the page to the live day. Fires
 * `panchang_view` once on mount to seed the daily-return cohort.
 */
export function PanchangTodayBlock({
    today,
    todayLabel,
    limb,
    entityName,
    isToday,
    nextDate,
    nextDateLabel,
    todayPanchang,
    event,
}: PanchangTodayBlockProps) {
    const firedRef = useRef(false);

    useEffect(() => {
        if (firedRef.current) return;
        firedRef.current = true;
        trackPanchangView({
            date: today,
            tithi: event.tithi,
            vara: event.vara,
            nakshatra: event.nakshatra,
        });
    }, [today, event.tithi, event.vara, event.nakshatra]);

    const noun = LIMB_NOUN[limb];

    return (
        <section
            aria-labelledby="panchang-today-heading"
            className="mb-10 rounded-2xl border border-orange-500/30 bg-orange-500/[0.04] p-6"
        >
            <p className="text-xs uppercase tracking-widest text-orange-400 font-semibold mb-2">
                Live today
            </p>
            <h2 id="panchang-today-heading" className="text-2xl font-semibold mb-3">
                Is it {entityName} today?
            </h2>

            {isToday ? (
                <p className="text-lg text-foreground mb-4">
                    Yes. Today, {todayLabel}, is {entityName}.
                </p>
            ) : nextDateLabel ? (
                <p className="text-lg text-foreground mb-4">
                    No. Today is {todayLabel}. The next {entityName} {noun} is {nextDateLabel}.
                </p>
            ) : (
                <p className="text-lg text-foreground mb-4">
                    Today is {todayLabel}. {entityName} is not in effect today.
                </p>
            )}

            <dl className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-border/40 bg-background/60 p-4">
                    <dt className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Tithi today</dt>
                    <dd className="font-semibold">{todayPanchang.tithiName}</dd>
                </div>
                <div className="rounded-xl border border-border/40 bg-background/60 p-4">
                    <dt className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Vara today</dt>
                    <dd className="font-semibold">{todayPanchang.varaName}</dd>
                </div>
                <div className="rounded-xl border border-border/40 bg-background/60 p-4">
                    <dt className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Nakshatra today</dt>
                    <dd className="font-semibold">{todayPanchang.nakshatraName ?? "Not available"}</dd>
                </div>
            </dl>

            <p className="mt-4 text-sm text-muted-foreground">
                Panchang is computed for Varanasi (Kashi), the reference city.{" "}
                <Link href="/vedic-clock" className="text-orange-400 hover:underline">
                    See the live Vedic clock for your location
                </Link>
                .
            </p>
        </section>
    );
}
