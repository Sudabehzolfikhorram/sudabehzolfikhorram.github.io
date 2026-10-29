import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { type CaseStudy, otherCaseStudies } from "@/lib/case-studies";
import { formatMonth } from "@/lib/content";
import { cn } from "@/lib/utils";
import { deviceOf, Screen, type ScreenId } from "./mockups";

export const wrap = "mx-auto max-w-[1240px] px-4 sm:px-8";
export const hueVars = (cs: CaseStudy) => ({ "--p": cs.hue }) as CSSProperties;

export const periodLabel = (cs: CaseStudy) =>
  cs.period ? `${formatMonth(cs.period.start)} – ${formatMonth(cs.period.end)}` : null;

/** Breadcrumb + back link, shown at the top of every case study. */
export function Breadcrumb({ cs }: { cs: CaseStudy }) {
  return (
    <div className="border-rule border-b">
      <nav aria-label="Breadcrumb" className={cn(wrap, "flex items-center justify-between gap-4 py-3")}>
        <ol className="flex min-w-0 items-center gap-2 font-mono text-[0.75rem] uppercase tracking-[0.06em]">
          <li><Link className="text-ink-soft hover:text-signal" href="/">Index</Link></li>
          <li aria-hidden className="text-ink-soft">/</li>
          <li><Link className="text-ink-soft hover:text-signal" href="/work">Work</Link></li>
          <li aria-hidden className="text-ink-soft">/</li>
          <li aria-current="page" className="truncate text-ink">{cs.name}</li>
        </ol>
        <Link
          className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-ink/15 px-4 py-1.5 text-sm transition-colors hover:border-signal hover:text-signal"
          href="/work"
        >
          <span aria-hidden className="transition-transform group-hover:-translate-x-1">←</span> All projects
        </Link>
      </nav>
    </div>
  );
}

/** Honest label: the screens are coded recreations, not final designs. */
export function ScreensNote() {
  return (
    <p className={cn(wrap, "pt-4 font-mono text-[0.72rem] text-ink-soft")}>
      Screens on this page are illustrative recreations. Final designs to be added.
    </p>
  );
}

/** The project thumbnail: its key screen on a tinted ground. */
export function Cover({ cs, className, compact }: { cs: CaseStudy; className?: string; compact?: boolean }) {
  if (cs.thumbnail) {
    // A finished thumbnail is already composed, so it fills the card as is.
    return (
      <div className={cn("relative aspect-[16/10] overflow-hidden rounded-2xl bg-paper-2 ring-1 ring-rule", className)}>
        <Image
          alt={cs.thumbnail.alt}
          className="h-full w-full object-cover"
          fill
          sizes={compact ? "(min-width: 768px) 50vw, 100vw" : "100vw"}
          src={cs.thumbnail.image}
        />
      </div>
    );
  }
  if (typeof cs.cover === "object") {
    // Real design work: the image itself, in a browser-like frame.
    return (
      <div
        className={cn("relative overflow-hidden rounded-2xl", className)}
        style={{ background: `color-mix(in oklab, ${cs.hue} 16%, var(--paper))` }}
      >
        <div className={compact ? "p-6 pb-0" : "p-8 pb-0 sm:p-14 sm:pb-0"}>
          <div className="translate-y-2 overflow-hidden rounded-t-xl shadow-[0_30px_60px_-24px_rgb(0_0_0/0.35)] ring-1 ring-black/10">
            <Image alt={cs.cover.alt} className="block h-auto w-full" height={900} sizes="(min-width: 1024px) 60vw, 100vw" src={cs.cover.image} width={1440} />
          </div>
        </div>
      </div>
    );
  }
  const phone = deviceOf(cs.cover) === "phone";
  return (
    <div
      className={cn("relative overflow-hidden rounded-2xl", className)}
      style={{ ...hueVars(cs), background: `color-mix(in oklab, ${cs.hue} 16%, var(--paper))` }}
    >
      <div className={cn("relative", compact ? "p-6 pb-0" : "p-8 pb-0 sm:p-14 sm:pb-0", phone && "flex justify-center")}>
        <Screen className={cn(phone ? "max-w-[220px] translate-y-6" : "translate-y-2 rounded-b-none")} hue={cs.hue} id={cs.cover} />
      </div>
    </div>
  );
}

