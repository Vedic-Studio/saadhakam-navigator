/**
 * Deterministic anti-pattern scanner for CMS content.
 *
 * Inspired by CricTracker's exclusion_scan.py — catches specific AI writing
 * patterns via regex, not LLM evaluation. Same input, same output, every time.
 *
 * Designed for two integration points:
 * 1. Editor agent Pass 0 (zero tolerance — blocks advancement)
 * 2. CMS content save (advisory — surfaced in ScoreCard UI)
 */

export type ViolationType =
    | "CONCESSION"
    | "EM_DASH"
    | "BINARY_CONTRAST"
    | "THROAT_CLEARING"
    | "FILLER_ADVERB"
    | "FALSE_AGENCY"
    | "NEGATIVE_LISTING"
    | "TRICOLON"
    | "DRAMATIC_FRAGMENTATION"
    | "MIC_DROP";

export interface Violation {
    type: ViolationType;
    line: number;
    matched: string;
    context: string;
    fix: string;
}

export interface ScanResult {
    passed: boolean;
    violations: Violation[];
    summary: string;
}

// --- Pattern Definitions ---

const CONCESSION_PHRASES = /\b(nobody disputes|make no mistake|no one questions|talent is not in question|to be fair|there(?:'s| is) no (?:denying|doubting|questioning)|credit where (?:it's|it is) due|say what you will)\b/i;

const EM_DASH_PATTERN = /\u2014|(?<= )--(?= )/;

const BINARY_CONTRAST = /\b(?:it(?:'s| is) not .{3,40},\s*it(?:'s| is) |less about .{3,30},?\s*more about|isn(?:'t| not) .{3,30}[\u2014—]\s*it(?:'s| is) )/i;

const THROAT_CLEARING = /^(?:here(?:'s| is) (?:the thing|what|why|how)|the (?:reality|truth|fact) (?:is|remains)|it(?:'s| is) worth noting|let(?:'s| us) be (?:honest|clear|real)|the bottom line is|at the end of the day)/i;

const FILLER_ADVERBS = /\b(essentially|incredibly|absolutely|fundamentally|arguably|undeniably|literally|ultimately|certainly|undoubtedly|unquestionably|genuinely|simply put|quite simply|in essence)\b/i;

// Inanimate subjects that shouldn't have human agency
const INANIMATE_SUBJECTS = /\b(?:the )?(?:price|reputation|narrative|numbers?|stats?|record|tournament|pressure|data|tradition|history|legacy|scripture|text|verse|teaching|philosophy|doctrine|concept)\b/i;
const HUMAN_VERBS = /\b(?:demands?|insists?|refuses?|believes?|argues?|tells?|speaks?|screams?|outpaces?|betrays?|forgives?|punishes?|whispers?|beckons?|calls upon|invites? us)\b/i;

const NEGATIVE_LISTING = /^(?:not|no|neither) .{3,60}\.?\s*(?:not|no|nor) .{3,60}\.?\s*(?:but|just|only) /im;

function stripFrontmatter(content: string): string {
    if (content.startsWith("---")) {
        const endIndex = content.indexOf("---", 3);
        if (endIndex !== -1) {
            return content.slice(endIndex + 3).trim();
        }
    }
    return content;
}

function isHeading(line: string): boolean {
    return /^#{1,6}\s/.test(line);
}

function scanLinePatterns(lines: string[]): Violation[] {
    const violations: Violation[] = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line || isHeading(line)) continue;

        const lineNum = i + 1;

        // Concession phrases
        const concessionMatch = CONCESSION_PHRASES.exec(line);
        if (concessionMatch) {
            violations.push({
                type: "CONCESSION",
                line: lineNum,
                matched: concessionMatch[0],
                context: line,
                fix: "Delete the hedge — argue directly.",
            });
        }

        // Em dashes for dramatic effect
        const emDashMatch = EM_DASH_PATTERN.exec(line);
        if (emDashMatch) {
            violations.push({
                type: "EM_DASH",
                line: lineNum,
                matched: emDashMatch[0],
                context: line,
                fix: "Split into two sentences or use a comma.",
            });
        }

        // Binary contrast (it's not X, it's Y)
        const binaryMatch = BINARY_CONTRAST.exec(line);
        if (binaryMatch) {
            violations.push({
                type: "BINARY_CONTRAST",
                line: lineNum,
                matched: binaryMatch[0],
                context: line,
                fix: "State the positive claim directly.",
            });
        }

        // Throat-clearing openers
        const throatMatch = THROAT_CLEARING.exec(line);
        if (throatMatch) {
            violations.push({
                type: "THROAT_CLEARING",
                line: lineNum,
                matched: throatMatch[0],
                context: line,
                fix: "Cut the opener — start with the point.",
            });
        }

        // Filler adverbs
        const fillerMatch = FILLER_ADVERBS.exec(line);
        if (fillerMatch) {
            violations.push({
                type: "FILLER_ADVERB",
                line: lineNum,
                matched: fillerMatch[0],
                context: line,
                fix: "Delete the adverb — the sentence is stronger without it.",
            });
        }

        // False agency (inanimate subject + human verb)
        const subjectMatch = INANIMATE_SUBJECTS.exec(line);
        if (subjectMatch) {
            // Check if a human verb follows within 40 chars
            const afterSubject = line.slice(subjectMatch.index + subjectMatch[0].length, subjectMatch.index + subjectMatch[0].length + 40);
            const verbMatch = HUMAN_VERBS.exec(afterSubject);
            if (verbMatch) {
                violations.push({
                    type: "FALSE_AGENCY",
                    line: lineNum,
                    matched: `${subjectMatch[0]} ... ${verbMatch[0]}`,
                    context: line,
                    fix: "Rewrite with a human subject, or use a neutral verb (shows, indicates, demonstrates).",
                });
            }
        }
    }

    return violations;
}

