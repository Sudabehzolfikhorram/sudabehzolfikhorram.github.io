// The "Ask about me" assistant: answers short questions about Sudabeh in
// Persian or English, only from facts in her CV and on this site. Anything it
// can't answer for sure is offered to Sudabeh herself, so it never guesses.

export type Lang = "fa" | "en";

export type Intent = {
  id: string;
  /** A named project or company: its name beats generic phrasing like "tell me about". */
  entity?: boolean;
  /** Words and phrases that point to this intent, in English, Persian and Finglish. Strong ones count double. */
  strong: string[];
  weak?: string[];
  answer: Record<Lang, string>;
  /** Offer to send the question to Sudabeh after answering (or instead, when the answer is "I don't know"). */
  forward?: boolean;
  /** A link to show under the answer. */
  link?: { href: string; label: Record<Lang, string> };
};

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const CV = `${BASE}/Sudabeh-Zolfi-Khorram-Resume.pdf`;

// ───────────────────────── knowledge ─────────────────────────

export const intents: Intent[] = [
  // Small talk
  {
    id: "greet",
    strong: ["hi", "hello", "hey", "salam", "dorood", "سلام", "درود", "good morning", "good evening", "وقت بخیر", "روز بخیر"],
    answer: {
      en: "Hi! I’m Sudabeh’s assistant. Ask me anything short about her work, skills or experience.",
      fa: "سلام! من دستیار سودابه هستم. هر سؤال کوتاهی درباره‌ی کار، مهارت‌ها یا سابقه‌اش دارید بپرسید.",
    },
  },
  {
    id: "thanks",
    strong: ["thanks", "thank you", "thx", "merci", "mersi", "مرسی", "ممنون", "ممنونم", "سپاس", "متشکرم", "mamnoon"],
    answer: {
      en: "You’re welcome! Anything else you’d like to know?",
      fa: "خواهش می‌کنم! سؤال دیگری هم دارید؟",
    },
  },
  {
    id: "bye",
    strong: ["bye", "goodbye", "see you", "khodahafez", "خداحافظ", "بای", "فعلا"],
    answer: {
      en: "Thanks for stopping by. Good luck with your search!",
      fa: "ممنون که سر زدید. موفق باشید!",
    },
  },
  {
    id: "bot",
    strong: ["are you a bot", "are you real", "are you human", "are you sudabeh", "ربات", "بات", "خودت سودابه", "خود سودابه", "سودابه هستی", "آدم واقعی", "هوش مصنوعی هستی"],
    answer: {
      en: "I’m an assistant, not Sudabeh. I answer from her CV and this site, and when I’m not sure, I send your question to her.",
      fa: "من دستیار هستم، نه خود سودابه. از روی رزومه و همین سایت جواب می‌دهم و هر جا مطمئن نباشم، سؤال‌تان را برای خودش می‌فرستم.",
    },
  },

  // About her
  {
    id: "who",
    strong: ["who is", "who are", "about her", "about you", "introduce", "tell me about", "summary", "what does she do", "what do you do", "what she does", "is she a designer", "are you a designer", "kind of designer", "type of designer", "سودابه کیه", "کی هستی", "معرفی", "درباره", "خلاصه", "معرفی کن", "چیکار میکنی", "چیکار می کنی", "چکار میکنی", "چه کاره", "چکاره", "کارت چیه", "کارش چیه", "طراحی چی"],
    weak: ["sudabeh", "سودابه"],
    answer: {
      en: "Sudabeh Zolfi Khorram is a product designer in Tehran, open to remote work. For 5+ years she’s designed B2B and B2C products, fintech, operational tools and complex systems, from the first flow to developer handoff.",
      fa: "سودابه ذولفی‌خرم پروداکت دیزاینر ساکن تهران است و برای کار ریموت آماده است. بیش از ۵ سال است که محصولات B2B و B2C، فین‌تک، ابزارهای عملیاتی و سیستم‌های پیچیده را از اولین فلو تا تحویل به توسعه‌دهنده طراحی می‌کند.",
    },
  },
  {
    id: "role",
    strong: ["current job", "currently", "where do you work", "where does she work", "what company", "which company", "current role", "right now", "nowadays", "الان کجا", "فعلا کجا", "کجا کار", "شغل فعلی", "latest project", "last project", "recent project", "current project", "last company", "latest company", "current company", "current employer", "آخرین پروژه", "آخرین شرکت", "پروژه فعلی", "شرکت فعلی", "پروژه الان", "الان چیکار", "الان چیکار میکنی", "مشغول", "مشغول چه", "working on", "busy with", "these days", "این روزها", "این روزا", "روی چی کار"],
    weak: ["algonet", "الگونت", "job", "شغل"],
    answer: {
      en: "She’s a full-time product designer at Algonet, where she designs Atlas, an AI platform that analyses how a company works.",
      fa: "الان پروداکت دیزاینر تمام‌وقت در الگونت است و آنجا اطلس را طراحی می‌کند؛ پلتفرمی با هوش مصنوعی که نحوه‌ی کار یک شرکت را تحلیل می‌کند.",
    },
  },
  {
    id: "experience",
    strong: ["years of experience", "how many years", "how long", "how much experience", "your experience", "work experience", "experienced", "senior", "junior", "سابقه", "چند سال", "تجربه کاری", "سابقه کار", "sabeghe", "chand sal", "tajrobe"],
    weak: ["experience", "تجربه"],
    answer: {
      en: "5+ years in product and UI/UX design, across 10 teams and products, from fintech to ERP and enterprise AI.",
      fa: "بیش از ۵ سال سابقه در پروداکت و UI/UX دیزاین، در ۱۰ تیم و محصول؛ از فین‌تک تا ERP و هوش مصنوعی سازمانی.",
    },
  },
  {
    id: "location",
    strong: ["where are you", "where is she", "where do you live", "where does she live", "where she lives", "live in", "based", "location", "city", "country", "iran", "tehran", "کجا هستی", "کجایی", "کجا زندگی", "شهر", "تهران", "ایران", "kojaei"],
    answer: {
      en: "She’s based in Tehran, Iran (UTC+3:30) and open to remote work.",
      fa: "ساکن تهران است (به وقت ایران، UTC+3:30) و برای همکاری ریموت آماده است.",
    },
  },
  {
    id: "remote",
    strong: ["remote", "work from home", "wfh", "hybrid", "on-site", "onsite", "office", "ریموت", "دورکاری", "دور کاری", "حضوری", "هیبرید", "از راه دور", "دفتر"],
    answer: {
      en: "Yes. She’s open to remote work and has delivered projects remotely, such as Tamdid and Studio Kaaryar.",
      fa: "بله. برای کار ریموت آماده است و پروژه‌هایی مثل تمدید و کاریار استودیو را به‌صورت ریموت انجام داده.",
    },
  },
  {
    id: "availability",
    strong: ["available", "availability", "open to work", "hiring", "looking for a job", "open to new", "job offer", "can we hire", "hire her", "hire you", "start date", "can you start", "can she start", "notice period", "when can", "آزاد", "در دسترس", "دنبال کار", "استخدام", "شروع همکاری", "کی میتونی", "از کی", "پیشنهاد کاری", "کار جدید", "آماده کار", "آماده‌ی کار", "آماده همکاری", "آماده‌ی همکاری", "موقعیت شغلی", "فرصت شغلی", "جویای کار", "new role", "new job", "looking for work", "estekhdam"],
    answer: {
      en: "She’s open to new product design roles, remote. For start dates and notice period, it’s best to ask her directly: I’ve sent your question to her.",
      fa: "برای نقش‌های جدید پروداکت دیزاین، به‌صورت ریموت، آماده است. برای زمان شروع و مدت اطلاع قبلی بهتر است مستقیم از خودش بپرسید؛ سؤال‌تان را برایش فرستادم.",
    },
    forward: true,
  },
  {
    id: "freelance",
    strong: ["freelance", "freelancer", "project based", "project-based", "contract", "part time", "part-time", "full time", "full-time", "فریلنس", "پروژه ای", "پروژه‌ای", "پاره وقت", "پاره‌وقت", "تمام وقت", "تمام‌وقت", "قرارداد"],
    answer: {
      en: "She has done both: full-time roles (Algonet, Novaday) and project-based work (Tamdid, Studio Kaaryar). For a specific arrangement, I’ve passed your question on.",
      fa: "هر دو را تجربه کرده: نقش‌های تمام‌وقت (الگونت، نوادی) و پروژه‌ای (تمدید، کاریار استودیو). برای یک نوع همکاری مشخص، سؤال‌تان را برایش فرستادم.",
    },
    forward: true,
  },
  {
    id: "salary",
    strong: ["salary", "rate", "rates", "price", "pricing", "cost", "how much do you charge", "hourly", "ساعتی", "ریت ساعتی", "budget", "expected salary", "حقوق درخواستی", "حقوق چقدر", "چقدر حقوق", "حقوقت", "حقوق ماهانه", "حقوق انتظاری", "انتظار حقوق", "میزان حقوق", "دستمزد", "قیمت", "هزینه", "ریت", "بودجه", "hoghoogh"],
    answer: {
      en: "That depends on the role and scope, so it’s a question for Sudabeh herself. I’ve sent it to her.",
      fa: "این به نقش و حجم کار بستگی دارد و بهتر است خود سودابه جواب بدهد. سؤال‌تان را برایش فرستادم.",
    },
    forward: true,
  },
  {
    id: "relocation",
    strong: ["relocate", "relocation", "move abroad", "visa", "work permit", "move to", "مهاجرت", "ریلوکیشن", "جابجایی", "ویزا", "اقامت"],
    answer: {
      en: "The CV doesn’t cover relocation or visas, so I’d rather not guess. I’ve sent your question to her.",
      fa: "رزومه درباره‌ی مهاجرت یا ویزا چیزی نمی‌گوید و نمی‌خواهم حدس بزنم. سؤال‌تان را برایش فرستادم.",
    },
    forward: true,
  },
  {
    id: "personal",
    strong: ["how old", "age", "married", "religion", "birthday", "born", "سن", "چند سالته", "چند سالشه", "متاهل", "مجرد", "تولد", "مذهب"],
    answer: {
      en: "I only know about her work, so I’ll leave personal questions to her. Happy to tell you about her projects or skills.",
      fa: "من فقط درباره‌ی کارش اطلاعات دارم و سؤال‌های شخصی را به خودش می‌سپارم. درباره‌ی پروژه‌ها یا مهارت‌هایش خوشحال می‌شوم بگویم.",
    },
  },

  // Education & languages
  {
    id: "education",
    strong: ["education", "degree", "university", "bachelor", "study", "studied", "major", "college", "law", "تحصیلات", "مدرک", "دانشگاه", "لیسانس", "کارشناسی", "رشته", "حقوق خوندی", "حقوق", "تحصیل", "چی خوندی", "چی خونده", "چی خوندید", "درس خوندی", "tahsilat", "reshte"],
    answer: {
      en: "She has a Bachelor of Law from Payame Noor University (PNU). Design came alongside: she started her first design job the same term she started her degree.",
      fa: "کارشناسی حقوق از دانشگاه پیام نور دارد. دیزاین هم‌زمان شروع شد: همان ترمی که وارد دانشگاه شد، اولین کار دیزاینش را هم شروع کرد.",
    },
  },
  {
    id: "lawToDesign",
    strong: ["why design", "why law", "background", "از حقوق", "حقوق به", "حقوق اومد", "سمت دیزاین", "سمت طراحی", "پیشینه", "پیش زمینه", "law to design", "from law", "switch", "career change", "how did you start", "how did she start", "become a designer", "got into design", "چرا دیزاین", "چرا حقوق", "تغییر مسیر", "چطور دیزاینر", "از کجا شروع", "چجوری شروع"],
    answer: {
      en: "The term she started her law degree, she also started designing learning content for an exam-prep school. UI/UX pulled her in, and Nan va Namak, a startup she built with friends, turned her into a product designer. Law left a useful habit: reading dense rules and making them clear.",
      fa: "همان ترمی که حقوق را شروع کرد، طراحی محتوای آموزشی برای یک مؤسسه‌ی کنکور را هم شروع کرد. کم‌کم جذب UI/UX شد و نان و نمک، استارتاپی که با دوستانش ساختند، او را به پروداکت دیزاین رساند. از حقوق یک عادت مفید مانده: خواندن قوانین پیچیده و ساده کردن‌شان.",
    },
  },
  {
    id: "courses",
    strong: ["course", "courses", "certificate", "certification", "training", "bootcamp", "google ux", "دوره", "دوره ها", "دوره‌ها", "مدرک بین المللی", "گواهی", "آموزش", "doreh"],
    answer: {
      en: "Product Design Specialist (Amanj), Google UX Design (Coursera), Gamification (UPenn, Coursera), UI Design Specialist (7Learn) and HTML & CSS for Designers (Amanj).",
      fa: "Product Design Specialist (آمانج)، Google UX Design (کورسرا)، Gamification (دانشگاه پنسیلوانیا، کورسرا)، UI Design Specialist (سون‌لرن) و HTML & CSS for Designers (آمانج).",
    },
  },
  {
    id: "languages",
    strong: ["english", "language", "languages", "speak", "persian", "farsi", "ielts", "toefl", "آیلتس", "تافل", "انگلیسی", "زبان", "فارسی", "مکالمه", "زبانت", "zaban"],
    answer: {
      en: "Persian is her native language and her English is intermediate, at working proficiency. She doesn’t hold an IELTS or TOEFL certificate, but she works and communicates in English.",
      fa: "فارسی زبان مادری‌اش است و انگلیسی‌اش در سطح متوسط و در حد کاری است. مدرک آیلتس یا تافل ندارد، ولی در کار به انگلیسی ارتباط برقرار می‌کند.",
    },
  },

  // Skills & tools
  {
    id: "skills",
    strong: ["skills", "skill", "good at", "strengths", "expertise", "what can she do", "مهارت", "مهارت ها", "مهارت‌ها", "تخصص", "توانایی", "چه کاری", "maharat"],
    answer: {
      en: "Product strategy, UX research and testing, user flows, information architecture, dashboard UX, responsive web and mobile, design systems, interaction design, wireframing and prototyping, visual design and AI-assisted design.",
      fa: "استراتژی محصول، تحقیق و تست UX، یوزر فلو، معماری اطلاعات، طراحی داشبورد، وب و موبایل ریسپانسیو، دیزاین سیستم، طراحی تعامل، وایرفریم و پروتوتایپ، طراحی بصری و طراحی با کمک هوش مصنوعی.",
    },
  },
  {
    id: "tools",
    strong: ["tools", "tool", "software", "figma", "framer", "sketch", "adobe xd", "webflow", "maze", "hotjar", "اسکچ", "وب فلو", "هات جار", "figjam", "illustrator", "notion", "clickup", "analytics", "clarity", "ga4", "ابزار", "ابزارها", "نرم افزار", "نرم‌افزار", "فیگما", "فریمر", "abzar"],
    answer: {
      en: "Figma and FigJam every day, plus Framer, Notion, Adobe Illustrator, ClickUp and Slack. For analytics, Microsoft Clarity and GA4. For AI: ChatGPT, Claude, Google AI Studio, Lovable and NotebookLM. She has also used Maze and Hotjar for testing. No Sketch or Webflow, and Adobe XD has been discontinued.",
      fa: "هر روز با فیگما و فیگ‌جم کار می‌کند؛ به‌علاوه‌ی Framer، Notion، Adobe Illustrator، ClickUp و Slack. برای آنالیتیکس Microsoft Clarity و GA4، و برای هوش مصنوعی ChatGPT، Claude، Google AI Studio، Lovable و NotebookLM. برای تست با Maze و Hotjar هم کار کرده. با Sketch و Webflow کار نکرده و Adobe XD هم دیگر پشتیبانی نمی‌شود.",
    },
  },
  {
    id: "ai",
    strong: ["ai", "artificial intelligence", "chatgpt", "claude", "gpt", "lovable", "notebooklm", "ai studio", "هوش مصنوعی", "ای آی", "چت جی پی تی", "hoosh"],
    answer: {
      en: "AI is her thinking partner, not her designer: she uses it to research faster, compare directions, draft UX copy and prototype (ChatGPT, Claude, Google AI Studio, NotebookLM, Lovable). The decisions stay hers. She also designs Atlas, an AI product, at Algonet.",
      fa: "هوش مصنوعی پارتنر هم‌فکرش است، نه جای طراح: برای تحقیق سریع‌تر، مقایسه‌ی ایده‌ها، نوشتن UX copy و پروتوتایپ از آن استفاده می‌کند (ChatGPT، Claude، Google AI Studio، NotebookLM، Lovable). تصمیم‌ها با خودش است. در الگونت هم روی اطلس، یک محصول مبتنی بر هوش مصنوعی، کار می‌کند.",
    },
  },
  {
    id: "designSystem",
    strong: ["design system", "design systems", "ui kit", "tokens", "variables", "components", "component library", "دیزاین سیستم", "دیزاین‌سیستم", "یو آی کیت", "کامپوننت", "توکن", "وریبل", "متغیر"],
    answer: {
      en: "Yes: she built custom design systems for Algonet, Tamdid and Studio Kaaryar, and worked on a Tailwind-based system, UI kit and variables at Novaday for Kudos and Remeet.",
      fa: "بله: برای الگونت، تمدید و کاریار استودیو دیزاین سیستم اختصاصی ساخته و در نوادی هم روی دیزاین سیستم مبتنی بر Tailwind، UI kit و variableها برای کودوس و ریمیت کار کرده.",
    },
  },
  {
    id: "research",
    strong: ["research", "user research", "usability", "user testing", "interview", "benchmark", "competitor", "competitive analysis", "feature list", "تحقیق", "ریسرچ", "یوزبیلیتی", "تست کاربر", "مصاحبه", "بنچمارک", "تحلیل رقبا", "رقبا", "فیچر لیست"],
    answer: {
      en: "Yes: benchmarks, competitor analysis, feature lists and usability testing, for example at Novaday and for Studio Kaaryar’s redesign.",
      fa: "بله: بنچمارک، تحلیل رقبا، فیچر لیست و تست یوزبیلیتی؛ مثلاً در نوادی و در ریدیزاین کاریار استودیو.",
    },
  },
  {
    id: "dashboard",
    strong: ["dashboard", "dashboards", "b2b", "saas", "admin panel", "internal tool", "erp", "enterprise", "complex", "داشبورد", "پنل ادمین", "پنل", "سازمانی", "پیچیده", "ای آر پی", "ساس"],
    answer: {
      en: "Yes, a lot of them: Atlas and dashboards at Algonet, AzMan’s ERP and its field tool Hamgam Saz, and Kudos’s admin panel at Novaday.",
      fa: "بله، زیاد: اطلس و داشبوردها در الگونت، ERP ازمان و ابزار کارشناسانش همگام‌ساز، و پنل ادمین کودوس در نوادی.",
    },
  },
  {
    id: "fintech",
    strong: ["fintech", "finance", "payment", "payments", "wallet", "bank", "banking", "فین تک", "فین‌تک", "مالی", "پرداخت", "کیف پول", "بانک"],
    answer: {
      en: "Yes. Tamdid is a fintech product for subscriptions, a wallet and payments, on mobile and web. She was its only designer, from idea to development.",
      fa: "بله. تمدید یک محصول فین‌تک برای مدیریت اشتراک‌ها، کیف پول و پرداخت است، روی موبایل و وب. تنها طراحش بود، از ایده تا توسعه.",
    },
    link: { href: "/work/tamdid", label: { en: "Tamdid case study", fa: "کیس استادی تمدید" } },
  },
  {
    id: "mobile",
    strong: ["mobile", "app", "ios", "android", "responsive", "web", "website", "rtl", "موبایل", "اپلیکیشن", "اپ", "وب", "سایت", "ریسپانسیو", "راست به چپ"],
    answer: {
      en: "Yes, both web and mobile, all responsive: mostly Persian RTL products, plus multilingual ones like Remeet. Tamdid was mobile first, then web.",
      fa: "بله، هم وب و هم موبایل، همه ریسپانسیو؛ بیشتر محصولات فارسی و راست‌به‌چپ، و محصولات چندزبانه مثل ریمیت. تمدید اول برای موبایل و بعد برای وب طراحی شد.",
    },
  },
  {
    id: "code",
    strong: ["code", "coding", "developer", "html", "css", "frontend", "front-end", "programming", "کد", "کدنویسی", "برنامه نویسی", "برنامه‌نویسی", "فرانت"],
    answer: {
      en: "She’s a designer, not a developer, but she took HTML & CSS for Designers and works closely with engineers: documented flows, page logic, states and edge cases at handoff.",
      fa: "طراح است، نه برنامه‌نویس؛ ولی دوره‌ی HTML & CSS for Designers را گذرانده و نزدیک با تیم فنی کار می‌کند: مستندسازی فلوها، منطق صفحات، استیت‌ها و حالت‌های خاص در زمان تحویل.",
    },
  },
  {
    id: "process",
    strong: ["process", "how do you work", "how does she work", "workflow", "approach", "method", "handoff", "working style", "work style", "سبک کار", "روند", "پروسه", "فرایند", "فرآیند", "چطور کار", "روش کار", "هندآف", "تحویل"],
    answer: {
      en: "Four steps: listen (find the real brief), map the journeys before the screens, systemise (components and states), then hand off and check the build.",
      fa: "چهار مرحله: شنیدن و پیدا کردن مسئله‌ی واقعی، کشیدن فلوها قبل از صفحه‌ها، ساختن سیستم (کامپوننت‌ها و استیت‌ها)، و در آخر تحویل به توسعه و بررسی خروجی.",
    },
  },
  {
    id: "team",
    strong: ["team", "teamwork", "collaborate", "collaboration", "solo", "alone", "pm", "product manager", "qa", "engineers", "with developer", "work with developer", "with engineer", "تیم", "تیمی", "همکاری", "تنها", "انفرادی", "مدیر محصول", "تیم فنی", "با تیم", "با دولوپر", "با برنامه نویس"],
    answer: {
      en: "Closely. At Novaday and Algonet she worked day to day with PMs, QA and engineers, and documented flows, page logic, states and edge cases for handoff. She has also worked solo: she was the only designer on Tamdid.",
      fa: "نزدیک و هر روز. در نوادی و الگونت با مدیر محصول، QA و تیم فنی کار کرده و فلوها، منطق صفحات، استیت‌ها و حالت‌های خاص را برای تحویل مستند کرده. تنها هم کار کرده: در تمدید تنها طراح پروژه بود.",
    },
  },

  // Projects
  {
    id: "projects",
    strong: ["projects", "project", "portfolio", "work samples", "your work", "her work", "see your work", "case studies", "case study", "previous work", "پروژه", "پروژه ها", "پروژه‌ها", "نمونه کار", "نمونه‌کار", "پورتفولیو", "کیس استادی", "nemoone kar"],
    answer: {
      en: "Lead projects: Atlas (enterprise AI), Tamdid (fintech) and Kudos (HR platform). Also Remeet, an award winner, AzMan’s three products, Novin Host, Studio Kaaryar and Nan va Namak.",
      fa: "پروژه‌های اصلی: اطلس (هوش مصنوعی سازمانی)، تمدید (فین‌تک) و کودوس (پلتفرم منابع انسانی). به‌علاوه ریمیت که جایزه گرفته، سه محصول ازمان، نوین هاست، کاریار استودیو و نان و نمک.",
    },
    link: { href: "/work", label: { en: "See all projects", fa: "همه‌ی پروژه‌ها" } },
  },
  {
    id: "tamdid",
    entity: true,
    strong: ["tamdid", "تمدید"],
    answer: {
      en: "Tamdid is a fintech product for subscriptions, a wallet and payments, with gamification. Sudabeh designed it alone, mobile first and then web, with its own design system. It’s now in development.",
      fa: "تمدید یک محصول فین‌تک برای اشتراک‌ها، کیف پول و پرداخت است، همراه با گیمیفیکیشن. سودابه به‌تنهایی طراحی‌اش کرد؛ اول موبایل و بعد وب، با دیزاین سیستم اختصاصی. الان در مرحله‌ی توسعه است.",
    },
    link: { href: "/work/tamdid", label: { en: "Tamdid case study", fa: "کیس استادی تمدید" } },
  },
  {
    id: "kudos",
    entity: true,
    strong: ["kudos", "کودوس"],
    answer: {
      en: "Kudos is an HR and employee-engagement platform. At Novaday she designed its admin panel on a Tailwind-based system, documented flows and page logic for engineers, and worked closely with PM and QA. Kudos is live with real companies, and by her count around 500 people use it.",
      fa: "کودوس یک پلتفرم منابع انسانی و تعامل کارکنان است. در نوادی پنل ادمینش را روی دیزاین سیستم مبتنی بر Tailwind طراحی کرد، فلوها و منطق صفحات را برای تیم فنی مستند کرد و نزدیک با PM و QA کار کرد. کودوس با شرکت‌های واقعی در حال استفاده است و به گفته‌ی خودش حدود ۵۰۰ نفر کاربرش هستند.",
    },
    link: { href: "/work/kudos", label: { en: "Kudos case study", fa: "کیس استادی کودوس" } },
  },
  {
    id: "remeet",
    entity: true,
    strong: ["remeet", "access", "award", "awards", "tehran design week", "design week", "prize", "ریمیت", "اکسس", "جایزه", "هفته دیزاین", "هفته طراحی"],
    answer: {
      en: "Remeet (first called Access) is a multilingual access and meeting system with fingerprint and RFID check-in and Outlook sync. Sudabeh designed it at Novaday, and it won at Tehran Design Week.",
      fa: "ریمیت (که اول اسمش اکسس بود) یک سیستم چندزبانه‌ی مدیریت دسترسی و جلسات با ورود اثر انگشت و RFID و همگام با Outlook است. سودابه آن را در نوادی طراحی کرد و در هفته‌ی دیزاین تهران برنده شد.",
    },
    link: { href: "/work/remeet", label: { en: "About Remeet", fa: "درباره‌ی ریمیت" } },
  },
  {
    id: "atlas",
    entity: true,
    strong: ["atlas", "aix2", "اطلس"],
    answer: {
      en: "Atlas is an AI platform she designs at Algonet. It analyses a company’s emails, chats and workflows, maps how work really moves, and suggests a simpler process. It’s in development, so parts are shown blurred.",
      fa: "اطلس یک پلتفرم هوش مصنوعی است که سودابه در الگونت طراحی می‌کند. ایمیل‌ها، چت‌ها و فرایندهای یک شرکت را تحلیل می‌کند، مسیر واقعی کارها را نشان می‌دهد و مسیر ساده‌تری پیشنهاد می‌دهد. در حال توسعه است و بخشی از آن تار نمایش داده شده.",
    },
    link: { href: "/work/atlas", label: { en: "About Atlas", fa: "درباره‌ی اطلس" } },
  },
  {
    id: "azman",
    entity: true,
    strong: ["azman", "hamgam", "hamgam saz", "ازمان", "همگام ساز", "همگام‌ساز", "همگام"],
    answer: {
      en: "AzMan is three connected products: the AzMan marketplace for customers, Hamgam Saz for the field experts and their communication, and the ERP that runs both. Sudabeh is the designer behind all three.",
      fa: "ازمان سه محصول به هم پیوسته است: مارکت‌پلیس ازمان برای مشتری‌ها، همگام‌ساز برای کارشناسان و ارتباطاتشان، و ERP که هر دو را مدیریت می‌کند. طراح هر سه محصول سودابه است.",
    },
    link: { href: "/work/azman", label: { en: "AzMan case study", fa: "کیس استادی ازمان" } },
  },
  {
    id: "kaaryar",
    entity: true,
    strong: ["kaaryar", "karyar", "studio kaaryar", "کاریار", "کاریار استودیو"],
    answer: {
      en: "Studio Kaaryar puts graduates of Kaaryar’s training on real client projects. Sudabeh redesigned its four-page website, deliberately simple, within tight client constraints, on a small design system.",
      fa: "کاریار استودیو فارغ‌التحصیلان دوره‌های کاریار را روی پروژه‌های واقعی می‌برد. سودابه سایت چهارصفحه‌ای‌اش را با محدودیت‌های جدی کارفرما، عمداً ساده، روی یک دیزاین سیستم کوچک ریدیزاین کرد.",
    },
    link: { href: "/work/kaaryar", label: { en: "Kaaryar case study", fa: "کیس استادی کاریار" } },
  },
  {
    id: "novinhost",
    entity: true,
    strong: ["novin", "novin host", "novinhost", "hosting", "نوین", "نوین هاست", "هاستینگ"],
    answer: {
      en: "Novin Host is a 15-year-old hosting brand. She redesigned its website to feel current and make choosing a plan easier, without losing the customers who already know their way around.",
      fa: "نوین هاست یک برند هاستینگ با ۱۵ سال سابقه است. سودابه سایتش را ریدیزاین کرد تا به‌روزتر باشد و انتخاب سرویس راحت‌تر شود، بدون اینکه مشتری‌های قدیمی راهشان را گم کنند.",
    },
    link: { href: "/work/novinhost", label: { en: "Novin Host case study", fa: "کیس استادی نوین هاست" } },
  },
  {
    id: "nanvanamak",
    entity: true,
    strong: ["nan va namak", "nanvanamak", "startup", "own startup", "نان و نمک", "نون و نمک", "استارتاپ"],
    answer: {
      en: "Nan va Namak was a cooking platform she and a few friends set out to launch. She and another designer took it from idea to execution across web, tablet and mobile. It didn’t launch, but it’s where she became a product designer.",
      fa: "نان و نمک یک پلتفرم آشپزی بود که سودابه و چند دوستش می‌خواستند لانچ کنند. او و یک طراح دیگر آن را از ایده تا اجرا برای وب، تبلت و موبایل طراحی کردند. لانچ نشد، ولی همان‌جا بود که پروداکت دیزاینر شد.",
    },
    link: { href: "/work/nanvanamak", label: { en: "The story", fa: "داستانش" } },
  },
  {
    id: "algonet",
    entity: true,
    strong: ["algonet", "الگونت"],
    answer: {
      en: "At Algonet (full-time) she designs Atlas, dashboards and operational tools, and built a custom design system. She also shaped Algonet’s visual identity: logo, pattern and brochure.",
      fa: "در الگونت (تمام‌وقت) روی اطلس، داشبوردها و ابزارهای عملیاتی کار می‌کند و دیزاین سیستم اختصاصی ساخته. هویت بصری الگونت هم کار اوست: لوگو، پترن و بروشور.",
    },
  },
  {
    id: "novaday",
    entity: true,
    strong: ["novaday", "نوادی", "نوا دی"],
    answer: {
      en: "At Novaday (full-time, hybrid) she designed Kudos, an HR platform, and Remeet, an award-winning access system, on a Tailwind-based design system, with benchmarks, competitor analysis and usability testing.",
      fa: "در نوادی (تمام‌وقت، هیبرید) کودوس، یک پلتفرم منابع انسانی، و ریمیت، سیستم دسترسی برنده‌ی جایزه، را روی دیزاین سیستم مبتنی بر Tailwind طراحی کرد؛ همراه با بنچمارک، تحلیل رقبا و تست یوزبیلیتی.",
    },
  },
  {
    id: "branding",
    strong: ["branding", "brand", "logo", "visual identity", "identity", "graphic design", "environmental", "برندینگ", "برند", "لوگو", "هویت بصری", "گرافیک", "بروشور", "پترن"],
    answer: {
      en: "Out of curiosity, yes: she shaped Algonet’s visual identity (logo, pattern, brochure) and has done campaign visuals. Product design is still her main craft.",
      fa: "از سر کنجکاوی، بله: هویت بصری الگونت (لوگو، پترن، بروشور) کار اوست و تجربه‌ی طراحی کمپین هم دارد. ولی تخصص اصلی‌اش پروداکت دیزاین است.",
    },
  },

  {
    id: "industries",
    strong: ["industries", "industry", "domains", "domain", "sectors", "sector", "fields", "صنعت", "صنایع", "حوزه ها", "چه حوزه", "چه زمینه"],
    answer: {
      en: "Fintech (Tamdid), HR tech (Kudos), workplace access (Remeet), enterprise AI (Atlas), a services marketplace with its ERP (AzMan), web hosting (Novin Host), a social-impact studio (Kaaryar), online printing (ChapAgha), education (Alla) and food (Nan va Namak).",
      fa: "فین‌تک (تمدید)، منابع انسانی (کودوس)، مدیریت دسترسی (ریمیت)، هوش مصنوعی سازمانی (اطلس)، مارکت‌پلیس خدمات و ERP آن (ازمان)، هاستینگ (نوین هاست)، استودیوی اجتماعی (کاریار)، چاپ آنلاین (چاپ آقا)، آموزش (آلا) و آشپزی (نان و نمک).",
    },
  },
  {
    id: "audience",
    strong: ["b2c", "b2b", "consumer", "consumers", "end users", "enterprise", "saas", "مصرف کننده", "کاربر نهایی", "سازمانی"],
    answer: {
      en: "Both. Consumer-facing: Tamdid, AzMan’s marketplace and Nan va Namak. Business and internal tools: Atlas, Kudos, Remeet and AzMan’s ERP.",
      fa: "هر دو. محصولات مصرف‌کننده: تمدید، مارکت‌پلیس ازمان و نان و نمک. ابزارهای سازمانی و داخلی: اطلس، کودوس، ریمیت و ERP ازمان.",
    },
  },
  {
    id: "leadership",
    strong: ["lead designer", "design lead", "led a team", "led a design team", "lead a design team", "lead designers", "lead a team", "led the team", "team lead", "manage designers", "managed designers", "management", "mentor", "mentored", "mentoring", "مدیریت تیم", "لید", "سرپرست", "منتور", "منتورینگ"],
    answer: {
      en: "Not yet as a title: her roles so far have been product designer, often the only designer on the product. Leading is where she wants to go next, and she enjoys the management side of the work.",
      fa: "هنوز نه به‌عنوان عنوان شغلی: نقش‌هایش تا الان پروداکت دیزاینر بوده و اغلب تنها طراح محصول. قدم بعدی‌ای که دوست دارد لید شدن است و بخش مدیریتی کار را هم دوست دارد.",
    },
  },
  {
    id: "leaving",
    strong: ["leave algonet", "leaving algonet", "why leave", "why is she leaving", "why does she want to leave", "why is she looking", "looking for a new job", "why change", "چرا میخواد بره", "بیاد بیرون", "بره بیرون", "ترک کنه", "چرا دنبال کار"],
    forward: true,
    answer: {
      en: "That’s one for Sudabeh to answer herself. I’ve sent her your question.",
      fa: "این را بهتر است خود سودابه جواب بدهد. سؤال‌تان را برایش فرستادم.",
    },
  },
  {
    id: "inquiry",
    strong: ["for my startup", "for my company", "for my business", "for my project", "my website", "my app", "my product", "how much for", "how much would", "how long does a project", "how long will", "how long would", "timeline", "quote", "estimate", "برای استارتاپم", "برای شرکتم", "برای کسب و کارم", "پروژه من", "سایت من", "اپ من", "چقدر طول", "زمان تحویل", "هزینه طراحی", "چقدر هزینه"],
    forward: true,
    answer: {
      en: "It depends on the brief. Sudabeh reads it properly first, then sends you a timeline and a quote. I’ve passed your message on to her; leave a contact below so she can reply.",
      fa: "به بریف بستگی دارد. سودابه اول آن را کامل بررسی می‌کند و بعد زمان‌بندی و هزینه را برایتان می‌فرستد. پیام‌تان را برایش فرستادم؛ یک راه ارتباطی بگذارید تا جواب بدهد.",
    },
  },
  {
    id: "story",
    strong: ["failure", "mistake", "colleagues", "references", "reference", "recommendation", "شکست", "اشتباه", "توصیه نامه", "رفرنس", "معرف کاری", "همکاراش"],
    forward: true,
    answer: {
      en: "That one is best answered by Sudabeh herself. I’ve sent her your question.",
      fa: "این را بهتر است خود سودابه جواب بدهد. سؤال‌تان را برایش فرستادم.",
    },
  },
  {
    id: "challenge",
    strong: ["hardest", "biggest challenge", "challenge", "challenging", "difficult project", "toughest", "pressure", "سخت ترین", "چالش", "سختی", "فشار"],
    answer: {
      en: "Every project has its hard part, so she won’t pick just one. What tests her most is extreme time pressure, like Atlas, which her team took live in two to three days. She gets through it with a tight plan, AI as a partner and plenty of persistence.",
      fa: "هر پروژه‌ای سختی خودش را دارد، برای همین یکی را انتخاب نمی‌کند. چیزی که بیشتر از همه محکش می‌زند فشار زمانی شدید است، مثل اطلس که تیمش در دو سه روز بالا آورد. با یک برنامه‌ی دقیق، هوش مصنوعی به‌عنوان همراه و کلی پشتکار از پسش برمی‌آید.",
    },
  },
  {
    id: "results",
    strong: ["results", "impact", "metrics", "kpi", "numbers", "how many users", "outcome", "outcomes", "نتیجه", "نتایج", "دستاورد", "چند کاربر", "تعداد کاربر"],
    answer: {
      en: "Kudos is the clearest one: it’s live with real companies, and by her count around 500 people use it. Remeet won at Tehran Design Week, Atlas went from brief to live in two to three days, and Tamdid is in development.",
      fa: "روشن‌ترینش کودوس است: با شرکت‌های واقعی در حال استفاده است و به گفته‌ی خودش حدود ۵۰۰ نفر کاربرش هستند. ریمیت در هفته‌ی دیزاین تهران برنده شد، اطلس در دو سه روز از بریف به نسخه‌ی لایو رسید و تمدید در حال توسعه است.",
    },
  },
  {
    id: "philosophy",
    strong: ["philosophy", "principle", "principles", "what makes good design", "good design", "design values", "approach to design", "فلسفه", "اصول طراحی", "طراحی خوب"],
    answer: {
      en: "A design has to work for two people at once: the user, who needs it to be easy, and the business, which needs it to deliver. When both are happy, and she enjoyed the way there, the job is done right.",
      fa: "طراحی باید هم‌زمان برای دو نفر کار کند: کاربری که می‌خواهد کار برایش ساده باشد، و کسب‌وکاری که باید به نتیجه برسد. وقتی هر دو راضی باشند و خودش هم از مسیر لذت برده باشد، کار درست انجام شده.",
    },
  },
  {
    id: "hours",
    strong: ["time zone", "timezone", "time zones", "overlap", "us hours", "european hours", "working hours", "weekend", "weekends", "hours", "تایم زون", "منطقه زمانی", "ساعت کاری", "آخر هفته", "تعطیلات"],
    answer: {
      en: "She’s in Tehran (UTC+3:30) and can line up her hours with teams in other time zones, US hours included. She works weekends too when a project needs it.",
      fa: "ساکن تهران است (UTC+3:30) و می‌تواند ساعت کاری‌اش را با تیم‌هایی در منطقه‌های زمانی دیگر، حتی آمریکا، هماهنگ کند. اگر پروژه لازم داشته باشد آخر هفته‌ها هم کار می‌کند.",
    },
  },
  {
    id: "nda",
    strong: ["nda", "ndas", "non disclosure", "non-disclosure", "confidentiality agreement", "عدم افشا", "قرارداد محرمانگی", "محرمانگی"],
    answer: {
      en: "Yes, she signs NDAs. Confidential work, like Atlas, stays confidential.",
      fa: "بله، قرارداد عدم افشا امضا می‌کند. کار محرمانه، مثل اطلس، محرمانه می‌ماند.",
    },
  },
  {
    id: "confidential",
    strong: ["see atlas", "atlas designs", "confidential", "private work", "password", "under nda", "show me atlas", "کار محرمانه", "طراحی های اطلس", "دیدن اطلس"],
    forward: true,
    answer: {
      en: "Atlas is still in development, so it stays blurred on the site. She’s happy to walk you through it privately, for example in an interview. I’ve let her know you’d like to see it.",
      fa: "اطلس هنوز در حال توسعه است، برای همین در سایت تار مانده. سودابه خوشحال می‌شود آن را به‌صورت خصوصی، مثلاً در جلسه‌ی مصاحبه، نشان‌تان بدهد. به او خبر دادم که می‌خواهید ببینیدش.",
    },
  },
  {
    id: "motion",
    strong: ["motion design", "motion", "animation", "animations", "illustration", "illustrations", "موشن", "انیمیشن", "ایلاستریشن", "تصویرسازی"],
    answer: {
      en: "Not as a specialist: she doesn’t do motion design. When a project needs visuals or illustrations, she creates them with the help of AI tools.",
      fa: "نه به‌صورت تخصصی: موشن دیزاین کار نمی‌کند. وقتی پروژه به ویژوال یا تصویرسازی نیاز داشته باشد، با کمک ابزارهای هوش مصنوعی آن را می‌سازد.",
    },
  },
  {
    id: "testing",
    strong: ["a/b", "ab test", "ab testing", "a b test", "split test", "experiment", "experiments", "تست ای بی", "ای بی تست", "آزمایش"],
    answer: {
      en: "Yes, she has run A/B tests, alongside usability testing and analytics with Hotjar, Maze, Microsoft Clarity and GA4.",
      fa: "بله، A/B تست اجرا کرده؛ در کنار تست یوزبیلیتی و آنالیتیکس با Hotjar، Maze، Microsoft Clarity و GA4.",
    },
  },
  {
    id: "uxwriting",
    strong: ["ux copy", "ux writing", "microcopy", "copywriting", "write copy", "writes copy", "content design", "یو ایکس رایتینگ", "یو ایکس کپی", "متن نویسی", "کپی رایتینگ"],
    answer: {
      en: "Yes, she writes UX copy herself, as part of the design: labels, empty states, errors and the words that help people decide.",
      fa: "بله، یو‌ایکس رایتینگ را خودش و به‌عنوان بخشی از طراحی انجام می‌دهد: لیبل‌ها، حالت‌های خالی، پیام‌های خطا و کلماتی که به تصمیم کاربر کمک می‌کنند.",
    },
  },
  {
    id: "audit",
    strong: ["ux audit", "audit", "heuristic", "heuristics", "review my product", "review my site", "expert review", "آدیت", "ممیزی", "بررسی محصول", "بررسی سایت", "هیوریستیک"],
    answer: {
      en: "Yes, UX audits are one of her specialties. The Novin Host case study opens with one: a heuristic review of the live site before any redesign.",
      fa: "بله، یو‌ایکس آدیت از تخصص‌هایش است. کیس استادی نوین هاست با همین شروع می‌شود: بررسی هیوریستیک سایت فعلی قبل از هر ریدیزاینی.",
    },
    link: { href: "/work/novinhost", label: { en: "Novin Host case study", fa: "کیس استادی نوین هاست" } },
  },
  {
    id: "accessibility",
    strong: ["accessibility", "accessible", "wcag", "a11y", "contrast", "screen reader", "دسترس پذیری", "دسترسی پذیری", "اکسسیبیلیتی", "کنتراست"],
    answer: {
      en: "Yes. She designs with accessibility in mind, and checks contrast, readability and states with several AI tools, so nothing gets missed.",
      fa: "بله. با در نظر گرفتن دسترس‌پذیری طراحی می‌کند و کنتراست، خوانایی و حالت‌ها را با چند ابزار هوش مصنوعی چک می‌کند تا چیزی از قلم نیفتد.",
    },
  },
  {
    id: "workshop",
    strong: ["workshop", "workshops", "facilitate", "facilitation", "design sprint", "ورکشاپ", "کارگاه"],
    answer: {
      en: "Not yet: she hasn’t run workshops. Her collaboration has been day to day, side by side with PMs, engineers and QA.",
      fa: "هنوز نه، ورکشاپ برگزار نکرده. همکاری‌اش روزمره و کنار مدیر محصول، تیم فنی و QA بوده.",
    },
  },
  {
    id: "international",
    strong: ["international clients", "international client", "foreign clients", "foreign client", "clients abroad", "international team", "global clients", "کارفرمای خارجی", "مشتری خارجی", "تیم خارجی", "شرکت خارجی"],
    answer: {
      en: "Not with a client abroad yet. She has designed products in English and multilingual ones, like Remeet, and she’s ready for an international team.",
      fa: "هنوز با کارفرمای خارجی کار نکرده. محصول انگلیسی و چندزبانه، مثل ریمیت، طراحی کرده و برای کار در تیم بین‌المللی آماده است.",
    },
  },

  // Getting in touch
  {
    id: "contact",
    strong: ["contact", "email", "e-mail", "phone", "number", "call", "telegram", "linkedin", "reach", "talk to her", "talk to sudabeh", "get in touch", "book an interview", "schedule an interview", "job interview", "interview her", "book a call", "schedule a call", "video call", "set up a meeting", "مصاحبه کاری", "دعوت به مصاحبه", "تماس تصویری", "جلسه آنلاین", "ایمیل", "تماس", "شماره", "تلفن", "تلگرام", "لینکدین", "ارتباط", "صحبت کنم", "پیام بدم"],
    answer: {
      en: "Email sudabeh.a.zolfikhorram@gmail.com, or Telegram @sudabehzolfikhorram. She’s on LinkedIn too: linkedin.com/in/sudabehzolfikhorram2001. Her phone number is in her CV. Or just write your message here and I’ll pass it on.",
      fa: "ایمیل: sudabeh.a.zolfikhorram@gmail.com یا تلگرام: ‎@sudabehzolfikhorram. لینکدین هم دارد: linkedin.com/in/sudabehzolfikhorram2001. شماره تلفنش در رزومه هست. یا همین‌جا پیام‌تان را بنویسید تا برایش بفرستم.",
    },
  },
  {
    id: "cv",
    strong: ["cv", "resume", "résumé", "pdf", "download", "رزومه", "سی وی", "دانلود"],
    answer: {
      en: "Here’s her CV as a PDF. If something you’re looking for isn’t in it, just ask me.",
      fa: "رزومه‌اش به‌صورت PDF اینجاست. اگر چیزی که دنبالش هستید در آن نبود، از من بپرسید.",
    },
    link: { href: CV, label: { en: "Download CV (PDF)", fa: "دانلود رزومه (PDF)" } },
  },
  {
    id: "dribbble",
    strong: ["dribbble", "behance", "instagram", "shots", "دریبل", "بیهنس", "اینستاگرام"],
    answer: {
      en: "Her shots are on Dribbble (dribbble.com/SudabehZolfikhorram) and Instagram (@sudabehzolfi.design). The full case studies are on this site.",
      fa: "نمونه‌کارهای کوتاهش در دریبل (dribbble.com/SudabehZolfikhorram) و اینستاگرام (‎@sudabehzolfi.design) است. کیس استادی‌های کامل در همین سایت است.",
    },
  },
];

