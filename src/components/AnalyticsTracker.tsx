"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { computeReturnVisit } from "@/lib/analytics/returnVisit";

const RETURN_VISIT_STORAGE_KEY = "sadhaka_return_visit_v1";
const RETURN_VISIT_SESSION_FLAG = "sadhaka_return_visit_fired";

/**
 * Read prior return-visit state, compute the result via the pure module,
 * persist the next state, and fire `return_visit` at most once per session.
 * Storage failures (private mode, quota) are swallowed so analytics never
 * breaks navigation.
 */
function trackReturnVisit() {
    if (typeof window === "undefined") return;

    let stored: unknown = null;
    try {
        const raw = window.localStorage.getItem(RETURN_VISIT_STORAGE_KEY);
        stored = raw ? JSON.parse(raw) : null;
    } catch {
        stored = null;
    }

    const result = computeReturnVisit(Date.now(), stored);

    try {
        window.localStorage.setItem(
            RETURN_VISIT_STORAGE_KEY,
            JSON.stringify(result.nextStored),
        );
    } catch {
        // no-op: persistence is best-effort
    }

    if (!result.isReturn) return;

    let alreadyFired = false;
    try {
        alreadyFired = window.sessionStorage.getItem(RETURN_VISIT_SESSION_FLAG) === "1";
    } catch {
        alreadyFired = false;
    }
    if (alreadyFired) return;

    const params = {
        days_since_last: result.daysSinceLast,
        visit_count: result.visitCount,
    };
    if (typeof window.gtag === "function") {
        window.gtag("event", "return_visit", params);
    }

    try {
        window.sessionStorage.setItem(RETURN_VISIT_SESSION_FLAG, "1");
    } catch {
        // no-op
    }
}

export function AnalyticsTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const lastTrackedPath = useRef<string | null>(null);

    useEffect(() => {
        trackReturnVisit();
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const query = searchParams.toString();
        const pagePath = query ? `${pathname}?${query}` : pathname;

        if (lastTrackedPath.current === pagePath) {
            return;
        }

        lastTrackedPath.current = pagePath;

        if (typeof window.sadhaka?.pageView === "function") {
            window.sadhaka.pageView(pagePath, document.title);
        } else if (typeof window.gtag === "function") {
            window.gtag("event", "page_view", {
                page_path: pagePath,
                page_title: document.title,
                page_location: window.location.href,
            });
        }

        if (typeof window.sadhaka?.appOpen === "function") {
            const sessionKey = "sadhaka_app_open_tracked";
            if (!window.sessionStorage.getItem(sessionKey)) {
                window.sadhaka.appOpen();
                window.sessionStorage.setItem(sessionKey, "1");
            }
        }
    }, [pathname, searchParams]);

    return null;
}