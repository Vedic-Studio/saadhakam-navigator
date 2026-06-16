import { describe, it, expect } from "vitest";
import { getPanchangForDate, DEFAULT_PANCHANG_CITY_ID } from "./jyotish";
import { getVaraBySlug } from "@/data/panchang";

/** Step a YYYY-MM-DD civil date by `n` days, staying on the Varanasi civil day. */
function addCivilDays(ymd: string, n: number): string {
  const d = new Date(`${ymd}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

/**
 * The vara (weekday) is deterministic: buildVedicClockResponse derives it from
 * getUTCDay() of noon on the civil date, mapped Sunday..Saturday to
 * ravivara..shanivara. So these assertions are stable regardless of the machine
 * clock or timezone. Tithi/nakshatra come from an ephemeris model, so those are
 * asserted for well-formedness and stability, not exact values.
 */
describe("getPanchangForDate", () => {
  it("returns the correct, weekday-deterministic vara for known dates", () => {
    // 2026-06-15 is a Monday.
    expect(getPanchangForDate("2026-06-15").vara.slug).toBe("somavara");
    // 2026-06-17 is a Wednesday.
    expect(getPanchangForDate("2026-06-17").vara.slug).toBe("budhavara");
    // 2026-06-14 is a Sunday.
    expect(getPanchangForDate("2026-06-14").vara.slug).toBe("ravivara");
    // 2026-06-20 is a Saturday.
    expect(getPanchangForDate("2026-06-20").vara.slug).toBe("shanivara");
  });

  it("returns the FULL Vara object including rulingGraha (needed to bind the day's mantra)", () => {
    const panchang = getPanchangForDate("2026-06-17");
    const expected = getVaraBySlug("budhavara");
    expect(panchang.vara).toEqual(expected);
    // Round 1 reads rulingGraha off this object.
    expect(panchang.vara.rulingGraha).toBe("budha");
  });

  it("echoes the requested date as a YYYY-MM-DD string", () => {
    expect(getPanchangForDate("2026-06-15").date).toBe("2026-06-15");
  });

  it("returns a well-formed tithi with paksha and number", () => {
    const { tithi } = getPanchangForDate("2026-06-15");
    expect(typeof tithi.slug).toBe("string");
    expect(tithi.slug.length).toBeGreaterThan(0);
    expect(typeof tithi.name).toBe("string");
    expect(["Shukla", "Krishna"]).toContain(tithi.paksha);
    expect(tithi.number).toBeGreaterThanOrEqual(1);
    expect(tithi.number).toBeLessThanOrEqual(15);
  });

  it("returns a nakshatra as { slug, name } or null, never a sentinel", () => {
    const { nakshatra } = getPanchangForDate("2026-06-15");
    if (nakshatra !== null) {
      expect(typeof nakshatra.slug).toBe("string");
      expect(nakshatra.slug).not.toBe("unknown");
      expect(typeof nakshatra.name).toBe("string");
      expect(nakshatra.name.length).toBeGreaterThan(0);
    }
  });

  it("accepts a Date object and a matching ISO string equivalently", () => {
    // Noon UTC stays on the same civil day in Asia/Kolkata (UTC+5:30).
    const fromDate = getPanchangForDate(new Date("2026-06-17T12:00:00Z"));
    const fromString = getPanchangForDate("2026-06-17");
    expect(fromDate.date).toBe("2026-06-17");
    expect(fromDate).toEqual(fromString);
  });

  it("is pure and stable: repeated calls for a fixed date are identical", () => {
    const a = getPanchangForDate("2026-06-15");
    const b = getPanchangForDate("2026-06-15");
    expect(a).toEqual(b);
  });

  it("throws on an unparseable date string", () => {
    expect(() => getPanchangForDate("not-a-date")).toThrow();
  });

  it("defaults to the Varanasi preset city", () => {
    expect(DEFAULT_PANCHANG_CITY_ID).toBe("varanasi");
  });
});

/**
 * Anti-freeze regression guard for the heliocentric-Moon bug (fixed by switching
 * astronomy.ts to EclipticGeoMoon). That bug advanced the Moon ~1 deg/day and
 * pinned it ~180 deg from the Sun, so tithi and nakshatra froze for ~14 days at
 * a time and nearly every day read as a full moon. The single-date tests above
 * pass even when the panchang is frozen, so these scan across days to prove the
 * limbs actually move. Under the bug a 30-day scan collapses to ~1-2 distinct
 * slugs; with the correct geocentric Moon it yields ~29 tithis and ~26 nakshatras.
 */
describe("getPanchangForDate — daily advancement (geocentric Moon)", () => {
  it("yields many distinct tithis and nakshatras across 30 consecutive days", () => {
    const start = "2026-06-16";
    const tithiSlugs = new Set<string>();
    const nakshatraSlugs = new Set<string>();
    for (let i = 0; i < 30; i++) {
      const panchang = getPanchangForDate(addCivilDays(start, i));
      tithiSlugs.add(panchang.tithi.slug);
      if (panchang.nakshatra) nakshatraSlugs.add(panchang.nakshatra.slug);
    }
    // The 30-tithi cycle completes in ~29.5 days, so a 30-day window sees almost
    // all of them; 15 is a safe floor that the freeze bug (~2) cannot clear.
    expect(tithiSlugs.size).toBeGreaterThanOrEqual(15);
    // The Moon traverses all 27 nakshatras in ~27.3 days; 20 is a safe floor.
    expect(nakshatraSlugs.size).toBeGreaterThanOrEqual(20);
  });

  it("cycles a target tithi and returns to a nakshatra on its sidereal period", () => {
    const start = "2026-06-16";

    // Every tithi — shukla-panchami included — must appear at least once in a
    // ~29.5-day cycle. Under the freeze bug the stuck tithi was rarely panchami.
    let panchamiAppears = false;
    for (let i = 0; i < 30; i++) {
      if (getPanchangForDate(addCivilDays(start, i)).tithi.slug === "shukla-panchami") {
        panchamiAppears = true;
        break;
      }
    }
    expect(panchamiAppears).toBe(true);

    // The Moon returns to the day-0 nakshatra after one sidereal month (~27 days),
    // proving it moved away and came back. The freeze bug would "recur" on day 1
    // because the nakshatra never changed.
    const day0Nakshatra = getPanchangForDate(start).nakshatra?.slug;
    expect(day0Nakshatra).toBeTruthy();
    let recurDay = -1;
    for (let i = 1; i < 30; i++) {
      if (getPanchangForDate(addCivilDays(start, i)).nakshatra?.slug === day0Nakshatra) {
        recurDay = i;
        break;
      }
    }
    expect(recurDay).toBeGreaterThanOrEqual(20);
    expect(recurDay).toBeLessThan(30);
  });
});
