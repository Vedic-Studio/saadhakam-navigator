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
import { dynasties } from "@/data/dynasties";
import { eras } from "@/data/eras";
import { sites } from "@/data/sites";
import { researchers } from "@/data/researchers";
import { evidenceItems } from "@/data/evidence";
import { civilizationComparisons } from "@/data/civilizations";
import { learningPaths } from "@/components/path/paths";

// Hardcoded to www — env var inconsistency caused Google canonical confusion
const baseUrl = "https://www.opensadhaka.com";

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
        { url: `${baseUrl}/about`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.8 },
        { url: `${baseUrl}/privacy`, lastModified: contentDate, changeFrequency: "yearly", priority: 0.3 },
        { url: `${baseUrl}/terms`, lastModified: contentDate, changeFrequency: "yearly", priority: 0.3 },
        { url: `${baseUrl}/deities`, lastModified: contentDate, changeFrequency: "weekly", priority: 0.9 },
        { url: `${baseUrl}/mantras`, lastModified: contentDate, changeFrequency: "weekly", priority: 0.9 },
        { url: `${baseUrl}/stotras`, lastModified: contentDate, changeFrequency: "weekly", priority: 0.9 },
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
        { url: `${baseUrl}/today`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
        { url: `${baseUrl}/path`, lastModified: contentDate, changeFrequency: "weekly", priority: 0.8 },
        ...learningPaths.map((p) => ({
          url: `${baseUrl}/path/${p.id}`,
          lastModified: contentDate,
          changeFrequency: "monthly",
          priority: 0.7,
        })),
        { url: `${baseUrl}/jyotish/nakshatras`, lastModified: contentDate, changeFrequency: "monthly", priority: 0.7 },
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
      // Guard: skip any chapter whose chapterNumber is not a positive integer,
      // so a malformed data row can never emit /chapter-undefined into the sitemap.
      for (const ch of bgChapters.filter((c) => Number.isInteger(c.chapterNumber) && c.chapterNumber > 0)) {
        entries.push({
          url: `${baseUrl}/texts/bhagavad-gita/chapter-${ch.chapterNumber}`,
          lastModified: contentDate,
          changeFrequency: "monthly",
          priority: 0.8,
        });
      }
      // Only include Chapter 1 shlokas (fully seeded with translations + commentaries).
      // Chapters 2-18 stubs are too thin — exclude until content is populated.
      // Guard: require integer chapter (=== 1) AND integer verse so a malformed
      // row can never emit /chapter-undefined or /shloka-undefined.
      for (const sh of bgShlokas.filter((s) => s.chapter === 1 && Number.isInteger(s.verse) && s.verse > 0)) {
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
        { url: `${baseUrl}/stotras`, lastModified: contentDate, changeFrequency: "weekly", priority: 0.85 },
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
        // Lalita Sahasranama: only index page — individual name pages are too thin for Google
        // (name + transliteration + one-line meaning). Pages remain crawlable via internal links.
        { url: `${baseUrl}/stotras/lalita-sahasranama`, lastModified: contentDate, changeFrequency: "weekly", priority: 0.8 },
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
        // /panchang is the canonical daily-Panchang page (PR 34, 1,705 inlinks per
        // Ahrefs 13 Apr 2026). /jyotish/today is a 308 permanent redirect → /panchang
        // and MUST NOT appear in any sitemap (wastes crawl budget — Ahrefs flagged
        // it as "3xx redirect in sitemap"). Keep the canonical destination instead.
        { url: `${baseUrl}/panchang`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
        { url: `${baseUrl}/vedic-clock`, lastModified: now, changeFrequency: "daily", priority: 0.86 },
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

    case "history": {
      const historyDate = new Date("2026-03-28");
      return [
        { url: `${baseUrl}/sanatan-history`, lastModified: historyDate, changeFrequency: "weekly", priority: 0.9 },
        ...dynasties.map((d) => ({
          url: `${baseUrl}/sanatan-history/dynasties/${d.id}`,
          lastModified: historyDate,
          changeFrequency: "monthly",
          priority: 0.75,
        })),
        ...eras.map((e) => ({
          url: `${baseUrl}/sanatan-history/eras/${e.id}`,
          lastModified: historyDate,
          changeFrequency: "monthly",
          priority: 0.75,
        })),
        ...sites.map((s) => ({
          url: `${baseUrl}/sanatan-history/sites/${s.id}`,
          lastModified: historyDate,
          changeFrequency: "monthly",
          priority: 0.75,
        })),
        ...researchers.map((r) => ({
          url: `${baseUrl}/sanatan-history/researchers/${r.id}`,
          lastModified: historyDate,
          changeFrequency: "monthly",
          priority: 0.75,
        })),
        ...evidenceItems.map((e) => ({
          url: `${baseUrl}/sanatan-history/evidence/${e.id}`,
          lastModified: historyDate,
          changeFrequency: "monthly",
          priority: 0.7,
        })),
        ...civilizationComparisons.map((c) => ({
          url: `${baseUrl}/sanatan-history/civilizations/${c.id}`,
          lastModified: historyDate,
          changeFrequency: "monthly",
          priority: 0.75,
        })),
      ];
    }

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
  "stotras", "deities", "mantras", "jyotish", "history",
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
