// @ts-nocheck

import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getPhilosophyBySlug } from "@/data/philosophies";
import { ArrowLeft, ArrowRight, BookOpen, Users, Play, Library } from "lucide-react";

const PhilosophyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const philosophy = slug ? getPhilosophyBySlug(slug) : undefined;

  if (!philosophy) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 section-padding">
          <div className="container-padding mx-auto max-w-4xl text-center">
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">
              Philosophy not found
            </h1>
            <Link to="/philosophies">
              <Button>
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Philosophies
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
        {/* Hero */}
        <section className="section-padding bg-mandala">
          <div className="container-padding mx-auto max-w-4xl">
            <Link 
              to="/philosophies"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Philosophies
            </Link>
            
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              {philosophy.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {philosophy.summary}
            </p>
            <div className="flex flex-wrap gap-2">
              {philosophy.tags.map((tag) => (
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

        {/* Content */}
        <section className="section-padding">
          <div className="container-padding mx-auto max-w-4xl">
            <div className="grid gap-8">
              {/* Overview */}
              <Card className="bg-card border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <BookOpen className="w-5 h-5 text-secondary" />
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      Overview
                    </h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {philosophy.description}
                  </p>
                </CardContent>
              </Card>

              {/* Key Ideas */}
              <Card className="bg-card border-border/50">
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                    Key Ideas
                  </h2>
                  <ul className="space-y-3">
                    {philosophy.keyIdeas.map((idea, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-sm font-medium">
                          {index + 1}
                        </span>
                        <span className="text-muted-foreground">{idea}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Who It Suits */}
              <Card className="bg-card border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-5 h-5 text-secondary" />
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      Who It Suits
                    </h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {philosophy.whoItSuits}
                  </p>
                </CardContent>
              </Card>

              {/* How to Start */}
              <Card className="bg-card border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Play className="w-5 h-5 text-secondary" />
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      How to Start
                    </h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {philosophy.howToStart}
                  </p>
                </CardContent>
              </Card>

              {/* Recommended Texts */}
              <Card className="bg-card border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Library className="w-5 h-5 text-secondary" />
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      Recommended Reading
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {philosophy.recommendedTexts.map((text) => (
                      <span 
                        key={text}
                        className="px-3 py-2 bg-muted rounded-lg text-sm text-foreground"
                      >
                        {text}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/pathfinder" className="flex-1">
                  <Button size="lg" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    Find Your Path
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/philosophies" className="flex-1">
                  <Button size="lg" variant="outline" className="w-full">
                    Explore Other Philosophies
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

export default PhilosophyDetail;
