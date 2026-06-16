import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { PanchangTodayBlock, type PanchangTodayBlockProps } from "./PanchangTodayBlock";
import * as events from "@/lib/analytics/events";

function baseProps(overrides: Partial<PanchangTodayBlockProps> = {}): PanchangTodayBlockProps {
    return {
        today: "2026-06-16",
        todayLabel: "Tuesday, 16 June 2026",
        limb: "tithi",
        entityName: "Shukla Panchami",
        isToday: false,
        nextDate: "2026-06-20",
        nextDateLabel: "Saturday, 20 June 2026",
        todayPanchang: {
            tithiName: "Shukla Purnima",
            varaName: "Mangalavara",
            nakshatraName: "Mula",
        },
        event: {
            tithi: "shukla-panchami",
            vara: "mangalavara",
            nakshatra: "mula",
        },
        ...overrides,
    };
}

describe("PanchangTodayBlock", () => {
    let trackSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
        trackSpy = vi.spyOn(events, "trackPanchangView").mockImplementation(() => {});
    });

    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    it("asks the time-aware question in an H2 keyed to the entity", () => {
        render(<PanchangTodayBlock {...baseProps()} />);
        const heading = screen.getByRole("heading", { level: 2, name: /is it shukla panchami today\?/i });
        expect(heading).toBeInTheDocument();
    });

    it("answers yes when the entity is in effect today", () => {
        render(<PanchangTodayBlock {...baseProps({ isToday: true, nextDate: null, nextDateLabel: null })} />);
        expect(screen.getByText(/yes\. today, tuesday, 16 june 2026, is shukla panchami\./i)).toBeInTheDocument();
    });

    it("answers no with the next occurrence date when not today and a date is known", () => {
        render(<PanchangTodayBlock {...baseProps()} />);
        expect(
            screen.getByText(/no\. today is tuesday, 16 june 2026\. the next shukla panchami tithi is saturday, 20 june 2026\./i),
        ).toBeInTheDocument();
    });

    it("omits the next date when none is available (degraded cycle)", () => {
        render(<PanchangTodayBlock {...baseProps({ isToday: false, nextDate: null, nextDateLabel: null })} />);
        expect(screen.queryByText(/the next .* is/i)).not.toBeInTheDocument();
        expect(screen.getByText(/shukla panchami is not in effect today\./i)).toBeInTheDocument();
    });

    it("renders today's tithi, vara, and nakshatra at a glance", () => {
        render(<PanchangTodayBlock {...baseProps()} />);
        expect(screen.getByText("Shukla Purnima")).toBeInTheDocument();
        expect(screen.getByText("Mangalavara")).toBeInTheDocument();
        expect(screen.getByText("Mula")).toBeInTheDocument();
    });

    it("shows a fallback when today's nakshatra is unavailable", () => {
        render(
            <PanchangTodayBlock
                {...baseProps({ todayPanchang: { tithiName: "Shukla Purnima", varaName: "Mangalavara", nakshatraName: null } })}
            />,
        );
        expect(screen.getByText("Not available")).toBeInTheDocument();
    });

    it("fires trackPanchangView exactly once on mount with the page's date and limbs", () => {
        render(<PanchangTodayBlock {...baseProps()} />);
        expect(trackSpy).toHaveBeenCalledTimes(1);
        expect(trackSpy).toHaveBeenCalledWith({
            date: "2026-06-16",
            tithi: "shukla-panchami",
            vara: "mangalavara",
            nakshatra: "mula",
        });
    });

    it("passes nakshatra as undefined when the page has no nakshatra in its event payload", () => {
        render(
            <PanchangTodayBlock
                {...baseProps({ limb: "vara", entityName: "Mangalavara", event: { tithi: "shukla-purnima", vara: "mangalavara", nakshatra: undefined } })}
            />,
        );
        expect(trackSpy).toHaveBeenCalledTimes(1);
        expect(trackSpy).toHaveBeenCalledWith({
            date: "2026-06-16",
            tithi: "shukla-purnima",
            vara: "mangalavara",
            nakshatra: undefined,
        });
    });

    it("uses the limb noun in the not-today copy (vara page)", () => {
        render(
            <PanchangTodayBlock
                {...baseProps({
                    limb: "vara",
                    entityName: "Budhavara",
                    isToday: false,
                    nextDate: "2026-06-17",
                    nextDateLabel: "Wednesday, 17 June 2026",
                    event: { tithi: "shukla-purnima", vara: "budhavara", nakshatra: "mula" },
                })}
            />,
        );
        expect(screen.getByText(/the next budhavara vara is wednesday, 17 june 2026\./i)).toBeInTheDocument();
    });
});
