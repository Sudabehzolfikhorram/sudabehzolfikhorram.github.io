// Atlas: work still in development. The story is told in full; the screens
// stay blurred, with a lens that lets a visitor peek at a small circle at a time.
import { Lock } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import type { CaseStudy } from "@/lib/case-studies";
import { cn } from "@/lib/utils";
import { CaseTitle, MetaGrid, hueVars, periodLabel, wrap } from "../blocks";
import { PeekLens } from "../peek-lens";

const tint = "text-[var(--p)] dark:text-[color-mix(in_oklab,var(--p)_45%,white)]";

/** A stand-in for the product while the real screens are on their way: illustrative, no real data. */
function AtlasIllustration() {
  const nav = ["Overview", "Processes", "Insights", "Suggestions", "Teams", "Settings"];
  const nodes: [number, number, string, boolean][] = [
    [70, 70, "Request", true],
    [230, 190, "Manager", false],
    [390, 70, "Finance", false],
    [540, 190, "Purchase", true],
  ];
  return (
    <div className="grid size-full grid-cols-[20%_1fr] bg-paper-2 text-[10px] sm:text-xs">
      <div className="space-y-1.5 border-rule border-r bg-paper p-3 sm:p-4">
        <p className="mb-4 flex items-center gap-2 font-semibold text-sm">
          <span className="size-4 rounded-md bg-[var(--p)]" /> Atlas
        </p>
        {nav.map((n, i) => (
          <p className={cn("rounded-md px-2 py-1.5", i === 1 ? "bg-[color-mix(in_oklab,var(--p)_16%,var(--paper))] font-medium" : "text-ink-soft")} key={n}>
            {n}
          </p>
        ))}
      </div>
      <div className="grid min-w-0 grid-rows-[auto_auto_1fr] gap-3 p-3 sm:gap-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="font-semibold text-sm sm:text-base">Processes</p>
          <span className="w-1/3 rounded-full border border-rule bg-paper px-3 py-1 text-ink-soft">Search processes…</span>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {[
            ["Processes mapped", "w-3/5", "bg-[var(--p)]"],
            ["Extra steps found", "w-2/5", "bg-sky"],
            ["Average wait", "w-1/2", "bg-sky"],
          ].map(([t, w, c]) => (
            <div className="rounded-xl border border-rule bg-paper p-2.5 sm:p-3" key={t}>
              <p className="text-ink-soft">{t}</p>
              <div className="mt-2 h-1.5 rounded-full bg-paper-2">
                <div className={cn("h-full rounded-full", w, c)} />
              </div>
            </div>
          ))}
        </div>
        <div className="grid min-h-0 grid-cols-[1.6fr_1fr] gap-2 sm:gap-3">
          <div className="relative overflow-hidden rounded-xl border border-rule bg-paper">
            <p className="absolute top-2.5 left-3 font-medium">Purchase request · as it runs today</p>
            <svg className="absolute inset-x-0 bottom-0 h-[78%] w-full" fill="none" preserveAspectRatio="none" viewBox="0 0 610 260">
              <path className="stroke-rule" d="M70 70 C 150 70, 150 190, 230 190 S 310 70, 390 70 S 470 190, 540 190" strokeDasharray="5 6" strokeWidth="2" />
              <path d="M70 70 C 230 70, 380 190, 540 190" stroke="var(--p)" strokeLinecap="round" strokeWidth="3" />
              {nodes.map(([x, y, , keep]) => (
                <circle className={keep ? "fill-paper" : "fill-paper stroke-rule"} cx={x} cy={y} key={x} r="13" stroke={keep ? "var(--p)" : undefined} strokeWidth="3" />
              ))}
            </svg>
            {nodes.map(([x, y, label]) => (
              <span
                className="absolute -translate-x-1/2 rounded bg-paper px-1 text-ink-soft"
                key={label}
                style={{ left: `${(x / 610) * 100}%`, top: `calc(22% + ${(y / 260) * 78}% + 14px)` }}
              >
                {label}
              </span>
            ))}
          </div>
          <div className="space-y-2 overflow-hidden rounded-xl border border-rule bg-paper p-2.5 sm:p-3">
            <p className="font-medium">Suggestions</p>
            {["Auto-approve under budget", "Merge two finance checks", "Notify instead of waiting"].map((t, i) => (
              <div className="rounded-lg border border-rule p-2" key={t}>
                <p>{t}</p>
                <span className={cn("mt-1 inline-block rounded-full px-1.5 py-0.5 text-[9px]", i === 0 ? "bg-sky-soft text-sky" : "bg-paper-2 text-ink-soft")}>
                  {i === 0 ? "−1 step" : "Review"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AtlasLayout({ cs }: { cs: CaseStudy }) {
  const steps = ["Request", "Manager OK", "Finance OK", "Purchase"];
  return (
    <div style={hueVars(cs)}>
      <section className={cn(wrap, "grid gap-10 pt-12 pb-16 lg:grid-cols-12")}>
        <Reveal className="lg:col-span-7">
          <p className="eyebrow">{[cs.category, periodLabel(cs)].filter(Boolean).join(" · ")}</p>
          <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-rule px-3 py-1 text-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-signal" />
            </span>
            {cs.status}
          </span>
          <CaseTitle className="mt-4" cs={cs} />
          <p className="mt-5 text-2xl leading-snug">{cs.tagline}</p>
        </Reveal>
        <Reveal className="self-end text-ink-soft leading-relaxed lg:col-span-5" delay={0.1}>
          <p>{cs.summary}</p>
          <p className="mt-4">{cs.context}</p>
        </Reveal>
      </section>

      {/* The sprint, in three numbers. */}
      <section className={wrap}>
        <RevealGroup className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-rule bg-rule sm:grid-cols-3" stagger={0.08}>
          {cs.facts.map((f) => (
            <RevealItem className="bg-paper p-6 sm:p-8" key={f.label}>
              <p className={cn("font-display text-4xl sm:text-5xl", tint)}>{f.value}</p>
              <p className="mt-3 text-ink-soft text-sm">{f.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className={cn(wrap, "pt-24")}>
        <Reveal className="mb-8 grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow flex items-center gap-2">
              <Lock className="size-3.5" /> In development
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05]">
              Not ready for the spotlight. <em className="text-signal">A small peek is fine.</em>
            </h2>
          </div>
          <p className="max-w-md self-end text-ink-soft lg:col-span-4 lg:col-start-9">
            Atlas is live for the teams using it, behind a login. Here it stays out of focus: bring the lens over it to see a little.
          </p>
        </Reveal>
        <Reveal className="mx-auto max-w-[1080px]">
          <PeekLens fallback={<AtlasIllustration />} shots={cs.peek ?? [{ label: "Home" }]} />
        </Reveal>
      </section>

      {cs.story && (
        <section className={cn(wrap, "py-24")}>
          <Reveal className="mb-10">
            <p className="eyebrow">What Atlas does</p>
          </Reveal>
          <RevealGroup as="ol" className="grid gap-10 md:grid-cols-3" stagger={0.1}>
            {cs.story.map((beat, i) => (
              <RevealItem as="li" className="border-[var(--p)] border-t-2 pt-6" key={beat.title}>
                <span className={cn("font-mono text-sm", tint)}>0{i + 1}</span>
                <h3 className="mt-2 font-display text-2xl">{beat.title}</h3>
                <p className="mt-3 text-ink-soft leading-relaxed">{beat.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          {/* The idea in one example. */}
          <Reveal className="mt-16 rounded-3xl border border-rule bg-paper-2/50 p-6 sm:p-8">
            <p className="font-medium text-sm">Today</p>
            <ol className="mt-2 flex flex-wrap items-center gap-2 text-sm">
              {steps.map((s, i) => (
                <li className="flex items-center gap-2" key={s}>
                  {i > 0 && <span aria-hidden className="text-ink-soft">→</span>}
                  <span className="rounded-full border border-rule px-3 py-1">{s}</span>
                </li>
              ))}
            </ol>
            <p className={cn("mt-6 font-medium text-sm", tint)}>What Atlas suggests</p>
            <ol className="mt-2 flex flex-wrap items-center gap-2 text-sm">
              {[steps[0], "Auto-approved under budget", steps[3]].map((s, i) => (
                <li className="flex items-center gap-2" key={s}>
                  {i > 0 && <span aria-hidden className={tint}>→</span>}
                  <span className="rounded-full bg-[var(--p)] px-3 py-1 text-white">{s}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-ink-soft text-xs">An illustrative example of the idea, not real company data.</p>
          </Reveal>
        </section>
      )}

      {/* How it shipped: the deadline, AI in the loop, and the team. */}
      <section className="border-rule border-y bg-paper-2/40">
        <div className={cn(wrap, "grid gap-10 py-24 lg:grid-cols-12")}>
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">How it shipped</p>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05]">
              Days, <em className="text-signal">not months.</em>
            </h2>
          </Reveal>
          <RevealGroup as="ol" className="grid gap-8 lg:col-span-7 lg:col-start-6" stagger={0.1}>
            {cs.highlights.map((h, i) => (
              <RevealItem as="li" className="grid grid-cols-[2.5rem_1fr] gap-4" key={h.title}>
                <span className="grid size-10 place-items-center rounded-full border border-rule font-mono text-sm">{i + 1}</span>
                <div>
                  <h3 className="font-semibold text-lg">{h.title}</h3>
                  <p className="mt-1 text-ink-soft leading-relaxed">{h.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <div className={wrap}>
        <MetaGrid className="py-10" cs={cs} />
      </div>
    </div>
  );
}
