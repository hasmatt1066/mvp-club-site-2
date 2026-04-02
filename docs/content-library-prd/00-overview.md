# MVP Club Content Library — PRD Overview

**Date:** 2026-04-02
**Status:** Planning
**Owner:** Ryan Brodsky

## Vision

Create a publicly accessible Resource Library section on mvpclub.ai containing dozens to hundreds of SEO-optimized articles and guides. The library serves as the primary inbound marketing channel, building topical authority around AI adoption for mid-career professionals while providing genuine learning value to both new visitors and existing community members.

## Goals

1. **SEO Authority** — Become a top-ranked resource for "AI at work," "AI for [role]," "vibe coding," and related non-technical AI topics
2. **Inbound Traffic** — Drive net-new visitors through search and social sharing
3. **Community Growth** — Convert readers to MVP Club community members through natural, non-salesy CTAs
4. **Member Value** — Provide a shareable knowledge base that members reference and share with colleagues
5. **Brand Differentiation** — Stand out from generic AI content through real community insights, opinionated takes, and practice-based (not theory-based) advice

## Target Persona

Mid-career professional (not a developer) who:
- Has a clear job and is busy
- Wants to apply AI to their existing role
- Wants to position themselves as an AI leader on their team
- Wants crisp, applicable advice without assumed technical depth
- Sees AI adoption as a career advancement opportunity

## Key Principles

- **Practice > Training** — Content shows what to DO, not just what to KNOW
- **Real community insights** — Quotes and examples from actual MVP Club members
- **Anti-slop** — Every piece passes brand voice checklist; no em dashes, no "in today's landscape," no fear-based motivation
- **Opinionated** — Clear editorial perspective, not hedging
- **Career-oriented** — Every article implicitly answers "how does this help me professionally?"

## Documents in This PRD

| File | Contents |
|---|---|
| [01-technical-architecture.md](./01-technical-architecture.md) | Site architecture, Astro migration, rendering strategy, URL structure |
| [02-content-strategy.md](./02-content-strategy.md) | Topic clusters, 8 pillars with 78 subtopics, keyword analysis, templates |
| [03-competitive-research.md](./03-competitive-research.md) | 12 competitive resource libraries analyzed with actionable patterns |
| [04-analytics-strategy.md](./04-analytics-strategy.md) | GA4 setup, custom dimensions, tracking events, reporting cadences |
| [05-content-production.md](./05-content-production.md) | Production workflow, quality control, templates, launch strategy |
| [06-implementation-plan.md](./06-implementation-plan.md) | Phased rollout plan with decision points |

## Decision Points (Pending)

1. **Astro migration vs enhanced blog generator** — See 01-technical-architecture.md
2. **URL path** — `/library/` vs `/resources/` vs `/learn/`
3. **Content authoring** — Markdown in repo vs headless CMS
4. **Launch timeline** — TBD based on technical approach
