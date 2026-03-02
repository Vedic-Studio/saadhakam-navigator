export interface Philosophy {
  slug: string;
  title: string;
  summary: string;
  keyQuestion: string;
  description: string;
  keyIdeas: string[];
  whoItSuits: string;
  howToStart: string;
  recommendedTexts: string[];
  tags: string[];
  icon: string;
}

export const philosophies: Philosophy[] = [
  {
    slug: "vedanta",
    title: "Vedanta",
    summary:
      "The culmination of Vedic wisdom exploring the nature of ultimate reality and the self.",
    keyQuestion: "What is ultimately real?",
    description:
      "Vedanta represents the philosophical conclusions drawn from the Upanishads, forming the most influential school of Hindu philosophy. It addresses fundamental questions about consciousness, reality, and liberation.",
    keyIdeas: [
      "Brahman as the ultimate reality underlying all existence",
      "Atman (individual self) and its relationship to Brahman",
      "Maya and the nature of perceived reality",
      "Moksha as the goal of human life",
    ],
    whoItSuits:
      "Seekers drawn to philosophical inquiry, those comfortable with abstract concepts, and anyone questioning the nature of consciousness and reality.",
    howToStart:
      "Begin with the Mandukya Upanishad and its Karika, then explore the Brahma Sutras with accessible commentaries.",
    recommendedTexts: ["Upanishads", "Brahma Sutras", "Vivekachudamani"],
    tags: ["philosophical", "contemplative", "non-dual"],
    icon: "Infinity",
  },
  {
    slug: "advaita",
    title: "Advaita Vedanta",
    summary:
      "Non-dual philosophy teaching that individual self and universal consciousness are one.",
    keyQuestion: "Who am I, really?",
    description:
      "Systematized by Adi Shankaracharya, Advaita teaches that the apparent multiplicity of existence is ultimately illusory, and only Brahman—pure consciousness—truly exists. The individual atman is identical with Brahman.",
    keyIdeas: [
      "Brahman alone is real; the world is apparent",
      "The jiva (individual) is Brahman, obscured by ignorance",
      "Liberation comes through knowledge (jnana), not action",
      "The mahavakyas: 'Tat tvam asi' (You are That)",
    ],
    whoItSuits:
      "Those drawn to radical inquiry, seekers comfortable with paradox, and those who resonate with 'Who am I?' as a primary question.",
    howToStart:
      "Practice self-inquiry (atma-vichara), study Shankaracharya's commentaries, and contemplate the mahavakyas.",
    recommendedTexts: ["Vivekachudamani", "Atma Bodha", "Drg-Drsya-Viveka"],
    tags: ["non-dual", "inquiry", "contemplative"],
    icon: "Eye",
  },
  {
    slug: "vishishtadvaita",
    title: "Vishishtadvaita",
    summary:
      "Qualified non-dualism seeing God, souls, and world as distinct yet inseparable.",
    keyQuestion: "How do I relate to the Divine?",
    description:
      "Formulated by Ramanuja, this philosophy maintains that while Brahman is the only independent reality, individual souls and the material world are real and eternally distinct parts of Brahman, like body and soul.",
    keyIdeas: [
      "Brahman is Narayana/Vishnu with infinite auspicious qualities",
      "Souls and matter are real, eternal, and part of Brahman",
      "Devotion (bhakti) is the primary path to liberation",
      "Prapatti (surrender) as accessible to all",
    ],
    whoItSuits:
      "Those who feel devotional love naturally, seekers who want relationship with the Divine rather than merger, and those drawn to Vaishnava traditions.",
    howToStart:
      "Develop a personal devotional practice, study the Gita with Ramanuja's commentary, and connect with Vaishnava communities.",
    recommendedTexts: ["Sri Bhashya", "Gitabhashya", "Stotra Ratna"],
    tags: ["devotional", "theistic", "relational"],
    icon: "Heart",
  },
  {
    slug: "dvaita",
    title: "Dvaita",
    summary:
      "Dualist philosophy emphasizing eternal distinction between God, souls, and matter.",
    keyQuestion: "How do I serve the Divine?",
    description:
      "Madhvacharya's school maintains five fundamental eternal differences: between God and souls, between God and matter, between souls, between souls and matter, and between different material objects.",
    keyIdeas: [
      "Vishnu is the supreme, independent reality",
      "Souls are eternally distinct from God and each other",
      "Liberation is eternal service to God, not merger",
      "Grace is essential; hierarchy exists among liberated souls",
    ],
    whoItSuits:
      "Those who find meaning in service, seekers who prefer clear distinctions, and devotees drawn to the grandeur of the Divine.",
    howToStart:
      "Cultivate a service-oriented devotional practice, study Madhva's commentaries, and practice visualization of divine forms.",
    recommendedTexts: [
      "Tattvavada texts",
      "Madhva's Gita Bhashya",
      "Brahma Sutra Bhashya",
    ],
    tags: ["devotional", "theistic", "service"],
    icon: "Crown",
  },
  {
    slug: "samkhya",
    title: "Samkhya",
    summary:
      "Ancient analytical philosophy distinguishing pure consciousness from material nature.",
    keyQuestion: "What is the structure of existence?",
    description:
      "One of the oldest systematic philosophies, Samkhya provides a detailed map of reality through enumeration of cosmic principles (tattvas), distinguishing Purusha (consciousness) from Prakriti (matter/nature).",
    keyIdeas: [
      "Reality consists of Purusha (consciousness) and Prakriti (matter)",
      "25 tattvas describe the evolution of the manifest world",
      "The three gunas (sattva, rajas, tamas) govern all nature",
      "Liberation comes through discriminative knowledge",
    ],
    whoItSuits:
      "Analytical minds, those drawn to systematic understanding, and seekers wanting a clear cosmological framework.",
    howToStart:
      "Study the Samkhya Karika, understand the gunas in daily life, and practice witnessing consciousness distinct from experience.",
    recommendedTexts: ["Samkhya Karika", "Samkhya Sutras", "Tattva Samasa"],
    tags: ["analytical", "philosophical", "cosmological"],
    icon: "Layers",
  },
  {
    slug: "yoga-darshana",
    title: "Yoga Darshana",
    summary:
      "Patanjali's systematic path of mental discipline leading to liberation.",
    keyQuestion: "How do I still the mind?",
    description:
      "The Yoga school, closely allied with Samkhya, provides practical methodology for stilling mental fluctuations and realizing the true nature of the self through progressive stages of practice.",
    keyIdeas: [
      "Yoga is the cessation of mental modifications (chitta vritti nirodha)",
      "Eight limbs (ashtanga) form a complete path",
      "The kleshas (afflictions) are obstacles to be overcome",
      "Samadhi reveals the true self (Purusha)",
    ],
    whoItSuits:
      "Disciplined practitioners, those seeking concrete methods, and seekers drawn to meditation and mental cultivation.",
    howToStart:
      "Study the Yoga Sutras, establish a daily meditation practice, and work progressively through the eight limbs.",
    recommendedTexts: [
      "Yoga Sutras of Patanjali",
      "Yoga Bhashya",
      "Hatha Yoga Pradipika",
    ],
    tags: ["practical", "meditative", "disciplined"],
    icon: "Focus",
  },
  {
    slug: "mimamsa",
    title: "Mimamsa",
    summary:
      "Philosophy of Vedic ritual, duty, and the power of sacred action.",
    keyQuestion: "What is my sacred duty?",
    description:
      "Purva Mimamsa focuses on the earlier portions of the Vedas dealing with ritual action (karma-kanda), establishing principles of Vedic interpretation and the intrinsic power of properly performed rites.",
    keyIdeas: [
      "The Vedas are eternal, authorless, and self-validating",
      "Dharma is known only through Vedic injunction",
      "Ritual action (karma) has intrinsic power (apurva)",
      "Heaven (svarga) is attainable through proper ritual",
    ],
    whoItSuits:
      "Those drawn to ritual precision, seekers who find meaning in sacred action, and those interested in dharmic living.",
    howToStart:
      "Study the principles of dharma, learn about Vedic rituals, and explore how dharmic action applies in contemporary life.",
    recommendedTexts: [
      "Mimamsa Sutras",
      "Shabara Bhashya",
      "Dharma literature",
    ],
    tags: ["ritualistic", "dharmic", "traditional"],
    icon: "Flame",
  },
  {
    slug: "nyaya-vaisheshika",
    title: "Nyaya-Vaisheshika",
    summary:
      "Schools of logic, epistemology, and atomic theory seeking truth through reason.",
    keyQuestion: "How do I know what is true?",
    description:
      "Nyaya provides rigorous tools for valid reasoning and debate, while Vaisheshika offers an atomic theory of reality. Together they form a rationalist approach to liberation through correct knowledge.",
    keyIdeas: [
      "Four valid means of knowledge (pramanas)",
      "Sixteen categories of logical analysis",
      "Atomic theory of material existence",
      "Liberation through elimination of false knowledge",
    ],
    whoItSuits:
      "Logical thinkers, debaters, those who value rigorous analysis, and seekers who approach truth through reason.",
    howToStart:
      "Study the Nyaya Sutras, learn the pramanas, and practice applying logical categories to philosophical questions.",
    recommendedTexts: ["Nyaya Sutras", "Vaisheshika Sutras", "Tarka Sangraha"],
    tags: ["logical", "analytical", "philosophical"],
    icon: "Scale",
  },
];

export function getPhilosophyBySlug(slug: string): Philosophy | undefined {
  return philosophies.find((p) => p.slug === slug);
}
