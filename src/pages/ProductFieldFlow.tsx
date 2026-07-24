import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Smartphone, 
  Wifi, 
  CheckSquare, 
  MapPin, 
  Camera,
  MessageSquare,
  WifiOff
} from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Built from the ground up for mobile. Fast, intuitive, and works on any device.",
  },
  {
    icon: Wifi,
    title: "Real-Time Updates",
    description: "Office and field stay in sync. Status changes appear instantly across all devices.",
  },
  {
    icon: CheckSquare,
    title: "Task Workflows",
    description: "Create custom checklists and workflows. Ensure every job is completed correctly.",
  },
  {
    icon: MapPin,
    title: "Location Tracking",
    description: "Know where your team is. Optimize routes and respond faster to urgent jobs.",
  },
  {
    icon: Camera,
    title: "Photo Documentation",
    description: "Capture before/after photos. Attach them to jobs for complete documentation.",
  },
  {
    icon: MessageSquare,
    title: "Team Communication",
    description: "In-app messaging between office and field. No more phone tag.",
  },
  {
    icon: WifiOff,
    title: "Offline Capability",
    description: "Works without internet. Changes sync automatically when back online.",
  },
];

const ProductFieldFlow = () => {
  return (
    <Layout>
      <SEO
        title="BMS Pro FieldFlow | Mobile Field Operations"
        description="Mobile-first workflow management for field teams. Real-time updates, task tracking, photo docs, and offline support."
        path="/products/fieldflow"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "BMS Pro FieldFlow",
          description: "Mobile-first workflow management for field teams with real-time updates and offline support.",
          brand: { "@type": "Brand", name: "BMS Pro" },
          url: "https://bmspros.com.au/products/fieldflow",
        }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden section-padding">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-light/50 to-background" />
        <div className="container-wide relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-light text-teal text-sm font-medium mb-6">
              BMS Pro FieldFlow
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Field operations, finally in sync
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Mobile-first workflow management for teams on the move. Real-time coordination between office and field, task tracking, and seamless communication.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="teal" size="xl" asChild>
                <Link to="/contact">
                  Explore FieldFlow
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/contact">Request Access</Link>
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
              Purpose-built for field teams
            </h2>
            <p className="text-lg text-muted-foreground">
              Every feature designed with mobile workers in mind.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="card-elevated p-6 animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-teal/10 text-teal mb-4">
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
          <div className="rounded-3xl bg-teal p-8 md:p-12 text-center text-teal-foreground">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to mobilize your field operations?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
              FieldFlow connects your office and field like never before.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="xl" className="bg-teal-foreground text-teal hover:bg-teal-foreground/90" asChild>
                <Link to="/contact">Request Access</Link>
              </Button>
              <Button variant="outline" size="xl" className="border-teal-foreground/30 text-teal-foreground hover:bg-teal-foreground/10" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductFieldFlow;
