"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";

export function ConversionSection() {
  return (
    <section className="relative py-32 overflow-hidden bg-background">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-gradient-glow opacity-50 pointer-events-none" />

      {/* Decorative Circles */}
      <div className="absolute top-1/2 left-10 w-64 h-64 bg-secondary/10 rounded-full blur-[80px]" />
      <div className="absolute top-1/2 right-10 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />

      <div className="container-padding mx-auto max-w-4xl relative z-10 text-center">
        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 tracking-tight">
          Your Guru Awaits.
        </h2>

        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Start your journey with <span className="text-foreground font-semibold">Sadhaka</span> today.
          <br className="hidden md:block" />
          Explore the eternal path with guidance that adapts to you.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link href="/pathfinder">
            <Button size="lg" className="h-16 px-10 rounded-full text-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xl shadow-primary/20 hover:scale-105 transition-transform duration-300">
              Start with Sadhaka
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </Link>

          <Link href="/download">
            <Button size="lg" variant="outline" className="h-16 px-10 rounded-full text-lg border-white/10 hover:bg-white/5 hover:text-foreground text-muted-foreground transition-colors">
              <Download className="mr-2 w-5 h-5" />
              Download App
            </Button>
          </Link>
        </div>

        <p className="mt-8 text-sm text-muted-foreground/60">
          Free forever for seekers. Premium features available.
        </p>
      </div>
    </section>
  );
}
