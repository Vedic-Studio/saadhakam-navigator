import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContentPageTracker } from "@/components/ContentAnalytics";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface HistoryPageLayoutProps {
  title: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
  schemas: Record<string, unknown>[];
  sidebar?: ReactNode;
  children: ReactNode;
}

export function HistoryPageLayout({
  title,
  subtitle,
  breadcrumbs,
  schemas,
  sidebar,
  children,
}: HistoryPageLayoutProps) {
  // The parent breadcrumb (second to last) is the "back" link
  const parentCrumb =
    breadcrumbs.length >= 2 ? breadcrumbs[breadcrumbs.length - 2] : null;

  return (
    <div className="min-h-screen bg-background">
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-white/5">
          <div className="max-w-6xl mx-auto">
            {parentCrumb && (
              <nav aria-label="Breadcrumb" className="mb-6">
                <Link
                  href={parentCrumb.href}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to {parentCrumb.label}
                </Link>
              </nav>
            )}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg text-muted-foreground max-w-3xl">
                {subtitle}
              </p>
            )}
          </div>
        </section>

        {/* Content */}
        <section className="py-10 px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-6xl mx-auto">
            {sidebar ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2">{children}</div>
                <aside className="lg:col-span-1">{sidebar}</aside>
              </div>
            ) : (
              <div className="max-w-4xl">{children}</div>
            )}
          </div>
        </section>
      </main>
      <ContentPageTracker />
      <Footer />
    </div>
  );
}
