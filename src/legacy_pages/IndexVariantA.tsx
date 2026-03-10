// @ts-nocheck

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCTA } from "@/components/MobileCTA";
import { HeroSectionVariantA } from "@/components/landing/HeroSectionVariantA";
import { PillarsSectionVariantA } from "@/components/landing/PillarsSectionVariantA";
import { TeachingsCarousel } from "@/components/landing/TeachingsCarousel";
import { PhilosophyGrid } from "@/components/landing/PhilosophyGrid";
import { SadhakaIntroduction } from "@/components/landing/SadhakaIntroduction";
import { SocialProof } from "@/components/landing/SocialProof";
import { ConversionSectionVariantA } from "@/components/landing/ConversionSectionVariantA";
import { FAQSection } from "@/components/landing/FAQSection";

const IndexVariantA = () => {
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-orange-500/30 selection:text-orange-100">
            <Header />
            <main className="overflow-x-hidden">
                {/* Fold 1: Hero - Science & Vibration */}
                <HeroSectionVariantA />

                {/* Fold 2: Four Pillars - The Scientific Foundation */}
                <PillarsSectionVariantA />

                {/* Fold 3: Teachings - The Ocean of Wisdom */}
                <TeachingsCarousel />

                {/* Fold 4: Philosophy Grid - Six Darshanas */}
                <PhilosophyGrid />

                {/* Fold 5: Cinematic - Ancient Civ */}
                <SadhakaIntroduction />

                {/* Fold 6: Social Proof & Trust */}
                <SocialProof />

                {/* Fold 7: CTA */}
                <ConversionSectionVariantA />

                {/* Bonus: FAQ */}
                <FAQSection />
            </main>
            <Footer />
            <MobileCTA />
        </div>
    );
};

export default IndexVariantA;