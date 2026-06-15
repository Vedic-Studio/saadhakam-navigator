import type { Metadata } from "next";
import { getArticleBySlug, getPillarConfig } from "@/features/articles";
import { buildArticleSchemas } from "@/lib/seo";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BookOpen, Scale } from "lucide-react";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
import { LongformContent } from "@/components/LongformContent";

export const metadata: Metadata = {
    title: "The Six Darshanas | Classical Schools of Indian Philosophy",
    description:
        "The six astika darshanas: Nyaya, Vaisheshika, Samkhya, Yoga, Purva Mimamsa, and Vedanta. Founder, sutra text, core idea, and pramana count for each, in one table.",
    alternates: {
        canonical: "https://www.opensadhaka.com/six-darshanas",
    },
    openGraph: {
        title: "The Six Darshanas: Classical Schools of Indian Philosophy",
        description:
            "Nyaya, Vaisheshika, Samkhya, Yoga, Purva Mimamsa, and Vedanta. The six orthodox schools that accept Vedic authority, each with its sutra text and pramana list.",
        url: "https://www.opensadhaka.com/six-darshanas",
        type: "article",
    },
};

const faqs = [
    {
        question: "How many classical darshanas are there?",
        answer:
            "There are six classical darshanas: Nyaya, Vaisheshika, Samkhya, Yoga, Purva Mimamsa, and Vedanta (Uttara Mimamsa). All six are called astika because they accept the authority of the Vedas. They are traditionally grouped into three pairs by topical affinity.",
    },
    {
        question: "What are the three traditional pairings of the darshanas?",
        answer:
            "The six schools pair as Nyaya-Vaisheshika (logic and ontology), Samkhya-Yoga (metaphysics and practice), and Mimamsa-Vedanta (ritual interpretation and philosophical interpretation of the Veda). Each pair shares a subject matter while keeping its own sutra text. Karl Potter's Encyclopedia of Indian Philosophies treats them in these groupings.",
    },
    {
        question: "What is the difference between astika and nastika schools?",
        answer:
            "Astika means accepting the authority of the Vedas, not belief in a creator God. Purva Mimamsa is formally silent on a creator, and Samkhya is formally atheistic, yet both are astika because they accept Vedic authority. Nastika schools reject that authority: Buddhism, Jainism, and Charvaka.",
    },
    {
        question: "Which darshana is Yoga, and how does it relate to Samkhya?",
        answer:
            "Yoga is the darshana of Patanjali's Yoga Sutras. It inherits Samkhya's purusha-prakriti dualism and its theory of the three gunas, then adds the eightfold ashtanga discipline as the practical method. The two differ on God: Yoga accepts Ishvara as a focus for meditation, while Samkhya is formally atheistic.",
    },
];

const schools = [
    {
        name: "Nyaya",
        founder: "Gautama (Akshapada)",
        text: "Nyaya Sutras",
        idea: "Logic and epistemology; the structure of inference and debate",
        pramanas: "Four (perception, inference, comparison, testimony)",
    },
    {
        name: "Vaisheshika",
        founder: "Kanada",
        text: "Vaisheshika Sutras",
        idea: "Ontology; the categories of existence (padarthas) and atomism",
        pramanas: "Two (perception, inference)",
    },
    {
        name: "Samkhya",
        founder: "Kapila",
        text: "Samkhya Karika (Ishvarakrishna)",
        idea: "Dualism of purusha and prakriti; the three gunas",
        pramanas: "Three (perception, inference, testimony)",
    },
    {
        name: "Yoga",
        founder: "Patanjali",
        text: "Yoga Sutras",
        idea: "The eightfold ashtanga path; Ishvara as a meditative focus",
        pramanas: "Three (perception, inference, testimony)",
    },
    {
        name: "Purva Mimamsa",
        founder: "Jaimini",
        text: "Mimamsa Sutras",
        idea: "Ritual hermeneutics; the interpretation of Vedic injunction and dharma",
        pramanas: "Five (Prabhakara) to six (Kumarila Bhatta)",
    },
    {
        name: "Vedanta (Uttara Mimamsa)",
        founder: "Badarayana",
        text: "Brahma Sutras",
        idea: "The nature of Brahman; splits into Advaita, Vishishtadvaita, Dvaita",
        pramanas: "Six in the Advaita reckoning",
    },
];

