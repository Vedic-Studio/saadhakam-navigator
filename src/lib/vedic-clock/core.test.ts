import { describe, expect, it } from "vitest";
import { buildVedicClockResponse } from "@/lib/vedic-clock";

function toMinutes(clockTime: string) {
    const [hour, minute] = clockTime.split(":").map(Number);
    return hour * 60 + minute;
}

describe("buildVedicClockResponse", () => {
    it("builds a stable contract for preset cities", () => {
        const payload = buildVedicClockResponse(
            { cityId: "varanasi", date: "2026-04-09" },
            new Date("2026-04-09T06:15:00.000Z"),
        );

        expect(payload.location.name).toBe("Varanasi");
        expect(payload.clock.mode).toBe("fixed-48-minute");
        expect(payload.clock.muhurtas).toHaveLength(30);
        expect(payload.provenance).toHaveLength(4);
        expect(payload.panchanga.vara.name).toBeTruthy();
        expect(toMinutes(payload.clock.sunriseTime)).toBeGreaterThanOrEqual(300);
        expect(toMinutes(payload.clock.sunriseTime)).toBeLessThanOrEqual(390);
        expect(toMinutes(payload.clock.sunsetTime)).toBeGreaterThanOrEqual(1050);
        expect(toMinutes(payload.clock.sunsetTime)).toBeLessThanOrEqual(1140);
        expect(payload.panchanga.yoga).toBeTruthy();
        expect(payload.panchanga.karana).toBeTruthy();
    });

    it("accepts coordinate-driven requests without a preset", () => {
        const payload = buildVedicClockResponse(
            {
                latitude: 37.7749,
                longitude: -122.4194,
                timezone: "America/Los_Angeles",
                date: "2026-04-09",
            },
            new Date("2026-04-09T18:30:00.000Z"),
        );

        expect(payload.location.kind).toBe("coordinates");
        expect(payload.location.timezone).toBe("America/Los_Angeles");
        expect(payload.clock.currentMuhurtaIndex).toBeGreaterThanOrEqual(1);
        expect(payload.clock.currentMuhurtaIndex).toBeLessThanOrEqual(30);
        expect(toMinutes(payload.clock.sunriseTime)).toBeGreaterThanOrEqual(330);
        expect(toMinutes(payload.clock.sunriseTime)).toBeLessThanOrEqual(450);
        expect(toMinutes(payload.clock.sunsetTime)).toBeGreaterThanOrEqual(1110);
        expect(toMinutes(payload.clock.sunsetTime)).toBeLessThanOrEqual(1230);
    });

    it("computes panchanga outside the seeded 2026 calendar range", () => {
        const payload = buildVedicClockResponse(
            { cityId: "delhi", date: "2027-01-14" },
            new Date("2027-01-14T05:00:00.000Z"),
        );

        expect(payload.requestedDate).toBe("2027-01-14");
        expect(payload.panchanga.tithi.slug).toBeTruthy();
        expect(payload.panchanga.nakshatra.slug).toBeTruthy();
        expect(payload.panchanga.yoga).toBeTruthy();
        expect(payload.panchanga.karana).toBeTruthy();
    });

    it("accepts a specific local datetime and exposes interactive clock metadata", () => {
        const payload = buildVedicClockResponse(
            { cityId: "varanasi", datetime: "2026-04-09T03:18" },
            new Date("2026-04-08T21:48:00.000Z"),
        );

        expect(payload.requestedDate).toBe("2026-04-09");
        expect(payload.requestedDateTime).toBe("2026-04-09T03:18");
        expect(payload.clock.currentLocalDateTime).toBe("2026-04-09T03:18");
        expect(payload.clock.minutesSinceSunrise).toBe(1297);
        expect(payload.clock.cycleProgress).toBeCloseTo(1297 / 1440, 6);
        expect(payload.clock.currentKalaIndex).toBeGreaterThanOrEqual(1);
        expect(payload.clock.kalaSegments).toHaveLength(4);
    });

    it("supports non-hour-offset timezones without breaking requested local datetime", () => {
        const payload = buildVedicClockResponse(
            {
                latitude: 27.7172,
                longitude: 85.324,
                timezone: "Asia/Kathmandu",
                datetime: "2026-04-09T05:45",
            },
            new Date("2026-04-09T00:00:00.000Z"),
        );

        expect(payload.location.timezone).toBe("Asia/Kathmandu");
        expect(payload.requestedDateTime).toBe("2026-04-09T05:45");
        expect(payload.clock.currentLocalDateTime).toBe("2026-04-09T05:45");
        expect(payload.clock.kalaSegments.filter((segment) => segment.isActive)).toHaveLength(1);
    });

    it("accepts DST-boundary local datetimes without corrupting requested local time", () => {
        const springForward = buildVedicClockResponse(
            {
                latitude: 40.7128,
                longitude: -74.006,
                timezone: "America/New_York",
                datetime: "2026-03-08T03:30",
            },
            new Date("2026-03-08T08:00:00.000Z"),
        );

        const fallBack = buildVedicClockResponse(
            {
                latitude: 40.7128,
                longitude: -74.006,
                timezone: "America/New_York",
                datetime: "2026-11-01T01:30",
            },
            new Date("2026-11-01T06:30:00.000Z"),
        );

        expect(springForward.requestedDateTime).toBe("2026-03-08T03:30");
        expect(springForward.clock.currentLocalDateTime).toBe("2026-03-08T03:30");
        expect(fallBack.requestedDateTime).toBe("2026-11-01T01:30");
        expect(fallBack.clock.currentLocalDateTime).toBe("2026-11-01T01:30");
    });

    it("marks exactly one muhurta active and handles pre-sunrise wrap", () => {
        // Varanasi, 2026-04-09, local time 03:18 IST (before 05:41 sunrise).
        // The moment sits 1297 minutes into the cycle that began at the
        // previous sunrise, which is muhurta 28 (1-indexed).
        const payload = buildVedicClockResponse(
            { cityId: "varanasi", date: "2026-04-09" },
            new Date("2026-04-08T21:48:00.000Z"), // 03:18 IST
        );

        const activeSegments = payload.clock.muhurtas.filter((m) => m.isActive);
        expect(activeSegments).toHaveLength(1);
        expect(activeSegments[0].index).toBe(payload.clock.currentMuhurtaIndex);
        // Elapsed since sunrise: 03:18 - 05:41 + 24h = 21h 37m = 1297 min.
        // 1297 / 48 = 27.02 → segment index 27 → muhurta 28.
        expect(payload.clock.currentMuhurtaIndex).toBe(28);
        expect(activeSegments[0].phase).toBe("night");
    });

    it("marks the first muhurta active at the exact sunrise moment", () => {
        // Construct an observation at the exact sunrise instant.
        const provisional = buildVedicClockResponse(
            { cityId: "varanasi", date: "2026-04-09" },
            new Date("2026-04-09T00:00:00.000Z"),
        );
        const [sunriseHour, sunriseMinute] = provisional.clock.sunriseTime.split(":").map(Number);
        // 2026-04-09 05:41 IST == 00:11 UTC
        const sunriseUtc = new Date(
            Date.UTC(2026, 3, 9, sunriseHour - 5, sunriseMinute - 30),
        );
        const payload = buildVedicClockResponse(
            { cityId: "varanasi", date: "2026-04-09" },
            sunriseUtc,
        );

        const activeSegments = payload.clock.muhurtas.filter((m) => m.isActive);
        expect(activeSegments).toHaveLength(1);
        expect(payload.clock.currentMuhurtaIndex).toBe(1);
        expect(activeSegments[0].phase).toBe("day");
    });

    it("keeps exactly one active kala segment at sunrise, sunset, and late-night boundaries", () => {
        const payload = buildVedicClockResponse(
            { cityId: "varanasi", date: "2026-04-09" },
            new Date("2026-04-09T00:00:00.000Z"),
        );

        const boundaryTimes = [payload.clock.sunriseTime, payload.clock.sunsetTime, "00:00", "23:59"];

        for (const time of boundaryTimes) {
            const boundaryPayload = buildVedicClockResponse(
                { cityId: "varanasi", datetime: `2026-04-09T${time}` },
                new Date("2026-04-09T00:00:00.000Z"),
            );
            expect(boundaryPayload.clock.kalaSegments.filter((segment) => segment.isActive)).toHaveLength(1);
        }
    });

    it("rejects unknown preset cities instead of silently defaulting", () => {
        expect(() => buildVedicClockResponse({ cityId: "unknown-city", date: "2026-04-09" })).toThrow(
            "Unknown preset city",
        );
    });

    it("requires complete coordinate input when no preset city is selected", () => {
        expect(() =>
            buildVedicClockResponse({ latitude: 25.3176, longitude: 82.9739, date: "2026-04-09" } as never),
        ).toThrow("requires either a preset city or latitude/longitude/timezone coordinates");
    });
});