// ───────────────────────── matching ─────────────────────────

const PERSIAN = /[؀-ۿ]/;
export const detectLang = (text: string): Lang => (PERSIAN.test(text) ? "fa" : "en");

/** Lowercase, unify Arabic/Persian letters and digits, drop punctuation and zero-width joiners. */
export function normalize(text: string) {
  return ` ${text
    .toLowerCase()
    .replace(/[ي]/g, "ی")
    .replace(/[ك]/g, "ک")
    .replace(/[ۀة]/g, "ه")
    .replace(/[أإآ]/g, "ا")
    .replace(/[ً-ْ]/g, "")
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x6f0))
    .replace(/[‌‍]/g, " ")
    .replace(/[’'`]/g, "")
    .replace(/[^\p{L}\p{N}\s+#.-]/gu, " ")
    .replace(/[.-](?=\s|$)/g, " ")
    .replace(/\s+/g, " ")
    .trim()} `;
}

// Pre-normalised keywords, so matching is a few substring checks per intent.
const compiled = intents.map((it) => ({
  it,
  // Spellings that normalise to the same text («پروژه‌ای», «پروژه ای») count once.
  strong: [...new Set(it.strong.map((k) => normalize(k)))],
  weak: [...new Set((it.weak ?? []).map((k) => normalize(k)))],
}));

/** Whole-word (or whole-phrase) match; short English words must match exactly, longer ones may take a suffix (projects → project). */
function hit(text: string, key: string) {
  if (text.includes(key)) return true;
  const word = key.trim();
  // Persian words often take suffixes: «پروژه‌هات», «رزومه‌ات».
  if (PERSIAN.test(word)) return word.length >= 3 && text.includes(` ${word}`);
  // English: the last word may take a short ending (panel → panels, manager → managers).
  const last = word.split(" ").pop() ?? word;
  if (last.length < 4) return false;
  return new RegExp(`\\s${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[a-z]{0,3}\\s`).test(text);
}

export type Match = { intent: Intent; score: number };

const SMALL_TALK = ["greet", "thanks"];
// Questions about the visitor's own project or about leaving a job always go to Sudabeh, even when a
// project name appears too ("a site for my startup", "why leave Algonet").
const OVERRIDE = ["inquiry", "leaving", "confidential"];
// Broad intents that shouldn't be tacked onto a more specific answer.
const GENERIC = ["who", "projects", "greet", "thanks", "bye"];

/** The best and, if clearly also asked, the second best intent for a question. */
export function match(question: string): Match[] {
  const text = normalize(question);
  const scored = compiled
    .map(({ it, strong, weak }) => ({
      intent: it,
      // Longer phrases count more; the tiny length bonus breaks ties toward the more specific match
      // («چند سالته» over «چند سال»); named projects outrank generic phrasing.
      score:
        strong.reduce((s, k) => s + (hit(text, k) ? 2 + Math.min(2, k.trim().split(" ").length - 1) + k.length / 100 + (it.entity ? 3 : 0) : 0), 0) +
        weak.reduce((s, k) => s + (hit(text, k) ? 1 : 0), 0),
    }))
    .filter((m) => m.score >= 1)
    .sort((a, b) => b.score - a.score);
  if (scored.length === 0) return [];
  // Greetings and thanks only count when nothing else was asked ("hi, what tools do you use?").
  const asked = scored.filter((m) => !SMALL_TALK.includes(m.intent.id));
  // A general answer (the intro, the project list) gives way to a specific topic ("tell me about
  // your experience", "metrics from her projects").
  const specific = asked.some((m) => !GENERIC.includes(m.intent.id) && m.score >= 2);
  if (specific && asked[0] && ["who", "projects"].includes(asked[0].intent.id)) asked.splice(0, 1);
  const ranked = asked.length > 0 ? asked : scored;
  const override = ranked.find((m) => OVERRIDE.includes(m.intent.id));
  if (override) return [override];
  const [first, second] = ranked;
  if (first.score < 2 && ranked.length > 1) return [];
  // A second answer only when the question clearly asks two things, and never on top of a named project.
  const both = second && !first.intent.entity && !GENERIC.includes(second.intent.id) && second.score >= 4 && second.score >= first.score - 2;
  return both ? [first, second] : [first];
}

/** "I couldn't find X in the CV": acknowledge it before answering. */
export const missingFromCv = (q: string) =>
  /couldn.?t find|could not find|didn.?t see|not in (your|the|her) (cv|resume)|missing from|پیدا نکردم|ندیدم|نبود|نیست تو رزومه|توی رزومه نیست|تو رزومه نیست/i.test(q);

export type Reply = {
  lang: Lang;
  text: string;
  links: { href: string; label: string }[];
  /** Offer to send the question to Sudabeh. */
  offerForward: boolean;
  /** No intent matched at all. */
  unknown: boolean;
  intents: string[];
};

const FALLBACK: Record<Lang, string> = {
  en: "I’m not sure about that one, and I’d rather not guess. So I’ve sent your question to Sudabeh, and she’ll answer it herself.",
  fa: "از جواب این سؤال مطمئن نیستم و نمی‌خواهم حدس بزنم. برای همین سؤال‌تان را برای خود سودابه فرستادم تا خودش جواب بدهد.",
};
const MISSING: Record<Lang, string> = {
  en: "Fair point, it’s not obvious in the CV. ",
  fa: "حق با شماست، در رزومه واضح نیست. ",
};

export function answer(question: string, langOverride?: Lang): Reply {
  const lang = langOverride ?? detectLang(question);
  const found = match(question);
  if (found.length === 0) {
    return { lang, text: FALLBACK[lang], links: [], offerForward: true, unknown: true, intents: [] };
  }
  const prefix = missingFromCv(question) ? MISSING[lang] : "";
  const text = prefix + found.map((m) => m.intent.answer[lang]).join("\n\n");
  const links = found.flatMap((m) => (m.intent.link ? [{ href: m.intent.link.href, label: m.intent.link.label[lang] }] : []));
  return {
    lang,
    text,
    links,
    offerForward: found.some((m) => m.intent.forward),
    unknown: false,
    intents: found.map((m) => m.intent.id),
  };
}

export const SUGGESTIONS: Record<Lang, string[]> = {
  en: ["How many years of experience?", "What tools does she use?", "Is she open to remote work?", "Tell me about Tamdid"],
  fa: ["چند سال سابقه داره؟", "با چه ابزارهایی کار می‌کنه؟", "ریموت کار می‌کنه؟", "درباره‌ی تمدید بگو"],
};
