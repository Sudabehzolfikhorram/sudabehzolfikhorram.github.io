// Novaday: two products on one design system, so the page is a pair of
// product chapters framed by a dark, fact-led opening.
import { Reveal } from "@/components/motion/reveal";
import type { CaseStudy } from "@/lib/case-studies";
import { cn } from "@/lib/utils";
import { CaseTitle, Facts, Figure, MetaGrid, Numbered, SectionHead, periodLabel, wrap } from "../blocks";
import { Screen, type ScreenId } from "../mockups";

export function DuoLayout({ cs }: { cs: CaseStudy }) {
  return (
    <>
      <section className="bg-ink pt-14 pb-48 text-paper">
        <div className={wrap}>
          <Reveal>
            <p className="eyebrow !text-paper/60">{cs.category} · {periodLabel(cs)}</p>
            <CaseTitle className="mt-5" cs={cs} />
            <p className="mt-6 max-w-3xl font-display text-2xl leading-snug text-paper/85 sm:text-4xl">{cs.tagline}</p>
          </Reveal>
          <Facts className="mt-14" cs={cs} invert />
        </div>
      </section>

      <div className={cn(wrap, "-mt-36")}>
        <Reveal>
          <Screen hue={cs.hue} id={cs.cover as ScreenId} />
        </Reveal>
      </div>

      <section className={cn(wrap, "pt-20 pb-16")}>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="text-lg leading-relaxed">{cs.summary}</p>
            <p className="mt-5 text-ink-soft leading-relaxed">{cs.context}</p>
          </div>
          <MetaGrid className="lg:col-span-6 [&_dl]:lg:grid-cols-2" cs={cs} />
        </div>
      </section>

      {cs.products?.map((p, i) => (
        <section className={cn("border-rule border-t py-24", i % 2 === 1 && "bg-paper-2/60")} key={p.name}>
          <div className={cn(wrap, "grid items-start gap-12 lg:grid-cols-12")}>
            <Reveal className={cn("lg:sticky lg:top-28 lg:col-span-4", i % 2 === 1 && "lg:order-2 lg:col-start-9")}>
              <p className="eyebrow"><span className="text-signal">0{i + 1}</span> — Product</p>
              <h2 className="mt-4 font-display text-5xl leading-none">{p.name}</h2>
              <p className="mt-6 text-ink-soft leading-relaxed">{p.body}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {p.points.map((pt) => (
                  <li className="rounded-full border border-ink/15 bg-paper px-3 py-1 text-sm" key={pt}>{pt}</li>
                ))}
              </ul>
              {p.link && (
                <a className="mt-8 inline-flex items-center gap-2 text-sm underline-offset-4 hover:text-signal hover:underline" href={p.link} rel="noreferrer" target="_blank">
                  Visit {new URL(p.link).hostname} ↗
                </a>
              )}
            </Reveal>
            <div className={cn("space-y-10 lg:col-span-8", i % 2 === 1 && "lg:order-1")}>
              <Figure cs={cs} id={p.screen} />
              {p.name === "Remeet" && (
                <div className="grid items-center gap-8 sm:grid-cols-[1fr_1.2fr]">
                  <Figure cs={cs} id="remeet-access" />
                  <p className="text-ink-soft leading-relaxed">
                    Access works the way people arrive: a fingerprint or an RFID card at the door, in the language they use.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      <section className="border-rule border-t py-24">
        <div className={wrap}>
          <SectionHead label="Across both products" n="03" title="Consistency was the product." />
          <Numbered className="mt-14" items={cs.highlights} />
        </div>
      </section>
    </>
  );
}
