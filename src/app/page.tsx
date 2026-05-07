import type { Metadata } from "next";
import { buildFaqSchema, buildWebPageSchema, buildUrl } from "@/lib/seo";
import { homepageFaqs } from "@/data/homepage-faqs";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCTA } from "@/components/MobileCTA";
import { HeroSection } from "@/components/landing/HeroSection";
import { AiTutorTeaser } from "@/components/landing/AiTutorTeaser";
import { PillarsSection } from "@/components/landing/PillarsSection";
import { ProofOfDepth } from "@/components/landing/ProofOfDepth";
import { WesternBridge } from "@/components/landing/WesternBridge";
import { DiscoverSection } from "@/components/landing/DiscoverSection";
import { ConversionSection } from "@/components/landing/ConversionSection";
import { FAQSection } from "@/components/landing/FAQSection";

export const metadata: Metadata = {
  title: "Sadhaka (opensadhaka.com) — Vedanta, Upanishads, Stotras & Sanatan Dharma",
  description:
    "Sadhaka (Sanskrit: साधक, a practitioner). Also the open library of Vedanta, Upanishad study, Bhagavad Gita verse-level commentary, stotras, and daily sadhana. Free to read.",
  alternates: {
    canonical: "https://www.opensadhaka.com",
  },
  openGraph: {
    title: "Sadhaka — Open Library of Vedanta, Upanishads & Sanatan Dharma",
    description:
      "Study Sanatan Dharma from primary texts. 73+ articles, 60+ philosophical comparisons, 18 Gita chapters with verse-level Sanskrit analysis. Free to read.",
    url: "https://www.opensadhaka.com",
  },
};

export default function HomePage() {
  const faqSchema = buildFaqSchema(homepageFaqs);
  const webPageSchema = buildWebPageSchema({
    name: "Sadhaka | Encyclopedic Guide to Sanatan Dharma",
    description: "Study Sanatan Dharma from primary texts. 73 articles, 60 philosophical comparisons, 18 Gita chapters with verse-level Sanskrit analysis.",
    url: buildUrl("/"),
  });

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-orange-500/30 selection:text-orange-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main className="overflow-x-hidden">
        {/* Hero — Dharma & Endurance */}
        <HeroSection />

        {/* AI Tutor — Coming Soon teaser */}
        <AiTutorTeaser />

        {/* Knowledge Foundation — Verified content stats */}
        <PillarsSection />

        {/* Proof of Depth — Real comparison excerpt */}
        <ProofOfDepth />

        {/* Western Bridge — Cross-cultural comparisons */}
        <WesternBridge />

        {/* Content Grid — Full category navigation */}
        <DiscoverSection />

        {/* Early Access — Waitlist CTA */}
        <ConversionSection />

        {/* FAQ */}
        <FAQSection />
      </main>
      <Footer />
      <MobileCTA />
    </div>
  );
}
