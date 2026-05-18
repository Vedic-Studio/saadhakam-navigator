# Free Authority Playbook (Sadhaka P4)

**Date**: 2026-05-19
**Author**: P4 SEO health remediation
**Status**: Active playbook. User-executable in 30 to 60 minute weekly blocks.
**Scope**: Zero paid services. Free tools only. Twelve weeks of concrete actions.

---

## 1. The strategy in one paragraph

Domain Rating is a lagging indicator of organic referring domains, and five to ten high-quality referring domains will move rankings more than one hundred directory submissions ever will. The site is sitting at DR 0 not because the content is weak (the May 2026 audit scored opensadhaka.com at GEO Citability 72/100, beating Britannica and the Stanford Encyclopedia of Philosophy on the same queries) but because Sadhaka has no entity graph presence yet. The moat the site already owns is the classical Indian Knowledge Base at `backend/app/knowledge/kb/`, which decomposes sensational claims like "India invented zero" or "Sushruta did plastic surgery" into scoped sub-claims with verdict tags and primary-source citations. That is precisely the structured, citable artefact Wikipedia editors, AI search engines, and academic-adjacent newsletters reward. This playbook leverages that asset across six free channels (Wikipedia, SEP/IEP further-reading lists, niche subreddits, X under @ankit_pfc, HackerNews, niche Substacks), with a weekly cadence that fits a day-job schedule and a measurement plan that runs entirely on Google Search Console, GA4, and the Ahrefs free tier. No paid services, no link-buying, no PBN networks.

---

## 2. The KB to Wikipedia matching list

There are currently **15 seeded claim files** at `backend/app/knowledge/kb/claims/` (the CLAUDE.md figure of 42 is stale; INDEX.md confirms 15). Each claim is structured as: popular framing → decomposed sub-claims → verdict tags → evidence for/against → scope boundaries → primary sources. That structure maps directly onto what Wikipedia's verifiability policy rewards.

The table below lists every seeded claim against a plausible Wikipedia target. For each row, the rationale identifies the specific section or statement that could host the citation. Difficulty tags reflect editor behaviour on each article: `easy` means the topic is low-controversy and the target section is currently uncited or weakly cited, `medium` means cited but with a source the KB clearly upgrades, `hard` means the article is on a watchlist and an external citation will face pushback.

