import "server-only";

import { articles } from "@/data/articles";
import type {
    AttributionConfidenceTier,
    ContentAuditBucket,
    ContentAuditData,
    ContentAuditEventCounts,
    ContentPerformanceRow,
    DateRange,
    EditorialQueueItem,
    EditorialQueueOwner,
    EditorialQueuePriority,
    IntentFit,
    PortfolioScorecardRow,
} from "@/lib/analytics/types";
import { getGoogleAccessToken } from "@/lib/google-auth";

const GSC_SITE_URL = process.env.GSC_SITE_URL || "sc-domain:opensadhaka.com";
const GSC_SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";
const GA4_SCOPE = "https://www.googleapis.com/auth/analytics.readonly";
const PRIORITY_COUNTRIES = new Set(["usa", "gbr", "can", "aus", "deu", "nld", "sgp"]);

const HIGH_INTENT_TERMS = [
    "vedanta",
    "upanishad",
    "gita",
    "maya",
    "karma",
    "dharma",
    "consciousness",
    "sanatan",
    "advaita",
    "moksha",
    "brahman",
    "atman",
    "japa",
    "mantra",
];

const MEDIUM_INTENT_TERMS = [
    "meditation",
    "routine",
    "practice",
    "bhakti",
    "jnana",
    "guru",
    "self inquiry",
];

const LOW_INTENT_TERMS = [
    "travel",
    "retreat",
    "ytt",
    "teacher training",
    "celebrity",
    "review",
    "ashram",
    "rishikesh",
    "dharamshala",
    "temple",
];

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

type PageAggregate = {
    page: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
};

type CountryAggregate = {
    country: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
};

type SourceMediumAggregate = {
    sourceMedium: string;
    sessions: number;
    engagedSessions: number;
};

type ReferrerAggregate = {
    referrer: string;
    sessions: number;
    engagedSessions: number;
};

type PageEventAggregate = {
    page: string;
    eventName: string;
    eventCount: number;
};

type LandingPageAggregate = {
    page: string;
    sessions: number;
    engagedSessions: number;
    engagementRate: number;
    averageEngagementTime: number;
};

function getDateRange(days: number, offsetDays = 2): DateRange {
    const end = new Date();
    end.setUTCDate(end.getUTCDate() - offsetDays);
    const start = new Date(end);
    start.setUTCDate(start.getUTCDate() - (days - 1));

    return {
        startDate: start.toISOString().slice(0, 10),
        endDate: end.toISOString().slice(0, 10),
    };
}

function getPreviousRange(range: DateRange): DateRange {
    const start = new Date(`${range.startDate}T00:00:00Z`);
    const end = new Date(`${range.endDate}T00:00:00Z`);
    const diffDays = Math.round((end.getTime() - start.getTime()) / 86_400_000) + 1;
    const previousEnd = new Date(start);
    previousEnd.setUTCDate(previousEnd.getUTCDate() - 1);
    const previousStart = new Date(previousEnd);
    previousStart.setUTCDate(previousStart.getUTCDate() - (diffDays - 1));

    return {
        startDate: previousStart.toISOString().slice(0, 10),
        endDate: previousEnd.toISOString().slice(0, 10),
    };
}

function parseNumber(value?: string) {
    return value ? Number(value) : 0;
}

function round(value: number, digits = 2) {
    const factor = 10 ** digits;
    return Math.round(value * factor) / factor;
}

function normalizePagePath(value: string) {
    if (!value) return "/";

    try {
        if (value.startsWith("http://") || value.startsWith("https://")) {
            const url = new URL(value);
            return `${url.pathname}${url.search}` || "/";
        }
    } catch {
        // no-op
    }

    return value.startsWith("/") ? value.split("?")[0] : `/${value.split("?")[0]}`;
}

function mapGscRow(row?: GscApiRow) {
    return {
        clicks: row?.clicks ?? 0,
        impressions: row?.impressions ?? 0,
        ctr: row?.ctr ?? 0,
        position: row?.position ?? 0,
    };
}

