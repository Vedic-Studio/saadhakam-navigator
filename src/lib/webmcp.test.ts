import { describe, it, expect, vi } from "vitest";
import {
    isWebMCPSupported,
    toToolDescriptor,
    registerWebMCPTools,
    type WebMCPToolDefinition,
} from "./webmcp";

const sampleTool: WebMCPToolDefinition = {
    name: "search_sadhaka",
    description: "Search the Sadhaka knowledge base.",
    parameters: {
        query: { type: "string", description: "Search terms", required: true },
        limit: { type: "number", description: "Max results" },
    },
    execute: () => "ok",
};

describe("isWebMCPSupported", () => {
    it("returns false when navigator is missing", () => {
        expect(isWebMCPSupported(undefined)).toBe(false);
    });

    it("returns false when modelContext is absent", () => {
        expect(isWebMCPSupported({})).toBe(false);
    });

    it("returns false when modelContext exposes no usable method", () => {
        expect(isWebMCPSupported({ modelContext: {} })).toBe(false);
    });

    it("returns true with registerTool", () => {
        expect(isWebMCPSupported({ modelContext: { registerTool: () => {} } })).toBe(true);
    });

    it("returns true with provideContext", () => {
        expect(isWebMCPSupported({ modelContext: { provideContext: () => {} } })).toBe(true);
    });
});

describe("toToolDescriptor", () => {
    it("builds a JSON-schema input from compact parameters", () => {
        const d = toToolDescriptor(sampleTool);
        expect(d.name).toBe("search_sadhaka");
        expect(d.inputSchema.type).toBe("object");
        expect(d.inputSchema.properties.query).toEqual({
            type: "string",
            description: "Search terms",
        });
        expect(d.inputSchema.required).toEqual(["query"]);
    });

    it("omits optional params from required", () => {
        const d = toToolDescriptor(sampleTool);
        expect(d.inputSchema.required).not.toContain("limit");
        expect(d.inputSchema.properties.limit.type).toBe("number");
    });
});

describe("registerWebMCPTools", () => {
    it("no-ops and returns 0 when unsupported", () => {
        expect(registerWebMCPTools([sampleTool], {})).toBe(0);
    });

    it("uses provideContext when available", () => {
        const provideContext = vi.fn();
        const nav = { modelContext: { provideContext } };
        const count = registerWebMCPTools([sampleTool], nav);
        expect(count).toBe(1);
        expect(provideContext).toHaveBeenCalledOnce();
        const arg = provideContext.mock.calls[0][0];
        expect(arg.tools).toHaveLength(1);
        expect(arg.tools[0].name).toBe("search_sadhaka");
        expect(typeof arg.tools[0].execute).toBe("function");
    });

    it("falls back to registerTool per tool", () => {
        const registerTool = vi.fn();
        const nav = { modelContext: { registerTool } };
        const count = registerWebMCPTools([sampleTool, { ...sampleTool, name: "navigate" }], nav);
        expect(count).toBe(2);
        expect(registerTool).toHaveBeenCalledTimes(2);
    });
});
