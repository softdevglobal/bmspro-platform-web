import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  CalendarCheck, 
  Users, 
  FileText, 
  MapPin, 
  Wallet,
  BarChart3,
  Clock
} from "lucide-react";

const features = [
  {
    icon: CalendarCheck,
    title: "Job Scheduling",
    description: "Schedule jobs with drag-and-drop simplicity. See team availability at a glance.",
  },
  {
    icon: Users,
    title: "Technician Management",
    description: "Assign jobs based on skills, location, and availability. Track performance metrics.",
  },
  {
    icon: FileText,
    title: "Quotes & Invoices",
    description: "Create professional quotes on-site. Convert to invoices with one click.",
  },
  {
    icon: MapPin,
    title: "Route Optimization",
    description: "Minimize travel time with smart routing. Reduce fuel costs and increase jobs per day.",
  },
  {
    icon: Wallet,
    title: "Job Costing",
    description: "Track materials, labor, and margins. Know your true profitability on every job.",
  },
  {
    icon: BarChart3,
    title: "Business Analytics",
    description: "Revenue forecasts, utilization rates, and performance dashboards.",
  },
  {
    icon: Clock,
    title: "Time Tracking",
    description: "Automatic clock-in/out for field staff. Accurate timesheets, every time.",
  },
];

const ProductBlue = () => {
  return (
    <Layout>
      <SEO
        title="BMS Pro Blue | Job Scheduling for Trades & Services"
        description="Job scheduling, dispatch, quotes, and invoicing for trades and service businesses. Track every job end-to-end."
        path="/products/blue"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "BMS Pro Blue",
          description: "Job scheduling, dispatch, quotes, and invoicing for trades and service businesses.",
          brand: { "@type": "Brand", name: "BMS Pro" },
          url: "https://bmspros.com.au/products/blue",
        }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden section-padding">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-light/50 to-background" />
        <div className="container-wide relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-light text-blue text-sm font-medium mb-6">
              BMS Pro Blue
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Job management built for trades and contractors
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              From first contact to final invoice, manage every aspect of your service business. Scheduling, dispatch, quotes, and customer management — all in one place.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="blue" size="xl" asChild>
                <Link to="/contact">
                  Book a Demo
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/contact">See How It Works</Link>
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
              Run a tighter operation
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to dispatch smarter, invoice faster, and grow profitably.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="card-elevated p-6 animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-blue/10 text-blue mb-4">
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
          <div className="rounded-3xl bg-blue p-8 md:p-12 text-center text-blue-foreground">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to scale your service business?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
              See why thousands of trades and contractors trust BMS Pro Blue.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="xl" className="bg-blue-foreground text-blue hover:bg-blue-foreground/90" asChild>
                <Link to="/contact">Book a Demo</Link>
              </Button>
              <Button variant="outline" size="xl" className="border-blue-foreground/30 text-blue-foreground hover:bg-blue-foreground/10" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductBlue;
