import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  buildPageMetadata,
  buildBreadcrumbSchema,
  buildHistoricalPeriodSchema,
  buildUrl,
  SPEAKABLE_SPEC,
} from "@/lib/seo/index";
import { HistoryPageLayout } from "@/components/history/HistoryPageLayout";
import { AeoBlock } from "@/components/history/AeoBlock";
import { HistorySidebar } from "@/components/history/HistorySidebar";
import type { SidebarItem } from "@/components/history/HistorySidebar";
import { GlobalContextTimeline } from "@/components/history/GlobalContextTimeline";
import { eras, getEraById } from "@/data/eras";
import { getSiteById } from "@/data/sites";
import { getEvidenceById } from "@/data/evidence";
import { getDynastyById } from "@/data/dynasties";
import { getResearcherById } from "@/data/researchers";
import { HelpCircle } from "lucide-react";

// =============================================================================
// Static params
// =============================================================================

export async function generateStaticParams() {
  return eras.map((e) => ({ slug: e.id }));
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
  const era = getEraById(slug);
  if (!era) return {};

  return buildPageMetadata({
    title: era.name + " | Sanatan History",
    description: era.metaDescription,
    path: "/sanatan-history/eras/" + slug,
  });
}

// =============================================================================
// Era color mapping
// =============================================================================

const eraColorStyles: Record<string, { bg: string; text: string; border: string }> = {
  amber: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
  slate: { bg: "bg-slate-500/10", text: "text-slate-400", border: "border-slate-500/20" },
  orange: { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/20" },
  sky: { bg: "bg-sky-500/10", text: "text-sky-400", border: "border-sky-500/20" },
  violet: { bg: "bg-violet-500/10", text: "text-violet-400", border: "border-violet-500/20" },
  rose: { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/20" },
};

const defaultColorStyle = { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" };

// =============================================================================
// Page
// =============================================================================

export default async function EraDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const era = getEraById(slug);
  if (!era) notFound();

  const colorStyle = eraColorStyles[era.color] ?? defaultColorStyle;

  // ---------------------------------------------------------------------------
  // JSON-LD schemas
  // ---------------------------------------------------------------------------

  const breadcrumbSchema = buildBreadcrumbSchema([
    { label: "Home", href: "/" },
    { label: "Sanatan History", href: "/sanatan-history" },
    { label: "Eras", href: "/sanatan-history#eras" },
    { label: era.name, href: "/sanatan-history/eras/" + era.id },
  ]);

  const historicalPeriodSchema = buildHistoricalPeriodSchema({
    name: era.name,
    description: era.metaDescription,
    url: buildUrl("/sanatan-history/eras/" + era.id),
    startYear: era.startYear,
    endYear: era.endYear,
  });

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: era.name,
    description: era.metaDescription,
    url: buildUrl("/sanatan-history/eras/" + era.id),
    inLanguage: "en",
    ...SPEAKABLE_SPEC,
  };

  // ---------------------------------------------------------------------------
  // Sidebar items
  // ---------------------------------------------------------------------------

  const sidebarItems: SidebarItem[] = [];

  for (const id of era.relatedSites) {
    const site = getSiteById(id);
    if (site) sidebarItems.push({ id, name: site.name, type: "site", href: `/sanatan-history/sites/${id}` });
  }
  for (const id of era.relatedEvidence) {
    const evidence = getEvidenceById(id);
    if (evidence) sidebarItems.push({ id, name: evidence.claim, type: "evidence", href: `/sanatan-history/evidence/${id}` });
  }
  for (const id of era.relatedDynasties) {
    const dynasty = getDynastyById(id);
    if (dynasty) sidebarItems.push({ id, name: dynasty.name, type: "dynasty", href: `/sanatan-history/dynasties/${id}` });
  }
  for (const id of era.relatedResearchers) {
    const researcher = getResearcherById(id);
    if (researcher) sidebarItems.push({ id, name: researcher.name, type: "researcher", href: `/sanatan-history/researchers/${id}` });
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <HistoryPageLayout
      title={era.name}
      subtitle={era.dateRange}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Sanatan History", href: "/sanatan-history" },
        { label: "Eras", href: "/sanatan-history#eras" },
        { label: era.name, href: "/sanatan-history/eras/" + era.id },
      ]}
      schemas={[breadcrumbSchema, historicalPeriodSchema, pageSchema]}
      sidebar={<HistorySidebar items={sidebarItems} />}
    >
      {/* AEO direct answer */}
      <AeoBlock text={era.significance} />

      {/* Date range banner */}
      <div
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${colorStyle.bg} ${colorStyle.border} mb-8`}
      >
        <span className={`text-sm font-semibold ${colorStyle.text}`}>
          {era.dateRange}
        </span>
      </div>

      {/* Description */}
      <div className="glass-card rounded-2xl border border-white/5 p-6 mb-8">
        <h2 className="font-display text-xl font-semibold text-foreground mb-4">
          Overview
        </h2>
        <div className="text-muted-foreground leading-relaxed space-y-4">
          {era.description.split("\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>

      {/* Global Context Timeline */}
      {era.globalContext.length > 0 && (
        <div className="mb-8">
          <GlobalContextTimeline globalContext={era.globalContext} />
        </div>
      )}

      {/* Key Questions */}
      {era.keyQuestions.length > 0 && (
        <div className="glass-card rounded-2xl border border-white/5 p-6">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-orange-400" />
            Key Questions
          </h2>
          <ul className="space-y-3">
            {era.keyQuestions.map((question, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center flex-shrink-0 text-xs font-semibold">
                  {i + 1}
                </span>
                <span className="text-muted-foreground text-sm leading-relaxed">
                  {question}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </HistoryPageLayout>
  );
}
