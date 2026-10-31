"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { type PointerEvent, type ReactNode, useRef, useState } from "react";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

/**
 * What Sudabeh does, as four cards. Each has a small scene that plays when it
 * scrolls into view (so phones get it too) and replays on hover; a soft light
 * follows the pointer across the card.
 */

const ease = [0.22, 1, 0.36, 1] as const;

/** A flow: steps light up one by one while a dot travels the path, ending on a check. */
function Flows({ play }: { play: number }) {
  return (
    <svg aria-hidden className="h-20 w-36" fill="none" key={play} viewBox="0 0 144 80">
      <path className="stroke-rule" d="M20 50 C 44 50, 48 26, 72 26 S 100 50, 124 50" strokeDasharray="3 5" strokeWidth="2" />
      <motion.path
        animate={{ pathLength: 1 }}
        className="stroke-signal"
        d="M20 50 C 44 50, 48 26, 72 26 S 100 50, 124 50"
        initial={{ pathLength: 0 }}
        strokeLinecap="round"
        strokeWidth="2.5"
        transition={{ duration: 1.4, ease }}
      />
      {[
        [20, 50],
        [72, 26],
        [124, 50],
      ].map(([x, y], i) => (
        <motion.circle
          animate={{ scale: [0.6, 1.15, 1] }}
          className={i === 2 ? "fill-signal stroke-signal" : "fill-paper stroke-signal"}
          cx={x}
          cy={y}
          initial={{ scale: 0.6 }}
          key={x}
          r="7"
          strokeWidth="2.5"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          transition={{ delay: i * 0.6, duration: 0.5, ease }}
        />
      ))}
      <motion.path
        animate={{ pathLength: 1, opacity: 1 }}
        className="stroke-on-signal"
        d="M120.5 50 l2.5 2.5 l4.5 -5"
        initial={{ pathLength: 0, opacity: 0 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        transition={{ delay: 1.4, duration: 0.35 }}
      />
    </svg>
  );
}

/** A design system: scattered parts snap into a tidy grid. */
function Systems({ play }: { play: number }) {
  const parts = [
    { x: 14, y: 10, w: 46, h: 14, from: [-18, -12, -14], c: "fill-sky" },
    { x: 66, y: 10, w: 30, h: 14, from: [16, -16, 12], c: "fill-sky-soft stroke-rule" },
    { x: 102, y: 10, w: 28, h: 14, from: [22, 10, 18], c: "fill-signal" },
    { x: 14, y: 32, w: 56, h: 38, from: [-14, 18, 10], c: "fill-paper-2 stroke-rule" },
    { x: 76, y: 32, w: 54, h: 38, from: [18, 20, -16], c: "fill-paper-2 stroke-rule" },
  ];
  return (
    <svg aria-hidden className="h-20 w-36" fill="none" key={play} viewBox="0 0 144 80">
      {parts.map((p, i) => (
        <motion.rect
          animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
          className={p.c}
          height={p.h}
          initial={{ x: p.from[0], y: p.from[1], rotate: p.from[2], opacity: 0.4 }}
          key={p.x + p.y}
          rx={i < 3 ? 7 : 6}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 + i * 0.08 }}
          width={p.w}
          x={p.x}
          y={p.y}
        />
      ))}
      <motion.rect
        animate={{ opacity: [0, 1, 0] }}
        className="stroke-signal"
        height="64"
        initial={{ opacity: 0 }}
        rx="9"
        strokeDasharray="4 4"
        strokeWidth="1.5"
        transition={{ delay: 0.9, duration: 1.2 }}
        width="124"
        x="10"
        y="8"
      />
    </svg>
  );
}

