// @ts-nocheck

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Star, Clock } from "lucide-react";
import { HeroSection } from "@/components/landing/HeroSection";

export default function AdiShankaracharyaLifeTeachings() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <HeroSection
        title="Adi Shankaracharya"
        subtitle="The 8th century philosopher who unified Hinduism and established Advaita Vedanta"
        backgroundImage="/images/heroes/adi-shankaracharya.jpg"
      />

      {/* Article Header */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center gap-2 mb-6">
          <Star className="w-4 h-4 text-amber-600 fill-amber-600" />
          <span className="text-sm font-semibold text-amber-900">Ancient Wisdom</span>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Adi Shankaracharya: Life, Philosophy, and Teachings
        </h1>
        <p className="text-xl text-gray-700 mb-6">
          The 8th century philosopher who unified Hinduism and established Advaita Vedanta
        </p>
        <div className="flex items-center gap-6 text-gray-600 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>12 min read</span>
          </div>
          <div>By OpenSadhana</div>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-6 pb-16">
        
        {/* Who Was Adi Shankaracharya */}
        <section className="prose prose-lg max-w-none mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Who Was Adi Shankaracharya?</h2>
          <p className="text-gray-700 leading-relaxed">
            Adi Shankaracharya (788–820 CE) was an Indian philosopher and spiritual master who revitalized Hinduism and established Advaita Vedanta as one of the most profound philosophical schools of non-dualism. Born in Kaladi, Kerala, in South India, Shankara displayed extraordinary intellectual prowess from childhood, mastering Sanskrit and the Vedas by age eight. At this remarkably young age, he renounced worldly life to become a sannyasi (monk) and spent the remainder of his brief but immensely impactful life traveling throughout India, debating philosophers, establishing monastic traditions, and composing extensive commentaries on sacred texts.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Though he lived only thirty-two years, Shankaracharya left an indelible mark on spiritual thought and practice. His direct realization of Brahman—the ultimate non-dual reality—and his brilliant articulation of this truth through logical reasoning and scriptural interpretation influenced Hindu philosophy for over a thousand years. His guru, Govindapada (and Govinda's guru, Gaudapada), transmitted the teaching of Advaita Vedanta to Shankara, who then systematized and defended it against all opposing philosophical schools.
          </p>
        </section>

        {/* Life Journey */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">The Life Journey of a Spiritual Genius</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2">Birth in Kaladi (788 CE)</h3>
              <p className="text-gray-700 text-sm">Born in Kerala to Brahmin parents. Showed exceptional intelligence and mastery of Vedic knowledge from infancy.</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2">Early Renunciation (796 CE)</h3>
              <p className="text-gray-700 text-sm">At age eight, convinced his reluctant mother to permit him sannyasa. Left home to seek a spiritual master.</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2">Meeting Govindapada (800 CE)</h3>
              <p className="text-gray-700 text-sm">Found his guru on the banks of the Narmada River. Received intense spiritual instruction and direct transmission of Advaita teachings.</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2">Debate with Mandana Misra</h3>
              <p className="text-gray-700 text-sm">Engaged in a famous philosophical debate with Mandana Misra, the greatest Mimamsa scholar of his time, and won, gaining disciples.</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2">Establishing Four Mathas (810–815 CE)</h3>
              <p className="text-gray-700 text-sm">Founded monasteries to preserve and propagate Advaita Vedanta throughout India, establishing monastic traditions.</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2">Mahasamadhi (820 CE)</h3>
              <p className="text-gray-700 text-sm">Conscious departure from the body at age thirty-two, having completed his life's mission of spiritual renewal.</p>
            </div>
          </div>
        </section>

        {/* Core Philosophy */}
        <section className="prose prose-lg max-w-none mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">The Philosophy of Advaita Vedanta</h2>
          <p className="text-gray-700 leading-relaxed">
            Advaita Vedanta, the philosophy systematized by Shankara, is a radical non-dualistic vision of reality. The word "Advaita" means "not-two," pointing to the ultimate truth that there is only one infinite, eternal, all-pervasive reality: Brahman. This is not a theory to be intellectually grasped but a direct realization to be experientially known.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Shankaracharya taught four fundamental truths: First, Brahman alone is ultimately real. It is consciousness, infinite, eternal, and attributeless—beyond name, form, time, and space. Second, the world of multiplicity (jagat) has a lower or empirical reality but is not ultimately real; it is maya—the mysterious power of illusion that appears within Brahman without affecting its unchanging nature. Third, the individual self (atman) is none other than Brahman—the innermost essence of every being is identical with the Supreme Reality. This is the meaning of the great Upanishadic mahavakya: "Tat Tvam Asi" (That Thou Art). Fourth, liberation (moksha) is the direct realization of one's true nature as infinite consciousness, which is not a future attainment but the uncovering of what has always been true.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Shankaracharya also taught the doctrine of the three bodies: the physical body (visible to the senses), the subtle body (the seat of mind, intellect, and ego), and the causal body (the repository of karmic impressions). These bodies are superimposed upon the eternal atman, like the appearance of a snake superimposed upon a rope. Through discrimination (viveka), one recognizes that the true self is the unchanging witness of all bodily and mental changes.
          </p>
        </section>

        {/* Key Teachings */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Teachings for the Path of Liberation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-amber-900 mb-3">Viveka (Discrimination)</h3>
              <p className="text-gray-700">The capacity to distinguish between the eternal and the temporary, the real and the unreal, the self and the non-self. This discrimination is the foundation of spiritual practice.</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-amber-900 mb-3">Vairagya (Dispassion)</h3>
              <p className="text-gray-700">Detachment from worldly pleasures arising from the recognition that they are fleeting and cannot provide lasting fulfillment. This leads to passionate pursuit of spiritual truth.</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-amber-900 mb-3">Shatsampat (The Six Virtues)</h3>
              <p className="text-gray-700">Mental discipline (mind control), sense control, withdrawal from distraction, forbearance of opposites, faith in guru and scriptures, and earnest desire for liberation.</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-amber-900 mb-3">Mumukshutva (Burning Desire)</h3>
              <p className="text-gray-700">An intense, all-consuming yearning for liberation and realization of Brahman. This desire must become the predominant orientation of life.</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-amber-900 mb-3">Guru Worship and Faith</h3>
              <p className="text-gray-700">Surrender to an illumined master is essential. The guru transmits the teaching directly and guides the disciple through the final realization beyond intellectual knowledge.</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-amber-900 mb-3">Self-Inquiry and Meditation</h3>
              <p className="text-gray-700">Through the inquiry "Who am I?"—negating all that can be known as objects—the seeker realizes their true nature as the eternal, unchanging consciousness.</p>
            </div>
          </div>
        </section>

        {/* Major Works */}
        <section className="prose prose-lg max-w-none mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">The Major Literary Works of Shankaracharya</h2>
          <p className="text-gray-700 leading-relaxed">
            Despite his brief life, Shankaracharya left a vast body of philosophical and devotional writings. His works remain the foundation of Advaita Vedanta scholarship and are studied in monasteries and universities worldwide.
          </p>
          <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Commentaries (Bhashyas)</h3>
          <p className="text-gray-700 leading-relaxed">
            Shankaracharya wrote comprehensive commentaries on the principal Upanishads, the Brahma Sutras, and the Bhagavad Gita. These works are masterpieces of exegesis, reconciling apparent contradictions in scripture while maintaining the non-dualistic vision. The Brahma Sutra Bhashya is considered his most systematic exposition of Advaita philosophy. His Bhagavad Gita commentary is celebrated for its clarity and depth, showing how the Gita's teachings support non-dualism.
          </p>
          <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Vivekachudamani (The Crest-Jewel of Discrimination)</h3>
          <p className="text-gray-700 leading-relaxed">
            This poetic work of 580 verses is perhaps Shankaracharya's most accessible teaching. It describes the qualifications of a seeker, the method of self-inquiry, and the stages of realization. For centuries, spiritual seekers have studied this text as a practical guide to liberation.
          </p>
          <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Bhaja Govindam (Seek Govinda)</h3>
          <p className="text-gray-700 leading-relaxed">
            A devotional poem of fourteen verses urging the seeker to abandon the pursuit of worldly knowledge and gain and instead meditate on the divine. Though devotional in form, it communicates the essence of Advaita: the world is illusory, and only meditation on Brahman brings liberation.
          </p>
          <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Soundarya Lahari (The Flood of Beauty)</h3>
          <p className="text-gray-700 leading-relaxed">
            A work of 41 verses celebrating the supreme goddess in her various forms, balancing the masculine principle of formless Brahman with the feminine creative power (Shakti). This integrates the devotional path with non-dual realization.
          </p>
        </section>

        {/* The Four Mathas */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">The Four Mathas: Pillars of Advaita Tradition</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            To preserve and propagate Advaita Vedanta, Shankaracharya established four monasteries at the cardinal directions of India, each led by a head monk (Shankaracharya). These institutions have maintained spiritual lineages and scholarly traditions for over 1,200 years.
          </p>
          <div className="space-y-4">
            <div className="bg-white border-2 border-amber-300 rounded-lg p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-2">Sringeri Matha (South) - Karnataka</h3>
              <p className="text-gray-700 mb-3">Located in the Sahyadri mountains of Karnataka, Sringeri Matha is the oldest of the four, established to oversee spiritual practice in southern India. Its mahavakya is "Tat Tvam Asi" (That Thou Art), emphasizing the identity of the individual self with Brahman.</p>
            </div>
            <div className="bg-white border-2 border-amber-300 rounded-lg p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-2">Dwarka Matha (West) - Gujarat</h3>
              <p className="text-gray-700 mb-3">Situated in Dwarka, Gujarat, on the coast of the Arabian Sea, this matha serves the western regions. Its mahavakya is "Aham Brahmasmi" (I am Brahman), highlighting the direct realization of one's true nature as infinite consciousness.</p>
            </div>
            <div className="bg-white border-2 border-amber-300 rounded-lg p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-2">Puri Matha (East) - Odisha</h3>
              <p className="text-gray-700 mb-3">Located in Puri, Odisha, near the sacred Jagannatha Temple, this matha governs spiritual institutions in eastern India. Its mahavakya is "Prajnanam Brahma" (Consciousness is Brahman), revealing that pure awareness is the ultimate reality.</p>
            </div>
            <div className="bg-white border-2 border-amber-300 rounded-lg p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-2">Jyotirmath Matha (North) - Uttarakhand</h3>
              <p className="text-gray-700 mb-3">Established in the Himalayas near Badrinath, Jyotirmath Matha oversees northern India. Its mahavakya is "Ayam Atma Brahma" (This Self is Brahman), affirming the unchanging nature of one's true identity.</p>
            </div>
          </div>
        </section>

        {/* Legacy and Influence */}
        <section className="prose prose-lg max-w-none mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Legacy and Enduring Influence</h2>
          <p className="text-gray-700 leading-relaxed">
            Adi Shankaracharya's influence on Hindu philosophy and spirituality cannot be overstated. At a time when Hinduism faced fragmentation and challenges from rival philosophical traditions, he provided a unifying vision grounded in the non-dual truth of the Upanishads. His intellectual rigor and spiritual authority established Advaita Vedanta as the most sophisticated articulation of Hindu metaphysics.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Shankaracharya demonstrated that Vedantic realization is not a distant mystical experience but the natural outcome of discrimination and dispassion coupled with grace. His synthesis of Bhakti (devotion), Karma Yoga (action), and Jnana Yoga (knowledge) showed that all authentic spiritual paths lead to the same non-dual truth. While he emphasized knowledge as the direct means to liberation, he did not disparage devotion or ritual, recognizing their value for those not yet ripe for direct inquiry.
          </p>
          <p className="text-gray-700 leading-relaxed">
            In the modern era, his teachings continue to inspire spiritual seekers worldwide. The clarity of Advaita philosophy appeals to contemporary minds while its depth sustains lifelong practice. Many of India's most respected spiritual teachers—from Sri Ramakrishna Paramahamsa to Sri Nisargadatta Maharaj to Swami Vivekananda—have transmitted Shankaracharya's teachings in forms relevant to their times, proving the timelessness of non-dual realization.
          </p>
        </section>

        {/* Key Quotes */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Timeless Wisdom from Shankaracharya</h2>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-600 rounded p-6">
              <p className="text-lg text-gray-900 italic mb-3">
                "Brahman is real. The world is illusory. The jiva is not different from Brahman."
              </p>
              <p className="text-sm text-gray-600">—The foundational teaching of Advaita Vedanta, summarizing the nature of reality, appearance, and the identity of the self with Brahman.</p>
            </div>
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-600 rounded p-6">
              <p className="text-lg text-gray-900 italic mb-3">
                "The world is not denied; it is reinterpreted. The infinite Brahman is the substratum of the finite universe, as gold is the substratum of ornaments."
              </p>
              <p className="text-sm text-gray-600">—Explaining the relationship between the absolute reality and the apparent world, showing that the world has empirical reality within the framework of ultimate reality.</p>
            </div>
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-600 rounded p-6">
              <p className="text-lg text-gray-900 italic mb-3">
                "The self is known through discrimination, not through intellectual study or learned discourse. It is realized through viveka alone."
              </p>
              <p className="text-sm text-gray-600">—Emphasizing that realization transcends mere intellectual knowledge and requires the development of the capacity to distinguish the eternal from the temporal.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Deepen Your Understanding of Vedantic Wisdom
          </h2>
          <p className="text-amber-100 text-lg mb-8">
            Explore the profound non-dual philosophy of Advaita Vedanta and discover how it relates to other spiritual paths and modern spirituality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/advaita-vedanta-explained">
              <Button className="bg-white text-amber-700 hover:bg-gray-100 font-semibold px-8 py-6 text-lg">
                <BookOpen className="w-5 h-5 mr-2" />
                Explore Advaita Vedanta
              </Button>
            </Link>
            <Link to="/greats">
              <Button variant="outline" className="border-white text-white hover:bg-white/20 font-semibold px-8 py-6 text-lg">
                Other Spiritual Masters
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
