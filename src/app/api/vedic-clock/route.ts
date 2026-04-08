import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { buildVedicClockResponse, formatVedicClockSchemaError, VedicClockQuerySchema, VedicClockResponseSchema } from "@/lib/vedic-clock";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const query = VedicClockQuerySchema.parse({
            cityId: url.searchParams.get("cityId") ?? undefined,
            latitude: url.searchParams.get("latitude") ?? undefined,
            longitude: url.searchParams.get("longitude") ?? undefined,
            timezone: url.searchParams.get("timezone") ?? undefined,
            date: url.searchParams.get("date") ?? undefined,
        });
        const payload = buildVedicClockResponse(query);
        const response = VedicClockResponseSchema.parse(payload);

        return NextResponse.json(response, {
            status: 200,
            headers: { "Cache-Control": "no-store, max-age=0" },
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: `Invalid Vedic Clock request: ${formatVedicClockSchemaError(error)}` },
                { status: 400 },
            );
        }

        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Vedic Clock unavailable" },
            { status: 500 },
        );
    }
}
