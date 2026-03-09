export interface Great {
  slug: string;
  name: string;
  era: string;
  title: string;
  summary: string;
  whatTheyClarified: string;
  description: string;
  keyTeachings: string[];
  relevanceToday: string;
  recommendedWorks: string[];
  tags: string[];
  icon: string;
}

export const greats: Great[] = [
  {
    slug: "adi-shankaracharya",
    name: "Adi Shankaracharya",
    era: "8th century CE",
    title: "Systematizer of Advaita Vedanta",
    summary:
      "The 32-year-old philosopher who unified India's spiritual geography and codified non-dualism.",
    whatTheyClarified:
      "That your separate identity is a misunderstanding. There is only one Consciousness, appearing as many.",
    description:
      "Adi Shankaracharya is the definitive architect of Non-Dualism. In just three decades, he walked the length of India, defeated every major school of thought in public debate, and established four monasteries (Mathas) that remain the cardinal pillars of Hindu philosophy 1,200 years later.",
    keyTeachings: [
      "The World as Superimposition — Reality is the rope; the world is the snake we mistakenly see upon it.",
      "The Self as Brahman — Your innermost awareness (Atman) is identical to the cosmic absolute.",
      "Inquiry over Ritual — Liberation isn't earned through action, but realized through systematic self-inquiry (Jnana).",
      "The Mahavakyas — Four 'Great Sayings' that serve as the definitive technical pointers to truth.",
    ],
    relevanceToday:
      "Shankara's analysis of consciousness is strikingly similar to modern 'Hard Problem' debates. He offers a rigorous, logical path for those who find devotional religion too emotional and secular materialism too shallow.",
    recommendedWorks: [
      "Vivekachudamani (Crest Jewel of Discrimination)",
      "Atma Bodha (Self-Knowledge)",
      "Bhaja Govindam",
      "Commentary on the Brahma Sutras",
    ],
    tags: ["philosophical", "non-dual", "foundational"],
    icon: "Infinity",
  },
  {
    slug: "abhinavagupta",
    name: "Abhinavagupta",
    era: "10th-11th century CE",
    title: "Master of Kashmir Shaivism and Aesthetics",
    summary:
      "The polymath who proved that spiritual liberation and aesthetic rapture are the same phenomenon.",
    whatTheyClarified:
      "That the world isn't an illusion to be escaped, but a vibration to be celebrated.",
    description:
      "Abhinavagupta was a towering genius of Kashmir Shaivism. He synthesized dozens of tantric lineages into a 'Path of Recognition.' To him, every experience—from the taste of honey to the heat of anger—is a doorway to the Absolute if approached with total awareness.",
    keyTeachings: [
      "Svatantrya (Absolute Freedom) — Consciousness is not passive; it is a dynamic, creative power.",
      "Recognition (Pratyabhijna) — You don't need to 'become' Shiva; you need to recognize you already are.",
      "Rasa-Evolution — Aesthetic beauty is a 'preview' of spiritual bliss. Art is a laboratory for awakening.",
      "The Tantric Embrace — Nothing is excluded. The body and the mind are spiritual instruments, not obstacles.",
    ],
    relevanceToday:
      "Abhinavagupta is the antidote to dry asceticism. He speaks to the modern creator, artist, and householder who wants a path that includes their body, their career, and their appreciation of beauty.",
    recommendedWorks: [
      "Tantraloka (The Light of Tantra)",
      "Paratrishika Vivarana",
      "Abhinavabharati (The definitive text on Rasa theory)",
      "Paramarthasara",
    ],
    tags: ["mystical", "tantric", "aesthetic"],
    icon: "Sparkles",
  },
  {
    slug: "swami-vivekananda",
    name: "Swami Vivekananda",
    era: "1863-1902 CE",
    title: "Modern Prophet of Vedanta",
    summary:
      "The first global voice of Sanatan Dharma who bridged the gap between ancient sanyasa and modern life.",
    whatTheyClarified:
      "That spirituality must be practical, fearless, and oriented toward service.",
    description:
      "Swami Vivekananda electrified the 1893 World Parliament of Religions and spent his final years building a bridge between East and West. He insisted that any religion that doesn't feed the hungry or empower the weak is no religion at all.",
    keyTeachings: [
      "The Potential Divinity of the Soul — Your default state is perfection; the work is to uncover it.",
      "Universalism — Every spiritual path is a valid trajectory toward the same non-dual center.",
      "Practical Vedanta — High philosophy is useless if it doesn't manifest as compassion and social service.",
      "Man-Making Education — Spirituality means building characters that are 'strong as steel and soft as butter.'",
    ],
    relevanceToday:
      "Vivekananda is the patron saint of the 'Modern Monk.' He offers a blueprint for how to be deeply rooted in tradition while being fully engaged with science, technology, and social progress.",
    recommendedWorks: [
      "Jnana Yoga",
      "Raja Yoga (The definitive guide to Patanjali for the modern mind)",
      "Karma Yoga",
      "Bhakti Yoga",
    ],
    tags: ["modern", "practical", "universal"],
    icon: "Flame",
  },
  {
    slug: "sri-aurobindo",
    name: "Sri Aurobindo",
    era: "1872-1950 CE",
    title: "Philosopher of Integral Yoga",
    summary:
      "The revolutionary who saw that humanity is not a finished product, but an evolutionary bridge.",
    whatTheyClarified:
      "That we aren't just here to 'escape' the world, but to bring higher consciousness into it.",
    description:
      "Sri Aurobindo moved from frontline political revolution to an internal life-revolution. He developed a vast evolutionary cosmology where mind, life, and body are transformed by a 'Supermind'—bringing heaven down to earth rather than seeking to leave earth for heaven.",
    keyTeachings: [
      "Spiritual Evolution — Consciousness is evolving through us. We are the 'middle-term' of a larger process.",
      "Integral Yoga — A path that synthesizes all methods to transform the entire person, not just the spirit.",
      "The Supramental Descent — The possibility of a brand new, divinized consciousness taking root on Earth.",
      "Transformation over Escape — The goal is to make life divine, not to leave life for the Divine.",
    ],
    relevanceToday:
      "Aurobindo provides the philosophical framework for the 'Post-Human' or 'Trans-Human' quest, but grounds it in deep spiritual realization rather than just silicon and software.",
    recommendedWorks: [
      "The Life Divine (A vast metaphysical architecture)",
      "The Synthesis of Yoga",
      "Savitri (An epic spiritual poem)",
      "Essays on the Gita",
    ],
    tags: ["integral", "evolutionary", "philosophical"],
    icon: "Sun",
  },
  {
    slug: "kalidasa",
    name: "Kalidasa",
    era: "4th-5th century CE",
    title: "Poet-Sage of Sanskrit Literature",
    summary:
      "The writer who proved that the most sophisticated art is the shortest path to the most profound truth.",
    whatTheyClarified:
      "That aesthetic perfection is a form of spiritual discipline (Sadhana).",
    description:
      "Kalidasa is the Shakespeare of Sanskrit. His dramas and poems use the most exquisite linguistic precision to reveal the subtle movements of the soul and the divine life visible in the natural world.",
    keyTeachings: [
      "Soundarya (Beauty) as Truth — External beauty is a pointer to the internal perfection of the source.",
      "Nature as Companion — The environment isn't a backdrop; it is a conscious participant in the spiritual drama.",
      "Dharmic Resonance — Life's choices and conflicts are the friction that generates spiritual heat.",
      "The Perfection of Form — High art requires as much discipline as high meditation.",
    ],
    relevanceToday:
      "Kalidasa reminds us that the spiritual life doesn't have to be austere or ugly. He is for those who find the Divine in literature, cinema, and the overwhelming beauty of the natural world.",
    recommendedWorks: [
      "Abhigyanashakuntalam (The Recognition of Shakuntala)",
      "Meghadutam (The Cloud Messenger)",
      "Kumarasambhavam (The Birth of the War-God)",
      "Raghuvamsham",
    ],
    tags: ["literary", "aesthetic", "classical"],
    icon: "Feather",
  },
];

export function getGreatBySlug(slug: string): Great | undefined {
  return greats.find((g) => g.slug === slug);
}
