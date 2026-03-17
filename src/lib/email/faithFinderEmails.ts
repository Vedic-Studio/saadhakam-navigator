/**
 * Faith Finder Email Sequence — TypeScript port of backend/email-content.js
 * 6 emails x 4 paths (inquiry, devotion, ritual, discipline)
 *
 * Sequence:
 *   Email 0 — Immediate: Results revealed
 *   Email 1 — Day 1:  Your first practice
 *   Email 2 — Day 3:  The tradition behind your path
 *   Email 3 — Day 7:  One week in — reflect & deepen
 *   Email 4 — Day 14: The philosophy that powers your path
 *   Email 5 — Day 30: What comes next
 */

import type { QuizResult } from "@/data/faithFinderQuiz";

type PathKey = "inquiry" | "devotion" | "ritual" | "discipline";

// ─── Shared HTML styles ────────────────────────────────────────────────────────

const STYLES = `
  body{font-family:Georgia,serif;line-height:1.75;color:#2d3748;background:#f7f4ef;margin:0;padding:0}
  .wrap{background:#f7f4ef;padding:30px 20px}
  .box{max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.07)}
  .hdr{padding:38px 40px 28px;background:linear-gradient(135deg,#78350f 0%,#d97706 100%);color:#fff;text-align:center}
  .hdr h1{margin:0 0 6px;font-size:23px;font-weight:normal;letter-spacing:.4px}
  .hdr p{margin:0;opacity:.88;font-size:13px}
  .body{padding:36px 40px}
  .badge{display:inline-block;background:#fffbeb;border:1px solid #f59e0b;color:#92400e;padding:5px 15px;border-radius:20px;font-size:12px;font-weight:700;margin-bottom:22px;letter-spacing:.4px}
  .day-badge{display:inline-block;background:#d97706;color:#fff;padding:4px 14px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;margin-bottom:18px}
  h2{font-size:21px;color:#1a202c;margin:0 0 14px;font-weight:normal}
  p{font-size:15px;color:#4a5568;margin:0 0 15px}
  .card{background:#fffbeb;border-left:4px solid #d97706;padding:18px 22px;border-radius:0 8px 8px 0;margin:22px 0}
  .card h3{margin:0 0 7px;font-size:15px;color:#92400e;font-weight:700}
  .card p{margin:0;font-size:14px;color:#6b4226}
  .steps{margin:18px 0;padding:0;list-style:none}
  .steps li{display:flex;gap:12px;margin-bottom:12px;font-size:14px;color:#4a5568;align-items:flex-start}
  .num{background:#d97706;color:#fff;min-width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;margin-top:2px}
  .quote{background:#fef3c7;border-radius:8px;padding:18px 22px;margin:22px 0;font-style:italic;color:#6b4226;font-size:15px}
  .quote cite{display:block;margin-top:7px;font-style:normal;font-size:12px;font-weight:700;color:#92400e}
  .divider{border:none;border-top:1px solid #f0e6d6;margin:26px 0}
  .cta{text-align:center;margin-top:28px}
  .btn{display:inline-block;padding:13px 30px;background:linear-gradient(135deg,#78350f 0%,#d97706 100%);color:#fff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:700;letter-spacing:.3px}
  .foot{padding:22px 40px;background:#faf7f3;text-align:center;font-size:12px;color:#9ca3af;border-top:1px solid #e5d6c8}
  .foot a{color:#d97706;text-decoration:none}
`;

function wrap(headerTitle: string, headerSub: string, body: string, ctaUrl: string, ctaText: string): string {
  return `<!DOCTYPE html><html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${STYLES}</style></head>
<body><div class="wrap"><div class="box">
  <div class="hdr"><h1>${headerTitle}</h1><p>${headerSub}</p></div>
  <div class="body">${body}<div class="cta"><a href="${ctaUrl}" class="btn">${ctaText}</a></div></div>
  <div class="foot">
    <p>You received this because you completed the Faith Finder on <a href="https://www.opensadhaka.com">opensadhaka.com</a>.</p>
    <p><a href="https://www.opensadhaka.com/unsubscribe">Unsubscribe</a></p>
  </div>
</div></div></body></html>`;
}

// ─── Path meta ─────────────────────────────────────────────────────────────────

