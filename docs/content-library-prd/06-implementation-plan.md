# Implementation Plan — Content Library

## Decisions Made

- **URL path:** `/learn/`
- **Content authoring:** Markdown files in the repo
- **Framework:** Astro (pending final confirmation)

## Phase 1: Technical Foundation (Week 1)

### If Astro Migration
- [ ] Scaffold Astro project with `@astrojs/react`, `@astrojs/tailwind`
- [ ] Move existing React components into Astro component system
- [ ] Convert existing 17 blog JSON files to Markdown with frontmatter (script-assisted)
- [ ] Set up Content Collections with article schema (title, description, author, date, pillar, tags, difficulty, readingTime)
- [ ] Build article layout template with structured data
- [ ] Build `/learn/` landing page with topic filtering
- [ ] Build `/learn/topic/[topic-slug]` pillar page template
- [ ] Build `/learn/author/[author-slug]` author page template
- [ ] Configure `@astrojs/sitemap` and `@astrojs/rss`
- [ ] Deploy to Vercel, verify everything works
- [ ] Fix sitemap domain to `www.mvpclub.ai`

### Analytics Setup (Parallel)
- [ ] Create `src/utils/analytics.js` with tracking helpers
- [ ] Register custom dimensions in GA4 Admin
- [ ] Add scroll depth tracking to article template
- [ ] Add route change listener for SPA pages
- [ ] Connect Search Console to GA4

## Phase 2: Seed Content (Weeks 2-4)

- [ ] Write pillar page: "Getting Started with AI" (3-4k words)
- [ ] Write pillar page: "What Is Vibe Coding?" (3-4k words)
- [ ] Write 4 "AI for [Role]" articles (PM, Marketing, HR, Finance)
- [ ] Write 1 tool comparison: "ChatGPT vs Claude for Professionals"
- [ ] Re-categorize and optimize existing 17 blog posts with topic/cluster metadata
- [ ] Add "What you'll learn" summaries and reading times to all content
- [ ] Internal linking pass: connect all existing content to new pillar pages
- [ ] Submit updated sitemap to Search Console

## Phase 3: Build Velocity (Month 2)

- [ ] Establish 3 articles/week publishing cadence
- [ ] Build remaining pillar pages (AI at Work, Tools, Career, Leading AI)
- [ ] Write "AI at Work" how-to guides (email, meetings, presentations)
- [ ] Start community member quote bank from session transcripts
- [ ] Set up UTM link templates for team sharing
- [ ] Add social share buttons with tracking to article template
- [ ] First analytics review: which articles getting traffic?

## Phase 4: Expand and Optimize (Month 3)

- [ ] Double down on highest-performing topic clusters
- [ ] Add downloadable templates for top articles
- [ ] Build "AI Canon for Non-Technical Professionals" curated resource page
- [ ] Monthly content decay review
- [ ] Cross-pillar linking optimization
- [ ] Scale to 4-5 articles/week

## Success Metrics

| Metric | Month 1 Target | Month 3 Target | Month 6 Target |
|---|---|---|---|
| Published articles | 10-12 | 40-50 | 100+ |
| Organic search traffic to /learn/ | Baseline | 2x baseline | 10x baseline |
| Articles indexed in Search Console | 10+ | 40+ | 100+ |
| Community signups attributed to content | Track baseline | 5/month | 20/month |
| Average scroll depth | >50% | >60% | >60% |
| Featured in AI Overviews | 0 | 1-2 queries | 5+ queries |
