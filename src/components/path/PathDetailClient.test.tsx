import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { PathDetailClient } from "./PathDetailClient";
import {
  PATH_PROGRESS_STORAGE_KEY,
  readPathProgress,
} from "./progress";
import type { LearningPath } from "./paths";

// A tiny two-step fixture so the "all complete" path is easy to drive, with the
// real link shape. Behaviour, not the seeded content, is under test here.
const path: LearningPath = {
  id: "test-path",
  title: "Test Path",
  summary: "summary",
  audience: "audience",
  estimate: "estimate",
  steps: [
    {
      step: 1,
      title: "Step One",
      source: "Source One",
      intro: "Intro one, long enough to be a real paragraph of orientation.",
      links: [{ label: "Go one", href: "/six-darshanas" }],
    },
    {
      step: 2,
      title: "Step Two",
      source: "Source Two",
      intro: "Intro two, long enough to be a real paragraph of orientation.",
      links: [{ label: "Go two", href: "/philosophies/vedanta" }],
    },
  ],
};

describe("PathDetailClient", () => {
  beforeEach(() => {
    window.localStorage.clear();
    // Fresh gtag spy per test.
    (window as unknown as { gtag: ReturnType<typeof vi.fn> }).gtag = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function gtagMock() {
    return (window as unknown as { gtag: ReturnType<typeof vi.fn> }).gtag;
  }

  it("renders all steps with their intros and links", () => {
    render(<PathDetailClient path={path} />);
    expect(screen.getByText("Step One")).toBeInTheDocument();
    expect(screen.getByText("Step Two")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Go one/ })).toHaveAttribute(
      "href",
      "/six-darshanas",
    );
  });

  it("starts at 0% (server-equivalent empty state) before any interaction", () => {
    render(<PathDetailClient path={path} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "0");
    expect(screen.getByText(/0 of 2/)).toBeInTheDocument();
  });

  it("marking a step persists it AND fires path_step_complete with correct args", () => {
    render(<PathDetailClient path={path} />);
    const buttons = screen.getAllByRole("button", {
      name: /Mark step complete/,
    });
    fireEvent.click(buttons[0]);

    // 1) persisted to localStorage under the versioned key
    expect(readPathProgress()).toEqual({ "test-path": [1] });

    // 2) analytics fired separately with (path_id, step_n, total_steps)
    expect(gtagMock()).toHaveBeenCalledWith("event", "path_step_complete", {
      path_id: "test-path",
      step_n: 1,
      total_steps: 2,
    });
  });

  it("updates the goal-gradient bar as steps complete", () => {
    render(<PathDetailClient path={path} />);
    fireEvent.click(
      screen.getAllByRole("button", { name: /Mark step complete/ })[0],
    );
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "50",
    );
  });

  it("undo unmarks the step and does NOT fire another event", () => {
    render(<PathDetailClient path={path} />);
    const markButtons = screen.getAllByRole("button", {
      name: /Mark step complete/,
    });
    fireEvent.click(markButtons[0]);
    expect(gtagMock()).toHaveBeenCalledTimes(1);

    // The first card's button now reads "Completed · undo".
    const undo = screen.getByRole("button", { name: /Completed/ });
    fireEvent.click(undo);

    expect(readPathProgress()).toEqual({}); // removed
    expect(gtagMock()).toHaveBeenCalledTimes(1); // no new event on undo
  });

  it("hydrates already-saved progress on mount", () => {
    window.localStorage.setItem(
      PATH_PROGRESS_STORAGE_KEY,
      JSON.stringify({ "test-path": [1] }),
    );
    render(<PathDetailClient path={path} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "50",
    );
    // Step One shows as completed (its button offers undo).
    expect(
      screen.getByRole("button", { name: /Completed/ }),
    ).toBeInTheDocument();
  });

  it("shows the completion block only once every step is done", () => {
    render(<PathDetailClient path={path} />);
    expect(screen.queryByText(/All six darshanas/)).not.toBeInTheDocument();

    for (const btn of screen.getAllByRole("button", {
      name: /Mark step complete/,
    })) {
      fireEvent.click(btn);
    }
    expect(screen.getByText(/All six darshanas/)).toBeInTheDocument();
    expect(screen.getByText("Path complete")).toBeInTheDocument();
  });

  it("fires one event per distinct step completed (goal-gradient funnel)", () => {
    render(<PathDetailClient path={path} />);
    const buttons = screen.getAllByRole("button", {
      name: /Mark step complete/,
    });
    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);
    const calls = gtagMock().mock.calls.filter(
      (c: unknown[]) => c[1] === "path_step_complete",
    );
    expect(calls.map((c: unknown[]) => (c[2] as { step_n: number }).step_n)).toEqual([1, 2]);
  });
});
