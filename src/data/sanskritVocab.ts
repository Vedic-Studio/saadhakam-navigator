export interface UsageExample {
  textContext: string; // e.g., "Bhagavad Gita 2.40"
  quoteSanskrit: string;
  quoteTranslation: string;
  explanation: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SanskritWord {
  slug: string;
  wordEnglish: string;
  wordDevanagari: string;
  transliteration: string;
  pronunciation: string; // Phonetic guide
  etymology: {
    root: string; // Dhatu
    rootMeaning: string;
    suffix?: string;
    formationExplanation: string;
  };
  primaryMeanings: string[];
  philosophicalContexts: {
    tradition: string; // e.g., "Vedanta", "Buddhism", "Yoga Sutras"
    meaning: string;
  }[];
  usageExamples: UsageExample[];
  relatedWords: string[]; // slugs of other words in the DB
  faqs: FaqItem[];
  summary: string;
}

export const sanskritVocab: SanskritWord[] = [
  {
    slug: "dharma",
    wordEnglish: "Dharma",
    wordDevanagari: "धर्म",
    transliteration: "dharma",
    pronunciation: "dhar-mah",
    etymology: {
      root: "dhṛ (धृ)",
      rootMeaning: "to hold, maintain, or uphold",
      formationExplanation:
        "Dharma is that which upholds or sustains the universe, society, and the individual.",
    },
    primaryMeanings: [
      "Righteousness or duty",
      "Cosmic law and order",
      "The intrinsic nature of a thing",
      "Religion or path",
    ],
    philosophicalContexts: [
      {
        tradition: "Vedic Literature",
        meaning:
          "The cosmic order (Ṛta) that governs the universe, and the ritual duties required to maintain it.",
      },
      {
        tradition: "Bhagavad Gita",
        meaning:
          "Sva-dharma (one's own duty) based on one's nature (Gunas) and stage of life, which must be performed without attachment.",
      },
      {
        tradition: "Buddhism",
        meaning:
          "The teachings of the Buddha; the universal truth common to all individuals at all times.",
      },
    ],
    usageExamples: [
      {
        textContext: "Mahabharata (Karna Parva)",
        quoteSanskrit: "धर्मो रक्षति रक्षितः",
        quoteTranslation: "Dharma protects those who protect it.",
        explanation:
          "This famous maxim asserts that upholding righteousness automatically builds a shield of moral and spiritual protection around the practitioner.",
      },
      {
        textContext: "Bhagavad Gita 4.7",
        quoteSanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत...",
        quoteTranslation:
          "Whenever there is a decline in Dharma, O Arjuna, I manifest Myself.",
        explanation:
          "Krishna promises to incarnate to restore the balance of cosmic and social order whenever it is severely threatened.",
      },
    ],
    relatedWords: ["karma", "satya", "yoga"],
    faqs: [
      {
        question: "What is the exact English translation of Dharma?",
        answer:
          "There is no single English word for Dharma. Depending on the context, it translates to duty, righteousness, religion, cosmic law, or the intrinsic nature of a thing.",
      },
      {
        question: "What is Sva-dharma?",
        answer:
          'Sva-dharma means "one\'s own duty." It refers to the specific responsibilities and actions appropriate for an individual based on their unique nature, stage of life, and circumstances.',
      },
      {
        question: "How is Dharma different from Karma?",
        answer:
          "Dharma refers to the righteous path or duty you are supposed to take. Karma refers to the actions you actually take and the universal law of cause and effect resulting from those actions. Doing your Dharma generates positive Karma.",
      },
    ],
    summary:
      "Dharma is a central concept in Sanatan Dharma, referring to the underlying order in nature and human life, signifying duty, righteousness, and cosmic law.",
  },
  {
    slug: "karma",
    wordEnglish: "Karma",
    wordDevanagari: "कर्म",
    transliteration: "karma",
    pronunciation: "kar-mah",
    etymology: {
      root: "kṛ (कृ)",
      rootMeaning: "to do, make, or act",
      formationExplanation:
        'Karma literally means "action" or "deed," but philosophically encompasses the action itself, the intent behind it, and the resulting reaction.',
    },
    primaryMeanings: [
      "Action, work, or deed",
      "The principle of cause and effect",
      "Intentional action resulting in future consequences",
      "Ritualistic action (in early Vedas)",
    ],
    philosophicalContexts: [
      {
        tradition: "Early Vedas",
        meaning:
          "Strictly referred to ritual and sacrificial actions performed to maintain order and appease deities.",
      },
      {
        tradition: "Advaita Vedanta",
        meaning:
          "The law of cause and effect that binds the soul (Jiva) to the cycle of rebirth (Samsara). True liberation (Moksha) requires transcending Karma through knowledge (Jnana).",
      },
      {
        tradition: "Bhagavad Gita",
        meaning:
          "Introduces Karma Yoga—the revolutionary idea that action does not bind you if performed as a duty without selfish attachment to the fruits.",
      },
    ],
    usageExamples: [
      {
        textContext: "Brihadaranyaka Upanishad 4.4.5",
        quoteSanskrit:
          "यथाकारी यथाचारी तथा भवति—साधुकारी साधुर्भवति, पापकारी पापो भवति",
        quoteTranslation:
          "As a man acts, so does he become. A man of good deeds becomes good, a man of bad deeds becomes bad.",
        explanation:
          "This is one of the earliest and clearest formulations of the law of Karma, showing that character is forged through continuous action.",
      },
      {
        textContext: "Bhagavad Gita 2.47",
        quoteSanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन",
        quoteTranslation:
          "You have a right to your duty, but not to the fruits of your action.",
        explanation:
          "Krishna breaks the traditional model by separating action from reward, establishing the foundation of Karma Yoga.",
      },
    ],
    relatedWords: ["dharma", "samsara", "moksha", "yoga"],
    faqs: [
      {
        question: "Does Karma mean destiny or fate?",
        answer:
          "No. While past actions (Prarabdha Karma) create your current circumstances, you have free will in how you act now (Agami Karma) to shape your future. Karma is self-determination, not fatalism.",
      },
      {
        question: "What are the three types of Karma?",
        answer:
          "Sanchita (accumulated past karma), Prarabdha (the karma bearing fruit in this present life), and Agami (new karma being created right now for the future).",
      },
      {
        question: "Can Karma be erased?",
        answer:
          'According to Vedanta, all accumulated karma is "burned to ashes" by the fire of self-knowledge (Jnana) upon achieving liberation (Moksha).',
      },
    ],
    summary:
      "Karma is the universal law of cause and effect in which intentional actions dictate one's future experiences and bind the soul to the cycle of rebirth.",
  },
];

export function getSanskritWordBySlug(slug: string): SanskritWord | undefined {
  return sanskritVocab.find((w) => w.slug === slug);
}
