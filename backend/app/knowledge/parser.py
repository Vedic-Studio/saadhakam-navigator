"""Parse Phase 1 markdown knowledge sources into structured JSON files."""

from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Dict, List

from .models import (
    CitationRule,
    CompetitorKnowledge,
    CompetitorPattern,
    ContentRulesKnowledge,
    ExclusionCategory,
    ExclusionImplementationRule,
    ExclusionsKnowledge,
    KeywordTopic,
    KnowledgeBundle,
    PageTypeRule,
    PillarCluster,
    SeoFormattingRule,
    SeoStrategyKnowledge,
    SourceMeta,
    UniquenessRule,
)

PROJECT_ROOT = Path(__file__).resolve().parents[3]
CONTENT_RULES_PATH = PROJECT_ROOT / "seo" / "content-rules.md"
EXCLUSIONS_PATH = PROJECT_ROOT / "seo" / "exclusions.md"
STRATEGY_PATH = PROJECT_ROOT / "plans" / "seo-content-strategy-sadhaka.md"
COMPETITOR_PATH = PROJECT_ROOT / "docs" / "Competitor-research-seo"

PARSED_OUTPUT_DIR = Path(__file__).resolve().parent / "parsed"


class KnowledgeParser:
    def __init__(self, output_dir: Path = PARSED_OUTPUT_DIR):
        self.output_dir = output_dir
        self.output_dir.mkdir(parents=True, exist_ok=True)

    def parse_all(self) -> KnowledgeBundle:
        content_rules = self.parse_content_rules(CONTENT_RULES_PATH)
        exclusions = self.parse_exclusions(EXCLUSIONS_PATH)
        strategy = self.parse_strategy(STRATEGY_PATH)
        competitor = self.parse_competitor(COMPETITOR_PATH)

        bundle = KnowledgeBundle(
            content_rules=content_rules,
            exclusions=exclusions,
            strategy=strategy,
            competitor=competitor,
        )

        self.write_bundle(bundle)
        return bundle

    def parse_content_rules(self, file_path: Path) -> ContentRulesKnowledge:
        text = file_path.read_text(encoding="utf-8")

        page_type_rules = [
            PageTypeRule(
                slug="topic_hub",
                route_pattern="/topics/{topic}",
                min_word_count=800,
                required_sections=self._extract_ordered_list_items(
                    text, "### 1.1 Topic Hub Pages"
                ),
            ),
            PageTypeRule(
                slug="combinatorial",
                route_pattern="/practices/{practice}/for/{goal}",
                min_word_count=1200,
                required_sections=self._extract_ordered_list_items(
                    text, "### 1.2 Combinatorial Pages"
                ),
            ),
            PageTypeRule(
                slug="sacred_text_chapter",
                route_pattern="/texts/{text}/chapter-{chapter}",
                min_word_count=2500,
                required_sections=self._extract_ordered_list_items(
                    text, "### 1.3 Sacred Texts"
                ),
            ),
            PageTypeRule(
                slug="sacred_text_shloka",
                route_pattern="/texts/{text}/chapter-{chapter}/shloka-{shloka}",
                min_word_count=1500,
                required_sections=self._extract_ordered_list_items(
                    text, "### 1.3 Sacred Texts"
                ),
            ),
            PageTypeRule(
                slug="sanskrit_lexicon",
                route_pattern="/learn/sanskrit/{word}",
                min_word_count=1000,
                required_sections=self._extract_ordered_list_items(
                    text, "### 1.4 Sanskrit Lexicon"
                ),
            ),
        ]

        uniqueness_rules = [
            UniquenessRule(
                description=(
                    "No find-and-replace pSEO pages. At least 40% text on combinatorial pages "
                    "must be unique to the practice-goal combination."
                ),
                min_unique_percent=40,
            ),
            UniquenessRule(
                description=(
                    "Every target concept must map to one canonical URL via linkMap.json."
                )
            ),
        ]

        formatting_rules = [
            SeoFormattingRule(
                category="visual_hierarchy",
                rules=[
                    "Exactly one H1 per page",
                    "Use H2 and H3 in logical order without skipping levels",
                ],
            ),
            SeoFormattingRule(
                category="schema",
                rules=[
                    "Include Article schema on informational and guide pages",
                    "Include FAQPage schema for Q&A sections",
                    "Include visible breadcrumbs and BreadcrumbList schema",
                ],
            ),
            SeoFormattingRule(
                category="internal_linking",
                rules=[
                    "Minimum 3 internal links per page",
                    "Use descriptive anchor text",
                ],
            ),
        ]

        citation_rules = [
            CitationRule(rule=line)
            for line in self._extract_bullet_items(text, "## 4. Source & Citation Requirements")
        ]

        return ContentRulesKnowledge(
            source=SourceMeta(path=str(file_path), title="Content Quality & Generation Rules"),
            page_type_rules=page_type_rules,
            uniqueness_rules=uniqueness_rules,
            formatting_rules=formatting_rules,
            citation_rules=citation_rules,
        )

    def parse_exclusions(self, file_path: Path) -> ExclusionsKnowledge:
        text = file_path.read_text(encoding="utf-8")

        medical_disallowed = self._extract_bullet_items(
            text, "### 🚫 Disallowed Keywords & Claim Patterns"
        )
        medical_allowed = self._extract_bullet_items(text, "### ✅ Acceptable Framing")

        tantra_disallowed = self._extract_bullet_items(text, "### 🚫 Disallowed Topics")
        tantra_allowed = self._extract_bullet_items(
            text, "### ✅ Acceptable Framing", occurrence=2
        )

        sensitive_goals = self._extract_code_terms_from_line(
            text,
            "Any combinatorial page targeting goals like",
        )

        disclaimer_text = self._extract_quoted_sentence(
            text,
            "Sādhaka provides traditional spiritual perspectives and practices",
        )

        implementation_rules = [
            ExclusionImplementationRule(step=item)
            for item in self._extract_ordered_list_items(
                text,
                "## 5. Implementation in CI/CD & Generators",
            )
        ]

        categories = [
            ExclusionCategory(
                name="medical_and_health_claims",
                disallowed=medical_disallowed,
                allowed=medical_allowed,
            ),
            ExclusionCategory(
                name="tantra_and_esoteric_practices",
                disallowed=tantra_disallowed,
                allowed=tantra_allowed,
            ),
            ExclusionCategory(
                name="copyright_and_ip",
                disallowed=self._extract_bullet_items(
                    text,
                    "### 🚫 Disallowed Actions",
                ),
                allowed=self._extract_bullet_items(
                    text,
                    "### ✅ Acceptable Framing",
                    occurrence=3,
                ),
            ),
            ExclusionCategory(
                name="defamation_and_sectarianism",
                disallowed=self._extract_bullet_items(
                    text,
                    "### 🚫 Disallowed Tactics",
                ),
                allowed=self._extract_bullet_items(
                    text,
                    "### ✅ Acceptable Framing",
                    occurrence=4,
                ),
            ),
        ]

        return ExclusionsKnowledge(
            source=SourceMeta(path=str(file_path), title="Sādhaka SEO & pSEO Exclusions Policy"),
            fail_closed="fail-closed" in text.lower(),
            categories=categories,
            sensitive_goals_requiring_disclaimer=sensitive_goals,
            disclaimer_text=disclaimer_text,
            implementation_rules=implementation_rules,
        )

    def parse_strategy(self, file_path: Path) -> SeoStrategyKnowledge:
        text = file_path.read_text(encoding="utf-8")

        pillars = [
            PillarCluster(
                pillar="Ancient Wisdom & Philosophies",
                rationale=self._extract_paragraph_after_heading(
                    text,
                    "### Pillar 1: Ancient Wisdom & Philosophies",
                ),
                subtopics=self._extract_bullets_after_heading(
                    text,
                    "**Subtopic Clusters:**",
                    occurrence=1,
                ),
                quick_win_topics=self._extract_quick_win_topics(
                    text,
                    "#### Pillar 1: Ancient Wisdom & Philosophies",
                ),
            ),
            PillarCluster(
                pillar="Practical Spiritual Practices",
                rationale=self._extract_paragraph_after_heading(
                    text,
                    "### Pillar 2: Practical Spiritual Practices",
                ),
                subtopics=self._extract_bullets_after_heading(
                    text,
                    "**Subtopic Clusters:**",
                    occurrence=2,
                ),
                quick_win_topics=self._extract_quick_win_topics(
                    text,
                    "#### Pillar 2: Practical Spiritual Practices",
                ),
            ),
            PillarCluster(
                pillar="Sacred Texts & Teachings",
                rationale=self._extract_paragraph_after_heading(
                    text,
                    "### Pillar 3: Sacred Texts & Teachings",
                ),
                subtopics=self._extract_bullets_after_heading(
                    text,
                    "**Subtopic Clusters:**",
                    occurrence=3,
                ),
                quick_win_topics=self._extract_quick_win_topics(
                    text,
                    "#### Pillar 3: Sacred Texts & Teachings",
                ),
            ),
            PillarCluster(
                pillar="Spiritual Traditions & Paths",
                rationale=self._extract_paragraph_after_heading(
                    text,
                    "### Pillar 4: Spiritual Traditions & Paths",
                ),
                subtopics=self._extract_bullets_after_heading(
                    text,
                    "**Subtopic Clusters:**",
                    occurrence=4,
                ),
                quick_win_topics=self._extract_quick_win_topics(
                    text,
                    "#### Pillar 4: Spiritual Traditions & Paths",
                ),
            ),
        ]

        long_tail_keywords = {
            "for_beginners": self._extract_bullets_after_heading(
                text, "#### Category 1: \"For Beginners\" Keywords"
            ),
            "how_to": self._extract_bullets_after_heading(
                text, "#### Category 2: \"How To\" Keywords"
            ),
            "meaning_of": self._extract_bullets_after_heading(
                text, "#### Category 3: \"Meaning Of\" Keywords"
            ),
            "best_for": self._extract_bullets_after_heading(
                text, "#### Category 4: \"Best For\" Keywords"
            ),
            "vs_comparison": self._extract_bullets_after_heading(
                text, "#### Category 5: \"Vs\" Comparison Keywords"
            ),
            "question_based": self._extract_bullets_after_heading(
                text, "#### Category 6: Question-Based Keywords"
            ),
        }

        return SeoStrategyKnowledge(
            source=SourceMeta(path=str(file_path), title="Sadhaka SEO Content Strategy"),
            pillars=pillars,
            long_tail_keywords=long_tail_keywords,
        )

    def parse_competitor(self, file_path: Path) -> CompetitorKnowledge:
        text = file_path.read_text(encoding="utf-8")

        competitors = [
            CompetitorPattern(
                competitor="Insight Timer",
                url="https://insighttimer.com",
                patterns=[
                    "Topic hub pages under /meditation-topics/{topic}",
                    "Combinatorial retreat pages category x country",
                    "UGC teacher/entity pages",
                ],
                recommendations=[
                    "Implement topic hubs as stable landing pages",
                    "Model entity graph for topic-practice-tradition-goal relationships",
                ],
            ),
            CompetitorPattern(
                competitor="Art of Living",
                url="https://www.artofliving.org",
                patterns=[
                    "Multi-country sitemap and localization model",
                    "Large evergreen informational content footprint",
                ],
                recommendations=[
                    "Adopt content hub architecture",
                    "Use geo pages only for real local offerings",
                ],
            ),
            CompetitorPattern(
                competitor="Isha Yoga",
                url="https://isha.sadhguru.org/yoga/",
                patterns=[
                    "Category hubs -> article libraries -> program pages",
                    "Video-integrated SEO with video sitemaps",
                ],
                recommendations=[
                    "Create practice library with prerequisites and next steps",
                    "Enable structured internal linking for pathways",
                ],
            ),
            CompetitorPattern(
                competitor="Heartfulness",
                url="https://heartfulness.org",
                patterns=[
                    "Practice/event/app conversion pages",
                ],
                recommendations=[
                    "Prepare event/teacher schema if expanding offline",
                ],
            ),
            CompetitorPattern(
                competitor="Tantra Illuminated",
                url="https://www.tantrailluminated.org",
                patterns=[
                    "Niche high-authority classical tantra positioning",
                ],
                recommendations=[
                    "Treat tantra content as high-E-E-A-T and review-gated",
                ],
            ),
        ]

        page_templates = {
            "practice_page": [
                "Definition",
                "Who it is for",
                "How practiced",
                "FAQ",
                "Related practices",
            ],
            "topic_hub_page": [
                "Topic overview",
                "Recommended practices",
                "Recommended traditions",
                "Guides",
                "Start CTA",
            ],
            "tradition_page": [
                "Core ideas",
                "Practices",
                "Texts",
                "Misconceptions",
                "Pathways",
            ],
            "practice_for_goal_page": [
                "Practice-goal alignment",
                "Eligibility by exclusions",
                "Non-medical framing",
            ],
        }

        # add a minimal trace from source text to ensure parser is tied to the document
        if "Entity Graph + Page Factory" in text:
            page_templates.setdefault("meta", []).append("Entity Graph + Page Factory")

        return CompetitorKnowledge(
            source=SourceMeta(path=str(file_path), title="Competitor + SEO / pSEO Playbook"),
            competitors=competitors,
            page_templates=page_templates,
        )

    def write_bundle(self, bundle: KnowledgeBundle) -> None:
        self._write_json("content_rules.json", bundle.content_rules.model_dump())
        self._write_json("exclusions.json", bundle.exclusions.model_dump())
        self._write_json("keyword_clusters.json", bundle.strategy.model_dump())
        self._write_json("competitor_patterns.json", bundle.competitor.model_dump())
        self._write_json("knowledge_bundle.json", bundle.model_dump())

    def _write_json(self, file_name: str, payload: Dict | List) -> None:
        output_path = self.output_dir / file_name
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")

    @staticmethod
    def _extract_ordered_list_items(text: str, heading: str) -> List[str]:
        section = KnowledgeParser._extract_section(text, heading)
        return [match.group(1).strip() for match in re.finditer(r"^\s*\d+\.\s+(.+)$", section, re.MULTILINE)]

    @staticmethod
    def _extract_bullet_items(text: str, heading: str, occurrence: int = 1) -> List[str]:
        section = KnowledgeParser._extract_section(text, heading, occurrence=occurrence)
        return [
            line.strip()[2:].strip()
            for line in section.splitlines()
            if line.strip().startswith("- ")
        ]

    @staticmethod
    def _extract_bullets_after_heading(text: str, heading: str, occurrence: int = 1) -> List[str]:
        section = KnowledgeParser._extract_section(text, heading, occurrence=occurrence)
        return [
            line.strip()[2:].strip()
            for line in section.splitlines()
            if line.strip().startswith("- ")
        ]

    @staticmethod
    def _extract_paragraph_after_heading(text: str, heading: str) -> str:
        section = KnowledgeParser._extract_section(text, heading)
        paragraphs = [p.strip() for p in section.split("\n\n") if p.strip()]
        return paragraphs[0] if paragraphs else ""

    @staticmethod
    def _extract_quick_win_topics(text: str, heading: str) -> List[KeywordTopic]:
        section = KnowledgeParser._extract_section(text, heading)
        rows = re.findall(r"\|\s*(.*?)\s*\|\s*\"(.*?)\"\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|", section)
        topics: List[KeywordTopic] = []
        for row in rows:
            topic, keyword, buyer_stage, content_type = row
            if topic.lower().startswith("topic"):
                continue
            topics.append(
                KeywordTopic(
                    topic=topic,
                    target_keyword=keyword,
                    buyer_stage=buyer_stage,
                    content_type=content_type,
                )
            )
        return topics

    @staticmethod
    def _extract_code_terms_from_line(text: str, line_prefix: str) -> List[str]:
        for line in text.splitlines():
            if line_prefix in line:
                return re.findall(r"`([^`]+)`", line)
        return []

    @staticmethod
    def _extract_quoted_sentence(text: str, startswith: str) -> str | None:
        match = re.search(r"\*(\"?[^*]*" + re.escape(startswith) + r"[^*]*)\*", text)
        if not match:
            return None
        return match.group(1).strip().strip('"')

    @staticmethod
    def _extract_section(text: str, heading: str, occurrence: int = 1) -> str:
        indices = [m.start() for m in re.finditer(re.escape(heading), text)]
        if len(indices) < occurrence:
            return ""

        start = indices[occurrence - 1] + len(heading)
        remainder = text[start:]
        next_heading = re.search(r"\n##?\s+|\n###\s+|\n####\s+", remainder)
        end = start + next_heading.start() if next_heading else len(text)
        return text[start:end].strip()


def build_and_persist_knowledge(output_dir: Path = PARSED_OUTPUT_DIR) -> KnowledgeBundle:
    parser = KnowledgeParser(output_dir=output_dir)
    return parser.parse_all()


if __name__ == "__main__":
    build_and_persist_knowledge()