const PATH_META: Record<PathKey, {
  label: string; yogaName: string; tradition: string; coreQuestion: string;
  primaryTeacher: string; firstPractice: string; firstText: string;
  philosophy: string; philosophyLink: string; philosophyArticle: string;
  traditions: string[]; practices: string[];
}> = {
  inquiry: {
    label: 'Path of Inquiry', yogaName: 'Jnana Yoga', tradition: 'Advaita Vedanta',
    coreQuestion: 'Who am I?', primaryTeacher: 'Ramana Maharshi',
    firstPractice: 'Self-Inquiry (Atma Vichara)', firstText: 'Talks with Sri Ramana Maharshi',
    philosophy: 'Advaita Vedanta', philosophyLink: 'https://www.opensadhaka.com/advaita-vedanta-explained',
    philosophyArticle: 'Advaita Vedanta Explained',
    traditions: ['Advaita Vedanta', 'Zen Buddhism', 'Dzogchen'],
    practices: ['Self-Inquiry', 'Neti Neti meditation', 'Silent sitting', 'Study of Upanishads'],
  },
  devotion: {
    label: 'Path of Devotion', yogaName: 'Bhakti Yoga', tradition: 'Vaishnavism / Bhakti',
    coreQuestion: 'How do I love the Divine?', primaryTeacher: 'Chaitanya Mahaprabhu',
    firstPractice: 'Japa \u2014 repetition of a divine name', firstText: 'Narada Bhakti Sutras',
    philosophy: 'Bhakti Vedanta', philosophyLink: 'https://www.opensadhaka.com/shaivism-vs-vaishnavism',
    philosophyArticle: 'Shaivism vs Vaishnavism',
    traditions: ['Vaishnavism', 'Sufism', 'Christian Mysticism'],
    practices: ['Japa / nama-sankirtana', 'Puja (devotional offering)', 'Kirtan (sacred chanting)', 'Reading devotional texts'],
  },
  ritual: {
    label: 'Path of Ritual', yogaName: 'Karma Yoga / Tantra', tradition: 'Vedic / Tantric',
    coreQuestion: 'How do I make every action sacred?', primaryTeacher: 'Adi Shankaracharya',
    firstPractice: 'Simple daily puja (ritual offering)', firstText: 'The Yoga of Action (Bhagavad Gita, Ch 3)',
    philosophy: 'Karma Yoga & Tantra', philosophyLink: 'https://www.opensadhaka.com/adi-shankaracharya-life-teachings',
    philosophyArticle: 'Adi Shankaracharya: Life & Teachings',
    traditions: ['Shaivism', 'Shakta Tantra', 'Vedic ritual'],
    practices: ['Morning puja', 'Mantra repetition', 'Ritual cleansing', 'Sacred calendar observance'],
  },
  discipline: {
    label: 'Path of Discipline', yogaName: 'Raja Yoga', tradition: "Patanjali's Ashtanga",
    coreQuestion: 'How do I master the mind?', primaryTeacher: 'Patanjali',
    firstPractice: 'Pranayama \u2014 conscious breath regulation', firstText: 'Yoga Sutras of Patanjali',
    philosophy: 'Samkhya-Yoga', philosophyLink: 'https://www.opensadhaka.com/yoga-sutras-complete-guide',
    philosophyArticle: 'Yoga Sutras: Complete Guide',
    traditions: ['Raja Yoga', 'Theravada Buddhism', 'Taoist inner alchemy'],
    practices: ['Pranayama (breath control)', 'Dhyana (formal meditation)', 'Pratyahara (sense withdrawal)', 'Yama & Niyama (ethical training)'],
  },
};

const PATH_DESCRIPTIONS: Record<PathKey, string> = {
  inquiry: 'Your path is one of deep inquiry and contemplation. You are naturally drawn to understanding the nature of reality, consciousness, and the self through philosophical exploration and direct investigation.',
  devotion: 'Your path is one of heart-centered devotion. You feel a natural love for the Divine and find meaning in worship, surrender, and the cultivation of sacred relationship.',
  ritual: 'Your path honors tradition and sacred action. You find power in precise practice, ceremony, and the structured observance of spiritual rites \u2014 making every act an offering.',
  discipline: 'Your path is one of methodical cultivation. You are drawn to systematic practice, training the mind and body through structured, graduated methods toward mastery and stillness.',
};

// ─── Email builders ────────────────────────────────────────────────────────────
// Each returns full HTML string. Ported 1:1 from backend/email-content.js.

