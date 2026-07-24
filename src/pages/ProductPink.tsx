import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Calendar, 
  Users, 
  Clock, 
  BarChart3, 
  Bell, 
  Smartphone,
  Building2,
  Check 
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Online Booking Portal",
    description: "Let clients book 24/7 from your website, social media, or a dedicated booking page.",
  },
  {
    icon: Users,
    title: "Client Management",
    description: "Build detailed client profiles with booking history, preferences, and notes.",
  },
  {
    icon: Clock,
    title: "Staff Scheduling",
    description: "Manage staff availability, holidays, and working hours with an intuitive calendar.",
  },
  {
    icon: BarChart3,
    title: "Revenue Analytics",
    description: "Track bookings, revenue, and staff performance with real-time dashboards.",
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    description: "Automated SMS and email reminders reduce no-shows by up to 90%.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Manage your business on the go with our responsive admin interface.",
  },
  {
    icon: Building2,
    title: "Multi-Location",
    description: "Manage multiple salons or locations from a single dashboard.",
  },
];

const ProductPink = () => {
  return (
    <Layout>
      <SEO
        title="BMS Pro Pink | Booking Software for Salons & Spas"
        description="Appointment booking, client management, and staff scheduling for salons, spas, and personal service businesses."
        path="/products/pink"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "BMS Pro Pink",
          description: "Appointment booking, client management, and staff scheduling for salons, spas, and personal service businesses.",
          brand: { "@type": "Brand", name: "BMS Pro" },
          url: "https://bmspros.com.au/products/pink",
        }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden section-padding">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-light/50 to-background" />
        <div className="container-wide relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-light text-pink text-sm font-medium mb-6">
              BMS Pro Pink
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Appointment booking for salons that want to grow
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Beautiful, intuitive booking software designed specifically for salons, spas, and personal service businesses. Reduce no-shows, fill your calendar, and delight your clients.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="pink" size="xl" asChild>
                <Link to="/contact">
                  Start Free Trial
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/contact">View Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-secondary/30">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything you need to run your salon
            </h2>
            <p className="text-lg text-muted-foreground">
              From booking to analytics, BMS Pro Pink has you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="card-elevated p-6 animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-pink/10 text-pink mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="rounded-3xl bg-pink p-8 md:p-12 text-center text-pink-foreground">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to transform your salon bookings?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
              Join thousands of salons using BMS Pro Pink to grow their business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="xl" className="bg-pink-foreground text-pink hover:bg-pink-foreground/90" asChild>
                <Link to="/contact">Start Free Trial</Link>
              </Button>
              <Button variant="outline" size="xl" className="border-pink-foreground/30 text-pink-foreground hover:bg-pink-foreground/10" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductPink;
