"""Request/response schemas for the Phase 1 API surface."""

from __future__ import annotations

from datetime import datetime
from typing import Dict, List, Literal, Optional

from pydantic import BaseModel, Field


PageType = Literal[
    "topic_hub",
    "combinatorial",
    "sacred_text_chapter",
    "sacred_text_shloka",
    "sanskrit_lexicon",
]


class GenerateRequest(BaseModel):
    topic: str = Field(min_length=3)
    page_type: PageType
    goal: Optional[str] = None
    audience: Optional[str] = "spiritual seekers"


class QualityDimensionScore(BaseModel):
    score: float
    weight: float
    notes: str


class QualityScorecard(BaseModel):
    total_score: float
    passed: bool
    dimensions: Dict[str, QualityDimensionScore]
    violations: List[str] = Field(default_factory=list)


class GenerateResponse(BaseModel):
    topic: str
    page_type: PageType
    generated_content: str
    scorecard: QualityScorecard
    created_at: datetime = Field(default_factory=datetime.utcnow)


class TechniqueItem(BaseModel):
    source: str
    type: str
    text: str


class TechniquesResponse(BaseModel):
    techniques: List[TechniqueItem]
