// @ts-nocheck

import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { traditions, getToneColor } from "@/data/traditions";
import { ArrowRight, Moon, Sparkles, Heart, Sunrise, Zap, Music, Eye } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Moon,
  Sparkles,
  Heart,
  Sunrise,
  Zap,
  Music,
  Eye,
};

const TraditionsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="section-padding bg-mandala">
          <div className="container-padding mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                Living Traditions
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The major traditions (sampradayas) within Sanatan Dharma offer distinct paths 
                with their own deities, practices, and approaches to the sacred.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {traditions.map((tradition) => {
                const IconComponent = iconMap[tradition.icon] || Moon;
                return (
                  <Card key={tradition.slug} className="card-hover bg-card border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <Badge className={`${getToneColor(tradition.tone)} border-0 capitalize`}>
                          {tradition.tone}
                        </Badge>
                      </div>
                      <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                        {tradition.title}
                      </h2>
                      <p className="text-sm text-muted-foreground mb-4">
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
                      <Link to={`/traditions/${tradition.slug}`}>
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

export default TraditionsPage;
