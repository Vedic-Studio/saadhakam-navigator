import { describe, expect, it } from "vitest";
import { getAstronomicalSunWindow, getComputedPanchanga, getLahiriAyanamsha } from "@/lib/vedic-clock/astronomy";

describe("vedic clock astronomy fixtures", () => {
    it("matches stable fixture values for Varanasi", () => {
        const sun = getAstronomicalSunWindow(2026, 4, 9, 25.3176, 82.9739, "Asia/Kolkata");
        const panchanga = getComputedPanchanga(new Date("2026-04-09T06:15:00.000Z"));

        expect(sun).toEqual({
            sunriseMinutes: 341,
            sunsetMinutes: 1098,
            dayLengthMinutes: 757,
        });
        expect(panchanga.tithiIndex).toBe(15);
        expect(panchanga.nakshatraIndex).toBe(13);
        expect(panchanga.yogaIndex).toBe(12);
        expect(panchanga.karanaIndex).toBe(30);
        expect(panchanga.longitudes.solarLongitude).toBeCloseTo(355.18223965680244, 8);
        expect(panchanga.longitudes.lunarLongitude).toBeCloseTo(175.33889923071627, 8);
        expect(panchanga.longitudes.angularDifference).toBeCloseTo(180.15665957391394, 8);
    });

    it("matches stable fixture values for San Francisco", () => {
        const sun = getAstronomicalSunWindow(2026, 4, 9, 37.7749, -122.4194, "America/Los_Angeles");
        const panchanga = getComputedPanchanga(new Date("2026-04-09T18:30:00.000Z"));

        expect(sun).toEqual({
            sunriseMinutes: 402,
            sunsetMinutes: 1180,
            dayLengthMinutes: 778,
        });
        expect(panchanga.tithiIndex).toBe(15);
        expect(panchanga.nakshatraIndex).toBe(13);
        expect(panchanga.yogaIndex).toBe(12);
        expect(panchanga.karanaIndex).toBe(30);
        expect(panchanga.longitudes.solarLongitude).toBeCloseTo(355.6836658373101, 8);
        expect(panchanga.longitudes.lunarLongitude).toBeCloseTo(175.84187827922892, 8);
        expect(panchanga.longitudes.angularDifference).toBeCloseTo(180.15821244191886, 8);
    });

    it("matches stable fixture values for Delhi", () => {
        const sun = getAstronomicalSunWindow(2027, 1, 14, 28.6139, 77.209, "Asia/Kolkata");
        const panchanga = getComputedPanchanga(new Date("2027-01-14T05:00:00.000Z"));

        expect(sun).toEqual({
            sunriseMinutes: 435,
            sunsetMinutes: 1065,
            dayLengthMinutes: 630,
        });
        expect(panchanga.tithiIndex).toBe(14);
        expect(panchanga.nakshatraIndex).toBe(6);
        expect(panchanga.yogaIndex).toBe(26);
        expect(panchanga.karanaIndex).toBe(29);
        expect(panchanga.longitudes.solarLongitude).toBeCloseTo(269.5454819089499, 8);
        expect(panchanga.longitudes.lunarLongitude).toBeCloseTo(89.40825568509172, 8);
        expect(panchanga.longitudes.angularDifference).toBeCloseTo(179.86277377614175, 8);
    });

    it("tracks the documented Lahiri convention around standard anchors", () => {
        expect(getLahiriAyanamsha(new Date("1956-03-21T00:00:32.000Z"))).toBeCloseTo(23.25190446175816, 8);
        expect(getLahiriAyanamsha(new Date("2000-01-01T12:00:00.000Z"))).toBeCloseTo(23.85468701463168, 8);
    });
});
