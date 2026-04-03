"""Research Agent — builds a structured ResearchBrief from the KnowledgeStore for the Writer."""

from __future__ import annotations

import json
import re
from dataclasses import asdict, dataclass, field
from typing import Dict, List, Optional

from app.agents.base import BaseAgent
from app.agents.orchestrator import PipelineConfig
from app.knowledge.store import KnowledgeStore, get_knowledge_store


# ---------------------------------------------------------------------------
# ResearchBrief
# ---------------------------------------------------------------------------

@dataclass
class ResearchBrief:
    """
    Structured synthesis for one pipeline run, passed from Research → Writer.
    Targets <2000 tokens when serialised as text.
    """
    topic: str
    page_type: str
    context_module: str
    description: Optional[str] = None
    reference_links: List[str] = field(default_factory=list)
    key_angles: List[str] = field(default_factory=list)
    source_notes: Optional[str] = None

    # Content rules for this page type
    min_word_count: int = 900
    required_sections: List[str] = field(default_factory=list)

    # Voice config
    voice_tone: str = "warm, clear, tradition-rooted, modern-applicable"
    voice_weights: Dict[str, float] = field(default_factory=lambda: {
        "clarity": 0.35,
        "depth": 0.30,
        "warmth": 0.20,
        "authority": 0.15,
    })
    anti_patterns: List[str] = field(default_factory=list)

    # Knowledge excerpts
    techniques: List[Dict[str, str]] = field(default_factory=list)    # up to 5
    sensitive_goals: List[str] = field(default_factory=list)
    disclaimer_text: Optional[str] = None

    # Competitor patterns to be aware of / avoid / improve upon
    competitor_insights: List[str] = field(default_factory=list)     # up to 4
    context_pack_label: Optional[str] = None
    context_pack_summary: Optional[str] = None
    context_doc_paths: List[str] = field(default_factory=list)
    article_requirements: List[str] = field(default_factory=list)
    forbidden_phrases: List[str] = field(default_factory=list)

    def to_editor_structural_handoff(self, goal: Optional[str] = None) -> str:
        """Compact structural contract for the editor to validate before full scoring."""
        faq_minimum = self._extract_numeric_requirement("Minimum FAQ items")
        internal_links = self._extract_numeric_requirement("Minimum internal links")
        aeo_required = self._extract_boolean_requirement("AEO block required")
        aeo_word_range = self._extract_range_requirement("AEO word range")
        reference_template = self._extract_text_requirement("Reference template")

        lines = [
            f"# Editor Structural Handoff: {self.topic}",
            f"- Page type: {self.page_type}",
            f"- Context module: {self.context_module}",
            f"- Minimum word count: {self.min_word_count}",
            *( [f"- Goal: {goal}"] if goal else []),
            "",
            *self._intake_context_lines(),
            "## Required Structure",
            "- Exactly one H1",
            *[f"- Required section: {section}" for section in self.required_sections],
            *( [f"- Minimum FAQ items: {faq_minimum}"] if faq_minimum is not None else []),
            *( [f"- Minimum internal links: {internal_links}"] if internal_links is not None else []),
            *( [f"- AEO block required: {'yes' if aeo_required else 'no'}"] if aeo_required is not None else []),
            *(
                [f"- AEO word range: {aeo_word_range[0]}-{aeo_word_range[1]}"]
                if aeo_word_range is not None else []
            ),
            *( [f"- Reference template: {reference_template}"] if reference_template else []),
            "",
            "## Required Signals",
            *[f"- Source signal: {signal}" for signal in self._source_signals()],
            *( ["- Sources & Commentaries section required"] if self._sources_section_required() else []),
            "",
            "## Guardrails",
            *[f"- Avoid phrase: {item}" for item in self.forbidden_phrases[:10]],
            *[f"- Avoid voice anti-pattern: {item}" for item in self.anti_patterns[:8]],
        ]

        disclaimer = self.disclaimer_requirement(goal)
        if disclaimer:
            lines += ["", "## Disclaimer Requirement", f"- {disclaimer}"]

        return "\n".join(lines).strip()

    def to_writer_handoff(self, goal: Optional[str] = None) -> str:
        """Compact first-pass handoff for the writer prompt."""
        lines = [
            f"# Writer Handoff: {self.topic}",
            f"- Page type: {self.page_type}",
            f"- Context module: {self.context_module}",
            f"- Minimum word count: {self.min_word_count}",
            f"- Tone: {self.voice_tone}",
            *( [f"- Goal: {goal}"] if goal else []),
            "",
            *self._intake_context_lines(),
            "## Must Include",
            *[f"- Section: {section}" for section in self.required_sections],
            *[f"- Requirement: {item}" for item in self.article_requirements],
            *( [f"- Context summary: {self.context_pack_summary}"] if self.context_pack_summary else []),
            "",
            "## Must Avoid",
            *[f"- Phrase: {item}" for item in self.forbidden_phrases[:10]],
            *[f"- Voice anti-pattern: {item}" for item in self.anti_patterns[:8]],
            "",
        ]

        if self.techniques:
            lines += [
                "## Apply These Techniques",
                *[
                    f"- {item.get('text', '')}"
                    for item in self.techniques[:3]
                    if item.get("text")
                ],
                "",
            ]

        if self.competitor_insights:
            lines += [
                "## Opportunity Gaps",
                *[f"- {item}" for item in self.competitor_insights[:2]],
                "",
            ]

        disclaimer = self.disclaimer_requirement(goal)
        if disclaimer:
            lines += [
                "## Disclaimer Requirement",
                f"- {disclaimer}",
                "",
            ]

        return "\n".join(lines).strip()

    def to_retry_handoff(self, goal: Optional[str] = None) -> str:
        """Minimal immutable constraints for rewrite attempts."""
        lines = [
            f"# Retry Constraints: {self.topic}",
            f"- Page type: {self.page_type}",
            f"- Minimum word count: {self.min_word_count}",
            "",
            *self._intake_context_lines(),
            "## Keep True In The Rewrite",
            *[f"- Maintain section coverage for: {section}" for section in self.required_sections],
            *[f"- Keep requirement: {item}" for item in self.article_requirements[:4]],
            *[f"- Avoid phrase: {item}" for item in self.forbidden_phrases[:8]],
            *[f"- Avoid voice marker: {item}" for item in self.anti_patterns[:6]],
        ]

        disclaimer = self.disclaimer_requirement(goal)
        if disclaimer:
            lines.append(f"- Required disclaimer: {disclaimer}")

        return "\n".join(lines).strip()

    def build_revision_packet(self, draft: str, revision_notes: str) -> str:
        """Targeted retry packet: preserve structure, then fix only failed areas."""
        return self.build_retry_packet(draft=draft, revision_notes=revision_notes)

    def build_retry_packet(
        self,
        *,
        draft: str,
        revision_notes: str,
        goal: Optional[str] = None,
        retry_handoff: Optional[str] = None,
    ) -> str:
        """Normalized rewrite packet with immutable constraints + targeted fixes."""
        headings = self._extract_headings(draft)
        preserved_sections = headings[:8]
        internal_links = len(re.findall(r"\]\(/[^)]+\)", draft))
        immutable_constraints = retry_handoff or self.to_retry_handoff(goal=goal)

        lines = [
            f"# Retry Packet: {self.topic}",
            "## Immutable Constraints",
            immutable_constraints,
            "",
            "## Preserve Where Possible",
            *([f"- Keep heading: {heading}" for heading in preserved_sections] or ["- Preserve any accurate structure already present"]),
            f"- Preserve or improve internal links count (currently {internal_links})",
            "",
            "## Fix These Issues",
            revision_notes.strip(),
        ]
        return "\n".join(lines).strip()

    def disclaimer_requirement(self, goal: Optional[str] = None) -> Optional[str]:
        if not goal:
            return None
        if goal.lower() not in {item.lower() for item in self.sensitive_goals}:
            return None
        return self.disclaimer_text or "Include educational medical disclaimer."

    @staticmethod
    def _extract_headings(content: str) -> List[str]:
        return [
            line.strip()
            for line in content.splitlines()
            if line.strip().startswith(("# ", "## ", "### "))
        ]

    def _extract_numeric_requirement(self, prefix: str) -> Optional[int]:
        for item in self.article_requirements:
            if item.startswith(f"{prefix}:"):
                match = re.search(r"(\d+)", item)
                if match:
                    return int(match.group(1))
        return None

    def _extract_boolean_requirement(self, prefix: str) -> Optional[bool]:
        for item in self.article_requirements:
            if item.startswith(f"{prefix}:"):
                value = item.split(":", 1)[1].strip().lower()
                if value in {"yes", "true"}:
                    return True
                if value in {"no", "false"}:
                    return False
        return None

    def _extract_range_requirement(self, prefix: str) -> Optional[tuple[int, int]]:
        for item in self.article_requirements:
            if item.startswith(f"{prefix}:"):
                match = re.search(r"(\d+)\s*-\s*(\d+)", item)
                if match:
                    return int(match.group(1)), int(match.group(2))
        return None

    def _extract_text_requirement(self, prefix: str) -> Optional[str]:
        for item in self.article_requirements:
            if item.startswith(f"{prefix}:"):
                return item.split(":", 1)[1].strip() or None
        return None

    def _source_signals(self) -> List[str]:
        structural_signals = []
        for item in self.article_requirements:
            normalized = item.strip().lower()
            if ":" not in item and "sources & commentaries section" not in normalized:
                structural_signals.append(item)
        return structural_signals

    def _sources_section_required(self) -> bool:
        return any(
            requirement.strip().lower() == "sources & commentaries section"
            for requirement in self.article_requirements
        )

    def to_text(self) -> str:
        """Format the brief as a compact markdown block for the Writer system prompt."""
        lines = [
            f"# Research Brief: {self.topic}",
            f"**Page type:** {self.page_type}  |  **Context:** {self.context_module}",
            f"**Min words:** {self.min_word_count}  |  **Tone:** {self.voice_tone}",
            "",
            *self._intake_context_lines(),
            "## Required Sections",
            *[f"- {s}" for s in self.required_sections],
            "",
            "## Voice Anti-Patterns (avoid these words/phrases)",
            *[f"- {p}" for p in self.anti_patterns],
            "",
            "## Voice Weights",
            *[f"- {k}: {int(v * 100)}%" for k, v in self.voice_weights.items()],
            "",
        ]

        if self.techniques:
            lines += [
                "## Writing Techniques to Apply",
                *[f"- [{t.get('source', '?')} / {t.get('type', '?')}] {t.get('text', '')}"
                  for t in self.techniques],
                "",
            ]

        if self.competitor_insights:
            lines += [
                "## Competitor Pattern Gaps to Exploit",
                *[f"- {insight}" for insight in self.competitor_insights],
                "",
            ]

        if self.context_pack_label or self.context_pack_summary:
            lines += [
                "## Context Pack",
                *( [f"- Label: {self.context_pack_label}"] if self.context_pack_label else []),
                *( [f"- Summary: {self.context_pack_summary}"] if self.context_pack_summary else []),
                *[f"- Doc: {path}" for path in self.context_doc_paths],
                "",
            ]

        if self.article_requirements:
            lines += [
                "## Sadhaka Article Requirements",
                *[f"- {item}" for item in self.article_requirements],
                "",
            ]

        if self.forbidden_phrases:
            lines += [
                "## Hard-ban Phrases",
                *[f"- {item}" for item in self.forbidden_phrases],
                "",
            ]

        if self.sensitive_goals:
            lines += [
                "## Disclaimer Requirement",
                f"Sensitive goals detected. If content touches: {', '.join(self.sensitive_goals)}",
                f"Mandatory disclaimer: {self.disclaimer_text or 'Include educational medical disclaimer.'}",
                "",
            ]

        return "\n".join(lines).strip()

    def to_json(self) -> str:
        return json.dumps(asdict(self), ensure_ascii=False, indent=2)

    def _intake_context_lines(self) -> List[str]:
        lines: List[str] = []
        if self.description:
            lines.extend([
                "## Intake Description",
                f"- {self.description}",
                "",
            ])
        if self.key_angles:
            lines.extend([
                "## Priority Angles",
                *[f"- {angle}" for angle in self.key_angles],
                "",
            ])
        if self.reference_links:
            lines.extend([
                "## Reference Links",
                *[f"- {link}" for link in self.reference_links],
                "",
            ])
        if self.source_notes:
            lines.extend([
                "## Source Notes",
                f"- {self.source_notes}",
                "",
            ])
        return lines


