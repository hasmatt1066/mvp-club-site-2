# Substack Feed Integration Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Pull Jill Ozovek's Substack RSS feed into the blog listing at build time, rendering Substack posts as visually distinct cards that link out to Substack.

**Architecture:** Modify the existing `scripts/generate-blog.js` build script to fetch and parse Substack RSS XML at build time, merge with local posts, and render a new Substack card variant in the listing template. A GitHub Actions cron workflow triggers scheduled rebuilds via Vercel deploy hook.

**Tech Stack:** Node.js built-in `fetch()`, `fast-xml-parser` (dev dep), GitHub Actions

**Spec:** `docs/superpowers/specs/2026-03-17-substack-feed-integration-design.md`

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `scripts/generate-blog.js` | Modify | Add Substack config, async conversion, `fetchSubstackPosts()`, Substack card template, sitemap exclusion |
| `package.json` | Modify | Add `fast-xml-parser` dev dependency |
| `.github/workflows/scheduled-rebuild.yml` | Create | Cron job to trigger Vercel redeploy every 6 hours |

---

### Task 1: Install fast-xml-parser

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install the dependency**

Run: `npm install --save-dev fast-xml-parser`

- [ ] **Step 2: Verify it installed**

Run: `node -e "import('fast-xml-parser').then(m => console.log('OK', Object.keys(m)))"`
Expected: Prints `OK` with exported keys including `XMLParser`

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "Add fast-xml-parser dev dependency for Substack RSS parsing"
```

---

### Task 2: Add Substack config and fetchSubstackPosts()

**Files:**
- Modify: `scripts/generate-blog.js:1-16` (imports and constants)

- [ ] **Step 1: Add import and config**

At the top of `scripts/generate-blog.js`, after the existing imports (line 10), add:

```js
import { XMLParser } from 'fast-xml-parser';
```

After the `OUTPUT_DIR` constant (line 17), add:

```js
const SUBSTACK_FEEDS = [
  { url: 'https://jozovek.substack.com/feed', author: 'Jill Ozovek' },
  // Add more feeds here as authors migrate to Substack
];
```

- [ ] **Step 2: Add the fetchSubstackPosts function**

Add this function after the `SUBSTACK_FEEDS` constant, before the `postTemplate` function:

```js
/**
 * Fetch and parse Substack RSS feeds into post objects.
 * Returns an array of post objects with source: 'substack'.
 * On failure, logs a warning and returns an empty array.
 */
async function fetchSubstackPosts() {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
  });

  const allPosts = [];

  for (const feed of SUBSTACK_FEEDS) {
    try {
      const response = await fetch(feed.url, {
        signal: AbortSignal.timeout(10_000),
      });
      if (!response.ok) {
        console.warn(`⚠️  Substack feed returned ${response.status}: ${feed.url}`);
        continue;
      }
      const xml = await response.text();
      const result = parser.parse(xml);
      const items = result?.rss?.channel?.item || [];
      const itemList = Array.isArray(items) ? items : [items];

      for (const item of itemList) {
        const description = (item.description || '')
          .replace(/<[^>]*>/g, '')
          .trim();

        allPosts.push({
          title: item.title || '',
          description,
          link: item.link || '',
          date: new Date(item.pubDate).toISOString().split('T')[0],
          author: feed.author || item['dc:creator'] || 'Unknown',
          image: item.enclosure?.['@_url'] || null,
          source: 'substack',
        });
      }

      console.log(`📡 Fetched ${itemList.length} post(s) from ${feed.url}`);
    } catch (error) {
      console.warn(`⚠️  Failed to fetch Substack feed ${feed.url}: ${error.message}`);
    }
  }

  return allPosts;
}
```

- [ ] **Step 3: Verify the file still parses**

Run: `node -e "import('./scripts/generate-blog.js')" 2>&1 | head -5`
Expected: The script runs (may output build messages). No syntax errors.

- [ ] **Step 4: Commit**

```bash
git add scripts/generate-blog.js
git commit -m "Add Substack RSS fetch and parse function"
```

---

### Task 3: Convert build() to async and merge Substack posts

**Files:**
- Modify: `scripts/generate-blog.js:665-760` (build function and entry point)

- [ ] **Step 1: Convert build() to async and add Substack merge**

Replace `function build() {` (line 665) with `async function build() {`.

Also update the early return when `index.json` is missing (lines 675-679). Currently it returns immediately with an empty listing. Change it so Substack posts are still fetched:

Replace:
```js
  if (!fs.existsSync(indexPath)) {
    console.log('⚠️  No content/blog/index.json found. Creating empty blog listing.');
    fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), listingTemplate([]));
    return;
  }
```

With:
```js
  let index = [];
  if (fs.existsSync(indexPath)) {
    index = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
  } else {
    console.log('⚠️  No content/blog/index.json found. Proceeding with Substack posts only.');
  }
```

Then, after the local posts are collected and sorted (after line 709: `posts.sort(...)`), add the Substack fetch and merge:

```js
  // Fetch Substack posts and merge
  const substackPosts = await fetchSubstackPosts();
  const allPosts = [...posts, ...substackPosts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
```

Then update the listing page generation (line 712) to use `allPosts` instead of `posts`:

```js
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), listingTemplate(allPosts));
```

Keep `generateSitemap(posts)` as-is (line 716) — it still receives only local posts, which excludes Substack posts from the sitemap.

Update the completion log (line 718) to show both counts:

```js
  console.log(`\n🎉 Blog build complete! ${posts.length} local + ${substackPosts.length} Substack post(s) generated.`);
