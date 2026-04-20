import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
    title: "Privacy Policy | Sadhaka",
    description:
        "How Sadhaka collects, uses, and protects your data — including Google Analytics cookies, Faith Finder email capture, and third-party services.",
    path: "/privacy",
});

const privacyPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/privacy#webpage`,
    name: "Privacy Policy — Sadhaka",
    url: `${SITE_URL}/privacy`,
    isPartOf: {
        "@type": "WebSite",
        name: "Sadhaka",
        url: SITE_URL,
    },
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyPageSchema) }}
            />

            <Header />
            <main className="flex-grow pt-24 pb-24">
                <article className="container-padding max-w-3xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Privacy Policy", href: "/privacy" },
                        ]}
                    />

                    <header className="mb-12 mt-8">
                        <p className="text-sm text-primary font-black uppercase tracking-widest mb-4">
                            Legal
                        </p>
                        <h1 className="font-display text-4xl md:text-5xl font-black tracking-tight leading-[1.05] mb-6">
                            Privacy Policy
                        </h1>
                        <p className="text-base text-muted-foreground">
                            Last updated: <time dateTime="2026-04-18">18 April 2026</time>
                        </p>
                    </header>

                    <div className="prose-spacing space-y-10 text-lg text-muted-foreground leading-relaxed">

                        <section>
                            <p>
                                Sadhaka (<code className="text-primary">opensadhaka.com</code>) is a free, editorial platform. We do not sell products, charge subscriptions, or process payments. This policy describes what limited data we collect, why we collect it, and what we do with it.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display font-bold text-foreground mb-4">What we collect</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground mb-2">Analytics cookies (Google Analytics 4)</h3>
                                    <p>
                                        We use Google Analytics 4 (property ID: G-S3DHYPPG9R) to understand how readers find and use the site — which pages get traffic, how long readers stay, and which referral sources send visitors. GA4 sets first-party cookies (<code className="text-primary">_ga</code>, <code className="text-primary">_ga_*</code>) that persist for up to two years. The data is aggregated and anonymised; we cannot identify individual visitors from it. IP addresses are not stored by Sadhaka.
                                    </p>
                                    <p className="mt-3">
                                        GA4 data is processed by Google under Google's own privacy terms. You can opt out by installing the <a href="https://tools.google.com/dlpage/gaoptout" className="text-primary underline underline-offset-4 hover:text-primary/80" target="_blank" rel="noopener noreferrer">Google Analytics opt-out browser add-on</a> or by adjusting your browser's cookie settings.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-foreground mb-2">Email (Faith Finder quiz)</h3>
                                    <p>
                                        The Faith Finder quiz optionally asks for your email address to send your results. If you provide an email, we store it solely to deliver the results message. We do not add you to a mailing list, share your address with third parties, or use it for advertising. You can request deletion at any time by emailing <a href="mailto:editorial@opensadhaka.com" className="text-primary underline underline-offset-4 hover:text-primary/80">editorial@opensadhaka.com</a>.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-foreground mb-2">Server logs</h3>
                                    <p>
                                        Our hosting provider (Vercel) automatically logs standard HTTP request data — IP address, browser type, referring URL, and timestamp — for security and error-monitoring purposes. These logs are retained for a short period (typically 30 days) and are not used for profiling or marketing.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display font-bold text-foreground mb-4">How we use it</h2>
                            <p>
                                The analytics data tells us which topics readers find valuable so we can prioritise future content. That is its only use. We do not build advertising profiles, sell data to third parties, or use it for any purpose beyond understanding aggregate reader behaviour on this site.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display font-bold text-foreground mb-4">Third parties</h2>
                            <p>
                                Beyond Google Analytics and Vercel (listed above), we do not use third-party advertising networks, tracking pixels, or data brokers. Our <Link href="/about#editorial-standards" className="text-primary underline underline-offset-4 hover:text-primary/80">editorial standards</Link> prohibit monetisation arrangements that would require placing additional tracking code on the site.
                            </p>
                            <p className="mt-3">
                                Embedded content (none currently on the site) would be governed by the embedding platform's own privacy policy. We will update this page if that changes.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display font-bold text-foreground mb-4">Cookies</h2>
                            <p>
                                The only cookies set by <code className="text-primary">opensadhaka.com</code> are GA4 analytics cookies (<code className="text-primary">_ga</code> and <code className="text-primary">_ga_*</code>). No session cookies, login cookies, or advertising cookies are set. You can delete or block these cookies in your browser settings at any time; the site will continue to function normally.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display font-bold text-foreground mb-4">Your rights</h2>
                            <p>
                                You can request access to, correction of, or deletion of any personal data we hold about you (limited to email addresses submitted via Faith Finder). Write to <a href="mailto:editorial@opensadhaka.com" className="text-primary underline underline-offset-4 hover:text-primary/80">editorial@opensadhaka.com</a> with "Data request" in the subject line. We will respond within 30 days.
                            </p>
                        </section>

                        <section id="contact">
                            <h2 className="text-2xl font-display font-bold text-foreground mb-4">Contact</h2>
                            <p>
                                Questions about this policy: <a href="mailto:editorial@opensadhaka.com" className="text-primary underline underline-offset-4 hover:text-primary/80">editorial@opensadhaka.com</a>.
                            </p>
                            <p className="mt-3">
                                This policy applies only to <code className="text-primary">opensadhaka.com</code> and does not cover external sites we link to. We will update it if our data practices change, with the revision date shown at the top.
                            </p>
                        </section>

                    </div>
                </article>
            </main>
            <Footer />
        </div>
    );
}
