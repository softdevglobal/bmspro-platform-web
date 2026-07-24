import { Scissors, HardHat, Truck, Building2 } from "lucide-react";

const audiences = [
  {
    icon: Scissors,
    title: "Salons & Spas",
    description: "Hair salons, beauty spas, nail studios, and wellness centers managing appointments and client relationships.",
  },
  {
    icon: HardHat,
    title: "Trades & Contractors",
    description: "Plumbers, electricians, HVAC technicians, and contractors managing jobs, quotes, and field teams.",
  },
  {
    icon: Truck,
    title: "Field Service Teams",
    description: "Mobile workforces, delivery teams, and service technicians requiring real-time coordination.",
  },
  {
    icon: Building2,
    title: "Multi-Location Businesses",
    description: "Franchise operations and businesses with multiple sites needing centralized management.",
  },
];

export function AudienceSection() {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Who It's For</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-4">
            Built for service businesses that mean business
          </h2>
          <p className="text-lg text-muted-foreground">
            Whether you're managing a single salon or coordinating a fleet of technicians, BMS Pro scales with you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {audiences.map((audience, index) => (
            <div
              key={audience.title}
              className="text-center group animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-secondary mb-4 group-hover:bg-primary/5 transition-colors">
                <audience.icon className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{audience.title}</h3>
              <p className="text-sm text-muted-foreground">{audience.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
