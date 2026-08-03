import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  getGaMeasurementId,
  trackEvent,
  trackPageView,
} from "@/lib/analytics";

function loadGoogleAnalytics(measurementId: string) {
  if (document.getElementById("ga-gtag")) return;

  window.dataLayer = window.dataLayer || [];
  // GA expects the Arguments object (same as the official snippet).
  window.gtag = function gtag(..._args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments as unknown as Record<string, unknown>);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    send_page_view: false,
    // Makes events show up immediately in GA4 Admin → DebugView during local testing.
    ...(import.meta.env.DEV ? { debug_mode: true } : {}),
  });

  const script = document.createElement("script");
  script.id = "ga-gtag";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}

/** Loads GA (when configured) and records SPA page views + pricing visits. */
export function Analytics() {
  const location = useLocation();
  const measurementId = getGaMeasurementId();

  useEffect(() => {
    if (measurementId) {
      loadGoogleAnalytics(measurementId);
    }
  }, [measurementId]);

  useEffect(() => {
    const path = `${location.pathname}${location.search}${location.hash}`;
    trackPageView(path);

    if (location.pathname === "/pricing") {
      trackEvent("pricing_page_view", { page_path: path });
    }
  }, [location.pathname, location.search, location.hash]);

  return null;
}
