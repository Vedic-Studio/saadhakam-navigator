import {
  Telescope,
  Star,
  Anchor,
  MapPin,
  Globe,
  BookMarked,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Researcher } from "@/data/history";

const iconMap: Record<string, LucideIcon> = {
  Telescope,
  Star,
  Anchor,
  MapPin,
  Globe,
  BookMarked,
};

interface ResearcherCardProps {
  researcher: Researcher;
}

export function ResearcherCard({ researcher }: ResearcherCardProps) {
  const Icon = iconMap[researcher.icon] ?? Globe;

  return (
    <div className="glass-card rounded-2xl border border-white/5 hover:border-orange-500/20 transition-all duration-300 p-6 flex flex-col h-full">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6 text-orange-400" />
        </div>
        <div>
          <h3 className="text-lg font-display font-bold">{researcher.name}</h3>
          <p className="text-sm text-muted-foreground">{researcher.title}</p>
          <p className="text-xs text-muted-foreground/70 mt-0.5">
            {researcher.affiliation}
          </p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        {researcher.methodology}
      </p>

      <div className="mb-4 flex-grow">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-orange-400/70 mb-2">
          Key Claims
        </h4>
        <ul className="space-y-1.5">
          {researcher.keyClaims.map((claim, i) => (
            <li
              key={i}
              className="text-sm text-foreground/80 flex items-start gap-2"
            >
              <span className="text-orange-500/60 mt-1 shrink-0">&bull;</span>
              {claim}
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-white/5 pt-3 mt-auto">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-1.5">
          Major Works
        </h4>
        <p className="text-xs text-muted-foreground">
          {researcher.majorWorks.join(" \u00b7 ")}
        </p>
      </div>
    </div>
  );
}
