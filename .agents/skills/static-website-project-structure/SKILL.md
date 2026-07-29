---
name: static-website-project-structure
description: >
  Enforces this project's folder structure, file placement rules, naming
  conventions, wiring/integration steps, and architecture standards for a
  static HTML/CSS/JavaScript website. Trigger before creating, modifying,
  moving, renaming, or deleting any HTML, CSS, JavaScript, or asset file.
  Also trigger when scaffolding a brand-new project with no existing
  structure. Skip the full inspection ritual for small edits to a file
  that already exists and isn't being moved, renamed, or reorganized.
---

# Static Website Folder Structure Standards

## Role

You are the Project Architecture Agent for this repository. Your job is to
keep the project clean, modular, and scalable as it grows, and to make sure
every new file is placed, named, and wired up consistently with what's
already there.

---

# Precedence Rules (read first)

Apply in this order when rules seem to conflict:

1. **Explicit user instruction wins.** If the user asks for a placement or
   approach that violates this standard, comply — but tell them what
   convention it deviates from and why, in one line. Don't silently "fix" it,
   and don't refuse.
2. **Existing repo structure wins over this standard**, for any area where
   the repo already has an established (even if non-conforming) pattern.
   Match what's there. Flag the deviation from this doc briefly; don't
   reorganize existing files toward the standard unless the user asks for a
   structure migration.
3. **This standard governs everything else** — new areas of the repo, or a
   brand-new project with nothing established yet.

---

# When to Do a Full Inspection vs. a Light Touch

**Full workflow** (inspect repo, decide placement, check reuse) — use for:
new files, new folders, moving/renaming files, deleting files, or any task
touching more than one file.

**Light touch** (just edit) — use for: a small change inside a file that
already exists, isn't moving, and isn't being split. No need to re-walk the
whole tree for a typo fix or a CSS tweak.

**New project (empty repo):** scaffold lazily. Don't generate the entire
folder tree upfront. Create `styles/`, `scripts/`, `assets/` subfolders only
as each is first needed, following the structure below.

---

# Decision Workflow (full path)

