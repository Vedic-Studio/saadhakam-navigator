# Sādhaka Pañcāṅga & Muhūrta Knowledge Base

> Guardrails and intent taxonomy for answering user questions on tithi, muhūrta, daily pañcāṅga and sādhana timing.

***

## 1. Core concepts the LLM must know

### 1.1 Five limbs of pañcāṅga

When a user says “panchang for today”, the LLM should think in terms of the five traditional limbs:[^1][^2][^3][^4]

- **Tithi** – lunar day, defined by 12° elongation of Moon from Sun; 30 tithi per lunar month.[^5][^6][^2]
- **Vāra** – weekday (Sunday–Saturday) with associated graha and devatā.[^7][^8]
- **Nakṣatra** – lunar mansion (27 or 28), based on Moon’s position.[^2][^9]
- **Yoga** – combination of Sun–Moon longitudes, 27 types.[^9][^2]
- **Karaṇa** – half‑tithi unit, 11 named karaṇa-s cycling through month.[^2][^9]

For most user questions, tithi, vāra and inauspicious kāla-s (Rahu Kāla etc.) are the primary drivers.[^10][^11][^1]


### 1.2 How tithi actually works

Key points the model must internalize:[^12][^6][^5][^2]

- A tithi is based on Moon–Sun angle, not civil date; it can start or end at any clock time.
- Traditional calendars **assign the day’s tithi by what prevails at local sunrise**.
- Because of Moon’s variable speed:
  - An **adhika tithi** (tithi vṛddhi) can span two sunrises so that the same tithi is assigned for two consecutive solar days.[^13][^5]
  - A **kṣaya tithi** can start after sunrise and end before next sunrise, so that it is “skipped” in naming; good muhurta texts advise avoiding such tithi for major auspicious events.[^14][^5][^13]
- Therefore, **never assume tithi increases sequentially with date**; always refer to a computation source.


### 1.3 Amānta vs Pūrṇimānta months

Regional month naming differs while tithi itself is the same.[^15][^16][^17][^18]

- **Amānta system** – month ends on amāvasyā; common in most of South and parts of West India (e.g., Maharashtra, Gujarat, Karnataka, Andhra).[^16][^15]
- **Pūrṇimānta system** – month ends on pūrṇimā; traditional in North India; month name changes at full moon.[^17][^18][^15][^16]
- Festivals always track **tithi**, so festival day is the same; only month label changes (e.g., same Krishna pakṣa tithi may be called Āśvina in Amānta and Kārtika in Pūrṇimānta).[^18][^15][^17]

Guardrail: when users ask “Which month is my birth tithi in this year?”, always mention that month name may differ by regional system, but the **tithi and pakṣa are invariant**.


### 1.4 Drik vs Vākya / traditional pañcāṅga

There are different computational traditions:[^19][^20][^21][^4]

- **Drik / Drig Gaṇita / Thiru‑gaṇita** – uses modern ephemeris and observational astronomy; tithi and nakṣatra timing aligns closely with actual sky positions.
- **Vākya / Sūrya‑siddhānta based** – uses fixed traditional formulae and verse‑tables; can show 2–4 hour error for tithi/nakṣatra timings and larger for planets.[^20][^19]
- Local printed panchāṅga-s may differ from online drik tools on boundary cases (close to sunrise, start/end of tithi or nakṣatra).[^21][^4][^19][^20]

Guardrail: when a user reports disagreement between Sādhaka and a local calendar, respond with humility, note the computational standard (e.g., “drik/observational”), and suggest they follow **their guru or temple tradition** in case of conflict.


### 1.5 Inauspicious daily kāla-s

Commonly used daily partitions:[^22][^23][^11][^24][^1][^10]

- **Rahu Kāla** – about 90 minutes per day, varying by weekday; avoided for starting new ventures, journeys, or signing contracts.
- **Yamagandam** – another inauspicious block for worldly beginnings.
- **Gulika Kāla** – mixed; avoided for new ventures but sometimes considered suitable for activities meant to “recur” or for remedial worship.[^25][^1][^10]

Sādhaka‑friendly nuance: several traditional and modern sources treat these kāla-s as **unsafe for auspicious material starts but usable for inner work, japa and remedial sādhanā**, especially when consciously offered to the corresponding graha/devatā.[^11][^24][^1]


### 1.6 Spiritually strong daily windows

The LLM should recognize and prioritize a small set of “always relevant” sādhana kāla-s:[^26][^27][^28][^29][^4]

