/**
 * Metadata length lint — surfaces the SERP-snippet backlog flagged by Ahrefs
 * (18 May 2026): 88 pages with title >60 chars, 77 pages with description
 * >160 chars, 42 pages with description <70 chars.
 *
 * These are per-page content issues, NOT helper issues — they exist regardless
 * of the OG helper refactor. The test is here to make the backlog explicit:
 *
 *   1. Every registry that feeds metadata into the SEO helper is iterated.
 *   2. Current overflows are captured in `EXPECTED_OVERFLOW_*` sets — the test
 *      passes with the explicit backlog pinned.
 *   3. Two assertions per registry:
 *      a. No new overflow may appear (set difference must be empty).
 *      b. No stale entry may linger in the expected set (every entry must
 *         still actually overflow).
 *
 * Workflow when fixing a page:
 *   - Tighten the title or description in the data file.
 *   - Remove the slug from the matching `EXPECTED_OVERFLOW_*` set.
 *   - Run `npm run test:run -- metadata-length` to confirm.
 *
 * If you add new content and the lint fails with "new overflow", FIX THE
 * CONTENT — don't add the slug to the expected set. The backlog only grows
 * when ratcheting fixes is too painful, never when adding new pages.
 *
 * Limits are based on Google's SERP truncation thresholds (~60 chars title,
 * 70–160 chars description) plus Ahrefs' standard SEO audit defaults.
 */

import { describe, expect, it } from "vitest";
import { articles } from "@/data/articles";
import { comparisons } from "@/data/comparisons";

const TITLE_MAX = 60;
const DESC_MIN = 70;
const DESC_MAX = 160;

/**
 * Articles with titles currently longer than 60 characters. Captured 19 May
 * 2026 as part of the P3 Ahrefs remediation. Each entry should be tightened
 * in `src/data/articles.ts` and removed from this set.
 */
const EXPECTED_ARTICLE_TITLE_OVERFLOW = new Set<string>([
    "10-powerful-sanskrit-mantras",
    "adi-shankaracharya-life-teachings",
    "advaita-vedanta-explained",
    "bhagavad-gita-complete-guide",
    "celebrity-spiritual-courses-review",
    "christian-mysticism-and-vedanta",
    "consciousness-hard-problem-vedanta",
    "dark-night-of-the-soul",
    "do-you-need-a-guru",
    "existentialism-and-vedanta",
    "hindu-goddess-explained",
    "how-karma-dharma-work",
    "how-to-choose-a-mantra",
    "how-to-learn-sanskrit",
    "how-to-study-indian-philosophy-home",
    "inquiry-vs-devotion-path",
    "isha-foundation-sadhguru",
    "kundalini-awakening",
    "meditation-for-anxiety-overthinking",
    "meditation-for-trauma-survivors",
    "midlife-crisis-spiritual-meaning",
    "neuroscience-of-meditation-hinduism",
    "nietzsche-and-vedanta",
    "non-duality-vs-dualism",
    "paramahansa-yogananda-teachings",
    "platos-cave-and-maya",
    "practical-spiritual-practices",
    "ramana-maharshi-who-am-i",
    "ramayana-explained",
    "red-flags-yoga-studios",
    "rishikesh-vs-dharamshala",
    "sacred-sites-india",
    "shaivism-vs-vaishnavism",
    "silent-meditation-retreats-india",
    "south-india-temple-architecture",
    "spiritual-antidote-to-hustle-culture",
    "spiritual-paths-explained",
    "spiritual-practice-sequence",
    "sufi-mysticism-and-vedanta",
    "vedanta-vs-buddhism",
    "vedanta-vs-stoicism",
    "vedas-upanishads-bhagavad-gita-guide",
    "what-is-kriya-yoga",
    "what-is-maya",
    "what-is-sanatan-dharma",
    "which-meditation-for-me",
    "yoga-sutras-complete-guide",
]);

/**
 * Articles with meta descriptions currently longer than 160 characters.
 * Captured 19 May 2026 as part of the P3 Ahrefs remediation.
 */
