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
    title: "Sikandar Butshikan: Kashmir's Temple Destructions",
    description:
        "Sultan Sikandar of Kashmir (r. 1389–1413), titled Butshikan by his own Persian chroniclers. Martand Sun Temple, the Srinagar shrines, Jonaraja's Sanskrit witness.",
    alternates: {
        canonical: "https://www.opensadhaka.com/sikandar-butshikan-kashmir-temples",
    },
    openGraph: {
        title: "Sikandar Butshikan: Kashmir's Temple Destructions",
        description:
            "The Sultan of Kashmir's own Persian chroniclers — Mirza Haidar Dughlat, Pir Hassan Shah, the Baharistan-i-Shahi — call him Butshikan, the idol-breaker. A scholarly catalogue.",
        url: "https://www.opensadhaka.com/sikandar-butshikan-kashmir-temples",
        type: "article",
    },
};

// Srinagar shrines named in Section 3 of the research note as converted or
// demolished during Sikandar's reign. Drawn from the Persian Kashmir chronicles
// (Tarikh-i-Rashidi, Tarikh-i-Hassan, Baharistan-i-Shahi) and from the survey
// compilation in Goel Vol I Ch 10. No invented quotations — these are the
// named shrines from the documentary record.
const srinagarShrines: { name: string; deity: string; fate: string }[] = [
    {
        name: "Jayasvamin (Jayaswami) temple",
        deity: "Vishnu",
        fate: "Demolished; materials redirected to the Jami Masjid of Srinagar built by Sikandar.",
    },
    {
        name: "Vishnusvamin temple",
        deity: "Vishnu",
        fate: "Demolished during Sikandar's iconoclastic campaign.",
    },
    {
        name: "Bhimasvamin temple",
        deity: "Vishnu (Bhima form)",
        fate: "Demolished; site occupied by later Islamic-period construction.",
    },
    {
        name: "Vishnu Ranasvamin temple",
        deity: "Vishnu",
        fate: "Demolished; the site is no longer separately identifiable.",
    },
    {
        name: "Narendrasvamin temple",
        deity: "Vishnu",
        fate: "Demolished during Sikandar's reign per the Kashmir chronicles.",
    },
    {
        name: "Vikrameshvara temple",
        deity: "Shiva",
        fate: "Demolished; the Vikrameshvara site is named in the Persian chronicles' destruction-list.",
    },
    {
        name: "Diddamatha (Didda Matha)",
        deity: "Devi (associated with Queen Didda's foundation)",
        fate: "Demolished. The Diddamatha was a foundation of the 10th-century Kashmir queen Didda; its loss erased one of Kashmir's two great female-founder shrines.",
    },
    {
        name: "Skandabhavana Vihara",
        deity: "Buddha (Mahayana monastic complex)",
        fate: "Demolished. The Skandabhavana was one of the principal surviving Mahayana monasteries of the Kashmir Valley; Buddhism in Kashmir effectively ended with Sikandar's campaigns.",
    },
    {
        name: "Meruvardhanasvamin temple",
        deity: "Vishnu",
        fate: "Demolished; the Meruvardhanasvamin's site is recorded in the chronicles' Srinagar conversion-list.",
    },
];

