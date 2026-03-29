// =============================================================================
// Sanatan History — Data Models & Content
// =============================================================================
// Source: docs/research/ancient-indian-timeline-research.md
// Primary framework: Nilesh Oak & Rupa Bhaty archaeoastronomical dating
// =============================================================================

// -----------------------------------------------------------------------------
// Interfaces
// -----------------------------------------------------------------------------

export interface TimelineEvent {
  id: string;
  year: number; // negative = BCE
  dateLabel: string;
  title: string;
  description: string;
  indianEvent: string;
  conventionalRecord: string;
  globalContext: string;
  evidenceType: "confirmed" | "strong" | "open";
  icon: string; // Lucide icon name
}

export interface TimelineEra {
  id: string;
  name: string;
  dateRange: string;
  startYear: number;
  endYear: number;
  color: string; // Tailwind color token (e.g. "amber")
  events: TimelineEvent[];
}

export interface ArchaeologicalSite {
  id: string;
  name: string;
  location: string;
  coordinates?: { lat: number; lng: number };
  dateRange: string;
  keyFindings: string[];
  significance: string;
  evidenceType: "confirmed" | "strong" | "open";
}

export interface DynastyNode {
  id: string;
  name: string;
  title?: string;
  era?: string;
  branch: "surya" | "chandra" | "historical";
  children: string[];
  parent?: string;
  note?: string;
}

export interface Researcher {
  id: string;
  name: string;
  title: string;
  affiliation: string;
  methodology: string;
  keyClaims: string[];
  majorWorks: string[];
  icon: string;
}

export type EvidenceCategory =
  | "astronomical"
  | "geological"
  | "genetic"
  | "archaeological"
  | "cross-cultural"
  | "historiographical";

export interface EvidenceItem {
  id: string;
  claim: string;
  status: "confirmed" | "strong" | "open";
  evidence: string;
  notes: string;
  category: EvidenceCategory;
}

export interface HistoryFaq {
  question: string;
  answer: string;
}

// -----------------------------------------------------------------------------
// Timeline Eras & Events
// -----------------------------------------------------------------------------

