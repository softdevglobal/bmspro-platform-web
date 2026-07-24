import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ArrowRight,
  Hammer,
  Users,
  MessageSquare,
  CreditCard,
  ClipboardList,
  Briefcase,
  CalendarDays,
  UserRound,
  FileText,
  Building,
  Globe,
  Headphones,
  Bell,
  Megaphone,
  ScrollText,
  LayoutDashboard,
  Settings,
  Smartphone,
  Wrench,
  ShieldCheck,
  LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type FeatureModule = {
  id: string;
  number: string;
  title: string;
  who: string;
  icon: LucideIcon;
  summary: string;
  points: string[];
  image?: string;
};

const featureModules: FeatureModule[] = [
  {
    id: "workflow",
    number: "01",
    title: "Core workflow",
    who: "Business owners · Modules you can turn on as you grow",
    icon: Briefcase,
    summary:
      "Run your trade business from request to paid invoice: Requests → Quotations → Jobs → Invoices.",
    points: [
      "Start with service and inspection requests",
      "Send quotations when you’re ready to price the work",
      "Turn approved work into jobs for the team",
      "Invoice when the job is done",
      "Quotations, jobs, and invoices can be switched on per business",
    ],
    image: "/products/blue/quotes.png",
  },
  {
    id: "services",
    number: "02",
    title: "Services",
    who: "Owners set the menu · Ready-made trade templates to start",
    icon: Wrench,
    summary:
      "Build the services you offer — name, description, price, duration, and photo — or start from trade templates.",
    points: [
      "Add, edit, or remove services anytime",
      "Price, duration, and image for each service",
      "Start from platform templates for your trade",
      "Powers Book Now, requests, quotes, and jobs",
    ],
    image: "/products/blue/jobs.png",
  },
  {
    id: "requests",
    number: "03",
    title: "Requests",
    who: "Owners in the office · Staff on mobile · Customers online",
    icon: ClipboardList,
    summary:
      "Capture service and inspection requests — schedule them, create the customer if needed, and feed calendar, quotes, and jobs.",
    points: [
      "Add requests from the office dashboard",
      "Pick a service, time, and customer contact",
      "Track pending, scheduled, completed, and cancelled",
      "Comes in from Book Now, the office, or mobile",
    ],
    image: "/products/blue/hero.png",
  },
  {
    id: "jobs",
    number: "04",
    title: "Jobs",
    who: "Owners manage · Staff execute on mobile",
    icon: Hammer,
    summary:
      "A job board for work that moves from requests and quotations — with duration estimates, status, and photos.",
    points: [
      "See jobs progressing from request or quote",
      "Duration presets for scheduling",
      "Status updates and job images",
      "Turn on when your business is ready for jobs",
    ],
    image: "/products/blue/jobs.png",
  },
  {
    id: "calendar",
    number: "05",
    title: "Calendar & capacity",
    who: "Business owners",
    icon: CalendarDays,
    summary:
      "One calendar for requests, jobs, personal events, and closures — plus working hours that drive Book Now slots.",
    points: [
      "Requests, jobs, personal events, and closures together",
      "Set working hours and slot capacity",
      "Book Now only offers times you can take",
    ],
    image: "/products/blue/quotes.png",
  },
  {
    id: "quotes-invoices",
    number: "06",
    title: "Quotes, invoices & items",
    who: "Owners · Customers view PDFs online · Staff with quote permission",
    icon: FileText,
    summary:
      "Draft and send quotations and invoices as PDFs — with a reusable priced item list for faster quoting.",
    points: [
      "Quotations: draft, edit, send, PDF preview",
      "Invoices: draft, edit, send, mark paid",
      "Reusable line items with price and image",
      "Email or SMS when you send a quote",
    ],
    image: "/products/blue/quotes.png",
  },
  {
    id: "customers",
    number: "07",
    title: "Customers",
    who: "Business owners",
    icon: UserRound,
    summary:
      "Keep every customer in one place — reused across requests, quotes, invoices, and texts.",
    points: [
      "Name, phone, email, notes, and status",
      "Created from requests and Book Now",
      "Customers can log in on Book Now for history and docs",
    ],
  },
  {
    id: "staff",
    number: "08",
    title: "Staff",
    who: "Owners manage the team · Staff use the phone app",
    icon: Users,
    summary:
      "Add your team, set rosters, approve leave, and export timesheets. Staff work from mobile — not the web admin.",
    points: [
      "Create logins with welcome emails",
      "Weekly roster and plan staff limits",
      "Attendance clock-in/out and timesheet export",
      "Leave approve or reject",
      "Permission flags (e.g. can create quotations)",
    ],
    image: "/products/blue/hero.png",
  },
  {
    id: "sms",
    number: "09",
    title: "Text messages",
    who: "Owners send texts and buy credits",
    icon: MessageSquare,
    summary:
      "Text customers from the business. Some plans include credits; top up anytime when you need more.",
    points: [
      "Credits included with some plans",
      "Buy extra packs that sit on top of the bundle",
      "Custom messages to customers",
      "See sent, failed, and skipped in the log",
    ],
  },
  {
    id: "billing",
    number: "10",
    title: "Plans & billing",
    who: "Owners pay and change plans · Platform sets the options",
    icon: CreditCard,
    summary:
      "Choose a plan that fits your team size — trials, staff limits, optional SMS, and secure online payment.",
    points: [
      "Clear pricing in Australian dollars",
      "Upgrade or downgrade (downgrade blocked if over staff limit)",
      "Trial and payment reminders when you need them",
      "Sign up and pick a plan yourself",
    ],
  },
  {
    id: "book-now",
    number: "11",
    title: "Online booking",
    who: "Your customers book online · You control the link",
    icon: Globe,
    summary:
      "A public booking page for your trade — customers request services and pick available slots.",
    points: [
      "Your own booking link and slug",
      "Customers pick services and available times",
      "Account for profile, history, requests, and PDFs",
      "Logo, terms, hours, and service areas in settings",
    ],
    image: "/products/blue/jobs.png",
  },
  {
    id: "notifications",
    number: "12",
    title: "Notifications",
    who: "Owners · Staff on mobile",
    icon: Bell,
    summary:
      "Bell and toasts for new requests, leave, support chats, announcements, and billing reminders.",
    points: [
      "New service requests",
      "Leave requests from staff",
      "Support chat inbound",
      "Platform announcements and trial signals",
    ],
  },
  {
    id: "broadcasts",
    number: "13",
    title: "Announcements",
    who: "Platform team sends · Businesses receive",
    icon: Megaphone,
    summary:
      "Important updates to owners — or staff and owners — on admin and mobile.",
    points: [
      "Titled announcements for admin and/or mobile",
      "Owners only, or staff & owners",
      "In-app notices you won’t miss",
    ],
  },
  {
    id: "audit",
    number: "14",
    title: "Activity history",
    who: "Owners for their business · Platform for the network",
    icon: ScrollText,
    summary:
      "A clear record of what changed — requests, services, staff, customers, and settings.",
    points: [
      "Creates, updates, deletes, and status changes",
      "Filter and search what happened",
      "Platform view for onboard and plan changes",
    ],
  },
  {
    id: "dashboards",
    number: "15",
    title: "Dashboards",
    who: "Business owners · Platform overview",
    icon: LayoutDashboard,
    summary:
      "Today’s KPIs, quick actions, Book Now link, and calendar — or platform health for BMS Pro.",
    points: [
      "Owner Today: KPIs, notifications, support chat",
      "Calendar week/day for requests and jobs",
      "Platform overview: tenants and plan mix",
    ],
  },
  {
    id: "settings",
    number: "16",
    title: "Settings",
    who: "Business owners",
    icon: Settings,
    summary:
      "Business profile, hours, GST, terms, Book Now link, and module toggles for quotes, invoices, and jobs.",
    points: [
      "Name, ABN, address, phone, logo, service areas",
      "Working hours and slot capacity",
      "Turn quotations, invoices, and jobs on or off",
      "Change password and sign in securely",
    ],
  },
  {
    id: "support",
    number: "17",
    title: "Support chat",
    who: "Business owners · Support agents",
    icon: Headphones,
    summary:
      "Chat with support from a floating button on the dashboard when you need help.",
    points: [
      "Open chat from the dashboard",
      "Agents claim, transfer, or close",
      "Presence so you know someone’s there",
    ],
  },
  {
    id: "onboarding",
    number: "18",
    title: "Getting started",
    who: "We set you up — or you sign up yourself",
    icon: Building,
    summary:
      "Self-serve onboard with a plan, or the BMS Pro team brings your trade business online with a booking link ready to share.",
    points: [
      "Plumbing, electrical, HVAC, gas, cleaning, landscaping, carpentry, and more",
      "Australian business details and ABN",
      "Plan, trial, and your public booking link",
    ],
  },
];

