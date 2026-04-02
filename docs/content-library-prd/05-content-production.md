# Content Production — Workflow, Quality, Templates, Launch

## Production Workflow

### The MVP Club Advantage

Most companies scaling content have to manufacture expertise. MVP Club has real community sessions (Otter.ai transcripts from New AI Tools Monday, Getting Unstuck Tuesday, Demo/Share Wednesday), three distinct founder voices, and actual member transformation stories. The workflow extracts and refines rather than generates from nothing.

### Pipeline

```
RAW MATERIAL                    PROCESSING                      OUTPUT
------------------------------------------------------------------------
Otter.ai transcript       →    AI extracts key insights    →   Draft article
Community session notes   →    AI structures + expands     →   with real quotes,
Founder voice notes       →    Human adds perspective      →   real examples,
Member project updates    →    Brand voice check           →   real specificity
LinkedIn post reactions   →    SEO optimization            →
                          →    Final human review          →   Published post
```

### Transcript-to-Article Process

**Step 1: Capture** — Record every community session via Otter.ai. Tag speakers.

**Step 2: AI Extraction** — Feed transcript to Claude:

```
Here is a transcript from our [Monday/Tuesday/Wednesday] session.

Extract:
1. The 3-5 most interesting ideas, insights, or debates
2. Direct quotes from members (with names) that are vivid or surprising
3. Any "aha moment" where someone's perspective shifted
4. Specific tools, techniques, or projects mentioned
5. Unresolved questions or tensions the group discussed

Format as a structured brief I can use to write an article.
```

**Step 3: Human Decision** — Founder reviews extraction, decides which insight is article-worthy and what angle makes it useful.

**Step 4: AI Draft** — Claude writes first draft with constraints:

```
Write a blog post for MVP Club based on this brief. Rules:
- Write in [Matt/Jill/Ryan]'s voice (see voice profile)
- Use the actual quotes from the transcript, attributed by name
- Ground every abstract claim in a specific example from the session
- No em dashes. No cloying transitions. No "wise observer" setups.
- If you don't have a real example, leave a [NEEDS EXAMPLE] placeholder
- End with an invitation, not a sales pitch
```

**Step 5: Human Edit (15-30 min)** — Non-negotiable. The named founder reads and edits. Checks: Does this sound like me? Is every claim true? Would I actually say this out loud?

**Step 6: SEO Pass** — AI adds/refines: meta description, header optimization, internal links, schema markup. Mostly automatable.

**Step 7: Brand Voice Checklist** — Quick check (see below).

### The 70/30 Rule

- **Editorial content** (thought leadership, perspective): 30% AI / 70% human
- **Programmatic content** (how-to guides, tool breakdowns): 70% AI / 30% human

---

## Quality Control at Scale

### Brand Voice Checklist (Run Before Every Publish)

```
BRAND VOICE CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[ ] No prohibited terms (upskilling, reskilling, AI literacy,
    future-proof, training program, AI mastery, strategic transformation)
[ ] No em dashes
[ ] No "wise observer" setups or humble-brags
[ ] No cloying transitions ("Here's what most people don't realize")
[ ] No invented statistics or unverified claims
[ ] No fear-based motivation
[ ] No "three musketeers" framing of founders
[ ] Leads with the human, not the technology
[ ] Invites rather than lectures
[ ] Uses simple vocabulary (fun, wins, getting better)
[ ] Contains at least one specific, grounded example
[ ] CTA is an invitation, not a sales pitch
[ ] Aligns with at least one content pillar
```

### Style Guide Additions for Scale

**Sentence-level:**
- First sentence hooks with specific detail, not generality
- Paragraphs max 4 sentences for web readability
- Vary sentence length
- Use "you" more than "we" in instructional content
- Name specific tools (Claude, ChatGPT, Cline), never just "AI"

**Structure-level:**
- Every article needs at least one real community member quote
- Every article needs at least one "I tried this and here's what happened" moment
- Subheadings readable as standalone outline
- No more than 3 paragraphs before first subheading

### Community Member Integration

1. **Quote bank** — After each session, extract 3-5 quotable moments. Store in running document.
2. **Member spotlight integration** — Weave member stories INTO topical articles, not separate spotlights
3. **"In our community this week" asides** — 1-2 sentence references to real discussions
4. **Permission system** — Mention at session start that insights may be featured. Quick opt-in/opt-out.

---

## What Makes Content Authentic vs. Generic

**Authentic signals (from your best existing posts):**
- Specific dollar amounts, time frames, project names
- Admitting uncertainty and failure
- Personal narrative that isn't performative
- Opinions stated directly without hedging
- Real member examples

