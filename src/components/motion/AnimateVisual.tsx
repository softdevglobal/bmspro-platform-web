import { type ReactNode, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

type From = "left" | "right" | "bottom" | "top" | "scale";

interface AnimateImageProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  from?: From;
  delay?: number;
  distance?: number;
  loading?: "lazy" | "eager";
}

/** Image that slides/scales in when scrolled into view. */
export function AnimateImage({
  src,
  alt,
  className,
  wrapperClassName,
  from = "scale",
  delay = 0,
  distance = 72,
  loading = "lazy",
}: AnimateImageProps) {
  return (
    <ScrollReveal from={from} delay={delay} distance={distance} className={wrapperClassName}>
      <img src={src} alt={alt} className={className} loading={loading} />
    </ScrollReveal>
  );
}

interface AnimateBarsProps {
  values: number[];
  className?: string;
  barClassName?: string;
  maxHeight?: number;
  asPercent?: boolean;
  delay?: number;
}

/** Chart bars that grow upward when the chart scrolls into view. */
export function AnimateBars({
  values,
  className,
  barClassName,
  maxHeight = 80,
  asPercent = false,
  delay = 0,
}: AnimateBarsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = window.setTimeout(() => setReady(true), delay * 1000);
    return () => window.clearTimeout(t);
  }, [inView, delay]);

  const max = Math.max(...values, 1);

  return (
    <div ref={ref} className={cn("flex items-end gap-1.5", className)}>
      {values.map((v, i) => {
        const target = asPercent ? `${v}%` : `${(v / max) * maxHeight}px`;
        return (
          <motion.div
            key={i}
            className={cn("flex-1 rounded-full origin-bottom", barClassName)}
            initial={{ height: 0, opacity: 0.35 }}
            animate={
              ready || reduce
                ? { height: target, opacity: 1 }
                : { height: 0, opacity: 0.35 }
            }
            transition={{
              duration: reduce ? 0.2 : 0.85,
              delay: reduce ? 0 : i * 0.07,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        );
      })}
    </div>
  );
}

interface AnimateVisualProps {
  children: ReactNode;
  className?: string;
  from?: From;
  delay?: number;
  distance?: number;
}

/** Generic wrapper for mockups, cards, and chart panels. */
export function AnimateVisual({
  children,
  className,
  from = "bottom",
  delay = 0,
  distance = 72,
}: AnimateVisualProps) {
  return (
    <ScrollReveal from={from} delay={delay} distance={distance} className={className}>
      {children}
    </ScrollReveal>
  );
}

interface AnimateProgressProps {
  rows: { label: string; width: string }[];
  barClassName?: string;
  delay?: number;
}

/** Horizontal progress bars that fill when scrolled into view. */
export function AnimateProgress({ rows, barClassName, delay = 0 }: AnimateProgressProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = window.setTimeout(() => setReady(true), delay * 1000);
    return () => window.clearTimeout(t);
  }, [inView, delay]);

  return (
    <div ref={ref} className="space-y-2">
      {rows.map((row, i) => (
        <div key={row.label} className="flex items-center gap-2 text-xs">
          <span className="w-20 text-muted-foreground shrink-0">{row.label}</span>
          <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
            <motion.div
              className={cn("h-full rounded-full", barClassName)}
              initial={{ width: 0 }}
              animate={{ width: ready || reduce ? row.width : 0 }}
              transition={{
                duration: reduce ? 0.2 : 0.8,
                delay: reduce ? 0 : i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

interface FloatCardProps {
  children: ReactNode;
  className?: string;
  /** Entrance direction */
  from?: From;
  delay?: number;
  distance?: number;
  /** Continuous bob amplitude in px */
  floatAmount?: number;
  /** Continuous bob duration in seconds */
  floatDuration?: number;
  /** Offset the float cycle */
  floatDelay?: number;
}

/**
 * Avenue-style floating UI card: slides in on scroll, then gently bobs.
 */
export function FloatCard({
  children,
  className,
  from = "bottom",
  delay = 0,
  distance = 48,
  floatAmount = 8,
  floatDuration = 4.5,
  floatDelay = 0,
}: FloatCardProps) {
  const reduce = useReducedMotion();

  return (
    <ScrollReveal from={from} delay={delay} distance={distance} className={className}>
      <motion.div
        animate={
          reduce
            ? undefined
            : {
                y: [0, -floatAmount, 0],
              }
        }
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        }}
      >
        {children}
      </motion.div>
    </ScrollReveal>
  );
}

interface AnimateCountProps {
  value: number;
  className?: string;
  suffix?: string;
  duration?: number;
}

/** Count-up number when scrolled into view (Avenue dashboard stats). */
export function AnimateCount({
  value,
  className,
  suffix = "",
  duration = 1.4,
}: AnimateCountProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    stiffness: reduce ? 200 : 60,
    damping: reduce ? 40 : 20,
  });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => setDisplay(Math.round(v)));
    return () => unsub();
  }, [spring]);

  // duration is expressed via spring feel; unused directly but kept for API clarity
  void duration;

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}

