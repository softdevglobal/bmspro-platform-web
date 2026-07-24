import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, ShieldCheck, Wrench, Sparkles, Hammer } from "lucide-react";

const plans = [
  {
    name: "Starter",
    description: "Perfect for solo operators and small teams just getting started.",
    price: "$29",
    period: "/month",
    features: [
      "Up to 2 staff members",
      "500 bookings/month",
      "Online booking page",
      "Client management",
      "Email reminders",
      "Basic reporting",
    ],
    cta: "Start Free Trial",
    variant: "outline" as const,
    popular: false,
  },
  {
    name: "Professional",
    description: "For growing businesses that need more power and flexibility.",
    price: "$79",
    period: "/month",
    features: [
      "Up to 10 staff members",
      "Unlimited bookings",
      "All Starter features",
      "SMS reminders",
      "Advanced analytics",
      "API access",
      "Priority support",
    ],
    cta: "Start Free Trial",
    variant: "default" as const,
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large organizations with complex requirements.",
    price: "Custom",
    period: "",
    features: [
      "Unlimited staff",
      "Unlimited bookings",
      "All Professional features",
      "Multi-location",
      "Custom integrations",
      "Dedicated support",
      "SLA guarantee",
      "Custom training",
    ],
    cta: "Contact Sales",
    variant: "outline" as const,
    popular: false,
  },
];

const products = [
  { icon: Wrench, label: "Black · Mechanics", color: "bg-product-black" },
  { icon: Sparkles, label: "Pink · Salons", color: "bg-pink" },
  { icon: Hammer, label: "Blue · Trades", color: "bg-blue" },
];

const Pricing = () => {
  return (
    <Layout>
      <SEO
        title="Pricing | BMS Pro Plans from $29/month"
        description="Simple, transparent pricing for BMS Pro. Starter, Professional, and Enterprise plans with a 14-day free trial. No credit card required."
        path="/pricing"
      />

      {/* Full-bleed image hero */}
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
                Simple, transparent pricing
              </h1>
              <p className="font-sans text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-8 animate-fade-up delay-200 leading-relaxed">
                Choose the plan that fits your business. All plans include a 14-day free trial —
                software plus a human front desk when you&apos;re ready.
              </p>

              <div className="flex flex-col items-center gap-4 animate-fade-up delay-300">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto">
                  <Button
                    size="xl"
                    className="rounded-full w-full sm:w-auto bg-white text-[hsl(220_22%_10%)] hover:bg-white/90 shadow-lg"
                    asChild
                  >
                    <a href="#plans">
                      View Plans
                      <ArrowRight className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button
                    size="xl"
                    variant="outline"
                    className="rounded-full w-full sm:w-auto border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
                    asChild
                  >
                    <Link to="/contact">Talk to Sales</Link>
                  </Button>
                </div>

                <div className="inline-flex items-start sm:items-center gap-2.5 max-w-lg rounded-2xl border border-white/25 bg-white/10 backdrop-blur-md px-4 py-3 text-left">
                  <ShieldCheck className="h-5 w-5 text-teal shrink-0 mt-0.5 sm:mt-0" />
                  <p className="text-sm font-semibold text-white leading-snug">
                    14-day free trial.{" "}
                    <span className="text-white/70 font-medium">No credit card required.</span>
                  </p>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-3 animate-fade-up delay-400">
                {products.map((item) => {
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
      </section>

      {/* Plans */}
      <section id="plans" className="section-padding bg-secondary/30 scroll-mt-20">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center mb-12 lg:mb-14">
            <span className="eyebrow inline-flex rounded-full border border-border bg-background/80 px-3 py-1 text-muted-foreground">
              Plans
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-3 tracking-tight">
              Plans for every stage of growth
            </h2>
            <p className="font-sans text-lg text-muted-foreground">
              Start small, scale when you&apos;re ready — same platform for Black, Pink, and Blue.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 lg:gap-6 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative card-elevated p-7 sm:p-8 flex flex-col animate-fade-up shadow-elevated ${
                  plan.popular ? "border-2 border-primary ring-4 ring-primary/10" : "border border-border/60"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-label font-semibold">
                    Most Popular
                  </span>
                )}

                <div className="mb-6">
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-6">
                  <span className="font-display text-4xl font-bold text-foreground tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-teal flex-shrink-0 mt-0.5" />
                      <span className="font-sans text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.variant}
                  size="lg"
                  className="w-full rounded-full"
                  asChild
                >
                  <Link to="/contact">
                    {plan.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
          <div className="absolute inset-0 bg-[hsl(220_22%_6%/0.72)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_22%_6%/0.5)] via-[hsl(220_22%_6%/0.55)] to-[hsl(220_22%_6%/0.85)]" />
        </div>

        <div className="container-wide relative section-padding text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight max-w-3xl mx-auto">
            Need a custom solution?
          </h2>
          <p className="font-sans text-lg text-white/70 max-w-xl mx-auto mb-8">
            Looking for multi-product bundles, multi-location, or a receptionist handover? We&apos;ll
            match you to the right plan.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <Button
              size="xl"
              className="rounded-full bg-white text-[hsl(220_22%_10%)] hover:bg-white/90 shadow-lg"
              asChild
            >
              <Link to="/contact">
                Talk to Sales
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="rounded-full border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
              asChild
            >
              <Link to="/products">Explore Products</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
