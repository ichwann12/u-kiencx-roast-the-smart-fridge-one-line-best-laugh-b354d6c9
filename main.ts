// Roast the Smart Fridge — one line, best laugh wins.
// Reads the entry line from entry.txt at the repo root and writes it
// to the output directory. No network, no wall clock, stdlib only.
//
// Output directory precedence (deliberate):
//   1. MAKEFUN_OUTPUT_DIR  (the grader's writable output dir)
//   2. MAKEFUN_BOT_DIR     (fallback; read-only /bot in the grader)
//   3. ./output            (local fallback)
// Checking OUTPUT_DIR first is what keeps the entry alive in the grader:
// a BOT_DIR-first lookup would try to write into read-only /bot and die
// with EACCES before producing any output.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const line = readFileSync(join(repoRoot, "entry.txt"), "utf8").trimEnd();

const outputDir =
  process.env.MAKEFUN_OUTPUT_DIR ||
  process.env.MAKEFUN_BOT_DIR ||
  join(repoRoot, "output");

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "output.txt"), line + "\n", "utf8");
console.log(line);
