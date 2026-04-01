import { NextResponse } from "next/server";
import { proxyContentAgentJson } from "@/lib/content-agent/backend";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const body = await request.text();
        const response = await proxyContentAgentJson(`/pipelines/${id}/approve`, { method: "POST", body });
        const payload = await response.json().catch(() => ({}));
        return NextResponse.json(payload, { status: response.status });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Pipeline approval failed" },
            { status: 500 },
        );
    }
}