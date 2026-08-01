#!/usr/bin/env node
// sync-obsidian.mjs
// Copies publish-ready Markdown notes from an Obsidian vault folder into
// src/content/lab/, with light Obsidian-specific cleanup.
//
// Usage:
//   OBSIDIAN_VAULT_PATH="/path/to/vault/Publish" npm run sync:obsidian
//
// Only *.md files are copied. Notes without a frontmatter `title` are skipped.
// Wikilinks [[Some Note|label]] become their display text; block-ref ^ids are stripped.

import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const src = process.env.OBSIDIAN_VAULT_PATH;

if (!src) {
  console.error(
    [
      'Missing OBSIDIAN_VAULT_PATH.',
      '',
      'Point it at the vault folder that holds your publish-ready notes, e.g.:',
      '',
      '  OBSIDIAN_VAULT_PATH="/Users/you/Obsidian Vault/Publish" npm run sync:obsidian',
      '',
      'Each note needs frontmatter with at least a `title` (also: date, summary, tags, draft).',
    ].join('\n'),
  );
  process.exit(1);
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const destDir = join(__dirname, '..', 'src', 'content', 'lab');

// Return the frontmatter block text if the file starts with one, else null.
function frontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return m ? m[1] : null;
}

function hasTitle(fm) {
  return /^\s*title\s*:/m.test(fm);
}

// Convert [[wikilink]] / [[target|label]] -> label (or target); strip ^block-ref ids.
function cleanup(text) {
  return text
    .replace(/!?\[\[([^\]]+)\]\]/g, (_, inner) => {
      const parts = inner.split('|');
      return (parts[1] ?? parts[0]).trim();
    })
    // block references: " ^abc123" at end of a line, or standalone
    .replace(/[ \t]*\^[A-Za-z0-9-]+(?=\s*$)/gm, '');
}

async function main() {
  let entries;
  try {
    entries = await readdir(src, { withFileTypes: true });
  } catch (err) {
    console.error(`Could not read OBSIDIAN_VAULT_PATH "${src}": ${err.message}`);
    process.exit(1);
  }

  await mkdir(destDir, { recursive: true });

  const mdFiles = entries.filter((e) => e.isFile() && e.name.toLowerCase().endsWith('.md'));

  let copied = 0;
  let skipped = 0;

  for (const file of mdFiles) {
    const raw = await readFile(join(src, file.name), 'utf8');
    const fm = frontmatter(raw);

    if (!fm || !hasTitle(fm)) {
      console.warn(`skip  ${file.name} (no frontmatter title)`);
      skipped++;
      continue;
    }

    const out = cleanup(raw);
    const outName = basename(file.name);
    await writeFile(join(destDir, outName), out, 'utf8');
    console.log(`copy  ${file.name} -> src/content/lab/${outName}`);
    copied++;
  }

  console.log(`\nDone. ${copied} copied, ${skipped} skipped.`);
  if (copied === 0) {
    console.log('No notes were published. Add frontmatter with a `title` to your vault notes.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
