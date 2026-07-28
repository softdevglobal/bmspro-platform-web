import { Link } from "react-router-dom";
import { ArrowRight, Wrench, Sparkles, Hammer, LucideIcon } from "lucide-react";

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
    shortName: "Black",
    tagline: "Mechanic Shops",
    headline: "Keep your mechanics under the hood, not on the phone.",
    description:
      "Human receptionists filter routine calls and book jobs into the system — technicians only take the complex technical ones.",
    features: [
      "Bay & job scheduling in software",
      "Receptionist books routine work",
      "Technical calls filtered through",
      "Less downtime on the floor",
    ],
    href: "/products/black",
    icon: Wrench,
    cta: "Book Your Strategy Call",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1000&h=1400&fit=crop",
    badge: "bg-product-black text-white",
    ctaClass: "bg-white text-[hsl(220_22%_10%)] hover:bg-white/90",
  },
  {
    shortName: "Pink",
    tagline: "Salons",
    headline: "While you're with a client, our receptionists fill your calendar.",
    description:
      "Missed calls mean missed bookings. A real person manages the calendar and keeps chairs full — without interrupting the floor.",
    features: [
      "Live calendar in the software",
      "Humans capture every booking",
      "Reschedules handled for you",
      "Revenue protection, not voicemail",
    ],
    href: "/products/pink",
    icon: Sparkles,
    cta: "Meet Your Virtual Front Desk",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1000&h=1400&fit=crop",
    badge: "bg-pink text-white",
    ctaClass: "bg-white text-pink hover:bg-white/90",
  },
  {
    shortName: "Blue",
    tagline: "Trades",
    headline: "Keep plumbers, carpenters & electricians on the tools.",
    description:
      "Your virtual front desk books jobs, handles reschedules, and only escalates what needs a tradesperson.",
    features: [
      "Job dispatch in the software",
      "Humans answer every call",
      "Quotes & bookings captured",
      "Fewer interruptions on site",
    ],
    href: "/products/blue",
    icon: Hammer,
    cta: "Book Your Strategy Call",
    image: "/products/blue/jobs.jpg",
    badge: "bg-blue text-white",
    ctaClass: "bg-white text-blue hover:bg-white/90",
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
        <div className="max-w-2xl mb-12 lg:mb-14 text-center mx-auto">
          <span className="eyebrow inline-flex rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-white/80">
            Software + Human Front Desk
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-3 tracking-tight">
            Pitched to the chaos you escape every day
          </h2>
          <p className="font-sans text-lg text-white/65">
            Black for workshops, Pink for salons, Blue for trades — each with software and receptionists who know how to book it.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 lg:gap-5">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <article
                key={product.shortName}
                className="group relative overflow-hidden rounded-3xl min-h-[480px] flex flex-col border border-white/10 shadow-elevated animate-fade-up"
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
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-label font-bold uppercase tracking-wider ${product.badge}`}>
                      <Icon className="h-3 w-3" />
                      {product.tagline}
                    </span>
                    <span className="font-label text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                      BMS Pro {product.shortName}
                    </span>
                  </div>

                  <div className="mt-auto">
                    <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight mb-3 leading-snug">
                      {product.headline}
                    </h3>
                    <p className="font-sans text-sm text-white/70 leading-relaxed mb-5">{product.description}</p>
                    <ul className="space-y-2 mb-7">
                      {product.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2.5 text-sm text-white/80">
                          <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
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
