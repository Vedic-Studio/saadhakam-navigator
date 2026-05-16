"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, RefreshCw } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface to console for now; later this can wire into Sentry or similar.
    console.error("Route error boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-orange-500/30 selection:text-orange-100">
      <Header />
      <main className="container-padding mx-auto max-w-3xl pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="mb-10">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-orange-400/80">
            Error
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Something broke
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The page hit an unexpected error on the way to you. Try again — if
            it repeats, return home and pick a different thread.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-10">
          <Button
            onClick={() => reset()}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try again
          </Button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground hover:text-orange-400 transition-colors"
          >
            Return home
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {error.digest ? (
          <p className="text-xs text-muted-foreground/60 font-mono">
            Reference: {error.digest}
          </p>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
