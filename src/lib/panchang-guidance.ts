import { getNakshatraBySlug } from "@/data/nakshatras";
import { getTithiBySlug, getVaraBySlug } from "@/data/panchang";
import { getPracticeBySlug, type Practice } from "@/data/practices";
import { getGrahaBySlug } from "@/data/grahas";
import { getNakshatraPracticeBundle, getVaraPracticeBundle } from "@/lib/jyotish";
import type { VedicClockResponse } from "@/lib/vedic-clock/schema";

export type SadhanaChipTone = "auspicious" | "caution" | "observance" | "focus";

export interface SadhanaChip {
    tone: SadhanaChipTone;
    label: string;
    detail: string;
}

export interface LinkedPracticeSummary {
    slug: string;
    title: string;
    sanskritName: string;
    summary: string;
}

export interface SadhanaGuidance {
    headline: string;
    chips: SadhanaChip[];
    tithiGuidance: {
        deity: string;
        suggestion: string;
        linkedPractices: LinkedPracticeSummary[];
    };
    varaGuidance: {
        graha: string;
        suggestion: string;
    };
    nakshatraNote: string;
}

type PanchangGuidanceInput = Pick<VedicClockResponse, "panchanga" | "clock">;

function compact<T>(items: Array<T | undefined>): T[] {
    return items.filter(Boolean) as T[];
}

function formatPracticeList(practices: Array<Pick<Practice, "title">>): string {
    if (practices.length === 0) return "quiet practice";
    if (practices.length === 1) return practices[0].title.toLowerCase();
    if (practices.length === 2) return `${practices[0].title.toLowerCase()} and ${practices[1].title.toLowerCase()}`;
    return `${practices
        .slice(0, -1)
        .map((practice) => practice.title.toLowerCase())
        .join(", ")}, and ${practices[practices.length - 1].title.toLowerCase()}`;
}

function toPracticeSummary(practice: Practice): LinkedPracticeSummary {
    return {
        slug: practice.slug,
        title: practice.title,
        sanskritName: practice.sanskritName,
        summary: practice.summary,
    };
}

function pickTithiTheme(meaning: string, practiceSlugs: string[]): string {
    const lowerMeaning = meaning.toLowerCase();

    if (lowerMeaning.includes("restraint") || practiceSlugs.includes("vrat")) return "restraint";
    if (lowerMeaning.includes("wisdom")) return "wisdom";
    if (lowerMeaning.includes("renewal")) return "renewal";
    if (lowerMeaning.includes("healing")) return "healing";
    if (lowerMeaning.includes("purification")) return "purification";
    if (lowerMeaning.includes("reflection") || lowerMeaning.includes("observance")) return "reflection";
    if (lowerMeaning.includes("devotion")) return "devotion";
    if (lowerMeaning.includes("courage")) return "courage";

    if (practiceSlugs.includes("dhyana")) return "reflection";
    if (practiceSlugs.includes("puja")) return "devotion";
    if (practiceSlugs.includes("svadhyaya")) return "study";
    if (practiceSlugs.includes("japa")) return "mantra focus";

    return "attunement";
}

function buildHeadline(varaName: string, varaTheme: string, tithiName: string, tithiTheme: string): string {
    return `${varaName}, ${tithiName} — ${varaTheme} and ${tithiTheme}`;
}

function describeBestWindow(input: PanchangGuidanceInput): SadhanaChip {
    const activeWindow = input.clock.auspiciousWindows.find((window) => window.isActive);
    if (activeWindow) {
        return {
            tone: "auspicious",
            label: `Best now: ${activeWindow.name}`,
            detail: `${activeWindow.startTime}–${activeWindow.endTime} · ${activeWindow.description}`,
        };
    }

    const nextWindow = input.clock.auspiciousWindows.find((window) => !window.isPast);
    const fallbackWindow = input.clock.auspiciousWindows[0];
    const window = nextWindow ?? fallbackWindow;

    return {
        tone: "auspicious",
        label: `Best window: ${window.name}`,
        detail: `${window.startTime}–${window.endTime} · ${window.description}`,
    };
}

