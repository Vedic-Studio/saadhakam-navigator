import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { loadSahasranama } from "@/lib/stotras";

export const metadata: Metadata = {
  title: "Vishnu Sahasranama — 1000 Names",
  description: "Read the 1000 names of Vishnu with transliteration.",
  alternates: { canonical: "https://opensadhaka.com/stotras/vishnu-sahasranama" },
};

export default function VishnuSahasranamaPage() {
  const sahasranama = loadSahasranama("vishnu-sahasranama");
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container-padding max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Vishnu Sahasranama", href: "/stotras/vishnu-sahasranama" }]} />
          <h1 className="font-display text-4xl md:text-6xl font-black mb-8 mt-8 tracking-tighter">Vishnu Sahasranama</h1>
          <p className="text-muted-foreground mb-8">All 1000 names. Meanings are placeholders for now and can be refined later.</p>
          <div className="mb-8 flex flex-wrap gap-4 text-sm">
            <Link href="/deities/krishna" className="text-orange-400 hover:text-orange-300 transition-colors">
              Who is Krishna?
            </Link>
            <Link href="/deities/lakshmi" className="text-orange-400 hover:text-orange-300 transition-colors">
              Who is Lakshmi?
            </Link>
            <Link href="/western-philosophy-and-vedanta" className="text-orange-400 hover:text-orange-300 transition-colors">
              Indian vs Western Philosophy
            </Link>
            <Link href="/vedanta-vs-stoicism" className="text-orange-400 hover:text-orange-300 transition-colors">
              Vedanta vs Stoicism
            </Link>
          </div>
          <div className="space-y-2">
            {sahasranama.names.map((name) => (
              <Link key={name.number} href={`/stotras/vishnu-sahasranama/${name.slug}`} className="block rounded-xl border border-border/40 p-4 hover:border-blue-500/50">
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
