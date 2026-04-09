import { describe, expect, it } from "vitest";
import {
    buildDateTimeFromCycleOffset,
    buildKalaSegments,
    buildMuhurtaSegments,
    getElapsedSinceSunrise,
    getCycleProgress,
    getMuhurtaIndex,
    parseLocalDate,
    parseLocalDateTime,
    shiftLocalDateTime,
} from "@/lib/vedic-clock/interactive";

describe("vedic clock interactive helpers", () => {
    it("shifts local datetimes without timezone drift", () => {
        expect(shiftLocalDateTime("2026-04-09T23:50", 15)).toBe("2026-04-10T00:05");
        expect(shiftLocalDateTime("2026-04-09T00:10", -15)).toBe("2026-04-08T23:55");
    });

    it("builds a next-day datetime for late-night muhurtas", () => {
        expect(buildDateTimeFromCycleOffset("2026-04-09", "05:41", 27 * 48 + 24)).toBe("2026-04-10T03:41");
    });

    it("handles cycle offsets at exact wrap boundaries", () => {
        expect(buildDateTimeFromCycleOffset("2026-04-09", "05:41", 0)).toBe("2026-04-09T05:41");
        expect(buildDateTimeFromCycleOffset("2026-04-09", "05:41", 1439)).toBe("2026-04-10T05:40");
        expect(buildDateTimeFromCycleOffset("2026-04-09", "05:41", 1440)).toBe("2026-04-10T05:41");
        expect(buildDateTimeFromCycleOffset("2026-04-09", "05:41", -1)).toBe("2026-04-09T05:40");
    });

    it("computes cycle progress and muhurta index from sunrise-anchored time", () => {
        const progress = getCycleProgress(341, 198);
        expect(progress).toBeCloseTo(1297 / 1440, 6);
        expect(getMuhurtaIndex(progress * 1440)).toBe(28);
    });

    it("builds structured kala segments with one active segment", () => {
        const kalas = buildKalaSegments(341, 1098, 780);
        expect(kalas).toHaveLength(4);
        expect(kalas.filter((segment) => segment.isActive)).toHaveLength(1);
        expect(kalas[0]?.name).toBe("Prātaḥ");
        expect(kalas[3]?.phase).toBe("night");
    });

    it("keeps exactly one active kala segment across boundaries", () => {
        const sunrise = 341;
        const sunset = 1098;
        const baseKalas = buildKalaSegments(sunrise, sunset, sunrise);
        const boundaries = baseKalas.flatMap((segment) => [segment.startCycleMinute, segment.endCycleMinute]).slice(0, -1);

        for (const boundary of boundaries) {
            const currentLocalMinutes = (sunrise + boundary) % 1440;
            const kalas = buildKalaSegments(sunrise, sunset, currentLocalMinutes);
            expect(kalas.filter((segment) => segment.isActive)).toHaveLength(1);
        }
    });

    it("marks exactly one muhurta active at sunrise, just before wrap, and after wrap", () => {
        const sunrise = 341;
        const times = [sunrise, 340, 341 + 48, 341 + 1439].map((value) => ((value % 1440) + 1440) % 1440);

        for (const currentLocalMinutes of times) {
            const muhurtas = buildMuhurtaSegments(sunrise, currentLocalMinutes);
            expect(muhurtas.filter((segment) => segment.isActive)).toHaveLength(1);
        }

        expect(getMuhurtaIndex(getElapsedSinceSunrise(sunrise, sunrise))).toBe(1);
        expect(getMuhurtaIndex(getElapsedSinceSunrise(sunrise, 340))).toBe(30);
    });

    it("rejects semantically invalid local dates and datetimes", () => {
        expect(() => parseLocalDate("2026-02-30")).toThrow("Invalid local date");
        expect(() => parseLocalDate("2025-02-29")).toThrow("Invalid local date");
        expect(parseLocalDate("2024-02-29")).toEqual({ year: 2024, month: 2, day: 29 });
        expect(() => parseLocalDateTime("2026-99-99T99:99")).toThrow("Invalid local datetime");
        expect(() => parseLocalDateTime("2026-04-31T12:00")).toThrow("Invalid local datetime");
    });

    it("shifts local datetimes across leap day and year-end rollover", () => {
        expect(shiftLocalDateTime("2024-02-28T23:50", 15)).toBe("2024-02-29T00:05");
        expect(shiftLocalDateTime("2026-12-31T23:50", 15)).toBe("2027-01-01T00:05");
    });
});