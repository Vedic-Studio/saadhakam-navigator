import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { loadSahasranama } from "@/lib/stotras";
import { buildBreadcrumbSchema, buildCollectionSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Lalita Sahasranama: 1000 Names of the Divine Mother from the Brahmanda Purana | Opensadhaka",
  description:
    "The Lalita Sahasranama from the Lalitopakhyana section of the Brahmanda Purana. 1000 names of Goddess Lalita Tripurasundari with Sanskrit, IAST transliteration, and meaning. Narrated by Hayagriva to the sage Agastya.",
  alternates: { canonical: "https://www.opensadhaka.com/stotras/lalita-sahasranama" },
  openGraph: {
    title: "Lalita Sahasranama: 1000 Names of the Divine Mother",
    description:
      "The complete Lalita Sahasranama from the Brahmanda Purana. Sanskrit, transliteration, and meaning for each of the 1000 names of Lalita Tripurasundari.",
    url: "https://www.opensadhaka.com/stotras/lalita-sahasranama",
    type: "article",
  },
};

export default function LalitaSahasranamaPage() {
  const sahasranama = loadSahasranama("lalita-sahasranama");

  const breadcrumbSchema = buildBreadcrumbSchema([
    { label: "Home", href: "/" },
    { label: "Stotras", href: "/stotras" },
    { label: "Lalita Sahasranama", href: "/stotras/lalita-sahasranama" },
  ]);

  const collectionSchema = buildCollectionSchema({
    name: "Lalita Sahasranama — 1000 Names of the Divine Mother",
    description: "The complete Lalita Sahasranama from the Brahmanda Purana with transliteration and meaning for each of the 1000 names of Goddess Lalita Tripurasundari.",
    url: "https://www.opensadhaka.com/stotras/lalita-sahasranama",
    items: sahasranama.names.slice(0, 50).map((name) => ({
      name: `${name.transliteration} — ${name.meaning}`,
      url: `https://www.opensadhaka.com/stotras/lalita-sahasranama/${name.slug}`,
      description: name.meaning,
    })),
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container-padding max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Lalita Sahasranama", href: "/stotras/lalita-sahasranama" }]} />

          <header className="mb-16 mt-8">
            <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
              Lalita <span className="text-pink-400 italic">Sahasranama</span>
            </h1>
            <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
              <strong>About this text:</strong> The Lalita Sahasranama appears in the Lalitopakhyana section of the Brahmanda Purana. Hayagriva, an avatar of Vishnu, recites these 1000 names to the sage Agastya. Each name encodes an attribute, power, or philosophical dimension of Goddess Lalita Tripurasundari, the presiding deity of the Sri Vidya tradition in Shakta theology.
            </p>
            <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-pink-500/30 pl-8 py-2">
              &ldquo;She who is the cause of all causes, the primordial power from whom the threefold universe of creation, sustenance, and dissolution proceeds.&rdquo;
            </p>
          </header>

          {/* All 1000 Names */}
          <section>
            <h2 className="font-display text-2xl font-bold mb-6 text-pink-400/80">All 1000 Names</h2>
            <p className="text-muted-foreground text-sm mb-6">Click any name to see its Sanskrit form, transliteration, and meaning.</p>
            <div className="space-y-2">
              {sahasranama.names.map((name) => (
                <Link key={name.number} href={`/stotras/lalita-sahasranama/${name.slug}`} className="block rounded-xl border border-border/40 bg-card/30 p-4 hover:border-pink-500/40 hover:bg-card/50 transition-all group">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-pink-500/60 font-mono text-sm min-w-[3rem]">{name.number.toString().padStart(4, "0")}</span>
                    <span className="font-serif flex-1 text-foreground">{name.name}</span>
                    <span className="italic text-sm text-muted-foreground">{name.transliteration}</span>
                    <span className="text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium shrink-0">Read →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <div className="mt-16 p-8 bg-muted/30 rounded-3xl border border-border/50">
            <h2 className="text-2xl font-display font-bold mb-4">About the Lalita Sahasranama</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Lalitopakhyana narrative describes Lalita Tripurasundari&apos;s manifestation from the Chidagni Kunda (the fire of pure consciousness) to defeat the demon Bhandasura. After her victory, the assembled deities praise her through these 1000 names. The names are organized thematically: they begin with her sovereign forms (names 1-25), move through her cosmological functions, and conclude with her identity as Para Brahman, the absolute reality beyond all attributes.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The most authoritative commentary is Bhaskararaya&apos;s <em>Saubhagya Bhaskara</em> (18th century), which interprets each name through the lens of Sri Vidya mantra science and Shakta Advaita philosophy. The sahasranama is traditionally recited on Fridays, during Navaratri, and as a central practice in Sri Vidya upasana. Adi Shankaracharya&apos;s <em>Saundarya Lahari</em> and the <em>Lalita Trishati</em> (300 names) are companion texts in the same tradition.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <Link href="/traditions/shaktism" className="text-pink-400 hover:text-pink-300 transition-colors">
                What is Shaktism?
              </Link>
              <Link href="/deities/parvati" className="text-pink-400 hover:text-pink-300 transition-colors">
                Who is Parvati?
              </Link>
              <Link href="/what-is-vedanta" className="text-pink-400 hover:text-pink-300 transition-colors">
                What is Vedanta?
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
