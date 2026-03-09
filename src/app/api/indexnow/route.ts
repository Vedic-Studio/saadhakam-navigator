import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    const key = process.env.INDEXNOW_KEY;

    if (!key) {
        return new NextResponse("INDEXNOW_KEY environment variable not configured", {
            status: 404,
            headers: { "Content-Type": "text/plain" },
        });
    }

    return new NextResponse(key, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-store, max-age=0",
        },
    });
}
