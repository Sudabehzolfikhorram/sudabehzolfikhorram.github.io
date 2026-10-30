"use client";

import {
  ArrowUpRight,
  ChefHat,
  GraduationCap,
  type LucideIcon,
  Megaphone,
  MousePointerClick,
  Plus,
  Printer,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { EASE_OUT } from "@/components/motion/reveal";
import { experience, formatMonth, type Role } from "@/lib/content";
import { cn } from "@/lib/utils";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Until their logo files arrive, these roles show a quiet icon for their field instead of initials.
const FIELD: Record<string, LucideIcon> = {
  Algonet: Sparkles,
  Novaday: UsersRound,
  ChapAgha: Printer,
  "Nan va Namak": ChefHat,
  Jaygah: Megaphone,
  "Alla Online School": GraduationCap,
};

/** One colour at rest (ink, or white in dark mode); the brand's own colours come through on hover. */
function Logo({ role }: { role: Role }) {
  const Icon = FIELD[role.company];
  return (
    <span className="relative grid size-12 shrink-0 place-items-center rounded-2xl border border-rule transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3">
      {role.logo ? (
        <Image
          alt={`${role.company} logo`}
          className="object-contain p-2 opacity-80 transition-[filter,opacity] duration-500 [filter:brightness(0)] group-hover:opacity-100 group-hover:[filter:none] dark:[filter:brightness(0)_invert(1)]"
          fill
          sizes="48px"
          src={`${BASE}/logos/${role.logo}.webp`}
        />
      ) : (
        Icon && <Icon aria-hidden className="size-5 text-ink-soft transition-colors duration-500 group-hover:text-signal" strokeWidth={1.6} />
      )}
    </span>
  );
}

const TOOL_LOGO: Record<string, string> = {
  "Figma & FigJam": "figma",
  Framer: "framer",
  Notion: "notion",
  ChatGPT: "chatgpt",
  Claude: "claude",
  "Google AI Studio": "aistudio",
  Lovable: "lovable",
  NotebookLM: "notebooklm",
  GA4: "ga4",
  "Adobe Illustrator": "illustrator",
  ClickUp: "clickup",
  Slack: "slack",
};

/**
 * Every role on one line: logo, company, title and dates. Open a row for the
 * story and the case studies, so the page stays quiet until you ask.
 */
export function CareerList() {
  const [open, setOpen] = useState<string | null>(experience[0]?.company ?? null);
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
                  <span aria-hidden className="grid size-7 place-items-center rounded-full bg-white ring-1 ring-black/5">
                    {TOOL_LOGO[t] ? (
                      <Image alt="" className="size-4 object-contain" height={16} src={`${BASE}/tools/${TOOL_LOGO[t]}.svg`} width={16} />
                    ) : (
                      <MousePointerClick className="size-3.5 text-zinc-600" />
                    )}
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
