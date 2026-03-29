/**
 * Faith Finder Email Sequence
 * 6 emails × 4 paths (inquiry, devotion, ritual, discipline)
 *
 * Sequence:
 *   Email 0 — Immediate: Results revealed
 *   Email 1 — Day 1:  Your first practice
 *   Email 2 — Day 3:  The tradition behind your path
 *   Email 3 — Day 7:  One week in — reflect & deepen
 *   Email 4 — Day 14: The philosophy that powers your path
 *   Email 5 — Day 30: What comes next
 */

import type { QuizResult } from '@/data/faithFinderQuiz';
import {
  wrapEmail,
  card,
  quote,
  numberedSteps,
  arrowList,
  dayBadge,
  categoryBadge,
  divider,
  heading,
  subheading,
  scoreTable,
  p,
} from './layout';

type PathKey = 'inquiry' | 'devotion' | 'ritual' | 'discipline';

// ─── Path meta ───────────────────────────────────────────────────────────────

const PATH_META: Record<
  PathKey,
  {
    label: string;
    yogaName: string;
    tradition: string;
    coreQuestion: string;
    primaryTeacher: string;
    firstPractice: string;
    firstText: string;
    philosophy: string;
    philosophyLink: string;
    philosophyArticle: string;
    traditions: string[];
    practices: string[];
  }
> = {
  inquiry: {
    label: 'Path of Inquiry',
    yogaName: 'Jnana Yoga',
    tradition: 'Advaita Vedanta',
    coreQuestion: 'Who am I?',
    primaryTeacher: 'Ramana Maharshi',
    firstPractice: 'Self-Inquiry (Atma Vichara)',
    firstText: 'Talks with Sri Ramana Maharshi',
    philosophy: 'Advaita Vedanta',
    philosophyLink: 'https://www.opensadhaka.com/advaita-vedanta-explained',
    philosophyArticle: 'Advaita Vedanta Explained',
    traditions: ['Advaita Vedanta', 'Zen Buddhism', 'Dzogchen'],
    practices: ['Self-Inquiry', 'Neti Neti meditation', 'Silent sitting', 'Study of Upanishads'],
  },
  devotion: {
    label: 'Path of Devotion',
    yogaName: 'Bhakti Yoga',
    tradition: 'Vaishnavism / Bhakti',
    coreQuestion: 'How do I love the Divine?',
    primaryTeacher: 'Chaitanya Mahaprabhu',
    firstPractice: 'Japa \u2014 repetition of a divine name',
    firstText: 'Narada Bhakti Sutras',
    philosophy: 'Bhakti Vedanta',
    philosophyLink: 'https://www.opensadhaka.com/shaivism-vs-vaishnavism',
    philosophyArticle: 'Shaivism vs Vaishnavism',
    traditions: ['Vaishnavism', 'Sufism', 'Christian Mysticism'],
    practices: [
      'Japa / nama-sankirtana',
      'Puja (devotional offering)',
      'Kirtan (sacred chanting)',
      'Reading devotional texts',
    ],
  },
  ritual: {
    label: 'Path of Ritual',
    yogaName: 'Karma Yoga / Tantra',
    tradition: 'Vedic / Tantric',
    coreQuestion: 'How do I make every action sacred?',
    primaryTeacher: 'Adi Shankaracharya',
    firstPractice: 'Simple daily puja (ritual offering)',
    firstText: 'The Yoga of Action (Bhagavad Gita, Ch 3)',
    philosophy: 'Karma Yoga & Tantra',
    philosophyLink: 'https://www.opensadhaka.com/adi-shankaracharya-life-teachings',
    philosophyArticle: 'Adi Shankaracharya: Life & Teachings',
    traditions: ['Shaivism', 'Shakta Tantra', 'Vedic ritual'],
    practices: ['Morning puja', 'Mantra repetition', 'Ritual cleansing', 'Sacred calendar observance'],
  },
  discipline: {
    label: 'Path of Discipline',
    yogaName: 'Raja Yoga',
    tradition: "Patanjali's Ashtanga",
    coreQuestion: 'How do I master the mind?',
    primaryTeacher: 'Patanjali',
    firstPractice: 'Pranayama \u2014 conscious breath regulation',
    firstText: 'Yoga Sutras of Patanjali',
    philosophy: 'Samkhya-Yoga',
    philosophyLink: 'https://www.opensadhaka.com/yoga-sutras-complete-guide',
    philosophyArticle: 'Yoga Sutras: Complete Guide',
    traditions: ['Raja Yoga', 'Theravada Buddhism', 'Taoist inner alchemy'],
    practices: [
      'Pranayama (breath control)',
      'Dhyana (formal meditation)',
      'Pratyahara (sense withdrawal)',
      'Yama & Niyama (ethical training)',
    ],
  },
};