export const timelineEras: TimelineEra[] = [
  {
    id: "vedic",
    name: "Rigvedic Period",
    dateRange: "22,000+ \u2014 14,500 BCE",
    startYear: -22000,
    endYear: -14500,
    color: "amber",
    events: [
      {
        id: "rigveda-oldest",
        year: -22000,
        dateLabel: "22,000+ BCE",
        title: "Oldest Rigvedic Mandalas Composed",
        description:
          "The oldest mandalas of the Rigveda (6, 3, 7, 4, 2) were composed before 24,000 years ago, based on archaeoastronomical analysis of precession-encoded references.",
        indianEvent:
          "Composition of the oldest Rigvedic hymns. Grand Saraswati fed by glacial meltwater.",
        conventionalRecord:
          "Bhimbetka rock art. Upper Paleolithic hunter-gatherer camps across the subcontinent.",
        globalContext:
          "Last Glacial Maximum. Cave art at Lascaux and Altamira in Europe.",
        evidenceType: "strong",
        icon: "BookOpen",
      },
      {
        id: "surya-siddhanta-epoch",
        year: -14500,
        dateLabel: "~14,500 BCE",
        title: "Surya Siddhanta Epoch",
        description:
          "One of multiple update epochs identified in the Surya Siddhanta by Oak and Bhaty. Three simultaneously satisfied observations at this date: two pole stars and Earth obliquity at 24 degrees.",
        indianEvent:
          "Surya Siddhanta epoch. Oak and Bhaty identify multiple independent update timestamps in the astronomical text.",
        conventionalRecord:
          "Mesolithic transition in the subcontinent. Microliths and rock shelter camps.",
        globalContext:
          "Ice Age ending. Natufians in the Levant developing semi-permanent settlements.",
        evidenceType: "strong",
        icon: "Sun",
      },
    ],
  },
  {
    id: "ramayana",
    name: "Ramayana Era",
    dateRange: "12,209 BCE",
    startYear: -12209,
    endYear: -12200,
    color: "emerald",
    events: [
      {
        id: "ramayana-war",
        year: -12209,
        dateLabel: "12,209 BCE",
        title: "Rama-Ravana Yuddha (Ramayana War)",
        description:
          "Oak tests 345+ astronomical references from the Valmiki Ramayana. Sugriva\u2019s Atlas adds 600+ observations mapping ancient world geography. Climate descriptions match Pleistocene conditions\u2014snow at Nashik, long winters, short summers.",
        indianEvent:
          "Ramayana war. Two pole stars (Abhijit/Vega and Agastya/Canopus) confirm the epoch. Sugriva\u2019s instructions describe global geography from Uday-giri (Chile) to Asta-giri (the Alps).",
        conventionalRecord:
          "Mesolithic India. No known settlements matching Ramayana descriptions. Oak notes 120m sea rise submerged coastal zones.",
        globalContext:
          "Younger Dryas imminent (~12,800 BP). G\u00f6bekli Tepe still ~2,600 years away. Clovis culture in Americas.",
        evidenceType: "strong",
        icon: "Swords",
      },
    ],
  },
  {
    id: "younger-dryas-gap",
    name: "The Younger Dryas Gap",
    dateRange: "12,209 \u2014 5,561 BCE",
    startYear: -12209,
    endYear: -5561,
    color: "slate",
    events: [
      {
        id: "younger-dryas",
        year: -12800,
        dateLabel: "~12,800 \u2014 11,500 BP",
        title: "Younger Dryas Catastrophe",
        description:
          "A 1,300-year cold snap that devastated ecosystems globally. Oak treats the absence of datable Indian events during this period as anupalabdhi\u2014civilizational disruption explaining the gap.",
        indianEvent:
          "Oak\u2019s anupalabdhi: civilizational disruption explains absence of datable events between Ramayana and Mahabharata.",
        conventionalRecord:
          "Younger Dryas cooling. Post-glacial recovery. Mehrgarh farming begins ~7000 BCE.",
        globalContext:
          "G\u00f6bekli Tepe (~9600 BCE). Natufian to PPNA/PPNB farming revolution in the Levant.",
        evidenceType: "open",
        icon: "Snowflake",
      },
    ],
  },
  {
    id: "mahabharata",
    name: "Mahabharata Era",
    dateRange: "5,561 \u2014 5,525 BCE",
    startYear: -5561,
    endYear: -5525,
    color: "orange",
    events: [
      {
        id: "mahabharata-war",
        year: -5561,
        dateLabel: "5,561 BCE",
        title: "Mahabharata War (16 Oct \u2014 2 Nov)",
        description:
          "The most evidence-dense dating proposal for any ancient event. 215+ astronomical references tested simultaneously. The Arundhati-Vasishtha observation alone eliminates all dates after 4,508 BCE.",
        indianEvent:
          "Mahabharata war. 300+ observations in Bhishma Nirvana independently corroborate. Saraswati condition matches geological evidence for a flowing-but-diminished river.",
        conventionalRecord:
          "Mehrgarh: mature farming village with mud-brick houses. No urban centers anywhere in India.",
        globalContext:
          "Ubaid period in Mesopotamia. Yangshao culture in China. No writing exists anywhere on Earth.",
        evidenceType: "strong",
        icon: "Shield",
      },
      {
        id: "dwarka-submerged",
        year: -5525,
        dateLabel: "~5,525 BCE",
        title: "Krishna\u2019s Dwarka Submerged",
        description:
          "36 years after the war, Dwarka was submerged by rising seas. S.R. Rao\u2019s 12 underwater campaigns found submerged structures and 120+ stone anchors.",
        indianEvent:
          "Dwarka flooding aligns with post-glacial sea level data. Gulf of Cambay wood C14-dated to 7,500\u20139,000 BP.",
        conventionalRecord:
          "S.R. Rao found submerged structures, fort walls TL-dated to 16th c. BCE. Gulf of Cambay structures at depth.",
        globalContext:
          "Post-glacial sea level still rising globally. Coastal settlements worldwide being submerged.",
        evidenceType: "strong",
        icon: "Waves",
      },
    ],
  },
  {
    id: "indus-saraswati",
    name: "Indus-Saraswati Civilization",
    dateRange: "3,300 \u2014 1,900 BCE",
    startYear: -3300,
    endYear: -1900,
    color: "sky",
    events: [
      {
        id: "early-harappan",
        year: -3300,
        dateLabel: "~3,300 BCE",
        title: "Early Harappan Phase Begins",
        description:
          "Proto-urban settlements developing along the Indus and Ghaggar-Hakra (Saraswati) river systems. Over 1,500 sites eventually documented along the Saraswati paleochannel.",
        indianEvent:
          "Post-Mahabharata civilizational development. The continuity between the epic period and the archaeological record remains an active research question.",
        conventionalRecord:
          "Early Harappan phase. Proto-urban settlements with planned layouts emerging.",
        globalContext:
          "Uruk period in Mesopotamia. Proto-cuneiform writing emerging ~3350\u20133200 BCE.",
        evidenceType: "confirmed",
        icon: "Building",
      },
      {
        id: "mature-harappan",
        year: -2600,
        dateLabel: "~2,600 BCE",
        title: "Mature Indus-Saraswati Civilization",
        description:
          "Mohenjo-daro, Harappa, Dholavira, and Rakhigarhi flourish. The world\u2019s earliest known dock at Lothal. Sophisticated urban planning, standardized weights, and extensive trade networks.",
        indianEvent:
          "Peak of the Indus-Saraswati civilization. 1,500+ sites along the Ghaggar-Hakra paleochannel\u2014more than along the Indus itself.",
        conventionalRecord:
          "One of four great Bronze Age civilizations. Grid-planned cities, Great Bath, granaries, advanced drainage.",
        globalContext:
          "Old Kingdom Egypt (pyramids). Bronze Age Mesopotamia. Akkadian Empire emerging.",
        evidenceType: "confirmed",
        icon: "Landmark",
      },
      {
        id: "saraswati-drying",
        year: -2200,
        dateLabel: "~2,200 \u2014 1,900 BCE",
        title: "Saraswati Dries, IVC Declines",
        description:
          "The 4.2 kiloyear mega-drought and tectonic shifts divert the Yamuna eastward. The Saraswati ceases to reach the sea. Major urban centers are abandoned as populations migrate eastward.",
        indianEvent:
          "Saraswati final drying. Yamuna shifts to Ganga system. Urban decline and eastward migration of populations.",
        conventionalRecord:
          "IVC decline phase. Urban abandonment. Shift to rural, de-urbanized settlements.",
        globalContext:
          "Global drought. Egypt\u2019s Old Kingdom collapses. Akkadian Empire falls. Bronze Age disruption.",
        evidenceType: "confirmed",
        icon: "Droplets",
      },
    ],
  },
  {
    id: "transition",
    name: "Transitional Period",
    dateRange: "1,900 \u2014 600 BCE",
    startYear: -1900,
    endYear: -600,
    color: "violet",
    events: [
      {
        id: "sinauli",
        year: -1700,
        dateLabel: "~1,865 \u2014 1,507 BCE",
        title: "Sinauli Elite Warrior Burials",
        description:
          "Three wooden chariots/carts with copper coverings, helmets, and antenna swords discovered in Uttar Pradesh. C14 dated. Evidence of organized warrior society in the Ganga-Yamuna region.",
        indianEvent:
          "Elite warrior culture with copper-covered vehicles. Debate continues on whether these are war chariots or ceremonial ox-carts.",
        conventionalRecord:
          "OCP/Copper Hoard culture. C14 dated to 1865\u20131507 BCE. Solid disc wheels, no horse remains.",
        globalContext:
          "Hittite Empire. Egyptian New Kingdom. Late Bronze Age peak.",
        evidenceType: "confirmed",
        icon: "Sword",
      },
    ],
  },
  {
    id: "historical",
    name: "Historical Period",
    dateRange: "600 \u2014 322 BCE",
    startYear: -600,
    endYear: -322,
    color: "rose",
    events: [
      {
        id: "haryanka",
        year: -544,
        dateLabel: "~544 BCE",
        title: "First Historically Verified Dynasty",
        description:
          "The Haryanka dynasty of Magadha\u2014with Bimbisara and Ajatashatru as contemporaries of Buddha and Mahavira\u2014marks where legend meets verified history.",
        indianEvent:
          "Haryanka dynasty. Bimbisara and Ajatashatru. Buddha and Mahavira active. The 16 Mahajanapadas.",
        conventionalRecord:
          "First historically verified Indian dynasty. Cross-referenced with Buddhist and Jain sources.",
        globalContext:
          "Persian Achaemenid Empire. Greek Classical Age beginning. Warring States period in China.",
        evidenceType: "confirmed",
        icon: "Crown",
      },
      {
        id: "maurya",
        year: -322,
        dateLabel: "~322 BCE",
        title: "Maurya Empire Founded",
        description:
          "Chandragupta Maurya establishes India\u2019s first pan-subcontinental empire. Firmly dated via synchronism with Alexander\u2019s invasion (327 BCE). Ashoka\u2019s edicts provide the oldest datable Indian inscriptions.",
        indianEvent:
          "Chandragupta defeats the Nanda dynasty. Maurya Empire spans most of the subcontinent. Ashoka\u2019s Buddhist edicts follow.",
        conventionalRecord:
          "Firmly dated via Greek sources. Alexander synchronism at 327 BCE. Megasthenes\u2019 Indica.",
        globalContext:
          "Hellenistic world after Alexander. Qin unifies China (221 BCE). Roman Republic rising.",
        evidenceType: "confirmed",
        icon: "Castle",
      },
    ],
  },
];

