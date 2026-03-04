export interface Commentary {
  author: string;
  text: string;
}

export interface BgShloka {
  id: string; // e.g., "1.1"
  chapter: number;
  verse: number;
  sanskritDevanagari: string;
  transliteration: string;
  synonyms: string; // Word by word meanings (anvaya)
  translation: string;
  commentaries: Commentary[];
  practicalApplication: string;
}

import { chapter1Shlokas } from "./bgShlokasCh1";

// Partial seeding for development.
// Real data should be seeded from public domain datasets like BhagavadGita.io Open Data.
export const bgShlokas: BgShloka[] = [
  ...chapter1Shlokas,
  {
    id: "1.1",
    chapter: 1,
    verse: 1,
    sanskritDevanagari:
      "धृतराष्ट्र उवाच |\nधर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः |\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय || १ ||",
    transliteration:
      "dhṛtarāṣṭra uvāca\ndharma-kṣetre kuru-kṣetre samavetā yuyutsavaḥ\nmāmakāḥ pāṇḍavāś caiva kim akurvata sañjaya",
    synonyms:
      "dhṛtarāṣṭraḥ uvāca—King Dhritarashtra said; dharma-kṣetre—in the place of pilgrimage; kuru-kṣetre—in the place named Kurukshetra; samavetāḥ—assembled; yuyutsavaḥ—desiring to fight; māmakāḥ—my party (sons); pāṇḍavāḥ—the sons of Pandu; ca—and; eva—certainly; kim—what; akurvata—did they do; sañjaya—O Sanjaya.",
    translation:
      "Dhritarashtra said: O Sanjaya, what did my sons and the sons of Pandu do, when they gathered on the sacred field of Kurukshetra, eager for battle?",
    commentaries: [
      {
        author: "Swami Gambhirananda (Advaita Vedanta)",
        text: "The field of Kurukshetra is a sacred place of pilgrimage. Dhritarashtra is asking Sanjaya about the activities of his sons and the sons of Pandu, revealing his attachment and anxiety about the outcome, knowing that righteousness (dharma) is on the side of the Pandavas.",
      },
    ],
    practicalApplication:
      "Just as the battlefield is called 'Dharmakshetra' (the field of Dharma), our own body and mind are the fields where the internal battle between higher, divine tendencies (the Pandavas) and lower, ego-driven tendencies (the Kauravas) takes place daily.",
  },
  {
    id: "2.47",
    chapter: 2,
    verse: 47,
    sanskritDevanagari:
      "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन |\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि || ४७ ||",
    transliteration:
      "karmaṇy evādhikāras te mā phaleṣu kadācana\nmā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi",
    synonyms:
      "karmaṇi—in prescribed duties; eva—certainly; adhikāraḥ—right; te—of you; mā—never; phaleṣu—in the fruits; kadācana—at any time; mā—never; karma-phala—in the result of the work; hetuḥ—cause; bhūḥ—become; mā—never; te—of you; saṅgaḥ—attachment; astu—there should be; akarmaṇi—in not doing prescribed duties.",
    translation:
      "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.",
    commentaries: [
      {
        author: "Swami Gambhirananda (Advaita Vedanta)",
        text: "This is the essence of Karma Yoga. By letting go of the anxiety for the results and simply performing the action as an offering, the mind becomes purified. Action must be done, but the clinging to what the action brings must be relinquished.",
      },
      {
        author: "Ramanuja (Vishishtadvaita)",
        text: "To act as an instrument of the Divine, knowing that the ultimate cause of success or failure belongs to the Supreme, liberates the performer from the bondage of Karma.",
      },
    ],
    practicalApplication:
      "In modern life, this verse is an antidote to anxiety and burnout. Focus entirely on the process—studying, working, or creating—rather than obsessing over the outcome (grades, promotions, praise). When we detach from the result, the quality of our work actually improves, and we remain peaceful regardless of success or failure.",
  },
];

export function getBgShlokaById(id: string): BgShloka | undefined {
  return bgShlokas.find((s) => s.id === id);
}

export function getBgShlokasByChapter(chapter: number): BgShloka[] {
  return bgShlokas.filter((s) => s.chapter === chapter);
}
