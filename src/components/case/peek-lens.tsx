"use client";

import { Eye } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { type PointerEvent, type ReactNode, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { MacBook } from "./devices";

export type PeekShot = { label: string; image?: string; width?: number; height?: number };

/**
 * Work still in development, shown on purpose out of focus. A round lens about
 * 5 cm across follows the cursor (or a finger) and brings what's under it into
 * focus: enough for a peek, never a clean screenshot.
 */
export function PeekLens({ shots, fallback }: { shots: PeekShot[]; fallback: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [peeking, setPeeking] = useState(false);
  const [touched, setTouched] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const shot = shots[index];

  const move = (e: PointerEvent<HTMLDivElement>) => {
    const el = stage.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--lens-x", `${e.clientX - r.left}px`);
    el.style.setProperty("--lens-y", `${e.clientY - r.top}px`);
  };

  const content = shot?.image ? (
    <Image alt="" className="size-full object-cover object-top" draggable={false} fill sizes="(min-width: 1240px) 1180px, 100vw" src={shot.image} />
  ) : (
    fallback
  );

  return (
    <div>
      {shots.length > 1 && (
        <div aria-label="Pages" className="mb-4 flex flex-wrap gap-2" role="tablist">
          {shots.map((s, i) => (
            <button
              aria-selected={i === index}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm transition-colors",
                i === index ? "text-on-signal" : "text-ink-soft hover:text-ink"
              )}
              key={s.label}
              onClick={() => setIndex(i)}
              role="tab"
              type="button"
            >
              {i === index && <motion.span className="absolute inset-0 rounded-full bg-signal" layoutId="peek-tab" transition={{ type: "spring", stiffness: 500, damping: 36 }} />}
              <span className="relative">{s.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* On a MacBook, without the real address: the live product needs a login. */}
      <MacBook screenClassName="bg-paper-2">

        <div
          aria-label="A blurred preview of Atlas. Move over it to bring a small circle into focus."
          className="peek-stage relative aspect-[16/10] cursor-none touch-none select-none overflow-hidden"
          data-peeking={peeking || undefined}
          onPointerDown={(e) => {
            move(e);
            setPeeking(true);
            if (e.pointerType !== "mouse") setTouched(true);
          }}
          onPointerEnter={(e) => {
            move(e);
            if (e.pointerType === "mouse") setPeeking(true);
          }}
          onPointerLeave={() => setPeeking(false)}
          onPointerMove={move}
          onPointerUp={(e) => e.pointerType !== "mouse" && setPeeking(false)}
          ref={stage}
          role="img"
        >
          <div aria-hidden className="absolute inset-0 scale-105 blur-[14px] saturate-[.85]">
            {content}
          </div>
          <div aria-hidden className="peek-focus absolute inset-0">
            {content}
          </div>
          <span aria-hidden className="peek-ring pointer-events-none absolute top-0 left-0 rounded-full" />

          <AnimatePresence>
            {!peeking && (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="pointer-events-none absolute inset-0 grid place-items-center p-4"
                exit={{ opacity: 0, y: 6 }}
                initial={{ opacity: 0, y: 6 }}
              >
                <p className="flex max-w-sm items-center gap-3 rounded-2xl border border-rule bg-paper/90 px-4 py-3 text-sm shadow-lg backdrop-blur">
                  <Eye className="size-5 shrink-0 text-signal" />
                  <span>
                    Still in development, so it stays blurry.{" "}
                    <span className="text-ink-soft">
                      Curious? {touched ? "Touch and drag" : "Hover or touch it"} for a little peek.
                    </span>
                  </span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </MacBook>
      <p className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-ink-soft text-xs">
        <span className="flex items-center gap-1.5 font-mono">
          <span className="size-1.5 rounded-full bg-signal" /> atlas · in development
        </span>
        {!shot?.image && <span>An illustration stands in until the real screens are added.</span>}
      </p>
    </div>
  );
}
