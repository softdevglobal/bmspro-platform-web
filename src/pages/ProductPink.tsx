import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PinkPricingSection } from "@/components/pricing/PinkPricingSection";
import { ScrollPage, ScrollReveal } from "@/components/motion/ScrollReveal";
import { AnimateBars, AnimateCount, AnimateProgress, AnimateVisual, MarqueeStrip } from "@/components/motion/AnimateVisual";
import { BookingFlowPhone } from "@/components/motion/BookingFlowPhone";
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
  Sparkles,
  Star,
} from "lucide-react";

const TRUST_LOGOS = [
  "Hair salons",
  "Beauty salons",
  "Barbers",
  "Nail salons",
  "Makeup artists",
  "Brow and lash studios",
  "Massage businesses",
  "Wellness businesses",
];

const FORM_STEPS = [
  {
    title: "The customer chooses a service",
    body: "They pick from your clear service list name, category, description, duration and optional price.",
  },
  {
    title: "They request a suitable appointment",
    body: "The customer requests a time and provides their details through your booking link.",
  },
  {
    title: "The salon confirms the time",
    body: "Confirm the time, suggest another time, change the staff member or decline the request. You stay in control of the calendar.",
  },
  {
    title: "The appointment enters the staff calendar",
    body: "Once accepted, the appointment appears on the correct staff calendar with service, time and notes.",
  },
  {
    title: "Confirmation and reminder are sent",
    body: "The customer receives confirmation, then a configured reminder before the appointment.",
  },
  {
    title: "Complete, thank and rebook",
    body: "The appointment history is preserved. Where enabled, send a thank-you, review request or rebooking link.",
  },
];

const FAQS = [
  {
    category: "Getting started",
    items: [
      {
        q: "Can I sign up without booking a demonstration?",
        a: "Yes. You can create an account and explore BMS Pro Salon through the free trial.",
      },
      {
        q: "Do customers automatically control my calendar?",
        a: "No. Customers can request an appointment, but the salon controls final confirmation unless automatic confirmation is deliberately enabled.",
      },
    ],
  },
  {
    category: "Appointments",
    items: [
      {
        q: "Can customers choose a staff member?",
        a: "Where enabled, customers can request an available staff member for services that person provides.",
      },
      {
        q: "Can appointment reminders be sent automatically?",
        a: "Where enabled, reminders can be sent according to your configured timing and templates.",
      },
      {
        q: "Can I record cancellations and no-shows?",
        a: "Yes. Appointments can retain their history while being marked cancelled, rescheduled or did not attend.",
      },
    ],
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
        "inline-flex items-center gap-1.5 rounded-full border border-pink/20 bg-pink/5 px-2.5 py-0.5 text-xs font-semibold text-pink align-middle mx-1",
        className
      )}
    >
      {children}
    </span>
  );
}

