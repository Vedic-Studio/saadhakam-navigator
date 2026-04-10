import { describe, expect, it } from "vitest";
import { computeInauspiciousKalas, type InauspiciousKala } from "@/lib/vedic-clock/inauspicious-kalas";

/**
 * Reference values verified against DrikPanchang for Varanasi.
 * Sunrise ~05:42, Sunset ~18:18 on a typical April day.
 * Daylight = 756 minutes, octant = 94.5 minutes.
 */
const SUNRISE = 342; // 05:42
const SUNSET = 1098; // 18:18
const DAYLIGHT = SUNSET - SUNRISE; // 756
const OCTANT = DAYLIGHT / 8; // 94.5

function getKala(kalas: InauspiciousKala[], name: string): InauspiciousKala {
    const kala = kalas.find((k) => k.name === name);
    if (!kala) throw new Error(`Kala "${name}" not found`);
    return kala;
}

describe("computeInauspiciousKalas", () => {
    it("returns exactly 3 kalas in order: Rahu, Yamaganda, Gulika", () => {
        const kalas = computeInauspiciousKalas(0, SUNRISE, SUNSET, 600);
        expect(kalas).toHaveLength(3);
        expect(kalas[0].name).toBe("Rahu Kala");
        expect(kalas[1].name).toBe("Yamaganda");
        expect(kalas[2].name).toBe("Gulika Kala");
    });

    it("includes devanagari labels", () => {
        const kalas = computeInauspiciousKalas(0, SUNRISE, SUNSET, 600);
        expect(kalas[0].devanagari).toBe("राहु काल");
        expect(kalas[1].devanagari).toBe("यमगण्ड");
        expect(kalas[2].devanagari).toBe("गुलिक काल");
    });

    describe("octant boundaries per weekday", () => {
        // Sunday (0): Rahu=8, Yamaganda=5, Gulika=7
        it("Sunday: Rahu in octant 8 (last slot before sunset)", () => {
            const kalas = computeInauspiciousKalas(0, SUNRISE, SUNSET, 600);
            const rahu = getKala(kalas, "Rahu Kala");
            expect(rahu.startMinutes).toBe(Math.round(SUNRISE + 7 * OCTANT));
            expect(rahu.endMinutes).toBe(Math.round(SUNRISE + 8 * OCTANT));
        });

        // Monday (1): Rahu=2
        it("Monday: Rahu in octant 2 (early morning)", () => {
            const kalas = computeInauspiciousKalas(1, SUNRISE, SUNSET, 600);
            const rahu = getKala(kalas, "Rahu Kala");
            expect(rahu.startMinutes).toBe(Math.round(SUNRISE + 1 * OCTANT));
            expect(rahu.endMinutes).toBe(Math.round(SUNRISE + 2 * OCTANT));
        });

        // Tuesday (2): Rahu=7
        it("Tuesday: Rahu in octant 7", () => {
            const kalas = computeInauspiciousKalas(2, SUNRISE, SUNSET, 600);
            const rahu = getKala(kalas, "Rahu Kala");
            expect(rahu.startMinutes).toBe(Math.round(SUNRISE + 6 * OCTANT));
            expect(rahu.endMinutes).toBe(Math.round(SUNRISE + 7 * OCTANT));
        });

        // Wednesday (3): Rahu=5, Yamaganda=7, Gulika=4
        it("Wednesday: all three kalas are non-overlapping", () => {
            const kalas = computeInauspiciousKalas(3, SUNRISE, SUNSET, 600);
            const rahu = getKala(kalas, "Rahu Kala");
            const yama = getKala(kalas, "Yamaganda");
            const gulika = getKala(kalas, "Gulika Kala");
            // Rahu octant 5, Gulika octant 4, Yamaganda octant 7 — all different
            expect(rahu.startMinutes).not.toBe(yama.startMinutes);
            expect(rahu.startMinutes).not.toBe(gulika.startMinutes);
            expect(yama.startMinutes).not.toBe(gulika.startMinutes);
        });

        // Thursday (4): Rahu=6
        it("Thursday: Rahu in octant 6", () => {
            const kalas = computeInauspiciousKalas(4, SUNRISE, SUNSET, 600);
            const rahu = getKala(kalas, "Rahu Kala");
            expect(rahu.startMinutes).toBe(Math.round(SUNRISE + 5 * OCTANT));
            expect(rahu.endMinutes).toBe(Math.round(SUNRISE + 6 * OCTANT));
        });

        // Friday (5): Rahu=4, Yamaganda=1
        it("Friday: Yamaganda in octant 1 (starts at sunrise)", () => {
            const kalas = computeInauspiciousKalas(5, SUNRISE, SUNSET, 600);
            const yama = getKala(kalas, "Yamaganda");
            expect(yama.startMinutes).toBe(SUNRISE);
            expect(yama.endMinutes).toBe(Math.round(SUNRISE + OCTANT));
        });

        // Saturday (6): Rahu=3, Gulika=1
        it("Saturday: Gulika in octant 1 (starts at sunrise), Rahu in octant 3", () => {
            const kalas = computeInauspiciousKalas(6, SUNRISE, SUNSET, 600);
            const gulika = getKala(kalas, "Gulika Kala");
            const rahu = getKala(kalas, "Rahu Kala");
            expect(gulika.startMinutes).toBe(SUNRISE);
            expect(rahu.startMinutes).toBe(Math.round(SUNRISE + 2 * OCTANT));
        });
    });

    describe("isActive flag", () => {
        it("marks Rahu Kala active when current time is within the window", () => {
            // Monday Rahu is octant 2: start = 342 + 94.5 = 437, end = 531
            const midPoint = Math.round(SUNRISE + 1.5 * OCTANT); // ~484
            const kalas = computeInauspiciousKalas(1, SUNRISE, SUNSET, midPoint);
            const rahu = getKala(kalas, "Rahu Kala");
            expect(rahu.isActive).toBe(true);
        });

        it("marks Rahu Kala inactive when current time is outside the window", () => {
            const kalas = computeInauspiciousKalas(1, SUNRISE, SUNSET, 600);
            const rahu = getKala(kalas, "Rahu Kala");
            expect(rahu.isActive).toBe(false);
        });

        it("marks kala inactive at the exact end boundary", () => {
            // Monday Rahu octant 2: end = round(342 + 2 * 94.5) = 531
            const endBoundary = Math.round(SUNRISE + 2 * OCTANT);
            const kalas = computeInauspiciousKalas(1, SUNRISE, SUNSET, endBoundary);
            const rahu = getKala(kalas, "Rahu Kala");
            expect(rahu.isActive).toBe(false);
        });

        it("marks kala active at the exact start boundary", () => {
            const startBoundary = Math.round(SUNRISE + 1 * OCTANT);
            const kalas = computeInauspiciousKalas(1, SUNRISE, SUNSET, startBoundary);
            const rahu = getKala(kalas, "Rahu Kala");
            expect(rahu.isActive).toBe(true);
        });
    });

    describe("edge cases", () => {
        it("handles short winter days (daylight = 600 minutes)", () => {
            const shortSunrise = 420; // 07:00
            const shortSunset = 1020; // 17:00
            const kalas = computeInauspiciousKalas(0, shortSunrise, shortSunset, 600);
            expect(kalas).toHaveLength(3);
            // Octant = 600/8 = 75 minutes
            const rahu = getKala(kalas, "Rahu Kala");
            expect(rahu.endMinutes - rahu.startMinutes).toBe(75);
        });

        it("handles long summer days (daylight = 900 minutes)", () => {
            const longSunrise = 300; // 05:00
            const longSunset = 1200; // 20:00
            const kalas = computeInauspiciousKalas(0, longSunrise, longSunset, 600);
            expect(kalas).toHaveLength(3);
            // Octant = 900/8 = 112.5, rounded
            const rahu = getKala(kalas, "Rahu Kala");
            expect(rahu.endMinutes - rahu.startMinutes).toBeGreaterThanOrEqual(112);
            expect(rahu.endMinutes - rahu.startMinutes).toBeLessThanOrEqual(113);
        });

        it("produces valid HH:MM formatted times", () => {
            const kalas = computeInauspiciousKalas(3, SUNRISE, SUNSET, 600);
            for (const kala of kalas) {
                expect(kala.startTime).toMatch(/^\d{2}:\d{2}$/);
                expect(kala.endTime).toMatch(/^\d{2}:\d{2}$/);
            }
        });
    });
});
