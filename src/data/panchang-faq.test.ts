import { describe, expect, it } from "vitest";
import { panchangFaqs } from "@/data/panchang-faq";

describe("panchangFaqs", () => {
    it("provides a stable FAQ set for the panchang page", () => {
        expect(panchangFaqs.length).toBeGreaterThanOrEqual(5);
        expect(panchangFaqs.every((item) => item.question.length > 10)).toBe(true);
        expect(panchangFaqs.every((item) => item.answer.length > 40)).toBe(true);
    });
});