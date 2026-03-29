import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { DeityAuraGlow } from "@/components/visuals/DeityAuraGlow";
import { getDeityColor } from "@/lib/deity-colors";
import { deities, getDeityBySlug } from "@/data/deities";
import {
    buildPageMetadata,
    buildWebPageSchema,
    buildBreadcrumbSchema,
    buildFaqSchema,
    buildUrl,
} from "@/lib/seo";
import { FeaturedImage } from "@/components/FeaturedImage";

export async function generateStaticParams() {
    return deities.map((deity) => ({ slug: deity.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const deity = getDeityBySlug(slug);
    if (!deity) return {};

    const imageUrl = deity.featuredImage ? buildUrl(deity.featuredImage.src) : undefined;

    return buildPageMetadata({
        title: `${deity.name} — Sadhaka`,
        description: deity.description,
        path: `/deities/${deity.slug}`,
        images: imageUrl ? [imageUrl] : undefined,
    });
}

export default async function DeityDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const deity = getDeityBySlug(slug);
    if (!deity) notFound();

    const related = deity.relatedDeities
        .map((relatedSlug) => getDeityBySlug(relatedSlug))
        .filter(Boolean);

    const breadcrumbSchema = buildBreadcrumbSchema([
        { label: "Home", href: "/" },
        { label: "Deities", href: "/deities" },
        { label: deity.name, href: `/deities/${deity.slug}` },
    ]);

    const webPageSchema = buildWebPageSchema({
        name: `${deity.name} Explained`,
        description: deity.description,
        url: buildUrl(`/deities/${deity.slug}`),
        breadcrumbItems: [
            { label: "Home", href: "/" },
            { label: "Deities", href: "/deities" },
            { label: deity.name, href: `/deities/${deity.slug}` },
        ],
    });

    const faqItems = deity.faq ?? [
        {
            question: `Who is ${deity.name}?`,
            answer: deity.aeoBlock,
        },
        {
            question: `What does ${deity.name} represent philosophically?`,
            answer: deity.philosophy,
        },
        {
            question: `Which texts and practices are associated with ${deity.name}?`,
            answer: `${deity.name} is associated with ${deity.associatedTexts.join(", ")} and practices such as ${deity.mantras.join(", ")}.`,
        },
    ];
    const faqSchema = buildFaqSchema(faqItems);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <Header />
            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-5xl mx-auto">
                    <DeityAuraGlow color={getDeityColor(deity.slug)}>
                        <ScrollReveal>
                            <p className="text-sm mb-4 text-orange-400 uppercase tracking-widest">Deity Guide</p>
                            <h1 className="font-display text-4xl md:text-6xl font-black mb-6">Who is {deity.name}?</h1>
                            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed border-l-4 border-orange-500/30 pl-6">
                                {deity.aeoBlock}
                            </p>
                        </ScrollReveal>
                    </DeityAuraGlow>

                    {deity.featuredImage && (
                        <FeaturedImage image={deity.featuredImage} className="mb-10" priority />
                    )}

                    <ScrollReveal delay={0.1}>
                        <section className="mb-10">
                            <h2 className="text-2xl font-display font-bold mb-4">Iconography and Symbolism</h2>
                            <ul className="space-y-3 list-disc pl-6 text-muted-foreground">
                                {deity.iconography.attributes.map((attribute) => (
                                    <li key={attribute}>{attribute}</li>
                                ))}
                            </ul>
                            <p className="mt-4 text-muted-foreground">
                                <strong className="text-foreground">Vehicle:</strong> {deity.iconography.vehicle}
                            </p>
                            <p className="text-muted-foreground">
                                <strong className="text-foreground">Color symbolism:</strong> {deity.iconography.colors}
                            </p>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal delay={0.15}>
                        <section className="mb-10">
                            <h2 className="text-2xl font-display font-bold mb-4">Mythological Context</h2>
                            <p className="text-muted-foreground leading-relaxed">{deity.mythology}</p>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2}>
                        <section className="mb-10">
                            <h2 className="text-2xl font-display font-bold mb-4">Philosophical Meaning</h2>
                            <p className="text-muted-foreground leading-relaxed">{deity.philosophy}</p>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal delay={0.25}>
                        <section className="mb-10">
                            <h2 className="text-2xl font-display font-bold mb-4">Practice Links</h2>
                            <div className="flex flex-wrap gap-3 mb-4">
                                {deity.mantras.map((mantra) => (
                                    <Link key={mantra} href={`/mantras/${mantra}`} className="px-3 py-1 rounded-full bg-muted text-sm hover:bg-orange-500/10 transition-colors">
                                        {mantra}
                                    </Link>
                                ))}
                            </div>
                            <div className="space-y-2">
                                {deity.associatedStotras.map((stotraSlug) => (
                                    <Link key={stotraSlug} href={`/stotras/${stotraSlug}`} className="block text-orange-400 hover:underline">
                                        /stotras/{stotraSlug}
                                    </Link>
                                ))}
                                {deity.associatedTraditions.map((traditionSlug) => (
                                    <Link key={traditionSlug} href={`/traditions/${traditionSlug}`} className="block text-orange-400 hover:underline">
                                        /traditions/{traditionSlug}
                                    </Link>
                                ))}
                            </div>
                        </section>
                    </ScrollReveal>

                    {faqItems.length > 0 && (
                        <ScrollReveal delay={0.3}>
                            <section className="mb-10">
                                <h2 className="text-2xl font-display font-bold mb-6">Frequently Asked Questions</h2>
                                <div className="space-y-4">
                                    {faqItems.map((item) => (
                                        <div key={item.question} className="border-l-2 border-orange-500/20 pl-5 py-2">
                                            <h3 className="font-semibold text-lg mb-2">{item.question}</h3>
                                            <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </ScrollReveal>
                    )}

                    {related.length > 0 && (
                        <ScrollReveal delay={0.35}>
                            <section>
                                <h2 className="text-2xl font-display font-bold mb-4">Related Deities</h2>
                                <div className="flex flex-wrap gap-3">
                                    {related.map((item) => (
                                        <Link
                                            key={item!.slug}
                                            href={`/deities/${item!.slug}`}
                                            className="px-4 py-2 rounded-xl border border-border hover:border-orange-500/50 hover:scale-105 transition-all duration-200"
                                        >
                                            {item!.name}
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        </ScrollReveal>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
