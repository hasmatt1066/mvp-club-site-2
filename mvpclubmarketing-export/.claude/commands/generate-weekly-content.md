# Generate Weekly Content

Create this week's LinkedIn content for all three founders plus the company page.

## Context

You are the content engine for MVP Club, an AI coaching company. Generate LinkedIn posts that:
- Sound like each founder's authentic voice
- Follow the brand guidelines in /.claude/skills/mvp-club-brand/
- Align with the content pillars and calendar in /docs/05-content-calendar.md
- Build toward the current campaign goals in /marketing/campaigns/

## Instructions

1. **Check the calendar**: Read /marketing/calendar/2025-01.md to see what's planned for this week

2. **Check for inputs**: Look in /marketing/inputs/ideas/ for any new ideas or topics to incorporate

3. **Review recent performance** (if available): Check if there's performance data to inform what content works

4. **Generate posts for each founder**:
   - **Matt**: 5 posts (Tue, Wed, Fri, Sat + 1 flex)
   - **Ryan**: 5 posts (Mon, Thu + 3 flex)
   - **Jill**: 5 posts (Tue, Thu + 3 flex)
   - **Company**: 2 posts (Wed newsletter promo, Fri community highlight)

5. **For each post, include**:
   - The full post text (ready to copy/paste)
   - Suggested posting date/time
   - Content pillar it addresses
   - Format type (Story, Thesis, Tactical, Question, etc.)

## Post Formats to Use

**Story → Insight → CTA** (150-300 words)
```
[Hook - personal story or observation]
[2-3 paragraphs of story]
[Key insight or lesson]
[Call to action or question]
```

**Contrarian Take** (100-200 words)
```
[Bold statement challenging conventional wisdom]
[Why most people get it wrong]
[The alternative perspective]
[What to do instead]
```

**Tactical How-To** (100-200 words)
```
[Problem or goal]
Here's how to do X:
1. First step
2. Second step
3. Third step
[Why this works]
```

**List Post** (150-250 words)
```
[X things I learned about Y]:
1. First thing - brief explanation
2. Second thing - brief explanation
[Question to prompt engagement]
```

## Content Pillars (rotate through these)

1. **AI Adoption Crisis** - The problem (stats, why training fails)
2. **Practice > Training** - Our philosophy (daily use, discipline)
3. **Human + AI Teams** - Our thesis (augmentation, managerial relationship)
4. **Behind the Scenes** - Proof (coaching insights, real examples)
5. **Community** - Social proof (member wins, why together)

## Key Phrases to Weave In

- "AI is the most disruptive moment of our careers—better together than alone"
- "The only way to learn is by doing"
- "Using AI is a managerial relationship"
- "Human + AI: the sum is greater than the parts"
- "Practice creates understanding"

## Never Use

- Upskilling, reskilling, AI literacy
- Future-proof your career
- Training program, AI mastery
- Fear-based hooks ("Get left behind!")

## Output

Save each founder's posts to:
- /marketing/to-review/linkedin/matt/
- /marketing/to-review/linkedin/ryan/
- /marketing/to-review/linkedin/jill/
- /marketing/to-review/linkedin/company/

Use naming format: `YYYY-MM-DD_topic-slug.md`

After generating, summarize what was created and ask if the user wants to review any specific posts.
