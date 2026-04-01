import { NextResponse } from "next/server";
import { getCmsQueue } from "@/lib/cms/storage";

export async function GET() {
    try {
        const articles = await getCmsQueue();
        return NextResponse.json({ articles }, { headers: { "Cache-Control": "no-store, max-age=0" } });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "CMS queue unavailable" },
            { status: 500 },
        );
    }
}