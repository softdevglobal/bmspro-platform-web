import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BluePricingSection } from "@/components/pricing/BluePricingSection";
import { submitContactForm } from "@/lib/contactForm";
import { useToast } from "@/hooks/use-toast";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Bell,
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  Globe,
  Hammer,
  Headphones,
  LayoutDashboard,
  Mail,
  MessageSquare,
  Minus,
  Phone,
  Plus,
  Star,
  TrendingUp,
  Wrench,
} from "lucide-react";

const TRUST_LOGOS = [
  "Plumbers",
  "Electricians",
  "HVAC",
  "Carpenters",
  "Multi-trade crews",
  "Field service teams",
];

const FORM_STEPS = [
  {
    title: "Visual selective cards",
    body: "Customers tap services, job type, and time instead of typing. Fast, easy, and feels effortless.",
  },
  {
    title: "Instant book through calendar",
    body: "Live availability from your working hours — they pick a slot that fits the crew.",
  },
  {
    title: "Offer recommended add-ons",
    body: "Suggest inspections, follow-ups, or related services while they’re already booking.",
  },
  {
    title: "Ask the right questions",
    body: "Capture notes, site details, and photos before the van rolls out.",
  },
  {
    title: "Confirm by SMS",
    body: "Instant confirmation and reminders so no-shows drop without chasing calls.",
  },
];

const FAQS = [
  {
    category: "Book Now",
    items: [
      {
        q: "Why Book Now instead of a website contact form?",
        a: "Contact forms dump leads into email. Book Now captures the service, site details, and slot — then confirms by SMS so the job is already on the board.",
      },
      {
        q: "What if I don’t have a website?",
        a: "You get a public booking link for your trade business. Share it on Google, Facebook, or SMS — no website rebuild required.",
      },
      {
        q: "Can I customise what customers can book?",
        a: "Yes. You control services, prices, hours, and which jobs go straight to the crew.",
      },
    ],
  },
  {
    category: "Front desk & calls",
    items: [
      {
        q: "Do I need a receptionist?",
        a: "Online-only plans run without one. Front Desk plans add a human receptionist who filters routine calls and books jobs while trades stay on the tools.",
      },
      {
        q: "What happens after hours?",
        a: "Customers can still book online 24/7. With Front Desk coverage, overflow and after-hours calls get answered instead of going to voicemail.",
      },
    ],
  },
  {
    category: "Trade software",
    items: [
      {
        q: "Does Blue include SMS?",
        a: "Plans can include SMS credits. You can also top up. Confirmations, reminders, and job updates go out from the business.",
      },
      {
        q: "Can staff use it on site?",
        a: "Yes. Staff check jobs, update status, and handle requests on the mobile app while owners run the office dashboard.",
      },
    ],
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Trades on the tools, not on the phone. Blue plus a real receptionist filtered the chaos out of our jobs.",
    name: "Business owner",
    role: "Plumbing crew · VIC",
    image: "/products/blue/tradesperson-portrait.jpg",
    stat: null as string | null,
  },
  {
    quote: null,
    name: "Operations manager",
    role: "Electrical & HVAC · NSW",
    image: "/products/blue/job-site.jpg",
    stat: "Fewer missed jobs in the first month on Blue",
  },
];

function Pill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-blue/20 bg-blue/5 px-2.5 py-0.5 text-xs font-semibold text-blue align-middle mx-1",
        className
      )}
    >
      {children}
    </span>
  );
}

