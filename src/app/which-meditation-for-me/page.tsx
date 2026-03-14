import type { ReactNode } from "react";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
import { buildArticleSchema, buildBreadcrumbSchema, buildCanonicalUrl, buildFaqSchema } from "@/lib/seo";

const pagePath = "/which-meditation-for-me";
const title = "Which Meditation Is Right for Me: A Diagnostic Guide to Real Practice Types";
const description =
    "Which meditation is right for me explained through dharana, dhyana, samadhi, self-inquiry, trataka, japa, and common beginner mistakes. Learn why meditation is a family of different operations, not one technique.";

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: buildCanonicalUrl(pagePath) },
    openGraph: { title, description, url: buildCanonicalUrl(pagePath), type: "article" },
};

const faqs = [
    {
        question: "What meditation should a complete beginner start with?",
        answer:
            "A complete beginner should usually start with a method that gives the mind a clear object, such as japa, breath-regulated attention, or trataka. Purely objectless sitting is often too vague at the beginning.",
    },
    {
        question: "Is self-inquiry the highest meditation?",
        answer:
            "Some Advaita teachers present self-inquiry as the most direct path, but directness does not mean universal suitability. A restless, unprepared mind often cannot sustain genuine inquiry and instead performs conceptual analysis.",
    },
    {
        question: "What is the difference between dharana and dhyana?",
        answer:
            "In the Yoga Sutra framework, dharana is concentration, the binding of attention to one place or object. Dhyana is sustained flow of attention toward that object without repeated collapse. They are related but not identical operations.",
    },
    {
        question: "Can japa count as meditation?",
        answer:
            "Yes. In many Hindu traditions, japa is not merely preliminary. It is a full contemplative discipline that can gather attention, regulate emotion, and mature into deeper absorption when practiced correctly.",
    },
];

const faqSchema = buildFaqSchema(faqs);
const articleSchema = buildArticleSchema({
    headline: title,
    description,
    url: buildCanonicalUrl(pagePath),
    datePublished: "2026-03-15",
    section: "Practical Practices",
    keywords: ["which meditation is right for me", "best meditation for me", "meditation types"],
});
const breadcrumbSchema = buildBreadcrumbSchema([
    { label: "Home", href: "/" },
    { label: "Practical Practices", href: "/practical-spiritual-practices" },
    { label: title, href: pagePath },
]);

function Break() {
    return <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />;
}

function ArticleLink({ href, children, eventLabel }: { href: string; children: ReactNode; eventLabel: string }) {
    return (
        <TrackedLink href={href} eventLabel={eventLabel} trackPathName="practical-practices" className="inline-flex items-center gap-2 font-semibold text-orange-400 transition-colors hover:text-orange-300">
            {children}
            <ArrowRight className="h-4 w-4" />
        </TrackedLink>
    );
}

