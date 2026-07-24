import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "While we're with clients, their receptionists fill our calendar. Missed calls used to mean empty chairs — not anymore.",
    name: "Sarah Mitchell",
    role: "Owner, Serenity Hair Studio",
    product: "Pink",
    bar: "bg-pink",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 2,
    quote:
      "My electricians stay on the tools. The front desk books the jobs into Blue and only calls us when it's technical.",
    name: "James Walker",
    role: "Director, Walker Electrical Services",
    product: "Blue",
    bar: "bg-blue",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 3,
    quote:
      "Mechanics under the hood, not on the phone. Black plus a real receptionist filtered the chaos out of our workshop.",
    name: "Emily Chen",
    role: "Ops Lead, Northside Auto Group",
    product: "Black",
    bar: "bg-product-black",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
];

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-[hsl(220_18%_96%)] relative overflow-hidden">
      <div className="container-wide relative">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <span className="inline-flex rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground shadow-sm">
            Social Proof
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-4 tracking-tight">
            Teams who stopped missing calls
          </h2>
          <p className="text-lg text-muted-foreground">
            Workshops, salons, and trades running BMS Pro with a real human front desk.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 lg:gap-5">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="relative overflow-hidden rounded-3xl border border-border/50 bg-white p-7 sm:p-8 flex flex-col shadow-elevated animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`absolute top-0 inset-x-0 h-1 ${testimonial.bar}`} aria-hidden />
              <div className="flex items-center justify-between mb-4">
                <Quote className="h-7 w-7 text-muted-foreground/35" />
                <span className={`text-[10px] font-bold uppercase tracking-wider text-white px-2.5 py-1 rounded-full ${testimonial.bar}`}>
                  {testimonial.product}
                </span>
              </div>

              <blockquote className="text-foreground leading-relaxed mb-6 flex-grow">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-border"
                />
                <div>
                  <p className="font-medium text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
