import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Building2,
  Headphones,
  MapPin,
  MessageSquare,
  Users,
  Wrench,
  Hammer,
  Scissors,
} from "lucide-react";
import { trackCtaClick, trackProductClick } from "@/lib/analytics";

const pricingFactors = [
  {
    icon: Building2,
    title: "Which BMS Pro you need",
    body: "Workshop, Trade and Salon are priced separately — each is built for a different way of taking bookings and running jobs.",
  },
  {
    icon: MapPin,
    title: "Locations and branches",
    body: "A single bay or chair costs differently from multi-site workshops, salon groups or trade crews across suburbs.",
  },
  {
    icon: Users,
    title: "Staff and team size",
    body: "How many people need login access — front desk, technicians, stylists or subcontractors — changes the plan.",
  },
  {
    icon: Headphones,
    title: "Receptionist or call support",
    body: "Optional human front-desk cover (answering calls, taking bookings) is an add-on where it fits your setup.",
  },
  {
    icon: MessageSquare,
    title: "SMS and customer updates",
    body: "Confirmations, reminders and job updates use message credits that scale with how busy your calendar is.",
  },
];

const products = [
  {
    name: "Workshop",
    href: "/products/black",
    icon: Wrench,
    blurb: "Bays, vehicles and service bookings.",
    badge: "bg-product-black text-white",
  },
  {
    name: "Trade",
    href: "/products/blue",
    icon: Hammer,
    blurb: "Quotes, jobs and field crews.",
    badge: "bg-blue text-white",
  },
  {
    name: "Salon",
    href: "/products/pink",
    icon: Scissors,
    blurb: "Appointments, services and stylists.",
    badge: "bg-pink text-white",
  },
];

const Pricing = () => {
  return (
    <Layout>
      <SEO
        title="BMS Pro Pricing | Tailored for Workshops, Trades and Salons"
        description="BMS Pro pricing depends on your business type, locations, team size and optional receptionist support. Book a walkthrough for a tailored quote."
        image="/logo.png"
        path="/pricing"
      />

      {/* Hero — why pricing isn’t a fixed public grid */}
      <section className="relative bg-background -mt-16">
        <div className="relative min-h-[min(72vh,640px)] flex items-center overflow-hidden pt-16">
          <div className="absolute inset-0 grid grid-cols-1 sm:grid-cols-3" aria-hidden>
            <img
              src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=900&h=1200&fit=crop"
              alt=""
              className="h-full w-full object-cover scale-110 blur-xs sm:blur-sm min-h-[220px]"
            />
            <img
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=900&h=1200&fit=crop"
              alt=""
              className="hidden sm:block h-full w-full object-cover scale-110 blur-sm"
            />
            <img
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=900&h=1200&fit=crop"
              alt=""
              className="hidden sm:block h-full w-full object-cover scale-110 blur-sm"
            />
          </div>
          <div className="absolute inset-0 bg-[hsl(220_22%_6%/0.62)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_22%_6%/0.45)] via-[hsl(220_22%_6%/0.35)] to-[hsl(220_22%_6%/0.82)]" />

          <div className="container-wide relative z-10 py-16 sm:py-20 w-full">
            <div className="max-w-3xl mx-auto text-center text-white">
              <p className="font-label text-sm font-semibold tracking-[0.2em] uppercase text-white/55 mb-4 animate-fade-up">
                Pricing
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 animate-fade-up delay-100 leading-[1.05]">
                Pricing that matches how you work — not a one-size grid.
              </h1>
              <p className="font-sans text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-8 animate-fade-up delay-200 leading-relaxed">
                We don’t publish a single Starter / Pro / Business list here because Workshop, Trade
                and Salon setups differ — and optional receptionist cover changes the number. Book a
                short walkthrough and we’ll quote for your business.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 animate-fade-up delay-300">
                <Button
                  size="xl"
                  className="rounded-full w-full sm:w-auto bg-white text-[hsl(220_22%_10%)] hover:bg-white/90 shadow-lg"
                  asChild
                >
                  <Link
                    to="/contact?topic=pricing#demo"
                    onClick={() =>
                      trackCtaClick(
                        "pricing_hero",
                        "Book Walkthrough for Pricing",
                        "/contact?topic=pricing#demo"
                      )
                    }
                  >
                    Book Walkthrough for Pricing
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
                    href="#what-affects-price"
                    onClick={() =>
                      trackCtaClick(
                        "pricing_hero",
                        "What Affects Pricing",
                        "#what-affects-price"
                      )
                    }
                  >
                    What Affects Pricing
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What affects pricing */}
      <section
        id="what-affects-price"
        className="scroll-mt-24 section-padding bg-[hsl(220_18%_96%)]"
      >
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              What affects your price
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We’ll walk through these with you — then send a clear AUD quote for your setup.
            </p>
          </div>

          <ul className="max-w-3xl mx-auto space-y-3">
            {pricingFactors.map((factor) => {
              const Icon = factor.icon;
              return (
                <li
                  key={factor.title}
                  className="flex gap-4 rounded-2xl border border-border bg-white px-5 py-4 sm:px-6 sm:py-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-foreground text-background">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{factor.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{factor.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Product context */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Start with the right product
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Pricing is scoped to one BMS Pro product first. You can explore how each works before
              the walkthrough.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-10">
            {products.map((product) => {
              const Icon = product.icon;
              return (
                <Link
                  key={product.name}
                  to={product.href}
                  onClick={() =>
                    trackProductClick(product.name.toLowerCase(), "pricing_page")
                  }
                  className="group rounded-2xl border border-border bg-white p-6 text-center hover:border-foreground/20 transition-colors"
                >
                  <span
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-full mb-4 ${product.badge}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-bold mb-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{product.blurb}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-foreground">
                    View product
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
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
            Get a tailored price for your setup
          </h2>
          <p className="font-sans text-lg text-white/65 max-w-2xl mx-auto mb-8 leading-relaxed">
            Tell us your business type, how many locations and whether you need call support. We’ll
            show the relevant workflow and send pricing that fits — no generic SaaS tiers.
          </p>
          <Button
            size="xl"
            className="rounded-full bg-white text-[hsl(220_22%_10%)] hover:bg-white/90 shadow-lg"
            asChild
          >
            <Link
              to="/contact?topic=pricing#demo"
              onClick={() =>
                trackCtaClick(
                  "pricing_footer",
                  "Book Walkthrough for Pricing",
                  "/contact?topic=pricing#demo"
                )
              }
            >
              Book Walkthrough for Pricing
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <p className="mt-4 text-sm text-white/50">
            Goes to our contact form — usually a reply within 24 hours.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
