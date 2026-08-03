import { Link, useSearchParams } from "react-router-dom";
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
  CheckCircle2,
  CalendarCheck,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { BUSINESS_TYPES, submitContactForm, type BusinessType } from "@/lib/contactForm";
import {
  SITE_ADDRESS_DISPLAY,
  SITE_CONTACT_EMAIL,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
} from "@/lib/siteContact";
import { WhatHappensNext } from "@/components/WhatHappensNext";
import {
  trackCtaClick,
  trackContactFormStart,
  trackContactFormSubmit,
  trackEmailClick,
  trackPhoneClick,
} from "@/lib/analytics";

function messageFromTopic(topic: string | null): string {
  if (topic === "pricing") {
    return "I’d like a tailored pricing quote for my business. Please include plan options and any receptionist / call-support add-ons that fit.";
  }
  return "";
}

/** Map ?type= / ?product= from product CTAs to the Business type select */
const TYPE_QUERY_MAP: Record<string, BusinessType> = {
  workshop: "Workshop",
  black: "Workshop",
  trade: "Trade",
  blue: "Trade",
  salon: "Salon",
  pink: "Salon",
  other: "Other",
};

function resolveBusinessType(raw: string | null): (typeof BUSINESS_TYPES)[number] | "" {
  if (!raw) return "";
  const trimmed = raw.trim();
  if ((BUSINESS_TYPES as readonly string[]).includes(trimmed)) {
    return trimmed as (typeof BUSINESS_TYPES)[number];
  }
  return TYPE_QUERY_MAP[trimmed.toLowerCase()] ?? "";
}

const emptyForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  product: "",
  currentProblem: "",
  preferredContactTime: "",
  message: "",
};

