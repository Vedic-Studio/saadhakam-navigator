// @ts-nocheck

import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BookOpen, ChevronRight, ChevronLeft, ChevronDown, ChevronUp, Music, Star, Info } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { stotras, stotraCategories, getStotraBySlug, getStotrasByCategory } from "@/data/stotras";
import type { Stotra } from "@/data/stotras";
import NotFound from "./NotFound";

export default function StotraDetail() {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const [expandedVerses, setExpandedVerses] = useState<Set<number>>(new Set([0]));
  const [showAllLanguages, setShowAllLanguages] = useState(false);

  const stotra = slug ? getStotraBySlug(slug) : undefined;
  const categoryData = category ? stotraCategories.find(c => c.slug === category) : undefined;

  const stotraList = category ? getStotrasByCategory(category) : [];
  const currentIndex = stotraList.findIndex(s => s.slug === slug);
  const prevStotra = currentIndex > 0 ? stotraList[currentIndex - 1] : null;
  const nextStotra = currentIndex < stotraList.length - 1 ? stotraList[currentIndex + 1] : null;

  useEffect(() => {
    if (stotra) {
      document.title = stotra.seoTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", stotra.seoDescription);
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) metaKeywords.setAttribute("content", stotra.keywords.join(", "));
      window.scrollTo(0, 0);
    }
  }, [stotra]);

  if (!stotra || !categoryData) {
    return <NotFound />;
  }

  const toggleVerse = (index: number) => {
    setExpandedVerses(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedVerses(new Set(stotra.verses.map((_, i) => i)));
  };

  const collapseAll = () => {
    setExpandedVerses(new Set());
  };

  // Structured data (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://opensadhaka.com" },
          { "@type": "ListItem", "position": 2, "name": "Stotras", "item": "https://opensadhaka.com/stotras" },
          { "@type": "ListItem", "position": 3, "name": categoryData.deityEnglish, "item": `https://opensadhaka.com/stotras/${category}` },
          { "@type": "ListItem", "position": 4, "name": stotra.titleEnglish }
        ]
      },
      {
        "@type": "Article",
        "headline": stotra.seoTitle,
        "description": stotra.seoDescription,
        "keywords": stotra.keywords.join(", "),
        "author": { "@type": "Person", "name": stotra.authorEnglish },
        "inLanguage": ["sa", "hi", "en"],
        "about": { "@type": "Thing", "name": stotra.titleEnglish }
      },
      {
        "@type": "HowTo",
        "name": `How to chant ${stotra.titleEnglish}`,
        "description": stotra.howToChant,
        "step": [
          { "@type": "HowToStep", "text": stotra.howToChant }
        ]
      }
    ]
  };

  const colorMap: Record<string, string> = {
    shiva: "blue",
    vishnu: "amber",
    rama: "green",
    krishna: "indigo",
    devi: "rose",
    misc: "orange",
    prakirna: "purple",
    vinaya: "teal",
  };
  const accentColor = colorMap[category || ""] || "amber";

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      {/* Breadcrumb */}
      <nav className="bg-muted/30 border-b border-border/50 py-3">
        <div className="container-padding max-w-5xl mx-auto">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <ChevronRight className="w-3 h-3" />
            <li><Link to="/stotras" className="hover:text-foreground transition-colors">Stotras</Link></li>
            <ChevronRight className="w-3 h-3" />
            <li><Link to={`/stotras/${category}`} className="hover:text-foreground transition-colors">{categoryData.deityEnglish}</Link></li>
            <ChevronRight className="w-3 h-3" />
            <li className="text-foreground font-medium truncate max-w-[200px]">{stotra.titleEnglish}</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className={`py-14 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900`}>
        <div className="container-padding max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-4`}>
                <BookOpen className={`w-3.5 h-3.5 text-${accentColor}-400`} />
                <span className={`text-xs font-medium text-${accentColor}-300 uppercase tracking-widest`}>
                  {categoryData.deityEnglish} Stotra
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 leading-tight" lang="sa">
                {stotra.title}
              </h1>
              <p className="text-xl text-slate-300 mb-4">{stotra.titleEnglish}</p>
              <div className="flex flex-wrap gap-3 text-sm text-slate-400">
                {stotra.authorEnglish && (
                  <span>Composer: <span className="text-slate-200">{stotra.authorEnglish}</span></span>
                )}
                {stotra.source && (
                  <span>Source: <span className="text-slate-200">{stotra.source}</span></span>
                )}
                <span>{stotra.verses.length} verses</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 min-w-[160px]">
              {stotra.tags.map(tag => (
                <span key={tag} className="px-3 py-1 text-xs rounded-full bg-white/10 text-slate-300 border border-white/10 text-center">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-padding max-w-5xl mx-auto py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Main content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Significance */}
            <section className="bg-amber-50 dark:bg-amber-950/20 rounded-xl p-6 border border-amber-200/50">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-5 h-5 text-amber-600" />
                <h2 className="text-lg font-semibold text-foreground">About This Stotra</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">{stotra.significance}</p>
            </section>

            {/* Verses */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">स्तोत्र पाठ | Stotra Text</h2>
                <div className="flex gap-2">
                  <button
                    onClick={expandAll}
                    className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded border border-border hover:border-foreground/30 transition-colors"
                  >
                    Expand all
                  </button>
                  <button
                    onClick={collapseAll}
                    className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded border border-border hover:border-foreground/30 transition-colors"
                  >
                    Collapse
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {stotra.verses.map((verse, idx) => (
                  <div key={idx} className="border border-border rounded-xl overflow-hidden">
                    {/* Sanskrit verse — always visible */}
                    <div className="p-5 bg-slate-50 dark:bg-slate-900/50">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <span className="text-xs font-mono text-muted-foreground mb-2 block">श्लोक {verse.number}</span>
                          <p
                            className="text-xl md:text-2xl leading-loose text-foreground font-medium"
                            lang="sa"
                            style={{ fontFamily: "'Noto Serif Devanagari', 'Mangal', serif" }}
                          >
                            {verse.sanskrit}
                          </p>
                          {verse.transliteration && (
                            <p className="text-sm text-muted-foreground italic mt-2">{verse.transliteration}</p>
                          )}
                        </div>
                        <button
                          onClick={() => toggleVerse(idx)}
                          className="flex-shrink-0 mt-1 p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                          aria-label={expandedVerses.has(idx) ? "Collapse meaning" : "Show meaning"}
                        >
                          {expandedVerses.has(idx) ? (
                            <ChevronUp className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Meanings — collapsible */}
                    {expandedVerses.has(idx) && (
                      <div className="divide-y divide-border">
                        {verse.hindi && (
                          <div className="p-5">
                            <span className="text-xs font-semibold text-rose-600 uppercase tracking-wide block mb-2">
                              हिन्दी अर्थ
                            </span>
                            <p className="text-base text-foreground/90 leading-relaxed" lang="hi">
                              {verse.hindi}
                            </p>
                          </div>
                        )}
                        {verse.english && (
                          <div className="p-5">
                            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide block mb-2">
                              English Meaning
                            </span>
                            <p className="text-base text-muted-foreground leading-relaxed">
                              {verse.english}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Phala-shruti */}
              {stotra.phalashruti && (
                <div className="mt-6 p-6 bg-green-50 dark:bg-green-950/20 rounded-xl border border-green-200/50">
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Star className="w-5 h-5 text-green-600" />
                    फलश्रुति | Phala-shruti (Benefits)
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{stotra.phalashruti}</p>
                </div>
              )}
            </section>

            {/* Benefits */}
            {stotra.benefits.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Benefits of Recitation</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {stotra.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3 p-4 bg-white dark:bg-slate-900 border border-border rounded-lg">
                      <span className={`w-5 h-5 rounded-full bg-${accentColor}-100 text-${accentColor}-600 flex items-center justify-center flex-shrink-0 text-xs font-bold`}>{i + 1}</span>
                      <span className="text-sm text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* How to Chant */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Music className="w-6 h-6 text-amber-600" />
                How to Chant
              </h2>
              <div className="p-6 bg-white dark:bg-slate-900 border border-border rounded-xl">
                <p className="text-muted-foreground leading-relaxed">{stotra.howToChant}</p>
              </div>
            </section>

            {/* Prev / Next Navigation */}
            <div className="flex gap-4 pt-4 border-t border-border">
              {prevStotra ? (
                <Link
                  to={`/stotras/${category}/${prevStotra.slug}`}
                  className="flex-1 flex items-center gap-2 p-4 rounded-xl border border-border hover:border-foreground/30 hover:bg-muted/30 transition-colors group"
                >
                  <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground mb-1">Previous</p>
                    <p className="text-sm font-medium text-foreground truncate">{prevStotra.titleEnglish}</p>
                  </div>
                </Link>
              ) : <div className="flex-1" />}
              {nextStotra && (
                <Link
                  to={`/stotras/${category}/${nextStotra.slug}`}
                  className="flex-1 flex items-center justify-end gap-2 p-4 rounded-xl border border-border hover:border-foreground/30 hover:bg-muted/30 transition-colors group text-right"
                >
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground mb-1">Next</p>
                    <p className="text-sm font-medium text-foreground truncate">{nextStotra.titleEnglish}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
                </Link>
              )}
            </div>
          </div>

          {/* Right sidebar */}
          <aside className="space-y-6">
            {/* Quick Info */}
            <div className="p-5 bg-white dark:bg-slate-900 border border-border rounded-xl">
              <h3 className="font-semibold text-foreground mb-4">Quick Info</h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-muted-foreground text-xs uppercase tracking-wide">Deity</dt>
                  <dd className="text-foreground font-medium">{stotra.deity}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground text-xs uppercase tracking-wide">Composer</dt>
                  <dd className="text-foreground font-medium">{stotra.authorEnglish}</dd>
                </div>
                {stotra.source && (
                  <div>
                    <dt className="text-muted-foreground text-xs uppercase tracking-wide">Source</dt>
                    <dd className="text-foreground font-medium">{stotra.source}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-muted-foreground text-xs uppercase tracking-wide">Verses</dt>
                  <dd className="text-foreground font-medium">{stotra.verses.length}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground text-xs uppercase tracking-wide">Languages</dt>
                  <dd className="text-foreground font-medium">Sanskrit · Hindi · English</dd>
                </div>
              </dl>
            </div>

            {/* More stotras in category */}
            <div className="p-5 bg-white dark:bg-slate-900 border border-border rounded-xl">
              <h3 className="font-semibold text-foreground mb-4">
                More {categoryData.deityEnglish} Stotras
              </h3>
              <ul className="space-y-2">
                {stotraList.slice(0, 8).map(s => (
                  <li key={s.slug}>
                    <Link
                      to={`/stotras/${category}/${s.slug}`}
                      className={`block text-sm py-1.5 px-2 rounded-lg transition-colors ${
                        s.slug === slug
                          ? "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      {s.titleEnglish}
                    </Link>
                  </li>
                ))}
                {stotraList.length > 8 && (
                  <li>
                    <Link
                      to={`/stotras/${category}`}
                      className="text-xs text-amber-600 hover:text-amber-700 font-medium"
                    >
                      View all {stotraList.length} stotras →
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            {/* All categories */}
            <div className="p-5 bg-white dark:bg-slate-900 border border-border rounded-xl">
              <h3 className="font-semibold text-foreground mb-4">Browse by Deity</h3>
              <ul className="space-y-1">
                {stotraCategories.map(cat => (
                  <li key={cat.slug}>
                    <Link
                      to={`/stotras/${cat.slug}`}
                      className={`flex items-center justify-between text-sm py-1.5 px-2 rounded-lg transition-colors ${
                        cat.slug === category
                          ? "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      <span>{cat.deityEnglish}</span>
                      <span className="text-xs opacity-60">{cat.stotras.length}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
