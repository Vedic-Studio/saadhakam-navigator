#!/bin/bash

set -euo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel)"

echo "Repo root: $ROOT_DIR"
echo
echo "Current root branch: $(git branch --show-current)"
echo
echo "Root working tree status:"
git status --short --branch
echo
echo "Registered worktrees:"
git worktree list
echo
echo "Per-worktree status:"

git worktree list --porcelain | awk '/^worktree / {print $2}' | while read -r wt; do
  echo
  echo "=== $wt ==="
  git -C "$wt" status --short --branch
done