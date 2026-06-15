import { getDeityBySlug } from "@/data/deities";
import { getGrahaBySlug, grahas, type Graha } from "@/data/grahas";
import { getMantraBySlug } from "@/data/mantras";
import { getNakshatraBySlug, nakshatras, type Nakshatra } from "@/data/nakshatras";
import { getPracticeBySlug } from "@/data/practices";
import { getRashiBySlug, rashis, type Rashi } from "@/data/rashis";
import { getTithiBySlug, getVaraBySlug, resolveTithiSeo, tithis, varas, type Tithi, type Vara } from "@/data/panchang";
import { buildVedicClockResponse } from "@/lib/vedic-clock/core";

export interface PracticeBundle {
    title: string;
    summary: string;
    graha?: Graha;
    deityName?: string;
    practices: ReturnType<typeof getPracticeBySlug>[];
    mantras: ReturnType<typeof getMantraBySlug>[];
}

function compact<T>(items: Array<T | undefined>): T[] {
    return items.filter(Boolean) as T[];
}

export function getGrahaPracticeBundle(slug: string): PracticeBundle | null {
    const graha = getGrahaBySlug(slug);
    if (!graha) return null;
    const deity = getDeityBySlug(graha.deitySlug);

    return {
        title: `${graha.name} practice bundle`,
        summary: `A reflective ${graha.name}-oriented practice set focused on ${graha.significations.slice(0, 3).join(", ")}.`,
        graha,
        deityName: deity?.name,
        practices: compact(graha.practiceSlugs.map(getPracticeBySlug)),
        mantras: compact(graha.mantraSlugs.map(getMantraBySlug)),
    };
}

export function getNakshatraPracticeBundle(slug: string): PracticeBundle | null {
    const nakshatra = getNakshatraBySlug(slug);
    if (!nakshatra) return null;
    const graha = getGrahaBySlug(nakshatra.rulingGraha);
    const deity = getDeityBySlug(nakshatra.deitySlug);

    return {
        title: `${nakshatra.name} practice bundle`,
        summary: `${nakshatra.name} is approached through practices that support ${nakshatra.qualities.join(", ")}.`,
        graha,
        deityName: deity?.name,
        practices: compact(nakshatra.practiceSlugs.map(getPracticeBySlug)),
        mantras: graha ? compact(graha.mantraSlugs.map(getMantraBySlug)) : [],
    };
}

export function getVaraPracticeBundle(slug: string): PracticeBundle | null {
    const vara = getVaraBySlug(slug);
    if (!vara) return null;
    const graha = getGrahaBySlug(vara.rulingGraha);
    const deity = graha ? getDeityBySlug(graha.deitySlug) : undefined;

    return {
        title: `${vara.name} practice bundle`,
        summary: vara.description,
        graha,
        deityName: deity?.name,
        practices: compact(vara.practiceSlugs.map(getPracticeBySlug)),
        mantras: graha ? compact(graha.mantraSlugs.map(getMantraBySlug)) : [],
    };
}

export function getRelatedNakshatrasForRashi(rashiSlug: string) {
    return nakshatras.filter((nakshatra) => nakshatra.rashiSlugs.includes(rashiSlug));
}

export function getRelatedRashisForGraha(grahaSlug: string) {
    return rashis.filter((rashi) => rashi.rulingGraha === grahaSlug);
}

export function getRelatedNakshatrasForGraha(grahaSlug: string) {
    return nakshatras.filter((nakshatra) => nakshatra.rulingGraha === grahaSlug);
}

export function getRelatedGrahaForRashi(rashiSlug: string) {
    const rashi = getRashiBySlug(rashiSlug);
    return rashi ? getGrahaBySlug(rashi.rulingGraha) : undefined;
}

export function getAllJyotishSlugs() {
    return {
        grahas: grahas.map((item) => item.slug),
        rashis: rashis.map((item) => item.slug),
        nakshatras: nakshatras.map((item) => item.slug),
        varas: varas.map((item) => item.slug),
        tithis: tithis.map((item) => item.slug),
    };
}

