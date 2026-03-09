import { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanskritVocab, getSanskritWordBySlug } from "@/data/sanskritVocab";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getConceptBySlug } from "@/data/concepts";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";

export async function generateStaticParams() {
  return sanskritVocab.map((word) => ({
    word: word.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { word: string };
}): Promise<Metadata> {
  const word = getSanskritWordBySlug(params.word);
  const concept = getConceptBySlug(params.word);

  if (!word) {
    return { title: "Sanskrit Word Not Found" };
  }

  return {
    title: `${word.wordEnglish} in Sanskrit: Etymology, Meaning & Scriptural Usage | Sadhaka`,
    description: concept
      ? `Explore the Sanskrit lexicon entry for ${word.wordDevanagari} (${word.wordEnglish}) with etymology, transliteration, scriptural usage, and tradition-specific meanings. For the broader philosophical explainer, see the concept guide as well.`
      : `Explore the Sanskrit lexicon entry for ${word.wordDevanagari} (${word.wordEnglish}) with etymology, transliteration, scriptural usage, and tradition-specific meanings in Sanatan Dharma.`,
    keywords: [
      `${word.wordEnglish.toLowerCase()} in sanskrit`,
      `${word.wordEnglish.toLowerCase()} etymology`,
      `${word.wordEnglish.toLowerCase()} meaning`,
      word.transliteration.toLowerCase(),
      "sanskrit lexicon",
    ],
    alternates: {
      canonical: `https://opensadhaka.com/learn/sanskrit/${word.slug}`,
    },
    openGraph: {
      title: `${word.wordEnglish} in Sanskrit`,
      description: `Lexicon-style breakdown of ${word.wordEnglish}: etymology, transliteration, usage, and scriptural context.`,
      url: `https://opensadhaka.com/learn/sanskrit/${word.slug}`,
    },
  };
}

export default function SanskritLexiconPage({
  params,
}: {
  params: { word: string };
}) {
  const word = getSanskritWordBySlug(params.word);
  const concept = getConceptBySlug(params.word);

  if (!word) {
    notFound();
  }

  // Build FAQ Schema based on the word data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: word.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const definedTermSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: word.wordEnglish,
    description: word.summary,
    url: `https://opensadhaka.com/learn/sanskrit/${word.slug}`,
    inDefinedTermSet: "https://opensadhaka.com/learn/sanskrit",
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <ContentPageTracker slug={word.slug} pillar="sanskrit-lexicon" />
      {/* Inject FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Sanskrit Lexicon", href: "/learn/sanskrit" },
          { label: word.wordEnglish, href: `/learn/sanskrit/${word.slug}` },
        ]}
      />

      <header className="mb-12 text-center pb-12 border-b border-neutral-200">
        {/* Pronunciation Block */}
        <h1
          className="text-6xl md:text-8xl font-serif text-primary mb-4"
          style={{ lineHeight: "1.2" }}
        >
          {word.wordDevanagari}
        </h1>
        <div className="text-3xl font-bold tracking-tight mb-2">
          {word.wordEnglish}
        </div>
        <div className="text-lg text-neutral-500 font-mono tracking-widest uppercase flex items-center justify-center gap-3">
          <span>{word.transliteration}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-300"></span>
          <span>{word.pronunciation}</span>
        </div>
        <p className="text-neutral-600 max-w-2xl mx-auto mt-6 text-base leading-relaxed">
          This page is the lexicon view: it focuses on Sanskrit roots, transliteration, scriptural quotations, and how the term is used across traditions.
        </p>
      </header>

      {concept && (
        <section className="mb-12 rounded-3xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                Need the broader philosophical explainer?
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                Read the concept guide for {word.wordEnglish} if you want the fuller Vedic context, practical application, and related philosophy links.
              </p>
            </div>
            <TrackedLink
              href={`/what-is-${word.slug}`}
              eventLabel={`lexicon_to_concept:${word.slug}`}
              trackPathName={word.slug}
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-neutral-900 px-6 py-3 font-semibold text-white hover:bg-neutral-800 transition-colors"
            >
              Read concept guide
            </TrackedLink>
          </div>
        </section>
      )}

      <div className="prose prose-lg prose-neutral max-w-none">
        {/* Etymology & Root */}
        <div className="bg-primary/5 p-8 border border-primary/20 rounded-3xl mb-12">
          <h2 className="text-2xl font-bold mt-0 mb-4 flex items-center gap-2">
            Etymology & Root{" "}
            <span className="font-normal text-lg tracking-widest bg-dark text-white rounded px-2 ml-2">
              Dhatu
            </span>
          </h2>
          <ul className="mb-4">
            <li>
              <strong>Root:</strong> {word.etymology.root}
            </li>
            <li>
              <strong>Literal Root Meaning:</strong>{" "}
              {word.etymology.rootMeaning}
            </li>
          </ul>
          <p className="m-0 text-neutral-700 leading-relaxed">
            {word.etymology.formationExplanation}
          </p>
        </div>

        {/* Primary Meanings */}
        <h2 className="text-3xl font-bold mb-6 text-neutral-900">
          What does {word.wordEnglish} mean?
        </h2>
        <div className="text-xl text-neutral-800 leading-relaxed mb-8">
          {word.summary}
        </div>
        <ul className="space-y-3 list-disc list-inside marker:text-primary pl-4 mb-16 text-lg">
          {word.primaryMeanings.map((meaning, i) => (
            <li key={i} className="text-neutral-700">
              {meaning}
            </li>
          ))}
        </ul>

        {/* Philosophical Contexts */}
        <h2 className="text-3xl font-bold mb-8 text-neutral-900">
          Usage Across Traditions
        </h2>
        <div className="grid gap-6 mb-16">
          {word.philosophicalContexts.map((ctx, i) => (
            <div
              key={i}
              className="bg-neutral-50 p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-sm transition-all hover:border-primary"
            >
              <h3 className="text-xl font-bold mb-3 mt-0 text-primary">
                In {ctx.tradition}
              </h3>
              <p className="text-neutral-700 leading-relaxed m-0 text-lg">
                {ctx.meaning}
              </p>
            </div>
          ))}
        </div>

        {/* Usage Examples / Quotes */}
        <h2 className="text-3xl font-bold mb-8 text-neutral-900">
          Scriptural Usage
        </h2>
        <div className="space-y-12 mb-16">
          {word.usageExamples.map((example, i) => (
            <div
              key={i}
              className="relative pl-6 sm:pl-8 border-l-4 border-primary"
            >
              <div className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-2">
                {example.textContext}
              </div>
              <blockquote className="m-0 bg-transparent p-0">
                <p
                  className="text-2xl font-serif text-neutral-900 m-0 pb-3"
                  style={{ lineHeight: "1.6" }}
                >
                  "{example.quoteSanskrit}"
                </p>
                <p className="text-lg italic text-neutral-600 mb-4 mt-0">
                  "{example.quoteTranslation}"
                </p>
              </blockquote>
              <p className="text-neutral-700 m-0 bg-neutral-100 p-4 rounded-xl text-base">
                <strong>Context:</strong> {example.explanation}
              </p>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <h2 className="text-3xl font-bold mb-8 text-neutral-900">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6 mb-16">
          {word.faqs.map((faq, i) => (
            <div key={i}>
              <h3 className="text-xl font-semibold mb-2 mt-0 text-neutral-800">
                Q: {faq.question}
              </h3>
              <p className="text-neutral-600 m-0 pl-1 leading-relaxed">
                {faq.answer}
              </p>
              <hr className="mt-6 border-neutral-200" />
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section className="mt-8 bg-neutral-900 p-10 rounded-3xl text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Want to embody your {word.wordEnglish}?
        </h2>
        <p className="text-neutral-300 max-w-2xl mx-auto mb-8 text-lg">
          Words on a screen are just information. Take our{" "}
          <strong>Faith Finder</strong> quiz to discover the specific daily
          practices (Sadhana) to bring these concepts to life.
        </p>
        <TrackedLink
          href="/faith-finder"
          eventLabel={`lexicon_cta:${word.slug}:faith-finder`}
          trackPathName={word.slug}
          className="inline-block bg-white text-neutral-900 font-bold px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-transform hover:shadow-xl"
        >
          Discover Your Practice
        </TrackedLink>
      </section>
    </div>
  );
}
