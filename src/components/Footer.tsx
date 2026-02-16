import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

const footerLinks = {
  explore: [
    { label: "Philosophies", href: "/philosophies" },
    { label: "Traditions", href: "/traditions" },
    { label: "Practices", href: "/#practices" },
    { label: "Greats", href: "/greats" },
    { label: "Sacred Texts", href: "/texts" },
  ],
  start: [
    { label: "Find Your Path", href: "/pathfinder" },
    { label: "Create Practice Plan", href: "/start" },
    { label: "Bhagavad Gita Guide", href: "/texts/bhagavad-gita" },
  ],
  about: [
    { label: "Our Approach", href: "#" },
    { label: "Sources & Lineages", href: "#" },
    { label: "Contact", href: "#" },
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
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Subscribed!",
      description: "You'll receive our newsletter with insights and guidance.",
    });

    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-padding mx-auto max-w-7xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src="/favicon.svg" alt="Sadhaka Logo" className="w-10 h-10 rounded-full bg-secondary p-1" />
              <span className="font-display text-2xl font-semibold">
                Sadhaka
              </span>
            </div>
            <p className="text-primary-foreground/70 mb-6 max-w-sm">
              A respectful guide for Western seekers exploring the paths, philosophies,
              and practices of Sanatan Dharma.
            </p>

            {/* Newsletter signup */}
            <div>
              <p className="text-sm font-medium mb-3">
                Subscribe to our newsletter
              </p>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  {isSubmitting ? "..." : "Subscribe"}
                </Button>
              </form>
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Start</h3>
            <ul className="space-y-3">
              {footerLinks.start.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sanskrit quote */}
        <div className="text-center py-8 border-t border-primary-foreground/10">
          <p className="font-sanskrit text-xl text-secondary mb-2">
            सर्वे भवन्तु सुखिनः
          </p>
          <p className="text-sm text-primary-foreground/60 italic">
            "May all beings be happy" — Ancient Vedic blessing
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <p>
              © {new Date().getFullYear()} Sadhaka. Created with reverence for the tradition.
            </p>
            <p>
              Content drawn from authentic sources within Sanatan Dharma.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
