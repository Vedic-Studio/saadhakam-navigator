import { CheckCircle, FlaskConical, HelpCircle } from "lucide-react";

const statusConfig = {
  confirmed: {
    icon: CheckCircle,
    label: "Confirmed",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  strong: {
    icon: FlaskConical,
    label: "Strong Evidence",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  open: {
    icon: HelpCircle,
    label: "Open Question",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
  },
} as const;

export type EvidenceStatus = keyof typeof statusConfig;

interface EvidenceStatusBadgeProps {
  status: EvidenceStatus;
  size?: "sm" | "md";
}

export function EvidenceStatusBadge({ status, size = "sm" }: EvidenceStatusBadgeProps) {
  const config = statusConfig[status];
  const StatusIcon = config.icon;
  const iconSize = size === "sm" ? "w-3 h-3" : "w-4 h-4";
  const textSize = size === "sm" ? "text-xs" : "text-sm";
  const padding = size === "sm" ? "px-2 py-1" : "px-3 py-1.5";

  return (
    <span className={`inline-flex items-center gap-1 ${textSize} ${padding} rounded-full ${config.bg} ${config.color}`}>
      <StatusIcon className={iconSize} />
      {config.label}
    </span>
  );
}
