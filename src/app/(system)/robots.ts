import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
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
  ];
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/variant-a",
          "/variant-b",
          "/variant-c",
          "/variant-d",
          "/variant-e",
          "/variant-f",
          "/variant-selector",
          "/start",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "Bingbot",
        allow: "/",
      },
      {
        userAgent: "Twitterbot",
        allow: "/",
      },
      {
        userAgent: "facebookexternalhit",
        allow: "/",
      },
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      {
        userAgent: "GoogleOther",
        allow: "/",
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
      },
      {
        userAgent: "Amazonbot",
        allow: "/",
      },
      {
        userAgent: "FacebookBot",
        allow: "/",
      },
      {
        userAgent: "cohere-ai",
        allow: "/",
      },
      {
        userAgent: "Bytespider",
        disallow: "/",
      },
      {
        userAgent: "CCBot",
        disallow: "/",
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      ...sitemapPaths.map((path) => `${baseUrl}/sitemap/${path}.xml`),
      `${baseUrl}/llms.txt`,
      `${baseUrl}/llms-full.txt`,
    ],
  };
}
