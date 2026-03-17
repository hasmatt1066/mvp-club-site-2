# Substack Feed Integration — Design Spec

**Date:** 2026-03-17
**Status:** Implemented

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

If the RSS fetch fails (network error, Substack outage, timeout), the build logs a warning including the feed URL and error message, and proceeds with local posts only. The build never fails due to a Substack issue.

### Fetch Timeout

Use `AbortSignal.timeout(10_000)` (10 seconds) to prevent the build from hanging if Substack is slow or unreachable.

### Async Conversion

The current `build()` function is synchronous. It must be converted to `async function build()` to support `fetch()`. The entry point becomes `build().catch(console.error)`. Uses Node.js built-in `fetch()` (available since Node 18, which Vercel uses by default).

### Duplicate Handling

Jill has 4 existing local posts. These remain as-is. Going forward, Jill publishes only on Substack. No deduplication logic is needed — the convention is that local posts are historical and Substack posts are new. If a title happens to overlap, both cards will appear.

## Substack Card Design

Substack cards share the same shape, size, and grid placement as local post cards. Differences:

- **"On Substack" badge** — top-right corner, uses teal/secondary color (`#115e59`) instead of amber, to differentiate from pillar badges
- **Thumbnail image** — if the RSS `<enclosure>` provides an image URL, display it at the top of the card. When no image is present, the card renders without an image area (matching local card layout).
- **External link icon** — small icon in the meta area signaling the link opens externally
- **New tab** — `target="_blank"` with `rel="noopener noreferrer"`
- **Same layout** — title (Zilla Slab), description excerpt (3-line clamp), author, date

## RSS Parsing

**Dependency:** `fast-xml-parser` (dev dependency) — lightweight, zero sub-dependencies, widely used.

**Parser configuration:**

```js
{
  ignoreAttributes: false,
  attributeNamePrefix: '@_'
}
```

These options are required to preserve XML attributes (specifically `enclosure` image URLs).

**Fields extracted from each `<item>`:**

| RSS Field | Maps To | Notes |
|-----------|---------|-------|
| `title` | Card title | |
| `description` | Card excerpt | HTML tags stripped at parse time via regex (`text.replace(/<[^>]*>/g, '')`), then truncated visually by CSS clamp |
| `link` | Click-through URL | Full Substack post URL |
| `pubDate` | Date | Parsed to ISO for sorting |
| `enclosure.@_url` | Thumbnail image | Optional; only shown if present |
| `dc:creator` | Author | Accessed as `item['dc:creator']`; falls back to author from feed config |

**Author resolution:** The `SUBSTACK_FEEDS` config provides the primary author name. The `dc:creator` RSS field is used as a fallback only.

## Sitemap

Substack posts (identified by `source: 'substack'`) are excluded from sitemap generation. The sitemap should only contain URLs on the `mvpclub.ai` domain.

## Scheduled Rebuilds

A **GitHub Actions workflow** runs on a cron schedule (every 6 hours) and curls the Vercel deploy hook URL to trigger a fresh build.

- Deploy hook URL stored as a GitHub repository secret (`VERCEL_DEPLOY_HOOK`)
- Workflow file: `.github/workflows/scheduled-rebuild.yml`
- Schedule: `cron: '0 */6 * * *'` (00:00, 06:00, 12:00, 18:00 UTC)
- Includes `workflow_dispatch` trigger for manual rebuilds

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
| `scripts/generate-blog.js` | Convert to async, add `fetchSubstackPosts()`, merge into listing, new Substack card template, exclude Substack posts from sitemap |
| `package.json` | Add `fast-xml-parser` dev dependency |
| `.github/workflows/scheduled-rebuild.yml` | New file — scheduled rebuild workflow with cron + workflow_dispatch |

## Out of Scope

- Migrating existing local posts to Substack
- Matt and Ryan's Substack feeds (future work)
- Full-text Substack posts rendered locally (posts link out to Substack)
- Client-side/runtime RSS fetching
- Post count limits per feed (Substack's default feed length is acceptable)
