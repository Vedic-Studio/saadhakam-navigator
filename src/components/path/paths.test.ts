import { describe, it, expect } from "vitest";
import { learningPaths, getLearningPathBySlug } from "./paths";

describe("learningPaths schema", () => {
  it("has at least one path", () => {
    expect(learningPaths.length).toBeGreaterThan(0);
  });

  it("every path has the required top-level fields", () => {
    for (const path of learningPaths) {
      expect(typeof path.id).toBe("string");
      expect(path.id.length).toBeGreaterThan(0);
      expect(typeof path.title).toBe("string");
      expect(path.title.length).toBeGreaterThan(0);
      expect(typeof path.summary).toBe("string");
      expect(path.summary.length).toBeGreaterThan(0);
      expect(typeof path.audience).toBe("string");
      expect(typeof path.estimate).toBe("string");
      expect(Array.isArray(path.steps)).toBe(true);
      expect(path.steps.length).toBeGreaterThan(0);
    }
  });

  it("path ids are unique (so path_id and the URL slug never collide)", () => {
    const ids = learningPaths.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("step numbers are contiguous 1..N with no gaps or duplicates", () => {
    for (const path of learningPaths) {
      const numbers = path.steps.map((s) => s.step);
      expect(numbers).toEqual(
        Array.from({ length: path.steps.length }, (_, i) => i + 1),
      );
    }
  });

  it("every step has a title, source, a non-trivial intro, and >= 1 link", () => {
    for (const path of learningPaths) {
      for (const step of path.steps) {
        expect(step.title.length).toBeGreaterThan(0);
        expect(step.source.length).toBeGreaterThan(0);
        // Intro should be a real paragraph, not a stub.
        expect(step.intro.length).toBeGreaterThan(80);
        expect(step.links.length).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it("every link is an internal, non-trailing-slash route with a label", () => {
    for (const path of learningPaths) {
      for (const step of path.steps) {
        for (const link of step.links) {
          expect(link.label.length).toBeGreaterThan(0);
          expect(link.href.startsWith("/")).toBe(true);
          // trailingSlash:false convention — no link should end in a slash.
          expect(link.href.endsWith("/")).toBe(false);
        }
      }
    }
  });

  it("step intros avoid the hardban voice phrases", () => {
    // A representative subset of the Sadhaka voice hardban list that would most
    // likely creep into generated copy. If any intro trips this, the prose needs
    // a rewrite, not a looser test.
    const banned = [
      "journey",
      "navigate",
      "tapestry",
      "landscape",
      "holistic",
      "at its core",
      "in essence",
      "delve",
      "testament to",
    ];
    for (const path of learningPaths) {
      for (const step of path.steps) {
        const lower = step.intro.toLowerCase();
        for (const phrase of banned) {
          expect(lower).not.toContain(phrase);
        }
      }
    }
  });
});

describe("getLearningPathBySlug", () => {
  it("finds a seeded path by slug", () => {
    const path = getLearningPathBySlug("darshanas-foundations");
    expect(path).toBeDefined();
    expect(path?.title).toContain("Six Darshanas");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getLearningPathBySlug("does-not-exist")).toBeUndefined();
  });
});

describe("darshanas-foundations seed", () => {
  const path = getLearningPathBySlug("darshanas-foundations")!;

  it("has exactly the six darshanas in canonical pedagogical order", () => {
    expect(path.steps.map((s) => s.title)).toEqual([
      "Nyaya",
      "Vaisheshika",
      "Samkhya",
      "Yoga",
      "Purva Mimamsa",
      "Vedanta (Uttara Mimamsa)",
    ]);
  });

  it("links the Yoga step to the Yoga Sutras guide", () => {
    const yoga = path.steps.find((s) => s.title === "Yoga")!;
    expect(yoga.links.map((l) => l.href)).toContain(
      "/yoga-sutras-complete-guide",
    );
  });

  it("links the Vedanta step to the Vedanta school page and explainer", () => {
    const vedanta = path.steps.find((s) =>
      s.title.startsWith("Vedanta"),
    )!;
    const hrefs = vedanta.links.map((l) => l.href);
    expect(hrefs).toContain("/philosophies/vedanta");
    expect(hrefs).toContain("/what-is-vedanta");
  });

  it("links every step into the six-darshanas hub or a philosophies page", () => {
    for (const step of path.steps) {
      const hasHub = step.links.some(
        (l) =>
          l.href === "/six-darshanas" ||
          l.href.startsWith("/philosophies/"),
      );
      expect(hasHub).toBe(true);
    }
  });
});
