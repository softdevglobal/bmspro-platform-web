import { useEffect } from "react";
import { initAnalytics } from "@/lib/analytics";

/** Boots GA4 once when a measurement ID is configured. */
export function Analytics() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return null;
}
