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

const Index = () => {
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
};

export default Index;
