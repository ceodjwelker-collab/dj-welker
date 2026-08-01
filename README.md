# djwelker.com — Astro rebuild

Personal portfolio for DJ Welker, re-platformed from a hand-coded static site to **Astro**
so content is centralized, SEO is correct, and case studies / Lab posts can flow from Obsidian.

## Run locally
```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output (Vercel adapter)
npm run preview
```

## Deploy to production (djwelker.com)
This repo is connected to Vercel (project `dj-welker`). Vercel auto-builds on push to `main`.

If you're replacing the old flat-HTML repo with this project:
```bash
# from inside your local clone of ceodjwelker-collab/dj-welker, on a clean branch:
git switch -c astro-rebuild
# copy every file from this project into the repo root (including vercel.json, .gitignore, src/, public/, astro.config.mjs, package.json), then:
git add -A
git commit -m "Re-platform djwelker.com to Astro: fix SEO/canonical/OG, real content, Logo Design section, analytics"
git push -u origin astro-rebuild        # Vercel builds a PREVIEW url for this branch — check it
# once the preview looks right:
git switch main && git merge astro-rebuild && git push   # goes live on djwelker.com
```
In Vercel → Project → Settings, confirm **Framework Preset = Astro** (vercel.json already sets it).

## What changed vs. the old site
- Canonical + Open Graph URLs now resolve to **https://djwelker.com** (were pointing at dj-welker.vercel.app — a real SEO problem).
- Fixed every broken `og:image` (was `/assets/brand/og.png`, now `/og.png`).
- Clean routes (`/work/shiftly`, not `/work/shiftly.html`); case-study canonicals fixed.
- Centralized `<head>`/SEO in `src/layouts/Base.astro`; single source of project data in `src/data/projects.ts`.
- New **/logos** Logo Design showcase.
- Vercel Web Analytics enabled.
- Design system (`src/styles/dj.css`) and all interactions (`public/dj.js`) preserved.

## Publishing from Obsidian
Lab posts live in `src/content/lab/*.md` (an Astro content collection). You can write them
straight in the repo, or author them in Obsidian and sync them over.

1. Keep publish-ready notes in one vault folder (e.g. `Publish/`). Each note needs frontmatter:
   ```yaml
   ---
   title: "Your post title"
   date: 2026-07-31
   summary: "One-line description used for the card + SEO."
   tags: ["build", "systems"]
   draft: false
   ---
   ```
   `title`, `date`, and `summary` are required; `tags` defaults to `[]`, `draft` to `false`.
2. Run the sync (copies `*.md`, converts `[[wikilinks]]` → text, strips `^block-ref` ids, skips
   notes with no `title`):
   ```bash
   OBSIDIAN_VAULT_PATH="/path/to/vault/Publish" npm run sync:obsidian
   ```
3. Commit and push. Vercel rebuilds and the posts go live at **/lab** (each at `/lab/<slug>`).

Set `draft: true` in a note's frontmatter to keep it out of the build.

## Structure
- `src/layouts/Base.astro` — head, SEO, nav, footer, analytics.
- `src/data/projects.ts` — all project/case-study data (edit here to update Work).
- `src/pages/**` — routes. `src/pages/work/[slug].astro` renders case studies.
- `public/assets/logos`, `public/assets/shots` — brand marks + screenshots.

## Open TODOs (need DJ)
- Real **LinkedIn** and **TikTok** URLs (currently omitted — not invented).
- **Titanium Detailing** live domain (case page has no live link yet).
- **The Mobile Bar** — confirm exact registered name (the "247") + any metrics.
- Fresh live-app screenshots for Titanium / STAKE / AUXTION / LIFTWAVE / CE OS (blocked from this environment; capture via browser).
- Confirm the cream/forest-green personal brand vs. the CE OS dark+amber system.
