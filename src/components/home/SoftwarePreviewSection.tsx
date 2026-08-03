import { useState } from "react";
import { Link } from "react-router-dom";
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
      { label: "Service", value: "Request a suitable day and time" },
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
      { label: "Midday", value: "Staff and bay availability" },
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

  return (
    <section id="preview" className="scroll-mt-24 section-padding bg-background">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            See what your day looks like inside BMS Pro
          </h2>
          <p className="font-sans text-lg text-muted-foreground leading-relaxed">
            Use the tabs below to look at the real booking, calendar, customer, job, team and update
            screens.
          </p>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              aria-pressed={active === tab.id}
              onClick={() => setActive(tab.id)}
              className={cn(
                "rounded-full px-3.5 sm:px-4 py-2 text-sm font-semibold transition-colors border whitespace-nowrap shrink-0",
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
            {current.lines.map((line) => (
              <div
                key={line.label}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 px-5 py-4"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {line.label}
                </span>
                <span className="text-sm font-medium text-foreground sm:text-right">
                  {line.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button size="lg" className="rounded-full" asChild>
            <Link
              to="/contact"
              onClick={() =>
                trackCtaClick({
                  label: "Book a walkthrough",
                  location: "homepage_software_preview",
                  destination: "/contact",
                })
              }
            >
              Book a walkthrough
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
