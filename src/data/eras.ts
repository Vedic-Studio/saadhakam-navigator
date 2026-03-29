// =============================================================================
// Timeline Eras — Standalone pSEO-ready data file
// =============================================================================
// Extracted from history.ts and expanded with deep narratives + global context.
// Source: docs/research/ancient-indian-timeline-research.md
// =============================================================================

// -----------------------------------------------------------------------------
// Interfaces
// -----------------------------------------------------------------------------

export interface EraGlobalContext {
  region: string;
  description: string;
}

export interface EraProfile {
  id: string;
  name: string;
  dateRange: string;
  startYear: number; // negative = BCE
  endYear: number;
  color: string; // Tailwind color token
  description: string; // 300-600 word narrative for pSEO page
  significance: string; // 1-2 sentence summary
  globalContext: EraGlobalContext[]; // what was happening elsewhere
  relatedSites: string[]; // site IDs
  relatedEvidence: string[]; // evidence IDs
  relatedDynasties: string[]; // dynasty IDs
  relatedResearchers: string[]; // researcher IDs
  keyQuestions: string[]; // open questions about this era
  metaDescription: string;
}

// -----------------------------------------------------------------------------
// Data
// -----------------------------------------------------------------------------

export const eras: EraProfile[] = [
  {
    id: "vedic",
    name: "Rigvedic Period",
    dateRange: "22,000+ — 14,500 BCE",
    startYear: -22000,
    endYear: -14500,
    color: "amber",
    description:
      "In the Oak-Bhaty framework, the oldest mandalas of the Rigveda (6, 3, 7, 4, 2) were composed before 24,000 years ago. This dating rests on precession-encoded astronomical references within the hymns — references that can only correspond to specific celestial configurations at deep antiquity. Rupa Bhaty's analysis of Surya Siddhanta epochs identifies multiple independent update timestamps, with the earliest at approximately 14,500 BCE, where three simultaneously satisfied observations converge: two pole stars (Abhijit/Vega near the north and Agastya/Canopus near the south) and Earth's obliquity at 24 degrees.\n\nThis is the most radical departure from mainstream chronology. Conventional Indology places the Rigveda at 1500–1200 BCE based on linguistic and archaeological correlations. Oak's counter: linguistic dating cannot address astronomical data, and the absence of archaeological evidence at this depth is explained by the Last Glacial Maximum — when sea levels were 120 meters lower, vast continental shelves were exposed, and most human habitation would have been in now-submerged coastal zones.\n\nThe Rigveda describes a grand Saraswati fed by glacial meltwater — consistent with Late Pleistocene conditions. The hymns celebrate a society with sophisticated astronomical knowledge, complex ritual practices, and detailed geographical awareness. Whether this represents actual composition dates or accumulated oral tradition encoding older observations is an open question.\n\nBhimbetka's 100,000+ year occupation record proves continuous human presence in the subcontinent during this period. The question is not whether people were there, but whether they possessed the cultural complexity the Rigveda describes.",
    significance:
      "The most ancient proposed era — placing Rigvedic composition in the Late Pleistocene, contemporaneous with the Last Glacial Maximum.",
    globalContext: [
      {
        region: "Europe",
        description:
          "Last Glacial Maximum. Cave art at Lascaux (~17,000 BCE) and Altamira (~15,000 BCE). Magdalenian hunter-gatherer culture.",
      },
      {
        region: "Levant",
        description:
          "Pre-Natufian. Ohalo II site (~21,000 BCE) shows early grain processing. No permanent settlements.",
      },
      {
        region: "Americas",
        description:
          "Debate over pre-Clovis occupation. White Sands footprints dated to 21,000–23,000 BP. Beringia land bridge open.",
      },
      {
        region: "Global",
        description:
          "Ice sheets cover northern Europe and North America. Sea levels 120m below present. Vast coastal plains exposed.",
      },
    ],
    relatedSites: ["bhimbetka"],
    relatedEvidence: ["av-observation"],
    relatedDynasties: ["suryavansha", "chandravansha"],
    relatedResearchers: ["nilesh-oak", "rupa-bhaty"],
    keyQuestions: [
      "Can precession-encoded references in hymns distinguish composition date from observation date?",
      "Does the Rigveda describe actual Pleistocene conditions, or are these later interpolations?",
      "What archaeological evidence could confirm or falsify deep Rigvedic antiquity?",
    ],
    metaDescription:
      "The Rigvedic Period (22,000–14,500 BCE): Oak and Bhaty's archaeoastronomical dating of the oldest Rigvedic hymns to the Late Pleistocene.",
  },
  {
    id: "ramayana",
    name: "Ramayana Era",
    dateRange: "12,209 BCE",
    startYear: -12209,
    endYear: -12200,
    color: "emerald",
    description:
      "Nilesh Oak dates the Ramayana war to 12,209 BCE by testing 345+ astronomical references from the Valmiki Ramayana. His 2024 work Sugriva's Atlas adds 600+ observations, mapping Valmiki's geographical descriptions to ancient world geography. The dating places the Ramayana at the end of the Pleistocene, just before the Younger Dryas catastrophe (~12,800–11,500 BP).\n\nClimate descriptions in the Valmiki Ramayana support a Pleistocene setting: Nashik experiencing snow (hima), extended winters, shortened hot seasons. Sugriva's instructions to the Vanarasena describe geographical features in all cardinal directions — including polar regions, what appears to be the Aurora Borealis, and landmarks from Uday-giri (identified with modern Chile) to Asta-giri (the Alps). This global geographical knowledge is either genuine ancient awareness or an extraordinary coincidence.\n\nTwo pole stars are described simultaneously: Abhijit (Vega) near the north celestial pole and Agastya (Canopus) near the south. Bhaty's Surya Siddhanta analysis confirms both stars occupied these positions around this epoch.\n\nThe Archaeological gap remains the primary challenge. No known settlements from 12,000 BCE match the urban civilization described in the Ramayana. Oak argues that 120 meters of post-glacial sea rise submerged all coastal settlements, organic materials cannot survive 14,000 years, and current Indian archaeology has barely scratched the surface of pre-Harappan layers. The question becomes: does absence of archaeological evidence at one specific date falsify 345+ converging astronomical observations at that same date?",
    significance:
      "Oak's proposed date for the Ramayana war, supported by 345+ astronomical observations and Pleistocene-consistent climate descriptions.",
    globalContext: [
      {
        region: "Turkey",
        description:
          "Göbekli Tepe construction begins ~9,600 BCE — still approximately 2,600 years in the future.",
      },
      {
        region: "Levant",
        description:
          "Natufian culture: semi-settled villages, earliest bread-making (~14,400 BP). Transitioning from foraging to cultivation.",
      },
      {
        region: "Americas",
        description:
          "Clovis culture hunting megafauna. About to be devastated by Younger Dryas cooling and megafauna extinction.",
      },
      {
        region: "Europe",
        description:
          "Magdalenian cave art tradition ending. Hunter-gatherer bands. No permanent settlements.",
      },
      {
        region: "Global",
        description:
          "Younger Dryas catastrophe imminent (~12,800 BP). Megafauna extinction underway across continents.",
      },
    ],
    relatedSites: ["ayodhya", "bhimbetka"],
    relatedEvidence: ["ramayana-12209", "arch-gap-12000", "sea-level"],
    relatedDynasties: ["suryavansha", "ikshvaku"],
    relatedResearchers: ["nilesh-oak", "rupa-bhaty", "pv-vartak"],
    keyQuestions: [
      "Can 345+ astronomical observations be satisfactorily explained as later literary interpolations?",
      "What underwater archaeology in the Indian Ocean could test the Ramayana date?",
      "Does Sugriva's Atlas genuinely map to Pleistocene world geography?",
    ],
    metaDescription:
      "The Ramayana Era (12,209 BCE): Oak's dating based on 345+ astronomical observations from the Valmiki Ramayana.",
  },
  {
    id: "younger-dryas-gap",
    name: "The Younger Dryas Gap",
    dateRange: "12,209 — 5,561 BCE",
    startYear: -12209,
    endYear: -5561,
    color: "slate",
    description:
      "In Oak's framework, the 6,648-year gap between the Ramayana (12,209 BCE) and the Mahabharata (5,561 BCE) is explained by the Younger Dryas — a 1,300-year cold snap that devastated ecosystems globally between approximately 12,800 and 11,500 BP. Oak employs anupalabdhi (non-evidence as evidence from Nyaya logic): the absence of datable Indian events during this period is itself evidence of civilizational disruption.\n\nThe Younger Dryas is confirmed by ice core data (GISP2), ocean sediments, and global paleoclimate records. Temperatures in the Northern Hemisphere dropped 5-10°C within decades. In South Asia, monsoon patterns were severely disrupted, affecting agriculture and settlement. The cause remains debated: the Younger Dryas Impact Hypothesis (comet/airburst) has suffered setbacks with key papers retracted in 2025–26, while ice dam failure and volcanic activity remain competing explanations.\n\nDuring this gap, the archaeological record shows gradual recovery: Mehrgarh's farming begins ~7,000 BCE, Göbekli Tepe is built ~9,600 BCE, and the Natufian-to-PPNA agricultural revolution transforms the Levant. The gap is not empty — it is the period of post-catastrophic rebuilding.\n\nThe anupalabdhi argument is philosophically interesting but empirically weak on its own. Its strength comes from the convergence of astronomical dates on either side of the gap: if both the Ramayana (12,209 BCE) and Mahabharata (5,561 BCE) dates are astronomically robust, the gap between them demands explanation, and the Younger Dryas provides one.",
    significance:
      "The 6,600-year silence between Ramayana and Mahabharata, explained by the Younger Dryas catastrophe and Oak's anupalabdhi argument.",
    globalContext: [
      {
        region: "Turkey",
        description:
          "Göbekli Tepe (~9,600 BCE) and Karahan Tepe (~9,400 BCE). Monumental architecture by hunter-gatherers.",
      },
      {
        region: "Levant",
        description:
          "Natufian → PPNA → PPNB. Agricultural revolution: wheat, barley, legumes domesticated. Jericho founded.",
      },
      {
        region: "India",
        description:
          "Mehrgarh farming begins ~7,000 BCE. Independent Neolithic revolution. Bhimbetka continuously occupied.",
      },
      {
        region: "Global",
        description:
          "Post-glacial warming resumes after 11,500 BP. Sea levels rising rapidly. Doggerland and Beringia drowning.",
      },
    ],
    relatedSites: [
      "mehrgarh",
      "bhimbetka",
      "gobekli-tepe",
      "karahan-tepe",
      "gulf-of-cambay",
    ],
    relatedEvidence: [
      "younger-dryas-gap-evidence",
      "sea-level",
      "arch-gap-12000",
    ],
    relatedDynasties: [],
    relatedResearchers: ["nilesh-oak", "graham-hancock"],
    keyQuestions: [
      "Is anupalabdhi (absence as evidence) valid when the proposed gap aligns with a confirmed global catastrophe?",
      "Could underwater archaeology in the Gulf of Cambay or Arabian Sea fill this gap?",
      "What non-astronomical evidence could independently confirm or deny civilization at 12,000 BCE?",
    ],
    metaDescription:
      "The Younger Dryas Gap (12,209–5,561 BCE): the 6,600-year silence between Ramayana and Mahabharata explained by global catastrophe.",
  },
  {
    id: "mahabharata",
    name: "Mahabharata Era",
    dateRange: "5,561 — 5,525 BCE",
    startYear: -5561,
    endYear: -5525,
    color: "orange",
    description:
      "Oak dates the Mahabharata war to October 16 – November 2, 5561 BCE — the most evidence-dense dating proposal for any ancient event. He tests 215+ astronomical references from the Mahabharata text simultaneously using Voyager 4.5 and Stellarium. The Arundhati-Vasishtha observation — describing star Alcor walking ahead of Mizar (Mahabharata, Bhishmaparva 2.31) — alone eliminates every proposed date after 4,508 BCE, falsifying 96%+ of all competing proposals including the traditional Kali Yuga date (3102 BCE) and Achar's 3067 BCE.\n\nBhishma Nirvana (2018) independently corroborates the date with 300+ additional observations. The Saraswati's condition described in the Mahabharata — a flowing but diminished river — matches geological evidence for the river at ~5,500 BCE: monsoon rejuvenation after 9,000 BCE sustained flow, but the river was past its glacial-fed prime.\n\nKrishna's Dwarka was submerged approximately 36 years after the war (~5,525 BCE). Post-glacial sea levels were still rising at this date. S.R. Rao's underwater campaigns found submerged structures off the Gujarat coast, though the TL-dated structures (16th century BCE) may represent a later settlement.\n\nThe archaeological challenge: Mehrgarh at 5,561 BCE is a small farming village with mud-brick houses — not a kingdom with chariots and armies. Oak's response: most archaeology has focused on the mature Harappan period (~2,600 BCE), and the Saraswati basin remains largely unexcavated at pre-Harappan depths.",
    significance:
      "The most evidence-dense ancient dating proposal: 215+ astronomical observations converging on October–November 5,561 BCE for the Mahabharata war.",
    globalContext: [
      {
        region: "Mesopotamia",
        description:
          "Ubaid period: earliest era of southern Mesopotamian civilization. Eridu settled. Pre-urban, pre-literate.",
      },
      {
        region: "Egypt",
        description:
          "Pre-dynastic Nile farming communities. No pyramids, no hieroglyphs. The unification of Egypt is ~2,500 years away.",
      },
      {
        region: "China",
        description:
          "Yangshao culture: Neolithic farming villages, painted pottery, domesticated pigs and millet.",
      },
      {
        region: "Europe",
        description:
          "Goseck Circle in Germany (~4,900 BCE) is the oldest known solar observatory. Megalithic dolmens in Brittany.",
      },
      {
        region: "Writing",
        description:
          "Does not exist anywhere on Earth. First writing appears at Uruk, Mesopotamia (~3,350–3,200 BCE) — over 2,000 years later.",
      },
    ],
    relatedSites: ["dwarka-underwater", "hastinapura", "kalibangan"],
    relatedEvidence: ["av-observation", "mb-5561", "arch-gap-5561", "sea-level"],
    relatedDynasties: ["kuru", "yadava", "pandava"],
    relatedResearchers: [
      "nilesh-oak",
      "rupa-bhaty",
      "sr-rao",
      "pv-vartak",
      "bn-achar",
    ],
    keyQuestions: [
      "Why does Mehrgarh at 5,561 BCE show a farming village rather than the urban civilization described in the Mahabharata?",
      "Could excavation at pre-Harappan Saraswati basin depths reveal earlier urban layers?",
      "Is the Arundhati-Vasishtha observation genuinely unfalsifiable, or are there alternative astronomical interpretations?",
    ],
    metaDescription:
      "The Mahabharata Era (5,561 BCE): 215+ astronomical observations tested simultaneously. The Arundhati-Vasishtha observation eliminates all post-4,508 BCE dates.",
  },
  {
    id: "indus-saraswati",
    name: "Indus-Saraswati Civilization",
    dateRange: "3,300 — 1,900 BCE",
    startYear: -3300,
    endYear: -1900,
    color: "sky",
    description:
      "The Indus-Saraswati Civilization (conventionally 'Indus Valley Civilization') was one of four great Bronze Age civilizations, alongside Egypt, Mesopotamia, and China. At its peak (~2,600–1,900 BCE), it covered over 1.5 million square kilometers — larger than Egypt and Mesopotamia combined — with 1,500+ documented sites.\n\nMichel Danino's work tracing the Saraswati paleochannel established that more Harappan sites cluster along the dried Ghaggar-Hakra (Saraswati) course than along the Indus itself, lending weight to the 'Indus-Saraswati' nomenclature. ISRO satellite data and the 2025 multi-sensor SAR study confirmed the paleochannel's existence from the Shivalik foothills to the Rann of Kachchh.\n\nThe civilization produced the world's earliest known dock (Lothal), ploughed field (Kalibangan), public signboard (Dholavira), and urban drainage system (Mohenjo-daro). Its standardized weights and measures across hundreds of kilometers imply either centralized authority or deeply shared cultural norms — without any monumental palaces, temples, or evidence of individual rulers.\n\nThe Rakhigarhi ancient DNA (2019) showed no Steppe ancestry in a 2,500 BCE individual, confirming the IVC population was indigenous. The larger Narasimhan et al. study (523 individuals) showed Steppe-related ancestry arriving only after 2,000–1,500 BCE.\n\nDecline came with the 4.2 kiloyear mega-drought event (~2,200–1,900 BCE) and tectonic shifts diverting the Yamuna eastward. The Saraswati ceased to reach the sea. Major urban centers were abandoned as populations migrated east into the Ganga-Yamuna doab. This was not invasion or destruction — it was climate-driven urbanization collapse.",
    significance:
      "One of four great Bronze Age civilizations. 1,500+ sites across 1.5M km². Produced the world's earliest dock, ploughed field, and public signboard.",
    globalContext: [
      {
        region: "Mesopotamia",
        description:
          "Sumerian cities (Uruk, Ur, Eridu). Cuneiform writing. Akkadian Empire (~2334 BCE). Ur III dynasty.",
      },
      {
        region: "Egypt",
        description:
          "Old Kingdom: Great Pyramids at Giza (~2580 BCE). Hieroglyphic writing fully developed.",
      },
      {
        region: "China",
        description:
          "Longshan culture → early Xia dynasty. Jade working, oracle bones emerging, early bronze casting.",
      },
      {
        region: "Europe",
        description:
          "Stonehenge (~3100–2000 BCE). Minoan civilization on Crete (~2700 BCE). Early Bronze Age.",
      },
      {
        region: "Americas",
        description:
          "Caral-Supe civilization in Peru (~3000 BCE). Norte Chico. No writing, no pottery.",
      },
    ],
    relatedSites: [
      "mohenjo-daro",
      "harappa",
      "dholavira",
      "lothal",
      "kalibangan",
      "rakhigarhi",
      "mehrgarh",
    ],
    relatedEvidence: [
      "rakhigarhi-dna",
      "saraswati-paleo",
      "ivc-vedic-continuity",
      "saraswati-drying-timeline",
      "lothal-maritime-trade",
      "genetic-steppe-timeline",
    ],
    relatedDynasties: [],
    relatedResearchers: ["michel-danino", "sr-rao"],
    keyQuestions: [
      "What was the governance system of the IVC without evidence of monarchs or palaces?",
      "Is the Indus script a full writing system or a proto-writing notation?",
      "Does the fire altar evidence at Kalibangan prove IVC-Vedic continuity or coincidental similarity?",
    ],
    metaDescription:
      "The Indus-Saraswati Civilization (3,300–1,900 BCE): one of four Bronze Age civilizations with 1,500+ sites. World's earliest dock, ploughed field, signboard.",
  },
  {
    id: "transition",
    name: "Transitional Period",
    dateRange: "1,900 — 600 BCE",
    startYear: -1900,
    endYear: -600,
    color: "violet",
    description:
      "The Transitional Period spans the post-IVC world through to the emergence of historically verifiable dynasties. It encompasses the Late/Post-Harappan phase, the Painted Grey Ware (PGW) culture associated with the Kuru-Panchala kingdom, the arrival of Steppe-related ancestry (2,300–1,500 BCE), and the transition to iron technology.\n\nThe Sinauli discovery (2018) is this era's most significant finding. Three wooden chariots with copper coverings, helmets, antenna swords, and elite burials — C14-dated to 1,865–1,507 BCE — demonstrate organized warrior culture in the Ganga-Yamuna region. Whether these are war chariots (challenging the Steppe-origin narrative) or ceremonial ox-carts (consistent with it) remains debated.\n\nThe Narasimhan et al. 2019 study places the arrival of Steppe-related ancestry at 2,300–1,500 BCE. IVC populations mixed with Steppe groups to form Ancestral North Indians (ANI) and with peninsular groups to form Ancestral South Indians (ASI). Whether this genetic mixing brought Indo-European languages or occurred independently of language spread is the central open question.\n\nBy ~1,200 BCE, Painted Grey Ware culture appears in the Ganga-Yamuna doab — associated with the Kuru-Panchala kingdom of later Vedic texts. Hastinapura's PGW layers date to this period. Iron technology appears by ~1,000 BCE. The 16 Mahajanapadas (great kingdoms) consolidate by ~600 BCE, setting the stage for the historically verified Haryanka dynasty.",
    significance:
      "The bridge from Bronze Age urbanism to Iron Age kingdoms. Sinauli, Steppe ancestry arrival, PGW culture, and the Mahajanapada formation.",
    globalContext: [
      {
        region: "Mesopotamia",
        description:
          "Assyrian Empire rising. Babylon under Hammurabi (~1792 BCE). Iron Age. Neo-Babylonian Empire.",
      },
      {
        region: "Egypt",
        description:
          "New Kingdom: Ramesses II, Tutankhamun. Late Bronze Age Collapse (~1177 BCE). Third Intermediate Period.",
      },
      {
        region: "Greece",
        description:
          "Mycenaean civilization (~1600–1100 BCE). Trojan War (~1200 BCE). Greek Dark Ages. Homer (~750 BCE).",
      },
      {
        region: "China",
        description:
          "Shang Dynasty (oracle bones, bronze). Zhou Dynasty from 1046 BCE. Spring and Autumn period.",
      },
      {
        region: "Levant",
        description:
          "Israelite kingdoms. Phoenician alphabet spreading across the Mediterranean. Sea Peoples disruption.",
      },
    ],
    relatedSites: ["sinauli", "hastinapura"],
    relatedEvidence: [
      "sinauli-chariots",
      "genetic-steppe-timeline",
      "steppe-language",
      "hastinapura-flood-layer",
    ],
    relatedDynasties: ["brihadratha"],
    relatedResearchers: [],
    keyQuestions: [
      "Are the Sinauli vehicles war chariots or ceremonial ox-carts?",
      "Did Steppe-related genetic ancestry bring Indo-European languages, or were languages already present?",
      "What explains the urbanization gap between IVC decline (~1,900 BCE) and Mahajanapada formation (~600 BCE)?",
    ],
    metaDescription:
      "The Transitional Period (1,900–600 BCE): from IVC decline through Sinauli chariots and Steppe ancestry arrival to the Mahajanapadas.",
  },
  {
    id: "historical",
    name: "Historical Period",
    dateRange: "600 — 322 BCE",
    startYear: -600,
    endYear: -322,
    color: "rose",
    description:
      "The Historical Period marks where legend meets verified record. The Haryanka dynasty of Magadha — with Bimbisara (~544 BCE) and his son Ajatashatru — is the first Indian dynasty cross-verified by independent Buddhist and Jain textual traditions. Both Buddha and Mahavira were contemporaries of Bimbisara, providing chronological anchors.\n\nThe 16 Mahajanapadas ('great kingdoms') dominated the subcontinent. Among them, Magadha emerged as the most powerful — its iron deposits, fertile Gangetic plain, and strategic location at the intersection of trade routes gave it decisive advantages. Rajagriha served as its fortified capital.\n\nThe Shishunaga dynasty succeeded the Haryanka (~413 BCE), followed by the Nanda dynasty (~345 BCE). Mahapadma Nanda — called 'the destroyer of all Kshatriyas' — ended the remnants of the Solar Dynasty when he defeated King Sumitra of Ayodhya (~362 BCE). The Nandas accumulated legendary wealth from Magadha's gold and iron resources.\n\nChandragupta Maurya, advised by Kautilya (Chanakya), overthrew the Nandas in ~322 BCE to found India's first pan-subcontinental empire. The Maurya founding is firmly dated via synchronism with Alexander's invasion (327 BCE) and Megasthenes' Indica. Ashoka's edicts — the oldest datable Indian inscriptions — follow in the 3rd century BCE.\n\nThis period's significance for the larger timeline debate: it provides the fixed chronological anchor from which all earlier dating (Puranic, astronomical, archaeological) must ultimately connect. The Maurya founding at 322 BCE is the first universally accepted date in Indian history.",
    significance:
      "Where legend meets verified history. The Haryanka dynasty, Buddha, Mahavira, and the Maurya founding provide India's first fixed chronological anchors.",
    globalContext: [
      {
        region: "Persia",
        description:
          "Achaemenid Empire at its peak under Darius I and Xerxes. Persian Wars with Greece (490–479 BCE).",
      },
      {
        region: "Greece",
        description:
          "Classical Age: Socrates, Plato, Aristotle. Athenian democracy. Peloponnesian War. Alexander's conquests.",
      },
      {
        region: "China",
        description:
          "Warring States period. Confucius (~551–479 BCE). Laozi and Daoism. Legalism emerging.",
      },
      {
        region: "Rome",
        description:
          "Roman Republic established (~509 BCE). Twelve Tables (~450 BCE). Early expansion in Italy.",
      },
    ],
    relatedSites: [],
    relatedEvidence: [],
    relatedDynasties: ["haryanka", "nanda", "maurya"],
    relatedResearchers: [],
    keyQuestions: [
      "Can Puranic king lists bridge the gap between Parikshit (~5,561 BCE or ~1,400 BCE) and Mahapadma Nanda (~400 BCE)?",
      "How reliable are Buddhist/Jain sources for pre-Mauryan chronology?",
      "What role did Magadha's geography play in its dominance over other Mahajanapadas?",
    ],
    metaDescription:
      "The Historical Period (600–322 BCE): first verified dynasty (Haryanka), Buddha and Mahavira, and the Maurya Empire founding.",
  },
];

// -----------------------------------------------------------------------------
// Helper getters
// -----------------------------------------------------------------------------

export function getAllEras(): EraProfile[] {
  return eras;
}

export function getEraBySlug(slug: string): EraProfile | undefined {
  return eras.find((e) => e.id === slug);
}

// -----------------------------------------------------------------------------
// Lookup helpers
// -----------------------------------------------------------------------------

export function getEraById(id: string): EraProfile | undefined {
  return eras.find((e) => e.id === id);
}
