import { getDeityBySlug } from "@/data/deities";
import { getGrahaBySlug, grahas, type Graha } from "@/data/grahas";
import { getMantraBySlug } from "@/data/mantras";
import { getNakshatraBySlug, nakshatras, type Nakshatra } from "@/data/nakshatras";
import { getPracticeBySlug } from "@/data/practices";
import { getRashiBySlug, rashis, type Rashi } from "@/data/rashis";
import { getTithiBySlug, getVaraBySlug, resolveTithiSeo, tithis, varas, type Tithi, type Vara } from "@/data/panchang";

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

export { grahas, rashis, nakshatras, varas, tithis };
export { getGrahaBySlug, getRashiBySlug, getNakshatraBySlug, getVaraBySlug, getTithiBySlug, resolveTithiSeo };
export type { Graha, Rashi, Nakshatra, Vara, Tithi };