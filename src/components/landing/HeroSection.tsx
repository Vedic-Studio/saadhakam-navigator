import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Compass, Star, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function HeroSection() {
  const scrollToMap = () => {
    const element = document.getElementById("philosophies");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-background overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,hsl(35_85%_50%_/_0.08),transparent_70%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />

      {/* Floating decorative elements (Parallax) */}
      <div className="absolute top-20 left-[10%] w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-20 right-[10%] w-80 h-80 bg-gold/5 rounded-full blur-3xl animate-float-gentle" />

      <div className="container-padding relative z-10 text-center max-w-5xl mx-auto py-24">

        {/* Social Proof / Avatar Stack */}
        <div className="flex flex-col items-center justify-center mb-8 animate-fade-in">
          <div className="flex -space-x-3 mb-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Avatar key={i} className="border-2 border-background w-8 h-8 md:w-10 md:h-10">
                <AvatarImage src={`https://i.pravatar.cc/100?img=${i + 10}`} />
                <AvatarFallback className="text-[10px] bg-secondary/20 text-secondary-foreground">U{i}</AvatarFallback>
              </Avatar>
            ))}
            <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-background bg-secondary text-secondary-foreground text-[10px] font-bold">
              +10k
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <div className="flex text-gold">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={14} fill="currentColor" />
              ))}
            </div>
            <span>Trusted by 10,000+ seekers</span>
          </div>
        </div>

        {/* Sanskrit quote */}
        <div className="mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <span className="inline-block py-1 px-3 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
            The Eternal Path
          </span>
          <p className="font-sanskrit text-lg md:text-xl text-primary/80">
            स्वधर्मे निधनं श्रेयः
          </p>
          <p className="text-sm text-muted-foreground mt-1 italic">
            "Better is death in one's own dharma" — Bhagavad Gita 3.35
          </p>
        </div>

        {/* Main headline */}
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] mb-6 animate-fade-up tracking-tight" style={{ animationDelay: "0.2s" }}>
          <span className="block">Wisdom of the</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-gold to-secondary bg-[length:200%_auto] animate-gradient">
            Ancient Civilization
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up leading-relaxed" style={{ animationDelay: "0.3s" }}>
          Discover a living map of Sanatan Dharma. From the advanced linguistics of Sanskrit to the history of great lineages—explore a path aligned with your true nature.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <Link to="/pathfinder">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-lg px-8 h-14 rounded-full">
              Start Your Path
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            onClick={scrollToMap}
            className="text-lg px-8 h-14 border-primary/20 hover:bg-primary/5 hover:text-primary rounded-full hover:-translate-y-1 transition-all duration-300"
          >
            <Compass className="mr-2 h-5 w-5" />
            Explore the Map
          </Button>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 animate-fade-up text-muted-foreground" style={{ animationDelay: "0.5s" }}>
          <span className="flex items-center gap-2 text-sm font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
            History not Mythology
          </span>
          <span className="flex items-center gap-2 text-sm font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
            Sanskrit Science
          </span>
          <span className="flex items-center gap-2 text-sm font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
            Living Lineages
          </span>
        </div>
      </div>
    </section>
  );
}
