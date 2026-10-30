// A short page for projects told in a few beats rather than a full case study:
// the turning-point story (Nan va Namak) and work whose full study is still
// being written (Atlas, Access).
import { Lock } from "lucide-react";
import Image from "next/image";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import type { CaseStudy } from "@/lib/case-studies";
import { cn } from "@/lib/utils";
import { CaseTitle, MetaGrid, hueVars, periodLabel, wrap } from "../blocks";

export function BriefLayout({ cs }: { cs: CaseStudy }) {
  const image = cs.thumbnail ?? (typeof cs.cover === "object" ? cs.cover : null);
  return (
    <div style={hueVars(cs)}>
      <section className={cn(wrap, "grid gap-10 pt-12 pb-14 lg:grid-cols-12")}>
        <Reveal className="lg:col-span-7">
          <p className="eyebrow">
            {[cs.category, periodLabel(cs)].filter(Boolean).join(" · ")}
          </p>
          {cs.badge && (
            <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-[color-mix(in_oklab,var(--p)_14%,transparent)] px-3 py-1 font-medium text-[var(--p)] text-sm dark:text-[color-mix(in_oklab,var(--p)_45%,white)]">
              ★ {cs.badge}
            </span>
          )}
          <CaseTitle className="mt-4" cs={cs} />
          <p className="mt-5 text-2xl leading-snug">{cs.tagline}</p>
        </Reveal>
        <Reveal className="self-end text-ink-soft leading-relaxed lg:col-span-5" delay={0.1}>
          <p>{cs.summary}</p>
          {cs.links && cs.links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {cs.links.map((l) => (
                <a
                  className="rounded-full border border-ink/15 px-4 py-1.5 text-ink text-sm transition-colors hover:border-signal hover:text-signal"
                  href={l.href}
                  key={l.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          )}
        </Reveal>
      </section>

      {image && (
        <Reveal className={wrap}>
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl ring-1 ring-rule">
            <Image alt={image.alt} className="object-cover" fill priority sizes="100vw" src={image.image} />
          </div>
        </Reveal>
      )}

      {cs.confidential && <ConfidentialPeek />}

      <div className={wrap}>
        <MetaGrid className="border-rule border-b py-10" cs={cs} />
      </div>

      {cs.story && cs.story.length > 0 && (
        <section className={cn(wrap, "py-20")}>
          <RevealGroup as="ol" className="relative grid gap-10 md:grid-cols-3" stagger={0.1}>
            {cs.story.map((beat, i) => (
              <RevealItem as="li" className="relative border-[var(--p)] border-t-2 pt-6" key={beat.title}>
                <span className="font-mono text-[var(--p)] text-sm dark:text-[color-mix(in_oklab,var(--p)_45%,white)]">0{i + 1}</span>
                <h2 className="mt-2 font-display text-2xl">{beat.title}</h2>
                <p className="mt-3 text-ink-soft leading-relaxed">{beat.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          {cs.comingSoon && (
            <Reveal className="mt-14 rounded-2xl border border-rule border-dashed p-6 text-ink-soft">
              The full case study, with process and final screens, is on its way.
            </Reveal>
          )}
        </section>
      )}
    </div>
  );
}

/**
 * For work still in development: the idea as a clear diagram (the current
 * path against the shorter one the AI suggests), over a deliberately blurred
 * product screen.
 */
function ConfidentialPeek() {
  const steps = ["Request", "Manager OK", "Finance OK", "Purchase"];
  return (
    <section className={cn(wrap, "pt-16")}>
      <Reveal className="relative overflow-hidden rounded-3xl border border-rule bg-paper-2/60">
        {/* The product, blurred on purpose. */}
        <div aria-hidden className="pointer-events-none grid select-none grid-cols-12 gap-3 p-6 opacity-70 blur-[7px] sm:p-10">
          <div className="col-span-3 hidden h-72 rounded-2xl bg-paper sm:block" />
          <div className="col-span-12 grid gap-3 sm:col-span-9">
            <div className="h-10 rounded-xl bg-paper" />
            <div className="grid grid-cols-3 gap-3">
              {[0, 1, 2].map((i) => (
                <div className="h-20 rounded-xl bg-[color-mix(in_oklab,var(--p)_25%,var(--paper))]" key={i} />
              ))}
            </div>
            <div className="h-40 rounded-xl bg-paper" />
          </div>
        </div>
        <div className="absolute inset-0 grid place-items-center p-4">
          <div className="w-full max-w-2xl rounded-3xl border border-rule bg-paper/95 p-6 shadow-xl backdrop-blur sm:p-8">
            <p className="flex items-center gap-2 font-mono text-ink-soft text-xs uppercase tracking-wider">
              <Lock className="size-3.5" /> In development · screens blurred on purpose
            </p>
            <p className="mt-5 font-medium text-sm">Today</p>
            <ol className="mt-2 flex flex-wrap items-center gap-2 text-sm">
              {steps.map((s, i) => (
                <li className="flex items-center gap-2" key={s}>
                  {i > 0 && <span aria-hidden className="text-ink-soft">→</span>}
                  <span className="rounded-full border border-rule px-3 py-1">{s}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 font-medium text-[var(--p)] text-sm dark:text-[color-mix(in_oklab,var(--p)_45%,white)]">What Atlas suggests</p>
            <ol className="mt-2 flex flex-wrap items-center gap-2 text-sm">
              {[steps[0], "Auto-approved under budget", steps[3]].map((s, i) => (
                <li className="flex items-center gap-2" key={s}>
                  {i > 0 && <span aria-hidden className="text-[var(--p)]">→</span>}
                  <span className="rounded-full bg-[var(--p)] px-3 py-1 text-white">{s}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-ink-soft text-xs">An illustrative example of the idea, not real company data.</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
