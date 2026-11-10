// Kudos: employee-recognition software built at Novaday. Told as a story
// (NN/g story mountain): who it's for → why a product this size is hard →
// the insight (a screen isn't done until its rules are written) → the
// employee side, the HR side and the system → where it stands. Every screen
// is from the Kudos Figma file; Persian copy is translated, not invented.

import { Vazirmatn } from "next/font/google";
import Image from "next/image";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import type { CaseStudy } from "@/lib/case-studies";
import { cn } from "@/lib/utils";
import { periodLabel, wrap } from "../blocks";
import { IPhoneShot, MacBook } from "../devices";
import { BeforeAfter, type Hotspot, Hotspots, type PageTab, PageSwitcher } from "../novin/interactive";
import { ReadingProgress } from "../novin/reading-progress";
import { type GuideStep, GuideTour, NoteSystem, type NoteType } from "./interactive";

const vazir = Vazirmatn({ subsets: ["arabic", "latin"], weight: ["400", "500", "700"] });
const IMG = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/work/kudos`;

// Kudos red, sampled from the file's thumbnail and logo.
const C = { red: "#E6294D", deep: "#B5153A", ink: "#2a0a12", blush: "#FDEEF1" };

const Chapter = ({ n, label, title, children, dark }: { n: string; label: string; title: React.ReactNode; children?: React.ReactNode; dark?: boolean }) => (
  <Reveal className="grid gap-6 lg:grid-cols-12">
    <div className="lg:col-span-7">
      <p className={cn("font-mono text-[0.78rem] uppercase tracking-[0.06em]", dark ? "text-[#ffb3c0]" : "text-ink-soft")}>
        <span className={dark ? "text-white" : "text-signal"}>{n}</span> · {label}
      </p>
      <h2 className="mt-4 font-display text-4xl leading-[1.05] sm:text-5xl">{title}</h2>
    </div>
    {children && <div className={cn("space-y-3 self-end leading-relaxed lg:col-span-4 lg:col-start-9", dark ? "text-white/75" : "text-ink-soft")}>{children}</div>}
  </Reveal>
);

/* ───────────── content ───────────── */

const roles = [
  {
    tag: "Employees",
    body: "Send a colleague a gift card with coins and a note, vote in surveys, sign up for volunteer events, take on challenges, then spend coins in the company marketplace or withdraw them as rials.",
  },
  {
    tag: "HR & managers",
    body: "Run surveys, events, challenges and gift cards, onboard new hires with a checklist, manage colleagues, groups and access, and see who is taking part and how the team feels.",
  },
  {
    tag: "Novaday",
    body: "A super-admin side for the team behind Kudos, plus pricing and subscription pages for the companies that sign up.",
  },
];

const tensions = [
  { title: "A whole HR product", body: "Recognition, surveys, events, challenges, a marketplace, a wallet, onboarding, reports and settings: dozens of pages, each with its own states." },
  { title: "Many companies, one app", body: "Each company configures Kudos its own way, and one person can belong to several companies and switch between them." },
  { title: "Worthless if unused", body: "Recognition only works if people actually send it. Every feature had to be easy to start and visible to the HR team when it wasn’t working." },
];

const notes: NoteType[] = [
  { id: "note", label: "Note", fa: "نوت برای نوشتن یادداشت", use: "General notes and context for whoever opens the frame next.", tint: "#F3DDF6", ink: "#B03ACB", icon: "✎", example: { where: "First-run guide", text: "Welcome to Kudos! If you’re a manager or company representative, create your company for free on the left. Otherwise, enter your membership code or accept your invitation on the right." } },
  { id: "dev", label: "Dev", fa: "نوت برای نوشتن نکات مورد توجه دولوپرها", use: "Rules engineers must follow: logic, permissions, conditions.", tint: "#DDF8F4", ink: "#0FB59B", icon: "</>", example: { where: "Navigation", text: "We show this icon to managers only." } },
  { id: "info", label: "Info", fa: "نوت برای نوشتن تولتیپ‌ها و اطلاع‌رسانی", use: "The exact copy for tooltips and notifications.", tint: "#DCEBF5", ink: "#3D8FD8", icon: "i", example: { where: "Support", text: "If you need more information or run into a problem, click the support icon and open a ticket." } },
  { id: "like", label: "Like", fa: "نوت برای نوشتن نقاط مثبت و نظرات موافق", use: "What works, and agreement in reviews.", tint: "#E2F8E2", ink: "#2FB350", icon: "👍" },
  { id: "dislike", label: "Dislike", fa: "نوت برای نوشتن نقاط منفی و نظرات مخالف", use: "What doesn’t work, and disagreement in reviews.", tint: "#FBE2E3", ink: "#E6352B", icon: "👎" },
  { id: "star", label: "Star", fa: "نوت برای نوشتن نکات مهم و قابل توجه", use: "The one thing nobody should miss.", tint: "#FBF7DF", ink: "#E0A800", icon: "★" },
];

const feedPoints: Hotspot[] = [
  { x: 90, y: 5, title: "The company, not the vendor", body: "The company’s own logo and name lead the header. Tap the arrow to switch between companies you belong to; the moon switches to dark mode, where the logo sits on a white chip to stay legible." },
  { x: 64, y: 13, title: "Thank someone first", body: "One composer with three modes: Appreciation, Post and Announcement. Recognition is the first option, not a feature three menus deep." },
  { x: 88, y: 16, title: "Your balance", body: "Coins and their value in rials. If the company turns rial balances off, that line simply disappears." },
  { x: 20, y: 25, title: "How are you today?", body: "A month of moods, one emoji per day. Missed days are greyed out, and once the daily limit is reached the badge shows a timer and a tooltip instead." },
  { x: 50, y: 30, title: "Announcements", body: "Company news in a carousel above the feed, so it never buries people’s posts." },
  { x: 88, y: 38, title: "Workspace", body: "Every older feature, one tap away: top achievers, surveys, events, challenges, marketplace and albums." },
  { x: 20, y: 50, title: "Starting soon", body: "Surveys and events that are live or start within 24 hours, live ones first. Anything further out stays off the home screen." },
  { x: 52, y: 58, title: "Moments of empathy", body: "The feed itself: thank-yous, congratulations and posts from colleagues, with likes and comments." },
  { x: 88, y: 64, title: "Occasions this month", body: "Birthdays, work anniversaries and new colleagues. Past three people it reads “Roya and 4 others”; with nothing to celebrate, the card hides." },
  { x: 20, y: 66, title: "Top achievers", body: "Ranked by coins earned, not coins held, so spending your rewards never costs you your place." },
  { x: 20, y: 83, title: "Someone to thank", body: "The colleagues who’ve had the fewest gift cards from you, starting with your own groups, so recognition reaches the quiet people too." },
  { x: 88, y: 84, title: "Best sellers", body: "Popular marketplace rewards, each a tap from its details page." },
];

// Screens collected per product and area in the competitive analysis (1 = collected).
const research = {
  areas: ["Dashboard", "Posts", "Gift cards & rewards", "Marketplace", "Surveys", "Group events", "Other"],
  rows: [
    { name: "Motivosity", has: [1, 1, 1, 1, 1, 1, 0] },
    { name: "Bonusly", has: [1, 1, 1, 1, 0, 0, 0] },
    { name: "Empuls", has: [1, 1, 1, 1, 1, 1, 1] },
    { name: "Awardco", has: [1, 1, 1, 1, 0, 0, 1] },
    { name: "Kudos (Canada)", has: [1, 1, 1, 0, 1, 1, 1] },
    { name: "WorkTango", has: [1, 1, 1, 0, 1, 0, 1] },
    { name: "Bucketlist Rewards", has: [1, 1, 1, 1, 0, 0, 0] },
    { name: "Achievers", has: [1, 1, 1, 1, 0, 0, 1] },
  ],
};

const shifts = [
  { from: "A dashboard of widgets", to: "A feed of people", body: "Version 1 showed rows of surveys, events and cards to look at. Version 2 opens on what colleagues are saying to each other." },
  { from: "Recognition as one section", to: "Recognition as the first action", body: "Gift cards were one row among four. Now “Appreciation” is the first button on the page." },
  { from: "Everything, always", to: "Only what’s relevant", body: "Events show up a day before they start, occasions only when there are some, rial balances only if the company uses them." },
  { from: "Kudos’ brand", to: "The company’s brand", body: "The header now carries each company’s logo and name, and lets people who work for several companies switch between them." },
];



const guide: GuideStep[] = [
  { src: `${IMG}/guide-1.webp`, width: 1541, height: 574, title: "Create or join a company", text: "Welcome to Kudos! If you’re a manager or company representative, create your company for free. Otherwise, enter your membership code or accept your invitation. No code? Ask your company representative to send one." },
  { src: `${IMG}/guide-2.webp`, width: 1541, height: 574, title: "Invite your team", text: "Add your team members so invitations go out to them. This step is optional and you can do it later. After each person, click (+) at the end of the row to save them." },
  { src: `${IMG}/guide-3.webp`, width: 1541, height: 574, title: "The header", text: "You’re in. From here you can see what matters most: notifications, your coin and rial balances, the number of users and the time left on your Kudos subscription." },
  { src: `${IMG}/guide-4.webp`, width: 1541, height: 574, title: "Your account", text: "Manage your personal details and profile photo here. If you belong to more than one company, switch between them under “My companies”." },
  { src: `${IMG}/guide-5.webp`, width: 1541, height: 574, title: "The menu", text: "Everything else lives here: the colleagues list, the company marketplace and, for managers, the admin sections." },
];

const onboardingItems = [
  "Documents and forms the new hire needs",
  "The company handbook, as a file",
  "A first-week agenda, task by task",
  "Logins for company tools",
  "What to bring on day one",
  "Dress code, and how to get in and where to park",
  "A welcome gift of coins, with a message",
];

const dashboardQuestions = [
  { q: "Are people using it?", a: "Take-up for each feature (surveys, events, gift cards, marketplace, challenges) and the share of active users." },
  { q: "How does the team feel?", a: "The organisational mood check: how many answered, how many didn’t, and how many are happy or unhappy." },
  { q: "Where is the money going?", a: "Marketplace purchases approved, pending and rejected, items out of stock, and withdrawal requests." },
  { q: "What’s changing?", a: "A month-by-month chart of gift cards, automatic top-ups and expiries, and survey, event and challenge winners." },
];

const featurePages: PageTab[] = [
  { id: "gifts", label: "Gift cards", src: `${IMG}/gift-cards.webp`, width: 2560, height: 1800, notes: ["Who it’s from, who it’s for, a title like “Outstanding consultant” and the coins attached.", "A reason in the colleague’s own words: “for all your help delivering the Access project”.", "Public by default, so recognition is seen, not just received."] },
  { id: "surveys", label: "Surveys", src: `${IMG}/surveys.webp`, width: 2560, height: 1800, notes: ["Competitive polls such as “Most professional colleague of the month”.", "Vote from a list of colleagues; a podium shows the top three.", "Live results with the total number of votes."] },
  { id: "events", label: "Events", src: `${IMG}/events.webp`, width: 2560, height: 1800, notes: ["Volunteer tasks posted by colleagues, with a coin reward and days left.", "One button to sign up.", "Participants listed, with trophies for those who delivered."] },
  { id: "challenges", label: "Challenges", src: `${IMG}/challenges.webp`, width: 2560, height: 1800, notes: ["Team goals as progress rings, like 120 of 200 survey votes.", "The coin reward is always visible.", "A Claim button appears only when the goal is reached."] },
  { id: "mood", label: "My mood", src: `${IMG}/thermometer-mine.webp`, width: 2684, height: 1800, notes: ["“How are you feeling now?” with a calendar of past answers.", "Today compared with yesterday.", "A personal history with tags, private to the employee."] },
  { id: "market", label: "Marketplace", src: `${IMG}/market.webp`, width: 2560, height: 1800, notes: ["Rewards from real brands, such as restaurant credit, paid for in coins.", "Each card shows the price, stock and expiry date before you commit.", "Search and filters for when the catalogue grows."] },
  { id: "wallet", label: "Wallet", src: `${IMG}/wallet.webp`, width: 2560, height: 1800, notes: ["Coin and rial balances, and a converter (1 coin = 10,000 rials).", "Request a withdrawal in one step.", "A history of every request: approved, pending or rejected."] },
];

const adminPages: PageTab[] = [
  { id: "colleagues", label: "Colleagues", src: `${IMG}/admin-colleagues.webp`, width: 2684, height: 1800, notes: ["Everyone in the company, with their groups, coins and balance.", "A row menu for the four things HR does most: edit, add to a group, adjust coins or balance, remove.", "Add a colleague from the top of the table."] },
  { id: "groups", label: "Groups", src: `${IMG}/admin-groups.webp`, width: 2684, height: 1800, notes: ["Teams such as Technical, Finance, Development and Sales.", "Each group shows its head, its members and what it’s allowed to do.", "Permissions as chips, readable at a glance."] },
  { id: "access", label: "Access", src: `${IMG}/admin-access.webp`, width: 2684, height: 2218, notes: ["About eighteen permissions, from the social feed to the marketplace and medals.", "Grant each one to groups, not people, so access follows the org chart.", "One list to audit who can do what."] },
  { id: "report", label: "Mood report", src: `${IMG}/reports.webp`, width: 2560, height: 1800, notes: ["Average mood day by day, as a line.", "Participation at a glance: 83% in the sample data.", "Average respondents and answers, so HR knows how much to trust the trend."] },
  { id: "mood", label: "Team mood", src: `${IMG}/admin-thermometer.webp`, width: 2684, height: 2172, notes: ["How the company feels, as a chart over time.", "How many colleagues took part.", "Each answer with its mood, tags and time, for HR to follow up."] },
];

const templates = [
  { k: "Birthday", t: "Happy birthday, {name}! {x} coins have been added to your wallet." },
  { k: "Anniversary", t: "To mark the {hiring / company} anniversary, {x} coins have been added to your wallet." },
  { k: "Joining Kudos", t: "Welcome to {company}! {x} coins have been added to your wallet." },
  { k: "Special gift", t: "{name}, for {reason}, you’ve been given {x} coins." },
  { k: "Auto top-up", t: "Your wallet was topped up automatically with {x}." },
  { k: "Deduction", t: "Because of {reason}, {x} was deducted from your wallet." },
];

const pricingRules = [
  { range: "1–50 users", rule: "Confirm and go straight to payment." },
  { range: "51–200 users", rule: "Pay now, or after a consultation and demo." },
  { range: "200+ users", rule: "The price is set after a consultation." },
];


const components = ["Button", "Text field", "Persian calendar", "Checkbox & radio", "Tooltip", "Snackbar", "Modal", "Empty state", "Skeleton", "Pagination", "Badge", "Toolbar", "Menu & header"];

const comingSoonList = ["Performance reviews", "Photo albums", "Petty cash", "Subscription management", "Marketplace", "Donations", "Integrations"];

/* ───────────── page ───────────── */

export function KudosLayout({ cs }: { cs: CaseStudy }) {
  return (
    <div className="relative">
      <ReadingProgress />

      {/* 00 · Hero */}
      <section className="relative overflow-hidden pt-14 pb-0 text-white" style={{ background: `linear-gradient(135deg, ${C.deep} 0%, ${C.red} 60%, #f04b67 100%)` }}>
        <div aria-hidden className="absolute inset-0 opacity-[0.16]" style={{ backgroundImage: "radial-gradient(#fff 1.2px, transparent 1.4px)", backgroundSize: "26px 26px", maskImage: "radial-gradient(ellipse at 25% 25%, #000 20%, transparent 70%)" }} />
        <div className={cn(wrap, "relative")}>
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-md bg-white px-3 py-1 font-mono text-[0.75rem] uppercase tracking-[0.08em]" style={{ color: C.deep }}>B2B SaaS · HR</span>
              <span className="flex items-center gap-2 rounded-full border border-white/35 px-3 py-1 font-mono text-[0.72rem] uppercase tracking-[0.06em]">
                <span className="size-1.5 rounded-full bg-[#ffd166]" /> Live with real companies
              </span>
            </div>
            <h1 className="mt-8 font-display text-[clamp(3rem,9vw,6.5rem)] leading-[0.9] tracking-tight">Kudos</h1>
            <p className="mt-6 max-w-3xl font-display text-2xl text-white/90 leading-snug sm:text-[2.1rem]">
              A thank-you at work is easy to say and easy to forget. Kudos makes it visible, gives it value, and shows HR whether it’s happening.
            </p>
          </Reveal>
          <dl className="mt-12 grid grid-cols-2 gap-6 border-white/30 border-y py-6 sm:grid-cols-4">
            {[
              ["Role", "Product Designer, Novaday"],
              ["Timeline", periodLabel(cs) ?? "—"],
              ["Platform", "Web, responsive to mobile"],
              ["Team", "PM, QA and engineering"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[0.72rem] text-white/65 uppercase tracking-[0.06em]">{k}</dt>
                <dd className="mt-2">{v}</dd>
              </div>
            ))}
          </dl>
          <Reveal className="relative mx-auto mt-14 max-w-5xl translate-y-10" delay={0.1}>
            <MacBook>
              <Image alt="The Kudos feed: appreciation posts, announcements, a mood calendar, balances and occasions" className="block h-auto w-full" height={2140} priority sizes="(min-width: 1024px) 70vw, 100vw" src={`${IMG}/feed.webp`} width={2684} />
            </MacBook>
          </Reveal>
        </div>
      </section>

      {/* In short */}
      <section className={cn(wrap, "relative z-10 pt-24 pb-8")}>
        <RevealGroup className="grid gap-px overflow-hidden rounded-2xl border border-rule bg-rule md:grid-cols-3">
          {[
            ["The product", "Employee-recognition software: colleagues thank each other with gift cards and coins, and HR runs surveys, events, challenges and onboarding in the same place."],
            ["My role", "Product designer at Novaday: the redesign from a dashboard to a social network, the employee side and HR admin, a first-run guide, and the shared design system."],
            ["Where it is", "Live, used by real companies. By my count, around 500 people use it."],
          ].map(([k, v]) => (
            <RevealItem className="bg-paper p-7" key={k}>
              <p className="font-mono text-[0.72rem] text-ink-soft uppercase tracking-[0.06em]">{k}</p>
              <p className="mt-3 leading-relaxed">{v}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* 01 · Who it's for */}
      <section className={cn(wrap, "py-24")}>
        <Chapter label="Who it’s for" n="01" title="Three sides of one thank-you.">
          <p>Kudos sits between the people who recognise each other, the HR team that wants a culture of it, and the company that runs the product.</p>
        </Chapter>
        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3">
          {roles.map((r, i) => (
            <RevealItem className="relative overflow-hidden rounded-3xl border border-rule bg-paper p-8" key={r.tag}>
              <span aria-hidden className="absolute -top-14 -right-14 size-36 rounded-full opacity-15" style={{ background: i === 1 ? C.deep : C.red }} />
              <p className="font-mono text-[0.72rem] text-ink-soft uppercase">0{i + 1}</p>
              <p className="mt-4 font-display text-3xl">{r.tag}</p>
              <p className="mt-3 text-ink-soft leading-relaxed">{r.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* 02 · The challenge */}
      <section className="py-24 text-white" style={{ background: C.ink }}>
        <div className={wrap}>
          <Chapter dark label="The challenge" n="02" title="A big product, with many hands on it.">
            <p>The Figma file runs to more than seventy pages. Engineers, a PM and QA all worked from it, so anything left unclear on a screen became a question, a guess or a bug.</p>
          </Chapter>
          <RevealGroup className="mt-14 grid gap-4 md:grid-cols-3">
            {tensions.map((t, i) => (
              <RevealItem className="rounded-2xl border border-white/12 bg-white/[0.04] p-7" key={t.title}>
                <p className="font-mono text-[#ffb3c0] text-xs">0{i + 1}</p>
                <p className="mt-6 font-display text-2xl leading-tight">{t.title}</p>
                <p className="mt-3 text-white/70 leading-relaxed">{t.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 03 · The redesign */}
      <section className="relative overflow-hidden py-28" style={{ background: `color-mix(in oklab, ${C.red} 9%, var(--paper))` }}>
        <div className={wrap}>
          <Reveal>
            <p className="font-mono text-[0.78rem] text-ink-soft uppercase tracking-[0.06em]"><span className="text-signal">03</span> · The turning point</p>
            <p className="mt-8 max-w-5xl font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.02]">
              Recognition is social. So the home screen stopped being a <span className="line-through decoration-[#E6294D]/60">dashboard</span> and became a{" "}
              <span style={{ color: C.red }}>social network</span>.
            </p>
            <p className="mt-6 max-w-2xl text-ink-soft text-lg leading-relaxed">
              Version 1 worked, but it treated a thank-you as one widget among many: something to look at, not something to join. For version 2 I
              redesigned the home screen around people talking to each other, and moved everything else one tap away.
            </p>
          </Reveal>

          <Reveal className="mt-14">
            <BeforeAfter
              accent={C.red}
              after={`${IMG}/ba-v2.webp`}
              afterAlt="Kudos version 2: a social feed with a composer, announcements, posts, moods and occasions"
              afterLabel="v2 · Social"
              before={`${IMG}/ba-v1.webp`}
              beforeAlt="Kudos version 1: a dashboard of balances, surveys, events, gift cards and challenge prizes"
              beforeLabel="v1 · Dashboard"
              height={1800}
              width={2560}
            />
            <p className="mt-4 font-mono text-[0.75rem] text-ink-soft">Drag the handle, or focus it and use ← →.</p>
          </Reveal>

          {/* The research that pointed there. */}
          <div className="mt-20 grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="font-mono text-[0.72rem] text-ink-soft uppercase">Competitive analysis</p>
              <h3 className="mt-3 font-display text-3xl leading-tight">Eight products, seven areas.</h3>
              <p className="mt-4 text-ink-soft leading-relaxed">
                I collected screens from eight recognition products, area by area. Every one of them had a place to post and see recognition in
                public. Only three ran group events. The feed wasn’t a trend to copy; it was the core of the category, and version 1’s home didn’t have one.
              </p>
            </Reveal>
            <Reveal className="overflow-x-auto lg:col-span-8" delay={0.06}>
              <table className="w-full min-w-[560px] border-separate border-spacing-0 text-sm">
                <thead>
                  <tr>
                    <th className="sticky left-0 bg-transparent p-2 text-left font-normal text-ink-soft" />
                    {research.areas.map((a) => (
                      <th className={cn("p-2 text-center font-mono text-[0.68rem] uppercase leading-tight", a === "Posts" ? "text-signal" : "text-ink-soft")} key={a}>{a}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {research.rows.map((r) => (
                    <tr key={r.name}>
                      <td className="whitespace-nowrap border-rule border-t py-2.5 pr-3">{r.name}</td>
                      {r.has.map((h, i) => (
                        <td className={cn("border-rule border-t p-2 text-center", research.areas[i] === "Posts" && "bg-[#E6294D]/8")} key={`${r.name}-${research.areas[i]}`}>
                          {h ? <span className="inline-block size-3 rounded-full" style={{ background: research.areas[i] === "Posts" ? C.red : "color-mix(in oklab, var(--ink) 55%, transparent)" }} /> : <span className="text-ink-soft/40">·</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-3 font-mono text-[0.68rem] text-ink-soft">● screens collected for that area · Posts highlighted</p>
            </Reveal>
          </div>

          <RevealGroup className="mt-20 grid gap-4 md:grid-cols-2">
            {shifts.map((x) => (
              <RevealItem className="rounded-2xl border border-rule bg-paper p-6" key={x.to}>
                <p className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="text-ink-soft line-through">{x.from}</span>
                  <span aria-hidden className="text-ink-soft">→</span>
                  <span className="font-medium" style={{ color: C.red }}>{x.to}</span>
                </p>
                <p className="mt-3 text-ink-soft leading-relaxed">{x.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 04 · Employee home */}
      <section className="py-24">
        <div className={wrap}>
          <Chapter label="The new home" n="04" title="Every block has a rule behind it.">
            <p>A feed looks simple. What makes it work is what each block decides to show, and when. Hover the markers for the rules I wrote beside each one.</p>
          </Chapter>
          <div className="mt-14">
            <Hotspots alt="The Kudos feed, annotated" height={2140} points={feedPoints} src={`${IMG}/feed.webp`} tone="red" width={2684} />
          </div>
        </div>
      </section>

      {/* 03 · Insight */}
      <section className="py-28" style={{ background: `color-mix(in oklab, ${C.red} 8%, var(--paper))` }}>
        <div className={wrap}>
          <Reveal>
            <p className="font-mono text-[0.78rem] text-ink-soft uppercase tracking-[0.06em]"><span className="text-signal">05</span> · How I worked</p>
            <p className="mt-8 max-w-5xl font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.02]">
              A screen isn’t finished until its <span style={{ color: C.red }}>rules</span> are written down.
            </p>
            <p className="mt-6 max-w-2xl text-ink-soft text-lg leading-relaxed">
              So I gave the file a vocabulary: six kinds of note, each with its own colour and icon, placed beside the frames they explain. Logic for
              engineers, exact copy for tooltips, and quick verdicts for reviews each have a place, so nothing important lives only in a chat thread.
            </p>
          </Reveal>
          <div className="mt-14">
            <NoteSystem fontClass={vazir.className} notes={notes} />
          </div>
        </div>
      </section>

      {/* 05 · Features */}
      <section className="border-rule border-t bg-paper-2/60 py-24">
        <div className={wrap}>
          <Chapter label="Features" n="06" title="Every way to take part, one tap from the feed.">
            <p>Each feature earns coins, and every page follows the same pattern: what it is, what you get, one clear action. Pick a page.</p>
          </Chapter>
          <div className="mt-12">
            <PageSwitcher accent={C.red} altSuffix="in Kudos" pages={featurePages} />
          </div>
        </div>
      </section>

      {/* 05b · One dialog, many moments */}
      <section className="py-24">
        <div className={wrap}>
          <Chapter label="Rewards" n="06b" title="One dialog, many moments.">
            <p>Coins arrive for many reasons. Instead of a screen for each, I designed one congratulations dialog for web and mobile, with a message template per occasion and an image each company can swap for its own coin or medal.</p>
          </Chapter>
          <Reveal className="mt-12 overflow-hidden rounded-3xl bg-[#3a3a3c] p-4 sm:p-8">
            <Image alt="Congratulations dialogs for a mood check, survey votes, a Commitment badge and a company anniversary" className="mx-auto block h-auto w-full max-w-5xl" height={968} sizes="(min-width: 1024px) 70vw, 100vw" src={`${IMG}/congrats.webp`} width={3032} />
          </Reveal>
          <RevealGroup className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((t) => (
              <RevealItem className="rounded-2xl border border-rule bg-paper p-5" key={t.k}>
                <p className="font-mono text-[0.7rem] text-ink-soft uppercase">{t.k}</p>
                <p className="mt-2 leading-relaxed">
                  {t.t.split(/(\{[^}]+\})/).map((part, i) =>
                    part.startsWith("{") ? (
                      <span className="rounded bg-[#E6294D]/12 px-1 font-mono text-[0.85em] text-[#B5153A] dark:text-[#ff8da0]" key={`${t.k}-${i}`}>{part}</span>
                    ) : (
                      part
                    )
                  )}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
          <p className="mt-4 font-mono text-[0.72rem] text-ink-soft">Templates from my note in the file, translated. Anything else falls back to a plain version of the same dialog.</p>
        </div>
      </section>

      {/* 06 · First-run guide */}
      <section className="py-24">
        <div className={wrap}>
          <Chapter label="First run" n="07" title="A guide that gets a company set up on its own.">
            <p>A company can create its Kudos workspace for free and invite its people itself. I designed a five-step guide that spotlights one area at a time, and wrote its copy, for managers and staff alike.</p>
          </Chapter>
          <div className="mt-14">
            <GuideTour accent={C.red} steps={guide} />
          </div>
        </div>
      </section>

      {/* 07 · Onboarding */}
      <section className="border-rule border-t bg-paper-2/60 py-24">
        <div className={cn(wrap, "grid items-start gap-12 lg:grid-cols-12")}>
          <Reveal className="lg:col-span-5">
            <p className="font-mono text-[0.78rem] text-ink-soft uppercase tracking-[0.06em]"><span className="text-signal">08</span> · Onboarding</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05]">A new hire’s first week, as a checklist.</h2>
            <p className="mt-6 text-ink-soft leading-relaxed">HR ticks off what a new colleague needs and fills in the details once. Each item can be switched on or off per hire.</p>
            <ul className="mt-6 space-y-2">
              {onboardingItems.map((it) => (
                <li className="flex items-start gap-3" key={it}>
                  <span className="mt-1 grid size-4 shrink-0 place-items-center rounded text-[0.6rem] text-white" style={{ background: C.red }}>✓</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.08}>
            <div className="max-h-[640px] overflow-y-auto overscroll-contain rounded-2xl shadow-[0_30px_60px_-30px_rgb(0_0_0/0.35)] ring-1 ring-black/10 [scrollbar-width:thin]">
              <Image alt="The onboarding checklist HR fills in for a new hire" className="block h-auto w-full" height={2658} sizes="(min-width: 1024px) 55vw, 100vw" src={`${IMG}/onboarding.webp`} width={2560} />
            </div>
            <p className="mt-3 font-mono text-[0.7rem] text-ink-soft">Scroll inside the frame. Sample logins are blurred.</p>
          </Reveal>
        </div>
      </section>

      {/* 08 · HR dashboard */}
      <section className="py-24 text-white" style={{ background: C.ink }}>
        <div className={wrap}>
          <Chapter dark label="The HR side" n="09" title="Four questions, one dashboard.">
            <p>I gathered ten admin and analytics dashboards as references for how others group numbers and charts. The result is organised around four questions HR keeps asking.</p>
          </Chapter>
          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-7">
              <MacBook>
                <Image alt="The Kudos management dashboard: take-up, active users, finances, surveys, mood and monthly activity" className="block h-auto w-full" height={2124} sizes="(min-width: 1024px) 55vw, 100vw" src={`${IMG}/admin-dashboard.webp`} width={2684} />
              </MacBook>
            </Reveal>
            <RevealGroup className="space-y-4 lg:col-span-5">
              {dashboardQuestions.map((d, i) => (
                <RevealItem className="rounded-2xl border border-white/12 bg-white/[0.04] p-5" key={d.q}>
                  <p className="flex items-baseline gap-3 font-display text-xl"><span className="font-mono text-[#ffb3c0] text-xs">0{i + 1}</span>{d.q}</p>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">{d.a}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {
        <section className="py-24">
          <div className={wrap}>
            <Chapter label="Admin" n="10" title="People, groups and permissions.">
              <p>Behind every feature sits a module HR controls, plus the pages that decide who can do what. Pick a page.</p>
            </Chapter>
            <div className="mt-12">
              <PageSwitcher accent={C.red} altSuffix="in the Kudos admin" pages={adminPages} />
            </div>
          </div>
        </section>
      }

      {/* 09b · Pricing rules */}
      <section className="border-rule border-t py-24">
        <div className={cn(wrap, "grid items-center gap-12 lg:grid-cols-12")}>
          <Reveal className="lg:col-span-5">
            <p className="font-mono text-[0.78rem] text-ink-soft uppercase tracking-[0.06em]"><span className="text-signal">10b</span> · Pricing</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05]">One form, three paths.</h2>
            <p className="mt-6 text-ink-soft leading-relaxed">
              Companies sign up through a single setup form. The plan period defaults to a year and the per-user price updates live as you change it.
              What happens next depends on the size of the company:
            </p>
            <ol className="mt-6 space-y-3">
              {pricingRules.map((r, i) => (
                <li className="flex items-start gap-4 rounded-2xl border border-rule bg-paper p-4" key={r.range}>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full font-mono text-sm text-white" style={{ background: C.red }}>{i + 1}</span>
                  <span><span className="block font-medium">{r.range}</span><span className="text-ink-soft text-sm">{r.rule}</span></span>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.08}>
            <MacBook>
              <Image alt="The Kudos consultation and setup form, with plan periods and a live per-user price" className="block h-auto w-full" height={1800} sizes="(min-width: 1024px) 55vw, 100vw" src={`${IMG}/pricing.webp`} width={2684} />
            </MacBook>
          </Reveal>
        </div>
      </section>

      {/* 10 · Mobile */}
      <section className="border-rule border-t bg-paper-2/60 py-24">
        <div className={cn(wrap, "grid items-center gap-12 lg:grid-cols-12")}>
          <Reveal className="lg:col-span-5">
            <p className="font-mono text-[0.78rem] text-ink-soft uppercase tracking-[0.06em]"><span className="text-signal">11</span> · Mobile</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05]">The same day, in a pocket.</h2>
            <p className="mt-6 text-ink-soft leading-relaxed">
              On a phone, the side menu becomes a bottom bar (Home, Marketplace, Colleagues, Settings) and each section turns into a swipeable row, so
              surveys, events and gift cards stay one thumb away.
            </p>
          </Reveal>
          <div className="flex items-start justify-center gap-4 lg:col-span-7">
            {[
              { src: "m-home", h: 2606, label: "v1 · Home" },
              { src: "feed-mobile", h: 1624, label: "v2 · Feed" },
              { src: "market-mobile", h: 1624, label: "Marketplace" },
              { src: "wallet-mobile", h: 1624, label: "Wallet" },
            ].map((m, i) => (
              <Reveal className={cn("w-1/4 max-w-[190px]", i % 2 === 1 && "translate-y-8")} delay={i * 0.06} key={m.src}>
                <IPhoneShot alt={`Kudos ${m.label.toLowerCase()} on mobile`} className="[&_img]:aspect-[375/812] [&_img]:object-cover [&_img]:object-top" height={m.h} sizes="190px" src={`${IMG}/${m.src}.webp`} width={750} />
                <p className="mt-3 text-center font-mono text-[0.7rem] text-ink-soft uppercase">{m.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
        <div className={cn(wrap, "mt-24")}>
          <Reveal>
            <p className="font-mono text-[0.78rem] text-ink-soft uppercase tracking-[0.06em]"><span className="text-signal">11b</span> · The unhappy paths</p>
            <h3 className="mt-4 font-display text-3xl">Designed too: what people see when things go wrong.</h3>
          </Reveal>
          <div className="mt-10 grid items-end gap-8 md:grid-cols-[2fr_1fr_1fr]">
            <Reveal>
              <MacBook>
                <Image alt="A 404 page: the page you’re looking for wasn’t found, with a button back home" className="block h-auto w-full" height={1800} sizes="(min-width: 768px) 45vw, 100vw" src={`${IMG}/error-404.webp`} width={2880} />
              </MacBook>
              <p className="mt-3 font-mono text-[0.7rem] text-ink-soft uppercase">Not found</p>
            </Reveal>
            <Reveal className="mx-auto w-[200px]" delay={0.06}>
              <IPhoneShot alt="Offline screen: your device isn’t connected to the internet, with a Retry button" height={1852} sizes="200px" src={`${IMG}/error-offline-mobile.webp`} width={856} />
              <p className="mt-3 text-center font-mono text-[0.7rem] text-ink-soft uppercase">Offline</p>
            </Reveal>
            <Reveal className="mx-auto w-[200px]" delay={0.12}>
              <IPhoneShot alt="A skeleton of the mobile home while it loads" className="[&_img]:aspect-[375/812] [&_img]:object-cover [&_img]:object-top" height={2494} sizes="200px" src={`${IMG}/skeleton-mobile.webp`} width={750} />
              <p className="mt-3 text-center font-mono text-[0.7rem] text-ink-soft uppercase">Loading</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 11 · Design system */}
      <section className="py-24">
        <div className={wrap}>
          <Chapter label="Design system" n="12" title="One kit for two products.">
            <p>Kudos runs on a Tailwind-based system with a shared UI kit and variables. The same foundation also carried Remeet, the team’s access and meeting product, which won at Tehran Design Week.</p>
          </Chapter>
          <RevealGroup className="mt-12 flex flex-wrap gap-2">
            {components.map((c) => (
              <RevealItem className="rounded-full border border-rule bg-paper px-4 py-2 text-sm" key={c}>{c}</RevealItem>
            ))}
          </RevealGroup>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Reveal className="rounded-3xl border border-rule bg-[#FAFAFA] p-6 text-[#1d1d1f]">
              <p className="font-mono text-[0.72rem] text-[#6e6e73] uppercase">Light</p>
              <div className="mt-4 grid grid-cols-4 gap-3">
                {[["Primary", "#E6294D"], ["Background", "#FAFAFA"], ["Surface", "#FFFFFF"], ["Subtle", "#F6F6F6"]].map(([n, h]) => (
                  <div key={n}><div className="aspect-square rounded-xl ring-1 ring-black/10" style={{ background: h }} /><p className="mt-2 text-xs">{n}</p><p className="font-mono text-[0.65rem] text-[#6e6e73]">{h}</p></div>
                ))}
              </div>
            </Reveal>
            <Reveal className="rounded-3xl bg-[#0F1922] p-6 text-white" delay={0.06}>
              <p className="font-mono text-[0.72rem] text-white/50 uppercase">Dark</p>
              <div className="mt-4 grid grid-cols-4 gap-3">
                {[["Primary", "#E6294D"], ["Background", "#0F1922"], ["Surface", "#243443"], ["Text", "#FFFFFF"]].map(([n, h]) => (
                  <div key={n}><div className="aspect-square rounded-xl ring-1 ring-white/15" style={{ background: h }} /><p className="mt-2 text-xs">{n}</p><p className="font-mono text-[0.65rem] text-white/50">{h}</p></div>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal className="mt-6 flex flex-wrap gap-6">
            {[["Success", "#34C759"], ["Info", "#00C7BE"], ["Warning", "#FFCC00"], ["Danger", "#FF3B30"]].map(([n, h]) => (
              <span className="flex items-center gap-2 text-sm" key={n}><span className="size-5 rounded-full" style={{ background: h }} />{n} <span className="font-mono text-ink-soft text-xs">{h}</span></span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 12 · Where it stands */}
      <section className="py-24 text-white" style={{ background: C.red }}>
        <div className={wrap}>
          <Chapter dark label="Where it stands" n="13" title="Shipped, and in use.">
            <p>Kudos is live with real companies; by my count, around 500 people use it. I can’t attribute numbers to single design decisions, so I won’t.</p>
          </Chapter>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            <Reveal className="rounded-2xl border border-white/30 p-7">
              <p className="font-mono text-white/75 text-xs uppercase">Shipped</p>
              <ul className="mt-4 space-y-2 text-white/95">
                <li>Version 2: the social-network redesign</li>
                <li>Employee side, web and mobile</li>
                <li>HR admin and dashboard</li>
                <li>First-run guide and onboarding</li>
                <li>Design system and note system</li>
              </ul>
            </Reveal>
            <Reveal className="rounded-2xl border border-white/30 p-7" delay={0.08}>
              <p className="font-mono text-white/75 text-xs uppercase">Designed for later</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {comingSoonList.map((c) => (
                  <li className="rounded-full bg-white/15 px-3 py-1 text-sm" key={c}>{c}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="rounded-2xl bg-white p-7 text-[#2a0a12]" delay={0.16}>
              <p className="font-mono text-xs uppercase" style={{ color: C.deep }}>What I took away</p>
              <p className="mt-4 leading-relaxed">
                In a product this size, the design file is a shared workspace, not a gallery. Writing the rules beside the screens made the handoff
                calmer for everyone, and it’s a habit I’ve kept on every project since.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
