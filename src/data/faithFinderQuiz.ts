export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export interface QuizOption {
  id: string;
  text: string;
  weights: {
    inquiry: number;
    devotion: number;
    ritual: number;
    discipline: number;
  };
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "When life feels uncertain, where does your mind go first?",
    options: [
      {
        id: "1a",
        text: "To analysis. You want to reason your way to the truth.",
        weights: { inquiry: 4, devotion: 0, ritual: 0, discipline: 0 },
      },
      {
        id: "1b",
        text: "To prayer. You look for a higher presence to guide you.",
        weights: { inquiry: 0, devotion: 4, ritual: 0, discipline: 0 },
      },
      {
        id: "1c",
        text: "To tradition. Familiar rituals and sacred rhythms ground you.",
        weights: { inquiry: 0, devotion: 0, ritual: 4, discipline: 0 },
      },
      {
        id: "1d",
        text: "To stillness. You turn inward and quiet the noise.",
        weights: { inquiry: 0, devotion: 0, ritual: 0, discipline: 4 },
      },
    ],
  },
  {
    id: 2,
    question: "What does spiritual awakening look like in your imagination?",
    options: [
      {
        id: "2a",
        text: "A flash of clarity that burns away all confusion.",
        weights: { inquiry: 4, devotion: 0, ritual: 0, discipline: 0 },
      },
      {
        id: "2b",
        text: "Dissolving into an ocean of love and grace.",
        weights: { inquiry: 0, devotion: 4, ritual: 0, discipline: 0 },
      },
      {
        id: "2c",
        text: "Perfect alignment with cosmic order and sacred duty.",
        weights: { inquiry: 0, devotion: 0, ritual: 4, discipline: 0 },
      },
      {
        id: "2d",
        text: "Total stillness. Unshakeable calm. Complete self-mastery.",
        weights: { inquiry: 0, devotion: 0, ritual: 0, discipline: 4 },
      },
    ],
  },
  {
    id: 3,
    question: "You're facing a hard decision. What do you do?",
    options: [
      {
        id: "3a",
        text: "Gather all the facts and think it through logically",
        weights: { inquiry: 3, devotion: 0, ritual: 0, discipline: 1 },
      },
      {
        id: "3b",
        text: "Pray for guidance and trust in divine will",
        weights: { inquiry: 0, devotion: 3, ritual: 0, discipline: 0 },
      },
      {
        id: "3c",
        text: "Consult tradition, scripture, or an elder",
        weights: { inquiry: 0, devotion: 0, ritual: 3, discipline: 0 },
      },
      {
        id: "3d",
        text: "Sit with it in meditation until clarity comes",
        weights: { inquiry: 1, devotion: 0, ritual: 0, discipline: 3 },
      },
    ],
  },
  {
    id: 4,
    question: "Which of these ideas grabs your attention most?",
    options: [
      {
        id: "4a",
        text: "Where modern physics meets ancient non-duality",
        weights: { inquiry: 4, devotion: 0, ritual: 0, discipline: 0 },
      },
      {
        id: "4b",
        text: "The mystical bond between seeker and the Divine Beloved",
        weights: { inquiry: 0, devotion: 4, ritual: 0, discipline: 0 },
      },
      {
        id: "4c",
        text: "Sacred geometry and the hidden power of ritual space",
        weights: { inquiry: 0, devotion: 0, ritual: 4, discipline: 0 },
      },
      {
        id: "4d",
        text: "Mastering prana and rewiring the nervous system",
        weights: { inquiry: 0, devotion: 0, ritual: 0, discipline: 4 },
      },
    ],
  },
  {
    id: 5,
    question: "What role does community play in your spiritual life?",
    options: [
      {
        id: "5a",
        text: "I prefer solitary study and contemplation",
        weights: { inquiry: 4, devotion: 0, ritual: 0, discipline: 0 },
      },
      {
        id: "5b",
        text: "I love devotional gatherings, kirtan, and satsang",
        weights: { inquiry: 0, devotion: 4, ritual: 0, discipline: 0 },
      },
      {
        id: "5c",
        text: "I value traditional ceremonies and festivals with others",
        weights: { inquiry: 0, devotion: 0, ritual: 4, discipline: 0 },
      },
      {
        id: "5d",
        text: "I appreciate group meditation or yoga classes",
        weights: { inquiry: 0, devotion: 0, ritual: 0, discipline: 4 },
      },
    ],
  },
  {
    id: 6,
    question: "Which practice would you try first?",
    options: [
      {
        id: "6a",
        text: "Self-inquiry meditation ('Who am I?')",
        weights: { inquiry: 3, devotion: 0, ritual: 0, discipline: 1 },
      },
      {
        id: "6b",
        text: "Chanting the divine name (japa)",
        weights: { inquiry: 0, devotion: 3, ritual: 0, discipline: 0 },
      },
      {
        id: "6c",
        text: "Learning to perform puja or sacred ceremony",
        weights: { inquiry: 0, devotion: 0, ritual: 3, discipline: 0 },
      },
      {
        id: "6d",
        text: "Starting a daily yoga or pranayama routine",
        weights: { inquiry: 0, devotion: 0, ritual: 0, discipline: 3 },
      },
    ],
  },
  {
    id: 7,
    question: "A wave of difficult emotion hits you. What's your instinct?",
    options: [
      {
        id: "7a",
        text: "Step back and observe it with detachment",
        weights: { inquiry: 3, devotion: 0, ritual: 0, discipline: 1 },
      },
      {
        id: "7b",
        text: "Offer it up to God or the Divine",
        weights: { inquiry: 0, devotion: 3, ritual: 0, discipline: 0 },
      },
      {
        id: "7c",
        text: "Do a ritual or prayer to purify and reset",
        weights: { inquiry: 0, devotion: 0, ritual: 3, discipline: 0 },
      },
      {
        id: "7d",
        text: "Breathe through it with a specific technique",
        weights: { inquiry: 0, devotion: 0, ritual: 0, discipline: 3 },
      },
    ],
  },
];

