"use client";

import { motion } from "motion/react";
import { type ReactNode, useEffect, useState } from "react";
import { EASE_OUT } from "./reveal";

// The first page a visitor lands on already has its own entrance (the hero
// timeline), so the curtain only runs on navigations after that.
let hasMountedOnce = false;

export function PageTransition({ children }: { children: ReactNode }) {
  const [isNavigation] = useState(() => hasMountedOnce);
  useEffect(() => {
    hasMountedOnce = true;
  }, []);

  return (
    <>
      {isNavigation && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-50 origin-top bg-night"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        />
      )}
      <motion.div
        initial={isNavigation ? { opacity: 0, y: 24 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.25 }}
      >
        {children}
      </motion.div>
    </>
  );
}