const Contact = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formStarted = useRef(false);
  const [formData, setFormData] = useState(() => ({
    ...emptyForm,
    message: messageFromTopic(searchParams.get("topic")),
  }));

  useEffect(() => {
    const fromQuery = resolveBusinessType(
      searchParams.get("type") || searchParams.get("product")
    );
    if (!fromQuery) return;
    setFormData((prev) =>
      prev.product === fromQuery ? prev : { ...prev, product: fromQuery }
    );
  }, [searchParams]);

  const markFormStarted = () => {
    if (formStarted.current) return;
    formStarted.current = true;
    trackContactFormStart(formData.product || undefined);
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
      await submitContactForm(
        {
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          product: formData.product,
          currentProblem: formData.currentProblem,
          preferredContactTime: formData.preferredContactTime,
          message: formData.message,
        },
        "BMS Pro walkthrough request"
      );
      trackContactFormSubmit(formData.product || "unspecified", true);
      setSubmitted(true);
      setFormData(emptyForm);
      formStarted.current = false;
      toast({
        title: "Walkthrough booked",
        description: "Thanks we'll get back within 24 hours.",
      });
    } catch (error) {
      trackContactFormSubmit(formData.product || "unspecified", false);
      toast({
        title: "Couldn't send your request",
        description:
          error instanceof Error
            ? error.message
            : `Please try again, or call ${SITE_PHONE_DISPLAY}.`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <SEO
        title="Book a BMS Pro Walkthrough | Contact"
        description={`Book a BMS Pro walkthrough tailored to Workshop, Trade, or Salon. Call ${SITE_PHONE_DISPLAY} or request a demo online.`}
        path="/contact"
        image="/logo.png"
      />

      <section className="relative bg-background -mt-16">
        <div className="relative min-h-[min(64vh,560px)] flex items-center overflow-hidden pt-16">
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

          <div className="container-wide relative z-10 py-14 sm:py-20 w-full">
            <div className="max-w-3xl mx-auto text-center text-white">
              <p className="font-label text-sm font-semibold tracking-[0.2em] uppercase text-white/55 mb-4 animate-fade-up">
                Contact
              </p>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 animate-fade-up delay-100 leading-[1.08]">
                Book a BMS Pro walkthrough
              </h1>
              <p className="font-sans text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-8 animate-fade-up delay-200 leading-relaxed">
                We&apos;ll tailor the session to how you work {" "}
                <span className="text-white/90 font-medium">BMS Pro Workshop</span>,{" "}
                <span className="text-white/90 font-medium">BMS Pro Trade</span>, or{" "}
                <span className="text-white/90 font-medium">BMS Pro Salon</span> and show the parts
                that matter for your bookings, jobs, and customer updates.
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
                        trackCtaClick("contact_hero", "Book My Walkthrough", "#demo")
                      }
                    >
                      Book My Walkthrough
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
                      href={`tel:${SITE_PHONE_TEL}`}
                      onClick={() => trackPhoneClick("contact_hero")}
                    >
                      Call {SITE_PHONE_DISPLAY}
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

        <div
          id="demo"
          className="container-wide relative -mt-10 sm:-mt-14 lg:-mt-16 pb-12 sm:pb-16 z-20 scroll-mt-24"
        >
          <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-start">
            <div className="lg:col-span-3 card-elevated p-5 sm:p-8 lg:p-10 border border-border/60 shadow-elevated">
              {submitted ? (
                <div className="py-8 sm:py-12 text-center max-w-md mx-auto">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
                    You&apos;re booked in
                  </h2>
                  <p className="font-sans text-muted-foreground mb-6 leading-relaxed">
                    Thanks for requesting a BMS Pro walkthrough. We&apos;ve received your details and
                    will contact you within 24 hours often sooner.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      size="lg"
                      className="rounded-full"
                      onClick={() => setSubmitted(false)}
                    >
                      Submit another request
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full" asChild>
                      <a href={`tel:${SITE_PHONE_TEL}`}>Call {SITE_PHONE_DISPLAY}</a>
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-6 sm:mb-8">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                      Walkthrough request
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2">
                      Tell us about your business
                    </h2>
                    <p className="font-sans text-muted-foreground">
                      Required fields are marked. We&apos;ll get back within 24 hours.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div className="space-y-1.5">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        autoComplete="name"
                        placeholder="Your full name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="h-11 rounded-xl"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="company">Business name</Label>
                      <Input
                        id="company"
                        name="organization"
                        autoComplete="organization"
                        placeholder="Your business name"
                        required
                        value={formData.company}
                        onChange={handleChange}
                        className="h-11 rounded-xl"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="you@business.com.au"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="h-11 rounded-xl"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="tel"
                          type="tel"
                          autoComplete="tel"
                          placeholder="04xx xxx xxx"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="h-11 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="product">Business type</Label>
                        <select
                          id="product"
                          required
                          className="flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          value={formData.product}
                          onChange={handleChange}
                        >
                          <option value="">Select business type</option>
                          {BUSINESS_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="currentProblem">Current problem</Label>
                        <select
                          id="currentProblem"
                          required
                          className="flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          value={formData.currentProblem}
                          onChange={handleChange}
                        >
                          <option value="">What needs fixing?</option>
                          <option value="Bookings">Bookings</option>
                          <option value="Jobs">Jobs</option>
                          <option value="Quotes">Quotes</option>
                          <option value="Staff scheduling">Staff scheduling</option>
                          <option value="Customer updates">Customer updates</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="preferredContactTime">Preferred contact time</Label>
                      <select
                        id="preferredContactTime"
                        required
                        className="flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        value={formData.preferredContactTime}
                        onChange={handleChange}
                      >
                        <option value="">Select a time</option>
                        <option value="Morning (8am–12pm)">Morning (8am–12pm)</option>
                        <option value="Afternoon (12pm–4pm)">Afternoon (12pm–4pm)</option>
                        <option value="Late afternoon (4pm–6pm)">Late afternoon (4pm–6pm)</option>
                        <option value="Anytime">Anytime</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="message">
                        Message{" "}
                        <span className="text-muted-foreground font-normal">(optional)</span>
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Anything else we should know before the walkthrough..."
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
                      {loading ? "Sending..." : "Book My Walkthrough"}
                      {!loading && <CalendarCheck className="h-4 w-4" />}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      By submitting you agree to our{" "}
                      <Link
                        to="/privacy"
                        className="underline underline-offset-2 hover:text-foreground"
                      >
                        Privacy Policy
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/terms"
                        className="underline underline-offset-2 hover:text-foreground"
                      >
                        Terms
                      </Link>
                      .
                    </p>
                  </form>
                </>
              )}
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
                href={`tel:${SITE_PHONE_TEL}`}
                onClick={() => trackPhoneClick("contact_sidebar")}
                className="card-elevated flex items-start gap-4 p-5 border border-border/60 shadow-elevated hover:border-primary/30 transition-colors"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground mb-0.5">Call us</p>
                  <p className="font-sans text-sm text-muted-foreground">{SITE_PHONE_DISPLAY}</p>
                </div>
              </a>

              <div className="card-elevated flex items-start gap-4 p-5 border border-border/60 shadow-elevated">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground mb-0.5">Visit us</p>
                  <p className="font-sans text-sm text-muted-foreground">
                    {SITE_ADDRESS_DISPLAY}
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
                      <a
                        href={`mailto:${SITE_CONTACT_EMAIL}`}
                        className="text-foreground underline underline-offset-2"
                      >
                        {SITE_CONTACT_EMAIL}
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What happens next — reduces hesitation */}
      <section
        id="what-happens-next"
        className="scroll-mt-24 section-padding bg-[hsl(220_18%_96%)]"
      >
        <div className="container-wide">
          <WhatHappensNext variant="light" />
          <p className="mt-8 text-center text-sm text-muted-foreground max-w-xl mx-auto">
            Prefer to talk first? Call{" "}
            <a
              href={`tel:${SITE_PHONE_TEL}`}
              onClick={() => trackPhoneClick("contact_what_next")}
              className="font-semibold text-foreground underline-offset-4 hover:underline"
            >
              {SITE_PHONE_DISPLAY}
            </a>{" "}
            or use the form above — same low-pressure process either way.
          </p>
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
