import { ProductCard } from "@/components/ProductCard";
import { Sparkles, Wrench, Smartphone, Code } from "lucide-react";

const products = [
  {
    name: "BMS Pro Pink",
    tagline: "Salons & Beauty",
    description: "Appointment booking built for salons, spas, and personal service businesses. Beautiful calendar views, client management, and seamless online booking.",
    features: [
      "Online booking portal",
      "Staff scheduling & availability",
      "Client profiles & history",
      "Multi-location support",
    ],
    href: "/products/pink",
    variant: "pink" as const,
    icon: Sparkles,
    cta: "Start Free Trial",
  },
  {
    name: "BMS Pro Blue",
    tagline: "Trades & Services",
    description: "Job scheduling and management for trades, contractors, and service businesses. From quotes to completion, track every job with confidence.",
    features: [
      "Job scheduling & dispatch",
      "Technician assignment",
      "Quote & invoice management",
      "Customer records",
    ],
    href: "/products/blue",
    variant: "blue" as const,
    icon: Wrench,
    cta: "Book a Demo",
  },
  {
    name: "BMS Pro FieldFlow",
    tagline: "Field Operations",
    description: "Mobile-first workflow management for field teams. Real-time updates, task tracking, and seamless communication between office and field.",
    features: [
      "Mobile-first interface",
      "Real-time status updates",
      "Task workflows & checklists",
      "Location tracking",
    ],
    href: "/products/fieldflow",
    variant: "teal" as const,
    icon: Smartphone,
    cta: "Explore FieldFlow",
  },
  {
    name: "Booking Engine",
    tagline: "Embeddable",
    description: "A powerful, embeddable booking widget for your website. White-label ready with Stripe payments and full availability management.",
    features: [
      "Easy website embed",
      "Stripe payments ready",
      "White-label options",
      "Full API access",
    ],
    href: "/products/booking-engine",
    variant: "slate" as const,
    icon: Code,
    cta: "View Documentation",
  },
];

export function ProductSuiteSection() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Product Suite</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-4">
            Everything you need to run your operations
          </h2>
          <p className="text-lg text-muted-foreground">
            Four powerful products, one unified platform. Choose what you need, scale as you grow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.name}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
