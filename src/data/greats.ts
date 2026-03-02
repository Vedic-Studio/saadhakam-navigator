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
      "Philosopher-saint who consolidated non-dual Vedanta and established monasteries across India.",
    whatTheyClarified:
      "That Brahman alone is real, the world is apparent, and the individual self is none other than Brahman.",
    description:
      "Adi Shankaracharya is arguably the most influential Hindu philosopher. In a short life (traditionally 32 years), he traveled across India, debated other schools, wrote extensive commentaries on the Upanishads, Brahma Sutras, and Bhagavad Gita, composed devotional hymns, and established the four mathas (monasteries) that continue today.",
    keyTeachings: [
      "Brahma satyam jagan mithya—Brahman is real, the world is apparent",
      "Jivo brahmaiva naparah—The individual self is Brahman alone",
      "Liberation comes through knowledge (jnana), removing ignorance (avidya)",
      "The mahavakyas reveal non-dual truth",
    ],
    relevanceToday:
      "Shankara's clear articulation of non-duality provides a coherent philosophical framework for understanding consciousness and reality. His works remain essential for serious students of Vedanta.",
    recommendedWorks: [
      "Vivekachudamani",
      "Atma Bodha",
      "Bhaja Govindam",
      "Commentary on Brahma Sutras",
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
      "Polymath who synthesized Tantric Shaivism and made groundbreaking contributions to aesthetics.",
    whatTheyClarified:
      "That all experience is consciousness in play, and aesthetic rapture mirrors spiritual liberation.",
    description:
      "Abhinavagupta was a towering figure of Kashmir Shaivism—philosopher, mystic, musician, and literary critic. He synthesized various Shaiva and Shakta tantric traditions into a coherent non-dual philosophy, while also writing the definitive work on Indian aesthetics.",
    keyTeachings: [
      "The universe is Shiva's self-expression (svatantrya)",
      "Recognition (pratyabhijna) of one's true nature liberates",
      "Aesthetic rapture (rasa) parallels spiritual bliss",
      "All states of consciousness are doorways to the absolute",
    ],
    relevanceToday:
      "Abhinavagupta offers an integrative vision where art, beauty, and pleasure can be paths to awakening. His non-dual philosophy welcomes all of life as sacred.",
    recommendedWorks: [
      "Tantraloka",
      "Paratrishika Vivarana",
      "Abhinavabharati",
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
      "Key figure in revival of Hinduism and introduction of Vedanta to the West.",
    whatTheyClarified:
      "That Vedanta is practical, universal, and empowering—religion must serve humanity.",
    description:
      "Swami Vivekananda, chief disciple of Sri Ramakrishna, electrified the 1893 World Parliament of Religions and spent years teaching in the West. He founded the Ramakrishna Mission, combining contemplative practice with social service, and reframed Hindu philosophy for the modern world.",
    keyTeachings: [
      "Each soul is potentially divine; the goal is to manifest that divinity",
      "All religions lead to the same truth—tolerance is essential",
      "Practical Vedanta: spirituality must address real-world suffering",
      "Strength and fearlessness are spiritual virtues",
    ],
    relevanceToday:
      "Vivekananda's vision of confident, practical spirituality that serves humanity remains deeply relevant. He showed how ancient wisdom can address modern challenges.",
    recommendedWorks: [
      "Complete Works of Swami Vivekananda",
      "Jnana Yoga",
      "Raja Yoga",
      "Karma Yoga",
    ],
    tags: ["modern", "practical", "universal"],
    icon: "Flame",
  },
  {
    slug: "sri-aurobindo",
    name: "Sri Aurobindo",
    era: "1872-1950 CE",
    title: "Philosopher of Integral Yoga and Human Evolution",
    summary:
      "Revolutionary-turned-sage who developed a comprehensive vision of spiritual evolution.",
    whatTheyClarified:
      "That humanity is evolving toward a higher consciousness, and yoga is conscious participation in that evolution.",
    description:
      "Sri Aurobindo began as a freedom fighter against British rule, then withdrew to Pondicherry for intensive spiritual practice. He developed Integral Yoga—a comprehensive path seeking not escape but transformation of life. His philosophical works present a vast evolutionary vision.",
    keyTeachings: [
      "Evolution is moving toward higher consciousness (Supramental)",
      "Integral Yoga: transformation of mind, life, and body",
      "The Divine is both transcendent and immanent",
      "Earth-life can manifest divine perfection",
    ],
    relevanceToday:
      "Aurobindo's evolutionary spirituality speaks to those seeking meaning in cosmic and planetary terms. His integral approach synthesizes multiple paths.",
    recommendedWorks: [
      "The Life Divine",
      "Synthesis of Yoga",
      "Savitri",
      "Essays on the Gita",
    ],
    tags: ["integral", "evolutionary", "philosophical"],
    icon: "Sun",
  },
  {
    slug: "kalidasa",
    name: "Kalidasa",
    era: "4th-5th century CE (approx.)",
    title: "Poet-Sage of Sanskrit Literature",
    summary:
      "Greatest Sanskrit poet whose works fuse aesthetic beauty with spiritual depth.",
    whatTheyClarified:
      "That poetry and beauty are vehicles for truth—that art can reveal the sacred.",
    description:
      "Kalidasa represents the peak of Sanskrit literary achievement. His plays and poems display extraordinary beauty of language while conveying profound spiritual truths. His works remain the gold standard of Sanskrit literature and continue to inspire.",
    keyTeachings: [
      "Beauty (soundarya) reveals truth",
      "Nature as manifestation of the divine",
      "The rasas (aesthetic emotions) as doorways to experience",
      "Dharma operating through human drama",
    ],
    relevanceToday:
      "Kalidasa demonstrates that the aesthetic and the spiritual are not separate. His works show how art at its highest can convey truth and transform consciousness.",
    recommendedWorks: [
      "Shakuntala",
      "Meghaduta",
      "Kumarasambhava",
      "Raghuvamsha",
    ],
    tags: ["literary", "aesthetic", "classical"],
    icon: "Feather",
  },
];

export function getGreatBySlug(slug: string): Great | undefined {
  return greats.find((g) => g.slug === slug);
}
