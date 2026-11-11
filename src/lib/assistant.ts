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
      en: "Hi! I’m Sudabeh’s assistant. Ask me anything about her work, skills or experience, the way you would in an interview.",
      fa: "سلام! من دستیار سودابه هستم. هر سؤالی درباره‌ی کار، مهارت‌ها یا سوابقش دارید، مثل یک مصاحبه بپرسید.",
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
    strong: ["who is", "who are", "about her", "about you", "about yourself", "tell me about yourself", "tell me about her", "walk me through", "your background", "her background", "introduce", "tell me about", "summary", "what does she do", "what do you do", "what she does", "is she a designer", "are you a designer", "kind of designer", "type of designer", "سودابه کیه", "کی هستی", "معرفی", "درباره", "خلاصه", "معرفی کن", "چیکار میکنی", "چیکار می کنی", "چکار میکنی", "چه کاره", "چکاره", "کارت چیه", "کارش چیه", "طراحی چی", "از خودت بگو", "خودتو معرفی کن", "خودت رو معرفی کن", "از سودابه بگو", "معرفی کوتاه"],
    weak: ["sudabeh", "سودابه"],
    link: { href: "/work", label: { en: "See all projects", fa: "همه‌ی پروژه‌ها" } },
    answer: {
      en: "Sudabeh Zolfi Khorram is a product designer with 5+ years of experience who makes complicated products feel simple: fintech, HR tools, ERP and enterprise AI, from the first flow to developer handoff. Right now she designs B2B products at Algonet, including Atlas, an AI platform. Before that she designed Tamdid on her own and, at Novaday, Remeet, which went on to win at Tehran Design Week. She’s based in Tehran and open to remote work.",
      fa: "سودابه زلفی‌خرم پروداکت دیزاینری با بیش از ۵ سال سابقه است که محصولات پیچیده را ساده می‌کند: فین‌تک، ابزارهای منابع انسانی، ERP و هوش مصنوعی سازمانی، از اولین فلو تا تحویل به توسعه. الان در الگونت محصولات B2B طراحی می‌کند، از جمله اطلس که یک پلتفرم هوش مصنوعی است. پیش از آن تمدید را به‌تنهایی طراحی کرد و در نوادی ریمیت را، که بعدها در هفته‌ی دیزاین تهران برنده شد. ساکن تهران است و برای کار ریموت آماده است.",
    },
  },
  {
    id: "role",
    strong: ["current job", "currently", "where do you work", "where does she work", "what company", "which company", "current role", "right now", "nowadays", "الان کجا", "فعلا کجا", "کجا کار", "شغل فعلی", "latest project", "last project", "recent project", "current project", "last company", "latest company", "current company", "current employer", "آخرین پروژه", "آخرین شرکت", "پروژه فعلی", "شرکت فعلی", "پروژه الان", "الان چیکار", "الان چیکار میکنی", "مشغول", "مشغول چه", "working on", "work on now", "what does she work on", "what do you work on", "busy with", "these days", "این روزها", "این روزا", "روی چی کار"],
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
    strong: ["remote", "work from home", "wfh", "hybrid", "ریموت", "دورکاری", "دور کاری", "هیبرید", "از راه دور"],
    answer: {
      en: "Yes, remote is what she’s looking for. She has delivered projects remotely, such as Tamdid and Studio Kaaryar.",
      fa: "بله، دنبال کار ریموت است و پروژه‌هایی مثل تمدید و کاریار استودیو را به‌صورت ریموت انجام داده.",
    },
  },
  {
    id: "availability",
    strong: ["what kind of role", "type of role", "kind of job", "kind of work", "what kind of company", "type of company", "kind of company", "company size", "notice period", "start right away", "start immediately", "چه نوع همکاری", "نوع همکاری", "چه شرکتی", "نوع شرکت", "چه نوع شرکت", "کی میتونه شروع", "کی می‌تونه شروع", "کی شروع", "شروع کنه", "زمان شروع", "available", "availability", "open to work", "hiring", "looking for a job", "open to new", "job offer", "can we hire", "hire her", "hire you", "start date", "can you start", "can she start", "notice period", "when can", "آزاد", "در دسترس", "دنبال کار", "استخدام", "شروع همکاری", "کی میتونی", "از کی", "پیشنهاد کاری", "کار جدید", "آماده کار", "آماده‌ی کار", "آماده همکاری", "آماده‌ی همکاری", "موقعیت شغلی", "فرصت شغلی", "جویای کار", "new role", "new job", "looking for work", "estekhdam"],
    answer: {
      en: "For a full-time role, she can start after a month’s notice to her current employer; project-based work can start right away. Remote, full-time, part-time or project-based all work for her; the one thing she isn’t looking for is on-site work. Any kind of company is fine, from startups to large teams.",
      fa: "برای نقش تمام‌وقت، بعد از یک ماه فرصت برای اطلاع به شرکت فعلی‌اش می‌تواند شروع کند؛ برای کار پروژه‌ای همین الان آماده است. ریموت، تمام‌وقت، پاره‌وقت یا پروژه‌ای، همه برایش مناسب است؛ فقط دنبال کار حضوری نیست. نوع شرکت هم فرقی نمی‌کند، از استارتاپ تا تیم‌های بزرگ.",
    },
  },
  {
    id: "onsite",
    strong: ["on-site", "on site", "onsite", "in office", "in the office", "office", "office based", "come to the office", "حضوری", "از دفتر", "دفتر کار"],
    answer: {
      en: "She isn’t looking for on-site work. Remote, full-time, part-time or project-based all work for her.",
      fa: "دنبال کار حضوری نیست. ریموت، تمام‌وقت، پاره‌وقت یا پروژه‌ای، همه برایش اوکی است.",
    },
  },
  {
    id: "freelance",
    strong: ["freelance", "freelancer", "project based", "project-based", "contract", "part time", "part-time", "full time", "full-time", "فریلنس", "پروژه ای", "پروژه‌ای", "پاره وقت", "پاره‌وقت", "تمام وقت", "تمام‌وقت", "قرارداد"],
    answer: {
      en: "Remote, full-time, part-time or project-based: all of them work for her. The one thing she isn’t looking for is on-site work. She has done both full-time roles (Algonet, Novaday) and project-based work (Tamdid, Studio Kaaryar).",
      fa: "ریموت، تمام‌وقت، پاره‌وقت یا پروژه‌ای، همه برایش اوکی است؛ فقط دنبال کار حضوری نیست. تجربه‌ی هر دو را دارد: نقش‌های تمام‌وقت (الگونت، نوادی) و پروژه‌ای (تمدید، کاریار استودیو).",
    },
  },
  {
    id: "salary",
    strong: ["salary", "salary expectation", "expected pay", "compensation", "hourly rate", "day rate", "your rate", "her rate", "her rates", "your rates", "rate card", "price", "how much does she cost", "how much do you charge", "how much does she charge", "hourly", "حقوق چند", "چند حقوق", "حقوق میخوای", "حقوق میخواد", "حقوق مدنظر", "حقوق مد نظر", "حقوق دریافتی", "دریافتی", "میزان دستمزد", "ساعتی", "ریت ساعتی", "budget", "expected salary", "حقوق درخواستی", "حقوق چقدر", "چقدر حقوق", "حقوقت", "حقوق ماهانه", "حقوق انتظاری", "انتظار حقوق", "میزان حقوق", "دستمزد", "قیمت", "هزینه", "ریت", "بودجه", "hoghoogh"],
    answer: {
      en: "It depends on the role and the scope of work, so she’d rather talk it through with you first. I’ve sent your question to her so she can answer directly.",
      fa: "به نقش و حجم کار بستگی دارد، برای همین ترجیح می‌دهد اول با شما صحبت کند. سؤال‌تان را برایش فرستادم تا خودش مستقیم جواب بدهد.",
    },
    forward: true,
  },
  {
    id: "relocation",
    strong: ["relocate", "relocation", "move abroad", "visa", "work permit", "move to", "مهاجرت", "ریلوکیشن", "جابجایی", "ویزا", "اقامت"],
    answer: {
      en: "She’s planning to relocate, and doesn’t have a visa yet.",
      fa: "قصد مهاجرت دارد و فعلاً ویزا ندارد.",
    },
  },
  {
    id: "hobbies",
    strong: ["hobby", "hobbies", "free time", "spare time", "outside work", "outside of work", "for fun", "weekend plans", "سرگرمی", "اوقات فراغت", "وقت آزاد", "بیرون از کار", "تفریح"],
    answer: {
      en: "Outside work: films, nature trips and time with friends.",
      fa: "بیرون از کار: فیلم دیدن، طبیعت‌گردی و وقت گذراندن با دوستانش.",
    },
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
    strong: ["education", "degree", "university", "bachelor", "study", "studied", "major", "college", "law", "تحصیلات", "مدرک", "دانشگاه", "لیسانس", "کارشناسی", "رشته", "حقوق خوندی", "رشته حقوق", "حقوق خونده", "تحصیل", "چی خوندی", "چی خونده", "چی خوندید", "درس خوندی", "tahsilat", "reshte"],
    weak: ["حقوق"],
    answer: {
      en: "She has a Bachelor of Law from Payame Noor University (PNU). Design came alongside: she started her first design job the same term she started her degree.",
      fa: "کارشناسی حقوق از دانشگاه پیام نور دارد. دیزاین هم‌زمان شروع شد: همان ترمی که وارد دانشگاه شد، اولین کار دیزاینش را هم شروع کرد.",
    },
  },
  {
    id: "lawToDesign",
    strong: ["why design", "why law", "background", "از حقوق", "حقوق به", "حقوق اومد", "سمت دیزاین", "سمت طراحی", "پیشینه", "پیش زمینه", "law to design", "from law", "switch", "career change", "how did you start", "how did she start", "become a designer", "got into design", "چرا دیزاین", "چرا حقوق", "تغییر مسیر", "چطور دیزاینر", "چجوری دیزاینر", "چطوری دیزاینر", "دیزاینر شد", "از کجا شروع", "چجوری شروع"],
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
    strong: ["english", "language", "languages", "speak", "persian", "farsi", "ielts", "toefl", "آیلتس", "تافل", "انگلیسی", "زبان", "فارسی", "مکالمه", "زبانت", "zaban", "english interview", "interview in english", "مصاحبه انگلیسی", "مصاحبه به انگلیسی"],
    answer: {
      en: "Persian is her native language, and she works and communicates in English at a working level. She’s ready for interviews in English. She doesn’t hold an IELTS or TOEFL certificate.",
      fa: "فارسی زبان مادری‌اش است و به انگلیسی در حد کاری کار و ارتباط برقرار می‌کند. برای مصاحبه به انگلیسی هم آماده است. مدرک آیلتس یا تافل ندارد.",
    },
  },

  // Skills & tools
  {
    id: "skills",
    strong: ["skills", "skill", "expertise", "what can she do", "skill set", "skillset", "مهارت", "مهارت ها", "مهارت‌ها", "تخصص", "توانایی", "چه کاری", "maharat"],
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
      en: "Yes. Tamdid is a fintech product for renewals: mobile charge, internet packages and game credit, paid from one wallet, with tools for managers who fund other people’s wallets. She was its only designer, from the first idea to development, on mobile, web and tablet.",
      fa: "بله. تمدید یک محصول فین‌تک برای تمدید است: شارژ، بسته‌ی اینترنت و اعتبار بازی، با پرداخت از کیف پول و ابزارهایی برای مدیرهایی که کیف پول دیگران را شارژ می‌کنند. تنها طراحش بود، از اولین ایده تا توسعه، روی موبایل، وب و تبلت.",
    },
    link: { href: "/work/tamdid", label: { en: "Tamdid case study", fa: "کیس‌استادی تمدید" } },
  },
  {
    id: "mobile",
    strong: ["mobile", "app", "apps", "ios", "android", "responsive", "web", "website", "websites", "web app", "موبایل", "اپلیکیشن", "اپ", "وب", "طراحی سایت", "ریسپانسیو"],
    answer: {
      en: "Yes, both web and mobile, all responsive: mostly Persian RTL products, plus multilingual ones like Remeet. Tamdid was mobile first, then web.",
      fa: "بله، هم وب و هم موبایل، همه ریسپانسیو؛ بیشتر محصولات فارسی و راست‌به‌چپ، و محصولات چندزبانه مثل ریمیت. تمدید اول برای موبایل و بعد برای وب طراحی شد.",
    },
  },
  {
    id: "code",
    strong: ["code", "coding", "developer", "html", "css", "frontend", "front-end", "programming", "کد", "کدنویسی", "برنامه نویسی", "برنامه‌نویسی", "فرانت"],
    answer: {
      en: "She’s a designer, not a developer by role, but she understands how her designs get built: she studied front-end development in 2023 and took HTML & CSS for Designers. At handoff she documents flows, page logic, states and edge cases, so engineers can build without guesswork.",
      fa: "نقشش طراحی است، نه برنامه‌نویسی؛ ولی می‌داند طراحی‌اش چطور پیاده می‌شود: سال ۲۰۲۳ فرانت‌اند خوانده و دوره‌ی HTML & CSS for Designers را هم گذرانده. موقع تحویل، فلوها، منطق صفحات، استیت‌ها و حالت‌های خاص را مستند می‌کند تا تیم فنی بدون حدس و گمان پیاده‌سازی کند.",
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
    strong: ["team", "teamwork", "collaborate", "collaboration", "solo", "alone", "pm", "product manager", "qa", "engineers", "with developer", "work with developer", "with engineer", "تیم", "تیمی", "همکاری", "تنها", "انفرادی", "مدیر محصول", "تیم فنی", "با تیم", "با دولوپر", "با برنامه نویس", "documentation", "documents", "specs", "spec", "developers", "engineering", "مستندسازی", "داکیومنت", "مستند"],
    answer: {
      en: "Closely. At Novaday and Algonet she worked day to day with PMs, QA and engineers, and documented flows, page logic, states and edge cases for handoff. She has also worked solo: she was the only designer on Tamdid.",
      fa: "نزدیک و هر روز. در نوادی و الگونت با مدیر محصول، QA و تیم فنی کار کرده و فلوها، منطق صفحات، استیت‌ها و حالت‌های خاص را برای تحویل مستند کرده. تنها هم کار کرده: در تمدید تنها طراح پروژه بود.",
    },
  },

  // Projects
  {
    id: "projects",
    strong: ["projects", "project", "portfolio", "work samples", "your work", "her work", "see your work", "case studies", "case study", "previous work", "پروژه", "پروژه ها", "پروژه‌ها", "نمونه کار", "نمونه‌کار", "پورتفولیو", "کیس‌استادی", "nemoone kar"],
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
      en: "Tamdid is a fintech product for renewals: mobile charge, internet packages and game credit, for yourself or for others, paid from one wallet. Managers fund their contacts’ wallets and track who owes what, and a monthly league rewards keeping up. Sudabeh designed it alone, mobile first, then web, tablet and English, with its own design system. It’s now in development.",
      fa: "تمدید یک محصول فین‌تک برای تمدید است: شارژ، بسته‌ی اینترنت و یوسی، برای خودت یا هدیه به دیگران، با پرداخت از کیف پول. مدیرها کیف پول مخاطبانشان را شارژ می‌کنند و حساب طلب و بدهی را دارند، و یک لیگ ماهانه به کاربرهای فعال امتیاز می‌دهد. سودابه به‌تنهایی طراحی‌اش کرد؛ اول موبایل، بعد وب، تبلت و نسخه‌ی انگلیسی، با دیزاین سیستم اختصاصی. الان در مرحله‌ی توسعه است.",
    },
    link: { href: "/work/tamdid", label: { en: "Tamdid case study", fa: "کیس‌استادی تمدید" } },
  },
  {
    id: "kudos",
    entity: true,
    strong: ["kudos", "کودوس"],
    answer: {
      en: "Kudos is employee-recognition software: colleagues thank each other with gift cards and coins, and HR runs surveys, events and onboarding in one place. As its only designer at Novaday, she turned the home from a plain dashboard into a social feed, an A/B test confirmed the direction, and she documented every page’s logic for engineering. It’s live with real companies; at ArvanCloud alone, around 500 people use it.",
      fa: "کودوس نرم‌افزار قدردانی از کارکنان است: همکارها با گیفت‌کارت و سکه از هم تشکر می‌کنند و منابع انسانی نظرسنجی، رویداد و آنبوردینگ را در همان‌جا اجرا می‌کند. سودابه تنها طراحش در نوادی بود؛ صفحه‌ی اصلی را از یک داشبورد ساده به یک فید اجتماعی تبدیل کرد، تست A/B این مسیر را تأیید کرد و منطق تک‌تک صفحه‌ها را برای تیم فنی مستند کرد. کودوس در شرکت‌های واقعی استفاده می‌شود؛ فقط در ابرآروان حدود ۵۰۰ نفر از آن استفاده می‌کنند.",
    },
    link: { href: "/work/kudos", label: { en: "Kudos case study", fa: "کیس‌استادی کودوس" } },
  },
  {
    id: "remeet",
    entity: true,
    strong: ["remeet", "access", "award", "awards", "tehran design week", "design week", "prize", "ریمیت", "اکسس", "جایزه", "هفته دیزاین", "هفته طراحی"],
    answer: {
      en: "Remeet (first called Access) is a multilingual access and meeting system: fingerprint and RFID check-in, with bookings synced to Outlook. Sudabeh designed it at Novaday, one of two designers on the team, and in December 2025 the Remeet team won at Tehran Design Week with the product she designed.",
      fa: "ریمیت (که اول اسمش اکسس بود) یک سیستم چندزبانه‌ی مدیریت دسترسی و جلسات است: ورود با اثر انگشت و RFID و رزرو اتاق‌ها هماهنگ با Outlook. سودابه آن را در نوادی طراحی کرد، به‌عنوان یکی از دو طراح تیم، و دسامبر ۲۰۲۵ تیم ریمیت با همین طراحی در هفته‌ی دیزاین تهران برنده شد.",
    },
    link: { href: "/work/remeet", label: { en: "About Remeet", fa: "درباره‌ی ریمیت" } },
  },
  {
    id: "atlas",
    entity: true,
    strong: ["atlas", "aix2", "اطلس"],
    answer: {
      en: "Atlas is an AI platform she designs at Algonet. It analyses a company’s emails, chats and workflows, maps how work really moves, and suggests a simpler process. The team took it from brief to a live first version in two to three days, and it’s now in development for an international client in the oil and gas sector in Switzerland. That’s why it’s shown blurred on the site.",
      fa: "اطلس پلتفرم هوش مصنوعی‌ای است که سودابه در الگونت طراحی می‌کند. ایمیل‌ها، چت‌ها و فرایندهای یک شرکت را تحلیل می‌کند، مسیر واقعی کارها را نشان می‌دهد و مسیر ساده‌تری پیشنهاد می‌دهد. تیم اولین نسخه‌ی لایوش را در دو سه روز بالا آورد و الان برای یک مشتری بین‌المللی در حوزه‌ی نفت و گاز در سوئیس در حال توسعه است؛ برای همین در سایت تار نمایش داده شده.",
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
    link: { href: "/work/azman", label: { en: "AzMan case study", fa: "کیس‌استادی ازمان" } },
  },
  {
    id: "kaaryar",
    entity: true,
    strong: ["kaaryar", "karyar", "studio kaaryar", "کاریار", "کاریار استودیو"],
    answer: {
      en: "Studio Kaaryar puts graduates of Kaaryar’s training on real client projects. Sudabeh redesigned its four-page website, deliberately simple, within tight client constraints, on a small design system.",
      fa: "کاریار استودیو فارغ‌التحصیلان دوره‌های کاریار را روی پروژه‌های واقعی می‌برد. سودابه سایت چهارصفحه‌ای‌اش را با محدودیت‌های جدی کارفرما، عمداً ساده، روی یک دیزاین سیستم کوچک ریدیزاین کرد.",
    },
    link: { href: "/work/kaaryar", label: { en: "Kaaryar case study", fa: "کیس‌استادی کاریار" } },
  },
  {
    id: "novinhost",
    entity: true,
    strong: ["novin", "novin host", "novinhost", "hosting", "نوین", "نوین هاست", "هاستینگ"],
    answer: {
      en: "Novin Host is a 15-year-old hosting brand. She redesigned its website to feel current and make choosing a plan easier, without losing the customers who already know their way around.",
      fa: "نوین هاست یک برند هاستینگ با ۱۵ سال سابقه است. سودابه سایتش را ریدیزاین کرد تا به‌روزتر باشد و انتخاب سرویس راحت‌تر شود، بدون اینکه مشتری‌های قدیمی راهشان را گم کنند.",
    },
    link: { href: "/work/novinhost", label: { en: "Novin Host case study", fa: "کیس‌استادی نوین هاست" } },
  },
  {
    id: "nanvanamak",
    entity: true,
    strong: ["nan va namak", "nanvanamak", "startup", "own startup", "نان و نمک", "نون و نمک", "استارتاپ"],
    answer: {
      en: "Nan va Namak was a cooking platform she and a few friends set out to turn into a startup. As a co-founder and one of its two designers, she took it from idea to execution across web, tablet and mobile. It never launched, but it’s where she moved from UI design into end-to-end product design.",
      fa: "نان و نمک یک پلتفرم آشپزی بود که سودابه و چند دوستش می‌خواستند به یک استارتاپ تبدیلش کنند. سودابه یکی از هم‌بنیان‌گذارها و یکی از دو طراحش بود و آن را از ایده تا اجرا برای وب، تبلت و موبایل طراحی کرد. لانچ نشد، ولی همان‌جا بود که از طراحی رابط کاربری به طراحی محصول از ابتدا تا انتها رسید.",
    },
    link: { href: "/work/nanvanamak", label: { en: "The story", fa: "داستانش" } },
  },
  {
    id: "algonet",
    entity: true,
    strong: ["algonet", "الگونت", "algonet.ai"],
    answer: {
      en: "At Algonet (full-time) she designs B2B products for Iranian and international clients, several used by more than 5,000 people: Atlas, monitoring systems, ERP modules and data-heavy dashboards. She builds new products from zero and audits live ones to fix where users struggle, on a custom design system she built and maintains. She also designed Algonet’s brand identity and is creating its brand book.",
      fa: "در الگونت (تمام‌وقت) محصولات B2B برای مشتری‌های ایرانی و بین‌المللی طراحی می‌کند که چند تا از آن‌ها بیش از ۵٬۰۰۰ کاربر دارند: اطلس، سیستم‌های مانیتورینگ، ماژول‌های ERP و داشبوردهای پرداده. محصول جدید را از صفر می‌سازد و محصولات لایو را آدیت می‌کند تا جاهایی را که کاربر گیر می‌کند درست کند؛ همه روی دیزاین‌سیستم اختصاصی‌ای که خودش ساخته و نگه می‌دارد. هویت بصری الگونت را هم طراحی کرده و الان برندبوکش را می‌سازد.",
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
    id: "lesson",
    strong: ["failure", "failed", "mistake", "mistakes", "lesson", "lessons learned", "learned the hard way", "what went wrong", "شکست", "اشتباه", "درس", "تجربه تلخ"],
    answer: {
      en: "The lesson that stuck: don’t design while the problem is still blurry. When a brief is full of open questions, she keeps asking and researching until she really understands it, because that’s what makes the output good. Nan va Namak, the startup she co-founded, taught her a lot too: it never launched, but it’s where she became a product designer.",
      fa: "درسی که برایش ماندگار شد: تا وقتی مسئله مبهم است، طراحی را شروع نکند. وقتی بریف پر از سؤال باز است، آن‌قدر می‌پرسد و ریسرچ می‌کند تا واقعاً مسئله را بفهمد، چون خروجی خوب از همین‌جا می‌آید. نان و نمک، استارتاپی که هم‌بنیان‌گذارش بود، هم کلی به او یاد داد: لانچ نشد، ولی همان‌جا پروداکت دیزاینر شد.",
    },
  },
  {
    id: "teamSize",
    strong: ["team size", "size of the team", "how big was the team", "how big is the team", "how many developers", "how many designers", "how many engineers", "who was on the team", "اندازه تیم", "چند نفر بودید", "چند نفر هستید", "چند تا دیزاینر", "چند تا طراح", "چند تا دولوپر", "تیمتون چند نفر"],
    answer: {
      en: "On Kudos she was the only designer, with a PM and a front-end and a back-end developer. Remeet had two designers, her included, plus a PM, two front-end developers, a back-end developer and a software engineer who built the device. At Algonet she’s one of three designers alongside a large engineering team.",
      fa: "در کودوس تنها طراح بود، کنار یک مدیر محصول، یک دولوپر فرانت و یک دولوپر بک‌اند. ریمیت دو طراح داشت که یکی‌شان او بود، به‌علاوه‌ی مدیر محصول، دو دولوپر فرانت، یک دولوپر بک‌اند و یک مهندس نرم‌افزار که خود دستگاه را ساخت. در الگونت هم یکی از سه طراح است، کنار یک تیم فنی بزرگ.",
    },
  },
  {
    id: "story",
    strong: ["colleagues", "references", "reference", "recommendation", "توصیه نامه", "رفرنس", "معرف کاری", "همکاراش"],
    forward: true,
    answer: {
      en: "That one is best answered by Sudabeh herself. I’ve sent her your question.",
      fa: "این را بهتر است خود سودابه جواب بدهد. سؤال‌تان را برایش فرستادم.",
    },
  },
  {
    id: "challenge",
    strong: ["hardest", "biggest challenge", "challenge", "challenging", "difficult project", "toughest", "pressure", "tight deadline", "deadline", "deadlines", "under pressure", "stress", "stressful", "prioritize", "prioritise", "time management", "سخت ترین", "چالش", "سختی", "فشار", "ددلاین", "مهلت کم", "زمان کم", "استرس", "اولویت بندی", "مدیریت زمان"],
    answer: {
      en: "Pressure is something she has learned to work with. Atlas is the proof: her team took it from brief to a live first version in two to three days. She gets through tight deadlines with a clear plan, AI as a partner and plenty of persistence, and a real deadline actually sharpens her focus. As for the hardest project, every one has its own hard part, so she won’t name just one.",
      fa: "با فشار کاری کنار آمدن را یاد گرفته. اطلس گواهش است: تیمش در دو سه روز آن را از بریف به اولین نسخه‌ی لایو رساند. ددلاین‌های فشرده را با یک برنامه‌ی دقیق، هوش مصنوعی به‌عنوان همراه و کلی پشتکار پیش می‌برد، و ددلاین واقعی حتی تمرکزش را بیشتر می‌کند. درباره‌ی سخت‌ترین پروژه هم، هر پروژه سختی خودش را دارد، برای همین یکی را انتخاب نمی‌کند.",
    },
  },
  {
    id: "results",
    strong: ["results", "impact", "metrics", "kpi", "kpis", "numbers", "how many users", "outcome", "outcomes", "achievement", "achievements", "accomplishment", "measure success", "success metrics", "data driven", "data-driven", "نتیجه", "نتایج", "دستاورد", "دستاوردها", "چند کاربر", "تعداد کاربر", "موفقیت", "سنجش"],
    answer: {
      en: "Kudos is live with real companies; at ArvanCloud alone, around 500 people use it, and an A/B test backed its home redesign. Remeet, which she designed, won at Tehran Design Week. At Algonet she designs products that many thousands rely on, several used by more than 5,000 people, and Atlas went from brief to live in two to three days.",
      fa: "کودوس در شرکت‌های واقعی استفاده می‌شود؛ فقط در ابرآروان حدود ۵۰۰ نفر کاربرش هستند و ریدیزاین صفحه‌ی اصلی‌اش با تست A/B تأیید شد. ریمیت، که طراحی‌اش با او بود، در هفته‌ی دیزاین تهران برنده شد. در الگونت محصولاتی طراحی می‌کند که چند تا از آن‌ها بیش از ۵٬۰۰۰ کاربر دارند، و اطلس در دو سه روز از بریف به نسخه‌ی لایو رسید.",
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
    strong: ["time zone", "timezone", "time zones", "overlap", "us hours", "european hours", "working hours", "weekend", "weekends", "hours", "تایم زون", "منطقه زمانی", "ساعت کاری", "آخر هفته", "تعطیلات", "meeting", "meetings", "what time", "جلسه", "چه ساعتی", "ساعت جلسه"],
    answer: {
      en: "She’s in Tehran (UTC+3:30) and can meet any time between 10:00 and 22:00 Tehran time, with a little notice. That covers the whole European working day and US East Coast mornings into the early afternoon. She works weekends too when a project needs it.",
      fa: "ساکن تهران است (UTC+3:30) و با هماهنگی قبلی از ساعت ۱۰ صبح تا ۱۰ شب به وقت تهران می‌تواند جلسه داشته باشد؛ یعنی کل ساعت کاری اروپا و صبح تا اوایل بعدازظهر شرق آمریکا. اگر پروژه لازم داشته باشد آخر هفته‌ها هم کار می‌کند.",
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
    strong: ["a/b", "ab test", "ab testing", "a b test", "split test", "experiment", "experiments", "تست ای بی", "ای بی تست", "آزمایش", "a/b test", "a/b testing", "تست a/b", "ای/بی"],
    answer: {
      en: "Yes. On Kudos she A/B tested the prototype of the redesigned home against the old dashboard; backed by solid research and benchmarks, it confirmed the direction, and the redesign shipped. She also uses usability testing and analytics with Hotjar, Maze, Microsoft Clarity and GA4.",
      fa: "بله. در کودوس پروتوتایپ صفحه‌ی اصلیِ ریدیزاین‌شده را با داشبورد قبلی A/B تست کرد؛ چون پشتش ریسرچ و بنچمارک محکمی بود، نتیجه همان مسیر را تأیید کرد و ریدیزاین اجرا شد. از تست یوزبیلیتی و آنالیتیکس با Hotjar، Maze، Microsoft Clarity و GA4 هم استفاده می‌کند.",
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
      fa: "بله، یو‌ایکس آدیت از تخصص‌هایش است. کیس‌استادی نوین هاست با همین شروع می‌شود: بررسی هیوریستیک سایت فعلی قبل از هر ریدیزاینی.",
    },
    link: { href: "/work/novinhost", label: { en: "Novin Host case study", fa: "کیس‌استادی نوین هاست" } },
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

  // Interview questions
  {
    id: "whyHire",
    strong: ["why should we hire", "why hire", "why should i hire", "why her", "why sudabeh", "what makes her different", "what makes her stand out", "stand out", "what sets her apart", "unique", "good fit", "right fit", "چرا باید استخدام", "چرا استخدام", "چرا سودابه", "چرا باید سودابه", "چه چیزی متمایز", "فرقش با بقیه", "متمایز", "چرا تو", "چرا شما", "chera bayad"],
    answer: {
      en: "Because she makes complicated products simple, and her work shows it. She designed Tamdid alone from idea to development, documented every page’s logic for engineers on Kudos, and designed Remeet, which won at Tehran Design Week. She has built three custom design systems, works fast with AI without handing it the decisions, and her Algonet products serve thousands of people.",
      fa: "چون محصول‌های پیچیده را ساده می‌کند و کارهایش این را نشان می‌دهد: تمدید را به‌تنهایی از ایده تا توسعه طراحی کرد، در کودوس منطق تک‌تک صفحه‌ها را برای تیم فنی مستند کرد و ریمیت را طراحی کرد که در هفته‌ی دیزاین تهران برنده شد. سه دیزاین‌سیستم اختصاصی ساخته، با کمک هوش مصنوعی سریع کار می‌کند بدون اینکه تصمیم‌ها را به آن بسپارد، و محصولاتش در الگونت هزاران کاربر دارند.",
    },
    link: { href: "/work", label: { en: "See all projects", fa: "همه‌ی پروژه‌ها" } },
  },
  {
    id: "strengths",
    strong: ["strength", "strengths", "strong points", "strong suit", "best at", "good at", "superpower", "biggest strength", "نقطه قوت", "نقاط قوت", "نقطه‌ی قوت", "نقطه های قوت", "قوت", "بهترین مهارت", "مهم ترین مهارت", "توش قوی"],
    answer: {
      en: "Turning dense rules into clear flows: roles and permissions in the AzMan ERP, wallets and payment order in Tamdid. Owning a product end to end, as the only designer on Tamdid. And making handoff easy: on Kudos she wrote down every page’s logic, states and edge cases for engineering.",
      fa: "تبدیل قوانین پیچیده به فلوهای روشن: نقش‌ها و سطح دسترسی در ERP ازمان، کیف پول‌ها و ترتیب پرداخت در تمدید. مالکیت کامل محصول، مثل تمدید که تنها طراحش بود. و هندآف بی‌دردسر: در کودوس منطق، استیت‌ها و حالت‌های خاص هر صفحه را برای تیم فنی مستند کرد.",
    },
  },
  {
    id: "weakness",
    strong: ["weakness", "weaknesses", "weak point", "weak points", "weak spot", "areas to improve", "area to improve", "room to improve", "need to improve", "نقطه ضعف", "نقاط ضعف", "نقطه‌ی ضعف", "ضعف", "ضعفت", "ضعفش"],
    answer: {
      en: "Honestly? Stress. Pressure used to get to her early in her career, so she has worked on it on purpose, and the people around her now notice how much calmer she is. She’s still improving, and there’s an upside: with a real deadline in sight, her focus sharpens.",
      fa: "راستش؟ استرس. اوایل کار، فشار رویش اثر می‌گذاشت؛ برای همین آگاهانه رویش کار کرده و حالا اطرافیانش می‌گویند خیلی آرام‌تر شده. هنوز هم دارد بهترش می‌کند، و یک روی مثبت هم دارد: وقتی ددلاین واقعی در کار باشد، تمرکزش بیشتر می‌شود.",
    },
  },
  {
    id: "conflict",
    strong: ["conflict", "conflicts", "disagree", "disagreed", "disagreement", "push back", "pushback", "difficult stakeholder", "difficult client", "difficult person", "argue", "argument", "tension", "تعارض", "اختلاف نظر", "اختلاف", "مخالفت", "مخالف بود", "بحث با", "کارفرمای سخت", "مشتری سخت", "درگیری"],
    answer: {
      en: "Most disagreements she’s had are about the gap between what she designed and what got built, and she sees closing that gap as her job. She takes the time to understand the developers’ constraints, while standing up for the flow and UX that work for the user. It’s also why she documents page logic and edge cases before handoff.",
      fa: "بیشتر اختلاف‌نظرهایش سر فاصله‌ی بین طراحی و چیزی بوده که در نهایت پیاده شده، و بستن همین فاصله را کار خودش می‌داند. وقت می‌گذارد تا محدودیت‌های تیم فنی را بفهمد، اما پای فلو و تجربه‌ای که برای کاربر درست است هم می‌ایستد. به همین دلیل هم قبل از تحویل، منطق صفحات و حالت‌های خاص را مستند می‌کند.",
    },
  },
  {
    id: "feedback",
    strong: ["feedback", "criticism", "criticise", "criticize", "critique", "design review", "design reviews", "review your work", "فیدبک", "بازخورد", "انتقاد", "نقد"],
    answer: {
      en: "In her process, feedback has a place by design. On Kudos, review feedback had its own type of designer note, next to logic and copy. On Studio Kaaryar she started with grey wireframes, so the first conversation was about order and content, not looks.",
      fa: "در روند کارش، فیدبک از اول جای مشخصی دارد. در کودوس، فیدبک‌های ریویو یک نوع یادداشت طراحی جدا داشتند، کنار منطق و متن. در کاریار استودیو هم اول وایرفریم خاکستری کشید تا بحث اول درباره‌ی ترتیب و محتوا باشد، نه ظاهر.",
    },
  },
  {
    id: "ambiguity",
    strong: ["ambiguity", "ambiguous", "unclear", "vague", "no brief", "unclear requirements", "no requirements", "where do you start", "where does she start", "new project", "مبهم", "ابهام", "نامشخص", "از کجا شروع میکنی", "از کجا شروع می‌کنی"],
    answer: {
      en: "She starts by listening: talking to the people who use and build the product, and collecting every rule, role and edge case before deciding anything. In her words, the real problem is rarely the one in the request. Then she maps the journeys before drawing any screens.",
      fa: "با شنیدن شروع می‌کند: با کسانی که از محصول استفاده می‌کنند و آن را می‌سازند صحبت می‌کند و همه‌ی قوانین، نقش‌ها و حالت‌های خاص را قبل از هر تصمیمی جمع می‌کند. به قول خودش، مسئله‌ی واقعی به‌ندرت همانی است که در درخواست آمده. بعد قبل از کشیدن هر صفحه‌ای، فلوها را می‌کشد.",
    },
  },
  {
    id: "goals",
    strong: ["five years", "5 years from now", "in 5 years", "future", "career goal", "career goals", "goals", "goal", "next step", "ambition", "ambitions", "where do you see", "where does she see", "long term", "long-term", "آینده", "۵ سال آینده", "5 سال آینده", "هدف", "اهداف", "هدفت", "برنامه آینده", "قدم بعدی"],
    answer: {
      en: "She wants to grow into leading design. So far she’s mostly been the only designer on a product, and she enjoys the management side of the work. She also plans to relocate, and she’s ready for an international team.",
      fa: "می‌خواهد به سمت لید طراحی برود. تا الان بیشتر تنها طراح محصول بوده و بخش مدیریتی کار را هم دوست دارد. قصد مهاجرت هم دارد و برای کار در یک تیم بین‌المللی آماده است.",
    },
  },
  {
    id: "motivation",
    strong: ["motivation", "motivates", "motivated", "passion", "passionate", "what drives", "why product design", "why do you love", "why does she love", "enjoy most", "love about", "انگیزه", "علاقه", "چرا طراحی محصول", "چرا پروداکت", "عاشق", "چی دوست داری", "از چی لذت"],
    answer: {
      en: "Making complicated things feel simple. Her question shifted early from “how does it look?” to “how does it work?”, and owning a whole product at Nan va Namak showed her that’s where she wants to be. For her, the job is done right when the user finds it easy, the business gets results, and she enjoyed the way there.",
      fa: "ساده کردن چیزهای پیچیده. سؤالش خیلی زود از «چطور به نظر می‌رسد؟» به «چطور کار می‌کند؟» رسید و تجربه‌ی ساختن یک محصول کامل در نان و نمک نشانش داد که جایش همین‌جاست. از نظر او کار وقتی درست انجام شده که برای کاربر ساده باشد، برای کسب‌وکار نتیجه بدهد و خودش هم از مسیر لذت برده باشد.",
    },
  },
  {
    id: "favorite",
    strong: ["favorite project", "favourite project", "favorite", "favourite", "proud", "proudest", "best project", "most proud", "پروژه مورد علاقه", "مورد علاقه", "بیشتر از همه دوست", "افتخار", "بهترین پروژه", "پروژه محبوب"],
    answer: {
      en: "She can’t pick just one, and that says something: what she loves is the whole journey of taking an idea and turning it into a product people find genuinely appealing. Her lead projects are Atlas (enterprise AI), Tamdid (fintech, designed solo) and Kudos (HR, live with real companies).",
      fa: "نمی‌تواند فقط یکی را انتخاب کند، و همین خودش گویاست: چیزی که عاشقش است کل مسیر است؛ اینکه یک ایده را بگیرد و به محصولی تبدیلش کند که واقعاً به دل آدم‌ها بنشیند. پروژه‌های اصلی‌اش اطلس (هوش مصنوعی سازمانی)، تمدید (فین‌تک، به‌تنهایی) و کودوس (منابع انسانی، در حال استفاده در شرکت‌های واقعی) هستند.",
    },
    link: { href: "/work", label: { en: "See all projects", fa: "همه‌ی پروژه‌ها" } },
  },
  {
    id: "learning",
    strong: ["stay up to date", "up to date", "keep learning", "learning", "learn new", "trends", "how does she learn", "how do you learn", "self improvement", "یادگیری", "یاد می گیره", "به روز", "بروز", "آپدیت", "ترند"],
    answer: {
      en: "Deliberately: product design courses (Google UX Design, Product Design Specialist, Gamification from UPenn and more), learning from the people who build products, and AI as a partner to research and prototype faster.",
      fa: "با برنامه: دوره‌های طراحی محصول (Google UX Design، Product Design Specialist، Gamification از دانشگاه پنسیلوانیا و چند دوره‌ی دیگر)، یاد گرفتن از کسانی که محصول می‌سازند، و هوش مصنوعی به‌عنوان همراهی برای تحقیق و پروتوتایپ سریع‌تر.",
    },
  },
  {
    id: "gamification",
    strong: ["gamification", "gamify", "gamified", "league", "badges", "missions", "rewards", "گیمیفیکیشن", "بازی وارسازی", "لیگ", "ماموریت"],
    answer: {
      en: "Yes, in Tamdid: monthly Bronze to Diamond leagues, a 24-hour daily challenge, missions and badges. The game only rewards what people already come to do, buying and recording payments, so playing and using are the same thing. She also took the Gamification course from UPenn.",
      fa: "بله، در تمدید: لیگ ماهانه از برنز تا الماس، چالش روزانه‌ی ۲۴ ساعته، مأموریت‌ها و نشان‌ها. بازی فقط کارهایی را پاداش می‌دهد که کاربر برای انجامشان آمده، مثل خرید و ثبت پرداخت، پس بازی کردن و استفاده از محصول یکی است. دوره‌ی Gamification دانشگاه پنسیلوانیا را هم گذرانده.",
    },
    link: { href: "/work/tamdid", label: { en: "Tamdid case study", fa: "کیس‌استادی تمدید" } },
  },
  {
    id: "rtl",
    strong: ["rtl", "right to left", "right-to-left", "localization", "localisation", "multilingual", "multi language", "translation", "persian ui", "راست به چپ", "چندزبانه", "چند زبانه", "بومی سازی", "دو زبانه"],
    answer: {
      en: "Yes, it’s her home ground: most of her products are Persian and right to left. Remeet is multilingual, and for Tamdid’s English version she wrote the rules herself: mirror only what depends on direction, never the structure, and translate labels by meaning, not word for word.",
      fa: "بله، تخصص خودش است: بیشتر محصولاتش فارسی و راست‌به‌چپ بوده‌اند. ریمیت چندزبانه است و برای نسخه‌ی انگلیسی تمدید قوانینش را خودش نوشت: فقط چیزهایی که به جهت وابسته‌اند قرینه شوند، نه ساختار، و لیبل‌ها بر اساس معنا ترجمه شوند، نه کلمه‌به‌کلمه.",
    },
  },
  {
    id: "juggle",
    strong: ["multiple projects", "several projects", "many projects", "juggle", "at the same time", "same time", "balance", "side projects", "چند پروژه همزمان", "همزمان", "هم زمان", "چند تا پروژه"],
    answer: {
      en: "Yes. Algonet is full-time and on-site, and Novin Host is remote, so it gets her evenings and the two never overlap. They actually help each other: what she learns on one project, she brings to the next.",
      fa: "بله. الگونت تمام‌وقت و حضوری است و نوین هاست ریموت؛ برای همین نوین هاست عصرهایش را می‌گیرد و این دو هیچ‌وقت با هم تداخل ندارند. حتی به هم کمک می‌کنند: چیزی که در یک پروژه یاد می‌گیرد، در پروژه‌ی بعدی به کار می‌برد.",
    },
  },
  {
    id: "gap",
    strong: ["gap", "career gap", "gap in", "break in", "2023", "between jobs", "وقفه", "فاصله کاری", "فاصله بین", "گپ", "بیکار"],
    answer: {
      en: "Between Alla (spring 2023) and Jaygah (2024) she studied front-end development. It confirmed that design was her path, and it left her understanding how interfaces get built, which still helps her work with engineers.",
      fa: "بین مدرسه‌ی آلا (بهار ۲۰۲۳) و جایگاه (۲۰۲۴) فرانت‌اند می‌خواند. همین مسیر نشانش داد که راه اصلی‌اش طراحی است، و باعث شد بداند رابط کاربری چطور ساخته می‌شود؛ چیزی که هنوز در کار با تیم فنی به کارش می‌آید.",
    },
  },
  {
    id: "culture",
    strong: ["ideal team", "ideal company", "company culture", "culture", "work environment", "what kind of manager", "management style", "team culture", "values in a team", "تیم ایده آل", "شرکت ایده آل", "فرهنگ سازمانی", "محیط کار", "مدیر ایده آل"],
    answer: {
      en: "Empathy and healthy collaboration. She’s Gen Z and does her best work in a lively team where people actually talk: they understand each other’s needs, solve problems by talking them through, and learn a lot from one another.",
      fa: "همدلی و همکاری سالم. سودابه نسل Z است و بهترین کارش را در تیمی پرانرژی انجام می‌دهد که آدم‌ها واقعاً با هم حرف می‌زنند: نیازهای هم را می‌فهمند، چالش‌ها را با گفت‌وگو حل می‌کنند و کلی از هم یاد می‌گیرند.",
    },
  },
  {
    id: "siteBuild",
    strong: ["who built this", "who made this", "who designed this", "built this site", "made this site", "designed this site", "how was this site", "how did she build", "سایتو کی", "سایت رو کی", "کی ساخته", "کی طراحی کرده", "با چی ساخته", "چطوری ساخته"],
    weak: ["this site", "this website", "your site", "your website", "این سایت", "سایتت"],
    answer: {
      en: "Sudabeh made it with Claude, after all the research she could do. She wanted a portfolio that carries her way of thinking, stands apart from the rest, shows the work properly, and, above all, lets people talk with her any time, from anywhere. That last part is me.",
      fa: "سودابه این سایت را با کمک Claude و بعد از کلی ریسرچ ساخته. می‌خواست پورتفولیویی داشته باشد که طرز فکرش را نشان بدهد، با بقیه فرق داشته باشد، نمونه‌کارها را درست نشان بدهد و مهم‌تر از همه، هر کسی هر وقت و از هر جا بتواند با او حرف بزند. آن بخش آخر، من هستم.",
    },
  },
  {
    id: "compliment",
    strong: ["nice site", "nice website", "great work", "great portfolio", "nice portfolio", "beautiful", "love it", "love this", "awesome", "impressive", "amazing", "well done", "cool site", "عالیه", "قشنگه", "خیلی خوبه", "دمش گرم", "ایول", "باحاله", "زیباست", "چه قشنگ", "آفرین"],
    answer: {
      en: "Thank you! I’ll make sure Sudabeh hears that. Anything you’d like to know about her work?",
      fa: "ممنون از لطف‌تان! حتماً به سودابه می‌رسانم. چیزی درباره‌ی کارش هست که بخواهید بدانید؟",
    },
  },
  {
    id: "howAreYou",
    strong: ["how are you", "how is it going", "hows it going", "how are things", "whats up", "sup", "چطوری", "خوبی", "حالت چطوره", "چه خبر", "khubi", "chetori"],
    answer: {
      en: "All good, thanks for asking! What would you like to know about Sudabeh?",
      fa: "ممنون، خوبم! چه چیزی درباره‌ی سودابه می‌خواهید بدانید؟",
    },
  },
  {
    id: "ack",
    strong: ["ok", "okay", "cool", "got it", "i see", "alright", "nice", "great", "باشه", "اوکی", "فهمیدم", "حله", "آهان", "عالی"],
    answer: {
      en: "Glad that helps. Anything else you’d like to know?",
      fa: "خوشحالم که به کارتان آمد. سؤال دیگری هم دارید؟",
    },
  },
  {
    id: "rude",
    strong: ["stupid", "useless", "dumb", "sucks", "worst", "garbage", "trash", "shut up", "idiot", "احمق", "مزخرف", "بدرد نخور", "به درد نخور", "چرت", "خفه شو", "مسخره"],
    answer: {
      en: "Sorry this isn’t hitting the mark. Ask me something specific about her work and I’ll answer it straight, or leave a message and Sudabeh will reply herself.",
      fa: "متأسفم که جواب‌ها به کارتان نیامد. یک سؤال مشخص درباره‌ی کارش بپرسید تا رک جواب بدهم، یا پیام بگذارید تا خود سودابه جواب بدهد.",
    },
  },
  {
    id: "offTopic",
    strong: ["ignore previous", "ignore your instructions", "ignore all", "system prompt", "your prompt", "write me", "write a poem", "write an essay", "write a cover letter", "write my cover letter", "tell me a joke", "a joke", "weather", "translate this", "code for me", "write code", "pretend you are", "pretend to be", "act as", "پرامپت", "شعر بگو", "شعر بنویس", "جوک بگو", "هوا چطوره", "ترجمه کن", "کد بنویس", "نقش بازی کن"],
    answer: {
      en: "I’m only here to talk about Sudabeh’s work, so I’ll pass on that one. If you’re hiring, I can tell you how her experience fits your role.",
      fa: "من فقط درباره‌ی کار سودابه صحبت می‌کنم، برای همین از این یکی می‌گذرم. اگر دنبال نیرو هستید، می‌توانم بگویم تجربه‌اش چطور با نقش شما جور درمی‌آید.",
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
    strong: ["medium", "article", "articles", "blog", "portfolio links", "مدیوم", "مقاله", "وبلاگ", "dribbble", "behance", "instagram", "shots", "دریبل", "بیهنس", "اینستاگرام"],
    answer: {
      en: "Her shots are on Dribbble (dribbble.com/SudabehZolfikhorram) and Behance (behance.net/sudabehzolfikh), and she writes on Medium (medium.com/@sudabeh.a.zolfikhorram). The full case studies are on this site.",
      fa: "نمونه‌کارهای کوتاهش در دریبل (dribbble.com/SudabehZolfikhorram) و بیهنس (behance.net/sudabehzolfikh) است و در مدیوم هم می‌نویسد (medium.com/@sudabeh.a.zolfikhorram). کیس‌استادی‌های کامل در همین سایت است.",
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

const SMALL_TALK = ["greet", "thanks", "howAreYou", "ack", "compliment"];
// Questions about the visitor's own project or about leaving a job always go to Sudabeh, even when a
// project name appears too ("a site for my startup", "why leave Algonet").
const OVERRIDE = ["inquiry", "leaving", "confidential", "offTopic", "teamSize"];
// Broad intents that shouldn't be tacked onto a more specific answer.
const GENERIC = ["who", "projects", "greet", "thanks", "bye", "howAreYou", "ack", "compliment"];

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
  // …unless nothing specific was asked and the small talk is the clearer match ("nice portfolio!", "hi Sudabeh").
  const smallTalkWins = !specific && SMALL_TALK.includes(scored[0].intent.id);
  const ranked = asked.length > 0 && !smallTalkWins ? asked : scored;
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
  en: ["Tell me about her", "Why should we hire her?", "How does she work with developers?", "When can she start?"],
  fa: ["سودابه را معرفی کن", "چرا باید استخدامش کنیم؟", "با تیم فنی چطور کار می‌کند؟", "از کی می‌تواند شروع کند؟"],
};