const PATH_DESCRIPTIONS: Record<PathKey, string> = {
  inquiry:
    'You are drawn to understanding through direct investigation. Not belief, not faith, but seeing for yourself what is real. The inquiry path strips away assumptions until what remains cannot be doubted.',
  devotion:
    'You feel a pull toward something larger than yourself. The devotional path channels that pull into practice \u2014 turning love into a method, and surrender into the sharpest form of attention.',
  ritual:
    'You find power in precise action. The ritual path treats every gesture, every offering, every conscious act as a doorway \u2014 making sacred space from ordinary time.',
  discipline:
    'You are drawn to systematic mastery. The discipline path maps the mind, trains the body, and builds the internal architecture needed for sustained inner work.',
};

// ─── Email 0: Results Revealed ───────────────────────────────────────────────

function email0(result: QuizResult): string {
  const m = PATH_META[result.primaryPath] || PATH_META.inquiry;
  const scores = result.scores || { inquiry: 0, devotion: 0, ritual: 0, discipline: 0 };
  const recs = result.recommendations || { traditions: [], practices: [], philosophies: [] };

  const body = [
    categoryBadge(`${m.label} \u00b7 ${m.yogaName}`),
    heading('Your path is clear.'),
    p(`Your answers point to one path above the others: <strong>${m.label}</strong> \u2014 the way of <strong>${m.yogaName}</strong>.`),
    p("This is your natural entry point. Not a limitation. The traditions overlap, and you'll explore others. But this is where the door opens widest for you right now."),

    card(m.label, PATH_DESCRIPTIONS[result.primaryPath]),

    subheading('Your Scores'),
    scoreTable(scores),

    subheading('Traditions That Fit'),
    p((recs.traditions || m.traditions).join(' \u00b7 ')),

    subheading('Where to Start'),
    arrowList((recs.practices || m.practices).slice(0, 3)),

    divider(),
    p('Over the next 30 days, you\u2019ll receive 5 more emails. Each one takes you a step deeper. Tomorrow: your first practice.', { dim: true, small: true }),
  ].join('\n');

  return wrapEmail({
    headerTitle: 'Your Spiritual Path',
    headerSubtitle: 'opensadhaka.com \u00b7 Faith Finder',
    body,
    cta: { url: 'https://www.opensadhaka.com/faith-finder', text: 'View Your Full Results \u2192' },
    footerReason: 'You received this because you completed the Faith Finder on <a href="https://www.opensadhaka.com" style="color:#d97706;text-decoration:none;">opensadhaka.com</a>.',
    preheader: `Your path: ${m.label} \u2014 the way of ${m.yogaName}`,
  });
}

// ─── Email 1: First Practice ─────────────────────────────────────────────────

