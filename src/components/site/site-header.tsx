import { ArrowDownToLine } from "lucide-react";
import Link from "next/link";
import { MorphicNavbar } from "@/components/kokonutui/morphic-navbar";
import { site } from "@/lib/content";

const NAV = {
  "/": { name: "Hello" },
  "/work": { name: "Work" },
  "/experience": { name: "Career" },
  "/about": { name: "About" },
  "/contact": { name: "Contact" },
};

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-rule/70 border-b bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1240px] flex-col items-start gap-1 px-4 py-2 sm:h-16 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-8 sm:py-0">
        <div className="flex w-full items-center justify-between sm:w-auto">
          <Link className="group flex items-center gap-2.5 font-display text-xl leading-none" href="/">
            {/* Monogram: a loose stroke that settles into a straight one on hover. */}
            <span aria-hidden className="grid size-8 place-items-center rounded-lg bg-ink text-paper">
              <svg className="size-5" fill="none" viewBox="0 0 20 20">
                <path
                  // The attribute is the fallback where CSS `d` isn't supported (Safari).
                  d="M3 13C6 3,9 17,11 8S15 5,17 7"
                  className="transition-[d] duration-500 ease-[cubic-bezier(.22,1,.36,1)] [d:path('M3_13C6_3,9_17,11_8S15_5,17_7')] group-hover:[d:path('M3_10C6_10,9_10,11_10S15_10,17_10')]"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                />
              </svg>
            </span>
            Sudabeh
            <span className="hidden font-mono text-[0.68rem] text-ink-soft uppercase tracking-[0.08em] lg:inline">/ Product Designer</span>
          </Link>
          <a
            aria-label="Download resume (PDF)"
            className="grid size-9 place-items-center rounded-full border border-rule text-ink-soft sm:hidden"
            download
            href={site.resume}
          >
            <ArrowDownToLine className="size-4" />
          </a>
        </div>
        <div className="flex items-center gap-3">
          <MorphicNavbar className="-mx-1 px-0" items={NAV} />
          <a
            className="group hidden h-9 items-center gap-2 rounded-full border border-rule pr-1 pl-3.5 text-sm transition-colors hover:border-signal sm:inline-flex"
            download
            href={site.resume}
            title="Download my CV (PDF)"
          >
            CV
            <span className="grid size-7 place-items-center overflow-hidden rounded-full bg-signal text-white">
              <ArrowDownToLine className="size-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
