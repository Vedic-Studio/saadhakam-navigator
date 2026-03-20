import { NextRequest } from "next/server";
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
import { listArticles } from "@/features/articles";
import { deities } from "@/data/deities";
import { mantras } from "@/data/mantras";
import { loadSahasranama } from "@/lib/stotras";
import { grahas } from "@/data/grahas";
import { rashis } from "@/data/rashis";
import { nakshatras } from "@/data/nakshatras";
import { tithis, varas } from "@/data/panchang";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.opensadhaka.com";

// Article routes already listed in the "core" sitemap — exclude from "articles" sitemap to avoid duplicates
const coreArticleRoutes = new Set([
  "/what-is-vedanta", "/advaita-vedanta-explained", "/bhagavad-gita-complete-guide",
  "/bhagavad-gita-chapter-1", "/yoga-sutras-complete-guide", "/how-to-start-japa",
  "/10-powerful-sanskrit-mantras", "/adi-shankaracharya-life-teachings",
  "/daily-spiritual-routine-beginners", "/how-to-choose-a-mantra",
  "/non-duality-vs-dualism", "/shaivism-vs-vaishnavism", "/ancient-wisdom-philosophies",
  "/sacred-texts-teachings", "/practical-spiritual-practices", "/spiritual-traditions-paths",
  "/hindu-goddess-explained", "/ramayana-explained", "/vedanta-vs-buddhism",
  "/spiritual-paths-explained", "/inquiry-vs-devotion-path", "/which-meditation-for-me",
  "/starting-spiritual-practice", "/best-spiritual-path-for-beginners",
  "/choose-between-bhakti-jnana-karma-raja-yoga", "/best-meditation-style-for-your-personality",
]);

const redirectedComparisonSlugs = new Set([
  "advaita-vs-dvaita",
  "shaivism-vs-vaishnavism",
  "stoicism-vs-vedanta",
  "tantra-vs-vedanta",
  "vedanta-vs-buddhism",
]);

type SitemapEntry = {
  url: string;
  lastModified: Date;
  changeFrequency: string;
  priority: number;
};

