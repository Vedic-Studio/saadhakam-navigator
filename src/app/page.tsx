import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCTA } from "@/components/MobileCTA";
import { HeroSection } from "@/components/landing/HeroSection";
import { PillarsSection } from "@/components/landing/PillarsSection";
import { AncientCivilization } from "@/components/landing/AncientCivilization";
import { TeachingsCarousel } from "@/components/landing/TeachingsCarousel";
import { PhilosophyGrid } from "@/components/landing/PhilosophyGrid";
import { SadhakaIntroduction } from "@/components/landing/SadhakaIntroduction";
import { SocialProof } from "@/components/landing/SocialProof";
import { ConversionSection } from "@/components/landing/ConversionSection";
import { FAQSection } from "@/components/landing/FAQSection";

export const metadata: Metadata = {
  title: "Sadhaka | AI-Powered Sanatan Dharma Spiritual Companion",
  description:
    "Explore 10,000 years of Vedic wisdom with Sadhaka AI. Learn Bhagavad Gita, Vedas, Upanishads, and authentic spiritual practices. Your guide to Sanatan Dharma.",
  alternates: {
    canonical: "https://www.opensadhaka.com",
  },
  openGraph: {
    title: "Sadhaka | AI-Powered Sanatan Dharma Spiritual Companion",
    description:
      "Explore Sanatan Dharma with AI-powered spiritual guidance. Learn Bhagavad Gita, Vedas, and Upanishads.",
    url: "https://www.opensadhaka.com",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-orange-500/30 selection:text-orange-100">
      <Header />
      <main className="overflow-x-hidden">
        {/* Fold 1: Hero - Dharma & Endurance */}
        <HeroSection />

        {/* Fold 2: Four Pillars - The Foundation */}
        <PillarsSection />

        {/* Fold 3: Teachings - The Ocean of Wisdom */}
        <TeachingsCarousel />

        {/* Fold 4: Philosophy Grid - Six Darshanas */}
        <PhilosophyGrid />

        {/* Fold 5: Cinematic - Ancient Civ */}
        <AncientCivilization />

        {/* Fold 6: Subtle AI Intro */}
        <SadhakaIntroduction />

        {/* Fold 7: Social Proof & Trust */}
        <SocialProof />

        {/* Fold 8: CTA */}
        <ConversionSection />

        {/* Bonus: FAQ */}
        <FAQSection />
      </main>
      <Footer />
      <MobileCTA />
    </div>
  );
}
