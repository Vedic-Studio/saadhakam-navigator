import { describe, expect, it } from "vitest";
import {
    addDays,
    answerForLimb,
    findNextOccurrence,
    isCycleHealthy,
    isLimbOnDay,
    limbSlug,
    type OraclePanchang,
    type PanchangOracle,
} from "./nextOccurrence";
import { getPanchangForDate } from "@/lib/jyotish";

/**
 * Build a deterministic stub oracle from a per-day spec so the date logic is
 * verified independently of the ephemeris model behind the real oracle. The
 * scenario maps a `YYYY-MM-DD` to the limb slugs that day should resolve to.
 */
function stubOracle(scenario: Record<string, { tithi: string; vara: string; nakshatra: string | null }>): PanchangOracle {
    return (ymd: string): OraclePanchang => {
        const day = scenario[ymd];
        if (!day) {
            throw new Error(`stubOracle: no scenario entry for ${ymd}`);
        }
        return {
            date: ymd,
            tithi: { slug: day.tithi },
            vara: { slug: day.vara },
            nakshatra: day.nakshatra ? { slug: day.nakshatra } : null,
        };
    };
}

/** A healthy synthetic tithi cycle: 15 distinct waxing tithis repeating. */
function healthyTithiOracle(startYmd: string, days: number): { oracle: PanchangOracle; sequence: string[] } {
    const wheel = [
        "shukla-pratipada", "shukla-dvitiya", "shukla-tritiya", "shukla-chaturthi", "shukla-panchami",
        "shukla-shashthi", "shukla-saptami", "shukla-ashtami", "shukla-navami", "shukla-dashami",
        "shukla-ekadashi", "shukla-dvadashi", "shukla-trayodashi", "shukla-chaturdashi", "shukla-purnima",
    ];
    const scenario: Record<string, { tithi: string; vara: string; nakshatra: string | null }> = {};
    const sequence: string[] = [];
    for (let i = 0; i < days; i += 1) {
        const ymd = addDays(startYmd, i);
        const tithi = wheel[i % wheel.length];
        scenario[ymd] = { tithi, vara: "ravivara", nakshatra: "ashvini" };
        sequence.push(tithi);
    }
    return { oracle: stubOracle(scenario), sequence };
}

describe("addDays", () => {
    it("adds whole days across a month boundary", () => {
        expect(addDays("2026-01-31", 1)).toBe("2026-02-01");
        expect(addDays("2026-02-28", 1)).toBe("2026-03-01"); // 2026 is not a leap year
    });

    it("adds across a year boundary and supports negatives", () => {
        expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
        expect(addDays("2026-01-01", -1)).toBe("2025-12-31");
    });

    it("is timezone-stable around a DST transition (US spring forward)", () => {
        // 2026-03-08 is the US DST spring-forward date; UTC-noon arithmetic must
        // still land on the next calendar day regardless of local offset shifts.
        expect(addDays("2026-03-08", 1)).toBe("2026-03-09");
    });

    it("rejects a non-YYYY-MM-DD input", () => {
        expect(() => addDays("2026/01/01", 1)).toThrow(/YYYY-MM-DD/);
    });
});

describe("limbSlug", () => {
    const day: OraclePanchang = {
        date: "2026-06-16",
        tithi: { slug: "shukla-panchami" },
        vara: { slug: "budhavara" },
        nakshatra: { slug: "pushya" },
    };

    it("reads each limb", () => {
        expect(limbSlug(day, "tithi")).toBe("shukla-panchami");
        expect(limbSlug(day, "vara")).toBe("budhavara");
        expect(limbSlug(day, "nakshatra")).toBe("pushya");
    });

    it("returns null for an absent nakshatra", () => {
        expect(limbSlug({ ...day, nakshatra: null }, "nakshatra")).toBeNull();
    });
});

describe("isLimbOnDay", () => {
    const oracle = stubOracle({
        "2026-06-16": { tithi: "shukla-panchami", vara: "mangalavara", nakshatra: "pushya" },
    });

    it("is true when the limb matches the day", () => {
        expect(isLimbOnDay(oracle, "tithi", "shukla-panchami", "2026-06-16")).toBe(true);
        expect(isLimbOnDay(oracle, "vara", "mangalavara", "2026-06-16")).toBe(true);
    });

    it("is false when the limb differs", () => {
        expect(isLimbOnDay(oracle, "tithi", "shukla-shashthi", "2026-06-16")).toBe(false);
        expect(isLimbOnDay(oracle, "nakshatra", "ashvini", "2026-06-16")).toBe(false);
    });
});

