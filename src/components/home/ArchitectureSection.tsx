import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { trackCtaClick } from "@/lib/analytics";

const steps = [
  {
    number: "1",
    title: "The customer gets in touch",
    body: "They make an enquiry, request a booking or ask for a quote.",
  },
  {
    number: "2",
    title: "You decide what happens next",
    body: "Confirm the booking, arrange an inspection or prepare the quote.",
  },
  {
    number: "3",
    title: "The work is scheduled",
    body: "Choose the date and assign the right staff member or subcontractor.",
  },
  {
    number: "4",
    title: "Everyone stays updated",
    body: "Your team sees the details and the customer receives the updates they need.",
  },
  {
    number: "5",
    title: "The work is completed",
    body: "Record the outcome, finish the paperwork and move on to the next job.",
  },
];

export function ArchitectureSection() {
  return (
    <section id="workflow" className="scroll-mt-24 relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-[hsl(220_22%_8%)]" aria-hidden />
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 45% 55% at 15% 30%, hsl(210 65% 38% / 0.28), transparent 60%),
            radial-gradient(ellipse 40% 50% at 85% 70%, hsl(340 60% 42% / 0.22), transparent 55%)
          `,
        }}
      />

      <div className="container-wide relative section-padding">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="eyebrow inline-flex rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-white/80">
            How It Works
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-4 tracking-tight">
            From the first enquiry to the finished work
          </h2>
          <p className="font-sans text-lg text-white/65 leading-relaxed">
            BMS Pro keeps each step connected, so you don’t have to move the same information between
            different apps.
          </p>
        </div>

        <ol className="max-w-3xl mx-auto space-y-3 mb-10">
          {steps.map((step) => (
            <li
              key={step.number}
              className="flex gap-4 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[hsl(220_22%_10%)] font-display font-bold">
                {step.number}
              </span>
              <div>
                <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                <p className="text-sm text-white/65 leading-relaxed">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="text-center">
          <Button
            size="lg"
            className="rounded-full bg-white text-[hsl(220_22%_10%)] hover:bg-white/90"
            asChild
          >
            <Link
              to="/contact"
              onClick={() =>
                trackCtaClick({
                  label: "Book a walkthrough",
                  location: "homepage_architecture",
                  destination: "/contact",
                })
              }
            >
              Book a walkthrough
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
