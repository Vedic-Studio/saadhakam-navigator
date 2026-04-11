import type { Metadata } from "next";
import { buildBreadcrumbSchema, buildWebPageSchema, buildUrl } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JyotishDisclaimer } from "@/components/jyotish/JyotishDisclaimer";
import { VedicClockClient } from "@/components/jyotish/VedicClockClient";

export const metadata: Metadata = {
    title: "Vedic Clock — 30 Muhūrtas from Sunrise | Sadhaka",
    description:
        "A live Vedic clock modelled on the Vikram Vaidika Ghaṭi at Kashi. Thirty 48-minute muhūrtas from local sunrise, presiding devatās, and pañchānga aligned to your observer horizon.",
    alternates: {
        canonical: "https://www.opensadhaka.com/vedic-clock",
    },
    openGraph: {
        title: "Vedic Clock — 30 Muhūrtas from Sunrise",
        description:
            "Kashi Vedic Ghaṭi-inspired live clock: thirty 48-minute muhūrtas, presiding devatās, pañchānga, and sunrise/sunset for your location.",
        url: "https://www.opensadhaka.com/vedic-clock",
        type: "website",
    },
};

export default function VedicClockPage() {
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Vedic Clock", href: "/vedic-clock" },
    ];
    const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
    const webPageSchema = buildWebPageSchema({
        name: "Vedic Clock — 30 Muhurtas from Sunrise",
        description: "A live Vedic clock modelled on the Vikram Vaidika Ghati at Kashi. Thirty 48-minute muhurtas from local sunrise, presiding devatas, and panchanga aligned to your observer horizon.",
        url: buildUrl("/vedic-clock"),
        breadcrumbItems,
    });

    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <Header />
            <main className="relative flex-1 overflow-hidden pt-28 pb-20">
                {/* Ambient celestial backdrop */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.08),transparent_55%)]"
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.06),transparent_60%)]"
                />

                <div className="container-padding relative mx-auto max-w-7xl">
                    <header className="mx-auto max-w-4xl text-center">
                        <div className="inline-flex items-center gap-3 rounded-full border border-amber-400/30 bg-amber-500/5 px-4 py-1.5 backdrop-blur-md">
                            <span className="font-sanskrit text-sm text-amber-200/90">वैदिक घटी</span>
                            <span className="h-1 w-1 rounded-full bg-amber-400/60" />
                            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-300">
                                Vaidika Ghaṭī
                            </span>
                        </div>

                        <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
                            <span className="text-foreground">Thirty muhūrtas</span>
                            <br />
                            <span className="bg-gradient-to-r from-amber-200 via-orange-400 to-amber-300 bg-clip-text text-transparent">
                                from your sunrise
                            </span>
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
                            A living clock modelled on the{" "}
                            <span className="text-amber-200/90">Vikram Vaidika Ghaṭī</span> at Kashi.
                            Thirty 48-minute muhūrtas sweep from local sunrise through day and night,
                            each carrying the name of its presiding devatā and the full pañchānga of
                            the moment.
                        </p>

                        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                            <span className="inline-flex items-center gap-2">
                                <span className="h-1 w-1 rounded-full bg-amber-400" /> 30 Muhūrtas
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <span className="h-1 w-1 rounded-full bg-amber-400" /> Pañchāṅga
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <span className="h-1 w-1 rounded-full bg-amber-400" /> Ephemeris-backed
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <span className="h-1 w-1 rounded-full bg-amber-400" /> Your horizon
                            </span>
                        </div>
                    </header>

                    <div className="mt-14 space-y-8">
                        <JyotishDisclaimer compact />
                        <VedicClockClient />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
