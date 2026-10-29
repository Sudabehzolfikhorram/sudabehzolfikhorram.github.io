// Studio Kaaryar: a website plus its design system, so the page reads like a
// specimen sheet (foundations, building blocks) and then the pages built from it.
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import type { CaseStudy } from "@/lib/case-studies";
import { cn } from "@/lib/utils";
import { CaseTitle, Facts, Figure, MetaGrid, SectionHead, hueVars, wrap } from "../blocks";

// Illustrative specimen values: swap in the real tokens from the Figma file.
const swatches = [
  { name: "Brand", value: "var(--p)" },
  { name: "Brand soft", value: "color-mix(in oklab, var(--p) 22%, white)" },
  { name: "Ink", value: "#1f1d1c" },
  { name: "Paper", value: "#fbf8f6" },
  { name: "Muted", value: "#71717a" },
];
const typeScale = [
  { name: "Display", size: "text-[44px]", sample: "Design for social impact" },
  { name: "Heading", size: "text-[28px]", sample: "Projects with communities" },
  { name: "Body", size: "text-[17px]", sample: "Clear, readable text with generous line height." },
  { name: "Label", size: "text-[13px]", sample: "EDUCATION · CASE STUDY" },
];
const spacing = [4, 8, 12, 16, 24, 32, 48, 64];

export function SystemLayout({ cs }: { cs: CaseStudy }) {
  return (
    <div style={hueVars(cs)}>
      <section className={cn(wrap, "grid gap-12 pt-12 pb-20 lg:grid-cols-12")}>
        <Reveal className="lg:col-span-6">
          <p className="eyebrow">{cs.category} · {cs.status}</p>
          <CaseTitle className="mt-5" cs={cs} size="xl" />
          <p className="mt-6 font-display text-2xl leading-snug sm:text-3xl">{cs.tagline}</p>
          <p className="mt-6 text-ink-soft leading-relaxed">{cs.summary}</p>
        </Reveal>
        {/* Specimen board: a little of everything the system defines. */}
        <Reveal className="grid min-w-0 grid-cols-6 gap-3 self-center rounded-3xl bg-white p-4 font-sans text-zinc-900 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.35)] ring-1 ring-black/5 lg:col-span-6" delay={0.15}>
          <div className="col-span-2 row-span-2 grid place-items-center rounded-2xl bg-[var(--p)] text-white">
            <span className="font-bold text-[64px] leading-none">Aa</span>
          </div>
          {swatches.slice(1, 5).map((t) => (
            <div className="h-20 rounded-2xl ring-1 ring-zinc-200" key={t.name} style={{ background: t.value }} />
          ))}
          <div className="col-span-4 flex min-w-0 flex-wrap items-center gap-2 rounded-2xl bg-zinc-50 p-4">
            <span className="rounded-lg bg-[var(--p)] px-4 py-2 font-medium text-[13px] text-white">See our work</span>
            <span className="rounded-lg px-4 py-2 text-[13px] ring-1 ring-zinc-300">How we work</span>
          </div>
          <div className="col-span-3 rounded-2xl bg-zinc-50 p-3">
            <div className="h-20 rounded-xl bg-[var(--p)]" />
            <p className="mt-2 font-semibold text-[13px]">Project card</p>
            <p className="text-[11px] text-zinc-500">Education · Case study</p>
          </div>
          <div className="col-span-3 flex flex-col justify-between rounded-2xl bg-zinc-900 p-4 text-white">
            <span className="w-fit rounded-full bg-white/15 px-2.5 py-1 text-[11px]">Design for social impact</span>
            <p className="font-bold text-[22px] leading-tight">Stories from the field</p>
          </div>
        </Reveal>
      </section>

      <div className={wrap}><MetaGrid className="border-rule border-t pt-8 pb-20" cs={cs} /></div>

      <section className="bg-ink py-24 text-paper">
        <div className={cn(wrap, "grid gap-12 lg:grid-cols-12")}>
          <Reveal className="lg:col-span-4">
            <p className="eyebrow !text-paper/60"><span className="text-signal">01</span> — The brief</p>
            <p className="mt-6 font-display text-5xl leading-none">Full site.</p>
          </Reveal>
          <Reveal className="self-end lg:col-span-7 lg:col-start-6" delay={0.1}>
            <p className="font-display text-2xl leading-snug sm:text-3xl">{cs.context}</p>
          </Reveal>
        </div>
      </section>

      <section className={cn(wrap, "py-24")}>
        <SectionHead label="What changed" n="02" title="Four things the redesign set out to fix." />
        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-xl border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {cs.highlights.map((h, i) => (
            <RevealItem className="bg-paper p-7" key={h.title}>
              <span className="font-mono text-signal text-sm">0{i + 1}</span>
              <p className="mt-8 font-display text-2xl leading-tight">{h.title}</p>
              <p className="mt-3 text-ink-soft text-sm leading-relaxed">{h.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className="border-rule border-t bg-paper-2/60 py-24">
        <div className={wrap}>
          <SectionHead label="Design system" n="03" title="Foundations built for the site.">
            <p>A custom system of tokens and components so every new page stays consistent. Values below are an illustrative specimen.</p>
          </SectionHead>
          <RevealGroup className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {swatches.map((t) => (
              <RevealItem key={t.name}>
                <div className="aspect-[4/3] rounded-xl ring-1 ring-rule" style={{ background: t.value }} />
                <p className="mt-3 font-mono text-[0.78rem]">{t.name}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <div className="mt-16 grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="eyebrow mb-4">Type scale</p>
              <div className="divide-y divide-rule border-rule border-y">
                {typeScale.map((t) => (
                  <Reveal className="grid items-baseline gap-2 py-5 sm:grid-cols-[120px_1fr]" key={t.name}>
                    <p className="font-medium text-sm">{t.name}</p>
                    <p className={cn("font-sans font-semibold leading-tight", t.size)}>{t.sample}</p>
                  </Reveal>
                ))}
              </div>
            </div>
            <div className="lg:col-span-4">
              <p className="eyebrow mb-4">Spacing · 4pt grid</p>
              <div className="space-y-3">
                {spacing.map((s) => (
                  <div className="flex items-center gap-4" key={s}>
                    <span className="w-8 font-mono text-[0.72rem] text-ink-soft">{s}</span>
                    <span className="h-3 rounded-sm bg-[var(--p)]" style={{ width: s * 3 }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={cn(wrap, "py-24")}>
        <SectionHead label="Pages" n="04" title="One structure, every screen size." />
        <div className="mt-14 grid items-end gap-10 lg:grid-cols-12">
          <Figure className="lg:col-span-12" cs={cs} id="kaaryar-home" />
          <Figure className="lg:col-span-8" cs={cs} id="kaaryar-projects" />
          <Figure className="lg:col-span-4" cs={cs} id="kaaryar-mobile" />
        </div>
      </section>

      <section className="border-rule border-t py-24">
        <div className={wrap}>
          <SectionHead label="Where it stands" n="05" title="Designed, now in development." />
          <Facts className="mt-12" cs={cs} />
        </div>
      </section>
    </div>
  );
}