export default function SikandarButshikanKashmirTemplesPage() {
    const article = getArticleBySlug("sikandar-butshikan-kashmir-temples")!;
    const pillar = getPillarConfig(article.pillar);
    const schemas = buildArticleSchemas(article, pillar.label, pillar.href);

    const datasetCases = getTemplesByDestroyer("Sikandar").sort(
        (a, b) => a.destroyer.year - b.destroyer.year,
    );

    const eventsItemList = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Documented Temple Destructions in Sikandar Butshikan's Kashmir",
        description:
            "Hindu and Buddhist temples and viharas destroyed or converted in the Kashmir Valley during the reign of Sultan Sikandar Shah Miri (r. c. 1389–1413), recorded by the Persian chroniclers of Kashmir itself: Tarikh-i-Rashidi, Tarikh-i-Hassan, and the anonymous Baharistan-i-Shahi.",
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
            ...srinagarShrines.map((s, idx) => ({
                "@type": "ListItem",
                position: datasetCases.length + idx + 1,
                item: {
                    "@type": "Event",
                    name: `Conversion or destruction of ${s.name}`,
                    description: s.fate,
                    location: {
                        "@type": "Place",
                        name: "Srinagar",
                        address: {
                            "@type": "PostalAddress",
                            addressLocality: "Srinagar",
                            addressRegion: "Jammu and Kashmir",
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
            <ContentPageTracker slug="sikandar-butshikan-kashmir-temples" pillar="spiritual-traditions" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Sacred Sites", href: "/sacred-sites-india" },
                            { label: "Temples Destroyed in Medieval India", href: "/temples-destroyed-medieval-india" },
                            { label: "Sikandar Butshikan", href: "/sikandar-butshikan-kashmir-temples" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
                            Sikandar Butshikan&apos;s <span className="text-orange-500 italic">Kashmir</span>
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-6">
                            <strong>Direct answer:</strong> Sultan Sikandar Shah Miri of the Shah Mir dynasty (r. c. 1389–1413) is the only medieval ruler of the Kashmir Valley whose Persian-language chroniclers — Kashmir&apos;s own historians, not hostile outside sources — gave him the name <em>Butshikan</em>, &ldquo;the idol-breaker.&rdquo; Over a reign of roughly twenty-four years, the pre-Islamic Hindu and Buddhist monument corpus of the Kashmir Valley that Kalhana had catalogued two and a half centuries earlier in the <em>Rajatarangini</em> was systematically destroyed. The Martand Sun Temple at Anantnag — the most monumental Surya shrine of the northern subcontinent — survives only as a ruin. The principal Srinagar shrines named by the chronicles, including the Jayasvamin, Vishnusvamin, Bhimasvamin, Diddamatha, and Skandabhavana Vihara, were demolished or converted within a single generation.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            The Sultan&apos;s own court called him the idol-breaker. The valley&apos;s temple corpus is what is missing.
                        </p>
                    </header>

                    <div className="space-y-14">
                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Who Sikandar Was</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Sikandar Shah Miri was the sixth ruler of the Shah Mir dynasty, the first independent Muslim dynasty of Kashmir. His grandfather Shah Mir, a Turkic adventurer who had entered the service of the last Hindu king Suhadeva in the early 14th century, had taken the throne in 1339 in the political vacuum left by the Mongol invasions. By Sikandar&apos;s succession in approximately 1389, the dynasty had been Muslim for two generations but the population of the Kashmir Valley remained predominantly Hindu, with substantial surviving Buddhist monastic communities and a thin Muslim ruling class. Sikandar&apos;s reign — and specifically the iconoclastic phase associated with his queen Subh Mata and his chief minister Suhabhatta, a converted Brahmin who took the name Saif-ud-Din — closed that demographic and religious gap by force.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The chronology of the destruction is compressed. The chronicles place the major iconoclastic campaigns in the latter part of the reign, roughly the decade 1400–1413, coinciding with the influence of the visiting Sayyid missionary Mir Muhammad Hamadani and Suhabhatta&apos;s policy of explicit conversion-pressure on the Brahmin community of the valley. The result, by the time of Sikandar&apos;s death in 1413 and the succession of his son Ali Shah, was a Kashmir Valley in which the public Hindu temple corpus had been substantially erased, with the surviving Hindu population either converted, emigrated to the Jammu hills and the Punjab plains, or — in the case of the celebrated mass-suicide of the Brahmin community recorded in the chronicles — dead. The remaining Kashmiri Pandit community of the modern period descends from the small fraction who endured.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Sikandar&apos;s reign is the single most consequential rupture in the religious history of Kashmir. The pre-Islamic Hindu monument corpus that Kalhana the historian-poet had described in the 12th-century <em>Rajatarangini</em> — temples founded by the Karkota and Utpala dynasties, the great Surya temple at Martand built by Lalitaditya Muktapida in the 8th century, the Sharada temple at the upper Neelum Valley — was, by 1413, either rubble or under demolition.
                            </p>
                        </section>

                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-6">The Sources Are Kashmir&apos;s Own</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The Sikandar case is unusual in the historiography of medieval temple destruction because the destroyer&apos;s record comes not from external chroniclers but from the Persian-language historians of Kashmir itself, written under Sultanate and later Mughal patronage. The three principal sources are:
                            </p>
                            <ul className="space-y-4 text-lg text-muted-foreground leading-relaxed pl-6 list-disc mb-6">
                                <li>
                                    <strong className="text-foreground">Mirza Haidar Dughlat, <em>Tarikh-i-Rashidi</em></strong> — completed c. 1546 at the Mughal court of Humayun by a Chaghatai Turkic prince who had himself ruled Kashmir briefly in the 1540s. Dughlat treats Sikandar with admiration as a model Muslim sovereign; the iconoclastic campaigns are recorded as virtues. The Tarikh-i-Rashidi is the earliest extant Persian narrative for Sikandar&apos;s reign.
                                </li>
                                <li>
                                    <strong className="text-foreground">Pir Hassan Shah Khuihami, <em>Tarikh-i-Hassan</em></strong> — completed in the late 19th century in Persian by a learned Kashmiri Muslim scholar drawing on earlier local chronicles since lost. The Tarikh-i-Hassan is the most detailed Kashmiri Muslim narrative of the Shah Mir period and devotes substantial attention to Sikandar&apos;s reign.
                                </li>
                                <li>
                                    <strong className="text-foreground">Anonymous, <em>Baharistan-i-Shahi</em></strong> — a 16th-century Persian-language Kashmiri chronicle of uncertain authorship, written from within the local Sayyid scholarly tradition. The Baharistan&apos;s account of Sikandar&apos;s campaigns is the most explicit about the religious-policy character of the destruction.
                                </li>
                            </ul>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                These three Persian sources are supplemented, on the receiving side, by Jonaraja&apos;s Sanskrit continuation of Kalhana&apos;s <em>Rajatarangini</em> (the <em>Dvitiya Rajatarangini</em>, completed c. 1459), which describes the Sikandar period from a Brahmin Pandit perspective and corroborates the destruction in independent detail. The convergence of the Persian Muslim chronicles and the Sanskrit Hindu chronicle on the same set of events — naming the same Sultan, the same minister Suhabhatta, and the same broad pattern of demolition — is the evidentiary foundation of the case.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-10">Martand Sun Temple: The Surviving Witness</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-10">
                                The Martand Sun Temple, on the Mattan plateau in Anantnag district about sixty kilometres south of Srinagar, is the most monumental surviving evidence of pre-Islamic Kashmiri architecture and the most explicit material casualty of Sikandar&apos;s reign. The temple was founded by the Karkota dynasty&apos;s greatest king, Lalitaditya Muktapida, in the eighth century, dedicated to Surya, and built in a distinctive Kashmiri style that blended Gandharan, Gupta, and Central Asian elements. What survives today is ruin — but the ruin is articulate enough that the plan and the architectural ambition are entirely legible.
                            </p>

                            {datasetCases.map((t) => (
                                <article
                                    key={t.id}
                                    className="border-l-4 border-orange-500/40 pl-8 py-2 mb-12"
                                >
                                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-3">
                                        <span className="text-sm font-mono text-orange-400">
                                            c. {t.destroyer.year} CE
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

                            <p className="text-xl text-muted-foreground leading-relaxed">
                                What is unusual about the Martand ruins is the deliberateness of the demolition pattern. ASI-era surveys and later structural analyses have noted that the central shrine and the colonnaded peristyle do not show the cumulative weathering of natural collapse; they show the chisel and crowbar marks of intentional dismantling, consistent with the chronicles&apos; description of the temple being &ldquo;burnt and broken&rdquo; under direct order. The plinth was preserved largely because the masonry blocks were too heavy to be moved.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">The Srinagar Shrines</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The Persian chronicles and the post-conquest survey records name a sequence of major shrines in and around Srinagar that were demolished or converted during Sikandar&apos;s reign. The list below is the conventional citation drawn from the chronicles and consolidated in Vol I Ch 10 of <em>Hindu Temples — What Happened to Them?</em>. The Jami Masjid of Srinagar, originally built by Sikandar, drew on the materials of these dismantled foundations.
                            </p>
                            <div className="overflow-x-auto mb-6">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b-2 border-border/40">
                                            <th className="text-left py-3 pr-4 font-bold">Shrine</th>
                                            <th className="text-left py-3 pr-4 font-bold">Deity / tradition</th>
                                            <th className="text-left py-3 font-bold">Recorded fate</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {srinagarShrines.map((s) => (
                                            <tr key={s.name} className="border-b border-border/20">
                                                <td className="py-3 pr-4 font-medium">{s.name}</td>
                                                <td className="py-3 pr-4 text-sm text-muted-foreground">{s.deity}</td>
                                                <td className="py-3 text-sm text-muted-foreground">{s.fate}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-base text-muted-foreground italic">
                                Sources: Tarikh-i-Rashidi (Mirza Haidar Dughlat, c. 1546); Tarikh-i-Hassan (Pir Hassan Shah); Baharistan-i-Shahi (anonymous, 16th c.); compiled in Goel Vol I Ch 10. The list is not exhaustive; the Persian chronicles use it as representative of a wider campaign that left, in the chroniclers&apos; own assessment, &ldquo;not one place of worship of the unbelievers&rdquo; standing in central Srinagar.
                            </p>
                        </section>

                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-6">The Pandit Migration and the Demographic Rupture</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Unlike the Mughal demolitions of the 17th century, Sikandar&apos;s campaign was paired with explicit conversion pressure on the surviving Hindu Brahmin community of the Kashmir Valley. The minister Suhabhatta — Saif-ud-Din after his own conversion — is recorded by both the Persian chronicles and Jonaraja&apos;s Sanskrit <em>Dvitiya Rajatarangini</em> as having presented the Pandit community with the choice of conversion, exile, or death. Jonaraja describes the mass migration of Brahmin families to the Jammu hills and the Punjab plains, the temple-fires of those who refused to leave, and the institutional collapse of the Sanskritic scholarly tradition that Kalhana had assumed as the natural inheritance of Kashmir.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                The conventional figure — preserved in Pandit family genealogies and corroborated by Jonaraja&apos;s narrative — is that only eleven Brahmin families remained in the Kashmir Valley by the end of Sikandar&apos;s reign. The figure is folkloric in form, but the order of magnitude matches what the chronicles describe: the substantial erasure of a religious-intellectual community over the course of a single reign. The modern Kashmiri Pandit population descends in part from those who returned after the relative religious accommodations of Sultan Zain-ul-Abidin (Sikandar&apos;s second son and successor of the late 15th century), and in part from later immigrant Pandit families.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">What the Sources Establish, and the Scope of the Case</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The Sikandar case has unusually convergent evidence. The Persian Muslim chronicles, written under successive Sultanate and Mughal patronage in the period 1450–1900, are uniformly explicit. The Sanskrit Pandit chronicle of Jonaraja, written from the receiving end within a generation of the events, corroborates them in narrative detail and adds the demographic dimension. The architectural witness at Martand, the Srinagar shrine list with the materials reused in the Jami Masjid, and the absence in the modern Kashmir Valley of any standing pre-Islamic Hindu monument other than Martand and the Pandrethan Shiva shrine all point to the same set of events.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                What the sources do <em>not</em> establish — and what should not be inherited from the polemical tradition on either side — is a complete civilizational extinction of Hindu Kashmir in a single moment. Sikandar&apos;s second son Zain-ul-Abidin (r. 1420–1470) is recorded by the same chronicles as a sovereign who reversed many of his father&apos;s policies, recalled exiled Pandits, restored some temples, and patronised Sanskrit scholarship. The Pandit community survived and contributed centrally to the cultural life of the valley through to the 20th century. The Sikandar episode is a sharp documented rupture, not the total erasure that some retrospective accounts have framed it as.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                What it is, evidentially, is the most thoroughly documented single-reign campaign of temple destruction in medieval India, with the unusual property that the destroyer&apos;s own community produced the historians who recorded it without apology, while the receiving community produced an independent contemporary chronicle in Jonaraja that confirms what the Persian sources celebrate.
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
                                The Persian chronicles for Sikandar&apos;s reign are Mirza Haidar Dughlat, <em>Tarikh-i-Rashidi</em> (c. 1546), translated into English by E. Denison Ross (London, 1895; reprinted by various Indian publishers); Pir Hassan Shah Khuihami, <em>Tarikh-i-Hassan</em> (late 19th c., Persian, partial Urdu translation extant); and the anonymous <em>Baharistan-i-Shahi</em> (16th c., Persian, edited by K. N. Pandita, 1991).
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                The contemporary Sanskrit source is Jonaraja, <em>Dvitiya Rajatarangini</em> (continuation of Kalhana&apos;s <em>Rajatarangini</em>), completed c. 1459, edited and translated by Walter Slaje (Halle, 2014) and earlier by Srikanth Kaul (Hoshiarpur, 1967). For Kalhana&apos;s original <em>Rajatarangini</em> describing the pre-Islamic Kashmiri temple corpus that Sikandar&apos;s campaigns dismantled, the standard reference is M. A. Stein&apos;s annotated translation (London, 1900; reprinted Motilal Banarsidass).
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Related Cases</h2>
                            <ul className="space-y-3 text-lg text-muted-foreground leading-relaxed pl-6 list-disc">
                                <li>
                                    <Link href="/martand-sun-temple" className="text-orange-400 font-medium hover:text-orange-300 transition-colors">Martand Sun Temple, c. 1400</Link>
                                    : the 8th-century Karkota foundation; Persian and Sanskrit sources converge on the destruction.
                                </li>
                            </ul>
                        </section>

                        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
                            <Link href="/temples-destroyed-medieval-india" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                Hub: Temples Destroyed in Medieval India <ArrowRight size={16} />
                            </Link>
                            <Link href="/aurangzeb-temples-destroyed" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                Aurangzeb&apos;s Destructions <ArrowRight size={16} />
                            </Link>
                            <Link href="/mahmud-of-ghazni-temples-destroyed" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                Mahmud of Ghazni&apos;s Destructions <ArrowRight size={16} />
                            </Link>
                            <Link href="/kailasa-temple-ellora" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                Kailasa Temple Ellora <ArrowRight size={16} />
                            </Link>
                            <Link href="/south-india-temple-architecture" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                South India Temple Architecture <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>

                    <div className="mt-20 bg-orange-600 rounded-3xl p-12 text-center text-white shadow-2xl">
                        <h2 className="text-4xl lg:text-5xl font-display font-black mb-6">Martand Still Stands.</h2>
                        <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10 font-medium">
                            Ruin and witness — the eighth-century plinth at Mattan outlasted the demolition by six centuries and is now an ASI-protected monument. What was built is sometimes harder to destroy than the destroyers expected.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <TrackedLink
                                href="/temples-destroyed-medieval-india"
                                eventLabel="sikandar_temples:footer:hub"
                                trackPathName="temples-destroyed-medieval-india"
                                className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                The Full Hub
                            </TrackedLink>
                            <TrackedLink
                                href="/mahmud-of-ghazni-temples-destroyed"
                                eventLabel="sikandar_temples:footer:mahmud"
                                trackPathName="mahmud-of-ghazni-temples-destroyed"
                                className="px-10 py-5 bg-orange-700 text-white border border-orange-400/30 font-bold rounded-2xl transition-all hover:bg-orange-800"
                            >
                                Mahmud&apos;s Record
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
