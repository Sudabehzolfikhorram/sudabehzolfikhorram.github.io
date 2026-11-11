// QA for the built-in answers (the fallback when the AI backend isn't available): `npm run test:assistant`.
// The cases live in assistant-cases.mjs. Add one for every bug you find.
import { answer, detectTone, QUESTION_LABELS } from "../src/lib/assistant.ts";
import { cases } from "./assistant-cases.mjs";

let failed = 0;
for (const [q, want, forward] of cases) {
  const r = answer(q);
  const got = r.intents[0] ?? "";
  const ok = got === want && r.offerForward === forward;
  if (!ok) {
    failed++;
    console.log(`✗ ${q}\n    expected ${want || "(fallback)"}${forward ? " + forward" : ""}, got ${r.intents.join(" + ") || "(fallback)"}${r.offerForward ? " + forward" : ""}`);
  }
}
// Tone: formal visitors get «شما», casual ones «تو»; neither gets slang.
const tones = [
  ["سلام، لطفاً بفرمایید چند سال سابقه دارید؟", "formal"],
  ["Could you please tell me about your experience?", "formal"],
  ["سلام خوبی؟ چند سال سابقه داری؟", "casual"],
  ["hey u open to remote?", "casual"],
  ["chand sal sabeghe dari", "casual"],
  ["What tools do you use?", "neutral"],
  ["How many years of experience?", "neutral"],
];
for (const [q, want] of tones) {
  const got = detectTone(q);
  if (got !== want) {
    failed++;
    console.log(`✗ tone «${q}» should be ${want}, got ${got}`);
  }
}
// The casual reply really addresses the visitor as «تو».
if (!answer("سلام خوبی؟ ایمیلت چیه؟").text.includes("بنویس")) {
  failed++;
  console.log("✗ a casual visitor should get the «تو» form of the contact answer");
}

// Every suggested follow-up question must lead to its own answer.
let labels = 0;
for (const [id, l] of Object.entries(QUESTION_LABELS)) {
  for (const q of [l.en, l.fa]) {
    labels++;
    const got = answer(q).intents[0];
    if (got !== id) {
      failed++;
      console.log(`✗ suggestion «${q}» should answer ${id}, got ${got ?? "(fallback)"}`);
    }
  }
}
const total = cases.length + labels + tones.length + 1;
console.log(`\n${total - failed}/${total} passed (${cases.length} questions, ${labels} suggested follow-ups, ${tones.length + 1} tone checks)`);
process.exit(failed ? 1 : 0);