function sumBy<T>(rows: T[], selector: (row: T) => number) {
    return rows.reduce((sum, row) => sum + selector(row), 0);
}

function weightedCtr(rows: Array<{ clicks: number; impressions: number }>) {
    const impressions = sumBy(rows, (row) => row.impressions);
    if (impressions === 0) return 0;
    return sumBy(rows, (row) => row.clicks) / impressions;
}

function weightedPosition(rows: Array<{ position: number; impressions: number }>) {
    const impressions = sumBy(rows, (row) => row.impressions);
    if (impressions === 0) return 0;
    return sumBy(rows, (row) => row.position * row.impressions) / impressions;
}

function routeFamilyForPath(path: string) {
    return path.split("/").filter(Boolean)[0] || "root";
}

function attributionConfidenceTier(score: number): AttributionConfidenceTier {
    if (score >= 75) return "high";
    if (score >= 45) return "medium";
    return "low";
}

function attributionNotesForRow(events: ContentAuditEventCounts): string[] {
    const notes: string[] = [];

    if (events.articleRead === 0) {
        notes.push("No article-read signal recorded for this route in the audit window.");
    }
    if (events.ctaClick === 0) {
        notes.push("No CTA-click signal recorded, so quiz progression is inferred from page proximity.");
    }
    if (events.quizComplete + events.emailCapture > 0 && events.ctaClick === 0) {
        notes.push("Qualification events exist without observed CTA clicks, reducing causal confidence.");
    }
    if (events.resultView + events.resultShare > 0) {
        notes.push("Downstream result events add behavioral support, but route-level matching remains inferred.");
    }

    if (notes.length === 0) {
        notes.push("Article read, CTA activity, and downstream qualification signals are all present on this route.");
    }

    return notes;
}

function intentFitForText(text: string): IntentFit {
    const normalized = text.toLowerCase();
    if (HIGH_INTENT_TERMS.some((term) => normalized.includes(term))) return "high";
    if (MEDIUM_INTENT_TERMS.some((term) => normalized.includes(term))) return "medium";
    if (LOW_INTENT_TERMS.some((term) => normalized.includes(term))) return "low";
    return "mixed";
}

function intentScore(intentFit: IntentFit) {
    switch (intentFit) {
        case "high":
            return 100;
        case "medium":
            return 70;
        case "mixed":
            return 40;
        case "low":
            return 10;
    }
}

async function gscPost<T>(body: Record<string, unknown>) {
    const token = await getGoogleAccessToken([GSC_SCOPE]);
    const response = await fetch(
        `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_SITE_URL)}/searchAnalytics/query`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            cache: "no-store",
        },
    );

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

    return (text ? JSON.parse(text) : {}) as Ga4ApiResponse;
}

function aggregateGscPages(rows: GscApiRow[] = []): PageAggregate[] {
    const grouped = new Map<string, GscApiRow[]>();
    for (const row of rows) {
        const page = normalizePagePath(row.keys?.[0] || "/");
        grouped.set(page, [...(grouped.get(page) ?? []), row]);
    }

    return [...grouped.entries()].map(([page, pageRows]) => ({
        page,
        clicks: sumBy(pageRows, (row) => row.clicks ?? 0),
        impressions: sumBy(pageRows, (row) => row.impressions ?? 0),
        ctr: weightedCtr(pageRows.map((row) => ({ clicks: row.clicks ?? 0, impressions: row.impressions ?? 0 }))),
        position: weightedPosition(pageRows.map((row) => ({ position: row.position ?? 0, impressions: row.impressions ?? 0 }))),
    }));
}

function aggregateCountries(rows: GscApiRow[] = []): CountryAggregate[] {
    return rows.map((row) => ({
        country: (row.keys?.[0] || "unknown").toLowerCase(),
        ...mapGscRow(row),
    }));
}

