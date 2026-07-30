/**
 * BMS Pro Salon subscription plans for the portfolio pricing showcase.
 * AUD monthly / yearly (yearly = monthly × 10 ≈ 2 months free).
 */

export type PinkBillingPeriod = "monthly" | "yearly";

export interface PinkPlan {
  planKey: string;
  name: string;
  tagline: string;
  /** Monthly price in AUD (whole dollars) */
  monthlyAud: number;
  /** Yearly price in AUD (whole dollars) — typically monthly × 10 */
  yearlyAud: number;
  features: string[];
  popular?: boolean;
  /** Primary CTA */
  ctaLabel: string;
  /** Internal path or external URL */
  ctaHref: string;
}

export const PINK_PLANS: PinkPlan[] = [
  {
    planKey: "STARTER",
    name: "Starter",
    tagline: "Perfect for small salons",
    monthlyAud: 99,
    yearlyAud: 990,
    features: [
      "1 Location",
      "Basic Scheduling",
      "Client Management",
      "Email Support",
    ],
    popular: false,
    ctaLabel: "Get Started",
    ctaHref: "/contact",
  },
  {
    planKey: "PRO",
    name: "Pro",
    tagline: "Most popular choice",
    monthlyAud: 149,
    yearlyAud: 1490,
    features: [
      "3 Locations",
      "Advanced Scheduling",
      "Marketing Tools",
      "Priority Support",
      "Analytics Dashboard",
    ],
    popular: true,
    ctaLabel: "Get Started",
    ctaHref: "/contact",
  },
  {
    planKey: "ENTERPRISE",
    name: "Enterprise",
    tagline: "Best for large organizations",
    monthlyAud: 299,
    yearlyAud: 2990,
    features: [
      "Unlimited locations/scale",
      "SLA & Priority Support",
      "Dedicated Success Manager",
    ],
    popular: false,
    ctaLabel: "Contact Sales",
    ctaHref: "/contact",
  },
];

export function formatAud(amount: number): string {
  return `AU$${amount.toLocaleString("en-AU")}`;
}

export function priceForPeriod(plan: PinkPlan, period: PinkBillingPeriod): number {
  return period === "yearly" ? plan.yearlyAud : plan.monthlyAud;
}

export function periodSuffix(period: PinkBillingPeriod): string {
  return period === "yearly" ? "/year" : "/month";
}
