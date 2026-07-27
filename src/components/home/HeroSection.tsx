import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Wrench, Sparkles, Hammer } from "lucide-react";
import { HeroBundleVisual } from "./HeroBundleVisual";

const heroCollage = [
  {
    src: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&h=1600&fit=crop",
    alt: "Mechanic workshop",
    label: "Black · Mechanics",
  },
  {
    src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&h=1600&fit=crop",
    alt: "Hair salon",
    label: "Pink · Salons",
  },
  {
    src: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&h=1600&fit=crop",
    alt: "Tradesperson at work",
    label: "Blue · Trades",
  },
];

export function HeroSection() {
  return (
    <section className="relative bg-background -mt-16">
      {/* Full-bleed image hero — content sits on top */}
      <div className="relative min-h-[min(92vh,860px)] flex items-center overflow-hidden pt-16">
        {/* Background collage */}
        <div className="absolute inset-0 grid grid-cols-1 sm:grid-cols-3" aria-hidden>
          {heroCollage.map((panel) => (
            <div key={panel.src} className="relative min-h-[220px] sm:min-h-full overflow-hidden">
              <img
                src={panel.src}
                alt=""
                className="absolute inset-0 h-full w-full object-cover scale-110 blur-xs sm:blur-sm"
              />
            </div>
          ))}
        </div>

        {/* Readability overlays */}
        <div className="absolute inset-0 bg-[hsl(220_22%_6%/0.68)] sm:bg-[hsl(220_22%_6%/0.62)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_22%_6%/0.5)] via-[hsl(220_22%_6%/0.35)] to-[hsl(220_22%_6%/0.8)]" />

        {/* Content on the image */}
        <div className="container-wide relative z-10 py-16 sm:py-20 lg:py-24 w-full">
          <div className="max-w-3xl mx-auto text-center text-white">
            <p className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight mb-5 animate-fade-up leading-[1.02]">
              BMS PRO
            </p>

            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 animate-fade-up delay-100 leading-snug">
              Your software. Their front desk.
              <span className="block text-white/75 font-sans font-medium mt-1 text-xl sm:text-2xl lg:text-3xl">
                Real humans answering — not bots.
              </span>
            </h1>

            <p className="font-sans text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-8 animate-fade-up delay-200 leading-relaxed">
              Booking &amp; operations for mechanic shops, salons, and trades — paired with
              professional receptionists who book while your team works.
            </p>

            <div className="flex flex-col items-center gap-4 animate-fade-up delay-300">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto">
                <Button
                  size="xl"
                  className="rounded-full w-full sm:w-auto bg-white text-[hsl(220_22%_10%)] hover:bg-white/90 shadow-lg"
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
                  className="rounded-full w-full sm:w-auto border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
                  asChild
                >
                  <Link to="/contact">Meet Your Virtual Front Desk</Link>
                </Button>
              </div>

              <div className="inline-flex items-start sm:items-center gap-2.5 max-w-lg rounded-2xl border border-white/25 bg-white/10 backdrop-blur-md px-4 py-3 text-left">
                <ShieldCheck className="h-5 w-5 text-teal shrink-0 mt-0.5 sm:mt-0" />
                <p className="text-sm font-semibold text-white leading-snug">
                  100% Real Human Receptionists.{" "}
                  <span className="text-white/70 font-medium">
                    No AI Voicebots. No Frustrated Clients.
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 animate-fade-up delay-400">
              {[
                { icon: Wrench, label: "Mechanics", color: "bg-product-black" },
                { icon: Sparkles, label: "Salons", color: "bg-pink" },
                { icon: Hammer, label: "Trades", color: "bg-blue" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1.5 text-sm font-label font-semibold text-white"
                  >
                    <span className={`flex h-6 w-6 items-center justify-center rounded-full ${item.color}`}>
                      <Icon className="h-3 w-3" />
                    </span>
                    {item.label}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bundle visual sits just below the image hero */}
      <div className="container-wide relative -mt-10 sm:-mt-14 lg:-mt-16 pb-12 sm:pb-16 z-20">
        <HeroBundleVisual />
      </div>
    </section>
  );
}
