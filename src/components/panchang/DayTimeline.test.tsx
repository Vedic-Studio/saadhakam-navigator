import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { VedicClockResponse } from "@/lib/vedic-clock";
import { DayTimeline } from "@/components/panchang/DayTimeline";

const payload = {
    requestedDate: "2026-04-09",
    requestedDateTime: "2026-04-09T07:00",
    location: { kind: "preset", name: "Varanasi", region: "India", latitude: 0, longitude: 0, timezone: "Asia/Kolkata" },
    panchanga: {
        vara: { slug: "guruvara", name: "Guruvara", sanskritName: "गुरुवार", summary: "" },
        tithi: { slug: "shukla-ekadashi", name: "Shukla Ekadashi", sanskritName: "", summary: "" },
        nakshatra: { slug: "pushya", name: "Pushya", sanskritName: "", summary: "" },
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
        muhurtas: Array.from({ length: 30 }, (_, index) => ({ index: index + 1, label: `Muhūrta ${index + 1}`, phase: index < 15 ? "day" as const : "night" as const, startTime: "05:42", endTime: "06:30", isActive: index === 1 })),
        kalaSegments: [],
        inauspiciousKalas: [
            { name: "Rahu Kala", devanagari: "राहु काल", startTime: "13:00", endTime: "14:35", startMinutes: 780, endMinutes: 875, isActive: false },
            { name: "Yamaganda", devanagari: "यमगण्ड", startTime: "06:00", endTime: "07:30", startMinutes: 360, endMinutes: 450, isActive: true },
            { name: "Gulika Kala", devanagari: "गुलिक काल", startTime: "09:00", endTime: "10:30", startMinutes: 540, endMinutes: 630, isActive: false },
        ],
        auspiciousWindows: [
            { name: "Brahma Muhurta", devanagari: "ब्रह्म मुहूर्त", description: "", startTime: "04:06", endTime: "04:54", startMinutes: 246, endMinutes: 294, isActive: false, isPast: true },
            { name: "Pratah Sandhya", devanagari: "प्रातः सन्ध्या", description: "", startTime: "05:18", endTime: "06:06", startMinutes: 318, endMinutes: 366, isActive: false, isPast: true },
            { name: "Abhijit Muhurta", devanagari: "अभिजित् मुहूर्त", description: "", startTime: "11:18", endTime: "12:06", startMinutes: 678, endMinutes: 726, isActive: false, isPast: false },
            { name: "Sayahna Sandhya", devanagari: "सायं सन्ध्या", description: "", startTime: "17:54", endTime: "18:42", startMinutes: 1074, endMinutes: 1122, isActive: false, isPast: false },
        ],
    },
    provenance: [],
} satisfies VedicClockResponse;

describe("DayTimeline", () => {
    it("renders a labeled panchang day timeline", () => {
        render(<DayTimeline payload={payload} />);
        expect(screen.getByRole("img", { name: /panchang day timeline/i })).toBeInTheDocument();
        expect(screen.getByText(/Sunrise 05:42/i)).toBeInTheDocument();
        expect(screen.getByText(/Rahu Kala/i)).toBeInTheDocument();
    });
});