"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { IPhoneFrame } from "../devices";

export type TourScreen = { src: string; label: string; title: string; body: string; width: number; height: number };

/** A row of phone thumbnails; the selected screen opens large beside its story. */
export function ScreenTour({ screens, accent }: { screens: TourScreen[]; accent: string }) {
  const [i, setI] = useState(0);
  const s = screens[i];
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
      <div className="mx-auto w-[240px] sm:w-[280px] lg:col-span-4">
        <IPhoneFrame>
          <div className="relative aspect-[375/812]">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div animate={{ opacity: 1, y: 0 }} className="absolute inset-0" exit={{ opacity: 0, y: -12 }} initial={{ opacity: 0, y: 12 }} key={s.src} transition={{ duration: 0.28 }}>
                <Image alt={s.title} className="object-cover object-top" fill sizes="280px" src={s.src} />
              </motion.div>
            </AnimatePresence>
          </div>
        </IPhoneFrame>
      </div>

      <div className="lg:col-span-7 lg:col-start-6">
        <AnimatePresence mode="wait">
          <motion.div animate={{ opacity: 1 }} exit={{ opacity: 0 }} initial={{ opacity: 0 }} key={s.src} transition={{ duration: 0.2 }}>
            <p className="font-mono text-[0.72rem] text-ink-soft uppercase">{String(i + 1).padStart(2, "0")} / {String(screens.length).padStart(2, "0")} · {s.label}</p>
            <p className="mt-3 font-display text-3xl leading-tight">{s.title}</p>
            <p className="mt-3 max-w-xl text-ink-soft leading-relaxed">{s.body}</p>
          </motion.div>
        </AnimatePresence>

        <div className="-mx-4 mt-8 flex gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:thin] sm:mx-0 sm:grid sm:grid-cols-8 sm:overflow-visible sm:px-0">
          {screens.map((t, n) => (
            <button
              aria-label={t.label}
              aria-pressed={n === i}
              className={cn("relative w-16 shrink-0 overflow-hidden rounded-xl ring-2 transition sm:w-auto", n === i ? "ring-offset-2 ring-offset-paper" : "opacity-70 ring-transparent hover:opacity-100")}
              key={t.src}
              onClick={() => setI(n)}
              style={n === i ? { ["--tw-ring-color" as string]: accent } : undefined}
              type="button"
            >
              <span className="relative block aspect-[375/812] bg-white">
                <Image alt="" className="object-cover object-top" fill sizes="80px" src={t.src} />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
