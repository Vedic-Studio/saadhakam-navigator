import { describe, expect, it } from "vitest";
import { getAstronomicalSunWindow, getComputedPanchanga, getLahiriAyanamsha } from "@/lib/vedic-clock/astronomy";

describe("vedic clock astronomy fixtures", () => {
    it("matches stable fixture values for Varanasi", () => {
        const sun = getAstronomicalSunWindow(2026, 4, 9, 25.3176, 82.9739, "Asia/Kolkata");
        const panchanga = getComputedPanchanga(new Date("2026-04-09T06:15:00.000Z"));

        expect(sun).toEqual({
            sunriseMinutes: 342,
            sunsetMinutes: 1098,
            dayLengthMinutes: 756,
            solarNoonMinutes: 720,
        });
        expect(panchanga.tithiIndex).toBe(21);
        expect(panchanga.nakshatraIndex).toBe(19);
        expect(panchanga.yogaIndex).toBe(18);
        expect(panchanga.karanaIndex).toBe(43);
        expect(panchanga.longitudes.solarLongitude).toBeCloseTo(355.18223965680244, 8);
        expect(panchanga.longitudes.lunarLongitude).toBeCloseTo(254.79497198668605, 8);
        expect(panchanga.longitudes.angularDifference).toBeCloseTo(259.6127323298836, 8);
    });

    it("matches stable fixture values for San Francisco", () => {
        const sun = getAstronomicalSunWindow(2026, 4, 9, 37.7749, -122.4194, "America/Los_Angeles");
        const panchanga = getComputedPanchanga(new Date("2026-04-09T18:30:00.000Z"));

        expect(sun).toEqual({
            sunriseMinutes: 405,
            sunsetMinutes: 1179,
            dayLengthMinutes: 774,
            solarNoonMinutes: 792,
        });
        expect(panchanga.tithiIndex).toBe(22);
        expect(panchanga.nakshatraIndex).toBe(19);
        expect(panchanga.yogaIndex).toBe(19);
        expect(panchanga.karanaIndex).toBe(44);
        expect(panchanga.longitudes.solarLongitude).toBeCloseTo(355.6836658373101, 8);
        expect(panchanga.longitudes.lunarLongitude).toBeCloseTo(260.9077779545921, 8);
        expect(panchanga.longitudes.angularDifference).toBeCloseTo(265.224112117282, 8);
    });

    it("matches stable fixture values for Delhi", () => {
        const sun = getAstronomicalSunWindow(2027, 1, 14, 28.6139, 77.209, "Asia/Kolkata");
        const panchanga = getComputedPanchanga(new Date("2027-01-14T05:00:00.000Z"));

        expect(sun).toEqual({
            sunriseMinutes: 435,
            sunsetMinutes: 1064,
            dayLengthMinutes: 629,
            solarNoonMinutes: 749,
        });
        expect(panchanga.tithiIndex).toBe(5);
        expect(panchanga.nakshatraIndex).toBe(25);
        expect(panchanga.yogaIndex).toBe(18);
        expect(panchanga.karanaIndex).toBe(11);
        expect(panchanga.longitudes.solarLongitude).toBeCloseTo(269.5454819089499, 8);
        expect(panchanga.longitudes.lunarLongitude).toBeCloseTo(339.85082340991613, 8);
        expect(panchanga.longitudes.angularDifference).toBeCloseTo(70.30534150096622, 8);
    });

    it("tracks the documented Lahiri convention around standard anchors", () => {
        expect(getLahiriAyanamsha(new Date("1956-03-21T00:00:32.000Z"))).toBeCloseTo(23.25190446175816, 8);
        expect(getLahiriAyanamsha(new Date("2000-01-01T12:00:00.000Z"))).toBeCloseTo(23.85468701463168, 8);
    });

    it("advances the Moon ~12 to 15 deg per day (geocentric, not heliocentric)", () => {
        // The geocentric Moon moves ~13 deg/day (range ~12 near apogee to ~15.3 near perigee).
        // The earlier heliocentric bug advanced it ~1 deg/day, which froze tithi and nakshatra
        // for ~14 days at a time. This test fails if the computation regresses to heliocentric.
        const day0 = getComputedPanchanga(new Date("2026-04-09T06:15:00.000Z")).longitudes.lunarLongitude;
        const day1 = getComputedPanchanga(new Date("2026-04-10T06:15:00.000Z")).longitudes.lunarLongitude;
        const dailyMotion = ((day1 - day0) + 360) % 360;
        expect(dailyMotion).toBeGreaterThan(11);
        expect(dailyMotion).toBeLessThan(16);
    });
});
