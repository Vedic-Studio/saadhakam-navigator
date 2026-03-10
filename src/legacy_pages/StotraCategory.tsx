// @ts-nocheck

import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { BookOpen, ChevronRight, ArrowLeft, Layers } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { stotraCategories, getStotrasByCategory } from "@/data/stotras";
import NotFound from "./NotFound";

const colorClasses: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  shiva:    { bg: "from-blue-900 via-slate-800 to-slate-900",    text: "text-blue-300",   border: "border-blue-700/40",  badge: "bg-blue-950/40 text-blue-300 border-blue-800/50" },
  vishnu:   { bg: "from-amber-900 via-slate-800 to-slate-900",   text: "text-amber-300",  border: "border-amber-700/40", badge: "bg-amber-950/40 text-amber-300 border-amber-800/50" },
  rama:     { bg: "from-green-900 via-slate-800 to-slate-900",   text: "text-green-300",  border: "border-green-700/40", badge: "bg-green-950/40 text-green-300 border-green-800/50" },
  krishna:  { bg: "from-indigo-900 via-slate-800 to-slate-900",  text: "text-indigo-300", border: "border-indigo-700/40",badge: "bg-indigo-950/40 text-indigo-300 border-indigo-800/50" },
  devi:     { bg: "from-rose-900 via-slate-800 to-slate-900",    text: "text-rose-300",   border: "border-rose-700/40",  badge: "bg-rose-950/40 text-rose-300 border-rose-800/50" },
  misc:     { bg: "from-orange-900 via-slate-800 to-slate-900",  text: "text-orange-300", border: "border-orange-700/40",badge: "bg-orange-950/40 text-orange-300 border-orange-800/50" },
  prakirna: { bg: "from-purple-900 via-slate-800 to-slate-900",  text: "text-purple-300", border: "border-purple-700/40",badge: "bg-purple-950/40 text-purple-300 border-purple-800/50" },
  vinaya:   { bg: "from-teal-900 via-slate-800 to-slate-900",    text: "text-teal-300",   border: "border-teal-700/40",  badge: "bg-teal-950/40 text-teal-300 border-teal-800/50" },
};

export default function StotraCategory() {
  const { category } = useParams<{ category: string }>();
  const categoryData = stotraCategories.find(c => c.slug === category);
  const stotraList = category ? getStotrasByCategory(category) : [];
  const colors = colorClasses[category || ""] || colorClasses.vinaya;

  useEffect(() => {
    if (categoryData) {
      document.title = `${categoryData.deityEnglish} Stotras — Sanskrit with Hindi & English Meaning | Sadhaka`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", categoryData.seoDescription);
      window.scrollTo(0, 0);
    }
  }, [categoryData]);

  if (!categoryData) return <NotFound />;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://opensadhaka.com" },
          { "@type": "ListItem", "position": 2, "name": "Stotras", "item": "https://opensadhaka.com/stotras" },
          { "@type": "ListItem", "position": 3, "name": `${categoryData.deityEnglish} Stotras` }
        ]
      },
      {
        "@type": "ItemList",
        "name": `${categoryData.deityEnglish} Stotras`,
        "description": categoryData.seoDescription,
        "numberOfItems": stotraList.length,
        "itemListElement": stotraList.map((s, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": s.titleEnglish,
          "url": `https://opensadhaka.com/stotras/${category}/${s.slug}`
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

      {/* Breadcrumb */}
      <nav className="bg-muted/30 border-b border-border/50 py-3">
        <div className="container-padding max-w-5xl mx-auto">
          <ol className="flex items-center gap-1 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">Home</Link></li>
            <ChevronRight className="w-3 h-3" />
            <li><Link to="/stotras" className="hover:text-foreground">Stotras</Link></li>
            <ChevronRight className="w-3 h-3" />
            <li className="text-foreground font-medium">{categoryData.deityEnglish}</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className={`py-16 bg-gradient-to-br ${colors.bg}`}>
        <div className="container-padding max-w-5xl mx-auto">
          <Link
            to="/stotras"
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-200 text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Stotras
          </Link>
          <div className="flex items-start gap-5">
            <div className={`w-16 h-16 rounded-2xl border ${colors.border} bg-white/5 flex items-center justify-center flex-shrink-0`}>
              <Layers className={`w-8 h-8 ${colors.text}`} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2" lang="sa">
                {categoryData.deity}
              </h1>
              <p className={`text-lg ${colors.text} mb-3`}>{categoryData.deityEnglish} Stotras</p>
              <p className="text-slate-300 max-w-2xl leading-relaxed">{categoryData.description}</p>
              <div className="mt-4">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border ${colors.badge}`}>
                  <BookOpen className="w-3 h-3" />
                  {stotraList.length} stotras
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stotra Grid */}
      <section className="py-12">
        <div className="container-padding max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            All {categoryData.deityEnglish} Stotras
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {stotraList.map((stotra, idx) => (
              <Link
                key={stotra.slug}
                to={`/stotras/${category}/${stotra.slug}`}
                className="group flex flex-col p-5 bg-white dark:bg-slate-900 border border-border rounded-xl hover:border-foreground/20 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-amber-600 transition-colors leading-tight mb-1" lang="sa">
                      {stotra.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{stotra.titleEnglish}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground flex-shrink-0 mt-1 transition-colors" />
                </div>

                {stotra.verses.length > 0 && (
                  <p
                    className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-3"
                    lang="sa"
                    style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                  >
                    {stotra.verses[0].sanskrit.split('\n')[0]}...
                  </p>
                )}

                <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/50">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{stotra.verses.length} verses</span>
                    {stotra.authorEnglish && <span>· {stotra.authorEnglish}</span>}
                  </div>
                  <div className="flex gap-1">
                    <span className="px-1.5 py-0.5 rounded text-xs bg-muted text-muted-foreground">SA</span>
                    <span className="px-1.5 py-0.5 rounded text-xs bg-muted text-muted-foreground">HI</span>
                    <span className="px-1.5 py-0.5 rounded text-xs bg-muted text-muted-foreground">EN</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Other categories */}
          <div className="mt-16 pt-10 border-t border-border">
            <h3 className="text-lg font-semibold text-foreground mb-5">Browse Other Deities</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
              {stotraCategories
                .filter(c => c.slug !== category)
                .map(cat => (
                  <Link
                    key={cat.slug}
                    to={`/stotras/${cat.slug}`}
                    className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 border border-border rounded-lg hover:border-foreground/20 transition-colors group"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground group-hover:text-amber-600" lang="sa">{cat.deity.split(' ')[0]}</p>
                      <p className="text-xs text-muted-foreground">{cat.stotras.length} stotras</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
