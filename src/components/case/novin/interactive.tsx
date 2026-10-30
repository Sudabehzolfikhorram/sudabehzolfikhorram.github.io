"use client";

import { animate, AnimatePresence, motion, useInView, useMotionValue, useTransform } from "motion/react";
import Image from "next/image";
import { type KeyboardEvent, type PointerEvent, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* ───────────── Before / after slider ───────────── */

/**
 * Drag (or use arrow keys) to wipe between the live site and the redesign.
 * On first view it sweeps once by itself so people know it moves.
 */
export function BeforeAfter({
  before,
  after,
  width,
  height,
  beforeLabel = "Before · live site",
  afterLabel = "After · redesign",
  beforeAlt = "The current Novin Host homepage",
  afterAlt = "The redesigned Novin Host homepage",
  accent = "#214bbd",
}: {
  before: string;
  after: string;
  width: number;
  height: number;
  beforeLabel?: string;
  afterLabel?: string;
  beforeAlt?: string;
  afterAlt?: string;
  /** Colour of the "after" label. */
  accent?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useMotionValue(50);
  const [value, setValue] = useState(50);
  const clip = useTransform(pos, (p) => `inset(0 0 0 ${p}%)`);
  const left = useTransform(pos, (p) => `${p}%`);
  const dragging = useRef(false);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => pos.on("change", (v) => setValue(Math.round(v))), [pos]);

  // A one-time hint sweep (skipped for reduced motion).
  useEffect(() => {
    if (!inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c = animate(pos, [50, 22, 78, 50], { duration: 2.4, ease: "easeInOut", delay: 0.4 });
    return () => c.stop();
  }, [inView, pos]);

  const setFromPointer = (e: PointerEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    pos.stop();
    pos.set(Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100)));
  };
  const onKey = (e: KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === "ArrowLeft") pos.set(Math.max(0, pos.get() - step));
    else if (e.key === "ArrowRight") pos.set(Math.min(100, pos.get() + step));
    else return;
    e.preventDefault();
  };

  return (
    <div
      className="relative cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-2xl bg-black shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] ring-1 ring-white/10"
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        setFromPointer(e);
      }}
      onPointerMove={(e) => dragging.current && setFromPointer(e)}
      onPointerUp={() => {
        dragging.current = false;
      }}
      ref={ref}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <Image alt={beforeAlt} className="absolute inset-0 h-full w-full object-cover" draggable={false} fill priority sizes="100vw" src={before} />
      <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
        <Image alt={afterAlt} className="h-full w-full object-cover" draggable={false} fill priority sizes="100vw" src={after} />
      </motion.div>

      <span className="pointer-events-none absolute top-4 left-4 rounded-full bg-black/70 px-3 py-1.5 font-mono text-[0.7rem] text-white uppercase tracking-[0.06em] backdrop-blur">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute top-4 right-4 rounded-full px-3 py-1.5 font-mono text-[0.7rem] text-white uppercase tracking-[0.06em]" style={{ background: accent }}>
        {afterLabel}
      </span>

      <motion.div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_20px_rgb(255_255_255/0.6)]" style={{ left }} />
      <motion.button
        aria-label="Compare before and after"
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={value}
        aria-valuetext={`${value}% showing ${beforeLabel}`}
        className="absolute top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[#11215d] shadow-xl outline-none ring-[#7b9efe] focus-visible:ring-4"
        onKeyDown={onKey}
        role="slider"
        style={{ left }}
        type="button"
      >
        <svg aria-hidden className="size-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M9 6 3 12l6 6M15 6l6 6-6 6" />
        </svg>
      </motion.button>
    </div>
  );
}

/* ───────────── Annotated hotspots ───────────── */

export type Hotspot = { x: number; y: number; title: string; body: string };

