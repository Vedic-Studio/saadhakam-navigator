import { describe, it, expect } from "vitest";
import { getVaraSelection } from "./varaSelection";
import { getPanchangForDate } from "@/lib/jyotish";

/**
 * The binding under test is vara -> ruling graha -> the graha's first mantra. The
 * vara is weekday-deterministic, so these assertions pin known weekdays to their
 * known graha/mantra without depending on the (moment-derived) tithi/nakshatra.
 *
 * 2026-06-15 is a Monday (Somavara, ruled by Chandra). 2026-06-14 is a Sunday
 * (Ravivara, ruled by Surya). Both are passed as YYYY-MM-DD strings, which
 * `getPanchangForDate` reads verbatim.
 */
describe("getVaraSelection", () => {
    it("binds a Monday to Somavara -> Chandra -> the Chandra beej mantra", () => {
        const { vara, graha, mantra } = getVaraSelection("2026-06-15");

        expect(vara.slug).toBe("somavara");
        expect(vara.rulingGraha).toBe("chandra");
        expect(graha?.slug).toBe("chandra");
        // The first mantra slug on the Chandra graha (the planetary beej mantra).
        expect(mantra?.slug).toBe("om-shram-shrim-shraum-sah-chandraya-namah");
    });

    it("binds a Sunday to Ravivara -> Surya -> the Surya beej mantra", () => {
        const { vara, graha, mantra } = getVaraSelection("2026-06-14");

        expect(vara.slug).toBe("ravivara");
        expect(graha?.slug).toBe("surya");
        expect(mantra?.slug).toBe("om-hram-hrim-hraum-sah-suryaya-namah");
    });

    it("resolves the mantra from the graha's FIRST mantra slug", () => {
        const { graha, mantra } = getVaraSelection("2026-06-15");
        // Contract: the bound mantra is graha.mantraSlugs[0], not any later entry.
        expect(mantra?.slug).toBe(graha?.mantraSlugs[0]);
    });

    it("is deterministic: the same date yields the same binding", () => {
        const a = getVaraSelection("2026-06-15");
        const b = getVaraSelection("2026-06-15");
        expect(a.vara.slug).toBe(b.vara.slug);
        expect(a.graha?.slug).toBe(b.graha?.slug);
        expect(a.mantra?.slug).toBe(b.mantra?.slug);
    });

    it("returns the same vara object the page derives from getPanchangForDate", () => {
        // Guards the refactor: the extracted helper must not change which vara the
        // page binds, so on-page behaviour stays identical.
        const date = "2026-06-15";
        expect(getVaraSelection(date).vara).toBe(getPanchangForDate(date).vara);
    });

    it("accepts a Date instance and resolves the same weekday binding", () => {
        // Noon UTC on the Monday so the Varanasi civil day is unambiguous.
        const { vara, mantra } = getVaraSelection(new Date("2026-06-15T12:00:00Z"));
        expect(vara.slug).toBe("somavara");
        expect(mantra?.slug).toBe("om-shram-shrim-shraum-sah-chandraya-namah");
    });
});
