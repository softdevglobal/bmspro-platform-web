import { Calendar, Eye, Clock, FileCheck } from "lucide-react";

const benefits = [
  {
    icon: Calendar,
    title: "Centralised Booking",
    description: "One system for all appointments, jobs, and schedules. No more double-bookings or missed opportunities.",
  },
  {
    icon: Eye,
    title: "Operational Visibility",
    description: "Real-time dashboards showing your business performance, team utilization, and revenue metrics.",
  },
  {
    icon: Clock,
    title: "Faster Scheduling",
    description: "Automated availability management and smart scheduling reduces booking time by 80%.",
  },
  {
    icon: FileCheck,
    title: "Reduced Admin Work",
    description: "Automate confirmations, reminders, and follow-ups. Let your team focus on what matters.",
  },
];

export function BenefitsSection() {
  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-semibold uppercase tracking-wider opacity-80">Key Benefits</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">
            Less hassle. More growth.
          </h2>
          <p className="text-lg opacity-80">
            Focus on delivering great service while BMS Pro handles the operational complexity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="text-center animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-primary-foreground/10 mb-4">
                <benefit.icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm opacity-80">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
