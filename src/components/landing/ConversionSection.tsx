"use client";

import { useState } from "react";
import { ArrowRight, Sparkles, BookOpen, GitCompareArrows, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: BookOpen, label: "73 articles", color: "text-amber-400" },
  { icon: GitCompareArrows, label: "60 comparisons", color: "text-indigo-400" },
  { icon: Users, label: "42 deities", color: "text-rose-400" },
  { icon: Sparkles, label: "1000+ verse analyses", color: "text-emerald-400" },
];

export function ConversionSection() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="waitlist" className="relative py-24 md:py-32 overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-950/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-950/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-padding mx-auto max-w-3xl relative z-10 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-6 border border-indigo-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          Early Access
        </span>

        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
          Be First When the Tutor Launches
        </h2>

        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
          Early members get first access, shape the product direction, and receive founding member recognition.
        </p>

        {/* Email Capture */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 md:p-8 border border-white/10 max-w-lg mx-auto text-left">
            <div className="space-y-4">
              <div>
                <label htmlFor="waitlist-name" className="block text-sm font-medium text-foreground/80 mb-1.5">
                  Name
                </label>
                <input
                  id="waitlist-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="waitlist-email" className="block text-sm font-medium text-foreground/80 mb-1.5">
                  Email
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-colors"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white border-0 text-base font-medium shadow-lg shadow-indigo-900/20 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Joining..." : "Join the Waitlist"}
                {!loading && <ArrowRight className="ml-2 w-5 h-5" />}
              </Button>
              {error && (
                <p className="text-sm text-red-400 mt-2 text-center">{error}</p>
              )}
            </div>
          </form>
        ) : (
          <div className="glass-card rounded-2xl p-8 border border-emerald-500/20 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">You&apos;re on the list</h3>
            <p className="text-sm text-muted-foreground">
              We&apos;ll reach out when the tutor is ready. In the meantime, explore the knowledge library.
            </p>
          </div>
        )}

        {/* Verified stats */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-1.5 text-sm text-muted-foreground/70">
              <s.icon className={`w-3.5 h-3.5 ${s.color}`} />
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
