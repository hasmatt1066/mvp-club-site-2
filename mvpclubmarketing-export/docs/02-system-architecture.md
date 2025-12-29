# Marketing System Architecture

## Overview

MVP Club's marketing system uses **Claude Code Max** as the content generation engine, with **Google Drive** for storage and **Zapier** for distribution automation.

This is NOT an API-based automation system. Claude Code is interactive—you run commands to generate content, which creates a human-in-the-loop workflow that builds trust over time.

---

## System Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              GOOGLE DRIVE                                    │
│                                                                              │
│  ┌────────────────┐     ┌────────────────┐     ┌────────────────┐           │
│  │    INPUTS      │     │    OUTPUTS     │     │   APPROVED     │           │
│  │                │     │                │     │                │           │
│  │ /transcripts   │     │ /linkedin      │     │ /to-post       │           │
│  │ /recordings    │     │ /newsletter    │     │                │           │
│  │ /ideas         │     │ /community     │     │                │           │
│  │ /campaigns     │     │ /youtube       │     │                │           │
│  └───────┬────────┘     └───────▲────────┘     └───────┬────────┘           │
│          │                      │                      │                     │
└──────────┼──────────────────────┼──────────────────────┼─────────────────────┘
           │                      │                      │
           ▼                      │                      ▼
┌──────────────────────────────────┴──────────┐   ┌─────────────────────────────┐
│              CLAUDE CODE MAX                 │   │          ZAPIER             │
│                                              │   │                             │
│  You run commands:                           │   │  Watches /to-post folder    │
│                                              │   │                             │
│  > /process-transcript                       │   │  → Posts to LinkedIn*       │
│  > /generate-weekly-content                  │   │  → Sends newsletter         │
│  > /repurpose-session                        │   │  → Posts to Mighty Networks │
│  > /analyze-week                             │   │  → Updates calendar         │
│                                              │   │                             │
│  Uses brand skills for consistent voice      │   │  *Via Buffer/Typefully      │
│                                              │   │                             │
└──────────────────────────────────────────────┘   └─────────────────────────────┘
```

---

## Components

### 1. Input Layer (Google Drive)

**Location:** `/marketing/inputs/`

| Folder | Contents | Source |
|--------|----------|--------|
| `/transcripts/` | Session transcripts, call recordings | Transcription service |
| `/recordings/` | Raw audio/video files | OBS, Zoom |
| `/ideas/` | Founder notes, voice memos, rough ideas | Manual upload |
| `/campaigns/` | Campaign briefs, announcements | Manual creation |

**Naming Convention:**
```
YYYY-MM-DD_type_description.md
2025-01-15_transcript_demo-day-claude-code.md
2025-01-15_idea_managerial-relationship-post.md
```

### 2. Processing Layer (Claude Code)

**How It Works:**
1. You open Claude Code in this repo
2. You run a slash command (e.g., `/process-transcript`)
3. Claude reads inputs, applies brand skills, generates content
4. Outputs are saved to appropriate folders

**Available Commands:**

| Command | Purpose | Input | Output |
|---------|---------|-------|--------|
| `/process-transcript` | Turn transcript into content | Transcript file | LinkedIn posts, newsletter section, community post |
| `/generate-weekly-content` | Create week's LinkedIn posts | Content calendar, past performance | 15 posts (5 per founder) |
| `/repurpose-session` | Full session → multi-channel | Session recording/transcript | All channels |
| `/campaign-brief` | Launch new campaign | Campaign brief | Full campaign assets |
| `/analyze-week` | Review performance | Metrics sheet | Analysis + recommendations |
| `/log-post` | Record post performance | Post details | Updated tracking sheet |

**Brand Skills Applied:**
- `mvp-club-brand` - Voice, messaging, prohibited language
- `mvp-club-visual-brand` - Visual guidelines (for graphics)
- `mvp-club-linkedin` - LinkedIn-specific formatting
- `mvp-club-content-calendar` - What's been posted, what's planned

### 3. Output Layer (Google Drive)

**Location:** `/marketing/outputs/`

| Folder | Contents | Format |
|--------|----------|--------|
| `/linkedin/` | LinkedIn posts by founder | Markdown files |
| `/newsletter/` | Newsletter drafts | Markdown files |
| `/community/` | Mighty Networks posts | Markdown files |
| `/youtube/` | Video descriptions, titles, thumbnails | Mixed |

**Output Naming:**
```
YYYY-MM-DD_founder_topic.md
2025-01-15_matt_managerial-relationship.md
2025-01-15_newsletter_weekly-digest.md
```

### 4. Review Layer

**Location:** `/marketing/to-review/`

All generated content goes here first. You review and either:
- Move to `/to-post/` (approved)
- Edit and move to `/to-post/`
- Delete (not usable)

**Trust Transition:**
- **Phase 1 (Now):** All content to `/to-review/` first
- **Phase 2 (After 2-4 weeks):** Routine content direct to `/to-post/`
- **Phase 3 (Trust built):** Most content direct to `/to-post/`, edge cases to `/to-review/`

### 5. Distribution Layer (Zapier)

**Triggers:**
```
When file added to /to-post/linkedin/
→ Create draft in Buffer/Typefully
→ (Optional) Notify via Slack/email

