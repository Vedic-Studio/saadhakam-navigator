import { getArticleBySlug } from "@/data/articles";
import { ArticleLayout } from "@/components/ArticleLayout";
import { buildArticleMetadata } from "@/lib/seo";

const meta = getArticleBySlug("shaivism-vs-vaishnavism")!;

export const metadata = buildArticleMetadata(meta);

export default function ShaivismVsVaishnavismPage() {
    return (
        <ArticleLayout meta={meta} pillarLabel="Spiritual Traditions" pillarHref="/spiritual-traditions-paths">
            <p>
                Within the vast ecosystem of Sanatan Dharma, two great streams have shaped the devotional landscape of India for over two millennia: the path of Shiva and the path of Vishnu. Together, their followers constitute the overwhelming majority of Hindu practitioners worldwide.
            </p>
            <p>
                These are not simply different preferences for different gods. They represent distinct cosmologies, distinct philosophies of liberation, distinct aesthetic and emotional modes of relating to the Divine — and, especially in South India, distinct philosophical schools with rigorous intellectual traditions. Understanding the difference is not merely academic: it is understanding how billions of people have organized their inner lives.
            </p>

            <h2>Shaivism: The Path of Shiva</h2>
            <p>
                <strong>Shaivism</strong> (Sanskrit: Shaiva, from Shiva) is the tradition that recognizes Shiva as the Supreme Being — not merely one deity among many, but the absolute, the cosmic consciousness itself. Its roots reach back to the Vedic Rudra, and it has evolved into an extraordinarily diverse family of traditions.
            </p>
            <p>
                Who is Shiva? At the mythological level: the great Yogi of the Himalayas, the cosmic dancer (Nataraja), the destroyer who clears the way for regeneration, the lord of time, the husband of Parvati. At the philosophical level: pure consciousness (Chit), the witness, the ground of all being, that which is uncreated and imperishable.
            </p>
            <p>
                The name itself: <em>Shiva</em> means "the auspicious one," or more etymologically, "the good" — related to the state of ultimate well-being that is liberation.
            </p>

            <h3>The Major Schools of Shaivism</h3>
            <ul>
                <li><strong>Shaiva Siddhanta</strong> — The dominant tradition of South India. Dualistic: God (Pati), souls (Pasus), and bonds (Pasas) are three distinct eternal realities. Liberation is the soul's recognition of its relationship with Shiva.</li>
                <li><strong>Kashmir Shaivism</strong> — The most philosophically sophisticated Shaiva school. Non-dual: Shiva is the one consciousness; everything is his Shakti (divine energy in play). The universe is Shiva's Lila in full recognizing himself. Liberation is recognition (Pratyabhijna) of one's own nature as Shiva.</li>
                <li><strong>Vira Shaivism / Lingayat</strong> — Reform tradition from Karnataka, founded by Basavanna (12th c.). Devotional, egalitarian, centered on wearing a personal Linga.</li>
                <li><strong>Nath Sampradaya</strong> — Emphasizes yogic practice, Kundalini, and the internal ascent through the chakras to Shiva-consciousness.</li>
            </ul>

            <h2>Vaishnavism: The Path of Vishnu</h2>
            <p>
                <strong>Vaishnavism</strong> (Sanskrit: Vaishnava, from Vishnu) takes Vishnu — and his avatars, especially Krishna and Rama — as the Supreme Being. It is numerically the largest Hindu denomination globally, represented in every major region of India and in Hindu diaspora communities worldwide.
            </p>
            <p>
                Who is Vishnu? At the mythological level: the preserver of cosmic order (Dharma), the one who incarnates whenever adharma prevails, the husband of Lakshmi. At the philosophical level in Vaishnavism: the personal Brahman — infinite, omniscient, supremely blissful, the source and sustainer of all existence.
            </p>

            <h3>The Major Schools of Vaishnavism</h3>
            <ul>
                <li><strong>Sri Vaishnavism</strong> (Ramanujacharya) — Vishishtadvaita philosophy. Vishnu/Narayana as the one qualified Brahman. Centered in South India, with the great Vaishnava temple traditions.</li>
                <li><strong>Madhva Sampradaya / Dvaita</strong> (Madhvacharya) — Strict dualism. Vishnu as eternally distinct from the soul and the world. Strong in Karnataka; ISKCON's Gaudiya Vaishnavism traces philosophical lineage to Madhva.</li>
                <li><strong>Gaudiya Vaishnavism</strong> (Chaitanya Mahaprabhu, 16th c.) — The tradition made globally famous by ISKCON. Krishna-centered, Achintya Bhedabheda (inconceivable difference-in-unity) philosophy. Emphasis on Bhakti (devotion) as both means and end.</li>
                <li><strong>Pushtimarga</strong> (Vallabhacharya) — Pure grace-focused, Shuddhadvaita philosophy, centered on Krishna of Vrindavan.</li>
            </ul>

            <h2>Key Philosophical Differences</h2>

            <h3>View of the Self</h3>
            <p>
                Most Shaiva schools (especially Kashmir) tend toward non-dual or near-non-dual positions: the individual self is ultimately identical to or inseparable from Shiva-consciousness. Most Vaishnava schools maintain a real distinction between the individual soul and God — liberation is about relationship, not merger.
            </p>

            <h3>View of Liberation</h3>
            <p>
                In the dominant Shaiva traditions: liberation (Mukti or Moksha) is the recognition that one's nature is already Shiva. Nothing is added, nothing is achieved — the veil of ignorance lifts. In most Vaishnava traditions: liberation is the soul's arrival in the direct presence of Vishnu, in a state of eternal bliss. The soul retains its identity but experiences God directly.
            </p>

            <h3>Role of Devotion</h3>
            <p>
                Both traditions are deeply devotional. But in Vaishnavism, Bhakti (devotion) is the path itself — the direct means of liberation. In many Shaiva traditions, especially Kashmir Shaivism, Bhakti is important but is ultimately subsumed into Jnana (knowledge/recognition) as the final step.
            </p>

            <h2>Historical Relations: Conflict and Synthesis</h2>
            <p>
                The two traditions have had a complicated historical relationship. Medieval India saw real sectarian tensions — Shaiva and Vaishnava kings favoring their traditions at the expense of the other, with occasional episodes of genuine conflict.
            </p>
            <p>
                The most enduring synthesis was Shankaracharya's <strong>Shanmata</strong> system: the recognition of Shiva, Vishnu, Devi, Ganesha, Surya, and Skanda as equal manifestations of one Supreme. The Smarta tradition that follows this framework allows both Shiva and Vishnu to be worshipped as the Supreme by practitioners of different temperaments — a theological ecumenism that has made Smartism the most eclectic of Indonesia's four major Hindu denominations.
            </p>
            <p>
                The Harihara form — literally half-Shiva (with Shiva's matted locks) and half-Vishnu (with Vishnu's crown) — has been worshipped for centuries as a declaration that the sectarian boundary is conventional, not ultimate.
            </p>

            <h2>Which Path is Right for You?</h2>
            <p>
                The question is one of temperament, not correctness:
            </p>
            <p>
                <strong>Shaiva tendencies:</strong> Drawn to silence, dissolution, the mystical, yogic practice, asceticism, the image of the meditating sage. Comfortable with the dissolution of the ego-sense as liberation. Value investigation and direct experience over scripture and relationship.
            </p>
            <p>
                <strong>Vaishnava tendencies:</strong> Drawn to devotional love, service, the personal relationship with God, the image of the devoted servant or lover. More comfortable maintaining the lover-beloved distinction as eternally fruitful. Value scripture, community (Satsanga), and surrender over solitary inquiry.
            </p>
            <p>
                The 5-minute Faith Finder quiz can help you identify your natural spiritual temperament and which tradition's practices are likely to resonate most strongly with you.
            </p>
        </ArticleLayout>
    );
}