describe("findNextOccurrence", () => {
    const { oracle } = healthyTithiOracle("2026-06-16", 90);

    it("finds the next matching day strictly after today by default", () => {
        // 2026-06-16 is shukla-pratipada (index 0); shukla-panchami is index 4.
        const result = findNextOccurrence(oracle, "tithi", "shukla-panchami", "2026-06-16");
        expect(result).toEqual({ date: addDays("2026-06-16", 4), offsetDays: 4 });
    });

    it("excludes today unless includeToday is set", () => {
        // Today (offset 0) is shukla-pratipada.
        const excluded = findNextOccurrence(oracle, "tithi", "shukla-pratipada", "2026-06-16");
        expect(excluded?.offsetDays).toBe(15); // recurs one cycle later

        const included = findNextOccurrence(oracle, "tithi", "shukla-pratipada", "2026-06-16", { includeToday: true });
        expect(included).toEqual({ date: "2026-06-16", offsetDays: 0 });
    });

    it("returns null when no match falls within the window", () => {
        const result = findNextOccurrence(oracle, "tithi", "shukla-panchami", "2026-06-16", { maxDays: 2 });
        expect(result).toBeNull();
    });

    it("treats a null nakshatra day as non-matching", () => {
        const sparse = stubOracle({
            "2026-06-16": { tithi: "x", vara: "ravivara", nakshatra: null },
            "2026-06-17": { tithi: "x", vara: "somavara", nakshatra: "rohini" },
        });
        const result = findNextOccurrence(sparse, "nakshatra", "rohini", "2026-06-16", { maxDays: 1 });
        expect(result).toEqual({ date: "2026-06-17", offsetDays: 1 });
    });
});

describe("isCycleHealthy", () => {
    it("reports vara healthy without consulting the oracle", () => {
        const throwingOracle: PanchangOracle = () => {
            throw new Error("vara should not scan the oracle");
        };
        expect(isCycleHealthy(throwingOracle, "vara", "2026-06-16")).toBe(true);
    });

    it("reports a real advancing tithi cycle as healthy", () => {
        const { oracle } = healthyTithiOracle("2026-06-16", 30);
        expect(isCycleHealthy(oracle, "tithi", "2026-06-16")).toBe(true);
    });

    it("flags a frozen lunar cycle as unhealthy", () => {
        // Mirrors the foundation ephemeris regression: the tithi never advances.
        const scenario: Record<string, { tithi: string; vara: string; nakshatra: string | null }> = {};
        for (let i = 0; i < 30; i += 1) {
            scenario[addDays("2026-06-16", i)] = { tithi: "shukla-purnima", vara: "ravivara", nakshatra: "mula" };
        }
        const frozen = stubOracle(scenario);
        expect(isCycleHealthy(frozen, "tithi", "2026-06-16")).toBe(false);
        expect(isCycleHealthy(frozen, "nakshatra", "2026-06-16")).toBe(false);
    });
});

describe("answerForLimb", () => {
    const { oracle } = healthyTithiOracle("2026-06-16", 90);

    it("answers yes-today with no next date when the limb matches today", () => {
        const answer = answerForLimb(oracle, "tithi", "shukla-pratipada", "2026-06-16");
        expect(answer.isToday).toBe(true);
        expect(answer.next).toBeNull();
        expect(answer.cycleHealthy).toBe(true);
    });

    it("answers no-today with the next date when the cycle is healthy", () => {
        const answer = answerForLimb(oracle, "tithi", "shukla-panchami", "2026-06-16");
        expect(answer.isToday).toBe(false);
        expect(answer.next).toEqual({ date: addDays("2026-06-16", 4), offsetDays: 4 });
        expect(answer.cycleHealthy).toBe(true);
    });

    it("suppresses the next date when the lunar cycle is unhealthy", () => {
        const scenario: Record<string, { tithi: string; vara: string; nakshatra: string | null }> = {};
        for (let i = 0; i < 30; i += 1) {
            scenario[addDays("2026-06-16", i)] = { tithi: "shukla-purnima", vara: "ravivara", nakshatra: "mula" };
        }
        const frozen = stubOracle(scenario);
        const answer = answerForLimb(frozen, "tithi", "shukla-panchami", "2026-06-16");
        expect(answer.isToday).toBe(false);
        expect(answer.next).toBeNull();
        expect(answer.cycleHealthy).toBe(false);
    });
});

/**
 * End-to-end vara check against the REAL foundation oracle. The vara (weekday)
 * is purely calendar-derived and unaffected by the lunar-ephemeris model, so
 * this asserts genuine behavior: the next occurrence of a weekday is always
 * within 7 days, and a chosen weekday matches the day it actually falls on.
 */
describe("findNextOccurrence with the real getPanchangForDate (vara only)", () => {
    const realOracle: PanchangOracle = (ymd: string) => {
        const p = getPanchangForDate(ymd);
        return {
            date: p.date,
            tithi: { slug: p.tithi.slug },
            vara: { slug: p.vara.slug },
            nakshatra: p.nakshatra ? { slug: p.nakshatra.slug } : null,
        };
    };

    it("finds every vara within 7 days from an arbitrary date", () => {
        const varaSlugs = [
            "ravivara", "somavara", "mangalavara", "budhavara",
            "guruvara", "shukravara", "shanivara",
        ];
        for (const slug of varaSlugs) {
            const result = findNextOccurrence(realOracle, "vara", slug, "2026-06-16", { includeToday: true, maxDays: 7 });
            expect(result, `expected to find ${slug} within 7 days`).not.toBeNull();
            expect(result!.offsetDays).toBeLessThanOrEqual(6);
            // Verify the match is real: that day truly resolves to the vara.
            expect(isLimbOnDay(realOracle, "vara", slug, result!.date)).toBe(true);
        }
    });

    it("maps the weekday correctly (2026-06-16 is a Tuesday → mangalavara)", () => {
        // Independent ground truth via the JS Date weekday (2 = Tuesday).
        expect(new Date("2026-06-16T12:00:00Z").getUTCDay()).toBe(2);
        expect(isLimbOnDay(realOracle, "vara", "mangalavara", "2026-06-16")).toBe(true);
    });
});
