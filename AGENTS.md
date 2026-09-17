# AGENTS.md — Wu Research Group Website

Instructions for AI coding agents (Kimi Code, etc.) working in this repository.

## What this is

A **Jekyll 4.x static website** for the Wu Research Group at the Institute of
Frontier Chemistry, School of Chemistry and Chemical Engineering, Shandong
University. Purely presentational — no backend, no JS framework. Deployed to
GitHub Pages at `https://wuroy.github.io`.

## Commands

macOS ships an old system Ruby (2.6) that does NOT work. Use Homebrew Ruby:

```bash
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"   # needed in every fresh shell
bundle exec jekyll serve     # dev server at http://localhost:4000
bundle exec jekyll build     # build to _site/
```

**After any edit, run `bundle exec jekyll build` to confirm the site compiles.**

## Architecture

```
_config.yml            Site settings, author/social info, collections, plugins
_includes/             header.html (nav), footer.html, head.html, person_icons.html
_layouts/              default.html (all pages), news_post.html, page.html
_data/                 YAML content files (edit these to update content):
  news.yml               OLD/unused file — kept for reference only
  publications.yml       All publications (grouped by year on the page)
  preprints.yml          Preprints (hidden when empty)
  research.yml           Research intro + research areas w/ linked publications
  repos.yml              Software packages shown on packages.html
  join.yml               Join Us page intro + open positions
_news/                 News posts (Markdown files, one per post; dated filenames)
_people/               Lab members (Markdown files, grouped by `group` front matter)
assets/css/main.scss   The entire theme (SCSS, compiled by Jekyll)
assets/js/main.js      Vanilla JS: sticky header, mobile nav, home-page carousel
*.html (root)          One file per page: index, news, research, publications,
                       people, join, packages, resources
_site/                 BUILD OUTPUT — never edit by hand, never commit
```

Plugins: `jekyll-feed`, `jekyll-seo-tag`, `jekyll-sitemap`.
Every page uses `layout: default`, which wraps content with header + footer.

## How to edit content

- **Last-updated date** — every page footer shows "Last updated: …". It is
  rendered automatically from the build date (`{{ 'now' | date: '%B %d, %Y' }}`
  in `_includes/footer.html`), so it refreshes itself on every build/deploy —
  do NOT hardcode dates into pages or manually bump anything.
- **News** — add a Markdown file in `_news/` (front matter: `layout: news_post`,
  `title`, `date`; body is the full text). The home page shows the 4 newest
  posts as **date + linked title only** (no snippet — keep it that way).
- **Publications** — add an entry to `_data/publications.yml`. Fields: `title`,
  `authors`, `venue`, `year`, plus optional `volume`, `issue`, `pages`, `doi`,
  `pdf`, `code`, `tags`. Append `*` to corresponding authors and `†` to
  co-first authors inside `authors` — the page renders them as superscripts
  with a legend. The research page links areas to publications **by
  exact title match**, so titles must be identical in both files.
- **Research** — edit `_data/research.yml` (`intro`, then `areas` list with
  `title`, `details`, `publications`).
- **People** — add a Markdown file in `_people/`: front matter `name`, `group`
  (one of: Principal Investigator, Postdocs, PhD Students, Master Students,
  Undergraduates), `role`, `photo`, `email`, `order`; Markdown body is the bio.
- **Packages** — edit `_data/repos.yml` (`name`, `description`, `url`, `language`).
- **Join Us** — edit `_data/join.yml` (`intro`, optional `location` section with
  Markdown `text` + `figures` (images with captions; `wide: true` spans a
  figure across both columns), optional `positions` list).
- **Site identity** (name, email, social links) — edit `_config.yml`.
- **Nav order** — edit `_includes/header.html`. Current order ends with
  Resources, then **Join Us last** (deliberate; keep it rightmost).

## Design system

Single stylesheet: `assets/css/main.scss`. Key tokens (already defined at the
top — reuse these variables, don't hardcode colors):

- Fonts: `Space Grotesk` (headings), `Inter` (body), loaded in `_includes/head.html`
- Colors: `$color-bg: #ffffff`, `$color-text: #1a1a1a`,
  `$color-accent: #0f7a4d` (green; links/hover `$color-accent-hover: #095c3a`),
  `$color-border: #e0e0e0`
- `$max-width: 1080px`, `$spacing-unit: 8px`
- Fixed blurred header; content offset below it. Clean academic look —
  restrained, no gradients/shadows beyond subtle cards.

Conventions already in use — follow them for consistency:

- Journal names are italicized with `<em>` (abbreviation stays roman, e.g.
  `<em>Journal of the American Chemical Society</em> (JACS)`). The Resources
  page's Journals block is a single list with no publisher names or group
  headings; journals are listed by their full names.
- External links use `target="_blank" rel="noopener"`.
- Section pattern on content pages: `<section class="guide-section"><h2>…</h2><ul>…`.

## Guardrails

- Do NOT run `git commit`/`git push` or other git mutations unless the user
  explicitly asks.
- Do NOT edit `_site/` (build output) or `.jekyll-cache/`.
- `_data/news.yml` is dead content — the live news source is the `_news/`
  collection. Don't add to it.
- Keep changes minimal and match the existing style. README.md documents the
  same workflows for humans — keep the two files consistent when workflows
  change.
