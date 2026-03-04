import { Metadata } from "next";
import { getArticleBySlug } from "@/data/articles";
import { ArticleLayout } from "@/components/ArticleLayout";

const meta = getArticleBySlug("advaita-vedanta-explained")!;

export const metadata: Metadata = {
    title: `${meta.title} | Sadhaka`,
    description: meta.metaDescription,
    alternates: { canonical: `https://opensadhaka.com${meta.route}` },
    openGraph: { title: meta.title, description: meta.metaDescription },
};

export default function AdvaitaVedantaPage() {
    return (
        <ArticleLayout meta={meta} pillarLabel="Ancient Wisdom" pillarHref="/ancient-wisdom-philosophies">
            <p>
                Imagine discovering that the boundary between yourself and everything else is not a wall — it is a thought. A deeply conditioned, thoroughly believed, entirely convincing thought. But a thought nonetheless. This is the central claim of Advaita Vedanta, and it changes everything.
            </p>
            <p>
                The word <strong>Advaita</strong> (Sanskrit: अद्वैत) means "not-two." It is the philosophical and spiritual tradition systematized by Adi Shankaracharya in 8th-century India — and it remains the most internationally influential school of Indian philosophy. Figures from Ramana Maharshi to Swami Vivekananda to Alan Watts have drawn from its well.
            </p>

            <h2>The Central Claim</h2>
            <p>
                Reality — what truly is — is singular. Not "one thing among many things," but the very ground of being from which all apparent multiplicity arises. This ultimate reality, Advaita calls <strong>Brahman</strong>: infinity, pure consciousness, the screen on which all experience appears.
            </p>
            <p>
                Your innermost self — the witness at the core of every experience, the awareness that never changes even as thoughts, emotions, and sensations constantly change — is not separate from Brahman. This is what the Upanishad means when it says: <em>Aham Brahmasmi</em> — "I am Brahman." Not the personality. Not the body. The pure awareness beneath.
            </p>
            <p>
                If this is true, then the separation you feel — the isolation, the existential loneliness, the sense of being a small vulnerable self in a vast indifferent universe — is based on a fundamental misidentification. You have confused the wave for the ocean.
            </p>

            <h2>Maya: What Advaita Actually Means by "Illusion"</h2>
            <p>
                The word that trips up Western readers most is <strong>Maya</strong>, usually translated as "illusion." The immediate reaction: "If the world is illusion, should I ignore suffering? Stop paying bills?"
            </p>
            <p>
                This is a translation problem. Maya does not mean the world doesn't exist. It means the world is <em>not what you think it is</em>. The Advaita example: a rope in dim light appears to be a snake. The fear the snake causes is real. Your heartbeat is real. The snake is not. But the rope is completely real — you just misidentified it.
            </p>
            <p>
                Applied to existence: the world is real (it is Brahman), but your interpretation of it — as fundamentally material, as composed of genuinely separate objects, as the ultimate reality — is the error. You are seeing Brahman and calling it "mere matter."
            </p>
            <p>
                Maya has two powers: <strong>Avarana Shakti</strong> (the power to conceal Brahman's true nature from us) and <strong>Vikshepa Shakti</strong> (the power to project a false appearance onto Brahman). Liberation comes when Avarana is removed — when the concealment lifts and you see the rope for what it is.
            </p>

            <h2>Shankaracharya: The Philosopher Who Shaped a Continent</h2>
            <p>
                Adi Shankaracharya (788–820 CE) is one of the most formidable intellectual figures in world history. Mastering the four Vedas by age 8. Taking sannyasa (renunciation) at 12. Traversing the entire Indian subcontinent on foot, debating scholars of every school. Establishing four monastic centers (Mathas) that continue to this day. Composing philosophical masterworks at an age when most scholars are still in training. He died at 32.
            </p>
            <p>
                His commentaries on the Upanishads, Bhagavad Gita, and Brahma Sutras remain definitive after 1,200 years. His independent texts — Vivekachudamani (The Crest Jewel of Discrimination), Upadeshasahasri, Atma Bodha — are still assigned in Sanskrit philosophy programs.
            </p>
            <p>
                Shankaracharya's achievement was not the invention of Advaita — its roots are in the Upanishads themselves, which long predate him — but its systematization into a coherent philosophy that could withstand any logical challenge.
            </p>

            <h2>The Two Levels of Reality</h2>
            <p>
                Advaita operates with two tiers of reality, which is why "the world is illusion" is a misreading:
            </p>
            <ul>
                <li><strong>Paramarthika Satta</strong> (Absolute Reality) — Brahman alone. Non-dual, changeless, infinite. Only Brahman is ultimately real.</li>
                <li><strong>Vyavaharika Satta</strong> (Conventional Reality) — The world of everyday experience. Tables, trees, people, cause and effect. Real within its own domain, like a dream is real within the dream.</li>
            </ul>
            <p>
                The Advaitic sage does not walk through walls or ignore human suffering. They function completely in the conventional realm — they eat, speak, relate, die. But they are not fooled by it into thinking it is the final word on reality.
            </p>

            <h2>The Practice: Atma Vichara (Self-Inquiry)</h2>
            <p>
                Ramana Maharshi (1879–1950), the greatest modern exemplar of Advaita, gave a remarkably simple method: <strong>Atma Vichara</strong>, or Self-Inquiry. Not years of complex ritual or physical austerity — just one question, held with total sincerity:
            </p>
            <p><em>Who am I?</em></p>
            <p>
                Not as a conceptual puzzle to be solved by the mind — but as a direct investigation. Every time a thought arises, ask: to whom does this thought arise? I am anxious. Who is this "I" that is anxious? Trace the sense of "I" back to its source. What you find — the tradition insists — is not a fixed self, but open, transparent awareness.
            </p>
            <p>
                Shankaracharya's preparation for this inquiry requires four qualities: Viveka (discriminating between real and unreal), Vairagya (dispassion toward impermanent things), Shatsampat (six virtues including equanimity and faith), and Mumukshutva (intense longing for liberation).
            </p>

            <h2>Why Advaita Speaks to the Western Mind</h2>
            <p>
                Modern physics points to a universe where solid objects, at the quantum level, are fields of probability. Neuroscience tells us the unified, stable self we experience is a construction. Cognitive science reveals that perception is an active interpretation, not a passive recording.
            </p>
            <p>
                Advaita arrived at similar conclusions millennia earlier — through philosophical investigation and meditative direct experience rather than laboratory instruments. This convergence is why Schopenhauer studied the Upanishads with reverence, why physicists like Erwin Schrödinger wrote about Vedanta, and why those in contemplative practice often find Advaita the most precise map of their inner experience.
            </p>
            <p>
                The practical benefit: when you understand that your fundamental nature is not under threat — that what you truly are cannot be damaged by failure, loss, or death — existential anxiety loses its grip. Not through denial, but through recognition.
            </p>

            <h2>Advaita vs Other Schools</h2>
            <p>
                Advaita is not the only Vedanta school. Madhvacharya's Dvaita (Dualism) argues that God and soul are eternally distinct — a position that inspires deep devotional Bhakti. Ramanujacharya's Vishishtadvaita holds that souls and world are real parts of Brahman's "body," dissolving Advaita's critique of devotion.
            </p>
            <p>
                These are not mere academic disputes. Your natural temperament — philosophical-investigative vs. devotional-relational — will determine which school resonates. A Jnani arrives at liberation through the fire of inquiry. A Bhakta arrives through the ocean of surrendered love. The Gita says both paths arrive at the same summit.
            </p>
        </ArticleLayout>
    );
}
