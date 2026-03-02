import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sun, Moon, Clock } from "lucide-react";
import { HeroSection } from "@/components/landing/HeroSection";

export default function DailySpiritualRoutineBeginners() {
  return (
    <div className="w-full">
      <HeroSection
        title="Build Your Spiritual Foundation"
        subtitle="Daily practices that transform your inner life"
        backgroundImage="url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=600&fit=crop')"
      />

      <article className="min-h-screen bg-white">
        <div className="mx-auto max-w-2xl px-6 py-12">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2">
              <Sun className="h-4 w-4 text-amber-700" />
              <span className="text-sm font-medium text-amber-900">Spiritual Practice</span>
            </div>
          </div>

          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Daily Spiritual Routine for Beginners: A Simple Morning Practice
          </h1>

          <p className="mb-6 text-xl text-gray-600">
            How to build a consistent spiritual practice from scratch — even with 15 minutes a day
          </p>

          <div className="mb-8 flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>12 min read</span>
            </div>
            <span>•</span>
            <span>Updated March 2026</span>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="mt-12 mb-4 text-2xl font-bold text-gray-900">
              Why a Daily Routine Matters
            </h2>
            <p className="text-gray-700 mb-6">
              Many seekers approach spirituality with intensity and enthusiasm, spending long hours in retreat or practice. Yet this approach often falters. Research in neuroscience demonstrates that consistency beats intensity. Regular, modest practice rewires neural pathways more effectively than sporadic intensive effort.
            </p>
            <p className="text-gray-700 mb-6">
              This principle is ancient. The Hindu concept of Sandhya — the sacred transitional time of dawn — recognizes that morning practice attunes consciousness during the day's most spiritually potent hours. A brief daily practice creates a momentum that sustains your inner transformation far more reliably than occasional lengthy sessions.
            </p>
            <p className="text-gray-700 mb-8">
              By establishing a non-negotiable morning routine, you create a container for growth. You signal to yourself, and to the universe, that spiritual development is a priority. This commitment gradually rewires your entire being.
            </p>

            <h2 className="mt-12 mb-8 text-2xl font-bold text-gray-900">
              The Five Core Elements
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-8">
              <div className="rounded-lg bg-amber-50 p-6 border border-amber-200">
                <h3 className="font-bold text-gray-900 mb-3">Meditation</h3>
                <p className="text-gray-700 text-sm">
                  The foundation of any spiritual practice. Even 5-10 minutes of sitting in silence trains attention and reveals the nature of mind. Begin with simple breath awareness.
                </p>
              </div>

              <div className="rounded-lg bg-amber-50 p-6 border border-amber-200">
                <h3 className="font-bold text-gray-900 mb-3">Prayer or Mantra</h3>
                <p className="text-gray-700 text-sm">
                  Vocalize your intention. Whether a traditional mantra, prayer, or affirmation spoken aloud, this activates your whole being and creates resonance with the sacred dimension.
                </p>
              </div>

              <div className="rounded-lg bg-amber-50 p-6 border border-amber-200">
                <h3 className="font-bold text-gray-900 mb-3">Breathwork (Pranayama)</h3>
                <p className="text-gray-700 text-sm">
                  Conscious breathing directly influences the nervous system and prana. Simple techniques like alternate nostril breathing calm the mind and energize the body.
                </p>
              </div>

              <div className="rounded-lg bg-amber-50 p-6 border border-amber-200">
                <h3 className="font-bold text-gray-900 mb-3">Reading or Study</h3>
                <p className="text-gray-700 text-sm">
                  Engage sacred texts or spiritual teachings. This intellectual anchor prevents practice from becoming vague. Read one passage slowly, allowing its meaning to penetrate.
                </p>
              </div>

              <div className="rounded-lg bg-amber-50 p-6 border border-amber-200">
                <h3 className="font-bold text-gray-900 mb-3">Journaling</h3>
                <p className="text-gray-700 text-sm">
                  Record insights, challenges, or simply stream your thoughts. This externalizes the mind and creates continuity between sessions, tracking your gradual transformation.
                </p>
              </div>
            </div>

            <h2 className="mt-12 mb-6 text-2xl font-bold text-gray-900">
              The 15-Minute Morning Routine
            </h2>
            <p className="text-gray-700 mb-6">
              If you're starting out, fifteen minutes is sufficient to establish a genuine practice. Here's the structure:
            </p>
            <ul className="space-y-3 text-gray-700 mb-8">
              <li><strong>Minutes 0-1:</strong> Settle into a comfortable seated position. Close your eyes and take three deep breaths.</li>
              <li><strong>Minutes 1-2:</strong> Speak your intention or prayer aloud, slowly and with presence.</li>
              <li><strong>Minutes 2-7:</strong> Meditation. Focus on your breath or a mantra. When attention wanders, gently return without judgment.</li>
              <li><strong>Minutes 7-9:</strong> Pranayama. Practice three rounds of alternate nostril breathing or simple extended exhale.</li>
              <li><strong>Minutes 9-12:</strong> Read one short passage from a spiritual text. Contemplate a single sentence if needed.</li>
              <li><strong>Minutes 12-15:</strong> Journal. Write three things: one insight, one gratitude, one intention for the day.</li>
            </ul>

            <h2 className="mt-12 mb-6 text-2xl font-bold text-gray-900">
              The 30-Minute Routine
            </h2>
            <p className="text-gray-700 mb-6">
              As your practice deepens, you may extend to thirty minutes, allowing deeper states and more thorough engagement:
            </p>
            <ul className="space-y-3 text-gray-700 mb-8">
              <li><strong>Minutes 0-2:</strong> Opening. Settle, light a candle if desired, and speak your intention with genuine feeling.</li>
              <li><strong>Minutes 2-5:</strong> Pranayama. Practice breathing techniques to balance and energize.</li>
              <li><strong>Minutes 5-20:</strong> Meditation. Allow deeper silence and absorption to emerge.</li>
              <li><strong>Minutes 20-25:</strong> Reading and contemplation. Engage more fully with sacred text, allowing it to speak to your current circumstances.</li>
              <li><strong>Minutes 25-30:</strong> Journaling and closure. Record insights and set intentions with specificity.</li>
            </ul>

            <h2 className="mt-12 mb-8 text-2xl font-bold text-gray-900">
              Five Common Beginner Mistakes
            </h2>

            <div className="space-y-4 mb-8">
              <div className="rounded-lg bg-amber-50 p-4 border border-amber-200">
                <h4 className="font-bold text-gray-900 mb-2">Chasing Experiences</h4>
                <p className="text-gray-700 text-sm">
                  Beginners often expect bliss or visions. When they don't arrive, they doubt their practice. Spiritual development is gradual and mostly invisible. Trust the process.
                </p>
              </div>

              <div className="rounded-lg bg-amber-50 p-4 border border-amber-200">
                <h4 className="font-bold text-gray-900 mb-2">Perfectionism</h4>
                <p className="text-gray-700 text-sm">
                  Abandoning practice because you "missed a day" or "did it wrong" is self-sabotage. A sloppy practice is infinitely better than no practice. Show up consistently.
                </p>
              </div>

              <div className="rounded-lg bg-amber-50 p-4 border border-amber-200">
                <h4 className="font-bold text-gray-900 mb-2">Overcomplicating Technique</h4>
                <p className="text-gray-700 text-sm">
                  Complex mantras or advanced pranayama won't accelerate results. Simple breath awareness and repetition of a chosen mantra are most powerful for beginners.
                </p>
              </div>

              <div className="rounded-lg bg-amber-50 p-4 border border-amber-200">
                <h4 className="font-bold text-gray-900 mb-2">Neglecting Consistency</h4>
                <p className="text-gray-700 text-sm">
                  A 45-minute practice once weekly creates less transformation than 15 minutes daily. The nervous system requires repetition to rewire. Frequency matters more than duration.
                </p>
              </div>

              <div className="rounded-lg bg-amber-50 p-4 border border-amber-200">
                <h4 className="font-bold text-gray-900 mb-2">Isolating From Community</h4>
                <p className="text-gray-700 text-sm">
                  Solo practice is valuable, but spiritual community provides accountability, teaching, and collective energy. Seek both solitude and sangha (community).
                </p>
              </div>
            </div>

            <h2 className="mt-12 mb-6 text-2xl font-bold text-gray-900">
              How to Stay Consistent
            </h2>
            <p className="text-gray-700 mb-6">
              Consistency requires practical strategy, not just willpower:
            </p>
            <ul className="space-y-4 text-gray-700 mb-8">
              <li><strong>Same time, same place:</strong> Your body and mind learn to enter the spiritual state at a particular time and location. Practice immediately upon waking, before your day's demands intrude.</li>
              <li><strong>Start impossibly small:</strong> If fifteen minutes feels daunting, begin with five. Establish the habit first, then expand duration naturally.</li>
              <li><strong>Habit stacking:</strong> Attach practice to an existing routine. Meditate immediately after making coffee. Journal while drinking tea. Link it to something non-negotiable.</li>
              <li><strong>Track visibly:</strong> Mark a calendar when you practice. The unbroken chain becomes its own motivation.</li>
              <li><strong>Prepare the night before:</strong> Set out your meditation cushion, journal, and text. Remove friction so morning practice is effortless.</li>
            </ul>

            <h2 className="mt-12 mb-6 text-2xl font-bold text-gray-900">
              Adapting Across Spiritual Traditions
            </h2>
            <p className="text-gray-700 mb-6">
              The core elements transcend any single tradition. Here's how different practices structure morning discipline:
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Hindu practitioners</strong> often begin with pranayama and chanting of Gayatri Mantra at dawn, followed by meditation on the form of the deity, and reading from the Bhagavad Gita or Upanishads. The concept of Brahma Muhurta—the auspicious hours before sunrise—emphasizes the power of early morning.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Buddhist practitioners</strong> typically begin with mindfulness meditation, reviewing ethical precepts, and studying Buddha's teachings. The emphasis is on developing compassion and insight into the nature of suffering and interdependence.
            </p>
            <p className="text-gray-700 mb-6">
              <strong>Sufi practitioners</strong> begin with dawn prayer (Fajr), recitation of divine names (dhikr), and contemplation. The heart is opened through devotional practice and remembrance of the Divine.
            </p>
            <p className="text-gray-700 mb-8">
              Regardless of tradition, the principle remains: consecrate your morning to the sacred, establish consistency, and allow practice to gradually purify and transform your consciousness.
            </p>
          </div>
        </div>

        <section className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 py-16">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Ready to Begin?
            </h2>
            <p className="mb-8 text-lg text-gray-700">
              Start your spiritual practice today. Begin with just 15 minutes each morning and watch how it transforms your life.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to="/app">
                <Button size="lg" className="w-full bg-amber-700 hover:bg-amber-800 text-white">
                  Start Your Practice
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/practical-spiritual-practices">
                <Button size="lg" variant="outline" className="w-full border-amber-700 text-amber-700 hover:bg-amber-50">
                  Explore More Practices
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
