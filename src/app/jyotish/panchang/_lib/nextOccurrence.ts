/**
 * Pure date logic for the programmatic panchang pages' live "Today" block.
 *
 * The detail pages answer two daily-recurring questions for the specific
 * tithi / vara / nakshatra they are about:
 *   - "Is it {name} today?"
 *   - "Next {name}: {date}"
 *
 * The only source of panchang truth is the foundation's `getPanchangForDate`
 * (pure, deterministic for a fixed civil day, server-safe). Rather than couple
 * this logic to that function directly, it takes a `PanchangOracle` callback so
 * the logic can be unit-tested against a controlled stub. That keeps these tests
 * verifying THIS module's date arithmetic and cycle handling instead of the
 * ephemeris model behind the oracle.
 *
 * All date arithmetic is done on `YYYY-MM-DD` calendar parts at UTC noon, so it
 * is free of timezone / DST drift (mirrors the foundation's own approach).
 */

/** The minimal panchang shape this module reads from the oracle. */
export interface OraclePanchang {
    date: string;
    tithi: { slug: string };
    vara: { slug: string };
    nakshatra: { slug: string } | null;
}

/** Resolves the panchang for a `YYYY-MM-DD` civil day. */
export type PanchangOracle = (ymd: string) => OraclePanchang;

/** Which panchang limb a Today block is keyed to. */
export type PanchangLimb = "tithi" | "vara" | "nakshatra";

const YMD_ONLY = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Add `delta` whole days to a `YYYY-MM-DD` string and return a `YYYY-MM-DD`
 * string. Computed at UTC noon so neither DST nor sub-day time can shift the
 * calendar day.
 *
 * @throws If `ymd` is not a `YYYY-MM-DD` string.
 */
export function addDays(ymd: string, delta: number): string {
    if (!YMD_ONLY.test(ymd)) {
        throw new Error(`addDays: expected YYYY-MM-DD, received "${ymd}"`);
    }
    const base = new Date(`${ymd}T12:00:00Z`);
    base.setUTCDate(base.getUTCDate() + delta);
    return base.toISOString().slice(0, 10);
}

/** Read the slug for a given limb from a resolved panchang (null nakshatra → null). */
export function limbSlug(panchang: OraclePanchang, limb: PanchangLimb): string | null {
    if (limb === "tithi") return panchang.tithi.slug;
    if (limb === "vara") return panchang.vara.slug;
    return panchang.nakshatra ? panchang.nakshatra.slug : null;
}

export interface OccurrenceResult {
    /** `YYYY-MM-DD` of the matching day. */
    date: string;
    /** Whole days from `fromYmd` to the match (0 means it matches today). */
    offsetDays: number;
}

/**
 * Whether the limb matches on `fromYmd` itself, i.e. "is it {name} today?".
 */
export function isLimbOnDay(
    oracle: PanchangOracle,
    limb: PanchangLimb,
    targetSlug: string,
    fromYmd: string,
): boolean {
    return limbSlug(oracle(fromYmd), limb) === targetSlug;
}

/**
 * The next day on or after `fromYmd` whose limb equals `targetSlug`.
 *
 * Scans forward day-by-day using the oracle. The window default of 60 days
 * comfortably covers the recurrence of any limb: a vara recurs within 7 days, a
 * nakshatra within ~27, and a tithi within ~30 (allowing for a skipped/repeated
 * tithi). `includeToday` controls whether a match on `fromYmd` counts.
 *
 * @returns The match (with `offsetDays`), or `null` if none within `maxDays`.
 */
export function findNextOccurrence(
    oracle: PanchangOracle,
    limb: PanchangLimb,
    targetSlug: string,
    fromYmd: string,
    options: { includeToday?: boolean; maxDays?: number } = {},
): OccurrenceResult | null {
    const { includeToday = false, maxDays = 60 } = options;
    const start = includeToday ? 0 : 1;
    for (let offset = start; offset <= maxDays; offset += 1) {
        const ymd = addDays(fromYmd, offset);
        if (limbSlug(oracle(ymd), limb) === targetSlug) {
            return { date: ymd, offsetDays: offset };
        }
    }
    return null;
}

/**
 * Defensive plausibility guard for the lunar limbs (tithi, nakshatra).
 *
 * The "Next {name}" claim is only meaningful if the oracle's lunar limb actually
 * advances day-over-day (a healthy tithi/nakshatra cycle changes value several
 * times across a 30-day window). If the oracle is degraded and the limb is
 * effectively frozen, this returns false so callers can suppress the date claim
 * rather than show a wrong "next" date. The vara limb is purely weekday-derived
 * and always healthy, so it is reported healthy without scanning.
 *
 * `minDistinct` is the minimum number of distinct limb values expected across
 * `sampleDays`. A real tithi cycle produces ~15+ distinct values in 30 days; a
 * real nakshatra cycle produces ~27 in 30 days. The conservative default of 5
 * flags only a clearly stuck cycle.
 */
export function isCycleHealthy(
    oracle: PanchangOracle,
    limb: PanchangLimb,
    fromYmd: string,
    options: { sampleDays?: number; minDistinct?: number } = {},
): boolean {
    if (limb === "vara") return true;
    const { sampleDays = 30, minDistinct = 5 } = options;
    const seen = new Set<string>();
    for (let offset = 0; offset < sampleDays; offset += 1) {
        const slug = limbSlug(oracle(addDays(fromYmd, offset)), limb);
        if (slug) seen.add(slug);
        if (seen.size >= minDistinct) return true;
    }
    return seen.size >= minDistinct;
}

export interface TodayAnswer {
    /** The day the answer is for (`YYYY-MM-DD`). */
    today: string;
    /** Whether the page's limb matches today. */
    isToday: boolean;
    /**
     * The next occurrence strictly after today, or `null` when it is today (no
     * "next" needed) or when the cycle is unhealthy / not found in window.
     */
    next: OccurrenceResult | null;
    /** False when the lunar cycle is degraded and the "next" claim is suppressed. */
    cycleHealthy: boolean;
}

/**
 * Compose the full answer the Today block needs for one limb on one day.
 *
 * - `isToday` answers "Is it {name} today?".
 * - When it is today, `next` is intentionally `null` (the UI shows "yes, today"
 *   and does not need a future date).
 * - When it is not today, `next` is the next matching day, but only if the cycle
 *   is healthy; otherwise `next` is `null` and `cycleHealthy` is false so the UI
 *   can omit a date it cannot trust.
 *
 * Pure given a deterministic oracle; safe to call on the server.
 */
export function answerForLimb(
    oracle: PanchangOracle,
    limb: PanchangLimb,
    targetSlug: string,
    today: string,
): TodayAnswer {
    const isToday = isLimbOnDay(oracle, limb, targetSlug, today);
    const cycleHealthy = isCycleHealthy(oracle, limb, today);
    if (isToday) {
        return { today, isToday: true, next: null, cycleHealthy };
    }
    const next = cycleHealthy
        ? findNextOccurrence(oracle, limb, targetSlug, today, { includeToday: false })
        : null;
    return { today, isToday: false, next, cycleHealthy };
}
