// =============================================================================
// Documented Temple Destructions — Medieval India
// =============================================================================
// Source: Hindu Temples — What Happened to Them? Vols I & II, ed. Sita Ram Goel
// (Voice of India, 1990–1993). The book aggregates citations from medieval
// Muslim chronicles, mosque-inscription epigraphy, and Archaeological Survey
// of India field reports. Quotations below are from the chronicles cited by
// the book; the book itself is the research-finder, not the primary source.
// =============================================================================

export interface DestroyedTemple {
  id: string;
  name: string;
  deity: string; // Shiva / Vishnu / Devi / Surya / Buddha / Jain / Multi
  location: {
    place: string;
    state: string; // modern state / region
  };
  destroyer: {
    name: string; // ruler or general
    dynasty: string;
    year: number; // CE; negative = BCE; 0 = unknown
  };
  modernStatus: string; // what stands on the site today
  primarySource: {
    chronicle: string; // the medieval Muslim chronicle cited
    author: string;
    note?: string; // additional provenance, e.g. ASI report
  };
  quote: string; // direct quotation from the primary source
  significance: string; // 1-3 sentences on why this case matters
}

export const destroyedTemples: DestroyedTemple[] = [
  {
    id: "somnath-mahmud-1026",
    name: "Somnath",
    deity: "Shiva",
    location: { place: "Prabhas Patan, Saurashtra", state: "Gujarat" },
    destroyer: { name: "Mahmud of Ghazni", dynasty: "Ghaznavid", year: 1026 },
    modernStatus:
      "Rebuilt 1951 under Sardar Patel; sixth reconstruction over the original site.",
    primarySource: {
      chronicle: "Tabaqat-i-Nasiri",
      author: "Minhaj-us-Siraj (13th c.)",
      note: "Also: Tarikh-i-Yamini by Utbi; Kitab-ul-Hind by al-Biruni",
    },
    quote:
      "When Sultan Mahmud ascended the throne of sovereignty his illustrious deeds became manifest unto all mankind within the pale of Islam when he converted so many thousands of idol-temples into masjids... He led an army to Naharwala of Gujarat, and brought away Manat, the idol from Somnath, and had it broken into four parts, one of which was cast before the centre of the great masjid at Ghaznin, the second before the gateway of the Sultan's palace, and the third and fourth were sent to Makkah and Madinah respectively.",
    significance:
      "The canonical example of medieval temple destruction in Hindu memory. Mahmud's coins struck at Lahore in the seventh year of his reign describe him as 'the right hand of the Caliph' and 'the breaker of idols.' The temple was rebuilt repeatedly through medieval and modern periods.",
  },
  {
    id: "kashi-vishwanath-aurangzeb-1669",
    name: "Kashi Vishwanath (Vishweshwar)",
    deity: "Shiva",
    location: { place: "Varanasi", state: "Uttar Pradesh" },
    destroyer: { name: "Aurangzeb", dynasty: "Mughal", year: 1669 },
    modernStatus:
      "Gyanvapi Mosque stands on the western half of the original temple footprint. Adjacent Kashi Vishwanath rebuilt 1780 by Maharani Ahilyabai Holkar.",
    primarySource: {
      chronicle: "Maasir-i-Alamgiri",
      author: "Saqi Mustaid Khan (completed 1710)",
      note: "Compiled from Aurangzeb's own state archives",
    },
    quote:
      "The Lord Cherisher of the Faith learnt that in the provinces of Tatta, Multan, and especially at Benares, the Brahman misbelievers used to teach their false books in their established schools... His Majesty, eager to establish Islam, issued orders to the governors of all the provinces to demolish the schools and temples of the infidels... It was reported that, according to the Emperor's command, his officers had demolished the temple of Viswanath at Kashi.",
    significance:
      "Aurangzeb's general firman of April 1669 is the most explicit standing order for temple destruction in Mughal records. Maulana Abdul Hai's own 20th-century Urdu work confirms the Benares mosque 'was built by Alamgir on the site of the Bisheshwar Temple... with those very stones he constructed a lofty mosque.' Visible temple-fabric still embedded in the western wall of the Gyanvapi mosque.",
  },
  {
    id: "keshavdev-mathura-aurangzeb-1670",
    name: "Keshavdev (Krishna Janmasthan)",
    deity: "Vishnu (Krishna)",
    location: { place: "Mathura", state: "Uttar Pradesh" },
    destroyer: { name: "Aurangzeb", dynasty: "Mughal", year: 1670 },
    modernStatus:
      "Shahi Eidgah stands on the original temple footprint, adjacent to the modern Krishna Janmasthan complex.",
    primarySource: {
      chronicle: "Maasir-i-Alamgiri",
      author: "Saqi Mustaid Khan",
    },
    quote:
      "During this month of Ramzan abounding in miracles, the Emperor... issued orders for the demolition of the temple situated in Mathura, famous as the Dehra of Kesho Rai. In a short time by the great exertions of his officers the destruction of this strong foundation of infidelity was accomplished, and on its site a lofty mosque was built at the expenditure of a large sum... The idols, large and small, set with costly jewels which had been set up in the temple were brought to Agra, and buried under the steps of the mosque of the Begam Sahib, in order to be continually trodden upon. The name of Mathura was changed to Islamabad.",
    significance:
      "The Keshavdev temple at Krishna's birthplace was a pre-eminent Vaishnava shrine. Aurangzeb's own court chronicle records both the destruction and the deliberate humiliation of the idols by burial under mosque steps in Agra. Mathura's renaming to Islamabad reflects the depth of the intended erasure.",
  },
  {
    id: "ram-janmasthan-babri-1528",
    name: "Ram Janmasthan",
    deity: "Vishnu (Rama)",
    location: { place: "Ayodhya", state: "Uttar Pradesh" },
    destroyer: { name: "Mir Baqi (under Babur)", dynasty: "Mughal", year: 1528 },
    modernStatus:
      "Ram Mandir consecrated January 2024 after the 2019 Supreme Court verdict; Babri Masjid demolished December 1992.",
    primarySource: {
      chronicle: "Hadiqah-i Shuhada / Tarikh-i Avadh / Babri Masjid inscription",
      author: "Mirza Jan (1856); Shykh Azamat Ali Kakorawi Nami (1869)",
      note: "Pre-British Muslim sources; ASI 2003 excavation report",
    },
    quote:
      "Even as they cleared up Mathura, Bindraban, etc., from the rubbish of non-Islamic practices, the Babari mosque was built up in 923 A.H. under the patronage of Sayyid Musa Ashiqan in the Janmasthan temple (butkhane Janmasthan mein) in Faizabad-Avadh, which was a great place of worship and capital of Rama's father. (Kakorawi, Muraqqah-i Khusrawi, 1869)",
    significance:
      "Four pre-British Muslim sources (1856–1869) describe the Babri Masjid as built on the Janmasthan temple. The 2003 Archaeological Survey of India report under court direction found a pre-existing massive structure with pillar bases and a north–south wall beneath the mosque. The Supreme Court's 2019 verdict relied on this combined evidence.",
  },
  {
    id: "rudramahalaya-sidhpur-1297-1415",
    name: "Rudramahalaya",
    deity: "Shiva (Eleven Rudras)",
    location: { place: "Sidhpur, Mehsana", state: "Gujarat" },
    destroyer: {
      name: "Ulugh Khan (1297) and Ahmed Shah I (1415)",
      dynasty: "Khalji + Gujarat Sultanate",
      year: 1415,
    },
    modernStatus:
      "Jami Masjid of Sidhpur built on Rudramahalaya remains. ASI excavations exposed the temple plinth and a Shiva linga within the mosque premises.",
    primarySource: {
      chronicle: "Fourth Annual Report of the Minorities' Commission (1983)",
      author: "Government of India",
      note: "Citing earlier ASI surveys and Gujarat Sultanate chronicles",
    },
    quote:
      "This temple seems to have been destroyed partly by Ulugh Khan in AD 1297–98 and partly by Ahmedshah in AD 1415. Some of the cubicles and a number of pillars on the Western side of the temple it would appear were later converted into a mosque.",
    significance:
      "A rare case where a Government of India Minorities' Commission report (1983) explicitly documents the temple-to-mosque conversion. The Rudramahalaya complex was built by Siddhraj Jayasimha in the 12th century — one of the largest Shaiva temple complexes in western India before its destruction.",
  },
  {
    id: "martand-sun-temple-sikandar-c1400",
    name: "Martand Sun Temple",
    deity: "Surya",
    location: { place: "Anantnag, Kashmir Valley", state: "Jammu & Kashmir" },
    destroyer: {
      name: "Sikandar Shah Miri ('Butshikan')",
      dynasty: "Shah Mir Sultanate of Kashmir",
      year: 1400,
    },
    modernStatus:
      "Ruins survive; ASI-protected monument. The destruction of Kashmir's temple corpus during Sikandar's reign (c.1389–1413) is the most thorough regional erasure documented.",
    primarySource: {
      chronicle: "Tarikh-i-Rashidi / Tarikh-i-Hassan / Baharistan-i-Shahi",
      author: "Mirza Haidar Dughlat (16th c.); Pir Hassan Shah; anon.",
    },
    quote:
      "Srinagar, ancient Hindu city converted into a Muslim capital. The Jayasvamin, Vishnusvamin, Bhimasvamin, Vishnu Ranasvamin, Narendrasvamin, Vikrameshvara, Diddamatha, Skandabhavana Vihara, and Meruvardhanaswamin temples were converted or demolished by Sikandar Butshikan; the Jami Masjid was originally built by him on the materials of these temples. (Compilation of survey records, Goel)",
    significance:
      "Sikandar's title 'Butshikan' (idol-breaker) was given to him by Kashmir's own Persian chroniclers — not by hostile sources. The Kashmir Valley's pre-Islamic Hindu and Buddhist monument corpus, documented by Kalhana in the Rajatarangini (12th c.), was systematically destroyed within a single generation.",
  },
  {
    id: "nalanda-odantapuri-bakhtiyar-1193",
    name: "Odantapuri (Vikramashila / Nalanda complex)",
    deity: "Buddha (Mahayana Vihara)",
    location: { place: "Bihar Sharif", state: "Bihar" },
    destroyer: {
      name: "Bakhtiyar Khilji",
      dynasty: "Ghurid / Slave Sultanate",
      year: 1193,
    },
    modernStatus:
      "Bihar Sharif's Muslim monuments — Bada Dargah, Chhota Dargah, the dargah of Makhdum-ul-Mulk Sharifuddin, and the Jami Masjid in Paharpur Mahalla — stand on the site and use the materials of the destroyed vihara.",
    primarySource: {
      chronicle: "Tabaqat-i-Nasiri",
      author: "Minhaj-us-Siraj (c. 1260)",
      note: "Tibetan account by Taranatha is secondary",
    },
    quote:
      "Muhammad Bakht-yar... advanced with great vigour, attacked the place, and Muhammad Bakht-yar, with two of his brothers, advanced to the gate of the fortress and engaged in the fight... Most of the inhabitants of the place were Brahmans with shaven heads. They were put to death. Large numbers of books were found there, and when the Muhammadans saw them, they called for some person to explain their contents, but all of the men had been killed.",
    significance:
      "The destruction of Odantapuri (often conflated with Nalanda) is the single event most associated with the disappearance of organized Buddhism from northern India. The 'shaven-head Brahmans' Minhaj describes were Buddhist monks; Bakhtiyar mistook the vihara for a fort.",
  },
  {
    id: "vijayanagara-talikota-1565",
    name: "Vithalaswamin and Vijayanagara temple complex",
    deity: "Vishnu (Vithoba)",
    location: { place: "Hampi", state: "Karnataka" },
    destroyer: {
      name: "Combined armies (Bijapur, Ahmadnagar, Golconda, Bidar)",
      dynasty: "Deccan Sultanates",
      year: 1565,
    },
    modernStatus:
      "UNESCO World Heritage Site (1986). Cracked beams and fire-flaked pillars of the Vithalaswamin temple still visible. Masjid and Idgah built later within the ruins use temple materials.",
    primarySource: {
      chronicle: "Robert Sewell, A Forgotten Empire: Vijayanagar (1900)",
      author: "Sewell, citing Portuguese eyewitness Fernão Nuniz and contemporary records",
    },
    quote:
      "The third day saw the beginning of the end... for a space of five months Vijayanagar knew no rest. The enemy had come to destroy, and they carried out their object relentlessly. They slaughtered the people without mercy; broke down the temples and palaces, and wreaked such savage vengeance on the abode of the kings, that, with the exception of a few great stone-built temples and walls, nothing now remains but a heap of ruins... They lit huge fires in the magnificently decorated buildings forming the temple of Vitthalswamin near the river, and smashed its exquisite stone sculptures. With fire and sword, with crowbars and axes, they carried on day after day their work of destruction. Never perhaps in the history of the world has such havoc been wrought, and wrought so suddenly, on so splendid a city.",
    significance:
      "Vijayanagara was the last major Hindu imperial capital. Its destruction over five months after Talikota (January 1565) is the most concentrated single act of temple destruction documented for the medieval period. The Portuguese eyewitness accounts independently corroborate the Persian chronicles.",
  },
  {
    id: "udaipur-aurangzeb-1680",
    name: "Jagannath Rai and 235 temples of Mewar",
    deity: "Vishnu (multiple) + Shiva",
    location: { place: "Udaipur", state: "Rajasthan" },
    destroyer: { name: "Aurangzeb (via Ruhullah Khan, Hasan Ali Khan)", dynasty: "Mughal", year: 1680 },
    modernStatus:
      "The Jagdish Mandir (rebuilt 1651 by Maharana Jagat Singh I) is the surviving counterpart; the great temple in front of the Rana's palace was destroyed.",
    primarySource: {
      chronicle: "Maasir-i-Alamgiri / Akhbarat",
      author: "Saqi Mustaid Khan; contemporary court reports",
    },
    quote:
      "Ruhullah Khan and Ekkataz Khan went to demolish the great temple in front of the Rana's palace, which was one of the rarest buildings of the age... Twenty machator Rajputs who were sitting in the temple vowed to give up their lives; first one of them came out to fight, killed some and was then himself slain, then came out another and so on, until every one of the twenty perished... The hewers broke the images. On Saturday, the 24th January 1680... the Emperor ordered all the three temples on its banks (lake Udaisagar) to be demolished. On the 29th January, Hasan Ali Khan brought to the Emperor twenty camel-loads of tents and other things captured from the Rana's palace and reported that one hundred and seventy-two other temples in the environs of Udaipur had been destroyed.",
    significance:
      "Aurangzeb's Mewar campaign produced one of the highest documented temple-destruction counts for a single fortnight — 172 temples in the environs plus the great temple at the palace plus three at Lake Udaisagar plus 60+ in subsequent operations. The twenty Rajputs' defense is the kind of small-scale resistance that is recorded only because the Mughal chronicler thought it worth noting.",
  },
  {
    id: "amber-aurangzeb-1680",
    name: "Sixty-six temples of Amber",
    deity: "Multiple (Vishnu, Shiva, Devi)",
    location: { place: "Amber (Amer)", state: "Rajasthan" },
    destroyer: { name: "Aurangzeb (via Abu Turab)", dynasty: "Mughal", year: 1680 },
    modernStatus:
      "Amber Fort survives as a UNESCO site; the destroyed temples have not been individually identified.",
    primarySource: {
      chronicle: "Maasir-i-Alamgiri",
      author: "Saqi Mustaid Khan",
    },
    quote:
      "Abu Turab, who had been sent to demolish the temples of Amber, returned to Court on Tuesday, the 10th August / 24th Rajab, and reported that he had pulled down sixty-six temples.",
    significance:
      "A clean single-sentence court report — one general, one province, sixty-six temples destroyed, recorded by Aurangzeb's own court historian. The matter-of-fact tone is the most damning aspect: this was routine administration, not war.",
  },
  {
    id: "khandela-aurangzeb-1679",
    name: "Great temple of Khandela",
    deity: "Devi",
    location: { place: "Khandela, Sikar", state: "Rajasthan" },
    destroyer: { name: "Aurangzeb (via Darab Khan)", dynasty: "Mughal", year: 1679 },
    modernStatus:
      "Temple site occupied by later structures; the surrounding Khandela/Sanula temples were systematically demolished.",
    primarySource: {
      chronicle: "Maasir-i-Alamgiri",
      author: "Saqi Mustaid Khan",
    },
    quote:
      "Darab Khan who had been sent with a strong force to punish the Rajputs of Khandela and to demolish the great temple of the place, attacked the place on the 8th March / 5th Safar, and slew the three hundred and odd men who made a bold defence, not one of them escaping alive. The temples of Khandela and Sanula and all other temples in the neighbourhood were demolished.",
    significance:
      "Three hundred Rajputs died defending one temple — a number recorded by the Mughal chronicler himself. The Khandela episode is one of the most explicit accounts of armed resistance to temple destruction documented in the Mughal sources.",
  },
  {
    id: "jodhpur-aurangzeb-1679",
    name: "Temples of Marwar (Jodhpur)",
    deity: "Multiple",
    location: { place: "Jodhpur", state: "Rajasthan" },
    destroyer: { name: "Aurangzeb (via Khan Jahan Bahadur)", dynasty: "Mughal", year: 1679 },
    modernStatus:
      "Jodhpur's pre-Mughal temple corpus largely destroyed in 1679; later Rajput rebuilding produced the present temple stock.",
    primarySource: {
      chronicle: "Maasir-i-Alamgiri",
      author: "Saqi Mustaid Khan",
    },
    quote:
      "On Sunday, the 25th May / 24th Rabi-us-Sani, Khan Jahan Bahadur came from Jodhpur, after demolishing the temples and bringing with himself some cart-loads of idols, and had audience of the Emperor, who highly praised him and ordered that the idols, which were mostly jewelled, golden, silvery, bronze, copper or stone, should be cast in the yard of the Court and under the steps of the Jami mosque, to be trodden on. They remained so for some time and at last their very names were lost.",
    significance:
      "The deliberate humiliation pattern — temple idols placed under the steps of mosques to be trodden upon — is repeatedly attested in Aurangzeb's court records (Jodhpur 1679; Mathura 1670 with idols sent to Agra Begum Sahib mosque).",
  },
  {
    id: "vithoba-pandharpur-aurangzeb",
    name: "Vithoba temple",
    deity: "Vishnu (Vithoba)",
    location: { place: "Pandharpur", state: "Maharashtra" },
    destroyer: { name: "Aurangzeb", dynasty: "Mughal", year: 1700 },
    modernStatus:
      "Present Vithoba temple is on the original site; the medieval structure was demolished but the deity tradition continued underground.",
    primarySource: {
      chronicle: "Akhbarat (Aurangzeb's court reports)",
      author: "Compiled during Aurangzeb's Deccan campaign",
    },
    quote:
      "The Emperor, summoning Muhammad Khalil and Khidmat Rai, the darogha of hatchet-men, ordered them to demolish the temple of Pandharpur, and to take the butchers of the camp there and slaughter cows in the temple. It was done.",
    significance:
      "The Pandharpur Vithoba is the central deity of the Maharashtrian Bhakti tradition (Tukaram, Namdev, Eknath). The order to slaughter cows in the temple was specifically designed to render the site unfit for Hindu worship — a recurring technique recorded across multiple campaigns.",
  },
  {
    id: "quwwatul-islam-aibak-1198",
    name: "Twenty-seven temples (Mehrauli)",
    deity: "Multi (Hindu and Jain)",
    location: { place: "Mehrauli, Delhi", state: "Delhi" },
    destroyer: { name: "Qutbuddin Aibak", dynasty: "Slave (Mamluk) Sultanate", year: 1198 },
    modernStatus:
      "Quwwat-ul-Islam Masjid stands in the Qutb complex (UNESCO 1993). Its inscription explicitly records construction from temple materials.",
    primarySource: {
      chronicle: "Persian inscription on the eastern gateway of Quwwat-ul-Islam Masjid",
      author: "Qutbuddin Aibak (date: 1192–1198 CE)",
      note: "The inscription itself is the primary source.",
    },
    quote:
      "This fort was conquered and the Jami Masjid built in the year 587 (AH) by the Amir... Qutb-ud-Dawa-wa-ud-Din, the Amir-ul-Umara Aibak Sultani. The materials of 27 idol-houses, on each of which 2,000,000 Dehliwals had been spent, were used in the construction of the mosque.",
    significance:
      "The Qutb Minar inscription is one of the few cases where the destroyer's own inscription names both the count (27 temples) and the cost of the destroyed structures. Maulana Abdul Hai (Nadwa, 1973) confirms: 'The materials of demolished Hindu temples are visible everywhere in this mosque.'",
  },
  {
    id: "adhai-din-jhonpra-ghori-1199",
    name: "Sanskrit college and temples of Ajmer",
    deity: "Multi",
    location: { place: "Ajmer", state: "Rajasthan" },
    destroyer: { name: "Muhammad of Ghor (via Qutbuddin Aibak)", dynasty: "Ghurid", year: 1199 },
    modernStatus:
      "Adhai-Din-Ka-Jhonpra Mosque stands on the converted complex. The pillars retain Sanskrit inscriptions and Hindu/Jain temple iconography visible to any visitor.",
    primarySource: {
      chronicle: "Taj-ul-Maasir",
      author: "Hasan Nizami (c. 1200 CE)",
    },
    quote:
      "He [Muhammad of Ghor] built the Adhai-Din-Ka-Jhonpra mosque in 1199 AD at Ajmer at the site of a Sanskrit college which was demolished for the purpose. The pillars of this mosque clearly belong to a Hindu temple. The minbar bears an Arabic inscription dated 1200 AD.",
    significance:
      "The name 'Adhai-Din-Ka-Jhonpra' ('two-and-a-half days shed') is itself the mosque's record of how fast it was assembled from demolished temple components. Forty pillars in the prayer hall carry Sanskrit and Prakrit inscriptions and Jain motifs.",
  },
  {
    id: "tiruchirapalli-natthar-wali",
    name: "Sivalinga of Tiruchirapalli",
    deity: "Shiva",
    location: { place: "Tiruchirapalli", state: "Tamil Nadu" },
    destroyer: { name: "Hazrat Natthar Wali (sufi)", dynasty: "Madurai Sultanate era", year: 1340 },
    modernStatus:
      "The Natthar Wali Dargah at Tiruchirapalli stands on the converted site; the present Sivalinga in the dargah's lower chamber is the partially-buried original.",
    primarySource: {
      chronicle: "Tarikh-i-Wali (hagiography of Natthar Wali)",
      author: "Various compilers of dargah records",
    },
    quote:
      "The monster was slain and sent to the house of perdition. His image namely but-linga worshipped by the unbelievers was cut and the head separated from the body. A portion of the body went into the ground. Over that spot is the tomb of Wali shedding radiance till this day.",
    significance:
      "An unusually frank dargah-hagiography that records the conversion of a Shiva temple into a sufi shrine. The 'monster' is the deity; the 'but-linga' is the Shivalinga; the head-and-body imagery describes how the linga was broken and partially buried. The site is the only southern Indian dargah whose own internal records describe the conversion explicitly.",
  },
];

