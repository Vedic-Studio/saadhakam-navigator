/**
 * Pure, server-safe rotation logic for the "Aaj ka Sadhaka" /today surface.
 *
 * The page shows one verse and one practice that are STABLE for a given calendar
 * day but VARY day to day — the "variable reward" in the daily Hook loop. Both
 * are selected by a deterministic day-of-year index into a curated list, so the
 * same date always yields the same pick (no `Math.random`, no `Date.now()` read
 * at module scope). This module has no React, no `window`, and no I/O, so it runs
 * identically in the Server Component and in tests.
 */

/** A curated, well-known Bhagavad Gita verse that links to its existing page. */
export interface RotatingVerse {
    /** Verse id, e.g. "2.47" (chapter.verse). */
    id: string;
    chapter: number;
    verse: number;
    /** One-line gloss shown on the card (our words, not a full translation). */
    gloss: string;
}

/** A curated, low-friction daily practice that links to an existing page. */
export interface RotatingPractice {
    /** Stable key for the card. */
    key: string;
    title: string;
    /** One-line "do this today" prompt. */
    prompt: string;
    /** Existing route to learn/begin the practice. */
    href: string;
}

/**
 * Day-of-year (1..366) for a date, computed from its civil Y-M-D parts in UTC so
 * the index is timezone-drift-free and matches the calendar day the rest of the
 * /today surface uses. Accepts a `Date` or a `YYYY-MM-DD` string.
 */
export function dayOfYear(date: Date | string): number {
    const { year, month, day } = toYmdParts(date);
    const startOfYear = Date.UTC(year, 0, 1);
    const thatDay = Date.UTC(year, month - 1, day);
    return Math.floor((thatDay - startOfYear) / 86_400_000) + 1;
}

/**
 * Pick the element of `list` assigned to a given day. Uses the day-of-year modulo
 * the list length, so the selection is stable within a day and cycles through the
 * whole list across days. Throws on an empty list (a programming error).
 */
export function pickForDay<T>(list: readonly T[], date: Date | string): T {
    if (list.length === 0) {
        throw new Error("pickForDay: list must not be empty");
    }
    const index = (dayOfYear(date) - 1) % list.length;
    return list[index];
}

/**
 * Curated rotation of widely-recognised Bhagavad Gita verses. Each is already
 * seeded in the verse data and routes to
 * `/texts/bhagavad-gita/chapter-<c>/shloka-<v>`. The glosses are short, plain
 * pointers in Sadhaka's voice, not full translations (the verse page carries
 * those). Kept deliberately short so the cycle stays high-quality.
 */
export const TODAY_VERSES: readonly RotatingVerse[] = [
    { id: "2.47", chapter: 2, verse: 47, gloss: "Your right is to the work alone, never to its fruits. Act without clinging to the outcome." },
    { id: "2.20", chapter: 2, verse: 20, gloss: "The Self is never born and never dies. What is real in you was never threatened." },
    { id: "2.14", chapter: 2, verse: 14, gloss: "Heat and cold, pleasure and pain, come and go. Meet them, and let them pass." },
    { id: "2.48", chapter: 2, verse: 48, gloss: "Do your work steady in yoga, even-minded in success and failure. Evenness is yoga." },
    { id: "2.62", chapter: 2, verse: 62, gloss: "Dwelling on objects breeds attachment, attachment breeds desire, desire breeds anger. Watch where the mind lingers." },
    { id: "3.35", chapter: 3, verse: 35, gloss: "Better your own dharma done imperfectly than another's done well. Walk your own path." },
    { id: "4.7", chapter: 4, verse: 7, gloss: "Whenever dharma declines, the Divine takes form again. Order is restored, age after age." },
    { id: "4.8", chapter: 4, verse: 8, gloss: "To protect the good, to set right what has gone wrong, the Divine appears in every age." },
    { id: "6.5", chapter: 6, verse: 5, gloss: "Lift yourself by yourself. Do not let yourself sink. You are your own friend or your own enemy." },
    { id: "6.19", chapter: 6, verse: 19, gloss: "As a lamp in a windless place does not flicker, so is the disciplined mind in meditation." },
    { id: "6.35", chapter: 6, verse: 35, gloss: "The mind is restless, yes. But through practice and dispassion it is steadied." },
    { id: "9.22", chapter: 9, verse: 22, gloss: "To those who worship with undivided heart, what they have is protected and what they lack is provided." },
    { id: "9.26", chapter: 9, verse: 26, gloss: "A leaf, a flower, a fruit, water — offered with love, the Divine accepts it. Devotion needs no grandeur." },
    { id: "12.13", chapter: 12, verse: 13, gloss: "Free from hatred, friendly and compassionate to all, even-minded in pain and pleasure — such a one is dear." },
    { id: "15.7", chapter: 15, verse: 7, gloss: "A fragment of the Divine, eternal, lives as the living being in each body. You are not separate from the source." },
    { id: "18.66", chapter: 18, verse: 66, gloss: "Let go of every other refuge and take refuge in Me alone. Do not grieve — you are held." },
];

/**
 * Curated rotation of one-tap daily practices. Each links to an existing page so
 * the visitor can go deeper. Prompts are concrete and immediately doable today.
 */
export const TODAY_PRACTICES: readonly RotatingPractice[] = [
    { key: "japa", title: "Japa", prompt: "Repeat one mantra, one round of the mala. Let the sound hold the mind.", href: "/how-to-start-japa" },
    { key: "dhyana", title: "Dhyana", prompt: "Sit for ten minutes. Rest attention on the breath, and return each time it wanders.", href: "/practices/dhyana" },
    { key: "pranayama", title: "Pranayama", prompt: "Breathe slowly for two minutes — longer out-breath than in. Steady the breath, steady the day.", href: "/practices/pranayama" },
    { key: "svadhyaya", title: "Svadhyaya", prompt: "Read one verse and sit with it. Self-study is reading that turns inward.", href: "/practices/svadhyaya" },
    { key: "seva", title: "Seva", prompt: "Do one small thing for someone today, expecting nothing back. Service is its own reward.", href: "/practices/seva" },
    { key: "puja", title: "Puja", prompt: "Light a lamp and offer a moment of gratitude. Presence matters more than ritual exactness.", href: "/practices/puja" },
];

interface YmdParts {
    year: number;
    month: number;
    day: number;
}

const YMD_ONLY = /^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * Extract civil Y-M-D parts. A `YYYY-MM-DD` string is read verbatim; a `Date` is
 * read in UTC so a fixed instant maps to a single, stable day in tests.
 */
function toYmdParts(date: Date | string): YmdParts {
    if (typeof date === "string") {
        const match = YMD_ONLY.exec(date);
        if (!match) {
            throw new Error(`rotation: expected YYYY-MM-DD, received "${date}"`);
        }
        return { year: Number(match[1]), month: Number(match[2]), day: Number(match[3]) };
    }
    if (Number.isNaN(date.getTime())) {
        throw new Error("rotation: received an invalid Date");
    }
    return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate() };
}

/** Resolve today's curated verse (stable per civil day). */
export function getVerseForDay(date: Date | string): RotatingVerse {
    return pickForDay(TODAY_VERSES, date);
}

/** Resolve today's curated practice (stable per civil day). */
export function getPracticeForDay(date: Date | string): RotatingPractice {
    return pickForDay(TODAY_PRACTICES, date);
}

/** Build the canonical verse route for a rotating verse. */
export function verseHref(verse: RotatingVerse): string {
    return `/texts/bhagavad-gita/chapter-${verse.chapter}/shloka-${verse.verse}`;
}
