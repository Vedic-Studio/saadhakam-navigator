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
    title: "Mahmud of Ghazni's Temple Destructions: The Record",
    description:
        "Seventeen raids into India, 1001–1027. Somnath 1026, Mathura 1018, Kanauj 1018, Thanesar 1014 — what Utbi, Minhaj-us-Siraj, and al-Biruni recorded.",
    alternates: {
        canonical: "https://www.opensadhaka.com/mahmud-of-ghazni-temples-destroyed",
    },
    openGraph: {
        title: "Mahmud of Ghazni's Temple Destructions: The Record",
        description:
            "The Lahore coins called him 'breaker of idols.' His own court historian Utbi wrote the campaign chronicle. A scholarly catalogue of the Ghaznavid raids.",
        url: "https://www.opensadhaka.com/mahmud-of-ghazni-temples-destroyed",
        type: "article",
    },
};

type SupplementCase = {
    id: string;
    name: string;
    deity: string;
    location: string;
    year: number;
    chronicle: string;
    note: string;
    modernStatus: string;
};

// Cases not in the typed dataset but documented in the chronicles cited by
// Section 5 of docs/research/hindu-temples-destruction-source-notes.md.
// Each entry is a scoped historical summary with the primary source named —
// no fabricated quotations.
const supplementaryCases: SupplementCase[] = [
    {
        id: "thanesar-1014",
        name: "Chakraswamin temple, Thanesar",
        deity: "Vishnu",
        location: "Thanesar, Haryana",
        year: 1014,
        chronicle: "Tarikh-i-Yamini (Utbi); Tabaqat-i-Nasiri (Minhaj-us-Siraj)",
        note: "Utbi describes the Thanesar campaign of 1014 in detail: the town was sacked, the principal temple plundered, and the Chakraswamin idol carried back to Ghazni where it was thrown into the public square for trampling. The campaign followed Mahmud's standing pattern: take the rampart, take the temple, carry the wealth and the idol home, return the next year for the next target.",
        modernStatus: "Thanesar's medieval temple corpus largely destroyed across the Ghaznavid and Ghurid raids; the modern Sthaneshwar Mahadev temple is a later rebuild on or near the original site.",
    },
    {
        id: "mathura-1018",
        name: "Krishna temple complex, Mathura",
        deity: "Vishnu (Krishna)",
        location: "Mathura, Uttar Pradesh",
        year: 1018,
        chronicle: "Tarikh-i-Yamini (Utbi)",
        note: "Utbi devotes one of the longer descriptive passages in the Yamini to Mahmud's awe at Mathura's temple architecture and to the systematic plundering and burning that followed. The campaign extracted, on the chronicle's own figures, several lakhs of gold dinars in gold and silver vessels from the temples alone, with the idols melted down. The 1018 raid is the canonical case of pre-Aurangzeb destruction at Krishna's birthplace, six and a half centuries before the 1670 demolition the Mughal chronicles record.",
        modernStatus: "The pre-1018 temple corpus did not survive. Subsequent rebuilds were destroyed again under Sikandar Lodi (c. 1500) and under Aurangzeb in 1670; the Shahi Eidgah and the modern Krishna Janmasthan complex now occupy the contested site.",
    },
    {
        id: "kanauj-1018",
        name: "Temples of Kanauj",
        deity: "Multi",
        location: "Kanauj, Uttar Pradesh",
        year: 1018,
        chronicle: "Tarikh-i-Yamini (Utbi); Kitab-ul-Hind (al-Biruni)",
        note: "Kanauj was, in 1018, one of the wealthiest cities of the subcontinent and the seat of the Pratihara empire's residual authority. Utbi describes Mahmud's seven-day occupation, the systematic plunder of its temples, and the city's rapid decline. Al-Biruni, who was at Mahmud's court, treats the Kanauj destruction as a historical inflection point in the cultural geography of north India: a Sanskritic learning centre that did not recover. Maulana Abdul Hai (Nadwa, 1973) confirmed that the later Jami Masjid of Kanauj was &lsquo;built on the foundation of some Hindu temple&rsquo;.",
        modernStatus: "The Pratihara-era temple corpus of Kanauj is lost. The Jami Masjid (built from temple materials per Abdul Hai's own admission) and the later Makhdum Jahaniyan dargah occupy the principal religious sites.",
    },
    {
        id: "nagarkot-1009",
        name: "Bhimnagar (Jwalamukhi / Kangra) temple",
        deity: "Devi (Jwalamukhi)",
        location: "Kangra, Himachal Pradesh",
        year: 1009,
        chronicle: "Tarikh-i-Yamini (Utbi); Kitab-ul-Hind (al-Biruni)",
        note: "Mahmud reached Nagarkot (Kangra) in 1009. The temple-fort at Bhimnagar was one of the wealthiest devi-shrines in the Himalayan foothills; Utbi records the plunder of gold and silver vessels in quantities that strain credulity but are also confirmed by al-Biruni's independent reference to the same campaign. Mahmud returned to Nagarkot in 1023 for a second sacking. The shrine — the modern Jwalamukhi temple of the Shaktipeetha tradition — was rebuilt repeatedly through the medieval period.",
        modernStatus: "Jwalamukhi temple (Kangra) is one of the principal Shaktipeethas; the current structure is post-medieval, the temple-fort of Bhimnagar destroyed across successive Ghaznavid raids.",
    },
];

