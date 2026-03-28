import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Clock,
  MapPin,
  GitBranch,
  ShieldCheck,
  Users,
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
} from "@/data/history";
import {
  buildPageMetadata,
  buildFaqSchema,
  buildBreadcrumbSchema,
} from "@/lib/seo/index";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

const pageMeta = {
  title: "Sanatan History: Evidence-Based Timeline of Ancient India",
  description:
    "Explore the evidence-based timeline of Sanatan civilization from 22,000+ BCE to the Maurya Empire. Archaeoastronomy, archaeological sites, dynasty lineages, and genetic evidence mapped across 24,000 years.",
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

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pageMeta.title,
    description: pageMeta.description,
    url: "https://www.opensadhaka.com/sanatan-history",
  };

  const confirmedEvidence = getEvidenceByStatus("confirmed");
  const strongEvidence = getEvidenceByStatus("strong");
  const openEvidence = getEvidenceByStatus("open");

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
              <div className="max-w-3xl mx-auto bg-orange-950/20 border border-orange-900/30 rounded-2xl p-6 text-left">
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
                  <SiteCard site={site} />
                </ScrollReveal>
              ))}
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
              </h3>
              <div className="grid md:grid-cols-2 gap-4 mb-10">
                {confirmedEvidence.map((item) => (
                  <EvidenceCard key={item.id} item={item} />
                ))}
              </div>
            </ScrollReveal>

            {/* Strong */}
            <ScrollReveal>
              <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                Strong Evidence (Oak/Bhaty Framework)
              </h3>
              <div className="grid md:grid-cols-2 gap-4 mb-10">
                {strongEvidence.map((item) => (
                  <EvidenceCard key={item.id} item={item} />
                ))}
              </div>
            </ScrollReveal>

            {/* Open */}
            <ScrollReveal>
              <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                Open Research Questions
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {openEvidence.map((item) => (
                  <EvidenceCard key={item.id} item={item} />
                ))}
              </div>
            </ScrollReveal>
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
                  <ResearcherCard researcher={researcher} />
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
