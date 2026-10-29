"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { proof } from "@/lib/content";

/** Counts up from zero the first time the number scrolls into view. */
function Count({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  useEffect(() => {
    const el = ref.current;
    if (!inView || !el) return;
    const controls = animate(0, to, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix]);
  return (
    <span className="tabular-nums" ref={ref}>
      {to}
      {suffix}
    </span>
  );
}

export function Proof() {
  return (
    <RevealGroup className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-rule bg-rule lg:grid-cols-4" stagger={0.06}>
      {proof.map((p) => (
        <RevealItem className="bg-paper p-6 sm:p-8" key={p.label}>
          <p className="font-display text-5xl text-signal sm:text-6xl">
            <Count suffix={p.suffix} to={p.value} />
          </p>
          <p className="mt-4 font-medium">{p.label}</p>
          <p className="mt-1 text-ink-soft text-sm">{p.note}</p>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