const ProductBlue = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [openFormStep, setOpenFormStep] = useState(0);
  const [faqCat, setFaqCat] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
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
      await submitContactForm(
        { ...formData, product: "blue" },
        "BMS Pro Blue demo request"
      );
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
    } catch (err) {
      toast({
        title: "Error sending message",
        description: err instanceof Error ? err.message : "Please try again or email us.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <SEO
        title="BMS Pro Blue | Trade Booking & Field Operations"
        description="Let customers book from anywhere. Online booking, SMS reminders, jobs, and optional human front desk for trades and field service."
        path="/products/blue"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "BMS Pro Blue",
          description:
            "Trade software for plumbers, electricians, and field teams — Book Now, SMS, jobs, and optional front desk.",
          brand: { "@type": "Brand", name: "BMS Pro" },
          url: "https://bmspros.com.au/products/blue",
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white pt-8 pb-16 sm:pt-12 sm:pb-24">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-5">
                <img
                  src="/products/blue/icon.png"
                  alt=""
                  className="h-8 w-8 rounded-lg ring-1 ring-black/10"
                />
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-blue">
                  BMS Pro Blue
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-[hsl(220_22%_10%)] leading-[1.08] mb-4">
                Let your customers book from anywhere, anytime.
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-md">
                Your trade jobs before &amp; after using Blue — fewer missed calls, fuller days,
                trades on the tools.
              </p>
              <Button size="xl" variant="blue" className="rounded-full h-12 px-7" asChild>
                <a href="#demo">
                  Try BMS Pro Blue
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-600" />
                  No lock-in contract
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium">
                  Book Now · Google-ready link
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-25px_hsl(210_40%_20%/0.4)] ring-1 ring-black/5">
                <img
                  src="/products/blue/tradesperson-focus.jpg"
                  alt="Plumber working under a kitchen sink"
                  className="h-full w-full object-cover aspect-[4/3]"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(210_40%_10%)]/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 text-white">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-white/70">Jobs moving</p>
                    <p className="text-2xl font-bold leading-tight">Trades on the tools</p>
                  </div>
                  <span className="hidden sm:inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-3 py-1.5 text-xs font-medium">
                    <Wrench className="h-3.5 w-3.5" />
                    Not on the phone
                  </span>
                </div>
              </div>

              <div className="absolute -bottom-8 -left-2 sm:-left-8 w-[230px] rounded-2xl bg-white border border-border shadow-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-foreground">Jobs booked</p>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                    <TrendingUp className="h-3 w-3" />
                    +35%
                  </span>
                </div>
                <div className="flex items-end gap-1.5 h-20">
                  {[22, 28, 34, 38, 56, 64, 72, 80].map((h, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex-1 rounded-full",
                        i < 4
                          ? "bg-[hsl(210_25%_88%)]"
                          : "bg-gradient-to-t from-blue to-[hsl(210_55%_50%)]"
                      )}
                      style={{ height: `${h}px` }}
                    />
                  ))}
                </div>
                <p className="mt-3 text-[11px] leading-snug text-muted-foreground">
                  First month with <span className="font-semibold text-foreground">BMS Pro Blue</span>
                </p>
              </div>

              <div className="absolute -top-4 -right-2 sm:-right-6 w-[210px] rounded-2xl bg-white border border-border shadow-xl p-3.5">
                <div className="flex items-start gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-white">
                    <Check className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-foreground">Job confirmed</p>
                    <p className="text-[11px] text-muted-foreground leading-snug">
                      Hot water repair · Tue 9:00 AM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-border/60 bg-[hsl(210_25%_97%)] py-8 overflow-hidden">
        <div className="container-wide">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {TRUST_LOGOS.map((label) => (
              <span
                key={label}
                className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/50"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Front desk */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="rounded-[2rem] bg-[hsl(210_40%_14%)] text-white overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-8 p-8 sm:p-12 lg:p-14">
              <div className="flex flex-col justify-center">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                  <Phone className="h-5 w-5" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 leading-tight">
                  Never miss a call again — meet your trade front desk.
                </h2>
                <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-md">
                  Human receptionists filter routine calls and book jobs into Blue. Trades only take
                  the complex ones — so the van keeps moving.
                </p>
                <Button
                  size="lg"
                  className="w-fit rounded-full bg-white text-blue hover:bg-white/90"
                  asChild
                >
                  <a href="#demo">
                    Book a strategy call
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>

              <div className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur-md p-6 sm:p-7 flex flex-col gap-6">
                <p className="text-lg font-semibold leading-snug">
                  Keep trades on the tools, not on the phone.
                </p>
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src="/products/blue/front-desk.jpg"
                    alt="Office coordinator answering trade business calls"
                    className="h-full w-full object-cover aspect-[4/3]"
                    loading="lazy"
                  />
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-[hsl(210_40%_14%/0.85)] backdrop-blur px-3 py-1.5 text-xs font-medium text-white">
                    <Headphones className="h-3.5 w-3.5" />
                    Live reception
                  </span>
                </div>
                <p className="text-sm text-white/65 leading-relaxed">
                  Reception books routine work into the system. Technical calls get through. Less
                  downtime on the job.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book Now */}
      <section className="section-padding bg-[hsl(210_25%_97%)]">
        <div className="container-wide grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-sm font-semibold text-blue mb-3 inline-flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Book Now
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
              Jobs straight from your public link
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Share your trade Book Now page on Google, social, or SMS. Customers pick a service and
              slot — then get a
              <Pill>
                <Calendar className="h-3 w-3" />
                Book Online
              </Pill>
              confirmation without you answering the phone.
            </p>
            <Button variant="blue" className="rounded-full" asChild>
              <a href="https://blue.bmspros.com.au/book-now" target="_blank" rel="noreferrer">
                See Book Now
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="relative mx-auto w-full max-w-[280px]">
            <div className="rounded-[2rem] border-[10px] border-[hsl(210_40%_14%)] bg-white shadow-2xl overflow-hidden aspect-[9/16]">
              <div className="flex items-center justify-between px-4 pt-3 pb-2">
                <span className="text-blue text-lg">←</span>
                <div className="h-1.5 flex-1 mx-4 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full w-1/4 rounded-full bg-blue" />
                </div>
                <span className="text-red-500 font-bold">×</span>
              </div>
              <div className="px-5 pt-8 text-center">
                <p className="text-xl font-bold text-foreground">Select a service</p>
                <div className="mt-8 space-y-3 text-left">
                  {["Blocked drain", "Hot water repair", "Electrical inspection"].map((s) => (
                    <div
                      key={s}
                      className="rounded-2xl border border-border bg-secondary/40 px-4 py-3 text-sm font-medium"
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reminders */}
      <section className="section-padding bg-white">
        <div className="container-wide grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-3 order-2 lg:order-1">
            {[
              {
                icon: Mail,
                color: "bg-red-500",
                title: "Your job is confirmed",
                body: "You're all set for Tue, 9:00 AM — crew booked, SMS on the way.",
              },
              {
                icon: MessageSquare,
                color: "bg-emerald-500",
                title: "1H reminder",
                body: "Your plumber arrives tomorrow at 9:00 AM. Reply if you need to reschedule.",
              },
              {
                icon: MessageSquare,
                color: "bg-emerald-500",
                title: "Thanks for choosing us",
                body: "Job complete. Leave a quick Google review when you have a moment.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="flex gap-3 rounded-2xl border border-border bg-[hsl(210_25%_97%)] p-4 shadow-sm"
              >
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white",
                    card.color
                  )}
                >
                  <card.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{card.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{card.body}</p>
                </div>
              </div>
            ))}
            <div className="pt-4">
              <img
                src="/products/blue/sms-phone.jpg"
                alt="Customer checking a job reminder on their phone"
                className="w-full rounded-2xl object-cover shadow-lg"
                loading="lazy"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-sm font-semibold text-blue mb-3 inline-flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Job reminders
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5">
              Automated confirmations and reminders
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Customers receive instant confirmation
              <Pill>
                <MessageSquare className="h-3 w-3" />
                via SMS and email
              </Pill>
              when they book. Automated reminders go out before the visit, reducing no-shows.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              You can also
              <Pill>
                <Hammer className="h-3 w-3" />
                schedule follow-up reminders
              </Pill>
              to bring customers back when it’s time for the next service.
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard bento */}
      <section className="section-padding bg-[hsl(210_25%_97%)]">
        <div className="container-wide grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-sm font-semibold text-blue mb-3 inline-flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Trade dashboard
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Know how your business is performing at a glance
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Track jobs, staff, SMS, and revenue — with confirmations and reminders doing the heavy
              lifting in the background.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-3xl bg-blue text-white p-6">
              <p className="text-5xl font-bold tracking-tight mb-2">186</p>
              <p className="text-sm text-white/75 leading-relaxed">
                Customers submitted jobs through Book Now this month.
              </p>
            </div>
            <div className="rounded-3xl bg-white border border-border p-6 shadow-sm">
              <p className="font-semibold mb-1">Submission activity</p>
              <p className="text-sm text-muted-foreground mb-4">
                Half of jobs come from your public link.
              </p>
              <div className="h-16 flex items-end gap-1">
                {[40, 55, 48, 70, 85].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-md bg-blue/20"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="rounded-3xl bg-white border border-border p-6 shadow-sm overflow-hidden">
              <p className="font-semibold mb-1">Popular service</p>
              <p className="text-sm text-muted-foreground mb-3">
                Most booked this month:{" "}
                <span className="font-medium text-foreground">Blocked drain</span>
              </p>
              <img
                src="/products/blue/job-site.jpg"
                alt=""
                className="rounded-xl h-24 w-full object-cover"
              />
            </div>
            <div className="rounded-3xl bg-white border border-border p-6 shadow-sm">
              <p className="font-semibold mb-3">Upsells &amp; add-ons</p>
              <div className="space-y-2">
                {[
                  { label: "Inspection", w: "80%" },
                  { label: "Follow-up", w: "55%" },
                  { label: "Quote add", w: "40%" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center gap-2 text-xs">
                    <span className="w-20 text-muted-foreground shrink-0">{row.label}</span>
                    <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                      <div className="h-full rounded-full bg-blue" style={{ width: row.w }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section-padding bg-white">
        <div className="container-wide grid lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl bg-[hsl(210_25%_94%)] overflow-hidden max-w-md mx-auto lg:mx-0">
            <div className="p-5">
              <div className="rounded-2xl bg-[hsl(210_35%_18%)] text-white px-4 py-3 text-sm leading-relaxed">
                Hi David, thanks for trusting us with your job. Please leave a quick Google review for
                our team.
              </div>
            </div>
            <div className="relative aspect-[16/10]">
              <img
                src="/products/blue/hero.jpg"
                alt="Trade job complete"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                <p className="text-2xl font-bold">Your job is complete!</p>
                <p className="text-sm text-white/80 mt-1">Thanks for choosing your trade team.</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-blue mb-3 inline-flex items-center gap-2">
              <Star className="h-4 w-4 fill-blue" />
              Get more Google reviews
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5">
              Turn satisfied customers into Google reviews
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Google reviews drive local search. Blue can
              <Pill>
                <MessageSquare className="h-3 w-3" />
                request reviews
              </Pill>
              after every job, so you’re constantly building reputation. The more
              <Pill>
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                5-star reviews
              </Pill>
              you collect, the easier it is for new customers to find you.
            </p>
          </div>
        </div>
      </section>

      {/* Visual forms */}
      <section className="section-padding bg-[hsl(210_25%_96%)]">
        <div className="container-wide">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-12 max-w-2xl mx-auto">
            Visual forms that make bookings feel instant
          </h2>
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-3">
              {FORM_STEPS.map((step, i) => {
                const open = openFormStep === i;
                return (
                  <button
                    key={step.title}
                    type="button"
                    onClick={() => setOpenFormStep(open ? -1 : i)}
                    className="w-full text-left rounded-2xl bg-white border border-border p-5 shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-semibold text-foreground">{step.title}</span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue text-white shrink-0">
                        {open ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                      </span>
                    </div>
                    {open && (
                      <div className="mt-3 pr-8">
                        <p className="text-sm font-medium text-foreground mb-1">
                          Let customers tap their choice instead of typing.
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="relative mx-auto w-full max-w-[260px]">
              <div className="rounded-[2rem] border-[10px] border-[hsl(210_40%_14%)] bg-white shadow-xl overflow-hidden aspect-[9/16]">
                <div className="flex items-center justify-between px-4 pt-3">
                  <span className="text-blue">←</span>
                  <div className="h-1.5 flex-1 mx-3 rounded-full bg-secondary">
                    <div className="h-full w-[30%] rounded-full bg-blue" />
                  </div>
                  <span className="text-red-500 font-bold">×</span>
                </div>
                <p className="text-center text-xl font-bold mt-10 px-4">Select a service</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="relative overflow-hidden section-padding bg-[hsl(210_40%_14%)] text-white">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="container-wide relative text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
              <img src="/products/blue/icon.png" alt="" className="h-7 w-7 rounded-md" />
            </div>
            <ArrowRight className="h-4 w-4 text-white/50" />
            <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center">
              <Globe className="h-6 w-6 text-blue" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            One enquiry, updates everywhere
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Jobs, SMS, staff, and the board stay in sync — no double entry between the phone and the
            van.
          </p>
          <Button size="lg" className="rounded-full bg-white text-blue hover:bg-white/90" asChild>
            <a href="#demo">Try BMS Pro Blue</a>
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div className="max-w-xl">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                Don&apos;t take our word for it. Hear it from trades on Blue.
              </h2>
              <p className="text-muted-foreground text-lg">
                More jobs. Clearer boards. Real results.
              </p>
            </div>
            <Button variant="blue" className="rounded-full w-fit" asChild>
              <a href="#demo">
                Try BMS Pro Blue
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            <article className="md:col-span-2 relative min-h-[360px] rounded-3xl overflow-hidden">
              <img
                src={TESTIMONIALS[0].image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-6 text-white">
                <p className="text-lg font-medium leading-snug mb-6">
                  &ldquo;{TESTIMONIALS[0].quote}&rdquo;
                </p>
                <div>
                  <p className="font-semibold">{TESTIMONIALS[0].name}</p>
                  <p className="text-sm text-white/65">{TESTIMONIALS[0].role}</p>
                </div>
              </div>
            </article>
            <article className="md:col-span-3 relative min-h-[360px] rounded-3xl overflow-hidden">
              <img
                src={TESTIMONIALS[1].image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-8 text-white">
                <p className="text-2xl sm:text-3xl font-bold leading-snug mb-6 max-w-lg">
                  {TESTIMONIALS[1].stat}
                </p>
                <div>
                  <p className="font-semibold">{TESTIMONIALS[1].name}</p>
                  <p className="text-sm text-white/65">{TESTIMONIALS[1].role}</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="scroll-mt-20">
        <BluePricingSection offsetHeader={false} />
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Questions &amp; answers</h2>
            <p className="text-muted-foreground max-w-md lg:text-right">
              Everything you need to know about getting started with BMS Pro Blue for your trade
              business.
            </p>
          </div>

          <div className="grid lg:grid-cols-[240px_1fr] gap-8">
            <nav className="space-y-1">
              {FAQS.map((cat, i) => (
                <button
                  key={cat.category}
                  type="button"
                  onClick={() => {
                    setFaqCat(i);
                    setOpenFaq(0);
                  }}
                  className={cn(
                    "w-full text-left rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                    faqCat === i ? "bg-secondary text-blue" : "text-foreground hover:bg-secondary/60"
                  )}
                >
                  {cat.category}
                </button>
              ))}
            </nav>

            <div className="space-y-3">
              {FAQS[faqCat].items.map((item, i) => {
                const open = openFaq === i;
                return (
                  <div key={item.q} className="rounded-2xl bg-[hsl(210_25%_96%)] overflow-hidden">
                    <button
                      type="button"
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                      onClick={() => setOpenFaq(open ? -1 : i)}
                    >
                      <span className={cn("font-semibold", open ? "text-blue" : "text-foreground")}>
                        {item.q}
                      </span>
                      {open ? (
                        <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                      )}
                    </button>
                    {open && (
                      <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                        {item.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Demo form */}
      <section id="demo" className="scroll-mt-20 section-padding bg-[hsl(210_25%_97%)]">
        <div className="container-wide grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Try BMS Pro Blue for your trade business
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Book a walkthrough — demo, pricing, or help getting your crew onto Blue.
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                "Online booking + SMS confirmations",
                "Optional human front desk",
                "Jobs, quotes, and field staff",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-blue" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-white border border-border p-6 sm:p-8 shadow-sm space-y-4"
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
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
                required
                value={formData.company}
                onChange={handleChange}
                className="h-11 rounded-xl"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="message">Message (optional)</Label>
              <Textarea
                id="message"
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
              className="w-full rounded-full h-12"
              disabled={loading}
            >
              {loading ? "Sending..." : "Request Demo"}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              By continuing you agree to our{" "}
              <Link to="/terms" className="underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="underline">
                Privacy Policy
              </Link>
              .
            </p>
          </form>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative overflow-hidden section-padding bg-[hsl(210_40%_14%)] text-white text-center">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container-wide relative max-w-2xl mx-auto">
          <div className="flex justify-center mb-6">
            <img
              src="/products/blue/icon.png"
              alt=""
              className="h-14 w-14 rounded-2xl ring-1 ring-white/20"
            />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Growing jobs has never been this easy.
          </h2>
          <p className="text-white/65 mb-8">
            No lock-in · Book Now link ready · Built for Australian trades
          </p>
          <Button size="lg" className="rounded-full bg-white text-blue hover:bg-white/90" asChild>
            <a href="#demo">Try BMS Pro Blue</a>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default ProductBlue;
