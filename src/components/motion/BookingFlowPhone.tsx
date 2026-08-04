import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Calendar, Check, RefreshCw, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { PhoneMockup } from "@/components/motion/AnimateVisual";

type FlowVariant = "salon" | "workshop" | "trade";

const SERVICES = {
  salon: ["Cut & blow dry", "Colour & toner", "Balayage"],
  workshop: ["Logbook service", "Brake inspection", "Wheel alignment"],
  trade: ["Blocked drain", "Hot water repair", "Electrical inspection"],
} as const;

const SELECTED = {
  salon: "Cut & blow dry",
  workshop: "Logbook service",
  trade: "Hot water repair",
} as const;

const TIME = {
  salon: "Fri 2:00 PM",
  workshop: "Thu 8:00 AM",
  trade: "Tue 9:00 AM",
} as const;

const ACCENT = {
  salon: "bg-pink",
  workshop: "bg-product-black",
  trade: "bg-blue",
} as const;

const BEZEL = {
  salon: "border-[hsl(340_25%_12%)]",
  workshop: "border-[hsl(220_22%_12%)]",
  trade: "border-[hsl(210_40%_14%)]",
} as const;

const RING = {
  salon: "ring-pink/40 border-pink bg-pink/5",
  workshop: "ring-product-black/30 border-product-black bg-product-black/5",
  trade: "ring-blue/40 border-blue bg-blue/5",
} as const;

const TEXT = {
  salon: "text-pink",
  workshop: "text-product-black",
  trade: "text-blue",
} as const;

const REBOOK_HINT = {
  salon: "Same stylist · Same time next month",
  workshop: "Same vehicle · Next service due",
  trade: "Same site · Book the follow-up",
} as const;

type ScreenId = "choose" | "time" | "complete" | "thank" | "rebook";

type Beat = {
  screen: ScreenId;
  progress: number;
  /** Cursor position as % of phone frame */
  cursor: { x: number; y: number };
  /** Hold before advancing (ms) */
  hold: number;
  /** Fire a click animation at this beat */
  click?: boolean;
  /** Service selected after click */
  serviceSelected?: boolean;
  /** Time selected after click */
  timeSelected?: boolean;
  /** How many stars lit (0-5) */
  stars?: number;
  /** Rebook button pressed look */
  rebookPressed?: boolean;
};

/**
 * Cursor choreography through the booking flow.
 * Positions are % of the phone frame (including chrome).
 */
function buildBeats(): Beat[] {
  return [
    // Enter - cursor arrives, look at services
    { screen: "choose", progress: 0.15, cursor: { x: 82, y: 78 }, hold: 600 },
    { screen: "choose", progress: 0.18, cursor: { x: 58, y: 36 }, hold: 700 },
    // Hover first option, then click
    { screen: "choose", progress: 0.22, cursor: { x: 52, y: 34 }, hold: 450 },
    {
      screen: "choose",
      progress: 0.28,
      cursor: { x: 52, y: 34 },
      hold: 380,
      click: true,
      serviceSelected: true,
    },
    {
      screen: "choose",
      progress: 0.32,
      cursor: { x: 52, y: 34 },
      hold: 700,
      serviceSelected: true,
    },
    // Move toward next (time screen)
    {
      screen: "time",
      progress: 0.45,
      cursor: { x: 70, y: 50 },
      hold: 500,
      serviceSelected: true,
    },
    {
      screen: "time",
      progress: 0.5,
      cursor: { x: 54, y: 38 },
      hold: 550,
      serviceSelected: true,
    },
    {
      screen: "time",
      progress: 0.55,
      cursor: { x: 54, y: 38 },
      hold: 380,
      click: true,
      serviceSelected: true,
      timeSelected: true,
    },
    {
      screen: "time",
      progress: 0.58,
      cursor: { x: 54, y: 38 },
      hold: 650,
      serviceSelected: true,
      timeSelected: true,
    },
    // Complete
    {
      screen: "complete",
      progress: 0.72,
      cursor: { x: 62, y: 62 },
      hold: 1400,
      serviceSelected: true,
      timeSelected: true,
    },
    // Thank you - click stars
    {
      screen: "thank",
      progress: 0.82,
      cursor: { x: 38, y: 58 },
      hold: 400,
      stars: 0,
    },
    { screen: "thank", progress: 0.84, cursor: { x: 38, y: 58 }, hold: 220, click: true, stars: 1 },
    { screen: "thank", progress: 0.86, cursor: { x: 44, y: 58 }, hold: 200, click: true, stars: 2 },
    { screen: "thank", progress: 0.88, cursor: { x: 50, y: 58 }, hold: 200, click: true, stars: 3 },
    { screen: "thank", progress: 0.9, cursor: { x: 56, y: 58 }, hold: 200, click: true, stars: 4 },
    { screen: "thank", progress: 0.92, cursor: { x: 62, y: 58 }, hold: 220, click: true, stars: 5 },
    { screen: "thank", progress: 0.94, cursor: { x: 62, y: 58 }, hold: 700, stars: 5 },
    // Rebook
    {
      screen: "rebook",
      progress: 0.97,
      cursor: { x: 72, y: 70 },
      hold: 500,
      stars: 5,
    },
    {
      screen: "rebook",
      progress: 1,
      cursor: { x: 50, y: 68 },
      hold: 450,
      stars: 5,
    },
    {
      screen: "rebook",
      progress: 1,
      cursor: { x: 50, y: 68 },
      hold: 400,
      click: true,
      rebookPressed: true,
      stars: 5,
    },
    {
      screen: "rebook",
      progress: 1,
      cursor: { x: 50, y: 68 },
      hold: 1200,
      rebookPressed: true,
      stars: 5,
    },
    // Drift off before loop
    {
      screen: "rebook",
      progress: 1,
      cursor: { x: 88, y: 92 },
      hold: 500,
      rebookPressed: true,
      stars: 5,
    },
  ];
}

