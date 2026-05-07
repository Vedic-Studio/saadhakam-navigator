import { describe, expect, it } from "vitest";
import { metadata as advaitaMeta } from "@/app/advaita-vedanta-explained/page";
import { metadata as homeMeta } from "@/app/page";
import { metadata as karmaMeta } from "@/app/how-karma-dharma-work/page";
import { metadata as japaMeta } from "@/app/how-to-start-japa/page";
import { metadata as philosophiesMeta } from "@/app/philosophies/page";
import { metadata as compareMeta } from "@/app/compare/page";
import { metadata as mayaMeta } from "@/app/what-is-maya/page";
import { metadata as routineMeta } from "@/app/daily-spiritual-routine-beginners/page";
import { generateMetadata as sanskritGenerateMetadata } from "@/app/learn/sanskrit/[word]/page";
import { sanskritVocab } from "@/data/sanskritVocab";
import { comparisons } from "@/data/comparisons";
import { articles } from "@/data/articles";
import type { Metadata } from "next";

// Phase 1 CTR rewrite — locks SERP-budget compliance for the 8 highest-impact
// pages from PR #20, the per-word Sanskrit overrides, the two PR #20
// comparison entries, and the can-i-chant article registry entry.
//
// SERP truncation: Google cuts titles past ~60 chars and descriptions past
// ~160 chars. Going over means the rewrite never reaches the user. Test
// catches drift the moment a title is loosened past budget.

const TITLE_MAX = 60;
const DESC_MAX = 160;
const DESC_MIN = 120;

const HARDBAN = [
    "Hindu philosophy",
    "ultimate guide",
    "comprehensive guide",
    "actually work",
    "step-by-step guide",
];

function strField(meta: Metadata, key: "title" | "description"): string {
    const raw = meta[key];
    if (typeof raw === "string") return raw;
    if (raw && typeof raw === "object" && "default" in raw) {
        return String((raw as { default: string }).default);
    }
    return String(raw);
}

function ogTitle(meta: Metadata): string {
    const t = meta.openGraph?.title;
    if (typeof t === "string") return t;
    if (t && typeof t === "object" && "default" in t) {
        return String((t as { default: string }).default);
    }
    return "";
}

function ogDesc(meta: Metadata): string {
    const d = meta.openGraph?.description;
    return typeof d === "string" ? d : "";
}

function assertBudget(
    label: string,
    title: string,
    description: string,
    { titleMin = 50 }: { titleMin?: number } = {},
) {
    if (titleMin > 0) {
        expect(title.length, `${label} title length=${title.length} :: ${title}`).toBeGreaterThanOrEqual(titleMin);
    }
    expect(title.length, `${label} title length=${title.length} :: ${title}`).toBeLessThanOrEqual(TITLE_MAX);
    expect(description.length, `${label} desc length=${description.length} :: ${description}`).toBeGreaterThanOrEqual(DESC_MIN);
    expect(description.length, `${label} desc length=${description.length} :: ${description}`).toBeLessThanOrEqual(DESC_MAX);
    for (const phrase of HARDBAN) {
        const both = `${title} ${description}`.toLowerCase();
        expect(both.includes(phrase.toLowerCase()), `${label} contains banned phrase "${phrase}"`).toBe(false);
    }
    expect(title.includes("—"), `${label} title contains em dash`).toBe(false);
    expect(description.includes("—"), `${label} description contains em dash`).toBe(false);
}

function assertOgBudget(label: string, title: string, description: string) {
    if (title) {
        expect(title.length, `${label} OG title length=${title.length} :: ${title}`).toBeLessThanOrEqual(TITLE_MAX);
        expect(title.includes("—"), `${label} OG title contains em dash`).toBe(false);
    }
    if (description) {
        expect(description.length, `${label} OG desc length=${description.length} :: ${description}`).toBeLessThanOrEqual(DESC_MAX);
        expect(description.includes("—"), `${label} OG desc contains em dash`).toBe(false);
    }
}

describe("Phase 1 CTR rewrites — title + description budgets", () => {
    // Each case: page label, metadata, regex matching at least one query
    // anchor the page actually ranks for (more permissive than a literal
    // toContain — allows synonyms like "compare/comparisons").
    const cases: Array<[string, Metadata, RegExp]> = [
        ["/advaita-vedanta-explained", advaitaMeta, /advaita vedanta/],
        ["/", homeMeta, /sadhaka/],
        ["/how-karma-dharma-work", karmaMeta, /karma/],
        ["/how-to-start-japa", japaMeta, /japa/],
        ["/philosophies", philosophiesMeta, /darshanas/],
        ["/compare", compareMeta, /compar(e|ison)/],
        ["/what-is-maya", mayaMeta, /maya/],
        ["/daily-spiritual-routine-beginners", routineMeta, /routine/],
    ];

    for (const [label, meta, anchor] of cases) {
        it(`${label} — within SERP budget and free of banned patterns`, () => {
            const title = strField(meta, "title");
            const description = strField(meta, "description");
            assertBudget(label, title, description);
            assertOgBudget(label, ogTitle(meta), ogDesc(meta));
            expect(title.toLowerCase()).toMatch(anchor);
        });
    }

    it("/learn/sanskrit/[word] template — within budget for sample words", async () => {
        // Per-word seoTitle overrides can run shorter than 50 chars (e.g. the
        // Nirvana override is 47). Skip the lower bound here — the upper
        // bound is what protects against SERP truncation.
        for (const slug of ["nirvana", "kundalini", "moksha", "karma"]) {
            const meta = await sanskritGenerateMetadata({
                params: Promise.resolve({ word: slug }),
            });
            assertBudget(
                `/learn/sanskrit/${slug}`,
                strField(meta, "title"),
                strField(meta, "description"),
                { titleMin: 0 },
            );
            assertOgBudget(`/learn/sanskrit/${slug}`, ogTitle(meta), ogDesc(meta));
        }
    });
});