function getEntries(id: string): SitemapEntry[] {
  const now = new Date();
  // Fixed date for content that doesn't change between builds — avoids misleading Google with fake freshness
  const contentDate = new Date("2026-03-15");

  switch (id) {
    case "core":
      return [
        { url: baseUrl, lastModified: now, changeFrequency: "daily", priority: 1.0 },
        { url: `${baseUrl}/philosophies`, lastModified: contentDate, changeFrequency: "weekly", priority: 0.9 },
        { url: `${baseUrl}/traditions`, lastModified: contentDate, changeFrequency: "weekly", priority: 0.9 },
        { url: `${baseUrl}/texts`, lastModified: contentDate, changeFrequency: "weekly", priority: 0.9 },
        { url: `${baseUrl}/greats`, lastModified: contentDate, changeFrequency: "weekly", priority: 0.9 },
        { url: `${baseUrl}/faith-finder`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.8 },
        { url: `${baseUrl}/compare`, lastModified: contentDate, changeFrequency: "weekly", priority: 0.9 },
        { url: `${baseUrl}/brand-facts`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/deities`, lastModified: contentDate, changeFrequency: "weekly", priority: 0.9 },
        { url: `${baseUrl}/mantras`, lastModified: contentDate, changeFrequency: "weekly", priority: 0.9 },
        { url: `${baseUrl}/best-spiritual-path-for-beginners`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.8 },
        { url: `${baseUrl}/choose-between-bhakti-jnana-karma-raja-yoga`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.8 },
        { url: `${baseUrl}/best-meditation-style-for-your-personality`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.8 },
        { url: `${baseUrl}/what-is-vedanta`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.8 },
        { url: `${baseUrl}/advaita-vedanta-explained`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.8 },
        { url: `${baseUrl}/bhagavad-gita-complete-guide`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.85 },
        { url: `${baseUrl}/bhagavad-gita-chapter-1`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.8 },
        { url: `${baseUrl}/yoga-sutras-complete-guide`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.8 },
        { url: `${baseUrl}/how-to-start-japa`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.75 },
        { url: `${baseUrl}/10-powerful-sanskrit-mantras`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.75 },
        { url: `${baseUrl}/adi-shankaracharya-life-teachings`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.75 },
        { url: `${baseUrl}/daily-spiritual-routine-beginners`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.75 },
        { url: `${baseUrl}/how-to-choose-a-mantra`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.75 },
        { url: `${baseUrl}/non-duality-vs-dualism`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.75 },
        { url: `${baseUrl}/shaivism-vs-vaishnavism`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.75 },
        { url: `${baseUrl}/ancient-wisdom-philosophies`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.75 },
        { url: `${baseUrl}/sacred-texts-teachings`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.8 },
        { url: `${baseUrl}/practical-spiritual-practices`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.8 },
        { url: `${baseUrl}/spiritual-traditions-paths`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.8 },
        { url: `${baseUrl}/hindu-goddess-explained`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.8 },
        { url: `${baseUrl}/ramayana-explained`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.8 },
        { url: `${baseUrl}/vedanta-vs-buddhism`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.8 },
        { url: `${baseUrl}/spiritual-paths-explained`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.78 },
        { url: `${baseUrl}/inquiry-vs-devotion-path`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.78 },
        { url: `${baseUrl}/which-meditation-for-me`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.78 },
        { url: `${baseUrl}/starting-spiritual-practice`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.78 },
      ];

    case "philosophies":
      return philosophies.map((p) => ({
        url: `${baseUrl}/philosophies/${p.slug}`,
        lastModified: contentDate,
        changeFrequency: "monthly",
        priority: 0.75,
      }));

    case "traditions":
      return traditions.map((t) => ({
        url: `${baseUrl}/traditions/${t.slug}`,
        lastModified: contentDate,
        changeFrequency: "monthly",
        priority: 0.75,
      }));

    case "texts":
      return texts.map((t) => ({
        url: `${baseUrl}/texts/${t.slug}`,
        lastModified: contentDate,
        changeFrequency: "monthly",
        priority: 0.75,
      }));

    case "greats":
      return greats.map((g) => ({
        url: `${baseUrl}/greats/${g.slug}`,
        lastModified: contentDate,
        changeFrequency: "monthly",
        priority: 0.75,
      }));

    case "concepts":
      return concepts.map((c) => ({
        url: `${baseUrl}/what-is-${c.slug}`,
        lastModified: contentDate,
        changeFrequency: "monthly",
        priority: 0.9,
      }));

    case "comparisons":
      return comparisons
        .filter((c) => !redirectedComparisonSlugs.has(c.slug))
        .map((c) => ({
          url: `${baseUrl}/compare/${c.slug}`,
          lastModified: contentDate,
          changeFrequency: "monthly",
          priority: 0.85,
        }));

    case "topics":
      return topics.map((t) => ({
        url: `${baseUrl}/topics/${t.slug}`,
        lastModified: contentDate,
        changeFrequency: "weekly",
        priority: 0.9,
      }));

    case "practices": {
      const entries: SitemapEntry[] = [];
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
        entries.push({
          url: `${baseUrl}/practices/${pair.p}/for/${pair.g}`,
          lastModified: contentDate,
          changeFrequency: "monthly",
          priority: 0.85,
        });
      }
      for (const p of practices) {
        entries.push({
          url: `${baseUrl}/practices/${p.slug}`,
          lastModified: contentDate,
          changeFrequency: "monthly",
          priority: 0.8,
        });
      }
      return entries;
    }

    case "shlokas": {
      const entries: SitemapEntry[] = [];
      for (const ch of bgChapters) {
        entries.push({
          url: `${baseUrl}/texts/bhagavad-gita/chapter-${ch.chapterNumber}`,
          lastModified: contentDate,
          changeFrequency: "monthly",
          priority: 0.8,
        });
      }
      for (const sh of bgShlokas) {
        entries.push({
          url: `${baseUrl}/texts/bhagavad-gita/chapter-${sh.chapter}/shloka-${sh.verse}`,
          lastModified: contentDate,
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
      return entries;
    }

    case "sanskrit":
      return [
        { url: `${baseUrl}/learn/sanskrit`, lastModified: contentDate, changeFrequency: "weekly", priority: 0.8 },
        ...sanskritVocab.map((word) => ({
          url: `${baseUrl}/learn/sanskrit/${word.slug}`,
          lastModified: contentDate,
          changeFrequency: "monthly",
          priority: 0.72,
        })),
      ];

    case "articles":
      return listArticles()
        .filter((a) => !coreArticleRoutes.has(a.route))
        .map((a) => ({
          url: `${baseUrl}${a.route}`,
          lastModified: new Date(a.publishDate),
          changeFrequency: "monthly",
          priority: 0.8,
        }));

    case "stotras":
      return [
        { url: `${baseUrl}/stotras/shiva-tandava-stotram`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.8 },
        ...Array.from({ length: 16 }, (_, i) => ({
          url: `${baseUrl}/stotras/shiva-tandava-stotram/verse-${i + 1}`,
          lastModified: contentDate,
          changeFrequency: "monthly",
          priority: 0.7,
        })),
        { url: `${baseUrl}/stotras/vishnu-sahasranama`, lastModified: contentDate, changeFrequency: "weekly", priority: 0.8 },
        ...loadSahasranama("vishnu-sahasranama").verses.map((v) => ({
          url: `${baseUrl}/stotras/vishnu-sahasranama/${v.slug}`,
          lastModified: contentDate,
          changeFrequency: "monthly",
          priority: 0.7,
        })),
        { url: `${baseUrl}/stotras/lalita-sahasranama`, lastModified: contentDate, changeFrequency: "weekly", priority: 0.8 },
        ...loadSahasranama("lalita-sahasranama").names.map((n) => ({
          url: `${baseUrl}/stotras/lalita-sahasranama/${n.slug}`,
          lastModified: contentDate,
          changeFrequency: "monthly",
          priority: 0.6,
        })),
      ];

    case "deities":
      return [
        { url: `${baseUrl}/deities`, lastModified: contentDate, changeFrequency: "weekly", priority: 0.9 },
        ...deities.map((deity) => ({
          url: `${baseUrl}/deities/${deity.slug}`,
          lastModified: contentDate,
          changeFrequency: "monthly",
          priority: 0.8,
        })),
      ];

    case "mantras":
      return [
        { url: `${baseUrl}/mantras`, lastModified: contentDate, changeFrequency: "weekly", priority: 0.9 },
        ...mantras.map((mantra) => ({
          url: `${baseUrl}/mantras/${mantra.slug}`,
          lastModified: contentDate,
          changeFrequency: "monthly",
          priority: 0.8,
        })),
      ];

    case "jyotish":
      return [
        { url: `${baseUrl}/jyotish`, lastModified: contentDate, changeFrequency: "weekly", priority: 0.9 },
        { url: `${baseUrl}/jyotish/today`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
        { url: `${baseUrl}/jyotish/nakshatras`, lastModified: contentDate, changeFrequency: "weekly", priority: 0.85 },
        ...nakshatras.map((item) => ({
          url: `${baseUrl}/jyotish/nakshatras/${item.slug}`,
          lastModified: contentDate,
          changeFrequency: "monthly",
          priority: 0.75,
        })),
        { url: `${baseUrl}/jyotish/rashis`, lastModified: contentDate, changeFrequency: "weekly", priority: 0.85 },
        ...rashis.map((item) => ({
          url: `${baseUrl}/jyotish/rashis/${item.slug}`,
          lastModified: contentDate,
          changeFrequency: "monthly",
          priority: 0.75,
        })),
        { url: `${baseUrl}/jyotish/grahas`, lastModified: contentDate, changeFrequency: "weekly", priority: 0.85 },
        ...grahas.map((item) => ({
          url: `${baseUrl}/jyotish/grahas/${item.slug}`,
          lastModified: contentDate,
          changeFrequency: "monthly",
          priority: 0.75,
        })),
        { url: `${baseUrl}/jyotish/panchang`, lastModified: contentDate, changeFrequency: "weekly", priority: 0.8 },
        ...varas.map((item) => ({
          url: `${baseUrl}/jyotish/panchang/varas/${item.slug}`,
          lastModified: contentDate,
          changeFrequency: "monthly",
          priority: 0.7,
        })),
        ...tithis.map((item) => ({
          url: `${baseUrl}/jyotish/panchang/tithis/${item.slug}`,
          lastModified: contentDate,
          changeFrequency: "monthly",
          priority: 0.7,
        })),
        { url: `${baseUrl}/stotras/navagraha-stotram`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.75 },
        ...Array.from({ length: 9 }, (_, i) => ({
          url: `${baseUrl}/stotras/navagraha-stotram/verse-${i + 1}`,
          lastModified: contentDate,
          changeFrequency: "monthly",
          priority: 0.65,
        })),
      ];

    default:
      return [];
  }
}

function toXml(entries: SitemapEntry[]): string {
  const urls = entries
    .map(
      (e) =>
        `  <url>\n    <loc>${e.url}</loc>\n    <lastmod>${e.lastModified.toISOString()}</lastmod>\n    <changefreq>${e.changeFrequency}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
}

const validIds = new Set([
  "core", "philosophies", "traditions", "texts", "greats", "concepts",
  "comparisons", "topics", "practices", "shlokas", "sanskrit", "articles",
  "stotras", "deities", "mantras", "jyotish",
]);

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: rawId } = await params;
  // Strip .xml suffix if present (e.g., "philosophies.xml" -> "philosophies")
  const id = rawId.replace(/\.xml$/, "");

  if (!validIds.has(id)) {
    return new Response("Not found", { status: 404 });
  }

  const entries = getEntries(id);
  const xml = toXml(entries);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
