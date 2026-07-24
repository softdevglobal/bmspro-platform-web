import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function CTASection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-narrow">
        <div className="relative overflow-hidden rounded-[2rem] border border-border/50 bg-card px-8 py-12 md:px-14 md:py-16 text-center shadow-elevated">
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden
            style={{
              background: `
                radial-gradient(ellipse 45% 60% at 0% 50%, hsl(var(--blue) / 0.1), transparent),
                radial-gradient(ellipse 40% 55% at 100% 50%, hsl(var(--pink) / 0.1), transparent)
              `,
            }}
          />

          <div className="relative">
            <p className="font-display text-sm font-semibold tracking-[0.18em] uppercase text-muted-foreground mb-4">
              BMS Pro
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 tracking-tight">
              Meet your virtual front desk
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-6">
              Book a strategy call — we&apos;ll show the software, explain the receptionist handover, and
              match you to Black, Blue, or Pink.
            </p>

            <div className="inline-flex items-start sm:items-center gap-2.5 max-w-md rounded-2xl border border-teal/25 bg-teal-light px-4 py-3 text-left mb-8">
              <ShieldCheck className="h-5 w-5 text-teal shrink-0 mt-0.5 sm:mt-0" />
              <p className="text-sm font-semibold text-foreground leading-snug">
                100% Real Human Receptionists.{" "}
                <span className="text-muted-foreground font-medium">No AI Voicebots.</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
              <Button variant="hero" size="xl" className="rounded-full" asChild>
                <Link to="/contact">
                  Book Your Strategy Call
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" className="rounded-full" asChild>
                <Link to="/contact">Meet Your Virtual Front Desk</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