- **Brahma muhūrta** – roughly 96 minutes before local sunrise (one muhūrta of 48 minutes ending 48 minutes before sunrise in many definitions); mind is sattvic and calm; ideal for meditation, japa, and scriptural study.[^27][^26]
- **Prātaḥ sandhyā (dawn)** – span around sunrise; used for sandhyāvandana, gāyatrī-japa, light āsana and prāṇāyāma.[^29]
- **Sāyāhna / saṁdhyā‑kāla (sunset)** – span around sunset; ideal for evening japa, āratī, reflection, and family pūjā.[^28][^29]
- **Abhijit muhūrta (midday)** – a short auspicious period centered on local noon; good for certain saṅkalpa, initiations or homa when dawn/sunset are not possible.[^30][^4]

Guardrail: if user cannot access brahma muhūrta due to health or life constraints, encourage **regularity over perfection**, and suggest they still anchor at least one daily practice around a nearby sandhyā.


***

## 2. Intent taxonomy: what users are actually trying to do

The LLM must first classify the user’s intent and then apply the appropriate reasoning pattern and response structure.

### 2.1 Everyday planning intents

Typical surface questions:

- “What is today’s panchang for [city]?”
- “Is today good for starting [X]?”
- “What are today’s Rahu Kāla, Yamagandam and Gulika times?”

Underlying goals:

- Plan the day’s tasks while avoiding inauspicious windows.
- Get a **quick auspiciousness check**, not a full astrology reading.

Required data and logic:

- Location (lat/long or at least city, country) and date.
- Compute sunrise, sunset, tithi, vāra, nakṣatra, yoga, karaṇa and daily kāla-s using a drik‑based engine.[^4][^1][^2]
- Classify tithi category (Nanda/Bhadrā/Jaya/Rikta/Pūrṇa) for a simple “flavor of the day” explanation.[^31][^2]

Recommended answer structure:

1. **Short status line** – “For [city] on [date], today is [weekday], [tithi name] in [pakṣa], [nakṣatra] nakṣatra.”
2. **Traffic‑light summary** – one line each for:
   - “Best windows to start important work.”
   - “Avoid these slots for new beginnings (Rahu Kāla, Yamagandam).”
3. **Optional sādhaka expansion** – one sentence on suitable sādhana in brahma muhūrta and sandhyā‑kāla.
4. **Gentle disclaimer** – “Different regional traditions may vary slightly; follow your family/guru guidance where they differ.”


### 2.2 Life‑event and ritual intents

Surface questions:

- “Find an auspicious muhūrta for marriage / grihapravesha / nāmakaraṇa.”
- “Is this date good for my child’s upanayana?”

Underlying goals:

- Maximize auspiciousness and minimize dosha for **one important ritual event**.
- Often the user wants reassurance more than technical detail.

Required data and logic (for a **lightweight, non‑jyotiṣa** engine):[^32][^33][^34][^30]

- Same pañcāṅga data as daily planning.
- Filter out:
  - Rikta tithi (4, 9, 14) and certain traditionally avoided tithi for that ceremony.[^31][^2]
  - Days heavily impacted by tithi kṣaya or problematic yogas, if the data is available.[^5][^14]
  - Periods dominated by Rahu Kāla, Yamagandam, or Gulika around the proposed time.[^22][^1][^10]
- Prefer:
  - Nanda / Bhadrā / Jaya / Pūrṇa tithi depending on occasion (Nanda/Bhadrā for prosperity and harmony, Jaya for victory, Pūrṇa for completion).[^31][^2]
  - Auspicious weekday–tithi combinations referenced in standard vivāha / śubha muhūrta guides.[^35][^36][^33][^37]

Guardrails:

- **Do not present this as a full Vedic astrology consultation.** Explicitly say that traditional vivāha or saṁskāra muhūrta also considers kuṇḍalī, lagna, doṣa, daśā etc., and recommend a competent jyotiṣī for high‑stakes decisions.[^33][^37][^35][^32]
- For this product, limit to **“pañcāṅga‑only” auspiciousness**.

Recommended answer structure:

1. Briefly restate the user’s goal (“You want a suitable muhūrta for [event] in [city].”).
2. List **2–3 candidate slots** (date + time range), each with:
   - tithi, vāra, nakṣatra;
   - note that inauspicious daily kāla-s are excluded.
3. Add a short, non‑deterministic explanation: “These slots are favorable from pañcāṅga perspective; for horoscope‑based refinement, please consult your family jyotiṣī.”


### 2.3 Sādhana scheduling intents (core to Sādhaka)

Surface questions:

- “What are the best times for japa and meditation today?”
- “I do [X deity] sādhana; which days and tithi are special for this?”
- “Help me design a weekly sādhana routine aligned with muhūrta.”

Underlying goals:

- Align daily discipline with **subtle rhythms** while staying practical.
- Avoid over‑complexity; user wants 1–3 strong windows, not a full chart.

Required data and logic:[^26][^27][^28][^29][^1][^4][^2]