// -----------------------------------------------------------------------------
// Archaeological Sites
// -----------------------------------------------------------------------------

export const archaeologicalSites: ArchaeologicalSite[] = [
  {
    id: "bhimbetka",
    name: "Bhimbetka",
    location: "Madhya Pradesh",
    coordinates: { lat: 22.9375, lng: 77.6111 },
    dateRange: "100,000+ years",
    keyFindings: [
      "750+ rock shelters with paintings spanning 100,000 years",
      "Cupules dated to 200,000+ years old",
      "Continuous human occupation from Paleolithic to medieval period",
    ],
    significance:
      "Among the oldest continuously occupied sites on Earth. UNESCO World Heritage Site.",
    evidenceType: "confirmed",
  },
  {
    id: "mehrgarh",
    name: "Mehrgarh",
    location: "Balochistan",
    coordinates: { lat: 29.3833, lng: 67.6167 },
    dateRange: "~7,000 \u2014 5,250 BCE",
    keyFindings: [
      "One of the world\u2019s earliest farming settlements",
      "Independent agricultural origin (wheat, barley, cattle)",
      "Mud-brick architecture predating the Indus cities by millennia",
    ],
    significance:
      "Proves independent Neolithic revolution in the subcontinent\u2014not a backwater of Near East farming.",
    evidenceType: "confirmed",
  },
  {
    id: "rakhigarhi",
    name: "Rakhigarhi",
    location: "Haryana",
    coordinates: { lat: 29.2833, lng: 76.1167 },
    dateRange: "4,600 \u2014 1,900 BCE",
    keyFindings: [
      "Largest IVC site (350 hectares)",
      "2019 ancient DNA: no Steppe ancestry in 2500 BCE individual",
      "Genetic profile is the primary ancestry source in South Asia today",
    ],
    significance:
      "Ancient DNA evidence reshaping the Aryan Migration debate. Published in Cell and Science (2019).",
    evidenceType: "confirmed",
  },
  {
    id: "dholavira",
    name: "Dholavira",
    location: "Gujarat",
    coordinates: { lat: 23.886, lng: 70.212 },
    dateRange: "3rd \u2014 mid-2nd millennium BCE",
    keyFindings: [
      "World\u2019s earliest known signboard (10 Indus script characters)",
      "Giant water reservoirs showing advanced hydraulic engineering",
      "Multi-layered fortification and town planning",
    ],
    significance:
      "UNESCO World Heritage Site. Demonstrates sophisticated urban planning and water management.",
    evidenceType: "confirmed",
  },
  {
    id: "lothal",
    name: "Lothal",
    location: "Gujarat",
    coordinates: { lat: 22.5216, lng: 72.2494 },
    dateRange: "~2,200 BCE",
    keyFindings: [
      "World\u2019s earliest known dock for maritime trade",
      "Bead-making factory with specialized craftwork",
      "Rice husk evidence suggesting early rice cultivation",
    ],
    significance:
      "Evidence of sophisticated maritime trade networks spanning the Arabian Sea to Mesopotamia.",
    evidenceType: "confirmed",
  },
  {
    id: "kalibangan",
    name: "Kalibangan",
    location: "Rajasthan",
    coordinates: { lat: 29.4722, lng: 74.1306 },
    dateRange: "~2,600 \u2014 1,900 BCE",
    keyFindings: [
      "World\u2019s earliest known ploughed field",
      "Fire altars suggesting Vedic-like ritual practice",
      "Trepanned skulls (ancient surgery evidence)",
    ],
    significance:
      "Located on the Ghaggar-Hakra (Saraswati) paleochannel. Fire altars suggest continuity between IVC and Vedic ritual.",
    evidenceType: "confirmed",
  },
  {
    id: "dwarka-underwater",
    name: "Underwater Dwarka",
    location: "Gujarat coast",
    coordinates: { lat: 22.2376, lng: 68.9674 },
    dateRange: "TL: 16th century BCE",
    keyFindings: [
      "Submerged stone structures found by S.R. Rao (12 campaigns, 1983\u20131990)",
      "120+ stone anchors of multiple types",
      "Fort walls and Late Indus period seal",
    ],
    significance:
      "Underwater archaeology matching literary descriptions of Krishna\u2019s Dwarka. First World Ship Trust Award.",
    evidenceType: "confirmed",
  },
  {
    id: "hastinapura",
    name: "Hastinapura",
    location: "Uttar Pradesh",
    coordinates: { lat: 29.1619, lng: 78.0167 },
    dateRange: "PGW period (~1,200 \u2014 600 BCE)",
    keyFindings: [
      "Painted Grey Ware pottery associated with Mahabharata-era Kuru kingdom",
      "Flood evidence matching Puranic accounts",
      "Excavated by B.B. Lal (1950\u201352)",
    ],
    significance:
      "Archaeological evidence at the traditional Mahabharata capital. Flood layer corroborates Puranic narrative.",
    evidenceType: "confirmed",
  },
  {
    id: "sinauli",
    name: "Sinauli",
    location: "Uttar Pradesh",
    coordinates: { lat: 29.2242, lng: 77.3756 },
    dateRange: "1,865 \u2014 1,507 BCE (C14)",
    keyFindings: [
      "3 wooden chariots/carts with copper covering",
      "Copper helmets and antenna swords",
      "Elite burial complex suggesting organized warrior society",
    ],
    significance:
      "Challenges the narrative that chariots arrived with Steppe migrations. Debate: war chariots vs. ceremonial ox-carts.",
    evidenceType: "confirmed",
  },
  {
    id: "gulf-of-cambay",
    name: "Gulf of Cambay Structures",
    location: "Gujarat coast",
    dateRange: "C14: 7,500 \u2014 9,000 BP",
    keyFindings: [
      "Geometric structures spanning 5 square miles underwater",
      "Wood samples C14-dated to 7,500\u20139,000 BP",
      "Possibly not connected to Krishna\u2019s Dwarka",
    ],
    significance:
      "Among the oldest submerged structures found globally. Relationship to known civilizations remains debated.",
    evidenceType: "open",
  },
];

// -----------------------------------------------------------------------------
// Dynasty Tree
// -----------------------------------------------------------------------------

