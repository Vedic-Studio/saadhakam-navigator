interface JyotishDisclaimerProps {
    compact?: boolean;
}

export function JyotishDisclaimer({ compact = false }: JyotishDisclaimerProps) {
    return (
        <div className={`rounded-2xl border border-orange-500/20 bg-orange-500/5 ${compact ? "p-4" : "p-6"}`}>
            <p className="text-xs uppercase tracking-widest text-orange-400 font-semibold mb-2">Jyotish guardrail</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
                Sadhaka presents Jyotish as a contemplative, symbolic, and practice-oriented tradition. These pages are not medical,
                legal, financial, or deterministic predictive advice. Use them to deepen reflection, rhythm, and sadhana.
            </p>
        </div>
    );
}