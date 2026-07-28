import { Calendar, Headphones, Filter, ShieldCheck } from "lucide-react";

const benefits = [
  {
    icon: Calendar,
    title: "Software that runs the day",
    description:
      "Live booking, attendance, and schedules for Black, Blue, and Pink — always in sync with the front desk.",
  },
  {
    icon: Headphones,
    title: "Humans on every call",
    description:
      "Real receptionists answer, book, and reschedule. No AI voicebots. No frustrated clients.",
  },
  {
    icon: Filter,
    title: "Chaos filtered out",
    description:
      "Routine questions get handled. Only the work that needs your team reaches the floor.",
  },
  {
    icon: ShieldCheck,
    title: "Consultative onboarding",
    description:
      "Strategy call, handover, and a front desk that knows your business — not a login and leave.",
  },
];

export function BenefitsSection() {
  return (
    <section className="relative overflow-hidden text-white">
      {/* Blurred industry backdrop — matches hero language */}
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
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80">
            The Bundle
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-4 tracking-tight">
            Not just software. A virtual front desk.
          </h2>
          <p className="text-lg text-white/65">
            The value is the handover — platform plus people who keep your calendar full and your team focused.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-6 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-white/15 mb-4">
                <benefit.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm text-white/70 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
