import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DailyPracticeCard } from "@/components/jyotish/DailyPracticeCard";
import { JyotishDisclaimer } from "@/components/jyotish/JyotishDisclaimer";
import { PanchangClock } from "@/components/jyotish/visuals/PanchangClock";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { buildBreadcrumbSchema, buildPageMetadata } from "@/lib/seo";
import { getDailyJyotishGuidance } from "@/lib/jyotish-daily";

export const metadata = buildPageMetadata({
    title: "Today in Jyotish",
    description: "Daily Jyotish guidance grounded in vara and enriched by 2026 nakshatra and tithi data when available.",
    path: "/jyotish/today",
});

export default function JyotishTodayPage() {
    const guidance = getDailyJyotishGuidance(new Date());
    const breadcrumbSchema = buildBreadcrumbSchema([
        { label: "Home", href: "/" },
        { label: "Jyotish", href: "/jyotish" },
        { label: "Today", href: "/jyotish/today" },
    ]);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <Header />
            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-5xl mx-auto">
                    <ScrollReveal>
                        <header className="mb-12 mt-6">
                            <p className="text-sm mb-4 text-orange-400 uppercase tracking-widest">Daily Guidance</p>
                            <h1 className="font-display text-4xl md:text-6xl font-black mb-6">Today in Jyotish</h1>
                            <p className="text-xl text-muted-foreground max-w-4xl mb-8">
                                Vara guidance is always available. Nakshatra and tithi are displayed when the date is covered by the local 2026 calendar dataset.
                            </p>
                            <JyotishDisclaimer compact />
                        </header>
                    </ScrollReveal>

                    <ScrollReveal delay={0.1}>
                        <div className="mb-12 flex justify-center">
                            <PanchangClock
                                size={320}
                                nakshatra={guidance.nakshatra?.name}
                                tithi={guidance.tithi?.name}
                            />
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.15}>
                        <div className="mb-10">
                            <DailyPracticeCard />
                        </div>
                    </ScrollReveal>

                    {!guidance.hasCalendarData && (
                        <div className="rounded-2xl border border-border/50 bg-card p-6 text-muted-foreground">
                            The local nakshatra and tithi calendar currently covers 2026 dates. Outside that range, this page still offers vara-based guidance so the practice layer remains useful.
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}