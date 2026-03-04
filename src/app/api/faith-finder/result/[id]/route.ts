import { NextResponse } from "next/server";
import { getFaithFinderSubmission } from "@/lib/faithFinderStorage";

export async function GET(
    _request: Request,
    context: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await context.params;
        const submission = await getFaithFinderSubmission(id);

        if (!submission) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        // NOTE: For now we return result without email to keep the public URL share-safe.
        // If you later want the user's own dashboard to include email, gate it behind auth.
        return NextResponse.json({
            id: submission.id,
            createdAt: submission.createdAt,
            result: submission.result,
        });
    } catch (error) {
        console.error("[Faith Finder Result Error]:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
