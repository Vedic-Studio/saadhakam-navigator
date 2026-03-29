import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { sites, getSiteById } from "@/data/sites";
import { getResearcherById } from "@/data/researchers";
import { getEvidenceById } from "@/data/evidence";
import { getEraById } from "@/data/eras";
import {
  buildPageMetadata,
  buildBreadcrumbSchema,
  buildArchaeologicalSiteSchema,
  buildUrl,
} from "@/lib/seo/index";
import { HistoryPageLayout } from "@/components/history/HistoryPageLayout";
import { AeoBlock } from "@/components/history/AeoBlock";
import { HistorySidebar } from "@/components/history/HistorySidebar";
import type { SidebarItem } from "@/components/history/HistorySidebar";
import { EvidenceStatusBadge } from "@/components/history/EvidenceStatusBadge";

export async function generateStaticParams() {
  return sites.map((site) => ({ slug: site.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const site = getSiteById(slug);
  if (!site) return {};

  return buildPageMetadata({
    title: site.name + " | Archaeological Sites | Sanatan History",
    description: site.metaDescription,
    path: "/sanatan-history/sites/" + slug,
  });
}

export default async function SiteDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const site = getSiteById(slug);
  if (!site) notFound();

  const breadcrumbSchema = buildBreadcrumbSchema([
    { label: "Home", href: "/" },
    { label: "Sanatan History", href: "/sanatan-history" },
    { label: "Sites", href: "/sanatan-history" },
    { label: site.name, href: "/sanatan-history/sites/" + site.id },
  ]);

  const siteSchema = buildArchaeologicalSiteSchema({
    name: site.name,
    description: site.metaDescription,
    url: buildUrl("/sanatan-history/sites/" + site.id),
    latitude: site.coordinates?.lat ?? 0,
    longitude: site.coordinates?.lng ?? 0,
    dateRange: site.dateRange,
    keyFindings: site.keyFindings,
  });

  // Build sidebar items, filtering out unresolved lookups
  const sidebarItems: SidebarItem[] = [
    ...site.relatedResearchers
      .map((id) => {
        const r = getResearcherById(id);
        if (!r) return null;
        return {
          id: r.id,
          name: r.name,
          type: "researcher" as const,
          href: `/sanatan-history/researchers/${r.id}`,
        };
      })
      .filter((x): x is SidebarItem => x !== null),
    ...site.relatedEvidence
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
    ...site.relatedEras
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
  ];

  return (
    <HistoryPageLayout
      title={site.name}
      subtitle={site.metaDescription}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Sanatan History", href: "/sanatan-history" },
        { label: "Sites", href: "/sanatan-history" },
        { label: site.name, href: `/sanatan-history/sites/${site.id}` },
      ]}
      schemas={[breadcrumbSchema, siteSchema]}
      sidebar={
        sidebarItems.length > 0 ? (
          <HistorySidebar items={sidebarItems} />
        ) : undefined
      }
    >
      {/* AEO Block */}
      <AeoBlock text={site.significance} />

      {/* Location & Date Range Info Bar */}
      <div className="glass-card rounded-2xl border border-white/5 p-5 mb-8">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-orange-400" />
            <span>{site.location}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground/80">Period:</span>{" "}
            {site.dateRange}
          </div>
          <EvidenceStatusBadge status={site.evidenceType} />
        </div>
      </div>

      {/* Description */}
      <div className="glass-card rounded-2xl border border-white/5 p-6 mb-8">
        <h2 className="font-display text-xl font-semibold text-foreground mb-4">
          Overview
        </h2>
        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
          {site.description}
        </p>
      </div>

      {/* Key Findings */}
      {site.keyFindings.length > 0 && (
        <div className="glass-card rounded-2xl border border-white/5 p-6 mb-8">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            Key Findings
          </h2>
          <ul className="space-y-3">
            {site.keyFindings.map((finding, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0 text-sm font-medium">
                  {i + 1}
                </span>
                <span className="text-muted-foreground text-sm leading-relaxed">
                  {finding}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </HistoryPageLayout>
  );
}