function email0(result: QuizResult): string {
  const m = PATH_META[result.primaryPath] || PATH_META.inquiry;
  const scores = result.scores || { inquiry: 0, devotion: 0, ritual: 0, discipline: 0 };
  const recs = result.recommendations || { traditions: [], practices: [], philosophies: [] };

  const body = `
    <div class="badge">${m.label} \u00b7 ${m.yogaName}</div>
    <h2>Your spiritual path has been revealed.</h2>
    <p>Namaste. After reflecting on your answers, one path stands out clearly: <strong>${m.label}</strong> \u2014 the way of <strong>${m.yogaName}</strong>.</p>
    <p>This doesn't mean you're limited to one path. It means this is your natural entry point \u2014 the door through which the tradition is most alive for you right now.</p>

    <div class="card">
      <h3>${m.label} \u2014 What This Means</h3>
      <p>${PATH_DESCRIPTIONS[result.primaryPath]}</p>
    </div>

    <h3 style="font-size:16px;color:#1a202c;margin:24px 0 10px">Your Path Scores</h3>
    <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
      <tr style="background:#fffbeb">
        <td style="padding:8px 12px;font-size:14px;color:#92400e;font-weight:700;border-radius:6px 0 0 6px">Inquiry</td>
        <td style="padding:8px 12px;font-size:14px;color:#4a5568">${scores.inquiry || 0} pts</td>
      </tr>
      <tr>
        <td style="padding:8px 12px;font-size:14px;color:#92400e;font-weight:700">Devotion</td>
        <td style="padding:8px 12px;font-size:14px;color:#4a5568">${scores.devotion || 0} pts</td>
      </tr>
      <tr style="background:#fffbeb">
        <td style="padding:8px 12px;font-size:14px;color:#92400e;font-weight:700">Ritual</td>
        <td style="padding:8px 12px;font-size:14px;color:#4a5568">${scores.ritual || 0} pts</td>
      </tr>
      <tr>
        <td style="padding:8px 12px;font-size:14px;color:#92400e;font-weight:700;border-radius:0 0 0 6px">Discipline</td>
        <td style="padding:8px 12px;font-size:14px;color:#4a5568">${scores.discipline || 0} pts</td>
      </tr>
    </table>

    <h3 style="font-size:16px;color:#1a202c;margin:0 0 10px">Traditions Suited to Your Path</h3>
    <p>${(recs.traditions || m.traditions).join(' \u00b7 ')}</p>

    <h3 style="font-size:16px;color:#1a202c;margin:0 0 10px">Practices to Begin</h3>
    <ul class="steps">
      ${(recs.practices || m.practices).slice(0, 3).map(p => `<li><span class="num">\u2192</span><span>${p}</span></li>`).join('')}
    </ul>

    <hr class="divider">
    <p style="font-size:14px;color:#6b7280">Over the next 30 days, you'll receive 5 more emails \u2014 each one a step deeper into your path. Tomorrow we start with your very first practice.</p>
  `;

  return wrap('Your Spiritual Path', 'opensadhaka.com \u00b7 Faith Finder', body,
    'https://www.opensadhaka.com/faith-finder', 'View Your Full Results \u2192');
}