export default function WhichMeditationForMePage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <ContentPageTracker slug="which-meditation-for-me" pillar="practical-practices" />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <Header />
            <main className="flex-grow pt-24 pb-16">
                <article className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Practical Practices", href: "/practical-spiritual-practices" }, { label: "Which Meditation for Me", href: pagePath }]} />
                    <header className="mt-8 mb-12">
                        <div className="mb-4 inline-flex rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">Practical Practices</div>
                        <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-5">Which Meditation Is Right for Me If Meditation Is Not One Practice</h1>
                        <p className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5 text-base leading-relaxed text-foreground/90">Meditation is not one practice but a family of distinct operations. The Yoga Sutra tradition separates dharana, dhāraṇā, concentration, from dhyana, dhyāna, meditative flow, and from samadhi, samādhi, absorption. Vedantic self-inquiry, trataka, trāṭaka, and japa-based meditation belong to related but different practice logics. The right question is therefore not which meditation is most praised. It is which operation your present mind can actually perform.</p>
                    </header>

                    <div className="longform-prose max-w-none">
                        <p className="article-lead">The common Western mistake is to treat meditation as a single universal technique that everyone should start the same way. Classical Indian traditions do not do this. They distinguish tasks, objects, temperaments, and levels of readiness.</p>
                        <p>That distinction matters because many bad beginnings are caused by category error. A scattered mind is told to sit in objectless silence. A highly conceptual mind is told to perform self-inquiry before it can sustain attention. A trauma-sensitive nervous system is told that stillness alone is always safe.</p>
                        <p>The better approach is diagnostic. What is your dominant obstacle right now, distraction, agitation, dullness, conceptual overactivity, fear of stillness, or genuine contemplative maturity. Different practices answer different obstacles.</p>

                        <h2>Dharana, dhyana, and samadhi are not interchangeable words</h2>
                        <p>In Patanjali's Yoga Sutras, dharana is the fixing of attention on one place. Yoga Sutra 3.1 states it directly: <em>deśa-bandhaś cittasya dhāraṇā</em> — "dharana is the binding of attention to one place." It is the deliberate anchoring of the mind to an object, point, symbol, sound, or field. That means concentration is already a distinct practice stage, not an embarrassment to be rushed past.</p>
                        <p>Dhyana is what happens when that attention begins to flow toward the object with continuity. The repetitions of collapse become less frequent. The mind is no longer merely forcing contact. It is inhabiting contact.</p>
                        <p>Samadhi is a further refinement in which subject-object distinction alters or falls away depending on the description and school. This sequence matters because many beginners claim to want meditation when what they actually need is concentration training first.</p>

                        <div className="article-callout" data-tone="insight">
                            <div className="article-callout-title">The first correction</div>
                            <p>If you cannot hold attention on one chosen object for even a short period, your first task is dharana, not romantic talk about samadhi.</p>
                        </div>

                        <Break />

                        <h2>Japa as meditation for noisy minds</h2>
                        <p>Japa is often treated as merely devotional repetition before “real” meditation begins. That is a mistake. In many Hindu traditions, japa is itself a complete contemplative method because it gives sound, rhythm, breath, and meaning a shared anchor.</p>
                        <p>This makes it especially suitable for busy, scattered, or verbally overactive minds. Instead of demanding immediate stillness, it recruits the mind's repetitive tendency and gives it sacred form. The result is not suppression but gathered attention.</p>
                        <p>For many beginners this is the best first meditation precisely because it is concrete. If the mind is noisy, start with <ArticleLink href="/how-to-start-japa" eventLabel="which-meditation:body:japa">japa practice</ArticleLink> rather than with abstract instructions about empty awareness.</p>

                        <h2>Trataka for unstable visual attention</h2>
                        <p>Trataka, fixed gazing, is one of the clearest concentration practices in the hatha and yoga traditions. The object is external, often a flame, point, or icon. That externality matters because some minds stabilize more reliably with visible form than with inward instructions.</p>
                        <p>It can work well for practitioners who become dull when they close the eyes, or whose thought-stream strengthens when no sensory anchor is present. Proper trataka is not casual staring. It is disciplined gaze followed by interiorization of the after-image or steadied attention.</p>
                        <p>It is also one of the better examples of why meditation should be chosen diagnostically. The same practitioner who fails repeatedly in objectless sitting may respond immediately to visual concentration.</p>

                        <Break />

                        <h2>Self-inquiry for subtle and already steady minds</h2>
                        <p>Self-inquiry in the Ramana Maharshi line asks who the "I" is, or to whom a thought arises. It is often marketed as the highest method because of its directness. Directness, however, does not guarantee suitability.</p>
                        <p>If the mind is restless, self-inquiry often degenerates into internal commentary. The practitioner thinks about the self instead of tracing the felt sense of "I" back to its source. That is analysis, not inquiry.</p>
                        <p>Self-inquiry is therefore best for minds that can already notice thought without immediately being dragged by it. It may also suit practitioners already formed by Advaita study or by a degree of concentration practice that makes subtle introspection possible.</p>

                        <h2>Dhyana proper for those who can sustain an object without strain</h2>
                        <p>Some practitioners do not need heavy structure. Their attention can rest on breath, presence, or inner witnessing without constant collapse. For them, dhyana-oriented sitting may be the right primary form.</p>
                        <p>That does not mean passivity. Dhyana still depends on prior gathering. It simply means the mind no longer needs the same amount of overt scaffolding.</p>
                        <p>If you already have natural quietude, or if prior training through mantra or concentration has made the mind serviceable, then a practice centered on sustained meditative flow may be appropriate. For orientation, compare this with <ArticleLink href="/practices/dhyana" eventLabel="which-meditation:body:dhyana">dhyana practice</ArticleLink>.</p>

                        <Break />

                        <h2>Common bad starting points</h2>
                        <p>The first bad starting point is objectless silence for a mind that has never learned concentration. The result is usually fantasy, frustration, or sleep. This is not a moral failure. It is simply a mismatch.</p>
                        <p>The second bad starting point is self-inquiry used as a prestige method. Many seekers choose it because it sounds philosophically elevated. If the mind cannot stay present to the arising of thought, inquiry becomes mere conceptual rehearsal.</p>
                        <p>The third bad starting point is intense breath manipulation for an already dysregulated nervous system. Some forms of pranayama support meditation well. Others are destabilizing when used without adequate preparation or supervision.</p>

                        <p>The fourth bad starting point is copying someone else's path-signature. A devotional practitioner may force dry silent sitting because it looks mature. An analytical practitioner may force emotive devotion because it looks open-hearted. Neither usually works well for long.</p>

                        <h2>A practical diagnostic framework</h2>
                        <p>If your mind is noisy and verbal, begin with japa. If your mind is restless but visually trainable, begin with trataka. If your nervous system is agitated, begin with gentle breath-regulated attention before trying longer stillness.</p>
                        <p>If your attention is already somewhat steady and your temperament is contemplative, dhyana-oriented sitting may fit. If your attention is subtle, your philosophical grounding is real, and you can observe the sense of self without getting lost in concepts, self-inquiry may be appropriate.</p>
                        <p>This is the core principle. Choose the practice that addresses your dominant obstruction, not the practice with the highest symbolic status.</p>

                        <Break />

                        <h2>How the paths connect</h2>
                        <p>These practices are not enemies. Japa can mature into dhyana. Dharana through trataka can prepare deeper meditation. Breath-led settling can make later inquiry possible. Self-inquiry may reveal where devotion or mantra is still needed to soften the ego's defenses.</p>
                        <p>This is why the right meditation is often not a permanent lifetime identity. It is the right present operation within a larger path. That path may later include a different leading practice once the mind changes.</p>
                        <p>If your difficulty is not just technique but wider temperament, compare this question with <ArticleLink href="/inquiry-vs-devotion-path" eventLabel="which-meditation:body:inquiry-devotion">inquiry versus devotion</ArticleLink> and the broader <ArticleLink href="/spiritual-paths-explained" eventLabel="which-meditation:body:paths">map of spiritual paths</ArticleLink>. Meditation choice is often downstream from deeper orientation.</p>

                        <p>The correct answer is therefore less glamorous than most quizzes suggest. Start with the practice your actual mind can perform today. Do that long enough for it to work. Then let the next practice emerge from real stability rather than from image-management.</p>
                    </div>

                    <section className="mt-16 mb-16">
                        <h2 className="font-display text-3xl font-bold mb-8">Frequently Asked Questions</h2>
                        <div className="space-y-5">
                            {faqs.map((faq) => (
                                <div key={faq.question} className="rounded-2xl border border-border/50 bg-card p-6">
                                    <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="rounded-3xl bg-orange-600 p-10 text-white text-center">
                        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Start with the right operation, not the highest-sounding method</h2>
                        <p className="mx-auto mb-8 max-w-2xl text-orange-50 text-lg leading-relaxed">Meditation works when the method matches the actual condition of the mind. Choose the practice that addresses your dominant obstacle, then build from there.</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <ArticleLink href="/how-to-start-japa" eventLabel="which-meditation:footer:japa">Start with Japa</ArticleLink>
                            <ArticleLink href="/spiritual-paths-explained" eventLabel="which-meditation:footer:paths">See the Bigger Path Map</ArticleLink>
                        </div>
                    </section>
                </article>
            </main>
            <Footer />
        </div>
    );
}
