import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Compass } from "lucide-react";

export function HeroSection() {
  const scrollToMap = () => {
    const element = document.getElementById("philosophies");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-mandala overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container-padding relative z-10 text-center max-w-4xl mx-auto py-24">
        {/* Sanskrit quote */}
        <div className="mb-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <p className="font-sanskrit text-lg md:text-xl text-primary/80">
            स्वधर्मे निधनं श्रेयः
          </p>
          <p className="text-sm text-muted-foreground mt-1 italic">
            "Better is death in one's own dharma" — Bhagavad Gita 3.35
          </p>
        </div>

        {/* Main headline */}
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          Your path already exists.
          <br />
          <span className="text-gradient-spiritual">Saadhakam helps you find it.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          Explore Sanatan Dharma as a living map of paths—philosophies, traditions, 
          practices, and exemplars—to discover a direction aligned with your nature.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <Link to="/pathfinder">
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-saffron text-lg px-8 h-14">
              Start Your Path
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={scrollToMap}
            className="text-lg px-8 h-14 border-primary/20 hover:bg-primary/5"
          >
            <Compass className="mr-2 h-5 w-5" />
            Explore the Map
          </Button>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.5s" }}>
          <span className="trust-badge">
            <span className="w-2 h-2 bg-emerald-500 rounded-full" />
            Respectful
          </span>
          <span className="trust-badge">
            <span className="w-2 h-2 bg-emerald-500 rounded-full" />
            Non-dogmatic
          </span>
          <span className="trust-badge">
            <span className="w-2 h-2 bg-emerald-500 rounded-full" />
            Deeply sourced
          </span>
        </div>
      </div>
    </section>
  );
}
