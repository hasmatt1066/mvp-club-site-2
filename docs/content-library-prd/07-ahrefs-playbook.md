# Ahrefs Playbook for MVP Club's Content Library

## 1. First Things to Set Up

### A. Add mvpclub.ai as a Project

1. **Ahrefs Dashboard** > **+ New Project** > enter `www.mvpclub.ai`
2. Connect Google Search Console and Google Analytics when prompted
3. Set target country to **United States**
4. Add brand keywords to tracked keywords

### B. Run a Site Audit

1. **Site Audit** > **New Crawl**
2. Crawl scope: `www.mvpclub.ai/*`, fastest speed, weekly schedule
3. **What to look for:**
   - **Errors (red):** Broken pages, missing title tags, broken canonicals. Fix immediately.
   - **Warnings (yellow):** Duplicate titles, missing meta descriptions, orphan pages, redirect chains.
   - **Notices (blue):** Missing alt text, missing OG tags.
   - **Specific check:** Verify all pages resolve to `www.mvpclub.ai` (the www vs non-www canonical issue).

### C. Baseline Your Domain in Site Explorer

1. **Site Explorer** > `www.mvpclub.ai` > **Overview**
2. Record baseline numbers (track monthly):
   - **Domain Rating (DR)** — overall authority (0-100)
   - **Referring domains** — unique sites linking to you
   - **Organic keywords** — keywords you rank for
   - **Organic traffic** — Ahrefs' estimate
3. **Organic Keywords tab:** Sort by position. Anything ranking 5-20 is a "striking distance" quick win.
4. **Backlinks tab:** Review who links to you and with what anchor text.

---

## 2. Keyword Research Workflow

### A. Validate Your 78 Planned Subtopics

1. **Keywords Explorer** > paste all target keywords in bulk
2. For each keyword, note:
   - **Search Volume (SV):** 200+/month is solid; 50-100 still worth targeting if relevant
   - **Keyword Difficulty (KD):** Target KD 0-25 first as a newer site
   - **CPC:** High CPC = commercial intent = business value
   - **Traffic Potential (TP):** More useful than raw SV
   - **SERP features:** Featured snippets, People Also Ask = opportunities
3. **Click the SERP button** for each keyword:
   - Are top results from major publications or beatable smaller sites?
   - Could you write something substantially better?
   - What format dominates?

### B. Discover New Keywords

1. **Related Terms tab:** Filter KD 0-25, SV 50+
2. **Questions tab:** Question-format searches are gold for articles and FAQ sections
3. **Also rank for:** Enter a competitor's ranking URL to see keyword clustering
4. **Content Gap:** (see competitor section below)

### C. Prioritize Articles with Scoring

| Factor | Weight | Source |
|---|---|---|
| Search volume | 25% | Keywords Explorer |
| Keyword difficulty | 30% | Lower KD = higher score |
| Business relevance | 25% | Your judgment |
| Traffic potential | 20% | TP column |

**Priority tiers:**
- **Tier 1 (Write immediately):** KD 0-15, SV 100+, highly relevant
- **Tier 2 (Write next):** KD 16-30, SV 200+, strong relevance
- **Tier 3 (Write later):** KD 30+, SV 500+. Build authority first.
- **Tier 4 (Strategic):** High KD essential pillar pages. Write for completeness.

**Expected examples:**
- "vibe coding" — likely low KD, rising volume. **Tier 1.**
- "AI for HR" — moderate KD, decent volume. **Tier 2.**
- "ChatGPT vs Claude" — high volume, high KD. **Tier 3-4.**
- "how to use AI at work" — very high everything. **Tier 4** pillar page.

---

## 3. Competitor Analysis

### A. Competitors to Analyze

| Competitor | Why |
|---|---|
| `sectionai.com` | Direct competitor, AI education for professionals |
| `zapier.com/blog` | Massive content operation, "AI for work" |
| `hubspot.com/blog` | Masters of SEO content |
| `superpath.co` | Lower DR, more comparable competitor |
| `coursera.org/articles` | AI education/career content |
| `hbr.org` | AI-at-work content for mid-career professionals |

### B. Content Gap Analysis (Most Valuable Workflow)

1. **Site Explorer** > **Content Gap**
2. Enter 3-5 competitors in the top fields
3. Enter `www.mvpclub.ai` in the bottom "doesn't rank for" field
4. **Filter:** KD 0-25 (or 0-30), Volume 50+, Intersections "2 of 3+"
5. **Export to CSV** — this becomes your content opportunity backlog
6. Group keywords by your 8 pillars. Discard off-topic terms.

### C. Why Competitor Content Ranks

