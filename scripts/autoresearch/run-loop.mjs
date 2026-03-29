#!/usr/bin/env node

/**
 * Autoresearch v2 — Standalone Autonomous Optimization Loop
 *
 * Runs unattended on Mac Mini with Ollama + local model.
 * Iterates: modify skill file → generate samples → mechanical score → keep/revert.
 * Git is memory. Zero API cost.
 *
 * Usage:
 *   node run-loop.mjs --mutable <path> --max <N> [--model qwen2.5:14b] [--context path1,path2] [--verbose]
 *
 * Requires:
 *   - Ollama running locally (default: http://localhost:11434/v1)
 *   - Git repo with clean working tree
 *   - `openai` npm package (already in devDependencies)
 */

import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import OpenAI from "openai";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");

// ── CLI Flags ────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

function getFlag(name) {
  const i = args.indexOf(`--${name}`);
  return i !== -1 && i + 1 < args.length ? args[i + 1] : null;
}

const MUTABLE = getFlag("mutable");
const MAX_ITER = parseInt(getFlag("max") || "10", 10);
const MODEL = getFlag("model") || "qwen2.5:14b";
const CONTEXT_RAW = getFlag("context");
const OLLAMA_URL = getFlag("ollama-url") || "http://localhost:11434/v1";
const VERBOSE = args.includes("--verbose");

if (!MUTABLE) {
  console.error("Usage: node run-loop.mjs --mutable <path> --max <N> [--model qwen2.5:14b] [--context path1,path2] [--verbose]");
  console.error("\nRequired:");
  console.error("  --mutable <path>    Path to the single file to optimize");
  console.error("\nOptional:");
  console.error("  --max <N>           Maximum iterations (default: 10)");
  console.error("  --model <name>      Ollama model name (default: qwen2.5:14b)");
  console.error("  --context <paths>   Comma-separated read-only context files");
  console.error("  --ollama-url <url>  Ollama API URL (default: http://localhost:11434/v1)");
  console.error("  --verbose           Print detailed output to stderr");
  process.exit(1);
}

const CONTEXT_PATHS = CONTEXT_RAW ? CONTEXT_RAW.split(",").map(p => p.trim()) : [];

// ── Logging ──────────────────────────────────────────────────────────────────

const log = VERBOSE ? (...a) => console.error(...a) : () => {};
const info = (...a) => console.error(...a); // Always visible on stderr

// ── OpenAI client (Ollama-compatible) ────────────────────────────────────────

const client = new OpenAI({
  baseURL: OLLAMA_URL,
  apiKey: "ollama", // Ollama doesn't need a real key
});

async function callModel(systemPrompt, userPrompt, { temperature = 0.7, maxTokens = 2000 } = {}) {
  const messages = [];
  if (systemPrompt) messages.push({ role: "system", content: systemPrompt });
  messages.push({ role: "user", content: userPrompt });

  const response = await client.chat.completions.create({
    model: MODEL,
    messages,
    temperature,
    max_tokens: maxTokens,
  });

  return response.choices[0]?.message?.content || "";
}

// ── Prompt Templates ─────────────────────────────────────────────────────────

const PROMPTS_DIR = path.join(__dirname, "prompts");

async function loadPrompt(name, replacements = {}) {
  const templatePath = path.join(PROMPTS_DIR, `${name}.md`);
  let content = await readFile(templatePath, "utf8");
  for (const [key, value] of Object.entries(replacements)) {
    content = content.replaceAll(`{{${key}}}`, value);
  }
  return content;
}

// ── Git Helpers ──────────────────────────────────────────────────────────────

function git(cmd) {
  return execSync(`git ${cmd}`, { cwd: ROOT, encoding: "utf8" }).trim();
}

function gitLog(n = 20) {
  try {
    return git(`log --oneline --grep="autoresearch:" -${n}`);
  } catch {
    return "";
  }
}

function gitDirty() {
  return git("diff --name-only").length > 0;
}

function gitCommit(file, message) {
  git(`add "${file}"`);
  git(`commit -m "${message.replace(/"/g, '\\"')}"`);
}

function gitRevert() {
  git("revert HEAD --no-edit");
}

// ── Mechanical Scorer ────────────────────────────────────────────────────────

const SCORER_PATH = path.join(__dirname, "score-skill-output.mjs");

function runScorer(text) {
  // Pipe text to scorer via stdin
  const result = execSync(
    `node "${SCORER_PATH}" --stdin --verbose`,
    {
      cwd: ROOT,
      encoding: "utf8",
      input: text,
      timeout: 30_000,
    }
  );
  // stdout has the numeric score
  const score = parseFloat(result.trim());
  return isNaN(score) ? 0 : score;
}

