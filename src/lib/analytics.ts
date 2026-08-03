/** Conversion and engagement events for BMS Pro marketing site. */

export type AnalyticsEventName =
  | "cta_click"
  | "contact_form_start"
  | "contact_form_submit"
  | "product_click"
  | "phone_click"
  | "email_click"
  | "pricing_page_view"
  | "page_view"
  | "page_404";

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

export function isAnalyticsConfigured(): boolean {
  return Boolean(GA_ID);
}

export function getGaMeasurementId(): string | undefined {
  return GA_ID || undefined;
}

/** Fire a named conversion / engagement event. Safe to call before GA loads. */
export function trackEvent(name: AnalyticsEventName, params: EventParams = {}): void {
  const cleaned = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined)
  );

  if (import.meta.env.DEV) {
    console.info("[analytics]", name, cleaned);
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...cleaned });

  if (typeof window.gtag === "function") {
    window.gtag("event", name, cleaned);
  }
}

export function trackPageView(path: string, title?: string): void {
  trackEvent("page_view", { page_path: path, page_title: title || document.title });

  if (typeof window.gtag === "function" && GA_ID) {
    window.gtag("config", GA_ID, {
      page_path: path,
      page_title: title || document.title,
    });
  }
}

export function trackCtaClick(location: string, label: string, destination: string): void {
  trackEvent("cta_click", { location, label, destination });
}

export function trackProductClick(product: string, location: string): void {
  trackEvent("product_click", { product, location });
}

export function trackPhoneClick(location: string): void {
  trackEvent("phone_click", { location });
}

export function trackEmailClick(location: string): void {
  trackEvent("email_click", { location });
}

export function productKeyFromPath(href: string): string {
  if (href.includes("black")) return "workshop";
  if (href.includes("blue")) return "trade";
  if (href.includes("pink")) return "salon";
  return "unknown";
}
