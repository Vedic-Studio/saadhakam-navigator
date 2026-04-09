import { NextResponse } from "next/server";

import { fetchGscCtrAudit } from "@/lib/analytics/google";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function parseIntParam(value: string | null, fallback: number): number {
    if (!value) return fallback;
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    try {
        const data = await fetchGscCtrAudit({
            minImpressions: parseIntParam(searchParams.get("minImpressions"), 100),
            queryRowLimit: parseIntParam(searchParams.get("queryRowLimit"), 500),
            pageRowLimit: parseIntParam(searchParams.get("pageRowLimit"), 500),
            pairRowLimit: parseIntParam(searchParams.get("pairRowLimit"), 1000),
        });
        return NextResponse.json(data, {
            headers: {
                "Cache-Control": "no-store, max-age=0",
            },
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to fetch GSC CTR audit";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