export const dynastyNodes: DynastyNode[] = [
  // Root
  {
    id: "brahma",
    name: "Brahma",
    title: "The Creator",
    branch: "surya",
    children: ["surya", "chandra"],
  },
  // Surya (Solar) branch
  {
    id: "surya",
    name: "Surya",
    title: "The Sun",
    branch: "surya",
    parent: "brahma",
    children: ["manu"],
  },
  {
    id: "manu",
    name: "Vaivasvata Manu",
    title: "Progenitor of Humanity",
    branch: "surya",
    parent: "surya",
    children: ["ikshvaku", "ila"],
  },
  {
    id: "ikshvaku",
    name: "Ikshvaku",
    title: "Founder of Solar Dynasty",
    era: "Ayodhya",
    branch: "surya",
    parent: "manu",
    children: ["rama"],
    note: "Capital: Ayodhya (Kosala Kingdom)",
  },
  {
    id: "rama",
    name: "Rama",
    title: "64th/81st Solar Monarch",
    era: "12,209 BCE (Oak)",
    branch: "surya",
    parent: "ikshvaku",
    children: ["sumitra"],
    note: "Ramayana protagonist. 345+ astronomical refs validate the date.",
  },
  {
    id: "sumitra",
    name: "King Sumitra",
    title: "Last Solar King",
    era: "~362 BCE",
    branch: "surya",
    parent: "rama",
    children: [],
    note: "Defeated by Mahapadma Nanda. Fled to Rohtas.",
  },
  // Chandra (Lunar) branch
  {
    id: "chandra",
    name: "Chandra",
    title: "The Moon",
    branch: "chandra",
    parent: "brahma",
    children: ["budha"],
  },
  {
    id: "budha",
    name: "Budha",
    title: "Son of Chandra",
    branch: "chandra",
    parent: "chandra",
    children: ["pururavas"],
  },
  {
    id: "ila",
    name: "Ila",
    title: "Daughter of Manu",
    branch: "chandra",
    parent: "manu",
    children: ["pururavas"],
    note: "Bridge between Solar and Lunar dynasties",
  },
  {
    id: "pururavas",
    name: "Pururavas",
    title: "First Lunar King",
    era: "Pratishthana",
    branch: "chandra",
    parent: "budha",
    children: ["yayati"],
    note: "Capital: Pratishthana (near Prayaga)",
  },
  {
    id: "yayati",
    name: "Yayati",
    title: "Five Sons = Five Lineages",
    branch: "chandra",
    parent: "pururavas",
    children: ["yadu", "puru"],
  },
  {
    id: "yadu",
    name: "Yadu",
    title: "Founder of Yadava Line",
    branch: "chandra",
    parent: "yayati",
    children: ["krishna"],
  },
  {
    id: "krishna",
    name: "Krishna",
    title: "Yadava Prince, Mahabharata Guide",
    era: "5,561 BCE (Oak)",
    branch: "chandra",
    parent: "yadu",
    children: [],
    note: "Dwarka submerged ~5,525 BCE (36 years post-war)",
  },
  {
    id: "puru",
    name: "Puru",
    title: "Founder of Paurava Line",
    branch: "chandra",
    parent: "yayati",
    children: ["bharata"],
  },
  {
    id: "bharata",
    name: "Bharata",
    title: "Emperor (India named Bh\u0101rata)",
    branch: "chandra",
    parent: "puru",
    children: ["kuru"],
  },
  {
    id: "kuru",
    name: "Kuru",
    title: "Founder of Kuru Dynasty",
    era: "Hastinapura",
    branch: "chandra",
    parent: "bharata",
    children: ["pandavas-kauravas"],
  },
  {
    id: "pandavas-kauravas",
    name: "Pandavas & Kauravas",
    title: "Mahabharata Protagonists",
    era: "5,561 BCE (Oak)",
    branch: "chandra",
    parent: "kuru",
    children: ["parikshit"],
    note: "The Great War. 215+ astronomical refs tested simultaneously.",
  },
  {
    id: "parikshit",
    name: "Parikshit",
    title: "Arjuna\u2019s Grandson, Post-War King",
    branch: "chandra",
    parent: "pandavas-kauravas",
    children: ["brihadratha"],
  },
  // Historical bridge
  {
    id: "brihadratha",
    name: "Brihadratha Dynasty",
    title: "Magadha (~1,700 \u2014 682 BCE)",
    era: "21 kings, includes Jarasandha",
    branch: "historical",
    parent: "parikshit",
    children: ["haryanka"],
  },
  {
    id: "haryanka",
    name: "Haryanka Dynasty",
    title: "First Verified Dynasty (~544 \u2014 413 BCE)",
    era: "Bimbisara, Ajatashatru",
    branch: "historical",
    parent: "brihadratha",
    children: ["nanda"],
    note: "Contemporaries of Buddha and Mahavira. HISTORY BEGINS.",
  },
  {
    id: "nanda",
    name: "Nanda Dynasty",
    title: "~345 \u2014 322 BCE",
    branch: "historical",
    parent: "haryanka",
    children: ["maurya-node"],
    note: "Mahapadma Nanda ended remnants of Solar Dynasty",
  },
  {
    id: "maurya-node",
    name: "Maurya Empire",
    title: "~322 \u2014 184 BCE",
    era: "Chandragupta, Ashoka",
    branch: "historical",
    parent: "nanda",
    children: [],
    note: "Firmly dated via Alexander synchronism (327 BCE)",
  },
];

// -----------------------------------------------------------------------------
// Researchers
// -----------------------------------------------------------------------------

