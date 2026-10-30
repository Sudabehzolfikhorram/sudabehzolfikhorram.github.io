// Builds the one-page CV PDF in the site's look: `npm run cv`.
// Writes public/Sudabeh-Zolfi-Khorram-Resume.pdf, the file every "Download CV" button links to.
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
// Fonts are inlined: a page built from a string can't load local files.
const font = (p) => `data:font/woff2;base64,${readFileSync(join(root, "node_modules", p)).toString("base64")}`;
const SITE = "https://sudabehzolfikhorram.github.io";
const work = (slug) => `${SITE}/work/${slug}/`;

const contact = [
  { label: "+98 991 206 63 24", href: "tel:+989912066324" },
  { label: "sudabeh.a.zolfikhorram@gmail.com", href: "mailto:sudabeh.a.zolfikhorram@gmail.com" },
  { label: "sudabehzolfikhorram.github.io", href: SITE, strong: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sudabehzolfikhorram2001/" },
  { label: "Telegram", href: "https://t.me/sudabehzolfikhorram" },
  { label: "Instagram", href: "https://www.instagram.com/sudabehzolfi.design" },
];

const experience = [
  {
    title: "Product Designer",
    company: "Algonet",
    mode: "Full-time (on-site)",
    period: "Apr 2026 – Present",
    points: [
      "Designing Atlas, an AI platform that maps how a company really works, plus complex B2B and internal experiences across dashboards, operational tools and system-level workflows.",
      "Built a custom design system with reusable patterns and production-ready components, in close collaboration with product and engineering.",
    ],
    links: [{ label: "Atlas case study", href: work("atlas") }],
  },
  {
    title: "Product Designer",
    company: "AzMan",
    mode: "Remote",
    period: "Oct 2025 – Present",
    points: [
      "Designing three separate products, AzMan, Hamgam Saz and the ERP, each with distinct workflows across service, operations and personnel management.",
      "AzMan: the core experience connecting customers with service providers, covering service requests, expert interactions and key marketplace workflows on web and mobile.",
      "Hamgam Saz: an operational product for managing and synchronising call reports, follow-ups, contact history and privacy-related workflows, keeping customer interactions structured and traceable.",
      "ERP: complex personnel-management workflows, including roles and access levels, operational scopes, document collection, contracts, guarantees, permissions and organisational access.",
    ],
    links: [
      { label: "AzMan", href: work("azman") },
      { label: "ERP", href: work("azman-erp") },
      { label: "Hamgam Saz", href: work("hamgam") },
    ],
  },
  {
    title: "Product Designer",
    company: "Studio Kaaryar",
    mode: "Remote",
    period: "Sep 2025 – Jan 2026",
    points: [
      "Redesigned the full website for a social-impact design studio, improving information architecture, visual storytelling, accessibility and clarity; built a custom design system. Design completed; in development.",
    ],
    links: [
      { label: "Case study", href: work("kaaryar") },
      { label: "studio.kaaryar.ir", href: "https://studio.kaaryar.ir/" },
    ],
  },
  {
    title: "Product Designer",
    company: "Tamdid",
    mode: "Remote",
    period: "Aug 2025 – Jun 2026",
    points: [
      "Designed a fintech product for smart subscription and wallet management, covering payments, wallets and gamification; built a custom design system. Design completed; in development.",
    ],
    links: [{ label: "Case study", href: work("tamdid") }],
  },
  {
    title: "UI/UX Designer",
    company: "ChapAgha",
    mode: "Remote",
    period: "Dec 2024 – Jan 2025",
    points: ["Redesigned the responsive product listing page for business cards, with a clearer layout and stronger mobile usability."],
    links: [{ label: "Dribbble", href: "https://dribbble.com/shots/26236688-Business-Card-PLP" }],
  },
  {
    title: "Product Designer",
    company: "Novaday",
    mode: "Full-time (hybrid)",
    period: "Sep 2024 – Jun 2025",
    points: [
      "Designed two B2B products on a Tailwind-based design system to improve consistency and streamline admin workflows.",
      "Kudos: documented flows and page logic to improve coordination between design and development, and refined the UI; worked closely with PM and QA for smooth delivery.",
      "Remeet: a multilingual web and mobile access system with biometric (fingerprint/RFID) check-in for meetings and access, integrated with Outlook to automate bookings and make better use of rooms. Winner at Tehran Design Week.",
    ],
    links: [
      { label: "Kudos", href: work("kudos") },
      { label: "Remeet", href: work("remeet") },
      { label: "novaday.ir", href: "https://novaday.ir/" },
    ],
  },
  {
    title: "UI/UX Designer",
    company: "Nan va Namak",
    mode: "Remote",
    period: "Jun – Sep 2024",
    points: ["Designed a responsive interface for web, mobile and tablet with a focus on accessibility, usability and clear content discovery."],
    links: [
      { label: "Story", href: work("nanvanamak") },
      { label: "Dribbble", href: "https://dribbble.com/shots/26277570-Cooking-Platform-Desktop-Experience" },
    ],
  },
  {
    title: "UI / Visual Designer",
    company: "Jaygah",
    mode: "Remote",
    period: "Mar – Jun 2024",
    points: ["Collaborated on B2B/B2C marketing packages and digital content, improving visual communication across campaigns and social touchpoints."],
  },
  {
    title: "Educational Content Designer",
    company: "Alla Online School",
    mode: "Full-time (hybrid)",
    period: "Aug 2021 – Apr 2023",
    points: [
      "Worked with cross-functional teams to design and structure educational content, improving visual clarity, layout and the overall learning experience.",
    ],
  },
];

const side = [
  {
    title: "Highlights",
    items: [
      "5+ years across product and UI/UX design",
      "B2B/B2C, fintech, operational and complex-system experience",
      "End-to-end design, from flows and UI to systems and developer handoff",
    ],
  },
  {
    title: "Core skills",
    items: [
      "Product Strategy",
      "UX Research & Testing",
      "User Flows",
      "Information Architecture",
      "Dashboard UX",
      "Responsive Web & Mobile",
      "Design Systems",
      "Interaction Design",
      "Wireframing & Prototyping",
      "Visual Design",
      "AI-Assisted Design",
    ],
  },
  {
    title: "Tools",
    items: [
      "Figma, FigJam",
      "Framer, Notion",
      "ChatGPT, Claude, Google AI Studio",
      "Lovable, NotebookLM",
      "Microsoft Clarity, GA4",
      "Adobe Illustrator",
      "ClickUp, Slack",
    ],
  },
  { title: "Languages", items: ["Persian · Native", "English · Intermediate (working proficiency)"] },
  { title: "Education", items: ["Bachelor of Law · PNU · 2021 – 2024"] },
  {
    title: "Courses",
    items: [
      "Product Design Specialist · Amanj",
      "Google UX Design · Coursera",
      "Gamification · UPenn, Coursera",
      "UI Design Specialist · 7Learn",
      "HTML & CSS for Designers · Amanj",
    ],
  },
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const a = (l) => (l.href ? `<a href="${l.href}"${l.strong ? ' class="strong"' : ""}>${esc(l.label)}</a>` : `<span>${esc(l.label)}</span>`);

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Sudabeh Zolfi Khorram · Product Designer · CV</title>
<style>
@font-face { font-family: Jakarta; src: url("${font("@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2")}") format("woff2"); font-weight: 200 800; }
@font-face { font-family: GeistMono; src: url("${font("@fontsource/geist-mono/files/geist-mono-latin-400-normal.woff2")}") format("woff2"); font-weight: 400; }
@page { size: A4; margin: 0; }
:root { --ink: #15142b; --soft: #5d5b78; --rule: #dddbec; --signal: #5a46e0; --blush: #efecff; --gold: #b4832a; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 210mm; height: 297mm; }
body { font-family: Jakarta, sans-serif; color: var(--ink); font-size: 7.8pt; line-height: 1.31; background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
a { color: inherit; text-decoration: none; }
.page { position: relative; height: 297mm; padding: 9mm 11mm 7mm; display: grid; grid-template-rows: auto 1fr auto; overflow: hidden; }
header { position: relative; padding-bottom: 3.4mm; border-bottom: 1px solid var(--rule); }
header svg { position: absolute; right: 0; top: 1mm; width: 46mm; height: 14mm; }
h1 { font-size: 21pt; font-weight: 700; letter-spacing: -0.02em; line-height: 1; }
.role { margin-top: 1.6mm; font-size: 10.5pt; font-weight: 600; color: var(--signal); }
.role span { font-size: 8.4pt; font-weight: 500; color: var(--soft); }
.summary { margin-top: 2.2mm; max-width: 176mm; font-size: 8.3pt; line-height: 1.4; }
.contact { margin-top: 2.8mm; display: flex; flex-wrap: wrap; gap: 0.6mm 0; font-size: 7.7pt; color: var(--soft); }
.contact > * + *::before { content: "·"; margin: 0 2.2mm; color: var(--rule); }
.contact .strong { color: var(--signal); font-weight: 600; }
.grid { display: grid; grid-template-columns: 47mm 1fr; grid-template-areas: "side main"; column-gap: 6mm; padding-top: 3.6mm; min-height: 0; }
main { grid-area: main; }
aside { grid-area: side; align-self: start; padding-right: 5mm; border-right: 1px solid var(--rule); }
.label { font-family: GeistMono, monospace; font-size: 6.9pt; letter-spacing: 0.1em; text-transform: uppercase; color: var(--signal); display: flex; align-items: center; gap: 1.6mm; }
.label::before { content: ""; width: 3mm; height: 0.5mm; background: var(--gold); border-radius: 1px; }
aside section + section { margin-top: 3.4mm; }
aside ul { list-style: none; margin-top: 1.6mm; }
aside li { padding: 0.3mm 0; }
.job { padding: 1.7mm 0 1.8mm; border-bottom: 1px solid var(--rule); break-inside: avoid; }
.job:last-child { border-bottom: 0; }
.job-head { display: flex; justify-content: space-between; align-items: baseline; gap: 4mm; }
.job-title { font-weight: 700; font-size: 8.5pt; }
.job-title span { font-weight: 500; color: var(--soft); }
.period { font-family: GeistMono, monospace; font-size: 7pt; color: var(--soft); white-space: nowrap; }
.job ul { margin-top: 0.7mm; padding-left: 3.2mm; }
.job li { margin-top: 0.3mm; }
.job li::marker { color: var(--signal); }
.links { margin-top: 0.9mm; display: flex; flex-wrap: wrap; gap: 1.4mm; }
.links a { font-family: GeistMono, monospace; font-size: 6.7pt; color: var(--signal); background: var(--blush); border-radius: 10px; padding: 0.35mm 2mm; }
footer { display: flex; justify-content: space-between; padding-top: 2.4mm; border-top: 1px solid var(--rule); font-family: GeistMono, monospace; font-size: 6.7pt; color: var(--soft); }
footer a { color: var(--signal); }
</style></head>
<body><div class="page">
<header>
  <svg viewBox="0 0 184 56" fill="none" aria-hidden="true">
    <path d="M4 40 C 22 4, 34 52, 52 22 S 76 6, 82 34 S 104 50, 112 28" stroke="#c9c2ff" stroke-width="2" stroke-linecap="round"/>
    <path d="M112 28 L 180 28" stroke="#5a46e0" stroke-width="2.4" stroke-linecap="round"/>
    <circle cx="180" cy="28" r="3.2" fill="#5a46e0"/>
  </svg>
  <h1>Sudabeh Zolfi Khorram</h1>
  <p class="role">Product Designer <span>· Tehran, Iran · Open to remote</span></p>
  <p class="summary">Product Designer with 5+ years of experience across B2B and B2C digital products, complex systems, fintech, operational tools and AI-enabled workflows. Strong in turning dense requirements into clear user flows, scalable interfaces, design systems and production-ready experiences, from early product thinking to developer handoff.</p>
  <p class="contact">${contact.map(a).join("")}</p>
</header>
<div class="grid">
  <main>
    <p class="label">Experience &amp; projects</p>
    ${experience
      .map(
        (j) => `<article class="job">
      <div class="job-head"><p class="job-title">${esc(j.title)} · ${esc(j.company)} <span>· ${esc(j.mode)}</span></p><p class="period">${esc(j.period)}</p></div>
      <ul>${j.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
      ${j.links ? `<p class="links">${j.links.map((l) => `<a href="${l.href}">${esc(l.label)} ↗</a>`).join("")}</p>` : ""}
    </article>`
      )
      .join("")}
  </main>
  <aside>
    ${side.map((s) => `<section><p class="label">${esc(s.title)}</p><ul>${s.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></section>`).join("")}
  </aside>
</div>
<footer><span>Case studies, process and screens</span><a href="${SITE}">sudabehzolfikhorram.github.io ↗</a></footer>
</div></body></html>`;

const out = join(root, "public", "Sudabeh-Zolfi-Khorram-Resume.pdf");
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(html, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
// Fail loudly rather than ship a CV that spills onto a second page.
const overflow = await page.evaluate(() => {
  const footer = document.querySelector("footer").getBoundingClientRect().top;
  const bottom = Math.max(...[...document.querySelectorAll("main, aside")].map((el) => el.lastElementChild.getBoundingClientRect().bottom));
  return Math.ceil(bottom + 6 - footer);
});
if (overflow > 0) {
  if (process.argv.includes("--png")) await page.screenshot({ path: process.argv[process.argv.indexOf("--png") + 1], fullPage: true });
  await browser.close();
  throw new Error(`The CV is ${overflow}px taller than one A4 page; tighten the text or spacing.`);
}
await page.pdf({ path: out, format: "A4", printBackground: true, preferCSSPageSize: true });
if (process.argv.includes("--png")) await page.screenshot({ path: process.argv[process.argv.indexOf("--png") + 1], fullPage: true });
await browser.close();
console.log(`Wrote ${out}`);
