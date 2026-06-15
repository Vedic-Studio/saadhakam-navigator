import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FaithFinderCTA } from "@/components/faith-finder/FaithFinderCTA";

describe("FaithFinderCTA", () => {
  afterEach(() => {
    delete (window as { sadhaka?: unknown }).sadhaka;
  });

  it("renders the heading and a link carrying the source_template in the query string", () => {
    render(<FaithFinderCTA sourceTemplate="concept-essay" />);

    expect(screen.getByText("Not sure where to start?")).toBeInTheDocument();

    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/faith-finder?src=concept-essay");
  });

  it("reflects a different sourceTemplate in the link href", () => {
    render(<FaithFinderCTA sourceTemplate="biography" />);

    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/faith-finder?src=biography");
  });

  it("fires ctaClick with the source_template arg on click", () => {
    const ctaClick = vi.fn();
    (window as unknown as { sadhaka: { ctaClick: typeof ctaClick } }).sadhaka = {
      ctaClick,
    };

    render(<FaithFinderCTA sourceTemplate="comparison" />);
    fireEvent.click(screen.getByRole("link"));

    expect(ctaClick).toHaveBeenCalledTimes(1);
    expect(ctaClick).toHaveBeenCalledWith(
      "faith_finder_cta",
      "/faith-finder",
      {},
      "comparison",
    );
  });

  it("does not throw when window.sadhaka is undefined", () => {
    render(<FaithFinderCTA sourceTemplate="concept-essay" />);
    expect(() => fireEvent.click(screen.getByRole("link"))).not.toThrow();
  });
});
