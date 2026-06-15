import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  buildPageMetadata,
  buildBreadcrumbSchema,
  buildItemListSchema,
  buildUrl,
  SPEAKABLE_SPEC,
} from "@/lib/seo/index";
import { HistoryPageLayout } from "@/components/history/HistoryPageLayout";
import { AeoBlock } from "@/components/history/AeoBlock";
import { HistorySidebar } from "@/components/history/HistorySidebar";
import type { SidebarItem } from "@/components/history/HistorySidebar";
import { dynasties, getDynastyById } from "@/data/dynasties";
import { getSiteById } from "@/data/sites";
import { getEraById } from "@/data/eras";

// =============================================================================
// Static params
// =============================================================================

export async function generateStaticParams() {
  return dynasties.map((d) => ({ slug: d.id }));
}

// =============================================================================
// Metadata
// =============================================================================

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dynasty = getDynastyById(slug);
  if (!dynasty) return {};

  return buildPageMetadata({
    title: dynasty.seoTitle ?? dynasty.name + " | Sanatan History",
    description: dynasty.metaDescription,
    path: "/sanatan-history/dynasties/" + slug,
  });
}

// =============================================================================
// Branch badge styling
// =============================================================================

const branchStyles: Record<string, string> = {
  solar: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  lunar: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  historical: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

const branchLabels: Record<string, string> = {
  solar: "Solar Dynasty",
  lunar: "Lunar Dynasty",
  historical: "Historical Dynasty",
};

// =============================================================================
// Page
// =============================================================================

export default async function DynastyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dynasty = getDynastyById(slug);
  if (!dynasty) notFound();

  // ---------------------------------------------------------------------------
  // JSON-LD schemas
  // ---------------------------------------------------------------------------

  const breadcrumbSchema = buildBreadcrumbSchema([
    { label: "Home", href: "/" },
    { label: "Sanatan History", href: "/sanatan-history" },
    { label: "Dynasties", href: "/sanatan-history#dynasties" },
    {
      label: dynasty.name,
      href: "/sanatan-history/dynasties/" + dynasty.id,
    },
  ]);

  const rulerListSchema = buildItemListSchema({
    items: dynasty.keyRulers.map((r) => ({ name: r })),
  });

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: dynasty.name,
    description: dynasty.metaDescription,
    url: buildUrl("/sanatan-history/dynasties/" + dynasty.id),
    inLanguage: "en",
    ...SPEAKABLE_SPEC,
  };

  // ---------------------------------------------------------------------------
  // Sidebar items
  // ---------------------------------------------------------------------------

  const sidebarItems: SidebarItem[] = [];

  for (const id of dynasty.relatedSites) {
    const site = getSiteById(id);
    if (site) sidebarItems.push({ id, name: site.name, type: "site", href: `/sanatan-history/sites/${id}` });
  }
  for (const id of dynasty.relatedEras) {
    const era = getEraById(id);
    if (era) sidebarItems.push({ id, name: era.name, type: "era", href: `/sanatan-history/eras/${id}` });
  }
  for (const id of dynasty.relatedDynasties) {
    const related = getDynastyById(id);
    if (related) sidebarItems.push({ id, name: related.name, type: "dynasty", href: `/sanatan-history/dynasties/${id}` });
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <HistoryPageLayout
      title={dynasty.name}
      subtitle={dynasty.dateRange}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Sanatan History", href: "/sanatan-history" },
        { label: "Dynasties", href: "/sanatan-history#dynasties" },
        {
          label: dynasty.name,
          href: "/sanatan-history/dynasties/" + dynasty.id,
        },
      ]}
      schemas={[breadcrumbSchema, rulerListSchema, pageSchema]}
      sidebar={<HistorySidebar items={sidebarItems} />}
    >
      {/* AEO direct answer */}
      <AeoBlock text={dynasty.significance} />

      {/* On-page answer block — surfaces date range, ruler count, and the
          key transition under a dedicated H2 for AI extractability */}
      {dynasty.answerBlock && (
        <div className="glass-card rounded-2xl border border-white/5 p-6 mb-8">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            {dynasty.answerBlock.heading}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {dynasty.answerBlock.body}
          </p>
        </div>
      )}

      {/* Branch badge + date range + capital */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <span
          className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${branchStyles[dynasty.branch] ?? ""}`}
        >
          {branchLabels[dynasty.branch] ?? dynasty.branch}
        </span>
        <span className="text-sm text-muted-foreground">
          {dynasty.dateRange}
        </span>
        {dynasty.capital && (
          <span className="text-sm text-muted-foreground">
            Capital: <span className="text-foreground">{dynasty.capital}</span>
          </span>
        )}
      </div>

      {/* Description */}
      <div className="glass-card rounded-2xl border border-white/5 p-6 mb-8">
        <h2 className="font-display text-xl font-semibold text-foreground mb-4">
          Overview
        </h2>
        <div className="text-muted-foreground leading-relaxed space-y-4">
          {dynasty.description.split("\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>

      {/* Key Rulers */}
      <div className="glass-card rounded-2xl border border-white/5 p-6">
        <h2 className="font-display text-xl font-semibold text-foreground mb-4">
          Key Rulers
        </h2>
        <ol className="space-y-2">
          {dynasty.keyRulers.map((ruler, i) => (
            <li key={ruler} className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center flex-shrink-0 text-sm font-medium">
                {i + 1}
              </span>
              <span className="text-foreground">{ruler}</span>
            </li>
          ))}
        </ol>
      </div>
    </HistoryPageLayout>
  );
}
