import { describe, expect, it } from "vitest";
import {
  topics,
  getTopicBySlug,
  conceptSlugToTopicSlug,
  getTopicForConcept,
} from "./topics";

describe("topics data integrity", () => {
  it("contains the four orphan-recovery topics plus dharma", () => {
    const slugs = topics.map((t) => t.slug).sort();
    expect(slugs).toEqual(
      ["action", "devotion", "dharma", "knowledge", "meditation"].sort(),
    );
  });

  it("every topic has all required fields", () => {
    for (const t of topics) {
      expect(t.slug.length).toBeGreaterThan(0);
      expect(t.name.length).toBeGreaterThan(0);
      expect(t.summary.length).toBeGreaterThan(0);
      expect(t.content.length).toBeGreaterThan(0);
      expect(Array.isArray(t.recommendedPractices)).toBe(true);
      expect(Array.isArray(t.recommendedTraditions)).toBe(true);
    }
  });

  it("topic slugs are URL-safe", () => {
    for (const t of topics) {
      expect(
        /^[a-z0-9-]+$/.test(t.slug),
        `Topic slug "${t.slug}" is not URL-safe`,
      ).toBe(true);
    }
  });

  it("getTopicBySlug returns the right topic for a known slug", () => {
    expect(getTopicBySlug("meditation")?.name).toMatch(/Meditation/i);
    expect(getTopicBySlug("nonexistent")).toBeUndefined();
  });
});

describe("conceptSlugToTopicSlug mapping", () => {
  it("every mapped topic slug exists in the topics list", () => {
    const validTopicSlugs = new Set(topics.map((t) => t.slug));
    for (const [conceptSlug, topicSlug] of Object.entries(
      conceptSlugToTopicSlug,
    )) {
      expect(
        validTopicSlugs.has(topicSlug),
        `Concept "${conceptSlug}" maps to unknown topic "${topicSlug}"`,
      ).toBe(true);
    }
  });

  it("covers the four canonical path concepts", () => {
    expect(conceptSlugToTopicSlug["karma"]).toBe("action");
    expect(conceptSlugToTopicSlug["bhakti"]).toBe("devotion");
    expect(conceptSlugToTopicSlug["jnana"]).toBe("knowledge");
    expect(conceptSlugToTopicSlug["dhyana"]).toBe("meditation");
  });

  it("getTopicForConcept resolves the matching topic object", () => {
    const topic = getTopicForConcept("bhakti");
    expect(topic?.slug).toBe("devotion");
  });

  it("getTopicForConcept returns undefined for unmapped concepts", () => {
    expect(getTopicForConcept("unmapped-concept-slug")).toBeUndefined();
  });
});
