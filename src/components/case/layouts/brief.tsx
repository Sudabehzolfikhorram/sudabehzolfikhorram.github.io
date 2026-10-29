// A short page for projects told in a few beats rather than a full case study:
// the turning-point story (Nan va Namak) and work whose full study is still
// being written (Atlas, Access).
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
