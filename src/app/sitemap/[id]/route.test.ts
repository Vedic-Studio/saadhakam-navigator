import { describe, expect, it } from "vitest";
import { GET as getSitemapIndex } from "@/app/sitemap.xml/route";
import { GET as getChildSitemap } from "@/app/sitemap/[id]/route";

// Ahrefs 13 Apr 2026 flagged /jyotish/today (308 → /panchang) as a
// "3xx redirect in sitemap" — waste of crawl budget. Keep a canonical
// allow-list here so regressions fail loudly rather than ship silently.
const FORBIDDEN_SITEMAP_URLS = [
    "https://www.opensadhaka.com/jyotish/today",
];

const SITEMAP_IDS = [
    "core",
    "philosophies",
    "traditions",
    "texts",
    "greats",
    "concepts",
    "comparisons",
    "topics",
    "practices",
    "shlokas",
    "sanskrit",
    "articles",
    "stotras",
    "deities",
    "mantras",
    "jyotish",
    "history",
];

async function fetchChild(id: string): Promise<string> {
    const res = await getChildSitemap(new Request("http://localhost/sitemap/" + id + ".xml") as never, {
        params: Promise.resolve({ id: id + ".xml" }),
    });
    return res.text();
}

describe("sitemap index", () => {
    it("emits one <sitemap> entry per SITEMAP_IDS", async () => {
        const res = await getSitemapIndex();
        const xml = await res.text();

        for (const id of SITEMAP_IDS) {
            expect(xml).toContain(`/sitemap/${id}.xml`);
        }
    });

    it("advertises exactly the same children served by the dynamic route", async () => {
        const res = await getSitemapIndex();
        const xml = await res.text();
        const declaredIds = Array.from(xml.matchAll(/\/sitemap\/([^.]+)\.xml/g)).map(
            (m) => m[1],
        );

        // Index parity with the dynamic route's allow-list — any drift here
        // means Ahrefs will flag the orphaned or missing child.
        expect([...declaredIds].sort()).toEqual([...SITEMAP_IDS].sort());
    });
});

describe("child sitemaps", () => {
    it.each(SITEMAP_IDS)(
        "%s sitemap never contains URLs that are permanent redirects",
        async (id) => {
            const xml = await fetchChild(id);
            for (const forbidden of FORBIDDEN_SITEMAP_URLS) {
                expect(xml).not.toContain(`<loc>${forbidden}</loc>`);
            }
        },
    );

    it("jyotish sitemap promotes /panchang (the canonical of /jyotish/today)", async () => {
        const xml = await fetchChild("jyotish");
        expect(xml).toContain("<loc>https://www.opensadhaka.com/panchang</loc>");
    });

    it("core sitemap includes /privacy and /terms", async () => {
        const xml = await fetchChild("core");
        expect(xml).toContain("<loc>https://www.opensadhaka.com/privacy</loc>");
        expect(xml).toContain("<loc>https://www.opensadhaka.com/terms</loc>");
    });

    it("returns 404 for unknown sitemap ids", async () => {
        const res = await getChildSitemap(new Request("http://localhost/sitemap/nope.xml") as never, {
            params: Promise.resolve({ id: "nope.xml" }),
        });
        expect(res.status).toBe(404);
    });
});
