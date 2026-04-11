import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SunMoonPanel } from "@/components/panchang/SunMoonPanel";
import { vedicClockResponseFixture } from "@/test/fixtures/vedic-clock-response";

describe("SunMoonPanel", () => {
    it("renders all solar and lunar timing items", () => {
        render(<SunMoonPanel payload={vedicClockResponseFixture} />);

        expect(screen.getByText("Sunrise")).toBeInTheDocument();
        expect(screen.getByText("Solar Noon")).toBeInTheDocument();
        expect(screen.getByText("Sunset")).toBeInTheDocument();
        expect(screen.getByText("Day Length")).toBeInTheDocument();
        expect(screen.getByText("Moonrise")).toBeInTheDocument();
        expect(screen.getByText("Moonset")).toBeInTheDocument();
        expect(screen.getByText("05:41")).toBeInTheDocument();
        expect(screen.getByText("12:00")).toBeInTheDocument();
        expect(screen.getByText("18:18")).toBeInTheDocument();
        expect(screen.getByText("12h 37m")).toBeInTheDocument();
        expect(screen.getByText("21:11")).toBeInTheDocument();
        expect(screen.getByText("08:36")).toBeInTheDocument();
    });
});