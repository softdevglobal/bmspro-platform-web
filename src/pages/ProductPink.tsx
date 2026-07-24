import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ArrowRight,
  Sparkles,
  Users,
  MessageSquare,
  CreditCard,
  CalendarCheck,
  Building2,
  UserRound,
  Building,
  Globe,
  Headphones,
  Bell,
  Megaphone,
  ScrollText,
  LayoutDashboard,
  Settings,
  Smartphone,
  Gift,
  Scissors,
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
    id: "dashboards",
    number: "01",
    title: "Dashboards",
    who: "Salon owners and branch managers · Platform overview for BMS Pro",
    icon: LayoutDashboard,
    summary:
      "See today’s appointments, weekly calendar, revenue, and booking mix — filtered by staff or branch.",
    points: [
      "Monthly revenue and booking status at a glance",
      "Weekly calendar and today’s schedule",
      "Staff and service counts",
      "Pending unassigned bookings highlighted",
      "Notifications right on the dashboard",
    ],
    image: "/products/pink/hero.png",
  },
  {
    id: "bookings",
    number: "02",
    title: "Bookings",
    who: "Owners and branch managers in the salon · Staff on mobile",
    icon: CalendarCheck,
    summary:
      "Create multi-service appointments, assign stylists, and move bookings from request to confirmed to done.",
    points: [
      "Today’s board and create bookings in one place",
      "Pending, confirmed, completed, and cancelled views",
      "Assign a stylist or “any staff”",
      "Staff can accept or decline on the phone app",
      "Confirm, reassign, complete, or cancel from the office",
    ],
    image: "/products/pink/bookings.png",
  },
  {
    id: "services",
    number: "03",
    title: "Services",
    who: "Salon owners set the menu",
    icon: Scissors,
    summary:
      "Build your service list — name, price, duration, photo, which branches offer it, and who can do it.",
    points: [
      "Add, edit, or remove services anytime",
      "Price and duration in minutes",
      "Assign to branches and eligible staff",
      "Keep every location’s menu in sync",
    ],
    image: "/products/pink/services.png",
  },
  {
    id: "customers",
    number: "04",
    title: "Customers",
    who: "Salon owners",
    icon: UserRound,
    summary:
      "A simple client directory — contact details, notes, visit history, and who’s active.",
    points: [
      "Name, phone, email, notes, and status",
      "Visit counts and last visit",
      "Quick client preview when you need it",
    ],
    image: "/products/pink/clients.png",
  },
  {
    id: "staff",
    number: "05",
    title: "Staff",
    who: "Owners manage the team · Staff use the phone app",
    icon: Users,
    summary:
      "Add stylists and branch managers, set weekly schedules, approve leave, and track attendance.",
    points: [
      "Create logins with welcome emails",
      "Weekly roster per person",
      "Leave approve or reject with a reason",
      "Attendance with map check-in near the salon",
      "Timesheets from clock-in, clock-out, and breaks",
    ],
    image: "/products/pink/clients.png",
  },
  {
    id: "branches",
    number: "06",
    title: "Branches",
    who: "Owners · Branch managers for their own site",
    icon: Building2,
    summary:
      "One salon or many — each with hours, map location, booking limits, and a branch manager.",
    points: [
      "Add locations within your plan",
      "Address, hours, timezone, and daily booking limit",
      "Assign a branch manager",
      "Check-in radius for staff on site",
    ],
    image: "/products/pink/hero.png",
  },
  {
    id: "sms",
    number: "07",
    title: "Text messages",
    who: "Owners send texts and buy credits",
    icon: MessageSquare,
    summary:
      "Text clients and staff with seasonal greetings and custom messages. Top up credits when you need more.",
    points: [
      "Buy SMS credits when you run low",
      "Low-balance reminder in the sidebar",
      "Send to customers, staff, or both",
      "Seasonal greeting templates",
      "See your send history",
    ],
    image: "/products/pink/bookings.png",
  },
  {
    id: "loyalty",
    number: "08",
    title: "Loyalty (ACSU)",
    who: "Salon owners",
    icon: Gift,
    summary:
      "Reward regulars with points — turn dollars into points, top up, and track history from completed bookings.",
    points: [
      "Turn loyalty on or off for your salon",
      "Set how dollars convert to points",
      "Top up and view balances",
      "History tied to completed appointments",
    ],
    image: "/products/pink/services.png",
  },
  {
    id: "billing",
    number: "09",
    title: "Plans & billing",
    who: "Owners pay and change plans · Platform sets the options",
    icon: CreditCard,
    summary:
      "Choose a plan that fits your salon size — trials, branch and staff limits, and secure online payment.",
    points: [
      "Clear pricing with weekly or monthly options",
      "Upgrade, downgrade, or cancel at period end",
      "Manage your card and invoices in one place",
      "Trial and payment reminders when you need them",
      "Sign up and pick a plan yourself",
    ],
  },
  {
    id: "book-now",
    number: "10",
    title: "Online booking",
    who: "Your clients book 24/7 · You control the link",
    icon: Globe,
    summary:
      "A public booking page for your salon. Clients pick services and times while your team stays with the client in the chair.",
    points: [
      "Your own booking link for the salon",
      "Clients book around the clock",
      "Link shown in settings — easy to copy and share",
      "Works with hair, beauty, nails, massage, barber, spa, and more",
    ],
    image: "/products/pink/bookings.png",
  },
  {
    id: "notifications",
    number: "11",
    title: "Notifications",
    who: "Owners and branch managers",
    icon: Bell,
    summary:
      "Bell and toasts for new booking requests, leave requests, support chats, and platform news.",
    points: [
      "New appointment requests",
      "Leave requests from staff",
      "Incoming support chats",
      "Platform announcements",
    ],
  },
  {
    id: "broadcasts",
    number: "12",
    title: "Announcements",
    who: "Platform team sends · Salons receive",
    icon: Megaphone,
    summary:
      "Important updates to salon owners — or everyone on admin and mobile — so news isn’t missed.",
    points: [
      "Announcements on admin and/or mobile",
      "Owners only, or all staff too",
      "In-app notices with optional phone push",
    ],
  },
  {
    id: "audit",
    number: "13",
    title: "Activity history",
    who: "Salon owners for their business · Platform for the whole network",
    icon: ScrollText,
    summary:
      "A clear record of what changed — bookings, services, staff, and logins.",
    points: [
      "Creates, updates, deletes, and status changes",
      "Filter by what happened",
      "Login and logout history",
    ],
  },
  {
    id: "settings",
    number: "14",
    title: "Settings",
    who: "Salon owners",
    icon: Settings,
    summary:
      "Your salon profile, logo, timezone, password, and public booking link — all in one place.",
    points: [
      "Salon name, ABN, address, and phone",
      "Logo upload",
      "Timezone and password change",
      "Copy your Book Now link",
    ],
  },
  {
    id: "support-chat",
    number: "15",
    title: "Support chat",
    who: "Salon team · Support agents",
    icon: Headphones,
    summary:
      "Chat with support from a floating button on the dashboard when you need help.",
    points: [
      "Open a chat from the salon dashboard",
      "Agents claim, transfer, or close",
      "Presence so you know someone’s there",
    ],
  },
  {
    id: "onboarding",
    number: "16",
    title: "Getting started",
    who: "We set your salon up on Pink — or you sign up yourself",
    icon: Building,
    summary:
      "Self-serve signup with a plan and trial, or the BMS Pro team onboards your salon with a booking link ready to share.",
    points: [
      "Beauty, hair, nail, massage, barber, wellness, medical spa",
      "Australian business details and ABN",
      "Plan, trial, and your public booking link",
      "Welcome email when you’re ready to go",
    ],
  },
];

