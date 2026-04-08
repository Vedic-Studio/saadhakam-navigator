import { z } from "zod";

export const VedicClockQuerySchema = z.object({
    cityId: z.string().trim().min(1).optional(),
    latitude: z.coerce.number().min(-90).max(90).optional(),
    longitude: z.coerce.number().min(-180).max(180).optional(),
    timezone: z.string().trim().min(1).optional(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});

export const VedicClockLocationSchema = z.object({
    kind: z.enum(["preset", "coordinates"]),
    name: z.string(),
    region: z.string().nullable(),
    latitude: z.number(),
    longitude: z.number(),
    timezone: z.string(),
});

export const VedicClockPanchangaFieldSchema = z.object({
    slug: z.string(),
    name: z.string(),
    sanskritName: z.string().nullable(),
    summary: z.string(),
});

export const VedicClockMuhuratSchema = z.object({
    index: z.number().int().min(1).max(30),
    label: z.string(),
    phase: z.enum(["day", "night"]),
    startTime: z.string(),
    endTime: z.string(),
    isActive: z.boolean(),
});

export const VedicClockResponseSchema = z.object({
    requestedDate: z.string(),
    location: VedicClockLocationSchema,
    panchanga: z.object({
        vara: VedicClockPanchangaFieldSchema,
        tithi: VedicClockPanchangaFieldSchema,
        nakshatra: VedicClockPanchangaFieldSchema,
        yoga: z.string(),
        karana: z.string(),
    }),
    clock: z.object({
        mode: z.literal("fixed-48-minute"),
        currentLocalTime: z.string(),
        sunriseTime: z.string(),
        sunsetTime: z.string(),
        dayLengthMinutes: z.number().int(),
        currentMuhurtaIndex: z.number().int().min(1).max(30),
        muhurtas: z.array(VedicClockMuhuratSchema).length(30),
    }),
    provenance: z.array(
        z.object({
            label: z.string(),
            value: z.string(),
            detail: z.string(),
        }),
    ),
});

export type VedicClockQuery = z.infer<typeof VedicClockQuerySchema>;
export type VedicClockResponse = z.infer<typeof VedicClockResponseSchema>;

export function formatVedicClockSchemaError(error: z.ZodError): string {
    return error.issues.map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`).join("; ");
}