- Brahma muhūrta and the two main sandhyā‑s for user’s location.
- Daily pañcāṅga; highlight if today has strong devatā association (e.g., ekādaśī, pūrṇimā, amāvasyā, ṣaṣṭhi, aṣṭamī, caturthī, caturdaśī).[^38][^39][^40]
- Weekday–devatā mapping (Sunday–Sūrya, Monday–Śiva, Tuesday–Hanumān/Maṅgala, Wednesday–Gaṇeśa, Thursday–Viṣṇu/Guru, Friday–Lakṣmī, Saturday–Śani/Hanumān).[^8][^41][^7]

Recommended answer structure for “best times today”:

1. **Top recommendation** – “For deep meditation/japa: [brahma muhūrta time], if practically possible.”
2. **Fallbacks** – morning sandhyā (e.g., 20–40 minutes around sunrise) and evening sandhyā (around sunset), with concrete clock ranges.
3. **Optional layer** – highlight if today’s tithi or weekday supports user’s chosen devatā or intention (“Today’s [tithi] is associated with [deity]; this is a good day for that sādhana.”).[^39][^40][^38]
4. One sentence on **regularity over perfection**, especially for those who cannot follow exact timings.


### 2.4 Deity & vrata‑specific intents

Surface questions:

- “Which tithi is best for Lakṣmī pūjā?”
- “On which days should I worship Gaṇeśa regularly?”
- “Today is [tithi]; which deity and practice is recommended?”

Underlying goals:

- Make a personal relationship with a devatā more rhythmic and structured.

Canonical mappings (non‑exhaustive, for guidance only):[^42][^43][^40][^44][^38][^39]

- Tithi–devatā lists (Agni for pratipadā, Aśvinī‑kumāra for dvitīyā, Gaurī for tṛtīyā, Gaṇeśa for caturthī, Nāga/Serpent deities for pañcamī, Subrahmaṇya for ṣaṣṭhī, Sūrya for saptamī, Durga/Asṭamī, Rāma on navamī, Dikpāla‑s on daśamī, Kubera or Viṣṇu on ekādaśī, Viṣṇu on dvādaśī, Dharma on trayodaśī, Śiva on caturdaśī, Pūrṇimā for Pūrṇa Brahman/Lakṣmī, Amāvasyā for pitṛ‑s/Kālī etc.).
- Weekday–devatā mapping and customary vratas (e.g., Monday fast for Śiva, Thursday for Guru/Viṣṇu, Friday for Lakṣmī, Saturday for Śani/Hanumān).[^40][^41][^7][^8]
- Festival‑specific connections (Rāma Navamī, Janmāṣṭamī, Navarātri, Śivarātri, Dīpāvalī etc.).[^45][^46][^17]

Guardrails:

- There is **variation by sampradāya and region**; state that what is presented is a “commonly referenced pattern” and invite the user to follow their lineage where it differs.[^38][^39][^40]

Recommended answer structure:

- Start with the **common association** (“Most traditions connect [tithi/weekday] with [deity].”).
- Offer **one simple practice** for householders (short mantra, 5–15 minute pūjā). 
- Then offer **one deeper option** for sādhaka‑s (longer japa count, special meditation, additional niyama).
- Emphasize bhāva (inner attitude) over fear of missing exact clock‑time.


### 2.5 Historic / research / birth‑tithi intents

Surface questions:

- “What was the pañcāṅga on my birth date/place and what does it mean?”
- “What will be the date of my Hindu birthday this year?”
- “What was the tithi on [historical event]?”

Underlying goals:

- Personal connection and curiosity; light interpretive guidance.

Required data and logic:[^13][^17][^4][^5]

- Compute full pañcāṅga for the historic date/time and location.
- Determine birth‑tithi as tithi prevailing at sunrise at the place of birth (or at birth time, depending on local tradition).[^5][^13]
- To find “Hindu birthday” in a given Gregorian year, search that year for the same tithi and nakṣatra combination, adjusting for amānta/pūrṇimānta month naming differences.[^15][^17][^4]

Guardrails:

- Differentiation from full jyotiṣa: this KB does **not** encode graha‑daśā, lagna, divisional charts etc.; keep interpretations symbolic and non‑deterministic.
- Always mention the possibility of **multiple conventions** (e.g., some celebrate by tithi alone, some tithi+nakṣatra, some at sunrise, some in the evening).


### 2.6 Edge‑case and conflict‑resolution intents

These are the questions where typical LLMs fail. This KB must explicitly address them.

#### 2.6.1 Tithi spans and overlaps

Common user issues:[^14][^1][^4][^13][^5]

- Tithi changes during the day: “Ekādaśī started at 10 a.m.; is today ekādaśī or daśamī?”
- Adhika / kṣaya tithi: “Why is there no caturthī this month?”

Rules of thumb:

