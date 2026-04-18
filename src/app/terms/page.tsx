import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
    title: "Terms of Use | Sadhaka",
    description:
        "Terms governing your use of Sadhaka — an informational platform. Content is not spiritual, medical, legal, or financial advice.",
    path: "/terms",
});

const termsPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/terms#webpage`,
    name: "Terms of Use — Sadhaka",
    url: `${SITE_URL}/terms`,
    isPartOf: {
        "@type": "WebSite",
        name: "Sadhaka",
        url: SITE_URL,
    },
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(termsPageSchema) }}
            />

            <Header />
            <main className="flex-grow pt-24 pb-24">
                <article className="container-padding max-w-3xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Terms of Use", href: "/terms" },
                        ]}
                    />

                    <header className="mb-12 mt-8">
                        <p className="text-sm text-primary font-black uppercase tracking-widest mb-4">
                            Legal
                        </p>
                        <h1 className="font-display text-4xl md:text-5xl font-black tracking-tight leading-[1.05] mb-6">
                            Terms of Use
                        </h1>
                        <p className="text-base text-muted-foreground">
                            Last updated: <time dateTime="2026-04-18">18 April 2026</time>
                        </p>
                    </header>

                    <div className="space-y-10 text-lg text-muted-foreground leading-relaxed">

                        <section>
                            <p>
                                By accessing <code className="text-primary">opensadhaka.com</code> you agree to these terms. If you do not agree, please do not use the site.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display font-bold text-foreground mb-4">What Sadhaka is</h2>
                            <p>
                                Sadhaka is an editorial reference platform for Sanatan Dharma — its philosophies, sacred texts, and living practices. All content is published for informational and educational purposes. Nothing on this site constitutes spiritual direction, medical advice, psychological counselling, financial guidance, or legal advice.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display font-bold text-foreground mb-4">Not a substitute for professional advice</h2>
                            <p>
                                Descriptions of practices — meditation, japa, pranayama, fasting, dietary guidance found in traditional texts — are presented as historical and doctrinal content. They are not prescriptions. Before undertaking any physical, psychological, or spiritual practice, consult a qualified teacher, physician, or mental health professional as appropriate. Sadhaka accepts no liability for outcomes arising from following any practice described on the site.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display font-bold text-foreground mb-4">Accuracy and completeness</h2>
                            <p>
                                We maintain rigorous editorial standards and cite primary sources inline. However, Sanatan Dharma encompasses a vast, internally diverse tradition, and no single reference can be exhaustive or final. Content reflects the understanding of our editorial team at the time of publication. We revise articles when we find errors, and we date corrections.
                            </p>
                            <p className="mt-3">
                                Sadhaka makes no warranty — express or implied — about the accuracy, completeness, or fitness for a particular purpose of any content on the site.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display font-bold text-foreground mb-4">Intellectual property</h2>
                            <p>
                                Original editorial content on Sadhaka — article text, translations, commentary, structural analysis — is copyright © Sadhaka and its contributors. You may quote brief passages with attribution and a link to the source URL. Systematic scraping, republication of full articles, or commercial use without permission is not permitted.
                            </p>
                            <p className="mt-3">
                                Canonical Sanskrit primary sources (Vedas, Upanishads, Bhagavad Gita, and related public-domain texts) are reproduced without claim of ownership. Our translations and commentary on those texts are our own work.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display font-bold text-foreground mb-4">User conduct</h2>
                            <p>
                                Sadhaka has no user accounts or comment system. There is no way to submit content to the site other than by contacting us directly. If you contact us — by email or via any feedback mechanism we introduce — you agree not to submit content that is defamatory, abusive, or in violation of applicable law.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display font-bold text-foreground mb-4">External links</h2>
                            <p>
                                Sadhaka links to external sites for reference purposes. We do not endorse, control, or take responsibility for the content of external sites. Following an external link is at your own discretion.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display font-bold text-foreground mb-4">Limitation of liability</h2>
                            <p>
                                To the fullest extent permitted by applicable law, Sadhaka and its operators are not liable for any direct, indirect, incidental, or consequential damages arising from your use of, or inability to use, the site or its content.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display font-bold text-foreground mb-4">Changes to these terms</h2>
                            <p>
                                We may update these terms as the site evolves. Material changes will be reflected in the "Last updated" date at the top of this page. Continued use of the site after an update constitutes acceptance of the revised terms.
                            </p>
                        </section>

                        <section id="contact">
                            <h2 className="text-2xl font-display font-bold text-foreground mb-4">Contact</h2>
                            <p>
                                Questions about these terms: <a href="mailto:editorial@opensadhaka.com" className="text-primary underline underline-offset-4 hover:text-primary/80">editorial@opensadhaka.com</a>.
                            </p>
                        </section>

                    </div>
                </article>
            </main>
            <Footer />
        </div>
    );
}
