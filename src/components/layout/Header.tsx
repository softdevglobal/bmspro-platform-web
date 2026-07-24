import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Products",
    href: "/products",
    children: [
      {
        name: "BMS Pro Black",
        href: "/products/black",
        description: "Mechanic shops — filter calls, book jobs",
        dot: "bg-product-black",
      },
      {
        name: "BMS Pro Blue",
        href: "/products/blue",
        description: "Plumbers, carpenters & electricians",
        dot: "bg-blue",
      },
      {
        name: "BMS Pro Pink",
        href: "/products/pink",
        description: "Salons & beauty — fill the calendar",
        dot: "bg-pink",
      },
    ],
  },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setProductsOpen(false);
  }, [location.pathname]);

  const overHero = isHome && !scrolled && !mobileMenuOpen;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        overHero
          ? "border-b border-white/10 bg-[hsl(220_22%_6%/0.4)] backdrop-blur-md"
          : "border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm"
      )}
    >
      <nav className="container-wide flex h-16 items-center justify-between">
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
            {navigation.map((item) =>
              item.children ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                >
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 text-sm font-label font-medium transition-colors",
                      overHero
                        ? "text-white/80 hover:text-white"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.name}
                    <ChevronDown className="h-4 w-4" />
                  </Link>
                  {productsOpen && (
                    <div className="absolute top-full left-0 mt-1 w-80 rounded-2xl border border-border bg-card p-2 shadow-elevated animate-fade-in">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.href}
                          className="flex items-start gap-3 rounded-xl px-3 py-3 hover:bg-secondary transition-colors"
                        >
                          <span
                            className={cn("mt-1.5 h-2.5 w-2.5 rounded-full shrink-0", child.dot)}
                          />
                          <div>
                            <div className="text-base font-medium text-foreground">{child.name}</div>
                            <div className="text-sm text-muted-foreground">{child.description}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "px-4 py-2 text-sm font-label font-medium transition-colors",
                    overHero
                      ? "text-white/80 hover:text-white"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className={cn(overHero && "text-white hover:bg-white/10 hover:text-white")}
            asChild
          >
            <Link to="/login">Sign in</Link>
          </Button>
          <Button
            size="sm"
            className={cn(
              "rounded-full",
              overHero && "bg-white text-[hsl(220_22%_10%)] hover:bg-white/90"
            )}
            asChild
          >
            <Link to="/contact">
              Book Your Strategy Call
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
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  to={item.href}
                  className="block px-4 py-3 text-base font-medium text-foreground hover:bg-secondary rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.children && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        to={child.href}
                        className="flex items-center gap-2 px-4 py-2 text-base text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className={cn("h-2 w-2 rounded-full", child.dot)} />
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-border space-y-2">
              <Button variant="outline" className="w-full rounded-full" asChild>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  Sign in
                </Link>
              </Button>
              <Button className="w-full rounded-full" asChild>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                  Book Your Strategy Call
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
