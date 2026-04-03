# Content Blitz Execution Plan

**Purpose:** Autonomous execution plan for generating all 78 learn articles. Designed to run without human approval or monitoring once triggered.

**Trigger command:** `Run the content blitz plan at docs/content-library-prd/08-content-blitz-execution-plan.md`

---

## Prerequisites (must be completed before triggering)

- [x] Brand guide consolidated at `docs/brand-guide.md`
- [x] Content strategy with 78 topics at `docs/content-library-prd/02-content-strategy.md`
- [x] Learn content creator skill at `.claude/skills/learn-content-creator.md`
- [x] Editorial critic skill at `.claude/skills/editorial-critic.md`
- [x] Learn page with filtering at `src/pages/learn/index.astro`
- [x] Astro content collection configured at `src/content/config.ts`
- [x] First article published as reference (`src/content/learn/how-to-use-ai-at-work.md`)
- [ ] Otter transcripts fully downloaded and groomed (in progress)
- [ ] Transcript summaries extracted to `.agents/source-materials/transcript-summaries/`

---

## Phase 0: Transcript Grooming (run first)

Before generating articles, extract useful content from raw Otter transcripts. For each transcript file in `.agents/source-materials/otter-transcripts/`:

1. Read the transcript
2. Extract and save to `.agents/source-materials/transcript-summaries/[session-name].md`:
   - Session type (New AI Tools Monday, Getting Unstuck Tuesday, Demo/Share Wednesday, etc.)
   - Date
   - Participants
   - Top 3-5 key insights, ideas, or debates (with direct quotes attributed by name)
   - Any "aha moments" where someone's perspective shifted
   - Specific tools, techniques, or projects discussed
   - Unresolved questions or tensions
   - Quotable moments that could be used in articles (with speaker attribution)
3. Tag each summary with relevant content pillars so articles can find relevant quotes

Use haiku-model agents (3-5 in parallel) to process transcripts. Each agent handles a batch.

**Output:** A folder of concise, tagged transcript summaries that the article-writing agents can grep through for real quotes and examples.

---

## Phase 1: Article Generation (78 articles)

### Execution Strategy

Run articles in batches of 5-8 parallel agents (opus model). Each agent writes one article following the learn-content-creator skill. Organize batches by pillar to build topical clusters.

### Batch Order (prioritized by SEO opportunity)

**Batch 1: Getting Started with AI (8 articles)**
Priority: HIGH (funnel top, foundational content)
Template: How-To Guide (Template A)
Default author: Matt Hastings

| # | Topic | Slug | Author |
|---|---|---|---|
| 1 | AI in 10 minutes: what you need to know | ai-in-10-minutes | Matt |
| 2 | Your first week with AI: a day-by-day guide | first-week-with-ai | Matt |
| 3 | What AI can and can't do right now | what-ai-can-and-cant-do | Matt |
| 4 | Biggest mistakes when starting with AI | ai-beginner-mistakes | Jill |
| 5 | How to find time for AI when you're busy | finding-time-for-ai | Matt |
| 6 | AI jargon decoded for non-technical people | ai-jargon-decoded | Ryan |
| 7 | How to explain AI to your boss or team | explain-ai-to-your-team | Jill |
| 8 | The AI learning path: what to focus on first | ai-learning-path | Matt |

**Batch 2: AI for [Your Role] (12 articles)**
Priority: HIGH (highest search intent)
Template: Role-Specific Deep Dive (Template B)
Default author: varies by role expertise

| # | Topic | Slug | Author |
|---|---|---|---|
| 1 | AI for project managers | ai-for-project-managers | Matt |
| 2 | AI for marketing professionals | ai-for-marketing | Jill |
| 3 | AI for HR professionals | ai-for-hr | Jill |
| 4 | AI for operations managers | ai-for-operations | Ryan |
| 5 | AI for finance professionals | ai-for-finance | Matt |
| 6 | AI for sales professionals | ai-for-sales | Jill |
| 7 | AI for consultants | ai-for-consultants | Matt |
| 8 | AI for executive assistants | ai-for-executive-assistants | Jill |
| 9 | AI for L&D professionals | ai-for-learning-development | Matt |
| 10 | AI for people managers | ai-for-people-managers | Jill |
| 11 | AI for small business owners | ai-for-small-business | Ryan |
| 12 | AI for nonprofit professionals | ai-for-nonprofits | Jill |

