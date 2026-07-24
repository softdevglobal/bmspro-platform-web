import { Calendar, Headphones, Filter, ShieldCheck } from "lucide-react";

const benefits = [
  {
    icon: Calendar,
    title: "Software that runs the day",
    description: "Live booking, attendance, and schedules for Black, Blue, and Pink — always in sync with the front desk.",
  },
  {
    icon: Headphones,
    title: "Humans on every call",
    description: "Real receptionists answer, book, and reschedule. No AI voicebots. No frustrated clients.",
  },
  {
    icon: Filter,
    title: "Chaos filtered out",
    description: "Routine questions get handled. Only the work that needs your team reaches the floor.",
  },
  {
    icon: ShieldCheck,
    title: "Consultative onboarding",
    description: "We don't drop a login and leave. Strategy call, handover, and a front desk that knows your business.",
  },
];

export function BenefitsSection() {
  return (
    <section className="section-padding relative overflow-hidden bg-primary text-primary-foreground">
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 50% 80% at 0% 50%, hsl(var(--product-black) / 0.35), transparent),
            radial-gradient(ellipse 40% 60% at 100% 30%, hsl(340 60% 50% / 0.25), transparent)
          `,
        }}
      />
      <div className="container-wide relative">
        <div className="max-w-2xl mb-12">
          <span className="text-sm font-semibold uppercase tracking-wider opacity-80">The Bundle</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 mb-4 tracking-tight">
            Not just software. A virtual front desk.
          </h2>
          <p className="text-lg opacity-80">
            The value is the handover — platform plus people who keep your calendar full and your team focused.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur-sm p-6 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-primary-foreground/10 mb-4">
                <benefit.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm opacity-80 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
