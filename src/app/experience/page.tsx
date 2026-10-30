import { ArrowDownToLine, Lightbulb, PenTool, Sprout } from "lucide-react";
import type { Metadata } from "next";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CareerList, ToolMarquee } from "@/components/site/career-list";
import { courses, education, experience, languages, site, skillGroups, tools } from "@/lib/content";

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

      <section className="mx-auto grid max-w-[1240px] gap-10 px-4 py-20 sm:px-8 lg:grid-cols-12">
        <Reveal className="grid gap-8 sm:grid-cols-3 lg:col-span-7">
          <div>
            <h2 className="eyebrow">Education</h2>
            {education.map((e) => (
              <p className="mt-3" key={e.title}>
                <span className="font-medium">{e.title}</span>
                <br />
                <span className="text-ink-soft text-sm">{e.place}</span>
              </p>
            ))}
          </div>
          <div>
            <h2 className="eyebrow">Courses</h2>
            <ul className="mt-3 grid gap-1.5 text-sm">
              {courses.map((c) => (
                <li key={c.title}>
                  {c.title} <span className="text-ink-soft">· {c.place}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="eyebrow">Languages</h2>
            <ul className="mt-3 grid gap-1.5 text-sm">
              {languages.map((l) => (
                <li key={l.name}>
                  {l.name} <span className="text-ink-soft">· {l.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
          <div className="rounded-3xl bg-ink p-7 text-paper dark:bg-paper-2 dark:text-ink">
            <p className="font-display text-2xl leading-tight">Prefer it on one page?</p>
            <p className="mt-2 text-paper/70 text-sm dark:text-ink-soft">The same story as a PDF, easy to forward.</p>
            <a
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-paper px-5 font-medium text-ink text-sm transition-colors hover:bg-signal hover:text-white dark:bg-ink dark:text-paper"
              download
              href={site.resume}
            >
              <ArrowDownToLine className="size-4" />
              Download CV
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
