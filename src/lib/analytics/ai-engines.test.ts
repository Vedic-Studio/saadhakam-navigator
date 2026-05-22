import { describe, expect, it } from "vitest";

import {
    AI_CHANNEL_REGEX,
    AI_ENGINES,
    AI_REFERRER_FRAGMENTS,
    matchAiEngine,
} from "./ai-engines";

describe("ai-engines: AI_ENGINES catalog", () => {
    it("includes the major GenAI surfaces by id", () => {
        const ids = AI_ENGINES.map((e) => e.id);
        for (const expected of [
            "chatgpt",
            "perplexity",
            "claude",
            "gemini",
            "copilot",
            "you",
            "phind",
            "poe",
        ]) {
            expect(ids).toContain(expected);
        }
    });

    it("never has a duplicate engine id", () => {
        const ids = AI_ENGINES.map((e) => e.id);
        expect(new Set(ids).size).toBe(ids.length);
    });

    it("each engine has at least one referrer fragment", () => {
        for (const engine of AI_ENGINES) {
            expect(engine.referrers.length).toBeGreaterThan(0);
            for (const r of engine.referrers) {
                expect(r.length).toBeGreaterThan(0);
                // referrers are host fragments — never a full URL
                expect(r.startsWith("http")).toBe(false);
            }
        }
    });

    it("flattens to AI_REFERRER_FRAGMENTS without losing entries", () => {
        const totalReferrers = AI_ENGINES.reduce((acc, e) => acc + e.referrers.length, 0);
        expect(AI_REFERRER_FRAGMENTS.length).toBe(totalReferrers);
    });
});

describe("ai-engines: matchAiEngine", () => {
    it("returns null for empty / null inputs", () => {
        expect(matchAiEngine(null)).toBeNull();
        expect(matchAiEngine(undefined)).toBeNull();
        expect(matchAiEngine("")).toBeNull();
    });

    it("returns null for non-AI sources", () => {
        expect(matchAiEngine("google.com")).toBeNull();
        expect(matchAiEngine("(direct)")).toBeNull();
        expect(matchAiEngine("https://en.wikipedia.org/wiki/Maya")).toBeNull();
    });

    it("matches canonical ChatGPT referrers", () => {
        expect(matchAiEngine("chatgpt.com")?.id).toBe("chatgpt");
        expect(matchAiEngine("https://chatgpt.com/some-thread")?.id).toBe("chatgpt");
        expect(matchAiEngine("chat.openai.com")?.id).toBe("chatgpt");
        expect(matchAiEngine("CHAT.OpenAI.COM")?.id).toBe("chatgpt");
    });

    it("matches Perplexity sub-paths and www variant", () => {
        expect(matchAiEngine("perplexity.ai")?.id).toBe("perplexity");
        expect(matchAiEngine("www.perplexity.ai")?.id).toBe("perplexity");
        expect(matchAiEngine("https://www.perplexity.ai/search?q=maya")?.id).toBe(
            "perplexity",
        );
    });

    it("matches Claude across both production domains", () => {
        expect(matchAiEngine("claude.ai")?.id).toBe("claude");
        expect(matchAiEngine("claude.com")?.id).toBe("claude");
    });

    it("matches Gemini and the legacy bard host", () => {
        expect(matchAiEngine("gemini.google.com")?.id).toBe("gemini");
        expect(matchAiEngine("bard.google.com")?.id).toBe("gemini");
    });

    it("matches Microsoft Copilot variants", () => {
        expect(matchAiEngine("copilot.microsoft.com")?.id).toBe("copilot");
        expect(matchAiEngine("bing.com/chat")?.id).toBe("copilot");
        expect(matchAiEngine("edgeservices.bing.com")?.id).toBe("copilot");
    });
});

describe("ai-engines: AI_CHANNEL_REGEX", () => {
    it("is a non-empty regex source", () => {
        expect(AI_CHANNEL_REGEX.length).toBeGreaterThan(0);
        // every fragment is alternated with `|`
        expect(AI_CHANNEL_REGEX.includes("|")).toBe(true);
    });

    it("compiles as a valid case-insensitive regex", () => {
        const re = new RegExp(AI_CHANNEL_REGEX, "i");
        expect(re.test("chatgpt.com")).toBe(true);
        expect(re.test("perplexity.ai")).toBe(true);
        expect(re.test("claude.ai")).toBe(true);
        expect(re.test("https://www.example.com")).toBe(false);
    });

    it("escapes regex metacharacters in fragments (no false-positive `.`)", () => {
        const re = new RegExp(AI_CHANNEL_REGEX, "i");
        // `chatgptXcom` should NOT match — the `.` in `chatgpt.com` must be escaped.
        expect(re.test("chatgptXcom")).toBe(false);
    });
});