```

- [ ] **Step 2: Update the entry point**

Replace `build();` (line 760) with:

```js
build().catch((err) => {
  console.error('❌ Blog build failed:', err);
  process.exit(1);
});
```

- [ ] **Step 3: Run the build to verify**

Run: `npm run build:blog`
Expected: Output shows local posts generated, then `📡 Fetched N post(s) from https://jozovek.substack.com/feed`, then the listing page generated. No errors.

- [ ] **Step 4: Commit**

```bash
git add scripts/generate-blog.js
git commit -m "Convert build to async and merge Substack posts into listing"
```

---

### Task 4: Add Substack card template to listing page

**Files:**
- Modify: `scripts/generate-blog.js:410-647` (listingTemplate function)

- [ ] **Step 1: Update the card rendering in listingTemplate**

Replace the `postCards` mapping (lines 411-429) with a version that handles both card types:

```js
  const postCards = posts.map(post => {
    const publishDate = new Date(post.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    if (post.source === 'substack') {
      return `
      <a href="${escapeHtml(post.link)}" class="post-card substack-card" target="_blank" rel="noopener noreferrer">
        <span class="substack-badge">On Substack</span>
        ${post.image ? `<img class="substack-thumb" src="${escapeHtml(post.image)}" alt="" loading="lazy">` : ''}
        <h2>${escapeHtml(post.title)}</h2>
        <p class="post-excerpt">${escapeHtml(post.description || '')}</p>
        <div class="post-card-meta">
          <span>${escapeHtml(post.author)}</span>
          <span>${publishDate}</span>
          <svg class="external-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </div>
      </a>
      `;
    }

    return `
      <a href="/blog/${post.slug}/" class="post-card">
        ${post.pillar ? `<span class="post-pillar">${escapeHtml(post.pillar)}</span>` : ''}
        <h2>${escapeHtml(post.title)}</h2>
        <p class="post-excerpt">${escapeHtml(post.description || '')}</p>
        <div class="post-card-meta">
          <span>${escapeHtml(post.author)}</span>
          <span>${publishDate}</span>
        </div>
      </a>
    `;
  }).join('\n');
```

- [ ] **Step 2: Add Substack card CSS**

In the `<style>` block of `listingTemplate`, after the `.post-card-meta` styles (after line 582), add:

```css
    .substack-card {
      position: relative;
      overflow: hidden;
    }

    .substack-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: ${COLORS.secondary};
      color: white;
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 0.2rem 0.6rem;
      border-radius: 2rem;
    }

    .substack-thumb {
      width: calc(100% + 3rem);
      margin: -1.5rem -1.5rem 1rem -1.5rem;
      height: 160px;
      object-fit: cover;
      border-radius: 1rem 1rem 0 0;
    }

    .external-icon {
      margin-left: auto;
      opacity: 0.5;
      flex-shrink: 0;
    }
```

- [ ] **Step 3: Run the build and inspect output**

Run: `npm run build:blog`

Then verify the output contains Substack cards:

Run: `grep -c "substack-card" public/blog/index.html`
Expected: A number greater than 0

Run: `grep -c "On Substack" public/blog/index.html`
Expected: Same number as above

- [ ] **Step 4: Visual check — open in browser**

Run: `npx serve public -l 3333` (or `npm run dev`)

Open `http://localhost:3333/blog/` in a browser. Verify:
- Substack cards appear with teal "On Substack" badge
- Thumbnail images show (if present in feed)
- Cards are interspersed with local posts, sorted by date
- Clicking a Substack card opens Substack in a new tab
- Local cards still work as before

- [ ] **Step 5: Commit**

```bash
git add scripts/generate-blog.js
git commit -m "Add Substack card variant with badge, thumbnail, and external link"
```

---

### Task 5: Create GitHub Actions scheduled rebuild workflow

**Files:**
- Create: `.github/workflows/scheduled-rebuild.yml`

- [ ] **Step 1: Create the workflow file**

```yaml
name: Scheduled Rebuild

on:
  schedule:
    - cron: '0 */6 * * *'
  workflow_dispatch:

jobs:
  trigger-rebuild:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Vercel Deploy Hook
        run: curl -s -X POST "${{ secrets.VERCEL_DEPLOY_HOOK }}"
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/scheduled-rebuild.yml
git commit -m "Add scheduled rebuild workflow for Substack feed updates"
```

- [ ] **Step 3: Document the required secret**

After pushing, the user needs to:
1. Create a Vercel Deploy Hook in the Vercel dashboard (Project Settings > Git > Deploy Hooks)
2. Add the hook URL as a GitHub repository secret named `VERCEL_DEPLOY_HOOK`

---

### Task 6: Final verification

- [ ] **Step 1: Clean build from scratch**

Run:
```bash
rm -rf public/blog
npm run build:blog
```

Expected: All local posts generated, Substack posts fetched, listing page includes both types.

- [ ] **Step 2: Full site build**

Run: `npm run build`
Expected: Blog builds first (prebuild), then Vite SSG build succeeds.

- [ ] **Step 3: Verify sitemap excludes Substack posts**

Run: `grep "substack" public/sitemap.xml`
Expected: No matches (Substack URLs should not be in the sitemap).

- [ ] **Step 4: Commit any final changes and push**

```bash
git push origin main
```
