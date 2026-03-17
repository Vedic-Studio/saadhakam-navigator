import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { MantraCounter } from "@/components/visuals/MantraCounter";
import { SanskritTypewriter } from "@/components/visuals/SanskritTypewriter";
import { getMantraBySlug, mantras } from "@/data/mantras";
import { buildPageMetadata, buildFaqSchema, buildWebPageSchema, buildBreadcrumbSchema, buildUrl } from "@/lib/seo";

export async function generateStaticParams() {
    return mantras.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const mantra = getMantraBySlug(slug);
    if (!mantra) return {};
    return buildPageMetadata({
        title: `${mantra.name} Meaning & Practice`,
        description: mantra.oneLineMeaning,
        path: `/mantras/${mantra.slug}`,
    });
}

export default async function MantraDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const mantra = getMantraBySlug(slug);
    if (!mantra) notFound();

    const related = mantra.relatedMantras.map((s) => getMantraBySlug(s)).filter(Boolean);

    const breadcrumbSchema = buildBreadcrumbSchema([
        { label: "Home", href: "/" },
        { label: "Mantras", href: "/mantras" },
        { label: mantra.name, href: `/mantras/${mantra.slug}` },
    ]);

    const webPageSchema = buildWebPageSchema({
        name: `${mantra.name} Explained`,
        description: mantra.oneLineMeaning,
        url: buildUrl(`/mantras/${mantra.slug}`),
        breadcrumbItems: [
            { label: "Home", href: "/" },
            { label: "Mantras", href: "/mantras" },
            { label: mantra.name, href: `/mantras/${mantra.slug}` },
        ],
    });

    const faqSchema = buildFaqSchema(mantra.faq);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <Header />
            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <ScrollReveal>
                        <p className="text-sm mb-4 text-orange-400 uppercase tracking-widest">Mantra Guide</p>
                        <h1 className="font-display text-4xl md:text-6xl font-black mb-4">{mantra.name}</h1>
                        {mantra.devanagari && (
                            <p className="text-2xl md:text-3xl text-muted-foreground mb-2 font-serif">
                                <SanskritTypewriter text={mantra.devanagari} speed={80} />
                            </p>
                        )}
                        <p className="text-lg text-muted-foreground mb-2">{mantra.transliteration}</p>
                        <p className="text-xl text-muted-foreground mb-10 leading-relaxed border-l-4 border-orange-500/30 pl-6">
                            {mantra.oneLineMeaning}
                        </p>
                    </ScrollReveal>

                    <ScrollReveal delay={0.1}>
                        <section className="mb-10 flex flex-col items-center">
                            <h2 className="text-2xl font-display font-bold mb-6 self-start">Japa Counter</h2>
                            <MantraCounter mantraName={mantra.name} />
                        </section>
                    </ScrollReveal>

                    <ScrollReveal delay={0.15}>
                        <section className="mb-10">
                            <h2 className="text-2xl font-display font-bold mb-4">When and How to Practice</h2>
                            <p className="text-muted-foreground mb-2"><strong className="text-foreground">Best time:</strong> {mantra.practice.bestTime}</p>
                            <p className="text-muted-foreground mb-4"><strong className="text-foreground">Repetitions:</strong> {mantra.practice.repetitions}</p>
                            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                {mantra.practice.notes.map((n) => <li key={n}>{n}</li>)}
                            </ul>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2}>
                        <section className="mb-10">
                            <h2 className="text-2xl font-display font-bold mb-4">Context</h2>
                            <p className="text-muted-foreground mb-2"><strong className="text-foreground">Traditions:</strong> {mantra.tradition.join(", ")}</p>
                            {mantra.deityFocus && <p className="text-muted-foreground mb-2"><strong className="text-foreground">Deity focus:</strong> {mantra.deityFocus}</p>}
                            <p className="text-muted-foreground mb-2"><strong className="text-foreground">Purpose:</strong> {mantra.purpose.join(", ")}</p>
                            <p className="text-muted-foreground"><strong className="text-foreground">Sources:</strong> {mantra.source.join(", ")}</p>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal delay={0.25}>
                        <section className="mb-10">
                            <h2 className="text-2xl font-display font-bold mb-4">Related Links</h2>
                            <div className="space-y-2">
                                {mantra.relatedLinks.map((link) => (
                                    <Link key={link.href} href={link.href} className="block text-orange-400 hover:underline">
                                        {link.text}
                                    </Link>
                                ))}
                            </div>
                        </section>
                    </ScrollReveal>

                    {related.length > 0 && (
                        <ScrollReveal delay={0.3}>
                            <section>
                                <h2 className="text-2xl font-display font-bold mb-4">Related Mantras</h2>
                                <div className="flex flex-wrap gap-3">
                                    {related.map((item) => (
                                        <Link key={item!.slug} href={`/mantras/${item!.slug}`} className="px-4 py-2 rounded-xl border border-border hover:border-orange-500/50 hover:scale-105 transition-all duration-200">
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
