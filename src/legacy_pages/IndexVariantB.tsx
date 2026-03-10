// @ts-nocheck

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCTA } from "@/components/MobileCTA";
import { HeroSectionVariantB } from "@/components/landing/HeroSectionVariantB";
import { PillarsSectionVariantB } from "@/components/landing/PillarsSectionVariantB";
import { TeachingsCarousel } from "@/components/landing/TeachingsCarousel";
import { PhilosophyGrid } from "@/components/landing/PhilosophyGrid";
import { SadhakaIntroduction } from "@/components/landing/SadhakaIntroduction";
import { SocialProof } from "@/components/landing/SocialProof";
import { ConversionSectionVariantB } from "@/components/landing/ConversionSectionVariantB";
import { FAQSection } from "@/components/landing/FAQSection";

const IndexVariantB = () => {
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-orange-500/30 selection:text-orange-100">
            <Header />
            <main className="overflow-x-hidden">
                {/* Fold 1: Hero - Sacred & Divine */}
                <HeroSectionVariantB />

                {/* Fold 2: Four Pillars - The Sacred Foundation */}
                <PillarsSectionVariantB />

                {/* Fold 3: Teachings - The Ocean of Wisdom */}
                <TeachingsCarousel />

                {/* Fold 4: Philosophy Grid - Six Darshanas */}
                <PhilosophyGrid />

                {/* Fold 5: Cinematic - Ancient Civ */}
                <SadhakaIntroduction />

                {/* Fold 6: Social Proof & Trust */}
                <SocialProof />

                {/* Fold 7: CTA */}
                <ConversionSectionVariantB />

                {/* Bonus: FAQ */}
                <FAQSection />
            </main>
            <Footer />
            <MobileCTA />
        </div>
    );
};

export default IndexVariantB;