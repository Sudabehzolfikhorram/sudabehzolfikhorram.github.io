// Asks the AI backend (the "ask" action of the Apps Script in docs/contact-form.gs).
// Returns null whenever it can't answer (no key set up, quota, timeout, network),
// so the caller falls back to the built-in answers in assistant.ts.
import type { Lang } from "@/lib/assistant";
import { visitorId } from "@/lib/contact";
import { site } from "@/lib/content";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
// Long enough for a considered answer, short enough that a stuck request doesn't leave the visitor waiting.
const TIMEOUT_MS = 25_000;

/** The ids the backend may return, and where each one leads. Mirrors the Links list in public/assistant/knowledge.md. */
export const LINKS: Record<string, { href: string; label: Record<Lang, string> }> = {
  work: { href: "/work", label: { en: "See all projects", fa: "همه‌ی پروژه‌ها" } },
  cv: { href: `${BASE}/Sudabeh-Zolfi-Khorram-Resume.pdf`, label: { en: "Download CV (PDF)", fa: "دانلود رزومه (PDF)" } },
  contact: { href: "/contact", label: { en: "Contact page", fa: "صفحه‌ی تماس" } },
  about: { href: "/about", label: { en: "Her story", fa: "داستان سودابه" } },
  experience: { href: "/experience", label: { en: "Career", fa: "سوابق کاری" } },
  atlas: { href: "/work/atlas", label: { en: "About Atlas", fa: "درباره‌ی اطلس" } },
  tamdid: { href: "/work/tamdid", label: { en: "Tamdid case study", fa: "کیس‌استادی تمدید" } },
  kudos: { href: "/work/kudos", label: { en: "Kudos case study", fa: "کیس‌استادی کودوس" } },
  remeet: { href: "/work/remeet", label: { en: "About Remeet", fa: "درباره‌ی ریمیت" } },
  azman: { href: "/work/azman", label: { en: "AzMan case study", fa: "کیس‌استادی ازمان" } },
  "azman-erp": { href: "/work/azman-erp", label: { en: "AzMan ERP", fa: "ERP ازمان" } },
  hamgam: { href: "/work/hamgam", label: { en: "Hamgam Saz", fa: "همگام‌ساز" } },
  novinhost: { href: "/work/novinhost", label: { en: "Novin Host case study", fa: "کیس‌استادی نوین هاست" } },
  kaaryar: { href: "/work/kaaryar", label: { en: "Studio Kaaryar case study", fa: "کیس‌استادی کاریار استودیو" } },
  nanvanamak: { href: "/work/nanvanamak", label: { en: "The Nan va Namak story", fa: "داستان نان و نمک" } },
};

export type Turn = { role: "user" | "assistant"; text: string };

export type RemoteReply = {
  text: string;
  lang: Lang;
  forward: boolean;
  links: { href: string; label: string }[];
};

type Wire = { ok?: boolean; answer?: string; lang?: string; forward?: boolean; links?: string[]; error?: string };

// Once the backend says it isn't set up, stop asking it for the rest of the visit.
let unavailable = false;

export async function askRemote(question: string, history: Turn[], lang: Lang): Promise<RemoteReply | null> {
  if (unavailable || !site.contactEndpoint) return null;
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    // text/plain keeps this a simple request, so the browser skips a CORS preflight Apps Script can't answer.
    const res = await fetch(site.contactEndpoint, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action: "ask", question, history, lang, id: visitorId(), page: window.location.href }),
      signal: controller.signal,
    });
    const data = (await res.json().catch(() => null)) as Wire | null;
    if (!data?.ok || !data.answer) {
      // No key yet, or an older script without the "ask" action (it rejects the request as an empty message).
      if (data?.error === "not_configured" || data?.error === "invalid" || data?.ok) unavailable = true;
      return null;
    }
    const replyLang: Lang = data.lang === "fa" ? "fa" : "en";
    return {
      text: data.answer.trim(),
      lang: replyLang,
      forward: Boolean(data.forward),
      links: (data.links ?? []).flatMap((id) => (LINKS[id] ? [{ href: LINKS[id].href, label: LINKS[id].label[replyLang] }] : [])),
    };
  } catch {
    return null;
  } finally {
    window.clearTimeout(timer);
  }
}
