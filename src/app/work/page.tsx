import type { Metadata } from "next";
import Link from "next/link";
import { Cover, periodLabel } from "@/components/case/blocks";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CtaBand } from "@/components/site/cta-band";
import { caseStudies } from "@/lib/case-studies";
import { experience, formatRange } from "@/lib/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Work · Sudabeh" };

// Product work from the resume that doesn't have a full case study yet.
const moreWork = experience.filter((r) => !r.caseStudy && ["Novin Host", "Algonet", "ChapAgha", "Nan va Namak"].includes(r.company));

export default function WorkPage() {
  return (
    <>
      <section className="mx-auto max-w-[1240px] px-4 pt-20 pb-24 sm:px-8">
        <Reveal className="grid gap-6 pb-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">Index of work</p>
            <h1 className="mt-4 font-display text-[clamp(3rem,8vw,7rem)] leading-[0.98]">
              Selected <em className="text-signal">work.</em>
            </h1>
          </div>
          <p className="max-w-md self-end text-ink-soft lg:col-span-4 lg:col-start-9">
            B2B and B2C products, fintech, operational tools and design systems: the problem, the
            thinking and the screens.
          </p>
        </Reveal>

        <RevealGroup className="grid gap-x-8 gap-y-16 md:grid-cols-2" stagger={0.1}>
          {caseStudies.map((cs, i) => (
            // First project spans the full width, as the lead story.
            <RevealItem className={cn(i === 0 && "md:col-span-2")} key={cs.slug}>
              <Link className="group block" href={`/work/${cs.slug}`}>
                <Cover
                  className="transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-1.5"
                  compact={i !== 0}
                  cs={cs}
                />
                <div className="mt-5 flex items-start justify-between gap-6">
                  <div>
                    <p className="eyebrow">
                      {periodLabel(cs) ?? "Case study"} · {cs.category}
                    </p>
                    <h2 className="mt-2 font-display text-3xl transition-colors group-hover:text-signal sm:text-4xl">{cs.name}</h2>
                    <p className="mt-2 max-w-lg text-ink-soft">{cs.tagline}</p>
                  </div>
                  <span aria-hidden className="mt-8 text-2xl transition-transform group-hover:translate-x-1.5">→</span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-28">
          <p className="eyebrow">More work</p>
          <h2 className="mt-3 font-display text-4xl">Also designed</h2>
        </Reveal>
        <RevealGroup as="ul" className="mt-8 divide-y divide-rule border-rule border-y">
          {moreWork.map((r) => (
            <RevealItem as="li" className="grid gap-3 py-7 md:grid-cols-[14rem_1fr_auto] md:gap-10" key={r.company}>
              <div>
                <p className="font-display text-2xl">{r.company}</p>
                <p className="mt-1 font-mono text-[0.75rem] text-ink-soft">{formatRange(r.start, r.end)}</p>
              </div>
              <p className="max-w-2xl text-ink-soft leading-relaxed">{r.about}</p>
              {r.link ? (
                <a className="self-start text-sm underline-offset-4 hover:text-signal hover:underline" href={r.link.href} rel="noreferrer" target="_blank">
                  {r.link.label} ↗
                </a>
              ) : (
                <span className="eyebrow self-start">Case study soon</span>
              )}
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
      <CtaBand />
    </>
  );
}
