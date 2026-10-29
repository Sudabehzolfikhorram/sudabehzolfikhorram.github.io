"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { Cover } from "@/components/case/blocks";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { caseStudies } from "@/lib/case-studies";

const spring = { type: "spring", stiffness: 380, damping: 30 } as const;

/** Project index. Hovering a row floats that project's thumbnail by the cursor. */
export function WorkList({ size = "lg" }: { size?: "lg" | "xl" }) {
  const [hover, setHover] = useState<string | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 30 });
  const sy = useSpring(y, { stiffness: 300, damping: 30 });
  const active = caseStudies.find((c) => c.slug === hover);

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
    >
      <RevealGroup as="ol" className="border-rule border-t" stagger={0.06}>
        {caseStudies.map((cs, i) => (
          <RevealItem as="li" className="border-rule border-b" key={cs.slug}>
            <Link
              className="group block"
              href={`/work/${cs.slug}`}
              onPointerEnter={(e) => e.pointerType === "mouse" && setHover(cs.slug)}
              onPointerLeave={() => setHover(null)}
            >
              <motion.span
                className="grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-6 sm:grid-cols-[4rem_1fr_auto_2rem]"
                initial="rest"
                whileFocus="hover"
                whileHover="hover"
              >
                <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
                <motion.span
                  className={`font-display leading-none transition-colors duration-200 group-hover:text-signal ${size === "xl" ? "text-6xl sm:text-8xl" : "text-5xl sm:text-7xl"}`}
                  transition={spring}
                  variants={{ rest: { x: 0 }, hover: { x: 14 } }}
                >
                  {cs.name}
                </motion.span>
                <span className="eyebrow hidden sm:inline">{cs.category}</span>
                <motion.span
                  aria-hidden
                  className="justify-self-end text-2xl"
                  transition={spring}
                  variants={{ rest: { x: 0 }, hover: { x: 6 } }}
                >
                  →
                </motion.span>
              </motion.span>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Cursor-following thumbnail (mouse only, hidden on small screens). */}
      <AnimatePresence>
        {active && (
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="pointer-events-none absolute top-0 left-0 z-20 hidden w-[340px] lg:block"
            exit={{ opacity: 0, scale: 0.9 }}
            initial={{ opacity: 0, scale: 0.9 }}
            key={active.slug}
            style={{ x: sx, y: sy, translateX: "-50%", translateY: "-110%" }}
            transition={{ duration: 0.2 }}
          >
            <Cover compact cs={active} className="shadow-2xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
