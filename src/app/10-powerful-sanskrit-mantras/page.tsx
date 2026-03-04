import { Metadata } from "next";
import { getArticleBySlug } from "@/data/articles";
import { ArticleLayout } from "@/components/ArticleLayout";

const meta = getArticleBySlug("10-powerful-sanskrit-mantras")!;

export const metadata: Metadata = {
    title: `${meta.title} | Sadhaka`,
    description: meta.metaDescription,
    alternates: { canonical: `https://opensadhaka.com${meta.route}` },
    openGraph: { title: meta.title, description: meta.metaDescription },
};

export default function TenMantrasPage() {
    return (
        <ArticleLayout meta={meta} pillarLabel="Sacred Texts" pillarHref="/sacred-texts-teachings">
            <p>
                A mantra is more than a chant. In the Vedic understanding, specific Sanskrit syllables carry vibrational power (called <strong>Spanda</strong>) that operates both at the level of meaning and at the level of sound itself. The science of mantra is one of the oldest branches of Vedic knowledge — and one that requires no belief to begin. The effects are observable through practice.
            </p>
            <p>
                Below are 10 of the most powerful and widely used Sanskrit mantras, with their complete meanings, origins, and practical guidance.
            </p>

            <h2>1. Om (ॐ) — The Primordial Sound</h2>
            <p>
                <strong>Pronunciation:</strong> A-U-M (three sounds uniting into one resonance)<br />
                <strong>Origin:</strong> Mandukya Upanishad (entirely dedicated to Om), Vedas
            </p>
            <p>
                Om is the Pranava — the primordial vibration from which all creation is said to arise and into which it dissolves. It represents the four states of consciousness: A (waking), U (dreaming), M (deep sleep), and the silence that follows (Turiya — pure awareness).
            </p>
            <p>
                <strong>Practice:</strong> Chant Om slowly with long exhalation. Allow it to resonate in the chest and skull. Three to eleven repetitions before any other mantra is traditional. Chanted alone, it is a complete practice.
            </p>

            <h2>2. Om Namah Shivaya (नमः शिवाय) — Salutation to Shiva</h2>
            <p>
                <strong>Pronunciation:</strong> Om Na-mah Shi-vay-ya<br />
                <strong>Origin:</strong> Sri Rudram (Yajur Veda), Krishna Yajurveda
            </p>
            <p>
                The Panchakshara mantra — five sacred syllables (Na-Ma-Shi-Va-Ya) representing the five elements: earth, water, fire, air, and space. "Namah" means salutation or surrender; "Shivaya" to Shiva (the auspicious one, the Self).
            </p>
            <p>
                This mantra purifies the five elements in the body-mind system. It is one of the most universally chanted mantras in Shaivism and is appropriate for seekers of all paths.
            </p>

            <h2>3. Gayatri Mantra (गायत्री मन्त्र) — The Solar Invocation</h2>
            <p>
                <strong>Text:</strong> Om Bhur Bhuvaḥ Svaḥ / Tat Savitur Vareṇyam / Bhargo Devasya Dhīmahi / Dhiyo Yo Naḥ Prachodayāt<br />
                <strong>Origin:</strong> Rig Veda (3.62.10), Atharvaveda
            </p>
            <p>
                <strong>Meaning:</strong> "We meditate on the glorious light of the Divine Sun (Savitri); may it illuminate our intellects and guide our understanding."
            </p>
            <p>
                The Gayatri is considered the mother of all Vedic mantras — so sacred that it was traditionally initiated privately through the Upanayana (sacred thread) ceremony. A mantra for intelligence, clarity, and the illumination of consciousness.
            </p>

            <h2>4. Mahamrityunjaya Mantra — Victory Over Death</h2>
            <p>
                <strong>Text:</strong> Om Tryambakam Yajamahe / Sugandhim Pushtivardhanam / Urvaarukamiva Bandhanan / Mrityor Mukshiya Maamritat<br />
                <strong>Origin:</strong> Rig Veda (7.59.12), Yajur Veda
            </p>
            <p>
                <strong>Meaning:</strong> "We worship the three-eyed Lord Shiva who protects and nourishes all beings. May He liberate us from the clutches of death, as a ripe melon is freed from its vine — not denying immortality but granting liberation."
            </p>
            <p>
                This mantra is prescribed for healing, fear, and transcendence of death-consciousness. In India it is chanted for the ill, for the dying, and as a protective Kavach (armor). Profound for anyone working with fear or impermanence.
            </p>

            <h2>5. So'ham (सोऽहम्) — I Am That</h2>
            <p>
                <strong>Pronunciation:</strong> "So" on the inhale, "Hum" on the exhale<br />
                <strong>Origin:</strong> Hamsa Upanishad, Vedantic tradition
            </p>
            <p>
                So'ham means "I am That" — the spontaneous, rhythmic sound of the breath itself (So = inhalation, Ham = exhalation). This mantra is said to occur 21,600 times per day in every living being whether they know it or not. The practice is making it conscious.
            </p>
            <p>
                Perfect for the Jnana path — it is simultaneously a mantra and an inquiry into the nature of "I."
            </p>

            <h2>6. Om Namo Bhagavate Vasudevaya — Salutation to Vishnu/Krishna</h2>
            <p>
                <strong>Pronunciation:</strong> Om Na-mo Bha-ga-va-te Va-soo-de-va-ya<br />
                <strong>Origin:</strong> Bhagavata Purana, Vishnu Purana
            </p>
            <p>
                The Dvadasakshara mantra — twelve syllables. The principal mantra of Vaishnavas and Sri Vaishnavas. "Vasudeva" is one of Krishna's names (son of Vasudeva), and the name encodes the teaching that the Divine dwells in all beings.
            </p>
            <p>
                Chanted for liberation, with particular resonance for devotees on the Bhakti path.
            </p>

            <h2>7. Hare Krishna Mahamantra</h2>
            <p>
                <strong>Text:</strong> Hare Krishna Hare Krishna / Krishna Krishna Hare Hare / Hare Rama Hare Rama / Rama Rama Hare Hare<br />
                <strong>Origin:</strong> Kali-Santarana Upanishad
            </p>
            <p>
                The "great mantra" (Mahamantra) of the Gaudiya Vaishnava tradition, popularized globally by ISKCON. "Hare" invokes the divine energy (Hara, the divine feminine), Krishna is the supreme consciousness, Rama is the source of all joy.
            </p>
            <p>
                Widely used as Kirtan — devotional group chanting — and considered especially potent in the current age (Kali Yuga).
            </p>

            <h2>8. Aham Brahmasmi (अहम् ब्रह्मास्मि) — I Am Brahman</h2>
            <p>
                <strong>Origin:</strong> Brihadaranyaka Upanishad (1.4.10)<br />
                <strong>Tradition:</strong> Advaita Vedanta (Mahavakya)
            </p>
            <p>
                One of the four Mahavakyas (Great Sayings). Not chanted as a mantra in the Japa sense, but contemplated as a direct declaration of truth. "Aham" (I) + "Brahma" (ultimate reality) + "Asmi" (am). Used in self-inquiry to cut through identification with the body-mind.
            </p>

            <h2>9. Om Shanti Om (ॐ शान्तिः) — Peace</h2>
            <p>
                <strong>Text:</strong> Om Shanti Shanti Shanti<br />
                <strong>Origin:</strong> Vedic tradition, found in multiple Upanishads as their closing invocation
            </p>
            <p>
                Shanti means peace — peace at the body level, at the mind level, and at the spiritual level (the three repetitions represent these three domains). Most Vedic prayers and Upanishad recitations end with this triple peace invocation.
            </p>
            <p>
                Deeply calming for anxiety, transition, and grief. Can be chanted in any state, in any condition.
            </p>

            <h2>10. Guru Brahma Gurur Vishnu — Salutation to the Teacher</h2>
            <p>
                <strong>Text:</strong> Guru Brahma Gurur Vishnu / Guru Devo Maheshvaraḥ / Guru Sākṣāt Param Brahma / Tasmai Sri Gurave Namaḥ<br />
                <strong>Origin:</strong> Traditional Guruvandana (teacher salutation)
            </p>
            <p>
                <strong>Meaning:</strong> "The Guru is Brahma (the creator), Vishnu (the sustainer), and Maheshvara (Shiva, the destroyer). The Guru is the very Supreme Brahman. To such a Guru, I offer my salutations."
            </p>
            <p>
                Chanted before study, before receiving teaching, and as an invocation of the guru-disciple lineage. It reminds the student that all knowledge flows through the grace of the teacher — and that ultimately, the teacher and the Supreme are one.
            </p>

            <h2>How to Build a Mantra Practice</h2>
            <p>
                Choose one mantra. Commit to it for 40 days minimum. Use a Japa Mala (108-bead rosary). Practice at the same time each day — Brahma Muhurta (before sunrise) is ideal. Begin audibly, graduate to whisper, then to mental repetition as concentration deepens.
            </p>
            <p>
                The question is not which mantra is objectively "most powerful." The question is which mantra resonates with your temperament, your devotional orientation, and your current spiritual need. Start there.
            </p>
        </ArticleLayout>
    );
}