export const researchers: Researcher[] = [
  {
    id: "nilesh-oak",
    name: "Nilesh Nilkanth Oak",
    title: "Archaeoastronomer",
    affiliation:
      "Adjunct Faculty, Institute of Advanced Sciences, Dartmouth, MA",
    methodology:
      "Extracts 200+ astronomical references from Sanskrit texts, simulates them in Voyager 4.5 / Stellarium, applies multi-constraint falsification.",
    keyClaims: [
      "Mahabharata war: 5561 BCE (215+ observations)",
      "Ramayana war: 12,209 BCE (345+ observations)",
      "Rigveda oldest mandalas: 22,000+ years ago",
      "Arundhati-Vasishtha observation eliminates all post-4508 BCE dates",
    ],
    majorWorks: [
      "When Did the Mahabharata War Happen? (2011)",
      "The Historic Rama (2014)",
      "Bhishma Nirvana (2018)",
      "Sugriva\u2019s Atlas (2024)",
    ],
    icon: "Telescope",
  },
  {
    id: "rupa-bhaty",
    name: "Rupa Bhaty",
    title: "Archaeoastronomer, Architect",
    affiliation:
      "Adjunct Asst. Professor, School of Indic Studies, INADS",
    methodology:
      "Surya Siddhanta epoch analysis, IVC script research via ancient place-name encoding, Canopus pole position dating.",
    keyClaims: [
      "Multiple Surya Siddhanta update epochs identified (with Oak)",
      "IVC seals encode ancient place names using Sanskrit-based phonetics",
      "Agastya-Vindhya lore dates to 19,000\u201321,000 BCE",
      "Hora/weekday naming system originated in India",
    ],
    majorWorks: [
      "Ancient Updates to Surya-siddhanta (with Oak)",
      "Deciphering the Indus Script (2025)",
      "Tale of Three Cities (forthcoming)",
      "The Agastya Code (forthcoming)",
    ],
    icon: "Star",
  },
  {
    id: "sr-rao",
    name: "S.R. Rao",
    title: "Marine Archaeologist",
    affiliation: "National Institute of Oceanography (NIO)",
    methodology:
      "Underwater archaeology. 12 campaigns at Dwarka (1983\u20131990). Discoverer of Lothal.",
    keyClaims: [
      "Submerged structures at Dwarka with 120+ stone anchors",
      "Fort walls TL-dated to 16th century BCE",
      "Lothal: world\u2019s earliest known dock",
    ],
    majorWorks: ["The Lost City of Dwaraka (1999)"],
    icon: "Anchor",
  },
  {
    id: "michel-danino",
    name: "Michel Danino",
    title: "Historian, Padma Shri (2017)",
    affiliation: "IIT Gandhinagar",
    methodology:
      "ISRO satellite imagery, isotope dating, and geology to trace the Saraswati river.",
    keyClaims: [
      "Traced Saraswati paleochannel from Shivalik foothills to Rann of Kachchh",
      "1,500+ Harappan sites along the dried Ghaggar-Hakra course",
      "IVC should be called \u2018Indus-Saraswati Civilization\u2019",
    ],
    majorWorks: [
      "The Lost River: On the Trail of the Sarasvati (Penguin, 2010)",
    ],
    icon: "MapPin",
  },
  {
    id: "raj-vedam",
    name: "Raj Vedam",
    title: "Researcher, Educator",
    affiliation:
      "Co-founder IHAR (Indian History Awareness and Research), Houston. Faculty, Hindu University of America.",
    methodology:
      "Cross-civilizational evidence synthesis. 200+ public talks on ancient Indian contributions to sciences and mathematics.",
    keyClaims: [
      "Ancient Indian contributions to sciences/math impacted civilizations globally",
      "Standard chronological framework for Indian history is distorted",
    ],
    majorWorks: [
      "Indian Civilization: The Untold Story (Sangam Talks)",
    ],
    icon: "Globe",
  },
  {
    id: "sanjeev-sanyal",
    name: "Sanjeev Sanyal",
    title: "Economist, Rhodes Scholar",
    affiliation: "Principal Economic Adviser to Government of India",
    methodology:
      "Complex Adaptive System framework applied to Indian Ocean civilizational history. Geographic and economic lens.",
    keyClaims: [
      "Indian Ocean as a connected civilizational system",
      "Geographic/economic factors drove civilizational development patterns",
    ],
    majorWorks: [
      "Land of the Seven Rivers (2013)",
      "The Ocean of Churn (2017)",
    ],
    icon: "BookMarked",
  },
];

// -----------------------------------------------------------------------------
// Evidence Assessment
// -----------------------------------------------------------------------------

