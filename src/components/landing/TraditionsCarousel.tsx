import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { traditions, getToneColor } from "@/data/traditions";
import { ArrowRight, Moon, Sparkles, Heart, Sunrise, Zap, Music, Eye } from "lucide-react";
import { useRef } from "react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Moon,
  Sparkles,
  Heart,
  Sunrise,
  Zap,
  Music,
  Eye,
};

export function TraditionsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="section-padding bg-gradient-to-b from-background to-muted/30">
      <div className="container-padding mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            Living Traditions
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            Paths of Practice
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Discover the major traditions within Sanatan Dharma—each with its own 
            emphasis, practices, and approach to the sacred.
          </p>
        </div>

        {/* Carousel on mobile, grid on desktop */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:overflow-visible"
        >
          {traditions.map((tradition) => {
            const IconComponent = iconMap[tradition.icon] || Moon;
            return (
              <Card 
                key={tradition.slug}
                className="card-hover min-w-[300px] md:min-w-0 snap-start bg-card border-border/50 flex-shrink-0"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <Badge className={`${getToneColor(tradition.tone)} border-0 capitalize`}>
                      {tradition.tone}
                    </Badge>
                  </div>

                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {tradition.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {tradition.coreOrientation}
                  </p>

                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                      Primary Practices
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {tradition.primaryPractices.slice(0, 3).map((practice) => (
                        <span 
                          key={practice}
                          className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground"
                        >
                          {practice}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link href={`/traditions/${tradition.slug}`}>
                    <Button variant="ghost" className="w-full justify-between hover:text-primary">
                      Read more
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* View all link */}
        <div className="text-center mt-8 md:mt-12">
          <Link href="/traditions">
            <Button variant="outline" size="lg" className="border-primary/20">
              Explore All Traditions
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
