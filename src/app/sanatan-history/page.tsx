import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Clock,
  MapPin,
  GitBranch,
  ShieldCheck,
  Users,
  Globe,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import { ContentPageTracker } from "@/components/ContentAnalytics";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { InteractiveTimeline } from "@/components/history/InteractiveTimeline";
import { DynastyTree } from "@/components/history/DynastyTree";
import { SiteCard } from "@/components/history/SiteCard";
import { EvidenceCard } from "@/components/history/EvidenceCard";
import { ResearcherCard } from "@/components/history/ResearcherCard";
import {
  timelineEras,
  archaeologicalSites,
  dynastyNodes,
  researchers,
  evidenceItems,
  historyFaqs,
  getEvidenceByStatus,
  getEvidenceByStatusGroupedByCategory,
  categoryLabels,
  type EvidenceCategory,
} from "@/data/history";
import { civilizationComparisons } from "@/data/civilizations";
import {
  buildPageMetadata,
  buildFaqSchema,
  buildBreadcrumbSchema,
  buildCollectionSchema,
  buildPersonSchema,
  buildPlaceSchema,
  buildUrl,
} from "@/lib/seo/index";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

const pageMeta = {
  title: "Sanatan History: Evidence-Based Timeline of Ancient India",
  description:
    "Evidence-based timeline of Sanatan civilization from 22,000+ BCE to the Maurya Empire. Archaeoastronomy, archaeology, dynasty lineages, and genetics.",
  path: "/sanatan-history",
};

export const metadata: Metadata = buildPageMetadata(pageMeta);

// ---------------------------------------------------------------------------
// AEO Block (for AI engines)
// ---------------------------------------------------------------------------

