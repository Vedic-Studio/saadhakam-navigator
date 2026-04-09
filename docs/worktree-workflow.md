# Multi-agent branch and worktree workflow

This repo supports parallel work by multiple coding agents. To keep Source Control readable and prevent branch confusion, use a strict branch/worktree system.

## Core rules

1. **Keep the root checkout on `main`**
   - Root path: `/Users/ankitmishra/Developer/Sadhaka`
   - Use it for fetch, review, merge, and cleanup
   - Do not do active feature work in the root checkout

2. **One task = one branch = one worktree**
   - Every agent gets a dedicated branch and worktree
   - Never share a worktree between agents

3. **Keep worktrees outside the repo root**
   - Recommended base directory:
     `/Users/ankitmishra/Developer/worktrees/Sadhaka/`
   - Do not create worktrees under `.claude/worktrees/` inside the repo
   - Nested worktrees can cause IDEs to aggregate pending changes and hide the main repo entry

4. **Use short-lived task branches**
   - Good: `agent/editor-desk-fix`
   - Good: `agent/backend-pipeline-retry`
   - Good: `claude/jyotish-ui-polish`

5. **Clean up immediately after merge**
   - Remove the worktree
   - Delete the local branch if merged
   - Prune stale worktree metadata and remote refs

## Standard workflow

### 1) Start new task work

From the root repo:

```sh
git checkout main
git pull --ff-only
./scripts/git-worktree-new.sh editor-desk-fix
```

This creates:

- branch: `agent/editor-desk-fix`
- worktree: `/Users/ankitmishra/Developer/worktrees/Sadhaka/editor-desk-fix`

Then enter the worktree and do the task there:

```sh
cd /Users/ankitmishra/Developer/worktrees/Sadhaka/editor-desk-fix
git status
```

### 2) Check current worktree state

From the root repo:

```sh
./scripts/git-worktree-status.sh
```

This shows:

- current root branch
- root repo changes
- all registered worktrees
- per-worktree `git status`

### 3) Merge and clean up

After the work is reviewed and merged into `main`, run from the root repo:

```sh
./scripts/git-worktree-clean.sh agent/editor-desk-fix /Users/ankitmishra/Developer/worktrees/Sadhaka/editor-desk-fix
```

This will:

- remove the worktree
- delete the branch if it has already been merged into `main`
- prune stale worktree metadata
- prune stale remote refs

## Team operating policy

### Root repo policy

- Keep `/Users/ankitmishra/Developer/Sadhaka` on `main`
- Keep it as clean as possible
- Use it as the integration and control repo

### Agent policy

- One agent per worktree
- One task per branch
- Commit often inside the agent worktree
- Push branch when collaboration or backup is needed

### Naming policy

Use predictable names:

- `agent/<area>-<task>`
- `claude/<area>-<task>`
- `gpt/<area>-<task>`

Examples:

- `agent/frontend-editor-desk`
- `agent/backend-provider-routing`
- `claude/seo-structured-data-pass`

## Hygiene checklist

Run regularly from the root repo:

```sh
git fetch --all --prune
git worktree list
./scripts/git-worktree-status.sh
```

Ask these questions:

- Is the root checkout still on `main`?
- Are there worktrees for already-merged tasks?
- Are any worktrees incorrectly nested inside the repo?
- Are branch names still meaningful?

## Anti-patterns to avoid

- Doing feature work directly in the root checkout on `main`
- Reusing the same branch for unrelated tasks
- Keeping merged worktrees around indefinitely
- Putting active worktrees inside `.claude/worktrees/` under the repo
- Using random branch names that do not describe the task