export default function MahmudOfGhazniTemplesDestroyedPage() {
    const article = getArticleBySlug("mahmud-of-ghazni-temples-destroyed")!;
    const pillar = getPillarConfig(article.pillar);
    const schemas = buildArticleSchemas(article, pillar.label, pillar.href);

    const datasetCases = getTemplesByDestroyer("Mahmud of Ghazni").sort(
        (a, b) => a.destroyer.year - b.destroyer.year,
    );

    // Combine dataset entries and supplementary cases for the ItemList schema;
    // dataset entries carry the full primary-source quote, supplementary cases
    // are scoped historical summaries.
    const eventsItemList = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Documented Temple Destructions Attributed to Mahmud of Ghazni",
        description:
            "Temple destructions by the Ghaznavid sultan Mahmud (r. 998–1030) recorded in his court chronicle Tarikh-i-Yamini by Utbi, in Minhaj-us-Siraj's Tabaqat-i-Nasiri, and in al-Biruni's Kitab-ul-Hind. The destroyer's own coinage at Lahore titled him 'breaker of idols.'",
        itemListElement: [
            ...datasetCases.map((t, index) => ({
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
            ...supplementaryCases.map((s, idx) => ({
                "@type": "ListItem",
                position: datasetCases.length + idx + 1,
                item: {
                    "@type": "Event",
                    name: `Destruction at ${s.name}`,
                    description: s.note,
                    startDate: String(s.year),
                    location: {
                        "@type": "Place",
                        name: s.location,
                        address: {
                            "@type": "PostalAddress",
                            addressLocality: s.location,
                            addressCountry: "IN",
                        },
                    },
                },
            })),
        ],
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.article) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsItemList) }} />
            <ContentPageTracker slug="mahmud-of-ghazni-temples-destroyed" pillar="spiritual-traditions" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Sacred Sites", href: "/sacred-sites-india" },
                            { label: "Temples Destroyed in Medieval India", href: "/temples-destroyed-medieval-india" },
                            { label: "Mahmud of Ghazni", href: "/mahmud-of-ghazni-temples-destroyed" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
                            Mahmud of Ghazni&apos;s <span className="text-orange-500 italic">Temple Destructions</span>
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-6">
                            <strong>Direct answer:</strong> Sultan Mahmud of Ghazni (r. 998–1030) conducted seventeen recorded military expeditions into the Indian subcontinent between 1001 and 1027. Each was tactically a raid; cumulatively they ended Hindu rule in Punjab and shifted the economic centre of gravity of the Ghaznavid empire eastward. The 1026 destruction of the Somnath temple in Saurashtra is the single case that entered Hindu memory most deeply; the campaigns at Thanesar (1014), Mathura (1018), Kanauj (1018), and Nagarkot (1009 and 1023) are described in equally explicit detail by Mahmud&apos;s own court historian, Utbi, in the <em>Tarikh-i-Yamini</em>. The Lahore mint, under Mahmud&apos;s authority, struck coins titling him <em>but-shikan</em> — &ldquo;the breaker of idols&rdquo; — and <em>yamin-ud-daulah</em>, &ldquo;the right hand of the Caliph.&rdquo;
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            The coins he struck named the policy. The chronicler he kept wrote the cases down.
                        </p>
                    </header>

                    <div className="space-y-14">
                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Who Mahmud Was</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Yamin-ud-Daulah Abu&apos;l-Qasim Mahmud ibn Sebuktegin (971–1030), known to history as Mahmud of Ghazni, was the second sultan of the Ghaznavid dynasty and the founder of its imperial period. Born into a Turkic mamluk house in Khorasan, he succeeded his father Sebuktegin in 998 after a brief succession struggle and ruled from his capital at Ghazni — in the mountains of modern Afghanistan — for the next thirty-two years. His court attracted some of the most consequential intellectuals of the Islamic east: the polymath al-Biruni, the poet Firdausi who composed the <em>Shahnameh</em> at the Ghaznavid court, and the historian Utbi who recorded Mahmud&apos;s reign in the <em>Tarikh-i-Yamini</em>.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The seventeen raids into India between 1001 and 1027 are the central fact of Mahmud&apos;s reign. They were systematic, annual or near-annual, and conducted with the express religious sanction of the Abbasid Caliph at Baghdad, who in 999 had granted Mahmud the titles he then used. The raids were also intensely lucrative: Mahmud financed the rebuilding of Ghazni — its mosques, its libraries, its botanical gardens, its scholarly establishment — substantially from the metal stripped from Hindu temple treasuries across the Indus and the Ganga plains.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                The dual character of Mahmud&apos;s reign — the cultural patronage that produced Firdausi and al-Biruni in the same court that ordered the sack of Somnath — is the historical reality. Modern attempts to reduce him to either pure plunderer or pure pious warrior misread the period. He was an effective imperial ruler whose religious framing of the Indian campaigns was, by his own coinage and his own chronicler&apos;s testimony, both sincere and politically deliberate.
                            </p>
                        </section>

                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-6">The Sources</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Three contemporary or near-contemporary Persian and Arabic sources are the spine of the documentary record for Mahmud&apos;s Indian campaigns:
                            </p>
                            <ul className="space-y-4 text-lg text-muted-foreground leading-relaxed pl-6 list-disc mb-6">
                                <li>
                                    <strong className="text-foreground">Utbi, <em>Tarikh-i-Yamini</em></strong> — Mahmud&apos;s own court historian, writing in elevated literary Arabic. The Yamini is the campaign chronicle, year by year, from 1001 onward. Utbi&apos;s tone is celebratory; his factual register is detailed enough that modern historians use it as a primary reconstruction of the raids.
                                </li>
                                <li>
                                    <strong className="text-foreground">Minhaj-us-Siraj, <em>Tabaqat-i-Nasiri</em></strong> — written c. 1260 in Persian at the court of Iltutmish in Delhi. Minhaj reaches back to the Ghaznavid period with explicit pride in Mahmud as the founding figure of Indo-Islamic statecraft. His account of the Somnath raid is the most widely-cited of the medieval Persian narratives.
                                </li>
                                <li>
                                    <strong className="text-foreground">Al-Biruni, <em>Kitab-ul-Hind</em></strong> — the foundational comparative ethnography of Indian science, religion, and philosophy, written by the Khwarazmian polymath who travelled with Mahmud&apos;s campaigns. Al-Biruni&apos;s tone is detached, scholarly, and at certain points implicitly critical of the destruction; his testimony is independent corroboration of the campaigns Utbi celebrates.
                                </li>
                            </ul>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                The standard accessible English compilation of all three sources, along with the Ghaznavid-period administrative documents, is H. M. Elliot and J. Dowson, <em>The History of India as Told by Its Own Historians</em>, Volume II (London, 1869). Reprints are widely available; the original is in the public domain.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-10">Somnath, 1026 — The Marquee Case</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-10">
                                The destruction of the Somnath temple in Saurashtra (modern Gujarat) in early 1026 is the single best-documented case of Mahmud&apos;s campaigns. Three independent chronicles describe it, the Lahore coinage records the title Mahmud gave himself afterward, and the temple&apos;s repeated reconstruction across the medieval and modern periods turned it into the canonical case of Hindu civilizational memory of the Ghaznavid raids.
                            </p>

                            {datasetCases.map((t) => (
                                <article
                                    key={t.id}
                                    className="border-l-4 border-orange-500/40 pl-8 py-2 mb-12"
                                >
                                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-3">
                                        <span className="text-sm font-mono text-orange-400">
                                            {t.destroyer.year} CE
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
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-10">The Earlier Campaigns: Thanesar, Mathura, Kanauj, Nagarkot</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-10">
                                Somnath is the most famous case but it is the eleventh in the documented sequence, not the first. The earlier campaigns established the method that the Somnath raid then executed at scale. Each of the four cases below is documented in the chronicles named, supplements the dataset above, and was tactically continuous with the Ghaznavid imperial method: take the rampart, take the temple, carry the wealth and the principal idol home, return the next year for the next target.
                            </p>

                            <div className="space-y-12">
                                {supplementaryCases.map((s, index) => (
                                    <article
                                        key={s.id}
                                        className="border-l-4 border-orange-500/40 pl-8 py-2"
                                    >
                                        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-3">
                                            <span className="text-sm font-mono text-orange-400">
                                                {String(index + 2).padStart(2, "0")} · {s.year} CE
                                            </span>
                                            <span className="text-sm text-muted-foreground">
                                                {s.location}
                                            </span>
                                        </div>
                                        <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">
                                            {s.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            <strong className="text-foreground">Deity:</strong> {s.deity} ·{" "}
                                            <strong className="text-foreground">Primary chronicle:</strong> {s.chronicle}
                                        </p>
                                        <p className="text-lg text-muted-foreground leading-relaxed mb-3">
                                            {s.note}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            <strong className="text-foreground">Today on the site:</strong> {s.modernStatus}
                                        </p>
                                    </article>
                                ))}
                            </div>
                        </section>

                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-6">The Coinage Evidence</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The strongest material confirmation that Mahmud&apos;s temple campaigns were neither incidental nor later embellishment comes from his own mint. The Lahore mint, under his authority, struck silver and gold coins bearing the Arabic legend <em>al-Sultan al-Adil Yamin-ud-Daulah wa Amin-ul-Millah Mahmud — but-shikan</em>: &ldquo;the just sultan, the right hand of the dominion and trustee of the community, Mahmud, the breaker of idols.&rdquo;
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                The <em>but-shikan</em> title is not a hostile retrospective. It is what Mahmud chose to call himself on the currency his administration issued. The numismatic record — held in the British Museum, the Lahore Museum, and the State Bank of India numismatic collection — is the closest thing to a primary-source confession we have for any medieval Indian conqueror. The man named the policy on his own coins.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">What the Sources Establish, and What They Do Not</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The chronicles establish that Mahmud&apos;s campaigns produced large-scale destruction of named temples at named cities — Somnath, Mathura, Kanauj, Thanesar, Nagarkot, Multan&apos;s Sun Temple, Narayan in Alwar, and others. The campaigns were religiously framed by the destroyer himself, in his coinage, his diplomatic correspondence with the Caliph at Baghdad, and his court chronicler&apos;s narration. They were also tactically a sequence of raids — Mahmud did not, with the exception of Punjab, establish administration in the territory he raided. The Ghaznavid empire&apos;s long-term political effect on north India was thus indirect: it weakened the Hindu Shahi, Pratihara, and Chandela polities and prepared the conditions for the Ghurid conquest of 1192 onward.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                What the sources do <em>not</em> establish, and what should be treated with appropriate scepticism, are the loot figures Utbi and his successors cite. The Somnath wealth figures — millions of dinars, thousands of camel-loads — are court-chronicle hagiography, designed to magnify the sultan&apos;s deeds. Modern historians of the Ghaznavid economy treat these as upper-bound rhetorical figures, not audit-grade accounting. The fact of the destruction is independently corroborated by al-Biruni and by the temple&apos;s repeated reconstruction; the precise scale of the wealth extracted is uncertain.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                The pre-modern Hindu source corpus for the period is thin. Kalhana&apos;s <em>Rajatarangini</em> (12th c., Kashmir) and a handful of Jain colophon notes survive; the Pratihara, Chandela, and Solanki dynastic records that would have documented the destruction from the receiving end are mostly lost. The dependence on Muslim chronicles is structural, not ideological — and the Muslim chronicles, written from the destroyer&apos;s side, are precisely the documents that make the case hard to deny.
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
                                The primary chronicles for Mahmud&apos;s reign are Utbi, <em>Tarikh-i-Yamini</em>; Minhaj-us-Siraj, <em>Tabaqat-i-Nasiri</em> (c. 1260); and al-Biruni, <em>Kitab-ul-Hind</em> (c. 1030). All three are translated in H. M. Elliot and J. Dowson, <em>The History of India as Told by Its Own Historians</em>, Volume II (London, 1869), which is in the public domain and widely reprinted by Indian publishers.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                For the numismatic evidence, see C. E. Bosworth, <em>The Ghaznavids: Their Empire in Afghanistan and Eastern Iran 994–1040</em> (Edinburgh, 1963), which catalogues the Lahore mint coinage and the <em>but-shikan</em> title in its administrative context. For a long-form modern survey of the Somnath case across Hindu, Muslim, and modern historiography, Romila Thapar&apos;s <em>Somanatha: The Many Voices of a History</em> (Penguin, 2004) offers the most rigorous comparative treatment.
                            </p>
                        </section>

                        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
                            <Link href="/temples-destroyed-medieval-india" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                Hub: Temples Destroyed in Medieval India <ArrowRight size={16} />
                            </Link>
                            <Link href="/aurangzeb-temples-destroyed" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                Aurangzeb&apos;s Destructions <ArrowRight size={16} />
                            </Link>
                            <Link href="/sikandar-butshikan-kashmir-temples" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                Sikandar Butshikan&apos;s Kashmir <ArrowRight size={16} />
                            </Link>
                            <Link href="/most-powerful-shiva-temples-india" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                The 12 Jyotirlingas (Somnath) <ArrowRight size={16} />
                            </Link>
                            <Link href="/south-india-temple-architecture" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                South India Temple Architecture <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>

                    <div className="mt-20 bg-orange-600 rounded-3xl p-12 text-center text-white shadow-2xl">
                        <h2 className="text-4xl lg:text-5xl font-display font-black mb-6">Look at What Was Rebuilt.</h2>
                        <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10 font-medium">
                            Somnath was reconstructed for the sixth time in 1951. Mathura, Kanauj, Nagarkot — each was demolished and rebuilt, demolished and rebuilt. The temple corpus is older than its destroyers and has outlasted them.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <TrackedLink
                                href="/temples-destroyed-medieval-india"
                                eventLabel="mahmud_temples:footer:hub"
                                trackPathName="temples-destroyed-medieval-india"
                                className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                The Full Hub
                            </TrackedLink>
                            <TrackedLink
                                href="/aurangzeb-temples-destroyed"
                                eventLabel="mahmud_temples:footer:aurangzeb"
                                trackPathName="aurangzeb-temples-destroyed"
                                className="px-10 py-5 bg-orange-700 text-white border border-orange-400/30 font-bold rounded-2xl transition-all hover:bg-orange-800"
                            >
                                Aurangzeb&apos;s Record
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