function aggregateLandingPages(rows: Ga4ApiResponse["rows"]): LandingPageAggregate[] {
    return (rows ?? []).map((row) => ({
        page: normalizePagePath(row.dimensionValues?.[0]?.value || "/"),
        sessions: parseNumber(row.metricValues?.[0]?.value),
        engagedSessions: parseNumber(row.metricValues?.[1]?.value),
        engagementRate: parseNumber(row.metricValues?.[2]?.value),
        averageEngagementTime: parseNumber(row.metricValues?.[3]?.value),
    }));
}

function aggregateSourceMedium(rows: Ga4ApiResponse["rows"]): SourceMediumAggregate[] {
    return (rows ?? []).map((row) => ({
        sourceMedium: row.dimensionValues?.[0]?.value || "(direct) / (none)",
        sessions: parseNumber(row.metricValues?.[0]?.value),
        engagedSessions: parseNumber(row.metricValues?.[1]?.value),
    }));
}

function aggregateReferrer(rows: Ga4ApiResponse["rows"]): ReferrerAggregate[] {
    return (rows ?? []).map((row) => ({
        referrer: row.dimensionValues?.[0]?.value || "(direct)",
        sessions: parseNumber(row.metricValues?.[0]?.value),
        engagedSessions: parseNumber(row.metricValues?.[1]?.value),
    }));
}

function aggregatePageEvents(rows: Ga4ApiResponse["rows"]): Map<string, ContentAuditEventCounts> {
    const grouped = new Map<string, PageEventAggregate[]>();

    for (const row of rows ?? []) {
        const page = normalizePagePath(row.dimensionValues?.[0]?.value || "/");
        const eventName = row.dimensionValues?.[1]?.value || "unknown";
        const eventCount = parseNumber(row.metricValues?.[0]?.value);
        grouped.set(page, [...(grouped.get(page) ?? []), { page, eventName, eventCount }]);
    }

    const toCounts = (pageRows: PageEventAggregate[]): ContentAuditEventCounts => {
        const map = new Map(pageRows.map((row) => [row.eventName, row.eventCount]));
        return {
            quizComplete: map.get("faith_finder_quiz_complete") ?? 0,
            emailCapture: map.get("faith_finder_email_capture") ?? 0,
            resultView: map.get("faith_finder_result_view") ?? 0,
            resultShare: map.get("faith_finder_result_share") ?? 0,
            articleRead: map.get("seo_article_read") ?? 0,
            ctaClick: map.get("cta_click") ?? 0,
            pathExplore: map.get("path_explore") ?? 0,
            pageView: map.get("page_view") ?? 0,
            appOpen: map.get("app_open") ?? 0,
        };
    };

    return new Map([...grouped.entries()].map(([page, pageRows]) => [page, toCounts(pageRows)]));
}

export function decideBucket(row: ContentPerformanceRow): ContentAuditBucket {
    const qualified = row.ga4.events.quizComplete + row.ga4.events.emailCapture;
    const strongTraffic = row.gsc.clicks >= 20 || row.ga4.sessions >= 20;
    const highImpressions = row.gsc.impressions >= 100;
    const middlingPosition = row.gsc.position >= 4 && row.gsc.position <= 15;

    if (row.icp.score >= 70 && strongTraffic && qualified > 0) return "double-down";
    if (row.icp.score >= 65 && highImpressions && middlingPosition && row.gsc.ctr < 0.03) return "improve-ctr-rank";
    if (strongTraffic && qualified === 0 && row.ga4.events.articleRead > 0) return "improve-conversion-path";
    if (row.icp.score >= 60 && row.relatedLinkDepth < 4) return "expand-cluster";
    if (row.aeoLlmFlags.length > 0 && row.icp.score >= 40) return "aeo-llm-repair";
    if (row.icp.score < 35 && qualified === 0) return "deprioritize-or-contain";
    return "monitor";
}

