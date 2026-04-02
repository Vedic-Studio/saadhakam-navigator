import { NextResponse } from "next/server";
import { proxyContentAgentJson } from "@/lib/content-agent/backend";
import { PipelineListResponseSchema } from "@/lib/pipelines/schemas";

export async function GET(request: Request) {
    try {
        const { search } = new URL(request.url);
        const response = await proxyContentAgentJson(`/pipelines${search}`);
        const rawPayload: unknown = await response.json();

        if (!response.ok) {
            return NextResponse.json(rawPayload, { status: response.status });
        }

        // Validate backend response schema — log warning on mismatch but don't block
        const parseResult = PipelineListResponseSchema.safeParse(rawPayload);
        if (!parseResult.success) {
            console.warn("[pipelines/list] Backend response failed schema validation:", parseResult.error.issues);
        }

        return NextResponse.json(rawPayload, { status: response.status, headers: { "Cache-Control": "no-store, max-age=0" } });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Pipeline list unavailable" },
            { status: 500 },
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.text();
        const response = await proxyContentAgentJson("/pipelines", {
            method: "POST",
            body,
        });
        const payload = await response.json().catch(() => ({}));
        return NextResponse.json(payload, { status: response.status });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Pipeline create failed" },
            { status: 500 },
        );
    }
}