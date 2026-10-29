// Tamdid: a mobile product, so the page is a storyboard you scroll through,
// from the home screen to paying a renewal and earning rewards.
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import type { CaseStudy } from "@/lib/case-studies";
import { cn } from "@/lib/utils";
import { CaseTitle, Facts, MetaGrid, Scope, SectionHead, wrap } from "../blocks";
import { Screen } from "../mockups";
import { StoryRail } from "../story-rail";

export function JourneyLayout({ cs }: { cs: CaseStudy }) {
  const [left, center, right] = [cs.screens[1].id, cs.screens[0].id, cs.screens[4].id];
  return (
    <>
      <section className="overflow-hidden pt-12" style={{ background: `color-mix(in oklab, ${cs.hue} 12%, var(--paper))` }}>
        <Reveal className={cn(wrap, "text-center")}>
          <p className="eyebrow">{cs.category} · {cs.status}</p>
          <CaseTitle className="mt-5" cs={cs} size="xl" />
          <p className="mx-auto mt-6 max-w-2xl font-display text-2xl leading-snug sm:text-3xl">{cs.tagline}</p>
        </Reveal>
        {/* Three phones fanned out. */}
        <div className="mx-auto mt-16 flex max-w-4xl items-end justify-center gap-4 px-4 sm:gap-8">
          <Reveal className="hidden w-1/4 translate-y-16 -rotate-6 sm:block" delay={0.15}>
            <Screen hue={cs.hue} id={left} />
          </Reveal>
          <Reveal className="w-[62%] translate-y-6 sm:w-1/3" delay={0.05}>
            <Screen hue={cs.hue} id={center} />
          </Reveal>
          <Reveal className="hidden w-1/4 translate-y-16 rotate-6 sm:block" delay={0.25}>
            <Screen hue={cs.hue} id={right} />
          </Reveal>
        </div>
      </section>

      <section className={cn(wrap, "py-20")}>
        <p className="max-w-3xl text-lg leading-relaxed">{cs.summary}</p>
        <MetaGrid className="mt-12 border-rule border-t pt-8" cs={cs} />
      </section>

      <section className="border-rule border-t py-24">
        <div className={cn(wrap, "grid gap-14 lg:grid-cols-12")}>
          <Reveal className="lg:col-span-7">
            <p className="eyebrow"><span className="text-signal">01</span> — The idea</p>
            <p className="mt-6 font-display text-3xl leading-snug sm:text-4xl">{cs.context}</p>
          </Reveal>
          <Reveal className="self-end lg:col-span-4 lg:col-start-9" delay={0.1}>
            <p className="eyebrow mb-4">What I designed</p>
            <Scope cs={cs} />
          </Reveal>
        </div>
      </section>

      <section className="bg-paper-2/60 py-24">
        <div className={wrap}>
          <SectionHead label="Key areas" n="02" title="Subscriptions, wallet, motivation." />
          <RevealGroup className="mt-14 grid gap-4 md:grid-cols-3">
            {cs.highlights.map((it, i) => (
              <RevealItem className="rounded-2xl border border-rule bg-paper p-7" key={it.title}>
                <p className="font-mono text-ink-soft text-xs">0{i + 1}</p>
                <p className="mt-6 font-display text-3xl leading-tight">{it.title}</p>
                <p className="mt-4 text-ink-soft leading-relaxed">{it.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="pt-24">
        <div className={wrap}>
          <SectionHead label="The flow" n="03" title="From renewal reminder to reward.">
            <p className="hidden md:block">Keep scrolling: the flow moves sideways.</p>
            <p className="md:hidden">Swipe through the flow.</p>
          </SectionHead>
        </div>
        <div className="mt-12">
          <StoryRail cs={cs} />
        </div>
      </section>

      <section className="border-rule border-t py-24">
        <div className={wrap}>
          <SectionHead label="Where it stands" n="04" title="Designed, now in development." />
          <Facts className="mt-12" cs={cs} />
        </div>
      </section>
    </>
  );
}
