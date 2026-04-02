---
name: learn-content-creator
description: Create articles for the MVP Club /learn/ content library. Uses brand guidelines, founder voice profiles, source materials, and content templates to produce on-brand, SEO-optimized articles.
---

# Learn Content Creator

You are creating an article for the MVP Club resource library at mvpclub.ai/learn/. Follow these instructions precisely.

## Before Writing

### 1. Read the Brand Guide

Read `docs/brand-guide.md` in full. This is the source of truth for:
- Brand voice and tone
- Writing style rules (no em dashes, no wind-up intros, etc.)
- Prohibited language
- The MVP Club Test (5-question pre-publish check)
- Founder voice profiles (if the article is attributed to Matt, Jill, or Ryan)
- Topic-to-founder assignment table

### 2. Read the Content Strategy

Read `docs/content-library-prd/02-content-strategy.md` for:
- Which pillar this article belongs to
- Article templates (How-To, Role-Specific, Career Strategy, Tool Breakdown)
- Internal linking strategy
- CTA approach by article type

### 3. Search Source Materials

Search `.agents/source-materials/` for relevant raw content:
- **Otter transcripts** (when available in `.agents/source-materials/otter-transcripts/`) — search for keywords related to the article topic. Extract real quotes, specific examples, community member insights.
- **Speaking Engagements/** — podcast prep docs, speaker profiles, webinar talk tracks
- **Course and Workshop Assets/** — slide decks, workshop materials
- **Enterprise Engagements/** — real coaching examples, templates
- **Marketing/Thought Leadership/** — existing thought leadership drafts
- **Mighty Networks Community/** — community programming, meeting notes
- **Business Development/Success Stories** — real member success stories

Use `grep -r "keyword" .agents/source-materials/` to find relevant content across all source files.

### 4. Check Existing Content

Read `src/content/blog/` and `src/content/learn/` to understand what already exists. Every new article should:
- Link to at least 2 existing articles
- Link to its pillar page
- Not duplicate existing content

## Writing the Article

### File Format

Create a Markdown file in `src/content/learn/` with this frontmatter:

```markdown
---
title: "Article Title Here"
description: "SEO meta description under 155 characters."
author: "Matt Hastings"
date: "YYYY-MM-DD"
pillar: "AI at Work"
tags: ["relevant", "tags"]
difficulty: "beginner"
readingTime: 8
---
```

### File Naming

Use lowercase kebab-case: `how-to-use-ai-for-meeting-notes.md`
Keep slugs under 5-6 words, keyword-rich.

### Article Structure

Follow the appropriate template from the content strategy doc. Every article must include:

1. **Hook opening** — First sentence is a specific detail, not a generality. No throat-clearing.
2. **Subheading within 3 paragraphs** — Don't bury the reader in intro.
3. **At least one community member quote or insight** — Real, from transcripts or sessions. If you don't have one, use `[NEEDS COMMUNITY QUOTE: topic area]` placeholder.
4. **At least one "I tried this" moment** — Grounded in real experience. If attributed to a founder, use their real examples from the brand guide. If you don't have one, use `[NEEDS REAL EXAMPLE: what happened when someone tried X]` placeholder.
5. **Specific tool names** — Claude, ChatGPT, Cline, etc. Never just "AI."
6. **Internal links** — Link to at least 2 other articles on the site.
7. **Invitation CTA** — End with a warm invitation to the community, not a sales pitch.

### Paragraphs and Sentences

- Max 4 sentences per paragraph
- Vary sentence length (short punchy, then longer nuanced)
- Use "you" more than "we" in instructional content
- No em dashes — use commas, periods, colons, or parentheses

### Placeholders

When you lack real source material for a section, use clearly marked placeholders rather than fabricating:

```
[NEEDS COMMUNITY QUOTE: what members say about using AI for status reports]
[NEEDS REAL EXAMPLE: a specific project where someone applied this]
[NEEDS TOOL SCREENSHOT: Claude conversation showing this workflow]
[MATT REVIEW: does this match your coaching experience?]
[JILL REVIEW: check tone on this section]
[RYAN REVIEW: verify this technical detail]
```

**Never fabricate statistics, quotes, anecdotes, or experiences.** Placeholders are always better than fiction.

## After Writing

### Run the Editorial Critic

After the draft is complete, invoke the editorial critic skill (`.claude/skills/editorial-critic.md`) to review the article. Fix all HARD FAILS before considering the article ready for human review.

### Pre-Publish Checklist

```
[ ] Frontmatter complete (title, description, author, date, pillar, tags, difficulty, readingTime)
[ ] Description under 155 characters
[ ] Slug is short, keyword-rich, kebab-case
[ ] No prohibited terms
[ ] No em dashes
[ ] No fabricated examples or statistics
[ ] At least one community quote or [NEEDS COMMUNITY QUOTE] placeholder
[ ] At least one real example or [NEEDS REAL EXAMPLE] placeholder
[ ] Specific tools named (not just "AI")
[ ] Links to 2+ other articles on the site
[ ] CTA is an invitation, not a sales pitch
[ ] Passes the MVP Club Test (5 questions)
[ ] Founder voice matches profile (if attributed)
[ ] Editorial critic review: all HARD FAILS resolved
```

## Content Pillar Reference

| Pillar | Slug Prefix | Example Topics |
|---|---|---|
| Getting Started with AI | getting-started | First week guide, jargon decoder, basics |
| AI at Work | ai-at-work | Email, meetings, presentations, workflows |
| AI for [Your Role] | ai-for-role | PM, HR, Marketing, Finance, Operations |
| Leading AI at Your Org | leading-ai | Pitching pilots, workshops, governance |
| Building with AI | building-with-ai | Vibe coding, internal tools, first project |
| AI Tools and Productivity | ai-tools | Comparisons, reviews, tool stacks |
| AI and Your Career | ai-career | Resume, skills, career positioning |
| Human + AI Collaboration | human-ai | Iteration, judgment, creativity |

## Future Enhancements

As the content pipeline matures, this skill will be extended with:
- Otter transcript extraction workflow (auto-pull insights from meeting recordings)
- Community quote bank integration
- Ahrefs keyword validation before writing
- Auto-generation of social sharing snippets
- Rendition video script companion for each article
