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


# ---------------------------------------------------------------------------
# Phase 2 Pipeline schemas
# ---------------------------------------------------------------------------

PipelineStatusLiteral = Literal[
    "queued",
    "researching",
    "research_review",
    "writing",
    "draft_review",
    "editing",
    "edit_review",
    "polishing",
    "final_review",
    "needs_review",
    "approved",
    "rejected",
    "failed",
]

PipelineFeedbackStageLiteral = Literal[
    "research_review",
    "draft_review",
    "edit_review",
    "final_review",
    "final",
]


class PipelineCreateRequest(BaseModel):
    topic: str = Field(min_length=3)
    page_type: PageType
    description: Optional[str] = None
    reference_links: List[str] = Field(default_factory=list)
    key_angles: List[str] = Field(default_factory=list)
    source_notes: Optional[str] = None
    goal: Optional[str] = None
    audience: Optional[str] = "spiritual seekers"
    quality_threshold: Optional[float] = Field(default=None, ge=1.0, le=10.0)
    revision_limit: Optional[int] = Field(default=None, ge=0, le=5)


class ContentOutputSchema(BaseModel):
    id: str
    version: int
    stage: str
    agent: str
    content: str
    revision_notes: Optional[str] = None
    scorecard_json: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


class FeedbackEntrySchema(BaseModel):
    id: str
    stage: str
    action: str
    diff: Optional[str] = None
    notes: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


class PipelineStatus(BaseModel):
    """Full pipeline detail including all outputs and feedback."""
    id: str
    topic: str
    page_type: str
    description: Optional[str] = None
    reference_links: List[str] = Field(default_factory=list)
    key_angles: List[str] = Field(default_factory=list)
    source_notes: Optional[str] = None
    goal: Optional[str] = None
    audience: Optional[str] = None
    context_module: Optional[str] = None
    status: str
    revision_count: int
    quality_threshold: float
    revision_limit: int
    final_score: Optional[float] = None
    error_message: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    outputs: List[ContentOutputSchema] = Field(default_factory=list)
    feedback: List[FeedbackEntrySchema] = Field(default_factory=list)

    class Config:
        from_attributes = True


class PipelineListItem(BaseModel):
    """Lightweight card data for the Kanban board."""
    id: str
    topic: str
    page_type: str
    status: str
    revision_count: int
    final_score: Optional[float] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class PipelineListResponse(BaseModel):
    pipelines: List[PipelineListItem]
    total: int


class ApproveRequest(BaseModel):
    notes: Optional[str] = None


class AdvanceRequest(BaseModel):
    notes: Optional[str] = None


class RejectRequest(BaseModel):
    notes: str


class ReviseRequest(BaseModel):
    notes: str
    target_dimensions: Optional[List[str]] = None


class FeedbackRequest(BaseModel):
    stage: PipelineFeedbackStageLiteral
    action: Literal["approve", "reject", "edit"]
    diff: Optional[str] = None
    notes: Optional[str] = None
