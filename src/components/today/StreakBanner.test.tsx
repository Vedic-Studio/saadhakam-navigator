import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { StreakBanner } from "./StreakBanner";
import { USER_STATE_STORAGE_KEY } from "@/lib/userState";

describe("StreakBanner", () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it("shows the loss-aversion cue with the current streak count when one exists", async () => {
        window.localStorage.setItem(
            USER_STATE_STORAGE_KEY,
            JSON.stringify({
                streak: { count: 5, lastActiveYmd: "2026-06-15", graceUsed: false },
                bookmarks: [],
            }),
        );
        render(<StreakBanner />);

        // After hydration the streak headline and loss-aversion subline appear.
        expect(await screen.findByText("5-day streak")).toBeInTheDocument();
        expect(screen.getByText(/don't break your 5-day streak/i)).toBeInTheDocument();
    });

    it("shows a low-pressure invitation when there is no streak", async () => {
        render(<StreakBanner />);

        expect(await screen.findByText("Begin today")).toBeInTheDocument();
        // The loss-aversion phrasing must NOT appear when there is nothing to lose.
        expect(screen.queryByText(/don't break/i)).not.toBeInTheDocument();
    });

    it("renders a status region for assistive tech", () => {
        render(<StreakBanner />);
        expect(screen.getByRole("status")).toBeInTheDocument();
    });
});
