import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  PinkPlan,
  PinkBillingPeriod,
  PINK_PLANS,
  formatAud,
  priceForPeriod,
  periodSuffix,
} from "@/lib/pinkPlans";
import {
  ArrowRight,
  Check,
  Mail,
  CalendarDays,
  Users,
  Store,
  Sparkles,
  BarChart3,
  Headphones,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SUPPORT_EMAIL = "support@bmspros.com.au";
const INFO_EMAIL = "info@bmspros.com.au";

const includedItems = [
  {
    icon: CalendarDays,
    title: "Scheduling that fills the chair",
    body: "Appointments, staff availability, and online booking built for salon days.",
  },
  {
    icon: Users,
    title: "Client relationships",
    body: "Profiles, history, and follow-ups so regulars come back and spend more.",
  },
  {
    icon: Store,
    title: "Grow across locations",
    body: "Start with one salon — scale to multi-branch with Pro or Enterprise.",
  },
  {
    icon: BarChart3,
    title: "Marketing & insights",
    body: "Tools and dashboards on Pro+ so you see what’s working and fill quiet slots.",
  },
  {
    icon: Headphones,
    title: "Support that matches your plan",
    body: "Email on Starter, priority on Pro, dedicated success on Enterprise.",
  },
  {
    icon: Sparkles,
    title: "Built for beauty businesses",
    body: "Salon and beauty workflows — SoftDev Global / BMS Pros, priced in AUD.",
  },
];

export interface PinkPricingSectionProps {
  plans?: PinkPlan[];
  /** Full = brand hero + plans. Embedded = plans onward (for Product Pink page). */
  variant?: "full" | "embedded";
  /** Pull hero under site header — only for first section on a page */
  offsetHeader?: boolean;
  /** Extra top space when a floating product picker overlays the hero */
  overlayPicker?: boolean;
  className?: string;
}

export function PinkPricingSection({
  plans = PINK_PLANS,
  variant = "full",
  offsetHeader = true,
  overlayPicker = false,
  className,
}: PinkPricingSectionProps) {
  const [period, setPeriod] = useState<PinkBillingPeriod>("monthly");

  return (
    <div className={cn(className)}>
      {variant === "full" && (
        <section className={cn("relative bg-background", offsetHeader && "-mt-16")}>
          <div
            className={cn(
              "relative min-h-[min(72vh,620px)] flex items-center overflow-hidden",
              offsetHeader && "pt-16"
            )}
          >
            <div className="absolute inset-0" aria-hidden>
              <img
                src="/products/pink/hero.jpg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover scale-105"
              />
              <div className="absolute inset-0 bg-[hsl(340_40%_12%/0.68)]" />
              <div className="absolute inset-0 bg-gradient-to-b from-[hsl(340_45%_20%/0.4)] via-[hsl(340_35%_14%/0.45)] to-[hsl(340_40%_10%/0.88)]" />
            </div>

            <div
              className={cn(
                "container-wide relative z-10 py-16 sm:py-20 w-full",
                overlayPicker && "pt-28 sm:pt-32"
              )}
            >
              <div className="max-w-3xl mx-auto text-center text-white">
                <div className="inline-flex items-center gap-2.5 mb-6 animate-fade-up">
                  <img
                    src="/products/pink/icon.png"
                    alt=""
                    className="h-10 w-10 rounded-lg ring-1 ring-white/25"
                  />
                  <span className="font-label text-xs font-semibold tracking-[0.2em] uppercase text-white/55">
                    BMS PRO SALON
                  </span>
                </div>

                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 animate-fade-up delay-100 leading-[1.02]">
                  BMS Pro Pink
                </h1>

                <p className="font-sans text-base sm:text-lg text-white/70 max-w-xl mx-auto mb-8 animate-fade-up delay-200 leading-relaxed">
                  Salon &amp; beauty business management — scheduling, clients, and growth in AUD.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 animate-fade-up delay-300">
                  <Button
                    size="xl"
                    className="rounded-full w-full sm:w-auto bg-white text-pink hover:bg-white/90 shadow-lg transition-transform duration-200 hover:-translate-y-0.5"
                    asChild
                  >
                    <a href="#pink-plans">
                      View plans
                      <ArrowRight className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button
                    size="xl"
                    variant="outline"
                    className="rounded-full w-full sm:w-auto border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm transition-transform duration-200 hover:-translate-y-0.5"
                    asChild
                  >
                    <Link to="/contact">Book a demo</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Plans */}
      <section
        id="pink-plans"
        className={cn(
          "section-padding scroll-mt-32",
          variant === "full" ? "bg-secondary/30" : "bg-secondary/30 border-t border-border/40"
        )}
      >
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center mb-8 lg:mb-10">
            <span className="eyebrow inline-flex rounded-full border border-pink/20 bg-pink-light px-3 py-1 text-pink">
              Subscription plans
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-3 tracking-tight">
              Pink pricing for Australian salons
            </h2>
            <p className="font-sans text-lg text-muted-foreground mb-2">
              Clear AUD plans — from a single chair to multi-location beauty groups.
            </p>
            <p className="font-sans text-sm text-muted-foreground">
              Starter for single-location → Pro for growing teams → Enterprise for multi-branch orgs.
            </p>
          </div>

          {/* Monthly / Yearly toggle */}
          <div className="flex flex-col items-center gap-3 mb-10 sm:mb-12">
            <div
              className="inline-flex rounded-full border border-border bg-background p-1 shadow-sm"
              role="group"
              aria-label="Billing period"
            >
              <button
                type="button"
                aria-pressed={period === "monthly"}
                onClick={() => setPeriod("monthly")}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-label font-semibold transition-all",
                  period === "monthly"
                    ? "bg-pink text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Monthly
              </button>
              <button
                type="button"
                aria-pressed={period === "yearly"}
                onClick={() => setPeriod("yearly")}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-label font-semibold transition-all",
                  period === "yearly"
                    ? "bg-pink text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Yearly
              </button>
            </div>
            {period === "yearly" && (
              <p className="text-sm font-medium text-pink animate-fade-in">
                Pay yearly — ~2 months free
              </p>
            )}
          </div>

          <div className="grid gap-5 lg:gap-6 md:grid-cols-3 max-w-5xl mx-auto items-stretch">
            {plans.map((plan, index) => (
              <PlanCard key={plan.planKey} plan={plan} period={period} index={index} />
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            All prices in Australian dollars (AUD). Need a walkthrough?{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="font-semibold text-foreground underline-offset-4 hover:underline"
            >
              Contact support
            </a>
          </p>
        </div>
      </section>

      {variant === "full" && (
        <>
          <section className="section-padding bg-background">
            <div className="container-wide">
              <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-12">
                <span className="eyebrow inline-flex rounded-full border border-border bg-secondary/60 px-3 py-1 text-muted-foreground">
                  Across Pink
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-4 mb-3 tracking-tight">
                  Built for salon outcomes
                </h2>
                <p className="font-sans text-muted-foreground">
                  Fill the diary, know your clients, and grow with support that scales with you.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 max-w-5xl mx-auto">
                {includedItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="flex gap-4 p-5 sm:p-6 rounded-2xl border border-border/60 bg-card animate-fade-up"
                      style={{ animationDelay: `${index * 60}ms` }}
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pink/10 text-pink">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                          {item.title}
                        </h3>
                        <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden text-white">
            <div className="absolute inset-0" aria-hidden>
              <img
                src="/products/pink/hero.jpg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover scale-110 blur-sm"
              />
              <div className="absolute inset-0 bg-[hsl(340_40%_12%/0.78)]" />
              <div className="absolute inset-0 bg-gradient-to-b from-[hsl(340_45%_18%/0.5)] via-[hsl(340_40%_12%/0.6)] to-[hsl(340_40%_8%/0.92)]" />
            </div>

            <div className="container-wide relative section-padding text-center">
              <img
                src="/products/pink/icon.png"
                alt=""
                className="h-12 w-12 rounded-2xl mb-6 ring-1 ring-white/20 mx-auto animate-fade-up"
              />
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight animate-fade-up delay-100">
                SoftDev Global · BMS Pro Pink
              </h2>
              <p className="font-sans text-lg text-white/70 max-w-xl mx-auto mb-8 animate-fade-up delay-200">
                Salon management for Australian beauty businesses — book a demo or talk to sales.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mb-10 animate-fade-up delay-300">
                <Button
                  size="xl"
                  className="rounded-full bg-white text-pink hover:bg-white/90 shadow-lg transition-transform duration-200 hover:-translate-y-0.5"
                  asChild
                >
                  <Link to="/contact">
                    Book a demo
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="xl"
                  variant="outline"
                  className="rounded-full border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
                  asChild
                >
                  <Link to="/products/pink">Product overview</Link>
                </Button>
              </div>
              <ul className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-white/65">
                <li className="inline-flex items-center gap-2">
                  <Mail className="h-4 w-4 text-white/45" />
                  <a
                    href={`mailto:${SUPPORT_EMAIL}`}
                    className="text-white/90 font-medium underline-offset-4 hover:underline"
                  >
                    {SUPPORT_EMAIL}
                  </a>
                </li>
                <li className="hidden sm:inline text-white/25" aria-hidden>
                  ·
                </li>
                <li className="inline-flex items-center gap-2">
                  <Mail className="h-4 w-4 text-white/45" />
                  <a
                    href={`mailto:${INFO_EMAIL}`}
                    className="text-white/90 font-medium underline-offset-4 hover:underline"
                  >
                    {INFO_EMAIL}
                  </a>
                </li>
              </ul>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function PlanCard({
  plan,
  period,
  index,
}: {
  plan: PinkPlan;
  period: PinkBillingPeriod;
  index: number;
}) {
  const price = priceForPeriod(plan, period);
  const suffix = periodSuffix(period);
  const isExternal = /^https?:\/\//.test(plan.ctaHref);

  return (
    <article
      className={cn(
        "relative flex flex-col rounded-2xl p-6 sm:p-7 animate-fade-up transition-all duration-300",
        plan.popular
          ? "bg-pink text-pink-foreground border-2 border-pink shadow-[0_20px_50px_-20px_hsl(340_60%_35%/0.5)] md:scale-[1.03] z-10"
          : "card-elevated border border-pink/15 shadow-elevated bg-card"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {plan.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white text-pink text-xs font-label font-semibold shadow-md animate-scale-in">
          Popular
        </span>
      )}

      <header className="mb-5">
        <h3
          className={cn(
            "font-display text-xl sm:text-2xl font-bold mb-1",
            plan.popular ? "text-white" : "text-foreground"
          )}
        >
          {plan.name}
        </h3>
        <p
          className={cn(
            "font-sans text-sm",
            plan.popular ? "text-white/70" : "text-muted-foreground"
          )}
        >
          {plan.tagline}
        </p>
      </header>

      <div className="mb-6">
        <div className="flex items-baseline gap-1 flex-wrap">
          <span
            className={cn(
              "font-display text-3xl sm:text-4xl font-bold tracking-tight",
              plan.popular ? "text-white" : "text-foreground"
            )}
          >
            {formatAud(price)}
          </span>
          <span
            className={cn(
              "text-sm font-medium",
              plan.popular ? "text-white/55" : "text-muted-foreground"
            )}
          >
            {suffix}
          </span>
        </div>
        {period === "yearly" && (
          <p
            className={cn(
              "mt-1.5 text-xs",
              plan.popular ? "text-white/50" : "text-muted-foreground"
            )}
          >
            Billed annually · ~2 months free vs monthly
          </p>
        )}
      </div>

      <ul className="space-y-3 mb-8 flex-grow" aria-label={`${plan.name} features`}>
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check
              className={cn(
                "h-5 w-5 flex-shrink-0 mt-0.5",
                plan.popular ? "text-white/80" : "text-pink"
              )}
              aria-hidden
            />
            <span
              className={cn(
                "font-sans text-sm leading-relaxed",
                plan.popular ? "text-white/90" : "text-muted-foreground"
              )}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Button
        variant={plan.popular ? undefined : "pink"}
        size="lg"
        className={cn(
          "w-full rounded-full transition-transform duration-200 hover:-translate-y-0.5",
          plan.popular && "bg-white text-pink hover:bg-white/90 shadow-md"
        )}
        asChild
      >
        {isExternal ? (
          <a href={plan.ctaHref} target="_blank" rel="noopener noreferrer">
            {plan.ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </a>
        ) : (
          <Link to={plan.ctaHref}>
            {plan.ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </Button>
    </article>
  );
}

export default PinkPricingSection;
