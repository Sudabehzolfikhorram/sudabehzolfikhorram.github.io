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
  contactEndpoint: "https://script.google.com/macros/s/AKfycbyNUnvUJUsH6wB81ULdBtibH3JAYypTpneB99kbQeDg8AzMCD0NH602HnhqP71L3D7R/exec",
  socials: [
    { label: "LinkedIn", handle: "sudabehzolfikhorram2001", href: "https://www.linkedin.com/in/sudabehzolfikhorram2001/" },
    { label: "Dribbble", handle: "SudabehZolfikhorram", href: "https://dribbble.com/SudabehZolfikhorram" },
    { label: "Instagram", handle: "@sudabehzolfi.design", href: "https://www.instagram.com/sudabehzolfi.design" },
    { label: "Telegram", handle: "@sudabehzolfikhorram", href: "https://t.me/sudabehzolfikhorram" },
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
    body: "Components, tokens and states that every screen shares, so the product stays consistent as it grows. I’ve built custom design systems for Algonet, Tamdid and Studio Kaaryar.",
  },
  {
    verb: "Ship",
    title: "Hand off, then check the build",
    body: "Documented flows, page logic and edge cases for engineering, then a review of what got built. AI speeds up the exploring and writing; the decisions stay human.",
  },
];

// Facts that can be checked against the resume, not vanity numbers.
export const proof = [
  { value: 4, suffix: "+", label: "Years designing products", note: "Since 2021" },
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
  /** Logo under /public/logos; roles without one show their initials. */
  logo?: string;
};

// From the resume and Sudabeh's own account of each role.
export const experience: Role[] = [
  {
    company: "Novin Host", title: "Product Designer", start: "2026-06", end: null,
    summary: "Redesigning a 15-year-old hosting brand.",
    about: "A redesign that makes Novin Host feel current and easier to choose from, without customers feeling it changed. The main pages are done; the rest is in progress.",
    cases: [{ slug: "novinhost", label: "Novin Host" }],
    link: { label: "novinhost.org", href: "https://www.novinhost.org/" },
  },
  {
    company: "Algonet", title: "Product Designer", type: "Full-time", mode: "On-site", start: "2026-04", end: null,
    summary: "Atlas: an AI platform that reads how a company really works.",
    about: "I design Atlas, which analyses a company’s emails, chats and workflows and suggests a better way to run them. Alongside it: dashboards, operational tools and a custom design system with production-ready components. I also shaped Algonet’s visual identity: logo, pattern and brochure.",
    cases: [{ slug: "atlas", label: "Atlas" }],
  },
  {
    company: "AzMan", logo: "azman", title: "Product Designer", type: "Project-based", mode: "Remote", start: "2025-10", end: null,
    summary: "Three connected products: a marketplace, a field tool and the ERP behind them.",
    about: "AzMan is the marketplace where customers find services. Hamgam Saz is the tool the field experts work and communicate in. The ERP runs both, from roles and permissions to contracts and documents.",
    cases: [{ slug: "azman", label: "AzMan" }],
  },
  {
    company: "Studio Kaaryar", logo: "kaaryar", title: "Product Designer", type: "Project-based", mode: "Remote", start: "2025-09", end: "2026-01",
    summary: "A website redesign for a social-impact design studio.",
    about: "A deliberately simple redesign within tight client constraints: clearer structure, better storytelling and accessibility, on a small custom design system.",
    cases: [{ slug: "kaaryar", label: "Studio Kaaryar" }],
    link: { label: "studio.kaaryar.ir", href: "https://studio.kaaryar.ir/" },
  },
  {
    company: "Tamdid", logo: "tamdid", title: "Product Designer", type: "Project-based", mode: "Remote", start: "2025-08", end: "2026-06",
    summary: "Solo designer on a fintech product, from idea to development.",
    about: "Subscriptions, wallet and payments in one product, with gamification. Mobile first, then web. I designed it alone, end to end, with its own design system. It’s now in development.",
    cases: [{ slug: "tamdid", label: "Tamdid" }],
  },
  {
    company: "Novaday", title: "Product Designer", type: "Full-time", mode: "Hybrid", start: "2024-09", end: "2025-06",
    summary: "Kudos, an HR platform, and Remeet, an award-winning access system.",
    about: "On Kudos, an HR and employee-engagement platform, I documented flows and page logic for engineering and refined the UI with PM and QA. Remeet (first called Access) is a multilingual access and meeting system with fingerprint and RFID check-in and Outlook sync; it won at Tehran Design Week. Across both: the design system, UI kit and variables on a Tailwind base, plus benchmarks, competitor analysis, feature lists and usability testing.",
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
    company: "Nan va Namak", title: "UI/UX Designer", type: "Own startup", mode: "Remote", start: "2024-06", end: "2024-09",
    summary: "Our own startup. It didn’t launch, and it made me a product designer.",
    about: "A few friends and I set out to launch a cooking platform of our own, covering research, product and back end. Another designer and I took it from idea to execution across web, tablet and mobile. It never launched, but it’s where I became a product designer.",
    cases: [{ slug: "nanvanamak", label: "Nan va Namak" }],
    link: { label: "Dribbble shot", href: "https://dribbble.com/shots/26277570-Cooking-Platform-Desktop-Experience" },
  },
  {
    company: "Jaygah", title: "UI / Visual Designer", type: "Project-based", mode: "Remote", start: "2024-03", end: "2024-06",
    summary: "Campaign and social visuals for B2B and B2C brands.",
    about: "Collaborated on B2B and B2C marketing packages and digital content, improving visual communication across campaigns and social touchpoints.",
  },
  {
    company: "Alla Online School", title: "Educational Content Designer", type: "Full-time", mode: "Hybrid", start: "2021-08", end: "2023-04",
    summary: "Where it started: designing learning content for exam prep.",
    about: "My first design job, started the same term as my law degree: structuring and designing educational content for a university-entrance exam school, with clearer layouts and a better learning experience.",
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
  "Figma", "FigJam", "Framer", "Notion", "ChatGPT", "Claude", "Google AI Studio", "Lovable", "NotebookLM",
  "Microsoft Clarity", "GA4", "Adobe Illustrator", "ClickUp", "Slack",
];
export const education = [{ title: "Bachelor of Law", place: "Payame Noor University (PNU)", years: "2021 – 2024" }];
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
