import { getArticleBySlug } from "@/data/articles";
import { ArticleLayout } from "@/components/ArticleLayout";
import { buildArticleMetadata } from "@/lib/seo";

const meta = getArticleBySlug("non-duality-vs-dualism")!;

export const metadata = buildArticleMetadata(meta);

export default function NonDualityVsDualismPage() {
    return (
        <ArticleLayout meta={meta} pillarLabel="Ancient Wisdom" pillarHref="/ancient-wisdom-philosophies">
            <p className="lead text-xl font-medium mb-8">
                The most important question you will ever ask is hidden inside your spiritual practice: <em>Are you trying to reach God, or are you trying to realize you never left?</em>
            </p>
            <p>
                This isn't an abstract curiosity. Your answer creates the fundamental "logic" of your path. It determines whether you pray to a beloved, inquire into a void, or serve a master. In Indian philosophy, this is the great fault line between <strong>Non-Duality (Advaita)</strong> and <strong>Dualism (Dvaita)</strong>.
            </p>

            <h2 className="text-3xl font-display font-bold mt-12 mb-6 text-primary">Advaita: The Logic of "Not-Two"</h2>
            <p>
                The Sanskrit term <strong>Advaita</strong> literally means "not-two." It doesn't say "one"—which would imply a countable thing—but "not-two," pointing to a reality prior to the very concept of number.
            </p>
            <p>
                Adi Shankaracharya's articulation is the definitive technical statement: Ultimate reality (Brahman) is singular, infinite consciousness. Everything else—the stars, your thoughts, this screen—is a superimposition. It is the appearance of many waves on a single, undivided ocean.
            </p>
            <p>
                In this framework, your individual self (Atman) is not separate from Brahman. This is not a poetic metaphor; it is a direct claim of identity. <em>Aham Brahmasmi</em>—I am Brahman. Suffering, then, is simply <strong>Avidya</strong>: the fundamental ignorance of your true nature. You don't need to "gain" liberation; you need to remove the misunderstanding that you are bound.
            </p>

            <h2 className="text-3xl font-display font-bold mt-12 mb-6 text-orange-500">Dvaita: The Geometry of Relationship</h2>
            <p>
                Madhvacharya (13th century) saw the non-dual claim as a destruction of love. His system, <strong>Dvaita</strong>, asserts that God (Vishnu) and individual souls are eternally, irreducibly distinct. They can never merge.
            </p>
            <p>
                He identified five fundamental distinctions (Panchabhedas) that are real and eternal:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                <li className="bg-muted/30 p-4 rounded-xl border border-white/5">God vs. Individual Soul</li>
                <li className="bg-muted/30 p-4 rounded-xl border border-white/5">God vs. Matter</li>
                <li className="bg-muted/30 p-4 rounded-xl border border-white/5">Soul vs. Matter</li>
                <li className="bg-muted/30 p-4 rounded-xl border border-white/5">Soul vs. Soul</li>
                <li className="bg-muted/30 p-4 rounded-xl border border-white/5">Matter vs. Matter</li>
            </ul>
            <p>
                For the Dualist, liberation (Mukti) is not dissolution into an absolute. It is the soul's awakening to its true nature as a blissful, dependent servant of the Divine. You remain yourself; you simply recognize your subordinate place in the cosmic hierarchy. This is the metaphysical engine of the <strong>Bhakti</strong> (devotional) traditions.
            </p>

            <h2 className="text-3xl font-display font-bold mt-12 mb-6">Vishishtadvaita: The Middle Path</h2>
            <p>
                Ramanujacharya (11th century) created a synthesis: <strong>Qualified Non-Dualism</strong>. He agreed that Brahman is the only reality, but insisted that Brahman has internal parts—namely, souls and the world.
            </p>
            <p>
                Think of the relationship between your body and your cells. Your cells are real and distinct from one another, yet they are not separate from "you." They inhere within you. Similarly, we are the "body" of God. We are distinct, but inseparable.
            </p>

            <h2 className="text-3xl font-display font-bold mt-12 mb-6">The Practice: Inquiry vs. Devotion</h2>
            <p>
                This isn't academic history; it's a diagnostic for your own temperament (Guna):
            </p>
            <div className="grid md:grid-cols-2 gap-8 my-12">
                <div className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <div className="w-2 h-8 bg-primary rounded-full"></div>
                        The Non-Dual Path
                    </h3>
                    <p className="text-muted-foreground">
                        You meditate to recognize what is already the case. Separation is a conceptual error. You use <strong>Jnana</strong> (inquiry) to see through the illusion of the "I".
                    </p>
                </div>
                <div className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <div className="w-2 h-8 bg-orange-500 rounded-full"></div>
                        The Dual Path
                    </h3>
                    <p className="text-muted-foreground">
                        You cultivate a relationship with a Personal God who is genuinely Other. You use <strong>Bhakti</strong> (devotion) to bridge the gap through love and surrender.
                    </p>
                </div>
            </div>

            <h2 className="text-3xl font-display font-bold mt-12 mb-6">The Synthesis</h2>
            <p>
                Is everything One, or is it Two? The tradition's most sophisticated answer is: <em>It depends on where you are standing.</em>
            </p>
            <p>
                Shankaracharya admitted that at the conventional (Vyavaharika) level, dualism is practically true. You must eat, you must act, and you should probably pray. But at the ultimate (Paramarthika) level, none of those distinctions hold.
            </p>
            <p>
                The Bhagavad Gita (12.2-5) suggests that while the path of the formless Absolute is the ultimate truth, the path of the personal God is more accessible for human beings. One is the destination; the other is the vehicle.
            </p>
            <div className="mt-16 p-8 bg-primary/5 border border-primary/20 rounded-3xl">
                <p className="text-lg leading-relaxed mb-0">
                    Which path makes your heart beat faster? Does the thought of "dissolving" into the Absolute feel like liberation, or like a loss of love? The answer to that question is more important than any philosophical system. It is the compass for your entire life's work.
                </p>
            </div>
        </ArticleLayout>
    );
}