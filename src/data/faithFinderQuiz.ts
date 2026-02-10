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
        question: "When you feel lost or uncertain, what brings you the most comfort?",
        options: [
            {
                id: "1a",
                text: "Reading philosophy or exploring deep questions about meaning",
                weights: { inquiry: 3, devotion: 0, ritual: 0, discipline: 0 }
            },
            {
                id: "1b",
                text: "Praying or surrendering to a higher power",
                weights: { inquiry: 0, devotion: 3, ritual: 0, discipline: 0 }
            },
            {
                id: "1c",
                text: "Following a familiar routine or ritual",
                weights: { inquiry: 0, devotion: 0, ritual: 3, discipline: 0 }
            },
            {
                id: "1d",
                text: "Meditating or practicing mindfulness",
                weights: { inquiry: 0, devotion: 0, ritual: 0, discipline: 3 }
            }
        ]
    },
    {
        id: 2,
        question: "How do you prefer to spend your free time?",
        options: [
            {
                id: "2a",
                text: "Reading books, watching documentaries, learning new things",
                weights: { inquiry: 3, devotion: 0, ritual: 0, discipline: 0 }
            },
            {
                id: "2b",
                text: "Listening to devotional music, visiting temples or sacred places",
                weights: { inquiry: 0, devotion: 3, ritual: 0, discipline: 0 }
            },
            {
                id: "2c",
                text: "Following a structured routine, keeping things organized",
                weights: { inquiry: 0, devotion: 0, ritual: 0, discipline: 3 }
            },
            {
                id: "2d",
                text: "Participating in ceremonies, festivals, or cultural traditions",
                weights: { inquiry: 0, devotion: 0, ritual: 3, discipline: 0 }
            }
        ]
    },
    {
        id: 3,
        question: "What type of spiritual practice feels most natural to you?",
        options: [
            {
                id: "3a",
                text: "Self-inquiry and contemplation",
                weights: { inquiry: 3, devotion: 0, ritual: 0, discipline: 0 }
            },
            {
                id: "3b",
                text: "Chanting mantras or singing devotional songs",
                weights: { inquiry: 0, devotion: 3, ritual: 0, discipline: 0 }
            },
            {
                id: "3c",
                text: "Performing rituals, puja, or ceremonies",
                weights: { inquiry: 0, devotion: 0, ritual: 3, discipline: 0 }
            },
            {
                id: "3d",
                text: "Yoga, meditation, or breathing exercises",
                weights: { inquiry: 0, devotion: 0, ritual: 0, discipline: 3 }
            }
        ]
    },
    {
        id: 4,
        question: "When you face a difficult decision, how do you approach it?",
        options: [
            {
                id: "4a",
                text: "Analyze all the information and think it through logically",
                weights: { inquiry: 3, devotion: 0, ritual: 0, discipline: 1 }
            },
            {
                id: "4b",
                text: "Pray for guidance and trust in divine will",
                weights: { inquiry: 0, devotion: 3, ritual: 0, discipline: 0 }
            },
            {
                id: "4c",
                text: "Consult tradition, scriptures, or elders",
                weights: { inquiry: 0, devotion: 0, ritual: 3, discipline: 0 }
            },
            {
                id: "4d",
                text: "Meditate and listen to inner wisdom",
                weights: { inquiry: 1, devotion: 0, ritual: 0, discipline: 3 }
            }
        ]
    },
    {
        id: 5,
        question: "What aspect of spirituality fascinates you most?",
        options: [
            {
                id: "5a",
                text: "Understanding the nature of reality and consciousness",
                weights: { inquiry: 3, devotion: 0, ritual: 0, discipline: 0 }
            },
            {
                id: "5b",
                text: "Experiencing divine love and devotion",
                weights: { inquiry: 0, devotion: 3, ritual: 0, discipline: 0 }
            },
            {
                id: "5c",
                text: "Sacred rituals, symbols, and ceremonies",
                weights: { inquiry: 0, devotion: 0, ritual: 3, discipline: 0 }
            },
            {
                id: "5d",
                text: "Personal transformation and self-mastery",
                weights: { inquiry: 0, devotion: 0, ritual: 0, discipline: 3 }
            }
        ]
    },
    {
        id: 6,
        question: "How do you connect best with sacred texts or teachings?",
        options: [
            {
                id: "6a",
                text: "Studying and analyzing their philosophical meaning",
                weights: { inquiry: 3, devotion: 0, ritual: 0, discipline: 0 }
            },
            {
                id: "6b",
                text: "Feeling the emotional and devotional essence",
                weights: { inquiry: 0, devotion: 3, ritual: 0, discipline: 0 }
            },
            {
                id: "6c",
                text: "Reciting them as part of ritual practice",
                weights: { inquiry: 0, devotion: 0, ritual: 3, discipline: 0 }
            },
            {
                id: "6d",
                text: "Contemplating and applying them in daily life",
                weights: { inquiry: 1, devotion: 0, ritual: 0, discipline: 3 }
            }
        ]
    },
    {
        id: 7,
        question: "What role does community play in your spiritual life?",
        options: [
            {
                id: "7a",
                text: "I prefer solitary study and contemplation",
                weights: { inquiry: 3, devotion: 0, ritual: 0, discipline: 0 }
            },
            {
                id: "7b",
                text: "I love devotional gatherings, kirtan, and satsang",
                weights: { inquiry: 0, devotion: 3, ritual: 0, discipline: 0 }
            },
            {
                id: "7c",
                text: "I value traditional ceremonies and festivals with others",
                weights: { inquiry: 0, devotion: 0, ritual: 3, discipline: 0 }
            },
            {
                id: "7d",
                text: "I appreciate group meditation or yoga classes",
                weights: { inquiry: 0, devotion: 0, ritual: 0, discipline: 3 }
            }
        ]
    },
    {
        id: 8,
        question: "When you think about spiritual growth, what comes to mind?",
        options: [
            {
                id: "8a",
                text: "Gaining deeper understanding and wisdom",
                weights: { inquiry: 3, devotion: 0, ritual: 0, discipline: 0 }
            },
            {
                id: "8b",
                text: "Deepening love and devotion to the Divine",
                weights: { inquiry: 0, devotion: 3, ritual: 0, discipline: 0 }
            },
            {
                id: "8c",
                text: "Following sacred traditions more faithfully",
                weights: { inquiry: 0, devotion: 0, ritual: 3, discipline: 0 }
            },
            {
                id: "8d",
                text: "Developing discipline and self-control",
                weights: { inquiry: 0, devotion: 0, ritual: 0, discipline: 3 }
            }
        ]
    },
    {
        id: 9,
        question: "What kind of spiritual teacher or guide appeals to you?",
        options: [
            {
                id: "9a",
                text: "A philosopher who explains profound concepts",
                weights: { inquiry: 3, devotion: 0, ritual: 0, discipline: 0 }
            },
            {
                id: "9b",
                text: "A saint who embodies divine love",
                weights: { inquiry: 0, devotion: 3, ritual: 0, discipline: 0 }
            },
            {
                id: "9c",
                text: "A priest who performs sacred rituals",
                weights: { inquiry: 0, devotion: 0, ritual: 3, discipline: 0 }
            },
            {
                id: "9d",
                text: "A guru who provides systematic training",
                weights: { inquiry: 0, devotion: 0, ritual: 0, discipline: 3 }
            }
        ]
    },
    {
        id: 10,
        question: "How do you experience the sacred in daily life?",
        options: [
            {
                id: "10a",
                text: "Seeing the deeper meaning in everything",
                weights: { inquiry: 3, devotion: 0, ritual: 0, discipline: 0 }
            },
            {
                id: "10b",
                text: "Feeling divine presence in all beings",
                weights: { inquiry: 0, devotion: 3, ritual: 0, discipline: 0 }
            },
            {
                id: "10c",
                text: "Honoring sacred moments through ritual",
                weights: { inquiry: 0, devotion: 0, ritual: 3, discipline: 0 }
            },
            {
                id: "10d",
                text: "Bringing mindfulness to every action",
                weights: { inquiry: 0, devotion: 0, ritual: 0, discipline: 3 }
            }
        ]
    },
    {
        id: 11,
        question: "What spiritual practice would you be most excited to try?",
        options: [
            {
                id: "11a",
                text: "Self-inquiry meditation ('Who am I?')",
                weights: { inquiry: 3, devotion: 0, ritual: 0, discipline: 1 }
            },
            {
                id: "11b",
                text: "Chanting the divine name (japa)",
                weights: { inquiry: 0, devotion: 3, ritual: 0, discipline: 0 }
            },
            {
                id: "11c",
                text: "Learning to perform puja or sacred ceremony",
                weights: { inquiry: 0, devotion: 0, ritual: 3, discipline: 0 }
            },
            {
                id: "11d",
                text: "Starting a yoga or meditation practice",
                weights: { inquiry: 0, devotion: 0, ritual: 0, discipline: 3 }
            }
        ]
    },
    {
        id: 12,
        question: "When you hear about enlightenment or liberation, what resonates?",
        options: [
            {
                id: "12a",
                text: "Realizing the true nature of self and reality",
                weights: { inquiry: 3, devotion: 0, ritual: 0, discipline: 0 }
            },
            {
                id: "12b",
                text: "Merging in divine love",
                weights: { inquiry: 0, devotion: 3, ritual: 0, discipline: 0 }
            },
            {
                id: "12c",
                text: "Fulfilling one's sacred duty (dharma)",
                weights: { inquiry: 0, devotion: 0, ritual: 3, discipline: 0 }
            },
            {
                id: "12d",
                text: "Achieving mastery over mind and senses",
                weights: { inquiry: 0, devotion: 0, ritual: 0, discipline: 3 }
            }
        ]
    },
    {
        id: 13,
        question: "How do you handle difficult emotions?",
        options: [
            {
                id: "13a",
                text: "Observe them with detachment and understanding",
                weights: { inquiry: 3, devotion: 0, ritual: 0, discipline: 1 }
            },
            {
                id: "13b",
                text: "Surrender them to the Divine",
                weights: { inquiry: 0, devotion: 3, ritual: 0, discipline: 0 }
            },
            {
                id: "13c",
                text: "Use rituals or prayers for purification",
                weights: { inquiry: 0, devotion: 0, ritual: 3, discipline: 0 }
            },
            {
                id: "13d",
                text: "Practice meditation or breathing techniques",
                weights: { inquiry: 0, devotion: 0, ritual: 0, discipline: 3 }
            }
        ]
    },
    {
        id: 14,
        question: "What spiritual quality do you most want to cultivate?",
        options: [
            {
                id: "14a",
                text: "Wisdom and discrimination",
                weights: { inquiry: 3, devotion: 0, ritual: 0, discipline: 0 }
            },
            {
                id: "14b",
                text: "Love and devotion",
                weights: { inquiry: 0, devotion: 3, ritual: 0, discipline: 0 }
            },
            {
                id: "14c",
                text: "Reverence and respect for tradition",
                weights: { inquiry: 0, devotion: 0, ritual: 3, discipline: 0 }
            },
            {
                id: "14d",
                text: "Discipline and self-mastery",
                weights: { inquiry: 0, devotion: 0, ritual: 0, discipline: 3 }
            }
        ]
    },
    {
        id: 15,
        question: "If you could spend a day with a great spiritual figure, who would you choose?",
        options: [
            {
                id: "15a",
                text: "A philosopher like Adi Shankaracharya",
                weights: { inquiry: 3, devotion: 0, ritual: 0, discipline: 0 }
            },
            {
                id: "15b",
                text: "A devotee like Mirabai or Chaitanya",
                weights: { inquiry: 0, devotion: 3, ritual: 0, discipline: 0 }
            },
            {
                id: "15c",
                text: "A temple priest or ritual master",
                weights: { inquiry: 0, devotion: 0, ritual: 3, discipline: 0 }
            },
            {
                id: "15d",
                text: "A yoga master like Patanjali",
                weights: { inquiry: 0, devotion: 0, ritual: 0, discipline: 3 }
            }
        ]
    }
];

