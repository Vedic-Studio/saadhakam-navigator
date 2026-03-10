// @ts-nocheck

import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { texts } from "@/data/texts";
import { ArrowRight, BookOpen, Scroll, Focus, Sparkles } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  Scroll,
  Focus,
  Sparkles,
};

const TextsPage = () => {
  const spotlightText = texts.find(t => t.spotlight);
  const otherTexts = texts.filter(t => !t.spotlight);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="section-padding bg-mandala">
          <div className="container-padding mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                Sacred Texts
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The scriptures of Sanatan Dharma contain wisdom refined over millennia. 
                Each text offers guidance for different aspects of the spiritual journey.
              </p>
            </div>

            {/* Spotlight text */}
            {spotlightText && (
              <Card className="bg-gradient-spiritual text-primary-foreground mb-8 overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
                      <BookOpen className="w-7 h-7 text-secondary" />
                    </div>
                    <div>
                      <span className="font-sanskrit text-sm text-primary-foreground/70">
                        {spotlightText.sanskritTitle}
                      </span>
                      <h2 className="font-display text-2xl font-semibold">
                        {spotlightText.title}
                      </h2>
                    </div>
                  </div>
                  <p className="text-primary-foreground/80 text-lg mb-6 max-w-3xl">
                    {spotlightText.summary}
                  </p>
                  <Link to={`/texts/${spotlightText.slug}`}>
                    <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                      Explore the Gita
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Other texts grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherTexts.map((text) => {
                const IconComponent = iconMap[text.icon] || Scroll;
                return (
                  <Card key={text.slug} className="card-hover bg-card border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <span className="font-sanskrit text-xs text-muted-foreground">
                            {text.sanskritTitle}
                          </span>
                          <h2 className="font-display text-xl font-semibold text-foreground">
                            {text.title}
                          </h2>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {text.summary}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {text.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link to={`/texts/${text.slug}`}>
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TextsPage;