function scorecardFromRows(rows: ContentPerformanceRow[], selectLabel: (row: ContentPerformanceRow) => string): PortfolioScorecardRow[] {
    const grouped = new Map<string, ContentPerformanceRow[]>();
    for (const row of rows) {
        const label = selectLabel(row);
        grouped.set(label, [...(grouped.get(label) ?? []), row]);
    }

    return [...grouped.entries()]
        .map(([label, group]) => ({
            label,
            pages: group.length,
            clicks: sumBy(group, (row) => row.gsc.clicks),
            sessions: sumBy(group, (row) => row.ga4.sessions),
            qualifiedConversions: sumBy(group, (row) => row.ga4.events.quizComplete + row.ga4.events.emailCapture),
            averageIcpScore: round(sumBy(group, (row) => row.icp.score) / Math.max(group.length, 1), 1),
        }))
        .sort((a, b) => b.averageIcpScore - a.averageIcpScore);
}

export function queueOwnerForBucket(bucket: ContentAuditBucket): EditorialQueueOwner {
    switch (bucket) {
        case "double-down":
        case "expand-cluster":
            return "editorial";
        case "improve-ctr-rank":
            return "seo";
        case "improve-conversion-path":
            return "conversion";
        case "aeo-llm-repair":
            return "aeo";
        case "deprioritize-or-contain":
        case "monitor":
            return "strategy";
    }
}

export function queuePriorityForRow(row: ContentPerformanceRow): EditorialQueuePriority {
    const qualified = row.ga4.events.quizComplete + row.ga4.events.emailCapture;

    if (row.decisionBucket === "deprioritize-or-contain") return "hold";
    if (
        row.decisionBucket === "improve-conversion-path" ||
        row.decisionBucket === "aeo-llm-repair" ||
        (row.decisionBucket === "double-down" && row.icp.score >= 75)
    ) {
        return "p1";
    }
    if (
        row.decisionBucket === "improve-ctr-rank" ||
        row.decisionBucket === "expand-cluster" ||
        (row.decisionBucket === "double-down" && qualified > 0)
    ) {
        return "p2";
    }
    return "p3";
}

export function queueTargetWindowForPriority(priority: EditorialQueuePriority): EditorialQueueItem["targetWindow"] {
    switch (priority) {
        case "p1":
            return "this-week";
        case "p2":
            return "next-sprint";
        case "p3":
            return "backlog";
        case "hold":
            return "hold";
    }
}

export function proposedFixForRow(row: ContentPerformanceRow) {
    switch (row.decisionBucket) {
        case "double-down":
            return "Refresh and expand the page, then amplify internal links from relevant supporting articles.";
        case "improve-ctr-rank":
            return "Test title, meta description, and intro framing to convert existing impressions into more clicks.";
        case "improve-conversion-path":
            return "Improve CTA placement, bridge copy, and quiz-path alignment so engaged readers qualify downstream.";
        case "expand-cluster":
            return "Plan adjacent spoke content and add deeper contextual related links around this topic.";
        case "aeo-llm-repair":
            return "Backfill direct-answer blocks, strengthen citeability cues, and deepen related-link support.";
        case "deprioritize-or-contain":
            return "Keep on hold unless a new strategic reason appears to invest further in this page.";
        case "monitor":
            return "Monitor performance for another cycle before assigning a heavier editorial intervention.";
    }
}

export function buildEditorialQueueItem(row: ContentPerformanceRow): EditorialQueueItem {
    const priority = queuePriorityForRow(row);
    const quizComplete = row.ga4.events.quizComplete;
    const emailCapture = row.ga4.events.emailCapture;

    return {
        route: row.route,
        title: row.title,
        decisionBucket: row.decisionBucket,
        priority,
        owner: queueOwnerForBucket(row.decisionBucket),
        targetWindow: queueTargetWindowForPriority(priority),
        proposedFix: proposedFixForRow(row),
        icpScore: row.icp.score,
        traffic: {
            clicks: row.gsc.clicks,
            impressions: row.gsc.impressions,
            sessions: row.ga4.sessions,
        },
        qualification: {
            quizComplete,
            emailCapture,
            qualifiedConversions: quizComplete + emailCapture,
        },
        attribution: {
            confidenceTier: row.attribution.confidenceTier,
            confidenceScore: row.attribution.confidenceScore,
        },
        aeoLlmFlags: row.aeoLlmFlags,
    };
}

