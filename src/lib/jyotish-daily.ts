import { nakshatraCalendar2026 } from "@/data/nakshatraCalendar2026";
import { getNakshatraBySlug, getTithiBySlug, getVaraBySlug, getGrahaBySlug } from "@/lib/jyotish";
import { getVaraPracticeBundle } from "@/lib/jyotish";

const weekdayMap = [
    "ravivara",
    "somavara",
    "mangalavara",
    "budhavara",
    "guruvara",
    "shukravara",
    "shanivara",
] as const;

export function getDailyJyotishGuidance(inputDate: Date) {
    const date = new Date(inputDate);
    const isoDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString().slice(0, 10);
    const varaSlug = weekdayMap[date.getDay()];
    const vara = getVaraBySlug(varaSlug);
    const bundle = getVaraPracticeBundle(varaSlug);
    const entry = nakshatraCalendar2026[isoDate];

    return {
        isoDate,
        vara,
        varaBundle: bundle,
        varaGraha: vara ? getGrahaBySlug(vara.rulingGraha) : undefined,
        nakshatra: entry ? getNakshatraBySlug(entry.nakshatraSlug) : undefined,
        tithi: entry ? getTithiBySlug(entry.tithiSlug) : undefined,
        yoga: entry?.yoga,
        karana: entry?.karana,
        hasCalendarData: Boolean(entry),
    };
}