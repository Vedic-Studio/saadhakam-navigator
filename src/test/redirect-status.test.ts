import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function readSource(file: string): string {
    return readFileSync(resolve(process.cwd(), file), "utf8");
}

const VISHNU_SLUG_PAGE = "src/app/stotras/vishnu-sahasranama/[slug]/page.tsx";
const VISHNU_INDEX_PAGE = "src/app/stotras/vishnu-sahasranama/page.tsx";
const LALITA_SLUG_PAGE = "src/app/stotras/lalita-sahasranama/[slug]/page.tsx";

describe("Vishnu Sahasranama redirect status + canonical structured data", () => {
    it("vishnu [slug] route uses permanentRedirect (308) for the name-slug fallback", () => {
        const source = readSource(VISHNU_SLUG_PAGE);
        // 308 Permanent lets Google consolidate historical name-slug URLs onto the verse.
        expect(source).toContain("permanentRedirect(");
        expect(source).toMatch(/import\s*{[^}]*permanentRedirect[^}]*}\s*from\s*"next\/navigation"/);
    });

    it("vishnu [slug] route does NOT use a bare redirect() (307 Temporary) for the fallback", () => {
        const source = readSource(VISHNU_SLUG_PAGE);
        // A 307 would keep the old URL as a separate ranking candidate; guard against regression.
        expect(source).not.toMatch(/[^t]redirect\(/);
        expect(source).not.toMatch(/import\s*{[^}]*\bredirect\b[^}]*}\s*from\s*"next\/navigation"/);
    });

    it("vishnu index collection schema lists canonical verse slugs, not redirecting name slugs", () => {
        const source = readSource(VISHNU_INDEX_PAGE);
        // ItemList must advertise 200-serving verse URLs (shloka-N), never name slugs that redirect.
        expect(source).toMatch(/items:\s*\(sahasranama\.verses[^)]*\)\.map\(\(verse\)/);
        expect(source).toContain("vishnu-sahasranama/${verse.slug}");
        expect(source).not.toContain("vishnu-sahasranama/${name.slug}");
    });

    it("lalita [slug] route stays redirect-free (renders name pages directly, 200)", () => {
        const source = readSource(LALITA_SLUG_PAGE);
        // Guard against an accidental redirect being introduced to lalita, which serves names directly.
        expect(source).not.toContain("redirect");
    });
});