function email1(result: QuizResult): string {
  const m = PATH_META[result.primaryPath] || PATH_META.inquiry;

  const PRACTICE_DETAILS: Record<
    PathKey,
    { howTo: string[]; tip: string; quote: { text: string; author: string } }
  > = {
    inquiry: {
      howTo: [
        'Find a quiet spot. Sit comfortably, spine upright.',
        'Close your eyes. Three slow breaths.',
        'Ask inwardly: <em>Who is aware of this breath?</em>',
        "Don't answer with words. Notice the noticing itself.",
        'When thoughts arise, ask again: <em>Who is aware of this thought?</em>',
        'Continue for 10 minutes. Rest in whatever remains.',
      ],
      tip: "Don't chase an answer. The inquiry IS the practice. You are turning attention toward its own source.",
      quote: {
        text: 'The question "Who am I?" is not meant to get an answer. The question is meant to dissolve the questioner.',
        author: 'Ramana Maharshi',
      },
    },
    devotion: {
      howTo: [
        'Choose one divine name that resonates: Om Namah Shivaya, Hare Krishna, or simply "God."',
        'Sit comfortably. No distractions.',
        'Repeat the name silently or in a low whisper, coordinating with your breath.',
        'When the mind wanders, return to the name. No frustration.',
        'One mala (108 repetitions) or 10 minutes \u2014 whichever comes first.',
        'End with 2 minutes of silence. Feel the presence of the name.',
      ],
      tip: 'Quality over quantity. Ten focused repetitions carry more weight than a thousand mechanical ones.',
      quote: {
        text: 'The Name of God, taken with love, is the greatest of all spiritual practices.',
        author: 'Sri Ramakrishna',
      },
    },
    ritual: {
      howTo: [
        'Before anything else in the morning, wash your hands and face.',
        'Light a single candle or incense stick. Even a small shelf works as an altar.',
        'Place a glass of water, a flower, or any small offering before it.',
        'Stand or sit quietly for 2 minutes. Acknowledge the light as the presence of the Divine.',
        'Speak an intention: <em>"May my actions today be an offering."</em>',
        'Bow once. The ritual is complete.',
      ],
      tip: 'Ritual is the art of making the invisible visible. Start small. Let the form deepen naturally over weeks.',
      quote: {
        text: 'Action done as worship, without attachment to results, is the highest sacrifice.',
        author: 'Bhagavad Gita (Ch. 4.23)',
      },
    },
    discipline: {
      howTo: [
        'Sit comfortably, spine long, shoulders relaxed.',
        'Close your eyes. Inhale through the nose for a count of 4.',
        'Hold the breath in for a count of 4.',
        'Exhale through the nose for a count of 6.',
        'Hold the breath out for a count of 2.',
        'This is one round. Complete 10 rounds. Build to 20 over the week.',
      ],
      tip: "Pranayama works on the bridge between body and mind. If 4-4-6-2 feels too long, start with 3-3-5-1. Don't force it.",
      quote: {
        text: 'When the breath wanders, the mind is unsteady. When the breath is still, the mind is still.',
        author: 'Hatha Yoga Pradipika (2.2)',
      },
    },
  };

  const pd = PRACTICE_DETAILS[result.primaryPath] || PRACTICE_DETAILS.inquiry;

  const body = [
    dayBadge('Day 1'),
    heading(`Your first practice: ${m.firstPractice}.`),
    p("Today you begin. Not because conditions are perfect. They never are. You begin because the path is here and so are you."),

    card('Step by Step', 'Set aside 10 minutes. That\u2019s all.'),

    numberedSteps(pd.howTo),

    quote(pd.quote.text, pd.quote.author),

    p(`<strong>Remember:</strong> ${pd.tip}`),

    divider(),
    p('In two days: the tradition your path comes from, and the teachers who walked it before you.', { dim: true, small: true }),
  ].join('\n');

  return wrapEmail({
    headerTitle: 'Day 1: Your First Practice',
    headerSubtitle: `${m.label} \u00b7 ${m.firstPractice}`,
    body,
    cta: { url: 'https://www.opensadhaka.com/practical-spiritual-practices', text: 'Explore More Practices \u2192' },
    footerReason: 'You received this because you completed the Faith Finder on <a href="https://www.opensadhaka.com" style="color:#d97706;text-decoration:none;">opensadhaka.com</a>.',
    preheader: `10 minutes. Your first ${m.firstPractice.toLowerCase()} practice.`,
  });
}

// ─── Email 2: The Tradition ──────────────────────────────────────────────────

