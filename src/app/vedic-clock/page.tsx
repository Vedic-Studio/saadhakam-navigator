import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JyotishDisclaimer } from "@/components/jyotish/JyotishDisclaimer";
import { VedicClockClient } from "@/components/jyotish/VedicClockClient";

export const metadata: Metadata = {
    title: "Vedic Clock MVP | Sadhaka",
    description:
        "A one-week Vedic Clock MVP inside the Next app: preset cities, browser geolocation, fixed 48-minute muhūrtas, core pañchānga fields, and visible provenance.",
    alternates: {
        canonical: "https://www.opensadhaka.com/vedic-clock",
    },
};

export default function VedicClockPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <Header />
            <main className="flex-1 pt-28 pb-16">
                <div className="container-padding mx-auto max-w-7xl">
                    <header className="max-w-4xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-500">Vedic Clock MVP</p>
                        <h1 className="mt-3 font-display text-5xl font-bold tracking-tight md:text-6xl">
                            Muhūrta rhythm without a second backend
                        </h1>
                        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                            This implementation keeps the week-one public MVP inside the Next app. The route contract and page shell are ready for deeper astronomical logic later without splitting deployment across stacks now.
                        </p>
                    </header>

                    <div className="mt-10 space-y-6">
                        <JyotishDisclaimer />
                        <VedicClockClient />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
