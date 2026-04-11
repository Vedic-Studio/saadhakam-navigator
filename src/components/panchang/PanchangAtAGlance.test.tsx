import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PanchangAtAGlance } from "@/components/panchang/PanchangAtAGlance";
import { vedicClockResponseFixture } from "@/test/fixtures/vedic-clock-response";

describe("PanchangAtAGlance", () => {
    it("renders the six panchang summary cards with transition text", () => {
        render(<PanchangAtAGlance payload={vedicClockResponseFixture} />);

        expect(screen.getByRole("heading", { name: /today's essential elements/i })).toBeInTheDocument();
        expect(screen.getByText("Guruvara")).toBeInTheDocument();
        expect(screen.getByText("Krishna Pratipada")).toBeInTheDocument();
        expect(screen.getByText("Hasta")).toBeInTheDocument();
        expect(screen.getByText("Vishkambha")).toBeInTheDocument();
        expect(screen.getByText("Bava")).toBeInTheDocument();
        expect(screen.getByText("Kanya")).toBeInTheDocument();
        expect(screen.getByText(/upto 19:26, then Krishna Dvitiya/i)).toBeInTheDocument();
    });
});