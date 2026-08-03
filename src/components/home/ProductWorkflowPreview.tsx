import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Hammer, Scissors, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackCtaClick } from "@/lib/analytics";

const views = [
  {
    id: "workshop",
    label: "Workshop view",
    icon: Wrench,
    accent: "text-product-black",
    tabActive: "bg-product-black text-white border-product-black",
    title: "Workshop bookings, bays and customer updates",
    body: "Bookings, vehicle jobs, bay schedules and service reminders in one place.",
    image: "/home/preview-workshop.webp",
    imageAlt:
      "BMS Pro Workshop dashboard on laptop and phone showing revenue, jobs, status charts and today’s schedule",
    href: "/products/black",
    cta: "View BMS Pro Workshop",
  },
  {
    id: "trade",
    label: "Trade view",
    icon: Hammer,
    accent: "text-blue",
    tabActive: "bg-blue text-white border-blue",
    title: "Trade enquiries, quotes, jobs and invoices",
    body: "Enquiries, quotes, scheduled jobs, field updates and payment links in one place.",
    image: "/home/preview-trade.webp",
    imageAlt:
      "BMS Pro Trade dashboard on laptop and phone showing jobs, quotes, field updates and daily work",
    href: "/products/blue",
    cta: "View BMS Pro Trade",
  },
  {
    id: "salon",
    label: "Salon view",
    icon: Scissors,
    accent: "text-pink",
    tabActive: "bg-pink text-white border-pink",
    title: "Salon appointments, staff calendars and clients",
    body: "Appointment requests, services, staff calendars, reminders and client history in one place.",
    image: "/home/preview-salon.webp",
    imageAlt:
      "BMS Pro Salon dashboard on laptop and phone showing appointments, staff calendars and client activity",
    href: "/products/pink",
    cta: "View BMS Pro Salon",
  },
] as const;

export function ProductWorkflowPreview() {
  const [active, setActive] = useState<(typeof views)[number]["id"]>("workshop");
  const current = views.find((v) => v.id === active) ?? views[0];
  const Icon = current.icon;

  return (
    <section
      id="workflow-preview"
      className="scroll-mt-24 section-padding bg-[hsl(220_14%_97%)] border-y border-border/50"
    >
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10">
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3 sm:mb-4">
            See the workflow before you book a call
          </h2>
          <p className="font-sans text-base sm:text-lg text-muted-foreground leading-relaxed">
            Bookings, jobs, customers, staff and updates inside BMS Pro.
          </p>
        </div>

        <div className="flex gap-2 mb-6 sm:mb-8 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center scrollbar-none">
          {views.map((view) => {
            const TabIcon = view.icon;
            const selected = active === view.id;
            return (
              <button
                key={view.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(view.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-3.5 sm:px-4 py-2 text-sm font-semibold transition-colors border whitespace-nowrap shrink-0",
                  selected
                    ? view.tabActive
                    : "bg-white text-foreground border-border hover:bg-secondary/60"
                )}
              >
                <TabIcon className="h-3.5 w-3.5" aria-hidden="true" />
                {view.label}
              </button>
            );
          })}
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl sm:rounded-3xl border border-border bg-white shadow-elevated overflow-hidden">
            <figure className="relative bg-[hsl(220_14%_96%)]">
              <img
                key={current.image}
                src={current.image}
                alt={current.imageAlt}
                width={1400}
                height={900}
                className="w-full h-auto object-contain object-center"
                loading="eager"
                decoding="async"
              />
            </figure>

            <div className="p-5 sm:p-7 border-t border-border">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="max-w-2xl">
                  <p
                    className={cn(
                      "text-sm font-semibold mb-1.5 inline-flex items-center gap-2",
                      current.accent
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {current.label}
                  </p>
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground mb-2">
                    {current.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {current.body}
                  </p>
                </div>
                <Button className="rounded-full shrink-0 w-full sm:w-auto" asChild>
                  <Link
                    to={current.href}
                    onClick={() =>
                      trackCtaClick({
                        label: current.cta,
                        location: "homepage_workflow_preview",
                        destination: current.href,
                      })
                    }
                  >
                    {current.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 grid sm:grid-cols-3 gap-3 sm:gap-4">
            {views.map((view) => {
              const selected = active === view.id;
              return (
                <button
                  key={`${view.id}-card`}
                  type="button"
                  aria-pressed={selected}
                  aria-label={`Show ${view.label}`}
                  onClick={() => setActive(view.id)}
                  className={cn(
                    "text-left rounded-2xl border bg-white p-4 transition-all",
                    selected
                      ? "border-foreground/30 shadow-sm ring-1 ring-foreground/10"
                      : "border-border hover:border-foreground/20"
                  )}
                >
                  <img
                    src={view.image}
                    alt=""
                    aria-hidden
                    className="aspect-[16/10] w-full rounded-xl object-cover object-top mb-3 border border-border/60 bg-[hsl(220_14%_96%)]"
                    loading="lazy"
                    decoding="async"
                  />
                  <p className="text-sm font-semibold text-foreground mb-1">{view.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {view.body}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
