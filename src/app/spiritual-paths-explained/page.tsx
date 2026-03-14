import { ArrowRight } from "lucide-react";
import { getArticleBySlug } from "@/data/articles";
import { ArticleLayout } from "@/components/ArticleLayout";
import { TrackedLink } from "@/components/ContentAnalytics";
import { buildArticleMetadata } from "@/lib/seo";

const meta = getArticleBySlug("spiritual-paths-explained")!;

export const metadata = buildArticleMetadata(meta);

function ArticleLink({ href, children, eventLabel }: { href: string; children: React.ReactNode; eventLabel: string }) {
    return (
        <TrackedLink
            href={href}
            eventLabel={eventLabel}
            trackPathName="spiritual-traditions"
            className="inline-flex items-center gap-2 font-semibold text-orange-400 transition-colors hover:text-orange-300"
        >
            {children}
            <ArrowRight className="h-4 w-4" />
        </TrackedLink>
    );
}

export default function SpiritualPathsExplainedPage() {
    return (
        <ArticleLayout meta={meta} pillarLabel="Spiritual Traditions" pillarHref="/spiritual-traditions-paths">
            <p>
                The four spiritual paths — Karma Yoga, Bhakti Yoga, Jnana Yoga, and Dhyana Yoga — are not personality styles selected by preference. The Bhagavad Gita presents each as a disciplined mode of transformation assigned on the basis of mind-structure, capacity, and current condition. Taking the wrong path produces not just poor results but a specific kind of damage: vanity, rigidity, or mechanical practice that mimics depth without achieving it.
            </p>
            <p>
                The major categories are Karma Yoga, Bhakti Yoga, Jnana Yoga, and Dhyana or Raja Yoga. These are not four aesthetic identities. They are four disciplined modes of transformation. One emphasizes action without attachment, another devotion, another knowledge, and another stabilization of mind. The Gita integrates them, but it does not flatten their differences.
            </p>
            <p>
                A serious explanation must therefore do two things at once. It must show how the four paths converge in liberation, <em>mokṣa</em>, and it must show why different seekers begin more fruitfully in different places. Equal dignity does not mean equal suitability.
            </p>

            <h2>The fourfold mārga framework in the Gita</h2>
            <p>
                The Sanskrit word <em>mārga</em> means path. The Gita does not formally place the four paths in a single numbered list, yet its chapters clearly articulate the major disciplines later traditions summarize as four paths. Chapters 2 and 3 ground Karma Yoga. Chapters 7 to 12 intensify Bhakti. Chapters 4 and 13 sharpen Jnana. Chapter 6 gives a sustained account of meditative discipline that later teachers align with Dhyana or Raja Yoga.
            </p>
            <p>
                This matters because the system is scripturally grounded, not a modern simplification invented for workshops. The Gita repeatedly addresses different seeker profiles. In Chapter 12 Krishna explicitly distinguishes those who worship the manifest Lord from those who contemplate the unmanifest absolute. In Chapter 3 he explains why disciplined action is necessary for those not established in wisdom. In Chapter 6 he describes the conditions required for meditation to become stable.
            </p>
            <p>
                The result is a practical map. One person begins through duty. Another through devotion. Another through inquiry. Another through mental discipline. These are not mutually hostile, but they are not interchangeable either.
            </p>

            <div className="article-callout" data-tone="insight">
                <div className="article-callout-title">Definition box</div>
                <p>
                    <strong>Karma Yoga</strong> is disciplined action without attachment to results. <strong>Bhakti Yoga</strong> is disciplined devotion to the Divine. <strong>Jnana Yoga</strong> is liberating inquiry into Self and reality. <strong>Dhyana or Raja Yoga</strong> is the systematic training of attention toward meditative absorption.
                </p>
            </div>

            <h2>Karma Yoga: for the person who must act</h2>
            <p>
                Karma Yoga is not merely for extroverts. It is for those whose mind cannot mature by withdrawing prematurely from action. Krishna's argument in Chapter 3 is direct. No one remains truly actionless while embodied. The issue is whether action binds or purifies.
            </p>
            <p>
                This path suits the seeker whose life is already structured by duty, work, family responsibility, or service, and who is capable of learning inward detachment without abandoning outward obligation. Such a person often grows through responsibility rather than through retreat. The Gita's example of Janaka shows precisely this possibility.
            </p>
            <p>
                The danger is moral vanity. A person on Karma Yoga can begin to worship usefulness, public service, or sacrifice itself. The corrective lies in Chapter 2 verse 47 and Chapter 3's insistence that action be surrendered from egoic ownership. When Karma Yoga is real, action becomes cleaner and less self-referential.
            </p>
            <p>
                For the practical stakes of duty and action, use <ArticleLink href="/advaita-vs-dvaita" eventLabel="paths:body:advaita-dvaita">Advaita vs Dvaita</ArticleLink> for the metaphysical backdrop and <ArticleLink href="/what-is-moksha" eventLabel="paths:body:moksha">What is Moksha</ArticleLink> for the goal these disciplines serve.
            </p>

            <h2>Bhakti Yoga: for the person who relates through devotion</h2>
            <p>
                Bhakti Yoga is frequently trivialized as the emotional path for people who do not like philosophy. Texts such as the Bhagavad Gita, the <em>Bhāgavata Purāṇa</em>, and the <em>Nārada Bhakti Sūtras</em> do not support that caricature. Bhakti is a disciplined orientation in which the ego is softened through remembrance, praise, worship, surrender, and loving relation to the Divine.
            </p>
            <p>
                This path suits the seeker whose heart becomes steady through reverence more readily than through abstraction. Such a person may find mantra, image, liturgy, or prayer more stabilizing than conceptual inquiry. Chapter 12 of the Gita makes a strong case for this. In 12.2 Krishna says of the devoted: <em>mayy āveśya mano ye māṃ nitya-yuktā upāsate</em> — "those who fix the mind on me and worship with constant devotion" he considers most accomplished. The statement is diagnostic rather than consolatory.
            </p>
            <p>
                The danger is confusion between devotion and emotionalism. Bhakti is not merely strong feeling during music or ritual. It becomes genuine when the person's memory, conduct, and surrender become ordered around the Divine. The tradition is severe on this point. Devotion without discipline decays into mood.
            </p>

            <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-6">
                <p className="mb-0">
                    <strong>Corrective thesis:</strong> Bhakti is not the anti-intellectual path. It is a path with its own theology, discipline, and rigor. The sentimental reading usually comes from outsiders or from diluted modern presentation, not from the primary sources.
                </p>
            </div>

            <h2>Jnana Yoga: for the person compelled by truth</h2>
            <p>
                Jnana Yoga centers on discrimination, inquiry, hearing the teaching, reflecting on it, and deeply assimilating it. In Upanishadic and Advaitic settings this becomes <em>śravaṇa</em>, hearing, <em>manana</em>, reasoning, and <em>nididhyāsana</em>, contemplative assimilation. The seeker here is not satisfied by piety alone and is pressed by the question of what the self actually is.
            </p>
            <p>
                This path suits the person whose mind naturally seeks clarity about consciousness, identity, and reality, and who is capable of sustained subtle attention without turning every question into display. Such seekers often resonate with the Upanishads, Shankara, and the interior rigor of self-inquiry.
            </p>
            <p>
                The danger is not intelligence itself. It is intellectualism, the conversion of liberating inquiry into self-protective analysis. The tradition is explicit that mere conceptual mastery does not liberate. One may know terminology and remain bound. That is why Jnana requires ethical preparation, dispassion, and steadiness, not only sharp reasoning.
            </p>
            <p>
                If that distinction matters for you, go directly to <ArticleLink href="/inquiry-vs-devotion-path" eventLabel="paths:body:inquiry-devotion">Inquiry vs Devotion Path</ArticleLink>. That page clarifies how Jnana and Bhakti interact without false opposition.
            </p>

            <h2>Dhyana or Raja Yoga: for the person who must stabilize the mind itself</h2>
            <p>
                Chapter 6 of the Gita describes meditative discipline with striking sobriety. One should sit in a clean place, regulate posture, moderate food and sleep, and repeatedly bring the wandering mind back. This is not mystical vagueness. It is method.
            </p>
            <p>
                This path suits the seeker who needs direct work with attention, restlessness, and interior steadiness. Some people understand doctrine well and even feel devotion deeply, yet remain unable to hold a stable mind. For them, meditative training is not optional support. It is a necessity.
            </p>
            <p>
                The danger is premature abstraction. Many beginners say they are meditating when they are merely sitting with unchecked thought flow. Classical yoga systems therefore begin with supports, regulation, repetition, and disciplined return. Meditation is not drifting. It is trained continuity of attention.
            </p>

            <div className="article-callout" data-tone="insight">
                <div className="article-callout-title">Practical note</div>
                <p>
                    A seeker who lacks stable attention often should not begin with advanced self-inquiry. Use <ArticleLink href="/which-meditation-for-me" eventLabel="paths:body:which-meditation">Which Meditation Is Right for Me</ArticleLink> to diagnose the right method before assuming that formless sitting is the highest entry point.
                </p>
            </div>

            <h2>The diagnostic framework: who fits which path</h2>
            <p>
                Tradition does not diagnose by social identity. It diagnoses by the structure of the mind. Does the seeker become sincere through service, through reverence, through inquiry, or through disciplined interior stilling. Does devotion stabilize the person, or does it remain theatrical. Does inquiry clarify, or does it produce self-importance. Does meditation steady the mind, or simply expose how unprepared it is.
            </p>
            <p>
                In practice, one looks for where sincerity and continuity become possible. The right path is often the one that produces steadiness without inflation. The wrong path often produces fantasy. An action-oriented person may imitate the renunciate. An analytical person may imitate the devotee. A devotional person may imitate the philosopher. In each case imitation weakens practice.
            </p>
            <p>
                This is why guidance matters. Traditional teachers read temperament through conduct, not slogans. Which practices does the seeker actually maintain. Which ones produce humility. Which ones create distortion. A mature diagnostic method looks at effect, not aspiration alone.
            </p>

            <h2>How the paths converge at one destination</h2>
            <p>
                Difference of path does not imply difference of final seriousness. The Gita's whole power lies in showing that action, devotion, knowledge, and meditation can all be ordered toward liberation. The final destination is not four separate heavens. It is freedom from binding ignorance, egoic attachment, and misrelation to the Divine.
            </p>
            <p>
                Yet convergence does not mean sameness at every level. In Advaita, the final language is recognition of non-dual reality. In theistic schools, the final language may emphasize eternal relation to God. The Gita can sustain multiple commentarial traditions precisely because its synthesis is rich. Still, all of them agree that lower identity must be transformed.
            </p>
            <p>
                A useful way to say this is simple. The paths differ in entry operation, discipline, and emphasis. They converge insofar as they reduce egocentricity, clarify duty, purify mind, and orient the seeker toward the highest truth.
            </p>

            <h2>Common misunderstandings that damage practice</h2>
            <p>
                The first misunderstanding is that Bhakti is emotionalism. It is not. The second is that Jnana is intellectualism. It is not. The third is that Karma Yoga means activism with spiritual branding. It does not. The fourth is that meditation is whatever happens when one sits quietly. That is not the classical understanding.
            </p>
            <p>
                A deeper misunderstanding is that higher paths are those that sound more abstract. This is often a symptom of ego, not discernment. For some seekers, devotion is the most exacting path because it demands surrender. For others, action is the proper furnace because life itself refuses escape. For others, inquiry is unavoidable because no symbolic form can satisfy the demand for truth.
            </p>
            <p>
                The tradition's seriousness lies exactly here. It does not flatter the seeker by telling everyone they are ready for the same method. It asks what actually removes bondage in this person, under these conditions, with this kind of mind.
            </p>

            <h2>How to choose without pretending certainty</h2>
            <p>
                Begin with the path you can practice daily without falseness. If you naturally revere and remember the Divine, begin with Bhakti supported by study. If duty dominates your life, begin with Karma Yoga. If the question of the Self is already burning and the mind can sustain subtlety, begin with Jnana under proper guidance. If your mind is scattered and unstable, begin with methods that train attention and regulation.
            </p>
            <p>
                Then observe the effect over time. Does practice make you more stable, less theatrical, less self-centered, and more exact in speech and action. If yes, the path is likely rightly chosen. If it makes you inflated, vague, dependent on mood, or obsessed with spiritual identity, the diagnosis may be wrong.
            </p>
            <p>
                For wider context, use <ArticleLink href="/traditions" eventLabel="paths:body:traditions">the traditions hub</ArticleLink> and <ArticleLink href="/advaita-vs-dvaita" eventLabel="paths:body:philosophy">Advaita vs Dvaita</ArticleLink>. The path you choose also sits inside a larger doctrinal world, and that world shapes what liberation is understood to mean.
            </p>
        </ArticleLayout>
    );
}
