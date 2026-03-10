// @ts-nocheck

import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
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

const GreatsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="section-padding bg-mandala">
          <div className="container-padding mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                Greats & Philosophers
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Throughout history, luminaries have clarified the path. Their insights 
                remain as relevant today as when they were first expressed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {greats.map((great) => {
                const IconComponent = iconMap[great.icon] || Infinity;
                return (
                  <Card key={great.slug} className="card-hover bg-card border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <span className="text-xs text-secondary font-medium uppercase tracking-wider">
                            {great.era}
                          </span>
                          <h2 className="font-display text-xl font-semibold text-foreground">
                            {great.name}
                          </h2>
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

export default GreatsPage;
