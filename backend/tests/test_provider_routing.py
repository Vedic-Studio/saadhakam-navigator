from __future__ import annotations

import asyncio
import sys
from pathlib import Path

import pytest

BACKEND_ROOT = Path(__file__).resolve().parents[1]
if str(BACKEND_ROOT) not in sys.path:
    sys.path.insert(0, str(BACKEND_ROOT))

from app.agents.platforms.twitter import TwitterAgent
from app.agents.writer import WriterAgent
from app.config import get_settings
from app.models.pipeline import ContentPipeline
from app.models.schemas import GenerateRequest


class MockResponse:
    def __init__(self, payload: dict):
        self._payload = payload

    def raise_for_status(self) -> None:
        return None

    def json(self) -> dict:
        return self._payload


class MockAsyncClient:
    def __init__(self, recorder: list[dict], payload: dict, should_fail: bool = False, *args, **kwargs):
        self.recorder = recorder
        self.payload = payload
        self.should_fail = should_fail

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc, tb):
        return None

    async def post(self, url: str, headers: dict | None = None, json: dict | None = None):
        self.recorder.append({"url": url, "headers": headers or {}, "json": json or {}})
        if self.should_fail:
            raise RuntimeError("upstream failed")
        return MockResponse(self.payload)


@pytest.fixture
def settings_state():
    settings = get_settings()
    original = {
        "llm_provider": settings.llm_provider,
        "openai_api_key": settings.openai_api_key,
        "openai_model": settings.openai_model,
        "anthropic_api_key": settings.anthropic_api_key,
        "anthropic_model": settings.anthropic_model,
    }
    try:
        yield settings
    finally:
        for key, value in original.items():
            setattr(settings, key, value)


def test_writer_generate_uses_openai_provider(monkeypatch: pytest.MonkeyPatch, settings_state):
    settings_state.llm_provider = "openai"
    settings_state.openai_api_key = "test-openai-key"
    settings_state.openai_model = "gpt-test"
    settings_state.anthropic_api_key = None

    calls: list[dict] = []

    def fake_async_client(*args, **kwargs):
        return MockAsyncClient(
            calls,
            {"choices": [{"message": {"content": "OpenAI draft"}}]},
            *args,
            **kwargs,
        )

    monkeypatch.setattr("app.agents.writer.httpx.AsyncClient", fake_async_client)

    writer = WriterAgent()
    request = GenerateRequest(topic="What is Vedanta", page_type="topic_hub", audience="seekers")

    result = asyncio.run(writer.generate(request))

    assert result.content == "OpenAI draft"
    assert calls[0]["url"] == "https://api.openai.com/v1/chat/completions"
    assert calls[0]["headers"]["Authorization"] == "Bearer test-openai-key"
    assert calls[0]["json"]["model"] == "gpt-test"


def test_writer_generate_falls_back_deterministically_without_provider_key(settings_state):
    settings_state.llm_provider = "openai"
    settings_state.openai_api_key = None
    settings_state.anthropic_api_key = "anthropic-key"

    writer = WriterAgent()
    request = GenerateRequest(topic="What is Vedanta", page_type="topic_hub", audience="seekers")

    result = asyncio.run(writer.generate(request))

    assert "# What is Vedanta: A Practical Sādhaka Guide" in result.content


def test_writer_generate_uses_anthropic_provider(monkeypatch: pytest.MonkeyPatch, settings_state):
    settings_state.llm_provider = "anthropic"
    settings_state.anthropic_api_key = "test-anthropic-key"
    settings_state.anthropic_model = "claude-test"
    settings_state.openai_api_key = None

    calls: list[dict] = []

    def fake_async_client(*args, **kwargs):
        return MockAsyncClient(
            calls,
            {"content": [{"type": "text", "text": "Anthropic draft"}]},
            *args,
            **kwargs,
        )

    monkeypatch.setattr("app.agents.writer.httpx.AsyncClient", fake_async_client)

    writer = WriterAgent()
    request = GenerateRequest(topic="What is Vedanta", page_type="topic_hub", audience="seekers")

    result = asyncio.run(writer.generate(request))

    assert result.content == "Anthropic draft"
    assert calls[0]["url"] == "https://api.anthropic.com/v1/messages"
    assert calls[0]["headers"]["x-api-key"] == "test-anthropic-key"
    assert calls[0]["json"]["model"] == "claude-test"


def test_twitter_agent_routes_through_selected_provider(monkeypatch: pytest.MonkeyPatch, settings_state):
    settings_state.llm_provider = "openai"
    settings_state.openai_api_key = "test-openai-key"
    settings_state.openai_model = "gpt-thread"
    settings_state.anthropic_api_key = None

    calls: list[dict] = []

    def fake_async_client(*args, **kwargs):
        return MockAsyncClient(
            calls,
            {"choices": [{"message": {"content": "Twitter thread"}}]},
            *args,
            **kwargs,
        )

    monkeypatch.setattr("app.agents.platforms.base.httpx.AsyncClient", fake_async_client)

    agent = TwitterAgent()
    pipeline = ContentPipeline(topic="Vedanta", page_type="topic_hub", goal="education", audience="seekers")

    result = asyncio.run(agent.adapt_content(pipeline, "Long-form content"))

    assert result == "Twitter thread"
    assert calls[0]["url"] == "https://api.openai.com/v1/chat/completions"
    assert calls[0]["json"]["model"] == "gpt-thread"


def test_twitter_agent_falls_back_when_provider_call_fails(monkeypatch: pytest.MonkeyPatch, settings_state):
    settings_state.llm_provider = "openai"
    settings_state.openai_api_key = "test-openai-key"

    def fake_async_client(*args, **kwargs):
        return MockAsyncClient([], {}, should_fail=True, *args, **kwargs)

    monkeypatch.setattr("app.agents.platforms.base.httpx.AsyncClient", fake_async_client)

    agent = TwitterAgent()
    pipeline = ContentPipeline(topic="Vedanta", page_type="topic_hub", goal="education", audience="seekers")

    result = asyncio.run(agent.adapt_content(pipeline, "Long-form content"))

    assert result.startswith("🧵 Thread on Vedanta")