"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import type { CaseStudy } from "@/lib/case-studies";
import { Screen } from "./mockups";

/**
 * The user journey as a storyboard. On wide screens the page scroll drives a
 * horizontal track (pinned section); on narrow screens it's a swipeable row.
 */
export function StoryRail({ cs }: { cs: CaseStudy }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = cs.screens.map((s, i) => (
    <div className="w-[260px] shrink-0 snap-center md:w-[300px]" key={s.id}>
      <Screen hue={cs.hue} id={s.id} />
      <div className="mt-6 flex gap-3">
        <span className="font-mono text-signal text-sm">{String(i + 1).padStart(2, "0")}</span>
        <div>
          <p className="font-display text-xl">{s.title}</p>
          <p className="mt-1 text-ink-soft text-sm leading-relaxed">{s.caption}</p>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      {/* Narrow screens: native horizontal swipe. */}
      <div className="flex snap-x snap-mandatory gap-8 overflow-x-auto px-4 pb-6 md:hidden">{steps}</div>

      {/* Wide screens: vertical scroll drives the track. */}
      <div className="relative hidden md:block" ref={sectionRef} style={{ height: `calc(100vh + ${distance}px)` }}>
        <div className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col justify-center overflow-hidden">
          <motion.div className="flex w-max gap-16 px-[max(2rem,calc((100vw-1240px)/2+2rem))]" ref={trackRef} style={{ x }}>
            {steps}
          </motion.div>
          <div className="mx-auto mt-10 h-px w-[min(1176px,calc(100vw-4rem))] bg-rule">
            <motion.div className="h-px bg-signal" style={{ width: progress }} />
          </div>
        </div>
      </div>
    </>
  );
}
