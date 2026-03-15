import { ArrowRight } from "lucide-react";
import { requireArticleMeta } from "@/features/articles";
import { ArticleLayout } from "@/components/ArticleLayout";
import { TrackedLink } from "@/components/ContentAnalytics";
import { buildArticleMetadata } from "@/lib/seo";

const meta = requireArticleMeta("vedanta-vs-buddhism");

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

export default function VedantaVsBuddhismPage() {
    return (
        <ArticleLayout meta={meta} pillarLabel="Ancient Wisdom" pillarHref="/ancient-wisdom-philosophies">
            <p>
                The dispute between Vedanta and Buddhism runs through one precise question: whether ultimate analysis reveals a permanent witnessing Self, <em>Ātman</em>, or the absence of any enduring self, <em>anātman</em>. Advaita Vedanta, codified by Shankara, holds that the innermost Self is identical with Brahman. Buddhist traditions, beginning from the Buddha's analyses of the aggregates, deny that any such self survives scrutiny.
            </p>
            <p>
                The Upanishadic declaration <em>Aham Brahmāsmi</em> — "I am Brahman" — from the <em>Bṛhadāraṇyaka Upaniṣad</em> 1.4.10 is taken in Advaita as an identity claim about the ultimate nature of awareness. Buddhist anātman doctrine moves in exactly the opposite direction. Conflating the two traditions because both unsettle naive ego-identification is where comparative study usually goes wrong.
            </p>
            <p>
                That is why the comparison must be strict. There are real overlaps in ethics, meditative discipline, and diagnosis of attachment. There are also real and decisive differences in metaphysics, method, and what liberation finally means.
            </p>

            <h2>The core dispute: Ātman versus anātman</h2>
            <p>
                The Upanishadic and Vedantic traditions teach that beneath the changing body, mind, and empirical personality there is an unchanging witness, the Self. In Advaita this <em>Ātman</em> is not a finite inner object. It is identical with Brahman, the absolute reality. Mahavakyas such as "Tat Tvam Asi" in the <em>Chāndogya Upaniṣad</em> and "Aham Brahmāsmi" in the <em>Bṛhadāraṇyaka Upaniṣad</em> are taken as authoritative declarations of this identity.
            </p>
            <p>
                Buddhist traditions begin elsewhere. The discourses on the five aggregates, <em>skandhas</em>, argue that what is taken as personhood is composite, impermanent, and not-self. The teaching of <em>anātman</em> is not merely a denial of ego in the modern sense. It is a refusal to hypostatize any permanent self-substance beneath experience.
            </p>
            <p>
                This disagreement is not small. It changes how liberation is described. For Advaita, liberation is recognition of the real Self. For Buddhism, liberation is inseparable from seeing through clinging to selfhood as such.
            </p>

            <div className="article-callout" data-tone="insight">
                <div className="article-callout-title">Definition box</div>
                <p>
                    <strong>Ātman</strong> in Vedanta is the innermost Self, ultimately identical with Brahman in Advaita. <strong>Anātman</strong> in Buddhism means non-self, the denial that any permanent self can be found in the aggregates of lived experience.
                </p>
            </div>

            <h2>Why Shankara treats Buddhism as a serious rival</h2>
            <p>
                Shankara does not engage Buddhism as a straw man. In the <em>Brahma Sutra Bhāṣya</em>, especially in sections addressing rival views, he treats Buddhist schools as philosophically formidable. His criticisms are directed at multiple positions commonly identified as Vijnanavada, Yogachara, and Madhyamaka in the later doxographical sense.
            </p>
            <p>
                His central objection is that Buddhist positions, as he reads them, fail to secure the self-luminous witness affirmed by the Upanishads. If all is momentary cognition, or if ultimate analysis dissolves all stable ontological grounding, then for Shankara the scriptural teaching of the Self is lost. He insists that the witness cannot be reduced to a stream and cannot be denied without presupposing the very consciousness by which denial is known.
            </p>
            <p>
                Modern readers sometimes react by saying Shankara misunderstood Buddhism. In some cases that criticism has force, especially given the complexity of Madhyamaka. Yet the larger point stands. Shankara saw Buddhism as the sharpest available negation of Upanishadic selfhood, and he answered it accordingly.
            </p>

            <h2>Shankara's refutation in the Brahma Sutra Bhāṣya</h2>
            <p>
                The <em>Brahma Sutra Bhāṣya</em> is not a modern comparative essay. It is an exegetical and polemical work meant to establish the meaning of the Upanishads. When Shankara turns to Buddhist positions, he argues that doctrines of momentariness and non-self cannot account for continuity of memory, recognition, and knowledge in the way the Vedantic witness can.
            </p>
            <p>
                He also argues that pure negation cannot function as the final truth of revelation. The Upanishads do negate, but in Advaita they negate the non-Self in order to reveal Brahman, not in order to leave only voidness. This is a major fault line between Advaita and Buddhist emptiness discourse as he understood it.
            </p>
            <p>
                The details are technical, but the strategic point is clear. Shankara thinks Buddhism cuts through empirical illusion with great force and then stops too early or dissolves too much. Advaita, by contrast, claims to preserve the final non-dual absolute without reifying empirical individuality.
            </p>
            <p>
                To see the Advaitic side in clearer standalone form, use <ArticleLink href="/advaita-vedanta-explained" eventLabel="vedanta-buddhism:body:advaita">Advaita Vedanta Explained</ArticleLink> and <ArticleLink href="/what-is-maya" eventLabel="vedanta-buddhism:body:maya">What is Maya</ArticleLink>. Those pages show why Advaita believes it can critique the ego without surrendering the Self.
            </p>

            <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-6">
                <p className="mb-0">
                    <strong>Corrective thesis:</strong> Advaita is not Buddhism with a hidden Self added at the end. Buddhism is not Advaita with a more severe vocabulary. The traditions overlap in critique of naive selfhood, but their final metaphysical commitments differ.
                </p>
            </div>

            <h2>Points of convergence</h2>
            <p>
                Convergence is real and should not be denied. Both traditions treat ordinary ego-identification as a source of suffering, and both hold that perception shaped by craving and ignorance distorts rather than reveals. Renunciation, ethical discipline, and meditative seriousness appear on both sides. Neither tradition supports the reduction of human life to consumption and social performance.
            </p>
            <p>
                There are also phenomenological overlaps. A practitioner in either tradition may report disidentification from thoughts, reduction of craving, clearer attention, and profound release from habitual self-concern. This practical resemblance is one reason modern readers conflate the traditions.
            </p>
            <p>
                Yet convergence at the level of practice does not erase doctrinal disagreement. Similar operations can be performed inside different metaphysical systems. The resemblance is genuine. The equivalence is false.
            </p>

            <h2>Śūnyatā and Brahman are not equivalents</h2>
            <p>
                One of the most common comparative errors is to equate <em>śūnyatā</em>, emptiness, with Brahman. These terms emerge from different argument worlds. Emptiness in Madhyamaka is the lack of independent self-existence in phenomena. It is a critique of essence and fixation. Brahman in Advaita is the non-dual absolute reality affirmed through revelation and realization.
            </p>
            <p>
                That does not mean emptiness is mere nothingness or that Brahman is a hidden object. Both traditions are subtler than their caricatures. Still, emptiness functions differently from Brahman. One deconstructs intrinsic existence. The other identifies the absolute ground that remains when superimposition is removed.
            </p>
            <p>
                This is precisely where careful comparison becomes valuable. It forces precision where modern spirituality prefers blur.
            </p>

            <div className="article-callout" data-tone="insight">
                <div className="article-callout-title">Comparative caution</div>
                <p>
                    If you want the larger landscape of Indian philosophical disagreement, connect this page with <ArticleLink href="/advaita-vs-dvaita" eventLabel="vedanta-buddhism:body:advaita-dvaita">Advaita vs Dvaita</ArticleLink> and the <ArticleLink href="/traditions/buddhism" eventLabel="vedanta-buddhism:body:buddhism">Buddhism tradition hub</ArticleLink>. The dispute with Buddhism is one major front in a wider doctrinal field.
                </p>
            </div>

            <h2>Practical divergence: self-inquiry versus non-self analysis</h2>
            <p>
                The practical difference becomes clearest in method. Advaitic self-inquiry, whether in classical Vedanta or later in Ramana Maharshi's style, asks the seeker to examine the "I" and trace it to its source. The logic is not to abolish the witness but to distinguish it from body, mind, and roles until only pure awareness remains.
            </p>
            <p>
                Buddhist practice, especially in traditions emphasizing insight, analyzes experience into impermanent processes and undermines the tendency to solidify any of them into self. The movement is often toward seeing that no enduring entity can be located behind the flow. Even when meditative states appear spacious or luminous, they are not automatically reinterpreted as an eternal Self.
            </p>
            <p>
                Both methods reduce ego-clinging. They do not do so by the same metaphysical route. That is why borrowing techniques across traditions requires conceptual care. A method is shaped by the doctrine it serves.
            </p>

            <h2>How to compare them without flattening either</h2>
            <p>
                First, preserve primary sources. Use the Upanishads, the Gita, and Shankara for Vedanta. Use the Buddha's discourses and major Buddhist scholastic traditions for Buddhism. Do not compare memes. Compare texts.
            </p>
            <p>
                Second, separate three levels. One level is practical overlap. Another is philosophical disagreement. A third is modern hybrid interpretation. Confusion usually arises when these levels are mixed. Two traditions may feel similar in meditation and still disagree on ultimate reality.
            </p>
            <p>
                Third, resist the modern desire for sameness as proof of wisdom. Traditions do not become profound by becoming indistinguishable. They become more intelligible when their agreements and disagreements are both allowed to stand.
            </p>
        </ArticleLayout>
    );
}
