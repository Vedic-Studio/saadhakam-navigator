import { describe, expect, it } from "vitest";
import { buildSadhanaGuidance } from "@/lib/panchang-guidance";

describe("buildSadhanaGuidance", () => {
    it("synthesizes headline, chips, and practice guidance from panchanga payload", () => {
        const guidance = buildSadhanaGuidance({
            panchanga: {
                vara: { slug: "guruvara", name: "Guruvara", sanskritName: "गुरुवार", summary: "" },
                tithi: { slug: "shukla-ekadashi", name: "Shukla Ekadashi", sanskritName: null, summary: "" },
                nakshatra: { slug: "pushya", name: "Pushya", sanskritName: "पुष्य", summary: "" },
                yoga: "Siddhi",
                karana: "Bava",
            },
            clock: {
                mode: "fixed-48-minute",
                currentLocalTime: "07:00",
                currentLocalDateTime: "2026-04-09T07:00",
                sunriseTime: "05:42",
                sunsetTime: "18:18",
                solarNoonTime: "12:00",
                dayLengthMinutes: 756,
                minutesSinceSunrise: 78,
                cycleProgress: 0.1,
                currentMuhurtaIndex: 2,
                currentKalaIndex: 1,
                sunriseDayStart: { localDate: "2026-04-09", localTime: "05:42", localDateTime: "2026-04-09T05:42", minutes: 342 },
                sunriseDayEnd: { localDate: "2026-04-10", localTime: "05:41", localDateTime: "2026-04-10T05:41", minutes: 341 },
                sunriseToday: { localDate: "2026-04-09", localTime: "05:42", localDateTime: "2026-04-09T05:42", minutes: 342 },
                previousSunrise: { localDate: "2026-04-08", localTime: "05:43", localDateTime: "2026-04-08T05:43", minutes: 343 },
                nextSunrise: { localDate: "2026-04-10", localTime: "05:41", localDateTime: "2026-04-10T05:41", minutes: 341 },
                muhurtas: [],
                kalaSegments: [],
                inauspiciousKalas: [
                    { name: "Rahu Kala", devanagari: "राहु काल", startTime: "13:00", endTime: "14:35", startMinutes: 780, endMinutes: 875, isActive: false },
                    { name: "Yamaganda", devanagari: "यमगण्ड", startTime: "06:00", endTime: "07:30", startMinutes: 360, endMinutes: 450, isActive: true },
                    { name: "Gulika Kala", devanagari: "गुलिक काल", startTime: "09:00", endTime: "10:30", startMinutes: 540, endMinutes: 630, isActive: false },
                ],
                auspiciousWindows: [
                    { name: "Brahma Muhurta", devanagari: "ब्रह्म मुहूर्त", description: "Ideal for meditation.", startTime: "04:06", endTime: "04:54", startMinutes: 246, endMinutes: 294, isActive: false, isPast: true },
                    { name: "Pratah Sandhya", devanagari: "प्रातः सन्ध्या", description: "Dawn junction.", startTime: "05:18", endTime: "06:06", startMinutes: 318, endMinutes: 366, isActive: false, isPast: true },
                    { name: "Abhijit Muhurta", devanagari: "अभिजित् मुहूर्त", description: "Midday auspiciousness.", startTime: "11:18", endTime: "12:06", startMinutes: 678, endMinutes: 726, isActive: false, isPast: false },
                    { name: "Sayahna Sandhya", devanagari: "सायं सन्ध्या", description: "Evening reflection.", startTime: "17:54", endTime: "18:42", startMinutes: 1074, endMinutes: 1122, isActive: false, isPast: false },
                ],
            },
        });

        expect(guidance.headline).toBe("Guruvara, Shukla Ekadashi — wisdom and restraint");
        expect(guidance.chips).toHaveLength(4);
        expect(guidance.chips[0]).toMatchObject({
            tone: "auspicious",
            label: "Best window: Abhijit Muhurta",
        });
        expect(guidance.chips[1]).toMatchObject({
            tone: "caution",
            label: "Avoid now: Yamaganda",
        });
        expect(guidance.chips[2].detail).toContain("Vishnu emphasis");
        expect(guidance.tithiGuidance.deity).toBe("Vishnu");
        expect(guidance.tithiGuidance.linkedPractices.map((practice) => practice.slug)).toEqual(["vrat", "japa"]);
        expect(guidance.varaGuidance.graha).toBe("Brihaspati");
        expect(guidance.nakshatraNote).toContain("Pushya");
        expect(guidance.nakshatraNote).toContain("care");
    });

    it("prioritizes an active auspicious window when one is currently open", () => {
        const guidance = buildSadhanaGuidance({
            panchanga: {
                vara: { slug: "somavara", name: "Somavara", sanskritName: "सोमवार", summary: "" },
                tithi: { slug: "krishna-amavasya", name: "Krishna Amavasya", sanskritName: null, summary: "" },
                nakshatra: { slug: "revati", name: "Revati", sanskritName: "रेवती", summary: "" },
                yoga: "Shubha",
                karana: "Naga",
            },
            clock: {
                mode: "fixed-48-minute",
                currentLocalTime: "18:00",
                currentLocalDateTime: "2026-04-27T18:00",
                sunriseTime: "05:40",
                sunsetTime: "18:20",
                solarNoonTime: "12:00",
                dayLengthMinutes: 760,
                minutesSinceSunrise: 740,
                cycleProgress: 0.5,
                currentMuhurtaIndex: 16,
                currentKalaIndex: 3,
                sunriseDayStart: { localDate: "2026-04-27", localTime: "05:40", localDateTime: "2026-04-27T05:40", minutes: 340 },
                sunriseDayEnd: { localDate: "2026-04-28", localTime: "05:39", localDateTime: "2026-04-28T05:39", minutes: 339 },
                sunriseToday: { localDate: "2026-04-27", localTime: "05:40", localDateTime: "2026-04-27T05:40", minutes: 340 },
                previousSunrise: { localDate: "2026-04-26", localTime: "05:41", localDateTime: "2026-04-26T05:41", minutes: 341 },
                nextSunrise: { localDate: "2026-04-28", localTime: "05:39", localDateTime: "2026-04-28T05:39", minutes: 339 },
                muhurtas: [],
                kalaSegments: [],
                inauspiciousKalas: [
                    { name: "Rahu Kala", devanagari: "राहु काल", startTime: "07:00", endTime: "08:30", startMinutes: 420, endMinutes: 510, isActive: false },
                    { name: "Yamaganda", devanagari: "यमगण्ड", startTime: "10:00", endTime: "11:30", startMinutes: 600, endMinutes: 690, isActive: false },
                    { name: "Gulika Kala", devanagari: "गुलिक काल", startTime: "13:00", endTime: "14:30", startMinutes: 780, endMinutes: 870, isActive: false },
                ],
                auspiciousWindows: [
                    { name: "Brahma Muhurta", devanagari: "ब्रह्म मुहूर्त", description: "Ideal for meditation.", startTime: "04:04", endTime: "04:52", startMinutes: 244, endMinutes: 292, isActive: false, isPast: true },
                    { name: "Pratah Sandhya", devanagari: "प्रातः सन्ध्या", description: "Dawn junction.", startTime: "05:16", endTime: "06:04", startMinutes: 316, endMinutes: 364, isActive: false, isPast: true },
                    { name: "Abhijit Muhurta", devanagari: "अभिजित् मुहूर्त", description: "Midday auspiciousness.", startTime: "11:16", endTime: "12:04", startMinutes: 676, endMinutes: 724, isActive: false, isPast: true },
                    { name: "Sayahna Sandhya", devanagari: "सायं सन्ध्या", description: "Evening reflection.", startTime: "17:56", endTime: "18:44", startMinutes: 1076, endMinutes: 1124, isActive: true, isPast: false },
                ],
            },
        });

        expect(guidance.chips[0]).toMatchObject({
            tone: "auspicious",
            label: "Best now: Sayahna Sandhya",
        });
        expect(guidance.chips[1].label).toBe("Avoid period: Rahu Kala");
        expect(guidance.tithiGuidance.linkedPractices.map((practice) => practice.slug)).toEqual(["puja", "dhyana"]);
        expect(guidance.varaGuidance.graha).toBe("Chandra");
    });
});