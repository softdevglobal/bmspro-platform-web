import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Headphones,
} from "lucide-react";
import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "@/lib/contactForm";
import { SITE_CONTACT_EMAIL } from "@/lib/siteContact";
import {
  trackCtaClick,
  trackEmailClick,
  trackEvent,
  trackPhoneClick,
} from "@/lib/analytics";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const formStarted = useRef(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    product: "",
    message: "",
  });

  const markFormStarted = () => {
    if (formStarted.current) return;
    formStarted.current = true;
    trackEvent("contact_form_start");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    markFormStarted();
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitContactForm(formData, "Contact / demo request BMS Pro");
      trackEvent("contact_form_submit", {
        product: formData.product || "unspecified",
        success: true,
      });
      toast({
        title: "Message sent",
        description: "Thanks we'll get back within 24 hours.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        product: "",
        message: "",
      });
      formStarted.current = false;
    } catch (error) {
      trackEvent("contact_form_submit", {
        product: formData.product || "unspecified",
        success: false,
      });
      toast({
        title: "Couldn’t send message",
        description:
          error instanceof Error ? error.message : "Please try again shortly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <SEO
        title="Contact BMS Pro | Book a Demo"
        description="Talk to the BMS Pro team. Book a demo, ask about pricing, or get help choosing the right product. Based in Lynbrook, Victoria."
        path="/contact"
      />

      {/* Full-bleed image hero */}
      <section className="relative bg-background -mt-16">
        <div className="relative min-h-[min(72vh,640px)] flex items-center overflow-hidden pt-16">
          <div className="absolute inset-0 grid grid-cols-1 sm:grid-cols-3" aria-hidden>
            <img
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=900&h=1200&fit=crop"
              alt=""
              className="h-full w-full object-cover scale-110 blur-xs sm:blur-sm min-h-[220px]"
            />
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&h=1200&fit=crop"
              alt=""
              className="hidden sm:block h-full w-full object-cover scale-110 blur-sm"
            />
            <img
              src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=900&h=1200&fit=crop"
              alt=""
              className="hidden sm:block h-full w-full object-cover scale-110 blur-sm"
            />
          </div>
          <div className="absolute inset-0 bg-[hsl(220_22%_6%/0.62)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_22%_6%/0.45)] via-[hsl(220_22%_6%/0.35)] to-[hsl(220_22%_6%/0.82)]" />

          <div className="container-wide relative z-10 py-16 sm:py-20 w-full">
            <div className="max-w-3xl mx-auto text-center text-white">
              <p className="font-label text-sm font-semibold tracking-[0.2em] uppercase text-white/55 mb-4 animate-fade-up">
                Contact
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 animate-fade-up delay-100 leading-[1.05]">
                Let&apos;s talk about your business
              </h1>
              <p className="font-sans text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-8 animate-fade-up delay-200 leading-relaxed">
                Book a strategy call we&apos;ll show the software, explain the receptionist
                handover, and match you to Workshop, Trade, or Salon.
              </p>

              <div className="flex flex-col items-center gap-4 animate-fade-up delay-300">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto">
                  <Button
                    size="xl"
                    className="rounded-full w-full sm:w-auto bg-white text-[hsl(220_22%_10%)] hover:bg-white/90 shadow-lg"
                    asChild
                  >
                    <a
                      href="#demo"
                      onClick={() =>
                        trackCtaClick("contact_hero", "Book a Demo", "#demo")
                      }
                    >
                      Book a Demo
                      <ArrowRight className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button
                    size="xl"
                    variant="outline"
                    className="rounded-full w-full sm:w-auto border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
                    asChild
                  >
                    <a
                      href="tel:0387973795"
                      onClick={() => trackPhoneClick("contact_hero")}
                    >
                      Call 03 8797 3795
                    </a>
                  </Button>
                </div>

                <div className="inline-flex items-start sm:items-center gap-2.5 max-w-lg rounded-2xl border border-white/25 bg-white/10 backdrop-blur-md px-4 py-3 text-left">
                  <ShieldCheck className="h-5 w-5 text-teal shrink-0 mt-0.5 sm:mt-0" />
                  <p className="text-sm font-semibold text-white leading-snug">
                    100% Real Human Receptionists.{" "}
                    <span className="text-white/70 font-medium">
                      No AI Voicebots. No Frustrated Clients.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Demo form + contact cards overlapping hero */}
        <div
          id="demo"
          className="container-wide relative -mt-10 sm:-mt-14 lg:-mt-16 pb-12 sm:pb-16 z-20 scroll-mt-24"
        >
          <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-start">
            <div className="lg:col-span-3 card-elevated p-6 sm:p-8 lg:p-10 border border-border/60 shadow-elevated">
              <div className="mb-6 sm:mb-8">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Strategy call
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2">
                  Book a Demo
                </h2>
                <p className="font-sans text-muted-foreground">
                  Tell us a bit about your business we&apos;ll get back within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="firstName">First name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="h-11 rounded-xl"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input
                      id="lastName"
                      placeholder="Smith"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="h-11 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email">Work email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="h-11 rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="company">Company name</Label>
                  <Input
                    id="company"
                    placeholder="Acme Inc"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="h-11 rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="product">Product interest</Label>
                  <select
                    id="product"
                    className="flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={formData.product}
                    onChange={handleChange}
                  >
                    <option value="">Select a product</option>
                    <option value="black">BMS Pro Workshop</option>
                    <option value="pink">BMS Pro Salon</option>
                    <option value="blue">BMS Pro Trade</option>
                    <option value="all">Full Platform</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="message">
                    Message <span className="text-muted-foreground font-normal">(optional)</span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your business needs..."
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="rounded-xl resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12 rounded-full text-base font-semibold"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Request Demo"}
                  <ArrowRight className="h-4 w-4" />
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By submitting you agree to our{" "}
                  <Link to="/privacy" className="underline underline-offset-2 hover:text-foreground">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link to="/terms" className="underline underline-offset-2 hover:text-foreground">
                    Terms
                  </Link>
                  .
                </p>
              </form>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <a
                href={`mailto:${SITE_CONTACT_EMAIL}`}
                onClick={() => trackEmailClick("contact_sidebar")}
                className="card-elevated flex items-start gap-4 p-5 border border-border/60 shadow-elevated hover:border-primary/30 transition-colors"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground mb-0.5">Email us</p>
                  <p className="font-sans text-sm text-muted-foreground">{SITE_CONTACT_EMAIL}</p>
                </div>
              </a>

              <a
                href="tel:0387973795"
                onClick={() => trackPhoneClick("contact_sidebar")}
                className="card-elevated flex items-start gap-4 p-5 border border-border/60 shadow-elevated hover:border-primary/30 transition-colors"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground mb-0.5">Call us</p>
                  <p className="font-sans text-sm text-muted-foreground">03 8797 3795</p>
                </div>
              </a>

              <div className="card-elevated flex items-start gap-4 p-5 border border-border/60 shadow-elevated">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground mb-0.5">Visit us</p>
                  <p className="font-sans text-sm text-muted-foreground">
                    12 Stelvio Close, Lynbrook VIC 3975
                  </p>
                </div>
              </div>

              <div className="card-elevated p-5 border border-border/60 shadow-elevated bg-secondary/40">
                <div className="flex items-start gap-3">
                  <Headphones className="h-5 w-5 text-foreground shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-display font-semibold text-foreground mb-1">
                      Looking for support?
                    </h3>
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                      Existing customers can reach us through the dashboard or at{" "}
                      {SITE_CONTACT_EMAIL}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-secondary/30 pb-16 sm:pb-24">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <span className="eyebrow inline-flex rounded-full border border-border bg-background/80 px-3 py-1 text-muted-foreground">
              Location
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mt-4 mb-2 tracking-tight">
              Based in Lynbrook, Victoria
            </h2>
            <p className="font-sans text-muted-foreground">
              Drop by or book a call we&apos;re here for workshops, salons, and trades across
              Australia.
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden border border-border/60 shadow-elevated">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3144.8876!2d145.2563!3d-38.0558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad61513f6ec0c9f%3A0x4e25c5c5c5c5c5c5!2s12%20Stelvio%20Cl%2C%20Lynbrook%20VIC%203975!5e0!3m2!1sen!2sau!4v1700000000000!5m2!1sen!2sau"
              width="100%"
              height="360"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="BMS Pro Office Location"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
