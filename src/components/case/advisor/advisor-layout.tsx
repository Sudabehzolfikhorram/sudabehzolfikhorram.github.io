// Sarmayeh-Gozin (investment advisor) for Algonet: a before/after case study.
// Built from the project record only (brief, ~27 feedback rounds, the repo and
// the source HTML demo). All projects, amounts and returns on the screens are
// sample data, and contact details are blurred.

import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import type { CaseStudy } from "@/lib/case-studies";
import { cn } from "@/lib/utils";
import { wrap } from "../blocks";
import { BeforeAfter, type PageTab, PageSwitcher, TwinScroll } from "../novin/interactive";
import { ReadingProgress } from "../novin/reading-progress";

const IMG = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/work/advisor`;
const TEAL = "#00ADAB";
const TEAL_TEXT = "#007A78";
const BLUE = "#1E40AF";
/** The live demo on GitHub Pages. Left empty, the call-to-action buttons are hidden. */
const DEMO_URL = "https://sudabehzolfikhorram.github.io/Investment_Advisor/";

const DemoLink = ({ className }: { className?: string }) =>
  DEMO_URL ? (
    <a className={cn("inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium text-white transition hover:brightness-110", className)} href={DEMO_URL} rel="noreferrer" style={{ background: "#005D5C" }} target="_blank">
      View the live demo
      <svg aria-hidden className="size-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 16 16"><path d="M5 11L11 5M6 5h5v5" /></svg>
    </a>
  ) : null;

const Chapter = ({ n, label, title, children, dark }: { n: string; label: string; title: React.ReactNode; children?: React.ReactNode; dark?: boolean }) => (
  <Reveal className="grid gap-6 lg:grid-cols-12">
    <div className="lg:col-span-7">
      <p className={cn("font-mono text-[0.78rem] uppercase tracking-[0.06em]", dark ? "text-[#7fe0de]" : "text-ink-soft")}>
        <span className={dark ? "text-white" : "text-signal"}>{n}</span> — {label}
      </p>
      <h2 className="mt-4 font-display text-4xl leading-[1.05] sm:text-5xl">{title}</h2>
    </div>
    {children && <div className={cn("self-end leading-relaxed lg:col-span-4 lg:col-start-9", dark ? "text-white/70" : "text-ink-soft")}>{children}</div>}
  </Reveal>
);

/* ───────────── content ───────────── */

const audit = [
  { where: "Recommendation flow", problem: "Four steps and 15 to 25 fields before a single project appears.", impact: "Visitors have to commit before they see anything worth committing to." },
  { where: "Field weight", problem: "Optional fields look exactly like the essential ones.", impact: "Everything feels required, so the form feels longer than it is." },
  { where: "Entry points", problem: "Three doors (explore, advise, introduce) into overlapping lists, and about ten separate forms.", impact: "The same answer can be reached in several ways, none of them obvious." },
  { where: "Search", problem: "Province and project group are single-select dropdowns.", impact: "An investor open to three provinces has to search three times." },
  { where: "Project detail", problem: "Details open in a dialog over the list.", impact: "A dossier people read and compare is squeezed into a pop-up." },
  { where: "Saved items", problem: "Picks and drafts live only in one browser.", impact: "Nothing follows a visitor who comes back on another day or device." },
];

const decisions = [
  {
    title: "Results first, optional fields later",
    body: "Only route and amount are required. Results open straight away, and every optional field moves into an advanced filter beside them. A four-step intake and a one-sentence intake were both built and then removed.",
  },
  {
    title: "Keep every field, improve the component",
    body: "Nothing from the demo was dropped: 8 routes, 11 project groups, 78 subtypes and every standalone form. Province and city became multi-select, amounts became ranges. Merging categories was tried and reversed because it lost data.",
  },
  {
    title: "Explain every match",
    body: "Each project shows a match percentage with what fits, what doesn’t and what is unknown. An unknown value is never counted as zero; it gets half the score and a “needs review” label.",
  },
  {
    title: "Open site, login only to save",
    body: "No registration wall. Login is a small dialog that appears only when someone saves a project or a set of conditions, so they can come back to new matches later.",
  },
  {
    title: "A people contact, not a form",
    body: "Every project ends with the expert’s name and mobile, in the open. When a project has no expert, a guide file takes their place.",
  },
];

const copy = [
  { part: "Eyebrow", before: "Capital, expertise and assets, on the path to creating value", after: "Investment advisor" },
  { part: "Headline", before: "Become a partner in building the future.", after: "Take your capital in the right direction." },
  { part: "Subheadline", before: "Discover opportunities for investment, project delivery and asset development.", after: "Tell us what you want, and we’ll show you matching projects with a match percentage." },
  { part: "Main action", before: "Discover collaboration opportunities", after: "Get suggestions" },
];

const filterSummary: [string, string, string][] = [
  ["Location", "One province, then one city, in dropdowns", "Several provinces and cities, with project counts"],
  ["Project type", "Group first, then type, in two dropdowns", "11 groups and 78 subtypes in one searchable picker"],
  ["Budget", "Numbers typed into the questionnaire", "A range with a histogram, slider and presets"],
  ["Applying", "Fill in the form, then press “show”", "Results first; every change applies instantly"],
  ["Optional fields", "Mixed in with the essentials", "In an advanced panel beside the results"],
];

type Shot = { img?: string; alt?: string; mock?: [string, string][]; text: string };
const filterChallenges: { title: string; why: string; before: Shot; after: { img: string; alt: string; points: string[] } }[] = [
  {
    title: "Filters stood between people and the projects.",
    why: "Direct search opened on a form of seven fields and a submit button, and the list below stayed empty until it was sent. Nothing showed whether a choice would leave ten projects or none.",
    before: { img: "old-catalog", alt: "The demo’s direct search: a form of dropdowns and a submit button above the project cards", text: "Seven fields, three buttons, then results. Changing one filter meant submitting again." },
    after: {
      img: "new-results",
      alt: "The redesigned projects page: four filters in a top bar, results in a grid and an advanced filter panel beside them",
      points: ["Results open first; the four basic filters sit in one bar above them.", "Optional fields fold into an advanced panel beside the results.", "Every change applies instantly and updates the count.", "Filters can be saved and come back later."],
    },
  },
  {
    title: "Location was one province at a time.",
    why: "Province and city were single-select dropdowns, and the city list stayed empty until a province was picked. An investor open to three provinces had to run three searches.",
    before: { img: "old-step", alt: "The demo’s questionnaire step with single-select dropdowns for project group, type, province and city", text: "Dependent single-select dropdowns: “choose a province first”." },
    after: {
      img: "new-location",
      alt: "The location filter open, with Isfahan, Tehran and Fars selected and shown as removable chips above the results",
      points: ["Multi-select with a search box, and project counts beside each province.", "Choices appear as chips above the results, each removable in one click.", "The bar summarises the selection: “Isfahan, Fars, Tehran”.", "Per the brief’s own example: single-select became multi-select."],
    },
  },
  {
    title: "78 project types behind two dropdowns.",
    why: "Every one of the 11 groups and 78 subtypes had to stay, but in the demo they lived in two dependent lists. You could not see what a group contained without opening it, and merging categories to shorten the list lost data.",
    before: { mock: [["Project group", "All groups"], ["Project type", "Choose a group first"]], text: "A second dropdown that stays disabled until the first is set." },
    after: {
      img: "new-type",
      alt: "The project type picker: groups with photos on one side, subtypes with descriptions as checkable cards on the other",
      points: ["Groups with a photo on one side, their subtypes as cards on the other.", "Hover a group to preview it; select a whole group in one tick.", "One search box across all types, such as “hotel” or “metro”.", "Nothing merged or dropped: all 78 subtypes kept."],
    },
  },
  {
    title: "Budget without a sense of scale.",
    why: "Amounts were typed as single numbers inside the questionnaire, and direct search had no budget filter at all. Nobody could tell which amount would still leave projects to look at.",
    before: { mock: [["Maximum deposit · billion toman", "5"], ["Sort", "Lowest amount in this route"]], text: "One typed number per question, and sorting in place of filtering." },
    after: {
      img: "new-budget",
      alt: "The budget filter: from and to fields, a histogram of projects by amount, a slider and four presets with project counts",
      points: ["From and to fields, with a slider underneath.", "A histogram shows where projects sit before you choose.", "Four presets, each with its project count.", "A live line: how many projects have a price in this range."],
    },
  },
];

const DropdownMock = ({ fields }: { fields: [string, string][] }) => (
  <div aria-hidden className="space-y-4 rounded-xl border border-rule bg-white p-6 text-[#2F3533]">
    {fields.map(([label, value]) => (
      <div key={label}>
        <p className="font-medium text-xs">{label}</p>
        <div className={cn("mt-1.5 flex items-center justify-between rounded-md border px-3 py-2.5 text-sm", value.startsWith("Choose") ? "border-[#e2e6e9] bg-[#f4f6f8] text-[#9aa3a8]" : "border-[#cfd5da]")}>
          {value}
          {!/^\d/.test(value) && <svg className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 16 16"><path d="M4 6l4 4 4-4" /></svg>}
        </div>
      </div>
    ))}
    <p className="pt-1 font-mono text-[0.65rem] text-[#9aa3a8]">Recreated in English from the demo</p>
  </div>
);

const earlyMix = [
  { hex: "#0F766E", w: 30 },
  { hex: "#083B37", w: 22 },
  { hex: "#00ADAB", w: 16 },
  { hex: "#F3F7F6", w: 18, dark: true },
  { hex: "#FF785A", w: 8 },
  { hex: "#262C33", w: 6 },
];
const finalMix = [
  { hex: "#F8FAFC", w: 46, dark: true },
  { hex: "#FFFFFF", w: 20, dark: true },
  { hex: "#2F3533", w: 16 },
  { hex: "#00ADAB", w: 8, dark: true },
  { hex: "#1E40AF", w: 7 },
  { hex: "#E0603F", w: 3 },
];

const roles: { hex: string; ratio: number; role: string; rule: string; sample: React.ReactNode }[] = [
  {
    hex: "#00ADAB",
    ratio: 2.78,
    role: "Primary · main actions",
    rule: "One main action per view, as a fill with a bold white label. Never for body text.",
    sample: <span className="rounded-full px-5 py-2.5 font-semibold text-[0.95rem] text-white" style={{ background: "#00ADAB" }}>Get suggestions</span>,
  },
  {
    hex: "#007A78",
    ratio: 5.18,
    role: "Primary · text",
    rule: "Teal links and labels on light surfaces, dark enough to read.",
    sample: <span className="font-medium text-sm underline underline-offset-4" style={{ color: "#007A78" }}>See all projects →</span>,
  },
  {
    hex: "#005D5C",
    ratio: 7.72,
    role: "Dark actions",
    rule: "Strong buttons such as login, in deep teal instead of black.",
    sample: <span className="rounded-full px-5 py-2.5 font-medium text-sm text-white" style={{ background: "#005D5C" }}>Log in</span>,
  },
  {
    hex: "#1E40AF",
    ratio: 8.72,
    role: "Secondary · selection, focus, data",
    rule: "Whatever the user has chosen, and the bars in charts.",
    sample: (
      <div className="flex items-end gap-3">
        <span className="rounded-full px-3 py-1.5 text-white text-xs" style={{ background: "#1E40AF" }}>Isfahan ✕</span>
        <span className="rounded-full border px-3 py-1.5 text-xs" style={{ borderColor: "#1E40AF", color: "#1E40AF", boxShadow: "0 0 0 3px rgb(30 64 175 / 0.18)" }}>Focus</span>
        <span className="flex h-10 items-end gap-1">
          {[40, 70, 55, 100].map((h) => <span className="w-2 rounded-sm" key={h} style={{ height: `${h}%`, background: h === 100 ? "#1E40AF" : "#bfcbee" }} />)}
        </span>
      </div>
    ),
  },
  {
    hex: "#2F3533",
    ratio: 12.52,
    role: "Text",
    rule: "A neutral charcoal for all text, so green no longer tints the page.",
    sample: <span className="font-display text-xl" style={{ color: "#2F3533" }}>Take your capital in the right direction.</span>,
  },
  {
    hex: "#E0603F",
    ratio: 3.55,
    role: "Warnings only",
    rule: "Unknown values and risk, never decoration.",
    sample: <span className="rounded-md px-3 py-1.5 font-medium text-xs" style={{ background: "#fdebe6", color: "#b23d1f" }}>● Needs review</span>,
  },
];

const rejected = [
  { hex: "#0F766E", note: "The starting teal. Too green, and it read as AI output." },
  { hex: "#083B37", note: "Dark green surfaces made whole sections green." },
  { hex: "#FF785A", note: "A coral accent; competed with the teal." },
  { hex: "#262C33", note: "Charcoal surfaces and black buttons felt heavy." },
  { hex: "#1E3A8A", note: "This blue read as near-black beside charcoal text." },
];

const week: { dow: string; day: number; items?: string[] }[] = [
  { dow: "Tue", day: 10, items: ["Brief", "Audit: 8 routes, 11 groups, ~10 forms"] },
  { dow: "Wed", day: 11, items: ["Short flow: basics, results, filter beside them"] },
  { dow: "Thu", day: 12 },
  { dow: "Fri", day: 13 },
  { dow: "Sat", day: 14, items: ["Three live hero alternatives", "Compass hero chosen"] },
  { dow: "Sun", day: 15, items: ["Compare page", "Colour roles", "QA restores 73 projects"] },
  { dow: "Mon", day: 16, items: ["Intake page removed", "Name chosen", "Latest live version"] },
];

const milestones = [
  { r: 2, t: "Fill-in-the-blank hero with the four basics" },
  { r: 16, t: "Map, teaser and stats sections removed" },
  { r: 19, t: "Kickoff and ideation procedure" },
  { r: 20, t: "Compare page added" },
  { r: 21, t: "Three landing concepts" },
  { r: 26, t: "Intake removed; results open first" },
  { r: 27, t: "Latest live version" },
];

const RoundTrack = () => (
  <div className="mt-8">
    <div className="relative h-3">
      <div className="absolute inset-x-0 top-1/2 h-px bg-rule" />
      {Array.from({ length: 27 }, (_, i) => (
        <span className="-translate-x-1/2 absolute top-0 h-3 w-px bg-rule" key={i} style={{ left: `${(i / 26) * 100}%` }} />
      ))}
      {milestones.map((m) => (
        <span className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 size-3 rounded-full ring-4 ring-paper" key={m.r} style={{ left: `${((m.r - 1) / 26) * 100}%`, background: m.r >= 26 ? TEAL_TEXT : BLUE }} />
      ))}
    </div>
    <div className="mt-2 flex justify-between font-mono text-[0.65rem] text-ink-soft"><span>Round 1</span><span>Round 27</span></div>
    <ol className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
      {milestones.map((m) => (
        <li className="flex gap-3 text-sm" key={m.r}>
          <span className="w-8 shrink-0 font-mono" style={{ color: m.r >= 26 ? TEAL_TEXT : BLUE }}>R{m.r}</span>
          <span className="text-ink-soft">{m.t}</span>
        </li>
      ))}
    </ol>
  </div>
);

const ReviewLoop = () => {
  const steps = ["Written feedback", "Build", "Deploy live", "Review live"];
  const pos = [
    [210, 34],
    [386, 130],
    [210, 226],
    [56, 130],
  ];
  return (
    <svg className="mt-4 w-full overflow-visible" role="img" viewBox="0 0 420 260">
      <title>The review loop: written feedback, build, deploy live, review on the site, repeated about 27 times</title>
      <defs>
        <marker id="adv-arrow" markerHeight="8" markerWidth="8" orient="auto" refX="6" refY="4">
          <path d="M0 0L8 4L0 8z" fill={TEAL_TEXT} />
        </marker>
      </defs>
      <ellipse cx="210" cy="130" fill="none" rx="176" ry="96" stroke="currentColor" strokeDasharray="4 6" strokeOpacity="0.2" />
      {[
        "M262 42 Q350 60 378 100",
        "M378 160 Q350 210 262 222",
        "M158 222 Q70 210 42 160",
        "M42 100 Q70 60 158 42",
      ].map((d) => <path d={d} fill="none" key={d} markerEnd="url(#adv-arrow)" stroke={TEAL_TEXT} strokeWidth="1.6" />)}
      {steps.map((s, i) => (
        <g key={s}>
          <rect fill="var(--color-paper, #fff)" height="30" rx="15" stroke={i === 3 ? TEAL_TEXT : "currentColor"} strokeOpacity={i === 3 ? 1 : 0.2} width={s.length * 8.2 + 28} x={pos[i][0] - (s.length * 8.2 + 28) / 2} y={pos[i][1] - 15} />
          <text dominantBaseline="middle" fill="currentColor" fontSize="12.5" textAnchor="middle" x={pos[i][0]} y={pos[i][1] + 1}>{s}</text>
        </g>
      ))}
      <text fill={TEAL_TEXT} fontSize="44" fontWeight="600" textAnchor="middle" x="210" y="138">~27</text>
      <text fill="currentColor" fillOpacity="0.55" fontSize="11" textAnchor="middle" x="210" y="160">rounds in 5 days</text>
    </svg>
  );
};

const explored = [
  { what: "Hero ideas", built: 3, kept: 1, result: "Compass with the Iran map, chosen over a live sentence and a transparent dossier." },
  { what: "Intake flows", built: 3, kept: 0, result: "Four steps, one sentence, steps again: all removed so results open first." },
  { what: "Landing concepts", built: 3, kept: 0, result: "Girih, metro and dossier, built for comparison; work continued on the existing landing." },
  { what: "Merged categories", built: 1, kept: 0, result: "Tried to shorten the lists, reversed because it lost data." },
];

const pages: PageTab[] = [
  {
    id: "home",
    label: "Landing",
    src: `${IMG}/after-full.webp`,
    width: 1200,
    height: 4830,
    notes: [
      "One prompt field in the hero, with a typing hint: say what you want in your own words.",
      "Eight routes up front, with a “what do you bring?” switch that highlights the ones that fit.",
      "The 11 project groups of the chosen route, with photos and subtype badges.",
      "“Why are we showing you these projects?” explains the matching in three steps.",
    ],
  },
  {
    id: "projects",
    label: "Projects",
    src: `${IMG}/projects.webp`,
    width: 1440,
    height: 2251,
    notes: [
      "Opens straight on results: route, domain, location and budget sit as four filters in the top bar.",
      "The advanced filter sits beside the results and applies instantly, with removable chips.",
      "Filters can be saved and come back later, with sorting and 12 projects per page.",
    ],
  },
  {
    id: "detail",
    label: "Project dossier",
    src: `${IMG}/detail.webp`,
    width: 1440,
    height: 5855,
    notes: [
      "A full page, not a dialog, with one section order for every project type.",
      "Money over time, return compared with similar projects, risk and the full dossier.",
      "Empty fields read “not recorded” once, in one group, instead of scattered blanks.",
      "It ends with the expert’s name and mobile (blurred here), or a guide file.",
    ],
  },
  {
    id: "compare",
    label: "Compare",
    src: `${IMG}/compare.webp`,
    width: 1440,
    height: 1209,
    notes: [
      "Two to four projects side by side, with charts and a table.",
      "A small chat answers questions about the selection, built only from the data on screen.",
    ],
  },
  {
    id: "assistant",
    label: "Assistant",
    src: `${IMG}/assistant.webp`,
    width: 1440,
    height: 900,
    notes: [
      "Describe your conditions in a sentence and get up to ten projects, each with a match percentage.",
      "Saved conditions can be attached to a message instead of typed again.",
    ],
  },
];

/* ───────────── page ───────────── */

export function AdvisorLayout({ cs }: { cs: CaseStudy }) {
  return (
    <div className="relative">
      <ReadingProgress />

      {/* 00 — Hero */}
      <section className="relative overflow-hidden bg-[#06302f] pt-14 pb-24 text-white">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.1]"
          style={{ backgroundImage: "radial-gradient(#7fe0de 1.2px, transparent 1.2px)", backgroundSize: "28px 28px", maskImage: "radial-gradient(ellipse at 70% 0%, #000 30%, transparent 75%)" }}
        />
        <div aria-hidden className="absolute -top-72 right-0 h-[760px] w-[1100px] bg-[radial-gradient(closest-side,rgb(0_173_171/0.35),transparent)]" />
        <div className={cn(wrap, "relative")}>
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-md px-3 py-1 font-mono text-[#06302f] text-[0.75rem] uppercase tracking-[0.08em]" style={{ background: TEAL }}>Re-design</span>
              <span className="rounded-full border border-white/15 px-3 py-1 font-mono text-[0.72rem] uppercase tracking-[0.06em]">{cs.status}</span>
            </div>
            <h1 className="mt-8 font-display text-[clamp(2.75rem,7vw,5rem)] leading-[0.95]">
              Investment Advisor
            </h1>
            <p className="mt-6 max-w-3xl font-display text-2xl text-white/85 leading-snug sm:text-4xl">{cs.tagline}</p>
            <DemoLink className="mt-8 ring-1 ring-white/20" />
          </Reveal>
          <dl className="mt-12 grid grid-cols-2 gap-6 border-white/15 border-y py-6 sm:grid-cols-4">
            {[
              ["Client", "Algonet"],
              ["Role", cs.meta.role],
              ["Timeline", "7 days · Nov 2026"],
              ["Platform", cs.meta.platform],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[#7fe0de] text-[0.72rem] uppercase tracking-[0.06em]">{k}</dt>
                <dd className="mt-2">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 01 — Context */}
      <section className={cn(wrap, "py-24")}>
        <Chapter label="Context" n="01" title="Many ways to invest. One place to start.">
          <p>{cs.summary}</p>
        </Chapter>
        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["8", "routes in: invest, fund, contract, buy, lease, restore heritage, social projects, operate"],
            ["11 · 78", "project groups and subtypes, every one kept"],
            ["~27", "review rounds, each one a live build"],
            ["7 days", "from brief to the latest live version, 50 commits"],
          ].map(([v, l]) => (
            <RevealItem className="bg-paper p-7" key={l}>
              <p className="font-display text-5xl leading-none">{v}</p>
              <p className="mt-4 text-ink-soft text-sm leading-snug">{l}</p>
            </RevealItem>
          ))}
        </RevealGroup>
        <p className="mt-4 font-mono text-[0.72rem] text-ink-soft">All projects, amounts and returns on these screens are sample data, not real offers.</p>
      </section>

      {/* 01b — Before / after */}
      <section className="relative overflow-hidden bg-[#06302f] py-24 text-white">
        <div className={cn(wrap, "relative")}>
          <Chapter dark label="Before / after" n="01b" title="From a brochure to an advisor.">
            <p>Drag the handle across the first screen: the original HTML demo, and the redesign.</p>
          </Chapter>
          <Reveal className="mt-12">
            <BeforeAfter
              accent={TEAL}
              after={`${IMG}/after-hero.webp`}
              afterAlt="The redesigned investment advisor landing page"
              afterLabel="After · redesign"
              before={`${IMG}/before-hero.webp`}
              beforeAlt="The original HTML demo of the landing page"
              beforeLabel="Before · HTML demo"
              height={900}
              width={1440}
            />
            <p className="mt-4 font-mono text-[0.75rem] text-white/60">Drag the handle, or focus it and use ← →.</p>
          </Reveal>
        </div>
      </section>

      {/* 02 — The brief */}
      <section className="py-28" style={{ background: "#0b4a48" }}>
        <div className={cn(wrap, "text-white")}>
          <Reveal>
            <p className="font-mono text-[#7fe0de] text-[0.78rem] uppercase tracking-[0.06em]"><span className="text-white">02</span> — The brief</p>
            <blockquote className="mt-8 max-w-5xl font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.1]">
              Design an investment advisor that learns what an investor brings and expects, then answers with the projects that fit, with the clarity and polish serious investors expect.
            </blockquote>
          </Reveal>
          <RevealGroup className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              ["Keep everything", "The demo is the source of every field, process and flow. Nothing dropped, nothing invented; only shortened, merged or improved."],
              ["Fewest clicks", "Simple components and ranges before typing. Basic information first, results next, optional fields beside them."],
              ["One system", "shadcn components, Vazirmatn, Iconsax, light mode, a small touch of the Algonet identity. Desktop only."],
            ].map(([t, b]) => (
              <RevealItem className="rounded-2xl border border-white/15 p-8" key={t}>
                <p className="font-display text-2xl">{t}</p>
                <p className="mt-3 text-white/70">{b}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 03 — Audit */}
      <section className="py-24">
        <div className={wrap}>
          <Chapter label="Audit" n="03" title={<>Fifteen fields <em className="text-signal">before the first project.</em></>}>
            <p>I audited the HTML demo for its information architecture and flows, not its visuals, and mapped every field, route and form it contained.</p>
          </Chapter>
          <Reveal className="mt-14 grid items-center gap-8 rounded-3xl bg-ink p-8 text-paper sm:p-12 lg:grid-cols-12 dark:bg-paper-2 dark:text-ink">
            <div className="lg:col-span-5">
              <p className="font-display text-[clamp(3.5rem,9vw,7rem)] leading-none">4 → 0</p>
              <p className="mt-3 text-paper/70 dark:text-ink-soft">steps between arriving and seeing a project</p>
            </div>
            <div className="lg:col-span-7">
              <p className="font-mono text-[0.72rem] text-paper/60 uppercase tracking-[0.06em] dark:text-ink-soft">Key finding</p>
              <p className="mt-3 font-display text-2xl leading-snug">Before seeing a single project, a visitor had to complete four steps and 15 to 25 fields, most of them optional but presented as required.</p>
            </div>
          </Reveal>
          <RevealGroup className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {audit.map((a) => (
              <RevealItem className="rounded-2xl border border-rule bg-paper p-6" key={a.where}>
                <p className="font-mono text-[0.75rem] uppercase tracking-[0.08em]" style={{ color: TEAL_TEXT }}>{a.where}</p>
                <p className="mt-5 font-mono text-[0.68rem] text-ink-soft uppercase">Problem</p>
                <p className="mt-1">{a.problem}</p>
                <p className="mt-4 font-mono text-[0.68rem] text-ink-soft uppercase">Impact</p>
                <p className="mt-1 text-ink-soft text-sm">{a.impact}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 04 — Decisions */}
      <section className="border-rule border-t bg-paper-2/60 py-24">
        <div className={wrap}>
          <Chapter label="Key decisions" n="04" title="Show first. Ask later. Explain always." />
          <RevealGroup as="ol" className="mt-14 grid gap-4 lg:grid-cols-2">
            {decisions.map((d, i) => (
              <RevealItem as="li" className={cn("rounded-2xl bg-paper p-7 ring-1 ring-rule", i === 0 && "lg:col-span-2")} key={d.title}>
                <p className="font-mono text-sm" style={{ color: TEAL_TEXT }}>0{i + 1}</p>
                <p className="mt-3 font-display text-2xl">{d.title}</p>
                <p className="mt-3 text-ink-soft leading-relaxed">{d.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 05 — Side by side */}
      <section className="py-24">
        <div className={wrap}>
          <Chapter label="Side by side" n="05" title="A catalogue, rebuilt around a question.">
            <p>The demo opens on a slogan and a grid of services. The redesign opens on one question, “what do you want?”, and every section after it helps answer it.</p>
          </Chapter>
          <div className="mt-14">
            <TwinScroll accent={TEAL_TEXT} left={{ src: `${IMG}/before-full.webp`, label: "HTML demo", height: 1983 }} right={{ src: `${IMG}/after-full.webp`, label: "Redesign", height: 4830 }} />
          </div>
        </div>
      </section>

      {/* 06 — Copy */}
      <section className="border-rule border-t bg-paper-2/60 py-24">
        <div className={wrap}>
          <Chapter label="Words" n="06" title="From “discover opportunities” to “get suggestions”.">
            <p>The original hero spoke about the company. The new one speaks to the visitor and states exactly what happens next. The interface is in Persian; the copy is shown here in English.</p>
          </Chapter>
          <Reveal className="mt-14 overflow-hidden rounded-2xl border border-rule bg-paper">
            <div className="grid grid-cols-[7rem_1fr_1fr] bg-ink px-6 py-3 font-mono text-[0.72rem] text-paper uppercase tracking-[0.06em] dark:bg-paper-2 dark:text-ink">
              <span />
              <span>Before</span>
              <span>After</span>
            </div>
            {copy.map((c) => (
              <div className="grid grid-cols-[7rem_1fr_1fr] items-start gap-4 border-rule border-t px-6 py-5" key={c.part}>
                <span className="font-mono text-[0.72rem] text-ink-soft uppercase">{c.part}</span>
                <p className="text-ink-soft">{c.before}</p>
                <p className="font-medium">{c.after}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 07 — Key pages */}
      <section className="py-24">
        <div className={wrap}>
          <Chapter label="The flow" n="07" title="From a question to a person to call.">
            <p>The landing is the first step of a short flow: results, a dossier for each project, a way to compare, and an assistant for people who would rather just describe what they want.</p>
          </Chapter>
          <div className="mt-12">
            <PageSwitcher accent={TEAL_TEXT} altSuffix="page" pages={pages} />
          </div>
        </div>
      </section>

      {/* 08 — Filters */}
      <section className="border-rule border-t bg-paper-2/60 py-24">
        <div className={wrap}>
          <Chapter label="Filters" n="08" title={<>Filters that <em className="text-signal">show</em>, not ask.</>}>
            <p>Every search in the demo ran through dependent dropdowns and a submit button. I rebuilt each filter around what an investor needs to see while choosing, without dropping a single option.</p>
          </Chapter>
          <Reveal className="mt-14 overflow-hidden rounded-2xl border border-rule bg-paper">
            <div className="grid grid-cols-[1fr_1fr_1fr] gap-4 bg-ink px-6 py-3 font-mono text-[0.72rem] text-paper uppercase tracking-[0.06em] max-sm:hidden dark:bg-paper-2 dark:text-ink">
              <span>Filter</span>
              <span>Before</span>
              <span>After</span>
            </div>
            {filterSummary.map(([f, b, a]) => (
              <div className="grid gap-1 border-rule border-t px-6 py-4 sm:grid-cols-[1fr_1fr_1fr] sm:gap-4" key={f}>
                <span className="font-medium">{f}</span>
                <span className="text-ink-soft line-through decoration-ink-soft/40">{b}</span>
                <span style={{ color: TEAL_TEXT }}>{a}</span>
              </div>
            ))}
          </Reveal>
          <ol className="mt-20 space-y-24">
            {filterChallenges.map((c, i) => (
              <li key={c.title}>
                <Reveal className="grid gap-4 lg:grid-cols-12">
                  <p className="font-mono text-sm lg:col-span-1" style={{ color: TEAL_TEXT }}>F{i + 1}</p>
                  <div className="lg:col-span-6">
                    <p className="font-mono text-[0.72rem] text-ink-soft uppercase tracking-[0.06em]">Challenge</p>
                    <h3 className="mt-2 font-display text-3xl leading-tight">{c.title}</h3>
                  </div>
                  <p className="text-ink-soft leading-relaxed lg:col-span-5">{c.why}</p>
                </Reveal>
                <div className="mt-8 grid gap-6 lg:grid-cols-12">
                  <Reveal className="lg:col-span-5">
                    <p className="mb-3 flex items-center gap-2 font-mono text-[0.72rem] text-ink-soft uppercase"><span className="size-2 rounded-full bg-ink-soft/50" />Before · HTML demo</p>
                    {c.before.img ? (
                      <img alt={c.before.alt} className="w-full rounded-xl border border-rule bg-white" loading="lazy" src={`${IMG}/filters/${c.before.img}.webp`} />
                    ) : (
                      <DropdownMock fields={c.before.mock ?? []} />
                    )}
                    <p className="mt-3 text-ink-soft text-sm leading-relaxed">{c.before.text}</p>
                  </Reveal>
                  <Reveal className="lg:col-span-7" delay={0.08}>
                    <p className="mb-3 flex items-center gap-2 font-mono text-[0.72rem] uppercase" style={{ color: TEAL_TEXT }}><span className="size-2 rounded-full" style={{ background: TEAL }} />After · redesign</p>
                    <img alt={c.after.alt} className="w-full rounded-xl border border-rule bg-white shadow-[0_30px_60px_-30px_rgb(0_60_60/0.35)]" loading="lazy" src={`${IMG}/filters/${c.after.img}.webp`} />
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {c.after.points.map((p) => (
                        <li className="flex gap-2 text-sm leading-relaxed" key={p}>
                          <span aria-hidden className="mt-[0.45rem] size-1.5 shrink-0 rounded-full" style={{ background: TEAL }} />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-12 font-mono text-[0.72rem] text-ink-soft">Screens show sample data. The interface is in Persian and reads right to left.</p>
        </div>
      </section>

      {/* 09 — Visual system */}
      <section className="bg-[#16191a] py-24 text-white">
        <div className={wrap}>
          <Chapter dark label="Visual system" n="09" title="Less green, more meaning.">
            <p>The first rounds were green everywhere and read as generic. The fix was not a new green but fewer of them: a neutral base, and each colour kept for one job.</p>
          </Chapter>

          {/* palette shift */}
          <Reveal className="mt-14 grid gap-8 rounded-3xl border border-white/10 p-6 sm:p-10">
            {[
              { label: "Early rounds", note: "Green on surfaces, text and actions", bar: earlyMix },
              { label: "Final", note: "Neutral base; colour only where it means something", bar: finalMix },
            ].map((row) => (
              <div key={row.label}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-display text-2xl">{row.label}</p>
                  <p className="text-sm text-white/55">{row.note}</p>
                </div>
                <div className="mt-4 flex h-14 overflow-hidden rounded-xl ring-1 ring-white/10">
                  {row.bar.map((s) => (
                    <div className="flex items-end p-2 font-mono text-[0.62rem]" key={s.hex + s.w} style={{ background: s.hex, flexGrow: s.w, color: s.dark ? "#2F3533" : "rgb(255 255 255 / 0.8)" }} title={s.hex}>
                      {s.w >= 8 ? s.hex : ""}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <p className="font-mono text-[0.68rem] text-white/40">Bar widths are illustrative, to show the shift in balance; they are not measured.</p>
          </Reveal>

          {/* roles */}
          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map((r) => (
              <RevealItem className="flex flex-col overflow-hidden rounded-2xl bg-white text-[#2F3533]" key={r.hex}>
                <div className="flex h-36 items-center justify-center bg-[#F8FAFC] px-6">{r.sample}</div>
                <div className="flex flex-1 flex-col border-[#e5e9ec] border-t p-5">
                  <div className="flex items-center gap-3">
                    <span className="size-6 rounded-md ring-1 ring-black/10" style={{ background: r.hex }} />
                    <p className="font-mono text-sm">{r.hex}</p>
                    <span className="ms-auto rounded-full bg-[#eef1f4] px-2 py-0.5 font-mono text-[0.68rem]">{r.ratio}:1</span>
                  </div>
                  <p className="mt-3 font-medium">{r.role}</p>
                  <p className="mt-1 text-[#5b6361] text-sm leading-relaxed">{r.rule}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          {/* contrast chart + rejected */}
          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <Reveal className="rounded-2xl border border-white/10 p-6 lg:col-span-7">
              <p className="font-mono text-[#9fb4c9] text-[0.75rem] uppercase">Contrast on white</p>
              <div className="relative mt-6 space-y-3">
                <div aria-hidden className="absolute inset-y-0 border-white/40 border-l border-dashed" style={{ left: `calc(7rem + (100% - 7rem) * ${4.5 / 13})` }}>
                  <span className="-translate-x-1/2 absolute -top-5 whitespace-nowrap font-mono text-[0.62rem] text-white/60">AA text 4.5</span>
                </div>
                {roles.map((r) => (
                  <div className="grid grid-cols-[7rem_1fr] items-center" key={r.hex}>
                    <span className="font-mono text-white/60 text-xs">{r.hex}</span>
                    <div className="flex items-center gap-2">
                      <div className="h-4 rounded-sm" style={{ width: `${(r.ratio / 13) * 100}%`, background: r.hex, boxShadow: r.ratio < 3 ? "inset 0 0 0 1px rgb(255 255 255 / 0.2)" : undefined }} />
                      <span className="font-mono text-[0.68rem] text-white/70">{r.ratio}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-white/60 leading-relaxed">#00ADAB falls short for text, so it stays on fills and icons with large, bold labels, and any teal text uses #007A78. Orange passes only at large sizes, which suits a badge, not a sentence.</p>
            </Reveal>
            <Reveal className="rounded-2xl border border-white/10 p-6 lg:col-span-5" delay={0.08}>
              <p className="font-mono text-[#9fb4c9] text-[0.75rem] uppercase">Tried and left behind</p>
              <ul className="mt-5 space-y-3">
                {rejected.map((r) => (
                  <li className="flex items-center gap-3" key={r.hex}>
                    <span className="relative size-9 shrink-0 overflow-hidden rounded-lg ring-1 ring-white/10" style={{ background: r.hex }}>
                      <span aria-hidden className="absolute top-1/2 left-[-20%] h-px w-[140%] rotate-45 bg-white/70" />
                    </span>
                    <span>
                      <span className="font-mono text-sm text-white/50 line-through">{r.hex}</span>
                      <span className="block text-sm text-white/75">{r.note}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* imagery, type, identity */}
          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <Reveal className="overflow-hidden rounded-2xl bg-white/5 lg:col-span-7">
              <img alt="Project cards on the landing: real photos under one black-and-grey overlay" className="w-full" loading="lazy" src={`${IMG}/cards.webp`} />
              <div className="p-6">
                <p className="font-mono text-[#9fb4c9] text-[0.75rem] uppercase">Imagery</p>
                <p className="mt-2 text-white/75">Real photos under one black-and-grey overlay, so photos from different sources sit together and the white type stays readable. One photo per project type, a landmark photo per province, and an Iran map with real borders and no dots.</p>
              </div>
            </Reveal>
            <div className="grid gap-6 lg:col-span-5">
              <Reveal className="rounded-2xl bg-white/5 p-6">
                <p className="font-mono text-[#9fb4c9] text-[0.75rem] uppercase">Type</p>
                <p className="mt-4 font-display text-3xl" dir="rtl" lang="fa">سرمایه‌تان را به سمت درست ببرید.</p>
                <p className="mt-3 text-white/75">Vazirmatn throughout. Every section head follows one rule: kicker, title, one short subtitle, right-aligned.</p>
              </Reveal>
              <Reveal className="rounded-2xl bg-white/5 p-6" delay={0.08}>
                <p className="font-mono text-[#9fb4c9] text-[0.75rem] uppercase">Identity</p>
                <svg aria-hidden className="mt-4 h-16 w-full" viewBox="0 0 320 64">
                  {[[20, 40], [70, 18], [130, 44], [190, 14], [250, 38], [300, 20]].map(([x, y], i, a) => (
                    <g key={x}>
                      {i > 0 && <line stroke="rgb(255 255 255 / 0.25)" x1={a[i - 1][0]} x2={x} y1={a[i - 1][1]} y2={y} />}
                      <circle cx={x} cy={y} fill={i === 3 ? TEAL : "rgb(255 255 255 / 0.6)"} r={i === 3 ? 5 : 3} />
                    </g>
                  ))}
                </svg>
                <p className="mt-3 text-white/75">The Algonet pattern of nodes, lines and dots as one faint background layer at about 4%, and a small mark before each section title.</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 10 — Process */}
      <section className="py-24">
        <div className={wrap}>
          <Chapter label="Process" n="10" title="Directed by design, built with AI.">
            <p>I wrote the brief and the constraints, reviewed every round on the live site and made the calls. Claude produced the audit, the layout alternatives and the code from that direction, so each idea could be judged as a working page within hours.</p>
          </Chapter>

          {/* loop + roles */}
          <div className="mt-14 grid gap-6 lg:grid-cols-12">
            <Reveal className="rounded-3xl border border-rule bg-paper p-6 sm:p-8 lg:col-span-7">
              <p className="font-mono text-[0.72rem] text-ink-soft uppercase tracking-[0.06em]">One round</p>
              <ReviewLoop />
              <p className="mt-2 text-ink-soft text-sm">No static mock-ups: every idea was judged as a working page on the live site.</p>
            </Reveal>
            <Reveal className="grid gap-px overflow-hidden rounded-3xl border border-rule bg-rule lg:col-span-5" delay={0.08}>
              {[
                { who: "Me", tone: TEAL_TEXT, items: ["Brief, brand, content and platform rules", "Source demo and references", "Written, screenshot-based review of every round", "The calls: compass hero, name, colour and text rules, removing the intake"] },
                { who: "Claude", tone: BLUE, items: ["Audit and information architecture", "Layout alternatives and concepts", "All code, copy drafts and QA", "Builds and deploys"] },
              ].map((c) => (
                <div className="bg-paper p-6" key={c.who}>
                  <p className="font-display text-2xl" style={{ color: c.tone }}>{c.who}</p>
                  <ul className="mt-3 space-y-1.5 text-ink-soft text-sm">
                    {c.items.map((it) => <li key={it}>{it}</li>)}
                  </ul>
                </div>
              ))}
            </Reveal>
          </div>

          {/* week */}
          <Reveal className="mt-6 rounded-3xl border border-rule bg-paper p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-mono text-[0.72rem] text-ink-soft uppercase tracking-[0.06em]">The week · Nov 10–16, 2026</p>
              <p className="text-ink-soft text-sm">5 working days · ~27 rounds · 50 commits</p>
            </div>
            <ol className="mt-6 grid grid-cols-7 gap-2">
              {week.map((d) => (
                <li className="min-w-0" key={d.day}>
                  <div className={cn("rounded-xl px-2 py-3 text-center", d.items ? "text-white" : "bg-paper-2 text-ink-soft")} style={d.items ? { background: TEAL_TEXT } : undefined}>
                    <p className="font-mono text-[0.65rem] uppercase opacity-80">{d.dow}</p>
                    <p className="font-display text-2xl leading-none">{d.day}</p>
                  </div>
                  {d.items && (
                    <ul className="mt-3 space-y-1.5 text-[0.78rem] text-ink-soft leading-snug max-md:hidden">
                      {d.items.map((it) => <li key={it}>{it}</li>)}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
            <ul className="mt-5 space-y-2 text-ink-soft text-sm md:hidden">
              {week.filter((d) => d.items).map((d) => <li key={d.day}><span className="font-mono" style={{ color: TEAL_TEXT }}>{d.day}</span> · {d.items?.join(" · ")}</li>)}
            </ul>
          </Reveal>

          {/* rounds track */}
          <Reveal className="mt-6 rounded-3xl border border-rule bg-paper p-6 sm:p-8">
            <p className="font-mono text-[0.72rem] text-ink-soft uppercase tracking-[0.06em]">Milestones across ~27 review rounds</p>
            <RoundTrack />
          </Reveal>

          {/* exploration + QA */}
          <div className="mt-6 grid gap-6 lg:grid-cols-12">
            <Reveal className="rounded-3xl border border-rule bg-paper p-6 sm:p-8 lg:col-span-7">
              <p className="font-mono text-[0.72rem] text-ink-soft uppercase tracking-[0.06em]">Explored, then narrowed</p>
              <ul className="mt-6 space-y-5">
                {explored.map((e) => (
                  <li className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:items-center" key={e.what}>
                    <span className="font-medium text-sm">{e.what}</span>
                    <div>
                      <div className="flex gap-1.5">
                        {Array.from({ length: e.built }, (_, i) => (
                          <span className={cn("h-7 flex-1 rounded-md border", i < e.kept ? "border-transparent" : "border-rule border-dashed bg-paper-2")} key={i} style={i < e.kept ? { background: TEAL_TEXT } : undefined} />
                        ))}
                      </div>
                      <p className="mt-1.5 text-ink-soft text-xs">{e.result}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-6 flex flex-wrap gap-4 text-ink-soft text-xs">
                <span className="flex items-center gap-1.5"><span className="size-3 rounded-sm" style={{ background: TEAL_TEXT }} />kept</span>
                <span className="flex items-center gap-1.5"><span className="size-3 rounded-sm border border-rule border-dashed bg-paper-2" />built and set aside</span>
              </p>
            </Reveal>
            <Reveal className="rounded-3xl bg-ink p-6 text-paper sm:p-8 lg:col-span-5 dark:bg-paper-2 dark:text-ink" delay={0.08}>
              <p className="font-mono text-[0.72rem] text-paper/60 uppercase tracking-[0.06em] dark:text-ink-soft">Quality checks</p>
              <p className="mt-4 font-display text-6xl leading-none">73</p>
              <p className="mt-2 text-paper/70 text-sm dark:text-ink-soft">sample projects restored after a source audit against the demo</p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {["Every field and form checked against the demo", "Every filter tested end to end", "Every project map checked", "A clipping audit for shadows"].map((q) => (
                  <li className="flex gap-2" key={q}>
                    <svg aria-hidden className="mt-0.5 size-4 shrink-0" fill="none" stroke={TEAL} strokeWidth="2.5" viewBox="0 0 16 16"><path d="M3 8.5l3 3 7-7" /></svg>
                    {q}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 10 — Status */}
      <section className="py-24 text-white" style={{ background: BLUE }}>
        <div className={wrap}>
          <Chapter dark label="Where it stands" n="11" title="A working demo. Next: real data and real users.">
            <p>The redesign is live as a desktop demo on sample data, and the assistant is scripted. The site is planned to connect to a partner platform for real projects.</p>
            <DemoLink className="mt-6 bg-white! text-[#1E40AF]!" />
          </Chapter>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            <Reveal className="rounded-2xl border border-white/20 p-7">
              <p className="font-mono text-white/70 text-xs uppercase">Done</p>
              <ul className="mt-4 space-y-2 text-white/85">
                <li>Landing, projects, dossier, compare, assistant, saved</li>
                <li>Every route, group and form from the demo</li>
                <li>Login only on save, saved filters</li>
              </ul>
            </Reveal>
            <Reveal className="rounded-2xl border border-white/20 p-7" delay={0.08}>
              <p className="font-mono text-white/70 text-xs uppercase">Next</p>
              <ul className="mt-4 space-y-2 text-white/85">
                <li>Real projects and a unique photo for each</li>
                <li>A real model behind the assistant</li>
                <li>A mobile version</li>
              </ul>
            </Reveal>
            <Reveal className="rounded-2xl border border-white/40 p-7" delay={0.16}>
              <p className="font-mono text-white/70 text-xs uppercase">The test that matters</p>
              <p className="mt-4 text-white/85">Can a first-time investor, in under a minute, reach a short list of projects that fit them and know who to call?</p>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
