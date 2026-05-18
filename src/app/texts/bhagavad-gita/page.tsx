import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
import { bgChapters } from "@/data/bgChapters";
import { ArrowRight, BookOpen, Compass } from "lucide-react";
import { buildBreadcrumbSchema } from "@/lib/seo";

const PAGE_URL = "https://www.opensadhaka.com/texts/bhagavad-gita";

export const metadata: Metadata = {
  title: "Bhagavad Gita: All 18 Chapters with Summaries | Sadhaka",
  description:
    "The complete Bhagavad Gita chapter-by-chapter guide. All 18 chapters with Sanskrit names, themes, yoga paths, and verse counts -- linked to detailed chapter pages.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Bhagavad Gita: All 18 Chapters with Summaries | Sadhaka",
    description:
      "Browse all 18 chapters of the Bhagavad Gita with Sanskrit titles, themes, and direct links to chapter summaries and verses.",
    url: PAGE_URL,
    type: "website",
  },
};

const aeoAnswer =
  "The Bhagavad Gita is a 700-verse Sanskrit scripture organised into 18 chapters, set as a dialogue between Krishna and Arjuna on the battlefield of Kurukshetra. The 18 chapters move from Arjuna's collapse (Chapter 1) through the three classical yogic paths -- Karma Yoga (action), Jnana Yoga (knowledge), and Bhakti Yoga (devotion) -- culminating in Krishna's final teaching of surrender (Chapter 18). Each chapter is called a 'yoga' because it offers a complete spiritual discipline. This hub lists every chapter with its Sanskrit name, theme, and yoga-path alignment, linked to the full chapter page.";

