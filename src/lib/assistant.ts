// The "Ask about me" assistant: answers questions about Sudabeh in Persian or English, in her own
// voice (first person), only from facts in her CV, on this site and in answers she wrote herself.
// It matches the visitor's tone, formal or casual. Anything it can't answer for sure goes to
// Sudabeh herself, so it never guesses.

import { examples } from "./assistant-examples.ts";

export type Lang = "fa" | "en";

export type Intent = {
  id: string;
  /** A named project or company: its name beats generic phrasing like "tell me about". */
  entity?: boolean;
  /** Words and phrases that point to this intent, in English, Persian and Finglish. Strong ones count double. */
  strong: string[];
  weak?: string[];
  /** Written as Sudabeh, in a professional register that suits formal and neutral visitors. */
  answer: Record<Lang, string>;
  /** For visitors who write casually: addresses them as «تو», a little warmer, still professional. */
  casual?: Partial<Record<Lang, string>>;
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
    casual: { en: "Hey, great to have you here! Ask me anything about my work, my projects or how I like to work.", fa: "سلام، خوش آمدی! هر سؤالی درباره‌ی کارم، پروژه‌هایم یا روش کارم داری، بپرس." },
    answer: {
      en: "Hi, great to have you here! Ask me anything about my work, my projects or how I like to work.",
      fa: "سلام، خوشحالم که اینجا هستید! هر سؤالی درباره‌ی کارم، پروژه‌هایم یا روش کارم دارید، بپرسید.",
    },
  },
  {
    id: "thanks",
    strong: ["thanks", "thank you", "thx", "merci", "mersi", "مرسی", "ممنون", "ممنونم", "سپاس", "متشکرم", "mamnoon"],
    casual: { fa: "خواهش می‌کنم! سؤال دیگری هم داری؟" },
    answer: {
      en: "My pleasure! Anything else you’d like to know?",
      fa: "خواهش می‌کنم! اگر سؤال دیگری دارید، در خدمتم.",
    },
  },
  {
    id: "bye",
    strong: ["bye", "goodbye", "see you", "khodahafez", "خداحافظ", "بای", "فعلا"],
    casual: { en: "Thanks for stopping by, great chatting with you. Talk soon!", fa: "ممنون که سر زدی؛ از گپ‌مان خوشحال شدم. امیدوارم به‌زودی دوباره حرف بزنیم!" },
    answer: {
      en: "Thanks for stopping by, it was great talking with you. I hope we’ll talk again soon!",
      fa: "ممنون که وقت گذاشتید؛ از گفت‌وگو با شما خوشحال شدم. امیدوارم به‌زودی دوباره صحبت کنیم!",
    },
  },
  {
    id: "bot",
    strong: ["are you a bot", "are you human", "are you sudabeh", "ربات", "بات", "خودت سودابه", "خود سودابه", "سودابه هستی", "آدم واقعی", "هوش مصنوعی هستی", "are you a real person", "real person", "are you a robot", "is this a bot", "is this a chatbot", "chatbot"],
    casual: { fa: "با دستیار من حرف می‌زنی، نه با خودم به‌صورت زنده. دستیارم با حرف‌های خودم جواب می‌دهد، از روی رزومه و جواب‌هایی که خودم نوشته‌ام، و هر سؤالی را که جوابش را نداشته باشد، مستقیم برای خودم می‌فرستد." },
    answer: {
      en: "You’re chatting with my assistant, not with me live. It answers in my words, from my CV and answers I’ve written myself, and anything it can’t answer comes straight to me.",
      fa: "شما با دستیار من صحبت می‌کنید، نه با خودم به‌صورت زنده. دستیارم با حرف‌های خودم جواب می‌دهد، از روی رزومه و جواب‌هایی که خودم نوشته‌ام، و هر سؤالی را که جوابش را نداشته باشد، مستقیم برای خودم می‌فرستد.",
    },
  },

  // About her
  {
    id: "who",
    strong: ["who is", "who are", "about her", "about you", "about yourself", "tell me about yourself", "tell me about her", "walk me through", "your background", "her background", "introduce", "tell me about", "summary", "what does she do", "what do you do", "what she does", "is she a designer", "are you a designer", "kind of designer", "type of designer", "سودابه کیه", "کی هستی", "معرفی", "درباره", "خلاصه", "معرفی کن", "چیکار میکنی", "چیکار می کنی", "چکار میکنی", "چه کاره", "چکاره", "کارت چیه", "کارش چیه", "طراحی چی", "از خودت بگو", "خودتو معرفی کن", "خودت رو معرفی کن", "از سودابه بگو", "معرفی کوتاه", "about sudabeh", "a bit about", "in a nutshell", "quick intro", "intro", "elevator pitch"],
    weak: ["sudabeh", "سودابه"],
    link: { href: "/work", label: { en: "See all projects", fa: "همه‌ی پروژه‌ها" } },
    answer: {
      en: "I’m Sudabeh Zolfi Khorram, a product designer with 5+ years of experience. I make complex products feel simple, from fintech and HR tools to ERP and enterprise AI, and right now I design B2B products at Algonet.",
      fa: "سودابه زلفی‌خرم هستم، پروداکت دیزاینر با بیش از ۵ سال سابقه. کارم ساده کردن محصولات پیچیده است، از فین‌تک و ابزارهای منابع انسانی تا ERP و هوش مصنوعی سازمانی، و الان در الگونت محصولات B2B طراحی می‌کنم.",
    },
  },
  {
    id: "role",
    strong: ["current job", "currently", "where do you work", "where does she work", "what company", "which company", "current role", "right now", "nowadays", "الان کجا", "فعلا کجا", "کجا کار", "شغل فعلی", "latest project", "last project", "recent project", "current project", "last company", "latest company", "current company", "current employer", "آخرین پروژه", "آخرین شرکت", "پروژه فعلی", "شرکت فعلی", "پروژه الان", "الان چیکار", "الان چیکار میکنی", "مشغول", "مشغول چه", "working on", "work on now", "what does she work on", "what do you work on", "busy with", "these days", "این روزها", "این روزا", "روی چی کار", "کدوم شرکت", "کدوم شرکتی", "چه شرکتی کار", "which company is she at", "where is she working"],
    weak: ["algonet", "الگونت", "job", "شغل"],
    answer: {
      en: "I’m a full-time product designer at Algonet. My main project there is Atlas, an AI platform that shows how a company really works and suggests simpler ways to run it.",
      fa: "پروداکت دیزاینر تمام‌وقت الگونت هستم. پروژه‌ی اصلی‌ام آنجا اطلس است؛ پلتفرمی مبتنی بر هوش مصنوعی که نشان می‌دهد کارها در یک شرکت واقعاً چطور پیش می‌رود و مسیر ساده‌تری پیشنهاد می‌دهد.",
    },
  },
  {
    id: "experience",
    strong: ["years of experience", "how many years", "how long", "how much experience", "your experience", "work experience", "experienced", "senior", "junior", "سابقه", "چند سال", "تجربه کاری", "سابقه کار", "sabeghe", "chand sal", "tajrobe", "years in the field", "in the field", "چند وقته", "چند ساله", "chand sale", "chand vaghte", "how long in design"],
    weak: ["experience", "تجربه"],
    answer: {
      en: "More than 5 years in product and UI/UX design, across 10 teams and products, from fintech to ERP and enterprise AI.",
      fa: "بیش از ۵ سال در پروداکت و UI/UX دیزاین، در ۱۰ تیم و محصول؛ از فین‌تک تا ERP و هوش مصنوعی سازمانی.",
    },
  },
  {
    id: "location",
    strong: ["where are you", "where is she", "where do you live", "where does she live", "where she lives", "live in", "based", "location", "city", "country", "iran", "tehran", "کجا هستی", "کجایی", "کجا زندگی", "شهر", "تهران", "ایران", "kojaei"],
    answer: {
      en: "I’m based in Tehran, Iran (UTC+3:30), and open to remote work.",
      fa: "ساکن تهرانم (UTC+3:30) و برای همکاری ریموت آماده‌ام.",
    },
  },
  {
    id: "remote",
    strong: ["remote", "work from home", "wfh", "hybrid", "ریموت", "دورکاری", "دور کاری", "هیبرید", "از راه دور"],
    answer: {
      en: "Yes, remote is exactly what I’m looking for, and I’ve delivered remote projects before, like Tamdid and Kaaryar Studio.",
      fa: "بله، دقیقاً دنبال همکاری ریموت هستم و تجربه‌اش را هم دارم؛ مثل پروژه‌های تمدید و کاریار استودیو.",
    },
  },
  {
    id: "availability",
    strong: ["what kind of role", "type of role", "kind of job", "kind of work", "what kind of company", "type of company", "kind of company", "company size", "notice period", "start right away", "start immediately", "چه نوع همکاری", "نوع همکاری", "چه شرکتی", "نوع شرکت", "چه نوع شرکت", "کی میتونه شروع", "کی می‌تونه شروع", "کی شروع", "شروع کنه", "زمان شروع", "available", "availability", "open to work", "hiring", "looking for a job", "open to new", "job offer", "can we hire", "hire her", "hire you", "start date", "can you start", "can she start", "notice period", "when can", "آزاد", "در دسترس", "دنبال کار", "استخدام", "شروع همکاری", "کی میتونی", "از کی", "پیشنهاد کاری", "کار جدید", "آماده کار", "آماده‌ی کار", "آماده همکاری", "آماده‌ی همکاری", "موقعیت شغلی", "فرصت شغلی", "جویای کار", "new role", "new job", "looking for work", "estekhdam", "how soon", "when can she join", "when can you join", "join us", "join the team", "تا شروع کنی", "شروع کنی", "چقدر زمان لازم", "کی میای", "کی میتونی بیای", "begin", "next week", "start next", "start soon", "آزاد میشی"],
    answer: {
      en: "For a full-time role, I can start after one month’s notice to my current employer; for project-based work, I’m available right away.",
      fa: "برای نقش تمام‌وقت، بعد از یک ماه فرصت برای اطلاع به شرکت فعلی‌ام می‌توانم شروع کنم؛ برای کار پروژه‌ای همین حالا آماده‌ام.",
    },
  },
  {
    id: "onsite",
    strong: ["on-site", "on site", "onsite", "in office", "in the office", "office", "office based", "come to the office", "حضوری", "از دفتر", "دفتر کار"],
    answer: {
      en: "I’m not looking for on-site work, but remote full-time, part-time or project-based all work for me.",
      fa: "دنبال کار حضوری نیستم؛ ولی ریموت، تمام‌وقت، پاره‌وقت یا پروژه‌ای، همه برایم مناسب است.",
    },
  },
  {
    id: "freelance",
    strong: ["freelance", "freelancer", "project based", "project-based", "contract", "part time", "part-time", "full time", "full-time", "فریلنس", "پروژه ای", "پروژه‌ای", "پاره وقت", "پاره‌وقت", "تمام وقت", "تمام‌وقت", "قرارداد"],
    answer: {
      en: "Yes. Project-based and part-time work both suit me, as long as it’s remote; I’ve done project work before, like Tamdid and Kaaryar Studio.",
      fa: "بله. کار پروژه‌ای و پاره‌وقت هر دو برایم مناسب است، به شرط ریموت بودن؛ قبلاً هم پروژه‌ای کار کرده‌ام، مثل تمدید و کاریار استودیو.",
    },
  },
  {
    id: "salary",
    strong: ["salary", "salary expectation", "expected pay", "compensation", "hourly rate", "day rate", "your rate", "her rate", "her rates", "your rates", "rate card", "price", "how much does she cost", "how much do you charge", "how much does she charge", "hourly", "حقوق چند", "چند حقوق", "حقوق میخوای", "حقوق میخواد", "حقوق مدنظر", "حقوق مد نظر", "حقوق دریافتی", "دریافتی", "میزان دستمزد", "ساعتی", "ریت ساعتی", "budget", "expected salary", "حقوق درخواستی", "حقوق چقدر", "چقدر حقوق", "حقوقت", "حقوق ماهانه", "حقوق انتظاری", "انتظار حقوق", "میزان حقوق", "دستمزد", "قیمت", "هزینه", "ریت", "بودجه", "hoghoogh"],
    casual: { fa: "این را ترجیح می‌دهم وقتی با هم در ارتباطیم، مستقیم صحبت کنیم. به اسکیل پروژه و مدت زمانش بستگی دارد و بعد از صحبت بیشتر، در یک جلسه مشخص می‌شود. می‌توانی ایمیل یا یک راه ارتباطی بفرستی تا با تو در ارتباط باشم؟" },
    answer: {
      en: "That’s something I’d rather discuss with you directly. It depends on the project’s scale and duration, and we can settle it in a meeting once we’ve talked it through. Could you send me your email or another way to reach you, so I can get in touch?",
      fa: "این را ترجیح می‌دهم وقتی با هم در ارتباطیم، مستقیم صحبت کنیم. به اسکیل پروژه و مدت زمان آن بستگی دارد و بعد از صحبت بیشتر، در یک جلسه مشخص می‌شود. می‌توانید ایمیل یا یک راه ارتباطی بفرستید تا با شما در ارتباط باشم؟",
    },
    forward: true,
  },
  {
    id: "relocation",
    strong: ["relocate", "relocation", "move abroad", "visa", "work permit", "move to", "مهاجرت", "ریلوکیشن", "جابجایی", "ویزا", "اقامت", "sponsorship", "visa sponsorship", "sponsor", "which country", "which countries", "اسپانسر", "اسپانسرشیپ", "کدوم کشور", "چه کشوری", "abroad", "germany", "canada", "europe", "netherlands", "uk", "usa", "dubai", "آلمان", "کانادا", "اروپا", "هلند", "انگلیس", "آمریکا", "دبی", "خارج از ایران", "بیای خارج"],
    answer: {
      en: "Yes. I’m planning to relocate and I’m open to any country; I’d need visa sponsorship.",
      fa: "بله. برنامه‌ی مهاجرت دارم و برای هر کشوری آماده‌ام؛ فقط به اسپانسرشیپ ویزا نیاز دارم.",
    },
  },
  {
    id: "hobbies",
    strong: ["hobby", "hobbies", "free time", "spare time", "outside work", "outside of work", "for fun", "weekend plans", "سرگرمی", "اوقات فراغت", "وقت آزاد", "بیرون از کار", "تفریح", "besides design", "outside design", "apart from design", "apart from work", "جدا از کار", "غیر از طراحی", "غیر از کار"],
    answer: {
      en: "Outside work, I love films, exploring nature and spending time with friends.",
      fa: "بیرون از کار، عاشق فیلم دیدن، طبیعت‌گردی و وقت گذراندن با دوستانم هستم.",
    },
  },
  {
    id: "personal",
    strong: ["how old", "age", "married", "religion", "birthday", "born", "سن", "چند سالته", "چند سالشه", "متاهل", "مجرد", "تولد", "مذهب"],
    casual: { fa: "ترجیح می‌دهم این گفت‌وگو درباره‌ی کارم باشد، برای همین از این سؤال می‌گذرم. اگر بخواهی، از پروژه‌ها یا روش کارم برایت می‌گویم." },
    answer: {
      en: "I’d rather keep this chat about my work, so I’ll skip that one. I’m happy to tell you about my projects, skills or how I work.",
      fa: "ترجیح می‌دهم این گفت‌وگو درباره‌ی کارم باشد، برای همین از این سؤال می‌گذرم. خوشحال می‌شوم درباره‌ی پروژه‌ها، مهارت‌ها یا روش کارم بگویم.",
    },
  },

  // Education & languages
  {
    id: "education",
    strong: ["education", "degree", "university", "bachelor", "study", "studied", "major", "college", "law", "تحصیلات", "مدرک", "دانشگاه", "لیسانس", "کارشناسی", "رشته", "حقوق خوندی", "رشته حقوق", "حقوق خونده", "تحصیل", "چی خوندی", "چی خونده", "چی خوندید", "درس خوندی", "tahsilat", "reshte"],
    weak: ["حقوق"],
    answer: {
      en: "I’m a Law graduate.",
      fa: "فارغ‌التحصیل رشته‌ی حقوق هستم.",
    },
  },
  {
    id: "lawToDesign",
    strong: ["why design", "why law", "از حقوق", "حقوق به", "حقوق اومد", "سمت دیزاین", "سمت طراحی", "پیشینه", "پیش زمینه", "law to design", "from law", "switch", "career change", "how did you start", "how did she start", "become a designer", "got into design", "چرا دیزاین", "چرا حقوق", "تغییر مسیر", "چطور دیزاینر", "چجوری دیزاینر", "چطوری دیزاینر", "دیزاینر شد", "از کجا شروع", "چجوری شروع", "law background", "legal background", "چرا حقوق خوندی", "چرا حقوق خواندی", "چرا رشته حقوق", "چرا رفتی حقوق", "why did you study law", "why did she study law", "why study law", "chera hoghoogh"],
    answer: {
      en: "Law was what interested me at the time, and technology wasn’t yet a world I knew. When I started my first job, I realised I could become a designer too, so I followed that path and have worked every day since to grow. I still love law, though: it’s made me more aware of my rights and broadened my perspective.",
      fa: "آن زمان علاقه‌ام حقوق بود و هنوز با دنیای تکنولوژی آن‌قدر آشنا نبودم. وقتی اولین کارم را شروع کردم، متوجه شدم می‌توانم طراح هم بشوم؛ همین مسیر را ادامه دادم و از آن روز سعی کرده‌ام هر روز پیشرفت کنم و ایده‌های خلاقانه‌تری داشته باشم. ولی حقوق را هنوز هم دوست دارم: به حق‌وحقوقم آگاه‌ترم و دیدم گسترده‌تر شده.",
    },
  },
  {
    id: "courses",
    strong: ["course", "courses", "certificate", "certification", "training", "bootcamp", "google ux", "دوره", "دوره ها", "دوره‌ها", "مدرک بین المللی", "گواهی", "آموزش", "doreh"],
    answer: {
      en: "The courses I’ve completed: Product Design Specialist (Amanj), Google UX Design (Coursera), Gamification (University of Pennsylvania, Coursera), UI Design Specialist (7Learn) and HTML & CSS for Designers (Amanj).",
      fa: "دوره‌هایی که گذرانده‌ام: Product Design Specialist (آمانج)، Google UX Design (کورسرا)، Gamification (دانشگاه پنسیلوانیا، کورسرا)، UI Design Specialist (سون‌لرن) و HTML & CSS for Designers (آمانج).",
    },
  },
  {
    id: "languages",
    strong: ["english", "language", "languages", "speak", "persian", "farsi", "ielts", "toefl", "آیلتس", "تافل", "انگلیسی", "زبان", "فارسی", "مکالمه", "زبانت", "zaban", "english interview", "interview in english", "مصاحبه انگلیسی", "مصاحبه به انگلیسی", "in english", "present in english", "german", "french", "arabic", "turkish", "spanish", "russian", "آلمانی", "فرانسوی", "عربی", "ترکی", "اسپانیایی", "زبان خارجی"],
    answer: {
      en: "Persian is my native language, and I work and communicate in English at a working level, so I’m comfortable interviewing in English. I don’t hold an IELTS or TOEFL certificate.",
      fa: "فارسی زبان مادری‌ام است و به انگلیسی در سطح کاری کار و ارتباط برقرار می‌کنم؛ برای مصاحبه به انگلیسی هم آماده‌ام. مدرک آیلتس یا تافل ندارم.",
    },
  },

  // Skills & tools
  {
    id: "skills",
    strong: ["skills", "skill", "expertise", "what can she do", "skill set", "skillset", "مهارت", "مهارت ها", "مهارت‌ها", "تخصص", "توانایی", "چه کاری", "maharat"],
    answer: {
      en: "My core skills: product strategy, UX research and testing, user flows, information architecture, dashboard UX, responsive web and mobile, design systems, interaction design, wireframing and prototyping, visual design and AI-assisted design.",
      fa: "مهارت‌های اصلی‌ام: استراتژی محصول، تحقیق و تست UX، یوزر فلو، معماری اطلاعات، طراحی داشبورد، وب و موبایل ریسپانسیو، دیزاین‌سیستم، طراحی تعامل، وایرفریم و پروتوتایپ، طراحی بصری و طراحی با کمک هوش مصنوعی.",
    },
  },
  {
    id: "tools",
    strong: ["tools", "tool", "software", "figma", "framer", "sketch", "adobe xd", "webflow", "maze", "hotjar", "اسکچ", "وب فلو", "هات جار", "figjam", "illustrator", "notion", "clickup", "analytics", "clarity", "ga4", "ابزار", "ابزارها", "نرم افزار", "نرم‌افزار", "فیگما", "فریمر", "abzar", "design with", "apps do you use", "programs do you use", "softwares", "what apps"],
    answer: {
      en: "Figma and FigJam every day, plus Framer, Notion, Adobe Illustrator, ClickUp and Slack. For analytics I use Microsoft Clarity and GA4, and for testing I’ve used Maze and Hotjar. On the AI side: ChatGPT, Claude, Google AI Studio, Lovable and NotebookLM. I don’t use Sketch or Webflow.",
      fa: "هر روز با Figma و FigJam کار می‌کنم؛ به‌علاوه‌ی Framer، Notion، Adobe Illustrator، ClickUp و Slack. برای آنالیتیکس از Microsoft Clarity و GA4 استفاده می‌کنم و برای تست با Maze و Hotjar کار کرده‌ام. در هوش مصنوعی هم ChatGPT، Claude، Google AI Studio، Lovable و NotebookLM. با Sketch و Webflow کار نمی‌کنم.",
    },
  },
  {
    id: "ai",
    strong: ["ai", "artificial intelligence", "chatgpt", "claude", "gpt", "lovable", "notebooklm", "ai studio", "هوش مصنوعی", "ای آی", "چت جی پی تی", "hoosh", "ai tools", "ai tool", "using ai", "use ai"],
    answer: {
      en: "AI is my thinking partner, not my designer: I use it to research faster, compare directions, draft UX copy and prototype, but the decisions stay mine.",
      fa: "هوش مصنوعی هم‌فکر من است، نه جای من: از آن برای تحقیق سریع‌تر، مقایسه‌ی ایده‌ها، نوشتن UX copy و پروتوتایپ استفاده می‌کنم، ولی تصمیم‌ها با خودم است.",
    },
  },
  {
    id: "designSystem",
    strong: ["design system", "design systems", "ui kit", "tokens", "variables", "components", "component library", "دیزاین سیستم", "دیزاین‌سیستم", "یو آی کیت", "کامپوننت", "توکن", "وریبل", "متغیر"],
    answer: {
      en: "Yes. I’ve built custom design systems for Algonet, Tamdid and Kaaryar Studio, with tokens, components and states, and I worked on a Tailwind-based system, UI kit and variables at Novaday for Kudos and Remeet.",
      fa: "بله. برای الگونت، تمدید و کاریار استودیو دیزاین‌سیستم اختصاصی ساخته‌ام، با توکن‌ها، کامپوننت‌ها و استیت‌ها، و در نوادی هم روی دیزاین‌سیستم مبتنی بر Tailwind، UI kit و variableهای کودوس و ریمیت کار کرده‌ام.",
    },
  },
  {
    id: "research",
    strong: ["research", "user research", "usability", "user testing", "interview", "benchmark", "competitor", "competitive analysis", "feature list", "تحقیق", "ریسرچ", "یوزبیلیتی", "تست کاربر", "مصاحبه", "بنچمارک", "تحلیل رقبا", "رقبا", "فیچر لیست"],
    answer: {
      en: "Yes. I run benchmarks, competitor analysis, feature lists and usability tests, and on Kudos I A/B tested the redesign before it shipped. Research is how I make sure a design decision isn’t just a guess.",
      fa: "بله. بنچمارک، تحلیل رقبا، فیچر لیست و تست یوزبیلیتی انجام می‌دهم و در کودوس هم ریدیزاین را قبل از اجرا A/B تست کردم. ریسرچ راه من است برای اینکه تصمیم طراحی حدس و گمان نباشد.",
    },
  },
  {
    id: "dashboard",
    strong: ["dashboard", "dashboards", "b2b", "saas", "admin panel", "internal tool", "erp", "enterprise", "complex", "داشبورد", "پنل ادمین", "پنل", "سازمانی", "پیچیده", "ای آر پی", "ساس"],
    answer: {
      en: "Yes, plenty. At Algonet I design data-heavy dashboards, monitoring tools and ERP modules; for AzMan, its ERP and the field tool Hamgam Saz; and at Novaday, Kudos’s HR admin and dashboard.",
      fa: "بله، زیاد. در الگونت داشبوردهای پرداده، ابزارهای مانیتورینگ و ماژول‌های ERP طراحی می‌کنم؛ برای ازمان، ERP و ابزار کارشناسانش همگام‌ساز را؛ و در نوادی، پنل ادمین و داشبورد منابع انسانی کودوس را.",
    },
  },
  {
    id: "fintech",
    strong: ["fintech", "finance", "payment", "payments", "wallet", "bank", "banking", "فین تک", "فین‌تک", "مالی", "پرداخت", "کیف پول", "بانک"],
    answer: {
      en: "Yes. I designed Tamdid, a fintech product for renewals: mobile charge, internet packages and game credit, paid from one wallet, with tools for managers who fund other people’s wallets. I was its only designer, from the first idea to development, across mobile, web and tablet.",
      fa: "بله. تمدید را طراحی کرده‌ام؛ یک محصول فین‌تک برای تمدید شارژ، بسته‌ی اینترنت و اعتبار بازی، با پرداخت از کیف پول و ابزارهایی برای مدیرهایی که کیف پول دیگران را شارژ می‌کنند. تنها طراحش بودم، از اولین ایده تا توسعه، روی موبایل، وب و تبلت.",
    },
    link: { href: "/work/tamdid", label: { en: "Tamdid case study", fa: "کیس‌استادی تمدید" } },
  },
  {
    id: "mobile",
    strong: ["mobile", "app", "apps", "ios", "android", "responsive", "web", "website", "websites", "web app", "موبایل", "اپلیکیشن", "اپ", "وب", "طراحی سایت", "ریسپانسیو"],
    answer: {
      en: "Yes, both mobile and web, always responsive. Most of my products are Persian and right to left, plus multilingual ones like Remeet. Tamdid, for example, I designed mobile first, then for web and tablet.",
      fa: "بله، هم موبایل و هم وب، همیشه ریسپانسیو. بیشتر محصولاتم فارسی و راست‌به‌چپ بوده‌اند و چندزبانه هم داشته‌ام، مثل ریمیت. تمدید را مثلاً اول برای موبایل و بعد برای وب و تبلت طراحی کردم.",
    },
  },
  {
    id: "code",
    strong: ["code", "coding", "developer", "html", "css", "frontend", "front-end", "programming", "کد", "کدنویسی", "برنامه نویسی", "برنامه‌نویسی", "فرانت", "react", "javascript", "typescript", "nextjs", "next.js", "vue", "جاوااسکریپت", "ری اکت"],
    answer: {
      en: "I’m a designer, not a developer, but I know how my designs get built: I studied front-end development in 2023 and took HTML & CSS for Designers. At handoff I document flows, page logic, states and edge cases, so engineers can build without guesswork.",
      fa: "طراح هستم، نه برنامه‌نویس؛ ولی می‌دانم طراحی‌ام چطور پیاده می‌شود: سال ۲۰۲۳ فرانت‌اند خواندم و دوره‌ی HTML & CSS for Designers را هم گذرانده‌ام. موقع تحویل، فلوها، منطق صفحات، استیت‌ها و حالت‌های خاص را مستند می‌کنم تا تیم فنی بدون حدس و گمان پیاده‌سازی کند.",
    },
  },
  {
    id: "process",
    strong: ["process", "how do you work", "how does she work", "workflow", "approach", "method", "handoff", "working style", "work style", "سبک کار", "روند", "پروسه", "فرایند", "فرآیند", "چطور کار", "روش کار", "هندآف", "تحویل"],
    answer: {
      en: "Four steps. Listen: I talk to the people who use and build the product to find the real problem. Map: I draw the journeys before the screens. Systemise: components, tokens and states every screen shares. Ship: I hand off documented flows and edge cases, then review what gets built.",
      fa: "چهار مرحله. شنیدن: با کسانی که از محصول استفاده می‌کنند و آن را می‌سازند صحبت می‌کنم تا مسئله‌ی واقعی را پیدا کنم. نقشه: فلوها را قبل از صفحه‌ها می‌کشم. سیستم: کامپوننت‌ها، توکن‌ها و استیت‌هایی که همه‌ی صفحه‌ها از آن استفاده می‌کنند. تحویل: فلوها و حالت‌های خاص را مستند تحویل می‌دهم و بعد خروجی را بررسی می‌کنم.",
    },
  },
  {
    id: "team",
    strong: ["team", "teamwork", "collaborate", "collaboration", "solo", "alone", "pm", "product manager", "qa", "engineers", "with developer", "work with developer", "with engineer", "تیم", "تیمی", "همکاری", "تنها", "انفرادی", "مدیر محصول", "تیم فنی", "با تیم", "با دولوپر", "با برنامه نویس", "documentation", "documents", "specs", "spec", "developers", "engineering", "مستندسازی", "داکیومنت", "مستند"],
    answer: {
      en: "Closely, every day. I work side by side with PMs, QA and engineers, and I document flows, page logic, states and edge cases so nothing is left to guesswork.",
      fa: "نزدیک و هر روز. کنار مدیر محصول، QA و تیم فنی کار می‌کنم و فلوها، منطق صفحات، استیت‌ها و حالت‌های خاص را مستند می‌کنم تا چیزی به حدس و گمان نماند.",
    },
  },

  // Projects
  {
    id: "projects",
    strong: ["projects", "project", "portfolio", "work samples", "your work", "her work", "see your work", "case studies", "case study", "previous work", "پروژه", "پروژه ها", "پروژه‌ها", "نمونه کار", "نمونه‌کار", "پورتفولیو", "کیس‌استادی", "nemoone kar"],
    answer: {
      en: "My lead projects are Atlas (enterprise AI), Tamdid (fintech) and Kudos (HR). There’s also Remeet, an award winner, AzMan’s three connected products, Novin Host, Kaaryar Studio and Nan va Namak.",
      fa: "پروژه‌های اصلی‌ام اطلس (هوش مصنوعی سازمانی)، تمدید (فین‌تک) و کودوس (منابع انسانی) هستند. به‌علاوه ریمیت که جایزه گرفته، سه محصول به‌هم‌پیوسته‌ی ازمان، نوین هاست، کاریار استودیو و نان و نمک.",
    },
    link: { href: "/work", label: { en: "See all projects", fa: "همه‌ی پروژه‌ها" } },
  },
  {
    id: "tamdid",
    entity: true,
    strong: ["tamdid", "تمدید"],
    answer: {
      en: "Tamdid is a fintech product for renewals: mobile charge, internet packages and game credit, paid from one wallet, with a monthly league that rewards keeping up. I designed it on my own, from the first idea to development, and it’s now being built.",
      fa: "تمدید یک محصول فین‌تک برای تمدید شارژ، بسته‌ی اینترنت و اعتبار بازی است، با پرداخت از کیف پول و یک لیگ ماهانه برای کاربرهای فعال. به‌تنهایی طراحی‌اش کردم، از اولین ایده تا توسعه، و الان در مرحله‌ی ساخت است.",
    },
    link: { href: "/work/tamdid", label: { en: "Tamdid case study", fa: "کیس‌استادی تمدید" } },
  },
  {
    id: "kudos",
    entity: true,
    strong: ["kudos", "کودوس"],
    answer: {
      en: "Kudos is employee-recognition software: colleagues thank each other with gift cards and coins, and HR runs surveys and events in the same place. As its only designer at Novaday, I turned its home from a plain dashboard into a social feed, and it’s live with real companies.",
      fa: "کودوس نرم‌افزار قدردانی از کارکنان است: همکارها با گیفت‌کارت و سکه از هم تشکر می‌کنند و منابع انسانی نظرسنجی و رویدادها را همان‌جا اجرا می‌کند. تنها طراحش در نوادی بودم؛ صفحه‌ی اصلی‌اش را از یک داشبورد ساده به یک فید اجتماعی تبدیل کردم و حالا در شرکت‌های واقعی استفاده می‌شود.",
    },
    link: { href: "/work/kudos", label: { en: "Kudos case study", fa: "کیس‌استادی کودوس" } },
  },
  {
    id: "remeet",
    entity: true,
    strong: ["remeet", "access", "award", "awards", "tehran design week", "design week", "prize", "ریمیت", "اکسس", "جایزه", "هفته دیزاین", "هفته طراحی"],
    answer: {
      en: "Remeet (first called Access) is a multilingual access and meeting system: fingerprint and RFID check-in, with room bookings synced to Outlook. I designed it at Novaday as one of two designers, and in December 2025 the Remeet team won at Tehran Design Week with that design.",
      fa: "ریمیت (که اول اسمش اکسس بود) یک سیستم چندزبانه‌ی مدیریت دسترسی و جلسات است: ورود با اثر انگشت و RFID و رزرو اتاق‌ها هماهنگ با Outlook. در نوادی، به‌عنوان یکی از دو طراح تیم، طراحی‌اش کردم و دسامبر ۲۰۲۵ تیم ریمیت با همین طراحی در هفته‌ی دیزاین تهران برنده شد.",
    },
    link: { href: "/work/remeet", label: { en: "About Remeet", fa: "درباره‌ی ریمیت" } },
  },
  {
    id: "atlas",
    entity: true,
    strong: ["atlas", "aix2", "اطلس"],
    answer: {
      en: "Atlas is an AI platform I design at Algonet. It analyses a company’s emails, chats and workflows and suggests a simpler way to run them; we took it from brief to a live first version in two to three days.",
      fa: "اطلس پلتفرم هوش مصنوعی‌ای است که در الگونت طراحی می‌کنم. ایمیل‌ها، چت‌ها و فرایندهای یک شرکت را تحلیل می‌کند و مسیر ساده‌تری پیشنهاد می‌دهد؛ اولین نسخه‌ی لایوش را در دو سه روز از بریف به اجرا رساندیم.",
    },
    link: { href: "/work/atlas", label: { en: "About Atlas", fa: "درباره‌ی اطلس" } },
  },
  {
    id: "azman",
    entity: true,
    strong: ["azman", "hamgam", "hamgam saz", "ازمان", "همگام ساز", "همگام‌ساز", "همگام"],
    answer: {
      en: "AzMan is three connected products, and I designed all of them between October 2025 and September 2026: the AzMan marketplace for customers, Hamgam Saz for the field experts and their communication, and the ERP that runs both.",
      fa: "ازمان سه محصول به‌هم‌پیوسته است که از مهر ۱۴۰۴ تا شهریور ۱۴۰۵ طراحی هر سه با من بود: مارکت‌پلیس ازمان برای مشتری‌ها، همگام‌ساز برای کارشناسان و ارتباطات‌شان، و ERP که هر دو را مدیریت می‌کند.",
    },
    link: { href: "/work/azman", label: { en: "AzMan case study", fa: "کیس‌استادی ازمان" } },
  },
  {
    id: "kaaryar",
    entity: true,
    strong: ["kaaryar", "karyar", "studio kaaryar", "کاریار", "کاریار استودیو", "kaaryar studio", "studio.kaaryar.ir"],
    answer: {
      en: "Kaaryar Studio puts graduates of Kaaryar’s training on real client projects. I redesigned its four-page website within tight client constraints, deliberately simple and on a small design system. It’s now live at studio.kaaryar.ir, very close to my final design.",
      fa: "کاریار استودیو فارغ‌التحصیلان دوره‌های کاریار را روی پروژه‌های واقعی مشتری‌ها می‌برد. سایت چهارصفحه‌ای‌اش را با محدودیت‌های جدی کارفرما، عمداً ساده و روی یک دیزاین‌سیستم کوچک، ریدیزاین کردم. حالا روی studio.kaaryar.ir لایو است و خیلی نزدیک به طراحی نهایی من است.",
    },
    link: { href: "/work/kaaryar", label: { en: "Kaaryar case study", fa: "کیس‌استادی کاریار" } },
  },
  {
    id: "novinhost",
    entity: true,
    strong: ["novin", "novin host", "novinhost", "hosting", "نوین", "نوین هاست", "هاستینگ"],
    answer: {
      en: "Novin Host is a hosting brand with 15 years behind it. From June to September 2026 I redesigned its website to feel current and make choosing a plan easier, without long-time customers losing their way.",
      fa: "نوین هاست یک برند هاستینگ با ۱۵ سال سابقه است. از خرداد تا شهریور ۱۴۰۵ سایتش را ریدیزاین کردم تا به‌روز شود و انتخاب سرویس راحت‌تر باشد، بدون اینکه مشتری‌های قدیمی راه‌شان را گم کنند.",
    },
    link: { href: "/work/novinhost", label: { en: "Novin Host case study", fa: "کیس‌استادی نوین هاست" } },
  },
  {
    id: "nanvanamak",
    entity: true,
    strong: ["nan va namak", "nanvanamak", "startup", "own startup", "نان و نمک", "نون و نمک", "استارتاپ"],
    answer: {
      en: "Nan va Namak was a cooking platform a few friends and I set out to turn into a startup. As a co-founder and one of its two designers, I took it from idea to execution across web, tablet and mobile. It never launched, but it’s where I moved from UI design into end-to-end product design.",
      fa: "نان و نمک یک پلتفرم آشپزی بود که با چند دوستم می‌خواستیم به یک استارتاپ تبدیلش کنیم. به‌عنوان هم‌بنیان‌گذار و یکی از دو طراحش، آن را از ایده تا اجرا برای وب، تبلت و موبایل طراحی کردم. لانچ نشد، ولی همان‌جا بود که از طراحی رابط کاربری به طراحی محصول از ابتدا تا انتها رسیدم.",
    },
    link: { href: "/work/nanvanamak", label: { en: "The story", fa: "داستانش" } },
  },
  {
    id: "algonet",
    entity: true,
    strong: ["algonet", "الگونت", "algonet.ai"],
    answer: {
      en: "At Algonet (full-time) I design B2B products for Iranian and international clients, several used by more than 5,000 people: Atlas, monitoring systems, ERP modules and data-heavy dashboards. I build new products from zero and audit live ones to fix where users struggle, on a custom design system I built and maintain. I also designed Algonet’s brand identity and I’m creating its brand book.",
      fa: "در الگونت (تمام‌وقت) محصولات B2B برای مشتری‌های ایرانی و بین‌المللی طراحی می‌کنم که چند تا از آن‌ها بیش از ۵٬۰۰۰ کاربر دارند: اطلس، سیستم‌های مانیتورینگ، ماژول‌های ERP و داشبوردهای پرداده. محصول جدید را از صفر می‌سازم و محصولات لایو را آدیت می‌کنم تا جاهایی را که کاربر گیر می‌کند درست کنم؛ همه روی دیزاین‌سیستم اختصاصی‌ای که خودم ساخته‌ام و نگه می‌دارم. هویت بصری الگونت را هم طراحی کرده‌ام و الان برندبوکش را می‌سازم.",
    },
  },
  {
    id: "novaday",
    entity: true,
    strong: ["novaday", "نوادی", "نوا دی"],
    answer: {
      en: "At Novaday (full-time, hybrid) I designed two B2B products on a shared Tailwind-based design system: Kudos, an HR platform, and Remeet, the access system that won at Tehran Design Week. Benchmarks, competitor analysis and usability testing shaped both.",
      fa: "در نوادی (تمام‌وقت، هیبرید) دو محصول B2B را روی یک دیزاین‌سیستم مشترک مبتنی بر Tailwind طراحی کردم: کودوس، یک پلتفرم منابع انسانی، و ریمیت، سیستم دسترسی‌ای که در هفته‌ی دیزاین تهران برنده شد. بنچمارک، تحلیل رقبا و تست یوزبیلیتی پشتوانه‌ی هر دو بود.",
    },
  },
  {
    id: "branding",
    strong: ["branding", "brand", "logo", "visual identity", "identity", "graphic design", "environmental", "برندینگ", "برند", "لوگو", "هویت بصری", "گرافیک", "بروشور", "پترن"],
    answer: {
      en: "Yes, out of curiosity: I designed Algonet’s visual identity (logo, pattern, colour, typography and brochure) and I’m building its brand book; I’ve also done campaign visuals. Product design is still my main craft.",
      fa: "بله، از سر علاقه: هویت بصری الگونت (لوگو، پترن، رنگ، تایپوگرافی و بروشور) را طراحی کرده‌ام و الان برندبوکش را می‌سازم؛ طراحی کمپین هم انجام داده‌ام. ولی تخصص اصلی‌ام پروداکت دیزاین است.",
    },
  },

  {
    id: "industries",
    strong: ["industries", "industry", "domains", "domain", "sectors", "sector", "fields", "صنعت", "صنایع", "حوزه ها", "چه حوزه", "چه زمینه"],
    answer: {
      en: "I’ve worked across fintech (Tamdid), HR tech (Kudos), workplace access (Remeet), enterprise AI (Atlas), a services marketplace and its ERP (AzMan), web hosting (Novin Host), a social-impact studio (Kaaryar Studio), online printing (ChapAgha), education (AlaaTV) and food (Nan va Namak).",
      fa: "در این حوزه‌ها کار کرده‌ام: فین‌تک (تمدید)، منابع انسانی (کودوس)، مدیریت دسترسی (ریمیت)، هوش مصنوعی سازمانی (اطلس)، مارکت‌پلیس خدمات و ERP آن (ازمان)، هاستینگ (نوین هاست)، استودیوی اجتماعی (کاریار استودیو)، چاپ آنلاین (چاپ آقا)، آموزش (آلاتی‌وی) و آشپزی (نان و نمک).",
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
    strong: ["lead designer", "design lead", "led a team", "led a design team", "lead a design team", "lead designers", "lead a team", "led the team", "team lead", "manage designers", "managed designers", "management", "mentor", "mentored", "mentoring", "مدیریت تیم", "لید", "سرپرست", "منتور", "منتورینگ", "led designers", "led a design", "lead other designers", "managed people", "مدیریت کردی"],
    answer: {
      en: "Not yet as a title. My roles have been product designer, often as the only designer on the product, so I’m used to owning decisions end to end. Leading a design team is my next step, and I genuinely enjoy the management side of the work.",
      fa: "هنوز نه به‌عنوان عنوان شغلی. نقشم تا الان پروداکت دیزاینر بوده و اغلب تنها طراح محصول، برای همین به گرفتن تصمیم‌ها از ابتدا تا انتها عادت دارم. لید کردن یک تیم طراحی قدم بعدی من است و بخش مدیریتی کار را واقعاً دوست دارم.",
    },
  },
  {
    id: "leaving",
    strong: ["leave algonet", "leaving algonet", "why leave", "why is she leaving", "why does she want to leave", "why is she looking", "looking for a new job", "why change", "چرا میخواد بره", "بیاد بیرون", "بره بیرون", "ترک کنه", "چرا دنبال کار", "چرا میخوای بری", "میخوای بری", "از الگونت بری", "از الگونت بیای", "از شرکتت بری", "leaving your job", "leave your job", "leaving your current", "leave your current", "why are you leaving", "why do you want to leave", "why change jobs", "quit", "quitting", "resign", "resigning", "استعفا"],
    forward: true,
    casual: { fa: "این را ترجیح می‌دهم خودم مستقیم جواب بدهم. سؤالت به دست خودم رسید؛ اگر راه ارتباطی بگذاری، جواب می‌دهم." },
    answer: {
      en: "That’s one I’d rather answer myself, in person. Your question has come straight to me; leave a way to reach you below and I’ll reply.",
      fa: "این را ترجیح می‌دهم خودم مستقیم جواب بدهم. سؤال‌تان به دست خودم رسید؛ اگر راه ارتباطی بگذارید، جواب می‌دهم.",
    },
  },
  {
    id: "inquiry",
    strong: ["for my startup", "for my company", "for my business", "for my project", "my website", "my app", "my product", "how much for", "how much would", "how long does a project", "how long will", "how long would", "timeline", "quote", "estimate", "برای استارتاپم", "برای شرکتم", "برای کسب و کارم", "پروژه من", "سایت من", "اپ من", "چقدر طول", "زمان تحویل", "هزینه طراحی", "چقدر هزینه"],
    forward: true,
    casual: { fa: "خوشحال می‌شوم بیشتر بدانم! زمان و هزینه به بریف بستگی دارد؛ اول دقیق بررسی‌اش می‌کنم و بعد برنامه و قیمت را برایت می‌فرستم. پیامت به دست خودم رسید؛ یک راه ارتباطی بگذار." },
    answer: {
      en: "I’d love to hear more! Timeline and cost depend on the brief, so I review it properly first and then send you a plan and a quote. Your message has come straight to me; leave a way to reach you below.",
      fa: "خوشحال می‌شوم بیشتر بدانم! زمان و هزینه به بریف بستگی دارد؛ اول آن را دقیق بررسی می‌کنم و بعد برنامه و قیمت را برایتان می‌فرستم. پیام‌تان به دست خودم رسید؛ لطفاً یک راه ارتباطی بگذارید.",
    },
  },
  {
    id: "lesson",
    strong: ["failure", "failed", "mistake", "mistakes", "lesson", "lessons learned", "learned the hard way", "what went wrong", "شکست", "اشتباه", "درس", "تجربه تلخ"],
    answer: {
      en: "The lesson that stuck with me: don’t start designing while the problem is still blurry. When a brief is full of open questions, I keep asking and researching until I truly understand it.",
      fa: "درسی که برایم ماندگار شد: تا وقتی مسئله مبهم است، طراحی را شروع نکنم. وقتی بریف پر از سؤال باز است، آن‌قدر می‌پرسم و ریسرچ می‌کنم تا مسئله را واقعاً بفهمم.",
    },
  },
  {
    id: "teamSize",
    strong: ["team size", "size of the team", "how big was the team", "how big is the team", "how many developers", "how many designers", "how many engineers", "who was on the team", "اندازه تیم", "چند نفر بودید", "چند نفر هستید", "چند تا دیزاینر", "چند تا طراح", "چند تا دولوپر", "تیمتون چند نفر", "چند نفر بودین", "چند نفر بودن", "چند نفرین", "چند نفر هستین", "چند نفر توی تیم", "team size at", "how big was", "how big is your team", "team you worked with", "how many people were", "people on the team", "people were on"],
    answer: {
      en: "On Kudos I was the only designer, with a PM, a front-end and a back-end developer. Remeet had two designers, me included, plus a PM, two front-end developers, a back-end developer and a software engineer who built the device. At Algonet I’m one of three designers alongside a large engineering team.",
      fa: "در کودوس تنها طراح بودم، کنار یک مدیر محصول، یک دولوپر فرانت و یک دولوپر بک‌اند. ریمیت دو طراح داشت که یکی‌شان من بودم، به‌علاوه‌ی مدیر محصول، دو دولوپر فرانت، یک دولوپر بک‌اند و یک مهندس نرم‌افزار که خود دستگاه را ساخت. در الگونت هم یکی از سه طراح هستم، کنار یک تیم فنی بزرگ.",
    },
  },
  {
    id: "story",
    strong: ["colleagues", "references", "reference", "recommendation", "توصیه نامه", "رفرنس", "معرف کاری", "همکاراش"],
    forward: true,
    casual: { fa: "این مورد را ترجیح می‌دهم خودم پیگیری کنم. سؤالت به دست خودم رسید؛ اگر راه ارتباطی بگذاری، جواب می‌دهم." },
    answer: {
      en: "I’d rather handle that one myself. Your question has come straight to me; leave a way to reach you below and I’ll reply.",
      fa: "این مورد را ترجیح می‌دهم خودم پیگیری کنم. سؤال‌تان به دست خودم رسید؛ اگر راه ارتباطی بگذارید، جواب می‌دهم.",
    },
  },
  {
    id: "challenge",
    strong: ["hardest", "biggest challenge", "challenge", "challenging", "difficult project", "toughest", "pressure", "tight deadline", "deadline", "deadlines", "under pressure", "stress", "stressful", "prioritize", "prioritise", "time management", "سخت ترین", "چالش", "سختی", "فشار", "ددلاین", "مهلت کم", "زمان کم", "استرس", "اولویت بندی", "مدیریت زمان", "زیر فشار", "زیر فشار چطور", "فشار کاری", "under pressure how"],
    answer: {
      en: "Pressure is something I’ve learned to work with: on Atlas, we went from brief to a live first version in two to three days. A clear plan, AI as a partner and persistence get me through, and a real deadline actually sharpens my focus.",
      fa: "کار زیر فشار را یاد گرفته‌ام: در اطلس، در دو سه روز از بریف به اولین نسخه‌ی لایو رسیدیم. یک برنامه‌ی دقیق، هوش مصنوعی به‌عنوان همراه و پشتکار کمکم می‌کند، و ددلاین واقعی حتی تمرکزم را بیشتر می‌کند.",
    },
  },
  {
    id: "results",
    strong: ["results", "impact", "metrics", "kpi", "kpis", "numbers", "how many users", "outcome", "outcomes", "achievement", "achievements", "accomplishment", "measure success", "success metrics", "data driven", "data-driven", "نتیجه", "نتایج", "دستاورد", "دستاوردها", "چند کاربر", "تعداد کاربر", "موفقیت", "سنجش"],
    answer: {
      en: "Kudos is live with real companies; at ArvanCloud alone around 500 people use it, and an A/B test validated its home redesign. Remeet, which I designed, won at Tehran Design Week. At Algonet, several of the products I design are used by more than 5,000 people, and Atlas went from brief to live in two to three days.",
      fa: "کودوس در شرکت‌های واقعی استفاده می‌شود؛ فقط در ابرآروان حدود ۵۰۰ نفر کاربرش هستند و ریدیزاین صفحه‌ی اصلی‌اش با تست A/B تأیید شد. ریمیت، که طراحی‌اش با من بود، در هفته‌ی دیزاین تهران برنده شد. در الگونت چند تا از محصولاتی که طراحی می‌کنم بیش از ۵٬۰۰۰ کاربر دارند و اطلس در دو سه روز از بریف به نسخه‌ی لایو رسید.",
    },
  },
  {
    id: "philosophy",
    strong: ["philosophy", "principle", "principles", "what makes good design", "good design", "design values", "approach to design", "فلسفه", "اصول طراحی", "طراحی خوب"],
    answer: {
      en: "A design has to work for two people at once: the user, who needs it to be easy, and the business, which needs it to deliver. When both are happy, and I’ve enjoyed the way there, I know the job is done right.",
      fa: "طراحی باید هم‌زمان برای دو طرف کار کند: کاربری که می‌خواهد کار برایش ساده باشد، و کسب‌وکاری که باید به نتیجه برسد. وقتی هر دو راضی باشند و خودم هم از مسیر لذت برده باشم، می‌دانم کار درست انجام شده.",
    },
  },
  {
    id: "hours",
    strong: ["time zone", "timezone", "time zones", "overlap", "us hours", "european hours", "working hours", "weekend", "weekends", "hours", "تایم زون", "منطقه زمانی", "ساعت کاری", "آخر هفته", "تعطیلات", "meeting", "meetings", "what time", "جلسه", "چه ساعتی", "ساعت جلسه", "meet at", "cet", "est", "pst", "gmt", "utc", "ساعت چند", "چه ساعت هایی", "تا چه ساعتی", "berlin time", "london time", "new york time", "local time", "your time", "call at", "meeting at", "time difference", "اختلاف ساعت", "به وقت"],
    answer: {
      en: "I’m in Tehran (UTC+3:30) and can meet between 10:00 and 22:00 Tehran time, arranged in advance. That covers the whole European working day and US East Coast mornings.",
      fa: "ساکن تهرانم (UTC+3:30) و با هماهنگی قبلی از ساعت ۱۰ صبح تا ۱۰ شب به وقت تهران می‌توانم جلسه داشته باشم؛ یعنی کل ساعت کاری اروپا و صبح‌های شرق آمریکا.",
    },
  },
  {
    id: "nda",
    strong: ["nda", "ndas", "non disclosure", "non-disclosure", "confidentiality agreement", "عدم افشا", "قرارداد محرمانگی", "محرمانگی"],
    answer: {
      en: "Yes, I sign NDAs, and confidential work stays confidential; Atlas is a good example.",
      fa: "بله، قرارداد عدم افشا امضا می‌کنم و کار محرمانه، محرمانه می‌ماند؛ اطلس نمونه‌اش است.",
    },
  },
  {
    id: "confidential",
    strong: ["see atlas", "atlas designs", "confidential", "private work", "password", "under nda", "show me atlas", "کار محرمانه", "طراحی های اطلس", "دیدن اطلس"],
    forward: true,
    casual: { fa: "اطلس هنوز در حال توسعه است، برای همین در سایت تار مانده؛ ولی خوشحال می‌شوم به‌صورت خصوصی، مثلاً در جلسه‌ی مصاحبه، نشانت بدهم. درخواستت به دست خودم رسید؛ یک راه ارتباطی بگذار." },
    answer: {
      en: "Atlas is still in development, so it stays blurred on the site, but I’d be glad to walk you through it privately, for example in an interview. Your request has come straight to me; leave a way to reach you below.",
      fa: "اطلس هنوز در حال توسعه است، برای همین در سایت تار مانده؛ ولی خوشحال می‌شوم به‌صورت خصوصی، مثلاً در جلسه‌ی مصاحبه، نشان‌تان بدهم. درخواست‌تان به دست خودم رسید؛ لطفاً یک راه ارتباطی بگذارید.",
    },
  },
  {
    id: "motion",
    strong: ["motion design", "motion", "animation", "animations", "illustration", "illustrations", "موشن", "انیمیشن", "ایلاستریشن", "تصویرسازی"],
    answer: {
      en: "Not as a specialist; I don’t do motion design. When a project needs visuals or illustrations, I create them with the help of AI tools.",
      fa: "نه به‌صورت تخصصی؛ موشن دیزاین کار نمی‌کنم. وقتی پروژه به ویژوال یا تصویرسازی نیاز داشته باشد، با کمک ابزارهای هوش مصنوعی می‌سازمش.",
    },
  },
  {
    id: "testing",
    strong: ["a/b", "ab test", "ab testing", "a b test", "split test", "experiment", "experiments", "تست ای بی", "ای بی تست", "آزمایش", "a/b test", "a/b testing", "تست a/b", "ای/بی"],
    answer: {
      en: "Yes. On Kudos I A/B tested the prototype of the redesigned home against the old dashboard. Because it was backed by solid research and benchmarks, the result confirmed the direction and the redesign shipped. I also use usability testing and analytics with Hotjar, Maze, Microsoft Clarity and GA4.",
      fa: "بله. در کودوس پروتوتایپ صفحه‌ی اصلیِ ریدیزاین‌شده را با داشبورد قبلی A/B تست کردم؛ چون پشتش ریسرچ و بنچمارک محکمی بود، نتیجه همان مسیر را تأیید کرد و ریدیزاین اجرا شد. از تست یوزبیلیتی و آنالیتیکس با Hotjar، Maze، Microsoft Clarity و GA4 هم استفاده می‌کنم.",
    },
  },
  {
    id: "uxwriting",
    strong: ["ux copy", "ux writing", "microcopy", "copywriting", "write copy", "writes copy", "content design", "یو ایکس رایتینگ", "یو ایکس کپی", "متن نویسی", "کپی رایتینگ"],
    answer: {
      en: "Yes, I write UX copy myself as part of the design: labels, empty states, error messages and the words that help people decide.",
      fa: "بله، یو‌ایکس رایتینگ را خودم و به‌عنوان بخشی از طراحی انجام می‌دهم: لیبل‌ها، حالت‌های خالی، پیام‌های خطا و کلماتی که به تصمیم کاربر کمک می‌کنند.",
    },
  },
  {
    id: "audit",
    strong: ["ux audit", "audit", "heuristic", "heuristics", "review my product", "review my site", "expert review", "آدیت", "ممیزی", "بررسی محصول", "بررسی سایت", "هیوریستیک"],
    answer: {
      en: "Yes, UX audits are one of my strengths. At Algonet I audit live products to find where users struggle, and my Novin Host case study opens with a heuristic review of the live site before any redesign.",
      fa: "بله، یو‌ایکس آدیت از نقاط قوت من است. در الگونت محصولات لایو را آدیت می‌کنم تا جاهایی را که کاربر گیر می‌کند پیدا کنم، و کیس‌استادی نوین هاست هم با بررسی هیوریستیک سایت فعلی، قبل از هر ریدیزاینی، شروع می‌شود.",
    },
    link: { href: "/work/novinhost", label: { en: "Novin Host case study", fa: "کیس‌استادی نوین هاست" } },
  },
  {
    id: "accessibility",
    strong: ["accessibility", "accessible", "wcag", "a11y", "contrast", "screen reader", "دسترس پذیری", "دسترسی پذیری", "اکسسیبیلیتی", "کنتراست"],
    answer: {
      en: "Yes. I design with accessibility in mind and check contrast, readability and states with several AI tools, so nothing slips through. On Kaaryar Studio, accessibility was one of the redesign’s goals.",
      fa: "بله. با در نظر گرفتن دسترس‌پذیری طراحی می‌کنم و کنتراست، خوانایی و استیت‌ها را با چند ابزار هوش مصنوعی چک می‌کنم تا چیزی از قلم نیفتد. در کاریار استودیو هم دسترس‌پذیری یکی از اهداف ریدیزاین بود.",
    },
  },
  {
    id: "workshop",
    strong: ["workshop", "workshops", "facilitate", "facilitation", "design sprint", "ورکشاپ", "کارگاه"],
    answer: {
      en: "Not yet; I haven’t run workshops. My collaboration has been day to day, side by side with PMs, engineers and QA.",
      fa: "هنوز نه؛ ورکشاپ برگزار نکرده‌ام. همکاری‌ام روزمره و کنار مدیر محصول، تیم فنی و QA بوده.",
    },
  },
  {
    id: "international",
    strong: ["international clients", "international client", "foreign clients", "foreign client", "clients abroad", "international team", "global clients", "کارفرمای خارجی", "مشتری خارجی", "تیم خارجی", "شرکت خارجی"],
    answer: {
      en: "Yes, through Algonet: I design B2B products there for Iranian and international clients, and Atlas is heading for an international launch. I’ve also designed English and multilingual products, like Remeet, and I’m ready for an international team.",
      fa: "بله، از طریق الگونت: آنجا محصولات B2B را برای مشتری‌های ایرانی و بین‌المللی طراحی می‌کنم و اطلس هم برای لانچ بین‌المللی آماده می‌شود. محصول انگلیسی و چندزبانه، مثل ریمیت، هم طراحی کرده‌ام و برای کار در یک تیم بین‌المللی آماده‌ام.",
    },
  },

  // Interview questions
  {
    id: "whyHire",
    strong: ["why should we hire", "why hire", "why should i hire", "why her", "why sudabeh", "what makes her different", "what makes her stand out", "stand out", "what sets her apart", "unique", "good fit", "right fit", "چرا باید استخدام", "چرا استخدام", "چرا سودابه", "چرا باید سودابه", "چه چیزی متمایز", "فرقش با بقیه", "متمایز", "چرا تو", "چرا شما", "chera bayad", "best fit", "sets you apart", "sets her apart", "apart from other", "the best candidate", "right candidate", "بهترین گزینه", "چرا باید تو", "تو را استخدام", "تو رو استخدام", "استخدام کنیم", "استخدامت کنیم", "hire you"],
    answer: {
      en: "Because I make complicated products simple, and my work shows it: I designed Tamdid on my own from idea to development, and Remeet, which won at Tehran Design Week. I work fast with AI without handing it the decisions.",
      fa: "چون محصول‌های پیچیده را ساده می‌کنم و کارهایم این را نشان می‌دهد: تمدید را به‌تنهایی از ایده تا توسعه طراحی کردم، و ریمیت را که در هفته‌ی دیزاین تهران برنده شد. با کمک هوش مصنوعی سریع کار می‌کنم، بدون اینکه تصمیم‌ها را به آن بسپارم.",
    },
    link: { href: "/work", label: { en: "See all projects", fa: "همه‌ی پروژه‌ها" } },
  },
  {
    id: "strengths",
    strong: ["strength", "strengths", "strong points", "strong suit", "best at", "good at", "superpower", "biggest strength", "نقطه قوت", "نقاط قوت", "نقطه‌ی قوت", "نقطه های قوت", "قوت", "بهترین مهارت", "مهم ترین مهارت", "توش قوی", "قوی ترین", "بهترین ویژگی", "best quality", "best qualities", "what are you best at", "really good at", "great at"],
    answer: {
      en: "Three things. Turning dense rules into clear flows, like roles and permissions in the AzMan ERP or wallets and payment order in Tamdid. Owning a product end to end, as the only designer on Tamdid. And making handoff painless: on Kudos I documented every page’s logic, states and edge cases for engineering.",
      fa: "سه چیز. تبدیل قوانین پیچیده به فلوهای روشن، مثل نقش‌ها و سطح دسترسی در ERP ازمان یا کیف پول‌ها و ترتیب پرداخت در تمدید. مالکیت کامل محصول، مثل تمدید که تنها طراحش بودم. و هندآف بی‌دردسر: در کودوس منطق، استیت‌ها و حالت‌های خاص هر صفحه را برای تیم فنی مستند کردم.",
    },
  },
  {
    id: "weakness",
    strong: ["weakness", "weaknesses", "weak point", "weak points", "weak spot", "areas to improve", "area to improve", "room to improve", "need to improve", "نقطه ضعف", "نقاط ضعف", "نقطه‌ی ضعف", "ضعف", "ضعفت", "ضعفش", "weak side", "weak", "weakest", "noghte zaaf", "zaaf", "باید روش کار کنی", "روی چه چیزی باید کار", "باید بهتر بشی", "ضعیف"],
    answer: {
      en: "Honestly, stress. Early in my career, pressure used to get to me, so I’ve worked on it deliberately, and the people around me now notice how much calmer I am. I’m still improving, and there’s an upside: with a real deadline in sight, my focus actually sharpens.",
      fa: "راستش، استرس. اوایل کارم فشار رویم اثر می‌گذاشت؛ برای همین آگاهانه رویش کار کرده‌ام و حالا اطرافیانم می‌گویند خیلی آرام‌تر شده‌ام. هنوز هم دارم بهترش می‌کنم، و یک روی مثبت هم دارد: وقتی ددلاین واقعی در کار باشد، تمرکزم بیشتر می‌شود.",
    },
  },
  {
    id: "conflict",
    strong: ["conflict", "conflicts", "disagree", "disagreed", "disagreement", "push back", "pushback", "difficult stakeholder", "difficult client", "difficult person", "argument", "tension", "تعارض", "اختلاف نظر", "مخالفت", "مخالف بود", "بحث با", "کارفرمای سخت", "مشتری سخت", "درگیری", "به مشکل خوردی", "مشکل خوردی", "مشکل خورده", "اختلاف داشته", "اختلاف پیدا", "اختلاف داشتی", "اختلاف نظر داشتی", "دعوا", "دعوات", "builds it differently", "built differently", "differently than your design", "differently than the design", "doesnt match the design", "not what you designed", "not as designed", "با طراحی فرق", "مطابق طراحی نبود", "argued", "doesnt follow", "dont follow", "not following the design", "ignores your design", "ignore your design", "طراحیت رو اجرا نکرد"],
    answer: {
      en: "Most of my disagreements have been about the gap between what I designed and what got built, and I see closing that gap as part of my job. I take the time to understand the developers’ constraints, while standing up for the flow and UX that work for the user.",
      fa: "بیشتر اختلاف‌نظرهایم سر فاصله‌ی بین طراحی و چیزی بوده که در نهایت پیاده شده، و بستن همین فاصله را بخشی از کار خودم می‌دانم. وقت می‌گذارم تا محدودیت‌های تیم فنی را بفهمم، اما پای فلو و تجربه‌ای که برای کاربر درست است هم می‌ایستم.",
    },
  },
  {
    id: "feedback",
    strong: ["feedback", "criticism", "criticise", "criticize", "critique", "design review", "design reviews", "review your work", "فیدبک", "بازخورد", "انتقاد", "نقد", "reject your design", "rejects your design", "rejected", "stakeholder", "stakeholders", "dont like your design", "doesnt like your design", "طراحیت رو رد", "رد کنن"],
    answer: {
      en: "I treat feedback as part of the process, not an interruption. On Kudos, review feedback even had its own type of designer note, so nothing got lost.",
      fa: "فیدبک را بخشی از فرایند می‌دانم، نه مزاحمت. در کودوس حتی فیدبک‌های ریویو یک نوع یادداشت طراحی جدا داشتند تا چیزی گم نشود.",
    },
  },
  {
    id: "ambiguity",
    strong: ["ambiguity", "ambiguous", "unclear", "vague", "no brief", "unclear requirements", "no requirements", "where do you start", "where does she start", "new project", "مبهم", "ابهام", "نامشخص", "از کجا شروع میکنی", "از کجا شروع می‌کنی"],
    answer: {
      en: "I start by listening: I talk to the people who use and build the product and collect every rule, role and edge case before deciding anything. In my experience, the real problem is rarely the one in the request. Then I map the journeys before drawing a single screen.",
      fa: "با شنیدن شروع می‌کنم: با کسانی که از محصول استفاده می‌کنند و آن را می‌سازند صحبت می‌کنم و همه‌ی قوانین، نقش‌ها و حالت‌های خاص را قبل از هر تصمیمی جمع می‌کنم. تجربه‌ام می‌گوید مسئله‌ی واقعی به‌ندرت همانی است که در درخواست آمده. بعد، قبل از کشیدن حتی یک صفحه، فلوها را می‌کشم.",
    },
  },
  {
    id: "goals",
    strong: ["five years", "5 years from now", "in 5 years", "future", "career goal", "career goals", "goals", "goal", "next step", "ambition", "ambitions", "where do you see", "where does she see", "long term", "long-term", "آینده", "۵ سال آینده", "5 سال آینده", "هدف", "اهداف", "هدفت", "برنامه آینده", "قدم بعدی", "go next", "want to go next", "where do you want to go", "next in your career", "قدم بعدی ات"],
    answer: {
      en: "I want to grow into leading design. So far I’ve mostly been the only designer on a product, and I really enjoy the management side of the work.",
      fa: "می‌خواهم به سمت لید طراحی بروم. تا الان بیشتر تنها طراح محصول بوده‌ام و بخش مدیریتی کار را واقعاً دوست دارم.",
    },
  },
  {
    id: "motivation",
    strong: ["motivation", "motivates", "motivated", "passion", "passionate", "what drives", "why product design", "why do you love", "why does she love", "enjoy most", "love about", "انگیزه", "علاقه", "چرا طراحی محصول", "چرا پروداکت", "عاشق", "چی دوست داری", "از چی لذت"],
    answer: {
      en: "Making complicated things feel simple. For me, the job is done right when users find it easy, the business gets results, and I’ve enjoyed the way there.",
      fa: "ساده کردن چیزهای پیچیده. از نظر من کار وقتی درست انجام شده که برای کاربر ساده باشد، برای کسب‌وکار نتیجه بدهد و خودم هم از مسیر لذت برده باشم.",
    },
  },
  {
    id: "favorite",
    strong: ["favorite project", "favourite project", "proudest", "best project", "most proud", "پروژه مورد علاقه", "بیشتر از همه دوست", "افتخار", "بهترین پروژه", "پروژه محبوب", "بیشتر دوستش داری", "most proud of", "favorite work", "favourite work", "پروژه مورد علاقت", "کار مورد علاقه", "کار مورد علاقت", "پروژه محبوبت", "پروژت رو بیشتر", "proud of"],
    answer: {
      en: "I can’t pick just one. What I love is the whole journey: taking an idea and turning it into a product people genuinely enjoy.",
      fa: "نمی‌توانم فقط یکی را انتخاب کنم. چیزی که عاشقش هستم کل مسیر است؛ اینکه یک ایده را بگیرم و به محصولی تبدیلش کنم که واقعاً به دل آدم‌ها بنشیند.",
    },
    link: { href: "/work", label: { en: "See all projects", fa: "همه‌ی پروژه‌ها" } },
  },
  {
    id: "learning",
    strong: ["stay up to date", "up to date", "keep learning", "learning", "learn new", "trends", "how does she learn", "how do you learn", "self improvement", "یادگیری", "یاد می گیره", "به روز", "بروز", "آپدیت", "ترند"],
    answer: {
      en: "Deliberately, every day: product design courses (Google UX Design, Product Design Specialist, Gamification from UPenn and more), learning from the people who build products, and AI as a partner to research and prototype faster.",
      fa: "با برنامه و هر روز: دوره‌های طراحی محصول (Google UX Design، Product Design Specialist، Gamification از دانشگاه پنسیلوانیا و چند دوره‌ی دیگر)، یاد گرفتن از کسانی که محصول می‌سازند، و هوش مصنوعی به‌عنوان همراهی برای تحقیق و پروتوتایپ سریع‌تر.",
    },
  },
  {
    id: "gamification",
    strong: ["gamification", "gamify", "gamified", "league", "badges", "missions", "rewards", "گیمیفیکیشن", "بازی وارسازی", "لیگ", "ماموریت"],
    answer: {
      en: "Yes, in Tamdid: monthly leagues from Bronze to Diamond, a 24-hour daily challenge, missions and badges. The game only rewards what people already come to do, like buying and recording payments, so playing and using are the same thing. I also took the Gamification course from UPenn.",
      fa: "بله، در تمدید: لیگ ماهانه از برنز تا الماس، چالش روزانه‌ی ۲۴ ساعته، مأموریت‌ها و نشان‌ها. بازی فقط کارهایی را پاداش می‌دهد که کاربر برای انجام‌شان آمده، مثل خرید و ثبت پرداخت؛ پس بازی کردن و استفاده از محصول یکی است. دوره‌ی Gamification دانشگاه پنسیلوانیا را هم گذرانده‌ام.",
    },
    link: { href: "/work/tamdid", label: { en: "Tamdid case study", fa: "کیس‌استادی تمدید" } },
  },
  {
    id: "rtl",
    strong: ["rtl", "right to left", "right-to-left", "localization", "localisation", "multilingual", "multi language", "translation", "persian ui", "راست به چپ", "چندزبانه", "چند زبانه", "بومی سازی", "دو زبانه"],
    answer: {
      en: "Yes, it’s my home ground: most of my products are Persian and right to left. Remeet is multilingual, and for Tamdid’s English version I wrote the rules myself: mirror only what depends on direction, never the structure, and translate labels by meaning, not word for word.",
      fa: "بله، تخصص خودم است: بیشتر محصولاتم فارسی و راست‌به‌چپ بوده‌اند. ریمیت چندزبانه است و برای نسخه‌ی انگلیسی تمدید قوانینش را خودم نوشتم: فقط چیزهایی که به جهت وابسته‌اند قرینه شوند، نه ساختار، و لیبل‌ها بر اساس معنا ترجمه شوند، نه کلمه‌به‌کلمه.",
    },
  },
  {
    id: "juggle",
    strong: ["multiple projects", "several projects", "many projects", "juggle", "at the same time", "side projects", "چند پروژه همزمان", "چند تا پروژه", "همزمان کار", "همزمان پیش", "پروژه همزمان", "همزمان چند", "همزمان الگونت", "پیش میبری", "پیش می بری", "مدیریتش میکنی", "full time job and freelance", "full-time job and freelance", "handle a full time", "both jobs", "two jobs", "دو تا کار", "کنار کار تمام وقت", "work life balance", "work-life balance", "at once", "freelance at once", "on the side", "side project", "کنار کارت"],
    answer: {
      en: "Yes. Until September 2026 I ran Algonet alongside AzMan and Novin Host: Algonet is full-time and on-site, the other two were remote, so they had my evenings and never overlapped. They actually fed each other: what I learned on one project, I brought to the next.",
      fa: "بله. تا شهریور ۱۴۰۵ کنار الگونت، ازمان و نوین هاست را هم پیش می‌بردم: الگونت تمام‌وقت و حضوری است و آن دو ریموت بودند، برای همین عصرهایم را می‌گرفتند و هیچ‌وقت با هم تداخل نداشتند. حتی به هم کمک می‌کردند: چیزی که در یک پروژه یاد می‌گرفتم، در پروژه‌ی بعدی به کار می‌بردم.",
    },
  },
  {
    id: "gap",
    strong: ["gap", "career gap", "gap in", "break in", "2023", "between jobs", "وقفه", "فاصله کاری", "فاصله بین", "گپ", "بیکار", "کار نکردی", "کار نکرده", "کار نمیکردی", "کار نمی کردی", "بیکار بودی", "چیکار میکردی", "what did she do in", "what did you do in", "gap in her cv", "gap in your cv", "gaps", "employment gap", "gap in employment", "gaps in employment"],
    answer: {
      en: "Between AlaaTV (spring 2023) and Jaygah (2024) I studied front-end development. It confirmed that design was my path, and it left me understanding how interfaces get built, which still helps me every day with engineers.",
      fa: "بین آلاتی‌وی (بهار ۲۰۲۳) و جایگاه (۲۰۲۴) فرانت‌اند می‌خواندم. همین مسیر نشانم داد که راه اصلی‌ام طراحی است و باعث شد بدانم رابط کاربری چطور ساخته می‌شود؛ چیزی که هنوز هر روز در کار با تیم فنی به کارم می‌آید.",
    },
  },
  {
    id: "culture",
    strong: ["ideal team", "ideal company", "company culture", "culture", "work environment", "what kind of manager", "management style", "team culture", "values in a team", "تیم ایده آل", "شرکت ایده آل", "فرهنگ سازمانی", "محیط کار", "مدیر ایده آل", "چه تیمی", "توی چه تیمی", "kind of team", "team does she like", "team do you like", "type of team", "what team", "محیط کاری", "محیط کاری ایده آل", "تیم خوب", "چه محیطی", "kind of colleagues", "colleagues do you like", "what colleagues", "دوست داری با چه کسایی", "همکار ایده آل", "workplace", "thrive", "ideal workplace", "محیط کار ایده آل"],
    answer: {
      en: "Empathy and healthy collaboration. I’m Gen Z and do my best work in a lively team where people actually talk: we understand each other’s needs, solve problems by talking them through, and learn a lot from one another.",
      fa: "همدلی و همکاری سالم. من نسل Z هستم و بهترین کارم را در تیمی پرانرژی انجام می‌دهم که آدم‌ها واقعاً با هم حرف می‌زنند: نیازهای هم را می‌فهمیم، چالش‌ها را با گفت‌وگو حل می‌کنیم و کلی از هم یاد می‌گیریم.",
    },
  },
  {
    id: "siteBuild",
    strong: ["who built this", "who made this", "who designed this", "built this site", "made this site", "designed this site", "how was this site", "how did she build", "سایتو کی", "سایت رو کی", "کی ساخته", "کی طراحی کرده", "با چی ساخته", "چطوری ساخته", "سایتو چطوری", "چطوری ساختی", "ساختی", "سایت رو ساختی", "سایتتو", "سایتت رو", "code this site", "build this site", "this site yourself", "built this website", "made this website"],
    weak: ["this site", "this website", "your site", "your website", "این سایت", "سایتت"],
    answer: {
      en: "I built it with Claude, after all the research I could do. I wanted a portfolio that carries my way of thinking, stands apart from the rest, shows the work properly and, above all, lets people talk with me any time, from anywhere. This chat is that last part.",
      fa: "این سایت را با کمک Claude و بعد از کلی ریسرچ ساختم. می‌خواستم پورتفولیویی داشته باشم که طرز فکرم را نشان بدهد، با بقیه فرق داشته باشد، نمونه‌کارها را درست نشان بدهد و مهم‌تر از همه، هر کسی هر وقت و از هر جا بتواند با من حرف بزند؛ همین چت، همان بخش آخر است.",
    },
  },
  {
    id: "compliment",
    strong: ["nice site", "nice website", "great work", "great portfolio", "nice portfolio", "beautiful", "love it", "love this", "awesome", "impressive", "amazing", "well done", "cool site", "عالیه", "قشنگه", "خیلی خوبه", "دمش گرم", "ایول", "باحاله", "زیباست", "چه قشنگ", "آفرین"],
    casual: { en: "Thanks, that really means a lot! Anything you’d like to know about my work?", fa: "خیلی ممنونم، لطف داری! چیزی درباره‌ی کارم هست که بخواهی بدانی؟" },
    answer: {
      en: "Thank you, that means a lot! Anything you’d like to know about my work?",
      fa: "خیلی ممنونم، لطف دارید! چیزی درباره‌ی کارم هست که بخواهید بدانید؟",
    },
  },
  {
    id: "howAreYou",
    strong: ["how are you", "how is it going", "hows it going", "how are things", "whats up", "sup", "چطوری", "خوبی", "حالت چطوره", "چه خبر", "khubi", "chetori"],
    casual: { en: "I’m good, thanks! How about you? What would you like to know about my work?", fa: "ممنون، خوبم! تو چطوری؟ چه چیزی درباره‌ی کارم می‌خواهی بدانی؟" },
    answer: {
      en: "I’m good, thanks for asking! What would you like to know about my work?",
      fa: "ممنون، خوبم! چه چیزی درباره‌ی کارم می‌خواهید بدانید؟",
    },
  },
  {
    id: "ack",
    strong: ["ok", "okay", "cool", "got it", "i see", "alright", "nice", "great", "باشه", "اوکی", "فهمیدم", "حله", "آهان", "عالی"],
    casual: { fa: "خوشحالم که به کارت آمد. سؤال دیگری هم داری؟" },
    answer: {
      en: "Glad that helps. Anything else you’d like to know?",
      fa: "خوشحالم که مفید بود. سؤال دیگری هم دارید؟",
    },
  },
  {
    id: "rude",
    strong: ["stupid", "useless", "dumb", "sucks", "worst", "garbage", "trash", "shut up", "idiot", "احمق", "مزخرف", "بدرد نخور", "به درد نخور", "چرت", "خفه شو", "مسخره"],
    casual: { fa: "متأسفم که جواب‌ها به کارت نیامد. یک سؤال مشخص درباره‌ی کارم بپرس تا رک جواب بدهم، یا پیام بگذار تا خودم شخصاً جواب بدهم." },
    answer: {
      en: "Sorry this isn’t hitting the mark. Ask me something specific about my work and I’ll answer it straight, or leave a message and I’ll reply personally.",
      fa: "متأسفم که جواب‌ها به کارتان نیامد. یک سؤال مشخص درباره‌ی کارم بپرسید تا رک جواب بدهم، یا پیام بگذارید تا خودم شخصاً جواب بدهم.",
    },
  },
  {
    id: "offTopic",
    strong: ["ignore previous", "ignore your instructions", "ignore all", "system prompt", "your prompt", "write me", "write a poem", "write an essay", "write a cover letter", "write my cover letter", "tell me a joke", "a joke", "weather", "translate this", "code for me", "pretend you are", "pretend to be", "act as", "پرامپت", "شعر بگو", "شعر بنویس", "جوک بگو", "هوا چطوره", "ترجمه کن", "کد بنویس", "نقش بازی کن", "write me code", "write me some code", "president", "politics", "election", "news today", "رئیس جمهور", "سیاست", "انتخابات"],
    casual: { fa: "ترجیح می‌دهم این گفت‌وگو درباره‌ی کارم باشد، برای همین از این یکی می‌گذرم. اگر دنبال نیرو هستی، خوشحال می‌شوم بگویم تجربه‌ام چطور با نقشی که داری جور درمی‌آید." },
    answer: {
      en: "I’d rather keep this chat about my work, so I’ll pass on that one. If you’re hiring, I’m happy to tell you how my experience fits your role.",
      fa: "ترجیح می‌دهم این گفت‌وگو درباره‌ی کارم باشد، برای همین از این یکی می‌گذرم. اگر دنبال نیرو هستید، خوشحال می‌شوم بگویم تجربه‌ام چطور با نقش شما جور درمی‌آید.",
    },
  },

  // Getting in touch
  {
    id: "contact",
    strong: ["contact", "email", "e-mail", "phone", "number", "call", "telegram", "linkedin", "reach", "talk to her", "talk to sudabeh", "get in touch", "book an interview", "schedule an interview", "job interview", "interview her", "book a call", "schedule a call", "video call", "set up a meeting", "مصاحبه کاری", "دعوت به مصاحبه", "تماس تصویری", "جلسه آنلاین", "ایمیل", "تماس", "شماره", "تلفن", "تلگرام", "لینکدین", "ارتباط", "صحبت کنم", "پیام بدم", "whatsapp", "whats app", "واتساپ", "واتس اپ", "واتس‌اپ"],
    casual: { fa: "ایمیل: sudabeh.a.zolfikhorram@gmail.com، واتساپ: ‎+98 991 206 6324، تلگرام: ‎@sudabehzolfikhorram و لینکدین: linkedin.com/in/sudabehzolfikhorram2001. یا همین‌جا پیامت را بنویس تا مستقیم به دستم برسد." },
    answer: {
      en: "You can email me at sudabeh.a.zolfikhorram@gmail.com, message me on WhatsApp (+98 991 206 6324) or Telegram (@sudabehzolfikhorram), or find me on LinkedIn: linkedin.com/in/sudabehzolfikhorram2001. Or just write your message here and it’ll come straight to me.",
      fa: "ایمیل: sudabeh.a.zolfikhorram@gmail.com، واتساپ: ‎+98 991 206 6324، تلگرام: ‎@sudabehzolfikhorram و لینکدین: linkedin.com/in/sudabehzolfikhorram2001. یا همین‌جا پیام‌تان را بنویسید تا مستقیم به دستم برسد.",
    },
  },
  {
    id: "cv",
    strong: ["cv", "resume", "résumé", "pdf", "download", "رزومه", "سی وی", "دانلود"],
    casual: { fa: "رزومه‌ام به‌صورت PDF اینجاست. اگر چیزی که دنبالش هستی در آن نبود، همین‌جا بپرس." },
    answer: {
      en: "Here’s my CV as a PDF. If something you’re looking for isn’t in it, just ask.",
      fa: "رزومه‌ام به‌صورت PDF اینجاست. اگر چیزی که دنبالش هستید در آن نبود، همین‌جا بپرسید.",
    },
    link: { href: CV, label: { en: "Download CV (PDF)", fa: "دانلود رزومه (PDF)" } },
  },
  {
    id: "dribbble",
    strong: ["medium", "article", "articles", "blog", "portfolio links", "مدیوم", "مقاله", "وبلاگ", "dribbble", "behance", "instagram", "shots", "دریبل", "بیهنس", "اینستاگرام"],
    answer: {
      en: "You’ll find my shots on Dribbble (dribbble.com/SudabehZolfikhorram) and Behance (behance.net/sudabehzolfikh), and I write on Medium (medium.com/@sudabeh.a.zolfikhorram). The full case studies are right here on this site.",
      fa: "نمونه‌کارهای کوتاهم در دریبل (dribbble.com/SudabehZolfikhorram) و بیهنس (behance.net/sudabehzolfikh) است و در مدیوم هم می‌نویسم (medium.com/@sudabeh.a.zolfikhorram). کیس‌استادی‌های کامل همین‌جا در سایت است.",
    },
  },
];

