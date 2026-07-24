import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Code, 
  Palette, 
  CreditCard, 
  Globe, 
  Zap,
  Shield,
  FileJson
} from "lucide-react";

const features = [
  {
    icon: Code,
    title: "Simple Embed",
    description: "Add booking to your site with a single line of code. Works with any website platform.",
  },
  {
    icon: Palette,
    title: "Full Customization",
    description: "Match your brand colors, fonts, and style. Your booking, your look.",
  },
  {
    icon: CreditCard,
    title: "Stripe Payments",
    description: "Accept deposits and payments directly through the booking flow. Secure and seamless.",
  },
  {
    icon: Globe,
    title: "Multi-Language",
    description: "Serve international customers with built-in translation support.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized for speed. Your customers won't wait for slow loading times.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 compliant. Data encryption at rest and in transit. GDPR ready.",
  },
  {
    icon: FileJson,
    title: "REST API",
    description: "Full API access for custom integrations. Webhooks for real-time events.",
  },
];

const ProductBookingEngine = () => {
  return (
    <Layout>
      <SEO
        title="Booking Engine | Embeddable Booking Widget"
        description="A white-label, embeddable booking widget for your website. Stripe payments, full API access, and multi-language support."
        path="/products/booking-engine"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Booking Engine",
          description: "White-label, embeddable booking widget with Stripe payments and full API access.",
          brand: { "@type": "Brand", name: "BMS Pro" },
          url: "https://bmspros.com.au/products/booking-engine",
        }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden section-padding">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 to-background" />
        <div className="container-wide relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-foreground text-sm font-medium mb-6">
              Booking Engine
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Embed booking anywhere
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              A powerful, white-label booking widget that integrates with any website. Your availability, your payments, your brand — embedded in minutes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="default" size="xl" asChild>
                <Link to="/contact">
                  Embed Booking Engine
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/contact">View Documentation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-narrow">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Add booking in one line</h2>
            <p className="text-lg opacity-80">It really is that simple.</p>
          </div>
          <div className="rounded-xl bg-primary-foreground/10 p-6 font-mono text-sm overflow-x-auto">
            <code className="text-primary-foreground">
              {'<script src="https://booking.bmspro.com/embed.js" data-business="your-id"></script>'}
            </code>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Built for developers and businesses
            </h2>
            <p className="text-lg text-muted-foreground">
              Powerful enough for custom builds. Simple enough for anyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="card-elevated p-6 animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-secondary text-foreground mb-4">
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
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow">
          <div className="rounded-3xl bg-card border border-border p-8 md:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Ready to add booking to your site?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Get started with our documentation or talk to our team.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="xl" asChild>
                <Link to="/contact">Get Started</Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/contact">Read Docs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductBookingEngine;
