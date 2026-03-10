// @ts-nocheck

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCTA } from "@/components/MobileCTA";
import { HeroSectionVariantC } from "@/components/landing/HeroSectionVariantC";
import { PillarsSectionVariantC } from "@/components/landing/PillarsSectionVariantC";
import { TeachingsCarousel } from "@/components/landing/TeachingsCarousel";
import { PhilosophyGrid } from "@/components/landing/PhilosophyGrid";
import { SadhakaIntroduction } from "@/components/landing/SadhakaIntroduction";
import { SocialProof } from "@/components/landing/SocialProof";
import { ConversionSectionVariantC } from "@/components/landing/ConversionSectionVariantC";
import { FAQSection } from "@/components/landing/FAQSection";

const IndexVariantC = () => {
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-orange-500/30 selection:text-orange-100">
            <Header />
            <main className="overflow-x-hidden">
                {/* Fold 1: Hero - Self-Empowerment */}
                <HeroSectionVariantC />

                {/* Fold 2: Four Pillars - The Self-Empowerment Foundation */}
                <PillarsSectionVariantC />

                {/* Fold 3: Teachings - The Ocean of Wisdom */}
                <TeachingsCarousel />

                {/* Fold 4: Philosophy Grid - Six Darshanas */}
                <PhilosophyGrid />

                {/* Fold 5: Cinematic - Ancient Civ */}
                <SadhakaIntroduction />

                {/* Fold 6: Social Proof & Trust */}
                <SocialProof />

                {/* Fold 7: CTA */}
                <ConversionSectionVariantC />

                {/* Bonus: FAQ */}
                <FAQSection />
            </main>
            <Footer />
            <MobileCTA />
        </div>
    );
};

export default IndexVariantC;