describe("Sanskrit per-word SEO overrides — within budget", () => {
    const overrideWords = sanskritVocab.filter((w) => w.seoTitle || w.seoDescription || w.ogTitle || w.ogDescription);

    it("at least three words use the override fields PR #20 introduced", () => {
        // If this drops below 3, the override architecture is being silently
        // unwound — likely from a refactor that didn't notice the fields exist.
        expect(overrideWords.length).toBeGreaterThanOrEqual(3);
    });

    for (const w of [
        "karma",
        "moksha",
        "nirvana",
    ]) {
        it(`${w}: every override field clears budgets and bans`, () => {
            const word = sanskritVocab.find((x) => x.slug === w);
            expect(word).toBeTruthy();
            if (!word) return;

            for (const f of ["seoTitle", "ogTitle"] as const) {
                const v = word[f];
                if (!v) continue;
                expect(v.length, `${w}.${f} length=${v.length} :: ${v}`).toBeLessThanOrEqual(TITLE_MAX);
                expect(v.includes("—"), `${w}.${f} contains em dash`).toBe(false);
                for (const phrase of HARDBAN) {
                    expect(v.toLowerCase().includes(phrase.toLowerCase()), `${w}.${f} has banned phrase "${phrase}"`).toBe(false);
                }
            }
            for (const f of ["seoDescription", "ogDescription"] as const) {
                const v = word[f];
                if (!v) continue;
                expect(v.length, `${w}.${f} length=${v.length} :: ${v}`).toBeLessThanOrEqual(DESC_MAX);
                expect(v.includes("—"), `${w}.${f} contains em dash`).toBe(false);
                for (const phrase of HARDBAN) {
                    expect(v.toLowerCase().includes(phrase.toLowerCase()), `${w}.${f} has banned phrase "${phrase}"`).toBe(false);
                }
            }
        });
    }
});

describe("CTR-rewritten comparison + article entries — within budget", () => {
    // Computed comparison title is `${comp.title} | Sadhaka Comparisons` in
    // compare/[slug]/page.tsx. The suffix is 22 chars. Even if the suffix gets
    // truncated by Google in practice, a too-long base title means the value-
    // add at the end of the title (parenthetical hook) gets cut. Hold both
    // halves to plausible budgets.
    const SUFFIX = " | Sadhaka Comparisons";
    const COMPARISON_TITLE_MAX_RAW = TITLE_MAX; // base title alone

    // Each PR adds its rewritten compare slugs here. PR #20 added the first
    // two, PR #25 added the next three (top-10 GSC compare cluster). New
    // entries auto-lock the moment they land.
    const COMPARE_REWRITTEN_SLUGS = [
        "atman-vs-brahman",
        "ashtavakra-gita-vs-bhagavad-gita",
        "adi-shankaracharya-vs-ramanuja",
        "pranayama-vs-breathwork",
        "mantra-vs-affirmation",
    ];

    for (const slug of COMPARE_REWRITTEN_SLUGS) {
        it(`comparison ${slug}: base title and meta description within budget`, () => {
            const comp = comparisons.find((c) => c.slug === slug);
            expect(comp).toBeTruthy();
            if (!comp) return;
            expect(comp.title.length, `${slug} title=${comp.title.length} :: ${comp.title}`).toBeLessThanOrEqual(COMPARISON_TITLE_MAX_RAW);
            expect(comp.title.includes("—"), `${slug} title contains em dash`).toBe(false);
            expect(comp.metaDescription.length, `${slug} desc=${comp.metaDescription.length}`).toBeGreaterThanOrEqual(DESC_MIN);
            expect(comp.metaDescription.length, `${slug} desc=${comp.metaDescription.length}`).toBeLessThanOrEqual(DESC_MAX);
            expect(comp.metaDescription.includes("—"), `${slug} desc contains em dash`).toBe(false);
            for (const phrase of HARDBAN) {
                const blob = `${comp.title} ${comp.metaDescription}`.toLowerCase();
                expect(blob.includes(phrase.toLowerCase()), `${slug} contains banned phrase "${phrase}"`).toBe(false);
            }
            // Computed full title (base + suffix) should also stay under a
            // generous SERP-rendered cap of 80, beyond which Google truncates
            // mid-suffix and shows ellipsis.
            expect((comp.title + SUFFIX).length, `${slug} full title with suffix`).toBeLessThanOrEqual(80);
        });
    }

    it("article entry for can-i-chant-a-mantra-without-initiation: within budget", () => {
        const article = articles.find((a) => a.slug === "can-i-chant-a-mantra-without-initiation");
        expect(article).toBeTruthy();
        if (!article) return;
        expect(article.title.length, `title=${article.title.length} :: ${article.title}`).toBeLessThanOrEqual(TITLE_MAX);
        expect(article.title.includes("—"), "title contains em dash").toBe(false);
        expect(article.metaDescription.length, `desc=${article.metaDescription.length}`).toBeLessThanOrEqual(DESC_MAX);
        expect(article.metaDescription.includes("—"), "desc contains em dash").toBe(false);
    });
});