export const evidenceItems: EvidenceItem[] = [
  // ===========================================================================
  // CONFIRMED
  // ===========================================================================
  {
    id: "av-observation",
    category: "astronomical",
    claim:
      "Arundhati-Vasishtha observation window: 11,091 \u2014 4,508 BCE",
    status: "confirmed",
    evidence:
      "Mathematically verified. Reproducible in Voyager 4.5 and Stellarium by anyone. Star Alcor\u2019s proper motion ahead of Mizar occurred only during this window.",
    notes:
      "Eliminates 96%+ of all proposed Mahabharata dates. Any date after 4,508 BCE is falsified.",
  },
  {
    id: "bhimbetka-evidence",
    category: "archaeological",
    claim: "Bhimbetka: 100,000+ years continuous occupation",
    status: "confirmed",
    evidence:
      "750+ rock shelters. Cupules dated 200,000+ years. UNESCO World Heritage Site.",
    notes: "Among the world\u2019s oldest occupied sites.",
  },
  {
    id: "mehrgarh-evidence",
    category: "archaeological",
    claim: "Mehrgarh: independent farming origin (~7,000 BCE)",
    status: "confirmed",
    evidence:
      "Wheat, barley, cattle domestication independent of Near East. Mud-brick architecture.",
    notes:
      "Proves South Asia had its own Neolithic revolution.",
  },
  {
    id: "rakhigarhi-dna",
    category: "genetic",
    claim: "Rakhigarhi: no Steppe DNA at 2,500 BCE",
    status: "confirmed",
    evidence:
      "Ancient DNA from female skeleton published in Cell and Science (2019). No Steppe pastoralist ancestry, no Iranian farmer ancestry.",
    notes:
      "Interpretation debated: Shinde says it disproves AIT; Patterson (co-author) says later migration still supported.",
  },
  {
    id: "saraswati-paleo",
    category: "geological",
    claim: "Saraswati/Ghaggar-Hakra paleochannel exists",
    status: "confirmed",
    evidence:
      "ISRO + international satellite data. 2025 multi-sensor SAR study traces channels from Shivalik foothills to Rann of Kachchh.",
    notes: "1,500+ Harappan sites along the course.",
  },
  {
    id: "sea-level",
    category: "geological",
    claim: "Post-Ice Age sea level rise: 120 meters",
    status: "confirmed",
    evidence:
      "Confirmed by global oceanographic data. Meltwater Pulse 1A (~14,600 BP) and 1B (~11,500 BP).",
    notes:
      "Drowned coastal sites worldwide. Explains submersion of ancient coastal settlements.",
  },
  // -- Synced from evidence.ts (confirmed) --
  {
    id: "sinauli-chariots",
    category: "archaeological",
    claim: "Sinauli: elite warrior burials with copper-covered vehicles (1,865\u20131,507 BCE)",
    status: "confirmed",
    evidence:
      "3 wooden vehicles with solid disc wheels, copper helmets, antenna swords. C14 dated. OCP/Copper Hoard culture.",
    notes:
      "Debate: solid wheels suggest carts not spoked chariots. No horse remains. Witzel: evidence of extra-Harappan organized society.",
  },
  {
    id: "saraswati-drying-timeline",
    category: "geological",
    claim: "Saraswati river drying timeline: 10,000\u20131,900 BCE",
    status: "confirmed",
    evidence:
      "OSL dating, isotopic analysis, tectonic studies. Sutlej abandoned paleochannel ~10,000\u20138,000 BCE. Yamuna shifted east ~5,000\u20133,000 BCE. Final drying ~2,200\u20131,900 BCE during 4.2 kiloyear drought.",
    notes:
      "French SPOT satellite showed large paleochannel was pre-Harappan. River still perennial during Early/Mature Harappan (5.9\u20134.3 ka).",
  },
  {
    id: "lothal-maritime-trade",
    category: "archaeological",
    claim: "Lothal: world\u2019s earliest known dock (~2,200 BCE)",
    status: "confirmed",
    evidence:
      "Trapezoidal dock structure with inlet/outlet channels. Bead factory, rice husk evidence, Persian Gulf trade goods.",
    notes:
      "120+ stone anchor types at Dwarka suggest sophisticated IVC-era seafaring network.",
  },
  {
    id: "hastinapura-flood-layer",
    category: "archaeological",
    claim: "Hastinapura: PGW flood layer matches Puranic account",
    status: "confirmed",
    evidence:
      "B.B. Lal\u2019s 1950\u201352 excavation found Painted Grey Ware + flood deposit matching Puranic account of Hastinapura\u2019s flooding.",
    notes:
      "PGW period (~1,200\u2013600 BCE). Connects material culture to textual tradition.",
  },
  {
    id: "rakhigarhi-largest-site",
    category: "archaeological",
    claim: "Rakhigarhi: largest IVC site (350 hectares)",
    status: "confirmed",
    evidence:
      "Larger than Mohenjo-daro (250 ha). Seven mounds with craft specialization, planned streets, drainage. 2014\u20132016 excavations by Shinde et al.",
    notes:
      "Haryana location puts it squarely on the Saraswati paleochannel, not the Indus.",
  },
  {
    id: "genetic-steppe-timeline",
    category: "genetic",
    claim: "Steppe ancestry spread into South Asia 2,300\u20131,500 BCE",
    status: "confirmed",
    evidence:
      "Narasimhan et al. (2019, Science). 523-individual ancient DNA study. Steppe ancestry contributes up to 30% of modern South Asian genome.",
    notes:
      "After IVC decline (~1,900 BCE): IVC + Steppe = ANI (Ancestral North Indians). IVC + peninsular = ASI (Ancestral South Indians).",
  },
  // -- New confirmed items --
  {
    id: "narasimhan-523-study",
    category: "genetic",
    claim: "523-individual ancient DNA study maps South Asian population formation",
    status: "confirmed",
    evidence:
      "Narasimhan et al. 2019 in Science. Largest ancient DNA study of South/Central Asia. Maps formation of ANI and ASI populations. Agriculture in India developed independently.",
    notes:
      "Checkmate for the Anatolian hypothesis (Reich). Steppe profile matches Bronze Age Eastern Europe.",
  },
  // ===========================================================================
  // STRONG
  // ===========================================================================
  {
    id: "mb-5561",
    category: "astronomical",
    claim: "Mahabharata war: 5,561 BCE",
    status: "strong",
    evidence:
      "215+ simultaneous astronomical references. AV observation + planetary positions + eclipses + seasons + Saraswati geology + Dwarka submersion timeline.",
    notes:
      "Most evidence-dense dating proposal for any ancient event. Critics cherry-pick 3\u20134 refs while ignoring the remaining 200+.",
  },
  {
    id: "ramayana-12209",
    category: "astronomical",
    claim: "Ramayana war: 12,209 BCE",
    status: "strong",
    evidence:
      "345+ astronomical refs + 600+ in Sugriva\u2019s Atlas. Climate descriptions match Pleistocene. Two pole stars confirmed by Bhaty.",
    notes:
      "Archaeological gap at this date remains the primary challenge. Oak argues preservation bias and 120m sea rise.",
  },
  {
    id: "ivc-vedic-continuity",
    category: "archaeological",
    claim: "IVC-Vedic cultural continuity",
    status: "strong",
    evidence:
      "Rakhigarhi DNA (indigenous), Saraswati paleochannel with 1,500+ Harappan sites, fire altars at Kalibangan, pottery sequence overlap.",
    notes:
      "Steppe ancestry arrived 2,300\u20131,500 BCE. Whether this brought languages or just genes is debated.",
  },
  // -- New strong items --
  {
    id: "competing-timelines",
    category: "historiographical",
    claim: "AV observation eliminates all post-4,508 BCE Mahabharata dates",
    status: "strong",
    evidence:
      "Achar (3,067 BCE), Kali Yuga tradition (3,102 BCE), Aihole Inscription (~3,137 BCE), Iyengar (1,493\u20131,443 BCE), mainstream (~1,200\u2013800 BCE) all fall outside the AV window. Only Oak (5,561 BCE) and Vartak (5,561 BCE) satisfy the constraint.",
    notes:
      "The AV observation is independently verifiable. Each competing date can be tested against it. This is not a matter of interpretation but of stellar mechanics.",
  },
  {
    id: "younger-dryas-correlation",
    category: "geological",
    claim: "Younger Dryas cooling correlates with Ramayana-era civilizational disruption",
    status: "strong",
    evidence:
      "Younger Dryas (12,800\u201311,500 BP) is a confirmed global climate catastrophe. Oak\u2019s Ramayana date (12,209 BCE) falls at its onset. The 6,600-year gap between Ramayana and Mahabharata aligns with YD-induced disruption.",
    notes:
      "Climate descriptions in the Valmiki Ramayana match Pleistocene conditions: snow at Nashik, long winters, short hot summers.",
  },
  {
    id: "flood-myths-cross-cultural",
    category: "cross-cultural",
    claim: "Flood narratives across 6+ ancient traditions correlate with post-Ice Age sea level events",
    status: "strong",
    evidence:
      "Sumerian (Utnapishtim), Hebrew (Noah), Hindu (Manu-Matsya), Greek (Deucalion), Chinese (Gun-Yu), Aztec (Tata and Nena). Post-Ice Age sea rose 120m. Bruce Masse: 175 flood myths converge on ~2,807 BCE.",
    notes:
      "Hindu tradition: Matsya avatar warns Manu. Earliest version in Rigveda, expanded in Satapatha Brahmana. Causation debated but the pattern is striking.",
  },
  // ===========================================================================
  // OPEN
  // ===========================================================================
  {
    id: "arch-gap-12000",
    category: "archaeological",
    claim: "Archaeological gap at 12,000 BCE",
    status: "open",
    evidence:
      "No known settlements matching Ramayana descriptions at this date.",
    notes:
      "120m sea rise submerged coastal zones. Organic materials don\u2019t survive 14,000 years. Preservation bias is real but the gap remains.",
  },
  {
    id: "arch-gap-5561",
    category: "archaeological",
    claim: "Archaeological gap at 5,561 BCE",
    status: "open",
    evidence:
      "Mehrgarh at this date is a farming village, not a kingdom with chariots and armies.",
    notes:
      "Are we looking in the right places? Saraswati basin sites mostly unexcavated. Most archaeology focused on mature Harappan (~2,600 BCE).",
  },
  {
    id: "steppe-language",
    category: "genetic",
    claim: "Did Steppe ancestry bring Indo-Aryan languages or just genes?",
    status: "open",
    evidence:
      "Genetic mixing confirmed 2,300\u20131,500 BCE. Linguistic spread correlates but causation is debated.",
    notes:
      "PIE wheel vocabulary constrains the language family to ~6,000 years. Sanskrit-IVC script proposals (Bhaty 2025) challenge this.",
  },
  // -- Synced from evidence.ts (open) --
  {
    id: "younger-dryas-gap-evidence",
    category: "geological",
    claim: "6,600-year gap between Ramayana and Mahabharata explained by Younger Dryas",
    status: "open",
    evidence:
      "Oak treats absence of datable events between 12,209 and 5,561 BCE as anupalabdhi (non-evidence as evidence). Younger Dryas destroyed or disrupted civilization, explaining the literary silence.",
    notes:
      "Geologically confirmed catastrophe. Whether it explains the textual gap requires the assumption that civilization existed to be disrupted.",
  },
  // -- New open items --
  {
    id: "ivc-script-undeciphered",
    category: "historiographical",
    claim: "Five competing approaches to IVC script decipherment remain unresolved",
    status: "open",
    evidence:
      "~5,000 inscriptions found, avg 4\u20135 symbols. Mahadevan: Proto-Dravidian. Parpola: Proto-Dravidian (astronomical). S.R. Rao: Sanskritic. Wells: Dravidian statistical. Bhaty (2025): Sanskrit trade-partner place names.",
    notes:
      "No bilingual text exists. Farmer/Sproat/Witzel (2004) challenged whether it encodes language at all. Tamil Nadu announced $1M prize (2025).",
  },
  {
    id: "kumari-kandam-meltwater",
    category: "geological",
    claim: "Meltwater pulses align with Tamil Sangam tradition of three submersion events",
    status: "open",
    evidence:
      "MWP-1A (~14,600 BP) and MWP-1B (~11,500 BP) are confirmed rapid sea level events. Tamil tradition describes three learning centers destroyed at ~11,600, ~7,200, and ~3,500 years ago.",
    notes:
      "Submerged landmass south of Kanyakumari is geologically real. Civilization aspect is tradition-based, not archaeologically confirmed.",
  },
  {
    id: "genetics-synthesis",
    category: "genetic",
    claim: "What ancient DNA does and does not prove about the Aryan question",
    status: "open",
    evidence:
      "Confirmed: IVC people had no Steppe ancestry. Confirmed: Steppe-related ancestry arrived after IVC decline. Confirmed: agriculture developed independently. Open: whether genetic mixing necessarily means language replacement.",
    notes:
      "DNA proves population mixture timing but cannot determine what language the migrants spoke or whether language shift preceded, accompanied, or followed genetic mixing.",
  },
  {
    id: "precessional-numbers",
    category: "cross-cultural",
    claim: "Precessional numbers (72, 432,000) appear across unconnected ancient traditions",
    status: "open",
    evidence:
      "72 years per degree of precession. Hindu: Kali Yuga = 432,000 years. Egyptian: 72 conspirators against Osiris. Norse: 432,000 warriors in Valhalla. Mesopotamian King List: 432,000 years before the flood.",
    notes:
      "Source: Hamlet\u2019s Mill (Santillana & von Dechend, 1969). Whether these encode genuine ancient astronomical knowledge or are numerical coincidence remains debated.",
  },
  {
    id: "lost-civilization-india",
    category: "cross-cultural",
    claim: "India-specific evidence in the lost civilization debate: Dwarka, Kumari Kandam, Gobekli Tepe parallels",
    status: "open",
    evidence:
      "S.R. Rao\u2019s underwater Dwarka: submerged structures, 120+ stone anchors, TL-dated fort walls. Gulf of Cambay: C14-dated wood 7,500\u20139,000 BP. Gobekli Tepe: Pillar 43 vulture/sun resembles Garuda.",
    notes:
      "Hancock and Oak converge on deep antiquity but differ on method: Hancock uses archaeological anomalies (low falsifiability); Oak uses precession-based dating (higher falsifiability).",
  },
  {
    id: "oak-framework-criticisms",
    category: "historiographical",
    claim: "Major criticisms of Oak\u2019s archaeoastronomical framework and his responses",
    status: "open",
    evidence:
      "Raja Ram Mohan Roy: periodicity of planetary positions. Jayasree Saranathan: Right Ascension is a Western coordinate. Nityananda Misra: seasonal descriptions don\u2019t match proposed dates.",
    notes:
      "Oak responds: critics cherry-pick 3\u20134 references while ignoring the remaining 200+ that must be satisfied simultaneously.",
  },
];