function email2(result: QuizResult): string {
  const m = PATH_META[result.primaryPath] || PATH_META.inquiry;

  const TRADITION_DETAIL: Record<
    PathKey,
    { intro: string; what: string; where: string; link: string; linkText: string }
  > = {
    inquiry: {
      intro: 'Your path has a name: <strong>Jnana Yoga</strong>. Its philosophical home is <strong>Advaita Vedanta</strong> \u2014 the teaching of non-duality, systematized by Adi Shankaracharya in 8th century India.',
      what: 'Advaita means "not two." The individual self (atman) and ultimate reality (Brahman) are not separate. The sense of being a separate person is a superimposition \u2014 real as a dream, but not the deepest truth.',
      where: 'The Upanishads \u2014 especially the Mandukya, Brihadaranyaka, and Chandogya \u2014 are the scriptural foundation. Shankaracharya\u2019s commentaries make them navigable. Ramana Maharshi brought the practice into its simplest modern form.',
      link: 'https://www.opensadhaka.com/advaita-vedanta-explained',
      linkText: 'Read: Advaita Vedanta Explained',
    },
    devotion: {
      intro: 'Your path finds its fullest expression in <strong>Bhakti Yoga</strong> \u2014 the yoga of love. It runs through Vaishnavism, Shaivism, the Sufi tradition, and Christian mysticism.',
      what: 'Bhakti is not sentimentality. It is a disciplined cultivation of love \u2014 turning the entire being toward the Divine. The Narada Bhakti Sutras define it as supreme love for God (paramabhakti) that carries no motive other than love itself.',
      where: 'The Bhagavata Purana is the great ocean of bhakti literature. Mirabai\u2019s songs, the Alvars\u2019 Divya Prabandham, and Rumi\u2019s Masnavi all belong to this current.',
      link: 'https://www.opensadhaka.com/shaivism-vs-vaishnavism',
      linkText: 'Read: Shaivism vs Vaishnavism',
    },
    ritual: {
      intro: 'Your path is ancient \u2014 arguably the oldest spiritual path in the world. In the Indian tradition it flows through <strong>Karma Kanda</strong> (the ritual portion of the Vedas), Agamic Shaivism, and Tantric practice.',
      what: 'Ritual is not ceremony. It is the art of consecrating action \u2014 bringing the sacred into ordinary time and space. When performed with awareness, every act becomes an offering. The ordinary world becomes a temple.',
      where: 'The Agamas contain the most systematic instructions. The Tantra Shastra explores how sacred geometry, mantra, and gesture (mudra) work together. The Gita\u2019s chapter on yajna provides the philosophical backbone.',
      link: 'https://www.opensadhaka.com/adi-shankaracharya-life-teachings',
      linkText: "Read: Adi Shankaracharya's Legacy",
    },
    discipline: {
      intro: "Your path is codified in Patanjali\u2019s <strong>Yoga Sutras</strong> \u2014 a 2,000-year-old map of the human mind and the systematic methods for bringing it to stillness.",
      what: 'Raja Yoga is not about physical postures. It is the science of consciousness \u2014 training the mind through ethical practice, physical steadiness, breath regulation, and graduated stages of meditation leading to samadhi.',
      where: 'The Yoga Sutras contain 196 aphorisms in four chapters. The second chapter \u2014 Sadhana Pada \u2014 lays out the eight-limbed path (Ashtanga) in precise sequence. Swami Vivekananda\u2019s commentary remains one of the clearest modern introductions.',
      link: 'https://www.opensadhaka.com/yoga-sutras-complete-guide',
      linkText: 'Read: Yoga Sutras Complete Guide',
    },
  };

  const td = TRADITION_DETAIL[result.primaryPath] || TRADITION_DETAIL.inquiry;

  const body = [
    dayBadge('Day 3'),
    heading('The tradition behind your path.'),
    p("Three days of practice. Now step back and understand what you\u2019re walking into \u2014 and who walked it before you."),
    p(td.intro),
    card('What It Teaches', td.what),
    p(td.where),
    card('Teachers Worth Knowing', 'Explore the lives of the masters who embodied this path on opensadhaka.com \u2014 their methods, their words, their transmission.'),
    divider(),
    p('Keep your daily practice going (even 10 minutes). In four days \u2014 one full week in \u2014 we pause to reflect.', { dim: true, small: true }),
  ].join('\n');

  return wrapEmail({
    headerTitle: 'Day 3: The Tradition',
    headerSubtitle: `${m.tradition} \u2014 what you\u2019re walking into`,
    body,
    cta: { url: td.link, text: `${td.linkText} \u2192` },
    footerReason: 'You received this because you completed the Faith Finder on <a href="https://www.opensadhaka.com" style="color:#d97706;text-decoration:none;">opensadhaka.com</a>.',
    preheader: `The ${m.tradition} tradition \u2014 who walked this path before you`,
  });
}

