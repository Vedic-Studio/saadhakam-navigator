import type { Metadata } from "next";
import { getArticleBySlug, getPillarConfig } from "@/features/articles";
import { buildArticleSchemas } from "@/lib/seo";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight } from "lucide-react";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
import {
    destroyedTemples,
    stateDestructionSummary,
    totalDocumentedCount,
} from "@/data/templesDestroyed";

export const metadata: Metadata = {
    title: "Hindu Temples Destroyed in Medieval India: The Documented Record",
    description:
        "What happened to India's pre-Islamic temple corpus? The Muslim chronicles themselves — Maasir-i-Alamgiri, Tabaqat-i-Nasiri, the Quwwat-ul-Islam inscription — name names, places, and dates. Somnath, Kashi, Mathura, Vijayanagara, and 2,000 documented cases.",
    alternates: {
        canonical: "https://www.opensadhaka.com/temples-destroyed-medieval-india",
    },
    openGraph: {
        title: "Hindu Temples Destroyed in Medieval India: The Documented Record",
        description:
            "The Muslim chronicles themselves name names, places, and dates. 2,000+ documented cases across 14 states.",
        url: "https://www.opensadhaka.com/temples-destroyed-medieval-india",
        type: "article",
    },
};

const featuredCases = [
    "somnath-mahmud-1026",
    "kashi-vishwanath-aurangzeb-1669",
    "keshavdev-mathura-aurangzeb-1670",
    "ram-janmasthan-babri-1528",
    "vijayanagara-talikota-1565",
    "martand-sun-temple-sikandar-c1400",
    "nalanda-odantapuri-bakhtiyar-1193",
    "rudramahalaya-sidhpur-1297-1415",
    "udaipur-aurangzeb-1680",
    "amber-aurangzeb-1680",
    "quwwatul-islam-aibak-1198",
    "adhai-din-jhonpra-ghori-1199",
] as const;

