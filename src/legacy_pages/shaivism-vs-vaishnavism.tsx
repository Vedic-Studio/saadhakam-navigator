// @ts-nocheck

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Heart, Flame, Lotus } from "lucide-react";
import { HeroSection } from "@/components/landing/HeroSection";

export default function ShaivismVsVaishnavism() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Article Header */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200 py-12">
        <div className="container-padding max-w-4xl mx-auto">
          <div className="inline-block bg-white border border-amber-300 rounded-full px-4 py-2 mb-6">
            <span className="text-sm font-semibold text-amber-700">Hindu Traditions</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Shaivism vs Vaishnavism: Key Differences Explained
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Two of Hinduism's greatest devotional paths — and what sets them apart
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Reading time: 12 minutes</span>
            <span>•</span>
            <span>Updated March 2026</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container-padding max-w-4xl mx-auto py-16">
        {/* Introduction */}
        <section className="prose prose-lg max-w-none mb-16">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Within the vast tapestry of Hindu spirituality, two great traditions have flourished for thousands of years, each offering a distinct path to the divine: Shaivism and Vaishnavism. While both are rooted in the Vedas and share fundamental Hindu concepts like dharma, karma, and moksha, they differ profoundly in their understanding of the ultimate reality, their chosen deities, and their spiritual practices. Understanding these traditions is essential for anyone seeking to comprehend Hindu philosophy and spirituality.
          </p>
        </section>

        {/* Section 1: What Are These Traditions? */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">What Are These Traditions?</h2>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-amber-900 mb-4">A Brief Overview</h3>
            <p className="text-foreground mb-4">
              Shaivism is the tradition centered on Shiva as the supreme consciousness and ultimate reality. Followers of Shaivism view Shiva as the transcendent lord who exists beyond all manifestation, while simultaneously being the inner essence of all existence. Shaivism emphasizes meditation, asceticism, and the transformation of the individual consciousness.
            </p>
            <p className="text-foreground">
              Vaishnavism, by contrast, focuses on Vishnu (or his avatars Krishna and Rama) as the supreme personality of godhead. Vaishnavites believe that Vishnu actively maintains the universe and that devotion (bhakti) to his divine form is the highest path to liberation. The relationship between the devotee and the divine is characterized by love, surrender, and personal connection.
            </p>
          </div>
        </section>

        {/* Section 2: Core Beliefs Comparison */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Core Beliefs: A Comparative Framework</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Shaivism Card */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-4">
                <Flame className="w-6 h-6 text-amber-700" />
                <h3 className="text-2xl font-bold text-amber-900">Shaivism</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-amber-900 mb-2">Supreme Reality</h4>
                  <p className="text-sm text-foreground">
                    Shiva is the transcendent consciousness, the eternal destroyer and transformer. Beyond all form and attribute, yet present in all manifestation.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-900 mb-2">Nature of Reality</h4>
                  <p className="text-sm text-foreground">
                    The cosmos emerges from Shiva's divine energy (Shakti). The universe is real, not illusion, and participates in divine consciousness.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-900 mb-2">Primary Goal</h4>
                  <p className="text-sm text-foreground">
                    Liberation (moksha) through understanding one's unity with Shiva. Realization of the self as Shiva consciousness.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-900 mb-2">Divine Nature</h4>
                  <p className="text-sm text-foreground">
                    Transcendent and formless, though worshipped through the lingam symbol representing the creative force.
                  </p>
                </div>
              </div>
            </div>

            {/* Vaishnavism Card */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-amber-700" />
                <h3 className="text-2xl font-bold text-amber-900">Vaishnavism</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-amber-900 mb-2">Supreme Reality</h4>
                  <p className="text-sm text-foreground">
                    Vishnu is the supreme personality of godhead, the eternal maintainer and protector of all existence.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-900 mb-2">Nature of Reality</h4>
                  <p className="text-sm text-foreground">
                    God and creation are eternally distinct yet connected. Vishnu pervades all but remains separate as the supreme person.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-900 mb-2">Primary Goal</h4>
                  <p className="text-sm text-foreground">
                    Loving devotion to Vishnu/Krishna leading to eternal relationship with the divine in the spiritual realm.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-900 mb-2">Divine Nature</h4>
                  <p className="text-sm text-foreground">
                    Personal and intimate, with divine names, forms, and pastimes that inspire devotion and love.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Key Texts */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Sacred Texts and Authority</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-700" />
              Shaivism's Scriptural Foundation
            </h3>
            <div className="bg-white border border-amber-200 rounded-lg p-6">
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="font-semibold text-amber-700 min-w-fit">Shiva Puranas:</span>
                  <span className="text-foreground">Sacred texts that recount Shiva's nature, exploits, and teachings. The Linga Purana and Shiva Purana contain foundational myths and spiritual wisdom.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-amber-700 min-w-fit">The Agamas:</span>
                  <span className="text-foreground">Tantric scriptures that provide detailed instructions for meditation, yoga, ritual practices, and the worship of Shiva. These texts form the practical basis of Shaivite practice.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-amber-700 min-w-fit">Upanishads:</span>
                  <span className="text-foreground">Particularly those sections that emphasize non-dual consciousness and the formless Brahman, interpreted by Shaivite philosophers as Shiva.</span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-700" />
              Vaishnavism's Scriptural Foundation
            </h3>
            <div className="bg-white border border-amber-200 rounded-lg p-6">
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="font-semibold text-amber-700 min-w-fit">Bhagavad Gita:</span>
                  <span className="text-foreground">Krishna's direct teachings to Arjuna on dharma, yoga, and devotion. Considered the most important scripture, emphasizing surrender to Krishna as the path to liberation.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-amber-700 min-w-fit">Bhagavata Purana:</span>
                  <span className="text-foreground">Celebrates Vishnu's avatars, especially Krishna, and describes his divine pastimes. Emphasizes pure devotion (shuddha-bhakti) as the highest spiritual attainment.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-amber-700 min-w-fit">Brahma Sutras:</span>
                  <span className="text-foreground">Aphorisms on Brahman interpreted by Vaishnavite philosophers as supporting the personality of Godhead and divine relationships.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Spiritual Practices */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Spiritual Practices and Worship</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white border border-amber-200 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-amber-900 mb-6">Shaivite Practices</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Lingam Worship</h4>
                  <p className="text-sm text-muted-foreground">
                    The lingam represents Shiva's creative and transcendent nature. Devotees meditate on it as a symbol of the infinite consciousness.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Shivaratri</h4>
                  <p className="text-sm text-muted-foreground">
                    The "Night of Shiva" observed with all-night vigils, meditation, fasting, and chanting of mantras. Central annual celebration in Shaivism.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Vibhuti and Rudraksha</h4>
                  <p className="text-sm text-muted-foreground">
                    Sacred ash (vibhuti) applied to the body and rudraksha beads worn for protection and spiritual elevation.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Yoga and Meditation</h4>
                  <p className="text-sm text-muted-foreground">
                    Kundalini yoga, pranayama, and Tantric practices aimed at merging individual consciousness with Shiva consciousness.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-amber-200 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-amber-900 mb-6">Vaishnav Practices</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Nama-Sankirtana</h4>
                  <p className="text-sm text-muted-foreground">
                    Chanting the holy names of Krishna or Vishnu, especially the Hare Krishna mantra. Considered the most powerful spiritual practice for the modern age.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Ekadashi Fasting</h4>
                  <p className="text-sm text-muted-foreground">
                    Observing fast on the eleventh day of the lunar cycle to increase devotion and purify the mind.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Tulsi Worship</h4>
                  <p className="text-sm text-muted-foreground">
                    The sacred basil plant is venerated as an embodiment of devotion to Krishna and brought into homes for spiritual benefit.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Bhakti and Surrender</h4>
                  <p className="text-sm text-muted-foreground">
                    Emotional devotion to Krishna, seeking refuge in him and cultivating loving relationships through mantra, music, and prayer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Notable Saints and Teachers */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Great Saints and Teachers</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-amber-200 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-amber-900 mb-6">Shaivism's Great Masters</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Adi Shankara</h4>
                  <p className="text-sm text-muted-foreground">
                    8th-century philosopher who systematized Advaita Vedanta, interpreting the Upanishads through a non-dual Shaivite lens. Founded four cardinal monasteries and organized monastic orders.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Basavanna</h4>
                  <p className="text-sm text-muted-foreground">
                    12th-century reformer who founded Lingayatism, a Shaivite movement emphasizing direct relationship with Shiva, rejecting caste discrimination and ritual formalism.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">The Nayanmars</h4>
                  <p className="text-sm text-muted-foreground">
                    South Indian Shaivite saints (6th-8th centuries) whose devotional poetry and teachings transformed Shaivism into a powerful bhakti movement that continues to inspire.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-amber-200 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-amber-900 mb-6">Vaishnavism's Great Masters</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Ramanuja</h4>
                  <p className="text-sm text-muted-foreground">
                    11th-century philosopher who formulated Vishishtadvaita (qualified non-duality), teaching that the soul is eternally distinct yet inseparable from Vishnu. Champion of bhakti.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Sri Chaitanya</h4>
                  <p className="text-sm text-muted-foreground">
                    15th-century saint who revolutionized Vaishnavism through ecstatic devotion to Krishna. Founded the Gaudiya Vaishnav tradition and popularized kirtana chanting.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">The Alvars</h4>
                  <p className="text-sm text-muted-foreground">
                    South Indian Vaishnav saints (6th-9th centuries) whose passionate poetry to Vishnu and Krishna established the bhakti movement and influenced all later Vaishnav schools.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Philosophical Nuances */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Philosophical Perspectives</h2>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-8">
            <p className="text-foreground mb-4">
              While both traditions honor the Vedas, they interpret them differently. Shaivism, particularly through Advaita Vedanta, emphasizes the non-dual nature of reality where Brahman (identified with Shiva) is the sole ultimate truth, and individual souls are ultimately identical with this consciousness. The material world is understood as both real and a manifestation of Shiva's divine energy (Maya or Shakti).
            </p>
            <p className="text-foreground mb-4">
              Vaishnavism, particularly through Vishishtadvaita, maintains that while all souls are parts of Vishnu and the creation is his manifestation, there remains an eternal distinction between God and individual souls. This qualified non-duality preserves the intimate relationship between devotee and deity—the lover and the beloved—which is central to Vaishnav theology and practice.
            </p>
            <p className="text-foreground">
              A third Vaishnav perspective, Dvaita (complete duality), affirms the eternal distinctness of individual souls from Vishnu, maintaining that devotion and service in this differentiated relationship is the highest path. These varied philosophical approaches reflect different ways of understanding the relationship between the individual, the world, and the divine.
            </p>
          </div>
        </section>

        {/* Section 7: Which Path Is Right For You? */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Which Path Resonates With Your Nature?</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-amber-200 rounded-lg p-8">
              <h3 className="text-lg font-semibold text-amber-900 mb-4">Shaivism May Appeal to You If:</h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-amber-700 font-bold">•</span>
                  <span className="text-foreground">You are drawn to deep meditation and introspection, seeking to merge with the infinite consciousness within.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-700 font-bold">•</span>
                  <span className="text-foreground">You appreciate philosophical inquiry and intellectual exploration of non-dual truth.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-700 font-bold">•</span>
                  <span className="text-foreground">You are drawn to yoga, pranayama, and the transformation of energy through subtle body practices.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-700 font-bold">•</span>
                  <span className="text-foreground">You see the divine as transcendent, formless, and beyond all attributes and limitations.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-700 font-bold">•</span>
                  <span className="text-foreground">You appreciate the symbolism of transformation, destruction leading to renewal, and the sacred masculine principle.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-amber-200 rounded-lg p-8">
              <h3 className="text-lg font-semibold text-amber-900 mb-4">Vaishnavism May Appeal to You If:</h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-amber-700 font-bold">•</span>
                  <span className="text-foreground">You are drawn to devotion, love, and personal relationship with the divine.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-700 font-bold">•</span>
                  <span className="text-foreground">You find meaning in divine stories, incarnations, and the pastimes of Krishna or Rama.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-700 font-bold">•</span>
                  <span className="text-foreground">You are moved by chanting, music, dance, and the emotional expression of faith.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-700 font-bold">•</span>
                  <span className="text-foreground">You see divinity as personal, intimate, and deeply concerned with creation and its welfare.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-700 font-bold">•</span>
                  <span className="text-foreground">You are drawn to community worship, celebration, and the path of surrender and service.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 8: Common Ground */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Finding Common Ground</h2>
          <div className="bg-white border border-amber-200 rounded-lg p-8">
            <p className="text-foreground mb-4">
              Despite their differences, Shaivism and Vaishnavism share profound spiritual truths. Both traditions acknowledge the reality of karma, the importance of dharma (righteousness), and the ultimate goal of liberation (moksha) from the cycle of birth and death. Both respect the Vedas as authoritative scripture and recognize the value of yoga, meditation, and ethical living as essential to spiritual progress.
            </p>
            <p className="text-foreground mb-4">
              Many Hindu practitioners do not see these traditions as mutually exclusive. It is common to honor both Shiva and Vishnu, recognizing them as complementary expressions of the divine. Hindu temples often contain shrines to both deities, and many spiritual seekers study the wisdom of both traditions, understanding that they may emphasize different aspects of the one eternal truth.
            </p>
            <p className="text-foreground">
              The great saints of both traditions—from Adi Shankara to Sri Chaitanya—demonstrated that sincere devotion and rigorous practice lead to profound realization, regardless of which form the devotee chooses to worship. The ultimate truth transcends sectarian boundaries, and both paths lead those who walk them earnestly toward enlightenment and liberation.
            </p>
          </div>
        </section>

        {/* Final Insight */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-8">
            <p className="text-foreground text-lg leading-relaxed">
              Whether you are drawn to the transcendent silence of Shiva or the loving presence of Krishna, whether you seek to realize your unity with the infinite or to nurture an eternal relationship with the divine, both Shaivism and Vaishnavism offer profound paths to awakening. The invitation is the same: turn within, cultivate steadfastness, and let the teachings guide you toward your highest potential.
            </p>
          </div>
        </section>
      </main>

      {/* Call to Action */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 py-16 border-t border-amber-200">
        <div className="container-padding max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Discover Your Path
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Begin your journey with guided practices, sacred texts, and wisdom from both great traditions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/faith-finder">
              <Button size="lg" className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white">
                Find Your Spiritual Path
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/traditions">
              <Button variant="outline" size="lg">
                Explore All Traditions
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
