import { NextResponse } from "next/server";
import { getCmsArticleDetail } from "@/lib/cms/storage";

export async function GET(_: Request, context: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await context.params;
        const detail = await getCmsArticleDetail(slug);
        if (!detail) {
            return NextResponse.json({ error: "Article not found" }, { status: 404 });
        }
        return NextResponse.json(detail, { headers: { "Cache-Control": "no-store, max-age=0" } });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "CMS article unavailable" },
            { status: 500 },
        );
    }
}