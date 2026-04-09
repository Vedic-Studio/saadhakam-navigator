#!/bin/bash

set -euo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel)"
REPO_NAME="$(basename "$ROOT_DIR")"
BASE_BRANCH="${3:-main}"
WORKTREE_BASE_DEFAULT="/Users/ankitmishra/Developer/worktrees"
WORKTREE_BASE="${SADHAKA_WORKTREE_BASE:-$WORKTREE_BASE_DEFAULT}"

usage() {
  cat <<USAGE
Usage:
  ./scripts/git-worktree-new.sh <branch-slug> [branch-prefix] [base-branch]

Examples:
  ./scripts/git-worktree-new.sh editor-desk-fix
  ./scripts/git-worktree-new.sh editor-desk-fix agent
  ./scripts/git-worktree-new.sh editor-desk-fix claude main

Behavior:
  - Creates a branch named <branch-prefix>/<branch-slug>
  - Creates a worktree outside the repo at:
      /Users/ankitmishra/Developer/worktrees/<repo-name>/<branch-slug>
  - Defaults:
      branch-prefix = agent
      base-branch   = main

Override worktree base dir with:
  SADHAKA_WORKTREE_BASE=/absolute/path
USAGE
}

if [[ $# -lt 1 ]]; then
  usage
  exit 1
fi

BRANCH_SLUG="$1"
BRANCH_PREFIX="${2:-agent}"
BRANCH_NAME="$BRANCH_PREFIX/$BRANCH_SLUG"
WORKTREE_DIR="$WORKTREE_BASE/$REPO_NAME/$BRANCH_SLUG"

if [[ "$BRANCH_SLUG" =~ [[:space:]] ]]; then
  echo "Error: branch slug must not contain spaces. Use kebab-case." >&2
  exit 1
fi

if [[ -e "$WORKTREE_DIR" ]]; then
  echo "Error: worktree path already exists: $WORKTREE_DIR" >&2
  exit 1
fi

if git show-ref --verify --quiet "refs/heads/$BRANCH_NAME"; then
  echo "Error: local branch already exists: $BRANCH_NAME" >&2
  exit 1
fi

mkdir -p "$(dirname "$WORKTREE_DIR")"

echo "Fetching latest refs..."
git fetch --all --prune

echo "Creating worktree..."
git worktree add "$WORKTREE_DIR" -b "$BRANCH_NAME" "$BASE_BRANCH"

cat <<SUMMARY

Created successfully.

Branch:   $BRANCH_NAME
Base:     $BASE_BRANCH
Worktree: $WORKTREE_DIR

Next:
  cd "$WORKTREE_DIR"
  git status

Cleanup after merge:
  ./scripts/git-worktree-clean.sh "$BRANCH_NAME" "$WORKTREE_DIR"
SUMMARY