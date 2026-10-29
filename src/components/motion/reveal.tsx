"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

// One easing for the whole site: a quick start that settles slowly.
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

/** Fades a block up the first time it scrolls into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "header";
}) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={item}
      transition={{ delay }}
    >
      {children}
    </M>
  );
}

/** Staggers its <RevealItem> children as the group enters the viewport. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "ol";
}) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </M>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const M = motion[as];
  return (
    <M className={className} variants={item}>
      {children}
    </M>
  );
}
