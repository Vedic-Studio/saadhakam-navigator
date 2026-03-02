import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Mail, Shield, Check } from "lucide-react";

const benefits = [
  "Personalized practice recommendations based on your nature",
  "Daily guidance emails for your first 7 days",
  "Access to curated resources matching your path",
  "Community connection with fellow seekers",
];

const StartPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Mock submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    toast({
      title: "Welcome to your journey!",
      description: "Check your inbox for your first guidance email.",
    });

    // Analytics stub
    console.log("[Analytics] Start page signup:", email);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="section-padding bg-mandala min-h-[80vh] flex items-center">
          <div className="container-padding mx-auto max-w-4xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Content */}
              <div>
                <span className="text-secondary font-medium text-sm uppercase tracking-wider">
                  Begin Your Journey
                </span>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6">
                  Create Your Practice Plan
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Start with clarity, continue with commitment. We'll guide you through 
                  your first 7 days with a practice tailored to your nature and life situation.
                </p>

                <div className="space-y-4 mb-8">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-secondary" />
                      </div>
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground">
                  <strong>10 minutes a day</strong> is all it takes to begin transforming your relationship 
                  with the sacred.
                </p>
              </div>

              {/* Right: Form */}
              <div>
                <Card className="shadow-spiritual-lg">
                  <CardContent className="p-8">
                    {!isSubmitted ? (
                      <>
                        <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                          Get Started Free
                        </h2>
                        <p className="text-muted-foreground mb-6">
                          Enter your email to receive your personalized practice guide.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div>
                            <label htmlFor="email" className="text-sm font-medium text-foreground mb-2 block">
                              Email address
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                              <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10 h-12"
                                required
                              />
                            </div>
                          </div>

                          <Button 
                            type="submit" 
                            size="lg"
                            disabled={isSubmitting}
                            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12"
                          >
                            {isSubmitting ? "Creating your plan..." : "Start Your Practice"}
                            <ArrowRight className="ml-2 w-5 h-5" />
                          </Button>
                        </form>

                        <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                          <Shield className="w-3 h-3" />
                          <span>No spam. Unsubscribe anytime. Your data stays private.</span>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                          <Check className="w-8 h-8 text-secondary" />
                        </div>
                        <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                          You're on your way!
                        </h2>
                        <p className="text-muted-foreground mb-6">
                          Check your inbox for your first guidance email. Your journey begins now.
                        </p>
                        <Link to="/pathfinder">
                          <Button variant="outline">
                            Explore the Pathfinder
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default StartPage;
