import { NextResponse } from "next/server";
import { generateSitemaps, default as getSitemap } from "../sitemap";

// Import all data sources
import { philosophies } from "@/data/philosophies";
import { traditions } from "@/data/traditions";
import { texts } from "@/data/texts";
import { greats } from "@/data/greats";
import { practices } from "@/data/practices";
import { concepts } from "@/data/concepts";
import { topics } from "@/data/topics";
import { comparisons } from "@/data/comparisons";

export async function GET() {
    // Generate the sitemap blocks (pulling from logic inside sitemap.ts)
    const maps = await generateSitemaps();

    let content = `# Sādhaka Full Context

> This file provides a comprehensive list of all Sādhaka documentation and pages for Large Language Models. All linked files below return strict Markdown content optimized for LLM consumption.

`;

    for (const map of maps) {
        if (map.id === "core" || map.id === "shlokas" || map.id === "sanskrit" || map.id === "articles") {
            // Skip core/shlokas/articles for the raw markdown endpoint for now, 
            // since those are handled differently or are static React pages.
            // We'll just link to their standard HTML counterparts.
            const sitemapData = await getSitemap({ id: map.id });
            const sectionName = map.id.charAt(0).toUpperCase() + map.id.slice(1).replace(/([A-Z])/g, " $1");
            content += `## ${sectionName}\n`;
            for (const entry of sitemapData) {
                const urlEnding = entry.url.split("/").pop() || "home";
                let title = urlEnding.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
                if (urlEnding === "opensadhaka.com" || urlEnding === "") title = "Sādhaka Home";
                content += `- [${title}](${entry.url})\n`;
            }
            content += "\n";
            continue;
        }

        const sitemapData = await getSitemap({ id: map.id });
        const sectionName = map.id.charAt(0).toUpperCase() + map.id.slice(1).replace(/([A-Z])/g, " $1");

        content += `## ${sectionName}\n`;

        for (const entry of sitemapData) {
            const slug = entry.url.split("/").pop() || "";
            let title = slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
            let summary = "";

            // Find summary based on map.id
            if (map.id === "philosophies") {
                const item = philosophies.find(p => p.slug === slug);
                if (item) { title = item.title; summary = item.summary; }
            } else if (map.id === "traditions") {
                const item = traditions.find(t => t.slug === slug);
                if (item) { title = item.title; summary = item.summary; }
            } else if (map.id === "texts") {
                const item = texts.find(t => t.slug === slug);
                if (item) { title = item.title; summary = item.summary; }
            } else if (map.id === "greats") {
                const item = greats.find(g => g.slug === slug);
                if (item) { title = item.name; summary = item.summary; }
            } else if (map.id === "practices" && !entry.url.includes("/for/")) {
                const item = practices.find(p => p.slug === slug);
                if (item) { title = item.title; summary = item.summary; }
            } else if (map.id === "concepts") {
                // handle "what-is-slug" or "slug-meaning"
                const cleanSlug = slug.replace("what-is-", "").replace("-meaning", "");
                title = cleanSlug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
                const item = concepts.find(c => c.slug === cleanSlug);
                if (item) { title = item.sanskritWord || title; summary = item.shortDefinition; }
            } else if (map.id === "topics") {
                const item = topics.find(t => t.slug === slug);
                if (item) { title = item.name; summary = item.summary; }
            } else if (map.id === "comparisons") {
                const item = comparisons.find(c => c.slug === slug);
                if (item) { title = item.title; summary = item.tldr || item.metaDescription; }
            }

            const summaryText = summary ? `: ${summary}` : "";

            // Rewrite the URL to point to our pure Markdown endpoint
            // e.g., https://opensadhaka.com/api/llm-content?type=philosophies&slug=advaita
            const mdUrl = `https://opensadhaka.com/api/llm-content?type=${map.id}&slug=${slug}`;

            content += `- [${title}](${mdUrl})${summaryText}\n`;
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