function email1(result: QuizResult): string {
  const m = PATH_META[result.primaryPath] || PATH_META.inquiry;

  const PRACTICE_DETAILS: Record<PathKey, { howTo: string[]; tip: string; quote: { text: string; author: string } }> = {
    inquiry: {
      howTo: [
        'Find a quiet spot. Sit comfortably with your spine upright.',
        'Close your eyes. Take three slow breaths.',
        'Ask inwardly: <em>"Who is aware of this breath?"</em>',
        "Don't answer with words. Simply notice the noticing itself.",
        'When thoughts arise, ask again: <em>"Who is aware of this thought?"</em>',
        'Continue for 10 minutes. Rest in the open awareness that remains.',
      ],
      tip: "Don't try to find an answer \u2014 the inquiry IS the practice. The goal is to turn attention back toward its own source.",
      quote: { text: 'The question "Who am I?" is not meant to get an answer. The question is meant to dissolve the questioner.', author: 'Ramana Maharshi' },
    },
    devotion: {
      howTo: [
        'Choose one name of the Divine that resonates with you \u2014 Om Namah Shivaya, Hare Krishna, or simply "God."',
        'Find a quiet spot and sit comfortably.',
        'Repeat the name silently or in a low whisper, coordinating with your breath.',
        'When the mind wanders, gently return to the name without frustration.',
        'Do one mala (108 repetitions) or 10 minutes \u2014 whichever comes first.',
        'End by sitting in stillness for 2 minutes, feeling the presence of the name.',
      ],
      tip: 'The quality of attention matters more than the quantity. Even 10 focused repetitions carry more weight than 1000 mechanical ones.',
      quote: { text: 'The Name of God, taken with love, is the greatest of all spiritual practices.', author: 'Sri Ramakrishna' },
    },
    ritual: {
      howTo: [
        'Before anything else in the morning, wash your hands and face.',
        'Light a single candle or incense stick at your altar space (even a small shelf works).',
        'Place a glass of water, a flower, or any small offering before it.',
        'Stand or sit quietly for 2 minutes. Acknowledge the light as the presence of the Divine.',
        'Speak an intention or prayer \u2014 silently or aloud. It can be as simple as: <em>"May my actions today be an offering."</em>',
        'Bow once. The ritual is complete.',
      ],
      tip: 'Ritual is not superstition \u2014 it is the art of making the invisible visible. Start small and let the form deepen naturally over weeks.',
      quote: { text: 'Action done as worship, without attachment to results, is the highest sacrifice.', author: 'Bhagavad Gita (Ch. 4.23)' },
    },
    discipline: {
      howTo: [
        'Sit in a comfortable upright position. Spine long, shoulders relaxed.',
        'Close your eyes. Inhale through the nose for a count of 4.',
        'Hold the breath in for a count of 4.',
        'Exhale through the nose for a count of 6.',
        'Hold the breath out for a count of 2.',
        'This is one round. Complete 10 rounds. Build to 20 over the week.',
      ],
      tip: "Pranayama works on the bridge between body and mind. Don't force the counts \u2014 if 4-4-6-2 feels too long, start with 3-3-5-1.",
      quote: { text: 'When the breath wanders, the mind is unsteady. When the breath is still, the mind is still.', author: 'Hatha Yoga Pradipika (2.2)' },
    },
  };

  const pd = PRACTICE_DETAILS[result.primaryPath] || PRACTICE_DETAILS.inquiry;

  const body = `
    <div class="day-badge">Day 1</div>
    <h2>Your first practice on the ${m.label}.</h2>
    <p>Today is the day you begin. Not because conditions are perfect \u2014 they never are \u2014 but because the path is there and you are here.</p>
    <p>Your first practice: <strong>${m.firstPractice}</strong>.</p>

    <div class="card">
      <h3>How to Do It \u2014 Step by Step</h3>
      <p>Set aside 10 minutes. That's all you need.</p>
    </div>

    <ul class="steps">
      ${pd.howTo.map((step, i) => `<li><span class="num">${i + 1}</span><span>${step}</span></li>`).join('')}
    </ul>

    <div class="quote">
      "${pd.quote.text}"
      <cite>\u2014 ${pd.quote.author}</cite>
    </div>

    <p><strong>One thing to remember:</strong> ${pd.tip}</p>

    <hr class="divider">
    <p style="font-size:14px;color:#6b7280">In two days, we'll introduce you to the tradition your path comes from \u2014 and the teachers who walked it before you.</p>
  `;

  return wrap('Day 1: Your First Practice', `${m.label} \u00b7 ${m.firstPractice}`, body,
    'https://www.opensadhaka.com/practical-spiritual-practices', 'Explore More Practices \u2192');
}

