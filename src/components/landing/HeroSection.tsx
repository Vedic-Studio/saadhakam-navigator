import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden pt-20">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-glow opacity-30" />

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-[10%] w-72 h-72 bg-secondary/10 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-float" />

      <div className="container-padding relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Left: Text Content */}
        <div className="text-center lg:text-left space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-xs font-medium text-accent uppercase tracking-wider">New: Meet Sutra AI</span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-tight">
            What if Krishna was your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">personal guide?</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
            Meet <strong>Sutra</strong> — your AI companion rooted in 5000 years of Sanatan wisdom. Decode Shastras, learn Shlokas, and find your path.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 h-14 px-8 rounded-full text-lg">
              Talk to Sutra
              <MessageSquare className="ml-2 w-5 h-5" />
            </Button>
            <Link to="/pathfinder">
              <Button variant="outline" size="lg" className="h-14 px-8 rounded-full text-lg border-white/10 hover:bg-white/5 text-foreground hover:text-white">
                Find Your Path
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="pt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-muted-foreground">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <Avatar key={i} className="w-10 h-10 border-2 border-background">
                  <AvatarImage src={`https://i.pravatar.cc/100?img=${i + 15}`} />
                  <AvatarFallback>U{i}</AvatarFallback>
                </Avatar>
              ))}
              <div className="w-10 h-10 rounded-full bg-card border-2 border-background flex items-center justify-center text-xs font-bold text-foreground">
                +10k
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex text-accent">★★★★★</div>
              <span>Loved by 10,000+ seekers</span>
            </div>
          </div>
        </div>

        {/* Right: Interactive Chat Preview */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-full perspective-1000">
          {/* Glassmorphic Card */}
          <div className="relative glass-card rounded-3xl p-6 md:p-8 animate-float duration-[8s] border border-white/10 bg-gradient-to-br from-white/5 to-transparent">

            {/* Chat Header */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent p-[2px]">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Sutra AI</h3>
                <p className="text-xs text-secondary flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  Online • Wisdom of Ages
                </p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="space-y-6 font-medium">
              {/* User Message */}
              <div className="flex justify-end">
                <div className="bg-primary/20 text-foreground rounded-2xl rounded-tr-sm py-3 px-5 max-w-[85%] border border-primary/10">
                  <p className="text-sm">Bhagwan, I am confused about my dharma. How do I know which path is right for me?</p>
                </div>
              </div>

              {/* AI Message */}
              <div className="flex justify-start">
                <div className="bg-card/50 text-foreground rounded-2xl rounded-tl-sm py-4 px-6 max-w-[90%] border border-white/5 shadow-inner">
                  <p className="text-sm mb-3">
                    <span className="font-sanskrit text-accent text-lg block mb-1">क्लैब्यं मा स्म गमः पार्थ</span>
                    "O Parth, do not yield to this degrading impotence."
                  </p>
                  <p className="text-sm leading-relaxed opacity-90">
                    Your confusion is the first step toward clarity. Let us explore your <strong>Svabhava</strong> (inner nature).
                    <br /><br />
                    Tell me — does your heart seek <em>knowledge</em>, <em>devotion</em>, or <em>action</em>?
                  </p>
                </div>
              </div>
            </div>

            {/* Input Area Mockup */}
            <div className="mt-8 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              <div className="bg-white/5 rounded-full p-1 pl-6 flex items-center border border-white/10">
                <span className="text-sm text-muted-foreground flex-1">I seek devotion...</span>
                <Button size="icon" className="rounded-full bg-primary hover:bg-primary/90">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

          </div>

          {/* Background glow behind card */}
          <div className="absolute inset-0 bg-primary/20 blur-[100px] -z-10" />
        </div>

      </div>
    </section>
  );
}
