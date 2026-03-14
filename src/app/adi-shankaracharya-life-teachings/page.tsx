import type { ReactNode } from "react";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
import {
    buildArticleSchema,
    buildBreadcrumbSchema,
    buildCanonicalUrl,
    buildFaqSchema,
} from "@/lib/seo";

const pagePath = "/adi-shankaracharya-life-teachings";
const title = "Adi Shankaracharya: Life, Teachings, Debates, and Lasting Legacy";
const description =
    "Adi Shankaracharya's life and teachings explained through his short life, commentarial achievement, debate culture, confrontation with Mimamsa and Buddhism, four mathas, and enduring Advaita legacy.";

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: buildCanonicalUrl(pagePath) },
    openGraph: {
        title,
        description,
        url: buildCanonicalUrl(pagePath),
        type: "article",
    },
};

const faqs = [
    {
        question: "Did Adi Shankaracharya really live only about 32 years?",
        answer:
            "Traditional Shankara-vijaya biographies and later Advaita lineages consistently place Shankara's life at roughly thirty two years. Modern historians debate exact dates, but both traditional and modern accounts agree on the striking compression of his career.",
    },
    {
        question: "What made Shankaracharya philosophically decisive?",
        answer:
            "His decisive achievement was not simply teaching non-duality. It was writing durable commentaries on the Upanishads, Bhagavad Gita, and Brahma Sutras, then defending their Advaita interpretation against Mimamsa ritualism, Buddhist epistemology, and rival Vedanta readings.",
    },
    {
        question: "Did Shankaracharya defeat Buddhism across India?",
        answer:
            "That claim is too simple. Buddhist institutions were already changing for political and historical reasons, but Shankara's arguments against Vijnanavada and Madhyamaka helped establish Advaita as the leading Brahmanical response to Buddhist philosophy in Sanskrit intellectual culture.",
    },
    {
        question: "What are the four mathas associated with Shankaracharya?",
        answer:
            "Advaita tradition associates him with four monastic centers at Sringeri, Puri, Dvaraka, and Jyotirmath. Historical details are debated, but these institutions became central to the later self-understanding and continuity of the Shankara lineage.",
    },
];

const faqSchema = buildFaqSchema(faqs);
const articleSchema = buildArticleSchema({
    headline: title,
    description,
    url: buildCanonicalUrl(pagePath),
    datePublished: "2026-03-15",
    section: "Ancient Wisdom",
    keywords: ["adi shankaracharya life teachings", "adi shankaracharya biography", "shankara advaita"],
});
const breadcrumbSchema = buildBreadcrumbSchema([
    { label: "Home", href: "/" },
    { label: "Ancient Wisdom", href: "/ancient-wisdom-philosophies" },
    { label: title, href: pagePath },
]);

function Break() {
    return <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />;
}

function ArticleLink({ href, children, eventLabel }: { href: string; children: ReactNode; eventLabel: string }) {
    return (
        <TrackedLink
            href={href}
            eventLabel={eventLabel}
            trackPathName="ancient-wisdom"
            className="inline-flex items-center gap-2 font-semibold text-orange-400 transition-colors hover:text-orange-300"
        >
            {children}
            <ArrowRight className="h-4 w-4" />
        </TrackedLink>
    );
}

export default function AdiShankaracharyaLifeTeachingsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <ContentPageTracker slug="adi-shankaracharya-life-teachings" pillar="ancient-wisdom" />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <article className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Ancient Wisdom", href: "/ancient-wisdom-philosophies" }, { label: "Adi Shankaracharya", href: pagePath }]} />

                    <header className="mt-8 mb-12">
                        <div className="mb-4 inline-flex rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">Ancient Wisdom</div>
                        <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-5">Adi Shankaracharya: The Scale of His Achievement Lies in Its Compression</h1>
                        <p className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5 text-base leading-relaxed text-foreground/90">
                            Adi Shankaracharya's achievement is extraordinary because it was compressed into a life of roughly thirty two years. Traditional accounts place his birth in Kaladi, Kerala, and portray him as a renunciant, commentator, public debater, and institutional organizer whose work fixed the classical Advaita Vedanta reading of the Upanishads, Bhagavad Gita, and Brahma Sutras. His historical importance lies not in legend alone, but in how much of later Hindu intellectual life had to define itself in relation to him.
                        </p>
                    </header>

                    <div className="longform-prose max-w-none">
                        <p className="article-lead">The common Western misreading is that Shankara was a mystic who floated above institutions and sectarian argument. The surviving record shows the opposite. He was a severe exegete who entered the hardest philosophical disputes of his time and built durable structures around those victories.</p>
                        <p>The first fact that matters is chronological compression. Whether one follows the traditional dating around 788 to 820 CE or entertains earlier proposals, the tradition agrees that the public career was astonishingly short. That short span forces a different measure of judgment, because what would count as the labor of several generations appears concentrated in one figure.</p>
                        <p>The second fact is textual. Shankara's authority rests primarily on his bhashyas, his commentaries, not on later miracle stories. When later Advaitins defend him, they return to the Brahma Sutra Bhashya, the Bhagavad Gita Bhashya, and the Upanishad Bhashyas because those are the works that made his school durable.</p>

                        <Break />

                        <h2>Birth in Kerala and the early formation of a renunciant scholar</h2>
                        <p>Advaita lineage memory places Shankara's birth at Kaladi in present day Kerala. The biographies call his parents Shivaguru and Aryamba, and they situate him within a Nambudiri Brahmin environment already marked by Vedic learning. The historical core is plausible even where hagiography expands the scene.</p>
                        <p>Later Shankara-vijaya texts describe precocious mastery of scripture and an early movement toward sannyasa, renunciation. Those details are not trivial ornament. They explain why later tradition treats him as a commentator whose authority depended on Vedic learning joined to renunciant detachment, not on charisma alone.</p>
                        <p>He is then linked to Govindapada, who is presented as the disciple of Gaudapada. That lineage matters because Gaudapada's Mandukya Karika already offers a sophisticated non-dual reading of the Mandukya Upanishad while arguing against Buddhist positions in a shared philosophical vocabulary. Shankara did not invent non-duality from nothing. He inherited, sharpened, and stabilized it.</p>

                        <h2>Commentarial work, not slogan-making, made him decisive</h2>
                        <p>Shankara's achievement is sometimes reduced to the phrase that the world is illusion. That summary is careless. His real labor was interpretive. He argued that the Upanishads, when read with discipline, teach the identity of atman and brahman, and he then showed how that reading governs the Brahma Sutras and Bhagavad Gita.</p>
                        <p>In the Brahma Sutra Bhashya he begins not with a definition of Brahman but with a question: why is the inquiry necessary at all? The opening sutra, <em>athāto brahma-jijñāsā</em> — "now, therefore, the inquiry into Brahman" — is ancient. Shankara's gloss begins by diagnosing why inquiry is needed in the first place. His answer is adhyasa, superimposition. The human problem is not first moral failure or ritual omission. It is the confusion by which the self is mixed with body, mind, agency, and change.</p>
                        <p>That single move gave Advaita its enduring architecture. Liberation in this framework is not the production of a new state. It is the removal of error through knowledge, jnana, generated by shruti, reasoning, and contemplative assimilation.</p>

                        <div className="article-callout" data-tone="insight">
                            <div className="article-callout-title">Why the commentaries matter</div>
                            <p>A school survives in Sanskrit intellectual culture when it can defend its reading of shared source texts. Shankara's durability comes from commentary as method, not from inspirational aphorism.</p>
                        </div>

                        <p>His Bhagavad Gita Bhashya is equally important. There he refuses the simple opposition between action and knowledge. Karma has a preparatory role, especially in purifying the mind, but liberating knowledge alone removes avidya according to his reading. That distinction became central to every later argument with ritualist and devotional interpreters.</p>
                        <p>Much later literature attributes independent works like Vivekachudamani, Atma Bodha, and Bhaja Govindam to him. Some authorship questions remain open for scholars. Yet even where attribution is debated, the traditional Shankara corpus shows how the lineage wanted his teaching remembered, as severe discrimination joined to pedagogical clarity and occasional devotional force.</p>

                        <Break />

                        <h2>The debate culture of the period was real and Shankara entered it directly</h2>
                        <p>Indian philosophical culture in the early medieval period was not quiet speculation. It was structured disputation. Schools wrote against one another, answered objections in formal purvapaksha style, and sought public prestige through argument.</p>
                        <p>Shankara's later biographies dramatize this as digvijaya, conquest in all directions. The language is grand, but the underlying point is sober. His school understood itself as having won standing through debate, not by avoiding contest.</p>
                        <p>The famous story of Mandana Misra belongs here. Even if later retellings amplify the encounter, the story preserves an important memory. Advaita defined itself against Purva Mimamsa, the school that treated Vedic ritual action as primary and did not grant liberating supremacy to Upanishadic knowledge in the Advaita sense.</p>

                        <h2>Conflict with Mimamsa was central, not secondary</h2>
                        <p>For many modern readers, the drama lies in Shankara's criticism of Buddhism. Historically, the confrontation with Mimamsa was just as decisive. Mimamsakas such as Kumarila and Prabhakara had developed rigorous accounts of Vedic authority, language, duty, and ritual action.</p>
                        <p>Shankara had to answer them because they stood inside the Brahmanical world and claimed the Veda as strongly as he did. If ritual action is primary and eternal Vedic injunction is final, then liberating self-knowledge cannot occupy the position Advaita gives it. His interpretive revolution therefore required a direct contest over what the Veda is finally for.</p>
                        <p>His answer is exact. Injunction governs action, but brahman is not something to be produced by action. Since brahman is already the reality of the self, Upanishadic sentences function not as commands but as revelatory statements that remove ignorance. That is a technical, school-defining move.</p>
                        <p>Anyone trying to understand Shankara should therefore read him not only as a mystic of non-duality, but as a philosopher of scriptural sentences. He changed the hierarchy of Vedic meaning. That shift reordered the relation between ritual competence and liberating knowledge for later Vedanta.</p>

                        <Break />

                        <h2>His confrontation with Buddhist thought was sharp, selective, and historically important</h2>
                        <p>It is common to hear that Advaita simply borrowed from Buddhism. That statement is both too loose and too vague. Shankara writes in an intellectual world shaped by centuries of Buddhist philosophy, especially epistemological and idealist forms, but he argues against them in explicit terms.</p>
                        <p>In the Brahma Sutra Bhashya and related discussions, he targets Buddhist schools often grouped under Vijnanavada and Madhyamaka by later interpreters. He rejects the denial of a stable self, and he rejects any account that cannot ground enduring awareness without collapsing into momentariness or emptiness understood without a self-luminous witness.</p>
                        <p>At the same time, he shares argumentative terrain with Buddhist thinkers. That is why the debates are so close. The proximity is intellectual, not identical doctrine.</p>
                        <p>The decisive difference is this. For Shankara, the Upanishads reveal brahman as the non-dual reality and the self as not other than that reality. For the Buddhist positions he opposes, either no eternal self can be affirmed or emptiness dissolves substantial claims in a different way. Similar language about the instability of ordinary identity does not mean the schools end at the same place.</p>
                        <p>This matters because later Hindu self-understanding was shaped by that contrast. Shankara gave Brahmanical non-duality a form strong enough to resist Buddhist critique without surrendering the authority of shruti.</p>

                        <h2>The four mathas and the question of institutional continuity</h2>
                        <p>Tradition attributes to Shankara the establishment of four mathas, monastic centers, at Sringeri in the south, Govardhana at Puri in the east, Dvaraka in the west, and Jyotirmath in the north. Historians debate whether all four can be securely traced to his own lifetime in their present form. That caution is legitimate.</p>
                        <p>Yet the institutional fact is decisive. Advaita organized itself through these centers, their successor lineages, and the symbolic geography they created. Even where exact founding details are difficult, the four-matha structure became one of the main ways Shankara's memory was made administratively real.</p>
                        <p>Institutions matter because they preserve curriculum, ordination, commentary, public authority, and sectarian continuity. Without them, a philosopher can survive as an author. With them, a philosopher becomes a lineage.</p>
                        <p>That is one reason his life appears so compressed. He was not only writing and debating. The tradition also remembers him as arranging succession, geography, and authority. Whether every detail of that memory is equally historical, the resulting Advaita world is undeniable.</p>

                        <Break />

                        <h2>The surviving legacy reaches far beyond classroom Advaita</h2>
                        <p>Shankara's legacy survives first in Sanskrit commentary. Students of Advaita still return to his readings of Chandogya Upanishad, Brihadaranyaka Upanishad, Taittiriya Upanishad, and the Brahma Sutras because later authors are forced to position themselves for or against him. That is what canon looks like in practice.</p>
                        <p>It survives second in pedagogy. Later teachers such as Sureshvara, Vacaspati Misra, Prakasatman, Vidyaranya, Madhusudana Sarasvati, and in modern times Swami Dayananda Saraswati and Swami Paramarthananda, all teach in a field shaped by Shankara's categories. Even disagreement with him usually depends on his vocabulary.</p>
                        <p>It survives third in public Hindu self-description. Modern introductions to Advaita, to maya, and to non-duality often simplify the teaching, but they still inherit the frame he stabilized. If one reads contemporary explanations and then returns to the texts, the architecture is unmistakably his.</p>
                        <p>It also survives in figures outside formal institutional orthodoxy. Ramana Maharshi did not teach by reproducing medieval scholastic style, yet his method of self-inquiry is read by most Advaitins through a Shankara-shaped lens. Modern teachers can sound different because the structure beneath them was already made stable.</p>
                        <p>This is why his legacy cannot be measured only by authorship lists. It is measured by how much later discourse becomes unintelligible without him. That is the stronger test.</p>

                        <h2>How to judge him without surrendering to legend</h2>
                        <p>A sober judgment keeps three things together. First, the hagiographical material is real as tradition, but not all of it is equal as history. Second, the commentarial corpus is the secure center of his importance. Third, even the traditions that magnified his life did so because the textual and institutional consequences were already enormous.</p>
                        <p>The most surprising claim is also the safest one. His achievement is not merely that he taught Advaita. Others taught non-duality before him. His achievement is that he compressed textual mastery, philosophical contest, and institutional consolidation into a span of life so short that later memory had to become legendary in order to match the scale of the result.</p>
                        <p>That is why Shankara is unavoidable. To study <ArticleLink href="/advaita-vedanta-explained" eventLabel="shankara:body:advaita">Advaita Vedanta</ArticleLink>, to understand <ArticleLink href="/what-is-maya" eventLabel="shankara:body:maya">maya</ArticleLink>, to browse his place among the <ArticleLink href="/greats/adi-shankaracharya" eventLabel="shankara:body:greats">great teachers</ArticleLink>, or to situate him within <ArticleLink href="/philosophies/advaita" eventLabel="shankara:body:philosophies">the wider Advaita tradition</ArticleLink> is to keep returning to the same fact. The life was short. The footprint was not.</p>
                    </div>

                    <section className="mt-16 mb-16"><h2 className="font-display text-3xl font-bold mb-8">Frequently Asked Questions</h2><div className="space-y-5">{faqs.map((faq) => (<div key={faq.question} className="rounded-2xl border border-border/50 bg-card p-6"><h3 className="text-lg font-semibold mb-3">{faq.question}</h3><p className="text-muted-foreground leading-relaxed">{faq.answer}</p></div>))}</div></section>

                    <section className="rounded-3xl bg-orange-600 p-10 text-white text-center"><h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Read the framework Shankara made durable</h2><p className="mx-auto mb-8 max-w-2xl text-orange-50 text-lg leading-relaxed">If this article clarified the man, the next step is the system. Start with Advaita's core claims, then move to maya and the wider philosophy hub.</p><div className="flex flex-col sm:flex-row items-center justify-center gap-4"><ArticleLink href="/advaita-vedanta-explained" eventLabel="shankara:footer:advaita">Advaita Vedanta Explained</ArticleLink><ArticleLink href="/philosophies/advaita" eventLabel="shankara:footer:hub">Explore Advaita Resources</ArticleLink></div></section>
                </article>
            </main>

            <Footer />
        </div>
    );
}