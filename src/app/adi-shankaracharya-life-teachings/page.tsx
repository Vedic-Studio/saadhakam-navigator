import { Metadata } from "next";
import { getArticleBySlug } from "@/data/articles";
import { ArticleLayout } from "@/components/ArticleLayout";

const meta = getArticleBySlug("adi-shankaracharya-life-teachings")!;

export const metadata: Metadata = {
    title: `${meta.title} | Sadhaka`,
    description: meta.metaDescription,
    alternates: { canonical: `https://opensadhaka.com${meta.route}` },
    openGraph: { title: meta.title, description: meta.metaDescription },
};

export default function AdiShankaracharyaPage() {
    return (
        <ArticleLayout meta={meta} pillarLabel="Ancient Wisdom" pillarHref="/ancient-wisdom-philosophies">
            <p>
                History produces teachers. Rarely, it produces teachers who reshape the entire intellectual topology of a civilization. Adi Shankaracharya is one of those rare cases — a philosopher who, in a life of just 32 years, walked the length of the Indian subcontinent on foot, debated the greatest scholars of every school, wrote philosophical commentaries that remain definitive after 1,200 years, established four monastic centers that still operate today, and synthesized a fragmented religious landscape into a coherent framework.
            </p>
            <p>
                Understanding Shankaracharya is understanding the philosophical spine of Hindu thought. There is almost no concept in contemporary Vedanta, yoga philosophy, or Hindu metaphysics that does not either originate with him or pass through his framework.
            </p>

            <h2>Life: The Remarkable Biography</h2>
            <p>
                Born in Kalady (present-day Kerala), traditional biographies place his lifespan at 788–820 CE. The details, while filtered through later hagiography, point consistently to a singular prodigy: mastery of the four Vedas by age 8, formal renunciation (Sannyasa) at 12 after his mother finally relented, and commencement of his philosophical mission before most people complete primary education.
            </p>
            <p>
                He became a disciple of Govindapada at the banks of the Narmada, who initiated him into the lineage of Gaudapada — the author of the Mandukya Karika (the earliest systematic Advaita text). From this foundation, Shankaracharya embarked on his extraordinary career.
            </p>

            <h2>The Digvijaya: Philosophical Conquest of India</h2>
            <p>
                The <strong>Digvijaya</strong> (conquest of all directions) refers to Shankaracharya's systematic tour of India, during which he publicly debated scholars of every competing school: Mimamsakas (who held that Vedic ritual was the ultimate reality), Purvapakshins of various schools, Shaiva Siddhantins, Jains, Buddhists, and materialists.
            </p>
            <p>
                The most famous debate: his encounter with Mandana Misra, a leading Mimamsaka philosopher. The debate lasted weeks, with Mandana's own wife Ubhaya Bharati serving as judge. Shankaracharya won — and Mandana Misra became his disciple, known thereafter as Sureshvaracharya.
            </p>
            <p>
                At Sringeri in Karnataka, at the Kamakshi temple in Kanchipuram, at Puri in Odisha, at the Sharada Peeth in Kashmir — Shankaracharya debated and established his philosophical position as the leading systematic school of Vedantic thought.
            </p>

            <h2>The Four Mathas: An Institutional Legacy Unmatched</h2>
            <p>
                Perhaps Shankaracharya's most durable contribution was institutional: four monastic centers (Mathas) established at India's four cardinal points, each charged with preserving one of the four Vedas and one of the four Mahavakyas:
            </p>
            <ul>
                <li><strong>Sringeri Sharada Peetham</strong> (Karnataka, South) — Yajur Veda, Mahavakya: Aham Brahmasmi</li>
                <li><strong>Govardhan Matha</strong> (Puri, East) — Rig Veda, Mahavakya: Prajnanam Brahma</li>
                <li><strong>Kalika Matha</strong> (Dwaraka, West) — Sama Veda, Mahavakya: Tat Tvam Asi</li>
                <li><strong>Jyotirmath</strong> (Badrinath, North) — Atharva Veda, Mahavakya: Ayam Atma Brahma</li>
            </ul>
            <p>
                Each is headed by a Shankaracharya — a title now indicating a successor in the lineage. This unbroken institutional tradition spanning 1,200 years is extraordinary in world history.
            </p>

            <h2>The Philosophical Works</h2>
            <p>
                Shankaracharya's literary output, given his lifespan, is staggering. It falls into two categories:
            </p>
            <p>
                <strong>Commentaries (Bhasyas):</strong> Authoritative commentaries on all 10 principal Upanishads, the Bhagavad Gita (still the most studied Gita commentary in the Advaita tradition), and the Brahma Sutras. These commentaries establish his school's Advaitic interpretation of all three texts of the Prasthanatrayi.
            </p>
            <p>
                <strong>Independent Works (Prakarana Granthas):</strong>
            </p>
            <ul>
                <li><strong>Vivekachudamani</strong> (The Crest Jewel of Discrimination) — 580 verses on the discrimination between the real and unreal, the path to self-knowledge. Still used as a primary text.</li>
                <li><strong>Upadeshasahasri</strong> (A Thousand Teachings) — systematic exposition of Advaita teaching methodology.</li>
                <li><strong>Atma Bodha</strong> — 68 verses on self-knowledge, accessible and direct.</li>
                <li><strong>Bhaja Govindam</strong> — a devotional poem rebuking attachment through biting wit. "Worship Govinda, O fool — at the time of death, grammatical rules will not save you."</li>
            </ul>

            <h2>The Shanmata: Unifying Hindu Worship</h2>
            <p>
                By Shankaracharya's time, various Hindu sects were in significant tension — each claiming supremacy for their deity. Shankaracharya's response was the <strong>Shanmata</strong> system: the recognition of six deities (Shiva, Vishnu, Devi, Ganesha, Surya, Skanda) as equal manifestations of the one underlying Brahman.
            </p>
            <p>
                The <strong>Smarta</strong> tradition — which follows this framework — treats all six as legitimate worship objects for practitioners of different temperaments, while maintaining that all are ultimately Brahman. This was a unifying theological move of enormous sophistication and practical importance.
            </p>

            <h2>Shankaracharya's Legacy Today</h2>
            <p>
                Ramana Maharshi — considered by many the greatest modern sage of Advaita — worked entirely within Shankaracharya's framework. His method of Atma Vichara (self-inquiry) is Shankaracharya's nididhyasana taken to its essential core.
            </p>
            <p>
                Swami Vivekananda, who introduced Vedanta to the Western world at the 1893 Parliament of World Religions, was a direct disciple of Ramakrishna — himself a devotee of the Advaita tradition.
            </p>
            <p>
                Contemporary teachers from Swami Chinmayananda to Swami Dayananda (Arsha Vidya) all teach within the tradition Shankaracharya systematized. His Vivekachudamani is still assigned as a primary text.
            </p>
            <p>
                The fact that his four Mathas still function, that his commentaries are still the primary academic texts, that his philosophical framework is still the dominant school of Hindu thought — all of this, 1,200 years after his death at 32, is the measure of the man.
            </p>
        </ArticleLayout>
    );
}
