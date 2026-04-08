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
});
