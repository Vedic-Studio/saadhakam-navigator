import { Globe } from "lucide-react";

interface GlobalContextItem {
  region: string;
  description: string;
}

interface GlobalContextTimelineProps {
  globalContext: GlobalContextItem[];
}

export function GlobalContextTimeline({
  globalContext,
}: GlobalContextTimelineProps) {
  if (globalContext.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2">
        <Globe className="w-5 h-5 text-sky-400" />
        Global Context
      </h2>
      <p className="text-sm text-muted-foreground">
        What was happening elsewhere in the world during this period.
      </p>
      <div className="grid gap-3">
        {globalContext.map((item, i) => (
          <div
            key={i}
            className="glass-card rounded-xl border border-white/5 p-4 flex gap-4"
          >
            <div className="shrink-0">
              <span className="inline-block px-2.5 py-1 bg-sky-500/10 text-sky-400 text-xs font-semibold rounded-lg">
                {item.region}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
