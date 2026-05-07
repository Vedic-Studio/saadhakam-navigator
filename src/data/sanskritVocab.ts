import { newSanskritVocab } from "./sanskritVocabBatch";

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
  seoTitle?: string;
  seoDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
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
    seoTitle:
      "Karma in Sanskrit: 3 Types (Sanchita, Prarabdha, Agami)",
    seoDescription:
      "Karma is not punishment but the precise law of action: Sanchita (accumulated), Prarabdha (ripening), Agami (new). Gita 2.47, Upanishad sources.",
    ogTitle: "Karma in Sanskrit: 3 Types of Action (and What 'Burns' Them)",
    ogDescription:
      "Brihadaranyaka 4.4.5 to Bhagavad Gita 2.47: how karma works, why three types matter, and how Jnana erases all of it. Lexicon-style breakdown.",
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
    seoTitle:
      "Moksha in Sanskrit: 4 Classical Paths to Liberation",
    seoDescription:
      "Moksha (मोक्ष) is liberation while living, not after death. Compare Advaita's Jnana, Dvaita's Bhakti, Patanjali's Yoga, and Tantra. Sourced from Upanishads.",
    ogTitle: "Moksha: Liberation While You Live, Not After Death",
    ogDescription:
      "Svetasvatara Upanishad 6.15 to Gita 18.66: the four classical paths to Moksha and what 'Jivanmukti' means. Lexicon-style breakdown with primary sources.",
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
        quoteSanskrit:
          "श्रुतिविप्रतिपन्ना ते यदा स्थास्यति निश्चला । समाधावचला बुद्धिस्तदा योगमवाप्स्यसि ॥",
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
        quoteSanskrit:
          "मनःप्रसादः सौम्यत्वं मौनमात्मविनिग्रहः । भावसंशुद्धिरित्येतत्तपो मानसमुच्यते ॥",
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
        quoteSanskrit:
          "गुरुर्ब्रह्मा गुरुर्विष्णुर्गुरुर्देवो महेश्वरः । गुरुः साक्षात् परब्रह्म तस्मै श्रीगुरवे नमः ॥",
        quoteTranslation:
          "The Guru is Brahma, the Guru is Vishnu, the Guru is Maheshvara (Shiva). The Guru is verily the Supreme Absolute (Parabrahman); to that revered Guru, my salutations.",
        explanation:
          "This famous shloka elevates the true spiritual master from a mere human teacher to the physical manifestation of the entire divine trinity and absolute reality.",
      },
      {
        textContext: "Bhagavad Gita 4.34",
        quoteSanskrit:
          "तद्विद्धि प्रणिपातेन परिप्रश्नेन सेवया । उपदेक्ष्यन्ति ते ज्ञानं ज्ञानिनस्तत्त्वदर्शिनः ॥",
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
        quoteSanskrit:
          "ओमित्येतदक्शरमिदँ सर्वं तस्योपव्याख्यानं भूतं भवद्भविश्यदिति सर्वमोङ्कार एव",
        quoteTranslation:
          "Om—this syllable is this whole world. The past, the present, and the future—everything is just the syllable Om.",
        explanation:
          "This posits 'Om' as the supreme, all-encompassing root mantra out of which all other mantras and the entire universe arise.",
      },
      {
        textContext: "Rig Veda 3.62.10 (Gayatri Mantra)",
        quoteSanskrit:
          "तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्",
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
        quoteSanskrit:
          "तस्मादसक्तः सततं कार्यं कर्म समाचर । असक्तो ह्याचरन्कर्म परमाप्नोति पूरुषः ॥",
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
        quoteSanskrit:
          "शनैः शनैरुपरमेद्बुद्ध्या धृतिगृहीतया । आत्मसंस्थं मनः कृत्वा न किञ्चिदपि चिन्तयेत् ॥",
        quoteTranslation:
          "Gradually, step by step, one should become situated in trance by means of intelligence sustained by full conviction (Dharana). Fixing the mind on the Self alone, one should think of nothing else.",
        explanation:
          "Krishna explains the practical, step-by-step psychological effort required to pull the mind back from the senses and fix it entirely upon the soul.",
      },
    ],
    relatedWords: ["yoga", "samadhi", "chakra", "mantra"],
    faqs: [
      {
        question:
          "What is the difference between Dharana and Dhyana (Meditation)?",
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
        question:
          "If life is just God's 'play', why is there so much suffering?",
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
  {
    slug: "bhakti",
    wordEnglish: "Bhakti",
    wordDevanagari: "भक्ति",
    transliteration: "bhakti",
    pronunciation: "bhuk-tee",
    etymology: {
      root: "bhaj (भज्)",
      rootMeaning: "to share, divide, belong to, or serve",
      formationExplanation:
        "Bhakti implies a relationship of sharing or belonging—it is the participation of the individual soul in the life of the Divine.",
    },
    primaryMeanings: [
      "Devotion or love for God",
      "Attachment or participation",
      "Spiritual service (Seva)",
      "Pious devotion as a means of liberation",
    ],
    philosophicalContexts: [
      {
        tradition: "Bhagavad Gita",
        meaning:
          "Presented as the easiest and most direct path to the Divine, accessible to all regardless of caste or knowledge, characterized by total surrender.",
      },
      {
        tradition: "Narada Bhakti Sutras",
        meaning:
          "Defined as 'Parama-prema-rupa'—the nature of supreme love for God, which is its own reward and leads to immortality.",
      },
      {
        tradition: "Srimad Bhagavatam",
        meaning:
          "Identifies nine forms of Bhakti (Navavidha Bhakti), ranging from hearing about the Lord (Shravanam) to total self-offering (Atmanivedanam).",
      },
    ],
    usageExamples: [
      {
        textContext: "Bhagavad Gita 9.26",
        quoteSanskrit: "पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति",
        quoteTranslation:
          "Whosoever offers Me with devotion a leaf, a flower, a fruit, or even water—that I accept, offered with love by the pure-hearted.",
        explanation:
          "Krishna emphasizes that the external value of an offering is irrelevant; it is the Bhakti (devotional intent) that sanctifies the gift.",
      },
      {
        textContext: "Narada Bhakti Sutra 2",
        quoteSanskrit: "सा त्वस्मिन् परमप्रेमरूपा",
        quoteTranslation:
          "That (Bhakti) is of the nature of supreme love for That (God).",
        explanation:
          "The quintessential definition of Bhakti as not just ritual worship, but an all-consuming, transcendent love.",
      },
    ],
    relatedWords: ["yoga", "seva", "mantra", "avatara"],
    faqs: [
      {
        question: "Is Bhakti just about emotions?",
        answer:
          "No. While it involves the heart, true Bhakti includes 'Para-Bhakti' (highest devotion) which is inseparable from Jñāna (knowledge of the Divine nature).",
      },
      {
        question: "What are the nine types of Bhakti?",
        answer:
          "Hearing, Chanting, Remembering, Serving the feet, Worshiping, Praying, Servant-mood, Friendship, and Self-surrender.",
      },
      {
        question: "How is Bhakti Yoga different from Jnana Yoga?",
        answer:
          "Bhakti Yoga uses the power of love and personal relationship with a deity, while Jnana Yoga uses discrimination and self-inquiry. Ultimately, both lead to the same destination.",
      },
    ],
    summary:
      "Bhakti is the path of supreme love and devotion to the Divine, serving as a powerful and accessible means to achieve spiritual liberation and union.",
  },
  {
    slug: "jnana",
    wordEnglish: "Jnana",
    wordDevanagari: "ज्ञान",
    transliteration: "jñāna",
    pronunciation: "gyah-nah",
    etymology: {
      root: "jñā (ज्ञा)",
      rootMeaning: "to know, understand, or experience",
      formationExplanation:
        "In a spiritual context, Jñāna is not intellectual information, but a direct, experiential realization of the ultimate truth.",
    },
    primaryMeanings: [
      "Transcendental knowledge",
      "Spiritual wisdom",
      "Realization of the Self (Atman)",
      "Discrimination between the real and unreal",
    ],
    philosophicalContexts: [
      {
        tradition: "Advaita Vedanta",
        meaning:
          "Direct realization that the individual soul (Atman) is identical to the universal reality (Brahman). This knowledge is what 'burns' away karma.",
      },
      {
        tradition: "Bhagavad Gita",
        meaning:
          "Characterized as the 'sacred fire' that purifies all actions and leads to the highest peace.",
      },
    ],
    usageExamples: [
      {
        textContext: "Bhagavad Gita 4.38",
        quoteSanskrit: "न हि ज्ञानेन सदृशं पवित्रमिह विद्यते",
        quoteTranslation:
          "In this world, there is nothing as purifying as knowledge.",
        explanation:
          "This famous verse asserts that while ritual and action are useful, only the dawn of spiritual wisdom truly cleanses the soul of its core ignorance.",
      },
      {
        textContext: "Upanishad",
        quoteSanskrit: "ऋते ज्ञानान्न मुक्तिः",
        quoteTranslation: "Without knowledge, there is no liberation.",
        explanation:
          "A foundational philosophical axiom stating that since bondage is caused by ignorance (Avidya), only its opposite—Jnana—can bring freedom.",
      },
    ],
    relatedWords: ["viveka", "brahman", "atman", "avidya"],
    faqs: [
      {
        question: "Is Jnana the same as worldly knowledge?",
        answer:
          "No. Worldly knowledge (Apara-Vidya) is information about objects. Jñāna (Para-Vidya) is the subjective experience of the Knower and the Ground of all existence.",
      },
      {
        question: "Can Jnana be attained through books?",
        answer:
          "Books and scriptures (Shastras) point the way, but Jñāna must be matured through contemplation (Manana) and deep meditation (Nididhyasana) until it becomes a living experience.",
      },
    ],
    summary:
      "Jnana is the supreme spiritual wisdom and direct realization of the ultimate truth that frees the soul from the cycle of birth and death.",
  },
  {
    slug: "sadhana",
    wordEnglish: "Sadhana",
    wordDevanagari: "साधना",
    transliteration: "sādhanā",
    pronunciation: "sah-dhu-nah",
    etymology: {
      root: "sādh (साध्)",
      rootMeaning: "to be completed, to succeed, or to go straight to a goal",
      formationExplanation:
        "Sādhana is the disciplined practice that 'leads to the goal' of Self-realization or God-realization.",
    },
    primaryMeanings: [
      "Spiritual discipline or practice",
      "A means of achieving something",
      "Dedicated pursuit of a spiritual goal",
      "A systematic religious practice",
    ],
    philosophicalContexts: [
      {
        tradition: "Yoga",
        meaning:
          "The systematic application of the eight limbs to refine the mind and body for Samadhi.",
      },
      {
        tradition: "Tantra",
        meaning:
          "The use of ritual, mantra, and visualization to transform the practitioner's consciousness into the Divine consciousness.",
      },
    ],
    usageExamples: [
      {
        textContext: "Modern Spiritual Wisdom",
        quoteSanskrit: "साधनात् साध्यं लभ्यते",
        quoteTranslation: "Through practice, the goal is attained.",
        explanation:
          "A simple but profound principle: spirituality is not theoretical; it requires consistent, daily application to bear fruit.",
      },
    ],
    relatedWords: ["tapas", "yoga", "bhakti", "seva"],
    faqs: [
      {
        question: "What is a Daily Sadhana?",
        answer:
          "A daily routine consisting of practices like meditation, prayer, mantra chanting, or scriptural study, usually performed early in the morning (Brahma Muhurta).",
      },
      {
        question: "What is the difference between a practitioner and a Sadhu?",
        answer:
          "A 'Sadhaka' is one who is actively practicing; a 'Sadhu' is one who has matured in that practice and often dedicated their whole life to it.",
      },
    ],
    summary:
      "Sadhana is the essential, disciplined spiritual practice that bridges the gap between theoretical knowledge and direct experience of the Divine.",
  },
  {
    slug: "shanti",
    wordEnglish: "Shanti",
    wordDevanagari: "शान्ति",
    transliteration: "śānti",
    pronunciation: "shahn-tee",
    etymology: {
      root: "śam (शम्)",
      rootMeaning: "to be calm, quiet, or extinguished",
      formationExplanation:
        "Shanti is the state of tranquility that arises when the 'fires' of passion, frustration, and dualistic thought are stilled.",
    },
    primaryMeanings: [
      "Peace or tranquility",
      "Absence of mental disturbance",
      "Bliss of the Self",
      "A formal prayer for peace",
    ],
    philosophicalContexts: [
      {
        tradition: "Upanishadic Mantras",
        meaning:
          "Often repeated three times ('Shanti, Shanti, Shanti') to invoke peace in the three realms: the physical (Adhibhautika), the subtle/mental (Adhidaivika), and the spiritual (Adhyatmika).",
      },
    ],
    usageExamples: [
      {
        textContext: "Bhagavad Gita 2.70",
        quoteSanskrit: "स शान्तिमाप्नोति न कामकामी",
        quoteTranslation: "He attains peace, not he who desires desires.",
        explanation:
          "Krishna explains that peace is not found by fulfilling cravings, but by allowing desires to enter the mind without disturbing its depth—like rivers entering the ocean.",
      },
    ],
    relatedWords: ["samadhi", "yoga", "atman"],
    faqs: [
      {
        question: "Why is 'Shanti' repeated three times?",
        answer:
          "To mitigate disturbances from three sources: natural disasters/others, supernatural/mental forces, and one's own internal struggles.",
      },
      {
        question: "Is Shanti just the absence of noise?",
        answer:
          "No. Shanti is a positive state of spiritual fullness. It is the peace that 'surpasses understanding,' rooted in the realization of the eternal Self.",
      },
    ],
    summary:
      "Shanti is the profound, spiritual peace and tranquility that represents the natural state of the soul when free from worldly agitation.",
  },
  {
    slug: "om",
    wordEnglish: "Om / Aum",
    wordDevanagari: "ॐ",
    transliteration: "oṃ",
    pronunciation: "ohm",
    etymology: {
      root: "Derived from 'av' (अव्)",
      rootMeaning: "to protect, sustain, or favor",
      formationExplanation:
        "Om is the syllable that contains all other sounds, representing the totality of the universe and the Divine.",
    },
    primaryMeanings: [
      "The primordial sound (Pranava)",
      "The symbol of Brahman",
      "The vibration of the universe",
      "The beginning and end of all prayers",
    ],
    philosophicalContexts: [
      {
        tradition: "Mandukya Upanishad",
        meaning:
          "The most detailed analysis of Om, equating its three sounds (A-U-M) with the three states of consciousness (Waking, Dreaming, Deep Sleep) and the silence (Turiya) beyond.",
      },
      {
        tradition: "Yoga Sutras",
        meaning:
          "Patanjali identifies Om as the designator (Vachaka) of Ishvara (God). Chanting it with focus leads to the removal of obstacles and the realization of consciousness.",
      },
    ],
    usageExamples: [
      {
        textContext: "Mandukya Upanishad 1",
        quoteSanskrit: "ओमित्येतदक्षरमिदं सर्वं",
        quoteTranslation: "All this is the syllable Om.",
        explanation:
          "The Upanishad opens with the bold claim that the entire cosmos—past, present, and future—is nothing but a transformation of the primordial vibration represented by Om.",
      },
    ],
    relatedWords: ["mantra", "brahman", "samadhi", "prana"],
    faqs: [
      {
        question: "What do the letters A, U, and M represent?",
        answer:
          "A represents the waking state and creation; U represents the dreaming state and preservation; M represents deep sleep and dissolution.",
      },
      {
        question: "Is Om a religious symbol?",
        answer:
          "While central to Hinduism, Buddhism, and Jainism, Om is considered a universal phonetic signature of the cosmos, making its vibration accessible to all seekers.",
      },
    ],
    summary:
      "Om is the sacred primordial vibration of the universe, representing the absolute reality and the interconnectedness of all existence.",
  },
  {
    slug: "guna",
    wordEnglish: "Guna",
    wordDevanagari: "गुण",
    transliteration: "guṇa",
    pronunciation: "goo-nah",
    etymology: {
      root: "guṇa (गुण)",
      rootMeaning: "string, thread, or quality",
      formationExplanation:
        "Gunas are the 'threads' that weave the fabric of the material world (Prakriti).",
    },
    primaryMeanings: [
      "Qualities of nature",
      "Attributes of the mind and body",
      "Virtue or merit",
      "Secondary or subordinate element",
    ],
    philosophicalContexts: [
      {
        tradition: "Samkhya & Yoga",
        meaning:
          "The three fundamental forces of nature: Sattva (purity/light), Rajas (activity/passion), and Tamas (inertia/darkness). Everything in the material world is a mix of these three.",
      },
      {
        tradition: "Bhagavad Gita",
        meaning:
          "Explains how the Gunas bind the soul to the body and how spiritual evolution involves moving from Tamas to Rajas, then to Sattva, and finally becoming 'Gunatita' (transcending all three).",
      },
    ],
    usageExamples: [
      {
        textContext: "Bhagavad Gita 14.5",
        quoteSanskrit: "सत्त्वं रजस्तम इति गुणाः प्रकृतिसम्भवाः",
        quoteTranslation:
          "Sattva, Rajas, and Tamas—these gunas, born of Prakriti, bind the soul.",
        explanation:
          "Krishna identifies the components of the world that distract the soul from its true, infinite nature and tie it to the finite identity of the body.",
      },
    ],
    relatedWords: ["maya", "karma", "samsara"],
    faqs: [
      {
        question: "What are the characteristics of the three Gunas?",
        answer:
          "Sattva is clarity and calm; Rajas is ambition and restlessness; Tamas is laziness and confusion.",
      },
      {
        question: "Can we live without the Gunas?",
        answer:
          "Not while having a body and mind. However, we can choose to cultivate Sattva to make the mind a mirror for the soul, and ultimately realize our identity as the witness (Purusha) who is beyond the Gunas.",
      },
    ],
    summary:
      "Gunas are the three fundamental qualities or forces (Sattva, Rajas, Tamas) that govern the nature of the mind and the physical universe.",
  },
  {
    slug: "vairagya",
    wordEnglish: "Vairagya",
    wordDevanagari: "वैराग्य",
    transliteration: "vairāgya",
    pronunciation: "vie-rah-gyah",
    etymology: {
      root: "vi + rañj (रञ्ज्)",
      rootMeaning: "without + color or passion",
      formationExplanation:
        "It literally means the fading of the 'coloring' of the mind by worldly attractions and repulsions.",
    },
    primaryMeanings: [
      "Dispassion or non-attachment",
      "Freedom from worldly desires",
      "Objectivity toward life's ups and downs",
      "Spiritual renunciation",
    ],
    philosophicalContexts: [
      {
        tradition: "Yoga Sutras",
        meaning:
          "One of the two pillars of spiritual growth (along with Abhyasa/Practice). It is the mastery of the mind that no longer thirsts for seen or unseen objects.",
      },
      {
        tradition: "Vedanta",
        meaning:
          "One of the four requirements for a seeker (Sadhana Chatushtaya), helping to turn the attention inward away from the temporary world.",
      },
    ],
    usageExamples: [
      {
        textContext: "Bhagavad Gita 6.35",
        quoteSanskrit: "अभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते",
        quoteTranslation:
          "By practice (Abhyasa) and dispassion (Vairagya), the mind is controlled.",
        explanation:
          "Krishna admits to Arjuna that the mind is difficult to tame, but these two 'wings'—consistent effort and non-attachment—make it possible.",
      },
    ],
    relatedWords: ["viveka", "sadhana", "yoga", "moksha"],
    faqs: [
      {
        question: "Does Vairagya mean I have to leave my family?",
        answer:
          "No. True Vairagya is internal. It is not about leaving the world, but about 'leaving the worldliness'—the dependency on external things for your inner happiness.",
      },
      {
        question: "Is Vairagya the same as indifference?",
        answer:
          "No. Indifference is cold and often based on aversion. Vairagya is based on wisdom—knowing that objects are temporary and don't define your true Self.",
      },
    ],
    summary:
      "Vairagya is the spiritual quality of dispassion and internal non-attachment, allowing for clear discernment and steady focus on the eternal.",
  },
  {
    slug: "viveka",
    wordEnglish: "Viveka",
    wordDevanagari: "विवेक",
    transliteration: "viveka",
    pronunciation: "vi-vay-kah",
    etymology: {
      root: "vi + vic (विच्)",
      rootMeaning: "to separate, distinguish, or sift",
      formationExplanation:
        "Viveka is the keen intellectual and intuitive ability to separate the essential from the non-essential.",
    },
    primaryMeanings: [
      "Discrimination or discernment",
      "Right judgment",
      "Separating the Real from the Unreal",
      "Distinguishing between Atman and non-Atman",
    ],
    philosophicalContexts: [
      {
        tradition: "Vedanta",
        meaning:
          "The first of the four qualifications (Sadhana Chatushtaya). It specifically refers to 'Nitya-Anitya-Vastu-Viveka'—the discernment between the Eternal and the Temporary.",
      },
    ],
    usageExamples: [
      {
        textContext: "Vivekachudamani",
        quoteSanskrit: "विवेकः कस्य वा न स्यात्",
        quoteTranslation: "Who indeed does not need discrimination?",
        explanation:
          "Adi Shankaracharya's famous text, the 'Crest-Jewel of Discrimination,' begins with the premise that Viveka is the master key to spiritual evolution.",
      },
    ],
    relatedWords: ["vairagya", "jnana", "brahman"],
    faqs: [
      {
        question: "How do I practice Viveka in daily life?",
        answer:
          "By frequently asking, 'Is this feeling/object/situation permanent or temporary? Does it belong to my true Self or to the changing world of Maya?'",
      },
      {
        question: "How are Viveka and Vairagya related?",
        answer:
          "Viveka is the 'seeing' (discernment) and Vairagya is the 'doing' (non-attachment). You first see that something is temporary (Viveka), then you naturally stop leaning on it for permanent happiness (Vairagya).",
      },
    ],
    summary:
      "Viveka is the spiritual faculty of discrimination, enabling the seeker to distinguish between the eternal reality and the transient appearances of the world.",
  },
  {
    slug: "purushartha",
    wordEnglish: "Purushartha",
    wordDevanagari: "पुरुषार्थ",
    transliteration: "puruṣārtha",
    pronunciation: "poo-roo-shart-huh",
    etymology: {
      root: "purusha + artha",
      rootMeaning: "human being + purpose/aim/value",
      formationExplanation:
        "Purushartha represents the integrated set of goals that make for a complete and fulfilling human life.",
    },
    primaryMeanings: [
      "The four goals of human life",
      "Purpose of existence",
      "Human endeavor",
      "Value system for a balanced life",
    ],
    philosophicalContexts: [
      {
        tradition: "Vedic Ethics",
        meaning:
          "The framework for a balanced life: Dharma (righteousness), Artha (prosperity), Kama (pleasure), and Moksha (liberation). Spiritual growth involves pursuing the first three in a way that leads to the fourth.",
      },
    ],
    usageExamples: [
      {
        textContext: "Classical Wisdom",
        quoteSanskrit: "धर्मार्थकाममोक्षाणां",
        quoteTranslation:
          "Righteousness, prosperity, pleasure, and liberation.",
        explanation:
          "The traditional listing of the four aims, showing that Hinduism does not reject material wealth or pleasure, but places them within a larger spiritual context.",
      },
    ],
    relatedWords: ["dharma", "moksha", "karma"],
    faqs: [
      {
        question: "Are all four Purusharthas equally important?",
        answer:
          "Dharma is the foundation; Artha and Kama must be pursued according to Dharma. Moksha is considered the 'Parama-Purushartha'—the supreme goal.",
      },
      {
        question: "Can I skip the first three and go straight to Moksha?",
        answer:
          "Some do (renunciates/Sanyasis), but for most, the first three provide the 'field' for maturing one's desires and responsibilities until the heart is ready for absolute freedom.",
      },
    ],
    summary:
      "Purushartha is the comprehensive Vedic framework for a balanced life, harmonizing material needs, emotional desires, and ethical duties with the ultimate goal of spiritual liberation.",
  },
  {
    slug: "avatara",
    wordEnglish: "Avatara",
    wordDevanagari: "अवतार",
    transliteration: "avatāra",
    pronunciation: "uh-vuh-tah-rah",
    etymology: {
      root: "ava + tṛ (तृ)",
      rootMeaning: "down + to cross or pass",
      formationExplanation:
        "An Avatāra is a 'descent' of the Divine into the physical world to restore order and guide humanity.",
    },
    primaryMeanings: [
      "Divine incarnation",
      "Descent of God into human form",
      "Manifestation of the Absolute in a finite form",
      "Restoration of Dharma",
    ],
    philosophicalContexts: [
      {
        tradition: "Bhagavad Gita",
        meaning:
          "Krishna explains that the Unborn takes on a birth through His own power (Maya) whenever righteousness declines.",
      },
      {
        tradition: "Vaishnavism",
        meaning:
          "Primarily focused on the Dashavatara (ten incarnations) of Vishnu, each responding to a specific cosmic crisis.",
      },
    ],
    usageExamples: [
      {
        textContext: "Bhagavad Gita 4.8",
        quoteSanskrit: "परित्राणाय साधूनां विनाशाय च दुष्कृताम्",
        quoteTranslation:
          "For the protection of the good and the destruction of the wicked... I am born age after age.",
        explanation:
          "The clear statement of the purpose of an Avatāra: to protect those on the path of Dharma and restore the moral pivot of the world.",
      },
    ],
    relatedWords: ["dharma", "bhakti", "lila"],
    faqs: [
      {
        question: "Is an Avatāra a normal person who became God?",
        answer:
          "No. According to tradition, an Avatāra is the Supreme Divine who voluntarily limits Himself to a form, while remaining fully conscious of His infinite nature.",
      },
      {
        question: "What is the difference between a Guru and an Avatāra?",
        answer:
          "A Guru is one who has realized God; an Avatāra is Ged who has descended to teach the world. A Guru points to the Divine; the Avatāra is the Divine manifested.",
      },
    ],
    summary:
      "Avatara is the divine 'descent' or incarnation of the Supreme Reality into the world to uphold righteousness and guide seekers toward truth.",
  },
  {
    slug: "kundalini",
    wordEnglish: "Kundalini",
    wordDevanagari: "कुण्डलिनी",
    transliteration: "kuṇḍalinī",
    pronunciation: "kun-duh-lee-nee",
    etymology: {
      root: "kuṇḍala (कुण्डल)",
      rootMeaning: "coiled, ring, or earring",
      formationExplanation:
        "Literally 'the coiled one', referring to the dormant spiritual energy lying at the base of the spine.",
    },
    primaryMeanings: [
      "Primal energy or Shakti",
      "Serpent power",
      "Dormant spiritual potential",
    ],
    philosophicalContexts: [
      {
        tradition: "Tantra & Hatha Yoga",
        meaning:
          "The evolutionary force of consciousness in the human body, which when awakened travels up the susumna nadi to unite with Shiva at the crown.",
      },
    ],
    usageExamples: [
      {
        textContext: "Hatha Yoga Pradipika",
        quoteSanskrit: "सुप्ता गुरुप्रसादेन यदा जागर्ति कुण्डली",
        quoteTranslation:
          "When the sleeping Kundalini awakens by the grace of the Guru...",
        explanation:
          "Describes the pivotal moment when the dormant potential is activated, beginning the process of profound spiritual transformation.",
      },
    ],
    relatedWords: ["chakra", "prana", "nadi"],
    faqs: [
      {
        question: "Is Kundalini dangerous?",
        answer:
          "If awakened forcefully without proper physical and mental purification, it can cause imbalances. Traditional texts strongly recommend guidance from a qualified Guru.",
      },
      {
        question: "Where does Kundalini reside?",
        answer:
          "It is said to lie dormant at the Muladhara (root) chakra at the base of the spine, coiled three and a half times.",
      },
    ],
    summary:
      "Kundalini is the dormant, primal spiritual energy resting at the base of the spine that, when awakened, leads to profound states of realization.",
  },
  {
    slug: "nadi",
    wordEnglish: "Nadi",
    wordDevanagari: "नाडी",
    transliteration: "nāḍī",
    pronunciation: "nah-dee",
    etymology: {
      root: "nāḍ (नाड्)",
      rootMeaning: "tube, pipe, or channel",
      formationExplanation:
        "Refers to the subtle energy channels through which Prana flows.",
    },
    primaryMeanings: ["Energy channel", "Subtle nerve", "Flow or current"],
    philosophicalContexts: [
      {
        tradition: "Yoga & Ayurveda",
        meaning:
          "The pathways of the subtle body (sukshma sharira) that carry life force. There are said to be 72,000 nadis, the most important being Ida, Pingala, and Sushumna.",
      },
    ],
    usageExamples: [
      {
        textContext: "Shiva Samhita",
        quoteSanskrit: "द्वासप्ततिसहस्राणि नाड्यो",
        quoteTranslation: "There are seventy-two thousand nadis...",
        explanation:
          "Highlights the immense complexity and subtlety of the human energy system.",
      },
    ],
    relatedWords: ["prana", "chakra", "kundalini"],
    faqs: [
      {
        question: "What are the three main nadis?",
        answer:
          "Ida (left/lunar/cooling), Pingala (right/solar/heating), and Sushumna (central/spiritual).",
      },
    ],
    summary:
      "Nadis are the subtle energetic channels in the body through which Prana (life force) flows.",
  },
  {
    slug: "kosha",
    wordEnglish: "Kosha",
    wordDevanagari: "कोश",
    transliteration: "kośa",
    pronunciation: "koh-shah",
    etymology: {
      root: "kuś (कुश्)",
      rootMeaning: "to enclose or cover",
      formationExplanation: "Refers to a sheath or covering.",
    },
    primaryMeanings: ["Sheath or layer", "Covering", "Treasury or receptacle"],
    philosophicalContexts: [
      {
        tradition: "Vedanta (Taittiriya Upanishad)",
        meaning:
          "The five layers that veil the pure Atman, ranging from the gross physical body to the subtle body of bliss.",
      },
    ],
    usageExamples: [
      {
        textContext: "Taittiriya Upanishad",
        quoteSanskrit: "अन्नमयो प्राणमयो मनोमयो विज्ञानमयो आनन्दमयः",
        quoteTranslation:
          "The sheaths of food, vital air, mind, intellect, and bliss.",
        explanation:
          "The classical enumeration of the Panchakosha (five sheaths) that map human existence from the most dense to most subtle.",
      },
    ],
    relatedWords: ["atman", "prana", "jnana"],
    faqs: [
      {
        question: "What are the five Koshas?",
        answer:
          "Annamaya (Food/Physical), Pranamaya (Energy/Breath), Manomaya (Mind/Emotions), Vijnanamaya (Wisdom/Intellect), and Anandamaya (Bliss).",
      },
    ],
    summary:
      "Koshas are the five concentric subtle sheaths that veil the pure consciousness of the Atman.",
  },
  {
    slug: "mudra",
    wordEnglish: "Mudra",
    wordDevanagari: "मुद्रा",
    transliteration: "mudrā",
    pronunciation: "moo-drah",
    etymology: {
      root: "mud (मुद्)",
      rootMeaning: "joy or delight",
      formationExplanation:
        "Literally 'that which gives joy', referring to gestures that seal energy and invite divine presence.",
    },
    primaryMeanings: [
      "Seal or gesture",
      "Symbolic hand position",
      "Energy lock",
    ],
    philosophicalContexts: [
      {
        tradition: "Tantra & Yoga",
        meaning:
          "Specific body or hand positions used to channel and seal the flow of Prana during meditation and rituals.",
      },
    ],
    usageExamples: [
      {
        textContext: "Gheranda Samhita",
        quoteSanskrit: "मुद्राभ्यासेन योगिनां",
        quoteTranslation: "By the practice of mudras by the yogis...",
        explanation:
          "Emphasizes the importance of mudras in advanced yogic practices for stabilizing the mind and energy.",
      },
    ],
    relatedWords: ["prana", "asana", "puja"],
    faqs: [
      {
        question: "Are mudras only done with the hands?",
        answer:
          "No. While hand mudras are most common, there are also postural mudras involving the whole body, eyes, or tongue.",
      },
    ],
    summary:
      "Mudras are symbolic gestures or energy seals, often performed with the hands, used to direct Prana and deepen meditation.",
  },
  {
    slug: "bandha",
    wordEnglish: "Bandha",
    wordDevanagari: "बन्ध",
    transliteration: "bandha",
    pronunciation: "bun-dhah",
    etymology: {
      root: "bandh (बन्ध्)",
      rootMeaning: "to bind, tie, or lock",
      formationExplanation:
        "Refers to the practice of 'locking' or binding energy within the body.",
    },
    primaryMeanings: [
      "Lock or seal",
      "Bondage or binding",
      "Muscular contraction in yoga",
    ],
    philosophicalContexts: [
      {
        tradition: "Hatha Yoga",
        meaning:
          "Specific muscular locks used to control and direct the flow of Prana and Apana, preventing energy from dissipating.",
      },
    ],
    usageExamples: [
      {
        textContext: "Hatha Yoga Pradipika",
        quoteSanskrit: "मूलबन्धो जालन्धरो उड्डीयानः",
        quoteTranslation: "Mula Bandha, Jalandhara Bandha, Uddiyana Bandha.",
        explanation:
          "The three primary locks used by yogis to awaken sleeping energy and direct it up the central channel.",
      },
    ],
    relatedWords: ["prana", "mudra", "kundalini"],
    faqs: [
      {
        question: "What are the core Bandhas?",
        answer:
          "Mula Bandha (Root Lock), Uddiyana Bandha (Abdominal Lock), and Jalandhara Bandha (Throat Lock). When done together, it is called Maha Bandha.",
      },
    ],
    summary:
      "Bandhas are specific energetic locks or muscular contractions used in Yoga to contain and direct vital life force.",
  },
  {
    slug: "asana",
    wordEnglish: "Asana",
    wordDevanagari: "आसन",
    transliteration: "āsana",
    pronunciation: "ah-suh-nuh",
    etymology: {
      root: "ās (आस्)",
      rootMeaning: "to sit or remain",
      formationExplanation: "Literally 'a seat' or 'a seated posture'.",
    },
    primaryMeanings: [
      "Posture",
      "Seat",
      "The physical practice of Yoga",
      "The third limb of Patanjali's Ashtanga Yoga",
    ],
    philosophicalContexts: [
      {
        tradition: "Yoga Sutras",
        meaning:
          "Defined simply as a 'steady and comfortable posture' meant for meditation.",
      },
    ],
    usageExamples: [
      {
        textContext: "Yoga Sutras 2.46",
        quoteSanskrit: "स्थिरसुखमासनम्",
        quoteTranslation: "Posture should be steady and comfortable.",
        explanation:
          "Patanjali's sole instruction on physical posture: it must be stable enough to sit for hours and comfortable enough to forget the body.",
      },
    ],
    relatedWords: ["yoga", "pranayama", "dharana"],
    faqs: [
      {
        question: "Are Asanas meant for exercise?",
        answer:
          "In modern times, yes. But traditionally, Asanas were primarily meant to purify the subtle body and allow one to sit pain-free in meditation for extended periods.",
      },
    ],
    summary:
      "Asana is the physical posture or seat in Yoga, designed to bring steadiness, health, and lightness to the body.",
  },
  {
    slug: "pranayama",
    wordEnglish: "Pranayama",
    wordDevanagari: "प्राणायाम",
    transliteration: "prāṇāyāma",
    pronunciation: "prah-nah-yah-mah",
    etymology: {
      root: "prāṇa (प्राण) + āyāma (आयाम)",
      rootMeaning: "life force + extension/expansion",
      formationExplanation:
        "The extension, regulation, and control of the vital life force.",
    },
    primaryMeanings: [
      "Breath control",
      "Expansion of life force",
      "The fourth limb of Ashtanga Yoga",
    ],
    philosophicalContexts: [
      {
        tradition: "Yoga Sutras",
        meaning:
          "The deliberate regulation of inhalation, exhalation, and retention. It is said to remove the veil covering the inner light.",
      },
    ],
    usageExamples: [
      {
        textContext: "Yoga Sutras 2.52",
        quoteSanskrit: "ततः क्षीयते प्रकाशावरणम्",
        quoteTranslation: "Thereby the covering of the light is destroyed.",
        explanation:
          "Patanjali explains the ultimate benefit of Pranayama: it clears the energetic impurities that obscure the mind's natural clarity.",
      },
    ],
    relatedWords: ["prana", "asana", "nadi"],
    faqs: [
      {
        question: "Is Pranayama just deep breathing?",
        answer:
          "No. While it involves breathing exercises, its goal is to control the subtle Prana, often utilizing breath retention (Kumbhaka) to awaken energy.",
      },
    ],
    summary:
      "Pranayama is the yogic science of breath control, designed to expand and regulate the vital life force energy.",
  },
  {
    slug: "ojas",
    wordEnglish: "Ojas",
    wordDevanagari: "ओजस्",
    transliteration: "ojas",
    pronunciation: "oh-juhs",
    etymology: {
      root: "vaj (वज्)",
      rootMeaning: "to be strong or vigorous",
      formationExplanation: "Refers to bodily strength, vitality, or luster.",
    },
    primaryMeanings: [
      "Vitality or vigor",
      "Immunity and strength",
      "The subtle essence of the reproductive fluid",
      "Spiritual luster",
    ],
    philosophicalContexts: [
      {
        tradition: "Ayurveda & Yoga",
        meaning:
          "The ultrafine, subtle essence of all bodily tissues. It grants immunity, physical strength, and an 'aura' of glowing health.",
      },
    ],
    usageExamples: [
      {
        textContext: "Ayurvedic Texts",
        quoteSanskrit: "ओजो वर्धयते",
        quoteTranslation: "It increases Ojas.",
        explanation:
          "Often used in Ayurveda to describe foods or practices (like meditation and celibacy) that build the deepest reserves of vital energy.",
      },
    ],
    relatedWords: ["tejas", "prana", "sadhana"],
    faqs: [
      {
        question: "Why do yogis care about Ojas?",
        answer:
          "Ojas acts as the biological foundation for spiritual endurance. Without it, the nervous system cannot handle the high energy generated by deep meditation.",
      },
    ],
    summary:
      "Ojas is the subtle essence of vitality and immunity in the body, providing the foundation for physical health and spiritual strength.",
  },
  {
    slug: "tejas",
    wordEnglish: "Tejas",
    wordDevanagari: "तेजस्",
    transliteration: "tejas",
    pronunciation: "tay-juhs",
    etymology: {
      root: "tij (तिज्)",
      rootMeaning: "to be sharp, bright, or piercing",
      formationExplanation: "Refers to the quality of radiant light or fire.",
    },
    primaryMeanings: [
      "Radiance or brilliance",
      "Inner fire",
      "Spiritual luster",
      "Sharpness of intellect",
    ],
    philosophicalContexts: [
      {
        tradition: "Ayurveda & Yoga",
        meaning:
          "The subtle essence of fire in the body. It governs cellular intelligence, digestion of food and ideas, and gives a radiant glow to the practitioner.",
      },
    ],
    usageExamples: [
      {
        textContext: "Spiritual Metaphor",
        quoteSanskrit: "तेजस्वि नावधीतमस्तु",
        quoteTranslation: "May our study be brilliant with Tejas.",
        explanation:
          "A common Upanishadic invocation praying that study generates inner brilliance and piercing clarity rather than just dull information.",
      },
    ],
    relatedWords: ["ojas", "prana", "tapas"],
    faqs: [
      {
        question: "What is the difference between Prana, Tejas, and Ojas?",
        answer:
          "Prana is the subtle vital energy, Tejas is the subtle fire (radiance/clarity), and Ojas is the subtle water/earth (vitality/immunity).",
      },
    ],
    summary:
      "Tejas is the subtle element of inner fire and radiance, bestowing clarity, brilliance, and a luminous presence.",
  },
  {
    slug: "bindu",
    wordEnglish: "Bindu",
    wordDevanagari: "बिन्दु",
    transliteration: "bindu",
    pronunciation: "bin-doo",
    etymology: {
      root: "bind (बिन्द्)",
      rootMeaning: "to split or cleave",
      formationExplanation: "Literally means a drop, point, or dot.",
    },
    primaryMeanings: [
      "Point or dot",
      "The seed of creation",
      "The focal point in a Yantra",
      "The center of consciousness",
    ],
    philosophicalContexts: [
      {
        tradition: "Tantra & Sri Vidya",
        meaning:
          "The dimensionless point from which all spatial manifestation expands. It represents the unmanifest, ultimate Shiva-Shakti union.",
      },
    ],
    usageExamples: [
      {
        textContext: "Tantric Texts",
        quoteSanskrit: "बिन्दु नाद कला",
        quoteTranslation: "The Point, the Sound, the Radiance.",
        explanation:
          "The triad of manifestation in Tantra. Bindu is the compacted seed.",
      },
    ],
    relatedWords: ["yantra", "chakra", "mantra"],
    faqs: [
      {
        question: "What does the Bindu represent on a Yantra?",
        answer:
          "The absolute center dot of a Yantra is the Bindu. It represents the source of all existence and the point where the mind must focus to transcend duality.",
      },
    ],
    summary:
      "Bindu is the infinite, dimensionless point or seed from which all creation emerges and into which it dissolves.",
  },
  {
    slug: "japa",
    wordEnglish: "Japa",
    wordDevanagari: "जप",
    transliteration: "japa",
    pronunciation: "juh-puh",
    etymology: {
      root: "jap (जप्)",
      rootMeaning: "to mutter, whisper, or repeat inwardly",
      formationExplanation:
        "The act of repeated chanting or reciting of a mantra.",
    },
    primaryMeanings: [
      "Repetition of a mantra",
      "Muttering prayers",
      "Meditative chanting",
    ],
    philosophicalContexts: [
      {
        tradition: "Bhakti & Tantra",
        meaning:
          "One of the most effective spiritual practices. It purifies the mind by constantly steering it back to the Divine sound.",
      },
    ],
    usageExamples: [
      {
        textContext: "Bhagavad Gita 10.25",
        quoteSanskrit: "यज्ञानां जपयज्ञोऽस्मि",
        quoteTranslation:
          "Of sacrifices, I am the sacrifice of Japa (silent repetition).",
        explanation:
          "Krishna elevates Japa above all elaborate external rituals, making the internal repetition of the divine name the supreme offering.",
      },
    ],
    relatedWords: ["mantra", "bhakti", "sadhana"],
    faqs: [
      {
        question: "Does Japa have to be spoken out loud?",
        answer:
          "No. Japa can be audible (Vaikhari), whispered (Upamshu), or entirely mental (Manasika). Mental Japa is considered the most powerful.",
      },
    ],
    summary:
      "Japa is the spiritual practice of repeatedly chanting or meditating upon a sacred mantra or divine name.",
  },
  {
    slug: "puja",
    wordEnglish: "Puja",
    wordDevanagari: "पूजा",
    transliteration: "pūjā",
    pronunciation: "poo-jah",
    etymology: {
      root: "pūj (पूज्)",
      rootMeaning: "to honor, worship, or revere",
      formationExplanation: "The act of showing reverence to the Divine.",
    },
    primaryMeanings: ["Worship", "Ritual offering", "Adoration and honor"],
    philosophicalContexts: [
      {
        tradition: "Agamas & Bhakti Traditions",
        meaning:
          "The loving offering of light, flowers, food, and water to a deity. It is the outer expression of inner devotion.",
      },
    ],
    usageExamples: [
      {
        textContext: "Bhakti Framework",
        quoteSanskrit: "षोडशोपचार पूजा",
        quoteTranslation: "Sixteen-fold worship.",
        explanation:
          "The traditional sequence of offering 16 types of services to a deity, mirroring how one would treat a royal guest.",
      },
    ],
    relatedWords: ["bhakti", "seva", "mantra", "arati"],
    faqs: [
      {
        question: "Do Hindus worship idols in Puja?",
        answer:
          "The 'idol' (Murti) is used as a focal point or physical receptacle for the Divine presence. The worship is directed entirely at the omnipresent God invoked within the image.",
      },
    ],
    summary:
      "Puja is the loving ritual worship and offering of reverence to a deity, guru, or divine concept.",
  },
  {
    slug: "yajna",
    wordEnglish: "Yajna",
    wordDevanagari: "यज्ञ",
    transliteration: "yajña",
    pronunciation: "yuhg-nyuh",
    etymology: {
      root: "yaj (यज्)",
      rootMeaning: "to worship, sacrifice, or offer",
      formationExplanation: "The act of offering or sacrificing.",
    },
    primaryMeanings: [
      "Fire sacrifice",
      "Ritual offering",
      "Selfless action",
      "Worship",
    ],
    philosophicalContexts: [
      {
        tradition: "Vedic Rituals",
        meaning:
          "The oldest Vedic ritual, involving offerings into the sacred fire (Agni) while chanting Vedic mantras.",
      },
      {
        tradition: "Bhagavad Gita",
        meaning:
          "Expanded from mere fire rituals to mean any selfless action performed for the greater good and offered to the Supreme.",
      },
    ],
    usageExamples: [
      {
        textContext: "Bhagavad Gita 3.9",
        quoteSanskrit: "यज्ञार्थात्कर्मणोऽन्यत्र लोकोऽयं कर्मबन्धनः",
        quoteTranslation:
          "The world is bound by action unless performed for the sake of Yajna (sacrifice).",
        explanation:
          "Action without selfish motive is the true Yajna, breaking the binding chains of karma.",
      },
    ],
    relatedWords: ["karma", "dharma", "puja"],
    faqs: [
      {
        question: "Is Yajna just a fire ritual?",
        answer:
          "Historically yes, but philosophically, any act of dedicating your resources or energy for an unselfish, higher purpose is considered Yajna.",
      },
    ],
    summary:
      "Yajna originally refers to Vedic fire sacrifices, but philosophically implies any selfless action or duty offered to the Divine.",
  },
  {
    slug: "kirtan",
    wordEnglish: "Kirtan",
    wordDevanagari: "कीर्तन",
    transliteration: "kīrtana",
    pronunciation: "keer-tun",
    etymology: {
      root: "kīrt (कीर्त्)",
      rootMeaning: "to praise, celebrate, or glorify",
      formationExplanation: "The act of praising.",
    },
    primaryMeanings: [
      "Devotional singing",
      "Congregational chanting",
      "Glorification of God's names",
    ],
    philosophicalContexts: [
      {
        tradition: "Bhakti Movement",
        meaning:
          "A dynamic, musical form of Bhakti Yoga. It involves call-and-response chanting of divine names.",
      },
    ],
    usageExamples: [
      {
        textContext: "Bhakti Literature",
        quoteSanskrit: "कलौ नास्त्येव नास्त्येव नास्त्येव गतिरन्यथा",
        quoteTranslation:
          "In the Kali Yuga, there is no other way, no other way, no other way.",
        explanation:
          "Many texts state that congregational chanting (Sankirtana) is the easiest path to liberation in the modern age.",
      },
    ],
    relatedWords: ["bhakti", "japa", "mantra"],
    faqs: [
      {
        question: "How is Kirtan different from Bhajan?",
        answer:
          "A Bhajan is usually a song sung by a solo artist to an audience, while Kirtan is specifically call-and-response, inviting everyone to sing together.",
      },
    ],
    summary:
      "Kirtan is the joyous, congregational singing and chanting of divine names, used as a primary practice in Bhakti Yoga.",
  },
  {
    slug: "dhyana",
    wordEnglish: "Dhyana",
    wordDevanagari: "ध्यान",
    transliteration: "dhyāna",
    pronunciation: "dhyah-nuh",
    etymology: {
      root: "dhyai (ध्यै)",
      rootMeaning: "to meditate, contemplate, or think of",
      formationExplanation: "The continuous flow of attention.",
    },
    primaryMeanings: [
      "Meditation",
      "Contemplation",
      "The seventh limb of Patanjali's Ashtanga Yoga",
    ],
    philosophicalContexts: [
      {
        tradition: "Yoga Sutras",
        meaning:
          "Defined as the uninterrupted, unbroken flow of concentration on an object.",
      },
    ],
    usageExamples: [
      {
        textContext: "Yoga Sutras 3.2",
        quoteSanskrit: "तत्र प्रत्ययैकतानता ध्यानम्",
        quoteTranslation:
          "An unbroken flow of knowledge in that object is Dhyana.",
        explanation:
          "Patanjali's definition of meditation: when the mind maintains continuous focus without any break.",
      },
    ],
    relatedWords: ["dharana", "samadhi", "yoga"],
    faqs: [
      {
        question: "Is Dhyana the same as concentration?",
        answer:
          "No, concentration (Dharana) is the effort to keep the mind on an object. Dhyana is the effortless, continuous flow once concentration is achieved.",
      },
    ],
    summary:
      "Dhyana is the state of deep, unbroken meditation and contemplation where the mind completely merges into its point of focus.",
  },
  {
    slug: "yantra",
    wordEnglish: "Yantra",
    wordDevanagari: "यन्त्र",
    transliteration: "yantra",
    pronunciation: "yun-truh",
    etymology: {
      root: "yam (यम्)",
      rootMeaning: "to hold, control, or sustain",
      formationExplanation:
        "An instrument for holding, controlling, and focusing energy.",
    },
    primaryMeanings: [
      "Mystical diagram",
      "Sacred geometry",
      "Instrument or machine",
      "Visual tool for meditation",
    ],
    philosophicalContexts: [
      {
        tradition: "Tantra & Agama",
        meaning:
          "The visual embodiment of a deity or mantra, composed of geometrical shapes like triangles and circles representing cosmic forces.",
      },
    ],
    usageExamples: [
      {
        textContext: "Sri Vidya",
        quoteSanskrit: "श्री चक्र (Sri Chakra/Sri Yantra)",
        quoteTranslation: "The Auspicious Wheel.",
        explanation:
          "The most famous of all yantras, representing the union of the divine masculine and feminine.",
      },
    ],
    relatedWords: ["mantra", "bindu", "tantra"],
    faqs: [
      {
        question: "What is the relationship between Mantra and Yantra?",
        answer:
          "Mantra is the sound-body of the Divine; Yantra is the visual-body. They are intrinsically connected.",
      },
    ],
    summary:
      "A Yantra is a sacred geometric diagram used as a visual tool for concentration, representing cosmic forces and deities.",
  },
  {
    slug: "sankalpa",
    wordEnglish: "Sankalpa",
    wordDevanagari: "सङ्कल्प",
    transliteration: "saṅkalpa",
    pronunciation: "sun-kul-puh",
    etymology: {
      root: "sam (सम्) + kḷp (क्लृप्)",
      rootMeaning: "completely/together + to form or resolve",
      formationExplanation: "To form a resolve or set a firm intention.",
    },
    primaryMeanings: [
      "Intention, resolve, or vow",
      "Willpower",
      "A solemn purpose",
      "Declaration of intent before a ritual",
    ],
    philosophicalContexts: [
      {
        tradition: "Yoga Nidra & Rituals",
        meaning:
          "A short, positive statement or vow repeated mentally. It acts as a seed planted deep in the subconscious.",
      },
    ],
    usageExamples: [
      {
        textContext: "Vedic Rituals",
        quoteSanskrit: "मम इष्टकामनार्थं सङ्कल्पम् अहम् करिष्ये",
        quoteTranslation:
          "For the fulfillment of my desired goal, I make this resolve.",
        explanation:
          "Every major Hindu ritual or Puja begins with a Sankalpa, stating the time, place, and purpose of the action.",
      },
    ],
    relatedWords: ["karma", "puja", "tapas"],
    faqs: [
      {
        question: "How do you make a good Sankalpa?",
        answer:
          "It should be short, positive (stating what you want, not what you don't want), in the present tense, and deeply meaningful.",
      },
    ],
    summary:
      "Sankalpa is a firm spiritual intention, vow, or resolve made to align the mind and energy toward a specific purpose.",
  },
  {
    slug: "darshan",
    wordEnglish: "Darshan",
    wordDevanagari: "दर्शन",
    transliteration: "darśana",
    pronunciation: "dur-shun",
    etymology: {
      root: "dṛś (दृश्)",
      rootMeaning: "to see or perceive",
      formationExplanation: "The act of seeing, or a perspective.",
    },
    primaryMeanings: [
      "Auspicious sight or viewing",
      "Experiencing the presence of the Divine or a Guru",
      "A system of philosophy",
      "Vision",
    ],
    philosophicalContexts: [
      {
        tradition: "Bhakti & Temple Culture",
        meaning:
          "The reciprocal act of seeing a deity or holy person and being seen by them, resulting in a transmission of spiritual grace.",
      },
    ],
    usageExamples: [
      {
        textContext: "Spiritual Culture",
        quoteSanskrit: "देव दर्शन (Deva Darshan)",
        quoteTranslation: "The sight of the Deity.",
        explanation:
          "Going to a temple is generally not called 'prayer', but 'going for Darshan'—the act of visually absorbing the presence of the Divine.",
      },
    ],
    relatedWords: ["guru", "puja", "jnana"],
    faqs: [
      {
        question: "How does Darshan work?",
        answer:
          "It is believed that the eyes are conduits for spiritual energy. An awakened being or consecrated deity transmits a direct, silent blessing to anyone who gazes upon them with devotion.",
      },
    ],
    summary:
      "Darshan means 'vision' or 'auspicious sight'; receiving Darshan implies a direct spiritual exchange of grace through the act of seeing.",
  },
  {
    slug: "prasad",
    wordEnglish: "Prasad",
    wordDevanagari: "प्रसाद",
    transliteration: "prasāda",
    pronunciation: "pruh-sahd",
    etymology: {
      root: "pra (प्र) + sad (सद्)",
      rootMeaning: "forth + to sit or settle",
      formationExplanation:
        "Literally 'clearness, brightness, or serenity'. It evolved to mean a 'favor' or 'grace'.",
    },
    primaryMeanings: [
      "Divine grace or favor",
      "Blessed food offered to God",
      "Tranquility of mind",
      "A gift from the Guru",
    ],
    philosophicalContexts: [
      {
        tradition: "Bhakti Traditions",
        meaning:
          "Food that has been offered to God in worship. It is believed to carry the vibrations of the Deity and is distributed as a tangible form of Divine blessing.",
      },
    ],
    usageExamples: [
      {
        textContext: "Bhagavad Gita 2.65",
        quoteSanskrit: "प्रसादे सर्वदुःखानां हानिरस्योपजायते",
        quoteTranslation:
          "In that tranquility (Prasada), the destruction of all sorrows occurs.",
        explanation:
          "Krishna uses the term to describe the profound serenity of a peaceful mind that has conquered the senses.",
      },
    ],
    relatedWords: ["puja", "bhakti", "shanti"],
    faqs: [
      {
        question: "Can anything be Prasad?",
        answer:
          "Traditionally, pure vegetarian food, fruits, or sweets are offered. However, a spiritual lesson or an object from a holy place can also be viewed as 'Prasad' (Divine Grace).",
      },
    ],
    summary:
      "Prasad refers to Divine grace or favor, most commonly manifesting as the blessed food distributed after ritual worship.",
  },
  {
    slug: "arati",
    wordEnglish: "Arati",
    wordDevanagari: "आरती",
    transliteration: "āratī",
    pronunciation: "ah-ruh-tee",
    etymology: {
      root: "ā (आ) + ratikā (रतिका)",
      rootMeaning: "complete + love/attachment",
      formationExplanation:
        "Alternatively sourced from 'aratrika' (the light that removes darkness).",
    },
    primaryMeanings: [
      "Ritual waving of lights",
      "Ceremony of adoration",
      "Offering of fire",
    ],
    philosophicalContexts: [
      {
        tradition: "Hindu Rituals",
        meaning:
          "The culminating act of a Puja where a lamp is waved before the deity. It symbolizes the offering of one's own soul and the dispelling of ignorance.",
      },
    ],
    usageExamples: [
      {
        textContext: "Temple Worship",
        quoteSanskrit: "नीराजन (Nirajana)",
        quoteTranslation: "Illuminating.",
        explanation:
          "The classical Sanskrit term for Arati. The flame waved represents the five elements of the world and the light of consciousness.",
      },
    ],
    relatedWords: ["puja", "bhakti", "kirtan"],
    faqs: [
      {
        question: "Why do people place their hands over the Arati flame?",
        answer:
          "By cupping their hands over the flame after it has been offered to the deity and touching their eyes or head, devotees receive the purifying energy and blessing of the Divine.",
      },
    ],
    summary:
      "Arati is the devotional ceremony in which light is offered to a deity to dispel ignorance and invoke grace.",
  },
  {
    slug: "nirvana",
    wordEnglish: "Nirvana",
    wordDevanagari: "निर्वाण",
    transliteration: "nirvāṇa",
    pronunciation: "nir-vah-nah",
    etymology: {
      root: "nir (निर्) + vā (वा)",
      rootMeaning: "out/away + to blow",
      formationExplanation:
        'Literally means "blowing out" or "extinguishing," as one blows out a lamp flame. In philosophical usage, it refers to the extinguishing of the fires of desire, aversion, and ignorance that fuel the cycle of rebirth.',
    },
    primaryMeanings: [
      "Extinction of suffering and worldly desire",
      "Liberation from the cycle of birth and death",
      "The ultimate state of peace and freedom",
    ],
    philosophicalContexts: [
      {
        tradition: "Bhagavad Gita / Vedanta",
        meaning:
          "Krishna uses the term 'Brahma-nirvana' to describe the state of absorption into Brahman—the bliss of the liberated soul who has transcended ego and desire. This predates and is distinct from the Buddhist usage.",
      },
      {
        tradition: "Buddhism",
        meaning:
          "The cessation of Dukkha (suffering) and escape from Samsara, achieved by extinguishing craving (Tanha), aversion, and delusion. In Theravada, Parinirvana is the final nirvana after death of an enlightened being.",
      },
      {
        tradition: "Shaivism",
        meaning:
          "Used in the Shaiva Agamas to describe the dissolution of individual identity into Shiva-consciousness, particularly in the Pashupata and Kapalika traditions.",
      },
    ],
    usageExamples: [
      {
        textContext: "Bhagavad Gita 2.72",
        quoteSanskrit:
          "एषा ब्राह्मी स्थितिः पार्थ नैनां प्राप्य विमुह्यति । स्थित्वास्यामन्तकालेऽपि ब्रह्मनिर्वाणमृच्छति ॥",
        quoteTranslation:
          "This is the state of Brahman, O Partha. Having attained this, one is never deluded. Being established in this even at the hour of death, one attains Brahma-nirvana (liberation in Brahman).",
        explanation:
          "Krishna describes Brahma-nirvana as the culmination of Sthitaprajna (steady wisdom), establishing the Hindu Vedantic usage of nirvana as union with the Absolute, not mere cessation.",
      },
      {
        textContext: "Bhagavad Gita 5.24-26",
        quoteSanskrit: "लभन्ते ब्रह्मनिर्वाणमृषयः क्षीणकल्मषाः",
        quoteTranslation:
          "The sages whose sins are destroyed, whose doubts are removed, who are self-controlled and engaged in the welfare of all beings, attain Brahma-nirvana.",
        explanation:
          "Here the Gita specifies that Brahma-nirvana is not passive withdrawal but is available to those actively engaged in selfless action—integrating Karma Yoga with liberation.",
      },
      {
        textContext: "Mokshadharma Parva (Mahabharata 12.290)",
        quoteSanskrit: "निर्वाणं परमं सुखम्",
        quoteTranslation: "Nirvana is the supreme bliss.",
        explanation:
          "This passage from the Shanti Parva of the Mahabharata affirms nirvana as the highest state of happiness in the pre-Buddhist Hindu philosophical tradition.",
      },
    ],
    relatedWords: ["moksha", "brahman", "samsara"],
    faqs: [
      {
        question: "Is nirvana a Hindu or Buddhist concept?",
        answer:
          "Both. The term appears in Hindu texts like the Bhagavad Gita (as 'Brahma-nirvana') and the Mahabharata, predating its prominent Buddhist usage. In Hinduism it denotes union with Brahman; in Buddhism, the cessation of suffering. The word and concept existed in the Indian philosophical landscape before the Buddha adopted and reframed it.",
      },
      {
        question: "What is the difference between Nirvana and Moksha?",
        answer:
          "In Hindu usage, they overlap significantly. Moksha emphasizes liberation of the Atman from Samsara, while Brahma-nirvana emphasizes the bliss of merging into Brahman. In Buddhism, nirvana does not presuppose an Atman and focuses on the extinguishing of craving and suffering.",
      },
      {
        question: "Does nirvana mean total annihilation?",
        answer:
          "No. In Hindu Vedanta, Brahma-nirvana is described as the supreme bliss (parama sukham)—it is the extinguishing of ignorance and desire, not of existence itself. What is 'blown out' is suffering, not being.",
      },
    ],
    summary:
      "Nirvana in the Hindu tradition refers to Brahma-nirvana—the supreme bliss of liberation in which the fires of desire, ignorance, and ego are extinguished and the soul rests in union with Brahman.",
    seoTitle:
      "Nirvana in Sanskrit: Vedic Origin Before Buddha",
    seoDescription:
      "Nirvana is older than Buddhism. Bhagavad Gita 2.72 and 5.24 use 'Brahma-nirvana' for union with Brahman. Compare Vedanta and Buddhist readings.",
    ogTitle: "Nirvana: Pre-Buddhist Origins and 3 Meanings",
    ogDescription:
      "Mahabharata calls it 'parama sukham' (supreme bliss). Krishna calls it 'Brahma-nirvana'. Buddha reframes as cessation. The Sanskrit lexicon entry.",
  },
  {
    slug: "tantra",
    wordEnglish: "Tantra",
    wordDevanagari: "तन्त्र",
    transliteration: "tantra",
    pronunciation: "tun-truh",
    etymology: {
      root: "tan (तन्)",
      rootMeaning: "to stretch, expand, or weave",
      suffix: "-tra (instrumental suffix)",
      formationExplanation:
        'Literally "loom" or "warp of a fabric." Philosophically, it denotes a system or framework that weaves together practices, doctrines, and rituals into a coherent spiritual technology. The -tra suffix indicates an instrument or means—so tantra is "that by which knowledge is expanded."',
    },
    primaryMeanings: [
      "Loom or warp of a fabric",
      "A systematic spiritual doctrine or technique",
      "A class of scriptures (Tantras/Agamas)",
      "A framework that integrates ritual, mantra, and meditation",
    ],
    philosophicalContexts: [
      {
        tradition: "Kashmir Shaivism",
        meaning:
          "The Tantras are the primary scriptural authority. Reality is non-dual Shiva-Shakti consciousness, and tantric practice aims to recognize this unity through direct experience rather than renunciation. Key texts include the Vijnanabhairava Tantra and the Shiva Sutras.",
      },
      {
        tradition: "Shakta Tradition",
        meaning:
          "Tantra centers on the worship of Shakti (the Divine Feminine) as the supreme creative power. The Devi Mahatmya and the Tantras of the Shri Vidya lineage prescribe elaborate ritual, yantra, and mantra practices to realize the Goddess as identical with Brahman.",
      },
      {
        tradition: "Vajrayana Buddhism",
        meaning:
          "Buddhist Tantra (Vajrayana) adapts many structural elements—mandala, mantra, guru-disciple initiation—into a Buddhist soteriological framework aimed at rapid Buddhahood. It shares ritual technology with Hindu Tantra but operates within a distinctly Buddhist philosophical view.",
      },
    ],
    usageExamples: [
      {
        textContext: "Kularnava Tantra 2.23",
        quoteSanskrit: "तन्यते विस्तार्यते ज्ञानमनेन इति तन्त्रम्",
        quoteTranslation:
          "That by which knowledge is expanded is called Tantra.",
        explanation:
          "The Kularnava Tantra itself provides this etymological definition, framing Tantra not as occultism but as a systematic means for expanding spiritual knowledge and direct realization.",
      },
      {
        textContext: "Vijnanabhairava Tantra, Verse 1",
        quoteSanskrit: "श्रुतं देव मया सर्वं रुद्रयामलसम्भवम्",
        quoteTranslation:
          "O Deva, I have heard all that has emerged from the Rudra-Yamala Tantra.",
        explanation:
          "The Vijnanabhairava opens as a dialogue between Shiva and Shakti, establishing the tantric format of revealed wisdom transmitted through divine conversation. It then presents 112 meditation techniques (dharanas) for direct realization.",
      },
    ],
    relatedWords: ["mantra", "yoga", "kundalini"],
    faqs: [
      {
        question: "Is Tantra just about sex?",
        answer:
          "No. The sexual dimension occupies a small fraction of the vast tantric literature. The overwhelming majority of tantric texts deal with mantra science, meditation techniques, temple ritual, cosmology, philosophy, and yogic physiology. The sexual practices that do exist are symbolic enactments of the union of Shiva and Shakti, restricted to advanced initiates under strict guru guidance.",
      },
      {
        question: "What is the difference between Tantra and Veda?",
        answer:
          "The Vedas are Shruti (revealed scripture) that emphasize sacrifice, knowledge, and renunciation. The Tantras (also called Agamas) are a parallel scriptural tradition that emphasizes embodied practice, mantra, ritual worship, and the sanctification of worldly life. Tantra accepts the Vedic framework but adds that liberation can be achieved through engagement with the world, not only through withdrawal from it.",
      },
      {
        question: "What is 'Left Hand' vs 'Right Hand' Tantra?",
        answer:
          "Dakshina-marga (Right Hand) uses symbolic and internalized forms of worship, while Vama-marga (Left Hand) may employ transgressive external rituals involving the 'five Ms' (Pancha-makara). Both aim at the same goal: realization of non-dual consciousness. The Right Hand path is more widely practiced and socially accepted.",
      },
    ],
    summary:
      "Tantra is a vast tradition of systematic spiritual practice—encompassing mantra, meditation, ritual, and yogic physiology—that weaves together doctrine and technique as a means for expanding consciousness and realizing the non-dual nature of reality.",
  },
  {
    slug: "sutra",
    wordEnglish: "Sutra",
    wordDevanagari: "सूत्र",
    transliteration: "sūtra",
    pronunciation: "soo-truh",
    etymology: {
      root: "sīv (सीव्)",
      rootMeaning: "to sew or stitch",
      formationExplanation:
        'Literally means "thread." Just as a thread holds beads together in a necklace, a sutra holds together vast philosophical meaning in a minimal number of words. The sutra form arose because teachings were transmitted orally and needed to be maximally compressed for memorization.',
    },
    primaryMeanings: [
      "Thread or string",
      "A concise, aphoristic rule or formula",
      "A text composed of such condensed aphorisms",
    ],
    philosophicalContexts: [
      {
        tradition: "Yoga (Patanjali)",
        meaning:
          "The Yoga Sutras of Patanjali contain 196 sutras that systematize the entire science of yoga into four chapters. Each sutra is deliberately terse, requiring a commentary (bhashya) to unpack. For example, 'yogash chitta vritti nirodhah' condenses the entire purpose of yoga into four words.",
      },
      {
        tradition: "Vedanta (Badarayana)",
        meaning:
          "The Brahma Sutras (also called Vedanta Sutras) are 555 aphorisms that systematize the teachings of the Upanishads. They form one of the three pillars (Prasthana-traya) of Vedanta alongside the Upanishads and the Bhagavad Gita.",
      },
      {
        tradition: "Sanskrit Grammar & Logic",
        meaning:
          "Panini's Ashtadhyayi consists of approximately 4,000 sutras codifying the entire grammar of Sanskrit. The sutra format was also used in Nyaya (logic), Vaisheshika (atomism), and Mimamsa (ritual exegesis), making it the standard format for systematic Indian philosophy.",
      },
    ],
    usageExamples: [
      {
        textContext: "Yoga Sutras 1.2",
        quoteSanskrit: "योगश्चित्तवृत्तिनिरोधः",
        quoteTranslation:
          "Yoga is the cessation of the fluctuations of the mind.",
        explanation:
          "Perhaps the most famous sutra in Indian philosophy—in just four words, Patanjali defines the entire aim and method of yoga. The extreme compression is characteristic of the sutra form, packing a lifetime of practice into a single sentence.",
      },
      {
        textContext: "Brahma Sutras 1.1.1",
        quoteSanskrit: "अथातो ब्रह्मजिज्ञासा",
        quoteTranslation:
          "Now, therefore, the inquiry into Brahman.",
        explanation:
          "The opening sutra of the Brahma Sutras. In just four words, Badarayana establishes the prerequisites (atha = now, implying prior qualifications), the reason (atah = therefore), and the subject (Brahma-jijnasa = the desire to know Brahman).",
      },
      {
        textContext: "Vaiyakarana-bhushanasara (Commentary tradition)",
        quoteSanskrit: "अल्पाक्षरमसन्दिग्धं सारवद्विश्वतोमुखम् । अस्तोभमनवद्यं च सूत्रं सूत्रविदो विदुः ॥",
        quoteTranslation:
          "Minimal in syllables, free from ambiguity, full of essence, universal in scope, without unnecessary words, and faultless—thus do the knowers of sutra define a sutra.",
        explanation:
          "This verse from the commentary tradition defines the six qualities of an ideal sutra, explaining why the form was prized as the highest achievement of philosophical compression in classical India.",
      },
    ],
    relatedWords: ["yoga", "jnana", "dharma"],
    faqs: [
      {
        question: "Why are sutras so difficult to understand on their own?",
        answer:
          "Sutras were composed as memory aids for oral transmission, not as standalone texts. Each sutra presupposes a teacher (Guru) who expands the condensed formula through oral explanation. This is why every major sutra text has generated extensive commentarial traditions—Shankaracharya on the Brahma Sutras, Vyasa on the Yoga Sutras, and so on.",
      },
      {
        question: "What is the difference between a Sutra and a Shloka?",
        answer:
          "A sutra is a terse prose aphorism designed for maximum compression. A shloka is a metrical verse (typically in Anushtubh meter, 32 syllables) that is more flowing and often narrative. The Bhagavad Gita is composed in shlokas; the Yoga Sutras and Brahma Sutras are composed in sutra form.",
      },
      {
        question: "Are Buddhist Sutras the same as Hindu Sutras?",
        answer:
          "The word is the same, but the format differs. Hindu sutras are extremely compressed aphorisms requiring commentary. Buddhist sutras (Pali: suttas) are typically longer discourses attributed to the Buddha, structured as dialogues or sermons. The Buddhist usage is closer to 'discourse' than 'aphorism.'",
      },
    ],
    summary:
      "A sutra is a condensed aphoristic thread of wisdom—the classical Indian format for encoding vast philosophical systems in minimal words, designed to be unpacked through teacher-student transmission and commentarial traditions.",
  },
  {
    slug: "ashram",
    wordEnglish: "Ashram",
    wordDevanagari: "आश्रम",
    transliteration: "āśrama",
    pronunciation: "ahsh-ruhm",
    etymology: {
      root: "śram (श्रम्)",
      rootMeaning: "to exert effort, to toil, to perform austerity",
      suffix: "ā- (prefix indicating direction/toward)",
      formationExplanation:
        'Literally "a place of effort" or "a place where spiritual exertion is performed." The prefix ā- combined with śram denotes a dedicated space where one strives toward spiritual realization through disciplined practice.',
    },
    primaryMeanings: [
      "Hermitage or spiritual retreat",
      "A place of disciplined spiritual practice",
      "One of the four stages of life (Ashrama-dharma)",
    ],
    philosophicalContexts: [
      {
        tradition: "Dharmashastra (Ashrama System)",
        meaning:
          "The Ashrama system divides human life into four stages: Brahmacharya (studentship), Grihastha (householder), Vanaprastha (forest-dweller/retirement), and Sannyasa (renunciation). Each stage carries specific duties (dharma) and forms the backbone of the Vedic social order.",
      },
      {
        tradition: "Vedic / Upanishadic",
        meaning:
          "The forest ashrams of the Upanishadic period were where Rishis lived, taught, and transmitted the highest spiritual knowledge. The Taittiriya Upanishad, Chandogya Upanishad, and Brihadaranyaka Upanishad all depict ashram settings as the crucible for philosophical inquiry.",
      },
      {
        tradition: "Modern Hindu Practice",
        meaning:
          "An ashram today refers to a spiritual community centered around a Guru or teaching tradition—such as Rishikesh ashrams, Ramana Maharshi's Ramanashramam, or the Sivananda Ashrams—where seekers engage in sadhana, seva, and study.",
      },
    ],
    usageExamples: [
      {
        textContext: "Manusmriti 6.1-2",
        quoteSanskrit: "वनप्रस्थं तु निर्वर्त्य तृतीयं भागमायुषः",
        quoteTranslation:
          "Having passed through the third part of his life in the forest hermitage (Vanaprastha ashram)...",
        explanation:
          "Manu describes the transition from householder to the Vanaprastha ashram—the third stage of life where one gradually withdraws from worldly duties and deepens spiritual practice in a forest setting.",
      },
      {
        textContext: "Taittiriya Upanishad 1.11.1",
        quoteSanskrit: "वेदमनूच्याचार्योऽन्तेवासिनमनुशास्ति",
        quoteTranslation:
          "Having taught the Veda, the teacher instructs the departing student...",
        explanation:
          "This famous convocation address is delivered in the ashram setting as the student completes Brahmacharya. The Guru's final instructions—'speak truth, follow dharma, do not neglect self-study'—encapsulate the ashram's role as the formative ground of character and wisdom.",
      },
    ],
    relatedWords: ["guru", "sadhana", "dharma"],
    faqs: [
      {
        question: "What are the four Ashramas of life?",
        answer:
          "Brahmacharya (student life, ~0-25 years, devoted to learning and celibacy), Grihastha (householder, ~25-50, family and societal duties), Vanaprastha (forest-dweller, ~50-75, gradual withdrawal and spiritual deepening), and Sannyasa (renunciation, total dedication to liberation). These stages structure the ideal Vedic life as a progressive journey toward Moksha.",
      },
      {
        question: "Can anyone visit an ashram?",
        answer:
          "Most modern ashrams welcome sincere seekers regardless of background. Visitors are typically expected to follow the ashram's daily schedule (which includes meditation, study, and seva), observe certain disciplines, and respect the community's rules and spiritual atmosphere.",
      },
      {
        question:
          "What is the difference between an ashram and a monastery?",
        answer:
          "Both are communities dedicated to spiritual practice, but a Hindu ashram is typically organized around a living Guru or a Guru lineage and is open to householders and renunciants alike. A monastery (in the Christian sense) is usually restricted to ordained monks or nuns under monastic vows. The Hindu equivalent of a monastery is a Matha, such as those established by Shankaracharya.",
      },
    ],
    summary:
      "An ashram is a place of disciplined spiritual effort—both the physical hermitage where seekers practice under a Guru and the Vedic framework of four life-stages through which a person progressively moves toward liberation.",
  },
  ...newSanskritVocab,
];

export function getSanskritWordBySlug(slug: string): SanskritWord | undefined {
  return sanskritVocab.find((w) => w.slug === slug);
}
