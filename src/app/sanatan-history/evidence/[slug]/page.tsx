import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { evidenceItems, getEvidenceById } from "@/data/evidence";
import { getResearcherById } from "@/data/researchers";
import { getSiteById } from "@/data/sites";
import {
  buildPageMetadata,
  buildBreadcrumbSchema,
  buildScholarlyArticleSchema,
  buildUrl,
} from "@/lib/seo/index";
import { HistoryPageLayout } from "@/components/history/HistoryPageLayout";
import { AeoBlock } from "@/components/history/AeoBlock";
import { HistorySidebar } from "@/components/history/HistorySidebar";
import type { SidebarItem } from "@/components/history/HistorySidebar";
import { EvidenceStatusBadge } from "@/components/history/EvidenceStatusBadge";
import { CounterArgumentsSection } from "@/components/history/CounterArgumentsSection";

export async function generateStaticParams() {
  return evidenceItems.map((item) => ({ slug: item.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getEvidenceById(slug);
  if (!item) return {};

  return buildPageMetadata({
    title: item.claim + " | Evidence | Sanatan History",
    description: item.metaDescription,
    path: "/sanatan-history/evidence/" + slug,
  });
}

export default async function EvidenceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getEvidenceById(slug);
  if (!item) notFound();

  const claimTruncated =
    item.claim.length > 60 ? item.claim.slice(0, 57) + "..." : item.claim;

  const breadcrumbSchema = buildBreadcrumbSchema([
    { label: "Home", href: "/" },
    { label: "Sanatan History", href: "/sanatan-history" },
    { label: "Evidence", href: "/sanatan-history" },
    {
      label: claimTruncated,
      href: "/sanatan-history/evidence/" + item.id,
    },
  ]);

  const articleSchema = buildScholarlyArticleSchema({
    headline: item.claim,
    description: item.metaDescription,
    url: buildUrl("/sanatan-history/evidence/" + item.id),
    about: item.claim,
  });

  // Build sidebar items
  const sidebarItems: SidebarItem[] = [
    ...item.relatedResearchers
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
    ...item.relatedSites
      .map((id) => {
        const s = getSiteById(id);
        if (!s) return null;
        return {
          id: s.id,
          name: s.name,
          type: "site" as const,
          href: `/sanatan-history/sites/${s.id}`,
        };
      })
      .filter((x): x is SidebarItem => x !== null),
  ];

  return (
    <HistoryPageLayout
      title={item.claim}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Sanatan History", href: "/sanatan-history" },
        { label: "Evidence", href: "/sanatan-history" },
        {
          label: claimTruncated,
          href: `/sanatan-history/evidence/${item.id}`,
        },
      ]}
      schemas={[breadcrumbSchema, articleSchema]}
      sidebar={
        sidebarItems.length > 0 ? (
          <HistorySidebar items={sidebarItems} />
        ) : undefined
      }
    >
      {/* AEO Block */}
      <AeoBlock text={item.evidence} />

      {/* Evidence Status */}
      <div className="mb-8">
        <EvidenceStatusBadge status={item.status} size="md" />
      </div>

      {/* Full Description */}
      <div className="glass-card rounded-2xl border border-white/5 p-6 mb-8">
        <h2 className="font-display text-xl font-semibold text-foreground mb-4">
          Detailed Analysis
        </h2>
        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
          {item.fullDescription}
        </p>
      </div>

      {/* Methodology */}
      <div className="glass-card rounded-2xl border border-white/5 p-6 mb-8">
        <h2 className="font-display text-xl font-semibold text-foreground mb-4">
          Methodology
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {item.methodology}
        </p>
      </div>

      {/* Counter-Arguments */}
      <CounterArgumentsSection
        counterArguments={item.counterArguments ?? []}
      />

      {/* Falsifiability Criteria */}
      {item.falsifiabilityCriteria && (
        <div className="glass-card rounded-2xl border border-orange-500/20 bg-orange-500/5 p-6 mb-8">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            Falsifiability Criteria
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {item.falsifiabilityCriteria}
          </p>
        </div>
      )}

      {/* Verify Yourself */}
      {item.verifyYourself && (
        <div className="glass-card rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 mb-8">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            Verify Yourself
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {item.verifyYourself}
          </p>
        </div>
      )}

      {/* Supporting Media */}
      {item.supportingMedia && item.supportingMedia.length > 0 && (
        <div className="glass-card rounded-2xl border border-white/5 p-6 mb-8">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            Supporting Media & Resources
          </h2>
          <ul className="space-y-3">
            {item.supportingMedia.map((media, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-orange-400 mt-0.5 shrink-0">
                  <ExternalLink className="w-4 h-4" />
                </span>
                <div>
                  {media.url ? (
                    <a
                      href={media.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-foreground hover:text-orange-400 transition-colors"
                    >
                      {media.description}
                    </a>
                  ) : (
                    <span className="text-sm text-foreground">
                      {media.description}
                    </span>
                  )}
                  <span className="block text-xs text-muted-foreground/60 mt-0.5">
                    {media.source} · {media.type}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </HistoryPageLayout>
  );
}
