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

// Two rows: ways to reach her, then where to find her work.
const contact = [
  [
    { label: "sudabehzolfikhorram.github.io", href: SITE, strong: true },
    { label: "sudabeh.a.zolfikhorram@gmail.com", href: "mailto:sudabeh.a.zolfikhorram@gmail.com" },
    { label: "+98 991 206 63 24 (phone & WhatsApp)", href: "https://wa.me/989912066324" },
  ],
  [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/sudabehzolfikhorram2001/" },
    { label: "Telegram", href: "https://t.me/sudabehzolfikhorram" },
    { label: "Instagram", href: "https://www.instagram.com/sudabehzolfi.design" },
    { label: "Behance", href: "https://www.behance.net/sudabehzolfikh" },
    { label: "Medium", href: "https://medium.com/@sudabeh.a.zolfikhorram" },
  ],
];

const experience = [
  {
    title: "Product & Brand Designer",
    company: "Algonet",
    mode: "Full-time (on-site)",
    period: "Apr 2026 – Present",
    points: [
      "Product design for B2B platforms built for large companies with 200+ employees: monitoring systems, ERP modules and data-heavy dashboards, from new products to redesigns of live ones.",
      "Designed an enterprise AI platform with AI end to end, live in two to three days; built a custom design system. Brand: Algonet’s visual identity, brand book, brochure and office identity.",
    ],
    links: [{ label: "Case study", href: work("atlas") }],
  },
  {
    title: "Product Designer",
    company: "AzMan Platform",
    mode: "Full-time (remote)",
    period: "Oct 2025 – Sep 2026",
    points: [
      "Designed AzMan, a services marketplace, end to end, along with the two tools that run it, as one connected system.",
      "Marketplace: customers describe what they need, compare experts and follow a request to completion. Hamgam Saz: call reports, follow-ups and contact history stay in sync. ERP: roles, access levels and scopes decide who can see and approve what.",
    ],
  },
  {
    title: "Product Designer",
    company: "Novin Host",
    mode: "Remote",
    period: "Jun – Sep 2026",
    points: [
      "Redesigned the main pages of a 15-year-old hosting brand: services first, an easier way to choose a server location, and one consistent visual system that still feels familiar.",
    ],
    links: [
      { label: "Case study", href: work("novinhost") },
      { label: "novinhost.org", href: "https://www.novinhost.org/" },
    ],
  },
  {
    title: "Product Designer",
    company: "Kaaryar Studio",
    mode: "Remote",
    period: "Sep 2025 – Jan 2026",
    points: [
      "Redesigned the website of a social-impact studio: four pages with one clear job each, a compact design system on the studio’s brand, mobile first. Now live.",
    ],
    links: [
      { label: "Case study", href: work("kaaryar") },
      { label: "studio.kaaryar.ir", href: "https://studio.kaaryar.ir/" },
    ],
  },
  {
    title: "Solo Product Designer",
    company: "Tamdid",
    mode: "Remote",
    period: "Aug 2025 – Jun 2026",
    points: [
      "Fintech product for subscriptions, wallet and payments, from the first idea to development: mobile first, then web in light and dark themes, with light gamification and a custom design system.",
    ],
    links: [{ label: "Case study", href: work("tamdid") }],
  },
  {
    title: "Product Designer",
    company: "Novaday",
    mode: "Full-time (hybrid)",
    period: "Sep 2024 – Jun 2025",
    points: [
      "Kudos (employee recognition & HR): redesigned the home from a dashboard into a social feed, designed the employee side and HR admin, and documented every page’s logic for PM, QA and engineering, on a shared Tailwind-based design system.",
      "Remeet: a multilingual web and mobile access and meeting system with fingerprint/RFID check-in and Outlook sync. Winner at Tehran Design Week.",
    ],
    links: [
      { label: "Kudos", href: work("kudos") },
      { label: "Remeet", href: work("remeet") },
      { label: "novaday.ir", href: "https://novaday.ir/" },
    ],
  },
  {
    title: "UI/UX Designer",
    company: "ChapAgha",
    mode: "Remote",
    period: "Dec 2024 – Jan 2025",
    points: ["Redesigned the business card product listing page for an online printing platform, with a clearer layout and a fully responsive design."],
    links: [{ label: "Dribbble", href: "https://dribbble.com/shots/26236688-Business-Card-PLP" }],
  },
  {
    title: "Co-founder & UI/UX Designer",
    company: "Nan va Namak",
    mode: "Pre-launch startup",
    period: "Jun – Sep 2024",
    points: ["A cooking platform a few friends and I set out to launch; as one of its two designers, took it from idea to final UI across web, tablet and mobile."],
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
    points: ["Designed B2B and B2C marketing packages and digital content for campaigns and social media."],
  },
  {
    title: "Educational Content Designer",
    company: "AlaaTV (Online School)",
    mode: "Full-time (hybrid)",
    period: "Aug 2021 – Apr 2023",
    points: [
      "First design role, alongside my law degree: designed and structured learning content for Iran’s university entrance exam (Konkur), so dense information was easy to follow.",
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
  { title: "Education", items: ["Bachelor of Law · 2021 – 2024"] },
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
:root { --ink: #15142b; --soft: #5d5b78; --rule: #dddbec; --signal: #5a46e0; --blush: #efecff; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 210mm; height: 297mm; }
body { font-family: Jakarta, sans-serif; color: var(--ink); font-size: 7.8pt; line-height: 1.31; background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
a { color: inherit; text-decoration: none; }
.page { position: relative; height: 297mm; padding: 9mm 11mm 7mm; display: grid; grid-template-rows: auto 1fr auto; overflow: hidden; }
header { position: relative; padding-bottom: 2.8mm; border-bottom: 1px solid var(--rule); }
header svg { position: absolute; right: 0; top: 1mm; width: 46mm; height: 14mm; }
h1 { font-size: 21pt; font-weight: 700; letter-spacing: -0.02em; line-height: 1; }
.role { margin-top: 1.6mm; font-size: 10.5pt; font-weight: 600; color: var(--signal); }
.role span { font-size: 8.4pt; font-weight: 500; color: var(--soft); }
.summary { margin-top: 2.2mm; max-width: 176mm; font-size: 8.3pt; line-height: 1.4; }
.contact { margin-top: 2.6mm; display: flex; flex-wrap: wrap; gap: 0.6mm 0; font-size: 7.3pt; color: var(--soft); }
.contact > * + *::before { content: "·"; margin: 0 1.6mm; color: var(--rule); }
.contact .strong { color: var(--signal); font-weight: 600; }
.grid { display: grid; grid-template-columns: 47mm 1fr; grid-template-areas: "side main"; column-gap: 6mm; padding-top: 3.6mm; min-height: 0; }
main { grid-area: main; }
aside { grid-area: side; align-self: start; padding-right: 5mm; border-right: 1px solid var(--rule); }
.label { font-family: GeistMono, monospace; font-size: 6.9pt; letter-spacing: 0.1em; text-transform: uppercase; color: var(--signal); display: flex; align-items: center; gap: 1.6mm; }
.label::before { content: ""; width: 3mm; height: 0.5mm; background: #c9c2ff; border-radius: 1px; }
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
  ${contact.map((row, i) => `<p class="contact"${i ? ' style="margin-top: 0.6mm"' : ""}>${row.map(a).join("")}</p>`).join("")}
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