/** Research: bars rise, a lens sweeps across and lifts the one that matters. */
function Research({ play }: { play: number }) {
  const bars = [22, 34, 26, 48, 30, 18];
  return (
    <svg aria-hidden className="h-20 w-36" fill="none" key={play} viewBox="0 0 144 80">
      {bars.map((h, i) => (
        <motion.rect
          animate={{ height: h, y: 72 - h }}
          className={i === 3 ? "fill-signal" : "fill-blush"}
          height={0}
          initial={{ height: 0, y: 72 }}
          key={h + i}
          rx="3"
          transition={{ delay: i * 0.07, duration: 0.6, ease }}
          width="14"
          x={12 + i * 21}
          y={72}
        />
      ))}
      <motion.g animate={{ x: [0, 62, 52] }} initial={{ x: 0 }} transition={{ delay: 0.5, duration: 1.4, ease }}>
        <circle className="fill-paper/50 stroke-ink" cx="30" cy="24" r="12" strokeWidth="2.5" />
        <path className="stroke-ink" d="m39 33 8 8" strokeLinecap="round" strokeWidth="3" />
      </motion.g>
    </svg>
  );
}

/** AI as a partner: a question, a thinking pause, an answer and a spark. */
function Ai({ play }: { play: number }) {
  return (
    <svg aria-hidden className="h-20 w-36" fill="none" key={play} viewBox="0 0 144 80">
      <motion.rect
        animate={{ scaleX: 1, opacity: 1 }}
        className="fill-paper-2 stroke-rule"
        height="22"
        initial={{ scaleX: 0.2, opacity: 0 }}
        rx="11"
        style={{ transformBox: "fill-box", transformOrigin: "left center" }}
        transition={{ duration: 0.45, ease }}
        width="64"
        x="8"
        y="8"
      />
      {[0, 1, 2].map((i) => (
        <motion.circle
          animate={{ opacity: [0, 1, 1, 0], y: [0, -2, 0, 0] }}
          className="fill-ink-soft"
          cx={98 + i * 8}
          cy="47"
          initial={{ opacity: 0 }}
          key={i}
          r="2.5"
          transition={{ delay: 0.5 + i * 0.12, duration: 0.9, times: [0, 0.3, 0.7, 1] }}
        />
      ))}
      <motion.rect
        animate={{ scaleX: 1, opacity: 1 }}
        className="fill-signal"
        height="22"
        initial={{ scaleX: 0.2, opacity: 0 }}
        rx="11"
        style={{ transformBox: "fill-box", transformOrigin: "right center" }}
        transition={{ delay: 1.4, duration: 0.45, ease }}
        width="56"
        x="80"
        y="36"
      />
      <motion.path
        animate={{ scale: [0, 1.3, 1], rotate: [0, 90, 90] }}
        className="fill-sky"
        d="M112 6 114.4 12.6 121 15 114.4 17.4 112 24 109.6 17.4 103 15 109.6 12.6Z"
        initial={{ scale: 0 }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        transition={{ delay: 1.8, duration: 0.6, ease }}
      />
    </svg>
  );
}

const SCENES: Record<string, (p: { play: number }) => ReactNode> = { flows: Flows, systems: Systems, research: Research, ai: Ai };

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

function Card({ it, index }: { it: (typeof items)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const reduce = useReducedMotion();
  // Each change of `play` remounts the scene, so it runs again from the start.
  const [play, setPlay] = useState(0);
  const Scene = SCENES[it.key];

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      className="group relative h-full overflow-hidden rounded-3xl border border-rule bg-paper p-6 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-signal/40"
      onPointerEnter={(e) => e.pointerType === "mouse" && !reduce && setPlay((n) => n + 1)}
      onPointerMove={onMove}
      ref={ref}
    >
      {/* A soft light under the pointer. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(260px circle at var(--mx, 50%) var(--my, 0%), color-mix(in oklab, var(--glow) 16%, transparent), transparent 70%)" }}
      />
      <div className="relative grid h-28 place-items-center overflow-hidden rounded-2xl bg-paper-2/70">
        <span className="absolute top-3 left-3 font-mono text-[10px] text-ink-soft">0{index + 1}</span>
        {inView || reduce ? <Scene play={play} /> : <span className="h-20 w-36" />}
      </div>
      <h3 className="relative mt-6 font-semibold text-lg">{it.title}</h3>
      <p className="relative mt-2 text-ink-soft text-sm leading-relaxed">{it.body}</p>
    </div>
  );
}

export function WhatIDo() {
  return (
    <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
      {items.map((it, i) => (
        <RevealItem className="h-full" key={it.key}>
          <Card index={i} it={it} />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