const EXPECTED_ARTICLE_DESC_OVERFLOW = new Set<string>([
    "10-powerful-sanskrit-mantras",
    "adi-shankaracharya-life-teachings",
    "advaita-vs-dvaita",
    "best-bhagavad-gita-translation-for-beginners",
    "bhagavad-gita-chapter-1",
    "bhagavad-gita-complete-guide",
    "can-i-practice-vedanta-without-converting",
    "carl-jung-and-vedanta",
    "celebrity-spiritual-courses-review",
    "christian-mysticism-and-vedanta",
    "consciousness-hard-problem-vedanta",
    "dark-night-of-the-soul",
    "do-you-need-a-guru",
    "existentialism-and-vedanta",
    "fear-of-death-advaita-vedanta",
    "how-karma-dharma-work",
    "how-to-choose-a-mantra",
    "how-to-learn-sanskrit",
    "how-to-spot-fake-spiritual-guru",
    "how-to-start-meditating-daily",
    "how-to-study-indian-philosophy-home",
    "indian-ashram-etiquette-packing",
    "inquiry-vs-devotion-path",
    "isha-foundation-sadhguru",
    "kailasa-temple-ellora",
    "kailasa-vs-ajanta-caves",
    "kundalini-awakening",
    "meditation-for-anxiety-overthinking",
    "meditation-for-burnout",
    "meditation-for-trauma-survivors",
    "midlife-crisis-spiritual-meaning",
    "most-powerful-shiva-temples-india",
    "nietzsche-and-vedanta",
    "non-duality-vs-dualism",
    "online-yoga-teacher-training-worth-it",
    "paramahansa-yogananda-teachings",
    "practical-spiritual-practices",
    "ramana-maharshi-who-am-i",
    "red-flags-yoga-studios",
    "rishikesh-vs-dharamshala",
    "sacred-sites-india",
    "shaivism-vs-vaishnavism",
    "silent-meditation-retreats-india",
    "south-india-temple-architecture",
    "spiritual-antidote-to-hustle-culture",
    "spiritual-paths-explained",
    "spiritual-practice-sequence",
    "spiritual-travel-india-guide",
    "vedanta-vs-buddhism",
    "vedas-upanishads-bhagavad-gita-guide",
    "what-are-the-upanishads",
    "what-is-kriya-yoga",
    "what-is-maya",
    "what-is-sanatan-dharma",
    "what-is-tantra",
    "what-is-vedanta",
    "which-meditation-for-me",
]);

/**
 * Articles with meta descriptions currently shorter than 70 characters.
 * Captured 19 May 2026 — empty backlog at capture time.
 */
const EXPECTED_ARTICLE_DESC_UNDERFLOW = new Set<string>([]);

/** Comparisons (`/compare/<slug>`) with title length >60. */
const EXPECTED_COMPARISON_TITLE_OVERFLOW = new Set<string>([
    "mahabharata-vs-ramayana",
    "meditation-vs-dhyana",
    "sadhguru-vs-ramana-maharshi",
]);

/** Comparisons with description length >160. */
const EXPECTED_COMPARISON_DESC_OVERFLOW = new Set<string>([
    "sadhaka-vs-insight-timer",
]);

/** Comparisons with description length <70. */
const EXPECTED_COMPARISON_DESC_UNDERFLOW = new Set<string>([]);

interface LengthFinding {
    key: string;
    length: number;
}

interface RegistryReport {
    titleOver: LengthFinding[];
    descOver: LengthFinding[];
    descUnder: LengthFinding[];
}

function scanRegistry<T>(
    items: T[],
    getKey: (item: T) => string,
    getTitle: (item: T) => string | undefined,
    getDesc: (item: T) => string | undefined,
): RegistryReport {
    const report: RegistryReport = {
        titleOver: [],
        descOver: [],
        descUnder: [],
    };
    for (const item of items) {
        const key = getKey(item);
        const title = getTitle(item);
        const desc = getDesc(item);
        if (title && title.length > TITLE_MAX) {
            report.titleOver.push({ key, length: title.length });
        }
        if (desc && desc.length > DESC_MAX) {
            report.descOver.push({ key, length: desc.length });
        }
        if (desc && desc.length < DESC_MIN) {
            report.descUnder.push({ key, length: desc.length });
        }
    }
    return report;
}

