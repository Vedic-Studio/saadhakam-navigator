import { getArticleBySlug } from "@/data/articles";
import { ArticleLayout } from "@/components/ArticleLayout";
import Link from "next/link";
import { buildArticleMetadata } from "@/lib/seo";

const meta = getArticleBySlug("bhagavad-gita-chapter-2")!;

export const metadata = buildArticleMetadata(meta);

export default function BhagavadGitaChapter2Page() {
    return (
        <ArticleLayout meta={meta} pillarLabel="Sacred Texts" pillarHref="/sacred-texts-teachings">
            <p>
                <strong>Direct answer:</strong> Bhagavad Gita Chapter 2 (Sankhya Yoga) introduces the core teaching of the entire Gita — you are not the perishable body but the deathless Self, and your duty is to act without attachment to outcomes.
            </p>
            <p>
                Chapter 1 ended with collapse. Chapter 2 begins with instruction. Arjuna is still trembling, still conflicted, still grieving — but now Krishna starts dismantling confusion in layers: first identity, then duty, then psychology, then practice.
            </p>

            <h2>Why Chapter 2 Matters</h2>
            <p>
                If someone asked, "What is the Bhagavad Gita in one chapter?" the most defensible answer is Chapter 2. It contains the seed-form of almost everything that gets expanded later: Atman, Karma Yoga, equanimity, disciplined intellect, and the portrait of the stable sage (Sthitaprajna).
            </p>
            <p>
                Krishna does not begin with ritual. He begins with ontology: <em>Who are you really?</em> Because without that, every ethical decision becomes unstable.
            </p>

            <h2>The First Shift: From Body-Identity to Self-Knowledge</h2>
            <p>
                Krishna's first intervention is uncompromising: grief rooted in ignorance of the Self is misplaced. The body changes, ages, and dies; the Self does not. The famous teaching appears here:
            </p>
            <p>
                <em>"Weapons do not cut it, fire does not burn it, water does not wet it, and wind does not dry it."</em> (BG 2.23)
            </p>
            <p>
                This is not emotional numbness. Krishna is not saying "don't feel." He is saying: do not build your worldview on what is inherently changing. Grief is human; misidentification is bondage.
            </p>

            <h2>The Second Shift: From Paralysis to Dharma</h2>
            <p>
                Arjuna's crisis is moral, but it is also role-based. As a warrior facing adharma, withdrawal is not neutrality. Krishna reframes action: refusing duty out of emotional overwhelm is still a choice with consequences.
            </p>
            <p>
                This is where modern readers often awaken to the chapter: Dharma is not "do what feels good." Dharma is "do what is right in context, even when emotionally costly."
            </p>

            <h2>Karma Yoga Is Introduced Here</h2>
            <p>
                Perhaps the most quoted verse in the Gita appears in this chapter:
            </p>
            <p>
                <em>"You have a right to action alone, never to its fruits."</em> (BG 2.47)
            </p>
            <p>
                Krishna is not dismissing outcomes. He is recalibrating inner posture. You control effort, attention, sincerity, and discipline. You do not control the total field of causes that determines final results. Attachment to result creates anxiety before action and regret after action.
            </p>

            <h2>Equanimity as a Spiritual Technology</h2>
            <p>
                Chapter 2 repeatedly returns to <em>Samatvam</em> — evenness of mind amidst gain/loss, pleasure/pain, victory/defeat. This is not passivity; it is operational clarity under volatility.
            </p>
            <p>
                In contemporary terms: equanimity is anti-fragile cognition. You can still act intensely, but without being psychologically hijacked by fluctuations.
            </p>

            <h2>Who Is a Sthitaprajna?</h2>
            <p>
                Arjuna asks one of the most practical questions in scripture: how does a person of stable wisdom speak, sit, and move? Krishna answers with behavioral markers, not abstract theology:
            </p>
            <ul>
                <li>Not driven by compulsive craving</li>
                <li>Not shattered by adversity</li>
                <li>Senses mastered rather than suppressed</li>
                <li>Mind resting in clarity rather than agitation</li>
            </ul>
            <p>
                This section is a diagnosis tool for seekers. Instead of asking "Do I believe the right doctrine?" Chapter 2 asks, "What is the quality of your nervous system under pressure?"
            </p>

            <h2>How to Apply Chapter 2 Today</h2>
            <p>
                Use this chapter as a daily calibration map:
            </p>
            <ul>
                <li>Before action: clarify duty, not mood.</li>
                <li>During action: focus on precision and presence.</li>
                <li>After action: release result-identity and learn.</li>
            </ul>
            <p>
                For structured progression, continue with the <Link href="/bhagavad-gita-complete-guide">Bhagavad Gita Complete Guide</Link>, read the dynamic chapter template at <Link href="/texts/bhagavad-gita/chapter-2">Bhagavad Gita Chapter 2 overview</Link>, and pair this with <Link href="/how-to-start-meditating-daily">daily meditation</Link> so the teaching moves from concept to embodiment.
            </p>

            <h2>The End of Chapter 2</h2>
            <p>
                Chapter 2 ends by naming the state Krishna is pointing toward: <em>Brahmi Sthiti</em> — abiding in the knowledge of Brahman. The chapter starts with grief and ends with a map to freedom. The path is now clear; the remaining chapters deepen and operationalize it.
            </p>
        </ArticleLayout>
    );
}