/** An image with numbered markers; the list beside it stays in sync. */
export function Hotspots({
  src,
  alt,
  width,
  height,
  points,
  tone = "blue",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  points: Hotspot[];
  tone?: "blue" | "red";
}) {
  const [active, setActive] = useState(0);
  const dot = tone === "red" ? "bg-[#e5484d]" : "bg-[#214bbd]";
  const ring = tone === "red" ? "ring-[#e5484d]/30" : "ring-[#7b9efe]/40";

  return (
    <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
      <div className="relative overflow-hidden rounded-2xl shadow-[0_30px_60px_-30px_rgb(0_0_0/0.45)] ring-1 ring-black/10" style={{ aspectRatio: `${width} / ${height}` }}>
        <Image alt={alt} className="object-cover" fill sizes="(min-width: 1024px) 60vw, 100vw" src={src} />
        {points.map((p, i) => (
          <button
            aria-label={`${i + 1}. ${p.title}`}
            className={cn(
              "absolute grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full font-mono font-semibold text-[13px] text-white ring-8 transition-transform duration-200",
              dot,
              ring,
              active === i ? "z-10 scale-125" : "scale-100 opacity-90",
            )}
            key={p.title}
            onClick={() => setActive(i)}
            onFocus={() => setActive(i)}
            onMouseEnter={() => setActive(i)}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            type="button"
          >
            {i + 1}
            {active === i && (
              <motion.span
                animate={{ opacity: [0.6, 0], scale: [1, 2.2] }}
                aria-hidden
                className={cn("absolute inset-0 rounded-full", dot)}
                transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY }}
              />
            )}
          </button>
        ))}
      </div>

      <ol className="space-y-2">
        {points.map((p, i) => (
          <li key={p.title}>
            <button
              className={cn(
                "w-full rounded-xl border p-4 text-left transition-colors",
                active === i ? "border-ink/30 bg-paper" : "border-transparent hover:bg-paper/60",
              )}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              type="button"
            >
              <span className="flex items-baseline gap-3">
                <span className={cn("grid size-6 shrink-0 place-items-center rounded-full font-mono text-[11px] text-white", dot)}>{i + 1}</span>
                <span className="font-medium">{p.title}</span>
              </span>
              <AnimatePresence initial={false}>
                {active === i && (
                  <motion.p
                    animate={{ height: "auto", opacity: 1 }}
                    className="overflow-hidden pl-9 text-ink-soft text-sm leading-relaxed"
                    exit={{ height: 0, opacity: 0 }}
                    initial={{ height: 0, opacity: 0 }}
                  >
                    <span className="block pt-2">{p.body}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ───────────── Twin full-page scroll ───────────── */

/** Two full pages side by side that scroll together, top to bottom. */
export function TwinScroll({
  left,
  right,
  accent = "#214bbd",
}: {
  left: { src: string; label: string; height: number };
  right: { src: string; label: string; height: number };
  /** Colour of the right-hand label. */
  accent?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const frame = (side: typeof left, tone: string, toneColor?: string) => (
    <figure>
      <div className="overflow-hidden rounded-xl bg-white shadow-[0_30px_60px_-30px_rgb(0_0_0/0.45)] ring-1 ring-black/10">
        <div className="flex items-center gap-1.5 border-zinc-200 border-b bg-zinc-100 px-3 py-2">
          <span className="size-2.5 rounded-full bg-zinc-300" />
          <span className="size-2.5 rounded-full bg-zinc-300" />
          <span className="size-2.5 rounded-full bg-zinc-300" />
          <span className={cn("ml-3 rounded-md px-2 py-0.5 font-mono text-[10px] text-white", tone)} style={toneColor ? { background: toneColor } : undefined}>
            {side.label}
          </span>
        </div>
        <div className="relative h-[520px] overflow-hidden">
          <div
            className="transition-transform ease-linear"
            style={{
              transform: playing ? "translateY(calc(-100% + 520px))" : "translateY(0)",
              transitionDuration: playing ? `${Math.round(side.height / 260)}s` : "1.2s",
            }}
          >
            <Image alt={side.label} className="block h-auto w-full" height={side.height} sizes="(min-width: 1024px) 45vw, 100vw" src={side.src} width={1200} />
          </div>
        </div>
      </div>
    </figure>
  );

  return (
    <div>
      <div className="mb-6 flex justify-center">
        <button
          className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-paper text-sm transition-colors hover:bg-signal"
          onClick={() => setPlaying((p) => !p)}
          type="button"
        >
          {playing ? "■ Back to top" : "▶ Scroll both pages"}
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {frame(left, "bg-zinc-500")}
        {frame(right, "", accent)}
      </div>
    </div>
  );
}

/* ───────────── Page switcher ───────────── */

export type PageTab = { id: string; label: string; src: string; width: number; height: number; notes: string[] };

/** Tabs that swap the page shown in a browser frame, with notes beside it. */
export function PageSwitcher({
  pages,
  accent,
  altSuffix = "page, redesigned",
  tall = false,
}: {
  pages: PageTab[];
  /** Tab colour; defaults to the site's violet. */
  accent?: string;
  altSuffix?: string;
  /** A taller window, for long pages worth scrolling through. */
  tall?: boolean;
}) {
  const [id, setId] = useState(pages[0].id);
  const tabId = useId();
  const page = pages.find((p) => p.id === id) ?? pages[0];
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist">
        {pages.map((p) => (
          <button
            aria-selected={p.id === id}
            className={cn(
              "relative rounded-full px-4 py-2 text-sm transition-colors",
              p.id === id ? (accent ? "text-white" : "text-on-signal") : "text-ink hover:bg-paper"
            )}
            key={p.id}
            onClick={() => setId(p.id)}
            role="tab"
            type="button"
          >
            {p.id === id && (
              <motion.span
                className={cn("absolute inset-0 rounded-full", !accent && "bg-signal")}
                layoutId={`page-tab-${tabId}`}
                style={accent ? { background: accent } : undefined}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative">{p.label}</span>
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1.7fr_1fr] lg:items-start">
        <div className="overflow-hidden rounded-xl bg-white shadow-[0_30px_60px_-30px_rgb(0_0_0/0.45)] ring-1 ring-black/10">
          <div className="flex items-center gap-1.5 border-zinc-200 border-b bg-zinc-100 px-3 py-2">
            <span className="size-2.5 rounded-full bg-zinc-300" />
            <span className="size-2.5 rounded-full bg-zinc-300" />
            <span className="size-2.5 rounded-full bg-zinc-300" />
          </div>
          <div className={cn("relative overflow-y-auto overscroll-contain", tall ? "max-h-[min(78vh,880px)]" : "max-h-[640px]")}>
            <AnimatePresence initial={false} mode="wait">
              <motion.div animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} initial={{ opacity: 0, y: 10 }} key={page.id} transition={{ duration: 0.25 }}>
                <Image alt={`${page.label} ${altSuffix}`} className="block h-auto w-full" height={page.height} sizes="(min-width: 1024px) 60vw, 100vw" src={page.src} width={page.width} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.ul animate={{ opacity: 1 }} className="space-y-4" exit={{ opacity: 0 }} initial={{ opacity: 0 }} key={page.id}>
            {page.notes.map((n, i) => (
              <li className="flex gap-4 border-rule border-b pb-4" key={n}>
                <span className="font-mono text-signal text-sm">0{i + 1}</span>
                <span className="leading-relaxed">{n}</span>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  );
}
