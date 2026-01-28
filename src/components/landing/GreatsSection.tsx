import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { greats } from "@/data/greats";
import { ArrowRight, Infinity, Sparkles, Flame, Sun, Feather } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Infinity,
  Sparkles,
  Flame,
  Sun,
  Feather,
};

export function GreatsSection() {
  return (
    <section className="section-padding bg-lotus">
      <div className="container-padding mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            Lineage of Insight
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            Greats & Philosophers
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Throughout history, luminaries have clarified the path. Their insights 
            remain as relevant today as when they were first expressed.
          </p>
        </div>

        {/* Timeline layout */}
        <div className="relative">
          {/* Vertical line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-8 md:space-y-0">
            {greats.map((great, index) => {
              const IconComponent = iconMap[great.icon] || Infinity;
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={great.slug}
                  className={`md:flex md:items-center ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Card */}
                  <div className={`md:w-1/2 ${isEven ? "md:pr-12" : "md:pl-12"}`}>
                    <div className="bg-card border border-border/50 rounded-xl p-6 shadow-spiritual card-hover">
                      {/* Era badge */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <span className="text-xs text-secondary font-medium uppercase tracking-wider">
                            {great.era}
                          </span>
                          <h3 className="font-display text-xl font-semibold text-foreground">
                            {great.name}
                          </h3>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 italic">
                        {great.title}
                      </p>

                      <p className="text-muted-foreground mb-4">
                        {great.summary}
                      </p>

                      <div className="bg-muted/50 rounded-lg p-3 mb-4">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                          What They Clarified
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          {great.whatTheyClarified}
                        </p>
                      </div>

                      <Link to={`/greats/${great.slug}`}>
                        <Button variant="ghost" className="w-full justify-between hover:text-primary">
                          Read more
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Timeline dot for desktop */}
                  <div className="hidden md:flex items-center justify-center w-0">
                    <div className="w-4 h-4 rounded-full bg-secondary border-4 border-background shadow-sm" />
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>

        {/* View all link */}
        <div className="text-center mt-12">
          <Link to="/greats">
            <Button variant="outline" size="lg" className="border-primary/20">
              Explore All Greats
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
