import { describe, expect, it } from "vitest";
import { pillarConfig } from "@/features/articles";

describe("article pillar configuration", () => {
  it("maps each pillar to a canonical hub route", () => {
    expect(pillarConfig["ancient-wisdom"].href).toBe("/ancient-wisdom-philosophies");
    expect(pillarConfig["sacred-texts"].href).toBe("/sacred-texts-teachings");
    expect(pillarConfig["practical-practices"].href).toBe("/practical-spiritual-practices");
    expect(pillarConfig["spiritual-traditions"].href).toBe("/spiritual-traditions-paths");
  });
});
