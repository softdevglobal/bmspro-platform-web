import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BluePricingSection } from "@/components/pricing/BluePricingSection";
import { ScrollPage, ScrollReveal } from "@/components/motion/ScrollReveal";
import { AnimateBars, AnimateCount, AnimateProgress, AnimateVisual, MarqueeStrip } from "@/components/motion/AnimateVisual";
import { BookingFlowPhone } from "@/components/motion/BookingFlowPhone";
import { submitContactForm } from "@/lib/contactForm";
import { useToast } from "@/hooks/use-toast";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ArrowDown,
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
} from "lucide-react";

const TRUST_LOGOS = [
  "Electricians",
  "Plumbers",
  "Security installers",
  "Cleaners",
  "Painters",
  "Handymen",
  "Property maintenance",
  "HVAC technicians",
  "Solar installers",
];

const WHO_ITS_FOR = [
  {
    title: "Plumbers",
    body: "Keep enquiries, quotes and on-site jobs connected from the first call to payment.",
  },
  {
    title: "Electricians & locksmiths",
    body: "Schedule jobs, assign staff or subcontractors, and send updates from the field.",
  },
  {
    title: "Mobile service businesses",
    body: "Capture photos, notes and invoices without re-entering the same job three times.",
  },
];

const PRODUCT_SCREENS = [
  {
    title: "Lead / enquiry",
    caption: "Capture the customer, site and what they need before anything else.",
    src: "/products/blue/front-desk.jpg",
    alt: "Trade front desk handling customer enquiries",
  },
  {
    title: "Quote",
    caption: "Build quotes with labour, materials and follow-ups in one place.",
    src: "/products/blue/quotes.png",
    alt: "Quote workflow preview for trade businesses",
  },
  {
    title: "Job detail",
    caption: "Turn approved quotes into jobs with staff or subcontractor assignment.",
    src: "/products/blue/jobs.jpg",
    alt: "Job detail and scheduling for field service",
  },
  {
    title: "Field updates & invoice",
    caption: "Photos, notes and payment links after the work is done.",
    src: "/products/blue/job-site.jpg",
    alt: "Job site updates and completion for trades",
  },
];

const FORM_STEPS = [
  {
    title: "Record the enquiry",
    body: "Customer, site, requested service, notes, preferred dates and lead source.",
  },
  {
    title: "Choose the next step",
    body: "Book an inspection, prepare a quote, request more information, schedule work or decline unsuitable work.",
  },
  {
    title: "Create the quote",
    body: "Add labour, materials, services, terms, attachments and expiry date.",
  },
  {
    title: "Follow it up",
    body: "Keep unanswered quotes visible and send enabled reminders.",
  },
  {
    title: "Turn approval into a job",
    body: "Reuse the customer, site, scope and quoted items then assign staff or an approved subcontractor.",
  },
  {
    title: "Complete the job and invoice",
    body: "View details, navigate, complete tasks, upload photos and add notes. Reuse completed job information for the final paperwork.",
  },
];

