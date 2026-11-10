"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import { IPhoneFrame } from "../devices";

export type FlowStep = {
  id: string;
  n: string;
  title: string;
  body: string;
  /** A real screen for this step; steps without one show only in the map. */
  shot?: { src: string; alt: string; width: number; height: number };
  /** A side path, drawn off the main line. */
  branch?: boolean;
};

/**
 * A purchase flow you can step through: a map of every step (with the side
 * path drawn off the main line), and the real screen for the selected one.
 */
export function FlowStepper({ steps, accent }: { steps: FlowStep[]; accent: string }) {
  const withShots = steps.filter((s) => s.shot);
  const [id, setId] = useState(withShots[0]?.id ?? steps[0].id);
  const uid = useId();
  const step = steps.find((s) => s.id === id) ?? steps[0];
  const shot = step.shot ?? withShots[0]?.shot;

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
      <div className="lg:col-span-7">
        {/* The map. Every step is a button; the side path sits under the step it leaves from. */}
        <ol className="relative space-y-3" role="tablist">
          <span aria-hidden className="absolute top-6 bottom-6 left-[1.35rem] w-px bg-rule" />
          {steps.map((s) => {
            const active = s.id === id;
            return (
              <li className={cn("relative", s.branch && "ml-10 sm:ml-14")} key={s.id}>
                {s.branch && <span aria-hidden className="absolute top-1/2 -left-6 h-px w-5 border-rule border-t border-dashed sm:-left-8 sm:w-7" />}
                <button
                  aria-selected={active}
                  className={cn(
                    "relative flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-colors",
                    active ? "border-transparent text-white" : "border-rule bg-paper hover:bg-paper-2",
                    s.branch && !active && "border-dashed"
                  )}
                  onClick={() => setId(s.id)}
                  role="tab"
                  type="button"
                >
                  {active && (
                    <motion.span
                      className="absolute inset-0 rounded-2xl"
                      layoutId={`flow-${uid}`}
                      style={{ background: accent }}
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                  <span
                    className={cn(
                      "relative grid size-11 shrink-0 place-items-center rounded-full font-mono text-sm",
                      active ? "bg-white/20" : "bg-paper-2 text-ink-soft"
                    )}
                  >
                    {s.n}
                  </span>
                  <span className="relative">
                    <span className="flex flex-wrap items-center gap-2 font-medium">
                      {s.title}
                      {s.branch && (
                        <span className={cn("rounded-full px-2 py-0.5 font-mono text-[0.65rem] uppercase", active ? "bg-white/20" : "bg-paper-2 text-ink-soft")}>
                          Side path
                        </span>
                      )}
                      {!s.shot && (
                        <span className={cn("font-mono text-[0.65rem] uppercase", active ? "text-white/70" : "text-ink-soft")}>· not pictured</span>
                      )}
                    </span>
                    <span className={cn("mt-1 block text-sm leading-relaxed", active ? "text-white/85" : "text-ink-soft")}>{s.body}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="order-first mx-auto w-[200px] sm:w-[280px] lg:order-none lg:col-span-4 lg:col-start-9">
        <IPhoneFrame>
          <div className="relative aspect-[375/812]">
            <AnimatePresence initial={false} mode="popLayout">
              {shot && (
                <motion.div
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0"
                  exit={{ opacity: 0, scale: 0.98 }}
                  initial={{ opacity: 0, scale: 1.02 }}
                  key={shot.src}
                  transition={{ duration: 0.3 }}
                >
                  <Image alt={shot.alt} className="block h-full w-full object-cover object-top" fill sizes="280px" src={shot.src} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </IPhoneFrame>
        <p className="mt-4 text-center font-mono text-[0.72rem] text-ink-soft uppercase">
          {step.shot ? `Step ${step.n} · ${step.title}` : `Step ${step.n} has no exported screen here`}
        </p>
      </div>
    </div>
  );
}
