import { Link } from "react-router-dom";
import { ArrowRight, Wrench, Scissors, Hammer, LucideIcon } from "lucide-react";

type ShowcaseProduct = {
  shortName: string;
  tagline: string;
  headline: string;
  description: string;
  features: string[];
  href: string;
  icon: LucideIcon;
  cta: string;
  image: string;
  badge: string;
  ctaClass: string;
};

const products: ShowcaseProduct[] = [
  {
    shortName: "Workshop",
    tagline: "Workshop",
    headline: "BMS Pro Workshop",
    description:
      "Manage bookings, customer details, vehicle information, workshop schedules and service updates from one place. Customers can request a booking online. You choose the time that works, organise the job and keep the customer informed.",
    features: [
      "Online booking requests",
      "Customer and vehicle records",
      "Workshop calendar",
      "Staff scheduling",
      "Service updates",
      "Appointment reminders",
    ],
    href: "/products/black",
    icon: Wrench,
    cta: "Explore BMS Pro Workshop",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1000&h=1400&fit=crop",
    badge: "bg-product-black text-white",
    ctaClass: "bg-white text-[hsl(220_22%_10%)] hover:bg-white/90",
  },
  {
    shortName: "Trade",
    tagline: "Trade Business",
    headline: "BMS Pro Trade",
    description:
      "Keep enquiries, quotes, jobs, staff, subcontractors and invoices connected from the first customer call through to final payment. When a quote is approved, turn it into a job, schedule the work and assign the right person without entering everything again.",
    features: [
      "Enquiries and customer records",
      "Quotes and follow-ups",
      "Job scheduling",
      "Staff and subcontractor assignment",
      "Job updates and photos",
      "Invoices and payment links",
    ],
    href: "/products/blue",
    icon: Hammer,
    cta: "Explore BMS Pro Trade",
    image: "/products/blue/jobs.jpg",
    badge: "bg-blue text-white",
    ctaClass: "bg-white text-blue hover:bg-white/90",
  },
  {
    shortName: "Salon",
    tagline: "Salon",
    headline: "BMS Pro Salon",
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
    icon: Scissors,
    cta: "Explore BMS Pro Salon",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1000&h=1400&fit=crop",
    badge: "bg-pink text-white",
    ctaClass: "bg-white text-pink hover:bg-white/90",
  },
];

export function ProductSuiteSection() {
  return (
    <section id="products" className="scroll-mt-24 relative overflow-hidden bg-[hsl(220_22%_8%)] text-white">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-[hsl(220_22%_8%)]" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(ellipse 40% 50% at 10% 20%, hsl(220 18% 20% / 0.8), transparent),
              radial-gradient(ellipse 35% 40% at 90% 30%, hsl(340 60% 40% / 0.25), transparent),
              radial-gradient(ellipse 40% 45% at 50% 100%, hsl(210 65% 38% / 0.3), transparent)
            `,
          }}
        />
      </div>

      <div className="container-wide relative section-padding">
        <div className="max-w-3xl mb-12 lg:mb-14 text-center mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-3 tracking-tight">
            Choose the BMS Pro built for your business
          </h2>
          <p className="font-sans text-lg text-white/65 leading-relaxed">
            Every service business works differently. A workshop doesn’t run like a salon, and a
            tradie working across different job sites needs different tools again. That’s why BMS Pro
            comes in three versions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 lg:gap-5">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <article
                key={product.shortName}
                className="group relative overflow-hidden rounded-3xl min-h-[420px] sm:min-h-[480px] md:min-h-[520px] flex flex-col border border-white/10 shadow-elevated animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={product.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover scale-105 blur-[2px] transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[hsl(220_22%_6%/0.72)] group-hover:bg-[hsl(220_22%_6%/0.66)] transition-colors" />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220_22%_6%/0.95)] via-[hsl(220_22%_6%/0.55)] to-transparent" />

                <div className="relative flex flex-col flex-grow p-6 sm:p-7">
                  <div className="flex items-start justify-between mb-8">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-label font-bold uppercase tracking-wider ${product.badge}`}
                    >
                      <Icon className="h-3 w-3" />
                      {product.tagline}
                    </span>
                  </div>

                  <div className="mt-auto">
                    <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight mb-3 leading-snug">
                      {product.headline}
                    </h3>
                    <p className="font-sans text-sm text-white/70 leading-relaxed mb-5">
                      {product.description}
                    </p>
                    <ul className="space-y-2 mb-7">
                      {product.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2.5 text-sm text-white/80">
                          <span className="h-1.5 w-1.5 rounded-full bg-white/50 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={product.href}
                      className={`inline-flex items-center justify-center gap-2 w-full h-12 rounded-full text-sm font-semibold transition-all ${product.ctaClass}`}
                    >
                      {product.cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
