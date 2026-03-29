"use client";

import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const interests = [
  { value: "", label: "Select one (optional)" },
  { value: "philosophy", label: "Philosophy and metaphysics" },
  { value: "practice", label: "Daily spiritual practice" },
  { value: "texts", label: "Textual analysis and commentary" },
  { value: "comparison", label: "Cross-tradition comparisons" },
];

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [interest, setInterest] = useState("");
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
        body: JSON.stringify({ email, name, interest: interest || undefined }),
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

  if (submitted) {
    return (
      <div className="glass-card rounded-2xl p-8 border border-emerald-500/20 max-w-lg mx-auto">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-6 h-6 text-emerald-400" />
        </div>
        <h3 className="font-display text-xl font-bold text-foreground mb-2">
          You&apos;re on the list
        </h3>
        <p className="text-sm text-muted-foreground">
          We&apos;ll reach out when the tutor is ready. In the meantime, explore
          the knowledge library.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card rounded-2xl p-6 md:p-8 border border-white/10 max-w-lg mx-auto text-left"
    >
      <div className="space-y-4">
        <div>
          <label
            htmlFor="app-waitlist-name"
            className="block text-sm font-medium text-foreground/80 mb-1.5"
          >
            Name
          </label>
          <input
            id="app-waitlist-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-colors"
          />
        </div>
        <div>
          <label
            htmlFor="app-waitlist-email"
            className="block text-sm font-medium text-foreground/80 mb-1.5"
          >
            Email
          </label>
          <input
            id="app-waitlist-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-colors"
          />
        </div>
        <div>
          <label
            htmlFor="app-waitlist-interest"
            className="block text-sm font-medium text-foreground/80 mb-1.5"
          >
            What draws you most?
          </label>
          <select
            id="app-waitlist-interest"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-colors"
          >
            {interests.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-card text-foreground">
                {opt.label}
              </option>
            ))}
          </select>
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
  );
}
