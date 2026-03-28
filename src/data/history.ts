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

export interface EvidenceItem {
  id: string;
  claim: string;
  status: "confirmed" | "strong" | "open";
  evidence: string;
  notes: string;
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
    id: "sinauli-site",
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
  // Confirmed
  {
    id: "av-observation",
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
    claim: "Bhimbetka: 100,000+ years continuous occupation",
    status: "confirmed",
    evidence:
      "750+ rock shelters. Cupules dated 200,000+ years. UNESCO World Heritage Site.",
    notes: "Among the world\u2019s oldest occupied sites.",
  },
  {
    id: "mehrgarh-evidence",
    claim: "Mehrgarh: independent farming origin (~7,000 BCE)",
    status: "confirmed",
    evidence:
      "Wheat, barley, cattle domestication independent of Near East. Mud-brick architecture.",
    notes:
      "Proves South Asia had its own Neolithic revolution.",
  },
  {
    id: "rakhigarhi-dna",
    claim: "Rakhigarhi: no Steppe DNA at 2,500 BCE",
    status: "confirmed",
    evidence:
      "Ancient DNA from female skeleton published in Cell and Science (2019). No Steppe pastoralist ancestry, no Iranian farmer ancestry.",
    notes:
      "Interpretation debated: Shinde says it disproves AIT; Patterson (co-author) says later migration still supported.",
  },
  {
    id: "saraswati-paleo",
    claim: "Saraswati/Ghaggar-Hakra paleochannel exists",
    status: "confirmed",
    evidence:
      "ISRO + international satellite data. 2025 multi-sensor SAR study traces channels from Shivalik foothills to Rann of Kachchh.",
    notes: "1,500+ Harappan sites along the course.",
  },
  {
    id: "sea-level",
    claim: "Post-Ice Age sea level rise: 120 meters",
    status: "confirmed",
    evidence:
      "Confirmed by global oceanographic data. Meltwater Pulse 1A (~14,600 BP) and 1B (~11,500 BP).",
    notes:
      "Drowned coastal sites worldwide. Explains submersion of ancient coastal settlements.",
  },
  // Strong
  {
    id: "mb-5561",
    claim: "Mahabharata war: 5,561 BCE",
    status: "strong",
    evidence:
      "215+ simultaneous astronomical references. AV observation + planetary positions + eclipses + seasons + Saraswati geology + Dwarka submersion timeline.",
    notes:
      "Most evidence-dense dating proposal for any ancient event. Critics cherry-pick 3\u20134 refs while ignoring the remaining 200+.",
  },
  {
    id: "ramayana-12209",
    claim: "Ramayana war: 12,209 BCE",
    status: "strong",
    evidence:
      "345+ astronomical refs + 600+ in Sugriva\u2019s Atlas. Climate descriptions match Pleistocene. Two pole stars confirmed by Bhaty.",
    notes:
      "Archaeological gap at this date remains the primary challenge. Oak argues preservation bias and 120m sea rise.",
  },
  {
    id: "ivc-vedic-continuity",
    claim: "IVC-Vedic cultural continuity",
    status: "strong",
    evidence:
      "Rakhigarhi DNA (indigenous), Saraswati paleochannel with 1,500+ Harappan sites, fire altars at Kalibangan, pottery sequence overlap.",
    notes:
      "Steppe ancestry arrived 2,300\u20131,500 BCE. Whether this brought languages or just genes is debated.",
  },
  // Open
  {
    id: "arch-gap-12000",
    claim: "Archaeological gap at 12,000 BCE",
    status: "open",
    evidence:
      "No known settlements matching Ramayana descriptions at this date.",
    notes:
      "120m sea rise submerged coastal zones. Organic materials don\u2019t survive 14,000 years. Preservation bias is real but the gap remains.",
  },
  {
    id: "arch-gap-5561",
    claim: "Archaeological gap at 5,561 BCE",
    status: "open",
    evidence:
      "Mehrgarh at this date is a farming village, not a kingdom with chariots and armies.",
    notes:
      "Are we looking in the right places? Saraswati basin sites mostly unexcavated. Most archaeology focused on mature Harappan (~2,600 BCE).",
  },
  {
    id: "steppe-language",
    claim:
      "Did Steppe ancestry bring Indo-Aryan languages or just genes?",
    status: "open",
    evidence:
      "Genetic mixing confirmed 2,300\u20131,500 BCE. Linguistic spread correlates but causation is debated.",
    notes:
      "PIE wheel vocabulary constrains the language family to ~6,000 years. Sanskrit-IVC script proposals (Bhaty 2025) challenge this.",
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

export function getDynastyNodeById(
  id: string,
): DynastyNode | undefined {
  return dynastyNodes.find((n) => n.id === id);
}
