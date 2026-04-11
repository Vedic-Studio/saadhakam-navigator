import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { VedicClockResponse } from "@/lib/vedic-clock";
import { PanchangClient } from "@/components/panchang/PanchangClient";

const replaceMock = vi.fn();

vi.mock("next/navigation", () => ({
    useRouter: () => ({ replace: replaceMock }),
    usePathname: () => "/panchang",
    useSearchParams: () => new URLSearchParams("date=2026-04-09"),
}));

const payload: VedicClockResponse = {
    requestedDate: "2026-04-09",
    requestedDateTime: "2026-04-09T07:00",
    location: {
        kind: "preset",
        name: "Varanasi",
        region: "India",
        latitude: 25.3176,
        longitude: 82.9739,
        timezone: "Asia/Kolkata",
    },
    hinduCalendar: {
        monthName: "Chaitra",
        monthSanskrit: "चैत्र",
        paksha: "Shukla",
        samvatYear: 2083,
        samvatName: "Vikram Samvat 2083",
    },
    panchanga: {
        vara: { slug: "guruvara", name: "Guruvara", sanskritName: "गुरुवार", summary: "Wisdom day" },
        tithi: { slug: "shukla-ekadashi", name: "Shukla Ekadashi", sanskritName: "शुक्ल एकादशी", summary: "Fasting and restraint" },
        nakshatra: { slug: "pushya", name: "Pushya", sanskritName: "पुष्य", summary: "Nourishment" },
        yoga: { slug: "siddhi", name: "Siddhi", sanskritName: null, summary: "Siddhi" },
        karana: { slug: "bava", name: "Bava", sanskritName: null, summary: "Bava" },
        rashi: { slug: "mesha", name: "Mesha", sanskritName: "मेष", lunarLongitude: 10.5 },
    },
    transitions: {
        tithi: { currentName: "Shukla Ekadashi", currentIndex: 10, endsAt: "15:42", endsAtDateTime: "2026-04-09T15:42", nextName: "Shukla Dwadashi", nextIndex: 11 },
        nakshatra: { currentName: "Pushya", currentIndex: 7, endsAt: "12:10", endsAtDateTime: "2026-04-09T12:10", nextName: "Ashlesha", nextIndex: 8 },
        yoga: { currentName: "Siddhi", currentIndex: 15, endsAt: "18:00", endsAtDateTime: "2026-04-09T18:00", nextName: "Vyatipata", nextIndex: 16 },
        karana: { currentName: "Bava", currentIndex: 20, endsAt: "15:42", endsAtDateTime: "2026-04-09T15:42", nextName: "Balava", nextIndex: 21 },
    },
    clock: {
        mode: "fixed-48-minute",
        currentLocalTime: "07:00",
        currentLocalDateTime: "2026-04-09T07:00",
        sunriseTime: "05:42",
        sunsetTime: "18:18",
        solarNoonTime: "12:00",
        moonrise: { localDate: "2026-04-09", localTime: "00:00", localDateTime: "2026-04-09T00:00", minutes: 0 },
        moonset: { localDate: "2026-04-09", localTime: "12:00", localDateTime: "2026-04-09T12:00", minutes: 720 },
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
        kalaSegments: [
            { index: 1, name: "Prātaḥ", devanagari: "प्रातःकाल", phase: "day", startTime: "05:42", endTime: "12:00", startCycleMinute: 0, endCycleMinute: 378, isActive: true },
            { index: 2, name: "Madhyāhna", devanagari: "मध्याह्न", phase: "day", startTime: "12:00", endTime: "18:18", startCycleMinute: 378, endCycleMinute: 756, isActive: false },
            { index: 3, name: "Sāyam", devanagari: "सायंकाल", phase: "night", startTime: "18:18", endTime: "00:00", startCycleMinute: 756, endCycleMinute: 1098, isActive: false },
            { index: 4, name: "Niśītha", devanagari: "निशीथ", phase: "night", startTime: "00:00", endTime: "05:41", startCycleMinute: 1098, endCycleMinute: 1440, isActive: false },
        ],
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
    provenance: [],
};

describe("PanchangClient", () => {
    beforeEach(() => {
        replaceMock.mockReset();
        vi.spyOn(global, "fetch").mockResolvedValue({ ok: true, json: async () => payload } as Response);
    });

    it("renders the main panchang sections", () => {
        render(<PanchangClient initialPayload={payload} />);
        // The H1 is now the dynamic Hindu calendar date
        expect(screen.getByRole("heading", { name: /Chaitra Shukla Ekadashi, Vikram Samvat 2083/i })).toBeInTheDocument();
        // Check for specific components or text that should be present
        expect(screen.getAllByText(/Varanasi/i).length).toBeGreaterThan(0);
    });

    it("navigates to the previous day", async () => {
        render(<PanchangClient initialPayload={payload} />);
        await act(async () => {
            fireEvent.click(screen.getByRole("button", { name: /previous day/i }));
        });
        expect(replaceMock).toHaveBeenCalled();
        expect(String(replaceMock.mock.calls[0][0])).toContain("date=2026-04-08");
    });
});