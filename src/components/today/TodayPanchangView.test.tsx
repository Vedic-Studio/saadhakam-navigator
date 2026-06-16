import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render } from "@testing-library/react";
import { TodayPanchangView } from "./TodayPanchangView";

function installGtag() {
    const gtag = vi.fn();
    (window as unknown as { gtag: typeof gtag }).gtag = gtag;
    return gtag;
}

describe("TodayPanchangView", () => {
    beforeEach(() => {
        installGtag();
    });
    afterEach(() => {
        delete (window as unknown as { gtag?: unknown }).gtag;
    });

    it("fires panchang_view once on mount with the resolved slugs", () => {
        const gtag = (window as unknown as { gtag: ReturnType<typeof vi.fn> }).gtag;
        render(
            <TodayPanchangView
                date="2026-06-16"
                tithi="shukla-panchami"
                vara="budhavara"
                nakshatra="pushya"
            />,
        );

        const calls = gtag.mock.calls.filter((c) => c[1] === "panchang_view");
        expect(calls).toHaveLength(1);
        expect(calls[0][2]).toMatchObject({
            date: "2026-06-16",
            tithi: "shukla-panchami",
            vara: "budhavara",
            nakshatra: "pushya",
        });
    });

    it("does not fire twice when re-rendered with the same props", () => {
        const gtag = (window as unknown as { gtag: ReturnType<typeof vi.fn> }).gtag;
        const { rerender } = render(
            <TodayPanchangView date="2026-06-16" tithi="shukla-panchami" vara="budhavara" />,
        );
        rerender(<TodayPanchangView date="2026-06-16" tithi="shukla-panchami" vara="budhavara" />);

        expect(gtag.mock.calls.filter((c) => c[1] === "panchang_view")).toHaveLength(1);
    });

    it("omits nakshatra when not provided", () => {
        const gtag = (window as unknown as { gtag: ReturnType<typeof vi.fn> }).gtag;
        render(<TodayPanchangView date="2026-06-16" tithi="krishna-ashtami" vara="somavara" />);

        const call = gtag.mock.calls.find((c) => c[1] === "panchang_view");
        expect(call?.[2]).not.toHaveProperty("nakshatra");
    });
});