export interface QuizScore {
    inquiry: number;
    devotion: number;
    ritual: number;
    discipline: number;
}

export interface QuizResult {
    primaryPath: 'inquiry' | 'devotion' | 'ritual' | 'discipline';
    secondaryPath?: 'inquiry' | 'devotion' | 'ritual' | 'discipline';
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
        discipline: 0
    };

    Object.entries(answers).forEach(([questionId, optionId]) => {
        const question = quizQuestions.find(q => q.id === parseInt(questionId));
        const option = question?.options.find(o => o.id === optionId);

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
    const secondaryPath = entries[1][0] !== entries[0][0] ? entries[1][0] : undefined;

    const pathRecommendations: Record<string, QuizResult['recommendations']> = {
        inquiry: {
            traditions: ['Advaita Vedanta', 'Nyaya', 'Samkhya'],
            practices: ['Self-inquiry', 'Study', 'Meditation'],
            philosophies: ['Advaita Vedanta', 'Vedanta', 'Samkhya']
        },
        devotion: {
            traditions: ['Vaishnavism', 'Shaktism', 'Bhakti traditions'],
            practices: ['Puja', 'Kirtan', 'Japa', 'Seva'],
            philosophies: ['Vishishtadvaita', 'Dvaita']
        },
        ritual: {
            traditions: ['Smartism', 'Temple traditions', 'Mimamsa'],
            practices: ['Puja', 'Vrat', 'Sandhya vandana'],
            philosophies: ['Mimamsa']
        },
        discipline: {
            traditions: ['Yoga Darshana', 'Tantra (structured)', 'Kashmir Shaivism'],
            practices: ['Yoga asana', 'Pranayama', 'Dhyana', 'Mantra'],
            philosophies: ['Yoga', 'Samkhya']
        }
    };

    return {
        primaryPath,
        secondaryPath,
        scores,
        recommendations: pathRecommendations[primaryPath]
    };
};

export const getResultDescription = (path: 'inquiry' | 'devotion' | 'ritual' | 'discipline'): string => {
    const descriptions: Record<string, string> = {
        inquiry: "Your spiritual path is one of deep inquiry and contemplation. You're naturally drawn to understanding the nature of reality, consciousness, and the self. You find meaning through philosophical exploration and self-inquiry.",
        devotion: "Your spiritual path is one of heart-centered devotion. You feel a natural love for the Divine and find meaning in worship, surrender, and sacred relationship. Your practice flows from love and emotional connection.",
        ritual: "Your spiritual path honors tradition and sacred action. You find power in precise ritual performance, ceremony, and the structured observance of spiritual rites. Your practice connects you to ancient wisdom.",
        discipline: "Your spiritual path is one of methodical cultivation. You're drawn to systematic practice, training the mind and body through structured approaches. Your practice emphasizes self-mastery and consistent effort."
    };

    return descriptions[path];
};
