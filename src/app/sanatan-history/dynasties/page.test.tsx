import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import DynastiesIndexPage, { metadata } from "./page";
import { dynasties } from "@/data/dynasties";

describe("DynastiesIndexPage", () => {
  it("renders an h1 mentioning Dynasties", () => {
    const { container } = render(<DynastiesIndexPage />);
    const h1 = container.querySelector("h1");
    expect(h1?.textContent).toMatch(/dynast/i);
  });

  it("renders a profile link for every dynasty", () => {
    const { container } = render(<DynastiesIndexPage />);
    const html = container.innerHTML;
    for (const d of dynasties) {
      const expectedHref = `/sanatan-history/dynasties/${d.id}`;
      expect(
        html.includes(expectedHref),
        `Dynasties index is missing a link to ${expectedHref}`,
      ).toBe(true);
    }
  });

  it("specifically links to the orphan-recovery Chola dynasty profile", () => {
    const { container } = render(<DynastiesIndexPage />);
    expect(
      container.innerHTML.includes("/sanatan-history/dynasties/chola"),
    ).toBe(true);
  });

  it("metadata has self-referential canonical for /sanatan-history/dynasties", () => {
    const canonical = (
      metadata as { alternates?: { canonical?: string } }
    ).alternates?.canonical;
    expect(canonical).toBe(
      "https://www.opensadhaka.com/sanatan-history/dynasties",
    );
  });
});
