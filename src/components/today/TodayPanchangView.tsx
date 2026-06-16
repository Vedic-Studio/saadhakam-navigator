"use client";

/**
 * Side-effect-only island that fires `panchang_view` exactly once when the
 * /today surface mounts. This is the "external trigger" measurement for the
 * daily-return Hook loop: it defines the daily-return cohort. It renders nothing.
 *
 * The panchang itself is computed in the Server Component (SSR-safe
 * `getPanchangForDate`); we only receive the resolved slugs/date as props and
 * report the view from the client, where `window.gtag` exists. A `ref` guard
 * makes it fire once per mount even under React 18/19 strict-mode double-invoke.
 */

import { useEffect, useRef } from "react";
import { trackPanchangView } from "@/lib/analytics/events";

export interface TodayPanchangViewProps {
    date: string;
    tithi: string;
    vara: string;
    nakshatra?: string;
}

export function TodayPanchangView({ date, tithi, vara, nakshatra }: TodayPanchangViewProps) {
    const firedRef = useRef(false);

    useEffect(() => {
        if (firedRef.current) return;
        firedRef.current = true;
        trackPanchangView({ date, tithi, vara, nakshatra });
    }, [date, tithi, vara, nakshatra]);

    return null;
}
