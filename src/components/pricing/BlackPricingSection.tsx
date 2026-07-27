import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  BlackPlan,
  SmsPack,
  BLACK_PLANS,
  PLACEHOLDER_SMS_PACKS,
  formatBranchStaffLabel,
} from "@/lib/blackPlans";
import {
  ArrowRight,
  Check,
  ExternalLink,
  Smartphone,
  Mail,
  Wrench,
  CalendarCheck,
  CreditCard,
  MessageSquare,
  Building2,
  Gift,
  Headphones,
} from "lucide-react";
import { cn } from "@/lib/utils";

const LIVE_PRODUCT_URL = "https://black.bmspros.com.au";
const BOOKING_ENGINE_URL = "https://black.bmspros.com.au/book-now";
const SUPPORT_EMAIL = "support@bmspros.com.au";
const PLAY_STORE_QUERY = "bmspro.black";

const includedItems = [
  {
    icon: CalendarCheck,
    title: "Online booking",
    body: "Customers book 24/7 — SMS confirmations and reminders keep the workshop informed.",
  },
  {
    icon: Headphones,
    title: "Optional front desk",
    body: "Mechanic Pro Front Desk adds a human receptionist who answers calls and books jobs.",
  },
  {
    icon: Building2,
    title: "Staff & branch limits",
    body: "Both public plans include 1 branch and up to 5 staff — clear capacity for a busy bay.",
  },
  {
    icon: CreditCard,
    title: "Stripe billing in AUD",
    body: "Monthly (28-day) or weekly (7-day) renewal. Start on trial, then continue paid.",
  },
];

export interface BlackPricingSectionProps {
  /** Live plans — defaults to active Black public packages */
  plans?: BlackPlan[];
  /** Optional SMS add-ons shown below subscription tiers */
  smsPacks?: SmsPack[];
  /** Pull hero under site header — disable when a page chrome sits above */
  offsetHeader?: boolean;
  /** Extra top space when a floating product picker overlays the hero */
  overlayPicker?: boolean;
  className?: string;
}

