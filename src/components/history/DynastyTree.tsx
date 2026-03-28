"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { DynastyNode } from "@/data/history";

// ---------------------------------------------------------------------------
// Branch colors
// ---------------------------------------------------------------------------
const branchColors = {
  surya: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    text: "text-amber-400",
    dot: "bg-amber-500",
    line: "border-amber-500/20",
    label: "Solar Dynasty (Suryavansha)",
  },
  chandra: {
    bg: "bg-slate-400/10",
    border: "border-slate-400/30",
    text: "text-slate-300",
    dot: "bg-slate-400",
    line: "border-slate-400/20",
    label: "Lunar Dynasty (Chandravansha)",
  },
  historical: {
    bg: "bg-rose-500/10",
    border: "border-rose-500/30",
    text: "text-rose-400",
    dot: "bg-rose-500",
    line: "border-rose-500/20",
    label: "Historical Period",
  },
} as const;

// Highlight nodes — key figures get a brighter treatment
const highlightNodes = new Set([
  "brahma",
  "rama",
  "krishna",
  "pandavas-kauravas",
  "parikshit",
  "haryanka",
  "maurya-node",
]);

// ---------------------------------------------------------------------------
// Single Node
// ---------------------------------------------------------------------------
function TreeNode({
  node,
  nodeMap,
  depth,
}: {
  node: DynastyNode;
  nodeMap: Map<string, DynastyNode>;
  depth: number;
}) {
  const [expanded, setExpanded] = useState(depth < 3);
  const hasChildren = node.children.length > 0;
  const colors = branchColors[node.branch];
  const isHighlighted = highlightNodes.has(node.id);

  return (
    <div className="relative">
      {/* Node card */}
      <button
        onClick={() => hasChildren && setExpanded(!expanded)}
        className={`
          w-full text-left rounded-xl border p-3 md:p-4 transition-all duration-200
          ${isHighlighted ? `${colors.bg} ${colors.border}` : "border-white/5 hover:border-white/10"}
          ${hasChildren ? "cursor-pointer" : "cursor-default"}
        `}
        disabled={!hasChildren}
      >
        <div className="flex items-start gap-3">
          <div className={`w-2.5 h-2.5 rounded-full ${colors.dot} mt-1.5 shrink-0`} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`font-display font-bold ${isHighlighted ? "text-base md:text-lg" : "text-sm md:text-base"}`}
              >
                {node.name}
              </span>
              {node.era && (
                <span className={`text-xs ${colors.text} font-mono`}>
                  {node.era}
                </span>
              )}
              {hasChildren && (
                <motion.div
                  animate={{ rotate: expanded ? 90 : 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                </motion.div>
              )}
            </div>
            {node.title && (
              <p className="text-xs text-muted-foreground mt-0.5">
                {node.title}
              </p>
            )}
            {node.note && isHighlighted && (
              <p className={`text-xs ${colors.text} mt-1 opacity-70`}>
                {node.note}
              </p>
            )}
          </div>
        </div>
      </button>

      {/* Children */}
      {hasChildren && (
        <motion.div
          animate={{
            height: expanded ? "auto" : 0,
            opacity: expanded ? 1 : 0,
          }}
          initial={false}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
          aria-hidden={!expanded}
        >
          <div className={`ml-4 md:ml-6 mt-2 pl-4 border-l-2 ${colors.line} space-y-2`}>
            {node.children.map((childId) => {
              const child = nodeMap.get(childId);
              if (!child) return null;
              return (
                <TreeNode
                  key={child.id}
                  node={child}
                  nodeMap={nodeMap}
                  depth={depth + 1}
                />
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Dynasty Tree
// ---------------------------------------------------------------------------
interface DynastyTreeProps {
  nodes: DynastyNode[];
}

export function DynastyTree({ nodes }: DynastyTreeProps) {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  const root = nodes.find((n) => !n.parent);

  if (!root) return null;

  return (
    <div>
      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6">
        {Object.entries(branchColors).map(([key, colors]) => (
          <div key={key} className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${colors.dot}`} />
            <span className="text-xs text-muted-foreground">{colors.label}</span>
          </div>
        ))}
      </div>

      {/* Tree */}
      <div className="space-y-2">
        <TreeNode node={root} nodeMap={nodeMap} depth={0} />
      </div>
    </div>
  );
}
