"use client";

import { ArrowDownToLine } from "lucide-react";
import {
  createDrawable,
  createTimeline,
  morphTo,
  splitText,
  stagger,
  type Timeline,
  utils,
} from "animejs";
import { useEffect, useRef } from "react";
import SlideTextButton from "@/components/kokonutui/slide-text-button";
import { site } from "@/lib/content";

/**
 * Signature animation, told in three labelled acts so it reads without a
 * design background:
 *   01 Tangle    – a knotted line draws in and the raw inputs of a project
 *                  (roles, edge cases, legacy flows…) land scattered on it.
 *   02 Structure – the line pulls straight and the inputs line up in order.
 *   03 Clarity   – the ordered inputs fold into one calm, usable screen.
 *
 * Timing marks, in ms. Tweak these to retime the hero.
 */
const T = {
  copy: 0,
  draw: 250, // tangled line draws in (1300ms)
  chips: 700, // inputs drop onto the tangle
  structure: 2100, // line straightens, inputs sort into a grid (1000ms)
  clarity: 4300, // inputs fold into the screen (900ms)
  cta: 600,
};

const TANGLE =
  "M30 150 C 80 20, 150 260, 190 120 S 110 40, 170 70 S 290 270, 280 130 S 190 20, 320 50 S 420 250, 370 180 S 290 110, 410 100 S 520 220, 470 210 S 470 80, 530 140";
const STRAIGHT = "M30 60 C 120 60, 200 60, 280 60 S 440 60, 530 60";

const INPUTS = ["6 user roles", "Edge cases", "Legacy flow", "Stakeholder notes", "Permissions", "Payments"];
const CHIP = { w: 150, h: 34 };
// Final, ordered spot of each input (3 × 2 grid under the straight line).
const gridAt = (i: number): [number, number] => [40 + (i % 3) * 165, 92 + Math.floor(i / 3) * 46];
// Where each input lands on the tangle first: offset and tilt from its grid spot.
const TANGLED: [number, number, number][] = [
  [-10, 110, -14],
  [40, 150, 11],
  [-150, 210, -7],
  [140, 40, 9],
  [-60, 30, -12],
  [-120, 110, 16],
];

