"""Pydantic models for structured Phase 1 knowledge assets."""

from __future__ import annotations

from typing import Dict, List, Optional

from pydantic import BaseModel, Field


class SourceMeta(BaseModel):
    path: str
    title: str


class PageTypeRule(BaseModel):
    slug: str
    route_pattern: str
    min_word_count: int
    required_sections: List[str] = Field(default_factory=list)


class UniquenessRule(BaseModel):
    description: str
    min_unique_percent: Optional[int] = None


class SeoFormattingRule(BaseModel):
    category: str
    rules: List[str] = Field(default_factory=list)


class CitationRule(BaseModel):
    rule: str


class ContentRulesKnowledge(BaseModel):
    source: SourceMeta
    page_type_rules: List[PageTypeRule] = Field(default_factory=list)
    uniqueness_rules: List[UniquenessRule] = Field(default_factory=list)
    formatting_rules: List[SeoFormattingRule] = Field(default_factory=list)
    citation_rules: List[CitationRule] = Field(default_factory=list)


class ExclusionCategory(BaseModel):
    name: str
    disallowed: List[str] = Field(default_factory=list)
    allowed: List[str] = Field(default_factory=list)


class ExclusionImplementationRule(BaseModel):
    step: str


class ExclusionsKnowledge(BaseModel):
    source: SourceMeta
    fail_closed: bool = True
    categories: List[ExclusionCategory] = Field(default_factory=list)
    sensitive_goals_requiring_disclaimer: List[str] = Field(default_factory=list)
    disclaimer_text: Optional[str] = None
    implementation_rules: List[ExclusionImplementationRule] = Field(default_factory=list)


class KeywordTopic(BaseModel):
    topic: str
    target_keyword: str
    buyer_stage: Optional[str] = None
    content_type: Optional[str] = None


class PillarCluster(BaseModel):
    pillar: str
    rationale: str
    subtopics: List[str] = Field(default_factory=list)
    quick_win_topics: List[KeywordTopic] = Field(default_factory=list)


class SeoStrategyKnowledge(BaseModel):
    source: SourceMeta
    pillars: List[PillarCluster] = Field(default_factory=list)
    long_tail_keywords: Dict[str, List[str]] = Field(default_factory=dict)


class CompetitorPattern(BaseModel):
    competitor: str
    url: str
    patterns: List[str] = Field(default_factory=list)
    recommendations: List[str] = Field(default_factory=list)


class CompetitorKnowledge(BaseModel):
    source: SourceMeta
    competitors: List[CompetitorPattern] = Field(default_factory=list)
    page_templates: Dict[str, List[str]] = Field(default_factory=dict)


class KnowledgeBundle(BaseModel):
    content_rules: ContentRulesKnowledge
    exclusions: ExclusionsKnowledge
    strategy: SeoStrategyKnowledge
    competitor: CompetitorKnowledge
