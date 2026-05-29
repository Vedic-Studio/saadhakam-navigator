/**
 * WebMCP (Web Model Context Protocol) integration helpers.
 *
 * Chrome's Lighthouse "Agentic Browsing" audit checks whether a page registers
 * tools an AI agent can call, via the emerging `navigator.modelContext` API.
 * The API surface is still a draft and ships only behind a flag in some
 * browsers, so everything here is strictly feature-detected and no-ops where
 * the API is absent. Nothing in this module changes behaviour for human users.
 *
 * Spec reference (draft): https://github.com/webmachinelearning/webmcp
 * Audit reference: https://developer.chrome.com/docs/lighthouse/agentic-browsing/scoring
 */

export interface WebMCPToolParameter {
    type: "string" | "number" | "boolean";
    description: string;
    required?: boolean;
}

export interface WebMCPToolDefinition {
    name: string;
    description: string;
    /** JSON-schema-ish input descriptor, kept intentionally small. */
    parameters: Record<string, WebMCPToolParameter>;
    /** Returns a plain-text result the agent can read. */
    execute: (args: Record<string, unknown>) => Promise<string> | string;
}

/**
 * Minimal shape of the draft `navigator.modelContext` provider. We only model
 * the methods we actually call so the rest of the codebase stays unaware of the
 * unstable global.
 */
interface ModelContextProvider {
    registerTool?: (tool: unknown) => unknown;
    provideContext?: (context: { tools: unknown[] }) => unknown;
}

/** True when the running browser exposes a usable WebMCP provider. */
export function isWebMCPSupported(nav: unknown = typeof navigator !== "undefined" ? navigator : undefined): boolean {
    if (!nav || typeof nav !== "object") return false;
    const mc = (nav as { modelContext?: unknown }).modelContext;
    if (!mc || typeof mc !== "object") return false;
    const provider = mc as ModelContextProvider;
    return typeof provider.registerTool === "function" || typeof provider.provideContext === "function";
}

/**
 * Converts our compact tool definition into the JSON-Schema input the draft API
 * expects. Pure and unit-tested so the registration path stays predictable even
 * as the underlying global churns.
 */
export function toToolDescriptor(tool: WebMCPToolDefinition) {
    const properties: Record<string, { type: string; description: string }> = {};
    const required: string[] = [];
    for (const [key, param] of Object.entries(tool.parameters)) {
        properties[key] = { type: param.type, description: param.description };
        if (param.required) required.push(key);
    }
    return {
        name: tool.name,
        description: tool.description,
        inputSchema: {
            type: "object" as const,
            properties,
            required,
        },
    };
}

/**
 * Registers a batch of tools against whichever draft entry point the browser
 * exposes. Returns the number of tools registered (0 when unsupported), so
 * callers — and tests — can assert the outcome without touching the global.
 */
export function registerWebMCPTools(
    tools: WebMCPToolDefinition[],
    nav: unknown = typeof navigator !== "undefined" ? navigator : undefined,
): number {
    if (!isWebMCPSupported(nav)) return 0;
    const provider = (nav as { modelContext: ModelContextProvider }).modelContext;

    // Preferred (newer) shape: provideContext with the full tool list.
    if (typeof provider.provideContext === "function") {
        provider.provideContext({
            tools: tools.map((t) => ({ ...toToolDescriptor(t), execute: t.execute })),
        });
        return tools.length;
    }

    // Fallback shape: registerTool one at a time.
    let count = 0;
    for (const t of tools) {
        provider.registerTool!({ ...toToolDescriptor(t), execute: t.execute });
        count += 1;
    }
    return count;
}
