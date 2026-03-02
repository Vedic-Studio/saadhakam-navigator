"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, X } from "lucide-react";

export function MobileCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isDismissed) return;
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      setIsVisible(scrollPosition > viewportHeight * 0.5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!isVisible || isDismissed) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden p-4 bg-background/95 backdrop-blur-md border-t border-border shadow-lg ${prefersReducedMotion ? "" : "animate-slide-in-right"
        }`}
    >
      <div className="flex items-center gap-3">
        <Link href="/faith-finder" className="flex-1">
          <Button
            size="lg"
            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            Start Your Path
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDismissed(true)}
          className="flex-shrink-0"
        >
          <X className="w-5 h-5" />
          <span className="sr-only">Dismiss</span>
        </Button>
      </div>
    </div>
  );
}
