#!/bin/bash
# Autoresearch — Mac Mini Setup
# Run this on the Mac Mini to install Ollama + Qwen 2.5 14B

set -euo pipefail

echo "=== Autoresearch Mac Mini Setup ==="
echo ""

# 1. Install Ollama (skip if already installed)
if command -v ollama &>/dev/null; then
  echo "✓ Ollama already installed: $(ollama --version)"
else
  echo "Installing Ollama..."
  curl -fsSL https://ollama.com/install.sh | sh
  echo "✓ Ollama installed"
fi

# 2. Start Ollama service if not running
if ! curl -s http://localhost:11434/api/tags &>/dev/null; then
  echo "Starting Ollama service..."
  ollama serve &
  sleep 3
fi
echo "✓ Ollama running at http://localhost:11434"

# 3. Pull the model
echo ""
echo "Pulling qwen2.5:14b (this takes a while on first run)..."
ollama pull qwen2.5:14b
echo "✓ Model ready"

# 4. Verify
echo ""
echo "Verifying model..."
RESPONSE=$(ollama run qwen2.5:14b "Say 'hello world' and nothing else" 2>/dev/null)
echo "Model response: $RESPONSE"

# 5. Check Node.js
echo ""
if command -v node &>/dev/null; then
  echo "✓ Node.js: $(node --version)"
else
  echo "✗ Node.js not found. Install it: https://nodejs.org/"
  exit 1
fi

# 6. Check npm dependencies
echo ""
if [ -f "package.json" ]; then
  echo "Installing npm dependencies..."
  npm install
  echo "✓ Dependencies installed"
else
  echo "Warning: Not in the Sadhaka repo root. Clone it first:"
  echo "  git clone <repo-url>"
  echo "  cd Sadhaka && npm install"
fi

echo ""
echo "=== Setup Complete ==="
echo ""
echo "Test run:"
echo "  node scripts/autoresearch/run-loop.mjs \\"
echo "    --mutable ~/.claude/skills/sadhaka-voice.md \\"
echo "    --max 3 --verbose"
echo ""
echo "Overnight run:"
echo "  nohup node scripts/autoresearch/run-loop.mjs \\"
echo "    --mutable ~/.claude/skills/sadhaka-voice.md \\"
echo "    --context ~/.claude/skills/stop-slop/SKILL.md,~/.claude/skills/writing-foundations/SKILL.md \\"
echo "    --max 200 \\"
echo "    > autoresearch-\$(date +%Y%m%d).log 2>&1 &"