// ─── Email 3: One Week Reflection ────────────────────────────────────────────

function email3(result: QuizResult): string {
  const m = PATH_META[result.primaryPath] || PATH_META.inquiry;

  const REFLECTION_PROMPTS: Record<PathKey, string[]> = {
    inquiry: [
      'Any moments of unexpected stillness? What were you doing when they arose?',
      'Has the question "Who am I?" pointed to anything \u2014 even briefly?',
      'Is there something in you that stays constant, even as thoughts and moods shift?',
    ],
    devotion: [
      'Has japa settled the mind, or does it still feel mechanical? Both are valid at this stage.',
      'Any moment this week where you felt genuine warmth or gratitude toward something larger than yourself?',
      'What name or image of the Divine feels most alive to you right now?',
    ],
    ritual: [
      'Did you practice every morning? Even the days it felt perfunctory?',
      'Does beginning the day with a conscious act change how the rest unfolds?',
      'What small ritual could you add to your evening \u2014 even one minute of silence before sleep?',
    ],
    discipline: [
      'Has pranayama affected your mental state? Even subtly?',
      'Can you sit still for 10 minutes without significant restlessness?',
      'Notice the days you skipped. What triggered the skip?',
    ],
  };

  const SECOND_PRACTICE: Record<PathKey, { name: string; desc: string }> = {
    inquiry: {
      name: 'Neti Neti Meditation',
      desc: 'Systematically negate every appearance: "Not this body, not this thought, not this feeling..." until what remains cannot be negated.',
    },
    devotion: {
      name: 'Five-Minute Puja',
      desc: 'A small altar. A candle, a flower, one image. Offer each item with a silent word of love. End with a bow.',
    },
    ritual: {
      name: 'Sandhya (Twilight Practice)',
      desc: 'At sunset, sit quietly for five minutes. This liminal time between day and night has been considered sacred in nearly every tradition.',
    },
    discipline: {
      name: 'Dharana (Concentration)',
      desc: 'Fix your attention on a single point \u2014 the space between your eyebrows, the tip of the nose, or a candle flame \u2014 without shifting for five minutes.',
    },
  };

  const rp = REFLECTION_PROMPTS[result.primaryPath] || REFLECTION_PROMPTS.inquiry;
  const sp = SECOND_PRACTICE[result.primaryPath] || SECOND_PRACTICE.inquiry;

  const body = [
    dayBadge('Day 7'),
    heading('One week. Pause. Look back.'),
    p("Seven days is enough to notice something. Not transformation \u2014 that takes longer. But a shift in texture. A moment of unexpected clarity."),
    p('Sit for five minutes before reading further. Ask yourself:'),

    numberedSteps(rp.map((q) => `<em>${q}</em>`)),

    divider(),

    heading('Add a second practice.'),
    p("If you\u2019ve maintained even a partial version of your first practice, you\u2019re ready for a second layer."),

    card(sp.name, sp.desc),

    p(`Your stack for week two: <strong>${m.firstPractice}</strong> in the morning, <strong>${sp.name}</strong> later in the day. Consistency matters more than duration.`),

    quote('A little practice, done regularly and with full attention, is worth more than long sessions done occasionally.', 'Traditional teaching'),

    divider(),
    p('Next week: the philosophy behind your path \u2014 the ideas that make the practice make sense.', { dim: true, small: true }),
  ].join('\n');

  return wrapEmail({
    headerTitle: 'Day 7: One Week In',
    headerSubtitle: 'Reflect, notice, and add a second practice',
    body,
    cta: { url: 'https://www.opensadhaka.com/daily-spiritual-routine-beginners', text: 'Build Your Routine \u2192' },
    footerReason: 'You received this because you completed the Faith Finder on <a href="https://www.opensadhaka.com" style="color:#d97706;text-decoration:none;">opensadhaka.com</a>.',
    preheader: `One week of ${m.firstPractice.toLowerCase()} \u2014 time to reflect and add a second practice`,
  });
}

