---
slug: fibonacci-virahanka-attribution
title: "Did Pingala / India discover the Fibonacci sequence?"
type: claim
aliases: [fibonacci india, virahanka numbers, hemachandra numbers, matra meru fibonacci]
updated: 2026-04-09
confidence: high
claim_type: attributive
status: partially-supported
scope: "Where, in the Indian prosody tradition, the recurrence now called the Fibonacci sequence actually appears — and under whose name."
anchors:
  texts: [chandas-sutra]
  people: [pingala, virahanka, hemachandra, halayudha]
  concepts: [meru-prastara, chandas-binary-patterns]
sources:
  - "Parmanand Singh, 'The so-called Fibonacci numbers in ancient and medieval India', Historia Mathematica 12 (1985) — the definitive modern scholarly treatment"
  - "Kim Plofker, Mathematics in India: 500 BCE – 1800 CE, Princeton 2009"
  - "Donald E. Knuth, The Art of Computer Programming, vol. 1, historical notes on Fibonacci"
---

## Plain-language statement

The sequence 1, 1, 2, 3, 5, 8, 13, 21... — in which each term is the sum of the previous two — appears explicitly in the Indian prosody tradition centuries before Leonardo of Pisa ("Fibonacci") wrote the Liber Abaci in 1202 CE. But the attribution chain is Pingala → Virahanka → Gopala → Hemachandra, not "Pingala invented Fibonacci." The recurrence is clearest in Virahanka (~6th–8th c. CE) and crystallizes by Hemachandra (12th c. CE).

## Decomposed sub-claims

1. **"The recurrence F(n) = F(n-1) + F(n-2) appears in the Indian prosody tradition before Fibonacci."** — **Supported.** The problem that generates it is: given syllables of duration 1 (laghu) and duration 2 (guru), how many metrical patterns have total duration n? The answer satisfies exactly this recurrence.
2. **"The recurrence appears explicitly in Pingala's own sutras."** — **Not supported.** Pingala's sutras articulate the enumeration problem but the recurrence itself is not explicit in Pingala alone. It becomes explicit in later writers in the tradition.
3. **"Virahanka states the recurrence explicitly."** — **Supported.** Virahanka (~6th–8th c. CE) articulates the recurrence for counting matra-vritta patterns. This is the earliest unambiguous statement in the tradition.
4. **"Hemachandra (1150 CE) states the recurrence."** — **Supported.** Hemachandra's Chandonushasana gives the sequence and recurrence explicitly, ~50 years before Fibonacci's Liber Abaci.
5. **"Fibonacci was aware of the Indian tradition."** — **Not supported.** Fibonacci learned mathematics from Arab sources and independently arrived at the sequence via the rabbit-population problem. There is no evidence he knew the Indian prosody tradition.
6. **"The sequence should be renamed 'Hemachandra numbers' or 'Virahanka numbers'."** — **Scholarly preference, not consensus.** Some historians (e.g., Parmanand Singh) argue for dual attribution; others retain "Fibonacci" as a convention. The correct move is to name the chain when the context demands historical accuracy.

## Evidence for

- **Primary**: Virahanka's treatise on matra-vritta; Hemachandra's Chandonushasana.
- **Secondary commentary**: Halayudha's 10th-c. commentary on Pingala preserves and elaborates the enumerative machinery that the recurrence sits inside.
- **Modern scholarship**:
  - Parmanand Singh's 1985 Historia Mathematica paper is the authoritative treatment — the title, "The so-called Fibonacci numbers in ancient and medieval India," is deliberate.
  - Plofker's Mathematics in India discusses the chain with appropriate care.
  - Knuth's historical notes acknowledge the Indian precedence.

## Evidence against / counterpoints

- The recurrence is *not* in Pingala's sutras themselves — collapsing Virahanka/Hemachandra into "Pingala" is the specific move historians push back against.
- Fibonacci's own derivation (rabbit problem, 1202) is independent and context-specific. Claiming "Fibonacci copied from India" overstates — there is no transmission evidence.
- The sequence also appears in other early contexts (al-Khwarizmi-era Arabic mathematics references adjacent ideas); Indian priority is genuine but not sole.

## Scope boundaries

- This claim is **not** about whether the sequence appears in India. It does, clearly, and earlier than Fibonacci.
- This claim is **not** denying Fibonacci's independent discovery in 1202 CE.
- This claim **is** about correctly naming who articulated what, when, and distinguishing "Pingala invented it" (overreach) from "Virahanka and Hemachandra articulated it centuries before Fibonacci" (accurate).

## Reusable examples

- **The matra-vritta problem.** How many metrical patterns of total duration 5 exist, if a laghu has duration 1 and a guru has duration 2? Enumerate: the patterns are LLLLL, LLLG, LLGL, LGLL, GLLL, LGG, GLG, GGL — that's 8, which is F(6) = 8. This is the problem that generates the sequence.
- **The recurrence as stated by Virahanka.** "The number of patterns of duration n is the sum of the patterns of duration n-1 (append a laghu) and the patterns of duration n-2 (append a guru)." This is exactly the Fibonacci recurrence, stated in a prosody context.
- **Hemachandra's timing.** ~1150 CE, about half a century before Fibonacci's Liber Abaci (1202 CE). The Indian articulation precedes the European one, demonstrably.

## When this claim matters

- When a reader asks "did India discover Fibonacci before Fibonacci."
- When writing about the history of the sequence, in threads, articles, or newsletter essays.
- When credibility is on the line: this is one of the clearest cases where the accurate story is *more* impressive than the overblown version, because the attribution chain itself is elegant.
