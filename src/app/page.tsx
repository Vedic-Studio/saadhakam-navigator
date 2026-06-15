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
  title:
    "Sadhaka: meaning and an open library for Sanatan Dharma",
  description:
    "A sadhaka is a committed practitioner on a spiritual path. Sadhaka is a free, source-grounded library for Sanatan Dharma, the shastras, and daily sadhana.",
  alternates: {
    canonical: "https://www.opensadhaka.com",
  },
  openGraph: {
    title:
      "Sadhaka: meaning and an open library for Sanatan Dharma",
    description:
      "A sadhaka is a committed practitioner on a spiritual path. Sadhaka is a free, source-grounded library for Sanatan Dharma, the shastras, and daily sadhana.",
    url: "https://www.opensadhaka.com",
  },
};

export default function HomePage() {
  const faqSchema = buildFaqSchema(homepageFaqs);
  const webPageSchema = buildWebPageSchema({
    name: "Sadhaka: meaning and an open library for Sanatan Dharma",
    description:
      "A sadhaka is a committed practitioner on a spiritual path. Sadhaka is a free, source-grounded library for Sanatan Dharma, the shastras, and daily sadhana.",
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
