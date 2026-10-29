// Coded product mockups for the case studies. Each screen is drawn at a fixed
// design size and scaled by <Fit>, so it stays crisp at any width. Product UI
// uses its own neutral palette (it's a picture of a product, not part of the
// site theme) plus the project's accent passed in as --p.
// Replace any of these with real screenshots via <CaseImage src=...>.

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Fit } from "./fit";

export type ScreenId =
  | "leili-admin-home" | "leili-builder" | "leili-inspector-list" | "leili-question" | "leili-review"
  | "azman-request" | "hamgam-calls" | "erp-access"
  | "tamdid-home" | "tamdid-sub" | "tamdid-wallet" | "tamdid-pay" | "tamdid-rewards"
  | "kudos-panel" | "remeet-booking" | "remeet-access"
  | "kaaryar-home" | "kaaryar-projects" | "kaaryar-mobile";

type Device = "desktop" | "tablet" | "phone";

/* ───────────── primitives ───────────── */

const Bar = ({ w, className }: { w: number | string; className?: string }) => (
  <div className={cn("h-2 rounded-full bg-zinc-200", className)} style={{ width: typeof w === "number" ? `${w}%` : w }} />
);
const Pill = ({ children, tone = "zinc" }: { children: ReactNode; tone?: "zinc" | "p" | "red" | "green" | "amber" }) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full px-2.5 py-1 font-medium text-[11px]",
      tone === "zinc" && "bg-zinc-100 text-zinc-600",
      tone === "p" && "bg-[color-mix(in_oklab,var(--p)_14%,white)] text-[var(--p)]",
      tone === "red" && "bg-red-50 text-red-600",
      tone === "green" && "bg-emerald-50 text-emerald-700",
      tone === "amber" && "bg-amber-50 text-amber-700",
    )}
  >
    {children}
  </span>
);
const Btn = ({ children, ghost }: { children: ReactNode; ghost?: boolean }) => (
  <span
    className={cn(
      "inline-flex h-9 items-center rounded-lg px-4 font-medium text-[13px]",
      ghost ? "border border-zinc-200 text-zinc-700" : "bg-[var(--p)] text-white",
    )}
  >
    {children}
  </span>
);
const Card = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("rounded-xl border border-zinc-200 bg-white p-4", className)}>{children}</div>
);
const Stat = ({ label, value, delta }: { label: string; value: string; delta?: string }) => (
  <Card>
    <p className="text-[12px] text-zinc-500">{label}</p>
    <p className="mt-2 font-semibold text-[26px] text-zinc-900 tracking-tight">{value}</p>
    {delta && <p className="mt-1 text-[12px] text-[var(--p)]">{delta}</p>}
  </Card>
);
const Avatar = ({ i = 0, size = 28 }: { i?: number; size?: number }) => {
  const tones = ["#e4e4e7", "#d4d4d8", "#cbd5e1", "#e7e5e4", "#d6d3d1"];
  return <span className="inline-block shrink-0 rounded-full" style={{ width: size, height: size, background: tones[i % tones.length] }} />;
};
const Bars = ({ values, className }: { values: number[]; className?: string }) => (
  <div className={cn("flex h-full items-end gap-1.5", className)}>
    {values.map((v, i) => (
      <div
        className="flex-1 rounded-t-[3px]"
        key={i}
        style={{ height: `${v}%`, background: i === values.length - 1 ? "var(--p)" : "color-mix(in oklab, var(--p) 28%, white)" }}
      />
    ))}
  </div>
);
const Sidebar = ({ brand, items, active = 0 }: { brand: string; items: string[]; active?: number }) => (
  <aside className="flex w-[220px] shrink-0 flex-col gap-1 border-zinc-200 border-r bg-zinc-50/70 p-4">
    <div className="mb-5 flex items-center gap-2 px-2">
      <span className="size-6 rounded-md bg-[var(--p)]" />
      <span className="font-semibold text-[15px] text-zinc-900">{brand}</span>
    </div>
    {items.map((it, i) => (
      <div
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-[13px]",
          i === active ? "bg-white font-medium text-zinc-900 shadow-sm ring-1 ring-zinc-200" : "text-zinc-500",
        )}
        key={it}
      >
        <span className={cn("size-3.5 rounded-[4px]", i === active ? "bg-[var(--p)]" : "bg-zinc-300")} />
        {it}
      </div>
    ))}
  </aside>
);
const Top = ({ title, actions }: { title: string; actions?: ReactNode }) => (
  <div className="flex items-center justify-between border-zinc-200 border-b px-6 py-4">
    <h3 className="font-semibold text-[18px] text-zinc-900">{title}</h3>
    <div className="flex items-center gap-2">{actions}</div>
  </div>
);
const Row = ({ cells, widths }: { cells: ReactNode[]; widths: string }) => (
  <div className="grid items-center gap-3 border-zinc-100 border-b px-4 py-3 text-[13px] text-zinc-700" style={{ gridTemplateColumns: widths }}>
    {cells.map((c, i) => (
      <div className="truncate" key={i}>
        {c}
      </div>
    ))}
  </div>
);
const PhoneTop = ({ title, back }: { title: string; back?: boolean }) => (
  <div className="flex items-center gap-3 px-5 pt-3 pb-3">
    {back && <span className="text-[18px] text-zinc-400">‹</span>}
    <h3 className="font-semibold text-[20px] text-zinc-900">{title}</h3>
  </div>
);
const StatusBar = () => (
  <div className="flex items-center justify-between px-6 pt-3 pb-1 font-semibold text-[12px] text-zinc-900">
    <span>9:41</span>
    <span className="flex gap-1">
      <span className="h-2.5 w-4 rounded-sm bg-zinc-900" />
      <span className="h-2.5 w-2.5 rounded-full bg-zinc-900" />
    </span>
  </div>
);

