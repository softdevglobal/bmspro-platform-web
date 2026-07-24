import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ArrowRight,
  Wrench,
  Users,
  MessageSquare,
  CreditCard,
  CalendarCheck,
  Building2,
  Car,
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
    id: "services",
    number: "01",
    title: "Services",
    who: "Owners set the menu · Ready-made templates to start",
    icon: Wrench,
    summary:
      "Build the services you offer — prices, duration, photos, and who does the work. Price by car type, or keep one flat price.",
    points: [
      "Add services with name, price, time, and photo",
      "Assign to branches and the right staff",
      "Different prices for small cars, SUVs, utes, and more",
      "Inspection checklists by vehicle area",
      "Start from ready-made templates",
    ],
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=900&h=700&fit=crop",
  },
  {
    id: "staff",
    number: "02",
    title: "Staff",
    who: "Owners manage the team · Staff work from the phone app",
    icon: Users,
    summary:
      "Add your team, set rosters, track who’s on site, approve leave, and keep training records.",
    points: [
      "Logins for staff and branch managers",
      "Rosters, training, and welcome emails",
      "Check-in on a map near each branch",
      "Timesheets and leave approvals",
      "Staff can decline jobs they can’t take",
    ],
    image: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=900&h=700&fit=crop",
  },
  {
    id: "sms",
    number: "03",
    title: "Text messages",
    who: "Owners send texts and top up credits",
    icon: MessageSquare,
    summary:
      "Text customers and staff from the workshop. Some plans include credits; top up anytime.",
    points: [
      "Credits included with some plans",
      "Buy extra packs when you run low",
      "Personalise with the customer’s name",
      "Greeting and promo templates",
      "See what you’ve sent and what’s left",
    ],
  },
  {
    id: "billing",
    number: "04",
    title: "Plans & billing",
    who: "Owners pay and change plans anytime",
    icon: CreditCard,
    summary:
      "Pick a plan that fits your workshop — weekly or monthly, with optional trial and SMS included.",
    points: [
      "Clear pricing in Australian dollars",
      "Branch and staff limits that match your plan",
      "Pay securely online",
      "Upgrade, downgrade, or cancel when you need",
      "Sign up and choose a plan in one flow",
    ],
  },
  {
    id: "bookings",
    number: "05",
    title: "Bookings",
    who: "Office, floor, and customers online",
    icon: CalendarCheck,
    summary:
      "See today’s jobs on a board or calendar — from request to done, with extra work and reminders covered.",
    points: [
      "Day board and calendar views",
      "Pending → confirmed → completed",
      "Staff accept or decline jobs",
      "Price extra work found in the bay",
      "Service reminders after each job",
    ],
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900&h=700&fit=crop",
  },
  {
    id: "branches",
    number: "06",
    title: "Branches",
    who: "One site or many — under your plan",
    icon: Building2,
    summary:
      "Each branch has its own hours, contacts, booking limits, and staff check-in area.",
    points: [
      "Add branches within your plan",
      "Hours, contacts, and daily booking limits",
      "Assign services, staff, and a manager",
      "Map check-in or branch QR code",
      "Schedule and simple site numbers",
    ],
  },
  {
    id: "customers",
    number: "07",
    title: "Customers & vehicles",
    who: "Everything about your customers in one place",
    icon: Car,
    summary:
      "Keep every customer and their cars ready for bookings, the phone, and the call centre.",
    points: [
      "Name, phone, email, and notes",
      "Vehicles with rego, make, model, and VIN",
      "Past bookings at a glance",
      "Import or export with a spreadsheet",
    ],
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=900&h=700&fit=crop",
  },
  {
    id: "finance-docs",
    number: "08",
    title: "Quotes & invoices",
    who: "Owners send docs · Customers view online",
    icon: FileText,
    summary:
      "Customers send photos for an estimate. You reply with quotes and invoices as PDFs.",
    points: [
      "Photo estimate requests",
      "Quotes and invoices as PDF",
      "Mark invoices paid",
      "Reusable priced line items",
    ],
  },
  {
    id: "book-now",
    number: "09",
    title: "Online booking",
    who: "Your customers book 24/7",
    icon: Globe,
    summary:
      "A public booking page for your workshop — service, branch, time, and vehicle-type pricing.",
    points: [
      "Customers pick service, branch, and slot",
      "Prices match the vehicle type",
      "Account, vehicles, and booking history",
      "Estimates, quotes, and invoices online",
      "Your logo, terms, and booking link",
    ],
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=900&h=700&fit=crop",
  },
  {
    id: "call-center",
    number: "10",
    title: "Call centre",
    who: "Humans on the phone for your workshop",
    icon: Headphones,
    summary:
      "Agents book jobs while talking to customers, chat with your team, and keep call recordings.",
    points: [
      "Book jobs while on the call",
      "Look up customers and services fast",
      "Chat between agents and the workshop",
      "Answered, missed, and outbound call logs",
      "Play back recordings when needed",
    ],
  },
  {
    id: "notifications",
    number: "11",
    title: "Notifications",
    who: "Never miss a booking or declined job",
    icon: Bell,
    summary:
      "Bell, toasts, and sound for new requests, extra work, and messages that need you.",
    points: [
      "New booking requests",
      "Staff declined a job",
      "Extra work found or priced",
      "Call-centre chats and announcements",
    ],
  },
  {
    id: "broadcasts",
    number: "12",
    title: "Announcements",
    who: "Platform news to your workshop",
    icon: Megaphone,
    summary: "Important updates to owners — or everyone on admin and mobile.",
    points: [
      "Announcements on admin and/or mobile",
      "Owners only, or all staff",
      "In-app notices you can’t miss",
    ],
  },
  {
    id: "audit",
    number: "13",
    title: "Activity history",
    who: "Know what changed and when",
    icon: ScrollText,
    summary:
      "A clear record of bookings, staff, customers, settings, and logins.",
    points: [
      "Creates, updates, and status changes",
      "Search and filter what happened",
      "Peace of mind for owners",
    ],
  },
  {
    id: "dashboards",
    number: "14",
    title: "Dashboards",
    who: "Today’s workshop at a glance",
    icon: LayoutDashboard,
    summary:
      "Revenue, booking mix, weekly calendar, and today’s schedule — filtered by branch or staff.",
    points: [
      "Revenue and booking counts",
      "Weekly calendar and today’s jobs",
      "Notifications and support chat",
    ],
  },
  {
    id: "settings",
    number: "15",
    title: "Settings",
    who: "Your workshop profile and login",
    icon: Settings,
    summary: "Business details, booking terms, logo, and password — all in one place.",
    points: [
      "Name, ABN, address, phone, logo",
      "Terms shown on online booking",
      "Sign in, reset password, register",
    ],
  },
  {
    id: "support-chat",
    number: "16",
    title: "Support chat",
    who: "Help when you need it",
    icon: Headphones,
    summary: "Chat with support from your dashboard — claim, transfer, or close cleanly.",
    points: [
      "Floating chat on the dashboard",
      "Live presence so you know someone’s there",
      "Agents claim and close conversations",
    ],
  },
  {
    id: "tenants",
    number: "17",
    title: "Getting started",
    who: "We set your workshop up on Black",
    icon: Building,
    summary:
      "The BMS Pro team onboards your business — details, plan, and your public booking link.",
    points: [
      "Business details and ABN",
      "Plan and timezone",
      "Your customer booking link",
    ],
  },
];

