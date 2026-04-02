# Analytics Strategy — Content Library Tracking

## Current State

- **GA4 property:** `G-9C4K0BHY92`
- **Google Ads:** `AW-17964645959`
- **Tag Manager:** Not used — gtag.js loaded directly in `index.html`
- **Existing events tracked:** `join_community_click`, `webinar_rsvp_click`, `webinar_cta_click`, assessment events, lead magnet popup events
- **Key gap:** Blog pages have zero custom event tracking, no content grouping, no conversion attribution

---

## Custom Dimensions to Register

Register in GA4 Admin > Custom Definitions > Custom Dimensions:

| Dimension Name | Scope | Parameter Name | Example Values |
|---|---|---|---|
| Content Topic | Event | `content_topic` | `ai-adoption`, `future-of-work`, `tools` |
| Content Type | Event | `content_type` | `blog-post`, `guide`, `case-study` |
| Author | Event | `content_author` | `Jill Ozovek`, `Ryan Brodsky` |
| Publish Date | Event | `publish_date` | `2026-01-14` |
| Content Source | Event | `content_source` | `substack`, `original`, `guest` |
| Topic Cluster | Event | `topic_cluster` | `getting-started`, `ai-at-work`, `building` |

---

## Events to Track

### Tier 1: Core (Track from Day One)

| Metric | GA4 Source | Notes |
|---|---|---|
| Page views per article | Built-in `page_view` | Already tracked |
| Unique users per article | Built-in | "Active users" dimension |
| Avg. engagement time | Built-in in GA4 | Replaces "time on page" |
| Scroll depth | Custom event (see below) | GA4 only covers 90% |
| Bounce rate | Built-in | GA4 shows "engagement rate" (inverse) |

### Tier 2: Conversion (Critical for Proving ROI)

| Metric | How to Track |
|---|---|
| Articles driving signups | `join_community_click` with `page_location` |
| Articles driving assessments | `assessment_start` with `page_referrer` |
| Lead magnet conversions by article | LeadMagnetPopup event with referrer |
| Newsletter signups from content | New event needed |

### Tier 3: Engagement Quality

| Event Name | Trigger | Parameters |
|---|---|---|
| `scroll_depth` | 25%, 50%, 75%, 100% scroll | `percent_scrolled`, `page_title` |
| `article_cta_click` | CTA click within article body | `cta_text`, `cta_url`, `page_title` |
| `content_share` | Share button click | `method` (linkedin, twitter, copy_link), `page_title` |
| `read_complete` | 100% scroll AND >60s | `page_title`, `time_on_page` |
| `internal_link_click` | Click to another article | `destination_url`, `source_url` |

---

## Scroll Depth Tracking Implementation

```javascript
// Add to each library article page
(function() {
  const thresholds = [25, 50, 75, 100];
  const fired = new Set();
  window.addEventListener('scroll', function() {
    const scrollPct = Math.round(
      (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100
    );
    thresholds.forEach(function(t) {
      if (scrollPct >= t && !fired.has(t)) {
        fired.add(t);
        gtag('event', 'scroll_depth', {
          percent_scrolled: t,
          content_type: 'blog-post',
          page_title: document.title
        });
      }
    });
  }, { passive: true });
})();
```

---

## SPA Pageview Tracking

Create `src/utils/analytics.js`:

```javascript
export const trackPageView = (path, title) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title,
    });
  }
};

export const trackEvent = (eventName, params = {}) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
};
```

Add route change listener in Layout:

```javascript
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';

const location = useLocation();
useEffect(() => {
  trackPageView(location.pathname, document.title);
}, [location.pathname]);
```

---

## Search Console Strategy

### Sitemap Management
- Automate sitemap generation as part of build process
- Use `www.mvpclub.ai` consistently (fix current mismatch)
- At 500+ URLs, switch to sitemap index with sub-sitemaps

### Indexing Monitoring
- Submit sitemap at `https://www.mvpclub.ai/sitemap.xml`
- Use "Pages" report to monitor: Indexed, Not indexed, Crawled but not indexed
- Use URL Inspection tool for new content

### Content Gap Analysis (Weekly Process)
1. Export Search Console queries (Performance > Queries)
2. High impressions + low CTR = title/meta description needs work
3. Zero matching pages = content gaps to fill
4. Cross-reference with topic cluster map

---

## UTM Parameter Strategy

| Parameter | Convention | Examples |
|---|---|---|
| `utm_source` | Platform name | `linkedin`, `twitter`, `newsletter`, `mighty-networks` |
| `utm_medium` | Channel type | `social`, `email`, `community`, `referral` |
| `utm_campaign` | Campaign name | `weekly-newsletter-2026-04`, `content-library-launch` |
| `utm_content` | Link variant | `hero-cta`, `footer-link`, `inline-mention` |

### Share Button Implementation

```javascript
function getShareUrl(articleUrl, platform) {
  const url = new URL(articleUrl);
  url.searchParams.set('utm_source', platform);
  url.searchParams.set('utm_medium', 'social');
  url.searchParams.set('utm_campaign', 'reader-share');
  return url.toString();
}

function trackShare(method, articleTitle, articleUrl) {
  gtag('event', 'content_share', {
    method: method,
    content_type: 'blog-post',
    item_id: articleUrl,
    page_title: articleTitle
  });
}
```

---

## Reporting Cadences

### Weekly Review (15 minutes)

| Report | What to Look For | Source |
|---|---|---|
| Top 10 articles by pageviews | Trending content | GA4 Pages report |
| New vs returning on blog | Attracting new audience? | GA4 User Acquisition |
| Conversion events from blog | Which articles drive signups | GA4 Events + page path |
| New search queries | Emerging ranking topics | Search Console |

### Monthly Review (30 minutes)

| Report | What to Look For | Source |
|---|---|---|
| Performance by topic cluster | Which clusters work | GA4 Exploration + `topic_cluster` |
| Content decay | Articles losing >20% traffic MoM | GA4 date comparison |
| Landing page report | Entry point articles | GA4 Landing Page |
| Avg scroll depth by article | Content quality signal | `scroll_depth` events |
| Indexing status | Pages not indexed | Search Console |
| CTR by article | Titles/descriptions to update | Search Console by page |

### Content Decay Alert

GA4 Exploration:
- Technique: Free-form
- Dimensions: Page path
- Metrics: Active users, Sessions
- Date comparison: Current vs previous month
- Filter: Page path contains `/learn/`
- Flag articles showing >20% decline for 2 consecutive months

---

## Implementation Priority

### Phase 1 — Before Launch
1. Create `src/utils/analytics.js` with shared helpers
2. Add route change listener for SPA pageview tracking
3. Register custom dimensions in GA4 Admin
4. Fix sitemap domain mismatch (`www.mvpclub.ai`)
5. Add topic/cluster metadata to content files

### Phase 2 — During Build
1. Inject custom dimensions into article page GA snippets
2. Add scroll depth tracking
3. Add social share buttons with event tracking
4. Automate sitemap generation

### Phase 3 — After Launch (First Month)
1. Build GA4 Exploration reports
2. Set up weekly/monthly review cadence
3. Create UTM link templates for team
4. Connect Search Console to GA4 (Admin > Product Links)
