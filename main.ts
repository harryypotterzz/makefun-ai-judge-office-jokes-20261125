// Make the AI Judge Laugh: Office Jokes — entry program.
// Writes one office joke (under 200 characters) to /output/entry.txt.
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "My manager asked for a quick sync. It's been 47 minutes. I have aged. The doc is still loading.";

// The gate accepts 1–199 characters; fail fast instead of writing an invalid entry.
if (JOKE.length < 1 || JOKE.length > 199) {
  throw new Error(`Joke must be 1–199 characters, got ${JOKE.length}`);
}

const OUTPUT_DIR = "/output";
const ENTRY_FILE = join(OUTPUT_DIR, "entry.txt");

// The grader bind-mounts /output, so create it if missing but never delete it.
mkdirSync(OUTPUT_DIR, { recursive: true });

// Clear the CONTENTS of /output only — never the directory itself.
for (const name of readdirSync(OUTPUT_DIR)) {
  rmSync(join(OUTPUT_DIR, name), { recursive: true, force: true });
}

writeFileSync(ENTRY_FILE, JOKE, "utf8");

// Read back and confirm the file holds exactly the joke.
if (readFileSync(ENTRY_FILE, "utf8") !== JOKE) {
  throw new Error("Written entry does not match the joke");
}
console.log(`Wrote ${JOKE.length} characters to ${ENTRY_FILE}`);