**Generic AI slop signals to avoid:**
- Listicles with no narrative thread
- "In today's rapidly evolving landscape..."
- Claims without grounding
- Every section same structure
- Abstract advice without concrete examples
- Conclusions that restate the intro

---

## SEO Content Best Practices 2025-2026

### Google and AI Content
Google does not penalize AI-generated content. It penalizes **scaled content abuse**: large volumes of low-value content to manipulate rankings. MVP Club's workflow (transcripts + AI drafting + human editing + real examples) is exactly what Google rewards.

### E-E-A-T Signals

- **Experience:** Personal anecdotes from named author
- **Expertise:** Author bios with real credentials (Matt's PhD, Jill's ICF certification, Ryan's teaching background)
- **Authoritativeness:** Cite recognized sources, build backlinks
- **Trustworthiness:** Never invent statistics, include dates, update old content, have consistent author pages

### Optimal Article Structure

```
TITLE TAG: [Primary Keyword]: [Benefit/Outcome] | MVP Club
          (Under 60 characters)

META DESCRIPTION: [Specific claim or question] + [What reader gets]
                  (Under 155 characters)

H1: Article title (one per page)

INTRO: 2-3 paragraphs max. Hook with specific detail. State thesis.

H2: First major section
    H3: Subsection if needed

H2: Second major section (include community member quote)

H2: Third major section (most actionable/practical)

H2: Final section (invitation, not conclusion)

AUTHOR BIO: 2-3 sentences with credentials
```

### Content Length by Type

| Content Type | Target Length |
|---|---|
| Thought leadership / perspective | 1,500-2,500 words |
| How-to / tutorial | 1,700-2,500 words |
| Pillar pages / ultimate guides | 3,000-5,000 words |
| Quick takes / commentary | 800-1,200 words |
| Tool breakdowns | 1,200-1,800 words |

### Schema Markup

**Required for all posts:** Article schema with author, datePublished, dateModified, publisher, description, mainEntityOfPage

**When applicable:** FAQ schema (improves AI citation ~30%), HowTo schema (step-by-step content)

---

## Programmatic vs. Editorial Content

### Templatizable (70% AI)

- **"AI for [Role]" series** — 15-20 articles from session transcripts
- **Tool breakdown series** — From New AI Tools Monday sessions, 4/month
- **"Getting Started" guides** — Highly structured, updated frequently
- **FAQ/Glossary content** — Short, keyword-targeted

### Must Be Editorial (70% Human)

- **Founder perspective pieces** — Respond to cultural moment, require genuine opinion
- **Community narrative pieces** — Member transformation stories
- **Industry commentary** — Timely, opinionated responses
- **"Behind the scenes"** — How MVP Club operates

### Target Ratio: 60% Programmatic / 40% Editorial

Programmatic builds topical authority and captures search traffic. Editorial builds brand and loyalty. Both link to each other.

---

## Launch Strategy

### Month 1: Foundations (8-10 articles)

**Week 1-2:**
- "Getting Started with AI: The No-Jargon Guide" (pillar page, 3-4k words)
- "AI for Project Managers" (first role-specific, Template B)

**Week 3-4:**
- "ChatGPT vs. Claude for Professionals" (tool comparison, Template D)
- "AI for Marketing Professionals" (Template B)

### Month 2: Expand Role Coverage + Build Pillars

**Week 1-2:**
- "AI for HR," "AI for Operations Managers" (Template B)
- Build "AI for Your Role" pillar page

**Week 3-4:**
- 3 how-to guides: AI for email, presentations, meeting notes (Template A)
- Build "AI at Work" pillar page

### Month 3: Career + Leadership Pillars

**Week 1-2:**
- "Become the AI Person on Your Team," "How to Pitch AI to Leadership"
- Build "Leading AI" pillar page

**Week 3-4:**
- "AI Skills That Matter for Career Advancement," "The Silent AI Users"
- Build "AI and Your Career" pillar page
- Retroactive internal linking pass across all content

### Ongoing After Month 3

- 2-3 new cluster articles per week
- Quarterly updates to tool comparison articles
- Monthly "New AI Tools Worth Trying" column
- Pillar page updates as clusters grow

### Content Calendar

| Day | Content Type | Source |
|---|---|---|
| Monday | Tool breakdown | Monday session transcript |
| Wednesday | Community insight | Tue/Wed session transcript |
| Friday | Thought leadership or how-to | Founder draft + AI |
| Bi-weekly | "AI for [Role]" series | Template + session data |
