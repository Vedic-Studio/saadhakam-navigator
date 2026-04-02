import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { proxyContentAgentJson } from "@/lib/content-agent/backend";
import { formatSchemaValidationError, validatePipelineDetail } from "@/lib/pipelines/schemas";

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const response = await proxyContentAgentJson(`/pipelines/${id}`);
        const rawPayload: unknown = await response.json().catch(() => ({}));

        if (!response.ok) {
            return NextResponse.json(rawPayload, { status: response.status });
        }

        try {
            const payload = validatePipelineDetail(rawPayload);
            return NextResponse.json(payload, { status: response.status, headers: { "Cache-Control": "no-store, max-age=0" } });
        } catch (error) {
            const message = error instanceof ZodError ? formatSchemaValidationError(error) : "unknown";
            return NextResponse.json({ error: `Pipeline backend response failed schema validation: ${message}` }, { status: 502 });
        }
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Pipeline detail unavailable" },
            { status: 500 },
        );
    }
}