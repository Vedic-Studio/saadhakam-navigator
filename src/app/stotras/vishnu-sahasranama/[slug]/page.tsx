import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { loadSahasranama, getSahasranamaNameBySlug } from "@/lib/stotras";
import { ContentPageTracker } from "@/components/ContentAnalytics";

export function generateStaticParams() {
  const sahasranama = loadSahasranama("vishnu-sahasranama");
  return sahasranama.names.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const sahasranama = loadSahasranama("vishnu-sahasranama");
  const name = getSahasranamaNameBySlug(sahasranama, slug);
  if (!name) return { title: "Name Not Found" };
  return {
    title: `Vishnu Sahasranama #${name.number} — ${name.transliteration}`,
    description: `Vishnu Sahasranama name ${name.number}: ${name.name}.`,
    alternates: { canonical: `https://www.opensadhaka.com/stotras/vishnu-sahasranama/${name.slug}` },
  };
}

export default async function VishnuSahasranamaNamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sahasranama = loadSahasranama("vishnu-sahasranama");
  const name = getSahasranamaNameBySlug(sahasranama, slug);
  if (!name) notFound();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is the meaning of Vishnu Sahasranama name ${name.number}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${name.name} (${name.transliteration}) means: ${name.meaning}`,
        },
      },
      {
        "@type": "Question",
        name: `How is Vishnu Sahasranama name ${name.number} used in practice?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Traditionally, this name is recited in Vishnu Sahasranama japa and contemplation to internalize its quality and orient the mind toward devotion.`,
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.opensadhaka.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Vishnu Sahasranama",
        item: "https://www.opensadhaka.com/stotras/vishnu-sahasranama",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Name ${name.number}`,
        item: `https://www.opensadhaka.com/stotras/vishnu-sahasranama/${name.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <ContentPageTracker slug={`vishnu-sahasranama-${name.slug}`} pillar="stotra-name" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container-padding max-w-3xl mx-auto">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Vishnu Sahasranama", href: "/stotras/vishnu-sahasranama" }, { label: `Name ${name.number}`, href: `/stotras/vishnu-sahasranama/${name.slug}` }]} />
          <h1 className="font-display text-4xl md:text-6xl font-black mt-8 mb-6 tracking-tighter">Vishnu Sahasranama #{name.number}</h1>
          <div className="rounded-2xl border border-border/40 p-8 space-y-4">
            <p className="font-serif text-3xl">{name.name}</p>
            <p className="italic text-muted-foreground">{name.transliteration}</p>
            <p>{name.meaning}</p>
          </div>
          <Link href="/stotras/vishnu-sahasranama" className="inline-block mt-8 hover:underline">← Back to all names</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
