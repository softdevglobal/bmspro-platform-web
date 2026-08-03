import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BlackPricingSection } from "@/components/pricing/BlackPricingSection";
import { ScrollPage, ScrollReveal } from "@/components/motion/ScrollReveal";
import { AnimateBars, AnimateCount, AnimateProgress, AnimateVisual, MarqueeStrip, PhoneMockup } from "@/components/motion/AnimateVisual";
import { BookingFlowPhone } from "@/components/motion/BookingFlowPhone";
import { submitContactForm } from "@/lib/contactForm";
import { productSoftwareSchema } from "@/lib/structuredData";
import {
  trackContactFormStart,
  trackContactFormSubmit,
  trackCtaClick,
} from "@/lib/analytics";
import { useToast } from "@/hooks/use-toast";
import { useRef, useState, type ReactNode } from "react";
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
  Headphones,
  LayoutDashboard,
  Mail,
  MessageSquare,
  Minus,
  Phone,
  Plus,
  Star,
  Wrench,
} from "lucide-react";

const TRUST_LOGOS = [
  "Mechanical workshops",
  "Roadworthy testing",
  "Tyre and brake centres",
  "Auto electricians",
  "Vehicle service centres",
  "Specialist repair workshops",
];

const WHO_ITS_FOR = [
  {
    title: "Mechanics",
    body: "Independent and franchise workshops that need bookings and vehicle history in one place.",
  },
  {
    title: "Automotive workshops",
    body: "Busy service centres managing multiple bays, staff and customer updates every day.",
  },
  {
    title: "Service centres",
    body: "Teams that want online booking requests without giving away calendar control.",
  },
];

const PRODUCT_SCREENS = [
  {
    title: "Booking request",
    caption: "Customers request a time. You approve what fits the workshop.",
    src: "/products/black/sms-phone.jpg",
    alt: "Customer booking confirmation on phone",
  },
  {
    title: "Vehicle & customer record",
    caption: "Keep registration, history and notes with the booking.",
    src: "/products/black/workshop-bay.jpg",
    alt: "Workshop bay representing vehicle service records",
  },
  {
    title: "Workshop calendar",
    caption: "See what is coming into the bays before the day starts.",
    src: "/products/black/mechanic-focus.jpg",
    alt: "Mechanic using workshop scheduling tools",
  },
  {
    title: "Service / job view",
    caption: "Track progress and send updates without rewriting messages.",
    src: "/products/black/front-desk.jpg",
    alt: "Front desk handling workshop service updates",
  },
];

const FORM_STEPS = [
  {
    title: "The customer requests a booking",
    body: "They choose the service and suggest a day or time, and can provide name, contact details, registration, make and model, service request, preferred drop-off time and notes.",
  },
  {
    title: "You review the request",
    body: "Accept the requested time, choose another available time, suggest a different day or decline when necessary. The customer does not control your workshop calendar.",
  },
  {
    title: "The booking enters the schedule",
    body: "Once accepted, the booking appears in the workshop calendar with the customer, vehicle, requested service, booking time, drop-off information and notes.",
  },
  {
    title: "The customer receives confirmation",
    body: "The customer receives a booking confirmation without you writing the same message again.",
  },
  {
    title: "The workshop completes the work",
    body: "Update the booking or service status as the vehicle moves through the workshop.",
  },
  {
    title: "The customer is told what happens next",
    body: "Send an update when the booking is confirmed, additional work needs approval, the vehicle is ready for collection or the service has been completed.",
  },
];

const FAQS = [
  {
    category: "Bookings",
    items: [
      {
        q: "Does a customer booking automatically enter my calendar?",
        a: "The customer submits a booking request. You decide whether to accept it, offer another time or decline it.",
      },
      {
        q: "Can customers book when the workshop is closed?",
        a: "Yes. Customers can submit a request through your booking link at any time. You can review it when the workshop is available.",
      },
      {
        q: "Can I control which services customers request?",
        a: "Yes. The workshop can configure the services displayed in the booking process.",
      },
    ],
  },
  {
    category: "Customers",
    items: [
      {
        q: "Will customers need to download an app?",
        a: "No. Customers can use the booking links and messages sent to them without installing the workshop system.",
      },
    ],
  },
  {
    category: "Getting started",
    items: [
      {
        q: "Do I need to rebuild the workshop overnight?",
        a: "No. Start with workshop details, services, opening hours, booking availability, staff, customer messages and booking link. Introduce other functions once the essential workflow is working.",
      },
    ],
  },
];

