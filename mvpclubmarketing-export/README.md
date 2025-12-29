# MVP Club Marketing System

A Claude Code-powered marketing system for MVP Club's content creation, distribution, and performance tracking.

## Quick Start

1. Open this repo in Claude Code
2. Run `/generate-weekly-content` to create this week's content
3. Review outputs in `/marketing/to-review/`
4. Move approved content to `/marketing/to-post/`
5. Zapier handles distribution (or post manually)

## Documentation

| Doc | Purpose |
|-----|---------|
| [CLAUDE.md](./CLAUDE.md) | System context for Claude Code |
| [01-brand-strategy.md](./docs/01-brand-strategy.md) | Brand voice, messaging, audience |
| [02-system-architecture.md](./docs/02-system-architecture.md) | How the system works |
| [03-campaign-plan.md](./docs/03-campaign-plan.md) | Founding members launch plan |
| [04-monitoring-metrics.md](./docs/04-monitoring-metrics.md) | Tracking and analytics |
| [05-content-calendar.md](./docs/05-content-calendar.md) | Content pillars and schedule |

## Folder Structure

```
/mvpclubmarketing
├── CLAUDE.md              # Claude Code context
├── docs/                  # Strategy and planning docs
├── .claude/
│   ├── skills/           # Brand and content skills
│   └── commands/         # Slash commands for workflows
└── marketing/
    ├── inputs/           # Raw content inputs
    ├── outputs/          # Generated content
    ├── to-review/        # Pending approval
    ├── to-post/          # Ready for distribution
    ├── campaigns/        # Campaign management
    ├── templates/        # Content templates
    └── calendar/         # Content calendar
```

## Available Commands

**Content Creation:**
| Command | Purpose |
|---------|---------|
| `/generate-weekly-content` | Create week's LinkedIn posts for all founders |
| `/linkedin-post` | Quick single post creation |
| `/draft-newsletter` | Create weekly newsletter draft |
| `/process-idea` | Turn rough idea into polished content |

**Content Repurposing:**
| Command | Purpose |
|---------|---------|
| `/process-transcript` | Turn transcript into multi-channel content |
| `/repurpose-session` | Full session → complete content package |

**Campaigns & Outreach:**
| Command | Purpose |
|---------|---------|
| `/campaign-brief` | Launch a new campaign from a brief |
| `/dm-outreach` | Generate personalized DM templates |

**Analysis:**
| Command | Purpose |
|---------|---------|
| `/analyze-week` | Analyze metrics and get recommendations |

## Goals

- **Q1 2025:** 1,000 paid community members at $20/month
- **Ongoing:** 10 B2B discovery calls/month
- **Quarterly:** 2-3 enterprise contracts

## Tech Stack

- **Claude Code Max** - Content generation engine
- **Google Drive** - File storage and sync
- **Zapier** - Distribution automation
- **Mighty Networks** - Community platform
- **Buffer/Typefully** - LinkedIn scheduling

---

*Built by MVP Club to practice what we preach: using AI to augment our work.*
