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
  ShieldCheck,
  LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "@/lib/contactForm";

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
      await submitContactForm(
        { ...formData, product: "pink" },
        "Demo request — BMS Pro Pink"
      );
      toast({
        title: "Message sent",
        description: "Thanks — we'll get back within 24 hours.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        product: "pink",
        message: "",
      });
    } catch (error) {
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

      {/* Full-bleed image hero — matches home / Black language */}
      <section className="relative bg-background -mt-16">
        <div className="relative min-h-[min(88vh,780px)] flex items-center overflow-hidden pt-16">
          <div className="absolute inset-0" aria-hidden>
            <img
              src="/products/pink/hero.png"
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
                  src="/products/pink/icon.png"
                  alt=""
                  className="h-9 w-9 rounded-lg ring-1 ring-white/25"
                />
                <span className="font-label text-sm font-semibold tracking-[0.16em] uppercase text-white/90">
                  BMS Pro Pink
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 animate-fade-up delay-100 leading-[1.05]">
                Your salon, fully booked.
              </h1>

              <p className="font-sans text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-8 animate-fade-up delay-200 leading-relaxed">
                While you&apos;re with a client, keep the calendar full — appointments, staff, SMS,
                loyalty, and online booking in one place.
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
                    Built for salons &amp; beauty.{" "}
                    <span className="text-white/70 font-medium">
                      Hair, nails, barber, spa &amp; more.
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-2 animate-fade-up delay-400">
                {["Bookings", "Staff", "Clients", "Loyalty", "SMS", "Online booking"].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1.5 text-sm font-label font-semibold text-white"
                  >
                    {tag}
                  </span>
                ))}
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
              <span className="inline-flex items-center gap-1.5 rounded-full bg-pink-light text-pink px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-3">
                <Sparkles className="h-3 w-3" />
                Salons &amp; beauty
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2">
                Book a Demo
              </h2>
              <p className="font-sans text-muted-foreground">
                Request a walkthrough of BMS Pro Pink for your salon.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    placeholder="Sarah"
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
                    placeholder="Chen"
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
                  placeholder="sarah@salon.com.au"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="h-11 rounded-xl"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="company">Salon name</Label>
                <Input
                  id="company"
                  placeholder="Bloom Hair Studio"
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
                  placeholder="Tell us about your salon..."
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="rounded-xl resize-none"
                />
              </div>
              <Button
                type="submit"
                variant="pink"
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
              Everything that runs a modern salon
            </h2>
            <p className="font-sans text-lg text-muted-foreground">
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
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-light via-card to-secondary" />
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
                            : "bg-pink text-white"
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
                        Pink
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
                                mod.image ? "bg-white/50" : "bg-pink/40"
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
              Owners and managers in the salon office. Staff on the floor with the phone app.
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
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink/10 text-pink mb-4">
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
            src="/products/pink/hero.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover scale-110 blur-sm"
          />
          <div className="absolute inset-0 bg-[hsl(220_22%_6%/0.72)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_22%_6%/0.5)] via-[hsl(220_22%_6%/0.55)] to-[hsl(220_22%_6%/0.85)]" />
        </div>

        <div className="container-wide relative section-padding text-center">
          <img
            src="/products/pink/icon.png"
            alt=""
            className="h-12 w-12 rounded-2xl mb-6 ring-1 ring-white/20 mx-auto"
          />
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight max-w-3xl mx-auto">
            Ready to run your salon on Pink?
          </h2>
          <p className="font-sans text-lg text-white/70 max-w-xl mx-auto mb-8">
            Book a strategy call for a demo, pricing, or help getting your salon set up.
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
              <Link to="/pricing#pink-plans">View Pricing</Link>
            </Button>
          </div>

          <p className="mt-8 text-sm text-white/50">
            info@bmspros.com.au · 03 8797 3795 · Lynbrook VIC
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default ProductPink;