| KB claim slug | Wikipedia target | Rationale | Difficulty |
|---|---|---|---|
| `indian-zero-claim` | [History of zero](https://en.wikipedia.org/wiki/0#History) | The "India" subsection currently conflates place value, placeholder, and zero-as-number. The KB's decomposition is exactly the disambiguation Wikipedia editors ask for in talk-page threads. | medium |
| `indian-zero-claim` | [Brahmagupta](https://en.wikipedia.org/wiki/Brahmagupta) | The Brahmasphutasiddhanta arithmetic-of-zero section is uncited beyond the primary text. KB cites Plofker (2009), Kaplan, Bodleian press release. | easy |
| `surya-siddhanta-accuracy-claim` | [Surya Siddhanta](https://en.wikipedia.org/wiki/Surya_Siddhanta) | The "Accuracy" subsection currently repeats viral "within a second" framing without scoping by parameter. KB provides Whitney's parameter-by-parameter analysis. | medium |
| `panini-formal-grammar-claim` | [Pāṇini](https://en.wikipedia.org/wiki/P%C4%81%E1%B9%87ini) | The "Modern relevance" and "Influence on linguistics" sections need George Cardona and Penn-Kiparsky (2012) citations the KB already aggregates. | medium |
| `pingala-binary-numbers-claim` | [Pingala](https://en.wikipedia.org/wiki/Pingala) | The "Binary numbers" section currently asserts equivalence to modern binary without the Halayudha vs Pingala disambiguation. KB has the van Nooten (1993) citation. | medium |
| `fibonacci-virahanka-attribution` | [Fibonacci number](https://en.wikipedia.org/wiki/Fibonacci_sequence#History) | The history section mentions Virahanka briefly but does not cite Parmanand Singh's 1985 Historia Mathematica paper. KB provides the attribution chain. | easy |
| `fibonacci-virahanka-attribution` | [Virahanka](https://en.wikipedia.org/wiki/Virah%C3%A1nka) | Article is short and undercited. KB's chain (Pingala → Virahanka → Gopala → Hemachandra) is publishable verbatim with sources. | easy |
| `sushruta-surgery-scope-claim` | [Sushruta Samhita](https://en.wikipedia.org/wiki/Sushruta_Samhita) | The dating section is contested in talk-page archives. KB provides Wujastyk's "first millennium CE final form" position with citation. | hard |
| `sushruta-surgery-scope-claim` | [Rhinoplasty](https://en.wikipedia.org/wiki/Rhinoplasty#History) | The 1794 Carpue / Gentleman's Magazine transmission line is the right citation hook. The KB has it primary-sourced. | easy |
| `vaisheshika-atomism-claim` | [Vaisheshika](https://en.wikipedia.org/wiki/Vaisheshika) | "Comparison with Greek atomism" subsection currently overclaims priority. KB's "roughly contemporaneous, possibly earlier, possibly later" framing is the defensible version. | medium |
| `vaisheshika-atomism-claim` | [Kanada (philosopher)](https://en.wikipedia.org/wiki/Kanada_(philosopher)) | Dating section is unsourced beyond traditional figures. KB has Halbfass (1992) and Potter Encyclopedia. | medium |
| `nyaya-first-order-logic-claim` | [Navya-Nyāya](https://en.wikipedia.org/wiki/Navya-Ny%C4%81ya) | The article lacks a "Comparison with modern logic" section that scholarly literature treats extensively. KB has Matilal, Ganeri, Ingalls aggregated. | easy |
| `nyaya-first-order-logic-claim` | [Indian logic](https://en.wikipedia.org/wiki/Indian_logic) | Section on Navya-Nyaya formal vocabulary is thin. KB provides specific examples (avachchhedaka, vyapti, the Dignaga-Dharmakirti challenge). | medium |
| `arthashastra-intelligence-state-claim` | [Arthashastra](https://en.wikipedia.org/wiki/Arthashastra) | "Espionage and intelligence" section currently treats Kautilya as descriptive history rather than normative treatise. KB has the McClish (2019) compositional-layering argument. | hard |
| `arthashastra-intelligence-state-claim` | [Chanakya](https://en.wikipedia.org/wiki/Chanakya) | Authorship section is heavily edited and contested. The composite-tradition framing in the KB is defensible with Patrick Olivelle 2013. | hard |
| `aryan-invasion-migration-claim` | [Indo-Aryan migrations](https://en.wikipedia.org/wiki/Indo-Aryan_migrations) | This is a heavily watchlisted article. The KB's IAMT vs AIT vs OIT distinction is already partly there but the Narasimhan 2019 Science citation could use the KB's specific framing on admixture vs replacement. | hard |
| `ancient-heliocentrism-claim` | [Aryabhata](https://en.wikipedia.org/wiki/Aryabhata) | The "Heliocentrism" subsection conflates earth-rotation with heliocentrism. KB has the Gola Pada 9 primary citation and Brahmagupta's rejection. | medium |
| `ancient-heliocentrism-claim` | [Nilakantha Somayaji](https://en.wikipedia.org/wiki/Nilakantha_Somayaji) | The "Planetary model" section's partial-heliocentric claim for inner planets needs the Tantrasangraha 1501 primary citation the KB provides. | easy |
| `gamblers-lament-addiction-claim` | [Rigveda](https://en.wikipedia.org/wiki/Rigveda) (Mandala 10 subsection) | The Aksha Sukta (10.34) is mentioned in passing. KB's Jamison-Brereton (2014) translation and the addiction-phenomenology framing is publishable in the "Notable hymns" section. | easy |
| `rigveda-women-rishis-claim` | [Rishika](https://en.wikipedia.org/wiki/Rishika_(Vedic)) | Article exists but is short and undercited. KB has Patton (ed.) Jewels of Authority and named rishikas with hymn references. | easy |
| `rigveda-women-rishis-claim` | [Gargi Vachaknavi](https://en.wikipedia.org/wiki/Gargi_Vachaknavi) | Brihadaranyaka 3.6 and 3.8 citations are primary-text only; KB adds Jamison-Brereton modern translation. | easy |
| `sati-scriptural-basis-claim` | [Sati (practice)](https://en.wikipedia.org/wiki/Sati_(practice)) | "Vedic period" subsection currently uses outdated translations. The Jamison-Brereton (2014) treatment of Rigveda 10.18.8 in the KB is the current scholarly standard. | hard |
| `ayurgenomics-prakriti-claim` | [Ayurveda](https://en.wikipedia.org/wiki/Ayurveda) | "Modern research" section needs the Govindaraj et al. (2015) Scientific Reports citation, scoped carefully. The article is heavily watchlisted; submit with cautious language. | hard |
| `ayurgenomics-prakriti-claim` | [Prakriti (Ayurveda)](https://en.wikipedia.org/wiki/Prakriti) | Currently no "Modern genetic studies" section exists. KB has the Govindaraj plus Chatterjee-Joshi review aggregated. | medium |
| `panini-formal-grammar-claim` | [Backus-Naur form](https://en.wikipedia.org/wiki/Backus%E2%80%93Naur_form) | The "Influence" section sometimes lists Panini as a precursor; KB's "intellectual influence not historical identity" framing is the defensible version. | easy |

Twenty-five rows, all with concrete targets. No claim is currently in the "no clear target" bucket. The hard rows (Sati, Indo-Aryan migrations, Arthashastra, Sushruta dating, Ayurveda) are the politically sensitive ones where any external citation will be reverted unless the talk-page case is made first.

**How to actually do this**: Wikipedia is not link-spamming. The workflow is: register an account with a real name (not "Sadhaka"); make ten good-faith edits unrelated to opensadhaka.com first to establish edit history; only after the account has ~50 edits and ~30 days of age should the user start adding KB citations. Citations should be in the format Wikipedia accepts (academic citation with primary text reference plus the modern scholar; opensadhaka.com is not the source, it is the further-reading link, and even that goes in External Links not the body). The KB claim files themselves should appear in "External links" or "Further reading" sections, not as body citations.

---

## 3. SEP / IEP outreach plan

The Stanford Encyclopedia of Philosophy and the Internet Encyclopedia of Philosophy do not accept external citations in the body. They sometimes accept "Other Internet Resources" or "Further Reading" links in supplementary sections, where editors maintain those lists. The pitch is always: "Your entry is encyclopedic and authoritative on the philosophical core; our article is pedagogical and goes deeper on X, which is by design complementary, not redundant."

Five concrete targets:

1. **SEP entry on Advaita Vedanta** ([plato.stanford.edu/entries/advaita-vedanta](https://plato.stanford.edu/entries/advaita-vedanta/), editor **Andrew Nicholson**). Pitch the Sadhaka articles `/what-is-maya` and `/advaita-vedanta-explained` for the "Other Internet Resources" section. The pedagogical angle: SEP gives the philosophical analysis; Sadhaka gives the lived-tradition framing (how Advaita addresses fear of death, midlife disorientation, hustle culture). SEP editors prefer external resources that broaden the philosophy-into-practice surface they cannot cover.

2. **SEP entries on Indian Philosophy (Buddhism, Yoga, etc.)** umbrella entries. Pitch `/yoga-sutras-complete-guide` and `/inquiry-vs-devotion-path`. Editors here historically include **Jonardon Ganeri** (also listed as a KB-cited scholar at `backend/app/knowledge/kb/people/ganeri.md`). Ganeri's own work explicitly defends the "pedagogical complement to scholarship" framing, so the pitch lands warmer with him than with a strict analytic-philosophy editor.

3. **IEP entry on Karma and Rebirth** ([iep.utm.edu/karma](https://iep.utm.edu/karma/)). The IEP is less guarded than SEP about further-reading sections. Pitch `/how-karma-dharma-work` for the Suggested Reading list. The article already cites primary texts (Gita, Brahma Sutras) which is the IEP standard for inclusion.

4. **IEP entry on Sankara / Adi Shankaracharya** ([iep.utm.edu/sankara](https://iep.utm.edu/sankara/)). Pitch `/adi-shankaracharya-life-teachings` for Internet Resources. The angle: IEP's entry is biographical-philosophical; the Sadhaka article connects Shankara's commentary to contemporary practice questions.

5. **IEP entry on Hindu Philosophy** ([iep.utm.edu/hindu-philosophy](https://iep.utm.edu/hindu-philosophy/)). Pitch `/what-is-sanatan-dharma` (note: pitch under the title "Sanatan Dharma overview" not "Hindu philosophy overview" because the latter creates a redundancy framing). The angle: IEP covers the philosophical structure of the six darshanas; Sadhaka contextualizes the term "Sanatan Dharma" as the tradition's self-description and clarifies the modern misuse of "Hindu" as a category.

**Contact pathway**: SEP entries list the editor's name and Stanford department. The email is almost always `<firstname>.<lastname>@<institution>.edu` or available on the editor's personal academic page. IEP entries list contributing authors; the general editor contact is at iep.utm.edu/about/. Lead time on responses: four to eight weeks. The user should not expect immediate acceptance. Realistic outcome: out of five pitches, one or two get added to further-reading lists over the course of a year. Each one is a high-DR backlink from a domain authority that will move rankings noticeably.

**What the pitch email looks like**: three paragraphs. Paragraph one identifies the editor by name and references one specific point in their entry. Paragraph two introduces opensadhaka.com and links to the specific article being pitched, with one sentence on why it complements the SEP/IEP coverage rather than duplicating it. Paragraph three offers to make a small contribution to a future revision (citation suggestion, translation source check) as a way to start a working relationship before asking for the link. Subject line: "Suggested further-reading addition for your [Entry Name] entry."

---

## 4. Niche subreddit + community plan

Reddit will eat a post that looks like link-spam. The rule the user has previously articulated is correct: every post must be valuable on its own, the article link must be supplementary to a discussion the user is genuinely contributing to, and the user must answer comments for the first 24 hours.

### r/hinduism (650k members, moderately strict)

The subreddit's rule against self-promotion is enforced via account-age and karma thresholds. The user's account needs at least 30 days and ~50 comment karma before any post linking to opensadhaka.com will survive moderation.

1. **Title**: "What does 'Sanatan Dharma' actually mean? The textual history of the term"
   **Body**: "I have been digging into when the phrase 'Sanatan Dharma' actually enters Sanskrit texts as a self-description vs. when 'Hindu' enters European discourse as an external label. The textual answer is more interesting than I expected, especially in the Manusmriti and the Mahabharata. Wrote up the full timeline if anyone wants the long version: [/what-is-sanatan-dharma](https://opensadhaka.com/what-is-sanatan-dharma)."
   **Article**: `/what-is-sanatan-dharma`

2. **Title**: "Rigveda 10.18 and the sati debate: what does the verse actually say?"
   **Body**: "There is a long-running argument about whether the Vedas prescribe sati. The relevant verse is Rigveda 10.18.8. The Jamison-Brereton 2014 Oxford translation reads: 'Rise up, woman, to the world of the living; you are lying beside this man whose breath is gone.' That is the opposite of a sati prescription. The medieval 'sati reading' turns on a single-syllable substitution (agneh for agre). Full breakdown with primary text here: [linked Sadhaka piece on sati when written]."
   **Article**: pending write, flag to author as Sprint 2 priority since the KB claim is fully seeded. Until written, link to `/what-is-sanatan-dharma` or skip.

3. **Title**: "Why is the Bhagavad Gita arranged the way it is? The 18-chapter structure"
   **Body**: "Was working through the Gita chapter-by-chapter and realized the chapter division is not arbitrary. Each chapter targets a distinct epistemological move (sankhya, karma, jnana, bhakti, dhyana). Mapped it out: [bhagavad-gita-complete-guide](https://opensadhaka.com/bhagavad-gita-complete-guide). What is the most underrated chapter for you?"
   **Article**: `/bhagavad-gita-complete-guide`

4. **Title**: "Is Maya a 'illusion'? Why the standard translation misleads"
   **Body**: "Most English Gita and Vedanta books translate Maya as 'illusion,' which Western readers hear as 'unreal' or 'mirage.' Shankara's actual position is more like 'creative power of Brahman that makes plurality appear from non-dual reality.' The mistranslation has caused decades of confusion. Wrote it up: [/what-is-maya](https://opensadhaka.com/what-is-maya)."
   **Article**: `/what-is-maya`

5. **Title**: "Honest question: do you actually need a guru to chant mantras?"
   **Body**: "This question comes up constantly. The textual position is more permissive than the modern guru-institutional position. Naam-japa is consistently taught as accessible without formal initiation across multiple traditions; specific tantric mantras have different rules. Wrote up the full nuance: [/can-i-chant-a-mantra-without-initiation](https://opensadhaka.com/can-i-chant-a-mantra-without-initiation)."
   **Article**: `/can-i-chant-a-mantra-without-initiation`

### r/advaita (smaller, more rigorous)

This subreddit's audience has read primary sources. Surface-level posts will be ignored. The user needs to engage with specific texts.

1. **Title**: "Atman vs Brahman: the identity that defines Advaita, line by line"
   **Body**: "Going through the Mahavakyas. 'Tat tvam asi,' 'Aham brahmasmi,' 'Prajnanam brahma,' 'Ayam atma brahma.' Each one targets a specific aspect of the identity. Wrote a side-by-side: [/compare/atman-vs-brahman](https://opensadhaka.com/compare/atman-vs-brahman)."
   **Article**: `/compare/atman-vs-brahman`

2. **Title**: "Ramana Maharshi vs Nisargadatta Maharaj: same destination, different method"
   **Body**: "Both pointed at non-dual realization. Ramana's method is self-inquiry (who am I?). Nisargadatta's is identification-with-being (I am). They are not the same instruction. Why the methods matter for different students: [comparison piece](https://opensadhaka.com/compare/ramana-maharshi-vs-nisargadatta-maharaj)."
   **Article**: `/compare/ramana-maharshi-vs-nisargadatta-maharaj`

3. **Title**: "Ashtavakra Gita vs Bhagavad Gita: which one first?"
   **Body**: "Got asked this offline and ended up writing the full breakdown. The Ashtavakra is uncompromisingly non-dual from verse one; the Gita layers karma-yoga, bhakti, dhyana, jnana across 18 chapters. Different on-ramps for different readers. [Side-by-side](https://opensadhaka.com/compare/ashtavakra-gita-vs-bhagavad-gita)."
   **Article**: `/compare/ashtavakra-gita-vs-bhagavad-gita`

### r/yoga (1.5M members; mods aggressive on "spiritual content" framing)

This subreddit skews modern-postural-yoga. Anything too philosophical gets removed. Frame posts as "what the source texts actually say" not as devotional content.

1. **Title**: "Patanjali's Yoga Sutras: what 'yoga' meant before yoga studios"
   **Body**: "Classical Patanjala yoga is not asana. The Yoga Sutras define yoga as citta-vritti-nirodha, the stilling of the mind's modifications. Asana gets one sutra (2.46). The other 194 are about ethics, breath, withdrawal, concentration, meditation, absorption. Useful corrective for the studio-yoga conflation: [/yoga-sutras-complete-guide](https://opensadhaka.com/yoga-sutras-complete-guide)."
   **Article**: `/yoga-sutras-complete-guide`

2. **Title**: "Difference between yoga and Vedanta: overlapping but not the same"
   **Body**: "Got into this in a conversation with my teacher. Patanjali's yoga (citta-vritti-nirodha leading to kaivalya) and Shankara's Advaita (jnana leading to moksha) share methods (meditation, ethics, study) but differ on the destination metaphysics. Mapped it out: [/difference-between-yoga-and-vedanta](https://opensadhaka.com/difference-between-yoga-and-vedanta)."
   **Article**: `/difference-between-yoga-and-vedanta`

### r/meditation (1.2M members; mostly secular)

The audience is secular meditators, often skeptical of religion-coded content. Frame posts as practical and source-cited.

1. **Title**: "Meditation for anxiety: which technique by which mechanism"
   **Body**: "Was trying to figure out why different meditation styles work for different problems. Concentration practices (japa, breath-counting) work differently from open-monitoring (vipassana, choiceless awareness), and both work differently from self-inquiry (Advaita's Who am I?). For anxiety specifically the literature points to concentration. Wrote it up: [/meditation-for-anxiety-overthinking](https://opensadhaka.com/meditation-for-anxiety-overthinking)."
   **Article**: `/meditation-for-anxiety-overthinking`

2. **Title**: "Meditation for burnout: when your nervous system needs more than 10 minutes"
   **Body**: "The 'start with 10 minutes a day' advice fails for actual burnout because burnout is a regulation problem, not an attention problem. What worked for me was longer japa sessions plus structural sleep recovery. Wrote the protocol: [/meditation-for-burnout](https://opensadhaka.com/meditation-for-burnout)."
   **Article**: `/meditation-for-burnout`

### r/AskHistorians (selectively, when an article cites primary sources on history)

This subreddit is moderated by professional historians. Source-thin posts are removed. The user can only post here when the question can be answered from primary sources with cited modern scholarship. The KB claim files are specifically designed for this audience.

1. **Title (top-level question, asked first to seed answers)**: "Did Aryabhata 'discover heliocentrism' a thousand years before Copernicus?"
   **Body**: User asks the question, then in their own answer cites Aryabhatiya Gola Pada 9 (earth-rotation, not heliocentrism), Brahmagupta's rejection in Brahmasphutasiddhanta Ch 11, Plofker (2009), and the Nilakantha Tantrasangraha (1501) partial-heliocentric model for inner planets. Link to the article in the answer's "Further reading" footnote.
   **Article**: pending write, flag for Sprint 2.

2. **Title**: "What does the Sushruta Samhita actually describe, and how reliably can we date it?"
   **Body**: KB-style answer covering nasal reconstruction, cataract couching, instrument catalog, plus the Wujastyk dating argument (received text final form first-millennium CE, not 6th c. BCE). 1794 Carpue transmission line as the historical bridge.
   **Article**: pending write, flag for Sprint 3.

### r/philosophy and r/AcademicPhilosophy (niche philosophy/religion-studies)

r/philosophy is moderated lightly but the audience is hostile to anything that reads as "Hindu nationalism" or "spiritual marketing." r/AcademicPhilosophy is stricter and skews analytic; expects citations.

1. **Title**: "Nyaya logic and modern first-order logic: peer traditions, not equivalents"
   **Body**: "The internet has been recycling 'Gangesha anticipated Frege' takes for years. The defensible version is much more interesting: Navya-Nyaya developed a sophisticated technical vocabulary (avachchhedaka, vyapti, vritti) for properties, relations, and quantification that has real structural parallels with modern logic but is not equivalent to FOL. Matilal's 1968 Navya-Nyaya Doctrine of Negation is the standard. Full breakdown with sources: [pending Sadhaka article; Sprint 3 priority]."
   **Article**: pending write, flag for Sprint 3.

2. **Title**: "Vaisheshika atomism: philosophical, not empirical, and that is what makes it interesting"
   **Body**: KB-derived: paramanu is metaphysical atomism, not modern atomic theory. The system handles composition problems with care. Halbfass (1992) is the modern reference. Article link supplementary.
   **Article**: pending write, flag for Sprint 3.

**Subreddit posting cadence rule**: no more than one Sadhaka-linked post per subreddit per month. Anything more reads as link-spam and triggers mod action. The user should rotate across subreddits, not stack.

---

## 5. X / Twitter cadence under @ankit_pfc

The user has a calibrated `write-x` skill at `~/.claude/skills/write-x/`. This section does not duplicate that work; it identifies which Sadhaka articles have the strongest X potential and supplies the hook for each.

X potential is measured by three properties: counter-intuitive thesis (the article contradicts a common assumption), sharp single-claim hook (one tweet conveys the whole insight), and philosophical hot-take quality (the takeaway is provocative without being clickbait).

| Rank | Article URL | The hook |
|---|---|---|
| 1 | `/what-is-maya` | "Maya does not mean 'illusion.' Translating it as illusion has caused decades of Western misreading of Advaita Vedanta. What it actually means, and why the difference matters." |
| 2 | `/fear-of-death-advaita-vedanta` | "Advaita Vedanta does not say 'do not fear death.' It says the thing that fears death is not what you are. A subtle but completely different move." |
| 3 | `/spiritual-antidote-to-hustle-culture` | "Hustle culture treats time as scarce. Sanatan philosophy treats time as cyclical. Once you internalize cyclic time, hustle stops being an aspiration. It just stops making sense." |
| 4 | `/midlife-crisis-spiritual-meaning` | "The midlife crisis is not a marketing problem. It is the karma-yoga stage of life forcibly ending and the jnana stage not yet beginning. The tradition mapped this 2,500 years ago and called it vanaprastha." |
| 5 | `/can-i-chant-a-mantra-without-initiation` | "The internet keeps repeating 'never chant a mantra without a guru.' The texts are more permissive. Here is what actually requires initiation and what does not." |
| 6 | `/how-karma-dharma-work` | "Karma is not 'what goes around comes around.' That is karma-as-folk-physics. The actual technical concept is closer to 'every action leaves a samskara, and samskaras determine future tendencies.'" |
| 7 | `/inquiry-vs-devotion-path` | "Jnana yoga (inquiry) and bhakti yoga (devotion) are not 'two valid paths.' They are two answers to the question 'who is asking?' The methods diverge from there. Most spiritual confusion comes from picking the wrong starting question." |
| 8 | `/bhagavad-gita-vs-bible` | "The Gita is structured as a dialogue at the start of a war. The Bible is structured as covenant history. The form does the philosophical work in both, and Western Gita readings miss the form because they read it as scripture instead of as a dialogue." |
| 9 | `/compare/ramana-maharshi-vs-nisargadatta-maharaj` | "Ramana asked 'who am I?' Nisargadatta said 'I am.' Same pointing, different starting position. Picking which one to study depends on whether you are stuck on identification or on existence." |
| 10 | `/non-duality-vs-dualism` | "Western philosophy has a long history of dualism (mind/body, subject/object). Sanatan philosophy mostly does not, with one major exception (Samkhya). The exception clarifies the rule." |

For each, the @ankit_pfc voice rule applies: daily-observation framing, sharp single claim, willing to take a stand, no AI-slop transitions, no em dashes (use periods or commas). The user runs `/write-x` with the article URL and hook as inputs; the skill returns the post draft in voice.

---

## 6. HackerNews / Show HN

What is worth a Show HN post is the Knowledge Base itself, once it crosses a credibility threshold. Currently it is at 15 seeded claim files (`backend/app/knowledge/kb/claims/`); the INDEX backlog lists at least 9 more known-to-exist claims pending. The Show HN threshold should be ~50 claims, which is roughly when the KB starts to read as "comprehensive enough to be a reference" rather than "a starter set." That suggests Show HN posting in approximately Q3 of this playbook cycle, not Q1.

### Draft Show HN

**Title**: `Show HN: A primary-source-cited knowledge base for classical Indian claims`

**Submission text** (three paragraphs):

> For two years I have been writing an English-language reference for Sanatan philosophy at opensadhaka.com and ran into a problem: every popular claim about classical Indian science and philosophy ("Sushruta did plastic surgery 2,600 years ago", "India invented zero", "the Surya Siddhanta is within 1% of NASA", "Panini wrote an algorithm 2,500 years ago") arrives as a single sensational headline that is partly true, partly overreach, and impossible to cite responsibly until you decompose it. So I built a knowledge base of claim cards.
>
> Each claim is structured as: popular framing → decomposed sub-claims with individual verdict tags (supported, partially supported, not supported, contested) → primary text citation → modern scholarship → scope boundaries → reusable examples for writers. The 50 claims currently seeded cover Indian mathematics (zero, Fibonacci-Virahanka, Aryabhata heliocentrism), grammar (Panini and formal grammar), astronomy (Surya Siddhanta accuracy, Aryabhata earth rotation), medicine (Sushruta scope, ayurgenomics), philosophy (Vaisheshika atomism, Nyaya logic), and the politically loaded topics (Aryan invasion vs migration, Sati and the Vedas).
>
> The KB is open at [backend/app/knowledge/kb on GitHub] and is the citation layer behind everything we publish. I would love feedback from anyone working in history of mathematics, history of science, Indology, or anyone who has built a structured claim graph before. Critical comments on specific claim files appreciated; the verdict tags are the part I most want stress-tested.

**Realistic expectation**: Show HN posts in the history-of-science / philosophy / primary-source niche typically get 30 to 80 upvotes if the framing is right, occasionally cresting into front-page traffic. The traffic itself is short-term; the value is the comment thread and the one to three follow-up blog posts the submission catalyzes. A post with 50+ upvotes typically earns one to three high-DR backlinks (HN front-page archives, hnrss.org indexing, plus blogs that summarize HN finds). It is not viral and should not be pitched as a launch.

**Pre-launch checklist before posting**:
- KB has at least 50 seeded claim files (currently 15, need 35 more from the backlog list at `kb/INDEX.md`)
- Each claim file has been spot-checked for citation accuracy (someone reading the KB should not catch a sloppy citation in the first hour)
- A "How to cite a KB claim" subsection in `kb/README.md` makes it easy for downstream users
- The opensadhaka.com /llms-full.txt endpoint is healthy and includes the KB claim corpus (this was a P0 fix from the May 2026 audit)
- The user's @ankit_pfc profile is current and the X handle resolves to a real person, since HN commenters will dig

---

## 7. Substack / niche newsletter pitching

The user should aim for **guest essays in niche newsletters that already write about adjacent topics**, not for mass-distribution Substacks. The pitch is always: "I will write you a 1,500 to 2,000 word original essay specific to your audience; in return I get an author byline with one link to opensadhaka.com." That is the structure that actually earns backlinks.

Listed below are substacks and newsletters where the audience overlap is high. Some are named, some are described categorically because the user should verify currency before pitching:

1. **The Mountain Path** ([mountainpath.substack.com](https://mountainpath.substack.com), verify; if the URL is not currently active, find a current Ramana-tradition Substack). Audience: Ramana Maharshi practitioners. Guest-post idea: "Self-inquiry as the missing step between meditation and Advaita" (links to `/ramana-maharshi-who-am-i` and `/inquiry-vs-devotion-path`).

2. **A Substack in the secular Buddhism / Daniel Ingram / Pragmatic Dharma space** (find one, Tasshin Fogleman's newsletter, the Buddhist Geeks revival, or similar). Audience: practical meditators, often skeptical of religion-coded framing. Guest-post idea: "What Patanjala yoga gets that secular mindfulness misses" (links to `/yoga-sutras-complete-guide`).

3. **Embodied Philosophy** ([embodiedphilosophy.com](https://embodiedphilosophy.com), they run essays and have a newsletter). Audience: yoga teachers and serious practitioners with a philosophy interest. Guest-post idea: "Why Sanatan philosophy is misclassified as 'religion'" (links to `/what-is-sanatan-dharma`).

4. **The Pluralist** (find a niche philosophy Substack, Robert Wright's Nonzero is too mass-market; look for John-Michael Kuczynski, Justin E. H. Smith's Hinternet, or smaller). Audience: philosophy generalists. Guest-post idea: "Nyaya is a sophisticated peer tradition of modern logic, not a precursor to first-order logic" (uses the KB claim card).

5. **A Substack in the history-of-science space** (find one, Anton Howes's Age of Invention is too narrow on industrial revolution; look for Resobscura, History of Science Society newsletter, or a niche Hist Math substack). Audience: people who care about citation discipline. Guest-post idea: "What Aryabhata actually argued: earth rotation is not heliocentrism, and that is the more interesting claim" (uses the KB claim card directly).

6. **A South Asia / Indology Substack** (find one, Wendy Doniger's contemporaries, Devdutt Pattanaik's blog if he opens to guest contributions, or smaller academic-adjacent ones). Audience: serious readers in Indian studies. Guest-post idea: "The Aksha Sukta (Rigveda 10.34) as the earliest first-person portrait of addiction in world literature."

7. **A modern-spirituality / non-dualism Substack** (find one, Rupert Spira does not currently take guest essays as far as I know; verify Francis Bennett, Joan Tollifson, or smaller non-dual writers). Audience: non-dual seekers who care about textual grounding. Guest-post idea: "Atman is not 'soul.' Why the translation problem matters for non-dual practice" (links to `/compare/atman-vs-brahman`).

8. **One niche Sanskrit / linguistics Substack** (find one, verify if there is currently a Sanskrit scholar on Substack; Sanskrit Studies on Twitter is more visible than the Substacks I am aware of). Audience: people learning Sanskrit or interested in Indo-European linguistics. Guest-post idea: "The Sanskrit etymology of moksha across four schools" (links to `/learn/sanskrit/moksha` and the moksha comparison cluster).

**The pitch email pattern**: paragraph one references one specific recent essay the user actually read. Paragraph two pitches a guest essay with a working title, a one-sentence thesis, and a target word count. Paragraph three offers the author byline link as opensadhaka.com and confirms the essay would be exclusive to that newsletter (no cross-posting). Lead time: two to six weeks for a response.

**Realistic outcome**: out of eight pitches, two to three lead to scheduled essays, and one to two of those publish. That is two high-quality backlinks from niche-authority domains. Over a year of consistent pitching, this becomes the bulk of the referring-domain growth.

---

## 8. Weekly cadence (the actual execution plan)

This table is the user's working document. Each week has three actions, each takes 30 to 60 minutes. The week numbers are calendar weeks starting Monday 2026-05-25 (the Monday after this playbook is committed).

| Week | Monday action | Wednesday action | Friday action |
|---|---|---|---|
| W1 | Register Wikipedia account with real name. Make 5 small good-faith edits unrelated to opensadhaka.com (fix typos, add citations to existing articles on Indian philosophy from KB scholar list). Goal: 5 edits this week, no Sadhaka links. | Open Reddit account if not already on (verify account age, karma; if new account, skip Sadhaka linking until W4). Comment thoughtfully on 5 posts in r/hinduism without any link. | Draft SEP Advaita pitch email to Andrew Nicholson. Do not send. Save in drafts. |
| W2 | Wikipedia: 5 more unrelated edits. Focus on uncited Indian philosophy stubs from the KB people list (Plofker, Cardona, Olivelle, etc.). | Reddit: r/meditation post on `/meditation-for-anxiety-overthinking` using draft from §4 above. Answer all comments within 2 hours of posting and again at 24 hours. | X thread of 8 tweets on `/what-is-maya` thesis (Maya is not 'illusion'). Use /write-x skill for voice calibration. |
| W3 | Wikipedia: First Sadhaka-linked edit. Target `Virahanka` article. Add Parmanand Singh (1985) citation and link KB `fibonacci-virahanka-attribution` claim file in External Links. Do not edit anything else; let this single edit sit and observe whether it survives. | Reddit: r/yoga post on `/yoga-sutras-complete-guide` using draft from §4. Same comment-response protocol. | Send SEP Advaita pitch to Andrew Nicholson (the email drafted in W1). |
| W4 | Wikipedia: If W3 edit survived, do the same on `Pingala` (add van Nooten 1993 citation; link KB `pingala-binary-numbers-claim`). If reverted, post on the article's talk page asking what citation format the editor prefers. Do not re-edit. | Reddit: r/hinduism post on `/what-is-sanatan-dharma` using draft from §4. | X thread on `/fear-of-death-advaita-vedanta`. |
| W5 | Substack: identify and pitch Embodied Philosophy with the "Sanatan philosophy is misclassified as religion" essay idea. | Wikipedia: target `Aryabhata` page. Add Gola Pada 9 citation for earth-rotation claim; do not touch the heliocentrism subsection yet. | Reddit: r/advaita post on `/compare/atman-vs-brahman`. |
| W6 | IEP Karma pitch to general editor (iep.utm.edu/about/). | Wikipedia: target `Brahmagupta` page. Add Plofker (2009) citation for arithmetic-of-zero section. | X thread on `/spiritual-antidote-to-hustle-culture`. |
| W7 | Substack: pitch one history-of-science newsletter (find current one in space) with "What Aryabhata actually argued" essay. | Wikipedia: target `Indian logic` article (less watchlisted than Navya-Nyaya). Add Matilal (1998) and Ganeri (2001) citations to the Navya-Nyaya formal vocabulary section. | Reddit: r/meditation follow-up post on `/meditation-for-burnout`. |
| W8 | Wikipedia: target `Rishika (Vedic)` article. Add Patton (ed.) and Jamison-Brereton citations from KB `rigveda-women-rishis-claim`. This is a low-traffic article so editor pushback should be minimal. | IEP Sankara pitch. | X thread on `/midlife-crisis-spiritual-meaning`. |
| W9 | Substack: pitch a Substack in non-dual / modern spirituality space (verify currency first) with "Atman is not 'soul'" essay. | Reddit: r/AskHistorians question-and-answer on "What does the Sushruta Samhita actually describe?" pattern from §4. This requires a written Sushruta article first; if not yet written, defer to W11. | Wikipedia: target `Rhinoplasty` article's history section. Add 1794 Carpue / Gentleman's Magazine citation; this is uncontroversial. |
| W10 | Audit response rate so far. How many of the W3-W9 outreach actions got replies, how many got placed links, how many got Wikipedia reverts. Update the playbook's running counter in §9. | Substack: write the first scheduled guest essay (if any were accepted). Target word count 1,500 to 2,000. | X thread on `/inquiry-vs-devotion-path`. |
| W11 | Reddit: r/AskHistorians question on Aryabhata heliocentrism (using the §4 draft). | Wikipedia: target `Navya-Nyāya` article. Add the Matilal Negation (1968) and Ingalls (1951) citations. This is more visible than `Indian logic` and may attract more attention. | IEP Hindu Philosophy pitch (using "Sanatan Dharma overview" framing). |
| W12 | Audit. Pull GSC referring-domains count, compare to W1 baseline. Count placed Wikipedia citations, accepted Substack essays, SEP/IEP responses. Decide which channels to double down on for Q2. | KB seeding: pick one claim from the backlog at `kb/INDEX.md` ("Sushruta plastic surgery" narrow claim, or "Kerala school invented calculus" decomposition) and seed it. Each seeded claim is itself a backlink magnet once the KB hits 50 files for the Show HN post. | X thread on `/how-karma-dharma-work` to close the quarter. |

The pattern is: Wikipedia (asynchronous, slow, high-value), Reddit (synchronous, requires comment-response window, medium-value), Substack/SEP/IEP pitches (asynchronous, slow, very high-value), X (synchronous, broadcast, low-DR-value but high-funnel-value for the @ankit_pfc audience).

---

## 9. Free-only measurement plan

Track these weekly. Set quarterly targets. Do not buy any tool.

### What to track (weekly, takes 15 minutes)

**Google Search Console** (free, real Google data):
- Indexed pages (Coverage report → Valid)
- Total impressions (28-day rolling)
- Total clicks (28-day rolling)
- Average position (28-day rolling)
- Top 10 queries that gained position vs. last 28 days
- Top 10 queries that lost position vs. last 28 days
- Country breakdown for clicks (India vs US specifically, see the 2026-05-07 GSC strategy doc for the diagnosed CTR gap)

**GA4** (free, organic-traffic shape):
- Organic sessions (28-day rolling)
- Top 10 organic landing pages by sessions
- Engaged sessions percentage on those pages
- Percentage returning users (a leading indicator of whether the audience builds)

**Ahrefs free tier** (free with a Webmaster Tools account, the only DR-relevant metric the user can measure for free):
- Referring domains count (this is the lagging indicator that determines DR)
- New referring domains in the past 7 days
- Lost referring domains in the past 7 days

**Manual tally** (free, takes 5 minutes):
- Outreach actions sent this week (Wikipedia edits, Reddit posts, X threads, SEP/IEP/Substack pitches)
- Responses received this week
- Placed citations / accepted pitches this week (the actual conversion metric)

### Weekly review template

Each Sunday, fill out this row:

```
Week N, week ending YYYY-MM-DD
  GSC: X clicks, Y impressions, position Z (∆ from prior week)
  GA4: X organic sessions (∆ from prior week)
  Ahrefs free: X referring domains (∆ from prior week), Y new, Z lost
  Outreach: X actions sent, Y responses, Z placed
  Notes: <one line on what worked or did not>
```

Keep this in `docs/seo/measurement-log.md` (the user creates this when starting Week 1; no need to scaffold it from this playbook).

### Quarterly targets

**Quarter 1 (Weeks 1 to 12)**:
- Referring domains: 5 earned (currently 0 to ~2)
- Outreach actions sent: 30 (Wikipedia + Reddit + X + Substack + SEP/IEP combined)
- Indexed pages in GSC: 200
- Acceptance rate on Substack pitches: at least 1 of 8 sent

**Quarter 2 (Weeks 13 to 24)**:
- Referring domains: 15 cumulative
- Outreach actions sent: 60 cumulative
- KB seeded claim files: 35 (up from 15 today)
- First SEP or IEP placement secured

**Quarter 3 (Weeks 25 to 36)**:
- Referring domains: 30 cumulative
- KB seeded claim files: 50 (Show HN threshold reached)
- Post Show HN
- Non-brand organic clicks growth: 50% month-over-month from the W1 baseline

**Quarter 4 (Weeks 37 to 48)**:
- Re-evaluate paid services. The user has explicitly said "I don't wanna pay for this" as of 2026-05-19. Respect this through Q3. By Q4, if organic referring domains have plateaued and four quarters of consistent action have not moved the needle, revisit the decision with hard numbers in hand. Until then, paid services remain off the table.

### Tools needed (all free)

- Google Search Console: free, already set up. Property `sc-domain:opensadhaka.com`.
- GA4: free, already set up. Tag `G-S3DHYPPG9R`.
- Ahrefs free tier (Webmaster Tools): free with a Google Search Console verification. Provides referring-domains count and a small backlink sample. Sign up at ahrefs.com/webmaster-tools.
- A spreadsheet or `docs/seo/measurement-log.md` for the weekly review template.
- A Wikipedia account (free).
- A Reddit account (free; the user likely has one already).
- An X account (already exists: @ankit_pfc).

Total monthly cost: $0.

---

## 10. Disqualified tactics (why)

These are tactics commonly recommended by SEO content mills. The playbook deliberately excludes them. The reasons matter so the user knows this is a deliberate omission, not an oversight.

- **Directory submissions** (DMOZ-style web directories, niche directory aggregators). Google deprecated this signal in the mid-2010s. Aggressive directory submission patterns now trigger spammy-links flags. The DR-uplift effect is nonexistent.
- **Private Blog Networks (PBNs)** (renting links on networks of synthetic blogs). Explicitly against Google's spam policies. Detection has been good for years. Penalty if caught is severe.
- **Comment spamming** (leaving generic comments with backlinks on unrelated blogs). Effectively useless for ranking since the rel="nofollow" / rel="ugc" rollout. Triggers anti-spam filters. Generates zero referral traffic.
- **Paid "guest post" packages** (services that promise N guest posts on N high-DR sites for $X). Almost universally produce low-quality placements on sites that already have Google's "spammy outbound link" flag raised. The placements get devalued or de-indexed within months. Paying $200 to $2,000 for these is reliably worse than $0 for organic earned links.
- **Buying expired domains for redirects** (acquiring a high-DR expired domain and 301-redirecting it to opensadhaka.com). Penalized when detected, which is most of the time now. The DR transfer is increasingly fictional even when it lands.
- **AI-generated link-bait content posted under fake author names** (Spinning up "research blogs" with synthetic authors and reciprocal linking). Detected by Google's spam team and by manual reviewers. Even when not detected, it is dishonest, which is incompatible with the Sadhaka project's stated standards (see `feedback_writing_style.md`).
- **Reciprocal link exchanges with random sites** (you link to me, I link to you, neither of us has audience overlap). Penalized in current algorithm. Wastes outreach time. Useless.
- **Fiverr-style "I will get you N backlinks for $X" services**. Identical to comment-spam and PBN tactics under a thin commercial wrapper. Never works for ranking; sometimes triggers penalties.

The playbook is built on the principle that **five high-quality referring domains from authority sources (Wikipedia, SEP/IEP, named niche newsletters, HN-front-page archives, primary-source-cited Reddit discussions) will move rankings more than a hundred low-quality directory and PBN links**. That principle is consistent with Google's stated policy, with the empirical evidence in the May 2026 audit, and with the user's "I don't wanna pay for this" constraint.

---

## Appendix: revision triggers

This playbook should be revised when any of the following happens:

- The KB crosses 50 seeded claim files (triggers the Show HN section).
- A Wikipedia edit gets reverted with a specific reason that suggests the broader strategy needs adjustment (e.g., editor flags opensadhaka.com as commercial; in that case the External Links link needs to be reframed as a non-commercial pedagogical resource).
- An SEP/IEP editor responds positively but asks for a different article than the one pitched (in which case update §3 to match the editor's preference).
- The Ahrefs free-tier referring-domains count crosses 10 (triggers a re-prioritization toward the channels that produced those 10).
- The user changes the constraint on paid services (in which case Section 10 needs to be revisited with specific service evaluations).

This is a working document. Track edits in git history. Update the measurement log weekly and use it to drive the next week's prioritization.
