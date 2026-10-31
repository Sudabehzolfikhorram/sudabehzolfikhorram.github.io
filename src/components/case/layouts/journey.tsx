// Tamdid: a fintech product designed mobile first, then for the web. The page
// leads with the real phone screens, then shows the web version in light and
// dark, compared with a slider.
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import type { CaseStudy } from "@/lib/case-studies";
import { cn } from "@/lib/utils";
import { IPhoneShot } from "../devices";
import { BeforeAfter } from "../novin/interactive";
import { CaseTitle, Facts, MetaGrid, Scope, SectionHead, wrap } from "../blocks";
import { Screen } from "../mockups";

type Shot = NonNullable<CaseStudy["gallery"]>[number];

/** A real screen in an iPhone. */
function Phone({ shot, className, priority }: { shot: Shot; className?: string; priority?: boolean }) {
  return (
    <figure className={className}>
      <IPhoneShot alt={shot.alt} height={shot.height} priority={priority} sizes="(min-width: 640px) 280px, 62vw" src={shot.image} width={shot.width} />
      {shot.label && <figcaption className="eyebrow mt-3 text-center">{shot.label}</figcaption>}
    </figure>
  );
}

export function JourneyLayout({ cs }: { cs: CaseStudy }) {
  const phones = cs.gallery?.filter((g) => g.device === "phone") ?? [];
  const web = cs.gallery?.filter((g) => g.device === "web") ?? [];
  const [center, left, right] = phones;

  return (
    <>
      <section className="overflow-hidden pt-12 pb-20" style={{ background: `color-mix(in oklab, ${cs.hue} 10%, var(--paper))` }}>
        <Reveal className={cn(wrap, "text-center")}>
          <p className="eyebrow">{cs.category}</p>
          <CaseTitle className="mt-4" cs={cs} size="xl" />
          <p className="mx-auto mt-5 max-w-2xl text-xl leading-snug sm:text-2xl">{cs.tagline}</p>
        </Reveal>
        {/* Three real phones, fanned out. */}
        <div className="mx-auto mt-14 flex max-w-4xl items-start justify-center gap-4 px-4 sm:gap-8">
          {center ? (
            <>
              {left && (
                <Reveal className="hidden w-1/4 translate-y-12 -rotate-6 sm:block" delay={0.15}>
                  <Phone shot={left} />
                </Reveal>
              )}
              <Reveal className="w-[62%] sm:w-1/3" delay={0.05}>
                <Phone priority shot={center} />
              </Reveal>
              {right && (
                <Reveal className="hidden w-1/4 translate-y-12 rotate-6 sm:block" delay={0.25}>
                  <Phone shot={right} />
                </Reveal>
              )}
            </>
          ) : (
            <Reveal className="w-[62%] sm:w-1/3">
              <Screen hue={cs.hue} id={cs.screens[0].id} />
            </Reveal>
          )}
        </div>
      </section>

      <section className={cn(wrap, "py-20")}>
        <p className="max-w-3xl text-lg leading-relaxed">{cs.summary}</p>
        <MetaGrid className="mt-12 border-rule border-t pt-8" cs={cs} />
      </section>

      <section className="border-rule border-t py-24">
        <div className={cn(wrap, "grid gap-14 lg:grid-cols-12")}>
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">The idea</p>
            <p className="mt-6 font-display text-2xl leading-snug sm:text-3xl">{cs.context}</p>
          </Reveal>
          <Reveal className="self-end lg:col-span-4 lg:col-start-9" delay={0.1}>
            <p className="eyebrow mb-4">What I designed</p>
            <Scope cs={cs} />
          </Reveal>
        </div>
      </section>

      <section className="bg-paper-2/60 py-24">
        <div className={wrap}>
          <SectionHead label="Key areas" n="01" title="Subscriptions, wallet, motivation." />
          <RevealGroup className="mt-14 grid gap-4 md:grid-cols-3">
            {cs.highlights.map((it, i) => (
              <RevealItem className="rounded-2xl border border-rule bg-paper p-7" key={it.title}>
                <p className="font-mono text-ink-soft text-xs">0{i + 1}</p>
                <p className="mt-6 font-display text-2xl leading-tight">{it.title}</p>
                <p className="mt-4 text-ink-soft leading-relaxed">{it.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {web.length >= 2 && (
        <section className="py-24">
          <div className={cn(wrap, "grid gap-10 lg:grid-cols-12")}>
            <Reveal className="lg:col-span-4">
              <SectionHead label="Mobile first, then web" n="02" title="Same product, bigger canvas." />
              <p className="mt-6 text-ink-soft leading-relaxed">
                Tamdid started on mobile. The web version came later and reuses the same system: the wallet, quick actions
                and league move to a side panel, and transactions get a full table. Drag to compare the light and dark themes.
              </p>
            </Reveal>
            <Reveal className="lg:col-span-8" delay={0.1}>
              <BeforeAfter
                accent={cs.hue}
                after={web[1].image}
                afterAlt={web[1].alt}
                afterLabel="Dark"
                before={web[0].image}
                beforeAlt={web[0].alt}
                beforeLabel="Light"
                height={web[0].height}
                width={web[0].width}
              />
            </Reveal>
          </div>
        </section>
      )}

      <section className="border-rule border-t py-24">
        <div className={wrap}>
          <SectionHead label="Where it stands" n="03" title="Designed solo, now in development." />
          <Facts className="mt-12" cs={cs} />
        </div>
      </section>
    </>
  );
}
