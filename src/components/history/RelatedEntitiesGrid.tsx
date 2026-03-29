import Link from "next/link";

interface RelatedEntity {
  name: string;
  href: string;
  type?: string;
}

interface RelatedEntitiesGridProps {
  title: string;
  items: RelatedEntity[];
}

export function RelatedEntitiesGrid({ title, items }: RelatedEntitiesGridProps) {
  if (items.length === 0) return null;

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-display font-bold mb-4">{title}</h2>
      <div className="flex flex-wrap gap-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="px-4 py-2 rounded-xl border border-border hover:border-orange-500/50 hover:scale-105 transition-all duration-200"
          >
            <span>{item.name}</span>
            {item.type && (
              <span className="ml-2 text-xs text-muted-foreground">{item.type}</span>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
