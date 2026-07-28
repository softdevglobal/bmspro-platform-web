/**
 * BMS Pro Blue (TRADE) subscription plans for the portfolio pricing showcase.
 * Sourced from live public packages (trade.bmspros.com.au /api/packages/public).
 * Extend via BluePricingSection `plans` prop — do not invent tiers.
 */

export type BillingCycle = "weekly" | "monthly" | "custom";

/** SMS pack bundled with a subscription or sold as a top-up */
export interface BlueSmsPack {
  name: string;
  quota: number | string;
  priceLabel: string;
  features: string[];
}

export interface BluePlan {
  /** Stable key from Firestore / product catalog, e.g. SOLO */
  planKey: string;
  name: string;
  description: string;
  /** Display price, e.g. "AU$99/28-day" */
  priceLabel: string;
  /** Human billing line, e.g. "Weekly • 7-day renewal" */
  billingLabel: string;
  billingCycle: BillingCycle;
  /** Renewal period in days when known */
  validityDays?: number;
  staff: number | "Unlimited";
  branches?: number | "Unlimited";
  features: string[];
  popular?: boolean;
  trialDays?: number;
  /** SMS included with this subscription (if any) */
  bundledSms?: BlueSmsPack;
  ctaLabel?: string;
  ctaHref?: string;
}

const LIVE_SUBSCRIBE_URL = "https://trade.bmspros.com.au";

/** Active public plans for BMS Pro Blue (TRADE) */
export const BLUE_PLANS: BluePlan[] = [
  {
    planKey: "SOLO",
    name: "1 day trial and 7 day billing",
    description: "1 day trial and 7 day billing",
    priceLabel: "AU$99/28-day",
    billingLabel: "Weekly • 7-day renewal",
    billingCycle: "weekly",
    validityDays: 7,
    staff: 1,
    features: [
      "Unlimited Job Cards",
      "Invoice & Quotation",
      "Inventory Management",
      "Customer Management",
      "Reporting & Analytics",
    ],
    popular: false,
    trialDays: 1,
    bundledSms: {
      name: "test 100 sms",
      quota: 100,
      priceLabel: "AU$29",
      features: [
        "100 SMS messages",
        "Transactional notifications",
        "Customer alerts",
      ],
    },
    ctaLabel: "Subscribe",
    ctaHref: LIVE_SUBSCRIBE_URL,
  },
];

/** Optional standalone SMS top-ups — only populate when real packs are provided */
export const BLUE_SMS_TOPUPS: BlueSmsPack[] = [];

export function formatStaffLabel(value: number | "Unlimited"): string {
  if (value === "Unlimited") return "Unlimited staff";
  return value === 1 ? "1 Staff" : `${value} Staff`;
}
