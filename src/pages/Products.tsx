import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/ProductCard";
import { SEO } from "@/components/SEO";
import { Sparkles, Wrench, Smartphone, Code, Hammer } from "lucide-react";

const products = [
  {
    name: "BMS Pro Black",
    tagline: "Mechanic Shops",
    description:
      "Filter calls and book jobs — workshop operations in one place. Human receptionists book routine work so mechanics stay under the hood.",
    features: [
      "Bay & job scheduling",
      "Receptionist call filtering",
      "Workshop onboarding support",
      "Demo & pricing walkthroughs",
      "Less downtime on the floor",
      "Jobs booked into the system",
    ],
    href: "/products/black",
    variant: "black" as const,
    icon: Wrench,
    cta: "Book a Demo",
  },
  {
    name: "BMS Pro Pink",
    tagline: "Salons & Beauty",
    description: "Appointment booking built for salons, spas, and personal service businesses. Beautiful calendar views, client management, and seamless online booking.",
    features: [
      "Online booking portal",
      "Staff scheduling & availability",
      "Client profiles & history",
      "Multi-location support",
      "Automated reminders",
      "Revenue reporting",
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
      "Route optimization",
      "Job costing",
    ],
    href: "/products/blue",
    variant: "blue" as const,
    icon: Hammer,
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
      "Photo documentation",
      "Offline capability",
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
      "Custom branding",
      "Multi-language",
    ],
    href: "/products/booking-engine",
    variant: "slate" as const,
    icon: Code,
    cta: "View Documentation",
  },
];

const Products = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "BMS Pro Products",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://bmspros.com.au${p.href}`,
      name: p.name,
    })),
  };

  return (
    <Layout>
      <SEO
        title="Products | BMS Pro Suite for Service Businesses"
        description="Explore BMS Pro Black, Pink, Blue, FieldFlow, and Booking Engine — products built to run bookings, jobs, and field operations on one platform."
        path="/products"
        jsonLd={jsonLd}
      />
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Products</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mt-2 mb-6">
              The complete toolkit for service businesses
            </h1>
            <p className="text-xl text-muted-foreground">
              Powerful products designed to work together or standalone. Choose what fits your business today, add more as you grow.
            </p>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-10">
            Choose the right product for your business
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
    </Layout>
  );
};

export default Products;