function email2(result: QuizResult): string {
  const m = PATH_META[result.primaryPath] || PATH_META.inquiry;

  const TRADITION_DETAIL: Record<PathKey, { intro: string; what: string; where: string; link: string; linkText: string }> = {
    inquiry: {
      intro: 'The path of inquiry has a name: <strong>Jnana Yoga</strong>, and its philosophical home is <strong>Advaita Vedanta</strong> \u2014 the teaching of non-duality first systematized by Adi Shankaracharya in 8th century India.',
      what: 'Advaita means "not two." The teaching is radical: the individual self (atman) and ultimate reality (Brahman) are not separate. The sense of being a separate person is a superimposition \u2014 real like a dream, but not the deepest truth.',
      where: "The Upanishads \u2014 especially the Mandukya, Brihadaranyaka, and Chandogya \u2014 are the scriptural foundation. Shankaracharya's commentaries make them navigable. Ramana Maharshi brought the practice into its simplest modern form.",
      link: 'https://www.opensadhaka.com/advaita-vedanta-explained',
      linkText: 'Read: Advaita Vedanta Explained',
    },
    devotion: {
      intro: 'The path of devotion finds its fullest expression in <strong>Bhakti Yoga</strong> \u2014 the yoga of love. It runs through Vaishnavism, Shaivism, the Sufi tradition, and Christian mysticism, surfacing wherever the heart turns toward the sacred.',
      what: 'Bhakti is more than emotion. It is a disciplined cultivation of love \u2014 a turning of the entire being toward the Divine. The Narada Bhakti Sutras define it as "supreme love for God" \u2014 paramabhakti \u2014 that carries no other motive than love itself.',
      where: "The Bhagavata Purana is the great ocean of bhakti literature. The 12th book especially reads like a manual for devotional practice. Mirabai's songs, the Alvars' Divya Prabandham, and Rumi's Masnavi all belong to this current.",
      link: 'https://www.opensadhaka.com/shaivism-vs-vaishnavism',
      linkText: 'Read: Shaivism vs Vaishnavism',
    },
    ritual: {
      intro: 'The path of ritual is ancient \u2014 arguably the oldest spiritual path in the world. In the Indian tradition it flows through <strong>Karma Kanda</strong> (the ritual portion of the Vedas), Agamic Shaivism, and Tantric practice.',
      what: 'Ritual is not mere ceremony. It is the art of consecrating action \u2014 of bringing the sacred into ordinary time and space. The principle is simple: when performed with awareness and intention, every act becomes an offering, and the ordinary world becomes a temple.',
      where: "The Agamas contain the most systematic instructions for ritual practice. The Tantra Shastra explores how sacred geometry, mantra, and ritual gesture (mudra) work together. The Gita's chapter on yajna (sacred action) provides the philosophical backbone.",
      link: 'https://www.opensadhaka.com/adi-shankaracharya-life-teachings',
      linkText: "Read: Adi Shankaracharya's Legacy",
    },
    discipline: {
      intro: "The path of discipline is codified most precisely in Patanjali's <strong>Yoga Sutras</strong> \u2014 a 2,000-year-old map of the human mind and the systematic methods for bringing it to stillness.",
      what: 'Raja Yoga is not about physical postures. It is the science of consciousness \u2014 of training the mind through ethical practice (yama/niyama), physical steadiness (asana), breath regulation (pranayama), and graduated stages of meditation leading to samadhi.',
      where: "The Yoga Sutras contain 196 aphorisms in four chapters. The second chapter \u2014 Sadhana Pada \u2014 is the most practical, laying out the eight-limbed path (Ashtanga) in precise sequence. Swami Vivekananda's commentary remains one of the clearest modern introductions.",
      link: 'https://www.opensadhaka.com/yoga-sutras-complete-guide',
      linkText: 'Read: Yoga Sutras Complete Guide',
    },
  };

  const td = TRADITION_DETAIL[result.primaryPath] || TRADITION_DETAIL.inquiry;

  const body = `
    <div class="day-badge">Day 3</div>
    <h2>The tradition behind your path.</h2>
    <p>You've practiced for three days. Now let's step back and understand what you're walking into \u2014 and who walked it before you.</p>
    <p>${td.intro}</p>
    <div class="card"><h3>What It Actually Teaches</h3><p>${td.what}</p></div>
    <p>${td.where}</p>
    <div class="card"><h3>Teachers Worth Knowing</h3><p>Explore the lives of the great masters who embodied this path on opensadhaka.com \u2014 their biographies, their methods, their words.</p></div>
    <hr class="divider">
    <p style="font-size:14px;color:#6b7280">Continue your daily practice (even 10 minutes counts). In four days \u2014 one full week in \u2014 we'll pause to reflect on what you've noticed so far.</p>
  `;

  return wrap('Day 3: The Tradition', `${m.tradition} \u2014 what you're walking into`, body,
    td.link, td.linkText + ' \u2192');
}