function assertAgainstExpected(
    registryLabel: string,
    findings: LengthFinding[],
    expected: Set<string>,
    kind: "title-over" | "desc-over" | "desc-under",
) {
    const actualKeys = new Set(findings.map((f) => f.key));

    // 1. No new overflow may appear beyond the pinned backlog.
    const newOverflows = findings
        .filter((f) => !expected.has(f.key))
        .map((f) => `${f.key} (length=${f.length})`);
    expect(
        newOverflows,
        `${registryLabel} — new ${kind} overflows detected (not in EXPECTED set). ` +
            `Fix the content rather than adding to the backlog.`,
    ).toEqual([]);

    // 2. No stale entry may linger in the expected set.
    const stale: string[] = [];
    for (const key of expected) {
        if (!actualKeys.has(key)) {
            stale.push(key);
        }
    }
    expect(
        stale,
        `${registryLabel} — stale entries in EXPECTED ${kind} set. ` +
            `These slugs no longer overflow — remove them from the set.`,
    ).toEqual([]);
}

describe("metadata length lint — articles", () => {
    const report = scanRegistry(
        articles,
        (a) => a.slug,
        (a) => a.title,
        (a) => a.metaDescription,
    );

    it("no new title overflows beyond the pinned backlog", () => {
        assertAgainstExpected(
            "articles",
            report.titleOver,
            EXPECTED_ARTICLE_TITLE_OVERFLOW,
            "title-over",
        );
    });

    it("no new description overflows beyond the pinned backlog", () => {
        assertAgainstExpected(
            "articles",
            report.descOver,
            EXPECTED_ARTICLE_DESC_OVERFLOW,
            "desc-over",
        );
    });

    it("no new description underflows beyond the pinned backlog", () => {
        assertAgainstExpected(
            "articles",
            report.descUnder,
            EXPECTED_ARTICLE_DESC_UNDERFLOW,
            "desc-under",
        );
    });

    it("scanned every article in the registry", () => {
        expect(articles.length).toBeGreaterThan(0);
        // Sanity: titles and descriptions are always defined for articles.
        for (const a of articles) {
            expect(a.title, `article ${a.slug} missing title`).toBeDefined();
            expect(
                a.metaDescription,
                `article ${a.slug} missing metaDescription`,
            ).toBeDefined();
        }
    });
});

describe("metadata length lint — comparisons", () => {
    const report = scanRegistry(
        comparisons,
        (c) => c.slug,
        (c) => c.title,
        (c) => c.metaDescription,
    );

    it("no new title overflows beyond the pinned backlog", () => {
        assertAgainstExpected(
            "comparisons",
            report.titleOver,
            EXPECTED_COMPARISON_TITLE_OVERFLOW,
            "title-over",
        );
    });

    it("no new description overflows beyond the pinned backlog", () => {
        assertAgainstExpected(
            "comparisons",
            report.descOver,
            EXPECTED_COMPARISON_DESC_OVERFLOW,
            "desc-over",
        );
    });

    it("no new description underflows beyond the pinned backlog", () => {
        assertAgainstExpected(
            "comparisons",
            report.descUnder,
            EXPECTED_COMPARISON_DESC_UNDERFLOW,
            "desc-under",
        );
    });

    it("scanned every comparison in the registry", () => {
        expect(comparisons.length).toBeGreaterThan(0);
        for (const c of comparisons) {
            expect(c.title, `comparison ${c.slug} missing title`).toBeDefined();
            expect(
                c.metaDescription,
                `comparison ${c.slug} missing metaDescription`,
            ).toBeDefined();
        }
    });
});

describe("metadata length lint — pinned backlog summary", () => {
    /**
     * Surfaces the current backlog size in test output so the user always
     * knows how much work remains. Asserts the counts match what was captured
     * at pin-time (19 May 2026) — if it drifts, this test surfaces the change
     * so the team consciously updates the snapshot.
     */
    it("matches the 19 May 2026 captured backlog sizes", () => {
        expect(EXPECTED_ARTICLE_TITLE_OVERFLOW.size).toBe(47);
        expect(EXPECTED_ARTICLE_DESC_OVERFLOW.size).toBe(57);
        expect(EXPECTED_ARTICLE_DESC_UNDERFLOW.size).toBe(0);
        expect(EXPECTED_COMPARISON_TITLE_OVERFLOW.size).toBe(3);
        expect(EXPECTED_COMPARISON_DESC_OVERFLOW.size).toBe(1);
        expect(EXPECTED_COMPARISON_DESC_UNDERFLOW.size).toBe(0);
    });
});
