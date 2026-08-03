import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { trackCtaClick } from "@/lib/analytics";
import { WhatHappensNext } from "@/components/WhatHappensNext";

export function TrustWalkthroughSection() {
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

      <div className="container-wide relative section-padding">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5">
              See it with your workflow — before you decide.
            </h2>
            <p className="font-sans text-lg text-white/65 leading-relaxed mb-8">
              We’ll walk through a normal day for your workshop, trade crew or salon. Not a feature
              dump — just the parts you’d actually use.
            </p>
            <Button
              size="lg"
              className="rounded-full bg-white text-[hsl(220_22%_10%)] hover:bg-white/90"
              asChild
            >
              <Link
                to="/contact"
                onClick={() =>
                  trackCtaClick("trust_walkthrough", "Book a Live Walkthrough", "/contact")
                }
              >
                Book a Live Walkthrough
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <p className="mt-4 text-sm text-white/50">
              No pressure to decide on the call.
            </p>
          </div>

          <WhatHappensNext variant="dark" />
        </div>
      </div>
    </section>
  );
}
