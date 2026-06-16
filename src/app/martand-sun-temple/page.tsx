import type { Metadata } from "next";
import Link from "next/link";
import { DestroyedTempleCaseLayout } from "@/components/DestroyedTempleCaseLayout";
import { getArticleBySlug } from "@/features/articles";

export const metadata: Metadata = {
    title: "Martand Sun Temple: Sikandar Butshikan's Kashmir Raid",
    description:
        "The eighth-century Karkota-built Surya temple at Anantnag, dismantled c. 1400 under Sikandar Butshikan. Persian and Sanskrit sources converge on the destruction.",
    alternates: {
        canonical: "https://www.opensadhaka.com/martand-sun-temple",
    },
    openGraph: {
        title: "Martand Sun Temple: Sikandar Butshikan's Kashmir Raid",
        description:
            "Persian chronicles and Jonaraja's Sanskrit Rajatarangini continuation agree: the great Surya temple at Mattan was systematically dismantled c. 1400 CE.",
        url: "https://www.opensadhaka.com/martand-sun-temple",
        type: "article",
    },
};

export default function MartandSunTemplePage() {
    const meta = getArticleBySlug("martand-sun-temple")!;

    return (
        <DestroyedTempleCaseLayout
            meta={meta}
            templeId="martand-sun-temple-sikandar-c1400"
            kbClaimSlugs={["martand-sun-temple-sikandar-butshikan-claim"]}
            contestedNote={
                <>
                    <p className="mb-2">
                        That Sikandar&apos;s reign saw systematic temple destruction is not denied
                        by serious scholarship; Persian and Sanskrit sources converge on the
                        destruction itself. What is genuinely debated is the relative weight of
                        Sikandar&apos;s personal initiative versus the agency of his
                        Brahmin-convert minister Suhabhatta (who took the Muslim name Saifuddin).
                    </p>
                    <p>
                        Mohibbul Hasan&apos;s <em>Kashmir Under the Sultans</em> (1959) treats
                        Suhabhatta as the executive agent, with Sikandar a more passive figure. The
                        Persian chronicles credit Sikandar directly. Jonaraja&apos;s Sanskrit
                        continuation emphasises Suhabhatta. Both readings sit within the sources;
                        neither erases the destruction. A serious account names the convert-minister
                        dynamic as a real complication without using it to deflect responsibility.
                    </p>
                </>
            }
            bodySlot={
                <>
                    <h2>What happened, c. 1400 CE</h2>
                    <p>
                        Sometime in the first decade of the fifteenth century, the great Martand
                        Sun Temple on the Mattan plateau in Anantnag was systematically dismantled.
                        The temple had stood for roughly six and a half centuries: built around
                        725–750 CE by King Lalitaditya Muktapida of the Karkota dynasty, the most
                        expansionist sovereign in Kalhana&apos;s twelfth-century{" "}
                        <em>Rajatarangini</em>. Martand was dedicated to Surya and was the
                        monumental Karkota foundation of the Kashmir Valley &mdash; an 84-column
                        peristyle surrounding a central shrine, with monastic cells around it, set
                        on a plateau looking south across the valley toward the Pir Panjal.
                    </p>
                    <p>
                        The destruction took place during the reign of Sultan Sikandar Shah Miri
                        (r. c. 1389–1413), the sixth ruler of the Shah Mir dynasty &mdash; the first
                        independent Muslim dynasty of Kashmir. Sikandar&apos;s own Persian-language
                        chroniclers gave him the honorific title <em>Butshikan</em>, &ldquo;the
                        idol-breaker.&rdquo; The destruction is recorded across the Kashmir
                        chronicle tradition: Mirza Haidar Dughlat&apos;s{" "}
                        <em>Tarikh-i-Rashidi</em> (c. 1546), Pir Hassan Shah&apos;s{" "}
                        <em>Tarikh-i-Hassan</em>, the anonymous <em>Baharistan-i-Shahi</em> (c.
                        1614), and Saiyid Ali&apos;s <em>Tarikh-i-Kashmir</em>. The convergence on a
                        single descriptive vocabulary &mdash; the temple &ldquo;burnt and
                        broken,&rdquo; the foundations &ldquo;dug out&rdquo; &mdash; is internal to
                        the Persian chronicle corpus.
                    </p>
                    <p>
                        Independent Hindu corroboration comes from Jonaraja&apos;s Sanskrit{" "}
                        <em>Dvitiya Rajatarangini</em> &mdash; the continuation of Kalhana&apos;s
                        twelfth-century chronicle, completed c. 1459 by a Brahmin court historian
                        within a generation of Sikandar&apos;s death. Jonaraja documents the
                        destruction campaign, names Suhabhatta as principal enforcer, describes the
                        mass migration of Pandit families, and records the temple-fires of those who
                        refused conversion. The convergence of contemporary Persian-Muslim and
                        Sanskrit-Hindu sources on the same events makes the Sikandar case
                        evidentially unusual.
                    </p>

                    <h2>The primary sources</h2>
                    <p>
                        The <em>Tarikh-i-Rashidi</em>, written c. 1546 by Mirza Haidar Dughlat
                        &mdash; a Timurid ruler who briefly governed Kashmir &mdash; is the most
                        cited Persian source for Sikandar&apos;s reign; E. Denison Ross&apos;s
                        translation (ed. N. Elias, Sampson Low, 1895) is the standard form. The{" "}
                        <em>Baharistan-i-Shahi</em> (c. 1614, anonymous) is the earliest sustained
                        Kashmiri-Muslim historical work on the Shah Mir Sultanate, and the
                        nineteenth-century <em>Tarikh-i-Hassan</em> of Pir Hassan Shah is the major
                        Kashmir-internal compilation.
                    </p>
                    <p>
                        On the Sanskrit side, Jonaraja&apos;s continuation of the{" "}
                        <em>Rajatarangini</em> is the irreplaceable contemporary witness &mdash; a
                        court historian writing as the events were within living memory of his own
                        community. The Srikant Kaul Sanskrit critical edition and Walter
                        Slaje&apos;s annotated work on the late <em>Rajatarangini</em> chronicles
                        (Harrassowitz, 2012) are the scholarly forms. The pre-Islamic temple
                        baseline is in Kalhana&apos;s original <em>Rajatarangini</em> (1148 CE),
                        available in M. A. Stein&apos;s annotated translation (Constable, 1900).
                    </p>

                    <h2>What stands at Mattan today</h2>
                    <p>
                        The ruins of Martand survive on the plateau where Lalitaditya raised the
                        temple. The plinth is intact &mdash; the masonry blocks were too heavy to
                        move &mdash; and the original 84-column peristyle outline is readable from
                        the ground plan. The central shrine ruins, the surrounding monastic cells,
                        and substantial fragments of the carved architectural elements all survive
                        in situ. The site is an Archaeological Survey of India protected monument
                        and remains accessible to visitors when conditions in the Kashmir Valley
                        permit access.
                    </p>
                    <p>
                        Archaeological survey patterning &mdash; from Alexander Cunningham&apos;s
                        nineteenth-century surveys onward &mdash; documents the damage as
                        deliberate dismantling, not natural collapse. The structural elements show
                        chisel and crowbar marks. Walls are broken at structural points where
                        applied force would bring them down, not where weather would. Surrounding
                        cells were stripped before the central shrine was attacked. The pattern is
                        consistent with the Persian chronicles&apos; description of the temple
                        being &ldquo;burnt and broken&rdquo; and the foundations being &ldquo;dug
                        out.&rdquo; The ruins are themselves a primary-source physical object the
                        reader can encounter directly.
                    </p>

                    <h2>The sub-claims and what they say</h2>
                    <p>
                        Six sub-claims sit inside the Martand case. First, the title{" "}
                        <em>Butshikan</em> &mdash; idol-breaker &mdash; was given to Sikandar by
                        Kashmir&apos;s own Persian-language Muslim chroniclers as honorific, not by
                        hostile external sources. This is the single most useful observation for
                        addressing the &ldquo;is the destruction story Hindu propaganda?&rdquo;
                        deflection. The <em>Tarikh-i-Rashidi</em>, <em>Tarikh-i-Hassan</em>,{" "}
                        <em>Baharistan-i-Shahi</em>, and <em>Tarikh-i-Kashmir</em> are
                        Muslim-internal sources; their honorific use of &ldquo;idol-breaker&rdquo;
                        is what closes the deflection.
                    </p>
                    <p>
                        Second, the campaign across the valley c. 1389–1413 is supported by both
                        Muslim and Hindu contemporary sources. Third, the Martand destruction itself
                        is identified in both Persian and Sanskrit chronicles as a Sikandar-period
                        target; the ruins show deliberate-dismantling damage consistent with the
                        textual record. Fourth, the destruction extended well beyond Martand
                        &mdash; Vijayeshvara at Bijbihara, Bhimasvamin, Sureshvari, the Bhutesha
                        temple, and the great Srinagar shrines were all destroyed or converted.
                    </p>
                    <p>
                        Fifth, the convert-minister Suhabhatta &mdash; the Brahmin who took the
                        Muslim name Saifuddin &mdash; is named by Jonaraja as the principal
                        architect of the destruction policy, and his role is corroborated by the
                        Persian chronicles. A contemporary Hindu source naming the specific
                        official is rare in the medieval temple-destruction corpus; most cases
                        preserve only the sovereign&apos;s name.
                    </p>
                    <p>
                        Sixth &mdash; the most consequential framing &mdash; Kashmir&apos;s
                        pre-Islamic temple corpus, catalogued in Kalhana&apos;s twelfth-century{" "}
                        <em>Rajatarangini</em>, was largely destroyed within Sikandar&apos;s single
                        reign. Kalhana names hundreds of temples by founder and location;
                        practically none survive. The current standing pre-Islamic monument corpus
                        is Martand (ruined), the Avantisvamin temple at Avantipur (ruined), the
                        Pandrethan temple, and a handful of smaller structures. The
                        catalog-to-survivors gap is the most concrete way to convey the
                        destruction&apos;s scale. Some attrition is attributable to other causes
                        &mdash; Aurangzeb-period operations, the eighteenth-century Afghan period,
                        natural decay &mdash; but the bulk of the disappearance dates to
                        Sikandar&apos;s reign.
                    </p>

                    <h2>The wider campaign</h2>
                    <p>
                        Sikandar&apos;s queen Subh Mata and his minister Suhabhatta drove the
                        iconoclastic policy, with the influence of the visiting Sayyid missionary
                        Mir Muhammad Hamadani &mdash; son of the more famous Mir Sayyid Ali
                        Hamadani &mdash; documented by the chroniclers. The campaign produced not
                        only temple destruction but the imposition of jizya, the prohibition of
                        public Hindu worship, and the mass migration of Pandit families from the
                        valley that Jonaraja records.
                    </p>
                    <p>
                        The rupture was sharp but not complete. Sikandar&apos;s son Zain-ul-Abidin
                        (r. 1420–1470) reversed many of his father&apos;s policies, recalled exiled
                        Pandits, restored some temples, patronised Sanskrit scholarship, and is
                        remembered in Kashmiri folk memory by the honorific Bud-Shah, &ldquo;Great
                        King.&rdquo; The modern Kashmiri Pandit community descends in part from
                        those who returned during his reign. The Sikandar episode is the most
                        documented single-reign campaign of medieval temple destruction in India,
                        not a total extinction.
                    </p>

                    <h2>What this case anchors</h2>
                    <p>
                        Of all the medieval Indian temple-destruction cases, the Sikandar campaign
                        is the one with the most evidentially unusual feature: the convergence of
                        Persian-Muslim and Sanskrit-Hindu contemporary sources on the same events.
                        When chroniclers from both communities, writing roughly contemporaneously,
                        agree on what happened, the historical record is more secure than when one
                        side is silent. The Martand ruins are the physical ratification of the
                        textual convergence.
                    </p>
                    <p>
                        Martand also anchors the question of <em>what was lost</em> in the medieval
                        Kashmir Valley. Kalhana&apos;s <em>Rajatarangini</em> describes a
                        densely-templed landscape: a valley of Shaiva, Vaishnava, Surya, and
                        Buddhist monumental architecture, with named founders and reign-dated
                        construction sequences, sustained over centuries by Karkota, Utpala, and
                        Lohara dynasties. The current standing pre-Islamic corpus is a handful of
                        ruined structures. The gap is the destruction&apos;s legacy. For the broader
                        picture of Sikandar&apos;s reign see{" "}
                        <Link href="/sikandar-butshikan-kashmir-temples">
                            Sikandar Butshikan: Kashmir&apos;s Temple Destructions
                        </Link>{" "}
                        and the parent hub article{" "}
                        <Link href="/temples-destroyed-medieval-india">
                            Hindu Temples Destroyed in Medieval India
                        </Link>
                        .
                    </p>
                </>
            }
        />
    );
}
