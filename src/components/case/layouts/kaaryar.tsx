// Studio Kaaryar: a deliberately simple website redesign, told like a Behance
// case study. Hero composition, the studio and the brief, the process strip,
// lo-fi → mid-fi → final, the visual direction, every final page, mobile, and
// what keeping it simple taught.
import { Compass, LayoutTemplate, Network, Palette, Search } from "lucide-react";
import Image from "next/image";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import type { CaseStudy } from "@/lib/case-studies";
import { cn } from "@/lib/utils";
import { CaseTitle, hueVars, MetaGrid, SectionHead, wrap } from "../blocks";
import { PageSwitcher, type PageTab } from "../novin/interactive";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const img = (name: string) => `${BASE}/work/kaaryar/${name}.webp`;
const ORANGE = "#ff7a00";

const steps = [
  { icon: Search, title: "Benchmark", body: "Three Iranian studios, Websima, Win Studio and Ekas Design, read section by section: how they open, and how they argue why you should choose them." },
  { icon: Network, title: "Structure", body: "Four pages, each with one job: Home sells the idea, Services explains the offer, About builds trust, Contact makes the first step easy." },
  { icon: LayoutTemplate, title: "Wireframes", body: "A grey low-fi pass to agree on order and content, then a mid-fi pass to test hierarchy before any colour." },
  { icon: Palette, title: "Direction", body: "A mood board of real work moments, and a style board built on the studio’s green and orange." },
  { icon: Compass, title: "UI & system", body: "Final pages for desktop and mobile, on a small custom design system so new pages stay consistent." },
];

const fidelity: PageTab[] = [
  {
    id: "lofi",
    label: "Lo-fi",
    src: img("lofi"),
    width: 1280,
    height: 5045,
    notes: ["Grey boxes only: the conversation was about order and content, not looks.", "Every section had to answer one visitor question, or it was cut."],
  },
  {
    id: "midfi",
    label: "Mid-fi",
    src: img("wireframe"),
    width: 1280,
    height: 3483,
    notes: ["Hierarchy and copy length tested before colour.", "The page got shorter: fewer sections, clearer ones."],
  },
  {
    id: "final",
    label: "Final",
    src: img("home"),
    width: 1280,
    height: 3722,
    notes: ["The same structure, now with the studio’s colours, real photography and client logos.", "One call to action, repeated where a visitor is ready for it."],
  },
];

const finalPages: PageTab[] = [
  {
    id: "home",
    label: "Home",
    src: img("home"),
    width: 1280,
    height: 3722,
    notes: [
      "Opens with the promise: here, every idea has a chance to become a product.",
      "Client logos and two clear services before anything else.",
      "The process in three steps: form the team, work in weekly cycles, keep improving.",
      "The people behind the work, then a single invitation to start.",
    ],
  },
  {
    id: "services",
    label: "Services",
    src: img("services"),
    width: 1280,
    height: 5149,
    notes: [
      "Two services, product design and website design, each with a one-line promise.",
      "Sample projects, so the offer is shown, not just told.",
      "The collaboration journey and an FAQ that answers doubts before a call.",
    ],
  },
  {
    id: "about",
    label: "About",
    src: img("about"),
    width: 1280,
    height: 3201,
    notes: [
      "The origin story: from a school for young talent to a studio that ships real products.",
      "A product team without the hiring hassle, reviewed by experienced mentors.",
      "Four values, from guaranteed quality to social impact.",
    ],
  },
  {
    id: "contact",
    label: "Contact",
    src: img("contact"),
    width: 1280,
    height: 1574,
    notes: [
      "“A short message is the start of a professional collaboration.”",
      "Phone, email and address up front, then the same three-step journey and the FAQ.",
    ],
  },
];

