import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import PracticeDetailPage from "./page";
import { getPracticeBySlug } from "@/data/practices";

async function renderPractice(slug: string) {
  const ui = await PracticeDetailPage({
    params: Promise.resolve({ practice: slug }),
  });
  return render(ui);
}

describe("PracticeDetailPage as practice hub", () => {
  it("japa hub renders and links to all four published intent pages", async () => {
    const { container } = await renderPractice("japa");
    const html = container.innerHTML;
    const japa = getPracticeBySlug("japa");
    expect(japa?.availableGoals).toContain("devotion");
    expect(japa?.availableGoals).toContain("sleep");
    expect(html.includes("/practices/japa/for/devotion")).toBe(true);
    expect(html.includes("/practices/japa/for/sleep")).toBe(true);
    expect(html.includes("/practices/japa/for/anxiety")).toBe(true);
    expect(html.includes("/practices/japa/for/focus")).toBe(true);
  });

  it("kirtan hub renders and links to its single published intent (devotion)", async () => {
    const { container } = await renderPractice("kirtan");
    const html = container.innerHTML;
    expect(html.includes("/practices/kirtan/for/devotion")).toBe(true);
  });

  it("puja hub renders and links to its single published intent (devotion)", async () => {
    const { container } = await renderPractice("puja");
    const html = container.innerHTML;
    expect(html.includes("/practices/puja/for/devotion")).toBe(true);
  });

  it("intent links never include a goal slug that is not in availableGoals", async () => {
    const { container } = await renderPractice("puja");
    const html = container.innerHTML;
    // puja only publishes the `devotion` goal page. None of the other goal
    // pages should be linked from its hub.
    expect(html.includes("/practices/puja/for/anxiety")).toBe(false);
    expect(html.includes("/practices/puja/for/sleep")).toBe(false);
    expect(html.includes("/practices/puja/for/focus")).toBe(false);
  });
});