**Batch 3: AI at Work (10 articles)**
Priority: HIGH (highest volume keywords)
Template: How-To Guide (Template A)

| # | Topic | Slug | Author |
|---|---|---|---|
| 1 | How to use ChatGPT at work | chatgpt-at-work | Ryan |
| 2 | AI for email writing and inbox management | ai-for-email | Matt |
| 3 | AI for meeting notes and action items | ai-for-meeting-notes | Ryan |
| 4 | AI for presentations | ai-for-presentations | Matt |
| 5 | Getting better results from AI | better-ai-results | Matt |
| 6 | AI for data analysis without coding | ai-for-data-analysis | Ryan |
| 7 | Building AI into your daily workflow | ai-daily-workflow | Matt |
| 8 | AI for writing reports and proposals | ai-for-writing | Jill |
| 9 | What to do when AI gives bad output | when-ai-gives-bad-output | Matt |
| 10 | AI workplace policies you need to know | ai-workplace-policies | Jill |

**Batch 4: AI Tools and Productivity (10 articles)**
Priority: MEDIUM (high volume entry point)
Template: Tool Breakdown (Template D)

| # | Topic | Slug | Author |
|---|---|---|---|
| 1 | ChatGPT vs Claude vs Gemini for work | chatgpt-vs-claude-vs-gemini | Ryan |
| 2 | Is the $20/month AI subscription worth it | ai-subscription-worth-it | Ryan |
| 3 | AI tools for writing | ai-tools-for-writing | Matt |
| 4 | AI tools for research and analysis | ai-tools-for-research | Ryan |
| 5 | How to use Claude for professional work | claude-for-professional-work | Ryan |
| 6 | How to use ChatGPT for professional work | chatgpt-for-professional-work | Matt |
| 7 | AI tools your company already has | ai-tools-you-already-have | Jill |
| 8 | The AI tool stack for maximum leverage | ai-tool-stack | Ryan |
| 9 | New AI tools worth trying this month | new-ai-tools-april-2026 | Ryan |
| 10 | AI tools that flopped: honest reviews | ai-tools-that-flopped | Ryan |

**Batch 5: Leading AI at Your Organization (10 articles)**
Priority: MEDIUM (career advancement angle)
Template: Career Strategy (Template C)

| # | Topic | Slug | Author |
|---|---|---|---|
| 1 | How to pitch an AI pilot to leadership | pitch-ai-to-leadership | Jill |
| 2 | Building an AI champions network | ai-champions-network | Jill |
| 3 | How to run an AI workshop for your team | run-ai-workshop | Matt |
| 4 | Measuring AI adoption results | measuring-ai-adoption | Matt |
| 5 | How to handle AI skeptics | handling-ai-skeptics | Jill |
| 6 | AI governance for non-technical leaders | ai-governance-guide | Matt |
| 7 | The AI adoption roadmap | ai-adoption-roadmap | Matt |
| 8 | Choosing AI tools for your team | choosing-ai-tools-for-team | Ryan |
| 9 | Common AI adoption mistakes | ai-adoption-mistakes | Jill |
| 10 | Case study: becoming the AI leader | becoming-ai-leader-case-study | Jill |

**Batch 6: Building with AI (10 articles)**
Priority: MEDIUM (differentiator content)
Template: How-To Guide (Template A)

