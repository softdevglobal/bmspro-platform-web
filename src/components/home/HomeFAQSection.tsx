import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HOME_FAQS } from "@/lib/homeFaqs";

export function HomeFAQSection() {
  return (
    <section id="faq" className="scroll-mt-24 section-padding bg-[hsl(220_18%_96%)]">
      <div className="container-wide">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Common questions
          </h2>
          <p className="text-muted-foreground">
            Straight answers before you book a walkthrough.
          </p>
        </div>

        <Accordion type="single" collapsible className="max-w-3xl mx-auto bg-white rounded-3xl border border-border px-5 sm:px-6 shadow-sm">
          {HOME_FAQS.map((faq, i) => (
            <AccordionItem key={faq.q} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base font-semibold">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
