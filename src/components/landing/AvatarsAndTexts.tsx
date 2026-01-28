import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { texts } from "@/data/texts";
import { ArrowRight, BookOpen, Scroll, Focus, Sparkles, Crown, Shield, Flower } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  Scroll,
  Focus,
  Sparkles,
};

const avatars = [
  {
    name: "Rama",
    archetype: "The Ideal of Dharma",
    description: "Embodiment of righteousness, duty, and noble conduct in all circumstances.",
    icon: Crown,
  },
  {
    name: "Krishna",
    archetype: "The Divine Friend & Teacher",
    description: "Supreme teacher, beloved friend, and guide through life's complexities.",
    icon: Flower,
  },
  {
    name: "Devi",
    archetype: "The Divine Mother",
    description: "The supreme feminine power—nurturing, fierce, and liberating.",
    icon: Shield,
  },
];

export function AvatarsAndTexts() {
  const spotlightText = texts.find(t => t.spotlight);
  const otherTexts = texts.filter(t => !t.spotlight);

  return (
    <section className="section-padding bg-gradient-to-b from-background to-muted/30">
      <div className="container-padding mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            Living Archetypes & Teachings
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            Avatars & Key Texts
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            The divine descends as guide; wisdom crystallizes in sacred texts. 
            Both offer mirrors for understanding your own journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Avatars column */}
          <div>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-6">
              Divine Archetypes
            </h3>
            <div className="space-y-4">
              {avatars.map((avatar) => {
                const IconComponent = avatar.icon;
                return (
                  <Card key={avatar.name} className="bg-card border-border/50 card-hover">
                    <CardContent className="p-5">
                      <div className="flex gap-4">
                        <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-7 h-7 text-secondary" />
                        </div>
                        <div>
                          <div className="flex items-baseline gap-2 mb-1">
                            <h4 className="font-display text-lg font-semibold text-foreground">
                              {avatar.name}
                            </h4>
                            <span className="text-sm text-secondary">
                              {avatar.archetype}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {avatar.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Texts column */}
          <div>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-6">
              Sacred Texts
            </h3>
            
            {/* Spotlight: Bhagavad Gita */}
            {spotlightText && (
              <Card className="bg-gradient-spiritual text-primary-foreground mb-6 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <span className="font-sanskrit text-sm text-primary-foreground/70">
                        {spotlightText.sanskritTitle}
                      </span>
                      <h4 className="font-display text-xl font-semibold">
                        {spotlightText.title}
                      </h4>
                    </div>
                  </div>
                  <p className="text-primary-foreground/80 mb-6">
                    {spotlightText.summary}
                  </p>
                  <Link to={`/texts/${spotlightText.slug}`}>
                    <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                      Explore the Gita by Life Situation
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Other texts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {otherTexts.map((text) => {
                const IconComponent = iconMap[text.icon] || Scroll;
                return (
                  <Link 
                    key={text.slug}
                    to={`/texts/${text.slug}`}
                    className="group"
                  >
                    <Card className="bg-card border-border/50 h-full card-hover">
                      <CardContent className="p-4 text-center">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <h4 className="font-display font-semibold text-foreground mb-1">
                          {text.title}
                        </h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {text.summary}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>

            {/* View all link */}
            <div className="mt-6">
              <Link to="/texts">
                <Button variant="outline" className="w-full border-primary/20">
                  View All Sacred Texts
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
