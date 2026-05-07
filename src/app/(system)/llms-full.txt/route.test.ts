import { describe, expect, it } from "vitest";
import { GET } from "./route";
import {
    loadSahasranama,
    getAllSahasranamaNames,
} from "@/lib/stotras";

describe("/llms-full.txt", () => {
    it("returns 200 with text/plain content", async () => {
        const res = await GET();
        expect(res.status).toBe(200);
        expect(res.headers.get("content-type")).toMatch(/text\/plain/);
    });

    it("includes a section header from each major content tier", async () => {
        const res = await GET();
        const body = await res.text();

        // Hard markers for every section the file is contracted to expose to LLMs.
        // If a section silently drops out — e.g. a data import is renamed — the
        // route would still 200 but the dump becomes incomplete; this catches that.
        expect(body).toContain("# EDITORIAL ARTICLES");
        expect(body).toContain("# BHAGAVAD GITA SHLOKAS");
        expect(body).toContain("# SHIVA TANDAVA STOTRAM");
        expect(body).toContain("# VISHNU SAHASRANAMA");
        expect(body).toContain("# LALITA SAHASRANAMA");
        expect(body).toContain("# PHILOSOPHIES");
        expect(body).toContain("# TRADITIONS");
        expect(body).toContain("# SACRED TEXTS");
        expect(body).toContain("# GREAT TEACHERS & SAGES");
        expect(body).toContain("# SPIRITUAL PRACTICES");
        expect(body).toContain("# CONCEPTS");
    });

    // Regression test for the bug that took /llms-full.txt to 500 in production:
    // Vishnu Sahasranama JSON migrated from a flat `names: [...]` schema to a
    // verse-based `verses: [{ names: [...] }]` schema. The route was iterating
    // `vishnuSahasranama.names` directly, which became `undefined` after the
    // migration → TypeError → 500. Both shapes must work.
    it("emits every Vishnu Sahasranama name regardless of JSON shape", async () => {
        const res = await GET();
        const body = await res.text();

        const vishnu = loadSahasranama("vishnu-sahasranama");
        const allNames = getAllSahasranamaNames(vishnu);
        expect(allNames.length).toBeGreaterThan(900);

        const firstName = allNames[0];
        const middleName = allNames[Math.floor(allNames.length / 2)];
        const lastName = allNames[allNames.length - 1];

        for (const n of [firstName, middleName, lastName]) {
            expect(body).toContain(`## ${n.name} (Name ${n.number})`);
            expect(body).toContain(`/stotras/vishnu-sahasranama/${n.slug}`);
        }
    });

    it("emits every Lalita Sahasranama name", async () => {
        const res = await GET();
        const body = await res.text();

        const lalita = loadSahasranama("lalita-sahasranama");
        const allNames = getAllSahasranamaNames(lalita);
        expect(allNames.length).toBeGreaterThan(900);

        const firstName = allNames[0];
        const lastName = allNames[allNames.length - 1];

        for (const n of [firstName, lastName]) {
            expect(body).toContain(`## ${n.name} (Name ${n.number})`);
            expect(body).toContain(`/stotras/lalita-sahasranama/${n.slug}`);
        }
    });
});
