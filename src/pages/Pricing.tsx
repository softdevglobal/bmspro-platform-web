import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    description: "Perfect for solo operators and small teams just getting started.",
    price: "$29",
    period: "/month",
    features: [
      "Up to 2 staff members",
      "500 bookings/month",
      "Online booking page",
      "Client management",
      "Email reminders",
      "Basic reporting",
    ],
    cta: "Start Free Trial",
    variant: "outline" as const,
    popular: false,
  },
  {
    name: "Professional",
    description: "For growing businesses that need more power and flexibility.",
    price: "$79",
    period: "/month",
    features: [
      "Up to 10 staff members",
      "Unlimited bookings",
      "All Starter features",
      "SMS reminders",
      "Advanced analytics",
      "API access",
      "Priority support",
    ],
    cta: "Start Free Trial",
    variant: "default" as const,
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large organizations with complex requirements.",
    price: "Custom",
    period: "",
    features: [
      "Unlimited staff",
      "Unlimited bookings",
      "All Professional features",
      "Multi-location",
      "Custom integrations",
      "Dedicated support",
      "SLA guarantee",
      "Custom training",
    ],
    cta: "Contact Sales",
    variant: "outline" as const,
    popular: false,
  },
];

const Pricing = () => {
  return (
    <Layout>
      <SEO
        title="Pricing | BMS Pro Plans from $29/month"
        description="Simple, transparent pricing for BMS Pro. Starter, Professional, and Enterprise plans with a 14-day free trial. No credit card required."
        path="/pricing"
      />
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Pricing</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mt-2 mb-6">
              Simple, transparent pricing
            </h1>
            <p className="text-xl text-muted-foreground">
              Choose the plan that fits your business. All plans include a 14-day free trial.
            </p>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-10">
            Plans for every stage of growth
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative card-elevated p-8 flex flex-col animate-fade-up ${
                  plan.popular ? "border-2 border-primary" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    Most Popular
                  </span>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-teal flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button variant={plan.variant} size="lg" className="w-full" asChild>
                  <Link to="/contact">
                    {plan.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">
              Need a custom solution? Looking for multi-product bundles?
            </p>
            <Button variant="outline" asChild>
              <Link to="/contact">Talk to Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
