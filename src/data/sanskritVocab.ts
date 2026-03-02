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
  {
    slug: "moksha",
    wordEnglish: "Moksha",
    wordDevanagari: "मोक्ष",
    transliteration: "mokṣa",
    pronunciation: "mohk-shah",
    etymology: {
      root: "muc (मुच्)",
      rootMeaning: "to free, let go, release, or liberate",
      formationExplanation:
        "Moksha signifies the ultimate release from the cycle of birth and death (Samsara) and from all worldly suffering.",
    },
    primaryMeanings: [
      "Liberation or emancipation",
      "Freedom from the cycle of reincarnation (Samsara)",
      "Self-realization",
      "The ultimate goal of human life (Purushartha)",
    ],
    philosophicalContexts: [
      {
        tradition: "Advaita Vedanta",
        meaning:
          "The realization that the individual soul (Atman) is identical to the universal reality (Brahman). It is not a place to go, but a truth to recognize.",
      },
      {
        tradition: "Dvaita Vedanta",
        meaning:
          "Eternal, blissful communion with the personal God (Vishnu), where the soul retains its individual identity but is free from suffering.",
      },
      {
        tradition: "Buddhism",
        meaning:
          "Conceptually similar to Nirvana; the extinguishing of the fires of attachment, aversion, and ignorance.",
      },
    ],
    usageExamples: [
      {
        textContext: "Svetasvatara Upanishad 6.15",
        quoteSanskrit: "तमेव विदित्वाति मृत्युमेति नान्यः पन्था विद्यतेऽयनाय",
        quoteTranslation:
          "Only by knowing Him does one pass over death; there is no other path for liberation (Moksha).",
        explanation:
          "This verse establishes that true knowledge of the Divine is the sole path to conquering death and achieving liberation.",
      },
      {
        textContext: "Bhagavad Gita 18.66",
        quoteSanskrit:
          "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज । अहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ॥",
        quoteTranslation:
          "Abandoning all duties, take refuge in Me alone. I will liberate you from all sins; do not grieve.",
        explanation:
          "Krishna promises Moksha through absolute surrender (Sharanagati), bypassing the complex mechanics of karma.",
      },
    ],
    relatedWords: ["samsara", "atman", "brahman", "karma"],
    faqs: [
      {
        question: "What happens after Moksha?",
        answer:
          "In non-dual traditions, the illusion of a separate self dissolves into universal consciousness. In devotional traditions, the soul experiences eternal bliss in the presence of the Divine.",
      },
      {
        question: "Do you have to die to achieve Moksha?",
        answer:
          "No. Advaita Vedanta and other traditions describe Jivanmukti—liberation while living. A Jivanmukta lives in the world free from attachment and ego.",
      },
      {
        question: "Is Moksha the same as Heaven?",
        answer:
          "No. Heaven (Svarga) is a temporary realm of pleasure won by good karma. Once the karma is exhausted, rebirth occurs. Moksha is permanent freedom from all realms.",
      },
    ],
    summary:
      "Moksha is the ultimate spiritual goal in Sanatan Dharma, representing complete liberation from the cycle of birth and death and the realization of one's true, eternal nature.",
  },
  {
    slug: "yoga",
    wordEnglish: "Yoga",
    wordDevanagari: "योग",
    transliteration: "yoga",
    pronunciation: "yoh-gah",
    etymology: {
      root: "yuj (युज्)",
      rootMeaning: "to yoke, join, or unite",
      formationExplanation:
        "Yoga implies the union of the individual consciousness (Jivatman) with the universal consciousness (Paramatman).",
    },
    primaryMeanings: [
      "Union or connection",
      "Spiritual discipline or path",
      "The cessation of mind fluctuations (Patanjali)",
      "Action performed with evenness of mind (Gita)",
    ],
    philosophicalContexts: [
      {
        tradition: "Yoga Sutras of Patanjali",
        meaning:
          'Defined as "Chitta vritti nirodhah"—the ceasing of the fluctuations of the mind-stuff, leading the seer to rest in their true nature.',
      },
      {
        tradition: "Bhagavad Gita",
        meaning:
          "A broad term for spiritual paths. Krishna defines it as skill in action (Karma Yoga) and evenness of mind in success and failure.",
      },
      {
        tradition: "Hatha Yoga",
        meaning:
          "The forceful union of the solar (Ha) and lunar (Tha) energies in the body to awaken spiritual power (Kundalini).",
      },
    ],
    usageExamples: [
      {
        textContext: "Yoga Sutras 1.2",
        quoteSanskrit: "योगश्चित्तवृत्तिनिरोधः",
        quoteTranslation: "Yoga is the cessation of the movements of the mind.",
        explanation:
          "This is the most famous and clinical definition of Yoga. Once the mind is perfectly still, reality reflects perfectly without distortion.",
      },
      {
        textContext: "Bhagavad Gita 2.48",
        quoteSanskrit: "समत्वं योग उच्यते",
        quoteTranslation: "Equanimity of mind is called Yoga.",
        explanation:
          "Krishna teaches that true Yoga isn't just meditation, but maintaining a perfectly balanced mind regardless of victory or defeat.",
      },
    ],
    relatedWords: ["samadhi", "prana", "chakra", "dharana"],
    faqs: [
      {
        question: "Is Yoga just physical exercise?",
        answer:
          "No. Asana (postures) is only one of the eight limbs of classical Yoga. Traditional Yoga is a comprehensive psychological and spiritual science aimed at liberation.",
      },
      {
        question: "What are the four main paths of Yoga?",
        answer:
          "Karma Yoga (action), Bhakti Yoga (devotion), Jnana Yoga (knowledge), and Raja Yoga (meditation and mind control).",
      },
      {
        question: "Does Yoga belong to a specific religion?",
        answer:
          "Yoga has its roots deeply embedded in Sanatan Dharma (Hinduism) and Vedic philosophy, though its techniques can be practiced by anyone seeking mental clarity and ultimate truth.",
      },
    ],
    summary:
      "Far beyond physical postures, Yoga is the ancient, comprehensive spiritual science of uniting the individual soul with the ultimate reality.",
  },
  {
    slug: "maya",
    wordEnglish: "Maya",
    wordDevanagari: "माया",
    transliteration: "māyā",
    pronunciation: "mah-yah",
    etymology: {
      root: "mā (मा)",
      rootMeaning: "to measure, to build, or to create",
      formationExplanation:
        "Maya originally meant the creative power of a deity. Later, it came to mean the illusory power that makes the infinite Brahman appear as the finite universe.",
    },
    primaryMeanings: [
      "Illusion or apparent reality",
      "The creative power of the Divine",
      "That which is not (ma = not, ya = that)",
      "The phenomenal world of duality",
    ],
    philosophicalContexts: [
      {
        tradition: "Advaita Vedanta",
        meaning:
          "The cosmic illusion that superimposes the world of multiplicity onto the single reality of Brahman, much like a snake projected onto a rope.",
      },
      {
        tradition: "Kashmir Shaivism",
        meaning:
          "Shiva's real, conscious power of creation (Swatantrya). The world is not an illusion, but a real expression of the Divine's free will.",
      },
      {
        tradition: "Vaishnavism",
        meaning:
          "The divine energy of the Lord. It binds those who are attached to the world, but serves those who are devoted to God.",
      },
    ],
    usageExamples: [
      {
        textContext: "Svetasvatara Upanishad 4.10",
        quoteSanskrit: "मायां तु प्रकृतिं विद्यान्मायिनं तु महेश्वरम्",
        quoteTranslation:
          "Know Maya to be Nature (Prakriti), and the Master of Maya to be the Great Lord (Maheshvara).",
        explanation:
          "This verse explains that the physical universe is Maya, but God is the wielder and master of this illusion, not bound by it.",
      },
      {
        textContext: "Bhagavad Gita 7.14",
        quoteSanskrit:
          "दैवी ह्येषा गुणमयी मम माया दुरत्यया । मामेव ये प्रपद्यन्ते मायामेतां तरन्ति ते ॥",
        quoteTranslation:
          "This divine Maya of Mine, consisting of the three gunas, is difficult to overcome. But those who take refuge in Me alone cross over this Maya.",
        explanation:
          "Krishna declares that trying to beat Maya by sheer willpower is nearly impossible; surrender to the Divine is the surest way to pierce the illusion.",
      },
    ],
    relatedWords: ["brahman", "samsara", "lila", "avidya"],
    faqs: [
      {
        question: "If the world is Maya, does it mean it doesn't exist?",
        answer:
          "No. Maya implies the world is 'relatively real.' It exists and you must function within it, but it is not the 'ultimate reality.' It is like a dream: real while you are sleeping, but ultimately a projection.",
      },
      {
        question: "How do you overcome Maya?",
        answer:
          "Through Jnana (knowledge) which dispels ignorance, or through Bhakti (devotion) invoking the grace of God to lift the veil.",
      },
      {
        question: "Why did God create Maya?",
        answer:
          "Different traditions answer differently. Some call it Lila (divine play). Others say questioning the 'why' of Maya is itself an illusion, and the only goal is to wake up from it.",
      },
    ],
    summary:
      "Maya is the cosmic veil or creative power that makes the infinite, undivided ultimate reality appear as a universe of separate, finite objects.",
  },
  {
    slug: "atman",
    wordEnglish: "Atman",
    wordDevanagari: "आत्मन्",
    transliteration: "ātman",
    pronunciation: "aht-mun",
    etymology: {
      root: "an (अन्) or at (अत्)",
      rootMeaning: "to breathe, or to move continuously",
      formationExplanation:
        'Originally meaning "breath," it evolved to signify the animating principle of life, the true self, or the soul.',
    },
    primaryMeanings: [
      "The true Self or Soul",
      "The witnessing consciousness",
      "The eternal, unchanging essence of a living being",
      "The inner controller",
    ],
    philosophicalContexts: [
      {
        tradition: "Advaita Vedanta",
        meaning:
          "The Atman is identical to Brahman. There is no individual soul in absolute reality; there is only one universal consciousness.",
      },
      {
        tradition: "Dvaita Vedanta",
        meaning:
          "The Atman is eternally distinct from God (Brahman) and from other souls. It is a dependent reality.",
      },
      {
        tradition: "Buddhism",
        meaning:
          'Buddhism explicitly rejects Atman, proposing "Anatta" (non-self)—the idea that there is no permanent, unchanging soul.',
      },
    ],
    usageExamples: [
      {
        textContext: "Katha Upanishad 1.2.18",
        quoteSanskrit:
          "न जायते म्रियते वा विपश्चिन्नायं कुतश्चिन्न बभूव कश्चित् । अजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे ॥",
        quoteTranslation:
          "The knowing Self is not born, nor does it die. It sprang from nothing, and nothing sprang from it. Unborn, eternal, everlasting, and ancient, It is not killed when the body is killed.",
        explanation:
          "This is the definitive Upanishadic statement on the immortality and uncreated nature of the soul.",
      },
      {
        textContext: "Chandogya Upanishad 6.8.7",
        quoteSanskrit: "तत्त्वमसि (Tat Tvam Asi)",
        quoteTranslation: "That Thou Art.",
        explanation:
          "The grand pronouncement (Mahavakya) declaring that the individual core of your being (Atman) is exactly the same as the ground of the universe (Brahman).",
      },
    ],
    relatedWords: ["brahman", "moksha", "samsara", "prana"],
    faqs: [
      {
        question: "Is Atman the same as the ego?",
        answer:
          'No. The ego (Ahamkara) is the psychological construct that says "I am this body/mind." The Atman is the silent, observing awareness behind the ego.',
      },
      {
        question: "Does the Atman reincarnate?",
        answer:
          "Yes, according to dualistic traditions. The pure Atman takes on a subtle body that carries karma from life to life. In Advaita, the Atman never really moves; only the subtle body reincarnates.",
      },
      {
        question: "How can I experience the Atman?",
        answer:
          'Through paths like Atma Vichara (self-inquiry), where one continually tracks the feeling of "I" back to its source, bypassing all thoughts and emotions.',
      },
    ],
    summary:
      "Atman refers to the eternal, unchanging witnessing consciousness within every being, often identified in Vedanta as identical to the ultimate fabric of reality.",
  },
  {
    slug: "brahman",
    wordEnglish: "Brahman",
    wordDevanagari: "ब्रह्मन्",
    transliteration: "brahman",
    pronunciation: "bruh-mun",
    etymology: {
      root: "bṛh (बृह्)",
      rootMeaning: "to grow, swell, expand, or enlarge",
      formationExplanation:
        "Brahman denotes the vast, infinite, expanding, and ultimate reality that constitutes the ground of all existence.",
    },
    primaryMeanings: [
      "The Ultimate Reality or Absolute Truth",
      "The cosmic principle and ground of all being",
      "Pure, infinite consciousness",
      "The uncaused cause of the universe",
    ],
    philosophicalContexts: [
      {
        tradition: "Advaita Vedanta",
        meaning:
          "Nirguna Brahman: The absolute without qualities, form, or attributes. It alone is real; everything else is an apparent manifestation (Maya).",
      },
      {
        tradition: "Vishishtadvaita",
        meaning:
          'Saguna Brahman: The absolute with infinite auspicious qualities (usually identified with Narayana/Vishnu). The universe and souls constitute His "body."',
      },
    ],
    usageExamples: [
      {
        textContext: "Taittiriya Upanishad 2.1.1",
        quoteSanskrit: "सत्यं ज्ञानमनन्तं ब्रह्म",
        quoteTranslation: "Brahman is Truth, Knowledge, and Infinity.",
        explanation:
          "This famous definition describes Brahman not as a being that possesses truth or knowledge, but as the very essence of existence, awareness, and limitlessness.",
      },
      {
        textContext: "Brihadaranyaka Upanishad 4.4.25",
        quoteSanskrit: "स वा एष महानज आत्माऽजरोऽमरोऽमृतोऽभयो ब्रह्म",
        quoteTranslation:
          "That immense, unborn self is undecaying, immortal, undying, fearless Brahman.",
        explanation:
          "A soaring declaration equating the inner self (Atman) with the indestructible, fearless cosmic absolute.",
      },
    ],
    relatedWords: ["atman", "maya", "moksha", "om"],
    faqs: [
      {
        question: "Is Brahman the same as Brahma?",
        answer:
          "No. Brahmā is the four-faced creator deity in the Hindu trinity. Brahman is the genderless, formless, infinite absolute reality behind all deities and universes.",
      },
      {
        question: "Can Brahman be described in words?",
        answer:
          'The Upanishads say Brahman is "Neti, Neti" (Not this, Not this). Words can only describe objects, but Brahman is the ultimate Subject. It can be experienced, but not captured by language.',
      },
      {
        question: "If Brahman is everywhere, why don't we see it?",
        answer:
          "Because of ignorance (Avidya) and the veiling power of Maya. We mistake the screen (Brahman) for the movie (the physical world).",
      },
    ],
    summary:
      "Brahman is the supreme, infinite, formless reality and pure consciousness that constitutes the foundational ground of the entire universe.",
  },
  {
    slug: "samsara",
    wordEnglish: "Samsara",
    wordDevanagari: "संसार",
    transliteration: "saṃsāra",
    pronunciation: "sum-sah-rah",
    etymology: {
      root: "sam (सम्) + sṛ (सृ)",
      rootMeaning: "to flow together, or to wander through",
      formationExplanation:
        'It literally translates to "running around" or "continuous flow," representing the cyclic, repeating, and often aimless wandering of the soul through lifetimes.',
    },
    primaryMeanings: [
      "The cycle of birth, death, and rebirth",
      "The worldly life or mundane existence",
      "The illusory flow of phenomena",
      "The ocean of worldly suffering",
    ],
    philosophicalContexts: [
      {
        tradition: "All Dharmic Traditions",
        meaning:
          "The fundamental predicament of living beings: being bound to an endless wheel of rebirth fueled by ignorance, desire, and karma.",
      },
      {
        tradition: "Vedanta",
        meaning:
          "Samsara is ultimately unreal (Maya). Once ignorance is replaced by Self-knowledge (Jnana), one realizes they were never actually bound.",
      },
    ],
    usageExamples: [
      {
        textContext: "Katha Upanishad 1.3.7",
        quoteSanskrit:
          "यस्त्वविज्ञानवान्भवत्यमनस्कः सदाऽशुचिः । न स तत्पदमाप्नोति संसारं चाधिगच्छति ॥",
        quoteTranslation:
          "He who lacks discrimination, whose mind is not under control, and who is always impure, does not reach that goal, but falls into Samsara.",
        explanation:
          "This verse directly links the lack of spiritual discipline to remaining trapped in the cycle of reincarnation.",
      },
      {
        textContext: "Bhagavad Gita 8.15",
        quoteSanskrit:
          "मामुपेत्य पुनर्जन्म दुःखालयमशाश्वतम् । नाप्नुवन्ति महात्मानः संसिद्धिं परमां गताः ॥",
        quoteTranslation:
          "Having attained Me, these great souls do not take birth again here in this temporary, miserable world (Samsara), for they have attained the highest perfection.",
        explanation:
          "Krishna describes the material world as inherently temporary and full of misery, contrasting it with the permanence of divine union.",
      },
    ],
    relatedWords: ["karma", "moksha", "maya", "avidya"],
    faqs: [
      {
        question: "Why is Samsara viewed negatively?",
        answer:
          "Because all worldly pleasures in Samsara are temporary. Even if you attain heaven or wealth, it eventually ends, leading to fear and suffering. True peace is only found outside the cycle.",
      },
      {
        question: "What keeps us stuck in Samsara?",
        answer:
          "Avidya (ignorance of our true nature), which leads to Kama (desire/attachment), which leads to Karma (action for results), generating the seeds for future births.",
      },
      {
        question: "How do you escape Samsara?",
        answer:
          "By achieving Moksha (liberation), which is accomplished through realizing the Atman, burning up Karma, or completely surrendering to God.",
      },
    ],
    summary:
      "Samsara is the continuous cycle of death and rebirth to which life in the material world is bound, driven by karma and ignorance.",
  },
  {
    slug: "ahimsa",
    wordEnglish: "Ahimsa",
    wordDevanagari: "अहिंसा",
    transliteration: "ahiṃsā",
    pronunciation: "uh-him-sah",
    etymology: {
      root: "a (अ) + himsā (हिंसा)",
      rootMeaning: "not + to strike, injure, or kill",
      formationExplanation:
        'The word is a negation of "himsa" (violence). It means the total absence of the desire to harm any living being.',
    },
    primaryMeanings: [
      "Non-violence or non-injury",
      "Compassion toward all living beings",
      "The first of the Yamas (ethical restrains) in Yoga",
      "Avoidance of harm in thought, word, and deed",
    ],
    philosophicalContexts: [
      {
        tradition: "Yoga Sutras of Patanjali",
        meaning:
          "Ahimsa is the foundational Yama. Patanjali states that when a yogi is firmly established in non-violence, all hostility ceases in their presence.",
      },
      {
        tradition: "Jainism",
        meaning:
          "The absolute core of the religion. Ahimsa is applied with extreme rigor, extending to microscopic life, speech, and mental intent.",
      },
      {
        tradition: "Bhagavad Gita",
        meaning:
          "A complex view: Ahimsa is a high virtue, but maintaining cosmic order (Dharma) sometimes requires physical battle (as Arjuna must fight), provided there is no malice in the heart.",
      },
    ],
    usageExamples: [
      {
        textContext: "Mahabharata (Anushasana Parva)",
        quoteSanskrit: "अहिंसा परमो धर्मः",
        quoteTranslation: "Non-violence is the highest Dharma (duty).",
        explanation:
          "This famously quoted maxim establishes compassion and non-injury as the pinnacle of ethical behavior in Hindu thought.",
      },
      {
        textContext: "Yoga Sutras 2.35",
        quoteSanskrit: "अहिंसाप्रतिष्ठायां तत्सन्निधौ वैरत्यागः",
        quoteTranslation:
          "When one is firmly established in non-violence, all hostility ceases in his presence.",
        explanation:
          "Patanjali claims that true inner non-violence radiates outward, creating an energetic field that pacifies others.",
      },
    ],
    relatedWords: ["dharma", "satya", "karma", "yoga"],
    faqs: [
      {
        question: "Does Ahimsa mean you can never fight?",
        answer:
          "No. While Jainism advocates absolute pacifism, Hinduism and Buddhism allow for self-defense and the protection of the innocent. Violence used to stop greater violence, without hatred, is sometimes required by Dharma.",
      },
      {
        question: "Does Ahimsa require vegetarianism?",
        answer:
          "In most Yogic, Hindu, and Jain contexts, yes. To minimize harm, practitioners adopt a diet that avoids slaughtering animals.",
      },
      {
        question: "Can thoughts be violent?",
        answer:
          "Yes. True Ahimsa means abstaining from violence in deed, in speech, and in thought. Harboring hatred is considered a violation of Ahimsa.",
      },
    ],
    summary:
      "Ahimsa is the profound ethical principle of total non-violence and compassion in thought, word, and action toward all living entities.",
  },
  {
    slug: "satya",
    wordEnglish: "Satya",
    wordDevanagari: "सत्य",
    transliteration: "satya",
    pronunciation: "sut-yah",
    etymology: {
      root: "sat (सत्)",
      rootMeaning: "true essence, being, or that which exists",
      formationExplanation:
        'Derived from "Sat" (being), Satya means that which is in accord with reality, truthfulness, and absolute truth.',
    },
    primaryMeanings: [
      "Truth or truthfulness",
      "The ultimate Reality",
      "Honesty in speech and action",
      "The second Yama in Patanjali's Yoga",
    ],
    philosophicalContexts: [
      {
        tradition: "Vedanta",
        meaning:
          'Satya is not just "telling the truth"; it is the ultimate reality itself (Brahman is Satya). It is that which never changes in the past, present, or future.',
      },
      {
        tradition: "Yoga Sutras",
        meaning:
          "The commitment to truthfulness. When a yogi is perfectly established in Satya, their words become so pure that whatever they say manifests as reality.",
      },
    ],
    usageExamples: [
      {
        textContext: "Mundaka Upanishad 3.1.6",
        quoteSanskrit: "सत्यमेव जयते नानृतं",
        quoteTranslation: "Truth alone triumphs, not falsehood.",
        explanation:
          "This is the national motto of India. It declares that ultimate success and liberation are only found in alignment with the truth.",
      },
      {
        textContext: "Yoga Sutras 2.36",
        quoteSanskrit: "सत्यप्रतिष्ठायां क्रियाफलाश्रयत्वम्",
        quoteTranslation:
          "When one is firmly established in truthfulness, one's actions bear fruit automatically.",
        explanation:
          "Patanjali explains the mystical resulting power of absolute honesty: nature bends to fulfill the words of someone who never lies.",
      },
    ],
    relatedWords: ["ahimsa", "brahman", "dharma", "tapas"],
    faqs: [
      {
        question: "If truth hurts someone, should I still tell it?",
        answer:
          'In yoga philosophy, Ahimsa (non-violence) sits above Satya (truth). If a "truth" will cause unnecessary, malicious harm, silence is preferred. Truth must be spoken with kindness.',
      },
      {
        question: "Is Satya just about not lying?",
        answer:
          "It goes deeper. It means aligning your thoughts, words, and actions perfectly. It means living authentically and seeking the ultimate truth of existence.",
      },
      {
        question: "Why is Brahman called Satya?",
        answer:
          'Because the physical world changes and dies, so it is "untrue" over a long enough timeline. Brahman (Consciousness) never changes, so it is absolute Truth (Sat).',
      },
    ],
    summary:
      "Satya represents both the ethical practice of absolute honesty and the philosophical concept of the unchanging, ultimate Reality.",
  },
  {
    slug: "prana",
    wordEnglish: "Prana",
    wordDevanagari: "प्राण",
    transliteration: "prāṇa",
    pronunciation: "prah-nah",
    etymology: {
      root: "pra (प्र) + an (अन्)",
      rootMeaning: "forth + to breathe",
      formationExplanation:
        'It literally translates as "vital breath" or "life force," representing the animating energy that flows through both the body and the universe.',
    },
    primaryMeanings: [
      "Vital life force energy",
      "The breath",
      "The animating principle of the universe",
      "The vital air that governs the heart and chest",
    ],
    philosophicalContexts: [
      {
        tradition: "Hatha Yoga",
        meaning:
          "Prana is the subtle energy managed through breath control (Pranayama) and routed through channels (Nadis) to awaken higher consciousness.",
      },
      {
        tradition: "Upanishads",
        meaning:
          "Prana is used as a metaphor for Brahman—it is the underlying thrum of life energy that makes all physical existence possible.",
      },
      {
        tradition: "Ayurveda",
        meaning:
          "The fundamental energy responsible for physical operation. Disease is viewed as a blockage or imbalance of Prana.",
      },
    ],
    usageExamples: [
      {
        textContext: "Prashna Upanishad 2.13",
        quoteSanskrit: "प्राणस्येदं वशे सर्वं त्रिदिवे यत्प्रतिष्ठितम्",
        quoteTranslation:
          "All that exists in the three heavens rests in the control of Prana.",
        explanation:
          "This exalts Prana not just as human breath, but as the governing cosmic force of the entire universe.",
      },
      {
        textContext: "Hatha Yoga Pradipika 2.2",
        quoteSanskrit: "चले वाते चलं चित्तं निश्चले निश्चलं भवेत्",
        quoteTranslation:
          "When the breath (Prana) wanders, the mind is unsteady. But when the breath is stilled, so is the mind.",
        explanation:
          "This establishes the fundamental yogic physics: the mind and the vital energy are mechanically locked together. Control one, and you control the other.",
      },
    ],
    relatedWords: ["chakra", "yoga", "atman"],
    faqs: [
      {
        question: "Is Prana just oxygen?",
        answer:
          'No. Oxygen is the physical carrier of Prana, but Prana itself is subtle energy. It is closer to the Chinese concept of "Chi" or "Qi"—the vital force behind biological existence.',
      },
      {
        question: "What are the five Pranas?",
        answer:
          "The body's vital energy is divided into five functions (Vayus): Prana (inward), Apana (downward/elimination), Samana (digestion), Udana (upward/speech), and Vyana (circulation).",
      },
      {
        question: "How do you increase Prana?",
        answer:
          "Through Pranayama (breathwork), eating fresh, high-quality food, spending time in nature, positive thinking, and associating with spiritually elevated people or environments.",
      },
    ],
    summary:
      "Prana is the vital, life-sustaining cosmic energy that flows through the subtle body, intrinsically linked to the breath and the mind.",
  },
  {
    slug: "chakra",
    wordEnglish: "Chakra",
    wordDevanagari: "चक्र",
    transliteration: "cakra",
    pronunciation: "chuh-kruh",
    etymology: {
      root: "cak (चक्)",
      rootMeaning: "to move, to be in action, or to shine",
      formationExplanation:
        'It translates literally to "wheel," "circle," or "vortex," referring to the spinning centers of subtle energy within the energetic body.',
    },
    primaryMeanings: [
      "Wheel or circle",
      "Energy center in the subtle body",
      "A spinning vortex of Prana",
      "A focal point for meditation",
    ],
    philosophicalContexts: [
      {
        tradition: "Tantra / Kundalini Yoga",
        meaning:
          "Chakras are the junctions where physical, psychological, and spiritual energies intersect. There are seven primary chakras aligned along the spine.",
      },
      {
        tradition: "Buddhism (Vajrayana)",
        meaning:
          "Chakras (spelled cakras) are focal points intersecting the central channel (Nadi). The Tibetan system often focuses on four or five main chakras.",
      },
      {
        tradition: "General Hindu Tradition",
        meaning:
          "Also refers to the divine weapon (Sudarshana Chakra) of Lord Vishnu, representing the wheel of time and cosmic order.",
      },
    ],
    usageExamples: [
      {
        textContext: "Shatchakra Nirupana (Tantric Text)",
        quoteSanskrit: "मूलाधारे... कुण्डलिनी... सर्प-वज्रा",
        quoteTranslation:
          "In the Muladhara (root chakra)... rests the Kundalini... coiled like a serpent.",
        explanation:
          "This text is one of the primary sources for the modern understanding of the seven chakras and the rising of Kundalini energy.",
      },
      {
        textContext: "Bhagavad Gita 8.12",
        quoteSanskrit: "मूर्ध्न्याधायात्मनः प्राणमास्थितो योगधारणाम्",
        quoteTranslation:
          "Confining the life breath within the head (Sahasrara chakra), firmly established in yoga...",
        explanation:
          "Krishna instructs the dying yogi to draw all energy up the central channel and fix it in the highest energy center to achieve liberation.",
      },
    ],
    relatedWords: ["prana", "yoga", "dharana", "samadhi"],
    faqs: [
      {
        question: "Are Chakras physical organs?",
        answer:
          "No, they belong to the 'Sukshma Sharira' (subtle body). However, they map closely to major physical nerve plexuses and endocrine glands in the physical body.",
      },
      {
        question: "What does it mean for a Chakra to be 'blocked'?",
        answer:
          "It means the Prana (vital energy) is stagnating at a certain psychological or emotional level—such as fear (root chakra), guilt (sacral), or grief (heart)—preventing higher awareness.",
      },
      {
        question: "What are the seven main Chakras?",
        answer:
          "Muladhara (Root), Svadhishthana (Sacral), Manipura (Solar Plexus), Anahata (Heart), Vishuddha (Throat), Ajna (Third Eye), and Sahasrara (Crown).",
      },
    ],
    summary:
      "Chakras are the subtle, spinning energy centers along the spine that govern our physical, psychological, and spiritual wellbeing.",
  },
  {
    slug: "samadhi",
    wordEnglish: "Samadhi",
    wordDevanagari: "समाधि",
    transliteration: "samādhi",
    pronunciation: "suh-mah-dhee",
    etymology: {
      root: "sam (सम्) + ā (आ) + dhā (धा)",
      rootMeaning: "together + fully + to place or put",
      formationExplanation:
        'It literally means "putting together" or "complete integration," referring to the state where the meditator, the act of meditation, and the object of meditation merge into one.',
    },
    primaryMeanings: [
      "Perfect concentration or meditative absorption",
      "The eighth and final limb of Patanjali's Yoga",
      "A state of profound bliss and non-duality",
      "The tomb of a saint",
    ],
    philosophicalContexts: [
      {
        tradition: "Yoga Sutras of Patanjali",
        meaning:
          "The climax of Ashtanga Yoga. It has stages: from Savikalpa Samadhi (with object/distinction) to Nirvikalpa Samadhi (perfect absorption without any distinction).",
      },
      {
        tradition: "Buddhism",
        meaning:
          "The last step of the Noble Eightfold Path (Samma Samadhi), representing the high states of meditative absorption (Jhanas).",
      },
      {
        tradition: "Advaita Vedanta",
        meaning:
          "The experiential realization of the identity between Atman and Brahman. It is not just concentration, but absolute knowledge (Jnana).",
      },
    ],
    usageExamples: [
      {
        textContext: "Yoga Sutras 3.3",
        quoteSanskrit: "तदेवार्थमात्रनिर्भासं स्वरूपशून्यमिव समाधिः",
        quoteTranslation:
          "When the object of meditation alone shines forth, and the mind is as if devoid of its own form, that is Samadhi.",
        explanation:
          "Patanjali defines the moment the ego completely drops out of the meditation process. You are no longer 'meditating on the object'—you become the object.",
      },
      {
        textContext: "Bhagavad Gita 2.53",
        quoteSanskrit: "श्रुतिविप्रतिपन्ना ते यदा स्थास्यति निश्चला । समाधावचला बुद्धिस्तदा योगमवाप्स्यसि ॥",
        quoteTranslation:
          "When your intellect, bewildered by the scriptures, remains steady and immovable in Samadhi, then you will attain Yoga.",
        explanation:
          "Krishna explains that true spiritual union (Yoga) only occurs when intellectual confusion ceases and the mind rests perfectly in Samadhi.",
      },
    ],
    relatedWords: ["yoga", "dharana", "moksha", "brahman"],
    faqs: [
      {
        question: "Is Samadhi the same as Moksha?",
        answer:
          "Not exactly. Samadhi is a state of deep meditative absorption. Moksha is the permanent liberation from Samsara. Nirvikalpa Samadhi leads to Moksha, but lower states of Samadhi are temporary.",
      },
      {
        question: "Are you unconscious in Samadhi?",
        answer:
          "No, it is the exact opposite. You are 'unconscious' of the physical world or the ego, but you are experiencing 'super-consciousness'—the purest form of awareness.",
      },
      {
        question: "Why do they call a saint's tomb a Samadhi?",
        answer:
          "Great yogis do not 'die'; they consciously exit their bodies in a final, irreversible state of absorption called Mahasamadhi. The place where their body is buried holds that spiritual resonance.",
      },
    ],
    summary:
      "Samadhi is the pinnacle of the yogic path—a state of ecstatic, non-dual absorption where the illusion of the separate self dissolves into pure consciousness.",
  },
  {
    slug: "tapas",
    wordEnglish: "Tapas",
    wordDevanagari: "तपस्",
    transliteration: "tapas",
    pronunciation: "tuh-pus",
    etymology: {
      root: "tap (तप्)",
      rootMeaning: "to heat, to burn, or to shine",
      formationExplanation:
        'It translates to "heat" or "glow," specifically the spiritual friction and heat generated by intense self-discipline, austerity, or deep meditation.',
    },
    primaryMeanings: [
      "Austerity or asceticism",
      "Spiritual discipline and endurance",
      "The 'heat' of spiritual practice",
      "A Niyama (observance) in Yoga",
    ],
    philosophicalContexts: [
      {
        tradition: "Yoga Sutras",
        meaning:
          "One of the Niyamas (personal observances). Patanjali says that Tapas burns away impurities, leading to perfection of the body and senses.",
      },
      {
        tradition: "Vedic Tradition",
        meaning:
          "It is the cosmic heat or energy from which the universe was born. Gods and sages perform Tapas to gain incredible spiritual power.",
      },
      {
        tradition: "Bhagavad Gita",
        meaning:
          "Krishna categorizes Tapas into three types: austerity of the body (purity, non-violence), speech (truthfulness, pleasing words), and mind (serenity, self-control).",
      },
    ],
    usageExamples: [
      {
        textContext: "Yoga Sutras 2.43",
        quoteSanskrit: "कायेन्द्रियसिद्धिरशुद्धिक्षयात्तपसः",
        quoteTranslation:
          "By austerity (Tapas), impurities are destroyed, and perfection of the body and senses is gained.",
        explanation:
          "Patanjali explains the mechanical purpose of spiritual discipline: it literally burns away the physical and mental blockages preventing higher states.",
      },
      {
        textContext: "Bhagavad Gita 17.16",
        quoteSanskrit: "मनःप्रसादः सौम्यत्वं मौनमात्मविनिग्रहः । भावसंशुद्धिरित्येतत्तपो मानसमुच्यते ॥",
        quoteTranslation:
          "Serenity of mind, gentleness, silence, self-control, and purity of thought—this is called the austerity (Tapas) of the mind.",
        explanation:
          "Krishna shifts the meaning of 'austerity' away from physically torturing the body, defining true Tapas as profound psychological discipline.",
      },
    ],
    relatedWords: ["yoga", "karma", "satya", "ahimsa"],
    faqs: [
      {
        question: "Does Tapas mean causing pain to yourself?",
        answer:
          "No. Extreme asceticism that harms the body is condemned in texts like the Gita. True Tapas is the voluntary acceptance of discomfort to break the ego's addiction to pleasure.",
      },
      {
        question: "How do normal people practice Tapas?",
        answer:
          "Fasting on certain days, keeping a vow of silence (mauna) for an hour, waking up early to meditate regardless of feeling tired, or speaking kindly to someone who insults you.",
      },
      {
        question: "What is the result of Tapas?",
        answer:
          "Tremendous willpower, character, and 'Tejas' (spiritual radiance). It purifies the nervous system so it can handle the intense energy of Kundalini or higher consciousness.",
      },
    ],
    summary:
      "Tapas is the profound spiritual discipline and 'heat' generated by voluntary austerity, used to burn away egoic impurities and build immense willpower.",
  },
  {
    slug: "guru",
    wordEnglish: "Guru",
    wordDevanagari: "गुरु",
    transliteration: "guru",
    pronunciation: "goo-roo",
    etymology: {
      root: "gu (गु) + ru (रु)",
      rootMeaning: "darkness/ignorance + dispeller/remover",
      formationExplanation:
        'Though literally meaning "heavy" or "weighty" (in terms of knowledge), standard esoteric tradition breaks it down as "the dispeller of darkness."',
    },
    primaryMeanings: [
      "Spiritual teacher or master",
      "Dispeller of darkness/ignorance",
      "One who is heavy with spiritual wisdom",
      "Jupiter (in Vedic astrology)",
    ],
    philosophicalContexts: [
      {
        tradition: "Vedanta / Bhakti",
        meaning:
          "The Guru is not just a teacher, but an essential conduit for divine grace. In strict traditions, Moksha is nearly impossible without a living Guru.",
      },
      {
        tradition: "Sikhism",
        meaning:
          "Central to the faith. The succession of the 10 living Gurus ended with the Guru Granth Sahib, which is revered as the eternal, living text Guru.",
      },
      {
        tradition: "Tantra / Shaivism",
        meaning:
          "The Guru is viewed as non-different from Shiva/God Himself. The Guru imparts 'Shaktipat' (energy transmission) conferring instant awakening.",
      },
    ],
    usageExamples: [
      {
        textContext: "Guru Gita (Skanda Purana)",
        quoteSanskrit: "गुरुर्ब्रह्मा गुरुर्विष्णुर्गुरुर्देवो महेश्वरः । गुरुः साक्षात् परब्रह्म तस्मै श्रीगुरवे नमः ॥",
        quoteTranslation:
          "The Guru is Brahma, the Guru is Vishnu, the Guru is Maheshvara (Shiva). The Guru is verily the Supreme Absolute (Parabrahman); to that revered Guru, my salutations.",
        explanation:
          "This famous shloka elevates the true spiritual master from a mere human teacher to the physical manifestation of the entire divine trinity and absolute reality.",
      },
      {
        textContext: "Bhagavad Gita 4.34",
        quoteSanskrit: "तद्विद्धि प्रणिपातेन परिप्रश्नेन सेवया । उपदेक्ष्यन्ति ते ज्ञानं ज्ञानिनस्तत्त्वदर्शिनः ॥",
        quoteTranslation:
          "Acquire this knowledge by humbly approaching a master, by sincere inquiry, and by service. The wise, who have seen the Truth, will instruct you.",
        explanation:
          "Krishna gives the formula for learning from a Guru: surrender (killing the ego), questioning (intellectual rigor), and Seva (humble service).",
      },
    ],
    relatedWords: ["seva", "mantra", "moksha", "yoga"],
    faqs: [
      {
        question: "Do I need a Guru to be enlightened?",
        answer:
          "While technically possible to awaken alone, all major Dharmic traditions insist a Guru is necessary to navigate the mind's deep illusions and ego traps safely.",
      },
      {
        question: "How do you recognize a true Guru?",
        answer:
          "A true Guru wants nothing from you except your liberation. They exhibit perfect Shanti (peace), possess deep scriptural knowledge, and their presence naturally stills your mind.",
      },
      {
        question: "What is the 'Inner Guru'?",
        answer:
          "Because the Atman (Soul) and Brahman (God) are one, the ultimate Guru is the divine presence inside your own heart. The external Guru reveals the internal Guru.",
      },
    ],
    summary:
      "A Guru is much more than a teacher; they are a realized spiritual master who dispels the darkness of ignorance and acts as a direct conduit for divine grace.",
  },
  {
    slug: "mantra",
    wordEnglish: "Mantra",
    wordDevanagari: "मन्त्र",
    transliteration: "mantra",
    pronunciation: "mun-truh",
    etymology: {
      root: "man (मन्) + tra (त्र)",
      rootMeaning: "mind/to think + vehicle/instrument/to protect",
      formationExplanation:
        'It translates to "an instrument of the mind" or "that which protects the mind." A mantra is a sacred sound used to elevate consciousness.',
    },
    primaryMeanings: [
      "Sacred utterance or sound formula",
      "An instrument of the mind",
      "A tool for spiritual protection and meditation",
    ],
    philosophicalContexts: [
      {
        tradition: "Vedic Tradition",
        meaning:
          "Mantras are the very sonic fabric of the universe. They were 'heard' (Shruti) by ancient sages in deep meditation, not 'written' by them.",
      },
      {
        tradition: "Tantra / Mantra Shastra",
        meaning:
          "Every deity has a 'Bija' (seed) mantra. The deity and the mantra are identical. Chanting the mantra perfectly literally manifests the deity's energy.",
      },
      {
        tradition: "Yoga",
        meaning:
          "Used in Japa Yoga (repeated chanting) to concentrate the mind, block out worldly thoughts, and subtly alter the energetic frequencies of the body.",
      },
    ],
    usageExamples: [
      {
        textContext: "Mandukya Upanishad 1",
        quoteSanskrit: "ओमित्येतदक्शरमिदँ सर्वं तस्योपव्याख्यानं भूतं भवद्भविश्यदिति सर्वमोङ्कार एव",
        quoteTranslation:
          "Om—this syllable is this whole world. The past, the present, and the future—everything is just the syllable Om.",
        explanation:
          "This posits 'Om' as the supreme, all-encompassing root mantra out of which all other mantras and the entire universe arise.",
      },
      {
        textContext: "Rig Veda 3.62.10 (Gayatri Mantra)",
        quoteSanskrit: "तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्",
        quoteTranslation:
          "Let us meditate on the glorious splendor of the divine Sun; may He illuminate our minds.",
        explanation:
          "One of the oldest and most powerful mantras in Hinduism, used daily for thousands of years to invoke spiritual light and intellectual illumination.",
      },
    ],
    relatedWords: ["guru", "yoga", "dharana", "samadhi"],
    faqs: [
      {
        question: "Does the meaning of the Mantra matter?",
        answer:
          "Yes and no. The intellectual meaning is inspiring, but the true power of a Mantra lies in its 'Dhvani' (vibrational frequency). It works on the subtle body even if you don't know the exact translation.",
      },
      {
        question: "Can I just pick a Mantra from a book?",
        answer:
          "You can, and it will give you peace of mind. However, traditionally, a mantra gains immense power when passed down directly from a Guru through initiation (Diksha).",
      },
      {
        question: "What is a 'Bija' Mantra?",
        answer:
          "A 'seed' mantra, usually a single syllable (like Om, Hrim, Shrim, Klim), that contains vast spiritual power without a translatable linguistic meaning.",
      },
    ],
    summary:
      "A Mantra is a potent, sacred sound formula used as an instrument of the mind to focus consciousness, alter subtle energy, and protect against negativity.",
  },
  {
    slug: "seva",
    wordEnglish: "Seva",
    wordDevanagari: "सेवा",
    transliteration: "sevā",
    pronunciation: "say-vah",
    etymology: {
      root: "sev (सेव्)",
      rootMeaning: "to attend, to serve, or to devote oneself to",
      formationExplanation:
        'It translates to "selfless service." Seva is action performed without any expectation of result or reward.',
    },
    primaryMeanings: [
      "Selfless service",
      "Devotional service to God or humanity",
      "Karma Yoga in practice",
      "Attendance upon a Guru",
    ],
    philosophicalContexts: [
      {
        tradition: "Sikhism",
        meaning:
          "Absolutely central to Sikh practice. Langar (the free community kitchen) is a prime example of Seva—serving humanity regardless of caste or creed.",
      },
      {
        tradition: "Karma Yoga (Bhagavad Gita)",
        meaning:
          "The practical application of Karma Yoga. By serving others selflessly, the yogi chips away at ego and attachment.",
      },
      {
        tradition: "Bhakti Yoga",
        meaning:
          "Serving the deity (through temple work, cooking, etc.) with intense love, viewing the act of service itself as the highest reward.",
      },
    ],
    usageExamples: [
      {
        textContext: "Bhagavad Gita 3.19",
        quoteSanskrit: "तस्मादसक्तः सततं कार्यं कर्म समाचर । असक्तो ह्याचरन्कर्म परमाप्नोति पूरुषः ॥",
        quoteTranslation:
          "Therefore, without attachment, always perform your duty efficiently. By performing work without attachment, a person attains the Supreme.",
        explanation:
          "This is the theological basis for Seva: acting efficiently for the benefit of the world, wholly unconcerned with personal gain, leads directly to Moksha.",
      },
      {
        textContext: "Guru Granth Sahib",
        quoteSanskrit: "ਵਿਚਿ ਦੁਨੀਆ ਸੇਵ ਕਮਾਈਐ ॥ ਤਾ ਦਰਗਹ ਬੈਸਣੁ ਪਾਈਐ ॥",
        quoteTranslation:
          "In the midst of this world, do Seva (selfless service), and you shall be given a place of honor in the Court of the Lord.",
        explanation:
          "Guru Nanak emphasizes that spiritual dignity is not achieved by fleeing to a cave, but by serving one's fellow beings directly in the mud of the world.",
      },
    ],
    relatedWords: ["karma", "guru", "yoga", "dharma"],
    faqs: [
      {
        question: "Is doing a good deed the same as Seva?",
        answer:
          "Not exactly. If you do a good deed and expect a 'thank you,' recognition, or good karma in return, it is a good deed, but it is not Seva. True Seva has zero expectation.",
      },
      {
        question: "How does Seva lead to spiritual growth?",
        answer:
          "The greatest obstacle to enlightenment is the ego ('I' and 'mine'). By serving others selflessly, you train the mind to see God in everyone, dissolving the ego.",
      },
      {
        question: "Is Seva only for monks or ascetics?",
        answer:
          "No, Seva is the ideal spiritual path for householders. Raising children honestly, doing your job ethicaly, and volunteering your time are all high forms of Seva.",
      },
    ],
    summary:
      "Seva is the profound spiritual practice of entirely selfless service, performed with great love and devotion, to chip away at the ego and see the Divine in all beings.",
  },
  {
    slug: "dharana",
    wordEnglish: "Dharana",
    wordDevanagari: "धारणा",
    transliteration: "dhāraṇā",
    pronunciation: "dhah-ruh-nah",
    etymology: {
      root: "dhṛ (धृ)",
      rootMeaning: "to hold, maintain, or keep",
      formationExplanation:
        'It translates to "holding," "concentration," or "fixing the mind." It is the act of binding the mind to a single point.',
    },
    primaryMeanings: [
      "Unwavering concentration",
      "Fixing the mind on a single object or point",
      "The sixth limb of Patanjali's Ashtanga Yoga",
    ],
    philosophicalContexts: [
      {
        tradition: "Yoga Sutras of Patanjali",
        meaning:
          "The prerequisite for meditation (Dhyana). Dharana is the effort required to stop the mind from wandering and hold it on one locus—like a flame, a mantra, or a deity.",
      },
      {
        tradition: "Tantra / Kashmir Shaivism",
        meaning:
          "Texts like the Vijnana Bhairava Tantra offer exactly 112 'Dharanas'—intense concentration techniques on everyday experiences to induce sudden awakening.",
      },
    ],
    usageExamples: [
      {
        textContext: "Yoga Sutras 3.1",
        quoteSanskrit: "देशबन्धश्चित्तस्य धारणा",
        quoteTranslation:
          "Dharana is the binding of the mind to one place, object, or idea.",
        explanation:
          "Patanjali's precise definition. It is the active, forceful stage of concentration. When Dharana becomes effortless and continuous, it turns into Dhyana (Meditation).",
      },
      {
        textContext: "Bhagavad Gita 6.25",
        quoteSanskrit: "शनैः शनैरुपरमेद्बुद्ध्या धृतिगृहीतया । आत्मसंस्थं मनः कृत्वा न किञ्चिदपि चिन्तयेत् ॥",
        quoteTranslation:
          "Gradually, step by step, one should become situated in trance by means of intelligence sustained by full conviction (Dharana). Fixing the mind on the Self alone, one should think of nothing else.",
        explanation:
          "Krishna explains the practical, step-by-step psychological effort required to pull the mind back from the senses and fix it entirely upon the soul.",
      },
    ],
    relatedWords: ["yoga", "samadhi", "chakra", "mantra"],
    faqs: [
      {
        question: "What is the difference between Dharana and Dhyana (Meditation)?",
        answer:
          "Dharana is the 'effort' to concentrate. It is like an intermittent flow of water drops. When that concentration becomes a smooth, effortless, unbroken stream (like pouring oil), it becomes Dhyana.",
      },
      {
        question: "What should I concentrate on during Dharana?",
        answer:
          "Anything that elevates you. Traditional focal points include a point between the eyebrows (Ajna chakra), the heart center, a flame, a deity's image, or simply the breath.",
      },
      {
        question: "Why is the mind so hard to concentrate?",
        answer:
          "Because of 'Vasanas' (latent impressions and desires). The mind naturally runs outward toward pleasure. Dharana is the mental muscle training to pull it inward.",
      },
    ],
    summary:
      "Dharana is the rigorous yogic practice of focusing and binding the mind to a single object or point, forming the essential bridge to true meditation.",
  },
  {
    slug: "prajna",
    wordEnglish: "Prajna",
    wordDevanagari: "प्रज्ञा",
    transliteration: "prajñā",
    pronunciation: "pruhg-nyah",
    etymology: {
      root: "pra (प्र) + jñā (ज्ञा)",
      rootMeaning: "forth/supreme + to know",
      formationExplanation:
        'It translates to "supreme knowledge," "intuition," or "wisdom." It goes far beyond intellectual data to mean direct, experiential spiritual insight.',
    },
    primaryMeanings: [
      "Supreme wisdom or insight",
      "Direct realization of truth",
      "The highest state of consciousness",
      "In Buddhism, the wisdom realizing emptiness (Sunyata)",
    ],
    philosophicalContexts: [
      {
        tradition: "Advaita Vedanta",
        meaning:
          "Prajnanam Brahma (Consciousness is Brahman) is one of the four Mahavakyas. Prajna here signifies the pure, unfiltered awareness that is the source of reality.",
      },
      {
        tradition: "Buddhism (Mahayana)",
        meaning:
          "Prajnaparamita (The Perfection of Wisdom) is the central concept. It is the direct, non-conceptual realization of Emptiness (Anatta/Sunyata), cutting through all illusions.",
      },
      {
        tradition: "Yoga Sutras",
        meaning:
          "Ritambhara Prajna: The ultimate truth-bearing wisdom that dawns in advanced Samadhi, instantly erasing all false perceptions.",
      },
    ],
    usageExamples: [
      {
        textContext: "Aitareya Upanishad 3.1.3",
        quoteSanskrit: "प्रज्ञानं ब्रह्म",
        quoteTranslation: "Consciousness (Prajna) is Brahman.",
        explanation:
          "One of the pinnacle 'Grand Pronouncements' of the Upanishads. It unequivocally states that the fundamental fabric of the universe is not matter, but raw, knowing awareness.",
      },
      {
        textContext: "Heart Sutra (Buddhism)",
        quoteSanskrit: "प्रज्ञापारमिता",
        quoteTranslation: "The Perfection of Wisdom",
        explanation:
          "The Prajnaparamita literature argues that true wisdom is not 'knowing' everything, but directly experiencing the profound emptiness and interconnectedness of all phenomena.",
      },
    ],
    relatedWords: ["brahman", "samadhi", "moksha", "guru"],
    faqs: [
      {
        question: "How is Prajna different from regular knowledge (Jnana)?",
        answer:
          "Jnana often refers to knowledge acquired through intellect, study, and reason. Prajna is spontaneous, intuitive, and experiential 'Flash' of divine reality that bypasses the linear mind entirely.",
      },
      {
        question: "Can I read a book to get Prajna?",
        answer:
          "No. Books give you information. Prajna only arises through deep meditation (Dhyana/Samadhi) when the chatter of the intellect is completely silenced.",
      },
      {
        question: "What does it mean that 'Prajna cuts through illusion'?",
        answer:
          "Like a sharp sword (often held by the Bodhisattva Manjushri), this supreme wisdom instantly destroys the false ego-identity and the illusion of separateness.",
      },
    ],
    summary:
      "Prajna is the supreme, spontaneous, and direct experiential wisdom of eternal truth that transcends the limitations of the intellectual mind.",
  },
  {
    slug: "lila",
    wordEnglish: "Lila",
    wordDevanagari: "लीला",
    transliteration: "līlā",
    pronunciation: "lee-lah",
    etymology: {
      root: "lī (ली) + la (ल)",
      rootMeaning: "to play, sport, or amuse",
      formationExplanation:
        'It translates to "divine play" or "sport." It conceptually describes the universe as the grand, spontaneous, and joyous game of the Divine.',
    },
    primaryMeanings: [
      "Divine play or sport",
      "The spontaneous creation of the universe",
      "The activities of an Avatar (like Krishna)",
      "Existence as a cosmic drama",
    ],
    philosophicalContexts: [
      {
        tradition: "Vaishnavism / Bhakti",
        meaning:
          "The universe is not a serious, burdensome machine, nor an 'illusion' to be escaped, but the joyous, loving play of Lord Vishnu or Krishna. His earthly activities are his 'Lilas'.",
      },
      {
        tradition: "Kashmir Shaivism",
        meaning:
          "Shiva manifests the universe out of pure, unconstrained joy (Ananda) and free will (Swatantrya). He is playing hide-and-seek with himself, hiding as you and me.",
      },
      {
        tradition: "Advaita Vedanta",
        meaning:
          "While emphasizing Maya (illusion), Lila provides the 'why'. Why did Brahman project Maya? Not out of need or karma, but out of sheer spontaneous sport (Lila).",
      },
    ],
    usageExamples: [
      {
        textContext: "Brahma Sutras 2.1.33",
        quoteSanskrit: "लोकवत्तु लीलाकैवल्यम्",
        quoteTranslation:
          "But (Brahman's creative activity) is mere sport (Lila), such as is seen in the world.",
        explanation:
          "Vyasa answers the greatest philosophical question: 'Why did a perfect God create an imperfect universe?' The answer: A king who has everything plays a game not because he needs anything, but out of the joy of play.",
      },
      {
        textContext: "Bhagavata Purana",
        quoteSanskrit: "रास लीला (Rasa Lila)",
        quoteTranslation: "The Dance of Divine Love",
        explanation:
          "The highest expression of Lila in Hinduism: Krishna dancing with the Gopis in the forest. It symbolizes the eternal, ecstatic romance between the Supreme Lord and the individual souls.",
      },
    ],
    relatedWords: ["maya", "brahman", "moksha", "guru"],
    faqs: [
      {
        question: "If life is just God's 'play', why is there so much suffering?",
        answer:
          "In a drama or a video game, conflict, difficulty, and 'villains' make the game engaging. Suffering occurs because we forget we are actors playing a role, and we take our finite ego-character too seriously.",
      },
      {
        question: "How does viewing the world as Lila change your perspective?",
        answer:
          "It shifts life from a grueling 'test' you must pass to an ecstatic dance to be enjoyed. You still perform your duties, but with a lightness of heart, knowing the outcome belongs to the Divine Game-Maker.",
      },
      {
        question: "What is the difference between Maya and Lila?",
        answer:
          "Maya is the mechanical illusion (the stage, the props, the costumes). Lila is the motivation (the joyous script being acted out by God). Maya bounds you; recognizing Lila frees you.",
      },
    ],
    summary:
      "Lila represents the joyous, spontaneous, and dramatic play of the Divine, offering a beautiful perspective that views the creation of the universe as an act of ecstatic cosmic sport rather than necessity.",
  },
];

export function getSanskritWordBySlug(slug: string): SanskritWord | undefined {
  return sanskritVocab.find((w) => w.slug === slug);
}
