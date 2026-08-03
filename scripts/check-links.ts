/**
 * Broken-link / route health check for BMS Pro marketing site.
 *
 * What it does:
 * 1. Confirms every known route appears in sitemap.xml (and vice versa for public pages).
 * 2. Scans src for internal `to=` / `href=` paths and flags unknown routes.
 * 3. Optionally HTTP-checks live sitemap URLs (hosting reachability).
 *
 * Note: This is an SPA — unknown paths still return HTTP 200 + index.html.
 * Client 404s are tracked in GA4 as `page_404`. Review those events monthly too.
 *
 * Usage:
 *   npm run check:links
 *   CHECK_LINKS_BASE_URL=https://www.bmspros.com.au npm run check:links
 *   CHECK_LINKS_SKIP_LIVE=1 npm run check:links
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SITE_ROUTES, SITE_ROUTE_SET } from "../src/lib/siteRoutes.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const sitemapPath = path.join(root, "public", "sitemap.xml");
const srcDir = path.join(root, "src");

const BASE_URL = (process.env.CHECK_LINKS_BASE_URL || "https://www.bmspros.com.au").replace(
  /\/$/,
  ""
);
const SKIP_LIVE = process.env.CHECK_LINKS_SKIP_LIVE === "1";

const INTERNAL_LINK_RE =
  /(?:to|href)\s*=\s*["'](\/[^"'#?]*)|href:\s*["'](\/[^"'#?]*)/g;

type Finding = { severity: "error" | "warn"; message: string };

const findings: Finding[] = [];

function walk(dir: string, files: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === "dist") continue;
      walk(full, files);
    } else if (/\.(tsx?|jsx?)$/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

function normalizePath(raw: string): string {
  if (!raw || raw.startsWith("//") || raw.startsWith("mailto:") || raw.startsWith("tel:")) {
    return "";
  }
  if (raw.startsWith("http")) return "";
  // Ignore static assets
  if (/\.(png|jpe?g|webp|svg|gif|ico|pdf|css|js|map|xml|txt)$/i.test(raw)) return "";
  if (raw.startsWith("/products/") && raw.includes(".")) return "";
  const bare = raw.split("?")[0].split("#")[0];
  if (bare.length > 1 && bare.endsWith("/")) return bare.slice(0, -1);
  return bare || "/";
}

function parseSitemapLocs(): string[] {
  const xml = fs.readFileSync(sitemapPath, "utf8");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  return locs;
}

function pathFromLoc(loc: string): string {
  try {
    const u = new URL(loc);
    const p = u.pathname.replace(/\/$/, "") || "/";
    return p;
  } catch {
    return loc;
  }
}

function checkSitemapVsRoutes() {
  const locs = parseSitemapLocs();
  const sitemapPaths = new Set(locs.map(pathFromLoc));

  for (const route of SITE_ROUTES) {
    if (!sitemapPaths.has(route)) {
      findings.push({
        severity: "warn",
        message: `Known route missing from sitemap.xml: ${route}`,
      });
    }
  }

  for (const p of sitemapPaths) {
    if (!SITE_ROUTE_SET.has(p)) {
      findings.push({
        severity: "error",
        message: `sitemap.xml lists unknown/unrouted path: ${p}`,
      });
    }
  }
}

function checkSourceLinks() {
  const files = walk(srcDir);
  const seen = new Map<string, string>(); // path -> first file

  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    INTERNAL_LINK_RE.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = INTERNAL_LINK_RE.exec(text))) {
      const raw = match[1] || match[2];
      const p = normalizePath(raw);
      if (!p) continue;
      if (!seen.has(p)) seen.set(p, path.relative(root, file));
    }
  }

  for (const [p, file] of seen) {
    if (!SITE_ROUTE_SET.has(p)) {
      findings.push({
        severity: "error",
        message: `Internal link to unknown route ${p} (from ${file})`,
      });
    }
  }
}

async function checkLiveSitemap() {
  if (SKIP_LIVE) {
    console.log("Skipping live HTTP checks (CHECK_LINKS_SKIP_LIVE=1).");
    return;
  }

  const locs = parseSitemapLocs();
  console.log(`Checking ${locs.length} sitemap URLs against hosting…`);

  for (const loc of locs) {
    // Prefer configured base host while keeping path from sitemap
    const p = pathFromLoc(loc);
    const url = `${BASE_URL}${p === "/" ? "/" : p}`;
    try {
      const res = await fetch(url, {
        method: "GET",
        redirect: "follow",
        headers: { "User-Agent": "bmspro-link-check/1.0" },
      });
      if (!res.ok) {
        findings.push({
          severity: "error",
          message: `Live URL returned HTTP ${res.status}: ${url}`,
        });
      } else {
        console.log(`  OK ${res.status} ${url}`);
      }
    } catch (err) {
      findings.push({
        severity: "error",
        message: `Live URL failed: ${url} (${err instanceof Error ? err.message : String(err)})`,
      });
    }
  }
}

async function main() {
  console.log("BMS Pro link / route health check\n");
  console.log(`Known routes: ${SITE_ROUTES.length}`);
  console.log(`Base URL: ${BASE_URL}\n`);

  checkSitemapVsRoutes();
  checkSourceLinks();
  await checkLiveSitemap();

  const errors = findings.filter((f) => f.severity === "error");
  const warns = findings.filter((f) => f.severity === "warn");

  if (warns.length) {
    console.log("\nWarnings:");
    for (const w of warns) console.log(`  ⚠ ${w.message}`);
  }
  if (errors.length) {
    console.log("\nErrors:");
    for (const e of errors) console.log(`  ✖ ${e.message}`);
  }

  console.log("\nAlso review GA4 event `page_404` (page_path) for live broken URLs.");
  console.log("Hosting: Vercel rewrites + production server SPA fallback return index.html for unknown paths — use GA4 for client 404s.\n");

  if (errors.length) {
    console.error(`Failed with ${errors.length} error(s), ${warns.length} warning(s).`);
    process.exit(1);
  }

  console.log(`Passed with ${warns.length} warning(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
