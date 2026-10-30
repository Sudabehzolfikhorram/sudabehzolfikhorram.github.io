"use client";

import { ArrowUpRight, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { EASE_OUT } from "@/components/motion/reveal";
import { experience, formatMonth, type Role } from "@/lib/content";
import { cn } from "@/lib/utils";

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
    <span className="relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-2xl border border-rule bg-white transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3">
      {role.logo ? (
        <Image alt={`${role.company} logo`} className="object-contain p-1.5" fill sizes="48px" src={`${BASE}/logos/${role.logo}.webp`} />
      ) : (
        <span className="font-display text-base text-zinc-700">{initials(role.company)}</span>
      )}
    </span>
  );
}

/**
 * Every role on one line: logo, company, title and dates. Open a row for the
 * story and the case studies, so the page stays quiet until you ask.
 */
export function CareerList() {
  const [open, setOpen] = useState<string | null>(experience[1]?.company ?? null);
  return (
    <ol className="border-rule border-t">
      {experience.map((r) => {
        const isOpen = open === r.company;
        const panel = `role-${r.company.replace(/\s+/g, "-").toLowerCase()}`;
        return (
          <li className="border-rule border-b" key={r.company}>
            <button
              aria-controls={panel}
              aria-expanded={isOpen}
              className="group grid w-full grid-cols-[3rem_1fr_auto] items-center gap-4 py-5 text-left sm:grid-cols-[3rem_1fr_auto_auto] sm:gap-6"
              onClick={() => setOpen(isOpen ? null : r.company)}
              type="button"
            >
              <Logo role={r} />
              <span className="min-w-0">
                <span className="flex items-center gap-2">
                  <span className="truncate font-semibold text-lg transition-colors group-hover:text-signal">{r.company}</span>
                  {!r.end && <span className="size-2 shrink-0 rounded-full bg-signal" title="Current role" />}
                </span>
                <span className="block truncate text-ink-soft text-sm">{r.summary}</span>
              </span>
              <span className="hidden text-right font-mono text-ink-soft text-xs sm:block">
                {formatMonth(r.start)} – {formatMonth(r.end)}
              </span>
              <span
                aria-hidden
                className={cn(
                  "grid size-9 place-items-center rounded-full border border-rule transition-all duration-300 group-hover:border-signal",
                  isOpen && "rotate-45 border-signal bg-signal text-on-signal"
                )}
              >
                <Plus className="size-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  animate={{ height: "auto", opacity: 1 }}
                  className="overflow-hidden"
                  exit={{ height: 0, opacity: 0 }}
                  id={panel}
                  initial={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE_OUT }}
                >
                  <div className="grid gap-4 pb-7 pl-16 sm:pl-[4.5rem]">
                    <p className="font-mono text-ink-soft text-xs uppercase tracking-wider">
                      {[r.title, r.type, r.mode].filter(Boolean).join(" · ")}
                      <span className="sm:hidden">
                        {" · "}
                        {formatMonth(r.start)} – {formatMonth(r.end)}
                      </span>
                    </p>
                    <p className="max-w-2xl leading-relaxed">{r.about}</p>
                    {(r.cases || r.link) && (
                      <div className="flex flex-wrap gap-2">
                        {r.cases?.map((c) => (
                          <Link
                            className="inline-flex items-center gap-1 rounded-full bg-ink px-3.5 py-1.5 text-paper text-sm transition-colors hover:bg-signal hover:text-on-signal"
                            href={`/work/${c.slug}`}
                            key={c.slug}
                          >
                            {c.label} case study <ArrowUpRight className="size-3.5" />
                          </Link>
                        ))}
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
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ol>
  );
}

/** The toolbox as two slow, opposite-running rows. Pauses on hover; still for reduced motion. */
export function ToolMarquee({ tools }: { tools: string[] }) {
  const half = Math.ceil(tools.length / 2);
  const rows = [tools.slice(0, half), tools.slice(half)];
  return (
    <div className="group/marquee grid gap-3 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      {rows.map((row, i) => (
        <div className="flex overflow-hidden" key={row[0]}>
          {[0, 1].map((copy) => (
            <ul
              aria-hidden={copy === 1}
              className={cn(
                "flex shrink-0 gap-3 pr-3 motion-safe:animate-[marquee_38s_linear_infinite] group-hover/marquee:[animation-play-state:paused]",
                i === 1 && "motion-safe:[animation-direction:reverse]"
              )}
              key={copy}
            >
              {row.map((t) => (
                <li className="flex items-center gap-2 whitespace-nowrap rounded-full border border-rule bg-paper px-4 py-2" key={t}>
                  <span aria-hidden className="grid size-6 place-items-center rounded-full bg-blush font-semibold text-[11px] text-signal">
                    {t[0]}
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          ))}
        </div>
      ))}
    </div>
  );
}
