import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getTextBySlug, texts } from "@/data/texts";
import {
  ArrowRight,
  BookOpen,
  Scroll,
  Library,
  Users,
  Compass,
  Sparkles,
  Map,
} from "lucide-react";

export async function generateStaticParams() {
  return texts.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const text = getTextBySlug(slug);
  if (!text) return {};

  return {
    title: `${text.title} — ${text.sanskritTitle} | Sacred Text Guide`,
    description: text.summary,
    alternates: {
      canonical: `https://www.opensadhaka.com/texts/${slug}`,
    },
    openGraph: {
      title: `${text.title} | Sadhaka`,
      description: text.summary,
      url: `https://www.opensadhaka.com/texts/${slug}`,
    },
  };
}

export default async function TextDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const text = getTextBySlug(slug);
  if (!text) notFound();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <ContentPageTracker slug={text.slug} pillar="texts" />
      <Header />

      <main className="flex-grow pt-24 pb-16">
        <div className="container-padding max-w-5xl mx-auto">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Sacred Texts", href: "/texts" },
              { label: text.title, href: `/texts/${text.slug}` },
            ]}
          />

          <header className="mb-20 mt-8">
            <div className="text-secondary font-black uppercase tracking-widest text-xs mb-4">Textual Authority</div>
            <div className="text-2xl font-display font-medium text-primary mb-2 italic">
              {text.sanskritTitle}
            </div>
            <h1 className="font-display text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
              {text.title}.
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground font-medium mb-10 leading-tight border-l-4 border-primary/30 pl-8 py-2">
              {text.summary}
            </p>
            <div className="flex flex-wrap gap-2">
              {text.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="px-4 py-1 rounded-xl text-foreground/70 uppercase tracking-widest text-[10px] font-black">{tag}</Badge>
              ))}
            </div>
          </header>

          <div className="grid md:grid-cols-3 gap-12 mb-20">
            <div className="md:col-span-2 space-y-16">
              <section>
                <h2 className="text-3xl font-display font-bold mb-8 flex items-center gap-4">
                  <BookOpen className="text-primary w-8 h-8" />
                  Inner Perspective
                </h2>
                <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                  <p className="text-xl font-medium mb-6 text-foreground/80">{text.overview}</p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-display font-bold mb-8 flex items-center gap-4">
                  <Sparkles className="text-secondary w-8 h-8" />
                  Core Themes
                </h2>
                <div className="grid gap-4">
                  {text.themes.map((theme, i) => (
                    <div key={i} className="flex gap-6 items-start p-6 bg-muted/30 rounded-2xl border border-border/20">
                      <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-xs font-bold mt-1">{i + 1}</span>
                      <span className="text-lg text-muted-foreground font-medium leading-relaxed">{theme}</span>
                    </div>
                  ))}
                </div>
              </section>

              {text.keyVerses.length > 0 && (
                <section>
                  <h2 className="text-3xl font-display font-bold mb-10 flex items-center gap-4">
                    <Scroll className="text-primary w-8 h-8" />
                    Pillars of Wisdom
                  </h2>
                  <div className="space-y-12">
                    {text.keyVerses.map((v, i) => (
                      <div key={i} className="relative group p-8 rounded-3xl bg-muted/20 border border-border/20 overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary/30 group-hover:bg-primary transition-colors"></div>
                        <div className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">Aphorism {i + 1}</div>
                        <p className="text-2xl md:text-3xl font-display font-black tracking-tight mb-4 text-primary italic leading-tight">
                          "{v.verse}"
                        </p>
                        <p className="text-lg md:text-xl text-foreground font-medium italic mb-6">
                          "{v.translation}"
                        </p>
                        <div className="text-sm text-muted-foreground font-medium leading-relaxed border-t border-border/40 pt-6">
                          <strong>Context:</strong> {v.context}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <div className="space-y-8">
              <Card className="rounded-3xl border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden sticky top-24">
                <CardContent className="p-10 space-y-10">
                  <div>
                    <h3 className="text-xl font-display font-black mb-6 flex items-center gap-3">
                      <Users className="w-5 h-5 text-secondary" />
                      Seeker Type
                    </h3>
                    <p className="text-muted-foreground leading-relaxed font-medium">
                      {text.whoItSuitsFor}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-display font-black mb-6 flex items-center gap-3 text-primary">
                      <Map className="w-5 h-5 text-primary" />
                      How to Study
                    </h3>
                    <p className="text-muted-foreground leading-relaxed font-medium">
                      {text.howToApproach}
                    </p>
                  </div>

                  {text.relatedTexts.length > 0 && (
                    <div className="pt-10 border-t border-border/40">
                      <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-3">
                        <Library className="w-4 h-4" />
                        Related Wisdom
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {text.relatedTexts.map(rel => (
                          <Badge key={rel} variant="outline" className="px-3 py-1.5 rounded-lg border-border/40 text-foreground/80">{rel}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="rounded-3xl bg-secondary p-12 text-center text-secondary-foreground shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
              <Compass size={400} className="rotate-12 -translate-x-32" />
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-black mb-6 relative z-10 italic">Map Your Journey.</h2>
            <p className="text-xl text-secondary-foreground/80 max-w-2xl mx-auto mb-10 relative z-10 font-medium">
              Discover which sacred texts and practices align with your temperament.
            </p>
            <TrackedLink href="/faith-finder" eventLabel="text_footer:cta" trackPathName="faith-finder" className="relative z-10 inline-block px-12 py-6 bg-white text-secondary font-black rounded-2xl shadow-xl hover:scale-105 transition-transform active:scale-95">
              Find My Path <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </TrackedLink>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
