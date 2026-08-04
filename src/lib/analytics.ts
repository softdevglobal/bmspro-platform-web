/**
 * Conversion and engagement events for BMS Pro marketing site.
 *
 * Event catalog (names must stay snake_case and stable):
 * - cta_click            { location, label, destination }
 * - contact_form_start   { product? }
 * - contact_form_submit  { product, success }
 * - product_click        { product, location }
 * - phone_click          { location }
 * - email_click          { location }
 * - pricing_page_view    { page_path }
 * - page_view            { page_path, page_title? }
 * - page_404             { page_path, page_location?, page_search?, page_referrer? }
 *
 * Verification before launch:
 * 1. Set VITE_GA_MEASUREMENT_ID in .env and restart the Vite dev server.
 * 2. Open the site, open DevTools Console - each action logs `[analytics] <event> …`.
 * 3. In GA4 → Admin → DebugView (or Realtime), confirm the same event names arrive.
 * 4. Smoke checklist: hero CTA, product card click, /pricing visit, phone + email
 *    links, contact form first field focus/change, contact form submit.
 * 5. Visit a fake path (e.g. /this-is-not-real) and confirm `page_404` with page_path.
 * 6. Run `npm run check:links` monthly (also scheduled via GitHub Actions).
 */

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

export function trackContactFormStart(product?: string): void {
  trackEvent("contact_form_start", { product: product || undefined });
}

export function trackContactFormSubmit(product: string, success: boolean): void {
  trackEvent("contact_form_submit", {
    product: product || "unspecified",
    success,
  });
}

/** Client-side SPA 404 - use GA4 to see which URLs fail (hosting often still returns 200). */
export function trackPage404(params: {
  page_path: string;
  page_location?: string;
  page_search?: string;
  page_referrer?: string;
}): void {
  trackEvent("page_404", {
    page_path: params.page_path,
    page_location: params.page_location,
    page_search: params.page_search,
    page_referrer: params.page_referrer,
  });
}

export function productKeyFromPath(href: string): string {
  if (href.includes("black")) return "workshop";
  if (href.includes("blue")) return "trade";
  if (href.includes("pink")) return "salon";
  return "unknown";
}
