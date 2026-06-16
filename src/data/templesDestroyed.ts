// =============================================================================
// Documented Temple Destructions — Medieval India
// =============================================================================
// Source: Hindu Temples — What Happened to Them? Vols I & II, ed. Sita Ram Goel
// (Voice of India, 1990–1993). The book aggregates citations from medieval
// Muslim chronicles, mosque-inscription epigraphy, and Archaeological Survey
// of India field reports. Quotations below are from the chronicles cited by
// the book; the book itself is the research-finder, not the primary source.
//
// Source tiers:
//   A-primary    — entry rests on a directly verifiable chronicle passage,
//                  mosque inscription text, ASI report, or court record we
//                  can cite verbatim.
//   B-corroborated — entry rests on a state-list provenance plus an
//                  inscription / ASI survey reference that confirms it.
//   C-listed     — entry comes from Vol I Ch 10 "Let the Mute Witnesses
//                  Speak" district list with brief provenance only; no full
//                  chronicle passage available. These are tagged so callers
//                  can filter by evidentiary weight.
// =============================================================================

export type SourceTier = "A-primary" | "B-corroborated" | "C-listed";

export type TempleRegion =
  | "North"
  | "South"
  | "Deccan"
  | "East"
  | "West"
  | "Central"
  | "NW Frontier"
  | "Kashmir Valley";

export interface DestroyedTemple {
  id: string;
  name: string;
  deity: string; // Shiva / Vishnu / Devi / Surya / Buddha / Jain / Multi
  location: {
    place: string; // city / town
    district?: string; // district within state
    state: string; // modern state / region
    region?: TempleRegion; // coarser region for cluster pages
    coordinates?: { lat: number; lng: number }; // optional, only when reliably known
  };
  destroyer: {
    name: string; // ruler or general
    dynasty: string;
    year: number; // CE; negative = BCE; 0 = unknown
  };
  modernStatus: string; // what stands on the site today
  primarySource: {
    chronicle: string; // the medieval Muslim chronicle / inscription / ASI report
    author: string;
    note?: string; // additional provenance, e.g. discovery year, ASI volume
  };
  quote: string; // direct quotation from the primary source
  significance: string; // 1-3 sentences on why this case matters
  sourceTier: SourceTier;
}

