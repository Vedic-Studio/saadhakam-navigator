import "server-only";

import { getGoogleAccessToken } from "@/lib/google-auth";
import type { Ga4DashboardData, GscDashboardData } from "@/lib/analytics/types";

const GSC_SITE_URL = process.env.GSC_SITE_URL || "sc-domain:opensadhaka.com";
const GSC_SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";
const GA4_SCOPE = "https://www.googleapis.com/auth/analytics.readonly";

type GscApiRow = {
    keys?: string[];
    clicks?: number;
    impressions?: number;
    ctr?: number;
    position?: number;
};

type Ga4ApiResponse = {
    rows?: Array<{
        dimensionValues?: Array<{ value?: string }>;
        metricValues?: Array<{ value?: string }>;
    }>;
};

function getRecentDateRange() {
    const end = new Date();
    end.setUTCDate(end.getUTCDate() - 2);

    const start = new Date(end);
    start.setUTCDate(start.getUTCDate() - 27);

    return {
        startDate: start.toISOString().slice(0, 10),
        endDate: end.toISOString().slice(0, 10),
    };
}

function parseNumber(value?: string) {
    return value ? Number(value) : 0;
}

function normalizePagePath(value: string) {
    if (!value) return "/";

    try {
        if (value.startsWith("http://") || value.startsWith("https://")) {
            const url = new URL(value);
            return `${url.pathname}${url.search}` || "/";
        }
    } catch {
        // fall through to original value
    }

    return value.startsWith("/") ? value : `/${value}`;
}

function mapGscRow(row?: GscApiRow) {
    return {
        clicks: row?.clicks ?? 0,
        impressions: row?.impressions ?? 0,
        ctr: row?.ctr ?? 0,
        position: row?.position ?? 0,
    };
}

async function gscPost<T>(path: string, body: Record<string, unknown>) {
    const token = await getGoogleAccessToken([GSC_SCOPE]);
    const response = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_SITE_URL)}${path}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        cache: "no-store",
    });

    const text = await response.text();
    if (!response.ok) {
        throw new Error(`GSC request failed (${response.status}): ${text}`);
    }

    return (text ? JSON.parse(text) : {}) as T;
}

async function ga4RunReport(body: Record<string, unknown>) {
    const propertyId = process.env.GA4_PROPERTY_ID?.trim();
    if (!propertyId) {
        throw new Error("GA4_PROPERTY_ID is required to fetch GA4 analytics data");
    }

    const token = await getGoogleAccessToken([GA4_SCOPE]);
    const response = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        cache: "no-store",
    });

    const text = await response.text();
    if (!response.ok) {
        throw new Error(`GA4 request failed (${response.status}): ${text}`);
    }

    return {
        propertyId,
        data: (text ? JSON.parse(text) : {}) as Ga4ApiResponse,
    };
}

export async function fetchGscDashboardData(): Promise<GscDashboardData> {
    const range = getRecentDateRange();
    const baseBody = {
        startDate: range.startDate,
        endDate: range.endDate,
    };

    const [overviewResult, queriesResult, pagesResult, trendResult] = await Promise.all([
        gscPost<{ rows?: GscApiRow[] }>("/searchAnalytics/query", {
            ...baseBody,
            rowLimit: 1,
        }),
        gscPost<{ rows?: GscApiRow[] }>("/searchAnalytics/query", {
            ...baseBody,
            dimensions: ["query"],
            rowLimit: 10,
        }),
        gscPost<{ rows?: GscApiRow[] }>("/searchAnalytics/query", {
            ...baseBody,
            dimensions: ["page"],
            rowLimit: 10,
        }),
        gscPost<{ rows?: GscApiRow[] }>("/searchAnalytics/query", {
            ...baseBody,
            dimensions: ["date"],
            rowLimit: 28,
        }),
    ]);

    const overview = mapGscRow(overviewResult.rows?.[0]);

    return {
        source: "gsc",
        siteUrl: GSC_SITE_URL,
        range,
        overview,
        topQueries: (queriesResult.rows ?? []).map((row) => ({
            query: row.keys?.[0] || "(unknown)",
            ...mapGscRow(row),
        })),
        topPages: (pagesResult.rows ?? []).map((row) => ({
            page: normalizePagePath(row.keys?.[0] || "/"),
            ...mapGscRow(row),
        })),
        trend: (trendResult.rows ?? []).map((row) => ({
            date: row.keys?.[0] || "",
            ...mapGscRow(row),
        })),
    };
}

