export interface SacredText {
  slug: string;
  title: string;
  sanskritTitle: string;
  summary: string;
  overview: string;
  themes: string[];
  whoItSuitsFor: string;
  howToApproach: string;
  keyVerses: { verse: string; translation: string; context: string }[];
  relatedTexts: string[];
  tags: string[];
  spotlight?: boolean;
  icon: string;
}

export const texts: SacredText[] = [
  {
    slug: "bhagavad-gita",
    title: "Bhagavad Gita",
    sanskritTitle: "भगवद्गीता",
    summary: "The 'Song of the Lord'—Krishna's teaching to Arjuna on dharma, yoga, and liberation.",
    overview: "The Bhagavad Gita, set on the battlefield of Kurukshetra, presents Lord Krishna's comprehensive teaching to the warrior Arjuna. In 700 verses, it addresses life's deepest questions: the nature of the self, right action, devotion, knowledge, and liberation. It synthesizes multiple paths—karma, jnana, bhakti, and raja yoga—into a unified vision.",
    themes: [
      "Dharma and righteous action",
      "The eternal nature of the atman",
      "Karma yoga: action without attachment",
      "Bhakti: devotion as a complete path",
      "The nature of the Divine (Krishna's cosmic form)",
      "Liberation while living"
    ],
    whoItSuitsFor: "Everyone. The Gita speaks to householders and renunciates, intellectuals and devotees, beginners and advanced practitioners. It meets readers where they are.",
    howToApproach: "Read the entire text through once for overview. Then study chapter by chapter with a good commentary (Shankaracharya for Advaita, Ramanuja for devotional perspective). Memorize key verses. Apply teachings to daily life situations.",
    keyVerses: [
      {
        verse: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन",
        translation: "You have a right to action alone, never to its fruits.",
        context: "The foundation of karma yoga—acting without attachment to results."
      },
      {
        verse: "योगः कर्मसु कौशलम्",
        translation: "Yoga is skill in action.",
        context: "True yoga is not withdrawal but mastery in engaged action."
      },
      {
        verse: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज",
        translation: "Abandoning all dharmas, take refuge in Me alone.",
        context: "Krishna's ultimate teaching on surrender and grace."
      }
    ],
    relatedTexts: ["Upanishads", "Brahma Sutras", "Yoga Sutras"],
    tags: ["foundational", "accessible", "comprehensive"],
    spotlight: true,
    icon: "BookOpen"
  },
  {
    slug: "upanishads",
    title: "Upanishads",
    sanskritTitle: "उपनिषद्",
    summary: "Mystical teachings at the heart of Vedanta, revealing the nature of Brahman and Atman.",
    overview: "The Upanishads (literally 'sitting near' a teacher) are the philosophical culmination of the Vedas. These texts, composed over centuries, contain the core insights of Vedanta: the identity of Atman and Brahman, the nature of reality, and the path to liberation through knowledge. Over 200 exist, though 10-13 are considered principal.",
    themes: [
      "Brahman: the ultimate reality",
      "Atman: the true self",
      "Identity of Atman and Brahman",
      "States of consciousness",
      "The path of knowledge (jnana marga)",
      "The nature of liberation (moksha)"
    ],
    whoItSuitsFor: "Contemplative seekers, philosophy students, those drawn to inquiry over devotion, and practitioners seeking the source texts of Vedantic thought.",
    howToApproach: "Begin with accessible Upanishads: Isha, Kena, Katha. Study with traditional commentary. Contemplate the mahavakyas. Let understanding arise through repeated reflection, not just intellectual grasp.",
    keyVerses: [
      {
        verse: "तत् त्वम् असि",
        translation: "You are That.",
        context: "Mahavakya from Chandogya Upanishad—direct statement of non-dual truth."
      },
      {
        verse: "अयम् आत्मा ब्रह्म",
        translation: "This Atman is Brahman.",
        context: "Mahavakya from Mandukya Upanishad affirming identity of self and absolute."
      }
    ],
    relatedTexts: ["Bhagavad Gita", "Brahma Sutras", "Vivekachudamani"],
    tags: ["philosophical", "contemplative", "foundational"],
    icon: "Scroll"
  },
  {
    slug: "yoga-sutras",
    title: "Yoga Sutras",
    sanskritTitle: "योगसूत्र",
    summary: "Patanjali's systematic guide to meditation, mental discipline, and liberation.",
    overview: "The Yoga Sutras, attributed to the sage Patanjali, present a systematic approach to liberation through mental discipline. In 196 concise aphorisms organized into four chapters, it defines yoga as 'chitta vritti nirodha' (cessation of mental fluctuations) and outlines the eight-limbed path (ashtanga yoga).",
    themes: [
      "Definition and nature of yoga",
      "The kleshas (afflictions) and their removal",
      "The eight limbs (ashtanga)",
      "Samyama and siddhis",
      "Kaivalya: liberation"
    ],
    whoItSuitsFor: "Serious meditators, those seeking systematic practice methods, yoga practitioners wanting philosophical depth, and seekers drawn to discipline and structure.",
    howToApproach: "Study with traditional commentary (Vyasa's is primary). Practice the limbs progressively. Memorize key sutras. Most importantly: practice, don't just study.",
    keyVerses: [
      {
        verse: "योगश्चित्तवृत्तिनिरोधः",
        translation: "Yoga is the cessation of the fluctuations of the mind.",
        context: "The foundational definition of yoga—sutra 1.2."
      },
      {
        verse: "अभ्यासवैराग्याभ्यां तन्निरोधः",
        translation: "This cessation comes through practice and non-attachment.",
        context: "The two essential means for achieving yoga."
      }
    ],
    relatedTexts: ["Hatha Yoga Pradipika", "Bhagavad Gita", "Samkhya Karika"],
    tags: ["practical", "systematic", "meditative"],
    icon: "Focus"
  },
  {
    slug: "devi-mahatmya",
    title: "Devi Mahatmya",
    sanskritTitle: "देवीमाहात्म्य",
    summary: "The glory of the Divine Mother—foundational text of Goddess worship.",
    overview: "The Devi Mahatmya (also known as Durga Saptashati or Chandi Path) narrates the Goddess's victories over demons, revealing her as the supreme power of the universe. Central to Shakta tradition, it is recited during Navaratri and is the primary text for Goddess devotees.",
    themes: [
      "The Goddess as supreme reality",
      "Divine feminine power (Shakti)",
      "Cosmic battle between divine and demonic forces",
      "The Goddess's multiple forms",
      "Grace and protection"
    ],
    whoItSuitsFor: "Those drawn to divine feminine energy, Shakta practitioners, seekers wanting devotional practice with philosophical depth, and anyone attracted to the Goddess.",
    howToApproach: "Learn proper recitation if possible. Read with translation first to understand the narrative. Recite during Navaratri. Contemplate the symbolic meanings of the battles described.",
    keyVerses: [
      {
        verse: "या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता",
        translation: "To that Goddess who dwells in all beings as power...",
        context: "From the famous hymn identifying the Goddess with all aspects of existence."
      }
    ],
    relatedTexts: ["Lalita Sahasranama", "Soundarya Lahari", "Devi Bhagavatam"],
    tags: ["devotional", "feminine", "ritualistic"],
    icon: "Sparkles"
  }
];

export function getTextBySlug(slug: string): SacredText | undefined {
  return texts.find(t => t.slug === slug);
}
