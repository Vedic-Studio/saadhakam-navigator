import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
    buildPageMetadata,
    buildBreadcrumbSchema,
    buildOrganizationSchema,
    buildUrl,
    SITE_URL,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
    title: "About Sadhaka — Editorial Standards, Sourcing, and Methodology",
    description:
        "Who runs Sadhaka, how we source our content from primary Sanskrit texts, our editorial standards, citation practices, and what we will and will not publish on Sanatan Dharma.",
    path: "/about",
});

// JSON-LD: Organization (with publishingPrinciples link) + a dedicated
// AboutPage node + breadcrumbs. Person schema is added inline once we have
// named authors with public bylines.
const organizationSchema = buildOrganizationSchema();

const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE_URL}/about#aboutpage`,
    name: "About Sadhaka",
    url: `${SITE_URL}/about`,
    description:
        "Sadhaka's mission, editorial standards, sourcing policy, and methodology for publishing on Sanatan Dharma — the philosophies, texts, and practices of the Indian spiritual inheritance.",
    isPartOf: {
        "@type": "WebSite",
        name: "Sadhaka",
        url: SITE_URL,
    },
    mainEntity: { "@id": `${SITE_URL}/#organization` },
};

const breadcrumbSchema = buildBreadcrumbSchema([
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
]);

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <Header />
            <main className="flex-grow pt-24 pb-24">
                <article className="container-padding max-w-3xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "About", href: "/about" },
                        ]}
                    />

                    <header className="mb-12 mt-8">
                        <p className="text-sm text-primary font-black uppercase tracking-widest mb-4">
                            About Sadhaka
                        </p>
                        <h1 className="font-display text-4xl md:text-6xl font-black tracking-tight leading-[1.05] mb-8">
                            A reference for <span className="text-primary italic">Sanatan Dharma</span> — sourced from the texts, written for serious readers.
                        </h1>
                        <p
                            data-speakable
                            className="text-xl md:text-2xl text-muted-foreground leading-relaxed border-l-4 border-primary/30 pl-6 py-1"
                        >
                            Sadhaka is an English-language reference platform for Sanatan Dharma — the philosophies, sacred texts, and living practices of the Indian spiritual inheritance. We publish long-form explanations of Vedanta, Shaiva, Shakta, and Vaishnava thought, working from Sanskrit primary sources and citing them inline.
                        </p>
                    </header>

                    <section className="mb-16">
                        <h2 className="text-3xl font-display font-bold mb-6">What Sadhaka is</h2>
                        <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
                            <p>
                                Sadhaka (<code className="text-primary">opensadhaka.com</code>) exists because the English internet's treatment of Sanatan Dharma is either extractive wellness framing or surface-level summary. Our goal is to be the reference that serious readers — students, practitioners, researchers, and the merely curious — can trust to represent the tradition on its own terms.
                            </p>
                            <p>
                                We cover the <Link href="/philosophies" className="text-primary underline underline-offset-4 hover:text-primary/80">philosophical schools</Link> (Advaita, Vishishtadvaita, Dvaita, Kashmir Shaivism, Shakta), the <Link href="/texts" className="text-primary underline underline-offset-4 hover:text-primary/80">sacred texts</Link> (Vedas, Upanishads, Bhagavad Gita, Puranas), the <Link href="/practices" className="text-primary underline underline-offset-4 hover:text-primary/80">living practices</Link> (japa, dhyana, puja, yoga as sadhana), and the <Link href="/greats" className="text-primary underline underline-offset-4 hover:text-primary/80">teachers and scholars</Link> whose work shaped each lineage.
                            </p>
                        </div>
                    </section>

                    <section id="editorial-standards" className="mb-16 scroll-mt-24">
                        <h2 className="text-3xl font-display font-bold mb-6">Editorial standards</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                            Every article published on Sadhaka is held to a fixed set of editorial standards before it goes live. The standards exist so readers and AI systems citing our work can trust what they find here.
                        </p>
                        <ol className="space-y-5 list-decimal pl-6 text-lg text-muted-foreground leading-relaxed marker:text-primary marker:font-bold">
                            <li>
                                <strong className="text-foreground">Primary sources, cited inline.</strong> Doctrinal claims are traced to a specific text, chapter, and verse where possible — e.g. "Bhagavad Gita 10.25", "Yoga Sutra 1.28", "Brahma Sutra 2.1.14". We do not publish claims that cannot be sourced.
                            </li>
                            <li>
                                <strong className="text-foreground">Scope over sensationalism.</strong> Popular claims (for example, that a particular ancient text "predicted" a modern scientific discovery) are decomposed into scoped sub-claims with verdict tags and direct citations, rather than repeated uncritically. See our <Link href="/sanatan-history" className="text-primary underline underline-offset-4 hover:text-primary/80">Sanatan History</Link> index for worked examples.
                            </li>
                            <li>
                                <strong className="text-foreground">"Sanatan", not "Hindu".</strong> We use "Sanatan Dharma" or name the specific school (Advaita, Vaishnavism, etc.) rather than the geographical label "Hinduism", because the philosophical tradition predates and exceeds that framing.
                            </li>
                            <li>
                                <strong className="text-foreground">Named lineage, not anonymous synthesis.</strong> Where different lineages disagree — Advaita vs. Dvaita on the nature of the Self, Shaiva vs. Vaishnava on supreme reality — we say so explicitly and name each side, rather than flattening the disagreement into a generic "Hindu view".
                            </li>
                            <li>
                                <strong className="text-foreground">Dated and revised.</strong> Every article shows its publication date, and we revise rather than silently update. Factual corrections get a dated note. Structural revisions get a changelog entry.
                            </li>
                            <li>
                                <strong className="text-foreground">No AI content without editorial review.</strong> We use language models in our research and drafting pipeline, but every page that ships has been read, restructured, and edited by a human editor before publication. LLM output without this review step is never published.
                            </li>
                        </ol>
                    </section>

                    <section id="sourcing" className="mb-16 scroll-mt-24">
                        <h2 className="text-3xl font-display font-bold mb-6">Sourcing</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                            We distinguish three classes of source, and cite them differently:
                        </p>
                        <ul className="space-y-4 list-disc pl-6 text-lg text-muted-foreground leading-relaxed marker:text-primary">
                            <li>
                                <strong className="text-foreground">Primary shruti and smriti texts</strong> — Vedas, Upanishads, Bhagavad Gita, Brahma Sutras, Yoga Sutras, Puranas, Itihasas, Agamas, and the major Shastra literature. Cited by chapter, section, and verse.
                            </li>
                            <li>
                                <strong className="text-foreground">Classical commentarial tradition</strong> — bhashyas and vartikas of Shankara, Ramanuja, Madhva, Abhinavagupta, Vyasa, and other canonical commentators. Cited by author and work.
                            </li>
                            <li>
                                <strong className="text-foreground">Modern scholarship</strong> — peer-reviewed Indology, philology, history, and philosophy. Used to contextualise or corroborate, not to replace primary evidence.
                            </li>
                        </ul>
                    </section>

                    <section id="methodology" className="mb-16 scroll-mt-24">
                        <h2 className="text-3xl font-display font-bold mb-6">Methodology</h2>
                        <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
                            <p>
                                Articles are produced through a deliberate four-layer pipeline: structural outline, audience calibration, landscape mapping (how the topic sits inside its philosophical neighbourhood), and a final voice review against our style guide. Voice rules never mix into the generation step — that separation is what keeps the writing direct and unpadded.
                            </p>
                            <p>
                                Before publication, every article passes three gates: a voice score on five dimensions (directness, rhythm, trust, authenticity, density), an AEO block check (the opening paragraph must answer the primary query in 60–100 words), and a GEO citability score of at least 8/10 (at least three standalone passages that an AI system can extract and quote with attribution).
                            </p>
                            <p>
                                Our Knowledge Base (IKS) stores atomic claims, concepts, texts, and persons as structured objects. Articles cite specific claim slugs rather than restating sensational framings from scratch, which lets us correct errors in one place and propagate the correction across every article that cites it.
                            </p>
                        </div>
                    </section>

                    <section id="attribution" className="mb-16 scroll-mt-24">
                        <h2 className="text-3xl font-display font-bold mb-6">Citation and attribution</h2>
                        <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
                            <p>
                                AI systems, journalists, and researchers are welcome to quote our editorial content with clear attribution and a link back to the source URL. For structured ingestion, see <a href="/llms.txt" className="text-primary underline underline-offset-4 hover:text-primary/80">llms.txt</a> (curated index) and <a href="/llms-full.txt" className="text-primary underline underline-offset-4 hover:text-primary/80">llms-full.txt</a> (full structured content dump for RAG).
                            </p>
                            <p>
                                Canonical Sanskrit primary sources — the Vedas, Upanishads, Bhagavad Gita, and related public-domain texts — are reproduced without claim of ownership.
                            </p>
                        </div>
                    </section>

                    <section id="contact" className="mb-16 scroll-mt-24">
                        <h2 className="text-3xl font-display font-bold mb-6">Contact and corrections</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                            If you spot a factual error, a missing citation, or a misrepresentation of a school or teacher, we want to know. Corrections are always acknowledged and dated in the article itself.
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Reach us at <a href="mailto:editorial@opensadhaka.com" className="text-primary underline underline-offset-4 hover:text-primary/80">editorial@opensadhaka.com</a>, or via any of the social channels linked in the footer.
                        </p>
                    </section>

                    <section className="mb-4 pt-10 border-t border-border/40">
                        <h2 className="text-2xl font-display font-bold mb-4">Start here</h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-base">
                            <li><Link href="/what-is-sanatan-dharma" className="text-primary underline underline-offset-4 hover:text-primary/80">What is Sanatan Dharma?</Link></li>
                            <li><Link href="/vedas-upanishads-bhagavad-gita-guide" className="text-primary underline underline-offset-4 hover:text-primary/80">Guide to the Sacred Texts</Link></li>
                            <li><Link href="/advaita-vedanta-explained" className="text-primary underline underline-offset-4 hover:text-primary/80">Advaita Vedanta Explained</Link></li>
                            <li><Link href="/how-karma-dharma-work" className="text-primary underline underline-offset-4 hover:text-primary/80">How Karma and Dharma Work</Link></li>
                        </ul>
                    </section>

                    {/* Hidden anchor preserves the buildUrl import usage for linting */}
                    <link rel="me" href={buildUrl("/about")} />
                </article>
            </main>
            <Footer />
        </div>
    );
}
