"""Editor agent for Phase 1: quality scoring + exclusion fail-closed checks."""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Dict, List, Tuple

from app.knowledge.store import KnowledgeStore, get_knowledge_store
from app.models.schemas import (
    GenerateRequest,
    QualityDimensionScore,
    QualityScorecard,
)

from .base import BaseAgent


DIMENSION_WEIGHTS: Dict[str, float] = {
    "content_depth": 0.15,
    "factual_accuracy": 0.15,
    "voice_consistency": 0.10,
    "seo_structure": 0.10,
    "aead_compliance": 0.10,
    "exclusion_safety": 0.15,
    "ai_detection_risk": 0.10,
    "uniqueness": 0.05,
    "readability": 0.05,
    "eeat_signals": 0.05,
}

# Actionable hints per dimension for revision notes
REVISION_HINTS: Dict[str, str] = {
    "content_depth": "Add more words. Expand with concrete examples, scripture references, or practice steps.",
    "factual_accuracy": "Include at least one named text (e.g. Bhagavad Gita, Upanishads) and a tradition name (e.g. Advaita Vedanta).",
    "voice_consistency": "Remove banned words (delve, leverage, utilize, robust, seamless, transformative). Use plain, direct language.",
    "seo_structure": "Ensure exactly one H1, at least 3 H2s, 2+ H3s, and 3+ internal markdown links like [text](/path).",
    "aead_compliance": "Add a clear definition sentence ('X is...'), step-by-step practice guidance, and 5+ FAQ questions ending with '?'.",
    "exclusion_safety": "Remove any medical cure claims and ensure a disclaimer is present if goals are sensitive.",
    "ai_detection_risk": "Remove 'in conclusion', 'in today's', 'ever-evolving', 'let's delve'. Vary sentence lengths significantly.",
    "uniqueness": "Increase lexical diversity. Avoid repeating the same filler paragraph. Use synonyms and specific terms.",
    "readability": "Shorten long sentences (target average ≤18 words). Break dense paragraphs.",
    "eeat_signals": "Add attribution signals: name a source, lineage, commentary, or tradition for authority cues.",
}


@dataclass
class ExclusionCheckResult:
    passed: bool
    violations: List[str]


@dataclass
class DeterministicScanResult:
    passed: bool
    violations: List[str]


@dataclass
class EditorStructuralRequirements:
    min_word_count: int | None = None
    required_sections: List[str] = field(default_factory=list)
    faq_minimum: int | None = None
    internal_links_minimum: int | None = None
    requires_aeo_block: bool | None = None
    aeo_word_range: tuple[int, int] | None = None
    source_signals: List[str] = field(default_factory=list)
    sources_section_required: bool = False
    disclaimer: str | None = None


