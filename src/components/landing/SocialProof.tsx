import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TESTIMONIALS = [
  {
    id: 1,
    text: "Sutra explained the concept of 'Dharma' in a way that finally clicked. It's like having a wise grandmother and a Sanskrit scholar in your pocket.",
    author: "Priya Sharma",
    role: "Yoga Teacher",
    rating: 5,
    image: "https://i.pravatar.cc/100?img=1"
  },
  {
    id: 2,
    text: "The pathfinder quiz was eerily accurate. I always felt drawn to Bhakti but didn't know where to start. Now I have a daily practice.",
    author: "Rahul Verma",
    role: "Software Engineer",
    rating: 5,
    image: "https://i.pravatar.cc/100?img=11"
  },
  {
    id: 3,
    text: "Studying the Gita with word-by-word breakdown has transformed my understanding. The depth of knowledge here is incredible.",
    author: "Sarah Jenkins",
    role: "Student of Philosophy",
    rating: 5,
    image: "https://i.pravatar.cc/100?img=5"
  }
];

export function SocialProof() {
  return (
    <section className="py-24 bg-card/10 border-t border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="container-padding mx-auto max-w-7xl px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Trusted by Seekers Worldwide</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join a community of thousands who are discovering their path through ancient wisdom and modern technology.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-card/40 backdrop-blur-md border border-white/5 p-8 rounded-3xl hover:border-primary/20 hover:bg-card/60 transition-all duration-300 hover:-translate-y-1 shadow-lg">
              <div className="flex gap-1 text-primary mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-lg leading-relaxed mb-6 text-foreground/90 font-medium">"{t.text}"</p>
              <div className="flex items-center gap-4 mt-auto">
                <Avatar className="h-12 w-12 border border-white/10">
                  <AvatarImage src={t.image} />
                  <AvatarFallback>{t.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-foreground">{t.author}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-16 border-t border-white/5 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { label: "Active Users", value: "10,000+" },
            { label: "Questions Answered", value: "500k+" },
            { label: "Sadhana Minutes", value: "1M+" },
            { label: "App Store Rating", value: "4.9/5" }
          ].map((stat, i) => (
            <div key={i} className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50">{stat.value}</div>
              <div className="text-sm text-primary uppercase tracking-widest font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