export function MetaGrid({ cs, className }: { cs: CaseStudy; className?: string }) {
  const items: [string, ReactNode][] = [
    ["Role", cs.meta.role],
    ["Period", periodLabel(cs) ?? "—"],
    ["Engagement", cs.meta.engagement],
    ["Platform", cs.meta.platform],
    ["Status", cs.status],
  ];
  return (
    <div className={className}>
      <dl className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
        {items.map(([k, v]) => (
          <div key={k}>
            <dt className="eyebrow">{k}</dt>
            <dd className="mt-2 text-[0.95rem] leading-snug">{v}</dd>
          </div>
        ))}
      </dl>
      {cs.links && (
        <div className="mt-6 flex flex-wrap gap-2">
          {cs.links.map((l) => (
            <a className="rounded-full border border-ink/15 px-3 py-1 text-sm hover:border-signal hover:text-signal" href={l.href} key={l.href} rel="noreferrer" target="_blank">
              {l.label} ↗
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export function SectionHead({ n, label, title, children, className }: { n: string; label: string; title: ReactNode; children?: ReactNode; className?: string }) {
  return (
    <Reveal className={cn("grid gap-6 lg:grid-cols-12", className)}>
      <div className="lg:col-span-6">
        <p className="eyebrow">
          <span className="text-signal">{n}</span> — {label}
        </p>
        <h2 className="mt-4 font-display text-4xl leading-[1.05] sm:text-5xl">{title}</h2>
      </div>
      {children && <div className="self-end text-ink-soft leading-relaxed lg:col-span-5 lg:col-start-8">{children}</div>}
    </Reveal>
  );
}

export function Figure({ cs, id, className, caption = true }: { cs: CaseStudy; id: ScreenId; className?: string; caption?: boolean }) {
  const s = cs.screens.find((x) => x.id === id);
  return (
    <Reveal as="div" className={className}>
      <figure>
        <Screen hue={cs.hue} id={id} />
        {caption && s && (
          <figcaption className="mt-4 flex flex-wrap gap-x-3 text-sm">
            <span className="font-medium">{s.title}</span>
            <span className="text-ink-soft">{s.caption}</span>
          </figcaption>
        )}
      </figure>
    </Reveal>
  );
}

export function Numbered({ items, className, cols = "sm:grid-cols-2 lg:grid-cols-3" }: { items: { title: string; body: string }[]; className?: string; cols?: string }) {
  return (
    <RevealGroup as="ol" className={cn("grid gap-x-10", cols, className)}>
      {items.map((it, i) => (
        <RevealItem as="li" className="border-ink border-t pt-5 pb-10" key={it.title}>
          <span className="font-mono text-signal text-sm">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-4 font-display text-2xl leading-tight">{it.title}</h3>
          <p className="mt-3 text-ink-soft leading-relaxed">{it.body}</p>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

/** The scope list as tags. */
export function Scope({ cs, className }: { cs: CaseStudy; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {cs.scope.map((s) => (
        <li className="rounded-full border border-ink/15 bg-paper px-4 py-2 text-sm" key={s}>{s}</li>
      ))}
    </ul>
  );
}

/** Plain facts about the project (not measured outcomes). */
export function Facts({ cs, className, invert }: { cs: CaseStudy; className?: string; invert?: boolean }) {
  return (
    <RevealGroup
      className={cn(
        "grid gap-px overflow-hidden rounded-xl",
        invert ? "bg-paper/15" : "bg-rule",
        cs.facts.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3",
        className,
      )}
    >
      {cs.facts.map((o) => (
        <RevealItem className={cn("p-7", invert ? "bg-ink" : "bg-paper")} key={o.label}>
          <p className="font-display text-4xl leading-none sm:text-5xl">{o.value}</p>
          <p className={cn("mt-4 max-w-[16rem] text-sm leading-snug", invert ? "text-paper/70" : "text-ink-soft")}>{o.label}</p>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

/** Cards for every other case study, so the next project is one click away. */
export function MoreProjects({ cs }: { cs: CaseStudy }) {
  const others = otherCaseStudies(cs.slug);
  return (
    <section className="border-rule border-t bg-paper-2/50 py-20">
      <div className={wrap}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Keep exploring</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">More projects</h2>
          </div>
          <Link className="rounded-full border border-ink/15 px-4 py-2 text-sm hover:border-signal hover:text-signal" href="/work">
            View all work →
          </Link>
        </div>
        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5" stagger={0.08}>
          {others.map((o) => (
            <RevealItem key={o.slug}>
              <Link className="group block" href={`/work/${o.slug}`}>
                <Cover className="aspect-[4/3] transition-transform duration-500 group-hover:-translate-y-1" compact cs={o} />
                <p className="eyebrow mt-4">{periodLabel(o) ?? o.category}</p>
                <p className="mt-1 font-display text-2xl transition-colors group-hover:text-signal">{o.name} →</p>
                <p className="mt-1 line-clamp-2 text-ink-soft text-sm">{o.tagline}</p>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export function CaseTitle({ cs, className, size = "lg" }: { cs: CaseStudy; className?: string; size?: "lg" | "xl" }) {
  return (
    <h1 className={cn("font-display leading-[0.95]", size === "xl" ? "text-[clamp(3.25rem,10vw,9rem)]" : "text-[clamp(3rem,7vw,6.5rem)]", className)}>
      {cs.name}
    </h1>
  );
}
