// Leili: a two-role product, so the page is built around a split: the admin
// on desktop and the inspector on mobile, one shared structure between them.
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import type { CaseStudy } from "@/lib/case-studies";
import { cn } from "@/lib/utils";
import { CaseTitle, Facts, Figure, MetaGrid, Numbered, SectionHead, wrap } from "../blocks";
import { Screen } from "../mockups";

export function SplitLayout({ cs }: { cs: CaseStudy }) {
  return (
    <>
      <section className={cn(wrap, "pt-12 pb-20")}>
        <Reveal>
          <p className="eyebrow">{cs.status} · {cs.category}</p>
          <CaseTitle className="mt-5" cs={cs} size="xl" />
        </Reveal>
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5" delay={0.1}>
            <p className="font-display text-2xl leading-snug sm:text-3xl">{cs.tagline}</p>
            <p className="mt-6 text-ink-soft leading-relaxed">{cs.summary}</p>
          </Reveal>
          {/* The two roles, side by side from the first screen. */}
          <Reveal className="relative pb-16 lg:col-span-7" delay={0.2}>
            <Screen hue={cs.hue} id="leili-admin-home" />
            <div className="absolute right-[-4%] bottom-0 w-[30%] min-w-[130px]">
              <Screen hue={cs.hue} id="leili-inspector-list" />
            </div>
          </Reveal>
        </div>
        <MetaGrid className="mt-20 border-rule border-t pt-8" cs={cs} />
      </section>

      <section className="border-rule border-t bg-paper-2/50 py-24">
        <div className={wrap}>
          <SectionHead label="Context" n="01" title="From paper workflow to digital system.">
            <p>{cs.context}</p>
          </SectionHead>
          <RevealGroup as="ul" className="mt-14 grid gap-4 sm:grid-cols-3">
            {cs.scope.map((g) => (
              <RevealItem as="li" className="rounded-xl border border-rule bg-paper p-6" key={g}>
                <span className="font-mono text-signal text-xs uppercase">Scope</span>
                <p className="mt-3 leading-snug">{g}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* The split itself: two lanes that share one evaluation structure. */}
      <section className="py-24">
        <div className={wrap}>
          <SectionHead label="One system, two work modes" n="02" title="Same evaluation, two very different jobs.">
            <p>The case follows one shared evaluation structure from the administrator’s setup work through the inspector’s focused execution.</p>
          </SectionHead>
        </div>
        <div className={cn(wrap, "mt-16 grid gap-16 lg:grid-cols-[180px_1fr]")}>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">Lane A</p>
            <p className="mt-2 font-display text-3xl">Admin</p>
            <p className="mt-2 text-ink-soft text-sm">Desktop · plan, build, monitor</p>
          </div>
          <div className="space-y-16">
            <Figure cs={cs} id="leili-admin-home" />
            <Figure cs={cs} id="leili-builder" />
          </div>
        </div>
        <div className={cn(wrap, "mt-24 grid gap-16 lg:grid-cols-[180px_1fr]")}>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">Lane B</p>
            <p className="mt-2 font-display text-3xl">Inspector</p>
            <p className="mt-2 text-ink-soft text-sm">Mobile · open, answer, review, submit</p>
          </div>
          <div className="grid gap-10 sm:grid-cols-3">
            {(["leili-inspector-list", "leili-question", "leili-review"] as const).map((id) => (
              <Figure cs={cs} id={id} key={id} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-rule border-t py-24">
        <div className={wrap}>
          <SectionHead label="Key design decisions" n="03" title="What gave the system its shape." />
          <Numbered className="mt-14" items={cs.highlights} />
          <p className="eyebrow mt-10 mb-4">Current outcome</p>
          <p className="max-w-3xl font-display text-2xl leading-snug">
            A structured digital experience for two distinct work contexts: setup and oversight for admins, focused execution and review for inspectors.
          </p>
          <Facts className="mt-10" cs={cs} />
        </div>
      </section>
    </>
  );
}
