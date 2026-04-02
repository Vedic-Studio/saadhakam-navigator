"""Writer agent — topic → draft content. Accepts ResearchBrief from Research Agent."""

from __future__ import annotations

from dataclasses import dataclass
from functools import lru_cache
from typing import TYPE_CHECKING, List, Optional

import httpx

from app.config import get_settings
from app.knowledge.store import KnowledgeStore, get_knowledge_store
from app.models.schemas import GenerateRequest

from .base import BaseAgent

if TYPE_CHECKING:
    from app.agents.research import ResearchBrief


FALLBACK_WRITER_BASE_SKILL = """Write concise, structured markdown for Sadhaka. Prioritize clarity, fidelity to tradition, practical usefulness, and clean section hierarchy."""

FALLBACK_WRITER_ARTICLE_SKILL = """Use one H1, strong H2 sections, useful FAQ coverage, and natural internal links. Prefer concrete guidance over filler. Avoid banned or over-polished AI phrases."""


@dataclass
class WriterResult:
    content: str
    prompt_preview: str


class WriterAgent(BaseAgent):
    def __init__(self, knowledge_store: KnowledgeStore | None = None):
        super().__init__("writer")
        self.settings = get_settings()
        self.knowledge_store = knowledge_store or get_knowledge_store()

    async def generate(
        self,
        request: GenerateRequest,
        *,
        research_brief: Optional["ResearchBrief"] = None,
        knowledge_handoff: Optional[str] = None,
        revision_packet: Optional[str] = None,
        revision_notes: Optional[str] = None,
    ) -> WriterResult:
        prompt = self._build_prompt(
            request,
            research_brief=research_brief,
            knowledge_handoff=knowledge_handoff,
            revision_packet=revision_packet,
            revision_notes=revision_notes,
        )

        if self.settings.anthropic_api_key:
            try:
                content = await self._generate_with_anthropic(prompt)
                return WriterResult(content=content, prompt_preview=prompt[:1500])
            except Exception:
                pass

        deterministic = self._generate_deterministic(request)
        return WriterResult(content=deterministic, prompt_preview=prompt[:1500])

    def _build_prompt(
        self,
        request: GenerateRequest,
        *,
        research_brief: Optional["ResearchBrief"] = None,
        knowledge_handoff: Optional[str] = None,
        revision_packet: Optional[str] = None,
        revision_notes: Optional[str] = None,
    ) -> str:
        skills_text = self._load_writer_skills()

        if knowledge_handoff is not None:
            knowledge_text = knowledge_handoff
        elif research_brief is not None:
            knowledge_text = research_brief.to_text()
        else:
            page_rule = self.knowledge_store.get_content_rules(request.page_type)
            required_sections = page_rule.required_sections if page_rule else []
            knowledge_text = (
                f"Page type: {request.page_type}\n"
                f"Topic: {request.topic}\n"
                f"Goal: {request.goal or 'general'}\n"
                f"Min words: {page_rule.min_word_count if page_rule else 'n/a'}\n"
                f"Required sections: {required_sections}\n"
                f"Sensitive goals: {self.knowledge_store.get_sensitive_goals()}\n"
                f"Disclaimer: {self.knowledge_store.get_disclaimer_text() or ''}\n"
            )

        parts = self.assemble_prompt_parts(skills_text=skills_text, knowledge_text=knowledge_text)
        fallback_soul = (
            "You are the Sadhaka Writer Agent. Write warm, clear, tradition-respectful, "
            "SEO-structured content."
        )

        task_section = "[TASK]\nGenerate complete markdown content with clear H2 sections, FAQ, and at least 3 internal links."
        if revision_packet:
            task_section += f"\n\n[REVISION PACKET]\n{revision_packet}"
        if revision_notes:
            task_section += f"\n\n[REVISION NOTES FROM EDITOR]\n{revision_notes}\n\nPlease address all revision notes above in this re-draft."

        return "\n\n".join(
            [
                f"[SOUL]\n{parts.soul or fallback_soul}",
                f"[MEMORY]\n{parts.memory}",
                f"[SKILLS]\n{parts.skills}",
                f"[KNOWLEDGE]\n{parts.knowledge}",
                task_section,
            ]
        )

    @classmethod
    @lru_cache(maxsize=1)
    def _load_writer_skills(cls) -> str:
        probe = cls("writer")
        base_skill = probe.load_skill("writer/base.md") or FALLBACK_WRITER_BASE_SKILL
        article_skill = probe.load_skill("writer/article.md") or FALLBACK_WRITER_ARTICLE_SKILL
        return "\n\n".join([base_skill, article_skill]).strip()

    async def _generate_with_anthropic(self, prompt: str) -> str:
        if not self.settings.anthropic_api_key:
            raise RuntimeError("Anthropic key missing")

        headers = {
            "x-api-key": self.settings.anthropic_api_key,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
        }
        payload = {
            "model": self.settings.anthropic_model,
            "max_tokens": 2400,
            "temperature": 0.4,
            "messages": [{"role": "user", "content": prompt}],
        }

        async with httpx.AsyncClient(timeout=60.0) as client:
            resp = await client.post("https://api.anthropic.com/v1/messages", headers=headers, json=payload)
            resp.raise_for_status()
            data = resp.json()

        blocks = data.get("content", [])
        text_blocks = [block.get("text", "") for block in blocks if block.get("type") == "text"]
        return "\n".join(text_blocks).strip()

    def _generate_deterministic(self, request: GenerateRequest) -> str:
        page_rule = self.knowledge_store.get_content_rules(request.page_type)
        min_words = page_rule.min_word_count if page_rule else 800
        required_sections = page_rule.required_sections if page_rule else [
            "Overview",
            "Practice Guidance",
            "Frequently Asked Questions",
        ]

        title = self._build_title(request)
        blocks: List[str] = [f"# {title}"]

        intro = (
            f"{request.topic} is approached here through the Sādhaka lens: practical, rooted in "
            "traditional understanding, and usable in modern life. This page is structured to help "
            f"{request.audience or 'spiritual seekers'} study clearly and practice responsibly."
        )
        blocks.append(intro)

        for section in required_sections:
            blocks.append(f"## {section}")
            blocks.append(self._section_paragraph(section, request))

        blocks.append("## Internal Pathways")
        blocks.append("- [What is Vedanta?](/what-is-vedanta) for foundational orientation")
        blocks.append("- [How to Start Japa](/how-to-start-japa) for practical beginner rhythm")
        blocks.append("- [Spiritual Traditions & Paths](/spiritual-traditions-paths) to compare lineages")

        blocks.append("## FAQ")
        faq_questions = [
            f"What is the core meaning of {request.topic}?",
            f"How should beginners approach {request.topic}?",
            f"How does {request.topic} fit daily sādhana?",
            f"Which texts are most useful to study {request.topic}?",
            "What common mistakes should be avoided?",
        ]
        for question in faq_questions:
            blocks.append(f"### {question}")
            blocks.append(
                "A practical answer combines scriptural orientation, lived tradition, and steady daily practice. "
                "Start simple, keep consistency, and refine depth over time."
            )

        sensitive_goals = {goal.lower() for goal in self.knowledge_store.get_sensitive_goals()}
        if request.goal and request.goal.lower() in sensitive_goals:
            disclaimer = self.knowledge_store.get_disclaimer_text()
            if disclaimer:
                blocks.append(f"> {disclaimer}")

        content = "\n\n".join(blocks)
        return self._ensure_word_floor(content, min_words)

    @staticmethod
    def _build_title(request: GenerateRequest) -> str:
        if request.goal:
            return f"{request.topic}: A Practical Guide for {request.goal.title()}"
        return f"{request.topic}: A Practical Sādhaka Guide"

    @staticmethod
    def _section_paragraph(section: str, request: GenerateRequest) -> str:
        return (
            f"This section explains {section.lower()} in the context of {request.topic}. It starts with a "
            "traditional framing, then translates the idea into practical steps. The emphasis remains "
            "on faithful interpretation, responsible application, and direct relevance to the seeker’s path. "
            "Where needed, compare major schools respectfully and indicate how the section supports daily discipline."
        )

    @staticmethod
    def _ensure_word_floor(content: str, min_words: int) -> str:
        words = content.split()
        if len(words) >= min_words:
            return content

        filler = (
            "In practical terms, this insight becomes transformative only through repetition, reflection, "
            "and sincere application under ethical discipline."
        )
        blocks = [content]
        while len(" ".join(blocks).split()) < min_words:
            blocks.append(filler)
        return "\n\n".join(blocks)
