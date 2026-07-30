import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Which version of BMS Pro do I need?",
    a: "BMS Pro Workshop is designed for automotive businesses, BMS Pro Trade is for trades and field-service businesses, and BMS Pro Salon is for salons and appointment-based businesses.",
  },
  {
    q: "Do I need to change the way my whole business works?",
    a: "No. Start with the part of your business causing the most frustration, then introduce other functions when you and your team are ready.",
  },
  {
    q: "Can customers make bookings online?",
    a: "Yes. Customers can use a booking link to request a suitable service, day or time. You stay in control of what is accepted.",
  },
  {
    q: "Will my customers need to install an app?",
    a: "No. Customers can use the links and messages sent to them without downloading the staff platform.",
  },
  {
    q: "Can I see the software before deciding?",
    a: "Yes. Book a walkthrough and see how the relevant workflow would operate for your business.",
  },
];

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
          {faqs.map((faq, i) => (
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
