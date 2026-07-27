import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BlackPricingSection } from "@/components/pricing/BlackPricingSection";
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
  "Mechanic shops",
  "Auto workshops",
  "Garages",
  "Service centres",
  "Multi-bay yards",
  "Dealership service",
];

const FORM_STEPS = [
  {
    title: "Visual selective cards",
    body: "Customers tap services, vehicle type, and branch instead of typing. Fast, easy, and feels effortless.",
  },
  {
    title: "Instant book through calendar",
    body: "Live availability from your working hours — they pick a slot that fits the bay.",
  },
  {
    title: "Offer recommended upsells",
    body: "Suggest add-ons and next services while they’re already booking.",
  },
  {
    title: "Ask the right questions",
    body: "Capture notes, vehicle details, and photos before the car arrives.",
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
        a: "Contact forms dump leads into email. Book Now captures the service, vehicle type, branch, and slot — then confirms by SMS so the job is already on the board.",
      },
      {
        q: "What if I don’t have a website?",
        a: "You get a public booking link for your workshop. Share it on Google, Facebook, or SMS — no website rebuild required.",
      },
      {
        q: "Can I customise what customers can book?",
        a: "Yes. You control services, prices by vehicle type, branches, hours, and who can take the job.",
      },
    ],
  },
  {
    category: "Front desk & calls",
    items: [
      {
        q: "Do I need a receptionist?",
        a: "Online-only plans run without one. Front Desk plans add a human receptionist who filters routine calls and books jobs while mechanics stay under the hood.",
      },
      {
        q: "What happens after hours?",
        a: "Customers can still book online 24/7. With Front Desk coverage, overflow and after-hours calls get answered instead of going to voicemail.",
      },
    ],
  },
  {
    category: "Workshop software",
    items: [
      {
        q: "Does Black include SMS?",
        a: "Plans can include SMS credits. You can also top up. Confirmations, reminders, and custom messages go out from the workshop.",
      },
      {
        q: "Can staff use it on the floor?",
        a: "Yes. Staff check in, handle leave, and accept or decline jobs on the mobile app while owners run the office dashboard.",
      },
    ],
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Mechanics under the hood, not on the phone. Black plus a real receptionist filtered the chaos out of our workshop.",
    name: "Workshop owner",
    role: "Multi-bay garage · VIC",
    image: "/products/black/mechanic-portrait.jpg",
    stat: null as string | null,
  },
  {
    quote: null,
    name: "Service manager",
    role: "Independent workshop · NSW",
    image: "/products/black/workshop-bay.jpg",
    stat: "Fewer missed bookings in the first month on Black",
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
        "inline-flex items-center gap-1.5 rounded-full border border-product-black/20 bg-product-black/5 px-2.5 py-0.5 text-xs font-semibold text-product-black align-middle mx-1",
        className
      )}
    >
      {children}
    </span>
  );
}