function scanNegativeListing(content: string): Violation[] {
    const violations: Violation[] = [];
    const match = NEGATIVE_LISTING.exec(content);

    if (match) {
        const linesBefore = content.slice(0, match.index).split("\n").length;
        violations.push({
            type: "NEGATIVE_LISTING",
            line: linesBefore,
            matched: match[0].slice(0, 80),
            context: match[0].slice(0, 120),
            fix: "State what it IS, not what it isn't.",
        });
    }

    return violations;
}

function scanTricolons(lines: string[]): Violation[] {
    const violations: Violation[] = [];
    // Detect "X verbed Y, X verbed Y, and X verbed Y" on a single line
    const tricolonPattern = /([a-z]+(?:ed|ing|s|es) [^,]{3,30}),\s*\1.{0,5},\s*(?:and\s*)?\1/i;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line || isHeading(line)) continue;

        // Also check for three comma-separated parallel phrases
        const commaSegments = line.split(",").map((s) => s.trim());
        if (commaSegments.length >= 3) {
            // Check if 3 consecutive segments start with the same word
            for (let j = 0; j <= commaSegments.length - 3; j++) {
                const firstWords = [
                    commaSegments[j].split(/\s+/)[0]?.toLowerCase(),
                    commaSegments[j + 1].split(/\s+/)[0]?.toLowerCase(),
                    commaSegments[j + 2].split(/\s+/)[0]?.toLowerCase(),
                ];
                if (firstWords[0] && firstWords[0] === firstWords[1] && firstWords[1] === firstWords[2]) {
                    violations.push({
                        type: "TRICOLON",
                        line: i + 1,
                        matched: commaSegments.slice(j, j + 3).join(", ").slice(0, 80),
                        context: line,
                        fix: "Pick the strongest of the three and state it directly.",
                    });
                    break;
                }
            }
        }

        const tricolonMatch = tricolonPattern.exec(line);
        if (tricolonMatch) {
            violations.push({
                type: "TRICOLON",
                line: i + 1,
                matched: tricolonMatch[0].slice(0, 80),
                context: line,
                fix: "Pick the strongest of the three and state it directly.",
            });
        }
    }

    return violations;
}

function scanDramaticFragmentation(lines: string[]): Violation[] {
    const violations: Violation[] = [];
    let shortSentenceRun = 0;
    let runStartLine = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line || isHeading(line)) {
            shortSentenceRun = 0;
            continue;
        }

        const wordCount = line.split(/\s+/).length;
        // Short sentence: 5 words or fewer, ends with period/exclamation
        if (wordCount <= 5 && /[.!]$/.test(line)) {
            if (shortSentenceRun === 0) runStartLine = i + 1;
            shortSentenceRun++;
        } else {
            shortSentenceRun = 0;
        }

        if (shortSentenceRun >= 3) {
            violations.push({
                type: "DRAMATIC_FRAGMENTATION",
                line: runStartLine,
                matched: `${shortSentenceRun} consecutive short sentences`,
                context: lines.slice(runStartLine - 1, i + 1).join(" ").slice(0, 120),
                fix: "Combine into proper sentences.",
            });
            shortSentenceRun = 0;
        }
    }

    return violations;
}

function scanMicDropEndings(lines: string[]): Violation[] {
    const violations: Violation[] = [];
    // Look for short metaphorical endings at the end of sections
    const metaphorIndicators = /\b(that's|this is|and that|enough said|full stop|period|end of story|mic drop|drop the mic|case closed|nothing more|say less)\b/i;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line || isHeading(line)) continue;

        const wordCount = line.split(/\s+/).length;
        const nextLine = lines[i + 1]?.trim();
        const isEndOfSection = !nextLine || isHeading(nextLine || "");

        if (isEndOfSection && wordCount <= 12 && metaphorIndicators.test(line)) {
            violations.push({
                type: "MIC_DROP",
                line: i + 1,
                matched: line,
                context: line,
                fix: "Replace with a specific fact, date, or name.",
            });
        }
    }

    return violations;
}

export function scanContent(content: string): ScanResult {
    const stripped = stripFrontmatter(content);
    const lines = stripped.split("\n");

    const violations: Violation[] = [
        ...scanLinePatterns(lines),
        ...scanNegativeListing(stripped),
        ...scanTricolons(lines),
        ...scanDramaticFragmentation(lines),
        ...scanMicDropEndings(lines),
    ];

    // Sort by line number
    violations.sort((a, b) => a.line - b.line);

    const typeCounts = new Map<ViolationType, number>();
    for (const v of violations) {
        typeCounts.set(v.type, (typeCounts.get(v.type) || 0) + 1);
    }

    const summary = violations.length === 0
        ? "PASS — no anti-patterns detected"
        : `FAIL — ${violations.length} violation${violations.length > 1 ? "s" : ""}: ${[...typeCounts.entries()].map(([type, count]) => `${type}(${count})`).join(", ")}`;

    return {
        passed: violations.length === 0,
        violations,
        summary,
    };
}

/**
 * Calculate score deduction for Authenticity dimension based on violations.
 * Each violation deducts 0.5 points, max deduction is 3 points.
 */
export function authenticityDeduction(result: ScanResult): number {
    return Math.min(result.violations.length * 0.5, 3);
}
