import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

const points = [
  "How a customer makes a booking",
  "What you see inside the platform",
  "How work is scheduled",
  "What your team can access",
  "How customers receive updates",
  "How the job moves to the next step",
];

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
              We’d rather show you the system than make big promises.
            </h2>
            <p className="font-sans text-lg text-white/65 leading-relaxed mb-8">
              Business software should earn your trust before you rely on it. We’ll show you how BMS
              Pro works using a normal workflow from your type of business not a long sales
              presentation filled with features you may never use.
            </p>
            <Button
              size="lg"
              className="rounded-full bg-white text-[hsl(220_22%_10%)] hover:bg-white/90"
              asChild
            >
              <Link to="/contact">
                Book a Live Walkthrough
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <p className="mt-4 text-sm text-white/50">
              No pressure to decide during the walkthrough.
            </p>
          </div>

          <ul className="space-y-3">
            {points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md px-4 py-3.5"
              >
                <Check className="h-4 w-4 text-teal shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-white/85">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
