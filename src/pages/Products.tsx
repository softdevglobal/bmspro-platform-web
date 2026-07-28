import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/ProductCard";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Wrench,
  Hammer,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

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
    description:
      "Appointment booking built for salons, spas, and personal service businesses. Beautiful calendar views, client management, and seamless online booking.",
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
    cta: "Book a Demo",
  },
  {
    name: "BMS Pro Blue",
    tagline: "Trades & Services",
    description:
      "Job scheduling and management for trades, contractors, and service businesses. From quotes to completion, track every job with confidence.",
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
        description="Explore BMS Pro Black, Pink, and Blue — products built to run bookings, jobs, and workshop operations on one platform."
        path="/products"
        jsonLd={jsonLd}
      />

      {/* Full-bleed image hero */}
      <section className="relative bg-background -mt-16">
        <div className="relative min-h-[min(72vh,640px)] flex items-center overflow-hidden pt-16">
          <div className="absolute inset-0 grid grid-cols-1 sm:grid-cols-3" aria-hidden>
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=1200&fit=crop"
              alt=""
              className="h-full w-full object-cover scale-110 blur-xs sm:blur-sm min-h-[220px]"
            />
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=1200&fit=crop"
              alt=""
              className="hidden sm:block h-full w-full object-cover scale-110 blur-sm"
            />
            <img
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&h=1200&fit=crop"
              alt=""
              className="hidden sm:block h-full w-full object-cover scale-110 blur-sm"
            />
          </div>
          <div className="absolute inset-0 bg-[hsl(220_22%_6%/0.62)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_22%_6%/0.45)] via-[hsl(220_22%_6%/0.35)] to-[hsl(220_22%_6%/0.82)]" />

          <div className="container-wide relative z-10 py-16 sm:py-20 w-full">
            <div className="max-w-3xl mx-auto text-center text-white">
              <p className="font-label text-sm font-semibold tracking-[0.2em] uppercase text-white/55 mb-4 animate-fade-up">
                Our Products
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 animate-fade-up delay-100 leading-[1.05]">
                The complete toolkit for service businesses
              </h1>
              <p className="font-sans text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-8 animate-fade-up delay-200 leading-relaxed">
                Software that fits the trade — plus a human front desk that keeps calendars full and
                teams focused. Choose what fits today, add more as you grow.
              </p>

              <div className="flex flex-col items-center gap-4 animate-fade-up delay-300">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto">
                  <Button
                    size="xl"
                    className="rounded-full w-full sm:w-auto bg-white text-[hsl(220_22%_10%)] hover:bg-white/90 shadow-lg"
                    asChild
                  >
                    <a href="#suite">
                      Explore the Suite
                      <ArrowRight className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button
                    size="xl"
                    variant="outline"
                    className="rounded-full w-full sm:w-auto border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
                    asChild
                  >
                    <Link to="/contact">Book Your Strategy Call</Link>
                  </Button>
                </div>

                <div className="inline-flex items-start sm:items-center gap-2.5 max-w-lg rounded-2xl border border-white/25 bg-white/10 backdrop-blur-md px-4 py-3 text-left">
                  <ShieldCheck className="h-5 w-5 text-teal shrink-0 mt-0.5 sm:mt-0" />
                  <p className="text-sm font-semibold text-white leading-snug">
                    Software + Human Front Desk.{" "}
                    <span className="text-white/70 font-medium">
                      Black, Pink &amp; Blue — each pitched to your industry.
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-3 animate-fade-up delay-400">
                {[
                  { icon: Wrench, label: "Mechanics", color: "bg-product-black" },
                  { icon: Sparkles, label: "Salons", color: "bg-pink" },
                  { icon: Hammer, label: "Trades", color: "bg-blue" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <span
                      key={item.label}
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1.5 text-sm font-label font-semibold text-white"
                    >
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full ${item.color}`}
                      >
                        <Icon className="h-3 w-3" />
                      </span>
                      {item.label}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section id="suite" className="section-padding bg-secondary/30 scroll-mt-20">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center mb-12 lg:mb-14">
            <span className="eyebrow inline-flex rounded-full border border-border bg-background/80 px-3 py-1 text-muted-foreground">
              The Suite
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-3 tracking-tight">
              Choose the right product for your business
            </h2>
            <p className="font-sans text-lg text-muted-foreground">
              Powerful products designed to work together or standalone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 lg:gap-6 max-w-5xl mx-auto">
            {products.map((product, index) => (
              <div
                key={product.name}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <ProductCard {...product} className="shadow-elevated border border-border/60" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute inset-0 grid grid-cols-1 sm:grid-cols-3">
            <img
              src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=900&h=800&fit=crop"
              alt=""
              className="h-full w-full object-cover scale-110 blur-sm"
            />
            <img
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=900&h=800&fit=crop"
              alt=""
              className="hidden sm:block h-full w-full object-cover scale-110 blur-sm"
            />
            <img
              src="/products/blue/jobs.jpg"
              alt=""
              className="hidden sm:block h-full w-full object-cover scale-110 blur-sm"
            />
          </div>
          <div className="absolute inset-0 bg-[hsl(220_22%_6%/0.72)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_22%_6%/0.5)] via-[hsl(220_22%_6%/0.55)] to-[hsl(220_22%_6%/0.85)]" />
        </div>

        <div className="container-wide relative section-padding text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight max-w-3xl mx-auto">
            Not sure which product fits?
          </h2>
          <p className="font-sans text-lg text-white/70 max-w-xl mx-auto mb-8">
            Book a strategy call — we&apos;ll show the software, explain the receptionist handover,
            and match you to Black, Blue, or Pink.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <Button
              size="xl"
              className="rounded-full bg-white text-[hsl(220_22%_10%)] hover:bg-white/90 shadow-lg"
              asChild
            >
              <Link to="/contact">
                Book Your Strategy Call
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="rounded-full border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
              asChild
            >
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
