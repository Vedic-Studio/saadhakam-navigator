export type ComparisonCategory =
  | "Philosophy vs Philosophy"
  | "Practice vs Practice"
  | "Path vs Path"
  | "Western vs Eastern"
  | "Teacher vs Teacher"
  | "Text vs Text"
  | "Concept vs Concept"
  | "Platform / Competitor";

export interface Comparison {
  slug: string;
  title: string;
  category: ComparisonCategory;
  entityA: string;
  entityB: string;
  metaDescription: string;
  tldr?: string;
  content?: string; // Markdown or detailed HTML content
}

export const comparisons: Comparison[] = [
  // Category 1: Philosophy vs Philosophy
  {
    slug: "advaita-vs-dvaita",
    title: "Advaita vs Dvaita Vedanta: Non-Duality vs Dualism",
    category: "Philosophy vs Philosophy",
    entityA: "Advaita Vedanta",
    entityB: "Dvaita Vedanta",
    metaDescription:
      "Understand the core differences between Advaita (Non-Duality) and Dvaita (Dualism), two foundational philosophies of Sanatan Dharma.",
    tldr: "Advaita Vedanta teaches that the individual soul (Atman) and the ultimate reality (Brahman) are strictly identical. Dvaita Vedanta teaches that the soul and God are eternally distinct.",
    content: `
## The Core Distinction

At the heart of Hindu philosophy is the debate on the nature of reality. Is everything ultimately one, or is there a fundamental separation between the creator and the created?

### Advaita Vedanta (Non-Duality)
Founded by Adi Shankaracharya, Advaita teaches that Brahman (the ultimate reality) is the only truth. The world is an illusion (Maya), and the individual soul (Atman) is entirely non-different from Brahman. Liberation (Moksha) is simply the realization of this preexisting, non-dual truth.

### Dvaita Vedanta (Dualism)
Propounded by Madhvacharya, Dvaita asserts a strict distinction between God (Vishnu/Brahman), the individual souls (Jivas), and matter (Prakriti). God is supreme and independent, while souls are dependent. Devotion (Bhakti) is the primary path to salvation.

## Key Differences at a Glance
- **Nature of God**: Formless Absolute (Advaita) vs. Personal Deity (Dvaita).
- **The World**: Illusion or relative reality (Advaita) vs. Absolutely real (Dvaita).
- **The Soul**: Identical to God (Advaita) vs. A servant of God (Dvaita).
    `,
  },
  {
    slug: "advaita-vs-vishishtadvaita",
    title: "Advaita vs Vishishtadvaita: Shankara vs Ramanuja",
    category: "Philosophy vs Philosophy",
    entityA: "Advaita",
    entityB: "Vishishtadvaita",
    metaDescription:
      "Compare Advaita (Non-Duality) and Vishishtadvaita (Qualified Non-Duality) to see how Shankara and Ramanuja viewed the individual soul and God.",
  },
  {
    slug: "shaivism-vs-vaishnavism",
    title: "Shaivism vs Vaishnavism: Two Paths of Devotion",
    category: "Philosophy vs Philosophy",
    entityA: "Shaivism",
    entityB: "Vaishnavism",
    metaDescription:
      "Explore the differences and similarities between Shaivism (focusing on Shiva) and Vaishnavism (focusing on Vishnu) in Hindu practice.",
  },
  {
    slug: "samkhya-vs-yoga",
    title: "Samkhya vs Yoga Philosophy: Theory vs Practice",
    category: "Philosophy vs Philosophy",
    entityA: "Samkhya",
    entityB: "Yoga",
    metaDescription:
      "Learn how Samkhya provides the theoretical framework of consciousness and matter, while Yoga provides the practical method for liberation.",
  },
  // Category 2: Practice vs Practice
  {
    slug: "japa-vs-dhyana",
    title: "Japa vs Dhyana: Mantra Repetition vs Silent Meditation",
    category: "Practice vs Practice",
    entityA: "Japa",
    entityB: "Dhyana",
    metaDescription:
      "Which meditation practice is right for you? Compare Japa (mantra repetition) with Dhyana (silent contemplation).",
  },
  {
    slug: "vipassana-vs-transcendental-meditation",
    title: "Vipassana vs Transcendental Meditation",
    category: "Practice vs Practice",
    entityA: "Vipassana",
    entityB: "Transcendental Meditation",
    metaDescription:
      "Understand the differences in technique, origin, and goals between Vipassana mindfulness and Transcendental Meditation (TM).",
  },
  {
    slug: "hatha-yoga-vs-raja-yoga",
    title: "Hatha Yoga vs Raja Yoga",
    category: "Practice vs Practice",
    entityA: "Hatha Yoga",
    entityB: "Raja Yoga",
    metaDescription:
      "Hatha Yoga focuses on the physical body and energy, while Raja Yoga deals mostly with mind control. Learn how they intersect.",
  },
  {
    slug: "bhakti-vs-jnana",
    title: "Bhakti Yoga vs Jnana Yoga: Devotion vs Knowledge",
    category: "Practice vs Practice",
    entityA: "Bhakti Yoga",
    entityB: "Jnana Yoga",
    metaDescription:
      "Should you follow the path of love (Bhakti) or the path of intellect and self-inquiry (Jnana)? Compare these two classical yogas.",
  },
  // Category 4: Western vs Eastern
  {
    slug: "mindfulness-vs-dhyana",
    title: "Mindfulness vs Dhyana: Western vs Vedic Meditation",
    category: "Western vs Eastern",
    entityA: "Mindfulness",
    entityB: "Dhyana",
    metaDescription:
      "Is modern mindfulness the same as traditional Dhyana? Discover how Western psychology adapted eastern meditative techniques.",
    tldr: "Mindfulness, as practiced in the West, is primarily used for stress reduction and present-moment awareness. Dhyana (Vedic meditation) is a profound state of concentration intended to lead beyond the mind entirely.",
    content: `
## The Western Adaptation vs The Eastern Roots

### Mindfulness (Modern Western Concept)
Rooted in Buddhist Vipassana but popularized by Jon Kabat-Zinn, modern mindfulness strips away religious context. It focuses on non-judgmental awareness of the present moment to alleviate anxiety, stress, and depression.

### Dhyana (Vedic/Yogic Tradition)
Dhyana is the seventh limb of Patanjali's Ashtanga Yoga. It is an uninterrupted flow of concentration toward a single object or concept, eventually leading to Samadhi (complete absorption and liberation). 

## Key Differences
1. **The Goal**: Mental health and focus (Mindfulness) vs. Spiritual liberation and transcending the ego (Dhyana).
2. **The Method**: Open awareness of whatever arises (Mindfulness) vs. Sustained, one-pointed focus (Dhyana).
3. **The Context**: Often secular and clinical (Mindfulness) vs. Deeply rooted in Dharmic philosophy and spiritual evolution (Dhyana).
    `,
  },
  {
    slug: "stoicism-vs-vedanta",
    title: "Stoicism vs Vedanta: East Meets West",
    category: "Western vs Eastern",
    entityA: "Stoicism",
    entityB: "Vedanta",
    metaDescription:
      "Compare the ancient Greek philosophy of Stoicism with the Indian wisdom of Vedanta on achieving peace of mind and understanding reality.",
  },
  {
    slug: "psychology-vs-yoga-philosophy",
    title: "Western Psychology vs Yoga Philosophy",
    category: "Western vs Eastern",
    entityA: "Western Psychology",
    entityB: "Yoga Philosophy",
    metaDescription:
      "How does modern psychology compare to the ancient science of Yoga in understanding the human mind and consciousness?",
  },
  {
    slug: "freud-vs-patanjali",
    title: "Freud's Unconscious vs Patanjali's Chitta",
    category: "Western vs Eastern",
    entityA: "Freudian Psychology",
    entityB: "Patanjali's Yoga",
    metaDescription:
      "A deep dive comparing Sigmund Freud's model of the unconscious mind with Patanjali's concept of Chitta and Samskaras.",
  },
  {
    slug: "sin-vs-karma",
    title: "Sin vs Karma: Western Guilt vs Eastern Consequence",
    category: "Western vs Eastern",
    entityA: "Sin",
    entityB: "Karma",
    metaDescription:
      "Explore the profound difference between the Abrahamic concept of Sin (moral transgression) and the Dharmic Law of Karma (cause and effect).",
  },
  // Category 7: Concept vs Concept
  {
    slug: "karma-vs-dharma",
    title: "Karma vs Dharma: What's the Difference?",
    category: "Concept vs Concept",
    entityA: "Karma",
    entityB: "Dharma",
    metaDescription:
      "Understand the relationship between Karma (action and consequence) and Dharma (duty and cosmic order) in Hinduism.",
    tldr: "Karma refers to the universal law of cause and effect—every action has a reaction. Dharma refers to one's fundamental duty, righteous path, and the cosmic order that sustains the universe.",
    content: `
## Action vs. Duty

These two terms are perhaps the most famous—and most misunderstood—concepts from Sanatan Dharma.

### Karma (The Law of Action)
Karma translates simply to "action." Philosophically, it means that every action, thought, or word sets a ripple into motion that will eventually return to the doer. It is a system of cosmic physics, not a system of divine punishment.

### Dharma (The Law of Being)
Dharma is a much more complex word without a direct English translation. It comes from the root *dhri*, meaning "to uphold." It is the right way of living, your personal duty (Svadharma), and the underlying order of nature.

## How They Intersect
You perform Karma (actions) in accordance with (or against) your Dharma (nature/duty). If your actions align with Dharma, you generate positive merit and move closer to liberation. If your actions violate Dharma, you accumulate binding Karma that causes future suffering.
    `,
  },
  {
    slug: "maya-vs-illusion",
    title: "Maya vs Illusion: Is the World Real?",
    category: "Concept vs Concept",
    entityA: "Maya",
    entityB: "Illusion",
    metaDescription:
      "Maya is often translated as 'illusion', but it means something much deeper. Let's compare Maya with the Western concept of an illusion.",
  },
  {
    slug: "atman-vs-brahman",
    title: "Atman vs Brahman: Self and Absolute",
    category: "Concept vs Concept",
    entityA: "Atman",
    entityB: "Brahman",
    metaDescription:
      "What is the difference between Atman (the individual soul) and Brahman (the universal consciousness) in Vedanta?",
  },
  {
    slug: "moksha-vs-mukti",
    title: "Moksha vs Mukti: Are They the Same?",
    category: "Concept vs Concept",
    entityA: "Moksha",
    entityB: "Mukti",
    metaDescription:
      "Explore the nuances between Moksha and Mukti in Hindu thought representing ultimate liberation.",
  },
  // Category 8: Platform / Competitor
  {
    slug: "sadhaka-vs-sadhguru-app",
    title: "Sadhaka vs Sadhguru App: Which is Right for You?",
    category: "Platform / Competitor",
    entityA: "Sadhaka",
    entityB: "Sadhguru App",
    metaDescription:
      "Comparing the Sadhaka platform and the Sadhguru App. Find out which app aligns better with your spiritual journey.",
    tldr: "The Sadhguru App is highly focused on a single charismatic leader and his specific organization's practices (Isha). Sadhaka is a lineage-agnostic, AI-powered platform designed to help you discover the specific tradition and practice that fits you best.",
    content: `
## Teacher-Led vs Discovery-Led

### The Sadhguru App
The Isha Foundation's app is a powerful tool if you resonate with Sadhguru's teachings. It offers excellent guided meditations (like Isha Kriya), daily quotes, and access to his extensive video library. Its primary goal is to facilitate Isha Yoga practices.

### Sadhaka
Sadhaka takes a different approach. We believe there is no "one size fits all" guru. Sadhaka uses the "Faith Finder" and AI-driven guidance to introduce you to the vast Ocean of Sanatan Dharma—from Advaita Vedanta to Classical Tantra, from Patanjali to Ramana Maharshi. 

## Summary
Choose the Sadhguru App if you are a devoted follower of Isha Yoga. Choose Sadhaka if you want to explore the breadth of India's 10,000-year-old wisdom traditions and find the specific path that matches your unique psychological makeup.
    `,
  },
  {
    slug: "sadhaka-vs-insight-timer",
    title: "Sadhaka vs Insight Timer",
    category: "Platform / Competitor",
    entityA: "Sadhaka",
    entityB: "Insight Timer",
    metaDescription:
      "Insight Timer offers thousands of meditations, but lacks a cohesive path. See how Sadhaka provides structured spiritual guidance.",
  },
  {
    slug: "sadhaka-vs-headspace",
    title: "Sadhaka vs Headspace: Dharma vs McMindfulness",
    category: "Platform / Competitor",
    entityA: "Sadhaka",
    entityB: "Headspace",
    metaDescription:
      "Compare the deep, lineage-based wisdom of Sadhaka with the secular, gamified mindfulness of Headspace.",
  },
];
