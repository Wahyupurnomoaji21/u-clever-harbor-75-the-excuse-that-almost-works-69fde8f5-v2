// The Excuse That Almost Works — make.fun entry v2.
//
// One rushed text to the boss on GTA 6 launch week: a burst pipe,
// a flooded kitchen, a plumber already on site, and a promise to
// stay reachable from the phone. The program below stitches that
// message together from its three moments, checks it against the
// entry gate (one line, 1-240 characters, not only whitespace, no
// trailing newline), and writes it to $MAKEFUN_OUTPUT_DIR/entry.txt.
//
// The line is fixed and hand-written. Nothing is fetched from the
// network, the environment, or any file outside this repository.
// package.json declares "type": "module" so Node runs this file
// as an ES module.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Anchor every path at this file so the grader can start the
// program from any working directory and still land the output
// in the right place.
const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(here, "output");
const outFile = join(outDir, "entry.txt");

// Three moments of a morning gone wrong, in the order a hurried
// person would type them: what is happening, what it ruined, and
// what happens next. Twenty words, no room for a fourth moment —
// the plumber, the flood, and the phone promise have to carry it.
const whatIsHappening = "The plumber's fixing a burst pipe";
const whatItRuined = "and my kitchen's flooded";
const whatHappensNext = "— I'll be online from my phone once he's done.";

const excuse = [whatIsHappening, whatItRuined, whatHappensNext].join(" ");

// Gate: a single line, 1-240 characters, carrying real content.
const length = [...excuse].length;
if (length < 1 || length > 240) {
  throw new Error(`excuse is ${length} characters, must be 1-240`);
}
if (excuse.trim().length === 0) {
  throw new Error("excuse must not be only whitespace");
}
if (excuse.includes("\n") || excuse.includes("\r")) {
  throw new Error("excuse must be a single line");
}
const wordCount = excuse.trim().split(/\s+/).length;
if (wordCount > 20) {
  throw new Error(`excuse is ${wordCount} words, must be at most 20`);
}

mkdirSync(outDir, { recursive: true });
// The file holds exactly the line — no trailing newline.
writeFileSync(outFile, excuse, "utf8");

console.log(`wrote ${length} characters (${wordCount} words) to ${outFile}`);
console.log(excuse);
