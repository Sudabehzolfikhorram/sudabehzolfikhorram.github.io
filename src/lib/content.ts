// All site copy lives here so the pages stay layout-only.
// Text comes from the Framer site and Sudabeh's resume (V2.8).

export const site = {
  name: "Sudabeh Zolfi Khorram",
  shortName: "Sudabeh",
  role: "Product Designer",
  intro:
    "I’m Sudabeh, an AI-enabled Product Designer turning complex workflows into clear, thoughtful and user-friendly digital experiences.",
  url: "https://sudabehzolfikhorram.github.io",
  location: "Tehran, Iran · Open to remote",
  resume: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/Sudabeh-Zolfi-Khorram-Resume.pdf`,
  email: "sudabeh.a.zolfikhorram@gmail.com",
  contactFallback: "mailto:sudabeh.a.zolfikhorram@gmail.com",
  // Web app URL of the Google Apps Script in docs/contact-form.gs, which
  // emails contact messages to Sudabeh. Empty falls back to opening the
  // visitor's mail app.
  // The "Ask about me" assistant's AI answers (docs/assistant-setup.md). Off: the built-in answers reply
  // instantly, with no request to the backend. Turn on once ANTHROPIC_API_KEY is set in the Apps Script.
  assistantAI: false,
  contactEndpoint: "https://script.google.com/macros/s/AKfycbyNUnvUJUsH6wB81ULdBtibH3JAYypTpneB99kbQeDg8AzMCD0NH602HnhqP71L3D7R/exec",
  // In this order on the contact page and in the footer. The first three (ways to talk) share the
  // contact page’s top row; the rest sit below.
  socials: [
    { label: "LinkedIn", handle: "sudabehzolfikhorram2001", href: "https://www.linkedin.com/in/sudabehzolfikhorram2001/" },
    { label: "Telegram", handle: "@sudabehzolfikhorram", href: "https://t.me/sudabehzolfikhorram" },
    { label: "WhatsApp", handle: "+98 991 206 6324", href: "https://wa.me/989912066324" },
    { label: "Instagram", handle: "@sudabehzolfi.design", href: "https://www.instagram.com/sudabehzolfi.design" },
    { label: "Dribbble", handle: "SudabehZolfikhorram", href: "https://dribbble.com/SudabehZolfikhorram" },
    { label: "Behance", handle: "sudabehzolfikh", href: "https://www.behance.net/sudabehzolfikh" },
    { label: "Medium", handle: "@sudabeh.a.zolfikhorram", href: "https://medium.com/@sudabeh.a.zolfikhorram" },
  ],
};

// Home page: how a tangled product becomes a clear one, in four steps.
export const untangleSteps = [
  {
    verb: "Listen",
    title: "Find the real brief",
    body: "I start with the people who use and build the product, and collect every rule, role and edge case before deciding anything. The real problem is rarely the one in the request.",
  },
  {
    verb: "Map",
    title: "Draw the journeys before the screens",
    body: "Scattered findings become flows: who does what, in which order, and where it breaks. Teams can see the product’s logic before a single pixel is polished.",
  },
  {
    verb: "Systemise",
    title: "Build the spine",
    body: "Components, tokens and states that every screen shares, so the product stays consistent as it grows. I’ve built custom design systems for Algonet, Tamdid and Kaaryar Studio.",
  },
  {
    verb: "Ship",
    title: "Hand off, then check the build",
    body: "Documented flows, page logic and edge cases for engineering, then a review of what got built. AI speeds up the exploring and writing; the decisions stay human.",
  },
];

// Facts that can be checked against the resume, not vanity numbers.
export const proof = [
  { value: 5, suffix: "+", label: "Years designing products", note: "Since 2021" },
  { value: 10, suffix: "", label: "Teams and products", note: "Fintech to ERP" },
  { value: 3, suffix: "", label: "Custom design systems", note: "Algonet, Tamdid, Kaaryar" },
  { value: 1, suffix: "", label: "Design award", note: "Tehran Design Week" },
];

export type Role = {
  company: string;
  title: string;
  type?: "Full-time" | "Project-based" | "Own startup";
  mode?: "On-site" | "Remote" | "Hybrid";
  start: string; // YYYY-MM
  end: string | null; // null = present
  /** One line, shown before the role is opened. */
  summary: string;
  /** What the role covered, shown when it's opened. */
  about: string;
  /** Case studies on this site. */
  cases?: { slug: string; label: string }[];
  /** Live product or shot, if public. */
  link?: { label: string; href: string };
  /** Logo under /public/logos (transparent); roles without one show a quiet icon for their field. */
  logo?: string;
};

// From the resume and Sudabeh's own account of each role.
export const experience: Role[] = [
  {
    company: "Algonet", title: "Product & Brand Designer", type: "Full-time", mode: "On-site", start: "2026-04", end: null,
    summary: "Atlas: an AI platform that reads how a company really works.",
    about: "Product design for B2B platforms built for large companies with 200+ employees: monitoring systems, ERP modules and data-heavy dashboards, from new products to redesigns of live ones. I design Atlas, an AI platform that analyses how a company works and suggests simpler processes, and maintain a custom design system with production-ready components. On the brand side, I designed Algonet’s visual identity, brand book, brochure and the environmental identity for the office.",
    cases: [{ slug: "atlas", label: "Atlas" }],
  },
  {
    company: "AzMan", logo: "azman", title: "Product Designer", type: "Full-time", mode: "Remote", start: "2025-10", end: "2026-09",
    summary: "Three connected products: a marketplace, a field tool and the ERP behind them.",
    about: "I designed AzMan, a services marketplace, end to end, along with the two tools that run it, as one connected system. In the marketplace, customers describe what they need, compare experts and follow a request to completion. In Hamgam Saz, field experts’ call reports, follow-ups and contact history stay in sync. In the ERP, roles, access levels and scopes decide who can see and approve what, with documents and contracts in one place.",
    cases: [
      { slug: "azman", label: "AzMan" },
      { slug: "azman-erp", label: "ERP" },
      { slug: "hamgam", label: "Hamgam Saz" },
    ],
  },
  {
    company: "Novin Host", logo: "novinhost", title: "Product Designer", type: "Project-based", mode: "Remote", start: "2026-06", end: "2026-09",
    summary: "A redesign for a 15-year-old hosting brand.",
    about: "A redesign that makes Novin Host feel current and easier to choose from, without customers feeling it changed: services first, an easier way to choose a server location, and one consistent visual system. I redesigned the main pages before the collaboration ended in September 2026.",
    cases: [{ slug: "novinhost", label: "Novin Host" }],
    link: { label: "novinhost.org", href: "https://www.novinhost.org/" },
  },
  {
    company: "Kaaryar Studio", logo: "kaaryar", title: "Product Designer", type: "Project-based", mode: "Remote", start: "2025-09", end: "2026-01",
    summary: "A website redesign for a social-impact design studio.",
    about: "A redesign for a social-impact studio that puts Kaaryar graduates on real client projects. I restructured the site so each of its four pages has one clear job, built a mood board, style board and compact design system on the studio’s brand, and designed every section mobile first.",
    cases: [{ slug: "kaaryar", label: "Kaaryar Studio" }],
    link: { label: "Live site: studio.kaaryar.ir", href: "https://studio.kaaryar.ir/" },
  },
  {
    company: "Tamdid", logo: "tamdid", title: "Solo Product Designer", type: "Project-based", mode: "Remote", start: "2025-08", end: "2026-06",
    summary: "Solo designer on a fintech product, from idea to development.",
    about: "Subscriptions, wallet and payments in one product. I designed it alone, from the first idea to development: mobile first, then web in light and dark themes, with light gamification that keeps users on top of their renewals and a custom design system shared by mobile and web.",
    cases: [{ slug: "tamdid", label: "Tamdid" }],
  },
  {
    company: "Novaday", title: "Product Designer", type: "Full-time", mode: "Hybrid", start: "2024-09", end: "2025-06",
    summary: "Kudos, an HR platform, and Remeet, an award-winning access system.",
    about: "On Kudos, an employee-recognition and HR platform, I redesigned the home from a dashboard into a social feed, designed the employee side and HR admin, and documented every page’s flows and logic for engineering with PM and QA. Remeet (first called Access) is a multilingual access and meeting system with fingerprint and RFID check-in and Outlook sync; it won at Tehran Design Week. Across both: the design system, UI kit and variables on a Tailwind base, plus benchmarks, competitor analysis, feature lists and usability testing.",
    cases: [
      { slug: "kudos", label: "Kudos" },
      { slug: "remeet", label: "Remeet" },
    ],
    link: { label: "novaday.ir", href: "https://novaday.ir/" },
  },
  {
    company: "ChapAgha", title: "UI/UX Designer", type: "Project-based", mode: "Remote", start: "2024-12", end: "2025-01",
    summary: "A clearer product listing page for business cards.",
    about: "Redesigned the responsive product listing page for business cards, with a clearer layout and stronger mobile usability.",
    link: { label: "Dribbble shot", href: "https://dribbble.com/shots/26236688-Business-Card-PLP" },
  },
  {
    company: "Nan va Namak", title: "Co-founder & UI/UX Designer", type: "Own startup", mode: "Remote", start: "2024-06", end: "2024-09",
    summary: "Our own startup. It didn’t launch, and it made me a product designer.",
    about: "A few friends and I set out to launch a cooking platform of our own, covering research, product and back end. Another designer and I took it from idea to execution across web, tablet and mobile. It never launched, but it’s where I became a product designer.",
    cases: [{ slug: "nanvanamak", label: "Nan va Namak" }],
    link: { label: "Dribbble shot", href: "https://dribbble.com/shots/26277570-Cooking-Platform-Desktop-Experience" },
  },
  {
    company: "Jaygah", title: "UI / Visual Designer", type: "Project-based", mode: "Remote", start: "2024-03", end: "2024-06",
    summary: "Campaign and social visuals for B2B and B2C brands.",
    about: "Designed B2B and B2C marketing packages and digital content for campaigns and social media.",
  },
  {
    company: "AlaaTV (Online School)", title: "Educational Content Designer", type: "Full-time", mode: "Hybrid", start: "2021-08", end: "2023-04",
    summary: "Where it started: designing learning content for exam prep.",
    about: "My first design role, started alongside my law degree: designing and structuring learning content for Iran’s university entrance exam (Konkur), so dense information was easy to follow.",
  },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatMonth(ym: string | null) {
  if (!ym) return "Present";
  const [y, m] = ym.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

// From the resume, for the career page (and for ATS parsers reading it).
export const skills = [
  "Product strategy", "UX research & testing", "User flows", "Information architecture", "Dashboard UX",
  "Responsive web & mobile", "Design systems", "Interaction design", "Wireframing & prototyping", "Visual design", "AI-assisted design",
];
// The same skills, grouped for the career page.
export const skillGroups = [
  { title: "Thinking", items: ["Product strategy", "UX research & testing", "Information architecture", "User flows"] },
  { title: "Making", items: ["Dashboard UX", "Interaction design", "Wireframing & prototyping", "Visual design", "Responsive web & mobile"] },
  { title: "Scaling", items: ["Design systems", "AI-assisted design", "Developer handoff"] },
];

export const tools = [
  "Figma & FigJam", "Framer", "Notion", "ChatGPT", "Claude", "Google AI Studio", "Lovable", "NotebookLM",
  "Microsoft Clarity", "GA4", "Adobe Illustrator", "ClickUp", "Slack",
];
// The university isn't named on the site; the assistant names it only when asked where she studied.
export const education = [{ title: "Bachelor of Law", years: "2021 – 2024" }];
export const courses = [
  { title: "Product Design Specialist", place: "Amanj" },
  { title: "Google UX Design", place: "Coursera" },
  { title: "Gamification", place: "University of Pennsylvania, Coursera" },
  { title: "UI Design Specialist", place: "7Learn" },
  { title: "HTML & CSS for Designers", place: "Amanj" },
];
export const languages = [
  { name: "Persian", level: "Native" },
  { name: "English", level: "Intermediate · working proficiency" },
];

export const formatRange = (start: string, end: string | null) => `${formatMonth(start)} – ${formatMonth(end)}`;
