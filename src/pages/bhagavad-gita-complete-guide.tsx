import React from 'react';

export default function BhagavadGitaCompleteGuide() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-900">
            {/* SEO Meta Tags */}
            <div className="hidden">
                <meta name="title" content="The Bhagavad Gita: A Complete Guide for Modern Seekers" />
                <meta name="description" content="Discover the timeless wisdom of the Bhagavad Gita. A comprehensive guide explaining its teachings, philosophy, and practical applications for modern spiritual seekers." />
                <meta name="keywords" content="bhagavad gita, gita guide, spiritual wisdom, hindu philosophy, krishna teachings, yoga philosophy, spiritual guidance" />
            </div>

            {/* Header Section */}
            <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <div className="container mx-auto px-4 py-16">
                    <nav className="flex items-center justify-between mb-8">
                        <div className="text-xl font-bold">Sadhaka</div>
                        <div className="flex space-x-6">
                            <a href="#" className="hover:text-blue-200 transition-colors">Home</a>
                            <a href="#" className="hover:text-blue-200 transition-colors">Sacred Texts</a>
                            <a href="#" className="hover:text-blue-200 transition-colors">Bhagavad Gita</a>
                            <a href="#" className="hover:text-blue-200 transition-colors">Complete Guide</a>
                        </div>
                    </nav>

                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">The Bhagavad Gita: A Complete Guide for Modern Seekers</h1>
                        <p className="text-xl text-blue-100 mb-8">
                            Discover the Timeless Wisdom That Has Guided Spiritual Seekers for Millennia
                        </p>
                        <div className="flex justify-center space-x-4 text-sm">
                            <span>Home</span>
                            <span>›</span>
                            <span>Sacred Texts</span>
                            <span>›</span>
                            <span>Bhagavad Gita</span>
                            <span>›</span>
                            <span>Complete Guide</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 text-center">
                        The Bhagavad Gita is one of the most revered spiritual texts in the world, offering profound wisdom
                        on duty, devotion, and the nature of reality. Written over 2,500 years ago, its teachings remain
                        remarkably relevant for modern seekers navigating life's challenges and seeking deeper meaning.
                    </p>

                    {/* What You'll Learn Section */}
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                            <h3 className="text-xl font-semibold text-blue-900 mb-3">📚 What You'll Learn</h3>
                            <ul className="space-y-2 text-slate-700">
                                <li>• The historical context and significance of the Gita</li>
                                <li>• Key philosophical concepts and teachings</li>
                                <li>• Practical applications for modern life</li>
                                <li>• How to interpret and apply its wisdom</li>
                                <li>• The 18 chapters and their core messages</li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                            <h3 className="text-xl font-semibold text-purple-900 mb-3">🎯 Who This Is For</h3>
                            <ul className="space-y-2 text-slate-700">
                                <li>• Spiritual seekers exploring Hindu philosophy</li>
                                <li>• Yoga practitioners seeking deeper meaning</li>
                                <li>• Students of Eastern spirituality</li>
                                <li>• Anyone seeking guidance in life's challenges</li>
                                <li>• Those interested in ancient wisdom traditions</li>
                            </ul>
                        </div>
                    </div>

                    {/* Introduction Section */}
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 border border-slate-200 dark:border-slate-700 mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">What is the Bhagavad Gita?</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <p className="text-slate-700 dark:text-slate-300 mb-4">
                                    The Bhagavad Gita, or "Song of God," is a 700-verse Hindu scripture that is part of the epic
                                    Mahabharata. It takes the form of a dialogue between Prince Arjuna and Lord Krishna on the
                                    battlefield of Kurukshetra, just before a great war.
                                </p>
                                <p className="text-slate-700 dark:text-slate-300">
                                    Though set in a historical context, the Gita's teachings transcend time and culture, offering
                                    universal guidance on how to live a meaningful life, fulfill one's duties, and achieve
                                    spiritual enlightenment.
                                </p>
                            </div>
                            <div>
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                                    <h4 className="text-lg font-semibold text-blue-900 mb-3">📖 Key Facts</h4>
                                    <ul className="space-y-2 text-slate-700">
                                        <li>• 18 chapters containing 700 verses</li>
                                        <li>• Written in Sanskrit</li>
                                        <li>• Part of the Mahabharata epic</li>
                                        <li>• Dates back to 2nd century BCE</li>
                                        <li>• Considered a cornerstone of Hindu philosophy</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* The 18 Chapters Overview */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">The 18 Chapters: A Journey Through Wisdom</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Chapter 1 */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-blue-600 mb-3">Chapter 1: Arjuna's Despair</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    Arjuna's crisis of conscience on the battlefield, questioning the purpose of war and his duty.
                                </p>
                            </div>

                            {/* Chapter 2 */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-blue-600 mb-3">Chapter 2: The Path of Knowledge</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    Krishna introduces the concept of yoga and the eternal nature of the soul.
                                </p>
                            </div>

                            {/* Chapter 3 */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-blue-600 mb-3">Chapter 3: The Path of Action</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    The importance of selfless action (karma yoga) and fulfilling one's duties.
                                </p>
                            </div>

                            {/* Chapter 4 */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-blue-600 mb-3">Chapter 4: The Path of Wisdom</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    The eternal nature of the divine and the science of yoga revealed to Arjuna.
                                </p>
                            </div>

                            {/* Chapter 5 */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-blue-600 mb-3">Chapter 5: The Renunciate's Path</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    The difference between renunciation and selfless action, and the path of meditation.
                                </p>
                            </div>

                            {/* Chapter 6 */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-blue-600 mb-3">Chapter 6: The Path of Meditation</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    The practice of meditation (dhyana yoga) and controlling the mind.
                                </p>
                            </div>

                            {/* Chapter 7 */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-blue-600 mb-3">Chapter 7: Knowledge of the Absolute</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    The nature of the supreme reality and the three modes of material nature.
                                </p>
                            </div>

                            {/* Chapter 8 */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-blue-600 mb-3">Chapter 8: The Path to Liberation</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    The process of leaving the body and attaining the supreme destination.
                                </p>
                            </div>

                            {/* Chapter 9 */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-blue-600 mb-3">Chapter 9: The Most Confidential Knowledge</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    The royal secret of devotion and the supreme position of Krishna.
                                </p>
                            </div>

                            {/* Chapter 10 */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-blue-600 mb-3">Chapter 10: The Opulence of the Lord</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    Krishna reveals his universal forms and divine manifestations.
                                </p>
                            </div>

                            {/* Chapter 11 */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-blue-600 mb-3">Chapter 11: The Universal Form</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    Arjuna sees Krishna's universal form, the cosmic manifestation of God.
                                </p>
                            </div>

                            {/* Chapter 12 */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-blue-600 mb-3">Chapter 12: The Path of Devotion</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    The perfection of devotion and the different types of devotees.
                                </p>
                            </div>

                            {/* Chapter 13 */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-blue-600 mb-3">Chapter 13: The Field and the Knower</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    The distinction between the material body and the spiritual soul.
                                </p>
                            </div>

                            {/* Chapter 14 */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-blue-600 mb-3">Chapter 14: The Three Modes of Nature</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    The influence of the three gunas (modes of material nature) on consciousness.
                                </p>
                            </div>

                            {/* Chapter 15 */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-blue-600 mb-3">Chapter 15: The Supreme Personality</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    The eternal tree of the material world and the process of liberation.
                                </p>
                            </div>

                            {/* Chapter 16 */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-blue-600 mb-3">Chapter 16: The Divine and Demoniac Qualities</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    The qualities that elevate and degrade the soul.
                                </p>
                            </div>

                            {/* Chapter 17 */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-blue-600 mb-3">Chapter 17: The Threefold Faith</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    The influence of the three modes on faith and worship.
                                </p>
                            </div>

                            {/* Chapter 18 */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-blue-600 mb-3">Chapter 18: Liberation by Renunciation</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    The conclusion of the Gita: the path to liberation through renunciation of the fruits of action.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Key Teachings Section */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Key Teachings of the Bhagavad Gita</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                    <h3 className="text-xl font-semibold text-orange-600 mb-3">🧘 The Path of Yoga</h3>
                                    <p className="text-slate-700 dark:text-slate-300">
                                        The Gita presents three main paths to spiritual realization: karma yoga (the path of action),
                                        jnana yoga (the path of knowledge), and bhakti yoga (the path of devotion). Each path
                                        suits different temperaments and offers a way to transcend the material world.
                                    </p>
                                </div>

                                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                    <h3 className="text-xl font-semibold text-orange-600 mb-3">🌟 The Nature of the Self</h3>
                                    <p className="text-slate-700 dark:text-slate-300">
                                        The Gita teaches that the soul is eternal, indestructible, and beyond the physical body.
                                        Understanding this truth helps one transcend fear of death and attachment to material things.
                                    </p>
                                </div>

                                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                    <h3 className="text-xl font-semibold text-orange-600 mb-3">🎯 The Importance of Duty</h3>
                                    <p className="text-slate-700 dark:text-slate-300">
                                        Krishna emphasizes the importance of performing one's duty without attachment to results.
                                        This principle of selfless action is central to the Gita's teachings and offers practical
                                        guidance for modern life.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                    <h3 className="text-xl font-semibold text-purple-600 mb-3">🙏 The Power of Devotion</h3>
                                    <p className="text-slate-700 dark:text-slate-300">
                                        Bhakti yoga, or the path of devotion, is presented as the supreme path to God. The Gita
                                        teaches that love and devotion to the divine can purify the heart and lead to spiritual
                                        enlightenment.
                                    </p>
                                </div>

                                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                    <h3 className="text-xl font-semibold text-purple-600 mb-3">🧠 The Science of Consciousness</h3>
                                    <p className="text-slate-700 dark:text-slate-300">
                                        The Gita offers profound insights into the nature of consciousness, the mind, and how to
                                        control and purify one's thoughts and emotions through meditation and self-discipline.
                                    </p>
                                </div>

                                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                    <h3 className="text-xl font-semibold text-purple-600 mb-3">🌍 The Universal Application</h3>
                                    <p className="text-slate-700 dark:text-slate-300">
                                        Despite its ancient origins, the Gita's teachings are remarkably relevant to modern
                                        challenges, offering guidance on leadership, ethics, relationships, and finding
                                        purpose in life.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Modern Applications Section */}
                    <div className="mb-12 bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-lg border border-green-200">
                        <h2 className="text-3xl font-bold text-green-900 mb-6">Applying the Gita's Wisdom in Modern Life</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <h3 className="text-xl font-semibold text-green-800 mb-3">🏢 Leadership and Management</h3>
                                <p className="text-slate-700">
                                    The Gita's teachings on duty, responsibility, and ethical leadership provide valuable
                                    insights for modern managers and leaders seeking to create positive impact.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-green-800 mb-3">🧘‍♀️ Personal Development</h3>
                                <p className="text-slate-700">
                                    Practices like meditation, self-reflection, and cultivating equanimity help navigate
                                    stress, anxiety, and the challenges of modern life.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-green-800 mb-3">🤝 Relationships</h3>
                                <p className="text-slate-700">
                                    The Gita's emphasis on compassion, understanding, and seeing the divine in others
                                    transforms how we approach relationships and community.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* How to Study Section */}
                    <div className="mb-12 bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-lg border border-amber-200">
                        <h2 className="text-3xl font-bold text-amber-900 mb-6">How to Study the Bhagavad Gita</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-xl font-semibold text-amber-800 mb-2">📖 Choose Your Translation</h3>
                                <p className="text-slate-700">
                                    Select a translation that resonates with you. Popular options include Eknath Easwaran's
                                    translation for its accessibility, or the Bhaktivedanta Swami Prabhupada version for
                                    traditional commentary.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-amber-800 mb-2">🎯 Start with Key Chapters</h3>
                                <p className="text-slate-700">
                                    Begin with Chapters 2, 3, and 12, which contain the core teachings on yoga, action, and
                                    devotion. These provide a solid foundation for understanding the entire text.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-amber-800 mb-2">📝 Take Notes and Reflect</h3>
                                <p className="text-slate-700">
                                    Keep a journal to record insights, questions, and how the teachings apply to your life.
                                    Regular reflection helps integrate the wisdom into your daily practice.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-amber-800 mb-2">🎵 Listen to Audio Versions</h3>
                                <p className="text-slate-700">
                                    Many versions are available as audiobooks, which can help with pronunciation and
                                    understanding the flow and rhythm of the verses.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center">
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            Ready to dive deeper into the timeless wisdom of the Bhagavad Gita? Start your journey of
                            self-discovery and spiritual growth today.
                        </p>
                        <div className="flex justify-center gap-4">
                            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg">
                                Start Your Gita Journey
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