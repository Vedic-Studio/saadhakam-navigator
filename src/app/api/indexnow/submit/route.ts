import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type ProviderName = "bing" | "yandex";

type ProviderSubmissionResult = {
    provider: ProviderName;
    ok: boolean;
    status: number;
    error?: string;
};

type UrlSubmissionResult = {
    url: string;
    providers: ProviderSubmissionResult[];
    allSucceeded: boolean;
};

const INDEXNOW_PROVIDERS: { name: ProviderName; endpoint: string }[] = [
    { name: "bing", endpoint: "https://www.bing.com/indexnow" },
    { name: "yandex", endpoint: "https://yandex.com/indexnow" },
];

const DEFAULT_SITE_URL = "https://opensadhaka.com";
const MAX_URLS_PER_REQUEST = 50;
const SEARCH_CONSOLE_INSPECT_ENDPOINT = "https://search.google.com/search-console/inspect";

function sanitizeSiteOrigin(siteUrl: string): string {
    try {
        const origin = new URL(siteUrl).origin;
        return origin.replace(/\/$/, "");
    } catch {
        return DEFAULT_SITE_URL;
    }
}

function resolveSearchConsoleProperty(siteOrigin: string): string {
    const configured = process.env.GSC_PROPERTY?.trim();

    if (!configured) {
        return `sc-domain:${new URL(siteOrigin).host}`;
    }

    if (configured.startsWith("sc-domain:")) {
        return configured;
    }

    if (configured.startsWith("http://") || configured.startsWith("https://")) {
        return `${sanitizeSiteOrigin(configured)}/`;
    }

    if (/^[a-z0-9.-]+$/i.test(configured)) {
        return `sc-domain:${configured}`;
    }

    return configured;
}

function buildSearchConsoleInspectUrl(url: string, property: string): string {
    const endpoint = new URL(SEARCH_CONSOLE_INSPECT_ENDPOINT);
    endpoint.searchParams.set("resource_id", property);
    endpoint.searchParams.set("id", url);
    return endpoint.toString();
}

function extractUrlsFromPayload(payload: unknown): string[] {
    if (!payload || typeof payload !== "object") {
        return [];
    }

    const maybePayload = payload as { url?: unknown; urls?: unknown };

    if (Array.isArray(maybePayload.urls)) {
        return maybePayload.urls.filter((value): value is string => typeof value === "string");
    }

    if (typeof maybePayload.url === "string") {
        return [maybePayload.url];
    }

    return [];
}

function normalizeUrls(rawUrls: string[], siteOrigin: string) {
    const siteHost = new URL(siteOrigin).host;
    const deduped = new Set<string>();
    const invalid: string[] = [];

    for (const raw of rawUrls) {
        const candidate = raw.trim();
        if (!candidate) continue;

        try {
            const parsed = candidate.startsWith("/")
                ? new URL(candidate, siteOrigin)
                : new URL(candidate);

            if (!["http:", "https:"].includes(parsed.protocol)) {
                invalid.push(raw);
                continue;
            }

            if (parsed.host !== siteHost) {
                invalid.push(raw);
                continue;
            }

            deduped.add(parsed.toString());
        } catch {
            invalid.push(raw);
        }
    }

    return {
        normalized: Array.from(deduped).slice(0, MAX_URLS_PER_REQUEST),
        invalid,
    };
}

function isAuthorized(request: NextRequest): boolean {
    const expectedToken = process.env.INDEXNOW_SUBMIT_TOKEN?.trim();
    if (!expectedToken) return true;

    const tokenFromHeader = request.headers.get("x-indexnow-token")?.trim();
    const authHeader = request.headers.get("authorization")?.trim();
    const bearerToken = authHeader?.toLowerCase().startsWith("bearer ")
        ? authHeader.slice(7).trim()
        : undefined;

    return tokenFromHeader === expectedToken || bearerToken === expectedToken;
}

