import { describe, expect, it } from "vitest";
import {
    createStatelessFaithFinderResultId,
    parseStatelessFaithFinderResultId,
} from "@/lib/faithFinderResultToken";

describe("faithFinderResultToken", () => {
    it("creates and parses a stateless id", () => {
        const result = {
            primaryPath: "inquiry",
            scores: { inquiry: 10, devotion: 2, ritual: 1, discipline: 4 },
            recommendations: {
                traditions: ["Advaita Vedanta"],
                practices: ["Self-inquiry"],
                philosophies: ["Advaita"],
            },
        };

        const createdAt = "2026-03-10T10:00:00.000Z";
        const id = createStatelessFaithFinderResultId(result, createdAt);
        const parsed = parseStatelessFaithFinderResultId(id);

        expect(parsed).not.toBeNull();
        expect(parsed?.createdAt).toBe(createdAt);
        expect(parsed?.result).toEqual(result);
    });

    it("rejects tampered ids", () => {
        const id = createStatelessFaithFinderResultId({ primaryPath: "devotion" });
        const tampered = `${id}tamper`;
        expect(parseStatelessFaithFinderResultId(tampered)).toBeNull();
    });

    it("rejects non-stateless ids", () => {
        expect(parseStatelessFaithFinderResultId("plain-db-id")).toBeNull();
    });
});
