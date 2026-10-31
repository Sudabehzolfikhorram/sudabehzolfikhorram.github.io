"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { EASE_OUT } from "@/components/motion/reveal";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// What she untangles day to day, one at a time.
const TANGLES = ["AI-driven workflows", "payment flows", "permission matrices", "ERP forms", "admin dashboards", "onboarding"];

/** "Lately untangling: …" with the last word swapping every couple of seconds. */
export function Untangling() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % TANGLES.length), 2200);
    return () => window.clearInterval(t);
  }, [reduce]);
  return (
    <p className="mt-5 flex flex-wrap items-baseline gap-x-2 font-mono text-ink-soft text-sm">
      <span className="uppercase tracking-[0.08em]">Lately untangling:</span>
      <span className="relative inline-grid overflow-hidden text-ink">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            animate={{ y: 0, opacity: 1 }}
            className="col-start-1 row-start-1 whitespace-nowrap"
            exit={{ y: "-100%", opacity: 0 }}
            initial={{ y: "100%", opacity: 0 }}
            key={TANGLES[i]}
            transition={{ duration: 0.45, ease: EASE_OUT }}
          >
            {TANGLES[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </p>
  );
}

const CHIPS = [
  { text: "Law → Product design", className: "-left-3 top-[18%] sm:-left-8", d: 5.5 },
  { text: "Tehran · open to remote", className: "-right-2 top-[6%] sm:-right-6", d: 6.5 },
  { text: "AI as a thinking partner", className: "-right-3 bottom-[22%] sm:-right-10", d: 6 },
];

/**
 * The portrait, with the site's signature: a tangled thread draws itself across
 * the photo and straightens out, and the photo gains its colour as it does.
 */
export function AboutPortrait() {
  const reduce = useReducedMotion();
  return (
    <div className="relative">
      <div aria-hidden className="absolute -inset-16 -z-10 bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--glow)_28%,transparent),transparent)]" />
      <motion.div
        animate={{ filter: reduce ? "grayscale(0.25)" : ["grayscale(1)", "grayscale(1)", "grayscale(0.25)"] }}
        className="relative overflow-hidden rounded-[32px] border border-rule"
        transition={{ duration: 2.6, times: [0, 0.55, 1], ease: "easeOut" }}
      >
        <Image
          alt="Sudabeh Zolfi Khorram, smiling, sitting at a desk"
          className="h-auto w-full"
          height={596}
          priority
          sizes="(min-width: 1024px) 40vw, 100vw"
          src={`${BASE}/about/sudabeh.webp`}
          width={688}
        />
        <svg aria-hidden className="pointer-events-none absolute inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 400 346">
          {/* The tangle: drawn in, then it fades as the straight line takes over. */}
          <motion.path
            animate={reduce ? { opacity: 0 } : { pathLength: [0, 1, 1], opacity: [1, 1, 0] }}
            className="stroke-glow"
            d="M-10 300 C 60 250, 30 190, 90 200 S 150 300, 170 230 S 120 140, 190 150 S 260 260, 250 180 S 300 90, 330 140 S 380 120, 410 80"
            initial={{ pathLength: 0 }}
            strokeLinecap="round"
            strokeWidth="2.5"
            transition={{ duration: 2.6, times: [0, 0.55, 1], ease: "easeInOut" }}
          />
          <motion.path
            animate={{ pathLength: 1, opacity: 0.9 }}
            className="stroke-signal"
            d="M-10 318 L 410 318"
            initial={{ pathLength: 0, opacity: 0 }}
            strokeDasharray="1 7"
            strokeLinecap="round"
            strokeWidth="3"
            transition={{ duration: 1.1, delay: reduce ? 0 : 1.6, ease: EASE_OUT }}
          />
        </svg>
      </motion.div>

      {CHIPS.map((c, i) => (
        <motion.span
          animate={{ opacity: 1 }}
          className={`absolute ${c.className} hidden sm:block`}
          initial={{ opacity: 0 }}
          key={c.text}
          transition={{ delay: 1.2 + i * 0.25, duration: 0.5 }}
        >
          <span
            className="block rounded-full border border-rule bg-paper px-3 py-1.5 text-xs shadow-sm motion-safe:animate-[float_var(--d)_ease-in-out_infinite]"
            style={{ ["--d" as string]: `${c.d}s`, animationDelay: `${i * 0.8}s` }}
          >
            {c.text}
          </span>
        </motion.span>
      ))}

      <div className="absolute -bottom-5 left-5 rounded-2xl border border-rule bg-paper px-4 py-3 shadow-lg sm:left-8">
        <p className="font-mono text-[11px] text-ink-soft uppercase tracking-wider">Now</p>
        <p className="flex items-center gap-2 font-medium text-sm">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex size-2 rounded-full bg-signal" />
          </span>
          Designing Atlas at Algonet
        </p>
      </div>
    </div>
  );
}
