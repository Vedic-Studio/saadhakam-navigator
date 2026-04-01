import { NextResponse } from "next/server";
import { proxyContentAgentJson } from "@/lib/content-agent/backend";

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const response = await proxyContentAgentJson(`/pipelines/${id}`);
        const payload = await response.json().catch(() => ({}));
        return NextResponse.json(payload, { status: response.status, headers: { "Cache-Control": "no-store, max-age=0" } });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Pipeline detail unavailable" },
            { status: 500 },
        );
    }
}