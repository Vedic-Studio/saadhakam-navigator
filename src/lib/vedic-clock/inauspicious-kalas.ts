import { formatMinutes } from "@/lib/vedic-clock/interactive";

/**
 * Inauspicious daily kalas (Rahu Kala, Yamaganda, Gulika Kala).
 *
 * Each is computed by dividing the daylight period (sunrise to sunset) into
 * 8 equal octants and selecting the octant that corresponds to the weekday.
 *
 * Octant tables follow the South Indian / Drik Panchang convention
 * (the most widely referenced standard).
 */

export interface InauspiciousKala {
    name: string;
    devanagari: string;
    startTime: string;
    endTime: string;
    startMinutes: number;
    endMinutes: number;
    isActive: boolean;
}

/**
 * Weekday-indexed octant tables (0 = Sunday … 6 = Saturday).
 * Each value is the 1-indexed octant of the 8-part daylight division.
 */
const RAHU_KALA_OCTANTS = [8, 2, 7, 5, 6, 4, 3] as const;
const YAMAGANDA_OCTANTS = [5, 4, 3, 7, 2, 1, 6] as const;
const GULIKA_KALA_OCTANTS = [7, 6, 5, 4, 3, 2, 1] as const;

interface KalaDefinition {
    name: string;
    devanagari: string;
    octants: readonly number[];
}

const KALA_DEFINITIONS: KalaDefinition[] = [
    { name: "Rahu Kala", devanagari: "राहु काल", octants: RAHU_KALA_OCTANTS },
    { name: "Yamaganda", devanagari: "यमगण्ड", octants: YAMAGANDA_OCTANTS },
    { name: "Gulika Kala", devanagari: "गुलिक काल", octants: GULIKA_KALA_OCTANTS },
];

function computeOctantWindow(
    sunriseMinutes: number,
    sunsetMinutes: number,
    octant: number,
): { startMinutes: number; endMinutes: number } {
    const daylightDuration = sunsetMinutes - sunriseMinutes;
    const octantDuration = daylightDuration / 8;
    const startMinutes = Math.round(sunriseMinutes + (octant - 1) * octantDuration);
    const endMinutes = Math.round(sunriseMinutes + octant * octantDuration);
    return { startMinutes, endMinutes };
}

/**
 * Compute the three inauspicious kalas for a given weekday and sunrise/sunset.
 *
 * @param weekday - 0 = Sunday … 6 = Saturday (JS Date.getDay() convention)
 * @param sunriseMinutes - minutes from midnight for local sunrise
 * @param sunsetMinutes - minutes from midnight for local sunset
 * @param currentLocalMinutes - current time as minutes from midnight
 * @returns Array of 3 InauspiciousKala objects (Rahu, Yamaganda, Gulika)
 */
export function computeInauspiciousKalas(
    weekday: number,
    sunriseMinutes: number,
    sunsetMinutes: number,
    currentLocalMinutes: number,
): InauspiciousKala[] {
    return KALA_DEFINITIONS.map((definition) => {
        const octant = definition.octants[weekday];
        const window = computeOctantWindow(sunriseMinutes, sunsetMinutes, octant);
        const isActive =
            currentLocalMinutes >= window.startMinutes &&
            currentLocalMinutes < window.endMinutes;

        return {
            name: definition.name,
            devanagari: definition.devanagari,
            startTime: formatMinutes(window.startMinutes),
            endTime: formatMinutes(window.endMinutes),
            startMinutes: window.startMinutes,
            endMinutes: window.endMinutes,
            isActive,
        };
    });
}
