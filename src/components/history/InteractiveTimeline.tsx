import {
  BookOpen,
  Sun,
  Swords,
  Snowflake,
  Shield,
  Waves,
  Building,
  Landmark,
  Droplets,
  Sword,
  Crown,
  Castle,
  ChevronDown,
} from "lucide-react";
import type { TimelineEra, TimelineEvent } from "@/data/history";
import type { LucideIcon } from "lucide-react";

// ---------------------------------------------------------------------------
// Icon map
// ---------------------------------------------------------------------------
const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  Sun,
  Swords,
  Snowflake,
  Shield,
  Waves,
  Building,
  Landmark,
  Droplets,
  Sword,
  Crown,
  Castle,
};

// ---------------------------------------------------------------------------
// Era color map → Tailwind classes
// ---------------------------------------------------------------------------
const eraColors: Record<
  string,
  { dot: string; line: string; badge: string; ring: string; text: string }
> = {
  amber: {
    dot: "bg-amber-500",
    line: "bg-amber-500/20",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    ring: "ring-amber-500/30",
    text: "text-amber-400",
  },
  emerald: {
    dot: "bg-emerald-500",
    line: "bg-emerald-500/20",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    ring: "ring-emerald-500/30",
    text: "text-emerald-400",
  },
  slate: {
    dot: "bg-slate-500",
    line: "bg-slate-500/20",
    badge: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    ring: "ring-slate-500/30",
    text: "text-slate-400",
  },
  orange: {
    dot: "bg-orange-500",
    line: "bg-orange-500/20",
    badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    ring: "ring-orange-500/30",
    text: "text-orange-400",
  },
  sky: {
    dot: "bg-sky-500",
    line: "bg-sky-500/20",
    badge: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    ring: "ring-sky-500/30",
    text: "text-sky-400",
  },
  violet: {
    dot: "bg-violet-500",
    line: "bg-violet-500/20",
    badge: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    ring: "ring-violet-500/30",
    text: "text-violet-400",
  },
  rose: {
    dot: "bg-rose-500",
    line: "bg-rose-500/20",
    badge: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    ring: "ring-rose-500/30",
    text: "text-rose-400",
  },
};

const fallbackColor = eraColors.amber;

// ---------------------------------------------------------------------------
// Expandable Event Card — uses <details>/<summary> for crawlability
// ---------------------------------------------------------------------------
function EventCard({
  event,
  color,
}: {
  event: TimelineEvent;
  color: (typeof eraColors)[string];
}) {
  const Icon = iconMap[event.icon] ?? BookOpen;

  return (
    <div className="relative pl-10 md:pl-14 pb-8 last:pb-0">
      {/* Dot on the timeline */}
      <div
        className={`absolute left-0 md:left-2 top-1 w-6 h-6 rounded-full ${color.dot} ring-4 ${color.ring} flex items-center justify-center z-10`}
      >
        <Icon className="w-3 h-3 text-white" />
      </div>

      {/* Card */}
      <details className="group glass-card rounded-xl border border-white/5 hover:border-white/10 transition-all duration-200">
        <summary className="flex items-start justify-between gap-3 p-4 md:p-5 cursor-pointer select-none">
          <div className="flex-1 min-w-0">
            <span className={`text-xs font-mono font-semibold ${color.text}`}>
              {event.dateLabel}
            </span>
            <h4 className="text-base md:text-lg font-display font-bold mt-1 leading-snug">
              {event.title}
            </h4>
            <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2">
              {event.description}
            </p>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0 mt-1 transition-transform duration-200 group-open:rotate-180" />
        </summary>

        <div className="grid md:grid-cols-3 gap-4 px-4 md:px-5 pb-4 md:pb-5 pt-4 border-t border-white/5">
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-orange-400/70 mb-1.5">
              Indian Event (Oak/Bhaty)
            </h5>
            <p className="text-sm text-muted-foreground">
              {event.indianEvent}
            </p>
          </div>
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-sky-400/70 mb-1.5">
              Conventional Record
            </h5>
            <p className="text-sm text-muted-foreground">
              {event.conventionalRecord}
            </p>
          </div>
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-violet-400/70 mb-1.5">
              Global Context
            </h5>
            <p className="text-sm text-muted-foreground">
              {event.globalContext}
            </p>
          </div>
        </div>
      </details>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Timeline
// ---------------------------------------------------------------------------
interface InteractiveTimelineProps {
  eras: TimelineEra[];
}

export function InteractiveTimeline({ eras }: InteractiveTimelineProps) {
  return (
    <div className="relative">
      {eras.map((era) => {
        const color = eraColors[era.color] ?? fallbackColor;

        return (
          <div key={era.id} className="mb-12 last:mb-0">
            {/* Era header */}
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-3 h-3 rounded-full ${color.dot}`} />
              <h3 className="text-xl md:text-2xl font-display font-bold">
                {era.name}
              </h3>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full border ${color.badge}`}
              >
                {era.dateRange}
              </span>
            </div>

            {/* Events with connecting line */}
            <div className="relative">
              {/* Vertical line */}
              <div
                className={`absolute left-[11px] md:left-[19px] top-0 bottom-0 w-px ${color.line}`}
              />

              {era.events.map((event) => (
                <EventCard key={event.id} event={event} color={color} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
