import { describe, it, expect } from "vitest";
import { getPanchangForDate, DEFAULT_PANCHANG_CITY_ID } from "./jyotish";
import { getVaraBySlug } from "@/data/panchang";

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