When file added to /to-post/newsletter/
→ Create draft in email tool (Beehiiv, ConvertKit)
→ Notify for review

When file added to /to-post/community/
→ Post to Mighty Networks (if API available)
→ Or notify for manual posting
```

---

## Folder Structure

```
/mvpclubmarketing
├── CLAUDE.md                        # System context for Claude
├── README.md                        # Project overview
│
├── docs/                            # Documentation
│   ├── 01-brand-strategy.md
│   ├── 02-system-architecture.md    # This file
│   ├── 03-campaign-plan.md
│   ├── 04-monitoring-metrics.md
│   └── 05-content-calendar.md
│
├── .claude/
│   ├── skills/                      # Claude skills
│   │   ├── mvp-club-brand/
│   │   ├── mvp-club-visual-brand/
│   │   ├── mvp-club-linkedin/
│   │   └── mvp-club-content-calendar/
│   │
│   └── commands/                    # Slash commands
│       ├── process-transcript.md
│       ├── generate-weekly-content.md
│       ├── repurpose-session.md
│       ├── campaign-brief.md
│       ├── analyze-week.md
│       └── log-post.md
│
└── marketing/
    ├── inputs/                      # Raw inputs
    │   ├── transcripts/
    │   ├── recordings/
    │   ├── ideas/
    │   └── campaigns/
    │
    ├── outputs/                     # Generated content
    │   ├── linkedin/
    │   │   ├── matt/
    │   │   ├── ryan/
    │   │   ├── jill/
    │   │   └── company/
    │   ├── newsletter/
    │   ├── community/
    │   └── youtube/
    │
    ├── to-review/                   # Pending approval
    │
    ├── to-post/                     # Approved, ready for distribution
    │   ├── linkedin/
    │   ├── newsletter/
    │   └── community/
    │
    ├── campaigns/                   # Campaign management
    │   └── founding-members/
    │
    ├── templates/                   # Content templates
    │
    └── calendar/                    # Content calendar
        └── 2025-01.md
```

---

## Google Drive Sync

### Option 1: Google Drive Desktop App
1. Install Google Drive for Desktop
2. Sync this repo folder to Drive
3. Files automatically sync both ways

### Option 2: Rclone (Advanced)
```bash
# Mount Google Drive
rclone mount gdrive:mvpclubmarketing /home/user/mvpclubmarketing --vfs-cache-mode writes
```

### Option 3: Manual Sync
- Download inputs from Drive before processing
- Upload outputs to Drive after generation
- Simple but requires manual steps

**Recommendation:** Google Drive Desktop App for seamless sync.

---

## Zapier Workflows

### 1. LinkedIn Content Distribution
```
Trigger: New file in Google Drive folder "/to-post/linkedin/"
Filter: File extension is .md
Action: Read file contents
Action: Create post in Buffer/Typefully
Action: (Optional) Move file to "/posted/linkedin/"
Action: (Optional) Send Slack notification
```

### 2. Newsletter Distribution
```
Trigger: New file in Google Drive folder "/to-post/newsletter/"
Action: Read file contents
Action: Create draft in Beehiiv/ConvertKit
Action: Send email notification: "Newsletter draft ready for review"
```

### 3. Community Post Distribution
```
Trigger: New file in Google Drive folder "/to-post/community/"
Action: Read file contents
Action: Post to Mighty Networks (if API available)
  OR: Send Slack/email with content for manual posting
```

### 4. Metrics Reminder
```
Trigger: Every Sunday at 6:00 PM
Action: Send email: "Time to update marketing metrics and run /analyze-week"
```

### 5. New Input Notification
```
Trigger: New file in Google Drive folder "/inputs/transcripts/"
Action: Send Slack/email: "New transcript ready to process"
```

---

## Daily & Weekly Workflows

### Daily Workflow (10 minutes)
1. Check LinkedIn notifications for engagement
2. Respond to comments and DMs
3. Review any content in `/to-review/`
4. Approve and move to `/to-post/`

### Weekly Workflow (1 hour)

**Sunday Content Batch:**
```
1. Open Claude Code in this repo
2. Run: /generate-weekly-content
3. Review outputs in /to-review/linkedin/
4. Approve and move to /to-post/linkedin/
5. Run: /analyze-week (review last week's performance)
```

**Wednesday Newsletter:**
```
1. Run: /generate-newsletter (or draft manually)
2. Review in /to-review/newsletter/
3. Move to /to-post/newsletter/
4. Zapier creates draft in email tool
5. Final review and send
```

### Session Repurposing (After each session)
```
1. Upload transcript to /inputs/transcripts/
2. Run: /repurpose-session
3. Review outputs (posts, newsletter section, community post)
4. Approve and distribute
```

---

## Security & Access

### Google Drive Permissions
- Founders: Full access
- Claude Code: Read/write via local sync
- Zapier: Read access to /to-post/ folders

### Sensitive Content
- Never commit API keys or credentials
- Use environment variables for any integrations
- Review all content before posting (Phase 1)

---

## Scaling the System

### Current State (Phase 1)
- Manual review of all content
- Weekly batch generation
- Simple folder-based workflow

### Future State (Phase 3)
- Trusted autonomous posting for routine content
- Real-time engagement monitoring
- A/B testing of content variations
- Predictive content recommendations based on performance data
