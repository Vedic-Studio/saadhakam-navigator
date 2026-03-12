import { MetadataRoute } from "next";
import { philosophies } from "@/data/philosophies";
import { traditions } from "@/data/traditions";
import { texts } from "@/data/texts";
import { greats } from "@/data/greats";
import { practices } from "@/data/practices";
import { concepts } from "@/data/concepts";
import { comparisons } from "@/data/comparisons";
import { topics } from "@/data/topics";
import { bgChapters } from "@/data/bgChapters";
import { bgShlokas } from "@/data/bgShlokas";
import { sanskritVocab } from "@/data/sanskritVocab";
import { articles } from "@/data/articles";
import { deities } from "@/data/deities";
import { mantras } from "@/data/mantras";
import { loadSahasranama } from "@/lib/stotras";

const baseUrl = "https://opensadhaka.com";

// Tell Next.js to generate multiple split sitemaps + an index
export async function generateSitemaps() {
  return [
    { id: "core" },
    { id: "philosophies" },
    { id: "traditions" },
    { id: "texts" },
    { id: "greats" },
    { id: "concepts" },
    { id: "comparisons" },
    { id: "topics" },
    { id: "practices" },
    { id: "shlokas" },
    { id: "sanskrit" },
    { id: "articles" },
    { id: "stotras" },
    { id: "deities" },
    { id: "mantras" },
  ];
}

export default function sitemap({ id }: { id: string }): MetadataRoute.Sitemap {
  const now = new Date();

  switch (id) {
    case "core":
      return [
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
        {
          url: `${baseUrl}/compare`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.9,
        },
        {
          url: `${baseUrl}/brand-facts`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.7,
        },
        {
          url: `${baseUrl}/deities`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.9,
        },
        {
          url: `${baseUrl}/mantras`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.9,
        },
        {
          url: `${baseUrl}/best-spiritual-path-for-beginners`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.8,
        },
        {
          url: `${baseUrl}/choose-between-bhakti-jnana-karma-raja-yoga`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.8,
        },
        {
          url: `${baseUrl}/best-meditation-style-for-your-personality`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.8,
        },
        // Static articles
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
          url: `${baseUrl}/non-duality-vs-dualism`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.75,
        },
        {
          url: `${baseUrl}/shaivism-vs-vaishnavism`,
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
        {
          url: `${baseUrl}/hindu-goddess-explained`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.8,
        },
        {
          url: `${baseUrl}/ramayana-explained`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.8,
        },
        {
          url: `${baseUrl}/vedanta-vs-buddhism`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.8,
        },
        {
          url: `${baseUrl}/spiritual-paths-explained`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.78,
        },
        {
          url: `${baseUrl}/inquiry-vs-devotion-path`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.78,
        },
        {
          url: `${baseUrl}/which-meditation-for-me`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.78,
        },
        {
          url: `${baseUrl}/starting-spiritual-practice`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.78,
        },
      ];

    case "philosophies":
      return [
        ...philosophies.map((p) => ({
          url: `${baseUrl}/philosophies/${p.slug}`,
          lastModified: now,
          changeFrequency: "monthly" as const,
          priority: 0.75,
        })),
        {
          url: `${baseUrl}/philosophies/advaita-vedanta`,
          lastModified: now,
          changeFrequency: "monthly" as const,
          priority: 0.72,
        },
      ];

    case "traditions":
      return traditions.map((t) => ({
        url: `${baseUrl}/traditions/${t.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.75,
      }));

    case "texts":
      return texts.map((t) => ({
        url: `${baseUrl}/texts/${t.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.75,
      }));

    case "greats":
      return greats.map((g) => ({
        url: `${baseUrl}/greats/${g.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.75,
      }));

    case "concepts":
      return concepts.map((c) => ({
        url: `${baseUrl}/what-is-${c.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.9,
      }));

    case "comparisons":
      return comparisons.map((c) => ({
        url: `${baseUrl}/compare/${c.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.85,
      }));

    case "topics":
      return topics.map((t) => ({
        url: `${baseUrl}/topics/${t.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.9,
      }));

    case "practices":
      const combinatorialPages: MetadataRoute.Sitemap = [];
      const validPairs = [
        { p: "japa", g: "anxiety" },
        { p: "japa", g: "focus" },
        { p: "japa", g: "devotion" },
        { p: "japa", g: "sleep" },
        { p: "yoga-sadhana", g: "focus" },
        { p: "dhyana", g: "spiritual-growth" },
        { p: "dhyana", g: "focus" },
        { p: "kirtan", g: "devotion" },
        { p: "puja", g: "devotion" },
        { p: "svadhyaya", g: "spiritual-growth" },
        { p: "seva", g: "spiritual-growth" },
      ];
      for (const pair of validPairs) {
        combinatorialPages.push({
          url: `${baseUrl}/practices/${pair.p}/for/${pair.g}`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.85,
        });
      }
      for (const p of practices) {
        combinatorialPages.push({
          url: `${baseUrl}/practices/${p.slug}`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.8,
        });
      }
      return combinatorialPages;

    case "shlokas":
      const shlokaPages: MetadataRoute.Sitemap = [];
      // 1. the chapter pages
      for (const ch of bgChapters) {
        shlokaPages.push({
          url: `${baseUrl}/texts/bhagavad-gita/chapter-${ch.chapterNumber}`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.8,
        });
      }
      // 2. the shloka pages
      for (const sh of bgShlokas) {
        shlokaPages.push({
          url: `${baseUrl}/texts/bhagavad-gita/chapter-${sh.chapter}/shloka-${sh.verse}`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
      return shlokaPages;

    case "sanskrit":
      return sanskritVocab.map((word) => ({
        url: `${baseUrl}/learn/sanskrit/${word.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.72,
      }));

    case "articles":
      return articles.map((a) => ({
        url: `${baseUrl}${a.route}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
      }));

    case "stotras":
      return [
        {
          url: `${baseUrl}/stotras/shiva-tandava-stotram`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.8,
        },
        ...Array.from({ length: 16 }, (_, i) => ({
          url: `${baseUrl}/stotras/shiva-tandava-stotram/verse-${i + 1}`,
          lastModified: now,
          changeFrequency: "monthly" as const,
          priority: 0.7,
        })),
        {
          url: `${baseUrl}/stotras/vishnu-sahasranama`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.8,
        },
        ...loadSahasranama("vishnu-sahasranama").names.map((n) => ({
          url: `${baseUrl}/stotras/vishnu-sahasranama/${n.slug}`,
          lastModified: now,
          changeFrequency: "monthly" as const,
          priority: 0.6,
        })),
        {
          url: `${baseUrl}/stotras/lalita-sahasranama`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.8,
        },
        ...loadSahasranama("lalita-sahasranama").names.map((n) => ({
          url: `${baseUrl}/stotras/lalita-sahasranama/${n.slug}`,
          lastModified: now,
          changeFrequency: "monthly" as const,
          priority: 0.6,
        })),
      ];

    case "deities":
      return [
        {
          url: `${baseUrl}/deities`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.9,
        },
        ...deities.map((deity) => ({
          url: `${baseUrl}/deities/${deity.slug}`,
          lastModified: now,
          changeFrequency: "monthly" as const,
          priority: 0.8,
        })),
      ];

    case "mantras":
      return [
        {
          url: `${baseUrl}/mantras`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.9,
        },
        ...mantras.map((mantra) => ({
          url: `${baseUrl}/mantras/${mantra.slug}`,
          lastModified: now,
          changeFrequency: "monthly" as const,
          priority: 0.8,
        })),
      ];

    default:
      return [];
  }
}
