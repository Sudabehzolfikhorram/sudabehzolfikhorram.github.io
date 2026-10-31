"use client";

import { BriefcaseBusiness, House, type LucideIcon, MessageCircle, Route, UserRound } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const ITEMS: { href: string; label: string; Icon: LucideIcon }[] = [
  { href: "/", label: "Hello", Icon: House },
  { href: "/work", label: "Work", Icon: BriefcaseBusiness },
  { href: "/experience", label: "Career", Icon: Route },
  { href: "/about", label: "About", Icon: UserRound },
  { href: "/contact", label: "Contact", Icon: MessageCircle },
];

/** Phones: the main navigation sits under the thumb instead of at the top of the page. */
export function BottomNav() {
  const path = (usePathname() ?? "/").replace(/\/$/, "") || "/";
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-[80] border-rule border-t bg-paper pb-[env(safe-area-inset-bottom)] shadow-[0_-12px_30px_-24px_rgba(20,15,60,0.5)] sm:hidden"
    >
      <ul className="mx-auto grid h-16 max-w-md grid-cols-5">
        {ITEMS.map(({ href, label, Icon }) => {
          const active = href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`);
          return (
            <li key={href}>
              <Link
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex h-full flex-col items-center justify-center gap-1 text-[11px] transition-colors",
                  active ? "font-medium text-ink" : "text-ink-soft active:text-ink"
                )}
                href={href}
              >
                {active && (
                  <motion.span
                    aria-hidden
                    className="absolute top-1.5 h-8 w-14 rounded-full bg-blush"
                    layoutId="bottom-nav-pill"
                    transition={{ type: "spring", stiffness: 520, damping: 38 }}
                  />
                )}
                <Icon className={cn("relative size-5", active && "text-signal")} strokeWidth={active ? 2.2 : 1.8} />
                <span className="relative">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
