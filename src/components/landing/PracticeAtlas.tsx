import { useState } from "react";
import { practices } from "@/data/practices";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { Circle, Brain, Music, Flame, HandHeart, BookOpen, Leaf, Moon, ArrowRight, Clock } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Circle,
  Brain,
  Music,
  Flame,
  HandHeart,
  BookOpen,
  Leaf,
  Moon,
};

export function PracticeAtlas() {
  const [expandedPractice, setExpandedPractice] = useState<string | null>(null);

  return (
    <section id="practices" className="section-padding bg-mandala">
      <div className="container-padding mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            Practice Atlas
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            What You Can Experience
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Sadhana takes many forms. Explore practices that can become part of your 
            daily spiritual life—from simple beginnings to profound depths.
          </p>
        </div>

        {/* Practice tiles with accordion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {practices.map((practice) => {
            const IconComponent = iconMap[practice.icon] || Circle;
            const isExpanded = expandedPractice === practice.slug;
            
            return (
              <div 
                key={practice.slug}
                className={`bg-card border border-border/50 rounded-xl overflow-hidden transition-all duration-300 ${
                  isExpanded ? "shadow-spiritual-lg" : "shadow-spiritual card-hover"
                }`}
              >
                <Accordion
                  type="single"
                  collapsible
                  value={expandedPractice || undefined}
                  onValueChange={(value) => setExpandedPractice(value || null)}
                >
                  <AccordionItem value={practice.slug} className="border-0">
                    <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-muted/30">
                      <div className="flex items-center gap-4 text-left">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-display text-lg font-semibold text-foreground">
                              {practice.title}
                            </h3>
                            <span className="font-sanskrit text-sm text-muted-foreground">
                              {practice.sanskritName}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {practice.summary}
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="space-y-4 pt-2">
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-2">
                            What It Is
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {practice.whatItIs}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-2">
                            Who It Suits
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {practice.whoItSuits}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-2">
                            How to Begin
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {practice.howToBegin}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg px-3 py-2">
                          <Clock className="w-4 h-4" />
                          <span>{practice.timeCommitment}</span>
                        </div>

                        <div className="flex gap-3 pt-2">
                          <Link href="/pathfinder" className="flex-1">
                            <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                              Find Your Practice
                              <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