| # | Topic | Slug | Author |
|---|---|---|---|
| 1 | What is vibe coding: plain English explanation | what-is-vibe-coding | Matt |
| 2 | Your first vibe coding project in 60 minutes | first-vibe-coding-project | Ryan |
| 3 | How to use Claude Code as a non-developer | claude-code-for-non-developers | Ryan |
| 4 | Building internal tools with AI | building-internal-tools | Ryan |
| 5 | From idea to deployed product with AI | idea-to-deployed-product | Ryan |
| 6 | How to describe what you want to AI | describing-what-you-want | Matt |
| 7 | AI-built tools that saved hours of work | ai-tools-community-built | Matt |
| 8 | When to build vs when to buy AI tools | build-vs-buy-ai | Ryan |
| 9 | The creative joy of building with AI | creative-joy-of-building | Matt |
| 10 | Building a portfolio of AI projects | ai-project-portfolio | Ryan |

**Batch 7: AI and Your Career (10 articles)**
Priority: MEDIUM (emotional resonance)
Template: Career Strategy (Template C)

| # | Topic | Slug | Author |
|---|---|---|---|
| 1 | How AI is changing your job | how-ai-changes-your-job | Matt |
| 2 | AI skills that matter for career advancement | ai-skills-for-career | Jill |
| 3 | How to talk about AI on your resume | ai-on-your-resume | Jill |
| 4 | AI and job security: an honest assessment | ai-and-job-security | Matt |
| 5 | How to become the AI person on your team | become-the-ai-person | Jill |
| 6 | The career advantage of daily AI practice | career-advantage-ai-practice | Matt |
| 7 | AI skills vs understanding: what employers want | ai-skills-vs-understanding | Jill |
| 8 | Navigating AI anxiety | navigating-ai-anxiety | Jill |
| 9 | Evaluating AI job titles and opportunities | evaluating-ai-jobs | Ryan |
| 10 | The silent AI users | silent-ai-users | Jill |

**Batch 8: Human + AI Collaboration (8 articles)**
Priority: LOWER (thought leadership, authority building)
Template: Career Strategy (Template C)

| # | Topic | Slug | Author |
|---|---|---|---|
| 1 | The managerial relationship with AI | managerial-relationship-with-ai | Matt |
| 2 | AI as a thinking tool | ai-as-thinking-tool | Matt |
| 3 | When AI gets it wrong: the human judgment layer | when-ai-gets-it-wrong | Matt |
| 4 | AI and creativity: collaborative ideas | ai-and-creativity | Matt |
| 5 | Do first, understand later | do-first-understand-later | Matt |
| 6 | How to iterate with AI | how-to-iterate-with-ai | Ryan |
| 7 | AI amplifies your expertise | ai-amplifies-expertise | Jill |
| 8 | What Human + AI looks like across work types | human-ai-across-work | Matt |

---

## Phase 2: Per-Article Execution Cycle

Each article agent follows this exact cycle:

### Step 1: Research (read-only)
```
1. Read docs/brand-guide.md (full, including founder voice for assigned author)
2. Read docs/content-library-prd/02-content-strategy.md (find this topic's template)
3. Read docs/content-library-prd/keywords-for-ahrefs.txt and identify 3-5 target keywords for this article
4. Grep .agents/source-materials/transcript-summaries/ for relevant quotes and examples
5. Grep .agents/source-materials/ broadly for related content (workshops, speaker profiles)
6. Read src/content/learn/ and src/content/blog/ to find articles to link to
7. Read the first published article (how-to-use-ai-at-work.md) as a style reference
```

### Step 2: Write
```
1. Create src/content/learn/[slug].md with correct frontmatter
2. Follow the assigned template structure
3. Write in the assigned founder's voice
4. Include [NEEDS COMMUNITY QUOTE] placeholders where real quotes would strengthen
5. Include [NEEDS REAL EXAMPLE] where specific member stories would help
6. Link to at least 2 other articles (existing blog posts or other learn articles)
7. Link to /assess where relevant
8. End with invitation CTA
```

### Step 3: Self-Review (editorial critic)
```
1. Read .claude/skills/editorial-critic.md
2. Review the article against all criteria
3. Fix all HARD FAILS:
   - AI vocabulary tells
   - Em dashes
   - Prohibited terms
   - Fabricated examples
   - Missing specificity (tool names, etc.)
   - Founder voice mismatches
4. Document remaining WARNINGS as HTML comments at end of file
```

