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

### 3. Check SEO Keywords

Read `docs/content-library-prd/keywords-for-ahrefs.txt` and identify 3-5 keywords from the list that are relevant to this article's topic. These should be woven naturally into the article:

- **Primary keyword:** Include in the H1 title, meta description, first paragraph, and at least one H2 subheading
- **Secondary keywords (2-4):** Include naturally in body text, subheadings, or section content where they fit without forcing

**Rules for keyword inclusion:**
- Keywords must read naturally. If a sentence sounds awkward with the keyword, rewrite the sentence or skip it.
- Never repeat the same keyword more than 3 times in the article (beyond the title/meta)
- Prefer long-tail variations over exact-match repetition (e.g., "how to use AI at work" can become "using AI in your daily work")
- Place keywords near the top of the article. Google weights the first 200 words more heavily.
- Use keywords in at least one H2 subheading where it fits naturally
- The meta description should contain the primary keyword

**Do NOT:** Stuff keywords unnaturally, repeat them mechanically, or sacrifice readability for SEO. Quality content that reads well always outperforms keyword-stuffed content.

### 4. Search Source Materials (and Transcript Summaries)

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
7. **Community invitation close** — Every article ends with a closing section that invites the reader to join the MVP Club community. This is NOT a hard sell. It's a warm, themed invitation that connects the article's topic to the value of practicing alongside other professionals. Always link to `/community` or `https://mvp-club.mn.co/`.

**The pattern:** Tie the article's topic back to the community. If the article was about AI for email, the close might be: "If you want to see how other professionals are applying these techniques and share what's working for you, that's exactly what happens in MVP Club's weekly sessions." If it was about career positioning: "The professionals who figure this out fastest aren't doing it alone. They're practicing alongside peers who are navigating the same questions."

**Rules for the community close:**
- Always the final section before any HTML comments
- 2-3 sentences maximum
- Must feel like a natural extension of the article, not an appended ad
- Vary the framing per article (don't copy-paste the same CTA across all articles)
- Link to /community page
- Never use "Sign up now," "Don't miss out," or urgency language
- The tone is: "Here's where people like you are figuring this out together"

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
