import { NextResponse } from "next/server";
import { setCmsPublished } from "@/lib/cms/storage";

export async function POST(request: Request, context: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await context.params;
        const { published } = (await request.json()) as { published?: boolean };
        await setCmsPublished(slug, Boolean(published));
        return NextResponse.json({ ok: true });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to update publish state";
        const status =
            message === "Publishing is disabled for CMS-native drafts until public route support is added"
                || message === "Only approved articles on known public routes can be published"
                ? 422
                : 500;

        return NextResponse.json(
            { error: message },
            { status },
        );
    }
}