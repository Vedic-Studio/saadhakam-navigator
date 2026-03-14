import { ArrowRight } from "lucide-react";
import { getArticleBySlug } from "@/data/articles";
import { ArticleLayout } from "@/components/ArticleLayout";
import { TrackedLink } from "@/components/ContentAnalytics";
import { buildArticleMetadata } from "@/lib/seo";

const meta = getArticleBySlug("existentialism-and-vedanta")!;

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

export default function ExistentialismAndVedantaPage() {
    return (
        <ArticleLayout meta={meta} pillarLabel="Ancient Wisdom" pillarHref="/ancient-wisdom-philosophies">
            <p>
                Existentialism and Vedanta are often compared because both refuse easy consolation. Each confronts anxiety, death, freedom, and the instability of identity. But they begin from opposite premises. Existentialism, especially in Sartre's famous formulation that existence precedes essence, treats the human being as thrown into a world without a given metaphysical essence that could excuse the burden of choice. Vedanta begins almost inversely. The human problem is not the absence of essence, but mistaken essence-identification.
            </p>
            <p>
                In existentialism, freedom hurts because there is no final given nature to hide behind. In Vedanta, bondage hurts because one mistakes the non-Self for the Self and lives from that confusion. One begins with radical openness and responsibility. The other begins with radical misidentification and inquiry. Both are serious. They simply diagnose different wounds.
            </p>
            <p>
                That is why the comparison should not be softened into generic wisdom about meaning. Existential freedom begins from no fixed essence. Vedantic freedom begins from recovering the real one, not as personality or social role, but as consciousness, <em>cit</em>, or Self, <em>Ātman</em>. The bridge is real only when the disagreement stays visible.
            </p>

            <h2>Sartre's formulation and what Vedanta makes of it</h2>
            <p>
                Sartre's existentialism is shaped by the refusal of a predetermined human essence. Human beings are condemned to be free because they cannot escape choosing, interpreting, and projecting themselves into the future. Meaning is not discovered in a metaphysical order waiting to be read off. It is authored under conditions of contingency. This makes anxiety structural, not accidental.
            </p>
            <p>
                Vedanta comes through the Upanishads, the Bhagavad Gita, and later commentarial traditions that insist the deepest Self is not made by choice. The empirical person chooses, acts, suffers, and accumulates karma, but the witnessing consciousness is not produced by biography. The core inquiry is therefore not, "What shall I make of myself," but, "Who is the self I take myself to be."
            </p>
            <p>
                Existentialism experiences dread when inherited narratives collapse. Vedanta interprets such collapse as an opening, because once roles and stories fail, the seeker can distinguish witness from content. The contrast is immediate. Existentialism heightens the burden of subjectivity. Vedanta interrogates the structure of subjectivity itself.
            </p>

            <div className="article-callout" data-tone="insight">
                <div className="article-callout-title">Definition box</div>
                <p>
                    <strong>Existence precedes essence</strong> means, in Sartre, that human beings are not born with a fixed determining nature that decides their meaning in advance. <strong>Ātman</strong> in Vedanta is not a personality essence. It is the witnessing consciousness misidentified as body, mind, and role.
                </p>
            </div>

            <h2>Bad faith and avidyā: the structural overlap that actually exists</h2>
            <p>
                The strongest parallel is diagnostic. Both traditions refuse to let human beings rest inside borrowed identities. Existentialism attacks bad faith, the tendency to pretend one is a fixed thing, waiter, citizen, spouse, role, in order to escape freedom. Vedanta attacks identification with the same field of roles because none of them can be the final Self.
            </p>
            <p>
                In both cases, ordinary social life is not enough. It offers scripts, duties, and interpretations that may stabilize a person for a time, but they do not answer the deepest question. Who am I when the inherited story no longer convinces. That is why existentialism and Vedanta both appeal to modern readers emerging from identity crisis, burnout, grief, or philosophical disillusionment.
            </p>
            <p>
                Both also refuse shallow optimism. Anxiety is not treated as a defect to be quickly medicated by slogans. It is revelatory. In existentialism it reveals the burden of freedom and contingency. In Vedanta it reveals the instability of false identification. The emotional texture can look similar even when the metaphysical interpretation differs.
            </p>
            <p>
                This is the best use of the comparison. Existentialism can prepare the seeker by destroying complacency. Vedanta can deepen the seeker by asking whether the one who feels abandoned in the universe is itself properly understood.
            </p>

            <p>
                For adjacent bridges, compare this page with <ArticleLink href="/nietzsche-and-vedanta" eventLabel="existentialism:body:nietzsche">Nietzsche and Vedanta</ArticleLink> and <ArticleLink href="/carl-jung-and-vedanta" eventLabel="existentialism:body:jung">Carl Jung and Vedanta</ArticleLink>.
            </p>

            <h2>Created meaning versus discovered fullness: where the paths diverge</h2>
            <p>
                Existentialism generally says meaning is made through committed action, decision, and responsibility. Even when existential thinkers differ among themselves, the burden falls on the human subject to choose without absolute guarantees. Meaning is therefore historical, lived, and unstable. It belongs to existence under risk.
            </p>
            <p>
                Vedanta does not deny action, but it relocates the center. Meaning is not finally manufactured by the ego under pressure. It is discovered when ignorance clears and the Self is known as not lacking. Ethical action then flows from clarity rather than from the panic of self-construction. The person still acts. But action no longer bears the impossible task of manufacturing metaphysical worth.
            </p>
            <p>
                This difference matters because it changes the whole emotional economy of freedom. In existentialism, freedom is burden and dignity at once. In Vedanta, freedom in the highest sense is not the burden of self-authorship, but release from confusing the authored self with the real Self.
            </p>
            <p>
                Therefore Sartre's doctrine and Vedantic <em>ātma-vicāra</em>, self-inquiry, should not be conflated. Sartre denies a fixed essence that precedes human life. Vedanta denies that body-mind personality is the real essence at all. The terms look similar only until you inspect what "essence" means in each case.
            </p>

            <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-6">
                <p className="mb-0">
                    <strong>Corrective thesis:</strong> existentialism says you are not born with a ready-made human essence that excuses your choices. Vedanta says the essence you usually protect, personality, biography, social identity, was never ultimate in the first place.
                </p>
            </div>

            <h2>Why Camus is a more useful bridge than Sartre</h2>
            <p>
                Camus, often grouped with existentialism despite his own resistance to the label, offers a different entry point. His concept of the absurd, in <em>The Myth of Sisyphus</em> (1942), is the confrontation between the human demand for clarity and the world's silence in response. The absurd hero does not solve this confrontation. He accepts it and presses on anyway. That posture of clear-eyed engagement without consolation has more structural resonance with Vedanta than Sartre's freedom-as-burden does.
            </p>
            <p>
                Vedanta does not say the world is obligingly clear. It says clarity lies in recognizing what the world actually is: transactional reality, not ultimate truth. The seeker who has sat with Camus's description of groundlessness may be more prepared for the Upanishadic teaching that the solid self one assumed is not what it appeared to be. Sartre gives freedom without a ground. Camus gives revolt without a ground. Vedanta says the ground was always there, but it was being mistaken for something else.
            </p>
            <p>
                The Vedantin stands not before an abyss of choice but before a superimposition that can be removed through knowledge. Existential dread and Vedantic inquiry therefore diverge in their endpoint. One confronts freedom as project. The other confronts bondage as error. Both are serious. Only one has a clear exit.
            </p>
            <p>
                This is also where readers often need <ArticleLink href="/what-is-maya" eventLabel="existentialism:body:maya">What is Maya?</ArticleLink>. Without understanding <em>māyā</em> and misidentification, Vedanta can sound like a comforting essence-doctrine. It is not. It is a radical critique of the apparent self, carried out on different metaphysical grounds.
            </p>

            <h2>What existentialism correctly diagnoses that spiritual culture keeps avoiding</h2>
            <p>
                Practically, existentialism offers a hard medicine that spirituality often lacks. It teaches responsibility. It resists the temptation to hide inside metaphysical language while refusing concrete decisions. It refuses sentimental narratives of destiny when what is needed is honesty about choice, fear, and accountability.
            </p>
            <p>
                Vedanta offers a medicine that existentialism often lacks. It teaches that the burden of constructing an ultimate self is itself part of bondage. The anxious agent can be examined. The witness of anxiety can be distinguished from the anxious mind. This does not erase life decisions, but it changes their psychological and metaphysical pressure.
            </p>
            <p>
                Together, the two approaches can produce a stronger seeker than either alone when kept distinct. Existentialism prevents metaphysical escape. Vedanta prevents identification with the struggler. One says, do not lie about your freedom. The other says, do not mistake the empirical chooser for the whole of what you are.
            </p>
            <p>
                This becomes especially important in crisis. Grief, mortality, and breakdown often first appear existentially, as absurdity, freedom, nausea, isolation. Vedanta does not ask you to skip that honesty. It asks you to carry it into inquiry. Who is isolated. What exactly dies. What is it that knows fear.
            </p>

            <h2>Why the comparison is worth making precisely because the disagreement is real</h2>
            <p>
                Existentialism and Vedanta should not be reconciled too quickly. Their disagreement about essence, freedom, and selfhood is real. Still, the comparison is philosophically fertile because each illuminates the other's blind spot. Existentialism shows what happens when identity cannot hide behind metaphysical guarantees. Vedanta shows that even the one who suffers that exposure may not be what it seems.
            </p>
            <p>
                The best summary is therefore exact. Existential freedom begins from no fixed essence. Vedantic freedom begins from the discovery that the false essence was never the real Self. Similar anxieties, different starting points, different liberations.
            </p>
        </ArticleLayout>
    );
}
