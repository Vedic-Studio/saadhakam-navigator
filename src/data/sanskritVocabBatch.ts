import { SanskritWord } from "./sanskritVocab";

export const newSanskritVocab: SanskritWord[] = [
    {
        slug: "purusha",
        wordEnglish: "Purusha",
        wordDevanagari: "पुरुष",
        transliteration: "puruṣa",
        pronunciation: "poo-roo-shah",
        etymology: {
            root: "pṝ (पॄ) or pur (पुर्)",
            rootMeaning: "to fill, or a city/body",
            formationExplanation: "Literally means 'person' or 'the one who dwells in the city (of the body)'.",
        },
        primaryMeanings: ["Pure consciousness", "The timeless witness", "Cosmic person", "Soul"],
        philosophicalContexts: [
            {
                tradition: "Samkhya & Yoga",
                meaning: "The pure, unchanging, passive consciousness that merely witnesses reality, entirely distinct from Prakriti (matter/mind).",
            },
            {
                tradition: "Vedic (Rig Veda)",
                meaning: "The Cosmic Being from whose sacrifice the entire universe was created (Purusha Sukta).",
            },
            {
                tradition: "Vedanta",
                meaning: "Often used synonymously with Atman or Brahman—the supreme self.",
            }
        ],
        usageExamples: [
            {
                textContext: "Yoga Sutras of Patanjali 1.3",
                quoteSanskrit: "tada drashtuh svarupe avasthanam",
                quoteTranslation: "Then the seer (Purusha) abides in its own true nature.",
                explanation: "Patanjali defines the goal of yoga as the resting of Purusha in its own pure state, having ceased identification with the mind.",
            }
        ],
        relatedWords: ["prakriti", "atman", "guna", "drastur"],
        faqs: [
            {
                question: "Is Purusha the same as the soul?",
                answer: "In the Samkhya context, yes. But unlike Western concepts of a soul with personality, Purusha is pure, featureless, inactive consciousness."
            },
            {
                question: "How is Purusha different from Atman?",
                answer: "In Advaita Vedanta, there is only one universal Atman. In Samkhya, there are infinite, distinct, plural Purushas (one for each being)."
            }
        ],
        summary: "Purusha is the ancient Sanskrit term for pure, witnessing consciousness, entirely separate from the changing realm of mind and matter.",
    },
    {
        slug: "prakriti",
        wordEnglish: "Prakriti",
        wordDevanagari: "प्रकृति",
        transliteration: "prakṛti",
        pronunciation: "pruh-krih-tee",
        etymology: {
            root: "pra + kṛ (कृ)",
            rootMeaning: "pra (forth) + kara (to make/do)",
            formationExplanation: "That which puts forth, the original source of the material world.",
        },
        primaryMeanings: ["Nature", "Primal matter", "The fundamental material principle", "Creation"],
        philosophicalContexts: [
            {
                tradition: "Samkhya & Yoga",
                meaning: "The unmanifest, primal matter composed of the three Gunas (Sattva, Rajas, Tamas) from which the entire universe—including the human mind and intellect—evolves.",
            },
            {
                tradition: "Vedanta",
                meaning: "Often equated with Maya, the creative power or illusion of Brahman.",
            }
        ],
        usageExamples: [
            {
                textContext: "Bhagavad Gita 13.20",
                quoteSanskrit: "prakṛtiṁ puruṣaṁ caiva viddhy anādī ubhāv api",
                quoteTranslation: "Know that both Prakriti (material nature) and Purusha (the living entity) are beginningless.",
                explanation: "Krishna establishes that original matter and consciousness are both eternal principles.",
            }
        ],
        relatedWords: ["purusha", "guna", "maya", "sattva", "rajas", "tamas"],
        faqs: [
            {
                question: "Does Prakriti include the mind?",
                answer: "Yes. In Indian philosophy, the mind, intellect, and ego are considered subtle forms of matter (Prakriti), not consciousness (Purusha)."
            },
            {
                question: "Why does Prakriti act?",
                answer: "According to Samkhya, Prakriti evolves and acts solely for the experience and ultimate liberation of the observing Purusha."
            }
        ],
        summary: "Prakriti is the primal, foundational matter of the universe from which all physical forms, biology, and mental phenomena evolve.",
    },
    {
        slug: "ahamkara",
        wordEnglish: "Ahamkara",
        wordDevanagari: "अहङ्कार",
        transliteration: "ahaṅkāra",
        pronunciation: "ah-hum-kah-rah",
        etymology: {
            root: "aham + kṛ (कृ)",
            rootMeaning: "aham (I) + kara (maker)",
            formationExplanation: "Literally 'I-maker' or that which constructs the sense of self.",
        },
        primaryMeanings: ["Ego", "I-ness", "The principle of individuation", "Self-identity"],
        philosophicalContexts: [
            {
                tradition: "Yoga Psychology",
                meaning: "The function of the mind that claims experiences as its own ('I did this', 'this is mine'). It creates separation between the subject and the world.",
            },
            {
                tradition: "Samkhya",
                meaning: "The second evolute of Prakriti (after Mahat/Buddhi) out of which the senses and the mind are born.",
            }
        ],
        usageExamples: [
            {
                textContext: "Bhagavad Gita 3.27",
                quoteSanskrit: "ahaṅkāra-vimūḍhātmā kartāham iti manyate",
                quoteTranslation: "The soul, bewildered by false ego (ahamkara), thinks 'I am the doer.'",
                explanation: "Krishna explains that all actions are done by nature (Prakriti), but the ego falsely claims ownership of them.",
            }
        ],
        relatedWords: ["buddhi", "manas", "chitta", "avidya"],
        faqs: [
            {
                question: "Is Ahamkara inherently bad?",
                answer: "No. Without Ahamkara, physical survival would be impossible, as you wouldn't know which body to feed. The problem is over-identification and ignorance, not the function itself."
            }
        ],
        summary: "Ahamkara is the 'I-maker' function of the mind that creates individual identity and the illusion of separation.",
    },
    {
        slug: "buddhi",
        wordEnglish: "Buddhi",
        wordDevanagari: "बुद्धि",
        transliteration: "buddhi",
        pronunciation: "bood-dhee",
        etymology: {
            root: "budh (बुध्)",
            rootMeaning: "to awaken, know, or perceive",
            formationExplanation: "From the same root as Buddha (the awakened one).",
        },
        primaryMeanings: ["Intellect", "Discriminative faculty", "Reason", "Higher mind"],
        philosophicalContexts: [
            {
                tradition: "Yoga & Vedanta",
                meaning: "The highest, most refined function of the inner instrument (antahkarana). It is the faculty of discernment, decision-making, and wisdom—the part of the mind closest to pure consciousness.",
            }
        ],
        usageExamples: [
            {
                textContext: "Bhagavad Gita 2.41",
                quoteSanskrit: "vyavasāyātmikā buddhir ekeha kuru-nandana",
                quoteTranslation: "Those who are on this path are resolute in purpose, and their aim is one (Buddhi is one-pointed).",
                explanation: "A purified, concentrated Buddhi is essential for spiritual progress. A scattered intellect leads to endless distraction.",
            }
        ],
        relatedWords: ["manas", "ahamkara", "viveka", "jnana"],
        faqs: [
            {
                question: "How is Buddhi different from Manas?",
                answer: "Manas is the sensory, doubting mind ('Should I do this or that?'). Buddhi is the decisive, discerning intellect ('I will do this because it is right')."
            }
        ],
        summary: "Buddhi is the higher intellectual faculty responsible for discrimination, wisdom, and profound existential decisions.",
    },
    {
        slug: "manas",
        wordEnglish: "Manas",
        wordDevanagari: "मनस्",
        transliteration: "manas",
        pronunciation: "mah-nahs",
        etymology: {
            root: "man (मन्)",
            rootMeaning: "to think, imagine, or consider",
            formationExplanation: "The instrument of thought.",
        },
        primaryMeanings: ["Mind", "Sensory processing faculty", "Thought-generator", "Attention"],
        philosophicalContexts: [
            {
                tradition: "Yoga Psychology",
                meaning: "The lower, sensory mind. It receives inputs from the five senses, coordinates them, and generates endless chains of doubtful or continuous thought.",
            }
        ],
        usageExamples: [
            {
                textContext: "Bhagavad Gita 6.34",
                quoteSanskrit: "cañcalaṁ hi manaḥ kṛṣṇa pramāthi balavad dṛḍham",
                quoteTranslation: "For the mind (Manas) is restless, turbulent, obstinate and very strong, O Krishna.",
                explanation: "Arjuna complains about the uncontrollability of the sensory mind, comparing it to attempting to control the wind.",
            }
        ],
        relatedWords: ["buddhi", "ahamkara", "chitta", "prana"],
        faqs: [
            {
                question: "Why is the Manas considered an obstacle?",
                answer: "Because it constantly swings between the past and the future, likes and dislikes. Yoga is the discipline of silencing the Manas so the truth can reflect in the Buddhi."
            }
        ],
        summary: "Manas is the sensory, perceiving, and doubtful aspect of the mind that processes external information.",
    },
    {
        slug: "chitta",
        wordEnglish: "Chitta",
        wordDevanagari: "चित्त",
        transliteration: "citta",
        pronunciation: "chit-tah",
        etymology: {
            root: "cit (चित्)",
            rootMeaning: "to perceive, to know",
            formationExplanation: "The storehouse of consciousness or memory.",
        },
        primaryMeanings: ["Mind-stuff", "Subconscious", "Memory bank", "Consciousness field"],
        philosophicalContexts: [
            {
                tradition: "Yoga Sutras",
                meaning: "The total field of the mind, including the conscious intellect/ego and the deep subconscious where impressions (Samskaras) are stored.",
            }
        ],
        usageExamples: [
            {
                textContext: "Yoga Sutras 1.2",
                quoteSanskrit: "yogaś citta-vṛtti-nirodhaḥ",
                quoteTranslation: "Yoga is the cessation of the modifications (fluctuations) of the mind-stuff (Chitta).",
                explanation: "This is the definitive, foundational axiom of Patanjali's Yoga.",
            }
        ],
        relatedWords: ["vritti", "samskara", "manas", "nirodha"],
        faqs: [
            {
                question: "Is Chitta the same as consciousness?",
                answer: "In Yoga philosophy, no. Chitta is the material 'screen' upon which the light of pure consciousness (Purusha) reflects. It is highly refined matter, but not the ultimate observer."
            }
        ],
        summary: "Chitta refers to the total landscape of the mind, particularly the deep subconscious storehouse of memories, habits, and impressions.",
    },
    {
        slug: "vritti",
        wordEnglish: "Vritti",
        wordDevanagari: "वृत्ति",
        transliteration: "vṛtti",
        pronunciation: "vrit-tee",
        etymology: {
            root: "vṛt (वृत्)",
            rootMeaning: "to turn, revolve, or roll",
            formationExplanation: "A whirlpool, fluctuation, or modification.",
        },
        primaryMeanings: ["Mental fluctuation", "Thought-wave", "Modification of mind", "Activity"],
        philosophicalContexts: [
            {
                tradition: "Yoga Sutras",
                meaning: "Any thought, emotion, memory, or perception that arises in the field of the mind (Chitta). Like ripples on a lake.",
            }
        ],
        usageExamples: [
            {
                textContext: "Yoga Sutras 1.4",
                quoteSanskrit: "vṛtti sārūpyam itaratra",
                quoteTranslation: "At other times (when not in Yoga), the Seer identifies with the mental modifications (Vrittis).",
                explanation: "When the mind is active, true consciousness mistakes itself for the thoughts passing through it.",
            }
        ],
        relatedWords: ["chitta", "nirodha", "samskara"],
        faqs: [
            {
                question: "Are all Vrittis bad?",
                answer: "No, Patanjali categorizes them into painful (kliṣṭa) and not-painful (akliṣṭa). Even spiritual thoughts are vrittis, but they are useful ones used to quiet the painful ones."
            }
        ],
        summary: "A Vritti is a thought-wave or fluctuation in the mind. The goal of classical yoga is to quiet these fluctuations.",
    },
    {
        slug: "avidya",
        wordEnglish: "Avidya",
        wordDevanagari: "अविद्या",
        transliteration: "avidyā",
        pronunciation: "uh-vid-yah",
        etymology: {
            root: "a + vid (विद्)",
            rootMeaning: "a (not) + vid (to know)",
            formationExplanation: "Ignorance, lack of spiritual knowledge.",
        },
        primaryMeanings: ["Spiritual ignorance", "Delusion", "Misapprehension of reality", "Unawareness"],
        philosophicalContexts: [
            {
                tradition: "Yoga Sutras",
                meaning: "The root affliction (Klesha) from which all other suffering sprouts. Taking the temporary for the eternal, the impure for the pure, and the non-self for the Self.",
            },
            {
                tradition: "Advaita Vedanta",
                meaning: "The fundamental cosmic ignorance that causes the one Brahman to appear as the many individual forms of the universe.",
            }
        ],
        usageExamples: [
            {
                textContext: "Yoga Sutras 2.4",
                quoteSanskrit: "avidyā kṣetram uttareṣām",
                quoteTranslation: "Ignorance is the breeding ground for all the other afflictions.",
                explanation: "Patanjali states that all psychological suffering (ego, attachment, aversion, fear of death) grows out of this single root misunderstanding.",
            }
        ],
        relatedWords: ["vidya", "maya", "klesha", "jnana", "asmita"],
        faqs: [
            {
                question: "Is Avidya a lack of intelligence?",
                answer: "No. High intellectual capacity can coexist with deep spiritual Avidya. It is specifically the failure to distinguish between the eternal 'I' and the temporary body/mind."
            }
        ],
        summary: "Avidya is the foundational spiritual ignorance of misidentifying the eternal true Self with the temporary body, mind, and ego.",
    },
    {
        slug: "klesha",
        wordEnglish: "Klesha",
        wordDevanagari: "क्लेश",
        transliteration: "kleśa",
        pronunciation: "klay-shah",
        etymology: {
            root: "kliś (क्लिश्)",
            rootMeaning: "to suffer, torment, or afflict",
            formationExplanation: "That which causes pain or suffering.",
        },
        primaryMeanings: ["Mental affliction", "Obstacle", "Source of suffering", "Poison"],
        philosophicalContexts: [
            {
                tradition: "Yoga Psychology",
                meaning: "The five root causes of human suffering: Ignorance (Avidya), Egoism (Asmita), Attachment (Raga), Aversion (Dvesha), and Fear of Death (Abhinivesha).",
            },
            {
                tradition: "Buddhism",
                meaning: "Mental states that cloud the mind and manifest in unwholesome actions (often summarized as greed, hatred, and delusion).",
            }
        ],
        usageExamples: [
            {
                textContext: "Yoga Sutras 2.3",
                quoteSanskrit: "avidyā-asmitā-rāga-dveṣa-abhiniveśāḥ pañca-kleśāḥ",
                quoteTranslation: "Ignorance, egoism, attachment, aversion, and clinging to bodily life are the five afflictions.",
                explanation: "The entire therapeutic framework of Yoga is designed to weaken and destroy these five psychological knots.",
            }
        ],
        relatedWords: ["avidya", "asmita", "dukkha", "karma"],
        faqs: [
            {
                question: "How do you remove a Klesha?",
                answer: "Through Kriya Yoga (tapas, study, surrender) and meditation, which weaken the afflictions from an active state to a dormant state, and eventually burn them like seeds."
            }
        ],
        summary: "Kleshas are the deep-seated psychological afflictions and conditionings that generate suffering and tie humans to the cycle of karma.",
    },
    {
        slug: "samskara",
        wordEnglish: "Samskara",
        wordDevanagari: "संस्कार",
        transliteration: "saṃskāra",
        pronunciation: "sum-skahr-ah",
        etymology: {
            root: "sam + kṛ (कृ)",
            rootMeaning: "sam (together/well) + kara (made/action)",
            formationExplanation: "A mental impression, a well-formed groove, or a purifying rite.",
        },
        primaryMeanings: ["Mental impression", "Subconscious conditioning", "Habit pattern", "Rite of passage"],
        philosophicalContexts: [
            {
                tradition: "Yoga Psychology",
                meaning: "The subtle impressions left on the subconscious mind (Chitta) by every action and thought. Repeated actions deepen the groove, creating habits.",
            },
            {
                tradition: "Vedic Culture",
                meaning: "The 16 traditional rites of passage (from conception to cremation) designed to purify and refine a human life.",
            }
        ],
        usageExamples: [
            {
                textContext: "Yoga Sutras 1.50",
                quoteSanskrit: "taj-jaḥ saṃskāro 'nya-saṃskāra-pratibandhī",
                quoteTranslation: "The new mental impression born of that high realization prevents the activation of all other worldly impressions.",
                explanation: "Spiritual practice creates positive samskaras that eventually overwrite the negative, worldly samskaras.",
            }
        ],
        relatedWords: ["chitta", "karma", "vritti", "vasana"],
        faqs: [
            {
                question: "What is the difference between Samskara and Karma?",
                answer: "Karma is the action and its resulting consequence. Samskara is the psychological groove or habit left behind in the mind by that action."
            }
        ],
        summary: "Samskaras are the deep subconscious impressions and habit-patterns formed by our past actions and thoughts, which drive our future behavior.",
    }
];
