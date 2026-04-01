import { NextResponse } from "next/server";
import { submitCmsReview } from "@/lib/cms/storage";

export async function POST(request: Request, context: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await context.params;
        const { action, comment } = (await request.json()) as {
            action?: "approve" | "revise" | "reject";
            comment?: string;
        };
        if (!action) {
            return NextResponse.json({ error: "action is required" }, { status: 400 });
        }
        const review = await submitCmsReview(slug, action, comment || "");
        return NextResponse.json({ review });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to submit CMS review" },
            { status: 500 },
        );
    }
}