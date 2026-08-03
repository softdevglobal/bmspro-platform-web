/**
 * Canonical public routes for the marketing SPA.
 * Keep in sync with `src/App.tsx` and `public/sitemap.xml`.
 * Used by the monthly broken-link check (`npm run check:links`).
 */
export const SITE_ROUTES = [
  "/",
  "/products",
  "/products/pink",
  "/products/blue",
  "/products/black",
  "/pricing",
  "/contact",
  "/privacy",
  "/terms",
  "/about",
  "/careers",
  "/blog",
  "/cookies",
] as const;

export type SiteRoute = (typeof SITE_ROUTES)[number];

export const SITE_ROUTE_SET = new Set<string>(SITE_ROUTES);
