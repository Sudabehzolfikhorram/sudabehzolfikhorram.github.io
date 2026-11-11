// QA for the built-in answers (the fallback when the AI backend isn't available): `npm run test:assistant`.
// The cases live in assistant-cases.mjs. Add one for every bug you find.
import { answer } from "../src/lib/assistant.ts";
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
console.log(`\n${cases.length - failed}/${cases.length} passed`);
process.exit(failed ? 1 : 0);
