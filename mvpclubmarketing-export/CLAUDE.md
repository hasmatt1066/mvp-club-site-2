# MVP Club Marketing System

This repository powers MVP Club's marketing operations using Claude Code as the content engine.

## About MVP Club

**MVP Club is a coaching company** that helps white-collar professionals and enterprises adopt AI through practice-based coaching, not training.

### Core Thesis
- AI adoption is a practiced skill requiring daily use and discipline
- Human + AI > Human OR AI (augmentation over automation)
- The barriers to AI adoption are emotional, motivational, and time-based—not technical
- Point-in-time training doesn't work; embedded coaching does

### Business Model
- **B2B:** Enterprise contracts for team coaching (embedded in organizations)
- **B2C:** Mighty Networks community at $20/month for individual practitioners
- **Goal:** 1,000 paid community members

## How This System Works

```
INPUTS (Google Drive)          CLAUDE CODE              OUTPUTS (Google Drive)
─────────────────────────────────────────────────────────────────────────────────
/inputs/transcripts/     →                         →  /outputs/linkedin/
/inputs/ideas/           →    Brand Skills +       →  /outputs/newsletter/
/inputs/campaigns/       →    Commands             →  /outputs/community/
/inputs/recordings/      →                         →  /outputs/youtube/
                                    ↓
                              /to-review/
                                    ↓
                              /to-post/ → Zapier → Distribution
```

## Brand Voice (Quick Reference)

### We Are
- Peer experts (alongside you, not above you)
- Fun, inviting, supportive, inclusive
- Highly competent coaches
- Practice-focused, not training-focused

### We Say
- "AI is the most disruptive moment of our careers—better to go through it together than alone"
- "The only way to learn is by doing—understanding comes through practice, not preparation"
- "Using AI is a managerial relationship—you manage inputs and goals, evaluate outputs"
- "Human + AI: the sum is greater than the parts"

### We Never Say
- Upskilling / Reskilling
- AI literacy
- Future-proof your career
- Training program / modules
- AI mastery
- Strategic transformation

### Tone
- Lead with excitement, not fear
- Acknowledge uncertainty as opportunity
- Never exploit fear to drive action
- Invite, don't lecture

## Using This System

### Daily Workflow
1. Drop inputs into `/inputs/` (transcripts, ideas, voice notes)
2. Run appropriate command (e.g., `/process-transcript`)
3. Review outputs in `/to-review/`
4. Move approved content to `/to-post/`
5. Zapier handles distribution

### Weekly Workflow
1. **Sunday:** Run `/generate-weekly-content` for all founders' posts
2. **Sunday:** Run `/analyze-week` to review performance
3. **Wednesday:** Draft and schedule newsletter
4. **Ongoing:** Log post performance via Google Form

### Available Commands

**Content Creation:**
- `/generate-weekly-content` - Create week's LinkedIn posts for all founders
- `/linkedin-post` - Quick single post creation
- `/draft-newsletter` - Create weekly newsletter draft
- `/process-idea` - Turn rough idea into polished content

**Content Repurposing:**
- `/process-transcript` - Turn transcript into multi-channel content
- `/repurpose-session` - Full session → complete content package

**Campaigns & Outreach:**
- `/campaign-brief` - Launch a new campaign from a brief
- `/dm-outreach` - Generate personalized DM templates

**Analysis:**
- `/analyze-week` - Analyze metrics and recommend improvements

## Content Pillars

All content should align with one of these themes:

1. **The AI Adoption Crisis** - The problem we solve (95% fail, training doesn't work)
2. **Practice > Training** - Our philosophy (daily use, discipline, coaching)
3. **Human + AI Teams** - Our thesis (augmentation, managerial relationship)
4. **Behind the Scenes** - Proof of expertise (real coaching stories)
5. **Community Wins** - Social proof (member transformations)

## Founders

Content is created for three founder voices:
- **Matt** - [Add voice profile]
- **Ryan** - [Add voice profile]
- **Jill** - [Add voice profile]

Each founder should post 3-5x/week on LinkedIn with their authentic voice while staying on-brand.

## Goals & Metrics

### Primary Goals (Q1 2025)
- 1,000 paid community members ($20K MRR)
- 10 B2B discovery calls/month
- 2-3 enterprise contracts/quarter

### Key Metrics to Track
- Community member count (Mighty Networks)
- LinkedIn impressions and engagement rate
- Email list size and open rates
- Discovery calls booked
- Conversion rates (free → paid, call → contract)

## File Structure

```
/mvpclubmarketing
├── CLAUDE.md                    # This file
├── docs/                        # Planning and strategy docs
│   ├── 01-brand-strategy.md
│   ├── 02-system-architecture.md
│   ├── 03-campaign-plan.md
│   ├── 04-monitoring-metrics.md
│   └── 05-content-calendar.md
├── .claude/
│   ├── skills/                  # Brand and content skills
│   └── commands/                # Slash commands for workflows
├── marketing/
│   ├── inputs/                  # Raw inputs (transcripts, ideas)
│   ├── outputs/                 # Generated content by channel
│   │   ├── linkedin/
│   │   ├── newsletter/
│   │   ├── community/
│   │   └── youtube/
│   ├── campaigns/               # Campaign briefs and assets
│   ├── templates/               # Content templates
│   └── calendar/                # Content calendar
└── README.md
```

## Getting Started

1. Sync this repo with Google Drive for input/output management
2. Install brand skills in Claude Desktop for consistent voice
3. Use slash commands for content workflows
4. Set up Zapier for automated distribution
5. Track metrics weekly in Google Sheets

See `/docs/` for detailed documentation on each component.