// -----------------------------------------------------------------------------
// FAQs
// -----------------------------------------------------------------------------

export const historyFaqs: HistoryFaq[] = [
  {
    question:
      "How do Oak and Bhaty date the Mahabharata to 5561 BCE?",
    answer:
      "Nilesh Oak extracts 215+ astronomical observations from the Mahabharata text and tests them simultaneously using planetarium software (Voyager 4.5, Stellarium). The key is the Arundhati-Vasishtha observation: the star Alcor walking ahead of Mizar, which only occurred between 11,091 and 4,508 BCE. Combined with planetary positions, eclipses, and seasonal markers, 5561 BCE is the only date that satisfies all observations simultaneously.",
  },
  {
    question:
      "Why is there an archaeological gap at these early dates?",
    answer:
      "Oak argues that absence of archaeological evidence does not falsify textual-astronomical evidence. Post-Ice Age sea levels rose 120 meters, submerging ancient coastal zones. Organic materials rarely survive 7,000\u201314,000 years. Most Indian archaeology has focused on the mature Harappan period (~2,600 BCE), leaving the Saraswati basin and earlier periods under-excavated. The question is not whether archaeology currently shows cities at 5,561 BCE, but whether 215+ simultaneous astronomical observations converge on that date.",
  },
  {
    question:
      "What does the Rakhigarhi DNA tell us about ancient India?",
    answer:
      "A 2019 study published in Cell and Science analyzed ancient DNA from a female skeleton at Rakhigarhi (~2,500 BCE). She had no Steppe pastoralist ancestry and no Iranian farmer ancestry. Her genetic profile is the primary ancestry source in South Asia today. This confirms IVC people were indigenous, though the larger study (523 individuals) shows Steppe-related ancestry arrived after IVC decline (~2,000\u20131,500 BCE).",
  },
  {
    question:
      "How does Sanatan history compare to other ancient civilizations?",
    answer:
      "In the Oak-Bhaty framework, the Rigveda predates all known civilizations (22,000+ BCE), and the Ramayana (12,209 BCE) is contemporaneous with the end of the Ice Age. Even by conservative dating, the Indus-Saraswati Civilization (2,600\u20131,900 BCE) was one of four great Bronze Age civilizations alongside Egypt, Mesopotamia, and China, with the world\u2019s earliest known dock (Lothal), ploughed field (Kalibangan), and signboard (Dholavira).",
  },
  {
    question:
      "Why hasn\u2019t the Indus Valley script been deciphered?",
    answer:
      "Five major approaches exist \u2014 Mahadevan and Parpola read it as Proto-Dravidian, S.R. Rao as Sanskritic, Wells uses statistical methods, and Bhaty (2025) proposes it encodes Sanskrit trade-partner place names. The core challenges: no bilingual text (no Rosetta Stone), inscriptions average only 4\u20135 symbols, and scholars disagree on whether the underlying language is Dravidian, Sanskrit, or something else entirely. Farmer, Sproat, and Witzel (2004) even challenged whether it encodes language at all. Tamil Nadu announced a $1 million prize for decipherment in 2025.",
  },
  {
    question:
      "How does Oak\u2019s timeline compare to other proposed Mahabharata dates?",
    answer:
      "Multiple dates have been proposed: Achar (3,067 BCE), the Kali Yuga tradition (3,102 BCE), Iyengar (1,493\u20131,443 BCE), and mainstream archaeology (~1,200\u2013800 BCE). Oak\u2019s key differentiator is the Arundhati-Vasishtha observation: the star Alcor walked ahead of Mizar only between 11,091 and 4,508 BCE. Every date after 4,508 BCE is eliminated by this single, independently verifiable astronomical constraint. Oak also tests all 215+ observations simultaneously rather than cherry-picking a convenient subset.",
  },
  {
    question:
      "What do flood myths across cultures tell us about ancient history?",
    answer:
      "At least six ancient traditions \u2014 Sumerian, Hebrew, Hindu, Greek, Chinese, and Aztec \u2014 describe catastrophic floods. The Hindu version (Matsya avatar warning Manu) appears as early as the Rigveda. These narratives correlate with the confirmed 120-meter post-Ice Age sea level rise (18,000\u20137,000 BP), which drowned coastal zones worldwide. Bruce Masse analyzed 175 flood myths and found convergence on approximately 2,807 BCE. Whether these reflect a single event, regional flooding, or shared mythological structures remains debated.",
  },
  {
    question:
      "Is there a connection between Indian traditions and global lost civilization theories?",
    answer:
      "There are points of convergence. S.R. Rao\u2019s documented underwater findings at Dwarka, the Tamil Kumari Kandam tradition aligning with known meltwater pulses, and Gobekli Tepe\u2019s motifs (vulture/sun resembling Garuda, snake iconography) all overlap with deep-antiquity arguments. However, the methods differ sharply: Oak uses precession-based dating of specific Sanskrit textual references (higher falsifiability), while Hancock\u2019s framework relies on archaeological anomalies and myth analysis (lower falsifiability). Oak\u2019s model assumes cultural continuity; Hancock\u2019s assumes civilizational rupture.",
  },
  {
    question:
      "What are the main criticisms of Oak\u2019s archaeoastronomical dating?",
    answer:
      "Three main criticisms: Raja Ram Mohan Roy argues that planetary periodicity means multiple dates could satisfy the same observations. Jayasree Saranathan objects that Right Ascension is a Western coordinate system inappropriate for ancient Indian astronomy. Nityananda Misra argues that seasonal descriptions in the texts don\u2019t match the proposed dates. Oak responds that critics typically examine 3\u20134 references in isolation while his method requires all 215+ observations to be satisfied simultaneously \u2014 a constraint that eliminates every other proposed date.",
  },
  {
    question:
      "What does geological evidence tell us about the Saraswati River?",
    answer:
      "Multiple lines of geological evidence trace the Saraswati\u2019s history: the Sutlej abandoned its paleochannel ~10,000\u20138,000 BCE (OSL dating), the Yamuna shifted eastward ~5,000\u20133,000 BCE (tectonic studies), and final drying occurred ~2,200\u20131,900 BCE during the 4.2 kiloyear drought. ISRO satellite data and a 2025 multi-sensor SAR study trace paleochannels from the Shivalik foothills to the Rann of Kachchh, with over 1,500 Harappan sites along the course \u2014 more than along the Indus itself.",
  },
];

