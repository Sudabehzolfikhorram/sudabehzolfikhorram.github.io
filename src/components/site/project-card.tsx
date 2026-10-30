import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Cover, periodLabel } from "@/components/case/blocks";
import type { CaseStudy } from "@/lib/case-studies";
import { cn } from "@/lib/utils";

/** A project as a card: its thumbnail, a badge if it has one, then the one-line story. */
export function ProjectCard({ cs, size = "md", className }: { cs: CaseStudy; size?: "lg" | "md" | "sm"; className?: string }) {
  if (size === "lg") {
    // The lead project: image and story side by side, so neither has to shout.
    return (
      <Link className={cn("group grid grid-cols-1 items-center gap-8 md:grid-cols-12", className)} href={`/work/${cs.slug}`}>
        <div className="relative min-w-0 overflow-hidden rounded-2xl md:col-span-7">
          <Cover className="transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.025]" compact cs={cs} />
        </div>
        <div className="min-w-0 md:col-span-5">
          <p className="eyebrow">{[cs.category, periodLabel(cs)].filter(Boolean).join(" · ")}</p>
          <h3 className="mt-3 font-display text-4xl transition-colors group-hover:text-signal sm:text-5xl">{cs.name}</h3>
          <p className="mt-4 text-xl leading-snug">{cs.tagline}</p>
          <p className="mt-4 text-ink-soft leading-relaxed">{cs.status}</p>
          <span className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 font-medium text-paper text-sm transition-colors group-hover:bg-signal group-hover:text-on-signal">
            Read the case study
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
          </span>
        </div>
      </Link>
    );
  }
  return (
    <Link className={cn("group block", className)} href={`/work/${cs.slug}`}>
      <div className="relative overflow-hidden rounded-2xl">
        <Cover
          className="transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.025]"
          compact
          cs={cs}
        />
        {cs.badge && (
          <span className="absolute top-4 left-4 rounded-full bg-paper/90 px-3 py-1 font-medium text-ink text-xs shadow-sm backdrop-blur">
            ★ {cs.badge}
          </span>
        )}
      </div>
      <div className="mt-5 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <p className="eyebrow truncate">{[cs.category, periodLabel(cs)].filter(Boolean).join(" · ")}</p>
          <h3 className={cn("mt-2 font-display transition-colors group-hover:text-signal", size === "md" ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl")}>
            {cs.name}
          </h3>
          <p className={cn("mt-2 text-ink-soft", size === "sm" ? "text-sm" : "max-w-xl")}>{cs.tagline}</p>
        </div>
        <span
          aria-hidden
          className="mt-6 grid size-10 shrink-0 place-items-center rounded-full border border-rule transition-all duration-300 group-hover:rotate-45 group-hover:border-signal group-hover:bg-signal group-hover:text-on-signal"
        >
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}
