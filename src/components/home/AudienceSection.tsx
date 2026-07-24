import { Car, Scissors, HardHat } from "lucide-react";

const audiences = [
  {
    icon: Car,
    title: "Mechanic Shops",
    description:
      "Stop losing billable time to phone calls. Receptionists book routine jobs and only pass complex technical questions to the floor.",
    ring: "ring-product-black/15 group-hover:ring-product-black/35",
    iconWrap: "bg-product-black text-product-black-foreground",
  },
  {
    icon: HardHat,
    title: "Tradespeople",
    description:
      "Plumbers, carpenters, and electricians stay on the tools while a real person books jobs and manages the calendar in Blue.",
    ring: "ring-blue/15 group-hover:ring-blue/35",
    iconWrap: "bg-blue text-blue-foreground",
  },
  {
    icon: Scissors,
    title: "Salons & Beauty",
    description:
      "While stylists are with clients, receptionists fill the calendar, handle reschedules, and protect revenue from missed calls.",
    ring: "ring-pink/15 group-hover:ring-pink/35",
    iconWrap: "bg-pink text-pink-foreground",
  },
];

export function AudienceSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Who It&apos;s For</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-4 tracking-tight">
            Operational takeover for real industries
          </h2>
          <p className="text-lg text-muted-foreground">
            Software that fits the trade — plus a human front desk that escapes the daily phone chaos.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {audiences.map((audience, index) => (
            <div
              key={audience.title}
              className={`group rounded-3xl border border-border/60 bg-card p-8 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover ring-2 ring-transparent ${audience.ring} animate-fade-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`inline-flex items-center justify-center h-14 w-14 rounded-2xl mb-5 ${audience.iconWrap}`}
              >
                <audience.icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{audience.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{audience.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
