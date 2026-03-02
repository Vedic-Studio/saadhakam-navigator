import { Metadata } from "next";
import { notFound } from "next/navigation";
import { bgShlokas, getBgShlokaById } from "@/data/bgShlokas";
import { getBgChapterByNumber } from "@/data/bgChapters";
import Link from "next/link";

export async function generateStaticParams() {
  return bgShlokas.map((shloka) => ({
    chapter: shloka.chapter.toString(),
    shloka: shloka.verse.toString(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { chapter: string; shloka: string };
}): Promise<Metadata> {
  const shlokaId = `${params.chapter}.${params.shloka}`;
  const shloka = getBgShlokaById(shlokaId);

  if (!shloka) {
    return { title: "Shloka Not Found" };
  }

  return {
    title: `Bhagavad Gita Chapter ${shloka.chapter} Verse ${shloka.verse} | Meaning & Translation`,
    description: `Read the meaning and translation of Bhagavad Gita ${shlokaId}. ${shloka.translation}`,
    alternates: {
      canonical: `https://opensadhaka.com/texts/bhagavad-gita/chapter-${shloka.chapter}/shloka-${shloka.verse}`,
    },
  };
}

export default function BgShlokaPage({
  params,
}: {
  params: { chapter: string; shloka: string };
}) {
  const shlokaId = `${params.chapter}.${params.shloka}`;
  const shloka = getBgShlokaById(shlokaId);

  if (!shloka) {
    notFound();
  }

  const chapterDetails = getBgChapterByNumber(shloka.chapter);

  // Build FAQ Schema based on the shloka data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is the meaning of Bhagavad Gita ${shlokaId}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: shloka.translation,
        },
      },
      {
        "@type": "Question",
        name: `How can I apply Bhagavad Gita ${shlokaId} in daily life?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: shloka.practicalApplication,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Inject FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumbs */}
      <nav className="text-sm mb-8 text-neutral-500">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link
          href="/texts/bhagavad-gita"
          className="hover:text-primary transition-colors"
        >
          Bhagavad Gita
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/texts/bhagavad-gita/chapter-${shloka.chapter}`}
          className="hover:text-primary transition-colors"
        >
          Chapter {shloka.chapter}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-900">Verse {shloka.verse}</span>
      </nav>

      <header className="mb-12 border-b border-neutral-200 pb-12 text-center">
        <div className="text-primary font-bold tracking-[0.2em] mb-4 text-sm uppercase">
          Bhagavad Gita {shlokaId}
        </div>

        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-8">
          Verse {shloka.verse}
        </h1>

        <div className="bg-neutral-50 px-8 py-10 rounded-3xl border border-neutral-200 shadow-sm mx-auto w-full md:w-[85%]">
          <p
            className="text-2xl leading-relaxed text-neutral-800 font-serif whitespace-pre-wrap text-center mx-auto"
            style={{ lineHeight: "1.8" }}
          >
            {shloka.sanskritDevanagari}
          </p>
        </div>
      </header>

      <div className="prose prose-lg prose-neutral max-w-none">
        <div className="grid md:grid-cols-2 gap-12 mt-12">
          {/* Transliteration */}
          <div>
            <h2 className="text-2xl font-bold mb-4 font-sans text-neutral-900 border-l-4 border-primary pl-4 py-1">
              Transliteration
            </h2>
            <p className="whitespace-pre-wrap font-mono text-base text-neutral-600 bg-neutral-50 p-6 rounded-2xl">
              {shloka.transliteration}
            </p>
          </div>

          {/* Word by Word */}
          <div>
            <h2 className="text-2xl font-bold mb-4 font-sans text-neutral-900 border-l-4 border-primary pl-4 py-1">
              Synonyms
            </h2>
            <p className="text-base text-neutral-700 leading-loose">
              {shloka.synonyms}
            </p>
          </div>
        </div>

        <div className="mt-16 bg-white border border-neutral-200 shadow-sm p-8 md:p-12 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-primary/80"></div>
          <h2 className="text-3xl font-bold mb-6 text-neutral-900 mt-0">
            Translation
          </h2>
          <p className="text-2xl font-serif text-neutral-800 leading-relaxed m-0">
            &ldquo;{shloka.translation}&rdquo;
          </p>
        </div>

        <h2 className="text-3xl font-bold mt-16 mb-8 text-neutral-900 text-center">
          Multi-Tradition Commentary
        </h2>
        <div className="space-y-8">
          {shloka.commentaries.map((commentary, i) => (
            <div
              key={i}
              className="bg-neutral-50 p-8 rounded-3xl border border-neutral-100"
            >
              <div className="text-sm font-bold text-primary mb-3 bg-primary/10 inline-block px-3 py-1 rounded">
                {commentary.author}
              </div>
              <p className="m-0 text-neutral-700 text-lg leading-relaxed">
                {commentary.text}
              </p>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold mt-16 mb-6 text-neutral-900">
          Practical Application (Modern Life)
        </h2>
        <div className="bg-amber-50 p-8 rounded-3xl shadow-sm border border-amber-100 mb-16">
          <p className="m-0 text-lg text-amber-900 leading-relaxed font-medium">
            {shloka.practicalApplication}
          </p>
        </div>
      </div>

      {/* Navigation / Next Verse */}
      <div className="border-t border-neutral-200 pt-12 mt-8 flex flex-col md:flex-row justify-between gap-6">
        <div>
          <h3 className="font-bold text-neutral-900">Chapter Content</h3>
          <Link
            href={`/texts/bhagavad-gita/chapter-${shloka.chapter}`}
            className="text-primary hover:underline"
          >
            View all shlokas in Chapter {shloka.chapter}
          </Link>
        </div>
        <div>
          <h3 className="font-bold text-neutral-900">Have a question?</h3>
          <button className="bg-neutral-900 text-white px-6 py-2 rounded-full text-sm font-semibold hover:-translate-y-0.5 transition-transform">
            Ask Sadhaka AI App
          </button>
        </div>
      </div>
    </div>
  );
}
