import { NextResponse } from "next/server";
import { proxyContentAgentJson } from "@/lib/content-agent/backend";
import { PipelineDetailSchema } from "@/lib/pipelines/schemas";

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const response = await proxyContentAgentJson(`/pipelines/${id}`);
        const rawPayload: unknown = await response.json().catch(() => ({}));

        if (!response.ok) {
            return NextResponse.json(rawPayload, { status: response.status });
        }

        // Validate backend response schema — log warning on mismatch but don't block
        const parseResult = PipelineDetailSchema.safeParse(rawPayload);
        if (!parseResult.success) {
            console.warn(`[pipelines/${id}] Backend response failed schema validation:`, parseResult.error.issues);
        }

        return NextResponse.json(rawPayload, { status: response.status, headers: { "Cache-Control": "no-store, max-age=0" } });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Pipeline detail unavailable" },
            { status: 500 },
        );
    }
}