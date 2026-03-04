import { Metadata } from "next";
import { getArticleBySlug } from "@/data/articles";
import { ArticleLayout } from "@/components/ArticleLayout";

const meta = getArticleBySlug("what-is-vedanta")!;

export const metadata: Metadata = {
    title: `${meta.title} | Sadhaka`,
    description: meta.metaDescription,
    alternates: { canonical: `https://opensadhaka.com${meta.route}` },
    openGraph: { title: meta.title, description: meta.metaDescription },
};

export default function WhatIsVedantaPage() {
    return (
        <ArticleLayout meta={meta} pillarLabel="Ancient Wisdom" pillarHref="/ancient-wisdom-philosophies">
            <p>
                There is a question that surfaces in every spiritually curious person at some point: <em>Is there something real beneath all this noise — beneath the ambitions, the grief, the fleeting pleasures and fears that make up ordinary life?</em> Vedanta is the tradition that takes this question with absolute seriousness.
            </p>
            <p>
                The word itself is a compound: <strong>Veda</strong> (knowledge) + <strong>Anta</strong> (end, conclusion). Vedanta is literally "the culmination of knowledge" — the philosophical crown of the vast Vedic tradition. It refers primarily to the <em>Upanishads</em>, the innermost teachings at the end of the Vedas, and to the school of thought that systematized and developed those insights over 2,000+ years.
            </p>

            <h2>What Problem Does Vedanta Solve?</h2>
            <p>
                Before grasping Vedanta's answers, you need to understand what problem it is addressing. The Vedantic diagnosis of the human condition is precise: we suffer because we are confused about who we are.
            </p>
            <p>
                Specifically, we mistake the body-mind complex — the personality, the history, the accumulation of memories and desires — for our true self. This fundamental misidentification (called <strong>Avidya</strong>, or ignorance) is the root of all fear, craving, and suffering. We protect the ego because we think it is us. We fear death because we identify with what will die.
            </p>
            <p>
                Vedanta's response: <em>What if you are not what you think you are?</em> What if beneath the personality is something unchanging, undying, and completely free?
            </p>

            <h2>The Three Core Texts (Prasthanatrayi)</h2>
            <p>All three schools of Vedanta ground their arguments in three canonical texts:</p>
            <ul>
                <li><strong>The Upanishads</strong> — 108 philosophical dialogues between sages and students, many dating to 800–200 BCE. These are the primary source. The core teaching: "Tat Tvam Asi" — That Thou Art.</li>
                <li><strong>The Bhagavad Gita</strong> — 700 verses from the Mahabharata in which Krishna instructs Arjuna on the battlefield. A practical manual on how to live Vedanta.</li>
                <li><strong>The Brahma Sutras</strong> — 555 aphorisms by Badarayana, systematizing the Upanishadic teachings into a logical sequence. Every Vedanta teacher writes a commentary on these.</li>
            </ul>

            <h2>The Three Schools of Vedanta</h2>
            <p>
                Vedanta is not a single doctrine but a family of philosophical positions that share the same source texts but reach dramatically different conclusions about the relationship between the individual soul, the world, and ultimate reality.
            </p>

            <h3>1. Advaita Vedanta — Non-Dualism (Adi Shankaracharya, 8th c.)</h3>
            <p>
                The most internationally known school. Its central claim: Brahman (infinite, pure consciousness) is the only reality. The individual soul (Atman) is not separate from Brahman — it appears separate the way waves appear separate from the ocean. Remove the wave's name and form, and there is only water. Remove your personality, and there is only consciousness.
            </p>
            <p>
                The world's apparent multiplicity? That is <strong>Maya</strong> — not "illusion" in the sense of nonexistence, but superimposition. We see the world the way a person in dim light sees a snake on what is actually a rope. Liberation in Advaita is the direct recognition: <em>Aham Brahmasmi</em> — I am Brahman.
            </p>

            <h3>2. Dvaita Vedanta — Dualism (Madhvacharya, 13th c.)</h3>
            <p>
                Madhvacharya's counter-tradition. His position: God (Vishnu) and the individual soul are eternally distinct. They can never merge. Liberation is not the dissolution of the self into the Divine — it is the eternal joyful relationship between a devotee soul and a personal God. This view underpins much of Bhakti devotionalism.
            </p>

            <h3>3. Vishishtadvaita — Qualified Non-Dualism (Ramanujacharya, 11th c.)</h3>
            <p>
                The middle position. Brahman is ultimately one — but this oneness is not simple. Souls and the material world are real, but they constitute Brahman's "body." Like how cells are real within a body but inseparable from it. Liberation is eternal blissful relationship with God, where the soul retains its distinct identity.
            </p>

            <h2>The Four Mahavakyas (Great Sayings)</h2>
            <p>The Upanishads are distilled in four declarations, one from each of the four Vedas:</p>
            <ul>
                <li><strong>Prajnanam Brahma</strong> — "Consciousness is Brahman" (Aitareya Upanishad, Rig Veda)</li>
                <li><strong>Aham Brahmasmi</strong> — "I am Brahman" (Brihadaranyaka Upanishad, Yajur Veda)</li>
                <li><strong>Tat Tvam Asi</strong> — "That Thou Art" (Chandogya Upanishad, Sama Veda)</li>
                <li><strong>Ayam Atma Brahma</strong> — "This Self is Brahman" (Mandukya Upanishad, Atharva Veda)</li>
            </ul>
            <p>
                These are not merely philosophical propositions — they are contemplative seeds. A student is given a Mahavakya and asked to meditate on it until it is a living reality, not a mental concept.
            </p>

            <h2>The Practice: How Does One "Do" Vedanta?</h2>
            <p>
                Vedanta is not purely abstract philosophy. It prescribes specific preparation and practice. Adi Shankaracharya outlined four qualifications (Sadhana Chatustaya) for a Vedantic student:
            </p>
            <ul>
                <li><strong>Viveka</strong> — Discrimination between the real (Brahman) and the unreal (everything temporary)</li>
                <li><strong>Vairagya</strong> — Dispassion toward temporary pleasures, here and hereafter</li>
                <li><strong>Shatsampat</strong> — Six virtues: mental calmness (Shama), sense control (Dama), withdrawal (Uparati), endurance (Titiksha), faith (Shraddha), and meditative concentration (Samadhana)</li>
                <li><strong>Mumukshutva</strong> — Burning desire for liberation</li>
            </ul>
            <p>
                The primary practice is <strong>Shravana</strong> (listening to scripture from a qualified teacher), <strong>Manana</strong> (reflecting deeply until no doubts remain), and <strong>Nididhyasana</strong> (meditation on the truth until it becomes direct experience).
            </p>

            <h2>Vedanta in Modern Life</h2>
            <p>
                Swami Vivekananda's lectures at the Parliament of World Religions in 1893 introduced Vedanta to the West. His message: Vedanta is not the property of any religion — it is a universal science of consciousness. The Atman in you is the same as the Atman in the stranger you pass on the street. Prejudice, cruelty, and exploitation are philosophically unjustifiable once this is truly understood.
            </p>
            <p>
                Practically, Vedanta offers a framework that reduces the existential anxiety of modern life. If your fundamental nature is not the body (which will die), not the career (which will end), not the relationships (which will change), then none of those can threaten what you really are. This is not escapism — it is the deepest source of equanimity.
            </p>
        </ArticleLayout>
    );
}
