/**
 * BMS Pro Black subscription plans for the portfolio pricing showcase.
 * Sourced from live public packages (black.bmspros.com.au).
 * Swap or extend via BlackPricingSection `plans` prop when Firestore sync is wired.
 */

export type BillingCycle = "weekly" | "monthly" | "custom";

export interface BlackPlan {
  /** Stable key from Firestore / product catalog */
  planKey: string;
  name: string;
  /** Short positioning line shown under the plan name */
  description: string;
  /** Display price, e.g. "AU$99/28-day" */
  priceLabel: string;
  /** Human billing line, e.g. "Monthly • 28-day renewal" */
  billingLabel: string;
  branches: number | "Unlimited";
  staff: number | "Unlimited";
  features: string[];
  popular?: boolean;
  trialDays?: number;
  billingCycle: BillingCycle;
  /** Primary CTA label */
  ctaLabel?: string;
  /** Where Subscribe should send visitors */
  ctaHref?: string;
}

/** Optional SMS add-ons — visually secondary to subscription tiers */
export interface SmsPack {
  name: string;
  credits: number | string;
  priceLabel: string;
}

const LIVE_SUBSCRIBE_URL = "https://black.bmspros.com.au";

/** Active public plans for BMS Pro Black */
export const BLACK_PLANS: BlackPlan[] = [
  {
    planKey: "PRO_WORKSHOP_ONLINE",
    name: "PRO Workshop online booking",
    description:
      "Professional online booking for mechanic workshops — without paying for a receptionist.",
    priceLabel: "AU$99/28-day",
    billingLabel: "Monthly • 28-day renewal",
    branches: 1,
    staff: 5,
    features: [
      "24/7 online booking for your workshop",
      "SMS confirmations and reminders",
      "Job progress updates for customers",
      "Reduce missed calls and no-shows",
      "Ideal for workshops that want online-only without a front desk",
    ],
    popular: true,
    trialDays: 28,
    billingCycle: "monthly",
    ctaLabel: "Subscribe",
    ctaHref: LIVE_SUBSCRIBE_URL,
  },
  {
    planKey: "MECHANIC_PRO_FRONT_DESK",
    name: "Mechanic Pro Front Desk",
    description:
      "Human receptionist service plus workshop software — stay on the tools while we run the desk.",
    priceLabel: "AU$399/7-day",
    billingLabel: "Weekly • 7-day renewal",
    branches: 1,
    staff: 5,
    features: [
      "Receptionist answers calls when you're busy",
      "Bookings taken and managed for you",
      "Additional work approvals while the vehicle is on the hoist",
      "Customer pickup calls handled",
      "Software for bookings, staff attendance, approvals, notes, and daily activity",
    ],
    popular: false,
    trialDays: 14,
    billingCycle: "weekly",
    ctaLabel: "Subscribe",
    ctaHref: LIVE_SUBSCRIBE_URL,
  },
];

/** @deprecated Use BLACK_PLANS — kept as alias for earlier scaffold imports */
export const PLACEHOLDER_BLACK_PLANS = BLACK_PLANS;

export const PLACEHOLDER_SMS_PACKS: SmsPack[] = [];

export function formatLimit(value: number | "Unlimited"): string {
  return value === "Unlimited" ? "Unlimited" : String(value);
}

export function formatBranchStaffLabel(
  kind: "branch" | "staff",
  value: number | "Unlimited"
): string {
  if (value === "Unlimited") {
    return kind === "branch" ? "Unlimited branches" : "Unlimited staff";
  }
  const noun =
    kind === "branch"
      ? value === 1
        ? "Branch"
        : "Branches"
      : value === 1
        ? "Staff"
        : "Staff";
  return `${value} ${noun}`;
}
