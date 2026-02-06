import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCTA } from "@/components/MobileCTA";
import { HeroSection } from "@/components/landing/HeroSection";
import { PhilosophyGrid } from "@/components/landing/PhilosophyGrid";
import { TraditionsCarousel } from "@/components/landing/TraditionsCarousel";
import { FeatureShowcase } from "@/components/landing/FeatureShowcase";
import { PracticeAtlas } from "@/components/landing/PracticeAtlas";
import { SelfAlignment } from "@/components/landing/SelfAlignment";
import { GreatsSection } from "@/components/landing/GreatsSection";
import { AvatarsAndTexts } from "@/components/landing/AvatarsAndTexts";
import { ConversionSection } from "@/components/landing/ConversionSection";
import { SocialProof } from "@/components/landing/SocialProof";
import { PillarsSection } from "@/components/landing/PillarsSection";
import { FAQSection } from "@/components/landing/FAQSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-secondary/20 selection:text-secondary-foreground">
      <Header />
      <main>
        <HeroSection />
        <PillarsSection />
        <PhilosophyGrid />
        <TraditionsCarousel />
        <FeatureShowcase />
        <PracticeAtlas />
        <SelfAlignment />
        <GreatsSection />
        <AvatarsAndTexts />
        <ConversionSection />
        <SocialProof />
        <FAQSection />
      </main>
      <Footer />
      <MobileCTA />
    </div>
  );
};

export default Index;
