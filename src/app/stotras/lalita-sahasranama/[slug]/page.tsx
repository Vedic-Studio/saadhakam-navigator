import type { Metadata } from "next";
import { buildBreadcrumbSchema, buildWebPageSchema, buildUrl } from "@/lib/seo";
import { composeMetaDescription } from "@/lib/seo/metaDescription";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { loadSahasranama, getSahasranamaNameBySlug, getAllSahasranamaNames } from "@/lib/stotras";

export const revalidate = 86400;

export function generateStaticParams() {
  const sahasranama = loadSahasranama("lalita-sahasranama");
  return sahasranama.names.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const sahasranama = loadSahasranama("lalita-sahasranama");
  const name = getSahasranamaNameBySlug(sahasranama, slug);
  if (!name) return { title: "Name Not Found" };
  const description = composeMetaDescription(
    [
      `Lalita Sahasranama name ${name.number}: ${name.transliteration} (${name.name})`,
      name.meaning,
    ],
    {
      fallback:
        "Explore the Sanskrit, IAST transliteration, and devotional meaning from the thousand names of the Divine Mother on Sadhaka.",
    },
  );
  return {
    title: `Lalita Sahasranama #${name.number} — ${name.transliteration}`,
    description,
    alternates: { canonical: `https://www.opensadhaka.com/stotras/lalita-sahasranama/${name.slug}` },
  };
}

export default async function LalitaSahasranamaNamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sahasranama = loadSahasranama("lalita-sahasranama");
  const name = getSahasranamaNameBySlug(sahasranama, slug);
  if (!name) notFound();

  const allNames = getAllSahasranamaNames(sahasranama);
  const currentIndex = allNames.findIndex((n) => n.slug === name.slug);
  const prevName = currentIndex > 0 ? allNames[currentIndex - 1] : null;
  const nextName = currentIndex >= 0 && currentIndex < allNames.length - 1 ? allNames[currentIndex + 1] : null;

  const pagePath = `/stotras/lalita-sahasranama/${name.slug}`;
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Lalita Sahasranama", href: "/stotras/lalita-sahasranama" },
    { label: `Name ${name.number}`, href: pagePath },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const webPageSchema = buildWebPageSchema({
    name: `Lalita Sahasranama #${name.number} — ${name.transliteration}`,
    description: `Lalita Sahasranama name ${name.number}: ${name.name}. ${name.meaning}`,
    url: buildUrl(pagePath),
    breadcrumbItems,
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
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
          <nav
            aria-label="Name navigation"
            className="mt-10 border-t border-border/40 pt-8 grid gap-4 sm:grid-cols-3"
          >
            <div className="text-left">
              {prevName ? (
                <Link
                  href={`/stotras/lalita-sahasranama/${prevName.slug}`}
                  className="inline-flex flex-col gap-1 text-sm hover:text-primary"
                >
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">← Previous</span>
                  <span className="font-semibold">
                    #{prevName.number} {prevName.transliteration}
                  </span>
                </Link>
              ) : (
                <span className="inline-flex flex-col gap-1 text-sm text-muted-foreground/60">
                  <span className="text-xs uppercase tracking-wider">← Previous</span>
                  <span>First name</span>
                </span>
              )}
            </div>
            <div className="text-center">
              <Link
                href="/stotras/lalita-sahasranama"
                className="inline-flex flex-col gap-1 text-sm hover:text-primary"
              >
                <span className="text-xs uppercase tracking-wider text-muted-foreground">Index</span>
                <span className="font-semibold">All 1,000 names</span>
              </Link>
            </div>
            <div className="text-right">
              {nextName ? (
                <Link
                  href={`/stotras/lalita-sahasranama/${nextName.slug}`}
                  className="inline-flex flex-col gap-1 text-sm hover:text-primary"
                >
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">Next →</span>
                  <span className="font-semibold">
                    #{nextName.number} {nextName.transliteration}
                  </span>
                </Link>
              ) : (
                <span className="inline-flex flex-col gap-1 text-sm text-muted-foreground/60">
                  <span className="text-xs uppercase tracking-wider">Next →</span>
                  <span>Last name</span>
                </span>
              )}
            </div>
          </nav>

          <div className="mt-10 rounded-2xl border border-border/40 p-6">
            <h2 className="font-semibold mb-4">Jump to a name</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-sm">
              {[1, 250, 500, 750, 999].map((num) => {
                const target = allNames.find((n) => n.number === num);
                if (!target) return null;
                return (
                  <li key={num}>
                    <Link
                      href={`/stotras/lalita-sahasranama/${target.slug}`}
                      className="block rounded-md border border-border/30 px-3 py-2 hover:border-primary hover:text-primary"
                    >
                      <span className="block text-xs text-muted-foreground">Name #{target.number}</span>
                      <span className="block font-medium">{target.transliteration}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <Link href="/stotras/lalita-sahasranama" className="inline-block mt-8 hover:underline">← Back to all names</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
