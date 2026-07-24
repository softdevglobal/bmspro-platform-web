import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
      
      <div className="container-wide relative section-padding">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8 animate-fade-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal"></span>
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              Now with FieldFlow mobile operations
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-up delay-100">
            One platform.
            <br />
            <span className="text-muted-foreground">Every booking. Every workflow.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up delay-200">
            BMS Pro is the complete booking and operations platform for service businesses. 
            From salon appointments to field operations, manage everything in one place.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-300">
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                Book a Demo
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="hero-secondary" size="xl" asChild>
              <Link to="/products">
                <Play className="h-5 w-5" />
                See How It Works
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 pt-8 border-t border-border animate-fade-up delay-400">
            <p className="text-sm text-muted-foreground mb-4">Trusted by service businesses worldwide</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              <div className="text-lg font-semibold text-foreground">10,000+ businesses</div>
              <div className="hidden sm:block h-4 w-px bg-border" />
              <div className="text-lg font-semibold text-foreground">2M+ bookings/month</div>
              <div className="hidden sm:block h-4 w-px bg-border" />
              <div className="text-lg font-semibold text-foreground">99.9% uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
