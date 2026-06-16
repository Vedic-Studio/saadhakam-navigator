import { describe, it, expect } from "vitest";
import { buildVaraEmail, buildVaraSubject } from "./varaEmail";
import { getVaraSelection } from "@/app/today/varaSelection";
import { getVerseForDay, getPracticeForDay, verseHref } from "@/app/today/rotation";

// 2026-06-15 is a Monday (Somavara, ruled by Chandra). Read verbatim as a
// YYYY-MM-DD string by the underlying selectors, so the day's binding is fixed.
const DATE = "2026-06-15";

describe("buildVaraSubject", () => {
    it("is non-empty and references the day's vara", () => {
        const subject = buildVaraSubject(DATE);
        expect(subject.length).toBeGreaterThan(0);
        expect(subject).toContain("Somavara");
    });
});

describe("buildVaraEmail", () => {
    it("returns a non-empty subject that references the vara, and an HTML document", () => {
        const { subject, html } = buildVaraEmail(DATE);
        expect(subject).toContain("Somavara");
        expect(html.startsWith("<!DOCTYPE html>")).toBe(true);
    });

    it("renders the day's planetary mantra text", () => {
        const { mantra } = getVaraSelection(DATE);
        const { html } = buildVaraEmail(DATE);
        // The Chandra beej mantra transliteration and its meaning are present.
        expect(mantra).toBeDefined();
        expect(html).toContain(mantra!.transliteration);
        expect(html).toContain(mantra!.oneLineMeaning);
        // And an absolute link to the mantra page.
        expect(html).toContain(`https://www.opensadhaka.com/mantras/${mantra!.slug}`);
    });

    it("renders the rotating verse with its Bhagavad Gita reference and absolute verse link", () => {
        const verse = getVerseForDay(DATE);
        const { html } = buildVaraEmail(DATE);
        expect(html).toContain(`Bhagavad Gita ${verse.chapter}.${verse.verse}`);
        expect(html).toContain(verse.gloss);
        // verseHref is app-relative; the email must link it absolutely.
        expect(html).toContain(`https://www.opensadhaka.com${verseHref(verse)}`);
    });

    it("renders the daily practice title with an absolute link to its page", () => {
        const practice = getPracticeForDay(DATE);
        const { html } = buildVaraEmail(DATE);
        expect(html).toContain(practice.title);
        expect(html).toContain(`https://www.opensadhaka.com${practice.href}`);
    });

    it("includes an unsubscribe footer consistent with the other emails", () => {
        const { html } = buildVaraEmail(DATE);
        expect(html).toContain("https://www.opensadhaka.com/unsubscribe");
        expect(html).toContain("Unsubscribe");
    });

    it("shows the resolved long date in the header", () => {
        const { html } = buildVaraEmail(DATE);
        // 2026-06-15 at noon UTC formats to this stable string.
        expect(html).toContain("Monday, June 15, 2026");
    });

    it("is deterministic for a fixed date", () => {
        const a = buildVaraEmail(DATE);
        const b = buildVaraEmail(DATE);
        expect(a.subject).toBe(b.subject);
        expect(a.html).toBe(b.html);
    });

    it("resolves the same content from a Date instance as from the YYYY-MM-DD string", () => {
        // Noon UTC keeps the Varanasi civil day unambiguous.
        const fromDate = buildVaraEmail(new Date("2026-06-15T12:00:00Z"));
        const fromString = buildVaraEmail(DATE);
        expect(fromDate.subject).toBe(fromString.subject);
        expect(fromDate.html).toBe(fromString.html);
    });
});