- For **vrata and festivals**, most traditions use the tithi that **prevails at sunrise** or, for some festivals, at a specific part of day (e.g., moonrise, midnight). Users should be told clearly which convention the product follows.
- When declaring “today is ekādaśī”, use the **tithi at local sunrise** as default; explain that tithi may change during the day.
- In case of adhika or kṣaya tithi, briefly define them and note that festivals and śubha muhūrta usually **avoid kṣaya and adhika tithi** unless śāstra specifically prescribes otherwise.[^47][^14][^5]


#### 2.6.2 Time‑zone, DST and location differences

Issues:[^4]

- “Ekādaśī is today in India but tomorrow where I live; when should I fast?”
- “I moved from India to US; which calendar should I follow?”

Guardrail pattern:

- Always compute pañcāṅga based on the **user’s current location and local time‑zone**; mention this explicitly.
- Explain gently that tithi boundaries are linked to Moon–Sun angles observed at a place, so they can shift between countries.
- Offer two options, without dogmatism:
  - Follow **local tithi** to stay synchronized with the sky where one lives.
  - Or, if under strong guru/family guidance, follow **their instruction**, even if it uses motherland timings.


#### 2.6.3 Differences between calendars

Issues:[^19][^17][^20][^4]

- “Sādhaka shows festival on different date than my temple calendar.”

Guardrail pattern:

- Acknowledge the two computations (drik vs vākya, amānta vs pūrṇimānta, differing sunrise conventions).
- State clearly which standard Sādhaka follows (e.g., “drik, amānta, local sunrise at standard horizon”).
- Encourage the user to honor their **local temple or guru tradition** when deciding which date to observe.


#### 2.6.4 Health, work‑schedule and inclusivity constraints

Issues:

- Shift workers, parents with infants, elderly or ill users may not manage brahma muhūrta or strict fasts.

Guardrail pattern:

- Emphasize that **regularity and sincerity outweigh exact clock‑time** in most bhakti and jñāna traditions.
- Offer adapted windows (e.g., “closest quiet 30–45 minutes after waking,” or “use evening sandhyā if mornings are impossible”).
- Explicitly advise against practices that could harm health (e.g., extreme fasting) and nudge users to consult doctors where relevant.


### 2.7 Meta / doubt‑clearing intents

Surface questions:

- “Does muhūrta really matter for sādhana?”
- “If God is beyond time, why follow tithi?”

Recommended posture:

- Present muhūrta as **a supportive rhythm**, not as a superstition or rigid requirement.
- Use analogies (like choosing quiet hours to study) and emphasize that grace is not limited by the clock, but conscious alignment with rhythms can reduce friction.


***

## 3. Response guardrails: what to say and avoid

### 3.1 General style

Every answer about muhūrta / pañcāṅga on Sādhaka should:[^27][^29][^1][^26][^2][^4]

- Start with the **user’s practical goal**, not raw data.
- Prioritize **clarity and reassurance** over technical jargon.
- Explicitly name **assumptions** (location, calendar type, computation standard) when relevant.
- Distinguish between “widely shared practice” and “your guru may tell you otherwise; follow that.”

Avoid:

- Fatalistic or fear‑inducing language (“If you miss this muhūrta, harm will occur…”).
- Deterministic predictions about wealth, health, marriage length, etc.
- Claiming to replace a living guru, priest or jyotiṣī.


### 3.2 When user intent is unclear

Common ambiguous queries:

- “Is today good?”
- “Tell me about today’s muhūrta.”

Default approach:

- Interpret as a **day‑planning + sādhana** query.
- Give a concise view: today’s tithi + weekday + 2–3 best windows for internal practice + daily kāla-s to avoid for new worldly starts.
- Offer one clarifying follow‑up question if interacting in a chat; in a static page, provide clickable presets (“For sādhana”, “For starting tasks”, “For festivals & vratas”).


### 3.3 Handling conflicting or overly absolute user beliefs

If user insists on a highly fatalistic view (“I missed the muhūrta, is everything ruined?”):

- Acknowledge their concern.
- Emphasize that text and teachers differ; many uphold that **bhāva, effort, and grace can heal timing imperfections**.
- Suggest remedial attitudes (extra japa, gratitude, charity) rather than panic.


***

## 4. Web page structure for Sādhaka Pañcāṅga

This section outlines how the knowledge above can be reflected in a non‑chat, productized UI.

### 4.1 Overall layout

Recommended top‑level layout for a “Sādhaka Pañcāṅga” page:

1. **Header / location bar**
   - Shows current date, city, time‑zone.
   - Entry point for changing date and location.

2. **Sādhaka overview panel (above the fold)**
   - One‑line summary: “Today in [city]: [weekday], [tithi] [pakṣa], [nakṣatra].”
   - Short tag like “Day of [deity] – favorable for [intention].”
   - 2–3 colored chips for: “Best sādhana windows”, “Avoid these for beginnings”, “Special tithi/vrata today”.

