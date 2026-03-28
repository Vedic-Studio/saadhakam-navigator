import { MapPin, CheckCircle, FlaskConical, HelpCircle } from "lucide-react";
import type { ArchaeologicalSite } from "@/data/history";

const statusConfig = {
  confirmed: {
    icon: CheckCircle,
    label: "Confirmed",
    color: "text-emerald-400",
    border: "border-emerald-500/20",
    bg: "bg-emerald-500/10",
  },
  strong: {
    icon: FlaskConical,
    label: "Strong Evidence",
    color: "text-amber-400",
    border: "border-amber-500/20",
    bg: "bg-amber-500/10",
  },
  open: {
    icon: HelpCircle,
    label: "Open Question",
    color: "text-sky-400",
    border: "border-sky-500/20",
    bg: "bg-sky-500/10",
  },
} as const;

interface SiteCardProps {
  site: ArchaeologicalSite;
}

export function SiteCard({ site }: SiteCardProps) {
  const status = statusConfig[site.evidenceType];
  const StatusIcon = status.icon;

  return (
    <div className="glass-card rounded-2xl border border-white/5 hover:border-orange-500/20 transition-all duration-300 p-6 flex flex-col h-full">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-display font-bold">{site.name}</h3>
        <span
          className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${status.bg} ${status.color}`}
        >
          <StatusIcon className="w-3 h-3" />
          {status.label}
        </span>
      </div>

      <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-1">
        <MapPin className="w-3.5 h-3.5" />
        {site.location}
      </div>

      <p className="text-sm text-orange-400/80 font-medium mb-4">
        {site.dateRange}
      </p>

      <ul className="space-y-2 mb-4 flex-grow">
        {site.keyFindings.map((finding, i) => (
          <li
            key={i}
            className="text-sm text-muted-foreground flex items-start gap-2"
          >
            <span className="text-orange-500/60 mt-1 shrink-0">&bull;</span>
            {finding}
          </li>
        ))}
      </ul>

      <p className="text-sm text-foreground/80 border-t border-white/5 pt-3 mt-auto">
        {site.significance}
      </p>
    </div>
  );
}