const roles = [
  {
    title: "Salon owner",
    blurb: "Full control — bookings, staff, clients, SMS, loyalty, billing, and settings.",
    icon: Sparkles,
  },
  {
    title: "Branch manager",
    blurb: "Runs their location — bookings and today’s schedule for their branch.",
    icon: Building2,
  },
  {
    title: "Staff",
    blurb: "Mobile-first — check in, leave, and accept or decline appointments on the floor.",
    icon: Smartphone,
  },
  {
    title: "Platform team",
    blurb: "Onboards salons, plans, SMS packages, and platform announcements.",
    icon: Building,
  },
];

const ProductPink = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    product: "pink",
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
        body: { ...formData, product: "pink" },
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
        product: "pink",
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

  const fieldClass =
    "h-11 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/35 focus-visible:ring-white/30 focus-visible:ring-offset-0";

  return (
    <Layout>
      <SEO
        title="BMS Pro Pink | Booking Software for Salons & Beauty"
        description="Salon and beauty booking software — appointments, staff, clients, SMS, loyalty, and online booking. Fill the calendar while stylists stay with the client."
        path="/products/pink"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "BMS Pro Pink",
          description:
            "Multi-tenant salon and beauty booking software — appointments, staff, clients, SMS, loyalty, and online booking.",
          brand: { "@type": "Brand", name: "BMS Pro" },
          url: "https://bmspros.com.au/products/pink",
        }}
      />

      {/* Split salon hero — dark like Black, light pink accents only */}
      <section className="relative min-h-[calc(100vh-4rem)] grid lg:grid-cols-2 bg-[hsl(220_22%_6%)]">
        <aside className="relative hidden lg:flex min-h-full flex-col justify-between p-10 xl:p-14 overflow-hidden text-white">
          <img
            src="/products/pink/hero.png"
            alt="Modern salon interior"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/40" />

          <div className="relative z-10 flex items-center gap-3">
            <img
              src="/products/pink/icon.png"
              alt=""
              className="h-9 w-9 rounded-lg ring-1 ring-white/20"
            />
            <span className="text-sm font-semibold tracking-[0.16em] uppercase">BMS Pro Pink</span>
          </div>

          <div className="relative z-10 max-w-lg">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider mb-5">
              <Sparkles className="h-3 w-3" />
              Salons &amp; beauty
            </span>
            <h1 className="text-4xl xl:text-5xl font-bold leading-[1.08] tracking-tight mb-4">
              Your salon, fully booked.
            </h1>
            <p className="text-base xl:text-lg text-white/75 leading-relaxed mb-8">
              While you&apos;re with a client, keep the calendar full — appointments, staff, SMS,
              loyalty, and online booking in one place.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Bookings", "Staff", "Clients", "Loyalty", "SMS", "Online booking"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/20 bg-black/30 backdrop-blur-sm px-3.5 py-1.5 text-xs font-medium text-white/90"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <p className="relative z-10 text-sm text-white/50">
            Hair · Beauty · Nails · Barber · Spa · Massage &amp; more
          </p>
        </aside>

        <main className="relative flex flex-col justify-center bg-[hsl(220_22%_8%)] text-white px-6 sm:px-10 xl:px-16 py-12 lg:py-16 border-l border-white/5">
          <div className="lg:hidden mb-8">
            <div className="relative rounded-2xl overflow-hidden mb-6 h-40">
              <img
                src="/products/pink/hero.png"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220_22%_8%)] via-black/40 to-transparent" />
              <div className="absolute bottom-3 left-3 flex items-center gap-2.5">
                <img
                  src="/products/pink/icon.png"
                  alt=""
                  className="h-9 w-9 rounded-lg ring-1 ring-white/20"
                />
                <span className="text-sm font-semibold tracking-[0.12em] uppercase text-white">
                  BMS Pro Pink
                </span>
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
              Your salon, fully booked.
            </h1>
            <p className="text-white/60 text-sm mb-2">
              Fill the calendar while stylists stay with the client.
            </p>
          </div>

          <div className="w-full max-w-md mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Book a Demo</h2>
              <p className="text-white/60">
                Request a walkthrough of BMS Pro Pink for your salon.
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
                    placeholder="Sarah"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className={fieldClass}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lastName" className="text-white/80">
                    Last name
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Chen"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className={fieldClass}
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
                  placeholder="sarah@salon.com.au"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={fieldClass}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="company" className="text-white/80">
                  Salon name
                </Label>
                <Input
                  id="company"
                  placeholder="Bloom Hair Studio"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  className={fieldClass}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-white/80">
                  Message <span className="text-white/40 font-normal">(optional)</span>
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your salon..."
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
              <Link
                to="/privacy"
                className="underline underline-offset-2 text-white/70 hover:text-white"
              >
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

      {/* Features */}
      <section
        id="features"
        className="relative overflow-hidden bg-[hsl(220_22%_8%)] text-white scroll-mt-20"
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: `
                radial-gradient(ellipse 40% 50% at 10% 10%, hsl(220 18% 22% / 0.9), transparent),
                radial-gradient(ellipse 30% 35% at 90% 80%, hsl(340 40% 30% / 0.12), transparent)
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
              Everything that runs a modern salon
            </h2>
            <p className="text-lg text-white/65">
              Appointments, staff, clients, texts, loyalty, and online booking — built for beauty
              businesses.
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
                        Pink
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
              Owners and managers in the salon office. Staff on the floor with the phone app.
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
          src="/products/pink/hero.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(220_22%_6%/0.95)] via-[hsl(220_22%_6%/0.85)] to-[hsl(220_22%_6%/0.7)]" />
        <div className="container-wide relative section-padding">
          <div className="max-w-2xl">
            <img
              src="/products/pink/icon.png"
              alt=""
              className="h-12 w-12 rounded-2xl mb-6 ring-1 ring-white/15"
            />
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Ready to run your salon on Pink?
            </h2>
            <p className="text-lg text-white/70 mb-8">
              Book a strategy call for a demo, pricing, or help getting your salon set up.
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

export default ProductPink;
