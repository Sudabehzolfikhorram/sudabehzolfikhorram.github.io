// Writes docs/assistant-answers.md from the built-in answers, so the doc always matches the code:
// `npm run docs:assistant`.
import { writeFileSync } from "node:fs";
import { answer, intents } from "../src/lib/assistant.ts";
import { cases } from "./assistant-cases.mjs";

const lines = [
  "# جواب‌های آماده‌ی دستیار «از من بپرسید»",
  "",
  "> این فایل خودکار از `src/lib/assistant.ts` ساخته می‌شود (`npm run docs:assistant`)؛ دستی ویرایشش نکنید.",
  "",
  "وقتی هوش مصنوعی روشن است، دستیار جواب‌ها را خودش از روی `public/assistant/knowledge.md` می‌سازد و این جواب‌ها فقط پشتیبان‌اند (وقتی AI در دسترس نیست). راهنمای کامل: `docs/assistant-setup.md`.",
  "",
  "- 📨 یعنی سؤال همان لحظه برای سودابه فرستاده می‌شود (ایمیل + تلگرام).",
  "- 🔗 یعنی یک لینک هم زیر جواب می‌آید.",
  "- «نمونه سؤال»ها از تست QA (`scripts/assistant-cases.mjs`) می‌آیند و همه پاس می‌شوند.",
  "",
];
intents.forEach((it, i) => {
  const samples = cases.filter(([, id]) => id === it.id).map(([q]) => q);
  const marks = `${it.forward ? " 📨" : ""}${it.link ? " 🔗" : ""}`;
  lines.push(`## ${i + 1}. \`${it.id}\`${marks}`, "");
  if (samples.length) lines.push(`نمونه سؤال: ${samples.slice(0, 3).map((q) => `«${q}»`).join("، ")}`, "");
  lines.push(it.answer.fa, "", `> ${it.answer.en}`, "");
});
const unknown = answer("Does she like cats?");
lines.push("## وقتی جواب را نمی‌داند 📨", "", answer("گربه دوست داره؟").text, "", `> ${unknown.text}`, "");
writeFileSync(new URL("../docs/assistant-answers.md", import.meta.url), lines.join("\n"));
console.log(`docs/assistant-answers.md: ${intents.length} answers`);
