/**
 * Server-side orchestration for the live "Today" block on the programmatic
 * panchang detail pages. Binds the foundation's `getPanchangForDate` to the pure
 * `nextOccurrence` logic and produces the plain, serializable props the client
 * `PanchangTodayBlock` renders. Runs only in a Server Component (the ephemeris
 * model is server-only); the client child fires analytics on mount.
 */
import { getPanchangForDate } from "@/lib/jyotish";
import {
    answerForLimb,
    type OraclePanchang,
    type PanchangLimb,
    type PanchangOracle,
} from "./nextOccurrence";
import type { PanchangTodayBlockProps } from "../PanchangTodayBlock";

/** Adapt the foundation panchang to the oracle shape the pure logic expects. */
const realOracle: PanchangOracle = (ymd: string): OraclePanchang => {
    const p = getPanchangForDate(ymd);
    return {
        date: p.date,
        tithi: { slug: p.tithi.slug },
        vara: { slug: p.vara.slug },
        nakshatra: p.nakshatra ? { slug: p.nakshatra.slug } : null,
    };
};

/**
 * Format a `YYYY-MM-DD` civil day as a stable, locale-independent label such as
 * "Tuesday, 16 June 2026". Built from UTC parts so the server-rendered string is
 * deterministic and matches on the client (no hydration drift, no dependence on
 * the runtime's default locale).
 */
export function formatCivilDayLabel(ymd: string): string {
    const date = new Date(`${ymd}T12:00:00Z`);
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getUTCDay()];
    const month = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ][date.getUTCMonth()];
    return `${weekday}, ${date.getUTCDate()} ${month} ${date.getUTCFullYear()}`;
}

export interface BuildTodayBlockArgs {
    /** Which limb the page is about. */
    limb: PanchangLimb;
    /** The page entity's slug, e.g. `shukla-panchami`, `budhavara`, `pushya`. */
    slug: string;
    /** The page entity's display name, e.g. "Shukla Panchami". */
    entityName: string;
    /**
     * Today's reference civil day as `YYYY-MM-DD`. Production resolves this from
     * the foundation (`resolveTodayYmd`) so it is the Varanasi civil day, not the
     * server's UTC day; tests pass a fixed value.
     */
    todayYmd: string;
}

/**
 * Resolve "today" as the reference-city (Varanasi) civil day. Delegates the
 * timezone normalisation to the foundation: passing a `Date` makes
 * `getPanchangForDate` map it to the Varanasi civil day and echo it back as
 * `.date`. Call this once per request in the Server Component.
 */
export function resolveTodayYmd(now: Date = new Date()): string {
    return getPanchangForDate(now).date;
}

/**
 * Compute the full prop bundle for `PanchangTodayBlock` for one page.
 *
 * `oracle` is injectable for tests; production passes the real foundation-backed
 * oracle. The returned `event.nakshatra` is left `undefined` (not an empty
 * string) when today's nakshatra is unavailable, so the analytics wrapper drops
 * it cleanly.
 */
export function buildTodayBlockProps(
    args: BuildTodayBlockArgs,
    oracle: PanchangOracle = realOracle,
): PanchangTodayBlockProps {
    const { limb, slug, entityName, todayYmd } = args;
    const today = oracle(todayYmd).date;
    const todayPanchang = oracle(today);
    const answer = answerForLimb(oracle, limb, slug, today);

    return {
        today,
        todayLabel: formatCivilDayLabel(today),
        limb,
        entityName,
        isToday: answer.isToday,
        nextDate: answer.next ? answer.next.date : null,
        nextDateLabel: answer.next ? formatCivilDayLabel(answer.next.date) : null,
        todayPanchang: {
            tithiName: humanizeSlug(todayPanchang.tithi.slug),
            varaName: humanizeSlug(todayPanchang.vara.slug),
            nakshatraName: todayPanchang.nakshatra ? humanizeSlug(todayPanchang.nakshatra.slug) : null,
        },
        event: {
            tithi: todayPanchang.tithi.slug,
            vara: todayPanchang.vara.slug,
            nakshatra: todayPanchang.nakshatra ? todayPanchang.nakshatra.slug : undefined,
        },
    };
}

/** Turn `shukla-panchami` into `Shukla Panchami` for the at-a-glance row. */
function humanizeSlug(slug: string): string {
    return slug
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
}
