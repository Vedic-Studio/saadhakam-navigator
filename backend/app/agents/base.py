"""Shared base helpers for Phase 1 agents."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[3]
AGENT_WORKSPACE_DIR = PROJECT_ROOT / "workspace" / "agents"
SKILLS_DIR = PROJECT_ROOT / "skills"


def _safe_read(path: Path) -> str:
    if not path.exists():
        return ""
    return path.read_text(encoding="utf-8")


@dataclass
class AgentPromptParts:
    soul: str
    memory: str
    skills: str
    knowledge: str


class BaseAgent:
    def __init__(self, agent_name: str):
        self.agent_name = agent_name

    def load_soul(self) -> str:
        return _safe_read(AGENT_WORKSPACE_DIR / self.agent_name / "SOUL.md")

    def load_memory(self) -> str:
        return _safe_read(AGENT_WORKSPACE_DIR / self.agent_name / "MEMORY.md")

    def load_skill(self, relative_path: str) -> str:
        return _safe_read(SKILLS_DIR / relative_path)

    def assemble_prompt_parts(self, *, skills_text: str, knowledge_text: str) -> AgentPromptParts:
        return AgentPromptParts(
            soul=self.load_soul(),
            memory=self.load_memory(),
            skills=skills_text,
            knowledge=knowledge_text,
        )
