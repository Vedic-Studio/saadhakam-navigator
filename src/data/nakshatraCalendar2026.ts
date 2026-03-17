import { karanas, tithis, yogas } from "@/data/panchang";
import { nakshatras } from "@/data/nakshatras";

export interface NakshatraCalendarEntry {
    date: string;
    nakshatraSlug: string;
    tithiSlug: string;
    yoga: string;
    karana: string;
}

const start = new Date("2026-01-01T00:00:00.000Z");
const daysInYear = 365;

export const nakshatraCalendar2026: Record<string, NakshatraCalendarEntry> = Object.fromEntries(
    Array.from({ length: daysInYear }, (_, index) => {
        const date = new Date(start);
        date.setUTCDate(start.getUTCDate() + index);
        const iso = date.toISOString().slice(0, 10);
        const nakshatra = nakshatras[index % nakshatras.length];
        const tithi = tithis[index % tithis.length];
        const yoga = yogas[index % yogas.length];
        const karana = karanas[index % karanas.length];

        return [
            iso,
            {
                date: iso,
                nakshatraSlug: nakshatra.slug,
                tithiSlug: tithi.slug,
                yoga,
                karana,
            } satisfies NakshatraCalendarEntry,
        ];
    })
);