// ── Load Test Topics ─────────────────────────────────────────────────────────

async function loadTopics() {
  const topicsPath = path.join(__dirname, "test-topics.json");
  const raw = await readFile(topicsPath, "utf8");
  return JSON.parse(raw);
}

// ── Resolve Home Dir ─────────────────────────────────────────────────────────

function resolveHome(p) {
  if (p.startsWith("~/")) {
    return path.join(process.env.HOME, p.slice(2));
  }
  return path.resolve(p);
}

// ── Load Context Chain ───────────────────────────────────────────────────────

async function loadContextChain() {
  const parts = [];
  for (const ctxPath of CONTEXT_PATHS) {
    const resolved = resolveHome(ctxPath);
    if (existsSync(resolved)) {
      const content = await readFile(resolved, "utf8");
      parts.push(`# Context: ${path.basename(resolved)}\n\n${content}`);
    } else {
      info(`Warning: context file not found: ${resolved}`);
    }
  }
  return parts.join("\n\n---\n\n");
}

// ── Parse JSON from Model Output ─────────────────────────────────────────────

function parseJSON(text) {
  // Try direct parse first
  try {
    return JSON.parse(text);
  } catch { /* continue */ }

  // Extract JSON from markdown code blocks
  const codeBlock = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?\s*```/);
  if (codeBlock) {
    try {
      return JSON.parse(codeBlock[1].trim());
    } catch { /* continue */ }
  }

  // Try finding array or object boundaries
  const jsonStart = text.indexOf("[") !== -1 ? text.indexOf("[") : text.indexOf("{");
  const isArray = text.indexOf("[") !== -1 && (text.indexOf("{") === -1 || text.indexOf("[") < text.indexOf("{"));
  const jsonEnd = isArray
    ? text.lastIndexOf("]")
    : text.lastIndexOf("}");

  if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
    try {
      return JSON.parse(text.slice(jsonStart, jsonEnd + 1));
    } catch { /* continue */ }
  }

  return null;
}

// ── Eval Procedure ───────────────────────────────────────────────────────────

async function runEval(skillContent, contextChain, topics) {
  const scores = [];
  const breakdowns = [];

  for (const topic of topics) {
    log(`  Generating sample for: ${topic.id}`);

    const prompt = await loadPrompt("generate-sample", {
      SKILL_CHAIN: `${skillContent}\n\n---\n\n${contextChain}`,
      TOPIC: topic.topic,
    });

    const sample = await callModel(null, prompt, { temperature: 0.8, maxTokens: 800 });

    if (!sample || sample.trim().length < 100) {
      log(`  Warning: sample too short for ${topic.id}, skipping`);
      continue;
    }

    log(`  Scoring sample (${sample.split(/\s+/).length} words)...`);
    const score = runScorer(sample);
    scores.push(score);
    breakdowns.push({ id: topic.id, score, wordCount: sample.split(/\s+/).length });

    log(`  ${topic.id}: ${score}/100`);
  }

  if (scores.length === 0) return { mean: 0, breakdowns: [] };

  const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
  return { mean: Math.round(mean * 10) / 10, breakdowns };
}

// ── Format Eval Breakdown ────────────────────────────────────────────────────

function formatBreakdown(evalResult) {
  const lines = evalResult.breakdowns.map(
    b => `  ${b.id}: ${b.score}/100 (${b.wordCount} words)`
  );
  lines.push(`  Mean: ${evalResult.mean}/100`);
  return lines.join("\n");
}

// ── Main Loop ────────────────────────────────────────────────────────────────

async function main() {
  const mutablePath = resolveHome(MUTABLE);

  // Verify mutable file exists
  if (!existsSync(mutablePath)) {
    console.error(`Error: mutable file not found: ${mutablePath}`);
    process.exit(1);
  }

  info(`\n=== Autoresearch v2 ===`);
  info(`Mutable: ${mutablePath}`);
  info(`Model: ${MODEL}`);
  info(`Ollama: ${OLLAMA_URL}`);
  info(`Max iterations: ${MAX_ITER}`);
  info(`Context files: ${CONTEXT_PATHS.length}`);

  // Crash recovery: check for dirty working tree
  if (gitDirty()) {
    info(`\nWarning: dirty working tree detected. Restoring mutable file...`);
    try {
      git(`checkout -- "${mutablePath}"`);
      info(`Restored: ${path.basename(mutablePath)}`);
    } catch (e) {
      info(`Could not restore: ${e.message}`);
    }
  }

  // Load resources
  const topics = await loadTopics();
  const contextChain = await loadContextChain();
  let skillContent = await readFile(mutablePath, "utf8");

  info(`\nLoaded ${topics.length} test topics`);
  info(`Loaded ${CONTEXT_PATHS.length} context files`);

  // Create branch
  const stem = path.basename(mutablePath, path.extname(mutablePath));
  const timestamp = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 12);
  const branchName = `autoresearch/${stem}-${timestamp}`;

  try {
    git(`checkout -b ${branchName}`);
    info(`\nBranch: ${branchName}`);
  } catch (e) {
    // Branch might already exist from a crashed run
    info(`Warning: could not create branch ${branchName}: ${e.message}`);
    info(`Continuing on current branch...`);
  }

  // Baseline eval
  info(`\n--- Baseline Eval ---`);
  const baseline = await runEval(skillContent, contextChain, topics);
  info(`Baseline score: ${baseline.mean}/100`);
  log(formatBreakdown(baseline));

  // Iteration tracking
  const iterLog = [];
  let currentScore = baseline.mean;
  let consecutiveReverts = 0;
  let totalKept = 0;
  let totalReverted = 0;

  // ── The Loop ───────────────────────────────────────────────────────────────

  for (let i = 1; i <= MAX_ITER; i++) {
    info(`\n=== Iteration ${i}/${MAX_ITER} (score: ${currentScore}/100) ===`);

    // Check stall
    if (consecutiveReverts >= 5) {
      info(`\nHard stop: 5 consecutive reverts. File may be at local optimum.`);
      break;
    }

    // Phase 1: REVIEW
    log(`\n[REVIEW]`);
    skillContent = await readFile(mutablePath, "utf8");
    const gitHistory = gitLog();

    // Phase 2: IDEATE
    log(`\n[IDEATE]`);
    const stalled = consecutiveReverts >= 3;
    let ideatePrompt = await loadPrompt("ideate", {
      SKILL_CONTENT: skillContent,
      GIT_LOG: gitHistory || "(no prior attempts)",
      EVAL_BREAKDOWN: formatBreakdown({ mean: currentScore, breakdowns: iterLog.length > 0 ? iterLog[iterLog.length - 1].breakdowns || [] : baseline.breakdowns }),
    });

    if (stalled) {
      ideatePrompt += "\n\nIMPORTANT: The last 3 attempts were all reverted. Incremental tweaks are not working. Propose STRUCTURAL changes: reorganize sections, merge/split rules, change the overall approach. Think bigger.";
    }

    const ideateResponse = await callModel(null, ideatePrompt, { temperature: 0.9 });
    const hypotheses = parseJSON(ideateResponse);

    if (!hypotheses || !Array.isArray(hypotheses) || hypotheses.length === 0) {
      info(`  Warning: could not parse hypotheses, skipping iteration`);
      log(`  Raw response: ${ideateResponse.slice(0, 200)}`);
      consecutiveReverts++;
      iterLog.push({
        iteration: i,
        hypothesis: "(parse failure)",
        before: currentScore,
        after: currentScore,
        delta: 0,
        decision: "SKIP",
      });
      continue;
    }

    const chosen = hypotheses[0];
    info(`  Hypothesis: ${chosen.hypothesis}`);
    info(`  Target: ${chosen.target_dimension} (${chosen.expected_impact} impact)`);

    // Phase 3: MODIFY
    log(`\n[MODIFY]`);
    const modifyPrompt = await loadPrompt("modify", {
      SKILL_CONTENT: skillContent,
      HYPOTHESIS: `${chosen.hypothesis}\n\nReasoning: ${chosen.reasoning}`,
    });

    const modifyResponse = await callModel(null, modifyPrompt, { temperature: 0.3 });
    const edit = parseJSON(modifyResponse);

    if (!edit || !edit.old_string || !edit.new_string) {
      info(`  Warning: could not parse edit, skipping iteration`);
      log(`  Raw response: ${modifyResponse.slice(0, 200)}`);
      consecutiveReverts++;
      iterLog.push({
        iteration: i,
        hypothesis: chosen.hypothesis,
        before: currentScore,
        after: currentScore,
        delta: 0,
        decision: "SKIP",
      });
      continue;
    }

    // Apply edit
    if (!skillContent.includes(edit.old_string)) {
      info(`  Warning: old_string not found in file, skipping iteration`);
      log(`  old_string: "${edit.old_string.slice(0, 100)}..."`);
      consecutiveReverts++;
      iterLog.push({
        iteration: i,
        hypothesis: chosen.hypothesis,
        before: currentScore,
        after: currentScore,
        delta: 0,
        decision: "SKIP (old_string not found)",
      });
      continue;
    }

    const newContent = skillContent.replace(edit.old_string, edit.new_string);
    await writeFile(mutablePath, newContent, "utf8");

    // Phase 4: COMMIT
    log(`\n[COMMIT]`);
    const commitMsg = `autoresearch: iteration ${i} — ${chosen.hypothesis}`;
    try {
      gitCommit(mutablePath, commitMsg);
    } catch (e) {
      info(`  Warning: commit failed: ${e.message}`);
      // Restore file
      await writeFile(mutablePath, skillContent, "utf8");
      consecutiveReverts++;
      iterLog.push({
        iteration: i,
        hypothesis: chosen.hypothesis,
        before: currentScore,
        after: currentScore,
        delta: 0,
        decision: "SKIP (commit failed)",
      });
      continue;
    }

    // Phase 5: VERIFY
    log(`\n[VERIFY]`);
    const newSkillContent = await readFile(mutablePath, "utf8");
    const evalResult = await runEval(newSkillContent, contextChain, topics);
    const delta = Math.round((evalResult.mean - currentScore) * 10) / 10;

    info(`  Score: ${currentScore} → ${evalResult.mean} (${delta >= 0 ? "+" : ""}${delta})`);

    // Phase 6: DECIDE
    log(`\n[DECIDE]`);
    let decision;
    if (evalResult.mean >= currentScore) {
      decision = "KEEP";
      currentScore = evalResult.mean;
      skillContent = newSkillContent;
      consecutiveReverts = 0;
      totalKept++;
      info(`  ✓ KEEP (${delta >= 0 ? "+" : ""}${delta})`);
    } else {
      decision = "REVERT";
      gitRevert();
      skillContent = await readFile(mutablePath, "utf8");
      consecutiveReverts++;
      totalReverted++;
      info(`  ✗ REVERT (${delta})`);
    }

    // Phase 7: LOG
    iterLog.push({
      iteration: i,
      hypothesis: chosen.hypothesis,
      target: chosen.target_dimension,
      before: currentScore === evalResult.mean && decision === "KEEP" ? currentScore - delta : currentScore,
      after: decision === "KEEP" ? evalResult.mean : currentScore,
      delta,
      decision,
      breakdowns: evalResult.breakdowns,
    });

    // Phase 8: REPEAT (loop continues)
  }

  // ── Completion Report ────────────────────────────────────────────────────

  const finalScore = currentScore;
  const totalDelta = Math.round((finalScore - baseline.mean) * 10) / 10;

  // Sort by positive delta for "top changes"
  const topChanges = iterLog
    .filter(l => l.decision === "KEEP" && l.delta > 0)
    .sort((a, b) => b.delta - a.delta)
    .slice(0, 5);

  console.log(`\n=== Autoresearch Complete ===`);
  console.log(`Skill: ${mutablePath}`);
  console.log(`Branch: ${branchName}`);
  console.log(`Model: ${MODEL}`);
  console.log(`Iterations: ${iterLog.length} run, ${totalKept} kept, ${totalReverted} reverted`);
  console.log(`Score: ${baseline.mean} → ${finalScore} (delta: ${totalDelta >= 0 ? "+" : ""}${totalDelta})`);

  if (topChanges.length > 0) {
    console.log(`\nTop changes (by impact):`);
    topChanges.forEach((c, i) => {
      console.log(`  ${i + 1}. Iteration ${c.iteration}: ${c.hypothesis} (+${c.delta})`);
    });
  }

  console.log(`\nIteration log:`);
  console.log(`${"Iter".padEnd(5)} | ${"Hypothesis".padEnd(50)} | ${"Before".padEnd(7)} | ${"After".padEnd(7)} | ${"Delta".padEnd(7)} | Decision`);
  console.log("-".repeat(100));
  for (const entry of iterLog) {
    const hyp = entry.hypothesis.length > 48 ? entry.hypothesis.slice(0, 48) + ".." : entry.hypothesis;
    const before = String(entry.before).padEnd(7);
    const after = String(entry.after).padEnd(7);
    const delta = (entry.delta >= 0 ? "+" : "") + entry.delta;
    console.log(`${String(entry.iteration).padEnd(5)} | ${hyp.padEnd(50)} | ${before} | ${after} | ${delta.padEnd(7)} | ${entry.decision}`);
  }

  const recommendation = totalDelta > 5 ? "merge to main" : totalDelta > 0 ? "review changes" : "discard — file at local optimum";
  console.log(`\nRecommendation: ${recommendation}`);
}

main().catch(err => {
  console.error(`\nFatal: ${err.message}`);
  console.error(err.stack);
  process.exit(1);
});