const roles = [
  {
    title: "Business owner",
    blurb: "Full control — requests, quotes, jobs, invoices, staff, SMS, and settings.",
    icon: Hammer,
  },
  {
    title: "Staff",
    blurb: "Mobile-first — check in, leave, and run jobs on the tools. No web admin login.",
    icon: Smartphone,
  },
  {
    title: "Platform team",
    blurb: "Onboards businesses, plans, SMS packages, and announcements.",
    icon: Building,
  },
  {
    title: "Support agents",
    blurb: "Help via chat APIs — look up tenants, services, and quotes when needed.",
    icon: Headphones,
  },
];

const ProductBlue = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    product: "blue",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: { ...formData, product: "blue" },
      });
      if (error) throw error;
      toast({
        title: "Demo request sent!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        product: "blue",
        message: "",
      });
    } catch {
      toast({
        title: "Error sending message",
        description: "Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <SEO
        title="BMS Pro Blue | Trade & Field Service Management"
        description="Trade software for plumbers, electricians, HVAC, and more — requests, quotes, jobs, invoices, staff, SMS, and online booking."
        path="/products/blue"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "BMS Pro Blue",
          description:
            "Multi-tenant trade and field-service software — requests, quotations, jobs, invoices, staff, SMS, and Book Now.",
          brand: { "@type": "Brand", name: "BMS Pro" },
          url: "https://bmspros.com.au/products/blue",
        }}
      />

      {/* Full-bleed image hero — matches home / Black language */}
      <section className="relative bg-background -mt-16">
        <div className="relative min-h-[min(88vh,780px)] flex items-center overflow-hidden pt-16">
          <div className="absolute inset-0" aria-hidden>
            <img
              src="/products/blue/hero.png"
              alt=""
              className="absolute inset-0 h-full w-full object-cover scale-105 blur-[1px]"
            />
            <div className="absolute inset-0 bg-[hsl(220_22%_6%/0.62)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_22%_6%/0.45)] via-[hsl(220_22%_6%/0.35)] to-[hsl(220_22%_6%/0.82)]" />
          </div>

          <div className="container-wide relative z-10 py-16 sm:py-20 w-full">
            <div className="max-w-3xl mx-auto text-center text-white">
              <div className="inline-flex items-center gap-2.5 mb-6 animate-fade-up">
                <img
                  src="/products/blue/icon.png"
                  alt=""
                  className="h-9 w-9 rounded-lg ring-1 ring-white/25"
                />
                <span className="font-label text-sm font-semibold tracking-[0.16em] uppercase text-white/90">
                  BMS Pro Blue
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 animate-fade-up delay-100 leading-[1.05]">
                Keep trades on the tools.
              </h1>

              <p className="font-sans text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-8 animate-fade-up delay-200 leading-relaxed">
                Requests, quotes, jobs, and invoices in one place — so plumbers, electricians, and
                field teams stay on site, not buried in admin.
              </p>

              <div className="flex flex-col items-center gap-4 animate-fade-up delay-300">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto">
                  <Button
                    size="xl"
                    className="rounded-full w-full sm:w-auto bg-white text-[hsl(220_22%_10%)] hover:bg-white/90 shadow-lg"
                    asChild
                  >
                    <a href="#demo">
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
                    <a href="#features">See what&apos;s included</a>
                  </Button>
                </div>

                <div className="inline-flex items-start sm:items-center gap-2.5 max-w-lg rounded-2xl border border-white/25 bg-white/10 backdrop-blur-md px-4 py-3 text-left">
                  <ShieldCheck className="h-5 w-5 text-teal shrink-0 mt-0.5 sm:mt-0" />
                  <p className="text-sm font-semibold text-white leading-snug">
                    Built for trades &amp; field service.{" "}
                    <span className="text-white/70 font-medium">
                      Plumbing, electrical, HVAC &amp; more.
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-2 animate-fade-up delay-400">
                {["Requests", "Quotes", "Jobs", "Invoices", "Calendar", "Online booking"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="inline-flex rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1.5 text-sm font-label font-semibold text-white"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Demo form card — light elevated panel overlapping hero */}
        <div
          id="demo"
          className="container-wide relative -mt-10 sm:-mt-14 lg:-mt-16 pb-12 sm:pb-16 z-20 scroll-mt-24"
        >
          <div className="max-w-xl mx-auto card-elevated p-6 sm:p-8 lg:p-10 border border-border/60 shadow-elevated">
            <div className="mb-6 sm:mb-8 text-center sm:text-left">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-light text-blue px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-3">
                <Hammer className="h-3 w-3" />
                Trades &amp; field service
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2">
                Book a Demo
              </h2>
              <p className="font-sans text-muted-foreground">
                Request a walkthrough of BMS Pro Blue for your trade business.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    placeholder="James"
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
                    placeholder="Nguyen"
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
                  placeholder="james@trades.com.au"
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
                  placeholder="Nguyen Plumbing"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  className="h-11 rounded-xl"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="message">
                  Message <span className="text-muted-foreground font-normal">(optional)</span>
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your trade business..."
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="rounded-xl resize-none"
                />
              </div>
              <Button
                type="submit"
                variant="blue"
                size="lg"
                className="w-full h-12 rounded-full text-base font-semibold"
                disabled={loading}
              >
                {loading ? "Sending..." : "Request Demo"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              By continuing you agree to our{" "}
              <Link to="/terms" className="underline underline-offset-2 hover:text-foreground">
                Terms
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="underline underline-offset-2 hover:text-foreground">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Features — light home-style section */}
      <section id="features" className="section-padding bg-secondary/30 scroll-mt-20">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center mb-12 lg:mb-14">
            <span className="eyebrow inline-flex rounded-full border border-border bg-background/80 px-3 py-1 text-muted-foreground">
              What you get
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-3 tracking-tight">
              Everything that runs a modern trade business
            </h2>
            <p className="font-sans text-lg text-muted-foreground">
              From request to invoice — with calendar, staff, SMS, and online booking for field
              teams.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5">
            {featureModules.map((mod, index) => {
              const Icon = mod.icon;
              return (
                <article
                  key={mod.id}
                  id={mod.id}
                  className="group relative overflow-hidden rounded-3xl min-h-[320px] flex flex-col border border-border/40 shadow-elevated scroll-mt-24 animate-fade-up"
                  style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
                >
                  {mod.image ? (
                    <>
                      <img
                        src={mod.image}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220_22%_6%/0.92)] via-[hsl(220_22%_6%/0.45)] to-[hsl(220_22%_6%/0.15)]" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-light via-card to-secondary" />
                  )}

                  <div
                    className={`relative flex flex-col flex-grow p-6 sm:p-7 ${
                      mod.image ? "text-white" : "text-foreground"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-label font-bold uppercase tracking-wider ${
                          mod.image
                            ? "bg-white text-[hsl(220_22%_10%)]"
                            : "bg-blue text-white"
                        }`}
                      >
                        <Icon className="h-3 w-3" />
                        {mod.number}
                      </span>
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${
                          mod.image ? "text-white/50" : "text-muted-foreground"
                        }`}
                      >
                        Blue
                      </span>
                    </div>

                    <div className="mt-auto">
                      <h3 className="font-display text-xl font-bold tracking-tight mb-2">
                        {mod.title}
                      </h3>
                      <p
                        className={`text-xs mb-3 ${
                          mod.image ? "text-white/55" : "text-muted-foreground"
                        }`}
                      >
                        {mod.who}
                      </p>
                      <p
                        className={`text-sm leading-relaxed mb-4 ${
                          mod.image ? "text-white/75" : "text-muted-foreground"
                        }`}
                      >
                        {mod.summary}
                      </p>
                      <ul className="space-y-2">
                        {mod.points.slice(0, 4).map((point) => (
                          <li
                            key={point}
                            className={`flex items-start gap-2.5 text-sm ${
                              mod.image ? "text-white/85" : "text-muted-foreground"
                            }`}
                          >
                            <span
                              className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${
                                mod.image ? "bg-white/50" : "bg-blue/40"
                              }`}
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-12">
            <span className="eyebrow inline-flex rounded-full border border-border bg-secondary/60 px-3 py-1 text-muted-foreground">
              Who it&apos;s for
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-4 mb-3 tracking-tight">
              The right tools for each role
            </h2>
            <p className="font-sans text-muted-foreground">
              Owners in the office. Staff on the tools with the phone app.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {roles.map((role, index) => {
              const Icon = role.icon;
              return (
                <div
                  key={role.title}
                  className="card-elevated p-6 animate-fade-up"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue/10 text-blue mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {role.title}
                  </h3>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                    {role.blurb}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA — photo-backed like home */}
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0" aria-hidden>
          <img
            src="/products/blue/hero.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover scale-110 blur-sm"
          />
          <div className="absolute inset-0 bg-[hsl(220_22%_6%/0.72)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_22%_6%/0.5)] via-[hsl(220_22%_6%/0.55)] to-[hsl(220_22%_6%/0.85)]" />
        </div>

        <div className="container-wide relative section-padding text-center">
          <img
            src="/products/blue/icon.png"
            alt=""
            className="h-12 w-12 rounded-2xl mb-6 ring-1 ring-white/20 mx-auto"
          />
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight max-w-3xl mx-auto">
            Ready to run your trade business on Blue?
          </h2>
          <p className="font-sans text-lg text-white/70 max-w-xl mx-auto mb-8">
            Book a strategy call for a demo, pricing, or help getting set up.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <Button
              size="xl"
              className="rounded-full bg-white text-[hsl(220_22%_10%)] hover:bg-white/90 shadow-lg"
              asChild
            >
              <Link to="/contact">
                Book Your Strategy Call
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="rounded-full border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
              asChild
            >
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </div>

          <p className="mt-8 text-sm text-white/50">
            admin@bmspros.com.au · 03 8797 3795 · Lynbrook VIC
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default ProductBlue;
