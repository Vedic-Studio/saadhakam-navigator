/**
 * Interactive CLI review loop for Sadhaka image generation.
 * Opens images for human review with approve/reject/edit workflow.
 *
 * Usage:
 *   node scripts/review-images.mjs                          # review all generated
 *   node scripts/review-images.mjs --type deity             # deities only
 *   node scripts/review-images.mjs --prompts-only           # review prompts before generation
 */
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { createInterface } from "node:readline";
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const MANIFEST_PATH = path.join(__dirname, "image-manifest.json");
const CONFIG_PATH = path.join(__dirname, "image-config.json");

// ── CLI flags ───────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const PROMPTS_ONLY = args.includes("--prompts-only");
const TYPE = (() => {
    const i = args.indexOf("--type");
    return i !== -1 ? args[i + 1] : null;
})();

const rl = createInterface({ input: process.stdin, output: process.stdout });
function ask(q) {
    return new Promise((resolve) => rl.question(q, resolve));
}

async function main() {
    if (!existsSync(MANIFEST_PATH)) {
        console.error("Error: image-manifest.json not found.");
        process.exit(1);
    }

    const manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
    const config = JSON.parse(await readFile(CONFIG_PATH, "utf8"));

    // Filter entries based on review mode
    const targetStatus = PROMPTS_ONLY ? ["prompt-ready"] : ["generated"];
    const entries = Object.entries(manifest.entries).filter(([key, entry]) => {
        if (TYPE && entry.pageType !== TYPE) return false;
        return targetStatus.includes(entry.status);
    });

    if (entries.length === 0) {
        const mode = PROMPTS_ONLY ? "prompt-ready" : "generated";
        console.log(`No entries with status "${mode}" to review.`);
        rl.close();
        return;
    }

    const modeLabel = PROMPTS_ONLY ? "PROMPT REVIEW" : "IMAGE REVIEW";
    console.log(`\n── ${modeLabel} (${entries.length} items) ──\n`);

    let approved = 0;
    let rejected = 0;
    let skipped = 0;

    for (let i = 0; i < entries.length; i++) {
        const [key, entry] = entries[i];
        console.log(`\n[${i + 1}/${entries.length}] ${key}`);
        console.log(`  Title: ${entry.title}`);

        if (PROMPTS_ONLY) {
            // Prompt review mode
            console.log(`  Prompt:\n${entry.prompt.split("\n").map((l) => `    ${l}`).join("\n")}`);
            console.log(`  Alt text: ${entry.altText}`);

            const choice = await ask("\n  [a]pprove / [e]dit prompt / [s]kip / [q]uit: ");

            if (choice === "a") {
                manifest.entries[key] = { ...entry, status: "prompt-approved", promptApprovedAt: new Date().toISOString() };
                approved++;
                console.log("  ✓ Prompt approved");
            } else if (choice === "e") {
                const newPrompt = await ask("  Enter new prompt (or press Enter to keep current):\n  > ");
                if (newPrompt.trim()) {
                    manifest.entries[key] = { ...entry, prompt: newPrompt.trim(), status: "prompt-ready", promptEditedAt: new Date().toISOString() };
                    console.log("  ✓ Prompt updated (still needs approval)");
                }
                const newAlt = await ask("  Enter new alt text (or press Enter to keep current):\n  > ");
                if (newAlt.trim()) {
                    manifest.entries[key].altText = newAlt.trim().slice(0, 125);
                }
                skipped++;
            } else if (choice === "q") {
                break;
            } else {
                skipped++;
            }
        } else {
            // Image review mode
            const rawPath = entry.rawPngPath;
            const publicPath = path.join(ROOT, "public", entry.publicPath);
            const imagePath = existsSync(publicPath) ? publicPath : rawPath;

            if (!existsSync(imagePath)) {
                console.log(`  ⚠ Image not found at ${imagePath}`);
                skipped++;
                continue;
            }

            // Open image for viewing
            try {
                execSync(`open "${imagePath}"`, { stdio: "ignore" });
                console.log(`  📷 Opened: ${imagePath}`);
            } catch {
                console.log(`  ⚠ Could not open image. View manually: ${imagePath}`);
            }

            console.log(`  Prompt: ${entry.prompt.slice(0, 200)}...`);
            console.log(`  Alt: ${entry.altText}`);

            const choice = await ask("\n  [a]pprove / [r]eject / [e]dit prompt & regenerate / [s]kip / [q]uit: ");

            if (choice === "a") {
                manifest.entries[key] = { ...entry, status: "reviewed", reviewedAt: new Date().toISOString() };
                approved++;
                console.log("  ✓ Approved");

                // Ask if this should be saved as a refined pattern
                const savePattern = await ask("  Save as refined pattern for future use? [y/n]: ");
                if (savePattern === "y") {
                    const notes = await ask("  Notes (what worked well): ");
                    config.refinedPatterns[key] = {
                        effectivePromptFragment: entry.prompt.match(/Subject: (.+?)\./s)?.[1] ?? "",
                        notes: notes.trim(),
                        approvedAt: new Date().toISOString(),
                    };
                    await writeFile(CONFIG_PATH, JSON.stringify(config, null, 2), "utf8");
                    console.log("  ✓ Saved refined pattern");
                }
            } else if (choice === "r") {
                const notes = await ask("  Rejection notes: ");
                manifest.entries[key] = {
                    ...entry,
                    status: "rejected",
                    reviewNotes: notes.trim(),
                    rejectedAt: new Date().toISOString(),
                };
                rejected++;
                console.log("  ✗ Rejected — edit prompt and regenerate");
            } else if (choice === "e") {
                const newPrompt = await ask("  Enter updated prompt:\n  > ");
                if (newPrompt.trim()) {
                    manifest.entries[key] = {
                        ...entry,
                        prompt: newPrompt.trim(),
                        status: "prompt-ready",
                        promptEditedAt: new Date().toISOString(),
                    };
                    console.log("  ✓ Prompt updated — will regenerate on next generate-images.mjs run");
                }
                skipped++;
            } else if (choice === "q") {
                break;
            } else {
                skipped++;
            }
        }

        // Save after each review
        await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf8");
    }

    console.log(`\nReview complete. Approved: ${approved}, Rejected: ${rejected}, Skipped: ${skipped}`);
    rl.close();
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