/**
 * Default location for the day's panchang. Varanasi (Kashi) is the canonical
 * spiritual reference city of the tradition and the first preset in
 * `vedicClockPresetCities`. The vara (weekday) is timezone-independent, but the
 * tithi/nakshatra depend on the moment, so they are computed for this city's
 * civil day (Asia/Kolkata).
 */
export const DEFAULT_PANCHANG_CITY_ID = "varanasi";
const DEFAULT_PANCHANG_TIMEZONE = "Asia/Kolkata";

/**
 * The day's panchang in the shape downstream features (Round 1) consume. `vara`
 * is the FULL Vara object so callers can read `vara.rulingGraha` to bind the
 * day's mantra. `tithi` carries paksha and number for SEO/labels. `nakshatra` is
 * null only if the underlying response could not resolve a lunar mansion.
 */
export interface PanchangForDate {
    /** The civil date the panchang is for, as YYYY-MM-DD. */
    date: string;
    tithi: {
        slug: string;
        name: string;
        paksha: Tithi["paksha"];
        number: number;
    };
    /** Full Vara object (includes rulingGraha for mantra binding). */
    vara: Vara;
    nakshatra: {
        slug: string;
        name: string;
    } | null;
}

const YMD_ONLY = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Format a Date as YYYY-MM-DD in the default panchang timezone, so a Date built
 * from a UTC instant still maps to the intended Indian civil day.
 */
function toCivilYmd(date: Date): string {
    const formatter = new Intl.DateTimeFormat("en-CA", {
        timeZone: DEFAULT_PANCHANG_TIMEZONE,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
    return formatter.format(date);
}

/**
 * Resolve the panchang for a given day at the default city (Varanasi).
 *
 * Wraps `buildVedicClockResponse` and reshapes it to `PanchangForDate`. The vara
 * is weekday-deterministic, so it is stable for a fixed date regardless of the
 * wall clock. Tithi and nakshatra are derived from the ephemeris model for noon
 * of that civil day.
 *
 * @param date A Date or a date string. A `YYYY-MM-DD` string is used verbatim;
 *   any other string or a Date is normalised to the Varanasi civil day.
 * @throws If a string cannot be parsed into a valid date.
 */
export function getPanchangForDate(date: Date | string): PanchangForDate {
    let ymd: string;
    if (typeof date === "string") {
        ymd = YMD_ONLY.test(date) ? date : toCivilYmd(new Date(date));
    } else {
        ymd = toCivilYmd(date);
    }

    if (!YMD_ONLY.test(ymd) || Number.isNaN(new Date(`${ymd}T12:00:00Z`).getTime())) {
        throw new Error(`getPanchangForDate: could not resolve a valid date from input: ${String(date)}`);
    }

    const response = buildVedicClockResponse({ cityId: DEFAULT_PANCHANG_CITY_ID, date: ymd });

    // Resolve the full Vara so callers get rulingGraha; the response vara.slug is
    // weekday-derived and always maps to a real vara.
    const vara = getVaraBySlug(response.panchanga.vara.slug);
    if (!vara) {
        throw new Error(`getPanchangForDate: unresolved vara slug "${response.panchanga.vara.slug}" for ${ymd}`);
    }

    // Resolve the full Tithi for paksha/number; fall back to the response fields
    // if the slug is unexpectedly absent from the tithi table.
    const fullTithi = getTithiBySlug(response.panchanga.tithi.slug);

    const nakshatraSlug = response.panchanga.nakshatra.slug;
    const nakshatra =
        nakshatraSlug && nakshatraSlug !== "unknown"
            ? { slug: nakshatraSlug, name: response.panchanga.nakshatra.name }
            : null;

    return {
        date: ymd,
        tithi: {
            slug: response.panchanga.tithi.slug,
            name: response.panchanga.tithi.name,
            paksha: fullTithi?.paksha ?? "Shukla",
            number: fullTithi?.number ?? 0,
        },
        vara,
        nakshatra,
    };
}

export { grahas, rashis, nakshatras, varas, tithis };
export { getGrahaBySlug, getRashiBySlug, getNakshatraBySlug, getVaraBySlug, getTithiBySlug, resolveTithiSeo };
export type { Graha, Rashi, Nakshatra, Vara, Tithi };