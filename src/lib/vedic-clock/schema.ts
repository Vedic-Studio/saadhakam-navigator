import { z } from "zod";
import { vedicClockPresetCities } from "@/lib/vedic-clock/presets";
import { parseLocalDate, parseLocalDateTime } from "@/lib/vedic-clock/interactive";

const presetCityIds = new Set(vedicClockPresetCities.map((city) => city.id));

function isValidTimeZone(timeZone: string) {
    try {
        new Intl.DateTimeFormat("en-US", { timeZone });
        return true;
    } catch {
        return false;
    }
}

export const VedicClockQuerySchema = z
    .object({
        cityId: z
            .string()
            .trim()
            .min(1)
            .refine((value) => presetCityIds.has(value), "Unknown preset city")
            .optional(),
        latitude: z.coerce.number().min(-90).max(90).optional(),
        longitude: z.coerce.number().min(-180).max(180).optional(),
        timezone: z
            .string()
            .trim()
            .min(1)
            .refine((value) => isValidTimeZone(value), "Invalid timezone")
            .optional(),
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
        datetime: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/).optional(),
    })
    .superRefine((value, ctx) => {
        const hasCityId = Boolean(value.cityId);
        const hasLatitude = value.latitude !== undefined;
        const hasLongitude = value.longitude !== undefined;
        const hasTimezone = value.timezone !== undefined;
        const hasCoordinates = hasLatitude || hasLongitude || hasTimezone;

        if (hasCityId && hasCoordinates) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["cityId"],
                message: "Provide either cityId or coordinates/timezone, not both",
            });
        }

        if (!hasCityId && (hasLatitude || hasLongitude || hasTimezone) && !(hasLatitude && hasLongitude && hasTimezone)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["latitude"],
                message: "Latitude, longitude, and timezone must all be provided together",
            });
        }

        if (!hasCityId && !hasLatitude && !hasLongitude && !hasTimezone) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: [],
                message: "Provide either a preset cityId or latitude/longitude/timezone coordinates",
            });
        }

        if (value.date && value.datetime) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["date"],
                message: "Provide either date or datetime, not both",
            });
        }

        if (value.date) {
            try {
                parseLocalDate(value.date);
            } catch {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["date"],
                    message: "Invalid calendar date",
                });
            }
        }

        if (value.datetime) {
            try {
                parseLocalDateTime(value.datetime);
            } catch {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["datetime"],
                    message: "Invalid calendar datetime",
                });
            }
        }
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

export const VedicClockKalaSchema = z.object({
    index: z.number().int().min(1).max(4),
    name: z.string(),
    devanagari: z.string(),
    phase: z.enum(["day", "night"]),
    startTime: z.string(),
    endTime: z.string(),
    startCycleMinute: z.number().min(0).max(1440),
    endCycleMinute: z.number().min(0).max(1440),
    isActive: z.boolean(),
});

export const VedicClockResponseSchema = z.object({
    requestedDate: z.string(),
    requestedDateTime: z.string(),
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
        currentLocalDateTime: z.string(),
        sunriseTime: z.string(),
        sunsetTime: z.string(),
        dayLengthMinutes: z.number().int(),
        minutesSinceSunrise: z.number().min(0).max(1439),
        cycleProgress: z.number().min(0).max(1),
        currentMuhurtaIndex: z.number().int().min(1).max(30),
        currentKalaIndex: z.number().int().min(1).max(4),
        muhurtas: z.array(VedicClockMuhuratSchema).length(30),
        kalaSegments: z.array(VedicClockKalaSchema).length(4),
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