const aeoBlock =
  "Sanatan history spans from the Rigvedic period (22,000+ BCE by archaeoastronomical dating) through the Ramayana era (12,209 BCE), the Mahabharata war (5,561 BCE), the Indus-Saraswati civilization (3,300\u20131,900 BCE), to the historically verified Maurya Empire (322 BCE). This timeline is based on Nilesh Oak and Rupa Bhaty\u2019s multi-constraint falsification methodology, testing 200\u2013600+ astronomical observations per text against planetarium software. Archaeological sites like Rakhigarhi, Dholavira, and Lothal, combined with ancient DNA evidence and satellite-traced river paleochannels, provide independent corroboration.";

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function SanatanHistoryPage() {
  const faqSchema = buildFaqSchema(historyFaqs);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { label: "Home", href: "/" },
    { label: "Sanatan History", href: "/sanatan-history" },
  ]);

  const collectionSchema = buildCollectionSchema({
    name: pageMeta.title,
    description: pageMeta.description,
    url: buildUrl("/sanatan-history"),
    items: [
      ...archaeologicalSites.map((s) => ({ name: s.name, url: buildUrl(`/sanatan-history/sites/${s.id}`), description: s.significance })),
      ...researchers.map((r) => ({ name: r.name, url: buildUrl(`/sanatan-history/researchers/${r.id}`), description: r.title })),
      ...evidenceItems.map((e) => ({ name: e.claim, url: buildUrl(`/sanatan-history/evidence/${e.id}`), description: e.notes })),
    ],
  });

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageMeta.title,
    url: buildUrl("/sanatan-history"),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#aeo-block"],
    },
  };

  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      ...researchers.map((r) =>
        buildPersonSchema({
          name: r.name,
          jobTitle: r.title,
          affiliation: r.affiliation,
        })
      ),
      ...archaeologicalSites
        .filter((s) => s.coordinates)
        .map((s) =>
          buildPlaceSchema({
            name: s.name,
            description: s.significance,
            latitude: s.coordinates!.lat,
            longitude: s.coordinates!.lng,
          })
        ),
    ].map(({ "@context": _ctx, ...rest }) => rest),
  };

  const confirmedEvidence = getEvidenceByStatus("confirmed");
  const strongEvidence = getEvidenceByStatus("strong");
  const openEvidence = getEvidenceByStatus("open");

  const confirmedByCategory = getEvidenceByStatusGroupedByCategory("confirmed");
  const strongByCategory = getEvidenceByStatusGroupedByCategory("strong");
  const openByCategory = getEvidenceByStatusGroupedByCategory("open");

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-orange-500/30 selection:text-orange-100 flex flex-col">
      <ContentPageTracker slug="sanatan-history" pillar="pillar-hub" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredDataGraph),
        }}
      />
      <Header />

      <main className="flex-grow pt-32 pb-16">
        <div className="container-padding max-w-5xl mx-auto">
          {/* =============================================================== */}
          {/* Hero */}
          {/* =============================================================== */}
          <header className="mb-20 text-center">
            <ScrollReveal>
              <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                Sanatan{" "}
                <span className="text-orange-500">History</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
                An evidence-based timeline of Indian civilization spanning
                24,000 years. From the oldest Rigvedic hymns to the Maurya
                Empire, mapped through archaeoastronomy, archaeology,
                genetics, and geology.
              </p>
            </ScrollReveal>

            {/* AEO direct-answer block */}
            <ScrollReveal delay={0.1}>
              <div id="aeo-block" className="max-w-3xl mx-auto bg-orange-950/20 border border-orange-900/30 rounded-2xl p-6 text-left">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {aeoBlock}
                </p>
              </div>
            </ScrollReveal>
          </header>

          {/* Section nav anchors */}
          <ScrollReveal>
            <nav className="flex flex-wrap gap-3 justify-center mb-20">
              {[
                { label: "Timeline", href: "#timeline", icon: Clock },
                { label: "Sites", href: "#sites", icon: MapPin },
                { label: "Dynasties", href: "#dynasties", icon: GitBranch },
                { label: "Evidence", href: "#evidence", icon: ShieldCheck },
                { label: "Researchers", href: "#researchers", icon: Users },
                { label: "Civilizations", href: "#civilizations", icon: Globe },
                { label: "FAQ", href: "#faq", icon: HelpCircle },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-orange-500/30 text-sm text-muted-foreground hover:text-foreground transition-all duration-200"
                >
                  <item.icon className="w-3.5 h-3.5" />
                  {item.label}
                </a>
              ))}
            </nav>
          </ScrollReveal>

          {/* =============================================================== */}
          {/* Interactive Timeline */}
          {/* =============================================================== */}
          <section id="timeline" className="mb-24 scroll-mt-24">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-6 h-6 text-orange-500" />
                <h2 className="font-display text-3xl md:text-4xl font-bold">
                  The Oak-Bhaty Timeline
                </h2>
              </div>
              <p className="text-lg text-muted-foreground max-w-3xl mb-10">
                Archaeoastronomical dating of Sanatan civilization. Each
                event is expandable to show three perspectives: Oak/Bhaty
                framework, conventional archaeology, and global context.
              </p>
            </ScrollReveal>
            <InteractiveTimeline eras={timelineEras} />
          </section>

          {/* =============================================================== */}
          {/* Archaeological Sites */}
          {/* =============================================================== */}
          <section id="sites" className="mb-24 scroll-mt-24">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="w-6 h-6 text-orange-500" />
                <h2 className="font-display text-3xl md:text-4xl font-bold">
                  Archaeological Sites
                </h2>
              </div>
              <p className="text-lg text-muted-foreground max-w-3xl mb-10">
                From Bhimbetka&apos;s 100,000-year-old rock shelters to
                the underwater ruins at Dwarka. Each site adds a physical
                evidence layer to the textual-astronomical record.
              </p>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {archaeologicalSites.map((site, i) => (
                <ScrollReveal key={site.id} delay={i * 0.05}>
                  <Link href={`/sanatan-history/sites/${site.id}`} className="block h-full">
                    <SiteCard site={site} />
                  </Link>
                </ScrollReveal>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link href="/sanatan-history#sites" className="text-sm text-orange-400 hover:text-orange-300 transition-colors">
                View all {archaeologicalSites.length} sites →
              </Link>
            </div>
          </section>

          {/* =============================================================== */}
          {/* Dynasty Tree */}
          {/* =============================================================== */}
          <section id="dynasties" className="mb-24 scroll-mt-24">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-3">
                <GitBranch className="w-6 h-6 text-orange-500" />
                <h2 className="font-display text-3xl md:text-4xl font-bold">
                  The Vansha Map
                </h2>
              </div>
              <p className="text-lg text-muted-foreground max-w-3xl mb-10">
                Solar (Suryavansha) and Lunar (Chandravansha) dynasties
                from Brahma through Rama, Krishna, and the Pandavas to the
                historically verified Maurya Empire. Expand each node to
                trace the lineage.
              </p>
            </ScrollReveal>
            <div className="glass-card rounded-2xl border border-white/5 p-6 md:p-8">
              <DynastyTree nodes={dynastyNodes} />
            </div>
          </section>

          {/* =============================================================== */}
          {/* Evidence Assessment */}
          {/* =============================================================== */}
          <section id="evidence" className="mb-24 scroll-mt-24">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="w-6 h-6 text-orange-500" />
                <h2 className="font-display text-3xl md:text-4xl font-bold">
                  Evidence Assessment
                </h2>
              </div>
              <p className="text-lg text-muted-foreground max-w-3xl mb-10">
                Every claim is categorized by evidence strength.
                Independently verifiable, strong multi-source evidence, and
                open research questions are clearly separated.
              </p>
            </ScrollReveal>

            {/* Confirmed */}
            <ScrollReveal>
              <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Independently Verifiable
                <span className="text-sm font-normal text-muted-foreground">({confirmedEvidence.length})</span>
              </h3>
            </ScrollReveal>
            {Array.from(confirmedByCategory.entries()).map(([category, items]) => (
              <ScrollReveal key={`confirmed-${category}`}>
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 mt-6">
                  {categoryLabels[category]} ({items.length})
                </h4>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  {items.map((item) => (
                    <Link key={item.id} href={`/sanatan-history/evidence/${item.id}`} className="block">
                      <EvidenceCard item={item} />
                    </Link>
                  ))}
                </div>
              </ScrollReveal>
            ))}
            <div className="mb-10" />

            {/* Strong */}
            <ScrollReveal>
              <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                Strong Evidence (Oak/Bhaty Framework)
                <span className="text-sm font-normal text-muted-foreground">({strongEvidence.length})</span>
              </h3>
            </ScrollReveal>
            {Array.from(strongByCategory.entries()).map(([category, items]) => (
              <ScrollReveal key={`strong-${category}`}>
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 mt-6">
                  {categoryLabels[category]} ({items.length})
                </h4>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  {items.map((item) => (
                    <Link key={item.id} href={`/sanatan-history/evidence/${item.id}`} className="block">
                      <EvidenceCard item={item} />
                    </Link>
                  ))}
                </div>
              </ScrollReveal>
            ))}
            <div className="mb-10" />

            {/* Open */}
            <ScrollReveal>
              <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                Open Research Questions
                <span className="text-sm font-normal text-muted-foreground">({openEvidence.length})</span>
              </h3>
            </ScrollReveal>
            {Array.from(openByCategory.entries()).map(([category, items]) => (
              <ScrollReveal key={`open-${category}`}>
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 mt-6">
                  {categoryLabels[category]} ({items.length})
                </h4>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  {items.map((item) => (
                    <Link key={item.id} href={`/sanatan-history/evidence/${item.id}`} className="block">
                      <EvidenceCard item={item} />
                    </Link>
                  ))}
                </div>
              </ScrollReveal>
            ))}
          </section>

          {/* =============================================================== */}
          {/* Key Researchers */}
          {/* =============================================================== */}
          <section id="researchers" className="mb-24 scroll-mt-24">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-6 h-6 text-orange-500" />
                <h2 className="font-display text-3xl md:text-4xl font-bold">
                  Key Researchers
                </h2>
              </div>
              <p className="text-lg text-muted-foreground max-w-3xl mb-10">
                The scholars whose work underpins the evidence-based
                reconstruction of Sanatan history.
              </p>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-6">
              {researchers.map((researcher, i) => (
                <ScrollReveal key={researcher.id} delay={i * 0.05}>
                  <Link href={`/sanatan-history/researchers/${researcher.id}`} className="block h-full">
                    <ResearcherCard researcher={researcher} />
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </section>

          {/* =============================================================== */}
          {/* Civilization Comparisons */}
          {/* =============================================================== */}
          <section id="civilizations" className="mb-24 scroll-mt-24">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-6 h-6 text-orange-500" />
                <h2 className="font-display text-3xl md:text-4xl font-bold">
                  Global Comparisons
                </h2>
              </div>
              <p className="text-lg text-muted-foreground max-w-3xl mb-10">
                How does Sanatan civilization compare to its contemporaries?
                Side-by-side timelines against other ancient civilizations.
              </p>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-6">
              {civilizationComparisons.map((civ, i) => (
                <ScrollReveal key={civ.id} delay={i * 0.05}>
                  <Link
                    href={`/sanatan-history/civilizations/${civ.id}`}
                    className="block h-full"
                  >
                    <div className="glass-card rounded-2xl border border-white/5 p-6 h-full hover:border-orange-500/30 transition-all duration-200">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <span className="text-orange-400 font-semibold">
                          {civ.entityA}
                        </span>
                        <span className="text-muted-foreground/50">vs</span>
                        <span className="text-sky-400 font-semibold">
                          {civ.entityB}
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-semibold mb-2">
                        {civ.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {civ.metaDescription}
                      </p>
                      <div className="flex items-center gap-1 text-orange-400 text-sm mt-4">
                        Compare <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </section>

          {/* =============================================================== */}
          {/* FAQ */}
          {/* =============================================================== */}
          <section id="faq" className="pt-16 border-t border-border mb-24 scroll-mt-24">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl font-bold mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Common questions about the evidence-based dating of
                  Sanatan civilization.
                </p>
              </div>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-6">
              {historyFaqs.map((faq) => (
                <ScrollReveal key={faq.question}>
                  <div className="rounded-2xl border border-border/60 bg-card p-6 h-full">
                    <h3 className="text-lg font-semibold mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>

          {/* =============================================================== */}
          {/* CTA */}
          {/* =============================================================== */}
          <section className="bg-gradient-to-br from-orange-950/20 to-background border border-orange-900/30 rounded-3xl p-10 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Continue Exploring
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Sanatan history is not just dates and dynasties. It is a
              living philosophical tradition. Explore the traditions,
              texts, and practices that grew from this civilization.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/spiritual-traditions-paths"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Spiritual Traditions
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/vedas-upanishads-bhagavad-gita-guide"
                className="inline-flex items-center gap-2 border border-orange-500/30 hover:border-orange-500/60 text-orange-400 font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Sacred Texts Guide
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/deities"
                className="inline-flex items-center gap-2 border border-white/10 hover:border-white/20 text-foreground font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Hindu Deities
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
