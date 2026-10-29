import SlideTextButton from "@/components/kokonutui/slide-text-button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Capabilities } from "@/components/site/capabilities";
import { CtaBand } from "@/components/site/cta-band";
import { Hero } from "@/components/site/hero";
import { ProcessSteps } from "@/components/site/process-steps";
import { Stats } from "@/components/site/stats";
import { WorkList } from "@/components/site/work-list";
import { principles } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Capabilities />

      <section className="mx-auto max-w-[1240px] px-4 py-24 sm:px-8">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">04 — Selected work</p>
            <h2 className="mt-4 font-display text-5xl leading-[1.02] tracking-tight">
              Projects with <em className="text-signal">clarity.</em>
            </h2>
          </div>
          <SlideTextButton
            animateIn={false}
            className="rounded-full border-ink/20 text-ink"
            href="/work"
            hoverText="Open the index →"
            text="All work"
            variant="ghost"
          />
        </Reveal>
        <WorkList />
      </section>

      <ProcessSteps />

      <section className="border-rule border-t">
        <div className="mx-auto max-w-[1240px] px-4 py-24 sm:px-8">
          <Reveal>
            <p className="eyebrow">06 — Principles</p>
            <h2 className="mt-4 max-w-2xl font-display text-5xl leading-[1.02] tracking-tight">
              I design the thinking <em className="text-signal">behind</em> the product.
            </h2>
          </Reveal>
          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-lg border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4" stagger={0.05}>
            {principles.map((p) => (
              <RevealItem className="bg-paper p-6" key={p.title}>
                <h3 className="font-medium">{p.title}</h3>
                <p className="mt-2 text-ink-soft text-sm leading-relaxed">{p.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
