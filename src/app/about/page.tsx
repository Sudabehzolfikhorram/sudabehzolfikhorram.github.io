import { ArrowDownToLine, BrainCircuit, Megaphone, PenTool, Shapes, Signpost } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CtaBand } from "@/components/site/cta-band";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "About · Sudabeh",
  description:
    "Sudabeh Zolfi Khorram: product designer in Tehran, open to remote. A law graduate who designs B2B, fintech and operational products, with AI as a design partner.",
};

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// The short story, from the resume.
const story = [
  {
    when: "2021",
    title: "Law by day, design by habit",
    body: "I started a law degree and, in the same year, my first design job: structuring educational content at Alla Online School.",
  },
  {
    when: "2024",
    title: "From screens to products",
    body: "UI and visual work for clients, then Nan va Namak, a startup of our own that never launched. It showed me I wanted to own whole products, not just their screens.",
  },
  {
    when: "2024 – 25",
    title: "B2B, for real",
    body: "At Novaday I designed Kudos and Remeet on a shared Tailwind-based design system, and learned to document flows and page logic for engineers.",
  },
  {
    when: "2025 – now",
    title: "Complex products, clear systems",
    body: "Fintech at Tamdid, three products for AzMan, Studio Kaaryar’s redesign, Novin Host, and now dashboards and a design system at Algonet.",
  },
];

// Work outside product design, done out of curiosity.
const beyond = [
  { icon: Shapes, title: "Visual identity", body: "Brand systems: colour, type and the rules that hold them together." },
  { icon: PenTool, title: "Logo design", body: "Marks that have to work at 16 pixels and on a building." },
  { icon: Signpost, title: "Environmental graphics", body: "Signage and graphics for physical spaces, where wayfinding is UX you can walk through." },
  { icon: Megaphone, title: "Campaign visuals", body: "Marketing packages and social content for B2B and B2C brands at Jaygah." },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-12 overflow-x-clip px-4 pt-16 pb-20 sm:px-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <p className="eyebrow">About</p>
          <h1 className="mt-4 font-display text-[clamp(2.4rem,5vw,4rem)] leading-[1.02]">
            Hi, I’m Sudabeh. <em className="text-signal">I make complicated things feel simple.</em>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed">
            I’m a product designer in Tehran, open to remote work. For more than four years I’ve designed B2B and B2C
            products, fintech, operational tools and complex systems, from the first flow to developer handoff.
          </p>
          <p className="mt-4 max-w-lg text-ink-soft leading-relaxed">
            I hold a Bachelor of Law. It turns out reading dense rules and making them fair and clear is good training
            for designing permissions, payments and ERPs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-5 font-medium text-paper text-sm transition-colors hover:bg-signal hover:text-white"
              download
              href={site.resume}
            >
              <ArrowDownToLine className="size-4" />
              Download CV
            </a>
            <Link
              className="inline-flex h-10 items-center rounded-full border border-ink/15 px-5 font-medium text-sm transition-colors hover:border-signal hover:text-signal"
              href="/contact"
            >
              Say hello →
            </Link>
          </div>
        </Reveal>

        <Reveal className="relative lg:col-span-5 lg:col-start-8" delay={0.15}>
          <div aria-hidden className="absolute -inset-6 -z-10 rounded-[40px] bg-glow/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-[32px] border border-rule">
            <Image
              alt="Sudabeh Zolfi Khorram, smiling, sitting at a desk"
              className="h-auto w-full grayscale"
              height={596}
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              src={`${BASE}/about/sudabeh.webp`}
              width={688}
            />
          </div>
          <div className="absolute -bottom-5 left-5 rounded-2xl border border-rule bg-paper px-4 py-3 shadow-lg sm:left-8">
            <p className="font-mono text-[11px] text-ink-soft uppercase tracking-wider">Now</p>
            <p className="font-medium text-sm">Product Designer at Algonet</p>
          </div>
        </Reveal>
      </section>

      <section className="border-rule border-y bg-paper-2/40">
        <div className="mx-auto max-w-[1240px] px-4 py-24 sm:px-8">
          <Reveal>
            <p className="eyebrow">The short story</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05]">
              How I got <em className="text-signal">here.</em>
            </h2>
          </Reveal>
          <RevealGroup as="ol" className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {story.map((s) => (
              <RevealItem as="li" className="border-signal border-t-2 pt-5" key={s.when}>
                <p className="font-mono text-signal text-sm">{s.when}</p>
                <h3 className="mt-2 font-semibold text-xl">{s.title}</h3>
                <p className="mt-3 text-ink-soft leading-relaxed">{s.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1240px] gap-10 px-4 py-24 sm:px-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <span className="grid size-12 place-items-center rounded-2xl bg-blush text-signal">
            <BrainCircuit className="size-6" />
          </span>
          <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05]">
            AI is my design partner, <em className="text-signal">not my designer.</em>
          </h2>
        </Reveal>
        <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
          <p className="text-lg leading-relaxed">
            I use ChatGPT, Claude and Google AI Studio to research faster, compare directions and draft UX copy, NotebookLM
            to digest long documents, and Lovable to turn ideas into clickable prototypes in hours.
          </p>
          <p className="mt-4 text-ink-soft leading-relaxed">
            That speed buys time for the part that matters: deciding what the product should do and why. The judgment
            stays mine.
          </p>
        </Reveal>
      </section>

      <section className="border-rule border-t">
        <div className="mx-auto max-w-[1240px] px-4 py-24 sm:px-8">
          <Reveal className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="eyebrow">Beyond product design</p>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05]">
                Curious by default, <em className="text-signal">product designer by choice.</em>
              </h2>
            </div>
            <p className="max-w-md self-end text-ink-soft lg:col-span-5 lg:col-start-8">
              I keep looking for new kinds of work to learn from. These side paths sharpen my eye; product design, with
              an AI partner, is still where I do my best work.
            </p>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
            {beyond.map(({ icon: Icon, title, body }) => (
              <RevealItem className="group bg-paper p-7 transition-colors duration-300 hover:bg-paper-2" key={title}>
                <Icon className="size-6 text-signal transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" />
                <h3 className="mt-6 font-semibold text-lg">{title}</h3>
                <p className="mt-2 text-ink-soft text-sm leading-relaxed">{body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
