import { describe, expect, it } from "vitest";
import { buildTodayBlockProps, formatCivilDayLabel, resolveTodayYmd } from "./todayBlock";
import { addDays, type OraclePanchang, type PanchangOracle } from "./nextOccurrence";

/** Healthy synthetic oracle: tithi wheel advances daily, vara cycles weekly. */
function makeOracle(startYmd: string, days: number): PanchangOracle {
    const tithiWheel = [
        "shukla-pratipada", "shukla-dvitiya", "shukla-tritiya", "shukla-chaturthi", "shukla-panchami",
        "shukla-shashthi", "shukla-saptami", "shukla-ashtami", "shukla-navami", "shukla-dashami",
        "shukla-ekadashi", "shukla-dvadashi", "shukla-trayodashi", "shukla-chaturdashi", "shukla-purnima",
    ];
    const varaWheel = ["mangalavara", "budhavara", "guruvara", "shukravara", "shanivara", "ravivara", "somavara"];
    const map: Record<string, OraclePanchang> = {};
    for (let i = 0; i < days; i += 1) {
        const ymd = addDays(startYmd, i);
        map[ymd] = {
            date: ymd,
            tithi: { slug: tithiWheel[i % tithiWheel.length] },
            vara: { slug: varaWheel[i % varaWheel.length] },
            nakshatra: { slug: "mula" },
        };
    }
    return (ymd: string) => {
        const day = map[ymd];
        if (!day) throw new Error(`makeOracle: no entry for ${ymd}`);
        return day;
    };
}

describe("formatCivilDayLabel", () => {
    it("formats a YYYY-MM-DD as a stable UTC-based label", () => {
        // 2026-06-16 is a Tuesday.
        expect(formatCivilDayLabel("2026-06-16")).toBe("Tuesday, 16 June 2026");
    });

    it("does not shift the day across timezones (uses UTC parts)", () => {
        // 2026-01-01 is a Thursday; must not roll back to Dec 31 in any locale.
        expect(formatCivilDayLabel("2026-01-01")).toBe("Thursday, 1 January 2026");
    });
});

describe("buildTodayBlockProps", () => {
    const oracle = makeOracle("2026-06-16", 90);

    it("marks isToday and omits next when the entity is in effect today", () => {
        // Offset 0 tithi is shukla-pratipada.
        const props = buildTodayBlockProps(
            { limb: "tithi", slug: "shukla-pratipada", entityName: "Shukla Pratipada", todayYmd: "2026-06-16" },
            oracle,
        );
        expect(props.isToday).toBe(true);
        expect(props.nextDate).toBeNull();
        expect(props.nextDateLabel).toBeNull();
        expect(props.today).toBe("2026-06-16");
        expect(props.todayLabel).toBe("Tuesday, 16 June 2026");
    });

    it("computes the next occurrence date + label when not today", () => {
        // shukla-panchami is offset 4 → 2026-06-20.
        const props = buildTodayBlockProps(
            { limb: "tithi", slug: "shukla-panchami", entityName: "Shukla Panchami", todayYmd: "2026-06-16" },
            oracle,
        );
        expect(props.isToday).toBe(false);
        expect(props.nextDate).toBe("2026-06-20");
        expect(props.nextDateLabel).toBe(formatCivilDayLabel("2026-06-20"));
    });

    it("humanizes today's panchang slugs for the at-a-glance row", () => {
        const props = buildTodayBlockProps(
            { limb: "vara", slug: "mangalavara", entityName: "Mangalavara", todayYmd: "2026-06-16" },
            oracle,
        );
        expect(props.todayPanchang).toEqual({
            tithiName: "Shukla Pratipada",
            varaName: "Mangalavara",
            nakshatraName: "Mula",
        });
    });

    it("builds the analytics event from today's slugs (nakshatra present)", () => {
        const props = buildTodayBlockProps(
            { limb: "tithi", slug: "shukla-panchami", entityName: "Shukla Panchami", todayYmd: "2026-06-16" },
            oracle,
        );
        expect(props.event).toEqual({
            tithi: "shukla-pratipada",
            vara: "mangalavara",
            nakshatra: "mula",
        });
    });

    it("sets event.nakshatra undefined when today's nakshatra is unavailable", () => {
        const nakLess: PanchangOracle = (ymd) => ({
            date: ymd,
            tithi: { slug: "shukla-pratipada" },
            vara: { slug: "mangalavara" },
            nakshatra: null,
        });
        const props = buildTodayBlockProps(
            { limb: "tithi", slug: "shukla-panchami", entityName: "Shukla Panchami", todayYmd: "2026-06-16" },
            nakLess,
        );
        expect(props.event.nakshatra).toBeUndefined();
        expect(props.todayPanchang.nakshatraName).toBeNull();
    });
});

describe("resolveTodayYmd (real foundation)", () => {
    it("returns a valid YYYY-MM-DD for the current day", () => {
        const ymd = resolveTodayYmd();
        expect(ymd).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        // Round-trips through the formatter without throwing.
        expect(() => formatCivilDayLabel(ymd)).not.toThrow();
    });

    it("resolves a fixed Date to its reference-city civil day", () => {
        const ymd = resolveTodayYmd(new Date("2026-06-16T08:00:00Z"));
        expect(ymd).toBe("2026-06-16");
    });
});
