// How well the built-in answers understand questions nobody wrote down: `npm run eval:assistant`.
// Right = the expected answer; Wrong = a different answer (the worst outcome); Passed on = sent to Sudabeh
// although an answer existed. Prints the misses for the current settings, then a threshold sweep.
import { answer, tuneSimilar } from "../src/lib/assistant.ts";
import { heldout } from "./assistant-heldout.mjs";

function run(log = false) {
  let right = 0, wrong = 0, passed = 0;
  for (const [q, want] of heldout) {
    const ok = Array.isArray(want) ? want : [want];
    const got = answer(q).intents[0] ?? "";
    if (ok.includes(got)) right++;
    else if (got === "") passed++;
    else wrong++;
    if (log && !ok.includes(got)) console.log(`  ${got ? "✗ wrong " : "· passed"}  «${q}» → ${got || "(to Sudabeh)"}, expected ${ok.map((w) => w || "(to Sudabeh)").join(" or ")}`);
  }
  return { right, wrong, passed };
}

const pct = (n) => `${Math.round((100 * n) / heldout.length)}%`;
const show = (label, r) => console.log(`${label.padEnd(24)} right ${pct(r.right).padStart(4)}   wrong ${pct(r.wrong).padStart(4)}   passed on ${pct(r.passed).padStart(4)}`);

console.log(`Held-out questions: ${heldout.length}\n\nMisses with the current settings:`);
const current = run(true);
console.log("");
show("Current settings", current);
tuneSimilar(0);
show("Keywords only", run());
for (const min of [0.28, 0.32, 0.36, 0.4, 0.44, 0.48]) {
  tuneSimilar(min, 0.04);
  show(`Similar ≥ ${min}`, run());
}