### Step 4: Finalize
```
1. Verify frontmatter is complete and valid
2. Verify slug matches filename
3. Verify description is under 155 characters
4. Verify at least 2 internal links present
5. Git add the file (do NOT commit — the orchestrator handles commits)
```

---

## Phase 2b: Adversarial Critic Pass (per batch, after all articles written)

After all articles in a batch are written, a SEPARATE critic agent reviews each one.
This is critical for quality — self-review catches obvious issues, but a fresh agent
with adversarial instructions catches subtle voice problems, AI writing tells,
and structural weaknesses the author agent is blind to.

### Critic Agent Cycle (parallel haiku agents, one per article)
```
1. Read .claude/skills/editorial-critic.md in full
2. Read docs/brand-guide.md for voice/tone reference
3. Read the article being reviewed
4. Produce a structured review with:
   - HARD FAILS (must fix before publish)
   - WARNINGS (should fix)
   - Specific text citations and replacement suggestions
   - MVP Club Test result (5 questions)
5. Write the review to .agents/critic-reviews/[slug]-review.md
```

### Revision Agent Cycle (parallel sonnet agents, one per article with HARD FAILS)
```
1. Read the original article
2. Read the critic review at .agents/critic-reviews/[slug]-review.md
3. Fix all HARD FAILS with specific replacements
4. Address WARNINGS where the fix is clear
5. Save the revised article (overwrite the original)
```

---

## Phase 3: Orchestration

The orchestrator (the main Claude Code session) manages the pipeline:

### Batch Execution
```
For each batch (1 through 8):
  1. Launch parallel sonnet agents, each writing one article
  2. Wait for all agents in the batch to complete
  3. Launch parallel haiku critic agents, one per article (adversarial review)
  4. Wait for all critics to complete
  5. Launch parallel sonnet revision agents for any articles with HARD FAILS
  6. Wait for revisions to complete
  7. Git add and commit the entire batch:
     "feat: add [pillar name] articles to learn library (X articles)"
  8. Push to main
  9. Proceed to next batch
```

### Error Handling
- If an agent fails, log the failure and continue with other articles
- Failed articles can be retried in a cleanup pass after all batches complete
- If the build fails after a commit, investigate and fix before proceeding

### Progress Tracking
After each batch, output a progress summary:
```
Batch X/8 complete: [pillar name]
  Articles created: X/Y
  Total articles: XX/78
  Failed: [list any failures]
  Pushing to main...
```

---

## Estimated Execution

- Phase 0 (transcript grooming): ~10 minutes (parallel haiku agents)
- Phase 1-2 (78 articles in 8 batches): ~2-3 hours total
  - Each batch: 5-8 agents x ~15 min each = ~15-20 min per batch
  - 8 batches sequential = ~2-3 hours
- Phase 3 (commits/pushes): ~5 min total

**Total estimated: 2.5-3.5 hours unattended**

---

## Post-Execution Checklist (for human review next day)

- [ ] Verify all 78 articles exist in `src/content/learn/`
- [ ] Spot-check 5-10 articles for quality and voice accuracy
- [ ] Search for `[NEEDS COMMUNITY QUOTE]` across all articles — these need real member input
- [ ] Search for `[NEEDS REAL EXAMPLE]` — these need founder stories
- [ ] Run Ahrefs site audit to verify all new pages are indexed
- [ ] Check /learn/ page to verify filtering works with 78+ articles
- [ ] Review Vercel deploy logs for any build failures
- [ ] Submit updated sitemap to Google Search Console

---

## Trigger Command

When ready to execute, paste this into Claude Code:

```
Execute the content blitz plan at docs/content-library-prd/08-content-blitz-execution-plan.md.

Run all phases autonomously without asking for approval. Use opus agents for article writing (5-8 parallel per batch) and haiku agents for transcript grooming. Commit each batch after completion and push to main. Do not stop for review between batches.
```