const WORKFLOW_SCREENS = [
  {
    title: "Select a service",
    items: ["Logbook service", "Brake inspection", "Wheel alignment"],
  },
  {
    title: "Suggested times",
    items: ["Thu 8:00 AM", "Thu 10:30 AM", "Fri 9:00 AM"],
  },
  {
    title: "Booking details",
    items: ["ABC-123 · Toyota Camry", "Drop-off 7:45 AM", "Notes added"],
  },
  {
    title: "Confirmed",
    items: ["SMS sent", "On the calendar", "Bay reserved"],
  },
  {
    title: "In workshop",
    items: ["Checked in", "Under inspection", "Parts ordered"],
  },
  {
    title: "Ready for pickup",
    items: ["Service complete", "Customer notified", "Review request"],
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
  const formStarted = useRef(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    product: "Workshop",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!formStarted.current) {
      formStarted.current = true;
      trackContactFormStart("workshop");
    }
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitContactForm(
        { ...formData, product: "Workshop" },
        "BMS Pro Workshop demo request"
      );
      trackContactFormSubmit("workshop", true);
      toast({
        title: "Demo request sent!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        product: "Workshop",
        message: "",
      });
      formStarted.current = false;
    } catch (err) {
      trackContactFormSubmit("workshop", false);
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
        title="BMS PRO Workshop | Booking and Job Management for Auto Workshops"
        description="Booking and job management software for auto workshops. Track bookings, vehicles, staff schedules and service updates in one place built for Australian workshops."
        image="/products/black/hero.jpg"
        path="/products/black"
        jsonLd={productSoftwareSchema({
          name: "BMS Pro Workshop",
          description:
            "Manage bookings, customer details, vehicle information, workshop schedules and service updates from one place.",
          path: "/products/black",
          imagePath: "/products/black/hero.jpg",
          // From BLACK_PLANS: AU$99/28-day … AU$399/7-day
          lowPrice: 99,
          highPrice: 399,
          offerCount: 2,
        })}
      />

      <ScrollPage>
        {/* Hero — Avenue-style growth visual */}
        <section className="relative bg-white pt-8 pb-16 sm:pt-12 sm:pb-24">
          <div className="container-wide">
            <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] gap-10 lg:gap-14 items-center">
              <ScrollReveal from="left" distance={64} className="relative z-10 min-w-0">
                <div className="inline-flex items-center gap-2 mb-5">
                  <img
                    src="/products/black/icon.png"
                    alt=""
                    className="h-8 w-8 rounded-lg ring-1 ring-black/10"
                  />
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-product-black">
                    BMS Pro Workshop
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-bold tracking-tight text-[hsl(220_22%_10%)] leading-[1.08] mb-4">
                  Keep the workshop moving without running everything from memory.
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-md">
                  Manage bookings, customer details, vehicle information, staff schedules and service
                  updates from one place. Your team can see what is booked, and your customers know what
                  is happening without calling every hour.
                </p>
                <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
                  <Button
                    size="lg"
                    variant="black"
                    className="rounded-full h-11 px-5 sm:px-6 w-full sm:w-auto"
                    asChild
                  >
                    <a
                      href="#demo"
                      onClick={() =>
                        trackCtaClick("product_workshop", "Book a Workshop Walkthrough", "#demo")
                      }
                    >
                      Book a Workshop Walkthrough
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full h-11 px-5 sm:px-6 w-full sm:w-auto whitespace-normal sm:whitespace-nowrap text-center"
                    asChild
                  >
                    <a
                      href="https://black.bmspros.com.au/login"
                      onClick={() =>
                        trackCtaClick(
                          "product_workshop",
                          "See BMS Pro Workshop in Action",
                          "https://black.bmspros.com.au/login"
                        )
                      }
                    >
                      See BMS Pro Workshop in Action
                    </a>
                  </Button>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-emerald-600" />
                    Built in Melbourne for Australian automotive workshops
                  </span>
                </div>
              </ScrollReveal>

              <ScrollReveal from="right" distance={80} delay={0.12} className="relative z-0 min-w-0 w-full">
                <div className="relative overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-25px_hsl(220_30%_15%/0.45)] ring-1 ring-black/5 bg-[hsl(220_30%_8%)] w-full">
                  <video
                    className="h-full w-full object-cover aspect-[16/10] sm:aspect-[16/9]"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster="/products/black/mechanic-focus.jpg"
                    aria-label="BMS Pro Workshop product demo"
                  >
                    <source src="/products/black/black.mp4" type="video/mp4" />
                  </video>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Trust strip — Avenue-style marquee */}
        <section className="border-y border-border/60 bg-[hsl(220_14%_97%)] py-8 overflow-hidden">
          <div className="container-wide mb-3 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground/60">
              Built for the way a real workshop works
            </p>
          </div>
          <MarqueeStrip items={TRUST_LOGOS} fadeFromClassName="from-[hsl(220_14%_97%)]" />
        </section>

        {/* Who it is for */}
        <section className="section-padding bg-white">
          <div className="container-wide">
            <div className="max-w-2xl mb-10">
              <p className="text-sm font-semibold text-product-black mb-3">Who it is for</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Built for mechanics, automotive workshops and service centres.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                BMS Pro Workshop helps you manage booking requests, vehicle records, the workshop
                calendar, staff allocation and customer updates.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 lg:gap-6">
              {WHO_ITS_FOR.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border bg-[hsl(220_14%_98%)] p-6"
                >
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Front desk / never miss a call */}
        <section className="section-padding bg-white">
          <div className="container-wide">
            <div className="rounded-[2rem] bg-product-black text-white overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-8 p-5 sm:p-8 lg:p-14">
                <ScrollReveal from="left" distance={56} className="flex flex-col justify-center">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                    <Phone className="h-5 w-5" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 leading-tight">
                    You shouldn&apos;t need five different apps just to run one workshop.
                  </h2>
                  <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-md">
                    You’re under a car when the phone rings. A customer wants to book their vehicle in. While you’re talking, a Facebook enquiry comes through. Then another customer texts asking if their car is ready.

                    Now you’re trying to remember where everything is. The booking is in the diary. The customer’s details are in your contacts. The vehicle history is in another system. The messages are spread across Facebook, SMS and your phone.

                    By the time you find everything, you’ve already lost time.

                    BMS Pro Workshop keeps your bookings, customers, vehicles and job information together in one place, so you spend less time searching and more time working.
                  </p>
                  <Button
                    size="lg"
                    className="w-full sm:w-fit rounded-full bg-white text-product-black hover:bg-white/90 whitespace-normal sm:whitespace-nowrap"
                    asChild
                  >
                    <a
                      href="#demo"
                      onClick={() =>
                        trackCtaClick("product_workshop", "Book a Workshop Walkthrough", "#demo")
                      }
                    >
                      Book a Workshop Walkthrough
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </ScrollReveal>

                <ScrollReveal from="right" distance={72} delay={0.1}>
                  <div className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur-md p-6 sm:p-7 flex flex-col gap-6">
                    <p className="text-lg font-semibold leading-snug">
                      When the workshop gets busy, every minute counts
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
                        One connected system
                      </span>
                    </div>
                    <p className="text-sm text-white/65 leading-relaxed">
                      From the first booking to vehicle collection, everything stays connected in one place.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Book from Google / Book Now */}
        <section className="section-padding bg-[hsl(220_14%_98%)]">
          <div className="container-wide grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal from="left" distance={56}>
              <p className="text-sm font-semibold text-product-black mb-3 inline-flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Online booking
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
                Let customers request a booking even when you can&apos;t answer the phone.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Give them a booking link they can use through your website, Google Business Profile,
                social media, text messages or email. They request a suitable time. You decide whether
                it works
                {/* — a booking request is not automatically accepted. */}
                <Pill>
                  <Calendar className="h-3 w-3" />
                  You stay in control
                </Pill>
              </p>
              <Button variant="black" className="rounded-full w-full sm:w-auto whitespace-normal sm:whitespace-nowrap" asChild>
                <a href="https://black.bmspros.com.au/book-now" target="_blank" rel="noopener noreferrer">
                  See the Customer Booking Experience
                  <span className="sr-only"> (opens in a new tab)</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </ScrollReveal>

            <ScrollReveal from="right" distance={72} delay={0.1} className="relative mx-auto w-full max-w-[220px] sm:max-w-[280px] overflow-visible">
              <BookingFlowPhone variant="workshop" />
            </ScrollReveal>
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
                  body: "You're all set for Thu, 8:00 AM bay booked, SMS on the way.",
                },
                // {
                //   icon: MessageSquare,
                //   color: "bg-emerald-500",
                //   title: "1H reminder",
                //   body: "Your car service tomorrow at 8:00 AM. Reply if you need to reschedule.",
                // },
                {
                  icon: MessageSquare,
                  color: "bg-emerald-500",
                  title: "Thanks for choosing us",
                  body: "Service complete. Leave a quick Google review when you have a moment.",
                },
              ].map((card, i) => (
                <ScrollReveal key={card.title} from="left" distance={48} delay={i * 0.08}>
                  <div className="flex gap-3 rounded-2xl border border-border bg-[hsl(220_14%_97%)] p-4 shadow-sm">
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
              <ScrollReveal from="bottom" distance={56} delay={0.2}>
                <div className="pt-4">
                  <img
                    src="/products/black/sms-phone.jpg"
                    alt="Customer checking a booking reminder on their phone"
                    className="w-full rounded-2xl object-cover shadow-lg aspect-[4/3] max-h-[420px]"
                    loading="lazy"
                  />
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal from="right" distance={64} className="order-1 lg:order-2">
              <p className="text-sm font-semibold text-product-black mb-3 inline-flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Customer updates
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5">
                Keep customers informed before they feel the need to call.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                Most customers are not trying to interrupt the workshop. They usually just want to know
                what is happening with their vehicle. Send useful updates
                <Pill>
                  <MessageSquare className="h-3 w-3" />
                  at the right stage
                </Pill>
                booking confirmation, appointment reminder, additional-work approval, vehicle-ready
                message, service completion and review request.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                You can also
                <Pill>
                  <Wrench className="h-3 w-3" />
                  keep customer and vehicle details together
                </Pill>
                so you are not searching through old messages when they contact you again.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Dashboard bento */}
        <section className="section-padding bg-[hsl(220_14%_98%)]">
          <div className="container-wide grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-sm font-semibold text-product-black mb-3 inline-flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Workshop calendar
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                See what is coming into the workshop before the day gets away from you.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                View today&apos;s bookings, upcoming bookings, customer arrival times, vehicle details,
                requested services, assigned staff and booking status instead of checking a paper
                diary, text messages and someone else&apos;s calendar.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <ScrollReveal from="bottom" distance={48} delay={0}>
                <div className="rounded-3xl bg-product-black text-white p-6 sm:row-span-1">
                  <p className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
                    <AnimateCount value={242} />
                  </p>
                  <p className="text-sm text-white/75 leading-relaxed">
                    Customers submitted bookings through Book Now this month.
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
                    barClassName="rounded-t-md bg-product-black/20"
                    delay={0.15}
                  />
                </div>
              </ScrollReveal>
              <ScrollReveal from="bottom" distance={48} delay={0.16}>
                <div className="rounded-3xl bg-white border border-border p-6 shadow-sm overflow-hidden">
                  <p className="font-semibold mb-1">Popular service</p>
                  <p className="text-sm text-muted-foreground mb-3">
                    Most booked this month: <span className="font-medium text-foreground">Logbook service</span>
                  </p>
                  <img
                    src="/products/black/workshop-bay.jpg"
                    alt="Workshop service bay set up for a logbook service booking"
                    className="rounded-xl h-24 w-full object-cover"
                  />
                </div>
              </ScrollReveal>
              <ScrollReveal from="bottom" distance={48} delay={0.24}>
                <div className="rounded-3xl bg-white border border-border p-6 shadow-sm">
                  <p className="font-semibold mb-3">Upsells &amp; add-ons</p>
                  <AnimateProgress
                    barClassName="bg-product-black"
                    delay={0.2}
                    rows={[
                      { label: "Brake pads", width: "80%" },
                      { label: "Cabin filter", width: "55%" },
                      { label: "Wheel align", width: "40%" },
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
            </AnimateVisual>

            <div>
              <p className="text-sm font-semibold text-product-black mb-3 inline-flex items-center gap-2">
                <Star className="h-4 w-4 fill-product-black" />
                Get more Google reviews
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5">
                Turn completed services into reviews and return visits
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                After service completion, send a
                <Pill>
                  <MessageSquare className="h-3 w-3" />
                  review request
                </Pill>
                so customers can leave feedback when it is still fresh. The more
                <Pill>
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  5-star reviews
                </Pill>
                you collect, the easier it is for new customers to find you.
              </p>
            </div>
          </div>
        </section>        {/* Workflow accordion */}
        <section id="workflow" className="scroll-mt-20 section-padding bg-[hsl(220_14%_97%)]">
          <div className="container-wide">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-3 max-w-2xl mx-auto">
              From booking request to vehicle pickup
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
              Here is what a normal customer journey can look like inside BMS Pro Workshop.
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
                        aria-expanded={open}
                        onClick={() => setOpenFormStep(open ? -1 : i)}
                        className="w-full text-left rounded-2xl bg-white border border-border p-5 shadow-sm"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-semibold text-foreground">
                            {i + 1}. {step.title}
                          </span>
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-product-black text-white shrink-0">
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

              <AnimateVisual from="right" distance={72} delay={0.1} className="relative mx-auto w-full max-w-[220px] sm:max-w-[260px]">
                <PhoneMockup
                  accentClassName="bg-product-black"
                  bezelClassName="border-[hsl(220_22%_12%)]"
                  progress={(Math.max(openFormStep, 0) + 1) / FORM_STEPS.length}
                  screenKey={openFormStep}
                >
                  <div className="text-center">
                    <p className="text-xl font-bold text-foreground mb-6">
                      {WORKFLOW_SCREENS[Math.max(0, openFormStep)]?.title ?? "Select a service"}
                    </p>
                    <div className="space-y-3 text-left">
                      {(WORKFLOW_SCREENS[Math.max(0, openFormStep)]?.items ?? []).map((item) => (
                        <div
                          key={item}
                          className="rounded-2xl border border-border bg-secondary/40 px-4 py-3 text-sm font-medium"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </PhoneMockup>
              </AnimateVisual>
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
            <AnimateVisual from="scale" distance={40} className="flex items-center justify-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
                <img src="/products/black/icon.png" alt="" className="h-7 w-7 rounded-md" />
              </div>
              <ArrowRight className="h-4 w-4 text-white/50" />
              <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center">
                <Globe className="h-6 w-6 text-product-black" />
              </div>
            </AnimateVisual>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Take a proper look inside BMS Pro Workshop
            </h2>
            <p className="text-white/70 text-lg mb-8">
              View the real dashboard, booking request, workshop calendar, customer record, vehicle
              record, staff schedule and customer-update screens.
            </p>
            <Button
              size="lg"
              className="rounded-full bg-white text-product-black hover:bg-white/90"
              asChild
            >
              <a
                href="https://black.bmspros.com.au/login"
                onClick={() =>
                  trackCtaClick(
                    "product_workshop",
                    "See BMS Pro Workshop in Action",
                    "https://black.bmspros.com.au/login"
                  )
                }
              >
                See BMS Pro Workshop in Action
              </a>
            </Button>
          </div>
        </section>

        {/* Workflow highlight instead of placeholder testimonials */}
        <section className="section-padding bg-white">
          <div className="container-wide">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
              <div className="max-w-xl">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                  Start with the basics. You don&apos;t need to rebuild the workshop overnight.
                </h2>
                <p className="text-muted-foreground text-lg">
                  Begin with your workshop details, services, opening hours, booking availability,
                  staff, customer messages and booking link. Once the essential workflow is working,
                  introduce other functions where they make sense.
                </p>
              </div>
              <Button variant="black" className="rounded-full w-fit" asChild>
                <a
                  href="https://black.bmspros.com.au/login"
                  onClick={() =>
                    trackCtaClick(
                      "product_workshop",
                      "Start Free Trial",
                      "https://black.bmspros.com.au/login"
                    )
                  }
                >
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="grid md:grid-cols-5 gap-4">
              <ScrollReveal from="left" distance={64} className="md:col-span-2">
                <article className="relative min-h-[280px] sm:min-h-[360px] rounded-3xl overflow-hidden h-full">
                  <img
                    src="/products/black/mechanic-portrait.jpg"
                    alt="Mechanic checking the day's booked jobs before starting work"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                  <div className="relative h-full flex flex-col justify-end p-5 sm:p-6 text-white">
                    <p className="text-lg font-medium leading-snug mb-6">
                      Give your team a clearer view of the day they can see the relevant booking and
                      service information before starting.
                    </p>
                    <div>
                      <p className="font-semibold">Team schedules</p>
                      <p className="text-sm text-white/65">Based on the permissions you give them</p>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
              <ScrollReveal from="right" distance={64} delay={0.12} className="md:col-span-3">
                <article className="relative min-h-[280px] sm:min-h-[360px] rounded-3xl overflow-hidden h-full">
                  <img
                    src="/products/black/workshop-bay.jpg"
                    alt="Vehicle in a workshop bay with customer and service history on file"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="relative h-full flex flex-col justify-end p-5 sm:p-8 text-white">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold leading-snug mb-6 max-w-lg">
                      Keep the customer and vehicle details together when they contact you again.
                    </p>
                    <div>
                      <p className="font-semibold">Customer &amp; vehicle records</p>
                      <p className="text-sm text-white/65">
                        Registration, make and model, notes and booking history
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
          <BlackPricingSection variant="embedded" offsetHeader={false} />
        </section>

        {/* FAQ */}
        <section className="section-padding bg-white">
          <div className="container-wide">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Questions &amp; answers</h2>
              <p className="text-muted-foreground max-w-md lg:text-right">
                Everything you need to know about getting started with BMS Pro Workshop for your
                automotive business.
              </p>
            </div>

            <div className="grid lg:grid-cols-[240px_1fr] gap-8">
              <nav className="space-y-1">
                {FAQS.map((cat, i) => (
                  <button
                    key={cat.category}
                    type="button"
                    aria-pressed={faqCat === i}
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
                        aria-expanded={open}
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
                See whether BMS Pro Workshop fits the way your workshop runs.
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Show us how you currently manage your bookings. We&apos;ll walk you through the relevant
                parts of BMS Pro Workshop and show how the same booking could be handled inside the
                platform.
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "Give your customers the experience they expect.",
                  "Your customers want to book online, receive updates, and know exactly when their vehicle is ready.",
                  "BMS Pro Workshop helps you deliver that experience without creating more work for your team.",
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
            <AnimateVisual from="scale" distance={40} className="flex justify-center mb-6">
              <img
                src="/products/black/icon.png"
                alt=""
                className="h-14 w-14 rounded-2xl ring-1 ring-white/20"
              />
            </AnimateVisual>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Every great customer experience starts with an organised workshop.
            </h2>
            <p className="text-white/65 mb-8">
              When booking is simple, updates are automatic and customers know what’s happening, they leave with confidence and they’re more likely to come back.

              That’s what BMS Pro Workshop is built for.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                size="lg"
                className="rounded-full bg-white text-product-black hover:bg-white/90"
                asChild
              >
                <a
                  href="#demo"
                  onClick={() =>
                    trackCtaClick(
                      "product_workshop_footer",
                      "Book a Workshop Walkthrough",
                      "#demo"
                    )
                  }
                >
                  Book a Workshop Walkthrough
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                asChild
              >
                <a
                  href="https://black.bmspros.com.au/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackCtaClick(
                      "product_workshop_footer",
                      "Start My Free Trial",
                      "https://black.bmspros.com.au/login"
                    )
                  }
                >
                  Start My Free Trial
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </Button>
            </div>
          </div>
        </section>
      </ScrollPage>
    </Layout>
  );
};

export default ProductBlack;
