import { NextResponse } from "next/server";
import { generateSitemaps, default as getSitemap } from "../sitemap";

export async function GET() {
    // Generate the sitemap blocks (pulling from logic inside sitemap.ts)
    const maps = await generateSitemaps();

    let content = `# Sādhaka Full Context

> This file provides a comprehensive list of all Sādhaka documentation and pages for Large Language Models.

`;

    for (const map of maps) {
        const sitemapData = await getSitemap({ id: map.id });

        // Capitalize ID gracefully for the H2
        const sectionName =
            map.id.charAt(0).toUpperCase() + map.id.slice(1).replace(/([A-Z])/g, " $1");

        content += `## ${sectionName}\n`;

        for (const entry of sitemapData) {
            // Determine what to label link
            // Grab end of the url, e.g. "what-is-dharma"
            const urlEnding = entry.url.split("/").pop() || "home";
            // Titleize the path a bit for human/LLM readability
            let title = urlEnding
                .split("-")
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" ");

            if (urlEnding === "opensadhaka.com" || urlEnding === "") {
                title = "Sādhaka Home";
            }

            content += `- [${title}](${entry.url})\n`;
        }
        content += "\n";
    }

    return new NextResponse(content, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200",
        },
    });
}
