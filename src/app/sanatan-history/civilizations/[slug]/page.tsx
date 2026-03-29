import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Globe } from "lucide-react";
import {
  civilizationComparisons,
  getCivilizationBySlug,
} from "@/data/civilizations";
import { getSiteById } from "@/data/sites";
import { getEvidenceById } from "@/data/evidence";
import { getEraById } from "@/data/eras";
import {
  buildPageMetadata,
  buildBreadcrumbSchema,
  buildWebPageSchema,
  buildUrl,
} from "@/lib/seo/index";
import { HistoryPageLayout } from "@/components/history/HistoryPageLayout";
import { AeoBlock } from "@/components/history/AeoBlock";
import { HistorySidebar } from "@/components/history/HistorySidebar";
import type { SidebarItem } from "@/components/history/HistorySidebar";
import { ComparisonTable } from "@/components/history/ComparisonTable";

export async function generateStaticParams() {
  return civilizationComparisons.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getCivilizationBySlug(slug);
  if (!item) return {};

  return buildPageMetadata({
    title: item.title + " | Civilization Comparisons | Sanatan History",
    description: item.metaDescription,
    path: "/sanatan-history/civilizations/" + slug,
  });
}

export default async function CivilizationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getCivilizationBySlug(slug);
  if (!item) notFound();

  const pageUrl = "/sanatan-history/civilizations/" + item.id;

  const breadcrumbSchema = buildBreadcrumbSchema([
    { label: "Home", href: "/" },
    { label: "Sanatan History", href: "/sanatan-history" },
    { label: "Civilizations", href: "/sanatan-history" },
    { label: item.title, href: pageUrl },
  ]);

  const pageSchema = buildWebPageSchema({
    name: item.title,
    description: item.metaDescription,
    url: buildUrl(pageUrl),
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Sanatan History", href: "/sanatan-history" },
      { label: item.title, href: pageUrl },
    ],
  });

  // Build sidebar from related entities
  const sidebarItems: SidebarItem[] = [
    ...item.relatedSites
      .map((id) => {
        const site = getSiteById(id);
        if (!site) return null;
        return {
          id: site.id,
          name: site.name,
          type: "site" as const,
          href: `/sanatan-history/sites/${site.id}`,
        };
      })
      .filter((x): x is SidebarItem => x !== null),
    ...item.relatedEras
      .map((id) => {
        const era = getEraById(id);
        if (!era) return null;
        return {
          id: era.id,
          name: era.name,
          type: "era" as const,
          href: `/sanatan-history/eras/${era.id}`,
        };
      })
      .filter((x): x is SidebarItem => x !== null),
    ...item.relatedEvidence
      .map((id) => {
        const e = getEvidenceById(id);
        if (!e) return null;
        return {
          id: e.id,
          name: e.claim,
          type: "evidence" as const,
          href: `/sanatan-history/evidence/${e.id}`,
        };
      })
      .filter((x): x is SidebarItem => x !== null),
  ];

  return (
    <HistoryPageLayout
      title={item.title}
      subtitle={item.metaDescription}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Sanatan History", href: "/sanatan-history" },
        { label: "Civilizations", href: "/sanatan-history" },
        { label: item.title, href: pageUrl },
      ]}
      schemas={[breadcrumbSchema, pageSchema]}
      sidebar={
        sidebarItems.length > 0 ? (
          <HistorySidebar items={sidebarItems} />
        ) : undefined
      }
    >
      {/* AEO Block */}
      <AeoBlock text={item.keyInsight} />

      {/* Entities Bar */}
      <div className="glass-card rounded-2xl border border-white/5 p-5 mb-8">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Globe className="w-4 h-4 text-orange-400" />
            <span className="font-semibold text-orange-400">{item.entityA}</span>
            <span className="text-muted-foreground/50">vs</span>
            <span className="font-semibold text-sky-400">{item.entityB}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="glass-card rounded-2xl border border-white/5 p-6 mb-8">
        <h2 className="font-display text-xl font-semibold text-foreground mb-4">
          Overview
        </h2>
        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
          {item.description}
        </p>
      </div>

      {/* Comparison Table */}
      <div className="glass-card rounded-2xl border border-white/5 p-6 mb-8">
        <h2 className="font-display text-xl font-semibold text-foreground mb-4">
          Timeline Comparison
        </h2>
        <ComparisonTable
          comparisonPoints={item.comparisonPoints}
          entityA={item.entityA}
          entityB={item.entityB}
        />
      </div>

      {/* Key Insight */}
      <div className="glass-card rounded-2xl border border-orange-500/20 bg-orange-950/10 p-6 mb-8">
        <h2 className="font-display text-xl font-semibold text-foreground mb-4">
          Key Insight
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {item.keyInsight}
        </p>
      </div>
    </HistoryPageLayout>
  );
}
