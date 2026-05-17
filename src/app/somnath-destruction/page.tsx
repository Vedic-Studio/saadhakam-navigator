import type { Metadata } from "next";
import Link from "next/link";
import { DestroyedTempleCaseLayout } from "@/components/DestroyedTempleCaseLayout";
import { getArticleBySlug } from "@/features/articles";

export const metadata: Metadata = {
    title: "Somnath Destruction 1026: Mahmud of Ghazni's Raid",
    description:
        "Mahmud of Ghazni sacked the Somnath Shiva temple in January 1026. What Utbi, al-Biruni, and Minhaj-us-Siraj actually say, and what the loot figures get wrong.",
    alternates: {
        canonical: "https://www.opensadhaka.com/somnath-destruction",
    },
    openGraph: {
        title: "Somnath Destruction 1026: Mahmud of Ghazni's Raid",
        description:
            "The single best-documented temple destruction of the 11th century. Court chronicler Utbi, contemporary scientist al-Biruni, and Minhaj-us-Siraj converge.",
        url: "https://www.opensadhaka.com/somnath-destruction",
        type: "article",
    },
};

export default function SomnathDestructionPage() {
    const meta = getArticleBySlug("somnath-destruction")!;

    return (
        <DestroyedTempleCaseLayout
            meta={meta}
            templeId="somnath-mahmud-1026"
            kbClaimSlugs={["somnath-destruction-claim"]}
            contestedNote={
                <>
                    <p className="mb-2">
                        The <em>fact</em> of the 1026 destruction is one of the most evidentially
                        secure single events of 11th-century Indian history — Utbi, al-Biruni, Ibn al-Athir,
                        and Minhaj-us-Siraj converge. What is contested in modern scholarship is the
                        <em>motivation</em>.
                    </p>
                    <p>
                        Romila Thapar&apos;s <em>Somanatha: The Many Voices of a History</em> (2004)
                        argues the religious-iconoclastic framing in the Persian chronicles must be
                        read alongside political and economic motives: treasure capture, military
                        prestige, dynastic legitimation through orthodoxy. Mohammad Habib&apos;s 1924
                        biography goes further, arguing plunder was the primary driver. The honest
                        summary: religious iconoclasm shaped the method and provided the
                        justification; treasure drove the economics. The relative weight remains a
                        live scholarly debate.
                    </p>
                </>
            }
            bodySlot={
                <>
                    <h2>What happened in January 1026</h2>
                    <p>
                        In the cold weeks of January 1026 CE, Mahmud of Ghazni led a Ghaznavid army
                        out of Multan, across the Thar desert, and into Saurashtra — the western
                        coast of modern Gujarat. The objective was Somnath, the great Shiva temple on
                        the Arabian Sea coast at Prabhas Patan, then one of the wealthiest pilgrimage
                        centres in the subcontinent. The raid was the eleventh of Mahmud&apos;s
                        seventeen recorded Indian campaigns and the only one to enter Hindu
                        civilisational memory as a named civilisational rupture.
                    </p>
                    <p>
                        Mahmud&apos;s court historian <em>Utbi</em> records the Somnath assault in
                        detail in the <em>Tarikh-i-Yamini</em>, written within a decade of the event.
                        Minhaj-us-Siraj, writing two and a half centuries later in the{" "}
                        <em>Tabaqat-i-Nasiri</em>, preserves the most cited single passage in the
                        corpus:
                    </p>
                    <blockquote>
                        <p>
                            &ldquo;When Sultan Mahmud ascended the throne of sovereignty his
                            illustrious deeds became manifest unto all mankind within the pale of
                            Islam when he converted so many thousands of idol-temples into masjids
                            &hellip; He led an army to Naharwala of Gujarat, and brought away Manat,
                            the idol from Somnath, and had it broken into four parts, one of which
                            was cast before the centre of the great masjid at Ghaznin, the second
                            before the gateway of the Sultan&apos;s palace, and the third and fourth
                            were sent to Makkah and Madinah respectively.&rdquo;
                        </p>
                    </blockquote>
                    <p>
                        The identification of the Somnath Shivalinga as &ldquo;Manat&rdquo; — the
                        pre-Islamic Arabian goddess whose idol Muhammad&apos;s followers had
                        destroyed at Mecca — is a Persian-chronicle theological flourish, not
                        history. The Somnath linga belonged to an unbroken Shaiva tradition. But the
                        chronicler&apos;s framing is itself the evidence of motivation: Mahmud&apos;s
                        court understood the campaign as a continuation of the Prophet&apos;s
                        idol-breaking, and the fragments&apos; distribution to Mecca and Medina was
                        the symbolic ratification of that frame.
                    </p>

                    <h2>The primary sources</h2>
                    <p>
                        The Somnath case has unusually thick documentation for an 11th-century event.
                        Three independent contemporary or near-contemporary sources record it.{" "}
                        <em>Utbi&apos;s Tarikh-i-Yamini</em> is the closest in time — Abu Nasr
                        Muhammad al-Utbi was Mahmud&apos;s court historian, writing the official
                        Persian chronicle of the reign within about a decade of the events it
                        describes. Utbi was paid to glorify his patron, which makes him reliable on
                        the <em>fact</em> of the campaigns (no court historian invents victories) and
                        unreliable on the <em>scale</em> (the loot figures and slaughter counts are
                        hagiographic inflation).
                    </p>
                    <p>
                        The most evidentially significant independent source is{" "}
                        <em>al-Biruni&apos;s Kitab-ul-Hind</em>, composed around 1030 CE by a
                        Khwarazmi scientist and ethnographer who travelled with the Ghaznavid
                        campaigns in his later years. al-Biruni was not a propagandist; he was a
                        polymath writing an ethnographic and scientific account of India, and his
                        confirmation of the Somnath events is the single strongest evidentiary
                        anchor in the corpus. The later <em>Tabaqat-i-Nasiri</em> of Minhaj-us-Siraj
                        (c. 1260) and <em>al-Kamil fi-t-Tarikh</em> of Ibn al-Athir (13th c.)
                        preserve the chronicle tradition and confirm the chronology. The standard
                        English-language compilation is H. M. Elliot and J. Dowson,{" "}
                        <em>The History of India as Told by Its Own Historians</em>, vol. 2 (1869).
                    </p>

                    <h2>What stands at Prabhas Patan today</h2>
                    <p>
                        The Somnath temple now standing on the original plinth is the sixth or
                        seventh reconstruction over the original site, depending on how one counts
                        the Chaulukyan medieval rebuilds (Bhima I in the 11th century, Kumarapala in
                        the 12th). The current structure was reconstructed in 1951 on the personal
                        initiative of Sardar Vallabhbhai Patel, India&apos;s first deputy prime
                        minister, with K. M. Munshi managing the project against quiet reservations
                        from Jawaharlal Nehru. The 1951 inauguration by President Rajendra Prasad —
                        Nehru disapproved, but the temple was completed regardless — marks the rebuild
                        as the first major act of post-Independence cultural restoration.
                    </p>
                    <p>
                        The plinth itself is the continuity. The 1951 reconstruction sits on the
                        same foundation that supported the temple Mahmud sacked, which in turn sat on
                        earlier foundations going back at least to the Chaulukyan and pre-Chaulukyan
                        Shaiva tradition of Saurashtra. The physical anchor &mdash; the same earth,
                        the same stones at the lowest courses &mdash; is what makes the Somnath
                        rebuild different from a commemorative new temple on a near-by plot.
                    </p>

                    <h2>The sub-claims that need separating</h2>
                    <p>
                        Around the well-documented core of the 1026 destruction, a cluster of
                        secondary framings has accumulated in popular memory that the sourcing does
                        not fully support. Three are worth naming.
                    </p>
                    <p>
                        First, the figure of <em>seventeen raids on India</em> is a defensible
                        framing of Mahmud&apos;s career — the count derives from the Persian
                        chronicle tradition and is broadly accepted by modern historians. But it
                        should not be elided with &ldquo;seventeen destructions of Somnath,&rdquo; a
                        confusion that circulates in popular accounts. Somnath was a single campaign
                        within the seventeen.
                    </p>
                    <p>
                        Second, the trope that <em>Somnath has been rebuilt seventeen times</em> is
                        not a documented sequence. There is no inventoried list of seventeen
                        rebuilds; the figure is a rhetorical echo of &ldquo;seventeen raids.&rdquo;
                        The temple was reconstructed multiple times across the medieval period
                        (Chaulukyas in the 11th–12th c., Mughal-era patrons), in the colonial period
                        intermittently, and once decisively in 1951. The honest count is five or six
                        major rebuilds, not seventeen.
                    </p>
                    <p>
                        Third, the specific <em>loot figures</em> — millions of dinars, thousands of
                        camel-loads — are Utbi&apos;s court-chronicler arithmetic and should be cited
                        with that qualifier. The fact of substantial looting is independently
                        corroborated (al-Biruni mentions it, Minhaj reports the gold and silver
                        carried back to Ghazni); the precise totals are not audit-grade.
                    </p>

                    <h2>The wider campaign</h2>
                    <p>
                        Somnath sits inside a longer arc. Mahmud&apos;s campaigns ran annually from
                        1001 to 1027, conducted from his capital at Ghazni in modern Afghanistan.
                        The standard targets were the wealthy Hindu temple-cities of north-western
                        India: Thanesar (1014), Mathura (1018), Kanauj (1018), Nagarkot (1009 and
                        1023), Kalanjar (1023), and the Multan campaigns through the 1010s. Each
                        campaign followed the same template: take the rampart, take the temple,
                        carry the wealth and the principal idol home to Ghazni, return the next year
                        for the next target.
                    </p>
                    <p>
                        The Lahore mint under Mahmud&apos;s authority struck silver and gold coins in
                        his seventh regnal year carrying the Arabic legend <em>but-shikan</em>,
                        &ldquo;breaker of idols,&rdquo; and <em>yamin-ud-daulah</em>, &ldquo;the
                        right hand of the dominion.&rdquo; The numismatic evidence — preserved in the
                        British Museum and the Lahore Museum, catalogued in C. E. Bosworth&apos;s{" "}
                        <em>The Ghaznavids</em> (1963) — is a self-applied contemporaneous title,
                        not a retrospective hostile label. The destroyer named the policy on his own
                        coins.
                    </p>

                    <h2>What this case anchors</h2>
                    <p>
                        Of the documented medieval temple destructions, Somnath 1026 is the case
                        with the deepest evidentiary base: a court chronicler writing within a
                        decade, an independent scientific eyewitness in al-Biruni, a 13th-century
                        confirmation by Minhaj, a 13th-century Arabic universal history confirming
                        the chronology, the destroyer&apos;s own numismatic self-description, and a
                        physical continuity at the site through six or more rebuilds across nine
                        centuries. The case does not need rhetorical inflation. The Persian
                        chronicles, on their own terms, are damning enough.
                    </p>
                    <p>
                        For a broader survey of the period and the destroyer, see{" "}
                        <Link href="/mahmud-of-ghazni-temples-destroyed">
                            Mahmud of Ghazni&apos;s Temple Destructions
                        </Link>{" "}
                        and the parent hub{" "}
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
