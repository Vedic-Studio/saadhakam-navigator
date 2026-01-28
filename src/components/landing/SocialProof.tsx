import { Card, CardContent } from "@/components/ui/card";
import { Quote, BookCheck, Users, Heart } from "lucide-react";

const testimonials = [
  {
    quote: "After years of reading random books and watching videos, Saadhakam helped me understand which path actually resonates with my nature. The framework around gunas and svabhava was eye-opening.",
    author: "Sarah M.",
    context: "Former seeker, now practicing Bhakti yoga",
  },
  {
    quote: "As someone who grew up Hindu but never really understood the philosophical depth, this platform reconnected me with my tradition in a way that feels both authentic and accessible.",
    author: "Arun P.",
    context: "Second-generation Indian-American",
  },
  {
    quote: "I appreciated that it doesn't push you toward one path. It genuinely helps you discover what fits—for me, that turned out to be Advaita inquiry combined with simple daily puja.",
    author: "Michael R.",
    context: "Meditation teacher and counselor",
  },
];

const trustBadges = [
  {
    label: "Culturally respectful",
    description: "Honoring the living tradition without appropriation",
    icon: Heart,
  },
  {
    label: "Source-linked learning",
    description: "Connected to authentic texts and lineages",
    icon: BookCheck,
  },
  {
    label: "Non-dogmatic guidance",
    description: "Multiple paths, no single answer imposed",
    icon: Users,
  },
];

export function SocialProof() {
  return (
    <section className="section-padding bg-background">
      <div className="container-padding mx-auto max-w-7xl">
        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
            What Seekers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card border-border/50 shadow-spiritual">
                <CardContent className="p-6">
                  <Quote className="w-8 h-8 text-secondary/50 mb-4" />
                  <p className="text-foreground mb-4 italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t border-border pt-4">
                    <p className="font-semibold text-foreground">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.context}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {trustBadges.map((badge) => {
            const IconComponent = badge.icon;
            return (
              <div 
                key={badge.label}
                className="flex items-start gap-4 p-5 bg-muted/30 rounded-xl"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {badge.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            <strong>Please note:</strong> Saadhakam offers educational and spiritual exploration support. 
            It is not a substitute for professional medical, psychological, or mental health treatment. 
            If you're experiencing a crisis, please seek appropriate professional help.
          </p>
        </div>
      </div>
    </section>
  );
}
