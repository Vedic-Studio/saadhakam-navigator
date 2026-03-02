import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Search, Heart, Flame, Dumbbell } from "lucide-react";

const pathTypes = [
  {
    id: "inquiry",
    title: "Inquiry-led",
    description: "Question reality, explore consciousness, seek truth through investigation.",
    icon: Search,
    color: "bg-indigo-500/10 text-indigo-600",
  },
  {
    id: "devotion",
    title: "Devotion-led",
    description: "Love as the path—surrender, worship, and relationship with the Divine.",
    icon: Heart,
    color: "bg-rose-500/10 text-rose-600",
  },
  {
    id: "ritual",
    title: "Ritual-led",
    description: "Sacred action, ceremony, and the transformative power of traditional forms.",
    icon: Flame,
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    id: "discipline",
    title: "Discipline-led",
    description: "Systematic practice, mental training, and step-by-step cultivation.",
    icon: Dumbbell,
    color: "bg-emerald-500/10 text-emerald-600",
  },
];

const frameworkPoints = [
  {
    term: "Temperament (Gunas)",
    description: "Sattva, rajas, tamas—the fundamental qualities that shape your nature",
  },
  {
    term: "Tendencies (Samskaras)",
    description: "Deep patterns and inclinations carried from experience",
  },
  {
    term: "Nature (Svabhava)",
    description: "Your essential character and innate disposition",
  },
  {
    term: "Life Situation (Dharma)",
    description: "Householder, student, seeker—your current stage and responsibilities",
  },
  {
    term: "Learning Style",
    description: "How you best absorb, integrate, and grow spiritually",
  },
];

export function SelfAlignment() {
  return (
    <section className="section-padding bg-gradient-to-b from-muted/30 to-background">
      <div className="container-padding mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            Self-Alignment Framework
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            Choose Your Branch
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Finding your path isn't random. It emerges from understanding your nature, 
            tendencies, and life situation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Framework explanation */}
          <div className="space-y-6">
            <h3 className="font-display text-2xl font-semibold text-foreground">
              What Shapes Your Path?
            </h3>
            <div className="space-y-4">
              {frameworkPoints.map((point, index) => (
                <div 
                  key={point.term}
                  className="flex gap-4 p-4 bg-card rounded-xl border border-border/50"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-sm font-semibold text-primary">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {point.term}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Path types */}
          <div>
            <Card className="bg-gradient-spiritual text-primary-foreground overflow-hidden">
              <CardContent className="p-6 md:p-8">
                <h3 className="font-display text-2xl font-semibold mb-2">
                  Find Your Inclination
                </h3>
                <p className="text-primary-foreground/80 mb-6">
                  Which resonates most with how you naturally approach the sacred?
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {pathTypes.map((path) => {
                    const IconComponent = path.icon;
                    return (
                      <Link 
                        key={path.id}
                        href="/faith-finder"
                        className="group"
                      >
                        <div className="bg-white/10 hover:bg-white/20 rounded-xl p-4 transition-colors h-full">
                          <div className={`w-10 h-10 rounded-lg ${path.color} flex items-center justify-center mb-3`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <h4 className="font-semibold text-primary-foreground mb-1">
                            {path.title}
                          </h4>
                          <p className="text-sm text-primary-foreground/70">
                            {path.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                <Link href="/faith-finder">
                  <Button 
                    size="lg" 
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  >
                    Discover Your Path
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
