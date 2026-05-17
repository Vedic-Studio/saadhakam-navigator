import type { Metadata } from "next";
import Link from "next/link";
import { DestroyedTempleCaseLayout } from "@/components/DestroyedTempleCaseLayout";
import { getArticleBySlug } from "@/features/articles";

export const metadata: Metadata = {
    title: "Keshavdev Mathura 1670: Aurangzeb's Krishna-Site Order",
    description:
        "Aurangzeb's January 1670 firman demolished the Keshavdev temple at Krishna's birthplace, raised the Shahi Eidgah, buried the idols at Agra, and renamed Mathura.",
    alternates: {
        canonical: "https://www.opensadhaka.com/keshavdev-mathura",
    },
    openGraph: {
        title: "Keshavdev Mathura 1670: Aurangzeb's Krishna-Site Order",
        description:
            "Four elements recorded in the Maasir-i-Alamgiri: the demolition, the mosque on the footprint, the idol-humiliation rite at Agra, the renaming of Mathura.",
        url: "https://www.opensadhaka.com/keshavdev-mathura",
        type: "article",
    },
};

export default function KeshavdevMathuraPage() {
    const meta = getArticleBySlug("keshavdev-mathura")!;

    return (
        <DestroyedTempleCaseLayout
            meta={meta}
            templeId="keshavdev-mathura-aurangzeb-1670"
            kbClaimSlugs={["keshavdev-mathura-aurangzeb-claim"]}
            contestedNote={
                <>
                    <p className="mb-2">
                        The <em>fact</em> of the January 1670 demolition is documented in
                        Aurangzeb&apos;s own court chronicle with unusual completeness &mdash; all
                        four elements (destruction, mosque, idol-burial rite, city renaming) are in
                        the same entry. No serious modern scholarship denies the event.
                    </p>
                    <p>
                        What admits genuine nuance is the question of <em>motivation</em>. Mathura
                        was the centre of Gokula&apos;s Jat agrarian rebellion, suppressed in the
                        same month as the temple destruction. Audrey Truschke&apos;s{" "}
                        <em>Aurangzeb</em> (2017) develops the reading that the demolition combined
                        religious motive with political punishment of a rebellious region. This is a
                        real political dimension; it does not erase the chronicle&apos;s explicit
                        religious framing, but it complicates a reading that takes the religious
                        framing as the sole driver.
                    </p>
                </>
            }
            bodySlot={
                <>
                    <h2>What happened in January 1670</h2>
                    <p>
                        In the month of Ramadan 1080 AH &mdash; corresponding to January–February
                        1670 CE &mdash; Aurangzeb issued a firman ordering the demolition of the
                        Keshavdev temple at Mathura. The temple was the great Vaishnava shrine
                        marking the traditional <em>janmasthan</em> &mdash; the birthplace
                        &mdash; of Krishna, on a site of pilgrimage going back at least to the
                        Gupta period and revered across the Vaishnava traditions of the northern
                        subcontinent. The shrine Aurangzeb destroyed had been built (or
                        substantially rebuilt) sixty years earlier by Bir Singh Deo Bundela of
                        Orchha, at a reported cost of 33 lakh rupees, under Jahangir&apos;s
                        tolerance. Aurangzeb&apos;s order destroyed his ancestor&apos;s permitted
                        construction.
                    </p>
                    <p>
                        The execution followed Aurangzeb&apos;s standard administrative method: a
                        named order from the court, dispatched officers, a temple razed, a mosque
                        raised on the foundation, the idols carried away for ritual humiliation, and
                        the chronicler&apos;s entry summarising the result. The{" "}
                        <em>Maasir-i-Alamgiri</em> preserves the entry with unusual completeness:
                    </p>
                    <blockquote>
                        <p>
                            &ldquo;During this month of Ramzan abounding in miracles, the Emperor,
                            as the promoter of justice and overthrower of mischief, as a knower of
                            truth and destroyer of oppression, as the zephyr of the garden of
                            victory and the reviver of the faith of the Prophet, issued orders for
                            the demolition of the temple situated in Mathura, famous as the Dehra of
                            Kesho Rai. In a short time by the great exertions of his officers the
                            destruction of this strong foundation of infidelity was accomplished,
                            and on its site a lofty mosque was built at the expenditure of a large
                            sum&hellip; The idols, large and small, set with costly jewels which had
                            been set up in the temple were brought to Agra, and buried under the
                            steps of the mosque of the Begam Sahib, in order to be continually
                            trodden upon. The name of Mathura was changed to Islamabad.&rdquo;
                        </p>
                    </blockquote>
                    <p>
                        The entry is one of the most complete single-event records in the Mughal
                        chronicle tradition. The four elements together capture the deliberate
                        symbolic logic: the destruction removes the shrine; the mosque on the
                        footprint claims the site; the burial of jewelled idols under mosque steps
                        in Agra extends the humiliation to the imperial capital; the renaming
                        attempts bureaucratic erasure of the place itself.
                    </p>

                    <h2>The primary source</h2>
                    <p>
                        The <em>Maasir-i-Alamgiri</em> &mdash; Saqi Mustaid Khan&apos;s official
                        chronicle of Aurangzeb&apos;s reign, completed 1710 from the Mughal state
                        archives &mdash; is the source for all four elements. Sir Jadunath
                        Sarkar&apos;s English translation (Royal Asiatic Society of Bengal, 1947) is
                        the standard citable form; the relevant pages cover the events of Ramadan
                        1080 AH. Earlier English excerpts appear in Elliot and Dowson, vol. 7
                        (1877). Sarkar&apos;s scholarly biography <em>History of Aurangzib</em> (vol.
                        3, 1916) treats the Mathura campaign with sustained primary-source citation
                        and locates it in the context of the simultaneous suppression of the Jat
                        rebellion.
                    </p>
                    <p>
                        Independent Muslim-scholarly confirmation in the 20th century comes from
                        Maulana Abdul Hai&apos;s <em>Hindustan Islami Ahad Mein</em> (Nadwa, 1973),
                        which lists the Aurangzeb mosque at Mathura among seven mosques built on
                        temple sites. As at Kashi, the Muslim-insider confirmation makes the
                        &ldquo;this is Hindu fabrication&rdquo; deflection untenable.
                    </p>

                    <h2>What stands at Mathura today</h2>
                    <p>
                        The Shahi Eidgah Mosque now occupies the original temple footprint,
                        directly adjacent to the modern Krishna Janmasthan complex. The two
                        structures share a wall; the spatial relationship is direct and observable.
                        Architectural elements consistent with temple-spolia construction &mdash;
                        carved stones reused from the destroyed shrine &mdash; have been documented
                        in the Eidgah&apos;s fabric. The contemporary Krishna Janmasthan temple
                        complex was rebuilt in the 20th century on land adjoining the Eidgah; the
                        original pre-1670 footprint remains occupied by the mosque.
                    </p>
                    <p>
                        The renaming of Mathura to Islamabad did not stick. It was an act of state,
                        not an act of folk culture &mdash; preserved in official Mughal documents
                        and coinage of the period, but never adopted in popular usage. Mathura
                        reverted to its original Sanskritic name almost immediately after the Mughal
                        period and has not been called anything else since. The renaming records the
                        intent, not the outcome: it tells the reader what Aurangzeb&apos;s court
                        meant the destruction to achieve, and what it ultimately did not.
                    </p>

                    <h2>The sub-claims and their evidentiary weight</h2>
                    <p>
                        Five sub-claims sit inside the Mathura case. The January 1670 firman is{" "}
                        <em>supported</em> by the Maasir-i-Alamgiri text. The construction of the
                        Shahi Eidgah on the temple footprint is <em>supported</em> by the same
                        chronicle entry and by the spatial relationship of the modern Eidgah and
                        Janmasthan complex. The burial of the jewelled idols under the Begum Sahib
                        mosque steps at Agra &ldquo;to be continually trodden upon&rdquo; is{" "}
                        <em>supported</em>, and the recurring pattern of idol-humiliation
                        rites &mdash; the same rite recurs at Jodhpur in 1679 and Khandela in
                        1679 &mdash; rules out reading it as isolated chronicler flourish. The
                        renaming of Mathura is <em>supported</em> by the same entry and by official
                        documents.
                    </p>
                    <p>
                        Where the evidence is less monolithic is the claim that the destruction
                        reflects purely religious motivation. It does not. Mathura had been the
                        centre of Gokula&apos;s Jat agrarian rebellion (1669–1670), suppressed by
                        Aurangzeb in the same month as the temple destruction; Gokula was captured
                        and executed in January 1670. The destruction can be read as combining
                        religious motive with political punishment of a rebellious region. The
                        chronicle&apos;s framing is explicitly religious &mdash; the temple is
                        called &ldquo;this strong foundation of infidelity,&rdquo; the destruction
                        is described as the reviving of the Prophet&apos;s faith &mdash; but a
                        full account holds both registers.
                    </p>
                    <p>
                        The Bir Singh / Jahangir contrast sharpens the picture. The destroyed
                        temple was built under Mughal tolerance by a Mughal ally; Aurangzeb&apos;s
                        order reversed a settled accommodation his great-grandfather had granted.
                        Reading Mughal history as a single block of policy obscures the actual
                        variation between rulers.
                    </p>

                    <h2>The wider campaign</h2>
                    <p>
                        Mathura 1670 follows{" "}
                        <Link href="/kashi-vishwanath-aurangzeb">Kashi 1669</Link> in the same
                        sequence of demolitions executed pursuant to the April 1669 general firman.
                        The Mewar campaign of 1679–1680 produced 172 temples destroyed in the
                        environs of Udaipur in a single fortnight, plus the great Jagannath Rai
                        temple at the Rana&apos;s palace, plus three temples at Lake Udaisagar. At
                        Khandela in March 1679, the Maasir-i-Alamgiri records three hundred Rajputs
                        slain defending the great Devi temple. At Amber in August 1680, Abu Turab
                        demolished sixty-six temples. At Pandharpur, the order was specifically to
                        slaughter cows inside the Vithoba temple to permanently desecrate the site
                        for Hindu worship. For the full catalogue see{" "}
                        <Link href="/aurangzeb-temples-destroyed">
                            Aurangzeb&apos;s Temple Destructions
                        </Link>
                        .
                    </p>

                    <h2>What this case anchors</h2>
                    <p>
                        Of the documented Mughal-period destructions, Mathura is the case where the
                        chronicle preserves the deliberate symbolic logic most fully. The four
                        elements together &mdash; demolition, mosque, idol-burial, renaming &mdash;
                        show what an Aurangzeb-era anti-temple operation was meant to do: not only
                        destroy the shrine, but claim the site, humiliate the icons, and rename the
                        place. Other entries record demolitions; the Mathura entry records intent.
                    </p>
                    <p>
                        Mathura also anchors the methodological point that holding political and
                        religious motivation in tension is the honest reading. The Jat rebellion
                        context is real. The religious framing in the court record is also real.
                        Neither erases the other. A serious account names both and lets the reader
                        weigh them. For the broader hub article on medieval temple destruction see{" "}
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
