import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Circle, BookOpen, Clock } from "lucide-react";
import { HeroSection } from "@/components/landing/HeroSection";

export default function NonDualityVsDualism() {
  const spectrumViews = [
    {
      title: "Strict Non-Dualism",
      philosophy: "Advaita Vedanta",
      thinker: "Adi Shankara",
      description: "Only Brahman (infinite consciousness) is real. The individual self (Atman) is identical with Brahman. The world and ego are maya—neither real nor unreal, but apparent."
    },
    {
      title: "Qualified Non-Dualism",
      philosophy: "Vishishtadvaita",
      thinker: "Ramanuja",
      description: "Brahman is the whole; individual souls and the universe are real parts of that whole. Like waves in the ocean—distinct yet inseparable from the ultimate reality."
    },
    {
      title: "Dualism",
      philosophy: "Dvaita",
      thinker: "Madhva",
      description: "God and individual souls are eternally distinct beings. The soul is always separate from the divine. Devotion and relationship with God are the ultimate reality."
    },
    {
      title: "Emptiness Beyond Concepts",
      philosophy: "Madhyamaka Buddhism",
      thinker: "Nagarjuna",
      description: "Neither singular nor multiple; beyond both dualism and non-dualism. All phenomena lack inherent, independent existence—yet appear conventionally real."
    }
  ];

  const practiceImplications = [
    {
      view: "Non-Dualism (Advaita)",
      meditation: "Inquiry into 'Who am I?'—investigation of consciousness to realize the false nature of the ego-self.",
      liberation: "Moksha as direct realization that you have never been separate from Brahman; dissolution of the illusion of individuality.",
      ethics: "Based on recognition of unity; ethical action arises naturally from understanding that harming others is harming yourself."
    },
    {
      view: "Dualism (Dvaita/Bhakti)",
      meditation: "Devotional prayer and visualization; cultivating love and surrender to the divine.",
      liberation: "Mukti as eternal communion with God in the divine realm—a relationship that endures forever.",
      ethics: "Love of God and others; ethical action as expression of devotion and obedience to divine will."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <HeroSection
        title="Non-Duality vs Dualism"
        subtitle="The Most Fundamental Question in Spiritual Philosophy"
        description="Are you separate from the universe, or one with it? Explore the core debate that has shaped Eastern and Western philosophy for millennia."
      />

      <div className="mx-auto max-w-3xl px-6 py-16">
        {/* Article Header */}
        <div className="mb-12">
          <div className="mb-4 flex items-center gap-2 text-amber-700">
            <Circle className="h-4 w-4" />
            <span className="text-sm font-semibold uppercase tracking-wide">Philosophy</span>
          </div>
          <h1 className="mb-4 text-5xl font-bold text-gray-900">
            Non-Duality vs Dualism: Understanding the Core Debate in Spiritual Philosophy
          </h1>
          <p className="mb-6 text-xl text-gray-600">
            The most fundamental question in philosophy — are you separate from the universe, or one with it?
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>10 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Philosophy</span>
            </div>
          </div>
        </div>

        {/* The Central Question */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold text-gray-900">The Central Question</h2>
          <div className="prose prose-lg max-w-none space-y-4 text-gray-700">
            <p>
              At the heart of human inquiry lies a deceptively simple question: What is the nature of reality, and what is your relationship to it? This question generates two fundamentally different worldviews—dualism and non-dualism—each with profound implications for how you understand yourself, practice spirituality, and relate to others.
            </p>
            <p>
              These are not merely abstract philosophical positions. They shape your meditation practice, inform your ethics, determine what you seek in life, and define what you understand liberation or enlightenment to mean. A practitioner operating from a non-dual framework approaches the spiritual path entirely differently than one rooted in dualism.
            </p>
          </div>
        </section>

        {/* What Is Dualism */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold text-gray-900">What Is Dualism?</h2>
          <div className="prose prose-lg max-w-none space-y-4 text-gray-700">
            <p>
              Dualism affirms the reality of two distinct categories: the self and the divine, or the individual and the ultimate. In Hindu philosophy, this view is represented by schools like Dvaita Vedanta (Madhva) and Vishishtadvaita (Ramanuja), and it aligns with much of Bhakti (devotional) practice across traditions.
            </p>
            <p>
              In Madhva's Dvaita Vedanta, God (Hari) and individual souls are eternally, irrevocably distinct. This distinction is not illusion but fundamental to reality. The soul can never become God; rather, liberation consists of achieving eternal communion with the divine in the divine realm. Ramanuja's Vishishtadvaita offers a middle position: souls and the world are real parts of a unified whole (Brahman), like organs in a body—distinct yet inseparable.
            </p>
            <p>
              The beauty of dualism is that it preserves relationship. God is a person to love; virtue consists of right relationship with the divine. Your devotion and prayers matter because they are addressed to someone who hears and responds. Liberation becomes eternal, conscious communion with the divine—a relationship that endures forever.
            </p>
          </div>
        </section>

        {/* What Is Non-Dualism */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold text-gray-900">What Is Non-Dualism (Advaita)?</h2>
          <div className="prose prose-lg max-w-none space-y-4 text-gray-700">
            <p>
              Non-dualism asserts that ultimately, only one reality exists: Brahman—infinite, eternal, unchanging consciousness. All multiplicity—the universe, the individual self, separation—is maya (illusion or appearance). This is the teaching of Advaita Vedanta, systematized by Adi Shankara in the 8th century and refined by countless sages since.
            </p>
            <p>
              In this view, your true nature is not the limited ego-personality you identify with, but Atman—consciousness itself—which is identical with Brahman. The apparent separation between "you" and "God" is a misperception, like mistaking a rope for a snake. Liberation (moksha) consists of realizing this directly, thereby dissolving the illusion of separation that causes suffering.
            </p>
            <p>
              Shankara taught that the world is neither real (sat) nor unreal (asat), but apparent (maya). This is not nihilism—the apparent world functions according to its own laws—but it lacks the independent, unchanging reality of Brahman. Through inquiry and meditation, the seeker awakens to their true nature and the fundamental unity underlying all existence.
            </p>
          </div>
        </section>

        {/* The Spectrum Between Them */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold text-gray-900">The Spectrum Between Them</h2>
          <p className="mb-8 text-gray-700">
            These views do not exist in isolation; they represent points on a spectrum of understanding:
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {spectrumViews.map((view, index) => (
              <div
                key={index}
                className="rounded-lg border-2 border-amber-200 bg-amber-50 p-6 transition-all hover:border-amber-400 hover:shadow-md"
              >
                <h3 className="mb-2 text-xl font-bold text-amber-900">{view.title}</h3>
                <p className="mb-3 text-sm font-semibold text-amber-700">{view.philosophy}</p>
                <p className="mb-4 text-xs text-amber-600">Philosopher: {view.thinker}</p>
                <p className="text-gray-700">{view.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Arguments For Each */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold text-gray-900">Key Arguments For Each View</h2>
          <div className="space-y-8">
            <div className="rounded-lg bg-amber-50 p-8 border border-amber-200">
              <h3 className="mb-4 text-2xl font-bold text-amber-900">For Non-Dualism</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="font-semibold text-amber-700">Parsimony:</span>
                  <span>It explains reality with the fewest assumptions—one infinite consciousness rather than infinite separate entities.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-amber-700">Liberation:</span>
                  <span>Only complete dissolution of the sense of separation addresses the root of suffering. Partial understanding leaves duality intact.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-amber-700">Mystical Experience:</span>
                  <span>The deepest meditative states point to non-dual consciousness. Advaitins argue the ultimate is experienced directly in samadhi.</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg bg-amber-50 p-8 border border-amber-200">
              <h3 className="mb-4 text-2xl font-bold text-amber-900">For Dualism</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="font-semibold text-amber-700">Relationship & Love:</span>
                  <span>Non-duality seems to erase the beloved. Dualism preserves genuine relationship, devotion, and love as ultimate values.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-amber-700">Practical Ethics:</span>
                  <span>How do you justify ethics if all separation is illusory? Dualism grounds moral responsibility in real relationships with real beings.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-amber-700">Experience of Multiplicity:</span>
                  <span>The world and individuals are manifestly real in experience. Why dismiss apparent reality as mere illusion?</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* What This Means for Practice */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold text-gray-900">What This Means for Practice</h2>
          <p className="mb-8 text-gray-700">
            These philosophical differences have radically different implications for spiritual practice:
          </p>
          <div className="space-y-8">
            {practiceImplications.map((item, index) => (
              <div key={index} className="rounded-lg border-l-4 border-amber-400 bg-gray-50 p-6">
                <h3 className="mb-4 text-xl font-bold text-gray-900">{item.view}</h3>
                <div className="space-y-3 text-gray-700">
                  <div>
                    <span className="font-semibold text-amber-700">Meditation Practice: </span>
                    <span>{item.meditation}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-amber-700">Liberation: </span>
                    <span>{item.liberation}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-amber-700">Ethics: </span>
                    <span>{item.ethics}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Great Thinkers on Each Side */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold text-gray-900">Great Thinkers on Each Side</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg bg-amber-50 p-8 border border-amber-200">
              <h3 className="mb-6 text-2xl font-bold text-amber-900">Non-Dual Philosophers</h3>
              <ul className="space-y-4 text-gray-700">
                <li>
                  <span className="font-semibold text-amber-700">Adi Shankara (788-820 CE)</span>
                  <p className="text-sm">Founder of Advaita Vedanta. Taught the identity of Atman and Brahman through rigorous scriptural analysis and logic.</p>
                </li>
                <li>
                  <span className="font-semibold text-amber-700">Ramana Maharshi (1879-1950)</span>
                  <p className="text-sm">Modern non-dual sage who taught self-inquiry as the direct path to awakening. His teaching is both philosophical and immediately practical.</p>
                </li>
                <li>
                  <span className="font-semibold text-amber-700">Nisargadatta Maharaj (1897-1981)</span>
                  <p className="text-sm">Radical non-dualist who taught that even the "I am" sense is ultimately transcended. Points directly to prior awareness.</p>
                </li>
              </ul>
            </div>
            <div className="rounded-lg bg-amber-50 p-8 border border-amber-200">
              <h3 className="mb-6 text-2xl font-bold text-amber-900">Dualist & Bhakti Philosophers</h3>
              <ul className="space-y-4 text-gray-700">
                <li>
                  <span className="font-semibold text-amber-700">Madhva (1238-1317)</span>
                  <p className="text-sm">Founder of Dvaita Vedanta. Argued forcefully for eternal distinction between God and soul; emphasized devotion and grace.</p>
                </li>
                <li>
                  <span className="font-semibold text-amber-700">Ramanuja (1017-1137)</span>
                  <p className="text-sm">Created Vishishtadvaita philosophy reconciling unity and distinction. Emphasized bhakti as the supreme path to liberation.</p>
                </li>
                <li>
                  <span className="font-semibold text-amber-700">C.S. Lewis (1898-1963)</span>
                  <p className="text-sm">Western dualist philosopher and theologian who argued for genuine relationship with the divine as transcendent reality.</p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Which View Is Correct */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold text-gray-900">Which View Is "Correct"?</h2>
          <div className="prose prose-lg max-w-none space-y-4 text-gray-700">
            <p>
              This is the wrong question. Both views are valid at their respective levels of inquiry. Non-dualism describes ultimate reality—the groundless ground of being itself. Dualism describes phenomenal reality—the apparent world of subjects and objects, God and souls, cause and effect.
            </p>
            <p>
              The non-dualist sage Nisargadatta Maharaj would point out that from the "highest" perspective, even the appearance of dualism is ultimately illusory. Yet from the relative level, dualism functions perfectly well and supports genuine spiritual practice, devotion, and ethics.
            </p>
            <p>
              Ramana Maharshi, another non-dualist, never dismissed devotion; he simply pointed out that investigation of the devotee leads to the recognition that the seeker and sought are not two. Similarly, great bhakti saints like Rumi or Kabir experienced profound non-dual mystical states while maintaining devotional language and practice.
            </p>
            <p>
              The resolution is not intellectual but experiential. Your direct investigation of consciousness, combined with authentic spiritual practice, reveals which view your reality aligns with. Many advanced practitioners move from dualistic devotional practice to non-dual realization—not as a contradiction, but as deepening clarity.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 p-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Deepen Your Understanding</h2>
          <p className="mb-8 text-lg text-gray-800">
            Explore the philosophical foundations of non-dual wisdom and how they apply to your spiritual practice.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link to="/advaita-vedanta-explained">
              <Button className="h-12 bg-gray-900 px-8 text-lg font-semibold text-white hover:bg-gray-800">
                Explore Advaita Vedanta
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/philosophies">
              <Button
                variant="outline"
                className="h-12 border-2 border-gray-900 px-8 text-lg font-semibold text-gray-900 hover:bg-gray-100"
              >
                View All Philosophies
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