interface MarqueeStripProps {
  items: string[];
  className?: string;
  itemClassName?: string;
  /** Tailwind colour for edge fades, e.g. from-[hsl(210_25%_97%)] */
  fadeFromClassName?: string;
  /** Seconds for one full loop (default 22). */
  duration?: number;
}

/** Infinite horizontal marquee for industry / trust labels. */
export function MarqueeStrip({
  items,
  className,
  itemClassName,
  fadeFromClassName = "from-[hsl(220_14%_97%)]",
  duration = 22,
}: MarqueeStripProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const distanceRef = useRef(0);

  // Pad short lists so one loop half stays wider than typical viewports
  let half = [...items];
  while (half.length > 0 && half.length < 10) {
    half = [...half, ...items];
  }
  const row = [...half, ...half];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const measure = () => {
      distanceRef.current = el.scrollWidth / 2;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      const distance = distanceRef.current;

      if (!pausedRef.current && distance > 0) {
        const pxPerMs = distance / (duration * 1000);
        offsetRef.current = (offsetRef.current + pxPerMs * dt) % distance;
        el.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [duration, items]);

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      aria-hidden
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-20 bg-gradient-to-r to-transparent",
          fadeFromClassName
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-20 bg-gradient-to-l to-transparent",
          fadeFromClassName
        )}
      />
      <div
        ref={trackRef}
        className="flex w-max gap-10 sm:gap-14 py-1 will-change-transform"
      >
        {row.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className={cn(
              "shrink-0 text-sm font-semibold uppercase tracking-wider text-muted-foreground/45",
              itemClassName
            )}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

interface PhoneMockupProps {
  children: ReactNode;
  className?: string;
  /** Accent colour for progress / chrome details */
  accentClassName?: string;
  /** Border / bezel colour */
  bezelClassName?: string;
  progress?: number;
  /** Screen title shown under the notch chrome */
  screenKey?: string | number;
}

/**
 * Avenue-style tall phone frame with animated screen swaps.
 */
export function PhoneMockup({
  children,
  className,
  accentClassName = "bg-product-black",
  bezelClassName = "border-[hsl(220_22%_12%)]",
  progress = 0.28,
  screenKey,
}: PhoneMockupProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[280px] rounded-[2rem] border-[10px] bg-white shadow-2xl overflow-hidden aspect-[9/16]",
        bezelClassName,
        className
      )}
    >
      {/* Notch */}
      <div className="absolute top-2 left-1/2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-[hsl(220_22%_12%)]" />
      <div className="flex items-center justify-between px-4 pt-3 pb-2 relative z-10">
        <span className="text-lg opacity-40">←</span>
        <div className="h-1.5 flex-1 mx-4 rounded-full bg-secondary overflow-hidden">
          <motion.div
            className={cn("h-full rounded-full", accentClassName)}
            animate={{ width: `${Math.min(100, Math.max(8, progress * 100))}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          />
        </div>
        <span className="text-red-500 font-bold">×</span>
      </div>
      <div className="relative flex-1 h-[calc(100%-2.5rem)] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={screenKey ?? "screen"}
            className="absolute inset-0 px-5 pt-6"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

interface StaggerStackProps {
  children: ReactNode[];
  className?: string;
  from?: From;
  gapClassName?: string;
}

/** Stacked cards that cascade in one after another (SMS notification stack). */
export function StaggerStack({
  children,
  className,
  from = "left",
  gapClassName = "space-y-3",
}: StaggerStackProps) {
  return (
    <div className={cn(gapClassName, className)}>
      {children.map((child, i) => (
        <ScrollReveal key={i} from={from} distance={48} delay={i * 0.1}>
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
}
