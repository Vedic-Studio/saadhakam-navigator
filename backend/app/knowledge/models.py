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


class ArticleTypeSpec(BaseModel):
    name: str
    min_word_count: int
    faq_minimum: int
    requires_aeo_block: bool = True
    required_internal_links: int = 0


class ArticleAgentSpec(BaseModel):
    source: SourceMeta
    reference_template_path: Optional[str] = None
    hub: ArticleTypeSpec
    spoke: ArticleTypeSpec
    aeo_word_range: Optional[List[int]] = None
    sources_section_required: bool = True
    references_array_required: bool = True
    paragraph_sentence_limit: Optional[int] = None
    forbidden_phrases: List[str] = Field(default_factory=list)
    required_source_signals: List[str] = Field(default_factory=list)


class GenericDocSpec(BaseModel):
    source: SourceMeta
    scope: str = ""
    key_requirements: List[str] = Field(default_factory=list)


class ContextPackKnowledge(BaseModel):
    module: str
    label: str
    page_types: List[str] = Field(default_factory=list)
    doc_paths: List[str] = Field(default_factory=list)
    summary: str = ""


class AgentKnowledge(BaseModel):
    article: Optional[ArticleAgentSpec] = None
    stotra: Optional[GenericDocSpec] = None
    pseo: Optional[GenericDocSpec] = None
    context_packs: List[ContextPackKnowledge] = Field(default_factory=list)


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
    agent_knowledge: AgentKnowledge
