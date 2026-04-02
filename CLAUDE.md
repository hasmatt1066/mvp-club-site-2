# MVP Club Website — CLAUDE.md

## Project Overview

MVP Club (mvpclub.ai) is an AI adoption coaching community for mid-career professionals. This is the marketing website, built with **Astro** + **React** + **Tailwind CSS**, deployed on **Vercel**.

## Tech Stack

- **Framework:** Astro 5.x (static site generation)
- **UI Components:** React 18 (used as Astro islands with `client:load` for interactive components)
- **Styling:** Tailwind CSS 3 + CSS custom properties (theme system in `src/theme-system.js`)
- **Fonts:** Inter (body) + Zilla Slab (headings, display) via Google Fonts
- **Analytics:** GA4 (`G-9C4K0BHY92`) + Google Ads (`AW-17964645959`)
- **Deploy:** Vercel (static output)
- **Content:** Astro Content Collections with Markdown files

## Key Commands

```bash
npm run dev       # Start dev server (localhost:4321)
npm run build     # Build static site to dist/
npm run preview   # Preview built site locally
```

## Project Structure

```
src/
├── content/
│   ├── blog/          # Blog posts (Markdown with frontmatter)
│   ├── learn/         # Learning library articles (Markdown)
│   └── config.ts      # Content collection schemas
├── layouts/
│   ├── BaseLayout.astro    # HTML shell (head, GA, fonts, SEO meta)
│   ├── PageLayout.astro    # Main pages (nav + footer + React page component)
│   └── BlogLayout.astro    # Blog/learn articles (article schema, reading time, CTA)
├── pages/
│   ├── index.astro         # Homepage
│   ├── how-we-work.astro   # How We Work
│   ├── for-organizations.astro
│   ├── community.astro
│   ├── assess.astro
│   ├── case-studies/dual-enroll.astro
│   ├── blog/
│   │   ├── index.astro        # Blog listing
│   │   └── [...slug].astro    # Individual blog posts
│   └── learn/
│       ├── index.astro        # Library landing page
│       └── [...slug].astro    # Individual learn articles
├── components/
│   ├── layout/
│   │   ├── NavigationAstro.astro  # Site navigation (Astro-native)
│   │   └── FooterAstro.astro     # Site footer (Astro-native)
│   ├── shared/                    # Shared React components
│   ├── hero/                      # Homepage hero components
│   └── SEO.jsx                    # No-op (SEO handled in Astro layouts)
└── pages/                         # React page components (rendered as islands)
```

## Writing Blog Posts

Create a new Markdown file in `src/content/blog/`:

```markdown
---
title: "Your Article Title"
description: "A concise description for SEO meta tags and social sharing. Under 155 characters."
author: "Matt Hastings"
date: "2026-04-02"
pillar: "AI Adoption Crisis"
tags: ["ai-adoption", "workplace"]
---

Your content here in standard Markdown.

## Use H2 for Main Sections

Paragraphs, **bold**, *italic*, [links](https://example.com), and lists all work as expected.

### Use H3 for Subsections

> Blockquotes for community member quotes

- Bullet lists
- Work normally
```

### Frontmatter Fields (Blog)

| Field | Required | Description |
|---|---|---|
| `title` | Yes | Article title |
| `description` | Yes | SEO meta description (under 155 chars) |
| `author` | Yes | Author name ("Matt Hastings", "Jill Ozovek", or "Ryan Brodsky") |
| `date` | Yes | Publish date as "YYYY-MM-DD" |
| `pillar` | No | Content pillar for categorization |
| `tags` | No | Array of topic tags |
| `image` | No | Hero/OG image path |

### File Naming

Use lowercase kebab-case slugs: `ai-time-paradox.md`. The filename becomes the URL path: `/blog/ai-time-paradox`.

Keep slugs short (under 5-6 words), keyword-rich, and descriptive.

## Writing Learn/Library Articles

Same format as blog posts, but in `src/content/learn/`. Additional frontmatter fields:

```markdown
---
title: "How to Use AI for Project Status Reports"
description: "Step-by-step guide to generating project status reports with AI."
author: "Ryan Brodsky"
date: "2026-04-02"
pillar: "AI at Work"
tags: ["project-management", "how-to"]
difficulty: "beginner"
readingTime: 8
---
```

### Additional Frontmatter Fields (Learn)

| Field | Required | Description |
|---|---|---|
| `pillar` | Yes | Must match a pillar topic (see below) |
| `difficulty` | No | "beginner", "intermediate", or "advanced" |
| `readingTime` | No | Estimated minutes to read |

### Content Pillars

1. Getting Started with AI
2. AI at Work
3. AI for [Your Role]
4. Leading AI at Your Organization
5. Building with AI
6. AI Tools and Productivity
7. AI and Your Career
8. Human + AI Collaboration

## Brand Voice Rules

When writing or editing content, follow these rules:

- **No prohibited terms:** upskilling, reskilling, AI literacy, future-proof, training program, AI mastery, strategic transformation
- **No em dashes** (use commas, periods, or parentheses instead)
- **No "wise observer" setups** or humble-brags
- **No cloying transitions** ("Here's what most people don't realize")
- **No invented statistics** or unverified claims
- **No fear-based motivation**
- Lead with the human, not the technology
- Invite rather than lecture
- Use simple vocabulary (fun, wins, getting better)
- Name specific tools (Claude, ChatGPT, Cline), never just "AI"
- Include at least one real community member quote or specific example per article
- CTA should be an invitation, not a sales pitch

## SEO Notes

- **Canonical URL:** Always use `www.mvpclub.ai` (with www)
- **Sitemap:** Auto-generated by `@astrojs/sitemap` at `/sitemap-index.xml`
- **Schema markup:** Article JSON-LD is auto-generated by BlogLayout.astro
- **Internal linking:** Every article should link to its pillar page and at least 2 other articles
- Content pages render as static HTML with zero JavaScript (unless a React island is used)

## Adding React Interactive Components

For interactive elements within content pages, create a React component and use it in an `.astro` page with a client directive:

```astro
---
import MyWidget from '../components/MyWidget.jsx';
---
<MyWidget client:load />
```

Use `client:load` for immediately needed interactivity, `client:visible` for below-the-fold components.

## Theme System

Colors are defined as CSS custom properties in `src/theme-system.js`. Key variables:
- `--color-primary` (dark blue)
- `--color-secondary` (teal)
- `--color-accent` (amber)
- `--color-background` (warm off-white)
- `--color-surface` (white)
- `--color-accent-lifted` (light gold)

Do not hardcode colors. Use these CSS variables or their Tailwind equivalents.