const pairs = [
    {
        title: "Nyaya and Vaisheshika",
        body: "Nyaya supplied the method of valid reasoning; Vaisheshika supplied the inventory of what exists. Logic needs an ontology to reason about, and an ontology needs a logic to defend it, so the two were fused historically into a single Nyaya-Vaisheshika tradition. Its standard exposition is Prashastapada's Padartha-dharma-sangraha.",
    },
    {
        title: "Samkhya and Yoga",
        body: "Samkhya describes the terrain: consciousness (purusha) standing apart from an evolving nature (prakriti) built of three gunas. Yoga supplies the route across it, the eightfold ashtanga discipline that isolates purusha from prakriti. Patanjali borrows Samkhya's map and adds the practice it lacked.",
    },
    {
        title: "Mimamsa and Vedanta",
        body: "Both read the Veda, but they read different halves of it. Purva Mimamsa interprets the ritual and injunctive portions (karma-kanda); Uttara Mimamsa, which is Vedanta, interprets the philosophical portions (jnana-kanda) of the Upanishads. The shared name Mimamsa, meaning inquiry, marks them as the early and later stages of one interpretive project.",
    },
];

const references = [
    {
        label: "Encyclopedia of Indian Philosophies (Karl H. Potter, gen. ed.), Princeton / Motilal Banarsidass",
        href: "https://www.britannica.com/topic/Indian-philosophy",
    },
    {
        label: "Indian Philosophy, Stanford Encyclopedia of Philosophy",
        href: "https://plato.stanford.edu/entries/perception-india/",
    },
    {
        label: "B.K. Matilal, Perception: An Essay on Classical Indian Theories of Knowledge (Oxford, 1986)",
        href: "https://www.britannica.com/biography/Bimal-Krishna-Matilal",
    },
];

