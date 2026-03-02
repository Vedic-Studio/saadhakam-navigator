import { MetadataRoute } from "next";
import { philosophies } from "@/data/philosophies";
import { traditions } from "@/data/traditions";
import { texts } from "@/data/texts";
import { greats } from "@/data/greats";
import { practices } from "@/data/practices";
import { concepts } from "@/data/concepts";
import { comparisons } from "@/data/comparisons";

const baseUrl = "https://opensadhaka.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static core pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/philosophies`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/traditions`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/texts`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/greats`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faith-finder`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // SEO article pages
    {
      url: `${baseUrl}/what-is-vedanta`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/advaita-vedanta-explained`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/vedanta-guide`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/bhagavad-gita-complete-guide`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/bhagavad-gita-chapter-1`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/yoga-sutras-complete-guide`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/upanishads-core-wisdom`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/how-to-start-japa`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/10-powerful-sanskrit-mantras`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/adi-shankaracharya-life-teachings`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/daily-spiritual-routine-beginners`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/how-to-choose-a-mantra`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/ancient-wisdom-philosophies`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/sacred-texts-teachings`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/practical-spiritual-practices`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/spiritual-traditions-paths`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Dynamic philosophy pages
  const philosophyPages: MetadataRoute.Sitemap = philosophies.map((p) => ({
    url: `${baseUrl}/philosophies/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // Dynamic tradition pages
  const traditionPages: MetadataRoute.Sitemap = traditions.map((t) => ({
    url: `${baseUrl}/traditions/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // Dynamic text pages
  const textPages: MetadataRoute.Sitemap = texts.map((t) => ({
    url: `${baseUrl}/texts/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // Dynamic greats pages
  const greatPages: MetadataRoute.Sitemap = greats.map((g) => ({
    url: `${baseUrl}/greats/${g.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // Dynamic concepts pages (pSEO)
  const conceptPages: MetadataRoute.Sitemap = concepts.flatMap((c) => [
    {
      url: `${baseUrl}/what-is-${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/${c.slug}-meaning`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ]);

  // Dynamic comparison pages (pSEO)
  const comparisonPages: MetadataRoute.Sitemap = comparisons.map((c) => ({
    url: `${baseUrl}/compare/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [
    ...staticPages,
    ...philosophyPages,
    ...traditionPages,
    ...textPages,
    ...greatPages,
    ...conceptPages,
    ...comparisonPages,
  ];
}
