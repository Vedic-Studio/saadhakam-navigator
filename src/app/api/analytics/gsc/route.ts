import { NextResponse } from "next/server";

import { fetchGscDashboardData } from "@/lib/analytics/google";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const data = await fetchGscDashboardData();
        return NextResponse.json(data, {
            headers: {
                "Cache-Control": "no-store, max-age=0",
            },
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to fetch GSC analytics";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}