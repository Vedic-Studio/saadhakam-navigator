import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { philosophies } from "@/data/philosophies";
import { ArrowRight, Infinity, Eye, Heart, Crown, Layers, Focus, Flame, Scale } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Infinity,
  Eye,
  Heart,
  Crown,
  Layers,
  Focus,
  Flame,
  Scale,
};

const PhilosophiesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="section-padding bg-mandala">
          <div className="container-padding mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                Philosophies of Sanatan Dharma
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The six orthodox schools (darshanas) and their offshoots form the philosophical 
                foundation. Each offers a unique lens for understanding reality, self, and liberation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {philosophies.map((philosophy) => {
                const IconComponent = iconMap[philosophy.icon] || Infinity;
                return (
                  <Card key={philosophy.slug} className="card-hover bg-card border-border/50">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                        {philosophy.title}
                      </h2>
                      <p className="text-muted-foreground mb-4">
                        {philosophy.summary}
                      </p>
                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                          Key Question
                        </p>
                        <p className="text-sm font-medium text-foreground italic">
                          "{philosophy.keyQuestion}"
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="px-6 pb-6 pt-0">
                      <Link to={`/philosophies/${philosophy.slug}`} className="w-full">
                        <Button variant="ghost" className="w-full justify-between hover:text-primary">
                          Read more
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </CardFooter>
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

export default PhilosophiesPage;
