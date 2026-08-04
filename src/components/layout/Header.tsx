import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { productKeyFromPath, trackCtaClick, trackProductClick } from "@/lib/analytics";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Products",
    href: "/products",
    children: [
      {
        name: "BMS Pro Workshop",
        href: "/products/black",
        description: "Mechanic shops  filter calls, book jobs",
        dot: "bg-product-black",
      },
      {
        name: "BMS Pro Trade",
        href: "/products/blue",
        description: "Plumbers, carpenters & electricians",
        dot: "bg-blue",
      },
      {
        name: "BMS Pro Salon",
        href: "/products/pink",
        description: "Salons & beauty  fill the calendar",
        dot: "bg-pink",
      },
    ],
  },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
];

/** Pages with full-bleed image heroes that sit under the transparent nav */
const HERO_ROUTES = new Set([
  "/",
  "/products",
  "/pricing",
  "/contact",
]);

function isActivePath(pathname: string, href: string, hasChildren?: boolean) {
  if (href === "/") return pathname === "/";
  if (hasChildren) return pathname === href || pathname.startsWith(`${href}/`);
  return pathname === href;
}

export function Header() {
  const location = useLocation();
  const hasHero = HERO_ROUTES.has(location.pathname);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hiddenByScroll, setHiddenByScroll] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);

      const delta = y - lastScrollY.current;
      // Ignore jitter, and keep the bar visible near the top of the page
      if (Math.abs(delta) < 4) return;
      setHiddenByScroll(delta > 0 && y > 80);
      lastScrollY.current = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setProductsOpen(false);
    setHiddenByScroll(false);
  }, [location.pathname]);

  const overHero = hasHero && !scrolled && !mobileMenuOpen;
  const collapsed = hiddenByScroll && !mobileMenuOpen && !productsOpen;

  const linkClass = (active: boolean) =>
    cn(
      "relative px-4 py-2 text-sm font-label font-medium rounded-full transition-colors",
      overHero
        ? active
          ? "text-white bg-white/15"
          : "text-white/75 hover:text-white hover:bg-white/10"
        : active
          ? "text-foreground bg-secondary"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
    );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 will-change-transform",
        collapsed ? "-translate-y-full" : "translate-y-0",
        overHero
          ? "border-b border-white/10 bg-[hsl(220_22%_6%/0.4)] backdrop-blur-md"
          : "border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm"
      )}
    >
      <nav className="container-wide flex h-16 items-center justify-between" aria-label="Main">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="BMS Pro" className="h-9 w-auto" />
            <span
              className={cn(
                "text-xl font-display font-bold tracking-tight transition-colors",
                overHero ? "text-white" : "text-foreground"
              )}
            >
              BMS Pro
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const active = isActivePath(location.pathname, item.href, Boolean(item.children));

              if (item.children) {
                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setProductsOpen(true)}
                    onMouseLeave={() => setProductsOpen(false)}
                  >
                    <Link
                      to={item.href}
                      aria-current={active ? "page" : undefined}
                      aria-expanded={productsOpen}
                      aria-haspopup="menu"
                      className={cn(linkClass(active || productsOpen), "flex items-center gap-1")}
                    >
                      {item.name}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          productsOpen && "rotate-180"
                        )}
                      />
                    </Link>
                    {productsOpen && (
                      <div className="absolute top-full left-0 z-50 pt-1">
                        {/* Invisible hover bridge - keeps menu open while moving into it */}
                        <div
                          role="menu"
                          className="w-80 rounded-2xl border border-border bg-card p-2 shadow-elevated animate-fade-in"
                        >
                          {item.children.map((child) => {
                            const childActive = location.pathname === child.href;
                            return (
                              <Link
                                key={child.name}
                                to={child.href}
                                role="menuitem"
                                aria-current={childActive ? "page" : undefined}
                                className={cn(
                                  "flex items-start gap-3 rounded-xl px-3 py-3 transition-colors",
                                  childActive ? "bg-secondary" : "hover:bg-secondary"
                                )}
                                onClick={() => {
                                  setProductsOpen(false);
                                  trackProductClick(
                                    productKeyFromPath(child.href),
                                    "header_dropdown"
                                  );
                                }}
                              >
                                <span
                                  className={cn(
                                    "mt-1.5 h-2.5 w-2.5 rounded-full shrink-0",
                                    child.dot
                                  )}
                                />
                                <div>
                                  <div className="text-base font-medium text-foreground">
                                    {child.name}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {child.description}
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                          <Link
                            to="/products"
                            role="menuitem"
                            className="mt-1 flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                            onClick={() => setProductsOpen(false)}
                          >
                            View all products
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  aria-current={active ? "page" : undefined}
                  className={linkClass(active)}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button
            size="sm"
            className={cn(
              "rounded-full",
              overHero && "bg-white text-[hsl(220_22%_10%)] hover:bg-white/90"
            )}
            asChild
          >
            <Link
              to="/contact"
              onClick={() =>
                trackCtaClick("header", "Book a walkthrough", "/contact")
              }
            >
              Book a walkthrough
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <button
          type="button"
          className={cn("md:hidden p-2 rounded-lg", overHero ? "text-white" : "text-foreground")}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-border bg-background">
          <div className="container-wide py-4 space-y-2">
            {navigation.map((item) => {
              const active = isActivePath(location.pathname, item.href, Boolean(item.children));
              return (
                <div key={item.name}>
                  <Link
                    to={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block px-4 py-3 text-base font-label font-medium rounded-lg transition-colors",
                      active
                        ? "bg-secondary text-foreground"
                        : "text-foreground hover:bg-secondary"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => {
                        const childActive = location.pathname === child.href;
                        return (
                          <Link
                            key={child.name}
                            to={child.href}
                            aria-current={childActive ? "page" : undefined}
                            className={cn(
                              "flex items-center gap-2 px-4 py-2 text-base rounded-lg transition-colors",
                              childActive
                                ? "bg-secondary text-foreground font-medium"
                                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                            )}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              trackProductClick(
                                productKeyFromPath(child.href),
                                "header_mobile"
                              );
                            }}
                          >
                            <span className={cn("h-2 w-2 rounded-full", child.dot)} />
                            {child.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
            <div className="pt-4 border-t border-border space-y-2">
              <Button className="w-full rounded-full" asChild>
                <Link
                  to="/contact"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    trackCtaClick("header_mobile", "Book a walkthrough", "/contact");
                  }}
                >
                  Book a walkthrough
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