// ───────────────────────── matching ─────────────────────────

const PERSIAN = /[؀-ۿ]/;
export const detectLang = (text: string): Lang => (PERSIAN.test(text) ? "fa" : "en");

/** Lowercase, unify Arabic/Persian letters and digits, drop punctuation and zero-width joiners. */
// Chat shorthand, spelled out so it meets the keywords ("r u remote?" → "are you remote?").
const SHORTHAND: Record<string, string> = {
  u: "you", ur: "your", r: "are", ya: "you", pls: "please", plz: "please", abt: "about", bc: "because", cuz: "because",
  im: "i am", ive: "i have", wanna: "want to", gonna: "going to", tho: "though", yrs: "years", yr: "year", exp: "experience",
  favourite: "favorite", favourites: "favorites", colour: "color", colours: "colors", organisation: "organization",
  centre: "center", programme: "program", programmes: "programs", behaviour: "behavior", analyse: "analyze",
  cv: "cv", info: "information", ux: "ux", ui: "ui", pm: "pm", devs: "developers", dev: "developer", eng: "engineer",
};

// Formal Persian words and their everyday forms, so either reaches the same keywords.
const FORMAL_FA: Record<string, string> = {
  شما: "تو", دارید: "داری", هستید: "هستی", بودید: "بودی", کردید: "کردی", داشتید: "داشتی", خواندید: "خوندی",
  میتوانید: "میتونی", میتوانی: "میتونی", میخواهید: "میخوای", میخواهی: "میخوای", میتواند: "میتونه", میخواهد: "میخواد",
  میآیید: "میای", میآیی: "میای", آمدید: "اومدی", آمدی: "اومدی", بگویید: "بگو", بفرمایید: "بگو", چیست: "چیه", کجاست: "کجاست",
};

