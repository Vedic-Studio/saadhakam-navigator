import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import BgChapterPage from "./page";

async function renderChapter(chapterSlug: string) {
  // The page is an async server component. Awaiting the function gives us a
  // ready-to-render React element.
  const ui = await BgChapterPage({
    params: Promise.resolve({ chapter: chapterSlug }),
  });
  return render(ui);
}

describe("BgChapterPage adjacent-chapter navigation", () => {
  it("Chapter 1 shows a Next link to Chapter 2 and no Previous link", async () => {
    const { container } = await renderChapter("chapter-1");
    const html = container.innerHTML;
    expect(html.includes("/texts/bhagavad-gita/chapter-2")).toBe(true);
    expect(html.includes("/texts/bhagavad-gita/chapter-0")).toBe(false);
    expect((container.textContent ?? "").toLowerCase()).not.toContain(
      "previous chapter",
    );
  });

  it("Chapter 9 shows both Previous (8) and Next (10) links", async () => {
    const { container } = await renderChapter("chapter-9");
    const html = container.innerHTML;
    expect(html.includes("/texts/bhagavad-gita/chapter-8")).toBe(true);
    expect(html.includes("/texts/bhagavad-gita/chapter-10")).toBe(true);
    const lower = (container.textContent ?? "").toLowerCase();
    expect(lower).toContain("previous chapter");
    expect(lower).toContain("next chapter");
  });

  it("Chapter 18 shows a Previous link to Chapter 17 and no Next link", async () => {
    const { container } = await renderChapter("chapter-18");
    const html = container.innerHTML;
    expect(html.includes("/texts/bhagavad-gita/chapter-17")).toBe(true);
    expect(html.includes("/texts/bhagavad-gita/chapter-19")).toBe(false);
    expect((container.textContent ?? "").toLowerCase()).not.toContain(
      "next chapter",
    );
  });
});
