import { NextResponse } from "next/server";

import { fetchContentAuditData } from "@/lib/analytics/content-audit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const data = await fetchContentAuditData();
        return NextResponse.json(data, {
            headers: {
                "Cache-Control": "no-store, max-age=0",
            },
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to fetch content audit analytics";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}