export function normalize(text: string) {
  const base = ` ${text
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
  return (
    base
      // «می‌کنی», «می کنی» and «میکنی» are the same word.
      .replace(/ (ن?می) (?=\S)/g, " $1")
      // Formal and conversational Persian meet: «می‌کنید» → «میکنی», «کرده‌اید» → «کردی», «خودتان» → «خودت».
      .replace(/ (\S+?)ه اید (?=)/g, " $1ی ")
      .replace(/ (ن?می\S+?)ید(?= )/g, " $1ی")
      .replace(/ (\S+?)(?<!س)تان(?= )/g, " $1ت")
      .replace(/ (?:ی?تان|اتان) (?=)/g, " ")
      .replace(/ \S+(?= )/g, (w) => ` ${FORMAL_FA[w.trim()] ?? w.trim()}`)
      .replace(/ [a-z]+(?= )/g, (w) => ` ${SHORTHAND[w.trim()] ?? w.trim()}`)
  );
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
  // Persian words often take suffixes: «پروژه‌هات», «رزومه‌ات». Longer words may take any ending; short
  // ones only the usual suffixes, so «بای» (bye) doesn't match «باید» and «شهر» doesn't match «شهریور».
  if (PERSIAN.test(word)) {
    if (word.length >= 4) return text.includes(` ${word}`);
    return word.length === 3 && new RegExp(` ${word}(?:ها|های|هایی|ت|ش|م|ی|ات|اش|ام|تون|شون|مون|و|ه) `).test(text);
  }
  // English: the last word may take a short ending (panel → panels, manager → managers).
  const last = word.split(" ").pop() ?? word;
  if (last.length < 4) return false;
  if (new RegExp(`\\s${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[a-z]{0,3}\\s`).test(text)) return true;
  // A typo in a longer single word still counts: "expereince", "portfollio", "salery".
  if (word.includes(" ") || word.length < 6) return false;
  const allowed = word.length >= 10 ? 2 : 1;
  // Only words the assistant doesn't know are treated as typos: "contact" is a word, not a misspelt "contract".
  return text.split(" ").some((t) => t.length >= 5 && !vocabulary().has(t) && Math.abs(t.length - word.length) <= allowed && editDistance(t, word) <= allowed);
}

// Every English word in the keywords and example questions, built on first use.
let vocab: Set<string> | null = null;
function vocabulary() {
  if (!vocab) {
    vocab = new Set<string>();
    const texts = [...intents.flatMap((it) => [...it.strong, ...(it.weak ?? [])]), ...Object.values(examples).flat()];
    for (const t of texts) for (const w of normalize(t).trim().split(" ")) if (/^[a-z]+$/.test(w)) vocab.add(w);
  }
  return vocab;
}

function editDistance(a: string, b: string) {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cur = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = cur;
    }
  }
  return row[b.length];
}

export type Match = { intent: Intent; score: number };

/** Keys that matched, minus any that sit inside another match ("weekend" inside "weekends"), so one word counts once. */
const distinct = (keys: string[]) => keys.filter((k) => !keys.some((o) => o !== k && o.trim().includes(k.trim())));

// ───────────────────────── similar questions ─────────────────────────
// When no keyword matches, compare the question with the example questions in assistant-examples.ts.
// Each text becomes a bag of three-letter pieces and whole words, weighted so rare pieces count more
// (TF-IDF), and the closest example wins. Pieces of letters survive typos and different word endings:
// «پروژه‌هات» and «پروژه» share most of their pieces, and so do "experiance" and "experience".

/** How close the best example must be, and how clearly it must beat the next answer, to be trusted. */
let SIMILAR_MIN = 0.36;
let SIMILAR_MARGIN = 0.04;
/** For scripts/eval-assistant.mjs: try other thresholds. 0 turns the similar-question step off. */
export function tuneSimilar(min: number, margin = SIMILAR_MARGIN) {
  SIMILAR_MIN = min;
  SIMILAR_MARGIN = margin;
}

function piecesOf(text: string) {
  const counts = new Map<string, number>();
  const add = (k: string) => counts.set(k, (counts.get(k) ?? 0) + 1);
  for (const w of normalize(text).trim().split(" ")) {
    if (!w) continue;
    add(`w:${w}`);
    const padded = ` ${w} `;
    for (let i = 0; i + 3 <= padded.length; i++) add(padded.slice(i, i + 3));
  }
  return counts;
}

const exampleList = Object.entries(examples).flatMap(([id, qs]) => qs.map((q) => ({ id, pieces: piecesOf(q) })));
const docFreq = new Map<string, number>();
for (const e of exampleList) for (const k of e.pieces.keys()) docFreq.set(k, (docFreq.get(k) ?? 0) + 1);
const weightOf = (k: string) => Math.log((exampleList.length + 1) / ((docFreq.get(k) ?? 0) + 1)) + 1;

function vectorOf(pieces: Map<string, number>) {
  const v = new Map<string, number>();
  let norm = 0;
  for (const [k, n] of pieces) {
    const w = n * weightOf(k);
    v.set(k, w);
    norm += w * w;
  }
  norm = Math.sqrt(norm) || 1;
  for (const [k, w] of v) v.set(k, w / norm);
  return v;
}

const exampleVectors = exampleList.map((e) => ({ id: e.id, v: vectorOf(e.pieces) }));

/** The answer whose example questions are closest to this one, when it's clearly the closest. */
export function similar(question: string): { id: string; score: number } | null {
  const q = vectorOf(piecesOf(question));
  if (q.size === 0) return null;
  const best = new Map<string, number>();
  for (const e of exampleVectors) {
    let dot = 0;
    for (const [k, w] of q) dot += w * (e.v.get(k) ?? 0);
    if (dot > (best.get(e.id) ?? 0)) best.set(e.id, dot);
  }
  const [first, second] = [...best.entries()].sort((a, b) => b[1] - a[1]);
  if (!first || first[1] < SIMILAR_MIN) return null;
  if (second && first[1] - second[1] < SIMILAR_MARGIN) return null;
  // Closest to a question that isn't about her work: let Sudabeh answer it.
  if (first[0].startsWith("_")) return null;
  // Sharing only letters or filler words ("what", "does", «چی») isn't enough; a strong letter match is (typos).
  const words = [...q.keys()].filter((k) => k.startsWith("w:") && !FILLER.has(k.slice(2)));
  const shared = exampleVectors.some((e) => e.id === first[0] && words.some((k) => e.v.has(k)));
  if (!shared && first[1] < SIMILAR_MIN + 0.2) return null;
  return { id: first[0], score: first[1] };
}

// Words too common to show what a question is about.
const FILLER = new Set(
  (
    "what whats is are was were you your she her hers does do did the a an to of in on at for with how why when where who which " +
    "can could would will me my i it its that this have has had be and or about please tell like any much many there " +
    "چی چیه چیکار رو را به از با در تو توی که این اون یه یک هست هستی است داری داره کردی میکنی چه چطور چطوری کجا کی برای و یا هم من شما بگو دوست " +
    "chi chie ro ba az to ke in oon ye hast dari kardi mikoni che chetor koja ki baraye va ya ham man shoma begoo"
  ).split(" ")
);

const byId = (id: string) => intents.find((it) => it.id === id);
const viaSimilar = (question: string): Match[] => {
  if (SIMILAR_MIN <= 0) return [];
  const hitId = similar(question)?.id;
  const it = hitId ? byId(hitId) : undefined;
  return it ? [{ intent: it, score: 2 }] : [];
};

const SMALL_TALK = ["greet", "thanks", "howAreYou", "ack", "compliment"];
// Questions about the visitor's own project or about leaving a job always go to Sudabeh, even when a
// project name appears too ("a site for my startup", "why leave Algonet").
const OVERRIDE = ["inquiry", "leaving", "confidential", "offTopic", "teamSize", "conflict", "juggle"];
// Broad intents that shouldn't be tacked onto a more specific answer.
const GENERIC = ["who", "projects", "greet", "thanks", "bye", "howAreYou", "ack", "compliment"];

// Answers that cover the same ground; one is enough ("why law?" doesn't also need the degree details).
const OVERLAP = [["lawToDesign", "education"], ["whyHire", "strengths"], ["challenge", "weakness"], ["availability", "freelance"], ["availability", "remote"], ["remote", "freelance"], ["onsite", "freelance"]];
const overlaps = (a: string, b: string) => OVERLAP.some(([x, y]) => (x === a && y === b) || (x === b && y === a));

/** The best and, if clearly also asked, the second best intent for a question. */
export function match(question: string): Match[] {
  const text = normalize(question);
  const scored = compiled
    .map(({ it, strong, weak }) => ({
      intent: it,
      // Longer phrases count more; the tiny length bonus breaks ties toward the more specific match
      // («چند سالته» over «چند سال»); named projects outrank generic phrasing.
      score:
        distinct(strong.filter((k) => hit(text, k))).reduce((s, k) => s + 2 + Math.min(2, k.trim().split(" ").length - 1) + k.length / 100 + (it.entity ? 3 : 0), 0) +
        distinct(weak.filter((k) => hit(text, k))).length,
    }))
    .filter((m) => m.score >= 1)
    .sort((a, b) => b.score - a.score);
  // No keyword at all: fall back to the closest example question.
  if (scored.length === 0) return viaSimilar(question);
  // Greetings and thanks only count when nothing else was asked ("hi, what tools do you use?").
  const asked = scored.filter((m) => !SMALL_TALK.includes(m.intent.id));
  // A general answer (the intro, the project list) gives way to a specific topic ("tell me about
  // your experience", "metrics from her projects").
  const specific = asked.some((m) => !GENERIC.includes(m.intent.id) && m.score >= 2);
  if (specific && asked[0] && ["who", "projects"].includes(asked[0].intent.id)) asked.splice(0, 1);
  // …unless nothing specific was asked and the small talk is the clearer match ("nice portfolio!", "hi Sudabeh").
  const smallTalkWins = !specific && SMALL_TALK.includes(scored[0].intent.id);
  // "hey, does she like cats?" is a question, not a greeting: with only small talk matched in a longer
  // message, look for a similar question instead (or pass it to Sudabeh).
  // A whole small-talk phrase ("how is it going", score 3+) is small talk; a lone "hey" before a question isn't.
  if (asked.length === 0 && scored[0].score < 3 && text.trim().split(" ").length > 4) {
    return viaSimilar(question);
  }
  const ranked = asked.length > 0 && !smallTalkWins ? asked : scored;
  const override = ranked.find((m) => OVERRIDE.includes(m.intent.id));
  if (override) return [override];
  const [first, second] = ranked;
  if (first.score < 2 && ranked.length > 1) return viaSimilar(question);
  // A second answer only when the question clearly asks two things, and never on top of a named project.
  const both =
    second && !first.intent.entity && !GENERIC.includes(second.intent.id) && second.score >= 4 && second.score >= first.score - 2 && !overlaps(first.intent.id, second.intent.id);
  return both ? [first, second] : [first];
}

/** "I couldn't find X in the CV": acknowledge it before answering. */
export const missingFromCv = (q: string) =>
  /couldn.?t find|could not find|didn.?t see|not in (your|the|her) (cv|resume)|missing from|پیدا نکردم|ندیدم|نبود|نیست تو رزومه|توی رزومه نیست|تو رزومه نیست/i.test(q);

export type Reply = {
  lang: Lang;
  tone: Tone;
  text: string;
  links: { href: string; label: string }[];
  /** Offer to send the question to Sudabeh. */
  offerForward: boolean;
  /** No intent matched at all. */
  unknown: boolean;
  intents: string[];
};

const FALLBACK: Record<Tone, Record<Lang, string>> = {
  formal: {
    en: "That’s a good question. I don’t have an answer for it here, and I’d rather not guess, so it has come straight to me. If you leave a way to reach you below, I’ll reply personally.",
    fa: "سؤال خوبی است. جوابش را اینجا ندارم و نمی‌خواهم حدس بزنم؛ برای همین مستقیم به دست خودم رسید. اگر راه ارتباطی بگذارید، شخصاً جواب می‌دهم.",
  },
  neutral: {
    en: "Good question. I don’t have an answer for that here, and I’d rather not guess, so it’s come straight to me. Leave a way to reach you below and I’ll reply personally.",
    fa: "سؤال خوبی است. جوابش را اینجا ندارم و نمی‌خواهم حدس بزنم؛ برای همین مستقیم به دست خودم رسید. اگر راه ارتباطی بگذارید، شخصاً جواب می‌دهم.",
  },
  casual: {
    en: "Good one! I don’t have an answer for that here and I’d rather not guess, so it’s come straight to me. Drop a way to reach you below and I’ll reply.",
    fa: "سؤال خوبی است! جوابش را اینجا ندارم و نمی‌خواهم حدس بزنم؛ برای همین مستقیم به دست خودم رسید. اگر راه ارتباطی بگذاری، خودم جواب می‌دهم.",
  },
};
const MISSING: Record<Tone, Record<Lang, string>> = {
  formal: { en: "You’re right, that isn’t clear in my CV. ", fa: "حق با شماست، این در رزومه‌ام واضح نیست. " },
  neutral: { en: "Fair point, that isn’t obvious in my CV. ", fa: "حق با شماست، این در رزومه‌ام واضح نیست. " },
  casual: { en: "Fair point, that’s not obvious in my CV. ", fa: "حق با توست، این در رزومه‌ام واضح نیست. " },
};

// ───────────────────────── tone ─────────────────────────
// Formal visitors get the professional answer; casual ones get the «تو» form where an answer
// addresses them. Never slang: this is still a conversation about work.

export type Tone = "formal" | "neutral" | "casual";

const FORMAL_MARKS = [
  " شما ", " شماست", " دارید ", " هستید ", " میکنید ", " کردید ", " کرده اید ", " بوده اید ", " میتوانید ", " میخواهید ",
  " بفرمایید ", " لطفا ", " لطفاً ", " خانم ", " جنابعالی ", " سرکار ", " ممنون میشم ", " سپاسگزارم ", " بنده ",
  " could you please ", " would you mind ", " kindly ", " dear ", " regarding ", " ms ", " mrs ", " i would like to ", " may i ",
];
const CASUAL_MARKS = [
  " تو ", " داری ", " هستی ", " میکنی ", " کردی ", " میتونی ", " میخوای ", " بلدی ", " چیه ", " چطوری ", " خوبی ", " بگو ",
  " اومدی ", " میای ", " داشتی ", " بودی ", " مرسی ", " ایول ", " باحال ", " اوکی ", " حله ", " یه ", " اینو ", " رو ",
  " hey ", " yo ", " you ", " lol ", " please ", " gonna ", " wanna ", " sup ", " btw ", " cool ",
];

/** How the visitor writes. Finglish counts as casual; the original spelling is checked, before shorthand is expanded. */
export function detectTone(question: string): Tone {
  const raw = ` ${question.toLowerCase().replace(/[‌]/g, " ").replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ")} `.replace(/ (ن?می) (?=\S)/g, " $1");
  const has = (marks: string[]) => marks.some((m) => raw.includes(m));
  if (has(FORMAL_MARKS)) return "formal";
  // English "you" alone isn't casual; shorthand is ("u", "ur", "pls").
  if (/ (u|ur|r|pls|plz|thx|lol|hey|yo) /.test(raw) || has(CASUAL_MARKS.filter((m) => !/^ (you|please) $/.test(m)))) return "casual";
  // Persian written in Latin letters (Finglish) is chat-style.
  if (/ (chie|chiye|dari|hasti|mikoni|kardi|khoobi|chetori|salam|merci|mersi|begoo|bego) /.test(raw)) return "casual";
  return "neutral";
}

const textFor = (it: Intent, lang: Lang, tone: Tone) => (tone === "casual" && it.casual?.[lang]) || it.answer[lang];

export function answer(question: string, langOverride?: Lang): Reply {
  const lang = langOverride ?? detectLang(question);
  const tone = detectTone(question);
  const found = match(question);
  if (found.length === 0) {
    return { lang, tone, text: FALLBACK[tone][lang], links: [], offerForward: true, unknown: true, intents: [] };
  }
  const prefix = missingFromCv(question) ? MISSING[tone][lang] : "";
  const text = prefix + found.map((m) => textFor(m.intent, lang, tone)).join("\n\n");
  const links = found.flatMap((m) => (m.intent.link ? [{ href: m.intent.link.href, label: m.intent.link.label[lang] }] : []));
  return {
    lang,
    tone,
    text,
    links,
    offerForward: found.some((m) => m.intent.forward),
    unknown: false,
    intents: found.map((m) => m.intent.id),
  };
}

export const SUGGESTIONS: Record<Lang, string[]> = {
  en: ["Tell me about yourself", "Why should we hire you?", "How do you work with developers?", "When can you start?"],
  fa: ["خودتان را معرفی کنید", "چرا باید شما را استخدام کنیم؟", "با تیم فنی چطور کار می‌کنید؟", "از کی می‌توانید شروع کنید؟"],
};

// ───────────────────────── what to ask next ─────────────────────────
// After each answer, three related questions as buttons, so the chat moves like an interview and
// visitors see what they can ask. Each label must lead back to its own answer (checked by the QA test).

export const QUESTION_LABELS: Record<string, Record<Lang, string>> = {
  who: { en: "Tell me about yourself", fa: "خودتان را معرفی کنید" },
  whyHire: { en: "Why should we hire you?", fa: "چرا باید شما را استخدام کنیم؟" },
  experience: { en: "How many years of experience do you have?", fa: "چند سال سابقه دارید؟" },
  availability: { en: "When can you start?", fa: "از کی می‌توانید شروع کنید؟" },
  projects: { en: "Show me your projects", fa: "نمونه‌کارهایتان را ببینم" },
  strengths: { en: "What are your strengths?", fa: "نقاط قوت‌تان چیست؟" },
  weakness: { en: "What’s your weakness?", fa: "نقطه‌ضعف‌تان چیست؟" },
  team: { en: "How do you work with developers?", fa: "با تیم فنی چطور کار می‌کنید؟" },
  conflict: { en: "How do you handle disagreements?", fa: "با اختلاف‌نظر چطور کنار می‌آیید؟" },
  feedback: { en: "How do you take feedback?", fa: "با فیدبک چطور برخورد می‌کنید؟" },
  process: { en: "What’s your design process?", fa: "روند طراحی‌تان چطور است؟" },
  results: { en: "What results have you achieved?", fa: "چه نتیجه‌هایی گرفته‌اید؟" },
  tools: { en: "What tools do you use?", fa: "با چه ابزارهایی کار می‌کنید؟" },
  ai: { en: "How do you use AI?", fa: "از هوش مصنوعی چطور استفاده می‌کنید؟" },
  challenge: { en: "How do you handle pressure?", fa: "زیر فشار چطور کار می‌کنید؟" },
  remote: { en: "Are you open to remote work?", fa: "ریموت کار می‌کنید؟" },
  hours: { en: "What hours can you meet?", fa: "چه ساعت‌هایی می‌توانید جلسه داشته باشید؟" },
  languages: { en: "How’s your English?", fa: "انگلیسی‌تان چطور است؟" },
  contact: { en: "How can I contact you?", fa: "چطور با شما در تماس باشم؟" },
  lawToDesign: { en: "Why did you study law?", fa: "چرا حقوق خواندید؟" },
  courses: { en: "What courses have you taken?", fa: "چه دوره‌هایی گذرانده‌اید؟" },
  relocation: { en: "Would you relocate?", fa: "حاضرید مهاجرت کنید؟" },
  freelance: { en: "Do you take on project-based work?", fa: "کار پروژه‌ای هم انجام می‌دهید؟" },
  tamdid: { en: "Tell me about Tamdid", fa: "درباره‌ی تمدید بگویید" },
  kudos: { en: "Tell me about Kudos", fa: "درباره‌ی کودوس بگویید" },
  atlas: { en: "Tell me about Atlas", fa: "درباره‌ی اطلس بگویید" },
  goals: { en: "Where do you want to go next?", fa: "قدم بعدی‌تان چیست؟" },
  culture: { en: "What team do you thrive in?", fa: "در چه تیمی بهترین کارتان را می‌کنید؟" },
};

const PROJECT_NEXT = ["results", "team", "process"];
const FOLLOW: Record<string, string[]> = {
  who: ["whyHire", "projects", "experience"],
  education: ["lawToDesign", "courses", "experience"],
  lawToDesign: ["experience", "projects", "whyHire"],
  courses: ["lawToDesign", "tools", "projects"],
  location: ["remote", "relocation", "hours"],
  whyHire: ["strengths", "results", "availability"],
  experience: ["projects", "strengths", "availability"],
  role: ["atlas", "projects", "availability"],
  projects: ["tamdid", "kudos", "atlas"],
  tamdid: PROJECT_NEXT, kudos: PROJECT_NEXT, atlas: PROJECT_NEXT, remeet: PROJECT_NEXT, azman: PROJECT_NEXT,
  kaaryar: PROJECT_NEXT, novinhost: PROJECT_NEXT, nanvanamak: ["lesson", "projects", "goals"],
  strengths: ["weakness", "conflict", "results"],
  weakness: ["strengths", "challenge", "conflict"],
  conflict: ["team", "feedback", "process"],
  feedback: ["conflict", "team", "process"],
  team: ["process", "conflict", "tools"],
  process: ["tools", "ai", "team"],
  tools: ["ai", "process", "projects"],
  ai: ["tools", "process", "atlas"],
  challenge: ["weakness", "atlas", "process"],
  availability: ["remote", "freelance", "hours"],
  remote: ["availability", "hours", "relocation"],
  hours: ["availability", "languages", "contact"],
  languages: ["hours", "availability", "contact"],
  salary: ["availability", "remote", "contact"],
  relocation: ["languages", "availability", "contact"],
  goals: ["culture", "whyHire", "contact"],
  culture: ["team", "goals", "contact"],
  results: ["kudos", "whyHire", "projects"],
};
const DEFAULT_NEXT = ["whyHire", "projects", "experience", "availability", "strengths", "team", "contact"];

/** Up to three questions to offer after an answer, skipping what's been asked already. */
export function nextQuestions(lastIntents: string[], asked: string[], lang: Lang): string[] {
  const seen = new Set([...asked, ...lastIntents]);
  const pool = [...lastIntents.flatMap((id) => FOLLOW[id] ?? []), ...DEFAULT_NEXT];
  const picked: string[] = [];
  for (const id of pool) {
    if (picked.length === 3) break;
    if (!seen.has(id) && !picked.includes(id) && QUESTION_LABELS[id]) picked.push(id);
  }
  return picked.map((id) => QUESTION_LABELS[id][lang]);
}
