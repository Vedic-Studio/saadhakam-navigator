"""Deterministic query layer over parsed Phase 1 knowledge JSON files."""

from __future__ import annotations

import json
from functools import lru_cache
from pathlib import Path
from typing import Dict, List

from .models import (
    ArticleAgentSpec,
    CompetitorKnowledge,
    ContentRulesKnowledge,
    ContextPackKnowledge,
    GenericDocSpec,
    KnowledgeBundle,
    PageTypeRule,
)
from .parser import PARSED_OUTPUT_DIR, build_and_persist_knowledge


class KnowledgeStore:
    def __init__(self, parsed_dir: Path = PARSED_OUTPUT_DIR):
        self.parsed_dir = parsed_dir
        self.parsed_dir.mkdir(parents=True, exist_ok=True)
        self.bundle = self._load_or_build_bundle()

    def get_content_rules(self, page_type_slug: str) -> PageTypeRule | None:
        return next(
            (rule for rule in self.bundle.content_rules.page_type_rules if rule.slug == page_type_slug),
            None,
        )

    def get_all_content_rules(self) -> ContentRulesKnowledge:
        return self.bundle.content_rules

    def get_exclusion_patterns(self) -> Dict[str, List[str]]:
        patterns: Dict[str, List[str]] = {}
        for category in self.bundle.exclusions.categories:
            patterns[category.name] = category.disallowed
        return patterns

    def get_sensitive_goals(self) -> List[str]:
        return self.bundle.exclusions.sensitive_goals_requiring_disclaimer

    def get_disclaimer_text(self) -> str | None:
        return self.bundle.exclusions.disclaimer_text

    def get_long_tail_keywords(self, keyword_group: str) -> List[str]:
        return self.bundle.strategy.long_tail_keywords.get(keyword_group, [])

    def get_quick_win_topics(self, pillar_name: str) -> List[Dict[str, str | None]]:
        for pillar in self.bundle.strategy.pillars:
            if pillar.pillar == pillar_name:
                return [
                    {
                        "topic": item.topic,
                        "target_keyword": item.target_keyword,
                        "buyer_stage": item.buyer_stage,
                        "content_type": item.content_type,
                    }
                    for item in pillar.quick_win_topics
                ]
        return []

    def get_competitor_patterns(self) -> CompetitorKnowledge:
        return self.bundle.competitor

    def get_article_spec(self) -> ArticleAgentSpec | None:
        return self.bundle.agent_knowledge.article

    def get_stotra_spec(self) -> GenericDocSpec | None:
        return self.bundle.agent_knowledge.stotra

    def get_pseo_spec(self) -> GenericDocSpec | None:
        return self.bundle.agent_knowledge.pseo

    def get_context_pack(self, module: str) -> ContextPackKnowledge | None:
        return next(
            (pack for pack in self.bundle.agent_knowledge.context_packs if pack.module == module),
            None,
        )

    def get_context_pack_for_page_type(self, page_type_slug: str) -> ContextPackKnowledge | None:
        return next(
            (pack for pack in self.bundle.agent_knowledge.context_packs if page_type_slug in pack.page_types),
            None,
        )

    def get_context_packs(self) -> List[ContextPackKnowledge]:
        return self.bundle.agent_knowledge.context_packs

    def get_techniques(self) -> List[Dict[str, str]]:
        techniques: List[Dict[str, str]] = []
        for competitor in self.bundle.competitor.competitors:
            for pattern in competitor.patterns:
                techniques.append(
                    {
                        "source": competitor.competitor,
                        "type": "pattern",
                        "text": pattern,
                    }
                )
            for recommendation in competitor.recommendations:
                techniques.append(
                    {
                        "source": competitor.competitor,
                        "type": "recommendation",
                        "text": recommendation,
                    }
                )
        return techniques

    def reload(self) -> None:
        self.bundle = build_and_persist_knowledge(output_dir=self.parsed_dir)

    def _load_or_build_bundle(self) -> KnowledgeBundle:
        bundle_path = self.parsed_dir / "knowledge_bundle.json"
        if not bundle_path.exists():
            return build_and_persist_knowledge(output_dir=self.parsed_dir)

        data = json.loads(bundle_path.read_text(encoding="utf-8"))
        try:
            return KnowledgeBundle.model_validate(data)
        except Exception:
            return build_and_persist_knowledge(output_dir=self.parsed_dir)


@lru_cache(maxsize=1)
def get_knowledge_store() -> KnowledgeStore:
    return KnowledgeStore()


def _debug_dump() -> None:
    store = get_knowledge_store()
    print(store.bundle.model_dump_json(indent=2))


if __name__ == "__main__":
    _debug_dump()
