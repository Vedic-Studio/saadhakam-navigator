import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is Sadhaka a religious conversion tool?",
    answer: "No. Sadhaka is an educational platform for exploration, not conversion. We help you understand the depth and breadth of Sanatan Dharma so you can make informed choices about your spiritual practice. Many users come from other traditions or no tradition at all—we welcome honest seekers without any expectation of 'converting' anyone."
  },
  {
    question: "Is it okay if I'm completely new to Sanskrit and Indian philosophy?",
    answer: "Absolutely. Sadhaka is designed for Western seekers who may have little or no background in these traditions. We explain terms clearly, provide translations, and build understanding progressively. Everyone starts somewhere—curiosity and sincerity are the only prerequisites."
  },
  {
    question: "How do you avoid misrepresenting these traditions?",
    answer: "We're deeply committed to accuracy and respect. Our content is sourced from traditional texts and lineages, not New Age interpretations. We consult with scholars and practitioners, link to primary sources, and acknowledge the living, diverse nature of these traditions. We also clearly distinguish between different schools of thought rather than presenting a homogenized version."
  },
  {
    question: "Do I need a guru to follow these paths?",
    answer: "It depends on the path and your depth of practice. Many practices—study, basic meditation, devotional singing, ethical living—can be begun without a formal guru relationship. For advanced practices, especially tantric or initiatory traditions, a qualified teacher is traditionally considered essential. We help you understand when and why a teacher might be important for your chosen path."
  },
  {
    question: "What if I'm already Christian, Buddhist, Jewish, or follow another tradition?",
    answer: "You're welcome here. Many seekers find that exploring Sanatan Dharma enriches their understanding without requiring them to abandon their existing faith. Some aspects—meditation techniques, philosophical frameworks, ethical principles—can complement other traditions. We encourage honest engagement without syncretism or superficiality. Take what genuinely helps; leave what doesn't serve your path."
  },
  {
    question: "How is this different from what I'd find on Wikipedia or random websites?",
    answer: "While there's good information scattered across the internet, Sadhaka offers something different: a structured, practice-oriented approach that helps you find your path. We're not just providing information—we're providing a framework for self-understanding and practical guidance for beginning and sustaining a practice that fits your nature and life situation."
  }
];

export function FAQSection() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-padding mx-auto max-w-3xl">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            Common Questions
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Honest answers for thoughtful seekers.
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="bg-card border border-border/50 rounded-xl px-6 data-[state=open]:shadow-spiritual"
            >
              <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
