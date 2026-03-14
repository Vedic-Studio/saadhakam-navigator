import { ArrowRight } from "lucide-react";
import { getArticleBySlug } from "@/data/articles";
import { ArticleLayout } from "@/components/ArticleLayout";
import { TrackedLink } from "@/components/ContentAnalytics";
import { buildArticleMetadata } from "@/lib/seo";

const meta = getArticleBySlug("non-duality-vs-dualism")!;

export const metadata = buildArticleMetadata(meta);

function ArticleLink({ href, children, eventLabel }: { href: string; children: React.ReactNode; eventLabel: string }) {
    return (
        <TrackedLink
            href={href}
            eventLabel={eventLabel}
            trackPathName="ancient-wisdom"
            className="inline-flex items-center gap-2 font-semibold text-orange-400 transition-colors hover:text-orange-300"
        >
            {children}
            <ArrowRight className="h-4 w-4" />
        </TrackedLink>
    );
}

export default function NonDualityVsDualismPage() {
    return (
        <ArticleLayout meta={meta} pillarLabel="Ancient Wisdom" pillarHref="/ancient-wisdom-philosophies">
            <p>
                Advaita and Dvaita Vedanta are rival readings of the same scriptural canon — the Upanishads, Bhagavad Gita, and Brahma Sutras. Shankara's Advaita holds that Brahman alone is ultimately real, and apparent difference between individual self and God is produced by ignorance. Madhva's Dvaita holds that God, souls, and world are genuinely distinct at every level, including liberation. This is not a metaphysical preference. It changes what devotion means, what liberation is, and what the tradition counts as the highest spiritual attainment.
            </p>
            <p>
                Western monism and dualism can help at the level of orientation, but they miss the soteriological stakes. Shankara is not merely saying that everything is one substance. Madhva is not merely defending metaphysical pluralism. Each is offering an account of what the self is, what God is, and what spiritual realization can and cannot mean.
            </p>
            <p>
                That is why the comparison must begin by loosening the imported categories. Non-duality and dualism in India operate inside scriptural commentary, devotional practice, and liberation doctrine. They are lived philosophies, not only speculative positions.
            </p>

            <h2>What Western definitions usually mean</h2>
            <p>
                In standard Western philosophy, monism usually means that reality is fundamentally one, whether as one substance, one absolute, or one underlying principle. Dualism usually means that reality contains two irreducible kinds, as in mind and matter or creator and creation. These categories are legitimate within their own history.
            </p>
            <p>
                They become misleading when moved too quickly into Indian thought. A Western reader may hear Advaita and think of Spinoza, or hear dualism and think of Descartes. Those analogies can be useful at the outer edge, but they immediately leave out scriptural authority, liberation, the role of ignorance, and the devotional grammar of the traditions being compared.
            </p>
            <p>
                So the first correction is procedural. Use Western labels cautiously. They indicate shape, not full meaning.
            </p>

            <div className="article-callout" data-tone="insight">
                <div className="article-callout-title">Definition box</div>
                <p>
                    <strong>Advaita</strong> means not-two and in Shankara's school indicates the non-dual reality of Brahman. <strong>Dvaita</strong> means duality and in Madhva's Vedanta indicates real distinction between God, souls, and world. These are doctrinal systems, not bare numerical claims.
                </p>
            </div>

            <h2>What Advaita actually claims</h2>
            <p>
                Advaita Vedanta, especially in Shankara's commentaries on the Upanishads, Bhagavad Gita, and Brahma Sutras, holds that Brahman alone is ultimately real. The apparent distinction between individual self and Brahman is due to ignorance, <em>avidyā</em>, and superimposition, <em>adhyāsa</em>. Liberation, <em>mokṣa</em>, is not becoming something new but recognizing what was always the case.
            </p>
            <p>
                That claim depends on a layered account of reality. At the transactional level, <em>vyavahārika</em>, ethics, action, worship, and difference all operate. At the absolute level, <em>pāramārthika</em>, Brahman alone is final. This is why Advaita can sustain both rigorous metaphysics and practical life without collapsing into nihilism.
            </p>
            <p>
                The classic Upanishadic declarations matter here. "Tat Tvam Asi" from the <em>Chāndogya Upaniṣad</em> and "Aham Brahmāsmi" from the <em>Bṛhadāraṇyaka Upaniṣad</em> are read as identity statements, not poetic approximations. Shankara's entire system is built around defending this reading. The Mandukya Upanishad's description of Turiya, the fourth state beyond waking, dream, and deep sleep, gives the Advaitic absolute its clearest characterization: <em>na antaḥ-prajñam na bahiṣ-prajñam nobhayataḥ-prajñam</em> — "not inward-knowing, not outward-knowing, not both." The negations are not agnosticism. They define by subtraction what no positive description can exhaust.
            </p>
            <p>
                If you need the full Advaitic architecture, continue into <ArticleLink href="/advaita-vedanta-explained" eventLabel="non-duality:body:advaita">Advaita Vedanta Explained</ArticleLink> and <ArticleLink href="/what-is-brahman" eventLabel="non-duality:body:brahman">What is Brahman</ArticleLink>. Without those concepts, non-duality is too easily reduced to vague oneness talk.
            </p>

            <h2>What Dvaita actually claims through Madhva</h2>
            <p>
                Madhva's Dvaita Vedanta is not a generic assertion that there are many things. It is a specific theological and metaphysical claim that Vishnu is supreme, individual souls are real, the world is real, and their distinctions are real. Madhva famously teaches five real differences, the <em>pañca-bheda</em>, between God and soul, God and matter, soul and soul, soul and matter, and one material entity and another.
            </p>
            <p>
                This means liberation never becomes identity with God in the Advaitic sense. The soul stays distinct even in liberation. Devotion is therefore not a provisional aid later dissolved into non-dual realization. It is structurally final because the relation to God is eternally meaningful.
            </p>
            <p>
                Madhva's reading of scripture is therefore not a diluted form of Vedanta. It is a fully developed rival system. The world is not downgraded to provisional appearance. Difference is not a product of ignorance to be sublated. Difference is constitutive of reality.
            </p>

            <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-6">
                <p className="mb-0">
                    <strong>Corrective thesis:</strong> Dvaita is not simply the belief that God and the world feel separate. It is a technical Vedanta school with its own commentarial discipline, scriptural readings, and final account of liberation through real difference.
                </p>
            </div>

            <h2>Why the comparison breaks down if you use only Western categories</h2>
            <p>
                The comparison breaks down because Western monism and dualism are often framed as questions of substance count. Indian debates are not only asking how many ultimate kinds exist. They are asking what ignorance is, what liberates, whether devotion is provisional or final, and what valid means of knowledge reveal.
            </p>
            <p>
                In Advaita, the decisive issue is whether difference survives ultimate inquiry. In Dvaita, the decisive issue is whether relation to God can be preserved without collapsing into identity. Those are not exhausted by saying one is monism and the other is dualism.
            </p>
            <p>
                Another point of breakdown concerns practice. A metaphysical label in Western philosophy can remain abstract. In Vedanta, doctrine shapes worship, meditation, scriptural reading, and the seeker's entire orientation. One cannot separate ontology from sadhana.
            </p>

            <h2>What each view leads to spiritually</h2>
            <p>
                Advaita leads toward self-inquiry, discrimination between real and unreal, and eventual recognition that the witness is not different from Brahman. Devotion can support the path, but in Shankara's system final liberation is knowledge. The spiritual movement is from superimposition to identity.
            </p>
            <p>
                Dvaita leads toward intensified devotion, dependence on God, scriptural fidelity, and the deepening of a real relation between finite soul and supreme Lord. The spiritual movement is not from relation to identity, but from ignorance and bondage toward purified and fulfilled relation.
            </p>
            <p>
                These are not minor stylistic differences. They shape prayer, meditation, emotional tone, and what counts as realization. A seeker who cannot bear the loss of devotional relation may find Advaita too severe or misunderstood. A seeker pressed by the question of absolute identity may find Dvaita metaphysically insufficient. The traditions know this. That is why they remain distinct.
            </p>

            <div className="article-callout" data-tone="insight">
                <div className="article-callout-title">Practical implication</div>
                <p>
                    If you are trying to understand which worldview matches your practice, compare this page with <ArticleLink href="/advaita-vs-dvaita" eventLabel="non-duality:body:advaita-dvaita">Advaita vs Dvaita</ArticleLink> and the <ArticleLink href="/philosophies/dvaita" eventLabel="non-duality:body:dvaita-hub">Dvaita philosophy hub</ArticleLink>. The doctrinal decision changes the meaning of devotion and liberation.
                </p>
            </div>

            <h2>Why non-duality is not a free pass beyond ethics</h2>
            <p>
                One modern distortion says that if all is one, ethics no longer matters. Shankara's own layered account of reality rejects that. At the transactional level, action, duty, and consequence remain fully operative. A realized vision does not authorize negligence or moral collapse.
            </p>
            <p>
                Dvaita, of course, preserves ethics through accountability before a real God and real consequences. Yet the point is important on both sides. Neither system treats liberation as permission to become lawless. Each intensifies seriousness, though through different metaphysical routes.
            </p>
            <p>
                This is one reason the comparison should remain source-grounded. Popular non-duality language often strips away the rigors that made the original doctrine coherent.
            </p>

            <h2>How to read the disagreement properly</h2>
            <p>
                First, read primary commentarial traditions rather than internet paraphrases. Shankara and Madhva are not exchangeable mood boards. Second, ask what each school thinks liberation is. That question clarifies the rest. Third, pay attention to whether devotion is instrument or final relation. That point often reveals the deepest difference.
            </p>
            <p>
                Finally, stop assuming that all Indian philosophy seeks a single mystical oneness. It does not. Indian traditions contain real doctrinal dispute, and that dispute is part of their intellectual seriousness. The goal is not to erase disagreement. The goal is to understand what kind of spiritual life each view makes possible.
            </p>
        </ArticleLayout>
    );
}