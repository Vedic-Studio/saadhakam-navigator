import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { buildVedicClockResponse, formatVedicClockSchemaError, VedicClockQuerySchema, VedicClockResponseSchema } from "@/lib/vedic-clock";

const NO_STORE_HEADERS = { "Cache-Control": "no-store, max-age=0" };

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const query = VedicClockQuerySchema.parse({
            cityId: url.searchParams.get("cityId") ?? undefined,
            latitude: url.searchParams.get("latitude") ?? undefined,
            longitude: url.searchParams.get("longitude") ?? undefined,
            timezone: url.searchParams.get("timezone") ?? undefined,
            date: url.searchParams.get("date") ?? undefined,
            datetime: url.searchParams.get("datetime") ?? undefined,
        });
        const payload = buildVedicClockResponse(query);
        const response = VedicClockResponseSchema.parse(payload);

        return NextResponse.json(response, {
            status: 200,
            headers: NO_STORE_HEADERS,
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: `Invalid Vedic Clock request: ${formatVedicClockSchemaError(error)}` },
                { status: 400, headers: NO_STORE_HEADERS },
            );
        }

        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Vedic Clock unavailable" },
            { status: 500, headers: NO_STORE_HEADERS },
        );
    }
}
