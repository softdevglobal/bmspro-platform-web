import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "BMS Pro transformed how we manage our salon appointments. Our no-show rate dropped by 60% and our clients love the easy booking experience.",
    name: "Sarah Mitchell",
    role: "Owner, Serenity Hair Studio",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 2,
    quote: "As a trades business, scheduling was always chaotic. Now my team knows exactly where they need to be, and our customers get automatic updates. Game changer.",
    name: "James Walker",
    role: "Director, Walker Electrical Services",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 3,
    quote: "The booking engine integrated seamlessly into our website. Within the first month, we saw a 40% increase in online bookings. The team support has been exceptional.",
    name: "Emily Chen",
    role: "Practice Manager, Mindful Wellness Clinic",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
];

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Trusted by Thousands
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-4">
            Real Stories from Real Businesses
          </h2>
          <p className="text-muted-foreground text-lg">
            Hear from business owners who have transformed their operations with BMS Pro.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="card-elevated p-8 flex flex-col animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <Quote className="h-8 w-8 text-primary/30 mb-4" />
              
              {/* Quote Text */}
              <blockquote className="text-foreground leading-relaxed mb-6 flex-grow">
                "{testimonial.quote}"
              </blockquote>
              
              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/10"
                />
                <div>
                  <p className="font-medium text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">Trusted by over 10,000 businesses across Australia</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-2xl font-semibold text-foreground">4.9★</div>
            <div className="h-8 w-px bg-border" />
            <div className="text-sm text-muted-foreground">500+ Reviews</div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div className="text-sm text-muted-foreground hidden sm:block">Featured in Business Australia</div>
          </div>
        </div>
      </div>
    </section>
  );
}