export async function fetchGa4DashboardData(): Promise<Ga4DashboardData> {
    const range = getRecentDateRange();
    const dateRanges = [{ startDate: range.startDate, endDate: range.endDate }];

    const [overviewResult, pagesResult, eventsResult, trendResult, quizFunnelResult] = await Promise.all([
        ga4RunReport({
            dateRanges,
            metrics: [
                { name: "sessions" },
                { name: "activeUsers" },
                { name: "newUsers" },
                { name: "engagementRate" },
            ],
        }),
        ga4RunReport({
            dateRanges,
            dimensions: [{ name: "pagePath" }],
            metrics: [{ name: "screenPageViews" }, { name: "sessions" }],
            orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
            limit: 10,
        }),
        ga4RunReport({
            dateRanges,
            dimensions: [{ name: "eventName" }],
            metrics: [{ name: "eventCount" }],
            orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
            limit: 8,
        }),
        ga4RunReport({
            dateRanges,
            dimensions: [{ name: "date" }],
            metrics: [{ name: "sessions" }, { name: "activeUsers" }],
            orderBys: [{ dimension: { dimensionName: "date" } }],
            limit: 28,
        }),
        ga4RunReport({
            dateRanges,
            dimensions: [{ name: "eventName" }],
            metrics: [{ name: "eventCount" }],
            dimensionFilter: {
                filter: {
                    fieldName: "eventName",
                    inListFilter: {
                        values: [
                            "faith_finder_quiz_start",
                            "faith_finder_quiz_complete",
                            "faith_finder_email_capture",
                        ],
                    },
                },
            },
            limit: 10,
        }),
    ]);

    const overviewRow = overviewResult.data.rows?.[0];
    const quizEventMap = new Map(
        (quizFunnelResult.data.rows ?? []).map((row) => [
            row.dimensionValues?.[0]?.value || "",
            parseNumber(row.metricValues?.[0]?.value),
        ]),
    );

    const quizStart = quizEventMap.get("faith_finder_quiz_start") ?? 0;
    const quizComplete = quizEventMap.get("faith_finder_quiz_complete") ?? 0;
    const emailCapture = quizEventMap.get("faith_finder_email_capture") ?? 0;

    return {
        source: "ga4",
        propertyId: overviewResult.propertyId,
        range,
        overview: {
            sessions: parseNumber(overviewRow?.metricValues?.[0]?.value),
            users: parseNumber(overviewRow?.metricValues?.[1]?.value),
            newUsers: parseNumber(overviewRow?.metricValues?.[2]?.value),
            engagementRate: parseNumber(overviewRow?.metricValues?.[3]?.value),
        },
        topPages: (pagesResult.data.rows ?? []).map((row) => ({
            page: normalizePagePath(row.dimensionValues?.[0]?.value || "/"),
            views: parseNumber(row.metricValues?.[0]?.value),
            sessions: parseNumber(row.metricValues?.[1]?.value),
        })),
        events: (eventsResult.data.rows ?? []).map((row) => ({
            eventName: row.dimensionValues?.[0]?.value || "(unknown)",
            eventCount: parseNumber(row.metricValues?.[0]?.value),
        })),
        trend: (trendResult.data.rows ?? []).map((row) => ({
            date: row.dimensionValues?.[0]?.value || "",
            sessions: parseNumber(row.metricValues?.[0]?.value),
            users: parseNumber(row.metricValues?.[1]?.value),
        })),
        quizFunnel: {
            start: quizStart,
            complete: quizComplete,
            emailCapture,
            completionRate: quizStart > 0 ? quizComplete / quizStart : 0,
            emailCaptureRate: quizComplete > 0 ? emailCapture / quizComplete : 0,
        },
    };
}