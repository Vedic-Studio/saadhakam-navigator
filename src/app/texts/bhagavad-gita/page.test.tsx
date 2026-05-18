import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import BhagavadGitaHubPage, { metadata } from "./page";
import { bgChapters } from "@/data/bgChapters";

describe("BhagavadGitaHubPage", () => {
  it("renders an h1 heading mentioning the Bhagavad Gita", () => {
    const { container } = render(<BhagavadGitaHubPage />);
    const h1 = container.querySelector("h1");
    expect(h1?.textContent).toMatch(/Bhagavad/i);
    expect(h1?.textContent).toMatch(/Gita/i);
  });

  it("renders a link to every one of the 18 chapter pages", () => {
    const { container } = render(<BhagavadGitaHubPage />);
    const html = container.innerHTML;
    for (const ch of bgChapters) {
      const expectedHref = `/texts/bhagavad-gita/chapter-${ch.chapterNumber}`;
      expect(
        html.includes(expectedHref),
        `Hub is missing a link to ${expectedHref}`,
      ).toBe(true);
    }
  });

  it("each chapter card surfaces the chapter's English name and one-sentence theme", () => {
    const { container } = render(<BhagavadGitaHubPage />);
    const text = container.textContent ?? "";
    for (const ch of bgChapters) {
      expect(
        text.includes(ch.nameEnglish),
        `Hub is missing English name "${ch.nameEnglish}"`,
      ).toBe(true);
      expect(
        text.includes(ch.oneSentenceTheme),
        `Hub is missing one-sentence theme for chapter ${ch.chapterNumber}`,
      ).toBe(true);
    }
  });

  it("metadata has a self-referential canonical for /texts/bhagavad-gita", () => {
    const canonical = (
      metadata as { alternates?: { canonical?: string } }
    ).alternates?.canonical;
    expect(canonical).toBe("https://www.opensadhaka.com/texts/bhagavad-gita");
  });

  it("metadata title and description are present and non-empty", () => {
    expect(typeof metadata.title).toBe("string");
    expect((metadata.title as string).length).toBeGreaterThan(0);
    expect(typeof metadata.description).toBe("string");
    expect((metadata.description as string).length).toBeGreaterThan(0);
  });
});
