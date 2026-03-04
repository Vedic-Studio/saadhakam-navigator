import { Metadata } from "next";
import { getArticleBySlug } from "@/data/articles";
import { ArticleLayout } from "@/components/ArticleLayout";

const meta = getArticleBySlug("how-to-start-japa")!;

export const metadata: Metadata = {
    title: `${meta.title} | Sadhaka`,
    description: meta.metaDescription,
    alternates: { canonical: `https://opensadhaka.com${meta.route}` },
    openGraph: { title: meta.title, description: meta.metaDescription },
};

export default function HowToStartJapaPage() {
    return (
        <ArticleLayout meta={meta} pillarLabel="Practical Practices" pillarHref="/practical-spiritual-practices">
            <p>
                The mind is never still. Even when the body rests, the mind generates an unbroken stream of thoughts — plans, memories, worries, fragments of conversation. Most meditation instruction tells you to "quiet the mind," which to a beginner feels like being told to stop the ocean.
            </p>
            <p>
                Japa solves this problem elegantly. Instead of fighting the mind's tendency to cling to something, Japa gives it something sacred to cling to. You don't silence the mind by force — you redirect it like a river into a new channel. Over time, that channel becomes deep, clear, and naturally flowing.
            </p>
            <p>
                The Bhagavad Gita's 10th chapter (verse 25) has Krishna say: <em>"Among sacrifices, I am Japa."</em> Among all spiritual offerings, the repetition of the Divine name holds the highest place. This is not metaphor — it is the experiential finding of centuries of practitioners.
            </p>

            <h2>What is Japa?</h2>
            <p>
                <strong>Japa</strong> (Sanskrit: जप) comes from the root <em>jap</em>, meaning "to utter in a low voice" or "to mutter." It is the practice of repeating a mantra — a sacred syllable, name, or phrase — with full attention, either audibly, as a whisper, or silently in the mind.
            </p>
            <p>
                Japa is not mere repetition in the mechanical sense. Done correctly, each repetition is an act of attention — a return of the mind to the sacred. When the mind wanders (and it will), you notice, and return. This act of noticing-and-returning is itself the practice. Over thousands of repetitions, the mind develops a natural orientation toward the mantra, then toward the silence beneath the mantra.
            </p>

            <h2>The Four Forms of Japa</h2>
            <p>Traditional texts describe four types, from gross to subtle:</p>
            <ul>
                <li><strong>Vaikhari Japa</strong> — Audible chanting, lips moving, mantra fully vocalized. Best for beginners — the sound anchors the mind through multiple senses.</li>
                <li><strong>Upanshu Japa</strong> — Whispered, only the practitioner can hear it. More subtle than Vaikhari; recommended once audible chanting is established.</li>
                <li><strong>Manasika Japa</strong> — Purely mental repetition. No movement of lips. Considered the most powerful form, as it requires and develops the deepest concentration.</li>
                <li><strong>Likhita Japa</strong> — Writing the mantra. Highly recommended for beginners as it engages the hands and eyes alongside the mind, reducing distraction.</li>
            </ul>
            <p>
                The tradition is clear: Manasika Japa is 1,000 times more effective than audible chanting — but only if you have the concentration to sustain it. Start with Vaikhari. Graduate as your practice deepens.
            </p>

            <h2>Choosing Your Mantra</h2>
            <p>
                The mantra is the vehicle, and not all vehicles suit all temperament. General guidance:
            </p>
            <ul>
                <li><strong>Devotees of Shiva:</strong> Om Namah Shivaya (the Panchakshara mantra — five syllables that represent the five elements)</li>
                <li><strong>Devotees of Vishnu/Krishna:</strong> Om Namo Narayanaya, or the Hare Krishna Mahamantra</li>
                <li><strong>Universal (Jnana path):</strong> So'ham (I am That), Aham Brahmasmi, or the simple Pranava Om</li>
                <li><strong>Gayatri Mantra:</strong> The foundational Vedic mantra for all seekers of light and wisdom</li>
                <li><strong>Mahamrityunjaya:</strong> For healing, protection, and transcendence of fear</li>
            </ul>
            <p>
                Ideally, receive a mantra from a qualified teacher (Diksha, or initiation). The initiated mantra carries the energetic imprint of the lineage. But if no teacher is available, begin with Om or So'ham — these are universal and require no special initiation.
            </p>

            <h2>The Japa Mala: How to Use a Rosary</h2>
            <p>
                A <strong>Japa Mala</strong> (rosary) has 108 beads plus one larger "Meru" bead (the anchor). Hold the Mala in the right hand. Starting from the bead next to the Meru, use the thumb to move each bead toward you as you repeat one mantra per bead. When you reach the Meru again, do not cross it — reverse direction for the next round.
            </p>
            <p>
                <strong>Why 108?</strong> Numerous explanations exist: 108 Upanishads, 108 sacred sites in India, the ratio of the Sun's distance to its diameter, 1 (unity) × 0 (void) × 8 (infinity). The number itself has been consecrated by millennia of use.
            </p>
            <p>
                Traditional materials for Mala: Rudraksha (for Shiva devotees), Tulsi wood (for Vaishnava devotees), crystal or sandalwood (for all purposes). Do not wear a Japa Mala used in practice as jewelry — keep it clean and set apart from ordinary use.
            </p>

            <h2>When and How Long to Practice</h2>
            <p>
                <strong>Brahma Muhurta</strong> — the 96 minutes before sunrise — is the traditionally recommended time. The mind is naturally quiet before the day's activity has begun. Sattvic (pure, balanced) energy is at its peak.
            </p>
            <p>
                If Brahma Muhurta isn't possible, choose any fixed time each day. Consistency of time matters more than the hour itself. The mind begins to prepare itself for practice when the time approaches — like salivating before a meal.
            </p>
            <p>
                Duration: begin with one round of 108 repetitions (approximately 10–15 minutes for audible Japa). Build to three rounds. The classic prescription for establishing a practice is 40 consecutive days without a break.
            </p>

            <h2>Creating Your Practice Space</h2>
            <p>
                A dedicated space for Japa changes the quality dramatically. Even a small corner with a clean mat, a candle, and an image of your chosen deity creates a field of Sattva that supports practice. The body recognizes the space and begins to settle before you even sit down.
            </p>
            <ul>
                <li>Face East or North during practice (traditional orientations for morning worship)</li>
                <li>Sit with spine erect — not rigid, but alert. Slouching invites dullness.</li>
                <li>Close the eyes or keep them at half-mast, gaze cast slightly downward</li>
                <li>Keep the Mala at heart level, not swinging freely</li>
            </ul>

            <h2>What to Expect: The Stages of Japa</h2>
            <p>
                Week 1–2: The mind wanders constantly. This is normal. The practice is noticing and returning.
            </p>
            <p>
                Week 3–6: Attention improves. There are periods of genuine absorption. The mantra begins to arise spontaneously during daily activity.
            </p>
            <p>
                Month 2–3: The mantra becomes a background hum — a constant companion. Mental noise decreases. A quality of inner quiet enters daily life between practice sessions.
            </p>
            <p>
                Over time: The mantra transitions from effort to effortlessness. You don't chant the mantra — the mantra chants itself. At this point, Japa is transitioning into Dhyana (meditation) organically.
            </p>
        </ArticleLayout>
    );
}
