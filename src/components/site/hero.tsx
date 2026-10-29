"use client";

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
import TopoBackground from "@/components/kokonutui/topo-background";
import { process, site } from "@/lib/content";

/**
 * Signature animation: a tangled line (the brief as it arrives) draws itself,
 * then pulls straight into a clean line while the six process steps snap into
 * order along it. Complexity → clarity, the whole pitch in three seconds.
 *
 * Timing marks, in ms from page load. Tweak these to retime the hero.
 */
const T = {
  eyebrow: 0,
  headline: 120, // letters rise, 22ms apart
  draw: 300, // tangled line draws in (1400ms)
  nodes: 1150, // process nodes pop onto the tangle
  intro: 1500,
  straighten: 2050, // line morphs straight, nodes slide into order (1100ms)
  labels: 2900,
  cta: 3150, // buttons pop in last
};

const TANGLE =
  "M40 150 C 90 30, 160 270, 200 140 S 120 60, 170 90 S 300 290, 290 150 S 200 30, 330 60 S 420 270, 380 200 S 300 120, 420 110 S 520 230, 470 220 S 470 90, 520 150";
const STRAIGHT = "M40 150 C 120 150, 200 150, 280 150 S 440 150, 520 150";

// Where each step sits on the tangle before it snaps into line.
const TANGLED_AT: [number, number][] = [
  [200, 140],
  [170, 90],
  [290, 150],
  [330, 60],
  [380, 200],
  [470, 220],
];
const stepX = (i: number) => 40 + i * 96;

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<Timeline | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reveal = () => root.removeAttribute("data-pending");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Final state is the static markup: show it and skip the show.
      const line = root.querySelector<SVGPathElement>("[data-hero-line]");
      line?.setAttribute("d", STRAIGHT);
      reveal();
      return;
    }

    const $ = <E extends Element>(sel: string) => Array.from(root.querySelectorAll<E>(sel));
    const headline = root.querySelector("h1");
    if (!headline) return;

    const split = splitText(headline, { chars: { wrap: "clip" } });
    const [line] = createDrawable($<SVGPathElement>("[data-hero-line]"));
    const [ghost] = createDrawable($<SVGPathElement>("[data-hero-ghost]"));
    const nodes = $<SVGGElement>("[data-hero-node]");
    const labels = $<SVGGElement>("[data-hero-label]");

    // Starting poses. Nodes are drawn at their final spot and offset back
    // onto the tangle, so straightening is a pure transform.
    utils.set(split.chars, { translateY: "105%" });
    utils.set($("[data-eyebrow]"), { opacity: 0, translateY: 8 });
    utils.set($("[data-intro]"), { opacity: 0, translateY: 14 });
    utils.set([line, ghost], { draw: "0 0" });
    nodes.forEach((node, i) => {
      const [x, y] = TANGLED_AT[i];
      utils.set(node, { translateX: x - stepX(i), translateY: y - 150, scale: 0 });
    });
    utils.set(labels, { opacity: 0, translateY: 6 });
    utils.set($("[data-cta]"), { opacity: 0, scale: 0.86, translateY: 10 });
    reveal();

    const tl = createTimeline({ defaults: { ease: "outExpo" } })
      .add($("[data-eyebrow]"), { opacity: 1, translateY: 0, duration: 600 }, T.eyebrow)
      .add(split.chars, { translateY: "0%", duration: 900, delay: stagger(22) }, T.headline)
      .add([ghost, line], { draw: "0 1", duration: 1400, ease: "inOutQuad" }, T.draw)
      .add(nodes, { scale: 1, duration: 520, delay: stagger(70), ease: "outBack(2)" }, T.nodes)
      .add($("[data-intro]"), { opacity: 1, translateY: 0, duration: 800 }, T.intro)
      .add($("[data-hero-line]"), { d: morphTo($("[data-hero-straight]")[0]), duration: 1100, ease: "inOutExpo" }, T.straighten)
      .add(nodes, { translateX: 0, translateY: 0, duration: 1100, ease: "inOutExpo" }, T.straighten)
      .add($("[data-hero-ghost]"), { opacity: 0.28, duration: 900, ease: "outQuad" }, T.straighten + 100)
      .add(labels, { opacity: 1, translateY: 0, duration: 500, delay: stagger(60) }, T.labels)
      .add($("[data-cta]"), { opacity: 1, scale: 1, translateY: 0, duration: 650, delay: stagger(90), ease: "outBack(1.6)" }, T.cta);

    tlRef.current = tl;
    return () => {
      tl.revert();
      split.revert();
      tlRef.current = null;
    };
  }, []);

  const contactHref = "/contact";

  return (
    <TopoBackground
      className="min-h-[calc(100svh-4rem)] items-stretch bg-transparent text-signal dark:bg-transparent dark:text-signal"
      labels={false}
      seed={7}
      speed={0.35}
    >
      <div
        className="relative mx-auto grid w-full max-w-[1240px] items-end gap-12 lg:items-center px-4 pt-16 pb-14 text-ink data-[pending]:invisible sm:px-8 lg:grid-cols-12 lg:pt-24"
        data-pending=""
        ref={rootRef}
      >
        <noscript>
          <style>{"[data-pending]{visibility:visible!important}"}</style>
        </noscript>

        <div className="lg:col-span-7">
          <p className="eyebrow flex items-center gap-3" data-eyebrow="">
            <span className="inline-block size-1.5 rounded-full bg-signal" />
            Product designer · SaaS, dashboards &amp; internal tools
          </p>
          <h1 className="mt-6 font-display text-[clamp(3rem,8vw,7.25rem)] leading-[0.98] tracking-[-0.02em]">
            Designing products
            <br />
            with <em className="text-signal">clarity.</em>
          </h1>
          <p className="mt-8 max-w-md text-ink-soft text-lg leading-relaxed" data-intro="">
            {site.intro}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span className="inline-flex" data-cta="">
              <SlideTextButton
                animateIn={false}
                className="rounded-full bg-ink px-7 text-paper hover:bg-ink/90 md:min-w-48 dark:bg-ink dark:text-paper dark:hover:bg-ink/90"
                href="/work"
                hoverText="Six case studies →"
                text="View projects"
              />
            </span>
            <span className="inline-flex" data-cta="">
              <SlideTextButton
                animateIn={false}
                className="rounded-full border-ink/20 px-7 text-ink md:min-w-40"
                href={contactHref}
                hoverText="Start a project"
                text="Let’s talk"
                variant="ghost"
              />
            </span>
          </div>
        </div>

        <figure className="lg:col-span-5 lg:-mr-6">
          <svg
            aria-labelledby="hero-fig"
            className="w-full overflow-visible"
            role="img"
            viewBox="0 0 560 300"
          >
            <path className="stroke-ink-soft" d={TANGLE} data-hero-ghost="" fill="none" strokeWidth="1.25" />
            <path className="stroke-ink" d={TANGLE} data-hero-line="" fill="none" strokeLinecap="round" strokeWidth="2" />
            {/* Morph target only; never shown. */}
            <path d={STRAIGHT} data-hero-straight="" fill="none" stroke="none" />
            {process.map((step, i) => (
              <g key={step.short}>
                <g data-hero-node="" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
                  <circle
                    className={i === process.length - 1 ? "fill-signal stroke-signal" : "fill-paper stroke-ink"}
                    cx={stepX(i)}
                    cy={150}
                    r={8}
                    strokeWidth="2"
                  />
                </g>
                <g className="font-mono" data-hero-label="">
                  <text className="fill-ink-soft text-[12px]" textAnchor="middle" x={stepX(i)} y={122}>
                    {String(i + 1).padStart(2, "0")}
                  </text>
                  <text className="fill-ink text-[13px] uppercase tracking-wider" textAnchor="middle" x={stepX(i)} y={184}>
                    {step.short}
                  </text>
                </g>
              </g>
            ))}
          </svg>
          <figcaption className="eyebrow mt-4 flex items-center justify-between" id="hero-fig">
            <span>Fig. 1 — Every project, before and after</span>
            <button
              className="underline-offset-4 hover:text-signal hover:underline"
              onClick={() => tlRef.current?.restart()}
              type="button"
            >
              ↺ Replay
            </button>
          </figcaption>
        </figure>
      </div>
    </TopoBackground>
  );
}
