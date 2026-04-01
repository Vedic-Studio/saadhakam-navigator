import { NextResponse } from "next/server";
import { saveCmsContent } from "@/lib/cms/storage";

export async function POST(request: Request, context: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await context.params;
        const { content, note } = (await request.json()) as { content?: string; note?: string };
        if (!content || typeof content !== "string") {
            return NextResponse.json({ error: "content is required" }, { status: 400 });
        }
        const version = await saveCmsContent(slug, content, note);
        return NextResponse.json({ version });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to save CMS content" },
            { status: 500 },
        );
    }
}