import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  BluePlan,
  BlueSmsPack,
  BLUE_PLANS,
  BLUE_SMS_TOPUPS,
  formatStaffLabel,
} from "@/lib/bluePlans";
import {
  ArrowRight,
  Check,
  ExternalLink,
  Mail,
  Gift,
  MessageSquare,
  ClipboardList,
  Wrench,
  Inbox,
  Briefcase,
  CalendarDays,
  FileText,
  Users,
  Smartphone,
  Globe,
  CreditCard,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";

const LIVE_PRODUCT_URL = "https://trade.bmspros.com.au";
const SUPPORT_EMAIL = "support@bmspros.com.au";
const INFO_EMAIL = "info@bmspros.com.au";

const includedItems = [
  {
    icon: ClipboardList,
    title: "Core workflow",
    body: "Requests → Quotations → Jobs → Invoices. Modules can be toggled per business.",
  },
  {
    icon: Wrench,
    title: "Services catalog",
    body: "Price, duration, photo, and trade templates so your menu is ready to sell.",
  },
  {
    icon: Inbox,
    title: "Requests",
    body: "Capture work from the office, mobile app, or Book Now page.",
  },
  {
    icon: Briefcase,
    title: "Jobs board",
    body: "Status, duration, and photos — keep every job visible from request to done.",
  },
  {
    icon: CalendarDays,
    title: "Calendar & capacity",
    body: "Working hours plus Book Now slots so the diary matches real capacity.",
  },
  {
    icon: FileText,
    title: "Quotes & invoices",
    body: "PDFs plus reusable priced line items for fast, consistent paperwork.",
  },
  {
    icon: Users,
    title: "Customers",
    body: "One record reused across requests, quotes, invoices, and SMS.",
  },
  {
    icon: Smartphone,
    title: "Staff & mobile",
    body: "Roster, attendance, leave, and timesheets — staff work from the mobile app.",
  },
  {
    icon: MessageSquare,
    title: "SMS",
    body: "Credits on some plans; top-up packs available when you need more.",
  },
  {
    icon: Globe,
    title: "Online booking",
    body: "Public page with business slug, hours, and service areas.",
  },
  {
    icon: CreditCard,
    title: "Plans & billing",
    body: "AUD via Stripe — trials, upgrades, and downgrades when you need them.",
  },
  {
    icon: Bell,
    title: "Ops visibility",
    body: "Notifications, announcements, activity history, and dashboards.",
  },
];

export interface BluePricingSectionProps {
  plans?: BluePlan[];
  /** Standalone SMS top-ups (secondary). Bundled SMS still shows on each plan card. */
  smsTopups?: BlueSmsPack[];
  /** Full = brand hero + plans. Embedded = plans onward (for Product Trade page). */
  variant?: "full" | "embedded";
  /** Pull hero under site header — only for first section on a page */
  offsetHeader?: boolean;
  /** Extra top space when a floating product picker overlays the hero */
  overlayPicker?: boolean;
  className?: string;
}

export function BluePricingSection({
  plans = BLUE_PLANS,
  smsTopups = BLUE_SMS_TOPUPS,
  variant = "full",
  offsetHeader = true,
  overlayPicker = false,
  className,
}: BluePricingSectionProps) {
  return (
    <div className={cn(className)}>
      {variant === "full" && (
        <section className={cn("relative bg-background", offsetHeader && "-mt-16")}>
          <div
            className={cn(
              "relative min-h-[min(60vh,520px)] sm:min-h-[min(78vh,680px)] flex items-center overflow-hidden",
              offsetHeader && "pt-16"
            )}
          >
            <div className="absolute inset-0" aria-hidden>
              <img
                src="/products/blue/jobs.jpg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover scale-105"
              />
              <div className="absolute inset-0 bg-[hsl(210_45%_12%/0.72)]" />
              <div className="absolute inset-0 bg-gradient-to-b from-[hsl(210_50%_18%/0.45)] via-[hsl(210_40%_14%/0.4)] to-[hsl(210_45%_10%/0.9)]" />
              <div
                className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
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
                    src="/products/blue/icon.png"
                    alt=""
                    className="h-10 w-10 rounded-lg ring-1 ring-white/25"
                  />
                  <span className="font-label text-xs font-semibold tracking-[0.2em] uppercase text-white/55">
                    BMS PRO TRADE
                  </span>
                </div>

                <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-4 animate-fade-up delay-100 leading-[1.02]">
                  BMS Pro Trade
                </h1>

                <p className="font-sans text-base sm:text-lg text-white/70 max-w-xl mx-auto mb-8 animate-fade-up delay-200 leading-relaxed">
                  Job scheduling &amp; operations for trades, contractors, and service businesses.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 animate-fade-up delay-300">
                  <Button
                    size="xl"
                    className="rounded-full w-full sm:w-auto bg-white text-[hsl(210_45%_14%)] hover:bg-white/90 shadow-lg transition-transform duration-200 hover:-translate-y-0.5"
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
      )}

      {/* Plans */}
      <section
        id="blue-plans"
        className={cn(
          "section-padding scroll-mt-20",
          variant === "full" ? "bg-secondary/30" : "bg-secondary/30 border-t border-border/40"
        )}
      >
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center mb-12 lg:mb-14">
            <span className="eyebrow inline-flex rounded-full border border-border bg-background/80 px-3 py-1 text-blue">
              Subscription plans
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-3 tracking-tight">
              Plans for trades on the tools
            </h2>
            <p className="font-sans text-lg text-muted-foreground">
              Live packages from BMS Pro Trade — AUD via Stripe. Staff limits and trials as published.
            </p>
          </div>

          <div
            className={cn(
              "grid gap-5 lg:gap-6 mx-auto",
              plans.length === 1 ? "max-w-md md:grid-cols-1" : "max-w-4xl md:grid-cols-2"
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

          {smsTopups.length > 0 && (
            <div className="mt-10 max-w-4xl mx-auto">
              <div className="rounded-2xl border border-dashed border-blue/25 bg-blue-light/40 px-5 py-5 sm:px-6 sm:py-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue/10 text-blue">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-label text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      Optional add-on
                    </p>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                      SMS top-ups
                    </h3>
                    <p className="font-sans text-sm text-muted-foreground mb-4 leading-relaxed">
                      Extra SMS packs when plan credits run low — separate from subscription tiers.
                    </p>
                    <ul className="space-y-3">
                      {smsTopups.map((pack) => (
                        <li
                          key={pack.name}
                          className="rounded-xl border border-border bg-card px-4 py-3"
                        >
                          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-2">
                            <span className="font-medium text-foreground">{pack.name}</span>
                            <span className="text-border">·</span>
                            <span className="text-sm text-muted-foreground">
                              {pack.quota} messages
                            </span>
                            <span className="text-border">·</span>
                            <span className="font-label font-semibold text-foreground">
                              {pack.priceLabel}
                            </span>
                          </div>
                          <ul className="flex flex-wrap gap-2">
                            {pack.features.map((f) => (
                              <li
                                key={f}
                                className="text-xs rounded-full border border-border px-2.5 py-1 text-muted-foreground"
                              >
                                {f}
                              </li>
                            ))}
                          </ul>
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

      {/* What's included + credibility — full showcase only (product page already covers modules) */}
      {variant === "full" && (
        <>
          <section className="section-padding bg-background">
            <div className="container-wide">
              <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-12">
                <span className="eyebrow inline-flex rounded-full border border-border bg-secondary/60 px-3 py-1 text-muted-foreground">
                  Across Trade
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-4 mb-3 tracking-tight">
                  What&apos;s included
                </h2>
                <p className="font-sans text-muted-foreground">
                  Trade operations toolkit — capacity and SMS credits differ by subscription tier.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 max-w-6xl mx-auto">
                {includedItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="flex gap-4 p-5 sm:p-6 rounded-2xl border border-border/60 bg-card animate-fade-up"
                      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue/10 text-blue">
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
                src="/products/blue/jobs.jpg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover scale-110 blur-sm"
              />
              <div className="absolute inset-0 bg-[hsl(210_45%_12%/0.78)]" />
              <div className="absolute inset-0 bg-gradient-to-b from-[hsl(210_50%_20%/0.5)] via-[hsl(210_45%_14%/0.6)] to-[hsl(210_45%_10%/0.92)]" />
            </div>

            <div className="container-wide relative section-padding">
              <div className="max-w-3xl mx-auto text-center">
                <img
                  src="/products/blue/icon.png"
                  alt=""
                  className="h-12 w-12 rounded-2xl mb-6 ring-1 ring-white/20 mx-auto animate-fade-up"
                />
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight animate-fade-up delay-100">
                Trusted by Australian workshops ⭐⭐⭐⭐⭐
                </h2>
                <p className="font-sans text-lg text-white/70 max-w-xl mx-auto mb-8 animate-fade-up delay-200">
                  BMS Pro Trade is a Softdev Global / BMS Pros product — built for Australian trades and
                  field service businesses.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mb-10 animate-fade-up delay-300">
                  <Button
                    size="xl"
                    className="rounded-full bg-white text-[hsl(210_45%_14%)] hover:bg-white/90 shadow-lg transition-transform duration-200 hover:-translate-y-0.5"
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
                    <Link to="/products/blue">Product overview</Link>
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
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function PlanCard({ plan, index }: { plan: BluePlan; index: number }) {
  const ctaLabel = plan.ctaLabel ?? "Subscribe";
  const ctaHref = plan.ctaHref ?? LIVE_PRODUCT_URL;
  const isExternal = /^https?:\/\//.test(ctaHref);

  return (
    <article
      className={cn(
        "relative flex flex-col rounded-2xl p-5 sm:p-7 lg:p-8 animate-fade-up transition-all duration-300 pt-8",
        plan.popular
          ? "bg-blue text-blue-foreground border-2 border-blue shadow-[0_20px_50px_-20px_hsl(210_65%_30%/0.55)] sm:scale-[1.02] z-10"
          : "card-elevated border border-blue/20 shadow-elevated bg-card ring-1 ring-blue/5"
      )}
      style={{ animationDelay: `${index * 120}ms` }}
    >
      {plan.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white text-blue text-xs font-label font-semibold shadow-md animate-scale-in">
          Popular
        </span>
      )}

      <div className="mb-5">
        <p
          className={cn(
            "font-label text-[10px] font-bold uppercase tracking-[0.18em] mb-2",
            plan.popular ? "text-white/50" : "text-blue"
          )}
        >
          {plan.planKey}
        </p>
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
            plan.popular ? "text-white/70" : "text-muted-foreground"
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
            plan.popular ? "text-white/55" : "text-muted-foreground"
          )}
        >
          {plan.billingLabel}
        </p>
      </div>

      <div
        className={cn(
          "mb-4 rounded-xl p-3",
          plan.popular ? "bg-white/10" : "bg-blue-light/60"
        )}
      >
        <p
          className={cn(
            "text-[10px] font-label font-semibold uppercase tracking-wider mb-0.5",
            plan.popular ? "text-white/50" : "text-muted-foreground"
          )}
        >
          Staff
        </p>
        <p
          className={cn(
            "font-display text-base font-bold",
            plan.popular ? "text-white" : "text-foreground"
          )}
        >
          {formatStaffLabel(plan.staff)}
        </p>
      </div>

      {plan.trialDays != null && plan.trialDays > 0 && (
        <div
          className={cn(
            "mb-5 inline-flex items-center gap-1.5 self-start rounded-full px-3 py-1 text-xs font-label font-semibold",
            plan.popular ? "bg-white/15 text-white" : "bg-blue-light text-blue"
          )}
        >
          <Gift className="h-3.5 w-3.5" />
          {plan.trialDays}-day free trial
        </div>
      )}

      <ul className="space-y-3 mb-5 flex-grow">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check
              className={cn(
                "h-5 w-5 flex-shrink-0 mt-0.5",
                plan.popular ? "text-white/75" : "text-blue"
              )}
            />
            <span
              className={cn(
                "font-sans text-sm leading-relaxed",
                plan.popular ? "text-white/85" : "text-muted-foreground"
              )}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {plan.bundledSms && (
        <div
          className={cn(
            "mb-6 rounded-xl border p-4",
            plan.popular
              ? "border-white/20 bg-white/8"
              : "border-blue/15 bg-blue-light/40"
          )}
        >
          <div className="flex items-start gap-3 mb-3">
            <MessageSquare
              className={cn(
                "h-4 w-4 mt-0.5 shrink-0",
                plan.popular ? "text-white/70" : "text-blue"
              )}
            />
            <div className="min-w-0">
              <p
                className={cn(
                  "font-label text-[10px] font-semibold uppercase tracking-wider mb-0.5",
                  plan.popular ? "text-white/45" : "text-muted-foreground"
                )}
              >
                Bundled SMS
              </p>
              <p
                className={cn(
                  "font-display text-sm font-semibold",
                  plan.popular ? "text-white" : "text-foreground"
                )}
              >
                {plan.bundledSms.name}
              </p>
              <p
                className={cn(
                  "text-xs mt-0.5",
                  plan.popular ? "text-white/55" : "text-muted-foreground"
                )}
              >
                {plan.bundledSms.quota} messages · {plan.bundledSms.priceLabel}
              </p>
            </div>
          </div>
          <ul className="space-y-1.5 pl-7">
            {plan.bundledSms.features.map((f) => (
              <li
                key={f}
                className={cn(
                  "text-xs leading-relaxed list-disc",
                  plan.popular ? "text-white/70" : "text-muted-foreground"
                )}
              >
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Button
        variant={plan.popular ? undefined : "blue"}
        size="lg"
        className={cn(
          "w-full rounded-full transition-transform duration-200 hover:-translate-y-0.5",
          plan.popular && "bg-white text-blue hover:bg-white/90 shadow-md"
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

export default BluePricingSection;
