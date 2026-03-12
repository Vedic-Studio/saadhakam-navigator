import { Metadata } from "next";
import { notFound } from "next/navigation";
import { bgChapters, getBgChapterByNumber } from "@/data/bgChapters";
import { getBgShlokasByChapter } from "@/data/bgShlokas";
import Link from "next/link";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";

export async function generateStaticParams() {
  return bgChapters.map((ch) => ({
    chapter: ch.chapterNumber.toString(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chapter: string }>;
}): Promise<Metadata> {
  const { chapter: chapterParam } = await params;
  const chapterNum = parseInt(chapterParam, 10);
  const chapter = getBgChapterByNumber(chapterNum);

  if (!chapter) {
    return { title: "Chapter Not Found" };
  }

  return {
    title: `Bhagavad Gita Chapter ${chapter.chapterNumber}: ${chapter.nameEnglish} | Summary & Verses`,
    description: `Read the complete summary, key themes, and all ${chapter.totalVerses} verses of Bhagavad Gita Chapter ${chapter.chapterNumber} (${chapter.nameSanskrit}).`,
    alternates: {
      canonical: `https://opensadhaka.com/texts/bhagavad-gita/chapter-${chapter.chapterNumber}`,
    },
  };
}

export default async function BgChapterPage({
  params,
}: {
  params: Promise<{ chapter: string }>;
}) {
  const { chapter: chapterParam } = await params;
  const chapterNum = parseInt(chapterParam, 10);
  const chapter = getBgChapterByNumber(chapterNum);

  if (!chapter) {
    notFound();
  }

  // Get shlokas loaded for this chapter
  const shlokas = getBgShlokasByChapter(chapterNum);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is Bhagavad Gita Chapter ${chapter.chapterNumber} about?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: chapter.summary,
        },
      },
      {
        "@type": "Question",
        name: `What are the key themes in Bhagavad Gita Chapter ${chapter.chapterNumber}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: chapter.keyThemes.join(", "),
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://opensadhaka.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Bhagavad Gita Guide",
        item: "https://opensadhaka.com/texts/bhagavad-gita",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Chapter ${chapter.chapterNumber}`,
        item: `https://opensadhaka.com/texts/bhagavad-gita/chapter-${chapter.chapterNumber}`,
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <ContentPageTracker slug={`bhagavad-gita-chapter-${chapter.chapterNumber}`} pillar="scripture" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Breadcrumbs Placeholder */}
      <nav className="text-sm mb-8 text-neutral-500">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link
          href="/texts/bhagavad-gita"
          className="hover:text-primary transition-colors"
        >
          Bhagavad Gita Guide
        </Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-900">
          Chapter {chapter.chapterNumber}
        </span>
      </nav>

      <header className="mb-12 border-b border-neutral-200 pb-12">
        <div className="flex items-center gap-4 mb-4 text-primary font-semibold tracking-wider uppercase text-sm">
          <span>Bhagavad Gita</span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
          <span>Chapter {chapter.chapterNumber}</span>
        </div>

        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          {chapter.nameEnglish}
        </h1>
        <div className="text-2xl font-serif text-neutral-500 mb-8">
          {chapter.nameSanskrit}
        </div>

        <div className="prose prose-lg prose-neutral max-w-none">
          <p className="text-xl leading-relaxed text-neutral-700 bg-neutral-50 p-8 rounded-3xl border border-neutral-100">
            <strong>Direct answer:</strong> Bhagavad Gita Chapter {chapter.chapterNumber} ({chapter.nameEnglish}) focuses on {chapter.keyThemes.slice(0, 2).join(" and ")}, and teaches {chapter.summary.toLowerCase()}
          </p>
          <p className="text-xl leading-relaxed text-neutral-700 bg-neutral-50 p-8 rounded-3xl border border-neutral-100 mt-4">
            <strong>Overview:</strong> {chapter.summary}
          </p>
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            Key Themes
          </h3>
          <ul className="space-y-2">
            {chapter.keyThemes.map((theme, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="text-neutral-700">{theme}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-neutral-900 text-white rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-4 opacity-90">
            Yoga Path Alignment
          </h3>
          <p className="text-lg opacity-80">{chapter.yogaPath}</p>
          <hr className="border-neutral-700 my-4" />
          <p className="text-sm opacity-60">
            Total Verses: {chapter.totalVerses}
          </p>
        </div>
      </div>

      {/* Verses List */}
      <section>
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          Shlokas in Chapter {chapter.chapterNumber}
          <span className="text-sm font-normal bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full">
            Showing {shlokas.length} sampled verses
          </span>
        </h2>

        <div className="grid gap-4">
          {shlokas.map((shloka) => (
            <TrackedLink
              key={shloka.id}
              href={`/texts/bhagavad-gita/chapter-${chapter.chapterNumber}/shloka-${shloka.verse}`}
              eventLabel={`bg_chapter:${chapter.chapterNumber}:shloka:${shloka.verse}`}
              trackPathName={`chapter-${chapter.chapterNumber}`}
              className="group block bg-white border border-neutral-200 rounded-2xl p-6 hover:shadow-md hover:border-primary transition-all"
            >
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="shrink-0 bg-neutral-100 text-neutral-500 font-mono text-lg rounded-xl w-14 h-14 flex items-center justify-center font-bold group-hover:bg-primary group-hover:text-white transition-colors">
                  {shloka.id}
                </div>
                <div>
                  <p className="font-serif text-xl mb-3 text-neutral-800 line-clamp-1">
                    {shloka.sanskritDevanagari.split("\n")[0]}...
                  </p>
                  <p className="text-neutral-600 line-clamp-2">
                    {shloka.translation}
                  </p>
                </div>
              </div>
            </TrackedLink>
          ))}

          {shlokas.length === 0 && (
            <div className="p-8 text-center text-neutral-500 bg-neutral-50 rounded-2xl border border-neutral-200 border-dashed">
              No shlokas directly imported for this chapter yet. Run the seeding
              script to populate.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