async function submitUrlToProvider(
    url: string,
    key: string,
    keyLocation: string,
    provider: { name: ProviderName; endpoint: string },
): Promise<ProviderSubmissionResult> {
    try {
        const endpoint = new URL(provider.endpoint);
        endpoint.searchParams.set("url", url);
        endpoint.searchParams.set("key", key);
        endpoint.searchParams.set("keyLocation", keyLocation);

        const response = await fetch(endpoint.toString(), {
            method: "GET",
            cache: "no-store",
        });

        return {
            provider: provider.name,
            ok: response.ok,
            status: response.status,
            error: response.ok ? undefined : `Provider returned status ${response.status}`,
        };
    } catch (error) {
        return {
            provider: provider.name,
            ok: false,
            status: 500,
            error: error instanceof Error ? error.message : "Unknown submission error",
        };
    }
}

export async function GET() {
    const key = process.env.INDEXNOW_KEY?.trim();
    const siteOrigin = sanitizeSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL);
    const searchConsoleProperty = resolveSearchConsoleProperty(siteOrigin);

    return NextResponse.json({
        configured: Boolean(key),
        siteOrigin,
        keyVerificationUrl: key ? `${siteOrigin}/${key}.txt` : null,
        usage: {
            method: "POST",
            endpoint: "/api/indexnow/submit",
            body: {
                urls: [
                    `${siteOrigin}/what-is-vedanta`,
                    `${siteOrigin}/how-to-start-japa`,
                ],
            },
            auth: process.env.INDEXNOW_SUBMIT_TOKEN
                ? "Set x-indexnow-token or Authorization: Bearer <token>"
                : "No token required (INDEXNOW_SUBMIT_TOKEN not set)",
            searchConsole: {
                property: searchConsoleProperty,
                inspectExample: buildSearchConsoleInspectUrl(
                    `${siteOrigin}/what-is-vedanta`,
                    searchConsoleProperty,
                ),
                note:
                    "Open inspect URL(s) and click Request Indexing in Search Console. Google does not support a general-purpose auto-indexing API for all page types.",
            },
        },
    });
}

export async function POST(request: NextRequest) {
    if (!isAuthorized(request)) {
        return NextResponse.json(
            { error: "Unauthorized request" },
            { status: 401 },
        );
    }

    const key = process.env.INDEXNOW_KEY?.trim();
    if (!key) {
        return NextResponse.json(
            { error: "INDEXNOW_KEY environment variable not configured" },
            { status: 500 },
        );
    }

    const siteOrigin = sanitizeSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL);
    const keyLocation = `${siteOrigin}/${key}.txt`;
    const searchConsoleProperty = resolveSearchConsoleProperty(siteOrigin);

    let payload: unknown;
    try {
        payload = await request.json();
    } catch {
        return NextResponse.json(
            { error: "Invalid JSON body" },
            { status: 400 },
        );
    }

    const rawUrls = extractUrlsFromPayload(payload);
    const { normalized, invalid } = normalizeUrls(rawUrls, siteOrigin);

    if (normalized.length === 0) {
        return NextResponse.json(
            {
                error: "No valid URLs found in payload",
                hint: `Provide { "urls": ["${siteOrigin}/some-path"] }`,
                invalid,
            },
            { status: 400 },
        );
    }

    const results: UrlSubmissionResult[] = [];

    for (const url of normalized) {
        const providerResults = await Promise.all(
            INDEXNOW_PROVIDERS.map((provider) =>
                submitUrlToProvider(url, key, keyLocation, provider),
            ),
        );

        results.push({
            url,
            providers: providerResults,
            allSucceeded: providerResults.every((result) => result.ok),
        });
    }

    const totalProviderCalls = results.reduce(
        (sum, row) => sum + row.providers.length,
        0,
    );
    const successfulProviderCalls = results.reduce(
        (sum, row) => sum + row.providers.filter((provider) => provider.ok).length,
        0,
    );

    return NextResponse.json({
        submittedUrls: normalized.length,
        totalProviderCalls,
        successfulProviderCalls,
        failedProviderCalls: totalProviderCalls - successfulProviderCalls,
        keyLocation,
        searchConsole: {
            property: searchConsoleProperty,
            requestIndexingLinks: normalized.map((url) => ({
                url,
                inspectUrl: buildSearchConsoleInspectUrl(url, searchConsoleProperty),
            })),
            note:
                "Open each inspectUrl and click Request Indexing in Google Search Console.",
        },
        droppedInvalidUrls: invalid,
        results,
    });
}