export default function BhagavadGitaHubPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { label: "Home", href: "/" },
    { label: "Sacred Texts", href: "/texts" },
    { label: "Bhagavad Gita", href: "/texts/bhagavad-gita" },
  ]);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Bhagavad Gita: All 18 Chapters",
    description:
      "Chapter-by-chapter guide to the Bhagavad Gita with Sanskrit names, themes, and verse counts.",
    url: PAGE_URL,
    hasPart: bgChapters.map((ch) => ({
      "@type": "CreativeWork",
      position: ch.chapterNumber,
      name: `Chapter ${ch.chapterNumber}: ${ch.nameEnglish}`,
      url: `${PAGE_URL}/chapter-${ch.chapterNumber}`,
      description: ch.oneSentenceTheme,
    })),
  };

  const faqs = [
    {
      question: "How many chapters are in the Bhagavad Gita?",
      answer:
        "The Bhagavad Gita has 18 chapters and 700 verses (shlokas). Each chapter is called a 'yoga' -- a complete spiritual discipline. The chapters are traditionally grouped into three sections of six: Karma Yoga (action, chapters 1-6), Bhakti Yoga (devotion, chapters 7-12), and Jnana Yoga (knowledge, chapters 13-18).",
    },
    {
      question: "Which chapter of the Bhagavad Gita should I read first?",
      answer:
        "Chapter 2 (Sankhya Yoga) is the most common starting point for serious study because it summarises the entire teaching: the eternal nature of the Atman, the logic of action without attachment, and the description of the steady-minded sage (sthitaprajna). Read Chapter 1 first only for narrative context; the teaching itself begins in Chapter 2.",
    },
    {
      question: "What are the three yogas in the Bhagavad Gita?",
      answer:
        "Karma Yoga (the path of selfless action), Bhakti Yoga (the path of loving devotion), and Jnana Yoga (the path of knowledge and self-inquiry). The Gita treats them as complementary rather than competing -- different temperaments are suited to different starting points, but a complete sadhana includes all three.",
    },
    {
      question: "Is the Bhagavad Gita part of the Mahabharata?",
      answer:
        "Yes. The Bhagavad Gita appears in the Bhishma Parva (Book 6) of the Mahabharata, chapters 25 to 42 of that book. It is spoken just before the Kurukshetra war begins, when Arjuna asks Krishna to drive his chariot between the two armies so he can see whom he must fight.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-orange-500/30 selection:text-orange-100 flex flex-col">
      <ContentPageTracker slug="texts-bhagavad-gita" pillar="scripture-hub" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />

      <main className="flex-grow pt-32 pb-16">
        <div className="container-padding max-w-5xl mx-auto">
          <nav className="text-sm mb-8 text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/texts" className="hover:text-primary transition-colors">
              Sacred Texts
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Bhagavad Gita</span>
          </nav>

          <header className="mb-12 text-center">
            <div className="text-primary font-black uppercase tracking-widest text-xs mb-4">
              Scripture Hub
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Bhagavad <span className="text-orange-500">Gita</span>
            </h1>
            <p className="text-2xl font-sanskrit text-muted-foreground mb-6">
              भगवद्गीता
            </p>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              All 18 chapters of the Song of the Divine, with Sanskrit names,
              themes, and yoga-path alignments. Each chapter links to its full
              guide and verses.
            </p>
          </header>

          <section
            id="aeo-block"
            data-speakable
            className="max-w-3xl mx-auto bg-orange-950/20 border border-orange-900/30 rounded-2xl p-6 mb-16"
          >
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Direct answer:</strong>{" "}
              {aeoAnswer}
            </p>
          </section>

          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-orange-500" />
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                The 18 Chapters
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mb-10">
              Each chapter is a complete &ldquo;yoga&rdquo; -- a spiritual
              discipline that can be entered on its own terms.
            </p>

            <ol className="grid md:grid-cols-2 gap-4 list-none">
              {bgChapters.map((ch) => (
                <li key={ch.chapterNumber}>
                  <TrackedLink
                    href={`/texts/bhagavad-gita/chapter-${ch.chapterNumber}`}
                    eventLabel={`bg_hub:chapter:${ch.chapterNumber}`}
                    trackPathName={`bg-chapter-${ch.chapterNumber}`}
                    className="group block h-full p-6 rounded-2xl border border-border/50 bg-card hover:border-orange-500/40 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-12 h-12 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold text-lg group-hover:bg-orange-500 group-hover:text-white transition-colors">
                        {ch.chapterNumber}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-muted-foreground font-sanskrit mb-1">
                          {ch.nameSanskrit}
                        </div>
                        <h3 className="font-display text-lg font-bold mb-2 group-hover:text-orange-400 transition-colors">
                          {ch.nameEnglish}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                          {ch.oneSentenceTheme}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted/50 rounded-full">
                            {ch.yogaPath}
                          </span>
                          <span>{ch.totalVerses} verses</span>
                        </div>
                      </div>
                    </div>
                  </TrackedLink>
                </li>
              ))}
            </ol>
          </section>

          <section className="mb-16">
            <div className="bg-gradient-to-br from-orange-950/20 to-background border border-orange-900/30 rounded-3xl p-10 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <Compass className="w-6 h-6 text-orange-500" />
                <h2 className="font-display text-3xl md:text-4xl font-bold">
                  Further reading
                </h2>
              </div>
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
                If you want orientation before diving into the chapters, the
                guides below give the big picture, the historical context, and
                how the Gita maps onto contemporary life.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <TrackedLink
                  href="/bhagavad-gita-complete-guide"
                  eventLabel="bg_hub:related:complete-guide"
                  trackPathName="bg-complete-guide"
                  className="rounded-2xl border border-white/10 p-5 hover:border-orange-500/40 transition-colors block"
                >
                  Bhagavad Gita Complete Guide
                </TrackedLink>
                <TrackedLink
                  href="/vedas-upanishads-bhagavad-gita-guide"
                  eventLabel="bg_hub:related:scripture-hub"
                  trackPathName="vedas-upanishads-gita"
                  className="rounded-2xl border border-white/10 p-5 hover:border-orange-500/40 transition-colors block"
                >
                  Vedas, Upanishads & Bhagavad Gita
                </TrackedLink>
                <TrackedLink
                  href="/best-bhagavad-gita-translation-for-beginners"
                  eventLabel="bg_hub:related:translations"
                  trackPathName="bg-translations"
                  className="rounded-2xl border border-white/10 p-5 hover:border-orange-500/40 transition-colors block"
                >
                  Best Bhagavad Gita Translation for Beginners
                </TrackedLink>
                <TrackedLink
                  href="/bhagavad-gita-vs-bible"
                  eventLabel="bg_hub:related:vs-bible"
                  trackPathName="bg-vs-bible"
                  className="rounded-2xl border border-white/10 p-5 hover:border-orange-500/40 transition-colors block"
                >
                  Bhagavad Gita vs Bible
                </TrackedLink>
              </div>
            </div>
          </section>

          <section className="pt-16 border-t border-border">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Common questions about reading the Gita chapter by chapter.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-border/60 bg-card p-6"
                >
                  <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
