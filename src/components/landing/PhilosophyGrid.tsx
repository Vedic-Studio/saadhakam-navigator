import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { philosophies } from "@/data/philosophies";
import { ArrowRight, Infinity, Eye, Heart, Crown, Layers, Focus, Flame, Scale } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Infinity,
  Eye,
  Heart,
  Crown,
  Layers,
  Focus,
  Flame,
  Scale,
};

export function PhilosophyGrid() {
  return (
    <section id="philosophies" className="section-padding bg-lotus">
      <div className="container-padding mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            The Map of Sanatan
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            Six Schools, Infinite Depth
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Explore the philosophical traditions that form the foundation of Sanatan Dharma. 
            Each addresses life's deepest questions from a unique vantage point.
          </p>
        </div>

        {/* Philosophy cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {philosophies.map((philosophy, index) => {
            const IconComponent = iconMap[philosophy.icon] || Infinity;
            return (
              <Card 
                key={philosophy.slug} 
                className="card-hover bg-card border-border/50 overflow-hidden group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {philosophy.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {philosophy.summary}
                  </p>
                  <div className="bg-muted/50 rounded-lg p-3 mb-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      Key Question
                    </p>
                    <p className="text-sm font-medium text-foreground italic">
                      "{philosophy.keyQuestion}"
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-0">
                  <Link to={`/philosophies/${philosophy.slug}`} className="w-full">
                    <Button variant="ghost" className="w-full justify-between group-hover:text-primary">
                      Read more
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* View all link */}
        <div className="text-center mt-12">
          <Link to="/philosophies">
            <Button variant="outline" size="lg" className="border-primary/20">
              View All Philosophies
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
