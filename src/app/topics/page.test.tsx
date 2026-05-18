import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import TopicsIndexPage, { metadata } from "./page";
import { topics } from "@/data/topics";

describe("TopicsIndexPage", () => {
  it("renders an h1 mentioning Topics", () => {
    const { container } = render(<TopicsIndexPage />);
    const h1 = container.querySelector("h1");
    expect(h1?.textContent).toMatch(/topics/i);
  });

  it("renders a link to every topic in the data file", () => {
    const { container } = render(<TopicsIndexPage />);
    const html = container.innerHTML;
    for (const t of topics) {
      const expectedHref = `/topics/${t.slug}`;
      expect(
        html.includes(expectedHref),
        `Topics index is missing a link to ${expectedHref}`,
      ).toBe(true);
    }
  });

  it("surfaces each topic's name and summary", () => {
    const { container } = render(<TopicsIndexPage />);
    const text = container.textContent ?? "";
    for (const t of topics) {
      expect(
        text.includes(t.name),
        `Topics index is missing name "${t.name}"`,
      ).toBe(true);
      expect(
        text.includes(t.summary),
        `Topics index is missing summary for "${t.slug}"`,
      ).toBe(true);
    }
  });

  it("metadata has self-referential canonical for /topics", () => {
    const canonical = (
      metadata as { alternates?: { canonical?: string } }
    ).alternates?.canonical;
    expect(canonical).toBe("https://www.opensadhaka.com/topics");
  });
});