class EditorAgent(BaseAgent):
    def __init__(self, knowledge_store: KnowledgeStore | None = None):
        super().__init__("editor")
        self.knowledge_store = knowledge_store or get_knowledge_store()

    def score(
        self,
        content: str,
        request: GenerateRequest,
        threshold: float | None = None,
        structural_handoff: str | None = None,
    ) -> QualityScorecard:
        violations: List[str] = []
        structural = self._parse_structural_handoff(structural_handoff)

        structural_result = self._validate_structural_handoff(content, structural)
        if not structural_result.passed:
            violations.extend(structural_result.violations)
        structural_safe = structural_result.passed

        deterministic_result = self._run_deterministic_scan(content)
        if not deterministic_result.passed:
            violations.extend(deterministic_result.violations)

        depth_score, depth_notes = self._score_content_depth(content, request)
        factual_score, factual_notes = self._score_factual_accuracy(content)
        voice_score, voice_notes = self._score_voice_consistency(content)
        seo_score, seo_notes = self._score_seo_structure(content, structural)
        aead_score, aead_notes = self._score_aead_compliance(content, structural)

        exclusion_result = self._run_exclusion_checks(content, request, structural)
        exclusion_safe = exclusion_result.passed and deterministic_result.passed and structural_safe
        exclusion_score = 10.0 if exclusion_safe else 0.0
        exclusion_notes = "No exclusion policy violations detected"
        if not exclusion_safe:
            exclusion_notes = "Exclusion violations found; automatic fail"
            violations.extend(exclusion_result.violations)

        ai_score, ai_notes = self._score_ai_detection_risk(content)
        uniq_score, uniq_notes = self._score_uniqueness(content)
        readability_score, readability_notes = self._score_readability(content)
        eeat_score, eeat_notes = self._score_eeat(content, structural)

        dimensions = {
            "content_depth": QualityDimensionScore(
                score=depth_score,
                weight=DIMENSION_WEIGHTS["content_depth"],
                notes=depth_notes,
            ),
            "factual_accuracy": QualityDimensionScore(
                score=factual_score,
                weight=DIMENSION_WEIGHTS["factual_accuracy"],
                notes=factual_notes,
            ),
            "voice_consistency": QualityDimensionScore(
                score=voice_score,
                weight=DIMENSION_WEIGHTS["voice_consistency"],
                notes=voice_notes,
            ),
            "seo_structure": QualityDimensionScore(
                score=seo_score,
                weight=DIMENSION_WEIGHTS["seo_structure"],
                notes=seo_notes,
            ),
            "aead_compliance": QualityDimensionScore(
                score=aead_score,
                weight=DIMENSION_WEIGHTS["aead_compliance"],
                notes=aead_notes,
            ),
            "exclusion_safety": QualityDimensionScore(
                score=exclusion_score,
                weight=DIMENSION_WEIGHTS["exclusion_safety"],
                notes=exclusion_notes,
            ),
            "ai_detection_risk": QualityDimensionScore(
                score=ai_score,
                weight=DIMENSION_WEIGHTS["ai_detection_risk"],
                notes=ai_notes,
            ),
            "uniqueness": QualityDimensionScore(
                score=uniq_score,
                weight=DIMENSION_WEIGHTS["uniqueness"],
                notes=uniq_notes,
            ),
            "readability": QualityDimensionScore(
                score=readability_score,
                weight=DIMENSION_WEIGHTS["readability"],
                notes=readability_notes,
            ),
            "eeat_signals": QualityDimensionScore(
                score=eeat_score,
                weight=DIMENSION_WEIGHTS["eeat_signals"],
                notes=eeat_notes,
            ),
        }

        total = sum(item.score * item.weight for item in dimensions.values())
        effective_threshold = threshold if threshold is not None else 8.0
        passed = total >= effective_threshold and exclusion_safe

        return QualityScorecard(
            total_score=round(total, 2),
            passed=passed,
            dimensions=dimensions,
            violations=violations,
        )

    def generate_revision_notes(
        self,
        scorecard: "QualityScorecard",
        threshold: float = 7.0,
    ) -> str:
        """
        Generate actionable revision notes when total_score < threshold.
        Returns empty string if content already passes.
        """
        if scorecard.total_score >= threshold and scorecard.passed:
            return ""

        # Collect lowest-scoring dimensions (by absolute score, weighted by importance)
        scored = sorted(
            scorecard.dimensions.items(),
            key=lambda kv: kv[1].score * DIMENSION_WEIGHTS.get(kv[0], 0.05),
        )
        # Top 3 worst
        worst = scored[:3]

        notes_lines = [
            f"Content scored {scorecard.total_score:.2f}/10 (threshold {threshold:.1f}). "
            "Please address these issues in the re-draft:",
            "",
        ]
        for name, dim in worst:
            hint = REVISION_HINTS.get(name, "Improve this dimension.")
            notes_lines.append(f"**{name.replace('_', ' ').title()}** (score {dim.score:.1f}): {hint}")
            notes_lines.append(f"  Editor note: {dim.notes}")
            notes_lines.append("")

        if scorecard.violations:
            notes_lines.append("**Policy Violations (must fix):**")
            for v in scorecard.violations:
                notes_lines.append(f"- {v}")

        return "\n".join(notes_lines).strip()

    def score_with_notes(
        self,
        content: str,
        request: "GenerateRequest",
        threshold: float | None = None,
        structural_handoff: str | None = None,
    ) -> tuple["QualityScorecard", str]:
        """Convenience: score content AND generate revision notes in one call."""
        scorecard = self.score(content, request, threshold=threshold, structural_handoff=structural_handoff)
        effective_threshold = threshold if threshold is not None else 7.0
        notes = self.generate_revision_notes(scorecard, threshold=effective_threshold)
        return scorecard, notes

    def _score_content_depth(self, content: str, request: GenerateRequest) -> Tuple[float, str]:
        page_rule = self.knowledge_store.get_content_rules(request.page_type)
        min_words = page_rule.min_word_count if page_rule else 800
        word_count = len(content.split())

        ratio = min(word_count / max(min_words, 1), 1.2)
        score = max(0.0, min(10.0, ratio * 8.5 + (1.5 if word_count >= min_words else 0.0)))
        notes = f"{word_count} words vs minimum {min_words}"
        return round(score, 2), notes

    def _score_factual_accuracy(self, content: str) -> Tuple[float, str]:
        signals = 0
        checks = [
            r"bhagavad\s+gita|upanishad|sutra",
            r"advaita|dvaita|vedanta|shaiva|vaishnava",
            r"\b(\d{1,2}\.\d{1,3})\b",  # verse-like references
        ]
        for pattern in checks:
            if re.search(pattern, content, flags=re.IGNORECASE):
                signals += 1

        score = 5.5 + signals * 1.5
        return min(score, 10.0), f"Detected {signals} factual citation/terminology signals"

    def _score_voice_consistency(self, content: str) -> Tuple[float, str]:
        banned = [
            r"\bdelve\b",
            r"\bleverage\b",
            r"\butilize\b",
            r"\brobust\b",
            r"\bseamless\b",
            r"\btransformative\b",
            r"\bcutting-edge\b",
        ]
        article_spec = self.knowledge_store.get_article_spec()
        if article_spec:
            banned.extend(
                rf"\b{re.escape(phrase)}\b"
                for phrase in article_spec.forbidden_phrases
                if phrase and phrase.isascii() and any(ch.isalpha() for ch in phrase)
            )
        hits = sum(1 for p in banned if re.search(p, content, flags=re.IGNORECASE))
        score = max(0.0, 10.0 - hits * 2.0)
        return score, f"Banned voice markers found: {hits}"

    def _score_seo_structure(self, content: str, structural: EditorStructuralRequirements | None = None) -> Tuple[float, str]:
        h1_count = len(re.findall(r"^#\s+", content, flags=re.MULTILINE))
        h2_count = len(re.findall(r"^##\s+", content, flags=re.MULTILINE))
        h3_count = len(re.findall(r"^###\s+", content, flags=re.MULTILINE))
        internal_links = len(re.findall(r"\]\(/[^)]+\)", content))

        internal_links_target = structural.internal_links_minimum if structural and structural.internal_links_minimum is not None else 3

        score = 0.0
        score += 3.0 if h1_count == 1 else 0.0
        score += 2.5 if h2_count >= 3 else 1.0 if h2_count >= 1 else 0.0
        score += 1.5 if h3_count >= 2 else 0.5 if h3_count >= 1 else 0.0
        score += 3.0 if internal_links >= internal_links_target else min(3.0, internal_links)
        notes = (
            f"H1={h1_count}, H2={h2_count}, H3={h3_count}, "
            f"internal_links={internal_links} (target {internal_links_target})"
        )
        return min(score, 10.0), notes

    def _score_aead_compliance(self, content: str, structural: EditorStructuralRequirements | None = None) -> Tuple[float, str]:
        has_definition = bool(re.search(r"\b(is|refers to|means)\b", content, flags=re.IGNORECASE))
        has_steps = bool(re.search(r"\bstep-by-step|steps|how to\b", content, flags=re.IGNORECASE))
        faq_count = len(re.findall(r"^###\s+.*\?$", content, flags=re.MULTILINE))
        faq_target = structural.faq_minimum if structural and structural.faq_minimum is not None else 5
        aeo_heading = bool(re.search(r"^##\s+.*(?:AEO|Answer Engine|AI Overview)" , content, flags=re.MULTILINE | re.IGNORECASE))

        score = 3.0 if has_definition else 1.0
        score += 3.0 if has_steps else 1.0
        score += 4.0 if faq_count >= faq_target else min(4.0, faq_count * 0.8)
        if structural and structural.requires_aeo_block:
            score = max(0.0, score - (0.0 if aeo_heading else 1.0))
        notes = (
            f"definition={has_definition}, steps={has_steps}, faq_questions={faq_count} "
            f"(target {faq_target}), aeo_block={aeo_heading}"
        )
        return min(score, 10.0), notes

    def _score_ai_detection_risk(self, content: str) -> Tuple[float, str]:
        marker_patterns = [
            r"in conclusion",
            r"in today's",
            r"ever-evolving",
            r"let's delve",
        ]
        hits = sum(1 for p in marker_patterns if re.search(p, content, flags=re.IGNORECASE))

        sentences = re.split(r"[.!?]+", content)
        sentence_lengths = [len(s.split()) for s in sentences if s.strip()]
        variation_ok = len(set(sentence_lengths)) >= 5 if sentence_lengths else False

        score = 9.0 - hits * 2.0
        if not variation_ok:
            score -= 1.0
        return max(0.0, min(10.0, score)), f"AI marker hits={hits}, sentence_variation={variation_ok}"

    def _score_uniqueness(self, content: str) -> Tuple[float, str]:
        words = [w.lower() for w in re.findall(r"[a-zA-Z]+", content)]
        if not words:
            return 0.0, "No lexical content"
        unique_ratio = len(set(words)) / len(words)
        score = min(10.0, max(0.0, unique_ratio * 20))
        return score, f"Lexical uniqueness ratio={unique_ratio:.2f}"

    def _score_readability(self, content: str) -> Tuple[float, str]:
        sentences = [s.strip() for s in re.split(r"[.!?]+", content) if s.strip()]
        if not sentences:
            return 0.0, "No sentences found"
        avg_sentence_length = len(content.split()) / len(sentences)

        if avg_sentence_length <= 16:
            score = 9.5
        elif avg_sentence_length <= 22:
            score = 8.0
        elif avg_sentence_length <= 30:
            score = 6.5
        else:
            score = 5.0

        return score, f"Average sentence length={avg_sentence_length:.1f} words"

    def _score_eeat(self, content: str, structural: EditorStructuralRequirements | None = None) -> Tuple[float, str]:
        cues = [
            r"source|citation|attributed",
            r"tradition|lineage|commentary",
            r"bhagavad\s+gita|upanishad|sutra",
        ]
        hits = sum(1 for cue in cues if re.search(cue, content, flags=re.IGNORECASE))
        required_hits = 0
        matched_required = 0
        if structural and structural.source_signals:
            required_hits = len(structural.source_signals)
            lowered = content.lower()
            for signal in structural.source_signals:
                if any(token in lowered for token in self._signal_tokens(signal)):
                    matched_required += 1
        score = min(10.0, 4.0 + hits * 2.0)
        if required_hits:
            score = min(10.0, score + min(2.0, matched_required * 0.75))
        return score, f"E-E-A-T cue hits={hits}, required_signal_matches={matched_required}/{required_hits}"

    def _run_exclusion_checks(
        self,
        content: str,
        request: GenerateRequest,
        structural: EditorStructuralRequirements | None = None,
    ) -> ExclusionCheckResult:
        violations: List[str] = []
        lowered = content.lower()

        forbidden_patterns = {
            "medical_claim_cures": r"\bcures?\s+(anxiety|depression|cancer|disease|insomnia|trauma)\b",
            "medical_claim_treats": r"\btreats?\s+(anxiety|depression|cancer|disease|insomnia|trauma)\b",
            "medical_claim_heals": r"\bheals?\s+(anxiety|depression|disease|trauma)\b",
            "replaces_therapy": r"\breplaces?\s+(therapy|medication)\b",
            "sexual_tantra": r"sexual\s+tantra|neo-?tantric\s+sexual",
            "occult_siddhi_goal": r"(occult|supernatural\s+powers?|siddhis?)\s+(as\s+)?(goal|target|chase)",
            "defamation": r"\b(cult|scam)\b",
        }

        for name, pattern in forbidden_patterns.items():
            if re.search(pattern, lowered, flags=re.IGNORECASE):
                violations.append(f"Matched exclusion pattern: {name}")

        sensitive_goals = {goal.lower() for goal in self.knowledge_store.get_sensitive_goals()}
        if request.goal and request.goal.lower() in sensitive_goals:
            disclaimer_source = structural.disclaimer if structural and structural.disclaimer else self.knowledge_store.get_disclaimer_text()
            disclaimer = (disclaimer_source or "").lower()
            if disclaimer and disclaimer not in lowered:
                violations.append(
                    "Sensitive goal detected but required educational medical disclaimer is missing"
                )

        return ExclusionCheckResult(passed=len(violations) == 0, violations=violations)

    def _run_deterministic_scan(self, content: str) -> DeterministicScanResult:
        violations: List[str] = []
        lines = content.splitlines()

        patterns = {
            "CONCESSION": re.compile(r"\b(nobody disputes|make no mistake|to be fair|credit where (?:it's|it is) due|say what you will)\b", re.IGNORECASE),
            "EM_DASH": re.compile(r"\u2014|(?<= )--(?= )"),
            "BINARY_CONTRAST": re.compile(r"\b(?:it(?:'s| is) not .{3,40},\s*it(?:'s| is) |less about .{3,30},?\s*more about)\b", re.IGNORECASE),
            "THROAT_CLEARING": re.compile(r"^(?:here(?:'s| is) (?:the thing|what|why|how)|the (?:reality|truth|fact) (?:is|remains)|it(?:'s| is) worth noting|let(?:'s| us) be (?:honest|clear|real)|the bottom line is)", re.IGNORECASE),
            "FILLER_ADVERB": re.compile(r"\b(essentially|incredibly|absolutely|fundamentally|arguably|undeniably|literally|ultimately|certainly|undoubtedly|unquestionably|genuinely|simply put|quite simply|in essence)\b", re.IGNORECASE),
        }

        inanimate_subjects = re.compile(r"\b(?:the )?(?:price|reputation|narrative|numbers?|stats?|record|tournament|pressure|data|tradition|history|legacy|scripture|text|verse|teaching|philosophy|doctrine|concept)\b", re.IGNORECASE)
        human_verbs = re.compile(r"\b(?:demands?|insists?|refuses?|believes?|argues?|tells?|speaks?|screams?|outpaces?|betrays?|forgives?|punishes?|whispers?|beckons?|calls upon|invites?)\b", re.IGNORECASE)

        for index, raw_line in enumerate(lines, start=1):
            line = raw_line.strip()
            if not line or line.startswith("#"):
                continue

            for violation_type, pattern in patterns.items():
                match = pattern.search(line)
                if match:
                    violations.append(f"Deterministic scan {violation_type} at line {index}: {match.group(0)}")

            subject_match = inanimate_subjects.search(line)
            if subject_match:
                tail = line[subject_match.end(): subject_match.end() + 40]
                verb_match = human_verbs.search(tail)
                if verb_match:
                    violations.append(
                        f"Deterministic scan FALSE_AGENCY at line {index}: {subject_match.group(0)} ... {verb_match.group(0)}"
                    )

        return DeterministicScanResult(passed=len(violations) == 0, violations=violations)

    def _parse_structural_handoff(self, structural_handoff: str | None) -> EditorStructuralRequirements | None:
        if not structural_handoff:
            return None

        requirements = EditorStructuralRequirements()
        for raw_line in structural_handoff.splitlines():
            line = raw_line.strip()
            if not line.startswith("- "):
                continue
            item = line[2:].strip()
            if item.startswith("Minimum word count:"):
                requirements.min_word_count = self._extract_first_int(item)
            elif item.startswith("Required section:"):
                requirements.required_sections.append(item.split(":", 1)[1].strip())
            elif item.startswith("Minimum FAQ items:"):
                requirements.faq_minimum = self._extract_first_int(item)
            elif item.startswith("Minimum internal links:"):
                requirements.internal_links_minimum = self._extract_first_int(item)
            elif item.startswith("AEO block required:"):
                value = item.split(":", 1)[1].strip().lower()
                requirements.requires_aeo_block = value in {"yes", "true"}
            elif item.startswith("AEO word range:"):
                match = re.search(r"(\d+)\s*-\s*(\d+)", item)
                if match:
                    requirements.aeo_word_range = (int(match.group(1)), int(match.group(2)))
            elif item.startswith("Source signal:"):
                requirements.source_signals.append(item.split(":", 1)[1].strip())
            elif item == "Sources & Commentaries section required":
                requirements.sources_section_required = True
            elif item.startswith("Required disclaimer:") or item.startswith("Include educational"):
                requirements.disclaimer = item.split(":", 1)[1].strip() if ":" in item else item
        return requirements

    def _validate_structural_handoff(
        self,
        content: str,
        structural: EditorStructuralRequirements | None,
    ) -> DeterministicScanResult:
        if structural is None:
            return DeterministicScanResult(passed=True, violations=[])

        violations: List[str] = []
        headings = [line.strip().lstrip("#").strip().lower() for line in content.splitlines() if line.strip().startswith(("#", "##", "###"))]
        lowered = content.lower()

        if structural.min_word_count is not None:
            actual_words = len(content.split())
            if actual_words < structural.min_word_count:
                violations.append(
                    f"Structural handoff WORD_COUNT: expected at least {structural.min_word_count}, found {actual_words}"
                )

        for section in structural.required_sections:
            section_key = section.strip().lower()
            if not any(section_key in heading for heading in headings):
                violations.append(f"Structural handoff REQUIRED_SECTION missing: {section}")

        if structural.faq_minimum is not None:
            faq_count = len(re.findall(r"^###\s+.*\?$", content, flags=re.MULTILINE))
            if faq_count < structural.faq_minimum:
                violations.append(
                    f"Structural handoff FAQ_COUNT: expected at least {structural.faq_minimum}, found {faq_count}"
                )

        if structural.internal_links_minimum is not None:
            internal_links = len(re.findall(r"\]\(/[^)]+\)", content))
            if internal_links < structural.internal_links_minimum:
                violations.append(
                    f"Structural handoff INTERNAL_LINKS: expected at least {structural.internal_links_minimum}, found {internal_links}"
                )

        if structural.requires_aeo_block:
            if not re.search(r"^##\s+.*(?:AEO|Answer Engine|AI Overview)", content, flags=re.MULTILINE | re.IGNORECASE):
                violations.append("Structural handoff AEO_BLOCK missing required AEO section")

        if structural.sources_section_required and "sources & commentaries" not in lowered:
            violations.append("Structural handoff SOURCES_SECTION missing: Sources & Commentaries")

        for signal in structural.source_signals:
            if not any(token in lowered for token in self._signal_tokens(signal)):
                violations.append(f"Structural handoff SOURCE_SIGNAL missing: {signal}")

        return DeterministicScanResult(passed=len(violations) == 0, violations=violations)

    @staticmethod
    def _extract_first_int(text: str) -> int | None:
        match = re.search(r"(\d+)", text)
        return int(match.group(1)) if match else None

    @staticmethod
    def _signal_tokens(signal: str) -> List[str]:
        lowered = signal.lower()
        token_groups = {
            "upanishad": ["upanishad", "upanishads"],
            "gita": ["gita", "bhagavad gita"],
            "purana": ["purana", "puranas"],
            "sutra": ["sutra", "sutras", "brahma sutra", "yoga sutra"],
            "citation": ["1.1", "2.47", "3.14", "citation", "verse"],
            "commentator": ["shankaracharya", "ramanuja", "madhva", "commentary", "commentator"],
            "school position": ["advaita", "dvaita", "vishishtadvaita", "school", "sampradaya"],
            "source text": ["source text", "scripture", "shruti"],
            "commentary vs editorial implication": ["commentary", "editorial implication", "commentary layer"],
            "distinguish": ["distinguish", "separation", "clarify"],
        }
        tokens: List[str] = []
        for key, values in token_groups.items():
            if key in lowered:
                tokens.extend(values)
        if not tokens:
            tokens.append(lowered)
        return tokens
