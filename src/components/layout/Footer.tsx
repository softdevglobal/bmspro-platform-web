import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { SITE_CONTACT_EMAIL } from "@/lib/siteContact";

const footerLinks = {
  products: [
    { name: "BMS Pro Black", href: "/products/black" },
    { name: "BMS Pro Pink", href: "/products/pink" },
    { name: "BMS Pro Blue", href: "/products/blue" },
    { name: "BMS Pro FieldFlow", href: "/products/fieldflow" },
    { name: "Booking Engine", href: "/products/booking-engine" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="BMS Pro" className="h-9 w-auto" />
              <span className="text-xl font-display font-bold tracking-tight text-foreground">BMS Pro</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              One platform. Every booking. Every workflow. Built for service businesses that mean business.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-label font-semibold text-foreground mb-4 uppercase text-sm tracking-wider">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-label font-semibold text-foreground mb-4 uppercase text-sm tracking-wider">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-label font-semibold text-foreground mb-4 uppercase text-sm tracking-wider">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-label font-semibold text-foreground mb-4 uppercase text-sm tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${SITE_CONTACT_EMAIL}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {SITE_CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href="tel:0387973795"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  03 8797 3795
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  12 Stelvio Close, Lynbrook VIC 3975
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} BMS Pro. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Trusted by 10,000+ businesses</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
