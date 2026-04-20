import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JyotishDisclaimer } from "@/components/jyotish/JyotishDisclaimer";
import { PanchangClient } from "@/components/panchang/PanchangClient";
import { PanchangFaq } from "@/components/panchang/PanchangFaq";
import { panchangFaqs } from "@/data/panchang-faq";
import { buildVedicClockResponse } from "@/lib/vedic-clock";
import { buildBreadcrumbSchema, buildFaqSchema, buildPageMetadata, buildUrl, buildWebPageSchema } from "@/lib/seo";

export const revalidate = 3600;

type PanchangPageProps = {
    searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getSearchParamValue(value: string | string[] | undefined) {
    return Array.isArray(value) ? value[0] : value;
}

async function getPanchangPayload(searchParams?: Promise<Record<string, string | string[] | undefined>>) {
    const resolved = searchParams ? await searchParams : undefined;
    const date = getSearchParamValue(resolved?.date);
    return buildVedicClockResponse(date ? { cityId: "varanasi", date } : { cityId: "varanasi" });
}

export async function generateMetadata({ searchParams }: PanchangPageProps): Promise<Metadata> {
    const payload = await getPanchangPayload(searchParams);

    return buildPageMetadata({
        title: `Today's Panchang — ${payload.panchanga.vara.name}, ${payload.panchanga.tithi.name} | Sadhaka`,
        description: `Today's panchang for ${payload.location.name}: ${payload.panchanga.vara.name}, ${payload.panchanga.tithi.name}, ${payload.panchanga.nakshatra.name}, auspicious windows, and caution periods for daily sadhana.`,
        path: "/panchang",
    });
}

export default async function PanchangPage({ searchParams }: PanchangPageProps) {
    const payload = await getPanchangPayload(searchParams);
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Panchang", href: "/panchang" },
    ];

    const webPageSchema = buildWebPageSchema({
        name: "Today's Panchang",
        description: `Daily panchang for ${payload.location.name} with vara, tithi, nakshatra, auspicious windows, and inauspicious periods.`,
        url: buildUrl("/panchang"),
        breadcrumbItems,
    });

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(breadcrumbItems)) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(panchangFaqs)) }} />

            <Header />
            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding mx-auto max-w-7xl space-y-8">
                    <JyotishDisclaimer />
                    <PanchangClient initialPayload={payload} />
                    <PanchangFaq />
                </div>
            </main>
            <Footer />
        </div>
    );
}