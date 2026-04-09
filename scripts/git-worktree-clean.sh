#!/bin/bash

set -euo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel)"

usage() {
  cat <<USAGE
Usage:
  ./scripts/git-worktree-clean.sh <branch-name> <worktree-path>

Example:
  ./scripts/git-worktree-clean.sh agent/editor-desk-fix /Users/ankitmishra/Developer/worktrees/Sadhaka/editor-desk-fix

Behavior:
  - Removes the worktree
  - Deletes the local branch if it is fully merged
  - Prunes stale worktree metadata
  - Prunes stale remote refs
USAGE
}

if [[ $# -ne 2 ]]; then
  usage
  exit 1
fi

BRANCH_NAME="$1"
WORKTREE_DIR="$2"

echo "Root repo: $ROOT_DIR"

if [[ -d "$WORKTREE_DIR" ]]; then
  echo "Removing worktree: $WORKTREE_DIR"
  git worktree remove "$WORKTREE_DIR"
else
  echo "Worktree path not found, skipping removal: $WORKTREE_DIR"
fi

if git show-ref --verify --quiet "refs/heads/$BRANCH_NAME"; then
  if git branch --merged main | grep -q "^[*[:space:]]*${BRANCH_NAME}$"; then
    echo "Deleting merged branch: $BRANCH_NAME"
    git branch -d "$BRANCH_NAME"
  else
    echo "Branch is not merged into main; keeping branch: $BRANCH_NAME"
  fi
else
  echo "Branch not found locally, skipping deletion: $BRANCH_NAME"
fi

echo "Pruning worktree metadata and remote refs..."
git worktree prune
git fetch --prune

echo "Done."