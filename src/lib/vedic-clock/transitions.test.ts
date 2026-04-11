import { describe, expect, it } from "vitest";
import { getComputedPanchanga, getLahiriAyanamsha, getTimeZoneOffsetMinutes } from "@/lib/vedic-clock/astronomy";
import { parseLocalDateTime } from "@/lib/vedic-clock/interactive";
import { findNextTransition } from "@/lib/vedic-clock/transitions";
import { getNakshatraBySlug, getTithiBySlug } from "@/lib/jyotish";
import { nakshatras } from "@/data/nakshatras";
import { tithis, yogas } from "@/data/panchang";

function getTithiSlugFromIndex(index: number) {
    return tithis[index]?.slug ?? tithis[0].slug;
}

function getNakshatraSlugFromIndex(index: number) {
    return nakshatras[index]?.slug ?? nakshatras[0].slug;
}

function getKaranaNameFromHalfTithiIndex(index: number) {
    if (index === 0) return "Kimstughna";
    if (index >= 57) return ["Shakuni", "Chatushpada", "Naga"][index - 57] ?? "Kimstughna";

    const repeating = ["Bava", "Balava", "Kaulava", "Taitila", "Garija", "Vanija", "Vishti"];
    return repeating[(index - 1) % repeating.length];
}

function localDateTimeToUtc(localDateTime: string, timeZone: string) {
    const { year, month, day, hour, minute } = parseLocalDateTime(localDateTime);
    const offsetMinutes = getTimeZoneOffsetMinutes(year, month, day, timeZone);
    return new Date(Date.UTC(year, month - 1, day, hour, minute) - offsetMinutes * 60_000);
}

describe("findNextTransition", () => {
    const observationDate = new Date("2026-04-09T06:15:00.000Z");
    const timeZone = "Asia/Kolkata";
    const ayanamsha = getLahiriAyanamsha(observationDate);
    const basePanchanga = getComputedPanchanga(observationDate, ayanamsha);

    it("returns stable tithi transition metadata and changes on the following minute", () => {
        const result = findNextTransition(
            observationDate,
            timeZone,
            (panchanga) => panchanga.tithiIndex,
            (index) => getTithiBySlug(getTithiSlugFromIndex(index))?.name ?? "Unknown",
            ayanamsha,
        );

        expect(result.currentIndex).toBe(basePanchanga.tithiIndex);
        expect(result.currentName).toBe(getTithiBySlug(getTithiSlugFromIndex(result.currentIndex))?.name ?? "Unknown");
        expect(result.nextName).toBe(getTithiBySlug(getTithiSlugFromIndex(result.nextIndex))?.name ?? "Unknown");
        expect(result.endsAt).toMatch(/^\d{2}:\d{2}$/);
        expect(result.endsAtDateTime).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/);

        const finalCurrent = getComputedPanchanga(localDateTimeToUtc(result.endsAtDateTime, timeZone), ayanamsha);
        const firstNext = getComputedPanchanga(new Date(localDateTimeToUtc(result.endsAtDateTime, timeZone).getTime() + 60_000), ayanamsha);

        expect(finalCurrent.tithiIndex).toBe(result.currentIndex);
        if (result.nextIndex === result.currentIndex) {
            expect(firstNext.tithiIndex).toBe(result.currentIndex);
        } else {
            expect(firstNext.tithiIndex).toBe(result.nextIndex);
        }
    });

    it("returns stable nakshatra, yoga, and karana transitions", () => {
        const nakshatra = findNextTransition(
            observationDate,
            timeZone,
            (panchanga) => panchanga.nakshatraIndex,
            (index) => getNakshatraBySlug(getNakshatraSlugFromIndex(index))?.name ?? "Unknown",
            ayanamsha,
        );
        const yoga = findNextTransition(observationDate, timeZone, (panchanga) => panchanga.yogaIndex, (index) => yogas[index] ?? yogas[0], ayanamsha);
        const karana = findNextTransition(
            observationDate,
            timeZone,
            (panchanga) => panchanga.karanaIndex,
            (index) => getKaranaNameFromHalfTithiIndex(index),
            ayanamsha,
        );

        expect(nakshatra.currentIndex).toBe(basePanchanga.nakshatraIndex);
        expect(yoga.currentIndex).toBe(basePanchanga.yogaIndex);
        expect(karana.currentIndex).toBe(basePanchanga.karanaIndex);

        expect(nakshatra.currentName).toBe(getNakshatraBySlug(getNakshatraSlugFromIndex(nakshatra.currentIndex))?.name ?? "Unknown");
        expect(nakshatra.nextName).toBe(getNakshatraBySlug(getNakshatraSlugFromIndex(nakshatra.nextIndex))?.name ?? "Unknown");
        expect(yoga.currentName).toBe(yogas[yoga.currentIndex] ?? yogas[0]);
        expect(yoga.nextName).toBe(yogas[yoga.nextIndex] ?? yogas[0]);
        expect(karana.currentName).toBe(getKaranaNameFromHalfTithiIndex(karana.currentIndex));
        expect(karana.nextName).toBe(getKaranaNameFromHalfTithiIndex(karana.nextIndex));
        expect(nakshatra.endsAt).toMatch(/^\d{2}:\d{2}$/);
        expect(yoga.endsAt).toMatch(/^\d{2}:\d{2}$/);
        expect(karana.endsAt).toMatch(/^\d{2}:\d{2}$/);

        const nakshatraFinal = getComputedPanchanga(localDateTimeToUtc(nakshatra.endsAtDateTime, timeZone), ayanamsha);
        const nakshatraNext = getComputedPanchanga(new Date(localDateTimeToUtc(nakshatra.endsAtDateTime, timeZone).getTime() + 60_000), ayanamsha);
        const yogaFinal = getComputedPanchanga(localDateTimeToUtc(yoga.endsAtDateTime, timeZone), ayanamsha);
        const yogaNext = getComputedPanchanga(new Date(localDateTimeToUtc(yoga.endsAtDateTime, timeZone).getTime() + 60_000), ayanamsha);
        const karanaFinal = getComputedPanchanga(localDateTimeToUtc(karana.endsAtDateTime, timeZone), ayanamsha);
        const karanaNext = getComputedPanchanga(new Date(localDateTimeToUtc(karana.endsAtDateTime, timeZone).getTime() + 60_000), ayanamsha);

        expect(nakshatraFinal.nakshatraIndex).toBe(nakshatra.currentIndex);
        if (nakshatra.nextIndex === nakshatra.currentIndex) {
            expect(nakshatraNext.nakshatraIndex).toBe(nakshatra.currentIndex);
        } else {
            expect(nakshatraNext.nakshatraIndex).toBe(nakshatra.nextIndex);
        }
        expect(yogaFinal.yogaIndex).toBe(yoga.currentIndex);
        if (yoga.nextIndex === yoga.currentIndex) {
            expect(yogaNext.yogaIndex).toBe(yoga.currentIndex);
        } else {
            expect(yogaNext.yogaIndex).toBe(yoga.nextIndex);
        }
        expect(karanaFinal.karanaIndex).toBe(karana.currentIndex);
        if (karana.nextIndex === karana.currentIndex) {
            expect(karanaNext.karanaIndex).toBe(karana.currentIndex);
        } else {
            expect(karanaNext.karanaIndex).toBe(karana.nextIndex);
        }
    });
});