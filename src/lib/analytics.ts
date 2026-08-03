type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
  }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

/** Load Google Analytics when VITE_GA_MEASUREMENT_ID is set. */
export function initAnalytics() {
  if (!GA_ID || typeof document === "undefined") return;
  if (document.getElementById("ga-gtag")) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID);

  const script = document.createElement("script");
  script.id = "ga-gtag";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

export type CtaClickPayload = {
  /** Visible CTA label */
  label: string;
  /** Page / section where the CTA sits */
  location: string;
  /** Href or route after click */
  destination: string;
};

/** Fire a consistent CTA click event for GA4. */
export function trackCtaClick({ label, location, destination }: CtaClickPayload) {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", "cta_click", {
    cta_label: label,
    cta_location: location,
    cta_destination: destination,
  });
}