/* ───────────── screens ───────────── */

const screens: Record<ScreenId, { device: Device; url?: string; node: ReactNode }> = {
  /* Leili */
  "leili-admin-home": {
    device: "desktop",
    url: "app.leili.io/home",
    node: (
      <div className="flex h-full">
        <Sidebar active={0} brand="Leili" items={["Home", "Evaluations", "Templates", "Inspectors", "Reports"]} />
        <div className="flex-1 bg-zinc-50/40">
          <Top actions={<Btn>New evaluation</Btn>} title="Good morning, Sara" />
          <div className="grid grid-cols-4 gap-4 p-6">
            <Stat delta="6 due this week" label="Active evaluations" value="24" />
            <Stat label="Completed (30d)" value="132" />
            <Stat label="Overdue" value="3" />
            <Stat label="Inspectors in field" value="11" />
          </div>
          <div className="grid grid-cols-[1.6fr_1fr] gap-4 px-6">
            <Card className="p-0">
              <div className="flex items-center justify-between px-4 py-3">
                <p className="font-medium text-[14px] text-zinc-900">In progress</p>
                <Pill>All sites</Pill>
              </div>
              {[
                ["Kitchen hygiene · Branch 04", "Ali R.", 72, "green"],
                ["Fire safety · Warehouse B", "Neda K.", 40, "amber"],
                ["Opening checklist · Branch 11", "Reza M.", 15, "zinc"],
                ["Cold-chain audit · DC North", "Mina S.", 88, "green"],
                ["Customer area · Branch 02", "Omid T.", 5, "red"],
              ].map(([t, who, pct, tone]) => (
                <Row
                  cells={[
                    <span className="font-medium text-zinc-900" key="t">{t}</span>,
                    <span className="flex items-center gap-2" key="w"><Avatar />{who}</span>,
                    <div className="h-1.5 rounded-full bg-zinc-100" key="p"><div className="h-full rounded-full bg-[var(--p)]" style={{ width: `${pct}%` }} /></div>,
                    <Pill key="s" tone={tone as "green"}>{pct}%</Pill>,
                  ]}
                  key={t as string}
                  widths="2fr 1fr 1fr 60px"
                />
              ))}
            </Card>
            <Card>
              <p className="font-medium text-[14px] text-zinc-900">Completion, last 8 weeks</p>
              <div className="mt-4 h-[180px]">
                <Bars values={[40, 55, 48, 62, 58, 70, 66, 82]} />
              </div>
              <div className="mt-4 space-y-2">
                <Bar w={80} /><Bar w={55} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    ),
  },
  "leili-builder": {
    device: "desktop",
    url: "app.leili.io/evaluations/new",
    node: (
      <div className="flex h-full">
        <Sidebar active={1} brand="Leili" items={["Home", "Evaluations", "Templates", "Inspectors", "Reports"]} />
        <div className="flex-1">
          <Top actions={<><Btn ghost>Save draft</Btn><Btn>Continue</Btn></>} title="New evaluation" />
          <div className="flex gap-8 px-6 pt-5">
            {["Details", "Questions", "Assign"].map((s, i) => (
              <div className="flex items-center gap-2 text-[13px]" key={s}>
                <span className={cn("grid size-6 place-items-center rounded-full text-[11px]", i <= 1 ? "bg-[var(--p)] text-white" : "bg-zinc-100 text-zinc-500")}>{i + 1}</span>
                <span className={i === 1 ? "font-medium text-zinc-900" : "text-zinc-500"}>{s}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-[1fr_300px] gap-6 p-6">
            <div className="space-y-3">
              {[
                ["Yes / No", "Are fire exits clear of obstruction?"],
                ["Rating 1–5", "Rate the cleanliness of food-prep surfaces."],
                ["Photo", "Photograph the fridge temperature display."],
                ["Multiple choice", "Which PPE items are available on site?"],
              ].map(([type, q], i) => (
                <Card className={cn("flex items-start gap-4", i === 1 && "ring-2 ring-[var(--p)]")} key={q}>
                  <span className="mt-0.5 text-[12px] text-zinc-400">⋮⋮</span>
                  <div className="flex-1">
                    <Pill tone="p">{type}</Pill>
                    <p className="mt-2 text-[14px] text-zinc-900">{q}</p>
                  </div>
                  <span className="text-[12px] text-zinc-400">Required</span>
                </Card>
              ))}
              <div className="rounded-xl border border-zinc-300 border-dashed p-4 text-center text-[13px] text-zinc-500">+ Add question</div>
            </div>
            <Card>
              <p className="font-medium text-[13px] text-zinc-900">Question type</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {["Yes / No", "Rating", "Text", "Photo", "Choice", "Number"].map((t, i) => (
                  <div className={cn("rounded-lg border px-3 py-2 text-[12px]", i === 1 ? "border-[var(--p)] text-[var(--p)]" : "border-zinc-200 text-zinc-600")} key={t}>{t}</div>
                ))}
              </div>
              <div className="mt-5 space-y-2"><Bar w={90} /><Bar w={70} /><Bar w={40} /></div>
            </Card>
          </div>
        </div>
      </div>
    ),
  },
  "leili-inspector-list": {
    device: "phone",
    node: (
      <div className="h-full bg-zinc-50">
        <StatusBar />
        <PhoneTop title="My evaluations" />
        <div className="flex gap-2 px-5 pb-3"><Pill tone="p">Assigned · 4</Pill><Pill>In progress · 2</Pill><Pill>Done</Pill></div>
        <div className="space-y-3 px-4">
          <div className="rounded-2xl bg-[var(--p)] p-4 text-white">
            <p className="text-[12px] opacity-80">Continue where you left off</p>
            <p className="mt-1 font-semibold text-[16px]">Kitchen hygiene · Branch 04</p>
            <div className="mt-3 h-1.5 rounded-full bg-white/30"><div className="h-full w-[72%] rounded-full bg-white" /></div>
            <p className="mt-2 text-[12px] opacity-80">18 of 25 answered</p>
          </div>
          {["Fire safety · Warehouse B", "Opening checklist · Branch 11", "Cold-chain audit · DC North"].map((t, i) => (
            <div className="rounded-2xl bg-white p-4 ring-1 ring-zinc-200" key={t}>
              <div className="flex items-center justify-between"><Pill tone={i === 0 ? "amber" : "zinc"}>{i === 0 ? "Due today" : "Due Fri"}</Pill><span className="text-[12px] text-zinc-400">{12 + i * 4} questions</span></div>
              <p className="mt-2 font-medium text-[15px] text-zinc-900">{t}</p>
              <p className="mt-1 text-[12px] text-zinc-500">Assigned by Sara · 0.{4 + i} km away</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  "leili-question": {
    device: "phone",
    node: (
      <div className="flex h-full flex-col bg-white">
        <StatusBar />
        <PhoneTop back title="Question 19 / 25" />
        <div className="mx-5 h-1.5 rounded-full bg-zinc-100"><div className="h-full w-[76%] rounded-full bg-[var(--p)]" /></div>
        <div className="flex-1 px-5 pt-6">
          <Pill tone="p">Rating</Pill>
          <p className="mt-3 font-semibold text-[22px] text-zinc-900 leading-snug">Rate the cleanliness of food-prep surfaces.</p>
          <div className="mt-6 grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <div className={cn("grid h-14 place-items-center rounded-xl font-semibold text-[18px]", n === 4 ? "bg-[var(--p)] text-white" : "bg-zinc-100 text-zinc-600")} key={n}>{n}</div>
            ))}
          </div>
          <p className="mt-6 font-medium text-[13px] text-zinc-700">Add a note (optional)</p>
          <div className="mt-2 h-24 rounded-xl border border-zinc-200 p-3 text-[13px] text-zinc-400">Minor residue near the sink…</div>
          <div className="mt-3 flex items-center gap-2 text-[13px] text-[var(--p)]">＋ Attach photo</div>
        </div>
        <div className="flex gap-3 border-zinc-100 border-t p-4"><span className="grid h-12 flex-1 place-items-center rounded-xl border border-zinc-200 text-[14px] text-zinc-700">Back</span><span className="grid h-12 flex-[2] place-items-center rounded-xl bg-[var(--p)] font-medium text-[14px] text-white">Next question</span></div>
      </div>
    ),
  },
  "leili-review": {
    device: "phone",
    node: (
      <div className="flex h-full flex-col bg-zinc-50">
        <StatusBar />
        <PhoneTop back title="Review" />
        <div className="mx-4 rounded-2xl bg-white p-4 ring-1 ring-zinc-200">
          <div className="flex items-center gap-4">
            <div className="grid size-16 place-items-center rounded-full" style={{ background: "conic-gradient(var(--p) 0 92%, #e4e4e7 0)" }}><div className="grid size-12 place-items-center rounded-full bg-white font-semibold text-[14px]">92%</div></div>
            <div><p className="font-semibold text-[15px] text-zinc-900">23 of 25 answered</p><p className="text-[12px] text-zinc-500">2 required questions left</p></div>
          </div>
        </div>
        <div className="mt-3 space-y-2 px-4">
          {["Fire exits clear", "Prep surfaces · 4/5", "Fridge display photo", "PPE available", "Waste segregation"].map((t, i) => (
            <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3 ring-1 ring-zinc-200" key={t}>
              <span className="text-[13px] text-zinc-800">{t}</span>
              {i === 3 || i === 4 ? <Pill tone="amber">Missing</Pill> : <Pill tone="green">✓</Pill>}
            </div>
          ))}
        </div>
        <div className="mx-4 mt-auto mb-4 rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-200">
          <p className="font-semibold text-[14px] text-amber-900">Submit with 2 missing answers?</p>
          <p className="mt-1 text-[12px] text-amber-800">Required questions will be flagged for the admin.</p>
          <div className="mt-3 flex gap-2"><span className="grid h-10 flex-1 place-items-center rounded-lg bg-white text-[13px] ring-1 ring-amber-200">Go back</span><span className="grid h-10 flex-1 place-items-center rounded-lg bg-[var(--p)] text-[13px] text-white">Submit anyway</span></div>
        </div>
      </div>
    ),
  },

  /* AzMan */
  "azman-request": {
    device: "desktop",
    url: "azman.app/requests/2184",
    node: (
      <div className="flex h-full">
        <Sidebar active={1} brand="AzMan" items={["Home", "My requests", "Experts", "Messages", "Payments"]} />
        <div className="flex-1 bg-zinc-50/40">
          <Top actions={<><Pill tone="p">In progress</Pill><Btn>Message expert</Btn></>} title="Kitchen plumbing repair" />
          <div className="grid grid-cols-[1.3fr_1fr] gap-5 p-6">
            <div className="space-y-4">
              <Card>
                <p className="text-[12px] text-zinc-500">Request #2184 · Tehran, District 3 · Tomorrow 10:00–12:00</p>
                <p className="mt-2 text-[14px] text-zinc-800 leading-relaxed">Leak under the kitchen sink, water reaching the cabinet floor. Photos attached.</p>
                <div className="mt-3 flex gap-2">{[0, 1, 2].map((i) => <span className="size-16 rounded-lg bg-zinc-100" key={i} />)}</div>
              </Card>
              <Card>
                <p className="font-medium text-[14px]">Progress</p>
                <div className="mt-4 flex items-center">
                  {["Requested", "Matched", "Scheduled", "Done", "Reviewed"].map((s, i) => (
                    <div className="flex flex-1 items-center" key={s}>
                      <div className="flex flex-col items-center gap-2">
                        <span className={cn("grid size-7 place-items-center rounded-full text-[11px]", i < 3 ? "bg-[var(--p)] text-white" : "bg-zinc-100 text-zinc-400")}>{i < 3 ? "✓" : i + 1}</span>
                        <span className="text-[11px] text-zinc-500">{s}</span>
                      </div>
                      {i < 4 && <span className={cn("mx-1 mb-5 h-0.5 flex-1", i < 2 ? "bg-[var(--p)]" : "bg-zinc-200")} />}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
            <Card className="p-0">
              <p className="px-4 pt-4 font-medium text-[14px]">Matched experts</p>
              {[["Reza K.", "4.9 · 212 jobs", true], ["Maryam S.", "4.8 · 96 jobs", false], ["Hossein T.", "4.7 · 340 jobs", false]].map(([n, r, chosen], i) => (
                <div className={cn("flex items-center gap-3 border-zinc-100 border-b px-4 py-3", chosen && "bg-[color-mix(in_oklab,var(--p)_7%,white)]")} key={n as string}>
                  <Avatar i={i} size={36} />
                  <div className="flex-1"><p className="font-medium text-[13px]">{n}</p><p className="text-[12px] text-zinc-500">★ {r}</p></div>
                  {chosen ? <Pill tone="p">Assigned</Pill> : <Btn ghost>View</Btn>}
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    ),
  },
  "hamgam-calls": {
    device: "desktop",
    url: "hamgam.app/calls",
    node: (
      <div className="flex h-full">
        <Sidebar active={0} brand="Hamgam Saz" items={["Call reports", "Follow-ups", "Contacts", "Privacy", "Team"]} />
        <div className="grid flex-1 grid-cols-[1fr_340px]">
          <div>
            <Top actions={<><Pill>This week</Pill><Btn>Log a call</Btn></>} title="Call reports" />
            <Row cells={["Contact", "Agent", "Outcome", "Follow-up"]} widths="1.6fr 1fr 1fr 1fr" />
            {[["Shirin A.", "Mina", "Interested", "Tue", "green"], ["Pars Co.", "Ali", "Call back", "Today", "amber"], ["Kaveh N.", "Mina", "No answer", "Wed", "zinc"], ["Atlas Ltd", "Sara", "Closed", "—", "green"], ["Nazanin R.", "Ali", "Needs quote", "Thu", "amber"], ["Behnam F.", "Sara", "Do not call", "—", "red"]].map(([c, a, o, f, t], i) => (
              <div className={cn(i === 1 && "bg-[color-mix(in_oklab,var(--p)_6%,white)]")} key={c}>
                <Row cells={[<span className="font-medium text-zinc-900" key="c">{c}</span>, a, <Pill key="o" tone={t as "green"}>{o}</Pill>, f]} widths="1.6fr 1fr 1fr 1fr" />
              </div>
            ))}
          </div>
          <div className="border-zinc-200 border-l bg-zinc-50/60 p-5">
            <div className="flex items-center gap-3"><Avatar size={40} /><div><p className="font-semibold text-[15px]">Pars Co.</p><p className="text-[12px] text-zinc-500">Contact history · 7 calls</p></div></div>
            <div className="mt-5 space-y-4 border-zinc-200 border-l pl-4">
              {[["Today 11:20", "Asked to call back after 4pm"], ["Mon 15:05", "Sent price list by email"], ["12 Oct", "First call, interested in annual plan"]].map(([t, e]) => (
                <div className="relative" key={t}><span className="absolute top-1.5 -left-[21px] size-2.5 rounded-full bg-[var(--p)]" /><p className="text-[12px] text-zinc-500">{t}</p><p className="text-[13px]">{e}</p></div>
              ))}
            </div>
            <Card className="mt-5"><p className="text-[12px] text-zinc-500">Next follow-up</p><p className="mt-1 font-medium text-[14px]">Today, 16:30 · Ali</p><div className="mt-3 flex gap-2"><Btn>Mark done</Btn><Btn ghost>Reschedule</Btn></div></Card>
            <p className="mt-4 flex items-center gap-2 text-[12px] text-zinc-500"><span className="size-2 rounded-full bg-emerald-500" /> Synced · number masked for privacy</p>
          </div>
        </div>
      </div>
    ),
  },
  "erp-access": {
    device: "desktop",
    url: "erp.azman.app/people/roles",
    node: (
      <div className="flex h-full">
        <Sidebar active={1} brand="ERP" items={["People", "Roles & access", "Documents", "Contracts", "Guarantees"]} />
        <div className="flex-1">
          <Top actions={<><Btn ghost>Scopes</Btn><Btn>New role</Btn></>} title="Roles & access" />
          <div className="grid grid-cols-[240px_1fr]">
            <div className="border-zinc-200 border-r p-3">
              {["Operations manager", "Branch supervisor", "HR officer", "Finance reviewer", "Field staff"].map((r, i) => (
                <div className={cn("rounded-lg px-3 py-2.5 text-[13px]", i === 1 ? "bg-[color-mix(in_oklab,var(--p)_10%,white)] font-medium text-[var(--p)]" : "text-zinc-600")} key={r}>{r}</div>
              ))}
            </div>
            <div className="p-5">
              <p className="font-semibold text-[16px]">Branch supervisor</p>
              <p className="text-[12px] text-zinc-500">Scope: Branches 3, 4, 11 · 14 people</p>
              <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200">
                <div className="grid grid-cols-[1.6fr_repeat(4,1fr)] bg-zinc-50 px-4 py-2 text-[12px] text-zinc-500"><span>Area</span><span>View</span><span>Create</span><span>Approve</span><span>Export</span></div>
                {["People records", "Documents", "Contracts", "Guarantees", "Permissions", "Org access"].map((a, i) => (
                  <div className="grid grid-cols-[1.6fr_repeat(4,1fr)] items-center border-zinc-100 border-t px-4 py-2.5 text-[13px]" key={a}>
                    <span>{a}</span>
                    {[0, 1, 2, 3].map((c) => {
                      const on = c === 0 || (c === 1 && i < 4) || (c === 2 && i === 1);
                      return <span className={cn("grid size-5 place-items-center rounded-md text-[11px]", on ? "bg-[var(--p)] text-white" : "border border-zinc-300")} key={c}>{on ? "✓" : ""}</span>;
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  /* Tamdid */
  "tamdid-home": {
    device: "phone",
    node: (
      <div className="flex h-full flex-col bg-zinc-50">
        <StatusBar />
        <div className="px-5 pt-3 pb-4"><p className="text-[13px] text-zinc-500">This month</p><p className="font-semibold text-[32px] tracking-tight">$84.20</p><p className="text-[12px] text-[var(--p)]">6 subscriptions · 2 renew this week</p></div>
        <div className="mx-4 rounded-2xl bg-[var(--p)] p-4 text-white">
          <div className="flex items-center justify-between"><p className="text-[12px] opacity-85">Wallet</p><span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px]">🔥 12-day streak</span></div>
          <p className="mt-1 font-semibold text-[22px]">$46.50</p>
          <div className="mt-3 flex gap-2"><span className="rounded-lg bg-white px-3 py-1.5 font-medium text-[12px] text-[var(--p)]">Top up</span><span className="rounded-lg bg-white/15 px-3 py-1.5 text-[12px]">Pay renewals</span></div>
        </div>
        <p className="mt-5 px-5 font-medium text-[14px]">Upcoming renewals</p>
        <div className="mt-2 space-y-2 px-4">
          {[["Music Plus", "Tomorrow", "$4.99"], ["Cloud 200GB", "Thu", "$2.99"], ["Video Premium", "Mar 28", "$11.99"], ["News Daily", "Apr 2", "$6.00"]].map(([n, d, p], i) => (
            <div className="flex items-center gap-3 rounded-xl bg-white px-3 py-3 ring-1 ring-zinc-200" key={n}>
              <span className="size-9 rounded-lg" style={{ background: ["#18181b", "#93c5fd", "#fca5a5", "#d4d4d8"][i] }} />
              <div className="flex-1"><p className="text-[14px]">{n}</p><p className="text-[12px] text-zinc-500">Renews {d}</p></div>
              <p className="font-medium text-[14px]">{p}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  "tamdid-sub": {
    device: "phone",
    node: (
      <div className="flex h-full flex-col bg-white">
        <StatusBar />
        <PhoneTop back title="Music Plus" />
        <div className="mx-5 flex items-center gap-4 rounded-2xl bg-zinc-50 p-4"><span className="size-14 rounded-xl bg-zinc-900" /><div><p className="font-semibold text-[18px]">$4.99 / month</p><p className="text-[12px] text-zinc-500">Individual plan · since Jan 2025</p></div></div>
        <div className="mx-5 mt-5 space-y-3">
          {[["Next renewal", "Tomorrow"], ["Pay from", "Tamdid wallet"], ["Reminder", "2 days before"]].map(([k, v]) => <div className="flex justify-between border-zinc-100 border-b pb-3 text-[14px]" key={k}><span className="text-zinc-500">{k}</span><span className="font-medium">{v}</span></div>)}
          <div className="flex items-center justify-between text-[14px]"><span className="text-zinc-500">Auto-renew</span><span className="flex h-6 w-11 items-center rounded-full bg-[var(--p)] px-0.5"><span className="ml-auto size-5 rounded-full bg-white" /></span></div>
        </div>
        <p className="mx-5 mt-6 font-medium text-[14px]">Last 6 months</p>
        <div className="mx-5 mt-2 h-24"><Bars values={[60, 60, 60, 60, 60, 60]} /></div>
        <div className="mx-5 mt-auto mb-8 grid grid-cols-2 gap-2"><span className="grid h-12 place-items-center rounded-xl ring-1 ring-zinc-200 text-[14px]">Pause</span><span className="grid h-12 place-items-center rounded-xl bg-red-50 text-[14px] text-red-600">Cancel</span></div>
      </div>
    ),
  },
  "tamdid-wallet": {
    device: "phone",
    node: (
      <div className="flex h-full flex-col bg-zinc-50">
        <StatusBar />
        <PhoneTop title="Wallet" />
        <div className="mx-4 rounded-3xl bg-zinc-900 p-5 text-white"><p className="text-[12px] text-white/60">Balance</p><p className="mt-1 font-semibold text-[34px] tracking-tight">$46.50</p><div className="mt-4 h-1.5 rounded-full bg-white/15"><div className="h-full w-[55%] rounded-full bg-[var(--p)]" /></div><p className="mt-2 text-[12px] text-white/60">Covers renewals until Apr 8</p></div>
        <div className="mx-4 mt-4 grid grid-cols-3 gap-2">{["$10", "$25", "$50"].map((v, i) => <div className={cn("rounded-xl py-3 text-center font-medium text-[14px]", i === 1 ? "bg-[var(--p)] text-white" : "bg-white ring-1 ring-zinc-200")} key={v}>{v}</div>)}</div>
        <p className="mt-5 px-5 font-medium text-[14px]">Activity</p>
        <div className="mt-2 space-y-2 px-4">
          {[["Top up", "+$25.00", "Today"], ["Video Premium", "−$11.99", "Mar 1"], ["Cashback reward", "+$1.20", "Feb 27"], ["Cloud 200GB", "−$2.99", "Feb 24"]].map(([n, v, d]) => (
            <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3 ring-1 ring-zinc-200" key={n}><div><p className="text-[14px]">{n}</p><p className="text-[12px] text-zinc-500">{d}</p></div><p className={cn("font-medium text-[14px]", v.startsWith("+") && "text-emerald-600")}>{v}</p></div>
          ))}
        </div>
      </div>
    ),
  },
  "tamdid-pay": {
    device: "phone",
    node: (
      <div className="flex h-full flex-col bg-white">
        <StatusBar />
        <PhoneTop back title="Pay renewal" />
        <div className="mx-5 mt-4 text-center"><span className="mx-auto block size-16 rounded-2xl bg-zinc-900" /><p className="mt-3 font-semibold text-[18px]">Music Plus</p><p className="mt-1 font-semibold text-[40px] tracking-tight">$4.99</p></div>
        <div className="mx-5 mt-6 space-y-2">
          {[["Tamdid wallet", "$46.50 available", true], ["Bank card ••42", "Fee may apply", false]].map(([n, d, on]) => (
            <div className={cn("flex items-center gap-3 rounded-xl px-4 py-3", on ? "ring-2 ring-[var(--p)]" : "ring-1 ring-zinc-200")} key={n as string}><span className={cn("size-4 rounded-full", on ? "border-[5px] border-[var(--p)]" : "border-2 border-zinc-300")} /><div><p className="text-[14px]">{n}</p><p className="text-[12px] text-zinc-500">{d}</p></div></div>
          ))}
        </div>
        <div className="mx-5 mt-5 rounded-xl bg-[color-mix(in_oklab,var(--p)_10%,white)] p-3 text-[13px] text-[var(--p)]">+20 points and your streak continues 🔥</div>
        <div className="mx-5 mt-auto mb-8 grid h-14 place-items-center rounded-2xl bg-[var(--p)] font-semibold text-[16px] text-white">Pay $4.99</div>
      </div>
    ),
  },
  "tamdid-rewards": {
    device: "phone",
    node: (
      <div className="flex h-full flex-col bg-[color-mix(in_oklab,var(--p)_8%,white)]">
        <StatusBar />
        <PhoneTop title="Rewards" />
        <div className="mx-4 rounded-2xl bg-white p-5 text-center ring-1 ring-zinc-200">
          <div className="mx-auto grid size-24 place-items-center rounded-full" style={{ background: "conic-gradient(var(--p) 0 68%, #e4e4e7 0)" }}><div className="grid size-[76px] place-items-center rounded-full bg-white"><p className="font-semibold text-[22px]">Lv 4</p></div></div>
          <p className="mt-3 font-semibold text-[16px]">Smart Saver</p><p className="text-[12px] text-zinc-500">320 points to Level 5</p>
        </div>
        <p className="mt-5 px-5 font-medium text-[14px]">This week</p>
        <div className="mx-4 mt-2 grid grid-cols-7 gap-1.5">{["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <div className={cn("rounded-lg py-2 text-center text-[12px]", i < 5 ? "bg-[var(--p)] text-white" : "bg-white text-zinc-400 ring-1 ring-zinc-200")} key={i}>{d}<br />{i < 5 ? "🔥" : "·"}</div>)}</div>
        <p className="mt-5 px-5 font-medium text-[14px]">Badges</p>
        <div className="mx-4 mt-2 grid grid-cols-3 gap-2">{[["🎯", "On time"], ["💡", "Cut a sub"], ["🏆", "30 days"]].map(([e, n], i) => <div className={cn("rounded-xl bg-white p-3 text-center ring-1 ring-zinc-200", i === 2 && "opacity-40")} key={n}><p className="text-[24px]">{e}</p><p className="mt-1 text-[11px] text-zinc-600">{n}</p></div>)}</div>
      </div>
    ),
  },

  /* Novaday: Kudos & Remeet */
  "kudos-panel": {
    device: "desktop",
    url: "panel.kudos.ir",
    node: (
      <div className="flex h-full">
        <Sidebar active={0} brand="Kudos" items={["Overview", "Members", "Recognition", "Rewards", "Settings"]} />
        <div className="flex-1 bg-zinc-50/40">
          <Top actions={<><Pill>Last 30 days</Pill><Btn>Invite members</Btn></>} title="Overview" />
          <div className="grid grid-cols-4 gap-4 p-6">
            <Stat label="Active members" value="1,284" />
            <Stat label="Recognitions sent" value="3,902" />
            <Stat label="Teams" value="42" />
            <Stat label="Rewards redeemed" value="317" />
          </div>
          <div className="grid grid-cols-[1.5fr_1fr] gap-4 px-6">
            <Card className="p-0">
              <p className="px-4 pt-4 font-medium text-[14px]">Members</p>
              <Row cells={["Name", "Team", "Role", "Status"]} widths="1.6fr 1fr 1fr 90px" />
              {[["Sara M.", "Design", "Admin", "green"], ["Omid K.", "Sales", "Member", "green"], ["Lena R.", "Support", "Member", "amber"], ["Arash T.", "Engineering", "Manager", "green"], ["Niloo F.", "HR", "Admin", "zinc"]].map(([n, t, r, s], i) => (
                <Row cells={[<span className="flex items-center gap-2" key="n"><Avatar i={i} />{n}</span>, t, r, <Pill key="s" tone={s as "green"}>{s === "green" ? "Active" : s === "amber" ? "Invited" : "Paused"}</Pill>]} key={n} widths="1.6fr 1fr 1fr 90px" />
              ))}
            </Card>
            <Card>
              <p className="font-medium text-[14px]">Recognition by week</p>
              <div className="mt-4 h-[200px]"><Bars values={[45, 60, 52, 70, 64, 78, 72, 88]} /></div>
            </Card>
          </div>
        </div>
      </div>
    ),
  },
  "remeet-booking": {
    device: "desktop",
    url: "remeet.ir/rooms",
    node: (
      <div className="flex h-full">
        <Sidebar active={0} brand="Remeet" items={["Rooms", "My bookings", "Access", "Visitors", "Reports"]} />
        <div className="flex-1">
          <Top actions={<><Pill tone="green">● Outlook synced</Pill><Btn>Book a room</Btn></>} title="Rooms · Tuesday" />
          <div className="grid grid-cols-[120px_repeat(9,1fr)] text-[12px]">
            <div className="border-zinc-200 border-b" />
            {Array.from({ length: 9 }, (_, i) => <div className="border-zinc-200 border-b border-l px-2 py-2 text-zinc-400" key={i}>{9 + i}:00</div>)}
            {[["Atrium", [[0, 2, "Weekly sync"], [4, 1, "1:1"]]], ["Room 2", [[1, 3, "Client workshop"]]], ["Room 3", [[3, 2, "Interview"], [6, 2, "Design review"]]], ["Focus 1", [[0, 1, "Call"], [5, 1, "Call"]]], ["Board", [[2, 4, "Quarterly planning"]]]].map(([room, slots], r) => (
              <div className="contents" key={room as string}>
                <div className="border-zinc-100 border-b px-3 py-5 font-medium text-zinc-700">{room as string}</div>
                <div className="relative col-span-9 border-zinc-100 border-b">
                  {(slots as [number, number, string][]).map(([s, len, t]) => (
                    <div className={cn("absolute inset-y-2 rounded-md px-2 py-1", r === 1 ? "bg-[var(--p)] text-white" : "bg-[color-mix(in_oklab,var(--p)_14%,white)] text-[var(--p)]")} key={t + s} style={{ left: `${(s / 9) * 100}%`, width: `${(len / 9) * 100}%` }}>
                      <p className="truncate font-medium">{t}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="m-6 flex items-center gap-4 rounded-xl border border-zinc-200 p-4">
            <span className="grid size-10 place-items-center rounded-lg bg-[color-mix(in_oklab,var(--p)_12%,white)] text-[var(--p)]">⌘</span>
            <div className="flex-1"><p className="font-medium text-[14px]">Client workshop · Room 2</p><p className="text-[12px] text-zinc-500">10:00–13:00 · 8 guests · invite sent from Outlook</p></div>
            <Pill>EN · FA</Pill>
          </div>
        </div>
      </div>
    ),
  },
  "remeet-access": {
    device: "phone",
    node: (
      <div className="flex h-full flex-col items-center bg-zinc-950 px-6 text-white">
        <StatusBar />
        <p className="mt-10 text-[13px] text-white/60">Room 2 · Client workshop</p>
        <p className="mt-1 font-semibold text-[24px]">Check in</p>
        <div className="relative mt-12 grid size-48 place-items-center rounded-full border border-white/10">
          <div className="absolute inset-4 rounded-full border border-[var(--p)]/50" />
          <div className="grid size-28 place-items-center rounded-full bg-[var(--p)]/20">
            <svg className="size-16 text-[var(--p)]" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M12 11c0 3-1 6-3 8M8 6.5A6 6 0 0 1 18 11c0 2-.3 4-1 6M5 9.5A8 8 0 0 0 4 13M12 7a4 4 0 0 1 4 4c0 1.5-.2 3-.6 4.3M8 11a4 4 0 0 1 .5-2" strokeLinecap="round" /></svg>
          </div>
        </div>
        <p className="mt-8 text-center text-[14px] text-white/70">Place your finger on the reader, or tap your RFID card</p>
        <div className="mt-auto mb-8 flex w-full gap-2"><span className="grid h-12 flex-1 place-items-center rounded-xl bg-white/10 text-[13px]">Use RFID card</span><span className="grid h-12 flex-1 place-items-center rounded-xl bg-white/10 text-[13px]">فارسی</span></div>
      </div>
    ),
  },

  /* Studio Kaaryar */
  "kaaryar-home": {
    device: "desktop",
    url: "studio.kaaryar.ir",
    node: (
      <div className="h-full bg-[#fbf8f6]">
        <div className="flex items-center justify-between px-10 py-6">
          <span className="font-bold text-[20px]">Kaaryar <span className="text-[var(--p)]">Studio</span></span>
          <div className="flex items-center gap-8 text-[14px] text-zinc-600"><span>Projects</span><span>Services</span><span>About</span><span>Journal</span><Btn>Start a project</Btn></div>
        </div>
        <div className="grid grid-cols-[1.1fr_1fr] gap-10 px-10 pt-10">
          <div>
            <Pill tone="p">Design for social impact</Pill>
            <p className="mt-6 font-bold text-[64px] leading-[1.02] tracking-tight">Design that works for people who need it most.</p>
            <p className="mt-6 max-w-[460px] text-[17px] text-zinc-600 leading-relaxed">We’re a studio designing products and services with communities, nonprofits and public teams.</p>
            <div className="mt-8 flex gap-3"><Btn>See our work</Btn><Btn ghost>How we work</Btn></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="row-span-2 rounded-3xl bg-[var(--p)]" />
            <div className="rounded-3xl bg-[color-mix(in_oklab,var(--p)_25%,white)]" />
            <div className="rounded-3xl bg-zinc-900 p-5 text-white"><p className="font-bold text-[34px]">Stories</p><p className="text-[13px] text-white/60">from the field</p></div>
          </div>
        </div>
      </div>
    ),
  },
  "kaaryar-projects": {
    device: "desktop",
    url: "studio.kaaryar.ir/projects",
    node: (
      <div className="h-full bg-[#fbf8f6] px-10 py-8">
        <p className="font-bold text-[44px] tracking-tight">Projects</p>
        <div className="mt-4 flex gap-2">{["All", "Education", "Health", "Civic", "Nonprofit"].map((f, i) => <span className={cn("rounded-full px-4 py-1.5 text-[13px]", i === 0 ? "bg-zinc-900 text-white" : "bg-white ring-1 ring-zinc-200")} key={f}>{f}</span>)}</div>
        <div className="mt-6 grid grid-cols-3 gap-5">
          {["Learning platform for rural schools", "Clinic visit booking", "Volunteer matching", "City feedback service", "Donation journeys", "Youth skills program"].map((t, i) => (
            <div key={t}>
              <div className="h-[180px] rounded-2xl" style={{ background: i % 3 === 0 ? "var(--p)" : i % 3 === 1 ? "color-mix(in oklab, var(--p) 22%, white)" : "#27272a" }} />
              <p className="mt-3 font-semibold text-[16px]">{t}</p>
              <p className="text-[13px] text-zinc-500">{["Education", "Health", "Nonprofit", "Civic", "Nonprofit", "Education"][i]} · Case study</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  "kaaryar-mobile": {
    device: "phone",
    node: (
      <div className="flex h-full flex-col bg-[#fbf8f6]">
        <StatusBar />
        <div className="flex items-center justify-between px-5 py-3"><span className="font-bold text-[17px]">Kaaryar <span className="text-[var(--p)]">Studio</span></span><span className="text-[20px]">☰</span></div>
        <div className="px-5 pt-4"><Pill tone="p">Design for social impact</Pill><p className="mt-4 font-bold text-[34px] leading-[1.05] tracking-tight">Design that works for people who need it most.</p><p className="mt-4 text-[15px] text-zinc-600 leading-relaxed">Products and services designed with communities and nonprofits.</p></div>
        <div className="mx-5 mt-6 h-40 rounded-3xl bg-[var(--p)]" />
        <div className="mx-5 mt-auto mb-8 grid h-14 place-items-center rounded-2xl bg-zinc-900 font-semibold text-[15px] text-white">See our work</div>
      </div>
    ),
  },
};

/* ───────────── frames ───────────── */

const SIZES: Record<Device, [number, number]> = { desktop: [1280, 800], tablet: [1024, 720], phone: [375, 780] };

export function Screen({ id, hue, className }: { id: ScreenId; hue: string; className?: string }) {
  const s = screens[id];
  const [w, h] = SIZES[s.device];
  const style = { "--p": hue } as CSSProperties;

  if (s.device === "phone") {
    return (
      <div className={cn("mx-auto w-full max-w-[300px] rounded-[2.6rem] bg-zinc-900 p-2.5 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.35)]", className)} style={style}>
        <div className="overflow-hidden rounded-[2.1rem] bg-white font-sans text-zinc-900">
          <Fit h={h} w={w}>{s.node}</Fit>
        </div>
      </div>
    );
  }
  if (s.device === "tablet") {
    return (
      <div className={cn("w-full rounded-[1.8rem] bg-zinc-900 p-3 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.35)]", className)} style={style}>
        <div className="overflow-hidden rounded-[1.1rem] bg-white font-sans text-zinc-900">
          <Fit h={h} w={w}>{s.node}</Fit>
        </div>
      </div>
    );
  }
  return (
    <div className={cn("w-full overflow-hidden rounded-xl bg-white font-sans text-zinc-900 shadow-[0_30px_60px_-24px_rgb(0_0_0/0.3)] ring-1 ring-black/10", className)} style={style}>
      <div className="flex items-center gap-2 border-zinc-200 border-b bg-zinc-100 px-3 py-2">
        <span className="size-2.5 rounded-full bg-zinc-300" /><span className="size-2.5 rounded-full bg-zinc-300" /><span className="size-2.5 rounded-full bg-zinc-300" />
        <span className="ml-3 truncate rounded-md bg-white px-3 py-0.5 text-[11px] text-zinc-500">{s.url}</span>
      </div>
      <Fit h={h - 40} w={w}>{s.node}</Fit>
    </div>
  );
}

export const deviceOf = (id: ScreenId) => screens[id].device;
