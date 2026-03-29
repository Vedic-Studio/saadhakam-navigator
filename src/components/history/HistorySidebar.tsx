import Link from "next/link";
import {
  Clock,
  MapPin,
  GitBranch,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface SidebarItem {
  id: string;
  name: string;
  type: "dynasty" | "era" | "site" | "researcher" | "evidence";
  href: string;
}

const typeConfig: Record<
  SidebarItem["type"],
  { label: string; icon: LucideIcon; color: string }
> = {
  dynasty: { label: "Dynasties", icon: GitBranch, color: "text-purple-400" },
  era: { label: "Eras", icon: Clock, color: "text-amber-400" },
  site: { label: "Sites", icon: MapPin, color: "text-emerald-400" },
  researcher: { label: "Researchers", icon: Users, color: "text-sky-400" },
  evidence: { label: "Evidence", icon: ShieldCheck, color: "text-orange-400" },
};

interface HistorySidebarProps {
  items: SidebarItem[];
}

export function HistorySidebar({ items }: HistorySidebarProps) {
  // Group items by type, skip any with empty name (unresolved)
  const validItems = items.filter((item) => item.name && item.href);
  const grouped = validItems.reduce<Record<string, SidebarItem[]>>(
    (acc, item) => {
      if (!acc[item.type]) acc[item.type] = [];
      acc[item.type].push(item);
      return acc;
    },
    {}
  );

  const types = Object.keys(grouped) as SidebarItem["type"][];
  if (types.length === 0) return null;

  return (
    <div className="space-y-6">
      <h2 className="font-display text-lg font-semibold text-foreground">
        Related
      </h2>
      {types.map((type) => {
        const config = typeConfig[type];
        const Icon = config.icon;
        return (
          <div key={type}>
            <h3
              className={`flex items-center gap-2 text-sm font-semibold mb-2 ${config.color}`}
            >
              <Icon className="w-4 h-4" />
              {config.label}
            </h3>
            <ul className="space-y-1.5">
              {grouped[type].map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1 px-2 rounded-lg hover:bg-white/5"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
      <div className="border-t border-white/5 pt-4">
        <Link
          href="/sanatan-history"
          className="text-sm text-orange-400 hover:text-orange-300 transition-colors"
        >
          ← Back to Sanatan History
        </Link>
      </div>
    </div>
  );
}
