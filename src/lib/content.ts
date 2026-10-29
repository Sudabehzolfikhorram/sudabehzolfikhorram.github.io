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
  type?: "Full-time" | "Project-based";
  mode?: "On-site" | "Remote" | "Hybrid";
  start: string; // YYYY-MM
  end: string | null; // null = present
  /** What the role covered, from the resume. */
  about: string;
  /** Case study on this site, if there is one. */
  caseStudy?: string;
  /** Live product or shot, if public. */
  link?: { label: string; href: string };
  /** Logo under /public/logos; roles without one show their initials. */
  logo?: string;
};

export const experience: Role[] = [
  {
    // Started Khordad 1405 (≈ June 2026). Engagement type not specified yet.
    company: "Novin Host", title: "Product Designer", start: "2026-06", end: null,
    about: "Redesigning Novin Host’s current website: modern and easier to choose from, while staying recognisably Novin Host.",
    caseStudy: "novinhost",
    link: { label: "novinhost.org", href: "https://www.novinhost.org/" },
  },
  {
    company: "Algonet", title: "Product Designer", type: "Full-time", mode: "On-site", start: "2026-04", end: null,
    about: "Designing complex B2B and internal product experiences across dashboards, operational tools and system-level workflows. Built a custom design system with reusable, production-ready components with product and engineering.",
  },
  {
    company: "AzMan", logo: "azman", title: "Product Designer", type: "Project-based", mode: "Remote", start: "2025-10", end: null,
    about: "Designing three products, AzMan, Hamgam Saz and an ERP, each with distinct workflows across service, operations and personnel management.",
    caseStudy: "azman",
  },
  {
    company: "Studio Kaaryar", logo: "kaaryar", title: "Product Designer", type: "Project-based", mode: "Remote", start: "2025-09", end: "2026-01",
    about: "Redesigned the full website for a social-impact design studio: information architecture, visual storytelling, accessibility, and a custom design system. Design completed; in development.",
    caseStudy: "kaaryar",
    link: { label: "studio.kaaryar.ir", href: "https://studio.kaaryar.ir/" },
  },
  {
    company: "Tamdid", logo: "tamdid", title: "Product Designer", type: "Project-based", mode: "Remote", start: "2025-08", end: "2026-06",
    about: "Designed a fintech product for smart subscription and wallet management, covering payments, wallets and gamification, with a custom design system. Design completed; in development.",
    caseStudy: "tamdid",
  },
  {
    company: "Novaday", title: "Product Designer", type: "Full-time", mode: "Hybrid", start: "2024-09", end: "2025-06",
    about: "Designed two B2B products, Kudos and Remeet, on a Tailwind-based design system to improve consistency and streamline admin workflows.",
    caseStudy: "kudos",
    link: { label: "novaday.ir", href: "https://novaday.ir/" },
  },
  {
    company: "ChapAgha", title: "UI/UX Designer", type: "Project-based", mode: "Remote", start: "2024-12", end: "2025-01",
    about: "Redesigned the responsive product listing page for business cards, with a clearer layout and stronger mobile usability.",
    link: { label: "Dribbble shot", href: "https://dribbble.com/shots/26236688-Business-Card-PLP" },
  },
  {
    company: "Nan va Namak", title: "UI/UX Designer", type: "Project-based", mode: "Remote", start: "2024-06", end: "2024-09",
    about: "Designed a responsive cooking platform for web, mobile and tablet, focused on accessibility, usability and clear content discovery.",
    caseStudy: "nanvanamak",
    link: { label: "Dribbble shot", href: "https://dribbble.com/shots/26277570-Cooking-Platform-Desktop-Experience" },
  },
  {
    company: "Jaygah", title: "UI / Visual Designer", type: "Project-based", mode: "Remote", start: "2024-03", end: "2024-06",
    about: "Collaborated on B2B and B2C marketing packages and digital content, improving visual communication across campaigns and social touchpoints.",
  },
  {
    company: "Alla Online School", title: "Educational Content Designer", type: "Full-time", mode: "Hybrid", start: "2021-08", end: "2023-04",
    about: "Worked with cross-functional teams to design and structure educational content, improving visual clarity, layout and the learning experience.",
  },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatMonth(ym: string | null) {
  if (!ym) return "Present";
  const [y, m] = ym.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

/** "1 yr 3 mos" between two YYYY-MM months, counting both ends; open-ended runs to today. */
export function duration(start: string, end: string | null) {
  const [sy, sm] = start.split("-").map(Number);
  const now = new Date();
  const [ey, em] = end ? end.split("-").map(Number) : [now.getFullYear(), now.getMonth() + 1];
  const months = Math.max(1, (ey - sy) * 12 + (em - sm) + 1);
  const y = Math.floor(months / 12);
  const m = months % 12;
  return [y && `${y} yr${y > 1 ? "s" : ""}`, m && `${m} mo${m > 1 ? "s" : ""}`].filter(Boolean).join(" ");
}

// From the resume, for the career page (and for ATS parsers reading it).
export const skills = [
  "Product strategy", "UX research & testing", "User flows", "Information architecture", "Dashboard UX",
  "Responsive web & mobile", "Design systems", "Interaction design", "Wireframing & prototyping", "Visual design", "AI-assisted design",
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