// ─── Email 4: Philosophy Deep Dive ───────────────────────────────────────────

function email4(result: QuizResult): string {
  const m = PATH_META[result.primaryPath] || PATH_META.inquiry;

  const PHILOSOPHY: Record<
    PathKey,
    { heading: string; intro: string; points: { title: string; body: string }[]; closing: string }
  > = {
    inquiry: {
      heading: 'The four great sayings (Mahavakyas) of Advaita Vedanta',
      intro: "Two weeks of practice. You\u2019re ready for the ideas that make it make sense. Advaita Vedanta rests on four condensed statements \u2014 one from each Veda.",
      points: [
        { title: 'Prajnanam Brahma', body: '"Consciousness is Brahman." (Aitareya Upanishad) \u2014 Awareness itself is the ultimate reality, not a product of the brain.' },
        { title: 'Aham Brahmasmi', body: '"I am Brahman." (Brihadaranyaka Upanishad) \u2014 The individual self, rightly understood, is identical with ultimate reality.' },
        { title: 'Tat Tvam Asi', body: '"Thou art That." (Chandogya Upanishad) \u2014 Teacher to student: you are the very reality you seek.' },
        { title: 'Ayam Atma Brahma', body: '"This self is Brahman." (Mandukya Upanishad) \u2014 The self being contemplated in inquiry is already what it seeks.' },
      ],
      closing: "These are not beliefs to adopt. They are pointers. Self-inquiry is meant to make them directly verifiable \u2014 not as intellectual positions, but as lived reality.",
    },
    devotion: {
      heading: 'The nine forms of bhakti \u2014 stages of devotional love',
      intro: "The Bhagavata Purana describes nine progressive forms of devotion (navavidha bhakti). Not hierarchical steps \u2014 different expressions of the same love.",
      points: [
        { title: 'Shravana', body: 'Listening to the names and stories of the Divine. Simply hearing is itself transformative.' },
        { title: 'Kirtana', body: 'Singing the glories of the Divine \u2014 vocal expression of love in mantra, hymn, and song.' },
        { title: 'Smarana', body: 'Constant remembrance \u2014 holding the Divine in awareness through ordinary life.' },
        { title: 'Pada Sevana', body: 'Service \u2014 seeing the Divine in all beings and serving them as worship.' },
        { title: 'Archana through Atma Nivedana', body: 'From formal ritual worship through complete self-surrender \u2014 outer forms mirroring the inner journey.' },
      ],
      closing: 'The goal of bhakti is not to become devoted. It is to become love itself \u2014 to dissolve the distance between lover and Beloved.',
    },
    ritual: {
      heading: 'Pancha Mahayajna \u2014 the five great daily sacrifices',
      intro: 'The Vedic tradition identifies five obligations that constitute a sacred life. Not burdens \u2014 orientations. A way of seeing every relationship as sacred exchange.',
      points: [
        { title: 'Brahma Yajna', body: 'Daily study or recitation of scripture \u2014 an offering to the lineage of knowledge that preceded you.' },
        { title: 'Deva Yajna', body: 'Offering to the forces of nature \u2014 fire, water, sun, and the invisible intelligences governing the cosmos.' },
        { title: 'Pitru Yajna', body: 'Offering to ancestors \u2014 honoring those who gave you the body and tradition you inherit.' },
        { title: 'Manushya Yajna', body: 'Feeding and serving fellow humans \u2014 the sacred duty of hospitality.' },
        { title: 'Bhuta Yajna', body: 'Care for all living beings \u2014 widening the circle of sacred obligation.' },
      ],
      closing: 'These five practices, performed daily, weave the practitioner into the fabric of existence. The ritual path is not escape from the world \u2014 it is a method of living fully within it.',
    },
    discipline: {
      heading: "The eight limbs of Ashtanga Yoga \u2014 Patanjali\u2019s complete map",
      intro: "Two weeks in. You\u2019ve been working with pranayama \u2014 the fourth limb. Here is the complete system.",
      points: [
        { title: 'Yama & Niyama (limbs 1\u20132)', body: 'Ethical restraints and observances. Non-harm, truthfulness, purity, contentment, discipline, self-study, surrender. The foundation everything else rests on.' },
        { title: 'Asana (limb 3)', body: "Stable, comfortable posture. In Patanjali\u2019s system this means sitting \u2014 preparation for meditation, not gymnastics." },
        { title: 'Pranayama (limb 4)', body: 'Regulation of the breath. Your current practice. Controlled breathing stills the mind and opens the door to deeper states.' },
        { title: 'Pratyahara (limb 5)', body: 'Withdrawal of the senses inward \u2014 the pivot between outer and inner practice.' },
        { title: 'Dharana, Dhyana, Samadhi (limbs 6\u20138)', body: 'Concentration, meditation, absorption \u2014 three progressive degrees of a single inward movement.' },
      ],
      closing: 'You are not starting from zero. You are already two limbs deep. The map is not the territory \u2014 but having the map changes how you walk.',
    },
  };

  const ph = PHILOSOPHY[result.primaryPath] || PHILOSOPHY.inquiry;

  const body = [
    dayBadge('Day 14'),
    heading(`${ph.heading}.`),
    p(ph.intro),
    numberedSteps(ph.points.map((pt) => `<strong>${pt.title}</strong> \u2014 ${pt.body}`)),
    quote(ph.closing, ''),
    card('For Deeper Study', `Read <strong>${m.philosophyArticle}</strong> on opensadhaka.com \u2014 written for practitioners at this stage.`),
    divider(),
    p('In two weeks \u2014 your 30-day mark \u2014 we close the sequence with what comes next.', { dim: true, small: true }),
  ].join('\n');

  return wrapEmail({
    headerTitle: 'Day 14: The Philosophy',
    headerSubtitle: 'The ideas that make the practice make sense',
    body,
    cta: { url: m.philosophyLink, text: `Read: ${m.philosophyArticle} \u2192` },
    footerReason: 'You received this because you completed the Faith Finder on <a href="https://www.opensadhaka.com" style="color:#d97706;text-decoration:none;">opensadhaka.com</a>.',
    preheader: `${ph.heading} \u2014 the philosophy behind your practice`,
  });
}