1. **Inspect** the existing structure relevant to this change (don't assume — look).
2. **Classify** the request: HTML / CSS / JS / image / font / video / SVG / download.
3. **Check for reuse** — see the Reuse Threshold below before assuming something is new.
4. **Place** the file per the structure and naming rules below.
5. **Wire it up** — see Integration Steps below. A file that exists but isn't
   referenced anywhere is a bug, not a deliverable.
6. **Verify** — see Done Checklist below, before considering the task complete.

---

# Reuse Threshold (concrete rule)

Don't just "prefer reuse" — apply this test:

- Used on **2 or more pages** → belongs in `scripts/components/` or
  `styles/components/` as a shared component, even if it started as one
  page's feature.
- Used on **exactly 1 page** → page-specific, goes in `scripts/pages/` or
  `styles/pages/`.
- If extending an existing component would only require a parameter/variant
  (e.g. a new `.card--compact` modifier) rather than different behavior,
  extend it — don't fork a new file.

---

# Integration Steps (don't skip this)

Placing a file is not the same as wiring it in. After creating or moving a file:

- **New CSS file** → add a `<link>` in the relevant page(s), respecting load
  order (see below). If it's a component style, also confirm it isn't
  redundant with an existing `styles/components/*.css`.
- **New JS file** → add a `<script>` reference before `</body>` (unless the
  project already uses `<script type="module">` in `<head>` — match whatever
  pattern is established; if neither exists yet, default to modules).
- **New page** → link to it from the relevant nav/menu markup, and add it to
  `sitemap.xml` if one exists.
- **New asset** → reference it from the file that uses it; don't leave
  unreferenced assets sitting in `assets/`.

**CSS load order** (when adding `<link>` tags, follow this cascade):
`reset.css` → `variables.css` → `typography.css` → layout/ → components/ →
pages/ → `utilities.css` → `responsive.css` → `animations.css`.

---

# Deletion Safety

Before deleting any file:

- Search the repo for references to it: `<link>`, `<script src>`, `url(...)`
  in CSS, `import`/`fetch` in JS, and plain filename mentions.
- Remove or update those references as part of the same change — don't leave
  dangling links.
- After deleting, do a final pass confirming no page now 404s on a missing
  asset/script/style.

---

# Done Checklist (verify before finishing)

- [ ] File is in the correct folder per the structure below.
- [ ] Naming follows kebab-case / BEM / camelCase / PascalCase rules.
- [ ] File is actually referenced somewhere (no orphans).
- [ ] No duplicate component, class name, or JS function was introduced.
- [ ] Any deviation from this standard (per Precedence Rules) was noted to the user.

---

# Tech Stack

HTML5, CSS3, vanilla JavaScript (ES6+). No framework assumed unless already
present in the repo or explicitly requested.

---

# Project Structure

```
project-root/
├── index.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── favicon.ico
│
├── pages/
│   ├── about.html
│   ├── services.html
│   ├── contact.html
│   └── ...
│
├── styles/
│   ├── main.css
│   ├── variables.css
│   ├── reset.css
│   ├── typography.css
│   ├── utilities.css
│   ├── animations.css
│   ├── responsive.css
│   ├── layout/          (header.css, footer.css, navigation.css, grid.css)
│   ├── components/      (button.css, card.css, modal.css, form.css, ...)
│   └── pages/           (home.css, about.css, services.css, contact.css)
│
├── scripts/
│   ├── main.js
│   ├── utils.js
│   ├── constants.js
│   ├── components/      (navbar.js, modal.js, accordion.js, slider.js, ...)
│   ├── pages/            (home.js, about.js, services.js, contact.js)
│   ├── api/              (contact.js, newsletter.js — network calls only, no UI logic)
│   └── vendors/          (third-party libs — never modify these files)
│
├── assets/
│   ├── images/           (hero/, gallery/, team/, logos/, icons/, backgrounds/, illustrations/)
│   ├── videos/
│   ├── fonts/            (prefer WOFF2)
│   ├── svg/              (prefer for icons/logos)
│   └── downloads/        (PDFs, brochures, catalogs)
│
├── .agents/skills/
└── README.md
```

Root stays clean — only global files (`index.html`, `404.html`, `robots.txt`,
`sitemap.xml`, `favicon.ico`, `README.md`). No feature-specific files at root.

---

# Naming Conventions

- Folders and files: lowercase, kebab-case (`about-us.html`, `hero-banner.css`, `contact-form.js`).
- CSS classes: BEM (`.card`, `.card__title`, `.card--active`).
- JS functions: camelCase (`loadNavbar()`, `toggleMenu()`).
- JS classes: PascalCase (`class Navbar`, `class Modal`).

---

# File-Content Conventions

- JS modules: use `<script type="module">` + ES `import`/`export` if the repo
  already does this; otherwise default to modules for new files rather than
  introducing global-scope scripts, unless the existing repo is
  global-script-based (match it — see Precedence Rules).
- One component = one file. Don't bundle unrelated components together to
  save a file.
- Keep page-specific JS/CSS free of logic that's actually shared — that's
  what the Reuse Threshold check is for.

---

# HTML / CSS / JS Standards

**HTML:** semantic markup, one `<h1>` per page, logical heading hierarchy, descriptive `alt` text, minimal nesting.

**CSS:** use CSS variables, keep selectors shallow, avoid IDs for styling, avoid inline styles and `!important`.

**JS:** ES6+, `const`/`let` only, one responsibility per function, no global variables, keep reusable logic separate from page-specific logic.

**Performance:** optimize/compress images, lazy-load heavy media, defer script loading where appropriate, avoid duplicate CSS/JS across files.

---

# Final Rule

Every change should leave the repo more organized and easier to maintain
than before — not just correctly filed, but correctly wired in, verified,
and free of orphans or duplicates. When genuinely uncertain where something
belongs, inspect the repo, follow the closest existing pattern, and note the
assumption you made.
