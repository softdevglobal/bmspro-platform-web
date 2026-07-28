import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative overflow-hidden text-white">
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 grid grid-cols-1 sm:grid-cols-3">
          <img
            src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=900&h=800&fit=crop"
            alt=""
            className="h-full w-full object-cover scale-110 blur-sm"
          />
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=900&h=800&fit=crop"
            alt=""
            className="hidden sm:block h-full w-full object-cover scale-110 blur-sm"
          />
          <img
            src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=900&h=800&fit=crop"
            alt=""
            className="hidden sm:block h-full w-full object-cover scale-110 blur-sm"
          />
        </div>
        <div className="absolute inset-0 bg-[hsl(220_22%_6%/0.78)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_22%_6%/0.5)] via-[hsl(220_22%_6%/0.55)] to-[hsl(220_22%_6%/0.85)]" />
      </div>

      <div className="container-wide relative section-padding text-center">
        <p className="font-display text-sm font-semibold tracking-[0.2em] uppercase text-white/55 mb-4">
          BMS Pro
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight max-w-3xl mx-auto">
          Meet your virtual front desk
        </h2>
        <p className="text-lg text-white/65 max-w-xl mx-auto mb-6">
          Book a strategy call — we&apos;ll show the software, explain the receptionist handover, and
          match you to Black, Blue, or Pink.
        </p>

        <div className="inline-flex items-start sm:items-center gap-2.5 max-w-lg rounded-2xl border border-white/25 bg-white/10 backdrop-blur-md px-4 py-3 text-left mb-8">
          <ShieldCheck className="h-5 w-5 text-teal shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-sm font-semibold text-white leading-snug">
            100% Real Human Receptionists.{" "}
            <span className="text-white/70 font-medium">No AI Voicebots. No Frustrated Clients.</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
          <Button
            size="xl"
            className="rounded-full bg-white text-[hsl(220_22%_10%)] hover:bg-white/90 shadow-lg"
            asChild
          >
            <Link to="/contact">
              Book Your Strategy Call
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            size="xl"
            variant="outline"
            className="rounded-full border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
            asChild
          >
            <Link to="/contact">Meet Your Virtual Front Desk</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