export function KaaryarLayout({ cs }: { cs: CaseStudy }) {
  return (
    <div style={hueVars(cs)}>
      {/* Hero: the final site, desktop and mobile, on the studio's green. */}
      <section className="relative overflow-hidden bg-[var(--p)] pt-14 text-white">
        <div aria-hidden className="absolute -top-24 -right-24 size-[420px] rounded-full opacity-90 blur-[100px]" style={{ background: ORANGE }} />
        <Reveal className={cn(wrap, "relative")}>
          <p className="font-mono text-white/70 text-xs uppercase tracking-[0.08em]">{cs.category}</p>
          <CaseTitle className="mt-4 text-white" cs={cs} size="xl" />
          <p className="mt-5 max-w-2xl text-white/85 text-xl leading-snug sm:text-2xl">{cs.tagline}</p>
        </Reveal>
        <div className={cn(wrap, "relative mt-14 grid grid-cols-12 items-end gap-4")}>
          <Reveal className="col-span-12 sm:col-span-9" delay={0.1}>
            <div className="overflow-hidden rounded-t-2xl bg-white shadow-[0_40px_80px_-30px_rgb(0_0_0/0.5)]">
              <div className="flex items-center gap-1.5 border-zinc-200 border-b bg-zinc-100 px-3 py-2">
                {[0, 1, 2].map((d) => (
                  <span className="size-2.5 rounded-full bg-zinc-300" key={d} />
                ))}
                <span className="ml-3 truncate rounded-md bg-white px-2 py-0.5 font-mono text-[10px] text-zinc-500">studio.kaaryar.ir</span>
              </div>
              <div className="relative aspect-[1280/760] overflow-hidden">
                <Image alt="Studio Kaaryar home page, redesigned: hero, client logos and services" className="object-cover object-top" fill priority sizes="(min-width: 1024px) 70vw, 100vw" src={img("home")} />
              </div>
            </div>
          </Reveal>
          <Reveal className="col-span-3 hidden translate-y-8 sm:block" delay={0.2}>
            <div className="overflow-hidden rounded-[1.75rem] border-[6px] border-zinc-900 bg-zinc-900 shadow-2xl">
              <div className="relative aspect-[375/760] overflow-hidden">
                <Image alt="Studio Kaaryar home page on mobile" className="object-cover object-top" fill sizes="20vw" src={img("home-mobile")} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className={wrap}>
        <MetaGrid className="border-rule border-b py-10" cs={cs} />
      </div>

      {/* The studio and the brief. */}
      <section className={cn(wrap, "grid gap-12 py-24 lg:grid-cols-12")}>
        <Reveal className="lg:col-span-6">
          <p className="eyebrow">The studio</p>
          <p className="mt-5 font-display text-2xl leading-snug sm:text-3xl">{cs.context}</p>
          <blockquote className="mt-8 border-[var(--p)] border-l-4 pl-5 text-ink-soft italic">
            “Kaaryar teaches; Kaaryar Studio gives that learning real work to do.”
            <span className="mt-1 block font-mono text-xs not-italic">From the studio’s own copy</span>
          </blockquote>
        </Reveal>
        <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
          <p className="eyebrow">The brief</p>
          <p className="mt-5 text-lg leading-relaxed">
            Explain a new kind of offer to companies: a managed product team, not an agency and not a hire. In four pages.
          </p>
          <p className="mt-4 text-ink-soft leading-relaxed">
            And keep it simple. The client wanted a lean, low-risk redesign with little room for experiments, so every idea had
            to earn its place.
          </p>
        </Reveal>
      </section>

      {/* Process strip. */}
      <section className="border-rule border-y bg-paper-2/50 py-24">
        <div className={wrap}>
          <SectionHead label="Process" n="01" title="Five steps, no detours." />
          <RevealGroup as="ol" className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5" stagger={0.07}>
            {steps.map(({ icon: Icon, title, body }, i) => (
              <RevealItem as="li" className="relative rounded-2xl border border-rule bg-paper p-6" key={title}>
                <span className="grid size-10 place-items-center rounded-xl bg-[color-mix(in_oklab,var(--p)_14%,transparent)] text-[var(--p)] dark:text-[color-mix(in_oklab,var(--p)_40%,white)]">
                  <Icon className="size-5" />
                </span>
                <p className="mt-5 font-mono text-ink-soft text-xs">0{i + 1}</p>
                <h3 className="mt-1 font-semibold text-lg">{title}</h3>
                <p className="mt-2 text-ink-soft text-sm leading-relaxed">{body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Fidelity: the same home page at three stages. */}
      <section className="py-24">
        <div className={wrap}>
          <SectionHead label="From lo-fi to final" n="02" title="The same page, three times." />
          <Reveal className="mt-10">
            <PageSwitcher accent={cs.hue} altSuffix="stage of the Studio Kaaryar home page" pages={fidelity} />
          </Reveal>
        </div>
      </section>

      {/* Visual direction. */}
      <section className="border-rule border-y bg-paper-2/50 py-24">
        <div className={wrap}>
          <SectionHead label="Direction" n="03" title="Real work, in the studio’s colours." />
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <figure>
                <Image alt="Style board: the K logo, primary green, secondary orange and accent slate, an illustration and UI references" className="h-auto w-full rounded-2xl ring-1 ring-rule" height={2196} sizes="(min-width: 1024px) 55vw, 100vw" src={img("direction")} width={2371} />
                <figcaption className="eyebrow mt-3">Style board: logo, palette, illustration and UI tone</figcaption>
              </figure>
            </Reveal>
            <Reveal className="lg:col-span-5" delay={0.1}>
              <figure>
                <Image alt="Mood board of collaboration photography and a reference landing page" className="h-auto w-full rounded-2xl ring-1 ring-rule" height={1572} sizes="(min-width: 1024px) 40vw, 100vw" src={img("moodboard")} width={1800} />
                <figcaption className="eyebrow mt-3">Mood board: people at work, not stock smiles</figcaption>
              </figure>
              <div className="mt-6 flex gap-3">
                {[
                  ["Primary", cs.hue],
                  ["Secondary", ORANGE],
                  ["Accent", "#2f4858"],
                ].map(([name, color]) => (
                  <div className="flex-1 overflow-hidden rounded-xl ring-1 ring-rule" key={name}>
                    <div className="h-14" style={{ background: color }} />
                    <p className="bg-paper px-3 py-2 text-xs">
                      {name}
                      <span className="ml-1 font-mono text-ink-soft uppercase">{color}</span>
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Final pages. */}
      <section className="py-24">
        <div className={wrap}>
          <SectionHead label="The pages" n="04" title="Four pages, one job each." />
          <Reveal className="mt-10">
            <PageSwitcher accent={cs.hue} altSuffix="page of the redesigned Studio Kaaryar site" pages={finalPages} />
          </Reveal>
        </div>
      </section>

      {/* Mobile. */}
      <section className="border-rule border-t bg-[color-mix(in_oklab,var(--p)_8%,var(--paper))] py-24">
        <div className={cn(wrap, "grid items-center gap-12 lg:grid-cols-12")}>
          <Reveal className="lg:col-span-5">
            <SectionHead label="Mobile" n="05" title="Same story, one thumb." />
            <p className="mt-6 text-ink-soft leading-relaxed">
              Every section was designed for 375 pixels too: services stack into cards, the project carousel becomes a swipe, and
              the call to action stays within reach. Scroll the phone to read the whole page.
            </p>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-8" delay={0.1}>
            <div className="mx-auto w-[280px] overflow-hidden rounded-[2rem] border-[6px] border-zinc-900 bg-zinc-900 shadow-2xl">
              <div className="h-[560px] overflow-y-auto overscroll-contain bg-white">
                <Image alt="The full Studio Kaaryar home page on mobile" className="block h-auto w-full" height={3852} sizes="280px" src={img("home-mobile")} width={375} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Reflection. */}
      <section className={cn(wrap, "py-24")}>
        <SectionHead label="What it taught me" n="06" title="Simple, on purpose." />
        <RevealGroup className="mt-12 grid gap-4 md:grid-cols-3" stagger={0.08}>
          {[
            { t: "Constraints are a brief too", b: "With little room to experiment, the work moved to structure and words, where the biggest gains were anyway." },
            { t: "One question per section", b: "Cutting every section that didn’t answer a visitor’s question made the pages shorter and clearer." },
            { t: "Small systems still pay off", b: "Even a four-page site gets tokens and components, so the next page the studio adds stays consistent." },
          ].map((it) => (
            <RevealItem className="rounded-2xl border border-rule p-7" key={it.t}>
              <p className="font-display text-2xl leading-tight">{it.t}</p>
              <p className="mt-3 text-ink-soft leading-relaxed">{it.b}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
    </div>
  );
}
