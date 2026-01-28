export interface Tradition {
  slug: string;
  title: string;
  summary: string;
  coreOrientation: string;
  primaryPractices: string[];
  tone: "devotional" | "contemplative" | "ritualistic" | "yogic" | "mystical";
  description: string;
  keyIdeas: string[];
  whoItSuits: string;
  howToStart: string;
  tags: string[];
  icon: string;
}

export const traditions: Tradition[] = [
  {
    slug: "shaivism",
    title: "Shaivism",
    summary: "Worship of Shiva as the supreme reality, encompassing diverse paths from devotion to tantra.",
    coreOrientation: "Shiva as supreme consciousness, destroyer of ignorance, and the ultimate yogi",
    primaryPractices: ["Shiva puja", "Japa of Panchakshari", "Meditation", "Sacred ash (vibhuti)"],
    tone: "contemplative",
    description: "Shaivism represents one of the oldest and most diverse traditions within Hinduism, with Shiva worshipped as the supreme being. It ranges from devotional temple worship to sophisticated non-dual philosophies.",
    keyIdeas: [
      "Shiva as Nataraja—the cosmic dancer",
      "The linga as symbol of formless reality",
      "Five acts: creation, preservation, destruction, concealment, grace",
      "Liberation through Shiva's grace and self-knowledge"
    ],
    whoItSuits: "Contemplatives, those drawn to ascetic ideals, seekers attracted to non-dual philosophy with devotional elements.",
    howToStart: "Learn the Panchakshari mantra (Om Namah Shivaya), visit a Shiva temple, and study basic Shaiva texts.",
    tags: ["devotional", "contemplative", "non-dual"],
    icon: "Moon"
  },
  {
    slug: "shaktism",
    title: "Shaktism",
    summary: "Worship of the Divine Feminine as the supreme creative power of the universe.",
    coreOrientation: "Shakti (divine power) as the supreme reality; the Goddess as mother, warrior, and wisdom",
    primaryPractices: ["Devi puja", "Mantra sadhana", "Yantra worship", "Navaratri observance"],
    tone: "devotional",
    description: "Shaktism centers on the worship of Shakti, the divine feminine power. The Goddess appears in myriad forms—nurturing as Lakshmi, fierce as Kali, wise as Saraswati—representing the dynamic, creative force of existence.",
    keyIdeas: [
      "The universe is the Goddess's body and play",
      "Shakti and Shiva are inseparable—power and consciousness",
      "The Goddess is both transcendent and immanent",
      "Sacred feminine as gateway to liberation"
    ],
    whoItSuits: "Those drawn to divine feminine energy, seekers comfortable with paradox, and those attracted to transformative spiritual power.",
    howToStart: "Begin with simple Devi worship, learn a Shakti mantra, and observe Navaratri with devotion.",
    tags: ["devotional", "tantric", "feminine"],
    icon: "Sparkles"
  },
  {
    slug: "vaishnavism",
    title: "Vaishnavism",
    summary: "Devotion to Vishnu and his avatars, especially Rama and Krishna, as the supreme Lord.",
    coreOrientation: "Vishnu as preserver and protector; loving relationship with God through bhakti",
    primaryPractices: ["Vishnu puja", "Nama japa", "Temple worship", "Ekadashi fasting"],
    tone: "devotional",
    description: "Vaishnavism is the largest denomination within Hinduism, centered on devotion to Vishnu and his avatars. It emphasizes a loving, personal relationship with God and the path of bhakti as supreme.",
    keyIdeas: [
      "Vishnu incarnates to restore dharma (avatara doctrine)",
      "Bhakti (devotion) is the primary path to liberation",
      "Grace is essential; surrender (prapatti) is powerful",
      "The divine name has liberating power"
    ],
    whoItSuits: "Those who feel natural devotion, seekers wanting personal relationship with God, and those drawn to Krishna or Rama.",
    howToStart: "Read the Bhagavad Gita, practice japa of a Vishnu mantra, and explore kirtan and devotional singing.",
    tags: ["devotional", "theistic", "bhakti"],
    icon: "Heart"
  },
  {
    slug: "smartism",
    title: "Smartism",
    summary: "Liberal tradition accepting multiple deities as aspects of one Brahman.",
    coreOrientation: "All major deities are forms of one ultimate reality; freedom in worship",
    primaryPractices: ["Panchayatana puja", "Study of shastras", "Traditional rituals", "Personal ishta-devata"],
    tone: "ritualistic",
    description: "Smartism, associated with Adi Shankaracharya, represents a liberal tradition that accepts the worship of multiple deities as equally valid paths. It emphasizes both ritual observance and philosophical understanding.",
    keyIdeas: [
      "Five deities (Vishnu, Shiva, Shakti, Ganesha, Surya) as Brahman's forms",
      "Advaita Vedanta as philosophical foundation",
      "Both karma (action) and jnana (knowledge) are valid paths",
      "Flexibility in practice with orthodoxy in principle"
    ],
    whoItSuits: "Those who appreciate multiple forms of the divine, seekers wanting philosophical grounding with ritual practice, and those from traditional Hindu backgrounds.",
    howToStart: "Learn about Panchayatana worship, study Advaita basics, and establish a personal shrine with chosen deities.",
    tags: ["inclusive", "philosophical", "ritualistic"],
    icon: "Sunrise"
  },
  {
    slug: "tantra",
    title: "Tantra",
    summary: "Esoteric traditions using body, energy, and ritual as vehicles for spiritual transformation.",
    coreOrientation: "The body as temple; all experience as potentially liberating; integration not renunciation",
    primaryPractices: ["Mantra sadhana", "Kundalini practices", "Nyasa (sacred touch)", "Yantra meditation"],
    tone: "mystical",
    description: "Tantra represents esoteric traditions found across Shaiva, Shakta, and Buddhist contexts. It emphasizes the body as a vehicle for liberation, the transformation of desire, and the awakening of subtle energies.",
    keyIdeas: [
      "The body is a microcosm of the universe",
      "Energy (shakti/kundalini) as vehicle for awakening",
      "What binds can also liberate when understood",
      "Guru transmission is essential for authentic practice"
    ],
    whoItSuits: "Serious seekers with stable foundations, those drawn to energy practices, and practitioners ready for systematic, guided work.",
    howToStart: "Find a qualified teacher, develop stable meditation practice first, and approach with respect rather than sensationalism.",
    tags: ["esoteric", "energy", "transformative"],
    icon: "Zap"
  },
  {
    slug: "bhakti-lineages",
    title: "Bhakti Lineages",
    summary: "Medieval devotional movements emphasizing love, song, and direct experience of the Divine.",
    coreOrientation: "Pure love of God transcends caste, learning, and formal ritual",
    primaryPractices: ["Kirtan", "Nama japa", "Poetry and song", "Satsang"],
    tone: "devotional",
    description: "The Bhakti movements, arising especially in medieval India, democratized spirituality through emphasis on love, devotional poetry, and the salvific power of the divine name. Saints like Kabir, Mirabai, and Tukaram made the path accessible to all.",
    keyIdeas: [
      "Love is the most direct path to God",
      "The divine name has liberating power",
      "Caste and gender are transcended in devotion",
      "Emotion and ecstasy have spiritual validity"
    ],
    whoItSuits: "Emotional and heart-centered seekers, those who love music and poetry, and anyone seeking accessible, egalitarian spirituality.",
    howToStart: "Attend kirtan sessions, read poetry of the Bhakti saints, and practice simple devotional singing.",
    tags: ["devotional", "accessible", "musical"],
    icon: "Music"
  },
  {
    slug: "kashmir-shaivism",
    title: "Kashmir Shaivism",
    summary: "Non-dual Shaiva philosophy seeing the universe as Shiva's creative self-expression.",
    coreOrientation: "All reality is consciousness (Shiva) in dynamic creative expression (Shakti)",
    primaryPractices: ["Spanda meditation", "Recognition practices", "Mantra", "Study of pratyabhijna"],
    tone: "mystical",
    description: "Kashmir Shaivism represents a sophisticated non-dual philosophy arising in Kashmir, teaching that consciousness (Shiva) continuously manifests as the universe through creative power (Shakti). It offers both profound philosophy and practical methods.",
    keyIdeas: [
      "Consciousness alone exists in infinite variety",
      "The universe is real, as Shiva's self-expression",
      "Recognition (pratyabhijna) of one's true nature liberates",
      "All states of consciousness are doorways to the ultimate"
    ],
    whoItSuits: "Philosophical seekers attracted to non-duality, those interested in consciousness studies, and practitioners wanting integration of philosophy and practice.",
    howToStart: "Study the Shiva Sutras, learn basic recognition practices, and find qualified teachers in this tradition.",
    tags: ["non-dual", "philosophical", "mystical"],
    icon: "Eye"
  }
];

export function getTraditionBySlug(slug: string): Tradition | undefined {
  return traditions.find(t => t.slug === slug);
}

export function getToneColor(tone: Tradition["tone"]): string {
  const colors = {
    devotional: "bg-rose-100 text-rose-800",
    contemplative: "bg-indigo-100 text-indigo-800",
    ritualistic: "bg-amber-100 text-amber-800",
    yogic: "bg-emerald-100 text-emerald-800",
    mystical: "bg-purple-100 text-purple-800"
  };
  return colors[tone];
}
