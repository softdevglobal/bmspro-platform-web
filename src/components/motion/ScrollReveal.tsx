import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type From = "left" | "right" | "bottom" | "top" | "scale";

const hiddenState = (from: From, distance: number) => {
  switch (from) {
    case "left":
      return { opacity: 0, x: -distance, y: 0, scale: 1 };
    case "right":
      return { opacity: 0, x: distance, y: 0, scale: 1 };
    case "top":
      return { opacity: 0, x: 0, y: -distance, scale: 1 };
    case "scale":
      return { opacity: 0, x: 0, y: 24, scale: 0.9 };
    case "bottom":
    default:
      return { opacity: 0, x: 0, y: distance, scale: 1 };
  }
};

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Direction the visual comes from */
  from?: From;
  /** Travel distance in px */
  distance?: number;
  /** Delay in seconds */
  delay?: number;
}

/**
 * Visual / content block that flies in from off-screen when scrolled into view.
 * NOTE: parent sections should not use overflow-hidden or the entrance gets clipped.
 */
export function ScrollReveal({
  children,
  className,
  from = "bottom",
  distance = 100,
  delay = 0,
}: ScrollRevealProps) {
  // Intentionally not skipping for reduced-motion beyond softer distance —
  // product marketing pages need visible entrance motion.
  const reduce = useReducedMotion();
  const travel = reduce ? Math.min(distance, 24) : distance;

  return (
    <motion.div
      className={className}
      initial={hiddenState(from, travel)}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -5% 0px" }}
      transition={{
        type: "spring",
        stiffness: reduce ? 140 : 55,
        damping: reduce ? 26 : 14,
        mass: 0.85,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

interface ScrollPageProps {
  children: ReactNode;
  className?: string;
}

/** Pass-through wrapper — visuals animate via ScrollReveal. */
export function ScrollPage({ children, className }: ScrollPageProps) {
  return <div className={className}>{children}</div>;
}
