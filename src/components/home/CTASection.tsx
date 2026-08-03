import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { trackCtaClick } from "@/lib/analytics";

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
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight max-w-3xl mx-auto">
          Let’s see whether BMS Pro fits the way you work.
        </h2>
        <p className="font-sans text-lg text-white/65 max-w-2xl mx-auto mb-8 leading-relaxed">
          Tell us how you currently manage your bookings, jobs or appointments. We’ll show you the
          parts of BMS Pro that are relevant to your business and leave out the parts you don’t need.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-6">
          <Button
            size="xl"
            className="rounded-full bg-white text-[hsl(220_22%_10%)] hover:bg-white/90 shadow-lg"
            asChild
          >
            <Link
              to="/contact"
              onClick={() =>
                trackCtaClick("final_cta", "Book My Walkthrough", "/contact")
              }
            >
              Book My Walkthrough
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            size="xl"
            variant="outline"
            className="rounded-full border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
            asChild
          >
            <a
              href="#products"
              onClick={() =>
                trackCtaClick("final_cta", "Choose My BMS Pro", "#products")
              }
            >
              Choose My BMS Pro
            </a>
          </Button>
        </div>

        <p className="text-sm text-white/50">
          No exaggerated promises. Just a proper look at how the system works.
        </p>
      </div>
    </section>
  );
}
