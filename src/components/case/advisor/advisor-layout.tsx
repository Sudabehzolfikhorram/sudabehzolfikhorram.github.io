// Sarmayeh-Gozin (investment advisor) for Algonet: a before/after case study.
// Built from the project record only (brief, ~27 feedback rounds, the repo and
// the source HTML demo). All projects, amounts and returns on the screens are
// sample data, and contact details are blurred.

import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import type { CaseStudy } from "@/lib/case-studies";
import { cn } from "@/lib/utils";
import { wrap } from "../blocks";
import { BeforeAfter, TwinScroll } from "../novin/interactive";
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
  { hex: "#0F766E", note: "The starting primary, rounds 1 to 25. Too green; it read as AI output." },
  { hex: "#FF785A", note: "Coral in place of black, round 10. Gone within a day." },
  { hex: "#083B37", note: "Dark green surfaces, rounds 11 to 17." },
  { hex: "#262C33", note: "Charcoal-slate surfaces, rounds 18 to 26. Black buttons ruled out in round 27." },
  { hex: "#1E3A8A", note: "Round 23’s blue. It read as near-black beside charcoal text." },
];

type Seg = { from: number; to: number; hex: string; label: string; light?: boolean };
const colourRows: { role: string; segs: Seg[] }[] = [
  { role: "Primary", segs: [{ from: 0, to: 25, hex: "#0F766E", label: "#0F766E" }, { from: 26, to: 27, hex: "#00ADAB", label: "#00ADAB" }] },
  { role: "Text", segs: [{ from: 0, to: 13, hex: "#3f7f78", label: "green-tinted" }, { from: 14, to: 27, hex: "#2F3533", label: "#2F3533 charcoal" }] },
  { role: "Dark surfaces", segs: [{ from: 10, to: 10, hex: "#0b0b0b", label: "black" }, { from: 11, to: 17, hex: "#083B37", label: "#083B37" }, { from: 18, to: 26, hex: "#262C33", label: "#262C33" }, { from: 27, to: 27, hex: "#005D5C", label: "teal" }] },
  { role: "Accent", segs: [{ from: 0, to: 0, hex: "#C9A24B", label: "gold" }, { from: 10, to: 11, hex: "#FF785A", label: "coral" }, { from: 17, to: 19, hex: "#EE7B52", label: "orange" }, { from: 20, to: 27, hex: "#E0603F", label: "warnings only" }] },
  { role: "Secondary", segs: [{ from: 20, to: 22, hex: "#2152E0", label: "cobalt" }, { from: 23, to: 25, hex: "#1E3A8A", label: "#1E3A8A" }, { from: 26, to: 27, hex: "#1E40AF", label: "#1E40AF" }] },
];
const days = [
  { d: "Nov 10", from: 0, to: 7 },
  { d: "Nov 11", from: 8, to: 11 },
  { d: "Nov 14", from: 12, to: 15 },
  { d: "Nov 15", from: 16, to: 21 },
  { d: "Nov 16", from: 22, to: 27 },
];
const pct = (n: number) => `${(n / 28) * 100}%`;

