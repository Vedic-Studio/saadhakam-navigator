import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import PracticesIndexPage, { metadata } from "./page";
import { practices } from "@/data/practices";

describe("PracticesIndexPage", () => {
  it("renders an h1 mentioning Practices", () => {
    const { container } = render(<PracticesIndexPage />);
    const h1 = container.querySelector("h1");
    expect(h1?.textContent).toMatch(/practices/i);
  });

  it("renders a link to every practice including the three orphan-recovery hubs", () => {
    const { container } = render(<PracticesIndexPage />);
    const html = container.innerHTML;
    for (const p of practices) {
      const expectedHref = `/practices/${p.slug}`;
      expect(
        html.includes(expectedHref),
        `Practices index is missing link to ${expectedHref}`,
      ).toBe(true);
    }
    // Belt-and-braces: ensure the three orphan-recovery hubs are linked.
    expect(html.includes("/practices/japa")).toBe(true);
    expect(html.includes("/practices/kirtan")).toBe(true);
    expect(html.includes("/practices/puja")).toBe(true);
  });

  it("metadata has a self-referential canonical for /practices", () => {
    const canonical = (
      metadata as { alternates?: { canonical?: string } }
    ).alternates?.canonical;
    expect(canonical).toBe("https://www.opensadhaka.com/practices");
  });
});
