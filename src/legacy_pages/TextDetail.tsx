// @ts-nocheck

import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getTextBySlug } from "@/data/texts";
import { ArrowLeft, ArrowRight, BookOpen, Users, Play, Quote, Library } from "lucide-react";

const TextDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const text = slug ? getTextBySlug(slug) : undefined;

  if (!text) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 section-padding">
          <div className="container-padding mx-auto max-w-4xl text-center">
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">
              Text not found
            </h1>
            <Link to="/texts">
              <Button>
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Texts
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="section-padding bg-mandala">
          <div className="container-padding mx-auto max-w-4xl">
            <Link 
              to="/texts"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Texts
            </Link>
            
            <span className="font-sanskrit text-lg text-secondary">
              {text.sanskritTitle}
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              {text.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {text.summary}
            </p>
            <div className="flex flex-wrap gap-2">
              {text.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-padding mx-auto max-w-4xl">
            <div className="grid gap-8">
              <Card className="bg-card border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <BookOpen className="w-5 h-5 text-secondary" />
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      Overview
                    </h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {text.overview}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border/50">
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                    Major Themes
                  </h2>
                  <ul className="space-y-3">
                    {text.themes.map((theme, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-sm font-medium">
                          {index + 1}
                        </span>
                        <span className="text-muted-foreground">{theme}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Key Verses */}
              {text.keyVerses.length > 0 && (
                <Card className="bg-card border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Quote className="w-5 h-5 text-secondary" />
                      <h2 className="font-display text-xl font-semibold text-foreground">
                        Key Verses
                      </h2>
                    </div>
                    <div className="space-y-6">
                      {text.keyVerses.map((verse, index) => (
                        <div key={index} className="border-l-2 border-secondary pl-4">
                          <p className="font-sanskrit text-lg text-foreground mb-2">
                            {verse.verse}
                          </p>
                          <p className="text-muted-foreground italic mb-2">
                            "{verse.translation}"
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {verse.context}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card className="bg-card border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-5 h-5 text-secondary" />
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      Who It's For
                    </h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {text.whoItSuitsFor}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Play className="w-5 h-5 text-secondary" />
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      How to Approach
                    </h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {text.howToApproach}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Library className="w-5 h-5 text-secondary" />
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      Related Texts
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {text.relatedTexts.map((related) => (
                      <span 
                        key={related}
                        className="px-3 py-2 bg-muted rounded-lg text-sm text-foreground"
                      >
                        {related}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/pathfinder" className="flex-1">
                  <Button size="lg" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    Find Your Path
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/texts" className="flex-1">
                  <Button size="lg" variant="outline" className="w-full">
                    Explore Other Texts
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TextDetail;
