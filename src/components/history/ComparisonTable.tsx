import type { ComparisonPoint } from "@/data/civilizations";

interface ComparisonTableProps {
  comparisonPoints: ComparisonPoint[];
  entityA: string;
  entityB: string;
}

export function ComparisonTable({
  comparisonPoints,
  entityA,
  entityB,
}: ComparisonTableProps) {
  return (
    <div className="space-y-4">
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-muted-foreground font-semibold w-[18%]">
                Period
              </th>
              <th className="text-left py-3 px-4 text-orange-400 font-semibold w-[36%]">
                {entityA}
              </th>
              <th className="text-left py-3 px-4 text-sky-400 font-semibold w-[36%]">
                {entityB}
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonPoints.map((point, i) => (
              <tr
                key={i}
                className="border-b border-white/5 last:border-0"
              >
                <td className="py-3 px-4 align-top font-medium text-foreground/80 whitespace-nowrap">
                  {point.dateRange}
                </td>
                <td className="py-3 px-4 align-top text-muted-foreground leading-relaxed">
                  {point.india}
                </td>
                <td className="py-3 px-4 align-top text-muted-foreground leading-relaxed">
                  {point.other}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-4">
        {comparisonPoints.map((point, i) => (
          <div
            key={i}
            className="rounded-xl border border-white/5 p-4 space-y-3"
          >
            <div className="text-sm font-semibold text-foreground/80">
              {point.dateRange}
            </div>
            <div>
              <div className="text-xs font-semibold text-orange-400 mb-1">
                {entityA}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {point.india}
              </p>
            </div>
            <div>
              <div className="text-xs font-semibold text-sky-400 mb-1">
                {entityB}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {point.other}
              </p>
            </div>
            {point.context && (
              <div className="text-xs text-muted-foreground/70 italic border-t border-white/5 pt-2">
                {point.context}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
