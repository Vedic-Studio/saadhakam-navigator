import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SadhakaCapabilities } from "@/components/landing/SadhakaCapabilities";
import { FeatureShowcase } from "@/components/landing/FeatureShowcase";
import { ConversionSection } from "@/components/landing/ConversionSection";

const AppPage = () => {
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground">
            <Header />
            <main className="pt-20">
                <section className="text-center py-20 px-4">
                    <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">The Sadhaka App</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Your personal companion for the spiritual journey. Structured learning, daily practice, and AI-guided wisdom.
                    </p>
                </section>

                {/* Fold 2: Sticky Scroll - Capabilities */}
                <SadhakaCapabilities />

                {/* Fold 4: Sticky Scroll - Features (Pathfinder, Map, Tracker) */}
                <FeatureShowcase />

                <ConversionSection />
            </main>
            <Footer />
        </div>
    );
};

export default AppPage;