const ColourTimeline = () => (
  <div className="overflow-x-auto">
    <div className="min-w-[640px]">
      <div className="grid grid-cols-[7.5rem_1fr] items-end">
        <span />
        <div className="relative h-6">
          {days.map((d) => (
            <span className="absolute bottom-0 border-white/25 border-s ps-1.5 font-mono text-[0.62rem] text-white/55" key={d.d} style={{ left: pct(d.from) }}>{d.d}</span>
          ))}
        </div>
      </div>
      <div className="mt-2 space-y-2">
        {colourRows.map((row) => (
          <div className="grid grid-cols-[7.5rem_1fr] items-center" key={row.role}>
            <span className="text-sm text-white/70">{row.role}</span>
            <div className="relative h-9 rounded-md bg-white/[0.04]">
              {days.map((d, i) => i > 0 && <span aria-hidden className="absolute inset-y-0 border-white/10 border-s" key={d.d} style={{ left: pct(d.from) }} />)}
              {row.segs.map((g) => (
                <span
                  className="absolute inset-y-1 flex items-center overflow-hidden rounded px-1.5 font-mono text-[0.6rem] text-white/85"
                  key={g.label + g.from}
                  style={{ left: pct(g.from), width: `calc(${pct(g.to - g.from + 1)} - 2px)`, background: g.hex }}
                  title={`${g.label}, rounds ${g.from === 0 ? "v1" : g.from}–${g.to}`}
                >
                  {g.to - g.from >= 2 ? g.label : ""}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-[7.5rem_1fr]">
        <span />
        <div className="relative h-4 font-mono text-[0.6rem] text-white/40">
          {[0, 5, 10, 15, 20, 25, 27].map((r) => (
            <span className="absolute" key={r} style={{ left: pct(r + 0.5), transform: "translateX(-50%)" }}>{r === 0 ? "v1" : `R${r}`}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const week: { dow: string; day: number; rounds?: number; items?: string[] }[] = [
  { dow: "Tue", day: 10, rounds: 7, items: ["Brief, audit, version 1", "Taxonomy restored", "Real map borders", "QA restores 73 projects"] },
  { dow: "Wed", day: 11, rounds: 4, items: ["Assistant becomes a chat", "Services redesigned", "Coral, then dark green"] },
  { dow: "Thu", day: 12 },
  { dow: "Fri", day: 13 },
  { dow: "Sat", day: 14, rounds: 4, items: ["“Change only what I name”", "Three heroes; compass chosen", "Text moves to charcoal"] },
  { dow: "Sun", day: 15, rounds: 6, items: ["“Looks like a wireframe” reset", "Compare page, blue secondary", "Three landing concepts"] },
  { dow: "Mon", day: 16, rounds: 6, items: ["Name chosen", "Intake page removed", "Final colours; round 27 live"] },
];

const turning = [
  { r: "R2", day: "Nov 10", t: "Improve, never remove", before: "Groups merged from 11 to 10 and subtypes from 76 to 54 to shorten the lists.", after: "The full taxonomy restored; a QA pass in round 7 brought back 73 missing projects.", why: "It set the rule for the whole project: improving never means deleting." },
  { r: "R2", day: "Nov 10", t: "Basic information, then results", before: "Results depended on a form in the hero.", after: "A short basic-information step, routes as the main categories, main filters on top.", why: "It fixed the order of the whole flow." },
  { r: "R4–6", day: "Nov 10", t: "No dots on the map", before: "A dotted map of Iran.", after: "Real province and county borders, and a landmark photo for each province.", why: "The map became a working control and the strongest visual." },
  { r: "R9", day: "Nov 11", t: "A chat that reads like one", before: "The assistant had a field on top and results below.", after: "A real chat with the composer at the bottom, quick replies and a save card.", why: "The assistant started to behave like a conversation." },
  { r: "R10–11", day: "Nov 11", t: "The first colour rules", before: "Black surfaces, then coral.", after: "No black, no gold, orange only where needed, and a new name after the old one misread.", why: "The palette got its first constraints." },
  { r: "R12", day: "Nov 14", t: "Change only what I name", before: "One round quietly flattened a budget chart nobody had mentioned.", after: "Every later round changed only what the review named.", why: "It changed how every remaining round was run." },
  { r: "R13–14", day: "Nov 14", t: "Compass hero, charcoal text", before: "A busy hero and green text everywhere.", after: "The compass chosen from three ideas; text set in #2F3533 after a contrast check.", why: "The first screen and the reading colour were settled." },
  { r: "R16–18", day: "Nov 15", t: "Not a wireframe, not AI output", before: "Uneven section titles and a heavy green tone.", after: "One rule for every section head, a blue-tinted background, black-and-grey photo overlays.", why: "It reset the visual direction to clean." },
  { r: "R20", day: "Nov 15", t: "A second colour, a decision step", before: "Compare was a small bar; one colour family.", after: "A compare page with a data-grounded chat, and a blue for selection and data.", why: "It added the step between browsing and calling an expert." },
  { r: "R24–26", day: "Nov 16", t: "Remove the step", before: "A one-sentence intake, then a step-by-step one.", after: "No intake: results open with four filters. #00ADAB and #1E40AF chosen.", why: "The search for the right first step ended by removing it." },
];

const principles = [
  { p: "Improve, never remove", n: "Every field, form and flow of the demo stays; components get better.", r: "Brief" },
  { p: "Invent nothing", n: "No field or process that isn’t in the source.", r: "Nov 10" },
  { p: "Fewest clicks", n: "The simplest component that saves a click wins.", r: "Brief" },
  { p: "Open by default", n: "No registration wall; login only at the moment of saving.", r: "Brief" },
  { p: "Change only what I name", n: "A review round touches exactly what it mentions.", r: "R12" },
  { p: "Controlled colour", n: "More white; colour only where it means something.", r: "R2" },
  { p: "Not a wireframe, not AI output", n: "Every surface has to look designed and specific.", r: "R16–23" },
  { p: "Right to left, charts included", n: "Gauges, gradients and axes read the way Persian does.", r: "R15" },
  { p: "Selected means obvious", n: "Every choice shows that it is chosen.", r: "R4" },
  { p: "Think like an investor", n: "Simplify any flow an investor wouldn’t sit through.", r: "R18" },
  { p: "Charts over paragraphs", n: "Where data can be drawn, draw it.", r: "R21" },
  { p: "One structure everywhere", n: "Every dossier in the same order, whatever the project type.", r: "R25" },
];

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
  { what: "Hero ideas", built: 3, kept: 1, result: "Round 13: compass, live sentence, transparent dossier. The compass stayed." },
  { what: "Intake flows", built: 3, kept: 0, result: "Four steps, one sentence, steps again. All removed so results open first." },
  { what: "Landing concepts", built: 3, kept: 0, result: "Girih, metro and dossier in round 21. No pick on record; work continued on the existing landing." },
  { what: "Ideas lab", built: 4, kept: 0, result: "Four live prototypes in round 19. None adopted as built." },
  { what: "Secondary blues", built: 4, kept: 1, result: "#2152E0, #0E53C8, #1E3A8A, then #1E40AF." },
  { what: "Product names", built: 4, kept: 1, result: "Four names over the week; Sarmayeh-Gozin stayed." },
  { what: "Merged categories", built: 1, kept: 0, result: "Tried to shorten the lists, reversed because it lost data." },
];

const names = [
  { fa: "سرمایه‌نما", en: "Sarmayeh-Nama", note: "“capital view”", r: "v1", out: true },
  { fa: "هم‌سرمایه", en: "Ham-Sarmayeh", note: "“co-capital”, but it read as hamsar, “spouse”", r: "R2", out: true },
  { fa: "سرمایه‌نما", en: "Sarmayeh-Nama", note: "back again", r: "R11", out: true },
  { fa: "سهم‌یاب", en: "Sahm-Yab", note: "“share finder”, proposed and declined", r: "R24", out: true },
  { fa: "سرمایه‌گزین", en: "Sarmayeh-Gozin", note: "“capital chooser”", r: "R24", out: false },
];

type WShot = { img: string; w: number; h: number; alt: string };
type Walk = {
  id: string;
  label: string;
  headline: string;
  before: WShot | { quote: string; note: string } | { none: string };
  after: WShot;
  film?: { img: string; label: string }[];
  versions: { r: number; t: string }[];
  notes: { r: string; t: string }[];
  dropped: string[];
  decision: string;
};

const W = (img: string, w: number, h: number, alt: string, dir = "walk"): WShot => ({ img: `${dir}/${img}`, w, h, alt });

const walk: Walk[] = [
  {
    id: "hero",
    label: "Hero",
    headline: "One question, one field.",
    before: W("b-hero", 1200, 593, "The demo hero: a stock photo with the slogan “Become a partner in building the future”"),
    after: W("a-hero", 1200, 743, "The final hero: one prompt field beside an Iran map of sample projects"),
    film: [
      { img: "r01-hero", label: "Version 1 · Nov 10" },
      { img: "r11-hero", label: "Round 11 · Nov 11" },
      { img: "r20-hero", label: "Round 20 · Nov 15" },
      { img: "r27-hero", label: "Round 27 · Nov 16" },
    ],
    versions: [
      { r: 0, t: "Dark hero with a basic form and a dotted map" },
      { r: 1, t: "A sentence with four dropdown blanks" },
      { r: 2, t: "Assistant by default, one blank left" },
      { r: 13, t: "Three alternatives side by side" },
      { r: 14, t: "Compass hero chosen" },
      { r: 26, t: "Final palette applied" },
    ],
    notes: [
      { r: "R1", t: "Make the hero creative and different." },
      { r: "R13", t: "The map works, but the content is busy and not creative. Give me three ideas that convey ease and confidence about investing." },
      { r: "R14", t: "Keep the compass. Drop the “I’ll choose myself” option, the weak button label and the row underneath." },
    ],
    dropped: ["Dark form hero", "Four-blank sentence", "Live sentence hero", "Transparent dossier hero", "Trust row", "“Find” as the button"],
    decision: "One headline, one sentence and one prompt field beside the map. The hero asks for one thing only.",
  },
  {
    id: "routes",
    label: "Routes",
    headline: "Make the main doors look like doors.",
    before: W("b-routes", 1200, 608, "The demo’s grid of ten photo cards mixing routes, services and funds"),
    after: W("a-routes", 1200, 858, "Eight route cards with a “what do you bring?” switch and a stats strip"),
    versions: [
      { r: 0, t: "Route was one field in the hero form" },
      { r: 2, t: "Eight route cards under the hero" },
      { r: 16, t: "One row of badges, then +n" },
      { r: 17, t: "Plain white cards, rejected the same day" },
      { r: 18, t: "Icons on top, a live map for the stats" },
      { r: 20, t: "“What do you bring?” switch" },
      { r: 22, t: "Soft gradient, stats moved below" },
      { r: 26, t: "Blue icon tiles and hover" },
    ],
    notes: [
      { r: "R2", t: "It isn’t clear that these cards are the main categories." },
      { r: "R16", t: "Client review: the design looks like a wireframe." },
      { r: "R17", t: "Bring the earlier cards back. Only improve the badges and the spacing." },
      { r: "R22", t: "Move the stats below, taking little space, and give the cards a touch of colour." },
    ],
    dropped: ["Plain white cards", "Stats as their own section", "Stats beside the title", "A bar-chart stats card", "Two-line titles"],
    decision: "Eight routes on lightly coloured cards, one row of badges, a footer aligned to the bottom. A card should look designed and never grow with its content.",
  },
  {
    id: "groups",
    label: "Project groups",
    headline: "Show the hierarchy. Lose no category.",
    before: W("b-groups", 1200, 512, "The demo’s questionnaire step with dropdowns for project group and type"),
    after: W("a-groups", 1200, 725, "The groups of the chosen route as a list, with a large photo and subtype badges for the one in focus"),
    versions: [
      { r: 0, t: "Groups merged from 11 to 10, subtypes from 76 to 54" },
      { r: 1, t: "Photo panels that open on hover" },
      { r: 2, t: "All 11 groups and 78 subtypes restored" },
      { r: 4, t: "Tied to the chosen route" },
      { r: 13, t: "Neutral dark overlay instead of green" },
      { r: 16, t: "Two rows of upright cards" },
      { r: 17, t: "Back to the panels, rotated" },
      { r: 22, t: "A list beside one photo panel" },
    ],
    notes: [
      { r: "R2", t: "Merging the domains lost more than half of our data. Keep every process and flow." },
      { r: "R4", t: "Nothing shows that these are subcategories of the main category." },
      { r: "R16", t: "Upright cards, so the text stays horizontal and readable." },
      { r: "R24", t: "Bigger type here: these are our main categories." },
    ],
    dropped: ["Merged taxonomy", "Vertical text in narrow panels", "Two-row card grid", "Green overlay", "Index numbers"],
    decision: "The 11 groups of the chosen route as a list beside one photo panel with its subtypes. Route, then group, then subtype, and nothing merged.",
  },
  {
    id: "projects",
    label: "Project cards",
    headline: "Subtract until only the choice is left.",
    before: W("b-projects", 1200, 675, "The demo’s project cards with a placeholder illustration, long text and two buttons each"),
    after: W("a-projects", 1200, 783, "The final project cards: a real photo under a dark overlay, four key facts and icon actions"),
    versions: [
      { r: 0, t: "Photo with a green overlay, a match ring and reason chips" },
      { r: 3, t: "Lighter card, four key facts" },
      { r: 9, t: "Photos rotate on hover" },
      { r: 22, t: "The photo becomes the whole card" },
      { r: 23, t: "Badge, mark and extra words removed" },
    ],
    notes: [
      { r: "R2", t: "Good to carry Algonet’s identity, but it has gone too green." },
      { r: "R3", t: "The card is too heavy. Show only the most important data." },
      { r: "R22", t: "Let the photo be the frame, with a black layer and blur rising from the bottom." },
      { r: "R23", t: "These designs have to get out of wireframe mode." },
    ],
    dropped: ["Green photo overlay", "Large match ring", "Reason chips", "“Newly added”", "“Within your budget”", "Tag badge", "The “A” mark", "Text compare button"],
    decision: "The photo is the card, carrying the title and four facts. One image treatment became the site’s signature, and a card shows only what helps someone choose.",
  },
  {
    id: "why",
    label: "Why these projects",
    headline: "Explain a match by showing it.",
    before: { quote: "“Showing an item does not mean a financial fit or real acceptance.”", note: "The demo’s only word on how projects were picked: a disclaimer above the list." },
    after: W("a-why", 1200, 487, "A three-step explainer beside a funnel that narrows the sample projects"),
    versions: [
      { r: 0, t: "A block of text from the demo" },
      { r: 16, t: "Numbered steps beside a dark demo card" },
      { r: 17, t: "A timeline with an animated stage" },
      { r: 18, t: "A field of dots filtered step by step" },
      { r: 22, t: "A white card with progress segments" },
      { r: 24, t: "A live funnel, no step numbers" },
    ],
    notes: [
      { r: "R16", t: "These cards aren’t clear. We don’t know what they are." },
      { r: "R17", t: "Better, but the sample result pulls too much focus." },
      { r: "R24", t: "Change the design of this sample entirely." },
    ],
    dropped: ["Dark demo card", "Explanatory badges", "Dot field", "Numbered steps"],
    decision: "Three short steps beside a funnel. On every project, what fits, what doesn’t and what is unknown; unknown scores half and is marked “needs review”.",
  },
  {
    id: "results",
    label: "Projects page",
    headline: "Ask less. Show sooner.",
    before: W("b-groups", 1200, 512, "The demo’s questionnaire step that came before any results"),
    after: W("new-results", 1440, 810, "The final projects page: four filters in a top bar and results straight away", "filters"),
    versions: [
      { r: 0, t: "Results fed by the hero form" },
      { r: 2, t: "A basic-info step before results" },
      { r: 5, t: "Real province borders, no dots" },
      { r: 8, t: "Budget histogram" },
      { r: 10, t: "Multi-select province and city" },
      { r: 20, t: "Intake as one sentence" },
      { r: 24, t: "Steps again, with the photo map" },
      { r: 26, t: "Intake page deleted" },
    ],
    notes: [
      { r: "R2", t: "First take basic information, then show results. Keep the main filters at the top, within reach." },
      { r: "R20", t: "A different, creative process for each section, as long as it gets easier." },
      { r: "R24", t: "This structure doesn’t suit our persona." },
      { r: "R26", t: "Delete this page. Go straight to results, with four main filters in one bar." },
    ],
    dropped: ["Form in the hero", "Four-step intake", "One-sentence intake", "Map inside the location popover", "Dotted maps", "“Show farther projects” switch"],
    decision: "Results open at once, with route, domain, location and budget on top and everything else beside them. Show projects first and let people narrow them.",
  },
  {
    id: "dossier",
    label: "Project dossier",
    headline: "Read the same way, every time.",
    before: W("b-detail", 860, 800, "The demo’s project details in a dialog, with “not recorded” repeated across fields"),
    after: W("a-detail", 1200, 917, "The final project page: a photo gallery, identity facts and the start of the dossier"),
    versions: [
      { r: 0, t: "A storytelling page with key numbers" },
      { r: 2, t: "Every source field, empty ones marked" },
      { r: 3, t: "The bold expert card returns" },
      { r: 6, t: "Province outline with the county filled" },
      { r: 9, t: "Entry steps as a roadmap" },
      { r: 15, t: "A right-to-left risk gauge" },
      { r: 21, t: "Return chart and peer comparison" },
      { r: 25, t: "Same chapters for every project" },
      { r: 27, t: "One fixed section order" },
    ],
    notes: [
      { r: "Brief", t: "Highly readable, with storytelling, not text after text." },
      { r: "R15", t: "This design is right-to-left; gradients in charts must respect that." },
      { r: "R21", t: "Where a chart can be used, use one." },
      { r: "R25", t: "Every project detail should share the same basic structure." },
    ],
    dropped: ["A timeline that looked draggable", "Large dotted location map", "Fact cards of uneven height", "“Data and income pattern” chart", "Dot plot of similar projects", "Chapter numbers"],
    decision: "One section order for every project type, with a chart wherever the data allows. A dossier is read the same way each time, and an unknown value is shown as unknown.",
  },
  {
    id: "assistant",
    label: "Assistant",
    headline: "Invite a sentence. Don’t explain yourself.",
    before: W("b-assistant", 1200, 750, "The demo’s guided questionnaire, starting with photo cards for each route"),
    after: W("assistant", 1440, 900, "The assistant: a conversation that returns up to ten projects with match percentages", "."),
    versions: [
      { r: 0, t: "A prompt and up to ten suggestions" },
      { r: 9, t: "A real chat, composer at the bottom" },
      { r: 13, t: "An “intelligent” look with reasoning steps" },
      { r: 14, t: "Short title, saved conditions as a chip" },
      { r: 17, t: "Green glow removed" },
      { r: 20, t: "Understood conditions as chips" },
      { r: 24, t: "Sides swapped for right-to-left" },
    ],
    notes: [
      { r: "R9", t: "A field on top with answers below it doesn’t make sense as a flow." },
      { r: "R14", t: "Too busy and full of text. At most a shortcut, like adding a skill." },
      { r: "R24", t: "Answers on the left, my questions on the right." },
    ],
    dropped: ["Field on top, answers below", "Long welcome title", "Green background glow", "Messages on the wrong side"],
    decision: "A plain chat with one short title and saved conditions one click away. The assistant invites a sentence instead of explaining itself.",
  },
  {
    id: "compare",
    label: "Compare",
    headline: "Compare and ask in the same place.",
    before: { none: "Not a page in the demo. A small compare bar came first, and the page was added in round 20." },
    after: W("compare", 1440, 1209, "The compare page: two to four projects with charts, a table and a small chat", "."),
    versions: [
      { r: 5, t: "Compare up to three from a bottom bar" },
      { r: 20, t: "Its own page, with a data-grounded chat" },
      { r: 23, t: "Empty state and a sticky assistant column" },
      { r: 24, t: "Chat sides swapped" },
    ],
    notes: [
      { r: "R20", t: "Compare two to four projects, and talk with AI about them on the same page." },
      { r: "R23", t: "Keep the assistant in a column that stays while scrolling, and start from an empty state, not four empty slots." },
    ],
    dropped: ["Four empty slots", "A compare tray at the bottom"],
    decision: "Table, charts and assistant on one screen. Comparing and asking happen in the same place, right before calling an expert.",
  },
];

const shotSrc = (img: string) => `${IMG}/${img.replace(/^\.\//, "")}.webp`;

const WalkShot = ({ s, muted }: { s: WShot; muted?: boolean }) => (
  <img alt={s.alt} className={cn("w-full rounded-xl border border-rule bg-white", muted ? "opacity-90 saturate-[0.6]" : "shadow-[0_30px_60px_-30px_rgb(0_60_60/0.35)]")} height={s.h} loading="lazy" src={shotSrc(s.img)} width={s.w} />
);

const VersionTrack = ({ versions }: { versions: Walk["versions"] }) => {
  const last = versions[versions.length - 1].r;
  return (
    <div>
      <div className="relative mx-2 h-4">
        <div className="absolute inset-x-0 top-1/2 h-px bg-rule" />
        {Array.from({ length: 28 }, (_, i) => (
          <span className="absolute top-1/2 h-1.5 w-px -translate-y-1/2 bg-rule" key={i} style={{ left: `${(i / 27) * 100}%` }} />
        ))}
        {versions.map((v, i) => (
          <span
            className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-paper"
            key={`${v.r}-${i}`}
            style={{ left: `${(v.r / 27) * 100}%`, background: v.r === last ? TEAL_TEXT : BLUE, opacity: v.r === last ? 1 : 0.75 }}
          />
        ))}
      </div>
      <div className="mx-2 mt-1 flex justify-between font-mono text-[0.62rem] text-ink-soft"><span>v1 · Nov 10</span><span>Round 27 · Nov 16</span></div>
      <ol className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
        {versions.map((v, i) => (
          <li className="flex gap-3 text-sm" key={`${v.r}-${i}`}>
            <span className="w-9 shrink-0 font-mono text-xs leading-5" style={{ color: v.r === last ? TEAL_TEXT : BLUE }}>{v.r === 0 ? "v1" : `R${v.r}`}</span>
            <span className={cn("leading-5", v.r === last ? "font-medium" : "text-ink-soft")}>{v.t}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

const Walkthrough = () => (
  <>
    <nav aria-label="Sections in this walkthrough" className="sticky top-16 z-20 mt-12 -mx-2 flex gap-2 overflow-x-auto rounded-full bg-paper/85 px-2 py-2 backdrop-blur">
      {walk.map((s, i) => (
        <a className="shrink-0 rounded-full px-3 py-1.5 text-ink-soft text-sm ring-1 ring-rule transition hover:text-ink" href={`#walk-${s.id}`} key={s.id}>
          <span className="font-mono text-[0.7rem]" style={{ color: TEAL_TEXT }}>{String(i + 1).padStart(2, "0")}</span> {s.label}
        </a>
      ))}
    </nav>
    <ol className="mt-10 space-y-32">
      {walk.map((s, i) => (
        <li className="scroll-mt-32" id={`walk-${s.id}`} key={s.id}>
          <Reveal className="flex flex-wrap items-baseline gap-x-5 gap-y-2 border-rule border-t pt-6">
            <span className="font-mono text-sm" style={{ color: TEAL_TEXT }}>{String(i + 1).padStart(2, "0")} · {s.label}</span>
            <h3 className="font-display text-3xl leading-tight sm:text-4xl">{s.headline}</h3>
          </Reveal>

          {/* before / after */}
          <div className="mt-8 grid items-start gap-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="mb-3 flex items-center gap-2 font-mono text-[0.72rem] text-ink-soft uppercase"><span className="size-2 rounded-full bg-ink-soft/50" />Before · HTML demo</p>
              {"img" in s.before && <WalkShot muted s={s.before} />}
              {"quote" in s.before && (
                <figure className="rounded-xl border border-rule bg-white p-6 text-[#2F3533]">
                  <blockquote className="font-display text-xl leading-snug">{s.before.quote}</blockquote>
                  <figcaption className="mt-3 text-[#5b6361] text-sm">{s.before.note}</figcaption>
                </figure>
              )}
              {"none" in s.before && (
                <div className="grid aspect-[4/3] place-items-center rounded-xl border border-rule border-dashed bg-paper-2/60 p-6 text-center text-ink-soft text-sm">{s.before.none}</div>
              )}
            </Reveal>
            <Reveal className="lg:col-span-7" delay={0.08}>
              <p className="mb-3 flex items-center gap-2 font-mono text-[0.72rem] uppercase" style={{ color: TEAL_TEXT }}><span className="size-2 rounded-full" style={{ background: TEAL }} />After · round 27</p>
              <WalkShot s={s.after} />
            </Reveal>
          </div>

          {/* filmstrip of rendered versions */}
          {s.film && (
            <Reveal className="mt-8">
              <p className="font-mono text-[0.72rem] text-ink-soft uppercase tracking-[0.06em]">How it got here · rendered from the git history</p>
              <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {s.film.map((f, j) => (
                  <figure key={f.img}>
                    <div className="relative">
                      <img alt={`The hero at ${f.label}`} className={cn("w-full rounded-lg border bg-white", j === s.film!.length - 1 ? "border-transparent ring-2" : "border-rule")} height={750} loading="lazy" src={`${IMG}/versions/${f.img}.webp`} style={j === s.film!.length - 1 ? { ["--tw-ring-color" as string]: TEAL } : undefined} width={1200} />
                      {j < s.film!.length - 1 && (
                        <svg aria-hidden className="-right-[0.6rem] -translate-y-1/2 absolute top-1/2 z-10 hidden size-5 rounded-full bg-paper p-0.5 text-ink-soft ring-1 ring-rule lg:block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 16 16"><path d="M6 4l4 4-4 4" /></svg>
                      )}
                    </div>
                    <figcaption className="mt-2 font-mono text-[0.68rem] text-ink-soft">{f.label}</figcaption>
                  </figure>
                ))}
              </div>
            </Reveal>
          )}

          {/* versions on a 27-round axis */}
          <Reveal className="mt-8 rounded-2xl border border-rule bg-paper p-5 sm:p-6">
            <p className="mb-4 font-mono text-[0.72rem] text-ink-soft uppercase tracking-[0.06em]">{s.versions.length} versions across the rounds</p>
            <VersionTrack versions={s.versions} />
          </Reveal>

          {/* thinking */}
          <div className="mt-4 grid gap-4 lg:grid-cols-12">
            <Reveal className="rounded-2xl border border-rule bg-paper p-5 sm:p-6 lg:col-span-7">
              <p className="font-mono text-[0.72rem] text-ink-soft uppercase tracking-[0.06em]">What I saw in review</p>
              <ol className="relative mt-5 space-y-5 border-rule border-s ps-6">
                {s.notes.map((n) => (
                  <li className="relative" key={n.r + n.t}>
                    <span aria-hidden className="-start-[1.85rem] absolute top-1.5 size-2.5 rounded-full ring-4 ring-paper" style={{ background: BLUE }} />
                    <p className="font-mono text-[0.7rem]" style={{ color: BLUE }}>{n.r}</p>
                    <p className="mt-1 leading-relaxed">{n.t}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
            <div className="grid gap-4 lg:col-span-5">
              <Reveal className="rounded-2xl border border-rule border-dashed bg-paper-2/50 p-5 sm:p-6" delay={0.06}>
                <p className="font-mono text-[0.72rem] text-ink-soft uppercase tracking-[0.06em]">Built, then dropped</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {s.dropped.map((d) => (
                    <li className="rounded-full bg-paper px-3 py-1 text-ink-soft text-sm line-through decoration-ink-soft/50 ring-1 ring-rule" key={d}>{d}</li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="h-full rounded-2xl p-5 text-white sm:p-6" style={{ background: TEAL_TEXT }}>
                  <p className="font-mono text-[0.72rem] text-white/75 uppercase tracking-[0.06em]">The decision</p>
                  <p className="mt-3 font-display text-xl leading-snug">{s.decision}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </li>
      ))}
    </ol>
  </>
);

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
          <Reveal className="mt-10 rounded-2xl border border-rule bg-paper p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="font-mono text-[0.72rem] text-ink-soft uppercase tracking-[0.06em]">Naming, in four attempts</p>
              <p className="text-ink-soft text-sm">A name has to read right in Persian at a glance.</p>
            </div>
            <ol className="mt-6 grid gap-3 sm:grid-cols-5">
              {names.map((n, i) => (
                <li className={cn("relative rounded-xl p-4", n.out ? "bg-paper-2/60" : "text-white")} key={n.r + n.en} style={n.out ? undefined : { background: TEAL_TEXT }}>
                  <p className={cn("font-mono text-[0.65rem]", n.out ? "text-ink-soft" : "text-white/75")}>{n.r}</p>
                  <p className={cn("mt-2 font-display text-2xl", n.out && "text-ink-soft line-through decoration-ink-soft/40")} dir="rtl" lang="fa">{n.fa}</p>
                  <p className="mt-1 text-sm">{n.en}</p>
                  <p className={cn("mt-1 text-xs leading-snug", n.out ? "text-ink-soft" : "text-white/80")}>{n.note}</p>
                  {i < names.length - 1 && <span aria-hidden className="-right-2.5 -translate-y-1/2 absolute top-1/2 z-10 hidden text-ink-soft sm:block">›</span>}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* 07 — Section by section */}
      <section className="py-24">
        <div className={wrap}>
          <Chapter label="Section by section" n="07" title="From a question to a person to call.">
            <p>Nine parts of the product, each from the original demo to round 27: every version on the way, what I saw in review, what was built and dropped, and the decision that shaped the final design.</p>
          </Chapter>
          <Walkthrough />
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

          {/* colour timeline */}
          <Reveal className="mt-14 rounded-3xl border border-white/10 p-6 sm:p-10">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="font-display text-2xl">Colour, round by round</p>
              <p className="max-w-md text-sm text-white/55">Green carried everything at first. Over 27 rounds it was narrowed to one job, and a blue took over selection and data.</p>
            </div>
            <div className="mt-8"><ColourTimeline /></div>
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
                { who: "Me", tone: TEAL_TEXT, items: ["Brief, brand, content and platform rules", "Source demo and references", "Written, screenshot-based review of all ~27 rounds", "A kickoff and ideation procedure (round 19)", "The calls: compass hero, name, colour and text rules, removing the intake"] },
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
                  <div className="flex h-28 items-end rounded-xl bg-paper-2/70 p-1.5">
                    <div className={cn("flex w-full flex-col justify-end rounded-lg px-2 py-2 text-center", d.rounds ? "text-white" : "text-ink-soft")} style={d.rounds ? { background: TEAL_TEXT, height: `${30 + (d.rounds / 7) * 70}%` } : { height: "100%" }}>
                      <p className="font-mono text-[0.62rem] uppercase opacity-80">{d.dow}</p>
                      <p className="font-display text-2xl leading-none">{d.day}</p>
                      {d.rounds && <p className="mt-1 font-mono text-[0.62rem] opacity-90">{d.rounds} rounds</p>}
                    </div>
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

          {/* turning points */}
          <Reveal className="mt-6 rounded-3xl border border-rule bg-paper p-6 sm:p-8">
            <p className="font-mono text-[0.72rem] text-ink-soft uppercase tracking-[0.06em]">Ten turning points</p>
            <ol className="relative mt-6 border-rule border-s">
              {turning.map((t, i) => (
                <li className="relative grid gap-2 py-4 ps-6 md:grid-cols-[9rem_1fr_1fr] md:gap-6" key={t.t}>
                  <span aria-hidden className="-start-[0.4rem] absolute top-[1.35rem] size-3 rounded-full ring-4 ring-paper" style={{ background: i === turning.length - 1 ? TEAL_TEXT : BLUE }} />
                  <div>
                    <p className="font-mono text-xs" style={{ color: BLUE }}>{t.r}</p>
                    <p className="font-mono text-[0.65rem] text-ink-soft">{t.day}</p>
                  </div>
                  <div>
                    <p className="font-display text-xl leading-snug">{t.t}</p>
                    <p className="mt-2 text-ink-soft text-sm leading-relaxed"><span className="line-through decoration-ink-soft/40">{t.before}</span></p>
                    <p className="mt-1 text-sm leading-relaxed" style={{ color: TEAL_TEXT }}>→ {t.after}</p>
                  </div>
                  <p className="self-center text-ink-soft text-sm italic leading-relaxed md:border-rule md:border-s md:ps-6">{t.why}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* principles */}
          <Reveal className="mt-6">
            <p className="font-mono text-[0.72rem] text-ink-soft uppercase tracking-[0.06em]">The rules I kept setting</p>
          </Reveal>
          <RevealGroup className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((pr, i) => (
              <RevealItem className="flex flex-col rounded-2xl bg-paper p-5 ring-1 ring-rule" key={pr.p}>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-mono text-[0.68rem]" style={{ color: TEAL_TEXT }}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-mono text-[0.62rem] text-ink-soft">{pr.r}</span>
                </div>
                <p className="mt-3 font-display text-lg leading-snug">{pr.p}</p>
                <p className="mt-1.5 text-ink-soft text-sm leading-relaxed">{pr.n}</p>
              </RevealItem>
            ))}
          </RevealGroup>

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
