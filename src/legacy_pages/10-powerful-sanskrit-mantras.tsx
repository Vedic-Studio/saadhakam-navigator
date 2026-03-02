import React from 'react';

export default function SanskritMantrasPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-900">
            {/* SEO Meta Tags */}
            <div className="hidden">
                <meta name="title" content="10 Powerful Sanskrit Mantras and Their Meanings - Authentic Indian Spiritual Wisdom" />
                <meta name="description" content="Discover 10 powerful Sanskrit mantras with their meanings, origins, and benefits. Learn how these ancient chants can transform your spiritual practice and bring peace to your life." />
                <meta name="keywords" content="sanskrit mantras, powerful mantras, indian mantras, spiritual chants, meditation mantras, sanskrit chants, mantra meanings, spiritual wisdom" />
            </div>

            {/* Header Section */}
            <header className="bg-gradient-to-r from-orange-600 to-amber-600 text-white">
                <div className="container mx-auto px-4 py-16">
                    <nav className="flex items-center justify-between mb-8">
                        <div className="text-xl font-bold">Sadhaka</div>
                        <div className="flex space-x-6">
                            <a href="#" className="hover:text-orange-200 transition-colors">Home</a>
                            <a href="#" className="hover:text-orange-200 transition-colors">Spiritual Practices</a>
                            <a href="#" className="hover:text-orange-200 transition-colors">Meditation</a>
                            <a href="#" className="hover:text-orange-200 transition-colors">Sanskrit Mantras</a>
                        </div>
                    </nav>

                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">10 Powerful Sanskrit Mantras and Their Meanings</h1>
                        <p className="text-xl text-orange-100 mb-8">
                            Discover the Ancient Chants That Have Transformed Lives for Thousands of Years
                        </p>
                        <div className="flex justify-center space-x-4 text-sm">
                            <span>Home</span>
                            <span>›</span>
                            <span>Spiritual Practices</span>
                            <span>›</span>
                            <span>Meditation</span>
                            <span>›</span>
                            <span>Sanskrit Mantras</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 text-center">
                        Sanskrit mantras are more than just words – they are ancient vibrations that carry profound spiritual power.
                        For thousands of years, these sacred chants have been used to connect with the divine, calm the mind, and
                        transform consciousness. Whether you're new to mantra meditation or looking to deepen your practice,
                        these 10 powerful mantras offer timeless wisdom for modern seekers.
                    </p>

                    {/* What You'll Learn Section */}
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-lg border border-orange-200">
                            <h3 className="text-xl font-semibold text-orange-900 mb-3">🎯 What You'll Learn</h3>
                            <ul className="space-y-2 text-slate-700">
                                <li>• The meaning and significance of each mantra</li>
                                <li>• How to pronounce mantras correctly</li>
                                <li>• The spiritual benefits and purpose of each chant</li>
                                <li>• When and how to use these mantras in your practice</li>
                                <li>• The cultural and historical context of each mantra</li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                            <h3 className="text-xl font-semibold text-blue-900 mb-3">🙏 Who This Is For</h3>
                            <ul className="space-y-2 text-slate-700">
                                <li>• Beginners exploring spiritual practices</li>
                                <li>• Yoga practitioners seeking deeper meaning</li>
                                <li>• Meditation enthusiasts wanting authentic chants</li>
                                <li>• Those interested in Indian spiritual traditions</li>
                                <li>• Anyone seeking peace and spiritual connection</li>
                            </ul>
                        </div>
                    </div>

                    {/* Mantras Grid */}
                    <div className="space-y-8">
                        {/* Mantra 1 */}
                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-200 dark:border-slate-700">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">1. Om (ॐ) - The Primordial Sound</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-orange-600 mb-2">Meaning</h3>
                                    <p className="text-slate-700 dark:text-slate-300">
                                        The most sacred sound in Hinduism, representing the ultimate reality, consciousness, and the
                                        connection between the individual self and the universal self.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-orange-600 mb-2">Benefits</h3>
                                    <ul className="text-slate-700 dark:text-slate-300 space-y-1">
                                        <li>• Calms the mind and reduces stress</li>
                                        <li>• Enhances meditation practice</li>
                                        <li>• Connects you to universal consciousness</li>
                                        <li>• Promotes inner peace and clarity</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                                <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                                    "Om is the sound of the universe. Chanting Om helps align your energy with the cosmic rhythm."
                                </p>
                            </div>
                        </div>

                        {/* Mantra 2 */}
                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-200 dark:border-slate-700">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">2. Om Namah Shivaya (ॐ नमः शिवाय) - Homage to Shiva</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-orange-600 mb-2">Meaning</h3>
                                    <p className="text-slate-700 dark:text-slate-300">
                                        "I bow to Shiva" - A powerful mantra honoring Lord Shiva, the destroyer of ignorance and
                                        transformer of consciousness.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-orange-600 mb-2">Benefits</h3>
                                    <ul className="text-slate-700 dark:text-slate-300 space-y-1">
                                        <li>• Dissolves negative patterns and habits</li>
                                        <li>• Enhances willpower and determination</li>
                                        <li>• Promotes spiritual transformation</li>
                                        <li>• Connects to divine masculine energy</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Mantra 3 */}
                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-200 dark:border-slate-700">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">3. Om Mani Padme Hum (ॐ मणि पद्मे हूँ) - The Jewel in the Lotus</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-orange-600 mb-2">Meaning</h3>
                                    <p className="text-slate-700 dark:text-slate-300">
                                        "The jewel in the lotus" - The six-syllable mantra of compassion, representing the path to
                                        enlightenment through wisdom and compassion.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-orange-600 mb-2">Benefits</h3>
                                    <ul className="text-slate-700 dark:text-slate-300 space-y-1">
                                        <li>• Cultivates compassion and loving-kindness</li>
                                        <li>• Purifies negative karma</li>
                                        <li>• Opens the heart chakra</li>
                                        <li>• Connects to Buddhist spiritual path</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Mantra 4 */}
                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-200 dark:border-slate-700">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">4. Gayatri Mantra (ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं)</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-orange-600 mb-2">Meaning</h3>
                                    <p className="text-slate-700 dark:text-slate-300">
                                        "Om, Earth, Atmosphere, Heaven, That Most High" - The most sacred Vedic mantra, invoking the
                                        divine light of consciousness.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-orange-600 mb-2">Benefits</h3>
                                    <ul className="text-slate-700 dark:text-slate-300 space-y-1">
                                        <li>• Enhances intellectual clarity and wisdom</li>
                                        <li>• Promotes spiritual enlightenment</li>
                                        <li>• Connects to cosmic consciousness</li>
                                        <li>• Purifies mind and intellect</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Mantra 5 */}
                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-200 dark:border-slate-700">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">5. Mahamrityunjaya Mantra (ॐ त्र्यम्बकं यजामहे)</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-orange-600 mb-2">Meaning</h3>
                                    <p className="text-slate-700 dark:text-slate-300">
                                        "We worship the three-eyed One (Shiva) who is fragrant and nourishes all beings" - A powerful
                                        mantra for healing and overcoming death.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-orange-600 mb-2">Benefits</h3>
                                    <ul className="text-slate-700 dark:text-slate-300 space-y-1">
                                        <li>• Powerful healing and recovery</li>
                                        <li>• Overcomes fear of death and disease</li>
                                        <li>• Promotes longevity and vitality</li>
                                        <li>• Connects to divine healing energy</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Mantra 6 */}
                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-200 dark:border-slate-700">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">6. So Hum (सो ऽहम्) - I Am That</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-orange-600 mb-2">Meaning</h3>
                                    <p className="text-slate-700 dark:text-slate-300">
                                        "I am that" - A natural breathing mantra representing the unity of the individual self with the
                                        universal consciousness.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-orange-600 mb-2">Benefits</h3>
                                    <ul className="text-slate-700 dark:text-slate-300 space-y-1">
                                        <li>• Enhances mindfulness and presence</li>
                                        <li>• Deepens meditation practice</li>
                                        <li>• Promotes self-realization</li>
                                        <li>• Connects to natural breathing rhythm</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Mantra 7 */}
                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-200 dark:border-slate-700">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">7. Hari Om (हरि ओम्) - Salutation to the Divine</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-orange-600 mb-2">Meaning</h3>
                                    <p className="text-slate-700 dark:text-slate-300">
                                        "Salutation to the Divine" - A simple and powerful mantra honoring the divine presence in all
                                        things.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-orange-600 mb-2">Benefits</h3>
                                    <ul className="text-slate-700 dark:text-slate-300 space-y-1">
                                        <li>• Simple and accessible for beginners</li>
                                        <li>• Cultivates devotion and surrender</li>
                                        <li>• Promotes peace and contentment</li>
                                        <li>• Connects to divine feminine energy</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Mantra 8 */}
                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-200 dark:border-slate-700">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">8. Shanti Mantra (शान्तिः शान्तिः शान्तिः)</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-orange-600 mb-2">Meaning</h3>
                                    <p className="text-slate-700 dark:text-slate-300">
                                        "Peace, Peace, Peace" - A universal peace mantra invoking peace in body, mind, and spirit.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-orange-600 mb-2">Benefits</h3>
                                    <ul className="text-slate-700 dark:text-slate-300 space-y-1">
                                        <li>• Creates inner and outer peace</li>
                                        <li>• Calms anxiety and restlessness</li>
                                        <li>• Harmonizes energy fields</li>
                                        <li>• Promotes overall well-being</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Mantra 9 */}
                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-200 dark:border-slate-700">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">9. Om Shanti (ॐ शान्तिः) - Divine Peace</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-orange-600 mb-2">Meaning</h3>
                                    <p className="text-slate-700 dark:text-slate-300">
                                        "Om, Peace" - A simple and profound mantra invoking the peace that transcends all understanding.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-orange-600 mb-2">Benefits</h3>
                                    <ul className="text-slate-700 dark:text-slate-300 space-y-1">
                                        <li>• Deep peace and tranquility</li>
                                        <li>• Releases mental and emotional tension</li>
                                        <li>• Connects to divine peace</li>
                                        <li>• Simple and effective for daily practice</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Mantra 10 */}
                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-200 dark:border-slate-700">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">10. Asato Mā Sadgamaya (असतो मा सद्गमय)</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-orange-600 mb-2">Meaning</h3>
                                    <p className="text-slate-700 dark:text-slate-300">
                                        "Lead me from the unreal to the real" - A Vedic prayer for spiritual guidance and enlightenment.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-orange-600 mb-2">Benefits</h3>
                                    <ul className="text-slate-700 dark:text-slate-300 space-y-1">
                                        <li>• Spiritual guidance and clarity</li>
                                        <li>• Transcends illusion and ignorance</li>
                                        <li>• Connects to higher wisdom</li>
                                        <li>• Promotes truth and authenticity</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* How to Use Section */}
                    <div className="mt-12 bg-gradient-to-r from-orange-50 to-amber-50 p-8 rounded-lg border border-orange-200">
                        <h3 className="text-2xl font-bold text-orange-900 mb-4">📚 How to Use These Mantras</h3>
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-lg font-semibold text-orange-800 mb-2">For Beginners:</h4>
                                <p className="text-slate-700">
                                    Start with simple mantras like "Om" or "So Hum". Chant them 5-10 minutes daily, focusing on the
                                    sound and meaning. You can chant aloud or silently in your mind.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-orange-800 mb-2">For Regular Practice:</h4>
                                <p className="text-slate-700">
                                    Choose 1-2 mantras that resonate with you and practice them consistently. You can chant during
                                    meditation, yoga, or anytime you need spiritual support.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-orange-800 mb-2">For Deep Transformation:</h4>
                                <p className="text-slate-700">
                                    Commit to a 40-day practice of your chosen mantra. This traditional approach helps embed the
                                    mantra's energy deeply in your being and creates lasting transformation.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tips Section */}
                    <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg border border-blue-200">
                        <h3 className="text-2xl font-bold text-blue-900 mb-4">💡 Tips for Effective Mantra Practice</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="text-lg font-semibold text-blue-800 mb-3">🎯 Focus on Intention</h4>
                                <p className="text-slate-700">
                                    Set a clear intention before chanting. What do you hope to achieve or transform through this
                                    practice? Your intention guides the energy of the mantra.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-blue-800 mb-3">🎵 Find Your Rhythm</h4>
                                <p className="text-slate-700">
                                    Chant at a pace that feels natural to you. Some prefer slow, deliberate chanting; others find
                                    a rhythmic flow works best. Experiment to find what serves you.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-blue-800 mb-3">🙏 Create Sacred Space</h4>
                                <p className="text-slate-700">
                                    Dedicate a quiet, peaceful space for your mantra practice. This helps create a sacred
                                    container for your spiritual work.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-blue-800 mb-3">🌅 Consistency Matters</h4>
                                <p className="text-slate-700">
                                    Regular practice, even for short periods, is more effective than occasional long sessions.
                                    Aim for daily practice to build momentum.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="mt-12 text-center">
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            Ready to explore these mantras in your daily practice? Start with the one that resonates most
                            deeply with you and allow its wisdom to unfold.
                        </p>
                        <div className="flex justify-center gap-4">
                            <button className="px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg font-semibold hover:from-orange-700 hover:to-amber-700 transition-all transform hover:scale-105 shadow-lg">
                                Start Your Mantra Journey
                            </button>
                            <button className="px-6 py-3 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-semibold border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition-all">
                                Learn More About Meditation
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