const ProductBlack = () => {
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
      await submitContactForm(
        { ...formData, product: "black" },
        "BMS Pro Black demo request"
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
        product: "black",
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
        title="BMS Pro Black | Workshop Booking & Operations"
        description="Let customers book from anywhere. Online booking, SMS reminders, staff, and optional human front desk for mechanic shops."
        path="/products/black"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "BMS Pro Black",
          description:
            "Workshop software for mechanic shops — Book Now, SMS, staff, and optional front desk.",
          brand: { "@type": "Brand", name: "BMS Pro" },
          url: "https://bmspros.com.au/products/black",
        }}
      />

      {/* Hero — Avenue-style growth visual */}
      <section className="relative overflow-hidden bg-white pt-8 pb-16 sm:pt-12 sm:pb-24">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-5">
                <img
                  src="/products/black/icon.png"
                  alt=""
                  className="h-8 w-8 rounded-lg ring-1 ring-black/10"
                />
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-product-black">
                  BMS Pro Black
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-[hsl(220_22%_10%)] leading-[1.08] mb-4">
                Let your customers book from anywhere, anytime.
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-md">
                Your workshop bookings before &amp; after using Black — fewer missed calls, fuller
                bays, mechanics under the hood.
              </p>
              <Button
                size="xl"
                variant="black"
                className="rounded-full h-12 px-7"
                asChild
              >
                <a href="#demo">
                  Try BMS Pro Black
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
              <div className="relative overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-25px_hsl(220_30%_15%/0.45)] ring-1 ring-black/5">
                <img
                  src="/products/black/mechanic-focus.jpg"
                  alt="Mechanic working under the bonnet in a workshop"
                  className="h-full w-full object-cover aspect-[4/3]"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220_30%_8%)]/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 text-white">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-white/70">
                      Bays working
                    </p>
                    <p className="text-2xl font-bold leading-tight">Mechanics under the hood</p>
                  </div>
                  <span className="hidden sm:inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-3 py-1.5 text-xs font-medium">
                    <Wrench className="h-3.5 w-3.5" />
                    Not on the phone
                  </span>
                </div>
              </div>

              {/* Floating bookings chart */}
              <div className="absolute -bottom-8 -left-2 sm:-left-8 w-[230px] rounded-2xl bg-white border border-border shadow-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-foreground">Bookings</p>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                    <TrendingUp className="h-3 w-3" />
                    +38%
                  </span>
                </div>
                <div className="flex items-end gap-1.5 h-20">
                  {[22, 28, 34, 38, 56, 64, 72, 80].map((h, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex-1 rounded-full",
                        i < 4
                          ? "bg-[hsl(220_20%_88%)]"
                          : "bg-gradient-to-t from-product-black to-[hsl(220_14%_38%)]"
                      )}
                      style={{ height: `${h}px` }}
                    />
                  ))}
                </div>
                <p className="mt-3 text-[11px] leading-snug text-muted-foreground">
                  First month with <span className="font-semibold text-foreground">BMS Pro Black</span>
                </p>
              </div>

              {/* Floating booking confirmation */}
              <div className="absolute -top-4 -right-2 sm:-right-6 w-[210px] rounded-2xl bg-white border border-border shadow-xl p-3.5">
                <div className="flex items-start gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-white">
                    <Check className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-foreground">Booking confirmed</p>
                    <p className="text-[11px] text-muted-foreground leading-snug">
                      Logbook service · Thu 8:00 AM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-border/60 bg-[hsl(220_14%_97%)] py-8 overflow-hidden">
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

      {/* Front desk / never miss a call */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="rounded-[2rem] bg-product-black text-white overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-8 p-8 sm:p-12 lg:p-14">
              <div className="flex flex-col justify-center">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                  <Phone className="h-5 w-5" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 leading-tight">
                  Never miss a call again — meet your workshop front desk.
                </h2>
                <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-md">
                  Human receptionists filter routine calls and book jobs into Black. Technicians only
                  take the complex ones — so the floor keeps moving.
                </p>
                <Button
                  size="lg"
                  className="w-fit rounded-full bg-white text-product-black hover:bg-white/90"
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
                  Keep mechanics under the hood, not on the phone.
                </p>
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src="/products/black/front-desk.jpg"
                    alt="Receptionist with a headset answering workshop calls"
                    className="h-full w-full object-cover aspect-[4/3]"
                    loading="lazy"
                  />
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-product-black/85 backdrop-blur px-3 py-1.5 text-xs font-medium text-white">
                    <Headphones className="h-3.5 w-3.5" />
                    Live reception
                  </span>
                </div>
                <p className="text-sm text-white/65 leading-relaxed">
                  Reception books routine work into the system. Technical calls get through. Less
                  downtime on the floor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book from Google / Book Now */}
      <section className="section-padding bg-[hsl(220_14%_98%)]">
        <div className="container-wide grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-sm font-semibold text-product-black mb-3 inline-flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Book Now
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
              Bookings straight from your public link
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Share your workshop Book Now page on Google, social, or SMS. Customers pick a service,
              vehicle type, and slot — then get a
              <Pill>
                <Calendar className="h-3 w-3" />
                Book Online
              </Pill>
              confirmation without you answering the phone.
            </p>
            <Button variant="black" className="rounded-full" asChild>
              <a href="https://black.bmspros.com.au/book-now" target="_blank" rel="noreferrer">
                See Book Now
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="relative mx-auto w-full max-w-[280px]">
            <div className="rounded-[2rem] border-[10px] border-[hsl(220_22%_12%)] bg-white shadow-2xl overflow-hidden aspect-[9/16]">
              <div className="flex items-center justify-between px-4 pt-3 pb-2">
                <span className="text-product-black text-lg">←</span>
                <div className="h-1.5 flex-1 mx-4 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full w-1/4 rounded-full bg-product-black" />
                </div>
                <span className="text-red-500 font-bold">×</span>
              </div>
              <div className="px-5 pt-8 text-center">
                <p className="text-xl font-bold text-foreground">Select service type</p>
                <div className="mt-8 space-y-3 text-left">
                  {["Logbook service", "Brake inspection", "Wheel alignment"].map((s) => (
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
                title: "Your appointment is confirmed",
                body: "You're all set for Thu, 8:00 AM — bay booked, SMS on the way.",
              },
              {
                icon: MessageSquare,
                color: "bg-emerald-500",
                title: "1H reminder",
                body: "Your car service tomorrow at 8:00 AM. Reply if you need to reschedule.",
              },
              {
                icon: MessageSquare,
                color: "bg-emerald-500",
                title: "Thanks for choosing us",
                body: "Service complete. Leave a quick Google review when you have a moment.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="flex gap-3 rounded-2xl border border-border bg-[hsl(220_14%_97%)] p-4 shadow-sm"
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
                src="/products/black/sms-phone.jpg"
                alt="Customer checking a booking reminder on their phone"
                className="w-full rounded-2xl object-cover shadow-lg"
                loading="lazy"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-sm font-semibold text-product-black mb-3 inline-flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Booking reminders
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
              when they book. Automated reminders go out before the appointment, reducing no-shows.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              You can also
              <Pill>
                <Wrench className="h-3 w-3" />
                schedule service reminders
              </Pill>
              to bring customers back when it’s time for their next service.
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard bento */}
      <section className="section-padding bg-[hsl(220_14%_98%)]">
        <div className="container-wide grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-sm font-semibold text-product-black mb-3 inline-flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Workshop dashboard
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Know how your workshop is performing at a glance
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Track bookings, staff, SMS, and revenue — with confirmations and reminders doing the
              heavy lifting in the background.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-3xl bg-product-black text-white p-6 sm:row-span-1">
              <p className="text-5xl font-bold tracking-tight mb-2">242</p>
              <p className="text-sm text-white/75 leading-relaxed">
                Customers submitted bookings through Book Now this month.
              </p>
            </div>
            <div className="rounded-3xl bg-white border border-border p-6 shadow-sm">
              <p className="font-semibold mb-1">Submission activity</p>
              <p className="text-sm text-muted-foreground mb-4">
                Half of bookings come from your public link.
              </p>
              <div className="h-16 flex items-end gap-1">
                {[40, 55, 48, 70, 85].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-md bg-product-black/20"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="rounded-3xl bg-white border border-border p-6 shadow-sm overflow-hidden">
              <p className="font-semibold mb-1">Popular service</p>
              <p className="text-sm text-muted-foreground mb-3">
                Most booked this month: <span className="font-medium text-foreground">Logbook service</span>
              </p>
              <img
                src="/products/black/workshop-bay.jpg"
                alt=""
                className="rounded-xl h-24 w-full object-cover"
              />
            </div>
            <div className="rounded-3xl bg-white border border-border p-6 shadow-sm">
              <p className="font-semibold mb-3">Upsells &amp; add-ons</p>
              <div className="space-y-2">
                {[
                  { label: "Brake pads", w: "80%" },
                  { label: "Cabin filter", w: "55%" },
                  { label: "Wheel align", w: "40%" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center gap-2 text-xs">
                    <span className="w-20 text-muted-foreground shrink-0">{row.label}</span>
                    <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full rounded-full bg-product-black"
                        style={{ width: row.w }}
                      />
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
          <div className="rounded-3xl bg-[hsl(220_14%_94%)] overflow-hidden max-w-md mx-auto lg:mx-0">
            <div className="p-5">
              <div className="rounded-2xl bg-[hsl(220_18%_22%)] text-white px-4 py-3 text-sm leading-relaxed">
                Hi Michael, thanks for trusting us with your vehicle. Please leave a quick Google
                review for our workshop.
              </div>
            </div>
            <div className="relative aspect-[16/10]">
              <img
                src="/products/black/hero.jpg"
                alt="Workshop after service"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                <p className="text-2xl font-bold">Your service is complete!</p>
                <p className="text-sm text-white/80 mt-1">Thanks for choosing your workshop.</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-product-black mb-3 inline-flex items-center gap-2">
              <Star className="h-4 w-4 fill-product-black" />
              Get more Google reviews
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5">
              Turn satisfied customers into Google reviews
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Google reviews drive local search. Black can
              <Pill>
                <MessageSquare className="h-3 w-3" />
                request reviews
              </Pill>
              after every service, so you’re constantly building reputation. The more
              <Pill>
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                5-star reviews
              </Pill>
              you collect, the easier it is for new customers to find you.
            </p>
          </div>
        </div>
      </section>

      {/* Visual forms accordion */}
      <section className="section-padding bg-[hsl(220_14%_97%)]">
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
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-product-black text-white shrink-0">
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
              <div className="rounded-[2rem] border-[10px] border-[hsl(220_22%_12%)] bg-white shadow-xl overflow-hidden aspect-[9/16]">
                <div className="flex items-center justify-between px-4 pt-3">
                  <span className="text-product-black">←</span>
                  <div className="h-1.5 flex-1 mx-3 rounded-full bg-secondary">
                    <div className="h-full w-[30%] rounded-full bg-product-black" />
                  </div>
                  <span className="text-red-500 font-bold">×</span>
                </div>
                <p className="text-center text-xl font-bold mt-10 px-4">Select a service</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations band */}
      <section className="relative overflow-hidden section-padding bg-product-black text-white">
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
              <img src="/products/black/icon.png" alt="" className="h-7 w-7 rounded-md" />
            </div>
            <ArrowRight className="h-4 w-4 text-white/50" />
            <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center">
              <Globe className="h-6 w-6 text-product-black" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            One enquiry, updates everywhere
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Bookings, SMS, staff, and the board stay in sync — no double entry between the phone and
            the hoist.
          </p>
          <Button
            size="lg"
            className="rounded-full bg-white text-product-black hover:bg-white/90"
            asChild
          >
            <a href="#demo">Try BMS Pro Black</a>
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div className="max-w-xl">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                Don&apos;t take our word for it. Hear it from workshops on Black.
              </h2>
              <p className="text-muted-foreground text-lg">
                More bookings. Clearer boards. Real results.
              </p>
            </div>
            <Button variant="black" className="rounded-full w-fit" asChild>
              <a href="#demo">
                Try BMS Pro Black
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
                <p className="text-lg font-medium leading-snug mb-6">&ldquo;{TESTIMONIALS[0].quote}&rdquo;</p>
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
        <BlackPricingSection offsetHeader={false} />
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Questions &amp; answers</h2>
            <p className="text-muted-foreground max-w-md lg:text-right">
              Everything you need to know about getting started with BMS Pro Black for your workshop.
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
                    faqCat === i
                      ? "bg-secondary text-product-black"
                      : "text-foreground hover:bg-secondary/60"
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
                  <div key={item.q} className="rounded-2xl bg-[hsl(220_14%_96%)] overflow-hidden">
                    <button
                      type="button"
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                      onClick={() => setOpenFaq(open ? -1 : i)}
                    >
                      <span
                        className={cn(
                          "font-semibold",
                          open ? "text-product-black" : "text-foreground"
                        )}
                      >
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
      <section id="demo" className="scroll-mt-20 section-padding bg-[hsl(220_14%_97%)]">
        <div className="container-wide grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Try BMS Pro Black for your workshop
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Book a walkthrough — demo, pricing, or help getting your bays onto Black.
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                "Online booking + SMS confirmations",
                "Optional human front desk",
                "Staff, branches, and job board",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-product-black" />
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
              <Label htmlFor="company">Workshop name</Label>
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
              variant="black"
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
      <section className="relative overflow-hidden section-padding bg-product-black text-white text-center">
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
              src="/products/black/icon.png"
              alt=""
              className="h-14 w-14 rounded-2xl ring-1 ring-white/20"
            />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Growing bookings has never been this easy.
          </h2>
          <p className="text-white/65 mb-8">
            No lock-in · Book Now link ready · Built for Australian workshops
          </p>
          <Button
            size="lg"
            className="rounded-full bg-white text-product-black hover:bg-white/90"
            asChild
          >
            <a href="#demo">Try BMS Pro Black</a>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default ProductBlack;
