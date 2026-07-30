import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/ProductCard";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ScrollPage, ScrollReveal } from "@/components/motion/ScrollReveal";
import {
  Sparkles,
  Wrench,
  Hammer,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const products = [
  {
    name: "BMS Pro Workshop",
    tagline: "Mechanics & automotive workshops",
    description:
      "Manage bookings, customer details, vehicle information, workshop schedules and service updates from one place. Customers can request a booking online. You choose the time that works.",
    features: [
      "Online booking requests",
      "Customer and vehicle records",
      "Workshop calendar",
      "Staff scheduling",
      "Service updates",
      "Appointment reminders",
    ],
    href: "/products/black",
    variant: "black" as const,
    icon: Wrench,
    cta: "Explore BMS Pro Workshop",
  },
  {
    name: "BMS Pro Salon",
    tagline: "Salons, barbers & appointments",
    description:
      "Let customers request appointments online while you manage your services, staff schedules and daily bookings from one place. Spend less time answering booking messages and more time looking after your customers.",
    features: [
      "Online appointment requests",
      "Service selection",
      "Staff calendars",
      "Customer details",
      "Appointment reminders",
      "Daily booking management",
    ],
    href: "/products/pink",
    variant: "pink" as const,
    icon: Sparkles,
    cta: "Explore BMS Pro Salon",
  },
  {
    name: "BMS Pro Trade",
    tagline: "Tradies & field-service businesses",
    description:
      "Keep enquiries, quotes, jobs, staff, subcontractors and invoices connected from the first customer call through to final payment. When a quote is approved, turn it into a job without entering everything again.",
    features: [
      "Enquiries and customer records",
      "Quotes and follow-ups",
      "Job scheduling",
      "Staff and subcontractor assignment",
      "Job updates and photos",
      "Invoices and payment links",
    ],
    href: "/products/blue",
    variant: "blue" as const,
    icon: Hammer,
    cta: "Explore BMS Pro Trade",
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
        title="Products | BMS Pro Workshop, Trade and Salon"
        description="Choose the BMS Pro built for your business — Workshop for mechanics, Trade for field service, and Salon for appointment-based businesses."
        path="/products"
        jsonLd={jsonLd}
      />

      <ScrollPage>
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
                Choose the BMS Pro built for your business
              </h1>
              <p className="font-sans text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-8 animate-fade-up delay-200 leading-relaxed">
                Every service business works differently. A workshop doesn&apos;t run like a salon,
                and a tradie working across different job sites needs different tools again. That&apos;s
                why BMS Pro comes in three versions.
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
                    Practical booking and operations software.{" "}
                    <span className="text-white/70 font-medium">
                      Workshop, Trade &amp; Salon — each built for how you work.
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
              Choose the BMS Pro built for your business
            </h2>
            <p className="font-sans text-lg text-muted-foreground">
              Three versions — one for workshops, one for trades, one for salons.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 lg:gap-6 max-w-5xl mx-auto">
            {products.map((product, index) => (
              <ScrollReveal
                key={product.name}
                from={index % 2 === 0 ? "left" : "right"}
                distance={64}
                delay={index * 0.08}
              >
                <ProductCard {...product} className="shadow-elevated border border-border/60" />
              </ScrollReveal>
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
            Book a strategy call — we&apos;ll show the software and match you to Workshop, Trade, or
            Salon.
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
      </ScrollPage>
    </Layout>
  );
};

export default Products;
