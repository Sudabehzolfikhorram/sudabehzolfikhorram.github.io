import type { Metadata } from "next";
import Link from "next/link";
import ScrollIndex from "@/components/kokonutui/scroll-index";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { experience, formatMonth } from "@/lib/content";

export const metadata: Metadata = { title: "Experience · Sudabeh" };

export default function ExperiencePage() {
  // Group roles under the year they started, newest first.
  const years = [...new Set(experience.map((r) => r.start.slice(0, 4)))].sort().reverse();

  return (
    <section className="mx-auto max-w-[1240px] px-4 pt-20 pb-28 sm:px-8">
      <Reveal className="grid gap-6 pb-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow">Experience</p>
          <h1 className="mt-4 font-display text-[clamp(3rem,8vw,7rem)] leading-[0.98] tracking-tight">
            Since <em className="text-signal">2021.</em>
          </h1>
        </div>
        <p className="max-w-md self-end text-ink-soft lg:col-span-4 lg:col-start-9">
          A timeline of the products, teams, and systems I’ve worked on. Drag the rail on the right
          to scrub through the years.
        </p>
      </Reveal>

      <ScrollIndex scroller="window" selector="h2">
        {years.map((year) => (
          <div className="grid gap-6 border-ink border-t pt-6 pb-14 md:grid-cols-[10rem_1fr]" key={year}>
            <h2 className="font-display text-5xl leading-none">{year}</h2>
            <RevealGroup as="ul" className="divide-y divide-rule">
              {experience
                .filter((r) => r.start.startsWith(year))
                .map((r) => (
                  <RevealItem as="li" className="grid gap-x-8 gap-y-2 py-6 first:pt-0 sm:grid-cols-[1fr_auto]" key={r.company}>
                    <div>
                      <h3 className="font-medium text-xl">{r.company}</h3>
                      <p className="text-ink-soft">{r.title}</p>
                    </div>
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 sm:flex-col sm:items-end">
                      <span className="font-mono text-sm tabular-nums">
                        {formatMonth(r.start)} → {formatMonth(r.end)}
                      </span>
                      <span className="eyebrow">
                        {[r.type, r.mode].filter(Boolean).join(" · ")}
                        {!r.end && <span className="ml-2 text-signal">● Now</span>}
                      </span>
                    </div>
                    <p className="max-w-2xl text-ink-soft text-[0.95rem] leading-relaxed sm:col-span-2">{r.about}</p>
                    {(r.caseStudy || r.link) && (
                      <div className="flex flex-wrap gap-2 sm:col-span-2">
                        {r.caseStudy && (
                          <Link className="rounded-full bg-ink px-3 py-1 text-paper text-sm hover:bg-signal" href={`/work/${r.caseStudy}`}>
                            Read case study →
                          </Link>
                        )}
                        {r.link && (
                          <a className="rounded-full border border-ink/15 px-3 py-1 text-sm hover:border-signal hover:text-signal" href={r.link.href} rel="noreferrer" target="_blank">
                            {r.link.label} ↗
                          </a>
                        )}
                      </div>
                    )}
                  </RevealItem>
                ))}
            </RevealGroup>
          </div>
        ))}
      </ScrollIndex>
    </section>
  );
}
