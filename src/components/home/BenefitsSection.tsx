import {
  Calendar,
  ClipboardList,
  FileText,
  MessageSquare,
  Users,
  UserRound,
} from "lucide-react";

const capabilities = [
  {
    icon: ClipboardList,
    title: "Bookings",
    description: "Give customers a simple way to request a suitable day and time.",
  },
  {
    icon: Calendar,
    title: "Scheduling",
    description: "See appointments, jobs and team availability from one calendar.",
  },
  {
    icon: UserRound,
    title: "Customer records",
    description: "Keep customer details and previous activity easy to find.",
  },
  {
    icon: Users,
    title: "Team management",
    description: "Assign work and give your team the information they need.",
  },
  {
    icon: MessageSquare,
    title: "Customer updates",
    description: "Send confirmations, reminders and progress messages.",
  },
  {
    icon: FileText,
    title: "Business paperwork",
    description:
      "Keep quotes, jobs and invoices connected where supported by the selected product.",
  },
];

export function BenefitsSection() {
  return (
    <section className="relative overflow-hidden text-white">
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 grid grid-cols-3">
          <img
            src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=1000&fit=crop"
            alt=""
            className="h-full w-full object-cover scale-110 blur-md"
          />
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=1000&fit=crop"
            alt=""
            className="h-full w-full object-cover scale-110 blur-md"
          />
          <img
            src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=1000&fit=crop"
            alt=""
            className="h-full w-full object-cover scale-110 blur-md"
          />
        </div>
        <div className="absolute inset-0 bg-[hsl(220_22%_6%/0.78)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_22%_6%/0.4)] via-transparent to-[hsl(220_22%_6%/0.7)]" />
      </div>

      <div className="container-wide relative section-padding">
        <div className="max-w-2xl mb-12 text-center mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-4 tracking-tight">
            Everything your day needs to keep moving
          </h2>
          <p className="font-sans text-sm text-white/55">
            Available features vary by BMS Pro product.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.map((benefit, index) => (
            <div
              key={benefit.title}
              className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-6 animate-fade-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-white/15 mb-4">
                <benefit.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="font-sans text-sm text-white/70 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
