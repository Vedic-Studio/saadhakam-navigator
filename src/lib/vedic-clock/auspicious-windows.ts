import { formatMinutes } from "@/lib/vedic-clock/interactive";

/**
 * Auspicious sadhana-relevant time windows derived from sunrise/sunset/solar noon.
 *
 * These are the daily windows most referenced in the panchang research docs
 * for spiritual practice timing.
 */

export interface AuspiciousWindow {
    name: string;
    devanagari: string;
    description: string;
    startTime: string;
    endTime: string;
    startMinutes: number;
    endMinutes: number;
    isActive: boolean;
    isPast: boolean;
}

/**
 * Brahma Muhurta: approximately 96 minutes before sunrise (two muhurta units).
 * One muhurta = 48 minutes. Brahma Muhurta spans from 96 to 48 minutes
 * before sunrise.
 */
function brahmaMuhurta(sunriseMinutes: number): Omit<AuspiciousWindow, "isActive" | "isPast"> {
    const startMinutes = ((sunriseMinutes - 96) % 1440 + 1440) % 1440;
    const endMinutes = ((sunriseMinutes - 48) % 1440 + 1440) % 1440;
    return {
        name: "Brahma Muhurta",
        devanagari: "ब्रह्म मुहूर्त",
        description: "Ideal for meditation, japa, and scriptural study. Sattva is strongest.",
        startTime: formatMinutes(startMinutes),
        endTime: formatMinutes(endMinutes),
        startMinutes,
        endMinutes,
    };
}

/**
 * Pratah Sandhya: approximately 24 minutes before and after sunrise.
 * The dawn junction used for sandhyavandana and gayatri japa.
 */
function pratahSandhya(sunriseMinutes: number): Omit<AuspiciousWindow, "isActive" | "isPast"> {
    const startMinutes = sunriseMinutes - 24;
    const endMinutes = sunriseMinutes + 24;
    return {
        name: "Pratah Sandhya",
        devanagari: "प्रातः सन्ध्या",
        description: "Dawn junction for sandhyavandana, gayatri japa, and pranyama.",
        startTime: formatMinutes(startMinutes),
        endTime: formatMinutes(endMinutes),
        startMinutes,
        endMinutes,
    };
}

/**
 * Abhijit Muhurta: the 8th muhurta of the day, centered around solar noon.
 * Universally auspicious — overrides most negative factors.
 * Calculated as sunriseMinutes + 7*48 to sunriseMinutes + 8*48.
 */
function abhijitMuhurta(sunriseMinutes: number): Omit<AuspiciousWindow, "isActive" | "isPast"> {
    const startMinutes = sunriseMinutes + 7 * 48;
    const endMinutes = sunriseMinutes + 8 * 48;
    return {
        name: "Abhijit Muhurta",
        devanagari: "अभिजित् मुहूर्त",
        description: "Universally auspicious midday window for important beginnings and sankalpa.",
        startTime: formatMinutes(startMinutes),
        endTime: formatMinutes(endMinutes),
        startMinutes,
        endMinutes,
    };
}

/**
 * Sayahna Sandhya: approximately 24 minutes before and after sunset.
 * The dusk junction for evening arati, japa, and reflection.
 */
function sayahnaSandhya(sunsetMinutes: number): Omit<AuspiciousWindow, "isActive" | "isPast"> {
    const startMinutes = sunsetMinutes - 24;
    const endMinutes = sunsetMinutes + 24;
    return {
        name: "Sayahna Sandhya",
        devanagari: "सायं सन्ध्या",
        description: "Dusk junction for evening arati, japa, and contemplative reflection.",
        startTime: formatMinutes(startMinutes),
        endTime: formatMinutes(endMinutes),
        startMinutes,
        endMinutes,
    };
}

function isWithinWindow(currentMinutes: number, startMinutes: number, endMinutes: number): boolean {
    if (startMinutes <= endMinutes) {
        return currentMinutes >= startMinutes && currentMinutes < endMinutes;
    }
    // Wraps around midnight (e.g., Brahma Muhurta at 04:00 when sunrise is 05:30)
    return currentMinutes >= startMinutes || currentMinutes < endMinutes;
}

/**
 * Compute the four key auspicious sadhana windows for a given day.
 *
 * @param sunriseMinutes - minutes from midnight for local sunrise
 * @param sunsetMinutes - minutes from midnight for local sunset
 * @param currentLocalMinutes - current time as minutes from midnight
 * @returns Array of 4 AuspiciousWindow objects
 */
export function computeAuspiciousWindows(
    sunriseMinutes: number,
    sunsetMinutes: number,
    currentLocalMinutes: number,
): AuspiciousWindow[] {
    const windows = [
        brahmaMuhurta(sunriseMinutes),
        pratahSandhya(sunriseMinutes),
        abhijitMuhurta(sunriseMinutes),
        sayahnaSandhya(sunsetMinutes),
    ];

    return windows.map((window) => {
        const isActive = isWithinWindow(currentLocalMinutes, window.startMinutes, window.endMinutes);
        // For non-wrapping windows, past = currentMinutes >= endMinutes.
        // For Brahma Muhurta that wraps midnight, past means we're between
        // endMinutes and the next sunrise (i.e., after the window closed).
        const isPast = !isActive && (
            window.startMinutes <= window.endMinutes
                ? currentLocalMinutes >= window.endMinutes
                : currentLocalMinutes >= window.endMinutes && currentLocalMinutes < window.startMinutes
        );

        return { ...window, isActive, isPast };
    });
}
