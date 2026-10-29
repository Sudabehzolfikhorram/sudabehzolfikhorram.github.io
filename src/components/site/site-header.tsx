import Link from "next/link";
import { MorphicNavbar } from "@/components/kokonutui/morphic-navbar";

const NAV = {
  "/": { name: "Index" },
  "/work": { name: "Work" },
  "/experience": { name: "Experience" },
  "/contact": { name: "Contact" },
};

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-rule/70 border-b bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1240px] flex-col items-start gap-1 px-4 py-2 sm:h-16 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-8 sm:py-0">
        <Link
          href="/"
          className="flex items-baseline gap-2 font-display text-2xl leading-none tracking-tight"
        >
          Sudabeh
          <span className="hidden font-mono text-[0.68rem] text-ink-soft uppercase tracking-[0.08em] sm:inline">
            / Product Designer
          </span>
        </Link>
        <MorphicNavbar items={NAV} className="-mx-1 px-0" />
      </div>
    </header>
  );
}
