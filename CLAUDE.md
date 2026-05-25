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

## Cohort Signup Flow (AI Summer Camp)

`/ai-summer-camp` is the active cohort landing page. Visitors can pay $99 (via Stripe Payment Link) to reserve one of 15 seats, or join a waitlist when the cohort is full. Confirmation emails go out via Resend; signups land in the bizopstool-managed `mvp-club-master-list` Google Sheet → `Cohort` tab.

**Architecture:** Stripe is the source of truth for paid seat count. Vercel edge function `cohort-status` reads Stripe live, returns open/full. Webhook + waitlist endpoint write rows + send emails. Apps Script is NOT in the cohort path (the existing welcome-email pipeline on Apps Script is preserved for non-cohort signups).

### Server endpoints (`api/` directory — Vercel serverless functions)

- `api/cohort-status.js` — edge function; returns `{status, remaining}` based on live paid Stripe sessions. 60s edge cache, fail-open.
- `api/stripe-webhook.js` — node function; handles `checkout.session.completed`. Appends Cohort row + sends "You're in" email via Resend.
- `api/waitlist-signup.js` — node function; POST target for the waitlist overlay. Appends Cohort row + sends "You're on the waitlist" email via Resend.

### Frontend components

- `src/components/cohort/CohortCTA.jsx` — dual-state CTA (Reserve / Join Waitlist). Used in two locations on the AI Summer Camp page.
- `src/components/cohort/CohortWaitlistOverlay.jsx` — email + name capture modal.
- `src/components/homepage/CohortCallout.jsx` — homepage promotional callout.
- `src/components/layout/CohortAnnouncementBar.astro` — sitewide top bar (dismissible, persists per cohort).

### Email templates and shared helpers

- `src/emails/cohortPaidEmail.js` — branded HTML for "You're in" (template literal function, not React Email — see plan post-execution notes).
- `src/emails/cohortWaitlistEmail.js` — branded HTML for "You're on the waitlist".
- `src/lib/sheets-client.js` — server-side helper. `appendCohortRow()` wraps the Google Sheets API call.
- `src/data/cohort.js` — **single source of truth** for cohort details (capacity, dates, Stripe IDs). Editing this file is how you roll over to Cohort 02. Includes a rollover checklist as a comment at the top of the file.

### Required environment variables

| Var | Purpose | Notes |
|---|---|---|
| `STRIPE_SECRET_KEY` | Server-side Stripe API access | `sk_live_...` in prod, `sk_test_...` in preview |
| `STRIPE_WEBHOOK_SECRET` | Webhook signature verification | `whsec_...`, per-environment |
| `COHORT_01_PRODUCT_ID` | Stripe product ID — used by cohort-status to filter paid sessions | Also lives in `src/data/cohort.js` |
| `RESEND_API_KEY` | Sending-access Resend key, scoped to mvpclub.ai | Same value across environments |
| `GOOGLE_SERVICE_ACCOUNT_KEY` | Service account JSON for Sheets API | Dedicated service account (`mvp-club-site-cohort-signup@mvp-club-sonar.iam.gserviceaccount.com`) with Editor access to the master sheet |

### Sheet structure

Master sheet ID: `1aEkiTNpdUm5vv31Ln-zWPvHTZgP-CX_zhBOB08jCpkk` (the same `mvp-club-master-list` that bizopstool reads for newsletter and drip campaigns). The `Cohort` tab has 8 columns:

```
timestamp | first_name | email | source | cohort_id | stripe_session_id | status | notes
```

`source` is either `cohort_paid` or `cohort_waitlist`. `status` and `notes` are manual annotation fields (e.g., for marking a refunded seat).

### Cohort 02 rollover (when the time comes)

