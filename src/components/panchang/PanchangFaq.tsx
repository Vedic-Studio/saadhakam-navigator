import { panchangFaqs } from "@/data/panchang-faq";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function PanchangFaq() {
    return (
        <section className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
            <div className="mb-5">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-orange-400">Panchang FAQ</p>
                <h3 className="mt-1 font-display text-2xl font-bold">Common questions</h3>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
                {panchangFaqs.map((faq, index) => (
                    <AccordionItem key={faq.question} value={`panchang-faq-${index}`} className="rounded-2xl border border-border/60 px-5">
                        <AccordionTrigger className="text-left font-display text-base font-semibold hover:no-underline">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}