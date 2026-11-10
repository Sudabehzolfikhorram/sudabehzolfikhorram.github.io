"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import { MacBook } from "../devices";

/* ───────────── Designer notes ───────────── */

export type NoteType = {
  id: string;
  label: string;
  fa: string;
  /** What the note is for, in English. */
  use: string;
  tint: string;
  ink: string;
  icon: string;
  /** A real note from the Kudos file, translated, when there is one to show. */
  example?: { where: string; text: string };
};

/** The six kinds of note Sudabeh left on the Kudos canvas, as a picker. */
export function NoteSystem({ notes, fontClass }: { notes: NoteType[]; fontClass?: string }) {
  const [id, setId] = useState(notes[0].id);
  const uid = useId();
  const note = notes.find((n) => n.id === id) ?? notes[0];
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:col-span-6" role="tablist">
        {notes.map((n) => {
          const active = n.id === id;
          return (
            <button
              aria-selected={active}
              className={cn("relative overflow-hidden rounded-2xl border p-4 text-left transition-colors", active ? "border-transparent" : "border-rule bg-paper hover:bg-paper-2")}
              key={n.id}
              onClick={() => setId(n.id)}
              role="tab"
              type="button"
            >
              {active && <motion.span className="absolute inset-0" layoutId={`note-${uid}`} style={{ background: n.tint }} transition={{ type: "spring", stiffness: 420, damping: 36 }} />}
              <span className="relative flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-xl bg-white text-lg shadow-sm" style={{ color: n.ink }}>{n.icon}</span>
                <span className={cn("font-medium", active && "text-[#1d1d1f]")}>{n.label}</span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="lg:col-span-6">
        <AnimatePresence mode="wait">
          <motion.div animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} initial={{ opacity: 0, y: 8 }} key={note.id} transition={{ duration: 0.22 }}>
            {/* The note card, drawn the way it looks in the file. */}
            <div className="overflow-hidden rounded-2xl bg-white text-[#1d1d1f] shadow-[0_24px_50px_-30px_rgb(0_0_0/0.45)] ring-1 ring-black/5">
              <div className="flex items-center justify-between px-5 py-4" style={{ background: note.tint }}>
                <span className="grid size-10 place-items-center rounded-xl bg-white/80 text-xl" style={{ color: note.ink }}>{note.icon}</span>
                <span className={cn("font-bold", fontClass)} dir="rtl">سودابه</span>
              </div>
              <div className="space-y-2 px-5 py-4">
                <p className={cn("text-right text-[#444]", fontClass)} dir="rtl">{note.fa}</p>
                <p className="font-medium">{note.use}</p>
              </div>
            </div>
            {note.example ? (
              <div className="mt-5 rounded-2xl border border-rule bg-paper p-5">
                <p className="font-mono text-[0.7rem] text-ink-soft uppercase">From the file · {note.example.where}</p>
                <p className="mt-2 leading-relaxed">“{note.example.text}”</p>
              </div>
            ) : (
              <p className="mt-5 text-ink-soft text-sm">Used in reviews to mark what works, what doesn’t, and what matters most.</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ───────────── First-run guide ───────────── */

export type GuideStep = { src: string; title: string; text: string; width: number; height: number };

/** Step through the in-product guide: the spotlighted screen and its tooltip copy. */
export function GuideTour({ steps, accent }: { steps: GuideStep[]; accent: string }) {
  const [i, setI] = useState(0);
  const step = steps[i];
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
      <div className="lg:col-span-8">
        <MacBook>
          <div className="relative aspect-[2560/954] bg-[#f5f5f7]">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div animate={{ opacity: 1 }} className="absolute inset-0" exit={{ opacity: 0 }} initial={{ opacity: 0 }} key={step.src} transition={{ duration: 0.3 }}>
                <Image alt={`Kudos guide, step ${i + 1}: ${step.title}`} className="object-cover object-top" fill sizes="(min-width: 1024px) 60vw, 100vw" src={step.src} />
              </motion.div>
            </AnimatePresence>
          </div>
        </MacBook>
      </div>
      <div className="lg:col-span-4">
        <div className="flex gap-1.5">
          {steps.map((s, n) => (
            <button
              aria-label={`Step ${n + 1}: ${s.title}`}
              className="h-1.5 flex-1 rounded-full transition-colors"
              key={s.src}
              onClick={() => setI(n)}
              style={{ background: n <= i ? accent : "var(--rule)" }}
              type="button"
            />
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} initial={{ opacity: 0, x: 8 }} key={i} transition={{ duration: 0.2 }}>
            <p className="mt-6 font-mono text-[0.72rem] text-ink-soft uppercase">Step {i + 1} of {steps.length}</p>
            <p className="mt-2 font-display text-2xl">{step.title}</p>
            <p className="mt-3 text-ink-soft leading-relaxed">“{step.text}”</p>
          </motion.div>
        </AnimatePresence>
        <div className="mt-6 flex gap-2">
          <button className="rounded-full border border-rule px-4 py-2 text-sm disabled:opacity-40" disabled={i === 0} onClick={() => setI(i - 1)} type="button">Back</button>
          <button
            className="rounded-full px-4 py-2 text-sm text-white disabled:opacity-40"
            disabled={i === steps.length - 1}
            onClick={() => setI(i + 1)}
            style={{ background: accent }}
            type="button"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
