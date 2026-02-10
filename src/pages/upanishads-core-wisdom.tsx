import React from 'react';

export default function UpanishadsCoreWisdom() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-900">
            {/* SEO Meta Tags */}
            <div className="hidden">
                <meta name="title" content="The Upanishads: Exploring the Core of Vedic Wisdom" />
                <meta name="description" content="Discover the profound wisdom of the Upanishads, the ancient Vedic texts that form the foundation of Hindu philosophy and spiritual understanding." />
                <meta name="keywords" content="upanishads, vedic wisdom, hindu philosophy, spiritual texts, ancient wisdom, moksha, atman, brahman, vedanta" />
            </div>

            {/* Header Section */}
            <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <div className="container mx-auto px-4 py-16">
                    <nav className="flex items-center justify-between mb-8">
                        <div className="text-xl font-bold">Sadhaka</div>
                        <div className="flex space-x-6">
                            <a href="#" className="hover:text-purple-200 transition-colors">Home</a>
                            <a href="#" className="hover:text-purple-200 transition-colors">Sacred Texts</a>
                            <a href="#" className="hover:text-purple-200 transition-colors">Upanishads</a>
                            <a href="#" className="hover:text-purple-200 transition-colors">Core Wisdom</a>
                        </div>
                    </nav>

                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">The Upanishads: Exploring the Core of Vedic Wisdom</h1>
                        <p className="text-xl text-purple-100 mb-8">
                            Discover the Ancient Texts That Form the Foundation of Hindu Philosophy
                        </p>
                        <div className="flex justify-center space-x-4 text-sm">
                            <span>Home</span>
                            <span>›</span>
                            <span>Sacred Texts</span>
                            <span>›</span>
                            <span>Upanishads</span>
                            <span>›</span>
                            <span>Core Wisdom</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 text-center">
                        The Upanishads are the concluding portions of the Vedas and represent the highest wisdom of ancient
                        India. These profound philosophical texts explore the nature of reality, the self, and the ultimate
                        truth, offering timeless insights that continue to inspire spiritual seekers around the world.
                    </p>

                    {/* What You'll Learn Section */}
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                            <h3 className="text-xl font-semibold text-purple-900 mb-3">📚 What You'll Learn</h3>
                            <ul className="space-y-2 text-slate-700">
                                <li>• The historical and cultural context of the Upanishads</li>
                                <li>• Key philosophical concepts and teachings</li>
                                <li>• The major Upanishads and their significance</li>
                                <li>• How these texts influence modern spirituality</li>
                                <li>• Practical applications of Upanishadic wisdom</li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-lg border border-indigo-200">
                            <h3 className="text-xl font-semibold text-indigo-900 mb-3">🎯 Who This Is For</h3>
                            <ul className="space-y-2 text-slate-700">
                                <li>• Students of Vedic philosophy and spirituality</li>
                                <li>• Yoga practitioners seeking deeper meaning</li>
                                <li>• Philosophers and intellectual seekers</li>
                                <li>• Those interested in ancient Indian wisdom</li>
                                <li>• Anyone exploring the nature of consciousness</li>
                            </ul>
                        </div>
                    </div>

                    {/* Introduction Section */}
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 border border-slate-200 dark:border-slate-700 mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">What are the Upanishads?</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <p className="text-slate-700 dark:text-slate-300 mb-4">
                                    The Upanishads are a collection of ancient Indian texts that form the philosophical
                                    foundation of Hinduism. Composed between 800-200 BCE, they are considered the
                                    "end of the Vedas" (Vedanta) and contain the highest wisdom of the Vedic tradition.
                                </p>
                                <p className="text-slate-700 dark:text-slate-300">
                                    These texts explore profound questions about the nature of reality, the self (Atman),
                                    and the ultimate reality (Brahman). The Upanishads teach that the individual soul is
                                    identical with the universal consciousness, and that realizing this truth leads to
                                    liberation (moksha) from the cycle of birth and death.
                                </p>
                            </div>
                            <div>
                                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                                    <h4 className="text-lg font-semibold text-purple-900 mb-3">📖 Key Facts</h4>
                                    <ul className="space-y-2 text-slate-700">
                                        <li>• Over 200 Upanishads, with 13 principal ones</li>
                                        <li>• Written in Sanskrit</li>
                                        <li>• Dates back to 8th-2nd century BCE</li>
                                        <li>• Considered the foundation of Vedanta philosophy</li>
                                        <li>• Influenced Western philosophers like Schopenhauer and Emerson</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* The 13 Principal Upanishads */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">The 13 Principal Upanishads</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Isha Upanishad */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-purple-600 mb-3">Isha Upanishad</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    Focuses on renunciation and the nature of the self. Teaches that all is God and that
                                    one should enjoy the world while seeing the divine in everything.
                                </p>
                            </div>

                            {/* Kena Upanishad */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-purple-600 mb-3">Kena Upanishad</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    Explores the nature of Brahman and how it can be known. Teaches that Brahman is
                                    beyond the senses and the mind.
                                </p>
                            </div>

                            {/* Katha Upanishad */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-purple-600 mb-3">Katha Upanishad</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    The story of Nachiketa and Yama, teaching about the nature of the self, death, and
                                    the path to liberation through knowledge.
                                </p>
                            </div>

                            {/* Prashna Upanishad */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-purple-600 mb-3">Prashna Upanishad</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    Six students ask questions about creation, the nature of the self, and meditation.
                                    Answers are given through the story of creation.
                                </p>
                            </div>

                            {/* Mundaka Upanishad */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-purple-600 mb-3">Mundaka Upanishad</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    Distinguishes between lower and higher knowledge, teaching that true wisdom comes
                                    from understanding the unity of all existence.
                                </p>
                            </div>

                            {/* Mandukya Upanishad */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-purple-600 mb-3">Mandukya Upanishad</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    Explores the four states of consciousness: waking, dreaming, deep sleep, and
                                    turiya (the fourth state of pure awareness).
                                </p>
                            </div>

                            {/* Taittiriya Upanishad */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-purple-600 mb-3">Taittiriya Upanishad</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    Teaches about the nature of Brahman, the self, and the path of knowledge through
                                    meditation and self-discipline.
                                </p>
                            </div>

                            {/* Aitareya Upanishad */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-purple-600 mb-3">Aitareya Upanishad</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    Explores the creation of the universe and the nature of the self, teaching that
                                    the individual self is identical with the universal self.
                                </p>
                            </div>

                            {/* Chandogya Upanishad */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-purple-600 mb-3">Chandogya Upanishad</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    Contains the famous "Tat Tvam Asi" (Thou art That) teaching and the story of
                                    Uddalaka and his son Shvetaketu.
                                </p>
                            </div>

                            {/* Brihadaranyaka Upanishad */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-purple-600 mb-3">Brihadaranyaka Upanishad</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    The longest Upanishad, containing dialogues between teachers and students about
                                    the nature of reality, the self, and liberation.
                                </p>
                            </div>

                            {/* Shvetashvatara Upanishad */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-purple-600 mb-3">Shvetashvatara Upanishad</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    Focuses on the nature of God, the self, and the path to liberation through devotion
                                    and knowledge.
                                </p>
                            </div>

                            {/* Kaushitaki Upanishad */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-purple-600 mb-3">Kaushitaki Upanishad</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    Explores the nature of the self, the universe, and the path to liberation through
                                    meditation and self-realization.
                                </p>
                            </div>

                            {/* Maitri Upanishad */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-purple-600 mb-3">Maitri Upanishad</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    Teaches about the nature of the self, consciousness, and the path to liberation
                                    through knowledge and meditation.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Key Philosophical Concepts */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Key Philosophical Concepts</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                    <h3 className="text-xl font-semibold text-orange-600 mb-3">🌟 Atman and Brahman</h3>
                                    <p className="text-slate-700 dark:text-slate-300">
                                        The Upanishads teach that the individual soul (Atman) is identical with the
                                        universal reality (Brahman). This non-dual philosophy (Advaita) is the core
                                        teaching of the Upanishads and forms the basis of Vedanta.
                                    </p>
                                </div>

                                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                    <h3 className="text-xl font-semibold text-orange-600 mb-3">🎯 Moksha (Liberation)</h3>
                                    <p className="text-slate-700 dark:text-slate-300">
                                        The ultimate goal of human life according to the Upanishads is moksha - liberation
                                        from the cycle of birth and death through the realization of one's true nature as
                                        identical with Brahman.
                                    </p>
                                </div>

                                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                    <h3 className="text-xl font-semibold text-orange-600 mb-3">🧘 Maya and Ignorance</h3>
                                    <p className="text-slate-700 dark:text-slate-300">
                                        The Upanishads explain that the material world is maya (illusion) that obscures
                                        our perception of ultimate reality. Overcoming this ignorance is the path to
                                        spiritual enlightenment.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                    <h3 className="text-xl font-semibold text-purple-600 mb-3">🙏 Karma and Rebirth</h3>
                                    <p className="text-slate-700 dark:text-slate-300">
                                        The Upanishads explore the law of karma and the cycle of rebirth, teaching that
                                        our actions create consequences that determine our future lives until we achieve
                                        liberation.
                                    </p>
                                </div>

                                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                    <h3 className="text-xl font-semibold text-purple-600 mb-3">🌍 The Nature of Reality</h3>
                                    <p className="text-slate-700 dark:text-slate-300">
                                        These texts offer profound insights into the nature of consciousness, the
                                        relationship between the individual and the universal, and the ultimate
                                        purpose of existence.
                                    </p>
                                </div>

                                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                    <h3 className="text-xl font-semibold text-purple-600 mb-3">🎵 The Power of Sound</h3>
                                    <p className="text-slate-700 dark:text-slate-300">
                                        The Upanishads emphasize the importance of sacred sound (mantra) and
                                        meditation as tools for transcending the mind and realizing the true nature
                                        of reality.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Influence on Modern Spirituality */}
                    <div className="mb-12 bg-gradient-to-r from-indigo-50 to-blue-50 p-8 rounded-lg border border-indigo-200">
                        <h2 className="text-3xl font-bold text-indigo-900 mb-6">Influence on Modern Spirituality</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold text-indigo-800 mb-3">🧠 Western Philosophy</h3>
                                <p className="text-slate-700">
                                    The Upanishads have influenced Western philosophers including Arthur Schopenhauer,
                                    Ralph Waldo Emerson, and Aldous Huxley, who recognized their profound wisdom and
                                    incorporated their teachings into Western thought.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-indigo-800 mb-3">🧘‍♀️ Modern Yoga and Meditation</h3>
                                <p className="text-slate-700">
                                    Contemporary yoga and meditation practices draw heavily from Upanishadic wisdom,
                                    particularly the understanding of consciousness and the techniques for
                                    self-realization.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-indigo-800 mb-3">🌍 Global Spiritual Movements</h3>
                                <p className="text-slate-700">
                                    The non-dual teachings of the Upanishads have inspired modern spiritual
                                    movements and continue to attract seekers from diverse cultural backgrounds.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-indigo-800 mb-3">📚 Contemporary Interpretations</h3>
                                <p className="text-slate-700">
                                    Modern scholars and spiritual teachers continue to interpret and apply Upanishadic
                                    wisdom to address contemporary challenges and questions about meaning and purpose.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* How to Study Section */}
                    <div className="mb-12 bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-lg border border-amber-200">
                        <h2 className="text-3xl font-bold text-amber-900 mb-6">How to Study the Upanishads</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-xl font-semibold text-amber-800 mb-2">📖 Start with Accessible Translations</h3>
                                <p className="text-slate-700">
                                    Begin with translations by Eknath Easwaran or Swami Aurobindo, which provide
                                    clear explanations alongside the original text.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-amber-800 mb-2">🎯 Focus on Key Concepts</h3>
                                <p className="text-slate-700">
                                    Start with the concepts of Atman and Brahman, Maya, and Moksha. These form the
                                    foundation for understanding the entire Upanishadic tradition.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-amber-800 mb-2">📝 Study with a Teacher</h3>
                                <p className="text-slate-700">
                                    Consider studying with a qualified teacher who can provide guidance and context
                                    for the complex philosophical concepts.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-amber-800 mb-2">🧘 Practice Meditation</h3>
                                <p className="text-slate-700">
                                    The Upanishads emphasize direct experience over intellectual understanding.
                                    Regular meditation helps integrate the teachings at a deeper level.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center">
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            Ready to explore the profound wisdom of the Upanishads? Begin your journey into the
                            ancient Vedic tradition and discover the timeless truths that have guided seekers
                            for millennia.
                        </p>
                        <div className="flex justify-center gap-4">
                            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg">
                                Start Your Upanishad Journey
                            </button>
                            <button className="px-6 py-3 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-semibold border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition-all">
                                Explore Sacred Texts
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 text-white py-8 mt-16">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-slate-400">© 2024 Sadhaka. All rights reserved.</p>
                    <div className="flex justify-center space-x-6 mt-4">
                        <a href="#" className="text-slate-400 hover:text-white transition-colors">About</a>
                        <a href="#" className="text-slate-400 hover:text-white transition-colors">Contact</a>
                        <a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="text-slate-400 hover:text-white transition-colors">Terms</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}