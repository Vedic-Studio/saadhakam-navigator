import type { Metadata } from "next";
import { getArticleBySlug, getPillarConfig } from "@/features/articles";
import { buildArticleMetadata, buildArticleSchemas } from "@/lib/seo";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight } from "lucide-react";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
import { LongformContent } from "@/components/LongformContent";

const article = getArticleBySlug("spiritual-practice-sequence")!;
const pillar = getPillarConfig(article.pillar);

export const metadata: Metadata = buildArticleMetadata(article);

const stages = [
    {
        label: "Stage 1",
        title: "Karma Yoga",
        sanskrit: "कर्मयोग",
        purpose: "Purification (chitta-shuddhi)",
        gita: "Bhagavad Gita 3, 5, 6.1",
        symptom: "Mind agitated by reaction, craving, and aversion",
    },
    {
        label: "Stage 2",
        title: "Bhakti Yoga",
        sanskrit: "भक्तियोग",
        purpose: "Steadiness (ekagrata)",
        gita: "Bhagavad Gita 7, 9, 12",
        symptom: "Mind scattered, no single object of attention holds",
    },
    {
        label: "Stage 3",
        title: "Jnana Yoga",
        sanskrit: "ज्ञानयोग",
        purpose: "Liberating knowledge (vidya)",
        gita: "Bhagavad Gita 13, 15",
        symptom: "Mind steady but still identified with body-mind",
    },
];

const ashtanga = [
    { num: "1", sanskrit: "यम", roman: "Yama", english: "Restraints toward others" },
    { num: "2", sanskrit: "नियम", roman: "Niyama", english: "Disciplines for oneself" },
    { num: "3", sanskrit: "आसन", roman: "Asana", english: "Stable seated posture" },
    { num: "4", sanskrit: "प्राणायाम", roman: "Pranayama", english: "Breath regulation" },
    { num: "5", sanskrit: "प्रत्याहार", roman: "Pratyahara", english: "Withdrawal of the senses" },
    { num: "6", sanskrit: "धारणा", roman: "Dharana", english: "Concentration on one object" },
    { num: "7", sanskrit: "ध्यान", roman: "Dhyana", english: "Sustained meditation" },
    { num: "8", sanskrit: "समाधि", roman: "Samadhi", english: "Absorption" },
];

const chatushtaya = [
    {
        sanskrit: "विवेक",
        roman: "Viveka",
        english: "Discrimination",
        gloss: "The standing ability to distinguish the eternal (nitya) from the non-eternal (anitya). Vivekachudamani verse 20.",
    },
    {
        sanskrit: "वैराग्य",
        roman: "Vairagya",
        english: "Dispassion",
        gloss: "Absence of craving for any object of enjoyment, here or hereafter. Vivekachudamani verse 21.",
    },
    {
        sanskrit: "शमादिषट्कसम्पत्ति",
        roman: "Shamadi-shatka-sampatti",
        english: "Six inner disciplines",
        gloss: "Shama (mind control), dama (sense control), uparati (withdrawal from worldly action), titiksha (forbearance), shraddha (faith in teacher and scripture), samadhana (steady concentration). Vivekachudamani verses 22 to 26.",
    },
    {
        sanskrit: "मुमुक्षुत्व",
        roman: "Mumukshutva",
        english: "Longing for liberation",
        gloss: "The intense, exclusive desire for moksha that subordinates every other aim. Vivekachudamani verse 27.",
    },
];

const references = [
    { label: "Bhagavad Gita — Encyclopaedia Britannica", href: "https://www.britannica.com/topic/Bhagavadgita" },
    { label: "Yoga Sutras of Patanjali — Internet Encyclopedia of Philosophy", href: "https://iep.utm.edu/yoga/" },
    { label: "Shankara (Adi Shankaracharya) — Stanford Encyclopedia of Philosophy", href: "https://plato.stanford.edu/entries/shankara/" },
    { label: "Vivekachudamani — Chinmaya Mission", href: "https://www.chinmayamission.com/wisdom-content/the-vivekachudamani/" },
    { label: "Bhagavad Gita Chapter 6 (Sivananda Ashram)", href: "https://www.dlshq.org/teachings/bg-ch6/" },
];

