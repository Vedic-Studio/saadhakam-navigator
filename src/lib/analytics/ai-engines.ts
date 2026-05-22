/**
 * Canonical list of AI-engine referrer sources for opensadhaka.com.
 *
 * Used by:
 *  - server-side GA4 reporting (`src/lib/analytics/google.ts`)
 *  - pull scripts (`scripts/ga4-pull-snapshot.mjs`)
 *  - the public AI Resources page (`/ai-resources`)
 *  - the GA4 Custom Channel Group regex documented at
 *    `docs/agents/08-ga4-ai-channels.md`
 *
 * Single source of truth — keep the three surfaces in sync by importing from
 * here rather than maintaining parallel string lists.
 */

export interface AiEngine {
    /** Stable id used in tables/exports. */
    id: string;
    /** Human-readable name. */
    name: string;
    /**
     * Referrer host fragments that match this engine. Each fragment is matched
     * as a case-insensitive `String.includes` against `sessionSource` /
     * referrer host. Use the shortest unambiguous fragment per entry; multiple
     * fragments are OR-ed.
     */
    referrers: string[];
    /** Public-facing URL where users encounter this engine (for documentation). */
    homepage: string;
    /** Whether this engine consistently passes a referrer to outbound clicks. */
    passesReferrer: boolean;
}

export const AI_ENGINES: readonly AiEngine[] = [
    {
        id: "chatgpt",
        name: "ChatGPT",
        referrers: ["chatgpt.com", "chat.openai.com"],
        homepage: "https://chatgpt.com",
        passesReferrer: true,
    },
    {
        id: "perplexity",
        name: "Perplexity",
        referrers: ["perplexity.ai"],
        homepage: "https://www.perplexity.ai",
        passesReferrer: true,
    },
    {
        id: "claude",
        name: "Claude",
        referrers: ["claude.ai", "claude.com"],
        homepage: "https://claude.ai",
        passesReferrer: true,
    },
    {
        id: "gemini",
        name: "Google Gemini",
        referrers: ["gemini.google.com", "bard.google.com"],
        homepage: "https://gemini.google.com",
        passesReferrer: true,
    },
    {
        id: "copilot",
        name: "Microsoft Copilot",
        referrers: ["copilot.microsoft.com", "bing.com/chat", "edgeservices.bing.com"],
        homepage: "https://copilot.microsoft.com",
        passesReferrer: true,
    },
    {
        id: "you",
        name: "You.com",
        referrers: ["you.com"],
        homepage: "https://you.com",
        passesReferrer: true,
    },
    {
        id: "phind",
        name: "Phind",
        referrers: ["phind.com"],
        homepage: "https://www.phind.com",
        passesReferrer: true,
    },
    {
        id: "poe",
        name: "Poe",
        referrers: ["poe.com"],
        homepage: "https://poe.com",
        passesReferrer: true,
    },
    {
        id: "huggingchat",
        name: "HuggingChat",
        referrers: ["huggingface.co/chat"],
        homepage: "https://huggingface.co/chat",
        passesReferrer: true,
    },
    {
        id: "komo",
        name: "Komo",
        referrers: ["komo.ai"],
        homepage: "https://komo.ai",
        passesReferrer: false,
    },
    {
        id: "pi",
        name: "Pi (Inflection)",
        referrers: ["pi.ai"],
        homepage: "https://pi.ai",
        passesReferrer: false,
    },
    {
        id: "character",
        name: "Character.ai",
        referrers: ["character.ai"],
        homepage: "https://character.ai",
        passesReferrer: false,
    },
] as const;

/**
 * Flattened referrer fragments — convenient for `Array.some()` checks.
 */
export const AI_REFERRER_FRAGMENTS: readonly string[] = AI_ENGINES.flatMap((e) => e.referrers);

/**
 * GA4 Custom Channel Group regex.
 *
 * GA4's channel-group condition accepts a single regex. Paste this value into
 * `Admin → Channel groups → Create new → AI → Source matches regex`.
 *
 * The fragments are anchored loosely (no `^`) so any referrer host containing
 * the fragment matches — this catches `https://www.perplexity.ai/...` and
 * sub-paths like `bing.com/chat` alike.
 */
export const AI_CHANNEL_REGEX = AI_REFERRER_FRAGMENTS
    .map(escapeRegexFragment)
    .join("|");

function escapeRegexFragment(fragment: string): string {
    return fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Does the given referrer source belong to a tracked AI engine? Returns the
 * engine id when it matches, or `null` otherwise.
 *
 * The matcher is case-insensitive and tolerant of trailing slashes / paths.
 */
export function matchAiEngine(source: string | null | undefined): AiEngine | null {
    if (!source) return null;
    const haystack = source.toLowerCase();
    for (const engine of AI_ENGINES) {
        if (engine.referrers.some((needle) => haystack.includes(needle.toLowerCase()))) {
            return engine;
        }
    }
    return null;
}

/**
 * UTM source value to use when intentionally seeding Sadhaka URLs into AI
 * contexts (system prompts, AI marketplace listings, sample-prompt galleries)
 * where the referrer may not arrive cleanly.
 *
 * Pair with `utm_medium=ai` and an `utm_campaign` per channel for tracking.
 */
export const AI_UTM_SOURCE_PREFIX = "ai-";