const ProductPink = () => {
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
        "BMS Pro Salon demo request"
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
        product: "pink",
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
        title="BMS Pro Salon | Appointments for Salons, Barbers and Beauty"
        description="Keep your appointments organised without living on your phone. Manage online booking requests, staff schedules, services and customer updates from one place."
        path="/products/pink"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "BMS Pro Salon",
          description:
            "Let customers request appointments online while you manage your services, staff schedules and daily bookings from one place.",
          brand: { "@type": "Brand", name: "BMS Pro" },
          url: "https://bmspros.com.au/products/pink",
        }}
      />

      <ScrollPage>
      {/* Hero */}
      <section className="relative bg-white pt-8 pb-16 sm:pt-12 sm:pb-24">
        <div className="container-wide">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] gap-10 lg:gap-14 items-center">
            <ScrollReveal from="left" distance={64} className="relative z-10 min-w-0">
              <div className="inline-flex items-center gap-2 mb-5">
                <img
                  src="/products/pink/icon.png"
                  alt=""
                  className="h-8 w-8 rounded-lg ring-1 ring-black/10"
                />
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-pink">
                  BMS Pro Salon
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-bold tracking-tight text-[hsl(220_22%_10%)] leading-[1.08] mb-4">
                Keep your appointments organised without living on your phone.
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-md">
                Manage online booking requests, staff schedules, services and customer updates from
                one place. Your customers can request a suitable appointment, and you stay in control
                of what gets confirmed.
              </p>
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
                <Button size="lg" variant="pink" className="rounded-full h-11 px-5 sm:px-6 w-full sm:w-auto" asChild>
                  <a href="#demo">
                    Start Free Trial
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full h-11 px-5 sm:px-6 w-full sm:w-auto whitespace-normal sm:whitespace-nowrap text-center" asChild>
                  <a href="#workflow">See BMS Pro Salon in Action</a>
                </Button>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-600" />
                  Preview the booking experience before sharing it
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal from="right" distance={80} delay={0.12} className="relative z-0 min-w-0 w-full">
              <div className="relative overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-25px_hsl(340_30%_20%/0.35)] ring-1 ring-black/5 bg-[hsl(340_30%_10%)] w-full">
                <video
                  className="h-full w-full object-cover aspect-[16/10] sm:aspect-[16/9]"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster="/products/pink/stylist-focus.jpg"
                  aria-label="BMS Pro Salon product demo"
                >
                  <source src="/products/pink/pink.mp4" type="video/mp4" />
                </video>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-border/60 bg-[hsl(340_20%_98%)] py-8 overflow-hidden">
        <div className="container-wide mb-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground/60">
            Built for appointment-based businesses
          </p>
        </div>
        <MarqueeStrip
          items={TRUST_LOGOS}
          fadeFromClassName="from-[hsl(340_20%_98%)]"
        />
      </section>

      {/* Front desk */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="rounded-[2rem] bg-[hsl(340_25%_12%)] text-white overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-8 p-5 sm:p-8 lg:p-14">
              <ScrollReveal from="left" distance={56} className="flex flex-col justify-center">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                  <Phone className="h-5 w-5" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 leading-tight">
                  Your appointments shouldn&apos;t be spread across five different conversations.
                </h2>
                <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-md">
                  A customer messages through Instagram asking about Saturday. Someone else calls
                  while you&apos;re with a client. Another customer texts to move tomorrow&apos;s
                  appointment. One staff member has changed their hours, and now you&apos;re trying
                  to work out where the booking can go.
                </p>
                <Button
                  size="lg"
                  className="w-full sm:w-fit rounded-full bg-white text-pink hover:bg-white/90 whitespace-normal sm:whitespace-nowrap"
                  asChild
                >
                  <a href="#demo">
                    Book a Live Demonstration
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </ScrollReveal>

              <ScrollReveal from="right" distance={72} delay={0.1}>
              <div className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur-md p-6 sm:p-7 flex flex-col gap-6">
                <p className="text-lg font-semibold leading-snug">
                  The information is there. It is just spread across calls, messages, notes and
                  different calendars.
                </p>
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src="/products/pink/front-desk.jpg"
                    alt="Salon receptionist greeting a client"
                    className="h-full w-full object-cover aspect-[4/3]"
                    loading="lazy"
                  />
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-[hsl(340_25%_12%/0.85)] backdrop-blur px-3 py-1.5 text-xs font-medium text-white">
                    <Headphones className="h-3.5 w-3.5" />
                    One connected system
                  </span>
                </div>
                <p className="text-sm text-white/65 leading-relaxed">
                  BMS Pro Salon keeps the customer, service, staff member and appointment together.
                </p>
              </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Book Now */}
      <section className="section-padding bg-[hsl(340_20%_98%)]">
        <div className="container-wide grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-sm font-semibold text-pink mb-3 inline-flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Online booking
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
              Let customers request an appointment even when you&apos;re with someone else.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              They can use your booking link through your website, Google Business Profile,
              Instagram, Facebook, text message or email. You decide what gets confirmed a request
              does not automatically become a confirmed appointment unless you choose that setting.
              <Pill>
                <Calendar className="h-3 w-3" />
                You stay in control
              </Pill>
            </p>
            <Button variant="pink" className="rounded-full w-full sm:w-auto whitespace-normal sm:whitespace-nowrap" asChild>
              <a href="https://pink.bmspros.com.au/book-now" target="_blank" rel="noreferrer">
                Preview the Customer Booking Experience
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <AnimateVisual from="right" distance={72} delay={0.1} className="relative mx-auto w-full max-w-[220px] sm:max-w-[280px] overflow-visible">
            <BookingFlowPhone variant="salon" />
          </AnimateVisual>
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
                body: "You're all set for Fri, 2:00 PM chair booked, SMS on the way.",
              },
              // {
              //   icon: MessageSquare,
              //   color: "bg-emerald-500",
              //   title: "1H reminder",
              //   body: "Your cut & colour tomorrow at 2:00 PM. Reply if you need to reschedule.",
              // },
              {
                icon: MessageSquare,
                color: "bg-emerald-500",
                title: "Thanks for choosing us",
                body: "Appointment complete. Leave a quick Google review when you have a moment.",
              },
            ].map((card, i) => (
              <ScrollReveal key={card.title} from="left" distance={48} delay={i * 0.08}>
              <div className="flex gap-3 rounded-2xl border border-border bg-[hsl(340_20%_97%)] p-4 shadow-sm">
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
              </ScrollReveal>
            ))}
            <AnimateVisual from="bottom" distance={56} delay={0.2}>
            <div className="pt-4">
              <img
                src="/products/pink/sms-phone.jpg"
                alt="Client checking a booking reminder on their phone"
                className="w-full rounded-2xl object-cover shadow-lg aspect-[4/3] max-h-[420px]"
                loading="lazy"
              />
            </div>
            </AnimateVisual>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-sm font-semibold text-pink mb-3 inline-flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Reminders
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5">
              Send reminders without typing the same message every day.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Use booking-received, appointment-confirmed, reminder, changed, cancelled, thank-you,
              review and rebooking messages.
              <Pill>
                <MessageSquare className="h-3 w-3" />
                You control timing and wording
              </Pill>
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Handle changes without losing track 
              <Pill>
                <Sparkles className="h-3 w-3" />
                reschedule, cancel or record a no-show
              </Pill>
              while preserving appointment history.
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard bento */}
      <section className="section-padding bg-[hsl(340_20%_98%)]">
        <div className="container-wide grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-sm font-semibold text-pink mb-3 inline-flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Calendar &amp; staff
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              See the whole day without opening every message.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              See who is booked, what service they are receiving, which staff member is responsible,
              the start time, duration, status and relevant notes with each staff calendar kept
              clear.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <ScrollReveal from="bottom" distance={48} delay={0}>
            <div className="rounded-3xl bg-pink text-white p-6">
              <p className="text-5xl font-bold tracking-tight mb-2"><AnimateCount value={318} /></p>
              <p className="text-sm text-white/75 leading-relaxed">
                Clients submitted bookings through Book Now this month.
              </p>
            </div>
            </ScrollReveal>
            <ScrollReveal from="bottom" distance={48} delay={0.08}>
            <div className="rounded-3xl bg-white border border-border p-6 shadow-sm">
              <p className="font-semibold mb-1">Submission activity</p>
              <p className="text-sm text-muted-foreground mb-4">
                Half of bookings come from your public link.
              </p>
              <AnimateBars
                className="h-16"
                values={[40, 55, 48, 70, 85]}
                asPercent
                barClassName="rounded-t-md bg-pink/20"
                delay={0.15}
              />
            </div>
            </ScrollReveal>
            <ScrollReveal from="bottom" distance={48} delay={0.16}>
            <div className="rounded-3xl bg-white border border-border p-6 shadow-sm overflow-hidden">
              <p className="font-semibold mb-1">Popular service</p>
              <p className="text-sm text-muted-foreground mb-3">
                Most booked this month:{" "}
                <span className="font-medium text-foreground">Cut &amp; colour</span>
              </p>
              <img
                src="/products/pink/salon-bay.jpg"
                alt=""
                className="rounded-xl h-24 w-full object-cover"
              />
            </div>
            </ScrollReveal>
            <ScrollReveal from="bottom" distance={48} delay={0.24}>
            <div className="rounded-3xl bg-white border border-border p-6 shadow-sm">
              <p className="font-semibold mb-3">Upsells &amp; add-ons</p>
              <AnimateProgress
                barClassName="bg-pink"
                delay={0.2}
                rows={[
                  { label: "Toner", width: "80%" },
                  { label: "Treatment", width: "55%" },
                  { label: "Blow dry", width: "40%" },
                ]}
              />
            </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section-padding bg-white">
        <div className="container-wide grid lg:grid-cols-2 gap-12 items-center">
          <AnimateVisual from="left" distance={64}>
          <div className="rounded-3xl bg-[hsl(340_20%_94%)] overflow-hidden max-w-md mx-auto lg:mx-0">
            <div className="p-5">
              <div className="rounded-2xl bg-[hsl(340_25%_18%)] text-white px-4 py-3 text-sm leading-relaxed">
                Hi Sophie, thanks for trusting us with your hair. Please leave a quick Google review
                for our salon.
              </div>
            </div>
            <div className="relative aspect-[16/10]">
              <img
                src="/products/pink/hero.jpg"
                alt="Salon after a visit"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                <p className="text-2xl font-bold">Your appointment is complete!</p>
                <p className="text-sm text-white/80 mt-1">Thanks for choosing your salon.</p>
              </div>
            </div>
          </div>
          </AnimateVisual>

          <div>
            <p className="text-sm font-semibold text-pink mb-3 inline-flex items-center gap-2">
              <Star className="h-4 w-4 fill-pink" />
              Get more Google reviews
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5">
              Keep the customer&apos;s appointment history easy to find.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Keep contact details, appointment history, preferred services, preferred staff member,
              notes and future reminders together. After the visit, send a
              <Pill>
                <MessageSquare className="h-3 w-3" />
                thank-you or review request
              </Pill>
              . The more
              <Pill>
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                5-star reviews
              </Pill>
              you collect, the easier it is for new customers to find you.
            </p>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="scroll-mt-20 section-padding bg-[hsl(340_20%_97%)]">
        <div className="container-wide">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-3 max-w-2xl mx-auto">
            From booking request to completed appointment
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            The customer gets a simple booking experience, while you keep control of your calendar.
          </p>
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
                      <span className="font-semibold text-foreground">
                        {i + 1}. {step.title}
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-pink text-white shrink-0">
                        {open ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                      </span>
                    </div>
                    {open && (
                      <div className="mt-3 pr-8">
                        <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <AnimateVisual from="right" distance={72} delay={0.1} className="relative mx-auto w-full max-w-[200px] sm:max-w-[280px] lg:sticky lg:top-28">
              <div className="relative overflow-hidden rounded-[2rem] border-[10px] border-[hsl(340_25%_12%)] bg-[hsl(340_25%_12%)] shadow-2xl aspect-[9/16]">
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="BMS Pro Salon mobile booking flow"
                  ref={(el) => {
                    if (el) el.playbackRate = 0.65;
                  }}
                  onPlay={(e) => {
                    e.currentTarget.playbackRate = 0.65;
                  }}
                >
                  <source src="/products/pink/pink-mobile.mp4" type="video/mp4" />
                </video>
              </div>
            </AnimateVisual>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="relative overflow-hidden section-padding bg-[hsl(340_25%_12%)] text-white">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="container-wide relative text-center max-w-2xl mx-auto">
          <AnimateVisual from="scale" distance={40} className="flex items-center justify-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
              <img src="/products/pink/icon.png" alt="" className="h-7 w-7 rounded-md" />
            </div>
            <ArrowRight className="h-4 w-4 text-white/50" />
            <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center">
              <Globe className="h-6 w-6 text-pink" />
            </div>
          </AnimateVisual>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Take a proper look inside BMS Pro Salon
          </h2>
          <p className="text-white/70 text-lg mb-8">
            View the dashboard, booking request, calendar, services, customer, staff and message
            screens using the real product.
          </p>
          <Button size="lg" className="rounded-full bg-white text-pink hover:bg-white/90" asChild>
            <a href="#demo">See BMS Pro Salon in Action</a>
          </Button>
        </div>
      </section>

      {/* Setup highlight */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div className="max-w-xl">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                Start with your services, staff and opening hours.
              </h2>
              <p className="text-muted-foreground text-lg">
                Add your salon details, services, service durations, staff, staff hours and customer
                messages. Preview the booking page before making it public.
              </p>
            </div>
            <Button variant="pink" className="rounded-full w-fit" asChild>
              <a href="#demo">
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            <ScrollReveal from="left" distance={64} className="md:col-span-2">
            <article className="relative min-h-[280px] sm:min-h-[360px] rounded-3xl overflow-hidden h-full">
              <img
                src="/products/pink/stylist-portrait.jpg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-6 text-white">
                <p className="text-lg font-medium leading-snug mb-6">
                  Show customers what they can book service name, category, description, duration,
                  optional price and available staff.
                </p>
                <div>
                  <p className="font-semibold">Services</p>
                  <p className="text-sm text-white/65">Clear list with booking visibility you control</p>
                </div>
              </div>
            </article>
            </ScrollReveal>
            <ScrollReveal from="right" distance={64} delay={0.12} className="md:col-span-3">
            <article className="relative min-h-[280px] sm:min-h-[360px] rounded-3xl overflow-hidden h-full">
              <img
                src="/products/pink/salon-bay.jpg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-8 text-white">
                <p className="text-2xl sm:text-3xl font-bold leading-snug mb-6 max-w-lg">
                  Keep every staff calendar clear.
                </p>
                <div>
                  <p className="font-semibold">Staff schedules</p>
                  <p className="text-sm text-white/65">
                    You control who can edit bookings and view records
                  </p>
                </div>
              </div>
            </article>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="scroll-mt-20">
        <PinkPricingSection variant="embedded" offsetHeader={false} />
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Questions &amp; answers</h2>
            <p className="text-muted-foreground max-w-md lg:text-right">
              Everything you need to know about getting started with BMS Pro Salon for your
              appointment-based business.
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
                    faqCat === i ? "bg-secondary text-pink" : "text-foreground hover:bg-secondary/60"
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
                  <div key={item.q} className="rounded-2xl bg-[hsl(340_20%_96%)] overflow-hidden">
                    <button
                      type="button"
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                      onClick={() => setOpenFaq(open ? -1 : i)}
                    >
                      <span className={cn("font-semibold", open ? "text-pink" : "text-foreground")}>
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
      <section id="demo" className="scroll-mt-20 section-padding bg-[hsl(340_20%_97%)]">
        <div className="container-wide grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Ready to organise your appointments in one place?
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Set up your services, staff and availability, then preview the customer booking
              experience before sharing it.
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                "Online appointment requests you control",
                "Services, staff calendars and customer records",
                "Reminders, changes and rebooking messages",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-pink shrink-0 mt-0.5" />
                    {t}
                  </li>
              ))}
            </ul>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-white border border-border p-6 sm:p-8 shadow-sm space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
              <Label htmlFor="company">Salon name</Label>
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
              variant="pink"
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
      <section className="relative overflow-hidden section-padding bg-[hsl(340_25%_12%)] text-white text-center">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container-wide relative max-w-2xl mx-auto">
          <AnimateVisual from="scale" distance={40} className="flex justify-center mb-6">
            <img
              src="/products/pink/icon.png"
              alt=""
              className="h-14 w-14 rounded-2xl ring-1 ring-white/20"
            />
          </AnimateVisual>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Ready to organise your appointments in one place?
          </h2>
          <p className="text-white/65 mb-8">
            Explore BMS Pro Salon before moving your current appointments.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" className="rounded-full bg-white text-pink hover:bg-white/90" asChild>
              <a href="#demo">Start My Free Trial</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white"
              asChild
            >
              <a href="#demo">Book a Live Demonstration</a>
            </Button>
          </div>
        </div>
      </section>
      </ScrollPage>
    </Layout>
  );
};

export default ProductPink;
