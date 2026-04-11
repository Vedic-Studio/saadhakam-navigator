import { describe, expect, it } from "vitest";
import { getHinduCalendarContext } from "@/lib/vedic-clock/hindu-calendar";

describe("getHinduCalendarContext", () => {
    it("matches the documented April 2026 Chaitra Krishna fixture", () => {
        const result = getHinduCalendarContext(new Date("2026-04-09T06:15:00.000Z"), 355.18223965680244, 15);

        expect(result).toEqual({
            monthName: "Chaitra",
            monthSanskrit: "चैत्र",
            paksha: "Krishna",
            samvatYear: 2083,
            samvatName: "Vikram Samvat 2083",
        });
    });

    it("matches the documented January 2027 Pausha Shukla fixture", () => {
        const result = getHinduCalendarContext(new Date("2027-01-14T05:00:00.000Z"), 269.5454819089499, 14);

        expect(result).toEqual({
            monthName: "Pausha",
            monthSanskrit: "पौष",
            paksha: "Shukla",
            samvatYear: 2083,
            samvatName: "Vikram Samvat 2083",
        });
    });

    it("matches the documented May 2026 Vaishakha Shukla fixture", () => {
        const result = getHinduCalendarContext(new Date("2026-05-15T00:00:00.000Z"), 10, 2);

        expect(result).toEqual({
            monthName: "Vaishakha",
            monthSanskrit: "वैशाख",
            paksha: "Shukla",
            samvatYear: 2083,
            samvatName: "Vikram Samvat 2083",
        });
    });
});