function describeAvoidPeriod(input: PanchangGuidanceInput): SadhanaChip {
    const activeKala = input.clock.inauspiciousKalas.find((kala) => kala.isActive);
    if (activeKala) {
        return {
            tone: "caution",
            label: `Avoid now: ${activeKala.name}`,
            detail: `${activeKala.startTime}–${activeKala.endTime} · Better for pause, mantra, or non-initiatory work.`,
        };
    }

    const currentMinutes = input.clock.minutesSinceSunrise >= 0
        ? (input.clock.sunriseToday.minutes + input.clock.minutesSinceSunrise) % 1440
        : input.clock.sunriseToday.minutes;

    const upcomingKala = input.clock.inauspiciousKalas.find((kala) => kala.startMinutes > currentMinutes);
    const kala = upcomingKala ?? input.clock.inauspiciousKalas[0];

    return {
        tone: "caution",
        label: `Avoid period: ${kala.name}`,
        detail: `${kala.startTime}–${kala.endTime} · Keep major beginnings outside this band when possible.`,
    };
}

function buildObservanceChip(tithiName: string, deity: string, practices: Practice[]): SadhanaChip {
    return {
        tone: "observance",
        label: `Tithi focus: ${tithiName}`,
        detail: `${deity} emphasis · Support with ${formatPracticeList(practices)}.`,
    };
}

function buildNakshatraChip(name: string, qualities: string[]): SadhanaChip {
    return {
        tone: "focus",
        label: `Nakshatra: ${name}`,
        detail: `Qualities highlighted today: ${qualities.slice(0, 3).join(", ")}.`,
    };
}

export function buildSadhanaGuidance(input: PanchangGuidanceInput): SadhanaGuidance {
    const vara = getVaraBySlug(input.panchanga.vara.slug);
    const tithi = getTithiBySlug(input.panchanga.tithi.slug);
    const nakshatra = getNakshatraBySlug(input.panchanga.nakshatra.slug);

    if (!vara || !tithi || !nakshatra) {
        throw new Error("Unable to synthesize panchang guidance from the provided payload");
    }

    const varaBundle = getVaraPracticeBundle(vara.slug);
    const nakshatraBundle = getNakshatraPracticeBundle(nakshatra.slug);
    const varaGraha = getGrahaBySlug(vara.rulingGraha);
    const tithiPractices = compact(tithi.practiceSlugs.map(getPracticeBySlug));
    const varaPractices = varaBundle?.practices ?? [];
    const tithiTheme = pickTithiTheme(tithi.meaning, tithi.practiceSlugs);
    const varaTheme = varaGraha?.significations[0] ?? varaPractices[0]?.title.toLowerCase() ?? "attentiveness";

    return {
        headline: buildHeadline(vara.name, varaTheme, tithi.name, tithiTheme),
        chips: [
            describeBestWindow(input),
            describeAvoidPeriod(input),
            buildObservanceChip(tithi.name, tithi.deity, tithiPractices),
            buildNakshatraChip(nakshatra.name, nakshatra.qualities),
        ],
        tithiGuidance: {
            deity: tithi.deity,
            suggestion: `${tithi.name} carries a ${tithi.meaning.toLowerCase()} Emphasize ${formatPracticeList(tithiPractices)} in a way that honors ${tithi.deity}.`,
            linkedPractices: tithiPractices.map(toPracticeSummary),
        },
        varaGuidance: {
            graha: varaGraha?.name ?? vara.rulingGraha,
            suggestion:
                varaBundle?.summary ??
                `${vara.name} supports ${formatPracticeList(varaPractices)} with a steady orientation toward ${vara.rulingGraha}.`,
        },
        nakshatraNote:
            `${nakshatra.name} brings forward ${nakshatra.qualities.slice(0, 3).join(", ")} under ${nakshatraBundle?.deityName ?? nakshatra.deitySlug
            }. ${nakshatraBundle?.summary ?? "Let the day be shaped by the nakshatra's quieter texture."}`,
    };
}