For each target keyword, check **SERP Overview**:
- Word count of top pages (understand depth expectations)
- Referring domains to top pages (how many backlinks you'll need)
- DR of ranking domains (if DR 20-40 sites rank, you can compete)
- Click through to content: What subtopics? What format? What's missing?

---

## 4. Ongoing Tracking and Reports

### A. Rank Tracker Setup

Add keywords in categories:

**Brand (5-10):** mvp club, mvpclub, mvpclub.ai

**Priority content (30-50 to start):** Each keyword you're actively targeting with published content

**Pillar keywords (8):** One per pillar topic

Tag all keywords by pillar for filtered views. Set weekly tracking.

### B. Weekly Workflow (15-20 min, every Monday)

1. **Rank Tracker:** Position changes
   - Page 2 → Page 1 movers: optimize these pages
   - Significant drops: check if competitors published better content
   - New unexpected rankings
2. **Site Audit:** New errors after publishing

### C. Monthly Workflow (45-60 min, first of month)

1. **Site Explorer own domain:** Log DR, referring domains, organic keywords, traffic
2. **Organic Keywords:** Sort by "New" and "Lost"
3. **Top Pages:** Which pages drive most organic traffic
4. **Content Gap re-run** (quarterly)

### D. Content Decay Detection

1. **Rank Tracker:** Set comparison to 3-6 months, find declining keywords
2. **Top Pages:** Sort by traffic change for pages losing traffic
3. **When found:** Check SERP for fresher competitor content, update your post, re-optimize title/meta, add internal links, republish with updated date

---

## 5. Backlink Strategy

### A. Analyze Current Profile

1. **Site Explorer** > **Backlinks:** Total referring domains, anchor text distribution, dofollow ratio
2. **Referring Domains tab:** Which sites link to you (relationship opportunities)
3. Check for suspicious/spammy domains (given previous click farm issues)

### B. Find Link-Building Opportunities

**Competitor backlink analysis:**
1. Enter competitor in Site Explorer > **Backlinks** > Dofollow > sort by DR
2. Look for: resource pages, guest posts, directories, podcast show notes

**Content Explorer for linkable ideas:**
1. Search "AI at work" > filter **Referring domains: 50+**
2. What earned lots of backlinks? Original research, free tools, comprehensive guides, data-driven posts

**Broken link building:**
1. Content Explorer > your topics > filter **HTTP 404** + **Referring domains: 10+**
2. Create your version, contact linking sites

### C. Content That Earns Backlinks in AI Education

1. **Original research:** Survey mid-career professionals, publish "2026 AI Skills Gap Report"
2. **Comprehensive comparisons:** ChatGPT vs Claude with actual test results
3. **Free tools/templates:** Prompt libraries, readiness assessments, ROI calculators
4. **Definitive guides:** "Complete Guide to AI for Project Managers"
5. **Glossaries:** "AI Terms Every Non-Technical Professional Should Know"

---

## 6. Integration with Content Production

### A. 5-Minute Pre-Writing Checklist

Before writing any article:

1. **Keywords Explorer:** Enter primary keyword
   - SV < 20? Reconsider or broaden.
   - KD > 40 with low DR? Long-term play, not quick win.
2. **SERP Overview:** Can you realistically compete?
3. **Also rank for:** Click #1 result to see secondary keywords to include

### B. Monthly Content Planning Session

1. Pull Content Gap export
2. Pull Rank Tracker "striking distance" keywords (positions 5-20)
3. Categorize into 8 pillars
4. For each pillar, pick:
   - 1 new article (Content Gap keyword)
   - 1 existing article to update (striking-distance optimization)
5. Write 3-5 articles per pillar before switching — builds topical authority faster

### C. Content Explorer for Trending Topics

1. Search broad topic like "AI workplace"
2. Filter **Published: Last 30 days**, sort by **Organic traffic**
3. What's trending that you haven't covered?
4. Also filter by **Social shares** for viral angles

### D. The Content Flywheel

```
Ahrefs Content Gap + Keywords Explorer
         ↓
Prioritized Content Backlog (scored by KD, SV, relevance)
         ↓
Write Article (SERP analysis informs structure)
         ↓
Publish + Internal Link
         ↓
Rank Tracker monitors positions weekly
         ↓
After 2-3 months: ranking 5-20? → Optimize
         ↓
Site Explorer Top Pages shows what's working
         ↓
Double down on winning pillars
```

---

## Quick-Start: Your First Week

| Day | Action |
|---|---|
| **Day 1** | Add project, run Site Audit, check Site Explorer baseline |
| **Day 2** | Enter all 78 subtopics in Keywords Explorer, export data, score/tier |
| **Day 3** | Content Gap analysis vs 3 competitors, export KD 0-25 opportunities |
| **Day 4** | Set up Rank Tracker with 30-50 priority keywords, tag by pillar |
| **Day 5** | Analyze 2 competitor backlink profiles, identify 10 link targets, plan 1 linkable content piece |

**Highest-impact actions:**
1. **Content Gap analysis** — immediately surfaces dozens of validated keyword opportunities
2. **Prioritization by KD** — targeting low-difficulty keywords first gets you ranking faster, building momentum for harder terms