// -----------------------------------------------------------------------------
// Aggregate helpers
// -----------------------------------------------------------------------------

export interface StateDestructionSummary {
  state: string;
  documentedCount: number; // entries in the Vol I Ch 10 list
  notableDestroyers: string[];
}

/**
 * Approximate counts from Goel Vol I Ch 10 "Let the Mute Witnesses Speak"
 * — Muslim monuments built on temple sites or with temple materials, by state.
 * These are *documented* cases with archaeological survey provenance, not totals.
 */
export const stateDestructionSummary: StateDestructionSummary[] = [
  { state: "Andhra Pradesh", documentedCount: 150, notableDestroyers: ["Qutb Shahi", "Aurangzeb"] },
  { state: "Bihar", documentedCount: 50, notableDestroyers: ["Bakhtiyar Khilji", "Sher Shah"] },
  { state: "Delhi", documentedCount: 70, notableDestroyers: ["Qutbuddin Aibak", "Iltutmish", "Tughlaqs", "Babur"] },
  { state: "Gujarat", documentedCount: 200, notableDestroyers: ["Mahmud of Ghazni", "Alauddin Khalji", "Ahmed Shah", "Aurangzeb"] },
  { state: "Haryana", documentedCount: 40, notableDestroyers: ["Mu'izzuddin Ghori", "Firuz Shah Tughlaq"] },
  { state: "Karnataka", documentedCount: 150, notableDestroyers: ["Malik Kafur", "Bahmanis", "Deccan Sultanates (1565)"] },
  { state: "Kashmir", documentedCount: 40, notableDestroyers: ["Sikandar Butshikan", "Aurangzeb"] },
  { state: "Madhya Pradesh", documentedCount: 150, notableDestroyers: ["Iltutmish (Bhopal)", "Mahmud Khalji (Mandu)", "Aurangzeb"] },
  { state: "Maharashtra", documentedCount: 100, notableDestroyers: ["Alauddin Khalji", "Bahmanis", "Aurangzeb"] },
  { state: "Orissa", documentedCount: 35, notableDestroyers: ["Sultans of Bengal", "Kalapahar"] },
  { state: "Punjab", documentedCount: 25, notableDestroyers: ["Mahmud of Ghazni", "Mu'izzuddin Ghori"] },
  { state: "Rajasthan", documentedCount: 150, notableDestroyers: ["Mu'izzuddin Ghori", "Alauddin Khalji", "Aurangzeb"] },
  { state: "Tamil Nadu", documentedCount: 80, notableDestroyers: ["Malik Kafur", "Madurai Sultans"] },
  { state: "Uttar Pradesh", documentedCount: 400, notableDestroyers: ["Mahmud of Ghazni", "Mu'izzuddin Ghori", "Aurangzeb"] },
];

export function totalDocumentedCount(): number {
  return stateDestructionSummary.reduce((sum, s) => sum + s.documentedCount, 0);
}

export function getDestroyedTempleById(id: string): DestroyedTemple | undefined {
  return destroyedTemples.find((t) => t.id === id);
}

export function getTemplesByDestroyer(name: string): DestroyedTemple[] {
  return destroyedTemples.filter((t) =>
    t.destroyer.name.toLowerCase().includes(name.toLowerCase()),
  );
}

export function getTemplesByState(state: string): DestroyedTemple[] {
  return destroyedTemples.filter(
    (t) => t.location.state.toLowerCase() === state.toLowerCase(),
  );
}
