import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCTA } from "@/components/MobileCTA";
import { HeroSection } from "@/components/landing/HeroSection";
import { SutraCapabilities } from "@/components/landing/SutraCapabilities";
import { AncientCivilization } from "@/components/landing/AncientCivilization";
import { FeatureShowcase } from "@/components/landing/FeatureShowcase";
import { SocialProof } from "@/components/landing/SocialProof";
import { ConversionSection } from "@/components/landing/ConversionSection";
import { FAQSection } from "@/components/landing/FAQSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground">
      <Header />
      <main>
        {/* Fold 1: Hero - Sutra Intro */}
        <HeroSection />

        {/* Fold 2: Sticky Scroll - Capabilities */}
        <SutraCapabilities />

        {/* Fold 3: Cinematic - Ancient Civ */}
        <AncientCivilization />

        {/* Fold 4: Sticky Scroll - Features (Pathfinder, Map, Tracker) */}
        <FeatureShowcase />

        {/* Fold 5/6: Social Proof & Trust */}
        <SocialProof />

        {/* Fold 7: CTA */}
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
