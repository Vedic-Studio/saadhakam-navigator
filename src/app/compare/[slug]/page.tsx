import { Metadata } from "next";
import { notFound } from "next/navigation";
import { comparisons } from "@/data/comparisons";
import { getAllConcepts } from "@/data/concepts";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRight, CheckCircle2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
import { LongformContent } from "@/components/LongformContent";
import { buildBreadcrumbSchema, buildWebPageSchema, buildArticleSchema, buildComparisonTableSchema, buildFaqSchema, buildUrl } from "@/lib/seo";
import { FeaturedImage } from "@/components/FeaturedImage";
import { FaithFinderCTA } from "@/components/faith-finder/FaithFinderCTA";

interface Props {
  params: { slug: string };
}

// Only these high-traffic, dead-end comparisons get the inline Faith Finder
// CTA. Gated to a fixed allowlist so the tagged CTA does not appear on every
// comparison page.
const FAITH_FINDER_CTA_SLUGS = new Set<string>([
  "bhagavad-gita-vs-upanishads",
  "ashtavakra-gita-vs-bhagavad-gita",
]);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const comp = comparisons.find((c) => c.slug === slug);

  if (!comp) {
    return { title: "Not Found" };
  }

  const ogImage = comp.featuredImage
    ? `https://www.opensadhaka.com${comp.featuredImage.src}`
    : undefined;

  return {
    title: `${comp.title} | Sadhaka Comparisons`,
    description: comp.metaDescription,
    alternates: {
      canonical: `https://www.opensadhaka.com/compare/${comp.slug}`,
    },
    openGraph: {
      title: `${comp.title} | Sadhaka Comparisons`,
      description: comp.metaDescription,
      url: `https://www.opensadhaka.com/compare/${comp.slug}`,
      type: "article",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${comp.title} | Sadhaka Comparisons`,
      description: comp.metaDescription,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export async function generateStaticParams() {
  return comparisons.map((c) => ({
    slug: c.slug,
  }));
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params;
  const comp = comparisons.find((c) => c.slug === slug);

  if (!comp) {
    notFound();
  }

  // Find concept pages matching the compared entities
  const allConcepts = getAllConcepts();
  const conceptSlugs = new Set(allConcepts.map((c) => c.slug));
  const slugParts = comp.slug.split("-vs-");
  const matchedConcepts = slugParts
    .filter((part) => conceptSlugs.has(part))
    .map((part) => allConcepts.find((c) => c.slug === part)!)
    .filter(Boolean);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Compare", href: "/compare" },
    { label: comp.title, href: `/compare/${comp.slug}` },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const webPageSchema = buildWebPageSchema({
    name: `${comp.title} | Sadhaka Comparisons`,
    description: comp.metaDescription,
    url: `https://www.opensadhaka.com/compare/${comp.slug}`,
    breadcrumbItems,
  });

  const articleSchema = buildArticleSchema({
    headline: comp.title,
    description: comp.metaDescription,
    url: buildUrl(`/compare/${comp.slug}`),
    datePublished: "2025-01-01",
    dateModified: "2026-03-15",
    section: `Comparisons · ${comp.category}`,
    keywords: [comp.entityA, comp.entityB, comp.category, `${comp.entityA} vs ${comp.entityB}`],
    image: comp.featuredImage ? buildUrl(comp.featuredImage.src) : undefined,
  });

  // FAQ + comparison-table schema are emitted ONLY when the entry carries the
  // matching real, page-specific data, so FAQPage JSON-LD always corresponds
  // to a visibly rendered FAQ (Google requirement) and the ItemList always
  // mirrors a visibly rendered <table>. Entries without this data emit neither.
  const faqSchema = comp.faq?.length
    ? buildFaqSchema(comp.faq.map((f) => ({ question: f.q, answer: f.a })))
    : null;

  const comparisonTableSchema = comp.comparisonTable?.length
    ? buildComparisonTableSchema({
        title: comp.title,
        url: buildUrl(`/compare/${comp.slug}`),
        entityA: comp.entityA,
        entityB: comp.entityB,
        rows: comp.comparisonTable,
      })
    : null;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-orange-500/30 selection:text-orange-100 flex flex-col">
      <ContentPageTracker slug={comp.slug} pillar="comparisons" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {comparisonTableSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonTableSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <Header />

      <main className="flex-grow pt-24 pb-16">
        <article className="container-padding max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Compare", href: "/compare" },
              { label: comp.title, href: `/compare/${comp.slug}` },
            ]}
          />

          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary-foreground text-xs font-semibold uppercase tracking-wider mb-6">
              {comp.category}
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {comp.title}
            </h1>

            {comp.tldr && (
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8 mb-10">
                <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
                  <CheckCircle2 className="text-primary w-5 h-5" />
                  Direct answer
                </h3>
                <p
                  data-speakable
                  className="text-lg leading-relaxed text-muted-foreground"
                >
                  {comp.tldr}
                </p>
              </div>
            )}

            {comp.featuredImage && (
              <FeaturedImage image={comp.featuredImage} className="mb-10" priority />
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="glass-card p-8 rounded-3xl border border-white/5 bg-white/[0.02]">
              <h2 className="text-2xl font-bold mb-4 text-center">
                {comp.entityA}
              </h2>
              <div className="w-12 h-1 bg-primary/50 mx-auto rounded-full mb-6" />
            </div>
            <div className="flex justify-center items-center text-muted-foreground md:hidden uppercase tracking-widest font-bold font-display">
              vs
            </div>
            <div className="glass-card p-8 rounded-3xl border border-white/5 bg-white/[0.02]">
              <h2 className="text-2xl font-bold mb-4 text-center">
                {comp.entityB}
              </h2>
              <div className="w-12 h-1 bg-secondary/50 mx-auto rounded-full mb-6" />
            </div>
          </div>

          {comp.comparisonTable && comp.comparisonTable.length > 0 && (
            <section className="mb-16" aria-labelledby="comparison-table-heading">
              <h2
                id="comparison-table-heading"
                className="font-display text-2xl md:text-3xl font-bold mb-6"
              >
                {comp.entityA} vs {comp.entityB}: at a glance
              </h2>
              <div className="overflow-x-auto rounded-2xl border border-border/50">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-border/50 bg-card">
                      <th scope="col" className="p-4 font-semibold text-sm">
                        Dimension
                      </th>
                      <th scope="col" className="p-4 font-semibold text-sm text-primary">
                        {comp.entityA}
                      </th>
                      <th scope="col" className="p-4 font-semibold text-sm text-secondary-foreground">
                        {comp.entityB}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comp.comparisonTable.map((row, i) => (
                      <tr
                        key={i}
                        className="border-b border-border/30 last:border-0 align-top"
                      >
                        <th
                          scope="row"
                          className="p-4 font-semibold text-sm text-foreground"
                        >
                          {row.dimension}
                        </th>
                        <td className="p-4 text-sm text-muted-foreground">{row.a}</td>
                        <td className="p-4 text-sm text-muted-foreground">{row.b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          <LongformContent
            className="mb-20"
            dangerouslySetInnerHTML={{
              __html:
                comp.content ||
                "<p>Detailed analysis for this comparison is in progress. Check back soon.</p>",
            }}
          />

          {comp.faq && comp.faq.length > 0 && (
            <section className="mb-16" aria-labelledby="comparison-faq-heading">
              <h2
                id="comparison-faq-heading"
                className="font-display text-2xl md:text-3xl font-bold mb-8"
              >
                Frequently asked questions
              </h2>
              <div className="space-y-4">
                {comp.faq.map((item, i) => (
                  <details
                    key={i}
                    className="group rounded-2xl border border-border/50 bg-card p-6"
                  >
                    <summary className="cursor-pointer font-semibold text-lg list-none flex items-start justify-between gap-4">
                      <span>{item.q}</span>
                      <span className="text-primary shrink-0 transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Next step: route undecided readers into the quiz (allowlisted slugs only) */}
          {FAITH_FINDER_CTA_SLUGS.has(comp.slug) && (
            <FaithFinderCTA sourceTemplate="comparison" className="mb-16" />
          )}

          <div className="mt-24 mb-16 pt-16 border-t border-border">
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="font-display text-2xl md:text-3xl font-bold">
                More in <span className="text-primary">{comp.category}</span>
              </h2>
              <TrackedLink
                href="/compare"
                eventLabel={`comparison_index_link:${comp.slug}`}
                trackPathName="compare"
                className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1 group"
              >
                View all <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </TrackedLink>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {comparisons
                .filter((c) => c.category === comp.category && c.slug !== comp.slug)
                .slice(0, 3)
                .map((item) => (
                  <TrackedLink
                    key={item.slug}
                    href={`/compare/${item.slug}`}
                    eventLabel={`comparison_related_link:${comp.slug}:${item.slug}`}
                    trackPathName={item.slug}
                    className="group h-full"
                  >
                    <div className="p-5 rounded-2xl border border-border/50 bg-card hover:border-primary/20 transition-all flex flex-col h-full shadow-sm hover:shadow-primary/5">
                      <h3 className="font-display font-bold text-base mb-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-auto">
                        {item.tldr}
                      </p>
                    </div>
                  </TrackedLink>
                ))
              }
            </div>
          </div>

          {matchedConcepts.length > 0 && (
            <div className="mb-16">
              <h2 className="flex items-center gap-3 font-display text-2xl md:text-3xl font-bold mb-8">
                <BookOpen className="w-6 h-6 text-primary" />
                Dive Deeper
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {matchedConcepts.map((concept) => (
                  <TrackedLink
                    key={concept.slug}
                    href={`/what-is-${concept.slug}`}
                    eventLabel={`comparison_concept:${comp.slug}:${concept.slug}`}
                    trackPathName={concept.slug}
                    className="group h-full"
                  >
                    <div className="p-6 rounded-2xl border border-border/50 bg-card hover:border-primary/20 transition-all h-full shadow-sm hover:shadow-primary/5">
                      <h3 className="font-display font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                        What is {concept.slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}?
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{concept.shortDefinition}</p>
                    </div>
                  </TrackedLink>
                ))}
              </div>
            </div>
          )}

          {/* Generic Faith Finder CTA, suppressed on slugs that already render the tagged inline CTA above */}
          {!FAITH_FINDER_CTA_SLUGS.has(comp.slug) && (
          <div className="bg-gradient-to-br from-indigo-950/40 to-background rounded-3xl border border-white/10 p-10 text-center relative overflow-hidden">

            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
            <h3 className="text-3xl font-display font-bold mb-4">
              Need a broader orientation?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              If you are comparing traditions because you are still mapping the
              broader landscape, the Faith Finder can help surface major
              philosophies and practice-families that match your interests.
            </p>
            <TrackedLink
              href="/faith-finder"
              eventLabel={`comparison_cta:${comp.slug}:faith-finder`}
              trackPathName="faith-finder"
            >
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 rounded-full text-lg shadow-lg shadow-orange-900/20 transition-transform hover:scale-105"
              >
                Open Faith Finder
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </TrackedLink>
          </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