// ─── Email 5: What Comes Next ────────────────────────────────────────────────

function email5(result: QuizResult): string {
  const m = PATH_META[result.primaryPath] || PATH_META.inquiry;

  const NEXT_STEPS: Record<PathKey, { milestone: string; deepen: string[]; next: string }> = {
    inquiry: {
      milestone:
        'Thirty days of turning attention toward its source. The question "Who am I?" may still feel unanswered. That is accuracy, not failure. The false self does not dissolve on a schedule.',
      deepen: [
        'Read Ramana Maharshi\u2019s "Who Am I?" \u2014 14 pages that contain more than most libraries.',
        'Find Nisargadatta Maharaj\u2019s "I Am That" \u2014 dialogues that strip away every false assumption.',
        'Add a second sitting period in the evening. 10\u201315 minutes. Same practice: pure inquiry.',
      ],
      next: 'If inquiry feels like your permanent home, explore Neo-Advaita teachers like Rupert Spira or traditional teachers in the Ramana lineage.',
    },
    devotion: {
      milestone:
        "Thirty days of japa. Roughly 3,000 repetitions of the divine name, minimum. Something has been planted. Whether you feel it yet or not.",
      deepen: [
        'Add kirtan \u2014 attend a local satsang or sing along with traditional chant recordings.',
        'Build a dedicated altar space, however small. Giving the practice a physical home matters.',
        'Read the Narada Bhakti Sutras \u2014 84 aphorisms that map the entire geography of devotional love.',
      ],
      next: 'Seek community. A temple, a kirtan group, a satsang. The bhakti path thrives in relationship.',
    },
    ritual: {
      milestone:
        "Thirty days of morning practice \u2014 beginning each day with a conscious act of consecration. Most people never do it once. You\u2019ve done it thirty times.",
      deepen: [
        'Learn the Gayatri Mantra \u2014 the 24-syllable Vedic prayer recited at dawn, midday, and dusk for thousands of years.',
        'Add an evening ritual \u2014 even one minute of stillness before sleep.',
        'Study the Agamas or Shaiva Siddhanta for the philosophical backbone of ritual practice.',
      ],
      next: 'For deeper initiation into ritual practice, find a qualified teacher from an unbroken lineage. Some forms are meant to be transmitted directly.',
    },
    discipline: {
      milestone:
        "Thirty days of pranayama. If you\u2019ve been consistent, your nervous system has noticed. The breath is the most direct lever on the state of the mind.",
      deepen: [
        'Begin formal sitting meditation: 15\u201320 minutes of dhyana immediately after pranayama.',
        'Read the Yoga Sutras directly \u2014 Book II (Sadhana Pada) will feel like a precise description of what you\u2019ve been experiencing.',
        'Add one Yama practice for the next 30 days \u2014 Ahimsa (non-harm) or Satya (truthfulness) \u2014 and observe where it challenges you.',
      ],
      next: 'The eight-limbed path is a complete system. Deepen one limb at a time rather than spreading attention across all eight.',
    },
  };

  const ns = NEXT_STEPS[result.primaryPath] || NEXT_STEPS.inquiry;

  const body = [
    dayBadge('Day 30'),
    heading('One month. Most people stop here. You\u2019re just getting started.'),
    p(ns.milestone),

    card('Three Next Steps', 'In order of simplicity:'),
    numberedSteps(ns.deepen),

    quote(ns.next, ''),

    divider(),

    heading('opensadhaka.com is here for the whole journey.'),
    p('The Faith Finder was your beginning. The library holds traditions, teachers, sacred texts, and practices \u2014 mapped and interconnected \u2014 so you can follow the thread wherever it leads.'),
    p('This is the last email in your sequence. The practice continues. Walk well.'),
    p('\u2014 The Sadhaka team', { dim: true, small: true }),
  ].join('\n');

  return wrapEmail({
    headerTitle: 'Day 30: Your Path Continues',
    headerSubtitle: `${m.label} \u2014 what comes next`,
    body,
    cta: { url: 'https://www.opensadhaka.com', text: 'Continue on opensadhaka.com \u2192' },
    footerReason: 'You received this because you completed the Faith Finder on <a href="https://www.opensadhaka.com" style="color:#d97706;text-decoration:none;">opensadhaka.com</a>.',
    preheader: `30 days on the ${m.label}. Here\u2019s what comes next.`,
  });
}

