import type { ReactNode } from "react";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
import { buildArticleSchema, buildBreadcrumbSchema, buildCanonicalUrl, buildFaqSchema } from "@/lib/seo";

const pagePath = "/inquiry-vs-devotion-path";
const title = "Inquiry vs Devotion Path: Jnana and Bhakti Without False Opposition";
const description = "Inquiry vs devotion explained through the Gita, Chandogya Upanishad, Narada Bhakti Sutras, and Ramana Maharshi. Learn why jnana and bhakti are not opposites and how temperament should guide practice.";

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: buildCanonicalUrl(pagePath) },
    openGraph: { title, description, url: buildCanonicalUrl(pagePath), type: "article" },
};

const faqs = [
    { question: "Are jnana and bhakti opposite paths?", answer: "No. The Bhagavad Gita does not present jnana and bhakti as enemies. It distinguishes temperaments and methods while repeatedly integrating knowledge, devotion, discipline, and right action." },
    { question: "Does devotion always come before inquiry?", answer: "Not always. In some Advaita settings devotion purifies the mind before inquiry. In Ramana Maharshi's teaching, inquiry itself can function as surrender because the ego is traced back to its source and deprived of its claim to independence." },
    { question: "Which path suits analytical people best?", answer: "Analytical seekers usually begin more steadily with jnana practices such as scriptural study, discrimination, and self-inquiry. Even then, humility and devotional correction remain necessary if analysis becomes self-protective pride." },
    { question: "Can mantra practice belong to both inquiry and devotion?", answer: "Yes. In bhakti it functions as loving remembrance of a deity. In jnana-oriented practice it can steady the mind and thin agitation so that subtle inquiry becomes possible." },
];

const faqSchema = buildFaqSchema(faqs);
const articleSchema = buildArticleSchema({ headline: title, description, url: buildCanonicalUrl(pagePath), datePublished: "2026-03-15", section: "Spiritual Traditions", keywords: ["inquiry vs devotion path", "jnana vs bhakti", "bhakti and jnana"] });
const breadcrumbSchema = buildBreadcrumbSchema([{ label: "Home", href: "/" }, { label: "Spiritual Traditions", href: "/spiritual-traditions-paths" }, { label: title, href: pagePath }]);

function Break() { return <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />; }

function ArticleLink({ href, children, eventLabel }: { href: string; children: ReactNode; eventLabel: string }) {
    return <TrackedLink href={href} eventLabel={eventLabel} trackPathName="spiritual-traditions" className="inline-flex items-center gap-2 font-semibold text-orange-400 hover:text-orange-300 transition-colors">{children}<ArrowRight className="h-4 w-4" /></TrackedLink>;
}

export default function InquiryVsDevotionPathPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <ContentPageTracker slug="inquiry-vs-devotion-path" pillar="spiritual-traditions" />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <Header />
            <main className="flex-grow pt-24 pb-16">
                <article className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Spiritual Traditions", href: "/spiritual-traditions-paths" }, { label: "Inquiry vs Devotion", href: pagePath }]} />
                    <header className="mt-8 mb-12">
                        <div className="mb-4 inline-flex rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">Spiritual Traditions</div>
                        <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-5">Inquiry vs Devotion Path: Jnana and Bhakti Are Not a False Choice</h1>
                        <p className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5 text-base leading-relaxed text-foreground/90">Jnana and bhakti are not opposite routes in the classical sources. Bhagavad Gita Chapter 12 compares contemplation of the unmanifest with devotion to the personal Lord, but it does not turn that comparison into a permanent war between head and heart. Chandogya Upanishad, Narada Bhakti Sutras, and Ramana Maharshi all show the same rule: inquiry without surrender becomes sterile, and devotion without clarity becomes unstable.</p>
                    </header>

                    <div className="longform-prose max-w-none">
                        <p className="article-lead">The contrarian correction is simple. Serious tradition does not ask you to decide whether truth belongs to philosophers or devotees. It asks which discipline most directly weakens egoic fixation in your present condition.</p>
                        <p>Modern summaries often flatten the issue into temperament branding. Inquiry becomes intelligence, devotion becomes feeling, and the seeker is told to pick an identity. The classical materials are stricter than that.</p>
                        <p>They ask what actually stabilizes the mind, what exposes self-deception, and what the source texts authorize for a practitioner of a given temperament. Once that question is restored, the opposition weakens.</p>

                        <Break />

                        <h2>What Bhagavad Gita Chapter 12 actually says</h2>
                        <p>Chapter 12 begins with Arjuna asking whether devotion to the manifest Lord or contemplation of the unmanifest is better. Krishna's answer is precise. He praises those who fix the mind on him in devotion, while also affirming that those devoted to the unmanifest reach the same reality.</p>
                        <p>The crucial qualification follows immediately. Krishna says the unmanifest path is more difficult for embodied beings. Shankara's commentary explains why. Meditation on the attributeless absolute demands unusual subtlety and freedom from body-identification.</p>
                        <p>This does not downgrade jnana. It establishes suitability. The Gita does not flatter abstraction simply because abstraction sounds advanced.</p>

                        <p>Krishna then gives a graded sequence. Fix the mind on him. If not, cultivate repeated practice. If not, act for his sake. If not, renounce the fruits of action. The structure matters because it shows accommodation to temperament and capacity, not a single rigid gate.</p>

                        <div className="article-callout" data-tone="insight"><div className="article-callout-title">What Chapter 12 rules out</div><p>It rules out the lazy claim that one path is universally superior in all cases. The text distinguishes difficulty, fitness, and method instead.</p></div>

                        <h2>Chandogya Upanishad shows inquiry is never mere concept</h2>
                        <p>Chandogya Upanishad is often cited for tat tvam asi, "that thou art," especially in 6.8.7. Yet the teaching context is as important as the formula. Uddalaka does not hand Svetaketu a slogan and dismiss him. He corrects arrogance through repeated instruction and concrete analogies.</p>
                        <p>Salt dissolved in water, seed and tree, clay and pot. These are not decorative examples. They train receptivity, subtle perception, and disciplined listening.</p>
                        <p>That means inquiry in the Upanishadic sense already contains a devotional dimension. The student must yield pride before truth, teacher, and revelation. The ego is not sovereign merely because the content is philosophical.</p>

                        <Break />

                        <h2>Narada Bhakti Sutras correct sentimental misunderstandings of devotion</h2>
                        <p>Modern readers often use devotion to mean religious emotion without discipline. The Narada Bhakti Sutras do not support that reading. The text defines bhakti in its second sutra directly: <em>sā tu asmin paramapremarūpā</em> — "it is, toward him, of the nature of supreme love." That definition does not exclude discipline. This love is tied to renunciation of lower craving, concentrated remembrance, and the steady removal of self-centered desire.</p>
                        <p>Proper bhakti is therefore severe. It simplifies motive. It cuts attachment. It does not merely intensify feeling.</p>
                        <p>This is one reason bhakti is not the soft option. One can hide inside elegant concepts for years. One cannot seriously pursue devotion while preserving every vanity untouched.</p>

                        <p>At the same time, bhakti often purifies seekers who are not yet ready for subtle metaphysical discrimination. It steadies attention through name, form, and offering. That creates the internal clarity that Advaita later names as prerequisite for liberating knowledge.</p>

                        <h2>Ramana Maharshi shows how inquiry and surrender converge</h2>
                        <p>Ramana Maharshi is often treated as the pure representative of inquiry, as if his path had no devotional content. That reading is partial. He taught atma-vichara, self-inquiry, but he also spoke of surrender, especially surrender to Arunachala and to the source of the self.</p>
                        <p>In his teaching, inquiry and surrender can become functionally equivalent. If the ego traces itself back to its source and disappears, that is inquiry. If the ego yields itself wholly to the divine source and disappears, that is surrender.</p>
                        <p>The practical result is the same. Separate self-claim weakens. This is one of the clearest demonstrations that jnana and bhakti are not merely sequential stages.</p>

                        <Break />

                        <h2>When inquiry should predominate</h2>
                        <p>Inquiry is usually the better lead discipline for seekers disturbed by contradiction, drawn to metaphysical precision, and capable of disciplined study without inflating themselves through it. Such practitioners benefit from Upanishadic study, Vedanta teaching, discrimination, and forms of contemplative self-observation.</p>
                        <p>The danger is equally clear. Analysis can become armor. A seeker may learn to state non-dual doctrine correctly while remaining emotionally brittle, prideful, or evasive.</p>
                        <p>That is why jnana without devotional correction becomes dry. The tradition's answer is not anti-intellectualism. It is humility, surrender, and practices that keep knowledge from turning into self-image.</p>

                        <h2>When devotion should predominate</h2>
                        <p>Devotion is often the better lead discipline for seekers whose attention steadies through relationship, mantra, image, temple rhythm, or sacred name. Vaishnava, Shaiva, and Shakta traditions all use this principle. The heart is trained toward one-pointed orientation.</p>
                        <p>The danger is also obvious. Emotion can masquerade as surrender. Dependency can masquerade as reverence. Sectarian sentiment can replace actual transformation.</p>
                        <p>That is why bhakti without doctrinal and psychological clarity becomes unstable. Knowledge is not the enemy of devotion. It protects devotion from confusion and projection.</p>

                        <Break />

                        <h2>They are not merely sequential stages</h2>
                        <p>Another simplification says devotion is for beginners and inquiry is for the advanced. Some lineages may teach a progression that looks like that. The classical record does not justify turning it into a universal law.</p>
                        <p>In some Advaita settings, devotion prepares the mind for self-knowledge. In bhakti traditions, knowledge refines devotion without replacing it. In Ramana, the two can be inwardly identical in operation.</p>
                        <p>It is therefore more accurate to speak of dominant mode than mandatory sequence. One path may lead while the other supports. That is a more faithful account of how the traditions actually work.</p>

                        <h2>A practical framework for suitability</h2>
                        <p>Ask first what actually steadies your attention. If scriptural reasoning and contemplative discrimination bring clarity, inquiry should lead. If mantra, prayer, and divine form make the mind cleaner and less self-enclosed, devotion should lead.</p>
                        <p>Ask second what ego strategy dominates. If the ego hides in superiority and conceptual control, bhakti may be the necessary medicine. If it hides in emotional indulgence and projection, jnana may be the necessary medicine.</p>
                        <p>Ask third what lineage and text support the practice. Temperament matters, but source-grounding matters too. Tradition is not built by mixing fragments without grammar.</p>

                        <p>For many seekers the best arrangement is asymmetrical integration. Inquiry may be primary while <ArticleLink href="/practices/japa" eventLabel="inquiry-devotion:body:japa">japa</ArticleLink> softens pride. Devotion may be primary while <ArticleLink href="/advaita-vedanta-explained" eventLabel="inquiry-devotion:body:advaita">Advaita study</ArticleLink> protects against sentimentality.</p>
                        <p>If you still need the broader map, start with <ArticleLink href="/spiritual-paths-explained" eventLabel="inquiry-devotion:body:paths">spiritual paths explained</ArticleLink> and then compare how inquiry and devotion function inside real traditions through <ArticleLink href="/traditions/bhakti-lineages" eventLabel="inquiry-devotion:body:bhakti">bhakti lineages</ArticleLink>.</p>
                    </div>

                    <section className="mt-16 mb-16"><h2 className="font-display text-3xl font-bold mb-8">Frequently Asked Questions</h2><div className="space-y-5">{faqs.map((faq) => (<div key={faq.question} className="rounded-2xl border border-border/50 bg-card p-6"><h3 className="text-lg font-semibold mb-3">{faq.question}</h3><p className="text-muted-foreground leading-relaxed">{faq.answer}</p></div>))}</div></section>

                    <section className="rounded-3xl bg-orange-600 p-10 text-white text-center"><h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Choose the dominant mode, then build the support</h2><p className="mx-auto mb-8 max-w-2xl text-orange-50 text-lg leading-relaxed">Start with the path that actually steadies you. Then use the companion path to correct your blind spot instead of turning temperament into ideology.</p><div className="flex flex-col sm:flex-row items-center justify-center gap-4"><ArticleLink href="/spiritual-paths-explained" eventLabel="inquiry-devotion:footer:paths">Compare Spiritual Paths</ArticleLink><ArticleLink href="/practices/japa" eventLabel="inquiry-devotion:footer:japa">Build a Devotional Practice</ArticleLink></div></section>
                </article>
            </main>
            <Footer />
        </div>
    );
}
