import React from 'react';

export default function YogaSutrasCompleteGuide() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-900">
            {/* SEO Meta Tags */}
            <div className="hidden">
                <meta name="title" content="The Yoga Sutras of Patanjali: A Complete Guide to Classical Yoga" />
                <meta name="description" content="Discover the complete guide to Patanjali's Yoga Sutras, the foundational text of classical yoga that outlines the eight limbs of yoga and the path to spiritual enlightenment." />
                <meta name="keywords" content="yoga sutras, patanjali, classical yoga, eight limbs of yoga, raja yoga, yoga philosophy, spiritual enlightenment" />
            </div>

            {/* Header Section */}
            <header className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
                <div className="container mx-auto px-4 py-16">
                    <nav className="flex items-center justify-between mb-8">
                        <div className="text-xl font-bold">Sadhaka</div>
                        <div className="flex space-x-6">
                            <a href="#" className="hover:text-green-200 transition-colors">Home</a>
                            <a href="#" className="hover:text-green-200 transition-colors">Spiritual Practices</a>
                            <a href="#" className="hover:text-green-200 transition-colors">Yoga Philosophy</a>
                            <a href="#" className="hover:text-green-200 transition-colors">Yoga Sutras</a>
                        </div>
                    </nav>

                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">The Yoga Sutras of Patanjali: A Complete Guide</h1>
                        <p className="text-xl text-green-100 mb-8">
                            Discover the Foundational Text That Outlines the Path to Spiritual Enlightenment
                        </p>
                        <div className="flex justify-center space-x-4 text-sm">
                            <span>Home</span>
                            <span>›</span>
                            <span>Spiritual Practices</span>
                            <span>›</span>
                            <span>Yoga Philosophy</span>
                            <span>›</span>
                            <span>Yoga Sutras</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 text-center">
                        The Yoga Sutras of Patanjali is the foundational text of classical yoga, outlining the
                        eight-limbed path (Ashtanga Yoga) to spiritual enlightenment. Composed around 200 CE,
                        this ancient text continues to guide yoga practitioners and spiritual seekers worldwide
                        with its systematic approach to self-realization.
                    </p>

                    {/* What You'll Learn Section */}
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-lg border border-green-200">
                            <h3 className="text-xl font-semibold text-green-900 mb-3">📚 What You'll Learn</h3>
                            <ul className="space-y-2 text-slate-700">
                                <li>• The historical context and significance of the Yoga Sutras</li>
                                <li>• The eight limbs of yoga and their practical application</li>
                                <li>• Key philosophical concepts and teachings</li>
                                <li>• How to integrate these principles into modern yoga practice</li>
                                <li>• The path to spiritual enlightenment according to Patanjali</li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 p-6 rounded-lg border border-emerald-200">
                            <h3 className="text-xl font-semibold text-emerald-900 mb-3">🎯 Who This Is For</h3>
                            <ul className="space-y-2 text-slate-700">
                                <li>• Yoga practitioners seeking deeper philosophical understanding</li>
                                <li>• Students of classical yoga and meditation</li>
                                <li>• Spiritual seekers exploring the path to enlightenment</li>
                                <li>• Teachers and instructors wanting to deepen their knowledge</li>
                                <li>• Anyone interested in ancient Indian philosophy</li>
                            </ul>
                        </div>
                    </div>

                    {/* Introduction Section */}
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 border border-slate-200 dark:border-slate-700 mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">What are the Yoga Sutras?</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <p className="text-slate-700 dark:text-slate-300 mb-4">
                                    The Yoga Sutras of Patanjali is a collection of 196 aphorisms that outline the
                                    complete system of classical yoga. Written by the sage Patanjali, this text
                                    provides a comprehensive guide to achieving spiritual enlightenment through
                                    the eight-limbed path of yoga.
                                </p>
                                <p className="text-slate-700 dark:text-slate-300">
                                    Unlike modern yoga that often focuses primarily on physical postures, the
                                    Yoga Sutras emphasize a holistic approach that includes ethical conduct,
                                    physical discipline, breath control, sense withdrawal, concentration,
                                    meditation, and ultimately, samadhi (enlightenment).
                                </p>
                            </div>
                            <div>
                                <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-lg border border-green-200">
                                    <h4 className="text-lg font-semibold text-green-900 mb-3">📖 Key Facts</h4>
                                    <ul className="space-y-2 text-slate-700">
                                        <li>• 196 sutras (aphorisms) organized in 4 chapters</li>
                                        <li>• Written in Sanskrit</li>
                                        <li>• Dates back to 2nd century CE</li>
                                        <li>• Considered the foundational text of Raja Yoga</li>
                                        <li>• Translated into numerous languages worldwide</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* The Four Chapters */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">The Four Chapters of the Yoga Sutras</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                    <h3 className="text-xl font-semibold text-green-600 mb-3">Chapter 1: Samadhi Pada</h3>
                                    <p className="text-slate-700 dark:text-slate-300">
                                        Focuses on the nature and attainment of samadhi (enlightenment). Defines yoga
                                        as the cessation of the fluctuations of the mind and introduces the concept
                                        of the eight limbs.
                                    </p>
                                </div>

                                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                    <h3 className="text-xl font-semibold text-green-600 mb-3">Chapter 2: Sadhana Pada</h3>
                                    <p className="text-slate-700 dark:text-slate-300">
                                        Details the practice (sadhana) of yoga, including the first five limbs:
                                        yama, niyama, asana, pranayama, and pratyahara.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                    <h3 className="text-xl font-semibold text-teal-600 mb-3">Chapter 3: Vibhuti Pada</h3>
                                    <p className="text-slate-700 dark:text-slate-300">
                                        Explores the advanced stages of concentration and meditation, including
                                        the powers (siddhis) that may arise from practice.
                                    </p>
                                </div>

                                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                    <h3 className="text-xl font-semibold text-teal-600 mb-3">Chapter 4: Kaivalya Pada</h3>
                                    <p className="text-slate-700 dark:text-slate-300">
                                        Describes the ultimate goal of yoga: kaivalya (liberation) and the
                                        nature of the enlightened being who has transcended the mind.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* The Eight Limbs of Yoga */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">The Eight Limbs of Yoga (Ashtanga Yoga)</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Yama */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-orange-600 mb-3">1. Yama</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    Ethical restraints: non-violence, truthfulness, non-stealing,
                                    continence, and non-possessiveness.
                                </p>
                            </div>

                            {/* Niyama */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-orange-600 mb-3">2. Niyama</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    Personal observances: purity, contentment, austerity,
                                    self-study, and surrender to the divine.
                                </p>
                            </div>

                            {/* Asana */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-orange-600 mb-3">3. Asana</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    Physical postures that promote stability and comfort for
                                    meditation.
                                </p>
                            </div>

                            {/* Pranayama */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-orange-600 mb-3">4. Pranayama</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    Breath control techniques to regulate life force energy.
                                </p>
                            </div>

                            {/* Pratyahara */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-purple-600 mb-3">5. Pratyahara</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    Sense withdrawal - turning inward by controlling the senses.
                                </p>
                            </div>

                            {/* Dharana */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-purple-600 mb-3">6. Dharana</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    Concentration - focusing the mind on a single point.
                                </p>
                            </div>

                            {/* Dhyana */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-purple-600 mb-3">7. Dhyana</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    Meditation - maintaining focused awareness without effort.
                                </p>
                            </div>

                            {/* Samadhi */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-semibold text-purple-600 mb-3">8. Samadhi</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    Enlightenment - union with the divine, transcending the ego.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Key Concepts Section */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Key Concepts in the Yoga Sutras</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                    <h3 className="text-xl font-semibold text-green-600 mb-3">🧘 Chitta Vritti Nirodha</h3>
                                    <p className="text-slate-700 dark:text-slate-300">
                                        The core definition of yoga: the cessation of the fluctuations
                                        of the mind. This is achieved through the systematic practice
                                        of the eight limbs.
                                    </p>
                                </div>

                                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                    <h3 className="text-xl font-semibold text-green-600 mb-3">🎯 Abhyasa and Vairagya</h3>
                                    <p className="text-slate-700 dark:text-slate-300">
                                        The two essential qualities for success: abhyasa (practice)
                                        and vairagya (non-attachment). Practice with dedication
                                        and detachment from results.
                                    </p>
                                </div>

                                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                    <h3 className="text-xl font-semibold text-green-600 mb-3">🌟 The Five Kleshas</h3>
                                    <p className="text-slate-700 dark:text-slate-300">
                                        The five afflictions that cause suffering: ignorance, ego,
                                        attachment, aversion, and fear of death. Yoga aims to
                                        eliminate these through practice.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                    <h3 className="text-xl font-semibold text-teal-600 mb-3">🙏 Isvara Pranidhana</h3>
                                    <p className="text-slate-700 dark:text-slate-300">
                                        Surrender to the divine. This concept emphasizes that
                                        spiritual practice should be offered to something greater
                                        than the ego.
                                    </p>
                                </div>

                                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                    <h3 className="text-xl font-semibold text-teal-600 mb-3">🧠 The Gunas</h3>
                                    <p className="text-slate-700 dark:text-slate-300">
                                        The three qualities of nature (sattva, rajas, tamas) that
                                        influence the mind. Yoga aims to cultivate sattva (purity)
                                        and transcend the other two qualities.
                                    </p>
                                </div>

                                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                                    <h3 className="text-xl font-semibold text-teal-600 mb-3">🌈 The Four Stages</h3>
                                    <p className="text-slate-700 dark:text-slate-300">
                                        The progression from gross to subtle: vitarka (gross
                                        thought), vicara (subtle thought), ananda (bliss), and
                                        asmita (egolessness) in meditation.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Modern Applications */}
                    <div className="mb-12 bg-gradient-to-r from-emerald-50 to-cyan-50 p-8 rounded-lg border border-emerald-200">
                        <h2 className="text-3xl font-bold text-emerald-900 mb-6">Applying the Yoga Sutras in Modern Life</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <h3 className="text-xl font-semibold text-emerald-800 mb-3">🧘‍♀️ Personal Practice</h3>
                                <p className="text-slate-700">
                                    The eight limbs provide a comprehensive framework for
                                    developing a balanced spiritual practice that includes
                                    ethical living, physical discipline, and mental cultivation.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-emerald-800 mb-3">🏢 Professional Life</h3>
                                <p className="text-slate-700">
                                    The principles of yama and niyama offer guidance for
                                    ethical conduct in the workplace and help manage stress
                                    through mindfulness and self-regulation.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-emerald-800 mb-3">🤝 Relationships</h3>
                                <p className="text-slate-700">
                                    The practice of non-violence (ahimsa) and truthfulness
                                    (satya) transforms how we interact with others and
                                    build meaningful connections.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* How to Study Section */}
                    <div className="mb-12 bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-lg border border-amber-200">
                        <h2 className="text-3xl font-bold text-amber-900 mb-6">How to Study the Yoga Sutras</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-xl font-semibold text-amber-800 mb-2">📖 Choose Your Translation</h3>
                                <p className="text-slate-700">
                                    Popular translations include those by Sri Swami Satchidananda,
                                    Georg Feuerstein, and Edwin Bryant. Each offers different
                                    perspectives on the ancient text.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-amber-800 mb-2">🎯 Study with a Teacher</h3>
                                <p className="text-slate-700">
                                    Consider studying with a qualified yoga teacher who can
                                    provide guidance and help you understand the practical
                                    application of the sutras.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-amber-800 mb-2">🧘 Practice Regularly</h3>
                                <p className="text-slate-700">
                                    The Yoga Sutras emphasize practice (abhyasa) over
                                    intellectual understanding. Regular yoga and meditation
                                    practice is essential.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-amber-800 mb-2">📝 Keep a Journal</h3>
                                <p className="text-slate-700">
                                    Record your insights, challenges, and experiences as you
                                    apply the teachings. This helps track your progress and
                                    deepen your understanding.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center">
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            Ready to dive deeper into the wisdom of the Yoga Sutras? Start your
                            journey of self-discovery and spiritual growth through the classical
                            path of yoga.
                        </p>
                        <div className="flex justify-center gap-4">
                            <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-teal-700 transition-all transform hover:scale-105 shadow-lg">
                                Start Your Yoga Sutras Journey
                            </button>
                            <button className="px-6 py-3 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-semibold border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition-all">
                                Explore Spiritual Practices
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