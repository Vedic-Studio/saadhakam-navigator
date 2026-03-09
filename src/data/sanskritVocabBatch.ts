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
    },
    {
        slug: "ishvara",
        wordEnglish: "Ishvara",
        wordDevanagari: "ईश्वर",
        transliteration: "īśvara",
        pronunciation: "eesh-vuh-rah",
        etymology: {
            root: "īś (ईश्)",
            rootMeaning: "to rule, own, or have power",
            formationExplanation: "Ishvara means Lord, ruler, or the governing intelligence that presides over creation.",
        },
        primaryMeanings: ["Lord", "Supreme ruler", "Personal God", "Divine governor"],
        philosophicalContexts: [
            {
                tradition: "Yoga Sutras",
                meaning: "Patanjali presents Ishvara as a special Purusha untouched by karma, affliction, or latent impressions, and devotion to Ishvara as a direct aid to Samadhi.",
            },
            {
                tradition: "Vedanta",
                meaning: "Ishvara is Brahman viewed through Maya as the intelligent and ordered cause of the universe—the Lord who creates, sustains, and resolves the cosmos.",
            },
            {
                tradition: "Bhakti Traditions",
                meaning: "Ishvara is the beloved, worshipful Divine approached personally through prayer, mantra, puja, and surrender.",
            }
        ],
        usageExamples: [
            {
                textContext: "Yoga Sutras 1.24",
                quoteSanskrit: "kleśa-karma-vipāka-āśayair aparāmṛṣṭaḥ puruṣa-viśeṣa īśvaraḥ",
                quoteTranslation: "Ishvara is a special Purusha untouched by afflictions, actions, their fruits, or latent impressions.",
                explanation: "Patanjali distinguishes Ishvara from conditioned beings, making the Lord a unique source of guidance and contemplative refuge.",
            },
            {
                textContext: "Yoga Sutras 1.23",
                quoteSanskrit: "īśvara-praṇidhānād vā",
                quoteTranslation: "Or, through surrender to Ishvara.",
                explanation: "One of the shortest yet most powerful sutras: surrender to the Lord is presented as a direct method for attaining meditative absorption.",
            }
        ],
        relatedWords: ["brahman", "bhakti", "guru", "mantra"],
        faqs: [
            {
                question: "Is Ishvara the same as Brahman?",
                answer: "In Vedanta, Ishvara is Brahman viewed as the personal and cosmic Lord associated with creation, while Brahman in the highest sense is the absolute beyond all attributes."
            },
            {
                question: "Why is Ishvara important in Yoga?",
                answer: "Because surrender to Ishvara helps soften ego, steady the mind, and orient practice around something greater than personal struggle or achievement."
            }
        ],
        summary: "Ishvara is the personal Lord or governing Divine intelligence, approached in yoga and devotion as a source of grace, order, and surrender.",
    },
    {
        slug: "jiva",
        wordEnglish: "Jiva",
        wordDevanagari: "जीव",
        transliteration: "jīva",
        pronunciation: "jee-vuh",
        etymology: {
            root: "jīv (जीव्)",
            rootMeaning: "to live or be alive",
            formationExplanation: "Jiva means the living being or individual soul conditioned by embodied existence.",
        },
        primaryMeanings: ["Individual soul", "Living being", "Embodied self", "Life principle in the individual"],
        philosophicalContexts: [
            {
                tradition: "Vedanta",
                meaning: "The Jiva is the individual self appearing under limitation through body, mind, and karma. Schools differ on whether it is ultimately identical with or eternally distinct from Brahman.",
            },
            {
                tradition: "Bhagavad Gita",
                meaning: "The embodied being journeys through bodies as a person changes garments, carrying tendencies and karmic conditioning forward.",
            },
            {
                tradition: "Bhakti",
                meaning: "The Jiva is the soul whose fulfillment lies in restoring conscious relationship with the Divine.",
            }
        ],
        usageExamples: [
            {
                textContext: "Bhagavad Gita 15.7",
                quoteSanskrit: "mamaivāṁśo jīva-loke jīva-bhūtaḥ sanātanaḥ",
                quoteTranslation: "The eternal Jiva in this world is truly a part of Me.",
                explanation: "Krishna describes the living being as an eternal expression of the Divine, though presently entangled in mind and material nature.",
            }
        ],
        relatedWords: ["atman", "karma", "samsara", "moksha"],
        faqs: [
            {
                question: "How is Jiva different from Atman?",
                answer: "Atman refers to the pure Self, while Jiva often refers to that same consciousness as it appears conditioned by body, mind, and karma within worldly life."
            },
            {
                question: "Does the Jiva reincarnate?",
                answer: "Yes. In most Hindu philosophical systems the individual soul continues through cycles of embodiment until liberation is attained."
            }
        ],
        summary: "Jiva is the individual living being or soul as it experiences embodied life under the conditions of karma, mind, and rebirth.",
    },
    {
        slug: "karma-yoga",
        wordEnglish: "Karma Yoga",
        wordDevanagari: "कर्म योग",
        transliteration: "karma-yoga",
        pronunciation: "kar-mah yoh-gah",
        etymology: {
            root: "karma + yuj",
            rootMeaning: "action + union/discipline",
            formationExplanation: "The disciplined spiritual path of action performed in a spirit of offering and non-attachment.",
        },
        primaryMeanings: ["Yoga of action", "Selfless service through work", "Action without attachment", "Duty as spiritual path"],
        philosophicalContexts: [
            {
                tradition: "Bhagavad Gita",
                meaning: "Karma Yoga is the path of performing one's duty fully while relinquishing attachment to the fruits of action, thereby avoiding bondage.",
            },
            {
                tradition: "Vedanta",
                meaning: "Karma Yoga purifies the mind and prepares the seeker for deeper knowledge by reducing egoic attachment and self-centeredness.",
            }
        ],
        usageExamples: [
            {
                textContext: "Bhagavad Gita 2.47",
                quoteSanskrit: "karmaṇy evādhikāras te mā phaleṣu kadācana",
                quoteTranslation: "You have a right to action alone, never to its fruits.",
                explanation: "This is the most cited foundation of Karma Yoga: act wholeheartedly, but do not bind your inner peace to the outcome.",
            }
        ],
        relatedWords: ["karma", "dharma", "seva", "niskama-karma"],
        faqs: [
            {
                question: "Does Karma Yoga mean being passive about outcomes?",
                answer: "No. Karma Yoga asks for full excellence in action; it only removes possessiveness, anxiety, and egoic dependence on the result."
            },
            {
                question: "Who can practice Karma Yoga?",
                answer: "Anyone who works, serves, creates, leads, or cares for others can practice Karma Yoga by turning action into offering."
            }
        ],
        summary: "Karma Yoga is the path of selfless action in which work becomes spiritual practice through duty, offering, and non-attachment to results.",
    },
    {
        slug: "raja-yoga",
        wordEnglish: "Raja Yoga",
        wordDevanagari: "राज योग",
        transliteration: "rāja-yoga",
        pronunciation: "rah-jah yoh-gah",
        etymology: {
            root: "rāja + yuj",
            rootMeaning: "royal + union/discipline",
            formationExplanation: "Called the royal yoga because it aims at sovereign mastery of the inner kingdom of mind and consciousness.",
        },
        primaryMeanings: ["Royal yoga", "Meditative yoga", "Yoga of mental mastery", "Classical contemplative path"],
        philosophicalContexts: [
            {
                tradition: "Classical Yoga",
                meaning: "Raja Yoga is commonly associated with Patanjali's eight-limbed path, emphasizing concentration, meditation, and Samadhi as the road to liberation.",
            },
            {
                tradition: "Modern Yoga Philosophy",
                meaning: "It denotes the inward, contemplative dimension of yoga in contrast to purely physical or devotional emphasis.",
            }
        ],
        usageExamples: [
            {
                textContext: "Yoga Sutras 1.2",
                quoteSanskrit: "yogaś citta-vṛtti-nirodhaḥ",
                quoteTranslation: "Yoga is the cessation of the fluctuations of the mind.",
                explanation: "This foundational sutra captures the essential spirit of Raja Yoga: mastery of the mind through deep inner discipline.",
            }
        ],
        relatedWords: ["yoga", "samadhi", "dhyana", "pranayama"],
        faqs: [
            {
                question: "Is Raja Yoga different from Hatha Yoga?",
                answer: "Yes. Hatha Yoga emphasizes bodily and energetic preparation, while Raja Yoga emphasizes direct mastery of mind through concentration, meditation, and absorption."
            },
            {
                question: "Why is it called the royal path?",
                answer: "Because it is considered a direct and sovereign path to mastery of consciousness, culminating in Samadhi and self-realization."
            }
        ],
        summary: "Raja Yoga is the royal path of meditative mastery, training the mind through concentration, meditation, and ultimately Samadhi.",
    },
    {
        slug: "advaita",
        wordEnglish: "Advaita",
        wordDevanagari: "अद्वैत",
        transliteration: "advaita",
        pronunciation: "ud-vai-tuh",
        etymology: {
            root: "a + dvaita",
            rootMeaning: "not + duality/twoness",
            formationExplanation: "Advaita literally means non-duality, the absence of any ultimate second reality.",
        },
        primaryMeanings: ["Non-duality", "Not-two", "Absolute unity", "Non-dual Vedanta"],
        philosophicalContexts: [
            {
                tradition: "Advaita Vedanta",
                meaning: "Teaches that Brahman alone is ultimately real and that the apparent separation between self, world, and God is due to ignorance and Maya.",
            },
            {
                tradition: "Upanishadic Interpretation",
                meaning: "Mahavakyas like Tat Tvam Asi are read as declarations of non-dual identity between Atman and Brahman.",
            }
        ],
        usageExamples: [
            {
                textContext: "Vedantic Teaching",
                quoteSanskrit: "brahma satyam jagan mithyā jīvo brahmaiva nāparaḥ",
                quoteTranslation: "Brahman alone is real, the world is conditionally apparent, and the individual self is none other than Brahman.",
                explanation: "A classic Advaitic summary of how ultimate reality, the phenomenal world, and the self are understood in non-dual philosophy.",
            }
        ],
        relatedWords: ["brahman", "atman", "maya", "jnana"],
        faqs: [
            {
                question: "Does Advaita mean the world is unreal?",
                answer: "It means the world is relatively real within experience but not the ultimate independent reality. Ultimate truth belongs to Brahman alone."
            },
            {
                question: "Is Advaita only an intellectual philosophy?",
                answer: "No. Its goal is direct realization of non-dual truth through inquiry, contemplation, and liberation from false identification."
            }
        ],
        summary: "Advaita is the non-dual vision that ultimate reality is one without a second, and that apparent separateness is born of ignorance.",
    },
    {
        slug: "niskama-karma",
        wordEnglish: "Niskama Karma",
        wordDevanagari: "निष्काम कर्म",
        transliteration: "niṣkāma-karma",
        pronunciation: "nish-kah-mah kar-mah",
        etymology: {
            root: "niṣ + kāma + karma",
            rootMeaning: "without + desire + action",
            formationExplanation: "It refers to action performed without selfish desire for the fruits or rewards.",
        },
        primaryMeanings: ["Desireless action", "Action without selfish motive", "Non-attached duty", "Gita-based ethical action"],
        philosophicalContexts: [
            {
                tradition: "Bhagavad Gita",
                meaning: "Niskama Karma is the essential method of performing duty without becoming bound by expectation, anxiety, or egoistic claim over outcomes.",
            },
            {
                tradition: "Karma Yoga",
                meaning: "It is the operative inner principle that makes selfless action possible and spiritually transformative.",
            }
        ],
        usageExamples: [
            {
                textContext: "Bhagavad Gita 3.19",
                quoteSanskrit: "tasmād asaktaḥ satataṁ kāryaṁ karma samācara",
                quoteTranslation: "Therefore, always perform the work that ought to be done without attachment.",
                explanation: "Krishna frames non-attached action as an ongoing discipline, not a one-time insight.",
            }
        ],
        relatedWords: ["karma", "karma-yoga", "dharma", "seva"],
        faqs: [
            {
                question: "Can I still have goals while practicing Niskama Karma?",
                answer: "Yes. The practice does not forbid goals; it asks that inner peace and identity not depend on whether those goals are fulfilled."
            },
            {
                question: "Why is Niskama Karma spiritually powerful?",
                answer: "Because it weakens the ego's claim over action, reduces anxiety, and turns ordinary work into an offering rather than a self-centered transaction."
            }
        ],
        summary: "Niskama Karma is the practice of performing action wholeheartedly while letting go of selfish desire for the fruits of that action.",
    },
    {
        slug: "rta",
        wordEnglish: "Rta",
        wordDevanagari: "ऋत",
        transliteration: "ṛta",
        pronunciation: "rih-tuh",
        etymology: {
            root: "ṛ (ऋ)",
            rootMeaning: "to move properly, fit, or rise in order",
            formationExplanation: "Rta signifies the ordered, truthful, and harmonious movement of reality itself.",
        },
        primaryMeanings: ["Cosmic order", "Sacred law", "Truth in action", "Universal harmony"],
        philosophicalContexts: [
            {
                tradition: "Rig Vedic Thought",
                meaning: "Rta is the primordial cosmic order sustaining gods, nature, truth, and ritual correctness. It is the deep pattern behind existence.",
            },
            {
                tradition: "Later Dharmic Thought",
                meaning: "Dharma is often understood as the lived ethical and social expression of the more primordial cosmic principle called Rta.",
            }
        ],
        usageExamples: [
            {
                textContext: "Rig Veda",
                quoteSanskrit: "ṛtasya panthāḥ",
                quoteTranslation: "The paths of cosmic order and truth.",
                explanation: "Vedic seers invoke Rta as the path of alignment, truthfulness, and participation in the universe's sacred rhythm.",
            }
        ],
        relatedWords: ["dharma", "satya", "yajna", "karma"],
        faqs: [
            {
                question: "How is Rta different from Dharma?",
                answer: "Rta is the primordial cosmic order itself, while Dharma is often the human and ethical way of living in alignment with that order."
            },
            {
                question: "Why does Rta matter today?",
                answer: "It reminds seekers that truth, ethics, ritual, and nature are not isolated concerns—they all reflect whether life is aligned with reality or not."
            }
        ],
        summary: "Rta is the ancient Vedic principle of cosmic order, truth, and sacred harmony that underlies later concepts such as Dharma.",
    }
];
