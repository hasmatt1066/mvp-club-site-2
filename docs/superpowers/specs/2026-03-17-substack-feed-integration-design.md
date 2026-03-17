# Substack Feed Integration — Design Spec

**Date:** 2026-03-17
**Status:** Draft

## Overview

Replace Jill Ozovek's local blog workflow with an automated Substack RSS feed integration. New posts she publishes on her Substack (`jozovek.substack.com`) will appear as preview cards on the MVP Club blog listing page, linking out to Substack. Existing local posts from all authors remain unchanged. Matt and Ryan's posts will be phased to Substack later.

## Data Flow

1. At build time, `generate-blog.js` fetches `https://jozovek.substack.com/feed` (RSS 2.0 XML)
2. Each `<item>` is parsed into: `{ title, description, link, date, author, image, source: 'substack' }`
3. Local posts are loaded from `content/blog/` as before
4. Both sets are merged into one array, sorted by date (newest first)
5. The listing page renders two card types:
   - **Local cards** — link to `/blog/slug/` (existing behavior)
   - **Substack cards** — link to `jozovek.substack.com/p/...`, open in new tab

### Graceful Fallback

If the RSS fetch fails (network error, Substack outage, timeout), the build logs a warning and proceeds with local posts only. The build never fails due to a Substack issue.

## Substack Card Design

Substack cards share the same shape, size, and grid placement as local post cards. Differences:

- **"On Substack" badge** — top-right corner, uses teal/secondary color (`#115e59`) instead of amber, to differentiate from pillar badges
- **Thumbnail image** — if the RSS `<enclosure>` provides an image URL, display it at the top of the card
- **External link icon** — small icon in the meta area signaling the link opens externally
- **New tab** — `target="_blank"` with `rel="noopener noreferrer"`
- **Same layout** — title (Zilla Slab), description excerpt (3-line clamp), author, date

## RSS Parsing

**Dependency:** `fast-xml-parser` (dev dependency) — lightweight, zero sub-dependencies, widely used.

**Fields extracted from each `<item>`:**

| RSS Field | Maps To | Notes |
|-----------|---------|-------|
| `title` | Card title | |
| `description` | Card excerpt | HTML-stripped, truncated by CSS clamp |
| `link` | Click-through URL | Full Substack post URL |
| `pubDate` | Date | Parsed to ISO for sorting |
| `enclosure.@_url` | Thumbnail image | Optional; only shown if present |
| `dc:creator` | Author | Expected: "Jill Ozovek" |

## Scheduled Rebuilds

A **GitHub Actions workflow** runs on a cron schedule (every 6 hours) and curls the Vercel deploy hook URL to trigger a fresh build.

- Deploy hook URL stored as a GitHub repository secret (`VERCEL_DEPLOY_HOOK`)
- Workflow file: `.github/workflows/scheduled-rebuild.yml`
- Schedule: `cron: '0 */6 * * *'` (00:00, 06:00, 12:00, 18:00 UTC)

This ensures new Substack posts appear on the site within ~6 hours of publication without any manual action.

## Configuration

Substack feed URLs will be stored in a config structure in `generate-blog.js` to make it easy to add Matt and Ryan's feeds later:

```js
const SUBSTACK_FEEDS = [
  { url: 'https://jozovek.substack.com/feed', author: 'Jill Ozovek' },
  // Add more feeds here as authors migrate to Substack
];
```

## Files Modified

| File | Change |
|------|--------|
| `scripts/generate-blog.js` | Add `fetchSubstackPosts()`, merge into listing, new card template |
| `package.json` | Add `fast-xml-parser` dev dependency |
| `.github/workflows/scheduled-rebuild.yml` | New file — scheduled rebuild workflow |

## Out of Scope

- Migrating existing local posts to Substack
- Matt and Ryan's Substack feeds (future work)
- Full-text Substack posts rendered locally (posts link out to Substack)
- Client-side/runtime RSS fetching
