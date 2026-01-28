import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Mail, Shield } from "lucide-react";

export function ConversionSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Mock submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Welcome to the path!",
      description: "You'll receive guidance to begin your journey shortly.",
    });
    
    setEmail("");
    setIsSubmitting(false);

    // Analytics stub
    if (typeof window !== "undefined") {
      console.log("[Analytics] Email captured:", email);
    }
  };

  return (
    <section className="section-padding bg-gradient-spiritual relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-lotus opacity-5" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />

      <div className="container-padding mx-auto max-w-4xl relative z-10 text-center">
        <span className="text-secondary font-medium text-sm uppercase tracking-wider">
          Begin Today
        </span>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mt-3 mb-4">
          Begin Your Saadhana
        </h2>
        <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
          7 days. 10 minutes a day. A path that fits you.
          <br />
          Start with clarity, continue with commitment.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link to="/pathfinder">
            <Button 
              size="lg" 
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-saffron text-lg px-8 h-14"
            >
              Start Your Path
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/start">
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 h-14 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
            >
              Create a Practice Plan
            </Button>
          </Link>
        </div>

        {/* Email capture */}
        <div className="max-w-md mx-auto">
          <p className="text-primary-foreground/70 text-sm mb-4">
            Or receive guidance directly to your inbox:
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 bg-white/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-secondary"
                required
              />
            </div>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="h-12 px-6 bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              {isSubmitting ? "..." : "Begin"}
            </Button>
          </form>
          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-primary-foreground/60">
            <Shield className="w-3 h-3" />
            <span>No spam. Unsubscribe anytime. Your data stays private.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
