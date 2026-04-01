import { NextResponse } from "next/server";
import { proxyContentAgentJson } from "@/lib/content-agent/backend";

export async function GET() {
    try {
        const response = await proxyContentAgentJson("/knowledge/techniques", { method: "GET" });
        const payload = await response.json();
        return NextResponse.json(payload, { status: response.status, headers: { "Cache-Control": "no-store, max-age=0" } });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Techniques unavailable" },
            { status: 500 },
        );
    }
}