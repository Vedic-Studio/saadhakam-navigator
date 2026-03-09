"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function AnalyticsTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const lastTrackedPath = useRef<string | null>(null);

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