function email3(result: QuizResult): string {
  const m = PATH_META[result.primaryPath] || PATH_META.inquiry;

  const REFLECTION_PROMPTS: Record<PathKey, string[]> = {
    inquiry: [
      'Have you had any moments of unexplained peace or stillness? What were you doing when they arose?',
      'Has the question "Who am I?" pointed to anything \u2014 even briefly?',
      'Notice: is there something in you that remains constant even as thoughts and moods change?',
    ],
    devotion: [
      'Has the practice of repetition (japa) settled the mind, or does it feel mechanical still? Both are valid.',
      'Has there been any moment this week where you felt genuine warmth, love, or gratitude toward something larger than yourself?',
      'What name or image of the Divine feels most alive to you right now?',
    ],
    ritual: [
      'Did you perform your morning practice every day? Even on the days it felt perfunctory?',
      'Notice: does beginning the day with a conscious act change anything about how the day unfolds?',
      'What small ritual could you add to your evening \u2014 even just one minute of silence before sleep?',
    ],
    discipline: [
      'Has the pranayama affected your mental state? Even subtly?',
      'Are you able to sit still for 10 minutes without significant restlessness?',
      'Notice any days where you skipped practice. What triggered the skip?',
    ],
  };

  const SECOND_PRACTICE: Record<PathKey, { name: string; desc: string }> = {
    inquiry: { name: 'Neti Neti Meditation', desc: 'Systematically negate every appearance: "Not this body, not this thought, not this feeling..." until what remains cannot be negated.' },
    devotion: { name: 'Five-Minute Puja', desc: 'Build a small altar with a candle, a flower, and one image. Offer each item with a silent word of love. End with a bow.' },
    ritual: { name: 'Sandhya (Twilight Practice)', desc: 'At sunset, sit quietly for five minutes. This liminal time between day and night has been considered sacred in nearly every tradition.' },
    discipline: { name: 'Dharana (Concentration)', desc: 'Fix your attention on a single point \u2014 the space between your eyebrows, the tip of the nose, or a candle flame \u2014 without shifting for five minutes.' },
  };

  const rp = REFLECTION_PROMPTS[result.primaryPath] || REFLECTION_PROMPTS.inquiry;
  const sp = SECOND_PRACTICE[result.primaryPath] || SECOND_PRACTICE.inquiry;

  const body = `
    <div class="day-badge">Day 7</div>
    <h2>One week. Pause. Look back.</h2>
    <p>Seven days is enough to notice something. Not transformation \u2014 that takes longer \u2014 but a shift in texture. A moment of unexpected clarity. A subtle softening.</p>
    <p>Sit for five minutes before reading further, and ask yourself these questions:</p>
    <ul class="steps">
      ${rp.map(q => `<li><span class="num">?</span><span><em>${q}</em></span></li>`).join('')}
    </ul>
    <hr class="divider">
    <h2>Adding a second practice.</h2>
    <p>If you've maintained even a partial version of your first practice, you're ready to add a second layer.</p>
    <div class="card"><h3>${sp.name}</h3><p>${sp.desc}</p></div>
    <p>Your stack for week two: <strong>${m.firstPractice}</strong> in the morning, <strong>${sp.name}</strong> at another point in the day. Keep it simple. Consistency matters more than duration.</p>
    <div class="quote">"A little practice, done regularly and with full attention, is worth more than long sessions done occasionally."<cite>\u2014 Traditional teaching</cite></div>
    <hr class="divider">
    <p style="font-size:14px;color:#6b7280">In one week, we'll go into the philosophy behind your path \u2014 the ideas that make the practice make sense.</p>
  `;

  return wrap('Day 7: One Week In', 'Reflect, notice, and add a second practice', body,
    'https://www.opensadhaka.com/daily-spiritual-routine-beginners', 'Build Your Routine \u2192');
}