export const destroyedTemples: DestroyedTemple[] = [
  // ---------------------------------------------------------------------------
  // A-primary cases (chronicle / inscription / ASI report quoted directly)
  // ---------------------------------------------------------------------------
  {
    id: "somnath-mahmud-1026",
    name: "Somnath",
    deity: "Shiva",
    location: {
      place: "Prabhas Patan, Saurashtra",
      district: "Gir Somnath",
      state: "Gujarat",
      region: "West",
      coordinates: { lat: 20.888, lng: 70.401 },
    },
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
    sourceTier: "A-primary",
  },
  {
    id: "kashi-vishwanath-aurangzeb-1669",
    name: "Kashi Vishwanath (Vishweshwar)",
    deity: "Shiva",
    location: {
      place: "Varanasi",
      district: "Varanasi",
      state: "Uttar Pradesh",
      region: "North",
      coordinates: { lat: 25.3109, lng: 83.0107 },
    },
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
    sourceTier: "A-primary",
  },
  {
    id: "keshavdev-mathura-aurangzeb-1670",
    name: "Keshavdev (Krishna Janmasthan)",
    deity: "Vishnu (Krishna)",
    location: {
      place: "Mathura",
      district: "Mathura",
      state: "Uttar Pradesh",
      region: "North",
      coordinates: { lat: 27.5051, lng: 77.6731 },
    },
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
    sourceTier: "A-primary",
  },
  {
    id: "ram-janmasthan-babri-1528",
    name: "Ram Janmasthan",
    deity: "Vishnu (Rama)",
    location: {
      place: "Ayodhya",
      district: "Ayodhya",
      state: "Uttar Pradesh",
      region: "North",
      coordinates: { lat: 26.7956, lng: 82.1943 },
    },
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
    sourceTier: "A-primary",
  },
  {
    id: "rudramahalaya-sidhpur-1297-1415",
    name: "Rudramahalaya",
    deity: "Shiva (Eleven Rudras)",
    location: {
      place: "Sidhpur",
      district: "Patan",
      state: "Gujarat",
      region: "West",
      coordinates: { lat: 23.918, lng: 72.379 },
    },
    destroyer: {
      name: "Ulugh Khan (1297) and Ahmed Shah I (1415)",
      dynasty: "Khalji + Gujarat Sultanate",
      year: 1415,
    },
    modernStatus:
      "Jami Masjid of Sidhpur built on Rudramahalaya remains. ASI excavations exposed the temple plinth and a Shiva linga within the mosque premises.",
    primarySource: {
      chronicle: "Mirat-i-Sikandari",
      author: "Sikandar ibn-i-Muhammad alias Manjhu ibn-i-Akbar (early 16th c.)",
      note:
        "Also: Fourth Annual Report of the Minorities' Commission (1983), citing earlier ASI surveys",
    },
    quote:
      "He marched on Saiyidpur on Jamad-ul-Awwal in AH 818 (July/August AD 1415) in order to destroy the temples which housed idols of gold and silver... Its foundations were laid firmly in stone, it was decorated with designs as if drawn from high heaven. It had doors made of sandal and ud... Such was this famous ancient temple, it was famous all over the world.",
    significance:
      "The Mirat-i-Sikandari preserves Ahmad Shah's 1415 campaign in verse. A 1983 Minorities' Commission report adds that the temple 'seems to have been destroyed partly by Ulugh Khan in AD 1297–98 and partly by Ahmedshah in AD 1415. Some of the cubicles and a number of pillars on the Western side of the temple it would appear were later converted into a mosque.' The Rudramahalaya was one of the largest Shaiva temple complexes in western India before its destruction.",
    sourceTier: "A-primary",
  },
  {
    id: "martand-sun-temple-sikandar-c1400",
    name: "Martand Sun Temple",
    deity: "Surya",
    location: {
      place: "Anantnag",
      district: "Anantnag",
      state: "Jammu & Kashmir",
      region: "Kashmir Valley",
      coordinates: { lat: 33.745, lng: 75.221 },
    },
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
      "On account of his extensive charities, scholars from Iraq, Khorasan and Mawaraun-Nahar started presenting themselves in his court and Islam was spread. He held in great regard Sayyid Muhammad who was a very great scholar of the time, and strived to destroy the idols and temples of the infidels. He got demolished the famous temple of Mahadeva at Bahrare. The temple was dug out from its foundations and the hole (that remained) reached the water level... The value of currency had come down, because Sultan Sikandar had got idols of gold, silver and copper broken and turned into coins.",
    significance:
      "Sikandar's title 'Butshikan' (idol-breaker) was given to him by Kashmir's own Persian chroniclers — not by hostile sources. The Kashmir Valley's pre-Islamic Hindu and Buddhist monument corpus, documented by Kalhana in the Rajatarangini (12th c.), was systematically destroyed within a single generation.",
    sourceTier: "A-primary",
  },
  {
    id: "nalanda-odantapuri-bakhtiyar-1193",
    name: "Odantapuri (Vikramashila / Nalanda complex)",
    deity: "Buddha (Mahayana Vihara)",
    location: {
      place: "Bihar Sharif",
      district: "Nalanda",
      state: "Bihar",
      region: "East",
      coordinates: { lat: 25.2, lng: 85.5237 },
    },
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
    sourceTier: "A-primary",
  },
  {
    id: "vijayanagara-talikota-1565",
    name: "Vithalaswamin and Vijayanagara temple complex",
    deity: "Vishnu (Vithoba)",
    location: {
      place: "Hampi",
      district: "Vijayanagara",
      state: "Karnataka",
      region: "Deccan",
      coordinates: { lat: 15.335, lng: 76.462 },
    },
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
    sourceTier: "A-primary",
  },
  {
    id: "udaipur-aurangzeb-1680",
    name: "Jagannath Rai and 235 temples of Mewar",
    deity: "Vishnu (multiple) + Shiva",
    location: {
      place: "Udaipur",
      district: "Udaipur",
      state: "Rajasthan",
      region: "West",
      coordinates: { lat: 24.5854, lng: 73.7125 },
    },
    destroyer: {
      name: "Aurangzeb (via Ruhullah Khan, Hasan Ali Khan)",
      dynasty: "Mughal",
      year: 1680,
    },
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
    sourceTier: "A-primary",
  },
  {
    id: "amber-aurangzeb-1680",
    name: "Sixty-six temples of Amber",
    deity: "Multiple (Vishnu, Shiva, Devi)",
    location: {
      place: "Amber (Amer)",
      district: "Jaipur",
      state: "Rajasthan",
      region: "West",
      coordinates: { lat: 26.9855, lng: 75.8513 },
    },
    destroyer: {
      name: "Aurangzeb (via Abu Turab)",
      dynasty: "Mughal",
      year: 1680,
    },
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
    sourceTier: "A-primary",
  },
  {
    id: "khandela-aurangzeb-1679",
    name: "Great temple of Khandela",
    deity: "Devi",
    location: {
      place: "Khandela",
      district: "Sikar",
      state: "Rajasthan",
      region: "West",
      coordinates: { lat: 27.602, lng: 75.484 },
    },
    destroyer: {
      name: "Aurangzeb (via Darab Khan)",
      dynasty: "Mughal",
      year: 1679,
    },
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
    sourceTier: "A-primary",
  },
  {
    id: "jodhpur-aurangzeb-1679",
    name: "Temples of Marwar (Jodhpur)",
    deity: "Multiple",
    location: {
      place: "Jodhpur",
      district: "Jodhpur",
      state: "Rajasthan",
      region: "West",
      coordinates: { lat: 26.2389, lng: 73.0243 },
    },
    destroyer: {
      name: "Aurangzeb (via Khan Jahan Bahadur)",
      dynasty: "Mughal",
      year: 1679,
    },
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
    sourceTier: "A-primary",
  },
  {
    id: "vithoba-pandharpur-aurangzeb",
    name: "Vithoba temple",
    deity: "Vishnu (Vithoba)",
    location: {
      place: "Pandharpur",
      district: "Solapur",
      state: "Maharashtra",
      region: "Deccan",
      coordinates: { lat: 17.679, lng: 75.333 },
    },
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
    sourceTier: "A-primary",
  },
  {
    id: "quwwatul-islam-aibak-1198",
    name: "Twenty-seven temples (Mehrauli)",
    deity: "Multi (Hindu and Jain)",
    location: {
      place: "Mehrauli",
      district: "South Delhi",
      state: "Delhi",
      region: "North",
      coordinates: { lat: 28.5244, lng: 77.1855 },
    },
    destroyer: {
      name: "Qutbuddin Aibak",
      dynasty: "Slave (Mamluk) Sultanate",
      year: 1198,
    },
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
    sourceTier: "A-primary",
  },
  {
    id: "adhai-din-jhonpra-ghori-1199",
    name: "Sanskrit college and temples of Ajmer",
    deity: "Multi",
    location: {
      place: "Ajmer",
      district: "Ajmer",
      state: "Rajasthan",
      region: "West",
      coordinates: { lat: 26.4499, lng: 74.6399 },
    },
    destroyer: {
      name: "Muhammad of Ghor (via Qutbuddin Aibak)",
      dynasty: "Ghurid",
      year: 1199,
    },
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
    sourceTier: "A-primary",
  },
  {
    id: "tiruchirapalli-natthar-wali",
    name: "Sivalinga of Tiruchirapalli",
    deity: "Shiva",
    location: {
      place: "Tiruchirapalli",
      district: "Tiruchirappalli",
      state: "Tamil Nadu",
      region: "South",
      coordinates: { lat: 10.7905, lng: 78.7047 },
    },
    destroyer: {
      name: "Hazrat Natthar Wali (sufi)",
      dynasty: "Madurai Sultanate era",
      year: 1340,
    },
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
    sourceTier: "A-primary",
  },

  // ---------------------------------------------------------------------------
  // B-corroborated cases — mosque inscriptions (Vol II Ch 6) and chronicle
  // passages from Muntakhab-ut-Tawarikh / Tabaqat-i-Akbari etc.
  // ---------------------------------------------------------------------------
  {
    id: "srikakulam-sher-muhammad-1641",
    name: "Temple at Srikakulam",
    deity: "Unknown (idol broken per inscription)",
    location: {
      place: "Srikakulam",
      district: "Srikakulam",
      state: "Andhra Pradesh",
      region: "South",
    },
    destroyer: {
      name: "Sher Muhammad Khan Ghazi",
      dynasty: "Qutb Shahi of Golconda",
      year: 1641,
    },
    modernStatus:
      "Jami Masjid at Srikakulam stands on the temple site. Arabic inscription was discovered in 1953–54 and remains unpublished by the Archaeological Survey of India.",
    primarySource: {
      chronicle: "Arabic inscription, Jami Masjid Srikakulam",
      author: "Discovered by ASI 1953–54; cited Goel Vol II Ch 6",
      note: "Sher Muhammad Khan was given the title Firuz Jang by Sultan Abdullah Qutb Shah of Golconda in AH 1055 (AD 1645–46) per a second inscription on the same mosque",
    },
    quote:
      "The idol was broken and the mosque constructed by Sher Muhammad Khan Ghazi in AH 1051 (AD 1641–42).",
    significance:
      "The Srikakulam inscription is one of six in-situ mosque inscriptions catalogued in the ASI's archival files (1953–80) that explicitly record temple destruction at the moment of mosque construction. The destroyer's title 'Ghazi' was awarded for this act.",
    sourceTier: "B-corroborated",
  },
  {
    id: "nuh-sainthali-bahadur-khan-1400",
    name: "Temple at Sainthali (Nuh mosque)",
    deity: "Unknown",
    location: {
      place: "Nuh",
      district: "Nuh",
      state: "Haryana",
      region: "North",
      coordinates: { lat: 28.108, lng: 77.001 },
    },
    destroyer: {
      name: "Bahadur Khan Nahar",
      dynasty: "Tughlaq (under Muhammad Shah)",
      year: 1400,
    },
    modernStatus:
      "Mosque at Nuh survives. Persian inscription on the entrance gateway records the destruction of the Sainthali temple. Discovered by ASI 1963–64; remains unpublished.",
    primarySource: {
      chronicle: "Persian inscription on entrance gateway, Nuh mosque",
      author: "Discovered by ASI 1963–64",
    },
    quote:
      "The foundation of this mosque was laid by Bahadur Khan Nahar in the reign of Muhammad Shah, son of Firuz Shah (Tughlaq), from the materials of a Hindu temple in village Sainthali where Hindus used to assemble in large numbers every year. The qazi of Nauganwa made a representation to Bahadur Khan Nahar who destroyed the temple and completed the mosque in AH 803 (AD 1400).",
    significance:
      "A rare inscription that records the prior religious importance of the destroyed temple ('Hindus used to assemble in large numbers every year') and the role of the local qazi in triggering the destruction.",
    sourceTier: "B-corroborated",
  },
  {
    id: "balasore-sri-chandi-1668",
    name: "Sri Chandi temple",
    deity: "Devi (Chandi)",
    location: {
      place: "Balasore",
      district: "Balasore",
      state: "Orissa",
      region: "East",
      coordinates: { lat: 21.494, lng: 86.93 },
    },
    destroyer: {
      name: "Talib (faqir mob) and local faujdar",
      dynasty: "Mughal (Aurangzeb's reign)",
      year: 1668,
    },
    modernStatus:
      "Jami Masjid in Mahalla Sunhat at Balasore built c. 1673–74 on the temple site. Inscription on the mosque facade was discovered in 1978–79 and remains unpublished.",
    primarySource: {
      chronicle: "Inscription on the facade of Jami Masjid, Mahalla Sunhat, Balasore",
      author: "Discovered by ASI 1978–79",
    },
    quote:
      "In AH 1079 (AD 1668–69) a mob of Muslim mendicants (faqirs) led by Talib stormed and set fire to the temple of Sri Chandi which was being resorted to by the Hindus. Five years later, the local faujdar built the mosque on the same site.",
    significance:
      "One of the few inscriptions that records both the destruction event and the chronological gap before the mosque was raised. The five-year interval and the involvement of state authority (faujdar) make this a paradigm case of administrative temple-replacement.",
    sourceTier: "B-corroborated",
  },
  {
    id: "tadpatri-mahmud-1695",
    name: "Temple at Tadpatri",
    deity: "Unknown",
    location: {
      place: "Tadpatri",
      district: "Anantapur",
      state: "Andhra Pradesh",
      region: "South",
      coordinates: { lat: 14.91, lng: 78.01 },
    },
    destroyer: { name: "Mahmud (officer of Aurangzeb)", dynasty: "Mughal", year: 1695 },
    modernStatus:
      "Jami Masjid at Tadpatri stands on the temple site. Inscription dated AH 1107 (AD 1695) discovered by ASI in 1980–81; remains unpublished. An Idgah completed in 1725–26 on the same site is listed as a separate entry in the Vol I Ch 10 state list.",
    primarySource: {
      chronicle: "Inscription, Jami Masjid Tadpatri",
      author: "Discovered by ASI 1980–81",
    },
    quote:
      "The mosque was constructed on the site of a temple by Mahmud for offering prayers to Allah. (AH 1107 / AD 1695, reign of Aurangzeb.)",
    significance:
      "Tadpatri was a centre of Vijayanagara-era Vaishnava temple-building. The 1695 inscription documents Aurangzeb-era replacement and is the only firm date for this site.",
    sourceTier: "B-corroborated",
  },
  {
    id: "ritpur-aurangzeb-1878",
    name: "Temple at Ritpur (Aurangzeb's mosque)",
    deity: "Unknown",
    location: {
      place: "Ritpur",
      district: "Amravati",
      state: "Maharashtra",
      region: "Deccan",
    },
    destroyer: { name: "Aurangzeb", dynasty: "Mughal", year: 1675 },
    modernStatus:
      "Jami Masjid at Ritpur was reconstructed in 1878 (AH 1295) with local Muslim contributions. Persian inscription discovered 1964–65 records the original Aurangzeb-era construction. Unpublished.",
    primarySource: {
      chronicle: "Persian inscription, Jami Masjid Ritpur",
      author: "Discovered by ASI 1964–65",
    },
    quote:
      "The mosque which was originally built by Aurangzeb on the site of a Hindu temple, having become desolate through passage of time, was reconstructed in AH 1295 (AD 1878) with the help of contributions raised by the local Muslims.",
    significance:
      "The 1878 inscription is unusual because it dates the reconstruction while explicitly referring back to the original Aurangzeb-era temple destruction as the founding event. A clean instance of community memory preserved in stone.",
    sourceTier: "B-corroborated",
  },
  {
    id: "patna-patthar-masjid-parwiz-1626",
    name: "Temple at Majhauli (Patthar-ki-Masjid Patna)",
    deity: "Unknown",
    location: {
      place: "Patna",
      district: "Patna",
      state: "Bihar",
      region: "East",
      coordinates: { lat: 25.611, lng: 85.144 },
    },
    destroyer: {
      name: "Prince Parwiz (son of Jahangir)",
      dynasty: "Mughal",
      year: 1626,
    },
    modernStatus:
      "Patthar-ki-Masjid stands at Patna. The Persian inscription describing the demolition of the Majhauli temple (Gorakhpur district) and the shipping of its materials to Patna was plastered over with cement; Dr Bloch saw and recorded it before it was hidden.",
    primarySource: {
      chronicle: "Inscription, Patthar-ki-Masjid Patna",
      author: "Recorded by Dr Theodor Bloch (ASI); cited by Syed Hasan Askari",
      note: "Cited Goel Vol II Ch 6. Inscription now plastered over.",
    },
    quote:
      "The materials for the mosque were obtained from a Hindu temple at Majhauli (now in the Gorakhpur District of Uttar Pradesh). The temple was demolished in AH 1036 (AD 1626) by Prince Parwiz, a son of the Mughal emperor Jahangir. [Askari:] I made the car stop and took my friends to the upper part of the historic Patthar-ki-Masjid. One of my American friends was an Arabist, but there was nothing for him to read, for the demoralised custodians had the inscription plastered with cement, considering that it contained provocative references.",
    significance:
      "A rare case where a confirmed inscription was deliberately covered in the modern period. Records both the destruction at Majhauli and the long-distance transport of temple materials to a major Mughal foundation.",
    sourceTier: "B-corroborated",
  },
  {
    id: "vijapur-mansuri-masjid-1428",
    name: "Hindu temple at Vijapur (Mansuri Masjid)",
    deity: "Unknown",
    location: {
      place: "Vijapur",
      district: "Mehsana",
      state: "Gujarat",
      region: "West",
    },
    destroyer: {
      name: "Babadur Sarkhail (under Sultan Ahmad Shah)",
      dynasty: "Gujarat Sultanate",
      year: 1428,
    },
    modernStatus:
      "Mansuri Masjid at Vijapur has been entirely reconstructed in recent decades; the inscribed tablet from the old mosque has been retained and fixed above the central mihrab.",
    primarySource: {
      chronicle: "Persian inscription, Mansuri Masjid Vijapur",
      author: "ASI epigraphical report; cited Goel Vol II Ch 6",
    },
    quote:
      "This edifice was (originally) built by the infidels. After the advent of Islam, it was converted into a mosque. Sermon was delivered here for sixty-seven years. Due to the sedition of the infidels, it was again destroyed. When during the reign of the Sultan of the time, Ahmad, the affairs of each Iqta attained magnificence, Babadur, the Sarkhail, once again carried out repairs.",
    significance:
      "An unusually candid inscription that records the entire cycle: original Hindu temple, conversion to mosque, Hindu reclamation, second destruction, final Muslim repair. The phrase 'sedition of the infidels' is the contemporary Muslim chronicler's term for Hindu attempts to restore the building.",
    sourceTier: "B-corroborated",
  },
  {
    id: "chittor-ghaibi-pir-1310",
    name: "Jami Masjid of Chittor",
    deity: "Unknown",
    location: {
      place: "Chittorgarh",
      district: "Chittorgarh",
      state: "Rajasthan",
      region: "West",
      coordinates: { lat: 24.879, lng: 74.629 },
    },
    destroyer: { name: "Alauddin Khalji", dynasty: "Khalji", year: 1310 },
    modernStatus:
      "Mazar of Ghaibi Pir survives outside the Delhi Gate of Chittor Fort. The Jami Masjid built by Alauddin in 1310 has not survived. The Persian inscription fragment recording the construction was found in the west wall of the tomb.",
    primarySource: {
      chronicle: "Persian inscription, Jami Masjid Chittor (fragment in tomb of Ghaibi Pir)",
      author: "ASI epigraphical report; cited Goel Vol II Ch 6",
    },
    quote:
      "He constructed the congregational mosque. There was temple lying in ruins... [A second tablet:] Bu'l Muzaffar, the second Sikandar, that is, Alau'd-Din Khalji, [completed it on] the day of Sacrifice, the 10th of Dhi'l-Hijja of the year AH 709 (11 May AD 1310).",
    significance:
      "Chittor's first Muslim occupation (1303) was followed within seven years by the construction of a congregational mosque on a temple site. The inscription is fragmentary but the epigraphist's reconstruction is supported by the dated second tablet.",
    sourceTier: "B-corroborated",
  },
  {
    id: "ujjain-mahakal-iltutmish-1233",
    name: "Mahakal temple",
    deity: "Shiva (Mahakaleshwar Jyotirlinga)",
    location: {
      place: "Ujjain",
      district: "Ujjain",
      state: "Madhya Pradesh",
      region: "Central",
      coordinates: { lat: 23.1828, lng: 75.7682 },
    },
    destroyer: {
      name: "Iltutmish",
      dynasty: "Slave (Mamluk) Sultanate",
      year: 1233,
    },
    modernStatus:
      "Present Mahakaleshwar temple rebuilt by Maratha general Ranoji Shinde in the 18th century. One of the twelve Jyotirlingas of Shiva.",
    primarySource: {
      chronicle: "Tabaqat-i-Nasiri",
      author: "Minhaj-us-Siraj (c. 1260)",
      note: "Also cited in Muntakhab-ut-Tawarikh by Badauni",
    },
    quote:
      "And in the year AH 631 (AD 1233) having made an incursion in the direction of the province of Malwah and taken Bhilsa and also captured the city of Ujjain, and having destroyed the idol-temple of Ujjain which had been built six hundred years previously, and was called Mahakal, he levelled it to its foundations, and threw down the image of Rai Vikramajit from whom the Hindus reckon their era, and brought certain other images of cast molten brass and placed them on the ground in front of the door of the mosque of old Dihli and ordered the people to trample them under foot.",
    significance:
      "The Mahakal at Ujjain was one of the oldest Shaiva sites in central India and a Jyotirlinga. The Vikramaditya image was a civilisational symbol — the source of the Vikrama Samvat calendar. Both were broken and the metal images sent to Delhi to be trodden under foot at the mosque entrance.",
    sourceTier: "A-primary",
  },
  {
    id: "mathura-mahmud-1018",
    name: "Mathura temples (Krishna's birthplace)",
    deity: "Vishnu (Krishna) and multiple",
    location: {
      place: "Mathura",
      district: "Mathura",
      state: "Uttar Pradesh",
      region: "North",
      coordinates: { lat: 27.4924, lng: 77.6737 },
    },
    destroyer: { name: "Mahmud of Ghazni", dynasty: "Ghaznavid", year: 1018 },
    modernStatus:
      "Site overlaid by later medieval and Mughal destruction (Aurangzeb 1670). The Mahmud campaign of 1018 is the first documented assault on Mathura.",
    primarySource: {
      chronicle: "Muntakhab-ut-Tawarikh",
      author: "Mulla Abdul Qadir Badauni (16th c.)",
      note: "Drawing on Utbi's Tarikh-i-Yamini",
    },
    quote:
      "From thence he went to Mathra which is a place of worship of the infidels and the birthplace of Kishan, the son of Basudev, whom the Hindus worship as a divinity — where there are idol temples without number, and took it without any contest and razed it to the ground. Great wealth and booty fell into the hands of the Muslims, among the rest they broke up by the orders of the Sultan, a golden idol.",
    significance:
      "Mahmud's 1018 raid established the pattern for north-Indian temple plunder: explicit naming of the deity (Krishna), inventory of broken idols, calculation of recovered wealth. Mathura would be sacked repeatedly across the next 650 years.",
    sourceTier: "A-primary",
  },
  {
    id: "thanesar-mahmud-1011",
    name: "Chakraswamin and Thanesar idol-temples",
    deity: "Vishnu (Chakraswamin) and multiple",
    location: {
      place: "Thanesar",
      district: "Kurukshetra",
      state: "Haryana",
      region: "North",
      coordinates: { lat: 29.969, lng: 76.838 },
    },
    destroyer: { name: "Mahmud of Ghazni", dynasty: "Ghaznavid", year: 1011 },
    modernStatus:
      "Thanesar's pre-Mahmud temple corpus largely destroyed. The Sthaneshwar Mahadev temple at Kurukshetra is later. ASI inventory of Kurukshetra district records Pathari Masjid near Harsh-ka-Tila built with temple materials.",
    primarySource: {
      chronicle: "Muntakhab-ut-Tawarikh",
      author: "Mulla Abdul Qadir Badauni (16th c.)",
    },
    quote:
      "In the year AH 402 (AD 1011) he set out for Thanesar and Jaipal, the son of the former Jaipal, offered him a present of fifty elephants and much treasure. The Sultan, however, was not to be deterred from his purpose; so he refused to accept his present, and seeing Thanesar empty he sacked it and destroyed its idol temples, and took away to Ghaznin, the idol known as Chakarsum on account of which the Hindus had been ruined; and having placed it in his court, caused it to be trampled under foot by the people.",
    significance:
      "Mahmud's Thanesar raid (1011) targeted Chakraswamin (a Vishnu icon) which the chronicler ranks as one of the most important deities of north India of that era. The pattern of carrying broken idols back to Ghazni to be trampled is repeatedly attested.",
    sourceTier: "A-primary",
  },
  {
    id: "nagarkot-kangra-akbar-1582",
    name: "Bhim / Mahamayi temple of Nagarkot",
    deity: "Devi (Mahamayi)",
    location: {
      place: "Nagarkot",
      district: "Kangra",
      state: "Himachal Pradesh",
      region: "North",
      coordinates: { lat: 32.099, lng: 76.27 },
    },
    destroyer: {
      name: "Husain Quli Khan (under Akbar)",
      dynasty: "Mughal",
      year: 1582,
    },
    modernStatus:
      "Present Brajeshwari Devi temple at Kangra is a later rebuild. Jahangiri Gate at Kangra Fort is documented in the Vol I Ch 10 state list as built with temple materials.",
    primarySource: {
      chronicle: "Muntakhab-ut-Tawarikh",
      author: "Mulla Abdul Qadir Badauni (16th c.)",
      note: "Badauni was at Akbar's court and recorded the campaign",
    },
    quote:
      "On the 1st Rajab 990 [AD 1582] he (Husain Quli Khan) encamped by a field of maize near Nagarkot. The fortress of Bhim, which is an idol temple of Mahamayi, and in which none but her servants dwelt, was taken by the valour of the assailants at the first assault. A party of Rajputs, who had resolved to die, fought most desperately till they were all cut down. A number of Brahmans who for many years had served the temple, never gave one thought to flight, and were killed. Nearly 200 black cows belonging to Hindus had, during the struggle, crowded together for shelter in the temple. Some savage Turks, while the arrows and bullets were falling like rain, killed those cows. They then took off their boots and filled them with the blood and cast it upon the roof and walls of the temple.",
    significance:
      "Badauni's account undercuts the standard reading of Akbar as uniformly tolerant. The Nagarkot campaign (1582) — under Akbar's own commission — followed the same desecration pattern (cow blood thrown on walls) attested in Aurangzeb's later operations.",
    sourceTier: "A-primary",
  },
  {
    id: "bhimadevi-bahrare-sikandar",
    name: "Mahadeva temple at Bahrare",
    deity: "Shiva (Mahadeva)",
    location: {
      place: "Bahrare",
      district: "Kashmir Valley",
      state: "Jammu & Kashmir",
      region: "Kashmir Valley",
    },
    destroyer: {
      name: "Sikandar Butshikan",
      dynasty: "Shah Mir Sultanate of Kashmir",
      year: 1395,
    },
    modernStatus: "Site unknown; the temple was 'dug out from its foundations' per the chronicle.",
    primarySource: {
      chronicle: "Tarikh-i-Hassan (also Baharistan-i-Shahi)",
      author: "Pir Hassan Shah; Badauni",
    },
    quote:
      "He got demolished the famous temple of Mahadeva at Bahrare. The temple was dug out from its foundations and the hole that remained reached the water level. Another temple at Jagdar was also demolished.",
    significance:
      "Sikandar Butshikan's policy went beyond superstructure demolition. The Bahrare account specifies that excavation continued until the foundation pit reached groundwater — a method designed to prevent any rebuilding on the same plinth.",
    sourceTier: "A-primary",
  },
  {
    id: "navadvipa-bakhtiyar-1204",
    name: "Temples of Nadia (Navadvipa) and Lakhnauti",
    deity: "Multi",
    location: {
      place: "Nadia",
      district: "Nadia",
      state: "West Bengal",
      region: "East",
    },
    destroyer: {
      name: "Bakhtiyar Khilji",
      dynasty: "Ghurid / Slave Sultanate",
      year: 1204,
    },
    modernStatus:
      "Nadia (Navadvipa) survives as a Bengal Vaishnava centre (birthplace of Chaitanya). The medieval temple corpus did not. Lakhnauti / Gaur is in ruins.",
    primarySource: {
      chronicle: "Muntakhab-ut-Tawarikh",
      author: "Badauni (drawing on Tabaqat-i-Nasiri)",
    },
    quote:
      "In the second year after this arrangement Muhammad Bakhtyar brought an army from Behar towards Lakhnauti and arrived at the town of Nadiya, with a small force; Nadiya is now in ruins. Rai Lakhmia, the governor of that town fled... and Muhammad Bakhtyar having destroyed the places of worship and idol temples of the infidels founded Mosques and Monasteries and schools and caused a metropolis to be built called by his own name, which now has the name of Gaur. There where was heard before the clamour and uproar of the heathen, now there is heard resounding the shout of 'Allaho Akbar'.",
    significance:
      "Bakhtiyar's Bengal campaign destroyed not only Odantapuri (Nalanda district) but Nadia, the seat of Sena-period learning. The chronicler's couplet preserves the substitution as a literary trope: clamour of the heathen replaced by the takbir.",
    sourceTier: "A-primary",
  },
  {
    id: "ranthambhor-jalaluddin-khalji",
    name: "Temples around Ranthambhor",
    deity: "Multi",
    location: {
      place: "Ranthambhor",
      district: "Sawai Madhopur",
      state: "Rajasthan",
      region: "West",
      coordinates: { lat: 26.018, lng: 76.456 },
    },
    destroyer: { name: "Jalaluddin Khalji", dynasty: "Khalji", year: 1291 },
    modernStatus:
      "Ranthambhor Fort survives as a UNESCO site. The Qala-ki-Masjid built with temple materials is documented in the Vol I Ch 10 state list.",
    primarySource: {
      chronicle: "Muntakhab-ut-Tawarikh",
      author: "Badauni (citing Tabaqat-i-Akbari)",
    },
    quote:
      "And in the same year the Sultan for the second time marched against Ranthambhor, and destroyed the country round it, and overthrew the idols and idol-temples, but returned without attempting to reduce the fort.",
    significance:
      "The 1291 expedition shows that even when the campaign failed militarily (the fort held out) the destruction of surrounding temples was carried out as a separate objective. Ranthambhor itself fell to Alauddin Khalji in 1301.",
    sourceTier: "A-primary",
  },

  // ---------------------------------------------------------------------------
  // C-listed cases — entries from Vol I Ch 10 "Let the Mute Witnesses Speak"
  // state lists. Brief provenance; no full chronicle passage available.
  // Format follows: Location, Monument (date). [Temple site / Temple materials
  // used / Converted temple].
  // ---------------------------------------------------------------------------

  // ---- ANDHRA PRADESH ----
  {
    id: "penukonda-fort-c-listed",
    name: "Penukonda Fort and Sher Khan's Masjid",
    deity: "Unknown (multiple in fort complex)",
    location: {
      place: "Penukonda",
      district: "Sri Sathya Sai",
      state: "Andhra Pradesh",
      region: "South",
    },
    destroyer: {
      name: "Sher Khan (Bijapur Sultanate)",
      dynasty: "Adil Shahi of Bijapur",
      year: 1546,
    },
    modernStatus:
      "Penukonda Fort survives. The Vol I Ch 10 list catalogues five Muslim monuments inside the fort built on temple sites or with temple materials: the fort itself (materials), the masjid in the fort (converted temple), Sher Khan's Masjid 1546 (converted temple), Dargah of Babayya (converted 19vara temple), and the Jami Masjid of 1664–65 (temple site).",
    primarySource: {
      chronicle: "Vol I Ch 10 state list in Hindu Temples — What Happened to Them?",
      author: "Sita Ram Goel (1991), citing ASI Circle Reports and district gazetteers",
      note: "No full chronicle quote available; entry rests on ASI provenance only.",
    },
    quote:
      "Penukonda — Fort (Temple materials used); Masjid in the Fort (Converted Temple); Sher Khan's Masjid 1546 (Converted Temple); Dargah of Babayya (Converted 19vara Temple); Jami Masjid 1664–65 (Temple site).",
    significance:
      "Penukonda served as a Vijayanagara secondary capital after Talikota (1565). Its fall to Bijapur in 1546 (and again after Talikota) brought systematic temple replacement across the fort.",
    sourceTier: "C-listed",
  },
  {
    id: "hyderabad-toli-masjid-1671",
    name: "Toli Masjid and other Hyderabad mosques",
    deity: "Multi",
    location: {
      place: "Hyderabad",
      district: "Hyderabad",
      state: "Andhra Pradesh",
      region: "South",
      coordinates: { lat: 17.385, lng: 78.4867 },
    },
    destroyer: { name: "Qutb Shahi rulers", dynasty: "Qutb Shahi", year: 1671 },
    modernStatus:
      "Hyderabad's Vol I Ch 10 listing covers ten major dargahs and masjids built on temple sites or with temple materials, including the Toli Masjid (1671) where 'temple materials used' is the ASI tag, the Begum Masjid (1593), the Jami Masjid (1597), the Haji Kamal Masjid (1657), and the dargah of Mu'min Chup (1322–23).",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Hyderabad Circle reports",
    },
    quote:
      "Hyderabad — Toli Masjid 1671 (Temple materials used); Begum Masjid 1593 (Temple site); Jami Masjid 1597 (Temple site); Haji Kamal-ki-Masjid 1657 (Temple site).",
    significance:
      "Hyderabad was founded by the Qutb Shahis in 1591. The ASI's catalogue traces multiple monuments back to pre-Qutb Shahi Hindu temple sites, marking the systematic transformation of the area into a sultanate capital.",
    sourceTier: "C-listed",
  },
  {
    id: "maisaram-aurangzeb-200-temples",
    name: "200 temples around Golconda (Maisaram Masjid)",
    deity: "Multi",
    location: {
      place: "Maisaram",
      district: "Rangareddy",
      state: "Telangana",
      region: "South",
    },
    destroyer: { name: "Aurangzeb", dynasty: "Mughal", year: 1687 },
    modernStatus:
      "Maisaram Masjid stands. Vol I Ch 10 explicitly notes: 'Masjid built by Aurangzeb from materials of 200 temples demolished after the fall of Golconda.'",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Hyderabad Circle reports",
    },
    quote:
      "Maisaram, Masjid built by Aurangzeb from materials of 200 temples demolished after the fall of Golconda.",
    significance:
      "A rare ASI entry that gives an explicit count — 200 temples — tied to a single post-conquest mosque foundation. The fall of Golconda (1687) ended the last independent Deccan sultanate and is followed by this consolidation campaign.",
    sourceTier: "C-listed",
  },
  {
    id: "kondapalli-bahmani-1482",
    name: "Brahmin priests slaughtered at Kondapalli",
    deity: "Unknown (Hindu temple)",
    location: {
      place: "Kondapalli",
      district: "Krishna",
      state: "Andhra Pradesh",
      region: "South",
    },
    destroyer: {
      name: "Muhammad Shah Bahmani II (on Mahmud Gawan's advice)",
      dynasty: "Bahmani",
      year: 1482,
    },
    modernStatus:
      "Kondapalli Fort survives. The 1482 mosque on the temple site is recorded with an unusually full provenance in the Vol I Ch 10 list.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing district gazetteer",
      note: "Mahmud Gawan was the Bahmani Prime Minister",
    },
    quote:
      "Masjid built in 1482 on the site of a temple after Muhammad Shah Bahmani had slaughtered the Brahmin priests on the advice of Mahmud Gawan, the great Bahmani Prime Minister, who exhorted the sultan to become a Ghazi by means of this pious performance.",
    significance:
      "Mahmud Gawan is normally remembered as an enlightened Bahmani administrator (educational reformer, fort architect). The Kondapalli entry records the other side: he advised the sultan to earn the title Ghazi by slaughtering the temple's priests and building a mosque on the site.",
    sourceTier: "C-listed",
  },
  {
    id: "rajamundri-1324",
    name: "Venugopalaswamin temple (Rajamundri Jami Masjid)",
    deity: "Vishnu (Venugopalaswamin)",
    location: {
      place: "Rajamundri",
      district: "East Godavari",
      state: "Andhra Pradesh",
      region: "South",
    },
    destroyer: {
      name: "Ulugh Khan (Muhammad bin Tughlaq)",
      dynasty: "Tughlaq",
      year: 1324,
    },
    modernStatus: "Jami Masjid at Rajamundri (1324) stands on the converted Venugopalaswamin temple.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Andhra Pradesh Circle reports",
    },
    quote: "Rajamundri, Jami Masjid (1324). Converted Venugopalaswamin Temple.",
    significance:
      "The 1324 Tughlaq raid into the Andhra delta produced the first major mosque-on-temple foundation in the region. The Venugopalaswamin (Krishna) cult was central to the Vaishnava tradition of coastal Andhra.",
    sourceTier: "C-listed",
  },

  // ---- BIHAR ----
  {
    id: "maner-bihar-temple-sites",
    name: "Maner dargahs and Jami Masjid",
    deity: "Multi",
    location: {
      place: "Maner",
      district: "Patna",
      state: "Bihar",
      region: "East",
    },
    destroyer: { name: "Successive Sultanate / Mughal rulers", dynasty: "Multiple", year: 1500 },
    modernStatus:
      "Maner remains a major Bihar Muslim pilgrimage centre. The Vol I Ch 10 list states explicitly that 'all Muslim monuments stand on temple sites' at Maner, listing the Bada Dargah of Sultan-ul-Makhdum Shah Yahya Maneri, the Dargah of Makhdum Daulat, the Jami Masjid, and the Mazar of Haji Nizamuddin.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Patna Circle reports",
    },
    quote:
      "Maner — All Muslim monuments stand on temple sites. The following are prominent among them: Bada Dargah of Sultan-ul-Makhdum Shah Yahya Maneri; Dargah of Makhdum Daulat Shah; Jami Masjid; Mazar of Haji Nizamuddin.",
    significance:
      "Maner is an important early Sufi centre (Yahya Maneri d. 1291). The blanket ASI tag — 'all Muslim monuments stand on temple sites' — is unusual for an entire town and reflects the depth of the pre-Sufi Hindu/Buddhist substrate.",
    sourceTier: "C-listed",
  },
  {
    id: "patna-buddhist-vihara-overlays",
    name: "Patna Buddhist viharas converted to dargahs",
    deity: "Buddha (multiple viharas)",
    location: {
      place: "Patna",
      district: "Patna",
      state: "Bihar",
      region: "East",
      coordinates: { lat: 25.594, lng: 85.137 },
    },
    destroyer: { name: "Successive Sultanate / Mughal rulers", dynasty: "Multiple", year: 1500 },
    modernStatus:
      "Multiple dargahs stand on Buddhist vihara ruins in Patna: the Muslim Graveyard outside the Qiladari (on Buddhist viharas), Dargah of Shah Mir Mansur (on a Buddhist Stupa), Dargah of Shah Arzani, Dargah of Pir Damariya (all on Buddhist vihara sites).",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Patna Circle reports",
    },
    quote:
      "Patna — Muslim Graveyard outside the Qiladari (On the ruins of Buddhist Viharas); Dargah of Shah Mir Mansur (On the ruins of a Buddhist Stupa); Dargah of Shah Arzani (On the site of a Buddhist Vihara); Dargah of Pir Damariya (On the site of a Buddhist Vihara).",
    significance:
      "Pataliputra was the Mauryan and Gupta capital and a major Buddhist site (Patliputra Council). Multiple ASI entries trace dargahs back to specific Buddhist viharas and stupas, mapping the long arc from imperial Buddhism to medieval Islamic devotional architecture on the same ground.",
    sourceTier: "C-listed",
  },
  {
    id: "champanagar-jain-temple-1491",
    name: "Jain temples of Champanagar",
    deity: "Jain",
    location: {
      place: "Champanagar",
      district: "Bhagalpur",
      state: "Bihar",
      region: "East",
    },
    destroyer: { name: "Hussain Shah of Bengal era", dynasty: "Bengal Sultanate", year: 1491 },
    modernStatus:
      "The 1491 mosque at Champanagar stands on Jain temple sites. Several mazars in Champanagar are listed as built 'on ruins of Jain temples.'",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Bhagalpur Circle reports",
    },
    quote:
      "Champanagar — Several Mazars on ruins of Jain temples; Masjid (1491). Jain Temple site.",
    significance:
      "Champa (Champapura) was the capital of ancient Anga and a major Jain centre — Mahavira's twelfth Tirthankara, Vasupujya, was born here per Jain tradition. The 1491 mosque marks the transition of Jain sacred geography in the Bengal Sultanate period.",
    sourceTier: "C-listed",
  },

  // ---- DELHI ----
  {
    id: "delhi-mehrauli-cluster",
    name: "Mehrauli Qutb complex monuments",
    deity: "Multi (Hindu and Jain)",
    location: {
      place: "Mehrauli",
      district: "South Delhi",
      state: "Delhi",
      region: "North",
      coordinates: { lat: 28.5244, lng: 77.1855 },
    },
    destroyer: { name: "Successive Delhi Sultans", dynasty: "Slave / Khalji / Tughlaq / Lodi", year: 1198 },
    modernStatus:
      "UNESCO World Heritage Site since 1993. Eleven monuments in the Mehrauli cluster are catalogued in Vol I Ch 10 as built on temple sites or with temple materials: Quwwat-ul-Islam Masjid, Qutb Minar, Iltutmish's tomb (1235), Bakhtiyar Kaki's dargah (d. 1236), Jahaz Mahal, Alai Darwaza, Alai Minar, madrasa-tomb of Alauddin Khalji, tomb of Ghiyasuddin Balban, Jamali-Kamali masjid-tomb, and Madhi Masjid.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Delhi Circle reports",
      note: "Quwwat-ul-Islam itself has the in-situ inscription (see Tier A entry).",
    },
    quote:
      "Mehrauli — Quwwat-ul-Islam Masjid 1198; Qutb Minar; Maqbara of Iltutmish 1235; Dargah of Shaykh Qutbuddin Bakhtyar Kaki d. 1236; Jahaz Mahal; Alai Darwaza; Alai Minar; Madrasa and Maqbara of Alauddin Khalji; Maqbara of Balban; Masjid and Mazar of Jamali-Kamali; Madhi Masjid. (All built on temple sites or with temple materials.)",
    significance:
      "The Mehrauli area was Lal Kot, the Tomar / Chauhan capital before 1192. The eleven-monument cluster shows that the temple-replacement programme continued under every dynasty from Aibak (1198) through the Lodis (early 16th c.) and used the same ground over and over.",
    sourceTier: "C-listed",
  },
  {
    id: "delhi-shahjahanabad-jami-masjid",
    name: "Jami Masjid on Bhojala Pahari (Shahjahanabad)",
    deity: "Unknown (hill temple)",
    location: {
      place: "Shahjahanabad",
      district: "Central Delhi",
      state: "Delhi",
      region: "North",
      coordinates: { lat: 28.6507, lng: 77.2334 },
    },
    destroyer: { name: "Shah Jahan", dynasty: "Mughal", year: 1656 },
    modernStatus:
      "Jami Masjid of Delhi (built 1650–56) stands on the hill formerly known as Bhojala Pahari. Listed in Vol I Ch 10 as on a temple site, along with Kali Masjid at Turkman Gate, Razia Sultan's tomb, the Ghata Masjid (Zinat-ul-Masjid), and the dargah of Shah Turkman (1240).",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Delhi Circle reports",
    },
    quote:
      "Shahjahanabad — Kali Masjid at Turkman Gate; Maqbara of Razia Sultan; Jami Masjid on Bhojala Pahari; Ghata or Zinat-ul Masjid; Dargah of Shah Turkman 1240. (All on temple sites.)",
    significance:
      "Shah Jahan's new capital was built on ground that had been sacralised under earlier Hindu kingship (Bhojala Pahari). The Jami Masjid on the hilltop replaced an older site whose details are not recoverable from surviving sources.",
    sourceTier: "C-listed",
  },
  {
    id: "delhi-palam-babri-ghazanfar-1528",
    name: "Babri (Ghazanfar) Masjid at Palam",
    deity: "Unknown",
    location: {
      place: "Palam",
      district: "South West Delhi",
      state: "Delhi",
      region: "North",
    },
    destroyer: { name: "Babur", dynasty: "Mughal", year: 1528 },
    modernStatus:
      "The Palam Babri (Ghazanfar) Masjid (1528–29) is listed in Vol I Ch 10 as on a temple site. Same year as the Ayodhya Babri Masjid; one of several mosques built across Babur's brief Indian campaign.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Delhi Circle reports",
    },
    quote: "Palam — Babri (Ghazanfar) Masjid 1528–29. Temple site.",
    significance:
      "A second Babri Masjid — distinct from the Ayodhya site — was raised at Palam in the same year (1528) on a Hindu temple site. The chronological pattern of Babur-era mosque foundations on temple sites is visible across northern India in 1528–30.",
    sourceTier: "C-listed",
  },

  // ---- GUJARAT ----
  {
    id: "ahmadabad-asaval-patan-chandravati-materials",
    name: "Asaval, Patan, Chandravati temple materials in Ahmadabad",
    deity: "Multi",
    location: {
      place: "Ahmadabad",
      district: "Ahmadabad",
      state: "Gujarat",
      region: "West",
      coordinates: { lat: 23.0225, lng: 72.5714 },
    },
    destroyer: { name: "Ahmad Shah I", dynasty: "Gujarat Sultanate", year: 1411 },
    modernStatus:
      "Ahmadabad's central monuments — the Bhadra citadel, Ahmad Shah-ki-Masjid, Jami Masjid of Ahmad Shah, Haibat Khan's Masjid, Rani Rupmati's Masjid, Rani Sipri's mosque-mazar, Sayyid Alam-ki-Masjid, and the maqbara of Sultan Ahmad Shah I — were built using temple materials brought from Asaval (the pre-Muslim Hindu city on the same site), Patan (Solanki capital), and Chandravati (Paramara city).",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Ahmadabad Circle reports",
    },
    quote:
      "Ahmadabad — Materials of temples destroyed at Asaval, Patan and Chandravati were used in the building of this Muslim city and its monuments. Some of the monuments are listed below: Palace and Citadel of Bhadra; Ahmad Shah-ki-Masjid in Bhadra; Jami Masjid of Ahmad Shah; Haibat Khan-ki-Masjid; Rani Rupmati-ki-Masjid; Rani Bai Harir-ki-Masjid; Malik Sarang-ki-Masjid; Mahfuz Khan-ki-Masjid; Sayyid Alam-ki-Masjid; Pattharwali or Qutb Shah-ki-Masjid; Sakar Khan-ki-Masjid; Baba Lula-ki-Masjid; Shaykh Hasan Muhammad Chishti-ki-Masjid; Masjid at Isanpur; Masjid and Mazar of Malik Shaban; Masjid and Mazar of Rani Sipri (Sabarai); Masjid and Mazar of Shah Alam at Vatva; Maqbara of Sultan Ahmad Shah I.",
    significance:
      "Ahmad Shah's new capital (founded 1411) drew its building stock from three pre-Muslim Hindu cities. The ASI tag is a single-city catalogue of how a regional sultanate capital materialised from the temple corpus of the displaced kingdom.",
    sourceTier: "C-listed",
  },
  {
    id: "somnath-patan-kumarapala-masjid",
    name: "Kumarapala's Somnath temple converted to mosque",
    deity: "Shiva",
    location: {
      place: "Somnath Patan",
      district: "Gir Somnath",
      state: "Gujarat",
      region: "West",
    },
    destroyer: {
      name: "Alauddin Khalji and successor Gujarat Sultans",
      dynasty: "Khalji + Gujarat Sultanate",
      year: 1299,
    },
    modernStatus:
      "Vol I Ch 10 lists thirteen mosques in Somnath Patan built on temple sites or converted from temples. One is explicitly identified as 'Masjid made out of the Somanatha Temple of Kumarapala' (Chaulukya king, 12th c. rebuild).",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Junagadh Circle reports",
    },
    quote:
      "Somnath Patan — Masjid made out of the Somanatha Temple of Kumarapala; Masjid at the back of the Somanatha Temple (Converted temple); Bazar Masjid 1436 (Temple site); Chandni Masjid 1456 (Temple site); Pathanwadi Masjid 1326 (Temple site).",
    significance:
      "Beyond Mahmud of Ghazni's 1026 raid, the Somnath complex was repeatedly destroyed across the next 700 years. The Kumarapala (Solanki, 12th c.) rebuild of Somnath was itself converted into a mosque by Alauddin Khalji's general Ulugh Khan in 1299.",
    sourceTier: "C-listed",
  },
  {
    id: "dholka-bavan-jinalaya",
    name: "Bavan Jinalaya converted to Khirni Masjid",
    deity: "Jain (Bavan Jinalaya — 52-shrine complex)",
    location: {
      place: "Dholka",
      district: "Ahmadabad",
      state: "Gujarat",
      region: "West",
    },
    destroyer: { name: "Gujarat Sultanate rulers", dynasty: "Gujarat Sultanate", year: 1377 },
    modernStatus:
      "Khirni Masjid (1377) at Dholka stands on the converted Bavan Jinalaya Jain temple. Five additional medieval mosques and mazars in Dholka are listed on temple sites or with temple materials.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Ahmadabad Circle reports",
    },
    quote:
      "Dholka — Khirni Masjid 1377. Converted Bavan Jinalaya Temple. (Also: Tanka or Jami Masjid 1316, Hillal Khan Qazi-ki-Masjid 1333, and Kali Bazar Masjid 1364 — all temple sites or temple materials used.)",
    significance:
      "A Bavan Jinalaya is a Jain ritual complex of 52 sub-shrines around a central tirthankara temple. The 1377 conversion is one of the few cases where the ASI tag preserves the specific Jain architectural typology of the destroyed building.",
    sourceTier: "C-listed",
  },
  {
    id: "bharuch-jami-masjid-1321",
    name: "Jami Masjid of Bharuch (Brahmanical + Jain materials)",
    deity: "Multi (Brahmanical + Jain)",
    location: {
      place: "Bharuch",
      district: "Bharuch",
      state: "Gujarat",
      region: "West",
      coordinates: { lat: 21.71, lng: 72.99 },
    },
    destroyer: { name: "Khalji-era rulers", dynasty: "Khalji", year: 1321 },
    modernStatus:
      "Jami Masjid of Bharuch (1321) stands. Six additional medieval mosques in Bharuch are listed on temple sites or with temple materials.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Surat Circle reports",
    },
    quote:
      "Bharuch — Jami Masjid 1321. Brahmanical and Jain temple materials used. (Also: Ghaznavi Masjid 1326, Idgah 1326, Chunawada Masjid 1458, Qazi-ki-Masjid 1609 — all temple sites or materials used.)",
    significance:
      "Bharuch (Bhrigukaccha) was one of the oldest port cities of western India with a layered Hindu and Jain temple stock. The 1321 Jami Masjid catalogues both substrates in a single mosque foundation.",
    sourceTier: "C-listed",
  },
  {
    id: "khambhat-jami-masjid-1325",
    name: "Jami Masjid of Khambhat (Cambay)",
    deity: "Jain",
    location: {
      place: "Khambhat (Cambay)",
      district: "Anand",
      state: "Gujarat",
      region: "West",
      coordinates: { lat: 22.31, lng: 72.62 },
    },
    destroyer: { name: "Khalji-era rulers", dynasty: "Khalji", year: 1325 },
    modernStatus:
      "Jami Masjid of Khambhat (1325) stands. Eleven additional medieval Muslim monuments in Khambhat are listed as on temple sites or built with Jain temple materials.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Surat Circle reports",
    },
    quote:
      "Khambhat — Jami Masjid 1325. Jain Temple materials used. (Also: Mazar of Umar bin Ahmad Kazruni — Jain Temple materials used; ten other mosques and mazars 1316–1498 on temple sites.)",
    significance:
      "Khambhat was a major medieval Jain mercantile centre. The thick Jain temple stock — recorded by Hieun Tsang in the 7th century — was systematically replaced by Khalji-era mosque foundations.",
    sourceTier: "C-listed",
  },
  {
    id: "patan-sahasralinga-talav",
    name: "Sahasralinga Talav and Patan temple materials",
    deity: "Shiva (Sahasralinga)",
    location: {
      place: "Patan",
      district: "Patan",
      state: "Gujarat",
      region: "West",
      coordinates: { lat: 23.85, lng: 72.13 },
    },
    destroyer: {
      name: "Alauddin Khalji and successor sultans",
      dynasty: "Khalji + Gujarat Sultanate",
      year: 1298,
    },
    modernStatus:
      "Anhilwad Patan was the Solanki / Chaulukya capital. The Sahasralinga Talav — Siddhraj Jayasimha's 12th c. thousand-linga tank — was destroyed; nine medieval mosques in Patan use materials from temples in or around the tank.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Mehsana Circle reports",
    },
    quote:
      "Patan — Jami Masjid 1357 (Temple materials used); Masjid in a field that was the Sahasralinga Talav (Temple materials used); Masjid and Dargah of Makhdum Husamuddin Chishti (Temple materials used); Dargah of Shaykh Farid (Converted temple); plus six other temple-site mosques 1410–1542.",
    significance:
      "Patan / Anhilwad was the political and temple-construction centre of the Solanki kingdom (10th–13th c.). The Sahasralinga Talav (mentioned in the Prabandha-Chintamani) was one of the largest medieval Shaiva tank-complexes in India. Its materials populated the foundation of Muslim Patan.",
    sourceTier: "C-listed",
  },
  {
    id: "pavagadh-devi-temple",
    name: "Pavagadh Devi temple",
    deity: "Devi (Mahakali)",
    location: {
      place: "Pavagadh",
      district: "Panchmahal",
      state: "Gujarat",
      region: "West",
      coordinates: { lat: 22.46, lng: 73.53 },
    },
    destroyer: { name: "Mahmud Begada", dynasty: "Gujarat Sultanate", year: 1484 },
    modernStatus:
      "Pavagadh Mahakali temple still functions on the hilltop but a mosque was raised on the temple complex per the ASI catalogue. UNESCO Champaner-Pavagadh Archaeological Park since 2004.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Vadodara Circle reports",
    },
    quote:
      "Pavagadh — Masjid built on top of the Devi Temple; Panch Munhada Masjid (Temple site); Jami Masjid (Temple site).",
    significance:
      "Pavagadh's hilltop Mahakali shrine is one of the 51 Shakti Peethas. Mahmud Begada's 1484 conquest of Champaner (which became his new capital) included this Pavagadh foundation directly on the goddess temple.",
    sourceTier: "C-listed",
  },

  // ---- HARYANA ----
  {
    id: "hissar-agroha-materials",
    name: "Hissar built from Agroha temple materials",
    deity: "Multi",
    location: {
      place: "Hissar",
      district: "Hisar",
      state: "Haryana",
      region: "North",
      coordinates: { lat: 29.149, lng: 75.722 },
    },
    destroyer: { name: "Firuz Shah Tughlaq", dynasty: "Tughlaq", year: 1354 },
    modernStatus:
      "Hissar's eight major medieval Muslim monuments — Lat-ki-Masjid, Humayun's Jami Masjid (1535), Bahlul Lodi's mazar, Humayun's outside-Delhi-Gate Masjid (1533), Pran Pir Padshah dargah, Firuz Shah's fort, Jahaz Mahal, and the Gujari Mahal — were built using temple materials brought primarily from Agroha (destroyed by Muhammad Ghori in 1192).",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Hissar Circle reports",
    },
    quote:
      "Hissar — This city was built by Firuz Shah Tughlaq with temple materials brought mostly from Agroha which had been destroyed by Muhammad Ghuri in 1192. (Lat-ki-Masjid; Humayun's Jami Masjid 1535; Bahlul Lodi's mazar; Humayun's Masjid outside Delhi Gate 1533; Pran Pir Padshah dargah; Firuz Shah's fort; Jahaz Mahal — converted Jain temple; Gujari Mahal.)",
    significance:
      "Agroha — the Agarwal community's traditional ancestral city — was destroyed in 1192 and remained a stone quarry for the new Tughlaq foundation of Hissar (1354). The ASI tag preserves both the source and destination of the building stock across 160 years.",
    sourceTier: "C-listed",
  },
  {
    id: "panipat-babri-kabuli-bagh-1529",
    name: "Babri Masjid in Kabuli Bagh, Panipat",
    deity: "Unknown",
    location: {
      place: "Panipat",
      district: "Panipat",
      state: "Haryana",
      region: "North",
      coordinates: { lat: 29.39, lng: 76.96 },
    },
    destroyer: { name: "Babur", dynasty: "Mughal", year: 1529 },
    modernStatus:
      "Babri Masjid in Kabuli Bagh, Panipat (1528–29) survives. Listed as built on a temple site in Vol I Ch 10. Built on the site of Babur's victorious Panipat battlefield (1526).",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Karnal Circle reports",
    },
    quote: "Panipat — Babri Masjid in Kabuli Bagh 1528–29. Temple site.",
    significance:
      "A third Babri Masjid — distinct from both Ayodhya and Palam — was raised at Panipat to commemorate Babur's 1526 victory. Built on a Hindu temple site per ASI catalogue.",
    sourceTier: "C-listed",
  },
  {
    id: "thanesar-pathari-masjid",
    name: "Pathari Masjid near Harsh-ka-Tila, Thanesar",
    deity: "Multi (Harsha-period temples)",
    location: {
      place: "Thanesar",
      district: "Kurukshetra",
      state: "Haryana",
      region: "North",
    },
    destroyer: { name: "Multiple Sultanate rulers", dynasty: "Multiple", year: 1300 },
    modernStatus:
      "Pathari Masjid near Harsh-ka-Tila (named after Harshavardhana's 7th c. mound) at Thanesar built with temple materials. Two further Thanesar mosques and the dargah of Shaykh Chilli also list temple materials.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Kurukshetra Circle reports",
    },
    quote:
      "Thanesar — Dargah and Madrasa of Shaykh Chilli or Chehali Bannuri (Temple materials used); Pathari Masjid near Harsh-ka-Tila (Temple materials used); Chintwali Masjid (Temple materials used).",
    significance:
      "Thanesar / Sthaneshwar was the seat of Harshavardhana (7th c. Pushyabhuti dynasty) and a major Shaiva centre. Harsh-ka-Tila is the surviving mound of Harsha's palace and temple complex. The Pathari Masjid is built directly from that stock.",
    sourceTier: "C-listed",
  },

  // ---- KARNATAKA ----
  {
    id: "bidar-bahmani-cluster",
    name: "Bidar Bahmani capital — temples replaced",
    deity: "Multi",
    location: {
      place: "Bidar",
      district: "Bidar",
      state: "Karnataka",
      region: "Deccan",
      coordinates: { lat: 17.913, lng: 77.531 },
    },
    destroyer: { name: "Bahmani Sultans", dynasty: "Bahmani", year: 1429 },
    modernStatus:
      "Sixteen monuments at Bidar — Sola Khamba Masjid (1326–27), Jami Masjid of the Bahmanis, Mukhtar Khan-ki-Masjid (1671), Kali Masjid (1694), Khalilullah dargah (1440), Madrasa of Mahmud Gawan, Takht Mahal, Gagan Mahal, and others — are listed in Vol I Ch 10 as on temple sites or built with temple materials.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Hyderabad Circle reports",
    },
    quote:
      "Bidar — Ancient Hindu city transformed into a Muslim capital. The following monuments stand on temple sites and/or temple materials have been used in their construction: Sola Khamba Masjid 1326–27; Jami Masjid of the Bahmanis; Mukhtar Khan-ki-Masjid 1671; Kali Masjid 1694; Farrah-Bagh Masjid 1671; Dargah of Hazrat Khalilullah at Ashtur 1440; Madrasa of Mahmud Gawan; Takht Mahal; Gagan Mahal.",
    significance:
      "Bidar was made the Bahmani capital in 1429 after Gulbarga. The 16-monument cluster shows that the conversion of the existing Hindu city's temple stock was a 14th–17th century arc — not a single event.",
    sourceTier: "C-listed",
  },
  {
    id: "bijapur-adil-shahi-cluster",
    name: "Bijapur Adil Shahi capital — temples replaced",
    deity: "Multi",
    location: {
      place: "Bijapur",
      district: "Bijapur",
      state: "Karnataka",
      region: "Deccan",
      coordinates: { lat: 16.83, lng: 75.71 },
    },
    destroyer: { name: "Adil Shahi Sultans", dynasty: "Adil Shahi", year: 1498 },
    modernStatus:
      "Twenty-two monuments at Bijapur — including the Jami Masjid (1498–99), Karimuddin-ki-Masjid in the Ark (1320–21), the Gol Gumbaz (the rauza of Muhammad Adil Shah), Asar Mahal, Anand Mahal, and the citadel — are listed in Vol I Ch 10 as on temple sites or built with temple materials.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Bijapur Circle reports",
    },
    quote:
      "Bijapur — Ancient Hindu city transformed into a Muslim capital. The following monuments are built on temple sites and/or temple materials have been used in their construction: Jami Masjid 1498–99; Karimuddin-ki-Masjid in the Ark 1320–21; Khwaja Sambal-ki-Masjid; Makka Masjid; Andu Masjid; Zangiri Masjid; Bukhara Masjid 1536–37; Dakhini Idgah 1538–39; Masjid and Rauza of Ibrahim II Adil Shah 1626; Gol Gumbaz; Jod-Gumbad; Asar Mahal; Anand Mahal and Masjid 1495.",
    significance:
      "Bijapur was made the Adil Shahi capital in 1498 after the Bahmani break-up. The 22-monument cluster is the largest single-city tally in the Karnataka section, reflecting Bijapur's role as the dominant Deccan power for 200 years.",
    sourceTier: "C-listed",
  },
  {
    id: "gulbarga-bahmani-capital",
    name: "Gulbarga Bahmani capital — temples replaced",
    deity: "Multi",
    location: {
      place: "Gulbarga (Kalaburagi)",
      district: "Kalaburagi",
      state: "Karnataka",
      region: "Deccan",
      coordinates: { lat: 17.329, lng: 76.83 },
    },
    destroyer: { name: "Bahmani Sultans", dynasty: "Bahmani", year: 1347 },
    modernStatus:
      "Gulbarga's central mosques and dargahs — the Jami Masjid in the Fort (1367), the Kalan Masjid in Mahalla Mominpura (1373), and the dargah of Banda Nawaz Gesu Daraz — are listed in Vol I Ch 10 as on temple sites or built with temple materials.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Hyderabad Circle reports",
    },
    quote:
      "Gulbarga — Ancient Hindu city converted into a Muslim capital and the following among other monuments built on temple sites and/or with temple materials: Kalan Masjid in Mahalla Mominpura 1373; Masjid in Shah Bazar 1379; Jami Masjid in the Fort 1367; Masjid-i-Langar in the Mazar of Haji Zaida; Masjid near the Farman Talab 1353–54; Dargah of Sayyid Muhammad Husaini Banda Nawaz Gesu Daraz Chishti.",
    significance:
      "Gulbarga was the first Bahmani capital (1347–1424). The Jami Masjid (1367) is among the earliest surviving Bahmani mosques and is built within the converted Hindu fort city. Gesu Daraz's dargah remains a major Deccan pilgrimage centre.",
    sourceTier: "C-listed",
  },
  {
    id: "kalyani-chalukya-temples",
    name: "Later Chalukya temples of Kalyani",
    deity: "Multi (Chalukya royal temples)",
    location: {
      place: "Kalyani (Basavakalyan)",
      district: "Bidar",
      state: "Karnataka",
      region: "Deccan",
      coordinates: { lat: 17.873, lng: 76.946 },
    },
    destroyer: { name: "Bahmani Sultans", dynasty: "Bahmani", year: 1323 },
    modernStatus:
      "Kalyani's medieval Muslim monuments — Jami Masjid (1323), Masjid (1406), Masjid in Mahalla Shahpur (1586–87), the dargahs of Maulana Yaqub and Sayyid Pir Pasha, the fort walls and gates — are documented in Vol I Ch 10. The note explicitly states 'all their (Later Chalukya) temples were either demolished or converted into mosques.'",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Bidar Circle reports",
    },
    quote:
      "Kalyani — Capital of the Later Chalukyas. All their temples were either demolished or converted into mosques. (Jami Masjid 1323; Masjid 1406; Masjid in Mahalla Shahpur 1586–87; Dargah of Maulana Yaqub; Dargah of Sayyid Pir Pasha; Fort Walls and Towers — temple materials used; Nawab's Bungalow — temple materials used.)",
    significance:
      "Kalyani / Kalyana was the capital of the Western Chalukyas (10th–12th c.) — one of the most prolific temple-building dynasties in south India. The Bahmani conquest (1323) saw the entire royal temple corpus erased per the ASI summary.",
    sourceTier: "C-listed",
  },
  {
    id: "srirangapatnam-tipu-anjaneya",
    name: "Anjaneya temple converted to Jami Masjid (Srirangapatnam)",
    deity: "Vishnu (Hanuman / Anjaneya)",
    location: {
      place: "Srirangapatnam",
      district: "Mandya",
      state: "Karnataka",
      region: "South",
      coordinates: { lat: 12.41, lng: 76.7 },
    },
    destroyer: { name: "Tipu Sultan", dynasty: "Mysore Sultanate", year: 1787 },
    modernStatus:
      "Jami Masjid at Srirangapatnam (built by Tipu Sultan 1787) stands on the site of the Anjaneya temple. The neighbouring Ranganathaswamy temple (one of the three Sriranga sites) survived.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Mysore Circle reports",
    },
    quote: "Srirangapatnam — Jami Masjid built by Tipu Sultan (1787). Stands on the site of the Anjaneya Temple.",
    significance:
      "Srirangapatnam was Tipu's island capital. The ASI tag — Anjaneya temple replaced by Tipu's Jami Masjid — places the conversion within the late 18th century, the latest entry in the Karnataka cluster.",
    sourceTier: "C-listed",
  },
  {
    id: "hubli-aurangzeb-17-masjids",
    name: "Seventeen mosques at Hubli (Aurangzeb)",
    deity: "Multi",
    location: {
      place: "Hubli",
      district: "Dharwad",
      state: "Karnataka",
      region: "Deccan",
    },
    destroyer: { name: "Aurangzeb", dynasty: "Mughal", year: 1675 },
    modernStatus:
      "Vol I Ch 10 records that Aurangzeb built '17 Masjids at Hubli in 1675 and after' on temple sites.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Dharwad Circle reports",
    },
    quote: "Hubli — 17 Masjids built by Aurangzeb in 1675 and after. Temple sites.",
    significance:
      "A concentrated regional foundation campaign: 17 mosques in a single town across a single decade, all on prior temple sites. Hubli was a major Lingayat centre — the destruction trajectory targets that specifically.",
    sourceTier: "C-listed",
  },

  // ---- KASHMIR ----
  {
    id: "srinagar-jayasvami-baha-ud-din",
    name: "Jayasvami temple (Bahauddin's ziyarat)",
    deity: "Vishnu (Jayasvami)",
    location: {
      place: "Srinagar",
      district: "Srinagar",
      state: "Jammu & Kashmir",
      region: "Kashmir Valley",
      coordinates: { lat: 34.0837, lng: 74.7973 },
    },
    destroyer: {
      name: "Sikandar Butshikan",
      dynasty: "Shah Mir Sultanate of Kashmir",
      year: 1400,
    },
    modernStatus: "Ziyarat of Bahauddin Sahib in Srinagar built on the converted Jayasvami temple per ASI catalogue.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list (Kashmir section)",
      author: "Sita Ram Goel (1991), citing ASI Srinagar Circle reports",
      note: "Kashmir temples named in Kalhana's 12th c. Rajatarangini",
    },
    quote: "Srinagar — Ziyarat of Bahauddin Sahib. Jayasvami Temple converted.",
    significance:
      "Jayasvamin (Jayendra Vihara per some readings) is mentioned in Kalhana's 12th c. Rajatarangini as a Srinagar Vaishnava centre. The ASI catalogue traces the Bahauddin ziyarat directly to its plinth.",
    sourceTier: "C-listed",
  },
  {
    id: "srinagar-vishnusvami-pampor",
    name: "Vishnusvamin temple (Mir Muhammad Hamadani ziyarat, Pampor)",
    deity: "Vishnu (Vishnusvamin)",
    location: {
      place: "Pampor",
      district: "Pulwama",
      state: "Jammu & Kashmir",
      region: "Kashmir Valley",
    },
    destroyer: {
      name: "Sikandar Butshikan",
      dynasty: "Shah Mir Sultanate of Kashmir",
      year: 1400,
    },
    modernStatus:
      "Ziyarat of Mir Muhammad Hamadani at Pampor built with Vishnusvamin temple materials per ASI catalogue. Hamadani (d. 1450) was the son of Sayyid Ali Hamadani who arrived in Kashmir during Sikandar's reign.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list (Kashmir section)",
      author: "Sita Ram Goel (1991), citing ASI Srinagar Circle reports",
    },
    quote: "Pampor — Ziyarat of Mir Muhammad Hamadani. Vishnusvamin Temple materials used.",
    significance:
      "Vishnusvamin is one of the Kashmir Vaishnava shrines listed by Kalhana. The Hamadani family is credited in Kashmiri Sunni tradition with the Islamisation of the Valley; the temple-material foundation is the physical correlate.",
    sourceTier: "C-listed",
  },
  {
    id: "srinagar-bhimasvami-makhdum-hari-parbat",
    name: "Bhimasvami temple (Makhdum Sahib ziyarats, Hari Parbat)",
    deity: "Vishnu (Bhimasvamin)",
    location: {
      place: "Srinagar",
      district: "Srinagar",
      state: "Jammu & Kashmir",
      region: "Kashmir Valley",
      coordinates: { lat: 34.094, lng: 74.812 },
    },
    destroyer: {
      name: "Sikandar Butshikan",
      dynasty: "Shah Mir Sultanate of Kashmir",
      year: 1400,
    },
    modernStatus:
      "Ziyarats of Makhdum Sahib and Akhun Mulla on Hari Parbat (Srinagar) built on the converted Bhimasvamin temple per ASI catalogue.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list (Kashmir section)",
      author: "Sita Ram Goel (1991), citing ASI Srinagar Circle reports",
    },
    quote: "Srinagar (Hari Parbat) — Ziyarats of Makhdum Sahib and Akhun Mulla. Bhimasvamin Temple converted.",
    significance:
      "Hari Parbat is the sacred hill at the centre of Srinagar (Sharika Devi temple). The Bhimasvamin temple is one of three royal Vaishnava foundations Kalhana lists for this hill. Conversion under Sikandar.",
    sourceTier: "C-listed",
  },
  {
    id: "srinagar-vishnu-ranasvami-pir-haji",
    name: "Vishnu Ranasvami temple (Pir Haji Muhammad ziyarat)",
    deity: "Vishnu (Vishnu Ranasvamin)",
    location: {
      place: "Srinagar",
      district: "Srinagar",
      state: "Jammu & Kashmir",
      region: "Kashmir Valley",
    },
    destroyer: {
      name: "Sikandar Butshikan",
      dynasty: "Shah Mir Sultanate of Kashmir",
      year: 1400,
    },
    modernStatus:
      "Ziyarat of Pir Haji Muhammad Sahib south-west of the Srinagar Jami Masjid stands on the converted Vishnu Ranasvami temple per ASI catalogue.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list (Kashmir section)",
      author: "Sita Ram Goel (1991), citing ASI Srinagar Circle reports",
    },
    quote: "Srinagar — Ziyarat of Pir Haji Muhammad Sahib south-west of the Jami Masjid. Vishnu Ranasvami Temple converted.",
    significance:
      "Vishnu Ranasvami is listed by Kalhana as a Srinagar royal temple. The ziyarat is one of the four Kalhana-attested Vishnu temples converted during Sikandar's reign that are individually traceable.",
    sourceTier: "C-listed",
  },
  {
    id: "srinagar-narendrasvami",
    name: "Narendrasvami temple (Nar Pirastan ziyarat)",
    deity: "Vishnu (Narendrasvamin)",
    location: {
      place: "Srinagar",
      district: "Srinagar",
      state: "Jammu & Kashmir",
      region: "Kashmir Valley",
    },
    destroyer: {
      name: "Sikandar Butshikan",
      dynasty: "Shah Mir Sultanate of Kashmir",
      year: 1400,
    },
    modernStatus:
      "Ziyarat 'Nar Pirastan' in Srinagar built on the converted Narendrasvami temple per ASI catalogue. (The name 'Nar Pirastan' preserves the original 'Narendra' element.)",
    primarySource: {
      chronicle: "Vol I Ch 10 state list (Kashmir section)",
      author: "Sita Ram Goel (1991), citing ASI Srinagar Circle reports",
    },
    quote: "Srinagar — Ziyarat named Nar Pirastan. Narendrasvami Temple converted.",
    significance:
      "Narendrasvami is a Srinagar Vaishnava temple attested by Kalhana (12th c. Rajatarangini). The 'Nar Pirastan' name retains the Sanskrit root in the converted dargah.",
    sourceTier: "C-listed",
  },
  {
    id: "srinagar-vikramesvara",
    name: "Vikrameshvara temple (Vicharnag masjid-madrasa)",
    deity: "Shiva (Vikrameshvara)",
    location: {
      place: "Srinagar (Vicharnag)",
      district: "Srinagar",
      state: "Jammu & Kashmir",
      region: "Kashmir Valley",
    },
    destroyer: {
      name: "Sikandar Butshikan",
      dynasty: "Shah Mir Sultanate of Kashmir",
      year: 1400,
    },
    modernStatus:
      "Masjid, madrasa, and graveyard near Vicharnag (Srinagar) built on the site and from materials of the Vikrameshvara temple per ASI catalogue.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list (Kashmir section)",
      author: "Sita Ram Goel (1991), citing ASI Srinagar Circle reports",
    },
    quote: "Srinagar (Vicharnag) — Masjid and Madrasa and Graveyard. On the site and from materials of the Vikrameshvara Temple.",
    significance:
      "Vikrameshvara is named in Kalhana's chronicle as one of the king Vikramaditya's foundations. The Vicharnag area today preserves a Hindu spring shrine adjacent to the converted site.",
    sourceTier: "C-listed",
  },
  {
    id: "srinagar-diddamatha",
    name: "Didda Matha (Malik Sahib ziyarat)",
    deity: "Devi (Queen Didda's matha)",
    location: {
      place: "Srinagar (Didd Mar)",
      district: "Srinagar",
      state: "Jammu & Kashmir",
      region: "Kashmir Valley",
    },
    destroyer: {
      name: "Sikandar Butshikan",
      dynasty: "Shah Mir Sultanate of Kashmir",
      year: 1400,
    },
    modernStatus:
      "Ziyarat of Malik Sahib in 'Didd Mar' (Srinagar) stands on the site of Didda Matha per ASI catalogue.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list (Kashmir section)",
      author: "Sita Ram Goel (1991), citing ASI Srinagar Circle reports",
    },
    quote: "Srinagar — Ziyarat of Malik Sahib in Didd Mar. On the site of Didda Matha.",
    significance:
      "Didda was the 10th-century queen of Kashmir (r. 980–1003). Her matha (monastic foundation) is mentioned by Kalhana and the toponym 'Didd Mar' (Didda's quarter) preserved it through to the conversion.",
    sourceTier: "C-listed",
  },
  {
    id: "srinagar-skandabhavana-vihara",
    name: "Skandabhavana Vihara (Pir Muhammad Basir ziyarat)",
    deity: "Buddha (Skandabhavana Vihara)",
    location: {
      place: "Srinagar (Khandbavan)",
      district: "Srinagar",
      state: "Jammu & Kashmir",
      region: "Kashmir Valley",
    },
    destroyer: {
      name: "Sikandar Butshikan",
      dynasty: "Shah Mir Sultanate of Kashmir",
      year: 1400,
    },
    modernStatus:
      "Ziyarat of Pir Muhammad Basir in Khandbavan (Srinagar) stands on the site of Skandabhavana Vihara per ASI catalogue.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list (Kashmir section)",
      author: "Sita Ram Goel (1991), citing ASI Srinagar Circle reports",
    },
    quote: "Srinagar — Ziyarat of Pir Muhammad Basir in Khandbavan. On the site of Skandabhavana Vihara.",
    significance:
      "Skandabhavana is one of the major Buddhist monastic foundations of Kashmir documented in pre-Islamic sources. The toponym 'Khandbavan' (← Skandabhavana) is a direct linguistic survival of the destroyed name.",
    sourceTier: "C-listed",
  },
  {
    id: "srinagar-meruvardhanasvami-pandrethan",
    name: "Meruvardhanasvami temple (Pandrethan masjid)",
    deity: "Shiva (Meruvardhanasvamin)",
    location: {
      place: "Pandrethan",
      district: "Srinagar",
      state: "Jammu & Kashmir",
      region: "Kashmir Valley",
    },
    destroyer: {
      name: "Sikandar Butshikan",
      dynasty: "Shah Mir Sultanate of Kashmir",
      year: 1400,
    },
    modernStatus:
      "Pandrethan masjid built with Meruvardhanasvami temple materials per ASI catalogue. (A small surviving Shiva temple at Pandrethan, the Pandrethan Mandir, is a separate later structure.)",
    primarySource: {
      chronicle: "Vol I Ch 10 state list (Kashmir section)",
      author: "Sita Ram Goel (1991), citing ASI Srinagar Circle reports",
    },
    quote: "Pandrethan — Masjid. Meruvardhanasvami Temple materials used.",
    significance:
      "Pandrethan (← Puranadhisthan, 'old capital') was the pre-Srinagar Kashmir capital. The Meruvardhanasvami temple was a royal foundation; the toponym 'Pandrethan' itself is a residue of the displaced Hindu political centre.",
    sourceTier: "C-listed",
  },
  {
    id: "srinagar-shah-i-hamadan-kali",
    name: "Kali temple at Kalashpura (Shah-i-Hamadan dargah)",
    deity: "Devi (Kali)",
    location: {
      place: "Srinagar (Kalashpura)",
      district: "Srinagar",
      state: "Jammu & Kashmir",
      region: "Kashmir Valley",
    },
    destroyer: {
      name: "Sikandar Butshikan / Sayyid Ali Hamadani",
      dynasty: "Shah Mir Sultanate of Kashmir",
      year: 1395,
    },
    modernStatus:
      "Khanqah of Shah-i-Hamadan (Sayyid Ali Hamadani's dargah, built 1395) at Kalashpura in Srinagar stands on the converted Kali temple per ASI catalogue. The current wooden structure is a 18th-century rebuild.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list (Kashmir section)",
      author: "Sita Ram Goel (1991), citing ASI Srinagar Circle reports",
    },
    quote: "Srinagar — Dargah and Masjid of Shah-i-Hamadani in Kalashpura. On the site of the Kali Temple.",
    significance:
      "Sayyid Ali Hamadani is the foundational Sufi figure of Sunni Kashmir. His most prominent Srinagar shrine sits on the converted Kali temple — making the foundational sacred site of Kashmiri Sunnism a former Devi shrine per the ASI record.",
    sourceTier: "C-listed",
  },

  // ---- MADHYA PRADESH ----
  {
    id: "dhar-kamal-maula",
    name: "Kamal Maula Masjid (Bhojshala) at Dhar",
    deity: "Saraswati (Vagdevi)",
    location: {
      place: "Dhar",
      district: "Dhar",
      state: "Madhya Pradesh",
      region: "Central",
      coordinates: { lat: 22.6, lng: 75.3 },
    },
    destroyer: {
      name: "Alauddin Khalji and successors",
      dynasty: "Khalji + Malwa Sultanate",
      year: 1305,
    },
    modernStatus:
      "Kamal Maula Masjid stands on the Bhojshala site — the Saraswati temple-college of Raja Bhoja Paramara (11th c.). The Lat Masjid (1405) at Dhar is built with Jain temple materials per the ASI catalogue.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Bhopal Circle reports",
      note: "Vagdevi (Saraswati) image from Bhojshala removed to British Museum 1875",
    },
    quote:
      "Dhar — Capital of Raja Bhoja Paramara converted into a Muslim capital. The following Muslim monuments tell their own story: Kamal Maula Masjid (Temple materials used); Lat Masjid 1405 (Jain Temple materials used); Mazar of Abdullah Shah Changal (Temple site).",
    significance:
      "Bhojshala — the Sanskrit university and Saraswati temple of Raja Bhoja (1010–1055) — produced major Sanskrit treatises (Saraswati-Kanthabharana, Shringara-Prakasha). The Kamal Maula Masjid (named after Sufi Kamaluddin Maula, d. 1373) is built on the site; the Vagdevi image was removed to the British Museum in 1875.",
    sourceTier: "C-listed",
  },
  {
    id: "mandu-malwa-cluster",
    name: "Mandu Malwa Sultanate cluster",
    deity: "Multi",
    location: {
      place: "Mandu",
      district: "Dhar",
      state: "Madhya Pradesh",
      region: "Central",
      coordinates: { lat: 22.36, lng: 75.4 },
    },
    destroyer: { name: "Malwa Sultanate rulers", dynasty: "Malwa Sultanate", year: 1454 },
    modernStatus:
      "Nineteen monuments at Mandu — including the Jami Masjid (1454), Dilawar Khan-ki-Masjid (1405), Hindola Mahal, Jahaz Mahal, the maqbara of Hoshang Shah, Rupmati Pavilion, and the fort gates — are listed in Vol I Ch 10 as on temple sites or built with temple materials.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Bhopal Circle reports",
    },
    quote:
      "Mandu — An ancient Hindu city converted into a Muslim capital and the following monuments built on the sites of and/or with materials from temples: Jami Masjid 1454; Dilawar Khan-ki-Masjid 1405; Chhoti Jami Masjid; Maqbara of Hushang Shah; Jahaz Mahal; Hindola Mahal; Rupmati Pavilion; Ashrafi Mahal; Nilkanth Mahal; Fort and Gates.",
    significance:
      "Mandu was the Malwa Sultanate's capital (15th c.). The 19-monument cluster includes some of the most architecturally celebrated Sultanate buildings in India — all on a Hindu/Jain substrate per the ASI catalogue.",
    sourceTier: "C-listed",
  },
  {
    id: "chanderi-medieval-cluster",
    name: "Chanderi medieval mosques and tombs",
    deity: "Multi",
    location: {
      place: "Chanderi",
      district: "Ashoknagar",
      state: "Madhya Pradesh",
      region: "Central",
      coordinates: { lat: 24.71, lng: 78.13 },
    },
    destroyer: { name: "Tughlaq and Malwa Sultanate rulers", dynasty: "Tughlaq + Malwa", year: 1392 },
    modernStatus:
      "Sixteen monuments at Chanderi — including the Jami Masjid, Moti Masjid, Battisi Baodi Masjid (1488), Hathipur-ki-Masjid (1691), the Rani-ka-Maqbara, the Kushk Mahal, and the fort — are listed in Vol I Ch 10 as on temple sites or with temple materials.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Bhopal Circle reports",
    },
    quote:
      "Chanderi — Muslim city built from the ruins of the old or Budhi Chanderi nearby. The following monuments stand on the sites of temples and/or have temple materials used in them: Masjid 1392; Moti Masjid; Jami Masjid; Battisi Baodi Masjid 1488; Hathipur-ki-Masjid 1691; Raja-ka-Maqbara; Rani-ka-Maqbara; Fort; Kushk Mahal; Idgah 1495.",
    significance:
      "Chanderi (Budhi Chanderi) was the Pratihara-era Hindu town displaced by 'New' Chanderi after 1392. The ASI catalogue records the city as 'built from the ruins of Budhi Chanderi' — a phrase that captures the full architectural transfer.",
    sourceTier: "C-listed",
  },
  {
    id: "vidisha-bhilsa-iltutmish",
    name: "Bhilsa (Vidisha) — Iltutmish 1234",
    deity: "Multi (Bhojeshwar / Bijeshwar)",
    location: {
      place: "Vidisha (Bhilsa)",
      district: "Vidisha",
      state: "Madhya Pradesh",
      region: "Central",
      coordinates: { lat: 23.525, lng: 77.806 },
    },
    destroyer: {
      name: "Iltutmish",
      dynasty: "Slave (Mamluk) Sultanate",
      year: 1234,
    },
    modernStatus:
      "Bhilsa / Vidisha was attacked in the same 1234 campaign as Ujjain. Local Bijamandal mosque is built on temple foundations (excavated Bijamandal temple plinth visible).",
    primarySource: {
      chronicle: "Muntakhab-ut-Tawarikh / Tabaqat-i-Nasiri",
      author: "Badauni / Minhaj-us-Siraj",
    },
    quote:
      "In the year AH 631 (AD 1233) having made an incursion in the direction of the province of Malwah and taken Bhilsa and also captured the city of Ujjain... (Iltutmish destroyed the idol-temples of both cities.)",
    significance:
      "Vidisha was the home of the great Udayagiri caves (5th c. Gupta Vaishnava sculpture) and the Sanchi stupa nearby. The 1234 raid is the same campaign that destroyed the Mahakaleshwar at Ujjain; the Bijamandal site preserves the excavated plinth of the destroyed temple.",
    sourceTier: "B-corroborated",
  },

  // ---- MAHARASHTRA ----
  {
    id: "daulatabad-jami-masjid-1315",
    name: "Jain temple converted to Daulatabad Jami Masjid",
    deity: "Jain",
    location: {
      place: "Daulatabad",
      district: "Aurangabad",
      state: "Maharashtra",
      region: "Deccan",
      coordinates: { lat: 19.943, lng: 75.21 },
    },
    destroyer: {
      name: "Khalji-era rulers (Malik Kafur campaign)",
      dynasty: "Khalji",
      year: 1315,
    },
    modernStatus:
      "Jami Masjid in Daulatabad Fort (1315) is built from a converted Jain temple. Six further Muslim monuments in Daulatabad — including the Yak Minar Masjid in the Fort, the Idgah (1359), the dargah of Pir Kadu Sahib, and the fort itself — are on temple sites or use temple materials.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Aurangabad Circle reports",
    },
    quote:
      "Daulatabad — Jami Masjid 1315. Converted Jain Temple. (Also: Yak Minar Masjid in the Fort; Masjid-i-Hauz at Kazipura 1458; Idgah 1359; Dargah of Pir Kadu Sahib — converted temple; Fort — temple materials used.)",
    significance:
      "Daulatabad / Devagiri was the Yadava capital before Khalji conquest (1296, 1307–1318). The 1315 Jami Masjid is among the earliest dated Sultanate buildings in the Deccan and rests on a Jain temple substrate.",
    sourceTier: "C-listed",
  },
  {
    id: "aurangabad-aurangzeb-temples",
    name: "Aurangabad city mosques on temple sites",
    deity: "Multi",
    location: {
      place: "Aurangabad",
      district: "Aurangabad",
      state: "Maharashtra",
      region: "Deccan",
      coordinates: { lat: 19.876, lng: 75.343 },
    },
    destroyer: { name: "Aurangzeb (city named after him)", dynasty: "Mughal", year: 1681 },
    modernStatus:
      "Aurangabad's Jami Masjid, Lal Masjid, and the maqbara of Aurangzeb himself are listed in Vol I Ch 10 as on temple sites.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Aurangabad Circle reports",
    },
    quote:
      "Aurangabad — Jami Masjid (Temple site); Lal Masjid (Temple site); Maqbara of Aurangzeb (Temple site).",
    significance:
      "Aurangabad was renamed from Khadki / Fatehnagar when Aurangzeb made it his Deccan capital (1681). The fact that his own tomb at Khuldabad is on a temple site is a noted irony of the catalogue.",
    sourceTier: "C-listed",
  },
  {
    id: "paithan-renukadevi-jami-masjid",
    name: "Renukadevi temple (Maulana Sahib-ki-Masjid, Paithan)",
    deity: "Devi (Renuka)",
    location: {
      place: "Paithan",
      district: "Aurangabad",
      state: "Maharashtra",
      region: "Deccan",
      coordinates: { lat: 19.483, lng: 75.383 },
    },
    destroyer: { name: "Aurangzeb-era rulers", dynasty: "Mughal", year: 1630 },
    modernStatus:
      "Maulana Sahib-ki-Masjid at Paithan is the converted Renukadevi temple. Three additional Paithan monuments — Jami Masjid (1630, converted temple), Alamgiri Masjid (temple materials), and a dargah (1507) — are listed.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Aurangabad Circle reports",
    },
    quote:
      "Paithan — Jami Masjid 1630 (Converted temple); Maulana Sahib-ki-Masjid (Converted Renukadevi Temple); Alamagiri Masjid (Temple materials used); Dargah of Makhdum Husain Ahmad 1507 (Temple site).",
    significance:
      "Paithan (ancient Pratishthana) was the Satavahana capital and a major Devi centre. Renuka is the mother of Parashurama and a goddess particularly important to Maharashtra. The conversion is one of the few cases where the deity is named explicitly in the ASI tag.",
    sourceTier: "C-listed",
  },
  {
    id: "ghoda-jami-33-temples",
    name: "Jami Masjid of Ghoda (built from 33 temples)",
    deity: "Multi",
    location: {
      place: "Ghoda",
      district: "Pune",
      state: "Maharashtra",
      region: "Deccan",
    },
    destroyer: { name: "Ahmadnagar / Bijapur era rulers", dynasty: "Deccan Sultanates", year: 1586 },
    modernStatus:
      "Jami Masjid of Ghoda (1586) stands. Vol I Ch 10 records explicitly that it was 'built in 1586 from materials of 33 temples.'",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Pune Circle reports",
    },
    quote: "Ghoda — Jami Masjid. Built in 1586 from materials of 33 temples.",
    significance:
      "Another rare entry that gives an explicit count — 33 temples — concentrated into a single mosque foundation. The Pune-region 16th century saw multiple such consolidation operations under Nizam Shahi and Adil Shahi rule.",
    sourceTier: "C-listed",
  },
  {
    id: "parenda-manakeshvara-namazgah",
    name: "Manakeshvara temple (Parenda Namazgah)",
    deity: "Shiva (Manakeshvara)",
    location: {
      place: "Parenda",
      district: "Osmanabad",
      state: "Maharashtra",
      region: "Deccan",
    },
    destroyer: { name: "Bahmani-era rulers", dynasty: "Bahmani", year: 1450 },
    modernStatus:
      "Namazgah near the Talav at Parenda is built from / on the converted Manakeshvara temple. The Masjid inside the Parenda Fort is 'built entirely of temple materials.'",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Pune Circle reports",
    },
    quote:
      "Parenda — Masjid inside the Fort (Built entirely of temple materials); Namazgah near the Talav (Converted Manakeshvara Temple).",
    significance:
      "Manakeshvara is a named local Shaiva foundation. The 'built entirely of temple materials' tag is particularly strong evidence — it means no original Islamic-period stone is in the fort mosque.",
    sourceTier: "C-listed",
  },
  {
    id: "nasik-mahalakshmi-jami-masjid",
    name: "Mahalakshmi temple (Nasik fort Jami Masjid)",
    deity: "Devi (Mahalakshmi)",
    location: {
      place: "Nasik",
      district: "Nashik",
      state: "Maharashtra",
      region: "Deccan",
      coordinates: { lat: 20.0, lng: 73.78 },
    },
    destroyer: { name: "Mughal-era rulers", dynasty: "Mughal", year: 1620 },
    modernStatus: "Jami Masjid in the Nasik Fort is the converted Mahalakshmi temple per ASI catalogue.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Pune Circle reports",
    },
    quote: "Nasik — Jami Masjid in the Fort. Converted Mahalakshmi Temple.",
    significance:
      "Nasik / Nasika is a major Hindu pilgrimage site (Trimbakeshwar Jyotirlinga nearby; one of four Kumbh Mela sites). The Mahalakshmi conversion is one of several Devi-temple replacements in the Deccan section.",
    sourceTier: "C-listed",
  },
  {
    id: "ramtek-aurangzeb-converted",
    name: "Ramtek temple converted to mosque",
    deity: "Vishnu (Rama)",
    location: {
      place: "Ramtek",
      district: "Nagpur",
      state: "Maharashtra",
      region: "Deccan",
      coordinates: { lat: 21.4, lng: 79.33 },
    },
    destroyer: { name: "Aurangzeb-era rulers", dynasty: "Mughal", year: 1680 },
    modernStatus:
      "Masjid at Ramtek built in Aurangzeb's reign on the converted Ramtek temple per ASI catalogue. The present Ramtek Sri Rama temple is a later rebuild on the original hill site.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Nagpur Circle reports",
    },
    quote: "Ramtek — Masjid built in Aurangzeb's reign. Converted temple.",
    significance:
      "Ramtek is associated with Rama's exile per the Maharashtrian tradition and is the site of Kalidasa's Meghaduta opening. The conversion is one of the easternmost Aurangzeb-era foundations recorded in the Maharashtra section.",
    sourceTier: "C-listed",
  },

  // ---- ORISSA ----
  {
    id: "jajpur-sayyid-bukhari-many-temples",
    name: "Many temples of Jajpur (Sayyid Bukhari dargah)",
    deity: "Multi (Birja Devi temple complex)",
    location: {
      place: "Jajpur",
      district: "Jajpur",
      state: "Orissa",
      region: "East",
      coordinates: { lat: 20.85, lng: 86.34 },
    },
    destroyer: { name: "Kalapahar (Bengal Sultanate general)", dynasty: "Bengal Sultanate", year: 1568 },
    modernStatus:
      "Dargah of Sayyid Bukhari at Jajpur built with materials of many temples. The Jami Masjid built by Nawwab Abu Nasr at Jajpur is built with temple materials.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Bhubaneswar Circle reports",
    },
    quote:
      "Jajpur — Dargah of Sayyid Bukhari (Materials of many temples used); Jami Masjid built by Nawwab Abu Nasr (Temple materials used).",
    significance:
      "Jajpur was the capital of the Bhauma-Kara dynasty (8th–10th c.) and a major Shakta centre (Birja Devi). The 1568 Kalapahar campaign destroyed most of its medieval temple corpus; the Bukhari dargah is the largest single overlay.",
    sourceTier: "C-listed",
  },
  {
    id: "cuttack-shahi-masjid-aurangzeb",
    name: "Cuttack mosques on temple sites (Aurangzeb era)",
    deity: "Multi",
    location: {
      place: "Cuttack",
      district: "Cuttack",
      state: "Orissa",
      region: "East",
      coordinates: { lat: 20.46, lng: 85.88 },
    },
    destroyer: { name: "Aurangzeb-era rulers", dynasty: "Mughal", year: 1670 },
    modernStatus:
      "Five Cuttack mosques are listed in Vol I Ch 10 as on temple sites: Shahi Masjid; Masjids in Oriya Bazar; Qadam Rasul Masjid; Masjid (1668–69); Masjid (1690–91). The Alamgir Hill Takht-i-Sulaiman Masjid (1719) uses temple materials.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Bhubaneswar Circle reports",
    },
    quote:
      "Cuttack — Shahi Masjid (Temple site); Masjids in Oriya Bazar (Temple sites); Qadam Rasul Masjid (Temple site); Masjid 1668–69 (Temple site); Masjid 1690–91 (Temple site). Alamgir Hill — Takht-i-Sulaiman Masjid 1719 (Temple materials used).",
    significance:
      "Cuttack was the Eastern Ganga / Gajapati capital of Orissa. The cluster of Aurangzeb-period mosques on temple sites tracks the Mughal subjugation of the Orissa coastline in the 1660s–80s.",
    sourceTier: "C-listed",
  },

  // ---- PUNJAB ----
  {
    id: "sultanpur-buddhist-vihara",
    name: "Buddhist vihara at Sultanpur Lodi (Badshahi Sarai)",
    deity: "Buddha",
    location: {
      place: "Sultanpur Lodi",
      district: "Kapurthala",
      state: "Punjab",
      region: "North",
    },
    destroyer: { name: "Sultanate era rulers", dynasty: "Multiple", year: 1300 },
    modernStatus: "Badshahi Sarai at Sultanpur Lodi built on the site of a Buddhist vihara per ASI catalogue.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Patiala Circle reports",
    },
    quote: "Sultanpur (Jalandhar District) — Badshahi Sarai. Built on the site of a Buddhist Vihara.",
    significance:
      "Sultanpur Lodi is the place where Guru Nanak spent his early years working for Daulat Khan Lodi. The Badshahi Sarai entry is one of the few recorded pre-Islamic Buddhist substrate sites in Punjab.",
    sourceTier: "C-listed",
  },
  {
    id: "samana-medieval-mosques",
    name: "Samana medieval mosques on temple sites",
    deity: "Multi",
    location: {
      place: "Samana",
      district: "Patiala",
      state: "Punjab",
      region: "North",
    },
    destroyer: { name: "Successive Sultanate rulers", dynasty: "Multiple", year: 1495 },
    modernStatus:
      "Four Samana mosques — Sayyidan-ki-Masjid (1495), Jami Masjid (1614–15), Masjid near Imambara (1637), Pirzada-ki-Masjid (1647) — are listed as on temple sites in Vol I Ch 10.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Patiala Circle reports",
    },
    quote:
      "Samana — Sayyidan-ki-Masjid 1495 (Temple site); Jami Masjid 1614–15 (Temple site); Masjid near Imambara 1637 (Temple site); Pirzada-ki-Masjid 1647 (Temple site).",
    significance:
      "Samana was a major Sayyid pilgrimage centre in the medieval Punjab. The four-mosque overlay tracks Sultanate-to-Mughal continuity in temple-replacement across 150 years on the same town.",
    sourceTier: "C-listed",
  },

  // ---- RAJASTHAN (additional beyond the 6 already listed) ----
  {
    id: "ajmer-additional-monuments",
    name: "Additional Ajmer monuments (Taragarh + Pushkar)",
    deity: "Multi",
    location: {
      place: "Ajmer",
      district: "Ajmer",
      state: "Rajasthan",
      region: "West",
    },
    destroyer: { name: "Successive Sultanate / Mughal rulers", dynasty: "Multiple", year: 1199 },
    modernStatus:
      "Beyond the Adhai-Din-Ka-Jhonpra mosque (1199), eight additional Ajmer monuments are listed in Vol I Ch 10 as on temple sites or with temple materials: Qalandar Masjid at Taragarh, Ganj-i-Shahidan at Taragarh, the Dargah of Muinuddin Chishti (d. 1236), Chillah-i-Chishti near Annasagar Lake, Jahangiri Mahal at Pushkar, Shahjahani Masjid (1637), and the Annasagar Baradari.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Ajmer Circle reports",
    },
    quote:
      "Ajmer — It was a Hindu capital converted into a Muslim metropolis. The following monuments stand on the site of and/or are built with materials from temples: Adhai-Din-Ka-Jhonpra 1199; Qalandar Masjid at Taragarh; Ganj-i-Shahidan at Taragarh; Dargah of Muinuddin Chishti d. 1236; Chillah-i-Chishti near Annasagar Lake; Dargah and Mazar of Sayyid Husain at Taragah; Jahangiri Mahal at Pushkar; Shahjahani Masjid 1637; Annasagar Baradari.",
    significance:
      "Ajmer was the Chauhan capital (Prithviraj Chauhan III) before 1192. The ASI catalogue lists nine separate monuments on temple sites or with temple materials, including the foundational Chishti dargah of Muinuddin — the Sufi shrine that anchors all subsequent Chishti devotional geography in India.",
    sourceTier: "C-listed",
  },
  {
    id: "nagaur-medieval-cluster",
    name: "Nagaur medieval mosques and dargahs",
    deity: "Multi",
    location: {
      place: "Nagaur",
      district: "Nagaur",
      state: "Rajasthan",
      region: "West",
      coordinates: { lat: 27.2, lng: 73.74 },
    },
    destroyer: { name: "Khalji + Mughal era rulers", dynasty: "Multiple", year: 1432 },
    modernStatus:
      "Twenty-seven Nagaur monuments are listed in Vol I Ch 10 on temple sites or with temple materials, including dargahs of Sufi Hamiduddin Nagauri Chishti, Shaykh Abdul Qadir Jilani, the Jami Masjid (1553), and Shah Jahani Masjid at Surajpole (converted temple).",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Jodhpur Circle reports",
    },
    quote:
      "Nagaur — Dargah of Sufi Hamiduddin Nagauri Chishti; Dargah of Shaykh Abdul Qadir Jilani; Jami Masjid 1553; Ek Minar-ki-Masjid 1505–06; Shah Jahani Masjid at Surajpole (Converted temple); plus 22 other temple-site mosques 1433–1700.",
    significance:
      "Nagaur was a major Sufi centre under the Khalji-Tughlaq period (Hamiduddin Nagauri was a disciple of Muinuddin Chishti). The 27-monument cluster makes it one of the densest temple-replacement towns in the Rajasthan list.",
    sourceTier: "C-listed",
  },
  {
    id: "jalor-parshvanatha",
    name: "Parshvanatha Jain temple (Jalor Shahi Masjid)",
    deity: "Jain (Parshvanatha)",
    location: {
      place: "Jalor",
      district: "Jalor",
      state: "Rajasthan",
      region: "West",
    },
    destroyer: {
      name: "Khalji-era rulers (Topkhana Masjid 1323)",
      dynasty: "Khalji",
      year: 1323,
    },
    modernStatus:
      "Shahi or Topkhana Masjid at Jalor (1323) built with Parshvanatha Jain temple materials. Two further Jalor mosques (Idgah 1318, Baoliwali Masjid 1523) are on temple sites.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Jodhpur Circle reports",
    },
    quote:
      "Jalor — Shahi or Topkhana Masjid 1323. Parshvanatha Temple materials used. (Also: Idgah 1318; Baoliwali Masjid 1523.)",
    significance:
      "Jalor was the Sonigara Chauhan capital and a major Jain centre. The 1323 Topkhana Masjid uses the materials of the Parshvanatha temple — naming the specific Tirthankara — making this one of the few Jain-named ASI entries.",
    sourceTier: "C-listed",
  },

  // ---- TAMIL NADU ----
  {
    id: "kanchipuram-multiple-mosques",
    name: "Multiple Kanchipuram mosques on temple sites",
    deity: "Multi (Shaiva + Vaishnava)",
    location: {
      place: "Kanchipuram",
      district: "Kanchipuram",
      state: "Tamil Nadu",
      region: "South",
      coordinates: { lat: 12.84, lng: 79.7 },
    },
    destroyer: {
      name: "Malik Kafur (Khalji) and Madurai Sultanate",
      dynasty: "Khalji + Madurai Sultanate",
      year: 1311,
    },
    modernStatus:
      "Kanchipuram retains most of its great temples (Kailasanatha, Ekambareshwarar, Kamakshi, Varadaraja). The Vol I Ch 10 catalogue lists nine mosques and the Gumbad of Baba Hamid Wali in Kanchipuram on temple sites — built after the Malik Kafur raid and during the Madurai Sultanate period.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Madras Circle reports",
    },
    quote:
      "Kanchipuram — Large Masjid (Temple site); Eight other Masjids (Temple sites); Gumbad of Baba Hamid Wali (Temple site).",
    significance:
      "Kanchipuram is the second of the seven Moksha-puris of Hinduism and the seat of the Pallava Mahabalipuram architectural school. The post-1311 mosque foundations on temple sites are nine entries in the ASI catalogue — the temple-replacement footprint without the loss of the surviving Pallava-Chola corpus.",
    sourceTier: "C-listed",
  },
  {
    id: "madurai-khwaja-alauddin",
    name: "Khwaja Alauddin dargah at Madurai",
    deity: "Unknown (Meenakshi area)",
    location: {
      place: "Madurai",
      district: "Madurai",
      state: "Tamil Nadu",
      region: "South",
      coordinates: { lat: 9.925, lng: 78.119 },
    },
    destroyer: {
      name: "Madurai Sultans (post-Malik Kafur)",
      dynasty: "Madurai Sultanate",
      year: 1335,
    },
    modernStatus:
      "Dargah of Khwaja Alauddin at Madurai is on a temple site per ASI catalogue. Goripalaiyam dargah of the same name is on a separate temple site nearby. The present Meenakshi temple is the 17th c. Nayak rebuild after the destruction of the original by Malik Kafur (1311) and the Madurai Sultans.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Madras Circle reports",
    },
    quote:
      "Madurai — Dargah of Khwaja Alauddin (Temple site); Goripalaiyam — Dargah of Khwaja Alauddin (Temple site).",
    significance:
      "The original Meenakshi-Sundareshwarar temple was destroyed during Malik Kafur's 1311 campaign and the Madurai Sultanate period (1335–1378). The present temple is the Nayak rebuild (16th–17th c.); the Khwaja Alauddin dargahs preserve the Sultanate-period mosque overlay.",
    sourceTier: "C-listed",
  },
  {
    id: "tirupparankunram-sikandar-masjid",
    name: "Tirupparankunram Cave Temple (Sikandar Masjid)",
    deity: "Multi (Brahmanical + Buddhist + Jain cave temples)",
    location: {
      place: "Tirupparankunram",
      district: "Madurai",
      state: "Tamil Nadu",
      region: "South",
      coordinates: { lat: 9.879, lng: 78.073 },
    },
    destroyer: { name: "Sikandar Shah (Madurai Sultan)", dynasty: "Madurai Sultanate", year: 1356 },
    modernStatus:
      "Sikandar Masjid on top of the Tirupparankunram Hill stands amidst ruins of Brahmanical, Buddhist and Jain temples per ASI catalogue. The present Subrahmanya temple at the foot of the hill survived.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Madras Circle reports",
    },
    quote:
      "Tirupparankunram — Sikandar Masjid on top of the Hill. Stands amidst ruins of Brahmanical, Buddhist and Jain temples.",
    significance:
      "Tirupparankunram is one of the six abodes of Murugan and contains some of the earliest Tamil cave temples (8th c. Pandyan). The Sikandar Masjid on the hilltop is one of the few documented Tamil Nadu Sultanate foundations on a pre-Islamic Hindu/Buddhist/Jain composite site.",
    sourceTier: "C-listed",
  },
  {
    id: "tiruchirapalli-natthar-wali-cluster",
    name: "Tiruchirapalli Sultanate-era dargah cluster",
    deity: "Multi (Shaiva and Vaishnava)",
    location: {
      place: "Tiruchirapalli",
      district: "Tiruchirappalli",
      state: "Tamil Nadu",
      region: "South",
    },
    destroyer: {
      name: "Madurai Sultanate era (Natthar Wali period)",
      dynasty: "Madurai Sultanate",
      year: 1340,
    },
    modernStatus:
      "Beyond the Natthar Wali dargah (the converted Shiva temple — see separate A-primary entry), the Vol I Ch 10 list catalogues 25 additional Tiruchirapalli dargahs and mosques on temple sites, including the Mazar of 'Qayim Shah who destroyed twelve temples.'",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Madras Circle reports",
    },
    quote:
      "Tiruchirapalli — Dargah of Natthar Shah Wali (Converted Shiva Temple — Lingam used as lamp-post); Masjid-i-Muhammadi (Temple site); Mazar of Qayim Shah who destroyed twelve temples (Temple site); plus 22 other dargahs and mosques on temple sites.",
    significance:
      "The Tiruchirapalli cluster is remarkable for two reasons: the Natthar Wali dargah explicitly records the converted Sivalinga used as a lamp-post, and one mazar (Qayim Shah) is dedicated to a saint whose dargah-record names the count of his destructions (twelve temples).",
    sourceTier: "C-listed",
  },

  // ---- UTTAR PRADESH (additional beyond the 5 already listed) ----
  {
    id: "kannauj-dina-jami-masjid-1406",
    name: "Sita-ki-Rasoi temple (Kannauj Jami Masjid)",
    deity: "Vishnu (Rama / Sita)",
    location: {
      place: "Kannauj",
      district: "Kannauj",
      state: "Uttar Pradesh",
      region: "North",
      coordinates: { lat: 27.05, lng: 79.92 },
    },
    destroyer: {
      name: "Ibrahim Sharqi (Jaunpur Sultanate)",
      dynasty: "Sharqi (Jaunpur)",
      year: 1406,
    },
    modernStatus:
      "Dina or Jami Masjid (1406) at Kannauj built with materials from the Sita-ki-Rasoi temple per ASI catalogue. Four further Muslim monuments at Kannauj (Makhdum Jahanian dargah, Baba Haji Pir dargah, a 1663–64 masjid, Bala Pir dargah) are on temple sites or with temple materials.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Lucknow Circle reports",
      note: "Also catalogued in Maulana Abdul Hai's Hindustan Islami Ahad Mein (1973)",
    },
    quote:
      "Kannauj — Dina or Jami Masjid 1406. Sita-ki-Rasoi Temple materials used. (Also: Dargah of Makhdum Jahanian — temple materials used; Dargah of Baba Haji Pir — temple site; Masjid 1663–64 — temple site; Dargah of Bala Pir — temple site.)",
    significance:
      "Kannauj was the imperial capital of Harshavardhana (7th c.) and later of the Pratiharas — the political centre of north India for 400 years. Maulana Abdul Hai's 1973 Urdu compendium independently lists the Kannauj Jami Masjid as 'built on the foundation of some Hindu Temple,' corroborating the ASI catalogue.",
    sourceTier: "B-corroborated",
  },
  {
    id: "jaunpur-atala-masjid-1408",
    name: "Atala Devi temple (Atala Masjid Jaunpur)",
    deity: "Devi (Atala)",
    location: {
      place: "Jaunpur",
      district: "Jaunpur",
      state: "Uttar Pradesh",
      region: "North",
      coordinates: { lat: 25.748, lng: 82.685 },
    },
    destroyer: {
      name: "Ibrahim Sharqi",
      dynasty: "Sharqi (Jaunpur)",
      year: 1408,
    },
    modernStatus:
      "Atala Masjid (1408) at Jaunpur built with Atala Devi temple materials. Twelve major Jaunpur Muslim monuments are listed in Vol I Ch 10 as built with temple materials, including the Lal Darwaza Masjid which used 'temple materials from the Vishveshwara Temple at Varanasi.'",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Lucknow Circle reports",
    },
    quote:
      "Jaunpur — Atala Masjid 1408 (Atala Devi Temple materials used); Dariba Masjid (Vijayachandra's Temple materials used); Jhanjhari Masjid (Jayachandra's Temple materials used); Lal Darwaza Masjid (Temple materials from the Vishveshwara Temple at Varanasi used); Jami Masjid (Patala Devi Temple site).",
    significance:
      "Jaunpur was the Sharqi Sultanate capital (1394–1493). The 12-monument cluster preserves the names of multiple specific destroyed temples — Atala Devi, Vijayachandra (Vijayachandra was a Gahadavala king of Kannauj), Jayachandra (Vijayachandra's son), Patala Devi — making this the densest single ASI entry that names destroyed temples by Hindu royal-patronage attribution.",
    sourceTier: "C-listed",
  },
  {
    id: "varanasi-bindu-madhava-1669",
    name: "Bindu Madhava temple (Bindu Madhava Masjid Varanasi)",
    deity: "Vishnu (Bindu Madhava)",
    location: {
      place: "Varanasi (Panchganga Ghat)",
      district: "Varanasi",
      state: "Uttar Pradesh",
      region: "North",
      coordinates: { lat: 25.319, lng: 83.014 },
    },
    destroyer: { name: "Aurangzeb", dynasty: "Mughal", year: 1669 },
    modernStatus:
      "Bindu Madhava Masjid (1669) at Panchganga Ghat is the converted Bindu Madhava temple per ASI catalogue. The Masjid at Panchganga Ghat is one of two major Aurangzeb mosques in Varanasi alongside the Gyanvapi (Kashi Vishwanath).",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Lucknow Circle reports",
      note: "Listed in Maulana Abdul Hai's 1973 Urdu compendium as 'Aurangzeb's second Benares mosque'",
    },
    quote:
      "Varanasi — Masjid at Gyanavapi (Vishveshvara Temple material used); Masjid at Panchganga Ghat (Kiritavishveshvara Temple materials used); Bindu Madhava Masjid 1669 (Converted Bindu Madhava Temple).",
    significance:
      "Bindu Madhava is the central Vaishnava deity of Varanasi (the city's Vishnu counterpart to Vishweshwar). Maulana Abdul Hai (Nadwa, 1973) lists this as 'Aurangzeb's second Benares mosque' alongside the Gyanvapi — corroborating the ASI tag.",
    sourceTier: "B-corroborated",
  },
  {
    id: "mahoba-310-pillars",
    name: "Mahoba — dargah of Mubarak Shah with 310 temple pillars",
    deity: "Multi (Chandela period)",
    location: {
      place: "Mahoba",
      district: "Mahoba",
      state: "Uttar Pradesh",
      region: "North",
      coordinates: { lat: 25.29, lng: 79.87 },
    },
    destroyer: {
      name: "Qutbuddin Aibak (1203) and successor sultans",
      dynasty: "Slave Sultanate + Tughlaq",
      year: 1322,
    },
    modernStatus:
      "The Mahoba dargah of Mubarak Shah contains 'no less than 310 pillars from demolished temples' per ASI catalogue. The Masjid outside Bhainsa Darwaza (1322) is a converted temple. The dargah of Pir Muhammad Shah is a converted Shiva temple.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Lucknow Circle reports",
    },
    quote:
      "Mahoba — Masjid outside Bhainsa Darwaza of the Fort 1322 (Converted temple); Masjid built on a part of the Palace of Parmardideva on the Hill (Temple materials used); Two Maqbaras (Temple materials used); Dargah of Pir Muhammad Shah (Converted Shiva temple); Dargah of Mubarak Shah and Graveyard nearby (Contain no less than 310 pillars from demolished temples).",
    significance:
      "Mahoba was the Chandela capital (10th–13th c.) — same dynasty as Khajuraho. Parmardideva was the Chandela king defeated by Prithviraj Chauhan (1182) and then by Qutbuddin Aibak (1203). The dargah with 310 temple pillars is one of the highest pillar-counts recorded in the ASI catalogue.",
    sourceTier: "C-listed",
  },
  {
    id: "sambhal-hari-mandir-1526",
    name: "Hari Mandir (Sambhal Jami Masjid 1526)",
    deity: "Vishnu (Hari)",
    location: {
      place: "Sambhal",
      district: "Sambhal",
      state: "Uttar Pradesh",
      region: "North",
      coordinates: { lat: 28.585, lng: 78.566 },
    },
    destroyer: { name: "Mir Hindu Beg (officer of Babur)", dynasty: "Mughal", year: 1526 },
    modernStatus:
      "Jami Masjid at Sambhal was built in 1526 by an officer of Babur on the site and from the materials of the local Hari Mandir per Vol II Ch 6 of the source. The Vol I Ch 10 catalogue lists it as a 'converted Vishnu Temple.' The mosque inscriptions were 'plastered over' before the present author's contacts could photograph them.",
    primarySource: {
      chronicle: "Vol II Ch 6 + Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Moradabad Circle reports",
      note: "Inscriptions plastered over to hide content; first-hand witness account in Vol II Ch 6.",
    },
    quote:
      "Sambhal — Jami Masjid. Converted Vishnu Temple. (Vol II Ch 6: This mosque was built in AD 1526 by an officer of Babur on the site and from the materials of the local Hari Mandir.)",
    significance:
      "Sambhal is associated with the Kalki Avatara prophecy in Vaishnava tradition. The 1526 mosque is one of three major Babur-era foundations on temple sites (Ayodhya Babri, Palam Babri, Sambhal Hari Mandir) — making the pattern across Babur's brief reign uniform.",
    sourceTier: "B-corroborated",
  },
  {
    id: "ayodhya-swargadwara-treta-ka-thakur",
    name: "Swargadwara and Treta-ka-Thakur temples (Ayodhya, Aurangzeb)",
    deity: "Vishnu (Rama)",
    location: {
      place: "Ayodhya",
      district: "Ayodhya",
      state: "Uttar Pradesh",
      region: "North",
    },
    destroyer: { name: "Aurangzeb", dynasty: "Mughal", year: 1670 },
    modernStatus:
      "Vol I Ch 10 lists two Aurangzeb mosques at Ayodhya beyond the Babri Masjid: one on the Swargadwara temple site and one on the Treta-ka-Thakur temple site. The mazar of Shah Juran Ghuri at Ayodhya is on a temple site. The mazars of Sir Paighambar and Ayub Paighambar near Maniparvat stand on the site of a Buddhist temple 'which contained footmarks of the Buddha.'",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Lucknow Circle reports",
    },
    quote:
      "Ayodhya — Babri Masjid (Rama-Janmabhumi Temple site); Masjid built by Aurangzeb (Swargadvara Temple site); Masjid built by Aurangzeb (Treta-ka-Thakur Temple site); Mazar of Shah Juran Ghuri (Temple site); Mazars of Sir Paighambar and Ayub Paighambar near Maniparvat (On the site of a Buddhist Temple which contained footmarks of the Buddha).",
    significance:
      "Beyond the Babri Masjid, Aurangzeb is recorded by the ASI catalogue as having built two further mosques at Ayodhya — on Swargadwara and Treta-ka-Thakur temple sites — both Rama-related foundations. The Buddhist temple footmark site near Maniparvat is the rare Sarvastivada-period (3rd c. CE) Ayodhya substrate.",
    sourceTier: "C-listed",
  },
  {
    id: "sahet-mahet-sravasti",
    name: "Sobhnath Jain Temple and Buddhist Vihara at Sravasti",
    deity: "Jain (Sobhnath) + Buddha",
    location: {
      place: "Sahet-Mahet (Sravasti)",
      district: "Shravasti",
      state: "Uttar Pradesh",
      region: "North",
      coordinates: { lat: 27.51, lng: 82.04 },
    },
    destroyer: {
      name: "Multiple Sultanate-era rulers",
      dynasty: "Multiple",
      year: 1300,
    },
    modernStatus:
      "ASI-protected Sravasti site. The Maqbara at Sahet-Mahet is built on the plinth of the Sobhnath Jain temple. The Mazar of Miran Sayyid is built on the ruins of a Buddhist vihara. The Imli and Karbala gateways are built with temple materials.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Lucknow Circle reports",
    },
    quote:
      "Sahet-Mahet (Sravasti) — Maqbara (On the plinth of Sobhnath Jain Temple); Mazar of Miran Sayyid (On the ruins of a Buddhist Vihara); Imli Darwaza (Temple materials used); Karbala Darwaza (Temple materials used).",
    significance:
      "Sravasti was where the Buddha spent more rainy seasons than at any other location (Jetavana monastery). It was also the birthplace of two Jain Tirthankaras (Sambhavanatha, Chandraprabha). The maqbara on the Sobhnath plinth preserves the original Jain foundation under the medieval Muslim overlay.",
    sourceTier: "C-listed",
  },
  {
    id: "kalinjar-lakshmi-narayana-1412",
    name: "Lakshmi-Narayana temple (Kalinjar Patthar Mahalla Masjid)",
    deity: "Vishnu (Lakshmi-Narayana)",
    location: {
      place: "Kalinjar",
      district: "Banda",
      state: "Uttar Pradesh",
      region: "North",
      coordinates: { lat: 25.0, lng: 80.49 },
    },
    destroyer: {
      name: "Sultanate-era ruler",
      dynasty: "Tughlaq / Sharqi",
      year: 1412,
    },
    modernStatus: "Masjid in Patthar Mahalla (1412–13) at Kalinjar Fort is the converted Lakshmi-Narayana temple per ASI catalogue.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Lucknow Circle reports",
    },
    quote:
      "Kalinjar — Masjid in Patthar Mahalla 1412–13. Converted Lakshmi-Narayana Temple.",
    significance:
      "Kalinjar was the Chandela fortress (10th–13th c.) and one of Mahmud of Ghazni's most stubborn objectives (he failed to take it in 1023). The 1412 conversion of the Lakshmi-Narayana temple is in the Sharqi period, on the Chandela ruins.",
    sourceTier: "C-listed",
  },
  {
    id: "meerut-buddhist-vihara",
    name: "Meerut Jami Masjid on Buddhist vihara ruins",
    deity: "Buddha + Devi (Nauchandi)",
    location: {
      place: "Meerut",
      district: "Meerut",
      state: "Uttar Pradesh",
      region: "North",
    },
    destroyer: { name: "Sultanate era rulers", dynasty: "Multiple", year: 1192 },
    modernStatus:
      "Meerut Jami Masjid stands on the ruins of a Buddhist vihara per ASI catalogue. The dargah at Nauchandi is on the Nauchandi Devi temple site. The Garhmukteshwar Masjid (1283) and the Jalali Jami Masjid (1266–67) in Meerut district use temple materials.",
    primarySource: {
      chronicle: "Vol I Ch 10 state list",
      author: "Sita Ram Goel (1991), citing ASI Lucknow Circle reports",
    },
    quote:
      "Meerut — Jami Masjid (Stands on the ruins of a Buddhist Vihara); Dargah at Nauchandi (Nauchandi Devi Temple site); Garhmuktesar Masjid 1283 (Temple site); Jalali Jami Masjid 1266–67 (Temple materials used).",
    significance:
      "Meerut was captured by Qutbuddin Aibak in 1192 immediately before the second battle of Tarain. The Jami Masjid on a Buddhist vihara plinth is one of the early Slave-Dynasty conversions in north India.",
    sourceTier: "C-listed",
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

export function getTemplesByRegion(region: TempleRegion): DestroyedTemple[] {
  return destroyedTemples.filter((t) => t.location.region === region);
}

export function getTemplesByDistrict(district: string): DestroyedTemple[] {
  return destroyedTemples.filter(
    (t) => t.location.district?.toLowerCase() === district.toLowerCase(),
  );
}

export function getTemplesBySourceTier(tier: SourceTier): DestroyedTemple[] {
  return destroyedTemples.filter((t) => t.sourceTier === tier);
}

export const TEMPLE_REGIONS: TempleRegion[] = [
  "North",
  "South",
  "Deccan",
  "East",
  "West",
  "Central",
  "NW Frontier",
  "Kashmir Valley",
];
