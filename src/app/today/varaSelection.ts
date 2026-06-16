/**
 * Pure, server-safe vara -> graha -> mantra binding for the "Aaj ka Sadhaka"
 * /today surface and the daily vara email.
 *
 * This is the single source of truth for "which mantra belongs to today". The
 * binding was previously inlined in `today/page.tsx`; it is extracted here so the
 * email builder and the page resolve the day's mantra IDENTICALLY. The chain is:
 * the day's panchang (via the SSR-safe `getPanchangForDate`) yields the vara, the
 * vara's `rulingGraha` resolves to a Graha, and the graha's first `mantraSlugs`
 * entry (the beej / planetary mantra) resolves to a Mantra.
 *
 * Like `rotation.ts`, this module has no React, no `window`, and no I/O, so it
 * runs identically in the Server Component, in the email builder, and in tests.
 * It is deterministic for a fixed date because `getPanchangForDate` derives the
 * vara from the weekday, which is timezone-independent.
 */

import { getPanchangForDate, getGrahaBySlug, type Graha, type Vara } from "@/lib/jyotish";
import { getMantraBySlug, type Mantra } from "@/data/mantras";

/**
 * The day's vara plus its bound graha and mantra. `graha` is undefined only if
 * the vara's `rulingGraha` slug is not in the grahas table (a data error);
 * `mantra` is undefined if there is no graha or the graha's first mantra slug is
 * unresolved. The page already renders defensively for both absent cases.
 */
export interface VaraSelection {
    /** Full Vara object for the day (name, slug, rulingGraha, etc.). */
    vara: Vara;
    /** The graha that rules the vara, e.g. Chandra for Somavara (Monday). */
    graha: Graha | undefined;
    /** The graha's first (beej / planetary) mantra. */
    mantra: Mantra | undefined;
}

/**
 * Resolve the day's vara -> graha -> mantra binding.
 *
 * @param date A Date or date string. A `YYYY-MM-DD` string is used verbatim; any
 *   other string or a Date is normalised to the Varanasi civil day by
 *   `getPanchangForDate`. The vara is weekday-deterministic, so the binding is
 *   stable for a fixed date regardless of the wall clock.
 * @throws If `getPanchangForDate` cannot resolve a valid date from the input.
 */
export function getVaraSelection(date: Date | string): VaraSelection {
    const panchang = getPanchangForDate(date);

    // Bind the day's mantra: vara -> ruling graha -> its first (beej) mantra.
    const graha = getGrahaBySlug(panchang.vara.rulingGraha);
    const mantraSlug = graha?.mantraSlugs[0];
    const mantra = mantraSlug ? getMantraBySlug(mantraSlug) : undefined;

    return { vara: panchang.vara, graha, mantra };
}
