import { ArrowDownToLine, Lightbulb, PenTool, Sprout } from "lucide-react";
import type { Metadata } from "next";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CareerList, ToolMarquee } from "@/components/site/career-list";
import { experience, site, skillGroups, tools } from "@/lib/content";

export const metadata: Metadata = {
  title: "Career · Sudabeh",
  description: "Sudabeh Zolfi Khorram’s career as a product designer: roles, products, skills, tools and education.",
};

const groupIcons = [Lightbulb, PenTool, Sprout];

export default function ExperiencePage() {
  return (
    <>
      <section className="mx-auto max-w-[1240px] px-4 pt-16 pb-20 sm:px-8">
        <Reveal className="grid gap-6 pb-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">Career</p>
            <h1 className="mt-4 font-display text-[clamp(2.4rem,5vw,4rem)] leading-[1.02]">
              {experience.length} teams, <em className="text-signal">one direction.</em>
            </h1>
          </div>
          <p className="max-w-md self-end text-ink-soft lg:col-span-4 lg:col-start-9">
            From exam-prep content to fintech, ERP and enterprise AI. Open any role for the story.
          </p>
        </Reveal>
        <Reveal>
          <CareerList />
        </Reveal>
      </section>

      <section className="border-rule border-y bg-paper-2/40">
        <div className="mx-auto max-w-[1240px] px-4 py-20 sm:px-8">
          <Reveal>
            <p className="eyebrow">Toolkit</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05]">
              How I think, make <em className="text-signal">and scale.</em>
            </h2>
          </Reveal>
          <RevealGroup className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3" stagger={0.08}>
            {skillGroups.map((g, i) => {
              const Icon = groupIcons[i];
              return (
                <RevealItem className="rounded-3xl border border-rule bg-paper p-6" key={g.title}>
                  <span className="grid size-10 place-items-center rounded-xl bg-blush text-signal">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 font-semibold text-lg">{g.title}</h3>
                  <ul className="mt-3 grid gap-1.5 text-ink-soft">
                    {g.items.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </RevealItem>
              );
            })}
          </RevealGroup>
          <Reveal className="mt-12">
            <p className="eyebrow mb-4">Tools I work in</p>
            <ToolMarquee tools={tools} />
          </Reveal>
        </div>
      </section>

      {/* Education, courses and languages live in the CV; here, just the way to it. */}
      <section className="mx-auto max-w-[1240px] px-4 py-20 sm:px-8">
        <Reveal className="relative flex flex-col items-start gap-6 overflow-hidden rounded-3xl bg-ink p-8 text-paper sm:flex-row sm:items-center sm:justify-between sm:p-10 dark:bg-paper-2 dark:text-ink">
          <div aria-hidden className="pointer-events-none absolute -right-20 -bottom-24 size-72 rounded-full bg-glow/40 blur-[90px]" />
          <div className="relative">
            <p className="font-display text-2xl leading-tight sm:text-3xl">Education, courses and languages?</p>
            <p className="mt-2 text-paper/70 dark:text-ink-soft">All in the CV, on one page, easy to forward.</p>
          </div>
          <a
            className="relative inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-paper px-6 font-medium text-ink transition-colors hover:bg-signal hover:text-on-signal dark:bg-ink dark:text-paper"
            download
            href={site.resume}
          >
            <ArrowDownToLine className="size-4" />
            Download CV
          </a>
        </Reveal>
      </section>
    </>
  );
}
