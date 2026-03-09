"""Orchestrator Agent — maps a generation request to a pipeline config and creates the DB record."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import List, Optional

from sqlalchemy.orm import Session

from app.agents.base import BaseAgent
from app.models.pipeline import ContentPipeline


# ---------------------------------------------------------------------------
# Pipeline Configuration
# ---------------------------------------------------------------------------

CONTEXT_MODULE_MAP = {
    "topic_hub": "long_form",
    "combinatorial": "long_form",
    "sacred_text_chapter": "long_form",
    "sacred_text_shloka": "long_form",
    "sanskrit_lexicon": "long_form",
    # Future: "tweet" → "social", "linkedin_post" → "social", etc.
}

PAGE_WORD_TARGETS = {
    "topic_hub": 1200,
    "combinatorial": 900,
    "sacred_text_chapter": 1500,
    "sacred_text_shloka": 800,
    "sanskrit_lexicon": 600,
}

PAGE_THRESHOLDS = {
    # Quality threshold to pass without revision
    "topic_hub": 7.0,
    "combinatorial": 6.5,
    "sacred_text_chapter": 7.5,
    "sacred_text_shloka": 7.0,
    "sanskrit_lexicon": 6.0,
}


@dataclass
class PipelineConfig:
    """Resolved configuration for one pipeline run."""

    context_module: str
    word_count_target: int
    quality_threshold: float
    revision_limit: int = 3
    tone: str = "warm, clear, tradition-rooted"
    techniques: List[str] = field(default_factory=list)
    anti_patterns: List[str] = field(default_factory=lambda: [
        "delve", "leverage", "utilize", "robust", "seamless",
        "transformative", "cutting-edge",
        # AI detection risk phrases
        "in conclusion", "in today's", "ever-evolving", "let's delve",
    ])
    voice_weights: dict = field(default_factory=lambda: {
        "clarity": 0.35,
        "depth": 0.30,
        "warmth": 0.20,
        "authority": 0.15,
    })


# ---------------------------------------------------------------------------
# Orchestrator Agent
# ---------------------------------------------------------------------------

class OrchestratorAgent(BaseAgent):
    """
    Receives a generation request and:
    1. Resolves context module, word targets, thresholds → PipelineConfig
    2. Creates a ContentPipeline DB record
    3. Returns (pipeline, config) for the PipelineService to execute
    """

    def __init__(self):
        super().__init__("orchestrator")

    def configure(
        self,
        topic: str,
        page_type: str,
        goal: Optional[str] = None,
        audience: Optional[str] = None,
        quality_threshold: Optional[float] = None,
        revision_limit: Optional[int] = None,
    ) -> PipelineConfig:
        """Map request fields to a PipelineConfig."""
        context_module = CONTEXT_MODULE_MAP.get(page_type, "long_form")
        word_count_target = PAGE_WORD_TARGETS.get(page_type, 900)
        threshold = quality_threshold if quality_threshold is not None else PAGE_THRESHOLDS.get(page_type, 7.0)
        limit = revision_limit if revision_limit is not None else 3

        return PipelineConfig(
            context_module=context_module,
            word_count_target=word_count_target,
            quality_threshold=threshold,
            revision_limit=limit,
        )

    def create_pipeline(
        self,
        db: Session,
        topic: str,
        page_type: str,
        goal: Optional[str] = None,
        audience: Optional[str] = None,
        quality_threshold: Optional[float] = None,
        revision_limit: Optional[int] = None,
    ) -> tuple[ContentPipeline, PipelineConfig]:
        """Create a DB pipeline record and return the config alongside it."""
        config = self.configure(
            topic=topic,
            page_type=page_type,
            goal=goal,
            audience=audience,
            quality_threshold=quality_threshold,
            revision_limit=revision_limit,
        )

        pipeline = ContentPipeline(
            topic=topic,
            page_type=page_type,
            goal=goal,
            audience=audience,
            context_module=config.context_module,
            status="queued",
            quality_threshold=config.quality_threshold,
            revision_limit=config.revision_limit,
        )
        db.add(pipeline)
        db.commit()
        db.refresh(pipeline)

        return pipeline, config