export interface QuizScore {
  inquiry: number;
  devotion: number;
  ritual: number;
  discipline: number;
}

export interface QuizResult {
  primaryPath: "inquiry" | "devotion" | "ritual" | "discipline";
  secondaryPath?: "inquiry" | "devotion" | "ritual" | "discipline";
  scores: QuizScore;
  recommendations: {
    traditions: string[];
    practices: string[];
    philosophies: string[];
  };
}

export const calculateScore = (answers: Record<number, string>): QuizScore => {
  const scores: QuizScore = {
    inquiry: 0,
    devotion: 0,
    ritual: 0,
    discipline: 0,
  };

  Object.entries(answers).forEach(([questionId, optionId]) => {
    const question = quizQuestions.find((q) => q.id === parseInt(questionId));
    const option = question?.options.find((o) => o.id === optionId);

    if (option) {
      scores.inquiry += option.weights.inquiry;
      scores.devotion += option.weights.devotion;
      scores.ritual += option.weights.ritual;
      scores.discipline += option.weights.discipline;
    }
  });

  return scores;
};

export const determineResult = (scores: QuizScore): QuizResult => {
  const entries = Object.entries(scores) as [keyof QuizScore, number][];
  entries.sort((a, b) => b[1] - a[1]);

  const primaryPath = entries[0][0];
  const secondaryPath =
    entries[1][0] !== entries[0][0] ? entries[1][0] : undefined;

  const pathRecommendations: Record<string, QuizResult["recommendations"]> = {
    inquiry: {
      traditions: ["Advaita Vedanta", "Nyaya", "Samkhya"],
      practices: ["Self-inquiry", "Study", "Meditation"],
      philosophies: ["Advaita Vedanta", "Vedanta", "Samkhya"],
    },
    devotion: {
      traditions: ["Vaishnavism", "Shaktism", "Bhakti traditions"],
      practices: ["Puja", "Kirtan", "Japa", "Seva"],
      philosophies: ["Vishishtadvaita", "Dvaita"],
    },
    ritual: {
      traditions: ["Smartism", "Temple traditions", "Mimamsa"],
      practices: ["Puja", "Vrat", "Sandhya vandana"],
      philosophies: ["Mimamsa"],
    },
    discipline: {
      traditions: ["Yoga Darshana", "Tantra (structured)", "Kashmir Shaivism"],
      practices: ["Yoga asana", "Pranayama", "Dhyana", "Mantra"],
      philosophies: ["Yoga", "Samkhya"],
    },
  };

  return {
    primaryPath,
    secondaryPath,
    scores,
    recommendations: pathRecommendations[primaryPath],
  };
};

export const pathMetadata = {
  inquiry: {
    name: "The Way of Inquiry",
    archetype: "The Analyst of Reality",
    slogan: "Truth is found through the fire of discrimination.",
    longDescription: "You are naturally drawn to the Jnana path, the yoga of the intellect. You don't want to just believe; you want to know. Your mind is a sharp instrument designed to cut through the illusions of Maya and find the unchanging Brahman beneath. For you, study and contemplation are not chores but the highest form of worship.",
    icon: "Brain",
    themeColor: "amber",
  },
  devotion: {
    name: "The Way of Devotion",
    archetype: "The Relational Seeker",
    slogan: "Love is the shortest path to the Divine.",
    longDescription: "You resonate with Bhakti, the path of the heart. For you, the Divine is not an abstract concept but a living Presence to be loved, served, and surrendered to. Your emotions are your greatest spiritual asset. The sense of separation dissolves not through logic but through the overwhelming sweetness of divine grace.",
    icon: "Heart",
    themeColor: "rose",
  },
  ritual: {
    name: "The Way of Action",
    archetype: "The Alchemist of Action",
    slogan: "Sacred order leads to internal sovereignty.",
    longDescription: "You align with Karma and Kriya, the path of sacred action. You believe that how we move through the world and interact with tradition matters. You find stability in ritual, duty, and the preservation of sacred rhythms. Every action is an opportunity to align with Rita, the Cosmic Order.",
    icon: "Sparkles",
    themeColor: "orange",
  },
  discipline: {
    name: "The Way of Practice",
    archetype: "The Architect of Mind",
    slogan: "Mastery of self is the only true freedom.",
    longDescription: "You are a Raja Yogi, one who seeks mastery over the inner architecture of mind and energy. You value systematic training, breathwork, and the direct experience of consciousness. You don't seek meaning in stories; you seek it in the raw, vibrant stillness of your own being.",
    icon: "Zap",
    themeColor: "indigo",
  }
};

export const getResultDescription = (
  path: "inquiry" | "devotion" | "ritual" | "discipline",
): string => {
  return pathMetadata[path].longDescription;
};
