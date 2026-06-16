import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { TodayMalaCounter } from "./TodayMalaCounter";
import { readUserState, USER_STATE_STORAGE_KEY } from "@/lib/userState";

/**
 * Capture gtag calls. The events module fires window.gtag('event', name, params)
 * only when window.gtag is a function, so we install a spy and assert on it.
 */
function installGtag() {
    const gtag = vi.fn();
    (window as unknown as { gtag: typeof gtag }).gtag = gtag;
    return gtag;
}

describe("TodayMalaCounter", () => {
    beforeEach(() => {
        window.localStorage.clear();
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-06-16T08:00:00"));
    });
    afterEach(() => {
        vi.useRealTimers();
        delete (window as unknown as { gtag?: unknown }).gtag;
    });

    it("increments the bead count on each tap", () => {
        installGtag();
        render(<TodayMalaCounter mantraName="Surya Mantra" />);
        const button = screen.getByRole("button", { name: /count one repetition/i });

        fireEvent.click(button);
        fireEvent.click(button);

        expect(button).toHaveAttribute("aria-label", expect.stringContaining("Currently 2 of 108"));
    });

    it("records the streak day and fires streak_day on the FIRST tap of the day", () => {
        const gtag = installGtag();
        render(<TodayMalaCounter mantraName="Surya Mantra" />);
        const button = screen.getByRole("button", { name: /count one repetition/i });

        fireEvent.click(button);

        // Store side: recordToday() persisted today's active day with count 1.
        expect(readUserState().streak).toEqual({
            count: 1,
            lastActiveYmd: "2026-06-16",
            graceUsed: false,
        });
        // Analytics side: streak_day fired ONCE with the post-record count + cluster.
        const streakCalls = gtag.mock.calls.filter((c) => c[1] === "streak_day");
        expect(streakCalls).toHaveLength(1);
        expect(streakCalls[0][2]).toMatchObject({ streak_len: 1, cluster: "navagraha-mantra" });
    });

    it("fires streak_day only once per day even across many taps", () => {
        const gtag = installGtag();
        render(<TodayMalaCounter mantraName="Surya Mantra" />);
        const button = screen.getByRole("button", { name: /count one repetition/i });

        fireEvent.click(button);
        fireEvent.click(button);
        fireEvent.click(button);

        const streakCalls = gtag.mock.calls.filter((c) => c[1] === "streak_day");
        expect(streakCalls).toHaveLength(1);
        expect(readUserState().streak.count).toBe(1);
    });

    it("reports the post-record streak length when a streak is already running", () => {
        // Yesterday recorded; today's first tap should advance the streak to 8.
        window.localStorage.setItem(
            USER_STATE_STORAGE_KEY,
            JSON.stringify({
                streak: { count: 7, lastActiveYmd: "2026-06-15", graceUsed: false },
                bookmarks: [],
            }),
        );
        const gtag = installGtag();
        const onFirstTapToday = vi.fn();
        render(<TodayMalaCounter mantraName="Surya Mantra" onFirstTapToday={onFirstTapToday} />);

        fireEvent.click(screen.getByRole("button", { name: /count one repetition/i }));

        expect(readUserState().streak.count).toBe(8);
        expect(onFirstTapToday).toHaveBeenCalledWith(8);
        const streakCalls = gtag.mock.calls.filter((c) => c[1] === "streak_day");
        expect(streakCalls[0][2]).toMatchObject({ streak_len: 8 });
    });

    it("shows 'Mala complete' when the count reaches 108", () => {
        installGtag();
        render(<TodayMalaCounter mantraName="Surya Mantra" />);
        const button = screen.getByRole("button", { name: /count one repetition/i });

        for (let i = 0; i < 108; i += 1) {
            fireEvent.click(button);
        }

        expect(screen.getByText(/mala complete/i)).toBeInTheDocument();
    });

    it("resets the bead count to 0 a short while after completing a mala", () => {
        installGtag();
        render(<TodayMalaCounter mantraName="Surya Mantra" />);
        const button = screen.getByRole("button", { name: /count one repetition/i });

        for (let i = 0; i < 108; i += 1) {
            fireEvent.click(button);
        }
        act(() => {
            vi.advanceTimersByTime(2300);
        });

        expect(screen.getByRole("button", { name: /count one repetition/i })).toHaveAttribute(
            "aria-label",
            expect.stringContaining("Currently 0 of 108"),
        );
    });
});
