import { Wrench, Scissors, HardHat } from "lucide-react";

const audiences = [
  {
    icon: Wrench,
    title: "Mechanic Shops",
    product: "Black",
    description:
      "Stop losing billable time to phone calls. Receptionists book routine jobs and only pass complex technical questions to the floor.",
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=900&h=700&fit=crop",
    badge: "bg-product-black",
  },
  {
    icon: Scissors,
    title: "Salons & Beauty",
    product: "Pink",
    description:
      "While stylists are with clients, receptionists fill the calendar, handle reschedules, and protect revenue from missed calls.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&h=700&fit=crop",
    badge: "bg-pink",
  },
  {
    icon: HardHat,
    title: "Tradespeople",
    product: "Blue",
    description:
      "Plumbers, carpenters, and electricians stay on the tools while a real person books jobs and manages the calendar.",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900&h=700&fit=crop",
    badge: "bg-blue",
  },
];

export function AudienceSection() {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="container-wide relative">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <span className="eyebrow inline-flex rounded-full border border-border bg-secondary/60 px-3 py-1 text-muted-foreground">
            Who It&apos;s For
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-4 tracking-tight">
            Operational takeover for real industries
          </h2>
          <p className="font-sans text-lg text-muted-foreground">
            Software that fits the trade — plus a human front desk that escapes the daily phone chaos.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 lg:gap-5">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <div
                key={audience.title}
                className="group relative overflow-hidden rounded-3xl min-h-[280px] sm:min-h-[320px] border border-border/40 shadow-elevated animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={audience.image}
                  alt={audience.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220_22%_6%/0.92)] via-[hsl(220_22%_6%/0.45)] to-[hsl(220_22%_6%/0.15)]" />
                <div className="relative h-full flex flex-col justify-end p-6 sm:p-7 text-white">
                  <span
                    className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-label font-bold uppercase tracking-wider mb-3 ${audience.badge}`}
                  >
                    <Icon className="h-3 w-3" />
                    {audience.product}
                  </span>
                  <h3 className="font-display text-xl font-bold mb-2">{audience.title}</h3>
                  <p className="font-sans text-sm text-white/75 leading-relaxed">{audience.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
