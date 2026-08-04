import { type ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface PageTransitionProps {
  children: ReactNode;
}

const ease = [0.22, 1, 0.36, 1] as const;

/** Smooth fade/slide between routes. Wrap the matched page tree. */
export function PageTransition({ children }: PageTransitionProps) {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? undefined : { opacity: 0, y: -10 }}
        transition={{
          duration: reduce ? 0 : 0.35,
          ease,
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
