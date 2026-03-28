import { CheckCircle, FlaskConical, HelpCircle } from "lucide-react";
import type { EvidenceItem } from "@/data/history";

const statusConfig = {
  confirmed: {
    icon: CheckCircle,
    label: "Independently Verifiable",
    color: "text-emerald-400",
    border: "border-emerald-500/20",
    bg: "bg-emerald-950/30",
    accent: "bg-emerald-500",
  },
  strong: {
    icon: FlaskConical,
    label: "Strong Evidence",
    color: "text-amber-400",
    border: "border-amber-500/20",
    bg: "bg-amber-950/30",
    accent: "bg-amber-500",
  },
  open: {
    icon: HelpCircle,
    label: "Open Question",
    color: "text-sky-400",
    border: "border-sky-500/20",
    bg: "bg-sky-950/30",
    accent: "bg-sky-500",
  },
} as const;

interface EvidenceCardProps {
  item: EvidenceItem;
}

export function EvidenceCard({ item }: EvidenceCardProps) {
  const status = statusConfig[item.status];
  const StatusIcon = status.icon;

  return (
    <div
      className={`rounded-2xl border ${status.border} ${status.bg} p-5 transition-all duration-300 hover:border-opacity-40`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-1 h-full min-h-[20px] rounded-full ${status.accent} shrink-0`} />
        <h4 className="text-base font-semibold leading-snug">{item.claim}</h4>
      </div>

      <p className="text-sm text-muted-foreground mb-3 pl-4">
        {item.evidence}
      </p>

      <div className="flex items-center gap-1.5 pl-4">
        <StatusIcon className={`w-3.5 h-3.5 ${status.color}`} />
        <span className={`text-xs ${status.color}`}>{item.notes}</span>
      </div>
    </div>
  );
}