const FAQS = [
  {
    category: "Getting started",
    items: [
      {
        q: "Can I sign up without booking a demonstration?",
        a: "Yes. You can create an account and explore BMS Pro Trade through the free trial.",
      },
      {
        q: "Can customers book any time they want?",
        a: "Customers can request suitable dates or times, but your business controls the final confirmation.",
      },
    ],
  },
  {
    category: "Quotes & jobs",
    items: [
      {
        q: "Can I follow up unanswered quotes?",
        a: "BMS Pro Trade can help identify quotes waiting for a response and create follow-up actions. Automated messages depend on your settings.",
      },
      {
        q: "Can I assign work to subcontractors?",
        a: "Where subcontractor access is enabled, you can assign approved jobs and control what information they can see.",
      },
      {
        q: "Can I create invoices?",
        a: "Where invoice management is included in the selected plan, completed work can be moved into the invoicing workflow.",
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
    product: "Trade",
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
        { ...formData, product: "Trade" },
        "BMS Pro Trade demo request"
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
        product: "Trade",
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
        title="BMS Pro Trade | Enquiries, Quotes and Jobs for Field Service"
        description="Keep every enquiry, quote and job moving. Manage customer enquiries, quotes, jobs, staff, subcontractors and invoices in one connected system."
        path="/products/blue"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "BMS Pro Trade",
          description:
            "Keep enquiries, quotes, jobs, staff, subcontractors and invoices connected from the first customer call through to final payment.",
          brand: { "@type": "Brand", name: "BMS Pro" },
          url: "https://bmspros.com.au/products/blue",
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
                  src="/products/blue/icon.png"
                  alt=""
                  className="h-8 w-8 rounded-lg ring-1 ring-black/10"
                />
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-blue">
                  BMS Pro Trade
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-bold tracking-tight text-[hsl(220_22%_10%)] leading-[1.08] mb-4">
                Keep every enquiry, quote and job moving.
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-md">
                Manage customer enquiries, quotes, jobs, staff, subcontractors and invoices in one
                connected system. See what needs following up, who is doing the work and what the
                customer needs to hear next.
              </p>
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
                <Button size="lg" variant="blue" className="rounded-full h-11 px-5 sm:px-6 w-full sm:w-auto" asChild>
                  <Link to="/contact?type=Trade">
                    Book Trade Walkthrough
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full h-11 px-5 sm:px-6 w-full sm:w-auto whitespace-normal sm:whitespace-nowrap text-center" asChild>
                  <a href="https://trade.bmspros.com.au/login">See BMS Pro Trade in Action</a>
                </Button>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-600" />
                  Explore the platform before changing your current process
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal from="right" distance={80} delay={0.12} className="relative z-0 min-w-0 w-full">
              <div className="relative overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-25px_hsl(210_40%_20%/0.4)] ring-1 ring-black/5 bg-[hsl(210_40%_10%)] w-full">
                <video
                  className="h-full w-full object-cover aspect-[16/10] sm:aspect-[16/9]"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster="/products/blue/tradesperson-focus.jpg"
                  aria-label="BMS Pro Trade product demo"
                >
                  <source src="/products/blue/blue.mp4" type="video/mp4" />
                </video>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-border/60 bg-[hsl(210_25%_97%)] py-8 overflow-hidden">
        <div className="container-wide mb-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground/60">
            Built for businesses that take the work to the customer
          </p>
        </div>
        <MarqueeStrip
          items={TRUST_LOGOS}
          fadeFromClassName="from-[hsl(210_25%_97%)]"
        />
      </section>

      {/* Who it is for */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-semibold text-blue mb-3">Who it is for</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Built for plumbers, electricians, locksmiths and mobile service businesses.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              BMS Pro Trade connects enquiries, quotes, job scheduling, subcontractors, photos and
              invoices so the same job isn&apos;t entered three times.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 lg:gap-6">
            {WHO_ITS_FOR.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-[hsl(210_25%_98%)] p-6"
              >
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Front desk */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="rounded-[2rem] bg-[hsl(210_40%_14%)] text-white overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-8 p-5 sm:p-8 lg:p-14">
              <ScrollReveal from="left" distance={56} className="flex flex-col justify-center">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                  <Phone className="h-5 w-5" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 leading-tight">
                  The work is not the problem. Keeping everything connected is.
                </h2>
                <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-md">
                  A customer calls while you&apos;re on-site. The inspection gets booked, but the
                  quote is sent two days later. Nobody follows it up. A week later, staff ask for the
                  address and the customer wants to know when someone is arriving.
                </p>
                <Button
                  size="lg"
                  className="w-full sm:w-fit rounded-full bg-white text-blue hover:bg-white/90 whitespace-normal sm:whitespace-nowrap"
                  asChild
                >
                  <Link to="/contact?type=Trade">
                    Book Trade Walkthrough
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </ScrollReveal>

              <ScrollReveal from="right" distance={72} delay={0.1}>
              <div className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur-md p-6 sm:p-7 flex flex-col gap-6">
                <p className="text-lg font-semibold leading-snug">
                  The information is there. It is just spread across calls, messages, emails,
                  calendars and paperwork.
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
                    Connected workflow
                  </span>
                </div>
                <p className="text-sm text-white/65 leading-relaxed">
                  BMS Pro Trade keeps the enquiry, quote, job, team and customer updates connected
                  from start to finish.
                </p>
              </div>
              </ScrollReveal>
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
              Enquiries
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
              Stop letting new enquiries disappear into your phone.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Every new enquiry should have a clear next step. Record who contacted you, what they
              need, where the work is, when they want it done, whether an inspection is required and
              who is responsible for following it up.
              <Pill>
                <Calendar className="h-3 w-3" />
                You confirm the time
              </Pill>
            </p>
            <Button variant="blue" className="rounded-full w-full sm:w-auto whitespace-normal sm:whitespace-nowrap" asChild>
              <a href="https://blue.bmspros.com.au/book-now" target="_blank" rel="noreferrer">
                See the Customer Booking Experience
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <AnimateVisual from="right" distance={72} delay={0.1} className="relative mx-auto w-full max-w-[220px] sm:max-w-[280px] overflow-visible">
            <BookingFlowPhone variant="trade" />
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
                title: "Your job is confirmed",
                body: "You're all set for Tue, 9:00 AM crew booked, SMS on the way.",
              },
              // {
              //   icon: MessageSquare,
              //   color: "bg-emerald-500",
              //   title: "1H reminder",
              //   body: "Your plumber arrives tomorrow at 9:00 AM. Reply if you need to reschedule.",
              // },
              {
                icon: MessageSquare,
                color: "bg-emerald-500",
                title: "Thanks for choosing us",
                body: "Job complete. Leave a quick Google review when you have a moment.",
              },
            ].map((card, i) => (
              <ScrollReveal key={card.title} from="left" distance={48} delay={i * 0.08}>
              <div className="flex gap-3 rounded-2xl border border-border bg-[hsl(210_25%_97%)] p-4 shadow-sm">
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
                src="/products/blue/sms-phone.jpg"
                alt="Customer checking a job reminder on their phone"
                className="w-full rounded-2xl object-cover shadow-lg aspect-[4/3] max-h-[420px]"
                loading="lazy"
              />
            </div>
            </AnimateVisual>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-sm font-semibold text-blue mb-3 inline-flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Customer communication
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5">
              Keep customers updated before they start chasing you.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Send useful updates such as enquiry received, inspection confirmed, quote sent, quote
              reminder, job confirmed, technician on the way, work completed, invoice issued and
              payment reminder.
              <Pill>
                <MessageSquare className="h-3 w-3" />
                You control the messages
              </Pill>
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              You also
              <Pill>
                <Hammer className="h-3 w-3" />
                stop entering the same job three times
              </Pill>
              carry approved quotes into jobs, then into invoices.
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
              Scheduling
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              See the work, the team and the available time in one calendar.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              See what work is booked, who is doing it and whether there is enough time to complete
              it. View day, week, month, staff, subcontractor and unassigned-job calendars.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <ScrollReveal from="bottom" distance={48} delay={0}>
            <div className="rounded-3xl bg-blue text-white p-6">
              <p className="text-5xl font-bold tracking-tight mb-2"><AnimateCount value={186} /></p>
              <p className="text-sm text-white/75 leading-relaxed">
                Customers submitted jobs through Book Now this month.
              </p>
            </div>
            </ScrollReveal>
            <ScrollReveal from="bottom" distance={48} delay={0.08}>
            <div className="rounded-3xl bg-white border border-border p-6 shadow-sm">
              <p className="font-semibold mb-1">Submission activity</p>
              <p className="text-sm text-muted-foreground mb-4">
                Half of jobs come from your public link.
              </p>
              <AnimateBars
                className="h-16"
                values={[40, 55, 48, 70, 85]}
                asPercent
                barClassName="rounded-t-md bg-blue/20"
                delay={0.15}
              />
            </div>
            </ScrollReveal>
            <ScrollReveal from="bottom" distance={48} delay={0.16}>
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
            </ScrollReveal>
            <ScrollReveal from="bottom" distance={48} delay={0.24}>
            <div className="rounded-3xl bg-white border border-border p-6 shadow-sm">
              <p className="font-semibold mb-3">Upsells &amp; add-ons</p>
              <AnimateProgress
                barClassName="bg-blue"
                delay={0.2}
                rows={[
                  { label: "Inspection", width: "80%" },
                  { label: "Follow-up", width: "55%" },
                  { label: "Quote add", width: "40%" },
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
          </AnimateVisual>

          <div>
            <p className="text-sm font-semibold text-blue mb-3 inline-flex items-center gap-2">
              <Star className="h-4 w-4 fill-blue" />
              Get more Google reviews
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5">
              Make it clear what needs to be done before the job is closed.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Keep the customer, site, scope, scheduled time, assigned workers, task list, notes,
              photos and completion status together. After the job,
              <Pill>
                <MessageSquare className="h-3 w-3" />
                request a review
              </Pill>
              so you’re building reputation. The more
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
      {/* Product screens */}
      <section className="section-padding bg-white border-t border-border/40">
        <div className="container-wide">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-semibold text-blue mb-3">Product screens</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              From enquiry to invoice without starting again.
            </h2>
            <p className="text-muted-foreground text-lg">
              Lead capture, quotes, job detail, field updates and payment links connected end to
              end so nothing gets retyped.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRODUCT_SCREENS.map((screen) => (
              <figure
                key={screen.title}
                className="rounded-2xl border border-border overflow-hidden bg-[hsl(210_25%_98%)]"
              >
                <img
                  src={screen.src}
                  alt={screen.alt}
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
                <figcaption className="p-4">
                  <p className="font-semibold text-foreground text-sm mb-1">{screen.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{screen.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="scroll-mt-20 section-padding bg-[hsl(210_25%_96%)]">
        <div className="container-wide">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-3 max-w-2xl mx-auto">
            From the first enquiry to the final invoice
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Every step stays connected, so the same customer and job details do not need to be
            entered again and again.
          </p>
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-0">
              {FORM_STEPS.map((step, i) => {
                const open = openFormStep === i;
                const isLast = i === FORM_STEPS.length - 1;
                return (
                  <div key={step.title}>
                    <button
                      type="button"
                      onClick={() => setOpenFormStep(open ? -1 : i)}
                      className="w-full text-left rounded-2xl bg-white border border-border p-5 shadow-sm"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-semibold text-foreground">
                          {i + 1}. {step.title}
                        </span>
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue text-white shrink-0">
                          {open ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                        </span>
                      </div>
                      {open && (
                        <div className="mt-3 pr-8">
                          <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                        </div>
                      )}
                    </button>
                    {!isLast && (
                      <div className="flex flex-col items-center py-1.5" aria-hidden>
                        <div className="h-3 w-px bg-border" />
                        <ArrowDown className="h-4 w-4 text-muted-foreground/70 -mt-0.5" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <AnimateVisual from="right" distance={72} delay={0.1} className="relative mx-auto w-full max-w-[200px] sm:max-w-[280px] lg:sticky lg:top-28">
              <div className="relative overflow-hidden rounded-[2rem] border-[10px] border-[hsl(210_40%_14%)] bg-[hsl(210_40%_14%)] shadow-2xl aspect-[9/16]">
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="BMS Pro Trade mobile booking flow"
                  ref={(el) => {
                    if (el) el.playbackRate = 0.65;
                  }}
                  onPlay={(e) => {
                    e.currentTarget.playbackRate = 0.65;
                  }}
                >
                  <source src="/products/blue/trade_mobile.mp4" type="video/mp4" />
                </video>
              </div>
            </AnimateVisual>
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
          <AnimateVisual from="scale" distance={40} className="flex items-center justify-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
              <img src="/products/blue/icon.png" alt="" className="h-7 w-7 rounded-md" />
            </div>
            <ArrowRight className="h-4 w-4 text-white/50" />
            <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center">
              <Globe className="h-6 w-6 text-blue" />
            </div>
          </AnimateVisual>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Take a proper look inside BMS Pro Trade
          </h2>
          <p className="text-white/70 text-lg mb-8">
            View the dashboard, enquiries, quotes, calendar, job card, team, customer updates and
            invoices using real product screens.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" className="rounded-full bg-white text-blue hover:bg-white/90" asChild>
              <Link to="/contact?type=Trade">Book Trade Walkthrough</Link>
            </Button>
           
          </div>
        </div>
      </section>

      {/* Setup highlight */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div className="max-w-xl">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                Start with the workflow causing the most trouble.
              </h2>
              <p className="text-muted-foreground text-lg">
                Begin with your business details, services, team, booking availability, quote
                templates, job statuses, customer messages and invoice settings. Add other functions
                as your team becomes comfortable.
              </p>
            </div>
            <Button variant="blue" className="rounded-full w-fit" asChild>
              <Link to="/contact?type=Trade">
                Book Trade Walkthrough
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            <ScrollReveal from="left" distance={64} className="md:col-span-2">
            <article className="relative min-h-[280px] sm:min-h-[360px] rounded-3xl overflow-hidden h-full">
              <img
                src="/products/blue/tradesperson-portrait.jpg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-6 text-white">
                <p className="text-lg font-medium leading-snug mb-6">
                  The job details go with your team view the job, navigate, mark on the way,
                  complete tasks, upload photos and finish the work.
                </p>
                <div>
                  <p className="font-semibold">Mobile job experience</p>
                  <p className="text-sm text-white/65">Staff and subcontractor access you control</p>
                </div>
              </div>
            </article>
            </ScrollReveal>
            <ScrollReveal from="right" distance={64} delay={0.12} className="md:col-span-3">
            <article className="relative min-h-[280px] sm:min-h-[360px] rounded-3xl overflow-hidden h-full">
              <img
                src="/products/blue/job-site.jpg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-8 text-white">
                <p className="text-2xl sm:text-3xl font-bold leading-snug mb-6 max-w-lg">
                  Send the quote and know what needs following up.
                </p>
                <div>
                  <p className="font-semibold">Quotes &amp; follow-ups</p>
                  <p className="text-sm text-white/65">
                    Prepared, sent, viewed, accepted, declined or waiting
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
        <BluePricingSection variant="embedded" offsetHeader={false} />
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Questions &amp; answers</h2>
            <p className="text-muted-foreground max-w-md lg:text-right">
              Everything you need to know about getting started with BMS Pro Trade for your
              field-service business.
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
              Ready to keep the whole job connected?
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Set up your account, add your services and test the workflow before moving your
              current jobs across.
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                "Enquiries, quotes and follow-ups",
                "Jobs, staff and subcontractor assignment",
                "Connected invoices and customer updates",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-blue shrink-0 mt-0.5" />
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
          <AnimateVisual from="scale" distance={40} className="flex justify-center mb-6">
            <img
              src="/products/blue/icon.png"
              alt=""
              className="h-14 w-14 rounded-2xl ring-1 ring-white/20"
            />
          </AnimateVisual>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Ready to keep the whole job connected?
          </h2>
          <p className="text-white/65 mb-8">
            Explore BMS Pro Trade before changing the way your team currently works.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
              size="lg"
              variant="outline"
              className="rounded-full border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white"
              asChild
            >
              <a href="https://trade.bmspros.com.au/login" target="_blank" rel="noopener noreferrer">
                Start My Free Trial
              </a>
            </Button>
            <Button size="lg" className="rounded-full bg-white text-blue hover:bg-white/90" asChild>
              <Link to="/contact?type=Trade">Book Trade Walkthrough</Link>
            </Button>
           
          </div>
        </div>
      </section>
      </ScrollPage>
    </Layout>
  );
};

export default ProductBlue;
