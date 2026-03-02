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
    question: "When you feel the weight of existence or uncertainty, where does your mind instinctively turn?",
    options: [
      {
        id: "1a",
        text: "Toward analysis—trying to strip away the confusion to find the logical truth.",
        weights: { inquiry: 3, devotion: 0, ritual: 0, discipline: 0 },
      },
      {
        id: "1b",
        text: "Toward surrender—looking for a presence or power to hold and guide you.",
        weights: { inquiry: 0, devotion: 3, ritual: 0, discipline: 0 },
      },
      {
        id: "1c",
        text: "Toward structure—reclaiming peace through familiar, sacred rhythms and tradition.",
        weights: { inquiry: 0, devotion: 0, ritual: 3, discipline: 0 },
      },
      {
        id: "1d",
        text: "Toward silence—turning inward to master the internal noise through direct practice.",
        weights: { inquiry: 0, devotion: 0, ritual: 0, discipline: 3 },
      },
    ],
  },
  {
    id: 2,
    question: "How do you most often find yourself exploring the 'deeper side' of life?",
    options: [
      {
        id: "2a",
        text: "Through the intellect—studying maps of consciousness and the logic of the sages.",
        weights: { inquiry: 3, devotion: 0, ritual: 0, discipline: 0 },
      },
      {
        id: "2b",
        text: "Through the heart—listening to sacred music, chanting, or feeling the pull of the Divine.",
        weights: { inquiry: 0, devotion: 3, ritual: 0, discipline: 0 },
      },
      {
        id: "2c",
        text: "Through the will—establishing a rigorous daily discipline and sticking to it.",
        weights: { inquiry: 0, devotion: 0, ritual: 0, discipline: 3 },
      },
      {
        id: "2d",
        text: "Through the sacred—participating in ceremonies that connect you to an ancient lineage.",
        weights: { inquiry: 0, devotion: 0, ritual: 3, discipline: 0 },
      },
    ],
  },
  {
    id: 3,
    question: "When you imagine 'Self-Realization,' what does the experience look like to you?",
    options: [
      {
        id: "3a",
        text: "A sudden, clear insight that dissolves all confusion and doubt.",
        weights: { inquiry: 3, devotion: 0, ritual: 0, discipline: 0 },
      },
      {
        id: "3b",
        text: "A total merging into a boundless ocean of love and grace.",
        weights: { inquiry: 0, devotion: 3, ritual: 0, discipline: 0 },
      },
      {
        id: "3c",
        text: "A state of perfect alignment with the cosmic laws and my sacred duty.",
        weights: { inquiry: 0, devotion: 0, ritual: 3, discipline: 0 },
      },
      {
        id: "3d",
        text: "A profound, unshakeable stillness of mind and absolute self-mastery.",
        weights: { inquiry: 0, devotion: 0, ritual: 0, discipline: 3 },
      },
    ],
  },
  {
    id: 4,
    question: "When you face a difficult decision, how do you approach it?",
    options: [
      {
        id: "4a",
        text: "Analyze all the information and think it through logically",
        weights: { inquiry: 3, devotion: 0, ritual: 0, discipline: 1 },
      },
      {
        id: "4b",
        text: "Pray for guidance and trust in divine will",
        weights: { inquiry: 0, devotion: 3, ritual: 0, discipline: 0 },
      },
      {
        id: "4c",
        text: "Consult tradition, scriptures, or elders",
        weights: { inquiry: 0, devotion: 0, ritual: 3, discipline: 0 },
      },
      {
        id: "4d",
        text: "Meditate and listen to inner wisdom",
        weights: { inquiry: 1, devotion: 0, ritual: 0, discipline: 3 },
      },
    ],
  },
  {
    id: 5,
    question: "Which of these concepts most excites your curiosity?",
    options: [
      {
        id: "5a",
        text: "The bridge between modern physics and ancient non-duality.",
        weights: { inquiry: 3, devotion: 0, ritual: 0, discipline: 0 },
      },
      {
        id: "5b",
        text: "The mystical relationship between the seeker and the Beloved.",
        weights: { inquiry: 0, devotion: 3, ritual: 0, discipline: 0 },
      },
      {
        id: "5c",
        text: "The science of sacred geometry and the power of ritual space.",
        weights: { inquiry: 0, devotion: 0, ritual: 3, discipline: 0 },
      },
      {
        id: "5d",
        text: "The biology of awakening—mastering prana and the nervous system.",
        weights: { inquiry: 0, devotion: 0, ritual: 0, discipline: 3 },
      },
    ],
  },
  {
    id: 6,
    question: "How do you connect best with sacred texts or teachings?",
    options: [
      {
        id: "6a",
        text: "Studying and analyzing their philosophical meaning",
        weights: { inquiry: 3, devotion: 0, ritual: 0, discipline: 0 },
      },
      {
        id: "6b",
        text: "Feeling the emotional and devotional essence",
        weights: { inquiry: 0, devotion: 3, ritual: 0, discipline: 0 },
      },
      {
        id: "6c",
        text: "Reciting them as part of ritual practice",
        weights: { inquiry: 0, devotion: 0, ritual: 3, discipline: 0 },
      },
      {
        id: "6d",
        text: "Contemplating and applying them in daily life",
        weights: { inquiry: 1, devotion: 0, ritual: 0, discipline: 3 },
      },
    ],
  },
  {
    id: 7,
    question: "What role does community play in your spiritual life?",
    options: [
      {
        id: "7a",
        text: "I prefer solitary study and contemplation",
        weights: { inquiry: 3, devotion: 0, ritual: 0, discipline: 0 },
      },
      {
        id: "7b",
        text: "I love devotional gatherings, kirtan, and satsang",
        weights: { inquiry: 0, devotion: 3, ritual: 0, discipline: 0 },
      },
      {
        id: "7c",
        text: "I value traditional ceremonies and festivals with others",
        weights: { inquiry: 0, devotion: 0, ritual: 3, discipline: 0 },
      },
      {
        id: "7d",
        text: "I appreciate group meditation or yoga classes",
        weights: { inquiry: 0, devotion: 0, ritual: 0, discipline: 3 },
      },
    ],
  },
  {
    id: 8,
    question: "When you think about spiritual growth, what comes to mind?",
    options: [
      {
        id: "8a",
        text: "Gaining deeper understanding and wisdom",
        weights: { inquiry: 3, devotion: 0, ritual: 0, discipline: 0 },
      },
      {
        id: "8b",
        text: "Deepening love and devotion to the Divine",
        weights: { inquiry: 0, devotion: 3, ritual: 0, discipline: 0 },
      },
      {
        id: "8c",
        text: "Following sacred traditions more faithfully",
        weights: { inquiry: 0, devotion: 0, ritual: 3, discipline: 0 },
      },
      {
        id: "8d",
        text: "Developing discipline and self-control",
        weights: { inquiry: 0, devotion: 0, ritual: 0, discipline: 3 },
      },
    ],
  },
  {
    id: 9,
    question: "What kind of spiritual teacher or guide appeals to you?",
    options: [
      {
        id: "9a",
        text: "A philosopher who explains profound concepts",
        weights: { inquiry: 3, devotion: 0, ritual: 0, discipline: 0 },
      },
      {
        id: "9b",
        text: "A saint who embodies divine love",
        weights: { inquiry: 0, devotion: 3, ritual: 0, discipline: 0 },
      },
      {
        id: "9c",
        text: "A priest who performs sacred rituals",
        weights: { inquiry: 0, devotion: 0, ritual: 3, discipline: 0 },
      },
      {
        id: "9d",
        text: "A guru who provides systematic training",
        weights: { inquiry: 0, devotion: 0, ritual: 0, discipline: 3 },
      },
    ],
  },
  {
    id: 10,
    question: "How do you experience the sacred in daily life?",
    options: [
      {
        id: "10a",
        text: "Seeing the deeper meaning in everything",
        weights: { inquiry: 3, devotion: 0, ritual: 0, discipline: 0 },
      },
      {
        id: "10b",
        text: "Feeling divine presence in all beings",
        weights: { inquiry: 0, devotion: 3, ritual: 0, discipline: 0 },
      },
      {
        id: "10c",
        text: "Honoring sacred moments through ritual",
        weights: { inquiry: 0, devotion: 0, ritual: 3, discipline: 0 },
      },
      {
        id: "10d",
        text: "Bringing mindfulness to every action",
        weights: { inquiry: 0, devotion: 0, ritual: 0, discipline: 3 },
      },
    ],
  },
  {
    id: 11,
    question: "What spiritual practice would you be most excited to try?",
    options: [
      {
        id: "11a",
        text: "Self-inquiry meditation ('Who am I?')",
        weights: { inquiry: 3, devotion: 0, ritual: 0, discipline: 1 },
      },
      {
        id: "11b",
        text: "Chanting the divine name (japa)",
        weights: { inquiry: 0, devotion: 3, ritual: 0, discipline: 0 },
      },
      {
        id: "11c",
        text: "Learning to perform puja or sacred ceremony",
        weights: { inquiry: 0, devotion: 0, ritual: 3, discipline: 0 },
      },
      {
        id: "11d",
        text: "Starting a yoga or meditation practice",
        weights: { inquiry: 0, devotion: 0, ritual: 0, discipline: 3 },
      },
    ],
  },
  {
    id: 12,
    question:
      "When you hear about enlightenment or liberation, what resonates?",
    options: [
      {
        id: "12a",
        text: "Realizing the true nature of self and reality",
        weights: { inquiry: 3, devotion: 0, ritual: 0, discipline: 0 },
      },
      {
        id: "12b",
        text: "Merging in divine love",
        weights: { inquiry: 0, devotion: 3, ritual: 0, discipline: 0 },
      },
      {
        id: "12c",
        text: "Fulfilling one's sacred duty (dharma)",
        weights: { inquiry: 0, devotion: 0, ritual: 3, discipline: 0 },
      },
      {
        id: "12d",
        text: "Achieving mastery over mind and senses",
        weights: { inquiry: 0, devotion: 0, ritual: 0, discipline: 3 },
      },
    ],
  },
  {
    id: 13,
    question: "How do you handle difficult emotions?",
    options: [
      {
        id: "13a",
        text: "Observe them with detachment and understanding",
        weights: { inquiry: 3, devotion: 0, ritual: 0, discipline: 1 },
      },
      {
        id: "13b",
        text: "Surrender them to the Divine",
        weights: { inquiry: 0, devotion: 3, ritual: 0, discipline: 0 },
      },
      {
        id: "13c",
        text: "Use rituals or prayers for purification",
        weights: { inquiry: 0, devotion: 0, ritual: 3, discipline: 0 },
      },
      {
        id: "13d",
        text: "Practice meditation or breathing techniques",
        weights: { inquiry: 0, devotion: 0, ritual: 0, discipline: 3 },
      },
    ],
  },
  {
    id: 14,
    question: "What spiritual quality do you most want to cultivate?",
    options: [
      {
        id: "14a",
        text: "Wisdom and discrimination",
        weights: { inquiry: 3, devotion: 0, ritual: 0, discipline: 0 },
      },
      {
        id: "14b",
        text: "Love and devotion",
        weights: { inquiry: 0, devotion: 3, ritual: 0, discipline: 0 },
      },
      {
        id: "14c",
        text: "Reverence and respect for tradition",
        weights: { inquiry: 0, devotion: 0, ritual: 3, discipline: 0 },
      },
      {
        id: "14d",
        text: "Discipline and self-mastery",
        weights: { inquiry: 0, devotion: 0, ritual: 0, discipline: 3 },
      },
    ],
  },
  {
    id: 15,
    question:
      "If you could spend a day with a great spiritual figure, who would you choose?",
    options: [
      {
        id: "15a",
        text: "A philosopher like Adi Shankaracharya",
        weights: { inquiry: 3, devotion: 0, ritual: 0, discipline: 0 },
      },
      {
        id: "15b",
        text: "A devotee like Mirabai or Chaitanya",
        weights: { inquiry: 0, devotion: 3, ritual: 0, discipline: 0 },
      },
      {
        id: "15c",
        text: "A temple priest or ritual master",
        weights: { inquiry: 0, devotion: 0, ritual: 3, discipline: 0 },
      },
      {
        id: "15d",
        text: "A yoga master like Patanjali",
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
    longDescription: "You are naturally drawn to the 'Jnana' path—the yoga of the intellect. You don't want to just believe; you want to know. Your mind is a sharp instrument designed to cut through the illusions (Maya) of life to find the unchanging Brahman beneath. For you, study and contemplation are not chores, but the highest form of worship.",
    icon: "Brain",
    themeColor: "amber",
  },
  devotion: {
    name: "The Way of Devotion",
    archetype: "The Relational Seeker",
    slogan: "Love is the shortest path to the Divine.",
    longDescription: "You resonate with 'Bhakti'—the path of the heart. For you, the Divine is not an abstract concept, but a living Presence to be loved, served, and surrendered to. Your emotions are your greatest spiritual asset. In your world, the sense of separation dissolves not through logic, but through the overwhelming sweetness of divine grace.",
    icon: "Heart",
    themeColor: "rose",
  },
  ritual: {
    name: "The Way of Action",
    archetype: "The Alchemist of Action",
    slogan: "Sacred order leads to internal sovereignty.",
    longDescription: "You align with 'Karma' and 'Kriya'—the path of sacred action. You believe that how we move through the world and interact with tradition matters. You find stability in ritual, duty, and the preservation of sacred rhythms. For you, the mundane is the laboratory of the soul, and every action is an opportunity to align with 'Rita' (Cosmic Order).",
    icon: "Sparkles",
    themeColor: "orange",
  },
  discipline: {
    name: "The Way of Practice",
    archetype: "The Architect of Mind",
    slogan: "Mastery of self is the only true freedom.",
    longDescription: "You are a 'Raja Yogi'—one who seeks mastery over the inner architecture of mind and energy. You value systematic training, breath-work, and the direct, silent experience of consciousness. You don't seek meaning in stories; you seek it in the raw, vibrant stillness of your own being.",
    icon: "Zap",
    themeColor: "indigo",
  }
};

export const getResultDescription = (
  path: "inquiry" | "devotion" | "ritual" | "discipline",
): string => {
  return pathMetadata[path].longDescription;
};
