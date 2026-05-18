import type { ContentImage } from "@/types/images";

export interface Practice {
  slug: string;
  title: string;
  sanskritName: string;
  summary: string;
  whatItIs: string;
  whoItSuits: string;
  howToBegin: string;
  benefits: string[];
  timeCommitment: string;
  tags: string[];
  icon: string;
  featuredImage?: ContentImage;
  /**
   * Practice-goal pairs that have published "/practices/<practice>/for/<goal>"
   * pages. Source of truth for both the practice hub and the static params in
   * `src/app/practices/[practice]/for/[goal]/page.tsx`. Update both whenever
   * a new intent page ships.
   */
  availableGoals?: string[];
}

export const practices: Practice[] = [
  {
    slug: "japa",
    title: "Japa",
    sanskritName: "जप",
    summary:
      "Repetitive chanting of sacred mantras, often with a mala (prayer beads).",
    whatItIs:
      "Japa is the meditative repetition of a mantra or divine name. Using a mala of 108 beads, practitioners count repetitions while focusing the mind on the sacred sound. It can be done aloud (vaikhari), whispered (upamshu), or mentally (manasika).",
    whoItSuits:
      "Beginners and advanced practitioners alike. Especially suited for those who benefit from structure, those with active minds needing a focus point, and devotional seekers.",
    howToBegin:
      "Choose a mantra (Om, Om Namah Shivaya, or a personal mantra from a teacher). Start with one mala (108 repetitions) daily. Sit comfortably, hold the mala in your right hand, and move one bead per repetition.",
    benefits: [
      "Calms and focuses the mind",
      "Deepens connection with the Divine",
      "Purifies subtle energies",
      "Creates meditative momentum",
    ],
    timeCommitment: "10-30 minutes daily",
    tags: ["meditative", "devotional", "accessible"],
    icon: "Circle",
    availableGoals: ["anxiety", "focus", "devotion", "sleep"],
  },
  {
    slug: "dhyana",
    title: "Dhyana",
    sanskritName: "ध्यान",
    summary: "Meditation practice cultivating sustained, focused awareness.",
    whatItIs:
      "Dhyana is meditation proper—sustained attention on a chosen object, leading to absorption. It is the seventh limb of Patanjali's ashtanga yoga, arising naturally from dharana (concentration) and leading to samadhi (absorption).",
    whoItSuits:
      "All seekers. Particularly valuable for those seeking mental clarity, stress reduction, and deeper self-understanding. Prerequisites: basic ability to sit still and some practice of concentration.",
    howToBegin:
      "Establish a regular time and place. Start with 10-15 minutes. Focus on breath, a mantra, or an inner point. When attention wanders, gently return. Gradually extend duration as practice stabilizes.",
    benefits: [
      "Develops mental stability and clarity",
      "Reduces stress and anxiety",
      "Opens doors to deeper states",
      "Reveals the nature of mind",
    ],
    timeCommitment: "15-60 minutes daily",
    tags: ["meditative", "foundational", "yogic"],
    icon: "Brain",
    availableGoals: ["spiritual-growth", "focus"],
  },
  {
    slug: "kirtan",
    title: "Kirtan",
    sanskritName: "कीर्तन",
    summary: "Devotional call-and-response singing of sacred names and hymns.",
    whatItIs:
      "Kirtan is communal devotional singing, typically in call-and-response format. A leader sings a phrase (often divine names or mantras), and the group responds. Instruments like harmonium, tablas, and kartals create a rhythmic, uplifting atmosphere.",
    whoItSuits:
      "Heart-centered seekers, those who resonate with music, introverts and extroverts alike (participation can be quiet or exuberant), and anyone seeking community practice.",
    howToBegin:
      "Attend a kirtan event at a yoga studio, temple, or spiritual center. You don't need musical skill—simply sing along. Listen to kirtan recordings to learn common chants. Consider starting a small kirtan group.",
    benefits: [
      "Opens the heart through sound and devotion",
      "Creates community and sangha",
      "Bypasses the analytical mind",
      "Generates spiritual joy (ananda)",
    ],
    timeCommitment: "1-2 hours per session",
    tags: ["devotional", "communal", "musical"],
    icon: "Music",
    availableGoals: ["devotion"],
  },
  {
    slug: "puja",
    title: "Puja",
    sanskritName: "पूजा",
    summary:
      "Formal worship ritual honoring the Divine through offerings and ceremony.",
    whatItIs:
      "Puja is ritual worship involving offerings to a deity or sacred object. Elements typically include invocation, offerings (flowers, incense, light, food, water), prayers, mantras, and arati (waving of light). It can be simple or elaborate.",
    whoItSuits:
      "Those drawn to ritual, seekers who appreciate tangible, sensory spirituality, devotees wanting to cultivate relationship with specific deities, and those seeking structure in practice.",
    howToBegin:
      "Set up a small home shrine with an image or symbol of your chosen deity. Learn a simple puja sequence. Offer what you have—a flower, incense, water, a sweet. The sincerity matters more than elaborateness.",
    benefits: [
      "Creates sacred space and time",
      "Cultivates devotion and attention",
      "Engages all senses in worship",
      "Connects with traditional practice",
    ],
    timeCommitment: "15-45 minutes daily",
    tags: ["ritualistic", "devotional", "traditional"],
    icon: "Flame",
    availableGoals: ["devotion"],
  },
  {
    slug: "seva",
    title: "Seva",
    sanskritName: "सेवा",
    summary: "Selfless service offered as spiritual practice and worship.",
    whatItIs:
      "Seva is selfless service performed without expectation of reward. It transforms ordinary action into spiritual practice by offering the fruits to the Divine or for the welfare of others. It's karma yoga in action.",
    whoItSuits:
      "Active, service-oriented people; those who find sitting meditation challenging; householders seeking to integrate spirituality with daily life; and anyone wanting to reduce ego through action.",
    howToBegin:
      "Start where you are—help in your community, temple, or ashram. Perform regular tasks with awareness and offering. Key: do the work without attachment to results or recognition. Reflect on who is truly the doer.",
    benefits: [
      "Purifies the ego through selfless action",
      "Transforms mundane work into sadhana",
      "Generates merit and good karma",
      "Develops humility and compassion",
    ],
    timeCommitment: "Variable—can be integrated into daily life",
    tags: ["active", "karma-yoga", "accessible"],
    icon: "HandHeart",
    availableGoals: ["spiritual-growth"],
  },
  {
    slug: "svadhyaya",
    title: "Svadhyaya",
    sanskritName: "स्वाध्याय",
    summary: "Self-study through sacred texts and introspection.",
    whatItIs:
      "Svadhyaya literally means 'self-study' and includes both study of sacred texts and self-examination. As a niyama in yoga, it involves learning scripture, reciting sacred texts, and reflecting on one's own nature and actions.",
    whoItSuits:
      "Intellectual seekers, those who love learning, practitioners wanting to ground experience in tradition, and anyone seeking to understand both texts and self.",
    howToBegin:
      "Choose one text (Bhagavad Gita is ideal for beginners). Read a small portion daily with contemplation. Keep a journal for reflections. Balance textual study with inquiry into your own experience.",
    benefits: [
      "Deepens understanding of tradition",
      "Provides map for the spiritual journey",
      "Develops discernment (viveka)",
      "Connects personal experience with wisdom tradition",
    ],
    timeCommitment: "20-45 minutes daily",
    tags: ["intellectual", "contemplative", "foundational"],
    icon: "BookOpen",
    availableGoals: ["spiritual-growth"],
  },
  {
    slug: "pranayama",
    title: "Pranayama",
    sanskritName: "प्राणायाम",
    summary:
      "Breath regulation techniques that harness vital life force (prana) for physical health, mental clarity, and spiritual awakening.",
    whatItIs:
      "Pranayama is the fourth limb of Patanjali's Ashtanga Yoga, meaning the extension and control of prana (life force) through the breath. Techniques range from simple breath awareness to advanced practices like Nadi Shodhana (alternate nostril breathing), Kapalabhati (skull-shining breath), and Bhastrika (bellows breath). Each technique has specific effects on the nervous system and subtle energy body.",
    whoItSuits:
      "All practitioners, from beginners to advanced. Especially beneficial for those dealing with stress, anxiety, or scattered attention. Those preparing for deeper meditation will find pranayama essential for stabilizing the mind.",
    howToBegin:
      "Start with simple breath awareness: observe your natural breath for 5 minutes. Then practice Nadi Shodhana (alternate nostril breathing) for 5-10 minutes. Always practice on an empty stomach, ideally in the morning. Learn from a qualified teacher before attempting advanced techniques.",
    benefits: [
      "Calms the nervous system and reduces stress",
      "Increases mental clarity and focus",
      "Balances the subtle energy channels (nadis)",
      "Prepares the mind for meditation",
    ],
    timeCommitment: "10-30 minutes daily",
    tags: ["yogic", "foundational", "meditative"],
    icon: "Wind",
  },
  {
    slug: "yoga-sadhana",
    title: "Yoga as Sadhana",
    sanskritName: "योग साधना",
    summary:
      "Physical yoga practice as spiritual discipline, not merely exercise.",
    whatItIs:
      "Yoga sadhana approaches asana (postures) and pranayama (breath work) as spiritual practice rather than physical exercise. The body becomes a vehicle for awakening, and practice includes the ethical foundations (yamas/niyamas) and meditative dimensions.",
    whoItSuits:
      "Those drawn to embodied spirituality, seekers who need to work with physical energy, practitioners wanting to integrate body, breath, and mind, and anyone seeking a complete system.",
    howToBegin:
      "Find a teacher who emphasizes the spiritual dimensions of yoga. Establish a regular morning practice. Include pranayama and meditation, not just asana. Study the Yoga Sutras to understand the larger context.",
    benefits: [
      "Purifies and prepares the body for meditation",
      "Balances and awakens subtle energies",
      "Develops discipline and awareness",
      "Integrates physical and spiritual life",
    ],
    timeCommitment: "30-90 minutes daily",
    tags: ["embodied", "disciplined", "systematic"],
    icon: "Leaf",
    availableGoals: ["focus"],
  },
  {
    slug: "vrat",
    title: "Vrat / Upavasa",
    sanskritName: "व्रत / उपवास",
    summary: "Sacred fasting and vows as purification and devotional practice.",
    whatItIs:
      "Vrat (vow) and upavasa (fasting) are observances involving abstention—from food, speech, or other activities—for spiritual purposes. Traditional vrats are tied to lunar days (Ekadashi), festivals, or personal intentions.",
    whoItSuits:
      "Those seeking purification, practitioners wanting to test and strengthen will, devotees honoring traditional observances, and seekers preparing for intensive practices.",
    howToBegin:
      "Start with a simple fast—perhaps one meal less, or light food on Ekadashi. Combine fasting with increased spiritual practice (japa, meditation, reading). Set clear intention. Break fast mindfully.",
    benefits: [
      "Purifies body and mind",
      "Strengthens will and discipline",
      "Creates space for deeper practice",
      "Honors traditional rhythms",
    ],
    timeCommitment: "Variable—single days to extended periods",
    tags: ["purifying", "disciplined", "traditional"],
    icon: "Moon",
  },
];

export function getPracticeBySlug(slug: string): Practice | undefined {
  return practices.find((p) => p.slug === slug);
}
