import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import {
  courses,
  duration,
  education,
  experience,
  formatMonth,
  languages,
  type Role,
  site,
  skills,
  tools,
} from "@/lib/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Career · Sudabeh",
  description: "Sudabeh Zolfi Khorram’s career as a product designer: roles, products, skills, tools and education.",
};

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function Logo({ role }: { role: Role }) {
  return (
    <span className="relative z-10 grid size-14 shrink-0 place-items-center overflow-hidden rounded-2xl border border-rule bg-white shadow-sm">
      {role.logo ? (
        <Image alt={`${role.company} logo`} className="object-contain p-2" fill sizes="56px" src={`${BASE}/logos/${role.logo}.webp`} />
      ) : (
        <span className="font-display text-lg text-zinc-700">{initials(role.company)}</span>
      )}
    </span>
  );
}

function Tags({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="eyebrow">{title}</h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {items.map((t) => (
          <li className="rounded-full border border-rule bg-paper px-3 py-1 text-sm" key={t}>
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ExperiencePage() {
  return (
    <section className="mx-auto max-w-[1240px] px-4 pt-16 pb-28 sm:px-8">
      <Reveal className="grid gap-6 pb-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow">Career</p>
          <h1 className="mt-4 font-display text-[clamp(2.4rem,5vw,4rem)] leading-[1.02]">
            {experience.length} teams, <em className="text-signal">one direction.</em>
          </h1>
        </div>
        <div className="self-end lg:col-span-4 lg:col-start-9">
          <p className="text-ink-soft">
            From educational content to fintech, ERP and enterprise platforms, each role moved me closer to owning the
            whole product, not just its screens.
          </p>
          <a
            className="mt-6 inline-flex h-10 items-center gap-2 rounded-full bg-ink px-5 font-medium text-paper text-sm transition-colors hover:bg-signal hover:text-white"
            download
            href={site.resume}
          >
            <ArrowDownToLine className="size-4" />
            Download CV (PDF)
          </a>
        </div>
      </Reveal>

      <div className="grid gap-16 lg:grid-cols-12">
        {/* One continuous line: the logos sit on it like stops. */}
        <RevealGroup as="ol" className="relative lg:col-span-8" stagger={0.05}>
          <span aria-hidden className="absolute top-7 bottom-7 left-7 w-px bg-rule" />
          {experience.map((r) => (
            <RevealItem as="li" className="relative grid grid-cols-[3.5rem_1fr] gap-5 pb-12 last:pb-0" key={r.company}>
              <Logo role={r} />
              <div className="min-w-0 pt-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-semibold text-xl">
                    {r.company}
                    {!r.end && (
                      <span className="ml-3 inline-flex items-center gap-1.5 rounded-full bg-blush px-2 py-0.5 align-middle font-medium font-mono text-[11px] text-signal uppercase">
                        <span className="size-1.5 rounded-full bg-signal" /> Now
                      </span>
                    )}
                  </h3>
                  <p className="font-mono text-ink-soft text-sm tabular-nums">
                    {formatMonth(r.start)} – {formatMonth(r.end)} · {duration(r.start, r.end)}
                  </p>
                </div>
                <p className="mt-1 text-ink-soft">
                  {[r.title, r.type, r.mode].filter(Boolean).join(" · ")}
                </p>
                <p className="mt-3 max-w-2xl leading-relaxed">{r.about}</p>
                {(r.caseStudy || r.link) && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {r.caseStudy && (
                      <Link
                        className="inline-flex items-center gap-1 rounded-full bg-ink px-3.5 py-1.5 text-paper text-sm transition-colors hover:bg-signal hover:text-white"
                        href={`/work/${r.caseStudy}`}
                      >
                        Case study <ArrowUpRight className="size-3.5" />
                      </Link>
                    )}
                    {r.link && (
                      <a
                        className="rounded-full border border-ink/15 px-3.5 py-1.5 text-sm transition-colors hover:border-signal hover:text-signal"
                        href={r.link.href}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {r.link.label} ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <aside className="grid content-start gap-10 lg:sticky lg:top-24 lg:col-span-4 lg:self-start">
          <Reveal>
            <Tags items={skills} title="Skills" />
          </Reveal>
          <Reveal>
            <Tags items={tools} title="Tools" />
          </Reveal>
          <Reveal className={cn("grid gap-8 rounded-3xl border border-rule bg-paper-2/50 p-6")}>
            <div>
              <h2 className="eyebrow">Education</h2>
              {education.map((e) => (
                <p className="mt-3" key={e.title}>
                  <span className="font-medium">{e.title}</span>
                  <br />
                  <span className="text-ink-soft text-sm">
                    {e.place} · {e.years}
                  </span>
                </p>
              ))}
            </div>
            <div>
              <h2 className="eyebrow">Courses</h2>
              <ul className="mt-3 grid gap-2 text-sm">
                {courses.map((c) => (
                  <li key={c.title}>
                    <span className="font-medium">{c.title}</span> <span className="text-ink-soft">· {c.place}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="eyebrow">Languages</h2>
              <ul className="mt-3 grid gap-1 text-sm">
                {languages.map((l) => (
                  <li key={l.name}>
                    <span className="font-medium">{l.name}</span> <span className="text-ink-soft">· {l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </aside>
      </div>
    </section>
  );
}