3. **Timeline of the day**
   - Horizontal bar from pre‑dawn to night.
   - Color‑coded segments for: Brahma muhūrta, morning sandhyā, day‑time, evening sandhyā, night.
   - Overlay Rahu Kāla, Yamagandam, Gulika blocks.

4. **“For Sādhana Today” section**
   - Cards for:
     - Meditation & japa windows.
     - Suggested practice for today’s tithi/devatā.
     - Optional mini‑vrata or niyama suggestion.

5. **“For Daily Life & Events” section**
   - Simple advice: which windows to avoid for starting big tasks, travel, or signing documents.
   - Link to a separate “Find muhūrta for an event” flow.

6. **Deep‑dive / Reference panel**
   - Tabs like:
     - “Today’s full pañcāṅga” – raw data table.
     - “Tithi meanings” – list + devatā + recommended sādhanā.
     - “Weekday & deity guide”.
     - “FAQ & edge cases”.


### 4.2 Key components and how the LLM should feed them

#### 4.2.1 Sādhaka overview headline

Content:

- Tithi + pakṣa, weekday, nakṣatra.
- One line in plain language: “A [Nanda/Jaya/…] tithi that supports [starting/completing, inner victory, etc.].”[^2][^31]

LLM behavior:

- Derive tithi category and map to simple description.
- If there is a well‑known devatā for tithi or weekday, mention that first, but keep sectarian assumptions minimal.


#### 4.2.2 Sādhana windows card

Content:

- Top 2–3 time windows, each labeled (e.g., “Brahma muhūrta”, “Morning sandhyā”, “Evening sandhyā”).[^29][^26][^27]
- Each window has:
  - Start and end time.
  - Suggested intensity (light, medium, deep).
  - Example practices (meditation, nāma‑japa, svādhyāya, kīrtan, pūjā, prāṇāyāma).

LLM behavior:

- Always include brahma muhūrta if present and user is not in an impossible time‑zone scenario.
- If brahma muhūrta is in the past (user checking late in the day), still mention it but highlight evening options.


#### 4.2.3 “Avoid for new beginnings” card

Content:

- List Rahu Kāla, Yamagandam, and optionally Gulika times with a simple explanation line.[^1][^10][^11][^22]

LLM behavior:

- Explicitly state: “These windows are traditionally avoided for starting **worldly** tasks. They can still be used for japa, prayer or introspection.”


#### 4.2.4 Tithi & devatā reference tables

Two key reference tables on the page:

1. **Tithi → devatā → suggested sādhanā**
   - Columns: Tithi name, Deity association (common pattern), Qualitative “flavor” (Nanda, Jaya, etc.), Simple practice suggestion, Notes.
   - Use common lists but mark them as “widely referenced patterns; regional practices vary.”[^42][^39][^40][^38]

2. **Weekday → devatā → suggested sādhanā**
   - Columns: Weekday, Graha, Deity, Customary vrata, Simple practice.[^41][^7][^8]

LLM behavior:

- Use these tables as the default answer‑source for deity‑centric questions.
- When a user asks “What to do on [tithi/weekday]?”, answer by pulling the relevant row plus one or two adapted suggestions.


#### 4.2.5 FAQ & edge‑case section

Static FAQ items the LLM should be aligned with:

- “Why are festival dates on Sādhaka different from my temple calendar?”[^17][^20][^19][^4]
- “What are adhika and kṣaya tithi?”[^47][^13][^14][^5]
- “Why does ekādaśī sometimes fall on different civil dates in different countries?”[^17][^4]
- “I cannot wake up for brahma muhūrta; what should I do?”[^26][^27]

Each FAQ answer should:

- Give a **one‑paragraph explanation**.
- End with a compassionate, non‑rigid takeaway (“Do what you can with sincerity; timing is a support, not a threat.”).


### 4.3 Separate flows that can still reuse this KB

Beyond the main daily page, the same knowledge base can power:

- **“Design my sādhana routine” wizard** – user picks waking time, primary devatā, available minutes per day; system maps practice slots to brahma muhūrta/sandhyā as closely as possible.
- **“Find muhūrta for an event” tool** – simplified pañcāṅga-only filtering as outlined above.
- **“Understand this tithi/weekday” explainer** – tap/click on any tithi/weekday in the calendar to get devatā, flavor, story linkage and suggested practices.


***

## 5. Implementation notes for engineers & prompt designers