export async function fetchContentAuditData(): Promise<ContentAuditData> {
    const current = getDateRange(90);
    const previous = getPreviousRange(current);

    const [
        gscPagesCurrentResult,
        gscPagesPreviousResult,
        gscQueriesCurrentResult,
        gscCountriesCurrentResult,
        gaPagesCurrentResult,
        gaPagesPreviousResult,
        gaSourceMediumCurrentResult,
        gaReferrerCurrentResult,
        gaPageEventsCurrentResult,
    ] = await Promise.all([
        gscPost<{ rows?: GscApiRow[] }>({ ...current, dimensions: ["page"], rowLimit: 250 }),
        gscPost<{ rows?: GscApiRow[] }>({ ...previous, dimensions: ["page"], rowLimit: 250 }),
        gscPost<{ rows?: GscApiRow[] }>({ ...current, dimensions: ["query"], rowLimit: 100 }),
        gscPost<{ rows?: GscApiRow[] }>({ ...current, dimensions: ["country"], rowLimit: 50 }),
        ga4RunReport({
            dateRanges: [current],
            dimensions: [{ name: "landingPagePlusQueryString" }],
            metrics: [
                { name: "sessions" },
                { name: "engagedSessions" },
                { name: "engagementRate" },
                { name: "averageSessionDuration" },
            ],
            orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
            limit: 250,
        }),
        ga4RunReport({
            dateRanges: [previous],
            dimensions: [{ name: "landingPagePlusQueryString" }],
            metrics: [{ name: "sessions" }],
            orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
            limit: 250,
        }),
        ga4RunReport({
            dateRanges: [current],
            dimensions: [{ name: "sessionSourceMedium" }],
            metrics: [{ name: "sessions" }, { name: "engagedSessions" }],
            orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
            limit: 20,
        }),
        ga4RunReport({
            dateRanges: [current],
            dimensions: [{ name: "fullReferrer" }],
            metrics: [{ name: "sessions" }, { name: "engagedSessions" }],
            orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
            limit: 20,
        }),
        ga4RunReport({
            dateRanges: [current],
            dimensions: [{ name: "landingPagePlusQueryString" }, { name: "eventName" }],
            metrics: [{ name: "eventCount" }],
            dimensionFilter: {
                filter: {
                    fieldName: "eventName",
                    inListFilter: {
                        values: [
                            "faith_finder_quiz_complete",
                            "faith_finder_email_capture",
                            "faith_finder_result_view",
                            "faith_finder_result_share",
                            "seo_article_read",
                            "cta_click",
                            "path_explore",
                            "page_view",
                            "app_open",
                        ],
                    },
                },
            },
            orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
            limit: 500,
        }),
    ]);

    const currentGscPages = aggregateGscPages(gscPagesCurrentResult.rows);
    const previousGscPages = new Map(aggregateGscPages(gscPagesPreviousResult.rows).map((row) => [row.page, row]));
    const topQueries = (gscQueriesCurrentResult.rows ?? []).map((row) => ({
        query: row.keys?.[0] || "(unknown)",
        ...mapGscRow(row),
    }));
    const topCountries = aggregateCountries(gscCountriesCurrentResult.rows);
    const currentLandingPages = new Map(aggregateLandingPages(gaPagesCurrentResult.rows).map((row) => [row.page, row]));
    const previousLandingSessions = new Map(
        (gaPagesPreviousResult.rows ?? []).map((row) => [
            normalizePagePath(row.dimensionValues?.[0]?.value || "/"),
            parseNumber(row.metricValues?.[0]?.value),
        ]),
    );
    const sourceMediumRows = aggregateSourceMedium(gaSourceMediumCurrentResult.rows);
    const referrerRows = aggregateReferrer(gaReferrerCurrentResult.rows);
    const pageEvents = aggregatePageEvents(gaPageEventsCurrentResult.rows);

    const totalPriorityCountryClicks = sumBy(
        topCountries.filter((country) => PRIORITY_COUNTRIES.has(country.country)),
        (country) => country.clicks,
    );
    const totalCountryClicks = Math.max(sumBy(topCountries, (country) => country.clicks), 1);
    const geoFit = round((totalPriorityCountryClicks / totalCountryClicks) * 100, 1);

    const pageRows = articles
        .map<ContentPerformanceRow>((article) => {
            const currentGsc = currentGscPages.find((row) => row.page === article.route) ?? {
                page: article.route,
                clicks: 0,
                impressions: 0,
                ctr: 0,
                position: 0,
            };
            const previousGsc = previousGscPages.get(article.route);
            const landing = currentLandingPages.get(article.route) ?? {
                page: article.route,
                sessions: 0,
                engagedSessions: 0,
                engagementRate: 0,
                averageEngagementTime: 0,
            };
            const previousSessions = previousLandingSessions.get(article.route) ?? 0;
            const events = pageEvents.get(article.route) ?? {
                quizComplete: 0,
                emailCapture: 0,
                resultView: 0,
                resultShare: 0,
                articleRead: 0,
                ctaClick: 0,
                pathExplore: 0,
                pageView: 0,
                appOpen: 0,
            };

            const intentFit = intentFitForText(`${article.title} ${article.primaryKeyword}`);
            const behaviorFit = Math.min(100, round(events.articleRead * 8 + events.ctaClick * 12 + events.pathExplore * 10 + landing.engagementRate * 40, 1));
            const qualificationFitRaw = Math.min(100, round(events.quizComplete * 20 + events.emailCapture * 25 + events.resultView * 8 + events.resultShare * 10, 1));
            const hasJourneySignals = events.articleRead > 0 && events.ctaClick > 0 && (events.quizComplete > 0 || events.emailCapture > 0);
            const attributionConfidenceScore = Math.min(
                100,
                round(
                    (events.articleRead > 0 ? 25 : 0) +
                    (events.ctaClick > 0 ? 30 : 0) +
                    (events.quizComplete + events.emailCapture > 0 ? 25 : 0) +
                    (events.resultView + events.resultShare > 0 ? 10 : 0) +
                    (hasJourneySignals ? 10 : 0),
                    1,
                ),
            );
            const qualificationWeight = attributionConfidenceScore >= 75 ? 1 : attributionConfidenceScore >= 45 ? 0.7 : 0.4;
            const qualificationFit = round(qualificationFitRaw * qualificationWeight, 1);
            const icpScore = round(intentScore(intentFit) * 0.35 + geoFit * 0.15 + behaviorFit * 0.2 + qualificationFit * 0.3, 1);
            const aeoLlmFlags = [
                !article.aeoAnswer ? "Missing direct-answer metadata" : null,
                article.relatedLinks.length < 4 ? "Thin related-link support" : null,
                !article.footerCta?.href ? "Missing explicit CTA target" : null,
            ].filter(Boolean) as string[];

            const row: ContentPerformanceRow = {
                route: article.route,
                title: article.title,
                pillar: article.pillar,
                routeFamily: routeFamilyForPath(article.route),
                publishDate: article.publishDate ?? null,
                primaryKeyword: article.primaryKeyword ?? null,
                standardizedArticleSystem: true,
                hasAeoAnswer: Boolean(article.aeoAnswer),
                ctaTarget: article.footerCta?.href ?? null,
                relatedLinkDepth: article.relatedLinks.length,
                topQueries: topQueries
                    .filter((query) => query.query.toLowerCase().includes(article.primaryKeyword.toLowerCase().split(" ")[0]))
                    .slice(0, 3)
                    .map((query) => query.query),
                topCountries: topCountries.slice(0, 3).map((country) => ({ country: country.country, clicks: country.clicks })),
                topSourceMediums: sourceMediumRows.slice(0, 3).map((row) => ({ sourceMedium: row.sourceMedium, sessions: row.sessions })),
                topReferrers: referrerRows.slice(0, 3).map((row) => ({ referrer: row.referrer, sessions: row.sessions })),
                gsc: {
                    clicks: currentGsc.clicks,
                    impressions: currentGsc.impressions,
                    ctr: currentGsc.ctr,
                    position: currentGsc.position,
                    clicksDelta: round(currentGsc.clicks - (previousGsc?.clicks ?? 0), 1),
                    impressionsDelta: round(currentGsc.impressions - (previousGsc?.impressions ?? 0), 1),
                    ctrDelta: round(currentGsc.ctr - (previousGsc?.ctr ?? 0), 3),
                    positionDelta: round(currentGsc.position - (previousGsc?.position ?? 0), 1),
                },
                ga4: {
                    sessions: landing.sessions,
                    sessionsDelta: round(landing.sessions - previousSessions, 1),
                    engagedSessions: landing.engagedSessions,
                    engagementRate: landing.engagementRate,
                    averageEngagementTime: landing.averageEngagementTime,
                    events,
                },
                attribution: {
                    confidenceScore: attributionConfidenceScore,
                    confidenceTier: attributionConfidenceTier(attributionConfidenceScore),
                    qualificationWeight,
                    hasJourneySignals,
                    notes: attributionNotesForRow(events),
                },
                icp: {
                    score: icpScore,
                    intentFit,
                    geoFit,
                    behaviorFit,
                    qualificationFitRaw,
                    qualificationFit,
                },
                decisionBucket: "monitor",
                aeoLlmFlags,
            };

            row.decisionBucket = decideBucket(row);
            return row;
        })
        .sort((a, b) => b.icp.score - a.icp.score);

    const editorialQueueItems = pageRows
        .filter((row) => row.decisionBucket !== "monitor" || row.icp.score >= 50)
        .map(buildEditorialQueueItem)
        .sort((a, b) => b.icpScore - a.icpScore);

    const editorialQueues = {
        p1: editorialQueueItems.filter((item) => item.priority === "p1").slice(0, 12),
        p2: editorialQueueItems.filter((item) => item.priority === "p2").slice(0, 12),
        p3: editorialQueueItems.filter((item) => item.priority === "p3").slice(0, 12),
        hold: editorialQueueItems.filter((item) => item.priority === "hold").slice(0, 12),
        byBucket: ([
            "double-down",
            "improve-ctr-rank",
            "improve-conversion-path",
            "expand-cluster",
            "aeo-llm-repair",
            "deprioritize-or-contain",
            "monitor",
        ] as const).map((bucket) => ({
            bucket,
            items: editorialQueueItems.filter((item) => item.decisionBucket === bucket).slice(0, 8),
        })),
    };

    return {
        source: "content-audit",
        generatedAt: new Date().toISOString(),
        range: { current, previous },
        executiveSummary: {
            overview: [
                "This layer joins 90-day GSC visibility, GA4 landing-page behavior, and article metadata into one strategic content audit table.",
                "Quiz completion and email capture are treated as the strongest qualification signals, above sessions and page views.",
                "Direct-answer coverage and internal-link depth are folded into AEO/LLM readiness rather than treated as separate commentary.",
            ],
            biggestLeaks: pageRows
                .filter((row) => row.decisionBucket === "improve-conversion-path")
                .slice(0, 3)
                .map((row) => `${row.title} gets attention but weak downstream qualification.`),
            growthBets: pageRows
                .filter((row) => ["double-down", "expand-cluster", "improve-ctr-rank"].includes(row.decisionBucket))
                .slice(0, 5)
                .map((row) => `${row.title} → ${row.decisionBucket}`),
        },
        methodology: {
            notes: [
                "Data sources: Google Search Console page/query/country views; GA4 landing-page, source/medium, referrer, and page-event views; repository article metadata.",
                "ICP score combines intent fit, geo fit, behavioral depth, and attribution-weighted qualification depth.",
            ],
            instrumentationCaveats: [
                "Current event coverage is strong enough for inferred ICP scoring but not for precise article-to-quiz attribution modeling.",
                "Qualification fit is downweighted when journey linkage is weak, so low-confidence rows stop implying false causal precision.",
                "llms-full.txt still exposes metadata plus FAQs, not full editorial body content.",
                "brand-facts is useful but still generic about authority model and editorial method.",
            ],
        },
        portfolioScorecard: {
            byPillar: scorecardFromRows(pageRows, (row) => row.pillar),
            byRouteFamily: scorecardFromRows(pageRows, (row) => row.routeFamily),
            byDecisionBucket: scorecardFromRows(pageRows, (row) => row.decisionBucket),
        },
        winners: pageRows.filter((row) => row.decisionBucket === "double-down").slice(0, 8),
        rankingOpportunities: pageRows.filter((row) => row.decisionBucket === "improve-ctr-rank").slice(0, 8),
        conversionLeaks: pageRows.filter((row) => row.decisionBucket === "improve-conversion-path").slice(0, 8),
        clusterExpansion: pageRows.filter((row) => row.decisionBucket === "expand-cluster").slice(0, 8),
        deprioritized: pageRows.filter((row) => row.decisionBucket === "deprioritize-or-contain").slice(0, 8),
        aeoLlmRepairs: pageRows.filter((row) => row.decisionBucket === "aeo-llm-repair").slice(0, 8),
        topQueries: topQueries.slice(0, 15),
        topCountries: topCountries.slice(0, 10).map((country) => ({
            ...country,
            priorityMarket: PRIORITY_COUNTRIES.has(country.country),
        })),
        topSourceMediums: sourceMediumRows.slice(0, 10),
        topReferrers: referrerRows.slice(0, 10),
        pageRows,
        citeabilityAudit: {
            articleLayoutCoverage: {
                usingArticleLayout: articles.length,
                totalMappedArticles: articles.length,
            },
            directAnswerCoverage: {
                pagesWithAeoAnswer: articles.filter((article) => Boolean(article.aeoAnswer)).length,
                totalMappedArticles: articles.length,
            },
            llmsFullIncludesEditorialBodies: false,
            brandFactsNeedsAuthorityUpgrade: true,
            priorities: [
                "Upgrade llms-full.txt to include real editorial substance, not only metadata and FAQs.",
                "Express editorial method, source-grounding, and canonical authority more explicitly in brand-facts.json/page.",
                "Standardize high-value legacy content onto the stronger ArticleLayout-style AEO system.",
            ],
        },
        editorialQueues,
        actionPlan: {
            refreshNow: pageRows.slice(0, 3).map((row) => `Refresh ${row.title} with stronger direct-answer, internal-link, and CTA alignment.`),
            buildNext: pageRows.filter((row) => row.decisionBucket === "expand-cluster").slice(0, 3).map((row) => `Build adjacent spoke content around ${row.title}.`),
            internalLinkFixes: pageRows.filter((row) => row.relatedLinkDepth < 4).slice(0, 5).map((row) => `Increase contextual related-link depth for ${row.title}.`),
            aeoLlmInfraFixes: [
                "Expose fuller editorial content in llms-full.txt or an LLM markdown export.",
                "Strengthen brand-facts authority framing and editorial method.",
                "Backfill direct-answer/schema consistency on priority pages.",
            ],
            instrumentationLater: [
                "Add explicit article-to-quiz attribution metadata on CTA events.",
                "Pass page archetype/template markers into analytics payloads.",
                "Expose GA4 custom dimensions for attribution token, source route, CTA slot, and archetype so audit joins can move beyond route proximity.",
                "Capture richer downstream qualification context on result and email events.",
            ],
        },
    };
}