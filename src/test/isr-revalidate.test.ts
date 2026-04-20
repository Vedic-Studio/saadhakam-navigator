import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

type IsrTarget = { file: string; expected: number };

const ISR_TARGETS: IsrTarget[] = [
    { file: "src/app/panchang/page.tsx", expected: 3600 },
    { file: "src/app/texts/bhagavad-gita/[chapter]/page.tsx", expected: 86400 },
    { file: "src/app/texts/bhagavad-gita/[chapter]/[shloka]/page.tsx", expected: 86400 },
    { file: "src/app/stotras/lalita-sahasranama/[slug]/page.tsx", expected: 86400 },
    { file: "src/app/stotras/shiva-tandava-stotram/[verse]/page.tsx", expected: 86400 },
    { file: "src/app/stotras/vishnu-sahasranama/[slug]/page.tsx", expected: 86400 },
    { file: "src/app/stotras/navagraha-stotram/[verse]/page.tsx", expected: 86400 },
    { file: "src/app/deities/[slug]/page.tsx", expected: 86400 },
    { file: "src/app/mantras/[slug]/page.tsx", expected: 86400 },
    { file: "src/app/learn/sanskrit/[word]/page.tsx", expected: 86400 },
];

const REVALIDATE_REGEX = /^export const revalidate\s*=\s*(\d+)\s*;?\s*$/m;

describe("ISR revalidate exports on slow SSR routes (T9)", () => {
    it.each(ISR_TARGETS)("$file declares revalidate = $expected", ({ file, expected }) => {
        const absolute = resolve(process.cwd(), file);
        const source = readFileSync(absolute, "utf8");
        const match = REVALIDATE_REGEX.exec(source);
        expect(match, `expected ${file} to export const revalidate`).not.toBeNull();
        expect(Number(match![1])).toBe(expected);
    });
});
