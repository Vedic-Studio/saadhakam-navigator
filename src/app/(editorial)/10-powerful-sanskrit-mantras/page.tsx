import type { ReactNode } from "react";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
import { buildArticleSchema, buildBreadcrumbSchema, buildCanonicalUrl, buildFaqSchema } from "@/lib/seo";

const pagePath = "/10-powerful-sanskrit-mantras";
const title = "10 Powerful Sanskrit Mantras: Meaning, Practice & When NOT to Chant";
const description =
    "Not every mantra is for everyone. This guide covers 10 Sanskrit mantras with meaning, pronunciation, deity context, and which ones require initiation before chanting.";

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: buildCanonicalUrl(pagePath) },
    openGraph: { title, description, url: buildCanonicalUrl(pagePath), type: "article" },
};

const faqs = [
    {
        question: "Is a mantra just a positive affirmation in Sanskrit?",
        answer:
            "No. In Vedic, Tantric, and devotional traditions, mantra is not generic self-talk. It is a disciplined sound-form tied to a deity, doctrine, liturgical use, or contemplative aim, and its effectiveness depends on pronunciation, repetition, suitability, and context.",
    },
    {
        question: "Do all Sanskrit mantras require diksha?",
        answer:
            "No. Many public nama mantras and stotras are practiced without formal initiation. Some bija and lineage-specific mantras traditionally require diksha because the mantra is inseparable from transmission, ritual procedure, and precise usage.",
    },
    {
        question: "Which mantra is best for beginners?",
        answer:
            "For most beginners, a short and publicly transmitted nama mantra such as Om Namah Shivaya or Om Namo Narayanaya is more suitable than a restricted tantric formula. Suitability matters more than claims of raw power.",
    },
    {
        question: "Does pronunciation matter if intention is sincere?",
        answer:
            "Yes. Intention matters, but Sanskrit mantra traditions treat sound as intrinsic to the practice, not an optional wrapper around meaning. Sincere mispronunciation is still mispronunciation, which is why slow correction is part of proper practice.",
    },
];

const faqSchema = buildFaqSchema(faqs);
const articleSchema = buildArticleSchema({
    headline: title,
    description,
    url: buildCanonicalUrl(pagePath),
    datePublished: "2026-03-15",
    section: "Sacred Texts",
    keywords: ["10 powerful sanskrit mantras", "sanskrit mantras meaning", "mantra pronunciation"],
});
const breadcrumbSchema = buildBreadcrumbSchema([
    { label: "Home", href: "/" },
    { label: "Sacred Texts", href: "/sacred-texts-teachings" },
    { label: title, href: pagePath },
]);

function Break() {
    return <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />;
}

function ArticleLink({ href, children, eventLabel }: { href: string; children: ReactNode; eventLabel: string }) {
    return (
        <TrackedLink href={href} eventLabel={eventLabel} trackPathName="sacred-texts" className="inline-flex items-center gap-2 font-semibold text-orange-400 transition-colors hover:text-orange-300">
            {children}
            <ArrowRight className="h-4 w-4" />
        </TrackedLink>
    );
}

export default function PowerfulSanskritMantrasPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <ContentPageTracker slug="10-powerful-sanskrit-mantras" pillar="sacred-texts" />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <article className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Sacred Texts", href: "/sacred-texts-teachings" }, { label: "10 Powerful Sanskrit Mantras", href: pagePath }]} />

                    <header className="mt-8 mb-12">
                        <div className="mb-4 inline-flex rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">Sacred Texts</div>
                        <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-5">10 Powerful Sanskrit Mantras Without Reducing Mantra to Sound Therapy</h1>
                        <p className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5 text-base leading-relaxed text-foreground/90">Mantra is not affirmation, mood music, or generic sound healing. In the Vedic, devotional, and Tantric traditions, a mantra belongs to a category, carries a theological frame, and is used under conditions shaped by adhikara, suitability, diksha, pronunciation, deity, and occasion. A powerful mantra is not merely intense. It is precise, rightly placed, and properly repeated.</p>
                    </header>

                    <div className="longform-prose max-w-none">
                        <p className="article-lead">The surprising claim grounded in the sources is this. A simple public name-mantra, repeated correctly every day, is usually more powerful for a beginner than an exotic formula chosen for dramatic effect. Tradition measures power by right relation, not by theatrical intensity.</p>
                        <p>That is why any serious list of Sanskrit mantras must begin with distinctions. What category is the mantra in. Does it belong to Vedic recitation, stotra, nama-japa, mahavakya contemplation, or Tantric practice. Is it publicly transmitted or initiated. Is it linked to a deity, a liturgical moment, or a contemplative insight.</p>
                        <p>Without those distinctions, mantra degenerates into aesthetic consumption. With them, the practice becomes intelligible and stable.</p>

                        <h2>Before the list: the five filters that matter</h2>
                        <p>The first filter is adhikara, fitness. A mantra that suits a trained initiate may not suit a beginner. The second is pronunciation. Sanskrit sound is part of the practice, not a decorative shell around meaning.</p>
                        <p>The third is category. A stotra is not identical to a seed-syllable. A mahavakya is not identical to a devotional name. The fourth is deity or doctrinal context. The fifth is occasion, daily japa, ritual use, recitation for study, healing context, festival observance, or contemplative assimilation.</p>
                        <p>The list below is therefore not ranked by mystical voltage. It is organized by actual use and traditional clarity.</p>

                        <Break />

                        <h2>1. Gayatri Mantra, Gāyatrī Mantra</h2>
                        <p>The Gayatri mantra from Rig Veda 3.62.10 is among the most revered Vedic mantras. Its core petition, <em>dhiyo yo naḥ pracodayāt</em> — "may he illuminate our intellects" — is addressed to Savitr, the solar divine. This is not a casual prosperity chant. It is a mantra of refinement, clarity, and sacred recitation.</p>
                        <p>Traditionally it is linked with initiation and disciplined recitation, especially in orthodox settings. Modern teachers sometimes teach it publicly, but the traditional caution matters because meter, pronunciation, and ritual frame are more integral here than many beginners assume.</p>
                        <p>Its occasion is daily recitation, especially at sandhya times, dawn and dusk. Its category is Vedic mantra. Its deity orientation is solar and illuminative rather than sectarian in a narrow sense.</p>

                        <h2>2. Mahamrityunjaya Mantra, Mahāmṛtyuñjaya Mantra</h2>
                        <p>This mantra from the Rig Veda and Yajur Vedic tradition invokes Tryambaka Shiva, the three-eyed Lord. It is used for healing, fear, illness, mortality, and protection, but its traditional scope is more exact than generic wellness language suggests.</p>
                        <p>The mantra asks for release from death in the sense of bondage, not denial of mortality at the physical level. In liturgical usage it appears in rites around illness, danger, and death, and in household devotion it is often recited for steadiness in crisis.</p>
                        <p>It is public enough to be widely practiced, but it still requires slow pronunciation work. Beginners often rush it because of its fame. That usually produces noise rather than practice.</p>

                        <h2>3. Om Namah Shivaya, Oṁ Namaḥ Śivāya</h2>
                        <p>This is one of the most suitable public mantras for beginners. In Shaiva traditions it is the panchakshara, five-syllable formula directed to Shiva. It works well in japa because it is short, stable, and doctrinally clear.</p>
                        <p>It is not just a calm sound-pattern. It is surrender to Shiva as auspicious reality and, in some readings, as the inner self. Its occasion can be daily japa, pilgrimage, puja support, or meditative repetition.</p>
                        <p>Because it is widely transmitted and liturgically embedded, it has the rare combination of accessibility and depth. This is one reason it appears so often in beginner recommendations.</p>

                        <Break />

                        <h2>4. Hanuman Chalisa, Hanumān Cālīsā</h2>
                        <p>This is not a mantra in the narrow seed-syllable sense but a stotra, a devotional hymn, composed in Awadhi by Tulsidas. It belongs on this list because many modern practitioners use mantra language too narrowly and ignore the power of repeated stotra recitation in bhakti settings.</p>
                        <p>The Hanuman Chalisa is linked to courage, service, protection, loyalty, and removal of fear. Its devotional center is Hanuman as servant of Rama and exemplar of strength under obedience to dharma.</p>
                        <p>It is especially suitable for devotees who cannot yet stabilize in sparse japa but can sustain rhythmic recitation. Sometimes a hymn is a better starting point than a bare mantra because it more effectively holds attention.</p>

                        <h2>5. The Mahavakyas, Mahāvākyas</h2>
                        <p>The great Upanishadic declarations such as Tat Tvam Asi, Aham Brahmasmi, Prajnanam Brahma, and Ayam Atma Brahma are not mantras in the same sense as nama-japa formulas. They are contemplative sentences used in Vedantic inquiry.</p>
                        <p>They belong on this list because many seekers drawn to non-duality encounter them early and misuse them badly. These are not slogans for identity inflation. They are meant to be unfolded under proper teaching and assimilated through shravana, manana, and nididhyasana, hearing, reflection, and contemplative assimilation.</p>
                        <p>Their occasion is study and contemplation. Their category is vakya. Their power lies in interpretive exactness, not in raw sonic repetition alone.</p>

                        <h2>6. Panchakshara as a category</h2>
                        <p>Strictly speaking, Om Namah Shivaya already names the most famous panchakshara. It is still worth isolating the category because many beginners hear the term and do not realize it refers to a formal structure of five sacred syllables with Shaiva associations.</p>
                        <p>In traditional use, the five syllables are linked with elemental, ritual, and theological correspondences. That means the term is not merely a poetic label. It indicates a framework around the sound-body of the mantra.</p>
                        <p>This matters because category knowledge protects the practitioner from treating the mantra as a vague wellness token. The formula has lineage and doctrinal placement.</p>

                        <Break />

                        <h2>7. A Devi mantra, exemplified by Om Dum Durgayei Namaha</h2>
                        <p>Shakta traditions contain a wide range of mantras, from public devotional formulas to highly restricted seed-based practices. For beginners, a public Devi name-mantra such as Om Dum Durgayei Namaha is usually more suitable than esoteric multi-bija sequences.</p>
                        <p>Its doctrinal center is Devi in protective and ordering form, here especially Durga. Its occasion can be daily devotion, Navaratri observance, or times of fear and obstruction.</p>
                        <p>This category is where caution matters most. Many seekers are drawn to Shakta mantra because it feels intense. If the formula is seed-heavy, explicitly Tantric, or transmitted as initiated practice, that intensity is precisely why restraint is required.</p>

                        <h2>8. Om Namo Narayanaya, Oṁ Namo Nārāyaṇāya</h2>
                        <p>This Vaishnava mantra is among the clearest public devotional formulas for household practice. It is directed to Narayana, Vishnu as supreme sustaining reality in many lineages, and supports steadiness, surrender, and devotional remembrance.</p>
                        <p>Its length is slightly greater than Om Namah Shivaya, but it is highly usable in japa. Its theological frame is explicit, which helps practitioners avoid the modern habit of abstracting mantra away from deity and doctrine.</p>
                        <p>For many Vaishnava-leaning beginners, this is a superior choice to more emotionally charged formulas because it permits daily continuity without excess complication.</p>

                        <h2>9. Mrityunjaya Stotram, Mṛtyuñjaya Stotram</h2>
                        <p>As with the Hanuman Chalisa, this belongs here to correct category confusion. A stotram is not a mantra in the strict narrow sense, yet repeated hymn recitation can be spiritually central and practically more sustainable for many devotees.</p>
                        <p>Mrityunjaya stotra literature in Shaiva devotion expands themes of the Mahamrityunjaya mantra into a fuller devotional form. Its occasion is still fear, illness, mortality, and protection, but the mode is liturgical and hymn-like rather than concise mantra-japa.</p>
                        <p>For some practitioners, especially those whose attention needs narrative and praise, this can be more effective than forced repetition of a short formula they do not yet understand.</p>

                        <h2>10. A simple contemplative mantra such as So'ham</h2>
                        <p>So'ham occupies a different register from the deity-name mantras above. It is linked to breath and contemplative identity. In many settings it is understood as "I am That," though its force in practice lies in steady breath-linked repetition rather than verbal assertion.</p>
                        <p>Its occasion is meditation rather than liturgical recitation. Its category is contemplative vakya or breath-mantra. It suits seekers drawn to quiet interior practice more than relational devotion.</p>
                        <p>It is also a reminder that mantra is not one thing. Some mantras invoke a deity. Some praise. Some protect. Some illuminate. Some destabilize false identity. The family resemblance does not erase the differences.</p>

                        <Break />

                        <h2>How to use this list without misusing the tradition</h2>
                        <p>First, do not choose based on reputation alone. A famous mantra is not automatically your mantra. Second, do not confuse public availability with universality of fit. The question is not only whether you may recite it, but whether it suits your temperament and stage.</p>
                        <p>Third, correct pronunciation gradually. A public mantra still deserves phonetic care. Fourth, distinguish between mantra, stotra, and mahavakya. They can all be powerful. They are not interchangeable.</p>
                        <p>Fifth, if you are choosing your first daily practice, start with a public and stable formula, then learn the method through <ArticleLink href="/how-to-start-japa" eventLabel="mantras:body:japa">japa practice</ArticleLink>. If you need help selecting a suitable category, use <ArticleLink href="/how-to-choose-a-mantra" eventLabel="mantras:body:choose">this mantra selection guide</ArticleLink>, browse the <ArticleLink href="/mantras" eventLabel="mantras:body:hub">mantra hub</ArticleLink>, or refine pronunciation through <ArticleLink href="/learn/sanskrit" eventLabel="mantras:body:sanskrit">Sanskrit basics</ArticleLink>.</p>
                        <p>The discipline is plain. Pick a suitable mantra. Pronounce it carefully. Repeat it daily. Let tradition, not novelty, determine what power means.</p>
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
                        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Do not chase power before you understand category</h2>
                        <p className="mx-auto mb-8 max-w-2xl text-orange-50 text-lg leading-relaxed">The right mantra is not the most dramatic one. It is the one your tradition, capacity, pronunciation, and daily discipline can actually sustain.</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <ArticleLink href="/how-to-start-japa" eventLabel="mantras:footer:japa">How to Start Japa</ArticleLink>
                            <ArticleLink href="/how-to-choose-a-mantra" eventLabel="mantras:footer:choose">Choose a Suitable Mantra</ArticleLink>
                        </div>
                    </section>
                </article>
            </main>

            <Footer />
        </div>
    );
}