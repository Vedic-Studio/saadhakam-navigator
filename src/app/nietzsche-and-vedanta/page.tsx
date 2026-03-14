import { ArrowRight } from "lucide-react";
import { getArticleBySlug } from "@/data/articles";
import { ArticleLayout } from "@/components/ArticleLayout";
import { TrackedLink } from "@/components/ContentAnalytics";
import { buildArticleMetadata } from "@/lib/seo";

const meta = getArticleBySlug("nietzsche-and-vedanta")!;

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

export default function NietzscheAndVedantaPage() {
    return (
        <ArticleLayout meta={meta} pillarLabel="Ancient Wisdom" pillarHref="/ancient-wisdom-philosophies">
            <p>
                Nietzsche read India through Schopenhauer. That matters. Schopenhauer's access to Vedanta came from early nineteenth-century translations, and his appropriation was selective: he emphasized renunciation, world-denial, and will-suppression while largely ignoring Advaita's metaphysical argument and the life-affirming currents of Tantra and Kashmir Shaivism. When Nietzsche attacked Buddhism and Brahminism in <em>The Antichrist</em> and <em>On the Genealogy of Morality</em>, he was largely arguing against Schopenhauer's India, not against the full range of what those traditions actually say.
            </p>
            <p>
                That is why the comparison requires more precision than it usually gets. Nietzsche's attack is directed at <em>ressentiment</em>, herd morality, ascetic ideals, and every moral framework that disguises weakness as virtue. Vedanta, especially Advaita Vedanta, diagnoses bondage as ignorance, <em>avidyā</em>, and misidentification with body, mind, and ego. Both mistrust inherited identities, but they do not mistrust them for the same reason, and Nietzsche's critique, aimed at a caricature of Indian thought, misses Advaita's target almost entirely.
            </p>
            <p>
                Yet the comparison is still worth doing because Nietzsche's critique lands with uneven force across Indian traditions. It strikes certain renunciatory and world-denying forms hard. It strikes Advaitic metaphysics less directly than people assume. It becomes more complicated still when Tantra and <em>Kāśmīra Śaivism</em> enter the picture, because they affirm manifestation, power, and consciousness in ways that resist easy classification as life denial.
            </p>

            <h2>What Nietzsche actually read: Schopenhauer was the intermediary</h2>
            <p>
                Nietzsche's key texts for this comparison include <em>On the Genealogy of Morality</em>, <em>Beyond Good and Evil</em>, and <em>The Antichrist</em>. Across them he returns to a few recurring concerns. Morality may be an instrument of the weak against the strong. Asceticism may disguise hatred of embodied existence. Spiritual vocabulary may become a refined method for refusing life while claiming superiority over it.
            </p>
            <p>
                His specific references to Indian philosophy are mostly to Buddhism and to a Brahminism filtered through Schopenhauer's lens. Schopenhauer had translated renunciation of the will into a philosophical system, and Nietzsche understood Indian spirituality largely through that translation. He had limited direct access to Upanishadic sources, and his reading of the Vedantic tradition as primarily ascetic and life-negating reflects that limitation.
            </p>
            <p>
                Vedanta's key terms come from another vocabulary. Bondage belongs to ignorance, not to sin or resentment. <em>Mokṣa</em>, liberation, is freedom from misidentification. In Advaita, the individual self is not perfected as a heroic project. It is seen through. The central operation is not self-creation but self-knowledge. Nietzsche is diagnosing value formation inside historical and psychological life. Vedanta is diagnosing the structure of selfhood and reality. They overlap in their suspicion of unconscious conformity, but they do not share a final account of what the human being is.
            </p>

            <div className="article-callout" data-tone="insight">
                <div className="article-callout-title">Definition</div>
                <p>
                    <strong>Ressentiment</strong> in Nietzsche is reactive, stored hostility that cannot express itself directly and so turns into moral inversion. <strong>Mokṣa</strong> in Vedanta is liberation from ignorance and false identification, not the victory of one reactive self over another.
                </p>
            </div>

            <h2>What ressentiment attacks — and why Advaita is not its primary target</h2>
            <p>
                Nietzsche rejects the person who inherits values without ever examining whether they arise from strength, fear, resentment, or conformity. Vedanta rejects the person who inherits identity without ever examining whether body, profession, social role, memory, and desire can truly define the Self. Both attack second-hand living, but the diagnosis is different in kind.
            </p>
            <p>
                Nietzsche's herd is moral and cultural. Vedanta's ordinary confusion is ontological: the empirical personality is taken as obvious and final not because of cultural weakness but because of a structural error in self-knowledge. Each tradition imposes discomfort. Nietzsche's writing humiliates complacency. Vedantic inquiry strips away cherished self-descriptions. Neither works as decorative philosophy.
            </p>
            <p>
                This is why Nietzsche can help some modern Vedanta readers before he harms them. He sharpens honesty. He teaches suspicion toward pious posture, consoling slogans, and moral vanity. Those are real dangers in spiritual culture. A student who has never passed through Nietzschean suspicion may carry sentimental illusions into contemplative life.
            </p>
            <p>
                But Nietzsche's critique, however useful as solvent, does not touch the Advaitic claim that awareness is prior to the ego. His genealogical method works on values, moralities, and psychological formations. It cannot, by itself, decide the metaphysical question of whether consciousness is reducible to mind, or whether the witness of mental events is other than those events.
            </p>

            <p>
                If that preparatory critique resonates, continue into <ArticleLink href="/existentialism-and-vedanta" eventLabel="nietzsche:body:existentialism">Existentialism and Vedanta</ArticleLink> or test the contrast directly with <ArticleLink href="/what-is-vedanta" eventLabel="nietzsche:body:vedanta">What is Vedanta?</ArticleLink>.
            </p>

            <h2>Where the Dionysian instinct and Tantra's world-affirmation genuinely meet</h2>
            <p>
                The most productive comparison is not Nietzsche versus Advaita but Nietzsche versus Tantra and Kashmir Shaivism. Nietzsche praises self-overcoming within becoming, vitality, creativity, and the affirmation of life including its suffering and contingency. Kashmir Shaivism holds that manifestation is the self-expression of consciousness, not a regrettable fall from purity. In that tradition, reality unfolds as the play, <em>līlā</em>, or pulsation, <em>spanda</em>, of Shiva-consciousness. The world is not merely tolerated. It is the dynamic face of the Absolute.
            </p>
            <p>
                Nietzsche's charge that Indian spirituality is life-denying lands hard on the ascetic caricature but not on Tantra. Abhinavagupta's Tantraloka, the foundational text of Kashmir Shaivism, describes liberation not as escape from the world but as recognition that the whole of experience is Shiva's self-disclosure. That is not the posture of weakness Nietzsche attacks.
            </p>
            <p>
                This is where the comparison becomes genuinely philosophically interesting rather than merely tactical. The Dionysian and the Tantric are not identical, but they share a commitment to the generativity and dignity of embodied, world-engaged existence. That overlap is worth examining honestly rather than collapsing into identity.
            </p>

            <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-6">
                <p className="mb-0">
                    <strong>The limit of the comparison:</strong> Nietzsche's project is not moksha with stronger vocabulary. He seeks a more affirmative mode of becoming. Advaita seeks knowledge of that which is not reducible to becoming at all.
                </p>
            </div>

            <h2>Will to power and moksha: what cannot be reconciled</h2>
            <p>
                The common bridge phrase says Nietzsche's will to power resembles Vedantic transcendence because both overcome weakness. That is too vague to hold. Nietzsche's language of will to power concerns interpretation, rank, force, creation, overcoming, and expansion of life. Whatever the exact debates around the term, it clearly does not mean dissolving the self into non-dual awareness.
            </p>
            <p>
                Advaita moves in the opposite direction. The ego, <em>ahaṃkāra</em>, is not the locus of final triumph. It is a functional principle within empirical life. Freedom comes not by intensifying its authorship but by recognizing that awareness is prior to the ego's claim of ownership. The question becomes: who is the one asserting power, and is that claimant ultimate or merely another witnessed phenomenon?
            </p>
            <p>
                Nietzsche's higher type and Advaita's liberated sage cannot be casually aligned. Nietzsche praises self-overcoming within becoming. Advaita points beyond becoming to that which is never bound by it. Nietzsche refines and heightens the human figure. Advaita relativizes it.
            </p>
            <p>
                This is where many comparisons break down. Anything that sounds like ego dissolution is immediately branded decadent from a Nietzschean angle. Anything that sounds like self-assertion is immediately branded ignorance from a crude Vedantic angle. A better reading sees that each is guarding against a different danger. Nietzsche fears the sickness that disguises itself as sanctity. Advaita fears the ignorance that disguises itself as individuality.
            </p>

            <h2>What a Vedantin should take from Nietzsche's critique</h2>
            <p>
                Nietzsche's practical gift to a spiritual reader is ruthless diagnosis. He teaches you to ask whether your humility masks fear, whether your morality masks resentment, whether your asceticism masks incapacity, and whether your spirituality masks refusal of life. These are dangerous questions. They are also cleansing ones.
            </p>
            <p>
                Vedanta's practical gift is different. It gives contemplative method where Nietzsche gives critique. A reader can use Nietzsche as solvent and Vedanta as orientation, provided the two are not merged into a fantasy synthesis that softens both.
            </p>
            <p>
                In concrete terms: if your practice makes you more theatrical, morally superior, and allergic to embodied life, Nietzsche should disturb you. If your self-overcoming project only polishes the ego's narrative of specialness, Vedanta should disturb you. Neither tradition is meant to leave vanity intact.
            </p>
            <p>
                Nietzsche is one of the strongest critics of bad spirituality because he sees how easily weakness clothes itself in sacred language. That critique should be welcomed. It protects comparative philosophy from sentimentality. But it does not follow that every form of Vedanta is merely an ascetic ideal in disguise. Where spirituality becomes resentment, he is devastating. Where spirituality becomes disciplined inquiry into the real, he is a challenge but not a cancellation. And where Indian tradition becomes Tantra and Kashmir Shaivism, his charge of life-denial does not land at all. To see that school in full, continue to <ArticleLink href="/traditions/kashmir-shaivism" eventLabel="nietzsche:body:kashmir">Kashmir Shaivism</ArticleLink>.
            </p>
        </ArticleLayout>
    );
}
