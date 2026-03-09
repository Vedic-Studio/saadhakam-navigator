"""Base Platform Agent for adapting Editor-approved content to specific channels."""

from __future__ import annotations

import httpx
from typing import Optional

from app.agents.base import BaseAgent
from app.config import get_settings
from app.models.pipeline import ContentPipeline


class BasePlatformAgent(BaseAgent):
    """
    Adapts final edited content for a specific platform.
    """

    def __init__(self, platform_name: str):
        # Maps to e.g. workspace/agents/platforms/twitter
        super().__init__(f"platforms/{platform_name}")
        self.platform_name = platform_name
        self.settings = get_settings()

    async def adapt_content(self, pipeline: ContentPipeline, approved_content: str) -> str:
        """
        Takes the final content and the pipeline config to generate platform-specific output.
        Must be implemented by subclasses.
        """
        raise NotImplementedError

    async def _generate_with_anthropic(self, prompt: str) -> str:
        """Helper to invoke Claude API."""
        if not self.settings.anthropic_api_key:
            raise RuntimeError("Anthropic key missing")

        headers = {
            "x-api-key": self.settings.anthropic_api_key,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
        }
        payload = {
            "model": self.settings.anthropic_model,
            "max_tokens": 1500,
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
