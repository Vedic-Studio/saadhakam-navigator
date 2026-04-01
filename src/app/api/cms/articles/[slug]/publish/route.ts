import { NextResponse } from "next/server";
import { setCmsPublished } from "@/lib/cms/storage";

export async function POST(request: Request, context: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await context.params;
        const { published } = (await request.json()) as { published?: boolean };
        await setCmsPublished(slug, Boolean(published));
        return NextResponse.json({ ok: true });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to update publish state" },
            { status: 500 },
        );
    }
}