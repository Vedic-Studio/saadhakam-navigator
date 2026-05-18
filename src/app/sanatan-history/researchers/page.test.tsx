import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import ResearchersIndexPage, { metadata } from "./page";
import { researchers } from "@/data/researchers";

describe("ResearchersIndexPage", () => {
  it("renders an h1 mentioning Researchers", () => {
    const { container } = render(<ResearchersIndexPage />);
    const h1 = container.querySelector("h1");
    expect(h1?.textContent).toMatch(/researchers/i);
  });

  it("renders a profile link for every researcher", () => {
    const { container } = render(<ResearchersIndexPage />);
    const html = container.innerHTML;
    for (const r of researchers) {
      const expectedHref = `/sanatan-history/researchers/${r.id}`;
      expect(
        html.includes(expectedHref),
        `Researchers index is missing a link to ${expectedHref}`,
      ).toBe(true);
    }
  });

  it("specifically links to the orphan-recovery Manogna Sastry profile", () => {
    const { container } = render(<ResearchersIndexPage />);
    expect(
      container.innerHTML.includes(
        "/sanatan-history/researchers/manogna-sastry",
      ),
    ).toBe(true);
  });

  it("metadata has self-referential canonical for /sanatan-history/researchers", () => {
    const canonical = (
      metadata as { alternates?: { canonical?: string } }
    ).alternates?.canonical;
    expect(canonical).toBe(
      "https://www.opensadhaka.com/sanatan-history/researchers",
    );
  });
});
