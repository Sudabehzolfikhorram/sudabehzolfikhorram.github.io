"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** A thin bar under the site header that fills as you read. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  return (
    <motion.div
      aria-hidden
      className="fixed top-16 right-0 left-0 z-30 h-[3px] origin-left bg-gradient-to-r from-[#214bbd] to-[#7b9efe]"
      style={{ scaleX }}
    />
  );
}
