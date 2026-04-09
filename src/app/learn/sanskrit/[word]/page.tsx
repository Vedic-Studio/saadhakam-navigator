import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanskritVocab, getSanskritWordBySlug } from "@/data/sanskritVocab";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getConceptBySlug } from "@/data/concepts";
import { buildUrl, resolveLexiconCanonicalPath } from "@/lib/seo";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Book, Quote, Compass, Languages, Info, Sparkles } from "lucide-react";

export async function generateStaticParams() {
  return sanskritVocab.map((word) => ({
    word: word.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ word: string }>;
}): Promise<Metadata> {
  const { word: wordSlug } = await params;
  const word = getSanskritWordBySlug(wordSlug);
  const concept = getConceptBySlug(wordSlug);

  if (!word) {
    return { title: "Sanskrit Word Not Found" };
  }

  const canonicalUrl = buildUrl(
    resolveLexiconCanonicalPath(word.slug, Boolean(concept)),
  );

  return {
    title: `${word.wordEnglish} in Sanskrit: Etymology, Meaning & Scriptural Usage | Sadhaka`,
    description: concept
      ? `Explore the Sanskrit lexicon entry for ${word.wordDevanagari} (${word.wordEnglish}) with etymology, transliteration, scriptural usage, and tradition-specific meanings.`
      : `Explore the Sanskrit lexicon entry for ${word.wordDevanagari} (${word.wordEnglish}) with etymology, transliteration, scriptural usage, and tradition-specific meanings in Sanatan Dharma.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${word.wordEnglish} in Sanskrit`,
      description: `Lexicon-style breakdown of ${word.wordEnglish}: etymology, transliteration, usage, and scriptural context.`,
      url: canonicalUrl,
    },
  };
}

