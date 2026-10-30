"use client";

import { motion, type Transition, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { untangleSteps } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * "How I untangle a product", told with twelve notes that rearrange as you
 * scroll: scattered findings → journeys → a system of parts → one screen.
 * The visual sticks while the four steps scroll past it.
 */

type Box = { x: number; y: number; w: number; h: number; r: number };
const NOTES = 12;

// The words on the notes while they are still raw findings.
const SCRIBBLES = ["roles?", "refunds", "edge case", "3 old flows", "who approves?", "empty state", "legacy API", "permissions", "wallet", "notifications", "reports", "onboarding"];

// One layout per step. Each array places the twelve notes in a 480 × 360 frame.
const scattered: Box[] = [
  [40, 40, -8], [190, 20, 6], [330, 50, -4], [70, 140, 9], [250, 120, -10], [360, 170, 7],
  [20, 250, 5], [150, 220, -6], [280, 260, 11], [380, 290, -7], [120, 300, 4], [220, 180, 12],
].map(([x, y, r]) => ({ x, y, w: 96, h: 50, r }));

const lanes: Box[] = Array.from({ length: NOTES }, (_, i) => {
  const c = Math.floor(i / 4);
  const r = i % 4;
  return { x: 24 + c * 152, y: 64 + r * 70, w: 128, h: 54, r: 0 };
});

const parts: Box[] = [
  // buttons
  { x: 24, y: 40, w: 110, h: 36, r: 0 }, { x: 146, y: 40, w: 110, h: 36, r: 0 }, { x: 268, y: 40, w: 36, h: 36, r: 0 },
  // inputs
  { x: 24, y: 100, w: 200, h: 40, r: 0 }, { x: 236, y: 100, w: 220, h: 40, r: 0 },
  // cards
  { x: 24, y: 164, w: 136, h: 96, r: 0 }, { x: 172, y: 164, w: 136, h: 96, r: 0 }, { x: 320, y: 164, w: 136, h: 96, r: 0 },
  // list rows
  { x: 24, y: 284, w: 432, h: 14, r: 0 }, { x: 24, y: 306, w: 432, h: 14, r: 0 }, { x: 24, y: 328, w: 300, h: 14, r: 0 },
  // badge
  { x: 316, y: 40, w: 64, h: 36, r: 0 },
];

const screen: Box[] = [
  { x: 132, y: 28, w: 324, h: 44, r: 0 }, // primary action bar
  { x: 132, y: 86, w: 100, h: 70, r: 0 }, // stat
  { x: 24, y: 28, w: 94, h: 314, r: 0 }, // sidebar
  { x: 244, y: 86, w: 100, h: 70, r: 0 }, // stat
  { x: 356, y: 86, w: 100, h: 70, r: 0 }, // stat
  { x: 132, y: 170, w: 324, h: 90, r: 0 }, // chart
  { x: 132, y: 274, w: 324, h: 18, r: 0 }, // row
  { x: 132, y: 298, w: 324, h: 18, r: 0 }, // row
  { x: 132, y: 322, w: 324, h: 18, r: 0 }, // row
  { x: 40, y: 50, w: 62, h: 10, r: 0 }, // nav
  { x: 40, y: 70, w: 62, h: 10, r: 0 }, // nav
  { x: 40, y: 90, w: 62, h: 10, r: 0 }, // nav
];

const LAYOUTS = [scattered, lanes, parts, screen];
const LANE_TITLES = ["Sign up", "Pay", "Manage"];
// A few notes carry the accent colour all the way through.
const fillOf = (i: number) => (i === 0 ? "var(--signal)" : i % 3 === 1 ? "var(--blush)" : "var(--paper-2)");
const SPRING: Transition = { type: "spring", stiffness: 140, damping: 22, mass: 0.9 };

function Visual({ step }: { step: number }) {
  const layout = LAYOUTS[step];
  return (
    <svg aria-hidden className="h-auto w-full" viewBox="0 0 480 370">
      {LANE_TITLES.map((t, c) => (
        <motion.text
          animate={{ opacity: step === 1 ? 1 : 0, y: step === 1 ? 0 : 6 }}
          className="fill-ink-soft font-mono text-[11px] uppercase tracking-wider"
          key={t}
          transition={{ duration: 0.4 }}
          x={24 + c * 152}
          y={46}
        >
          {t}
        </motion.text>
      ))}
      {layout.map((b, i) => (
        <motion.g
          animate={{ x: b.x, y: b.y, rotate: b.r }}
          initial={false}
          key={SCRIBBLES[i]}
          style={{ originX: "50%", originY: "50%" }}
          transition={{ ...SPRING, delay: i * 0.025 }}
        >
          <motion.rect
            animate={{ width: b.w, height: b.h, rx: step === 0 ? 6 : Math.min(10, b.h / 2) }}
            className={cn(i === 0 ? "" : "stroke-rule")}
            fill={fillOf(i)}
            initial={false}
            strokeWidth={1}
            transition={{ ...SPRING, delay: i * 0.025 }}
          />
          <motion.text
            animate={{ opacity: step <= 1 ? 1 : 0 }}
            className={cn("text-[11px]", i === 0 ? "fill-on-signal" : "fill-ink")}
            initial={false}
            transition={{ duration: 0.3 }}
            x={10}
            y={30}
          >
            {SCRIBBLES[i]}
          </motion.text>
        </motion.g>
      ))}
    </svg>
  );
}

function Step({ i, onEnter, active }: { i: number; onEnter: (i: number) => void; active: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  // A band just below the middle of the screen, so on phones the active step
  // is never the one hidden under the sticky visual.
  const inView = useInView(ref, { margin: "-55% 0px -30% 0px" });
  useEffect(() => {
    if (inView) onEnter(i);
  }, [inView, i, onEnter]);
  const s = untangleSteps[i];
  return (
    <li className="flex min-h-[48vh] flex-col justify-center py-8 lg:min-h-[70vh]" ref={ref}>
      <motion.div animate={{ opacity: active ? 1 : 0.35 }} transition={{ duration: 0.4 }}>
        <p className="font-mono text-gold text-sm">
          0{i + 1} · {s.verb}
        </p>
        <h3 className="mt-3 font-display text-3xl sm:text-4xl">{s.title}</h3>
        <p className="mt-4 max-w-md text-ink-soft text-lg leading-relaxed">{s.body}</p>
      </motion.div>
    </li>
  );
}

export function UntangleStory() {
  const [step, setStep] = useState(0);
  return (
    <section className="border-rule border-y bg-paper-2/40">
      <div className="mx-auto max-w-[1240px] px-4 pt-24 sm:px-8">
        <p className="eyebrow">How I work</p>
        <h2 className="mt-4 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05]">
          How I untangle a product, <em className="text-signal">step by step.</em>
        </h2>
      </div>
      <div className="mx-auto grid max-w-[1240px] gap-8 px-4 pb-16 sm:px-8 lg:grid-cols-2 lg:gap-16">
        {/* Sticky on every screen size: on phones it rides above the steps. */}
        <div className="sticky top-16 z-10 -mx-4 bg-paper/90 px-4 pt-4 pb-2 backdrop-blur-md sm:top-20 lg:top-28 lg:order-2 lg:mx-0 lg:h-fit lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
          <div className="mx-auto max-w-[280px] rounded-3xl border border-rule bg-paper p-3 sm:max-w-[420px] sm:p-4 shadow-[0_30px_80px_-50px_rgba(40,30,120,0.45)] lg:max-w-none lg:p-8">
            <Visual step={step} />
            <div className="mt-3 flex gap-1.5" aria-hidden>
              {untangleSteps.map((s, i) => (
                <span className={cn("h-1 flex-1 rounded-full transition-colors duration-500", i < step ? "bg-signal" : i === step ? "bg-gold" : "bg-rule")} key={s.verb} />
              ))}
            </div>
          </div>
        </div>
        <ol className="lg:order-1">
          {untangleSteps.map((s, i) => (
            <Step active={i === step} i={i} key={s.verb} onEnter={setStep} />
          ))}
        </ol>
      </div>
    </section>
  );
}
