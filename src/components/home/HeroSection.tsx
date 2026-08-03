import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wrench, Scissors, Hammer } from "lucide-react";
import { HeroBundleVisual } from "./HeroBundleVisual";
import { MarqueeStrip } from "@/components/motion/AnimateVisual";
import { trackCtaClick } from "@/lib/analytics";

const heroCollage = [
  {
    src: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&h=1600&fit=crop",
    alt: "Mechanic workshop",
  },
  {
    src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&h=1600&fit=crop",
    alt: "Hair salon",
  },
  {
    src: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&h=1600&fit=crop",
    alt: "Tradesperson at work",
  },
];

const businessTypes = [
  { label: "Workshop", href: "/products/black", icon: Wrench, color: "bg-product-black" },
  { label: "Trade Business", href: "/products/blue", icon: Hammer, color: "bg-blue" },
  { label: "Salon", href: "/products/pink", icon: Scissors, color: "bg-pink" },
];

const trustItems = [
  "See the software before deciding",
  "Built for everyday service businesses",
  "Simple setup and guided onboarding",
  "Australian-based team",
];

export function HeroSection() {
  return (
    <section className="relative bg-background -mt-16">
      <div className="relative min-h-[min(88vh,760px)] sm:min-h-[min(92vh,860px)] flex items-center overflow-hidden pt-16">
        {/* Mobile: single image. Desktop: 3-panel collage */}
        <div className="absolute inset-0 sm:hidden" aria-hidden>
          <img
            src={heroCollage[0].src}
            alt=""
            className="absolute inset-0 h-full w-full object-cover scale-105"
          />
        </div>
        <div className="absolute inset-0 hidden sm:grid sm:grid-cols-3" aria-hidden>
          {heroCollage.map((panel) => (
            <div key={panel.src} className="relative overflow-hidden">
              <img
                src={panel.src}
                alt=""
                className="absolute inset-0 h-full w-full object-cover scale-110 blur-sm"
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-[hsl(220_22%_6%/0.72)] sm:bg-[hsl(220_22%_6%/0.62)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_22%_6%/0.55)] via-[hsl(220_22%_6%/0.4)] to-[hsl(220_22%_6%/0.85)]" />

        <div className="container-wide relative z-10 py-12 sm:py-20 lg:py-24 w-full">
          <div className="max-w-3xl mx-auto text-center text-white px-1">
            <p className="eyebrow inline-flex max-w-full text-center rounded-full border border-white/25 bg-white/10 backdrop-blur-sm px-3 py-1 text-white/80 mb-4 sm:mb-5 animate-fade-up">
              One platform built around the way you work
            </p>

            <h1 className="font-display text-[1.75rem] leading-tight sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight mb-4 sm:mb-5 animate-fade-up delay-100 sm:leading-[1.05]">
              Run the work without letting the admin run you.
            </h1>

            <p className="font-sans text-sm sm:text-lg text-white/70 max-w-2xl mx-auto mb-6 sm:mb-8 animate-fade-up delay-200 leading-relaxed">
              Keep your bookings, jobs, staff and customer updates in one place so you spend less
              time chasing information and more time running your business.
            </p>

            <div className="flex flex-col items-center gap-4 animate-fade-up delay-300">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto">
                <Button
                  size="xl"
                  className="rounded-full w-full sm:w-auto bg-white text-[hsl(220_22%_10%)] hover:bg-white/90 shadow-lg"
                  asChild
                >
                  <Link
                    to="/contact"
                    onClick={() =>
                      trackCtaClick({
                        label: "Book a walkthrough",
                        location: "homepage_hero",
                        destination: "/contact",
                      })
                    }
                  >
                    Book a walkthrough
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="xl"
                  variant="outline"
                  className="rounded-full w-full sm:w-auto border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
                  asChild
                >
                  <a
                    href="#products"
                    onClick={() =>
                      trackCtaClick({
                        label: "Choose your BMS Pro",
                        location: "homepage_hero",
                        destination: "#products",
                      })
                    }
                  >
                    Choose your BMS Pro
                  </a>
                </Button>
              </div>

              <p className="text-sm text-white/65">
                Built in Melbourne for workshops, tradies and salons.
              </p>
            </div>

            <div className="mt-8 sm:mt-10 animate-fade-up delay-400">
              <p className="text-sm font-semibold text-white/80 mb-3 sm:mb-4">
                Which type of business do you run?
              </p>
              <div className="grid grid-cols-1 xs:grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-3 max-w-md xs:max-w-none mx-auto">
                {businessTypes.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() =>
                        trackCtaClick({
                          label: item.label,
                          location: "homepage_hero_business_type",
                          destination: item.href,
                        })
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2.5 text-sm font-label font-semibold text-white hover:bg-white/20 transition-colors"
                    >
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full ${item.color}`}
                      >
                        <Icon className="h-3 w-3" />
                      </span>
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-wide relative -mt-10 sm:-mt-14 lg:-mt-16 pb-8 sm:pb-10 z-20">
        <HeroBundleVisual />
      </div>

      <div className="border-y border-border/60 bg-[hsl(220_14%_97%)] py-7 sm:py-8 overflow-hidden">
        <MarqueeStrip
          items={trustItems}
          fadeFromClassName="from-[hsl(220_14%_97%)]"
          duration={28}
        />
      </div>
    </section>
  );
}
