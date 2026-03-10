import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QuizResult } from "@/data/faithFinderQuiz";
import { ArrowRight, Loader2 } from "lucide-react";

interface EmailCaptureFormProps {
    result: QuizResult;
    onSuccess: () => void;
}

export const EmailCaptureForm = ({ result, onSuccess }: EmailCaptureFormProps) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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
                    // ignore json parsing errors and keep generic message
                }
                throw new Error(message);
            }

            const data = (await response.json()) as { id?: string };
            if (data?.id) {
                if (typeof window !== "undefined" && typeof window.sadhaka?.emailCapture === "function") {
                    window.sadhaka.emailCapture(result.primaryPath);
                }

                // Shareable results URL
                window.location.href = `/faith-finder/results/${data.id}`;
                return;
            }

            if (typeof window !== "undefined" && typeof window.sadhaka?.emailCapture === "function") {
                window.sadhaka.emailCapture(result.primaryPath);
            }

            onSuccess();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full md:w-auto">
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 min-w-[250px]">
                    <Label htmlFor="email" className="sr-only">Email address</Label>
                    <Input
                        id="email"
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
};
