# Sadhaka Substack — Publication Blueprint (v1)

**Date:** 2026-06-01
**Status:** Locked positioning + decisions; warmup slate proposed; manifesto pending brief.

---

## 1. What this is

A Sadhaka-branded Substack on ideology, philosophy, civilization, and Sanatana dharma — tracing one idea per issue **from its genesis in the texts to how it should shape life now**, for intellectually curious readers who already lean this way and want *fodder, discussion points, and things to think and talk about* regarding their own dharma.

It is a **discourse engine**, not a content distributor. It does not summarize site articles or dispense lifestyle advice.

## 2. Locked decisions (2026-06-01)

| Decision | Choice | Implication |
|---|---|---|
| Byline | **Sadhaka-branded** | The publication *is* Sadhaka's voice; Ankit amplifies via personal X, but authority is institutional. |
| Platform | **Substack** | Notes + recommendation network is the acquisition channel for this genre. |
| Site relationship | **Fully integrated** | Every flagship mirrors to opensadhaka.com with an SEO/JSON-LD *wrapper only* (no AEO block / FAQ in the prose body). Same words, two surfaces. |
| Praxis layer | **Implication only** | The "how to live" lands as intellectual *implication* the reader draws themselves. No advice, no calls to action. Preserves the essayist register, dodges preachy-drift. |
| Tagline | **"An operating system for consciousness."** | Organizing frame is *consciousness*, not disorder. Dharma as the OS for what a mind is and how it runs; urgent in an age racing to build artificial minds. Makes the observer/sākṣī essay the defining piece. |
| Monetization | **Free at launch, monetize later** | Build the list free; introduce freemium (gate archive/community, keep flagship free) once volume exists. |

## 3. Positioning & ownable lens

**Promise:** *One idea, traced from its genesis in the texts to what it implies for a life now: rigorous enough to trust, concrete enough to argue with.*

**The lens (the "Lindy Effect" of this publication):** Sanatana dharma as an **operating system for consciousness** — an account of what a mind is, how reality is structured, and how to act inside it. Where modern science treats consciousness as an output to explain or engineer, the tradition treats it as the ground: the witness (sākṣī) that all explanation presupposes. That inversion is the publication's central, ownable claim, and it is urgent precisely because the age is racing to manufacture minds. The yuga cosmology and the question of acting under uncertainty are supporting context, not the headline. Subscribers buy this worldview, not a topic buffet.

**Tagline (locked):** *"An operating system for consciousness."*

## 4. The engine (already built)

The `write-newsletter` skill (`.agents/skills/write-newsletter/SKILL.md`) is the production pipeline: Thesis → Research (Sonnet) → Draft (Sonnet) → Opus review gate. Essayist intellectual register, third person, 1500–2000 words, named primary sources, steel-manned counter-argument, ends on a specific implication. **Do not rebuild it.** This blueprint is the publication layer that wraps it.

Per-issue mechanics, per the skill:
- Argument arc: thesis → context → tradition's position → strongest objection → response → implication.
- Citation rigor backed by `backend/app/knowledge/kb/claims/*` — cite scoped claims, never restate sensational framings.
- Modern bridge per `modern-bridges` config (simulation theory, game design, consciousness studies).

## 5. Pillar territory map

The four pillars are the *territory* a thesis explores, not a fixed essay structure. Every issue is one thesis that moves across some of them and ends on implication:

| Pillar | Territory | Example angles |
|---|---|---|
| **Genesis** | Metaphysical bedrock from śruti/smṛti/darśana | Ṛta, Brahman/Ātman, the pramāṇas |
| **Civilization** | How an idea built/shaped Indian civilization; what was lost | Inter-darśana debates and why they still matter |
| **Manifestation** | The idea in the modern world via a bridge | Maya vs simulation; karma vs game design |
| **Implication** | What follows for a person living in this age | Decision-making under uncertainty, death, attention, work |

## 6. Warmup slate (5 evergreen pillars — proposed)

Together = a "worldview starter pack" any new reader can be pointed to forever. Each is a runnable `write-newsletter` thesis.