const roles = [
  {
    title: "Workshop owner",
    blurb: "Full control — bookings, staff, billing, customers, and settings.",
    icon: Wrench,
  },
  {
    title: "Branch manager",
    blurb: "Runs their site — bookings and schedule for their branch.",
    icon: Building2,
  },
  {
    title: "Staff",
    blurb: "Mobile-first — check in, leave, accept or decline jobs on the floor.",
    icon: Smartphone,
  },
  {
    title: "Platform team",
    blurb: "Onboards workshops, plans, and platform announcements.",
    icon: Building,
  },
];

const ProductBlack = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    product: "black",
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
        body: { ...formData, product: "black" },
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
        product: "black",
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
        title="BMS Pro Black | Workshop Management for Mechanic Shops"
        description="Workshop software for mechanic shops — bookings, staff, SMS, online booking, call centre, quotes, and invoices. Filter calls and book jobs in one place."
        path="/products/black"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "BMS Pro Black",
          description:
            "Workshop management for mechanic shops, auto workshops, and garages — bookings, staff, SMS, online booking, and call centre.",
          brand: { "@type": "Brand", name: "BMS Pro" },
          url: "https://bmspros.com.au/products/black",
        }}
      />

      {/* Full-bleed image hero — matches home page language */}
      <section className="relative bg-background -mt-16">
        <div className="relative min-h-[min(88vh,780px)] flex items-center overflow-hidden pt-16">
          <div className="absolute inset-0" aria-hidden>
            <img
              src="/products/black/hero.png"
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
                  src="/products/black/icon.png"
                  alt=""
                  className="h-9 w-9 rounded-lg ring-1 ring-white/25"
                />
                <span className="font-label text-sm font-semibold tracking-[0.16em] uppercase text-white/90">
                  BMS Pro Black
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 animate-fade-up delay-100 leading-[1.05]">
                Your workshop, fully managed.
              </h1>

              <p className="font-sans text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-8 animate-fade-up delay-200 leading-relaxed">
                Streamline bookings, staff, services, and operations — all from one dashboard.
                Filter calls and book jobs so mechanics stay under the hood.
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
                    Built for mechanic shops.{" "}
                    <span className="text-white/70 font-medium">
                      Auto repair, garages &amp; service centres.
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-2 animate-fade-up delay-400">
                {["Bookings", "Staff", "Invoicing", "Multi-branch", "Online booking", "Call centre"].map(
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
              <span className="inline-flex items-center gap-1.5 rounded-full bg-product-black-light text-product-black px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-3">
                <Wrench className="h-3 w-3" />
                Mechanic shops
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2">
                Book a Demo
              </h2>
              <p className="font-sans text-muted-foreground">
                Request a walkthrough of BMS Pro Black for your workshop.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
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
                  placeholder="jay@workshop.com.au"
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
                  placeholder="Lynbrook Auto"
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
                  placeholder="Tell us about your workshop..."
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="rounded-xl resize-none"
                />
              </div>
              <Button
                type="submit"
                variant="black"
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
              Everything that runs a modern workshop
            </h2>
            <p className="font-sans text-lg text-muted-foreground">
              Bookings, staff, texts, quotes, online booking, and call centre — built for mechanic
              shops.
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
                    <div className="absolute inset-0 bg-gradient-to-br from-product-black-light via-card to-secondary" />
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
                            : "bg-product-black text-white"
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
                        Black
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
                                mod.image ? "bg-white/50" : "bg-product-black/40"
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

      {/* Roles — light cards like home Audience / Benefits */}
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
              Owners and managers in the office. Staff on the floor with the phone app.
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
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-product-black/10 text-product-black mb-4">
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
            src="/products/black/hero.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover scale-110 blur-sm"
          />
          <div className="absolute inset-0 bg-[hsl(220_22%_6%/0.72)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_22%_6%/0.5)] via-[hsl(220_22%_6%/0.55)] to-[hsl(220_22%_6%/0.85)]" />
        </div>

        <div className="container-wide relative section-padding text-center">
          <img
            src="/products/black/icon.png"
            alt=""
            className="h-12 w-12 rounded-2xl mb-6 ring-1 ring-white/20 mx-auto"
          />
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight max-w-3xl mx-auto">
            Ready to run your workshop on Black?
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

export default ProductBlack;
