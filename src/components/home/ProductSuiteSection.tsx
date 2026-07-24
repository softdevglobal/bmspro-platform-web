import { Link } from "react-router-dom";
import { ArrowRight, Wrench, Sparkles, Hammer, LucideIcon } from "lucide-react";

type ShowcaseProduct = {
  name: string;
  shortName: string;
  tagline: string;
  headline: string;
  description: string;
  features: string[];
  href: string;
  icon: LucideIcon;
  cta: string;
  panel: string;
  accentBar: string;
  chip: string;
  ctaClass: string;
};

const products: ShowcaseProduct[] = [
  {
    name: "BMS Pro Black",
    shortName: "Black",
    tagline: "Mechanic Shops",
    headline: "Keep your mechanics under the hood, not on the phone.",
    description:
      "Human receptionists filter routine calls and book jobs into the system — so technicians only take the complex technical ones.",
    features: [
      "Bay & job scheduling in software",
      "Receptionist books routine work",
      "Technical calls filtered through",
      "Less downtime on the floor",
    ],
    href: "/contact",
    icon: Wrench,
    cta: "Book Your Strategy Call",
    panel: "bg-[hsl(220_22%_10%)] text-white border-white/10",
    accentBar: "bg-gradient-to-r from-white/40 to-transparent",
    chip: "bg-white/10 text-white/80",
    ctaClass: "bg-white text-[hsl(220_22%_10%)] hover:bg-white/90",
  },
  {
    name: "BMS Pro Blue",
    shortName: "Blue",
    tagline: "Trades",
    headline: "Keep plumbers, carpenters & electricians on the tools.",
    description:
      "Your virtual front desk books jobs, handles reschedules, and only escalates what needs a tradesperson — so billable hours stay protected.",
    features: [
      "Job dispatch in the software",
      "Humans answer every call",
      "Quotes & bookings captured",
      "Fewer interruptions on site",
    ],
    href: "/contact",
    icon: Hammer,
    cta: "Book Your Strategy Call",
    panel: "bg-blue text-blue-foreground border-blue/20",
    accentBar: "bg-gradient-to-r from-white/35 to-transparent",
    chip: "bg-white/15 text-white/90",
    ctaClass: "bg-white text-blue hover:bg-white/90",
  },
  {
    name: "BMS Pro Pink",
    shortName: "Pink",
    tagline: "Salons",
    headline: "While you're with a client, our receptionists are filling your calendar.",
    description:
      "Missed calls mean missed bookings. A real person manages the calendar, handles reschedules, and keeps chairs full — without interrupting the floor.",
    features: [
      "Live calendar in the software",
      "Humans capture every booking",
      "Reschedules handled for you",
      "Revenue protection, not voicemail",
    ],
    href: "/contact",
    icon: Sparkles,
    cta: "Meet Your Virtual Front Desk",
    panel: "bg-pink text-pink-foreground border-pink/20",
    accentBar: "bg-gradient-to-r from-white/35 to-transparent",
    chip: "bg-white/15 text-white/90",
    ctaClass: "bg-white text-pink hover:bg-white/90",
  },
];

export function ProductSuiteSection() {
  return (
    <section id="products" className="scroll-mt-24 relative overflow-hidden bg-secondary/25">
      <div className="container-wide relative section-padding">
        <div className="max-w-2xl mb-12 lg:mb-14">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Software + Human Front Desk
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-3 tracking-tight">
            Pitched to the chaos you escape every day
          </h2>
          <p className="text-lg text-muted-foreground">
            Black for workshops, Pink for salons, Blue for trades — each with software built for the
            industry and receptionists who know how to book it.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <article
                key={product.name}
                className={`group relative overflow-hidden rounded-3xl border p-7 sm:p-8 flex flex-col min-h-[440px] shadow-elevated transition-transform duration-500 hover:-translate-y-1.5 animate-fade-up ${product.panel}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`absolute top-0 inset-x-0 h-1 ${product.accentBar}`} aria-hidden />
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl group-hover:scale-150 transition-transform duration-700" />

                <div className="relative flex items-start justify-between mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${product.chip}`}>
                    {product.tagline}
                  </span>
                </div>

                <div className="relative flex-grow">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] opacity-70 mb-2">
                    BMS Pro {product.shortName}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-4 leading-snug">
                    {product.headline}
                  </h3>
                  <p className="text-sm opacity-85 leading-relaxed mb-6">{product.description}</p>
                  <ul className="space-y-2.5 mb-8">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5 text-sm opacity-90">
                        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to={product.href}
                  className={`relative inline-flex items-center justify-center gap-2 w-full h-12 rounded-full text-sm font-semibold transition-all duration-200 ${product.ctaClass}`}
                >
                  {product.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
