// @ts-nocheck

import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTraditionBySlug, getToneColor } from "@/data/traditions";
import { ArrowLeft, ArrowRight, BookOpen, Users, Play } from "lucide-react";

const TraditionDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const tradition = slug ? getTraditionBySlug(slug) : undefined;

  if (!tradition) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 section-padding">
          <div className="container-padding mx-auto max-w-4xl text-center">
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">
              Tradition not found
            </h1>
            <Link to="/traditions">
              <Button>
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Traditions
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
              to="/traditions"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Traditions
            </Link>
            
            <div className="flex items-center gap-3 mb-4">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                {tradition.title}
              </h1>
              <Badge className={`${getToneColor(tradition.tone)} border-0 capitalize`}>
                {tradition.tone}
              </Badge>
            </div>
            <p className="text-xl text-muted-foreground mb-6">
              {tradition.summary}
            </p>
            <div className="flex flex-wrap gap-2">
              {tradition.tags.map((tag) => (
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
                    {tradition.description}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border/50">
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                    Key Ideas
                  </h2>
                  <ul className="space-y-3">
                    {tradition.keyIdeas.map((idea, index) => (
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

              <Card className="bg-card border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-5 h-5 text-secondary" />
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      Who It Suits
                    </h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {tradition.whoItSuits}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Play className="w-5 h-5 text-secondary" />
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      How to Start
                    </h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {tradition.howToStart}
                  </p>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/pathfinder" className="flex-1">
                  <Button size="lg" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    Find Your Path
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/traditions" className="flex-1">
                  <Button size="lg" variant="outline" className="w-full">
                    Explore Other Traditions
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

export default TraditionDetail;
