import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { loadSahasranama } from "@/lib/stotras";

export const metadata: Metadata = {
  title: "Vishnu Sahasranama Stotram: Complete 1000 Names in 107 Shlokas | Opensadhaka",
  description:
    "The complete Vishnu Sahasranama from the Mahabharata's Anushasana Parva. All 107 shlokas with Sanskrit Devanagari, IAST transliteration, and meaning of each of the 1000 names of Lord Vishnu.",
  alternates: { canonical: "https://www.opensadhaka.com/stotras/vishnu-sahasranama" },
  openGraph: {
    title: "Vishnu Sahasranama: Complete Stotram with 1000 Names",
    description:
      "All 107 shlokas of the Vishnu Sahasranama from the Mahabharata. Sanskrit, transliteration, and meaning for every name.",
    url: "https://www.opensadhaka.com/stotras/vishnu-sahasranama",
    type: "article",
  },
};

export default function VishnuSahasranamaPage() {
  const sahasranama = loadSahasranama("vishnu-sahasranama");
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container-padding max-w-4xl mx-auto">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Vishnu Sahasranama", href: "/stotras/vishnu-sahasranama" },
            ]}
          />

          <header className="mb-16 mt-8">
            <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
              Vishnu <span className="text-blue-400 italic">Sahasranama</span>
            </h1>
            <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
              <strong>About this text:</strong> The Vishnu Sahasranama is a sacred hymn of 1000 names of Lord Vishnu, found in the Anushasana Parva (Book 13) of the Mahabharata. Bhishma, lying on his bed of arrows after the Kurukshetra war, recites these names to Yudhishthira as the supreme means of liberation. The stotram is composed in 107 shlokas in Anushtup meter, traditionally attributed to Vyasa.
            </p>
            <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-blue-500/30 pl-8 py-2">
              Bhishma declared: &ldquo;By praising with these thousand names, a person ever-vigilant transcends all sorrow.&rdquo;
            </p>
          </header>

          {/* Dhyana Shlokas */}
          {sahasranama.dhyanaShlokas && sahasranama.dhyanaShlokas.length > 0 && (
            <section className="mb-16">
              <h2 className="font-display text-2xl font-bold mb-6 text-blue-400/80">Dhyana Shlokas</h2>
              <p className="text-muted-foreground text-sm mb-6">Meditation verses recited before the main stotram, invoking the form of Vishnu.</p>
              <div className="space-y-6">
                {sahasranama.dhyanaShlokas.map((shloka) => (
                  <div key={shloka.verse} className="rounded-2xl border border-border/40 bg-card/30 p-6">
                    <p className="font-serif text-lg leading-loose whitespace-pre-line mb-3">{shloka.sanskritDevanagari}</p>
                    <p className="italic text-sm text-muted-foreground whitespace-pre-line mb-3">{shloka.transliteration}</p>
                    <p className="text-sm text-foreground/80">{shloka.translation}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Full Stotram — continuous Sanskrit text */}
          <section className="mb-16">
            <h2 className="font-display text-2xl font-bold mb-6 text-blue-400/80">Complete Stotram</h2>
            <p className="text-muted-foreground text-sm mb-6">The full text of all {sahasranama.verseCount} shlokas for continuous reading and recitation.</p>
            <div className="rounded-3xl border border-border/40 bg-card/20 p-8 md:p-12">
              <p className="font-serif text-lg md:text-xl leading-[2.2] text-center">
                {sahasranama.verses.map((verse) => (
                  <span key={verse.verse}>
                    {verse.sanskritDevanagari}
                    {"\n\n"}
                  </span>
                ))}
              </p>
            </div>
          </section>

          {/* Shloka-by-Shloka Breakdown */}
          <section>
            <h2 className="font-display text-2xl font-bold mb-6 text-blue-400/80">Shloka-by-Shloka Breakdown</h2>
            <p className="text-muted-foreground text-sm mb-6">Click any shloka to see the individual names and their meanings.</p>
            <div className="space-y-3">
              {sahasranama.verses.map((verse) => (
                <Link
                  key={verse.verse}
                  href={`/stotras/vishnu-sahasranama/${verse.slug}`}
                  className="block rounded-2xl border border-border/40 bg-card/30 p-6 hover:border-blue-500/40 hover:bg-card/50 transition-all group"
                >
                  <div className="flex items-start gap-5">
                    <span className="text-blue-500/60 font-mono text-sm mt-1 min-w-[2.5rem]">
                      {verse.verse.toString().padStart(3, "0")}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-lg text-foreground leading-relaxed mb-2 line-clamp-2">
                        {verse.sanskritDevanagari.split("\n")[0]}
                      </p>
                      <p className="text-sm text-muted-foreground italic line-clamp-1">
                        {verse.transliteration.split("\n")[0]}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Names {verse.names[0]?.number}–{verse.names[verse.names.length - 1]?.number}
                      </p>
                    </div>
                    <span className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium shrink-0">
                      Read →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <div className="mt-16 p-8 bg-muted/30 rounded-3xl border border-border/50">
            <h2 className="text-2xl font-display font-bold mb-4">About the Vishnu Sahasranama</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Vishnu Sahasranama is the most widely recited sahasranama in the Hindu tradition. It appears in the Mahabharata when Yudhishthira asks Bhishma: &ldquo;What is the one supreme Deity? What is the highest goal? By praising whom, by worshipping whom, does a person attain good?&rdquo; Bhishma responds with these 1000 names, declaring that reciting them with devotion leads to liberation from all sorrow.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The stotram has been commented upon by Adi Shankaracharya (Advaita), Parashara Bhattar (Vishishtadvaita), and other acharyas. The rishi is Vyasa, the meter is Anushtup, and the deity is Sri Maha Vishnu. It is traditionally recited on Ekadashi, Saturdays, and as part of daily prayer.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <Link href="/deities/krishna" className="text-blue-400 hover:text-blue-300 transition-colors">
                Who is Krishna?
              </Link>
              <Link href="/deities/lakshmi" className="text-blue-400 hover:text-blue-300 transition-colors">
                Who is Lakshmi?
              </Link>
              <Link href="/what-is-vedanta" className="text-blue-400 hover:text-blue-300 transition-colors">
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
