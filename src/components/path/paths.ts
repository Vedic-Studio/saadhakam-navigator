/**
 * Learning-path content model + seeded paths.
 *
 * A path is an ordered list of steps. Each step links to existing content on the
 * site (no new content pages are created here) and carries a short intro written
 * in the Sadhaka voice. Step numbers are 1-indexed to match the `step_n` property
 * of the `path_step_complete` event; `totalSteps` is `steps.length`.
 *
 * This is plain data (no `window`, no React), safe to import in Server Components
 * and in tests. Link hrefs point at routes that already exist:
 *   - /six-darshanas (the overview hub)
 *   - /philosophies/<slug> (the per-school darshana pages)
 *   - /what-is-vedanta, /advaita-vedanta-explained, /yoga-sutras-complete-guide,
 *     /difference-between-yoga-and-vedanta (editorial articles)
 */

/** A single link from a path step to existing site content. */
export interface PathStepLink {
  label: string;
  href: string;
}

/** One ordered step in a learning path. */
export interface PathStep {
  /** 1-indexed position, matching the `step_n` analytics property. */
  step: number;
  /** Short label for the school / topic. */
  title: string;
  /** One-line subtitle (founder + sutra text), shown under the title. */
  source: string;
  /** Two to three sentences of orientation, in the Sadhaka voice. */
  intro: string;
  /** Links into existing content for this step. */
  links: PathStepLink[];
}

/** A complete, ordered learning path. */
export interface LearningPath {
  /** Stable id used as the analytics `path_id` and the URL slug. */
  id: string;
  /** Page title. */
  title: string;
  /** One-sentence promise of what completing the path gives the reader. */
  summary: string;
  /** Who the path is for and the prerequisite level. */
  audience: string;
  /** Estimated reading commitment across all steps. */
  estimate: string;
  /** Ordered steps. `step` runs 1..steps.length. */
  steps: PathStep[];
}

const darshanasFoundations: LearningPath = {
  id: "darshanas-foundations",
  title: "Six Darshanas: Foundations",
  summary:
    "Read the six classical schools of Indian philosophy in the order they build on each other, from logic to liberation.",
  audience:
    "For readers new to Indian philosophy. No Sanskrit and no prior reading assumed.",
  estimate: "Six short steps, about 35 minutes of reading.",
  steps: [
    {
      step: 1,
      title: "Nyaya",
      source: "Gautama (Akshapada), Nyaya Sutras",
      intro:
        "Start with method, because every later school argues by its rules. Nyaya built classical India's logic: how a valid inference is structured, what counts as proof, and how a claim survives debate. Get this first and the other five stop sounding like assertions and start sounding like arguments you can check.",
      links: [
        { label: "Nyaya and Vaisheshika", href: "/philosophies/nyaya-vaisheshika" },
        { label: "The six darshanas, side by side", href: "/six-darshanas" },
      ],
    },
    {
      step: 2,
      title: "Vaisheshika",
      source: "Kanada, Vaisheshika Sutras",
      intro:
        "Nyaya gave you the reasoning; Vaisheshika gives you the things to reason about. It is the inventory school: it lists the categories of what exists and reduces the physical world to indivisible atoms. Logic needs an ontology to work on, which is why the tradition fused the two into a single Nyaya-Vaisheshika line.",
      links: [
        { label: "Nyaya and Vaisheshika", href: "/philosophies/nyaya-vaisheshika" },
        { label: "Where it sits among the six", href: "/six-darshanas" },
      ],
    },
    {
      step: 3,
      title: "Samkhya",
      source: "Kapila; Ishvarakrishna, Samkhya Karika",
      intro:
        "Samkhya is the oldest systematic metaphysics in India, and it draws one hard line: purusha, bare consciousness, is not prakriti, the nature that evolves through three gunas. Almost every Indian map of the mind borrows this split. Read it now and the Yoga path in the next step has a terrain to cross.",
      links: [
        { label: "Samkhya", href: "/philosophies/samkhya" },
        { label: "The three traditional pairings", href: "/six-darshanas" },
      ],
    },
    {
      step: 4,
      title: "Yoga",
      source: "Patanjali, Yoga Sutras",
      intro:
        "Yoga takes Samkhya's map and supplies the route it lacked. Patanjali's eightfold ashtanga discipline is a method for isolating purusha from prakriti, ending in kaivalya. This is the darshana behind the word everyone thinks they already know, so read it before you decide what yoga is.",
      links: [
        { label: "Yoga darshana", href: "/philosophies/yoga-darshana" },
        { label: "The Yoga Sutras, a complete guide", href: "/yoga-sutras-complete-guide" },
        { label: "Yoga vs Vedanta: the real difference", href: "/difference-between-yoga-and-vedanta" },
      ],
    },
    {
      step: 5,
      title: "Purva Mimamsa",
      source: "Jaimini, Mimamsa Sutras",
      intro:
        "Mimamsa reads the ritual half of the Veda and asks a narrow question with wide consequences: what does an injunction actually command, and how do you resolve a text that seems to contradict itself? Its rules of interpretation became the template for classical Indian hermeneutics. It also sets up the split in the final step.",
      links: [
        { label: "Mimamsa", href: "/philosophies/mimamsa" },
        { label: "Astika and the karma-kanda", href: "/six-darshanas" },
      ],
    },
    {
      step: 6,
      title: "Vedanta (Uttara Mimamsa)",
      source: "Badarayana, Brahma Sutras",
      intro:
        "Vedanta reads the other half of the Veda, the Upanishads, and inquires into Brahman. It is one sutra text and three rival readings: Advaita, Vishishtadvaita, and Dvaita, which agree on the source and disagree sharply on the relation between self and Brahman. End here, because this is where the foundations you have laid get put to work.",
      links: [
        { label: "Vedanta", href: "/philosophies/vedanta" },
        { label: "What is Vedanta?", href: "/what-is-vedanta" },
        { label: "Advaita Vedanta explained", href: "/advaita-vedanta-explained" },
      ],
    },
  ],
};

/** All learning paths, keyed for lookup by the route layer. */
export const learningPaths: LearningPath[] = [darshanasFoundations];

/** Look up a path by its slug/id. Returns undefined when not found. */
export function getLearningPathBySlug(slug: string): LearningPath | undefined {
  return learningPaths.find((path) => path.id === slug);
}
