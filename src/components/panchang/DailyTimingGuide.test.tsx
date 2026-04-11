import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DailyTimingGuide } from "@/components/panchang/DailyTimingGuide";
import { vedicClockResponseFixture } from "@/test/fixtures/vedic-clock-response";

describe("DailyTimingGuide", () => {
    it("renders auspicious and cautionary timing sections with status pills", () => {
        render(<DailyTimingGuide payload={vedicClockResponseFixture} />);

        expect(screen.getByRole("heading", { name: /auspicious & inauspicious periods/i })).toBeInTheDocument();
        expect(screen.getByText("Auspicious Windows")).toBeInTheDocument();
        expect(screen.getByText("Cautionary Periods")).toBeInTheDocument();
        expect(screen.getByText("Pratah Sandhya")).toBeInTheDocument();
        expect(screen.getByText("Rahu Kala")).toBeInTheDocument();
        expect(screen.getByText("Active")).toBeInTheDocument();
        expect(screen.getAllByText("Past").length).toBeGreaterThan(0);
        expect(screen.getAllByText("Upcoming").length).toBeGreaterThan(0);
        expect(screen.getAllByText("Standard").length).toBeGreaterThan(0);
    });
});