export default function SpiritualPracticeSequencePage() {
    const schemas = buildArticleSchemas(article, pillar.label, pillar.href);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.article) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }} />
            <ContentPageTracker slug="spiritual-practice-sequence" pillar={article.pillar} />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: pillar.label, href: pillar.href },
                            { label: "Spiritual Practice Sequence", href: article.route },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
                            A Graded <span className="text-orange-500 italic">Curriculum</span>, Not a Buffet
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>Direct answer:</strong> {article.aeoAnswer}
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            Three independent classical sources converge on the same sequence. The path is ordered by readiness, not preference.
                        </p>
                    </header>

                    <LongformContent className="space-y-14">
                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">The Buffet Problem</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                English-language spiritual content sells practice as a menu. Pick the technique that resonates. Try mantra, then breath, then inquiry. Whatever pulls you. The framing is comfortable because it carries the same assumption as a consumer marketplace: the chooser is the authority. It also fits a Western temperament that treats hierarchical instruction as suspect.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The classical sources do not agree. The Bhagavad Gita prescribes a specific order of practice tied to the practitioner&apos;s state. Patanjali&apos;s Yoga Sutras list eight limbs in a deliberate sequence and treat the early ones as prerequisites for the later ones. Adi Shankaracharya, in the Vivekachudamani, names four qualifications a seeker must possess before jnana inquiry yields its fruit. None of the three frameworks treats practice as a personal choice.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Three independent sources, three different vocabularies, one structural claim: readiness gates what works. The following sections show what each source says.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Bhagavad Gita: Karma, Bhakti, Jnana</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The Gita prescribes three yogas in a specific order. Karma Yoga (action performed without attachment to its fruit) purifies the mind. Bhakti Yoga (devotion to a personal Ishvara) steadies the purified mind. Jnana Yoga (direct inquiry into the nature of the Self) liberates the steady mind. The sequence is in the text, not a later commentary invention.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Krishna states the order explicitly in Bhagavad Gita 6.3: <em>aruruksor muner yogam karma karanam ucyate, yogarudhasya tasyaiva samah karanam ucyate</em>. &quot;For the sage who wishes to attain yoga, action is said to be the means; for the same sage who has attained yoga, equanimity is said to be the means.&quot; Action is the means before yoga is attained. The text does not list action and equanimity as parallel options.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Madhusudana Sarasvati&apos;s commentary on the Gita divides the eighteen chapters into three sextets, each devoted to one yoga in sequence: chapters 1 to 6 expound Karma Yoga, chapters 7 to 12 expound Bhakti Yoga, chapters 13 to 18 expound Jnana Yoga. Shankaracharya&apos;s Gita Bhashya treats Karma Yoga as preparatory to Jnana Yoga and rejects their simultaneous practice. His comment on Gita 3.3 states: &quot;From no point of view whatsoever can there be a combination of Knowledge and action.&quot;
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The Gita is not casual about why. A mind dominated by rajas (restless ambition) and tamas (dullness) cannot hold steady devotion, and an unsteady mind cannot sustain Atma-anatma inquiry. Action without attachment is the only practice that operates on rajas and tamas directly. Skip it and the later stages have no foundation to land on.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The transition from Karma Yoga to Jnana Yoga is itself described in the text. Bhagavad Gita 4.38 states that <em>na hi jnanena sadrisham pavitram iha vidyate, tat svayam yoga-samsiddhah kalenatmani vindati</em>. &quot;There is nothing in this world as purifying as knowledge; one who has become perfected by yoga finds it within himself in time.&quot; Knowledge follows yoga, not the reverse. The compound <em>yoga-samsiddhah</em> (perfected by yoga) is the qualifier. Without yoga as preparation, the second clause does not apply.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Bhakti occupies the middle position for a structural reason, not a sentimental one. Chapter 12 (Bhakti Yoga) follows chapter 6 (the dhyana-yoga of Karma) because devotion to a personal Ishvara gives the purified mind a single object on which to rest. Gita 12.8 instructs Arjuna to fix his mind on Krishna directly. The verse goes on, 12.9 to 12.11, to descend the ladder of substitutes for practitioners who cannot. Each substitute is named because the higher rung is unreachable from a lower stage. The text accepts gradation. It does not pretend the rungs are interchangeable.
                            </p>
                        </section>

                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-8">The Three Stages in the Gita</h2>
                            <div className="space-y-6">
                                {stages.map((s) => (
                                    <div key={s.title} className="bg-background/60 rounded-2xl p-6 border border-border/30">
                                        <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                                            <span className="text-xs font-bold uppercase tracking-widest text-orange-400">{s.label}</span>
                                            <h3 className="font-bold text-xl text-foreground">{s.title}</h3>
                                            <span className="text-orange-400 italic text-sm">{s.sanskrit}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-1"><strong className="text-foreground">Purpose:</strong> {s.purpose}</p>
                                        <p className="text-sm text-muted-foreground mb-1"><strong className="text-foreground">Where in the text:</strong> {s.gita}</p>
                                        <p className="text-sm text-muted-foreground"><strong className="text-foreground">Symptom this stage addresses:</strong> {s.symptom}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Patanjali&apos;s Yoga Sutras: The Strict Eight-Limb Gate</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Patanjali codifies the sequence even more strictly. Yoga Sutra 2.29 lists the eight limbs (ashtanga): <em>yama, niyama, asana, pranayama, pratyahara, dharana, dhyana, samadhayo ashtavangani</em>. They are not eight options. They are eight stages in order, where each subsequent stage presupposes the previous one.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Sutra 2.28 names the function of the progression: <em>yoganganushthanad ashuddhi-kshaye jnana-diptir avivekakhyateh</em>. &quot;By the sustained practice of the limbs of yoga, impurity is destroyed, and the light of knowledge leads to discriminative awareness.&quot; The limbs are an impurity-removal sequence. Skip the earlier ones and the impurity remains, blocking what the later ones are meant to do.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The gating becomes explicit in 2.46 to 2.49. Sutra 2.46 defines asana as <em>sthira-sukham asanam</em>: a stable, comfortable seat. Sutra 2.47 specifies how that stability arises: <em>prayatna-shaithilyananta-samapattibhyam</em>, by relaxation of effort and absorption in the infinite. Only when asana is stable does Sutra 2.49 allow pranayama to begin: <em>tasmin sati shvasa-prashvasayor gati-vichchedah pranayamah</em>. Pranayama is conditional on asana, not parallel to it.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Modern postural yoga has collapsed the eight limbs into a single one (asana) and detached it from the prerequisites that give it meaning. Yama (non-harming, truthfulness, non-stealing, continence, non-possessiveness) and niyama (cleanliness, contentment, austerity, study, devotion to Ishvara) precede asana in Patanjali&apos;s sequence. Without them, the system is not Patanjali&apos;s yoga, regardless of the studio&apos;s claim.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                The strictness is consistent at every joint. Sutra 2.52 makes pranayama the precondition for pratyahara: <em>tatah kshiyate prakasha-avaranam</em>, the covering of the inner light is destroyed by pranayama, and only then does sense-withdrawal become available. Sutra 3.1 defines dharana as concentration bound to a single locus, and Sutra 3.2 defines dhyana as the unbroken flow of cognition toward that single object. Vyasa&apos;s commentary (the Yoga Bhashya) treats this progression as functional, not merely descriptive: each later limb operates on a substrate that only the earlier limbs can produce. Attempting dhyana without dharana is, in Vyasa&apos;s reading, a category error.
                            </p>
                        </section>

                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-8">The Eight Limbs (Ashtanga) in Order</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {ashtanga.map((limb) => (
                                    <div key={limb.roman} className="bg-background/60 rounded-2xl p-5 border border-border/30">
                                        <div className="flex items-baseline gap-3 mb-1">
                                            <span className="text-orange-400 font-black text-lg">{limb.num}</span>
                                            <h3 className="font-bold text-base text-foreground">{limb.roman}</h3>
                                            <span className="text-orange-400 italic text-sm">{limb.sanskrit}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{limb.english}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-base text-muted-foreground mt-8 leading-relaxed italic border-l-4 border-orange-500/30 pl-6">
                                Each stage is a precondition for the next. Patanjali does not present them as equivalent practices to choose between.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Shankaracharya: The Four-Fold Qualification</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Adi Shankaracharya is the most direct of the three. The Vivekachudamani opens with a description of human existence and immediately names the qualifications a seeker must possess before Vedanta will produce its fruit. The four are called sadhana chatushtaya (the four-fold means). Without them, the teaching does not land. With them, the teaching is sufficient.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The four are introduced in Vivekachudamani verses 18 to 19 and elaborated through verse 30. Each verse describes a specific inner capacity. The four are not optional preparations or recommended preliminaries. The text presents them as necessary conditions. Shankara&apos;s commentary on Brahma Sutra 1.1.1 makes the same point: the study of Vedanta presupposes the four.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The reason is structural. Jnana Yoga is the systematic inquiry &quot;who am I,&quot; pursued until the answer ceases to be an idea and becomes the lived recognition of one&apos;s own nature. A mind that has not steadied through viveka and vairagya cannot sustain the inquiry. A mind without the six inner disciplines cannot hold the stillness the inquiry requires. A mind without mumukshutva will treat the inquiry as one preoccupation among many. The result is intellectual posturing dressed as Advaita.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Shankaracharya does not present the four as a checklist. Vivekachudamani verse 32 names them as <em>sadhana-sampatti</em>, the accumulated wealth of practice, and treats them as a single integrated capacity rather than four separate items. Verse 33 specifies that even possession of the four is not enough on its own: the seeker must also approach a competent teacher (sadguru) and submit the inquiry to the discipline of sravana (hearing the teaching), manana (reflection), and nididhyasana (sustained contemplation). The four-fold qualification is the floor of seriousness. It is not the practice itself.
                            </p>
                        </section>

                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-8">Sadhana Chatushtaya (Vivekachudamani)</h2>
                            <div className="space-y-6">
                                {chatushtaya.map((q) => (
                                    <div key={q.roman} className="bg-background/60 rounded-2xl p-6 border border-border/30">
                                        <div className="flex items-baseline gap-3 mb-3 flex-wrap">
                                            <h3 className="font-bold text-xl text-foreground">{q.roman}</h3>
                                            <span className="text-orange-400 italic text-sm">{q.sanskrit}</span>
                                            <span className="text-sm text-muted-foreground">({q.english})</span>
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed">{q.gloss}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Where the Three Frameworks Converge</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The vocabularies differ. The Gita names three yogas. Patanjali names eight limbs. Shankara names four qualifications. The structural claim is the same: practice operates on a sequence of inner states, and the sequence is fixed.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                All three frameworks treat external action and outer discipline as the first stage. Karma Yoga (Gita), yama and niyama (Patanjali), and shamadi-shatka-sampatti (Shankara) all address the same domain: the practitioner&apos;s observable conduct, sense regulation, and emotional reactivity. All three frameworks treat single-pointed concentration as the middle stage. All three treat direct knowledge of one&apos;s own nature as the final stage, accessible only after the previous two are stable.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The doctrine of adhikari-bheda makes the convergence explicit. The Bhagavad Gita 17.2 states that <em>tridha bhavati sa shraddha sattviki rajasi tamasi tatha</em>. A person&apos;s innate faith is threefold according to guna constitution: sattvic, rajasic, or tamasic. The same teaching, given to practitioners with different guna mixtures, produces different effects. The teaching does not need to change. The practitioner&apos;s readiness does.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Three independent classical authorities, working in different vocabularies and different centuries, arrive at the same architectural claim about readiness and sequence. The burden of proof shifts. The default position is no longer &quot;choose the practice that resonates.&quot; The default is the sequence. Departures from it require justification, not the other way around.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Self-Diagnosis: Where You Actually Are</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Most readers four years into practice will place themselves in stage two or three. The placement is almost always inflated. Honest signs of completion for each stage follow. Read them with resistance to flattery.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                <strong className="text-foreground">Stage 1 (Karma Yoga, yama-niyama, shamadi-shatka) signs of completion:</strong> stable equanimity under routine adversity (rude email, missed bus, minor financial loss). Ability to receive criticism without internal narrative defense. Decreased reactivity to praise and blame, not as a performance but as the natural absence of stake. Reliable adherence to yama and niyama without ongoing internal negotiation. If criticism still rearranges your day, you are in stage one. Practice the stage one work.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                <strong className="text-foreground">Stage 2 (Bhakti, ekagrata) signs of completion:</strong> spontaneous arising of devotional feeling without ritual prompt. The capacity to hold the chosen ishta-devata (or chosen object of contemplation) in unbroken attention for an extended period. Mental quiet during ordinary obligations, not just during seated practice. If devotion requires the form of ritual to surface, or if a single object cannot hold the mind for thirty minutes, you are still in stage two. The work continues.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                <strong className="text-foreground">Stage 3 (Jnana) signs of completion:</strong> ability to follow Atma-anatma viveka (discrimination between Self and non-Self) without re-grounding in conceptual framing. Stability of recognition that the witnessing presence is not the body, not the senses, not the mind, not the intellect, not the ego. The recognition holds during practice and during ordinary activity, not only during favourable conditions. If the recognition collapses under stress, the inquiry is not yet stabilised.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Concrete tests, ordered from easiest to hardest: can you sit for twenty minutes without phone, music, or external stimulus, and feel the mind settle rather than scream? Can you receive a sharp critical message and respond after twenty minutes rather than twenty seconds? Can you skip one meal without it becoming a referendum on the day? Can you hold the chosen mantra for a full mala without the count slipping? Can you read one page of Vivekachudamani slowly enough that the meaning lands? Failures at the early items show that the first stage is still the right place to work. Success at the early items and failure at the later items shows the second stage is right.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Place yourself honestly. The honest answer is usually one stage behind the comfortable answer. Then practice the next missing piece, which is almost always less glamorous than what you wanted to be doing. The classical texts agree on this point too: the next correct practice is whichever one addresses your specific obstacle, not the practice with the highest reputation. Chinmayananda&apos;s BMI (Body-Mind-Intellect) diagnostic offers one shorthand. If your problem is mala (gross mental impurity), Karma Yoga is the right starting point. If your problem is vikshepa (fickleness of attention), Bhakti Yoga is the right next stage. If your problem is avarana (the veil of ignorance that remains even after the mind has steadied), Jnana Yoga is appropriate. Three different diagnoses. Three different prescriptions. The sequence is the doctor&apos;s order, not the patient&apos;s preference.
                            </p>
                        </section>

                        <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4">
                            <Link href="/how-karma-dharma-work" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                How Karma and Dharma Work <ArrowRight size={16} />
                            </Link>
                            <Link href="/yoga-sutras-complete-guide" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                Yoga Sutras Complete Guide <ArrowRight size={16} />
                            </Link>
                            <Link href="/advaita-vedanta-explained" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                Advaita Vedanta Explained <ArrowRight size={16} />
                            </Link>
                            <Link href="/choose-between-bhakti-jnana-karma-raja-yoga" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                Which Yoga Fits You <ArrowRight size={16} />
                            </Link>
                            <Link href="/daily-spiritual-routine-beginners" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                Daily Spiritual Routine <ArrowRight size={16} />
                            </Link>
                            <Link href="/how-to-start-japa" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                How to Start Japa <ArrowRight size={16} />
                            </Link>
                        </div>
                    </LongformContent>

                    <section className="mt-16">
                        <h2 className="text-4xl font-display font-bold mb-12 text-center tracking-tight uppercase">Common Questions</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {article.faqs.map((faq) => (
                                <div key={faq.question} className="rounded-2xl border border-border/40 bg-card/40 p-8 shadow-sm">
                                    <h3 className="text-xl font-bold mb-4">{faq.question}</h3>
                                    <p className="text-muted-foreground leading-relaxed pl-4 border-l-2 border-orange-500/20">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mt-16 mb-20">
                        <h2 className="text-2xl font-display font-bold mb-8 text-muted-foreground uppercase tracking-wide">Sources &amp; Commentaries</h2>
                        <ul className="space-y-3 text-sm">
                            {references.map((ref) => (
                                <li key={ref.href}>
                                    <a
                                        href={ref.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-orange-400 hover:text-orange-300 underline transition-colors"
                                    >
                                        {ref.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {article.footerCta && (
                        <div className="mt-8 bg-orange-600 rounded-3xl p-12 text-center text-white shadow-2xl">
                            <h2 className="text-4xl lg:text-5xl font-display font-black mb-6">{article.footerCta.title}</h2>
                            <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10 font-medium">
                                {article.footerCta.description}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <TrackedLink
                                    href={article.footerCta.href}
                                    eventLabel="spiritual_practice_sequence:footer:cta"
                                    trackPathName={article.footerCta.href.replace(/^\//, "")}
                                    className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                                >
                                    {article.footerCta.label}
                                </TrackedLink>
                                <TrackedLink
                                    href="/how-to-start-meditating-daily"
                                    eventLabel="spiritual_practice_sequence:footer:meditation"
                                    trackPathName="how-to-start-meditating-daily"
                                    className="px-10 py-5 bg-orange-700 text-white border border-orange-400/30 font-bold rounded-2xl transition-all hover:bg-orange-800"
                                >
                                    How to Start Meditating Daily
                                </TrackedLink>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
