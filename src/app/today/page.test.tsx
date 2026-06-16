import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import TodayPage from "./page";

/**
 * Render the /today Server Component against a FIXED date so the SSR-resolved
 * panchang, bound mantra, and rotating verse/practice are deterministic.
 *
 * 2026-06-17 is a Wednesday (Budhavara), whose ruling graha is Budha, so the
 * day's mantra is the Budha beej mantra. The rotation lands on Gita 4.8 and the
 * Puja practice for that day-of-year. These are the load-bearing wirings of the
 * page (panchang -> vara -> graha -> mantra, and date -> verse/practice).
 */
describe("TodayPage", () => {
    beforeEach(() => {
        window.localStorage.clear();
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-06-17T08:00:00Z"));
        (window as unknown as { gtag: () => void }).gtag = vi.fn();
    });
    afterEach(() => {
        vi.useRealTimers();
        delete (window as unknown as { gtag?: unknown }).gtag;
    });

    it("renders today's panchang (tithi, vara, nakshatra)", () => {
        render(<TodayPage />);
        expect(screen.getByText("Shukla Tritiya")).toBeInTheDocument();
        expect(screen.getByText("Budhavara")).toBeInTheDocument();
        expect(screen.getByText("Punarvasu")).toBeInTheDocument();
    });

    it("binds the day's mantra from the vara's ruling graha", () => {
        render(<TodayPage />);
        // Wednesday -> Budha -> Budha mantra.
        expect(screen.getByText(/Om Bram Brim Braum Sah Budhaya Namah/i)).toBeInTheDocument();
        // Links to the mantra detail page.
        const mantraLink = screen.getByRole("link", { name: /meaning, pronunciation, and method/i });
        expect(mantraLink).toHaveAttribute("href", "/mantras/om-bram-brim-braum-sah-budhaya-namah");
    });

    it("shows the rotating verse for the day and links to its verse page", () => {
        render(<TodayPage />);
        expect(screen.getByText(/Bhagavad Gita 4\.8/)).toBeInTheDocument();
        const verseLink = screen.getByRole("link", { name: /read the verse, word by word/i });
        expect(verseLink).toHaveAttribute("href", "/texts/bhagavad-gita/chapter-4/shloka-8");
    });

    it("shows the rotating practice for the day with a working link", () => {
        render(<TodayPage />);
        expect(screen.getByText("Puja")).toBeInTheDocument();
        const practiceLink = screen.getByRole("link", { name: /how to begin/i });
        expect(practiceLink).toHaveAttribute("href", "/practices/puja");
    });

    it("renders the one-tap mala counter and the streak banner", () => {
        render(<TodayPage />);
        expect(screen.getByRole("button", { name: /count one repetition/i })).toBeInTheDocument();
        // No streak yet -> low-pressure invitation, not the loss-aversion cue.
        expect(screen.getByText("Begin today")).toBeInTheDocument();
    });

    it("links panchang facets to their jyotish detail pages", () => {
        render(<TodayPage />);
        expect(screen.getByRole("link", { name: /Shukla Tritiya/i })).toHaveAttribute(
            "href",
            "/jyotish/panchang/tithis/shukla-tritiya",
        );
        expect(screen.getByRole("link", { name: /Budhavara/i })).toHaveAttribute(
            "href",
            "/jyotish/panchang/varas/budhavara",
        );
        expect(screen.getByRole("link", { name: /Punarvasu/i })).toHaveAttribute(
            "href",
            "/jyotish/nakshatras/punarvasu",
        );
    });
});
