"use client";

import { BookOpen, Building2, Compass, GraduationCap, Layers, Rocket, Sparkles, Wallet } from "lucide-react";
import { motion, useInView, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { EASE_OUT } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * The career as a story you scroll through. A thread runs down the left: it
 * starts tangled and straightens chapter by chapter, drawing itself as you
 * read. No dates; the order tells it.
 */

const chapters = [
  {
    icon: GraduationCap,
    label: "Two paths, one term",
    body: "The term I started my law degree, I also started my first design job: shaping learning content for an exam-prep school. Law taught me to read dense rules; design taught me to make them easy.",
  },
  {
    icon: Compass,
    label: "Falling for interfaces",
    body: "Layouts turned into screens, and screens into UI and UX. Campaign visuals and client projects followed, and the question shifted from “how does it look?” to “how does it work?”.",
  },
  {
    icon: Rocket,
    label: "A startup of our own",
    body: "With a few friends I set out to launch Nan va Namak: research, product, back end, all of it. Another designer and I took it from idea to execution. It never launched, but it’s where I became a product designer.",
    highlight: true,
  },
  {
    icon: BookOpen,
    label: "Going deliberate",
    body: "Product design courses, and learning from the people who build products. And a new partner: AI, which I think with, explore with and prototype with, while the judgment stays mine.",
    ai: true,
  },
  {
    icon: Layers,
    label: "B2B, for real",
    body: "At Novaday: Kudos, an HR platform, and Remeet, an access system that won at Tehran Design Week. Design systems, UI kits, variables, benchmarks, competitor analysis and usability tests became my daily tools.",
  },
  {
    icon: Wallet,
    label: "Solo, end to end",
    body: "Tamdid: a fintech product for subscriptions, wallet and payments, on mobile and web. One designer, from the first idea to development.",
  },
  {
    icon: Building2,
    label: "Many products at once",
    body: "Three connected products for AzMan, a careful redesign for Studio Kaaryar, and a new face for Novin Host’s fifteen-year-old brand.",
  },
  {
    icon: Sparkles,
    label: "Now: AI that reads a company",
    body: "At Algonet I design Atlas, a platform that analyses a company’s emails, chats and workflows and shows a simpler way to run them. Untangling, at company scale.",
    highlight: true,
  },
];

// A thread that wiggles at the top and settles into a straight line.
const THREAD = (() => {
  const pts: string[] = [];
  for (let y = 0; y <= 1000; y += 8) {
    const amp = Math.max(0, 16 * (1 - y / 620));
    pts.push(`${(20 + amp * Math.sin(y / 18)).toFixed(1)} ${y}`);
  }
  return `M${pts.join(" L")}`;
})();

function Chapter({ c, i }: { c: (typeof chapters)[number]; i: number }) {
  const ref = useRef<HTMLLIElement>(null);
  // Lights up once the chapter reaches the middle of the screen, as the thread does.
  const reached = useInView(ref, { once: true, margin: "0px 0px -45% 0px" });
  const { icon: Icon, label, body } = c;
  return (
    <motion.li
      className="relative grid grid-cols-[2.5rem_1fr] gap-5 pb-14 last:pb-0 sm:gap-8"
      initial={{ opacity: 0, y: 24 }}
      ref={ref}
      transition={{ duration: 0.7, ease: EASE_OUT }}
      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <span
        className={cn(
          "relative z-10 mt-1 grid size-10 place-items-center rounded-full border bg-paper transition-all duration-500",
          reached ? "scale-110 border-signal text-signal" : "border-rule text-ink-soft"
        )}
      >
        <Icon className="size-4" />
      </span>
      <div className={cn("max-w-xl", "highlight" in c && c.highlight && "-mt-2 rounded-3xl border border-rule bg-paper-2/60 p-6")}>
        <p className="font-mono text-signal text-xs uppercase tracking-wider">Chapter {String(i + 1).padStart(2, "0")}</p>
        <h3 className="mt-2 font-display text-2xl sm:text-3xl">{label}</h3>
        <p className="mt-3 text-ink-soft leading-relaxed">{body}</p>
        {"ai" in c && c.ai && (
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-blush px-3 py-1 text-signal text-sm">
            <Sparkles className="size-3.5" /> AI: my thinking partner, not my designer
          </p>
        )}
      </div>
    </motion.li>
  );
}

export function CareerStory() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const draw = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <ol className="relative" ref={ref}>
      <svg aria-hidden className="absolute top-0 left-0 h-full w-10" fill="none" preserveAspectRatio="none" viewBox="0 0 40 1000">
        <path className="stroke-rule" d={THREAD} strokeWidth="2" vectorEffect="non-scaling-stroke" />
        <motion.path className="stroke-signal" d={THREAD} strokeLinecap="round" strokeWidth="2.5" style={{ pathLength: draw }} vectorEffect="non-scaling-stroke" />
      </svg>
      {chapters.map((c, i) => (
        <Chapter c={c} i={i} key={c.label} />
      ))}
    </ol>
  );
}
