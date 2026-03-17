import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { loadSahasranama, getSahasranamaNameBySlug } from "@/lib/stotras";

export function generateStaticParams() {
  const sahasranama = loadSahasranama("lalita-sahasranama");
  return sahasranama.names.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const sahasranama = loadSahasranama("lalita-sahasranama");
  const name = getSahasranamaNameBySlug(sahasranama, slug);
  if (!name) return { title: "Name Not Found" };
  return {
    title: `Lalita Sahasranama #${name.number} — ${name.transliteration}`,
    description: `Lalita Sahasranama name ${name.number}: ${name.name}.`,
    alternates: { canonical: `https://www.opensadhaka.com/stotras/lalita-sahasranama/${name.slug}` },
  };
}

export default async function LalitaSahasranamaNamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sahasranama = loadSahasranama("lalita-sahasranama");
  const name = getSahasranamaNameBySlug(sahasranama, slug);
  if (!name) notFound();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container-padding max-w-3xl mx-auto">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Lalita Sahasranama", href: "/stotras/lalita-sahasranama" }, { label: `Name ${name.number}`, href: `/stotras/lalita-sahasranama/${name.slug}` }]} />
          <h1 className="font-display text-4xl md:text-6xl font-black mt-8 mb-6 tracking-tighter">Lalita Sahasranama #{name.number}</h1>
          <div className="rounded-2xl border border-border/40 p-8 space-y-4">
            <p className="font-serif text-3xl">{name.name}</p>
            <p className="italic text-muted-foreground">{name.transliteration}</p>
            <p>{name.meaning}</p>
          </div>
          <Link href="/stotras/lalita-sahasranama" className="inline-block mt-8 hover:underline">← Back to all names</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
