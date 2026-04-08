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
});
