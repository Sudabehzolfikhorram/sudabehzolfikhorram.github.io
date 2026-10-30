import type { ReactNode } from "react";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * What Sudabeh does, as four tiles. Each tile has a tiny line drawing that
 * comes alive on hover, so the section reads at a glance.
 */

const S = "stroke-signal";
const R = "stroke-rule";

const art: Record<string, ReactNode> = {
  // A flow: three steps joined by a line that draws itself on hover.
  flows: (
    <svg aria-hidden className="h-16 w-28" fill="none" viewBox="0 0 112 64">
      <path className={cn(S, "[stroke-dasharray:120] [stroke-dashoffset:120] transition-[stroke-dashoffset] duration-700 group-hover:[stroke-dashoffset:0]")} d="M18 32h76" strokeWidth="2" />
      <path className={R} d="M18 32h76" strokeDasharray="3 4" strokeWidth="2" />
      {[18, 56, 94].map((x, i) => (
        <circle className={cn("fill-paper", i === 2 ? "fill-signal stroke-signal" : S)} cx={x} cy={32} key={x} r={8} strokeWidth="2" />
      ))}
    </svg>
  ),
  // A design system: parts that line up on hover.
  systems: (
    <svg aria-hidden className="h-16 w-28" fill="none" viewBox="0 0 112 64">
      <rect className="fill-sky transition-transform duration-500 group-hover:translate-x-1" height="14" rx="7" width="40" x="8" y="10" />
      <rect className={cn("fill-sky-soft", R)} height="14" rx="7" width="30" x="54" y="10" />
      <rect className={cn("fill-paper-2 transition-transform duration-500 group-hover:-translate-x-1", R)} height="22" rx="6" width="46" x="8" y="32" />
      <rect className={cn("fill-paper-2 transition-transform delay-75 duration-500 group-hover:translate-y-[-2px]", R)} height="22" rx="6" width="46" x="60" y="32" />
    </svg>
  ),
  // Research: bars under a magnifier that slides across on hover.
  research: (
    <svg aria-hidden className="h-16 w-28" fill="none" viewBox="0 0 112 64">
      {[20, 34, 26, 44, 30].map((h, i) => (
        <rect className={i === 3 ? "fill-gold" : "fill-gold-soft"} height={h} key={h + i} rx="3" width="12" x={10 + i * 18} y={56 - h} />
      ))}
      <g className="transition-transform duration-700 group-hover:translate-x-9">
        <circle className="fill-paper/60 stroke-ink" cx="30" cy="22" r="12" strokeWidth="2.5" />
        <path className="stroke-ink" d="m39 31 8 8" strokeLinecap="round" strokeWidth="3" />
      </g>
    </svg>
  ),
  // AI as a thinking partner: two speech bubbles, a spark between them.
  ai: (
    <svg aria-hidden className="h-16 w-28" fill="none" viewBox="0 0 112 64">
      <rect className={cn("fill-paper-2", R)} height="22" rx="11" width="54" x="6" y="8" />
      <rect className="fill-signal" height="22" rx="11" width="46" x="58" y="34" />
      <path
        className="fill-signal transition-transform duration-500 [transform-box:fill-box] [transform-origin:center] group-hover:rotate-90 group-hover:scale-125"
        d="M80 8 82.4 14.6 89 17 82.4 19.4 80 26 77.6 19.4 71 17 77.6 14.6Z"
      />
    </svg>
  ),
};

// Each tile takes on its own accent on hover: violet, blue, gold, violet.
const tones: Record<string, { tile: string; art: string }> = {
  flows: { tile: "hover:border-signal/50", art: "group-hover:bg-blush" },
  systems: { tile: "hover:border-sky/50", art: "group-hover:bg-sky-soft" },
  research: { tile: "hover:border-gold/50", art: "group-hover:bg-gold-soft" },
  ai: { tile: "hover:border-signal/50", art: "group-hover:bg-blush" },
};
const dots: Record<string, string> = { flows: "bg-signal", systems: "bg-sky", research: "bg-gold", ai: "bg-signal" };

const items = [
  {
    key: "flows",
    title: "Products, end to end",
    body: "From the first question to developer handoff: research, user flows, information architecture and UI. Solo or with a team.",
  },
  {
    key: "systems",
    title: "Design systems",
    body: "UI kits, variables, tokens and components that keep a product consistent as it grows. I’ve built several from scratch.",
  },
  {
    key: "research",
    title: "Research that decides",
    body: "Benchmarks, competitor analysis, feature lists and usability testing, so every screen has a reason to exist.",
  },
  {
    key: "ai",
    title: "AI as a thinking partner",
    body: "I explore, compare and prototype with AI to move faster. The judgment, and the taste, stay mine.",
  },
];

export function WhatIDo() {
  return (
    <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
      {items.map((it) => (
        <RevealItem className={cn("group flex flex-col rounded-3xl border border-rule bg-paper p-6 transition-colors duration-300", tones[it.key].tile)} key={it.key}>
          <div className={cn("grid h-24 place-items-center rounded-2xl bg-paper-2/70 transition-colors duration-500", tones[it.key].art)}>{art[it.key]}</div>
          <h3 className="mt-6 flex items-center gap-2 font-semibold text-lg">
            <span aria-hidden className={cn("size-1.5 rounded-full opacity-40 transition-opacity duration-300 group-hover:opacity-100", dots[it.key])} />
            {it.title}
          </h3>
          <p className="mt-2 text-ink-soft text-sm leading-relaxed">{it.body}</p>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