export default async function SanskritLexiconPage({
  params,
}: {
  params: Promise<{ word: string }>;
}) {
  const { word: wordSlug } = await params;
  const word = getSanskritWordBySlug(wordSlug);
  const concept = getConceptBySlug(wordSlug);

  if (!word) {
    notFound();
  }

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

  const canonicalUrl = buildUrl(
    resolveLexiconCanonicalPath(word.slug, Boolean(concept)),
  );

  const definedTermSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: word.wordEnglish,
    description: word.summary,
    url: canonicalUrl,
    inDefinedTermSet: "https://www.opensadhaka.com/learn/sanskrit",
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <ContentPageTracker slug={word.slug} pillar="sanskrit-lexicon" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }}
      />
      <Header />

      <main className="flex-grow pt-24 pb-16">
        <div className="container-padding max-w-5xl mx-auto">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Sanskrit Lexicon", href: "/learn/sanskrit" },
              { label: word.wordEnglish, href: `/learn/sanskrit/${word.slug}` },
            ]}
          />

          <header className="mb-20 mt-8 text-center sm:text-left flex flex-col sm:flex-row items-center sm:items-end justify-between gap-8 pb-12 border-b border-border/40">
            <div className="flex-grow">
              <div className="text-secondary font-black uppercase tracking-widest text-xs mb-4">Sanskrit Lexicon</div>
              <h1 className="font-display text-7xl md:text-9xl font-black mb-6 tracking-tighter leading-[0.8] text-primary">
                {word.wordDevanagari}
              </h1>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
                <span className="text-4xl md:text-5xl font-display font-black tracking-tight">{word.wordEnglish}</span>
                <Badge variant="secondary" className="px-4 py-1 h-fit text-lg font-mono tracking-widest uppercase">
                  {word.transliteration}
                </Badge>
              </div>
              <p className="text-muted-foreground mt-6 text-lg max-w-2xl font-medium leading-relaxed">
                The precise linguistic root, etymology, and scriptural context of <span className="text-foreground">{word.wordEnglish}</span>.
              </p>
            </div>
            <div className="flex-shrink-0 bg-muted/30 p-6 rounded-3xl border border-border/40 text-center">
              <div className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">Pronunciation</div>
              <div className="text-2xl font-mono font-bold text-foreground">{word.pronunciation}</div>
            </div>
          </header>

          <div className="grid md:grid-cols-3 gap-12 mb-20">
            <div className="md:col-span-2 space-y-16">
              <section>
                <h2 className="text-3xl font-display font-bold mb-8 flex items-center gap-4">
                  <Info className="text-primary w-8 h-8" />
                  AEO Summary
                </h2>
                <p className="text-2xl font-medium text-muted-foreground leading-snug border-l-4 border-primary/20 pl-8 py-2">
                  {word.summary}
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-display font-bold mb-6">Primary Meanings</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {word.primaryMeanings.map((m, i) => (
                    <li key={i} className="flex gap-4 items-center p-4 bg-muted/30 rounded-2xl border border-border/20">
                      <Sparkles className="w-4 h-4 text-secondary flex-shrink-0" />
                      <span className="font-medium text-foreground/80">{m}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-display font-bold mb-8 flex items-center gap-4">
                  <Book className="text-primary w-8 h-8" />
                  Tradition Context
                </h2>
                <div className="grid gap-6">
                  {word.philosophicalContexts.map((ctx, i) => (
                    <div key={i} className="p-8 rounded-3xl bg-card border border-border/40 hover:border-secondary/30 transition-all group">
                      <div className="text-xs font-black uppercase tracking-widest text-secondary mb-3">{ctx.tradition}</div>
                      <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                        {ctx.meaning}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-display font-bold mb-10 flex items-center gap-4">
                  <Quote className="text-primary w-8 h-8" />
                  Scriptural Usage
                </h2>
                <div className="space-y-12">
                  {word.usageExamples.map((example, i) => (
                    <div key={i} className="relative group">
                      <div className="absolute -left-4 top-0 bottom-0 w-1 bg-primary/20 group-hover:bg-primary transition-colors rounded-full"></div>
                      <div className="pl-8">
                        <div className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">{example.textContext}</div>
                        <blockquote className="mb-6">
                          <p className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4 leading-tight italic">
                            "{example.quoteSanskrit}"
                          </p>
                          <p className="text-xl text-muted-foreground font-medium italic">
                            — {example.quoteTranslation}
                          </p>
                        </blockquote>
                        <div className="p-6 bg-muted/30 rounded-2xl border border-border/20 text-muted-foreground text-sm font-medium leading-relaxed">
                          <strong>Significance:</strong> {example.explanation}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-8">
              <Card className="rounded-3xl border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden sticky top-24">
                <CardContent className="p-10 space-y-10">
                  <div>
                    <h3 className="text-xl font-display font-black mb-6 flex items-center gap-3">
                      <Languages className="w-5 h-5 text-primary" />
                      Etymology
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Dhatu (Root)</div>
                        <div className="text-2xl font-bold text-foreground font-mono">{word.etymology.root}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">Root Meaning</div>
                        <div className="text-lg font-medium text-foreground/80">{word.etymology.rootMeaning}</div>
                      </div>
                    </div>
                    <p className="mt-8 text-sm text-muted-foreground leading-relaxed font-medium border-t border-border/40 pt-6">
                      {word.etymology.formationExplanation}
                    </p>
                  </div>

                  {concept && (
                    <div className="pt-10 border-t border-border/40">
                      <h4 className="text-lg font-bold mb-4">Broader Context</h4>
                      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                        For the philosophical deep-dive, practical application, and related concepts of {word.wordEnglish}.
                      </p>
                      <TrackedLink href={`/what-is-${word.slug}`} eventLabel={`lexicon_to_concept:${word.slug}`} trackPathName={word.slug}>
                        <Button variant="outline" className="w-full h-12 rounded-xl group hover:border-primary transition-all">
                          Read Concept Guide <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </TrackedLink>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="rounded-3xl bg-primary p-12 text-center text-primary-foreground shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
              <Compass size={400} className="rotate-12 -translate-x-32" />
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-black mb-6 relative z-10 italic">Embody the Word.</h2>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 relative z-10 font-medium">
              Take our Faith Finder quiz to discover the specific daily practices (Sadhana) to bring {word.wordEnglish} to life.
            </p>
            <TrackedLink href="/faith-finder" eventLabel="lexicon_footer:cta" trackPathName="faith-finder" className="relative z-10 inline-block px-12 py-6 bg-white text-primary font-black rounded-2xl shadow-xl hover:scale-105 transition-transform active:scale-95">
              Find My Path <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </TrackedLink>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