export default function SixDarshanasPage() {
    const article = getArticleBySlug("six-darshanas")!;
    const pillar = getPillarConfig(article.pillar);
    const schemas = buildArticleSchemas(article, pillar.label, pillar.href);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.article) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }} />
            <ContentPageTracker slug="six-darshanas" pillar="ancient-wisdom" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-5xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Philosophies", href: "/philosophies" },
                            { label: "The Six Darshanas", href: "/six-darshanas" },
                        ]}
                    />

                    <header className="mb-12 mt-8">
                        <h1 className="font-display text-4xl md:text-6xl font-black mb-8 tracking-tighter leading-[0.95]">
                            The Six Darshanas: The Classical Schools of Indian Philosophy
                        </h1>
                        <p
                            data-speakable
                            className="text-lg text-foreground leading-relaxed max-w-3xl border-l-4 border-orange-500/40 pl-6 py-2"
                        >
                            There are six classical darshanas, the orthodox schools of Indian philosophy that accept the authority of the Vedas: Nyaya, Vaisheshika, Samkhya, Yoga, Purva Mimamsa, and Vedanta (Uttara Mimamsa). Each rests on a foundational sutra text and a commentarial lineage. They group into three traditional pairs: Nyaya with Vaisheshika, Samkhya with Yoga, and Mimamsa with Vedanta. Being orthodox (astika) means accepting the Vedas, not believing in a creator God.
                        </p>
                    </header>

                    {/* Direct-answer table (lead element) */}
                    <section className="mb-16">
                        <div className="overflow-x-auto rounded-2xl border border-border/60">
                            <table className="w-full text-left text-sm">
                                <caption className="sr-only">
                                    The six classical darshanas with founder, sutra text, core idea, and accepted pramanas
                                </caption>
                                <thead className="bg-muted/40 text-foreground">
                                    <tr>
                                        <th scope="col" className="px-4 py-3 font-bold">Darshana</th>
                                        <th scope="col" className="px-4 py-3 font-bold">Founder / key text</th>
                                        <th scope="col" className="px-4 py-3 font-bold">Core idea</th>
                                        <th scope="col" className="px-4 py-3 font-bold">Pramanas</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/40">
                                    {schools.map((s) => (
                                        <tr key={s.name} className="align-top">
                                            <th scope="row" className="px-4 py-4 font-bold text-orange-400 whitespace-nowrap">
                                                {s.name}
                                            </th>
                                            <td className="px-4 py-4 text-muted-foreground">
                                                <span className="text-foreground">{s.founder}</span>
                                                <br />
                                                <span className="italic">{s.text}</span>
                                            </td>
                                            <td className="px-4 py-4 text-muted-foreground">{s.idea}</td>
                                            <td className="px-4 py-4 text-muted-foreground">{s.pramanas}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-3 text-xs text-muted-foreground italic">
                            Founder attributions are traditional ascriptions. Pramana counts follow the standard classical reckoning recorded in B.K. Matilal&apos;s work and the Stanford Encyclopedia of Philosophy.
                        </p>
                    </section>

                    <article className="space-y-14">
                        <section>
                            <h2 className="text-3xl font-display font-bold mb-5">What is a darshana?</h2>
                            <LongformContent>
                                <p className="text-lg text-muted-foreground leading-relaxed mb-5">
                                    Darshana (दर्शन) means &ldquo;a way of seeing&rdquo; or &ldquo;view,&rdquo; from the Sanskrit root drish, to see. A philosophical school earns the name when it offers a worked-out account of reality with its own sutra text, commentators, and live internal debates. The word also carries a devotional sense, the act of beholding a deity or saint, which is a separate usage. (For that meaning, see <Link href="/what-is-darshan" className="text-orange-400 hover:underline">what darshan means in worship</Link>.)
                                </p>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    Six darshanas are called astika, a label that turns on one criterion: they accept the authority of the Vedas. That is the technical meaning of orthodox here, and it says nothing about belief in a creator. Karl Potter&apos;s <em>Encyclopedia of Indian Philosophies</em> treats these six as the mature systems of the classical tradition.
                                </p>
                            </LongformContent>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">The six orthodox schools</h2>
                            <div className="space-y-6">
                                <div className="rounded-xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="text-xl font-bold mb-2 text-orange-400">Nyaya</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Nyaya, the school traditionally ascribed to Gautama (also called Akshapada) in the <em>Nyaya Sutras</em>, built classical India&apos;s formal logic and epistemology. It articulated the anumana (inference) schema and accepted four pramanas. Its long debate with the Buddhist logicians Dignaga and Dharmakirti shaped the whole tradition. See <TrackedLink href="/philosophies/nyaya-vaisheshika" eventLabel="six_darshanas:body:nyaya-vaisheshika" trackPathName="philosophies/nyaya-vaisheshika" className="text-orange-400 hover:underline">Nyaya-Vaisheshika</TrackedLink>.
                                    </p>
                                </div>
                                <div className="rounded-xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="text-xl font-bold mb-2 text-orange-400">Vaisheshika</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Vaisheshika, ascribed to Kanada in the <em>Vaisheshika Sutras</em>, is the ontology school. It catalogued the padarthas, the categories of existence, and proposed that the physical world is built from indivisible atoms (paramanu). It accepts only two pramanas, perception and inference. Its account is treated alongside Nyaya in <TrackedLink href="/philosophies/nyaya-vaisheshika" eventLabel="six_darshanas:body:vaisheshika" trackPathName="philosophies/nyaya-vaisheshika" className="text-orange-400 hover:underline">the merged Nyaya-Vaisheshika tradition</TrackedLink>.
                                    </p>
                                </div>
                                <div className="rounded-xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="text-xl font-bold mb-2 text-orange-400">Samkhya</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Samkhya, ascribed to Kapila and set out in Ishvarakrishna&apos;s <em>Samkhya Karika</em>, is the oldest systematic Indian metaphysics. It posits two ultimate realities: purusha, inactive consciousness, and prakriti, active nature that evolves through the interplay of three gunas (sattva, rajas, tamas). It accepts three pramanas. Read <TrackedLink href="/philosophies/samkhya" eventLabel="six_darshanas:body:samkhya" trackPathName="philosophies/samkhya" className="text-orange-400 hover:underline">Samkhya</TrackedLink>.
                                    </p>
                                </div>
                                <div className="rounded-xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="text-xl font-bold mb-2 text-orange-400">Yoga</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Yoga, the darshana of Patanjali&apos;s <em>Yoga Sutras</em>, takes Samkhya&apos;s metaphysics and supplies the discipline it lacked. Its eightfold ashtanga path isolates purusha from prakriti, ending in kaivalya. Patanjali also admits Ishvara, but as an object of meditative focus rather than a creator. Read <TrackedLink href="/philosophies/yoga-darshana" eventLabel="six_darshanas:body:yoga" trackPathName="philosophies/yoga-darshana" className="text-orange-400 hover:underline">Yoga darshana</TrackedLink>.
                                    </p>
                                </div>
                                <div className="rounded-xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="text-xl font-bold mb-2 text-orange-400">Purva Mimamsa</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Purva Mimamsa, ascribed to Jaimini in the <em>Mimamsa Sutras</em>, is the school of ritual interpretation. It works out what Vedic injunctions command, how to resolve apparent contradictions in the text, and how dharma is established. Its hermeneutic methods became the template for classical Indian textual interpretation. The pramana count runs to five for Prabhakara and six for Kumarila Bhatta. Read <TrackedLink href="/philosophies/mimamsa" eventLabel="six_darshanas:body:mimamsa" trackPathName="philosophies/mimamsa" className="text-orange-400 hover:underline">Mimamsa</TrackedLink>.
                                    </p>
                                </div>
                                <div className="rounded-xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="text-xl font-bold mb-2 text-orange-400">Vedanta (Uttara Mimamsa)</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Vedanta, ascribed to Badarayana in the <em>Brahma Sutras</em>, interprets the philosophical portions of the Veda and inquires into Brahman. It later split into rival sub-schools: Advaita (Shankara), Vishishtadvaita (Ramanuja), and Dvaita (Madhva). They share the same sutra text yet disagree sharply on the relation between self and Brahman. Read <TrackedLink href="/philosophies/vedanta" eventLabel="six_darshanas:body:vedanta" trackPathName="philosophies/vedanta" className="text-orange-400 hover:underline">Vedanta</TrackedLink> and <TrackedLink href="/what-is-vedanta" eventLabel="six_darshanas:body:what-is-vedanta" trackPathName="what-is-vedanta" className="text-orange-400 hover:underline">what Vedanta means</TrackedLink>.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">The three traditional pairings</h2>
                            <LongformContent>
                                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                    The six are not a flat list. The tradition groups them into three pairs by topical affinity, each pair joining a theory to its complement.
                                </p>
                            </LongformContent>
                            <div className="space-y-5">
                                {pairs.map((p) => (
                                    <div key={p.title} className="rounded-xl border border-border/40 bg-muted/20 p-6">
                                        <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">{p.body}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="rounded-2xl border border-orange-500/20 bg-orange-500/[0.04] p-8">
                            <div className="flex items-center gap-3 mb-5">
                                <Scale className="text-orange-500 w-7 h-7" />
                                <h2 className="text-3xl font-display font-bold">Astika vs nastika: what &ldquo;orthodox&rdquo; actually means</h2>
                            </div>
                            <LongformContent>
                                <p className="text-lg text-muted-foreground leading-relaxed mb-5">
                                    English sources often gloss astika as &ldquo;theist&rdquo; and nastika as &ldquo;atheist.&rdquo; That is the wrong axis. Astika means accepting the authority of the Vedas; nastika means rejecting it. The question is scriptural authority, not the existence of God.
                                </p>
                                <p className="text-lg text-muted-foreground leading-relaxed mb-5">
                                    The proof sits inside the six themselves. Purva Mimamsa is formally silent on a creator and concerns itself with ritual efficacy instead. Samkhya is formally atheistic, deriving the world from prakriti with no God required. Yoga admits Ishvara, but Patanjali treats it as a meditative focus, not a maker of worlds. All three remain astika, because all three accept Vedic authority.
                                </p>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    The nastika schools are the ones that reject that authority: Buddhism, Jainism, and Charvaka. They are not lesser philosophies. Buddhist and Jain logicians developed rigorous metaphysics and epistemology and stayed in direct debate with the darshanas for centuries. This correction follows the analysis in the Stanford Encyclopedia of Philosophy and Karl Potter&apos;s <em>Encyclopedia of Indian Philosophies</em>.
                                </p>
                            </LongformContent>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-8">Frequently asked questions</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {faqs.map((faq) => (
                                    <div key={faq.question} className="rounded-2xl border border-border/40 bg-card/40 p-7 shadow-sm">
                                        <h3 className="text-lg font-bold mb-3">{faq.question}</h3>
                                        <p className="text-muted-foreground leading-relaxed pl-4 border-l-2 border-orange-500/20">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="rounded-2xl border border-border/60 bg-muted/10 p-8">
                            <div className="flex items-center gap-3 mb-5">
                                <BookOpen className="text-orange-500 w-6 h-6" />
                                <h2 className="text-2xl font-display font-bold">Sources and further reading</h2>
                            </div>
                            <ul className="space-y-3 mb-8">
                                {references.map((ref) => (
                                    <li key={ref.href}>
                                        <a
                                            href={ref.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-orange-400 hover:underline text-sm"
                                        >
                                            {ref.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                                <Link href="/philosophies" className="text-muted-foreground hover:text-orange-400 transition-colors">All philosophies</Link>
                                <Link href="/what-is-sanatan-dharma" className="text-muted-foreground hover:text-orange-400 transition-colors">What is Sanatan Dharma</Link>
                                <Link href="/advaita-vedanta-explained" className="text-muted-foreground hover:text-orange-400 transition-colors">Advaita Vedanta explained</Link>
                                <Link href="/advaita-vs-dvaita" className="text-muted-foreground hover:text-orange-400 transition-colors">Advaita vs Dvaita</Link>
                            </div>
                        </section>
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