The rollover checklist comment at the top of `src/data/cohort.js` is the source of truth. In short:
1. Bump `COHORT.id`, `COHORT.label`, and `COHORT.shortLabel`
2. Update dates (`startISO`, `endISO`, `fridaysFormatted`, `timeET`, `officeHoursET`)
3. Create a new Stripe product + Payment Link, update `stripeProductId` and `stripePaymentLinkUrl`
4. Update `COHORT_01_PRODUCT_ID` in Vercel env vars (rename to `COHORT_02_PRODUCT_ID` or just reuse the same var)
5. Bump the dismiss key in `CohortAnnouncementBar.astro` so previously-dismissed users see the new bar
6. Verify the live Stripe webhook still subscribes to `checkout.session.completed` (no change needed since cohort_id is in metadata, not event filter)

### Reference docs

- Design spec: `docs/superpowers/specs/2026-05-21-cohort-signup-flow-design.md`
- Implementation plan: `docs/superpowers/plans/2026-05-21-cohort-signup-flow.md`
- Email pipeline + sheet visibility: `docs/email-workflow.md`

### Local dev quirks

Running `vercel dev` for the cohort endpoints requires a special quirk: vercel-dev delegates to `astro dev`, which pre-parses `req.body` to a JS object even when our handler declares `bodyParser: false`. This breaks Stripe signature verification locally. The webhook handler detects pre-parsed bodies in dev (when `VERCEL_ENV !== 'production'`) and **bypasses signature verification** in that case. Production deploys verify normally. The bypass is in `api/stripe-webhook.js`.

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

## Publishing and Unpublishing Articles

**Adding a markdown file to `src/content/blog/` or `src/content/learn/` does not publish it.** All articles are gated by an allowlist in `src/content/publishedSlugs.ts`. Only slugs present in the allowlist render in production. Everything else 404s and is excluded from listing pages and the sitemap.

This lets us stage a large backlog of drafts in the repo and only move them to production once they pass editorial review.

### How the allowlist works

```ts
// src/content/publishedSlugs.ts
export const PUBLISHED_BLOG_SLUGS = new Set<string>([
  // add blog slugs here to publish them
]);

export const PUBLISHED_LEARN_SLUGS = new Set<string>([
  'how-ai-changes-your-job',
  'claude-for-professional-work',
]);
```

- **Dev mode** (`npm run dev`): the filter is bypassed and every draft renders locally, so you can edit and preview articles before publishing.
- **Production build** (`npm run build` / Vercel deploy): only slugs in the allowlist render.

The filter is applied in all four content pages: `src/pages/blog/index.astro`, `src/pages/blog/[...slug].astro`, `src/pages/learn/index.astro`, `src/pages/learn/[...slug].astro`.

### To publish an article

1. Finish the article in `src/content/learn/my-article.md` (or `blog/`)
2. Add the slug (the filename without `.md`) to the appropriate set in `src/content/publishedSlugs.ts`
3. Commit and push — Vercel will redeploy with the article live

### To unpublish an article

Remove the slug from the set in `src/content/publishedSlugs.ts`. The markdown file stays in the repo and remains editable in dev, it just stops rendering in production. Commit and push.

### Slug naming

The slug is the markdown filename without the `.md` extension, which becomes the URL path. `src/content/learn/claude-for-professional-work.md` has slug `claude-for-professional-work` and renders at `/learn/claude-for-professional-work`.

## Brand Voice & Editorial Guidelines

**Full brand guide:** See [`docs/brand-guide.md`](docs/brand-guide.md) for the complete editorial reference including:
- Brand voice, writing style rules, and prohibited language
- The MVP Club Test (5-question pre-publish check)
- Pre-publish brand voice checklist
- **Founder voice profiles** for Matt, Jill, and Ryan (use when writing attributed content)
- Topic ownership by founder
- Competitive positioning

**Quick rules for content creation:**
- No prohibited terms (upskilling, reskilling, AI literacy, future-proof, training program, AI mastery, strategic transformation)
- No em dashes (use commas, periods, colons, or parentheses)
- No invented statistics or fabricated examples
- No fear-based motivation
- Lead with the human, not the technology
- Invite rather than lecture
- Name specific tools (Claude, ChatGPT, Cline), never just "AI"
- Start mid-thought, no wind-up intros
- Include real community member quotes or specific examples
- CTA is an invitation, not a sales pitch

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
