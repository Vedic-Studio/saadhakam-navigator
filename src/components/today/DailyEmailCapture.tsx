"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";
import { trackEmailSignup } from "@/lib/analytics/events";

/**
 * Email capture for the "Aaj ka Sadhaka" /today surface. A small inline form
 * that subscribes the visitor to the daily vara email. It posts to the shared
 * subscribe API with `interest: "daily-vara"`, shows a toast on success (the
 * same `useToast` pattern the Footer uses), and fires the `email_signup`
 * analytics event with `source: "today"`.
 *
 * This is intentionally separate from the Footer's generic newsletter form so
 * the daily-vara intent is tracked distinctly; the Footer is not refactored.
 */
export function DailyEmailCapture() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);
        try {
            const response = await fetch("/api/newsletter/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, interest: "daily-vara" }),
            });

            if (!response.ok) {
                throw new Error("Subscription failed");
            }

            trackEmailSignup("today");
            toast({
                title: "You're in.",
                description: "Tomorrow's vara, mantra, verse, and practice will arrive in your inbox.",
            });
            setEmail("");
        } catch {
            toast({
                title: "Something went wrong",
                description: "Please try again later.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <div className="mb-4 flex items-center gap-2">
                <Mail className="h-4 w-4 text-amber-300" aria-hidden />
                <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
                    Get the Daily Vara
                </h2>
            </div>
            <p className="max-w-2xl leading-relaxed text-muted-foreground">
                One short note each morning: the day&apos;s vara and its mantra, a verse to sit with, and a single
                practice. Keep the thread of sadhana unbroken.
            </p>
            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-2 sm:flex-row">
                <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                    <Input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-label="Email address"
                        className="bg-background/50 pl-9 text-foreground placeholder:text-muted-foreground/50"
                        required
                    />
                </div>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary text-primary-foreground transition-all active:scale-95 hover:bg-primary/90"
                >
                    {isSubmitting ? "..." : "Subscribe"}
                </Button>
            </form>
        </div>
    );
}
