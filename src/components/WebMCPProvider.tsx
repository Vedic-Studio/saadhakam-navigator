"use client";

import { useEffect } from "react";
import { registerWebMCPTools, type WebMCPToolDefinition } from "@/lib/webmcp";

const SITE_URL = "https://www.opensadhaka.com";

/**
 * Tools exposed to AI agents via the draft WebMCP API. Kept deliberately small,
 * same-origin, and side-effect-light: this is an experimental probe for the
 * Lighthouse "Agentic Browsing" audit, not a full agent surface.
 */
function buildTools(): WebMCPToolDefinition[] {
    return [
        {
            name: "get_site_index",
            description:
                "Return Sadhaka's machine-readable content directory (an AI context router). " +
                "Use this first to discover articles, concepts, deities, mantras, stotras, and " +
                "Bhagavad Gita shlokas before navigating.",
            parameters: {},
            execute: () =>
                [
                    "Sadhaka (opensadhaka.com) — English reference for Sanatan Dharma.",
                    `Curated AI index: ${SITE_URL}/llms.txt`,
                    `Full structured content dump (RAG): ${SITE_URL}/llms-full.txt`,
                    `Per-entity Markdown: ${SITE_URL}/api/llm-content?type={type}&slug={slug}`,
                    "Sections: Editorial articles, Concept explorer, Deities, Mantras, Stotras & Sahasranamas, Bhagavad Gita shlokas.",
                ].join("\n"),
        },
        {
            name: "open_page",
            description:
                "Navigate the current browser tab to a Sadhaka page. Accepts a same-origin path " +
                "such as '/what-is-maya' or '/deities/shiva'.",
            parameters: {
                path: {
                    type: "string",
                    description: "Same-origin path beginning with '/'.",
                    required: true,
                },
            },
            execute: (args) => {
                const raw = String(args.path ?? "");
                // Only allow same-origin relative paths — never external URLs.
                if (!raw.startsWith("/") || raw.startsWith("//")) {
                    return `Refused: path must be a same-origin path beginning with '/'. Got: ${raw}`;
                }
                if (typeof window !== "undefined") {
                    window.location.assign(raw);
                }
                return `Navigating to ${raw}`;
            },
        },
    ];
}

/**
 * Registers Sadhaka's WebMCP tools once on mount. Renders nothing. On browsers
 * without `navigator.modelContext` (the overwhelming majority today) this is a
 * silent no-op.
 */
export function WebMCPProvider() {
    useEffect(() => {
        try {
            registerWebMCPTools(buildTools());
        } catch {
            // WebMCP is a moving draft; never let registration break the page.
        }
    }, []);

    return null;
}
