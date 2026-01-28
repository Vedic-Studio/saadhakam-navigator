import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Search, Heart, Flame, Dumbbell, Compass } from "lucide-react";

const pathTypes = [
  {
    id: "inquiry",
    title: "Inquiry-led Path",
    description: "For those who question deeply. You're drawn to understanding the nature of reality, consciousness, and self through investigation and contemplation.",
    traditions: ["Advaita Vedanta", "Nyaya", "Samkhya"],
    practices: ["Self-inquiry", "Study", "Meditation"],
    icon: Search,
    color: "bg-indigo-500/10 border-indigo-500/20",
    iconColor: "text-indigo-600",
  },
  {
    id: "devotion",
    title: "Devotion-led Path",
    description: "For those whose hearts overflow. You feel natural love for the Divine and find meaning in worship, surrender, and sacred relationship.",
    traditions: ["Vaishnavism", "Shaktism", "Bhakti traditions"],
    practices: ["Puja", "Kirtan", "Japa", "Seva"],
    icon: Heart,
    color: "bg-rose-500/10 border-rose-500/20",
    iconColor: "text-rose-600",
  },
  {
    id: "ritual",
    title: "Ritual-led Path",
    description: "For those who honor tradition. You find power in sacred action, ceremony, and the precise performance of spiritual rites.",
    traditions: ["Smartism", "Temple traditions", "Mimamsa"],
    practices: ["Puja", "Vrat", "Sandhya vandana"],
    icon: Flame,
    color: "bg-amber-500/10 border-amber-500/20",
    iconColor: "text-amber-600",
  },
  {
    id: "discipline",
    title: "Discipline-led Path",
    description: "For those who cultivate methodically. You're drawn to systematic practice, training the mind and body through structured approaches.",
    traditions: ["Yoga Darshana", "Tantra (structured)", "Kashmir Shaivism"],
    practices: ["Yoga asana", "Pranayama", "Dhyana", "Mantra"],
    icon: Dumbbell,
    color: "bg-emerald-500/10 border-emerald-500/20",
    iconColor: "text-emerald-600",
  },
];

const Pathfinder = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero section */}
        <section className="section-padding bg-mandala">
          <div className="container-padding mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Compass className="w-4 h-4" />
              Pathfinder
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Find Your Path
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Your spiritual path isn't random—it emerges from your nature, tendencies, and 
              how you naturally approach the sacred. Let's discover which direction calls to you.
            </p>
          </div>
        </section>

        {/* Path types */}
        <section className="section-padding">
          <div className="container-padding mx-auto max-w-5xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
              Which resonates most deeply?
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Most people find themselves drawn to one or two of these orientations. 
              There's no wrong answer—each path leads to the same destination.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {pathTypes.map((path) => {
                const IconComponent = path.icon;
                return (
                  <Card 
                    key={path.id}
                    className={`border-2 ${path.color} card-hover cursor-pointer`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 rounded-xl ${path.color} flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className={`w-7 h-7 ${path.iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                            {path.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4">
                            {path.description}
                          </p>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="font-medium text-foreground">Traditions: </span>
                              <span className="text-muted-foreground">
                                {path.traditions.join(", ")}
                              </span>
                            </div>
                            <div>
                              <span className="font-medium text-foreground">Practices: </span>
                              <span className="text-muted-foreground">
                                {path.practices.join(", ")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Coming soon message */}
            <div className="mt-12 text-center">
              <Card className="bg-muted/30 border-dashed">
                <CardContent className="p-8">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    Full Pathfinder Quiz Coming Soon
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                    We're developing a comprehensive assessment that considers your gunas, 
                    samskaras, svabhava, and life situation to provide personalized guidance.
                  </p>
                  <Link to="/start">
                    <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                      Get Notified When It Launches
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pathfinder;