function email4(result: QuizResult): string {
  const m = PATH_META[result.primaryPath] || PATH_META.inquiry;

  const PHILOSOPHY: Record<PathKey, { heading: string; intro: string; points: { title: string; body: string }[]; closing: string }> = {
    inquiry: {
      heading: 'The four great sayings (Mahavakyas) of Advaita Vedanta',
      intro: "After two weeks of practice, you're ready for the ideas that make the practice make sense. Advaita Vedanta rests on four condensed statements \u2014 one from each of the four Vedas.",
      points: [
        { title: 'Prajnanam Brahma', body: '"Consciousness is Brahman." (Aitareya Upanishad) \u2014 Awareness itself is the ultimate reality, not a product of the brain.' },
        { title: 'Aham Brahmasmi', body: '"I am Brahman." (Brihadaranyaka Upanishad) \u2014 The individual self, rightly understood, is identical with ultimate reality.' },
        { title: 'Tat Tvam Asi', body: '"Thou art That." (Chandogya Upanishad) \u2014 Addressed teacher to student: you are the very reality you seek.' },
        { title: 'Ayam Atma Brahma', body: '"This self is Brahman." (Mandukya Upanishad) \u2014 The self being contemplated in inquiry is already what it seeks.' },
      ],
      closing: "These aren't beliefs to adopt. They're pointers. The practice of self-inquiry is meant to make these sayings directly verifiable \u2014 not as intellectual positions but as lived reality.",
    },
    devotion: {
      heading: 'The nine forms of bhakti \u2014 the stages of devotional love',
      intro: "The Bhagavata Purana describes nine progressive forms of devotion (navavidha bhakti). They aren't hierarchical steps so much as different expressions of the same love \u2014 each complete in itself.",
      points: [
        { title: 'Shravana', body: 'Listening to the names and stories of the Divine \u2014 simply hearing is itself transformative.' },
        { title: 'Kirtana', body: 'Singing the glories of the Divine \u2014 the vocal expression of love in mantra, hymn, and song.' },
        { title: 'Smarana', body: 'Constant remembrance \u2014 holding the Divine in awareness throughout ordinary life.' },
        { title: 'Pada Sevana', body: 'Service \u2014 seeing the Divine in all beings and serving them as an act of worship.' },
        { title: 'Archana through Atma Nivedana', body: 'From formal ritual worship through complete self-surrender \u2014 the outer forms that mirror the inner journey.' },
      ],
      closing: 'The goal of bhakti is not to become devoted but to become love itself \u2014 to dissolve the distance between lover and Beloved.',
    },
    ritual: {
      heading: 'Pancha Mahayajna \u2014 the five great daily sacrifices',
      intro: 'The Vedic tradition identifies five obligations that together constitute a sacred life. They are not burdens but orientations \u2014 a way of seeing every relationship as a sacred exchange.',
      points: [
        { title: 'Brahma Yajna', body: 'Daily study or recitation of scripture \u2014 an offering to the lineage of knowledge that preceded you.' },
        { title: 'Deva Yajna', body: 'Offering to the forces of nature \u2014 the fire, water, sun, and the invisible intelligences governing the cosmos.' },
        { title: 'Pitru Yajna', body: 'Offering to ancestors \u2014 honoring those who gave you the body and the tradition you inherit.' },
        { title: 'Manushya Yajna', body: 'Feeding and serving fellow humans \u2014 the sacred duty of hospitality and care.' },
        { title: 'Bhuta Yajna', body: 'Care for all living beings \u2014 setting aside something for animals and insects, widening the circle of sacred obligation.' },
      ],
      closing: 'These five practices, performed daily, weave the practitioner into the fabric of existence. The ritual path is not an escape from the world \u2014 it is a method of living fully within it.',
    },
    discipline: {
      heading: "The eight limbs of Ashtanga Yoga \u2014 Patanjali's complete map",
      intro: "Two weeks in, you've been working with pranayama \u2014 the fourth limb. Here is the complete system that surrounds it.",
      points: [
        { title: 'Yama & Niyama (limbs 1\u20132)', body: 'Ethical restraints (non-harm, truthfulness, non-stealing, continence, non-grasping) and observances (purity, contentment, discipline, self-study, surrender). The foundation everything else rests on.' },
        { title: 'Asana (limb 3)', body: "Stable, comfortable posture. In Patanjali's system this means sitting \u2014 the physical preparation for meditation, not gymnastics." },
        { title: 'Pranayama (limb 4)', body: 'Regulation of the breath. This is your current practice. The sutras describe how controlled breathing stills the mind and prepares it for deeper states.' },
        { title: 'Pratyahara (limb 5)', body: 'Withdrawal of the senses inward \u2014 the pivot point between outer and inner practice.' },
        { title: 'Dharana, Dhyana, Samadhi (limbs 6\u20138)', body: 'Concentration, meditation, and absorption \u2014 three progressive degrees of a single inward movement, described by Patanjali as "samyama."' },
      ],
      closing: 'You are not starting from zero. You are already two limbs deep. The map is not the territory \u2014 but having the map changes how you walk.',
    },
  };

  const ph = PHILOSOPHY[result.primaryPath] || PHILOSOPHY.inquiry;

  const body = `
    <div class="day-badge">Day 14</div>
    <h2>${ph.heading}.</h2>
    <p>${ph.intro}</p>
    <ul class="steps">
      ${ph.points.map(pt => `<li><span class="num">\u2192</span><span><strong>${pt.title}</strong> \u2014 ${pt.body}</span></li>`).join('')}
    </ul>
    <div class="quote">"${ph.closing}"</div>
    <div class="card"><h3>For deeper study</h3><p>Read the full article on <strong>${m.philosophyArticle}</strong> on opensadhaka.com \u2014 written specifically for practitioners at this stage.</p></div>
    <hr class="divider">
    <p style="font-size:14px;color:#6b7280">In two weeks \u2014 your full 30-day mark \u2014 we'll close the sequence with what comes next on your path.</p>
  `;

  return wrap('Day 14: The Philosophy', 'The ideas that make the practice make sense', body,
    m.philosophyLink, `Read: ${m.philosophyArticle} \u2192`);
}

