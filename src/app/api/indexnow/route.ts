import { NextResponse } from "next/server";

export async function GET() {
    const key = process.env.INDEXNOW_KEY;

    if (!key) {
        return new NextResponse("INDEXNOW_KEY environment variable not configured", {
            status: 404,
            headers: { "Content-Type": "text/plain" },
        });
    }

    // The IndexNow spec requires the URL path to exactly match `/{key}.txt`
    // And the contents to just be the key itself.
    // Next.js routing means this will be served at whatever the file path is named.
    // Since we want this dynamic based on the env var (e.g. `/<my-key>.txt`),
    // typical setup is either rewriting in next.config or handling it in middleware.
    // But wait, the user asked for `[indexnow-key].txt` route file which isn't exactly right for Next App Router.

    return new NextResponse(key, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
}