export function BlackPricingSection({
  plans = BLACK_PLANS,
  smsPacks = PLACEHOLDER_SMS_PACKS,
  offsetHeader = true,
  overlayPicker = false,
  className,
}: BlackPricingSectionProps) {
  return (
    <div className={cn(className)}>
      {/* 1. Product intro — brand-first */}
      <section className={cn("relative bg-background", offsetHeader && "-mt-16")}>
        <div
          className={cn(
            "relative min-h-[min(78vh,680px)] flex items-center overflow-hidden",
            offsetHeader && "pt-16"
          )}
        >
          <div className="absolute inset-0" aria-hidden>
            <img
              src="/products/black/hero.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-[hsl(220_22%_6%/0.72)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_22%_6%/0.5)] via-[hsl(220_22%_6%/0.4)] to-[hsl(220_22%_6%/0.88)]" />
            {/* Subtle steel grain */}
            <div
              className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
            />
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
                  src="/products/black/icon.png"
                  alt=""
                  className="h-10 w-10 rounded-lg ring-1 ring-white/25"
                />
                <span className="font-label text-xs font-semibold tracking-[0.2em] uppercase text-white/55">
                  BMS PRO WORKSHOP
                </span>
              </div>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 animate-fade-up delay-100 leading-[1.02]">
                BMS Pro Black
              </h1>

              <p className="font-sans text-base sm:text-lg text-white/70 max-w-xl mx-auto mb-8 animate-fade-up delay-200 leading-relaxed">
                Workshop &amp; mechanic management for Australian workshops.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 animate-fade-up delay-300">
                <Button
                  size="xl"
                  className="rounded-full w-full sm:w-auto bg-white text-[hsl(220_22%_10%)] hover:bg-white/90 shadow-lg transition-transform duration-200 hover:-translate-y-0.5"
                  asChild
                >
                  <a href={LIVE_PRODUCT_URL} target="_blank" rel="noopener noreferrer">
                    View live product
                    <ExternalLink className="h-5 w-5" />
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

      {/* 2. Subscription plans */}
      <section id="black-plans" className="section-padding bg-secondary/30 scroll-mt-20">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center mb-12 lg:mb-14">
            <span className="eyebrow inline-flex rounded-full border border-border bg-background/80 px-3 py-1 text-muted-foreground">
              Subscription plans
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-3 tracking-tight">
              Plans built for the bay
            </h2>
            <p className="font-sans text-lg text-muted-foreground">
              Two live packages — online booking only, or front desk plus software. AUD via Stripe.
            </p>
          </div>

          <div
            className={cn(
              "grid gap-5 lg:gap-6 max-w-4xl mx-auto",
              plans.length === 1 ? "md:grid-cols-1 max-w-md" : "md:grid-cols-2"
            )}
          >
            {plans.map((plan, index) => (
              <PlanCard key={plan.planKey} plan={plan} index={index} />
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Need help choosing a plan?{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="font-semibold text-foreground underline-offset-4 hover:underline"
            >
              Contact our support team
            </a>
          </p>

          {/* SMS add-ons — secondary */}
          {smsPacks.length > 0 && (
            <div className="mt-10 max-w-4xl mx-auto">
              <div className="rounded-2xl border border-dashed border-border/80 bg-background/60 px-5 py-5 sm:px-6 sm:py-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-product-black/8 text-product-black">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-label text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      Optional add-on
                    </p>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                      SMS packs
                    </h3>
                    <p className="font-sans text-sm text-muted-foreground mb-4 leading-relaxed">
                      Text customers and staff as needed. SMS packs are separate from subscription
                      tiers — top up when credits run low.
                    </p>
                    <ul className="flex flex-wrap gap-3">
                      {smsPacks.map((pack) => (
                        <li
                          key={pack.name}
                          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground"
                        >
                          <span className="font-medium text-foreground">{pack.name}</span>
                          <span className="text-border">·</span>
                          <span>{pack.credits} credits</span>
                          <span className="text-border">·</span>
                          <span className="font-label font-semibold text-foreground">
                            {pack.priceLabel}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. What's included */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-12">
            <span className="eyebrow inline-flex rounded-full border border-border bg-secondary/60 px-3 py-1 text-muted-foreground">
              Across all plans
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-4 mb-3 tracking-tight">
              What&apos;s included
            </h2>
            <p className="font-sans text-muted-foreground">
              The same workshop toolkit — capacity and limits differ by subscription tier.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 lg:gap-5 max-w-4xl mx-auto">
            {includedItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex gap-4 p-5 sm:p-6 rounded-2xl border border-border/60 bg-card animate-fade-up"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-product-black/10 text-product-black">
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

      {/* 4. Proof / credibility */}
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0" aria-hidden>
          <img
            src="/products/black/hero.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover scale-110 blur-sm"
          />
          <div className="absolute inset-0 bg-[hsl(220_22%_6%/0.78)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_22%_6%/0.55)] via-[hsl(220_22%_6%/0.6)] to-[hsl(220_22%_6%/0.9)]" />
        </div>

        <div className="container-wide relative section-padding">
          <div className="max-w-3xl mx-auto text-center">
            <img
              src="/products/black/icon.png"
              alt=""
              className="h-12 w-12 rounded-2xl mb-6 ring-1 ring-white/20 mx-auto animate-fade-up"
            />
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight animate-fade-up delay-100">
              Live and in production
            </h2>
            <p className="font-sans text-lg text-white/70 max-w-xl mx-auto mb-8 animate-fade-up delay-200">
              BMS Pro Black is a Softdev Global / BMS Pros product — serving Australian auto
              workshops today.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mb-10 animate-fade-up delay-300">
              <Button
                size="xl"
                className="rounded-full bg-white text-[hsl(220_22%_10%)] hover:bg-white/90 shadow-lg transition-transform duration-200 hover:-translate-y-0.5"
                asChild
              >
                <a href={LIVE_PRODUCT_URL} target="_blank" rel="noopener noreferrer">
                  Open live portal
                  <ExternalLink className="h-5 w-5" />
                </a>
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="rounded-full border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm transition-transform duration-200 hover:-translate-y-0.5"
                asChild
              >
                <a href={BOOKING_ENGINE_URL} target="_blank" rel="noopener noreferrer">
                  Try booking engine
                </a>
              </Button>
            </div>

            <ul className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-white/65">
              <li className="inline-flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-white/45" />
                <span>
                  Mobile app on Play Store:{" "}
                  <span className="text-white/90 font-medium">{PLAY_STORE_QUERY}</span>
                </span>
              </li>
              <li className="hidden sm:inline text-white/25" aria-hidden>
                ·
              </li>
              <li className="inline-flex items-center gap-2">
                <Mail className="h-4 w-4 text-white/45" />
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="text-white/90 font-medium underline-offset-4 hover:underline"
                >
                  {SUPPORT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

function PlanCard({ plan, index }: { plan: BlackPlan; index: number }) {
  const ctaLabel = plan.ctaLabel ?? "Subscribe";
  const ctaHref = plan.ctaHref ?? LIVE_PRODUCT_URL;
  const isExternal = /^https?:\/\//.test(ctaHref);

  return (
    <article
      className={cn(
        "relative flex flex-col rounded-2xl p-7 sm:p-8 animate-fade-up transition-all duration-300",
        plan.popular
          ? "bg-product-black text-product-black-foreground border-2 border-product-black shadow-[0_20px_50px_-20px_hsl(220_18%_8%/0.55)] sm:scale-[1.02] z-10"
          : "card-elevated border border-border/60 shadow-elevated bg-card"
      )}
      style={{ animationDelay: `${index * 120}ms` }}
    >
      {plan.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white text-product-black text-xs font-label font-semibold shadow-md animate-scale-in">
          Popular
        </span>
      )}

      <div className="mb-5">
        <h3
          className={cn(
            "font-display text-xl sm:text-2xl font-bold mb-2 leading-snug",
            plan.popular ? "text-white" : "text-foreground"
          )}
        >
          {plan.name}
        </h3>
        <p
          className={cn(
            "font-sans text-sm leading-relaxed",
            plan.popular ? "text-white/65" : "text-muted-foreground"
          )}
        >
          {plan.description}
        </p>
      </div>

      <div className="mb-5">
        <span
          className={cn(
            "font-display text-3xl sm:text-4xl font-bold tracking-tight",
            plan.popular ? "text-white" : "text-foreground"
          )}
        >
          {plan.priceLabel}
        </span>
        <p
          className={cn(
            "mt-1 text-sm",
            plan.popular ? "text-white/50" : "text-muted-foreground"
          )}
        >
          {plan.billingLabel}
        </p>
      </div>

      <dl
        className={cn(
          "grid grid-cols-2 gap-3 mb-4 rounded-xl p-3",
          plan.popular ? "bg-white/8" : "bg-secondary/50"
        )}
      >
        <div>
          <dt
            className={cn(
              "text-[10px] font-label font-semibold uppercase tracking-wider mb-0.5",
              plan.popular ? "text-white/45" : "text-muted-foreground"
            )}
          >
            Branches
          </dt>
          <dd
            className={cn(
              "font-display text-base font-bold",
              plan.popular ? "text-white" : "text-foreground"
            )}
          >
            {formatBranchStaffLabel("branch", plan.branches)}
          </dd>
        </div>
        <div>
          <dt
            className={cn(
              "text-[10px] font-label font-semibold uppercase tracking-wider mb-0.5",
              plan.popular ? "text-white/45" : "text-muted-foreground"
            )}
          >
            Staff
          </dt>
          <dd
            className={cn(
              "font-display text-base font-bold",
              plan.popular ? "text-white" : "text-foreground"
            )}
          >
            {formatBranchStaffLabel("staff", plan.staff)}
          </dd>
        </div>
      </dl>

      {plan.trialDays != null && plan.trialDays > 0 && (
        <div
          className={cn(
            "mb-5 inline-flex items-center gap-1.5 self-start rounded-full px-3 py-1 text-xs font-label font-semibold",
            plan.popular
              ? "bg-white/15 text-white"
              : "bg-teal-light text-teal"
          )}
        >
          <Gift className="h-3.5 w-3.5" />
          {plan.trialDays}-day free trial
        </div>
      )}

      <ul className="space-y-3 mb-8 flex-grow">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check
              className={cn(
                "h-5 w-5 flex-shrink-0 mt-0.5",
                plan.popular ? "text-white/70" : "text-teal"
              )}
            />
            <span
              className={cn(
                "font-sans text-sm leading-relaxed",
                plan.popular ? "text-white/80" : "text-muted-foreground"
              )}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Button
        variant={plan.popular ? undefined : "black"}
        size="lg"
        className={cn(
          "w-full rounded-full transition-transform duration-200 hover:-translate-y-0.5",
          plan.popular && "bg-white text-product-black hover:bg-white/90 shadow-md"
        )}
        asChild
      >
        {isExternal ? (
          <a href={ctaHref} target="_blank" rel="noopener noreferrer">
            {ctaLabel}
            <ExternalLink className="h-4 w-4" />
          </a>
        ) : (
          <Link to={ctaHref}>
            {ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </Button>
    </article>
  );
}

export default BlackPricingSection;
