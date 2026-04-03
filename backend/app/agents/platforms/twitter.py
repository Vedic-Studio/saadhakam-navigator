"""X/Twitter Platform Agent."""

from __future__ import annotations

from app.agents.platforms.base import BasePlatformAgent
from app.models.pipeline import ContentPipeline


class TwitterAgent(BasePlatformAgent):
    def __init__(self):
        super().__init__("twitter")

    async def adapt_content(self, pipeline: ContentPipeline, approved_content: str) -> str:
        
        skills_text = self.load_skill("platforms/twitter.md")
        knowledge_text = (
            f"Topic: {pipeline.topic}\n"
            f"Goal: {pipeline.goal}\n"
            f"Audience: {pipeline.audience}\n"
        )
        parts = self.assemble_prompt_parts(skills_text=skills_text, knowledge_text=knowledge_text)

        task = f"[TASK]\nTransform the following article into a highly engaging X/Twitter thread.\n\n[ARTICLE]\n{approved_content}"
        
        prompt_fallback_soul = "You are the Sadhaka X/Twitter Adaptation Agent."
        
        prompt = "\n\n".join(
            [
                f"[SOUL]\n{parts.soul or prompt_fallback_soul}",
                f"[MEMORY]\n{parts.memory}",
                f"[SKILLS]\n{parts.skills}",
                f"[KNOWLEDGE]\n{parts.knowledge}",
                task,
            ]
        )

        try:
            return await self._generate_with_selected_provider(prompt)
        except Exception:
            # Deterministic fallback
            return f"🧵 Thread on {pipeline.topic}\n\n{approved_content[:200]}...\n\nRead more at opensadhaka.com"