function email5(result: QuizResult): string {
  const m = PATH_META[result.primaryPath] || PATH_META.inquiry;

  const NEXT_STEPS: Record<PathKey, { milestone: string; deepen: string[]; next: string }> = {
    inquiry: {
      milestone: 'You\'ve spent 30 days turning attention toward its source. The question "Who am I?" may still feel unanswered. That\'s not failure \u2014 that\'s accuracy. The false self doesn\'t dissolve on a schedule.',
      deepen: [
        'Read Ramana Maharshi\'s "Who Am I?" (free online \u2014 14 pages that contain more than most libraries).',
        'Find Nisargadatta Maharaj\'s "I Am That" \u2014 a record of dialogues that strips away every false assumption.',
        'Add a second formal sitting period in the evening. 10\u201315 minutes. Same practice: pure inquiry.',
      ],
      next: 'If inquiry feels like your permanent home \u2014 and for some people it is \u2014 consider exploring Neo-Advaita teachers like Rupert Spira or traditional teachers in the Ramana lineage.',
    },
    devotion: {
      milestone: "Thirty days of japa. That's roughly 3,000 repetitions of the divine name, minimum \u2014 probably more. Something has been planted. Whether you feel it yet or not.",
      deepen: [
        'Add kirtan \u2014 either attending a local satsang, or singing along with recordings of traditional chants.',
        'Build a dedicated altar space, however small. Giving the practice a physical home matters more than it seems.',
        'Read the Narada Bhakti Sutras \u2014 84 short aphorisms that map the entire geography of devotional love.',
      ],
      next: 'Seek out a community \u2014 a temple, a kirtan group, a satsang. The bhakti path thrives in relationship. The Divine is found in the meeting of hearts.',
    },
    ritual: {
      milestone: "Thirty days of morning practice \u2014 of beginning each day with a conscious act of consecration. This is not a small thing. Most people never do it once. You've done it thirty times.",
      deepen: [
        "Learn the Gayatri Mantra if you haven't already \u2014 the 24-syllable Vedic prayer recited at dawn, midday, and dusk for thousands of years.",
        'Add an evening ritual \u2014 even one minute of stillness before sleep, acknowledging what the day was.',
        'Study the Agamas or the Shaiva Siddhanta for the philosophical backbone of ritual practice.',
      ],
      next: "If you're drawn to deeper initiation into ritual practice, find a qualified teacher from an unbroken lineage. Some forms of practice are meant to be transmitted directly.",
    },
    discipline: {
      milestone: "Thirty days of pranayama practice. If you've been consistent, your nervous system has noticed. The breath is the most direct lever we have on the state of the mind. You've been pulling it daily.",
      deepen: [
        'Begin formal sitting meditation: 15\u201320 minutes of dhyana (open awareness or focused object meditation) immediately after pranayama.',
        "Read the Yoga Sutras of Patanjali directly \u2014 Book II (Sadhana Pada) will feel like a precise description of what you've been experiencing.",
        'Add one Yama practice consciously for the next 30 days \u2014 choose either Ahimsa (non-harm) or Satya (truthfulness) and observe where it challenges you.',
      ],
      next: 'The eight-limbed path is a complete system. You have the entry point. Now deepen one limb at a time rather than spreading attention across all eight simultaneously.',
    },
  };

  const ns = NEXT_STEPS[result.primaryPath] || NEXT_STEPS.inquiry;

  const body = `
    <div class="day-badge">Day 30</div>
    <h2>One month. This is where most people stop. You're just getting started.</h2>
    <p>${ns.milestone}</p>
    <div class="card"><h3>Where to go from here</h3><p>Three concrete next steps, in order of simplicity:</p></div>
    <ul class="steps">
      ${ns.deepen.map((step, i) => `<li><span class="num">${i + 1}</span><span>${step}</span></li>`).join('')}
    </ul>
    <div class="quote">"${ns.next}"</div>
    <hr class="divider">
    <h2 style="font-size:18px">opensadhaka.com is here for your whole journey.</h2>
    <p>The Faith Finder was your beginning. The app contains traditions, teachers, sacred texts, and practices \u2014 mapped and interconnected \u2014 so you can keep following the thread wherever it leads.</p>
    <p>This is the last email in your sequence. The practice continues. The tradition holds. Walk well.</p>
    <p style="font-size:13px;color:#9ca3af;margin-top:24px">\u2014 The Sadhaka team</p>
  `;

  return wrap('Day 30: Your Path Continues', `${m.label} \u2014 what comes next`, body,
    'https://www.opensadhaka.com', 'Continue on opensadhaka.com \u2192');
}

// ─── Subject lines ──────────────────────────────────────────────────────────────

const SUBJECTS: Record<number, (path: PathKey) => string> = {
  0: (path) => ({
    inquiry: 'Your path: the way of inquiry',
    devotion: 'Your path: the way of devotion',
    ritual: 'Your path: the way of ritual',
    discipline: 'Your path: the way of discipline',
  }[path] || 'Your spiritual path has been revealed'),

  1: (path) => ({
    inquiry: 'Day 1: Your first practice (10 minutes)',
    devotion: 'Day 1: Begin your first practice today',
    ritual: 'Day 1: A small ritual to start with',
    discipline: 'Day 1: Start with the breath',
  }[path] || 'Day 1: Your first practice'),

  2: () => 'Day 3: The tradition behind your path',

  3: (path) => ({
    inquiry: 'Day 7: One week \u2014 what have you noticed?',
    devotion: 'Day 7: One week of practice. How does it feel?',
    ritual: 'Day 7: One week of morning practice',
    discipline: 'Day 7: One week of pranayama',
  }[path] || 'Day 7: One week in \u2014 reflect and deepen'),

  4: () => 'Day 14: The philosophy that powers your path',

  5: () => "Day 30: The sequence ends. The practice doesn't.",
};

// ─── Public API ────────────────────────────────────────────────────────────────

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
