"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * The multi-currency rule from the Tamdid file, as a toy: a balance can only
 * be shown in one currency, so “All” asks you to pick one, and picking one
 * hides the contacts you’ve never dealt with in it.
 */
const CURRENCIES = ["All", "Toman", "Dollar", "Euro"] as const;
type Currency = (typeof CURRENCIES)[number];

const contacts: { name: string; holds: Currency[]; note?: Partial<Record<Currency, string>> }[] = [
  { name: "Tina", holds: ["Toman", "Dollar"], note: { Toman: "Settled in toman" } },
  { name: "Sina", holds: ["Euro"] },
  { name: "Mahsa", holds: ["Toman"] },
];

export function CurrencyDemo({ accent }: { accent: string }) {
  const [cur, setCur] = useState<Currency>("All");
  const visible = cur === "All" ? contacts : contacts.filter((c) => c.holds.includes(cur));
  return (
    <div className="rounded-3xl border border-rule bg-paper p-5 sm:p-6">
      <p className="font-mono text-[0.72rem] text-ink-soft uppercase">Try it · currency filter</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {CURRENCIES.map((c) => (
          <button
            aria-pressed={cur === c}
            className={cn("rounded-full border px-3.5 py-1.5 text-sm transition-colors", cur === c ? "border-transparent text-white" : "border-rule hover:bg-paper-2")}
            key={c}
            onClick={() => setCur(c)}
            style={cur === c ? { background: accent } : undefined}
            type="button"
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-5 min-h-[56px] rounded-2xl bg-paper-2/70 p-4 text-sm">
        {cur === "All" ? (
          <p className="flex items-center gap-2"><span aria-hidden>⚠️</span> To see an account balance, choose one currency.</p>
        ) : (
          <p>Account balance, in <span className="font-medium">{cur.toLowerCase()}</span> only.</p>
        )}
      </div>

      <ul className="mt-4 space-y-2">
        <AnimatePresence initial={false}>
          {visible.map((c) => (
            <motion.li
              animate={{ opacity: 1, height: "auto" }}
              className="overflow-hidden"
              exit={{ opacity: 0, height: 0 }}
              initial={{ opacity: 0, height: 0 }}
              key={c.name}
              transition={{ duration: 0.22 }}
            >
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-rule px-4 py-3">
                <span className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-full text-sm text-white" style={{ background: accent }}>{c.name[0]}</span>
                  <span>
                    <span className="block font-medium">{c.name}</span>
                    <span className="text-ink-soft text-xs">Deals in {c.holds.join(" and ").toLowerCase()}</span>
                  </span>
                </span>
                <span className="text-right text-ink-soft text-xs">
                  {cur === "All" ? (c.holds.length > 1 ? "Pick a currency" : `${c.holds[0]} balance`) : (c.note?.[cur] ?? `${cur} balance`)}
                </span>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <p className="mt-4 text-ink-soft text-xs leading-relaxed">The example from my note in the file: Tina deals in dollars and tomans, Sina only in euros, Mahsa only in tomans.</p>
    </div>
  );
}
