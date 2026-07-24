import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { ArrowLeft, Target, Users, Lightbulb, Heart } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "We're committed to simplifying business operations for service industries across Australia.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Continuously evolving our platform to meet the changing needs of modern businesses.",
  },
  {
    icon: Users,
    title: "Customer Focus",
    description: "Your success is our success. We build solutions that make a real difference.",
  },
  {
    icon: Heart,
    title: "Reliability",
    description: "Dependable software you can count on, backed by dedicated Australian support.",
  },
];

const stats = [
  { value: "10,000+", label: "Businesses Served" },
  { value: "500K+", label: "Bookings Processed Monthly" },
  { value: "99.9%", label: "Uptime Guarantee" },
  { value: "24/7", label: "Australian Support" },
];

export default function About() {
  return (
    <Layout>
      <SEO
        title="About BMS Pro | Built for Australian Service Businesses"
        description="Learn about BMS Pro, the team behind the unified booking and operations platform for salons, trades, and field teams in Australia."
        path="/about"
      />
      <div className="container-wide py-16 md:py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Hero Section */}
        <div className="max-w-4xl mb-16">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full mb-4">
            About Us
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Empowering Australian Businesses Since 2018
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            BMS Pro was founded with a simple mission: to provide service businesses with 
            powerful, easy-to-use software that streamlines operations and drives growth. 
            Today, we're proud to serve thousands of businesses across Australia.
          </p>
        </div>

        {/* Our Story */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">Our Story</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="mb-4">
              BMS Pro started when our founders, experienced professionals in the service industry, 
              recognized a gap in the market for comprehensive, affordable business management software 
              tailored to Australian businesses.
            </p>
            <p className="mb-4">
              What began as a solution for a handful of local trades businesses has grown into a 
              complete suite of products serving industries from pest control and cleaning to 
              healthcare and professional services.
            </p>
            <p>
              Based in Melbourne, our team of dedicated developers, support specialists, and industry 
              experts work tirelessly to ensure BMS Pro remains the go-to solution for service 
              businesses that want to work smarter, not harder.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="p-6 rounded-lg border border-border bg-card">
                <value.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="mb-16 py-12 px-8 rounded-2xl bg-primary/5 border border-primary/10">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">BMS Pro by the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Join thousands of Australian businesses already using BMS Pro to streamline their operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Book a Demo
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-accent transition-colors"
            >
              View Products
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
