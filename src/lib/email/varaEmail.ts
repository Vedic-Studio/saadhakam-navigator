/**
 * Daily "vara" email — the email companion to the "Aaj ka Sadhaka" /today
 * surface. One short, calm email per day carrying the same four anchors the
 * /today page shows: the day's vara and ruling graha, the planetary (beej)
 * mantra, the rotating Bhagavad Gita verse, and a single practice.
 *
 * It reuses the SAME pure selectors the page uses (`getVaraSelection`,
 * `getVerseForDay`, `getPracticeForDay`, `verseHref`) so the email and the page
 * never drift, and renders HTML through the shared `layout.ts` helpers so it
 * matches the newsletter look. Deterministic for a fixed date.
 */

import { wrapEmail, heading, p, quote, card, divider } from "./layout";
import { getVerseForDay, getPracticeForDay, verseHref } from "@/app/today/rotation";
import { getVaraSelection } from "@/app/today/varaSelection";

/** Canonical production origin for absolute links in the email. */
const ORIGIN = "https://www.opensadhaka.com";

/** Join the canonical origin with an app-relative path (no trailing slash). */
function absoluteUrl(path: string): string {
    return `${ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Format a date as a human, locale-stable long date for the subject/header. */
function formatLongDate(ymd: string): string {
    return new Date(`${ymd}T12:00:00Z`).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
    });
}

/**
 * Build the complete daily vara email for a given day.
 *
 * @param date A Date or date string. A `YYYY-MM-DD` string is read verbatim; any
 *   other string or a Date resolves to the Varanasi civil day (via the shared
 *   panchang resolver). The output is deterministic for a fixed date.
 * @returns `{ subject, html }` ready to pass to `resend.emails.send`.
 */
export function buildVaraEmail(date: Date | string): { subject: string; html: string } {
    const { vara, graha, mantra } = getVaraSelection(date);
    const verse = getVerseForDay(date);
    const practice = getPracticeForDay(date);

    // Resolve the civil day (YYYY-MM-DD) for the displayed/header date.
    const longDate = formatLongDate(resolveYmd(date));

    const grahaLabel = graha ? `ruled by ${graha.name}` : "the day's vara";
    const headerSubtitle = `${vara.name} · ${longDate}`;

    const parts: string[] = [];

    parts.push(p(`Today is <strong>${vara.name}</strong>, ${grahaLabel}. Here is one place to begin: a mantra to chant, a verse to sit with, and a single practice to keep the thread of sadhana unbroken.`));

    // ── The day's planetary mantra ───────────────────────────────────────────
    if (mantra) {
        parts.push(divider());
        parts.push(heading("Mantra of the Day"));
        if (mantra.devanagari) {
            parts.push(
                `<p style="font-size:22px;line-height:1.6;color:#111827;margin:0 0 8px;font-family:Georgia,'Times New Roman',serif;">${mantra.devanagari}</p>`,
            );
        }
        parts.push(p(mantra.transliteration, { dim: true }));
        parts.push(p(mantra.oneLineMeaning));
        parts.push(
            p(
                `<a href="${absoluteUrl(`/mantras/${mantra.slug}`)}" style="color:#d97706;text-decoration:none;">Meaning, pronunciation, and method &rarr;</a>`,
                { small: true },
            ),
        );
    }

    // ── Rotating verse ─────────────────────────────────────────────────────────
    parts.push(divider());
    parts.push(heading("Verse for Today"));
    parts.push(quote(verse.gloss, `Bhagavad Gita ${verse.chapter}.${verse.verse}`));
    parts.push(
        p(
            `<a href="${absoluteUrl(verseHref(verse))}" style="color:#d97706;text-decoration:none;">Read the verse, word by word &rarr;</a>`,
            { small: true },
        ),
    );

    // ── Rotating practice ────────────────────────────────────────────────────
    parts.push(divider());
    parts.push(heading("Practice for Today"));
    parts.push(card(practice.title, `${practice.prompt} <a href="${absoluteUrl(practice.href)}" style="color:#92400e;text-decoration:none;font-weight:700;">How to begin &rarr;</a>`));

    const html = wrapEmail({
        headerTitle: "Aaj ka Sadhaka",
        headerSubtitle,
        body: parts.join("\n"),
        footerReason:
            'You receive this daily note because you subscribed for the daily vara on <a href="https://www.opensadhaka.com" style="color:#d97706;text-decoration:none;">opensadhaka.com</a>.',
        preheader: `${vara.name}: today's mantra, a verse, and one practice.`,
        variant: "newsletter",
    });

    return { subject: buildVaraSubject(date), html };
}

/**
 * Generate the daily vara subject line. References the vara (the day) so the
 * inbox shows which day's note it is, e.g. "Somavara — your daily Sadhaka".
 */
export function buildVaraSubject(date: Date | string): string {
    const { vara } = getVaraSelection(date);
    return `${vara.name} — your daily Sadhaka`;
}

const YMD_ONLY = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Resolve a YYYY-MM-DD string for a Date or loose string by formatting in UTC,
 * matching how the rotation/panchang modules read a Date. Used only for the
 * display date; the vara/verse/practice selection is handled by the shared
 * selectors above.
 */
function resolveYmd(date: Date | string): string {
    if (typeof date === "string" && YMD_ONLY.test(date)) {
        return date;
    }
    const d = typeof date === "string" ? new Date(date) : date;
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}