const ACTS = ["Tangle", "Structure", "Clarity"];

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<Timeline | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reveal = () => root.removeAttribute("data-pending");
    const $ = <E extends Element>(sel: string) => Array.from(root.querySelectorAll<E>(sel));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // The markup is drawn in its final state: show it and skip the show.
      $<SVGPathElement>("[data-thread]").forEach((l) => l.setAttribute("d", STRAIGHT));
      utils.set($("[data-chip]"), { opacity: 0 });
      utils.set($("[data-act]"), { opacity: 1 });
      reveal();
      return;
    }

    const headline = root.querySelector("h1");
    if (!headline) return;
    const split = splitText(headline, { words: { wrap: "clip" } });
    const [line] = createDrawable($<SVGPathElement>("[data-thread]"));
    const chips = $<SVGGElement>("[data-chip]");
    const screenParts = $<SVGGElement>("[data-screen-part]");
    const acts = $<HTMLElement>("[data-act]");

    // Starting poses: everything is drawn at its final spot and offset back.
    utils.set(split.words, { translateY: "110%" });
    utils.set($("[data-fade]"), { opacity: 0, translateY: 12 });
    utils.set(line, { draw: "0 0" });
    chips.forEach((chip, i) => {
      const [dx, dy, r] = TANGLED[i];
      utils.set(chip, { translateX: dx, translateY: dy, rotate: r, opacity: 0, scale: 0.7 });
    });
    utils.set($("[data-screen]"), { opacity: 0, translateY: 24, scale: 0.96 });
    utils.set(screenParts, { opacity: 0, translateY: 8 });
    utils.set(acts, { opacity: 0.35 });
    utils.set($("[data-caption]"), { opacity: 0 });
    reveal();

    const tl = createTimeline({ defaults: { ease: "outExpo" } })
      .add(split.words, { translateY: "0%", duration: 900, delay: stagger(60) }, T.copy)
      .add($("[data-fade]"), { opacity: 1, translateY: 0, duration: 800, delay: stagger(90) }, T.cta)
      // 01 Tangle
      .add(acts[0], { opacity: 1, duration: 300 }, T.draw)
      .add(line, { draw: "0 1", duration: 1300, ease: "inOutQuad" }, T.draw)
      .add(chips, { opacity: 1, scale: 1, duration: 600, delay: stagger(110), ease: "outBack(1.8)" }, T.chips)
      // 02 Structure
      .add(acts[0], { opacity: 0.35, duration: 300 }, T.structure)
      .add(acts[1], { opacity: 1, duration: 300 }, T.structure)
      // Morph the raw path, not the drawable proxy, which anime can't morph.
      .add($<SVGPathElement>("[data-thread]"), { d: morphTo($<SVGPathElement>("[data-thread-target]")[0]), duration: 1000, ease: "inOutExpo" }, T.structure)
      .add(chips, { translateX: 0, translateY: 0, rotate: 0, duration: 1000, delay: stagger(40), ease: "inOutExpo" }, T.structure)
      // 03 Clarity
      .add(acts[1], { opacity: 0.35, duration: 300 }, T.clarity)
      .add(acts[2], { opacity: 1, duration: 300 }, T.clarity)
      .add(chips, { translateY: 120, scale: 0.6, opacity: 0, duration: 700, delay: stagger(50), ease: "inBack(1.4)" }, T.clarity)
      .add($("[data-screen]"), { opacity: 1, translateY: 0, scale: 1, duration: 900 }, T.clarity + 350)
      .add(screenParts, { opacity: 1, translateY: 0, duration: 600, delay: stagger(80) }, T.clarity + 650)
      .add($("[data-caption]"), { opacity: 1, duration: 600 }, T.clarity + 1100);

    tlRef.current = tl;
    return () => {
      tl.revert();
      split.revert();
      tlRef.current = null;
    };
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Quiet backdrop: a soft violet glow and a faint dot grid that fades out. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-[-10%] size-[640px] rounded-full bg-glow/25 blur-[120px] dark:bg-glow/20" />
        <div className="absolute inset-0 bg-[radial-gradient(var(--rule)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)] opacity-70" />
      </div>

      <div
        className="relative mx-auto grid w-full max-w-[1240px] items-center gap-12 px-4 pt-14 pb-20 data-[pending]:invisible sm:px-8 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-12 lg:gap-8 lg:pt-10"
        data-pending=""
        ref={rootRef}
      >
        <noscript>
          <style>{"[data-pending]{visibility:visible!important}"}</style>
        </noscript>

        <div className="lg:col-span-6">
          <p className="eyebrow flex items-center gap-2.5" data-fade="">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-signal" />
            </span>
            Open to new product roles · Remote
          </p>
          <h1 className="mt-6 font-display text-[clamp(2.4rem,5.2vw,4.25rem)] leading-[1.04]">
            I untangle complex products <em className="text-signal">into clear ones.</em>
          </h1>
          <p className="mt-6 max-w-lg text-ink-soft text-lg leading-relaxed" data-fade="">
            {site.shortName}, product designer for SaaS, fintech and internal tools. I turn dense requirements, roles
            and edge cases into flows people get right the first time, with AI as my design partner.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3" data-fade="">
            <SlideTextButton
              animateIn={false}
              className="rounded-full bg-ink px-7 text-paper hover:bg-ink/90 md:min-w-48 dark:bg-ink dark:text-paper dark:hover:bg-ink/90"
              href="/work"
              hoverText="Tamdid, Kudos, Atlas →"
              text="See the work"
            />
            <a
              className="inline-flex h-10 items-center gap-2 rounded-full border border-ink/15 px-5 font-medium text-sm transition-colors hover:border-signal hover:text-signal"
              download
              href={site.resume}
            >
              <ArrowDownToLine className="size-4" />
              Download CV
            </a>
          </div>
        </div>

        <figure className="relative lg:col-span-6">
          <div className="rounded-[28px] border border-rule bg-paper/70 p-4 shadow-[0_40px_100px_-60px_rgba(40,30,120,0.5)] backdrop-blur-sm sm:p-6">
            <ol className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em]">
              {ACTS.map((act, i) => (
                <li className="flex items-center gap-2" data-act="" key={act}>
                  {i > 0 && <span aria-hidden className="h-px w-5 bg-ink-soft/50 sm:w-8" />}
                  <span className="rounded-full border border-rule bg-paper px-2.5 py-1">
                    <span className="text-signal">0{i + 1}</span> {act}
                  </span>
                </li>
              ))}
            </ol>
            <svg aria-labelledby="hero-fig" className="mt-4 w-full overflow-visible" role="img" viewBox="0 0 560 390">
              <path className="stroke-signal" d={TANGLE} data-thread="" fill="none" strokeLinecap="round" strokeWidth="2.5" />
              {/* Morph target only; never shown. */}
              <path d={STRAIGHT} data-thread-target="" fill="none" stroke="none" />

              {INPUTS.map((label, i) => {
                const [x, y] = gridAt(i);
                return (
                  <g data-chip="" key={label} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
                    <rect className="fill-paper stroke-rule" height={CHIP.h} rx={CHIP.h / 2} width={CHIP.w} x={x} y={y} />
                    <circle className="fill-signal" cx={x + 18} cy={y + CHIP.h / 2} r={4} />
                    <text className="fill-ink text-[13px]" dominantBaseline="central" x={x + 30} y={y + CHIP.h / 2}>
                      {label}
                    </text>
                  </g>
                );
              })}

              {/* The outcome: one calm screen. */}
              <g data-screen="" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
                <rect className="fill-paper stroke-rule" height={270} rx={18} width={400} x={80} y={100} />
                <rect className="fill-paper-2" height={36} rx={18} width={400} x={80} y={100} />
                <rect className="fill-paper-2" height={18} width={400} x={80} y={118} />
                {[0, 1, 2].map((d) => (
                  <circle className="fill-rule" cx={102 + d * 14} cy={118} key={d} r={4} />
                ))}
                <g data-screen-part="">
                  <text className="fill-ink font-semibold text-[15px]" x={104} y={168}>
                    Your subscriptions
                  </text>
                  <text className="fill-ink-soft text-[11px]" x={104} y={186}>
                    3 renew this month · all paid from wallet
                  </text>
                </g>
                {[
                  ["Design tool", "Renews in 3 days"],
                  ["Cloud storage", "Paid · Oct 12"],
                  ["Music", "Paid · Oct 02"],
                ].map(([name, meta], r) => (
                  <g data-screen-part="" key={name}>
                    <rect className="fill-paper-2" height={40} rx={10} width={352} x={104} y={202 + r * 48} />
                    <rect className={r === 0 ? "fill-signal" : "fill-blush"} height={22} rx={7} width={22} x={114} y={211 + r * 48} />
                    <text className="fill-ink text-[12px]" x={146} y={219 + r * 48}>
                      {name}
                    </text>
                    <text className="fill-ink-soft text-[10px]" x={146} y={233 + r * 48}>
                      {meta}
                    </text>
                    <rect className={r === 0 ? "fill-signal" : "fill-rule"} height={20} rx={10} width={58} x={388} y={212 + r * 48} />
                    <text
                      className={r === 0 ? "fill-white text-[10px]" : "fill-ink-soft text-[10px]"}
                      dominantBaseline="central"
                      textAnchor="middle"
                      x={417}
                      y={222 + r * 48}
                    >
                      {r === 0 ? "Review" : "Done"}
                    </text>
                  </g>
                ))}
              </g>
              <text className="fill-ink-soft font-mono text-[11px] uppercase tracking-wider" data-caption="" textAnchor="end" x={530} y={42}>
                6 inputs → 1 clear flow
              </text>
            </svg>
          </div>
          <figcaption className="eyebrow mt-3 flex items-center justify-between px-2" id="hero-fig">
            <span>How I work, in five seconds</span>
            <button className="underline-offset-4 hover:text-signal hover:underline" onClick={() => tlRef.current?.restart()} type="button">
              ↺ Replay
            </button>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
