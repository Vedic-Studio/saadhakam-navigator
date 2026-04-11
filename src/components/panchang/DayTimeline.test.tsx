import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { VedicClockResponse } from "@/lib/vedic-clock";
import { DayTimeline } from "@/components/panchang/DayTimeline";
import { vedicClockResponseFixture } from "@/test/fixtures/vedic-clock-response";

const payload = {
    ...vedicClockResponseFixture,
    requestedDateTime: "2026-04-09T07:00",
    clock: {
        ...vedicClockResponseFixture.clock,
        currentLocalTime: "07:00",
        currentLocalDateTime: "2026-04-09T07:00",
        minutesSinceSunrise: 79,
        cycleProgress: 79 / 1440,
    },
} satisfies VedicClockResponse;

describe("DayTimeline", () => {
    it("renders a labeled panchang day timeline", () => {
        render(<DayTimeline payload={payload} />);
        expect(screen.getByRole("img", { name: /panchang day timeline/i })).toBeInTheDocument();
        expect(screen.getByText(/Sunrise 05:41/i)).toBeInTheDocument();
        expect(screen.getByText(/Rahu Kala/i)).toBeInTheDocument();
    });
});