1. **Always compute first, then interpret.** Do not let the LLM “guess” tithi or muhūrta from the Gregorian date; use a reliable drik‑based API or library and feed the structured result into the LLM.[^20][^4]
2. **Pass explicit context:** location, date, sunrise/sunset, tithi, pakṣa, tithi start/end, weekday, nakṣatra, daily kāla-s. The LLM then maps that to user‑friendly language and recommendations.
3. **Tag user intent** at the routing layer (e.g., `daily_sadhana`, `event_muhurta`, `deity_vrata`, `faq_edge_case`) and choose specialized system prompts that enforce the guardrails described above.
4. **Persist tradition choices** in configuration (drik vs vākya, amānta vs pūrṇimānta, sunrise convention) and expose them to the LLM so it can explain discrepancies without hallucination.[^15][^19][^20][^17]
5. **Bias responses toward sādhana.** Whenever ambiguous, assume the user cares about inner practice and offer at least one concrete sādhana suggestion aligned with the timing information.

---

## References

1. [Daily Panchang,Rahu Kaal,Gulik Kaal,Yamagandam,Daily ...](http://www.vedic-astrology-prediction.com/articles/daily-panchang.html) - Rahu-Kala is one of the 8 segments of the day and considered inauspicious period in Indian astrology...

2. [Panchang Elements: Tithi, Vaar, Nakshatra, Yoga, Karana](https://astrosight.ai/nakshatras/panchang-elements-tithi-vaar-nakshatra-yoga-karana) - Tithi — Jala (Water) — Emotional energy · Vaar — Agni (Fire) — Action energy · Nakshatra — Vayu (Air...

3. [Tithi, Var, Nakshatra, Yoga, Karan](https://www.facebook.com/WorldwideHinduTemples/posts/what-is-the-meaning-of-panchangin-hindu-calendar-panchang-is-an-essential-part-w/2865186876960488/) - The Panchang is mainly made up of five parts. These five parts are Tithi, Nakshatra, Var, Yoga and K...

4. [Vedic Panchanga - Accurate Hindu Calendar & Astrology ...](https://vedicpanchanga.com) - 1. Select Date & Time: Choose the specific date and time for which you want to calculate the panchan...

5. [Tithi (तिथि) - Dharmawiki](https://dharmawiki.org/index.php/Tithi_(%E0%A4%A4%E0%A4%BF%E0%A4%A5%E0%A4%BF)) - जिसमें सूर्योदय नहीं हो वह क्षय तिथि और जिसमें दो सूर्योदय हो उनमें अग्रिम अधिक तिथि कहलाती है। शुभक...

6. [Tithis](https://shrifreedom.org/vedic-astrology/tithi/) - In picking a Muhurta one must understand the difference between Nakshatra and tithi, both relate to ...

7. [Which Days Are Dedicated to Which Hindu Gods?](https://epuja.co.in/which-days-are-for-which-hindu-gods) - Discover the Hindu gods associated with each day of the week, including the rituals, significance, a...

8. [Which Hindu God or Goddess to Worship on Each Day of the Week](https://www.moneycontrol.com/religion/which-hindu-god-or-goddess-to-worship-on-each-day-of-the-week-article-12715323.html) - Which Hindu God or Goddess to Worship on Each Day of the Week ; Monday/Somwar, Lord Shiva ; Tuesday/...

9. [Yogas and Karanas of panchang](https://vedicgyan.com/blog/astrology/yogas-and-karanas-of-panchang) - Nakshatra (star or constellation in which Moon is transiting); Tithi (moon ... Karana (half a lunar ...

10. [Rahu Kaal, Yamagandam, and Gulika Kaal: Explained](https://shubhpanchang.com/blog/rahu-kaal-yamagandam-and-gulika-kaal-explained) - Rahu, a shadow planet in Vedic astrology, represents illusion, confusion, and worldly desires. Durin...

11. [Rahu Kaal | Rahu Kalam time for New Delhi, NCT, India](https://www.drikpanchang.com/panchang/rahu-kaal.html) - Rahu Kaal is one of the eight segments of the day between sunrise and sunset. Eight segments of the ...

12. [How to Calculate Tithi | Panchang Basics with StarGazing India](https://www.youtube.com/watch?v=4PSfZdwxfe4) - ... Tithi? The simple definition: The time it takes for the Moon to create a 12-degree angle with th...

13. [Episode 6: What are adhika tithi and kshaya tithi? - YouTube](https://www.youtube.com/watch?v=WlLmZf_Q9DU) - What are adhika tithi and kshaya tithi? We have seen in the previous episode that a tithi is associa...

14. [SAV 108: Understanding Tithi Kshaya and Tithi Vriddhi - YouTube](https://www.youtube.com/watch?v=0cUz_8vUiU4) - Source #Astrology #Video 108: Understanding #TithiKshaya and #TithiVriddhi | तिथि क्षय और तिथि वृद्ध...

15. [Amanta vs. Purnimanta: Two Hindu Lunar Month Systems in India](https://shriastrotime.com/blogs/amanta-vs-purnimanta-understanding-the-two-hindu-lunar-month-systems-in-india) - The key difference lies in which lunar phase marks the end of the month. Aspect, Amanta, Purnimanta....

16. [Lunar months - Purnimanta and Amanta system - Ekohumm](https://www.ekohumm.com/lunar-months-purnimanta-and-amanta-system) - And according to the Purnimanta Lunar Hindu Calendar, the lunar month ends on 'full moon day', i.e.,...

17. [Hindu calendar - Wikipedia](https://en.wikipedia.org/wiki/Hindu_calendar) - Amānta and Purnimānta systems

 Two traditions have been followed in the Indian subcontinent with re...

18. [Episode 4 - Variations of the Hindu calendar | Amanta & Purnimanta](https://www.youtube.com/watch?v=nDgTsCWEH48) - Ahargana - Episode 4: Variations of the Hindu calendar In this episode, I explain the consequences o...

19. [Thiru Ganita Panchangam versus Vakyam ...](https://www.drikpanchang.com/tamil/info/thiruganita-versus-vakyam-panchangam.html) - This page provides information on difference between Thiru Ganita Panchangam and Vakyam Panchangam. ...

20. [Vakya Siddhanta, Drik Ganita and Panchang Calculation Error ...](https://www.myzodiaq.in/en/online-library/panchang/panchang-calculation-methods/vakya-siddhanta-drik-siddhanta-and-panchang-error-margins) - Vakya Siddhanta and Drik Siddhanta represent two fundamentally different methodologies for calculati...

21. [Drik ganitha and Vakhya Pannchangams](https://www.facebook.com/groups/521257335582715/posts/1347452002963240/) - Drik ganitha and Vakhya Pannchangams By P.R.Ramachander PAnchangam ie book giving us information abo...

22. [Understanding Rahu Kala and Yamagandam: Inauspicious ...](https://timesofindia.indiatimes.com/astrology/others/understanding-rahu-kala-and-yamagandam-inauspicious-timings-in-astrology/articleshow/111638963.cms) - Rahu Kala, often referred to as the 'Rahu Time,' is a daily period that is considered highly inauspi...

23. [Today's Rahu Kalam, Yamagandam & Gulika Timings ...](https://www.onlinejyotish.com/astrology-tools/today-kala-times.php) - Quick Summary: The 3 Daily Kalas · Rahu Kalam: The most dangerous time of the day. Causes confusion,...

24. [Rahu Kaal, Yamaganda & Gulika Effects on Muhurat](https://www.sanatanjyoti.com/sanatan-gyan-hub/muhurat/what-is-the-impact-of-rahu-kaal-yamaganda-and-gulika-on-muhurat-209) - Planning an auspicious event? Understand how Rahu Kaal, Yamaganda & Gulika can ruin Muhurat—get expe...

25. [Gulika , Rahu Kaalam , Yamagandam & Shoolam](https://wealthymatters.com/2011/10/04/gulika-rahu-kaalamyamagandam-shoolam/comment-page-1/) - Its believed that any activity carried out during Gulika(Flowering Time) period will be repeated onc...

26. [Brahmamuhurta-Best Time for Meditation](https://www.sivanandaonline.org/public_html/?cmd=displaysection&section_id=1411) - Brahmamuhurta is the morning period from 3.30 a.m. to 5.30 a.m. It is very favourable for meditation...

27. [Brahma / Brahmi Muhurta: The most auspicious time to ...](https://www.easyayurveda.com/2025/04/15/brahma-brahmi-muhurta-the-most-auspicious-time-to-begin-the-activities-of-the-day/) - Brahma Muhurta is precisely one hour thirty six minutes before sunrise. Muhurta is a time period of ...

28. [Sandhya Kaal is the time just before and after ...](https://www.instagram.com/reel/DJ138eRyDkl/) - Sandhya Kaal is the time just before and after sunset (approx 5:30 to 7 PM). It's is a divine sandhi...

29. [Performing Sandhya Vandanam](https://www.hinduismtoday.com/magazine/apr-may-jun-2022/performing-sandhya-vandanam/) - There are four sandhyas: 1) morning, pratah kala sandhya; 2) noon, madhyanah kala sandhya; 3) evenin...

30. [How to easily find an Auspicious Muhurta ourselves from ...](https://www.mahastro.com/how-to-easily-find-an-auspicious-muhurta-ourselves-from-any-vakya-panchangam/) - [Use our 'Panchangam' App mahastro panchangam app to easily find auspicious and inauspicious period ...

31. [Panchang in Vedic Astrology: Tithi, Nakshatra & Yoga](https://shubhpanchang.com/blog/panchang-in-vedic-astrology-tithi-nakshatra-yoga) - Nanda Tithis : Favorable for auspicious activities and new beginnings. Bhadra Tithis : Suitable for ...

32. [FIXING A MUHURTA- AN OUTLINE OF THE STEPS ...](https://karmicrhythms.com/how-to-fix-a-muhurtha-muhurta-panchanga-auspicious-time/) - The most common questions that students ask are: Which component of the ... What is the use if the t...

33. [Marriage Muhurat Calculation: 21 Doshas, Tribhal Shuddhi ...](https://astroananta.com/vivah-muhurat-calculation-doshas-gun-milan-shubh-lagna-guide) - How to calculate a perfect Marriage Muhurat? A perfect muhurat requires: 1. Tribal Shuddhi: Strong S...

34. [Why Muhurat Matters: Auspicious Timings for Every Pooja](https://poojavara.com/why-muhurat-matters/) - Discover why Muhurat matters is crucial in Hindu rituals. Learn how to find auspicious timings for e...

35. [Hindu Marriage Day and Vivah Muhurat](https://www.drikpanchang.com/shubh-dates/info/choosing-auspicious-marriage-date.html) - Tithis and Weekdays. For marriage Monday, Wednesday, Thursday and Friday are considered auspicious. ...

36. [How to Choose Auspicious Marriage Date and Vivah ...](https://panditjionway.com/choose-auspicious-marriage-date/) - Q1. What is the best Vivah Muhurat 2025 for an auspicious Hindu marriage? Q2. Which Tithis and Naksh...

37. [Choosing Auspicious Marriage Muhurta | PDF](https://www.scribd.com/document/874293774/9-1-Basic-Marriage-Muhurta-Handout) - Common questions. Powered by AI. What is the rationale behind selecting a wedding time during daylig...

38. [Tithis and Their Worshipped Deities | PDF](https://www.scribd.com/document/468597465/Gods-and-goddesses-to-be-worshipped-on-each-Tithi-Hari-Ome) - Specific deities are assigned to each of the 15 tithis in a lunar month. For example, Agni should be...

39. [Tithis and Nakshatra Lords in Astrology | PDF | Puranas - Scribd](https://www.scribd.com/document/61833899/27-TithiNakshatrainBhavishyaPurana) - This document summarizes information from the Bhavishya Purana about the lords of the tithis (days o...

40. [Important Dates to Worship Gods and Goddesses - Askganesha](https://www.askganesha.com/blog/why-one-should-worship-on-these-days) - Worshipping particular gods and goddess on a specific tithi or date according to Hindu calendar help...

41. [[PDF] Each Day of a Week Dedicated to a Particular Hindu God](https://www.londonsrimurugan.org/pdf/EachDayoftheWeek.pdf) - Mondays in Karthigai Masam (November – December is also auspicious in. Tamil Nadu. Tuesday. Tuesday ...

42. [Gods and Goddesses to be Worshiped on Each Tithi - Hariome](https://hariome.com/gods-and-goddesses-to-be-worshiped-on-each-tithi/2/) - Which Deity To Worship On Which Tithi. Varaha Purana mentions the importance of Tithis in a month an...

43. [Which Deity To Worship On Which Tithi? Every month in the Hindu ...](https://www.facebook.com/groups/227572633944059/posts/1989000707801234/) - Goddess Durga is worshipped every month on the Ashtami day of the Shukla Paksha. In some traditions,...

44. [Which tithi is related/special to Maha Lakshmi ? : r/hinduism](https://www.reddit.com/r/hinduism/comments/1qk45mj/which_tithi_is_relatedspecial_to_maha_lakshmi/) - Maa Lakshmi's energy is considered most consistently active on Purnimā (Full Moon) every month — esp...

45. [Diwali 2025 Lakshmi Puja Guide: Vidhi, Muhurat, Rituals & ...](https://www.jkyog.org/blog/diwali-lakshmi-puja-2025-tithi-muhurat/) - The best time for the puja is during Pradosh Kaal, especially when Taurus Lagna prevails — as this p...

46. [Laxmi Puja 2025: Date, Lakshmi Puja Muhurat, Sthir Lagan ...](https://timesofindia.indiatimes.com/religion/festivals/laxmi-puja-2025-date-lakshmi-puja-muhurat-sthir-lagan-rituals-lakshmi-mantra-aarti-and-significance/articleshow/124695314.cms) - Laxmi Puja 2025: Date, Lakshmi Puja Muhurat, Sthir Lagan, Rituals, Lakshmi Mantra, Aarti and Signifi...

47. [तिथि वृद्धि और तिथि क्षय क्या है? | Tithi Vridhi Aur Tithi Kshay Kya Hai?](https://www.youtube.com/watch?v=r7j7SnRoIBY) - तिथि वृद्धि और तिथि क्षय क्या है? | Tithi Vridhi Aur Tithi Kshay Kya Hai? | Rahul Singh Rathore | My...

