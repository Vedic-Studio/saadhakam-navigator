import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { researchers, getResearcherById } from "@/data/researchers";
import { getSiteById } from "@/data/sites";
import { getEvidenceById } from "@/data/evidence";
import {
  buildPageMetadata,
  buildBreadcrumbSchema,
  buildProfilePageSchema,
  buildUrl,
} from "@/lib/seo/index";
import { HistoryPageLayout } from "@/components/history/HistoryPageLayout";
import { AeoBlock } from "@/components/history/AeoBlock";
import { HistorySidebar } from "@/components/history/HistorySidebar";
import type { SidebarItem } from "@/components/history/HistorySidebar";
import { KeyTalksSection } from "@/components/history/KeyTalksSection";

export async function generateStaticParams() {
  return researchers.map((r) => ({ slug: r.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const researcher = getResearcherById(slug);
  if (!researcher) return {};

  return buildPageMetadata({
    title: researcher.name + " | Researcher Profile | Sanatan History",
    description: researcher.metaDescription,
    path: "/sanatan-history/researchers/" + slug,
  });
}

export default async function ResearcherDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const researcher = getResearcherById(slug);
  if (!researcher) notFound();

  const breadcrumbSchema = buildBreadcrumbSchema([
    { label: "Home", href: "/" },
    { label: "Sanatan History", href: "/sanatan-history" },
    { label: "Researchers", href: "/sanatan-history" },
    {
      label: researcher.name,
      href: "/sanatan-history/researchers/" + researcher.id,
    },
  ]);

  const profileSchema = buildProfilePageSchema({
    name: researcher.name,
    jobTitle: researcher.title,
    affiliation: researcher.affiliation,
    url: buildUrl("/sanatan-history/researchers/" + researcher.id),
    description: researcher.metaDescription,
  });

  // Build sidebar items
  const sidebarItems: SidebarItem[] = [
    ...researcher.relatedSites
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
    ...researcher.relatedEvidence
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

  // AEO text: first sentence of description, or methodology
  const aeoText =
    researcher.description.split(". ")[0] + "." ||
    researcher.methodology;

  return (
    <HistoryPageLayout
      title={researcher.name}
      subtitle={`${researcher.title} — ${researcher.affiliation}`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Sanatan History", href: "/sanatan-history" },
        { label: "Researchers", href: "/sanatan-history" },
        {
          label: researcher.name,
          href: `/sanatan-history/researchers/${researcher.id}`,
        },
      ]}
      schemas={[breadcrumbSchema, profileSchema]}
      sidebar={
        sidebarItems.length > 0 ? (
          <HistorySidebar items={sidebarItems} />
        ) : undefined
      }
    >
      {/* AEO Block */}
      <AeoBlock text={aeoText} />

      {/* Title & Affiliation Header */}
      <div className="glass-card rounded-2xl border border-white/5 p-5 mb-8">
        <div className="flex flex-wrap items-center gap-4">
          <div className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground/80">Title:</span>{" "}
            {researcher.title}
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground/80">
              Affiliation:
            </span>{" "}
            {researcher.affiliation}
          </div>
        </div>
      </div>

      {/* Description (Bio) */}
      <div className="glass-card rounded-2xl border border-white/5 p-6 mb-8">
        <h2 className="font-display text-xl font-semibold text-foreground mb-4">
          Biography
        </h2>
        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
          {researcher.description}
        </p>
      </div>

      {/* Methodology */}
      <div className="glass-card rounded-2xl border border-white/5 p-6 mb-8">
        <h2 className="font-display text-xl font-semibold text-foreground mb-4">
          Methodology
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {researcher.methodology}
        </p>
      </div>

      {/* Key Claims */}
      {researcher.keyClaims.length > 0 && (
        <div className="glass-card rounded-2xl border border-white/5 p-6 mb-8">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            Key Claims
          </h2>
          <ul className="space-y-3">
            {researcher.keyClaims.map((claim, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0 text-sm font-medium">
                  {i + 1}
                </span>
                <span className="text-muted-foreground text-sm leading-relaxed">
                  {claim}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Major Works */}
      {researcher.majorWorks.length > 0 && (
        <div className="glass-card rounded-2xl border border-white/5 p-6 mb-8">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            Major Works
          </h2>
          <ul className="space-y-2">
            {researcher.majorWorks.map((work, i) => (
              <li
                key={i}
                className="text-muted-foreground text-sm flex items-start gap-2"
              >
                <span className="text-orange-400 mt-1">•</span>
                {work}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Key Talks */}
      <KeyTalksSection keyTalks={researcher.keyTalks ?? []} />
    </HistoryPageLayout>
  );
}
