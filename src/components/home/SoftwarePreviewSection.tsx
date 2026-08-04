import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  ClipboardList,
  MessageSquare,
  Users,
  UserRound,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { trackCtaClick } from "@/lib/analytics";

const tabs = [
  {
    id: "booking",
    label: "Booking",
    icon: ClipboardList,
    title: "Booking requests",
    lines: [
      { label: "Service", value: "Oil service, colour & cut, call-out…" },
      { label: "Preferred day", value: "Customer picks what works" },
      { label: "Status", value: "Awaiting your confirmation" },
      { label: "Details", value: "Contact and notes captured" },
    ],
  },
  {
    id: "calendar",
    label: "Calendar",
    icon: Calendar,
    title: "Day board",
    lines: [
      { label: "Morning", value: "Confirmed bookings and jobs" },
      { label: "Midday", value: "Staff, bay or van availability" },
      { label: "Afternoon", value: "Follow-ups and inspections" },
      { label: "Updates", value: "Reminders already sent" },
    ],
  },
  {
    id: "customer",
    label: "Customer",
    icon: UserRound,
    title: "Customer record",
    lines: [
      { label: "Contact", value: "Phone, email, notes" },
      { label: "History", value: "Previous bookings and jobs" },
      { label: "Context", value: "Vehicle, site or preferences" },
      { label: "Next action", value: "Reminder ready" },
    ],
  },
  {
    id: "job",
    label: "Job",
    icon: Briefcase,
    title: "Job progress",
    lines: [
      { label: "Enquiry", value: "Captured from the first contact" },
      { label: "Quote", value: "Approved and ready to schedule" },
      { label: "Assignment", value: "Right person assigned" },
      { label: "Outcome", value: "Notes and photos attached" },
    ],
  },
  {
    id: "team",
    label: "Team",
    icon: Users,
    title: "Team view",
    lines: [
      { label: "Today", value: "Who is working and where" },
      { label: "Availability", value: "Open slots on the calendar" },
      { label: "Assignments", value: "Jobs linked to the right person" },
      { label: "Access", value: "Team sees what they need" },
    ],
  },
  {
    id: "updates",
    label: "Updates",
    icon: MessageSquare,
    title: "Customer updates",
    lines: [
      { label: "Confirmed", value: "Booking confirmation sent" },
      { label: "Reminder", value: "Day-before message queued" },
      { label: "Progress", value: "On-the-way / in-progress updates" },
      { label: "Complete", value: "Next step ready" },
    ],
  },
] as const;

export function SoftwarePreviewSection() {
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("booking");
  const current = tabs.find((t) => t.id === active) ?? tabs[0];
  const Icon = current.icon;
  const reduce = useReducedMotion();
  const panelTransition = reduce
    ? { duration: 0 }
    : { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section id="preview" className="scroll-mt-24 section-padding bg-background">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Here’s what you’ll actually use
          </h2>
          <p className="font-sans text-lg text-muted-foreground leading-relaxed">
            Booking requests, the day board, customer history, job progress and team updates.
            The screens your front desk and floor already need.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-8 max-w-md mx-auto sm:max-w-none sm:flex sm:flex-wrap sm:justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              aria-pressed={active === tab.id}
              onClick={() => setActive(tab.id)}
              className={cn(
                "rounded-full px-2 sm:px-4 py-2 text-sm font-semibold transition-all duration-300 border whitespace-nowrap w-full sm:w-auto text-center",
                active === tab.id
                  ? "bg-foreground text-background border-foreground"
                  : "bg-white text-foreground border-border hover:bg-secondary/60"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="max-w-2xl mx-auto rounded-3xl border border-border bg-white shadow-elevated overflow-hidden mb-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={panelTransition}
            >
              <div className="flex items-center gap-3 border-b border-border px-5 py-4 bg-[hsl(220_14%_97%)]">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-foreground text-background">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{current.title}</p>
                  <p className="text-xs text-muted-foreground">BMS Pro · {current.label} view</p>
                </div>
              </div>
              <div className="divide-y divide-border">
                {current.lines.map((line, index) => (
                  <motion.div
                    key={line.label}
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { duration: 0.22, delay: 0.04 + index * 0.04, ease: "easeOut" }
                    }
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 px-5 py-4"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {line.label}
                    </span>
                    <span className="text-sm font-medium text-foreground sm:text-right">
                      {line.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <Button size="lg" className="rounded-full" asChild>
            <Link
              to="/contact"
              onClick={() =>
                trackCtaClick("homepage_software_preview", "Book a walkthrough", "/contact")
              }
            >
              Book a walkthrough
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full" asChild>
            <a
              href="#products"
              onClick={() =>
                trackCtaClick("software_preview", "Choose Your Product", "#products")
              }
            >
              Choose Your Product
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
