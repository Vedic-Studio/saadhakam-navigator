import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { loadSahasranama } from "@/lib/stotras";

export const metadata: Metadata = {
  title: "Lalita Sahasranama — 1000 Names",
  description: "Read the 1000 names of Lalita with transliteration.",
  alternates: { canonical: "https://opensadhaka.com/stotras/lalita-sahasranama" },
};

export default function LalitaSahasranamaPage() {
  const sahasranama = loadSahasranama("lalita-sahasranama");
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container-padding max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Lalita Sahasranama", href: "/stotras/lalita-sahasranama" }]} />
          <h1 className="font-display text-4xl md:text-6xl font-black mb-8 mt-8 tracking-tighter">Lalita Sahasranama</h1>
          <p className="text-muted-foreground mb-8">All 1000 names. Meanings are placeholders for now and can be refined later.</p>
          <div className="space-y-2">
            {sahasranama.names.map((name) => (
              <Link key={name.number} href={`/stotras/lalita-sahasranama/${name.slug}`} className="block rounded-xl border border-border/40 p-4 hover:border-pink-500/50">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-muted-foreground w-12">{name.number}</span>
                  <span className="font-serif flex-1">{name.name}</span>
                  <span className="italic text-sm text-muted-foreground">{name.transliteration}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
