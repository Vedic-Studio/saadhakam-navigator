import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const payload = (await request.json().catch(() => ({}))) as { pipelineId?: string };
        if (!payload.pipelineId) {
            return NextResponse.json(
                { error: "Deprecated route. Create a pipeline first, then materialize it via /api/pipelines/[id]/materialize." },
                { status: 410 },
            );
        }

        return NextResponse.json(
            { error: "Use /api/pipelines/[id]/materialize directly for pipeline-backed CMS drafts." },
            { status: 410 },
        );
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to process deprecated CMS generate route" },
            { status: 500 },
        );
    }
}