export default function TemplesDestroyedMedievalIndiaPage() {
    const article = getArticleBySlug("temples-destroyed-medieval-india")!;
    const pillar = getPillarConfig(article.pillar);
    const schemas = buildArticleSchemas(article, pillar.label, pillar.href);

    const cases = featuredCases
        .map((id) => destroyedTemples.find((t) => t.id === id))
        .filter((t): t is (typeof destroyedTemples)[number] => Boolean(t));

    const totalDocumented = totalDocumentedCount();
    const topStates = [...stateDestructionSummary]
        .sort((a, b) => b.documentedCount - a.documentedCount)
        .slice(0, 8);

    const eventsItemList = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Documented Hindu Temple Destructions in Medieval India",
        description:
            "A list of historically documented temple destructions in medieval India, with primary-source citations from Muslim chronicles, mosque inscriptions, and Archaeological Survey of India reports.",
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
            <ContentPageTracker slug="temples-destroyed-medieval-india" pillar="spiritual-traditions" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Sacred Sites", href: "/sacred-sites-india" },
                            { label: "Temples Destroyed in Medieval India", href: "/temples-destroyed-medieval-india" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
                            What Happened to <span className="text-orange-500 italic">India&apos;s Temples</span>
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-6">
                            <strong>Direct answer:</strong> Thousands of Hindu, Buddhist, and Jain temples across the Indian subcontinent were destroyed or converted into mosques during medieval Islamic rule (c. 1000–1700 CE). The evidence is not Hindu polemic — it is recorded in the Muslim chronicles themselves: <em>Tabaqat-i-Nasiri</em>, <em>Tarikh-i-Yamini</em>, <em>Maasir-i-Alamgiri</em>, and inscriptions on the mosques themselves. The most thorough documentary survey catalogues <strong>{totalDocumented.toLocaleString()}+</strong> Muslim monuments built on temple sites or with temple materials across 14 modern states.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            The court historians of the destroyers wrote it down themselves. They thought it was a virtue.
                        </p>
                    </header>

                    <div className="space-y-14">
                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">A Note on Sources</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The historical record of temple destruction in medieval India is unusually well-documented for one reason: the destroyers maintained court chronicles. Mahmud of Ghazni, Muhammad of Ghor, the Khalji and Tughlaq sultans of Delhi, Sikandar Butshikan of Kashmir, Babur, Aurangzeb — each had court historians whose job was to record the king&apos;s deeds, including the destruction of temples, in detail. They wrote these down with pride, citing chapter and verse of Islamic law to justify what was done.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                What follows is drawn from those chronicles, supplemented by the inscriptions on the mosques themselves (which often name the destroyed temple by name and count) and by Archaeological Survey of India field reports. The compilation below was made by Sita Ram Goel and contributors in <em>Hindu Temples — What Happened to Them?</em> (Voice of India, 1990–1993). The book&apos;s framing is its own; the citations are to the medieval Muslim chroniclers — al-Biladhuri, al-Tabari, Utbi, Minhaj-us-Siraj, Ziauddin Barani, Saqi Mustaid Khan, and many others — that the book brings together.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Where modern archaeology has examined the cases, it has overwhelmingly corroborated the chronicles. The visible temple pillars in the Quwwat-ul-Islam Masjid (Delhi, 1198), the temple-plinth carvings still exposed in the western wall of the Gyanvapi Mosque (Varanasi), the Sanskrit and Jain inscriptions on the pillars of the Adhai-Din-Ka-Jhonpra (Ajmer, 1199), and the 2003 ASI excavation under the Babri Masjid site at Ayodhya — these are the structures themselves bearing witness.
                            </p>
                        </section>

                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-6">The Maulana&apos;s Own Admission</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The strongest evidence against the modern denial that temples were ever destroyed comes from a 20th-century Muslim scholar — not from any Hindu source. Maulana Hakim Sayid Abdul Hai (d. 1923) was the Rector of the Darul-Ulum Nadwatul-Ulama at Lucknow, one of the most prestigious centers of Islamic learning in India. In a long Arabic-language history of India, later translated into Urdu by his own institution and published in 1973 as <em>Hindustan Islami Ahad Mein</em> (&quot;Hindustan under Islamic Rule&quot;), he listed seven well-known mosques that had been built directly on the sites of destroyed Hindu temples.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-4">The seven, in his own words:</p>
                            <ol className="space-y-3 text-lg text-muted-foreground leading-relaxed pl-6 list-decimal mb-6">
                                <li><strong>Quwwat-ul-Islam Masjid, Delhi</strong> — built by Qutbuddin Aibak from the materials of demolished Hindu temples in the Qutb complex.</li>
                                <li><strong>Jami Masjid, Qanauj</strong> — &quot;It is well known that it was built on the foundation of some Hindu Temple.&quot;</li>
                                <li><strong>Jami Masjid, Etawah</strong> — &quot;There was a Hindu temple at this place, on the site of which this mosque was constructed.&quot;</li>
                                <li><strong>Babri Masjid, Ayodhya</strong> — &quot;This mosque was constructed by Babar at Ayodhya which Hindus call the birth place of Ramchanderji ... On that very site Babar constructed this mosque in H. 963 [1528 CE].&quot;</li>
                                <li><strong>Gyanvapi Mosque, Banaras</strong> — &quot;The mosque of Benares was built by Alamgir [Aurangzeb] on the site of the Bisheshwar Temple. That temple was very tall and held as holy among the Hindus. On this very site and with those very stones he constructed a lofty mosque.&quot;</li>
                                <li><strong>Aurangzeb&apos;s second Banaras mosque</strong> — on the bank of the Ganga.</li>
                                <li><strong>Aurangzeb&apos;s mosque at Mathura</strong> — &quot;built on the site of the Gobind Dev Temple which was very strong and beautiful as well as exquisite.&quot;</li>
                            </ol>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                The 1977 English translation of the same book — the version more likely to be read by non-Muslims and Westerners — censored these seven passages out. Each one. That censorship is itself the most telling evidence of all: the men editing the English translation knew that the passages were true and consequential. (Arun Shourie&apos;s exposé in <em>Indian Express</em>, February 5, 1989.)
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Scale: 2,000+ Documented Cases</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The book&apos;s Chapter 10 is a state-by-state catalogue. Each entry names a Muslim monument and tags it: <em>Temple site</em> (built on the foundation of a destroyed temple), <em>Temple materials used</em> (built with stones and pillars from a destroyed temple), or <em>Converted temple</em> (the temple structure itself converted to Islamic use). The catalogue was assembled from Archaeological Survey of India volumes, district gazetteers, and the inscriptions on the monuments themselves.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Approximate documented counts per state (the actual total is higher; only the cases with surviving evidence are listed):
                            </p>
                            <div className="overflow-x-auto mb-6">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b-2 border-border/40">
                                            <th className="text-left py-3 pr-4 font-bold">State</th>
                                            <th className="text-right py-3 pr-4 font-bold">Documented</th>
                                            <th className="text-left py-3 font-bold">Notable destroyers</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topStates.map((s) => (
                                            <tr key={s.state} className="border-b border-border/20">
                                                <td className="py-3 pr-4 font-medium">{s.state}</td>
                                                <td className="py-3 pr-4 text-right text-orange-400 font-bold">{s.documentedCount}</td>
                                                <td className="py-3 text-sm text-muted-foreground">{s.notableDestroyers.join(", ")}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-base text-muted-foreground italic">
                                Source: Sita Ram Goel et al., <em>Hindu Temples — What Happened to Them?</em>, Vol. I Ch. 10 (Voice of India, 1990). Numbers represent monuments with archaeological-survey or inscriptional provenance, not totals.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-10">Twelve Cases on Record</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-10">
                                Each case below is sourced from a specific medieval chronicle or epigraphic record. The quoted passages are from the destroyer&apos;s own court historian — not from any Hindu source. Modern archaeological corroboration is noted where it exists.
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
                                            <strong className="text-foreground">Destroyer:</strong> {t.destroyer.name} ({t.destroyer.dynasty})
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
                            <h2 className="text-3xl font-display font-bold mb-6">The Pattern of Destruction</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Reading the chronicles together rather than as isolated incidents, a pattern emerges that Sita Ram Goel identifies in seven phases:
                            </p>
                            <ol className="space-y-4 text-lg text-muted-foreground leading-relaxed pl-6 list-decimal">
                                <li>
                                    <strong className="text-foreground">Places taken by assault:</strong> The Jami Masjid was almost invariably built on the site of the most prominent Hindu temple, using its materials. &quot;Cows and, many a time, Brahmanas were killed and their blood sprinkled on the sacred sites in order to render them unclean for the Hindus for all time to come.&quot; (Goel, Vol. I Ch. 10)
                                </li>
                                <li>
                                    <strong className="text-foreground">Places surrendered:</strong> Even when Hindus were granted zimmi status by treaty, the agreement rarely protected the temples. The eradication of the &quot;emblems of infidelity&quot; was a separate process.
                                </li>
                                <li>
                                    <strong className="text-foreground">Places re-occupied by Hindus:</strong> When Hindus retook a place during a Muslim retreat, they rebuilt their temples on new sites and (the chronicles record this with some bafflement) spared the mosques. When the Muslims returned, the temples were destroyed again.
                                </li>
                                <li>
                                    <strong className="text-foreground">The countryside:</strong> Expeditions into rural areas targeted temples first. The pattern: destruction → mosque or dargah on the site → repeat after each peasant uprising.
                                </li>
                                <li>
                                    <strong className="text-foreground">Sufi shrines:</strong> The dargahs of sufi pirs are not exceptions to the pattern but expressions of it. Lahore, Multan, Uch, Ajmer, Delhi, Badaun, Kanauj, Kalpi, Bihar Sharif, Maner, Patna, Burhanpur, Daulatabad, Gulbarga, Bidar, Bijapur, Golconda, Arcot, Vellore, Tiruchirapalli — the major sufi centers stand on converted temples. Hazrat Natthar Wali&apos;s own dargah-record at Tiruchirapalli describes how he &quot;cut the head from the body&quot; of a Shivalinga and built his khanqah on the spot.
                                </li>
                                <li>
                                    <strong className="text-foreground">Particularly pious sultans:</strong> Firuz Shah Tughlaq, Sikandar Lodi, and Aurangzeb of the Delhi-Agra line undertook campaigns specifically to &quot;cleanse the land from the vices of infidelity and God-pluralism&quot; that had crept back during periods of weaker enforcement.
                                </li>
                                <li>
                                    <strong className="text-foreground">Provincial dynasties:</strong> The sultans of Malwa, Gujarat, the Deccan, Jaunpur, and Bengal &quot;were not far behind, if not ahead, of what the imperial pioneers had done.&quot;
                                </li>
                            </ol>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Aurangzeb&apos;s 1669 Firman: The Standing Order</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The Mughal emperor Aurangzeb&apos;s general order of April 1669 is the most explicit standing instruction for temple destruction in Mughal records. It was issued from his own court, transcribed by his own chronicler, Saqi Mustaid Khan, in the <em>Maasir-i-Alamgiri</em>:
                            </p>
                            <blockquote className="my-6 italic text-lg text-foreground/90 leading-relaxed bg-card/40 border border-border/40 rounded-2xl p-6 shadow-sm">
                                &ldquo;The Lord Cherisher of the Faith learnt that in the provinces of Tatta, Multan, and especially at Benares, the Brahman misbelievers used to teach their false books in their established schools, and that admirers and students both Hindu and Muslim, used to come from great distances to these misguided men in order to acquire this vile learning. His Majesty, eager to establish Islam, issued orders to the governors of all the provinces to demolish the schools and temples of the infidels and with the utmost urgency put down the teaching and the public practice of the religion of these misbelievers.&rdquo;
                                <footer className="not-italic mt-4 text-sm text-muted-foreground">
                                    — <span className="font-semibold">Maasir-i-Alamgiri</span>, Saqi Mustaid Khan
                                </footer>
                            </blockquote>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                In the following decade, the same chronicle records destruction at Kashi Vishwanath (1669), Mathura&apos;s Keshavdev temple (1670), Khandela (300+ Rajputs killed defending the temple, 1679), Jodhpur (1679, with idols brought to Delhi to be buried under the steps of the Jami Masjid &quot;to be trodden on&quot;), Udaipur (235+ temples in early 1680), Amber (66 temples in August 1680), and the Vithoba temple at Pandharpur (cows slaughtered inside to render it unfit for Hindu worship). The pattern is documented in the destroyer&apos;s own administrative diary.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">What This Is Not</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                This is not an indictment of Indian Muslims today, who are neither the descendants of the invaders nor responsible for the actions of medieval sultans. The vast majority of India&apos;s Muslim population descends from converts of the same indigenous stock as their Hindu neighbours; the imperial dynasties that conducted these campaigns ruled foreign-born or recently-converted military elites that constituted a small fraction of the population.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Nor is it a claim that destruction was the only thing that happened during seven centuries of Islamic rule in India. Beauty was made too — the Taj Mahal, the dargahs of Nizamuddin and Moinuddin Chishti, the music and poetry of the Bhakti-Sufi exchange, the synthesis traditions of Akbar, Dara Shikoh, Kabir. Indian Islam is rich and is its own thing.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                But the destruction is also a fact. It happened. The court chroniclers wrote it down. The inscriptions on the mosques recorded the counts. The Archaeological Survey of India has corroborated case after case. Acknowledging it is not communalism — it is the minimum standard of historical honesty. The temple corpus of pre-Islamic India was vast; what survives today is mostly what was protected by geography (the deep south, the Vijayanagar buffer until 1565, the Eastern Ganga reach of Konark and Bhubaneswar) or rebuilt after the Maratha and Sikh recoveries of the 18th century.
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
                            <h2 className="text-3xl font-display font-bold mb-6">Further Reading</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                For each of the major chronicles cited above, the standard accessible English-language compilation is H.M. Elliot and J. Dowson, <em>The History of India as Told by Its Own Historians</em>, 8 vols., London 1867–77. The relevant volumes are reprinted by multiple Indian publishers and available in most university libraries. The original Persian editions are held by the Asiatic Society of Bengal, the Khuda Bakhsh Library (Patna), and the Salar Jung Museum (Hyderabad).
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                For the Ayodhya question specifically, the Archaeological Survey of India&apos;s 2003 report (filed under court direction during the Allahabad High Court&apos;s land-title hearings) is publicly available and was relied on by the Supreme Court&apos;s 2019 verdict. The pre-British Muslim sources cited above (Hadiqah-i Shuhada 1856; Muraqqah-i Khusrawi 1869; Fasanah-i Ibrat) are held at the Tagore Library of Lucknow University.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                For the Vijayanagara destruction, Robert Sewell&apos;s <em>A Forgotten Empire: Vijayanagar</em> (London 1900, with Portuguese sources translated and contextualized) remains the standard English-language treatment. For Kashmir, Kalhana&apos;s <em>Rajatarangini</em> (12th c., available in M.A. Stein&apos;s annotated translation, 1900) gives the pre-Islamic temple corpus that Sikandar Butshikan&apos;s campaigns dismantled.
                            </p>
                        </section>

                        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
                            <Link href="/most-powerful-shiva-temples-india" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                The 12 Jyotirlingas <ArrowRight size={16} />
                            </Link>
                            <Link href="/south-india-temple-architecture" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                South India Temple Architecture <ArrowRight size={16} />
                            </Link>
                            <Link href="/kailasa-temple-ellora" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                Kailasa Temple Ellora <ArrowRight size={16} />
                            </Link>
                            <Link href="/sacred-sites-india" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                Sacred Sites in India <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>

                    <div className="mt-20 bg-orange-600 rounded-3xl p-12 text-center text-white shadow-2xl">
                        <h2 className="text-4xl lg:text-5xl font-display font-black mb-6">Look at What Survived.</h2>
                        <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10 font-medium">
                            The deeper south. Vijayanagar before 1565. The eastern reach. The Maratha and Sikh recoveries. What remains is what was defended.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <TrackedLink
                                href="/most-powerful-shiva-temples-india"
                                eventLabel="temples_destroyed:footer:jyotirlingas"
                                trackPathName="most-powerful-shiva-temples-india"
                                className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                The 12 Jyotirlingas
                            </TrackedLink>
                            <TrackedLink
                                href="/south-india-temple-architecture"
                                eventLabel="temples_destroyed:footer:dravidian"
                                trackPathName="south-india-temple-architecture"
                                className="px-10 py-5 bg-orange-700 text-white border border-orange-400/30 font-bold rounded-2xl transition-all hover:bg-orange-800"
                            >
                                Dravidian Temples
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
