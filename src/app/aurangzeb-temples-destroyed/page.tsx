import type { Metadata } from "next";
import { getArticleBySlug, getPillarConfig } from "@/features/articles";
import { buildArticleSchemas } from "@/lib/seo";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight } from "lucide-react";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
import { getTemplesByDestroyer } from "@/data/templesDestroyed";

export const metadata: Metadata = {
    title: "Aurangzeb's Temple Destructions: The Documented Record",
    description:
        "Aurangzeb's 1669 firman, the Maasir-i-Alamgiri's case-by-case ledger: Kashi Vishwanath, Keshavdev Mathura, Udaipur, Amber, Khandela, Jodhpur, Pandharpur.",
    alternates: {
        canonical: "https://www.opensadhaka.com/aurangzeb-temples-destroyed",
    },
    openGraph: {
        title: "Aurangzeb's Temple Destructions: The Documented Record",
        description:
            "The Mughal court chronicle Maasir-i-Alamgiri names the temples, the dates, and the officers. A scholarly catalogue of Aurangzeb's documented demolitions.",
        url: "https://www.opensadhaka.com/aurangzeb-temples-destroyed",
        type: "article",
    },
};

export default function AurangzebTemplesDestroyedPage() {
    const article = getArticleBySlug("aurangzeb-temples-destroyed")!;
    const pillar = getPillarConfig(article.pillar);
    const schemas = buildArticleSchemas(article, pillar.label, pillar.href);

    const cases = getTemplesByDestroyer("Aurangzeb").sort(
        (a, b) => a.destroyer.year - b.destroyer.year,
    );

    const eventsItemList = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Documented Temple Destructions Ordered by Aurangzeb",
        description:
            "A list of temple destructions attributed to the Mughal emperor Aurangzeb (r. 1658–1707), drawn from his own court chronicle, the Maasir-i-Alamgiri, and contemporary administrative records.",
        itemListElement: cases.map((t, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@type": "Event",
                name: `Destruction of ${t.name}`,
                description: t.significance,
                startDate: String(t.destroyer.year),
                location: {
                    "@type": "Place",
                    name: t.location.place,
                    address: {
                        "@type": "PostalAddress",
                        addressLocality: t.location.place,
                        addressRegion: t.location.state,
                        addressCountry: "IN",
                    },
                },
            },
        })),
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.article) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsItemList) }} />
            <ContentPageTracker slug="aurangzeb-temples-destroyed" pillar="spiritual-traditions" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Sacred Sites", href: "/sacred-sites-india" },
                            { label: "Temples Destroyed in Medieval India", href: "/temples-destroyed-medieval-india" },
                            { label: "Aurangzeb", href: "/aurangzeb-temples-destroyed" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
                            Aurangzeb&apos;s <span className="text-orange-500 italic">Temple Destructions</span>
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-6">
                            <strong>Direct answer:</strong> The Mughal emperor Aurangzeb (r. 1658–1707) ordered the demolition of Hindu temples as a recurring state policy, beginning with a general firman in April 1669 against the temples and schools of Tatta, Multan, and especially Benares. His own court chronicle, the <em>Maasir-i-Alamgiri</em> by Saqi Mustaid Khan (completed 1710 from Mughal state archives), records specific demolitions in detail: Kashi Vishwanath in 1669, the Keshavdev temple at Krishna&apos;s birthplace in Mathura in 1670, the great temple at Udaipur and 172 others in the Mewar campaign of January 1680, 66 temples at Amber in August 1680, and the temples of Khandela, Jodhpur, and Pandharpur. The pattern was administrative, not exceptional.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            The emperor&apos;s own court historian counted the temples and named the generals.
                        </p>
                    </header>

                    <div className="space-y-14">
                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Who Aurangzeb Was</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Muhi-ud-Din Muhammad Aurangzeb Alamgir (1618–1707), the sixth Mughal emperor, ruled from 1658 — when he displaced his elder brother Dara Shikoh and imprisoned his father Shah Jahan — until his death at Ahmednagar in March 1707. His forty-nine-year reign was the longest of any Mughal sovereign and the most consequential for the future of the subcontinent. Under him, the empire reached its largest territorial extent and began the long structural decline that would leave it a husk by 1750.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Aurangzeb&apos;s religious policy is the most documented of any Mughal emperor&apos;s, because his court historians considered the enforcement of Islamic law a virtue worth recording in detail. The <em>Maasir-i-Alamgiri</em> — compiled after his death by Saqi Mustaid Khan from the state archives Aurangzeb maintained — is a year-by-year administrative ledger. Where the chronicles of Akbar, Jahangir, and Shah Jahan describe court ceremony, Aurangzeb&apos;s chronicle describes orders issued, taxes reimposed, temples demolished, and resistance suppressed. The 1679 reimposition of the jizya on Hindus, the 1669 general firman against temples and Hindu schools, the demolition campaigns in Mewar and the Deccan — all are recorded in the emperor&apos;s own administrative record.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Modern historiography on Aurangzeb is contested. Audrey Truschke (2017) has argued for a more politically motivated reading of specific demolitions; Jadunath Sarkar&apos;s five-volume <em>History of Aurangzib</em> (1912–1924) — built from the same Persian sources — reaches more severe conclusions. The shared evidentiary base is not in dispute. The Mughal chronicles say what they say; the disagreement is about how to weigh political motive against theological motive in each case. What this page does not do is debate the motive question. It presents the cases the chronicles describe.
                            </p>
                        </section>

                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-6">The 1669 Firman: The Standing Order</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                On 9th April 1669, Aurangzeb issued a general firman from his court at Delhi. The <em>Maasir-i-Alamgiri</em> records it as follows:
                            </p>
                            <blockquote className="my-6 italic text-lg text-foreground/90 leading-relaxed bg-card/40 border border-border/40 rounded-2xl p-6 shadow-sm">
                                &ldquo;The Lord Cherisher of the Faith learnt that in the provinces of Tatta, Multan, and especially at Benares, the Brahman misbelievers used to teach their false books in their established schools, and that admirers and students both Hindu and Muslim, used to come from great distances to these misguided men in order to acquire this vile learning. His Majesty, eager to establish Islam, issued orders to the governors of all the provinces to demolish the schools and temples of the infidels and with the utmost urgency put down the teaching and the public practice of the religion of these misbelievers.&rdquo;
                                <footer className="not-italic mt-4 text-sm text-muted-foreground">
                                    — <span className="font-semibold">Maasir-i-Alamgiri</span>, Saqi Mustaid Khan, on the events of the 12th regnal year
                                </footer>
                            </blockquote>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                The 1669 firman was a standing order, not a single incident. Its application produced the case-by-case demolitions the chronicle then narrates over the next thirty-eight years. The Kashi Vishwanath demolition is reported within months. Mathura&apos;s Keshavdev follows in 1670. The Rajputana campaigns of 1679–1680 produce the largest single-fortnight counts on record. Aurangzeb&apos;s Deccan campaigns in the 1680s and 1690s extend the same policy into the south. The firman is the headwater; the cases below are the river.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-10">Documented Cases on Record</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-10">
                                The {cases.length} cases below are drawn from <em>Maasir-i-Alamgiri</em> and contemporary <em>Akhbarat</em> (court newsletters). Each entry quotes the Mughal chronicler directly. Modern archaeological corroboration is noted where it exists.
                            </p>

                            <div className="space-y-12">
                                {cases.map((t, index) => (
                                    <article
                                        key={t.id}
                                        className="border-l-4 border-orange-500/40 pl-8 py-2"
                                    >
                                        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-3">
                                            <span className="text-sm font-mono text-orange-400">
                                                {String(index + 1).padStart(2, "0")} · {t.destroyer.year} CE
                                            </span>
                                            <span className="text-sm text-muted-foreground">
                                                {t.location.place}, {t.location.state}
                                            </span>
                                        </div>
                                        <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">
                                            {t.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            <strong className="text-foreground">Deity:</strong> {t.deity} ·{" "}
                                            <strong className="text-foreground">Officer:</strong> {t.destroyer.name}
                                        </p>

                                        <blockquote className="my-6 italic text-lg text-foreground/90 leading-relaxed bg-card/40 border border-border/40 rounded-2xl p-6 shadow-sm">
                                            &ldquo;{t.quote}&rdquo;
                                            <footer className="not-italic mt-4 text-sm text-muted-foreground">
                                                — <span className="font-semibold">{t.primarySource.chronicle}</span>, {t.primarySource.author}
                                                {t.primarySource.note ? ` (${t.primarySource.note})` : ""}
                                            </footer>
                                        </blockquote>

                                        <p className="text-lg text-muted-foreground leading-relaxed mb-3">
                                            <strong className="text-foreground">Why it matters:</strong> {t.significance}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            <strong className="text-foreground">Today on the site:</strong> {t.modernStatus}
                                        </p>
                                    </article>
                                ))}
                            </div>
                        </section>

                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-6">The Recurring Method</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Across the case record, the pattern attributed to Aurangzeb&apos;s campaigns is consistent enough to be described as administrative procedure. The chronicle reports the same sequence in case after case:
                            </p>
                            <ol className="space-y-4 text-lg text-muted-foreground leading-relaxed pl-6 list-decimal mb-6">
                                <li>
                                    <strong className="text-foreground">A firman issues from court</strong> naming the location or, after 1669, citing the general standing order against infidel teaching and public worship.
                                </li>
                                <li>
                                    <strong className="text-foreground">A named officer is dispatched</strong> with a force — Darab Khan to Khandela, Khan Jahan Bahadur to Jodhpur, Ruhullah Khan and Ekkataz Khan to Udaipur, Abu Turab to Amber, Muhammad Khalil to Pandharpur. The chronicle names the man and credits him in the audience that follows.
                                </li>
                                <li>
                                    <strong className="text-foreground">The temple is demolished and a mosque often raised on the foundation.</strong> At Kashi, the Gyanvapi Mosque rises on the western half of the Vishweshwar plinth. At Mathura, the Shahi Eidgah replaces the Keshavdev shrine and the city is renamed Islamabad.
                                </li>
                                <li>
                                    <strong className="text-foreground">The idols are deliberately humiliated.</strong> The chronicle records — without embarrassment — the burial of the Mathura idols under the steps of the Begam Sahib mosque at Agra &ldquo;to be continually trodden upon,&rdquo; and the placing of the Jodhpur idols under the Jami Masjid steps &ldquo;to be trodden on.&rdquo; At Pandharpur, the order was specifically to slaughter cows inside the Vithoba temple to render the site permanently unfit for Hindu worship.
                                </li>
                                <li>
                                    <strong className="text-foreground">The officer returns and is rewarded.</strong> Abu Turab&apos;s audience after Amber, Khan Jahan Bahadur&apos;s after Jodhpur — these are recorded as routine court business. The matter-of-fact tone of the chronicle is itself the most damning evidence: this was not war, it was administration.
                                </li>
                            </ol>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                The five-step pattern is not a modern reconstruction. It is the structure the <em>Maasir-i-Alamgiri</em> itself uses, repeated across decades.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Resistance: Khandela and Udaipur</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The chronicle records two episodes of armed resistance with unusual specificity, both because the Mughal historian found them worth noting and because both occurred during the Rajput campaigns of 1679–1680.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                At <strong className="text-foreground">Khandela</strong> in Sikar (Rajasthan), Darab Khan was dispatched to demolish the great Devi temple. The <em>Maasir-i-Alamgiri</em> records that he &ldquo;slew the three hundred and odd men who made a bold defence, not one of them escaping alive.&rdquo; The number is recorded by Aurangzeb&apos;s own historian — three hundred Rajputs died defending a single shrine on the 8th of March 1679. The temples of Khandela and the neighbouring Sanula were then demolished.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                At <strong className="text-foreground">Udaipur</strong> in January 1680, when Ruhullah Khan and Ekkataz Khan reached the great temple in front of the Rana&apos;s palace, the chronicle records that twenty <em>machator</em> Rajputs sitting in the temple &ldquo;vowed to give up their lives; first one of them came out to fight, killed some and was then himself slain, then came out another and so on, until every one of the twenty perished.&rdquo; The pattern of single combat — a defender stepping out alone, fighting until killed, the next stepping out — is the <em>saka</em> tradition of Mewar. The chronicle records it neutrally as administrative inconvenience, but its very specificity is what preserves the moment.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                These are the resistance episodes that survive only because the Mughal chronicler chose to record them. The thousands of smaller demolitions — most temples did not have a defending garrison — pass without a name attached to the dead.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">What the Sources Do and Do Not Say</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The case record drawn from Mughal sources establishes a documented minimum, not a maximum. The <em>Maasir-i-Alamgiri</em> records what reached the emperor&apos;s court; not every regional demolition reached the court. Provincial governors, the camp followers of Mughal armies in the Deccan, and the dargah builders of post-conquest sites operated below the threshold of court chronicle. The actual count is higher than what survives in the text.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                What the sources do <em>not</em> say is also worth recording. They do not describe a programme to convert the Hindu population by force. They do not describe the destruction of every Hindu temple in every conquered region — Aurangzeb&apos;s own grant deeds to specific temples in Banaras and Allahabad survive in the archives, and his alliance with Rajput nobles like Jai Singh and Jaswant Singh was conducted on conventional Mughal terms. The picture that emerges is more specific than the modern polemic on either side: a sustained, theologically-justified campaign against named sites and sustained Hindu institutions, run as administrative policy, not a generalised pogrom against Hindus as a people.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                What the case record does establish, beyond contestable interpretation, is that the 1669 firman and the demolitions that followed were not anomalous, not denied, not whispered. They were standing policy, executed by named officers, recorded by the emperor&apos;s own historian, and considered virtuous by the man who issued the orders.
                            </p>
                        </section>

                        <section>
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

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Sources Cited</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The primary Mughal source for Aurangzeb&apos;s reign is Saqi Mustaid Khan, <em>Maasir-i-Alamgiri</em>, completed 1710 from the state archives Aurangzeb maintained. The standard English translation is by Sir Jadunath Sarkar (Royal Asiatic Society of Bengal, 1947). Supplementary contemporary sources include the <em>Futuhat-i-Alamgiri</em> of Ishwardas Nagar — a Hindu officer in Mughal service writing a Persian-language history of the reign — and the <em>Akhbarat</em>, the daily court newsletters compiled during the reign and preserved at the National Archives of India and the Rajasthan State Archives at Bikaner.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                For the Maulana Abdul Hai (Nadwa, Lucknow, d. 1923) confirmation of the Banaras and Mathura cases from a 20th-century Muslim scholarly source, see <em>Hindustan Islami Ahad Mein</em>, Urdu edition, 1973 (the Urdu original contains the temple-site admissions; the 1977 English translation censored them — documented by Arun Shourie, <em>Indian Express</em>, 5 February 1989). The standard accessible English compilation of the Mughal chronicles remains H. M. Elliot and J. Dowson, <em>The History of India as Told by Its Own Historians</em>, 8 vols., London 1867–77.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Related Cases</h2>
                            <ul className="space-y-3 text-lg text-muted-foreground leading-relaxed pl-6 list-disc">
                                <li>
                                    <Link href="/kashi-vishwanath-aurangzeb" className="text-orange-400 font-medium hover:text-orange-300 transition-colors">Kashi Vishwanath, 1669</Link>
                                    : the firman, the September demolition entry, the Gyanvapi mosque on the footprint.
                                </li>
                                <li>
                                    <Link href="/keshavdev-mathura" className="text-orange-400 font-medium hover:text-orange-300 transition-colors">Keshavdev Mathura, January 1670</Link>
                                    : the four-element entry — destruction, mosque, idol-burial rite at Agra, city renamed.
                                </li>
                            </ul>
                        </section>

                        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
                            <Link href="/temples-destroyed-medieval-india" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                Hub: Temples Destroyed in Medieval India <ArrowRight size={16} />
                            </Link>
                            <Link href="/mahmud-of-ghazni-temples-destroyed" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                Mahmud of Ghazni&apos;s Destructions <ArrowRight size={16} />
                            </Link>
                            <Link href="/sikandar-butshikan-kashmir-temples" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                Sikandar Butshikan&apos;s Kashmir <ArrowRight size={16} />
                            </Link>
                            <Link href="/most-powerful-shiva-temples-india" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                The 12 Jyotirlingas <ArrowRight size={16} />
                            </Link>
                            <Link href="/kailasa-temple-ellora" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                Kailasa Temple Ellora <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>

                    <div className="mt-20 bg-orange-600 rounded-3xl p-12 text-center text-white shadow-2xl">
                        <h2 className="text-4xl lg:text-5xl font-display font-black mb-6">The Wider Record.</h2>
                        <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10 font-medium">
                            Aurangzeb is one actor across seven centuries. The hub article tracks the destructions of Mahmud, Ghori, Khilji, Bakhtiyar, Sikandar, the Deccan Sultanates, and the Bengal sultans alongside the Mughal record.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <TrackedLink
                                href="/temples-destroyed-medieval-india"
                                eventLabel="aurangzeb_temples:footer:hub"
                                trackPathName="temples-destroyed-medieval-india"
                                className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                The Full Hub
                            </TrackedLink>
                            <TrackedLink
                                href="/mahmud-of-ghazni-temples-destroyed"
                                eventLabel="aurangzeb_temples:footer:mahmud"
                                trackPathName="mahmud-of-ghazni-temples-destroyed"
                                className="px-10 py-5 bg-orange-700 text-white border border-orange-400/30 font-bold rounded-2xl transition-all hover:bg-orange-800"
                            >
                                Mahmud of Ghazni
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
