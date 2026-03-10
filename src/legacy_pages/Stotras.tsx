// @ts-nocheck

import { Link } from "react-router-dom";
import { useEffect } from "react";
import { BookOpen, ChevronRight, Search, Star } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { stotraCategories, stotras } from "@/data/stotras";

const categoryColors: Record<string, { gradient: string; icon: string; border: string }> = {
  shiva:    { gradient: "from-blue-50 to-slate-50 dark:from-blue-950/20 dark:to-slate-900", icon: "text-blue-600 dark:text-blue-400", border: "border-blue-200/60 dark:border-blue-800/40" },
  vishnu:   { gradient: "from-amber-50 to-slate-50 dark:from-amber-950/20 dark:to-slate-900", icon: "text-amber-600 dark:text-amber-400", border: "border-amber-200/60 dark:border-amber-800/40" },
  rama:     { gradient: "from-green-50 to-slate-50 dark:from-green-950/20 dark:to-slate-900", icon: "text-green-600 dark:text-green-400", border: "border-green-200/60 dark:border-green-800/40" },
  krishna:  { gradient: "from-indigo-50 to-slate-50 dark:from-indigo-950/20 dark:to-slate-900", icon: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-200/60 dark:border-indigo-800/40" },
  devi:     { gradient: "from-rose-50 to-slate-50 dark:from-rose-950/20 dark:to-slate-900", icon: "text-rose-600 dark:text-rose-400", border: "border-rose-200/60 dark:border-rose-800/40" },
  misc:     { gradient: "from-orange-50 to-slate-50 dark:from-orange-950/20 dark:to-slate-900", icon: "text-orange-600 dark:text-orange-400", border: "border-orange-200/60 dark:border-orange-800/40" },
  prakirna: { gradient: "from-purple-50 to-slate-50 dark:from-purple-950/20 dark:to-slate-900", icon: "text-purple-600 dark:text-purple-400", border: "border-purple-200/60 dark:border-purple-800/40" },
  vinaya:   { gradient: "from-teal-50 to-slate-50 dark:from-teal-950/20 dark:to-slate-900", icon: "text-teal-600 dark:text-teal-400", border: "border-teal-200/60 dark:border-teal-800/40" },
};

const featuredStotraSlugs = [
  "shiva-tandava-stotram",
  "rudrashtakam",
  "mahalakshmi-ashtakam",
  "rama-raksha-stotra",
  "madhurashtakam",
  "mrityunjaya-stotram",
];

export default function Stotras() {
  useEffect(() => {
    document.title = "Stotra Ratnavali — 82 Hindu Stotras with Sanskrit, Hindi & English Meaning | Sadhaka";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "Complete Stotra Ratnavali (Gita Press, Gorakhpur) — 82 Sanskrit stotras for Shiva, Vishnu, Rama, Krishna, Devi, Ganesha and more with Hindi artha and English meaning.");
    window.scrollTo(0, 0);
  }, []);

  const featuredStotras = stotras.filter(s => featuredStotraSlugs.includes(s.slug));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://opensadhaka.com" },
          { "@type": "ListItem", "position": 2, "name": "Stotra Ratnavali" }
        ]
      },
      {
        "@type": "ItemList",
        "name": "Stotra Ratnavali — Hindu Stotras",
        "description": "82 Sanskrit stotras from the Stotra Ratnavali (Gita Press, Gorakhpur) with Hindi and English meanings.",
        "numberOfItems": 82,
        "itemListElement": stotraCategories.map((cat, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": `${cat.deityEnglish} Stotras`,
          "url": `https://opensadhaka.com/stotras/${cat.slug}`
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-amber-950/30 to-slate-900">
        <div className="container-padding max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-medium text-amber-300 uppercase tracking-widest">Gita Press, Gorakhpur</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-3" lang="sa">
            स्तोत्ररत्नावली
          </h1>
          <p className="text-2xl text-amber-200/80 mb-5">Stotra Ratnavali</p>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            82 Sanskrit stotras — prayers and hymns for Shiva, Vishnu, Rama, Krishna, Devi, Ganesha, Surya and more — with verse-by-verse Hindi meaning (artha) and English translation.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/10 text-slate-200">
              <span className="font-semibold text-amber-300">82</span> Stotras
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/10 text-slate-200">
              <span className="font-semibold text-amber-300">8</span> Deities
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/10 text-slate-200">
              Sanskrit · Hindi · English
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-16">
        <div className="container-padding max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-3">Browse by Deity</h2>
          <p className="text-muted-foreground mb-10">Select a deity to see all stotras in that section</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stotraCategories.map(cat => {
              const colors = categoryColors[cat.slug] || categoryColors.vinaya;
              return (
                <Link
                  key={cat.slug}
                  to={`/stotras/${cat.slug}`}
                  className={`group flex flex-col p-6 rounded-2xl border ${colors.border} bg-gradient-to-br ${colors.gradient} hover:shadow-lg transition-all hover:-translate-y-0.5`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border ${colors.border} flex items-center justify-center`}>
                      <BookOpen className={`w-5 h-5 ${colors.icon}`} />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground bg-white/70 dark:bg-slate-800/70 px-2 py-0.5 rounded-full">
                      {cat.stotras.length} stotras
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors" lang="sa">
                    {cat.deity.split(' ').slice(0, 2).join(' ')}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{cat.deityEnglish}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {cat.description.split('.')[0]}.
                  </p>
                  <div className="mt-auto pt-4 flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400 group-hover:gap-2 transition-all">
                    View all <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Stotras */}
      {featuredStotras.length > 0 && (
        <section className="py-12 bg-muted/30">
          <div className="container-padding max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-8">
              <Star className="w-5 h-5 text-amber-500" />
              <h2 className="text-2xl font-bold text-foreground">Most Searched Stotras</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredStotras.map(stotra => (
                <Link
                  key={stotra.slug}
                  to={`/stotras/${stotra.category}/${stotra.slug}`}
                  className="group p-5 bg-white dark:bg-slate-900 border border-border rounded-xl hover:border-amber-200 hover:shadow-sm transition-all"
                >
                  <h3 className="font-semibold text-foreground group-hover:text-amber-600 mb-1 transition-colors" lang="sa">
                    {stotra.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{stotra.titleEnglish}</p>
                  <p className="text-xs text-muted-foreground">{stotra.verses.length} verses · {stotra.authorEnglish}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Stotras List */}
      <section className="py-16">
        <div className="container-padding max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8">Complete Stotra Index</h2>
          <div className="space-y-10">
            {stotraCategories.map(cat => {
              const catStotras = stotras.filter(s => s.category === cat.slug);
              const colors = categoryColors[cat.slug] || categoryColors.vinaya;
              return (
                <div key={cat.slug}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg font-bold ${colors.icon}`} lang="sa">
                      {cat.deity}
                    </h3>
                    <Link
                      to={`/stotras/${cat.slug}`}
                      className="text-xs text-amber-600 hover:text-amber-700 font-medium"
                    >
                      View all →
                    </Link>
                  </div>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {catStotras.map(stotra => (
                      <Link
                        key={stotra.slug}
                        to={`/stotras/${cat.slug}/${stotra.slug}`}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/50 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                      >
                        <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                        <span className="truncate">{stotra.titleEnglish}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SEO content block */}
      <section className="py-12 bg-muted/30">
        <div className="container-padding max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-5">About the Stotra Ratnavali</h2>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-4">
              The <strong>Stotra Ratnavali</strong> (स्तोत्ररत्नावली), published by Gita Press, Gorakhpur, is one of the most widely used collections of Sanskrit devotional hymns (stotras) in Hindu tradition. The collection contains 82 stotras composed by sages, saints, and devotees across centuries — from Adi Shankaracharya's philosophical hymns to Tulsidas's devotional Rudrashtakam, Ravana's dramatic Shiva Tandava Stotram, and Vallabhacharya's ecstatic Madhurashtakam.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Each stotra is presented here with the original <strong>Sanskrit text in Devanagari script</strong>, <strong>Hindi meaning (artha)</strong> following the Gita Press edition, and an <strong>English translation</strong> for global seekers. The stotras are organized by deity — Shiva, Vishnu, Rama, Krishna, Devi (Shakti), Ganesha, Surya, and various sacred rivers and universal invocations.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Whether you are looking to deepen your daily puja practice, memorize Sanskrit verses, understand the meaning behind familiar prayers, or explore the rich philosophical content embedded in these devotional hymns — this complete Stotra Ratnavali is your reference.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
