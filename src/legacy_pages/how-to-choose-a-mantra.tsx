import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Music, Sparkles, Clock } from "lucide-react";
import { HeroSection } from "@/components/landing/HeroSection";

export default function HowToChooseAMantra() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection
        title="How to Choose a Mantra"
        subtitle="Finding the sacred sound that resonates with your soul and spiritual path"
        backgroundImage="/images/mantra-hero.jpg"
      />

      <article className="max-w-4xl mx-auto px-6 py-16">
        {/* Article Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Music className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-semibold text-amber-600 uppercase tracking-wide">
              Sacred Sound
            </span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            How to Choose a Mantra: Complete Guide for Beginners
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            A mantra is more than words—it is a vibrational key to unlocking deeper states of consciousness. Whether you are beginning your spiritual practice or deepening an existing one, choosing the right mantra is a sacred decision that deserves thoughtful consideration.
          </p>
          <div className="flex items-center gap-4 text-gray-500 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>8 min read</span>
            </div>
            <span>•</span>
            <span>Spiritual Practice</span>
          </div>
        </div>

        {/* What Is a Mantra */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Is a Mantra?</h2>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            The word mantra comes from Sanskrit: "man" means mind, and "tra" means to liberate or transcend. A mantra is therefore a tool for liberating the mind from its habitual patterns and connecting with deeper dimensions of consciousness.
          </p>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Mantras are vibrational formulas that have been refined and tested across centuries of spiritual practice. When repeated with attention and intention, they work at subtle levels—calming the nervous system, restructuring thought patterns, and opening awareness to spiritual truth.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Four Traditional Types of Mantras:</h3>
            <ul className="space-y-3 text-gray-700">
              <li><strong>Seed Mantras (Bija Mantras):</strong> Single-syllable sounds like Om, Aim, and Hreem that carry specific vibrational frequencies</li>
              <li><strong>Deity Mantras:</strong> Invocations of divine qualities through sacred names like Om Namah Shivaya or Gayatri Mantra</li>
              <li><strong>Philosophical Mantras:</strong> Affirmations of non-dual truth like Aham Brahmasmi (I am Brahman) and Tat Tvam Asi (Thou Art That)</li>
              <li><strong>Universal Mantras:</strong> Om and its variations, transcending specific traditions and accessible to all seekers</li>
            </ul>
          </div>
        </section>

        {/* Why Mantra Selection Matters */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Mantra Selection Matters</h2>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            Not all mantras will resonate equally for every person. Your nervous system, spiritual stage, karmic tendencies, and life circumstances all influence which mantra will serve you most effectively. Choosing consciously ensures that your practice flows naturally rather than becoming forced or mechanical.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            The mantra you choose should match your intention, align with your spiritual tradition (if you follow one), and create a felt sense of resonance when you repeat it. A mantra that genuinely calls to you will sustain your practice through seasons of both enthusiasm and difficulty.
          </p>
        </section>

        {/* Four Ways to Receive a Mantra */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Four Ways to Receive a Mantra</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Self-Selected</h3>
              <p className="text-gray-700 mb-3">
                You choose a mantra that calls to you through study, intuition, or spiritual curiosity. This approach works well when you feel drawn to a particular practice or have researched mantras thoroughly. It honors your autonomy and inner wisdom.
              </p>
              <p className="text-sm text-gray-600">Best for: Self-directed practitioners and those exploring multiple traditions</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Guru-Given (Diksha)</h3>
              <p className="text-gray-700 mb-3">
                A qualified teacher initiates you into a specific mantra in a formal ceremony. This traditional approach transfers the mantra's power through the lineage and ensures you receive proper guidance for practice. The guru may perceive which mantra is most suited to your spiritual needs.
              </p>
              <p className="text-sm text-gray-600">Best for: Serious students entering a lineage or school</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Tradition-Assigned</h3>
              <p className="text-gray-700 mb-3">
                Your spiritual tradition assigns certain mantras for specific purposes or life stages. Many schools prescribe foundational mantras for all practitioners, creating coherence within the community and connecting you to centuries of accumulated practice.
              </p>
              <p className="text-sm text-gray-600">Best for: Members of established spiritual schools and lineages</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Intuitive/Meditative Reception</h3>
              <p className="text-gray-700 mb-3">
                Through meditation or inner listening, a mantra spontaneously arises in your awareness. This intuitive approach acknowledges that your deeper self knows what you need. Some traditions hold that the right mantra "finds" you at the right time.
              </p>
              <p className="text-sm text-gray-600">Best for: Experienced practitioners with developed inner sensitivity</p>
            </div>
          </div>
        </section>

        {/* Mantras by Spiritual Goal */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Mantras by Spiritual Goal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-amber-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Liberation & Moksha</h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Aham Brahmasmi</strong> — I am Brahman</li>
                <li><strong>Tat Tvam Asi</strong> — Thou art That</li>
                <li><strong>So Ham</strong> — I am That</li>
              </ul>
            </div>
            <div className="border border-amber-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Protection & Strength</h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Om Namah Shivaya</strong> — I bow to Shiva</li>
                <li><strong>Maha Mrityunjaya Mantra</strong> — Victory over death</li>
                <li><strong>Om Hum Namah</strong> — Protective shield</li>
              </ul>
            </div>
            <div className="border border-amber-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Devotion & Love</h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Om Namo Bhagavate Vasudevaya</strong> — Devotion to Krishna</li>
                <li><strong>Hare Krishna Hare Rama</strong> — Devotional prayer</li>
                <li><strong>Om Shreem Mahalakshmyai Namah</strong> — Goddess of abundance</li>
              </ul>
            </div>
            <div className="border border-amber-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Wisdom & Clarity</h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Om Aim Saraswatyai Namah</strong> — Goddess of wisdom</li>
                <li><strong>Gayatri Mantra</strong> — Illumination of consciousness</li>
                <li><strong>Om Gam Ganapataye Namah</strong> — Remover of obstacles</li>
              </ul>
            </div>
            <div className="border border-amber-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Peace & Harmony</h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Om Shanti Shanti Shanti</strong> — Peace, peace, peace</li>
                <li><strong>Lokah Samastah Sukhino Bhavantu</strong> — May all beings be happy</li>
                <li><strong>Om</strong> — The primordial sound</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How to Know If a Mantra Is Right */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Know If a Mantra Is Right for You</h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The clearest sign that a mantra is suited for you is a felt sense of rightness. This is not intellectual approval but a resonance that arises in your body and nervous system when you speak or hear the mantra.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Signs Your Mantra Is Right:</h3>
            <ul className="space-y-3 text-gray-700">
              <li><strong>Spontaneous Repetition:</strong> The mantra naturally arises in your mind throughout the day without effort</li>
              <li><strong>Calming Effect:</strong> Repeating it creates tangible relaxation in your nervous system</li>
              <li><strong>Resonance in Silence:</strong> When you stop repeating it, an inner vibration or stillness persists</li>
              <li><strong>Intuitive Recognition:</strong> You feel "Yes, this is mine" upon first encounter</li>
              <li><strong>Sustained Interest:</strong> Your interest in the mantra deepens rather than fades over weeks and months</li>
            </ul>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">
            Take time to sit with potential mantras. Repeat each one silently for five to ten minutes. Notice what arises—not just thoughts, but sensations, emotions, and subtle shifts in your state of being. Trust your body's intelligence.
          </p>
        </section>

        {/* Common Mantras for Beginners */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Six Common Mantras for Beginners</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-amber-600 bg-gray-50 p-6 rounded">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Om</h3>
              <p className="text-gray-700 mb-2"><strong>Meaning:</strong> The primordial sound of creation, encompassing all existence</p>
              <p className="text-gray-700"><strong>Best for:</strong> Universal accessibility, meditation beginners, anyone seeking connection to cosmic consciousness</p>
            </div>
            <div className="border-l-4 border-amber-600 bg-gray-50 p-6 rounded">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">So Ham</h3>
              <p className="text-gray-700 mb-2"><strong>Meaning:</strong> "I am That"—affirming your true nature as infinite consciousness</p>
              <p className="text-gray-700"><strong>Best for:</strong> Those seeking self-realization, those who resonate with non-dual philosophy, natural and easy practice</p>
            </div>
            <div className="border-l-4 border-amber-600 bg-gray-50 p-6 rounded">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Om Namah Shivaya</h3>
              <p className="text-gray-700 mb-2"><strong>Meaning:</strong> "I bow to Shiva"—invoking the divine principle of consciousness and transformation</p>
              <p className="text-gray-700"><strong>Best for:</strong> Those drawn to Hindu traditions, seekers of inner transformation, practitioners wanting a devotional anchor</p>
            </div>
            <div className="border-l-4 border-amber-600 bg-gray-50 p-6 rounded">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Gayatri Mantra</h3>
              <p className="text-gray-700 mb-2"><strong>Meaning:</strong> An ancient invocation for illumination and clarity of mind</p>
              <p className="text-gray-700"><strong>Best for:</strong> Students and those seeking wisdom, serious practitioners, those wanting a universally respected practice</p>
            </div>
            <div className="border-l-4 border-amber-600 bg-gray-50 p-6 rounded">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Hare Krishna</h3>
              <p className="text-gray-700 mb-2"><strong>Meaning:</strong> An invocation of divine grace and loving devotion</p>
              <p className="text-gray-700"><strong>Best for:</strong> Those with a devotional heart, anyone drawn to the path of bhakti, joyful practitioners</p>
            </div>
            <div className="border-l-4 border-amber-600 bg-gray-50 p-6 rounded">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Om Shanti Shanti Shanti</h3>
              <p className="text-gray-700 mb-2"><strong>Meaning:</strong> "Peace, peace, peace"—invoking peace at all levels of being</p>
              <p className="text-gray-700"><strong>Best for:</strong> Those seeking tranquility, anxious practitioners, anyone needing emotional stabilization</p>
            </div>
          </div>
        </section>

        {/* Important Considerations */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Important Considerations</h2>
          <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
            <p>
              <strong>Pronunciation Matters:</strong> Mantras work through their precise vibration. If you are uncertain about correct pronunciation, learn from audio recordings or an experienced teacher. The sound itself is the technology.
            </p>
            <p>
              <strong>Commit to Practice:</strong> Mantras show their power through consistency. Most traditions recommend a minimum of forty days of continuous practice to experience substantive effects. Choose a mantra you can commit to, not one that merely sounds interesting.
            </p>
            <p>
              <strong>Understand the Tradition:</strong> Each mantra exists within a philosophical and spiritual context. Understanding what your mantra represents—whether it invokes a deity, affirms truth, or addresses a specific need—deepens its efficacy and your respect for the practice.
            </p>
            <p>
              <strong>Consider Initiation:</strong> If you follow a particular spiritual tradition, receiving formal initiation into a mantra honors that lineage and connects you to the blessing and power transmitted through generations of practitioners. Many traditions recommend this over self-selection.
            </p>
            <p>
              <strong>One Mantra or Many?:</strong> Beginners benefit most from working with a single mantra before exploring others. This allows your nervous system to fully attune to its vibration. Once you have established a strong primary practice, you may explore complementary mantras for specific intentions.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg p-8 md:p-12 text-white">
          <div className="flex items-start gap-4 mb-6">
            <Sparkles className="w-8 h-8 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-3xl font-bold mb-3">Begin Your Mantra Practice</h2>
              <p className="text-lg mb-6 text-amber-50">
                Now that you understand how to choose a mantra, take the next step in your spiritual journey. Explore practical techniques for japa practice and discover ten powerful Sanskrit mantras suited to different spiritual goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/how-to-start-japa">
                  <Button className="bg-white text-amber-600 hover:bg-amber-50 w-full sm:w-auto">
                    How to Start Japa Practice
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/10-powerful-sanskrit-mantras">
                  <Button className="bg-amber-700 text-white hover:bg-amber-800 w-full sm:w-auto">
                    10 Powerful Sanskrit Mantras
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
