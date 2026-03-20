const baseUrl = "https://www.opensadhaka.com";

const sitemapPaths = [
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
];

export async function GET() {
    const body = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapPaths
        .map((path) => `  <sitemap><loc>${baseUrl}/sitemap/${path}.xml</loc></sitemap>`)
        .join("\n")}\n</sitemapindex>`;

    return new Response(body, {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
    });
}