# ---------------------------------------------------------------------------
# Research Agent
# ---------------------------------------------------------------------------

class ResearchAgent(BaseAgent):
    """
    Queries the KnowledgeStore deterministically and builds a ResearchBrief.
    No LLM call needed — pure structured retrieval.
    """

    def __init__(self, knowledge_store: KnowledgeStore | None = None):
        super().__init__("research")
        self.knowledge_store = knowledge_store or get_knowledge_store()

    def build_brief(
        self,
        topic: str,
        page_type: str,
        config: PipelineConfig,
        *,
        description: Optional[str] = None,
        reference_links: Optional[List[str]] = None,
        key_angles: Optional[List[str]] = None,
        source_notes: Optional[str] = None,
    ) -> ResearchBrief:
        """Retrieve relevant knowledge and synthesize a ResearchBrief."""
        # Content rules
        page_rule = self.knowledge_store.get_content_rules(page_type)
        min_words = page_rule.min_word_count if page_rule else 900
        required_sections = (page_rule.required_sections if page_rule else [
            "Overview",
            "Practice Guidance",
            "Frequently Asked Questions",
        ])

        # Techniques — take up to 5 most useful ones
        all_techniques = self.knowledge_store.get_techniques()
        selected_techniques = all_techniques[:5]

        # Competitor insights — take unique recommendation texts
        competitor_insights: List[str] = []
        competitors = self.knowledge_store.get_competitor_patterns().competitors
        for comp in competitors[:2]:
            for rec in comp.recommendations[:2]:
                competitor_insights.append(rec)
        competitor_insights = competitor_insights[:4]
        context_pack = self.knowledge_store.get_context_pack(config.context_module)
        article_spec = self.knowledge_store.get_article_spec()

        article_requirements: List[str] = []
        forbidden_phrases: List[str] = []

        if article_spec and config.context_module in {"long_form", "sacred_text"}:
            article_type = article_spec.hub if page_type == "topic_hub" else article_spec.spoke
            article_requirements = [
                f"Minimum word count: {article_type.min_word_count}",
                f"Minimum FAQ items: {article_type.faq_minimum}",
                f"Minimum internal links: {article_type.required_internal_links}",
                f"AEO block required: {'yes' if article_type.requires_aeo_block else 'no'}",
                *( [f"AEO word range: {article_spec.aeo_word_range[0]}-{article_spec.aeo_word_range[1]}"] if article_spec.aeo_word_range else []),
                *( [f"Reference template: {article_spec.reference_template_path}"] if article_spec.reference_template_path else []),
                *(article_spec.required_source_signals or []),
            ]
            forbidden_phrases = article_spec.forbidden_phrases

        brief = ResearchBrief(
            topic=topic,
            page_type=page_type,
            context_module=config.context_module,
            description=description,
            reference_links=reference_links or [],
            key_angles=key_angles or [],
            source_notes=source_notes,
            min_word_count=min_words,
            required_sections=required_sections,
            voice_tone=config.tone,
            voice_weights=config.voice_weights,
            anti_patterns=config.anti_patterns,
            techniques=selected_techniques,
            sensitive_goals=self.knowledge_store.get_sensitive_goals(),
            disclaimer_text=self.knowledge_store.get_disclaimer_text(),
            competitor_insights=competitor_insights,
            context_pack_label=context_pack.label if context_pack else None,
            context_pack_summary=context_pack.summary if context_pack else None,
            context_doc_paths=context_pack.doc_paths if context_pack else [],
            article_requirements=article_requirements,
            forbidden_phrases=forbidden_phrases,
        )

        return brief
