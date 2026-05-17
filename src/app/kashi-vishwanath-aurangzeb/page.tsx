import type { Metadata } from "next";
import Link from "next/link";
import { DestroyedTempleCaseLayout } from "@/components/DestroyedTempleCaseLayout";
import { getArticleBySlug } from "@/features/articles";

export const metadata: Metadata = {
    title: "Kashi Vishwanath 1669: Aurangzeb's Demolition Order",
    description:
        "Aurangzeb's April 1669 firman, the September report of the Vishweshwar temple demolished at Kashi, and the Gyanvapi mosque on the same footprint.",
    alternates: {
        canonical: "https://www.opensadhaka.com/kashi-vishwanath-aurangzeb",
    },
    openGraph: {
        title: "Kashi Vishwanath 1669: Aurangzeb's Demolition Order",
        description:
            "The Maasir-i-Alamgiri records the firman, the demolition, and the mosque. Maulana Abdul Hai's 1973 Urdu work confirms the conversion from a Muslim source.",
        url: "https://www.opensadhaka.com/kashi-vishwanath-aurangzeb",
        type: "article",
    },
};

export default function KashiVishwanathAurangzebPage() {
    const meta = getArticleBySlug("kashi-vishwanath-aurangzeb")!;

    return (
        <DestroyedTempleCaseLayout
            meta={meta}
            templeId="kashi-vishwanath-aurangzeb-1669"
            kbClaimSlugs={["kashi-vishwanath-aurangzeb-claim"]}
            contestedNote={
                <>
                    <p className="mb-2">
                        The <em>fact</em> of the 1669 demolition is not seriously contested by any
                        modern scholarship — the Mughal-internal documentary chain is too tight, and
                        a senior 20th-century Muslim scholar (Maulana Abdul Hai of Nadwa)
                        independently confirms it in Urdu. What is contested is generalisability:
                        whether the Kashi case reflects a uniformly anti-Hindu policy across
                        Aurangzeb&apos;s reign, or whether it must be read against the many temples
                        he <em>did</em> patronise.
                    </p>
                    <p>
                        Audrey Truschke&apos;s <em>Aurangzeb: The Man and the Myth</em> (2017) is
                        the most prominent contemporary revisionist position. Truschke does not deny
                        the Kashi destruction (she acknowledges it explicitly) but argues against
                        reading it as evidence of uniform anti-Hindu zealotry. The honest summary:
                        Truschke&apos;s complication of the simplistic narrative is well-grounded,
                        and it does not extend to denying the specific 1669 case.
                    </p>
                </>
            }
            bodySlot={
                <>
                    <h2>What happened in 1669</h2>
                    <p>
                        On 9 April 1669, the Mughal emperor Aurangzeb issued a firman from his court
                        at Delhi. The order was not narrowly local; it instructed the governors of
                        all provinces &ldquo;to demolish the schools and temples of the infidels and
                        with the utmost urgency put down the teaching and the public practice of the
                        religion of these misbelievers.&rdquo; The firman named three regions
                        specifically: Tatta in Sindh, Multan in Punjab, and Benares — Kashi — in the
                        Gangetic plain.
                    </p>
                    <p>
                        The execution at Kashi followed within months. Aurangzeb&apos;s own court
                        chronicle, the <em>Maasir-i-Alamgiri</em>, records under the events of
                        September 1669 the matter-of-fact report-back to the emperor:
                    </p>
                    <blockquote>
                        <p>
                            &ldquo;It was reported that, according to the Emperor&apos;s command, his
                            officers had demolished the temple of Viswanath at Kashi.&rdquo;
                        </p>
                    </blockquote>
                    <p>
                        That is the sentence. There is no embellishment, no theological gloss, no
                        attempt to justify the action — the chronicler considered it routine
                        administrative business, recorded in passing alongside the year&apos;s
                        regular bureaucratic correspondence. The Vishweshwar (Vishwanath) temple was
                        one of the most venerated Shaiva shrines in the subcontinent; the
                        chronicler&apos;s economy of language is the most revealing feature of the
                        entry. Demolition of a major Jyotirlinga site was, in the Mughal state
                        register of 1669, a single-sentence event.
                    </p>

                    <h2>The primary source</h2>
                    <p>
                        The <em>Maasir-i-Alamgiri</em> was compiled by Saqi Mustaid Khan and
                        completed in 1710, three years after Aurangzeb&apos;s death, from the state
                        archives Aurangzeb himself had maintained. It is the official Mughal court
                        chronicle of the reign &mdash; the equivalent of a presidential daily
                        briefing aggregated into a year-by-year administrative ledger. The standard
                        English translation is Sir Jadunath Sarkar&apos;s, published by the Royal
                        Asiatic Society of Bengal in 1947; earlier excerpts appear in H. M. Elliot
                        and J. Dowson, <em>The History of India</em>, vol. 7 (1877).
                    </p>
                    <p>
                        What gives the Kashi entry its evidentiary weight is not its prose &mdash;
                        the chronicle&apos;s prose is dry &mdash; but its position in the
                        documentary chain. The firman of April 1669 (recorded earlier in the same
                        chronicle) is the imperial order. The September 1669 entry is the report
                        back from the officers who executed it. The chain is internal to the Mughal
                        state record: the emperor orders, the officers act, the chronicler logs the
                        result. There is no Hindu source intervening; the case rests on
                        Mughal-internal documentary evidence.
                    </p>
                    <p>
                        Independent 20th-century corroboration comes from Maulana Hakim Sayid Abdul
                        Hai, Rector of Darul-Ulum Nadwatul-Ulama at Lucknow &mdash; one of the most
                        authoritative Indian Muslim seminaries. In his Urdu work{" "}
                        <em>Hindustan Islami Ahad Mein</em> (Nadwa, 1973), Abdul Hai writes plainly:
                        &ldquo;The mosque which was built by Alamgir is, in fact, the site of the
                        Bisheshwar Temple. Alamgir got the temple demolished and built a mosque
                        there with those very stones.&rdquo; The 1977 English translation of
                        Abdul Hai&apos;s work omitted these passages &mdash; a redaction documented
                        by Arun Shourie in &ldquo;Hideaway Communalism&rdquo; (Indian Express,
                        5 February 1989). The Muslim-insider confirmation closes off the
                        &ldquo;this is Hindu fabrication&rdquo; deflection.
                    </p>

                    <h2>What stands at Kashi today</h2>
                    <p>
                        The Gyanvapi Mosque now stands on the western half of the original temple
                        footprint. The qibla wall &mdash; the wall the congregation faces when
                        praying toward Mecca &mdash; is the eastern wall of the pre-1669 Vishweshwar
                        temple. The carved pilasters, lotus medallions, and shikhara-base mouldings
                        of the original temple are not concealed; they are structurally embedded in
                        the mosque and visible to anyone who looks. The architectural continuity is
                        not a contested archaeological claim. It is a directly observable fact.
                    </p>
                    <p>
                        Adjacent to the mosque stands the present Kashi Vishwanath temple, the
                        canonical contemporary Jyotirlinga of Banaras and one of the most-visited
                        Shaiva pilgrimage sites in the subcontinent. This temple is a 1780
                        reconstruction by Maharani Ahilyabai Holkar of Indore &mdash; the patron of
                        a half-century of post-Mughal temple-rebuilding across northern India. The
                        Ahilyabai temple was built on land <em>adjacent</em> to the original site,
                        not on the precise pre-1669 footprint, which remains under the Gyanvapi
                        Mosque. The distinction matters: the destroyed temple of 1669 is the
                        pre-Ahilyabai structure; the 1780 reconstruction is its sibling, not its
                        identity.
                    </p>
                    <p>
                        The Gyanvapi survey litigation (2022 onward) under direction of the Indian
                        courts is the contemporary legal continuation of the historical question.
                        ASI surveys have documented temple architecture features within and beneath
                        the mosque; the legal process is ongoing. The historical record on which the
                        litigation rests is the record summarised here.
                    </p>

                    <h2>What the sub-claims say</h2>
                    <p>
                        Five sub-claims sit inside the Kashi case, each at a different evidentiary
                        weight. The April 1669 general firman is <em>supported</em> by the
                        Maasir-i-Alamgiri text quoted above and by Sarkar&apos;s scholarly biography{" "}
                        <em>History of Aurangzib</em>. The specific demolition pursuant to that
                        firman is <em>supported</em> by the September 1669 chronicle entry. The
                        construction of the Gyanvapi Mosque on the same site using temple materials
                        is <em>supported</em> by Abdul Hai&apos;s 1973 Urdu confirmation and by the
                        visible qibla wall. The visible temple fabric in the mosque&apos;s western
                        wall is <em>supported by direct physical observation</em>.
                    </p>
                    <p>
                        Where nuance is needed is the question of whether Aurangzeb&apos;s policy was
                        <em> uniform religious iconoclasm</em>. It was not. Many temples (at
                        Vrindavan, Chitrakoot, Ujjain, and elsewhere) received Mughal grants and
                        patronage throughout his reign. Specific demolitions were often targeted at
                        sites associated with rebellion, political resistance, or rival authority
                        &mdash; though sometimes, as in the 1669 firman, framed in explicitly
                        religious terms. The Kashi case is among the most clearly
                        religiously-framed: the firman specifies temples and the public practice of
                        the misbelievers&apos; religion, not particular rebellions.
                    </p>

                    <h2>The firman as standing order</h2>
                    <p>
                        The April 1669 firman was not a one-time order. It was a standing
                        instruction that produced the case-by-case demolitions the chronicle then
                        narrates over the next thirty-eight years &mdash; Kashi in 1669, Mathura&apos;s{" "}
                        <Link href="/keshavdev-mathura">Keshavdev temple in 1670</Link>, the temples
                        of Khandela and Jodhpur in 1679 (where three hundred Rajputs died defending a
                        single Devi shrine), the 172 temples of the Mewar campaign in January 1680,
                        the sixty-six temples at Amber in August 1680, the Vithoba temple at
                        Pandharpur. The pattern was administrative procedure, executed by named
                        officers and recorded by the emperor&apos;s own historian. For the full
                        catalogue see{" "}
                        <Link href="/aurangzeb-temples-destroyed">
                            Aurangzeb&apos;s Temple Destructions
                        </Link>
                        .
                    </p>

                    <h2>What this case anchors</h2>
                    <p>
                        Of all the medieval Mughal temple-destruction cases, Kashi 1669 is the one
                        with the cleanest documentary chain: an explicit imperial firman, a specific
                        report-back of execution, a contemporary Mughal court chronicle preserving
                        both, a 20th-century Muslim-scholarly confirmation closing off
                        Hindu-source-only objections, and visible physical continuity of the
                        destroyed temple&apos;s structural fabric inside the mosque built on its
                        site. The case does not need rhetorical inflation. The Mughal-internal
                        record is the case.
                    </p>
                    <p>
                        Kashi also anchors a methodological point. Articles on Aurangzeb&apos;s
                        religious policy that simplify in either direction &mdash; uniform zealotry
                        on one side, denial of the documented demolitions on the other &mdash; have
                        the documentary record working against them. The honest account holds two
                        registers: the well-documented demolitions of Kashi, Mathura, and the Mewar
                        campaign on one hand; the surviving patronage grants to specific temples and
                        Brahmin establishments on the other. Both records are real. Both belong in
                        the picture.
                    </p>
                </>
            }
        />
    );
}
