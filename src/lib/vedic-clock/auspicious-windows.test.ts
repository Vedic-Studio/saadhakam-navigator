import { describe, expect, it } from "vitest";
import { computeAuspiciousWindows, type AuspiciousWindow } from "@/lib/vedic-clock/auspicious-windows";

const SUNRISE = 342; // 05:42
const SUNSET = 1098; // 18:18

function getWindow(windows: AuspiciousWindow[], name: string): AuspiciousWindow {
    const window = windows.find((item) => item.name === name);
    if (!window) throw new Error(`Window "${name}" not found`);
    return window;
}

describe("computeAuspiciousWindows", () => {
    it("returns exactly 4 windows in the documented order", () => {
        const windows = computeAuspiciousWindows(SUNRISE, SUNSET, 600);

        expect(windows).toHaveLength(4);
        expect(windows.map((window) => window.name)).toEqual([
            "Brahma Muhurta",
            "Pratah Sandhya",
            "Abhijit Muhurta",
            "Sayahna Sandhya",
        ]);
    });

    it("computes the expected sunrise- and sunset-relative ranges", () => {
        const windows = computeAuspiciousWindows(SUNRISE, SUNSET, 600);

        expect(getWindow(windows, "Brahma Muhurta")).toMatchObject({
            startMinutes: 246,
            endMinutes: 294,
            startTime: "04:06",
            endTime: "04:54",
        });
        expect(getWindow(windows, "Pratah Sandhya")).toMatchObject({
            startMinutes: 318,
            endMinutes: 366,
            startTime: "05:18",
            endTime: "06:06",
        });
        expect(getWindow(windows, "Abhijit Muhurta")).toMatchObject({
            startMinutes: 678,
            endMinutes: 726,
            startTime: "11:18",
            endTime: "12:06",
        });
        expect(getWindow(windows, "Sayahna Sandhya")).toMatchObject({
            startMinutes: 1074,
            endMinutes: 1122,
            startTime: "17:54",
            endTime: "18:42",
        });
    });

    it("marks only the matching window active at a given time", () => {
        const windows = computeAuspiciousWindows(SUNRISE, SUNSET, 330);

        expect(getWindow(windows, "Pratah Sandhya").isActive).toBe(true);
        expect(windows.filter((window) => window.isActive)).toHaveLength(1);
    });

    it("marks completed windows as past while future windows remain upcoming", () => {
        const windows = computeAuspiciousWindows(SUNRISE, SUNSET, 800);

        expect(getWindow(windows, "Brahma Muhurta").isPast).toBe(true);
        expect(getWindow(windows, "Pratah Sandhya").isPast).toBe(true);
        expect(getWindow(windows, "Abhijit Muhurta").isPast).toBe(true);
        expect(getWindow(windows, "Sayahna Sandhya").isPast).toBe(false);
    });

    it("handles pre-dawn Brahma Muhurta near midnight-safe boundaries", () => {
        const earlySunrise = 60; // 01:00
        const windows = computeAuspiciousWindows(earlySunrise, 720, 1410); // 23:30 previous night
        const brahma = getWindow(windows, "Brahma Muhurta");

        expect(brahma.startMinutes).toBe(1404);
        expect(brahma.endMinutes).toBe(12);
        expect(brahma.startTime).toBe("23:24");
        expect(brahma.endTime).toBe("00:12");
        expect(brahma.isActive).toBe(true);
        expect(brahma.isPast).toBe(false);
    });

    it("marks a wrapping Brahma Muhurta as past once the window has closed", () => {
        const earlySunrise = 60; // 01:00
        const windows = computeAuspiciousWindows(earlySunrise, 720, 30); // 00:30
        const brahma = getWindow(windows, "Brahma Muhurta");

        expect(brahma.isActive).toBe(false);
        expect(brahma.isPast).toBe(true);
    });
});