Reordered to front-load the consciousness thread (the publication's spine). The yuga essay stays but moves to supporting position.

0. **Manifesto** — *Sanatana dharma is not a religion to believe but an operating system for consciousness: an account of what a mind is, how reality is structured, and how to act inside it. In an age racing to manufacture minds, it is the most complete map of the one thing the machines do not have.*
1. **The observer & the machine** *(publication-defining; the "observer note" = the sākṣī thread)* — *Sanatana philosophy spent millennia mapping the sākṣī, the witness to whom all experience appears; the race to build sentient AI is the attempt to manufacture an observer, and the two projects reveal what consciousness is by disagreeing about whether it can be made.* Source material: the witness thread already in the corpus (`existentialism-and-vedanta`, `carl-jung-and-vedanta`, `consciousness-hard-problem-vedanta`, `ramana-maharshi-who-am-i`, Gita Ch.13). Research phase surfaces the psychological bridge (Deikman's observing self / DMN; Metzinger's self-model as the steel-man counter). Folds in Maya-as-rendering.
2. **The witness and death** — *The fear of death is a category error the Upanishads diagnosed exactly: the witness fearing the end of what it was only ever watching.* (Elevate the existing `/fear-of-death-advaita-vedanta` site draft.)
3. **Acting without grasping** — *The Gita's "act without attachment to results" is not consolation; it is the only rational decision procedure under genuine uncertainty, a conclusion decision theory reached two millennia later.*
4. **The yuga lens** — *The dharmic account of time as cyclical, not linear: the tradition's own framing of the age we are in, and why a mind formed by it reads "progress" differently.* (Supporting context to the consciousness frame, not the lead.)

## 7. Cadence & calendar

- **Launch (~3 wks):** publish the 5 warmups front-loaded (e.g. manifesto, then 2/wk) to establish the worldview fast.
- **Steady state:** **one flagship essay every two weeks**, with a **distillation** post in the off-week.
- **Idea pipeline:** `/idea-sourcer` → `/content-planner` → `/write-newsletter` → `/write-x-sadhaka`. Keep 10–12 theses queued so writing never starts on empty.
- **Thesis bombs:** 1–2 definitive long essays/year that define the worldview and travel widely.

## 8. Funnel & distribution

- **Channel = X/Notes, not SEO.** Authority comes from essay rigor; acquisition comes from threads.
- **Signature shareable asset:** the **distillation** — a numbered "N distinctions seekers confuse" list pulled from each flagship, produced via `write-x-sadhaka`, posted in off-weeks.
- **Site backbone:** opensadhaka.com hosts the SEO-wrapped mirror and cross-links to Substack; the reference content and the essays reinforce each other.

## 9. Genre pitfalls to avoid (from research)

1. Preachy/devotional drift → mitigated by implication-only.
2. Vagueness / uncited "ancient wisdom" → mitigated by KB claims + named sources.
3. Restated sensational clichés ("Sushruta invented surgery") → mitigated by `kb/claims`.
4. Parasocial-only → mitigated by transferable worldview, Sadhaka brand.
5. No signature format → mitigated by the distillation asset.
6. Topic buffet → mitigated by the single Kali-Yuga lens.

## 10. Launch checklist (Phase 0 → Post #1)

- [ ] Pick tagline + set up Substack publication (Sadhaka brand, About page from §3).
- [ ] Confirm warmup slate (§6) or adjust.
- [ ] `/content-planner` the manifesto → brief for strategic sign-off (positioning, takeaways, flow).
- [ ] `/write-newsletter` the manifesto against brief + KB citations → Opus gate.
- [ ] Mirror to opensadhaka.com with SEO/JSON-LD wrapper (no AEO/FAQ in body).
- [ ] `/write-x-sadhaka` launch thread + first distillation.

## 11. Open items

- Tagline / masthead wording (§3).
- Warmup slate sign-off (§6).
- Free at launch; freemium later (gate archive/community, keep flagship free; ~$6–7/mo). Defer until list volume exists.
- Where the site mirror lives (route + nav registration per CLAUDE.md three-surface rule).
