"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

const footerLinks = {
  explore: [
    { label: "Articles", href: "/articles" },
    { label: "Philosophies", href: "/philosophies" },
    { label: "Traditions", href: "/traditions" },
    { label: "Deities", href: "/deities" },
    { label: "Greats", href: "/greats" },
    { label: "Sanatan History", href: "/sanatan-history" },
    { label: "About Sadhaka", href: "/about" },
    { label: "Brand Facts", href: "/brand-facts" },
  ],
  learn: [
    { label: "Concepts", href: "/concepts" },
    { label: "Six Darshanas", href: "/six-darshanas" },
    { label: "Sacred Texts", href: "/texts" },
    { label: "Bhagavad Gita", href: "/texts/bhagavad-gita" },
    { label: "Sanskrit Lexicon", href: "/learn/sanskrit" },
    { label: "Compare Paths", href: "/compare" },
  ],
  practice: [
    { label: "Find Your Path", href: "/faith-finder" },
    { label: "Practices", href: "/practices" },
    { label: "Mantras", href: "/mantras" },
    { label: "Stotras", href: "/stotras/shiva-tandava-stotram" },
    { label: "Jyotish", href: "/jyotish" },
    { label: "Panchang", href: "/panchang" },
    { label: "AI Tutor", href: "/app" },
  ],
  articles: [
    { label: "All Articles", href: "/articles" },
    { label: "What is Vedanta?", href: "/what-is-vedanta" },
    { label: "How to Start Japa", href: "/how-to-start-japa" },
    { label: "10 Sanskrit Mantras", href: "/10-powerful-sanskrit-mantras" },
    { label: "Daily Spiritual Routine", href: "/daily-spiritual-routine-beginners" },
  ],
};

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Subscription failed');
      }

      toast({
        title: "Subscribed!",
        description: "You'll receive our newsletter with insights and guidance.",
      });
      setEmail("");
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-background text-foreground border-t border-border/50">
      <div className="container-padding mx-auto max-w-7xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-md rounded-full shadow-primary/20" />
                <img
                  src="/favicon.svg"
                  alt="Sadhaka Logo"
                  className="relative w-10 h-10 rounded-full bg-background border border-border p-1.5 shadow-sm"
                />
              </div>
              <span className="font-display text-2xl font-semibold tracking-tight">
                Sadhaka
              </span>
            </div>
            <p className="text-muted-foreground mb-8 max-w-sm leading-relaxed">
              A respectful guide for seekers exploring the paths, philosophies, and
              practices of Sanatan Dharma — powered by authentic wisdom.
            </p>

            {/* Newsletter signup */}
            <div className="glass-card p-6 rounded-2xl border-white/5 bg-white/[0.02]">
              <p className="text-sm font-medium mb-4 text-foreground/90">Subscribe to our newsletter</p>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-primary/30"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95"
                >
                  {isSubmitting ? "..." : "Subscribe"}
                </Button>
              </form>
            </div>
          </div>

          {/* Links columns */}
          {(Object.entries(footerLinks) as [string, { label: string; href: string }[]][]).map(
            ([key, links]) => (
              <div key={key}>
                <h3 className="font-display text-sm font-bold mb-6 uppercase tracking-widest text-foreground/40">{key}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-all duration-200 text-sm inline-block translate-x-0 hover:translate-x-1"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}

        </div>

        {/* Sanskrit quote */}
        <div className="text-center py-12 border-t border-border/20">
          <p className="font-sanskrit text-2xl text-primary/80 mb-3 animate-pulse-slow">
            सर्वे भवन्तु सुखिनः
          </p>
          <p className="text-sm text-muted-foreground italic max-w-md mx-auto leading-relaxed">
            "May all beings be happy, may all beings be free from fear, may all see what is auspicious."
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-medium text-muted-foreground/50 uppercase tracking-tighter">
            <p>© {new Date().getFullYear()} Sadhaka. Created with reverence for the tradition.</p>
            <div className="flex gap-6">
              <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
              <Link href="/brand-facts" className="hover:text-foreground transition-colors">Brand Facts</Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