// -----------------------------------------------------------------------------
// Helper getters
// -----------------------------------------------------------------------------

export function getAllTimelineEvents(): TimelineEvent[] {
  return timelineEras.flatMap((era) => era.events);
}

export function getSiteById(
  id: string,
): ArchaeologicalSite | undefined {
  return archaeologicalSites.find((s) => s.id === id);
}

export function getResearcherById(
  id: string,
): Researcher | undefined {
  return researchers.find((r) => r.id === id);
}

export function getEvidenceByStatus(
  status: EvidenceItem["status"],
): EvidenceItem[] {
  return evidenceItems.filter((e) => e.status === status);
}

export function getEvidenceByStatusGroupedByCategory(
  status: EvidenceItem["status"],
): Map<EvidenceCategory, EvidenceItem[]> {
  const items = getEvidenceByStatus(status);
  const grouped = new Map<EvidenceCategory, EvidenceItem[]>();
  for (const item of items) {
    const existing = grouped.get(item.category) ?? [];
    existing.push(item);
    grouped.set(item.category, existing);
  }
  return grouped;
}

export const categoryLabels: Record<EvidenceCategory, string> = {
  astronomical: "Astronomical",
  geological: "Geological & River",
  genetic: "Genetic",
  archaeological: "Archaeological",
  "cross-cultural": "Cross-Cultural",
  historiographical: "Historiographical",
};

export function getDynastyNodeById(
  id: string,
): DynastyNode | undefined {
  return dynastyNodes.find((n) => n.id === id);
}
