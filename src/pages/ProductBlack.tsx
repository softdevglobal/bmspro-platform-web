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

      {/* Split workshop hero */}
      <section className="relative min-h-[calc(100vh-4rem)] grid lg:grid-cols-2 bg-[hsl(220_22%_6%)]">
        <aside className="relative hidden lg:flex min-h-full flex-col justify-between p-10 xl:p-14 overflow-hidden text-white">
          <img
            src="/products/black/hero.png"
            alt="Modern auto workshop"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/35" />

          <div className="relative z-10 flex items-center gap-3">
            <img src="/products/black/icon.png" alt="" className="h-9 w-9 rounded-lg ring-1 ring-white/20" />
            <span className="text-sm font-semibold tracking-[0.16em] uppercase">BMS Pro Black</span>
          </div>

          <div className="relative z-10 max-w-lg">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider mb-5">
              <Wrench className="h-3 w-3" />
              Mechanic shops
            </span>
            <h1 className="text-4xl xl:text-5xl font-bold leading-[1.08] tracking-tight mb-4">
              Your workshop, fully managed.
            </h1>
            <p className="text-base xl:text-lg text-white/75 leading-relaxed mb-8">
              Streamline bookings, staff, services, and operations — all from one powerful
              dashboard. Filter calls and book jobs so mechanics stay under the hood.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Bookings", "Staff", "Invoicing", "Analytics", "Multi-branch", "Online booking"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/20 bg-black/30 backdrop-blur-sm px-3.5 py-1.5 text-xs font-medium text-white/90"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>

          <p className="relative z-10 text-sm text-white/50">
            Auto repair shops, garages, service centers &amp; more
          </p>
        </aside>

        <main className="flex flex-col justify-center bg-[hsl(220_22%_8%)] text-white px-6 sm:px-10 xl:px-16 py-12 lg:py-16 border-l border-white/5">
          <div className="lg:hidden mb-8">
            <div className="flex items-center gap-2.5 mb-6">
              <img src="/products/black/icon.png" alt="" className="h-9 w-9 rounded-lg ring-1 ring-white/15" />
              <span className="text-sm font-semibold tracking-[0.12em] uppercase text-white">
                BMS Pro Black
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
              Your workshop, fully managed.
            </h1>
            <p className="text-white/60 text-sm mb-2">
              Filter calls and book jobs — everything in one place.
            </p>
          </div>

          <div className="w-full max-w-md mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Book a Demo</h2>
              <p className="text-white/60">
                Request a walkthrough of BMS Pro Black for your workshop.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="firstName" className="text-white/80">
                    First name
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="h-11 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/35 focus-visible:ring-white/30 focus-visible:ring-offset-0"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lastName" className="text-white/80">
                    Last name
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Smith"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="h-11 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/35 focus-visible:ring-white/30 focus-visible:ring-offset-0"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-white/80">
                  Work email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jay@workshop.com.au"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="h-11 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/35 focus-visible:ring-white/30 focus-visible:ring-offset-0"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="company" className="text-white/80">
                  Company name
                </Label>
                <Input
                  id="company"
                  placeholder="Lynbrook Auto"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  className="h-11 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/35 focus-visible:ring-white/30 focus-visible:ring-offset-0"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-white/80">
                  Message <span className="text-white/40 font-normal">(optional)</span>
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your workshop..."
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="rounded-xl resize-none border-white/10 bg-white/5 text-white placeholder:text-white/35 focus-visible:ring-white/30 focus-visible:ring-offset-0"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full h-12 rounded-xl text-base font-semibold bg-white text-[hsl(220_22%_10%)] hover:bg-white/90"
                disabled={loading}
              >
                {loading ? "Sending..." : "Request Demo"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <p className="mt-6 text-center text-xs text-white/45">
              By continuing you agree to our{" "}
              <Link to="/terms" className="underline underline-offset-2 text-white/70 hover:text-white">
                Terms
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="underline underline-offset-2 text-white/70 hover:text-white">
                Privacy Policy
              </Link>
              .
            </p>
            <p className="mt-4 text-center">
              <a
                href="#features"
                className="text-sm font-medium text-white/80 underline underline-offset-4 hover:text-white"
              >
                See what&apos;s included ↓
              </a>
            </p>
          </div>
        </main>
      </section>

      {/* Features — dark glass workshop style */}
      <section
        id="features"
        className="relative overflow-hidden bg-[hsl(220_22%_8%)] text-white scroll-mt-20"
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div
            className="absolute inset-0 opacity-50"
            style={{
              background: `
                radial-gradient(ellipse 40% 50% at 10% 10%, hsl(220 18% 22% / 0.9), transparent),
                radial-gradient(ellipse 35% 40% at 90% 80%, hsl(220 20% 18% / 0.7), transparent)
              `,
            }}
          />
        </div>

        <div className="container-wide relative section-padding">
          <div className="max-w-2xl mx-auto text-center mb-12 lg:mb-14">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80">
              What you get
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-3 tracking-tight">
              Everything that runs a modern workshop
            </h2>
            <p className="text-lg text-white/65">
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
                  className="group relative overflow-hidden rounded-3xl min-h-[340px] flex flex-col border border-white/10 scroll-mt-24 animate-fade-up"
                  style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
                >
                  {mod.image ? (
                    <>
                      <img
                        src={mod.image}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover scale-105 blur-[1.5px] transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-[hsl(220_22%_6%/0.72)] group-hover:bg-[hsl(220_22%_6%/0.66)] transition-colors" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220_22%_6%/0.96)] via-[hsl(220_22%_6%/0.55)] to-transparent" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-[hsl(220_20%_12%)]" />
                  )}

                  <div className="relative flex flex-col flex-grow p-6 sm:p-7">
                    <div className="flex items-start justify-between mb-6">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white text-[hsl(220_22%_10%)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                        <Icon className="h-3 w-3" />
                        {mod.number}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
                        Black
                      </span>
                    </div>

                    <div className="mt-auto">
                      <h3 className="text-xl font-bold tracking-tight mb-2">{mod.title}</h3>
                      <p className="text-xs text-white/50 mb-3">{mod.who}</p>
                      <p className="text-sm text-white/70 leading-relaxed mb-4">{mod.summary}</p>
                      <ul className="space-y-2">
                        {mod.points.slice(0, 4).map((point) => (
                          <li key={point} className="flex items-start gap-2.5 text-sm text-white/80">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/50 shrink-0" />
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
      <section className="relative bg-[hsl(220_22%_6%)] text-white border-t border-white/5">
        <div className="container-wide section-padding">
          <div className="max-w-2xl mb-10">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80">
              Who it&apos;s for
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-4 mb-3 tracking-tight">
              The right tools for each role
            </h2>
            <p className="text-white/65">
              Owners and managers in the office. Staff on the floor with the phone app.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <div
                  key={role.title}
                  className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/[0.08] transition-colors"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[hsl(220_22%_10%)] mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{role.title}</h3>
                  <p className="text-sm text-white/65 leading-relaxed">{role.blurb}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[hsl(220_22%_8%)] text-white border-t border-white/5">
        <img
          src="/products/black/hero.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(220_22%_6%/0.95)] via-[hsl(220_22%_6%/0.85)] to-[hsl(220_22%_6%/0.7)]" />
        <div className="container-wide relative section-padding">
          <div className="max-w-2xl">
            <img
              src="/products/black/icon.png"
              alt=""
              className="h-12 w-12 rounded-2xl mb-6 ring-1 ring-white/15"
            />
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Ready to run your workshop on Black?
            </h2>
            <p className="text-lg text-white/70 mb-8">
              Book a strategy call for a demo, pricing, or help getting set up.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-white text-[hsl(220_22%_10%)] text-sm font-semibold hover:bg-white/90 transition-colors"
              >
                Book Your Strategy Call
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full border border-white/25 bg-white/5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                View Pricing
              </Link>
            </div>
            <p className="mt-8 text-sm text-white/45">
              admin@bmspros.com.au · 03 8797 3795 · Lynbrook VIC
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductBlack;
