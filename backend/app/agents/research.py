"""Research Agent — builds a structured ResearchBrief from the KnowledgeStore for the Writer."""

from __future__ import annotations

import json
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

    def to_text(self) -> str:
        """Format the brief as a compact markdown block for the Writer system prompt."""
        lines = [
            f"# Research Brief: {self.topic}",
            f"**Page type:** {self.page_type}  |  **Context:** {self.context_module}",
            f"**Min words:** {self.min_word_count}  |  **Tone:** {self.voice_tone}",
            "",
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
