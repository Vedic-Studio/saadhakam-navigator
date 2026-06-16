import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { loadStotra, loadSahasranama } from "@/lib/stotras";
import { buildBreadcrumbSchema, buildCollectionSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Stotras & Sahasranamas: Sacred Hymns with Sanskrit & Meaning | Opensadhaka",
  description:
    "Read classical Sanatan stotras and sahasranamas — the Vishnu Sahasranama, Lalita Sahasranama, Shiva Tandava Stotram, and Navagraha Stotram — with Devanagari, IAST transliteration, and verse-by-verse meaning.",
  alternates: { canonical: "https://www.opensadhaka.com/stotras" },
  openGraph: {
    title: "Stotras & Sahasranamas | Sacred Hymns of Sanatan Dharma",
    description:
      "The Vishnu Sahasranama, Lalita Sahasranama, Shiva Tandava Stotram, and Navagraha Stotram — Sanskrit, transliteration, and meaning.",
    url: "https://www.opensadhaka.com/stotras",
    type: "website",
  },
};

// Ordered hub list. Title/deity/tradition/description are read from the JSON
// (single source of truth in content/stotras/); only presentation lives here.
// Tailwind class strings are written in full so the JIT compiler keeps them.
const STOTRA_INDEX = [
  { slug: "vishnu-sahasranama", kind: "sahasranama" as const, count: "1,000 names · 107 shlokas", accent: "text-blue-400", hover: "hover:border-blue-500/40" },
  { slug: "lalita-sahasranama", kind: "sahasranama" as const, count: "1,000 names", accent: "text-rose-400", hover: "hover:border-rose-500/40" },
  { slug: "shiva-tandava-stotram", kind: "stotra" as const, count: "16 verses", accent: "text-amber-400", hover: "hover:border-amber-500/40" },
  { slug: "navagraha-stotram", kind: "stotra" as const, count: "9 verses", accent: "text-violet-400", hover: "hover:border-violet-500/40" },
];

export default function StotrasIndexPage() {
  const stotras = STOTRA_INDEX.map((entry) => {
    const data =
      entry.kind === "sahasranama" ? loadSahasranama(entry.slug) : loadStotra(entry.slug);
    return {
      ...entry,
      href: `/stotras/${entry.slug}`,
      title: data.title,
      deity: data.deity,
      tradition: data.tradition,
      description: data.description,
    };
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { label: "Home", href: "/" },
    { label: "Stotras", href: "/stotras" },
  ]);

  const collectionSchema = buildCollectionSchema({
    name: "Stotras & Sahasranamas",
    description:
      "Classical Sanatan stotras and sahasranamas with Sanskrit, transliteration, and meaning.",
    url: "https://www.opensadhaka.com/stotras",
    items: stotras.map((s) => ({
      name: s.title,
      url: `https://www.opensadhaka.com${s.href}`,
      description: s.description,
    })),
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container-padding max-w-4xl mx-auto">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Stotras", href: "/stotras" },
            ]}
          />

          <header className="mb-16 mt-8">
            <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
              Stotras &amp; <span className="text-blue-400 italic">Sahasranamas</span>
            </h1>
            <p className="text-lg text-foreground leading-relaxed max-w-3xl">
              Stotras are devotional hymns of praise; sahasranamas are litanies of a thousand names.
              Each text below is presented with the original Sanskrit in Devanagari, IAST
              transliteration, and the meaning of every verse or name — for study, recitation, and
              contemplation.
            </p>
          </header>

          <section className="grid sm:grid-cols-2 gap-5">
            {stotras.map((s) => (
              <Link
                key={s.slug}
                href={s.href}
                className={`block rounded-2xl border border-border/40 bg-card/30 p-6 transition-all group hover:bg-card/50 ${s.hover}`}
              >
                <div className="flex items-center gap-2 mb-3 text-xs font-medium text-muted-foreground">
                  <span className={s.accent}>{s.tradition}</span>
                  <span aria-hidden>·</span>
                  <span>{s.deity}</span>
                </div>
                <h2 className="font-display text-2xl font-bold mb-2 tracking-tight">{s.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                  {s.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground/70">{s.count}</span>
                  <span
                    className={`text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity ${s.accent}`}
                  >
                    Read →
                  </span>
                </div>
              </Link>
            ))}
          </section>

          <div className="mt-16 p-8 bg-muted/30 rounded-3xl border border-border/50">
            <h2 className="text-2xl font-display font-bold mb-4">What is a stotra?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A <em>stotra</em> is a hymn of praise addressed to a deity, composed in Sanskrit meter
              and meant to be recited or sung. A <em>sahasranama</em> (&ldquo;thousand names&rdquo;)
              is a specific kind of stotra that enumerates a thousand epithets of a deity — each name
              a compressed meditation on one aspect of the divine. Reciting them is among the most
              widespread devotional practices in Sanatan Dharma.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <Link href="/mantras" className="text-blue-400 hover:text-blue-300 transition-colors">
                Browse mantras
              </Link>
              <Link href="/deities" className="text-blue-400 hover:text-blue-300 transition-colors">
                Explore deities
              </Link>
              <Link href="/how-to-start-japa" className="text-blue-400 hover:text-blue-300 transition-colors">
                How to start japa
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