function MouseCursor({
  clicking,
  rippleClassName,
}: {
  clicking?: boolean;
  rippleClassName?: string;
}) {
  return (
    <div className="relative" style={{ width: 36, height: 36 }}>
      <AnimatePresence>
        {clicking && (
          <motion.span
            key="ripple"
            className={cn(
              "absolute left-[4px] top-[4px] -translate-x-1/2 -translate-y-1/2 rounded-full",
              rippleClassName ?? "bg-pink/50"
            )}
            initial={{ width: 12, height: 12, opacity: 0.85 }}
            animate={{ width: 56, height: 56, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      <motion.svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          scale: clicking ? 0.82 : 1,
          y: clicking ? 3 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        className="relative origin-top-left"
        style={{
          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.45))",
        }}
      >
        <path
          d="M5.5 3.5L5.5 18.2L9.2 14.7L12.1 21.2L14.4 20.2L11.5 13.6L16.5 13.2L5.5 3.5Z"
          fill="white"
          stroke="#0f172a"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </motion.svg>
    </div>
  );
}

interface BookingFlowPhoneProps {
  variant?: FlowVariant;
  className?: string;
}

/** Auto-playing phone demo with animated mouse cursor clicks. */
export function BookingFlowPhone({ variant = "salon", className }: BookingFlowPhoneProps) {
  const reduce = useReducedMotion();
  const beats = useMemo(() => buildBeats(), []);
  const [beatIndex, setBeatIndex] = useState(0);
  const [showClick, setShowClick] = useState(false);

  const beat = beats[beatIndex] ?? beats[0];
  const services = SERVICES[variant];
  const selected = SELECTED[variant];
  const time = TIME[variant];
  const altTimes =
    variant === "salon"
      ? ["Sat 10:00 AM", "Mon 11:30 AM"]
      : variant === "workshop"
        ? ["Thu 10:30 AM", "Fri 9:00 AM"]
        : ["Wed 11:00 AM", "Mon 9:30 AM"];

  useEffect(() => {
    let clickTimer: number | undefined;
    if (beat.click) {
      setShowClick(true);
      clickTimer = window.setTimeout(() => setShowClick(false), 320);
    } else {
      setShowClick(false);
    }

    // Always advance the demo - only soften timing when reduced-motion is on
    const hold = reduce ? Math.min(beat.hold, 700) : beat.hold;
    const t = window.setTimeout(() => {
      setBeatIndex((i) => (i + 1) % beats.length);
    }, hold);

    return () => {
      window.clearTimeout(t);
      if (clickTimer) window.clearTimeout(clickTimer);
    };
  }, [beat, beatIndex, beats.length, reduce]);

  const screen = (() => {
    switch (beat.screen) {
      case "choose":
        return (
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">Select a service</p>
            <div className="mt-8 space-y-3 text-left">
              {services.map((s) => {
                const active = beat.serviceSelected && s === selected;
                return (
                  <motion.div
                    key={s}
                    animate={active ? { scale: 1.02 } : { scale: 1 }}
                    className={cn(
                      "rounded-2xl border px-4 py-3 text-sm font-medium relative transition-colors",
                      active
                        ? cn("ring-2", RING[variant], TEXT[variant])
                        : "border-border bg-secondary/40 text-foreground"
                    )}
                  >
                    {s}
                    {active && (
                      <motion.span
                        className={cn(
                          "absolute right-3 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full text-white",
                          ACCENT[variant]
                        )}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <Check className="h-3 w-3" />
                      </motion.span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        );
      case "time":
        return (
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">Pick a time</p>
            <p className="mt-2 text-xs text-muted-foreground">{selected}</p>
            <div className="mt-8 space-y-3 text-left">
              {[time, ...altTimes].map((t, i) => {
                const active = beat.timeSelected && i === 0;
                return (
                  <motion.div
                    key={t}
                    animate={active ? { scale: 1.02 } : { scale: 1 }}
                    className={cn(
                      "rounded-2xl border px-4 py-3 text-sm font-medium flex items-center gap-2 transition-colors",
                      active
                        ? cn("ring-2", RING[variant], TEXT[variant])
                        : "border-border bg-secondary/40"
                    )}
                  >
                    <Calendar className="h-3.5 w-3.5 opacity-60" />
                    {t}
                    {active && (
                      <Check className={cn("ml-auto h-3.5 w-3.5", TEXT[variant])} />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        );
      case "complete":
        return (
          <div className="flex flex-col items-center text-center pt-6">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              className={cn(
                "mb-5 flex h-16 w-16 items-center justify-center rounded-full text-white",
                ACCENT[variant]
              )}
            >
              <Check className="h-8 w-8" strokeWidth={2.5} />
            </motion.span>
            <p className="text-xl font-bold text-foreground">Booking complete</p>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {selected}
              <br />
              {time}
            </p>
            <div className="mt-6 w-full rounded-2xl border border-border bg-secondary/40 px-4 py-3 text-left text-xs text-muted-foreground">
              Confirmation sent by SMS &amp; email
            </div>
          </div>
        );
      case "thank":
        return (
          <div className="flex flex-col items-center text-center pt-6">
            <span
              className={cn(
                "mb-5 flex h-16 w-16 items-center justify-center rounded-full text-white",
                ACCENT[variant]
              )}
            >
              <Sparkles className="h-7 w-7" />
            </span>
            <p className="text-xl font-bold text-foreground">Thank you!</p>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Your appointment is complete.
              <br />
              We&apos;d love a quick review.
            </p>
            <div className="mt-5 flex gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-5 w-5 transition-colors duration-150",
                    (beat.stars ?? 0) > i
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted-foreground/30"
                  )}
                />
              ))}
            </div>
          </div>
        );
      case "rebook":
        return (
          <div className="flex flex-col items-center text-center pt-6">
            <span
              className={cn(
                "mb-5 flex h-16 w-16 items-center justify-center rounded-full text-white",
                ACCENT[variant]
              )}
            >
              <RefreshCw className="h-7 w-7" />
            </span>
            <p className="text-xl font-bold text-foreground">Ready to rebook?</p>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Book your next {variant === "salon" ? "visit" : "service"} in one tap.
            </p>
            <motion.div
              animate={{
                scale: beat.rebookPressed ? 0.96 : 1,
                opacity: beat.rebookPressed ? 0.92 : 1,
              }}
              className={cn(
                "mt-6 w-full rounded-full py-3 text-sm font-semibold text-white shadow-md",
                ACCENT[variant]
              )}
            >
              Rebook now
            </motion.div>
            <p className="mt-3 text-[11px] text-muted-foreground">{REBOOK_HINT[variant]}</p>
          </div>
        );
    }
  })();

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[280px] overflow-visible",
        className
      )}
    >
      <PhoneMockup
        accentClassName={ACCENT[variant]}
        bezelClassName={BEZEL[variant]}
        progress={beat.progress}
        screenKey={beat.screen}
      >
        {screen}
      </PhoneMockup>

      {/* Cursor sits above the phone - CSS % positioning (reliable) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[60] overflow-visible"
      >
        <div
          className="absolute will-change-transform"
          style={{
            left: `${beat.cursor.x}%`,
            top: `${beat.cursor.y}%`,
            transform: "translate(-12%, -8%)",
            transition: reduce
              ? "none"
              : "left 0.55s cubic-bezier(0.22, 1, 0.36, 1), top 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <MouseCursor
            clicking={showClick}
            rippleClassName={
              variant === "salon"
                ? "bg-pink/50"
                : variant === "trade"
                  ? "bg-blue/50"
                  : "bg-product-black/40"
            }
          />
        </div>
      </div>
    </div>
  );
}