// ─── Subject lines ───────────────────────────────────────────────────────────

const SUBJECTS: Record<number, (path: PathKey) => string> = {
  0: (path) =>
    ({
      inquiry: 'Your path: the way of inquiry',
      devotion: 'Your path: the way of devotion',
      ritual: 'Your path: the way of ritual',
      discipline: 'Your path: the way of discipline',
    })[path] || 'Your spiritual path has been revealed',

  1: (path) =>
    ({
      inquiry: 'Day 1: Self-inquiry \u2014 10 minutes, eyes closed',
      devotion: 'Day 1: Your first japa practice',
      ritual: 'Day 1: A small ritual to begin with',
      discipline: 'Day 1: Start with the breath',
    })[path] || 'Day 1: Your first practice',

  2: () => 'Day 3: The tradition behind your path',

  3: (path) =>
    ({
      inquiry: 'Day 7: One week of inquiry \u2014 what did you notice?',
      devotion: 'Day 7: One week of japa \u2014 how does it feel?',
      ritual: 'Day 7: One week of morning practice',
      discipline: 'Day 7: One week of pranayama',
    })[path] || 'Day 7: One week in',

  4: () => 'Day 14: The philosophy behind your practice',

  5: () => 'Day 30: The sequence ends. The practice doesn\u2019t.',
};

// ─── Public API ──────────────────────────────────────────────────────────────

const emailBuilders = [email0, email1, email2, email3, email4, email5];

export function buildEmail(emailIndex: number, result: QuizResult): string | null {
  const fn = emailBuilders[emailIndex];
  if (!fn) return null;
  return fn(result);
}

export function getSubject(emailIndex: number, path: PathKey): string {
  const fn = SUBJECTS[emailIndex];
  if (!fn) return 'Your Faith Finder Journey';
  return fn(path);
}

/** Days after submission when each email should be sent */
export const DRIP_SCHEDULE_DAYS = [0, 1, 3, 7, 14, 30];
