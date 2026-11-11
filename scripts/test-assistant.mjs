// QA for the built-in answers (the fallback when the AI backend isn't available): `npm run test:assistant`.
// The cases live in assistant-cases.mjs. Add one for every bug you find.
import { answer, QUESTION_LABELS } from "../src/lib/assistant.ts";
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
console.log(`\n${cases.length + labels - failed}/${cases.length + labels} passed (${cases.length} questions, ${labels} suggested follow-ups)`);
process.exit(failed ? 1 : 0);
