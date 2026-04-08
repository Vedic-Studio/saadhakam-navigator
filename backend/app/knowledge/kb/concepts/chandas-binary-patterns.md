---
slug: chandas-binary-patterns
title: Chandas binary patterns (laghu/guru enumeration)
type: concept
aliases: [laghu guru binary, pingala binary, chandas binary]
updated: 2026-04-09
confidence: medium
home_tradition: chandas
primary_texts: [chandas-sutra]
sources:
  - "Parmanand Singh, 'The so-called Fibonacci numbers in ancient and medieval India', Historia Mathematica 12 (1985)"
  - "Donald E. Knuth, TAOCP and related historical notes on Indian prosody"
---

## Definition

In Sanskrit prosody, every syllable is classified as either **laghu** (short) or **guru** (long). A metrical line of *n* syllables is therefore a sequence of *n* binary choices. The prosody tradition — starting with Pingala's [Chandas Sutra](../texts/chandas-sutra.md) — develops systematic procedures for listing, counting, and reasoning about these binary-valued sequences.

## Where it appears

- **Pratyaya rules in the Chandas Sutra** — the pratyaya procedures (prastara, nasta, uddista, lagakriya, sankhya, adhvayoga, as elaborated in Halayudha's commentary) are the operational machinery for generating and counting patterns
- The combinatorial problem is inherent in the subject matter: any system that enumerates binary-valued sequences is structurally binary

## Interpretive history

- **Ancient prosodic context**: the binary classification is a tool of the trade — a way to classify and teach metrical patterns systematically
- **Modern history of mathematics**: sees the procedures as an early articulation of combinatorial generation — generating patterns of length *n* from patterns of length *n–1*, a recurrence now standard in discrete mathematics
- **Popular reception**: tends to collapse the structural point into "Pingala invented binary numbers," which overstates the claim

## Modern bridges

- **Binary enumeration as a design discipline**: the chandas tradition treats "list every admissible pattern" as a first-class problem, the same instinct behind modern combinatorial algorithms. *Breaks because* the prosodists had no formal machine model to compare against.
- **Bit strings**: mapping laghu → 0 and guru → 1 produces a set of bit strings, which is structurally what modern binary-sequence analysis handles. *Breaks because* bit strings in modern computing are positional representations of *numbers*, whereas laghu/guru sequences in chandas are representations of *metrical patterns* — they count *how many patterns exist*, not "what number a pattern encodes."

## Category errors to avoid

- **"Pingala invented binary numbers."** The enumerative structure is binary-like, and there are real procedures for listing and counting patterns, but a *positional binary number system* in the modern sense is a different thing. See the [Pingala binary numbers claim](../claims/pingala-binary-numbers-claim.md) for the full decomposition.
- **"Pingala anticipated computer science."** He developed enumerative procedures that are historically important for combinatorics; "computer science" as a field has its own specific history.
- **"The binary-ness is just a coincidence."** It is not a coincidence — two-valued classification is a real structural feature, and reasoning about sets of two-valued sequences is substantive mathematics. The error is in the direction of the claim (overclaiming), not in the existence of the structure.

## Related concepts

- [Meru-prastara](meru-prastara.md) — the triangular arrangement of binomial coefficients that emerges from counting these patterns
