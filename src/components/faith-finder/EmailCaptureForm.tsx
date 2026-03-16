import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QuizResult } from "@/data/faithFinderQuiz";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

interface EmailCaptureFormProps {
    result: QuizResult;
    onSuccess: () => void;
    /** When true, renders as a compact horizontal form. When false, renders as a stacked form for the overlay. */
    inline?: boolean;
}

export const EmailCaptureForm = ({ result, onSuccess, inline = true }: EmailCaptureFormProps) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch('/api/faith-finder/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    result,
                }),
            });

            if (!response.ok) {
                let message = 'Failed to submit email';
                try {
                    const err = (await response.json()) as { error?: string };
                    if (err?.error) message = err.error;
                } catch {
                    // ignore json parsing errors
                }
                throw new Error(message);
            }

            if (typeof window !== "undefined" && typeof window.sadhaka?.emailCapture === "function") {
                window.sadhaka.emailCapture(result.primaryPath);
            }

            setSuccess(true);
            setTimeout(() => {
                onSuccess();
            }, 800);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className={`flex items-center gap-2 ${inline ? '' : 'justify-center py-4'} text-green-600`}>
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium">Check your inbox!</span>
            </div>
        );
    }

    if (inline) {
        return (
            <form onSubmit={handleSubmit} className="w-full md:w-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 min-w-[250px]">
                        <Label htmlFor="email-inline" className="sr-only">Email address</Label>
                        <Input
                            id="email-inline"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                            className="bg-background"
                        />
                    </div>
                    <Button type="submit" disabled={loading || !email} className="gap-2 whitespace-nowrap">
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                Get Report
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </Button>
                </div>
                {error && (
                    <p className="text-sm text-destructive mt-2">{error}</p>
                )}
            </form>
        );
    }

    // Overlay / stacked mode
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="email-overlay" className="sr-only">Email address</Label>
                <Input
                    id="email-overlay"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    className="h-12 text-base"
                />
            </div>
            <Button type="submit" disabled={loading || !email} className="w-full h-12 gap-2 text-base">
                {loading ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                    </>
                ) : (
                    <>
                        Send My Report
                        <ArrowRight className="w-4 h-4" />
                    </>
                )}
            </Button>
            {error && (
                <p className="text-sm text-destructive">{error}</p>
            )}
        </form>
    );
};
