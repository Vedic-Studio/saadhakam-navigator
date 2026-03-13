#!/bin/bash
# Setup gstack workflow tools for Claude Code
# Run: ./scripts/setup-gstack.sh

set -e

echo "Installing gstack workflow tools..."
git clone https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
cd ~/.claude/skills/gstack
./setup

echo ""
echo "✓ gstack installed successfully!"
echo ""
echo "Available skills:"
echo "  /browse              — structured web browsing"
echo "  /plan-ceo-review     — business/strategy review"
echo "  /plan-eng-review     — technical/engineering review"
echo "  /review              — code/content review"
echo "  /ship                — production deployment checklist"
echo "  /retro               — project retrospective"
echo ""
echo "See CLAUDE.md for more details."
