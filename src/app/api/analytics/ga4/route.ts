import { NextResponse } from "next/server";

import { fetchGa4DashboardData } from "@/lib/analytics/google";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const data = await fetchGa4DashboardData();
        return NextResponse.json(data, {
            headers: {
                "Cache-Control": "no-store, max-age=0",
            },
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to fetch GA4 analytics";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}