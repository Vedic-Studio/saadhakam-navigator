import type { CounterArgument } from "@/data/evidence";

interface CounterArgumentsSectionProps {
  counterArguments: CounterArgument[];
}

export function CounterArgumentsSection({
  counterArguments,
}: CounterArgumentsSectionProps) {
  if (counterArguments.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-foreground">
        Counter-Arguments & Responses
      </h2>
      <div className="space-y-4">
        {counterArguments.map((ca, i) => (
          <div
            key={i}
            className="glass-card rounded-xl border border-white/5 p-5"
          >
            <div className="mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-red-400/70">
                Challenge
              </span>
              <p className="text-sm text-foreground/90 mt-1">{ca.argument}</p>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400/70">
                Response
              </span>
              <p className="text-sm text-foreground/90 mt-1">{ca.response}</p>
              {ca.source && (
                <p className="text-xs text-muted-foreground/60 mt-1">
                  Source: {ca.source}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
